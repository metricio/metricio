import request from 'request-promise-native';

// Helper method to fetch a status for a branch
function getBranch(repo, branch, limit = 10) {
  const githubUser = 'ePages-de';
  const endpoint = 'https://circleci.com/api/v1.1/project/github';
  const options = {
    uri: `${endpoint}/${githubUser}/${repo}/tree/${branch}`,
    qs: {
      'circle-token': '',
      offset: 0,
      limit,
    },
    headers: {
      'User-Agent': 'Metricio - CircleCI',
    },
    json: true,
  };
  return request(options);
}

// Define our interval e.g. https://crontab.guru
export const interval = '*/2 * * * *';

// Define our jobs function
export const perform = async () => {

  const epagesUiMaster = await getBranch('epages-ui', 'master');

  const merchantUiMaster = await getBranch('ng-merchant-ui', 'master')

  return [
    {
      target: 'epages-ui-master',
      data: {
        outcome: epagesUiMaster[0].outcome === null ? 'pending' : epagesUiMaster[0].outcome,
        commitMessage: epagesUiMaster[0].subject === null ? 'unknown commit message' : epagesUiMaster[0].subject,
      },
    },
    {
        target: 'ng-merchant-ui-master',
        data: {
          outcome: merchantUiMaster[0].outcome === null ? 'pending' : merchantUiMaster[0].outcome,
          commitMessage: merchantUiMaster[0].subject === null ? 'unknown commit message' : merchantUiMaster[0].subject,
        },
      },
  ];
};