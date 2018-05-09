import Redis from 'ioredis';

import * as appMeta from '../../package.json';

export const raf = (cb) => {
  setTimeout(cb, 0);
};

export const redisClient = new Redis({
  keyPrefix: `${appMeta.name}:test`,
  port: process.env.REDIS_SERVER_PORT || 6379,
  host: process.env.REDIS_SERVER_HOST || '127.0.0.1',
  password: process.env.REDIS_SERVER_PASSWORD || undefined,
});
