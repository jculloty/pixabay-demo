import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Label from './Label';

class Checkbox extends PureComponent {
  static propTypes = {
    config: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  handleChange = (event) => {
    const { name } = this.props.config;
    this.props.handleChange(name, event.target.checked ? 'true' : 'false');
  }

  render() {
    const { name } = this.props.config;

    return (
      <div>
        <Label name={name} />
        <input type="checkbox" id={name} checked={this.props.checked} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Checkbox;
