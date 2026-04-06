/**
 * MyPlugin — Embeddable Content Analyzer
 *
 * This is the core plugin file. It:
 *  1. Validates the customer's license key
 *  2. Injects scoped CSS
 *  3. Renders the UI into the target container
 *  4. Runs the tool logic
 *
 * Customers load this via a <script> tag with data attributes.
 */

(function () {
  'use strict';

  // ── Prevent double-init ──────────────────────────────────
  if (window.__MYPLUGIN_LOADED__) return;
  window.__MYPLUGIN_LOADED__ = true;

  // ── Read config from the <script> tag ────────────────────
  var script = document.currentScript;
  var config = {
    license:   script.getAttribute('data-license') || '',
    container: script.getAttribute('data-container') || '#my-plugin',
    theme:     script.getAttribute('data-theme') || 'light',
    accent:    script.getAttribute('data-accent') || '#6c5ce7',
  };

  // ── License validation ───────────────────────────────────
  // OPTION A: Simple domain allowlist (no server needed)
  //   Replace with your real validation logic.
  function validateLicense(key) {
    // For development/demo, accept any non-empty key
    if (!key || key === 'DEMO') return true;

    // In production, call your API:
    // return fetch('https://api.yoursite.com/validate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ key: key, domain: location.hostname })
    // }).then(r => r.json()).then(d => d.valid);

    return true; // placeholder
  }

  // ── Inject CSS ───────────────────────────────────────────
  function injectStyles() {
    var css = `/* --- MyPlugin Embedded Styles --- */
.myplugin-root{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;box-sizing:border-box;border:2px solid var(--myplugin-accent,#6c5ce7);border-radius:12px;padding:24px;max-width:100%;color:#333;background:var(--myplugin-bg,#fff)}
.myplugin-root *,.myplugin-root *::before,.myplugin-root *::after{box-sizing:inherit}
.myplugin-root .myplugin-title{margin:0 0 16px;font-size:1.25rem;color:var(--myplugin-accent,#6c5ce7)}
.myplugin-root .myplugin-textarea{width:100%;height:100px;margin:0 0 12px;padding:10px;border-radius:6px;border:1px solid #ddd;font-family:inherit;font-size:14px;resize:vertical}
.myplugin-root .myplugin-btn{background:var(--myplugin-accent,#6c5ce7);color:#fff;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-size:15px;transition:opacity .2s}
.myplugin-root .myplugin-btn:hover{opacity:.85}
.myplugin-root .myplugin-result{margin-top:16px;padding:12px;background:#f8f8ff;border-radius:6px;min-height:40px;font-size:14px;line-height:1.5}
.myplugin-root[data-theme="dark"]{background:#1e1e2e;color:#eee;border-color:#a29bfe}
.myplugin-root[data-theme="dark"] .myplugin-textarea{background:#2d2d44;color:#eee;border-color:#444}
.myplugin-root[data-theme="dark"] .myplugin-result{background:#2d2d44;color:#ddd}`;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ── Core logic (your tool's functionality) ───────────────
  function analyzeContent(text) {
    if (!text.trim()) return null;
    var words = text.trim().split(/\s+/).length;
    var sentences = text.split(/[.!?]+/).filter(function (s) { return s.trim(); }).length;
    var readingTime = Math.ceil(words / 200);
    var avgWordsPerSentence = sentences > 0 ? Math.round(words / sentences) : 0;

    return {
      words: words,
      sentences: sentences,
      readingTime: readingTime,
      avgWordsPerSentence: avgWordsPerSentence
    };
  }

  // ── Render the plugin UI ─────────────────────────────────
  function render(container) {
    container.innerHTML = '';

    var root = document.createElement('div');
    root.className = 'myplugin-root';
    root.setAttribute('data-theme', config.theme);
    root.style.setProperty('--myplugin-accent', config.accent);

    root.innerHTML =
      '<h3 class="myplugin-title">Content Analyzer</h3>' +
      '<textarea class="myplugin-textarea" placeholder="Paste your content here..."></textarea>' +
      '<button class="myplugin-btn">Analyze</button>' +
      '<div class="myplugin-result"></div>';

    var textarea = root.querySelector('.myplugin-textarea');
    var btn = root.querySelector('.myplugin-btn');
    var result = root.querySelector('.myplugin-result');

    btn.addEventListener('click', function () {
      var data = analyzeContent(textarea.value);
      if (!data) {
        result.textContent = 'Please enter some text.';
        return;
      }
      result.innerHTML =
        '<strong>' + data.words + '</strong> words · ' +
        '<strong>' + data.sentences + '</strong> sentences · ' +
        '<strong>' + data.readingTime + ' min</strong> read · ' +
        '<strong>' + data.avgWordsPerSentence + '</strong> words/sentence';
    });

    container.appendChild(root);
  }

  // ── Initialize ───────────────────────────────────────────
  function init() {
    var container = document.querySelector(config.container);
    if (!container) {
      console.error('[MyPlugin] Container not found: ' + config.container);
      return;
    }

    if (!validateLicense(config.license)) {
      container.innerHTML = '<p style="color:red;">Invalid license key.</p>';
      return;
    }

    injectStyles();
    render(container);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
