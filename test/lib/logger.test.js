import test from 'ava';
import sinon from 'sinon';

import logger from '../../lib/logger';

let mockedConsole;

test.before(async () => {
  mockedConsole = sinon.stub(console, 'log');
});
test.after(async () => {
  mockedConsole.restore();
});
test.beforeEach(async () => {
  mockedConsole.reset();
});

test.serial('logs to console', async t => {
  logger('test', 'there is no spoon', { spoon: false });

  t.true(mockedConsole.calledOnce, 'logger was not called once');
});

test.serial('logs to console with args', async t => {
  const level = 'defcon5';
  const msg = 'there is no spoon';
  const data = { spoon: false };

  logger(level, msg, data);

  t.true(mockedConsole.args[0][0].includes(level), 'level was missing from logger args');
  t.is(msg, mockedConsole.args[0][1], ' message was missing from logger args');
  t.is(data, mockedConsole.args[0][2], ' data was missing from logger args');
});

test.serial('doesn\'t throw with missing args', async t => {
  const level = 'defcon3';

  logger(level);

  t.true(mockedConsole.args[0][0].includes(level), 'level was missing from logger args');
});
