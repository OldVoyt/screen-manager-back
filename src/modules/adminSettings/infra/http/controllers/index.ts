import { InjectionMode, createContainer, asClass } from 'awilix';
import { AdminSettingsController } from './adminSettings.controller';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  authController: asClass(AdminSettingsController).proxy(),
});

export const adminSettingsControllerInstance =
  container.resolve<AdminSettingsController>('authController');

export default container;
