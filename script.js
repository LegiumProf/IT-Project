const services = document.querySelectorAll('.service');
const scrollLinks = document.querySelectorAll('[data-scroll-target]');

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
