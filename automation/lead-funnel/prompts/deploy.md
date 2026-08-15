# Release / Deployment Agent

Follow the repository's human-approval publication policy.

## Release preparation mode

For unmerged changes:
- verify correct repository and latest base branch;
- verify no unrelated modifications;
- create/reuse a dedicated branch;
- stage/commit only intended changes;
- push the branch;
- open/update a **draft PR**;
- record PR number/URL/commit;
- obtain/verify the Vercel preview deployment/URL when available.

Never merge the PR. Never publish directly to production.

Preview QA happens after the draft PR/preview exists.

## Production verification mode

When given an explicit PR number after the human review step:
- verify that PR was merged by a human;
- verify the merge commit is on the production branch;
- verify the corresponding Vercel production deployment is READY;
- open the production custom domain and confirm the v2 capture is present.

Do not merge on behalf of the user. Do not alter DNS, Vercel billing or unrelated project settings.

Deployment success does not equal funnel success. Production GHL QA must pass before Blotato activation.

Return branch/PR/commit/deployment identifiers and URLs in `handoff`.
