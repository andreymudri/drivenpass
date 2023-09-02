import { NotesRepository } from './notes.repository';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(userId: number, createNoteDto: CreateNoteDto) {
    const checkbytitle = await this.notesRepository.findByTitle(
      userId,
      createNoteDto.title,
    );
    if (checkbytitle) {
      throw new ConflictException('Note already exists');
    }
    return await this.notesRepository.create(userId, createNoteDto);
  }

  async findAll(userId: number) {
    const notes = await this.notesRepository.findAll(userId);
    if (notes.length === 0) {
      return [];
    }
    return notes;
  }

  async findOne(userId: number, id: number) {
    const usercheck = await this.notesRepository.findOne(id);
    if (!usercheck) {
      throw new NotFoundException();
    }
    if (usercheck.userId !== userId) {
      throw new ForbiddenException();
    }
    return usercheck;
  }

  async remove(userId: number, id: number) {
    const usercheck = await this.notesRepository.findOne(id);
    if (!usercheck) {
      throw new NotFoundException();
    }
    if (usercheck.userId !== userId) {
      throw new ForbiddenException();
    }
    return this.notesRepository.remove(userId, id);
  }
}
