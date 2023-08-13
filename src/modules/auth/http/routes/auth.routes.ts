import { Router } from 'express';

import { authControllerInstance } from '../controllers';

const AuthRouter = Router();

AuthRouter.post('/google', authControllerInstance.google);
AuthRouter.post(
  '/google/refresh-token',
  authControllerInstance.refreshGoogleToken
);

export default AuthRouter;
