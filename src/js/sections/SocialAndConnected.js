import React, { Component } from 'react';
import SpiralChart from '../components/SpiralChart';
import { SOCIAL_AND_CONNECTED } from '../constants';

export default class SocialAndConnected extends Component {
  render() {
    return (
      <SpiralChart 
        series={SOCIAL_AND_CONNECTED.series} 
        units={SOCIAL_AND_CONNECTED.units} 
        max={SOCIAL_AND_CONNECTED.max} 
        min={SOCIAL_AND_CONNECTED.min} 
      />
    );
  }
};
