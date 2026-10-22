# Taha Zitane — Trilingual Infrastructure Portfolio

**Professional portfolio website — English, French, Arabic (native RTL).** Dark technical design, responsive static pages, verified GitHub project links, honest project-status labels and recruiter-friendly work experience based on the supplied CV.

## What is included

- English `/`, French `/fr/`, and Arabic `/ar/` routes (including RTL layout)
- Five case-study pages per language; 18 prerendered HTML pages total
- Mobile navigation, accessible language switching, semantic headings, local CSS/JS, SEO titles and hreflang metadata
- Project classifications distinguishing historical internships, freelance work, self-directed practice and source code pending live testing
- GitHub, LinkedIn and email contact buttons, including prominent hero links
- No external frameworks, runtime API calls, keys, databases, paid credits or advertising scripts

## Host for free on Cloudflare Pages

1. Create a new GitHub repository named `taha-zitane-portfolio` in your own account.
2. Upload/push the **contents of this folder** (including `docs/`) to the new repository.
3. In Cloudflare dashboard → Workers & Pages → Pages → Connect to Git → choose that repository.
4. Framework preset: **None**. Build command: **leave empty**. Build output directory: **`docs`**. Root directory: repository root.
5. Deploy. Cloudflare provides a free `*.pages.dev` project URL subject to current plan limits. You can connect a custom domain later.
6. Every push to GitHub will redeploy the `docs/` output automatically after integration is configured.

**Alternative GitHub Pages:** Settings → Pages → Deploy from branch → `main` → `/docs` (may require repo visibility suitable for your GitHub plan).

## Local development

You can simply preview the generated site:

```bash
python3 -m http.server 8000 --directory docs
# Visit http://localhost:8000/
```

To edit multilingual content, modify `src/content.py` and rebuild:

```bash
python3 -m pip install -r requirements-dev.txt
python3 build.py
```

Then commit the regenerated `docs/` folder. Cloudflare does not need Python or any build runtime; it simply publishes the already-generated static pages.

## Source and limitations

The supplied CV and the accessible GitHub project were used as a factual basis. This site does **not** invent certifications, live monitoring dashboards, tested routing results, third-party testimonials, client logos or production outcomes. The topology SVG is labeled illustrative. Source screenshots and real test evidence can be added as they become available.

**Before public launch:** Review personal contact details and exact career wording. The website intentionally displays an email address but no public telephone number. Replace the placeholder-free monogram with a profile photo only if you choose. A downloadable CV is not included until a publish-safe final CV is selected.

## Architecture rationale

This first release is a standards-based **zero-runtime-dependency static site** rather than a complex framework. It achieves the immediate objective (high quality, free hosting, multilingual SEO-friendly output) with minimum deployment friction and no SaaS credits. The content layer and markup can later be migrated to Astro + MDX if case-study publishing needs grow, without changing the live design or URLs.

## Privacy & security

Never publish customer configs, private keys, internal hostnames, real security findings or IP addresses without authorization. The project shows lab-safe RFC1918 addresses only. All external links use safe `rel` attributes. There is no contact-form backend; the email link launches the visitor's mail client.
