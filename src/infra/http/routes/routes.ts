import { Router } from 'express';

import DefaultRouter from '../../../modules/status/infra/http/routes/default.route';
import ProductRouter from '../../../modules/product/infra/http/routes/product.routes';
import AuthRoutes from '../../../modules/auth/http/routes/auth.routes';
import AdminSettingsRouter from '../../../modules/adminSettings/infra/http/routes/adminSettings.routes';

const Routes = Router();

Routes.use('/', DefaultRouter);
//Routes.use('/product', ProductRouter);
Routes.use('/auth', AuthRoutes);
Routes.use('/adminSettings', AdminSettingsRouter);

export default Routes;
