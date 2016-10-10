import React, { Component } from 'react';
import SpiralChart from '../components/SpiralChart';
import { RENTER_GENERATION } from '../constants';

export default class RenterGeneration extends Component {
  render() {
    return (
      <SpiralChart 
        series={RENTER_GENERATION.series} 
        units={RENTER_GENERATION.units}
        max={RENTER_GENERATION.max}
      />
    );
  }
};
