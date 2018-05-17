import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class MultiSelect extends PureComponent {
  static propTypes = {
    config: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  }

  handleChange = (event) => {
    const { checked, name } = event.target;
    const list = this.state.value
      .split(',')
      .filter((item) => item !== name);

    if (checked) {
      list.push(name);
    }

    this.props.handleChange(this.props.config.name, list.join(','));
  }

  render() {
    const { options: list } = this.props.config;
    const options = list.sort().map((item) => (
      <span key={item}>
        <label>{item}</label>
        <input type="checkbox" name={item} onChange={this.handleChange} />
      </span>
    ));

    return (
      <div>
        {options}
      </div>
    );
  }
}

export default MultiSelect;
