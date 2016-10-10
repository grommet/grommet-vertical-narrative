import React, { Component } from 'react';

import scrollToTop from '../utils/scroll';

import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Box from 'grommet/components/Box';

import InfographicSection from './InfographicSection';
import Source from './Source';
import ChartHeader from './ChartHeader';
import Title1 from '../sections/Title1';
import Title2 from '../sections/Title2';
import Title3 from '../sections/Title3';
import Intro from '../sections/Intro';
import LargerCohert from '../sections/LargerCohert';
import FirstDigitalNatives from '../sections/FirstDigitalNatives';
import SocialAndConnected from '../sections/SocialAndConnected';
import SearchingForValue from '../sections/SearchingForValue';
import LessMoneyToSpend from '../sections/LessMoneyToSpend';
import BeyondTheBrand from '../sections/BeyondTheBrand';
import ClickingToBuy from '../sections/ClickingToBuy';
import RenterGeneration from '../sections/RenterGeneration';
import ChangingOwnership from '../sections/ChangingOwnership';
import End from '../sections/End';

export default class Content extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.layout !== nextProps.layout) return true;
    else return false;
  }

  _onEndClick() {
    scrollToTop.scroll(200);
  }

  render() {
    return (
      <div>
      <Intro />
        <Title1 />

        <InfographicSection className="infographic__section infographic__section--1" 
          colorIndex="light-1">
          <Tabs responsive={false} justify="center">

            <Tab title="Larger Cohort">
              <Box className="infographic__slide" full="horizontal">
                <ChartHeader text="The Millennial generation, age 15-35 in 2015, is the largest
                  in US history." />
                <LargerCohert layout={this.props.layout} />
                <Source text="Prosper Insights & Analytics for the Media Behavior
                 and Influence Study" />
              </Box>
            </Tab>

            <Tab title="First Digital Natives">
              <Box className="infographic__slide" full="horizontal">
                <ChartHeader text="Millennials turn to online activities for fun and 
                  entertainment." />
                <FirstDigitalNatives layout={this.props.layout} />
                <Source text="Prosper Insights & Analytics for the Media Behavior
                  and Influence Study" />
              </Box>
            </Tab>

            <Tab title="Social and Connected">
              <Box className="infographic__slide">
                <ChartHeader text="More Millennials use technology to communicate about 
                  products services and brands." />
                <SocialAndConnected />
                <Source text="Prosper Insights & Analytics for the Media Behavior
                  and Influence Study" />
              </Box>
            </Tab>

            <Tab title="Less Money to Spend">
              <Box className="infographic__slide">
                <ChartHeader text="Mean income for 15–24 year olds as a % of total population" />
                <LessMoneyToSpend layout={this.props.layout} />
                <Source text="Bureau of Labor Statistics" />
              </Box>
            </Tab>
          </Tabs>
        </InfographicSection>

        <Title2 />

        <InfographicSection className="infographic__section infographic__section--2" 
          colorIndex="light-2">
          <Tabs responsive={false} justify="center">

            <Tab title="Beyond the Brand">
              <Box className="infographic__slide">
                <ChartHeader text={`“When I shop, I always try to buy branded products.”`} />
                <BeyondTheBrand layout={this.props.layout} />
                <Source text="US Census Bureau" />
              </Box>
            </Tab>

            <Tab title="Clicking to Buy">
              <Box className="infographic__slide">
                <ChartHeader text="% of respondents who purchased something online in the 
                  last 12 months." />
                <ClickingToBuy layout={this.props.layout} />
                <Source text="Office for National Statistics, United Kingdom" />
              </Box>
            </Tab>

            <Tab title="Searching for Value">
              <Box className="infographic__slide">
                <ChartHeader text="Price and Quality create brand loyalty among Millennials 
                  more than other generations." />
                <SearchingForValue layout={this.props.layout} />
                <Source text="AIMIA Inc. Born this Way: US 
                  Millennial Loyalty Survey ©2012" />
              </Box>
            </Tab>
          </Tabs>
        </InfographicSection>

        <Title3 />

        <InfographicSection className="infographic__section infographic__section--3" 
          colorIndex="light-1">
          <Tabs responsive={false} justify="center">
            <Tab title="The Renter Generation">
              <Box className="infographic__slide">
                <ChartHeader text="A growing number of older millennials are choosing to 
                  rent, not buy." />
                <RenterGeneration />
                <Source text="US Census Bureau" />
              </Box>
            </Tab>
            <Tab title="Changing Ownership">
              <Box className="infographic__slide">
                <ChartHeader text="Renters as a % of total population, 25-34 years" />
                <ChangingOwnership layout={this.props.layout} />
                <Source text="Organization for Economic Co-operation and Development" />
              </Box>
            </Tab>
          </Tabs>
        </InfographicSection>

        <End onEndClick={this._onEndClick} />
      </div>
    );
  }
};
