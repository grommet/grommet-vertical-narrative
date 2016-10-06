import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

import Chart,
  { Layers, Base, Area, HotSpots, Axis, Marker }
  from 'grommet/components/chart/Chart';

const VALUES_1 = [4.24, 4.18, 4.19, 4.21, 4.25, 4.36, 4.45,
  4.55, 4.65, 4.73, 4.55, 4.25, 4.36, 4.32, 4.35];

const VALUES_2 = [4.12, 4.22, 3.99, 3.88, 3.32, 3.45, 3.55,
  3.65, 3.75, 3.53, 3.55, 3.25, 3.36, 4.32, 4.35];

const VALUES_3 = [4.35, 4.18, 4.19, 4.12, 4.15, 3.95, 3.65,
  3.55, 3.65, 3.73, 3.55, 3.35, 2.85, 2.65, 2.55];

export default class LargerCohert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart1Index: undefined,
      chart2Index: undefined,
      chart3Index: undefined
    };

    this._setActiveIndex = this._setActiveIndex.bind(this);
  }

  _totalArray(values) {
    return Math.floor(values.reduce((a, b) => a + b, 0) * 100) /100;
  }

  _setActiveIndex(chart, index) {
    if (index !== undefined) {
      switch(chart) {
        case "chart1Index":
          this.setState({ chart1Index: index });
          break;
        case "chart2Index":
          this.setState({ chart2Index: index });
          break;
        case "chart3Index":
          this.setState({ chart3Index: index });
          break;
      }
    } else {
      // Reset index.
      this.setState({
        chart1Index: undefined,
        chart2Index: undefined,
        chart3Index: undefined
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

    // If the chart does not have an active index reduce
    // all values to total.
    const chart1Value = (this.state.chart1Index !== undefined)
      ? VALUES_1[this.state.chart1Index]
      : this._totalArray(VALUES_1);
    const chart2Value = (this.state.chart2Index !== undefined)
      ? VALUES_2[this.state.chart2Index]
      : this._totalArray(VALUES_2);
    const chart3Value = (this.state.chart3Index !== undefined)
      ? VALUES_3[this.state.chart3Index]
      : this._totalArray(VALUES_3);

    const dataReverse = (this.props.layout === 'small')
      ? true
      : false;

    return (
      <Box direction="row" justify="between">
        <Box className="chart-layout chart-layout--3-col">
          <Chart vertical={chartVertical} full={true}>
            <Base height="small" width="full" />
            <Layers>
              <Marker count={15} index={this.state.chart1Index} vertical={chartVertical} 
                reverse={dataReverse} />
              <Area reverse={dataReverse} vertical={dataVertical} values={VALUES_1}
                activeIndex={this.state.chart1Index} 
                max={5} min={2} />
              <HotSpots vertical={dataVertical} count={VALUES_1.length}
                activeIndex={this.state.chart1Index}
                onActive={this._setActiveIndex.bind(this, 'chart1Index')} />
            </Layers>
            <Axis vertical={dataVertical} count={7} ticks={true} 
              labels={[
                {"index": 0, "label": "15"},
                {"index": 6, "label": "35"} ]} />
          </Chart>
          <Box className="summary">
            <Heading tag="h5">Millennials</Heading>
            <Heading tag="h2" strong={true}>
              {chart1Value}
              <span className="summary__unit">M</span>
            </Heading>
          </Box>
        </Box>
        <Box className="chart-layout chart-layout--3-col">
          <Chart vertical={chartVertical} full={true}>
            <Base height="small" width="full" />
            <Layers>
             <Marker count={15} index={this.state.chart2Index} vertical={chartVertical} 
              reverse={dataReverse} />
              <Area reverse={dataReverse} vertical={dataVertical} values={VALUES_2}
                activeIndex={this.state.chart2Index} 
                max={5} min={2} />
              <HotSpots vertical={dataVertical} count={VALUES_2.length}
                activeIndex={this.state.chart2Index}
                onActive={this._setActiveIndex.bind(this, 'chart2Index')} />
            </Layers>
            <Axis vertical={dataVertical} count={7} ticks={true} 
              labels={[
                {"index": 0, "label": "36"},
                {"index": 6, "label": "50"} ]}/>
          </Chart>
          <Box className="summary">
            <Heading tag="h5">Gen X</Heading>
            <Heading tag="h2" strong={true}>
              {chart2Value}
              <span className="summary__unit">M</span>
            </Heading>
          </Box>
        </Box>
        <Box className="chart-layout chart-layout--3-col">
          <Chart vertical={chartVertical} full={true}>
            <Base height="small" width="full" />
            <Layers>
             <Marker count={15} index={this.state.chart3Index} vertical={chartVertical} 
              reverse={dataReverse} />
              <Area reverse={dataReverse} vertical={dataVertical} values={VALUES_3}
                activeIndex={this.state.chart3Index} 
                max={5} min={2} />
              <HotSpots vertical={dataVertical} count={VALUES_3.length}
                activeIndex={this.state.chart3Index}
                onActive={this._setActiveIndex.bind(this, 'chart3Index')} />
            </Layers>
            <Axis vertical={dataVertical} count={7} ticks={true} 
              labels={[
                {"index": 0, "label": "51"},
                {"index": 6, "label": "70"} ]}/>
          </Chart>
          <Box className="summary">
            <Heading tag="h5">Baby Boomers</Heading>
            <Heading tag="h2" strong={true}>
              {chart3Value}
              <span className="summary__unit">M</span>
            </Heading>
          </Box>
        </Box>
      </Box>
    );
  }
};
