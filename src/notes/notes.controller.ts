import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/note.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('notes')
@ApiTags('Notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new note' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Note created',
  })
  create(@GetUser('id') userId: number, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(userId, createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all notes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns an array of notes',
  })
  findAll(@GetUser('id') userId: number) {
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a single note' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a single note',
  })
  findOne(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.notesService.findOne(userId, +id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a single note' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'deletes a single note',
  })
  remove(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.notesService.remove(userId, +id);
  }
}
