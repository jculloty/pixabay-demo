import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import 'font-awesome/css/font-awesome.css';

import Header from './Header';
import HomePage from '../Home';
import ImagePage from '../Image';
import UserPage from '../User/UserPage';

import { withApiProvider } from '../API';


class App extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
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
            <Header />
            <section>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/images/:id' component={ImagePage} />
                <Route path='/user/:id' component={UserPage} />
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
