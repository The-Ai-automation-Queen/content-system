#!/usr/bin/env node
// Work through the approved guide-rebuild queue without publishing unreviewed copy.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const planPath = path.join(root, "data", "guide-rebuild-plan.json");
const promptPath = path.join(root, "docs", "guide-library-rebuild-agent-prompt.md");
const readPlan = () => JSON.parse(fs.readFileSync(planPath, "utf8"));
const plan = readPlan();
const pending = plan.guides.filter((guide) => guide.status === "pending");
const args = process.argv.slice(2);
const command = args[0] ?? "--next";
const requestedSlug = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : undefined;
const limitArg = args.includes("--limit") ? args[args.indexOf("--limit") + 1] : undefined;
const limit = limitArg === undefined ? (command === "--loop" ? pending.length : 1) : Number(limitArg);

if (!Number.isInteger(limit) || limit < 1) {
  console.error("--limit must be a positive whole number.");
  process.exit(2);
}
if (requestedSlug && !pending.some((guide) => guide.slug === requestedSlug)) {
  console.error(`Not a pending guide: ${requestedSlug}`);
  process.exit(2);
}
if (!["--next", "--run-one", "--loop"].includes(command)) {
  console.error("Usage: node tools/guide-rebuild-loop.mjs [--next|--run-one|--loop] [--slug slug] [--limit n]");
  process.exit(2);
}

const source = fs.readFileSync(promptPath, "utf8");
const basePrompt = source.match(/```text\n([\s\S]*?)\n```/)?.[1];
if (!basePrompt) throw new Error("Full-library guide prompt is missing.");

function promptFor(guide) {
  const scopedPrompt = basePrompt
    .replace("Rebuild the Shift & Lead guide library in this Next.js repository. Continue through all approved guides,", `Rebuild only the Shift & Lead guide ${guide.slug} in this Next.js repository,`)
    .replace("For each guide in the plan, one at a time:", `For ${guide.slug}:`);
  return `${scopedPrompt}\n\nTHIS RUN IS LIMITED TO ONE GUIDE: ${guide.slug}. Its interaction pattern is ${guide.pattern}, but adapt that pattern to the actual reader task. Audit the existing page and prior corrections, then build its specific interactive Next.js page and compact inline Lumail form after useful teaching, before any complete copyable prompt. Keep production directions out of visible copy and emails. Use both approved visual references. Keep the slug and its existing guide-specific Lumail tag. Run the required checks. Change only this guide's plan status from pending to review after it is ready for Fatiha to inspect. Do not approve it, publish it, alter another guide, or update its Notion publication status in this run. Report the preview URL, practical reader outcome, corrections made, checks passed, and any unresolved product fact. Stop if a user decision is genuinely needed.\n`;
}

if (command === "--next") {
  const guide = requestedSlug ? pending.find((item) => item.slug === requestedSlug) : pending[0];
  if (!guide) {
    console.log("No pending guides remain.");
    process.exit(0);
  }
  console.log(`Next guide: ${guide.slug} (${guide.pattern}); ${pending.length} pending.`);
  console.log(promptFor(guide));
  process.exit(0);
}

const selected = requestedSlug ? [pending.find((item) => item.slug === requestedSlug)] : pending.slice(0, limit);
if (!selected.length) {
  console.log("No pending guides remain.");
  process.exit(0);
}

for (const guide of selected) {
  console.log(`\nRebuilding ${guide.slug} (${guide.pattern})`);
  const result = spawnSync("codex", ["exec", "-C", root, "-"], {
    cwd: root,
    input: promptFor(guide),
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (result.error || result.status !== 0) {
    console.error(`Stopped at ${guide.slug}: Codex exited ${result.status ?? result.error?.message}.`);
    process.exit(result.status || 1);
  }
  const current = readPlan().guides.find((item) => item.slug === guide.slug);
  if (current?.status !== "review") {
    console.error(`Stopped at ${guide.slug}: its plan status is ${current?.status ?? "missing"}, not review.`);
    process.exit(1);
  }
  const check = spawnSync(process.execPath, [path.join(root, "tools", "guide-rebuild-harness.mjs"), "--slug", guide.slug], {
    cwd: root,
    stdio: "inherit",
  });
  if (check.error || check.status !== 0) {
    console.error(`Stopped at ${guide.slug}: guide harness failed.`);
    process.exit(check.status || 1);
  }
  console.log(`${guide.slug} is ready for review. It has not been published.`);
  if (command === "--run-one") break;
}
