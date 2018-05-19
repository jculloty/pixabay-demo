import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import UserInfo from '../UserInfo';

const buildComponent = function(user = { name: 'John-Doe', total: 100, url: 'www.jd.com', id: 99 }) {
  return (
    <MemoryRouter>
      <UserInfo user={user} />
    </MemoryRouter>
  );
};

describe('User: UserInfo', () => {
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
