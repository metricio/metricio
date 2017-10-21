import request from 'request-promise-native';

const options = {
  uri: 'https://api.github.com/repos/facebook/reason/pulls',
  headers: {
    'User-Agent': 'Metricio - Github',
  },
  json: true,
};

export const interval = '*/2 * * * *'; // See https://crontab.guru/ for help
export const perform = async () => {
  const response = await request(options);

  return [
    {
      target: 'ReasonPRs', // Name of widget in dashboard to update
      data: {
        value: response.length, // Value to be passed to React component state
      },
    },
  ];
};
