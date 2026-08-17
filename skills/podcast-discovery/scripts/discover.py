#!/usr/bin/env python3
"""
podcast-discovery. Seed in, candidate shows out (with RSS feed urls).

Source: Apple's public podcast directory (iTunes Search API). Free, no auth,
no key, stable JSON. Chosen over HTML scraping for v1 robustness (D-SRC intent:
zero new cost, reliable). Scrapling remains the documented fallback for sites
that block, but discovery does not need it.

Modes
-----
topic   : search the directory by keyword. value = search term.
resolve : value = JSON list of show NAMES (used by peer-reverse after the
          skill's web-research step finds which shows a peer guested on).
          Resolves each name to its real RSS feed.

Input  : --mode topic|resolve --value "<term or JSON list>" --limit N
Output : JSON list of {show_name, rss_url, artist, genres, track_count,
         itunes_url}. Deduped by rss_url. No scoring (that is fit-researcher).
"""
import sys
import json
import argparse
import urllib.parse
import urllib.request

UA = "Mozilla/5.0 (podcast-discovery; research)"
SEARCH = "https://itunes.apple.com/search"


def _get(params):
    url = SEARCH + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def _row(r):
    return {
        "show_name": r.get("collectionName") or r.get("trackName"),
        "rss_url": r.get("feedUrl"),
        "artist": r.get("artistName"),
        "genres": r.get("genres", []),
        "track_count": r.get("trackCount"),
        "itunes_url": r.get("collectionViewUrl"),
    }


def search_topic(term, limit):
    data = _get({
        "media": "podcast",
        "term": term,
        "limit": min(max(limit, 1), 50),
    })
    return [_row(r) for r in data.get("results", []) if r.get("feedUrl")]


def resolve_names(names, limit_each=1):
    out = []
    for name in names:
        try:
            data = _get({"media": "podcast", "term": name, "limit": 3})
            results = [r for r in data.get("results", []) if r.get("feedUrl")]
            out.extend(_row(r) for r in results[:limit_each])
        except Exception as e:
            out.append({"show_name": name, "rss_url": None, "error": str(e)})
    return out


def dedupe(rows):
    seen, out = set(), []
    for r in rows:
        k = r.get("rss_url")
        if k and k in seen:
            continue
        if k:
            seen.add(k)
        out.append(r)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mode", required=True, choices=["topic", "resolve"])
    ap.add_argument("--value", required=True)
    ap.add_argument("--limit", type=int, default=15)
    args = ap.parse_args()

    if args.mode == "topic":
        rows = search_topic(args.value, args.limit)
    else:
        try:
            names = json.loads(args.value)
            if not isinstance(names, list):
                raise ValueError
        except Exception:
            names = [n.strip() for n in args.value.split(",") if n.strip()]
        rows = resolve_names(names)

    print(json.dumps(dedupe(rows)[: args.limit], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
