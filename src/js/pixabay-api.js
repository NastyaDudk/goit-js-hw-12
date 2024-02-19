import axios from 'axios';

export async function searchImages(query, page = 1) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
  try {
    const response = await axios.get(url);
    totalHits = response.data.totalHits;
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    toastError('Failed to fetch images.');
    throw error;
  }
}

export function displayImages(images) {
  galleryContainer.innerHTML = '';
  appendImages(images);
}

let totalHits = 0;

export async function searchImages(query, page = 1) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
  try {
    const response = await axios.get(url);
    totalHits = response.data.totalHits;
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    toastError('Failed to fetch images.');
    throw error;
  }
}

export function appendImages(images) {
  const fragment = document.createDocumentFragment();
  images.forEach(image => {
    const {
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = image;
    const imageCard = document.createElement('div');
    imageCard.classList.add('image-card');
    imageCard.innerHTML = `
            <a href="${largeImageURL}" data-lightbox="image-set" data-title="${tags}">
                <img src="${webformatURL}" alt="${tags}">
                <div class="info">Likes: ${likes}, Views: ${views}, Comments: ${comments}, Downloads: ${downloads}</div>
            </a>
        `;
    fragment.appendChild(imageCard);
  });
  galleryContainer.appendChild(fragment);

  currentImagesCount += images.length;
}
