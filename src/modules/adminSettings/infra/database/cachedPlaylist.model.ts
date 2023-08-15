import { Model, Document, model, Schema } from 'mongoose';

import { CachedPlaylist } from '../../../../shared/model/CachedPlaylist';
import { CACHED_PLAYLIST_MODEL_NAME } from '../../shared/constants/adminSettings.constant';
import { storageItemSchemaDefinition } from './storageItem.model';

export type CachedPlaylistDocument = Document & CachedPlaylist;

type CachedPlaylistModel = Model<CachedPlaylistDocument>;
const cachedPlaylistSchema = new Schema<CachedPlaylistDocument, CachedPlaylist>(
  {
    ConnectionId: { type: 'string', index: true },
    PlaylistItems: [storageItemSchemaDefinition],
  }
);
export default model<CachedPlaylistDocument, CachedPlaylistModel>(
  CACHED_PLAYLIST_MODEL_NAME,
  cachedPlaylistSchema
);
