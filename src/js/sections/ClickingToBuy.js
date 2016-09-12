import React, { Component } from 'react';

import { Axis } from 'grommet/components/chart/Chart';
import LayeredAreaChart from '../components/LayeredAreaChart';

const CHART_SERIES = [
  {
    label: "16 - 24",
    values: [66, 68, 77, 82, 80],
    units: "%",
    axisValues: [15, 16, 17, 18, 19],
    colorIndex: "accent-1",
    axisValuesUnits: "years old",
    pointColorIndex: "graph-1"
  },{
    label: "25 - 34",
    values: [60, 60, 62, 68, 70],
    units: "%",
    axisValues: [15, 16, 17, 18, 19, 20],
    colorIndex: "accent-1",
    axisValuesUnits: "years old",
    pointColorIndex: "graph-2"
  },{
    label: "35 - 44",
    values: [58, 55, 53, 55, 58],
    units: "%",
    axisValues: [15, 16, 17, 18, 19, 20],
    colorIndex: "accent-1",
    axisValuesUnits: "years old",
    pointColorIndex: "accent-1"
  }
];

export default class ClickingToBuy extends Component {
  render() {
    const axisX = (this.props.layout === 'small')
      ? <Axis ticks={true} count={5} labels={[
          {"index": 0, "label": "50", "basis": 12.5, "flip": true},
          {"index": 2, "label": "75", "basis": 25},
          {"index": 4, "label": "100%", "basis": 25}
      ]} />
      : <Axis ticks={true} count={5} labels={[
          {index: 0, label: 2008},
          {index: 4, label: 2012}
      ]} />;

    const axisY = (this.props.layout === 'small')
      ? <Axis vertical={true} ticks={true} count={5} labels={[
          {index: 0, label: 2008},
          {index: 4, label: 2012}
      ]} />
      : <Axis vertical={true} ticks={true} count={5} labels={[
          {"index": 0, "label": "50", "basis": 12.5, "flip": true},
          {"index": 2, "label": "75", "basis": 25},
          {"index": 4, "label": "100%", "basis": 25}
      ]} />;

    return (
      <LayeredAreaChart 
        layout={this.props.layout}
        axisX={axisX}
        axisY={axisY}
        min={50}
        max={100}
        series={CHART_SERIES} 
      />
    );
  }
};
