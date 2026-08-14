# Quadinel — AI video analytics (homepage hero)

Static site. No build step, no dependencies to install.

## Contents

```
index.html      the page — four-industry grid + scroll-driven detection sequence
support.js      runtime the page loads (must stay beside index.html)
uploads/        logo, traffic scene, car cutout
```

Three of the four industry scenes (retail, construction, industrial) load from the
Unsplash CDN, so the page needs an internet connection. Traffic uses the local files
in `uploads/`.

## Publish on GitHub Pages

1. Create a repo and upload the **contents of this folder** to the repo root —
   `index.html` at the top level, with `support.js` and `uploads/` beside it.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`,
   folder `/ (root)` → **Save**.
3. The URL appears at the top of that panel after a minute:
   `https://<user>.github.io/<repo>/` — that's the client link.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000     # http://localhost:8000
```

## What to show the client

1. **The grid** — four live camera panels: Traffic, Hospitality & retail,
   Construction, Industrial. Each cycles its own readout and counter. Hovering a panel
   reveals `ANALYZE →`.
2. **Click any panel** — that feed takes over the screen. Scroll slowly: the tracked
   subject leaves the camera card, travels down and merges into its exact position in
   the full-scale scene, then the detection trackers draw on across the frame with
   labels specific to that industry.
3. **Return** — the `← ALL INDUSTRIES` pill, or the logo, goes back to the grid.
4. **Nav** — Solutions opens a dropdown (Computer vision, ESG platform, Cybersecurity,
   IoT platform).

Scroll with the browser tab focused; background tabs throttle the animation timer.

## Notes for the WordPress build

- The industry data (photo, scene aspect, merge subject geometry, labels, camera ID)
  is one `INDUSTRIES` object at the top of the logic class — the natural place to
  expose as block attributes or a PHP array.
- Tracker coordinates are normalised percentages of their scene photo. If a photo is
  swapped, its `subj` rect and tracker positions must be re-measured against the new
  image, or the merge will not land.
- The merge geometry (subject rect vs scene size) is the one part that must stay
  pixel-accurate; everything else is safe to edit.
