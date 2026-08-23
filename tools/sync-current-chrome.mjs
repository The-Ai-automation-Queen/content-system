#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(fs.readFileSync(path.join(root, 'data/site.json'), 'utf8'));
const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const links = site.nav.map((item) => `<a${item.cta ? ' class="nav-cta"' : ''} href="${item.url}">${esc(item.label)}</a>`).join('');
const nav = `<nav class="site-nav" aria-label="Site"><div class="site-nav-inner"><a class="site-nav-logo" href="${site.hosts.www}/">${esc(site.brand)}</a><div class="site-nav-links">${links}</div><details class="site-nav-mobile"><summary>Menu</summary><div class="site-nav-mobile-panel">${links}</div></details></div></nav>`;
const footer = `<footer class="chrome-foot"><div class="chrome-foot-grid">${site.footer.map((column) => `<section><h2>${esc(column.title)}</h2><ul>${column.links.map((link) => `<li><a href="${link.url}">${esc(link.label)}</a></li>`).join('')}</ul></section>`).join('')}</div><p class="chrome-foot-legal">&copy; <time datetime="${site.year}">${site.year}</time> ${esc(site.brand)}. All rights reserved.</p></footer>`;

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '_archive' || entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(path.join(root, 'main-site'))) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before
    .replace(/(<!-- chrome:nav -->)[\s\S]*?(<!-- \/chrome:nav -->)/, `$1\n${nav}\n$2`)
    .replace(/(<!-- chrome:footer -->)[\s\S]*?(<!-- \/chrome:footer -->)/, `$1\n${footer}\n$2`)
    .replace(/(\.chrome-foot-legal\{[^{}]*?)font-size:0!important;/g, '$1font-size:11px!important;')
    .replace(/\s*\.chrome-foot-legal::before\{content:"©[^"]*";[^{}]*\}/g, '');
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}
console.log(`Synced current navigation and footer in ${changed} file(s).`);
