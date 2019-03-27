import fs from 'fs';
import request from 'request-promise-native';

const circleCiToken = 'c05e7c7b5ce0f1bd600345e15de6cb8ad7564ee2';
const circleCiUser = 'ePages-de';
const repoName = 'epages-ui';

// Helper method to fetch a status for a branch
function getBranch(repo, branch, limit = 10) {
  const githubUser = circleCiUser;
  const endpoint = 'https://circleci.com/api/v1.1/project/github';
  const options = {
    uri: `${endpoint}/${githubUser}/${repo}/tree/${branch}`,
    qs: {
      'circle-token': circleCiToken,
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
export const interval = '*/10 * * * * *';

// Define our jobs function
export const perform = async () => {
  // Resolve promise for master
  //   const master = await getBranch(repoName, 'master');
  //   const data = JSON.stringify(master[0]);

  return [
    {
      target: 'RecentCiBuilds',
      data: {
        builds: [
          { id: 1, name: 'build 1', status: 1, buildStatus: 'success', commitMessage: 'Chore: Add mock clear call of browserhistory', projectName: 'ng-merchant-ui', authorAvatar: 'https://www.gravatar.com/avatar/1310d563e8a7ce49e2046e81b22b7552%3E?s=512&default=retro' },
          { id: 2, name: 'asfsaf', buildStatus: 'success' },
          { id: 3, name: 'RANDOM', buildStatus: 'fail' },
        ],
      },
    },
  ];
};
