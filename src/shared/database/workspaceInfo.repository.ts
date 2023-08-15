import workspaceInfoModel from './workspaceInfo.model';
import { WorkspaceInfo } from '../model/WorkspaceInfo';
import { HttpStatus } from '../enums/http-status.enum';
import { HttpException } from '../helpers/errors/HttpException';

export class WorkspaceInfoRepository {
  public async create(body: WorkspaceInfo) {
    const workspaceInfo = await workspaceInfoModel.create({
      ...body,
    });
    if (!workspaceInfo) {
      throw new HttpException(
        'WorkspaceInfo not created!',
        HttpStatus.BAD_REQUEST
      );
    }
    return workspaceInfo;
  }
  public async findByUserId(userId: string) {
    const workspaceInfo = await workspaceInfoModel.findOne<WorkspaceInfo>({
      UserId: userId,
    });
    return workspaceInfo;
  }

  public async updateByUserId(body: WorkspaceInfo) {
    const workspaceInfo = await workspaceInfoModel.findOneAndUpdate(
      { UserId: body.UserId },
      {
        ...body,
      }
    );
    if (!workspaceInfo) {
      throw new HttpException(
        'WorkspaceInfo not updated!',
        HttpStatus.BAD_REQUEST
      );
    }
    return workspaceInfo;
  }
}
