# Publish the Taha Zitane Portfolio — no credit-based builder

**Hosting target:** Cloudflare Pages (static deploy). Repository created and confirmed at https://github.com/tahazitan/taha-zitane-portfolio; files must be pushed next. The site is already generated into `docs/`. Cloudflare Pages serves static HTML/CSS/JS without requiring a database, a runtime API, or a paid AI builder.

## Option A — GitHub + Cloudflare Pages (recommended)

1. **Already completed:** you created the public repository [`tahazitan/taha-zitane-portfolio`](https://github.com/tahazitan/taha-zitane-portfolio). Keep it separate from the `enterprise-network-lab` repository.
2. Unzip `Taha_Zitane_Portfolio_Source_EN_FR_AR.zip` on your Mac. Open **Terminal** inside the extracted `taha-zitane-portfolio` folder (this folder must contain `docs`, `src`, `build.py`, and `README.md`). Run:

   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Launch trilingual infrastructure portfolio"
   git remote add origin https://github.com/tahazitan/taha-zitane-portfolio.git
   git push -u origin main
   ```

   If the git commit fails because your identity is missing, set `git config user.name "Your Name"` and `git config user.email "your-account-email@example.com"`, then retry the commit. GitHub authentication may open a browser or ask for a credential helper (do not paste passwords or tokens into chat). If you prefer not to use Terminal, open your GitHub repository and use **Add file → Upload files** to upload all contents, preserving their folder structure, then commit the upload.

3. Sign in to Cloudflare → **Workers & Pages** → create a **Pages** project → **Connect to Git** → authorize GitHub and select the new repository.
4. Configure:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: *(blank)*
   - Build output directory: `docs`
   - Root directory: repository root
5. Press **Save and Deploy**. When Cloudflare reports success, check `https://<your-project>.pages.dev/`, plus `/fr/` and `/ar/`.
6. For content changes: edit `src/content.py`, run `python build.py`, commit both source and `docs/`. Cloudflare automatically republishes after GitHub pushes.

Current free-plan features and commercial-use terms must be confirmed in your hosting dashboard. A paid custom domain is **not** needed to use the platform URL.

## Option B — GitHub Pages

After pushing the repository: GitHub → Settings → Pages → **Deploy from a branch** → `main` → `/docs`. The live address typically follows `https://tahazitan.github.io/taha-zitane-portfolio/`.

**Important:** This build uses root-relative links such as `/assets/...`, so on a subpath-based GitHub Pages URL the links will not work until you configure a custom root domain or adapt paths. Use Cloudflare Pages first; it works at the domain root without modifications.

## Pre-publication checklist

- [ ] Verify title, roles, dates and technologies against your final CV.
- [ ] Decide whether you want your personal email to be public; it currently appears as a `mailto:` link.
- [ ] Confirm GitHub and LinkedIn profiles are public and correctly linked.
- [ ] Test EN, FR, AR navigation on phone and desktop and check Arabic RTL.
- [ ] Ensure all references to lab validation remain marked **pending** until tested.
- [ ] Add technical evidence only from your own isolated systems; never expose employer/client information.
- [ ] Add a chosen CV download later if it is sanitized and approved for publication.

## Troubleshooting

- **404 for assets/pages:** Cloudflare output directory must be `docs`, not `dist` or repository root.
- **Changes not appearing:** rebuild with `python build.py` before pushing; CI will check generated pages match source.
- **Contacts:** Email uses the visitor's own email app (`mailto:`); LinkedIn and GitHub are direct profile links, not account API/OAuth connections.
