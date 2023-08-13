import crypto from 'node:crypto';

import adminSettingsModel from './adminSettings.model';
import { AdminSettingsModel } from '../../../../shared/model/AdminSettings';
import { HttpStatus } from '../../../../shared/enums/http-status.enum';
import { HttpException } from '../../../../shared/helpers/errors/HttpException';

export class AdminSettingsRepository {
  public async create(body: AdminSettingsModel) {
    const adminSettings = await adminSettingsModel.create({
      ...body,
      Id: crypto.randomUUID(),
    });
    if (!adminSettings) {
      throw new HttpException(
        'AdminSettings not created!',
        HttpStatus.BAD_REQUEST
      );
    }
    return adminSettings;
  }

  public async findOne(id: string) {
    const adminSettings = await adminSettingsModel.findOne({
      Id: id,
    });
    if (!adminSettings) {
      throw new HttpException('AdminSettings not found!', HttpStatus.NOT_FOUND);
    }

    return adminSettings.toObject<AdminSettingsModel>();
  }

  public async update(body: AdminSettingsModel) {
    const adminSettings = await adminSettingsModel.findOneAndUpdate(
      { Id: body.Id },
      {
        ...body,
      }
    );
    if (!adminSettings) {
      throw new HttpException(
        'AdminSettings not updated!',
        HttpStatus.BAD_REQUEST
      );
    }
    return adminSettings;
  }
}
