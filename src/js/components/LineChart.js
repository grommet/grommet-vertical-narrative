import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';
import Chart, 
  { Base, Layers, Marker, MarkerLabel, Line, HotSpots } 
  from 'grommet/components/chart/Chart';

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    this._onActive = this._onActive.bind(this);
  }

  _onActive(index) {
    if(index >= 0 && this.props.layout === 'large') 
      this.setState({activeIndex: index});
    else if(index >= 0 && this.props.layout === 'small') 
      this.setState({activeIndex: this.props.series[0].values.length - index - 1});
  }

  render() {
    const count = this.props.series[0].values.length;
    const activeValue = (this.state.activeIndex >= 0)
      ? this.props.series[0].values[this.state.activeIndex]
      : null;
    const chartVertical = (this.props.layout === 'small') ? false : true;
    const dataVertical = (this.props.layout === 'small') ? true : false;
    const chartHeight = (this.props.layout === 'small')
      ? 'medium'
      : 'small';

    return (
      <Box>
          <Chart vertical={chartVertical} width="full" a11yTitle={this.props.title}>
            <MarkerLabel vertical={dataVertical} count={count} index={this.state.activeIndex} 
              label={<Value value={activeValue} units={this.props.series[0].units} />} />
            <Base height={chartHeight} width="full" />

            <Layers>
              <Marker vertical={chartVertical} colorIndex="grey-1" count={count} 
                index={this.state.activeIndex} />
              <Line min={this.props.min} max={this.props.max} vertical={dataVertical} 
                values={this.props.series[0].values} colorIndex={this.props.series[0].colorIndex}
                activeIndex={this.state.activeIndex} points={true} />
              <HotSpots vertical={dataVertical} count={count} activeIndex={this.state.activeIndex} 
                onActive={this._onActive} />
            </Layers>

            {this.props.axis}
          </Chart>
      </Box>
    );
  }
};

LineChart.propTypes = {
  axis: PropTypes.node,
  title: PropTypes.string,
  layout: PropTypes.string,
  series: PropTypes.arrayOf(PropTypes.shape({
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    units: PropTypes.string,
    colorIndex: PropTypes.string
  })),
  min: PropTypes.number,
  max: PropTypes.number
};
