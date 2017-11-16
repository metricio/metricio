import React from 'react';
import PropTypes from 'prop-types';

import logger from '../../lib/logger';

export default class BaseWidget extends React.Component {
  constructor(props) {
    super(props);
    this.classList = ['widget', `widget__${this.props.name}`];
    if (this.props.size) this.classList.push(`widget--${this.props.size}`);
  }

  componentWillMount() {
    this.props.socket.on(`widget:update:${this.props.name}`, data => {
      logger('info', `updating widget: ${this.props.name}`, data);
      this.setState(data);
    });
  }
}

BaseWidget.defaultProps = {
  size: 'small',
};

BaseWidget.propTypes = {
  size: PropTypes.string,
  name: PropTypes.string.isRequired,
  socket: PropTypes.shape.isRequired,
};
