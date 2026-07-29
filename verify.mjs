#!/usr/bin/env node
// verify.mjs - Shift & Lead static site verification harness.
// Zero dependencies. Node 18+.
//
//   node verify.mjs --all
//   node verify.mjs site/guides/claude.html
//   node verify.mjs --all --quiet     (only show failures)
//
// Every check prints PASS or FAIL with the file and a one-line reason.
// Exit code 0 when everything passes, 1 when anything fails.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/* ---------------------------------------------------------------- config */

// The three site roots. Anything under these is checked by --all.
const SITE_ROOTS = [
  { name: 'guides.shiftandlead.com', dir: 'site' },
  { name: 'www.shiftandlead.com', dir: 'main-site' },
  { name: 'brief.shiftandlead.com', dir: 'ai-insider-brief/ai-insider-brief' },
];

// Brand DNA. Any hex colour in a page must be one of these (case-insensitive).
// Greys used for body/secondary text are listed explicitly so a drifting
// palette shows up as a failure rather than passing quietly.
const PALETTE = new Set([
  '#ffffff', '#fff',
  '#faf7f2',
  '#2c4be0',
  '#1b2ea0',
  '#e8e4dd',
  '#1a1a1a',
  // approved neutrals already in use across the brand
  '#333', '#444', '#555', '#666', '#888',
  '#e4eafb', '#8ea8ff',
  '#000', '#000000',
  // Pre-existing semantic red, used only for negative-state markers (the cross
  // in a "what this costs you" list, the chip on an expiring offer). It is not
  // part of the brand DNA and it is not decorative. Left as-is rather than
  // recoloured, because changing it is a design decision, not a consolidation.
  // Flagged in PROGRESS.md for Fatiha.
  '#e63955',
]);

// Script/style hosts already in use. Nothing new may be introduced.
const ALLOWED_HOSTS = new Set([
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'stats.shiftandlead.com',
  // own properties
  'shiftandlead.com',
  'www.shiftandlead.com',
  'guides.shiftandlead.com',
  'brief.shiftandlead.com',
  'auto.shiftandlead.com',
]);

// Form endpoints already in use. Changing one is a FAIL, not a silent edit.
const ALLOWED_FORM_ENDPOINTS = [
  'https://formspree.io/f/',
  'https://auto.shiftandlead.com/webhook/',
  'https://guides.shiftandlead.com',
  'systeme.io',
  'substack.com',
];

// Voice laws. These strings must not appear in any public-facing page.
const BANNED_SUBSTRINGS = [
  'chez ',
  'kitchen map',
  'the kitchen itself',
  'restaurant',
  'dining room',
  'ghost kitchen',
  'order slip',
  'order ticket',
  'the plate',
  'the door,',
  'café',
  'cafe,',
  'maitre',
  'sommelier',
  'chef',
  'menu of',
  'on the menu',
];

// Things that look like secrets. Never allowed in a tracked file.
const SECRET_PATTERNS = [
  /sk-[A-Za-z0-9_-]{16,}/,
  /sk-ant-[A-Za-z0-9_-]{10,}/,
  /AIza[0-9A-Za-z_-]{30,}/,
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\b(api[_-]?key|secret|password|access[_-]?token)\s*[:=]\s*["'][^"'{}\s]{12,}["']/i,
];

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
  'meta', 'param', 'source', 'track', 'wbr',
]);

// Pages that are deliberately tiny redirect stubs; most checks do not apply.
const isRedirectStub = (html) =>
  /<meta\s+http-equiv=["']refresh["']/i.test(html);

/* ------------------------------------------------------------- reporting */

let PASS = 0;
let FAIL = 0;
const failures = [];
const PLACEHOLDER_FORMS = [];
const PLACEHOLDER_COPY = [];
let quiet = false;

function record(ok, file, check, reason) {
  if (ok) {
    PASS++;
    if (!quiet) console.log(`  PASS  ${check}`);
  } else {
    FAIL++;
    failures.push({ file, check, reason });
    console.log(`  FAIL  ${check} - ${reason}`);
  }
}

/* ---------------------------------------------------------------- parser */

// Small forgiving tokenizer. Enough to find structural breakage (unclosed or
// crossed tags) without pulling in a dependency.
function parseHtml(html) {
  const errors = [];
  const stack = [];
  const tags = []; // flat list: {name, attrs, raw, index}
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!DOCTYPE[^>]*>|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  let m;
  let skipUntil = null;

  while ((m = re.exec(html)) !== null) {
    const raw = m[0];

    // Skip the innards of raw-text elements so `a < b` in a script does not
    // read as a tag.
    if (skipUntil) {
      if (m[1] && m[1].toLowerCase() === skipUntil) {
        skipUntil = null;
        const open = stack.pop();
        if (!open || open.name !== skipUntil) { /* handled below */ }
      }
      if (m[1] && m[1].toLowerCase() === (skipUntil || '')) continue;
      if (!m[1]) continue;
      if (m[1].toLowerCase() !== 'script' && m[1].toLowerCase() !== 'style') continue;
    }

    if (raw.startsWith('<!')) continue;

    if (m[1]) {
      // closing tag
      const name = m[1].toLowerCase();
      if (VOID_ELEMENTS.has(name)) continue;
      let idx = -1;
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name === name) { idx = i; break; }
      }
      if (idx === -1) {
        errors.push(`stray closing </${name}> at offset ${m.index}`);
      } else {
        if (idx !== stack.length - 1) {
          const unclosed = stack.slice(idx + 1).map((t) => t.name);
          errors.push(`unclosed <${unclosed.join('>, <')}> inside <${name}> at offset ${m.index}`);
        }
        stack.length = idx;
      }
      continue;
    }

    const name = m[2].toLowerCase();
    const attrs = m[3] || '';
    const selfClosed = m[4] === '/';
    tags.push({ name, attrs, raw, index: m.index });

    if (VOID_ELEMENTS.has(name) || selfClosed) continue;
    if (name === 'script' || name === 'style') {
      // jump the regex past the raw text body
      const close = new RegExp(`</${name}\\s*>`, 'i');
      const rest = html.slice(re.lastIndex);
      const cm = rest.match(close);
      if (cm) re.lastIndex += cm.index + cm[0].length;
      else errors.push(`unclosed <${name}> at offset ${m.index}`);
      continue;
    }
    stack.push({ name, index: m.index });
  }

  for (const open of stack) {
    errors.push(`unclosed <${open.name}> at offset ${open.index}`);
  }

  return { errors, tags };
}

function attr(attrString, name) {
  const re = new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const m = attrString.match(re);
  if (!m) return null;
  return m[2] ?? m[3] ?? m[4] ?? '';
}

// Strip script, style and comments, then tags, to get visible copy.
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    // decode the entities that actually show up in this repo, so an
    // &mdash; is caught by the em-dash check rather than hiding behind markup
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;|&#39;|&apos;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '.')
    .replace(/&hellip;/g, '...')
    .replace(/&(?:rarr|larr|darr|uarr);/g, ' ')
    .replace(/\s+/g, ' ');
}

function countTag(tags, name) {
  return tags.filter((t) => t.name === name).length;
}

/* ----------------------------------------------------------------- checks */

function checkParses(ctx) {
  const { errors } = ctx.parsed;
  record(errors.length === 0, ctx.rel, 'html parses cleanly',
    errors.slice(0, 3).join('; '));
}

function checkSingleH1(ctx) {
  const n = countTag(ctx.parsed.tags, 'h1');
  record(n === 1, ctx.rel, 'exactly one <h1>', `found ${n}`);
}

function checkLangAndCharset(ctx) {
  const hasLang = /<html[^>]*\blang=/i.test(ctx.html);
  const hasCharset = /<meta[^>]*charset=/i.test(ctx.html);
  const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(ctx.html);
  record(hasLang && hasCharset && hasViewport, ctx.rel,
    'has lang, charset and viewport',
    `lang=${hasLang} charset=${hasCharset} viewport=${hasViewport}`);
}

// Read a <meta property="..."> or <meta name="..."> content value.
function metaContent(html, key) {
  const re = new RegExp(
    `<meta[^>]*(?:property|name)=["']${key}["'][^>]*content=("([^"]*)"|'([^']*)')`, 'i');
  const m = html.match(re);
  if (!m) return null;
  return (m[2] ?? m[3] ?? '').trim();
}

function checkSeoHead(ctx) {
  const title = ctx.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  // Match the closing quote to the opening one, so an apostrophe inside a
  // double-quoted attribute does not read as the end of the value.
  const desc = /<meta[^>]*name=["']description["'][^>]*content=("[^"]{20,}"|'[^']{20,}')/i.test(ctx.html);
  const canonical = /<link[^>]*rel=["']canonical["'][^>]*href=["']https?:\/\/[^"']+["']/i.test(ctx.html);
  const ok = !!title && title[1].trim().length > 10 && desc && canonical;
  record(ok, ctx.rel, 'title, meta description and canonical present',
    `title=${!!title} desc=${desc} canonical=${canonical}`);

  // Open Graph: present AND non-empty. A blank content attribute renders as a
  // blank share card, which is worse than no tag at all.
  const missing = ['og:title', 'og:description', 'og:url', 'og:image']
    .filter((k) => {
      const v = metaContent(ctx.html, k);
      return v === null || v.length === 0;
    });
  record(missing.length === 0, ctx.rel, 'og:title/description/url/image present and non-empty',
    `missing or empty: ${missing.join(', ')}`);
}

// The brief fixes cover and share art at 1280x720. SVG carries its intrinsic
// size in the root element, so this reads the file rather than trusting the
// markup.
const COVER_W = 1280;
const COVER_H = 720;

function svgSize(file) {
  const head = fs.readFileSync(file, 'utf8').slice(0, 800);
  const w = head.match(/\bwidth="(\d+(?:\.\d+)?)"/);
  const h = head.match(/\bheight="(\d+(?:\.\d+)?)"/);
  if (w && h) return { w: Number(w[1]), h: Number(h[1]) };
  const vb = head.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  return vb ? { w: Number(vb[1]), h: Number(vb[2]) } : null;
}

function localAssetPath(ctx, src) {
  if (/^(https?:)?\/\//.test(src)) {
    // Own-domain absolute URL: map it back onto the site root on disk.
    const m = src.match(/^https?:\/\/[^/]+(\/.*)$/);
    if (!m) return null;
    return path.join(ctx.siteDir, m[1].slice(1).split('?')[0]);
  }
  if (src.startsWith('data:')) return null;
  const clean = src.split('?')[0];
  return clean.startsWith('/')
    ? path.join(ctx.siteDir, clean.slice(1))
    : path.join(path.dirname(ctx.abs), clean);
}

function checkCoverDimensions(ctx) {
  const problems = [];
  const targets = [];

  const og = metaContent(ctx.html, 'og:image');
  if (og) targets.push(['og:image', og]);

  const heroMatch = ctx.html.match(
    /class=["'][^"']*\bcover\b[^"']*["'][\s\S]{0,400}?<img[^>]*src=["']([^"']+)["']/i);
  if (heroMatch) targets.push(['hero cover', heroMatch[1]]);

  for (const [label, src] of targets) {
    const file = localAssetPath(ctx, src);
    if (!file) continue;                       // off-site asset, not ours to check
    if (!fs.existsSync(file)) { problems.push(`${label} missing on disk: ${src}`); continue; }
    if (!file.endsWith('.svg')) continue;      // only SVG carries a readable size here
    const size = svgSize(file);
    if (!size) { problems.push(`${label} has no readable size: ${src}`); continue; }
    if (size.w !== COVER_W || size.h !== COVER_H) {
      problems.push(`${label} is ${size.w}x${size.h}, expected ${COVER_W}x${COVER_H}: ${src}`);
    }
  }
  record(problems.length === 0, ctx.rel,
    `og:image and hero cover exist at ${COVER_W}x${COVER_H}`,
    problems.slice(0, 3).join('; '));
}

// In-body figures must declare width and height so the page does not reflow as
// they load.
function checkFigureDimensions(ctx) {
  const figs = [...ctx.html.matchAll(/<figure[^>]*class=["'][^"']*\bfig\b[^"']*["'][\s\S]*?<\/figure>/gi)]
    .map((m) => m[0]);
  const problems = [];
  for (const fig of figs) {
    const img = fig.match(/<img[^>]*>/i);
    if (!img) { problems.push('.fig with no <img>'); continue; }
    const src = attr(img[0], 'src');
    if (!attr(img[0], 'width') || !attr(img[0], 'height')) {
      problems.push(`.fig img missing width/height: ${src || '(no src)'}`);
    }
    const file = src ? localAssetPath(ctx, src) : null;
    if (file && !fs.existsSync(file)) problems.push(`.fig img missing on disk: ${src}`);
  }
  record(problems.length === 0, ctx.rel, 'in-body .fig images exist and declare width/height',
    problems.slice(0, 3).join('; '));
}

// Everything below the fold should be lazy. The hero cover must not be, since
// it is the largest contentful paint.
// A hero image is the largest contentful paint and must load eagerly. That is
// the guide template's .cover, and on the marketing pages the portrait inside
// the first .hero block.
function heroImageTags(html) {
  const tags = [];
  const cover = html.match(/class=["'][^"']*\bcover\b[^"']*["'][\s\S]{0,400}?(<img[^>]*>)/i);
  if (cover) tags.push(cover[1]);
  const hero = html.match(/class=["'][^"']*\bhero(?:-portrait|-inner|-art)?\b[^"']*["'][\s\S]{0,1200}?(<img[^>]*>)/i);
  if (hero) tags.push(hero[1]);
  return tags;
}

function checkLazyImages(ctx) {
  const heroes = heroImageTags(ctx.html);
  const problems = [];

  for (const tag of heroes) {
    if (/loading=["']lazy["']/i.test(tag)) {
      problems.push(`hero image is lazy-loaded and should not be: ${attr(tag, 'src')}`);
    }
  }
  for (const m of ctx.html.matchAll(/<img[^>]*>/gi)) {
    const tag = m[0];
    if (heroes.includes(tag)) continue;
    const src = attr(tag, 'src') || '';
    if (src.startsWith('data:')) continue;
    if (!/loading=["']lazy["']/i.test(tag)) problems.push(`not lazy: ${src}`);
  }
  record(problems.length === 0, ctx.rel, 'images lazy-loaded except the hero image',
    problems.slice(0, 3).join('; '));
}

// Page-specific CSS belongs in a stylesheet, not in the document. A short
// inline block is fine; a whole design system is not.
const INLINE_STYLE_LIMIT = 500;

function checkInlineStyle(ctx) {
  const blocks = [...ctx.html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]);
  const oversized = blocks.filter((b) => b.length > INLINE_STYLE_LIMIT);
  record(oversized.length === 0, ctx.rel,
    `no inline <style> over ${INLINE_STYLE_LIMIT} chars`,
    oversized.map((b) => `${b.length} chars`).join(', '));
}

function checkImages(ctx) {
  const imgs = ctx.parsed.tags.filter((t) => t.name === 'img');
  const problems = [];
  for (const img of imgs) {
    const src = attr(img.attrs, 'src');
    const alt = attr(img.attrs, 'alt');
    if (!src) { problems.push('img with no src'); continue; }
    if (alt === null) problems.push(`img missing alt: ${src}`);
    if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) continue;
    const resolved = src.startsWith('/')
      ? path.join(ctx.siteDir, src.slice(1))
      : path.join(path.dirname(ctx.abs), src);
    if (!fs.existsSync(resolved.split('?')[0])) problems.push(`missing image file: ${src}`);
  }
  record(problems.length === 0, ctx.rel, 'every <img> has src, alt and a real file',
    problems.slice(0, 3).join('; '));
}

function checkLocalLinks(ctx) {
  const anchors = ctx.parsed.tags.filter((t) => t.name === 'a' || t.name === 'link');
  const problems = [];

  // Internal srcs (scripts, images, iframes) resolve too, not just hrefs.
  for (const t of ctx.parsed.tags) {
    const src = attr(t.attrs, 'src');
    if (!src) continue;
    if (/^(https?:|data:)/i.test(src) || src.startsWith('//')) continue;
    const clean = src.split('#')[0].split('?')[0];
    if (!clean) continue;
    const resolved = clean.startsWith('/')
      ? path.join(ctx.siteDir, clean.slice(1))
      : path.join(path.dirname(ctx.abs), clean);
    if (!fs.existsSync(resolved)) problems.push(`dead src: ${src}`);
  }

  for (const a of anchors) {
    const href = attr(a.attrs, 'href');
    if (!href) continue;
    if (/^(https?:|mailto:|tel:|data:|#)/i.test(href) || href.startsWith('//')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    const resolved = clean.startsWith('/')
      ? path.join(ctx.siteDir, clean.slice(1))
      : path.join(path.dirname(ctx.abs), clean);
    const target = clean.endsWith('/') ? path.join(resolved, 'index.html') : resolved;
    if (!fs.existsSync(target)) problems.push(`dead local link: ${href}`);
  }
  record(problems.length === 0, ctx.rel, 'all local links resolve',
    problems.slice(0, 4).join('; '));
}

function checkNoSecrets(ctx) {
  const hits = SECRET_PATTERNS
    .filter((re) => re.test(ctx.html))
    .map((re) => re.source.slice(0, 30));
  record(hits.length === 0, ctx.rel, 'no secrets or API keys in file',
    `matched ${hits.join(', ')}`);
}

function checkThirdPartyHosts(ctx) {
  const hosts = new Set();
  const re = /(?:src|href)\s*=\s*["']https?:\/\/([^/"']+)/gi;
  let m;
  while ((m = re.exec(ctx.html)) !== null) hosts.add(m[1].toLowerCase());
  const scriptRe = /<script[^>]*src\s*=\s*["']https?:\/\/([^/"']+)/gi;
  const scriptHosts = new Set();
  while ((m = scriptRe.exec(ctx.html)) !== null) scriptHosts.add(m[1].toLowerCase());
  const linkRe = /<link[^>]*href\s*=\s*["']https?:\/\/([^/"']+)/gi;
  while ((m = linkRe.exec(ctx.html)) !== null) scriptHosts.add(m[1].toLowerCase());
  const bad = [...scriptHosts].filter((h) => !ALLOWED_HOSTS.has(h));
  record(bad.length === 0, ctx.rel, 'no new third-party script or style hosts',
    `unexpected: ${bad.join(', ')}`);
}

function checkPalette(ctx) {
  const hexes = new Set();
  const re = /#[0-9a-fA-F]{3,8}\b/g;
  // Only look at CSS-ish contexts: <style> blocks and style="" attributes.
  const chunks = [];
  const styleBlocks = ctx.html.match(/<style[\s\S]*?<\/style>/gi) || [];
  chunks.push(...styleBlocks);
  const styleAttrs = ctx.html.match(/style\s*=\s*"[^"]*"/gi) || [];
  chunks.push(...styleAttrs);
  for (const chunk of chunks) {
    let m;
    while ((m = re.exec(chunk)) !== null) hexes.add(m[0].toLowerCase());
  }
  const bad = [...hexes].filter((h) => !PALETTE.has(h));
  record(bad.length === 0, ctx.rel, 'colours stay inside the brand palette',
    `off-palette: ${bad.join(', ')}`);
}

function checkNoEmDash(ctx) {
  const text = visibleText(ctx.html);
  const hits = (text.match(/[—–]/g) || []).length;
  record(hits === 0, ctx.rel, 'no em-dashes or en-dashes in visible copy',
    `${hits} found`);
}

function checkVoiceBans(ctx) {
  const text = visibleText(ctx.html).toLowerCase();
  const hits = BANNED_SUBSTRINGS.filter((s) => text.includes(s));
  record(hits.length === 0, ctx.rel, 'no retired cafe or restaurant framing',
    `found: ${hits.join(', ')}`);
}

// Copy that a page injects into the DOM at runtime is just as public as copy in
// the markup, but visibleText() strips <script> so it never gets checked. This
// pulls the string literals out of inline scripts and runs the same voice
// rules over them. The opt-in page's guide catalogue lives there.
function checkScriptCopyVoice(ctx) {
  const scripts = [...ctx.html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .filter((s) => !/application\/ld\+json/i.test(s));

  const literals = [];
  for (const body of scripts) {
    // single- and double-quoted literals long enough to be prose, not a key
    for (const m of body.matchAll(/'((?:[^'\\\n]|\\.){12,})'|"((?:[^"\\\n]|\\.){12,})"/g)) {
      literals.push((m[1] ?? m[2]).replace(/\\'/g, "'"));
    }
  }
  const joined = literals.join(' \n ').toLowerCase();
  const hits = BANNED_SUBSTRINGS.filter((s) => joined.includes(s));
  const dashes = literals.filter((l) => /[—–]/.test(l)).length;

  record(hits.length === 0 && dashes === 0, ctx.rel,
    'runtime-injected copy follows the same voice rules',
    [hits.length ? `found: ${hits.join(', ')}` : '',
     dashes ? `${dashes} literal(s) with an em-dash` : ''].filter(Boolean).join('; '));
}

// Every form: honeypot, a non-empty action, and a source tag so the funnel is
// measurable. A {{PLACEHOLDER}} action counts as non-empty but is reported, so
// an unfilled form ID cannot quietly ship.
function checkForms(ctx) {
  const forms = [...ctx.html.matchAll(/<form[\s\S]*?<\/form>/gi)].map((m) => m[0]);
  if (forms.length === 0) {
    record(true, ctx.rel, 'forms have honeypot, action and source tag', '');
    return;
  }
  const problems = [];
  const placeholders = [];
  for (const form of forms) {
    const openTag = form.match(/<form[^>]*>/i)[0];
    const action = attr(openTag, 'action');
    const label = attr(openTag, 'data-source') || attr(openTag, 'class') || 'form';

    if (!/name\s*=\s*["']_gotcha["']/i.test(form)) {
      problems.push(`${label}: missing _gotcha honeypot`);
    }
    if (!action || !action.trim()) {
      problems.push(`${label}: empty or missing action`);
    } else if (/\{\{[A-Z_]+\}\}/.test(action)) {
      placeholders.push(`${label}: ${action}`);
    } else if (!ALLOWED_FORM_ENDPOINTS.some((e) => action.includes(e))) {
      problems.push(`${label}: unrecognised endpoint ${action}`);
    }
    // Source tracking: hidden input, or the data-source the shared capture
    // script reads and sends.
    const hasSource = /name\s*=\s*["']source["']/i.test(form)
      || /data-source\s*=\s*["'][^"']+["']/i.test(openTag);
    if (!hasSource) problems.push(`${label}: no source tag`);
  }

  record(problems.length === 0, ctx.rel, 'forms have honeypot, action and source tag',
    problems.slice(0, 4).join('; '));

  // Reported separately so it reads as "waiting on Fatiha", not "broken".
  if (placeholders.length) {
    console.log(`  NOTE  form action still a placeholder - ${placeholders.join('; ')}`);
    PLACEHOLDER_FORMS.push({ file: ctx.rel, forms: placeholders });
  }
}

// A {{PLACEHOLDER}} left in visible copy would render literally to a reader.
// Not a failure, because the brief asks for placeholders where a real figure
// is unknown, but it is collected so it cannot ship unnoticed.
function checkPlaceholderCopy(ctx) {
  const hits = [...new Set((visibleText(ctx.html).match(/\{\{[A-Z_]+\}\}/g) || []))];
  if (hits.length) {
    console.log(`  NOTE  visible placeholder copy - ${hits.join(', ')}`);
    PLACEHOLDER_COPY.push({ file: ctx.rel, tokens: hits });
  }
}

function checkSharedCss(ctx) {
  const ok = /<link[^>]*href=["'][^"']*\/assets\/site\.css/i.test(ctx.html);
  record(ok, ctx.rel, 'links the shared design system (/assets/site.css)',
    'no link to /assets/site.css');
}

/* --------------------------------------------------------- guide template */

const PARTIALS = new Map();
function loadPartial(name) {
  if (PARTIALS.has(name)) return PARTIALS.get(name);
  const p = path.join(ROOT, 'shared', 'partials', `${name}.html`);
  const body = fs.existsSync(p) ? fs.readFileSync(p, 'utf8').trim() : null;
  PARTIALS.set(name, body);
  return body;
}

function extractPartial(html, name) {
  const re = new RegExp(
    `<!--\\s*partial:${name}\\s*-->([\\s\\S]*?)<!--\\s*/partial:${name}\\s*-->`);
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function checkPartialsInSync(ctx) {
  const problems = [];
  for (const name of ['gate', 'newsletter']) {
    const source = loadPartial(name);
    const stamped = extractPartial(ctx.html, name);
    if (source === null) { problems.push(`shared/partials/${name}.html missing`); continue; }
    if (stamped === null) { problems.push(`${name} partial not stamped into page`); continue; }
    // The gate carries a per-page source tag; compare with that slot normalised.
    const norm = (s) => s.replace(/data-source="[^"]*"/g, 'data-source="*"')
      .replace(/\s+/g, ' ').trim();
    if (norm(source) !== norm(stamped)) problems.push(`${name} partial drifted from shared source`);
  }
  record(problems.length === 0, ctx.rel, 'gate and newsletter match shared/partials',
    problems.join('; '));
}

function checkGuideTemplate(ctx) {
  const need = [
    ['body.guide', /<body[^>]*class=["'][^"']*\bguide\b/i],
    ['.guide-doc wrapper', /class=["'][^"']*\bguide-doc\b/i],
    ['.guide-hero', /class=["'][^"']*\bguide-hero\b/i],
    ['.eyebrow kicker', /class=["'][^"']*\beyebrow\b/i],
    ['.verdict one-liner', /class=["'][^"']*\bverdict\b/i],
    ['.tldr block', /class=["'][^"']*\btldr\b/i],
    ['.cover image', /class=["'][^"']*\bcover\b/i],
    ['.prose body', /class=["'][^"']*\bprose\b/i],
    ['.related cards', /class=["'][^"']*\brelated\b/i],
  ];
  const missing = need.filter(([, re]) => !re.test(ctx.html)).map(([n]) => n);
  record(missing.length === 0, ctx.rel, 'uses the single upgraded guide template',
    `missing: ${missing.join(', ')}`);
}

function checkGuideFigures(ctx) {
  const figs = (ctx.html.match(/class=["'][^"']*\bfig\b/gi) || []).length;
  record(figs >= 1, ctx.rel, 'has at least one in-body figure slot',
    `${figs} figures`);
}

function checkVerdictSections(ctx) {
  const text = visibleText(ctx.html);
  const need = ['Where it earns its keep', "Where it'll burn you", "What I'd actually do"];
  const missing = need.filter((s) => !text.includes(s));
  record(missing.length === 0, ctx.rel, 'carries the Straight Verdict sections',
    `missing: ${missing.join(' / ')}`);
}

function checkSoftGate(ctx) {
  const gateEnd = ctx.html.search(/<!--\s*\/partial:gate\s*-->/);
  if (gateEnd === -1) {
    record(false, ctx.rel, 'gate is soft (content stays in the DOM)', 'no gate found');
    return;
  }
  const after = ctx.html.slice(gateEnd);
  const words = visibleText(after.replace(/<footer[\s\S]*$/i, '')).trim().split(/\s+/).length;
  const noHardGate = !/display\s*:\s*none[^"';]*"\s*[^>]*class=["'][^"']*prose/i.test(ctx.html);
  record(words > 150 && noHardGate, ctx.rel, 'gate is soft (content stays in the DOM)',
    `${words} words of body copy after the gate`);
}

function checkCoverExists(ctx) {
  const m = ctx.html.match(/class=["'][^"']*\bcover\b[^"']*["'][\s\S]{0,400}?<img[^>]*src=["']([^"']+)["']/i);
  if (!m) { record(false, ctx.rel, 'cover image file exists', 'no cover <img> found'); return; }
  const src = m[1];
  const resolved = src.startsWith('/')
    ? path.join(ctx.siteDir, src.slice(1))
    : path.join(path.dirname(ctx.abs), src);
  record(fs.existsSync(resolved), ctx.rel, 'cover image file exists', `missing ${src}`);
}

/* ------------------------------------------------------------ orchestrate */

function checkFile(abs, siteDir, opts = {}) {
  const rel = path.relative(ROOT, abs);
  const html = fs.readFileSync(abs, 'utf8');
  const ctx = { abs, rel, html, siteDir, parsed: parseHtml(html) };

  console.log(`\n${rel}`);

  if (isRedirectStub(html)) {
    record(ctx.parsed.errors.length === 0, rel, 'redirect stub parses', ctx.parsed.errors[0] || '');
    const hasCanonical = /<link[^>]*rel=["']canonical["']/i.test(html);
    const hasNoindex = /<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html);
    record(hasCanonical && hasNoindex, rel, 'redirect stub has canonical and noindex',
      `canonical=${hasCanonical} noindex=${hasNoindex}`);
    record(SECRET_PATTERNS.every((re) => !re.test(html)), rel, 'no secrets in file', 'secret pattern matched');
    return;
  }

  checkParses(ctx);
  checkSingleH1(ctx);
  checkLangAndCharset(ctx);
  checkSeoHead(ctx);
  checkImages(ctx);
  checkLocalLinks(ctx);
  checkNoSecrets(ctx);
  checkThirdPartyHosts(ctx);
  checkPalette(ctx);
  checkNoEmDash(ctx);
  checkVoiceBans(ctx);
  checkScriptCopyVoice(ctx);
  checkForms(ctx);
  checkPlaceholderCopy(ctx);
  checkSharedCss(ctx);
  checkInlineStyle(ctx);
  checkCoverDimensions(ctx);
  checkFigureDimensions(ctx);
  checkLazyImages(ctx);

  if (opts.guide) {
    checkGuideTemplate(ctx);
    checkGuideFigures(ctx);
    checkCoverExists(ctx);
    checkPartialsInSync(ctx);
    checkSoftGate(ctx);
    if (opts.tool) checkVerdictSections(ctx);
  }
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

function siteDirFor(abs) {
  for (const s of SITE_ROOTS) {
    const d = path.join(ROOT, s.dir);
    if (abs.startsWith(d + path.sep)) return d;
  }
  return path.dirname(abs);
}

// Tool guides get the Straight Verdict section check; concept and system
// guides use the same template but a narrative structure.
const TOOL_GUIDES = new Set([
  'claude', 'chatgpt', 'gemini', 'copilot', 'grok',
  'mistral', 'deepseek', 'kimi', 'meta-ai', 'manus',
]);

function optsFor(abs) {
  const rel = path.relative(ROOT, abs);
  const guide = rel.includes(`site${path.sep}guides${path.sep}`);
  const slug = path.basename(abs, '.html');
  return { guide, tool: guide && TOOL_GUIDES.has(slug) };
}

function main() {
  const args = process.argv.slice(2);
  quiet = args.includes('--quiet');
  const targets = args.filter((a) => !a.startsWith('--'));

  let files;
  if (args.includes('--all') || targets.length === 0) {
    files = SITE_ROOTS.flatMap((s) => walk(path.join(ROOT, s.dir))).sort();
  } else {
    files = targets.map((t) => path.resolve(ROOT, t));
  }

  console.log(`Shift & Lead verification harness - ${files.length} page(s)\n`);
  for (const f of files) {
    if (!fs.existsSync(f)) {
      record(false, f, 'file exists', 'not found');
      continue;
    }
    checkFile(f, siteDirFor(f), optsFor(f));
  }

  console.log(`\n${'-'.repeat(64)}`);
  const filesChecked = files.length;
  const filesFailed = new Set(failures.map((f) => f.file)).size;
  console.log(`PASS ${PASS}   FAIL ${FAIL}`);
  console.log(`Files green: ${filesChecked - filesFailed}/${filesChecked}`);

  if (PLACEHOLDER_COPY.length) {
    console.log('\nPlaceholder copy still visible to readers:');
    for (const p of PLACEHOLDER_COPY) console.log(`  ${p.file}: ${p.tokens.join(', ')}`);
  }

  if (PLACEHOLDER_FORMS.length) {
    console.log('\nForm IDs still to be filled in by Fatiha:');
    for (const p of PLACEHOLDER_FORMS) {
      console.log(`  ${p.file}`);
      for (const f of p.forms) console.log(`    - ${f}`);
    }
  }
  if (failures.length) {
    console.log('\nFailures:');
    const byFile = new Map();
    for (const f of failures) {
      if (!byFile.has(f.file)) byFile.set(f.file, []);
      byFile.get(f.file).push(f);
    }
    for (const [file, list] of byFile) {
      console.log(`\n  ${file}`);
      for (const f of list) console.log(`    - ${f.check}: ${f.reason}`);
    }
  }
  process.exit(FAIL === 0 ? 0 : 1);
}

main();
