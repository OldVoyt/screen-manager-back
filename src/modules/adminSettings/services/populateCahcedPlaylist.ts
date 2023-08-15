import { AdminSettingsModel } from '../../../shared/model/AdminSettings';
import { StorageItem } from '../../../shared/model/Storage';
import { CachedPlaylist } from '../../../shared/model/CachedPlaylist';
import { cachedPlaylistRepositoryInstance } from '../infra/database/repositories';
import { ScreenDefinition } from '../../../shared/model/Screen';

export const populateCachedPlaylists = async (
  adminSettings: AdminSettingsModel
): Promise<void> => {
  if (
    !adminSettings.ScreenModel?.Screens ||
    !adminSettings.PlaylistModel?.Playlists ||
    !adminSettings.StorageModel?.StorageCategory
  ) {
    return;
  }
  const storageItemsLookup: { [key: string]: StorageItem } =
    adminSettings.StorageModel.StorageCategory.flatMap(
      (value) => value.StorageItems
    ).reduce((lookup: { [key: string]: StorageItem }, item) => {
      lookup[item.Id] = item;
      return lookup;
    }, {});

  for (const screen of adminSettings.ScreenModel.Screens) {
    const cachedPlaylist = getCachedPlaylist(
      adminSettings,
      screen,
      storageItemsLookup
    );
    if (cachedPlaylist) {
      await saveCachedPlaylist(cachedPlaylist);
    }
  }
};

export const saveCachedPlaylist = async (cachedPlaylist: CachedPlaylist) => {
  const existingCachedPlaylist = await cachedPlaylistRepositoryInstance.findOne(
    cachedPlaylist.ConnectionId
  );
  if (existingCachedPlaylist) {
    if (
      JSON.stringify(existingCachedPlaylist) === JSON.stringify(cachedPlaylist)
    ) {
      return;
    }
    await cachedPlaylistRepositoryInstance.update(cachedPlaylist);
  } else {
    await cachedPlaylistRepositoryInstance.create(cachedPlaylist);
  }
};

export const getCachedPlaylist = (
  adminSettings: AdminSettingsModel,
  screen: ScreenDefinition,
  storageItemsLookup: {
    [p: string]: StorageItem;
  }
) => {
  const playlist = adminSettings.PlaylistModel!.Playlists.find(
    (value) => value.Id === screen.PlaylistId
  );
  if (playlist?.PlaylistItems) {
    const cachedPlaylistToSave: CachedPlaylist = {
      ConnectionId: screen.ConnectionId,
      PlaylistItems: playlist.PlaylistItems.map(
        (value) => storageItemsLookup[value.StorageItemId]
      ),
    };
    return cachedPlaylistToSave;
  }
};
