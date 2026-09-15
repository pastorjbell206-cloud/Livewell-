# PCN Handoff — the pastoring and leadership material

Everything here was **moved off the LiveWell website, not deleted.** It is intact, in
full, and ready to be carried over to the Pastors Connection Network. Git history holds
every earlier version as well, so nothing is recoverable-only-in-theory: the files are
right here.

Moved on the branch that removed the pastor section from the site. Nothing in this folder
is built, served, compiled, or indexed — it sits outside `client/src`, so TypeScript
ignores it and Vite never bundles it.

---

## What is in here

### `content/leadership/` — the written material (224 files, ~6 MB)

This is the substance. It is plain JSON, so it can be read by anything and ported to any
platform without touching the original React pages.

| Folder / file | What it holds |
|---|---|
| `articles/` + `articles-index.json` | **131 leadership articles** — the largest single body of work here |
| `sermons/` | **66 sermon manuscripts and outlines** |
| `formation/` + `formation-guides.json` + `formation-index.json` | The deep-formation curriculum |
| `sermon-series.json` | The sermon-series library (fed the downloadable series PDFs) |
| `whole-bible-sermons.json` | Preaching plans across the whole canon |
| `servant-leadership-handbook.json` | The servant-leadership handbook |
| `governance.json` | Church governance library — polity, bylaws, elder and deacon material |
| `illustrations.json` | The illustration library |
| `assessments/`, `surveys/`, `services/`, `workflows/` | Leader assessments, profile surveys, service orders, guided workflows |

### `pages/` — the interface that presented it (30 components)

React components in Bell's design system. Useful to PCN as a working reference for how
each library was presented, and reusable directly if PCN runs a React front end.

- `pages/leadership/` — the 23-page Leadership Hub (library, sermon prep, formation,
  governance, illustrations, meeting builder, budget, visitation tracker, decision log,
  service builder, assessments, surveys, guided workflows).
- `pages/ForPastors.tsx`, `Pastors.tsx`, `PastorsResourceWall.tsx`, `ForLeaders.tsx`,
  `SermonSeries.tsx` — the pastor-facing landing pages.
- `pages/tools/PastorBurnout.tsx`, `SermonOutline.tsx` — the two pastor-facing instruments.

### `pastor-essays-in-database.md` — the 93 that are not in this folder

The pastor-trade **essays** live in the site's database rather than in code, so a file move
could not touch them. They are still published on LiveWell and still hold their search
rankings. That file lists every slug, with the safe order of operations for retiring them.

---

## Moving this to PCN

1. **Take the content first.** `content/leadership/` is the asset. The JSON is
   self-describing; each article carries its own title, body, and metadata.
2. **Then the essays.** Publish each one on PCN before unpublishing it here, and redirect
   the old LiveWell URL to its new home. A redirect keeps the search traffic; a deletion
   throws it away.
3. **The pages are optional.** Take them if PCN is React; otherwise treat them as a design
   reference for how the material was organized.

## If any of it needs to come back

`git mv` the folder back into place and restore the routes in `client/src/App.tsx` and the
nav group in `client/src/lib/siteNav.ts`. The removal commit is a single, self-contained
diff — reverting it restores the whole section.
