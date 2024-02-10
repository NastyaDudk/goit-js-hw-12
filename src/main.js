import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Axios from 'axios';

document.addEventListener('DOMContentLoaded', async () => {
  const galleryEl = document.getElementById('gallery');
  const loadMoreBtn = document.getElementById('load-more');
  const loaderEl = document.querySelector('.loader');
  const perPage = 15;
  let page = 1;
  let currentQuery = '';

  const apiUrl = 'https://pixabay.com/api/';
  const apiKey = '42153847-0f7baac2d7b2e92d7ce6bbe8e';

  const lightbox = new SimpleLightbox('.gallery a');

  loadMoreBtn.addEventListener('click', searchImages);

  async function searchImages() {
    try {
      const query = '';
      const response = await Axios.get(apiUrl, {
        params: {
          key: apiKey,
          q: query,
          per_page: perPage,
          page: page,
        },
      });

      const data = response.data;

      if (data.hits.length > 0) {
        const images = data.hits;
        const append = page > 1;

        renderImages(images, append);
        page++;
      } else {
        throw new Error('No images found');
      }
    } catch (error) {
      console.log(error);
      renderError('Error: Failed to fetch images');
    }
  }

  function renderImages(array, append = false) {
    const markup = array
      .map(
        ({
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `
          <div class="gallery">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" title="${tags}" width="360" height="300" />
              <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${likes}</span></li>
                <li class="info-cards-elements">views<span>${views}</span></li>
                <li class="info-cards-elements">comments<span>${comments}</span></li>
                <li class="info-cards-elements">downloads<span>${downloads}</span></li>
              </ul>
            </a>
          </div>
        `;
        }
      )
      .join('');

    if (append) {
      galleryEl.insertAdjacentHTML('beforeend', markup);
    } else {
      galleryEl.innerHTML = markup;
    }

    lightbox.refresh();
  }

  function renderError(error) {
    const errorContainer = document.getElementById('error-container');
    const errorElement = document.createElement('p');
    errorElement.classList.add('error-message');
    errorElement.textContent = error;
    errorContainer.innerHTML = '';
    errorContainer.appendChild(errorElement);
    errorContainer.style.display = 'block';
  }

  searchImages();
});
