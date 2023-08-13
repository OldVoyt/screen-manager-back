import { Model, Document, model, Schema } from 'mongoose';

import { WorkspaceInfo } from '../model/WorkspaceInfo';
import { WORKSPACE_INFO_MODEL_NAME } from '../constants/workspaceInfo.constants';

export type WorkspaceInfoDocument = Document & WorkspaceInfo;

type WorkspaceInfoModel = Model<WorkspaceInfoDocument>;
const workspaceSchema = new Schema<WorkspaceInfoDocument, WorkspaceInfo>({
  UserId: { type: String, required: true },
  AdminSettingsId: { type: String, required: true },
});
export default model<WorkspaceInfoDocument, WorkspaceInfoModel>(
  WORKSPACE_INFO_MODEL_NAME,
  workspaceSchema
);
