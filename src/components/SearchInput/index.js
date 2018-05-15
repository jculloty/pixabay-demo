import React from 'react';
import PropTypes from 'prop-types';

function SearchInput(props) {
  return <input type="text" placeholder="Search images, vectors and photos" value={props.searchText} onChange={props.searchTextChanged} />;
}

SearchInput.propTypes = {
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
};

export default SearchInput;
