import { AdminSettingsModel } from '../../../shared/model/AdminSettings';
import {
  adminSettingsRepositoryInstance,
  workspaceInfoRepositoryInstance,
} from '../infra/database/repositories';
import {
  populateCachedPlaylists,
  removeCachedPlaylists,
} from './populateCahcedPlaylist';

type TaskFunction = () => Promise<void>;

class TaskQueue {
  private queue: TaskFunction[] = [];
  private processing: boolean = false;

  enqueue(task: TaskFunction) {
    this.queue.push(task);
    this.processNext();
  }

  private async processNext() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    const task = this.queue.shift();

    try {
      await task?.();
    } catch (error) {
      console.error('Error while processing task:', error);
    }

    this.processing = false;
    this.processNext();
  }
}

const taskQueue = new TaskQueue();

export class SaveAdminSettingsService {
  async save(
    userId: string,
    adminSettings: AdminSettingsModel
  ): Promise<AdminSettingsModel> {
    const existingWorkspaceInfo =
      await workspaceInfoRepositoryInstance.findByUserId(userId);
    if (!existingWorkspaceInfo) {
      throw new Error('No workspace associated with the user');
    }
    const existingSettings = await adminSettingsRepositoryInstance.findOne(
      existingWorkspaceInfo.AdminSettingsId
    );
    if (adminSettings.Id !== existingWorkspaceInfo.AdminSettingsId) {
      adminSettings.Id = existingWorkspaceInfo.AdminSettingsId;
    }

    const savedSettings = await adminSettingsRepositoryInstance.update(
      adminSettings
    );

    if (
      existingSettings?.ScreenModel?.Screens &&
      adminSettings?.ScreenModel?.Screens
    ) {
      for (const screen of existingSettings.ScreenModel.Screens) {
        const screenToSave = adminSettings.ScreenModel.Screens.find(
          (screenSaved) => screen.ConnectionId === screenSaved.ConnectionId
        );
        if (!screenToSave) {
          taskQueue.enqueue(() =>
            removeCachedPlaylists(screen.ConnectionId).catch((reason) =>
              console.error('Error during screen deleting', reason)
            )
          );
        }
      }
    }
    taskQueue.enqueue(() =>
      populateCachedPlaylists(adminSettings).catch((reason) =>
        console.error('Error during populating Cached Playlists', reason)
      )
    );

    return adminSettings;
  }
}
