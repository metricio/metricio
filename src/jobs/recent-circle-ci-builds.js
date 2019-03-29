import crypto from 'crypto';
import request from 'request-promise-native';

const requestOptions = {
  headers: {
    'User-Agent': 'Metricio - CircleCI',
  },
  json: true,
};

function getRecentBuilds(limit = 10) {
  const endpoint = 'https://circleci.com/api/v1.1/recent-builds';
  const options = {
    ...requestOptions,
    uri: endpoint,
    qs: {
      'circle-token': process.env.CIRCLE_CI_TOKEN,
      offset: 0,
      limit,
    },
  };
  return request(options);
}

function getBuildDetails(build) {
  const uri = `https://circleci.com/api/v1.1/project/github/ePages-de/${build.reponame}/${build.circleCiJob}`;

  return request({
    ...requestOptions,
    uri,
    qs: {
      'circle-token': process.env.CIRCLE_CI_TOKEN,
    },
  });
}

function getPullRequestName({ owner, reponame, githubPR }) {
  if (!owner || !reponame || !githubPR) return {}

  const uri = `https://api.github.com/repos/${owner}/${reponame}/pulls/${githubPR}`;

  return request({
    ...requestOptions,
    uri,
    auth: {
      user: process.env.GITHUB_USER,
      pass: process.env.GITHUB_TOKEN,
    },
  });
}

function getGravatar(email) {
  const hash = crypto
    .createHash('md5')
    .update(email)
    .digest('hex');

  return `https://www.gravatar.com/avatar/${hash}?s=512&default=retro`;
}

export const interval = '*/10 * * * * *';

function getProjects() {
  const endpoint = 'https://circleci.com/api/v1.1/projects';
  const options = {
    ...requestOptions,
    uri: endpoint,
    qs: {
      'circle-token': process.env.CIRCLE_CI_TOKEN,
    },
  };

  return request(options);
}

export const perform = async () => {
  const recentBuilds = await getRecentBuilds(80);
  const projects = await getProjects();

  const isSamePullRequestAs = a => b => a.branch === b.branch && a.reponame === b.reponame;

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
        owner: build.username,
        reponame: build.reponame,
        githubPR: build.branch.split('pull/')[1]
          ? parseInt(build.branch.split('pull/')[1], 10)
          : null,
        buildUrl: build.build_url,
      });
    }
    return allBuilds;
  }, []);

  const enrichedBuilds = await Promise.all(builds.map(async build => {
    build.prTitle = (await getPullRequestName(build)).title;

    if (build.buildStatus === 'failed') {
      build.failedStep = (await getBuildDetails(build))
        .steps.find(step => step.actions.find(action => action.failed))
        .name;
    }
    return build;
  }));

  return [
    {
      target: 'RecentCiBuilds',
      data: {
        projects,
        builds: enrichedBuilds,
      },
    },
  ];
};
