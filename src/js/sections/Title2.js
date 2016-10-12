import React from 'react';

import classnames from 'classnames';

import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Value from 'grommet/components/Value';
import Box from 'grommet/components/Box';
import InfographicSection from '../components/InfographicSection';
import Cart from 'grommet/components/icons/base/Cart';

const CLASS_ROOT = "title-section";

export default function Title2() {
  let classes = classnames([
    CLASS_ROOT,
    `${CLASS_ROOT}--left-align`
  ]);

  return (
    <InfographicSection className={classes} direction="row" colorIndex="accent-2">
      <Box className={`${CLASS_ROOT}__col-1`} pad={{vertical: "medium"}}>
        <Cart size="huge" colorIndex="grey-1" />
      </Box>
      <Box className={`${CLASS_ROOT}__col-2`} direction="column" alignContent="start">
        <Headline className={`${CLASS_ROOT}__title`} size="large" strong={true}>Brands and Retail</Headline>
        <Headline className={`${CLASS_ROOT}__desc`} size="small">Millennials are turning to brands that can offer 
          maximum convenience at the lowest cost.</Headline>
        <Box direction="row" responsive={false} align="center">
          <Value 
            value={57}
            colorIndex="grey-1"
            size="xlarge"
            units="%"
          />
        </Box>
        <Heading className={`${CLASS_ROOT}__stat-desc`} tag="h4" strong={true}>
          of Millennials compare prices in-store.
        </Heading>
      </Box>
    </InfographicSection>
  );
};
