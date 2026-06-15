import { IsEmpty } from 'class-validator';

export class AddTrackDto {
  @IsEmpty({ message: 'Name must not be empty' })
  trackId!: string;
}
