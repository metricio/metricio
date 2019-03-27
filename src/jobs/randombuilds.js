function getRandomInfo() {
  return [
    {
      name: 'test',
      status: Math.random() >= 0.5
    }
  ];
}

export const interval = '*/10 * * * * *';

export const perform = async () => {

  const randomBuildsInfo = await getRandomInfo();

  return [
    {
      target: 'random-build',
      data: {
        name: randomBuildsInfo[0].name === null ? 'unknown' : randomBuildsInfo[0].name,
        status: randomBuildsInfo[0].status === null ? 'unknown' : randomBuildsInfo[0].status
      },
    },
  ];
};
