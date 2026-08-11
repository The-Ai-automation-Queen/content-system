/* Contextual companion capture. One request per submit; instant access after success. */
(function () {
  'use strict';

  var forms = document.querySelectorAll('[data-lead-magnet-form], .js-guide-lead-form');
  if (!forms.length) return;

  forms.forEach(function (form) {
    var wrap = form.closest('.guide-lead-magnet');
    var button = form.querySelector('button[type="submit"]');
    var status = (wrap && (wrap.querySelector('.lm-status') || wrap.querySelector('.form-status'))) || form.querySelector('.form-status');
    var resource = wrap && wrap.querySelector('.lm-resource');
    var originalLabel = button ? button.textContent : 'Get the resource';
    var resourcePath = form.getAttribute('data-resource-path') || '';
    var fallbackEndpoint = 'https://auto.shiftandlead.com/webhook/formspree-lead';

    function value(name) {
      var field = form.querySelector('[name="' + name + '"]');
      return field ? String(field.value || '').trim() : '';
    }

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
      var consent = form.querySelector('[name="consent"]');
      var gotcha = form.querySelector('[name="_gotcha"]');
      if (gotcha && gotcha.value) {
        ready('Your resource is ready.');
        if (resourcePath) window.setTimeout(function () { window.location.assign(resourcePath); }, 500);
        return;
      }

      if (!button || !email) return;
      if (consent && consent.required && !consent.checked) {
        if (status) status.textContent = 'Please confirm the consent box to continue.';
        consent.focus();
        return;
      }

      button.disabled = true;
      button.textContent = 'Sending…';
      if (status) status.textContent = '';

      var payload = {
        email: email.value.trim(),
        source: form.getAttribute('data-source') || value('source') || 'guide-lead-magnet',
        lead_magnet: form.getAttribute('data-lead-magnet') || form.getAttribute('data-resource-name') || '',
        guide: form.getAttribute('data-guide') || '',
        intent: value('intent'),
        consent: consent ? !!consent.checked : true,
        _gotcha: gotcha ? gotcha.value : ''
      };

      var explicitAction = form.getAttribute('action');
      var endpoint = explicitAction || fallbackEndpoint;

      try {
        var response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Lead capture failed with status ' + response.status);
        ready(resourcePath ? 'Your resource is ready. Opening it now…' : 'Your resource is ready below.');
        if (resourcePath) {
          window.setTimeout(function () { window.location.assign(resourcePath); }, 650);
        }
      } catch (error) {
        button.disabled = false;
        button.textContent = originalLabel;
        if (status) status.textContent = 'Something went wrong. Please try again.';
        console.error('Guide lead magnet submission failed', error);
      }
    });
  });
})();
