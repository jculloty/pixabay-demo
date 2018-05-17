import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import ReactResizeDetector from 'react-resize-detector';
import _ from 'lodash';

import ImageTag from '../ImageTag';
import UserInfo from '../UserInfo';
import Summary from './Summary';

import { withApi } from '../ApiContext';

class ImageView extends PureComponent {
  // the dom element needed to calculate the available width on resize
  domElement = React.createRef();
  innerDomElement = React.createRef();
  state = {
    image: undefined,
    user: undefined,
    tags: [],
    containerWidth: undefined,
  }

  static getDerivedStateFromProps(nextProps) {
    const { id } = nextProps.match.params;
    const image = nextProps.findCachedImage(id);
    return {
      image,
      tags: image ? _.uniq(image.tags.split(',').map((tag) => tag.trim())) : [],
    };
  }

  onResize = () => {
    const containerWidth = this.domElement.current.offsetWidth;
    const containerHeight = this.domElement.current.offsetHeight;
    const innerWidth = this.innerDomElement.current.offsetWidth;
    this.setState({ containerWidth, containerHeight, innerWidth, windowHeight: window.innerHeight });
  }

  render() {
    if (!this.state.image) {
      return <Redirect to='/' />;
    }

    const tags = this.state.tags.map((tag) => (
      <ImageTag tag={tag} key={tag} />
    ));

    const details = this.state.image;
    const image = details.large;

    let { width, height, aspect } = image;
    let maxWidth = this.state.containerWidth;
    if (maxWidth > 1000) {
      maxWidth = Math.floor(maxWidth * 0.7);
    }

    if (maxWidth < image.width) {
      width = maxWidth;
      height = Math.floor(maxWidth / aspect);
    }
    
    if (this.state.windowHeight < height) {
      height = this.state.windowHeight;
      width = Math.floor(aspect * height);
    }

    const style = {
      height: `${height}px`,
      width: `${width}px`,
    };

    return (
      <div className="image-view" ref={this.domElement} >
        <div className="single-image" style={style} ref={this.innerDomElement}>
          <img src={image.url} alt="" />
          <div className="tag-bar">
            {tags}
          </div>
          <span>{`${image.width}x${image.height}`}</span>
        </div>
        <div className="image-details">
          <UserInfo user={details.user} />
          <Summary popularity={details.popularity} />
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
      </div>
    );
  }
}

export default withRouter(withApi(ImageView));
