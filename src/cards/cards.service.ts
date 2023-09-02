import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/cardDto';
import { CardsRepository } from './cards.repository';
import { ConfigService } from '@nestjs/config';
import Cryptr from 'cryptr';

@Injectable()
export class CardsService {
  private config: ConfigService;
  private cryptr: Cryptr;

  constructor(
    configService: ConfigService,
    private readonly cardsRepository: CardsRepository,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Cryptr = require('cryptr');
    this.config = configService;
    const secretKey = this.config.get<string>('CRYPTR_SECRET');
    this.cryptr = new Cryptr(secretKey);
  }

  async create(userId: number, createCardDto: CreateCardDto) {
    const checkbytitle = await this.cardsRepository.findByTitle(
      userId,
      createCardDto.title,
    );
    if (checkbytitle) {
      throw new ConflictException('Card already exists');
    }
    const encryptedCVV = this.cryptr.encrypt(createCardDto.cvv);
    const encryptedPassword = this.cryptr.encrypt(createCardDto.password);
    const savedCard = {
      ...createCardDto,
      cvv: encryptedCVV,
      password: encryptedPassword,
    };
    return this.cardsRepository.create(userId, savedCard);
  }

  async findAll(userId: number) {
    const cards = await this.cardsRepository.findAll(userId);
    if (cards.length === 0) {
      return [];
    }
    return cards.map((card) => {
      const uncryptedPw = this.cryptr.decrypt(card.password);
      const uncryptedCvv = this.cryptr.decrypt(card.cvv);
      return { ...card, cvv: uncryptedCvv, password: uncryptedPw };
    });
  }

  async findOne(userId: number, id: number) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) {
      throw new NotFoundException();
    }
    if (card) {
      if (card.userId !== userId) {
        throw new ForbiddenException();
      }
      const uncryptedPw = this.cryptr.decrypt(card.password);
      const uncryptedCvv = this.cryptr.decrypt(card.cvv);
      return { ...card, cvv: uncryptedCvv, password: uncryptedPw };
    }
  }

  async remove(userId: number, id: number) {
    const card = await this.cardsRepository.findOne(id);
    if (!card) {
      throw new NotFoundException();
    }
    if (card.userId !== userId) {
      throw new ForbiddenException();
    }
    return this.cardsRepository.remove(userId, id);
  }
}
