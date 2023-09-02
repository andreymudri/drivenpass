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
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The card has been successfully created.',
  })
  @ApiBearerAuth()
  create(@GetUser('id') userId: number, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(userId, createCardDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Returns all cards for the user.' })
  @ApiBearerAuth()
  findAll(@GetUser() userId: number) {
    return this.cardsService.findAll(userId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the card with the specified id.' })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @ApiBearerAuth()
  findOne(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.cardsService.findOne(userId, +id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The card has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Card not found.' })
  @ApiBearerAuth()
  remove(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.cardsService.remove(userId, +id);
  }
}
