import { CredentialsRepository } from './credentials.repository';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CredentialDto } from './dto';
import { ConfigService } from '@nestjs/config';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {
  private config: ConfigService;
  private cryptr: Cryptr;

  constructor(
    configService: ConfigService,
    private credentialsRepository: CredentialsRepository,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Cryptr = require('cryptr');
    this.config = configService;
    const secretKey = this.config.get<string>('CRYPTR_SECRET');
    this.cryptr = new Cryptr(secretKey);
  }

  async create(userId: number, credentialDto: CredentialDto) {
    const check = await this.credentialsRepository.findByTitle(
      userId,
      credentialDto.title,
    );
    if (check) {
      throw new ConflictException();
    }
    const encryptedPassword = this.cryptr.encrypt(credentialDto.password);
    const savedCredential = {
      ...credentialDto,
      password: encryptedPassword,
    };

    return await this.credentialsRepository.create(userId, savedCredential);
  }

  async findAll(userId: number) {
    const credentials = await this.credentialsRepository.findAll(userId);
    return credentials.map((credential) => {
      const uncryptedPw = this.cryptr.decrypt(credential.password);
      return { ...credential, password: uncryptedPw };
    });
  }

  async findOne(userId: number, id: number) {
    const credential = await this.credentialsRepository.findOne(id);
    if (credential) {
      if (userId !== credential.userId) {
        throw new ForbiddenException();
      }
      const uncryptedPw = this.cryptr.decrypt(credential.password);
      return { ...credential, password: uncryptedPw };
    }
    if (!credential) {
      throw new NotFoundException();
    }
    return null;
  }

  async remove(userId: number, id: number) {
    const credential = await this.credentialsRepository.findOne(id);
    if (!credential) {
      throw new NotFoundException();
    }
    if (userId !== credential.userId) {
      throw new ForbiddenException();
    }
    return await this.credentialsRepository.remove(userId, id);
  }
}
