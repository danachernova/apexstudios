//animation

document.addEventListener("DOMContentLoaded", function() {
const elements = document.querySelectorAll('main > section > *:not(.banner__clouds)');

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
         setTimeout(() => {
          entry.target.classList.add('element-show');
        }, 100);
      } else {
        entry.target.classList.remove('element-show');
      }
    });
  }, observerOptions);


  elements.forEach(el => {
    el.classList.add('hidden-element');
    observer.observe(el);
  });
});


//scroll sections
const container = document.querySelector('.main');
let isScrolling = false;

function scrollToSection(direction) {
  if (isScrolling) return;
  const currentScroll = container.scrollTop;
  const screenHeight = window.innerHeight;
  const maxScroll = container.scrollHeight - container.clientHeight;

  if (direction === -1 && currentScroll <= 1) return;
  if (direction === 1 && currentScroll >= maxScroll - 1) return;

  isScrolling = true;

  container.scrollTo({
    top: currentScroll + (direction * screenHeight),
    behavior: 'smooth'
  });

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

container.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) < 30) return;

  const direction = e.deltaY > 0 ? 1 : -1;
  scrollToSection(direction);
}, { passive: true });

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    scrollToSection(1);
  } else if (e.key === 'ArrowUp') {
    scrollToSection(-1);
  }
});

let touchStartY = 0;

container.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

container.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) < 50) return;

  const direction = diff > 0 ? 1 : -1;

  scrollToSection(direction);
}, { passive: true });

