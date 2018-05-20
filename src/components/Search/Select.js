import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import Label from './Label';

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
    const { options: list, default: defaultOption, name } = this.props.config;
    const options = list.sort().map((item) => <option value={item} key={item}>{item}</option>);

    if (defaultOption === undefined) {
      options.unshift(<option value="" key="_balnk_"></option>);
    }

    return (
      <div className="form-group">
        <Label name={name} />
        <select id={name} value={this.props.value} onChange={this.handleChange} className="custom-select">
          {options}
        </select>
      </div>
    );
  }
}

export default Select;
