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
})();
