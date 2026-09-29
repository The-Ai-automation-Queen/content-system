// Work with me: the field dropdown shows one field panel at a time.
(function () {
  var selector = document.getElementById('offer-industry');
  var panels = document.querySelectorAll('.offer-industry-panel');
  if (!selector || !panels.length) return;
  function show() {
    panels.forEach(function (panel) { panel.hidden = panel.getAttribute('data-industry') !== selector.value; });
  }
  selector.addEventListener('change', show);
  show();
})();
