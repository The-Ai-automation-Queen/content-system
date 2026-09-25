#!/usr/bin/env node
import { readFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publication = JSON.parse(
  await readFile(path.join(root, "data", "guide-publication.json"), "utf8"),
);
const rebuildPlan = JSON.parse(
  await readFile(path.join(root, "data", "guide-rebuild-plan.json"), "utf8"),
);
const notReady = publication.approved.filter(
  (guide) => rebuildPlan.guides.find((item) => item.slug === guide.slug)?.status !== "approved",
);
if (notReady.length) {
  throw new Error(`Bulk publication stopped: ${notReady.length} guide pages remain in review or pending. Ship only individually approved rebuilt pages.`);
}

// The Next.js build uses content-hashed filenames. Remove the previous generated
// bundle before publishing so production contains one coherent asset set instead
// of a mixture of current and stale builds.
await rm(path.join(root, "main-site", "_next"), { recursive: true, force: true });

for (const guide of publication.approved.toSorted((a, b) => a.journeyOrder - b.journeyOrder)) {
  const result = spawnSync(
    process.execPath,
    [path.join(root, "tools", "publish-next-guide.mjs"), guide.slug],
    { cwd: root, stdio: "inherit" },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}
