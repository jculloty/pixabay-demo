import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Select extends PureComponent {
  static propTypes = {
    config: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  handleChange = (event) => {
    const { name } = this.props.config;
    this.props.handleChange(name, event.target.value);
  }

  render() {
    const { options: list, defaultOption } = this.props.config;
    const options = list.sort().map((item) => <option value={item} key={item}>{item}</option>);
    if (defaultOption === undefined) {
      options.unshift(<option value="" key="_balnk_"></option>);
    }

    return (
      <select value={this.props.value} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}

export default Select;
