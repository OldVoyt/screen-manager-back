import { InjectionMode, createContainer, asClass } from 'awilix';
import { AdminSettingsController } from './adminSettings.controller';
import { CachedPlaylistController } from './cachedPlaylists.controller';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  authController: asClass(AdminSettingsController).proxy(),
  cachedPlaylistController: asClass(CachedPlaylistController).proxy(),
});

export const adminSettingsControllerInstance =
  container.resolve<AdminSettingsController>('authController');
export const cachedPlaylistControllerInstance =
  container.resolve<CachedPlaylistController>('cachedPlaylistController');
export default container;
