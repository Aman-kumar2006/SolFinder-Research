/* Loading screen — hides once the window has fully loaded */
window.addEventListener('load', function () {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  setTimeout(function () {
    loader.classList.add('hidden');
  }, 400);
});
