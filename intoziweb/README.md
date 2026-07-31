# Intozi — AI video analytics (marketing site)

Static site. No build step, no dependencies to install.

## Contents

```
index.html      the page (hero scroll sequence + What it does + Use cases + footer)
support.js      runtime the page loads (must stay next to index.html)
uploads/        hero assets — full traffic frame + car cutout
img/            detection stills used in the Use cases section
```

Three stock photos in "What it does" and "Use cases" load from the Unsplash CDN, so
the page needs an internet connection for those. Everything else is local.

## Publish on GitHub Pages

1. Create a repo and upload the **contents of this folder** to the repo root
   (`index.html` must sit at the top level, with `support.js`, `uploads/` and `img/`
   beside it).
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`,
   folder `/ (root)` → **Save**.
3. After a minute the URL appears at the top of that Pages panel:
   `https://<user>.github.io/<repo>/` — that is the client link.

## Run it locally

Open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000     # then visit http://localhost:8000
```

## What to look for

- **Hero** — scroll slowly. The car leaves the camera card, travels down and merges
  into its exact position in the traffic photo; the copy clears, then 19 trackers draw
  on across the frame with labels that cycle live (plates, class, lane, speed, flags).
- **Hero → What it does** — the section slides up over the still-pinned frame.
- **Nav** — turns light as the white sections reach it.
- **Use cases** — five industry tabs; Manufacturing is the default.
