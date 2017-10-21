import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';

import '../styles/default.scss';

import NumberWidget from '../widgets/number/widget';
import PingWidget from '../widgets/ping/widget';
import BuildStatusWidget from '../widgets/build-status/widget';
import SparklineWidget from '../widgets/sparkline/widget';

const socket = socketIOClient(`http://${window.location.host}`);

ReactDOM.render(
  <div className="dashboard">
    <PingWidget socket={socket} name="GooglePing" title="Google" />
    <NumberWidget socket={socket} name="ReasonPRs" title="Pull Requests" />
    <PingWidget socket={socket} name="RedditPing" title="Reddit" />
    <BuildStatusWidget socket={socket} name="DemoMaster" title="Build - Master" size="medium" />
    <SparklineWidget socket={socket} name="DemoUsers" title="Users" format="0.00a" />
    <NumberWidget socket={socket} name="DemoConversion" title="Conversion" metric="%" format="0.0a"/>
    <BuildStatusWidget socket={socket} name="DemoDevelop" title="Build - Develop" size="medium" />
  </div>,
  document.getElementById('content'),
);
