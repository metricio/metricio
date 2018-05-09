import Redis from 'ioredis';

import logger from './logger';
import * as appMeta from '../package.json';

export const resqueConfig = {
  pkg: 'ioredis',
  namespace: `${appMeta.name}:resque`,
  port: process.env.REDIS_SERVER_PORT || 6379,
  host: process.env.REDIS_SERVER_HOST || '127.0.0.1',
  password: process.env.REDIS_SERVER_PASSWORD || null,
  looping: true,
  database: 0,
};

export const redis = new Redis({
  keyPrefix: `${appMeta.name}:`,
  port: process.env.REDIS_SERVER_PORT || 6379,
  host: process.env.REDIS_SERVER_HOST || '127.0.0.1',
  password: process.env.REDIS_SERVER_PASSWORD || undefined,
}).on('error', (error) => {
  if (error.code === 'ECONNREFUSED') {
    logger('info', 'requirements: redis (v2.0.0 or above) must be running.');
  }

  logger('error', 'redis:', `${error.code}\n`);

  throw error;
});
