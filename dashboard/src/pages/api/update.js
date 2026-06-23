// Interactive write-back: moves a vault entry through the pipeline by editing
// content-vault.md (the source of truth). Dev-server endpoint (npm run dev).
// The markdown stays canonical; git tracks every change, so it's reversible.
import fs from 'node:fs';
import path from 'node:path';

export const prerender = false;

const ROOT = path.resolve(process.cwd(), '..');
const VAULT = path.join(ROOT, 'content-vault.md');
const VALID = ['DRAFT', 'READY TO POST', 'SCHEDULED', 'POSTED'];

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function POST({ request }) {
  try {
    const { num, status } = await request.json();
    if (!num || !VALID.includes(status)) {
      return json({ ok: false, error: 'bad request' }, 400);
    }

    let raw = fs.readFileSync(VAULT, 'utf8');

    // Locate the entry's header line: "## ENTRY <num> — <date> | <platform> | <title> | <STATUS>"
    const headerRe = new RegExp(`^## ENTRY\\s+${escapeReg(String(num))}\\b.*$`, 'm');
    const hm = raw.match(headerRe);
    if (!hm) return json({ ok: false, error: 'entry not found' }, 404);

    const oldHeader = hm[0];
    const headerStart = raw.indexOf(oldHeader);
    const newHeader = oldHeader.replace(/\|\s*[^|]*$/, `| ${status}`);
    raw = raw.slice(0, headerStart) + newHeader + raw.slice(headerStart + oldHeader.length);

    // Update the authoritative **Status:** field inside that entry's block.
    const blockStart = headerStart;
    const nextIdx = raw.indexOf('\n## ENTRY', blockStart + newHeader.length);
    const blockEnd = nextIdx === -1 ? raw.length : nextIdx;
    let block = raw.slice(blockStart, blockEnd);
    block = block.replace(/(\*\*Status:\*\*\s*).*/, `$1${status}`);
    raw = raw.slice(0, blockStart) + block + raw.slice(blockEnd);

    // Best-effort: update the quick-reference line at the top (matched by title).
    const parts = newHeader
      .replace(/^## ENTRY\s+\d+\s+—\s+/, '')
      .split('|')
      .map((s) => s.trim());
    const title = parts[2];
    if (title) {
      const lines = raw.split('\n');
      const firstEntryLine = lines.findIndex((l) => l.startsWith('## ENTRY'));
      for (let i = 0; i < (firstEntryLine === -1 ? lines.length : firstEntryLine); i++) {
        if (lines[i].startsWith('- ') && lines[i].includes(title) && lines[i].includes('|')) {
          lines[i] = lines[i].replace(/\|\s*[^|]*$/, `| ${status}`);
          break;
        }
      }
      raw = lines.join('\n');
    }

    fs.writeFileSync(VAULT, raw);
    return json({ ok: true, num, status });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
}
