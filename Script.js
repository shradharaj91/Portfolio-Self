const careerSection = document.querySelector('#Career');
const timelineProgress = document.querySelector('.timeline-progress');
const backToTopButton = document.querySelector('.back-to-top');
const cursorDot = document.querySelector('#cursorDot');
const cursorRing = document.querySelector('#cursorRing');

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

window.addEventListener('scroll', updateScrollEffects, { passive: true });
window.addEventListener('resize', updateScrollEffects);
updateCareerTimeline();
updateScrollEffects();
