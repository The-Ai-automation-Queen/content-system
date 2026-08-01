#!/usr/bin/env node
// tools/include.mjs - the tiny include script.
//
// The three sites share one design system. This script is the only build step:
// it copies shared/assets and shared/partials into each site root, then stamps
// each partial's markup into every page that declares a slot for it.
//
//   node tools/include.mjs           stamp everything
//   node tools/include.mjs --check   report drift, write nothing (exit 1 if drifted)
//
// A page declares a slot with a marker pair:
//
//   <!-- partial:gate --><!-- /partial:gate -->
//
// Everything between the markers is replaced with the shared partial. Partials
// are stamped into the HTML on disk, not fetched at runtime, so the markup is
// in the DOM for search engines and works with JavaScript switched off.
//
// Per-page values survive re-stamping: a data-source attribute already present
// in the page is carried across.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHARED = path.join(ROOT, 'shared');

const SITE_ROOTS = ['site', 'main-site', 'ai-insider-brief/ai-insider-brief'];

const check = process.argv.includes('--check');
let changed = 0;
let wouldChange = [];

/* ------------------------------------------------------------ copy assets */

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) { copyDir(src, dst); continue; }
    const next = fs.readFileSync(src);
    const prev = fs.existsSync(dst) ? fs.readFileSync(dst) : null;
    if (prev && prev.equals(next)) continue;
    if (check) { wouldChange.push(path.relative(ROOT, dst)); continue; }
    fs.writeFileSync(dst, next);
    changed++;
  }
}

for (const site of SITE_ROOTS) {
  const root = path.join(ROOT, site);
  if (!fs.existsSync(root)) continue;
  // Only assets are published. Partials are stamped into the pages below, so
  // they never need to be reachable as fragments on the live site.
  copyDir(path.join(SHARED, 'assets'), path.join(root, 'assets'));
}

/* -------------------------------------------------------- stamp partials */

const partials = new Map();
for (const file of fs.readdirSync(path.join(SHARED, 'partials'))) {
  if (!file.endsWith('.html')) continue;
  partials.set(
    path.basename(file, '.html'),
    fs.readFileSync(path.join(SHARED, 'partials', file), 'utf8').trim()
  );
}

/* -------------------------------------------------- chrome from site.json

   One nav and one footer for the whole estate, generated from data/site.json
   and stamped between <!-- chrome:nav --> / <!-- chrome:footer --> markers.
   Editing site.json and re-running this script is the only way chrome
   changes; nothing is hand-edited per page. */

const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'site.json'), 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;');

const chromeNav =
  `<nav class="site-nav" aria-label="Site">\n  <div class="site-nav-inner">\n` +
  `    <a class="site-nav-logo" href="${site.hosts.www}/">${esc(site.brand)}</a>\n` +
  `    <div class="site-nav-links">\n` +
  site.nav.map((n) =>
    `      <a${n.cta ? ' class="nav-cta"' : ''} href="${n.url}">${esc(n.label)}</a>`
  ).join('\n') +
  `\n    </div>\n  </div>\n</nav>`;

const chromeFooter =
  `<footer class="chrome-foot">\n  <div class="chrome-foot-grid">\n` +
  site.footer.map((col) =>
    `    <section>\n      <h2>${esc(col.title)}</h2>\n      <ul>\n` +
    col.links.map((l) => `        <li><a href="${l.url}">${esc(l.label)}</a></li>`).join('\n') +
    `\n      </ul>\n    </section>`
  ).join('\n') +
  `\n  </div>\n  <p class="chrome-foot-legal">&copy; <time datetime="${site.year}">${site.year}</time> ${esc(site.brand)}. All rights reserved.</p>\n</footer>`;

function stampChrome(html) {
  return html
    .replace(/(<!-- chrome:nav -->)[\s\S]*?(<!-- \/chrome:nav -->)/,
      `$1\n${chromeNav}\n$2`)
    .replace(/(<!-- chrome:footer -->)[\s\S]*?(<!-- \/chrome:footer -->)/,
      `$1\n${chromeFooter}\n$2`);
}

/* ------------------------------------------- data + copy spans from /data

   <!-- data:the99.hired -->3<!-- /data:the99.hired -->   number/string values
   <!-- copy:home.pain_cta -->...<!-- /copy:home.pain_cta -->  copy.json keys
   <!-- date:guides.0.dateModified -->...<!-- /date... -->  as <time> element

   Re-running the script re-stamps in place, so nothing drifts from the data
   files and no year ever needs hand-editing in a page again. */

const the99 = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'the99.json'), 'utf8'));
const briefData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'brief.json'), 'utf8'));
const guidesData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'guides.json'), 'utf8'));
const copy = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'copy.json'), 'utf8'));
const CTX = { site, quiz: site.quiz, the99, brief: briefData, guides: guidesData.guides,
  guideCount: guidesData.guides.length };

const get = (obj, dotted) => dotted.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const asTime = (iso) => {
  const d = new Date(iso);
  return `<time datetime="${iso}">${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}</time>`;
};

function stampSpans(html) {
  return html
    .replace(/<!-- data:([\w.]+) -->[\s\S]*?<!-- \/data:\1 -->/g,
      (_m, key) => `<!-- data:${key} -->${get(CTX, key) ?? 'MISSING:' + key}<!-- /data:${key} -->`)
    .replace(/<!-- copy:([\w.]+) -->[\s\S]*?<!-- \/copy:\1 -->/g,
      (_m, key) => `<!-- copy:${key} -->${get(copy, key) ?? 'MISSING:' + key}<!-- /copy:${key} -->`)
    .replace(/<!-- date:([\w.]+) -->[\s\S]*?<!-- \/date:\1 -->/g,
      (_m, key) => `<!-- date:${key} -->${asTime(get(CTX, key))}<!-- /date:${key} -->`);
}

/* Library cards, grouped into the three tracks, generated from guides.json.
   Covers ship with real width/height so the grid never shifts as they load. */
const TRACKS = [
  ['understand', 'Understand it', 'Plain answers to what AI is and what the words mean.'],
  ['tools', 'Choose your tools', 'One honest verdict per tool: where it earns its keep, where it will burn you.'],
  ['setup', 'Put it to work', 'Step-by-step setups that hand a real task to AI this week.']
];
const libraryCards =
  TRACKS.map(([track, title, sub]) => {
    const items = guidesData.guides.filter((g) => g.track === track && g.status === 'live');
    return `  <section class="lib-track" id="track-${track}">\n` +
      `    <h2>${title}</h2>\n    <p class="lib-track-sub">${sub}</p>\n` +
      `    <div class="card-grid">\n` +
      items.map((g) =>
        `      <a class="card" href="guides/${g.slug}.html">\n` +
        `        <img src="${g.cover}" alt="Cover art for the guide: ${g.title.replace(/"/g, '&quot;')}" width="411" height="231" loading="lazy" decoding="async">\n` +
        `        <div class="card-body">\n` +
        `          <p class="card-kicker mono">${g.formatLabel}</p>\n` +
        `          <h3>${g.title.replace(/&/g, '&amp;')}</h3>\n` +
        `          <p class="card-desc">Updated ${asTime(g.dateModified)} &middot; ${g.readMinutes} min read</p>\n` +
        `        </div>\n      </a>`
      ).join('\n') +
      `\n    </div>\n  </section>`;
  }).join('\n');

const demoted = guidesData.guides.filter((g) => g.status === 'demoted');
const demotedList = demoted.length
  ? `  <section class="lib-track" id="track-more-tools">\n` +
    `    <h3>More tool verdicts</h3>\n    <ul class="lib-more">\n` +
    demoted.map((g) => `      <li><a href="guides/${g.slug}.html">${g.title.replace(/&/g, '&amp;')}</a></li>`).join('\n') +
    `\n    </ul>\n  </section>`
  : '';

function stampLibrary(html) {
  return html.replace(/(<!-- data:library-cards -->)[\s\S]*?(<!-- \/data:library-cards -->)/,
    `$1\n${libraryCards}\n${demotedList}\n$2`);
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

function carryAttributes(previous, next) {
  // Keep the per-page lead source tag when the shared markup is re-stamped.
  const prevSource = previous && previous.match(/data-source="([^"]*)"/);
  if (!prevSource) return next;
  return next.replace(/data-source="[^"]*"/, `data-source="${prevSource[1]}"`);
}

/* ------------------------------------------------- version the local assets

   Every local stylesheet and script gets ?v=<hash of its own contents>. This
   used to be a hand-typed date that someone had to remember to bump, and on
   29/07/2026 nobody did: styles.css and app.js changed, their ?v= did not, and
   returning visitors got new HTML against their old cached CSS. Classes that
   only existed in the new file had no rules, so parts of the page rendered as
   unstyled plain text. Deriving the version from the file removes the step that
   can be forgotten. */

const hashes = new Map();

function versionOf(diskPath) {
  if (!hashes.has(diskPath)) {
    hashes.set(diskPath, fs.existsSync(diskPath)
      ? crypto.createHash('sha256').update(fs.readFileSync(diskPath)).digest('hex').slice(0, 8)
      : null);
  }
  return hashes.get(diskPath);
}

function stampVersions(html, file, siteRoot) {
  return html.replace(
    /((?:href|src)=")([^"]+\.(?:css|js))(\?[^"]*)?(")/g,
    (whole, lead, url, _query, tail) => {
      if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return whole;
      const disk = url.startsWith('/')
        ? path.join(siteRoot, url.slice(1))
        : path.resolve(path.dirname(file), url);
      const v = versionOf(disk);
      return v ? `${lead}${url}?v=${v}${tail}` : whole;
    }
  );
}

const files = SITE_ROOTS.flatMap((s) => walk(path.join(ROOT, s)));
const siteRootOf = (file) =>
  path.join(ROOT, SITE_ROOTS.find((s) => file.startsWith(path.join(ROOT, s) + path.sep)));

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  for (const [name, body] of partials) {
    const re = new RegExp(
      `(<!--\\s*partial:${name}\\s*-->)([\\s\\S]*?)(<!--\\s*/partial:${name}\\s*-->)`,
      'g'
    );
    html = html.replace(re, (_m, open, previous, close) =>
      `${open}\n${carryAttributes(previous, body)}\n${close}`);
  }

  html = stampChrome(html);
  html = stampSpans(html);
  html = stampLibrary(html);
  html = stampVersions(html, file, siteRootOf(file));

  if (html === before) continue;
  if (check) { wouldChange.push(path.relative(ROOT, file)); continue; }
  fs.writeFileSync(file, html);
  changed++;
}

/* ------------------------------------------------------------------ report */

if (check) {
  if (wouldChange.length) {
    console.log('Out of sync with shared/:');
    for (const f of wouldChange) console.log(`  ${f}`);
    process.exit(1);
  }
  console.log('Everything is in sync with shared/.');
} else {
  console.log(`Stamped shared assets and partials. ${changed} file(s) updated.`);
}
