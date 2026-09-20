(function () {
  'use strict';
  var endpoint = '/api/opportunity-interest';
  function localTestMode() {
    var local = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return local ? new URLSearchParams(window.location.search).get('test') : '';
  }
  function init() {
    var form = document.querySelector('[data-opportunity-interest]');
    if (!form) return;
    document.querySelectorAll('[data-interest-choice]').forEach(function (button) {
      button.addEventListener('click', function () {
        var option = form.querySelector('[name=offer][value="' + button.getAttribute('data-interest-choice') + '"]');
        if (option) option.checked = true;
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      var button = form.querySelector('[type=submit]');
      var status = form.querySelector('[role=status]');
      var selected = form.querySelector('[name=offer]:checked');
      if (!form.reportValidity() || !selected) return;
      button.disabled = true;
      button.textContent = 'Registering...';
      status.textContent = '';
      try {
        var mode = localTestMode();
        if (mode === 'failure') throw new Error('Local failure test');
        if (mode !== 'success') {
          var response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              firstName: form.querySelector('[name=firstName]').value,
              email: form.querySelector('[name=email]').value,
              offer: selected.value,
              source: window.location.pathname,
              consent: form.querySelector('[name=consent]').checked,
                marketingConsent: form.querySelector('[name=marketingConsent]').checked,
              website: form.querySelector('[name=website]').value
            })
          });
          if (!response.ok) throw new Error('Interest request failed');
        }
        form.reset();
        button.textContent = 'Interest registered';
        status.textContent = 'Thank you. I will let you know when the first version is ready.';
        if (typeof window.slTrack === 'function') window.slTrack('opportunity_interest', { offer: selected.value });
      } catch (error) {
        button.disabled = false;
        button.textContent = 'Register my interest';
        status.textContent = 'That did not go through. Please try again.';
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
