import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CredentialDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'title', example: 'facebook' })
  title: string;
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'url',
    example: 'www.facebook.com',
  })
  url: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'username',
    example: 'Fakeusername',
  })
  username: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'password',
    example: 'FakePassword',
  })
  password: string;
}
