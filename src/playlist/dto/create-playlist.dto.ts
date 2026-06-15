import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name!: string;
}
