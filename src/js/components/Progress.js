import React, { PropTypes } from 'react';

const CLASS_ROOT = 'progress';

export default function Progress (props) {
  return (
    <div className={CLASS_ROOT} style={{width: `${props.progress}%`}}></div>
  );
};

Progress.PropTypes = {
  progress: PropTypes.Number
};
