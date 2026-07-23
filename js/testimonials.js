/* Testimonial slider — autoplay with manual controls */
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;

  const track = slider.querySelector('.testimonial-track');
  const slides = slider.querySelectorAll('.testimonial-slide');
  const dotsWrap = slider.querySelector('.slider-dots');
  const prevBtn = slider.querySelector('.slider-arrow.prev');
  const nextBtn = slider.querySelector('.slider-arrow.next');
  let index = 0;
  let autoplay;

  slides.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function () { goTo(i); resetAutoplay(); });
    dotsWrap.appendChild(dot);
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dotsWrap.querySelectorAll('button').forEach(function (d, di) {
      d.classList.toggle('active', di === index);
    });
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(function () { goTo(index + 1); }, 5500);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); resetAutoplay(); });

  resetAutoplay();
});
