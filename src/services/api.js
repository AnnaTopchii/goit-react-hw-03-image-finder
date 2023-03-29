import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33639596-28aa77ea2f93f41ef738293ad';
const PARAM = 'image_type=photo&orientation=horizontal&per_page=12';

const fetchImages = ({ query = '', currentPage = 1 }) => {
  const url = `?key=${API_KEY}&q=${query}&${PARAM}&page=${currentPage}`;

  return axios.get(url).then(({ data }) => {
    const images = data.hits.map(
      ({ id, tags, largeImageURL, webformatURL }, idx) => ({
        id,
        tags,
        largeImageURL,
        webformatURL,
        isAnchor: !idx,
      })
    );

    return { images, totalImages: data.totalHits };
  });
};

const api = { fetchImages };

export default api;
