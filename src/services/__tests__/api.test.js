import _ from 'lodash';

import Cache from '../cache';
import PixabayAPI from '../api';

jest.mock('../cache');

const createAPI = function() {
  return new PixabayAPI();
};

beforeEach(() => {
  Cache.mockClear();
});

describe('API', () => {
  it('A cache object is created for the API', () => {
    createAPI();
    expect(Cache).toHaveBeenCalledTimes(1);
  });

  it('Can set/get search options', () => {
    const api = createAPI();

    const options = [
      ['category', 'travel'],
      ['colors', 'yellow'],
      ['editorsChoice', 'true'],
      ['order', 'latest'],
      ['orientation', 'all'],
      ['query', 'testing'],
      ['safeSearch', 'true'],
      ['type', 'illustration'],
    ];

    options.forEach(([param, value]) => {
      api.setOption(param, value);
      const current = api.getCurrentQueryOptions();
      expect(current[param]).toEqual(value);
    });
  });

  it('Invalid search options are ignored', () => {
    const api = createAPI();

    api.setOption('category', 'invalid');
    expect(api.currentQueryOptions.category).toBeUndefined();
  });

  it('Default options are returned when an option is not set', () => {
    expect(false).toBe(true);
  });

  it('findCachedImage() is proxied to Cache', () => {
    const api = createAPI();
    api.findCachedImage(99);
    const instance = Cache.mock.instances[0];
    const method = instance.getImage;
    expect(method).toHaveBeenCalledTimes(1);
    expect(method).toHaveBeenCalledWith(99);
  });

  it('clearCache() is proxied to Cache', () => {
    const api = createAPI();
    api.clearCache();
    const instance = Cache.mock.instances[0];
    const method = instance.clearCache;
    expect(method).toHaveBeenCalledTimes(1);
  });

  it('Write more tests', () => {
    expect(true).toBe(false);
  });
});
