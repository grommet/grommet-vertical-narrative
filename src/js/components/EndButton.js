import React from 'react';
import Up from 'grommet/components/icons/base/Up';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

const CLASS_ROOT = 'infographic__button';

export default function EndButton (props) {
  return (
    <Button plain={true} className={`${CLASS_ROOT} ${CLASS_ROOT}--end`} onClick={props.onClick}>
      <Box direction="column" align="center" justify="center">
        <span className={`${CLASS_ROOT}-icon`}>
          <Up a11yTitle={'Scroll to top'} onClick={props.onClick} />
        </span>
      </Box>
    </Button>
  );
}
