import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';
import MultiSelect from './MultiSelect';

import withApi from '../API';

class SearchBox extends PureComponent {
  static propTypes = {
    searchOptions: PropTypes.object.isRequired,
  };

  formElementChanged = (property, value) => {
    this.setState({ [property]: value });
console.log(value);
    this.props.setOption(property, value);
  }

  // TODO use formElementChanged
  queryChanged = (value) => {
    this.setState({ query: value });
    this.props.setOption('query', value);
  }

  search = () => {
    this.props.queryApi();
    // we must leave the image page after a search
    let redirectToHome = /^\/images\/\d+$/.test(this.props.location.pathname);
    // we are on the user page, but are not including a user in the search
    if (!redirectToHome && /^\/user\/\d+/.test(this.props.location.pathname)) {
      redirectToHome = !(/user:([^\s]*)$/.test(this.props.currentQueryOptions.query));
    }

    if (redirectToHome) {
      this.props.history.push('/');
    }
  }

  render() {
    const {
      type, category, order, orientation, safeSearch, editorsChoice, colors,
    } = this.props.searchOptions;
    const options = this.props.currentQueryOptions;

    return (
      <div className="container-fluid">
        <div className="row">
          <span>
            <form className="form-inline">
              <Input value={options.query} handleChange={this.queryChanged} handleEnter={this.search} />
              <Select value={options[type.name]} config={type} handleChange={this.formElementChanged} />
              <Select value={options[category.name]} config={category} handleChange={this.formElementChanged} />
              <Select value={options[order.name]} config={order} handleChange={this.formElementChanged} />
              <Select value={options[orientation.name]} config={orientation} handleChange={this.formElementChanged} />
              <Checkbox checked={options[safeSearch.name] === 'true'} config={safeSearch} handleChange={this.formElementChanged} />
              <Checkbox checked={options[editorsChoice.name] === 'true'} config={editorsChoice} handleChange={this.formElementChanged} />
            </form>
            <form className="form">
              <MultiSelect value={options[colors.name]} config={colors} handleChange={this.formElementChanged} />
            </form>
          </span>
          <span className="my-auto">
            <button type="button" className="btn btn-light" onClick={this.search}><i className="fa fa-search"></i> Search</button>
          </span>
        </div>
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
