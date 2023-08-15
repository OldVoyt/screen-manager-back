import { configService } from 'nest-shared';

export const GOOGLE_CLIENT_ID =
  configService.getValue<string>('GOOGLE_CLIENT_ID');
export const GOOGLE_CLIENT_SECRET = configService.getValue<string>(
  'GOOGLE_CLIENT_SECRET'
);
console.log(`GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID}`);
