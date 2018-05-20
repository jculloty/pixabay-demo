import React, { PureComponent } from 'react';

import Grid from '../Grid';
import withApi from '../API';

class HomePage extends PureComponent {
  componentDidMount() {
    if (!this.props.data.images.length) {
      this.props.queryApi();
    }
  }

  render() {
    return (
      <div>
        <Grid />
      </div>
    );
  }
}

export default withApi(HomePage, ['data', 'queryApi']);
