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
 */
export function parseVault(raw) {
  const lines = raw.split('\n');
  // Byte offset of the start of each line.
  const offs = [];
  let acc = 0;
  for (const l of lines) { offs.push(acc); acc += l.length + 1; }

  const entries = [];
  let cur = null;

  const close = (endLine) => {
    if (!cur) return;
    // Trim blank lines off both ends of the body region.
    let s = cur.bodyStartLine;
    let e = endLine;
    while (s < e && !lines[s].trim()) s++;
    while (e > s && !lines[e - 1].trim()) e--;
    cur.text = lines.slice(s, e).join('\n');
    cur.bodyStart = offs[s] ?? raw.length;
    cur.bodyEnd = e > s ? offs[e - 1] + lines[e - 1].length : cur.bodyStart;
    entries.push(cur);
    cur = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(HEADER);
    if (m) {
      close(i);
      cur = {
        num: m[1],
        date: m[2],
        platform: m[3].trim(),
        title: m[4].trim(),
        status: m[5].trim(),
        meta: null,
        text: '',
        headerLine: i,
        bodyStartLine: i + 1,
        done: false,
      };
      continue;
    }
    if (!cur || cur.done) continue;

    // Metadata and review fields sit between the header and the body.
    if (i === cur.bodyStartLine) {
      if (META.test(lines[i].trim())) {
        cur.meta = lines[i].trim().replace(/^`|`$/g, '');
        cur.bodyStartLine = i + 1;
        continue;
      }
    }
    if (cur.bodyStartLine === i && (FIELD.test(lines[i]) || !lines[i].trim())) {
      cur.bodyStartLine = i + 1;
      continue;
    }
    if (FIELD.test(lines[i]) && cur.bodyStartLine === i) { cur.bodyStartLine = i + 1; continue; }

    if (CRITIC.test(lines[i]) || RULE.test(lines[i])) {
      cur.done = true;
      cur.bodyEndLine = i;
      close(i);
    }
  }
  close(lines.length);
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
