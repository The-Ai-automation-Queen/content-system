(function(){
  function track(name, data){
    try { if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, data || {}); } catch(e){}
  }
  document.addEventListener('click', function(e){
    var a=e.target.closest('a'); if(!a) return;
    var href=a.getAttribute('href')||'';
    if(href.indexOf('/guides/')===0 || href.indexOf('guides/')===0) track('guide_click',{href:href});
    if(href.indexOf('/quiz')===0) track('quiz_click',{href:href});
    if(href.indexOf('/workshops')===0) track('workshop_click',{href:href});
    if(href.indexOf('/build-sprint')===0) track('build_with_me_click',{href:href});
  });
  document.addEventListener('submit', function(e){
    var f=e.target; if(!f || !f.matches('form')) return;
    var source=(f.querySelector('[name=source]')||{}).value||f.getAttribute('data-source')||'unknown';
    track('form_submit',{source:source});
    if(f.matches('.apply-form')) track('build_application',{source_page:window.location.pathname});
    if(f.matches('.booking-form')) track('workshop_application',{source_page:window.location.pathname});
  }, true);
  window.slTrack=track;
})();
