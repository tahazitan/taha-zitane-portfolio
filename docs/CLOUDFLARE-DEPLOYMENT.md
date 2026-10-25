# Cloudflare production: Taha Zitane portfolio

## Verified deployment — 25 October 2026

The **actual public Worker was successfully published** from the user's authorized Mac, using its existing Cloudflare Wrangler OAuth session. No API token was copied, exposed, or required in the repository.

- GitHub repository: `tahazitan/taha-zitane-portfolio`
- Published commit: `86f3bfa3ffe8fab53baad960cf5fa9a64d4d1889`
- Worker name: `taha-zitane-engineering`
- Cloudflare version: `a1698d9d-59f6-46fb-9ab5-5974e54c9b64`
- Production URL: https://taha-zitane-engineering.zitanet44.workers.dev/
- Build: Next.js static export, `npm run check`, assets from `./out`

The Worker reported a successful upload and deployment. The public server was independently checked using HTTP requests. The home page, French and Arabic home pages, services, experience, education, projects, enterprise project detail, logo and SVG assets returned HTTP 200; home HTML contains the actual Studio-style theme and service/career sections.

## Publishing architecture and important distinction

The normal `.github/workflows/next-ci.yml` action **only tests** the Next.js site. Green CI alone never proves a production deployment.

The `Publish portfolio to Cloudflare Workers` GitHub action was initially configured to run on every push. This failed because GitHub repository secrets were absent, **not because the Next.js code was broken**. Since the authorized Mac has an active Wrangler login, deployment was completed directly.

To avoid misleading red GitHub checks or a second pipeline fighting for the same Worker, `.github/workflows/cloudflare-deploy.yml` is now an **optional manual fallback**. It requires GitHub repository secrets if used. It does not run on push.

Cloudflare's version history showed deployments around recent GitHub merges, but the exact origin and continuous Git-connection settings must be checked under the Cloudflare dashboard **Workers & Pages > taha-zitane-engineering > Builds / Deployments** before assuming fully automatic publication. When Git integration is enabled, its production branch must be `main` and repository `tahazitan/taha-zitane-portfolio`, **not** Engineering Infrastructure Studio.

## Safe direct CLI publish from an authenticated machine

```bash
git clone --depth 1 --branch main https://github.com/tahazitan/taha-zitane-portfolio.git
cd taha-zitane-portfolio
npm install --no-audit --no-fund
npm run check
npx wrangler deploy
```

Wrangler already has a valid Cloudflare OAuth session on the user's authorized machine. Work in a **fresh checkout** to avoid overwriting local uncommitted changes. Never commit API tokens.

## Optional GitHub Actions deployment

If choosing to deploy via the **manual** GitHub workflow, configure repository secrets `CLOUDFLARE_API_TOKEN` (least-privileged token permitted to edit Workers) and `CLOUDFLARE_ACCOUNT_ID` via GitHub > Settings > Secrets and variables > Actions. The authorized machine CLI path needs neither of these secrets added to GitHub.

Avoid running multiple independent deployment pipelines to the same Worker without knowing which one is authoritative.

## Post-deployment verification

1. Check Cloudflare's deployments for a new version ID.
2. Visit the public portfolio (prefer private/incognito window or hard reload if the client has cached old assets).
3. Confirm homepage Studio-inspired violet/cobalt header, services and career sections.
4. Open `/fr/`, `/ar/`, `/services/`, `/education/`, `/experience/`, `/projects/` and the technical case pages.
5. Check that CSS and JS assets load and that interactive WebGL diagrams function on the devices you care about.

**Note:** HTTP 200 proves the endpoint serves the page, but it does not prove that every client-side 3D interaction was exercised in the live Cloudflare browser. Those flows were also covered by the repository's Chromium QA against the built static export.
