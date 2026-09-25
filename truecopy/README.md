# Truecopy — Website

Static marketing site. No build step, no dependencies.

## Structure

```
index.html               Homepage
truesigner-one.html      TRUESigner ONE
contract-verse.html      Contract Verse
enterprise-nx.html       TRUESigner Enterprise NX
credentials.html         TRUESigner Credentials
consent-keeper.html      Consent Keeper
industry.html            Industry page
integrations.html        Integrations listing
integration-detail.html  Integration detail (GROW with SAP)
resources.html           Blog list + blog detail (toggled in-page)
case-studies.html        Case studies list + detail
videos.html              Videos
brochures.html           Brochures
newsletters.html         Newsletters
about.html               About
careers.html             Careers
contact.html             Contact
partner-with-us.html     Partner programme
privacy-policy.html      Privacy Policy
terms-of-use.html        Terms of Use
refund-policy.html       Refund Policy
css/style.css            All layout and component styles
css/responsive.css       All media queries (loaded after style.css)
js/mobile-nav.js         Mobile burger drawer, built from each page's own nav
assets/certs/            Footer certification badges (ISO, SOC 2, eIDAS, DPDP, GDPR)
```

Images, the logo and the city illustration are embedded as data URIs inside the
HTML, so there is no image folder to keep in sync. Google Fonts and a handful of
stock photographs load over the network; everything else is self-contained.

## Publishing on GitHub Pages

1. Push the **contents of this folder** to the repository root — `index.html`
   must sit at the top level, alongside `css/` and `js/`.
2. Settings → **Pages** → Source: **Deploy from a branch**, branch `main`,
   folder `/ (root)`.

`.nojekyll` is included so GitHub serves the files as-is.

## Local preview

```bash
python3 -m http.server 8000
```

## Notes

- Filenames are lowercase and hyphenated; GitHub Pages is case-sensitive.
- Stylesheet links carry a `?v=` query for cache busting. Bump it whenever you
  edit the CSS, or browsers will keep serving the old file.
- Responsive: burger navigation below 1000px, single-column grids below 760px.
  Scroll-driven sections unpin on small screens.
