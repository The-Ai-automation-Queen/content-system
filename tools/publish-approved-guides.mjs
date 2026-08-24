#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publication = JSON.parse(
  await readFile(path.join(root, "data", "guide-publication.json"), "utf8"),
);

for (const guide of publication.approved.toSorted((a, b) => a.journeyOrder - b.journeyOrder)) {
  const result = spawnSync(
    process.execPath,
    [path.join(root, "tools", "publish-next-guide.mjs"), guide.slug],
    { cwd: root, stdio: "inherit" },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}
