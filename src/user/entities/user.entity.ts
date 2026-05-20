import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  id: string;
  login: string | null;
  @Exclude()
  password: string | null;
  createdAt: number;
  updatedAt: number;

  constructor(user: Partial<User>) {
    this.id = randomUUID();
    this.login = user.login || null;
    this.password = user.password || null;
    this.createdAt = user.createdAt || Date.now();
    this.updatedAt = user.updatedAt || Date.now();
  }
}
