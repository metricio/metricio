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

function getProjects() {
  const endpoint = 'https://circleci.com/api/v1.1/projects';
  const options = {
    uri: endpoint,
    qs: {
      'circle-token': process.env.CIRCLE_CI_TOKEN,
    },
    headers: {
      'User-Agent': 'Metricio - CircleCI',
    },
    json: true,
  };

  return request(options);
}

export const perform = async () => {
  const recentBuilds = await getRecentBuilds(30);
  const projects = await getProjects();

  const isSamePullRequestAs = a => b =>
    a.branch === b.branch && a.reponame === b.reponame;

  const builds = recentBuilds.reduce((allBuilds, build) => {
    if (!allBuilds.some(isSamePullRequestAs(build))) {
      allBuilds.push({
        authorAvatar: getGravatar(build.author_email),
        author: build.author_name,
        circleCiJob: build.build_num,
        commitMessage: build.subject,
        commitHash: build.vcs_revision,
        buildStatus: build.status,
        branch: build.branch,
        reponame: build.reponame,
        githubPR: build.branch.split('pull/')[1]
          ? parseInt(build.branch.split('pull/')[1], 10)
          : null,
        buildUrl: build.build_url,
      });
    }
    return allBuilds;
  }, []);

  return [
    {
      target: 'RecentCiBuilds',
      data: {
        projects,
        builds,
      },
    },
  ];
};
