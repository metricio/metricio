import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import numeral from 'numeral';

import BaseWidget from '../base';
import './styles.scss';

export default class NumberWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      updatedAt: undefined,
    };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__number');
    const value = this.props.format
      ? numeral(this.state.value).format(this.props.format)
      : this.state.value;

    return (
      <div className={classList}>
        <h1 className="widget__title">{this.props.title}</h1>
        <h2 className="widget__value">
          {typeof this.state.value !== 'undefined' ? value : '---'}
          {this.props.metric && <small>{this.props.metric}</small>}
        </h2>
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

NumberWidget.propTypes = {
  format: PropTypes.string,
  metric: PropTypes.string,
  title: PropTypes.string.isRequired,
};
