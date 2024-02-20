import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showloadMoreBtn(btnElement, show) {
  loadMoreBtn.style.display = show ? 'block' : 'none';
}

export function toastSuccess(message) {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
  });
}

export function toastError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

let lightbox = null;

export function initializeLightbox() {
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.gallery a');
}
