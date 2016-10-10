import React, { Component } from 'react';
import { Axis } from 'grommet/components/chart/Chart';
import LayeredAreaChart from '../components/LayeredAreaChart';
import { CLICKING_TO_BUY } from '../constants';

export default class ClickingToBuy extends Component {
  render() {
    const axisX = (this.props.layout === 'small')
      ? <Axis ticks={true} count={CLICKING_TO_BUY.axis.count} 
        labels={CLICKING_TO_BUY.axis.percent} />
      : <Axis ticks={true} count={CLICKING_TO_BUY.axis.count} 
        labels={CLICKING_TO_BUY.axis.years} />;

    const axisY = (this.props.layout === 'small')
      ? <Axis vertical={true} ticks={true} count={CLICKING_TO_BUY.axis.count} 
        labels={CLICKING_TO_BUY.axis.years} />
      : <Axis vertical={true} ticks={true} count={CLICKING_TO_BUY.axis.count} 
        labels={CLICKING_TO_BUY.axis.percent} />;

    return (
      <LayeredAreaChart 
        layout={this.props.layout}
        axisX={axisX}
        axisY={axisY}
        min={50}
        max={100}
        series={CLICKING_TO_BUY.chart} 
      />
    );
  }
};
