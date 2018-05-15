import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

import GridImage from '../GridImage';

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
    }
  }
  static propTypes = {
    images: PropTypes.array.isRequired, // the images returned by the API sizes will not fit the screen
  };

  static defaultProps = {
    images: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return Grid.calculateImageSizes(nextProps.images, prevState.width);
  }

  static calculateImageSizes(propImages, width) {
    // the intial width will be undefined perhaps this should be set in the constructor
    width = width || 1000;
    const imageCount = propImages.length;
    const images = [];

    let aspect = 0;
    let rowStart = 0;
    let row = 0;
    for (let i = 0; i < imageCount; i++) {
      aspect += propImages[i].medium.aspect;
      const fitHeight = Math.floor(width / aspect);
      if (fitHeight <= MAX_IMAGE_HEIGHT) {
        for (let k = rowStart; k <= i; k++) {
          images.push({
            id: propImages[k].id,
            height: fitHeight,
            width: Math.floor(propImages[k].medium.aspect * fitHeight) - 10,
            url: propImages[k].medium.url,
            row,
          });
        }

        row++;
        rowStart = i + 1;
        aspect = 0;
      }
    }

    for (let i = rowStart; i < imageCount; i++) {
      images.push({
        id: propImages[i].id,
        height: MAX_IMAGE_HEIGHT,
        width: Math.floor(propImages[i].medium.aspect * MAX_IMAGE_HEIGHT),
        url: propImages[i].medium.url,
      });
    }

    return { images };
  }

  onResize = () => {
    const width = this.domElement.current.offsetWidth;
    const { images } = Grid.calculateImageSizes(this.props.images, width);
    this.setState({ width, images });
  }

  render() {
    const images = this.state.images.map((image) => <GridImage key={image.id} image={image} />);
    return (
      <div className="grid" ref={this.domElement} >
        { images }
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
      </div>
    );
  }
}

export default Grid;
