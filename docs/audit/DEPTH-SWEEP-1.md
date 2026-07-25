# Depth Sweep 1 — the board's rubric scores (interim)

> Produced by the depth-board protocol (`docs/FABLE5-DEPTH-BOARD-PROMPT.md`).
> Every scored surface was **read in full** by a board reader and scored 1–5 on
> six axes: substance / movement / scholarship / voice / completeness /
> findability. A surface is **shallow** if any axis ≤ 2; the standard is ≥ 4.
>
> Status: **17 of 26 tools scored.** The remaining 9 tools, all content
> libraries, and the hub pages hit an API session limit mid-read; the next
> sweep session picks up the list at the bottom.

## The table (min score first — shallowest at the top)

| Surface | Sub | Mov | Sch | Voi | Com | Fin | Min | Verdict |
|---|--|--|--|--|--|--|--|---|
| tools/SavedItems | 2 | 1 | 2 | 3 | 3 | 3 | **1** | Content-free localStorage viewer; name overpromises — shows only 2 of 4 save stores |
| tools/VerseFinder | 2 | 2 | 2 | 2 | 4 | 3 | **2** | Commits the exact proof-text reflex CLAUDE.md condemns; unnamed translation; truncated verses |
| tools/RuleOfLife | 3 | 3 | 2 | 5 | 4 | 4 | **2** | Best voice on the shelf, but 27 practices are bare one-line checkboxes — no Scripture, no cost |
| tools/ScriptureMemory | 3 | 2 | 3 | 3 | 4 | 3 | **2** | Competent drill, but never names its translation and never says why memorizing matters |
| tools/SermonOutline | 4 | 4 | 4 | 4 | 2 | 3 | **2** | Six publishable outlines — but 10 topics offered; 4 silently serve the Grace outline mislabeled (**bug**) |
| tools/BibleOnTopic | 3 | 2 | 3 | 4 | 4 | 3 | **2** | Well-voiced verse lookup that stops at the reference list; paraphrase-level renderings |
| tools/ChurchHealth | 4 | 4 | 2 | 5 | 5 | 4 | **2** | Best-engineered assessment — yet a church-health diagnostic with zero Scripture |
| tools/DiscipleshipTable | 3 | 3 | 3 | 4 | 3 | 4 | **3** | "Plan generator" is mostly static; cadence choice changes two words |
| tools/BibleStudy | 4 | 3 | 4 | 4 | 3 | 3 | **3** | Good orientation; all 12 "companion essay" links are the same generic URL |
| tools/BibleReference | 5 | 4 | 4 | 4 | 3 | 3 | **3** | Deepest reference tool; dead end — zero links out, no deep-links, unnamed translation |
| tools/ConflictGuide | 4 | 4 | 3 | 4 | 4 | 4 | **3** | Serious instrument with a real DV safety gate; loses your place on reload |
| tools/EmotionalHealth | 4 | 4 | 3 | 4 | 4 | 4 | **3** | Full symptom→cause→practice arc with a visible path to help; 3 items/category is coarse |
| tools/DeepBibleCompanion | 5 | 4 | 5 | 4 | 4 | 3 | **3** | The flagship earns it — 37 passages, real scholarship; stale "coming soon" copy, thin linking |
| tools/QuoteLibrary | 4 | 3 | 4 | 4 | 5 | 4 | **3** | 401 verbatim quotes, fully working; forms only by pointing back to essays |
| tools/WisdomFinder | 5 | 5 | 3 | 4 | 5 | 4 | **3** | The platform's best formation instrument (208 topics) — but verse "quotes" are silent paraphrases |
| tools/FamilyDevotionBuilder | 5 | 4 | 4 | 5 | 5 | 4 | **4** | The model tool: 40 age-banded devotions, verbatim KJV attributed, print term |
| tools/TheologyGlossary | 5 | 4 | 4 | 5 | 5 | 5 | **4** | Would survive print; two factual slips (Barth "bomb" line is Karl Adam's; "charaktir" isn't Hebrew) |

**Shallow (any axis ≤2): 7 of 17.** Deep to the standard: FamilyDevotionBuilder, TheologyGlossary.

## Cross-cutting findings (the board's synthesis so far)

1. **Unnamed translations everywhere.** At least five tools quote Scripture with
   no translation named (mostly reading as NIV) against the CLAUDE.md ESV
   default. WisdomFinder's ~1,040 verse texts include silent abridgments
   presented as quotation — the platform's own "verbatim or labeled paraphrase"
   rule, violated at scale. **This is the single highest-priority depth fix.**
2. **The deepest content is the worst-linked.** BibleReference and
   DeepBibleCompanion (the two richest bodies) have zero or near-zero links out
   and no URL-addressability; the assessments have great plumbing but thinner
   content. Depth and findability are inversely correlated on this shelf.
3. **Two honest bugs:** SermonOutline silently serves the Grace outline,
   mislabeled, for 4 of its 10 topics; SavedItems shows only 2 of the 4 save
   stores its hero copy claims.
4. **Two factual corrections owed** (fabricated-authority class):
   TheologyGlossary's Barth misattribution and false "charaktir" etymology;
   FamilyDevotionBuilder's uncited "There is research on this now."
5. **One consolidation candidate:** VerseFinder duplicates WisdomFinder's job
   without the context layers — fold or deepen.

## Remaining coverage (next sweep session)

- Tools not yet scored (reader hit the session limit): FinancialHealth,
  LifeAudit, MarriageAssessment, ParentingGuide, ParentingVerses,
  PassageContext, PastorBurnout, PrayerGenerator, Proverbs31.
- All content libraries: plans, studyguides (~32), howtos, wisdom, context,
  creeds+history, leadership/justice/disruption/prophetic, family JSONs.
- Hub pages: Doubt, Marriage, Parenting, Grief, MarriageCrisis,
  PastoralBurnout, Deconstruction, ChurchHurt, FaithCrisis, Theology,
  LifeIndex, Table, Exile, HardIssuesSeries, PostChristian.
- Essay/book corpus spot-audit by pillar.

## Deepening order (board triage of what's scored)

1. **Scripture integrity pass** (finding 1) — verbatim ESV or labeled
   paraphrase, translation named, across VerseFinder, BibleOnTopic,
   WisdomFinder, ScriptureMemory, BibleReference, ConflictGuide,
   EmotionalHealth. One standard, one pass.
2. **SermonOutline**: write the four missing outlines; honest fallback; print.
3. **SavedItems**: aggregate all four save stores.
4. **RuleOfLife**: Scripture + cost line per practice; >8-practice guard.
5. **ChurchHealth**: anchor each category in one verbatim passage.
6. **TheologyGlossary + FamilyDevotionBuilder**: the two factual corrections.
7. **Linking pass**: deep-links + essay cross-links for BibleReference,
   DeepBibleCompanion, BibleStudy.

---

## Full scores (all 48 surfaces read) — sweep 1 complete

### Libraries (the strongest layer — mostly elite already)
| Library | Min axis | Note |
|---|--|---|
| studyguides (62) | **5** | Crown jewel — leader-ready workbooks, real bibliographies, published-curriculum depth |
| context (31) | 4 | Published-workbook grade; only gap is prerender coverage |
| history (14) | 4 | Strongest library per its size; whole church-history arc |
| leadership (131 + 66 sermon books) | 4 | The deepest asset in the repo — a working pastor's shelf |
| justice (10 + timeline/glossary) | 4 | Both-sides steelman built into the JSON schema |
| disruption (12) | 4 | Same instrument aimed at both tribes |
| creeds (10) | 4 | Two catechisms are Q1-only stubs; rest full |
| plans (7) | 3 | Pastoral 8-week companions; half-hidden (no index, prerender gap) |
| howtos (132) | 4 | Practical without going merely practical |
| family (5 libs) | 3 | Real curriculum; unnamed translation is the one gap |
| wisdom (208) | 3 | Best formation instrument; the verse-integrity issue (now fixed in the tool) |
| prophetic | 3 | One excellent page, not a library (single 8KB file) |

### Hubs
| Hub | Min | Verdict |
|---|--|---|
| PostChristian | **1** | 50 of 60 article links dead; regenerate from api/post-christian-articles.json |
| ChurchHurt | **1** → fixed | 6 of 7 links were dead (survivor page) — **remapped this sweep** |
| Doubt | **1** → part | Link grid, no teaching; dead slug **fixed**; still needs prose + real destinations |
| Marriage | 2 | Best-wired pillar hub; "reading paths" cards go nowhere; needs prose |
| Parenting | 2 | "Conversation starters" are empty chips; off-palette hex |
| Deconstruction | 2 → fixed | Deep page; 2 dead doors **remapped** incl. the rebuild persona |
| FaithCrisis | 2 | Honest but teaches nothing on-page |
| LifeIndex | 2 | Infinite-loading bug (no LoadFailed); hardcoded hex |
| Grief / MarriageCrisis / PastoralBurnout | 3 | Competent-deep; best crisis-care copy on the site |
| Theology / Table / HardIssuesSeries | 3–4 | Deep hubs that teach their own posture |
| Exile | **5** | Cornerstone — a page that is itself an essay |

### Fixed this sweep (branch claude/depth-sweep-1)
- 9 dead essay links across 6 pages (ChurchHurt worst) → real corpus slugs
- WisdomFinder Scripture integrity (1,040 verses marked + linked to full passage)
- PastorBurnout resume bug; SermonOutline honest coverage; SavedItems full aggregation
- TheologyGlossary 2 misattributions; FamilyDevotionBuilder uncited claim + copy mismatch; typo

### Sweep 2 queue (ranked)
1. **PostChristian** tier lists — regenerate from the real 60-article corpus; fix numberOfItems.
2. **Pillar-hub teaching** — Doubt/Marriage/Parenting get real orientation prose + specific destinations; kill the empty "reading paths"/"conversation starters" shells.
3. **LifeIndex** — port the Table.tsx fetchJson + LoadFailed pattern; detokenize hex.
4. **Scripture-integrity, remaining tools** — VerseFinder, BibleOnTopic, ParentingVerses, Proverbs31, the assessments, family libs: name the translation or mark paraphrase.
5. **Prerender coverage** — /plans, /resources/context, /resources/creeds, /theology/history, per-book sermons, wisdom per-topic routes (100+ pages invisible to search).
6. **Structured data** — ItemList/Book on HardIssuesSeries, Table, Theology; per-topic routes for wisdom.
7. **Depth top-ups** — creeds catechisms beyond Q1; DiscipleshipTable real multi-week arcs; PrayerGenerator voice pass.

---

## Sweep 2 verification pass (2026-07-25)

> Every item in the queue above was re-checked against the working tree at
> `main` — not from memory, and not from the PR titles that claimed to close
> them. Method is recorded per row so the next reader can re-run it. Four of
> seven are genuinely closed. The one the board called **the single
> highest-priority depth fix** is still fully open.

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | PostChristian tier lists | **Closed** | All 60 page slugs now match `api/post-christian-articles.json` 1:1 (0 missing); `numberOfItems: 60` is accurate |
| 2 | Pillar-hub teaching | **Partial** | `/doubt` deepened to 6 prose blocks (symptom→cause→wisdom). Marriage + Parenting carry 1 orientation paragraph each; their card grids now resolve (all 3 Marriage `/read/essays-marriage-*` targets exist) and both pages are fully tokenized — zero hardcoded hex |
| 3 | LifeIndex | **Closed** | `fetchJson` + `LoadFailed` present (4 refs); zero hardcoded hex |
| 4 | Scripture integrity, remaining tools | **Open** | VerseFinder, BibleOnTopic, ParentingVerses, Proverbs31, ScriptureMemory, BibleReference: **zero** name a translation. Worse than the sweep-1 finding — the corpus is *mixed*, unlabeled (see below) |
| 5 | Prerender coverage | **Closed** | `prerender-heads.mjs` reports **0 uncovered routes**: 169 route heads from SEOMeta literals, 681/681 essays, 617 library pages, 1,746 per-route HTML files |
| 6 | Structured data | **Partial** | HardIssuesSeries has `ItemList`. Table and Theology still emit **no** `structuredData` at all. FAQ answer pages gained `BreadcrumbList` (PR #483) |
| 7 | Depth top-ups | **Open** | `heidelberg-catechism-q1.json` and `westminster-shorter-catechism-q1.json` remain Q1-only stubs |

### The finding that got worse on inspection

Sweep 1 called the unnamed translations "mostly reading as NIV." That was too
generous. The verse corpus across the tools is **mixed translations, none
labeled**:

- `VerseFinder` — Philippians 4:6-7 renders "in every situation… which
  transcends all understanding": **NIV**.
- `ParentingVerses` — Psalm 139:13-14 renders "you knitted me together in my
  mother's womb": **ESV**.
- `Proverbs31` — Proverbs 1:7 renders "the beginning of knowledge": **ESV**.

Two rules are broken at once. `CLAUDE.md` sets ESV as the default and requires
the translation be named when the choice is doing work; it also requires that
quotation be verbatim or marked as paraphrase. A reader memorizing from
`ScriptureMemory` cannot tell which text they are committing, and a pastor
handing a sheet to a congregation cannot cite it. This is the
fabricated-authority class of problem — the one trap `CLAUDE.md` says ends
trust rather than merely breaking a build — and it is the oldest open item on
the board.

### Sweep 3 queue (re-ranked, with the reasoning)

1. **The Scripture integrity pass.** Six tools, one standard, one pass: verbatim
   ESV with the reference travelling with the quote, or the rendering marked as
   paraphrase. Ship a shared `<ScriptureQuote>` (or a `translation` field on the
   verse records) so the label cannot be forgotten by the next tool, and add a
   validator to `scripts/` in the shape of `validate-formation.mjs` so CI holds
   the line. Highest rank because it is a trust problem, not a polish problem,
   and because it has now survived two sweeps.
2. **Catechism stubs.** Two of ten creed documents are Q1-only. A library that
   presents itself as the historic confessions and delivers one question is the
   thin-content pattern the board flagged elsewhere. Either finish them or say
   on the page that an excerpt is what is on offer.
3. **Table + Theology structured data.** Two of the deepest hubs emit none.
   `getBreadcrumbSchema` and an `ItemList` are already in `SEOMeta.tsx`; this is
   the same edit the FAQ pages just took, at hub scale.
4. **Marriage and Parenting, to the `/doubt` standard.** Both have a real
   opening paragraph and working destinations — the shells are gone. What is
   missing is the middle: the cause beneath the symptom before the links begin.
   One prose movement each, not a rewrite.
5. **The linking pass** (carried from sweep 1, still unstarted). BibleReference
   and DeepBibleCompanion remain the richest bodies with the fewest ways in or
   out. Deep-linkable URLs plus essay cross-links.
6. **DiscipleshipTable multi-week arcs; PrayerGenerator voice pass.** The two
   remaining "static generator" tools.

### Standing note for whoever runs sweep 3

The four closed items were closed by work that did not always announce itself
as closing them — LifeIndex and prerender coverage came in under other PRs.
Verify before scheduling. Conversely, do not read a merged PR title as a closed
audit row: item 4 has been listed as the top priority since sweep 1 and has
never been touched.
