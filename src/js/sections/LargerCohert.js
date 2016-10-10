import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Chart,
  { Layers, Base, Area, HotSpots, Axis, Marker }
  from 'grommet/components/chart/Chart';
import { LARGER_COHERT } from '../constants';

export default class LargerCohert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart0Index: undefined,
      chart1Index: undefined,
      chart2Index: undefined
    };

    this._setActiveIndex = this._setActiveIndex.bind(this);
  }

  _totalArray(values) {
    return Math.floor(values.reduce((a, b) => a + b, 0) * 100) /100;
  }

  _setActiveIndex(chart, index) {
    if (index !== undefined) {
      switch(chart) {
        case "chart0Index":
          this.setState({ chart0Index: index });
          break;
        case "chart1Index":
          this.setState({ chart1Index: index });
          break;
        case "chart2Index":
          this.setState({ chart2Index: index });
          break;
      }
    } else {
      // Reset index.
      this.setState({
        chart0Index: undefined,
        chart1Index: undefined,
        chart2Index: undefined
      });
    }
  }

  render() {
    // Check our layout and define whether the charts are 
    // stacked horizontally or vertically.
    const dataVertical = (this.props.layout === 'small') 
      ? true
      : false;
    const chartVertical = (this.props.layout === 'small') 
      ? false
      : true;
    const dataReverse = (this.props.layout === 'small')
      ? true
      : false;

    const charts = LARGER_COHERT.map((chart, index) => 
      <Box className="chart-layout chart-layout--3-col" key={`area-chart-${index}`}>
        <Chart vertical={chartVertical} full={true}>
          <Base height="small" width="full" />
          <Layers>
            <Marker count={LARGER_COHERT[index].data.length} 
              index={this.state[`chart${index}Index`]} 
              vertical={chartVertical} reverse={dataReverse} />
            <Area reverse={dataReverse} vertical={dataVertical} 
              values={LARGER_COHERT[index].data} colorIndex="accent-1" 
              activeIndex={this.state[`chart${index}Index`]} 
              max={chart.max} min={chart.min} />
            <HotSpots vertical={dataVertical} count={LARGER_COHERT[index].data.length}
              activeIndex={this.state[`chart${index}Index`]}
              onActive={this._setActiveIndex.bind(this, `chart${index}Index`)} />
          </Layers>
          <Axis vertical={dataVertical} count={chart.axis.count} ticks={true} 
            labels={chart.axis.labels} />
        </Chart>
        <Box className="summary">
          <Heading tag="h5">{chart.title}</Heading>
          <Heading tag="h2" strong={true}>
            {(this.state[`chart${index}Index`] !== undefined)
              ? LARGER_COHERT[index].data[this.state[`chart${index}Index`]]
              : this._totalArray(LARGER_COHERT[index].data)}
            <span className="summary__unit">{chart.units}</span>
          </Heading>
        </Box>
      </Box>
    );

    return (
      <Box direction="row" justify="between" full="horizontal">
        {charts}
      </Box>
    );
  }
};
