/* Contextual companion capture. One request per submit; instant access after success. */
(function () {
  'use strict';

  var forms = document.querySelectorAll('[data-lead-magnet-form]');
  if (!forms.length) return;

  forms.forEach(function (form) {
    var wrap = form.closest('.guide-lead-magnet');
    var button = form.querySelector('button[type="submit"]');
    var status = wrap && wrap.querySelector('.lm-status');
    var resource = wrap && wrap.querySelector('.lm-resource');
    var originalLabel = button ? button.textContent : 'Get the resource';

    function ready(message) {
      if (wrap) wrap.classList.add('is-ready');
      if (resource) resource.removeAttribute('aria-hidden');
      if (status) status.textContent = message || 'Your resource is ready.';
      if (button) {
        button.disabled = true;
        button.textContent = 'Ready';
      }
    }

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var email = form.querySelector('[name="email"]');
      var gotcha = form.querySelector('[name="_gotcha"]');
      if (gotcha && gotcha.value) {
        ready('Your resource is ready.');
        return;
      }

      if (!button || !email) return;
      button.disabled = true;
      button.textContent = 'Sending…';
      if (status) status.textContent = '';

      var payload = {
        email: email.value.trim(),
        source: form.getAttribute('data-source') || 'guide-lead-magnet',
        lead_magnet: form.getAttribute('data-lead-magnet') || '',
        guide: form.getAttribute('data-guide') || '',
        _gotcha: gotcha ? gotcha.value : ''
      };

      try {
        var response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Lead capture failed with status ' + response.status);
        ready('Your resource is ready below.');
      } catch (error) {
        button.disabled = false;
        button.textContent = originalLabel;
        if (status) status.textContent = 'Something went wrong. Please try again.';
        console.error('Guide lead magnet submission failed', error);
      }
    });
  });
})();
