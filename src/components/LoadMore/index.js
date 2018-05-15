import React from 'react';
import PropTypes from 'prop-types';

import './load-more.css';

function LoadMore(props) {
  return (
    <div className="load-more-button">
      <button onClick={props.onClick}>
        Load more images...
      </button>
    </div>
  );
}

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMore;
