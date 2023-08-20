import { RequestWithUser } from '../../../../../../custom';
import { Response } from 'express';
import { cachedPlaylistRepositoryInstance } from '../../database/repositories';

export class CachedPlaylistController {
  public async get(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const pl = await cachedPlaylistRepositoryInstance.findOne(id);
    res.json(pl);
  }
}
