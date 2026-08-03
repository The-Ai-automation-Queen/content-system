#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const BRIEF = path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief');
const FONT_LINK = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">';
const BRAND_LINK = '<link rel="stylesheet" href="/assets/brand-system.css">';
const HOME_FLOW_LINK = '<link rel="stylesheet" href="/assets/home-possibilities.css">';

const EDITORIAL_STYLE = `<style id="editorial-photo-system">
.editorial-photo-band{max-width:1080px;margin:-18px auto 62px;padding:0 28px}
.editorial-photo-band figure{margin:0;display:grid;grid-template-columns:minmax(0,1.65fr) minmax(220px,.55fr);min-height:340px;background:#FAF7F2;border:1px solid #E8E4DD;border-radius:10px;overflow:hidden}
.editorial-photo-band img{width:100%;height:100%;min-height:340px;object-fit:cover;display:block;border-radius:0!important}
.editorial-photo-band figcaption{display:flex;flex-direction:column;justify-content:flex-end;padding:28px;font-family:"Space Mono",monospace;font-size:10px;line-height:1.6;letter-spacing:.11em;text-transform:uppercase;color:#1B2EA0}
.editorial-photo-band figcaption strong{display:block;margin-bottom:8px;font-family:"Playfair Display",Georgia,serif;font-size:23px;font-weight:400;line-height:1.2;letter-spacing:-.01em;text-transform:none;color:#1A1A1A}
body[data-page-kind="guides"] .editorial-photo-band{margin-top:-46px}
body[data-page-kind="workshops"] .editorial-photo-band{margin-top:-24px}
body[data-page-kind="build"] .editorial-photo-band{margin-top:-34px}
@media(max-width:760px){.editorial-photo-band{margin:0 auto 46px;padding:0 18px}.editorial-photo-band figure{grid-template-columns:1fr;min-height:0}.editorial-photo-band img{height:300px;min-height:0}.editorial-photo-band figcaption{padding:22px}}
</style>`;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === '_archive' || e.name === 'node_modules') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function kindFor(file) {
  if (file.startsWith(BRIEF)) return 'brief';
  const rel = path.relative(MAIN, file).replaceAll('\\', '/');
  if (rel === 'index.html') return 'home';
  if (rel === 'about.html') return 'about';
  if (rel === 'workshops.html') return 'workshops';
  if (rel === 'build-sprint.html') return 'build';
  if (rel === 'starter-kit.html') return 'starter-kit';
  if (rel === 'quiz.html') return 'quiz';
  if (rel === 'guides/index.html') return 'guides';
  if (rel.startsWith('guides/')) return 'guide';
  return 'standard';
}

function mobileNav() {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'site.json'), 'utf8'));
  const links = data.nav.map((n) => `<a${n.cta ? ' class="nav-cta"' : ''} href="${n.url}">${n.label}</a>`).join('');
  return `<details class="site-nav-mobile"><summary>Menu</summary><div class="site-nav-mobile-panel">${links}</div></details>`;
}

const MOBILE = mobileNav();

const HOME_FLOW = `<section class="possibilities-journey" aria-labelledby="possibilities-title">
  <div class="possibilities-shell">
    <div class="possibilities-head">
      <div class="possibilities-eyebrow">The ideas are not the problem</div>
      <h2 id="possibilities-title">More of them should get built.</h2>
      <p class="possibilities-intro">The shift is not doing more for the sake of it. It is turning the right ideas into working capability without giving up judgment.</p>
    </div>
    <div class="possibilities-flow" aria-label="From idea to working capability">
      <article class="possibilities-step">
        <div class="possibilities-number">01</div>
        <div class="possibilities-stage">You bring</div>
        <h3>The outcome you want.</h3>
        <ul class="possibilities-outcomes">
          <li>The offer in your notes gets launched.</li>
          <li>The research is ready when a decision appears.</li>
        </ul>
      </article>
      <div class="possibilities-connector" aria-hidden="true"></div>
      <article class="possibilities-step">
        <div class="possibilities-number">02</div>
        <div class="possibilities-stage">We design</div>
        <h3>The system around the work.</h3>
        <ul class="possibilities-outcomes">
          <li>Content starts from your knowledge, not a blank page.</li>
          <li>Follow-up happens when it should.</li>
        </ul>
      </article>
      <div class="possibilities-connector" aria-hidden="true"></div>
      <article class="possibilities-step is-final">
        <div class="possibilities-number">03</div>
        <div class="possibilities-stage">You leave with</div>
        <h3>More capacity, with the decisions still yours.</h3>
        <ul class="possibilities-outcomes">
          <li>Repeated work keeps moving in the background.</li>
          <li>You understand what was built and where the human stays in control.</li>
        </ul>
        <p class="possibilities-principle">You keep the judgment. AI helps carry more of the work.</p>
      </article>
    </div>
    <div class="possibilities-action"><a class="btn-primary" href="#further">Show me what to build first →</a></div>
  </div>
</section>`;

const EDITORIAL_MEDIA = {
  guides: `<div class="editorial-photo-band" data-editorial-photo="guides"><figure><img src="/fatiha-studio.jpg" loading="lazy" decoding="async" alt="Fatiha Chikh working in her studio"><figcaption><strong>Built from real work.</strong>The library comes from what I build, test and use, not from a list of tools.</figcaption></figure></div>`,
  workshops: `<div class="editorial-photo-band" data-editorial-photo="workshops"><figure><img src="/Portrait.jpeg" loading="lazy" decoding="async" alt="Fatiha Chikh"><figcaption><strong>Practical, not theoretical.</strong>Twenty years translating new technology into work people can actually use.</figcaption></figure></div>`,
  build: `<div class="editorial-photo-band" data-editorial-photo="build"><figure><img src="/fatiha-desk.jpg" loading="lazy" decoding="async" alt="Fatiha Chikh working at her desk"><figcaption><strong>We build in the real business.</strong>You see the decisions, understand the system and keep what we build.</figcaption></figure></div>`
};

function addEditorialMedia(html, kind) {
  const media = EDITORIAL_MEDIA[kind];
  if (!media) return html;
  html = html.replace(new RegExp(`<div class="editorial-photo-band" data-editorial-photo="${kind}">[\\s\\S]*?<\\/div>`), '');
  if (kind === 'build') {
    return html.replace(/(<\/header>)/, `$1\n${media}`);
  }
  return html.replace(/(<section class="hero"[\s\S]*?<\/section>)/, `$1\n${media}`);
}

function patch(file) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  html = html.replace(/\s*<style id="brand-consistency-v2">[\s\S]*?<\/style>/g, '');
  html = html.replace(/\s*<style id="editorial-photo-system">[\s\S]*?<\/style>/g, '');

  if (!html.includes('family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600')) {
    html = html.replace('</head>', `${FONT_LINK}\n</head>`);
  }

  html = html.replace(/\s*<link rel="stylesheet" href="\/assets\/brand-system\.css(?:\?v=[^"]*)?">/g, '');
  html = html.replace('</head>', `${BRAND_LINK}\n${EDITORIAL_STYLE}\n</head>`);

  const kind = kindFor(file);
  html = html.replace(/<body([^>]*)>/, (_m, attrs) => {
    const clean = attrs
      .replace(/\sdata-brand-page="[^"]*"/g, '')
      .replace(/\sdata-page-kind="[^"]*"/g, '');
    return `<body${clean} data-page-kind="${kind}">`;
  });

  if (!file.startsWith(BRIEF) && html.includes('class="site-nav"')) {
    html = html.replace(/<details class="site-nav-mobile">[\s\S]*?<\/details>/g, '');
    html = html.replace(/(<div class="site-nav-links">[\s\S]*?<\/div>)(\s*<\/div>\s*<\/nav>)/, `$1\n    ${MOBILE}$2`);
  }

  if (kind === 'home') {
    html = html.replace(/\s*<link rel="stylesheet" href="\/assets\/home-possibilities\.css(?:\?v=[^"]*)?">/g, '');
    html = html.replace('</head>', `${HOME_FLOW_LINK}\n</head>`);
    html = html.replace(/<section class="pains possibilities">[\s\S]*?<\/section>/, HOME_FLOW);
  }

  html = addEditorialMedia(html, kind);

  if (html !== before) fs.writeFileSync(file, html);
}

for (const file of [...walk(MAIN), ...walk(BRIEF)]) patch(file);
console.log('Applied final responsive brand system, homepage workflow, and editorial photography.');
