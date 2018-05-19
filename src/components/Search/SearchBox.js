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
    this.props.queryApi();
    if (/^\/images\/\d+$/.test(this.props.location.pathname)) {
      this.props.history.push('/');
    }
  }

  render() {
    const {
      type, category, order, orientation, safeSearch, editorsChoice, colors,
    } = this.props.searchOptions;
    const options = this.props.currentQueryOptions;

    return (
      <div>
        <form className="form-inline">
          <Input searchText={options.query} searchTextChanged={this.queryChanged} onEnter={this.search} />
          <Select value={options[type.name]} config={type} handleChange={this.formElementChanged} />
          <Select value={options[category.name]} config={category} handleChange={this.formElementChanged} />
          <Select value={options[order.name]} config={order} handleChange={this.formElementChanged} />
          <Select value={options[orientation.name]} config={orientation} handleChange={this.formElementChanged} />
          <Checkbox checked={options[safeSearch.name] === 'true'} config={safeSearch} handleChange={this.formElementChanged} />
          <Checkbox checked={options[editorsChoice.name] === 'true'} config={editorsChoice} handleChange={this.formElementChanged} />
          <button type="button" className="btn btn-light" onClick={this.search}><i className="fa fa-search"></i> Search</button>
        </form>
        <form>
          <MultiSelect value={options[colors.name]} config={colors} handleChange={this.formElementChanged} />
        </form>
      </div>
    );
  }
}

export default withRouter(withApi(SearchBox, [
  'queryApi',
  'setOption',
  'currentQueryOptions',
  'searchOptions',
]));
