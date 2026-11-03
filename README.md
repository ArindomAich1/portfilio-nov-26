# Arindom Aich — portfolio

Single-page portfolio built with React + Vite. Light "research notebook" theme: warm paper, ink, one ink-blue accent, thin-line network motif.

## Commands

```bash
npm install
npm run dev       # local dev server (copies ../resume.pdf into public/ first)
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
npm run format    # prettier
```

## Editing content

Every string on the site lives in `src/data/content.ts`. Fields marked `TODO` are hidden until filled:

- `currentPosition.description` and the IIT Kharagpur start month
- `profile.links.scholar` / `profile.links.orcid`
- `href` on each project (adds a link arrow to the project title)

The CV button serves `public/Arindom_Aich_CV.pdf`, copied from `../resume.pdf` on every `dev`/`build`, so rebuilding the LaTeX resume is enough to update it.

## Structure

- `src/sections/` — one component per page section, each with its own CSS module
- `src/components/` — `Section` (rail + title), `Reveal` (scroll reveals), `SignalGraph` (hero canvas), `PipelineStrip` (project data-flow diagrams), `Nav`, `PaletteLauncher` + `CommandPalette` (⌘K / Ctrl+K, `/`)
- `src/styles/tokens.css` — colours, type scale, spacing and motion tokens

## Deploy (Netlify)

`netlify.toml` sets the build command and `dist` as the publish folder. The contact form uses Netlify Forms; its static twin in `index.html` lets Netlify detect it at deploy time. Submissions appear under Site → Forms.
