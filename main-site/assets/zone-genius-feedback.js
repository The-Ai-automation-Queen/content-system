(() => {
  const form = document.querySelector('#zone-genius-feedback');
  const status = document.querySelector('[data-feedback-status]');
  const words = document.querySelector('[data-testimonial-words]');
  const textarea = words?.querySelector('textarea');
  if (!form || !status) return;

  form.addEventListener('change', (event) => {
    if (event.target.name !== 'quote_permission' || !words || !textarea) return;
    const show = event.target.value !== 'private';
    words.hidden = !show;
    textarea.required = show;
    if (!show) textarea.value = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Feedback collection is not open yet. Nothing has been sent.';
    status.focus();
  });
})();
