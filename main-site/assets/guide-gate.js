/* Shift & Lead guide access. One successful email unlocks every free guide on this device. */
(function () {
  'use strict';

  var ACCESS_KEY = 'shift-lead-guide-access';
  var slug = document.body.getAttribute('data-page');
  if (!slug) return;

  function track(name, data) {
    if (typeof window.slTrack === 'function') window.slTrack(name, data || {});
  }

  function isReview() {
    var host = window.location.hostname;
    var allowed = host === 'localhost' || host === '127.0.0.1' || /\.vercel\.app$/.test(host);
    return allowed && new URLSearchParams(window.location.search).get('review') === '1';
  }

  function hasAccess() {
    if (new URLSearchParams(window.location.search).get('gate') === '1') return false;
    if (isReview()) return true;
    try { return localStorage.getItem(ACCESS_KEY) === 'true'; }
    catch (error) { return false; }
  }

  function campaign() {
    var params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
      utmContent: params.get('utm_content') || ''
    };
  }

  function showGate() {
    if (hasAccess()) {
      track('guide_open', { guide_slug: slug, source_page: window.location.pathname });
      return;
    }

    var cover = document.querySelector('meta[property="og:image"]');
    var coverUrl = cover ? cover.getAttribute('content') : '';
    var gate = document.createElement('main');
    gate.className = 'sl-guide-access';
    gate.style.setProperty('--guide-cover', 'url("' + coverUrl + '")');
    gate.innerHTML =
      '<section class="sl-guide-access__panel" aria-labelledby="sl-guide-access-title">' +
        '<p class="sl-guide-access__eyebrow">Free guide</p>' +
        '<h1 id="sl-guide-access-title">Access the guide</h1>' +
        '<p>Enter your email to read the guide and receive its link. Marketing emails are optional.</p>' +
        '<form novalidate>' +
          '<label for="sl-guide-first-name">First name <span>(optional)</span></label>' +
          '<input id="sl-guide-first-name" name="firstName" type="text" autocomplete="given-name">' +
          '<label for="sl-guide-email">Email address</label>' +
          '<input id="sl-guide-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com">' +
          '<input class="sl-guide-access__trap" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">' +
          '<label><input name="marketingConsent" type="checkbox"> Also send me practical Shift &amp; Lead emails and product updates (optional). Unsubscribe at any time.</label>' +
          '<button type="submit">Access the guide</button>' +
          '<small>We use Lumail to deliver the requested email. One email unlocks all free guides on this device. <a href="/privacy.html">Privacy</a>.</small>' +
          '<strong class="sl-guide-access__status" role="alert" aria-live="polite"></strong>' +
        '</form>' +
      '</section>';
    document.body.appendChild(gate);
    document.body.classList.add('sl-guide-access-locked');
    gate.querySelector('input[name="email"]').focus();
    track('guide_gate_view', { guide_slug: slug, source_page: window.location.pathname });

    gate.querySelector('form').addEventListener('submit', async function (event) {
      event.preventDefault();
      var form = event.currentTarget;
      var email = form.elements.email;
      var button = form.querySelector('button');
      var status = form.querySelector('.sl-guide-access__status');
      if (!email.validity.valid) {
        status.textContent = 'Enter a valid email address.';
        email.focus();
        return;
      }
      button.disabled = true;
      button.textContent = 'Opening...';
      status.textContent = '';
      track('guide_gate_submit', { guide_slug: slug, source_page: window.location.pathname });

      try {
        var response = await fetch('/api/guide-capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.assign({
            email: email.value,
            firstName: form.elements.firstName.value,
            website: form.elements.website.value,
            guideSlug: slug,
            source: window.location.pathname,
            consent: true,
            marketingConsent: form.elements.marketingConsent.checked,
            timestamp: new Date().toISOString()
          }, campaign()))
        });
        var result = await response.json().catch(function () { return {}; });
        if (!response.ok) throw new Error(result.error || 'We could not open the guide. Please try again.');
        try { localStorage.setItem(ACCESS_KEY, 'true'); } catch (error) { /* Current page still unlocks. */ }
        gate.remove();
        document.body.classList.remove('sl-guide-access-locked');
        track('guide_unlock', { guide_slug: slug, source_page: window.location.pathname });
      } catch (error) {
        status.textContent = error.message || 'We could not open the guide. Please try again.';
        button.disabled = false;
        button.textContent = 'Access the guide';
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showGate);
  else showGate();
})();
