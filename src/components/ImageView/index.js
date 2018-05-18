import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import ReactResizeDetector from 'react-resize-detector';

import ImageTag from '../ImageTag';
import UserInfo from '../UserInfo';
import Summary from './Summary';

import withApi from '../ApiContext';

class ImageView extends PureComponent {
  // the dom element needed to calculate the available width on resize
  domElement = React.createRef();
  state = {
    image: undefined,
    user: undefined,
    tags: [],
    containerWidth: undefined,
  }

  static getDerivedStateFromProps(nextProps) {
    const { id } = nextProps.match.params;
    return { image: nextProps.findCachedImage(id) };
  }

  onResize = () => {
    this.setState({
      containerWidth: this.domElement.current.offsetWidth,
      windowHeight: window.innerHeight,
    });
  }

  render() {
    if (!this.state.image) {
      return <Redirect to='/' />;
    }

    const tags = this.state.image.tags.map((tag) => (
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

    const viewportHeight = Math.floor(this.state.windowHeight * 0.9);
    if (viewportHeight < height) {
      height = viewportHeight;
      width = Math.floor(aspect * height);
    }

    const style = {
      height: `${height}px`,
      width: `${width}px`,
    };

    return (
      <div className="image-view" ref={this.domElement} >
        <div className="single-image" style={style}>
          <img src={image.url} alt="" />
        </div>
        <div className="image-details">
          <div>
            <UserInfo user={details.user} />
          </div>
          <div>
            <Summary summary={details.summary} />
            <div className="tag-bar">
              {tags}
            </div>
          </div>
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
      </div>
    );
  }
}

export default withRouter(withApi(ImageView));
