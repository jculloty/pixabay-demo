// TODO This should not be hard-coded
const KEY = '8506502-fd530cf53ce4c9ff2733ae363';

const PIXABAY_URL = 'https://pixabay.com/api/';
const DEFAULT_TYPE = 'all';

class PixabayAPI {
  cache = new Map();
  static imageTypes = ['all', 'photo', 'illustration', 'vector'];

  static validateImageType(type) {
    return PixabayAPI.imageTypes.includes(type);
  }

  /**
   * Protects the code against API changes by converting names
   * Performs some calcualtions that will be needed later e.g. aspect ratio
   */
  static processResponse(response) {
    const propertiesToCopy = [
      'comments',
      'downloads',
      'favorites',
      'id',
      'likes',
      'tags',
      'user',
      'views',
    ];

    const images = response.hits.map((image) => {
      const mapped = {}; // will be the new image object

      // copy over all the properties we want to keep
      propertiesToCopy.forEach((property) => { mapped[property] = image[property]; });

      // create an array of the different image sizes
      mapped.large = {
        width: image.imageWidth,
        height: image.imageHeight,
        url: image.largeImageURL,
        aspect: image.imageWidth / image.imageHeight,
      };
      mapped.medium = {
        width: image.webformatWidth,
        height: image.webformatHeight,
        url: image.webformatURL,
        aspect: image.webformatWidth / image.webformatHeight,
      };

      return mapped;
    });

    return {
      images,
      total: response.total,
    };
  }

  query(text, type = DEFAULT_TYPE, page = 1, perPage = 100) {
    return Promise.resolve(PixabayAPI.processResponse(fakeResponse));
    // ensure the type is valid
    // I am not throwing any errors here as the type should aways be valid
    type = PixabayAPI.validateImageType(type) ? type : DEFAULT_TYPE;
    perPage = Math.max(perPage, 3);

    const params = {
      key: KEY,
      q: text,
      image_type: type,
      page,
      per_page: perPage,
    };

    // Caching the requests as the API will return an error if we make identical rquests
    // [ERROR 429] Identical requests must be cached.
    // It appaers that this is being cleared after a few seconds; storing the previous request and a time might be better
    if (this.cache.has(params)) {
      return this.cache.get(params);
    }

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
        this.cache.set(params, json);
        return json;
      }));
  }
}

export default PixabayAPI;
export const DefaultImageType = DEFAULT_TYPE;
