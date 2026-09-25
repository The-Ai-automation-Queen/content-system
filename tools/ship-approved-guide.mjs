#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  throw new Error("Usage: npm run guide:ship -- <approved-guide-slug>");
}

const root = process.cwd();
const publication = JSON.parse(
  await readFile(path.join(root, "data", "guide-publication.json"), "utf8"),
);
const rebuildPlan = JSON.parse(
  await readFile(path.join(root, "data", "guide-rebuild-plan.json"), "utf8"),
);

if (!publication.approved.some((guide) => guide.slug === slug) || rebuildPlan.guides.find((guide) => guide.slug === slug)?.status !== "approved") {
  throw new Error(`Refusing to ship unapproved guide: ${slug}`);
}

const run = (command, args) => {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run("npm", ["--prefix", "next-app", "run", "build"]);
run(process.execPath, [path.join(root, "tools", "publish-next-guide.mjs"), slug]);
run("npm", ["run", "validate:guides"]);
run(process.execPath, [path.join(root, "tools", "guide-rebuild-harness.mjs"), "--slug", slug]);

console.log(`Guide ready: http://127.0.0.1:4197/guides/${slug}/?review=1`);
