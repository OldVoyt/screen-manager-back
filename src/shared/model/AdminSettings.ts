import { StorageModel } from './Storage';
import { PlaylistModel } from './Playlist';
import { ScreenModel } from './Screen';

export type AdminSettingsModel = {
  Id: string;
  StorageModel?: StorageModel;
  PlaylistModel?: PlaylistModel;
  ScreenModel?: ScreenModel;
};
