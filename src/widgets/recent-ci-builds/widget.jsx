import './styles.scss';


import PropTypes from 'prop-types';
import React from 'react';
import BaseWidget from '../base';
import CircleCiBuild from '../circle-ci-build/widget';

export default class RecentCiBuilds extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      builds: undefined,
    };
  }

  render() {
    const { builds } = this.state;
    // const latestValue = this.state.value ? this.state.value.slice(-1).pop() : 0;
    // const classList = classNames(...this.classList, 'widget__sparkline');
    return (
      <div className="ci-wrapper">
        {builds &&
          builds.map(item => <CircleCiBuild key={item.id} {...item} />)}
      </div>
    );
  }
}

RecentCiBuilds.propTypes = {
  format: PropTypes.string,
  metric: PropTypes.string,
  title: PropTypes.string,
};
