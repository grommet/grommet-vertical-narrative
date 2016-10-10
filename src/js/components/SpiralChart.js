import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Meter from 'grommet/components/Meter';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';

export default class SpiralChart extends Component {
  constructor(props) {
    super(props);

    this._onIndexUpdate = this._onIndexUpdate.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      chartLabel: {
        visible: false,
        units: null,
        value: 0
      },
      activeIndex: null
    };
  }

  _onIndexUpdate(index) {
    if (index !== undefined && index !== null) {
      this.setState({
        chartLabel: {
          visible: true,
          units: this.props.units,
          value: this.props.series[index].value
        },
        activeIndex: index
      });
    } else {
      this.setState({
        chartLabel: {
          visible: false
        },
        activeIndex: null
      });
    }
  }

  _onMouseLeave() {
    this.setState({
      chartLabel: {
        visible: false,
        units: this.state.chartLabel.units || null,
        value: this.state.chartLabel.value
      }
    });

    // Wait for animation to complete before clearing index.
    setTimeout(()=>{
      this.setState({activeIndex: null});
    }, 300);
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
      { [`grommetux-meter--active`]: this.state.chartLabel.visible }
    ]);

    const chartLabel = (
      <div className={chartLabelClasses} ref="chartLabel">
        <Heading strong={true} tag="h2">
          {this.state.chartLabel.value}
          <span className={`charts-label__unit`}>
            {this.state.chartLabel.units}
          </span>
        </Heading>
      </div>
    );
    
    return (
      <div className="chart-layout chart-layout__spiral">
        <Box direction="column" onMouseLeave={this._onMouseLeave}>
          <Meter className={classes} type="spiral" series={this.props.series} 
            min={0} max={this.props.max} onActive={this._onIndexUpdate} 
            activeIndex={this.state.activeIndex} />
          {chartLabel}
        </Box>
      </div>
    );
  }
};

SpiralChart.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
      colorIndex: PropTypes.string
    })
  ),
  max: PropTypes.number,
  min: PropTypes.number,
  units: PropTypes.string
};

