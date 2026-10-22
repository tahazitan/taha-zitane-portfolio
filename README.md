# Taha Zitane · Professional IT Portfolio

**English · Français · العربية — طه زيطان**

Professional portfolio focused on network and systems administration, technical support, infrastructure engineering and security-minded design. The brand and UI use a custom **TZ routed-monogram**, the owner's unmodified portrait, and an accessible interactive **3D network architecture explorer**.

**Public website:** https://taha-zitane-engineering.zitanet44.workers.dev/

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Three.js / React Three Fiber (interactive equipment models, topology routes, selective traffic walkthroughs)
- Framer Motion, Tailwind base + hand-authored responsive design system
- Client-side static export (`out/`) for Cloudflare Workers Static Assets
- SEO: locale-specific titles, descriptions, canonical URLs, hreflang, sitemap, Person JSON-LD and branded sharing preview
- WebGL fallback: accessible SVG topology, device inspector and reduced-motion support

## Build and deploy

```bash
npm install
npm run check
```

The production GitHub Actions workflow validates TypeScript, builds the export and checks multilingual routes. The `.github/workflows/next-ci.yml` workflow runs on pushes and pull requests.

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
- `public/meta/portfolio-social.png` — branded social sharing card
- `src/components/TopologyCanvas.tsx` — 3D equipment, paths and packets
- `src/components/TopologyFallback.tsx` — accessible 2D schematic
- `src/components/TopologyStudio.tsx` — interactive network explorer and inspector
- `src/data/labTopologies.ts` — reference network graphs and proposed traffic flows
- `src/data/topologyDescriptions.ts` — device roles and translations
- `src/data/professional.ts` — formal education, coursework and named training attestations
- `src/app/sitemap.ts` — locale-specific SEO URLs
- `src/app/globals.css` — responsive design system, navy/cyan/coral palette

Internal personal learning and career plans are not part of the public website or repository.
