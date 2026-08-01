#!/usr/bin/env node
/* One validator for the whole estate. Plain Node, no dependencies.
   Run: npm run validate            (or: node scripts/validate.mjs)

   Each check A-W fails loudly with file + line context. TODO(fatiha) markers
   are allowed where the rules permit them (prices, proof) but every one is
   listed at the end so nothing hides. */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const site = JSON.parse(readFileSync(join(ROOT, 'data/site.json'), 'utf8'));
const guides = JSON.parse(readFileSync(join(ROOT, 'data/guides.json'), 'utf8')).guides;
const the99 = JSON.parse(readFileSync(join(ROOT, 'data/the99.json'), 'utf8'));
const copy = JSON.parse(readFileSync(join(ROOT, 'data/copy.json'), 'utf8'));

const PROPS = { guides: 'site', www: 'main-site', brief: 'ai-insider-brief/ai-insider-brief' };
const failures = {};      // check letter -> [messages]
const todos = new Set();
function fail(check, msg) { (failures[check] ||= []).push(msg); }

function pages(root) {
  const out = [];
  (function walk(d) {
    for (const e of readdirSync(d)) {
      if (e.startsWith('.') || e === 'node_modules' || e === '_archive') continue;
      const f = join(d, e);
      if (statSync(f).isDirectory()) walk(f);
      else if (e.endsWith('.html')) out.push(f);
    }
  })(join(ROOT, root));
  return out;
}
const strip = h => h
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<!--[\s\S]*?-->/g, ' ');
const text = h => strip(h).replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&middot;|&rarr;|&larr;|&uarr;/g, ' ')
  .replace(/&ldquo;|&rdquo;/g, '"').replace(/&rsquo;|&#39;/g, "'")
  .replace(/\s+/g, ' ');
const isStub = h => /http-equiv="refresh"/i.test(h) && h.length < 1400;
const rel = f => f.slice(ROOT.length + 1);

const all = [];
for (const [prop, root] of Object.entries(PROPS)) {
  for (const f of pages(root)) {
    const html = readFileSync(f, 'utf8');
    all.push({ prop, root, f: rel(f), html, stub: isStub(html), txt: text(html) });
  }
}
for (const p of all) for (const m of p.html.matchAll(/TODO\(fatiha\)[^<"']*/g)) todos.add(`${p.f}: ${m[0].slice(0, 90)}`);
for (const m of JSON.stringify(copy).matchAll(/TODO\(fatiha\)[^"]*/g)) todos.add(`data/copy.json: ${m[0].slice(0, 90)}`);
for (const m of JSON.stringify(site).matchAll(/TODO\(fatiha\)[^"]*/g)) todos.add(`data/site.json: ${m[0].slice(0, 90)}`);

/* A + B: nav and footer identical everywhere, matching site.json */
const navSig = site.nav.map(n => n.label).join('|');
const footSig = site.footer.map(c => c.title + ':' + c.links.map(l => l.label).join(',')).join('|');
for (const p of all.filter(p => !p.stub)) {
  const nav = p.html.match(/<!-- chrome:nav -->([\s\S]*?)<!-- \/chrome:nav -->/);
  if (!nav) { fail('A', `${p.f}: no shared nav (chrome:nav markers missing)`); }
  else {
    const labels = [...nav[1].matchAll(/<a ([^>]*)>([^<]+)</g)]
      .filter(m => !m[1].includes('site-nav-logo')).map(m => text(m[2]).trim()).filter(Boolean);
    if (labels.join('|') !== navSig) fail('A', `${p.f}: nav is [${labels.join('|')}] not [${navSig}]`);
  }
  const foot = p.html.match(/<!-- chrome:footer -->([\s\S]*?)<!-- \/chrome:footer -->/);
  if (!foot) fail('B', `${p.f}: no shared footer (chrome:footer markers missing)`);
  else {
    const cols = [...foot[1].matchAll(/<h2[^>]*>([^<]+)<\/h2>[\s\S]*?<\/ul>/g)];
    const sig = cols.map(c => text(c[1]).trim() + ':' +
      [...c[0].matchAll(/<a [^>]*>([^<]+)</g)].map(m => text(m[1]).trim()).join(',')).join('|');
    if (sig.toLowerCase() !== footSig.toLowerCase()) fail('B', `${p.f}: footer drifts from site.json`);
  }
}

/* C: hardcoded years outside data/, JSON-LD and <time> */
for (const p of all.filter(p => !p.stub)) {
  const vis = strip(p.html).replace(/<time[^>]*>[\s\S]*?<\/time>/gi, ' ');
  for (const m of vis.replace(/<[^>]+>/g, ' ').matchAll(/\b(19|20)\d{2}\b/g)) {
    fail('C', `${p.f}: hardcoded year "${m[0]}" in visible copy`);
  }
}

/* D: every img needs alt */
for (const p of all.filter(p => !p.stub)) {
  for (const m of strip(p.html).matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=("[^"]*"|'[^']*')/.test(m[0])) fail('D', `${p.f}: img missing alt: ${m[0].slice(0, 80)}`);
    else if (/\balt=(""|'')/.test(m[0]) && !/aria-hidden/.test(m[0])) fail('D', `${p.f}: empty alt without aria-hidden`);
  }
}

/* E: internal links + srcs resolve */
const hostRoot = { 'guides.shiftandlead.com': 'site', 'www.shiftandlead.com': 'main-site', 'brief.shiftandlead.com': PROPS.brief };
for (const p of all) {
  for (const m of p.html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    let u = m[1];
    if (/^(mailto:|tel:|data:|javascript:)/.test(u)) continue;
    let root = p.root, path = u;
    const abs = u.match(/^https?:\/\/([^/]+)(\/.*)?$/);
    if (abs) { if (!hostRoot[abs[1]]) continue; root = hostRoot[abs[1]]; path = abs[2] || '/'; }
    if (path.endsWith('/')) path += 'index.html';
    const target = path.startsWith('/') ? join(ROOT, root, path) : join(dirname(join(ROOT, p.f)), path);
    if (!existsSync(target)) fail('E', `${p.f}: broken link ${u}`);
  }
}

/* F: every live guide's cover exists and is rendered on the library index */
const lib = all.find(p => p.f === 'main-site/guides/index.html');
for (const g of guides) {
  if (!existsSync(join(ROOT, 'main-site', g.cover.slice(1)))) fail('F', `guides.json: cover missing on disk for ${g.slug}`);
  if (g.status === 'live' && lib && !lib.html.includes(g.cover)) fail('F', `library index never shows cover for ${g.slug}`);
}

/* G: sitemaps match reality, every entry has lastmod */
for (const [root, host] of [['site', site.hosts.guides], ['main-site', site.hosts.www], [PROPS.brief, site.hosts.brief]]) {
  const smf = join(ROOT, root, 'sitemap.xml');
  if (!existsSync(smf)) { fail('G', `${root}/sitemap.xml missing`); continue; }
  const sm = readFileSync(smf, 'utf8');
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const entries = [...sm.matchAll(/<url>[\s\S]*?<\/url>/g)];
  for (const e of entries) if (!/<lastmod>/.test(e[0])) fail('G', `${root}/sitemap.xml: entry without lastmod: ${e[0].match(/<loc>([^<]+)/)?.[1]}`);
  for (const u of urls) {
    let path = u.replace(host, ''); if (path === '' || path === '/') path = '/index.html';
    if (!existsSync(join(ROOT, root, path))) fail('G', `${root}/sitemap.xml lists missing page ${path}`);
  }
  const noindex = h => /noindex/.test(h);
  for (const p of all.filter(p => p.root === root && !p.stub && !noindex(p.html))) {
    const url = host + '/' + p.f.split('/').slice(root.split('/').length).join('/');
    if (!urls.some(u => u === url || u + '/index.html' === url || u === url.replace(/\/index\.html$/, '/')))
      fail('G', `${p.f} not in ${root}/sitemap.xml`);
  }
}

/* H: orphans — every indexable page reachable from some other page */
const linkedTo = new Set();
for (const p of all) for (const m of p.html.matchAll(/(?:href)="([^"#?]+)[^"]*"/g)) {
  let u = m[1]; const abs = u.match(/^https?:\/\/([^/]+)(\/.*)?$/);
  let root = p.root, path = u;
  if (abs) { if (!hostRoot[abs[1]]) continue; root = hostRoot[abs[1]]; path = abs[2] || '/'; }
  if (path.endsWith('/')) path += 'index.html';
  const t = path.startsWith('/') ? join(root, path) : join(dirname(p.f), path);
  linkedTo.add(t.replace(/\\/g, '/').replace(/\/{2,}/g, '/'));
}
for (const p of all.filter(p => !p.stub && !/noindex/.test(p.html))) {
  const short = p.f.replace(/^(site|main-site|ai-insider-brief\/ai-insider-brief)\//, m => m);
  if (p.f.endsWith('index.html') || p.f.endsWith('free-resources.html')) continue;
  if (!linkedTo.has(p.f)) fail('H', `${p.f}: orphan (no inbound link found)`);
}

/* I: stale counters need a graceful fallback */
{
  const age = (Date.now() - new Date(the99.lastUpdated)) / 864e5;
  if (age > 14) {
    const page99 = all.find(p => p.f === 'main-site/the-99.html');
    if (page99 && !page99.txt.toLowerCase().includes(the99.cadenceFallback.toLowerCase()))
      fail('I', `main-site/the-99.html: the99.lastUpdated is ${Math.round(age)} days old and the page does not show "${the99.cadenceFallback}"`);
    for (const p of all.filter(x => x.f !== 'main-site/the-99.html' && !x.stub)) {
      if (/NEXT HIRING WAVE LANDS MONDAY/i.test(p.txt)) fail('I', `${p.f}: stale "next hiring wave lands Monday" promise`);
    }
  }
}

/* J: exactly one h1 */
for (const p of all.filter(p => !p.stub)) {
  const n = (strip(p.html).match(/<h1[\s>]/g) || []).length;
  if (n !== 1) fail('J', `${p.f}: ${n} <h1> elements`);
}

/* K: banned strings */
for (const p of all.filter(p => !p.stub)) {
  for (const s of copy._meta.retired_strings) {
    if (p.txt.toLowerCase().includes(s.toLowerCase())) fail('K', `${p.f}: retired string "${s}"`);
  }
}

/* L: title 40-65, meta description 120-160 */
for (const p of all.filter(p => !p.stub && !/noindex/.test(p.html))) {
  const t = p.html.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  const len = t ? text(t[1]).trim().length : 0;
  if (len < 40 || len > 65) fail('L', `${p.f}: title is ${len} chars (want 40-65)`);
  const d = p.html.match(/<meta name="description" content="([^"]*)"/);
  const dl = d ? d[1].length : 0;
  if (dl < 120 || dl > 160) fail('L', `${p.f}: meta description is ${dl} chars (want 120-160)`);
}

/* M: any price shown must match site.json offers */
const knownPrices = new Set(JSON.stringify(site.offers).match(/[£$€]\s?\d[\d,]*/g) || []);
for (const p of all.filter(p => !p.stub)) {
  for (const m of p.txt.matchAll(/[£$€]\s?\d[\d,]{1,9}/g)) {
    if (p.prop !== 'www' || p.f.includes('/guides/')) continue; // tool prices in guides and news figures in the Brief are content, not our offers
    if (/case-study|privacy|terms|refund|licensing|99\.html|issues\//.test(p.f)) continue;
    if (!knownPrices.has(m[0].replace(/\s/, ''))) fail('M', `${p.f}: price "${m[0]}" not in site.json offers`);
  }
}

/* N: redirect integrity — every stub's destination exists */
for (const p of all.filter(p => p.stub)) {
  const m = p.html.match(/url=([^"#>]+)/i);
  if (!m) { fail('N', `${p.f}: stub without destination`); continue; }
  let u = m[1]; const abs = u.match(/^https?:\/\/([^/]+)(\/.*)?$/);
  let root = p.root, path = u;
  if (abs) { if (!hostRoot[abs[1]]) continue; root = hostRoot[abs[1]]; path = abs[2] || '/'; }
  if (path.endsWith('/') || path === '') path += 'index.html';
  const t = path.startsWith('/') ? join(ROOT, root, path) : join(dirname(join(ROOT, p.f)), path);
  if (!existsSync(t)) fail('N', `${p.f}: redirect target ${u} missing`);
}

/* O: hero subject must be the reader, not I/we/Fatiha/brand */
for (const p of all.filter(p => !p.stub)) {
  for (const m of strip(p.html).matchAll(/<(h1|h2)[^>]*>([\s\S]*?)<\/\1>/g)) {
    const s = text(m[2]).trim();
    if (/^(I |I'm |I've |We |We're |Fatiha |Shift & Lead )/.test(s) && !/about|case-study|99/.test(p.f))
      fail('O', `${p.f}: "${s.slice(0, 60)}" leads with the author, not the reader`);
  }
}

/* P: mood taglines — headline with no verb and no number/proper noun */
const VERBS = /\b(is|are|was|get|got|hand|build|run|stop|start|see|read|take|book|apply|make|use|learn|hire|need|want|work|say|do|does|don't|doesn't|keep|know|find|costs?|leaves?|adopt|went|will|can|explained|answers?|booked|turned)\b/i;
for (const p of all.filter(p => !p.stub)) {
  for (const m of strip(p.html).matchAll(/<(h1|h2)[^>]*>([\s\S]*?)<\/\1>/g)) {
    const s = text(m[2]).trim();
    if (s.split(' ').length >= 3 && !VERBS.test(s) && !/\d/.test(s) && !/[A-Z][a-z]+ [A-Z]/.test(s.slice(1)))
      fail('P', `${p.f}: mood tagline "${s.slice(0, 60)}"`);
  }
}

/* Q: max one "not X, Y" tic per page */
for (const p of all.filter(p => !p.stub)) {
  const n = (p.txt.match(/\bnot [^.,;]{2,30}, (but )?[a-z]/gi) || []).length;
  if (n > 1) fail('Q', `${p.f}: ${n} "not X, Y" constructions (max 1)`);
}

/* R: abstractions need a specific within 15 words */
const ABSTRACT = ['busywork', 'the shift', 'the system', 'real change', 'one first win'];
for (const p of all.filter(p => !p.stub)) {
  for (const a of ABSTRACT) {
    for (const m of p.txt.matchAll(new RegExp(`\\b${a}\\b([^.]{0,120})`, 'gi'))) {
      const tail = m[1].split(/\s+/).slice(0, 15).join(' ');
      if (!/\d|Claude|ChatGPT|Gemini|Copilot|CRM|email|inbox|invoice|follow-up|calendar|support|lead|call|task/i.test(tail))
        fail('R', `${p.f}: "${a}" not anchored by a specific within 15 words`);
    }
  }
}

/* S: readability — no sentence over 25 words, judged per block element */
for (const p of all.filter(p => !p.stub)) {
  const blocks = [...strip(p.html).matchAll(/<(p|li|h1|h2|h3|blockquote|dd|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/gi)];
  for (const b of blocks) {
    for (const s of text(b[2]).split(/[.!?]+\s/)) {
      const w = s.trim().split(/\s+/).filter(Boolean);
      if (w.length > 25) fail('S', `${p.f}: ${w.length}-word sentence: "${w.slice(0, 8).join(' ')}..."`);
    }
  }
}

/* T: CTAs start with an action verb */
const CTA_OK = /^(Get|Start|See|Read|Take|Book|Apply|Build|Subscribe|Email)\b/i;
for (const p of all.filter(p => !p.stub)) {
  const noChrome = strip(p.html.replace(/<!-- chrome:nav -->[\s\S]*?<!-- \/chrome:nav -->/, ' '));
  for (const m of noChrome.matchAll(/<(a|button)\b[^>]*class="[^"]*(btn|cta|path-cta|nav-cta|header-subscribe)[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const s = text(m[3]).trim();
    if (s && !CTA_OK.test(s)) fail('T', `${p.f}: CTA "${s.slice(0, 50)}" does not start with an approved verb`);
  }
}

/* U: money pages need a price band (a TODO counts, but is listed) */
for (const o of site.offers) {
  if (!o.priceBand) fail('U', `site.json offer ${o.id} has no priceBand`);
  else if (o.priceBand.includes('TODO')) todos.add(`site.json offer ${o.id}: ${o.priceBand}`);
  const page = all.find(p => o.url.endsWith(p.f.replace('main-site/', '/')));
  if (page && !page.txt.includes(o.priceBand.replace(/TODO\(fatiha\).*/, '')) && !page.html.includes('TODO(fatiha)') && !/[£$€]\s?\d/.test(page.txt))
    fail('U', `${page.f}: money page shows no price and no TODO marker`);
}

/* V: stats need attribution or a TODO nearby */
for (const p of all.filter(p => /case-study/.test(p.f))) {
  if (/A real client project, not named here/i.test(p.txt) && !p.html.includes('TODO(fatiha)'))
    fail('V', `${p.f}: anonymous proof without a TODO marker`);
}

/* W: viewport + og:image on every indexable page */
for (const p of all.filter(p => !p.stub && !/noindex/.test(p.html))) {
  if (!/<meta name="viewport"/.test(p.html)) fail('W', `${p.f}: no viewport meta`);
  if (!/<meta property="og:image"/.test(p.html)) fail('W', `${p.f}: no og:image`);
}

/* ---- report */
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVW'.split('');
const NAMES = {A:'nav drift',B:'footer drift',C:'hardcoded date',D:'missing alt',E:'broken link',F:'missing cover',G:'sitemap mismatch',H:'orphan page',I:'stale counter',J:'duplicate h1',K:'banned string',L:'title/desc length',M:'price consistency',N:'redirect integrity',O:'hero-as-subject',P:'mood tagline',Q:'tic counter',R:'abstraction w/o specific',S:'readability',T:'CTA action verb',U:'priceless money page',V:'anonymous proof',W:'viewport/og:image'};
let red = 0;
for (const L of LETTERS) {
  const f = failures[L] || [];
  if (f.length) {
    red++;
    console.log(`\nFAIL ${L} (${NAMES[L]}) — ${f.length}`);
    for (const m of f.slice(0, 12)) console.log('   ' + m);
    if (f.length > 12) console.log(`   ...and ${f.length - 12} more`);
  } else console.log(`PASS ${L} (${NAMES[L]})`);
}
if (todos.size) {
  console.log(`\nTODO(fatiha) — ${todos.size} open:`);
  for (const t of [...todos].slice(0, 20)) console.log('   ' + t);
}
console.log(`\n${red === 0 ? 'ALL GREEN' : red + ' of 23 checks failing'}`);
process.exit(red ? 1 : 0);
