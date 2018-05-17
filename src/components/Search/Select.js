import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const options = props.options.map((type) => <option value={type} key={type}>{type}</option>);
  if (props.allowBlank) {
    options.unshift(<option value="" key="_balnk_"></option>);
  }

  return (
    <select value={props.value} onChange={props.handleChange}>
      {options}
    </select>
  );
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  allowBlank: PropTypes.bool.isRequired,
};

Select.defaultProps = {
  options: [],
  allowBlank: false,
};

export default Select;
