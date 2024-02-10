import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const formElem = document.querySelector('.form');
  const galleryEl = document.querySelector('.gallery-el');
  const loaderElem = document.querySelector('.loader');
  const loadMoreBtn = document.querySelector('.load-more-btn');
  let page = 1;
  let searchQuery = '';

  hideLoader();

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

  formElem.addEventListener('submit', onSubmit);
  loadMoreBtn.addEventListener('click', onLoadMore);

  function onSubmit(e) {
    e.preventDefault();
    showLoader();

    searchQuery = formElem.querySelector('.input').value;
    page = 1;
    getPhotos()
      .then(data => {
        renderImages(data.hits);
        toggleLoadMoreBtn(data.totalHits);
      })
      .catch(error => {
        renderError(error);
      })
      .finally(() => {
        hideLoader();
      });
  }

  async function onLoadMore() {
    showLoader();

    page++;
    getPhotos()
      .then(data => {
        const newImages = data.hits;
        renderImages(newImages, true);
        toggleLoadMoreBtn(data.totalHits);
      })
      .catch(error => {
        renderError(error);
      })
      .finally(() => {
        hideLoader();
      });
  }

  async function getPhotos() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '42153847-0f7baac2d7b2e92d7ce6bbe8e';
    const params = `?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;
    const url = BASE_URL + params;

    try {
      const response = await Axios.get(url);
      const data = response.data;

      if (data.total === 0) {
        throw new Error('No images found');
      }

      return data;
    } catch (error) {
      throw new Error('Failed to fetch images');
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
});
