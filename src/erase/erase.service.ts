import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseRepository } from './erase.repository';
import * as argon from 'argon2';
@Injectable()
export class EraseService {
  constructor(private eraseRepository: EraseRepository) {}
  async erase(id: number, password: string) {
    //TODO implement checks
    const pwCheck = await this.eraseRepository.pwCheck(id);
    const hashCheck = await argon.verify(pwCheck, password);
    if (!hashCheck) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.eraseRepository.erase(id);
  }
}
