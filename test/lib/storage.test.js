import test from 'ava';

import * as appMeta from '../../package.json';
import * as storage from '../../lib/storage';

test('resque config has correct keys set', async t => {
  const expectedKeys = ['pkg', 'namespace', 'port', 'host', 'password', 'looping', 'database'];
  const configKeys = Object.keys(storage.resqueConfig);

  expectedKeys.forEach(key => {
    t.true(configKeys.includes(key), `config was missing ${key}`);
  });

  t.is(configKeys.length, expectedKeys.length, 'expected config keys and actual keys differ');
});

test('redis client is available ', async t => {
  const redisOptions = storage.redis.options;

  t.is(redisOptions.keyPrefix, `${appMeta.name}:`, 'redis keyPrefix did not match');
});
