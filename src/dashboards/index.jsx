import '../styles/default.scss';

import CircleCIBuild from '../widgets/circle-ci-build/widget';
import Dashboard from '../widgets/dashboard';
// eslint-disable-next-line import/first
import React from 'react';
// eslint-disable-next-line import/first
import ReactDOM from 'react-dom';
import RecentCiBuilds from '../widgets/recent-ci-builds/widget';

ReactDOM.render(
  <Dashboard>
    <RecentCiBuilds size="medium" name="RecentCiBuilds" />
    <CircleCIBuild
      name="random-build"
      title="Random Build"
      size="medium"
    />
  </Dashboard>,
  document.getElementById('content')
);
