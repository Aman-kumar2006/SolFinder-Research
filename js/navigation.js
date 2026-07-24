/* Navigation, scroll progress, back-to-top, search overlay */
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const progressBar = document.querySelector('.scroll-progress');
  const backToTop = document.querySelector('.back-to-top');
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-box input');

  function onScroll() {
    const y = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('scrolled', y > 30);
    }

    if (progressBar) {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? (y / height) * 100 : 0;
      progressBar.style.width = pct + '%';
    }

    if (backToTop) {
      backToTop.classList.toggle('show', y > 600);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function () {
      searchOverlay.classList.add('open');
      setTimeout(function () { searchInput && searchInput.focus(); }, 300);
    });
  }
  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', function () {
      searchOverlay.classList.remove('open');
    });
  }
  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) searchOverlay.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') searchOverlay.classList.remove('open');
    });
  }

  // Mark active nav link based on current page
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
