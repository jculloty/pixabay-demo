import _ from 'lodash';

import Cache from './cache';

// TODO This should not be hard-coded
const API_KEY = '8506502-fd530cf53ce4c9ff2733ae363';

const PIXABAY_URL = 'https://pixabay.com/api/';

class PixabayAPI {
  cache = new Cache();
  currentQueryOptions = {
    page: 1,
    per_page: 100,
  };
  static searchOptions = {
    category: {
      default: undefined,
      options: [
        'fashion', 'nature', 'backgrounds', 'science', 'education', 'people',
        'feelings', 'religion', 'health', 'places', 'animals', 'industry',
        'food', 'computer', 'sports', 'transportation', 'travel', 'buildings',
        'business', 'music'],
      multiple: false,
      name: 'category',
    },
    colors: {
      default: undefined,
      options: [
        'grayscale', 'transparent', 'red', 'orange', 'yellow', 'green', 'turquoise',
        'blue', 'lilac', 'pink', 'white', 'gray', 'black', 'brown',
      ],
      multiple: true,
      name: 'colors',
    },
    editorsChoice: {
      default: 'false',
      options: ['false', 'true'],
      multiple: false,
      name: 'editorsChoice',
      queryParam: 'editors_choice',
    },
    minHeight: { // TODO add filter
      default: 0,
      name: 'minHeight',
      queryParam: 'min_height',
    },
    minWidth: { // TODO add filter
      default: 0,
      name: 'minWidth',
      queryParam: 'min_width',
    },
    order: {
      default: 'popular',
      options: ['popular', 'latest'],
      multiple: false,
      name: 'order',
    },
    orientation: {
      default: 'all',
      options: ['all', 'horizontal', 'vertical'],
      multiple: false,
      name: 'orientation',
    },
    query: {
      default: undefined,
      name: 'query',
      queryParam: 'q',
    },
    safeSearch: {
      default: 'false',
      options: ['false', 'true'],
      multiple: false,
      name: 'safeSearch',
      queryParam: 'safesearch',
    },
    type: {
      default: 'all',
      options: ['all', 'photo', 'illustration', 'vector'],
      multiple: false,
      name: 'type',
      queryParam: 'image_type',
    },
  };
  optionsChanged = false;

  /**
   * Protects the code against API changes by converting names
   * Performs some calcualtions that will be needed later e.g. aspect ratio
   */
  static processResponse(response) {
    const images = response.hits.map((image) => {
      const mappedImage = {
        id: image.id,
        tags: _.uniq(image.tags.split(',').map((tag) => tag.trim())),
        type: image.type,
        large: {
          width: image.imageWidth,
          height: image.imageHeight,
          url: image.largeImageURL,
          aspect: image.imageWidth / image.imageHeight,
        },
        medium: {
          width: image.webformatWidth,
          height: image.webformatHeight,
          url: image.webformatURL,
          aspect: image.webformatWidth / image.webformatHeight,
        },
        user: {
          id: image.user_id,
          name: image.user,
          url: image.userImageURL,
        },
        summary: {
          likes: image.likes,
          views: image.views,
          comments: image.comments,
          downloads: image.downloads,
          favorites: image.favorites,
          resolution: `${image.imageWidth}x${image.imageHeight}`,
        },
      };
      return mappedImage;
    });

    return {
      images,
      total: response.total,
    };
  }

  static _isValidOption(config, value) {
    let isValid = true;
    if (config.options) {
      const values = value.split(',');

      values.forEach((val) => {
        if (!config.options.includes(val)) {
          isValid = false;
        }
      });
    }
    return isValid;
  }

  setOption(name, value) {
    const config = PixabayAPI.searchOptions[name];
    if (config) {
      const queryParam = config.queryParam ? config.queryParam : name;
      if (PixabayAPI._isValidOption(config, value)) {
        if (config.default !== value) {
          this.currentQueryOptions[queryParam] = value;
        }
        else {
          delete this.currentQueryOptions[queryParam];
        }
        // reset the page setting - the load more button will not work when the paramaters have changed
        this.currentQueryOptions.page = 1;
        this.optionsChanged = true;
      }
    }
    else {
      // eslint-disable-next-line no-console
      console.error(`Invalid search option "${name}"`);
    }
  }

  getCurrentQueryOptions() {
    const options = {};
    Object.entries(PixabayAPI.searchOptions).forEach((config) => {
      const { name, queryParam, default: defaultValue } = config[1];
      const key = queryParam || name;
      options[name] = this.currentQueryOptions[key];
      // Need to sets undefined as some params (min_width) can be zero
      if (options[name] === undefined) {
        options[name] = (undefined !== defaultValue) ? defaultValue : '';
      }
    });

    return options;
  }

  static callAPI(params) {
    const url = new URL(PIXABAY_URL);
    url.searchParams.append('key', API_KEY);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error: response not ok');
      });
  }

  queryUserDetails(id, username) {
    const cached = this.cache.getUser(id);
    if (cached) {
      return Promise.resolve(cached);
    }

    const param = {
      q: `user:${username}`,
      page: 1,
      per_page: 3, // The min per_page
    };

    return PixabayAPI.callAPI(param).then((response) => {
      const user = {
        id,
        username,
        total: response.total,
        url: response.hits.length > 0
          ? response.hits[0].userImageURL
          : undefined,
      };

      this.cache.addUser(user);
      return user;
    });
  }

  clearCache() {
    this.cache.clearCache();
  }

  query() {
    let params = this.currentQueryOptions;

    if (params.q) {
      params.q = params.q.trim();
    }

    const cached = this.cache.getResult(params);
    if (cached) {
      return Promise.resolve(cached);
    }

    const url = new URL(PIXABAY_URL);
    url.searchParams.append('key', API_KEY);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    return PixabayAPI.callAPI(params).then(((json) => {
      json = PixabayAPI.processResponse(json);
      this.cache.addResult(params, json);

      // If we searched for a user without additional params add him/her to the cache
      // TODO ensure no other params were set
      if (params.q && /^user:([^\s]*)$/.test(params.q)) {
        if (json.images.length) {
          this.cache.addUser({
            ...json.images[0].user,
            total: json.total,
          });
        }
      }

      // Load more was clicked
      if (params.page > 1) {
        params = { ...params };
        while (--params.page > 0) {
          // TODO the cache might expire for previous values
          const previous = this.cache.getResult(params);
          json.images = previous.images.concat(json.images);
        }
      }

      return json;
    }));
  }

  loadMore() {
    if (this.optionsChanged) {
      return Promise.reject(new Error('Cannot load more with new options'));
    }

    this.currentQueryOptions.page++;
    return this.query();
  }

  findCachedImage(id) {
    return this.cache.getImage(id);
  }
}

export default PixabayAPI;
