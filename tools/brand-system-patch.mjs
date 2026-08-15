#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const BRIEF = path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief');
const MASCOT_SOURCE = path.join(ROOT, 'photo site internet');
const MASCOT_DEST = path.join(MAIN, 'assets', 'mascot');

const FONT_LINK = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">';
const BRAND_LINK = '<link rel="stylesheet" href="/assets/brand-system.css">';
const HOME_FLOW_LINK = '<link rel="stylesheet" href="/assets/home-possibilities.css">';

const MASCOT_FILES = [
  'celebrating-lightbulb.png',
  'cta-wave-point.png',
  'email-sorting.png',
  'explaining.png',
  'hero-seated.png',
  'planning.png',
  'pointing-right.png',
  'warning.png',
  'waving.png'
];

function syncMascots() {
  fs.mkdirSync(MASCOT_DEST, { recursive: true });
  for (const name of MASCOT_FILES) {
    const source = path.join(MASCOT_SOURCE, name);
    if (fs.existsSync(source)) fs.copyFileSync(source, path.join(MASCOT_DEST, name));
  }
}

syncMascots();

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
  const links = data.nav.map((item) => `<a${item.cta ? ' class="nav-cta"' : ''} href="${item.url}">${item.label}</a>`).join('');
  return `<details class="site-nav-mobile"><summary>Menu</summary><div class="site-nav-mobile-panel">${links}</div></details>`;
}

const MOBILE = mobileNav();

const HOME_FLOW = `<section class="possibilities-journey" aria-labelledby="possibilities-title">
  <div class="possibilities-shell">
    <div class="possibilities-head" style="max-width:820px;margin-left:0;text-align:left">
      <div class="possibilities-eyebrow" style="font-size:12px">You should not have to do every step</div>
      <h2 id="possibilities-title" style="font-style:normal">Let AI carry the work<br><em style="font-style:italic;color:var(--blue,#2C4BE0)">that keeps coming back.</em></h2>
      <p class="possibilities-intro" style="margin-left:0">Research, content, follow-up and repeated admin can keep moving without everything waiting for you.</p>
    </div>
    <div class="possibilities-flow" aria-label="From repeated work to more finished work">
      <article class="possibilities-step">
        <div class="possibilities-number">01</div>
        <div class="possibilities-stage">Start with</div>
        <h3>The work that keeps piling up.</h3>
        <ul class="possibilities-outcomes">
          <li>Research you have to gather again and again.</li>
          <li>Content that always starts from the same information.</li>
        </ul>
      </article>
      <div class="possibilities-connector" aria-hidden="true"></div>
      <article class="possibilities-step">
        <div class="possibilities-number">02</div>
        <div class="possibilities-stage">Let AI handle</div>
        <h3>The repeatable steps.</h3>
        <ul class="possibilities-outcomes">
          <li>Information gets organised before you need it.</li>
          <li>Follow-up happens when it should.</li>
        </ul>
      </article>
      <div class="possibilities-connector" aria-hidden="true"></div>
      <article class="possibilities-step is-final">
        <div class="possibilities-number">03</div>
        <div class="possibilities-stage">You keep</div>
        <h3>The decisions that need you.</h3>
        <ul class="possibilities-outcomes">
          <li>More work gets finished in the background.</li>
          <li>You review, decide and stay in control.</li>
        </ul>
        <p class="possibilities-principle">AI carries the repeatable work. You keep the judgment.</p>
      </article>
    </div>
    <div class="possibilities-action"><a class="btn-primary" href="#further">Show me what to build first →</a></div>
  </div>
</section>`;

function cleanOldInjectedMedia(html) {
  return html
    .replace(/\s*<style id="brand-consistency-v2">[\s\S]*?<\/style>/g, '')
    .replace(/\s*<style id="editorial-photo-system">[\s\S]*?<\/style>/g, '')
    .replace(/\s*<style id="mascot-visual-system">[\s\S]*?<\/style>/g, '')
    .replace(/\s*<div class="editorial-photo-band"[^>]*>[\s\S]*?<\/div>/g, '')
    .replace(/\s*<img class="quiz-mascot"[^>]*>/g, '')
    .replace(/\s*<img class="brief-mascot"[^>]*>/g, '');
}

function patch(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('/_next/static/')) return;
  const before = html;
  const kind = kindFor(file);

  html = cleanOldInjectedMedia(html);

  if (!html.includes('family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600')) {
    html = html.replace('</head>', `${FONT_LINK}\n</head>`);
  }

  html = html.replace(/\s*<link rel="stylesheet" href="\/assets\/brand-system\.css(?:\?v=[^"]*)?">/g, '');
  html = html.replace('</head>', `${BRAND_LINK}\n</head>`);

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
    html = html.replace(/<section class="possibilities-journey"[\s\S]*?<\/section>/, HOME_FLOW);
  }

  if (html !== before) fs.writeFileSync(file, html);
}

for (const file of [...walk(MAIN), ...walk(BRIEF)]) patch(file);
console.log('Applied page-aware brand system without duplicate editorial media.');
