const services = document.querySelectorAll('.service');
const processSteps = document.querySelectorAll('.process-step');
const scrollLinks = document.querySelectorAll('[data-scroll-target]');

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
