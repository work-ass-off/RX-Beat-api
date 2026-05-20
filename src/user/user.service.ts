import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 'aec40a79-983c-487a-be9b-6ffff661a8c0',
      login: 'Erwin Rudolf Josef Alexander Schrödinger',
      password: 'catIsAlive',
      createdAt: 1775041279468,
      updatedAt: 1775041279468,
    },
  ];
  create(dto: CreateUserDto) {
    const user = new User(dto);
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for id');
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, dto: UpdateUserDto) {
    const user = this.findOne(id);
    if (user.login !== dto.oldLogin) {
      throw new ForbiddenException('Incorrect old login');
    }
    if (user.password !== dto.password) {
      throw new ForbiddenException('Incorrect password');
    }
    user.login = dto.newLogin;
    user.updatedAt = Date.now();

    return user;
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for id');
    }
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(this.users.indexOf(user), 1);
    return user;
  }
}
