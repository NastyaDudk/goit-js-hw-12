import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Axios from 'axios';

const refs = {
  searchQuery: document.querySelector('#searchQuery'),
  formElem: document.querySelector('.form'),
  galleryEl: document.querySelector('.gallery-el'),
  loaderElem: document.querySelector('.loader'),
  btnLoad: document.querySelector('.load-more-btn'),
};

let _page = 1;
const limit = 15;
const totalPages = Math.ceil(500 / limit);
let value = '';
console.log(value);

refs.formElem.addEventListener('submit', onFormSubmit);
refs.loaderElem.style.visibility = 'hidden';
refs.btnLoad.style.visibility = 'hidden';

async function onFormSubmit(e) {
  e.preventDefault();
  value = refs.searchQuery.value.trim();
  if (value !== '') {
    refs.loaderElem.style.visibility = 'visible';
    refs.galleryEl.innerHTML = '';
    getPageData();
  }
  _page = 1;
  const data = await getUrl();
  if (data.hits.length > 0 && value !== '') {
    refs.loaderElem.style.visibility = 'hidden';
    renderImages(data.hits);
    refs.btnLoad.style.visibility = 'visible';
  } else {
    refs.loaderElem.style.visibility = 'hidden';
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  }

  e.target.reset();
}

const axios = Axios.create({
  baseURL: 'https://pixabay.com/api/',
});
async function getUrl() {
  const response = await axios.get('', {
    params: {
      key: '42132466-2eec74b8e2a534f613ea758a4',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: limit,
      page: _page,
    },
  });

  return response.data;
}
function imageTemplate(img) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = img;

  return `<li>
    <div class="card">
    <div class="img-container">
    <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" />
    </a>
    </div>
    <div class="img-comments">
    <p class="describe">Likes ${likes}</p>
    <p class="describe">Views ${views}</p>
    <p class="describe">Comments ${comments}</p>
    <p class="describe">Downloads ${downloads}</p>
    </div>
    </div>
    </li>
    `;
}
function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}
function renderImages(images) {
  const markup = imagesTemplate(images);
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
  let simpleLightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}

async function getPageData() {
  const data = await getUrl();
  if (data.hits.length > 0) {
    renderImages(data.hits);
    if (_page < totalPages) {
      refs.btnLoad.style.visibility = 'visible';
    } else {
      refs.btnLoad.style.visibility = 'hidden';
    }
  } else {
    iziToast.error({
      message: 'Sorry, there are no images matching your search query',
    });
  }
}
