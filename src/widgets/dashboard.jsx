import React from 'react';
import socketIOClient from 'socket.io-client';

function renderWidgets(props) {
  const socket = socketIOClient(`http://${window.location.host}`);
  return React.Children.map(props.children, child => React.cloneElement(child, { socket }));
}

function Dashboard(props) {
  return <div className="dashboard">{renderWidgets(props)}</div>;
}

export default Dashboard;
