import crypto from 'node:crypto';

import cachedPlaylistModel from './cachedPlaylist.model';
import { CachedPlaylist } from '../../../../shared/model/CachedPlaylist';
import { HttpStatus } from '../../../../shared/enums/http-status.enum';
import { HttpException } from '../../../../shared/helpers/errors/HttpException';

export class CachedPlaylistRepository {
  public async create(body: CachedPlaylist) {
    const cachedPlaylist = await cachedPlaylistModel.create({
      ...body,
    });
    if (!cachedPlaylist) {
      throw new HttpException(
        'cachedPlaylist not created!',
        HttpStatus.BAD_REQUEST
      );
    }
    return cachedPlaylist;
  }

  public async findOne(connectionId: string): Promise<CachedPlaylist | null> {
    const cachedPlaylist = await cachedPlaylistModel.findOne({
      ConnectionId: connectionId,
    });
    if (!cachedPlaylist) {
      return null;
    }
    return cachedPlaylist.toObject<CachedPlaylist>();
  }

  public async update(body: CachedPlaylist) {
    const cachedPlaylist = await cachedPlaylistModel.findOneAndUpdate(
      { ConnectionId: body.ConnectionId },
      {
        ...body,
      }
    );
    if (!cachedPlaylist) {
      throw new HttpException(
        'cachedPlaylist not updated!',
        HttpStatus.BAD_REQUEST
      );
    }
    return cachedPlaylist;
  }
}
