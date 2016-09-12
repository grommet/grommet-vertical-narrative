import React from 'react';
import Down from 'grommet/components/icons/base/Down';

const CLASS_ROOT = 'infographic-start';

export default function StartButton (props) {
  return (
  	<div className={`${CLASS_ROOT}`}>
  		{props.text}
	      <div className={`${CLASS_ROOT}__icon`}>
	        <Down a11yTitle={'Start Button'} />
	      </div>
    </div>
  );
}

