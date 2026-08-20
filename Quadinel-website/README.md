# Quadinel AI — website preview

Static site. No build step, no dependencies.

```
index.html        home — four-sector camera wall + scroll-driven detection sequence
solutions.html    Solutions — capabilities, outcomes, the Awiros stack, FAQ, demo form
about.html        About us — company, team, how we work, demo form
support.js        runtime the pages load (must stay beside them)
uploads/          logos, traffic scene, vehicle cutout
img/              detection stills used in the Solutions marquee
```

Most sector and section photography loads from the Unsplash CDN, so the pages need an
internet connection. Local files cover the logos, the traffic scene and the marquee.

## Publish on GitHub Pages

1. Upload the **contents of this folder** to the repo root — `index.html` at the top
   level with `support.js`, `uploads/` and `img/` beside it.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`,
   folder `/ (root)` → **Save**.
3. The URL appears at the top of that panel after a minute:
   `https://<user>.github.io/<repo>/`

## Run locally

```
python3 -m http.server 8000     # http://localhost:8000
```

## What to show the client

1. **The wall** — four live camera panels: Smart Cities & Critical Infrastructure,
   Hospitality & Retail, Airports & Logistics, Industrial & Enterprise. Hovering a
   panel reveals `ANALYZE →`.
2. **Click a panel** — that feed takes over. Scroll slowly: the tracked subject leaves
   the camera card, travels down and merges into its exact position in the full-scale
   scene, then detection trackers draw on across the frame with labels specific to that
   sector.
3. **Return** — `← ALL INDUSTRIES`, or the logo.
4. **Book a demo** — opens the request form as a modal from any page.

Scroll with the browser tab focused; background tabs throttle the animation timer.

## Notes for the WordPress build

- Sector data (photo, scene aspect, merge subject rect, labels, capability chips,
  camera ID) is one `INDUSTRIES` object at the top of the home page's logic — the
  natural place to expose as block attributes or a PHP array.
- Tracker coordinates are normalised percentages of their scene photo. Swapping a photo
  means re-measuring its `subj` rect and tracker positions, or the merge will not land.
- The merge geometry is the one part that must stay pixel-accurate; everything else is
  safe to edit.
- Team photos and names on About are placeholders.
