import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

function renderCardImage(arr) {
  const markup = arr.map(item => cardTemplate(item)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

const lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', onSubmitSearchForm);

async function onSubmitSearchForm(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.searchQuery.value;
  currentPage = 1;

  if (searchQuery === '') {
    return;
  }

  const response = await fetchImages(searchQuery, currentPage);
  currentHits = response.hits.length;

  if (response.totalHits > 15) {
    loadMoreBtn.classList.remove('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      renderCardImage(response.hits);
      lightbox.refresh();
      endCollectionText.classList.add('is-hidden');

      const cardHeight =
        gallery.firstElementChild.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('is-hidden');
      endCollectionText.classList.add('is-hidden');
    }
  } catch (error) {
    console.error(error);
  }
}

loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  currentPage += 1;
  const response = await fetchImages(searchQuery, currentPage);
  renderCardImage(response.hits);
  lightbox.refresh();
  currentHits += response.hits.length;

  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    endCollectionText.classList.remove('is-hidden');
  }
}
