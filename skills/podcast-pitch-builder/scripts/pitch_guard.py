#!/usr/bin/env python3
"""
Deterministic hard gate for podcast-pitch-builder output.

Mirrors the critic's hard-gate style. A pitch that fails ANY check must be
rewritten by the skill before it is passed to the pipeline-writer. No
fabrication is checkable here (that is enforced by the skill only using
pitch-anchors.md), but voice and structure violations are caught hard.

Input  : stdin JSON {"pitch": "...", "anchor_used": "A-...", "anchors_ref": [...]}
Output : JSON {"pass": bool, "fails": [...], "warns": [...]}
"""
import sys
import json
import re

CONTRACTIONS = re.compile(
    r"\b(?:do|does|did|is|are|was|were|has|have|had|can|could|would|should|"
    r"will|won|it|that|there|they|you|we|I|he|she|let|what|who|here)"
    r"['’](?:t|s|re|ve|ll|d|m)\b",
    re.I,
)
LEAD_BRANDS = re.compile(r"^\s*\W*(dell|intel|microsoft|nike|lelabplus)\b", re.I)
PRIVACY_LEAD = re.compile(r"\b(privacy|gdpr|compliance|regulation|data protection)\b", re.I)
SLOP = re.compile(
    r"\b(unlock|unleash|leverage|supercharge|game[- ]changer|elevate|"
    r"empower|seamless|cutting[- ]edge|revolutionary|delve|dive deep|"
    r"in today's world|fast[- ]paced world)\b",
    re.I,
)
KNOWN_ANCHORS = {
    "A-PRACTITIONER", "A-DECODER", "A-THE-WORK",
    "A-ORIGIN-JARGON", "A-TOOL-TRAP", "A-TRANSLATOR",
}


def first_sentences(text, n=2):
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return " ".join(parts[:n])


def main():
    payload = json.load(sys.stdin)
    pitch = (payload.get("pitch") or "").strip()
    anchor = payload.get("anchor_used")
    fails, warns = [], []

    if not pitch:
        print(json.dumps({"pass": False, "fails": ["empty pitch"], "warns": []}))
        return

    if "—" in pitch or " -- " in pitch:
        fails.append("em dash present (banned)")

    if CONTRACTIONS.search(pitch):
        fails.append("contraction present (non-contracted English required)")

    if LEAD_BRANDS.search(pitch):
        fails.append("pitch opens with a company/brand name (credential-lead banned)")

    if PRIVACY_LEAD.search(first_sentences(pitch, 2)):
        fails.append("privacy/compliance/regulation used as the lead hook (banned)")

    if not anchor or anchor not in KNOWN_ANCHORS:
        fails.append(f"anchor_used missing or not a known anchor id: {anchor!r}")

    other = [a for a in KNOWN_ANCHORS if a != anchor and a in pitch]
    if other:
        fails.append(f"more than one anchor referenced: {other}")

    slop = sorted(set(m.group(0).lower() for m in SLOP.finditer(pitch)))
    if slop:
        fails.append(f"banned slop word(s): {slop}")

    n = len(pitch)
    if n > 1200:
        warns.append(f"pitch long ({n} chars); outreach pitches read better under ~900")
    if n < 120:
        warns.append(f"pitch very short ({n} chars); may be too thin to land")

    print(json.dumps(
        {"pass": len(fails) == 0, "fails": fails, "warns": warns},
        ensure_ascii=False,
    ))


if __name__ == "__main__":
    main()
