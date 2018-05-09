import * as NodeResque from 'node-resque';

import * as storage from './storage';
import logger from './logger';

export default jobs => {
  const queue = new NodeResque.Queue({ connection: storage.resqueConfig }, jobs);

  queue.on('error', error => {
    logger('error', 'queue: error -> ', error);
  });

  return queue;
};
