import React, { Component } from 'react';
import classnames from 'classnames';
import Legend from 'grommet/components/Legend';
import Box from 'grommet/components/Box';
import BarChart from '../components/BarChart';
import { Axis } from 'grommet/components/chart/Chart';
import { FIRST_DIGITAL_NATIVES } from '../constants';

export default class FirstDigitalNatives extends Component {
  constructor(props) {
    super(props);

    this._onIndexUpdate = this._onIndexUpdate.bind(this);

    this.state = {
      activeIndex: null
    };
  }

  _onIndexUpdate(index) {
    this.setState({ activeIndex: index });
  }

  render() {
    const legendClasses = classnames([
      {
        [`grommetux-legend--hidden`] : this.state.activeIndex !== null
      }
    ]);

    const axis = (this.props.layout === 'small')
      ? <Axis vertical={false} count={FIRST_DIGITAL_NATIVES.axis.count} ticks={true} 
          labels={FIRST_DIGITAL_NATIVES.axis.data} />
      : <Axis vertical={true} count={FIRST_DIGITAL_NATIVES.axis.count} ticks={true} 
          labels={FIRST_DIGITAL_NATIVES.axis.data} />;

    const charts = FIRST_DIGITAL_NATIVES.series.map(({data, max}, index) =>
      <BarChart title="Play Video Games" ref="chartContainer"
        axis={(index === 0) ? axis : undefined} key={`barchart-${index}`}
        series={data}
        onIndexUpdate={this._onIndexUpdate}
        max={max}
        layout={this.props.layout}
      />
    );

    return (
      <Box responsive={false} full="horizontal">
        <Box className="chart-layout chart-layout--multi-bar" direction="row" justify="center">
          {charts}
        </Box>
        <Box>
        <Legend className={legendClasses} series={FIRST_DIGITAL_NATIVES.legend.data} 
          units={FIRST_DIGITAL_NATIVES.legend.units}  />
        </Box>
      </Box>
    );
  }
};
