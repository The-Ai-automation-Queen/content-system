// 1:1 application form on /work-with-fatiha/ -> /api/enquiry (Lumail, reply-only consent).
(() => {
  const form = document.getElementById('pg-apply-form');
  const status = document.getElementById('ap-status');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const field = (name) => form.elements[name];
    if (!field('name').value.trim()) { status.textContent = 'Please add your name.'; field('name').focus(); return; }
    if (!field('email').validity.valid || !field('email').value) { status.textContent = 'Enter a valid email address.'; field('email').focus(); return; }
    if (!field('task').value.trim()) { status.textContent = 'Tell me in a line what you want AI to help with.'; field('task').focus(); return; }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: field('name').value.trim(),
          email: field('email').value.trim(),
          business: field('business').value.trim(),
          task: field('task').value.trim(),
          interest: 'custom-project',
          website: field('website').value,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your application did not send. Please try again.');
      status.textContent = 'Thank you. I’ll reply by email within 48 hours.';
      window.slTrack?.('application_sent');
      form.reset();
    } catch (error) {
      status.textContent = error.message || 'Your application did not send. Please try again.';
    } finally {
      button.disabled = false;
    }
  });
})();
