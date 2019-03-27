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
      'widget__circleCIBuild_tile',
      `widget--${this.props.buildStatus}`
    );

    return (
      <div className={classList}>
        <div className="tile-title">
          <img src={this.props.authorAvatar} height="64" /> {this.props.author}
        </div>
        <div className="tile-body-project">{this.props.projectName}</div>
        <div className="tile-body-comment">{this.props.commitMessage}</div>
        <div className="tile-footer-status">{this.props.buildStatus}</div>
        {this.props.updatedAt && (
          <p className="widget__updatedAt">{this.props.updatedAt}</p>
        )}
      </div>
    );
  }
}

CircleCIBuild.propTypes = {};
