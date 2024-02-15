import { refs } from './refs';
import { loaderOn } from './loader';
import { loaderOff } from './loader';
import { makeGalleryItem } from './render-functions';
import { onError } from './iziToasts';
import axios from 'axios';
import { MESSAGE } from './iziToasts';
import { totalHits } from './render-functions';
import { LIMIT } from './iziToasts';
import { scroll } from './render-functions';

const perPage = 15;
let page = 1;
let userSearch;

export async function onFormSubmit(event) {
  event.preventDefault();
  refs.btnLoad.classList.add('hidden');

  refs.galleryList.innerHTML = '';
  page = 1;
  userSearch = event.target.elements.input.value.trim();
  try {
    const response = await fetchImg(userSearch);
    const item = makeGalleryItem(response);
    return item;
  } catch (error) {
    onError(MESSAGE);
  } finally {
    loaderOff();
    refs.form.reset();
  }
}

export async function fetchImg(input) {
  loaderOn();
  const API_KEY = '42220995-e7901b62efa710cae16c4a0a7';
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const parameters = `q=${input}&image_type=photo&orientation=horizontal&safesearch=true`;
  const URL = `?key=${API_KEY}&${parameters}`;

  const config = {
    params: {
      per_page: perPage,
      page: page,
    },
  };

  const response = await axios.get(URL, config);
  return response.data;
}

export async function onLoadClick() {
  page += 1;
  const totalPages = Math.ceil(totalHits / perPage);
  if (page > totalPages) {
    refs.btnLoad.classList.add('hidden');

    onError(LIMIT);
  } else {
    const response = await fetchImg(userSearch);
    const item = makeGalleryItem(response);
    loaderOff();
    return item;
  }
}
