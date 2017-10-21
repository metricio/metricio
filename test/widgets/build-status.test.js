import test from 'ava';
import React from 'react';
import { Server as SocketServer } from 'mock-socket';
import { shallow } from 'enzyme';

import BuildStatusWidget from '../../src/widgets/build-status/widget';

let mockServer;

test.before(() => {
  mockServer = new SocketServer('ws://localhost:8080');
});
test.after(() => {
  mockServer.stop();
});

test('renders sucessfully', t => {
  const wrapper = shallow(<BuildStatusWidget socket={mockServer} name="Test" title="BuildStatus" />);

  t.is(wrapper.find('.widget__title').length, 1);
  t.is(wrapper.find('.widget__value').length, 1);
  t.is(wrapper.find('.widget__title').text(), 'BuildStatus');
});

test('sets default state', t => {
  const wrapper = shallow(<BuildStatusWidget socket={mockServer} name="Test" title="BuildStatus" />);
  t.is(wrapper.find('.widget__value').text(), '---');
});

test('sets value', t => {
  const wrapper = shallow(<BuildStatusWidget socket={mockServer} name="Test" title="BuildStatus" />);
  wrapper.setState({ outcome: 'success' });

  t.is(wrapper.find('.widget__value').text(), 'success');
});

test('sets outcome class', t => {
  const wrapper = shallow(<BuildStatusWidget socket={mockServer} name="Test" title="BuildStatus" />);

  wrapper.setState({ outcome: 'success' });
  t.is(wrapper.find('.widget--success').length, 1);

  wrapper.setState({ outcome: 'pending' });
  t.is(wrapper.find('.widget--pending').length, 1);
});

test('sets updatedAt time', t => {
  const wrapper = shallow(<BuildStatusWidget socket={mockServer} name="Test" title="Number" />);

  const mockDate = '12/12/1212 12:00';
  wrapper.setState({ time: 2000, status: 200, updatedAt: mockDate });
  t.is(wrapper.find('.widget__updatedAt').text(), mockDate);

  wrapper.setState({ updatedAt: undefined });
  t.is(wrapper.find('.widget__updatedAt').length, 0);
});
