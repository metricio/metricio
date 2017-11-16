import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import classNames from 'classnames';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

import BaseWidget from '../base';
import './styles.scss';

export default class SparklineWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      updatedAt: undefined,
    };
  }

  render() {
    const latestValue = this.state.value ? this.state.value.slice(-1).pop() : 0;
    const classList = classNames(...this.classList, 'widget__sparkline');

    return (
      <div className={classList}>
        <div className="sparkline">
          {typeof this.state.value !== 'undefined' && (
            <div>
              <Sparklines data={this.state.value}>
                <SparklinesLine color="white" />
                <SparklinesSpots />
              </Sparklines>
            </div>
          )}
        </div>
        <h1 className="widget__title">{this.props.title}</h1>
        <h2 className="widget__value">
          <span>
            {this.props.format ? numeral(latestValue).format(this.props.format) : latestValue}
            {this.props.metric && <small>{this.props.metric}</small>}
          </span>
        </h2>
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

SparklineWidget.propTypes = {
  format: PropTypes.string,
  metric: PropTypes.string,
  title: PropTypes.string.isRequired,
};
