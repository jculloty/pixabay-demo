import React, { createContext, PureComponent } from 'react';
import PropTypes from 'prop-types';

import PixabayAPI from './api';

const api = new PixabayAPI();

const context = {
  queryApi: () => {},
  loadMore: () => {},
  findCachedImage: () => {},
  types: [],
  categories: [],
  data: {
    images: [],
    total: 0,
  },
};

const ApiContext = createContext(context);

export default ApiContext;

export function withApiProvider(Component) {
  // eslint-disable-next-line react/display-name
  return class extends PureComponent {
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

    render() {
      return (
        <ApiContext.Provider value={this.state}>
          <Component {...this.props} />
        </ApiContext.Provider>
      );
    }
  };
}

export function withApi(Component, requiredProps) {
  return function ApiComponent(props) {
    return (
      <ApiContext.Consumer>
        {(contextProps) => {
          // only add the context props that the component needs
          if (requiredProps && Array.isArray(requiredProps)) {
            const selectedContext = {};
            requiredProps.forEach((prop) => {
              if (contextProps[prop]) {
                selectedContext[prop] = contextProps[prop];
              }
              // TODO report error if the prop is not in the context
            });
            contextProps = selectedContext;
          }

          // Add the context props to the components prop types
          const keys = Object.keys(contextProps);
          if (!Component.propTypes) {
            Component.propTypes = {};
          }
          keys.forEach((key) => {
            if (typeof contextProps[key] === 'function') {
              Component.propTypes[key] = PropTypes.func.isRequired;
            }
            else if (typeof contextProps[key] === 'object') {
              Component.propTypes[key] = PropTypes.object.isRequired;
            }
          });

          return <Component {...props} {...contextProps} />;
        }}
      </ApiContext.Consumer>
    );
  };
}
