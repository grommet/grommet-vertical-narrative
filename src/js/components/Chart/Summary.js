import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Heading from 'grommet/components/Heading';

export default class Summary extends Component {
  _reduceArray(array) {
    return Math.round(100*(array.reduce((a, b) => a + b, 0)))/100;;
  }

  render() {
    let summaryClasses = classnames([
      'summary',
      {
        'summary--active': this.props.visible
      }
    ]);
    
    return (
      <div className={summaryClasses}>
        <div className={`summary__title`}>{this.props.title}</div>
        <Heading strong={true} tag="h2">{this._reduceArray(this.props.value)}</Heading> 
        <span className={`summary__unit`}>{this.props.units}</span>
      </div>
    );
  }
};

Summary.PropTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  units: PropTypes.string,
  visible: PropTypes.bool
};

Summary.defaultProps = {
  visible: true
};
