import { lightbox, galleryList } from '../main';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function templateGallery(obj) {
  return `<li class="gallery-item">
            <a class="image-link" href="${obj.largeImageURL}">
            <img loading="lazy" class="image" src="${obj.webformatURL}" alt="${obj.tags}"/>
            </a>
            <ul class="list-container">
            <li class="item-container"><p><span class="title">Likes</span></br>${obj.likes}</p></li>
            <li class="item-container"><p><span class="title">Views</span></br>${obj.views}</p></li>
            <li class="item-container"><p><span class="title">Comments</span></br>${obj.comments}</p></li>
            <li class="item-container"><p><span class="title">Downloads</span></br>${obj.downloads}</p></li>
            </ul>
            </li>`;
}

function templateGalleries(arr) {
  return arr.map(templateGallery).join();
}

export function renderGallery(arr) {
  const markup = templateGalleries(arr);
  if (arr.length == 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
    return;
  } else {
    galleryList.insertAdjacentHTML('beforeend', markup);
  }

  lightbox.refresh();
}
