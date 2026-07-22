/* Form validation — contact form and newsletter subscription */
document.addEventListener('DOMContentLoaded', function () {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(group, show) {
    group.classList.toggle('invalid', show);
  }

  // ----- Contact form -----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const successBox = contactForm.querySelector('.form-success');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const name = contactForm.querySelector('#cf-name');
      const email = contactForm.querySelector('#cf-email');
      const subject = contactForm.querySelector('#cf-subject');
      const message = contactForm.querySelector('#cf-message');

      [name, email, subject, message].forEach(function (field) {
        const group = field.closest('.form-group');
        const empty = field.value.trim().length === 0;
        const badEmail = field === email && !emailPattern.test(field.value.trim());
        if (empty || badEmail) {
          setError(group, true);
          valid = false;
        } else {
          setError(group, false);
        }
      });

      if (!valid) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(function () {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
        successBox.classList.add('show');
        setTimeout(function () { successBox.classList.remove('show'); }, 5000);
      }, 900);
    });

    contactForm.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        setError(field.closest('.form-group'), false);
      });
    });
  }

  // ----- Newsletter form -----
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const success = form.parentElement.querySelector('.newsletter-success');

      if (!input || !emailPattern.test(input.value.trim())) {
        input.style.borderColor = '#ff5c5c';
        return;
      }
      input.style.borderColor = '';
      form.reset();
      if (success) {
        success.classList.add('show');
        setTimeout(function () { success.classList.remove('show'); }, 5000);
      }
    });
  });
});
