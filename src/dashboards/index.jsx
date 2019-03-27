import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/default.scss';

import Dashboard from '../widgets/dashboard';
import CircleCIBuildsOverview from '../widgets/circle-ci-builds-overview/widget';

ReactDOM.render(
  <Dashboard>
    <CircleCIBuildsOverview
      name="epages-ui-master"
      title="epages-ui master"
      size="medium"
    />
    <CircleCIBuildsOverview
      name="ng-merchant-ui-master"
      title="ng-merchant-ui master"
      size="medium"
    />
  </Dashboard>,
  document.getElementById('content'),
);
