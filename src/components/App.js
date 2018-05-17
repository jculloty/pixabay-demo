import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import 'font-awesome/css/font-awesome.css';

import SearchBox from './Search/SearchBox';
import Grid from './Grid';
import ImageView from './ImageView';

import { withApiProvider } from './ApiContext';

class App extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    console.error(error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return '<h1>Error</h1>';
    }

    return (
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
                  <Grid />
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
    );
  }
}

export default withApiProvider(App);
