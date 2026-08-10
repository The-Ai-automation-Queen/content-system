/* Shift & Lead guide motion.
   Progressive enhancement: content remains readable if GSAP/CDN/JS fails.
   GSAP is loaded only on guide pages that opt into this file. */
(function(){
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  var GSAP_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
  var ST_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';

  function loadScript(src){
    return new Promise(function(resolve,reject){
      var existing = document.querySelector('script[src="' + src + '"]');
      if(existing){
        if(existing.dataset.loaded === 'true') return resolve();
        existing.addEventListener('load', resolve, {once:true});
        existing.addEventListener('error', reject, {once:true});
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.crossOrigin = 'anonymous';
      s.addEventListener('load', function(){ s.dataset.loaded = 'true'; resolve(); }, {once:true});
      s.addEventListener('error', reject, {once:true});
      document.head.appendChild(s);
    });
  }

  function fallback(){
    if(!('IntersectionObserver' in window)) return;
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-animate]'));
    targets.forEach(function(el){
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .45s ease, transform .45s ease';
    });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        io.unobserve(entry.target);
      });
    }, {rootMargin:'0px 0px -8% 0px'});
    targets.forEach(function(el){ io.observe(el); });
  }

  function ensureProgress(){
    if(document.querySelector('.guide-progress')) return;
    var track = document.createElement('div');
    track.className = 'guide-progress';
    track.setAttribute('aria-hidden','true');
    var bar = document.createElement('span');
    bar.className = 'guide-progress-bar';
    track.appendChild(bar);
    document.body.appendChild(track);
  }

  function initGSAP(){
    if(!window.gsap || !window.ScrollTrigger) return fallback();
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    ensureProgress();
    var progressBar = document.querySelector('.guide-progress-bar');
    if(progressBar){
      gsap.to(progressBar, {
        scaleX:1,
        ease:'none',
        scrollTrigger:{
          trigger:document.documentElement,
          start:'top top',
          end:'bottom bottom',
          scrub:.15
        }
      });
    }

    var isMobile = window.matchMedia && window.matchMedia('(max-width: 700px)').matches;
    var distance = isMobile ? 14 : 24;

    document.querySelectorAll('[data-animate="hero"]').forEach(function(hero){
      var children = hero.querySelectorAll('.eyebrow, h1, .verdict');
      if(!children.length) return;
      gsap.from(children, {
        opacity:0,
        y:isMobile ? 12 : 18,
        duration:.65,
        stagger:.09,
        ease:'power2.out',
        clearProps:'opacity,transform'
      });
    });

    document.querySelectorAll('[data-animate="reveal"]').forEach(function(el){
      gsap.from(el, {
        opacity:0,
        y:distance,
        duration:.62,
        ease:'power2.out',
        clearProps:'opacity,transform',
        scrollTrigger:{
          trigger:el,
          start:'top 88%',
          once:true
        }
      });
    });

    document.querySelectorAll('[data-animate="stagger"]').forEach(function(list){
      var items = Array.prototype.slice.call(list.children).filter(function(child){ return child.tagName === 'LI'; });
      if(!items.length) return;
      gsap.from(items, {
        opacity:0,
        y:isMobile ? 8 : 12,
        duration:.44,
        stagger:.09,
        ease:'power2.out',
        clearProps:'opacity,transform',
        scrollTrigger:{
          trigger:list,
          start:'top 88%',
          once:true
        }
      });
    });

    document.querySelectorAll('[data-guide-step]').forEach(function(step){
      ScrollTrigger.create({
        trigger:step,
        start:'top 62%',
        end:'bottom 42%',
        onEnter:function(){ step.classList.add('is-active'); },
        onEnterBack:function(){ step.classList.add('is-active'); },
        onLeave:function(){ step.classList.remove('is-active'); },
        onLeaveBack:function(){ step.classList.remove('is-active'); }
      });
    });

    document.querySelectorAll('[data-animate="workflow"]').forEach(function(flow){
      var nodes = flow.querySelectorAll('[data-flow-node]');
      if(!nodes.length) return;
      gsap.from(nodes, {
        opacity:.35,
        y:isMobile ? 6 : 10,
        duration:.35,
        stagger:.12,
        ease:'power1.out',
        scrollTrigger:{
          trigger:flow,
          start:'top 82%',
          once:true
        }
      });
    });

    ScrollTrigger.refresh();
  }

  function boot(){
    if(window.gsap && window.ScrollTrigger) return initGSAP();
    loadScript(GSAP_URL)
      .then(function(){ return loadScript(ST_URL); })
      .then(initGSAP)
      .catch(fallback);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
