import '../styles/default.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../widgets/dashboard';
import RecentCiBuilds from '../widgets/recent-ci-builds/widget';

ReactDOM.render(
  <Dashboard>
    <RecentCiBuilds size="medium" name="RecentCiBuilds" />
  </Dashboard>,
  document.getElementById('content')
);
