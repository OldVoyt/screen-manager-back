import type { Request, Response } from 'express';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../../constants/auth.constants';
import { HttpStatus } from '../../../../shared/enums/http-status.enum';
import { UserRepository } from '../../../../shared/database/user.repository';

const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage'
);

interface AuthResult {
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface RefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

export class AuthController {
  public async google(req: Request, res: Response) {
    console.log(req);

    const { tokens } = await oAuth2Client.getToken(req.body.code);
    if (!tokens.id_token) {
      throw res.status(HttpStatus.UNAUTHORIZED).json();
    }
    if (!tokens.access_token) {
      throw res.status(HttpStatus.UNAUTHORIZED).json();
    }
    const userData = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
    });

    const userEmail = userData.getPayload()?.email;
    const userId = userData.getUserId();

    if (!userEmail) {
      throw res.status(HttpStatus.BAD_REQUEST).json({
        message: 'No email',
      });
    }

    if (!userId) {
      throw res.status(HttpStatus.BAD_REQUEST).json({
        message: 'No user id',
      });
    }
    const userRepository = new UserRepository();
    await userRepository.findOrCreate({
      Email: userEmail,
      Id: userId,
    });
    console.log(`Authenticated user: ${userEmail}`);
    const result: AuthResult = {
      accessToken: tokens.access_token!,
      email: userEmail,
      refreshToken: tokens.refresh_token!,
    };

    res.json(result);
  }
  public async refreshGoogleToken(req: Request, res: Response) {
    const user = new UserRefreshClient(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      req.body.refreshToken
    );
    const { credentials } = await user.refreshAccessToken(); // optain new tokens
    if (!credentials.access_token || !credentials.refresh_token) {
      throw res.status(HttpStatus.UNAUTHORIZED).json();
    }
    const result: RefreshTokenResult = {
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token,
    };
    res.json(result);
  }
}
