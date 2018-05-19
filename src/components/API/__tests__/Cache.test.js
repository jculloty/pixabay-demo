import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Cache from '../';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function(isCached = true) {
  return <Cache isCached={isCached} />;
};

describe('API: Cache', () => {
  it('Write more tests', () => {
    expect(true).toBe(false);
  });
});
