import "./config.mjs";
import { getUpdates, sendMessage, sendProcessing } from "./telegram.mjs";
import { extractYouTube } from "./extractors/youtube.mjs";
import { extractTweet } from "./extractors/twitter.mjs";
import { extractGitHub } from "./extractors/github.mjs";
import { extractArticle } from "./extractors/article.mjs";
import { extractGoogleDoc } from "./extractors/gdocs.mjs";
import { analyzeContent } from "./analyzer.mjs";
import { buildNote } from "./note-builder.mjs";
import { saveAndPush } from "./git-sync.mjs";
import { config } from "./config.mjs";
import { formatTelegramReply } from "./reply-format.mjs";

// --- Queue system for batch processing ---
const queue = [];
let processing = false;
let processed = 0;
let failed = 0;
let batchTotal = 0;
let batchStartTime = 0;

function detectLinkType(text) {
  const url = text.match(/https?:\/\/[^\s]+/)?.[0];
  if (!url) {
    // Plain text with some substance (not just a word or emoji)
    if (text.trim().length >= 20) {
      return { type: "text", url: text.trim() };
    }
    return null;
  }
  if (url.includes("youtube.com/watch") || url.includes("youtu.be/") || url.includes("youtube.com/shorts/")) {
    return { type: "youtube", url };
  }
  if (url.includes("twitter.com/") || url.includes("x.com/") || url.includes("nitter.")) {
    return { type: "twitter", url };
  }
  if (url.includes("github.com/")) {
    return { type: "github", url };
  }
  if (url.includes("docs.google.com/document/")) {
    return { type: "gdocs", url };
  }
  return { type: "article", url };
}

async function processLink(link) {
  const { type, url } = link;
  let extracted;

  if (type === "text") {
    // Raw text pasted directly - skip extraction
    const firstLine = url.split("\n")[0].slice(0, 100).trim();
    extracted = {
      title: firstLine || "Pasted Note",
      content: url,
      metadata: { wordCount: url.split(/\s+/).length },
    };
  } else {
    switch (type) {
      case "youtube": extracted = await extractYouTube(url); break;
      case "twitter": extracted = await extractTweet(url); break;
      case "github": extracted = await extractGitHub(url); break;
      case "gdocs": extracted = await extractGoogleDoc(url); break;
      case "article": extracted = await extractArticle(url); break;
    }
    if (!extracted || !extracted.content) {
      return { error: `Could not extract content from ${type} link.` };
    }
  }

  const analysis = await analyzeContent(extracted, type);
  const note = buildNote(extracted, analysis, type, type === "text" ? "pasted-text" : url);
  const filePath = await saveAndPush(note, extracted.title, type);
  return { extracted, analysis, filePath };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function processQueue() {
  if (processing || queue.length === 0) return;
  processing = true;

  while (queue.length > 0) {
    const { link, position } = queue.shift();
    const remaining = queue.length;

    console.log(`Processing ${position}/${batchTotal}: ${link.type} - ${link.url}`);

    try {
      const result = await processLink(link);
      processed++;

      if (result.error) {
        failed++;
        await sendMessage(`[${processed}/${batchTotal}] Error: ${result.error}`);
      } else {
        const reply = formatTelegramReply(result.analysis, link.type, link.url, result.filePath);
        const progress = remaining > 0 ? `\n\n<i>[${processed}/${batchTotal} done, ${remaining} left]</i>` : `\n\n<i>[${processed}/${batchTotal} done]</i>`;
        await sendMessage(reply + progress);
      }
    } catch (err) {
      failed++;
      processed++;
      console.error("Processing error:", err);
      await sendMessage(`[${processed}/${batchTotal}] Error: ${link.url} - ${err.message}`);
    }

    // Rate limit: wait 3 seconds between each to stay within Groq free tier
    if (queue.length > 0) {
      await sleep(3000);
    }
  }

  // Batch complete summary
  if (batchTotal > 3) {
    const elapsed = Math.round((Date.now() - batchStartTime) / 60000);
    await sendMessage(`<b>Batch complete:</b> ${processed - failed} saved, ${failed} failed, ${elapsed} min total.`);
  }

  processing = false;
  processed = 0;
  failed = 0;
  batchTotal = 0;
}

console.log("Research bot started. Polling...");

setInterval(async () => {
  const updates = await getUpdates();

  for (const update of updates) {
    const msg = update.message;
    if (!msg || !msg.text) continue;
    if (String(msg.chat.id) !== String(config.chatId)) continue;

    if (msg.text === "/start") {
      await sendMessage("Research bot ready. Drop any link (YouTube, Twitter/X, GitHub, Google Docs, article) or paste plain text and I will extract and save it to the GitHub research inbox. Analysis may be pending; Obsidian imports separately while your Mac and app are running.\n\nBatch mode: forward as many links as you want, they will be queued and processed one by one.");
      continue;
    }
    if (msg.text === "/status") {
      const qLen = queue.length;
      if (processing) {
        await sendMessage(`Processing: ${processed}/${batchTotal} done, ${qLen} in queue.`);
      } else {
        await sendMessage("Bot is idle. Drop a link to process.");
      }
      continue;
    }

    const link = detectLinkType(msg.text);
    if (!link) continue; // Silently skip non-links during batch forwarding

    batchTotal++;
    queue.push({ link, position: batchTotal });

    // Only send "queued" message for first link in a batch
    if (batchTotal === 1) {
      batchStartTime = Date.now();
      await sendMessage(`Link queued. Processing...`);
    } else if (batchTotal % 50 === 0) {
      await sendMessage(`${batchTotal} links queued so far. Still receiving...`);
    }
  }

  // Start processing if there are items in queue
  processQueue();
}, 3000);
