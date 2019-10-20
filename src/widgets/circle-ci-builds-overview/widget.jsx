import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseWidget from '../base';
import './styles.scss';

export default class CircleCIBuildsOverview extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      outcome: undefined,
      commitMessage: undefined,
      updatedAt: undefined,
    };
  }

  render() {
    const classList = classNames(
      ...this.classList,
      'widget__circleCIBuildsOverview',
      `widget--${this.state.outcome}`,
    );

    return (
      <div className={classList}>
        <h1 className="widget__title">{this.props.title}</h1>
        <h2 className="widget__value">{this.state.outcome ? this.state.outcome : '---'}</h2>
        {this.state.commitMessage && <p>{this.state.commitMessage}</p>}
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

CircleCIBuildsOverview.propTypes = {
  title: PropTypes.string.isRequired,
};
