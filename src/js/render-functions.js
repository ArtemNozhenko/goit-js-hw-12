import { lightbox, galleryList } from '../main';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderGallery(arr) {
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
    const markup = arr
      .map(photo => {
        return `<li class="gallery-item">
            <a class="image-link" href="${photo.largeImageURL}">
            <img class="image" src="${photo.webformatURL}" alt="${photo.tags}"/>
            </a>
            <ul class="list-container">
            <li class="item-container"><p><span class="title">Likes</span></br>${photo.likes}</p></li>
            <li class="item-container"><p><span class="title">Views</span></br>${photo.views}</p></li>
            <li class="item-container"><p><span class="title">Comments</span></br>${photo.comments}</p></li>
            <li class="item-container"><p><span class="title">Downloads</span></br>${photo.downloads}</p></li>
            </ul>
            </li>`;
      })
      .join('');
    galleryList.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
  }
}
