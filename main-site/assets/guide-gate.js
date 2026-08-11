/* One email unlocks the guide library through a native HighLevel form. */
(function () {
  'use strict';

  var GHL_FORM = 'https://api.leadconnectorhq.com/widget/form/80JnRdnLXVVmtEzKEpTJ';
  var GHL_IFRAME_ID = 'inline-80JnRdnLXVVmtEzKEpTJ';
  var ACCESS_KEY = 'sl_guide_library_access';
  var pendingUrl = '';
  var pendingSlug = '';
  var lastFocus = null;

  function hasAccess() {
    try { return localStorage.getItem(ACCESS_KEY) === 'yes'; }
    catch (error) { return false; }
  }

  function rememberAccess() {
    try { localStorage.setItem(ACCESS_KEY, 'yes'); }
    catch (error) { /* Access still works for this visit. */ }
  }

  function titleFromSlug(slug) {
    var names = {
      ai: 'AI',
      chatgpt: 'ChatGPT',
      copilot: 'Copilot',
      deepseek: 'DeepSeek',
      gemini: 'Gemini',
      grok: 'Grok',
      kimi: 'Kimi',
      manus: 'Manus',
      meta: 'Meta',
      mistral: 'Mistral'
    };
    return (slug || 'your guide')
      .split('-')
      .map(function (word) { return names[word] || (word.charAt(0).toUpperCase() + word.slice(1)); })
      .join(' ');
  }

  function guideFromAnchor(anchor) {
    if (!anchor || anchor.hasAttribute('data-no-guide-gate')) return null;
    var url;
    try { url = new URL(anchor.href, window.location.href); }
    catch (error) { return null; }
    if (url.origin !== window.location.origin) return null;
    var match = url.pathname.match(/^\/guides\/([a-z0-9-]+)\.html$/i);
    if (!match) return null;
    return { url: url.href, slug: match[1], title: titleFromSlug(match[1]) };
  }

  function buildModal() {
    var modal = document.createElement('div');
    modal.className = 'guide-gate';
    modal.id = 'guide-gate';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="guide-gate__backdrop" data-guide-gate-close></div>' +
      '<section class="guide-gate__dialog" role="dialog" aria-modal="true" aria-labelledby="guide-gate-title">' +
        '<button class="guide-gate__close" type="button" aria-label="Close" data-guide-gate-close>&times;</button>' +
        '<p class="guide-gate__eyebrow">Free guide library</p>' +
        '<h2 class="guide-gate__title" id="guide-gate-title">Where should I send your access?</h2>' +
        '<p class="guide-gate__copy"><span data-guide-name>Your guide</span> is free. Enter your email once to unlock the entire library.</p>' +
        '<div class="guide-gate__form-frame" data-guide-form-frame></div>' +
        '<p class="guide-gate__status" role="status" aria-live="polite"></p>' +
      '</section>';
    document.body.appendChild(modal);
    return modal;
  }

  function openModal(guide) {
    var modal = document.getElementById('guide-gate') || buildModal();
    pendingUrl = guide.url;
    pendingSlug = guide.slug;
    lastFocus = document.activeElement;
    modal.querySelector('[data-guide-name]').textContent = guide.title;
    modal.querySelector('.guide-gate__status').textContent = '';
    mountGhlForm(modal.querySelector('[data-guide-form-frame]'));
    modal.hidden = false;
    document.body.classList.add('guide-gate-open');
    window.setTimeout(function () { modal.querySelector('.guide-gate__close').focus(); }, 0);
  }

  function closeModal() {
    var modal = document.getElementById('guide-gate');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('guide-gate-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function campaignData() {
    var params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || ''
    };
  }

  function formUrl() {
    var tracking = campaignData();
    var url = new URL(GHL_FORM);
    url.searchParams.set('utm_source', tracking.utm_source || 'shiftandlead');
    url.searchParams.set('utm_medium', tracking.utm_medium || 'guide-library');
    url.searchParams.set('utm_campaign', tracking.utm_campaign || ('guide-' + pendingSlug));
    url.searchParams.set('utm_content', tracking.utm_content || pendingSlug);
    url.searchParams.set('guide', pendingSlug);
    return url.href;
  }

  function mountGhlForm(container) {
    if (!container) return;
    var current = container.querySelector('iframe');
    var src = formUrl();
    if (current && current.src === src) return;
    container.textContent = '';
    var iframe = document.createElement('iframe');
    iframe.id = GHL_IFRAME_ID;
    iframe.name = GHL_IFRAME_ID;
    iframe.src = src;
    iframe.title = 'Shift & Lead Guide Access';
    iframe.setAttribute('allow', 'forms');
    container.appendChild(iframe);
  }

  document.addEventListener('click', function (event) {
    var close = event.target.closest('[data-guide-gate-close]');
    if (close) { closeModal(); return; }

    var anchor = event.target.closest('a[href]');
    var guide = guideFromAnchor(anchor);
    if (!guide || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (hasAccess()) return;
    event.preventDefault();
    openModal(guide);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });

  window.addEventListener('message', function (event) {
    var iframe = document.getElementById(GHL_IFRAME_ID);
    if (!iframe || event.source !== iframe.contentWindow || !Array.isArray(event.data)) return;
    if (event.data[0] !== 'set-sticky-contacts') return;
    if (String(event.data[1] || '').indexOf('embedded_iframe_') !== 0) return;
    rememberAccess();
    var status = document.querySelector('.guide-gate__status');
    if (status) status.textContent = 'You are in. Opening your guide...';
    window.setTimeout(function () { window.location.assign(pendingUrl); }, 450);
  });

  function openFromCampaignLink() {
    if (hasAccess()) return;
    var params = new URLSearchParams(window.location.search);
    var slug = (params.get('guide') || '').toLowerCase();
    if (!/^[a-z0-9-]+$/.test(slug)) return;
    openModal({
      slug: slug,
      title: titleFromSlug(slug),
      url: new URL('/guides/' + slug + '.html', window.location.origin).href
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', openFromCampaignLink);
  } else {
    openFromCampaignLink();
  }
})();
