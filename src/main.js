import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// ===========================================
const searchForm = document.querySelector('.search-form');
export const galleryList = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.js-btn-load');
const preloader = document.querySelector('.loader');
// ===========================================

let input;
let currentPage = 1;

// =============================================

export const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

// ==============================================

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  input = e.target.elements.query.value.trim();
  galleryList.innerHTML = '';
  currentPage = 1;
  if (!input) {
    iziToast.show({
      message: 'Please complete the field!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
  }

  try {
    showLoader();
    const data = await getImages(input, currentPage);
    renderGallery(data.hits);
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Sorry, an error occurred while loading. Please try again!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
  }
  hideLoader();
  searchForm.reset();
});
// ===========================================

const showLoader = () => {
  preloader.classList.remove('hidden');
};
const hideLoader = () => {
  preloader.classList.add('hidden');
};
