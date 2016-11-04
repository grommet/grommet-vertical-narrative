import React from 'react';

import classnames from 'classnames';

import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';
import LinkNext from 'grommet/components/icons/base/LinkNext';
import InfographicSection from '../components/InfographicSection';

const CLASS_ROOT = "title-section";

export default function Title1 () {
  let classes = classnames([
    CLASS_ROOT,
    `${CLASS_ROOT}--left-align`,
    `${CLASS_ROOT}--column-reverse`
  ]);

  return (
    <InfographicSection className={classes} direction="row" colorIndex="accent-3">
      <Box className={`${CLASS_ROOT}__col-2`} direction="column" alignContent="start">
        <Headline className={`${CLASS_ROOT}__title`} size="large" strong={true}>
          Who are they?
        </Headline>
        <Headline className={`${CLASS_ROOT}__desc`} size="small">
          Millennials have different priorities and expectations than previous generations.
        </Headline>
        <Heading className={`${CLASS_ROOT}__stat-desc`} tag="h4" strong={true}>
          Born between
        </Heading>
        <Box direction="row" responsive={false} align="center" wrap={true}>
          <Value 
            value={1980}
            colorIndex="grey-1"
            size="large"
            trendIcon={<LinkNext colorIndex="grey-1" style={{marginLeft:'10px'}}/>} 
          />
          <Value 
            value={1980}
            colorIndex="grey-1"
            size="large"
          />
        </Box>
      </Box>
      <Box className={`${CLASS_ROOT}__col-1`} justify="center">
        <img className={`${CLASS_ROOT}__title-img`} style={{maxWidth:'400px'}}
          src="../img/section-1/group.svg" />
      </Box>
    </InfographicSection>
  );
};
