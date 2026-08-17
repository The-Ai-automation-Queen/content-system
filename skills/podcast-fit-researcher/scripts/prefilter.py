#!/usr/bin/env python3
"""
Cheap deterministic pre-filter for podcast-fit-researcher.

Drops shows that fail a REQUIRED check in show-qualification-criteria.md
BEFORE any expensive web research happens. Filter early, research little.

Input  : stdin JSON list of merged objects (discovery row + rss-scraper facts).
         Each needs at least: show_name, rss_url, active, takes_guests.
Output : JSON {survivors:[...], dropped:[{show_name, reason}]}

No judgment beyond the hard REQUIRED gates. ICP-overlap, audience size, host
stance are NOT decided here. Those need research and live in the skill.
"""
import sys
import json

ACTIVE_DAYS = 90  # mirrors show-qualification-criteria.md


def main():
    data = json.load(sys.stdin)
    if isinstance(data, dict):
        data = [data]

    survivors, dropped = [], []
    for s in data:
        name = s.get("show_name", "(unknown)")
        if s.get("error"):
            dropped.append({"show_name": name, "reason": "feed error"})
            continue
        if not s.get("rss_url"):
            dropped.append({"show_name": name, "reason": "no feed url"})
            continue
        if s.get("active") is False:
            ds = s.get("days_since_last")
            dropped.append({"show_name": name,
                            "reason": f"inactive ({ds} days since last)"})
            continue
        if s.get("takes_guests") is False:
            dropped.append({"show_name": name,
                            "reason": "no guest format detected"})
            continue
        survivors.append(s)

    print(json.dumps({
        "survivors": survivors,
        "dropped": dropped,
        "counts": {"in": len(data),
                   "survivors": len(survivors),
                   "dropped": len(dropped)},
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
