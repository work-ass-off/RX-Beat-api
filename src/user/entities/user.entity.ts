import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  id: string = randomUUID();
  login!: string;
  @Exclude()
  password!: string;
  createdAt: number = Date.now();
  updatedAt: number = Date.now();

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
