import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';

export default class DonutChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let title = (this.props.title)
      ? (<Heading tag="h3">{this.props.title}</Heading>)
      : null;

    const chartSize = (this.props.layout === 'small')
      ? 'small'
      : 'medium';

    return (
      <Box className="chart-layout chart-layout__donut" justify="center" align="center" 
        direction="column" responsive={false}>
        {title}
        <Meter value={this.props.value} type="circle" size={chartSize} 
          colorIndex={this.props.colorIndex} units={this.props.units} />
      </Box>
    );
  }
};

DonutChart.PropTypes = {
  colorIndex: PropTypes.string,
  title: PropTypes.string,
  units: PropTypes.string,
  value: PropTypes.number.isRequired
};

DonutChart.DefaultProps = {
  colorIndex: 'graph-1'
};
