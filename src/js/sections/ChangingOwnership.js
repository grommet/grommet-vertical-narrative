import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import DonutChart from '../components/DonutChart';

export default class ChangingOwnership extends Component {
  render() {
    return (
      <Box direction="row" justify="center" align="center" responsive={true}>
        <DonutChart title="2005" value={52} units="%" colorIndex="accent-3"/>
        <DonutChart title="2012" value={60} units="%" colorIndex="graph-1"/>
      </Box>
    );
  }
};
