// Approve → Blotato. Takes a READY TO POST vault entry, builds the exact
// Blotato payload, and (only when explicitly armed) sends it, then flips the
// entry to SCHEDULED.
//
// SAFETY MODEL — read before changing anything here.
//
// Blotato has no draft state. Every scheduling mode on POST /posts fires on its
// own, and `useNextFreeSlot` against an empty queue publishes IMMEDIATELY. The
// account's queue is currently empty, so "approve" means "post now" unless a
// scheduledTime is given. There is no undo. A carousel already went live by
// accident on 27/05/2026 because useNextFreeSlot was mislabelled a review hold.
//
// So this route is DRY RUN unless BOTH are true:
//   BLOTATO_LIVE=1        explicitly armed
//   BLOTATO_API_KEY=...   key present in the environment, never in the repo
//
// and the target account carries a non-null `verified` date, because the ids on
// file predate the 22/06/2026 rebrand and may point at old accounts.
//
// Dry run returns the payload it *would* send and changes nothing.

import fs from 'node:fs';
import path from 'node:path';
import { ACCOUNTS, resolvePlatform, BLOTATO_BASE } from '../../lib/blotato-accounts.js';

export const prerender = false;

const ROOT = path.resolve(process.cwd(), '..');
const VAULT = path.join(ROOT, 'content-vault.md');
const MAGNETS = path.join(ROOT, 'lead-magnets.csv');

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const HEADER = /^## ENTRY (\d+) — (\d{2}\/\d{2}\/\d{4}) \| ([^|]+?) \| (.*?) \| ([A-Z][A-Z ]*[A-Z])(?: .*)?$/;

// Same extraction rules as tools/next-post.mjs: drop the header, the backtick
// metadata line, any **Status:** field, and everything from the critic notes on.
function readEntry(raw, num) {
  const lines = raw.split('\n');
  let found = null;
  let meta = null;
  const body = [];
  let inEntry = false;
  let done = false;

  for (const line of lines) {
    const m = line.match(HEADER);
    if (m) {
      if (inEntry) break;
      if (m[1] !== String(num).padStart(3, '0') && m[1] !== String(num)) continue;
      found = { num: m[1], date: m[2], platform: m[3].trim(), title: m[4], status: m[5].trim() };
      inEntry = true;
      continue;
    }
    if (!inEntry || done) continue;
    if (meta === null && body.length === 0 && /^`.*`$/.test(line.trim())) {
      meta = line.trim().replace(/^`|`$/g, '');
      continue;
    }
    if (/^>\s*\*\*Critic notes:/.test(line) || /^---\s*$/.test(line)) { done = true; continue; }
    if (/^\*\*Status:\*\*/.test(line)) continue;
    body.push(line);
  }
  if (!found) return null;
  while (body.length && !body[0].trim()) body.shift();
  while (body.length && !body[body.length - 1].trim()) body.pop();
  found.meta = meta;
  found.text = body.join('\n');
  return found;
}

// Engine Law 2: a CTA pointing at an inactive lead-magnet row is a leak.
function checkCta(meta) {
  if (!meta) return null;
  const m = meta.match(/CTA:\s*([A-Z][A-Z ]*?)\s*(?:·|$)/);
  if (!m) return null;
  const keyword = m[1].trim();
  let rows;
  try { rows = fs.readFileSync(MAGNETS, 'utf8').split('\n'); }
  catch { return { keyword, known: false }; }
  for (const row of rows.slice(1)) {
    if (!row.startsWith(keyword + ',')) continue;
    return { keyword, known: true, active: row.split(',')[5]?.trim().toLowerCase() === 'yes' };
  }
  return { keyword, known: false };
}

function setStatus(raw, num, status) {
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^## ENTRY\\s+${esc(String(num))}\\b.*$`, 'm');
  const hm = raw.match(re);
  if (!hm) return null;
  const start = raw.indexOf(hm[0]);
  const newHeader = hm[0].replace(/\|\s*[^|]*$/, `| ${status}`);
  raw = raw.slice(0, start) + newHeader + raw.slice(start + hm[0].length);
  const nextIdx = raw.indexOf('\n## ENTRY', start + newHeader.length);
  const end = nextIdx === -1 ? raw.length : nextIdx;
  const block = raw.slice(start, end).replace(/(\*\*Status:\*\*\s*).*/, `$1${status}`);
  return raw.slice(0, start) + block + raw.slice(end);
}

export async function POST({ request }) {
  try {
    const { num, scheduledTime } = await request.json();
    if (!num) return json({ ok: false, error: 'num required' }, 400);

    const raw = fs.readFileSync(VAULT, 'utf8');
    const entry = readEntry(raw, num);
    if (!entry) return json({ ok: false, error: `ENTRY ${num} not found` }, 404);

    if (entry.status !== 'READY TO POST') {
      return json({ ok: false, error: `ENTRY ${num} is ${entry.status}, not READY TO POST` }, 409);
    }
    if (!entry.text) return json({ ok: false, error: 'entry has no body' }, 422);

    // ── gates ────────────────────────────────────────────────────────────
    const blockers = [];
    const warnings = [];

    const key = resolvePlatform(entry.platform);
    const account = key ? ACCOUNTS[key] : null;
    if (!account) {
      blockers.push(`No Blotato account mapped for platform "${entry.platform}". Short-form video and carousels need media upload, which this route does not do yet.`);
    } else {
      if (account.requiresMedia) blockers.push(`${key} requires mediaUrls; text-only posting is not supported for it.`);
      if (account.maxChars && entry.text.length > account.maxChars) {
        blockers.push(`${entry.text.length} chars exceeds the ${account.maxChars} limit for ${key}.`);
      }
      if (!account.verified) {
        warnings.push(`Account id ${account.accountId} (${account.handle}) is UNVERIFIED since the 22/06 rebrand. Live sending is blocked until it is confirmed in blotato-accounts.js.`);
      }
    }

    // Engine Law 5: no em-dashes in public words.
    const dashes = (entry.text.match(/—/g) || []).length;
    if (dashes) warnings.push(`${dashes} em-dash${dashes > 1 ? 'es' : ''} — Engine Law 5 forbids them in public words.`);

    const cta = checkCta(entry.meta);
    if (cta && !cta.known) warnings.push(`CTA "${cta.keyword}" is not in lead-magnets.csv (Engine Law 2 leak).`);
    if (cta && cta.known && !cta.active) warnings.push(`CTA "${cta.keyword}" is INACTIVE in lead-magnets.csv (Engine Law 2 leak).`);

    // ── payload ──────────────────────────────────────────────────────────
    const content = { text: entry.text, platform: account?.platform };
    if (account?.pageId) content.pageId = account.pageId;

    const payload = {
      post: {
        accountId: account?.accountId,
        content,
        target: { targetType: account?.platform },
      },
    };
    if (scheduledTime) payload.post.scheduledTime = scheduledTime;
    else payload.post.useNextFreeSlot = true;

    const armed = process.env.BLOTATO_LIVE === '1';
    const hasKey = Boolean(process.env.BLOTATO_API_KEY);
    const accountOk = Boolean(account?.verified);
    const live = armed && hasKey && accountOk && blockers.length === 0;

    const preview = {
      entry: { num: entry.num, date: entry.date, platform: entry.platform, title: entry.title },
      target: account ? `${account.platform} · ${account.accountId} · ${account.handle}` : null,
      chars: entry.text.length,
      timing: scheduledTime
        ? `scheduledTime ${scheduledTime}`
        : 'useNextFreeSlot — PUBLISHES IMMEDIATELY if the Blotato queue is empty',
      blockers,
      warnings,
      payload,
    };

    if (!live) {
      const why = blockers.length ? 'blocked'
        : !armed ? 'BLOTATO_LIVE is not set to 1'
        : !hasKey ? 'BLOTATO_API_KEY is not in the environment'
        : 'target account is unverified since the rebrand';
      return json({ ok: true, mode: 'dry-run', reason: why, sent: false, ...preview });
    }

    // ── live send ────────────────────────────────────────────────────────
    const res = await fetch(`${BLOTATO_BASE}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'blotato-api-key': process.env.BLOTATO_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      return json({ ok: false, mode: 'live', sent: false, status: res.status, result, ...preview }, 502);
    }

    // Only touch the vault once Blotato has accepted it.
    const updated = setStatus(raw, num, 'SCHEDULED');
    if (updated) fs.writeFileSync(VAULT, updated);

    return json({ ok: true, mode: 'live', sent: true, vaultUpdated: Boolean(updated), result, ...preview });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
}
