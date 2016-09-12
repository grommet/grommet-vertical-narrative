import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = "axis";
const MARKER_SIZE = 4;
const FONT_SIZE = 14;
const DEFAULT_PADDING = 50;

export default class Axis extends Component {
  constructor(props) {
    super(props);
    this._renderLines = this._renderLines.bind(this);
    this._renderText = this._renderText.bind(this);
  }

  _renderText(labels, count) {
    let text = labels.map((label, index) => {
      // Check if label's position is within our range.
      if (label.position - 1 <= count && label.position >= 1) {
        let labelOffset = 0;
        let labelPosition = label.position - 1;

        // Todo: Allow for various point sizes. Adjust on the fly.
        // Determine offsets to keep text aligned on markers.
        let textAnchor = "end";

        if (labelPosition === 0) {
          labelOffset = (this.props.layout === 'horizontal') 
          ? 5
          : FONT_SIZE - 4;
          if (this.props.layout === 'vertical') textAnchor = "end";
          if (this.props.layout === 'horizontal') textAnchor = "start";
        } else if (labelPosition > 0 && labelPosition < count) {
          // 7.5 is character width, could listen to CDM and adjust offset?
          if (this.props.layout === 'horizontal') 
            labelOffset = (label.value.length * 7.5) / 2;
          if (this.props.layout === 'vertical') 
            labelOffset = FONT_SIZE / 2 - 3;
        } else if (labelPosition === count) {
          labelOffset = (this.props.layout === 'vertical') 
            ? -2 : -5;
        }
        
        // Gather distance of label to travel.
        let distance = this.props.distance;

        // Adjust text position based on layout.
        let textPos = (this.props.layout === 'vertical') 
          ? Math.round(((distance/(count)) * (labelPosition)) + labelOffset)
          : Math.round(((distance/(count)) * (labelPosition)) + labelOffset);

        // Set x and y coords for text.
        let x = (this.props.layout === 'vertical')
          ? this.props.textPadding - MARKER_SIZE - 10 
          : textPos;
        let y = (this.props.layout === 'vertical') 
          ? textPos 
          : this.props.textPadding - MARKER_SIZE - 10;

        // Adjust text's Y position to align top.
        if (this.props.textAlign.x === 'top' && this.props.layout !== 'vertical') {
          y = FONT_SIZE - 4;
        }

        // Adjust textys' X position to align right.
        if (this.props.textAlign.y === 'right' && this.props.layout === 'vertical') {
          x = MARKER_SIZE + 10;
          textAnchor = "start";
        }
 
        // Reverse labels for vertical layout.
        let text = (this.props.layout === 'vertical') 
          ? label.value
          : label.value;

        return(
          <text key={`${CLASS_ROOT}__label-text-${index}`}
            x={x}
            y={y} 
            role="presentation" 
            className={`${CLASS_ROOT}__label-text`}
            textAnchor={textAnchor} fontSize={FONT_SIZE}>
            {text}
          </text>
        );
      }
      return null;
    });

    return text;
  }

  _renderLines(nodeHeight, nodeWidth, count) {
    let lines = [];
    let stepIncrement = 0;

    // Setup initial SVG line array.
    for (i = 0; i <= count; i++) { 
      let increment = (stepIncrement === 0) ? 1 : stepIncrement;
      let x1 = (this.props.layout === 'vertical') 
        ? this.props.textPadding : increment;
      let x2 = (this.props.layout === 'vertical') 
        ? this.props.textPadding - MARKER_SIZE : increment;
      let y1 = (this.props.layout === 'vertical')
        ? increment : 0;
      let y2 = (this.props.layout === 'vertical')
        ? increment : 0 + MARKER_SIZE;
      let distance = (this.props.layout === 'vertical') 
        ? nodeHeight : nodeWidth;

      // Adjust lines for top aligned text.
      if (this.props.textAlign.x === 'top' && this.props.layout !== 'vertical') {
        y1 = FONT_SIZE;
        y2 = FONT_SIZE + MARKER_SIZE;
      }

      // Adjust lines for right aligned text.
      if (this.props.textAlign.y === 'right' && this.props.layout === 'vertical') {
        x1 = 0;
        x2 = MARKER_SIZE;
      }

      lines.push(
        <line key={`${CLASS_ROOT}__label-marker-${i}`}
        x1={x1} x2={x2} 
        y1={y1} y2={y2}
        className={`${CLASS_ROOT}__label-marker`} />);

      stepIncrement = stepIncrement + distance/(count);
    }

    return lines;
  }

  render() {

    let classes = classnames([
      CLASS_ROOT,
      `${CLASS_ROOT}--${this.props.layout}`
    ]);
    let textPadding = this.props.textPadding;

    let width = (this.props.layout === 'vertical') 
      ? textPadding
      : this.props.distance;
    let height = (this.props.layout === 'vertical') 
      ? this.props.distance
      : textPadding;

    let lines = this._renderLines(height, width, this.props.count - 1);
    let text = (this.props.label) 
      ? this._renderText(this.props.label, this.props.count - 1)
      : null;

    return (
      <div className={classes}>
        <svg
          style={{height: height, width: width, overflow:'hidden', maxWidth:'100%'}}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none">
          <g>
            {lines}
            {text}
          </g>
        </svg>
      </div>
    );
  }
};

Axis.PropTypes = {
  count: PropTypes.number,
  distance: PropTypes.number,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  label: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  })),
  textPadding: PropTypes.number,
  textAlign: PropTypes.shape({
    x: PropTypes.oneOf(['top', 'bottom']), 
    y: PropTypes.oneOf(['left', 'right']) 
  })
};

Axis.defaultProps = {
  count: 5,
  distance: DEFAULT_PADDING,
  textPadding: DEFAULT_PADDING,
  layout: 'vertical',
  textAlign: {
    x: 'bottom',
    y: 'left'
  }
};
