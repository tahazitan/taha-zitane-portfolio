# Cloudflare production publishing: Taha Zitane portfolio

## What was wrong

GitHub's `.github/workflows/next-ci.yml` runs tests and exports static files, but **does not publish them** to the live Worker. A green GitHub Actions badge only proves the code built, not that Cloudflare updated.

## Production target

- Repository: `tahazitan/taha-zitane-portfolio`
- Branch: `main`
- Worker: `taha-zitane-engineering`
- URL: `https://taha-zitane-engineering.zitanet44.workers.dev/`
- Framework: Next.js with `output: "export"`
- Output: `out/`
- Deployment configuration: `wrangler.jsonc`, uses `assets.directory="./out"`

The `Publish portfolio to Cloudflare Workers` GitHub Actions workflow is responsible for deploying the built `out/` folder when `main` changes.

## One-time credentials (do not commit them)

In GitHub > this repository > **Settings > Secrets and variables > Actions** add the following **repository secrets**:

1. `CLOUDFLARE_API_TOKEN`: a Cloudflare API token scoped to this account, with Workers Scripts editing permission. Use minimum appropriate permissions.
2. `CLOUDFLARE_ACCOUNT_ID`: the account ID shown in the Cloudflare dashboard.

Do **not** commit tokens, create public issues containing tokens, or send keys in chat. GitHub Secrets keeps these values out of the repository.

Then visit **GitHub > Actions > Publish portfolio to Cloudflare Workers > Run workflow** (branch `main`). The workflow must show **success**, especially at the “Publish static assets to Workers” step. If secrets are missing it will fail with an explicit explanation, rather than falsely implying the site is live.

## If you already have Cloudflare Git deployments

In Cloudflare, inspect **Workers & Pages > taha-zitane-engineering > Deployments > Settings/Builds**. Make sure the connected Git repository is `tahazitan/taha-zitane-portfolio` and production branch is `main`. A similarly named repository for the private Studio is **not** the public portfolio. Avoid having two pipelines deploy different projects to the same Worker.

The new workflow deploys directly through Wrangler; you do not need a second automatic Cloudflare Git deployment for the same Worker.

## Verification checklist

1. GitHub Actions **Portfolio — build, SEO and localized routes** is green.
2. GitHub Actions **Publish portfolio to Cloudflare Workers** is green on the latest `main` SHA.
3. Cloudflare dashboard shows a deployment for `taha-zitane-engineering` made after the commit.
4. Check the public URL using a private/incognito browser window and hard reload.
5. Verify homepage (Studio-inspired violet header), FR, AR, projects and their detail pages, services, and the 3D scene on desktop/mobile.

**Important:** A successful GitHub build is not proof of a Cloudflare deploy. A successful Wrangler deploy is not proof that a third-party browser loaded every asset. Both should be checked separately.
