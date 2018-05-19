import React from 'react';
import PropTypes from 'prop-types';

function Summary(props) {
  const summary = Object.keys(props.summary).map((key) => (
      <div key={key} className="summary-row">
        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
        <span>{props.summary[key]}</span>
      </div>
  ));

  return (
    <div className="image-summary">
      {summary}
    </div>
  );
}

Summary.propTypes = {
  summary: PropTypes.object.isRequired,
};

export default Summary;
