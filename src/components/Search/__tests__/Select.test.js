import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'test-utils/setup-enzyme';
import Select from '../Select';

const buildComponent = function(props = {}) {
  props = {
    ...{
      config: {
        name: 'testing',
        options: ['one', 'two', 'three'],
        default: 'one',
      },
      value: 'two',
      handleChange: () => {},
    },
    ...props,
  };

  return (<Select {...props} />);
};

describe('Search: Select', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders blank options when there is no default', () => {
    const props = {
      config: {
        name: 'testing',
        options: ['one', 'two', 'three'],
        default: undefined,
      },
    };
    const tree = renderer
      .create(buildComponent(props))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Typing triggeres the correct handler', () => {
    const mockChange = jest.fn();
    const wrapper = shallow(buildComponent({ handleChange: mockChange }));
    const expectedValue = 'three';

    wrapper.find('select').simulate('change', { target: { value: expectedValue } });

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith('testing', expectedValue);
  });
});
