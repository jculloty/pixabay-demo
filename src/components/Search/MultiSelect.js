import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Label from './Label';

class MultiSelect extends PureComponent {
  static propTypes = {
    config: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  state = {
    value: [],
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      value: nextProps.value ? nextProps.value.split(',') : [],
    };
  }

  handleChange = (event) => {
    const { checked, name } = event.target;
    const list = this.state.value.filter((item) => item !== name);

    if (checked) {
      list.push(name);
    }

    this.props.handleChange(this.props.config.name, list.join(','));
  }

  render() {
    const { options: list, name } = this.props.config;
    const checked = this.props.value.split(',');

    const options = list.sort().map((item) => (
      <div className="form-check form-check-inline" key={item}>
        <Label name={item} />
        <input id={name} type="checkbox" checked={checked.includes(item)} name={item} onChange={this.handleChange} className="form-control" />
      </div>
    ));

    return (
      <div>
        {options}
      </div>
    );
  }
}

export default MultiSelect;
