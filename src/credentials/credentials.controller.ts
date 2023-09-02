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
import { CredentialsService } from './credentials.service';
import { CredentialDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Credentials')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}
  @Post()
  @ApiOperation({ summary: 'Creates a new credential' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Credential created',
  })
  @ApiBearerAuth()
  create(@GetUser('id') userId: number, @Body() credentialDto: CredentialDto) {
    return this.credentialsService.create(userId, credentialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all credentials' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns an array of credentials',
  })
  @ApiBearerAuth()
  findAll(@GetUser('id') userId: number) {
    return this.credentialsService.findAll(userId);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns a single credential',
  })
  @ApiOperation({ summary: 'Returns a single credential' })
  @ApiBearerAuth()
  findOne(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.credentialsService.findOne(userId, +id);
  }
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'deletes a single credential',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletes a single credential' })
  remove(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.credentialsService.remove(userId, +id);
  }
}
