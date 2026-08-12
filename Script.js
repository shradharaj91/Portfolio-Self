const careerSection = document.querySelector('#Career');
const timelineProgress = document.querySelector('.timeline-progress');
const backToTopButton = document.querySelector('.back-to-top');
const cursorDot = document.querySelector('#cursorDot');
const cursorRing = document.querySelector('#cursorRing');
const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-status');

window.addEventListener('load', () => {
  window.setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, 100);
});

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  const moveCursor = ({ clientX, clientY }) => {
    const position = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
    cursorDot.style.transform = position;
    cursorRing.style.transform = position;
    cursorDot.classList.add('is-visible');
    cursorRing.classList.add('is-visible');
  };

  document.addEventListener('pointermove', moveCursor);
  document.documentElement.addEventListener('pointerleave', () => {
    cursorDot.classList.remove('is-visible');
    cursorRing.classList.remove('is-visible');
  });

  document.querySelectorAll('a, button, .nav-button').forEach((element) => {
    element.addEventListener('pointerenter', () => cursorRing.classList.add('is-hovering'));
    element.addEventListener('pointerleave', () => cursorRing.classList.remove('is-hovering'));
  });
}

function updateCareerTimeline() {
  if (!careerSection || !timelineProgress) return;

  const bounds = careerSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const totalDistance = bounds.height + viewportHeight * 0.45;
  const travelled = viewportHeight * 0.7 - bounds.top;
  const progress = Math.max(0, Math.min(100, (travelled / totalDistance) * 100));

  timelineProgress.style.height = `${progress}%`;
}

function updateScrollEffects() {
  updateCareerTimeline();

  if (backToTopButton) {
    backToTopButton.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.75);
  }
}

backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const defaultButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  contactStatus.textContent = '';
  contactStatus.classList.remove('is-error');

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === 'false' || result.success === false) {
      throw new Error(result.message || 'Form service rejected the request.');
    }

    contactForm.reset();
    contactStatus.textContent = 'Message sent successfully.';
    alert('Message sent successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    contactStatus.textContent = message.includes('web server')
      ? 'This form needs to be opened from a hosted website, not directly as a local HTML file.'
      : 'Unable to send your message right now. Please try again shortly.';
    contactStatus.classList.add('is-error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = defaultButtonText;
  }
});

window.addEventListener('scroll', updateScrollEffects, { passive: true });
window.addEventListener('resize', updateScrollEffects);
updateCareerTimeline();
updateScrollEffects();
