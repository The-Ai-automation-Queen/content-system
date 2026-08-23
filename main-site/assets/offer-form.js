(() => {
  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const testMode = isLocal ? new URLSearchParams(window.location.search).get('test') : null;

  const track = (name, properties) => {
    if (typeof window.slTrack === 'function') window.slTrack(name, properties);
  };

  document.querySelectorAll('form[data-offer-form]').forEach((form) => {
    const button = form.querySelector('button[type="submit"]');
    const status = form.parentElement.querySelector('[data-form-status]');
    if (!button || !status) return;

    const originalLabel = button.textContent;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const fields = Object.fromEntries(new FormData(form).entries());
      if (fields._gotcha) return;

      button.disabled = true;
      button.textContent = 'Sending...';
      status.hidden = false;
      status.textContent = '';
      track(form.dataset.event || 'offer_enquiry_submit', { source: fields.source, offer: form.dataset.offerForm });

      try {
        let accepted;
        if (testMode === 'success') accepted = true;
        else if (testMode === 'failure') accepted = false;
        else {
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields),
          });
          accepted = response.ok;
        }

        if (!accepted) throw new Error('The enquiry was not accepted.');
        form.hidden = true;
        form.style.setProperty('display', 'none', 'important');
        status.textContent = form.dataset.success || 'Thank you. Your enquiry has been sent.';
        track(form.dataset.eventSuccess || 'offer_enquiry_success', { source: fields.source, offer: form.dataset.offerForm });
      } catch (_error) {
        status.textContent = 'That did not go through. Please try again.';
        button.disabled = false;
        button.textContent = originalLabel;
        track(form.dataset.eventFailure || 'offer_enquiry_failure', { source: fields.source, offer: form.dataset.offerForm });
      }
    });
  });
})();
