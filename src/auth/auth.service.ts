import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        password: true,
        email: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const hashCheck = await argon.verify(user.password, dto.password);
    if (!hashCheck) {
      throw new ForbiddenException('Invalid credentials');
    }
    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    try {
      const password = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
        },
      });
      delete user.password;
      return { account: user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15d',
      secret: secret,
    });
    return { access_token: token };
  }
}
