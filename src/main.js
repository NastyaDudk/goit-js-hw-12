import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const params = {
  formSearch: document.querySelector('.form'),
  imageList: document.querySelector('.gallery'),
  preload: document.querySelector('.loader'),
  nextBtn: document.querySelector('.load-more-btn'),
};

const hiddenClass = 'is-hidden';
let page = 0;
let searchValue = '';

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

params.formSearch.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.input.value.trim();
  const form = event.currentTarget;

  searchValue = searchQuery;
  page = 1;

  params.nextBtn.classList.add(hiddenClass);
  params.imageList.innerHTML = '';

  if (!searchQuery) {
    iziToast.show({
      title: '❕',
      theme: 'light',
      message: `Please, fill in the search field`,
      messageSize: '20px',
      messageColor: '#808080',
      backgroundColor: '#e7fc44',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  params.preload.classList.remove(hiddenClass);

  try {
    const response = await fetchImages();
    if (response.hits.length === 0) {
      iziToast.show({
        iconUrl: icon,
        theme: 'dark',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        position: 'topRight',
        timeout: 5000,
      });
      form.reset();
      return;
    }

    params.imageList.innerHTML = createMarkup(response.hits);
    gallery.refresh();

    if (response.hits.length >= 40) {
      addNextPageBtn();
    }

    scrollBy();
    form.reset();
  } catch (err) {
    handleError(err);
  } finally {
    params.preload.classList.add(hiddenClass);
  }
}

async function fetchImages() {
  const BASE_URL = 'https://pixabay.com/api';
  const searchParams = new URLSearchParams({
    key: '41861239-c6b09579488337e808a164f07',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  });
  const res = await axios.get(
    `${BASE_URL}/?${searchParams}&q=${searchValue}&page=${page}`
  );
  return res.data;
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="container-additional-info">
        <div class="container-descr-inner">
          <p class="description">Likes</p>
          <span class="description-value">${likes}</span>
        </div>
        <div class="container-descr-inner">
          <p class="description">Views</p>
          <span class="description-value">${views}</span>
        </div>
        <div class="container-descr-inner">
          <p class="description">Comments</p>
          <span class="description-value">${comments}</span>
        </div>
        <div class="container-descr-inner">
          <p class="description">Downloads</p>
          <span class="description-value">${downloads}</span>
        </div>
      </div>
    </li>`
    )
    .join('');
}

function handleError(err) {
  console.error(err);
  params.imageList.innerHTML = '';
  iziToast.show({
    iconUrl: icon,
    theme: 'dark',
    message: err.stack,
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'topRight',
    timeout: 5000,
  });

  removeNextPageBtn();
}

async function nextPage() {
  params.preload.classList.remove(hiddenClass);
  removeNextPageBtn();
  page += 1;

  try {
    const res = await fetchImages();

    if (page * 40 >= res.totalHits) {
      iziToast.show({
        title: '❕',
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#4e75ff',
        position: 'topRight',
        timeout: 5000,
      });
      params.imageList.innerHTML += createMarkup(res.hits);
      gallery.refresh();
      removeNextPageBtn();

      scrollBy();

      return;
    }

    params.imageList.innerHTML += createMarkup(res.hits);
    gallery.refresh();

    scrollBy();

    addNextPageBtn();
  } catch (err) {
    handleError(err);
  } finally {
    params.preload.classList.add(hiddenClass);
  }
}

function scrollBy() {
  window.scrollBy({
    top: 640,
    behavior: 'smooth',
  });
}

function addNextPageBtn() {
  params.nextBtn.classList.remove(hiddenClass);
  params.nextBtn.addEventListener('click', nextPage);
}

function removeNextPageBtn() {
  params.nextBtn.classList.add(hiddenClass);
  params.nextBtn.removeEventListener('click', nextPage);
}
