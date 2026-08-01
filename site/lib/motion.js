/* Shift & Lead motion: fade-up reveal on scroll. One file, no dependencies.
   Same file is deployed at /lib/motion.js (guides) and /motion.js (www).

   Content is fully visible with JS off: the hidden state only exists under
   html.mo, which this script sets. Respects prefers-reduced-motion. Every
   observer disconnects once its work is done, so the page reaches browser
   idle and stays there. */
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var style = document.createElement('style');
  style.textContent =
    'html.mo [data-mo]{opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .5s ease}' +
    'html.mo [data-mo].mo-in{opacity:1;transform:none}';
  document.head.appendChild(style);

  function init() {
    var root = document.documentElement;
    root.classList.add('mo');
    try {
      var targets = [];
      var candidates = document.querySelectorAll('main section, .card, .step');
      for (var i = 0; i < candidates.length; i++) {
        if (candidates[i].closest('nav, footer')) continue;
        candidates[i].setAttribute('data-mo', '');
        targets.push(candidates[i]);
      }
      if (!targets.length) return;

      var left = targets.length;
      function reveal(el) {
        if (!el.classList.contains('mo-in')) { el.classList.add('mo-in'); left--; }
        if (left <= 0) io.disconnect();
      }
      var io = new IntersectionObserver(function (entries) {
        for (var j = 0; j < entries.length; j++) {
          if (!entries[j].isIntersecting) continue;
          reveal(entries[j].target);
          io.unobserve(entries[j].target);
        }
      }, { rootMargin: '0px 0px -8% 0px' });
      targets.forEach(function (t) { io.observe(t); });

      // Deep links: anything already at or above the viewport reveals at once.
      // One pass now, one delayed backstop, then nothing else ever runs.
      function rescue() {
        var vh = window.innerHeight;
        targets.forEach(function (t) {
          if (t.getBoundingClientRect().top < vh) { reveal(t); io.unobserve(t); }
        });
      }
      rescue();
      setTimeout(rescue, 1200);
    } catch (err) {
      root.classList.remove('mo'); // fail open, never trap content hidden
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
