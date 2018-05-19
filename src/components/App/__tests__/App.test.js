import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function() {
  return <App />;
};

describe('App', () => {
  it('Write more tests', () => {
    expect(true).toBe(false);
  });
});
