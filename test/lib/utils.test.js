import test from 'ava';

import { parseStatusCode, parseTime } from '../../lib/utils';

test('parses times', async t => {
  const milliseconds = parseTime(500);
  const seconds = parseTime(1500);
  const minutes = parseTime(70000);

  t.is(milliseconds.unit, 500, 'milliseconds unit incorrect');
  t.is(milliseconds.metric, 'ms', 'milliseconds metric incorrect');
  t.is(seconds.unit, '1.50', 'seconds unit incorrect');
  t.is(seconds.metric, 's', 'seconds metric incorrect');
  t.is(minutes.unit, '1.17', 'minutes unit incorrect');
  t.is(minutes.metric, 'm', 'minutes metric incorrect');
});

test('parses status codes', async t => {
  t.is(parseStatusCode(500), 'down', 'parsed status code was incorrect');
  t.is(parseStatusCode(200), 'up', 'parsed status code was incorrect');
});
