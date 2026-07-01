# 14 — Tool-by-Tool Usefulness (Audit 3.1)

> Site-elevation audit, step 3.1. Every interactive tool judged **as a product**,
> against one bar: *would a reader keep this URL because they cannot get it
> anywhere else?* Read-only; no code changed. Inventory basis:
> `00-architecture-map.md` §4 (52 interactive surfaces). Audiences in order:
> skeptics, doubting Christians, pastors (PCN channel), seekers in crisis.
>
> Method: all 27 `/tools` pages + hub, all 11 `/leadership` instruments (4 of
> them JSON-engine-driven), the 3 entry diagnostics, and `/life/assessment`
> were read at the data level — the actual questions, verses, guidance text,
> and scoring — not just the UI. Verbatim strong/weak quotes are given for the
> 12 largest tools. Verdict format per tool: WHO · SUBSTANCE · BREAKS · 10X.

## Status

- [x] Inventory confirmed (routes + line counts)
- [ ] §1 /tools estate verdicts (27 pages + hub)
- [ ] §2 Leadership instruments verdicts (11 + 4 engines)
- [ ] §3 Entry diagnostics verdicts (3 + 1)
- [ ] §4 Tiers (Strong / Shallow / Cut-or-merge)
- [ ] §5 Signature candidates, cut list, estate verdict, ranked findings

## 0. Inventory (what was audited)

**/tools estate — 28 pages.** Hub `client/src/pages/ToolsHub.tsx` (26
registered) + 27 tool pages. Four are reachable only by direct URL —
`/tools/bible-says` (BibleReference.tsx, 1,692 lines), `/tools/quotes`
(QuoteLibrary.tsx), `/tools/glossary` (TheologyGlossary.tsx, 1,646 lines),
`/tools/saved` (SavedItems.tsx) — contradicting the Decision Log claim that
"all tools are registered in /tools."

Line counts (data lives inline in JSX): DeepBibleCompanion 1,905 ·
BibleReference 1,692 · PastorBurnout 1,681 · TheologyGlossary 1,646 · LifeAudit
1,467 · ConflictGuide 1,461 · ChurchHealth 1,451 · MarriageAssessment 1,198 ·
FinancialHealth 1,163 · SermonOutline 1,087 · ScriptureMemory 1,037 ·
EmotionalHealth 970 · FamilyDevotionBuilder 913 · ParentingGuide 893 ·
BibleStudy 786 · QuoteLibrary 551 · PassageContext 441 · PrayerGenerator 400 ·
VerseFinder 395 · DiscipleshipTable 322 · BibleOnTopic 300 · WisdomFinder 285 ·
RuleOfLife 259 · TheologyQuiz 231 · ParentingVerses 220 · SavedItems 204 ·
Proverbs31 142.

**/leadership instruments — 11 routes.** Sermon Workbench (`/leadership/sermon-prep`),
Illustration Library, Meeting Builder, Visitation Tracker, Budget Calculator,
Decision Log, Before You Post, Formation Inventory, plus four JSON-driven
engines each powering multiple instruments from `client/public/leadership/*/`:
LeaderAssessment (`/leadership/assessment/:slug`), ProfileSurvey
(`/survey/:slug`), GuidedWorkflow (`/workflow/:slug`), ServiceBuilder
(`/service/:slug`).

**Entry diagnostics — 3 (+1).** `/diagnostic`, `/start` (StartHereQuiz),
`/start-here` (StartHereDiagnostic); `/life/assessment` audited alongside.

**Cross-cutting facts** (from the architecture map, re-verified): only
TheologyQuiz touches the API; everything else is client-only with localStorage
persistence; no tool has a single test; ~14k lines of reference data are
hardcoded inside the 10 largest components.

*(Sections below are filled in as the audit completes.)*
