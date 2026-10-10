const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const data = new FormData(bookingForm);
  const booking = Object.fromEntries(data.entries());

  // TODO: Replace this address with your real Sparkling Saturdays booking email.
  const bookingEmail = 'hello@sparklingsaturdays.co.uk';

  const subject = encodeURIComponent(`Booking request: ${booking.service} - ${booking.name}`);
  const body = encodeURIComponent(
`New Sparkling Saturdays booking request

Name: ${booking.name}
Mobile: ${booking.phone}
Email: ${booking.email}
Service: ${booking.service}
Preferred slot: ${booking.slot}
Postcode: ${booking.postcode}
Property / vehicle size: ${booking.size || 'Not provided'}

Notes:
${booking.notes || 'None'}
`
  );

  formStatus.textContent = 'Opening your email app with the booking details…';
  window.location.href = `mailto:${bookingEmail}?subject=${subject}&body=${body}`;
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
