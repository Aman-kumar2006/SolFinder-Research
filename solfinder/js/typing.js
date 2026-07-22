/* Typing effect — cycles through phrases in the hero headline */
document.addEventListener('DOMContentLoaded', function () {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  let phrases = [];
  try {
    phrases = JSON.parse(el.getAttribute('data-phrases') || '[]');
  } catch (e) {
    phrases = [];
  }
  if (phrases.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    el.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }

  tick();
});
