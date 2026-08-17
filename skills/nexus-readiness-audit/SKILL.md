---
name: nexus-readiness-audit
description: B2B deliverable. Audits a corporate client's current AI/agent setup against the NEXUS enterprise reference architecture (9 divisions, 7 phases, 6 quality gates, 5 success metric categories). Produces a scored gap-analysis report with prioritised roadmap. Trigger when running discovery for a corporate AI advisory engagement, scoping a workshop, or producing a paid readiness assessment ($3K-10K).
argument-hint: [client-name | --interview | path-to-intake-doc]
---

# Skill — NEXUS Readiness Audit

> Score a corporate client's AI / agent setup against NEXUS reference architecture. Produce gap analysis + prioritised roadmap. Standard B2B advisory deliverable.

---

## When to use

- Discovery call for corporate AI advisory engagement
- Scoping call for B2B workshop (3-7 day audit before workshop)
- Paid standalone readiness assessment ($3K-10K offer)
- Pre-sales qualification (prospect asks "are we ready for agents?")

**Do not use for:** solo founders (use `contracts.md` template instead), ICP B2C women entrepreneurs (overkill).

---

## Inputs needed

Choose one input mode:

### Mode A — Interview (live discovery call)
Run the 24 questions in `Step 2`. Capture answers in `intake.md`.

### Mode B — Document dump
Client provides:
- Current org chart
- AI tool inventory (ChatGPT seats, Claude, Copilot, internal builds)
- Existing agent files (if any)
- Process docs / SOPs
- Last 3 AI project post-mortems (if any)

### Mode C — Hybrid
Doc dump + 30-min clarification call.

---

## Process

### Step 1 — Confirm scope

Ask user:
1. Client name + industry?
2. Team size (engineering / design / marketing / product / ops)?
3. Mode A / B / C?
4. Output format: PDF report (most common, formal) OR live readout (interactive workshop)?
5. Audit depth: Light (1h, 6 questions) / Standard (4h, 24 questions) / Deep (2 days, all 113 NEXUS agents mapped)?

Default: Standard + PDF.

### Step 2 — Intake (24 questions across 6 dimensions)

Save answers to `intake.md` in client project folder.

#### Dimension 1 — Pipeline maturity (4 questions)
1. Do you have a documented end-to-end product/service delivery pipeline?
2. Are quality checkpoints (gates) defined between stages?
3. Are handoffs between teams formalised (templates / artifacts)?
4. Do you measure first-pass quality rate per stage?

#### Dimension 2 — Agent / AI footprint (4 questions)
5. How many distinct AI agents / assistants / bots are in production?
6. Are they coordinated (orchestrator) or independent?
7. Is there an inventory / registry of agents?
8. Who owns each agent (named human + escalation path)?

#### Dimension 3 — Governance (4 questions)
9. Is there a written contract document (who decides what)?
10. Are decision rights mapped per territory?
11. Are escalation paths defined (when sub-agent exits scope)?
12. Are conflicts between agents/teams resolved by written rule or ad-hoc?

#### Dimension 4 — Quality (4 questions)
13. Is QA evidence-based (screenshots, logs, test runs) or claim-based?
14. Are retry limits defined (e.g. max 3 attempts before escalation)?
15. Is "default verdict NEEDS WORK" enforced for production gates?
16. Are critical bugs blocking release tracked + zero-tolerance enforced?

#### Dimension 5 — Operations (4 questions)
17. Is system uptime > 99.9%?
18. Mean time to recovery (MTTR)?
19. Deployment frequency?
20. Incident on-call rotation defined?

#### Dimension 6 — Business alignment (4 questions)
21. Are agent/AI projects scored on business KPIs (revenue, retention, NPS)?
22. Is portfolio ROI > 25% measured?
23. Stakeholder satisfaction > 4.5/5?
24. Quarterly review cadence in place?

### Step 3 — Score against NEXUS

For each dimension, score 0-5:
- **0** = Absent / not considered
- **1** = Aware but not implemented
- **2** = Partial / informal
- **3** = Implemented for some teams
- **4** = Implemented org-wide, not measured
- **5** = Implemented + measured + improving

Total: 0-30. Map to readiness band:

| Score | Band | Description |
|-------|------|-------------|
| 0-6 | **Pre-NEXUS** | No agent infrastructure. Workshop on basics needed first. |
| 7-12 | **Emerging** | Scattered agents, no orchestrator. NEXUS-Micro entry point. |
| 13-18 | **Operational** | Multiple agents, weak governance. NEXUS-Sprint adoption ready. |
| 19-24 | **Mature** | Orchestrated, gated. NEXUS-Full cycles possible. Optimise for scale. |
| 25-30 | **Advanced** | Beyond NEXUS baseline. Consult on novel patterns. |

### Step 4 — Map gaps to NEXUS divisions

For each NEXUS division (9 total), assess client coverage:

| Division | Has equivalent? | Maturity | Gap | Recommendation |
|----------|-----------------|----------|-----|----------------|
| Engineering | Y/N | 0-5 | (text) | (action) |
| Design | Y/N | 0-5 | ... | ... |
| Marketing | Y/N | 0-5 | ... | ... |
| Product | Y/N | 0-5 | ... | ... |
| Project Management | Y/N | 0-5 | ... | ... |
| Testing | Y/N | 0-5 | ... | ... |
| Support | Y/N | 0-5 | ... | ... |
| Spatial Computing | Y/N | 0-5 | ... | ... |
| Specialized | Y/N | 0-5 | ... | ... |

### Step 5 — Map gaps to 7 NEXUS phases

For each phase, assess:
- Does client have a process for this phase? Y/N
- Is it AI-augmented or human-only?
- What is the bottleneck?

Phases:
0. Discovery / Intelligence
1. Strategy / Architecture
2. Foundation / Scaffolding
3. Build / Iterate
4. Quality / Hardening
5. Launch / Growth
6. Operate / Evolve

### Step 6 — Map gaps to 6 NEXUS quality gates

| Gate | Client has equivalent? | Gate keeper named? | Pass criteria documented? |
|------|------------------------|-------------------|--------------------------|
| Discovery → Strategy | Y/N | Y/N | Y/N |
| Strategy → Foundation | Y/N | Y/N | Y/N |
| Foundation → Build | Y/N | Y/N | Y/N |
| Build → Harden | Y/N | Y/N | Y/N |
| Harden → Launch | Y/N | Y/N | Y/N |
| Launch → Operate | Y/N | Y/N | Y/N |

### Step 7 — Generate prioritised roadmap

Top 3 gaps (highest impact × lowest effort first):
1. [Gap] → [Recommended action] → [Effort: S/M/L] → [Impact: 1-5]
2. ...
3. ...

Plus next 3 (medium-term, 3-6 months):
4-6. ...

Plus next 3 (long-term, 6-12 months):
7-9. ...

### Step 8 — Compose report

Use `output_template` below. Save as PDF via `make-pdf` skill.

File: `builds/outputs/b2b-audits/<client-name>_nexus-readiness_<DD-MM-YYYY>.pdf`

### Step 9 — Propose follow-up offer

Based on band:
- Pre-NEXUS / Emerging → propose Workshop ($3-5K)
- Operational → propose Workshop + Sprint adaptation ($10-15K)
- Mature → propose Adaptation kit ($15-30K)
- Advanced → propose ongoing advisory retainer ($5K/mo)

Include in report final section: "Recommended Next Step".

---

## Output template

```markdown
# NEXUS Readiness Audit
## [Client Name]
### [DD/MM/YYYY]

---

## Executive Summary
- Overall readiness: **[X/30]** — Band: **[Pre-NEXUS / Emerging / Operational / Mature / Advanced]**
- Top 3 gaps: [bullets]
- Recommended next step: [Workshop / Sprint / Adaptation / Advisory]
- Investment range: [$X-Y]

---

## 1. Methodology
[2 paragraphs — what NEXUS is, how scored]

## 2. Dimension Scores
[Table: 6 dimensions × 0-5]

## 3. Division Coverage
[Table: 9 divisions × Y/N + maturity + gap]

## 4. Phase Coverage
[Table: 7 phases × Y/N + AI-augmented + bottleneck]

## 5. Quality Gate Coverage
[Table: 6 gates × Y/N + gate keeper + criteria]

## 6. Prioritised Roadmap
### Quick wins (0-3 months)
1. ...

### Medium-term (3-6 months)
4. ...

### Long-term (6-12 months)
7. ...

## 7. Recommended Next Step
[Workshop / Sprint / Adaptation / Advisory — with scope, deliverables, investment]

## 8. Appendix — NEXUS reference
[1-page primer on NEXUS pattern + link to public Anthropic Building Effective Agents]
```

---

## Rules

- Never fabricate scores. If client cannot answer a question, mark as "Not assessed" and flag.
- Never recommend NEXUS-Full to a Pre-NEXUS client (they need basics first).
- Never quote a fixed price without scoping call. Use ranges.
- Always include the public Anthropic reference (credibility).
- Always sign the report with Fatiha Chikh / Shift & Lead branding (DESIGN.md tokens applied).
- Save raw intake answers separately from final report (privacy).

---

## Examples

### Example 1 — Pre-NEXUS client (insurance company, 200 people)
- Score: 4/30
- Band: Pre-NEXUS
- Recommendation: Foundations workshop ($3K) before any agent work

### Example 2 — Operational client (SaaS scaleup, 80 people)
- Score: 16/30
- Band: Operational
- Recommendation: Sprint adaptation ($12K) + 3-month advisory ($5K/mo)

### Example 3 — Mature client (fintech, 300 people)
- Score: 22/30
- Band: Mature
- Recommendation: Full adaptation ($25K) + quarterly governance review

---

## Related

- `agents/_reference-enterprise/nexus/README.md` — bundle context
- `agents/_reference-enterprise/nexus/nexus-strategy.md` — full doctrine
- `contracts.md` — solo-founder governance variant (for reference / contrast)
- `departments/sales/CLAUDE.md` — how to position this offer
- `skills/make-pdf/SKILL.md` — output formatting
