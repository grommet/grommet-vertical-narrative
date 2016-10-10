import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import DonutChart from '../components/DonutChart';
import { CHANGING_OWNERSHIP } from '../constants';

export default class ChangingOwnership extends Component {
  render() {
    const charts = CHANGING_OWNERSHIP.charts.map((chart, index) => 
      <DonutChart key={`donut-chart-${index}`} title={chart.title} 
        value={chart.value} units={chart.units} colorIndex={chart.colorIndex} />
    );

    return (
      <Box direction="row" justify="center" align="center" responsive={true}>
        {charts}
      </Box>
    );
  }
};
