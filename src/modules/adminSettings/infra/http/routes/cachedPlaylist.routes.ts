import { Router } from 'express';

import { cachedPlaylistControllerInstance } from '../controllers';

const CachedPlaylistRouter = Router();

CachedPlaylistRouter.get('/:id', cachedPlaylistControllerInstance.get);

export default CachedPlaylistRouter;
