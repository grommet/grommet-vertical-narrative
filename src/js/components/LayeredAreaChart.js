import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Legend from 'grommet/components/Legend';
import Chart, { Area, Base, Layers, Marker, 
  HotSpots } from 'grommet/components/chart/Chart';

export default class LayeredAreaChart extends Component {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._onIndexUpdate = this._onIndexUpdate.bind(this);

    this.state = {
      chartLabel: {
        value: '0',
        axisValue: '0',
        units: ' ',
        axisUnits: ' ',
        top: 0,
        visible: false
      },
      layout: props.layout,
      activeIndex: undefined
    };
  }

  _onClick(event) {
    this.setState({ activeIndex: event.target.getAttribute('data-index') });
  }

  _onMouseOver(event) {
    this.setState({ activeIndex: event.target.getAttribute('data-index') });
  }

  _onMouseOut(event) {
    this.setState({ activeIndex: undefined });
  }

  _onIndexUpdate(index) {
    if (index !== undefined) this.setState({ activeIndex: index });
    else this.setState({ activeIndex: undefined });
  }

  render() {
    const dataVertical = (this.props.layout === 'small')
      ? true
      : false;

    const series = this.props.series.map((seriesSingle, index) => {
      const seriesPicks = {
        label: seriesSingle.label,
        value: (this.state.activeIndex) 
            ? seriesSingle.values[this.state.activeIndex] 
            : null,
        colorIndex: `${seriesSingle.colorIndex}`
      };
      return(seriesPicks);
    });

    const areaCharts = this.props.series.map((series, index) => 
      <Area key={`chart-${index}`} values={series.values} vertical={dataVertical}
        min={this.props.min} max={this.props.max} colorIndex={series.colorIndex} 
        activeIndex={this.state.activeIndex} />
    );

    const legend = (
      <Legend series={series} units={(this.state.activeIndex) ? "%" : null} />
    );

    const count = this.props.series[0].values.length;

    return (
      <div className="chart-layout chart-layout__layered-area">
          <Box direction="column">
            <div className="chart__container" style={{position:'relative'}}>
              <Box direction="row" responsive={false}>
                <Chart vertical={false} full={true}>
                  {this.props.axisY}
                  <Chart vertical={true} full={true}>
                    <Base height="small" width="full" />
                    <Layers>
                      <Marker vertical={!dataVertical} colorIndex="graph-1" count={count} 
                        index={this.state.activeIndex} />
                      {areaCharts}
                      <HotSpots max={100} min={0} count={count} 
                        activeIndex={this.state.activeIndex} onActive={this._onIndexUpdate} />
                    </Layers>
                    {this.props.axisX}
                  </Chart>
                </Chart>
              </Box>
          </div>
          {legend}
        </Box>
      </div>
    );
  }
}
