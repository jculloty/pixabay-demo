import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'test-utils/setup-enzyme';
import Checkbox from '../Checkbox';

const buildComponent = function(props = {}) {
  props = {
    ...{
      config: { name: 'testing' },
      checked: true,
      handleChange: () => {},
    },
    ...props,
  };

  return (<Checkbox {...props} />);
};

describe('Search: Checkbox', () => {
  it('renders correctly', () => {
    let tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();

    tree = renderer
      .create(buildComponent({ checked: false }))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('checking/unchecking triggers the correct handler', () => {
    const mockChange = jest.fn();
    const wrapper = shallow(buildComponent({ handleChange: mockChange }));

    wrapper.find('input').simulate('change', { target: { checked: false } });

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith('testing', 'false');

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(mockChange).toHaveBeenCalledWith('testing', 'true');
  });
});
