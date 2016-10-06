import React, { Component } from 'react';

import SpiralChart from '../components/SpiralChart';

const CHART_SERIES = [
 {"label": "Boomers", "value": 4.6,
  "colorIndex": "neutral-2"},
  {"label": "Gen X", "value": 10.2,
    "colorIndex": "graph-1"},
  {"label": "Millennials", "value": 22.5,
    "colorIndex": "accent-1"}
];

export default class RenterGeneration extends Component {
  render() {
    return (
      <SpiralChart 
        series={CHART_SERIES} 
        units="m"
        max={22.5}
      />
    );
  }
};
