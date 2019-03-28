import './styles.scss';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export default function CircleCIBuild({
  author,
  authorAvatar,
  buildStatus,
  reponame,
  commitMessage,
  githubPR,
  circleCiJob,
  buildUrl,
  commitHash,
}) {
  const classList = classNames(
    'widget__circleCIBuild',
    'widget__circleCIBuild_tile',
    `widget--${buildStatus}`
  );

  const titleClassList = classNames('tile-title', `tile-title--${buildStatus}`);

  const rebuild = e => {
    fetch('/rebuild', {
      method: 'POST',
      body: JSON.stringify({
        buildUri: buildUrl.replace('https://circleci.com/gh/', ''),
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {})
      .catch(error => console.error('Error:', error));
  };

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
          {!['success', 'fixed'].includes(buildStatus) && (
            <button
              disabled={['running', 'scheduled'].includes(buildStatus)}
              onClick={rebuild}
              className="tile-title-control-rebuild"
            >
              Rebuild
            </button>
          )}
        </div>
      </div>

      <div className="tile-body">
        <div className="tile-body-project">{reponame}</div>
        <div className="tile-body-comment"><a href={`https://github.com/ePages-de/${reponame}/${githubPR ? `pull/${githubPR}/commits` : 'commit'}/${commitHash}`}>{commitMessage}</a></div>
      </div>

      <div className="tile-footer">
        <div className="tile-footer-status">{buildStatus}</div>
        <div className="tile-footer-icons">
          {githubPR && (
            <a
              href={`https://github.com/ePages-de/${reponame}/pull/${githubPR}`}
            >
              <svg
                height="32"
                class="octicon octicon-mark-github"
                viewBox="0 0 16 16"
                version="1.1"
                width="32"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </a>
          )}
          <a
            href={`https://circleci.com/gh/ePages-de/${reponame}/${circleCiJob}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 100 100"
              class="logo"
            >
              <path
                d="M50,0C26.703,0,7.127,15.936,1.576,37.5c-0.049,0.191-0.084,0.389-0.084,0.595c0,1.315,1.066,2.381,2.381,2.381h20.16c0.96,0,1.783-0.572,2.159-1.391c0,0,0.03-0.058,0.041-0.083C30.391,30.033,39.465,23.809,50,23.809c14.464,0,26.19,11.726,26.19,26.19c0,14.465-11.726,26.19-26.19,26.19c-10.535,0-19.609-6.225-23.767-15.192c-0.011-0.026-0.041-0.082-0.041-0.082c-0.376-0.82-1.199-1.392-2.16-1.392H3.874c-1.315,0-2.381,1.066-2.381,2.38c0,0.206,0.035,0.406,0.084,0.597C7.127,84.063,26.703,100,50,100c27.614,0,50-22.387,50-50C100,22.385,77.614,0,50,0z"
                class="turn"
              />
              <path
                d="M38.096000000000004,50a11.904,11.904 0 1,0 23.808,0a11.904,11.904 0 1,0 -23.808,0"
                class="circle"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

CircleCIBuild.propTypes = {
  author: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  buildStatus: PropTypes.string.isRequired,
  reponame: PropTypes.string.isRequired,
  commitMessage: PropTypes.string.isRequired,
  buildUrl: PropTypes.string.isRequired,
};
