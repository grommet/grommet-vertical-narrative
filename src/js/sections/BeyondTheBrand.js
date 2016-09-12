import React, { Component } from 'react';

import StackedBarChart from '../components/StackedBarChart';
import { Axis } from 'grommet/components/chart/Chart';

const CHART_SERIES = [
  {
    title: '16 - 24',
    series: [
      {
        colorIndex: 'light-5',
        label: `Don't Know`,
        units: '%',
        value: 15
      }, 
      {
        colorIndex: 'accent-2',
        label: 'Strongly Disagree',
        units: '%',
        value: 15
      }, 
      {
        colorIndex: 'neutral-2',
        label: 'Tend to Disagree',
        units: '%',
        value: 25
      }, 
      {
        colorIndex: 'accent-3',
        label: 'Tend to Agree',
        units: '%',
        value: 35
      }, 
      {
        colorIndex: 'accent-1',
        label: 'Strongly Agree',
        units: '%',
        value: 10
      }
    ]
  },
  {
    title: '25 - 34',
    series: [
      {
        colorIndex: 'light-5',
        label: `Don't Know`,
        units: '%',
        value: 5
      }, 
      {
        colorIndex: 'accent-2',
        label: 'Strongly Disagree',
        units: '%',
        value: 30
      }, 
      {
        colorIndex: 'neutral-2',
        label: 'Tend to Disagree',
        units: '%',
        value: 20
      }, 
      {
        colorIndex: 'accent-3',
        label: 'Tend to Agree',
        units: '%',
        value: 25
      }, 
      {
        colorIndex: 'accent-1',
        label: 'Strongly Agree',
        units: '%',
        value: 20
      }
    ]
  },
  {
    title: '35 - 44',
    series: [
      {
        colorIndex: 'light-5',
        label: `Don't Know`,
        units: '%',
        value: 10
      }, 
      {
        colorIndex: 'accent-2',
        label: 'Strongly Disagree',
        units: '%',
        value: 20
      }, 
      {
        colorIndex: 'neutral-2',
        label: 'Tend to Disagree',
        units: '%',
        value: 30
      }, 
      {
        colorIndex: 'accent-3',
        label: 'Tend to Agree',
        units: '%',
        value: 30
      }, 
      {
        colorIndex: 'accent-1',
        label: 'Strongly Agree',
        units: '%',
        value: 10
      }
    ]
  },
  {
    title: '45 - 54',
    series: [
      {
        colorIndex: 'light-5',
        label: `Don't Know`,
        units: '%',
        value: 15
      }, 
      {
        colorIndex: 'accent-2',
        label: 'Strongly Disagree',
        units: '%',
        value: 15
      }, 
      {
        colorIndex: 'neutral-2',
        label: 'Tend to Disagree',
        units: '%',
        value: 20
      }, 
      {
        colorIndex: 'accent-3',
        label: 'Tend to Agree',
        units: '%',
        value: 40
      }, 
      {
        colorIndex: 'accent-1',
        label: 'Strongly Agree',
        units: '%',
        value: 10
      }
    ]
  }
];

const LEGEND_SERIES = [
  {
    label: 'Strongly Agree',
    colorIndex: 'accent-1',
    units: '%'
  },
  {
    label: 'Tend to Agree',
    colorIndex: 'accent-3',
    units: '%'
  },
  {
    label: 'Tend to Disagree',
    colorIndex: 'neutral-2',
    units: '%'
  },
  {
    label: 'Strongly Disagree',
    colorIndex: 'accent-2',
    units: '%'
  },
  {
    label: 'Don\'t Know',
    colorIndex: 'light-5',
    units: '%'
  }
];

export default class BeyondTheBrand extends Component {
  render() {
    const axis = (this.props.layout === 'small') 
      ? <Axis vertical={false} count={5} ticks={true} 
        labels={[
          {index: 4, label: '100%'},
          {index: 2, label: 50} ]} />
      : <Axis vertical={true} count={5} ticks={true} 
        labels={[
          {index: 4, label: '100%'},
          {index: 2, label: 50} ]} />;

    return (
      <StackedBarChart 
        axis={axis}
        series={CHART_SERIES} 
        legend={LEGEND_SERIES} 
        layout={this.props.layout} />
    );
  }
};
