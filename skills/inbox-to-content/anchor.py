"""
anchor.py — pull inbox notes as RECEIPTS for a topic the user is writing about.

Inverted from pick.py: user drives the topic, script returns supporting evidence.

Usage:
    py anchor.py "data privacy"
    py anchor.py "AI literacy" --top 8
    py anchor.py "agent risk" --lane Corporate_Teams --since 2026-04-01
    py anchor.py "computer use" --json
"""
import argparse
import json
import re
import sys
from pathlib import Path

INBOX = Path(r"C:\Users\fatih\OneDrive\Obsidian Mind\research-inbox")

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


def _safe_int(v) -> int:
    try:
        return int(v)
    except (ValueError, TypeError):
        return 0


def score_relevance(text: str, fm: dict, keywords: list) -> tuple:
    """Return (score, hits_per_keyword). Higher = better match."""
    body = FRONTMATTER_RE.sub("", text, count=1).lower()
    title = ""
    for line in body.splitlines():
        if line.startswith("# "):
            title = line[2:].lower()
            break

    hits = {}
    score = 0
    for kw in keywords:
        kw_l = kw.lower().strip()
        if not kw_l:
            continue
        title_hits = title.count(kw_l)
        body_hits = body.count(kw_l)
        hits[kw] = title_hits + body_hits
        score += title_hits * 5
        score += min(body_hits, 10) * 1

    score += _safe_int(fm.get("relevance", 0))
    return score, hits


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("topic", type=str, help="Topic or comma-separated keywords")
    ap.add_argument("--top", type=int, default=8)
    ap.add_argument("--lane", type=str, default=None)
    ap.add_argument("--since", type=str, default=None)
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--include-status", type=str, default="READY,USED",
                    help="Comma-separated statuses to include (default: READY,USED — receipts can be re-cited)")
    args = ap.parse_args()

    keywords = [k.strip() for k in args.topic.split(",") if k.strip()]
    if not keywords:
        print("ERROR: provide a topic or comma-separated keywords")
        sys.exit(1)

    statuses = {s.strip() for s in args.include_status.split(",")}

    matches = []
    for fp in INBOX.glob("*.md"):
        try:
            text = fp.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        fm = parse_frontmatter(text)
        if fm.get("status") not in statuses and fm.get("status"):
            continue
        if args.lane and args.lane.lower() not in fm.get("lane", "").lower():
            continue
        if args.since and fm.get("date", "") < args.since:
            continue

        score, hits = score_relevance(text, fm, keywords)
        if score == 0:
            continue

        body = FRONTMATTER_RE.sub("", text, count=1).strip()
        title = ""
        for line in body.splitlines():
            if line.startswith("# "):
                title = line[2:].strip()[:140]
                break

        matches.append({
            "filename": fp.name,
            "path": str(fp),
            "title": title,
            "lane": fm.get("lane", ""),
            "source": fm.get("source", ""),
            "date": fm.get("date", ""),
            "url": fm.get("url", ""),
            "status": fm.get("status", ""),
            "inbox_relevance": _safe_int(fm.get("relevance", 0)),
            "match_score": score,
            "keyword_hits": hits,
        })

    matches.sort(key=lambda m: -m["match_score"])
    matches = matches[: args.top]

    if args.json:
        print(json.dumps(matches, indent=2, ensure_ascii=False))
        return

    print(f"\nTop {len(matches)} inbox receipts for topic: {', '.join(keywords)}\n")
    print(f"{'#':>2}  {'Score':>5}  {'Lane':<22}  {'Date':<10}  {'Status':<7}  Title")
    print("-" * 130)
    for i, m in enumerate(matches, 1):
        title = m["title"][:70] or m["filename"][:70]
        print(f"{i:>2}  {m['match_score']:>5}  {m['lane'][:22]:<22}  {m['date']:<10}  {m['status']:<7}  {title}")
    print()
    print("Pass these to /write as anchor evidence. None of them is the post — you are the post.\n")


if __name__ == "__main__":
    main()
