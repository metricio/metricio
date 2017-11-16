import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseWidget from '../base';
import { parseTime, parseStatusCode } from '../../../lib/utils';
import './styles.scss';

export default class PingWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      time: undefined,
      updatedAt: undefined,
      status: undefined,
    };
  }

  render() {
    const parsedTime = this.state.time ? parseTime(this.state.time) : { unit: '---', metric: '' };
    const classList = classNames(
      ...this.classList,
      'widget__ping',
      `widget__ping--${parseStatusCode(this.state.status)}`,
    );

    return (
      <div className={classList}>
        <h1 className="widget__title">{this.props.title}</h1>
        <h2 className="widget__value">
          {parsedTime.unit}
          <small>{parsedTime.metric}</small>
        </h2>
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

PingWidget.propTypes = {
  title: PropTypes.string.isRequired,
};
