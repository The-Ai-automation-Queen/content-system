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

function priceOf(id) {
  const o = site.offers.find((x) => x.id === id);
  if (!o || !o.priceBand || o.priceBand.includes('TODO')) return '';
  return `<p class="price-band mono">${o.priceBand}</p>`;
}

function stampSpans(html) {
  return html
    .replace(/<!-- data:([\w.]+) -->[\s\S]*?<!-- \/data:\1 -->/g,
      (_m, key) => `<!-- data:${key} -->${get(CTX, key) ?? 'MISSING:' + key}<!-- /data:${key} -->`)
    .replace(/<!-- copy:([\w.]+) -->[\s\S]*?<!-- \/copy:\1 -->/g,
      (_m, key) => `<!-- copy:${key} -->${get(copy, key) ?? 'MISSING:' + key}<!-- /copy:${key} -->`)
    .replace(/<!-- date:([\w.]+) -->[\s\S]*?<!-- \/date:\1 -->/g,
      (_m, key) => `<!-- date:${key} -->${asTime(get(CTX, key))}<!-- /date:${key} -->`)
    .replace(/<!-- price:([\w-]+) -->[\s\S]*?<!-- \/price:\1 -->/g,
      (_m, id) => `<!-- price:${id} -->${priceOf(id)}<!-- /price:${id} -->`);
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
        `      <a class="card" href="${g.slug}.html">\n` +
        `        <img src="${g.cover}" alt="Cover art for the guide: ${g.title.replace(/"/g, '&quot;')}" width="411" height="231" loading="lazy" decoding="async">\n` +
        `        <div class="card-body">\n` +
        `          <p class="card-kicker mono">${g.formatLabel}</p>\n` +
        `          <h3>${g.title.replace(/&/g, '&amp;')}</h3>\n` +
        `          <p class="card-desc">Updated ${asTime(g.dateModified)} &middot; ${g.readMinutes} min read</p>\n` +
        `        </div>\n      </a>`
      ).join('\n') +
      `\n    </div>\n  </section>`;
  }).join('\n');

// The current AI tools hub links all 10 full verdicts. Keep the old comparison
// route retired so the legacy builder cannot reintroduce a second tool hub.
const demotedList =
  `  <p class="lib-more"><a href="which-ai-tool-for-what.html">See which AI tool fits which job</a></p>`;

function stampLibrary(html) {
  return html.replace(/(<!-- data:library-cards -->)[\s\S]*?(<!-- \/data:library-cards -->)/,
    `$1\n${libraryCards}\n${demotedList}\n$2`);
}

/* Visible byline under each guide H1, from that guide's row in guides.json. */
function stampByline(html, file) {
  const slug = path.basename(file, '.html');
  const g = guidesData.guides.find((x) => x.slug === slug);
  if (!g) return html;
  const byline = `<p class="guide-byline mono">${g.formatLabel} &middot; Updated ${asTime(g.dateModified)} &middot; ${g.readMinutes} min read</p>`;
  return html.replace(/(<!-- data:guide-byline -->)[\s\S]*?(<!-- \/data:guide-byline -->)/,
    `$1${byline}$2`);
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
  html = stampByline(html, file);
  html = stampVersions(html, file, siteRootOf(file));

  if (html === before) continue;
  if (check) { wouldChange.push(path.relative(ROOT, file)); continue; }
  fs.writeFileSync(file, html);
  changed++;
}


/* ------------------------------------------------- sitemaps from the tree

   One sitemap per property, listing every indexable page with a lastmod:
   guides use their dateModified from guides.json, everything else the day
   the build ran. A page opted out with noindex never appears. */

function buildSitemap(rootDir, host) {
  const urls = [];
  const today = new Date().toISOString().slice(0, 10);
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === '_archive') continue;
      const f = path.join(d, e.name);
      if (e.isDirectory()) { walk(f); continue; }
      if (!e.name.endsWith('.html')) continue;
      const html = fs.readFileSync(f, 'utf8');
      if (/noindex/.test(html)) continue;
      if (/http-equiv="refresh"/.test(html)) continue;
      const relPath = f.slice(path.join(ROOT, rootDir).length).replace(/\\/g, '/');
      const g = guidesData.guides.find((x) => relPath === `/guides/${x.slug}.html`);
      urls.push({ loc: host + relPath, lastmod: g ? g.dateModified : today });
    }
  })(path.join(ROOT, rootDir));
  urls.sort((a, b) => a.loc.localeCompare(b.loc));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, rootDir, 'sitemap.xml'), xml);
}

/* -------------------------------------------- brief issue permalinks

   The feed is rendered by JS, which a crawler may never run. Each ISO week
   of briefing cards gets a static permalink page under /issues/, generated
   from data/briefs.json, plus an index. Titles only: the full card lives in
   the feed, the permalink makes the issue linkable and crawlable. */

function isoWeek(d) {
  const dt = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = dt.getUTCDay() || 7;
  dt.setUTCDate(dt.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  return [dt.getUTCFullYear(), Math.ceil((((dt - y0) / 864e5) + 1) / 7)];
}

function buildBriefIssues() {
  const briefRoot = path.join(ROOT, 'ai-insider-brief/ai-insider-brief');
  const cards = JSON.parse(fs.readFileSync(path.join(briefRoot, 'data', 'briefs.json'), 'utf8')).cards || [];
  const weeks = new Map();
  for (const c of cards) {
    const d = new Date(c.timestamp);
    const [y, w] = isoWeek(d);
    const key = `${y}-w${String(w).padStart(2, '0')}`;
    if (!weeks.has(key)) weeks.set(key, []);
    weeks.get(key).push(c);
  }
  const dir = path.join(briefRoot, 'issues');
  fs.mkdirSync(dir, { recursive: true });
  const shell = (title, desc, canonical, h1, inner) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.hosts.brief}/og-image.png">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body class="guide">
<!-- chrome:nav --><!-- /chrome:nav -->
<main class="guide-doc">
<h1>${h1}</h1>
${inner}
<p><a href="/">Read the full cards on the live feed</a></p>
</main>
<!-- chrome:footer --><!-- /chrome:footer -->
</body>
</html>`;
  const keys = [...weeks.keys()].sort().reverse();
  for (const key of keys) {
    const list = weeks.get(key).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const first = new Date(list[list.length - 1].timestamp);
    const items = list.map((c) =>
      `  <li>${asTime(c.timestamp.slice(0, 10))} &middot; ${(c.category || '')} &middot; ${String(c.title || c.headline || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\b(20\d\d)\b/g, '<time datetime="$1">$1</time>')}</li>`
    ).join('\n');
    fs.writeFileSync(path.join(dir, `${key}.html`), stampChrome(shell(
      `AI Insider Brief: the week ${key.slice(-2)} briefings in review`,
      `Every AI briefing card from week ${key.slice(-2)}: what changed, whether it matters for your business, and what to watch next, in plain English and free.`,
      `${site.hosts.brief}/issues/${key}.html`,
      `The week of ${asTime(first.toISOString().slice(0, 10))}`,
      `<ul class="prose">\n${items}\n</ul>`)));
  }
  const idx = keys.map((k) => `  <li><a href="/issues/${k}.html">Week ${k.slice(-2)} of <time datetime="${k.slice(0, 4)}">${k.slice(0, 4)}</time></a> &middot; ${weeks.get(k).length} briefings</li>`).join('\n');
  fs.writeFileSync(path.join(dir, 'index.html'), stampChrome(shell(
    'AI Insider Brief archive: every weekly issue | Shift & Lead',
    'Every issue of the AI Insider Brief, week by week: plain-English verdicts on the AI news that matters to business owners. Free, no email needed to read.',
    `${site.hosts.brief}/issues/`,
    'Every issue, week by week',
    `<ul class="prose">\n${idx}\n</ul>`)));
}
if (!check) buildBriefIssues();

if (!check) {
  buildSitemap('site', site.hosts.guides);
  buildSitemap('main-site', site.hosts.www);
  buildSitemap('ai-insider-brief/ai-insider-brief', site.hosts.brief);
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
