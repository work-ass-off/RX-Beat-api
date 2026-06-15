import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/user/entities/user.entity';
import { AddTrackDto } from './dto/add-track.dto';

@UseGuards(JwtGuard)
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(
    @Body() createPlaylistDto: CreatePlaylistDto,
    @Request() req: { user: User },
  ) {
    return this.playlistService.create(createPlaylistDto, req.user.id);
  }

  @Post(':id/tracks/')
  addTrack(@Param('id') playlistId: string, @Body() dto: AddTrackDto) {
    return this.playlistService.addTrack(playlistId, dto.trackId);
  }

  @Get()
  findAll(@Request() req: { user: User }) {
    return this.playlistService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }

  @Delete(':id/tracks/:trackId')
  removeTrack(
    @Param('id') playlistId: string,
    @Param('trackId') trackId: string,
  ) {
    return this.playlistService.removeTrack(playlistId, trackId);
  }
}
