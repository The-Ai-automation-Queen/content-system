import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(),'shift-guide-audit-'));
try {
  const compiler = path.join(root,'next-app/node_modules/.bin/tsc');
  const result = spawnSync(compiler,['--module','commonjs','--target','es2022','--esModuleInterop','--skipLibCheck','--outDir',temp,path.join(root,'next-app/content/guide-page.ts')],{cwd:root,encoding:'utf8'});
  if (result.status) throw new Error(result.stderr || result.stdout);
  const require = createRequire(import.meta.url);
  const output = path.join(temp,'guide-page.js');
  const { getGuidePage } = require(output);
  const approved = JSON.parse(fs.readFileSync(path.join(root,'data/guide-publication.json'),'utf8')).approved;
  const inventory = JSON.parse(fs.readFileSync(path.join(root,'next-app/content/guides.json'),'utf8')).guides;
  const approvedSet = new Set(approved.map(g=>g.slug));
  const routes = fs.readFileSync(path.join(root,'next-app/app/guides/[slug]/page.tsx'),'utf8');
  const rows=[];
  let failures=0;
  for (const [index,item] of approved.entries()) {
    const g=getGuidePage(item.slug);
    const inv=inventory.find(i=>i.slug===item.slug);
    const notes=[];
    if (!g) notes.push('NO GUIDE CONTENT');
    if (!inv) notes.push('NOT IN LIBRARY');
    if (g) {
      if (!g.promise?.trim()) notes.push('No outcome promise');
      if (!g.coverAlt?.trim()) notes.push('Missing cover alt');
      if (!g.answer?.paragraphs?.length) notes.push('Missing open answer');
      if (!g.sections?.length && !g.series) notes.push('No chapter or interactive series');
      if (!fs.existsSync(path.join(root,'next-app/public',g.cover.replace(/^\//,'')))) notes.push('Missing cover file');
      if (g.lumailTag!==item.lumailTag) notes.push('Lumail tag differs from approval');
      if ((g.related?.length||0)!==3) notes.push('Missing onward guide card');
      for (const linked of g.related||[]) {
        if (!approvedSet.has(linked.slug)||linked.status==='coming-next') notes.push(`Unpublished onward card: ${linked.slug}`);
      }
      if (new Set((g.related||[]).map(x=>x.slug)).size!==(g.related||[]).length) notes.push('Duplicate onward guide card');
    }
    if (!routes.includes(`slug === "${item.slug}"`)) notes.push('Missing composed Next.js route');
    if (notes.length) failures++;
    const cover=inv?.cover||g?.cover||'';
    rows.push({ index:index+1,slug:item.slug,title:g?.title||inv?.title||'',chapters:g?.sections?.length||g?.series?.tasks?.length||1,sources:g?.sourceNotes?.length||0,related:g?.related?.length||0,cover,notes });
  }
  const lines=[
    '# Approved guide UX and linking audit',
    '',
    `**Scope:** ${approved.length} owner-approved Next.js guide routes; repo snapshot audited ${new Date().toISOString().slice(0,10)}. This is a deterministic source/build inspection, not a claim that every AI-tool instruction has been re-fact-checked against each vendor.`,
    '',
    '## Reference pattern adopted',
    '',
    'Cover and specific outcome → authored public opening and chapter outline → inline Lumail request → complete exercise and conclusion → approved onward guides. No account system; no marketing subscription without the separate checkbox. Existing guide covers and interactive full articles remain intact.',
    '',
    `**Automated failures:** ${failures} of ${approved.length} approved pages. All approved guides are expected to have exactly three live related cards, a cover, an opening answer, and a published route.`,
    '',
    '| # | Guide | Sections | Sources | Live next guides | Finding |',
    '|---:|---|---:|---:|---:|---|',
    ...rows.map(r=>`| ${r.index} | [${r.title.replaceAll('|','\\|')}](../next-app/app/guides/[slug]/page.tsx) · \`${r.slug}\` | ${r.chapters} | ${r.sources} | ${r.related} | ${r.notes.length?r.notes.join('; ').replaceAll('|','\\|'):'Passed source and route checks'} |`),
    '',
    '## Editorial follow-up (not a blocker for source integrity)',
    '',
    '- Retest time-sensitive AI product claims and instructions with the tool vendor before publication updates; a code audit cannot verify them.',
    '- The smallest number of source notes does not automatically make a guide inaccurate; add references where the copy makes a precise product, policy or factual claim.',
    '- Test the guide email and optional Lumail subscriber journey in a Vercel preview with a real token and a controlled inbox before changing the live project root.',
    '- Keep retired Chez series, unpublished slugs, private product sources and unapproved articles out of the public route inventory.',
    '',
  ];
  fs.writeFileSync(path.join(root,'docs/35-GUIDE-AUDIT.md'),lines.join('\n'));
  console.log(`Audited ${approved.length} guides. Automated failures: ${failures}. Report: docs/35-GUIDE-AUDIT.md`);
  if (failures) for (const row of rows.filter(r=>r.notes.length)) console.log(row.slug,':',row.notes.join('; '));
  process.exitCode=failures?1:0;
} finally { fs.rmSync(temp,{recursive:true,force:true}); }
