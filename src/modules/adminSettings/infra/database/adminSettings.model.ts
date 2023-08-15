import { Model, Document, model, Schema } from 'mongoose';

import { AdminSettingsModel as AdminSettingsModelType } from '../../../../shared/model/AdminSettings';
import { ADMIN_SETTINGS_MODEL_NAME } from '../../shared/constants/adminSettings.constant';
import { storageItemSchemaDefinition } from './storageItem.model';

export type AdminSettingsDocument = Document & AdminSettingsModelType;

type AdminSettingsModel = Model<AdminSettingsDocument>;
const adminSettingsSchema = new Schema<
  AdminSettingsDocument,
  AdminSettingsModelType
>({
  Id: { type: String, required: true },
  StorageModel: {
    StorageCategory: [
      {
        Id: { type: String, required: true },
        Name: { type: String, required: true },
        StorageItems: [storageItemSchemaDefinition],
      },
    ],
  },
  PlaylistModel: {
    Playlists: [
      {
        Id: { type: String, required: true },
        Name: { type: String, required: true },
        PlaylistItems: [
          {
            Id: { type: String, required: true },
            StorageItemId: { type: String, required: true },
          },
        ],
      },
    ],
  },
  ScreenModel: {
    Screens: [
      {
        Id: { type: String, required: true },
        Name: { type: String, required: true },
        PlaylistId: { type: String },
        ConnectionId: { type: String },
      },
    ],
  },
});
export default model<AdminSettingsDocument, AdminSettingsModel>(
  ADMIN_SETTINGS_MODEL_NAME,
  adminSettingsSchema
);
