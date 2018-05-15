import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SearchInput from '../SearchInput';
import SearchTypes from '../SearchTypes';

class SearchBox extends PureComponent {
  state = {
    searchText: '',
    searchType: 'all',
  };

  static propTypes = {
    queryApi: PropTypes.func.isRequired,
  };

  searchTextChanged = (event) => {
    this.setState({ searchText: event.target.value });
  }

  searchTypeChanged = (event) => {
    this.setState({ searchType: event.target.value });
  }

  search = () => {
    this.props.queryApi(this.state.searchText, this.state.searchType);
  }

  render() {
    return (
      <div>
        <SearchInput searchText={this.state.searchText} searchTextChanged={this.searchTextChanged} />
        <SearchTypes searchType={this.state.searchType} searchTypeChanged={this.searchTypeChanged} />
        <button onClick={this.search}>Search</button>
      </div>
    );
  }
}

export default SearchBox;
