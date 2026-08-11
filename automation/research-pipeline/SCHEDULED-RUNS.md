# Scheduled Runs

These are the operating contracts for the ChatGPT scheduled tasks. The tasks use GitHub as the source/state store and must remain idempotent.

## 1. Research Inbox Watch — hourly condition watch

- Read `automation/research-pipeline/state/research-cursor.json` from `content-system`.
- List commits in `The-Ai-automation-Queen/research-inbox` newer than `last_seen_commit`.
- If none, do nothing and do not notify.
- For each new commit, inspect changed capture files and add a compact record to `queues/triage.json` if its source id is not already processed/queued.
- Record source commit, filename, source type, date, stored metadata, a one-line business translation and whether urgent/time-sensitive.
- Update `last_seen_commit` and `last_seen_commit_at` only after the queue write succeeds.
- Do not score fully, cluster, draft or publish here.
- Cap at the configured hourly maximum; leave overflow for the next run.
- Notify only on a persistent connector/state error or a genuinely urgent item whose usefulness may expire within 24 hours.

## 2. Daily Editorial Factory — every morning

- If `bootstrap_status` is `pending`, process the recent bootstrap window from `bootstrap_since` through the seeded `last_seen_commit`; do not process the full historical inbox. When complete, mark bootstrap `complete` and record the source ids.
- Process pending triage items using `skills/research-router/SKILL.md` and `config/pipeline.json`.
- Merge related items into durable clusters rather than creating a cluster per capture.
- Update `queues/clusters.json` and `queues/opportunities.json`.
- For strong opportunities (normally score >= 80) with no hard blocker, create/update a guide/funnel brief using `skills/guide-architect/SKILL.md` and mark the opportunity `brief_ready_for_approval`.
- Do **not** create the full guide unless its opportunity is explicitly present in `queues/approved.json` with `status: "approved_to_build"`.
- Regenerate `EDITORIAL-DASHBOARD.md` after meaningful state changes.
- Produce `automation/research-pipeline/reports/daily-YYYY-MM-DD.md` containing: files triaged, clusters changed, strong guide candidates, LinkedIn angles, lead-magnet opportunities, paid/B2B signals, items killed, and items needing more research.
- Notify with a concise decision brief only when there is at least one strong opportunity or blocker that requires the operator.

## 3. Weekly Content Plan — Monday morning

- Read the current clusters/opportunities, recent research, existing guide library, `content-vault.md`, current offers and approved queue.
- Build one coherent weekly theme from accumulated signal rather than the latest shiny object.
- Create `automation/research-pipeline/reports/weekly-YYYY-MM-DD.md` with a 5-day plan:
  - authority/opinion post
  - practical demo/result post
  - open guide or guide update
  - proof/behind-the-scenes post
  - contextual lead-magnet or conversion post
- Every item must point back to a cluster/opportunity and specify its CTA.
- Prefer themes that can create a content → guide → companion asset → paid path.
- Do not publish or merge.
- Notify the operator with the weekly plan summary.

## 4. Research Build & QA — hourly condition watch

This task combines the previously separate Approved Draft Builder and Publish & QA Watch.

### Phase A — approved build

- Read `queues/approved.json`, `config/status-model.json`, opportunities, briefs and cited research.
- If there is no item with `status: "approved_to_build"`, skip the build phase silently.
- Process one approved opportunity at a time.
- Set the queue item to `building` before substantive work.
- Create/reuse branch `research/<opportunity-id>` from latest `main`.
- Build only the explicitly approved artifacts using `skills/guide-builder/SKILL.md` and, when approved, `skills/lead-magnet-builder/SKILL.md`.
- Keep the public guide open; companion assets may exchange value for email.
- Use one terminology system, one primary CTA, no decorative hero image and no unsupported/time-sensitive claims.
- Run `skills/editorial-qa/SKILL.md`.
- Open or refresh a draft PR titled `Research guide: <outcome-first title>`.
- Store branch, PR number/url and QA verdict in `queues/approved.json`.
- Mark `pass_for_human_review` only after QA passes; otherwise use `needs_decision` for evidence/product/brand blockers.
- Never merge the PR.

### Phase B — open PR QA

- Search `content-system` for open research-derived PRs.
- Re-run editorial/evidence/funnel/visual/accessibility/forms/functional QA.
- Fix implementation defects on the same branch when doing so does not require invented evidence or business decisions.
- Leave a clear PR comment and set `needs_decision` when human input is required.
- Never merge or auto-approve by merging.

### Phase C — post-merge production QA

- When a human merges a research-derived PR, mark `merged_by_human` and wait for the relevant Vercel production deployment.
- Verify the real custom domain, not only source or preview output.
- Confirm outcome-first title, terminology consistency, no duplicate sections, correct links, one form POST, successful lead-magnet unlock, accessibility-critical markup/contrast, no unnecessary decorative article image, reduced-motion support where relevant, truthful CTA/product state and no stale AI Insider Brief CTA.
- Mark `production_verified` only after all live checks pass.
- Regenerate `EDITORIAL-DASHBOARD.md` after every material state transition.
- Notify only when a PR reaches `PASS_FOR_HUMAN_REVIEW`, a human decision is required, or production has been verified.
