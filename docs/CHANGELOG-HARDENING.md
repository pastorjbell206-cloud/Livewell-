# Finish & Harden — Changelog

A pass to close reader-facing "coming soon" dead ends, make metadata honest,
and standardize saved progress. Every item verified with `pnpm check`,
`pnpm test` (281 passing), `pnpm build`, and new build-time validators. No
authored essay/doctrine prose was changed; only metadata, labels, navigation,
structure, and plumbing.

## What shipped

- **WI-1 — /skeptic-track wired to real essays + honest gate.** The 7-stop
  Skeptic's Track pointed at 7 slugs that never existed (every stop read
  "Essay landing soon" and dead-ended). New `lib/skepticTrack.ts` is the single
  source of truth; 6 stops now map to real essays, stop 7 is repointed to the
  real exclusivity essay (see author actions). Unresolved stops render a
  non-clickable "Essay in progress"; Home/About/Help/Family hide their entry
  points unless `SKEPTIC_TRACK_LIVE`. `validate-skeptic-track.mjs` fails CI if a
  wired slug does not resolve.
- **WI-2 — /read library hardened.** Audit premise was stale: the library ships
  49 readable books and no "read free" link dead-ends. Removed the false empty
  copy ("the first books are being written") that flashed on load and stuck on
  a manifest failure; replaced with an honest loading→"couldn't load, refresh"
  flow. `validate-books.mjs` fails CI if any book or read target lacks a
  manuscript.
- **WI-3 — completeness counters removed from pillar hubs.** "31 doctrines
  written… the rest are coming", "12/10 written so far. The rest are coming"
  were false (every item is `ready`). Hubs now read as finished collections and
  render published-only (no "coming" teasers). Internal count moved to
  `report-completeness.mjs`.
- **WI-4 — accurate read-times.** Prod API dropped `readingTimeMinutes`, so
  every DB post fell back to a flat "5 min read". The prod card shapers now emit
  it (matching the dev runtime), derived from actual body length. Read-times now
  range 5–19 min by length.
- **WI-5 — format flows to the archive.** Prod API dropped `format`/`audience`,
  so the Format badge and Format/Audience filters were dead. Now emitted.
  Investigated a devotional split: the "devotionals" pillar is the site's label
  for full formation essays (all 12–16 min), not short readings, so tagging them
  devotional would mislabel essays; left as "article". The archive is honestly
  single-genre; badge/filter light up for any genuine non-essay format.
- **WI-6 — Q&A deep links enforced.** The "full essay →" link already renders and
  all 27 answers resolve; `validate-answers.mjs` now fails CI if any answer's
  `essaySlug` does not resolve to a published essay.
- **WI-7 — saved progress standardized.** New `hooks/useProgress.ts` (on the
  guarded `lib/storage.ts`). Discipleship refactored onto it (same key, no
  regression); the Family Catechism (mark questions learned) and Family reading
  plans (mark days read) now remember progress and offer a reset, with an honest
  "couldn't save" line on failure.
- **WI-8 — static-library essays are crawlable.** `prerender-heads.mjs` read
  only the DB `posts` table, so the 30 new essays were in the sitemap but served
  the empty SPA shell. It now prerenders every static-library essay (614/614)
  with real title/description/OG, Article JSON-LD, and injected crawlable body.
  The 404 catch-all was already honest.

## New CI gates

`validate-skeptic-track.mjs`, `validate-books.mjs`, `validate-answers.mjs` were
added to the content-gates step of `.github/workflows/ci.yml`.

## Requires the author (final prose / decisions, not code)

1. **Skeptic-track stop 7.** The original theme ("what following actually
   costs") has no essay in the corpus. It is currently pointed at
   `is-jesus-really-the-only-way` with relabeled nav copy. To restore the
   original arc, supply/commission a "cost of following" essay and repoint the
   slug in `lib/skepticTrack.ts`; the gate and validator keep it honest.
2. **Group B contested essays.** The four already-published essays (sexual
   ethic, gender identity, abortion, women in ministry) are written held-open;
   each has a slot for a personal "where I land" coda the author must supply.

## Backlog (section 4) — BUILT

The **"Test the Case" interactive skeptic tool** is built and live at
`/tools/test-the-case`. It works a case one move at a time; at every move the
reader raises the objection they actually hold and gets the honest answer plus
what the move does not prove, and it closes on a verdict with no altar call.
Three complete flows now ship: the resurrection (5 moves, 11 objection/response
pairs), hell (could a good God send anyone to hell), and meaning (can a life
mean anything without God), each built from the matching essay in the same
objection-and-answer form, em-dash-free, with Scripture verbatim. Content lives
in `client/src/data/argumentCases.ts`; the engine reuses `hooks/useProgress.ts`
to resume where a reader stopped and to start a case over. Registered in
`/tools`, the route table, and the sitemap. Author action: add further cases in
`argumentCases.ts`; a case with `published: false` shows honestly as "In
progress" and lights up automatically when the flag flips true.
