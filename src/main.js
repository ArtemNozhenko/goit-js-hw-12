import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const input = searchInput.value.trim();
export const galleryList = document.querySelector('.gallery');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const preloader = document.querySelector('.loader');
preloader.style.display = 'none';

export const showLoader = () => {
  preloader.style.display = 'flex';
};
const hideLoader = () => {
  preloader.style.display = 'none';
};

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  galleryList.innerHTML = '';
  const input = searchInput.value.trim();
  if (input !== '') {
    showLoader();
    try {
      const data = await getImages(input);
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
  } else {
    iziToast.show({
      message: 'Please complete the field!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
  }
});
