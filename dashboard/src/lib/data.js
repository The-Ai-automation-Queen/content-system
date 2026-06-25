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

    // Extract the body content for dashboard review.
    // Strip the metadata header (everything up to and including the first ---)
    // and spoken-script / caption sections are preserved for reading.
    let body = '';
    const bodyMatch = block.match(/^---\s*$([\s\S]*)/m);
    if (bodyMatch) {
      body = bodyMatch[1]
        .replace(/^### (SPOKEN SCRIPT|CAPTION)\s*$/gm, '\n**$1**\n')
        .replace(/\*\*Status:\*\*.+\n?/g, '')
        .replace(/\*\*Platform:\*\*.+\n?/g, '')
        .replace(/\*\*Format:\*\*.+\n?/g, '')
        .replace(/\*\*Topic:\*\*.+\n?/g, '')
        .replace(/\*\*Pattern used:\*\*.+\n?/g, '')
        .replace(/\*\*Pillar:\*\*.+\n?/g, '')
        .replace(/\*\*Critic score:\*\*.+\n?/g, '')
        .replace(/\*\*Source:\*\*.+\n?/g, '')
        .replace(/^---\s*$/gm, '')
        .replace(/^\s*>\s+\*\*Production note.+$/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    }

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
      body,
      patterns: parsePatterns(block),
    });
  }
  return entries;
}

// 14-day editorial calendar: SCHEDULED + POSTED entries placed
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

// Parse performance-log.md → { entries: [...], latest }
export function getPerformanceLog(base) {
  const raw = readSafe(base, 'performance-log.md');
  if (!raw.trim()) return { entries: [], latest: null };

  const re = /^## PERFORMANCE\s+(\d{4}-\d{2}-\d{2})/gm;
  const headers = [];
  let m;
  while ((m = re.exec(raw)) !== null) {
    headers.push({ index: m.index, date: m[1] });
  }
  if (headers.length === 0) return { entries: [], latest: null };

  const entries = [];
  for (let i = 0; i < headers.length; i++) {
    const start = headers[i].index;
    const end = i + 1 < headers.length ? headers[i + 1].index : raw.length;
    const block = raw.slice(start, end);

    // Parse profile stats: look for lines like "- **Instagram:** 1,234 followers, 56 posts"
    const profiles = {};
    const profRe = /[-*]\s*\*\*(\w[\w\s]*?)\*\*[:\s]+(.+)/g;
    let pm;
    while ((pm = profRe.exec(block)) !== null) {
      const key = pm[1].trim().toLowerCase().replace(/\s+/g, '');
      const line = pm[2];
      const nums = {};
      const follMatch = line.match(/([\d,]+)\s*follower/i);
      const subMatch = line.match(/([\d,]+)\s*sub/i);
      const postMatch = line.match(/([\d,]+)\s*post/i);
      const viewMatch = line.match(/([\d,]+)\s*view/i);
      if (follMatch) nums.followers = parseInt(follMatch[1].replace(/,/g, ''), 10);
      if (subMatch) nums.subs = parseInt(subMatch[1].replace(/,/g, ''), 10);
      if (postMatch) nums.posts = parseInt(postMatch[1].replace(/,/g, ''), 10);
      if (viewMatch) nums.views = parseInt(viewMatch[1].replace(/,/g, ''), 10);
      if (Object.keys(nums).length > 0) profiles[key] = nums;
    }

    // Parse top posts: lines under a "Top posts" heading
    const topPosts = [];
    const tpSection = block.match(/#+\s*Top\s+posts[\s\S]*?(?=\n#|\n## |$)/i);
    if (tpSection) {
      const tpRe = /[-\d.]+\s*[.)]\s*\*?\*?(.+?)(?:\*?\*?)?\s*(?:[-–—]|:)\s*(.+)/g;
      let tp;
      while ((tp = tpRe.exec(tpSection[0])) !== null) {
        const title = tp[1].replace(/\*\*/g, '').trim();
        const rest = tp[2];
        const platM = rest.match(/\b(Instagram|IG|YouTube|YT|TikTok|LinkedIn|Facebook|FB|X|Twitter)\b/i);
        const likesM = rest.match(/([\d,]+)\s*like/i);
        const commM = rest.match(/([\d,]+)\s*comment/i);
        const viewsM = rest.match(/([\d,]+)\s*view/i);
        topPosts.push({
          title,
          platform: platM ? platM[1] : '',
          likes: likesM ? parseInt(likesM[1].replace(/,/g, ''), 10) : 0,
          comments: commM ? parseInt(commM[1].replace(/,/g, ''), 10) : 0,
          views: viewsM ? parseInt(viewsM[1].replace(/,/g, ''), 10) : 0,
        });
      }
    }

    entries.push({ date: headers[i].date, profiles, topPosts });
  }

  // Most recent = first entry (file convention: newest at top).
  // But sort by date descending to be safe.
  entries.sort((a, b) => b.date.localeCompare(a.date));
  return { entries, latest: entries[0] || null };
}

// Parse the most recent competitor-watch report → { date, creators, hooks, gaps }
export function getCompetitorHighlights(base) {
  let files = [];
  try {
    files = fs
      .readdirSync(path.join(base, 'reports'))
      .filter((f) => f.startsWith('competitor-watch-') && f.endsWith('.md'));
  } catch {
    /* none */
  }
  if (files.length === 0) return { date: '', creators: [], hooks: [], gaps: [] };

  files.sort((a, b) => b.localeCompare(a)); // newest first by filename date
  const raw = readSafe(base, path.join('reports', files[0]));
  const dateM = files[0].match(/(\d{4}-\d{2}-\d{2})/);
  const date = dateM ? dateM[1] : '';

  // Creator breakdown: lines starting with "- **Name**" (may include handle)
  const creators = [];
  const crRe = /^- \*\*(.+?)\*\*\s*[-–—]\s*(.+)/gm;
  let cr;
  while ((cr = crRe.exec(raw)) !== null) {
    creators.push({ name: cr[1].trim(), insight: cr[2].trim() });
  }

  // Top hooks: numbered list under "Top hooks" heading
  const hooks = [];
  const hookSection = raw.match(/#+\s*Top hooks[^\n]*\n([\s\S]*?)(?=\n## |\n$)/i);
  if (hookSection) {
    const hRe = /^\d+\.\s+\*?\*?(.+)/gm;
    let h;
    while ((h = hRe.exec(hookSection[1])) !== null) {
      hooks.push(h[1].replace(/\*\*/g, '').trim());
    }
  }

  // Gaps: numbered list under "Gaps" heading
  const gaps = [];
  const gapSection = raw.match(/#+\s*Gaps[^\n]*\n([\s\S]*?)(?=\n## |\n$)/i);
  if (gapSection) {
    const gRe = /^\d+\.\s+\*?\*?(.+)/gm;
    let g;
    while ((g = gRe.exec(gapSection[1])) !== null) {
      gaps.push(g[1].replace(/\*\*/g, '').trim());
    }
  }

  return { date, creators, hooks, gaps };
}

// Count hook pattern usage across vault entries → [{pattern, count}] sorted desc.
export function getHookScorecard(entries) {
  const counts = {};
  for (const e of entries) {
    // Patterns live in the body or in the raw vault; we stored the full block
    // but body strips it. Re-extract from the vault text is expensive, so we
    // rely on the entries' raw data. However getVault strips `Pattern used`.
    // Instead, we'll re-read the vault once in getDashboard and pass the raw.
    // For now, accept entries that carry a `patterns` array.
    if (e.patterns) {
      for (const p of e.patterns) {
        counts[p] = (counts[p] || 0) + 1;
      }
    }
  }
  return Object.entries(counts)
    .map(([pattern, count]) => ({ pattern, count }))
    .sort((a, b) => b.count - a.count);
}

// Parse pattern names from a "**Pattern used:**" line.
function parsePatterns(block) {
  const m = block.match(/\*\*Pattern used:\*\*\s*(.+)/);
  if (!m) return [];
  // Pattern line looks like: "Result-First Demo (10) + Contrarian Operational Hook (14)"
  return m[1]
    .split('+')
    .map((s) => s.replace(/\(\d+\)/g, '').trim())
    .filter(Boolean);
}

// The 5 machines + their live-wiring status. Env presence flips ⚙️ → live.
export function getMachines() {
  const has = (k) => !!process.env[k];
  return [
    { id: 'M01·data', name: 'Signal Harvester', skill: 'signal-harvester', status: 'live', note: 'X/IG/YouTube via Apify (no paid X API) + Tavily web search' },
    { id: 'M01·script', name: 'Content Engine', skill: 'content-engine', status: 'live', note: 'In-voice drafts, critic-scored' },
    { id: 'M02·visual', name: 'Visual Engine', skill: 'visual-engine', status: 'live', note: 'Blotato AI images + narrated video (open egress on VPS)' },
    { id: 'M02·face', name: 'HeyGen Talking-Head', skill: 'heygen', status: has('HEYGEN_API_KEY') ? 'live' : 'needs-key', note: 'Set HEYGEN_API_KEY (the one paid tool) + record avatar/voice IDs' },
    { id: 'M03·reels', name: 'Reels Factory', skill: 'reels-factory', status: 'live', note: 'Reap MCP (virality-scored, no key) + Blotato fallback — no Opus Clip' },
    { id: 'M04·post', name: 'Distribution', skill: 'distribution', status: 'live', note: 'Blotato queue across platforms (connect TikTok to add it)' },
    { id: 'M05·leads', name: 'DM Responder', skill: 'dm-responder', status: 'partial', note: 'Runs on GoHighLevel (replaces ManyChat); activate lead-magnet URLs' },
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
  const performance = getPerformanceLog(base);
  const competitor = getCompetitorHighlights(base);
  const hookScorecard = getHookScorecard(entries);

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
    leads,
    performance,
    competitor,
    hookScorecard,
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
