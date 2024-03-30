import axios from 'axios';

export async function getImages(query, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const url = BASE_URL;
  const params = {
    key: '43018302-cdfd5f670eb7813c2554bba0c',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  };

  const response = await axios.get(url, { params });
  return response.data;
}
