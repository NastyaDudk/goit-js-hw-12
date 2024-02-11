import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const form = document.querySelector('#form');
const gallery = document.querySelector('.gallery-el');
const spinner = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let limit = 15;
let page = 1;

const lightbox = new SimpleLightbox('.gallery-image', {
  captionsData: 'alt',
  captionDelay: 250,
});

function renderGalleryImg(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="gallery-item">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
            </a>
            <ul class="image-info">
              <li><p>Likes</p>${likes}</li>
              <li><p>Views</p>${views}</li>
              <li><p>Comments</p>${comments}</li>
              <li><p>Downloads</p>${downloads}</li>
            </ul>
          </div>
        `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

async function searchImages(query) {
  const apiKey = '42045393-d503a5a54b8da83761f9aabf4';

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: limit,
      },
    });

    const images = response.data.hits;

    if (images.length > 0) {
      renderGalleryImg(images);
      page += 1;
    } else {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, no images found for your search query. Please try again!',
      });
    }
  } catch (error) {
    console.log('Error:', error);
  } finally {
    spinner.classList.remove('loader_show');
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchQuery = document.querySelector('#searchQuery').value.trim();

  if (searchQuery) {
    clearGallery();
    spinnerToggleShow();
    searchImages(searchQuery);
  }
});

loadMoreBtn.addEventListener('click', () => {
  const searchQuery = document.querySelector('#searchQuery').value.trim();

  if (searchQuery) {
    spinnerToggleShow();
    searchImages(searchQuery);
  }
});

function spinnerToggleShow() {
  spinner.classList.toggle('loader_show');
}

function clearGallery() {
  gallery.innerHTML = '';
  page = 1;
}

window.addEventListener('DOMContentLoaded', () => {
  lightbox.refresh();
});
