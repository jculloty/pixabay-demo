import React from 'react';
import PropTypes from 'prop-types';

import GridImage from '../GridImage';

function Grid(props) {
  const images = props.images.map((image) => <GridImage key={image.id} details={image} />);
  return (
    <div>
      { images }
    </div>
  );
}

Grid.propTypes = {
  images: PropTypes.array.isRequired,
};

Grid.defaultProps = {
  images: [],
};

export default Grid;
