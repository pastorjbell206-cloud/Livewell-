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
