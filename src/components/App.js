import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import 'font-awesome/css/font-awesome.css';

import SearchBox from './Search/SearchBox';
import Grid from './Grid';
import ImageView from './ImageView';

import PixabayAPI from './api';
import ApiContext from './ApiContext';

const api = new PixabayAPI();

class App extends Component {
  state = {
    queryApi: (text, type) => this.queryApi(text, type),
    loadMore: () => this.loadMore(),
    findCachedImage: (id) => this.findCachedImage(id),
    types: PixabayAPI.types,
    categories: PixabayAPI.categories,
    data: {
      images: [],
      total: 0,
    },
    hasError: false,
  };

  findCachedImage = (id) => api.findCachedImage(id)

  queryApi = (text, type) => {
    api.query(text, type)
      .then((data) => {
        this.setState({ data });
        return data;
      });
  }

  loadMore = () => {
    api.loadMore()
      .then((data) => {
        this.setState({ data });
        return data;
      });
  }

  componentDidMount() {
    if (!this.state.data.images.length) {
      this.queryApi();
    }
  }

  componentDidCatch(error, info) {
    console.error(error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return '<h1>Error</h1>';
    }

    return (
      <ApiContext.Provider value={this.state}>
      <BrowserRouter>
          <div className="content">
            <header className="sticky-header">
              <Link to="/">
                <span>Pixabay</span>
              </Link>
              <SearchBox />
            </header>
            <section>
              <Switch>
                <Route exact path='/' >
                  <Grid data={this.state.data} />
                </Route>
                <Route path='/images/:id'>
                  <ImageView />
                </Route>
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </section>
            <footer>
              <div>
                <p>&#169; 2018 Pixabay</p>
              </div>
            </footer>
          </div>
      </BrowserRouter>
      </ApiContext.Provider>
    );
  }
}

export default App;
