import * as NodeResque from 'node-resque';

import * as storage from './storage';
import logger from './logger';

export default () => {
  const scheduler = new NodeResque.Scheduler({
    connection: storage.resqueConfig,
  });

  scheduler.on('start', () => {
    logger('info', 'scheduler: started');
  });

  scheduler.on('end', () => {
    logger('info', 'scheduler: ended');
  });

  // scheduler.on('poll', () => {
  //   logger('info', 'scheduler: polling');
  // });

  scheduler.on('master', () => {
    logger('info', 'scheduler: became master');
  });

  scheduler.on('error', error => {
    logger('info', 'scheduler: error ->', error);
  });

  scheduler.on('workingTimestamp', timestamp => {
    logger('info', 'scheduler: working timestamp ->', timestamp);
  });

  scheduler.on('transferredJob', (timestamp, job) => {
    logger('info', 'scheduler: enquing job ->', job);
  });

  return scheduler;
};
