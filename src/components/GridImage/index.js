import React from 'react';
import PropTypes from 'prop-types';

import './grid-image.css';

function GridImage(props) {
  const style = {
    height: `${props.image.height}px`,
    width: `${props.image.width}px`,
  };

  return (
    <div className="grid-image-container" style={style} title={props.image.tags}>
      <img src={props.image.url} />
      <span>
        {props.image.user}
      </span>
    </div>
  );
}

GridImage.propTypes = {
  image: PropTypes.object.isRequired,
};

export default GridImage;
