#!/usr/bin/env node
// next-post.mjs — pull one READY TO POST entry out of the vault as clean,
// paste-ready text.
//
// The vault is an audit format: every entry wraps its post body in a metadata
// line and a critic paragraph that is often longer than the post. That is right
// for review and wrong for release — "post one thing" currently means scrolling
// a 4,000-line file and hand-trimming. This closes that gap.
//
//   node tools/next-post.mjs            oldest READY TO POST (post in order)
//   node tools/next-post.mjs 093        one specific entry
//   node tools/next-post.mjs --list     every ready entry, one line each
//   node tools/next-post.mjs | pbcopy   straight to the clipboard
//
// The post body goes to stdout and NOTHING else does, so piping stays clean.
// Context, warnings and errors all go to stderr.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseVault, findEntry, countEmDashes, ctaKeyword } from './vault-parse.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const VAULT = join(REPO, 'content-vault.md');
const MAGNETS = join(REPO, 'lead-magnets.csv');

const out = (s = '') => process.stdout.write(s + '\n');
const note = (s = '') => process.stderr.write(s + '\n');

// ── lead-magnet CTA check (Engine Law 2) ─────────────────────────────────────
// "Every A-post carries a keyword CTA from an ACTIVE row in lead-magnets.csv.
//  A CTA pointing at an inactive row is a leak." Release time is the last
// moment that check is still cheap, so do it here.

function ctaStatus(meta) {
  if (!meta) return null;
  const keyword = ctaKeyword(meta);
  if (!keyword) return null;
  let rows;
  try {
    rows = readFileSync(MAGNETS, 'utf8').split('\n');
  } catch {
    return { keyword, known: false };
  }
  for (const row of rows.slice(1)) {
    if (!row.startsWith(keyword + ',')) continue;
    // active is column 6; the notes column may contain commas, so only split
    // the leading fields we care about.
    const active = row.split(',')[5]?.trim().toLowerCase();
    return { keyword, known: true, active: active === 'yes' };
  }
  return { keyword, known: false };
}

// ── main ─────────────────────────────────────────────────────────────────────

let vault;
try {
  vault = readFileSync(VAULT, 'utf8');
} catch {
  note(`Cannot read ${VAULT}`);
  process.exit(1);
}

const all = parseVault(vault);
const ready = all
  .filter((e) => e.status === 'READY TO POST')
  .sort((a, b) => Number(a.num) - Number(b.num));   // oldest first

const arg = process.argv[2];

if (arg === '--list' || arg === '-l') {
  note(`${ready.length} READY TO POST (oldest first)\n`);
  for (const e of ready) {
    const cta = ctaStatus(e.meta);
    const flags = [];
    if (cta && cta.known && !cta.active) flags.push('INACTIVE CTA');
    const dashes = countEmDashes(e.text);
    if (dashes) flags.push(`${dashes} em-dash${dashes > 1 ? 'es' : ''}`);
    const suffix = flags.length ? `  [${flags.join(', ')}]` : '';
    note(`  ${e.num}  ${e.date}  ${e.platform.padEnd(18)} ${e.title.slice(0, 52)}${suffix}`);
  }
  note('\nnode tools/next-post.mjs <id>   to print one');
  process.exit(0);
}

const entry = arg ? findEntry(all, arg) : ready[0];

if (!entry) {
  note(arg ? `No ENTRY ${arg} in the vault.` : 'Nothing is READY TO POST.');
  process.exit(1);
}

const text = entry.text;
if (!text.trim()) {
  note(`ENTRY ${entry.num} has no post body.`);
  process.exit(1);
}

// Context to stderr so stdout stays pasteable.
note(`ENTRY ${entry.num} · ${entry.date} · ${entry.platform} · ${entry.status}`);
if (entry.status !== 'READY TO POST') {
  note(`! Status is ${entry.status}, not READY TO POST.`);
}
const cta = ctaStatus(entry.meta);
if (cta) {
  if (!cta.known) note(`! CTA "${cta.keyword}" is not in lead-magnets.csv — that is a leak (Engine Law 2).`);
  else if (!cta.active) note(`! CTA "${cta.keyword}" is INACTIVE in lead-magnets.csv — fix or flag before posting.`);
  else note(`CTA ${cta.keyword} — active`);
}
// Voice law check (Engine Law 5: "no em-dashes" in every public word).
// Not redundant with the critic: ENTRY 093 carries five em-dashes while its own
// critic notes claim "no em-dashes ✓". A gate that grades itself is not a gate.
const emDashes = countEmDashes(text);
if (emDashes) {
  note(`! ${emDashes} em-dash${emDashes > 1 ? 'es' : ''} — Engine Law 5 forbids them in public words.`);
  note(`  Replace with a comma, a full stop, or brackets before posting.`);
}

note(`${text.length} chars`);
note(`\nAfter posting, set ENTRY ${entry.num} to POSTED in content-vault.md.`);
note('─'.repeat(60));

out(text);
