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
      <div className="cached-warning">
        <i className="fa fa-save"></i>
        Showing cached results
        <span onClick={this.clearCache} className="clickable">
          <i className="fa fa-refresh"></i>
          Refresh
        </span>
      </div>
    );
  }
}

export default withApi(Cache, ['clearCache']);
