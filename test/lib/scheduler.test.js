import test from 'ava';
import Proxyquire from 'proxyquire';
import sinon from 'sinon';

const proxyquire = Proxyquire.noCallThru();
const loggerSpy = sinon.spy();

const ResqueScheduler = proxyquire('../../lib/scheduler', {
  './logger': loggerSpy,
}).default;

const scheduler = ResqueScheduler();

test('connects, starts and ends', async t => {
  await t.notThrows(scheduler.connect());
  await t.notThrows(scheduler.start());
  await t.notThrows(scheduler.end());
});
