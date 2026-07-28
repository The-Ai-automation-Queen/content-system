import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const envPath = resolve(
    process.env.HOME || process.env.USERPROFILE,
    "research-bot",
    ".env"
  );
  let envText;
  try {
    envText = readFileSync(envPath, "utf-8");
  } catch {
    const fallback = process.env.RESEARCH_ENV || "/root/research-bot/.env";
    envText = readFileSync(fallback, "utf-8");
  }
  for (const line of envText.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] = process.env[key] || val;
  }
}

loadEnv();

export const config = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  chatId: process.env.TELEGRAM_CHAT_ID,
  groqKey: process.env.GROQ_API_KEY,
  anthropicKey: process.env.ANTHROPIC_API_KEY,
  supadataKey: process.env.SUPADATA_API_KEY,
  githubToken: process.env.GITHUB_TOKEN,
  githubRepo: process.env.GITHUB_REPO,
  birdCookiePath: process.env.BIRD_COOKIE_PATH || "/root/bird-cookies.json",
  repoLocalPath: process.env.REPO_LOCAL_PATH || "/root/research-inbox",
  // FREE-FIRST GATE. The paid Anthropic (Haiku) fallback is OFF by default.
  // It is only ever attempted when RESEARCH_ALLOW_PAID=1 is set in .env.
  // This prevents a free-tier outage (Agent OS + Groq down) from silently
  // draining the metered sk-ant- key on every link.
  allowPaid: process.env.RESEARCH_ALLOW_PAID === "1",
};
