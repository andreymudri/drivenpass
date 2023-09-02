import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createNoteDto: CreateNoteDto) {
    return await this.prisma.note.create({
      data: {
        userId,
        ...createNoteDto,
      },
    });
  }

  async findByTitle(userId: number, title: string) {
    return await this.prisma.note.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.note.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(userId: number, id: number) {
    return await this.prisma.note.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
