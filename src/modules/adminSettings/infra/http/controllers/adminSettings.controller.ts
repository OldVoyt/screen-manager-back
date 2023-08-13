import type { Response } from 'express';
import { HttpStatus } from '../../../../../shared/enums/http-status.enum';
import { AdminSettingsRepository } from '../../database/adminSettings.repository';
import { WorkspaceInfoRepository } from '../../../../../shared/database/workspaceInfo.repository';
import { RequestWithUser } from '../../../../../../custom';
import { AdminSettingsModel } from '../../../../../shared/model/AdminSettings';

export class AdminSettingsController {
  public async getAdminSettings(req: RequestWithUser, res: Response) {
    if (!req.userId) {
      throw res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'No user id' });
    }
    const workspaceInfoRepo = new WorkspaceInfoRepository();
    const adminSettingsRepository = new AdminSettingsRepository();

    const existingWorkspaceInfo = await workspaceInfoRepo.findByUserId(
      req.userId
    );

    if (!existingWorkspaceInfo) {
      console.log('Creating new workspace info');
      const newAdminSettings = await adminSettingsRepository.create({
        Id: 'new',
      });
      const newWorkspaceInfo = await workspaceInfoRepo.create({
        AdminSettingsId: newAdminSettings.Id,
        UserId: req.userId,
      });
      res.json(newAdminSettings);
      return;
    }
    console.log('Getting existing admin settings');

    const existingAdminSettings = await adminSettingsRepository.findOne(
      existingWorkspaceInfo.AdminSettingsId
    );
    res.json(existingAdminSettings);
  }
  public async saveAdminSettings(req: RequestWithUser, res: Response) {
    if (!req.userId) {
      throw res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'No user id' });
    }
    const workspaceInfoRepo = new WorkspaceInfoRepository();
    const adminSettingsRepository = new AdminSettingsRepository();

    const existingWorkspaceInfo = await workspaceInfoRepo.findByUserId(
      req.userId
    );
    if (!existingWorkspaceInfo) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'No workspace associated with the user' });
    }

    const settingsToSave = req.body as AdminSettingsModel;

    if (settingsToSave.Id !== existingWorkspaceInfo.AdminSettingsId) {
      settingsToSave.Id = existingWorkspaceInfo.AdminSettingsId;
    }

    const adminSettings = await adminSettingsRepository.update(settingsToSave);

    res.json(adminSettings);
  }
}
