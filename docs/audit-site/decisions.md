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

## 3. Gates

Lighthouse thresholds are now asserted in `.github/workflows/ci.yml`
(performance and accessibility ≥ 90, best practices and SEO ≥ 95). The
`quality` job stays `continue-on-error` until the first run shows the numbers
hold; then it flips to blocking. Recorded here so the flip is not forgotten.
