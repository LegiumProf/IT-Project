const services = document.querySelectorAll('.service');
const processSteps = document.querySelectorAll('.process-step');
const scrollLinks = document.querySelectorAll('[data-scroll-target]');
const projectGrids = document.querySelectorAll('[data-projects-grid]');
const TELEGRAM_BOT_TOKEN = '8071276278:AAFvWUUM8QMGqgiJ9Oe-_K1M8u5VCqnpZos';
const TELEGRAM_CHAT_ID = '1209666138';
const TELEGRAM_PROFILE_URL = 'https://t.me/LegiumProf';
const VK_PROFILE_URL = 'https://vk.com/semyonoffvadick';
const CONTACT_EMAIL = 'semyonoffvadick@yandex.ru';

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

function initContactEmail() {
  const socialsBlocks = document.querySelectorAll('.contact__socials');

  socialsBlocks.forEach(socials => {
    const parent = socials.parentElement;

    if (!parent || parent.querySelector('.contact__email')) return;

    const emailLink = document.createElement('a');

    emailLink.className = 'contact__email';
    emailLink.href = `mailto:${CONTACT_EMAIL}`;
    emailLink.textContent = CONTACT_EMAIL;

    socials.insertAdjacentElement('afterend', emailLink);
  });
}

initContactEmail();

function initNavContactLink() {
  const navLinks = document.querySelectorAll('.nav a');
  const contactLink = navLinks[navLinks.length - 1];

  if (!contactLink) return;

  const isContactsPage = window.location.pathname.toLowerCase().endsWith('/contacts.html')
    || window.location.pathname.toLowerCase().endsWith('\\contacts.html')
    || window.location.pathname.toLowerCase().endsWith('contacts.html');

  contactLink.setAttribute('href', isContactsPage ? '#contact' : 'contacts.html');
}

initNavContactLink();

function initExternalLinks() {
  document.querySelectorAll('.cta__btn').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      window.open(TELEGRAM_PROFILE_URL, '_blank', 'noopener,noreferrer');
    });
  });

  document.querySelectorAll('.contact__social[aria-label="Telegram"]').forEach(link => {
    link.setAttribute('href', TELEGRAM_PROFILE_URL);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('.contact__social[aria-label="VK"]').forEach(link => {
    link.setAttribute('href', VK_PROFILE_URL);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

initExternalLinks();

function initMobileMenu() {
  const header = document.querySelector('.header');
  const headerActions = document.querySelector('.header__actions');
  const nav = document.querySelector('.nav');

  if (!header || !headerActions || !nav) return;

  let menuToggle = headerActions.querySelector('.header__menu-toggle');

  if (!menuToggle) {
    menuToggle = document.createElement('button');
    menuToggle.className = 'header__menu-toggle';
    menuToggle.type = 'button';
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7H21" stroke="#171717" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M3 12H21" stroke="#171717" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M3 17H21" stroke="#171717" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;
    headerActions.append(menuToggle);
  }

  const closeMenu = () => {
    header.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');

    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', event => {
    if (!header.classList.contains('menu-open')) return;
    if (event.target.closest('.header__inner')) return;

    closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

initMobileMenu();

function initTelegramForms() {
  const contactForms = document.querySelectorAll('.contact__form');

  if (!contactForms.length) return;

  contactForms.forEach(form => {
    const submitButton = form.querySelector('.contact__submit');
    let statusMessage = form.querySelector('.contact__status');

    if (!statusMessage) {
      statusMessage = document.createElement('p');
      statusMessage.className = 'contact__status';
      statusMessage.setAttribute('aria-live', 'polite');
      form.append(statusMessage);
    }

    form.addEventListener('submit', async event => {
      event.preventDefault();

      const formData = new FormData(form);

      const name = (formData.get('name') || '').toString().trim();
      const contact = (formData.get('contact') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();
      const hidden_field = (formData.get('hidden_field') || '').toString().trim();

      const pageTitle = document.title;
      const pageUrl = window.location.href;

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
      }

      statusMessage.textContent = '';
      statusMessage.classList.remove('is-success', 'is-error');

      try {
        const response = await fetch('https://portfolio-server-six-topaz.vercel.app/api/send-telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hidden_field,
            name,
            contact,
            message,
            pageTitle,
            pageUrl,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Ошибка отправки');
        }

        if (submitButton) {
          submitButton.textContent = 'Отправлено';
        }

        statusMessage.textContent = 'Сообщение успешно отправлено. Скоро свяжусь с вами.';
        statusMessage.classList.add('is-success');

        form.reset();
      } catch (error) {
        if (submitButton) {
          submitButton.textContent = 'Ошибка отправки';
        }

        statusMessage.textContent = 'Не удалось отправить форму. Попробуйте ещё раз.';
        statusMessage.classList.add('is-error');

        console.error('Form submit error:', error);
      } finally {
        window.setTimeout(() => {
          if (!submitButton) return;

          submitButton.disabled = false;
          submitButton.textContent = 'Отправить';
        }, 2000);
      }
    });
  });
}

initTelegramForms();

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

function initRevealOnScroll() {
  const revealTargets = document.querySelectorAll(`
    .hero__subtitle,
    .hero__title,
    .hero__desc,
    .hero__buttons,
    .hero__right,
    .stats__panel,
    .projects__header,
    .project-card,
    .services__title,
    .service,
    .cta__inner,
    .contact__info,
    .contact__form-wrap,
    .footer__inner,
    .page-intro .container,
    .about-section__row,
    .about-benefits__title,
    .benefit-card,
    .work-process__intro,
    .process-step,
    .project-back,
    .project-description .project-container,
    .project-decorative .project-container,
    .project-technologies .project-container,
    .project-gallery,
    .project-gallery .project-container
  `);

  if (!revealTargets.length) return;

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(element => {
      element.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -8% 0px',
  });

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 60}ms`;
    observer.observe(element);
  });
}

initRevealOnScroll();
