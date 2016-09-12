import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import InfographicSection from './InfographicSection';

const CLASS_ROOT = "title-section";

export default class TitleSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = classnames([
      CLASS_ROOT,
      `${CLASS_ROOT}--${this.props.alignText}-align`
    ]);

    return (
      <InfographicSection className={classes} direction="row" colorIndex="graph-2">
        <Box className={`${CLASS_ROOT}__col-2`} direction="column" alignContent="start">
          <Headline className={`${CLASS_ROOT}__title`} size="large" strong={true}>Who are they?</Headline>
          <Headline className={`${CLASS_ROOT}__desc`} size="small">Millennials have different priorities and 
            expectations than previous generations.</Headline>
          <Heading className={`${CLASS_ROOT}__stat-desc`} tag="h4" strong={true}>Born between</Heading>
          <Box direction="row" responsive={false} align="center">
            <Heading className={`${CLASS_ROOT}__stat`} tag="h1" strong={true}>1980</Heading>
            <img  className={`${CLASS_ROOT}__stat-icon-arrow`} src="../img/section-1/arrow.svg" />
            <Heading className={`${CLASS_ROOT}__stat`} tag="h1" strong={true}>2000</Heading>
          </Box>
        </Box>
        <Box className={`${CLASS_ROOT}__col-1`} justify="center">
          <img className={`${CLASS_ROOT}__title-img`} src="../img/section-1/group.svg" style={{maxWidth: '360px'}}/>
        </Box>
      </InfographicSection>
    );
  }
};

TitleSection.PropTypes = {
  alignText: PropTypes.oneOf(['left', 'right', 'center'])
};

TitleSection.defaultProps = {
  alignText: 'left'
};
