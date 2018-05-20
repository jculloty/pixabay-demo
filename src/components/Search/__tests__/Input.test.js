import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'test-utils/setup-enzyme';
import Input from '../Input';

const buildComponent = function(props = {}) {
  props = {
    ...{
      value: 'testing',
      handleChange: () => {},
      handleEnter: () => {},
    },
    ...props,
  };

  return (<Input {...props} />);
};

describe('Search: Input', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('focuses when mounted', () => {
    expect(true).toBe(false);
  });

  it('Typing triggeres the correct handler', () => {
    const mockChange = jest.fn();
    const wrapper = shallow(buildComponent({ handleChange: mockChange }));
    const expectedValue = 'Testing...';

    wrapper.find('input').simulate('change', { target: { value: expectedValue } });

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith(expectedValue);
  });

  it('Pressing enter triggeres the correct handler', () => {
    const mockChange = jest.fn();
    const wrapper = shallow(buildComponent({ handleEnter: mockChange }));

    wrapper.find('input').simulate('keypress', { key: 'Enter' });
    expect(mockChange).toHaveBeenCalledTimes(1);
  });
});
