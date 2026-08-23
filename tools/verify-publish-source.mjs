#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const main = path.join(root, 'main-site');
const failures = [];
const read = (relative) => {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) { failures.push(`Missing required file: ${relative}`); return ''; }
  return fs.readFileSync(file, 'utf8');
};
const existsPublicRoute = (route) => {
  const relative = route === '/' ? 'index.html' : route.replace(/^\//, '');
  const file = relative.endsWith('/') ? `${relative}index.html` : relative;
  return fs.existsSync(path.join(main, file));
};

const statuses = JSON.parse(read('data/page-status.json'));
const sourceGuides = JSON.parse(read('data/guides.json')).guides.filter((guide) => guide.status === 'live');
const nextGuides = JSON.parse(read('next-app/content/guides.json')).guides.filter((guide) => guide.status === 'live');
const sourceSlugs = sourceGuides.map((guide) => guide.slug).sort();
const nextSlugs = nextGuides.map((guide) => guide.slug).sort();
const guideIndex = read('main-site/guides/index.html');
const sitemap = read('main-site/sitemap.xml');
const llms = read('main-site/llms.txt');
const siteData = read('data/site.json');
const publicGuideSlugs = [...new Set([...guideIndex.matchAll(/href="\/guides\/([a-z0-9-]+)\.html"/g)].map((match) => match[1]))].filter((slug) => sourceSlugs.includes(slug)).sort();

if (JSON.stringify(sourceSlugs) !== JSON.stringify(nextSlugs)) failures.push('The active guide registry and Next.js source disagree.');
if (JSON.stringify(sourceSlugs) !== JSON.stringify(publicGuideSlugs)) failures.push(`The guide directory cards do not match the active registry. Expected ${sourceSlugs.join(', ')}; found ${publicGuideSlugs.join(', ')}.`);
if (!/Understand AI\./.test(guideIndex) || !/Then use it well\./.test(guideIndex)) failures.push('The approved guide hero is missing.');
if (!/What AI agents actually do/.test(guideIndex)) failures.push('The approved featured guide is missing.');
if (!new RegExp(`${sourceGuides.length}(?:<!-- -->|\\s)+guides`).test(guideIndex)) failures.push(`The guide directory does not show the registry-derived count of ${sourceGuides.length}.`);
if (/research-to-content-workflow/.test(guideIndex)) failures.push('Research-to-content appears in the guide directory.');
if (/research-to-content-workflow/.test(sitemap) || /research-to-content-workflow/.test(llms)) failures.push('Research-to-content appears in public discovery files.');

for (const guide of sourceGuides) {
  const route = `/guides/${guide.slug}.html`;
  const file = path.join(main, route.slice(1));
  if (!fs.existsSync(file)) { failures.push(`Visible guide route is missing: ${route}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const isNextGuide = html.includes('/_next/');
  if (!isNextGuide && (!html.includes('/assets/guide-gate.js') || !html.includes(`data-page="${guide.slug}"`))) failures.push(`Guide gate is missing or misconfigured: ${guide.slug}`);
  const cover = guide.cover.replace(/^\//, '');
  if (!fs.existsSync(path.join(main, cover))) failures.push(`Guide cover is missing: ${guide.cover}`);
}
const nextGate = read('next-app/components/guides/guide-access-boundary.tsx');
const nextArticle = read('next-app/app/guides/[slug]/page.tsx');
if (!nextGate.includes('/api/guide-capture') || !nextGate.includes('shift-lead-guide-access')) failures.push('The Next.js guide gate contract is missing.');
if (!nextArticle.includes('GuideAccessBoundary')) failures.push('A generated guide can render without the shared access boundary.');

for (const [id, page] of Object.entries(statuses)) {
  if (page.status === 'active') {
    if (!existsPublicRoute(page.path)) failures.push(`${id} is active but its public file is missing: ${page.path}`);
    if (!sitemap.includes(`<loc>https://www.shiftandlead.com${page.path}</loc>`)) failures.push(`${id} is active but missing from the sitemap.`);
  } else if (page.path.startsWith('/') && sitemap.includes(`<loc>https://www.shiftandlead.com${page.path}</loc>`)) {
    failures.push(`${id} is ${page.status} but appears in the sitemap.`);
  }
}
for (const guide of sourceGuides) if (!sitemap.includes(`/guides/${guide.slug}.html</loc>`)) failures.push(`Active guide is missing from the sitemap: ${guide.slug}`);

const activeRoutes = [
  ...Object.values(statuses).filter((page) => page.status === 'active').map((page) => page.path),
  ...sourceGuides.map((guide) => `/guides/${guide.slug}.html`),
];
for (const route of activeRoutes) {
  const routeRelative = route === '/' ? 'index.html' : route.replace(/^\//, '').replace(/\/$/, '/index.html');
  const html = read(`main-site/${routeRelative}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let target = match[1];
    if (target.startsWith('https://www.shiftandlead.com')) target = target.slice('https://www.shiftandlead.com'.length) || '/';
    if (!target.startsWith('/') || target.startsWith('//') || target.startsWith('/api/')) continue;
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;
    target = decodeURIComponent(target);
    if (!existsPublicRoute(target)) failures.push(`Broken internal target on ${route}: ${target}`);
  }
}

const forbidden = [/\bThe 99\b/i, /99 AI employees/i, /AI Insider Brief/i, /brief\.shiftandlead\.com/i, /One clear verdict on the AI news/i];
const activeSurfaces = ['main-site/index.html','main-site/about.html','main-site/how-i-can-help.html','main-site/workbooks.html','main-site/build-sprint.html','main-site/workshops.html','main-site/sitemap.xml','main-site/llms.txt','data/site.json','data/copy.json'].map((file) => [file, read(file)]);
for (const [file, text] of activeSurfaces) for (const pattern of forbidden) if (pattern.test(text)) failures.push(`Retired language appears in ${file}: ${pattern}`);
for (const pattern of forbidden) if (pattern.test(siteData)) failures.push(`Retired language appears in canonical site data: ${pattern}`);

const workbookIndex = read('main-site/workbooks.html');
for (const slug of ['find-your-zone-of-genius','your-human-evidence','use-what-is-unique-about-you']) {
  if (!workbookIndex.includes(`/workbooks/${slug}.html`)) failures.push(`Workbook card has no landing-page action: ${slug}`);
  const page = read(`main-site/workbooks/${slug}.html`);
  if (!page.includes('data-workbook-waitlist') || !page.includes(`value="${slug}"`)) failures.push(`Workbook waitlist is missing or misidentified: ${slug}`);
}
if (/research-to-content-workflow/.test(read('main-site/guides/research-to-content-workflow.html').replace(/<meta http-equiv="refresh"[^>]*>/, '').replace(/\/workbooks\.html/g, ''))) failures.push('Paid research-to-content copy remains in the public redirect file.');
if (fs.existsSync(path.join(main, 'paid-content-drafts'))) failures.push('paid-content-drafts must never be inside main-site.');

const offerFormHandler = read('main-site/assets/offer-form.js');
for (const [page, offer] of [['main-site/build-sprint.html', 'bespoke-build'], ['main-site/workshops.html', 'signature-workshop']]) {
  const html = read(page);
  if (!html.includes(`data-offer-form="${offer}"`) || !html.includes('/assets/offer-form.js') || !html.includes('data-form-status')) failures.push(`The verified enquiry form contract is missing from ${page}.`);
}
if (!offerFormHandler.includes('response.ok') || !offerFormHandler.includes('testMode')) failures.push('Offer enquiry forms can report success without an accepted response or cannot be tested safely.');

const vercel = JSON.parse(read('main-site/vercel.json'));
if (vercel.buildCommand !== 'cd .. && node tools/verify-publish-source.mjs') failures.push('Vercel must verify committed source without rewriting it.');
const redirectSources = new Set((vercel.redirects || []).map((item) => item.source));
for (const page of Object.values(statuses).filter((page) => page.status === 'redirected' || page.status === 'retired' || page.status === 'private-product-source')) {
  if (page.path.startsWith('/') && !redirectSources.has(page.path) && page.status !== 'unlisted') failures.push(`No Vercel redirect protects ${page.path} (${page.status}).`);
}

if (failures.length) {
  console.error(`Publish source check failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`Publish source check passed for ${sourceGuides.length} gated public guides and 3 workbook products.`);
