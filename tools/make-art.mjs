#!/usr/bin/env node
// tools/make-art.mjs - cover and figure art for the guide library.
//
//   node tools/make-art.mjs
//
// Every guide gets two pieces of art, generated here rather than fetched:
//
//   site/assets/covers/<slug>.svg   1280x720 cover, used at the top of the
//                                   guide and as the card image in the library
//   site/assets/art/<slug>-fit.svg  in-body figure: where the tool earns its
//                                   keep against where it will burn you
//
// Both are SVG, drawn from the brand palette only, and deterministic: the same
// slug always produces the same art, so a re-run never churns the repo. No API
// keys, no external service, nothing to pay for.
//
// Type note: SVG loaded through an <img> cannot pull a web font, so the art
// uses Georgia, which is the declared fallback for Playfair Display in the
// brand DNA, and a generic monospace for the eyebrows.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_COVERS = path.join(ROOT, 'site', 'assets', 'covers');
const OUT_ART = path.join(ROOT, 'site', 'assets', 'art');

const INK = '#1a1a1a';
const CREAM = '#FAF7F2';
const PAPER = '#ffffff';
const BLUE = '#2C4BE0';
const BLUE_DEEP = '#1B2EA0';
const LINE = '#E8E4DD';

const DISPLAY = "Georgia,'Times New Roman',serif";
const MONO = "ui-monospace,'SF Mono',Menlo,monospace";

/* ------------------------------------------------------------- utilities */

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Deterministic per-slug seed so the motif differs between guides but never
// changes between runs.
function seedOf(slug) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let s = seed || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

// Greedy wrap on an approximate character width for the given font size.
function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) { lines.push(line); line = w; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/* ------------------------------------------------------------ cover art */

// A quiet editorial motif: a column of hairline rules with a few filled marks,
// seeded per guide. It reads as a page of text seen from a distance, which is
// what these guides are.
function motif(seed) {
  const rand = rng(seed);
  const parts = [];
  const x0 = 860;
  const width = 304;
  let y = 120;
  for (let row = 0; row < 22; row++) {
    const w = Math.round(width * (0.35 + rand() * 0.65));
    const filled = rand() > 0.78;
    if (filled) {
      parts.push(`<rect x="${x0}" y="${y}" width="${w}" height="7" rx="3.5" fill="${BLUE}" opacity="${(0.35 + rand() * 0.5).toFixed(2)}"/>`);
    } else {
      parts.push(`<rect x="${x0}" y="${y + 2}" width="${w}" height="2" rx="1" fill="${BLUE_DEEP}" opacity="0.16"/>`);
    }
    y += 22.4;
  }
  // one solid accent block, position seeded
  const by = 120 + Math.floor(rand() * 18) * 22.4;
  parts.push(`<rect x="${x0 - 21}" y="${by - 5}" width="6" height="27" rx="4" fill="${BLUE}"/>`);
  return parts.join('\n    ');
}

// The title column runs from x=88 to the hairline at x=816, so 712px of
// room. Step the type down until the longest line fits in at most four lines.
function fitTitle(text) {
  const AVAILABLE = 712;
  const CHAR = 0.52; // rough em width of Georgia bold
  for (const size of [93, 80, 67, 58, 48, 42]) {
    const maxChars = Math.floor(AVAILABLE / (size * CHAR));
    const lines = wrap(text, maxChars);
    if (lines.length <= 4 && lines.every((l) => l.length <= maxChars)) {
      return { lines, size };
    }
  }
  return { lines: wrap(text, 34).slice(0, 4), size: 42 };
}

function cover(guide) {
  const seed = seedOf(guide.slug);
  const { lines: titleLines, size } = fitTitle(guide.h1);
  const step = size * 1.06;
  const startY = 376 - ((titleLines.length - 1) * step * 0.5);
  const ruleY = startY + ((titleLines.length - 1) * step) + 42;

  const title = titleLines
    .map((l, i) => `<tspan x="88" dy="${i === 0 ? 0 : step}">${esc(l)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" role="img" aria-label="${esc(guide.h1)}">
  <rect width="1280" height="720" fill="${CREAM}"/>
  <rect x="0" y="0" width="1280" height="8" fill="${BLUE}"/>
  <rect x="816" y="0" width="1" height="720" fill="${LINE}"/>
  <g>
    ${motif(seed)}
  </g>
  <text x="88" y="120" font-family="${MONO}" font-size="19" letter-spacing="3.6" fill="${BLUE_DEEP}">${esc(guide.kicker.toUpperCase())}</text>
  <text y="${startY}" font-family="${DISPLAY}" font-size="${size}" font-weight="700" fill="${INK}">${title}</text>
  <rect x="88" y="${ruleY}" width="96" height="3" fill="${BLUE}"/>
  <text x="88" y="640" font-family="${MONO}" font-size="18" letter-spacing="3.2" fill="${INK}" opacity="0.55">SHIFT &amp; LEAD</text>
  <text x="88" y="669" font-family="${DISPLAY}" font-size="19" font-style="italic" fill="${INK}" opacity="0.45">guides.shiftandlead.com</text>
</svg>
`;
}

/* ------------------------------------------------------------ figure art */

// The in-body figure is the verdict drawn out: what the thing is good for on
// one side, what will bite you on the other, and the call underneath.
function fitFigure(guide) {
  const good = wrap(guide.bestFor, 34).slice(0, 4);
  const bad = wrap(guide.carefulWith, 34).slice(0, 4);
  const call = wrap(guide.whatIdDo, 78).slice(0, 2);

  const lines = (arr, x, y) => arr
    .map((l, i) => `<text x="${x}" y="${y + i * 40}" font-family="${DISPLAY}" font-size="30" fill="${INK}">${esc(l)}</text>`)
    .join('\n  ');

  const callLines = call
    .map((l, i) => `<text x="800" y="${648 + i * 42}" text-anchor="middle" font-family="${DISPLAY}" font-size="32" font-style="italic" fill="${BLUE_DEEP}">${esc(l)}</text>`)
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 800" width="1600" height="800" role="img" aria-label="${esc(guide.figCaption)}">
  <rect width="1600" height="800" fill="${PAPER}"/>
  <rect x="80" y="70" width="680" height="420" rx="18" fill="${CREAM}" stroke="${LINE}"/>
  <rect x="840" y="70" width="680" height="420" rx="18" fill="${PAPER}" stroke="${LINE}"/>
  <rect x="80" y="70" width="6" height="420" rx="3" fill="${BLUE}"/>
  <rect x="840" y="70" width="6" height="420" rx="3" fill="${INK}"/>
  <text x="130" y="140" font-family="${MONO}" font-size="21" letter-spacing="3.5" fill="${BLUE_DEEP}">WHERE IT EARNS ITS KEEP</text>
  <text x="890" y="140" font-family="${MONO}" font-size="21" letter-spacing="3.5" fill="${INK}">WHERE IT WILL BURN YOU</text>
  ${lines(good, 130, 220)}
  ${lines(bad, 890, 220)}
  <rect x="80" y="560" width="1440" height="1" fill="${LINE}"/>
  <text x="800" y="606" text-anchor="middle" font-family="${MONO}" font-size="20" letter-spacing="3.5" fill="${BLUE_DEEP}">WHAT I WOULD ACTUALLY DO</text>
  ${callLines}
</svg>
`;
}

/* ------------------------------- newsletter art (used by the nl partial) */

function briefArt() {
  const row = (y, w, verdict, tone) => `
  <rect x="40" y="${y}" width="${w}" height="10" rx="5" fill="${INK}" opacity="0.72"/>
  <rect x="40" y="${y + 26}" width="${w - 70}" height="6" rx="3" fill="${INK}" opacity="0.22"/>
  <rect x="330" y="${y - 8}" width="110" height="34" rx="17" fill="${tone}"/>
  <text x="385" y="${y + 15}" text-anchor="middle" font-family="${MONO}" font-size="15" letter-spacing="1.5" fill="#ffffff">${verdict}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" width="480" height="360" role="img" aria-label="A weekly briefing card showing three headlines each marked with a plain verdict.">
  <rect width="480" height="360" fill="${CREAM}"/>
  <rect x="20" y="20" width="440" height="320" rx="16" fill="${PAPER}" stroke="${LINE}"/>
  <text x="40" y="62" font-family="${MONO}" font-size="14" letter-spacing="3" fill="${BLUE_DEEP}">THE INSIDER BRIEF</text>
  <rect x="40" y="78" width="400" height="1" fill="${LINE}"/>
  ${row(120, 260, 'ACT NOW', BLUE)}
  ${row(200, 300, 'WATCH', BLUE_DEEP)}
  ${row(280, 230, 'IGNORE', '#1a1a1a')}
</svg>
`;
}

/* ------------------------------------------------------------------- run */

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'guides.json'), 'utf8'));

fs.mkdirSync(OUT_COVERS, { recursive: true });
fs.mkdirSync(OUT_ART, { recursive: true });

let written = 0;
function put(file, body) {
  const prev = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (prev === body) return;
  fs.writeFileSync(file, body);
  written++;
}

for (const guide of manifest.guides) {
  put(path.join(OUT_COVERS, `${guide.slug}.svg`), cover(guide));
  put(path.join(OUT_ART, `${guide.slug}-fit.svg`), fitFigure(guide));
}
// The newsletter block appears on all three sites, so its art lives in shared/
// and is distributed by tools/include.mjs.
const SHARED_ART = path.join(ROOT, 'shared', 'assets', 'art');
fs.mkdirSync(SHARED_ART, { recursive: true });
put(path.join(SHARED_ART, 'insider-brief.svg'), briefArt());

console.log(`Art generated for ${manifest.guides.length} guides. ${written} file(s) written.`);
