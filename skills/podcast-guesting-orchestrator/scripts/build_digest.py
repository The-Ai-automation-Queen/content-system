#!/usr/bin/env python3
"""
Builds the review digest from the pipeline state sidecar.

Reads <speaking-pipeline>.data.json and emits a short digest a human reads
before anything is sent. Pure read + format. Sends nothing.

Input  : --data <path to .data.json>  (optional --telegram just labels output)
Output : digest text to stdout
"""
import sys
import json
import argparse
import os


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", required=True)
    ap.add_argument("--telegram", action="store_true")
    args = ap.parse_args()

    if not os.path.exists(args.data):
        print("No pipeline data yet at " + args.data)
        return

    with open(args.data, "r", encoding="utf-8") as f:
        records = json.load(f)

    t1 = [r for r in records if str(r.get("tier", "")).upper() == "T1"]
    t2 = [r for r in records if str(r.get("tier", "")).upper() == "T2"]
    t3 = [r for r in records if str(r.get("tier", "")).upper() == "T3"]

    lines = []
    lines.append("PODCAST GUESTING - review digest")
    lines.append("Total %d  |  T1 %d  |  T2 %d  |  T3 %d"
                 % (len(records), len(t1), len(t2), len(t3)))
    lines.append("")
    lines.append("T1 - pitch now (drafted, waiting for you to send):")
    if t1:
        for r in t1[:10]:
            lines.append("  - %s (%s) via %s"
                          % (r.get("show_name", "?"),
                             r.get("host", "?"),
                             r.get("booking_route", "route unknown")))
    else:
        lines.append("  (none this run)")
    lines.append("")
    if t2:
        lines.append("T2 - nurture first: " +
                      ", ".join(r.get("show_name", "?") for r in t2[:10]))
        lines.append("")
    lines.append("Nothing has been sent. Open the shortlist, review the "
                 "drafted pitches, send the ones you approve by hand.")

    out = "\n".join(lines)
    if args.telegram:
        out = "[TELEGRAM DIGEST]\n" + out
    print(out)


if __name__ == "__main__":
    main()
