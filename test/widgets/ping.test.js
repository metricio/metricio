import test from 'ava';
import React from 'react';
import { Server as SocketServer } from 'mock-socket';
import { shallow } from 'enzyme';

import PingWidget from '../../src/widgets/ping/widget';

let mockServer;

test.before(() => {
  mockServer = new SocketServer('ws://localhost:8080');
});
test.after(() => {
  mockServer.stop();
});

test('renders sucessfully', t => {
  const wrapper = shallow(<PingWidget socket={mockServer} name="Test" title="Ping" />);

  t.is(wrapper.find('.widget__title').length, 1);
  t.is(wrapper.find('.widget__value').length, 1);
  t.is(wrapper.find('.widget__title').text(), 'Ping');
});

test('sets default state', t => {
  const wrapper = shallow(<PingWidget socket={mockServer} name="Test" title="Ping" />);
  t.is(wrapper.find('.widget__value').text(), '---');
});

test('sets updatedAt time', t => {
  const wrapper = shallow(<PingWidget socket={mockServer} name="Test" title="Ping" />);

  const mockDate = '12/12/1212 12:00';
  wrapper.setState({ time: 2000, status: 200, updatedAt: mockDate });
  t.is(wrapper.find('.widget__updatedAt').text(), mockDate);

  wrapper.setState({ updatedAt: undefined });
  t.is(wrapper.find('.widget__updatedAt').length, 0);
});

test('sets value and metric for time', t => {
  const wrapper = shallow(<PingWidget socket={mockServer} name="Test" title="Ping" />);
  t.is(wrapper.find('.widget__value').text(), '---');

  wrapper.setState({ time: 100 });
  t.is(wrapper.find('.widget__value').text(), '100ms');

  wrapper.setState({ time: 10000 });
  t.is(wrapper.find('.widget__value').text(), '10.00s');

  wrapper.setState({ time: 100000 });
  t.is(wrapper.find('.widget__value').text(), '1.67m');
});

test('sets class up and down status', t => {
  const wrapper = shallow(<PingWidget socket={mockServer} name="Test" title="Ping" />);

  wrapper.setState({ time: 100, status: 200, updatedAt: undefined });
  t.is(wrapper.find('.widget__ping--up').length, 1);
  t.is(wrapper.find('.widget__ping--down').length, 0);

  wrapper.setState({ status: 500 });
  t.is(wrapper.find('.widget__ping--up').length, 0);
  t.is(wrapper.find('.widget__ping--down').length, 1);
});
