// Update with your config settings.
import type { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = new ConfigService();
// const config: { [key: string]: Knex.Config } = {
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: config.get('DB_HOST'),
      user: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    seeds: {},
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: config.get('DB_HOST'),
      user: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: config.get('DB_HOST'),
      user: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

// export default config;
