# Content Density Map — LiveWell by James Bell

Method: read order/line-count triage across all ~180 reader-facing page files, then opened every candidate under ~160 lines plus every hub/landing/pillar page regardless of size. ~115 pages read directly (including every content-as-data template family — prophetic, nation, theology, leadership, life, context, creeds, history, table, studyguides, pathways — and every distinct book-sales-page pattern); the remainder (mostly 300+ line interactive tools and repeated dynamic templates) verified by representative sampling within each family, since every family sampled showed zero quality variance. Admin, ThankYou pages, AdminLogin, and pure redirects excluded per scope.

**Headline finding:** the content-as-data architecture (JSON libraries + templates) is exceptional and uniformly DENSE — over 140 pages checked with no quality drop-off. The real gaps are architectural/taxonomy drift, not missing prose: a fully-written reading-paths library that no page renders, a "Six Pillars" nav link that shows five different, legacy-named items, and five of six current pillars having no landing page at all.

## 1. Density Table

**DENSE — count and notable examples (no narration needed, nothing to add):**

~140+ pages. Every content-as-data template family is uniformly excellent: `prophetic/*` (Hub, Witnesses, Posture, Glossary, Lament, Consistency, Questions, Topic), `nation/*` (Hub, Essay, Policy, Scorecard), `resources/context*` and `resources/creeds*`, `history/HistoryEssay`, `life/LifeIndex` + `LifeDomain`, `table/Table` + `TableStudy`, `studyguides/StudyGuidesIndex`, `leadership/*` (Hub, Library, FormationIndex, FormationTopic, GovernanceLibrary, ServantLeadershipHandbook, SermonSeries, LeadershipArticle, BeforeYouPost), all `theology/*` sub-pages (Methodology, Traditions, Compare, Doctrine, Biblical, Questions), the entire `books/*` and root-level ebook sales-page family (Believe, DeconstructionOfFaith, ConsiderTheBirds, Babylon, WhyNotWhat, HeavenIsNotYourReward, BibleAndHomosexuality, etc. — ~28 pages, each with genuine per-book pitch prose), the richer landing pages (ChurchHurt, HonestQuestions, Deconstruction, ChurchHistory, PostChristian — each with real FAQ accordions and resource lists), and every major hub (Home, About, StartHere, Explore, Resources, ToolsHub, Discipleship, DiscipleMaking, Library, RoadMap, ForPastors, ForLeaders, Pastors, Membership, Marriage, Parenting, Family, Wisdom, HistoricFaith, FaqIndex, comparisons/*, faq/*, TheologyQuiz, StartHereQuiz, Diagnostic, SkepticTrack, Help, CarePlan, and the localStorage pastoral tools like BudgetCalculator/VisitationTracker/DecisionLog/Proverbs31). Privacy/Terms/Accessibility are appropriately brief for their genre. `ForPastors.tsx` and `ForLeaders.tsx` carry code comments documenting they were recently *fixed* from a broken state (wrong field names, dead buttons, stale pillar names) — now both DENSE.

**THIN / BARE — exhaustive:**

| PAGE FILE | ROUTE | VERDICT | WHAT'S MISSING |
|---|---|---|---|
| `pages/Pillars.tsx` | `/pillars` | THIN — stale/mislabeled | Shows five legacy-named pillars (Theological Depth, Prophetic Justice, Prophetic Disruption, Leadership Formation, Integrated Life). Footer/header nav (`lib/siteNav.ts`) links here labeled **"All six pillars"**, but none of the six PILLARS_V2 names (Capture by the Right/Left, Reading Scripture Past Our Politics, After Christendom, Pastoral Angle, Living Well) appear anywhere on the page. Duplicates nav items already listed above it. |
| `pages/Framework.tsx` | `/framework` | THIN — stale taxonomy (lower severity) | "Five pillars, one arc" framing doesn't reflect the current Diagnosis/Formation six-pillar model. Prose itself is well-written; only the taxonomy is out of sync. |
| `pages/LivingWell.tsx` | `/living-well` | THIN | Hero is a single reused sentence (the shared `Pillar.blurb` from `taxonomy.ts`, explicitly commented "restrained on purpose"), not original long-form intro. Subtheme cards are one-line blurbs with counts only — no featured essays shown. Thinner than sibling hubs (Exile, Nation Hub, Leadership Hub) which each carry 3+ paragraphs of distinctive hero prose. |
| *(no file — structural gap)* | `pillarUrl("capture-by-the-right")` etc. | BARE — page does not exist | Five of the six PILLARS_V2 pillars (the entire Diagnosis movement) have **no landing page**. Only Pillar 6 (Living Well) has one. The other five are reachable only via a bare `/writing?pillar=X` filtered list with zero intro copy. |
| `pages/ReadingPathDetail.tsx` | `/reading-paths/:slug` | BARE — live but non-functional | Runs its own hardcoded slug set (`pastors-guide`, `church-leadership`, etc.) that filters live posts by the legacy `post.topic` field — which `lib/readingPaths.ts`'s own header comment documents "most essays lack, so the lists rendered empty." None of its slugs match the six canonical paths already written in `lib/readingPaths.ts` (`capture-by-the-right`, `capture-by-the-left`, `reading-scripture-past-our-politics`, `the-church-after-christendom`, `the-pastoral-angle`, `start-here-blind-spots`). Nothing else in the site links to this route — `ReadingPaths.tsx` (the real `/reading-paths` index) links every article straight to `/writing/:slug` instead. **~70 curated essay entries in `lib/readingPaths.ts` are unused by any page in the codebase** (verified: zero imports anywhere). |
| `pages/Substack.tsx` | `/substack` | THIN | "What You Get" section ("Essays that go deeper," "Personal reflections," "Early access") is generic newsletter-marketing boilerplate — none of it is distinctively Bell-voice or specific to this platform. |
| `pages/EmailSignup.tsx` | `/subscribe` | THIN — intentional, documented | Code comment confirms this replaced a fake "8 reading-path email sequence" flow with no real send backend. Now one hero + one signup form + one CTA link; no content preview or sample essay. |
| `pages/landing/ParentingStruggles.tsx` | `/parenting-help` | THIN | ~150 words of original prose around a 5-article link list. No FAQ, no external-help resource block (its four crisis siblings all have one). |
| `pages/landing/FaithCrisis.tsx` | `/faith-crisis` | THIN | Same formulaic template (hero / one reassurance paragraph / 5 links / book pitch / signup / tool CTA); thinner than its closest siblings ChurchHurt.tsx / HonestQuestions.tsx, which add FAQ accordions. |
| `pages/landing/Grief.tsx` | `/grief` | THIN | Same template; original prose is one hero line + one paragraph before the article list. |
| `pages/landing/PastoralBurnout.tsx` | `/pastoral-burnout` | THIN | Same template pattern. |
| `pages/landing/MarriageCrisis.tsx` | `/marriage-crisis` | THIN | Same template pattern. |
| `TheMonsterInTheMirror.tsx`, `TheReliabilityOfScripture.tsx`, `BibleAndHomosexuality.tsx`, `BibleAndTransgenderIdentity.tsx`, `IsCriticalRaceTheoryBiblical.tsx` | `/books/the-monster-in-the-mirror` etc. | THIN — minor/cosmetic | These five use the shorter hero+pitch+buy template and lack the "What's Inside" chapter-list section every other book sales page carries (Believe, DeconstructionOfFaith, ConsiderTheBirds, Babylon, WhyNotWhat, HeavenIsNotYourReward…). Pitch prose itself is distinctive and on-voice — this is a structural/conversion gap, not a writing gap. |

## 2. Ranked Shortlist — Top 12 Content Gaps

**1. Wire up the orphaned Reading Paths library** — `lib/readingPaths.ts` → needs a real template at `/reading-paths/:slug`
Highest reader-impact-per-effort item on this list: the content already exists. Six paths matching the *current* taxonomy exactly, ~70 real essay entries with blurbs, already marked `available`/`available: false`. Replace `ReadingPathDetail.tsx`'s dead `post.topic` filter with a template that reads `getReadingPathBySlug()`. No new prose needed — hero (title + description already written), ordered entry list (available → link to `/writing/:slug`; unavailable → "Coming soon"), reuse `TopicPathway.tsx`'s visual pattern. ~150 lines of template code.

**2. Rebuild `/pillars`** to show the actual six PILLARS_V2 pillars
Nav-promoted from the footer of every page as "All six pillars"; currently shows five different, legacy-named items. Replace with two movement-grouped sections (Diagnosis: 5 cards, Formation: 1 card) pulling directly from `PILLARS_V2`/`MOVEMENTS` in `taxonomy.ts` — data already exists, template-only fix, ~150 lines.

**3–7. Build the five missing pillar landing pages** (mirror `LivingWell.tsx`):
- Capture by the Right (`/writing?pillar=capture-by-the-right`)
- Capture by the Left
- Reading Scripture Past Our Politics
- After Christendom
- The Pastoral Angle

These are the entire Diagnosis movement — half the site's core taxonomy — with zero dedicated entry point. Each needs: hero (eyebrow + H1 + 2–3 new paragraphs, ~150–250 words of Bell-voice intro per pillar — currently only a one-sentence `blurb` exists), a sub-theme or "what this covers" card block, live essay-count CTA into the filtered `/writing` view. ~120–140 lines per page, matching `LivingWell.tsx`'s structure.

**8. Bring the five crisis landing pages up to the ChurchHurt/HonestQuestions standard**
ParentingStruggles, FaithCrisis, Grief, PastoralBurnout, MarriageCrisis. Add a 4–5 item FAQ accordion (~100–150 words per answer, pattern already proven on the two richer siblings) and, for ParentingStruggles specifically, the "if you need more than an essay" resource block its four siblings already carry. +80–120 lines per page.

**9. Rewrite `Substack.tsx`'s "What You Get" section in Bell's voice**
Replace the three generic cards with specific, concrete copy naming actual essay topics or a real excerpt, matching the register already used on `/subscribe`. ~150–200 words of replacement copy, same structure.

**10. Reconcile `Framework.tsx`'s five-pillar language with the six-pillar/two-movement model**
Lower severity than #2 (doesn't literally claim "six"), but it's the site's stated unifying framework and is out of step with the Decision Log's canonical IA. Rewrite the five `MOVES` entries to six. ~250 words of adjusted copy plus route updates.

**11. Add "What's Inside" chapter lists to the five short-template book pages**
TheMonsterInTheMirror, TheReliabilityOfScripture, BibleAndHomosexuality, BibleAndTransgenderIdentity, IsCriticalRaceTheoryBiblical. Copy the `CHAPTERS` pattern from `Believe.tsx`/`DeconstructionOfFaith.tsx` (~15–20 lines of template) — requires sourcing the real chapter titles from each book, so this is a content-lookup task, not pure writing.

**12. `EmailSignup.tsx` build-out** — once real transactional email exists (already flagged in-file as roadmap LT-4)
Add a content preview/sample-essay excerpt once there's something real to preview. Lowest priority: the current minimalism is an honest, documented placeholder, not neglect — don't invest here until the backend gap closes.
