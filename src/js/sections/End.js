import React from 'react';

import InfographicSection from '../components/InfographicSection';
import EndButton from '../components/EndButton';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';

export default function End(props) {
  return (
    <InfographicSection className="infographic__section infographic__section--end" 
      colorIndex="light-2">
      <Box direction="row" justify="center" align="center">
        <Box basis="1/3">
        <img src="../img/end/millennials.svg" />
        </Box>
        <Box basis="2/3">
          <Headline size="large">These are just some of the trends that
            will shape the new Millennial economy.</Headline>
          <Button href="http://www.hpe.com/solutions/enable" label="Learn more" 
            primary={true} />
        </Box>
      </Box>
      <EndButton onClick={props.onEndClick}/>
    </InfographicSection>
  );
};
