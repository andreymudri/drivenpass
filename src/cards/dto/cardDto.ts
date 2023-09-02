import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  number: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  cvv: string;
  @IsNotEmpty()
  exp: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  password: string;
}
