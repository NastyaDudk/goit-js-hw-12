import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const input = document.querySelector('.searchQuery');
const form = document.querySelector('.form');
const container = document.querySelector('.gallery-el');
const loaderContainer = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-btn');
const lightbox = new SimpleLightbox('.photo-card-link', {
  captionDelay: 250,
  captionsData: 'alt',
});

let page = 1;
const limit = 15;
let query = '';
loaderContainer.style.display = 'none';
let totalPages = 0;
form.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();
  page = 1;
  query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({
      position: 'topRight',
      message: 'Please enter a search query.',
    });
    return;
  }
  container.innerHTML = '';
  loaderContainer.style.display = 'block';
  searchImages(query)
    .then(data => renderImages(data))
    .catch(error =>
      iziToast.error({
        position: 'topRight',
        message: `Error: ${error}`,
      })
    )
    .finally(() => {
      e.target.reset();
      loaderContainer.style.display = 'none';
    });
}

async function onLoadMore() {
  loaderContainer.style.visibility = 'visible';
  const data = await searchImages(query);
  renderImages(data);
  loaderContainer.style.display = 'none';

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function searchImages(q) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42192602-d8808410d4367b6455b886704',
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: limit,
    },
  });
  page += 1;
  return response.data;
}

function imageTemplate(images) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = images;
  return `
    <div class="photo-card">
      <a class="photo-card-link" href="${largeImageURL}">
        <img class="photo-card__img" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info" style ="display:flex; gap:10px; margin-left:20px;">
        <p class="info-item">
          <b class="info-item-title">Likes:</b>
          <span class="info-item-value">${likes}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Views:</b>
          <span class="info-item-value">${views}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Comments:</b>
          <span class="info-item-value">${comments}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Downloads:</b>
          <span class="info-item-value">${downloads}</span>
        </p>
      </div>
    </div>
  `;
}

function renderImages({ hits, totalHits }) {
  totalPages = Math.ceil(totalHits / limit);
  if (hits.length > 0) {
    const markup = hits.map(imageTemplate).join('');
    container.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    showButton();
    if (page > totalPages) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } else {
    iziToast.error({
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
  hideButton();
}

function hideButton() {
  if (page > totalPages) {
    loadMoreButton.style.display = 'none';
  }
}

function showButton() {
  loadMoreButton.style.visibility = 'block';
  loadMoreButton.style.textAlign = 'center';
  if (page > totalPages) {
    return;
  }
}
