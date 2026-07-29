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
