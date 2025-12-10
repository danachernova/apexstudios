const container = document.querySelector('.main');
let isLocked = false;
let lastTime = 0;

container.addEventListener('wheel', (e) => {
  const now = Date.now();
  if (Math.abs(e.deltaY) < 30) return;
  if (isLocked) return;
  isLocked = true;

  const direction = e.deltaY > 0 ? 1 : -1;
  const screenHeight = window.innerHeight;
  const currentScroll = container.scrollTop;
  const targetScroll = currentScroll + direction * screenHeight;

  container.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });
  const unlock = () => {
    isLocked = false;
    container.removeEventListener('scrollend', unlock);
  };

  if ('onscrollend' in document) {
    container.addEventListener('scrollend', unlock);
  } else {
    setTimeout(unlock, 700);
  }
}, { passive: false });
