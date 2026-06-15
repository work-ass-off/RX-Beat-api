import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/';
import { User } from './entities/user.entity';
import { isUUID } from 'class-validator';
import { compareData, hashData } from 'src/common/utils/hash';

// BadRequestException — 400
// UnauthorizedException — 401
// ForbiddenException — 403
// NotFoundException — 404
// ConflictException — 409

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
    {
      id: 'lec40a79-983c-487a-be9b-6ffff661a8c0',
      login: 'a',
      password: 'a',
      createdAt: 1775041279468,
      updatedAt: 1775041279468,
    },
  ];
  async create(dto: CreateUserDto) {
    const userExists = this.users.find((user) => user.login === dto.login);
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await hashData(dto.password);
    const user = new User({ login: dto.login, password: hashedPassword });
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  async findByLogin(login: string) {
    const user = this.users.find((user) => user.login === login);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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

  async update(id: string, dto: UpdateUserDto) {
    const user = this.findOne(id);

    const isPasswordValid = await compareData(dto.password, user.password!);

    if (!isPasswordValid) {
      throw new ForbiddenException('Incorrect password');
    }

    if (user.login !== dto.oldLogin) {
      throw new ForbiddenException('Incorrect old login');
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
