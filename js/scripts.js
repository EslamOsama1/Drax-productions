/* DRAX — navigation and progressive scroll effects, no dependencies. */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('#mainNav');
  const toggle = document.querySelector('.navbar-toggler');
  const menu = document.querySelector('#navbarResponsive');
  const links = [...document.querySelectorAll('#mainNav .nav-link')];
  const mobile = window.matchMedia('(max-width: 991px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setMenu = (open) => {
    menu.hidden = mobile.matches && !open;
    toggle.setAttribute('aria-expanded', String(mobile.matches && open));
    nav.classList.toggle('menu-open', mobile.matches && open);
  };
  setMenu(false);
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  mobile.addEventListener('change', () => setMenu(false));
  links.forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) setMenu(false);
  });

  const sections = [...document.querySelectorAll('section[id]')];
  let ticking = false;
  const updateNavigation = () => {
    nav.classList.toggle('navbar-shrink', window.scrollY > 24);
    const marker = nav.getBoundingClientRect().height + window.innerHeight * .22;
    let current = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= marker) current = section.id;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
      current = sections.at(-1)?.id || current;
    }
    links.forEach(link => {
      const active = link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const items = document.querySelectorAll('.about-wrapper,.project-card,.team-member,.team-heading,.section-heading,.section-title,.contact-circle');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else if (entry.boundingClientRect.top > window.innerHeight || entry.boundingClientRect.bottom < 0) {
          // Replay only after the whole item leaves the screen, avoiding flicker.
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px 40px 0px' });
    items.forEach(item => { item.classList.add('reveal-item'); observer.observe(item); });
    document.documentElement.classList.add('motion-ready');
    reducedMotion.addEventListener('change', event => {
      document.documentElement.classList.toggle('motion-ready', !event.matches);
    });
  }
});
