import { InjectionMode, createContainer, asClass } from 'awilix';
import { AuthController } from './auth.controller';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  authController: asClass(AuthController).proxy(),
});

export const authControllerInstance =
  container.resolve<AuthController>('authController');

export default container;
