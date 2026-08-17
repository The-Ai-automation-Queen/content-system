---
name: podcast-pipeline-writer
description: Generic reusable pipeline sink. Takes structured rows and writes/updates a markdown shortlist file (plus a JSON state sidecar) idempotently. Used by podcast-guesting-orchestrator as the final step, and reusable unchanged by any future pipeline (B2B prospecting, etc). Never sends anything. Use when a skill needs to persist a tiered list to disk.
---

# Podcast Pipeline Writer

The reusable utility skill. No business logic. One job: persist structured rows
to a markdown file a human can read and edit, without ever duplicating or
corrupting the table.

## Contract

**In:** a JSON payload (see below).
**Out:** an updated `.md` file + a `.data.json` state sidecar. Prints a JSON
summary `{ok, md, json, records_total, records_added, records_updated}`.

The `.data.json` sidecar is the state of truth. The `.md` is regenerated from
it every run, so the table never breaks. Idempotent: rerunning the same rows
updates them in place, never appends duplicates. Dedupe is by `dedupe_key`.

A human-edited `status` (anything other than `QUEUED - NOT SENT`) is preserved
on rerun. Nothing is ever sent. This skill only writes files.

## How to run

```
py "C:\Users\fatih\.claude\skills\podcast-pipeline-writer\scripts\write_rows.py" --input payload.json
```

Or pipe the JSON payload on stdin.

## Payload shape

```json
{
  "out": "C:/Users/fatih/.claude/departments/product/3-build/podcast-guesting/speaking-pipeline.md",
  "title": "Podcast Guesting Pipeline",
  "section": "Shortlist",
  "dedupe_key": "show_name",
  "columns": ["show_name", "host", "audience", "tier", "pitch_angle", "booking_route", "status", "date_added"],
  "detail_field": "draft_pitch",
  "rows": [ { "show_name": "...", "host": "...", "tier": "T1", "draft_pitch": "..." } ]
}
```

- `dedupe_key` — field that identifies a record (default `show_name`)
- `detail_field` — optional long text rendered as a per-record block below the
  table (used for the full draft pitch)
- rows missing `status` get `QUEUED - NOT SENT`; rows missing `date_added` get
  today in DD/MM/YYYY

## Reuse

To reuse for a different pipeline, change `out`, `title`, `section`, `columns`.
Nothing in the script is podcast-specific. This is deliberate (plan reuse check).

## Hard rule

This skill never contacts anyone. It writes a file. Sending is always a manual
human action on the shortlist.
