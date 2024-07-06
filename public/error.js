function hideError() {
  const error = document.querySelector(".error");
  if (error) error.parentElement.removeChild(error);
}

export function error(error, type) {
  hideError();
  const markup = `<div class="error ${type}">${error}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
}
