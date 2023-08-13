import { Router } from 'express';

import { adminSettingsControllerInstance } from '../controllers';
import { authenticateUser } from '../../../../../shared/auth/authenticateUser';

const AdminSettingsRouter = Router();

AdminSettingsRouter.get(
  '/',
  authenticateUser,
  adminSettingsControllerInstance.getAdminSettings
);
AdminSettingsRouter.post(
  '/',
  authenticateUser,
  adminSettingsControllerInstance.saveAdminSettings
);

export default AdminSettingsRouter;
