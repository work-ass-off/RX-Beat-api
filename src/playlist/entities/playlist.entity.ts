import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Playlist {
  id: string;
  name: string;
  @Exclude()
  userId: string;
  createdAt: number;
  updatedAt: number;
  tracks: string[];

  constructor(playlist: Pick<Playlist, 'name' | 'userId'>) {
    this.id = randomUUID();
    this.name = playlist.name;
    this.userId = playlist.userId;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.tracks = [];
  }
}
