import crypto from 'crypto';
import request from 'request-promise-native';

function getRecentBuilds(limit = 10) {
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

export const interval = '*/2 * * * *';

export const perform = async () => {
  const recentBuilds = await getRecentBuilds(30);

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
