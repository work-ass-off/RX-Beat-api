import { ForbiddenException, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto';
import { compareData } from 'src/common/utils/hash';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(dto: AuthDto): Promise<any> {
    const user = await this.userService.findByLogin(dto.login);

    const isPasswordValid = await compareData(dto.password, user.password!);

    if (!isPasswordValid) {
      throw new ForbiddenException('Incorrect credentials');
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object

    return user;
  }

  async signUp(dto: AuthDto) {
    return this.userService.create(dto);
  }
}
