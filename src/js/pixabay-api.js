import {
  toastSuccess,
  toastError,
  searchImages,
  initializeLightbox,
} from './render-functions';

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

export async function searchImages(query, page = 1) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
  try {
    const response = await axios.get(url);
    totalHits = response.data.totalHits;
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    toastError('Failed to fetch images.');
    throw error;
  }
}

export function initializeLightbox() {
  new SimpleLightbox('.gallery a').refresh();
}
