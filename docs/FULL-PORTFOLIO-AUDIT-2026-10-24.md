# Full portfolio design & engineering audit — 24 October 2026

## Scope & evidence
Repository: `tahazitan/taha-zitane-portfolio` (Next.js 15 static export, React 19, Three.js/R3F, Framer Motion). Evaluated the components and styles for the homepage, 6 top-level routes, 8 project case-study pages, 3 localizations (EN/FR/AR), navigation, portrait, technology marks, interactive topologies, progressive enhancements, and automated QA.

**Evidence boundary:** This is a source-code and automated Chromium audit of the exported build, **not** a live-site screenshot comparison of the production Cloudflare URL. The separate connected-browser inspection was unavailable, so it would be misleading to claim that production deployment or external visual appearance was confirmed. Preserve the original user's images and factual representations; no invented employment, certifications or lab test results.

## Findings, severity, and implemented work

| Priority | Finding (original code) | Remediation in this PR | Validation |
|---|---|---|---|
| P0 | `InfrastructureStage.tsx` gated WebGL behind `min-width: 900px`, forcing every phone into a CSS-only substitute regardless of GPU support | Width gate removed; capability-based WebGL check, same `NetworkWorld` on phone, fallback only for genuinely unavailable context | source audit + conditional Chromium device test |
| P0 | 3D scene camera at fixed distance and aspect ratio could crop endpoints on narrow screens | `CameraFit` updates projection and framing based on canvas dimensions, preserving real nodes and links | widths 320–1440 + mobile landscape test |
| P1 | Desktop-only pointer rotation; touch interactions could not intentionally inspect equipment | Horizontal touch orbit plus three labelled rotate/reset controls; viewport-independent inputs | rotation-state browser assertions |
| P1 | Existing mobile scene had smaller fixed 395px height, tiny controls and text | Larger 480–555px stage, responsive layer actions, touch-sized controls, improved typography and contrast | mobile QA, overflow regressions |
| P1 | Hero wiring graphic was forcibly hidden below 900px | Restored behind genuine portrait at refined opacity; never replace portrait with synthetic imagery | mobile CSS source audit |
| P1 | Mobile navigation lacked Escape-to-close, useful keyboard focus and localized menu labels | Menu is labelled in locale, moves keyboard focus, closes by Escape and outside click, shows current page | browser keyboard and route checks |
| P1 | No quick navigation back to top on long mobile case studies | Global unobtrusive contextual control connected to scroll state and reduced-motion preference | source audit + route smoke |
| P1 | Need identical professional treatment for every page, not merely homepage | Last-layer mobile-specific art direction applies to homepage, six section narratives, capability/service and evidence cards, case-study layouts, and language RTL | route count, case and per-locale viewport checks |
| P1 | Potential horizontal overflow from long technical vocabulary or diagrams | Constrained content, adapted touch/landscape behavior and screen-specific card layout without removing information | exact document overflow assertions |
| P2 | Existing accessibility requires reduced-motion while retaining content | R3F now renders static orientation for reduced-motion users without removing scene; same content and controls | source audit and motion preference styles |
| P2 | Need maintain high visual quality without immediate 3D load impact | Retain near-viewport lazy WebGL mount and DPR up to 2; provide nonblank static visualization until ready | source and browser checks |

## Architecture and editorial quality recommendations

1. **Proof-first projects:** Keep source-defined diagrams, deployment stages, measurable acceptance criteria, and actual command/config snippets where available. Never render goals as completed results.
2. **One coherent visual system:** Deep-navy infrastructure canvases, professional restrained cyan/sand/blue/purple domain accents, real portrait, genuine institution and vendor marks, readable contrasting paper sections. Avoid repeating one generic technical illustration in each card.
3. **Contextual rather than decorative brands:** Technology logos should be placed with the specific tool, operation, employer, study or solution. Displaying a brand is not evidence of hands-on experience or certification. Owner-submitted logo screenshots were supplied to the conversation and should only be added as correctly attributed assets when their repository import is verified.
4. **Mobile visual parity:** Same technologies, same case information, full 3D scene and interactive layers; change camera framing, content hierarchy and touch hit targets—not feature availability.
5. **Performance guardrails:** Monitor WebGL context losses, long animation frames, battery/thermal constraints, mobile LCP/CLS, image decoding, and on-demand render strategies in real device testing. Do not invent Lighthouse scores without running Lighthouse.
6. **Privacy & accuracy:** Use only approved contact details and the author's actual qualifications. Academic attendance is not a completed degree.

## Verified automated coverage
CI runs `npm run check` (TypeScript, source/topology/visual audits, Next build, localized static export and content smoke) plus GitHub Actions' assets/sitemap/link and Chromium UX checks. This PR expands QA to 320, 360, 390, 430, 768, 1024 and 1440px plus phone landscape, mobile WebGL when actually supported, accessible controls, EN/FR/AR, navigation and horizontal overflow on the home, projects, case, and section routes.

## Outstanding independent verification
- Cloudflare production deployment after merge (requires a working live browsing session).
- Real physical iOS Safari and Android Chrome/WebGL thermal and interaction tests; CI emulation alone does not prove every device/GPU renders identically.
- User-uploaded EVE-NG, GLPI, Nagios, Kali and other logo-image assets not yet committed directly into the repo; do not claim they are integrated until verified.
- Future measured Core Web Vitals and cross-browser screenshot review; don't assign unmeasured performance or accessibility scores.
