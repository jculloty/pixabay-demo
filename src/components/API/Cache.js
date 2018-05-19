import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withApi from './ApiContext';

class Cache extends PureComponent {
  static propTypes = {
    isCached: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    isCached: false,
  };

  clearCache = () => { this.props.clearCache(); };

  render() {
    if (!this.props.isCached) {
      return null;
    }

    return (
      <p>
        <i className="fa fa-save"></i>
        Showing cached results
        <span onClick={this.clearCache}>
          <i className="fa fa-refresh"></i>
          Refresh
        </span>
      </p>
    );
  }
}

export default withApi(Cache, ['clearCache']);
