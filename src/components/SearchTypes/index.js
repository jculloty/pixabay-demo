import React from 'react';
import PropTypes from 'prop-types';

function SearchTypes(props) {
  const options = props.imageTypes.map((type) => <option value={type} key={type}>{type}</option>);
  return (
    <select type="text" value={props.searchType} onChange={props.searchTypeChanged}>
      {options}
    </select>
  );
}

SearchTypes.propTypes = {
  searchType: PropTypes.string.isRequired,
  imageTypes: PropTypes.array.isRequired,
  searchTypeChanged: PropTypes.func.isRequired,
};

SearchTypes.defaultProps = {
  searchType: 'all',
  imageTypes: ['all', 'photo', 'illustration', 'vector'],
};

export default SearchTypes;
