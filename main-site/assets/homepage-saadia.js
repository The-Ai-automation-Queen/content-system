(() => {
  const header = document.getElementById('site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 48);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const shelf = document.getElementById('sk-books');
  document.querySelectorAll('[data-book-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!shelf) return;
      const card = shelf.querySelector('.sk-book');
      const distance = card ? card.getBoundingClientRect().width + 16 : shelf.clientWidth;
      shelf.scrollBy({
        left: (button.dataset.bookScroll === 'next' ? 1 : -1) * distance,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    });
  });

  const form = document.getElementById('sk-newsletter-form');
  const status = document.getElementById('sk-newsletter-status');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = form.querySelector('[name="email"]');
    const consent = form.querySelector('[name="marketingConsent"]');
    const button = form.querySelector('button[type="submit"]');
    if (!email?.validity.valid) {
      status.textContent = 'Enter a valid email address.';
      email?.focus();
      return;
    }
    if (!consent?.checked) {
      status.textContent = 'Please tick the box to receive the emails.';
      consent?.focus();
      return;
    }
    button.disabled = true;
    status.textContent = 'Adding you to the list…';
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value.trim(),
          marketingConsent: true,
          website: form.querySelector('[name="website"]')?.value || '',
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Please try again.');
      status.textContent = 'You’re on the list. Look out for the next guide.';
      form.reset();
    } catch (error) {
      status.textContent = error.message || 'Please try again.';
    } finally {
      button.disabled = false;
    }
  });
})();

// Kit waitlist: the ticked kits become Lumail tags.
(() => {
  const form = document.getElementById('sk-kit-form');
  const status = document.getElementById('sk-kit-status');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const kits = [...document.querySelectorAll('input[name="kits"][form="sk-kit-form"]:checked')].map((box) => box.value);
    const name = form.querySelector('[name="firstName"]');
    const email = form.querySelector('[name="email"]');
    const consent = form.querySelector('[name="marketingConsent"]');
    const button = form.querySelector('button[type="submit"]');
    if (!kits.length) { status.textContent = 'Tick at least one kit.'; return; }
    if (!name?.value.trim()) { status.textContent = 'Enter your first name.'; name?.focus(); return; }
    if (!email?.validity.valid) { status.textContent = 'Enter a valid email address.'; email?.focus(); return; }
    if (!consent?.checked) { status.textContent = 'Please tick the box so I can email you.'; consent?.focus(); return; }
    button.disabled = true;
    status.textContent = 'Adding you to the waitlist…';
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: name.value.trim(), email: email.value.trim(), marketingConsent: true, kits, website: form.querySelector('[name="website"]')?.value || '' }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Please try again.');
      status.textContent = 'You’re on the waitlist. You’ll hear first when your kit opens.';
      form.reset();
      document.querySelectorAll('input[name="kits"][form="sk-kit-form"]').forEach((box) => { box.checked = false; });
    } catch (error) {
      status.textContent = error.message || 'Please try again.';
    } finally {
      button.disabled = false;
    }
  });
})();
