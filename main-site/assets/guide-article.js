function copyPrompt(btn) {
  var prompt = btn.closest ? btn.closest('.g-prompt') : btn.parentNode.parentNode;
  var pre = prompt ? prompt.querySelector('pre') : null;
  if (!pre) return;

  var text = pre.textContent;
  var original = btn.textContent;

  function copied() {
    btn.textContent = 'Copied';
    window.setTimeout(function () {
      btn.textContent = original;
    }, 1400);
  }

  function fallback() {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    try {
      if (document.execCommand('copy')) copied();
    } finally {
      document.body.removeChild(textarea);
    }
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(copied, fallback);
  } else {
    fallback();
  }
}
