import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async signIn(@Body() dto: AuthDto) {
    const tokens = await this.authService.logIn(dto);

    return {
      access_token: tokens.access_token,
    };
  }

  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() dto: AuthDto) {
    const tokens = await this.authService.signUp(dto);

    return {
      access_token: tokens.access_token,
    };
  }
}
