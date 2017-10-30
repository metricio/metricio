import test from 'ava';
import React from 'react';
import { Server as SocketServer } from 'mock-socket';
import { shallow } from 'enzyme';

import Progress from '../../src/widgets/progress/widget';

let mockServer;

test.before(() => {
  mockServer = new SocketServer('ws://localhost:8080');
});
test.after(() => {
  mockServer.stop();
});

test('renders sucessfully', t => {
  const wrapper = shallow(<Progress socket={mockServer} name="Test" title="Progress" />);

  t.is(wrapper.find('.widget__title').length, 1);
  t.is(wrapper.find('.widget__title').text(), 'Progress');
});

test('sets default state', t => {
  const wrapper = shallow(<Progress socket={mockServer} name="Test" title="Progress" />);
  t.is(wrapper.find('.widget__progress .progress').length, 0);
  t.is(wrapper.find('.widget__progress .widget__value').length, 1);
});

test('sets progress', t => {
  const wrapper = shallow(<Progress socket={mockServer} name="Test" title="Progress" />);
  wrapper.setState({ progress: 69 });

  t.is(wrapper.find('.widget__progress .progress').length, 1);
  t.is(wrapper.find('.widget__progress svg').length, 1);
});

test('sets updatedAt time', t => {
  const wrapper = shallow(<Progress socket={mockServer} name="Test" title="Progress" />);

  const mockDate = '12/12/1212 12:00';
  wrapper.setState({ progress: 90, updatedAt: mockDate });
  t.is(wrapper.find('.widget__updatedAt').text(), mockDate);

  wrapper.setState({ updatedAt: undefined });
  t.is(wrapper.find('.widget__updatedAt').length, 0);
});
