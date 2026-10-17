// Labels every Stripe buy link with where the click came from (page, button, and the guide that sent the visitor),
// so each Stripe payment shows its source. No cookies, nothing stored in the browser.
(() => {
  const incoming = new URLSearchParams(location.search);
  document.querySelectorAll('a[href^="https://buy.stripe.com/"]').forEach((a) => {
    const url = new URL(a.href);
    for (const k of ["utm_source", "utm_campaign"]) if (incoming.get(k)) url.searchParams.set(k, incoming.get(k));
    const ref = ["utm_source", "utm_campaign", "utm_medium", "utm_content"].map((k) => url.searchParams.get(k)).filter(Boolean).join("_");
    url.searchParams.set("client_reference_id", ref.replace(/[^A-Za-z0-9_-]/g, "-").slice(0, 200));
    a.href = url;
  });
})();
