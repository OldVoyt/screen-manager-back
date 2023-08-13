import { Model, Document, model, Schema } from 'mongoose';

import { USER_MODEL_NAME } from '../constants/user.constants';
import { User } from '../model/User';

export type UserDocument = Document & User;

type UserModel = Model<UserDocument>;

const userSchema = new Schema<UserDocument, UserModel>({
  Id: { type: String, required: true },
  Email: { type: String, required: true },
});

export default model<UserDocument, UserModel>(USER_MODEL_NAME, userSchema);
