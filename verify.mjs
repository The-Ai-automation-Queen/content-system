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

function checkSeoHead(ctx) {
  const title = ctx.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  // Match the closing quote to the opening one, so an apostrophe inside a
  // double-quoted attribute does not read as the end of the value.
  const desc = /<meta[^>]*name=["']description["'][^>]*content=("[^"]{20,}"|'[^']{20,}')/i.test(ctx.html);
  const canonical = /<link[^>]*rel=["']canonical["'][^>]*href=["']https?:\/\/[^"']+["']/i.test(ctx.html);
  const ok = !!title && title[1].trim().length > 10 && desc && canonical;
  record(ok, ctx.rel, 'title, meta description and canonical present',
    `title=${!!title} desc=${desc} canonical=${canonical}`);
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

function checkForms(ctx) {
  const forms = [...ctx.html.matchAll(/<form[\s\S]*?<\/form>/gi)].map((m) => m[0]);
  if (forms.length === 0) {
    record(true, ctx.rel, 'email forms keep honeypot and endpoint', '');
    return;
  }
  const problems = [];
  for (const form of forms) {
    if (!/name\s*=\s*["']email["']/i.test(form)) continue; // not an email capture
    if (!/name\s*=\s*["']_gotcha["']/i.test(form)) problems.push('email form missing _gotcha honeypot');
  }
  // endpoint may live in the form action or in the page script
  const endpointFound = ALLOWED_FORM_ENDPOINTS.some((e) => ctx.html.includes(e));
  if (!endpointFound && forms.some((f) => /name\s*=\s*["']email["']/i.test(f))) {
    problems.push('email form has no recognised endpoint');
  }
  record(problems.length === 0, ctx.rel, 'email forms keep honeypot and endpoint',
    problems.join('; '));
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
  checkSharedCss(ctx);

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
  console.log(`PASS ${PASS}   FAIL ${FAIL}`);
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
