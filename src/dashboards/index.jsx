import '../styles/default.scss';

import CircleCIBuildsOverview from '../widgets/circle-ci-builds-overview/widget';
import Dashboard from '../widgets/dashboard';
// eslint-disable-next-line import/first
import React from 'react';
// eslint-disable-next-line import/first
import ReactDOM from 'react-dom';
import RecentCiBuilds from '../widgets/recent-ci-builds/widget';

ReactDOM.render(
  <Dashboard>
    <RecentCiBuilds size="medium" name="RecentCiBuilds" />
  </Dashboard>,
  document.getElementById('content')
);
