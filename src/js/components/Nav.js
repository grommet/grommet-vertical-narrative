import React, { Component } from 'react';
import HPELogo from './HPELogo.js';
import classnames from 'classnames';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import Headline from 'grommet/components/Headline';
import Share from 'grommet/components/icons/base/Share';
import SocialShare from 'grommet/components/SocialShare';

import Progress from './Progress';

const CLASS_ROOT = 'section-nav';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);

    this.state = {
      active: true,
      started: false,
      layerActive: false
    };
  }

  _onClick() {
    this.setState({layerActive: true});
  }
  
  _onLayerClose() {
    this.setState({layerActive: false});
    // The Layer component causes our window to scroll to the top.
    // Grommet attempts to scroll to the item with Focus once
    // the Layer has been closed but the Nav is fixed to 
    // the top. This fix scrolls us back to where we 
    // activated the Layer.
    window.scrollTo(0,document.body.scrollHeight);
  }

  render() {
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--active`]: this.props.progress < 2 || this.props.progress >= 95
      }
    );
    
    let containerClasses = classnames(
      `${CLASS_ROOT}__container`,
      {
        [`${CLASS_ROOT}__container--started`]: this.props.progress > 2
      }
    );

    let icon = <Share className={`${CLASS_ROOT}__icon`} colorIndex={"dark-2"} />;

    let navCta = (this.props.progress >= 95)
      ? (<Button plain={true} label={'Share'} icon={icon} 
          onClick={this._onClick} />)
      : ('');

    let layer = (this.state.layerActive) ? (
      <div className="share-layer">
        <Layer onClose={this._onLayerClose} closer={true} flush={true} align={"center"}>
          <div className="share">
            <Headline size={"large"} strong={true}>
              Thanks for sharing, we're glad you enjoyed it.
            </Headline>
            <div className="share__icons">
              <SocialShare type="email"
              link="#"
              title="Grommet Infographic"
              text="HPE...." />
              <SocialShare type="twitter"
              link="#"
              text="@HPE..." />
              <SocialShare type="facebook"
              link="#" />
              <SocialShare type="linkedin"
              link="#"
              title="Grommet Infographic"
              text="HPE..." />
            </div>
          </div>
        </Layer>
      </div>
    ) : (null);

    return (
      <nav className={classes}>
      	<div className={containerClasses}>
          <HPELogo />
          <div className={`${CLASS_ROOT}__control`}>
            {navCta}
          </div>
        </div>
        <Progress progress={this.props.progress} />
        {layer}
      </nav>
    );
  }
};
