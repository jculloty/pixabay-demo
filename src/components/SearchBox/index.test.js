import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import SearchBox from '.';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function(queryApi = () => {}) {
  return <SearchBox queryApi={queryApi} />;
};

describe('SearchBox', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders sub components', () => {
    const wrapper = shallow(buildComponent());
    expect(wrapper.find('SearchInput')).toHaveLength(1);
    expect(wrapper.find('SearchInput')).toHaveLength(1);
    expect(wrapper.find('SearchTypes')).toHaveLength(1);
  });
});
