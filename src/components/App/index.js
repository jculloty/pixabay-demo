import React, { Component } from 'react';

import SearchBox from '../SearchBox';
import Grid from '../Grid';

import PixabayAPI from '../api';
// this should be in index
const api = new PixabayAPI();

class App extends Component {
  state = {
    images: [],
  };

  queryApi = (text, type) => {
    api.query(text, type)
      .then((result) => {
        this.setState(result);
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
