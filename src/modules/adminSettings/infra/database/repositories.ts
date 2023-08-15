import { asClass, createContainer } from 'awilix';

import { AdminSettingsRepository } from './adminSettings.repository';
import { CachedPlaylistRepository } from './cachedPlaylist.repository';
import { WorkspaceInfoRepository } from '../../../../shared/database/workspaceInfo.repository';

interface IRepository {
  adminSettingsRepository: AdminSettingsRepository;
  cachedPlaylistRepository: CachedPlaylistRepository;
  workspaceInfoRepository: WorkspaceInfoRepository;
}

const container = createContainer<IRepository>();

container.register({
  adminSettingsRepository: asClass(AdminSettingsRepository),
  cachedPlaylistRepository: asClass(CachedPlaylistRepository),
  workspaceInfoRepository: asClass(WorkspaceInfoRepository),
});
export const adminSettingsRepositoryInstance =
  container.resolve<AdminSettingsRepository>('adminSettingsRepository');
export const cachedPlaylistRepositoryInstance =
  container.resolve<CachedPlaylistRepository>('cachedPlaylistRepository');
export const workspaceInfoRepositoryInstance =
  container.resolve<WorkspaceInfoRepository>('workspaceInfoRepository');
export default container;
