import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    const { options: list, defaultOption } = this.props.config;
    const options = list.sort().map((item) => <option value={item} key={item}>{item}</option>);
    if (defaultOption === undefined) {
      options.unshift(<option value="" key="_balnk_"></option>);
    }

    return (
      <input type="checkbox" checked={this.props.checked} onChange={this.handleChange} />
    );
  }
}

export default Checkbox;
