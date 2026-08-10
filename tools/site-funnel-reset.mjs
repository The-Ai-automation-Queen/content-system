#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const BRIEF = path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief');

function read(rel) { return fs.readFileSync(path.join(MAIN, rel), 'utf8'); }
function write(rel, content) { fs.writeFileSync(path.join(MAIN, rel), content); }
function patch(rel, fn) {
  const before = read(rel);
  const after = fn(before);
  if (after !== before) {
    write(rel, after);
    console.log('funnel-reset', rel);
  }
}

function removeBriefLinks(html) {
  // The Brief archive remains online, but it is intentionally not promoted while publication is paused.
  html = html.replace(/\s*<li>\s*<a\b[^>]*href=["']https:\/\/brief\.shiftandlead\.com\/?["'][^>]*>[\s\S]*?<\/a>\s*<\/li>/gi, '');
  html = html.replace(/\s*<a\b[^>]*href=["']https:\/\/brief\.shiftandlead\.com\/?["'][^>]*>[\s\S]*?<\/a>/gi, '');
  return html;
}

function removeRibbonForm(html) {
  return html.replace(/\s*<form\b[^>]*id=["']ribbon-form["'][\s\S]*?<\/form>\s*/i, '\n');
}

function removeRibbonScript(html) {
  // Homepage version starts by assigning `form`; Guides version binds directly to the id.
  html = html.replace(/\s*\(function\(\)\{\s*var form = document\.getElementById\(['"]ribbon-form['"]\);[\s\S]*?\}\)\(\);\s*/i, '\n');
  html = html.replace(/\s*\(function\(\)\{\s*document\.getElementById\(['"]ribbon-form['"]\)\.addEventListener[\s\S]*?\}\)\(\);\s*/i, '\n');
  return html;
}

// Homepage: stop promising an ongoing newsletter. Guides and the diagnostic are the acquisition path.
patch('index.html', html => removeBriefLinks(removeRibbonScript(removeRibbonForm(html))));

// Guides library: remove the generic newsletter capture and make the diagnostic the learning-path CTA.
patch('guides/index.html', html => {
  html = removeRibbonScript(removeRibbonForm(html));

  const quizCard = `<a class="guides-next-card" href="/quiz.html">\n        <span>Find your first build</span>\n        <h3>What should you build with AI first?</h3>\n        <p>Answer 8 questions and get the most useful place to start for the work you want AI to help with.</p>\n        <b>Take the free diagnostic →</b>\n      </a>`;

  html = html.replace(
    /<a class="guides-next-card" href=["']https:\/\/brief\.shiftandlead\.com\/?["']>[\s\S]*?<\/a>/i,
    quizCard
  );
  return removeBriefLinks(html);
});

// First contextual companion asset. The guide stays fully open; the worksheet is the email-value exchange.
patch('guides/first-ai-employee.html', html => {
  const css = '<link rel="stylesheet" href="/assets/guide-lead-magnets.css">';
  const js = '<script defer src="/assets/guide-lead-magnets.js"></script>';
  if (!html.includes('/assets/guide-lead-magnets.css')) html = html.replace('</head>', `${css}\n</head>`);
  if (!html.includes('/assets/guide-lead-magnets.js')) html = html.replace('</body>', `${js}\n</body>`);

  if (!html.includes('data-lead-magnet="ai-assistant-builder"')) {
    const lead = `<section class="guide-lead-magnet" data-animate="reveal" aria-labelledby="assistant-builder-title">\n  <p class="lm-eyebrow">Free companion · AI Assistant Builder</p>\n  <h2 id="assistant-builder-title">Build the job before you build the automation.</h2>\n  <p class="lm-copy">Unlock the one-page builder I use to define the job, inputs, rules, permissions, human review point and three tests before an AI assistant gets more autonomy.</p>\n  <form action="https://auto.shiftandlead.com/webhook/formspree-lead" method="POST" data-lead-magnet-form data-lead-magnet="ai-assistant-builder" data-guide="first-ai-employee" data-source="guide-first-ai-assistant-builder">\n    <label class="sr-only" for="assistant-builder-email">Email address</label>\n    <input id="assistant-builder-email" name="email" type="email" autocomplete="email" placeholder="your@email.com" required>\n    <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">\n    <button type="submit">Get the builder</button>\n  </form>\n  <p class="lm-fineprint">Enter your email to unlock it now. I may also send closely related practical AI guidance. You can unsubscribe anytime. <a href="/privacy.html">Privacy</a>.</p>\n  <p class="lm-status" role="status" aria-live="polite"></p>\n  <div class="lm-resource" aria-hidden="true">\n    <p><strong>Your AI Assistant Builder is ready.</strong></p>\n    <a class="lm-resource-link" href="/resources/ai-assistant-builder.html">Open the AI Assistant Builder →</a>\n  </div>\n  <noscript><p class="lm-fineprint">JavaScript is required for instant access after the form is submitted. The complete guide above remains available without it.</p></noscript>\n</section>`;

    html = html.replace(/(<\/div>\s*)(<section class="related"\b)/i, `$1${lead}\n$2`);
  }
  return removeBriefLinks(html);
});

// The resource page is intentionally noindex, but it still shares the current site chrome.
patch('resources/ai-assistant-builder.html', html => removeBriefLinks(html));

// Strip Brief promotion from every public main-site HTML file after all earlier build transforms.
function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === '_archive' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

for (const file of walkHtml(MAIN)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = removeBriefLinks(before);
  if (after !== before) fs.writeFileSync(file, after);
}

// AI discovery should describe what is actively promoted now, not the paused newsletter.
const llmsPath = path.join(MAIN, 'llms.txt');
if (fs.existsSync(llmsPath)) {
  const before = fs.readFileSync(llmsPath, 'utf8');
  const after = before
    .replace(/^.*AI Insider Brief.*(?:\r?\n)?/gmi, '')
    .replace(/^.*brief\.shiftandlead\.com.*(?:\r?\n)?/gmi, '');
  if (after !== before) {
    fs.writeFileSync(llmsPath, after);
    console.log('funnel-reset llms.txt');
  }
}

// The Brief itself becomes a quiet archive: accessible to old links, but not an active acquisition promise.
const briefIndex = path.join(BRIEF, 'index.html');
if (fs.existsSync(briefIndex)) {
  let html = fs.readFileSync(briefIndex, 'utf8');
  const before = html;

  if (!/<meta\s+name=["']robots["']/i.test(html)) {
    html = html.replace(/(<meta name="viewport"[^>]*>)/i, '$1\n  <meta name="robots" content="noindex, follow">');
  } else {
    html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, '<meta name="robots" content="noindex, follow">');
  }

  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, '<title>AI Insider Brief Archive | Shift & Lead</title>')
    .replace(/<meta name="description" content="[^"]*">/i, '<meta name="description" content="Archive of the AI Insider Brief. The publication is paused while Shift & Lead focuses on practical AI guides and new content.">')
    .replace(/<h1>[\s\S]*?<\/h1>/i, '<h1>The AI Insider Brief is paused.</h1>')
    .replace(/<p class="hero-subtitle">[\s\S]*?<\/p>/i, '<p class="hero-subtitle">I’m focusing on practical AI guides and new content. The archive stays here if you want to browse what was published before.</p>')
    .replace(/<p class="briefing-kicker" id="briefing-kicker">[\s\S]*?<\/p>/i, '<p class="briefing-kicker" id="briefing-kicker">FROM THE ARCHIVE</p>')
    .replace(/<h2 class="briefing-title" id="briefing-title">[\s\S]*?<\/h2>/i, '<h2 class="briefing-title" id="briefing-title">Previous briefings and research notes</h2>');

  if (!html.includes('brief-pause-route')) {
    html = html.replace(
      /(<\/section>\s*<nav class="category-bar")/i,
      `<div id="brief-pause-route" style="max-width:760px;margin:0 auto 34px;padding:0 20px;text-align:center"><a href="https://www.shiftandlead.com/guides/" style="display:inline-flex;align-items:center;min-height:44px;padding:10px 16px;background:#1B2EA0;color:#fff;text-decoration:none;font-family:Inter,Arial,sans-serif;font-size:14px;font-weight:700;border-radius:4px">Browse the current AI Guides →</a></div>\n\n$1`
    );
  }

  // The shared chrome has already been stamped from site.json. Remove any stale self-promotional Brief link left by older markup.
  html = removeBriefLinks(html);

  if (html !== before) {
    fs.writeFileSync(briefIndex, html);
    console.log('funnel-reset Brief archive');
  }
}

// Guard the pages that matter most so a later edit cannot silently put the paused Brief back into acquisition.
for (const rel of ['index.html', 'guides/index.html']) {
  const html = read(rel);
  if (/AI Insider Brief|brief\.shiftandlead\.com/i.test(html)) {
    throw new Error(`Paused Brief promotion still present in ${rel}`);
  }
}

console.log('Funnel reset complete: Guides + diagnostic + contextual companion assets are the active acquisition path; Brief preserved as a noindex archive.');
