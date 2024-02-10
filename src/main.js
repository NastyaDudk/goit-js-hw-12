import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Axios from 'axios';

const loaderEl = document.querySelector('.loader');
const btnLoad = document.querySelector('.load-more-btn');
const formEl = document.getElementById('search-form');

export const refs = {
  galleryEl: document.getElementById('.gallery-el'),
  submitBtn: document.querySelector("[type='submit']"),
  loadMoreBtn: document.getElementById('.load-more-btn'),
  loaderEl: document.querySelector('.loader'),
  searchForm: document.querySelector('.form'),
};

let _page = 1;
const limit = 15;
let totalPages = 0;
let value = '';
const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formEl.addEventListener('search-form', onFormSubmit);
loaderHide();

async function onFormSubmit(e) {
  e.preventDefault();
  refs.galleryEl.innerHTML = '';
  BtnLoaderHide();
  value = e.target.elements.valueGallery.value.trim();
  if (!value) {
    messageErr(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }
  if (value !== '') {
    loaderShow();
    _page = 1;
    try {
      const data = await getUrl();
      if (data.hits.length >= 1) {
        loaderHide();
        renderImages(data.hits);
        simpleLightBox.refresh();
        if (data.hits.length < limit) {
          BtnLoaderHide();
          messageErr("We're sorry, there are no more posts to load");
        } else {
          BtnLoaderShow();
        }
      } else {
        loaderHide();
        messageErr(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
    } catch (err) {
      totalPages = 0;
      checkTotalHits(totalPages);
    }
  }
  e.target.reset();
}

refs.btnLoad.addEventListener('click', onBtnLoadClick);

async function onBtnLoadClick() {
  _page += 1;
  loaderShow();
  const data = await getUrl();
  renderImages(data.hits);
  simpleLightBox.refresh();
  checkTotalHits(data.totalHits);
  loaderHide();
  const card = document.querySelector('.card');
  let rect = 2 * card.getBoundingClientRect().height;
  window.scrollBy({
    top: rect,
    behavior: 'smooth',
  });
}

function checkTotalHits(totalHits) {
  totalPages = Math.ceil(totalHits / limit);
  if (totalPages <= _page) {
    BtnLoaderHide();
    messageErr("We're sorry, there are no more posts to load");
  }
}

function messageErr(message) {
  return iziToast.error({
    position: 'topRight',
    color: 'blue',
    message: message,
  });
}
function loaderShow() {
  refs.loader.style.visibility = 'visible';
}
function loaderHide() {
  refs.loader.style.visibility = 'hidden';
}
function BtnLoaderShow() {
  refs.btnLoad.style.visibility = 'visible';
}
function BtnLoaderHide() {
  refs.btnLoad.style.visibility = 'hidden';
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
