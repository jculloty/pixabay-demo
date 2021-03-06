import React, { createContext, PureComponent } from 'react';
import PropTypes from 'prop-types';

import PixabayAPI from '../../services/api';

const api = new PixabayAPI();

const context = {
  queryApi: () => {},
  loadMore: () => {},
  findCachedImage: () => {},
  setOption: () => {},
  clearCache: () => {},
  queryUserDetails: () => {},
  currentQueryOptions: {},
  searchOptions: {},
  data: {
    images: [],
    total: 0,
  },
};

const ApiContext = createContext(context);

const withApiProvider = function(Component) {
  // eslint-disable-next-line react/display-name
  return class extends PureComponent {
    state = {
      queryApi: (text) => this.queryApi(text),
      clearCache: () => this.clearCache(),
      loadMore: () => this.loadMore(),
      queryUserDetails: (id, name) => this.queryUserDetails(id, name),
      findCachedImage: (id) => this.findCachedImage(id),
      setOption: (name, value) => this.setOption(name, value),
      searchOptions: PixabayAPI.searchOptions,
      order: PixabayAPI.order,
      orientation: PixabayAPI.orientation,
      types: PixabayAPI.types,
      data: {
        images: [],
        total: 0,
      },
    };

    static getDerivedStateFromProps() {
      return { currentQueryOptions: api.getCurrentQueryOptions() };
    }

    setOption = (name, value) => {
      api.setOption(name, value);
      this.setState({ currentQueryOptions: api.getCurrentQueryOptions() });
    }

    findCachedImage = (id) => api.findCachedImage(id)

    queryUserDetails = (id, name) => api.queryUserDetails(id, name)

    clearCache = () => {
      api.clearCache();
      this.queryApi();
    }

    queryApi = (text) => {
      if (text) {
        this.setOption('query', text);
      }
      api.query()
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

    render() {
      return (
        <ApiContext.Provider value={this.state}>
          <Component {...this.props} />
        </ApiContext.Provider>
      );
    }
  };
};

const withApi = function(Component, requiredProps) {
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
};

export default withApi;
export { withApiProvider };
