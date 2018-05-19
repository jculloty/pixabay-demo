import React from 'react';
import PropTypes, { shape } from 'prop-types';
import Enzyme, { shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import { MemoryRouter, BrowserRouter } from 'react-router-dom';

import Tag from '../Tag';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = function(tag = 'testing') {
  return (
    <MemoryRouter>
      <Tag tag={tag} />
    </MemoryRouter>
  );
};

const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
});

function mountWrap(node) {
  return mount(node, createContext());
}

describe('Image: Tag', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Write more tests', () => {
    expect(true).toBe(false);
  });
});
