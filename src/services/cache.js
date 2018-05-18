/**
 *  Caches results from API calls
 **/

import _ from 'lodash';

class Cache {
  // 3600000 = 1 hour
  constructor(expires = 3600000, logger = console.log) {
    this.expires = expires; // how long to store cached results
    this.users = new Map(); // cached users details - total images
    this.results = new Map(); // cached search results
    this.images = {}; // images index by id used for the image view page
    this.logger = logger;
  }

  setExpires(expires) {
    this.expires = expires;
  }

  isExpired(item) {
    const now = new Date().getTime();
    return (item.cahedOn + this.expires) < now;
  }

  _log(message) {
    if (!this.logger) {
      return;
    }

    if (!message) {
      message = `images: ${_.size(this.images)}, results: ${this.results.size}, users: ${this.users.size}`;
    }

    if (typeof this.logger === 'function') {
      this.logger(message);
    }
  }

  static _convertKey(key) {
    if (typeof key === 'object') {
      key = Object.entries(key)
        .map((item) => item.join('='))
        .sort() // ensure the keys are always the same regardless of param order
        .join('&');
    }
    return key;
  }

  _addToCache(cache, key, data) {
    key = Cache._convertKey(key);
    cache.set(key, {
      data: { ...data, isCached: true }, // we need to change the object ref (otherwise react will not detect the prop change)
      cahedOn: new Date().getTime(),
    });
    this._log(`Caching ${key}`);
  }

  _queryCache(cache, params) {
    const key = Cache._convertKey(params);
    const cahcedData = cache.get(Cache._convertKey(params));
    if (cahcedData) {
      if (!this.isExpired(cahcedData)) {
        this._log(`Found item using ${key}`);
        return cahcedData.data;
      }
      this._log(`Expiring item ${key}`);
      // TODO delete images without refs
      cache.delete(params);
    }
    return null;
  }

  addUser(details) {
    this._addToCache(this.users, details.id, details);
    this._log();
  }

  getUser(id) {
    return this._queryCache(this.users, id);
  }

  addResult(params, result) {
    this._addToCache(this.results, params, result);
    const keyed = _.keyBy(result.images, 'id');
    this.images = { ...this.images, ...keyed };
    this._log();
  }

  getResult(params) {
    return this._queryCache(this.results, params);
  }

  getImage(id) {
    return this.images[id];
  }

  clearCache() {
    this.users = new Map();
    this.results = new Map();
    this.images = {};
    this._log('Clearing cache');
  }
}

export default Cache;
