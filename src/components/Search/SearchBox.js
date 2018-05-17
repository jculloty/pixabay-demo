import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';
import MultiSelect from './MultiSelect';

import withApi from '../ApiContext';

class SearchBox extends PureComponent {
  static propTypes = {
    searchOptions: PropTypes.object.isRequired,
  };

  // TODO set initial values based on the defaults
  state = {
    query: '',
    category: '',
    order: '',
    orientation: '',
    type: '',
    editorsChoice: 'false',
    safeSearch: 'false',
    color: '',
  };

  formElementChanged = (property, value) => {
    this.setState({ [property]: value });
    this.props.setOption(property, value);
  }

  // TODO use formElementChanged
  queryChanged = (value) => {
    this.setState({ query: value });
    this.props.setOption('query', value);
  }

  search = () => {
    this.props.queryApi(this.state.query, this.state.type);
    this.props.history.push('/');
  }

  render() {
    const {
      type, category, order, orientation, safeSearch, editorsChoice, colors,
    } = this.props.searchOptions;

    return (
      <div>
        <Input searchText={this.state.query} searchTextChanged={this.queryChanged} onEnter={this.search} />
        <Select value={this.state.type} config={type} handleChange={this.formElementChanged} />
        <Select value={this.state.category} config={category} handleChange={this.formElementChanged} />
        <Select value={this.state.order} config={order} handleChange={this.formElementChanged} />
        <Select value={this.state.orientation} config={orientation} handleChange={this.formElementChanged} />
        <Checkbox checked={this.state.safeSearch === 'true'} config={safeSearch} handleChange={this.formElementChanged} />
        <Checkbox checked={this.state.editorsChoice === 'true'} config={editorsChoice} handleChange={this.formElementChanged} />
        <MultiSelect value={this.state.color} config={colors} handleChange={this.formElementChanged} />
        <button onClick={this.search}><i className="fa fa-search"></i> Search</button>
      </div>
    );
  }
}

export default withRouter(withApi(SearchBox, [
  'queryApi',
  'setOption',
  'searchOptions',
]));
