// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import utils from './chart-utils';
import KeyboardAccelerators from 'grommet/utils/KeyboardAccelerators';

const CLASS_ROOT = "infographic-chart";

const POINT_RADIUS = 4;

export default class Chart extends Component {

  constructor(props) {
    super(props);

    this._onKeyboard = this._onKeyboard.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._getBoundsGuides = this._getBoundsGuides.bind(this);
    this._stateFromProps = this._stateFromProps.bind(this);
    this._incrementActiveIndex = this._incrementActiveIndex.bind(this);
    this._decrementActiveIndex = this._decrementActiveIndex.bind(this);

    this.state = this._stateFromProps(props, {height: props.defaultHeight, 
      width: props.defaultWidth});
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);

    this._keyboardHandlers = {
      left: () => this._onKeyboard(event, this.state.activeIndex, 'left'),
      up: () => this._onKeyboard(event, this.state.activeIndex, 'up'),
      right: () => this._onKeyboard(event, this.state.activeIndex, 'right'),
      down: () => this._onKeyboard(event, this.state.activeIndex, 'down')
    };

    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );
    this._onResize();
  }

  componentDidUpdate (prevProps, prevState) {
    this._layout();
    if(this.state.orientation !== prevState.orientation)
      this._updateKeyboardHandlers(this.state.orientation);
    if (prevState.activeIndex !== this.state.activeIndex && this.props.onIndexUpdate)
      this.props.onIndexUpdate(this.state.activeIndex);
  }

  componentWillUnmount () {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );
  } 

  // Generates state based on the provided props.
  _stateFromProps (props, {width, height, activeIndex = -1}) {
    let elem = (this.refs.chart) ? this.refs.chart : null;
    let bounds = utils.bounds(this._getBoundsGuides(elem));

    // normalize size
    let size = props.size ||
      (props.small ? 'small' :
        (props.large ? 'large' : null));

    return {
      bounds: bounds,
      width: width,
      height: height,
      size: size,
      activeIndex: activeIndex
    };
  }

  _onMouseOver (event) {
    if(this.props.onMouseOver) this.props.onMouseOver(event);
    this.setState({
      activeIndex: Number(event.target.getAttribute('data-index')),
      active: true
    });
  }

  _onClick (event) {
    if(this.props.onClick) this.props.onClick(event);
    this.setState({
      activeIndex: Number(event.target.getAttribute('data-index')),
      active: true
    });
  }

  _onMouseOut (event) {
    // Remove highlighted index.
    if(this.props.onMouseOut) this.props.onMouseOut(event);
    this.setState({
      active: false
    });
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _incrementActiveIndex(index) {
    if (index < this.props.series[0].values.length - 1 && index >= 0) {
      this.setState({ 
        activeIndex: Number(index) + 1 
      });
    }
  }

  _decrementActiveIndex(index) {
    if (index > 0) {
      this.setState({ 
        activeIndex: Number(index) - 1 
      });
    }
  }

  _onKeyboard(event, index, key) {
    event.preventDefault();
    switch(key) {
      case 'left':
        this._decrementActiveIndex(index);
        break;
      case 'right':
        this._incrementActiveIndex(index);
        break;
      case 'up':
        if (this.props.orientation === 'vertical') {
          this._decrementActiveIndex(index);
        } else {
          this._incrementActiveIndex(index);
        }
        break;
      case 'down':
        if (this.props.orientation === 'vertical') {
          this._incrementActiveIndex(index);
        } else {
          this._decrementActiveIndex(index);
        }
        break;
    }
  }

  // Initial bounds calculations.
  _getBoundsGuides(elem = null) {
    let rect = {
      width: (elem !== null) 
        ? elem.getBoundingClientRect().width : this.props.defaultWidth,
      height: (elem !== null) 
        ? elem.getBoundingClientRect().height : this.props.defaultHeight
    };

    let boundGuides = {
      series: this.props.series,
      width: rect.width,
      height: rect.height,
      min: this.props.min || null,
      max: this.props.max || null,
      orientation: this.props.orientation || 'horizontal',
      points: this.props.points
    };

    return boundGuides;
  }

  // Adjusts layout on re-size.
  _layout () {
    let boundGuides = this._getBoundsGuides(this.refs.chart);

    if (boundGuides.width !== this.state.width || boundGuides.height !== this.state.height) {
      let bounds = utils.bounds(boundGuides);

      this.setState({
        width: boundGuides.width,
        height: boundGuides.height,
        bounds: bounds
      });

      if (this.props.onResize) this.props.onResize(boundGuides.width, boundGuides.height, bounds);
    }
  }

  render () {
    let classes = classnames([
      CLASS_ROOT,
      `${CLASS_ROOT}--${this.props.orientation}`,
      {
        // Todo: Add size classes
        [`${CLASS_ROOT}--${this.state.size}`]: this.state.size,
        [`${CLASS_ROOT}--active`]: this.state.active,
        [`${CLASS_ROOT}--layered`]: this.props.series.length > 1
      }
    ]);

    let chartPaths;
    switch (this.props.type) {
      case 'area':
        chartPaths = utils.getAreaPaths(this.state.bounds, this.props);
        break;
      case 'line':
        chartPaths = utils.getLinePaths(this.state.bounds, this.props);
        break;
    }
    let chartGroup = (<g className={`${CLASS_ROOT}__area`}>{chartPaths}</g>);

    let points = (this.props.points) 
      ? utils.getPointPaths(this.state.bounds, this.props, POINT_RADIUS)
      : null;
    let pointGroup = (<g className={`${CLASS_ROOT}__points`}>{points}</g>);

    let rectangleHotspots = utils.getHotspots(this.state.bounds, 
      this.props, this.props.a11yTitleId, this.onClick, 
      this._onMouseOver, this._onMouseOut);

    // Define cursor index to render cursor for animations.
    let cursorIndex = (this.state.activeIndex !== -1) 
      ? this.state.activeIndex : 0;
    let cursor = utils.getCursor(this.state.bounds, this.props, 
      cursorIndex, 'graph-2');

    let activeDescendant;

    let a11yTitle = utils.getA11YTitle(this.props.a11yTitle, this.context.intl, 'area');
    let a11yTitleNode;
    if (a11yTitle) {
      a11yTitleNode = (
        <title id={this.props.a11yTitleId}>{a11yTitle}</title>
      );
    }

    let a11yDescNode;
    if (this.props.a11yDesc) {
      a11yDescNode = (
        <desc id={this.props.a11yDescId}>
          {this.props.a11yDesc}
        </desc>
      );
    }

    return (
      <div className={classes}>
        <svg ref="chart" className={`${CLASS_ROOT}__graphic`}
          viewBox={`0 0 ${this.state.width} ${this.state.height}`}
          preserveAspectRatio="none" role="img" tabIndex="0" 
          aria-activedescendant={activeDescendant}
          aria-labelledby={this.props.a11yTitleId + ' ' + this.props.a11yDescId} >
          {a11yTitleNode}
          {a11yDescNode}
          <g className={`${CLASS_ROOT}__values`}>{chartGroup}{pointGroup}</g>
          <g>{cursor}</g>
          <g className={`${CLASS_ROOT}__hotspots`}>{rectangleHotspots}</g>
        </svg>
      </div>
    );
  }

}

Chart.propTypes = {
  a11yTitle: PropTypes.string,
  a11yTitleId: PropTypes.string,
  a11yDescId: PropTypes.string,
  a11yDesc: PropTypes.string,
  defaultHeight: PropTypes.number,
  defaultWidth: PropTypes.number,
  important: PropTypes.number,
  onResize: PropTypes.func,
  onMouseOver: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  onClick: PropTypes.func,
  onIndexUpdate: PropTypes.func,
  points: PropTypes.bool,
  pointsRadius: PropTypes.number,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      colorIndex: PropTypes.string,
      onClick: PropTypes.func,
      label: PropTypes.string,
      units: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.number
      ).isRequired,
      axisValues: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      )
    })
  ).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  smooth: PropTypes.bool,
  type: PropTypes.oneOf(['line', 'area'])
};

Chart.contextTypes = {
  intl: PropTypes.object
};

Chart.defaultProps = {
  a11yTitleId: 'chart-title',
  a11yDescId: 'chart-desc',
  defaultHeight: 192,
  defaultWidth: 392,
  min: 0,
  orientation: 'horizontal',
  pointsRadius: 3,
  type: 'line'
};
