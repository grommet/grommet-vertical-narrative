import React from 'react';

import InfographicSection from '../components/InfographicSection';
import StartButton from '../components/StartButton';
import Headline from 'grommet/components/Headline';
import Image from 'grommet/components/Image';
import Footer from 'grommet/components/Footer';

export default function Intro () {
  return (
    <InfographicSection className="infographic__section infographic__section--start" 
      colorIndex="light-1">
      <div className="infographic__section-header">
        <Headline size="large" strong={true}>Reshaping the Economy</Headline>
      </div> 
      <Headline size="small">As Millennials move into prime spending years, companies 
        must reinvent how they do business.</Headline>
      <Image full="horizontal" src="../img/start/intro-full.svg" />
      <Footer justify="center" align="center">
        <StartButton text="scroll down to continue"/>
      </Footer>
    </InfographicSection>
  );
}
