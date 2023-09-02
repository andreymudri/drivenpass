import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/note.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@GetUser('id') userId: number, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(userId, createNoteDto);
  }

  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.notesService.findOne(userId, +id);
  }

  @Delete(':id')
  remove(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.notesService.remove(userId, +id);
  }
}
