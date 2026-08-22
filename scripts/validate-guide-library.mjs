import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const guideDataPath = path.join(root, "next-app", "content", "guides.json");
const data = JSON.parse(readFileSync(guideDataPath, "utf8"));
const captureRegistry = JSON.parse(readFileSync(path.join(root, "main-site", "api", "guide-capture-registry.json"), "utf8"));
const guides = data.guides;
const errors = [];

const allowedLevels = new Set(["Beginner", "Intermediate", "Expert"]);
const allowedTracks = new Set(["understand", "create", "setup", "tools"]);
const allowedHubs = new Set([
  "AI essentials",
  "Better prompts and answers",
  "AI tools",
  "Content and creative work",
  "Workflows and automation",
  "AI agents",
  "Business operations",
]);
const allowedOutcomes = new Set([
  "Understand AI",
  "Choose an AI tool",
  "Get better answers",
  "Create content",
  "Automate a task",
  "Build an agent",
  "Run business operations",
]);
const requiredTools = ["chatgpt", "claude", "gemini", "copilot", "deepseek", "grok", "kimi", "manus", "meta-ai", "mistral"];

const slugs = new Set();
const sequences = new Set();
const representedHubs = new Set();
const representedOutcomes = new Set();

for (const guide of guides) {
  const label = guide.slug || "guide without a slug";
  if (!guide.slug || slugs.has(guide.slug)) errors.push(`${label}: slug is missing or duplicated.`);
  slugs.add(guide.slug);

  if (!Number.isInteger(guide.sequence) || sequences.has(guide.sequence)) errors.push(`${label}: sequence must be a unique integer.`);
  sequences.add(guide.sequence);

  if (guide.status !== "live") errors.push(`${label}: every guide in the current catalogue must remain live.`);
  if (!allowedTracks.has(guide.track)) errors.push(`${label}: invalid track ${guide.track}.`);
  if (!allowedLevels.has(guide.level)) errors.push(`${label}: invalid level ${guide.level}.`);
  if (!allowedHubs.has(guide.hub)) errors.push(`${label}: invalid hub ${guide.hub}.`);
  representedHubs.add(guide.hub);

  if (!Array.isArray(guide.outcomes) || guide.outcomes.length === 0) errors.push(`${label}: at least 1 outcome is required.`);
  for (const outcome of guide.outcomes || []) {
    if (!allowedOutcomes.has(outcome)) errors.push(`${label}: invalid outcome ${outcome}.`);
    representedOutcomes.add(outcome);
  }

  if (!guide.summary || guide.summary.trim().length < 30) errors.push(`${label}: add a useful outcome summary.`);
  if (!Array.isArray(guide.tags) || guide.tags.length < 2) errors.push(`${label}: add useful search tags.`);

  const readerCopy = [guide.title, guide.h1, guide.summary, ...(guide.outcomes || []), ...(guide.tags || [])].join(" ");
  if (readerCopy.includes("—")) errors.push(`${label}: reader-facing catalogue copy contains an em dash.`);

  if (!guide.cover?.startsWith("/")) {
    errors.push(`${label}: cover must use a root-relative path.`);
  } else if (!existsSync(path.join(root, "next-app", "public", guide.cover.slice(1)))) {
    errors.push(`${label}: cover does not exist at ${guide.cover}.`);
  }
}

for (const hub of allowedHubs) {
  if (!representedHubs.has(hub)) errors.push(`Public hub is not represented: ${hub}.`);
}
for (const outcome of allowedOutcomes) {
  if (!representedOutcomes.has(outcome)) errors.push(`Public outcome is not represented: ${outcome}.`);
}
for (const slug of requiredTools) {
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) errors.push(`Required tool guide is missing: ${slug}.`);
  else if (guide.status !== "live" || guide.hub !== "AI tools") errors.push(`Required tool guide is not live in AI tools: ${slug}.`);
}

const structuredGuideDirectory = path.join(root, "next-app", "content", "guides");
for (const filename of readdirSync(structuredGuideDirectory).filter((name) => name.endsWith(".ts"))) {
  const source = readFileSync(path.join(structuredGuideDirectory, filename), "utf8");
  if (!source.includes("capture:")) continue;

  const readLiteral = (field) => source.match(new RegExp(`${field}:\\s*\"([^\"]+)\"`))?.[1];
  const slug = readLiteral("slug");
  const guideSlug = readLiteral("guideSlug");
  const guideId = readLiteral("guideId");
  const lumailTag = readLiteral("lumailTag");
  const downloadHref = readLiteral("downloadHref");
  const capture = captureRegistry.guides[slug];

  if (!capture) {
    errors.push(`${filename}: no guide capture registry entry exists for ${slug || "the declared guide"}.`);
    continue;
  }
  if (guideSlug !== slug) errors.push(`${filename}: guideSlug must match the guide slug.`);
  if (guideId !== capture.guideId) errors.push(`${filename}: guideId does not match the capture registry.`);
  if (lumailTag !== capture.lumailTag) errors.push(`${filename}: Lumail tag does not match the capture registry.`);
  if (downloadHref !== `/downloads/${capture.deliverable.file}`) {
    errors.push(`${filename}: download path does not match the capture registry.`);
  }
  if (!capture.active) {
    errors.push(`${filename}: the visible capture CTA points to an inactive registry entry.`);
  }
  if (!existsSync(path.join(root, "next-app", "public", "downloads", capture.deliverable.file))) {
    errors.push(`${filename}: the capture deliverable is missing from next-app/public/downloads.`);
  }
}

const siteHeader = readFileSync(path.join(root, "next-app", "components", "chrome", "site-header.tsx"), "utf8");
if (siteHeader.includes("The 99")) errors.push("The 99 remains in the shared Next.js guide navigation.");

const sitemap = readFileSync(path.join(root, "main-site", "sitemap.xml"), "utf8");
const sitemapGuideUrls = new Set(
  Array.from(sitemap.matchAll(/<loc>https:\/\/www\.shiftandlead\.com(\/guides\/[^<]*)<\/loc>/g), (match) => match[1]),
);
const expectedSitemapGuideUrls = new Set([
  "/guides/",
  ...guides.map((guide) => `/guides/${guide.slug}.html`),
]);
for (const url of expectedSitemapGuideUrls) {
  if (!sitemapGuideUrls.has(url)) errors.push(`Sitemap is missing the live guide URL: ${url}.`);
}
for (const url of sitemapGuideUrls) {
  if (!expectedSitemapGuideUrls.has(url)) errors.push(`Sitemap contains an obsolete guide URL: ${url}.`);
}

const llmsText = readFileSync(path.join(root, "main-site", "llms.txt"), "utf8");
if (llmsText.includes("Public AI build log, The 99")) errors.push("The 99 remains promoted in llms.txt.");
for (const hub of allowedHubs) {
  if (!llmsText.toLocaleLowerCase().includes(hub.toLocaleLowerCase())) {
    errors.push(`llms.txt does not describe the public hub: ${hub}.`);
  }
}

const legacyGuideData = JSON.parse(readFileSync(path.join(root, "data", "guides.json"), "utf8"));
for (const slug of requiredTools) {
  const legacyTool = legacyGuideData.guides.find((guide) => guide.slug === slug);
  if (legacyTool?.status === "demoted") {
    errors.push(`Legacy guide data still demotes the required tool guide: ${slug}.`);
  }
}

const retiredToolVerdicts = readFileSync(path.join(root, "main-site", "guides", "tool-verdicts.html"), "utf8");
if (!/http-equiv="refresh"[^>]+which-ai-tool-for-what\.html/i.test(retiredToolVerdicts)) {
  errors.push("The obsolete tool-verdicts page is not retired to the current AI tools hub.");
}
if (!/rel="canonical" href="https:\/\/www\.shiftandlead\.com\/guides\/which-ai-tool-for-what\.html"/i.test(retiredToolVerdicts)) {
  errors.push("The obsolete tool-verdicts page does not canonicalize to the current AI tools hub.");
}
const vercelConfig = JSON.parse(readFileSync(path.join(root, "main-site", "vercel.json"), "utf8"));
const toolVerdictsRedirect = vercelConfig.redirects?.find(
  (redirect) => redirect.source === "/guides/tool-verdicts.html",
);
if (
  !toolVerdictsRedirect ||
  toolVerdictsRedirect.destination !== "/guides/which-ai-tool-for-what.html" ||
  toolVerdictsRedirect.permanent !== true
) {
  errors.push("Vercel is missing the permanent tool-verdicts redirect to the current AI tools hub.");
}

if (errors.length > 0) {
  console.error(`Guide library validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Guide library validation passed for ${guides.length} guides, ${allowedHubs.size} hubs and ${requiredTools.length} required tool guides.`);
