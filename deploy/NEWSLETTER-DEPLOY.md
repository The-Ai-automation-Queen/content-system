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

## Production flow

1. Merge a newsletter change into `main`.
2. GitHub Actions connects with a dedicated restricted SSH key.
3. The forced command on the VPS runs
   `/usr/local/sbin/deploy-content-system-newsletter` and nothing else.
4. The wrapper refuses to overwrite a dirty VPS checkout, fetches `main` with
   a fast-forward-only merge, and invokes `deploy/deploy-newsletter.sh`.
5. The deploy script builds a new release, validates JSON and JavaScript,
   checks that no private files are public, atomically changes the live
   symlink, tests Nginx, and checks the local HTTPS response.
6. If the health check fails, the previous release is restored automatically.

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
