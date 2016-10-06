import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = 'progress';

export default class Progress extends Component {
  render() {
    return (
      <div className={CLASS_ROOT} style={{width: `${this.props.progress}%`}}></div>
    );
  }
};

Progress.PropTypes = {
  progress: PropTypes.Number
};
