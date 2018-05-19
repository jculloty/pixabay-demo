import React from 'react';
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Grid from '.';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function(images = [{ id: 'src' }]) {
  return <Grid images={images} />;
};

describe('Grid', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct number of images', () => {
    const images = Array(10).fill(0).map((_, index) => ({ id: index }));
    const wrapper = render(buildComponent(images));
    expect(wrapper.find('img')).toHaveLength(10);
  });
});
