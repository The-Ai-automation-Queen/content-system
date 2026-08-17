---
name: podcast-pitch-builder
description: Judgment step of the podcast-guesting pipeline. Takes researched shows and produces a tier (T1/T2/T3) plus one matched anchor and a drafted pitch per show, using only the approved pitch anchors. Runs a hard voice gate on every pitch. Use after fit-researcher, before pipeline-writer. Never sends anything.
---

# Podcast Pitch Builder

Judgment encoded as a skill. Tiers each show and drafts the pitch. The value
of the whole pipeline shows up or dies here.

## Read first (every run, fully)

- `departments/product/3-build/podcast-guesting/context/pitch-anchors.md`
- `departments/product/3-build/podcast-guesting/context/pitch-angles.md`
- `departments/product/3-build/podcast-guesting/context/show-tiering-rubric.md`

`pitch-anchors.md` is the ONLY source of credibility. If a fact is not in
that file, it does not go in a pitch. No exceptions. This is the fabrication
firewall (`feedback_no_fabricated_compliance.md`).

## Per researched show

1. **Tier it** using `show-tiering-rubric.md` (T1 pitch now, T2 nurture,
   T3 archive). Apply the tie-breakers exactly as written.
2. **Pick ONE angle** from `pitch-angles.md` whose "use when" matches the
   show's audience and host stance. Never two.
3. **Pull the matched anchor** from `pitch-anchors.md` for that angle.
4. **Draft the pitch**, containing only: one anchor, a value promise specific
   to that show's listeners, one strip-test-proof authority sentence, a
   low-friction next step. Nothing else. Non-contracted English. No em dashes.
5. **Run the hard gate** on the drafted pitch:

```
echo '{"pitch":"<draft>","anchor_used":"A-..."}' | py scripts\pitch_guard.py
```

If `pass` is false, rewrite the pitch to clear every fail, then re-run the
gate. Do not pass a failing pitch downstream. Treat warns as advisory.

6. **Strip-test it yourself:** remove every company name. If the authority
   collapses, rewrite before continuing.

T3 shows get NO pitch (rubric). They are recorded for re-check only.

## Output per show

```
{
  "show_name", "host", "audience", "tier",
  "pitch_angle", "anchor_used", "booking_route",
  "draft_pitch", "status": "QUEUED - NOT SENT"
}
```

Hand the full list to `podcast-pipeline-writer`. This skill drafts. It never
contacts a host. Sending is always a manual human action on the shortlist.
