import React, { Component } from 'react';

import classnames from 'classnames';

import Legend from 'grommet/components/Legend';
import Box from 'grommet/components/Box';
import BarChart from '../components/BarChart';
import { Axis } from 'grommet/components/chart/Chart';

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
      ? <Axis vertical={false} count={4} ticks={true} 
          labels={[
            {index: 3, label: 75},
            {index: 2, label: 50} ]}
        />
      : <Axis vertical={true} count={4} ticks={true} 
          labels={[
            {index: 3, label: 75},
            {index: 2, label: 50} ]} 
        />;

    return (
      <Box responsive={false}>
        <Box className="chart-layout chart-layout--multi-bar" direction="row" justify="center">
            <BarChart title="Play Video Games" ref="chartContainer"
              axis={axis}
              series={[
                {
                  colorIndex: 'accent-1',
                  label: 'Millennials',
                  units: '%',
                  value: 48
                }, 
                {
                  colorIndex: 'accent-3',
                  label: 'Gen X',
                  units: '%',
                  value: 30
                }, 
                {
                  colorIndex: 'neutral-2',
                  label: 'Baby Boomers',
                  units: '%',
                  value: 25
                }
              ]}
              onIndexUpdate={this._onIndexUpdate}
              max={75}
              layout={this.props.layout}
            />
            <BarChart title="Download Music of Video"
              series={[
                {
                  colorIndex: 'accent-1',
                  label: 'Millennials',
                  units: '%',
                  value: 43
                }, 
                {
                  colorIndex: 'accent-3',
                  label: 'Gen X',
                  units: '%',
                  value: 35
                }, 
                {
                  colorIndex: 'neutral-2',
                  label: 'Baby Boomers',
                  units: '%',
                  value: 30
                }
              ]} 
              onIndexUpdate={this._onIndexUpdate}
              max={75}
              layout={this.props.layout} 
            />
            <BarChart title="Use Social Media"
              series={[
                {
                  colorIndex: 'accent-1',
                  label: 'Millennials',
                  units: '%',
                  value: 55
                }, 
                {
                  colorIndex: 'accent-3',
                  label: 'Gen X',
                  units: '%',
                  value: 45
                }, 
                {
                  colorIndex: 'neutral-2',
                  label: 'Baby Boomers',
                  units: '%',
                  value: 40
                }
              ]} 
              onIndexUpdate={this._onIndexUpdate}
              max={75}
              layout={this.props.layout} 
            />
        </Box>
        <Box>
        <Legend className={legendClasses} series={[
          {
            "label": 'Millennials',
            "colorIndex": "accent-1"
          },
          {
            "label": 'Gen X',
            "colorIndex": "accent-3"
          },
          {
            "label": 'Baby Boomers',
            "colorIndex": "neutral-2"
          }
        ]} units="%" />
        </Box>
      </Box>
    );
  }
};
