import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';

import BaseWidget from '../base';
import './styles.scss';

export default class ProgressWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      progress: undefined,
      updatedAt: undefined,
    };
  }

  parseProgress(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent, fill: '#b57b9b' }];
  }

  render() {
    const classList = classNames(...this.classList, 'widget__progress');
    const progress = this.parseProgress(this.state.progress);

    return (
      <div className={classList}>
        <h1 className="widget__title">{this.props.title}</h1>
        {this.state.progress === undefined && <h2 className="widget__value">---</h2>}
        {this.state.progress !== undefined && (
          <svg className="progress" viewBox="0 0 400 400" width="100%" height="100%">
            <VictoryPie
              standalone={false}
              animate={{ duration: 1000 }}
              data={progress}
              innerRadius={110}
              labels={() => null}
            />
            <VictoryAnimation duration={1000} data={this.state}>
              {newProps => (
                <VictoryLabel
                  className="progress__text"
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={200}
                  text={Math.round(newProps.progress)}
                  style={{
                    fill: '#fff',
                    fontSize: 125,
                    fontWeight: 700,
                    fontFamily: 'Saira',
                  }}
                />
              )}
            </VictoryAnimation>
          </svg>
        )}
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

ProgressWidget.propTypes = {
  title: PropTypes.string.isRequired,
};
