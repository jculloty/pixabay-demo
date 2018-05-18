import _ from 'lodash';

// TODO This should not be hard-coded
const KEY = '8506502-fd530cf53ce4c9ff2733ae363';

const PIXABAY_URL = 'https://pixabay.com/api/';
const DEFAULT_TYPE = 'all';

class PixabayAPI {
  currentQueryOptions = {
    key: KEY,
    image_type: DEFAULT_TYPE,
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
      required: true,
    },
  };
  lastParams = undefined;
  lastResult = undefined;

  /**
   * Protects the code against API changes by converting names
   * Performs some calcualtions that will be needed later e.g. aspect ratio
   */
  static processResponse(response) {
    const images = response.hits.map((image) => {
      const mappedImage = {
        id: image.id,
        tags: image.tags,
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

  setOption(name, value) {
    const config = PixabayAPI.searchOptions[name];
    if (config) {
      const queryParam = config.queryParam ? config.queryParam : name;
      // TODO validate search options
      this.currentQueryOptions[queryParam] = value;
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
      const key = queryParam || config.name;
      options[name] = this.currentQueryOptions[key]
      // Need to sets undefined as some params (min_width) can be zero
      if (options[name] === undefined) {
        options[name] = (undefined !== defaultValue) ? defaultValue : '';
      }
    });
    return options;
  }

  query() {
    const params = this.currentQueryOptions;
    // this.lastParams = params;
    // this.lastResult = PixabayAPI.processResponse(fakeResponse);
    // return Promise.resolve(this.lastResult);

    // if (_.isEqual(this.lastParams, params)) {
    //   return Promise.resolve(this.lastResult);
    // }

    this.lastResult = undefined;
    return this.fetch(params);
  }

  fetch(params) {
    this.lastParams = params;

    const url = new URL(PIXABAY_URL);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error: response not ok');
      })
      .then(((json) => {
        json = PixabayAPI.processResponse(json);
        if (this.lastResult) {
          json.images = this.lastResult.images.concat(json.images);
        }

        this.lastResult = json;
        return json;
      }));
  }

  loadMore() {
    if (!this.lastParams) {
      return Promise.reject(new Error('No previous query detected'));
    }

    this.lastParams.page++;
    return this.fetch(this.lastParams);
  }

  findCachedImage(id) {
    id = parseInt(id);
    // we do not have any cached images
    if (!this.lastResult || !this.lastResult.images) {
      // return undefined the same as when the id is not found by lodash's _.find() method
      return undefined;
    }

    return _.find(this.lastResult.images, (image) => image.id === id);
  }
}

export default PixabayAPI;
