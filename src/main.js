import {
  showLoadMoreBtn,
  toastSuccess,
  toastError,
} from './js/render-functions';
import { searchImages, displayImages, appendImages } from './js/pixabay-api';

const galleryContainer = document.querySelector('.gallery');
const loaderContainer = document.getElementById('loader');
const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');
const loadingIndicator = document.getElementById('loading-indicator');

const apiKey = '42175181-9f2e4ea0c75ffabf50c3ef9f9';
let currentPage = 1;
let currentQuery = '';
let currentImagesCount = 0;

if (!apiKey) {
  console.error(
    'API key is missing. Please provide the API key in the .env file.'
  );
}

async function scrollToNextGroup() {
  const cardHeight = galleryContainer
    .querySelector('.image-card')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: 2 * cardHeight,
    left: 0,
    behavior: 'smooth',
  });
}

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  showLoadMoreBtn(false);
  const query = document.getElementById('query').value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }
  try {
    loaderContainer.style.display = 'block';
    currentQuery = query;
    currentPage = 1;
    const images = await searchImages(query, currentPage);
    if (images.length > 0) {
      displayImages(images);
      toastSuccess(`Was found: ${images.length} images`);
      initializeLightbox();
      showLoadMoreBtn(true);
    } else {
      galleryContainer.innerHTML = '';
      toastError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      showLoadMoreBtn(false);
    }
  } finally {
    loaderContainer.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', async function () {
  try {
    loaderContainer.style.display = 'block';
    loadingIndicator.style.display = 'block';
    currentPage++;
    const images = await searchImages(currentQuery, currentPage);
    if (images.length > 0) {
      appendImages(images);
      toastSuccess(`Loaded additional ${images.length} images`);
      initializeLightbox();
      if (images.length < 15) {
        toastError(
          'We are sorry, but you have reached the end of search results.'
        );
        showLoadMoreBtn(false);
      }

      scrollToNextGroup();
    } else {
      toastError('No more images to load');
      showLoadMoreBtn(false);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    toastError('Failed to fetch additional images.');
  } finally {
    loaderContainer.style.display = 'none';
    loadingIndicator.style.display = 'none';
  }
});
