# Portfolio visual audit — engineering-led rebuild (candidate, not production)

## Objective
Turn the public portfolio into a credible **Systems, Networking & Infrastructure Operations** presence. Present professional experience and source-linked technical work, not a generic AI/agency graphic collage. Language: FR, EN and professional MSA Arabic. Preserve the user's real portrait, actual education and source provenance.

## Evidence reviewed
- Main-branch Chrome QA screenshots from GitHub Actions (hero, service card, 3D stage, projects, education and experience), dated 25 October 2026.
- Repository components: `Home`, `SectionHeroVisual`, `NetworkWorld`, `SourceTopology`, `VisualProject`, `TechnologyMarks`, the localization data and global CSS imports.
- Actual static Next.js export and browser smoke tests.

## Root causes, not superficial symptoms

| Priority | Finding | Why it fails | Approach |
| --- | --- | --- | --- |
| P0 | The interactive 3D scene shows a single rack while the site promises an enterprise HQ/branches/remote architecture. | The visualization lacks site-level topology semantics. | Use real structured architecture data for clickable nodes, links and reference flows. |
| P0 | WebGL fallback is a stylized rack or an unlinked grid. | The technical meaning disappears when GPU rendering is unavailable or lazy. | Fallback to an SVG topology derived from the SAME architecture links, with selectable nodes and honest reference labels. |
| P0 | All six section introductions reuse a three-icon pseudo-diagram. | Unconvincing, repetitive and not specific to the section. | Replace with distinct real project evidence, academic entries, experience timeline, service scopes and contact. |
| P1 | Logo arrays match the entire concatenated tool list and can mislabel or repeat vendors. | Wrong brand attribution, redundant icon noise and artificial presentation. | Match per requested technology in intended order, deduplicate by canonical brand and leave unsupported symbols as text. |
| P1 | Personal portfolio uses a Studio agency banner and a different header and footer mark. | Conflicting brand identities. | One personal TZ mark throughout. |
| P1 | Too many prominent hues, stickers, and rounded marketing CTAs. | Hierarchy competes with technical evidence. | Restrained slate/technical-blue palette, warm secondary accent, quieter buttons and fewer badges. |
| P1 | Decorative topology previews for eight cases have uneven source provenance. | A screenshot-like diagram can be mistaken for observed infrastructure. | Continue case-by-case source and status verification; distinguish illustrative architecture vs. real config/test. |
| P2 | Multiple overlapping CSS layers, including full Studio template source. | Fragile responsive behavior and visual inconsistency. | Longer-term consolidation of existing style sheets and component ownership after this initial structural correction. |
| P2 | Photographic quality, education logos and multilingual line breaks vary. | Reduces credibility. | QA per page and language with real image assets; no AI fabrication, invented credential or fake equipment image. |

## What changed in the candidate branch
1. `NetworkWorld` now reads `topologyDesigns` and filters meaningful enterprise roles; actual links and defined reference flows replace an isolated decorative rack. GPU-rendered label textures avoid unstable DOM overlays in the WebGL canvas.
2. `ArchitectureFallback` renders the same reference topology as semantic selectable SVG when WebGL is unavailable.
3. `SectionHeroEvidence` uses real localized `content` and `professional` records, with original YAML links and explicit design-only provenance. The old repeated 3-node page intro is retired.
4. Personal `BrandMark` restored in the header, marketing-agency top banner removed, technology list shortened and logo matcher corrected.
5. Palette adjustments are made directly in the existing active portfolio skin. A full style-sheet consolidation remains outstanding; another set of global override patches is NOT a substitute.
6. Browser/source QA assertions updated for evidence, URLs, layout and regressions.

## Professional acceptance criteria before publishing
- All six content sections and eight case routes render in EN/FR/AR, including RTL, with verified correct text and no horizontal page overflow at 320/390/768/1440px.
- Real 3D Canvas renders on a WebGL-capable browser with clickable roles and selectable layer controls; the **same** technical architecture has a readable 2D fallback.
- Four controls (layers), rotation/reset, pause/resume, and project source links work; no console runtime errors.
- No fabricated equipment, unearned certification, job, production test result, telemetry or operational uptime claim.
- Brand assets have explicit source, a consistent white/transparent background, readable size and no duplicates.
- Critical pages receive visual comparison of screenshots at actual rendered dimensions, not just successful builds.
- **Public Cloudflare Worker remains untouched** until visual review of the development branch succeeds.

## Not done yet
- A truly unified component/style architecture covering every existing project-detail screen and all special-case visual components.
- Comprehensive real-browser GPU visual QA on a physical machine; CI can fall back to SVG if WebGL unavailable.
- Full photography/image-source curation, original high-resolution portraits and licensed corporate technology-logo review.
- Full translations copy-edit and end-to-end usability interview or user acceptance.

This document separates *implemented*, *verified* and *remaining* work so a green GitHub check isn't mistaken for a finished visual product.
