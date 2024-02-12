import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

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

function toastSuccess(message) {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
  });
}

function toastError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

function toggleLoadMoreBtn(show) {
  loadMoreBtn.style.display = show ? 'none' : 'block';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

async function searchImages(query, page = 1) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
  const response = await fetch(url);
  const data = await response.json();

  return data.hits;
}

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  toggleLoadMoreBtn(false);

  const query = document.getElementById('query').value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Search images...',
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
      showLoadMoreBtn();
    } else {
      galleryContainer.innerHTML = '';
      toastError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoadMoreBtn();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    toastError('Failed to fetch images.');
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
        toastError('No more images to load');
        hideLoadMoreBtn();
      }
      smoothScrollToNextImages();
    } else {
      toastError('No more images to load');
      hideLoadMoreBtn();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    toastError('Failed to fetch additional images.');
  } finally {
    loaderContainer.style.display = 'none';
    loadingIndicator.style.display = 'none';
  }
});

function smoothScrollToNextImages() {
  const imageCardHeight = galleryContainer
    .querySelector('.image-card')
    .getBoundingClientRect().height;
  const scrollDistance = imageCardHeight * 2;
  window.scrollBy({
    top: scrollDistance,
    behavior: 'smooth',
  });
}

function displayImages(images) {
  galleryContainer.innerHTML = '';
  appendImages(images);
}

function appendImages(images) {
  const imageCards = images.map(image => {
    return `
            <div class="image-card">
                <a href="${image.largeImageURL}" data-lightbox="image-set" data-title="${image.tags}">
                    <img src="${image.webformatURL}" alt="${image.tags}">
                    <div class="info">Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}</div>
                </a>
            </div>
        `;
  });

  galleryContainer.innerHTML += imageCards.join('');
  currentImagesCount += images.length;
}

function initializeLightbox() {
  new SimpleLightbox('.gallery a').refresh();
}
