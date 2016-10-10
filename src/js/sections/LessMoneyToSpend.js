import React, { Component } from 'react';

import { Axis } from 'grommet/components/chart/Chart';
import LineChart from '../components/LineChart';
import { LESS_MONEY_TO_SPEND } from '../constants';

export default class LessMoneyToSpend extends Component {
  render() {
    const axisSmall = LESS_MONEY_TO_SPEND.axis.small;
    const axisLarge = LESS_MONEY_TO_SPEND.axis.large;
    const { series, title, max, min } = LESS_MONEY_TO_SPEND;
    const axis = (this.props.layout === 'small')
      ? <Axis vertical={true} ticks={true} count={axisSmall.count}
        labels={axisSmall.series} />
      : <Axis vertical={false} ticks={true} count={axisLarge.count}
        labels={axisLarge.series} />;
        
    return (
      <LineChart 
        axis={axis} 
        layout={this.props.layout}
        min={min}
        max={max}
        title={title}
        series={series}
      />
    );
  }
};
