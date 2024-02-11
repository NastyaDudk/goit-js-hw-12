import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const formElem = document.querySelector('.form');
  const galleryEl = document.querySelector('.gallery-el');
  const loaderElem = document.querySelector('.loader');
  const loadMoreBtn = document.querySelector('.load-more');

  hideLoader();
  hideLoadMoreButton();

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

  formElem.addEventListener('submit', onSubmit);
  loadMoreBtn.addEventListener('click', onLoadMore);

  let searchValue = '';

  function onSubmit(e) {
    e.preventDefault();
    showLoader();

    searchValue = formElem.querySelector('.input').value;
    getPhotoBySearch(searchValue)
      .then(data => {
        renderImages(data.hits);
      })
      .catch(error => {
        renderError(error);
      })
      .finally(() => {
        hideLoader();
        showLoadMoreButton();
      });

    formElem.reset();
  }

  function onLoadMore() {
    showLoader();

    getPhotoBySearch(searchValue)
      .then(data => {
        renderImages(data.hits);
      })
      .catch(error => {
        renderError(error);
      })
      .finally(() => {
        hideLoader();
      });
  }

  function getPhotoBySearch(searchValue) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '42153847-0f7baac2d7b2e92d7ce6bbe8e';
    const Query = `?key=${KEY}&q=${searchValue}`;
    const params =
      '&image_type=photo&orientation=horizontal&safesearch=true&per_page=20';
    const url = BASE_URL + Query + params;

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.total === 0) {
          throw new Error('No images found');
        }
        return data;
      });
  }

  function renderImages(array) {
    let markup = '';
    array.forEach(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        markup += `
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
    );

    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }

  function renderError(error) {
    galleryEl.innerHTML = '';
    iziToast.show({
      message: `❌ "${error.message}". Please try again!`,
      color: 'red',
      position: 'topRight',
      maxWidth: '400px',
    });
  }

  function showLoader() {
    loaderElem.style.display = 'block';
  }

  function hideLoader() {
    loaderElem.style.display = 'none';
  }
});
