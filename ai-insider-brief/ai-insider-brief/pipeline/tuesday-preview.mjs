// tuesday-preview.mjs — Cron entry point for the Tuesday send-approval flow.
//
// This script does NOT send anything and does NOT talk to Kit or Telegram
// directly. It only drops a trigger file that the persistent approval-bot.mjs
// process (already polling every ~10s for new pending cards) picks up on its
// next poll and turns into a Telegram message with "Send to subscribers" /
// "Skip this week" buttons. This keeps the human-release rule intact
// (Constitution Law 11 / Engine Law 1: agents queue, Fatiha releases) even
// though the trigger itself is cron-fired and unattended.
//
// Usage: node tuesday-preview.mjs
// Cron:  30 5 * * 2  (Tuesday 05:30 GST) — see deploy/crontab.example

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { loadMergedConfig } from './config-loader.mjs';

var __dirname = dirname(fileURLToPath(import.meta.url));

function ensureDir(filePath) {
  var dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function main() {
  var loaded = loadMergedConfig(__dirname);
  var env = loaded.env;
  var triggerPath = env.PREVIEW_TRIGGER_PATH || resolve(__dirname, 'preview-trigger.json');

  ensureDir(triggerPath);
  writeFileSync(triggerPath, JSON.stringify({ requested: true, ts: new Date().toISOString() }, null, 2));

  console.log('[TUESDAY-PREVIEW] Trigger written to ' + triggerPath);
  console.log('[TUESDAY-PREVIEW] The approval bot will post the Tuesday preview to Telegram within ~10 seconds.');
  console.log('[TUESDAY-PREVIEW] Nothing is sent to subscribers until the "Send to subscribers" button is tapped.');
}

main();
