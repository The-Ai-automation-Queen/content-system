/* Shift & Lead motion system.
   One file, no dependencies, no build step. Deployed as /lib/motion.js on
   guides.shiftandlead.com and /motion.js on www.shiftandlead.com (same file,
   keep the two copies identical).
   Content is fully visible with JS off: the hidden state only exists under
   the html.mo class, which this script sets. Respects prefers-reduced-motion. */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var css = [
    'html.mo{scroll-behavior:smooth}',
    'html.mo a,html.mo button,html.mo summary,html.mo [class*="btn"],html.mo .nav-cta,html.mo [class*="card"],html.mo [class*="pill"],html.mo [class*="chip"]{transition:background-color .22s ease,color .22s ease,border-color .22s ease,box-shadow .22s ease,transform .22s ease,opacity .22s ease}',
    'html.mo .nav-cta:hover,html.mo [class*="btn"]:hover{transform:translateY(-1px)}',
    'html.mo [data-mo]{opacity:0;transform:translateY(16px);transition:opacity .55s ease,transform .55s cubic-bezier(.22,.61,.36,1)}',
    'html.mo [data-mo].mo-in{opacity:1;transform:none}'
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function init() {
    document.documentElement.classList.add('mo');

    // Reveal targets: page sections, card-like blocks, and the direct
    // children of simple article wrappers. Chrome (nav/footer) never moves.
    var candidates = document.querySelectorAll('section, [class*="card"], .wrap > *, .step');
    var targets = [];
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (el.closest('nav, footer, .nav, .footer')) continue;
      if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
      targets.push(el);
    }
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      var shown = 0;
      for (var j = 0; j < entries.length; j++) {
        var e = entries[j];
        if (!e.isIntersecting) continue;
        var el = e.target;
        el.style.transitionDelay = Math.min(shown * 60, 300) + 'ms';
        el.classList.add('mo-in');
        io.unobserve(el);
        shown++;
      }
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

    for (var k = 0; k < targets.length; k++) {
      targets[k].setAttribute('data-mo', '');
      io.observe(targets[k]);
    }

    // Count-up for stat figures like "1 min", "97%", "42 sec".
    // Targets .stat .n (case studies) and anything opted in via data-count.
    // The www homepage keeps its own inline count-up on bare .stat cells.
    var stats = document.querySelectorAll('.stat .n, [data-count]');
    if (!stats.length) return;
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        sio.unobserve(e.target);
        countUp(e.target);
      });
    }, { threshold: 0.4 });
    stats.forEach(function (s) { sio.observe(s); });

    function countUp(el) {
      var raw = el.textContent;
      var m = raw.match(/^(\D*?)(\d+(?:[.,]\d+)?)(.*)$/);
      if (!m) return;
      var target = parseFloat(m[2].replace(',', '.'));
      if (!isFinite(target)) return;
      var decimals = (m[2].split(/[.,]/)[1] || '').length;
      var t0 = null, dur = 900;
      function frame(t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = m[1] + (target * eased).toFixed(decimals) + m[3];
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = raw;
      }
      requestAnimationFrame(frame);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
