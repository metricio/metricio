import test from 'ava';
import React from 'react';
import { Server as SocketServer } from 'mock-socket';
import { shallow } from 'enzyme';

import SparklineWidget from '../../src/widgets/sparkline/widget';

let mockServer;

test.before(() => {
  mockServer = new SocketServer('ws://localhost:8080');
});
test.after(() => {
  mockServer.stop();
});

test('renders sucessfully', t => {
  const wrapper = shallow(<SparklineWidget socket={mockServer} name="Test" title="Sparky" />);

  t.is(wrapper.find('.widget__title').length, 1);
  t.is(wrapper.find('.widget__value').length, 1);
  t.is(wrapper.find('.widget__title').text(), 'Sparky');
});

test('sets default state', t => {
  const wrapper = shallow(<SparklineWidget socket={mockServer} name="Test" title="Sparky" />);
  t.is(wrapper.find('.widget__value').text(), '0');
});

test('sets value', t => {
  const wrapper = shallow(<SparklineWidget socket={mockServer} name="Test" title="Sparky" />);
  wrapper.setState({ value: [1, 2, 3, 4] });

  t.is(wrapper.find('.widget__value').text(), '4');
});

test('renders sparkline', t => {
  const wrapper = shallow(<SparklineWidget socket={mockServer} name="Test" title="Sparky" />);
  wrapper.setState({ value: [1, 2, 3, 4] });

  t.is(wrapper.find('.sparkline').length, 1);
  t.is(wrapper.find('.sparkline').children().length, 1);
});

test('sets metric', t => {
  const wrapper = shallow(<SparklineWidget socket={mockServer} name="Test" title="Sparky" />);
  wrapper.setProps({ metric: 'Joules' });
  wrapper.setState({ value: [1, 2, 3, 4] });

  t.is(wrapper.find('.widget__value').text(), '4Joules');
});

test('formats value', t => {
  const wrapper = shallow(<SparklineWidget socket={mockServer} name="Test" title="Sparky" />);
  wrapper.setProps({ format: '0.00a' });
  wrapper.setState({ value: [1, 2, 3, 4] });

  t.is(wrapper.find('.widget__value').text(), '4.00');
});

test('sets updatedAt time', t => {
  const wrapper = shallow(<SparklineWidget socket={mockServer} name="Test" title="Sparky" />);

  const mockDate = '12/12/1212 12:00';
  wrapper.setState({ time: 2000, status: 200, updatedAt: mockDate });
  t.is(wrapper.find('.widget__updatedAt').text(), mockDate);

  wrapper.setState({ updatedAt: undefined });
  t.is(wrapper.find('.widget__updatedAt').length, 0);
});
