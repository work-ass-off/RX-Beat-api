import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  createdAt: number;
  updatedAt: number;

  constructor(user: Pick<User, 'login' | 'password'>) {
    this.id = randomUUID();
    this.login = user.login;
    this.password = user.password;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
