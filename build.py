#!/usr/bin/env python3
"""Render EN, FR, AR static pages; output under docs/ for Cloudflare and GitHub Pages.
Local dev dependency: pip install -r requirements-dev.txt
"""
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape
from src.content import PROFILE, EXPERIENCE, PROJECTS, LOCALES

ROOT = Path(__file__).parent
OUT = ROOT / "docs"
ENV = Environment(loader=FileSystemLoader(ROOT / "src" / "templates"), autoescape=select_autoescape(['html']), trim_blocks=True, lstrip_blocks=True)

def target(locale: str, slug: str | None = None):
    prefix = '' if locale == 'en' else locale + '/'
    return '/' + prefix + (f'projects/{slug}/' if slug else '')

def write_page(path, contents):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(contents, encoding="utf-8")
    print(f'Created {path.relative_to(ROOT)}')

for lang, t in LOCALES.items():
    for p in [None] + PROJECTS:
        slug = None if p is None else p['slug']
        path = target(lang, slug)
        out_file = OUT / path.lstrip('/') / 'index.html'
        template = ENV.get_template('index.html' if slug is None else 'project.html')
        lang_urls = {code:target(code,slug) for code in LOCALES}
        options = dict(lang=lang,t=t,profile=PROFILE,experience=EXPERIENCE,projects=PROJECTS,
                       languages=LOCALES,lang_urls=lang_urls,alternatives=lang_urls,
                       page_kind='home' if slug is None else 'project',p=p,
                       case=t['case_content'][slug] if slug else None,
                       page_title=('Taha Zitane | Infrastructure & Network Security' if not slug else p['title'][lang]+' | Taha Zitane'),
                       page_description=t['meta_desc'] if not slug else p['desc'][lang])
        write_page(out_file, template.render(**options))
print('Done. Output folder:', OUT)
