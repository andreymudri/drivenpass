import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CredentialDto } from './dto';
@Injectable()
export class CredentialsRepository {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, CredentialDto: CredentialDto) {
    return this.prisma.credential.create({
      data: {
        userId,
        ...CredentialDto,
      },
    });
  }

  async findByTitle(userId: number, title: string) {
    return this.prisma.credential.findFirst({
      where: {
        title,
      },
    });
  }
  async findAll(userId: number) {
    return this.prisma.credential.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.credential.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(userId: number, id: number) {
    return await this.prisma.credential.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
