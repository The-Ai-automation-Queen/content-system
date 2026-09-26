#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (name) => JSON.parse(fs.readFileSync(path.join(repo, name), "utf8"));
const approved = load("data/guide-publication.json").approved.map((item) => item.slug);
const edits = load("next-app/content/guide-editorial.json");
const lessons = load("next-app/content/guide-lessons.json");
const errors = [];
const sorted = (values) => [...values].sort().join("|");
if (sorted(approved) !== sorted(Object.keys(edits)) || sorted(approved) !== sorted(Object.keys(lessons))) {
  errors.push("Editorial patches and public lessons must match all 35 approved slugs exactly.");
}
for (const slug of approved) {
  const entry = edits[slug];
  const preview = lessons[slug];
  if (!entry || !preview) continue;
  if (!entry.edits?.length) errors.push(`${slug}: missing selective edits`);
  if (entry.verdict !== preview.verdict || JSON.stringify(entry.public_lesson) !== JSON.stringify(preview.public_lesson)) {
    errors.push(`${slug}: compact public lesson is out of sync with editorial source`);
  }
  if (new Set(entry.edits.map((edit) => edit.path)).size !== entry.edits.length) errors.push(`${slug}: duplicate edit path`);
  for (const edit of entry.edits) {
    if (typeof edit.old !== "string" || typeof edit.value !== "string" || !edit.value.trim()) errors.push(`${slug}: invalid edit ${edit.path}`);
    if (edit.value.includes("—")) errors.push(`${slug}: new copy contains an em dash at ${edit.path}`);
  }
  for (const key of ["heading", "lead", "practice", "check"]) {
    const value = preview.public_lesson?.[key];
    if (typeof value !== "string" || !value.trim()) errors.push(`${slug}: missing public ${key}`);
    if (value?.includes("—")) errors.push(`${slug}: public ${key} contains an em dash`);
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Guide editorial check passed: ${approved.length} selective patch sets, ${approved.length} open lessons, no new em dashes.`);
