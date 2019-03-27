import './styles.scss';

import BaseWidget from '../base';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

// eslint-disable-next-line react/prefer-stateless-function
export default class CircleCIBuild extends React.Component {
  render() {
    const classList = classNames(
      'widget__circleCIBuild',
      `widget--${this.props.name}`
    );

    return (
      <div className={classList}>
        <h1 className="widget__title">{this.props.title}</h1>
        <h2 className="widget__value">
          {this.props.name ? this.props.name : '---'}
        </h2>
        <p>
          Is it building?
          {this.props.status ? 'Of course it is!' : 'Nope, go fix it!'}
        </p>
        {this.props.updatedAt && (
          <p className="widget__updatedAt">{this.props.updatedAt}</p>
        )}
      </div>
    );
  }
}

CircleCIBuild.propTypes = {
  title: PropTypes.string.isRequired,
};
