import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Chart, { Base } from 'grommet/components/chart/Chart';
import Meter from 'grommet/components/Meter';

export default class BarChart extends Component {
  constructor() {
    super();

    this._onIndexUpdate = this._onIndexUpdate.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      chartLabel: {
        visible: false,
        label: '0',
        units: '%',
        value: 0
      }
    };
  }

  _onIndexUpdate(index) {
    if (index !== undefined) {
      let value = this.props.series[index].value;
      let label = this.props.series[index].label;

      this.setState({
        chartLabel: {
          visible: true,
          label: label,
          units: '%',
          value: value
        },
        activeIndex: index
      });
    }

    if (this.props.onIndexUpdate) this.props.onIndexUpdate(index);
  }

  _onMouseLeave() {
    this.setState({
      chartLabel: {
        visible: false,
        label: this.state.chartLabel.label,
        units: '%',
        value: this.state.chartLabel.value
      },
      activeIndex: null
    });

    if (this.props.onIndexUpdate) this.props.onIndexUpdate(null);
  }

  render() {
    const chartLabelRoot = 'charts-label';
    const chartLabelClasses = classnames([
      chartLabelRoot,
      {
        [`${chartLabelRoot}--active`]: this.state.chartLabel.visible
      }
    ]);

    const classes = classnames([
      `chart-layout`,
      `chart-layout__bar`,
      {
        [`chart-layout__bar--stacked`] : this.props.stacked
      }
    ]);

    const headingStyles = classnames([
      'chart-heading',
      {['chart-heading--active']: !this.state.chartLabel.visible }
    ]);

    const chartLabel = (
      <div className={chartLabelClasses} ref="chartLabel">
        <Heading strong={true} tag="h2">
          {this.state.chartLabel.value}
          <span className={`charts-label__unit`}>
            {this.state.chartLabel.units}
          </span>
        </Heading>
        <Heading tag="h6">{this.state.chartLabel.label}</Heading>
      </div>
    );

    const meters = (!this.props.stacked)
      ? this.props.series.map((item, index) =>
        <Meter id={`meter-${index}`} key={`meter-${index}`}
          vertical={(this.props.layout === 'small') ? false : true}
          label={false}
          max={this.props.max}
          min={0}
          value={item.value}
          colorIndex={item.colorIndex}
          onActive={this._onIndexUpdate.bind(this, index)}
          size={(this.props.layout === 'small') ? "xlarge" : "small"}
        />
      ) : (
      <Meter id={`meter-1`} key={`meter-1`}
        vertical={(this.props.layout === 'small') ? false : true} 
        label={false} 
        max={this.props.max} 
        min={0} 
        series={this.props.series}
        stacked={true}
        onActive={this._onIndexUpdate.bind(this)}
        size={(this.props.layout === 'small') ? "xlarge" : "small"}
      />
    );

    const verticalAxis = (this.props.layout === 'large' && this.props.axis) 
      ? (
        <Chart>
          {this.props.axis}
          <Base height="small" style={{width:0}} />
        </Chart>
      ) 
      : null;

    const horizontalAxis = (this.props.layout === 'small' && this.props.axis) 
      ? (
        <Chart>
          <Base style={{width:'75%', height: '40px'}}>     
            {this.props.axis}
          </Base>
        </Chart>
      ) 
      : null;

    const chartLayout = (this.props.layout !== 'small') 
      ? (
        <Box direction="row">
          {verticalAxis}
          <Box direction="column" align="center">
            <Chart>
              <Base>
                <Box direction="row" justify="center" align="center">{meters}</Box>
              </Base>
            </Chart>
            <Heading className={headingStyles} strong={true} tag="h5">
              {this.props.title}
            </Heading>
            {chartLabel}
          </Box>
        </Box>
      ) : (
        <Box direction="column" full="horizontal">
          {horizontalAxis}
          <Box className="chart-layout__bar--small" responsive={false} direction="row" 
            align="center" justify="center">
            <Box direction="column" style={{maxWidth: '75%'}}>
              <Box direction="column">{meters}</Box>
              <Heading strong={true} tag="h5">
                {this.props.title}
              </Heading>
            </Box>
            {chartLabel}
          </Box>
        </Box>
      );

    return (
      <div className={classes} onMouseLeave={this._onMouseLeave}>
        {chartLayout}
      </div>
    );
  }
};

BarChart.PropTypes = {
  axis: PropTypes.node,
  title: PropTypes.string.isRequired,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      colorIndex: PropTypes.string,
      label: PropTypes.string,
      units: PropTypes.string,
      value: PropTypes.number
    }).isRequired
  ),
  stacked: PropTypes.bool,
  onIndexUpdate: PropTypes.func
};

BarChart.defaultProps = {
  stacked: false,
  axis: false
};
