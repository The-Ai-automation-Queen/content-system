// setup-kit.mjs — One-time Kit (ConvertKit) setup for newsletter tags
// Creates "daily-brief" and "weekly-brief" tags + "frequency" custom field
// Run once: node setup-kit.mjs
//
// Requires KIT_API_SECRET in your .env file
// Get it from: Kit dashboard > Settings > Advanced > API Secret

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv(filePath) {
  if (!existsSync(filePath)) return {};
  var lines = readFileSync(filePath, 'utf-8').split('\n');
  var env = {};
  lines.forEach(function (line) {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    var eqIndex = line.indexOf('=');
    if (eqIndex === -1) return;
    var key = line.substring(0, eqIndex).trim();
    var val = line.substring(eqIndex + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  });
  return env;
}

async function main() {
  console.log('========================================');
  console.log('  Kit Newsletter Setup');
  console.log('========================================\n');

  // Load env
  var envPaths = [
    process.env.ENV_PATH,
    '/root/ai-insider-brief-pipeline/.env',
    'C:\\Secrets\\insider-brief.env',
    resolve(__dirname, 'config.env')
  ].filter(Boolean);

  var env = {};
  for (var p of envPaths) {
    if (existsSync(p)) {
      env = loadEnv(p);
      console.log('[CONFIG] Loaded from: ' + p);
      break;
    }
  }

  var apiSecret = env.KIT_API_SECRET || process.env.KIT_API_SECRET;
  if (!apiSecret) {
    console.error('\n[ERROR] KIT_API_SECRET not found.');
    console.error('Steps:');
    console.error('  1. Go to Kit dashboard > Settings > Advanced');
    console.error('  2. Copy your API Secret');
    console.error('  3. Add KIT_API_SECRET=your_secret to your .env file');
    process.exit(1);
  }

  // Step 1: Create tags
  console.log('\n--- Creating tags ---\n');

  var tags = ['daily-brief', 'weekly-brief'];
  var tagIds = {};

  for (var tagName of tags) {
    try {
      var res = await fetch('https://api.convertkit.com/v3/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_secret: apiSecret,
          tag: { name: tagName }
        })
      });

      if (!res.ok) {
        var errText = await res.text();
        // Check if tag already exists
        if (errText.includes('already') || res.status === 422) {
          console.log('[EXISTS] Tag "' + tagName + '" already exists. Fetching ID...');
          // List all tags to find it
          var listRes = await fetch('https://api.convertkit.com/v3/tags?api_secret=' + apiSecret);
          var listData = await listRes.json();
          var existing = listData.tags.find(function (t) { return t.name === tagName; });
          if (existing) {
            tagIds[tagName] = existing.id;
            console.log('[FOUND] ' + tagName + ' → ID: ' + existing.id);
          }
          continue;
        }
        throw new Error('Failed to create tag: ' + errText);
      }

      var data = await res.json();
      tagIds[tagName] = data.tag.id;
      console.log('[CREATED] ' + tagName + ' → ID: ' + data.tag.id);
    } catch (err) {
      console.error('[ERROR] ' + tagName + ': ' + err.message);
    }
  }

  // Step 2: Create custom field "frequency"
  console.log('\n--- Creating custom field ---\n');

  try {
    var fieldRes = await fetch('https://api.convertkit.com/v3/custom_fields', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: apiSecret,
        label: 'frequency'
      })
    });

    if (fieldRes.ok) {
      console.log('[CREATED] Custom field "frequency"');
    } else {
      var fieldErr = await fieldRes.text();
      if (fieldErr.includes('already') || fieldRes.status === 422) {
        console.log('[EXISTS] Custom field "frequency" already exists');
      } else {
        console.error('[ERROR] Could not create field: ' + fieldErr);
      }
    }
  } catch (err) {
    console.error('[ERROR] Custom field: ' + err.message);
  }

  // Step 3: Output results
  console.log('\n========================================');
  console.log('  SETUP COMPLETE');
  console.log('========================================\n');

  if (tagIds['daily-brief']) {
    console.log('  KIT_DAILY_TAG_ID=' + tagIds['daily-brief']);
  }
  if (tagIds['weekly-brief']) {
    console.log('  KIT_WEEKLY_TAG_ID=' + tagIds['weekly-brief']);
  }

  console.log('\nAdd these to your .env file on the VPS.');
  console.log('Then the newsletter sender can target the right subscribers.\n');

  // Also update the frontend to tag subscribers on signup
  console.log('FRONTEND NOTE:');
  console.log('The frontend sends a "frequency" custom field with each subscription.');
  console.log('Set up a Kit automation rule:');
  console.log('  IF frequency = "daily"  → add tag "daily-brief"');
  console.log('  IF frequency = "weekly" → add tag "weekly-brief"');
  console.log('  Do this in Kit > Automations > Rules\n');
}

main().catch(function (err) {
  console.error('[FATAL] ' + err.message);
  process.exit(1);
});
