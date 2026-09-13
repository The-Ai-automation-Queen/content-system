import { readFileSync, realpathSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

// Read the approved, hash-verified context afresh for each capture. No git pull
// or network action here: deployments control the checked-out source version.
export function loadPositioningContext(directory = process.env.RESEARCH_CONTEXT_DIR) {
  if (!directory) throw new Error('RESEARCH_CONTEXT_DIR is not configured');
  const root = realpathSync(directory);
  const manifest = JSON.parse(readFileSync(resolve(root, 'current-context.json'), 'utf8'));
  if (!manifest.context_version || !Array.isArray(manifest.active_files)) throw new Error('Invalid context manifest');
  const required = ['positioning.md', 'research-policy.md', 'sources.md'];
  if (required.some(p => !manifest.active_files.includes(p))) throw new Error('Required context missing');
  const names = [...new Set([...required, 'voice.md', 'offers.md'].filter(p => manifest.active_files.includes(p)))];
  const parts = [];
  for (const name of names) {
    if (!/^[a-z-]+\.md$/.test(name)) throw new Error('Invalid context path');
    const path = realpathSync(resolve(root, name));
    if (!path.startsWith(root + sep)) throw new Error('Context path escapes root');
    const bytes = readFileSync(path);
    if (bytes.length > 100_000) throw new Error('Context file too large');
    if (createHash('sha256').update(bytes).digest('hex') !== manifest.sha256?.[name]) throw new Error('Context hash mismatch');
    parts.push(`## ${name}\n${bytes.toString('utf8')}`);
  }
  // Reject uncommitted changes in the loaded files and manifest: the reported
  // commit must describe the context actually used, not an unrelated HEAD.
  const tracked = ['current-context.json', ...names];
  if (execFileSync('git', ['-C', root, 'status', '--porcelain', '--', ...tracked], {encoding:'utf8'}).trim()) throw new Error('Context has uncommitted changes');
  const commit = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], {encoding:'utf8'}).trim();
  return {version:manifest.context_version, commit, text:parts.join('\n\n')};
}
