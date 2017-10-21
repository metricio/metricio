import test from 'ava';
import React from 'react';
import { Server as SocketServer } from 'mock-socket';
import { shallow } from 'enzyme';

import NumberWidget from '../../src/widgets/number/widget';

let mockServer;

test.before(() => {
  mockServer = new SocketServer('ws://localhost:8080');
});
test.after(() => {
  mockServer.stop();
});

test('renders sucessfully', t => {
  const wrapper = shallow(<NumberWidget socket={mockServer} name="Test" title="Number" />);

  t.is(wrapper.find('.widget__title').length, 1);
  t.is(wrapper.find('.widget__value').length, 1);
  t.is(wrapper.find('.widget__title').text(), 'Number');
});

test('sets default state', t => {
  const wrapper = shallow(<NumberWidget socket={mockServer} name="Test" title="Number" />);
  t.is(wrapper.find('.widget__value').text(), '---');
});

test('sets value', t => {
  const wrapper = shallow(<NumberWidget socket={mockServer} name="Test" title="Number" />);
  wrapper.setState({ value: 100 });

  t.is(wrapper.find('.widget__value').text(), '100');
});

test('sets metric', t => {
  const wrapper = shallow(<NumberWidget socket={mockServer} name="Test" title="Number" />);
  wrapper.setProps({ metric: 'Octaves' });
  wrapper.setState({ value: 4 });

  t.is(wrapper.find('.widget__value').text(), '4Octaves');
});

test('formats value', t => {
  const wrapper = shallow(<NumberWidget socket={mockServer} name="Test" title="Number" />);
  wrapper.setProps({ format: '0.00a' });
  wrapper.setState({ value: 4567 });

  t.is(wrapper.find('.widget__value').text(), '4.57k');
});

test('sets updatedAt time', t => {
  const wrapper = shallow(<NumberWidget socket={mockServer} name="Test" title="Number" />);

  const mockDate = '12/12/1212 12:00';
  wrapper.setState({ time: 2000, status: 200, updatedAt: mockDate });
  t.is(wrapper.find('.widget__updatedAt').text(), mockDate);

  wrapper.setState({ updatedAt: undefined });
  t.is(wrapper.find('.widget__updatedAt').length, 0);
});
