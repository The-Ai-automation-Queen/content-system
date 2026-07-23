/* Shift & Lead motion system.
   One file, no dependencies, no build step. Deployed as /lib/motion.js on
   guides.shiftandlead.com and /motion.js on www.shiftandlead.com (same file,
   keep the two copies identical).
   Content is fully visible with JS off: the hidden state only exists under
   the html.mo class, which this script sets. Respects prefers-reduced-motion.

   Reveal reliability (the hidden state must always resolve to visible):
   - The IntersectionObserver animates sections as they enter the viewport.
   - A getBoundingClientRect pass on init reveals anything already scrolled
     past (deep links like /#cases or /#contact would otherwise leave the
     sections above the anchor stuck at opacity:0 forever).
   - A scroll backstop and a one-shot timeout reveal any in-view target the
     observer missed, without touching content still below the fold, so no
     section can be left blank while progressive reveal is preserved.
   - If anything throws after html.mo is set, we fail open (remove html.mo) so
     content is never trapped invisible. */
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
    var root = document.documentElement;
    root.classList.add('mo');

    try {
      // Reveal targets: page sections, card-like blocks, and the direct
      // children of simple article wrappers. Chrome (nav/footer) never moves.
      var candidates = document.querySelectorAll('section, [class*="card"], .wrap > *, .step');
      var targets = [];
      for (var i = 0; i < candidates.length; i++) {
        var el = candidates[i];
        if (el.closest('nav, footer, .nav, .footer')) continue;
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
        el.setAttribute('data-mo', '');
        targets.push(el);
      }

      if (targets.length) {
        var remaining = targets.length;

        function reveal(el) {
          if (el.classList.contains('mo-in')) return;
          el.classList.add('mo-in');
          remaining--;
        }

        var io = new IntersectionObserver(function (entries) {
          var shown = 0;
          for (var j = 0; j < entries.length; j++) {
            var e = entries[j];
            if (!e.isIntersecting) continue;
            e.target.style.transitionDelay = Math.min(shown * 60, 300) + 'ms';
            reveal(e.target);
            io.unobserve(e.target);
            shown++;
          }
        }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

        for (var k = 0; k < targets.length; k++) io.observe(targets[k]);

        // Backstop: reveal every not-yet-revealed target that is already at or
        // above the top of the viewport. Only touches in-view / scrolled-past
        // content, so anything still below the fold keeps its animated reveal.
        function rescue() {
          var vh = window.innerHeight || document.documentElement.clientHeight;
          for (var i = 0; i < targets.length; i++) {
            var t = targets[i];
            if (t.classList.contains('mo-in')) continue;
            if (t.getBoundingClientRect().top < vh * 0.95) { reveal(t); io.unobserve(t); }
          }
          if (remaining <= 0) window.removeEventListener('scroll', onScroll);
        }

        var ticking = false;
        function onScroll() {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(function () { ticking = false; rescue(); });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        // Deep-link case: reveal sections scrolled past before the observer runs.
        requestAnimationFrame(rescue);
        // Final safety net for the initial viewport (observer misfire / stall).
        setTimeout(rescue, 1200);
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
        if (el.getAttribute('data-counted')) return;
        el.setAttribute('data-counted', '1');
        var raw = el.textContent;
        var m = raw.match(/^(\D*?)(\d+(?:[.,]\d+)?)(.*)$/);
        if (!m) return;
        var target = parseFloat(m[2].replace(',', '.'));
        if (!isFinite(target)) { el.textContent = raw; return; }
        var decimals = (m[2].split(/[.,]/)[1] || '').length;
        var t0 = null, dur = 900;
        function frame(t) {
          if (t0 === null) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = m[1] + (target * eased).toFixed(decimals) + m[3];
          // Stop when finished or if the node has left the DOM; always land on
          // the exact source text so the animation can never freeze mid-count.
          if (p < 1 && el.isConnected) requestAnimationFrame(frame);
          else el.textContent = raw;
        }
        requestAnimationFrame(frame);
      }
    } catch (err) {
      // Fail open: never leave content trapped under the hidden state.
      root.classList.remove('mo');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
