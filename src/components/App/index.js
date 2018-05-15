import React, { Component } from 'react';

import SearchBox from '../SearchBox';
import Grid from '../Grid';

import api from '../api';

class App extends Component {
  state = {
    images: [],
  };

  queryApi = (text, type) => {
    api(text, type)
      .then((result) => {
        this.setState({ images: result.hits });
      });
  }

  render() {
    return (
      <div>
        <SearchBox queryApi={this.queryApi} />
        <Grid images={this.state.images} />
      </div>
    );
  }
}

export default App;
