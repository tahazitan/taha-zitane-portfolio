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
- 3D scenes: `src/components/NetworkScene.tsx`, `src/components/TopologyCanvas.tsx`
- Responsive styling: `src/app/globals.css`

The security and infrastructure diagrams represent **documented labs or reference architectures**, not verified production deployments. Never commit credentials, client data or sensitive network configurations.
