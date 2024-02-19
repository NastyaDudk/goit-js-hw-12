import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

export function showLoadMoreBtn(show) {
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
