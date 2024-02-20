function appendImages(images) {
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

export { appendImages };
