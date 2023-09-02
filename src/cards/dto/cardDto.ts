import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
//TODO document the class with all needed decorators from swagger
export class CreateCardDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The card title' })
  title: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The card number' })
  number: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The persons name' })
  name: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The card cvv' })
  cvv: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The cards expiration' })
  exp: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The card type credit/debit' })
  type: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'The card password' })
  password: string;
}
