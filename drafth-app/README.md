# Drafth — Landing Page

Static preview build. No build step, no dependencies.

## Files
- `index.html` — the page
- `support.js` — runtime required by index.html
- `assets/` — logo and hero image
- `.nojekyll` — required: disables Jekyll on GitHub Pages, which would otherwise
  strip the `{{ }}` bindings in index.html

## Publish on GitHub Pages
1. Push these files to the repository root.
2. Settings -> Pages -> Source: "Deploy from a branch" -> `main` / `/ (root)`.
3. Wait ~1 minute. The site is at `https://<user>.github.io/<repo>/`.

## Run locally
Open `index.html` directly in a browser, or serve the folder:

    python3 -m http.server

Fonts (Oswald, Inter, Crimson Pro) and a few placeholder photos load from the
network, so keep an internet connection for the full look.
