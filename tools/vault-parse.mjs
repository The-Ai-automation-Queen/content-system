// One parser for content-vault.md, shared by every consumer.
//
// There were three separate implementations of "where does the post text start
// and stop" — tools/next-post.mjs, dashboard/src/lib/data.js and
// dashboard/src/pages/api/edit.js — and they disagreed. data.js and edit.js
// both looked for "everything after the first ---", which was true of an older
// entry format. In the current format `---` is the separator that ENDS an
// entry, so data.js returned an empty body for 46 of 73 entries, including 35
// of the 37 that were READY TO POST. Mission Control showed "(no content yet)"
// for almost the entire publishable queue.
//
// That is also why edit.js was unsafe: it treated the trailing separator as the
// body marker, so saving would have appended the edited text after the real
// post instead of replacing it.
//
// Entry shape this understands:
//
//   ## ENTRY 093 — 24/07/2026 | LinkedIn | Title | READY TO POST
//   `A · What's Worth It · CTA: STACK · critic 8.0 · src: RESEARCH 043-S1`
//   **Status:** READY TO POST          <- optional, duplicated review field
//
//   <post text>                        <- the body
//
//   > **Critic notes:** ...            <- ends the body
//   ---                                <- or this ends it

const HEADER = /^## ENTRY (\d+) — (\d{2}\/\d{2}\/\d{4}) \| ([^|]+?) \| (.*?) \| (.+?)\s*$/;
const META = /^`.*`$/;
const CRITIC = /^>\s*\*\*Critic notes:/;
const RULE = /^---\s*$/;
const FIELD = /^\*\*[A-Za-z][A-Za-z ]*:\*\*/;

/**
 * Parse every entry. Each carries byte offsets for its body region so callers
 * can splice precisely instead of re-deriving the boundaries.
 *
 * TWO entry formats coexist in the vault, and both must work:
 *
 * Format A — the pre-14/07 era (roughly ENTRY 001–046):
 *     ## ENTRY 002 — … | STALE …
 *     **Status:** … / **Platform:** … / **Source:** … (may wrap over lines,
 *     may include **⚠️ PREP/PERSONALIZE** operator warnings)
 *     ---                      ← separator
 *     <the actual post body>
 *
 * Format B — the current era (roughly ENTRY 047+):
 *     ## ENTRY 093 — … | READY TO POST
 *     `A · pillar · CTA: STACK · …`
 *     <the actual post body>
 *     > **Critic notes:** …    ← ends the body
 *     ---                      ← ends the entry
 *
 * The original data.js handled only format A; the first version of this parser
 * handled only format B. Each "fix" silently flipped which half of the vault
 * rendered. The discriminator used here: a `**Field:**` line before the first
 * `---` with real content after that `---` means format A; otherwise format B.
 * If a format-A read comes back empty it falls through to the format-B rules,
 * so a stray field line can never blank an entry.
 */
export function parseVault(raw) {
  const lines = raw.split('\n');
  // Byte offset of the start of each line.
  const offs = [];
  let acc = 0;
  for (const l of lines) { offs.push(acc); acc += l.length + 1; }

  // Locate blocks.
  const heads = [];
  for (let i = 0; i < lines.length; i++) {
    if (HEADER.test(lines[i])) heads.push(i);
  }

  const entries = [];
  for (let h = 0; h < heads.length; h++) {
    const start = heads[h];
    const end = h + 1 < heads.length ? heads[h + 1] : lines.length;
    const m = lines[start].match(HEADER);

    const cur = {
      num: m[1],
      date: m[2],
      platform: m[3].trim(),
      title: m[4].trim(),
      status: m[5].trim(),
      meta: null,
      text: '',
      headerLine: start,
      bodyStart: 0,
      bodyEnd: 0,
    };

    // Consume backtick metadata lines directly under the header. Keep the
    // FIRST as `meta` (it carries the CTA); ENTRY 067 has a second
    // (`Series: …`) which is skipped, not allowed to overwrite the first.
    let top = start + 1;
    while (top < end && META.test(lines[top].trim())) {
      if (cur.meta === null) cur.meta = lines[top].trim().replace(/^`|`$/g, '');
      top++;
    }

    // First horizontal rule in the block, if any.
    let firstRule = -1;
    for (let i = top; i < end; i++) {
      if (RULE.test(lines[i])) { firstRule = i; break; }
    }
    const fieldBeforeRule =
      firstRule !== -1 &&
      lines.slice(top, firstRule).some((l) => FIELD.test(l));

    // Given a candidate start line, the body runs to the next rule / critic
    // notes / end of block.
    const regionFrom = (s) => {
      let e = end;
      for (let i = s; i < end; i++) {
        if (RULE.test(lines[i]) || CRITIC.test(lines[i])) { e = i; break; }
      }
      while (s < e && !lines[s].trim()) s++;
      while (e > s && !lines[e - 1].trim()) e--;
      return [s, e];
    };

    let s;
    let e;
    if (fieldBeforeRule) {
      // Format A: everything before the rule is metadata (fields, their
      // wrapped continuation lines, operator ⚠️ warnings). Body is after it.
      [s, e] = regionFrom(firstRule + 1);
    }
    if (!fieldBeforeRule || s >= e) {
      // Format B (or a format-A block whose post-rule region is empty):
      // skip leading blank and field lines, then read to rule/critic.
      let t = top;
      while (t < end && (!lines[t].trim() || FIELD.test(lines[t]))) t++;
      [s, e] = regionFrom(t);
    }

    cur.text = s < e ? lines.slice(s, e).join('\n') : '';
    cur.bodyStart = offs[s] ?? raw.length;
    cur.bodyEnd = e > s ? offs[e - 1] + lines[e - 1].length : cur.bodyStart;
    entries.push(cur);
  }
  return entries;
}

export const findEntry = (entries, num) =>
  entries.find((e) => e.num === String(num).padStart(3, '0') || e.num === String(num));

/** Replace one entry's body text, leaving header, metadata and critic notes intact. */
export function replaceBody(raw, num, newText) {
  const e = findEntry(parseVault(raw), num);
  if (!e) return null;
  return raw.slice(0, e.bodyStart) + newText.trim() + raw.slice(e.bodyEnd);
}

/** Count em-dashes — Engine Law 5 forbids them in public words. */
export const countEmDashes = (text) => (text.match(/—/g) || []).length;

/** Pull the CTA keyword out of the backtick metadata line, if there is one. */
export function ctaKeyword(meta) {
  if (!meta) return null;
  const m = meta.match(/CTA:\s*([A-Z][A-Z ]*?)\s*(?:·|$)/);
  return m ? m[1].trim() : null;
}
