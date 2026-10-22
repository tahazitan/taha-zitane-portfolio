# Cloudflare Workers — Static Assets deployment

Canonical repository: `tahazitan/taha-zitane-portfolio`; branch: `main`.

This Next.js App Router portfolio uses `output: "export"`, which produces the static `out/` folder. All Three.js interactions run on the **client**. The app does not need OpenNext runtime or server-side Next.js routes.

## Existing Workers Git build

- Git branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Wrangler repository file: `wrangler.jsonc`
- Assets directory in that file: `./out`
- Appropriate Node.js version: 22 or newer (Node 22 is tested by GitHub Actions).
- Do not set Worker output directory to `.next`; do not invoke an automatic OpenNext migration.

If configuring **Pages** rather than Workers, set the output directory to `out`, build command `npm run build`, root to repository root and framework preset `None`.

## Production QA checklist

- [ ] GitHub Actions reports success for the deployed SHA.
- [ ] Cloudflare Build and Deploy phases report success for the same SHA.
- [ ] English `/`, French `/fr/`, Arabic `/ar/` load in a new incognito session.
- [ ] Each of the 8 case studies loads in each language.
- [ ] 3D canvas displays when WebGL is supported, and a readable diagram is visible without WebGL or with reduced motion.
- [ ] Mobile widths 360px, 390px, 768px and desktop 1440px have no unwanted horizontal scrolling.
- [ ] Portrait loads with correct identity and without distortion.
- [ ] All buttons, links and keyboard-accessible device selectors work.
- [ ] GitHub and LinkedIn links point to the current official accounts.
- [ ] Search metadata, `robots.txt` and social sharing preview work.

Cloudflare external deploy status **cannot** be established merely from a passing GitHub Actions build. Review the real deployment and visit its public `workers.dev` URL before announcing publication.
