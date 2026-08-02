const careerSection = document.querySelector('#Career');
const timelineProgress = document.querySelector('.timeline-progress');
const backToTopButton = document.querySelector('.back-to-top');

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
