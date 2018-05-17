import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends PureComponent {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    searchTextChanged: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
  };
  domElement = React.createRef();

  componentDidMount() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  setTextInputRef = (element) => {
    this.textInput = element;
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.onEnter();
    }
  }

  handleChange = (event) => {
    this.props.searchTextChanged(event.target.value);
  }

  render() {
    return <input type="text"
      placeholder="Search images, vectors and photos"
      value={this.props.searchText}
      onChange={this.handleChange}
      ref={this.setTextInputRef}
      onKeyPress={this.handleKeyPress}
    />;
  }
}

export default SearchInput;
