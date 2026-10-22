# Taha Zitane — Systems, Networks & Cybersecurity Portfolio

Multilingual (EN / FR / AR) Next.js portfolio with source-grounded network architecture and professional case studies.

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
src/components/         UI, source-linked diagrams and case studies
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
- Source-backed network diagram: `src/components/SourceTopology.tsx`
- Responsive styling: `src/app/globals.css`

The security and infrastructure diagrams represent **documented labs or reference architectures**, not verified production deployments. Never commit credentials, client data or sensitive network configurations.


## V4.2 — source-backed technical presentation

The public portfolio deliberately does **not** display fabricated GNS3 screenshots, AI-generated hardware renders, or unsourced vendor equipment photographs. The genuine user portrait is the only owner-provided photograph currently available in the repository. Four clearly attributed, openly licensed third-party photos/screenshots are shown as **representative** solution imagery; they are not user deployment evidence.

The `SourceTopology` view includes two documented topology files owned by this GitHub account:

- Base topology: https://github.com/tahazitan/enterprise-network-lab/blob/main/topology.clab.yml
- Secure profile: https://github.com/tahazitan/enterprise-network-lab/blob/main/secure/topology.secure.clab.yml

The source-linked diagram reproduces exactly five nodes/four connections in the base YAML and seven nodes/six connections in the secure YAML, including matching endpoints and router/switch roles. It is **Containerlab**, not GNS3; no photographed equipment, running GNS3 canvas, measured routing success or verified live tests are implied.

The eight case studies are displayed as clean editorial text cards. A separate Solutions gallery displays license-credited real Cisco-switch and FortiGate photography, server rack imagery and a genuine Wireshark screenshot from Wikimedia Commons, without implying that these assets were captured from personal labs. The former placeholder equipment-gallery art, conceptual 3D topology and unverified project thumbnails are removed from the live page. Case-study technical analysis remains available.

### Media acceptance rule

Only add a real photograph, screenshot or diagram when the source is traceable, its reuse is permitted, the subject is relevant, and the image can be accurately captioned. Vendor product photographs must be labeled as **representative product imagery** rather than user-owned or deployed equipment. A GNS3 topology screenshot must come from an actual GNS3 project file; do not relabel Containerlab, Packet Tracer, Excalidraw or AI artwork as GNS3.

Suggested source hierarchy: own screenshots from practical labs; official vendor image libraries with explicit reuse permission; appropriately licensed Wikimedia Commons photos. Record creator, URL, license and modifications before importing. Never include secret IPs, personal identifiers, customer screenshots or unauthorised configuration exports.

See `docs/REAL-MEDIA-SOURCES.md` for the source register and acceptance checklist.

### Build

The project remains static Next.js for Cloudflare Workers; run `npm run check`. GitHub Actions runs source and graph checks, static export, link and Chrome browser tests covering source-linked topology profiles, CV/contact, RTL and mobile responsiveness. A passing build is not proof that Cloudflare has already deployed it.
