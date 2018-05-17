import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Summary(props) {
  const summary = Object.keys(props.summary).map((key) => {
    return (
      <div key={key} className="summary-row">
        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
        <span>{props.summary[key]}</span>
      </div>
    );
  });

  return (
    <div className="image-summary">
      {summary}
    </div>
  );
}

export default Summary;
