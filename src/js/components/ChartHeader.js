import React, { PropTypes } from 'react';

import Heading from 'grommet/components/Heading';

const CLASS_ROOT = "infographic__chart-header";

export default function ChartHeader ({text}) {
  let headerText = (<Heading tag="h2" strong={false}>{text}</Heading>);

  return (
    <div className={CLASS_ROOT}>
      {headerText}
    </div>
  );
}

ChartHeader.PropTypes = {
  text: PropTypes.string.isRequired
};
