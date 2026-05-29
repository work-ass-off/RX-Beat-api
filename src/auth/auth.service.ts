import { ForbiddenException, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto';
import { compareData } from 'src/common/utils/hash';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export type Token = {
  access_token: string;
  refresh_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signIn(dto: AuthDto): Promise<Token> {
    const user = await this.userService.findByLogin(dto.login);

    const isPasswordValid = await compareData(dto.password, user.password!);

    if (!isPasswordValid) {
      throw new ForbiddenException('Incorrect credentials');
    }
    return this.signToken(user.id, user.login);
  }

  async signUp(dto: AuthDto): Promise<Token> {
    const user = await this.userService.create(dto);

    return this.signToken(user.id, user.login);
  }

  async signToken(userId: string, login: string): Promise<Token> {
    const payload = {
      sub: userId,
      login,
    };
    const secret = this.config.get('JWT_SECRET');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '60m',
        secret: secret,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
