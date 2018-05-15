import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import SearchTypes from '.';

import PixabayAPI, { DefaultImageType } from '../api';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function(type = DefaultImageType, imageTypes = PixabayAPI.imageTypes, onChange = () => {}) {
  return <SearchTypes searchType={type} imageTypes={imageTypes} searchTypeChanged={onChange} />;
};

describe('SearchType', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a select', () => {
    const wrapper = shallow(buildComponent());
    expect(wrapper.find('select').exists()).toEqual(true);
  });

  it('renders the correct number of options', () => {
    const wrapper = render(buildComponent());
    expect(wrapper.find('option')).toHaveLength(PixabayAPI.imageTypes.length);
  });

  it('selects the correct initial value', () => {
    const initialValue = PixabayAPI.imageTypes[1];
    const wrapper = shallow(buildComponent(initialValue));

    const { value } = wrapper.find('select').get(0).props;
    expect(value).toEqual(initialValue);
  });

  it('Changes trigger the correct method', () => {
    const textChangedMock = jest.fn();
    const newType = PixabayAPI.imageTypes[1];

    const wrapper = mount(buildComponent(DefaultImageType, PixabayAPI.imageTypes, textChangedMock));
    const select = wrapper.find('select');

    select.simulate('change', { target: { value: newType } });
    expect(textChangedMock.mock.calls.length).toBe(1);
  });
});
