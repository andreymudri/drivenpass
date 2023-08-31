import { Body, Controller, HttpCode, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @HttpCode(200)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
