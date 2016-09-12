import React, { Component } from 'react';

import classnames from 'classnames';

import Legend from 'grommet/components/Legend';
import Box from 'grommet/components/Box';
import BarChart from './BarChart';

export default class StackedBarChart extends Component {
  constructor(props) {
    super(props);

    this._onIndexUpdate = this._onIndexUpdate.bind(this);

    this.state = {
      activeIndex: null,
      activeSeries: null
    };
  }

  _onIndexUpdate(index, series) {
    this.setState({ activeSeries: (index !== null) ? series : null });
  }

  render() {
    const charts = this.props.series.map((chart, index) => {
      const ref = (index === 0) ? 'chartContainer' : null;
      const axis = (index === 0 && this.props.axis) ? this.props.axis : null;

      return (
        <BarChart title={chart.title} series={chart.series} key={`chart-${index}`}
          ref={ref} stacked={true} onIndexUpdate={this._onIndexUpdate} 
          layout={this.props.layout} axis={axis} />
      );
    });

    const legendClasses = classnames([
      {
        [`grommetux-legend--hidden`] : this.state.activeSeries !== null
      }
    ]);

    const legend = (<Legend className={legendClasses}
      series={this.props.legend} />);

    return (
      <Box className="chart-layout chart-layout--multi-bar">
        <Box direction="row" justify="center" style={{width: '100%'}}>
          {charts}
        </Box>
        {legend}
      </Box>
    );
  }
};
