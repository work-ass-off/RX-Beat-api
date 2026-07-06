import { randomUUID } from 'crypto';

export class Track {
  id: string;
  playlistId: string;
  trackId: string;
  createdAt: number;
  updatedAt: number;

  constructor(track: Pick<Track, 'playlistId' | 'trackId'>) {
    this.id = randomUUID();
    this.playlistId = track.playlistId;
    this.trackId = track.trackId;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
