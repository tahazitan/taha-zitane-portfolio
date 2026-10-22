# Taha Zitane · Professional IT Portfolio

**English · Français · العربية — طه زيطان**

Professional portfolio focused on network and systems administration, technical support, infrastructure engineering and security-minded design. The brand and UI use a custom **TZ routed-monogram**, the owner's unmodified portrait, and an accessible interactive **3D network architecture explorer**.

**Public website:** https://taha-zitane-engineering.zitanet44.workers.dev/

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Three.js / React Three Fiber (interactive equipment models, topology routes, selective traffic walkthroughs)
- Framer Motion, Tailwind base + hand-authored responsive design system with warm ivory, deep petrol, teal and terracotta
- Static Next.js export (`out/`) for Cloudflare Workers Static Assets (no fake API or backend service)
- SEO: locale-specific titles, descriptions, canonical URLs, hreflang, sitemap, Person JSON-LD and branded sharing preview; accessible contact VCard
- WebGL fallback: accessible SVG topology, device inspector and reduced-motion support

## Build and deploy

```bash
npm install
npm run check
```

The production GitHub Actions workflow validates TypeScript, builds the export, checks all localized routes and smoke-tests rendered anchor destinations and contact assets. The `.github/workflows/next-ci.yml` workflow runs on pushes and pull requests.

Cloudflare Workers Git integration:

| Setting | Value |
|---|---|
| Branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Static assets | `./out` (defined in `wrangler.jsonc`) |
| Node.js | 22 |

The production deployment is a Workers Static Assets deployment, not an OpenNext Worker. For more information see `docs/DEPLOY-CLOUDFLARE.md`.

## Content and professional boundaries

All 3 languages use the same case-study slugs and structure; source records live in `src/data/content.ts`, `additionalProjects.ts`, `enterpriseCase.ts`, and `professional.ts`. A case study may represent a **real internship/support assignment** or a **reference engineering architecture**, and those are not interchangeable. Network packets animated on the site illustrate design paths; they are not runtime routing evidence. No confidential employer data or unverified production metrics are published.

The enterprise case models **HQ + 2 branches + remote staff** with segmented VLANs, DMZ and firewalls, site-to-site/remote VPN, Windows identity, Linux/Docker workloads, monitoring/SIEM and backup. It includes design trade-offs, proposed acceptance checks and walkthroughs. Actual lab results should be incorporated only after independent practical implementation.

## Structure

- `src/components/BrandMark.tsx` — custom TZ monogram, also `public/meta/mark.svg`
- `src/components/ProjectExplorer.tsx` — live search and professional/architecture category filters; case-study deep links and source links use separate actions
- `src/components/ProjectGraphic.tsx` — eight bespoke, semantic SVG engineering diagrams (no AI-rendered fake screenshots)
- `src/components/EnterpriseBlueprint.tsx` — clickable, explicitly labeled 2D enterprise zone architecture, coexisting with 3D
- `src/components/DesignReview.tsx` and `src/data/projectReviews.ts` — objectives, engineering decisions, constraints and proposed verification for each case study
- `public/contact/taha-zitane.vcf` — importable contact details; telephone, email, LinkedIn and GitHub are distinct working links
- `public/meta/portfolio-social.png` — branded social sharing card
- `src/components/TopologyCanvas.tsx` — 3D equipment, paths and packets
- `src/components/TopologyFallback.tsx` — accessible 2D schematic
- `src/components/TopologyStudio.tsx` — interactive network explorer and inspector
- `src/data/labTopologies.ts` — reference network graphs and proposed traffic flows
- `src/data/topologyDescriptions.ts` — device roles and translations
- `src/data/professional.ts` — formal education, coursework and named training attestations
- `src/app/sitemap.ts` — locale-specific SEO URLs
- `src/app/globals.css` — responsive visual design system, accessible focus states, natural portrait display and detailed mobile/tablet layouts
- `scripts/site-smoke.mjs` — output-level link, anchor, locale, contact and metadata smoke checks

Internal personal learning and career plans are not part of the public website or repository.

## Interaction design and deployment constraints

Project cards are searchable and filterable without server calls. The URL and case-study metadata remain static, crawlable and shareable. Contact actions rely on native mail, telephone and vCard functionality: there is no contact form that falsely claims server-side delivery. Use a real backend only for a future feature requiring secured storage, transactional submission or authentication.

The portrait is the original user-provided image. Exposure and framing are adjusted by CSS at render time without changing the subject or fabricating photographic content. 3D is elective on mobile, with a usable 2D schematic, node inspector and keyboard-selectable controls.
