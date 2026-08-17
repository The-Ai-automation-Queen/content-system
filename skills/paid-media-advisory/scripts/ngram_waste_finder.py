#!/usr/bin/env python3
"""
ngram_waste_finder.py

Negative-keyword n-gram waste-finder for a Google Ads search terms report.
The centrepiece of the paid-media-advisory skill, Mode A.

What it does:
  1. Reads a search terms CSV (search term, clicks, cost, conversions).
  2. Breaks every search term into 1-grams and 2-grams.
  3. Aggregates cost (USD) and conversions by n-gram.
  4. Surfaces high-cost, zero-or-near-zero-conversion n-grams as recurring waste.
  5. Classifies each waste n-gram into a waste category (taxonomy below).
  6. Prints a ranked waste table, a single estimated recoverable-spend figure,
     and a ready-to-paste negative keyword list grouped by suggested level.

What it does NOT do:
  - It never pushes anything to a live ad account. Read and analyse only.
  - It never invents numbers. Every figure comes from the supplied CSV.
  - It never decides. Output is advisory. marketing-agent decides before action.

Graceful degradation:
  - Column names are matched loosely (case-insensitive, common variants).
  - If the conversions column is missing, the script falls back to treating
    clicks-with-cost-and-no-conversion-column as the waste proxy and SAYS SO
    explicitly in the output, so the finding is never presented as certain.

Usage:
  python ngram_waste_finder.py <search_terms.csv> [--min-cost 5] [--days 60]

Currency is always reported as USD. UK English in all output text.
No em dashes anywhere in output (hard rule of the parent skill).
"""

import argparse
import csv
import re
import sys
from collections import defaultdict

# Waste taxonomy (section C1 of the skill spec). Lowercase tokens.
WASTE_TAXONOMY = {
    "freebie-seeker": {
        "free", "gratis", "freebie", "no-cost", "nocost", "complimentary",
    },
    "diy-self-serve": {
        "diy", "yourself", "tutorial", "guide", "how", "learn", "template",
    },
    "jobs-career": {
        "job", "jobs", "career", "careers", "salary", "hiring", "vacancy",
        "vacancies", "internship", "recruitment", "recruiter", "cv", "resume",
    },
    "research-informational": {
        "what", "meaning", "definition", "examples", "example", "vs",
        "versus", "comparison", "reddit", "forum", "wikipedia", "explained",
    },
    "cheap-intent": {
        "cheap", "cheapest", "discount", "discounted", "bargain", "lowest",
    },
}

# Filler words excluded from 1-gram analysis (they carry no waste signal).
STOPWORDS = {
    "the", "a", "an", "to", "of", "for", "in", "on", "at", "and", "or",
    "is", "are", "with", "my", "your", "near", "me", "best", "top",
}


def _norm(s):
    return (s or "").strip().lower()


def find_column(fieldnames, *candidates):
    """Loosely match a column name. Returns the actual header or None."""
    lowered = {(_norm(f)): f for f in fieldnames}
    for cand in candidates:
        for key, original in lowered.items():
            if cand in key:
                return original
    return None


def parse_money(value):
    """Parse a cost cell to float USD. Strips currency symbols and separators."""
    if value is None:
        return 0.0
    cleaned = re.sub(r"[^\d.\-]", "", str(value).replace(",", ""))
    try:
        return float(cleaned) if cleaned not in ("", "-", ".") else 0.0
    except ValueError:
        return 0.0


def parse_number(value):
    if value is None:
        return 0.0
    cleaned = re.sub(r"[^\d.\-]", "", str(value).replace(",", ""))
    try:
        return float(cleaned) if cleaned not in ("", "-", ".") else 0.0
    except ValueError:
        return 0.0


def tokenize(term):
    """Lowercase, strip punctuation, split into word tokens."""
    term = _norm(term)
    term = re.sub(r"[^a-z0-9\s\-]", " ", term)
    return [t for t in term.split() if t]


def ngrams(tokens):
    """Yield ('1gram', token) and ('2gram', 'a b') tuples."""
    for t in tokens:
        if t not in STOPWORDS and len(t) > 1:
            yield ("1gram", t)
    for i in range(len(tokens) - 1):
        yield ("2gram", f"{tokens[i]} {tokens[i + 1]}")


def classify(ngram):
    """Return the waste category for an n-gram, or 'wrong-product-or-other'."""
    words = ngram.split()
    for category, tokenset in WASTE_TAXONOMY.items():
        if any(w in tokenset for w in words):
            return category
    return "wrong-product-or-other"


SUGGESTED_LEVEL = {
    "freebie-seeker": "ACCOUNT (shared negative list)",
    "jobs-career": "ACCOUNT (shared negative list)",
    "research-informational": "CAMPAIGN",
    "diy-self-serve": "CAMPAIGN",
    "cheap-intent": "CAMPAIGN (confirm: is this a discount business?)",
    "wrong-product-or-other": "AD GROUP (review with client first)",
}


def main():
    ap = argparse.ArgumentParser(description="Negative-keyword n-gram waste-finder")
    ap.add_argument("csv_path", help="Path to the search terms CSV export")
    ap.add_argument("--min-cost", type=float, default=5.0,
                    help="Minimum aggregated USD cost for an n-gram to be reported (default 5)")
    ap.add_argument("--days", type=int, default=None,
                    help="Window the report covers, in days, for the headline line only")
    args = ap.parse_args()

    try:
        with open(args.csv_path, newline="", encoding="utf-8-sig") as fh:
            sample = fh.read(4096)
            fh.seek(0)
            try:
                dialect = csv.Sniffer().sniff(sample, delimiters=",;\t")
            except csv.Error:
                dialect = csv.excel
            reader = csv.DictReader(fh, dialect=dialect)
            fieldnames = reader.fieldnames or []
            rows = list(reader)
    except FileNotFoundError:
        sys.exit(f"ERROR: file not found: {args.csv_path}")
    except Exception as exc:  # noqa: BLE001
        sys.exit(f"ERROR: could not read CSV: {exc}")

    term_col = find_column(fieldnames, "search term", "query", "term", "keyword")
    cost_col = find_column(fieldnames, "cost", "spend", "amount")
    conv_col = find_column(fieldnames, "conversion", "conv", "lead", "purchase")
    click_col = find_column(fieldnames, "click")

    if not term_col:
        sys.exit("ERROR: could not find a search term column. "
                 "Expected a header containing 'search term', 'query', or 'keyword'.")
    if not cost_col:
        sys.exit("ERROR: could not find a cost column. "
                 "Expected a header containing 'cost', 'spend', or 'amount'.")

    conversions_available = conv_col is not None
    proxy_note = ""
    if not conversions_available:
        proxy_note = (
            "NOTE: no conversions column was found in this export. "
            "Waste is estimated using cost on terms with clicks but no recorded "
            "conversion data at all. Treat the recoverable figure as a rough "
            "upper estimate, not a certain saving. Ask the client for a search "
            "terms export that includes the conversions column to confirm."
        )

    agg_cost = defaultdict(float)
    agg_conv = defaultdict(float)
    agg_kind = {}
    total_cost = 0.0
    parsed_rows = []  # (term, cost, conv, set_of_grams)

    for row in rows:
        term = row.get(term_col, "")
        cost = parse_money(row.get(cost_col))
        conv = parse_number(row.get(conv_col)) if conversions_available else 0.0
        total_cost += cost
        seen = set()
        for kind, gram in ngrams(tokenize(term)):
            if gram in seen:
                continue
            seen.add(gram)
            agg_cost[gram] += cost
            agg_conv[gram] += conv
            agg_kind[gram] = kind
        parsed_rows.append((term, cost, conv, seen))

    # Waste n-grams = aggregated cost above threshold AND near-zero conversions.
    # The per-n-gram cost here is used ONLY to rank and to size the negative
    # list. It deliberately overlaps (one search term feeds several n-grams),
    # so it must NEVER be summed into the headline figure.
    waste = []
    waste_grams = set()
    for gram, cost in agg_cost.items():
        if cost < args.min_cost:
            continue
        conv = agg_conv.get(gram, 0.0)
        if conv < 1.0:  # zero or near-zero conversions
            waste.append((gram, cost, conv, agg_kind[gram], classify(gram)))
            waste_grams.add(gram)

    waste.sort(key=lambda x: x[1], reverse=True)

    # Honest recoverable figure: sum the cost of each UNIQUE search term that
    # has near-zero conversions AND contains at least one flagged waste n-gram.
    # Counted once per term, so it can never exceed total spend.
    recoverable = 0.0
    flagged_terms = 0
    for term, cost, conv, grams in parsed_rows:
        if conv < 1.0 and (grams & waste_grams):
            recoverable += cost
            flagged_terms += 1
    recoverable = min(recoverable, total_cost)

    window = f" over the last {args.days} days" if args.days else " over the supplied window"

    print("=" * 72)
    print("NEGATIVE-KEYWORD N-GRAM WASTE-FINDER  (advisory output, USD)")
    print("=" * 72)
    if proxy_note:
        print(proxy_note)
        print("-" * 72)
    print(f"Search terms analysed:        {len(rows)}")
    print(f"Total cost in this report:    ${total_cost:,.2f}{window}")
    print(f"Distinct waste n-grams found: {len(waste)}  (cost >= ${args.min_cost:.2f}, <1 conversion)")
    print(f"Search terms flagged waste:   {flagged_terms} of {len(rows)}")
    print()
    print(f">>> ESTIMATED RECOVERABLE SPEND: ~${recoverable:,.2f}{window}")
    print(f"    ({flagged_terms} unique zero-conversion search terms, each counted")
    print("    once, so this can never exceed total spend above.)")
    print("    Stated as an estimate from the supplied data window, not a")
    print("    guaranteed saving. marketing-agent decision required before action.")
    print()

    if not waste:
        print("No high-cost zero-conversion n-grams above the cost threshold.")
        print("Either the account is tightly managed, or the export is too small.")
        return

    print("-" * 72)
    print(f"{'N-GRAM':<26}{'TYPE':<7}{'COST USD':>11}{'CONV':>6}  CATEGORY")
    print("-" * 72)
    for gram, cost, conv, kind, category in waste[:40]:
        print(f"{gram[:25]:<26}{kind:<7}{cost:>11,.2f}{conv:>6.0f}  {category}")

    print()
    print("-" * 72)
    print("READY-TO-PASTE NEGATIVE KEYWORD LIST  (grouped by suggested level)")
    print("Human applies these. This script never pushes to a live account.")
    print("Conflict check required: confirm none of these block a converting")
    print("keyword the account is actively and successfully bidding on.")
    print("-" * 72)
    by_level = defaultdict(list)
    for gram, cost, conv, kind, category in waste:
        level = SUGGESTED_LEVEL.get(category, "AD GROUP (review with client first)")
        by_level[level].append((gram, cost, category))
    for level in sorted(by_level):
        print(f"\n[{level}]")
        for gram, cost, category in sorted(by_level[level], key=lambda x: -x[1]):
            print(f'  "{gram}"   # ${cost:,.2f} wasted, reason: {category}')

    print()
    print("=" * 72)
    print("Reminder: advisory only. No change is applied automatically.")
    print("marketing-agent is the sole marketing decider.")
    print("=" * 72)


if __name__ == "__main__":
    main()
