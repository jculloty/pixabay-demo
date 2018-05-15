import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import GridIamge from '.';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function(details = { src: 'test' }) {
  return <GridIamge details={details} />;
};

describe('GridIamge', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
