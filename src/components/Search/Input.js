import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleEnter: PropTypes.func.isRequired,
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
      this.props.handleEnter();
    }
  }

  handleChange = (event) => {
    this.props.handleChange(event.target.value);
  }

  render() {
    return (
      <input type="text"
        placeholder="Search images, vectors and photos"
        value={this.props.value}
        onChange={this.handleChange}
        ref={this.setTextInputRef}
        onKeyPress={this.handleKeyPress}
        className="form-control"
      />
    );
  }
}

export default SearchInput;
