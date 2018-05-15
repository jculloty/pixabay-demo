// TODO This should not be hard-coded
const KEY = '8506502-fd530cf53ce4c9ff2733ae363';
const PIXABAY_URL = 'https://pixabay.com/api';

// TODO cache requests - check API rules
const queryAPI = function(text, type = 'all', page = 1, perPage = 100) {
  const url = new URL(PIXABAY_URL);
  const params = {
    key: KEY,
    q: text,
    image_type: type, // TODO sanitise type
    page,
    per_page: perPage,
  };
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  return fetch(url)
    .then((response) => response.json());
};

export default queryAPI;
