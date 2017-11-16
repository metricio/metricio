import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/default.scss';

import Dashboard from '../widgets/dashboard';
import NumberWidget from '../widgets/number/widget';
import PingWidget from '../widgets/ping/widget';
import BuildStatusWidget from '../widgets/build-status/widget';
import SparklineWidget from '../widgets/sparkline/widget';
import ProgressWidget from '../widgets/progress/widget';

ReactDOM.render(
  <Dashboard>
    <SparklineWidget name="DemoUsers" title="Users" format="0.00a" />
    <PingWidget name="GooglePing" title="API" />
    <NumberWidget name="ReasonPRs" title="Pull Requests" />
    <BuildStatusWidget name="DemoMaster" title="Build - Master" size="medium" />
    <ProgressWidget name="DemoProgress" title="Sales Target" />
    <NumberWidget name="DemoConversion" title="Conversion" metric="%" format="0.0a" />
    <BuildStatusWidget name="DemoDevelop" title="Build - Develop" size="medium" />
  </Dashboard>,
  document.getElementById('content'),
);
