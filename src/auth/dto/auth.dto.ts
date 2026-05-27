import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login must not be empty' })
  login!: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password!: string;
}
