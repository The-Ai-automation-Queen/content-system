#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAIN = path.join(ROOT, 'main-site');
const statuses = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'page-status.json'), 'utf8'));
const failures = [];
const protectedArtifactNames = new Set([
  'find-your-zone-of-genius-workbook-v2.pdf',
  'find-your-zone-of-genius-private-agent.zip',
]);

function guardProtectedArtifacts(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(ROOT, absolute);
    if (protectedArtifactNames.has(entry.name)) {
      failures.push(`Protected checkout artifact must not be published from main-site: ${relative}`);
    }
    if (entry.isDirectory()) guardProtectedArtifacts(absolute);
  }
}

guardProtectedArtifacts(MAIN);

function read(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    failures.push(`Missing required source file: ${rel}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function chrome(html) {
  return [
    html.match(/<!-- chrome:nav -->([\s\S]*?)<!-- \/chrome:nav -->/i)?.[1] || '',
    html.match(/<!-- chrome:footer -->([\s\S]*?)<!-- \/chrome:footer -->/i)?.[1] || ''
  ].join('\n');
}

const retired = Object.entries(statuses).filter(([, page]) => page.status === 'retired');
const unlisted = Object.entries(statuses).filter(([, page]) => page.status === 'unlisted');
const siteData = JSON.parse(read('data/site.json'));
const guidePublication = JSON.parse(read('data/guide-publication.json'));
const publicSurfaces = [
  ['homepage', read('main-site/index.html')],
  ['guide library', read('main-site/guides/index.html')],
  ['sitemap', read('main-site/sitemap.xml')],
  ['AI discovery', read('main-site/llms.txt')],
  ['canonical navigation data', JSON.stringify({nav: siteData.nav, footer: siteData.footer})]
];

const retiredTerms = {
  newsletter: [/AI Insider Brief/i, /brief\.shiftandlead\.com/i, /ribbon-form/i],
  the99: [/\bThe 99\b/i, /99 AI employees/i, /the-99\.html/i]
};

for (const [id, page] of retired) {
  const patterns = retiredTerms[id] || [new RegExp(page.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')];
  for (const [surface, text] of publicSurfaces) {
    for (const pattern of patterns) {
      if (pattern.test(text)) failures.push(`${id} is retired but appears in ${surface}: ${pattern}`);
    }
  }
}

for (const [id, page] of unlisted) {
  const escapedPath = page.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [new RegExp(escapedPath, 'i')];
  for (const [surface, text] of publicSurfaces) {
    for (const pattern of patterns) {
      if (pattern.test(text)) failures.push(`${id} is unlisted but appears in ${surface}: ${pattern}`);
    }
  }
}

for (const [id, page] of Object.entries(statuses).filter(([, value]) => value.status === 'active')) {
  const relative = page.path === '/' ? 'main-site/index.html' : `main-site${page.path}`;
  const expected = relative.endsWith('/') ? `${relative}index.html` : relative;
  if (!fs.existsSync(path.join(ROOT, expected))) failures.push(`${id} is active but its source file is missing: ${expected}`);
}

for (const file of fs.readdirSync(MAIN).filter(name => name.endsWith('.html'))) {
  if (file === 'the-99.html') continue;
  const shell = chrome(fs.readFileSync(path.join(MAIN, file), 'utf8'));
  for (const [id] of retired) {
    for (const pattern of retiredTerms[id] || []) {
      if (pattern.test(shell)) failures.push(`${id} is retired but appears in ${file} navigation or footer`);
    }
  }
  for (const [id, page] of unlisted) {
    if (new RegExp(page.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(shell)) {
      failures.push(`${id} is unlisted but appears in ${file} navigation or footer`);
    }
  }
}

const homepage = read('main-site/index.html');
const guideLibrary = read('main-site/guides/index.html');
const vercel = JSON.parse(read('main-site/vercel.json'));
if (!/<title>[^<]+<\/title>/i.test(homepage)) failures.push('Homepage is missing a title');
if (!/<h1\b/i.test(homepage)) failures.push('Homepage is missing an H1');
if (!/href=["']\/guides\//i.test(homepage)) failures.push('Homepage no longer links to the guides');
if (!/Use AI for real work\./i.test(guideLibrary) || !/Keep the decisions that need\s*<em>you\.<\/em>/i.test(guideLibrary)) {
  failures.push('Guide library is not the current outcome-led implementation');
}
const approvedGuideSlugs = guidePublication.approved.map((guide) => guide.slug);
const approvedGuideSlugSet = new Set(approvedGuideSlugs);
const guideInventory = JSON.parse(read('next-app/content/guides.json')).guides;
const guideCountPattern = new RegExp(`>${approvedGuideSlugs.length}(?:<!-- -->|\\s)+(?:<!-- -->)?guides`, 'i');
if (!guideCountPattern.test(guideLibrary)) {
  failures.push(`Guide library no longer identifies the ${approvedGuideSlugs.length} approved guides`);
}
for (const slug of approvedGuideSlugs) {
  if (!guideLibrary.includes(`/guides/${slug}.html`)) {
    failures.push(`Approved guide is missing from the public library: ${slug}`);
  }
}
for (const hiddenSlug of guideInventory
  .filter((guide) => !approvedGuideSlugSet.has(guide.slug))
  .map((guide) => guide.slug)) {
  if (guideLibrary.includes(`/guides/${hiddenSlug}.html`)) {
    failures.push(`Unapproved guide appears in the public library: ${hiddenSlug}`);
  }
}
const guideHeader = guideLibrary.match(/<header class="site-header">([\s\S]*?)<\/header>/i)?.[1] || '';
for (const [label, href] of [
  ['Home', '/'],
  ['Guides', '/guides/'],
  ['Workbooks', '/workbooks.html'],
  ['About', '/about.html'],
  ['Contact', '/contact.html'],
  ['How I can help', '/how-i-can-help.html'],
]) {
  if (!guideHeader.includes(`href="${href}"`) || !guideHeader.includes(`>${label}<`)) {
    failures.push(`Guide header does not match the live shell: ${label} → ${href}`);
  }
}
if (/\bQuiz\b/i.test(guideHeader)) {
  failures.push('Stale Quiz navigation appears in the guide header');
}
if (!/href="\/workbooks\.html">Workbooks</i.test(guideLibrary)) {
  failures.push('Guide footer does not match the live shell: Workbooks is missing');
}
if (vercel.buildCommand !== 'cd .. && npm run checkout:validate && node tools/verify-publish-source.mjs') {
  failures.push('Vercel buildCommand must validate checkout, then verify the committed source without rewriting it');
}

if (failures.length) {
  console.error('Publish source check failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log('Publish source check passed. Vercel will publish the committed main-site files without rewriting them.');
