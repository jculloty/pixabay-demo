import React from 'react';
import PropTypes from 'prop-types';

import './grid-image.css';

function GridImage(props) {
  const style = {
    height: `${props.image.height}px`,
    width: `${props.image.width}px`,
  };

  return (
    <div className="grid-image-container" style={style}>
      <img src={props.image.url} />
    </div>
  );
}

GridImage.propTypes = {
  image: PropTypes.object.isRequired,
};

export default GridImage;
