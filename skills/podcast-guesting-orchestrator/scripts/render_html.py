#!/usr/bin/env python3
"""
Render the pipeline state sidecar to a readable HTML review page.

Reads <speaking-pipeline>.data.json, writes <speaking-pipeline>.html.
On-brand (DESIGN.md tokens: Playfair / Source Serif / Space Mono, cream
#F5F2EB, powder lilac #C2B6E0, dark #1C1C1C). Internal review artifact, no
tool/footer branding. Sends nothing.

Usage: py render_html.py --data <.data.json path>
"""
import json
import argparse
import os
import html
from datetime import date

TIER_ORDER = {"T1": 0, "T2": 1, "T3": 2}

CSS = """
:root{--cream:#F5F2EB;--ink:#1C1C1C;--lilac:#C2B6E0;--line:#E2DCCF;}
*{box-sizing:border-box;margin:0;padding:0;}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{background:var(--cream);color:var(--ink);
 font-family:'Source Serif 4',Georgia,serif;line-height:1.7;
 padding:48px 6vw;max-width:1100px;margin:0 auto;}
.eyebrow{font-family:'Space Mono',monospace;text-transform:uppercase;
 letter-spacing:.18em;font-size:12px;color:#6b6256;margin-bottom:6px;}
h1{font-family:'Playfair Display',Georgia,serif;font-weight:400;
 font-size:40px;line-height:1.15;margin-bottom:6px;}
.meta{font-family:'Space Mono',monospace;font-size:13px;color:#6b6256;
 margin-bottom:32px;}
.counts{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0 36px;}
.chip{background:#fff;border:1px solid var(--line);border-radius:999px;
 padding:7px 16px;font-family:'Space Mono',monospace;font-size:13px;}
.chip b{color:#1C1C1C;}
table{width:100%;border-collapse:collapse;margin:8px 0 44px;font-size:15px;}
th{font-family:'Space Mono',monospace;text-transform:uppercase;
 letter-spacing:.08em;font-size:11px;text-align:left;color:#6b6256;
 border-bottom:2px solid var(--ink);padding:10px 12px;}
td{border-bottom:1px solid var(--line);padding:12px;vertical-align:top;}
tr:hover td{background:#fffdf7;}
.t1{border-left:4px solid var(--lilac);}
.tier{font-family:'Space Mono',monospace;font-weight:700;}
.status{font-family:'Space Mono',monospace;font-size:12px;color:#8a7f6c;}
h2{font-family:'Playfair Display',Georgia,serif;font-weight:400;
 font-size:28px;margin:40px 0 4px;}
.pitch{background:#fff;border:1px solid var(--line);border-left:4px solid var(--lilac);
 border-radius:14px;padding:22px 26px;margin:18px 0;}
.pitch h3{font-family:'Playfair Display',Georgia,serif;font-weight:400;
 font-size:21px;margin-bottom:4px;}
.pitch .tags{font-family:'Space Mono',monospace;font-size:12px;
 color:#6b6256;margin-bottom:12px;}
.pitch p{font-size:16px;}
.pitch .send{margin-top:14px;font-family:'Space Mono',monospace;font-size:12px;
 color:#8a7f6c;}
.note{font-family:'Space Mono',monospace;font-size:12px;color:#8a7f6c;
 border-top:1px solid var(--line);margin-top:40px;padding-top:16px;}
"""


def esc(v):
    return html.escape("" if v is None else str(v))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", required=True)
    args = ap.parse_args()

    records = []
    if os.path.exists(args.data):
        with open(args.data, "r", encoding="utf-8") as f:
            records = json.load(f)
    records.sort(key=lambda r: (TIER_ORDER.get(str(r.get("tier", "")).upper(), 9),
                                r.get("show_name", "")))

    t = {"T1": 0, "T2": 0, "T3": 0}
    for r in records:
        k = str(r.get("tier", "")).upper()
        if k in t:
            t[k] += 1

    cols = ["show_name", "host", "audience", "tier", "pitch_angle",
            "anchor_used", "booking_route", "status"]
    rows_html = []
    for r in records:
        cls = ' class="t1"' if str(r.get("tier")).upper() == "T1" else ""
        cells = "".join(
            f'<td class="tier">{esc(r.get(c))}</td>' if c == "tier"
            else f'<td class="status">{esc(r.get(c))}</td>' if c == "status"
            else f"<td>{esc(r.get(c))}</td>"
            for c in cols)
        rows_html.append(f"<tr{cls}>{cells}</tr>")

    pitches_html = []
    for r in records:
        if not r.get("draft_pitch"):
            continue
        pitches_html.append(
            f'<div class="pitch"><h3>{esc(r.get("show_name"))}</h3>'
            f'<div class="tags">Tier {esc(r.get("tier"))} &nbsp;|&nbsp; '
            f'{esc(r.get("pitch_angle"))} &nbsp;|&nbsp; anchor '
            f'{esc(r.get("anchor_used"))}</div>'
            f'<p>{esc(r.get("draft_pitch"))}</p>'
            f'<div class="send">{esc(r.get("status"))} &mdash; send manually, '
            f'verify booking route first</div></div>')

    doc = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Podcast Guesting Pipeline</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<div class="eyebrow">Speaking funnel &middot; internal review</div>
<h1>Podcast Guesting Pipeline</h1>
<div class="meta">Generated {date.today().strftime('%d/%m/%Y')} &middot; {len(records)} records &middot; nothing sent automatically</div>
<div class="counts">
 <div class="chip"><b>{t['T1']}</b> &nbsp;T1 pitch now</div>
 <div class="chip"><b>{t['T2']}</b> &nbsp;T2 nurture</div>
 <div class="chip"><b>{t['T3']}</b> &nbsp;T3 archive</div>
</div>
<table><thead><tr>{''.join(f'<th>{c.replace("_"," ")}</th>' for c in cols)}</tr></thead>
<tbody>{''.join(rows_html)}</tbody></table>
<h2>Drafted pitches</h2>
{''.join(pitches_html)}
<div class="note">Every pitch is QUEUED - NOT SENT. Review, confirm the host
and booking route, then send by hand. This pipeline never contacts anyone.</div>
</body></html>"""

    out = os.path.splitext(args.data)[0]
    if out.endswith(".data"):
        out = out[:-5]
    out = out + ".html"
    with open(out, "w", encoding="utf-8") as f:
        f.write(doc)
    print(out)


if __name__ == "__main__":
    main()
