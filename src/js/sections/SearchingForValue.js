import React, { Component } from 'react';

import classnames from 'classnames';

import Legend from 'grommet/components/Legend';
import Box from 'grommet/components/Box';
import BarChart from '../components/BarChart';
import { Axis } from 'grommet/components/chart/Chart';

const CLASS_ROOT = 'chart-layout';

export default class SearchingForValue extends Component {
  constructor(props) {
    super(props);

    this._onIndexUpdate = this._onIndexUpdate.bind(this);

    this.state = {
      chartSize: 192,
      layout: props.layout,
      activeIndex: null
    };
  }

  _onIndexUpdate(index) {
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
      ? <Axis vertical={false} count={5} ticks={true} tickAlign="end"
          labels={[
            {index: 4, label: '100%'},
            {index: 2, label: 50} ]} />
      : <Axis vertical={true} count={5} ticks={true} 
          labels={[
            {index: 4, label: '100%'},
            {index: 2, label: 50} ]} />;

    return (
      <Box direction="column" justify="center">
        <Box direction="row" justify="center" className={classes}>
          <BarChart title="Price" ref="chartContainer"
            axis={axis}
            series={[
              {
                colorIndex: 'accent-1',
                label: 'Millennials',
                units: '%',
                value: 48
              }, 
              {
                colorIndex: 'graph-1',
                label: 'Non-Millennials',
                units: '%',
                value: 30
              }
            ]} onIndexUpdate={this._onIndexUpdate} 
            layout={this.props.layout} />
          <BarChart title="Quality"
            series={[
              {
                colorIndex: 'accent-1',
                label: 'Millennials',
                units: '%',
                value: 43
              }, 
              {
                colorIndex: 'graph-1',
                label: 'Non-Millennials',
                units: '%',
                value: 35
              }
            ]} onIndexUpdate={this._onIndexUpdate} 
            layout={this.props.layout} />
        </Box>
        <Legend className={legendClasses} series={[
          {
            "label": 'Millennials',
            "colorIndex": "accent-1"
          },
          {
            "label": 'Non-Millennials',
            "colorIndex": "graph-1"
          }
        ]} units="%" />
      </Box>
    );
  }
};
