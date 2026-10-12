/* Mobile navigation drawer.
   Builds itself from the page's own .nav-links markup, so the drawer never
   drifts from the desktop menu. Groups with a dropdown become accordions. */
(function () {
  if (window.__tcMobileNav) return;
  window.__tcMobileNav = 1;

  function init() {
    var nav = document.getElementById('nav') || document.querySelector('.nav');
    if (!nav) return;
    var inner = nav.querySelector('.nav-in') || nav;
    var links = nav.querySelector('.nav-links');
    if (!links || nav.querySelector('.nav-burger')) return;

    /* burger button */
    var burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.type = 'button';
    burger.setAttribute('aria-label', 'Open menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    inner.appendChild(burger);

    /* drawer */
    var drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.id = 'navDrawer';
    var scroll = document.createElement('div');
    scroll.className = 'nd-scroll';
    drawer.appendChild(scroll);

    function textOf(el) {
      return (el.textContent || '').replace(/\s+/g, ' ').trim();
    }

    [].forEach.call(links.children, function (node) {
      /* plain link */
      if (node.matches('a.nav-link')) {
        var a = document.createElement('a');
        a.className = 'nd-link';
        a.href = node.getAttribute('href') || '#';
        a.textContent = textOf(node);
        scroll.appendChild(a);
        return;
      }
      /* dropdown group -> accordion */
      var trigger = node.querySelector('.nav-trigger');
      var panel = node.querySelector('.nav-mega, .nav-menu, .nav-drop');
      if (!trigger || !panel) return;

      var grp = document.createElement('div');
      grp.className = 'nd-group';
      var head = document.createElement('button');
      head.type = 'button';
      head.className = 'nd-head';
      head.setAttribute('aria-expanded', 'false');
      head.innerHTML = '<span>' + textOf(trigger) + '</span><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3.4 5.2 L7 8.8 L10.6 5.2"></path></svg>';
      var body = document.createElement('div');
      body.className = 'nd-body';
      var list = document.createElement('div');
      list.className = 'nd-list';

      [].forEach.call(panel.querySelectorAll('a'), function (src) {
        var href = src.getAttribute('href');
        if (!href) return;
        var title = src.querySelector('b, .nmi-tx b, strong');
        var label = title ? textOf(title) : textOf(src);
        if (!label) return;
        var a = document.createElement('a');
        a.className = 'nd-sub';
        a.href = href;
        a.textContent = label;
        list.appendChild(a);
      });
      if (!list.children.length) return;

      body.appendChild(list);
      grp.appendChild(head);
      grp.appendChild(body);
      scroll.appendChild(grp);

      head.addEventListener('click', function () {
        var open = grp.classList.toggle('on');
        head.setAttribute('aria-expanded', String(open));
      });
    });

    /* CTA */
    var cta = nav.querySelector('.nav-cta a');
    if (cta) {
      var c = document.createElement('a');
      c.className = 'nd-cta';
      c.href = cta.getAttribute('href') || '#';
      c.textContent = textOf(cta).replace(/\s*→\s*$/, '');
      scroll.appendChild(c);
    }

    var veil = document.createElement('div');
    veil.className = 'nav-veil';

    document.body.appendChild(veil);
    document.body.appendChild(drawer);

    function setOpen(open) {
      document.documentElement.classList.toggle('nav-open', open);
      burger.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    burger.addEventListener('click', function () {
      setOpen(!document.documentElement.classList.contains('nav-open'));
    });
    veil.addEventListener('click', function () { setOpen(false); });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    addEventListener('resize', function () {
      if (innerWidth > 1000) setOpen(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
