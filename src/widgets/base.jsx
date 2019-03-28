import PropTypes from 'prop-types';
import React from 'react';
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
      doHeightUpdate();
    });
  }
}

function doHeightUpdate() {
  var tile_bodies = document.getElementsByClassName('tile-body');
  var last_height = -1;
  var last_div_el = undefined;
  var curr_height = 0;

  for (var i = 1; i < tile_bodies.length + 1; i++) {
    if (last_height == -1) {
      last_height = tile_bodies[i - 1].offsetHeight;
      last_div_el = tile_bodies[i - 1];
      continue;
    }

    if (i % 2 == 0) {
      curr_height = tile_bodies[i - 1].offsetHeight;
      if (curr_height === last_height) {
        continue;
      }

      var new_height = Math.max(curr_height, last_height);
      tile_bodies[i - 1].style.height = new_height;
      last_div_el.style.height = new_height;
      last_height = -1;
    }
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
