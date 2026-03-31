const services = document.querySelectorAll('.service');
const processSteps = document.querySelectorAll('.process-step');
const scrollLinks = document.querySelectorAll('[data-scroll-target]');
const projectGrids = document.querySelectorAll('[data-projects-grid]');

function createBackToTopButton() {
  const button = document.createElement('button');

  button.className = 'back-to-top';
  button.type = 'button';
  button.setAttribute('aria-label', 'Наверх');
  button.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.07 9.57L12 3.5L5.93 9.57" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 20.5V3.67004" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  document.body.append(button);

  const toggleVisibility = () => {
    button.classList.toggle('is-visible', window.scrollY > window.innerHeight);
  };

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  window.addEventListener('resize', toggleVisibility);
  toggleVisibility();
}

createBackToTopButton();

function openService(service) {
  const content = service.querySelector('.service__content');

  service.classList.add('active');
  content.style.height = `${content.scrollHeight}px`;
}

function closeService(service) {
  const content = service.querySelector('.service__content');

  content.style.height = `${content.scrollHeight}px`;
  content.offsetHeight;
  service.classList.remove('active');
  content.style.height = '0px';
}

services.forEach(service => {
  const content = service.querySelector('.service__content');

  content.style.height = service.classList.contains('active')
    ? `${content.scrollHeight}px`
    : '0px';

  content.addEventListener('transitionend', event => {
    if (event.propertyName !== 'height') return;

    if (service.classList.contains('active')) {
      content.style.height = 'auto';
    }
  });
});

services.forEach(service => {
  const header = service.querySelector('.service__header');

  header.addEventListener('click', () => {
    services.forEach(otherService => {
      if (otherService !== service && otherService.classList.contains('active')) {
        closeService(otherService);
      }
    });

    if (service.classList.contains('active')) {
      closeService(service);
      return;
    }

    openService(service);
  });
});

function openProcessStep(step) {
  const content = step.querySelector('.process-step__content');

  step.classList.add('active');
  content.style.height = `${content.scrollHeight}px`;
}

function closeProcessStep(step) {
  const content = step.querySelector('.process-step__content');

  content.style.height = `${content.scrollHeight}px`;
  content.offsetHeight;
  step.classList.remove('active');
  content.style.height = '0px';
}

processSteps.forEach(step => {
  const content = step.querySelector('.process-step__content');

  content.style.height = step.classList.contains('active')
    ? `${content.scrollHeight}px`
    : '0px';

  content.addEventListener('transitionend', event => {
    if (event.propertyName !== 'height') return;

    if (step.classList.contains('active')) {
      content.style.height = 'auto';
    }
  });
});

processSteps.forEach(step => {
  const header = step.querySelector('.process-step__header');

  header.addEventListener('click', () => {
    processSteps.forEach(otherStep => {
      if (otherStep !== step && otherStep.classList.contains('active')) {
        closeProcessStep(otherStep);
      }
    });

    if (step.classList.contains('active')) {
      closeProcessStep(step);
      return;
    }

    openProcessStep(step);
  });
});

scrollLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const targetSelector = link.dataset.scrollTarget;
    const target = document.querySelector(targetSelector);

    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

function renderProjectCards() {
  const projectCatalog = window.projectCatalog || [];

  if (!projectGrids.length || !projectCatalog.length) return;

  projectGrids.forEach(grid => {
    const limit = Number(grid.dataset.projectsLimit || projectCatalog.length);
    const projects = projectCatalog.slice(0, limit);

    grid.innerHTML = projects.map(project => `
      <article class="project-card" data-project-url="Project.html?slug=${project.slug}" tabindex="0" role="link" aria-label="Открыть проект ${project.title}">
        <img
          class="project-card__image"
          src="${project.heroImage}"
          alt="${project.imageAlt || project.title}"
        />
        <div class="project-card__content">
          <div class="project-card__tags">
            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <div class="project-card__bottom">
            <h3>${project.title}</h3>
            <a class="project-card__link" href="Project.html?slug=${project.slug}" aria-label="Открыть проект ${project.title}">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10.9998L21.2 2.7998" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 6.8V2H17.2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  });
}

renderProjectCards();

function initPrimaryActions() {
  const contactSection = document.querySelector('.contact');

  if (contactSection && !contactSection.id) {
    contactSection.id = 'contact';
  }

  const headerButton = document.querySelector('.header__actions .btn');
  const heroButtons = document.querySelectorAll('.hero__buttons .btn');
  const ctaButton = document.querySelector('.cta__btn');

  if (headerButton) {
    headerButton.addEventListener('click', event => {
      if (contactSection) {
        event.preventDefault();
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return;
      }

      if (headerButton.tagName === 'A') return;

      window.location.href = 'index.html#contact';
    });
  }

  if (heroButtons[0]) {
    heroButtons[0].addEventListener('click', () => {
      window.location.href = 'projects.html';
    });
  }

  if (heroButtons[1] && contactSection) {
    heroButtons[1].addEventListener('click', event => {
      event.preventDefault();
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  if (ctaButton && contactSection) {
    ctaButton.addEventListener('click', event => {
      event.preventDefault();
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}

initPrimaryActions();

function initProjectCardLinks() {
  const openProjectCard = card => {
    const url = card?.dataset.projectUrl;

    if (!url) return;

    window.location.href = url;
  };

  document.addEventListener('click', event => {
    const interactiveControl = event.target.closest('a, button, input, textarea, select, label');

    if (interactiveControl && !interactiveControl.classList.contains('project-card__link')) {
      return;
    }

    const card = event.target.closest('.project-card[data-project-url]');

    if (!card) return;

    if (event.target.closest('.project-card__link')) {
      event.preventDefault();
    }

    openProjectCard(card);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const card = event.target.closest('.project-card[data-project-url]');

    if (!card) return;

    event.preventDefault();
    openProjectCard(card);
  });
}

initProjectCardLinks();

function initBenefitCardsMagnet() {
  const benefitCardsWrap = document.querySelector('.about-benefits__cards');

  if (!benefitCardsWrap || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }

  const benefitCards = [...benefitCardsWrap.querySelectorAll('.benefit-card')];
  const radius = 220;
  const maxOffset = 14;

  const resetCards = () => {
    benefitCards.forEach(card => {
      card.style.setProperty('--benefit-offset-x', '0px');
      card.style.setProperty('--benefit-offset-y', '0px');
    });
  };

  benefitCardsWrap.addEventListener('mousemove', event => {
    benefitCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > radius) {
        card.style.setProperty('--benefit-offset-x', '0px');
        card.style.setProperty('--benefit-offset-y', '0px');
        return;
      }

      const strength = (1 - distance / radius) ** 1.4;
      const offsetX = (deltaX / radius) * maxOffset * strength;
      const offsetY = (deltaY / radius) * maxOffset * strength;

      card.style.setProperty('--benefit-offset-x', `${offsetX.toFixed(2)}px`);
      card.style.setProperty('--benefit-offset-y', `${offsetY.toFixed(2)}px`);
    });
  });

  benefitCardsWrap.addEventListener('mouseleave', resetCards);
}

initBenefitCardsMagnet();
