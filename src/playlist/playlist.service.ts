import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class PlaylistService {
  private readonly playlists: Playlist[] = [
    {
      id: 'fec40a79-983c-487a-be9b-6ffff661a8c0',
      name: 'My playlist',
      userId: 'aec40a79-983c-487a-be9b-6ffff661a8c0',
      createdAt: 1775041279468,
      updatedAt: 1775041279468,
      tracks: ['1157362'],
    },
  ];

  create(createPlaylistDto: CreatePlaylistDto, userId: string) {
    const playlistExists = this.playlists.find(
      (playlist) =>
        playlist.name === createPlaylistDto.name && playlist.userId === userId,
    );
    if (playlistExists) {
      throw new ConflictException('Playlist with this name is already exists');
    }
    const playlist = new Playlist({ ...createPlaylistDto, userId });
    this.playlists.push(playlist);
    return playlist;
  }

  findAll(userId: string) {
    if (!isUUID(userId)) {
      throw new BadRequestException('Invalid UUID format for id');
    }
    return this.playlists.filter((playlist) => playlist.userId === userId);
  }

  findOne(id: string) {
    const playlist = this.playlists.find((playlist) => playlist.id === id);
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }
    return playlist;
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const playlistExists = this.findOne(id);
    if (!playlistExists) {
      throw new NotFoundException('Playlist not found');
    }
    playlistExists.name = updatePlaylistDto.newName;
    playlistExists.updatedAt = Date.now();
    return playlistExists;
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for id');
    }
    const playlist = this.findOne(id);
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }
    this.playlists.splice(this.playlists.indexOf(playlist), 1);
    return playlist;
  }

  addTrack(playlistId: string, trackId: string) {
    const playlistExists = this.findOne(playlistId);
    if (!playlistExists) {
      throw new NotFoundException('Playlist not found');
    }
    const trackExists = playlistExists.tracks.find(
      (track) => track === trackId,
    );
    if (trackExists) {
      throw new ConflictException('Track already exists in playlist');
    }
    return playlistExists.tracks.push(trackId);
  }

  removeTrack(playlistId: string, trackId: string) {
    const playlistExists = this.findOne(playlistId);
    if (!playlistExists) {
      throw new NotFoundException('Playlist not found');
    }
    const trackExists = playlistExists.tracks.find(
      (track) => track === trackId,
    );
    if (!trackExists) {
      throw new NotFoundException('Track not found in playlist');
    }
    return playlistExists.tracks.splice(
      playlistExists.tracks.indexOf(trackId),
      1,
    );
  }
}
