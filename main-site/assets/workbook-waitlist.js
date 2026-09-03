(function () {
  'use strict';
  var endpoint = '/api/workbook-waitlist';
  function track(name, data) { if (typeof window.slTrack === 'function') window.slTrack(name, data || {}); }
  function localTestMode() {
    var local = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return local ? new URLSearchParams(window.location.search).get('test') : '';
  }
  function init() {
    var page = document.body.getAttribute('data-product');
    track('workbook_view', { product_slug: page, source_page: window.location.pathname });
    document.querySelectorAll('[data-workbook-waitlist]').forEach(function (form) {
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        var button = form.querySelector('button');
        var status = form.querySelector('[role=status]');
        var consent = form.querySelector('[name=consent]');
        if (!form.reportValidity() || !consent.checked) return;
        button.disabled = true;
        button.textContent = 'Joining...';
        status.textContent = '';
        var product = form.querySelector('[name=product]').value;
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
                product: product,
                source: 'workbook-waitlist-' + product,
                consent: true,
                website: form.querySelector('[name=website]').value,
                timestamp: new Date().toISOString()
              })
            });
            if (!response.ok) throw new Error('Waitlist request failed');
          }
          form.reset();
          button.textContent = 'You are on the list';
          status.textContent = 'Thank you. I will email you when this workbook is ready.';
          track('workbook_waitlist', { product_slug: product, source_page: window.location.pathname, consent_state: 'yes' });
        } catch (error) {
          button.disabled = false;
          button.textContent = 'Join the waitlist';
          status.textContent = 'That did not go through. Please try again.';
        }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
