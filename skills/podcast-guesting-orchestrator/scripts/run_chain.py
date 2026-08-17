#!/usr/bin/env python3
"""
One-shot mechanical spine for the podcast-guesting pipeline.

Collapses the four DETERMINISTIC skills into a single call so there is no
manual six-step orchestration:

  discovery -> rss-scraper -> merge -> prefilter -> research_queue.json

It does NOT do the two judgment steps (fit-research, pitch-build). Those need
an LLM and are run by the orchestrator skill / scheduled Claude agent on the
queue this produces. It also does NOT send anything. Ever.

Usage:
  py run_chain.py --mode topic --value "women founders AI" --limit 15
  py run_chain.py --mode peer-reverse --shows '["Show A","Show B"]'

Output: writes
  <build>/_run/research_queue.json   (survivors needing fit-research + pitch)
  <build>/_run/run_meta.json         (counts, dropped+reasons, timestamp)
and prints a one-line JSON summary.
"""
import json
import os
import sys
import subprocess
import argparse
from datetime import datetime, timezone

SKILLS = "C:/Users/fatih/.claude/skills"
BUILD = "C:/Users/fatih/.claude/departments/product/3-build/podcast-guesting"
RUN = os.path.join(BUILD, "_run")


def run(cmd, stdin=None):
    r = subprocess.run(cmd, input=stdin, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(" ".join(cmd) + " :: " + r.stderr.strip())
    return r.stdout


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mode", required=True, choices=["topic", "peer-reverse"])
    ap.add_argument("--value", help="topic phrase (topic mode)")
    ap.add_argument("--shows", help="JSON list of show names (peer-reverse mode)")
    ap.add_argument("--limit", type=int, default=15)
    args = ap.parse_args()

    os.makedirs(RUN, exist_ok=True)

    # 1. discovery
    if args.mode == "topic":
        out = run(["py", f"{SKILLS}/podcast-discovery/scripts/discover.py",
                   "--mode", "topic", "--value", args.value or "",
                   "--limit", str(args.limit)])
    else:
        out = run(["py", f"{SKILLS}/podcast-discovery/scripts/discover.py",
                   "--mode", "resolve", "--value", args.shows or "[]",
                   "--limit", str(args.limit)])
    shows = json.loads(out)

    # 2. rss-scraper (batch)
    urls = [s["rss_url"] for s in shows if s.get("rss_url")]
    facts = json.loads(run(
        ["py", f"{SKILLS}/podcast-rss-scraper/scripts/rss_scrape.py"],
        stdin=json.dumps({"urls": urls})))
    if isinstance(facts, dict):
        facts = [facts]
    byurl = {f.get("rss_url"): f for f in facts}

    merged = []
    for s in shows:
        f = byurl.get(s["rss_url"], {})
        m = dict(s)
        for k in ("last_episode_date", "days_since_last", "cadence_label",
                  "takes_guests", "active", "error"):
            m[k] = f.get(k)
        merged.append(m)

    # 3. prefilter
    pf = json.loads(run(
        ["py", f"{SKILLS}/podcast-fit-researcher/scripts/prefilter.py"],
        stdin=json.dumps(merged)))

    with open(os.path.join(RUN, "research_queue.json"), "w",
              encoding="utf-8") as fh:
        json.dump(pf["survivors"], fh, indent=2, ensure_ascii=False)

    meta = {
        "ran_at": datetime.now(timezone.utc).isoformat(),
        "mode": args.mode,
        "seed": args.value or args.shows,
        "discovered": len(shows),
        "survivors": pf["counts"]["survivors"],
        "dropped": pf["dropped"],
        "next": "orchestrator skill runs fit-research + pitch-builder on "
                "research_queue.json, then pipeline-writer + digest. "
                "NOTHING is sent.",
    }
    with open(os.path.join(RUN, "run_meta.json"), "w", encoding="utf-8") as fh:
        json.dump(meta, fh, indent=2, ensure_ascii=False)

    print(json.dumps({
        "ok": True,
        "discovered": len(shows),
        "survivors": pf["counts"]["survivors"],
        "dropped": len(pf["dropped"]),
        "research_queue": os.path.join(RUN, "research_queue.json"),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
