# Drafth — App prototype

Static build. No build step.

## Files
- `index.html` — entry point (sign up & onboarding)
- `Onboarding.dc.html` — sign up & onboarding (same as index)
- `AI Ideas.dc.html` — app: AI Ideas, Create a post, editor
- `support.js` — runtime required by the pages
- `.nojekyll` — required for GitHub Pages (keeps the `{{ }}` bindings intact)

## Publish on GitHub Pages
1. Upload all files (including `.nojekyll`) to the repository root.
2. Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)`.
3. Site will be at `https://<user>.github.io/<repo>/`.

Fonts load from Google Fonts, so an internet connection is needed for the full look.
