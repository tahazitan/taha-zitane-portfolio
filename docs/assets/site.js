(() => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-content');
  if (!toggle || !nav) return;
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    const isAr = document.documentElement.lang === 'ar';
    toggle.setAttribute('aria-label', open ? (isAr ? 'إغلاق القائمة' : 'Close navigation') : (isAr ? 'فتح القائمة' : 'Open navigation'));
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
})();
