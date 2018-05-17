import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const ApiContext = createContext({
  queryApi: () => {},
  loadMore: () => {},
  findCachedImage: () => {},
  types: [],
  categories: [],
  data: {
    images: [],
    total: 0,
  },
});

export default ApiContext;

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
