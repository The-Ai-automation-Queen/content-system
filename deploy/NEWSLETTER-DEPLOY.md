# Newsletter deployment

`content-system/main` is the source of truth for the AI Insider Brief public
site. A change under `ai-insider-brief/ai-insider-brief/` is deployed by the
GitHub Actions workflow in `.github/workflows/deploy-newsletter.yml`.

## What is deployed

Only the public allowlist is copied into a release:

- `index.html`, `app.js`, `styles.css`
- public images, favicons, `robots.txt`, `sitemap.xml`, and `llms.txt`
- `guides/` and non-runtime files under `data/`

The `pipeline/` directory, `CONTEXT.md`, `.env`, and `config.env` are never
copied into the web root.

The ConvertKit form key used by `app.js` is the public browser key required by
the subscribe endpoint. The private `KIT_API_SECRET` must remain in the VPS
runtime environment and must never be added to frontend code or this repo.

`briefs.json` is runtime state. The first deployment moves the live file to
`/var/lib/ai-insider-brief/briefs.json`; every release links to that stable
file. A code deployment therefore cannot erase newly generated cards.

The validated runtime state is mirrored back to this repository every hour by
`.github/workflows/mirror-newsletter-content.yml`. The workflow downloads the
public JSON over HTTPS, enforces size and schema limits, rejects any increase
in duplicate card IDs, and commits only `data/briefs.json` when its semantic
content changed.

The mirror uses GitHub's short-lived repository token with only
`contents: write`; no GitHub write credential is stored on the VPS. A commit
made with that token does not start another push workflow, so mirroring cannot
create a deployment loop. The VPS file remains the live runtime state while
the Git copy provides history and recovery.

## Production flow

1. Merge a newsletter change into `main`.
2. GitHub Actions connects with a dedicated restricted SSH key.
3. The forced command on the VPS runs
   `/usr/local/sbin/deploy-content-system-newsletter` and nothing else.
4. The wrapper refuses to overwrite a dirty VPS checkout, fetches `main` with
   a fast-forward-only merge, and invokes the public-site and newsletter-agent
   deployment scripts.
5. The deploy script builds a new release, validates JSON and JavaScript,
   checks that no private files are public, atomically changes the live
   symlink, tests Nginx, and checks the local HTTPS response.
6. If the health check fails, the previous release is restored automatically.

The agent deploy preserves `/root/ai-insider-brief-pipeline/.env`, its pending
approval queue, crawl state, and generated data. It updates only reviewed code
and baseline configuration, validates the selected LLM and local Ollama model,
then runs the Telegram approval bot as `insider-brief-bot.service`. Failed
service activation restores the previous code. Approval messages are released
in batches of at most ten, with at least fifteen minutes between backlog
batches, to prevent a restart from flooding Telegram.

### Editorial contract migration

Cards generated before editorial contract v2 must never be approved. After
deploying the v2 pipeline, review the dry-run count and then preserve them as
an evaluation set:

```bash
cd /root/ai-insider-brief-pipeline
node quarantine-legacy-pending.mjs
node quarantine-legacy-pending.mjs --apply
```

The apply command writes a full timestamped backup and a separate legacy
evaluation JSON under `evaluation/` before atomically replacing the active
queue. Old Telegram buttons are also rejected in code, so a delayed button
tap cannot publish a legacy verdict.

## Generated-content mirror

The mirror runs at minute 23 of every hour and can also be started from
**Actions → Mirror newsletter content to Git → Run workflow**.

If the public file is unavailable, empty, oversized, malformed, or introduces
additional duplicate IDs, the job fails without changing the repository. The
live newsletter and its publishing pipeline continue running; only the Git
snapshot is delayed until the next successful run.

Production releases are stored in `/var/www/ai-insider-brief-releases/`.
The active public path remains `/var/www/ai-insider-brief` so the existing
Nginx and pipeline paths do not change.

## Manual emergency deployment

Normal updates require no SSH. For an emergency, an administrator can run:

```bash
ssh -i ~/.ssh/agent_os_hostinger_ed25519 deploy@187.77.153.212
sudo /usr/local/sbin/deploy-content-system-newsletter
```

The command will stop safely if the VPS repository has uncommitted changes.
