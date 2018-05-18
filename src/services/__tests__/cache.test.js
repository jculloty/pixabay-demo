import _ from 'lodash';
import Cache from '../cache';

const createCache = function(expires) {
  return new Cache(expires, false);
};

describe('Cache', () => {
  it('Users can be retrived after adding', () => {
    const cache = createCache();
    const id = 1;
    const expected = { id, name: 'one' };

    cache.addUser(expected);

    const actual = cache.getUser(id);
    expect(actual).toEqual({ ...expected, isCached: true });
  });

  it('The cache to store the correct number of users', () => {
    const cache = createCache();

    cache.addUser({ id: 1, name: 'one' });
    cache.addUser({ id: 2, name: 'two' });
    cache.addUser({ id: 3, name: 'three' });

    expect(cache.users.size).toBe(3);
  });

  it('Results can be retrived after adding', () => {
    const cache = createCache();
    const params = { a: 'a', b: 'b' };
    const expected = { images: [{ id: 1 }] };

    cache.addResult(params, expected);

    const actual = cache.getResult(params);
    expect(actual).toEqual({ ...expected, isCached: true });
  });

  it('Images are added with results', () => {
    const cache = createCache();
    const params = { a: 'a', b: 'b' };
    const expected = {
      images: [
        { id: 1, url: 'one' },
        { id: 2, url: 'two' },
      ],
    };

    cache.addResult(params, expected);

    const actual = cache.getImage(1);
    expect(actual).toEqual(expected.images[0]);
    expect(_.size(cache.images)).toEqual(2);
  });

  it('Expried results not to be returned', () => {
    const cache = createCache();
    const user = { id: 1, name: 'one' };

    cache.addUser(user);
    cache.setExpires(100);
    setTimeout(() => {
      const acutal = cache.getUser(1);
      expect(acutal).toBeNull();
      expect(cache.users.size).toBe(3);
    }, 150);
  });

  it('Clear cache to empty the cache', () => {
    const cache = createCache();
    const params = { a: 'a', b: 'b' };
    const results = {
      images: [
        { id: 1, url: 'one' },
        { id: 2, url: 'two' },
      ],
    };

    cache.addResult(params, results);
    cache.addUser({ id: 1, name: 'one' });
    cache.clearCache();

    expect(_.size(cache.images)).toEqual(0);
    expect(cache.users.size).toBe(0);
    expect(cache.results.size).toBe(0);
  });
});
