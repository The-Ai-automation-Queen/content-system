// Reads the markdown "second brain" and turns it into structured data for the
// dashboard. No database — the markdown IS the database (CLAUDE.md, Step 6).
// Multi-brand aware: pass a tenant slug to read from tenants/<slug>/ instead of
// the repo root. Pure Node, zero parsing deps.
import fs from 'node:fs';
import path from 'node:path';

// dashboard/ runs with cwd = dashboard/, so the repo root is one level up.
const REPO_ROOT = path.resolve(process.cwd(), '..');

// Resolve the base folder for a tenant (root = the default tenant, Fatiha).
export function baseFor(tenant) {
  if (!tenant || tenant === 'root' || tenant === 'fatiha') return REPO_ROOT;
  const candidate = path.join(REPO_ROOT, 'tenants', tenant);
  // Fail closed: unknown tenant → root, never crash.
  return fs.existsSync(candidate) ? candidate : REPO_ROOT;
}

function readSafe(base, rel) {
  try {
    return fs.readFileSync(path.join(base, rel), 'utf8');
  } catch {
    return '';
  }
}

export function getTenants() {
  const dir = path.join(REPO_ROOT, 'tenants');
  let names = [];
  try {
    names = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
      .map((d) => d.name);
  } catch {
    /* no tenants dir yet */
  }
  return ['root', ...names];
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

export function getVault(base) {
  const raw = readSafe(base, 'content-vault.md');
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

// 14-day editorial calendar (Romain-style): SCHEDULED + POSTED entries placed
// on their vault date. Vault dates are DD/MM/YYYY (CLAUDE.md convention).
export function getCalendar(entries, days = 14) {
  const toKey = (d) => {
    const m = (d || '').match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
  };
  const byDate = {};
  for (const e of entries) {
    if (e.status !== 'SCHEDULED' && e.status !== 'POSTED') continue;
    const key = toKey(e.date);
    if (!key) continue;
    (byDate[key] ||= []).push(e);
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cells = [];
  for (let i = 0; i < days; i++) {
    const dt = new Date(today);
    dt.setDate(today.getDate() + i);
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
    cells.push({
      key,
      dow: dt.toLocaleDateString('en-US', { weekday: 'short' }),
      dom: dt.getDate(),
      isToday: i === 0,
      items: byDate[key] || [],
    });
  }
  return cells;
}

export function getReports(base) {
  let files = [];
  try {
    files = fs.readdirSync(path.join(base, 'reports')).filter((f) => f.endsWith('.md'));
  } catch {
    /* none */
  }
  const reports = files.map((f) => {
    const mm = f.match(/^(.*?)-(\d{4}-\d{2}-\d{2})\.md$/);
    return { file: f, type: mm ? mm[1] : f.replace(/\.md$/, ''), date: mm ? mm[2] : '' };
  });
  reports.sort((a, b) => b.date.localeCompare(a.date) || a.file.localeCompare(b.file));
  return reports;
}

export function getResearchCount(base) {
  const raw = readSafe(base, 'research-notes.md');
  const m = raw.match(/^## RESEARCH\s+\d+/gm);
  return m ? m.length : 0;
}

export function getLeadMagnets(base) {
  const raw = readSafe(base, 'lead-magnets.csv');
  const lines = raw.split('\n').slice(1).filter((l) => l.trim() && !l.startsWith('#'));
  const rows = lines.map((l) => {
    const c = l.split(',');
    return { keyword: (c[0] || '').trim(), label: (c[1] || '').replace(/"/g, '').trim(), active: /yes/i.test(c[5] || '') };
  });
  return { total: rows.length, active: rows.filter((r) => r.active).length, rows };
}

export function getSkillsList() {
  const skillsDir = path.join(REPO_ROOT, 'skills');
  let dirs = [];
  try {
    dirs = fs.readdirSync(skillsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
      .map((d) => d.name);
  } catch { return []; }
  return dirs.map((name) => {
    let desc = '';
    try {
      const raw = fs.readFileSync(path.join(skillsDir, name, 'SKILL.md'), 'utf8');
      const fm = raw.match(/description:\s*(.+)/);
      if (fm) { desc = fm[1].trim(); }
      else {
        for (const line of raw.split('\n')) {
          const t = line.trim();
          if (t && !t.startsWith('#') && !t.startsWith('---') && !t.startsWith('name:')) {
            desc = t.replace(/^>\s*/, '').slice(0, 120);
            break;
          }
        }
      }
    } catch {}
    return { name, desc };
  });
}

export function getChannels() {
  const raw = readSafe(REPO_ROOT, 'inventory.md');
  const channels = [];
  const lines = raw.split('\n');
  let inTable = false;
  for (const line of lines) {
    if (line.startsWith('| Channel')) { inTable = true; continue; }
    if (inTable && line.startsWith('|---')) continue;
    if (inTable && line.startsWith('|')) {
      const cols = line.split('|').map((c) => c.trim()).filter(Boolean);
      if (cols.length >= 3) {
        channels.push({
          name: cols[0],
          role: cols[1],
          connected: cols[2].includes('✅'),
          handle: cols[2].replace(/[✅❌]/g, '').trim(),
          notes: cols[3] || '',
        });
      }
    } else if (inTable) break;
  }
  return channels;
}

// Platform-grouped machines (Romain AFFISEO style: per-platform, not per-workflow).
export function getMachines() {
  const has = (k) => !!process.env[k];
  return [
    // ── REELS (INSTAGRAM / TIKTOK) ──
    { id: 'M01', name: 'Reels Script Generator', group: 'REELS (INSTAGRAM / TIKTOK)', skill: 'content-engine', status: 'live', note: '7 short-form scripts / run, auto-scored' },
    { id: 'M02', name: 'Reels Visual Production', group: 'REELS (INSTAGRAM / TIKTOK)', skill: 'visual-engine', status: 'live', note: 'AI images + narrated video via Blotato' },
    { id: 'M02', name: 'Avatar Reels (HeyGen)', group: 'REELS (INSTAGRAM / TIKTOK)', skill: 'heygen', status: has('HEYGEN_API_KEY') ? 'live' : 'needs-key', note: 'Clone video HeyGen + B-rolls' },
    { id: 'M03', name: 'Reels Factory', group: 'REELS (INSTAGRAM / TIKTOK)', skill: 'reels-factory', status: 'live', note: 'Clips Reels auto via Reap + hook + CTA' },

    // ── LINKEDIN ──
    { id: 'M01', name: 'LinkedIn Content Factory', group: 'LINKEDIN', skill: 'content-engine', status: 'live', note: 'In-voice posts, carousels, thought leadership' },
    { id: 'M02', name: 'LinkedIn Carousel Generator', group: 'LINKEDIN', skill: 'visual-engine', status: 'live', note: 'Visual carousels via Canva integration' },
    { id: 'M04', name: 'LinkedIn Distribution', group: 'LINKEDIN', skill: 'distribution', status: 'live', note: 'Queue to LinkedIn via Blotato' },
    { id: 'M05', name: 'LinkedIn DM Responder', group: 'LINKEDIN', skill: 'dm-responder', status: 'partial', note: 'Comment-keyword → DM lead magnet via GHL' },

    // ── YOUTUBE ──
    { id: 'M01', name: 'YouTube Script Generator', group: 'YOUTUBE', skill: 'content-engine', status: 'live', note: 'Long-form + Shorts scripts, critic-scored' },
    { id: 'M02', name: 'YouTube Thumbnails', group: 'YOUTUBE', skill: 'visual-engine', status: 'live', note: 'Thumbnails via Canva / visual engine' },
    { id: 'M03', name: 'YouTube Shorts Factory', group: 'YOUTUBE', skill: 'reels-factory', status: 'live', note: 'Clips from long videos with hooks + CTA' },

    // ── X (TWITTER) ──
    { id: 'M01', name: 'X Content Factory', group: 'X (TWITTER)', skill: 'content-engine', status: 'live', note: 'Short text posts + threads, auto-repurposed' },
    { id: 'M04', name: 'X Distribution', group: 'X (TWITTER)', skill: 'distribution', status: 'live', note: 'Queue to @aiautomatik via Blotato' },

    // ── CROSS-PLATFORM ──
    { id: 'M01', name: 'Signal Harvester', group: 'CROSS-PLATFORM', skill: 'signal-harvester', status: 'live', note: 'Multi-source daily: X/IG/YouTube + Tavily + RSS' },
    { id: 'M04', name: 'Multi-Platform Distribution', group: 'CROSS-PLATFORM', skill: 'distribution', status: 'live', note: 'Simultaneous queue to all connected channels' },

    // ── SYSTEM ──
    { id: 'SYS', name: 'Weekly Ops', group: 'SYSTEM', skill: 'weekly-ops', status: 'live', note: 'Full pipeline loop orchestrator' },
    { id: 'SYS', name: 'Vault Audit', group: 'SYSTEM', skill: 'vault-audit', status: 'live', note: 'Pipeline health check + stale content report' },
    { id: 'SYS', name: 'Competitor Watch', group: 'SYSTEM', skill: 'competitor-watch', status: 'live', note: 'Creator/competitor movement scan' },
    { id: 'SYS', name: 'Supadata Transcript', group: 'SYSTEM', skill: 'supadata-transcript', status: 'live', note: 'Pull transcripts from any video URL' },
  ];
}

export function getDashboard(tenant) {
  const base = baseFor(tenant);
  const entries = getVault(base);
  const byStatus = (s) => entries.filter((e) => e.status === s);

  const columns = [
    { key: 'DRAFT', label: 'Draft', color: '#8b949e', items: byStatus('DRAFT') },
    { key: 'READY TO POST', label: 'Ready to Post', color: '#3fb950', items: byStatus('READY TO POST') },
    { key: 'SCHEDULED', label: 'Scheduled', color: '#d4a72c', items: byStatus('SCHEDULED') },
    { key: 'POSTED', label: 'Posted', color: '#a371f7', items: byStatus('POSTED') },
  ];

  const flagged = entries.filter((e) => e.flags.length > 0);
  const pillars = PILLARS.map((p) => ({ name: p.name, n: entries.filter((e) => e.pillar.includes(p.token)).length }));
  const leads = getLeadMagnets(base);

  return {
    tenant: tenant && tenant !== 'root' ? tenant : 'Fatiha (root)',
    tenants: getTenants(),
    entries,
    columns,
    flagged,
    pillars,
    reports: getReports(base),
    calendar: getCalendar(entries),
    researchCount: getResearchCount(base),
    machines: getMachines(),
    skills: getSkillsList(),
    channels: getChannels(),
    leads,
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
