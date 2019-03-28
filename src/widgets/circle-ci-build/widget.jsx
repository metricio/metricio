import './styles.scss';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export default function CircleCIBuild({
  author,
  authorAvatar,
  buildStatus,
  projectName,
  commitMessage,
  updatedAt,
}) {
  const classList = classNames(
    'widget__circleCIBuild',
    'widget__circleCIBuild_tile',
    `widget--${buildStatus}`
  );

  const titleClassList = classNames('tile-title', `tile-title--${buildStatus}`);

  return (
    <div className={classList}>
      <div className={titleClassList}>
        <img
          className="tile-title-avatar"
          src={authorAvatar}
          alt=""
          height="64"
        />{' '}
        <p className="tile-title-name">{author}</p>
        <div className="tile-title-control">
          <button>Rebuild</button>
        </div>
      </div>

      <div className="tile-body">
        <div className="tile-body-project">{projectName}</div>
        <div className="tile-body-comment">{commitMessage}</div>
      </div>

      <div className="tile-footer">
        <div className="tile-footer-status">{buildStatus}</div>
        {updatedAt && <p className="widget__updatedAt">{updatedAt}</p>}
      </div>
    </div>
  );
}

CircleCIBuild.propTypes = {
  author: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  buildStatus: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  commitMessage: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};
