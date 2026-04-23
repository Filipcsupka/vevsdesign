export function initParallax() {
  const hero = document.getElementById('hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  function updateHeroParallax() {
    const heroHeight = Math.max(hero.offsetHeight, 1);
    const y = Math.min(Math.max(window.scrollY, 0), heroHeight);
    const progress = Math.min(y / heroHeight, 1);

    hero.style.setProperty('--hero-logo-y', `${y * 0.16}px`);
    hero.style.setProperty('--hero-copy-y', `${y * 0.22}px`);
    hero.style.setProperty('--hero-ring-y', `${y * 0.08}px`);
    hero.style.setProperty('--hero-line-y', `${y * 0.14}px`);
    hero.style.setProperty('--hero-glow-y', `${y * 0.28}px`);
    hero.style.setProperty('--hero-scroll-y', `${y * 0.1}px`);
    hero.style.setProperty('--hero-parallax-progress', progress.toFixed(3));
    ticking = false;
  }

  function requestHeroParallax() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateHeroParallax);
  }

  window.addEventListener('scroll', requestHeroParallax, { passive: true });
  window.addEventListener('resize', requestHeroParallax, { passive: true });
  updateHeroParallax();
}
