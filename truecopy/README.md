# Truecopy — Website

Static marketing site. Every page is a single self-contained HTML file: CSS, JavaScript, fonts,
the logo and all illustrations are embedded inline, so there are no asset folders, no build step
and no dependencies.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Homepage |
| `about.html` | About us |
| `truesigner-one.html` | TRUESigner ONE product page |
| `contract-verse.html` | Contract Verse product page |
| `integrations.html` | Integrations listing |
| `integration-detail.html` | Integration detail (GROW with SAP) |
| `blog.html` | Blog list + article detail (toggled in-page) |
| `videos.html` | Videos |
| `brochures.html` | Brochures |
| `newsletters.html` | Newsletters |
| `contact.html` | Contact |

## Publishing on GitHub Pages

1. Push the **contents of this folder** to the repository root — `index.html` must sit at the
   top level, not inside a subfolder.
2. Repository → **Settings → Pages**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. The site publishes at `https://<user>.github.io/<repo>/` within a minute or two.

`.nojekyll` is included so GitHub serves the files as-is rather than running Jekyll over them.

## Local preview

Opening `index.html` directly in a browser works. To match production exactly, serve it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- Filenames are lowercase and hyphenated. GitHub Pages is case-sensitive — keep them as-is.
- Google Fonts, partner logos and stock photography load over the network; everything else is
  embedded in the HTML.
- All interactions (scroll-stepped sections, the interactive city map, marquees, carousels,
  accordions, nav dropdowns) are plain vanilla JS inside each page.
