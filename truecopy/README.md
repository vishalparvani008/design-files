# Truecopy — Website

Static marketing site. Every page is a single self-contained HTML file: fonts, images and the
city illustration are embedded as data URIs, so there are no external asset folders and nothing
to build.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Homepage |
| `truesigner-one.html` | TRUESigner ONE product page |
| `resources.html` | Blog list + blog detail (detail view is toggled in-page) |
| `contact.html` | Contact |

## Publishing on GitHub Pages

1. Create a repository and push the **contents of this folder** to the repo root
   (`index.html` must sit at the top level, not inside a subfolder).
2. Repository → **Settings → Pages**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. The site publishes at `https://<user>.github.io/<repo>/` within a minute or two.

`.nojekyll` is included so GitHub serves the files as-is and does not run Jekyll over them.

## Local preview

Opening `index.html` directly in a browser works. To match production exactly, serve it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- Filenames are lowercase and hyphenated — GitHub Pages is case-sensitive, so keep them as-is.
- Google Fonts and a few stock photographs load over the network; everything else is embedded.
- Interactions (scroll-stepped sections, hover reveals, marquees, the interactive city map) are
  plain vanilla JS inside each page. No bundler, no dependencies, no install step.
