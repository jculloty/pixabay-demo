import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import App from '.';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function() {
  return <App />;
};

describe('Grid', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders sub components', () => {
    const wrapper = shallow(buildComponent());
    expect(wrapper.find('SearchBox')).toHaveLength(1);
    expect(wrapper.find('Grid')).toHaveLength(1);
  });
});
