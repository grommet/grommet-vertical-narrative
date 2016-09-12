import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import Meter from './meter/Meter';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';

export default class BarChartDemo extends Component {
  constructor() {
    super();

    this._onIndexUpdate = this._onIndexUpdate.bind(this);
    this._onWindowResize = this._onWindowResize.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    window.addEventListener('resize', this._onWindowResize);

    this.state = {
      chartLabel: {
        visible: false,
        label: '0',
        units: '%',
        value: 0
      },
      activeIndex: null,
      layout: this._mobileRespond(window.innerWidth)
    };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onWindowResize);
  }

  _onIndexUpdate(index) {
    if (index !== null) {
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

    if (this.props.onIndexUpdate) this.props.onIndexUpdate(index, this.props.series);
  }

  _mobileRespond(windowWidth) {
    return (windowWidth >= 720) 
    ? 'horizontal'
    : 'vertical';
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
  }

  _onWindowResize() {
    this.setState({ layout: this._mobileRespond(window.innerWidth) });
  }

  render() {
     // Will be converted to Inline Label(?) component.
    let chartLabelTempRoot = 'charts-label';
    let chartLabelClasses = classnames([
      chartLabelTempRoot,
      {
        [`${chartLabelTempRoot}--active`]: this.state.chartLabel.visible
      }
    ]);

    let chartLabel = (
      <div className={chartLabelClasses} ref="chartLabel">
        <Heading strong={true} tag="h2">
          {this.state.chartLabel.value}<span className={`charts-label__unit`}>{this.state.chartLabel.units}</span>
        </Heading>
        <Heading tag="h6">{this.state.chartLabel.label}</Heading>
      </div>
    );

    let vertical = (this.state.layout === 'vertical') ? false : true;

    let classes = classnames([
      `chart-layout`,
      `chart-layout__bar`,
      {
        [`chart-layout__bar--stacked`] : this.props.stacked
      }
    ]);

    let chartLayout = (this.state.layout !== 'vertical') 
      ? (
        <Box direction="column">
          <Meter ref="barChart" vertical={vertical} series={this.props.series} max={100} onIndexUpdate={this._onIndexUpdate} units="%" 
            important={this.state.activeIndex} stacked={this.props.stacked}
            a11yTitleId="download-music-or-video" a11yDescId="bar-chart-desc" />
          <Heading strong={true} tag="h5">
            {this.props.title}
          </Heading>
          {chartLabel}
        </Box>
      ) 
      : (
        <Box direction="column">
          <Box className="chart-layout__bar--small" responsive={false} direction="row" align="center" justify="center">
            <Box direction="column">
              <Meter ref="barChart" vertical={vertical} series={this.props.series} max={100} onIndexUpdate={this._onIndexUpdate} units="%" 
                important={this.state.activeIndex} stacked={this.props.stacked}
                a11yTitleId="download-music-or-video" a11yDescId="bar-chart-desc" />

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

BarChartDemo.PropTypes = {
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

BarChartDemo.defaultProps = {
  stacked: false
};
