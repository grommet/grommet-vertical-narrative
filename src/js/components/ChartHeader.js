import React, { PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

const CLASS_ROOT = "infographic__chart-header";

export default function ChartHeader ({text}) {
  const headerText = (<Heading tag="h2" strong={false}>{text}</Heading>);

  return (
    <Box className={CLASS_ROOT}>
      {headerText}
    </Box>
  );
}

ChartHeader.PropTypes = {
  text: PropTypes.string.isRequired
};
