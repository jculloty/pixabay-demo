import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

import GridImage from './GridImage';
import LoadMore from '../LoadMore';
import Cache from '../Cache';

import withApi from '../ApiContext';

import './grid.css';

const MAX_IMAGE_HEIGHT = 250;

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    // the dom element needed to calculate the available width on resize
    this.domElement = React.createRef();
    this.state = {
      images: [], // a list of images scaled to fix the available space
      width: undefined,
    };
  }

  static propTypes = {
    data: PropTypes.object.isRequired, // the images returned by the API sizes will not fit the screen
  };

  static defaultProps = {
    data: {
      isCached: false,
      images: [],
      total: 0,
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return Grid.calculateImageSizes(nextProps.data.images, prevState.width);
  }

  // copies image details from the props image to the states's iamge
  // This is mainly done because we should not mutate the props
  static copyImageDetails(image, height) {
    return {
      id: image.id,
      user: image.user,
      tags: image.tags,
      height,
      width: Math.floor(image.medium.aspect * height) - 10,
      url: image.medium.url,
    };
  }

  static calculateImageSizes(propImages, width) {
    // the intial width will be undefined perhaps this should be set in the constructor
    width = width || 1000;
    const imageCount = propImages.length;
    const images = [];

    let aspect = 0;
    let rowStart = 0;
    for (let i = 0; i < imageCount; i++) {
      aspect += propImages[i].medium.aspect;
      const fitHeight = Math.floor(width / aspect);
      if (fitHeight <= MAX_IMAGE_HEIGHT) {
        for (let k = rowStart; k <= i; k++) {
          images.push(Grid.copyImageDetails(propImages[k], fitHeight));
        }

        rowStart = i + 1;
        aspect = 0;
      }
    }

    for (let i = rowStart; i < imageCount; i++) {
      images.push(Grid.copyImageDetails(propImages[i], MAX_IMAGE_HEIGHT));
    }

    return { images };
  }

  onResize = () => {
    const width = this.domElement.current.offsetWidth;
    const { images } = Grid.calculateImageSizes(this.props.data.images, width);
    this.setState({ width, images });
  }

  render() {
    const { images } = this.state;
    const { total, isCached } = this.props.data;
    const imageList = images.map((image) => <GridImage key={image.id} image={image} />);

    return (
      <Fragment>
        <Cache isCached={isCached} />
        <div className="grid" ref={this.domElement} >
          { imageList }
          <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
        </div>
        <span>{`${images.length} of ${total}`}</span>
        { (total > images.length) && <LoadMore /> }
      </Fragment>
    );
  }
}

export default withApi(Grid, ['data']);
