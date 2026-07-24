/* FAQ accordion — smooth expand/collapse, one open at a time per list */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.faq-list').forEach(function (list) {
    const items = list.querySelectorAll('.faq-item');

    items.forEach(function (item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        items.forEach(function (other) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = null;
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
});
