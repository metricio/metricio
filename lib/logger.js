/* eslint-disable no-alert, no-console */
import moment from 'moment';

export default (level, msg, data) => {
  const timestamp = moment().format('D/M/YYYY-h:mm:ss');
  const prefix = `${timestamp} [${level}] ->`;

  console.log(prefix, msg || '', data || '');
};
