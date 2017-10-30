import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';

import '../styles/default.scss';

import NumberWidget from '../widgets/number/widget';
import PingWidget from '../widgets/ping/widget';
import BuildStatusWidget from '../widgets/build-status/widget';
import SparklineWidget from '../widgets/sparkline/widget';
import ProgressWidget from '../widgets/progress/widget';

const socket = socketIOClient(`http://${window.location.host}`);

ReactDOM.render(
  <div className="dashboard">
    <SparklineWidget socket={socket} name="DemoUsers" title="Users" format="0.00a" />
    <PingWidget socket={socket} name="GooglePing" title="API" />
    <NumberWidget socket={socket} name="ReasonPRs" title="Pull Requests" />
    <BuildStatusWidget socket={socket} name="DemoMaster" title="Build - Master" size="medium" />
    <ProgressWidget socket={socket} name="DemoProgress" title="Sales Target" />
    <NumberWidget socket={socket} name="DemoConversion" title="Conversion" metric="%" format="0.0a" />
    <BuildStatusWidget socket={socket} name="DemoDevelop" title="Build - Develop" size="medium" />
  </div>,
  document.getElementById('content'),
);
