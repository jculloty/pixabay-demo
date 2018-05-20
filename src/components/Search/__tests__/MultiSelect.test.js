import React from 'react';
import renderer from 'react-test-renderer';

import MultiSelect from '../MultiSelect';

const buildComponent = function(props = {}) {
  props = {
    ...{
      config: {
        name: 'testing',
        options: ['one', 'two', 'three'],
        default: 'one',
      },
      value: 'two,three',
      handleChange: () => {},
    },
    ...props,
  };

  return (<MultiSelect {...props} />);
};

describe('Search: MultiSelect', () => {
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
