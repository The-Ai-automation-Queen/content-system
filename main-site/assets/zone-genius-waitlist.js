(function () {
  'use strict';

  var form = document.querySelector('#zone-genius-waitlist');
  if (!form) return;

  var button = form.querySelector('button[type="submit"]');
  var status = form.querySelector('[data-waitlist-status]');
  var originalLabel = button ? button.textContent : 'Join the beta waitlist';

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.reportValidity() || !button) return;

    var email = form.querySelector('[name="email"]');
    var consent = form.querySelector('[name="consent"]');
    var website = form.querySelector('[name="website"]');
    var source = form.querySelector('[name="source"]');

    if (website && website.value) {
      form.reset();
      if (status) status.textContent = 'You are on the waitlist.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Joining...';
    if (status) status.textContent = '';

    try {
      var response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email: email ? email.value.trim() : '',
          consent: !!(consent && consent.checked),
          website: website ? website.value : '',
          source: source ? source.value : 'zone-genius-product-page'
        })
      });
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok) throw new Error(result.error || 'Waitlist request failed');
      form.reset();
      button.textContent = 'You are on the waitlist';
      if (status) status.textContent = 'You are on the waitlist. I will email you when the beta opens.';
    } catch (error) {
      button.disabled = false;
      button.textContent = originalLabel;
      if (status) status.textContent = error.message || 'Something went wrong. Please try again.';
    }
  });
})();
