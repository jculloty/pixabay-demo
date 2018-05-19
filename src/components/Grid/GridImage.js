import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function GridImage(props) {
  const style = {
    height: `${props.image.height}px`,
    width: `${props.image.width}px`,
  };

  const tags = props.image.tags.join(' ');

  return (
    <div className="grid-image-container" style={style} title={tags}>
      <Link to={`/images/${props.image.id}`}>
        <img src={props.image.url} alt="" />
        <span>
          {props.image.user.name}
        </span>
      </Link>
    </div>
  );
}

GridImage.propTypes = {
  image: PropTypes.object.isRequired,
};

export default GridImage;
