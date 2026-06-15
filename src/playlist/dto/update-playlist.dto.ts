import { PartialType } from '@nestjs/swagger';
import { CreatePlaylistDto } from './create-playlist.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  newName!: string;
}
