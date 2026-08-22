#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');

function file(rel) { return path.join(MAIN, rel); }
function read(rel) { return fs.readFileSync(file(rel), 'utf8'); }
function write(rel, content) { fs.writeFileSync(file(rel), content); }

const guideRel = 'guides/research-to-content-workflow.html';
const resourceRel = 'resources/research-to-content-workflow.html';
const coverRel = 'images/guides/research-to-content-workflow.png';
for (const rel of [guideRel, resourceRel, coverRel]) {
  if (!fs.existsSync(file(rel))) throw new Error(`Research content build is missing ${rel}`);
}

// Make the new guide discoverable in the library after all earlier library rewrites have run.
{
  const rel = 'guides/index.html';
  let html = read(rel);
  const before = html;

  if (html.includes('/_next/static/')) {
    if (!html.includes('/guides/research-to-content-workflow.html')) {
      throw new Error('React guide library is missing the research-to-content workflow guide');
    }
  } else {
  html = html.replace(/20 free guides/g, '21 free guides');

  if (!html.includes('href="research-to-content-workflow.html"')) {
    const card = `      <a class="card" href="research-to-content-workflow.html">\n        <img src="/images/guides/research-to-content-workflow.png" alt="Cover art for the guide: Turn saved research into content you can actually publish" width="411" height="231" loading="lazy" decoding="async">\n        <div class="card-body">\n          <p class="card-kicker mono">FREE GUIDE</p>\n          <h3>Turn saved research into content you can actually publish</h3>\n          <p class="card-desc">Updated <time datetime="2026-08-11">11 Aug 2026</time> &middot; 7 min read</p>\n        </div>\n      </a>\n`;

    const anchor = '    </div>\n  </section>\n  <p class="lib-more"><a href="which-ai-tool-for-what.html">';
    if (!html.includes(anchor)) throw new Error('Could not find the Put it to work library insertion point');
    html = html.replace(anchor, `${card}${anchor}`);
  }

  if (html !== before) {
    write(rel, html);
    console.log('research-content guides/index.html');
  }
  }
}

// Add the public guide to the sitemap. The email-unlocked worksheet remains noindex and is not added.
{
  const rel = 'sitemap.xml';
  let xml = read(rel);
  const before = xml;
  const url = '  <url><loc>https://www.shiftandlead.com/guides/research-to-content-workflow.html</loc><lastmod>2026-08-11</lastmod></url>\n';
  if (!xml.includes('/guides/research-to-content-workflow.html')) {
    xml = xml.replace('  <url><loc>https://www.shiftandlead.com/guides/stack-3-tool-ai-stack.html</loc>', `${url}  <url><loc>https://www.shiftandlead.com/guides/stack-3-tool-ai-stack.html</loc>`);
  }
  if (xml !== before) {
    write(rel, xml);
    console.log('research-content sitemap.xml');
  }
}

// Guard the lead-magnet and evidence boundaries that matter for this guide.
{
  const html = read(guideRel);
  const required = html.includes('/_next/static/')
    ? [
        'Turn saved research into content you can actually publish',
        'Send me the workflow map',
        '/images/guides/research-to-content-workflow.webp',
        'AI can prepare notes and a draft.'
      ]
    : [
        'Turn saved research into content you can actually publish',
        'data-resource-path="/resources/research-to-content-workflow.html"',
        '/assets/guide-lead-magnets.js',
        '/images/guides/research-to-content-workflow.png',
        'AI can organise your notes. You provide the judgement.'
      ];
  for (const token of required) {
    if (!html.includes(token)) throw new Error(`Research guide guard failed: missing ${token}`);
  }
  if (/AI Insider Brief/i.test(html)) throw new Error('Research guide must not revive the paused AI Insider Brief CTA');
  if (/AI Content Engine Quick Win/i.test(html)) throw new Error('Concept-only paid product must not be advertised as live in the guide');
}

console.log('Research-derived guide wired into the final site build.');
