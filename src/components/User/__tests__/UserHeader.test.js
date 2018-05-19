import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import UserHeader from '../UserHeader';

const buildComponent = function(user = { name: 'John-Doe', total: 100, url: 'www.jd.com' }) {
  return (
    <MemoryRouter>
      <UserHeader user={user} />
    </MemoryRouter>
  );
};

describe('User: UserHeader', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(buildComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
