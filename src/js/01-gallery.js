import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryRef = document.querySelector('.gallery');

galleryRef.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}"/>
    </a>
    `;
    })
    .join('');
}

new SimpleLightbox('.gallery a', {
  navText: ['←', '→'],
  overlayOpacity: 0.3,

  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
