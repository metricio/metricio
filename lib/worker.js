import * as NodeResque from 'node-resque';

import * as storage from './storage';
import logger from './logger';

export default (queues, jobs) => {
  const worker = new NodeResque.Worker(
    {
      connection: storage.resqueConfig,
      queues,
    },
    jobs,
  );

  worker.on('start', () => {
    logger('info', 'worker: started');
  });

  worker.on('end', () => {
    logger('info', 'worker: ended');
  });

  worker.on('cleaning_worker', (wrker, pid) => {
    logger('info', `worker: cleaning old worker: ${pid}`);
  });

  // worker.on('poll', queue => {
  //   logger('info', `worker: polling -> "${queue}"`);
  // });

  worker.on('job', (queue, job) => {
    logger('info', `worker: processing queue -> ${queue}:${JSON.stringify(job.class)}`);
  });

  worker.on('reEnqueue', (queue, job, widget) => {
    logger('info', 'worker: re-enqueuing job ->', `(${widget}) ${queue} ${JSON.stringify(job)}`);
  });

  worker.on('success', (queue, job, widgets) => {
    logger(
      'info',
      'worker: success \n',
      `{ dashboard: "${queue}", job: "${job.class}" widgets: "${widgets
        .map(w => w.target)
        .join(', ')}"`,
    );
  });

  worker.on('failure', (queue, job, failure) => {
    logger('info', 'worker: job failure', `(${queue}) ${JSON.stringify(job)} -> ${failure}`);
  });

  worker.on('error', (error, queue, job) => {
    logger('info', 'worker: error', `(${queue}) ${JSON.stringify(job)} -> ${error}`);
  });

  // worker.on('pause', () => {
  //   logger('info', 'worker: paused');
  // });

  return worker;
};
