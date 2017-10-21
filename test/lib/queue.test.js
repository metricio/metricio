import test from 'ava';
import Proxyquire from 'proxyquire';
import sinon from 'sinon';

const proxyquire = Proxyquire.noCallThru();
const loggerSpy = sinon.spy();

const JOBS = {
  testJob: {
    perform: () => true,
  },
};

const ResqueQueue = proxyquire('../../lib/queue', {
  './logger': loggerSpy,
}).default;

const queue = ResqueQueue(JOBS);

test('connects and ends', async t => {
  await t.notThrows(queue.connect());
  await t.notThrows(queue.end());
});

test('sets jobs', async t => {
  const expected = await queue.jobs;
  t.deepEqual(JOBS, expected, 'queue jobs was not equal to mocked jobs');
});
