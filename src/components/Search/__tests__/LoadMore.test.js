import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'test-utils/setup-enzyme';
import LoadMore from '../LoadMore';

const buildComponent = function(props = {}) {
  props = {
    ...{
      value: 'testing',
      handleChange: () => {},
      handleEnter: () => {},
    },
    ...props,
  };

  return (<LoadMore {...props} />);
};

describe('Search: LoadMore', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Write more tests', () => {
    expect(true).toBe(false);
  });
});
