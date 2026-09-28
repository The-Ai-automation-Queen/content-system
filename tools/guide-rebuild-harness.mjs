#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fromRoot = (...parts) => path.join(root, ...parts);
const read = (...parts) => fs.readFileSync(fromRoot(...parts), "utf8");
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const json = args.has("--json");
const live = args.has("--live");
const slugIndex = process.argv.indexOf("--slug");
const onlySlug = slugIndex >= 0 ? process.argv[slugIndex + 1] : undefined;

const publication = JSON.parse(read("data", "guide-publication.json"));
const plan = JSON.parse(read("data", "guide-rebuild-plan.json"));
const inventory = JSON.parse(read("next-app", "content", "guides.json")).guides;
const approved = publication.approved;
const approvedSlugs = new Set(approved.map(({ slug }) => slug));
const plannedSlugs = new Set(plan.guides.map(({ slug }) => slug));
const inventoryBySlug = new Map(inventory.map((guide) => [guide.slug, guide]));
const planBySlug = new Map(plan.guides.map((guide) => [guide.slug, guide]));
const globalProblems = [];

if (plan.schemaVersion !== 1) globalProblems.push("Unsupported rebuild plan schema.");
if (!Array.isArray(plan.formatReferences) || !["instagram-content-dashboard", "what-is-ai"].every((slug) => plan.formatReferences.includes(slug))) {
  globalProblems.push("Both approved guide format references must remain in the rebuild plan.");
}
for (const name of ["README.md", "instagram-dashboard-desktop.jpg", "instagram-dashboard-mobile.jpg", "instagram-dashboard-email-popup.jpg", "what-is-ai-desktop.jpg", "what-is-ai-mobile.jpg", "what-is-ai-check-diagram.jpg", "what-is-ai-email-popup.jpg", "what-is-ai-email-popup-mobile.jpg"]) {
  if (!fs.existsSync(fromRoot("docs", "guide-reference", name))) globalProblems.push(`Guide format reference missing: ${name}`);
}
if (plannedSlugs.size !== plan.guides.length) globalProblems.push("Duplicate slug in rebuild plan.");
for (const slug of approvedSlugs) if (!plannedSlugs.has(slug)) globalProblems.push(`Approved guide missing from rebuild plan: ${slug}`);
for (const { slug, status } of plan.guides) {
  if (!approvedSlugs.has(slug) && !["review", "pending"].includes(status)) {
    globalProblems.push(`Unapproved guide has an invalid rebuild status: ${slug}`);
  }
}
if (onlySlug && !approvedSlugs.has(onlySlug)) globalProblems.push(`Unknown approved guide: ${onlySlug}`);

const iconSource = read("next-app", "components", "guides", "guide-icon.tsx");
if (iconSource.includes("m4 6 6 6-6 6 M13 18h7")) globalProblems.push("Old >_ prompt icon is still in the shared GuideIcon component.");
const accessBoundarySource = read("next-app", "components", "guides", "guide-access-boundary.tsx");
const accessBoundaryCss = read("next-app", "components", "guides", "guide-reading-page.module.css");
if (/variant\s*===\s*["']entry["']|captureEntryTransition|role=["']dialog["']/.test(accessBoundarySource + accessBoundaryCss)) {
  globalProblems.push("The former opening popup path still exists in the shared guide access component.");
}

const guideComponents = fromRoot("next-app", "components", "guides");
for (const filename of fs.readdirSync(guideComponents)) {
  const source = fs.readFileSync(path.join(guideComponents, filename), "utf8");
  if (filename.endsWith(".tsx")) {
    for (const [, opening, body] of source.matchAll(/(<details\b[^>]*>)([\s\S]*?)<\/details>/g)) {
      if (/(?:<pre\b|<CopyPrompt\b)/.test(body) && !/\bopen\b/.test(opening)) {
        globalProblems.push(`Copyable instruction starts collapsed: ${filename}`);
      }
    }
  }
  if (filename.endsWith(".module.css")) {
    for (const [, selector, rules] of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (/prompt/i.test(selector) && /\bpre\b/.test(selector) && /max-height\s*:/.test(rules)) {
        globalProblems.push(`Copyable instruction has an inner height limit: ${filename}`);
      }
    }
  }
}

const footerSource = read("next-app", "components", "chrome", "site-footer.tsx");
const footerLinks = [...footerSource.matchAll(/\["[^"]+",\s*"([^"]+)"\]/g)].map((match) => match[1]);
const footerPaths = footerLinks.map((href) => {
  if (href.startsWith("/")) return href;
  const url = new URL(href);
  return url.hostname === "www.shiftandlead.com" ? url.pathname : href;
});
if (footerPaths.length !== 8 || new Set(footerPaths).size !== footerPaths.length) {
  globalProblems.push(`Expected 8 unique footer links; found ${footerPaths.length}.`);
}
for (const href of footerPaths) {
  const target = href.endsWith("/") ? `${href}index.html` : href;
  if (!fs.existsSync(fromRoot("main-site", target.replace(/^\//, "")))) {
    globalProblems.push(`Footer target is missing from the deployable site: ${href}`);
  }
}

// Load the actual TypeScript guide records. This catches omissions that a source-text search misses.
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "shift-guide-harness-"));
let guidePages;
try {
  execFileSync(process.execPath, [
    fromRoot("next-app", "node_modules", "typescript", "bin", "tsc"),
    "--module", "commonjs", "--target", "es2022", "--resolveJsonModule",
    "--esModuleInterop", "--skipLibCheck", "--outDir", temp,
    fromRoot("next-app", "content", "guide-page.ts"),
  ], { cwd: root, stdio: "pipe" });
  guidePages = createRequire(import.meta.url)(path.join(temp, "guide-page.js")).guidePages;
} catch (error) {
  console.error("Could not load the guide content model. Build the Next.js app first.");
  console.error(error.stderr?.toString() || error.message);
  process.exit(1);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

const pagesBySlug = new Map(guidePages.map((guide) => [guide.slug, guide]));
const routeSource = read("next-app", "app", "guides", "[slug]", "page.tsx");
const legacySource = read("next-app", "content", "legacy-guide-slugs.ts");
const legacySlugs = new Set([...legacySource.matchAll(/^\s*"([a-z0-9-]+)",?$/gm)].map((match) => match[1]));
const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;
function instructions(guide) {
  return [
    guide.tryNow?.prompt,
    ...(guide.tutorial ?? []).flatMap((section) => [section.prompt, ...(section.blocks ?? []).filter((block) => block.kind === "code").map((block) => block.text)]),
    ...(guide.series?.tasks ?? []).map((task) => task.prompt),
    guide.series?.instructions,
  ].filter((text) => typeof text === "string" && text.trim());
}

const rows = [];
for (const { slug, lumailTag } of approved) {
  if (onlySlug && slug !== onlySlug) continue;
  const item = planBySlug.get(slug);
  const guide = pagesBySlug.get(slug);
  const meta = inventoryBySlug.get(slug);
  const problems = [];
  if (!item) continue;
  if (!guide) problems.push("Structured Next.js content missing");
  if (!meta) problems.push("Library inventory missing");
  if (!/^(pending|review|approved)$/.test(item.status)) problems.push("Invalid migration status");
  if (!/^(explorer|glossary|decision|walkthrough|prompt-builder|practice|audit|agent-assisted)$/.test(item.pattern)) problems.push("Unknown interaction pattern");
  if (guide) {
    if (guide.lumailTag !== lumailTag) problems.push("Lumail tag differs from publication registry");
    if (!guide.title || !guide.promise || !guide.answer?.paragraphs?.length) problems.push("Title, promise or opening answer missing");
    if (!guide.coverAlt || !guide.cover.endsWith(".webp")) problems.push("Descriptive WebP cover missing");
    if (!fs.existsSync(fromRoot("next-app", "public", guide.cover.replace(/^\//, "")))) problems.push("Cover file missing");
    if (!Array.isArray(guide.related) || guide.related.length !== 3) problems.push("Exactly 3 next guides required");
    for (const link of guide.related ?? []) {
      if (!link.cover || !fs.existsSync(fromRoot("next-app", "public", link.cover.replace(/^\//, "")))) problems.push(`Related cover missing: ${link.slug}`);
    }
    if (!instructions(guide).length) problems.push("No complete copyable instruction found");
  }

  if (item.status !== "pending" && guide) {
    if (!item.component) problems.push("Dedicated or approved configurable component not recorded");
    const componentPath = fromRoot("next-app", "components", "guides", `${item.component}.tsx`);
    const stylePath = fromRoot("next-app", "components", "guides", `${item.component}.module.css`);
    const componentSource = fs.existsSync(componentPath) ? fs.readFileSync(componentPath, "utf8") : "";
    const stagedInlineForm = componentSource.includes("<GuideAccessBoundary") && componentSource.includes('variant="unlock"');
    if (!item.component || !fs.existsSync(componentPath)) problems.push("Interactive page component missing");
    if (!item.component || !fs.existsSync(stylePath)) problems.push("Page-specific design CSS missing");
    if (legacySlugs.has(slug)) problems.push("Still present in legacy renderer allowlist");
    if (!routeSource.includes(`slug === "${slug}"`)) problems.push("Dedicated route branch missing");
    if (!routeSource.includes(`from "@/components/guides/${item.component}"`)) problems.push("Route does not import recorded component");

    if (fs.existsSync(stylePath)) {
      const css = fs.readFileSync(stylePath, "utf8");
      if (/var\(--cream\)|#faf7f2\b/i.test(css)) problems.push("Cream styling remains in rebuilt page");
      if (/border-(?:left|inline-start)\s*:\s*(?:[2-9]|\d{2,})px\b/i.test(css)) problems.push("Decorative left-edge accent remains in rebuilt page");
      if (/white-space:\s*pre-line|\.page\s+p\s+strong\s*\{\s*display:\s*block/i.test(css)) problems.push("Forced prose line breaks remain");
      if (slug !== plan.reference && !/#ff5733|--guide-heading-accent/i.test(css)) problems.push("Orange section-heading accent missing");
    }
    if (/<br\s*\/?\s*>/i.test(componentSource)) problems.push("Manual JSX line break remains");

    const htmlPath = fromRoot("next-app", "out", "guides", slug, "index.html");
    if (!fs.existsSync(htmlPath)) problems.push("Built guide HTML missing; run npm --prefix next-app run build");
    else {
      const html = fs.readFileSync(htmlPath, "utf8");
      const publicHtml = html.replace(/<(?:script|style|noscript)\b[^>]*>[\s\S]*?<\/(?:script|style|noscript)>/gi, " ");
      if (/\b(?:review mode|approved and unpublished|internal note|editorial note|placeholder copy|draft guide)\b/i.test(publicHtml)) {
        problems.push("Internal production wording appears in reader-facing copy");
      }
      if (!html.includes("data-guide-capture-boundary") && !stagedInlineForm) problems.push("Inline email form missing");
      if (html.includes("captureEntryTransition") || html.includes('role="dialog"') || html.includes("Free practical guide")) {
        problems.push("Old pre-guide popup still rendered");
      }
      for (const field of ['name="firstName"', 'name="email"', 'name="marketingConsent"']) {
        if (!html.includes(field) && !stagedInlineForm) problems.push(`Gate field missing: ${field}`);
      }
      if (html.includes("guide-reading-page_page") || html.includes("data-guide-preview")) problems.push("Old static reading layout still rendered");
      if (!html.includes(guide.cover)) problems.push("Topic-specific cover not rendered");
      const renderedGuideLinks = new Set([...publicHtml.matchAll(/href="\/guides\/([a-z0-9-]+)\/?(?:\?[^\"]*)?"/g)].map((match) => match[1]));
      if (renderedGuideLinks.size < 3) problems.push("Fewer than 3 working guide links rendered");
      if (item.status === "approved") {
        for (const linkedSlug of renderedGuideLinks) {
          if (!approvedSlugs.has(linkedSlug)) problems.push(`Rendered link points to an unpublished guide: ${linkedSlug}`);
        }
      }
      if (slug !== plan.reference && html.includes("What do you want to do next?")) problems.push("Generic next-guide heading remains");
      if (!html.includes("Copy")) problems.push("Copyable instruction control missing");
      if (!html.includes("guide-gated-content") && !stagedInlineForm) problems.push("Guide body not protected behind email capture");
      if (html.includes("m4 6 6 6-6 6 M13 18h7")) problems.push("Old >_ icon remains in built HTML");
      const visibleText = publicHtml
        .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ");
      if (/review mode|approved and unpublished|internal (?:note|instruction)|production (?:note|instruction)|instructions? (?:for|to) the (?:site team|editor|builder)|do not publish/i.test(visibleText)) {
        problems.push("Internal production language appears in reader-facing copy");
      }
    }
  }

  rows.push({ slug, level: meta?.level ?? "missing", pattern: item.pattern, status: item.status,
    instructionWords: guide ? Math.max(0, ...instructions(guide).map(wordCount)) : 0, problems });
}

if (live) {
  const liveResults = await Promise.all(footerPaths.map(async (href) => {
    try {
      const response = await fetch(`https://www.shiftandlead.com${href}`, { redirect: "follow", signal: AbortSignal.timeout(12000) });
      return { href, status: response.status, url: response.url };
    } catch (error) {
      return { href, status: "error", error: error.message };
    }
  }));
  for (const result of liveResults) if (result.status !== 200) globalProblems.push(`Live footer link failed: ${result.href} (${result.status})`);
  if (!json) for (const result of liveResults) console.log(`Footer ${result.status}: ${result.href}`);
}

const pending = plan.guides.filter((guide) => guide.status === "pending").length;
const review = plan.guides.filter((guide) => guide.status === "review").length;
const approvedCount = plan.guides.filter((guide) => guide.status === "approved").length;
const problemCount = globalProblems.length + rows.reduce((sum, row) => sum + row.problems.length, 0);
const result = { summary: { total: plan.guides.length, approved: approvedCount, review, pending, checkedApproved: rows.length, problems: problemCount }, globalProblems, guides: rows };
if (json) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`Guide rebuild: ${approvedCount} approved, ${review} in review, ${pending} pending; ${rows.length} approved guide${rows.length === 1 ? "" : "s"} checked, ${problemCount} check failures.`);
  for (const problem of globalProblems) console.log(`GLOBAL: ${problem}`);
  for (const row of rows) console.log(`${row.status.toUpperCase().padEnd(8)} ${row.slug} · ${row.pattern} · ${row.level} · longest instruction ${row.instructionWords} words${row.problems.length ? ` · ${row.problems.join("; ")}` : ""}`);
}
if (strict && (pending || review || problemCount)) process.exitCode = 1;
else if (globalProblems.length) process.exitCode = 1;
