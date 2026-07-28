// archive-old-cards.mjs — Moves cards older than ARCHIVE_DAYS from briefs.json to archive.json.
// Idempotent. Safe to run daily via cron. Keeps the public board lean.

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { loadMergedConfig } from './config-loader.mjs';

const env = loadMergedConfig(process.cwd()).env;
const BRIEFS_PATH = env.BRIEFS_JSON_PATH || '/root/ai-insider-brief-pipeline/data/briefs.json';
const ARCHIVE_PATH = env.ARCHIVE_JSON_PATH || resolve(dirname(BRIEFS_PATH), 'archive.json');
const ARCHIVE_DAYS = 30;

function loadJSON(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch (err) {
    console.error('[ARCHIVE] Failed to read', path, err.message);
    return fallback;
  }
}

function main() {
  const briefs = loadJSON(BRIEFS_PATH, { cards: [] });
  const archive = loadJSON(ARCHIVE_PATH, { cards: [] });

  const cards = briefs.cards || [];
  const cutoff = Date.now() - ARCHIVE_DAYS * 86400000;

  const keep = [];
  const moved = [];

  cards.forEach(c => {
    const t = c.timestamp ? new Date(c.timestamp).getTime() : 0;
    // Curated historical cards are deliberately part of the public reading
    // library. Only ordinary expiring feed cards are moved out.
    if (c.lifecycle !== 'archive' && t && t < cutoff) {
      moved.push(c);
    } else {
      keep.push(c);
    }
  });

  if (moved.length === 0) {
    console.log('[ARCHIVE] No cards older than ' + ARCHIVE_DAYS + ' days. Nothing moved.');
    return;
  }

  // Dedup archive by card id
  const seen = new Set(archive.cards.map(c => c.id));
  moved.forEach(c => {
    if (!seen.has(c.id)) {
      archive.cards.push(c);
      seen.add(c.id);
    }
  });

  // Sort archive newest first
  archive.cards.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  briefs.cards = keep;

  writeFileSync(BRIEFS_PATH, JSON.stringify(briefs, null, 2));
  writeFileSync(ARCHIVE_PATH, JSON.stringify(archive, null, 2));

  console.log('[ARCHIVE] Moved ' + moved.length + ' cards. briefs.json now has ' + keep.length + '. archive.json now has ' + archive.cards.length + '.');
}

main();
