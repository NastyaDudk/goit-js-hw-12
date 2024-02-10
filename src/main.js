import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Axios from 'axios';

const galleryEl = document.getElementById('.gallery-el');
const loadMoreBtn = document.getElementById('.load-more');
const loaderEl = document.querySelector('.loader');

const PIXABAY_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '2208122-c38407f0c226da94dd817bfa0';
const DEBOUNCE_DELAY = 100;
const POST_PER_PAGE = 15;
let currentPage = 1;

searchForm.addEventListener(
  'input',
  debounce(event => {
    const searchValue = event.target.value;
    localStorage.setItem('search-term', searchValue.trim());
  }, DEBOUNCE_DELAY)
);

submitBtn.addEventListener('click', event => {
  event.preventDefault();
  const savedSearch = localStorage.getItem('search-term');
  if (savedSearch === null || savedSearch === '') {
    iziToast.iziToast.info('Please type something in the search input.');
    return;
  }
  currentPage = 1;
  fetchImages(savedSearch, currentPage);
});

const fetchImages = async (searchValue, currentPage) => {
  let galleryMarkup = '';
  let params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: POST_PER_PAGE,
  });

  try {
    const response = await axios.get(
      `${PIXABAY_URL}?${params}&page=${currentPage}`
    );

    const imagesArray = response.data.hits;

    if (searchValue === '') {
    }
    if (imagesArray.length === 0) {
      iziToast.iziToast.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    loadMoreBtn.style.display = 'block';
    footer.style.display = 'flex';

    galleryMarkup = imagesArray
      .map(image => {
        return `
        <div class="photo-card">
          <div class ="thumb">
            <img class="img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${image.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${image.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${image.downloads}
            </p>
          </div>
        </div>
      `;
      })
      .join('');

    gallery.innerHTML = galleryMarkup;
  } catch (error) {
    console.error(error);
  }
};

const fetchNewImages = async (searchValue, currentPage) => {
  let galleryMarkup = '';
  let params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: POST_PER_PAGE,
  });

  try {
    const response = await axios.get(
      `${PIXABAY_URL}?${params}&page=${currentPage}`
    );

    const imagesArray = response.data.hits;

    if (imagesArray.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    galleryMarkup = imagesArray
      .map(image => {
        return `
        <div class="photo-card">
          <div class ="thumb">
            <img class="img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${image.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${image.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${image.downloads}
            </p>
          </div>
        </div>
      `;
      })
      .join('');

    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  } catch (error) {
    console.error(error);
  }
};

loadMoreBtn.addEventListener('click', async () => {
  const searchValue = localStorage.getItem('search-term');
  currentPage++;
  let params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: POST_PER_PAGE,
  });
  try {
    const response = await axios.get(
      `${PIXABAY_URL}?${params}&page=${currentPage}`
    );

    const imagesArray = response.data.hits;
    const imagesPerPage = POST_PER_PAGE;

    const totalImages = response.data.totalHits;
    const maxPageNumber = totalImages / imagesPerPage;
    const maxPageNumberRoundUp = Math.ceil(maxPageNumber);
    console.log('currentPage: ', currentPage);
    console.log('maxPageNumber: ', maxPageNumber);
    console.log('maxPageNumberRoundUp: ', maxPageNumberRoundUp);

    if (currentPage === maxPageNumberRoundUp) {
      footer.style.display = 'none';
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    fetchNewImages(searchValue, currentPage);
  } catch (error) {
    console.error(error);
  }
});
morebut.style.display = 'none';
loadMoreBtn.style.display = 'none';
