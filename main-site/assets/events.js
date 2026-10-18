/* Cookie-free click and form counts via Vercel Web Analytics custom events.
   Never send personal details: keys that look like email/name/phone are dropped. */
(() => {
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  window.slTrack = function (name, data) {
    const clean = {};
    for (const [k, v] of Object.entries(data || {})) {
      if (!/email|name|phone/i.test(k) && v != null) clean[k] = String(v).slice(0, 100);
    }
    clean.page = location.pathname;
    window.va('event', { name, data: clean });
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    const label = (a.textContent || '').trim().slice(0, 60);
    if (href.includes('work-with-fatiha')) window.slTrack('work_with_me_click', { label });
    else if (href.includes('skool.com')) window.slTrack('community_click', { label, members: String(href.includes('/about')) });
    else if (href.includes('buy.stripe.com') || href.includes('/api/purchase')) window.slTrack('workbook_buy_click', { label, product: new URL(a.href).searchParams.get('utm_content') || '' });
  });
})();
