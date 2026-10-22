# Taha Zitane — Portfolio V2

A bespoke, multilingual infrastructure engineering portfolio, designed around **professional evidence, restrained interaction and technical depth**. **V2 is the canonical version on `main`**. The former V1 source has been replaced in the working tree; its old commits remain recoverable in Git history.

## Technology

- **Next.js / React 19 / TypeScript** with App Router
- **Tailwind CSS** foundation and extensive custom layout system (responsive 320px → large desktop)
- **Framer Motion** for subtle scroll reveals, with reduced-motion behavior
- **Three.js + React Three Fiber** for an interactive, lazily-loaded 3D network visualization (disabled on small screens and for reduced-motion preferences)
- **Three languages:** English `/`, French `/fr/`, Arabic `/ar/` with RTL presentation
- **Static export to `out/`** for reliable, inexpensive hosting on Cloudflare Pages. “Static export” here means no backend server is needed; React components, navigation, CSS and WebGL visualizations remain interactive in the browser.

## Primary portfolio design constraints

- The provided **real portrait** is used locally in `public/images/taha-portrait.webp`. It was recompressed without AI editing the person's identity.
- Showcase content is based on the owner's CV and public code. Internship experience is **not** represented as a fictional production case study, and lab plans are not labeled as completed test results.
- Display existing GitHub and LinkedIn accounts directly; no fake endorsements, metrics, senior titles or clients.
- Prioritize legibility, natural typography, diagrams and copy over visual noise.

## Local development

```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Production build

```bash
npm run check
# generated deployable site appears in out/
```

If install is blocked by a network-restricted environment, run these commands from an internet-enabled machine or Cloudflare's build environment. A TypeScript syntax-only check is not a substitute for an actual Next.js build.

## Cloudflare Pages — connect to GitHub

1. In Cloudflare dashboard, open **Workers & Pages**, create a **Pages** project and connect to GitHub.
2. Select repository `tahazitan/taha-zitane-portfolio` and production branch **`main`**.
3. Set **Framework preset** to `Next.js (Static HTML Export)` if offered; otherwise `None` with the values below.
4. Set build command to `npm run build`, build output directory `out` and project root to `/`.
5. Set `NODE_VERSION=22` in environment variables if your selected environment defaults to an older Node version.
6. Verify `/`, `/fr/`, `/ar/`, case-study pages and the email, GitHub and LinkedIn links on mobile and desktop.
7. **Important:** The old V1 used output directory `docs` and an empty build command. V2 requires `out` and `npm run build`. Change configuration when deploying V2. A Workers deployment is not the same as a Pages Git deployment.
8. Custom domains are optional. `pages.dev` and SSL are included on supported Cloudflare Pages free plans subject to the provider's usage limits and terms.

## Publication and technical evidence

The enterprise network lab source is a reproducible **code/configuration package**, but runtime verification is pending. The case study intentionally distinguishes planned validation from verified operation. All personal-lab case studies should be upgraded with actual sanitized configurations, logs, measurements and acceptance results after performing tests.

## Content editing

All localised copy, projects, statuses, links and work history live in `src/data/content.ts`. The portrait is `public/images/taha-portrait.webp`. The main visual direction and breakpoints live in `src/app/globals.css`.

## Canonical deployment checklist

- **Git branch**: `main`
- **Cloudflare Pages** (not Workers): Connect to GitHub and choose this repository.
- **Framework preset**: `None` (or `Next.js — Static HTML Export` only when offered with equivalent output).
- **Root directory**: `/` (repository root).
- **Build command**: `npm run build`.
- **Build output directory**: `out`.
- **Environment variable**: `NODE_VERSION=22` when needed.
- Check GitHub Actions, then Pages build, then real public URLs on desktop and mobile.
- The previously deployed Cloudflare **Worker** is a separate service: publishing Pages will not automatically replace or delete that Worker. Once this site is validated, remove the old service or switch your owned custom domain as appropriate.

## Portfolio roadmap

The project already includes an evidence-labeled selection of case studies and a timeline of six relevant professional roles/internships. The long-term goal is to add all suitable CV projects, reconstructed internship labs, advanced infrastructure operations, monitoring, NGFW, SOC and authorized pentesting case studies with reproducible implementation details and real test evidence. Keep personal labs distinct from workplace history, and do not publish confidential data.
