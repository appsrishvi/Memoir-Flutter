# Momently website

Static site for the Momently app, hosted on GitHub Pages.

| Page | URL |
| --- | --- |
| Home | https://momently.rishvi.app/ |
| App guide | https://momently.rishvi.app/guide/ |
| Privacy policy | https://momently.rishvi.app/privacy-policy/ |

## Layout

- `src/guide/App.tsx`, `src/guide/index.css`: app guide page (React + Tailwind)
- `src/privacy-policy/App.tsx`, `src/privacy-policy/index.css`: privacy policy page
- `index.html`: landing page linking to both (plain HTML)
- `guide/index.html`, `privacy-policy/index.html`: page shells Vite builds from
- `docs/`: **built site that GitHub Pages serves**. Generated, do not edit by hand.

GitHub Pages is set to deploy from branch `main`, folder `/docs`. There is no build on GitHub's side, so the built files are committed.

## Updating a page

```sh
npm install        # first time only
npm run dev        # local preview with live reload
npm run build      # regenerates docs/
git add -A && git commit -m "Update ..." && git push
```

Always run `npm run build` and commit `docs/` after changing anything in `src/`, or the live site will not change.

## Adding a page

1. Create `src/<name>/App.tsx`, `src/<name>/index.css` and `src/<name>/main.tsx` (copy an existing `main.tsx`).
2. Create `<name>/index.html` (copy `guide/index.html` and change the title and script path).
3. Add the HTML file to `rollupOptions.input` in `vite.config.js` and to `content` in `tailwind.config.js`.
4. Link it from `index.html`, then build and commit.
