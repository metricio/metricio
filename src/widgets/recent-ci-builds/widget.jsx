import './styles.scss';

import BaseWidget from '../base';
import CircleCiBuild from '../circle-ci-build/widget';
import PropTypes from 'prop-types';
import React from 'react';

const ProjectCheckboxes = ({
  projects = [],
  filteredProjects = {},
  handleCheck,
}) => (
  <div className="project-checkboxes">
    <h3>Project list</h3>
    {projects.map(p => (
      <div key={p.reponame}>
        <input
          type="checkbox"
          name={p.reponame}
          id={p.reponame}
          onChange={e => handleCheck(e, p.reponame)}
          checked={
            filteredProjects[p.reponame]
              ? filteredProjects[p.reponame]['checked']
              : true
          }
        />
        <label htmlFor={p.reponame}>{p.reponame}</label>
      </div>
    ))}
  </div>
);

export default class RecentCiBuilds extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      builds: [],
      projects: [],
      filteredProjects: {},
    };
  }

  handleCheck = (e, reponame) => {
    const { checked } = e.target;
    const { filteredProjects } = this.state;

    this.setState({
      filteredProjects: Object.assign(filteredProjects, {
        [reponame]: {
          checked,
        },
      }),
    });
  };

  filterByProject = item => {
    const { filteredProjects } = this.state;

    if (filteredProjects[item.reponame]) {
      return filteredProjects[item.reponame]['checked'] && item;
    }
    return item;
  };

  render() {
    const { builds, projects, filteredProjects } = this.state;

    return (
      <>
        <ProjectCheckboxes
          {...{ projects, filteredProjects }}
          handleCheck={this.handleCheck}
        />
        <div className="ci-wrapper">
          {builds &&
            builds
              .filter(this.filterByProject)
              .map(item => <CircleCiBuild key={item.id} {...item} />)}
        </div>
      </>
    );
  }
}

RecentCiBuilds.propTypes = {
  format: PropTypes.string,
  metric: PropTypes.string,
  title: PropTypes.string,
};
