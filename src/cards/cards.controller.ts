import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@GetUser('id') userId: number, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(userId, createCardDto);
  }

  @Get()
  findAll(@GetUser() userId: number) {
    return this.cardsService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.cardsService.findOne(userId, +id);
  }

  @Delete(':id')
  remove(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.cardsService.remove(userId, +id);
  }
}
