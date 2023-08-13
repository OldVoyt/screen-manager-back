import { configService } from 'nest-shared';

export const MONGODB_URI = configService.getValue<string>('MONGODB_URI');
