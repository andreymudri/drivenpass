import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiTags('Health')
  @ApiOperation({ summary: 'Checks APIs health' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }
}
