// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

import Responsive from 'grommet/utils/Responsive';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Nav from './Nav';
import Content from './Content';

export default class Home extends Component {
  constructor() {
    super();

    this._onResponsive = this._onResponsive.bind(this);
    this._onProgress = this._onProgress.bind(this);

    this.state = {
      layout: 'large',
      progress: 0
    };
  }

  componentDidMount() {
    this._responsive = Responsive.start(this._onResponsive);
  }

  componentWillUnmount() {
    this._responsive.stop();
  }

  _onProgress(progress) {
    if (progress !== this.state.progress) 
      this.setState({progress: progress});
  }

  _onResponsive (isLayoutSmall) {
    this.setState({
      layout: (isLayoutSmall) ? 'small' : 'large'
    });
  }

  render() {
    return (
      <Article ref="article" className="home" onProgress={this._onProgress}
        scrollStep={false} controls={false}>
        <Box style={{textAlign:'center', zIndex:300}}>
          For demonstration purposes only.
        </Box>
        <Nav progress={this.state.progress} />

        <Content layout={this.state.layout} />
      </Article>
    );
  }
};
