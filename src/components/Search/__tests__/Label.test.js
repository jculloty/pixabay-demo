import React from 'react';
import renderer from 'react-test-renderer';

import Label from '../Label';

const buildComponent = function(name = 'testingOneTwoThree') {
  return (<Label name={name} />);
};

describe('Search: Label', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
