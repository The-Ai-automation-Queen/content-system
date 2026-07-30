// Edit vault entry body content.
//
// Read and write MUST agree on where the body is, so this uses the same shared
// parser as data.js, next-post.mjs and api/publish.js (tools/vault-parse.mjs).
// It previously assumed the body was "everything after the first ---", which is
// an older entry format. In the current format --- ENDS an entry, so that
// assumption both hid the body from the dashboard and, on save, would have
// appended the edited text after the real post instead of replacing it.
import fs from 'node:fs';
import path from 'node:path';
import { replaceBody } from '../../../../tools/vault-parse.mjs';

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

    const raw = fs.readFileSync(VAULT, 'utf8');
    const updated = replaceBody(raw, num, body);
    if (updated === null) return json({ ok: false, error: 'entry not found' }, 404);

    fs.writeFileSync(VAULT, updated);

    return json({ ok: true, num });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  }
}
