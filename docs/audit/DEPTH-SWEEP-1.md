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
