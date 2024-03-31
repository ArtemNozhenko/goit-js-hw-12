import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ===========================================
const searchForm = document.querySelector('.search-form');
export const galleryList = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.js-btn-load');
const preloader = document.querySelector('.loader');
// ===========================================

let input;
let currentPage = 1;
let maxPage = 0;
const pageSize = 15;

// =============================================

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
    return;
  }

  try {
    showLoader();
    const data = await getImages(input, currentPage);
    maxPage = Math.ceil(data.totalHits / pageSize);
    renderGallery(data.hits);
  } catch (error) {
    iziToast.error({
      message: 'Sorry, an error occurred while loading. Please try again!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
  }
  hideLoader();
  checkButton();
  searchForm.reset();
});

btnLoadMore.addEventListener('click', async e => {
  try {
    showLoader();
    currentPage += 1;
    const data = await getImages(input, currentPage);
    renderGallery(data.hits);
  } catch (error) {
    iziToast.error({
      message: 'Sorry, an error occurred while loading. Please try again!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
  }

  scroll();
  checkButton();
  hideLoader();
});
// ===========================================

function checkButton() {
  if (currentPage >= maxPage) {
    hideLoadMore();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMore();
  }
}

function showLoadMore() {
  btnLoadMore.classList.remove('hidden');
}
function hideLoadMore() {
  btnLoadMore.classList.add('hidden');
}

function showLoader() {
  preloader.classList.remove('hidden');
}
function hideLoader() {
  preloader.classList.add('hidden');
}

function scroll() {
  const height = galleryList.firstChild.getBoundingClientRect().height;
  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
