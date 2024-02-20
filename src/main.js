import { fetchImages } from './pixabay-api.js';
import { displayGallery, showToast } from './render-functions.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements.query.value;

  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      showToast('No images found. Please try again.', 'error');
    } else {
      displayGallery(images);
    }
  } catch (error) {
    console.error('Error processing search:', error);
    showToast('An error occurred. Please try again.', 'error');
  }
});

showLoadMoreBtn.addEventListener('click', async function () {
  try {
    loaderContainer.style.display = 'block';
    loadingIndicator.style.display = 'block';
    currentPage++;
    const images = await searchImages(currentQuery, currentPage);
    if (images.length > 0) {
      appendImages(images);
      toastSuccess(`Loaded additional ${images.length} images`);
      initializeLightbox();
      if (images.length < 15) {
        toastError(
          'We are sorry, but you have reached the end of search results.'
        );
        showLoadMoreBtn(false);
      }

      scrollToNextGroup();
    } else {
      toastError('No more images to load');
      showLoadMoreBtn(false);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    toastError('Failed to fetch additional images.');
  } finally {
    loaderContainer.style.display = 'none';
    loadingIndicator.style.display = 'none';
  }
});
