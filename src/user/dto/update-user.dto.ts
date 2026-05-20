import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login must not be empty' })
  oldLogin!: string;

  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login must not be empty' })
  newLogin!: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password!: string;
}
