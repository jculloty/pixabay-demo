import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

import GridImage from '../GridImage';
import LoadMore from '../LoadMore';

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
    images: PropTypes.array.isRequired, // the images returned by the API sizes will not fit the screen
    loadMore: PropTypes.func.isRequired,
  };

  static defaultProps = {
    images: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return Grid.calculateImageSizes(nextProps.images, prevState.width);
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
    const { images } = Grid.calculateImageSizes(this.props.images, width);
    this.setState({ width, images });
  }

  render() {
    const hasImages = this.state.images.length > 0;
    const images = this.state.images.map((image) => <GridImage key={image.id} image={image} />);
    return (
      <Fragment>
        <div className="grid" ref={this.domElement} >
          { images }
          <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
        </div>
        { hasImages && <LoadMore onClick={this.props.loadMore} /> }
      </Fragment>
    );
  }
}

export default Grid;
