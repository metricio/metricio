import Redis from 'ioredis';

import * as appMeta from '../../package.json';


const redisClient = new Redis({
  keyPrefix: `${appMeta.name}:test`,
  port: process.env.REDIS_SERVER_PORT || 6379,
  host: process.env.REDIS_SERVER_HOST || '127.0.0.1',
  password: process.env.REDIS_SERVER_PASSWORD || undefined,
});

export default redisClient;
