import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'one random title',
    description: 'Title',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'random content',
    description: 'Content',
  })
  notes: string;
}
