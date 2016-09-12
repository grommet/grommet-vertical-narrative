import React from 'react';
import Intl from 'grommet/utils/Intl';

const CLASS_ROOT = 'infographic-chart';
const POINT_RADIUS = 3;

export default {
  // Combine multiple data sets.
  combineSeries(arrays) {
    let combinedArray = [];
    arrays.forEach((array) => {
      combinedArray = combinedArray.concat(array.values);
    });
    return combinedArray;
  },

  // Evaluate series array to determine highest value
  getMaxValue(series) {
    let maxValue = Math.max.apply(Math, this.combineSeries(series));
    return maxValue;
  },

  // Get the highest count of an array.
  getMaxCount(series) {
    let maxCount = 0;
    series.forEach((item) =>{
      maxCount = Math.max(item.values.length, maxCount);
    });
    maxCount = maxCount - 1;

    return maxCount;
  },

  // Setup our bounds to plot points.
  bounds ({series, height, width, max, min, orientation, points}) {
    let minX = 0;
    let maxX = (orientation === 'horizontal') 
      ? this.getMaxCount(series) : this.getMaxValue(series);
    let minY = 0;
    let maxY = (orientation === 'horizontal') 
      ? this.getMaxValue(series) : this.getMaxCount(series);

    if (min) {
      if (orientation === 'horizontal') {
        minY = min;
      }

      if (orientation === 'vertical') {
        minX = min;
      }
    }

    if (max) {
      if (orientation === 'horizontal') {
        maxY = max;
      } 

      if (orientation === 'vertical') {
        maxX = max;
      }
    }

    let spanX = maxX - minX;
    let spanY = maxY - minY;

    let graphWidth = width;
    let graphHeight = height;

    let graphTop = 0;
    let graphBottom = height;

    let graphLeft = 0;
    let graphRight = graphWidth;


    let valueCount = (orientation === 'horizontal') 
      ? maxX
      : maxY;

    let scaleX = (graphWidth / spanX);
    let stepWidth = (orientation === 'horizontal') 
      ? Math.round(graphWidth / (valueCount)) 
      : Math.round(graphHeight / (valueCount));

    let scaleY = (graphHeight / spanY);

    let result = {
      graphWidth: graphWidth,
      graphHeight: graphHeight,
      graphTop: graphTop,
      graphBottom: graphBottom,
      graphLeft: graphLeft,
      graphRight: graphRight,
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY,
      spanX: spanX,
      spanY: spanY,
      scaleX: scaleX,
      scaleY: scaleY,
      stepWidth: stepWidth,
      valueCount: valueCount
    };

    return result;
  },

    // Translates X value to X coordinate.
  _translateX (x, bounds) {
    let scaledX = Math.min(bounds.graphRight, this._translateWidth(x, bounds));
    let translatedX = Math.max(bounds.graphLeft, scaledX);

    return translatedX;
  },

  _translateWidth(x, bounds) {
    let translatedWidth = Math.round((x - bounds.minX) * bounds.scaleX);

    return translatedWidth;
  },

  // Translates Y value to Y coordinate.
  _translateY (y, bounds) {
    let translatedY = bounds.graphBottom - this._translateHeight(y, bounds);

    return translatedY;
  },

  // Translates Y value to graph height.
  _translateHeight (y, bounds) {

    let translatedHeight = Math.max(
      Math.round((y - bounds.minY) * bounds.scaleY),
      1);
    return translatedHeight;
  },

  // Translates X and Y values to X and Y coordinates.
  _coordinates (value, index, bounds, orientation = 'horizontal') {
    let x, y;
    x = (orientation === 'horizontal') ? index : value;
    y = (orientation === 'horizontal') ? value : bounds.maxY - index;

    return [this._translateX(x, bounds), this._translateY(y, bounds)];
  },

  // Determines what the appropriate control coordinates are on
  // either side of the coordinate at the specified index.
  // This calculation is a simplified smoothing function that
  // just looks at whether the line through this coordinate is
  // ascending, descending or not. Peaks, valleys, and flats are
  // treated the same.
  _controlCoordinates (coordinates, index) {
    let current = coordinates[index];
    // Use previous and next coordinates when available, otherwise use
    // the current coordinate for them.
    let previous = current;
    if (index > 0) {
      previous = coordinates[index - 1];
    }
    let next = current;
    if (index < coordinates.length - 1) {
      next = coordinates[index + 1];
    }

    // Put the control X coordinates midway between the coordinates.
    let deltaX = (current[0] - previous[0]) / 2;
    let deltaY;

    // Start with a flat slope. This works for peaks, valleys, and flats.
    let first = [current[0] - deltaX, current[1]];
    let second = [current[0] + deltaX, current[1]];

    if (previous[1] < current[1] && current[1] < next[1]) {
      // Ascending, use the minimum positive slope.
      deltaY = Math.min(((current[1] - previous[1]) / 2),
        ((next[1] - current[1]) / 2));
      first[1] = current[1] - deltaY;
      second[1] = current[1] + deltaY;
    } else if (previous[1] > current[1] && current[1] > next[1]) {
      // Descending, use the minimum negative slope.
      deltaY = Math.min(((previous[1] - current[1]) / 2),
        ((current[1] - next[1]) / 2));
      first[1] = current[1] + deltaY;
      second[1] = current[1] - deltaY;
    }
    return [first, second];
  },

  // Uses the provided colorIndex or provides one based on the seriesIndex.
  _itemColorIndex (item, seriesIndex) {
    return item.colorIndex || ('graph-' + (seriesIndex + 1));
  },

  _getLineCommands (coordinates, smooth, points) {
    let commands, controlCoordinates, previousControlCoordinates;

    coordinates.forEach((coordinate, index) => {
      if (smooth) {
        controlCoordinates = this._controlCoordinates(coordinates, index);
      }

      // Lower top most coordinates to accommodate points.
      //if (points && coordinate[1] <= 1) coordinate[1] = coordinate[1] + POINT_RADIUS;
      if (0 === index) {
        commands = "M" + coordinate.join(',');
      } else {
        if (smooth) {
          // Use the previous right control coordinate and the current
          // left control coordinate. We do this because we calculate
          // the left and right sides for a particular index together,
          // so the path is smooth but the SVG C command needs the
          // right one from the previous index and the left one from
          // the current index.
          commands += " C" + previousControlCoordinates[1].join(',') + " " +
            controlCoordinates[0].join(',') + " " + coordinate.join(',');
        } else {
          commands += " L" + coordinate.join(',');
        }
      }

      previousControlCoordinates = controlCoordinates;
    });
    return commands;
  },

  _getValueString(series, index) {
    let string = series.map((singleSeries, seriesIndex)=>{
      let seriesString = `${singleSeries.label}: ${singleSeries.values[index]}${singleSeries.units}`;
      if (series.length > 0) seriesString = `${seriesString} `;
      return seriesString;
    });

    return string;
  },

  getPointPaths (bounds, {series, orientation, smooth, points}, radius) {
    let values = series.map((item, seriesIndex) => {
      let colorIndex = this._itemColorIndex(item, seriesIndex);
      let coordinates = item.values.map((value, index) => {
        return this._coordinates(value, index, bounds, orientation);
      });

      let pointsPaths = [];

      coordinates.forEach((coordinate, index) => {
        let x = Math.max(radius + 1,
          Math.min(bounds.graphWidth, coordinate[0]));
        let value = item.values[index];
        let axisValue = (item.axisValues !== undefined) ? item.axisValues[index] : index;
        let units = (item.units !== undefined) ? item.units : '';

        if (index === 0 && orientation === 'horizontal') x = radius / 2;
        if (index === coordinates.length - 1 && orientation === 'horizontal') 
          x = bounds.graphWidth + radius / 2;
        
        let animationDelay = .5 + (index * .1);

        pointsPaths.push(
          <circle key={`series${seriesIndex}-${index}`}
            className={`${CLASS_ROOT}__point grommetux-color-index-${colorIndex}`}
            style={{animationDelay: `${animationDelay}s`}}
            cx={x} cy={coordinate[1]} r={radius} 
            data-value={value}
            data-axis-value={axisValue}
            data-units={units} />
        );
      });

      return pointsPaths;
    });

    return values;
  },

  // Generate area path based on data.
  getAreaPaths (bounds, {series, orientation, smooth, points}) {
    let bottom = bounds.graphBottom;
    let area = series.map((item, seriesIndex) => {

      let colorIndex = this._itemColorIndex(item, seriesIndex);
      let coordinates = item.values.map((value, index) => {
        return this._coordinates(value, index, bounds, orientation);
      });

      if (orientation === 'vertical') coordinates = coordinates.reverse();

      let commands = this._getLineCommands(coordinates, smooth, points);

      let close = 'L' + coordinates[coordinates.length - 1][0] +
        ',' + bottom +
        'L' + coordinates[0][0] + ',' + bottom + 'Z';

      if (orientation === "vertical") close = 'L' + bounds.graphLeft +
        ',' + bounds.graphLeft +
        'L' + bounds.graphLeft + ',' + bottom + 'Z';

      let areaCommands = commands + close;
      let classes = [`${CLASS_ROOT}__values-area`,
        `grommetux-color-index-${colorIndex}`];
      if (item.onClick) {
        classes.push(`${CLASS_ROOT}__values-area--active`);
      }

      let areaPath = (
        <path key={`${seriesIndex}`} stroke="none" className={classes.join(' ')} d={areaCommands} />
      );

      return areaPath;
    });

    return area;
  },

  // Generate line path based on data.
  getLinePaths (bounds, {series, orientation, smooth, points}) {
    let values = series.map((item, seriesIndex) => {

      let coordinates = item.values.map((value, index) => {
        return this._coordinates(value, index, bounds, orientation);
      });

      // Flip vertical coords otherwise chart appears reverse.
      if (orientation === 'vertical') coordinates = coordinates.reverse();

      let colorIndex = this._itemColorIndex(item, seriesIndex);
      let commands = this._getLineCommands(coordinates, smooth, points);

      let classes = [`${CLASS_ROOT}__values-line`,
        `grommetux-color-index-${colorIndex}`];

      let linePath = (
        <path key={`line-${seriesIndex}`} fill="none" className={classes.join(' ')} d={commands} />
      );

      return linePath;
    });

    return values;
  },

  // Generate rectangles used for hotspots.
  getHotspots (bounds, {series, valueCount, orientation}, 
    a11yTitleId, onClick, onMouseOver, onMouseOut) {
    let className = `${CLASS_ROOT}__front`;
    let hotspots = series[0].values.map((value, valueIndex) => {
      let item = series[0];
      let y = (orientation === 'horizontal') 
        ? 0
        // Subtract max Y value to reverse order
        // this aligns values correctly for vertical.
        : this._translateY((bounds.maxY - valueIndex), bounds) - (bounds.stepWidth / 2);
      let x = (orientation === 'horizontal') 
        ? this._translateX(valueIndex, bounds) - (bounds.stepWidth / 2)
        : 0;
        
      let width = (orientation === 'horizontal') 
        ? bounds.stepWidth : bounds.graphWidth;
      let height = (orientation === 'horizontal')
        ? bounds.graphHeight : bounds.stepWidth;

      let hotspotId = `${a11yTitleId}_hotspot_${valueIndex}`;
      let hotspotTitleId = `${a11yTitleId}_hotspot_title_${valueIndex}`;

      let valueString = this._getValueString(series, valueIndex);

      // Clean up outter most hot spots. Add thumb padding.
      if (valueIndex === 0 || valueIndex === item.values.length -1) {
        let thumbPadding = 5;
        if (orientation === 'horizontal' && valueIndex === 0) {
          x = x + (bounds.stepWidth / 2) - thumbPadding;
          width = thumbPadding + (width / 2);
        }
        if (orientation === 'vertical' && valueIndex === 0) {
          y = (y + (bounds.stepWidth / 2)) - thumbPadding;
          height = thumbPadding + (height / 2);
        }
      }

      return (
        <g key={hotspotId} id={hotspotId} role="tab"
          aria-labelledby={hotspotTitleId} onClick={onClick}
          onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
          <title id={hotspotTitleId}>{valueString}</title>
          <rect role="presentation" className={`${className}-hotspot-background`}
            x={x} y={y} width={width} height={height} data-index={valueIndex} />
        </g>
      );
    });

    return (
      <g ref="front" className={className}>
        {hotspots}
      </g>
    );
  },

  // Generate cursor.
  getCursor(bounds, {series, orientation, points}, activeIndex, colorIndex) {
    let value = series[0].values[activeIndex];
    let coordinates = this._coordinates(value, activeIndex, bounds, orientation);
    // This gathers all coords for the active index 
    // value to plot cursor points.
    let activeIndexCoords = series.map((singleSeries) => {
      return this._coordinates(singleSeries.values[activeIndex], activeIndex, bounds, orientation);
    });

    // Offset it just a little if it is at an edge.
    let x1 = (orientation === 'horizontal')
      ? Math.max(1, Math.min(coordinates[0], bounds.graphWidth - 1))
      : bounds.graphLeft;

    let x2 = (orientation === 'horizontal')
      ? x1
      : bounds.graphRight;

    let y1 = (orientation === 'horizontal')
      ? bounds.graphTop
      : Math.max(1, Math.min(coordinates[1], bounds.graphHeight - 1));

    let y2 = (orientation === 'horizontal')
      ? bounds.graphBottom
      : y1;

    let linePath = (
      <line fill="none" x1={x1} y1={y1} x2={x2} y2={y2} />
    );

    let pointPaths = activeIndexCoords.map((coordSet, index) => {
      let pointColorIndex = (series[index].pointColorIndex) 
        ? series[index].pointColorIndex
        : colorIndex;

      let point = (
          <circle key={`circle-${index}`}
          className={`${CLASS_ROOT}__cursor-point grommetux-color-index-${pointColorIndex}`}
          cx={coordSet[0]} cy={coordSet[1]} r={Math.round(POINT_RADIUS * 2.5)} />
      );
      return point;
    });

    return (
      <g ref="cursor" role="presentation" className={`${CLASS_ROOT}__cursor`}>
        {linePath}
        {pointPaths}
      </g>
    );
  },

  getA11YTitle (title, context, type) {
    let a11yTitle = title;
    if (!title) {
      let chartLabel = Intl.getMessage(context, 'Chart');
      let typeLabel = Intl.getMessage(context, type);
      a11yTitle = `${typeLabel} ${chartLabel}`;
    }

    return a11yTitle;
  }
};
