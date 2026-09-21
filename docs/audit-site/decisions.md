# Site work — decisions

> The rulings behind the world-class site work (`docs/WORLD-CLASS-SITE-PROMPT.md`),
> so nothing here has to be re-argued and anything James wants reversed is one
> line to find. Ledger: `docs/audit-site/ledger.json`.

## 1. Architecture — the front doors (2026-09-14)

**Header recomposed** from the author's filing system (Articles / Books / Tools /
About) to the reader's language, following the approved IA in
`docs/SITE-STRATEGY-AUDIT.md` §4:

| Door | Answers the question | The one door to |
|---|---|---|
| Start Here | "I don't know where to begin." | `/start` |
| Read | "I want to read and think." | the essays, the paths, the pillars, the subjects |
| Study | "I want to study the Bible, and know where the church came from." | the nine Bible tools, church history, theology |
| Answers | "I have a hard question." | `/answers`, the FAQ, Test the Case, Which Lens, the Hard Issues |
| Grow | "I want to use something and live it." | all tools, assessments, study guides, downloads, help |
| Books | "What should I read, and buy?" | the books |

About, contact, membership, and the pastors' network moved to a footer-only
group (no `primary` links, which the nav already treats as footer-only). The
newsletter form still anchors under it on every page.

**Three duplicate doors redirected** (client route → redirect component;
server 301 in `vercel.json`):

- `/start-here` → `/start`. Two instruments promised the same thing ("find your
  path"); `/start` is the one the header and homepage were already wired to.
  **Open for James:** the Diagnostic behind `/start-here` audited as the
  better-written instrument. If he prefers it, swap the component behind
  `/start`; the redirect stays the same.
- `/framework` → `/pillars`. "How the library fits together" is the pillar spine.
- `/church-history` → `/theology/history`. The landing carried its own
  hand-written six-era list that disagreed with the hub reading the real
  library. One door now. Inbound links in `HistoricFaith`, `Help`, and the
  retired diagnostic keep working through the redirect and get retargeted when
  those files leave the voice-repair set.

**Kept as distinct destinations, deliberately** (not duplicates, though their
names invited the confusion): `/reading-paths` (essay sequences) vs
`/pathways` (the Topic Pathway system); `/life` (the whole-of-life domains) vs
`/living-well` (Pillar Six); `/explore` (every content type, one index) vs
`/writing` (the essay index); `/faq` vs `/answers` vs `/honest-questions`
(the FAQ index, the Answers architecture, the skeptic-facing essay landing).
Each lost its header slot to the door that owns its question and lives in
that door's menu instead.

**Already redirected before this work** (33 routes, including `/articles`,
`/discipleship`, `/disciple-making`, `/for-pastors`, `/pastors`,
`/for-leaders`, `/book-bundles`): left as they were.

## 2. Corrections to the prompt's own recon

The prompt's first draft claimed the church-history library existed in two
diverging copies. It does not: `client/public/theology/` is the one library
(11 councils, 36 figures, 10 heresies, seven eras) and
`client/public/history/essays-index.json` is a separate index of the 22 history
essays. The two-front-doors finding stood; the two-copies finding was a bad
`cmp` against files that were never there. Corrected in the prompt.

## 3. The reading-experience kit — already built, verified rather than rebuilt

The wayfinding audit's §6 spec (reading time, a one-sentence orientation line,
an anchored contents list) turned out to exist on `ArticleDetail` in a form
the prompt's draft did not credit: `AudienceLabel` carries the reading time,
the essay's excerpt renders as the orientation line under the title, and a
collapsible "In this essay" card builds anchored links from the rendered
`<h2>`s (hidden on essays with fewer than three sections, so short pieces stay
untouched). It is a single-column card rather than the sticky desktop rail
the spec imagined — a deliberate choice recorded in its own docstring ("No
layout grid, no right rail: the single-column measure stays exactly as it
was"). Left as is. Reading-progress bar and reading-focus mode also exist.

## 4. Gates

Lighthouse thresholds are now asserted in `.github/workflows/ci.yml`
(performance and accessibility ≥ 90, best practices and SEO ≥ 95). The
`quality` job stays `continue-on-error` until the first run shows the numbers
hold; then it flips to blocking. Recorded here so the flip is not forgotten.

## 5. Home-page performance — what moved the number and what did not

The CI Lighthouse performance score on the front page was 79 (accessibility
100, best practices 96, SEO 100). The largest contentful paint is the hero
subhead, a paragraph of text.

- **Hero painted from the HTML** (`scripts/prerender-heads.mjs` injects it
  into the `/` shell from `positioning.ts`): LCP 4.0 s → 3.0 s locally,
  score 83 → 90 locally, **79 → 83 in CI**. Kept.
- **Deferring the stylesheet with inlined critical CSS** (tokens, base rules,
  `@font-face`): LCP unchanged at 3.0 s, FCP 2.6 → 2.5 s, TBT 90 → 210 ms,
  score 90 → 88 locally. The stylesheet was not the bottleneck; the change
  added a swap step and a FOUC risk for no gain. **Reverted.**
- The PWA service worker precaches nothing (608 bytes); not a factor.

Where the remaining seven CI points live: the ~170 KB (gzipped) of script on
the home path — the app chunk, React, and the Radix vendor chunk that the
first paint does not need — and the resulting Speed Index and blocking time
under 4× CPU throttling. That is bundle work (splitting what the home page
does not use out of the initial graph), not markup work, and it is the next
lever if the 90 threshold is to hold in CI. Until then the `quality` job stays
non-blocking, with the threshold asserted so the number is never hidden.

**Second pass (same day).** Two more levers measured on the front page:

- **Radix and sonner out of the initial graph.** The root `TooltipProvider`
  served nothing (no page renders a tooltip; the admin sidebar mounts its
  own) and the sonner `Toaster` is fed only by admin pages. Provider removed,
  toaster lazy. Initial payload 186 → 154 KB gzipped; FCP 2.6 → ~2.1 s.
- **The LCP element's actual font preloaded.** The hero subhead is italic
  Cormorant; only the regular weight was preloaded, so the paragraph
  repainted larger when the italic face arrived, and that later paint is
  what counts as LCP. Preloading the italic face moved the local score from
  83 / 85 / 91 to **92 / 85 / 93** (median 92). Kept.

What is left is the font swap itself: under slow 4G the italic face lands at
about 2.2 s, and whether that falls inside the LCP window decides a 92 or an
85. Two honest options, neither taken here: a metric-matched fallback face
(`size-adjust` / `ascent-override` on a local Georgia so the swap does not
change the paragraph's size — needs Cormorant's real metrics, not guessed
numbers), or `font-display: optional` on the hero face (no swap ever, at the
cost of Georgia on a slow first visit). James's call, because the second one
trades the editorial typeface on exactly the readers with the worst phones.
