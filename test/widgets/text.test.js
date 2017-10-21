import test from 'ava';
import React from 'react';
import { Server as SocketServer } from 'mock-socket';
import { shallow } from 'enzyme';

import TextWidget from '../../src/widgets/text/widget';

let mockServer;

test.before(() => {
  mockServer = new SocketServer('ws://localhost:8080');
});
test.after(() => {
  mockServer.stop();
});

test('renders sucessfully', t => {
  const wrapper = shallow(<TextWidget socket={mockServer} name="Test" title="Batman" />);

  t.is(wrapper.find('.widget__title').length, 1);
  t.is(wrapper.find('.widget__value').length, 1);
  t.is(wrapper.find('.widget__title').text(), 'Batman');
});

test('sets value', t => {
  const expected = 'Bruce Wayne';
  const wrapper = shallow(<TextWidget socket={mockServer} name="Test" title="Batman" />);

  t.is(wrapper.find('.widget__value').text(), '---');

  wrapper.setState({ value: expected });
  t.is(wrapper.find('.widget__value').text(), expected);
});
