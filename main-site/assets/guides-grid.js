// Guides grid: cards rise in as they enter, images drift slightly on scroll.
// Without GSAP or with reduced motion, the grid simply shows as is.
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const cards = gsap.utils.toArray('.gb-card');
  if (!cards.length) return;
  gsap.set(cards, { y: 48, opacity: 0 });
  ScrollTrigger.batch(cards, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12, overwrite: true }),
  });
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
