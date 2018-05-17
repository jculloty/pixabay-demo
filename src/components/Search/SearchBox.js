import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import SearchInput from './SearchInput';
import Select from './Select';

import { withApi } from '../ApiContext';

class SearchBox extends PureComponent {
  state = {
    query: '',
    category: '',
    type: 'all',
  };

  queryChanged = (value) => {
    this.setState({ query: value });
  }

  typeChanged = (event) => {
    this.setState({ type: event.target.value });
  }

  categoryChanged = (event) => {
    this.setState({ category: event.target.value });
  }

  search = () => {
    this.props.queryApi(this.state.query, this.state.type);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <SearchInput searchText={this.state.query} searchTextChanged={this.queryChanged} onEnter={this.search} />
        <Select value={this.state.type} options={this.props.types} handleChange={this.typeChanged} />
        <Select value={this.state.category} options={this.props.categories} handleChange={this.categoryChanged} allowBlank />
        <button onClick={this.search}><i className="fa fa-search"></i> Search</button>
      </div>
    );
  }
}

export default withRouter(withApi(SearchBox, ['queryApi', 'types', 'categories']));
