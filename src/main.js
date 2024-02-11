import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery-el');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-more-btn');
const lightBox = new SimpleLightbox('.gallery-link');
let page = 1;
let perPage = 15;
loadBtn.style.display = 'none';
loader.style.display = 'none';
const searchParams = {
  key: '42129451-ab1d1e3d1abd6a79c6499a83d',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: perPage,
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  loadBtn.style.display = 'none';
  gallery.innerHTML = '';
  const inputText = form.elements.search.value.trim();
  if (inputText === '') {
    iziToast.show({
      message: 'Please write search image',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
    return;
  } else {
    loader.style.display = 'inline-block';
    searchParams.q = inputText;
    searchParams.page = page;
    try {
      const images = await fetchImage();
      if (images.totalHits === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#FAFAFB',
          backgroundColor: '#EF4040',
          position: 'topRight',
        });
        loader.style.display = 'none';
      } else {
        renderGallery(images);
        if (images.totalHits < perPage) {
          notification();
        } else {
          loadBtn.style.display = 'block';
        }
      }
    } catch (error) {
      iziToast.show({
        message: `Sorry, ${error}`,
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
    }
  }

  form.reset();
});

loadBtn.addEventListener('click', async () => {
  page += 1;
  searchParams.page = page;
  loader.style.display = 'inline-block';
  try {
    const images = await fetchImage();
    renderGallery(images);
    scroll();
    if (perPage * page > images.totalHits) {
      notification();
    }
  } catch (error) {
    iziToast.show({
      message: `Sorry, ${error}`,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'bottomCenter',
    });
  }
});

async function fetchImage() {
  const urlparams = new URLSearchParams(searchParams);
  const response = await axios.get(`https://pixabay.com/api/?${urlparams}`);
  return response.data;
}

function renderGallery(images) {
  const item = images.hits
    .map(
      image => `<li class="gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}" >
      <img
        class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
        width = "360"
      />
    </a>
    <div class="img-text">
      <div class="img-info">
        <h3>Likes</h3>
        <p> ${image.likes}</p>
      </div>
      <div class="img-info">
        <h3>Views</h3>
        <p> ${image.views}</p>
      </div>
      <div class="img-info">
        <h3>Comments</h3>
        <p> ${image.comments}</p>
      </div>
      <div class="img-info">
        <h3>Downloads</h3>
        <p> ${image.downloads}</p>
      </div>
    </div>
  </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', item);
  lightBox.refresh();

  loader.style.display = 'none';
}

function notification() {
  iziToast.show({
    message: 'We are sorry, but you have reached the end of search results.',
    messageColor: '#FAFAFB',
    backgroundColor: '#1DB8F5',
    position: 'topRight',
  });
  loadBtn.style.display = 'none';
  loader.style.display = 'none';
}

function scroll() {
  const listItem = document.querySelector('.gallery-item');
  const heightScroll = listItem.getBoundingClientRect().height * 2;
  window.scrollBy({
    top: heightScroll,
    left: 0,
    behavior: 'smooth',
  });
}
