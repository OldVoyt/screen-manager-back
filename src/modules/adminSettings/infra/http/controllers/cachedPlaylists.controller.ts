import { RequestWithUser } from '../../../../../../custom';
import { Response } from 'express';
import { cachedPlaylistRepositoryInstance } from '../../database/repositories';

export class CachedPlaylistController {
  public async get(req: RequestWithUser, res: Response) {
    const connectionId = req.body.id;
    const pl = await cachedPlaylistRepositoryInstance.findOne(connectionId);
    res.json(pl);
  }
}
