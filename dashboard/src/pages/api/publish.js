// Approve → Blotato. Takes a READY TO POST vault entry, builds the exact
// Blotato payload, schedules it for a future time, and flips the entry to
// SCHEDULED.
//
// SAFETY MODEL — read before changing anything here.
//
// Blotato has no draft state. Every scheduling mode on POST /posts fires on its
// own, and `useNextFreeSlot` against an EMPTY queue publishes IMMEDIATELY —
// this account's queue is empty. A carousel already went live by accident on
// 27/05/2026 because useNextFreeSlot was mislabelled a review hold.
//
// So a scheduledTime is REQUIRED. Without one the request is blocked, rather
// than quietly falling back to "post now". Immediate publishing is still
// reachable, but only by passing publishNow: true on purpose.
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
import { parseVault, findEntry, countEmDashes, ctaKeyword } from '../../../../tools/vault-parse.mjs';

export const prerender = false;

const ROOT = path.resolve(process.cwd(), '..');
const VAULT = path.join(ROOT, 'content-vault.md');
const MAGNETS = path.join(ROOT, 'lead-magnets.csv');

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { 'content-type': 'application/json' },
  });

// Engine Law 2: a CTA pointing at an inactive lead-magnet row is a leak.
function checkCta(meta) {
  if (!meta) return null;
  const keyword = ctaKeyword(meta);
  if (!keyword) return null;
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
    const { num, scheduledTime, publishNow } = await request.json();
    if (!num) return json({ ok: false, error: 'num required' }, 400);

    const raw = fs.readFileSync(VAULT, 'utf8');
    const entry = findEntry(parseVault(raw), num);
    if (!entry) return json({ ok: false, error: `ENTRY ${num} not found` }, 404);

    if (entry.status !== 'READY TO POST') {
      return json({ ok: false, error: `ENTRY ${num} is ${entry.status}, not READY TO POST` }, 409);
    }
    if (!entry.text.trim()) return json({ ok: false, error: 'entry has no body' }, 422);

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
    const dashes = countEmDashes(entry.text);
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
    // Scheduling is the default and the safe path. useNextFreeSlot is only
    // reachable via an explicit publishNow, because with an empty queue it
    // means "publish this second, irreversibly".
    if (scheduledTime) {
      const when = new Date(scheduledTime);
      if (Number.isNaN(when.getTime())) {
        blockers.push(`scheduledTime "${scheduledTime}" is not a valid date.`);
      } else if (when.getTime() <= Date.now()) {
        blockers.push(`scheduledTime ${when.toISOString()} is in the past.`);
      } else {
        payload.post.scheduledTime = when.toISOString();
      }
    } else if (publishNow) {
      payload.post.useNextFreeSlot = true;
    } else {
      blockers.push('No scheduledTime given. Pick a date and time — this route will not publish immediately by default.');
    }

    const armed = process.env.BLOTATO_LIVE === '1';
    const hasKey = Boolean(process.env.BLOTATO_API_KEY);
    const accountOk = Boolean(account?.verified);
    const live = armed && hasKey && accountOk && blockers.length === 0;

    const preview = {
      entry: { num: entry.num, date: entry.date, platform: entry.platform, title: entry.title },
      target: account ? `${account.platform} · ${account.accountId} · ${account.handle}` : null,
      chars: entry.text.length,
      timing: payload.post.scheduledTime
        ? `scheduled for ${payload.post.scheduledTime}`
        : payload.post.useNextFreeSlot
          ? 'useNextFreeSlot — PUBLISHES IMMEDIATELY, the queue is empty'
          : 'no timing set',
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
