"""Source-level smoke checks for the static, trilingual portfolio.
No external services or browser needed.
"""
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
sys.path.insert(0,str(ROOT))
from src.content import PROJECTS, LOCALES, PROFILE

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.html = {}
        self.ids = set()
        self.hrefs = []
        self.h1s = 0
        self.links = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.html = a
        if tag == 'h1': self.h1s += 1
        if a.get('id'): self.ids.add(a['id'])
        if tag in ('a','link') and a.get('href'):
            self.hrefs.append(a['href'])
            self.links.append(a)

class SiteSmokeTests(unittest.TestCase):
    def test_all_localized_pages_exist(self):
        self.assertEqual(len(list(DOCS.rglob('index.html'))),len(LOCALES) * (1+len(PROJECTS)))
        for lang in LOCALES:
            prefix = '' if lang == 'en' else lang+'/'
            self.assertTrue((DOCS/prefix/'index.html').exists())
            for project in PROJECTS:
                self.assertTrue((DOCS/prefix/'projects'/project['slug']/'index.html').exists())

    def test_all_local_links_resolve_and_pages_are_accessible(self):
        for file in DOCS.rglob('index.html'):
            with self.subTest(page=str(file.relative_to(DOCS))):
                parser=PageParser(); parser.feed(file.read_text(encoding='utf-8'))
                lang = 'ar' if '/ar/' in '/'+str(file.relative_to(DOCS)) else ('fr' if '/fr/' in '/'+str(file.relative_to(DOCS)) else 'en')
                self.assertEqual(parser.html.get('lang'),lang)
                self.assertEqual(parser.html.get('dir'),'rtl' if lang=='ar' else 'ltr')
                self.assertEqual(parser.h1s,1)
                self.assertIn('main',parser.ids)
                self.assertTrue(any(x.startswith('mailto:'+PROFILE['email']) for x in parser.hrefs))
                self.assertIn(PROFILE['github'],parser.hrefs)
                self.assertIn(PROFILE['linkedin'],parser.hrefs)
                for href in parser.hrefs:
                    u=urlsplit(href)
                    if u.scheme or u.netloc or not href.startswith('/'):
                        if href.startswith('#'):
                            self.assertIn(href[1:],parser.ids)
                        continue
                    pathname=unquote(u.path).lstrip('/')
                    dest=DOCS/pathname
                    if dest.is_dir() or not dest.suffix: dest=dest/'index.html'
                    self.assertTrue(dest.exists(),f'{file}: broken local link {href}')

    def test_styling_language_and_privacy(self):
        css=(DOCS/'assets/styles.css').read_text()
        for item in ('@media(max-width:800px)','@media(max-width:550px)','prefers-reduced-motion','lang=ar','focus-visible'):
            self.assertIn(item,css)
        self.assertNotIn('cdn.',css.lower())
        self.assertTrue((DOCS/'_headers').is_file())
        for p in PROJECTS:
            self.assertIn(p['slug'],LOCALES['en']['case_content'])
            self.assertIn(p['slug'],LOCALES['fr']['case_content'])
            self.assertIn(p['slug'],LOCALES['ar']['case_content'])
        self.assertEqual(PROJECTS[0]['status'],'source')

if __name__ == '__main__':
    unittest.main()
