#!/usr/bin/env python3
"""
podcast-rss-scraper. One job: RSS feed URL in, structured show facts out.

Commodity skill. No judgment. Just facts the fit-researcher will use.

Input:  --url <rss_url>   (or stdin JSON {"urls": ["...", ...]})
Output: JSON to stdout. Per feed:
  show_name, rss_url, episode_count_seen, last_episode_date (ISO),
  days_since_last, cadence_label, takes_guests (heuristic bool),
  active (days_since_last <= active_days), recent_titles[]

Stdlib only. Robust to missing fields and odd feeds.
"""
import sys
import json
import argparse
import urllib.request
import statistics
import re
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone
from xml.etree import ElementTree as ET

ACTIVE_DAYS = 90
GUEST_PAT = re.compile(
    r"\b(with|feat\.?|featuring|guest|interview|ft\.?)\b|:\s*[A-Z][a-z]+\s+[A-Z][a-z]+",
    re.I,
)
UA = "Mozilla/5.0 (podcast-rss-scraper; research)"


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def text(el):
    return (el.text or "").strip() if el is not None else ""


def parse_feed(url):
    raw = fetch(url)
    root = ET.fromstring(raw)
    # RSS 2.0: rss/channel/item
    channel = root.find("channel")
    if channel is None:
        # some feeds are Atom; minimal handling
        ns = {"a": "http://www.w3.org/2005/Atom"}
        title = text(root.find("a:title", ns))
        entries = root.findall("a:entry", ns)
        dates = []
        titles = []
        for e in entries[:25]:
            titles.append(text(e.find("a:title", ns)))
            d = text(e.find("a:updated", ns)) or text(e.find("a:published", ns))
            try:
                dates.append(datetime.fromisoformat(d.replace("Z", "+00:00")))
            except Exception:
                pass
        return build(url, title, titles, dates)

    title = text(channel.find("title"))
    items = channel.findall("item")
    titles, descs, dates = [], [], []
    for it in items[:25]:
        titles.append(text(it.find("title")))
        descs.append(text(it.find("description")))
        pd = text(it.find("pubDate"))
        try:
            dates.append(parsedate_to_datetime(pd))
        except Exception:
            pass
    return build(url, title, titles, dates, descs)


def build(url, title, titles, dates, descs=None):
    descs = descs or []
    dates = [d for d in dates if d is not None]
    dates_norm = []
    for d in dates:
        if d.tzinfo is None:
            d = d.replace(tzinfo=timezone.utc)
        dates_norm.append(d)
    dates_norm.sort(reverse=True)

    last = dates_norm[0] if dates_norm else None
    now = datetime.now(timezone.utc)
    days_since = (now - last).days if last else None

    cadence = "unknown"
    if len(dates_norm) >= 3:
        gaps = [
            (dates_norm[i] - dates_norm[i + 1]).days
            for i in range(min(len(dates_norm) - 1, 9))
        ]
        gaps = [g for g in gaps if g > 0]
        if gaps:
            med = statistics.median(gaps)
            if med <= 4:
                cadence = "multiple per week"
            elif med <= 9:
                cadence = "weekly"
            elif med <= 18:
                cadence = "biweekly"
            elif med <= 40:
                cadence = "monthly"
            else:
                cadence = "irregular"

    blob = " ".join(titles + descs[:10])
    hits = sum(1 for t in titles if GUEST_PAT.search(t or ""))
    takes_guests = (
        hits >= max(2, int(0.25 * max(1, len(titles)))) or bool(GUEST_PAT.search(blob))
    )

    return {
        "show_name": title or "(unknown)",
        "rss_url": url,
        "episode_count_seen": len(titles),
        "last_episode_date": last.date().isoformat() if last else None,
        "days_since_last": days_since,
        "cadence_label": cadence,
        "takes_guests": bool(takes_guests),
        "active": (days_since is not None and days_since <= ACTIVE_DAYS),
        "recent_titles": titles[:5],
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url")
    args = ap.parse_args()
    if args.url:
        urls = [args.url]
    else:
        urls = json.load(sys.stdin).get("urls", [])

    out = []
    for u in urls:
        try:
            out.append(parse_feed(u))
        except Exception as e:
            out.append({"rss_url": u, "error": str(e), "active": False})
    print(json.dumps(out if len(out) != 1 else out[0],
                      ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
