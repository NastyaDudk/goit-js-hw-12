import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const formElem = document.querySelector('.form');
  const galleryEl = document.querySelector('.gallery-el');
  const loaderElem = document.querySelector('.loader');
  const loadMoreButton = document.querySelector('.load-more-button');

  hideLoader();

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

  HTMLFormElement.addEventListener('submit', eventt => {
    eventt.preventDefault();

    formElem.addEventListener('submit', onSubmit);
    loadMoreButton.addEventListener('click', onLoadMore);

    async function onSubmit(e) {
      e.preventDefault();
      showLoader();

      const value = formElem.querySelector('.input').value;

      try {
        const data = await getPhotoBySearch(value);
        renderImages(data.hits);
      } catch (error) {
        renderError(error);
      } finally {
        hideLoader();
      }

      formElem.reset();
    }

    async function getPhotoBySearch(searchValue, page = 1) {
      const KEY = '42153847-0f7baac2d7b2e92d7ce6bbe8e';
      const params = {
        key: KEY,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      };

      const response = await axios.get('https://pixabay.com/api/', { params });

      if (response.data.total === 0) {
        throw new Error('No images found');
      }

      return response.data;
    }

    function renderImages(array) {
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

      galleryEl.innerHTML += markup;
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
});
