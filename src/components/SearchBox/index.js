import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import SearchInput from '../SearchInput';
import SearchTypes from '../SearchTypes';

class SearchBox extends PureComponent {
  state = {
    searchText: '',
    searchType: 'all',
  };

  searchTextChanged = (event) => {
    this.setState({ searchText: event.target.value });
  }

  searchTypeChanged = (event) => {
    this.setState({ searchType: event.target.value });
  }

  render() {
    return (
      <div>
        <SearchInput searchText={this.state.searchText} searchTextChanged={this.searchTextChanged} />
        <SearchTypes searchType={this.state.searchType} searchTypeChanged={this.searchTypeChanged} />
      </div>
    );
  }
}

export default SearchBox;
