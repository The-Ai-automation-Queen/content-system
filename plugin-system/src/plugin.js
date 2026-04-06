/**
 * MyPlugin — Embeddable Content Analyzer
 *
 * Customers customize everything through:
 *   1. data-* attributes on the <script> tag (simple settings)
 *   2. window.MyPluginConfig object (full content customization)
 *
 * Customers load this via a <script> tag with data attributes.
 */

(function () {
  'use strict';

  if (window.__MYPLUGIN_LOADED__) return;
  window.__MYPLUGIN_LOADED__ = true;

  // ── Read config from <script> tag + global config object ─
  var script = document.currentScript;

  // Customers can define window.MyPluginConfig BEFORE the script loads
  // to fully customize content, labels, and behavior
  var userConfig = window.MyPluginConfig || {};

  var config = {
    // -- Embed attributes (simple settings) --
    license:   script.getAttribute('data-license') || '',
    container: script.getAttribute('data-container') || '#my-plugin',
    theme:     script.getAttribute('data-theme') || 'light',
    accent:    script.getAttribute('data-accent') || '#6c5ce7',

    // -- Content customization (from MyPluginConfig) --
    title:       userConfig.title       || 'Content Analyzer',
    subtitle:    userConfig.subtitle    || '',
    placeholder: userConfig.placeholder || 'Paste your content here...',
    buttonText:  userConfig.buttonText  || 'Analyze',
    emptyText:   userConfig.emptyText   || 'Please enter some text.',
    logo:        userConfig.logo        || '',  // URL to customer's logo
    poweredBy:   userConfig.poweredBy !== false, // show "Powered by" footer

    // -- Feature toggles --
    showWords:       userConfig.showWords !== false,
    showSentences:   userConfig.showSentences !== false,
    showReadingTime: userConfig.showReadingTime !== false,
    showAvgLength:   userConfig.showAvgLength !== false,

    // -- Custom fields: customers add their own metrics --
    // Array of { label: "My Metric", compute: function(text) { return value; } }
    customMetrics: userConfig.customMetrics || [],

    // -- Callbacks --
    onAnalyze: userConfig.onAnalyze || null,  // called with results after analysis
    onReady:   userConfig.onReady   || null,   // called when plugin is rendered
  };

  // ── License validation ───────────────────────────────────
  function validateLicense(key) {
    if (!key || key === 'DEMO') return true;

    // In production, call your API:
    // return fetch('https://api.yoursite.com/validate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ key: key, domain: location.hostname })
    // }).then(r => r.json()).then(d => d.valid);

    return true;
  }

  // ── Inject CSS ───────────────────────────────────────────
  function injectStyles() {
    var css = `/* --- MyPlugin Embedded Styles --- */
.myplugin-root{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;box-sizing:border-box;border:2px solid var(--myplugin-accent,#6c5ce7);border-radius:12px;padding:24px;max-width:100%;color:#333;background:var(--myplugin-bg,#fff)}
.myplugin-root *,.myplugin-root *::before,.myplugin-root *::after{box-sizing:inherit}
.myplugin-root .myplugin-logo{max-height:40px;margin-bottom:12px}
.myplugin-root .myplugin-title{margin:0 0 4px;font-size:1.25rem;color:var(--myplugin-accent,#6c5ce7)}
.myplugin-root .myplugin-subtitle{margin:0 0 16px;font-size:0.9rem;color:#888}
.myplugin-root .myplugin-textarea{width:100%;height:100px;margin:0 0 12px;padding:10px;border-radius:6px;border:1px solid #ddd;font-family:inherit;font-size:14px;resize:vertical}
.myplugin-root .myplugin-btn{background:var(--myplugin-accent,#6c5ce7);color:#fff;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-size:15px;transition:opacity .2s}
.myplugin-root .myplugin-btn:hover{opacity:.85}
.myplugin-root .myplugin-result{margin-top:16px;padding:12px;background:#f8f8ff;border-radius:6px;min-height:40px;font-size:14px;line-height:1.8}
.myplugin-root .myplugin-metric{display:inline-block;margin-right:16px;white-space:nowrap}
.myplugin-root .myplugin-footer{margin-top:12px;font-size:11px;color:#aaa;text-align:right}
.myplugin-root[data-theme="dark"]{background:#1e1e2e;color:#eee;border-color:#a29bfe}
.myplugin-root[data-theme="dark"] .myplugin-subtitle{color:#999}
.myplugin-root[data-theme="dark"] .myplugin-textarea{background:#2d2d44;color:#eee;border-color:#444}
.myplugin-root[data-theme="dark"] .myplugin-result{background:#2d2d44;color:#ddd}`;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ── Core logic ───────────────────────────────────────────
  function analyzeContent(text) {
    if (!text.trim()) return null;
    var words = text.trim().split(/\s+/).length;
    var sentences = text.split(/[.!?]+/).filter(function (s) { return s.trim(); }).length;
    var readingTime = Math.ceil(words / 200);
    var avgWordsPerSentence = sentences > 0 ? Math.round(words / sentences) : 0;

    var results = {};
    if (config.showWords)       results.words = words;
    if (config.showSentences)   results.sentences = sentences;
    if (config.showReadingTime) results.readingTime = readingTime;
    if (config.showAvgLength)   results.avgWordsPerSentence = avgWordsPerSentence;

    // Run customer's custom metrics
    config.customMetrics.forEach(function (metric) {
      try {
        results[metric.label] = metric.compute(text);
      } catch (e) {
        results[metric.label] = 'Error';
      }
    });

    return results;
  }

  function formatResults(data) {
    var parts = [];
    if (data.words !== undefined)
      parts.push('<span class="myplugin-metric"><strong>' + data.words + '</strong> words</span>');
    if (data.sentences !== undefined)
      parts.push('<span class="myplugin-metric"><strong>' + data.sentences + '</strong> sentences</span>');
    if (data.readingTime !== undefined)
      parts.push('<span class="myplugin-metric"><strong>' + data.readingTime + ' min</strong> read</span>');
    if (data.avgWordsPerSentence !== undefined)
      parts.push('<span class="myplugin-metric"><strong>' + data.avgWordsPerSentence + '</strong> words/sentence</span>');

    // Append custom metrics
    config.customMetrics.forEach(function (metric) {
      if (data[metric.label] !== undefined) {
        parts.push('<span class="myplugin-metric"><strong>' + data[metric.label] + '</strong> ' + metric.label + '</span>');
      }
    });

    return parts.join('');
  }

  // ── Render ───────────────────────────────────────────────
  function render(container) {
    container.innerHTML = '';

    var root = document.createElement('div');
    root.className = 'myplugin-root';
    root.setAttribute('data-theme', config.theme);
    root.style.setProperty('--myplugin-accent', config.accent);

    // Build header
    var headerHTML = '';
    if (config.logo) {
      headerHTML += '<img class="myplugin-logo" src="' + config.logo + '" alt="">';
    }
    headerHTML += '<h3 class="myplugin-title">' + config.title + '</h3>';
    if (config.subtitle) {
      headerHTML += '<p class="myplugin-subtitle">' + config.subtitle + '</p>';
    }

    // Build footer
    var footerHTML = '';
    if (config.poweredBy) {
      footerHTML = '<div class="myplugin-footer">Powered by Content Analyzer</div>';
    }

    root.innerHTML =
      headerHTML +
      '<textarea class="myplugin-textarea" placeholder="' + config.placeholder + '"></textarea>' +
      '<button class="myplugin-btn">' + config.buttonText + '</button>' +
      '<div class="myplugin-result"></div>' +
      footerHTML;

    var textarea = root.querySelector('.myplugin-textarea');
    var btn = root.querySelector('.myplugin-btn');
    var result = root.querySelector('.myplugin-result');

    btn.addEventListener('click', function () {
      var data = analyzeContent(textarea.value);
      if (!data) {
        result.textContent = config.emptyText;
        return;
      }
      result.innerHTML = formatResults(data);

      // Fire callback so customer can use the data
      if (config.onAnalyze) {
        config.onAnalyze(data, textarea.value);
      }
    });

    container.appendChild(root);

    if (config.onReady) {
      config.onReady(root);
    }
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
