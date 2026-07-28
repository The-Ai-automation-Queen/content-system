import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import simpleGit from "simple-git";
import { config } from "./config.mjs";

function sanitizeFilename(title) {
  return title
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80)
    .toLowerCase()
    .replace(/-+$/, "");
}

export async function saveAndPush(noteContent, title, type) {
  const repoPath = config.repoLocalPath;
  if (!existsSync(repoPath)) {
    throw new Error(`Repo not cloned at ${repoPath}. Run: git clone <repo-url> ${repoPath}`);
  }

  const git = simpleGit(repoPath);

  try { await git.pull("origin", "main"); } catch {}

  const now = new Date();
  const dateStr = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const safeName = sanitizeFilename(title);
  const fileName = `${dateStr}-${type}-${safeName}.md`;
  const filePath = resolve(repoPath, fileName);

  writeFileSync(filePath, noteContent, "utf-8");

  await git.add(fileName);
  await git.commit(`research: ${type} — ${title.slice(0, 60)}`);

  try {
    await git.push("origin", "main");
  } catch (err) {
    console.error("Git push failed:", err.message);
  }

  return fileName;
}
