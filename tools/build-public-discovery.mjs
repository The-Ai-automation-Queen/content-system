#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const main = path.join(root, 'main-site');
const host = 'https://www.shiftandlead.com';
const statuses = JSON.parse(fs.readFileSync(path.join(root, 'data/page-status.json'), 'utf8'));
const guideInventory = JSON.parse(fs.readFileSync(path.join(root, 'next-app/content/guides.json'), 'utf8')).guides;
const approvedGuideSlugs = new Set(JSON.parse(fs.readFileSync(path.join(root, 'data/guide-publication.json'), 'utf8')).approved.map((guide) => guide.slug));
const guides = guideInventory.filter((guide) => approvedGuideSlugs.has(guide.slug));
const today = new Date().toISOString().slice(0, 10);
const entries = Object.values(statuses)
  .filter((page) => page.status === 'active')
  .map((page) => ({ loc: `${host}${page.path}`, lastmod: today }));
for (const guide of guides) entries.push({ loc: `${host}/guides/${guide.slug}/`, lastmod: guide.dateModified || today });
entries.sort((a, b) => a.loc.localeCompare(b.loc));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((entry) => `  <url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(main, 'sitemap.xml'), xml);

const llms = `# Shift & Lead\n\n> Use AI for what it does well. Keep what only you can bring. Build something valuable from the combination.\n\nShift & Lead helps professionals, business owners and teams use AI for real work, remove repetitive steps and decide what should stay with a person. It also offers a three-part workbook journey for finding personal patterns, recovering lived evidence and choosing what those experiences could become.\n\n## Start here\n\n- Free practical AI guides: ${host}/guides/\n- Guided workbooks: ${host}/workbooks.html\n- Work with me: ${host}/work-with-fatiha/\n- About Fatiha Chikh: ${host}/about.html\n\nWorkshops are available for companies.\n\n## Public guide library\n\n${guides.map((guide) => `- ${guide.title}: ${host}/guides/${guide.slug}/`).join('\n')}\n\n## Editorial approach\n\nThe guides offer practical, conversational instructions. Private workbook answers and personal reflection text are not collected by general website analytics.\n\n## Usage terms\n\nContent may be cited with attribution and a link to the source. It may not be used to train, fine-tune or build machine-learning models.\n`;
fs.writeFileSync(path.join(main, 'llms.txt'), llms);
console.log(`Built sitemap and llms.txt for ${entries.length} active public URLs.`);
