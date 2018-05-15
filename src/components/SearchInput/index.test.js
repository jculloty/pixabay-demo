import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import SearchInput from '.';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function(text = '', onChange = () => {}) {
  return <SearchInput searchText={text} searchTextChanged={onChange} />;
};

describe('SearchInput', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an input', () => {
    const wrapper = shallow(buildComponent());
    expect(wrapper.find('input').exists()).toEqual(true);
  });

  it('searchText is passed to the rendered input', () => {
    const searchText = 'testing';
    const wrapper = shallow(buildComponent(searchText));
    expect(wrapper.find(`input[value="${searchText}"]`).exists()).toEqual(true);
  });

  it('Changes trigger the correct method', () => {
    const changeMock = jest.fn();
    const changedText = 'testing';

    const wrapper = mount(buildComponent('', changeMock));
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: changedText } });

    expect(changeMock.mock.calls.length).toBe(1);
  });
});
