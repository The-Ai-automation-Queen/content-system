// Direct batch processor - runs on VPS, skips Telegram, processes links directly
import "./config.mjs";
import { readFileSync, existsSync } from "fs";
import { extractYouTube } from "./extractors/youtube.mjs";
import { extractTweet } from "./extractors/twitter.mjs";
import { extractGitHub } from "./extractors/github.mjs";
import { extractArticle } from "./extractors/article.mjs";
import { analyzeContent } from "./analyzer.mjs";
import { buildNote } from "./note-builder.mjs";
import { saveAndPush } from "./git-sync.mjs";
import { config } from "./config.mjs";

const API = `https://api.telegram.org/bot${config.telegramToken}`;

async function notify(text) {
  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: config.chatId, text, parse_mode: "HTML" }),
  }).catch(() => {});
}

function detectLinkType(url) {
  if (url.includes("youtube.com/watch") || url.includes("youtu.be/") || url.includes("youtube.com/shorts/")) return "youtube";
  if (url.includes("twitter.com/") || url.includes("x.com/")) return "twitter";
  if (url.includes("github.com/")) return "github";
  return "article";
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Check which links already have notes
function isAlreadyProcessed(url) {
  // Simple check: look for URL in existing notes
  const repoPath = config.repoLocalPath;
  try {
    const files = readFileSync("/tmp/existing-urls.txt", "utf-8");
    return files.includes(url);
  } catch { return false; }
}

// Read all links
const links = readFileSync("/root/research-bot/batch-links.txt", "utf-8")
  .split("\n").map(l => l.trim()).filter(l => l.startsWith("http"));

// Build index of already-processed URLs
import { readdirSync } from "fs";
import { resolve } from "path";
const existingFiles = readdirSync(config.repoLocalPath).filter(f => f.endsWith(".md"));
let existingUrls = "";
for (const f of existingFiles) {
  try {
    const content = readFileSync(resolve(config.repoLocalPath, f), "utf-8");
    const urlMatch = content.match(/url: "(.+)"/);
    if (urlMatch) existingUrls += urlMatch[1] + "\n";
  } catch {}
}

const remaining = links.filter(url => !existingUrls.includes(url));
console.log(`Total links: ${links.length}, Already processed: ${links.length - remaining.length}, Remaining: ${remaining.length}`);

await notify(`<b>Batch processing started:</b> ${remaining.length} links remaining.`);

let processed = 0;
let failed = 0;

for (let i = 0; i < remaining.length; i++) {
  const url = remaining[i];
  const type = detectLinkType(url);

  console.log(`[${i + 1}/${remaining.length}] ${type}: ${url.slice(0, 70)}`);

  try {
    let extracted;
    switch (type) {
      case "youtube": extracted = await extractYouTube(url); break;
      case "twitter": extracted = await extractTweet(url); break;
      case "github": extracted = await extractGitHub(url); break;
      case "article": extracted = await extractArticle(url); break;
    }

    if (!extracted || !extracted.content) {
      console.log(`  SKIP: no content`);
      failed++;
      continue;
    }

    const analysis = await analyzeContent(extracted, type);
    const note = buildNote(extracted, analysis, type, url);
    const filePath = await saveAndPush(note, extracted.title, type);
    processed++;
    console.log(`  OK: ${filePath}`);
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
    failed++;
  }

  // Progress notification every 25
  if ((i + 1) % 25 === 0) {
    await notify(`<b>Batch progress:</b> ${processed} saved, ${failed} failed, ${remaining.length - i - 1} left.`);
  }

  // Rate limit: 3s between each
  if (i < remaining.length - 1) await sleep(3000);
}

await notify(`<b>Batch complete:</b> ${processed} saved, ${failed} failed out of ${remaining.length}.`);
console.log(`\nDone: ${processed} saved, ${failed} failed.`);
process.exit(0);
