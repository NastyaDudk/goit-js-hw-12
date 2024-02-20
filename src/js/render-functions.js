import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function displayGallery(images) {
  const galleryContainer = document.querySelector('.gallery');

  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.url;
    galleryContainer.appendChild(imgElement);
  });
}

export function initializeLightbox() {
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.gallery a');
}

function toastError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}
