import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EraseRepository {
  constructor(private prisma: PrismaService) {}

  async pwCheck(id: number) {
    const pwCheck = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return pwCheck.password;
  }
  async erase(id: number) {
    await this.prisma.credential.deleteMany({
      where: {
        userId: id,
      },
    });
    await this.prisma.note.deleteMany({
      where: {
        userId: id,
      },
    });
    await this.prisma.card.deleteMany({
      where: {
        userId: id,
      },
    });
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
