import React, { Component } from 'react';

import { Axis } from 'grommet/components/chart/Chart';
import LineChart from '../components/LineChart';

export default class LessMoneyToSpend extends Component {
  render() {
    const axis = (this.props.layout === 'small')
      ? <Axis vertical={true} ticks={true} count={13} labels={[
        {"index": 0, "label": "2000", "flip": true},
        {"index": 6, "label": "2006"},
        {"index": 12, "label": "2012"}
      ]} />
      : <Axis vertical={false} ticks={true} count={13} labels={[
        {"index": 0, "label": "2000", "flip": true},
        {"index": 2, "label": "2002"},
        {"index": 4, "label": "2004"},
        {"index": 6, "label": "2006"},
        {"index": 8, "label": "2008"},
        {"index": 10, "label": "2010"},
        {"index": 12, "label": "2012"}
      ]} />;

    return (
      <LineChart 
        axis={axis} 
        layout={this.props.layout}
        min={62}
        max={69}
        title="Less Money to Spend"
        series={[
          {
            values: [69, 69, 68, 67, 66, 65, 66, 66, 
              66, 64, 64, 63, 64],
            units: "%",
            colorIndex: "graph-1"
          }]}
      />
    );
  }
};
