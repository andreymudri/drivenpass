import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto';

@Injectable()
export class CardsRepository {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, createCardDto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        userId,
        ...createCardDto,
      },
    });
  }
  async findByTitle(userId: number, title: string) {
    return this.prisma.card.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.card.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.card.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.card.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
