import test from 'ava';
import Proxyquire from 'proxyquire';
import sinon from 'sinon';

const proxyquire = Proxyquire.noCallThru();
const loggerSpy = sinon.spy();

const ResqueWorker = proxyquire('../../lib/worker', {
  './logger': loggerSpy,
}).default;

const QUEUES = ['test:queues'];
const JOBS = {
  testJob: {
    perform: () => true,
  },
};

const worker = ResqueWorker(QUEUES, JOBS);

test('can connect, start and end', async t => {
  await t.notThrows(worker.connect());
  await t.notThrows(worker.start());
  await t.notThrows(worker.end());
});

test('sets jobs', async t => {
  const expected = await worker.jobs;
  t.deepEqual(JOBS, expected, 'worker jobs was not equal to mocked jobs');
});

test('sets queues', async t => {
  const expected = await worker.queues;
  t.deepEqual(QUEUES, expected, 'worker queues was not equal to mocked jobs');
});
