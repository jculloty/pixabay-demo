import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Summary(props) {

  const popularity = Object.keys(props.popularity).map((key) => {
    return (
      <Fragment key={key}>
        <dt>{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
        <dd>{props.popularity[key]}</dd>
      </Fragment>
    );
  });

  return (
    <dl>
      {popularity}
    </dl>
  );
}

export default Summary;
