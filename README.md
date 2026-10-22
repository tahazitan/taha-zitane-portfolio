# Taha Zitane — Systems, Networks & Cybersecurity Portfolio

Multilingual (EN / FR / AR) Next.js portfolio with interactive 3D network diagrams and technical case-study pages.

## Requirements

- Node.js 22+
- npm

## Local development

```bash
git clone https://github.com/tahazitan/taha-zitane-portfolio.git
cd taha-zitane-portfolio
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build & test

```bash
npm run check
```

`npm run check` runs TypeScript checks, a production build and static-output smoke tests. `npm run build` writes the deployable static site to `out/`.

## Cloudflare Workers deployment

The site uses **static assets**, not a Next.js server or OpenNext adapter.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Assets directory | `./out` (in `wrangler.jsonc`) |
| Node.js | `22` |

Live URL: https://taha-zitane-engineering.zitanet44.workers.dev/

## Project structure

```text
src/app/                Next.js routes, SEO metadata, global CSS
src/components/         UI, 3D/2D network visualizations and case studies
src/data/               Translations, professional content, lab topologies
public/images/          Portrait
public/meta/            Icons and social sharing image
public/contact/         Downloadable vCard
scripts/                Source, topology, export and smoke checks
.github/workflows/      CI build and browser checks
wrangler.jsonc          Cloudflare static-asset configuration
```

## Editing

- Site text and project summaries: `src/data/content.ts`, `src/data/additionalProjects.ts`
- Education and training: `src/data/professional.ts`
- Project evidence and network models: `src/data/enterpriseCase.ts`, `src/data/projectReviews.ts`, `src/data/labTopologies.ts`
- 3D engineering scenes: `src/components/TopologyCanvas.tsx`; hand-authored hero schematic: `src/components/NetworkBackdrop.tsx`
- Responsive styling: `src/app/globals.css`

The security and infrastructure diagrams represent **documented labs or reference architectures**, not verified production deployments. Never commit credentials, client data or sensitive network configurations.


## V4.1 — human-directed visual engineering

The public site is a professional portfolio, **not** a live SOC or fake demonstration dashboard.
The synthetic SOC desk and tutorial-style diagnostic demo were removed from the homepage in response to a design review.

The hero renders the user's **original portrait** from `public/images/taha-portrait.webp` in a native HTML image. No 3D scene overlays the face. The hand-built animated SVG network architecture directly below the portrait is intentionally separate from the 3D atlas.

The new `EquipmentGallery` uses seven custom SVG engineering illustrations (Cisco-inspired switching and routing, FortiGate-style and Palo Alto-style firewall appliances, Windows Server racks, Linux systems and a GNS3 topology board). These are **illustrative equipment classes**, not photographs of actual owned hardware or claims about specific commercial products. Each illustration has a trilingual functional explanation and a link to a related case study.

The case-study 3D viewer still links to a project when rendered on the homepage; in a project detail page, the self-link has been replaced with a non-interactive overview label.

Every page is statically exported for Cloudflare Workers; no live device connections, private network exports or backend claims.

## QA and deployment

Install dependencies with `npm install`, then run `npm run check`. GitHub Actions runs the production build, source and topology audits, checks 27 localized case-study routes, and launches real Chromium integration tests for photo decoding and viewport visibility, project search, 2D/3D navigation, technical equipment selection, and RTL mobile layouts.

Do not describe the Cloudflare-hosted URL as updated until its deployment has been confirmed separately. The source repository is wired to Workers Static Assets via `wrangler.jsonc` with `assets.directory=./out`.
