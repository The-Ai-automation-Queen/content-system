(function () {
  var selector = document.getElementById('offer-industry');
  var panels = document.querySelectorAll('.offer-industry-panel');
  var industryInput = document.querySelector('.apply-form input[name="industry"]');
  if (selector && panels.length) {
    var lastSuggestedIndustry = '';
    function showIndustry(updateInput) {
      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-industry') !== selector.value;
      });
      if (updateInput && industryInput && (!industryInput.value || industryInput.value === lastSuggestedIndustry)) {
        lastSuggestedIndustry = selector.options[selector.selectedIndex].text;
        industryInput.value = lastSuggestedIndustry;
      }
    }
    selector.addEventListener('change', function () { showIndustry(true); });
    showIndustry(false);
  }

  var interest = document.querySelector('.apply-form select[name="interest"]');
  if (interest) {
    document.querySelectorAll('[data-interest]').forEach(function (link) {
      link.addEventListener('click', function () {
        interest.value = link.getAttribute('data-interest');
      });
    });
  }

  // Send the enquiry through /api/enquiry and confirm on the page. Without
  // JavaScript the form still posts to its action URL.
  var form = document.querySelector('.apply-form');
  if (form && window.fetch) {
    var button = form.querySelector('button[type="submit"]');
    var status = document.createElement('p');
    status.className = 'wc-form-status wc-wide';
    status.setAttribute('role', 'status');
    status.hidden = true;
    form.appendChild(status);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });
      button.disabled = true;
      button.textContent = 'Sending...';
      status.hidden = true;
      fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (res) { return res.json().catch(function () { return {}; }).then(function (body) { if (!res.ok) throw new Error(body.error || ''); }); })
        .then(function () {
          if (window.slTrack) window.slTrack('enquiry_submit', { interest: data.interest || '' });
          form.innerHTML = '<div class="wc-form-done wc-wide" tabindex="-1"><strong>Thank you. Your application has arrived.</strong><p>I read each one myself and will reply to ' + data.email.replace(/[<>&"]/g, '') + '.</p></div>';
          form.querySelector('.wc-form-done').focus();
        })
        .catch(function (error) {
          button.disabled = false;
          button.textContent = 'Apply';
          status.textContent = (error && error.message) || 'Your enquiry did not send. Please try again.';
          status.hidden = false;
        });
    });
  }
})();
