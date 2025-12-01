//header height
// function updateHeaderHeight() {
//   const header = document.querySelector('.header')
//   document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)
// }
//
// window.addEventListener('load', updateHeaderHeight)
// window.addEventListener('resize', updateHeaderHeight)

//swiper
function initSwiper(selector, enableAutoplay = true) {
  const swiperConfig = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 600,

    simulateTouch: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
      slideShadows: false,
    },
    pagination: {
      el: selector + ' .swiper-pagination',
      clickable: true,
    },
    on: {
      init() {
        updateSlideBrightness(this);

        requestAnimationFrame(() => {
          setTimeout(() => {
            const origSlides = Array.from(this.slides).filter(s => !s.classList.contains('swiper-slide-duplicate'));

            const totalOriginal = origSlides.length;

            if (totalOriginal > 0) {
              const centerIndex = Math.floor(totalOriginal / 2);
              this.slideToLoop(centerIndex, 0, false);
            }

            updateSlideBrightness(this);
          }, 30);
        });
      },
      slideChangeTransitionStart() {
        updateSlideBrightness(this);
      },
      transitionStart() {
        updateSlideBrightness(this);
      }
    }
  };

  if (enableAutoplay) {
    swiperConfig.autoplay = {
      delay: 3000,
      disableOnInteraction: false,
    };
  }

  const swiper = new Swiper(selector, swiperConfig);

  function updateSlideBrightness(swiperInstance) {
    swiperInstance.slides.forEach((slide) => {
      const img = slide.querySelector("img");
      if (img) {
        img.style.transition = "filter 0.2s ease";
        img.style.filter = "brightness(0.4)";
        if (slide.classList.contains("swiper-slide-active")) {
          img.style.filter = "brightness(1)";
        }
      }
    });
  }
  return swiper;
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.portfolio__inner')) {
    initSwiper('.portfolio__inner', false);
  }
  if (document.querySelector('.projects__inner')) {
    setTimeout(() => {
      initSwiper('.projects__inner', false);
    }, 100);
  }
});


//модалки

document.addEventListener('DOMContentLoaded', function() {
  const isProjectsPage = window.location.pathname.includes('projects.html');
  const isIndexPage = !isProjectsPage;

  if (isIndexPage) {
    const portfolioLinks = document.querySelectorAll('.portfolio__slide');
    portfolioLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.dataset.project;
        sessionStorage.setItem('selectedProject', projectId);
        window.location.href = `./projects.html?project=${projectId}`;
      });
    });
  }

  if (isProjectsPage) {
    const urlParams = new URLSearchParams(window.location.search);
    let projectId = urlParams.get('project');
    if (!projectId) {
      projectId = sessionStorage.getItem('selectedProject');
    }

    const projectsData = {
      charmstore: {
        title: "Charmstore Club",
        description: "At Charmstore Club, elegance meets confidence. A curated space for those who know luxury isn't loud — it's effortless. From timeless design to seamless experience, we built a digital boutique that speaks the language of modern charm. Style, simplicity, and sophistication — all in one click.",
        link: "https://charmstore.club/",
        images: [
          "./images/projects/project-1-2.png",
          "./images/projects/project-1.jpg",
          "./images/projects/project-1-1.png"
        ]
      },
      house: {
        title: "House of Rohl",
        description: "At House of Rohl, luxury flows without effort. We sculpted a digital experience where craftsmanship meets clarity, turning a microsite for their KBIS showcase into a curated journey of texture, finish, and elegance. From immersive visuals to sleek transitions, we made the space as refined as the fixtures themselves — tailored for those who expect quiet grandeur.",
        link: "https://houseofrohl-kbis.atypicdev.com/",
        images: [
          "./images/projects/project-2-1.png",
          "./images/projects/project-2.png",
          "./images/projects/project-2-2.png"
        ]
      },
      futureme: {
        title: "FutureMe",
        description: "At FutureMe, we built something simple yet powerful — a platform that lets you write a message to your future self and be sure it'll reach you, even 10 years from now. Clean design, reliable tech, and smooth delivery — proof that meaningful ideas don't need complexity to last.",
        link: "https://www.futureme.org/",
        images: [
          "./images/projects/project-3-1.png",
          "./images/projects/project-3.png",
          "./images/projects/project-3-2.png"
        ]
      },
      swap: {
        title: "Window Swap",
        description: "At Window Swap, we built a serene digital escape — a global window whose view changes every time. With seamless transitions and minimal design, users drift into peaceful scenes across the world. If you dreamed the web could pause and breathe, here it is.",
        link: "https://window-swap.com",
        images: [
          "./images/projects/project-4-1.png",
          "./images/projects/project-4.png",
          "./images/projects/project-4-2.png"
        ]
      },
      genoneai: {
        title: "GenOneAi",
        description: "At GenOneAI, we crafted a sleek digital interface that brings multiple AI tools under one roof. With streamlined navigation, intuitive flows and minimalist visuals, we turned complexity into clarity — so users can jump straight into outcomes, not onboarding. Designed by ApexStudios, built for those who demand instant access to next-level intelligence.",
        link: "https://www.figma.com/proto/kEOhvhSwDafPIhz1PE95sR/GenOneAI--MVP-?page-id=0%3A1&node-id=73-14&p=f&t=Lz394y3Ss5sHtw7B-1&scaling=scale-down&content-scaling=fixed",
        images: [
          "./images/projects/phone-1.png",
          "./images/projects/phone-2.png",
          "./images/projects/phone-3.png",
          "./images/projects/phone-4.png",
          "./images/projects/phone-5.png",
          "./images/projects/phone-6.png",
          "./images/projects/phone-7.png",
        ]
      },
      xuva: {
        title: "Xuva",
        description: "At Xuva, heritage flavours meet digital finesse. We crafted a responsive site for this Mexico City gem that echoes the spirit of Oaxaca — vibrant, refined and deeply rooted. With immersive visuals and polished UX, the experience invites visitors to step beyond a menu and into a curated world of taste, texture and culture. Luxury done quietly.",
        link: "https://xuva.mx/",
        images: [
          "./images/projects/project-5-1.png",
          "./images/projects/project-5.png",
          "./images/projects/project-5-2.png"
        ]
      },
    };

    if (projectId && projectsData[projectId]) {
      fillProjectSection(projectsData[projectId], projectId);
      sessionStorage.removeItem('selectedProject');

      window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('returnToIndex', 'true');
      });
    } else {
      if (window.location.search === '' || sessionStorage.getItem('returnToIndex') === 'true') {
        sessionStorage.removeItem('returnToIndex');
        window.location.href = './index.html';
      }
      return;
    }

    function fillProjectSection(data, projectKey) {
      document.title = `${data.title} | ApexStudios`;

      const title = document.querySelector('.projects__title');
      const desc = document.querySelector('.description__text');
      const link = document.querySelector('.projects__link');
      const wrapper = document.querySelector('.projects__inner .swiper-wrapper');

      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.description;

      if (link) {
        link.href = data.link;
        link.target = "_blank";
        link.textContent = projectKey === "genoneai" ? "Link to Figma" : data.link;
      }

      if (wrapper) {
        wrapper.innerHTML = '';
        data.images.forEach(src => {
          const slideClass = projectKey === "genoneai" ? "genoneai__slide" : "projects__slide";
          const slide = document.createElement('div');
          slide.className = `content swiper-slide ${slideClass}`;

          const img = document.createElement('img');
          img.src = src;
          img.alt = data.title;
          img.loading = "lazy";
          img.width = 1215;
          img.height = 788;

          slide.appendChild(img);
          wrapper.appendChild(slide);
        });
      }

      const inner = document.querySelector('.projects__inner');
      if (inner) {
        inner.classList.toggle('genoneai', projectKey === "genoneai");
      }
    }
  }
});

//slider form
const steps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-button');
const progressBar = document.querySelector('.form__progress-bar');

const totalSteps = steps.length;
let currentStep = 1;

function updateSteps(step) {
  steps.forEach(s => {
    const sStep = Number(s.dataset.step);

    if (sStep === step) s.classList.add('active');
    else s.classList.remove('active');
  });

  updateProgress(step);
}

function updateProgress(step) {
  const percentage = (step - 1) / (totalSteps - 1) * 100;
  progressBar.style.width = percentage + '%';
}
nextButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const next = Number(btn.dataset.next);
    currentStep = next;
    updateSteps(currentStep);
  });
});

//choose project-type and budget buttons

document.querySelectorAll('.form__options').forEach(optionsBlock => {
  const options = optionsBlock.querySelectorAll('.form__option');
  const hiddenInput = optionsBlock.parentElement.querySelector('input[type="hidden"]');

  options.forEach(option => {
    option.addEventListener('click', () => {

      if (option.classList.contains('active')) {
        option.classList.remove('active');
        hiddenInput.value = '';
        return;
      }

      options.forEach(o => o.classList.remove('active'));

      option.classList.add('active');
      hiddenInput.value = option.dataset.value;
    });
  });
});

document.querySelectorAll('.form__socials').forEach(block => {
  const items = block.querySelectorAll('.form__socials-item');
  const hiddenInput = document.querySelector('#contact-type');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      hiddenInput.value = item.dataset.value;
    });
  });
});

function progressbarUpdate() {
  const progressBar = document.querySelector('.form__progress-bar');
  const progressContainer = document.querySelector('.form__progress');
  const steps = document.querySelectorAll('.form-step');
  const totalSteps = steps.length;
  const stepPercent = 100 / totalSteps;

  if (!progressBar || !progressContainer || !steps.length) return;

  const originalUpdateSteps = window.updateSteps;
  window.updateSteps = function(step) {
    if (typeof originalUpdateSteps === 'function') {
      originalUpdateSteps(step);
    }
    updateProgressBar(step);
  };

  function updateProgressBar(step) {
    if (step === totalSteps) {
      progressContainer.style.opacity = '0';
      progressBar.style.width = '0';
      return;
    }
    progressContainer.style.opacity = '1';
    progressBar.style.width = (stepPercent * step) + '%';
  }

  updateProgressBar(1);

  const nextButtons = document.querySelectorAll('.next-button');
  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = Number(btn.dataset.next);
      updateProgressBar(nextStep);
    });
  });
}

progressbarUpdate()


//send json object

function getFormData() {
  const formData = {};

  const userNameInput = document.querySelector('#user-name');
  const nameInput = document.querySelector('#name');
  if (userNameInput) formData.contact = userNameInput.value.trim();
  if (nameInput) formData.name = nameInput.value.trim();

  const contactTypeInput = document.querySelector('#contact-type');
  if (contactTypeInput) formData.contact_type = contactTypeInput.value;

  const projectTypeInput = document.querySelector('#project-type');
  if (projectTypeInput) formData.project_type = projectTypeInput.value;

  const budgetInput = document.querySelector('#budget');
  if (budgetInput) formData.budget = budgetInput.value;

  const commentInput = document.querySelector('#comment');
  if (commentInput) formData.comment = commentInput.value.trim();

  return formData;
}

const formElement = document.querySelector('.form__list');
if (formElement) {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault(); // форма не отправляется на сервер, здесь шаманит Ваня, объект json в консоли
    const dataToSend = getFormData();
    console.log('Ваня, лови данные', JSON.stringify(dataToSend, null, 2));
    setTimeout(() => location.reload(), 0);
  });
}






