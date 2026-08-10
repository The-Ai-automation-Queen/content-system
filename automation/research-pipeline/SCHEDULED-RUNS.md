# Scheduled Runs

These are the operating contracts for the ChatGPT scheduled tasks. The tasks use GitHub as the source/state store and must remain idempotent.

## 1. Research Inbox Watch — hourly condition watch

- Read `automation/research-pipeline/state/research-cursor.json` from `content-system`.
- List commits in `The-Ai-automation-Queen/research-inbox` newer than `last_seen_commit`.
- If none, do nothing and do not notify.
- For each new commit, inspect changed capture files and add a compact record to `queues/triage.json` if its source id is not already in `processed_source_ids`.
- Record source commit, filename, source type, date, stored metadata, a one-line business translation and whether urgent/time-sensitive.
- Update `last_seen_commit` and `last_seen_commit_at` only after the queue write succeeds.
- Do not score fully, cluster, draft or publish here.
- Cap at the configured hourly maximum; leave overflow for the next run.
- Notify only on a persistent connector/state error or a genuinely urgent item whose usefulness may expire within 24 hours.

## 2. Daily Editorial Factory — every morning

- If `bootstrap_status` is `pending`, process the recent bootstrap window from `bootstrap_since` through the seeded `last_seen_commit`; do not process the full historical inbox. When complete, mark bootstrap `complete` and record the source ids.
- Process all pending triage items using `skills/research-router/SKILL.md` and `config/pipeline.json`.
- Merge related items into durable clusters rather than creating a cluster per capture.
- Update `queues/clusters.json` and `queues/opportunities.json`.
- For strong opportunities (normally score >= 80) with no hard blocker, create/update a guide/funnel brief using `skills/guide-architect/SKILL.md`.
- Do **not** create the full guide unless its opportunity is explicitly present in `queues/approved.json`.
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

## 4. Approved Draft Builder — hourly condition watch

- Read `queues/approved.json`.
- If there is no item with `status: "approved_to_build"`, do nothing and do not notify.
- For each approved item, read its opportunity, brief, cited research sources and `skills/guide-builder/SKILL.md`.
- Create/reuse branch `research/<opportunity-id>` from the latest `main`.
- Build the guide or guide update, contextual lead magnet/resource and required metadata/library changes on that branch only.
- Run `skills/editorial-qa/SKILL.md` before opening/refreshing the draft PR.
- Open a draft PR titled `Research guide: <outcome-first title>` and include the opportunity id, brief path, source ids, companion asset and QA verdict in the PR body.
- Never merge the PR.
- Update the approved queue item to `status: "pr_open"` with PR number/url after the draft PR exists.
- Notify when the PR reaches `PASS_FOR_HUMAN_REVIEW` or when evidence/product decisions block completion.

## 5. Publish & QA Watch — hourly condition watch

- Search `content-system` for open/merged PRs created from approved research opportunities.
- For open draft PRs, run `skills/editorial-qa/SKILL.md`. If fixable, update the branch; if blocked by evidence/product decision, leave a clear PR comment and notify.
- Never approve by merging the PR yourself.
- When a human has merged a research-derived content PR, wait for the relevant Vercel production deployment.
- Verify the real custom domain, not just source files or preview HTML.
- Confirm titles, terminology, links, forms, lead-magnet unlock, accessibility-critical markup, no duplicate POST, no unnecessary decorative article image, reduced-motion support where relevant, and no stale Brief CTA.
- Notify only after production is verified or when a non-quota blocker needs a human decision.
