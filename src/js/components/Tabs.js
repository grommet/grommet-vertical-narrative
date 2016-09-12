// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import classnames from 'classnames';
import Intl from 'grommet/utils/Intl';
import CSSClassnames from 'grommet/utils/CSSClassnames';

import Box from 'grommet/components/Box';

const CLASS_ROOT = CSSClassnames.TABS;

export default class Tabs extends Component {

  constructor(props) {
    super(props);

    this._activateTab = this._activateTab.bind(this);

    this.state = {
      activeIndex: props.initialIndex,
      justify: props.justify,
      listWidth: '100%'
    };
  }

  componentDidMount() {
    if (this.props.scrolling) {
      // Wait for the text to adjust itself, calling this method
      // too early will result in incorrect bounding rect values.
      // Todo: Investigate further, find sustaintable solution.
      setTimeout(() => {
        this._setListWidth(ReactDOM.findDOMNode(this.refs.tabNav));
      }, 350);

      window.addEventListener('resize', 
        this._setListWidth(ReactDOM.findDOMNode(this.refs.tabNav)));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Adjust width after new label has been updated with
    // bold styling.
    if (prevState.activeIndex !== this.state.activeIndex) 
      this._setListWidth(ReactDOM.findDOMNode(this.refs.tabNav));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', 
      this._setListWidth(ReactDOM.findDOMNode(this.refs.tabNav)));
  }

  _activateTab (index) {
    this.setState({activeIndex: index});
  }

  _setListWidth(listNode) {
    const tabList = listNode.childNodes;
    const tabListArray = [...tabList];
    let listWidth = 0;

    tabListArray.map((tab) => {
      let tabWidth = tab.getBoundingClientRect().width + 3;
      listWidth = listWidth + Math.ceil(tabWidth);
    });

    this.setState({listWidth: (listWidth)+'px'});
  }

  render () {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + '--justify-' + this.props.justify);
    if (this.props.responsive) {
      classes.push(CLASS_ROOT + '--responsive');
    }

    var activeContainer;
    var activeTitle;

    var tabs = React.Children.map(this.props.children, function(tab, index) {

      var tabProps = tab.props || tab._store.props || {};

      var isTabActive = index === this.state.activeIndex;

      if (isTabActive) {
        activeContainer = tabProps.children;
        activeTitle = tabProps.title;
      }

      return React.cloneElement(tab, {
        active: isTabActive,
        id: 'tab-' + index,
        onRequestForActive: function () {
          this._activateTab(index);
        }.bind(this)
      });
    }.bind(this));

    var tabContentTitle = Intl.getMessage(this.context.intl, 'Tab Contents', {
      activeTitle: activeTitle
    });

    let tabStyle = (this.props.scrolling)
      ? {
        width: `${this.state.listWidth}`
      }
      : null;

    let navClasses = classnames([
      `${CLASS_ROOT}__nav`,
      {
        [`${CLASS_ROOT}__nav--scrolling`]: this.props.scrolling
      }
    ]);

    // TODO: Since there could be multiple Tabs on the page, we need a more
    // robust means of identifying the association between title and aria label.
    return (
      <div className={`${CLASS_ROOT}__list`} role="tablist">
        <div className={navClasses}>
          <ul ref="tabNav" className={classes.join(' ')} style={tabStyle}>
            {tabs}
          </ul>
        </div>
        <div ref="tabContent" tabIndex="0" aria-label={tabContentTitle}
          role="tabpanel">
          <Box className={CLASS_ROOT + '__content'}
            aria-label={tabContentTitle}>
            {activeContainer}
          </Box>
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number,
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  responsive: PropTypes.bool,
  scrolling: PropTypes.bool
};

Tabs.contextTypes = {
  intl: PropTypes.object
};

Tabs.defaultProps = {
  initialIndex: 0,
  justify: 'center',
  responsive: true,
  scrolling: true
};
