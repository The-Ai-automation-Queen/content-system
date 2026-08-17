"""
pick.py — list READY notes from research-inbox, sort by relevance, dedupe vs library.

Usage:
    py pick.py                      # top 15 READY notes, table format
    py pick.py --top 25             # top N
    py pick.py --json               # machine-readable output
    py pick.py --lane Women_Entrepreneurs
    py pick.py --since 2026-04-15
"""
import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path

INBOX = Path(r"C:\Users\fatih\OneDrive\Obsidian Mind\research-inbox")
LIBRARY = Path(r"C:\Users\fatih\.claude\builds\outputs\content\vault")

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---", re.DOTALL)


def parse_frontmatter(text: str) -> dict:
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}
    data = {}
    for line in m.group(1).splitlines():
        if ":" not in line:
            continue
        k, _, v = line.partition(":")
        data[k.strip()] = v.strip().strip('"').strip("'")
    return data


def load_inbox_notes() -> list:
    notes = []
    for fp in INBOX.glob("*.md"):
        try:
            text = fp.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        fm = parse_frontmatter(text)
        if fm.get("status") != "READY":
            continue
        notes.append({
            "filename": fp.name,
            "path": str(fp),
            "title": _extract_title(text),
            "lane": fm.get("lane", ""),
            "relevance": _safe_int(fm.get("relevance", 0)),
            "source": fm.get("source", ""),
            "date": fm.get("date", ""),
            "url": fm.get("url", ""),
            "suggested_week": fm.get("suggested_week", ""),
            "vault_entry": fm.get("vault_entry", ""),
        })
    return notes


def _extract_title(text: str) -> str:
    body = FRONTMATTER_RE.sub("", text, count=1).strip()
    for line in body.splitlines():
        line = line.strip()
        if line.startswith("# "):
            return line[2:].strip()[:120]
    return ""


def _safe_int(v) -> int:
    try:
        return int(v)
    except (ValueError, TypeError):
        return 0


def already_in_library(note_filename: str) -> bool:
    """Check if any vault file references this note as source_note."""
    for fp in LIBRARY.rglob("*.md"):
        if "_archive" in fp.parts:
            continue
        try:
            text = fp.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        if note_filename in text:
            return True
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--top", type=int, default=15)
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--lane", type=str, default=None)
    ap.add_argument("--since", type=str, default=None)
    ap.add_argument("--skip-dedupe", action="store_true")
    args = ap.parse_args()

    notes = load_inbox_notes()

    if args.lane:
        notes = [n for n in notes if args.lane.lower() in n["lane"].lower()]
    if args.since:
        notes = [n for n in notes if n["date"] >= args.since]

    notes.sort(key=lambda n: (-n["relevance"], n["date"]), reverse=False)
    notes.sort(key=lambda n: -n["relevance"])

    if not args.skip_dedupe:
        for n in notes:
            n["already_used"] = already_in_library(n["filename"])
        notes = [n for n in notes if not n["already_used"]]

    notes = notes[: args.top]

    if args.json:
        print(json.dumps(notes, indent=2, ensure_ascii=False))
        return

    print(f"\nTop {len(notes)} READY notes from research-inbox\n")
    print(f"{'#':>2}  {'Score':>5}  {'Lane':<22}  {'Date':<10}  Title")
    print("-" * 110)
    for i, n in enumerate(notes, 1):
        title = n["title"][:60] or n["filename"][:60]
        print(f"{i:>2}  {n['relevance']:>5}  {n['lane'][:22]:<22}  {n['date']:<10}  {title}")
    print()


if __name__ == "__main__":
    main()
