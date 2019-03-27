import crypto from 'crypto';
import fs from 'fs';
import request from 'request-promise-native';
const circleCiUser = 'ePages-de';
const repoName = 'epages-ui';

// Helper method to fetch a status for a branch
function getRecentBuilds(repo, branch, limit = 10) {
  const githubUser = circleCiUser;
  const endpoint = 'https://circleci.com/api/v1.1/recent-builds';
  const options = {
    uri: endpoint,
    qs: {
      'circle-token': process.env.CIRCLE_CI_TOKEN,
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

function getGravatar(email) {
  const hash = crypto
    .createHash('md5')
    .update(email)
    .digest('hex');
  return `https://www.gravatar.com/avatar/${hash}?s=512&default=retro`;
}

// Define our interval e.g. https://crontab.guru
export const interval = '*/10 * * * * *';

// Define our jobs function
export const perform = async () => {
  // Resolve promise for master
  const recentBuilds = await getRecentBuilds(30);
  //   const data = JSON.stringify(master[0]);

  console.log(JSON.stringify(recentBuilds));

  return [
    {
      target: 'RecentCiBuilds',
      data: {
        builds: recentBuilds.map(build => ({
          authorAvatar: getGravatar(build.author_email),
          author: build.author_name,
          circleCiJob: build.build_num,
          projectName: build.reponame,
          commitMessage: build.subject,
          buildStatus: build.status,
          githubPR: build.branch,
        })),
      },
    },
  ];
};
