// Guides grid: images drift slightly on scroll. Cards are never hidden,
// so a fast scroll or a slow phone can't leave blank spaces.
// Without GSAP or with reduced motion, the grid simply shows as is.
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const cards = gsap.utils.toArray('.gb-card');
  if (!cards.length) return;
  cards.forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
