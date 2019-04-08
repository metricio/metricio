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

export const interval = '*/30 * * * * *';

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

function newToOld(a, b) {
  const [left, right] = [a, b].map(
    x => new Date(x.queued_at || x.stop_time || x.start_time).getTime()
  );
  if (left < right) return 1;
  if (left > right) return -1;
  return 0;
}

function getMostSevereStatus(workflowSteps) {
  const statusBySeverity = [
    'success',
    'fixed',
    'canceled',
    'scheduled',
    'running',
    'failed',
  ]

  function bySeverity(a, b) {
    const [left, right] = [a, b].map(x => statusBySeverity.indexOf(x.buildStatus))
    if (left < right) return 1;
    if (left > right) return -1;
    return 0;
  }

  return workflowSteps.sort(bySeverity)[0].buildStatus
}

export const perform = async () => {
  const recentBuilds = await getRecentBuilds(100);
  const projects = await getProjects();

  const builds = Object.values(recentBuilds.reduce((allBuilds, build) => {
    const {
      stop_time, start_time, queued_at,
      author_name, author_email,
      build_num,
      subject,
      vcs_revision,
      status,
      branch,
      username, reponame,
      build_url,
      workflows,
    } = build

    const key = (workflows || {}).workflow_id || (reponame + branch);

    // skip all but the most recnt workflow builds for the same branch
    if (workflows && Object.values(allBuilds).find(
      b => b.reponame === reponame
        && b.branch === branch
        && b.workflow_id !== workflows.workflow_id
    )
    ) {
      return allBuilds;
    }

    const workflowSteps = workflows
      ? [
        ...((allBuilds[key] || {}).workflowSteps || []),
        {
          name: workflows.job_name,
          buildStatus: status,
        },
      ]
      : null;

    return {
      ...allBuilds,
      [key]: {
        ...allBuilds[key],
        workflow_id: (workflows || {}).workflow_id || null,
        workflowSteps,
        authorAvatar: getGravatar(author_email),
        author: author_name,
        circleCiJob: build_num,
        commitMessage: subject,
        commitHash: vcs_revision,
        buildStatus: workflows ? getMostSevereStatus(workflowSteps) : status,
        branch,
        owner: username,
        reponame,
        stop_time, start_time, queued_at,
        githubPR: branch.split('pull/')[1]
          ? parseInt(branch.split('pull/')[1], 10)
          : null,
        buildUrl: build_url,
      }
    }
  }, {})).sort(newToOld);

  const buildsWithFailureDetails = await Promise.all(builds.slice(0, 12).map(async build => {
    if (build.buildStatus === 'failed' && !build.workflowSteps) {
      build.failedStep = (await getBuildDetails(build))
        .steps.find(step => step.actions.find(action => action.failed))
        .name;
    }

    return build;
  }));

  const buildsWithPrTitle = await Promise.all(buildsWithFailureDetails.map(async build => {
    build.prTitle = (await getPullRequestName(build)).title;
    return build;
  }));

  return [
    {
      target: 'RecentCiBuilds',
      data: {
        projects,
        builds: buildsWithPrTitle,
      },
    },
  ];
};
