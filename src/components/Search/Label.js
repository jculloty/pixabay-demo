import React from 'react';
import PropTypes from 'prop-types';

import { camalCaseToDisplayedName } from 'services/utils';

const Label = function(props) {
  const { name } = props;
  return <label htmlFor={name}>{camalCaseToDisplayedName(name)}</label>;
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Label;
