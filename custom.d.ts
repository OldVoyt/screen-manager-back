import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userEmail?: string;
      userId?: string;
    }
  }
}
export interface RequestWithUser extends Request {
  userEmail?: string;
  userId?: string;
}
