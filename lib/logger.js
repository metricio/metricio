import moment from 'moment';

export default (level, msg, data) => {
  const timestamp = moment().format('D/M/YYYY-h:mm:ss');
  const prefix = `${timestamp} [${level}] ->`;

  let stream = 'stderr';

  if (level === 'info') {
    if (process.env.LOGLEVEL === 'info') stream = 'stdout';
    else return;
  }

  process[stream].write(`${prefix || ''} ${msg || ''} ${data || ''} \n`);
};
