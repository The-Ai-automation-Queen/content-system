/* Shift & Lead shared email capture.
   Source of truth: shared/assets/capture.js

   Every capture form on every site uses this. It reads the lead source from
   the form's data-source attribute, keeps the honeypot behaviour, and posts to
   the same two endpoints the site has always used: Formspree for delivery and
   the n8n webhook for the GHL handoff. Endpoints are not configurable here on
   purpose. Changing one is a deliberate edit to this file. */

(function () {
  'use strict';

  var FORMSPREE = 'https://formspree.io/f/xgojoyka';
  var WEBHOOK = 'https://auto.shiftandlead.com/webhook/formspree-lead';

  function source(form) {
    var s = form.getAttribute('data-source') || 'site';
    var page = document.body.getAttribute('data-page');
    return page ? s + '-' + page : s;
  }

  function wire(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var button = form.querySelector('button');
      var emailField = form.querySelector('[name="email"]');
      var honeypot = form.querySelector('[name="_gotcha"]');
      if (!button || !emailField) return;

      // Bot filled the hidden field. Say nothing useful, send nothing.
      if (honeypot && honeypot.value) {
        button.textContent = 'Done.';
        return;
      }

      var email = emailField.value;
      var payload = JSON.stringify({ email: email, source: source(form) });

      button.disabled = true;
      button.textContent = 'Sending...';

      fetch(FORMSPREE, {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: payload
      }).then(function (r) {
        if (r.ok) {
          button.textContent = 'You are on the list.';
          form.setAttribute('data-state', 'done');
        } else {
          button.disabled = false;
          button.textContent = 'Try again';
        }
      }).catch(function () {
        button.disabled = false;
        button.textContent = 'Try again';
      });

      fetch(WEBHOOK, {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: payload
      }).catch(function () { /* delivery already handled by Formspree */ });
    });
  }

  function init() {
    var forms = document.querySelectorAll('form.capture-form');
    for (var i = 0; i < forms.length; i++) wire(forms[i]);

    // Remember which guides have been read, for the library page continue link.
    var slug = document.body.getAttribute('data-page');
    if (!slug) return;
    try {
      var read = JSON.parse(localStorage.getItem('sl_read') || '[]');
      if (read.indexOf(slug) === -1) {
        read.push(slug);
        localStorage.setItem('sl_read', JSON.stringify(read));
      }
    } catch (err) { /* private mode, nothing to do */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
