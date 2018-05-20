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
      <div className="form-check form-check-inline">
        <input type="checkbox" id={name} checked={this.props.checked} onChange={this.handleChange} className="form-control" />
        <Label name={name} />
      </div>
    );
  }
}

export default Checkbox;
