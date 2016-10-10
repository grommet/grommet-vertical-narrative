import React, { Component } from 'react';
import classnames from 'classnames';
import Legend from 'grommet/components/Legend';
import Box from 'grommet/components/Box';
import BarChart from '../components/BarChart';
import { Axis } from 'grommet/components/chart/Chart';
import { SEARCHING_FOR_VALUE } from '../constants';

const CLASS_ROOT = 'chart-layout';

export default class SearchingForValue extends Component {
  constructor(props) {
    super(props);

    this._onIndexUpdate = this._onIndexUpdate.bind(this);

    this.state = {
      layout: props.layout,
      activeIndex: null
    };
  }

  _onIndexUpdate(index) {
    console.log(index);
    this.setState({ activeIndex: index });
  }

  render() {
    let classes = classnames([
      CLASS_ROOT,
      `${CLASS_ROOT}--multi-bar`
    ]);

    let legendClasses = classnames([
      {
        [`grommetux-legend--hidden`] : this.state.activeIndex !== null
      }
    ]);

    const axis = (this.props.layout === 'small')
      ? <Axis vertical={false} count={SEARCHING_FOR_VALUE.axis.count} ticks={true}
          tickAlign="end" labels={SEARCHING_FOR_VALUE.axis.labels} />
      : <Axis vertical={true} count={SEARCHING_FOR_VALUE.axis.count} ticks={true} 
          labels={SEARCHING_FOR_VALUE.axis.labels} />;

    const charts = SEARCHING_FOR_VALUE.charts.map((chart, index) => 
      <BarChart title={chart.title} ref="chartContainer" key={`value-chart-${index}`}
        axis={(index === 0) ? axis : undefined}
        series={chart.series} onIndexUpdate={this._onIndexUpdate} 
        layout={this.props.layout} />
    );

    return (
      <Box direction="column" justify="center">
        <Box direction="row" justify="center" className={classes}>
          {charts}
        </Box>
        <Legend className={legendClasses} series={SEARCHING_FOR_VALUE.legend.series} 
          units={SEARCHING_FOR_VALUE.legend.units} />
      </Box>
    );
  }
};
