#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN_HOME = path.join(ROOT, 'main-site', 'index.html');
const ROOTS = [
  path.join(ROOT, 'main-site'),
  path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief')
];
const STYLESHEETS = ['density-system.css', 'mobile-polish.css'];

const HOME_CONTACT_STYLE = `<style id="home-contact-final">
body[data-page-kind="home"] .contact .contact-submit,
body[data-page-kind="home"] .contact .contact-submit:visited,
body[data-page-kind="home"] .contact .contact-submit:focus-visible{
  background:#fff!important;
  color:#1B2EA0!important;
  border:1px solid #fff!important;
}
body[data-page-kind="home"] .contact .contact-submit:hover{
  background:#FAF7F2!important;
  color:#1B2EA0!important;
  border-color:#FAF7F2!important;
}
body[data-page-kind="home"] .contact .contact-submit:disabled{
  opacity:.72!important;
  cursor:wait!important;
}
body[data-page-kind="home"] #contact-status{
  min-height:1.4em;
}
</style>`;

function versionFor(name) {
  const source = path.join(ROOT, 'shared', 'assets', name);
  if (!fs.existsSync(source)) return '';
  return crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex').slice(0, 8);
}

function linkFor(name) {
  const version = versionFor(name);
  return `<link rel="stylesheet" href="/assets/${name}${version ? `?v=${version}` : ''}">`;
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === '_archive' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function patchHomeContact(html) {
  html = html
    .replace('<div class="section-eyebrow">Have something you want to build?</div>', '<div class="section-eyebrow">Start with one thing</div>')
    .replace('<h2>Tell me what you\'re trying to build.</h2>', '<h2>What would you hand off tomorrow if you could?</h2>')
    .replace("<p>If you know the goal but you're not sure where AI fits, tell me what you want to make possible and what's slowing it down. I'll point you to the most useful next step.</p>", "<p>Tell me the task that keeps stealing your time or slowing the business down. I’ll tell you where AI could help and what I would do first.</p>")
    .replace('<input type="text" name="name" placeholder="Your name"', '<input type="text" name="name" placeholder="Your name" aria-label="Your name" autocomplete="name" required')
    .replace('<input type="email" name="email" placeholder="your@email.com" required', '<input type="email" name="email" placeholder="your@email.com" aria-label="Your email" autocomplete="email" required')
    .replace('<textarea name="message" placeholder="What are you trying to build?" rows="3"', '<textarea name="message" placeholder="What keeps taking too much of your time?" aria-label="What keeps taking too much of your time?" rows="3" required')
    .replace('<button type="submit" class="btn-primary" style="border:none;cursor:pointer;align-self:center">Tell me what you\'re building</button>', '<button type="submit" class="btn-primary contact-submit" style="cursor:pointer;align-self:center">Show me what to do first</button>')
    .replace('<p class="contact-note" id="contact-status"></p>', '<p class="contact-note" id="contact-status" role="status" aria-live="polite"></p>');

  const oldHandler = /\(function\(\)\{\s*var form = document\.getElementById\('contact-form'\);[\s\S]*?status\.textContent = "Got it\. I'll be in touch personally\.";\s*\}\);\s*\}\)\(\);/;
  const newHandler = `(function(){
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  if (!form || !status) return;

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    if (!form.reportValidity()) return;

    var btn = form.querySelector('button');
    var originalLabel = 'Show me what to do first';
    var payload = {
      email: form.querySelector('[name="email"]').value.trim(),
      name: form.querySelector('[name="name"]').value.trim(),
      message: form.querySelector('[name="message"]').value.trim(),
      source: 'main-site-contact',
      _gotcha: form.querySelector('[name="_gotcha"]').value
    };

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.textContent = '';

    try {
      var response = await fetch(form.action, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Request failed with status ' + response.status);

      form.reset();
      btn.textContent = 'Sent';
      status.textContent = "Got it. I'll read this myself and reply if I can help.";
    } catch (error) {
      btn.disabled = false;
      btn.textContent = originalLabel;
      status.textContent = 'Something went wrong. Please try again.';
      console.error('Contact form submission failed', error);
    }
  });
})();`;

  html = html.replace(oldHandler, newHandler);
  html = html.replace(/\s*<style id="home-contact-final">[\s\S]*?<\/style>/g, '');
  html = html.replace('</head>', `${HOME_CONTACT_STYLE}\n</head>`);

  return html;
}

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const before = fs.readFileSync(file, 'utf8');
    let html = before;

    for (const name of STYLESHEETS) {
      const escaped = name.replaceAll('.', '\\.');
      html = html.replace(new RegExp(`\\s*<link rel="stylesheet" href="\\/assets\\/${escaped}(?:\\?v=[^"]*)?">`, 'g'), '');
    }

    const links = STYLESHEETS.map(linkFor).join('\n');
    html = html.replace('</head>', `${links}\n</head>`);

    if (file === MAIN_HOME) html = patchHomeContact(html);

    if (html !== before) fs.writeFileSync(file, html);
  }
}

console.log('Applied page-density, mobile polish and final homepage contact safeguards.');
