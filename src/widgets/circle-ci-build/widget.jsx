import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseWidget from '../base';
import './styles.scss';

export default class CircleCIBuild extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      status: undefined,
      updatedAt: undefined,
    };
  }

  render() {
    const classList = classNames(
      ...this.classList,
      'widget__circleCIBuild',
      `widget--${this.state.name}`,
    );

    return (
      <div className={classList}>
        <h1 className="widget__title">{this.props.title}</h1>
        <h2 className="widget__value">{this.state.name ? this.state.name : '---'}</h2>
        <p>Is it building? {this.state.status ? 'Of course it is!' : 'Nope, go fix it!'}</p>
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

CircleCIBuild.propTypes = {
  title: PropTypes.string.isRequired,
};
