import React from 'react';
import Down from 'grommet/components/icons/base/Down';
import Box from 'grommet/components/Box';

const CLASS_ROOT = 'infographic-start';

export default function StartButton (props) {
  return (
  	<Box className={`${CLASS_ROOT}`} align="center">
  		{props.text}
	      <div className={`${CLASS_ROOT}__icon`}>
	        <Down a11yTitle={'Start Button'} />
	      </div>
    </Box>
  );
}

