import React, { Component } from 'react';

import SearchBox from '../SearchBox';

import api from '../api';

class App extends Component {
  queryApi = (text, type) => {
    api(text, type)
      .then((result) => {
        console.log(result);
      });
  }

  render() {
    return (
      <div>
        <SearchBox queryApi={this.queryApi} />
      </div>
    );
  }
}

export default App;
