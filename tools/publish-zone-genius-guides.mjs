#!/usr/bin/env node
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { productInvitations } from '../next-app/content/product-invitations.mjs';

const root = process.cwd();
const exportRoot = path.join(root, 'next-app', 'out');
const canonicalLegacyRoot = path.join(root, 'next-app', 'canonical', 'legacy-guides');
const guideRoot = path.join(root, 'main-site', 'guides');

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function render(slug, invitation) {
  return `<aside class="zone-genius-invitation article-shell" data-zone-genius-invitation="true" aria-labelledby="zone-genius-invitation-${slug}" style="margin-top:64px;margin-bottom:64px;padding:clamp(32px,5vw,56px);background:#edf0ff;border:1px solid #c9d1ff"><h2 id="zone-genius-invitation-${slug}" style="max-width:760px;margin:0 0 16px">${escapeHtml(invitation.heading)}</h2><p style="max-width:720px;margin:0 0 24px;line-height:1.6">${escapeHtml(invitation.body)}</p><a href="${invitation.href}" style="display:inline-block;padding:14px 18px;color:#fff;background:#2c4be0;border-radius:4px;font-weight:700;text-decoration:none">${escapeHtml(invitation.cta)}</a></aside>`;
}

// Publish the Guides index from its canonical Next export.
await copyFile(path.join(exportRoot, 'guides', 'index.html'), path.join(guideRoot, 'index.html'));

for (const [slug, invitation] of Object.entries(productInvitations)) {
  const exportedDirectory = path.join(exportRoot, 'guides', slug);
  const exportedGuide = path.join(exportedDirectory, 'index.html');
  const target = path.join(guideRoot, `${slug}.html`);
  await mkdir(exportedDirectory, { recursive: true });
  await copyFile(path.join(canonicalLegacyRoot, `${slug}.html`), exportedGuide);
  await copyFile(exportedGuide, target);
  const before = await readFile(target, 'utf8');
  const forms = (before.match(/<form\b/g) || []).length;
  const gates = (before.match(/guide-access-gate/g) || []).length;
  if (forms !== 1 || gates !== 1) throw new Error(`${slug}: expected one email form and one guide-access-gate`);

  const withoutOldInvitation = before.replace(/<aside class="zone-genius-invitation article-shell"[\s\S]*?<\/aside>/, '');
  const relatedMarker = '<section class="more-guides article-shell"';
  if (!withoutOldInvitation.includes(relatedMarker)) throw new Error(`${slug}: related guides marker missing`);
  const after = withoutOldInvitation.replace(relatedMarker, `${render(slug, invitation)}${relatedMarker}`);

  if ((after.match(/<form\b/g) || []).length !== forms || (after.match(/guide-access-gate/g) || []).length !== gates) {
    throw new Error(`${slug}: email gate changed during publishing`);
  }
  await writeFile(target, after);
  console.log(`Published canonical invitation: ${slug}`);
}

console.log('Published canonical Guides card and contextual invitations.');
