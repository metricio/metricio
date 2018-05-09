/* eslint-disable no-mixed-operators */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function demoUsers() {
  return Array.from({ length: 30 }, () => getRandomInt(1000, 1500));
}

export const interval = '* * * * *';
export const perform = async () => [{
  target: 'DemoUsers',
  data: {
    value: demoUsers(),
  },
},
{
  target: 'DemoMaster',
  data: {
    outcome: 'success',
  },
},
{
  target: 'DemoDevelop',
  data: {
    outcome: 'success',
  },
},
{
  target: 'DemoConversion',
  data: {
    value: getRandomInt(0, 10) / 100 + 1.3,
  },
},
{
  target: 'DemoProgress',
  data: {
    progress: getRandomInt(1, 100),
  },
},
];
