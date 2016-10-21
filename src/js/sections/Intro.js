import React from 'react';

import InfographicSection from '../components/InfographicSection';
import StartButton from '../components/StartButton';
import Headline from 'grommet/components/Headline';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import UserPolice from 'grommet/components/icons/base/UserPolice';
import UserManager from 'grommet/components/icons/base/UserManager';
import UserWorker from 'grommet/components/icons/base/UserWorker';

export default function Intro () {
  return (
    <InfographicSection className="infographic__section infographic__section--start" 
      colorIndex="light-1">
      <div className="infographic__section-header">
        <Headline size="large" strong={true}>Reshaping the Economy</Headline>
      </div> 
      <Headline size="small">As Millennials move into prime spending years, companies 
        must reinvent how they do business.</Headline>
      <Box direction="row" full="horizontal" justify="center" align="center" 
        responsive={false}>
        <UserManager size="xlarge" colorIndex="neutral-2" />
        <UserPolice size="xlarge" colorIndex="neutral-1" />
        <UserWorker size="xlarge" colorIndex="neutral-2" />
      </Box>
      <Footer justify="center" align="center">
        <StartButton text="scroll down to continue"/>
      </Footer>
    </InfographicSection>
  );
}
