import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(@GetUser('id') userId: number, @Body() credentialDto: CredentialDto) {
    return this.credentialsService.create(userId, credentialDto);
  }

  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.credentialsService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.credentialsService.findOne(userId, +id);
  }
  @Delete(':id')
  remove(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.credentialsService.remove(userId, +id);
  }
}
