import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EraseService } from './erase.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}
  @Post()
  @HttpCode(200)
  @ApiTags('Erase')
  @ApiProperty({ type: 'string', example: 'password', description: 'Password' })
  @ApiOperation({ summary: 'Deletes the user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid password',
  })
  @ApiBearerAuth()
  async erase(@GetUser('id') id: number, @Body() password: string) {
    return await this.eraseService.erase(+id, password);
  }
}
