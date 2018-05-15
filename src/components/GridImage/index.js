import React from 'react';
import PropTypes from 'prop-types';

function GridImage(props) {
  return (
    <div>
      <img src={props.details.previewURL} />
    </div>
  );
}

GridImage.propTypes = {
  details: PropTypes.object.isRequired,
};

export default GridImage;
