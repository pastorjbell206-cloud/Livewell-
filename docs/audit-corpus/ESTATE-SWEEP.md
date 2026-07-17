# Estate Sweep — the report-only worklist

> 2026-07-15. Six parallel finders swept the full client estate (~330 files)
> for three deterministic contracts (brand tokens, a11y state patterns, voice
> in UI copy); findings were verified, and the provably-safe classes were fixed
> in the same pass (see the PR that carries this file). What remains below was
> **deliberately not auto-fixed** — each item either changes dark-mode
> rendering (needs a browser to confirm), requires a design decision, or would
> break code (string-concatenated hex). Work top-down with a preview open.

## Class 1 — `#FFFFFF` / `"white"` card & input surfaces → `var(--card)`

**STATUS: mostly CLOSED.** ~113 sites across 47 files were swapped to
`var(--card)` after a per-card verification that every descendant text color is
a token (provably correct in both themes — the swap *fixes* the prior
white-card-on-dark-page defect). Only the dark-on-dark risk cases were held back
(see below). The list of sites that follows is the historical map; the
tokenized-content subset is done.

**`var(--charcoal)`-as-text cards** (a *fixed-dark* token that flips darker, so
a `var(--card)` bg alone would be dark-on-dark). The fix is the *paired* one:
retoken the card's text `--charcoal`→`--ink` **and** swap the bg — provably
correct both modes (near-identical in light, correct in dark).
- ☑ `pages/tools/SavedItems.tsx` — DONE (4 cards + the file's section headings /
  empty-state text, all charcoal-on-bone → `--ink`; hero bg + mustard badge left).
- ☐ `pages/ReadingPaths.tsx:357` — held: the file interleaves ~10
  `var(--charcoal)` uses across heroes, backgrounds, and text; pairing them
  needs a rendered check, not a blind grep.
- ☐ `pages/tools/DeepBibleCompanion.tsx` — held: ~25 hardcoded `#666`/`#999`
  text on white cards; retoken text + surfaces together, in a browser.
- ☐ `BookDetail.tsx:129` — a white *section* (not a card); decide `--bone` vs a
  lifted band.

- pages root: ArticleCollections 308 · BookBundles 202 · BookDetail 121, 129
  (129 is a white *section* — decide `--bone` vs a lifted `--card` band) ·
  DiscipleMaking 123 · HardIssuesSeries 195 · Help 199 · HowTos 87, 99 ·
  Map 67, 100 · Pathways 95 · ReadingPaths 357 · Resources 159, 195, 245 ·
  Substack 54, 63, 72 · TheologyExplorer 99, 172 · TheologyHistory 93 ·
  TheologyQuiz 210, 228, 283, 293, 322, 343, 349 · ToolsHub 296 ·
  Wisdom 50, 146, 174, 178, 182 · WorkWithJames 107, 111, 115, 127 ·
  StartHereQuiz 234, 278, 361, 424 (+ borders `#E0D9CC` → `--border`)
- tools: WhichLens 237, 303 · Proverbs31 93, 104, 117 · DiscipleshipTable
  195, 221, 267, 283 · BibleOnTopic 264, 293 · RuleOfLife 256, 299 ·
  FamilyDevotionBuilder 998, 1057, 1103, 1143, 1250 · SavedItems 136, 184,
  228, 238 · PrayerGenerator 283, 332, 351 · VerseFinder 257, 313, 332, 356 ·
  BibleStudy ×6 · ParentingGuide ×6 · EmotionalHealth ×4 · FinancialHealth ×5 ·
  MarriageAssessment ×5
- subdirs: ServantLeadership 120, 139 · FormationIndex 81 · FormationTopic
  111, 137, 157 · FormationGuides 167 · LeadershipArticle 111 ·
  WholeBibleSermons 171 · LifeDomain ×4 · ContextGuide 109 · ContextLibrary
  96, 126 · CreedsLibrary 73 · StudyGuide 54 · StudyGuidesIndex 59 ·
  TableStudy 123
- components: BookRecommendations 61 · EmailResults 157 · ToolStrip 38

## Class 2 — coupled or code-bearing hex (do NOT naive-swap)

- **NationScorecard** 20, 40, 89 — verdict hexes feed `${hex}1A`/`${hex}55`
  string concatenation; a `var()` would break it. Fix = refactor to
  `color-mix()` or paired `-bg` tokens.
- **DeepBibleCompanion** (~25 sites) — text grays (`#666`,`#999`,`#ccc`,
  `#e5e0d5`) sit on hardcoded-white cards; swapping text tokens without the
  card bg flips creates dark-on-dark in dark mode. Fix text + surfaces
  together, in a browser.
- **PropheticTimeline** 19–23 — five category colors, three with no близ token,
  plus `${c}1A` concat. Needs new `:root` tokens + color-mix.
- **TheologyGlossary** 1049–53 and **QuoteLibrary** 45–47 — category maps where
  only some entries have token equivalents (`#3D5A40`/`#6B8E6B`→`--ok` was
  fixed); `#8B5E3C #6B4C7A #2E6B8A #9B6B30 #B85C3A #5A7B9A` need a decision:
  new tokens, or collapse to the semantic trio.
- **StartHereQuiz** 15–39 — the five-hue option palette is off-palette by
  construction; earlier flagged. Keep-and-tokenize or re-treat on-brand.
- **TheologyQuiz** 228 — `#FDF5E6`/`#FDFAF5` selected/hover tints ≈
  `--bone-warm`/`--bone`; near-certain safe but confirm the selected-state
  contrast in dark mode.

## Class 3 — behavioral a11y (needs a browser)

- MinimalNav search overlay: `role="dialog"` + focus trap (global nav — the
  standing browser-gated item).
- AdminLayout mobile drawer: Escape-to-close + focus management (admin-only).
- LeaderAssessment / ProfileSurvey / BeforeYouPost results: consider moving
  focus to the result heading (role="status" was added as the safe half).
- PrayerGenerator pray-along auto-advance: an `aria-live` region on
  auto-advancing content can be chatty — needs SR judgment.
- EmotionalHealth results region: mirror FinancialHealth's
  `role="region"`+label+tabIndex structural pattern.
- Scale-answer groups (LeaderAssessment, ProfileSurvey): upgrade
  `aria-pressed` to a true `role="radiogroup"` when in a browser.

## Voice notes (no action)

- ForLeaders 84 "leaders who do the work nobody sees" — literal labor, not
  therapy-speak; exempt.
- All exclamation points in rendered copy sit inside verbatim Scripture or
  attributed quotes (e.g. Barth's "Nein!"); corpus clean.
