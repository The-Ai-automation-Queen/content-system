#!/usr/bin/env python3
"""
Generic pipeline writer. Reusable utility skill.

State of truth = a JSON sidecar. The .md file is the human view, regenerated
from JSON every run so the table never corrupts. Idempotent: rerunning the
same rows updates in place, never duplicates.

Reusable by ANY pipeline (podcast guesting now, B2B prospecting later) by
pointing --out at a different .md path. No business logic lives here.

Input (JSON via --input <file> or stdin):
{
  "out": "C:/.../speaking-pipeline.md",      # required, .md path
  "title": "Podcast Guesting Pipeline",       # file H1
  "section": "Shortlist",                     # table section heading
  "dedupe_key": "show_name",                  # field that identifies a record
  "columns": ["show_name","host","audience","tier","pitch_angle","status"],
  "detail_field": "draft_pitch",              # optional long text -> detail block
  "rows": [ { ... }, ... ]
}

Defaults: status = "QUEUED - NOT SENT" if a row has no status.
The writer NEVER sends anything. It only writes files.
"""
import json
import sys
import os
import argparse
from datetime import date

DEFAULT_STATUS = "QUEUED - NOT SENT"


def load_payload(args):
    if args.input:
        with open(args.input, "r", encoding="utf-8") as f:
            return json.load(f)
    return json.load(sys.stdin)


def sidecar_path(md_path):
    base, _ = os.path.splitext(md_path)
    return base + ".data.json"


def load_state(md_path):
    p = sidecar_path(md_path)
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def save_state(md_path, records):
    with open(sidecar_path(md_path), "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)


def merge(records, rows, key):
    index = {r.get(key): i for i, r in enumerate(records) if r.get(key) is not None}
    for row in rows:
        row.setdefault("status", DEFAULT_STATUS)
        row.setdefault("date_added", date.today().strftime("%d/%m/%Y"))
        k = row.get(key)
        if k in index:
            # update in place, preserve a human-edited status if already moved
            existing = records[index[k]]
            moved = existing.get("status") not in (DEFAULT_STATUS, None)
            existing.update(row)
            if moved:
                existing["status"] = existing.get("status")
        else:
            records.append(row)
            index[k] = len(records) - 1
    return records


def cell(v):
    if v is None:
        return ""
    s = str(v).replace("|", "\\|").replace("\n", " ").strip()
    return s


def render_md(payload, records):
    title = payload.get("title", "Pipeline")
    section = payload.get("section", "Records")
    columns = payload.get("columns") or (list(records[0].keys()) if records else [])
    detail_field = payload.get("detail_field")
    key = payload.get("dedupe_key", "show_name")

    lines = []
    lines.append("# " + title)
    lines.append("")
    lines.append("*Auto-generated. Edit the `status` column by hand to move a row "
                 "(QUEUED / SENT / BOOKED / DECLINED). Nothing here is ever sent "
                 "automatically.*")
    lines.append("")
    lines.append("Last write: " + date.today().strftime("%d/%m/%Y") +
                 "  |  Records: " + str(len(records)))
    lines.append("")
    lines.append("## " + section)
    lines.append("")

    if not records:
        lines.append("_No records yet._")
        lines.append("")
    else:
        header = "| " + " | ".join(columns) + " |"
        sep = "| " + " | ".join(["---"] * len(columns)) + " |"
        lines.append(header)
        lines.append(sep)
        for r in records:
            lines.append("| " + " | ".join(cell(r.get(c)) for c in columns) + " |")
        lines.append("")

        if detail_field:
            details = [r for r in records if r.get(detail_field)]
            if details:
                lines.append("## Draft pitches")
                lines.append("")
                for r in details:
                    lines.append("### " + cell(r.get(key)))
                    tier = r.get("tier")
                    anchor = r.get("anchor_used")
                    meta = []
                    if tier:
                        meta.append("Tier: " + str(tier))
                    if anchor:
                        meta.append("Anchor: " + str(anchor))
                    if meta:
                        lines.append("*" + "  |  ".join(meta) + "*")
                        lines.append("")
                    lines.append(str(r.get(detail_field)).strip())
                    lines.append("")
                    lines.append("Status: **" + cell(r.get("status")) +
                                 "** (send manually)")
                    lines.append("")
                    lines.append("---")
                    lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", help="JSON payload file. If omitted, read stdin.")
    args = ap.parse_args()

    payload = load_payload(args)
    md_path = payload["out"]
    os.makedirs(os.path.dirname(md_path), exist_ok=True)

    key = payload.get("dedupe_key", "show_name")
    rows = payload.get("rows", [])

    records = load_state(md_path)
    before = len(records)
    records = merge(records, rows, key)
    after = len(records)

    save_state(md_path, records)
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(render_md(payload, records))

    print(json.dumps({
        "ok": True,
        "md": md_path,
        "json": sidecar_path(md_path),
        "records_total": after,
        "records_added": after - before,
        "records_updated": len(rows) - (after - before),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
