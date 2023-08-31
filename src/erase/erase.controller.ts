import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}
  @Post()
  async erase(@GetUser('id') id: number, @Body() password: string) {
    return await this.eraseService.erase(+id, password);
  }
}
