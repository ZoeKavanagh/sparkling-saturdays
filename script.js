const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');
const bookingSubmit = document.getElementById('bookingSubmit');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const originalButtonText = bookingSubmit.textContent;
  bookingSubmit.disabled = true;
  bookingSubmit.textContent = 'Sending…';
  formStatus.textContent = '';
  formStatus.classList.remove('is-success', 'is-error');

  try {
    const response = await fetch(bookingForm.action, {
      method: 'POST',
      body: new FormData(bookingForm),
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    bookingForm.reset();
    formStatus.textContent = 'Thanks! Your booking request has been sent. Zoe will be in touch shortly to confirm your slot.';
    formStatus.classList.add('is-success');
  } catch (error) {
    formStatus.textContent = 'Sorry, your request could not be sent. Please try again in a moment.';
    formStatus.classList.add('is-error');
  } finally {
    bookingSubmit.disabled = false;
    bookingSubmit.textContent = originalButtonText;
  }
});

// Small motion details only — no layout changes.
const revealTargets = document.querySelectorAll(
  '.section-heading, .service-card, .split-heading, .price-panel, .local-grid > *, .booking-grid > *, .faq-grid > *'
);

if ('IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('js-reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  revealTargets.forEach((el) => revealObserver.observe(el));
}
