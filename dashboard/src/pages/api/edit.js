// Edit vault entry body content. Replaces the body section (everything after
// the first --- inside an ENTRY block) while preserving metadata fields.
import fs from 'node:fs';
import path from 'node:path';

export const prerender = false;

const ROOT = path.resolve(process.cwd(), '..');
const VAULT = path.join(ROOT, 'content-vault.md');

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
    const { num, body } = await request.json();
    if (!num || body == null) {
      return json({ ok: false, error: 'bad request' }, 400);
    }

    let raw = fs.readFileSync(VAULT, 'utf8');

    const headerRe = new RegExp(`^## ENTRY\\s+${escapeReg(String(num))}\\b.*$`, 'm');
    const hm = raw.match(headerRe);
    if (!hm) return json({ ok: false, error: 'entry not found' }, 404);

    const headerStart = raw.indexOf(hm[0]);
    const nextEntry = raw.indexOf('\n## ENTRY', headerStart + hm[0].length);
    const blockEnd = nextEntry === -1 ? raw.length : nextEntry;
    const block = raw.slice(headerStart, blockEnd);

    // Find the body separator (first --- after metadata fields)
    const lines = block.split('\n');
    let bodyStart = -1;
    let metaSepCount = 0;
    for (let i = 1; i < lines.length; i++) {
      if (/^---\s*$/.test(lines[i])) {
        metaSepCount++;
        if (metaSepCount === 1) {
          bodyStart = i;
          break;
        }
      }
    }

    if (bodyStart === -1) {
      return json({ ok: false, error: 'cannot find body separator' }, 400);
    }

    // Rebuild: metadata lines + separator + new body
    const metaLines = lines.slice(0, bodyStart + 1);
    const newBlock = metaLines.join('\n') + '\n' + body.trim() + '\n';

    raw = raw.slice(0, headerStart) + newBlock + raw.slice(blockEnd);
    fs.writeFileSync(VAULT, raw);

    return json({ ok: true, num });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
}
