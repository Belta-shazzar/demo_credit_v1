import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const config = new ConfigService();

export const knexConfig = {
  config: {
    client: config.get('DB_CLIENT'),
    version: '5.7',
    useNullAsDefault: true,
    connection: {
      host: config.get('DB_HOST'),
      user: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
    },
  },
};
