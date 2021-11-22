import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseWidget from '../base';
import './styles.scss';

const isFailure = outcome => outcome && (outcome.toLowerCase() === "failure" || outcome.toLowerCase() === "error" || outcome.toLowerCase() === "unstable");

export default class BuildStatus extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      outcome: undefined,
      link: undefined,
      updatedAt: undefined,
      branch: undefined,
      shouldShake: false,
    };
    this.intervalId = undefined;
  }

  startShake() {
    this.intervalId = setInterval(() => {
      this.setState({ shouldShake: true });
      setTimeout(() => this.setState({ shouldShake: false }), this.props.shakePeriodMs);
    }, this.props.shakeIntervalMs);
  }

  stopShake() {
    this.intervalId && clearInterval(this.intervalId);
    this.setState({ shouldShake: false });
  }

  componentWillMount() {
    super.componentWillMount();
    if (this.props.shakeOnFailure && isFailure(this.state.outcome)) {
      this.startShake();
    } else {
      this.stopShake();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.shakeOnFailure) {
      if (isFailure(this.state.outcome) && !isFailure(prevState.outcome)) {
        // new failure state
        this.intervalId && clearInterval(this.intervalId); // clear any intervals that might still be lying around
        this.startShake();
      } else if (!isFailure(this.state.outcome) && isFailure(prevState.outcome)) {
        this.stopShake();
      }
    }
  }

  render() {
    let classList = classNames(
      ...this.classList,
      'widget__buildStatus',
      `widget--${this.state.outcome}`,
    );

    if (this.state.shouldShake) {
      classList += ` shake shake-constant shake-${this.props.shakeType}`;
    }

    const titleClassNames = `widget__title${this.props.title.length > 20 ? ' widget__longtitle' : ''}`;

    return (
      <div className={classList}>
        <h1 className={titleClassNames}>{this.props.title}</h1>
        { this.state.branch && <h3 className="widget__subtitle"><b>({this.state.branch}</b> branch)</h3> }
        <h2 className="widget__value">{this.state.outcome ? this.state.outcome : '---'}</h2>
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

BuildStatus.defaultProps = {
  shakeOnFailure: true,
  shakeIntervalMs: 10000, // every 10 seconds start shaking
  shakePeriodMs: 1000, // shake for 1 seconds
  shakeType: 'slow' // slow wobble
}

BuildStatus.propTypes = {
  title: PropTypes.string.isRequired,
  shakeOnFailure: PropTypes.bool,
  shakeIntervalMs: PropTypes.number,
  shakePeriodMs: PropTypes.number,
  shakeType: PropTypes.oneOf(['hard', 'slow', 'little', 'horizontal', 'vertical', 'rotate', 'opacity', 'crazy', 'chunk']) // see https://elrumordelaluz.github.io/csshake/ for demonstrations
};
