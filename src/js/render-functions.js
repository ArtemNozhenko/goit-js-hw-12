import { galleryList } from '../main';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// =================================

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

// ==============================================

function templateGallery(obj) {
  return `<li class="gallery-item">
            <a class="image-link" href="${obj.largeImageURL}">
            <img loading="lazy" class="image" src="${obj.webformatURL}" alt="${obj.tags}"/>
            <ul class="list-container">
            <li class="item-container"><p class="title">Likes</p><p class="value">${obj.likes}</p></li>
            <li class="item-container"><p class="title">Views</p><p class="value">${obj.views}</p></li>
            <li class="item-container"><p class="title">Comments</p><p class="value">${obj.comments}</p></li>
            <li class="item-container"><p class="title">Downloads</p><p class="value">${obj.downloads}</p></li>
            </ul>
            </a>
            </li>`;
}

function templateGalleries(arr) {
  return arr.map(templateGallery).join('');
}

export function renderGallery(arr) {
  const markup = templateGalleries(arr);

  galleryList.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
