#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN_HOME = path.join(ROOT, 'main-site', 'index.html');
const BRIEF_ROOT = path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief');
const ROOTS = [
  path.join(ROOT, 'main-site'),
  BRIEF_ROOT
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

const BRIEF_SURFACE_STYLE = `<style id="brief-surface-alignment">
body[data-page-kind="brief"]{background:#fff!important}
body[data-page-kind="brief"] .site-header{background:rgba(255,255,255,.97)!important}
body[data-page-kind="brief"] .hero{
  background:#FAF7F2!important;
  border-bottom:1px solid var(--line,#E8E4DD)!important;
}
body[data-page-kind="brief"] .hero-content{background:transparent!important}
body[data-page-kind="brief"] .category-bar{
  background:rgba(255,255,255,.97)!important;
  border-bottom:1px solid var(--line,#E8E4DD)!important;
}
body[data-page-kind="brief"] .feed-section{background:#fff!important}
body[data-page-kind="brief"] .feed-view-switch{background:var(--cream,#FAF7F2)!important}
body[data-page-kind="brief"] .brief-bridge{
  background:#FAF7F2;
  border-top:1px solid var(--line,#E8E4DD);
  border-bottom:1px solid var(--line,#E8E4DD);
  padding:42px 24px;
  margin-top:28px;
}
body[data-page-kind="brief"] .brief-bridge-inner{max-width:1080px;margin:0 auto}
body[data-page-kind="brief"] .brief-bridge h2{
  font-family:var(--display,"Playfair Display",Georgia,serif);
  font-size:clamp(30px,4vw,42px);
  font-weight:400;
  line-height:1.12;
  max-width:18ch;
  margin:8px 0 22px;
}
body[data-page-kind="brief"] .brief-bridge-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
body[data-page-kind="brief"] .brief-bridge-card{
  background:#fff;
  border:1px solid var(--line,#E8E4DD);
  border-top:2px solid var(--blue,#2C4BE0);
  border-radius:10px;
  padding:20px;
}
body[data-page-kind="brief"] .brief-bridge-card h3{font-size:22px;margin:0 0 8px}
body[data-page-kind="brief"] .brief-bridge-card p{font-size:15px;line-height:1.5;color:#555;margin:0 0 16px}
body[data-page-kind="brief"] .brief-bridge-card a{font-family:var(--ui,"Inter",Arial,sans-serif);font-size:14px;font-weight:600}
body[data-page-kind="brief"] .brief-bridge-more{margin:20px 0 0}
@media(max-width:700px){
  body[data-page-kind="brief"] .brief-bridge{padding:30px 18px;margin-top:20px}
  body[data-page-kind="brief"] .brief-bridge-grid{grid-template-columns:1fr}
  body[data-page-kind="brief"] .brief-bridge h2{font-size:30px}
}
</style>`;

const MOBILE_FOOTER_STYLE = `<style id="mobile-footer-final">
@media(max-width:700px){
  .chrome-foot{margin-top:24px!important;padding:28px 18px 22px!important}
  .chrome-foot::before{
    content:"SHIFT & LEAD";
    display:block;
    max-width:1080px;
    margin:0 auto 16px;
    font-family:var(--display,"Playfair Display",Georgia,serif);
    font-size:18px;
    font-weight:600;
    letter-spacing:.02em;
    color:#fff;
  }
  .chrome-foot-grid{
    max-width:1080px!important;
    margin:0 auto!important;
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:6px 22px!important;
  }
  .chrome-foot-grid>section{margin:0!important;padding:0!important}
  .chrome-foot-grid>section:nth-child(-n+3){display:contents!important}
  .chrome-foot-grid>section:nth-child(-n+3)>h2{display:none!important}
  .chrome-foot-grid>section:nth-child(-n+3)>ul{display:contents!important}
  .chrome-foot-grid>section:nth-child(-n+3)>ul>li{list-style:none!important;margin:0!important;padding:0!important}
  .chrome-foot-grid>section:nth-child(-n+3)>ul>li>a{
    display:block!important;
    padding:6px 0!important;
    font-family:var(--ui,"Inter",Arial,sans-serif)!important;
    font-size:14px!important;
    font-weight:500!important;
    line-height:1.25!important;
    color:#E7E3DC!important;
    text-decoration:none!important;
  }
  .chrome-foot-grid>section:nth-child(1)>ul>li:nth-child(1){order:1}
  .chrome-foot-grid>section:nth-child(2)>ul>li:nth-child(1){order:2}
  .chrome-foot-grid>section:nth-child(1)>ul>li:nth-child(2){order:3}
  .chrome-foot-grid>section:nth-child(2)>ul>li:nth-child(3){order:4}
  .chrome-foot-grid>section:nth-child(1)>ul>li:nth-child(3){order:5}
  .chrome-foot-grid>section:nth-child(3)>ul>li:nth-child(1){order:6}
  .chrome-foot-grid>section:nth-child(2)>ul>li:nth-child(2),
  .chrome-foot-grid>section:nth-child(3)>ul>li:nth-child(2){display:none!important}
  .chrome-foot-grid>section:nth-child(4){
    order:7;
    grid-column:1/-1;
    margin-top:14px!important;
    padding-top:12px!important;
    border-top:1px solid rgba(255,255,255,.12);
  }
  .chrome-foot-grid>section:nth-child(4)>h2{display:none!important}
  .chrome-foot-grid>section:nth-child(4)>ul{display:flex!important;flex-wrap:wrap!important;gap:6px 0!important;margin:0!important;padding:0!important}
  .chrome-foot-grid>section:nth-child(4)>ul>li{list-style:none!important;display:flex!important;align-items:center!important;margin:0!important}
  .chrome-foot-grid>section:nth-child(4)>ul>li:not(:last-child)::after{content:"·";margin:0 9px;color:#777}
  .chrome-foot-grid>section:nth-child(4)>ul>li>a{font-family:var(--ui,"Inter",Arial,sans-serif)!important;font-size:12px!important;line-height:1.25!important;color:#B9B5AE!important;text-decoration:none!important}
  .chrome-foot-legal{max-width:1080px!important;margin:14px auto 0!important;padding:0!important;border:0!important;font-size:0!important;line-height:1!important;text-align:left!important;text-transform:none!important;letter-spacing:0!important}
  .chrome-foot-legal::before{content:"© 2026 Shift & Lead";font-family:var(--ui,"Inter",Arial,sans-serif);font-size:11px;font-weight:400;letter-spacing:.03em;color:#85817B}
}
</style>`;

const BRIEF_BRIDGE = `<section class="brief-bridge" aria-labelledby="brief-next-title">
  <div class="brief-bridge-inner">
    <p class="eyebrow mono">Ready to put AI to work?</p>
    <h2 id="brief-next-title">Reading about AI is one thing. Putting it to work is another.</h2>
    <div class="brief-bridge-grid">
      <article class="brief-bridge-card">
        <h3>Build something specific</h3>
        <p>Turn one business goal into a working first version with clear boundaries for what stays human.</p>
        <a href="https://www.shiftandlead.com/build-sprint.html">Build with me →</a>
      </article>
      <article class="brief-bridge-card">
        <h3>Bring it to your team</h3>
        <p>Practical workshops and keynotes built around the work your people actually do.</p>
        <a href="https://www.shiftandlead.com/workshops.html">See workshops →</a>
      </article>
      <article class="brief-bridge-card">
        <h3>Keep learning</h3>
        <p>Use the free library to understand what matters, choose the right tools, and start building yourself.</p>
        <a href="https://www.shiftandlead.com/guides/">Explore the free guides →</a>
      </article>
    </div>
    <p class="brief-bridge-more"><a class="button secondary" href="https://www.shiftandlead.com/how-i-can-help.html">See all ways I can help</a></p>
  </div>
</section>`;

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
    .replace('<title>Build a Bigger Business with AI | Shift &amp; Lead</title>', '<title>Get More of Your Business Done with AI | Shift &amp; Lead</title>')
    .replace(/<meta name="description" content="Build the business you thought would need a much bigger team\.[^"]*">/, '<meta name="description" content="Practical AI guidance, free guides, build support and workshops for ambitious professionals who want to get more of their business done with AI.">')
    .replace('<meta property="og:title" content="Build a Bigger Business with AI | Shift &amp; Lead">', '<meta property="og:title" content="Get More of Your Business Done with AI | Shift &amp; Lead">')
    .replace(/<meta property="og:description" content="Build the business you thought would need a much bigger team\.[^"]*">/, '<meta property="og:description" content="Practical AI guidance, free guides, build support and workshops for ambitious professionals who want to get more of their business done with AI.">')
    .replace('<meta name="twitter:title" content="Build a Bigger Business with AI | Shift &amp; Lead">', '<meta name="twitter:title" content="Get More of Your Business Done with AI | Shift &amp; Lead">')
    .replace(/<meta name="twitter:description" content="Build the business you thought would need a much bigger team\.[^"]*">/, '<meta name="twitter:description" content="Practical AI guidance, free guides, build support and workshops for ambitious professionals who want to get more of their business done with AI.">')
    .replace('<a class="btn-ghost" href="#further"><!-- copy:home.hero_cta_secondary -->See how I can help<!-- /copy:home.hero_cta_secondary --></a>', '<a class="btn-ghost" href="/how-i-can-help.html"><!-- copy:home.hero_cta_secondary -->See how I can help<!-- /copy:home.hero_cta_secondary --></a>')
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

function patchBriefSurface(html) {
  html = html.replace(/\s*<style id="brief-surface-alignment">[\s\S]*?<\/style>/g, '');
  html = html.replace(/\s*<section class="brief-bridge"[\s\S]*?<\/section>/g, '');
  if (html.includes('<p class="curator-note">')) {
    html = html.replace('<p class="curator-note">', `${BRIEF_BRIDGE}\n\n    <p class="curator-note">`);
  } else {
    html = html.replace('</main>', `${BRIEF_BRIDGE}\n</main>`);
  }
  return html.replace('</head>', `${BRIEF_SURFACE_STYLE}\n</head>`);
}

function patchMobileFooter(html) {
  html = html.replace(/\s*<style id="mobile-footer-final">[\s\S]*?<\/style>/g, '');
  return html.replace('</head>', `${MOBILE_FOOTER_STYLE}\n</head>`);
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
    if (file.startsWith(BRIEF_ROOT)) html = patchBriefSurface(html);
    html = patchMobileFooter(html);

    if (html !== before) fs.writeFileSync(file, html);
  }
}

console.log('Applied final HTML routing, density, mobile footer, homepage contact and Brief integration safeguards.');
