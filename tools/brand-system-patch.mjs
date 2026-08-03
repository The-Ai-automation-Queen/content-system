#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const BRIEF = path.join(ROOT, 'ai-insider-brief', 'ai-insider-brief');
const FONT_LINK = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">';
const BRAND_LINK = '<link rel="stylesheet" href="/assets/brand-system.css">';

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

function patch(file) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // Remove the temporary inline design override from the earlier pass.
  html = html.replace(/\s*<style id="brand-consistency-v2">[\s\S]*?<\/style>/g, '');

  // Always load the complete shared font set. This fixes pages that only asked
  // Google Fonts for bold Playfair while the design system expected regular 400.
  if (!html.includes('family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600')) {
    html = html.replace('</head>', `${FONT_LINK}\n</head>`);
  }

  // Brand system must load last so it resolves legacy page-level conflicts.
  html = html.replace(/\s*<link rel="stylesheet" href="\/assets\/brand-system\.css(?:\?v=[^"]*)?">/g, '');
  html = html.replace('</head>', `${BRAND_LINK}\n</head>`);

  const kind = kindFor(file);
  html = html.replace(/<body([^>]*)>/, (_m, attrs) => {
    const clean = attrs
      .replace(/\sdata-brand-page="[^"]*"/g, '')
      .replace(/\sdata-page-kind="[^"]*"/g, '');
    return `<body${clean} data-page-kind="${kind}">`;
  });

  // Main-site chrome gets one responsive mobile menu from the same nav data.
  if (!file.startsWith(BRIEF) && html.includes('class="site-nav"')) {
    html = html.replace(/<details class="site-nav-mobile">[\s\S]*?<\/details>/g, '');
    html = html.replace(/(<div class="site-nav-links">[\s\S]*?<\/div>)(\s*<\/div>\s*<\/nav>)/, `$1\n    ${MOBILE}$2`);
  }

  if (html !== before) fs.writeFileSync(file, html);
}

for (const file of [...walk(MAIN), ...walk(BRIEF)]) patch(file);
console.log('Applied final responsive brand system.');
