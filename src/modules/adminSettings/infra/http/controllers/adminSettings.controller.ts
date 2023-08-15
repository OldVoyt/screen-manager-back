import type { Response } from 'express';
import { HttpStatus } from '../../../../../shared/enums/http-status.enum';
import { RequestWithUser } from '../../../../../../custom';
import { AdminSettingsModel } from '../../../../../shared/model/AdminSettings';
import { SaveAdminSettingsService } from '../../../services/save.adminSettings.service';
import {
  adminSettingsRepositoryInstance,
  workspaceInfoRepositoryInstance,
} from '../../database/repositories';

export class AdminSettingsController {
  public async getAdminSettings(req: RequestWithUser, res: Response) {
    if (!req.userId) {
      throw res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'No user id' });
    }

    const existingWorkspaceInfo =
      await workspaceInfoRepositoryInstance.findByUserId(req.userId);

    if (!existingWorkspaceInfo) {
      console.log('Creating new workspace info');
      const newAdminSettings = await adminSettingsRepositoryInstance.create({
        Id: 'new',
      });
      const newWorkspaceInfo = await workspaceInfoRepositoryInstance.create({
        AdminSettingsId: newAdminSettings.Id,
        UserId: req.userId,
      });
      res.json(newAdminSettings);
      return;
    }
    console.log('Getting existing admin settings');

    const existingAdminSettings = await adminSettingsRepositoryInstance.findOne(
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

    const service = new SaveAdminSettingsService();
    const adminSettings = await service.save(
      req.userId,
      req.body as AdminSettingsModel
    );

    res.json(adminSettings);
  }
}
