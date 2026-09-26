#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => fs.readFileSync(path.join(root,name),'utf8');
const exists = (name) => fs.existsSync(path.join(root,name));
const publication = JSON.parse(read('data/guide-publication.json'));
const statuses = JSON.parse(read('data/page-status.json'));
const inventory = JSON.parse(read('next-app/content/guides.json')).guides;
const vercel = JSON.parse(read('next-app/vercel.json'));
const route = read('next-app/app/guides/[slug]/page.tsx');
const library = read('next-app/content/guides.ts');
const failures=[];
const approved=publication.approved.map((guide)=>guide.slug);
const approvedSet=new Set(approved);
if (approved.length!==35||approvedSet.size!==approved.length) failures.push(`Expected 35 unique approved guides; found ${approved.length}/${approvedSet.size}.`);
if (!exists('next-app/app/page.tsx')||!read('next-app/app/page.tsx').includes('Use AI with')) failures.push('Next.js homepage has not replaced the old redirect.');
if (!exists('next-app/app/sitemap.ts')||!exists('next-app/app/guides/page.tsx')) failures.push('Next.js guide library or sitemap is missing.');
if (!library.includes('guide.status === "live"')||!library.includes('publication.approved')) failures.push('The guide library must be gated by the approval manifest.');
if (!route.includes('if (!approvedGuideSlugs.includes(slug)) notFound()')) failures.push('Unapproved guide routes are not rejected.');
for (const slug of approved) {
  if (!inventory.find((guide)=>guide.slug===slug)) failures.push(`Guide missing from inventory: ${slug}`);
  if (!route.includes(`slug === "${slug}"`)) failures.push(`Approved guide lacks its composed Next.js route: ${slug}`);
  if (!exists(`next-app/public/images/guides/${slug}.webp`) && !inventory.find((guide)=>guide.slug===slug)?.cover?.startsWith('/images/guides/')) failures.push(`Guide cover missing: ${slug}`);
  const redirect=vercel.redirects?.find((item)=>item.source===`/guides/${slug}.html`);
  if (!redirect||redirect.destination!==`/guides/${slug}/`||redirect.permanent!==true) failures.push(`Legacy guide URL lacks permanent canonical redirect: ${slug}`);
  if (exists(`next-app/public/guides/${slug}.html`)) failures.push(`Retired HTML guide copy is public: ${slug}`);
}
for (const entry of Object.values(statuses).filter((item)=>item.status==='active' && item.path !== '/' && item.path !== '/guides/')) {
  if (!exists(`next-app/public${entry.path}`)) failures.push(`Active offer page missing in Next.js public bridge: ${entry.path}`);
}
for (const entry of Object.values(statuses).filter((item)=>item.status==='retired' && item.path.startsWith('/'))) {
  if (exists(`next-app/public${entry.path}`)) failures.push(`Retired page exposed in Next.js public: ${entry.path}`);
}
for (const slug of publication.retired?.map((guide)=>guide.slug)||[]) {
  if (exists(`next-app/public/guides/${slug}/index.html`)) failures.push(`Retired guide exposed in Next.js public: ${slug}`);
}
if (exists('site')) failures.push('Retired site/ directory remains in the canonical project.');
if (vercel.framework!=='nextjs'||vercel.outputDirectory||vercel.buildCommand!=='npm run build') failures.push('Vercel must build server-backed Next.js with no static output override.');
if (read('next-app/next.config.ts').includes('output: "export"')) failures.push('Static export would disable Lumail capture routes.');
if (!exists('next-app/app/api/guide-capture/route.ts')) failures.push('Next.js Lumail guide route is missing.');
if (failures.length) { console.error('Publish source check failed:\n- '+failures.join('\n- ')); process.exitCode=1; }
else console.log(`Publish source check passed: Next.js homepage, 35 approved guides, active offer pages, redirects, sitemap and Lumail API.`);
