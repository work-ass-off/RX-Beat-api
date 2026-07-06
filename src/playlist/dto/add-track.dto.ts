import { IsNotEmpty } from 'class-validator';

export class AddTrackDto {
  @IsNotEmpty({ message: 'Track ID must not be empty' })
  trackId!: string;
}
