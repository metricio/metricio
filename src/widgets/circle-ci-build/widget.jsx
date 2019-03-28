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
  circleCiJob,
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
        <div className="tile-footer-icons"><a href={`https://circleci.com/gh/ePages-de/${projectName}/${circleCiJob}`}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100" class="logo"><path d="M50,0C26.703,0,7.127,15.936,1.576,37.5c-0.049,0.191-0.084,0.389-0.084,0.595c0,1.315,1.066,2.381,2.381,2.381h20.16c0.96,0,1.783-0.572,2.159-1.391c0,0,0.03-0.058,0.041-0.083C30.391,30.033,39.465,23.809,50,23.809c14.464,0,26.19,11.726,26.19,26.19c0,14.465-11.726,26.19-26.19,26.19c-10.535,0-19.609-6.225-23.767-15.192c-0.011-0.026-0.041-0.082-0.041-0.082c-0.376-0.82-1.199-1.392-2.16-1.392H3.874c-1.315,0-2.381,1.066-2.381,2.38c0,0.206,0.035,0.406,0.084,0.597C7.127,84.063,26.703,100,50,100c27.614,0,50-22.387,50-50C100,22.385,77.614,0,50,0z" class="turn"></path><path d="M38.096000000000004,50a11.904,11.904 0 1,0 23.808,0a11.904,11.904 0 1,0 -23.808,0" class="circle"></path></svg></a></div>
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
