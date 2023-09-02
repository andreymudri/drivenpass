import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiOperation({ summary: 'Creates a user' })
  @ApiBody({ type: AuthDto })
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @HttpCode(200)
  @Post('signin')
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Logs in the user' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged in' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  signin(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
