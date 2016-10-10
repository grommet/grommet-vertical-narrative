import React, { Component } from 'react';
import StackedBarChart from '../components/StackedBarChart';
import { Axis } from 'grommet/components/chart/Chart';
import { BEYOND_THE_BRAND } from '../constants';

export default class BeyondTheBrand extends Component {
  render() {
    const axis = (this.props.layout === 'small') 
      ? <Axis vertical={false} count={BEYOND_THE_BRAND.axis.count}
        ticks={true} labels={BEYOND_THE_BRAND.axis.labels} />
      : <Axis vertical={true} count={BEYOND_THE_BRAND.axis.count}
        ticks={true} labels={BEYOND_THE_BRAND.axis.labels} />;

    return (
      <StackedBarChart 
        axis={axis}
        series={BEYOND_THE_BRAND.chart} 
        legend={BEYOND_THE_BRAND.legend} 
        layout={this.props.layout} />
    );
  }
};
