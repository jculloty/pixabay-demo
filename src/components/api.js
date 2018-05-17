import _ from 'lodash';

// TODO This should not be hard-coded
const KEY = '8506502-fd530cf53ce4c9ff2733ae363';

const PIXABAY_URL = 'https://pixabay.com/api/';
const DEFAULT_TYPE = 'all';

class PixabayAPI {
  lastParams = undefined;
  lastResult = undefined;
  static types = ['all', 'photo', 'illustration', 'vector'];
  static orientation = ['all', 'horizontal', 'vertical'];
  static order = ['popular', 'latest'];
  static categories = [
    'fashion', 'nature', 'backgrounds', 'science', 'education', 'people',
    'feelings', 'religion', 'health', 'places', 'animals', 'industry',
    'food', 'computer', 'sports', 'transportation', 'travel', 'buildings',
    'business', 'music'].sort();


  static validateType(type) {
    return PixabayAPI.types.includes(type);
  }

  static validateCategory(category) {
    return PixabayAPI.categories.includes(category);
  }

  static validateOption(parameter, value) {
    return PixabayAPI[parameter].includes(value);
  }

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
        popularity: {
          likes: image.likes,
          views: image.views,
          comments: image.comments,
          downloads: image.downloads,
          favorites: image.favorites,
        },
      };
      return mappedImage;
    });

    return {
      images,
      total: response.total,
    };
  }

  query(text, type = DEFAULT_TYPE, page = 1, perPage = 100, category) {
    // ensure the type is valid
    // I am not throwing any errors here as the type should aways be valid
    type = PixabayAPI.validateType(type) ? type : DEFAULT_TYPE;
    perPage = Math.max(perPage, 3);

    // filter out any undefined params
    const params = {
      key: KEY,
      image_type: type,
      page,
      per_page: perPage,
    };
    if (text) {
      params.q = text;
    }

    if (PixabayAPI.validateCategory(category)) {
      params.category = category;
    }

    // this.lastParams = params;
    // this.lastResult = PixabayAPI.processResponse(fakeResponse);
    // return Promise.resolve(this.lastResult);

    if (_.isEqual(this.lastParams, params)) {
      return Promise.resolve(this.lastResult);
    }

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
export const DefaultImageType = DEFAULT_TYPE;
export const ImageTypes = PixabayAPI.types;
export const ImageCategories = PixabayAPI.categories;
