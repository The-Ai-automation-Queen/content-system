// Reads the markdown "second brain" in the repo root and turns it into
// structured data for the dashboard. No database — the markdown IS the database
// (see CLAUDE.md, Step 6). Pure Node, zero parsing deps.
import fs from 'node:fs';
import path from 'node:path';

// dashboard/ runs with cwd = dashboard/, so the repo root is one level up.
const ROOT = path.resolve(process.cwd(), '..');

function readSafe(rel) {
  try {
    return fs.readFileSync(path.join(ROOT, rel), 'utf8');
  } catch {
    return '';
  }
}

const KNOWN_FLAGS = ['PERSONALIZE', 'VERIFY', 'PREP', 'NEEDS HER FACE', 'NEEDS VISUAL'];

const PILLARS = [
  { name: 'Time Wins', token: 'Time Wins' },
  { name: 'Build Once, Runs Forever', token: 'Build Once' },
  { name: 'The Freedom Business', token: 'Freedom Business' },
  { name: 'Stop Doing That by Hand', token: 'Stop Doing' },
  { name: "What's Worth It", token: 'Worth It' },
  { name: 'Real Talk', token: 'Real Talk' },
];

// Parse content-vault.md into a list of entries.
export function getVault() {
  const raw = readSafe('content-vault.md');
  const re = /^## ENTRY\s+(\d+)\s+—\s+(.+)$/gm;
  const headers = [];
  let m;
  while ((m = re.exec(raw)) !== null) {
    headers.push({ index: m.index, num: m[1], rest: m[2].trim() });
  }

  const entries = [];
  for (let i = 0; i < headers.length; i++) {
    const start = headers[i].index;
    const end = i + 1 < headers.length ? headers[i + 1].index : raw.length;
    const block = raw.slice(start, end);

    // header: "DD/MM/YYYY | Platform | Title | STATUS"
    const parts = headers[i].rest.split('|').map((s) => s.trim());
    const date = parts[0] || '';
    let platform = parts[1] || '';
    const title = parts[2] || '(untitled)';
    let status = parts[3] || '';

    const fStatus = block.match(/\*\*Status:\*\*\s*(.+)/);
    if (fStatus) status = fStatus[1].trim();
    const fPlatform = block.match(/\*\*Platform:\*\*\s*(.+)/);
    if (fPlatform) platform = fPlatform[1].trim();
    const fCritic = block.match(/\*\*Critic score:\*\*\s*([\d.]+)/);
    const fPillar = block.match(/\*\*Pillar:\*\*\s*(.+)/);

    const flags = KNOWN_FLAGS.filter((f) => block.includes(f));
    const hasVisual = /\*\*Visual:\*\*/.test(block);
    const visualUrl = (block.match(/\*\*Visual:\*\*[\s\S]*?(https?:\/\/\S+)/) || [])[1] || '';

    entries.push({
      num: headers[i].num,
      date,
      platform,
      title,
      status: status.toUpperCase().replace(/[.\s]+$/, ''),
      critic: fCritic ? parseFloat(fCritic[1]) : null,
      pillar: fPillar ? fPillar[1].trim() : '',
      flags,
      hasVisual,
      visualUrl,
    });
  }
  return entries;
}

// List dated reports in reports/ (the run log / audit trail).
export function getReports() {
  let files = [];
  try {
    files = fs
      .readdirSync(path.join(ROOT, 'reports'))
      .filter((f) => f.endsWith('.md'));
  } catch {
    /* no reports dir */
  }
  const reports = files.map((f) => {
    const mm = f.match(/^(.*?)-(\d{4}-\d{2}-\d{2})\.md$/);
    return { file: f, type: mm ? mm[1] : f.replace(/\.md$/, ''), date: mm ? mm[2] : '' };
  });
  reports.sort((a, b) => b.date.localeCompare(a.date) || a.file.localeCompare(b.file));
  return reports;
}

export function getResearchCount() {
  const raw = readSafe('research-notes.md');
  const m = raw.match(/^## RESEARCH\s+\d+/gm);
  return m ? m.length : 0;
}

// Roll everything up into the shape the dashboard renders.
export function getDashboard() {
  const entries = getVault();
  const byStatus = (s) => entries.filter((e) => e.status === s);

  const columns = [
    { key: 'DRAFT', label: 'Draft', color: '#8b949e', items: byStatus('DRAFT') },
    { key: 'READY TO POST', label: 'Ready to Post', color: '#3fb950', items: byStatus('READY TO POST') },
    { key: 'SCHEDULED', label: 'Scheduled', color: '#d4a72c', items: byStatus('SCHEDULED') },
    { key: 'POSTED', label: 'Posted', color: '#a371f7', items: byStatus('POSTED') },
  ];

  const flagged = entries.filter((e) => e.flags.length > 0);

  const pillars = PILLARS.map((p) => ({
    name: p.name,
    n: entries.filter((e) => e.pillar.includes(p.token)).length,
  }));

  const reports = getReports();

  return {
    entries,
    columns,
    flagged,
    pillars,
    reports,
    researchCount: getResearchCount(),
    kpis: {
      total: entries.length,
      ready: byStatus('READY TO POST').length,
      scheduled: byStatus('SCHEDULED').length,
      posted: byStatus('POSTED').length,
      draft: byStatus('DRAFT').length,
      flagged: flagged.length,
      withVisual: entries.filter((e) => e.hasVisual).length,
    },
    generatedAt: new Date().toISOString(),
  };
}
