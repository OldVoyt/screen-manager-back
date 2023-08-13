import { NextFunction, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../../modules/auth/constants/auth.constants';
import { RequestWithUser } from '../../../custom';
import { UserRepository } from '../database/user.repository';
const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage'
);
export const authenticateUser = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.header('Authorization');
  if (!authHeader) {
    throw response.status(401).json({ message: 'Invalid access token.' });
  }
  const token = authHeader && authHeader.split(' ')[1];
  try {
    const tokenInfo = await oAuth2Client.getTokenInfo(token);

    if (tokenInfo.email) {
      request.userEmail = tokenInfo.email;
      const user = await new UserRepository().findOne(tokenInfo.email);

      request.userId = user.Id;
      next();
    } else {
      throw response.status(401).json({ message: 'Invalid access token.' });
    }
  } catch (error) {
    throw response.status(401).json({ message: 'Invalid access token.' });
  }
};
