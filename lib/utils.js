import moment from 'moment';

export function parseTime(ms) {
  const duration = moment.duration(ms);
  if (ms < 1000) return { unit: duration.asMilliseconds(), metric: 'ms' };
  if (ms >= 1000 && ms < 60000) return { unit: parseFloat(duration.asSeconds()).toFixed(2), metric: 's' };
  return { unit: parseFloat(duration.asMinutes()).toFixed(2), metric: 'm' };
}

export function parseStatusCode(status) {
  if (status !== 200) return 'down';
  return 'up';
}
