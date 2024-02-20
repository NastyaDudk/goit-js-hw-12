export function showLoadMoreBtn(show) {
  loadMoreBtn.style.display = show ? 'block' : 'none';
}

export function toastSuccess(message) {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
  });
}

export function toastError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}
