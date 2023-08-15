import { AdminSettingsModel } from '../../../shared/model/AdminSettings';
import { StorageItem } from '../../../shared/model/Storage';
import { CachedPlaylist } from '../../../shared/model/CachedPlaylist';
import { cachedPlaylistRepositoryInstance } from '../infra/database/repositories';
import { ScreenDefinition } from '../../../shared/model/Screen';

export const removeCachedPlaylists = async (
  connectionId: string
): Promise<void> => {
  await cachedPlaylistRepositoryInstance.remove(connectionId);
};

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

function compareObjects(obj1: CachedPlaylist, obj2: CachedPlaylist): boolean {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  const num = obj1.PlaylistItems.length;
  const num1 = obj2.PlaylistItems.length;
  if (num != num1) return false;

  for (let i = 0; i < num; i++) {
    const item1 = obj1.PlaylistItems[i];
    const item2 = obj2.PlaylistItems[i];

    if (item1.Id != item2.Id) return false;
    if (item1.Active != item2.Active) return false;
    if (item1.Url != item2.Url) return false;
    if (item1.Name != item2.Name) return false;
    if (item1.Duration != item2.Duration) return false;
    if (item1.Format != item2.Format) return false;
    if (item1.Resolution != item2.Resolution) return false;
    if (item1.Type != item2.Type) return false;
  }

  return true;
}

export const saveCachedPlaylist = async (cachedPlaylist: CachedPlaylist) => {
  const existingCachedPlaylist = await cachedPlaylistRepositoryInstance.findOne(
    cachedPlaylist.ConnectionId
  );
  if (existingCachedPlaylist) {
    if (compareObjects(cachedPlaylist, existingCachedPlaylist)) {
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
