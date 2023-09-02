import { IsNotEmpty, IsOptional } from 'class-validator';

export class CredentialDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  url: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
