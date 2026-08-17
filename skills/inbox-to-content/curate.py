"""
curate.py — weekly editorial pass over research-inbox.

Filters tool-review slop. Boosts notes with stats / controversy / patterns.
Clusters survivors into topic groups. Outputs N topics with receipts bundled.

Usage:
    py curate.py                    # 7 topic clusters from last 30 days
    py curate.py --topics 5 --days 14
    py curate.py --json
"""
import argparse
import json
import re
import sys
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

INBOX = Path(r"C:\Users\fatih\OneDrive\Obsidian Mind\research-inbox")

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---", re.DOTALL)

# Slop signals — drop or heavily downscore notes matching these
SLOP_TITLE_PATTERNS = [
    r"^title:\s*how to use\b",
    r"^title:\s*\w+\s+tutorial",
    r"\b(top|best)\s+\d+\s+",
    r"\bfree\s+\d+\s+(min|hour|day)\s+masterclass\b",
    r"\bfull course\b",
    r"\bfull workshop\b",
    r"\bcatalogue de\b",
    r"\b\d+\s+prompts?\s+(for|to|by)\b",
    r"^[\w-]+/[\w-]+$",  # bare github repo names
]

SLOP_BODY_KEYWORDS = [
    "this article presents",
    "this content discusses",
    "this tool is designed to",
    "this platform allows users to",
    "is a tool that",
    "is a platform for",
    "is an open-source",
    "the article presents",
]

# Quality signals — boost notes with these
QUALITY_SIGNALS = {
    "stat": [
        r"\b\d+%\b", r"\b\d+x\b",
        r"\b\$\d", r"\b\d+\s*(million|billion|thousand|k\b|m\b|b\b)\b",
        r"\bsurvey\b", r"\bstudy\b", r"\breport\b", r"\bresearch found\b",
    ],
    "controversy": [
        r"\bcompromised\b", r"\bvulnerab", r"\bbreach\b", r"\bbanned\b",
        r"\bleak", r"\bexploit", r"\bbackdoor", r"\bsupply chain attack",
        r"\bquit\b", r"\bfired\b", r"\bsued\b", r"\bdeleted\b", r"\berased\b",
        r"\bruled\b", r"\billegal\b", r"\bdangerous\b", r"\bevil\b",
    ],
    "named_source": [
        r"\b(anthropic|openai|google|microsoft|meta|amazon|nvidia|stanford|harvard|mit|gartner|mckinsey|deloitte|forrester|hbr|forbes|reuters|bloomberg|ft\.com|wsj|nyt)\b",
        r"\bdept of labor\b", r"\beu\s+(ai\s+act|article)\b", r"\bca\s+state\b",
    ],
    "pattern_claim": [
        r"\bnobody\s+(checks|knows|warns|tells)\b",
        r"\bmost\s+(ceos|teams|founders|companies|people)\b",
        r"\b\d+\s+in\s+\d+\b",
        r"\bturns out\b", r"\beveryone\s+(thinks|believes|assumes)\b",
        r"\bthe real (problem|issue|reason|cost)\b",
        r"\bhidden\s+(cost|risk|fee|truth)\b",
    ],
}

# Topic clusters — bucket notes by which keyword group dominates
TOPIC_BUCKETS = {
    "data_security_privacy": [
        "privacy", "data security", "compliance", "gdpr", "encryption",
        "phishing", "social engineering", "compromised", "leak", "breach",
        "terms of service", "tos", "settings", "permission", "access control",
        "vulnerab", "exploit", "backdoor",
    ],
    "ai_literacy_judgment": [
        "ai literacy", "fluency", "training", "judgment", "critical thinking",
        "hallucination", "fact check", "verify", "questioning", "ai paradox",
        "anthropic academy", "skilljar", "course", "curriculum",
    ],
    "ai_agents_risk": [
        "agent", "autonomous", "computer use", "automation risk", "ai safety",
        "alignment", "rogue", "deleted", "erased", "unintended",
    ],
    "vendor_independence": [
        "vendor lock", "open source", "self-host", "independence", "build your own",
        "stop paying", "cancelled", "replace", "alternative", "diy",
    ],
    "creator_strategy": [
        "personal brand", "creator", "content strategy", "authority", "audience",
        "linkedin", "instagram", "tiktok", "newsletter", "carousel",
    ],
    "ai_workplace_adoption": [
        "ceo", "leader", "team", "workforce", "employee", "l&d", "hr",
        "transformation", "adoption", "implementation", "roi", "productivity",
    ],
    "claude_code_skills": [
        "claude code", "claude skill", "subagent", "mcp", "anthropic", "cowork",
        "claude.com", "agentic workflow",
    ],
    "women_in_ai": [
        "women", "female", "gender", "feminist", "diversity", "underrepresent",
        "she founded", "women-led",
    ],
}


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


def is_slop(title: str, body: str) -> bool:
    title_l = title.lower()
    body_l = body.lower()[:500]
    for pat in SLOP_TITLE_PATTERNS:
        if re.search(pat, title_l, re.IGNORECASE):
            return True
    for kw in SLOP_BODY_KEYWORDS:
        if kw in body_l:
            return True
    return False


def quality_score(title: str, body: str) -> dict:
    """Return signal counts per category."""
    full = (title + "\n" + body).lower()
    counts = {}
    for sig_name, patterns in QUALITY_SIGNALS.items():
        count = sum(len(re.findall(p, full, re.IGNORECASE)) for p in patterns)
        counts[sig_name] = count
    counts["total"] = sum(counts.values())
    return counts


def assign_topic(title: str, body: str) -> str:
    """Bucket note into ONE topic by keyword dominance."""
    full = (title + "\n" + body).lower()[:3000]
    scores = {}
    for topic, kws in TOPIC_BUCKETS.items():
        scores[topic] = sum(full.count(kw) for kw in kws)
    best = max(scores.items(), key=lambda x: x[1])
    if best[1] == 0:
        return "uncategorised"
    return best[0]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--topics", type=int, default=7, help="Max topic clusters to surface")
    ap.add_argument("--days", type=int, default=30, help="Look back N days")
    ap.add_argument("--min-receipts", type=int, default=2, help="Drop topics with fewer receipts")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--out", action="store_true",
                    help="Write markdown report to builds/research-triage/reports/curation-DD-MM-YYYY.md")
    args = ap.parse_args()

    cutoff = (datetime.now() - timedelta(days=args.days)).strftime("%Y-%m-%d")

    notes_by_topic = defaultdict(list)
    stats = {"total": 0, "slop": 0, "no_signal": 0, "kept": 0}

    for fp in INBOX.glob("*.md"):
        try:
            text = fp.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        fm = parse_frontmatter(text)
        if fm.get("status") not in (None, "READY", ""):
            continue
        if fm.get("date", "") < cutoff:
            continue

        body = FRONTMATTER_RE.sub("", text, count=1).strip()
        title = ""
        for line in body.splitlines():
            if line.startswith("# "):
                title = line[2:].strip()
                break
        if not title:
            title = fp.stem

        stats["total"] += 1

        if is_slop(title, body):
            stats["slop"] += 1
            continue

        sig = quality_score(title, body)
        if sig["total"] < 2:
            stats["no_signal"] += 1
            continue

        topic = assign_topic(title, body)
        if topic == "uncategorised":
            stats["no_signal"] += 1
            continue

        notes_by_topic[topic].append({
            "filename": fp.name,
            "title": title[:140],
            "lane": fm.get("lane", ""),
            "date": fm.get("date", ""),
            "url": fm.get("url", ""),
            "inbox_relevance": _safe_int(fm.get("relevance", 0)),
            "signals": sig,
            "quality_score": sig["total"] + _safe_int(fm.get("relevance", 0)) // 2,
        })
        stats["kept"] += 1

    topics_ranked = []
    for topic, notes in notes_by_topic.items():
        if len(notes) < args.min_receipts:
            continue
        notes.sort(key=lambda n: -n["quality_score"])
        topic_score = sum(n["quality_score"] for n in notes[:5])
        topics_ranked.append({
            "topic": topic,
            "topic_score": topic_score,
            "receipt_count": len(notes),
            "receipts": notes[:5],
        })

    topics_ranked.sort(key=lambda t: -t["topic_score"])
    topics_ranked = topics_ranked[: args.topics]

    if args.json:
        print(json.dumps({"stats": stats, "topics": topics_ranked}, indent=2, ensure_ascii=False))
        return

    print(f"\nCURATION PASS — last {args.days} days")
    print(f"Scanned: {stats['total']}  |  Slop dropped: {stats['slop']}  |  Low-signal dropped: {stats['no_signal']}  |  Kept: {stats['kept']}\n")
    print(f"Surfaced {len(topics_ranked)} topic clusters worth your judgement this week:\n")

    for i, t in enumerate(topics_ranked, 1):
        print(f"{'=' * 100}")
        print(f"TOPIC {i}: {t['topic'].replace('_', ' ').upper()}  (cluster score: {t['topic_score']}, {t['receipt_count']} receipts)")
        print(f"{'=' * 100}")
        for j, r in enumerate(t["receipts"], 1):
            sig = r["signals"]
            sig_tags = []
            if sig.get("stat", 0) > 0:
                sig_tags.append(f"STAT×{sig['stat']}")
            if sig.get("controversy", 0) > 0:
                sig_tags.append(f"CONTROVERSY×{sig['controversy']}")
            if sig.get("named_source", 0) > 0:
                sig_tags.append(f"NAMED×{sig['named_source']}")
            if sig.get("pattern_claim", 0) > 0:
                sig_tags.append(f"PATTERN×{sig['pattern_claim']}")
            print(f"  {j}. [{r['date']}] {r['title'][:90]}")
            print(f"     {' | '.join(sig_tags) if sig_tags else 'no strong signals'}")
            print(f"     {r['url'][:100]}")
        print()

    print("Pick a topic number. I anchor with the receipts, you bring story + judgement.\n")

    if args.out:
        out_dir = Path(r"C:\Users\fatih\.claude\builds\research-triage\reports")
        out_dir.mkdir(parents=True, exist_ok=True)
        today = datetime.now().strftime("%d-%m-%Y")
        out_fp = out_dir / f"curation-{today}.md"
        lines = [
            f"# Inbox Curation — {datetime.now().strftime('%d/%m/%Y')}",
            "",
            f"Last {args.days} days. Scanned {stats['total']} | Slop {stats['slop']} | Low-signal {stats['no_signal']} | Kept {stats['kept']}.",
            "",
            f"Surfaced {len(topics_ranked)} topic clusters worth your judgement this week.",
            "",
        ]
        for i, t in enumerate(topics_ranked, 1):
            lines.append(f"## Topic {i}: {t['topic'].replace('_', ' ').title()}")
            lines.append(f"_Cluster score: {t['topic_score']} | {t['receipt_count']} receipts_")
            lines.append("")
            for j, r in enumerate(t["receipts"], 1):
                sig = r["signals"]
                tags = []
                if sig.get("stat", 0) > 0: tags.append(f"STAT×{sig['stat']}")
                if sig.get("controversy", 0) > 0: tags.append(f"CONTROVERSY×{sig['controversy']}")
                if sig.get("named_source", 0) > 0: tags.append(f"NAMED×{sig['named_source']}")
                if sig.get("pattern_claim", 0) > 0: tags.append(f"PATTERN×{sig['pattern_claim']}")
                lines.append(f"{j}. **[{r['date']}]** {r['title']}")
                lines.append(f"   - Signals: {' · '.join(tags) if tags else 'none'}")
                lines.append(f"   - URL: {r['url']}")
                lines.append(f"   - File: `{r['filename']}`")
                lines.append("")
        out_fp.write_text("\n".join(lines), encoding="utf-8")
        print(f"Report saved: {out_fp}\n")


if __name__ == "__main__":
    main()
