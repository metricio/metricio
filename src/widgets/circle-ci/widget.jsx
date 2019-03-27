/* eslint-disable import/first */
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

import BaseWidget from '../base';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import numeral from 'numeral';

export default class CircleCiWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      updatedAt: undefined,
    };
  }

  render() {
    // const latestValue = this.state.value ? this.state.value.slice(-1).pop() : 0;
    // const classList = classNames(...this.classList, 'widget__sparkline');

    return <div>{this.props.title}</div>;
  }
}

CircleCiWidget.propTypes = {
  format: PropTypes.string,
  metric: PropTypes.string,
  title: PropTypes.string.isRequired,
};
