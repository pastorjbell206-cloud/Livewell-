# IA-MAP — Phase 0 Inventory & Map (LiveWell by James Bell)

The complete, accurate information-architecture map of the site as it exists today.
This is a **blueprint for human approval before any code moves.** Nothing here has
been implemented. READ-ONLY phase: no routes or components were changed.

## How to read this

- **Source of truth:** `client/src/App.tsx` (185 `path=` entries; 32 are `/admin/*`,
  out of scope; 153 non-admin routes mapped below).
- **The spine:** the five pillars — Theological Depth (`/theology`), Prophetic
  Justice (`/justice`), Prophetic Disruption (`/disruption`), Leadership Formation
  (`/leadership`), Integrated Life (`/life`) — plus audience entries: **Start here /
  skeptics**, **For Pastors / PCN**, **Resources** (exactly one thing: `/resources`),
  **Books**.
- **Audiences, in weight order:** (1) skeptics, (2) questioning Christians,
  (3) pastors, (4) people seeking to live well.
- **"Reached now" legend:** `nav` = primary nav (MinimalNav); `footer` = Footer;
  `hub:<which>` = reachable only via a parent hub/listing page; `ORPHAN` = not linked
  from nav, footer, or any hub/page found.
- **Recommendation verbs:** KEEP / MERGE(into X) / RENAME(to X) / RELOCATE(to X) /
  REDIRECT(to X).

### What the primary nav actually links to today

The nav (MinimalNav) is built from the five pillars. Each pillar dropdown leads with
its hub, plus a few curated sub-links, then "All <pillar>" and populated sub-pathway
filters on `/writing`. Hard nav links: each pillar hub (`/theology`, `/justice`,
`/disruption`, `/leadership`, `/life`), the pillar hub sub-links listed in
MinimalNav (`/life/assessment`, `/family`, `/theology/history`, `/theology/biblical`,
`/theology/questions`, `/theology/traditions`, `/disruption/consistency`,
`/disruption/questions`, `/justice/posture`, `/leadership/library`,
`/leadership/sermon-series`), **Study Guides & Series** → `/writing?series=true`,
**Books** → `/books`, **About** → `/about`, **Find Help** → `/help`, **Subscribe** →
`/start`, search → `/search`, mobile-only **Membership** → `/membership`.

### What the footer links to today

Five Pillars (`/theology`, `/justice`, `/disruption`, `/leadership`, `/life`);
Write & Read (`/writing`, `/books`, `/reading-paths`, `/start`, `/marriage`,
`/parenting`); Libraries & Tools (`/resources`, `/studyguides`, `/resources/context`,
`/leadership/library`, `/leadership/sermon-series`, `/discipleship`, `/tools`,
`/tools/theology-quiz`); For Pastors (`/pastors`, The Pastoral Angle pillar URL,
`/leadership`, `/resources/hard-issues-series`, `/leadership/formation`,
`/for-leaders`, `/resources`); Connect (`/about`, `/membership`, `/work-with-james`,
external links); bottom bar (`/privacy`, `/terms`, `/accessibility`).

---

# 1. Home & top-level

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/` | Home: four mission doors + five pillars | all | n/a | nav (logo) | KEEP |
| `/start` | Start-here quiz → personalized first reads | skeptics, questioning | n/a | nav ("Subscribe"), footer, hub:Home/Discipleship/Help | KEEP — make this the true audience router (Phase 3) |
| `/help` | Felt-need front door for 11 life situations | living well | n/a | nav ("Find Help"), hub:Home | KEEP |
| `/pillars` | Two-movement, six-pillar taxonomy catalog | questioning | n/a | ORPHAN | MERGE(into `/framework`) — duplicate explainer of the spine |
| `/framework` | The unifying framework: five pillars as one arc | questioning | n/a | hub:Theology | KEEP — canonical "the whole thing" explainer; absorb `/pillars` |
| `/diagnostic` | Eight-question spiritual-health diagnostic | living well | n/a | ORPHAN | RELOCATE(to `/tools`) — list as a tool; or MERGE into `/start` |
| `/roadmap` | 48-book publishing roadmap | living well | n/a | ORPHAN | RELOCATE(to `/books`) — link as "the roadmap" from Books |
| `/library` | Commonplace book of curated quotes | living well | n/a | ORPHAN | RELOCATE(to `/resources`) — list in Resource Hub |
| `/skeptic-track` | Seven-essay argued track for skeptics | skeptics | n/a | nav (via Home), hub:Home/Help | KEEP — top-weight audience; surface from `/start` |
| `/doubt` | Faith-crisis & doubt hub | skeptics, questioning | n/a | hub:Help | MERGE(into `/faith-crisis`) — same job (see Overlaps) |
| `/search` | Global search (articles/books/resources) | all | n/a | nav (search icon) | KEEP |
| `/membership` | Membership landing | all | n/a | footer, nav (mobile) | KEEP |
| `/membership/success` | Post-purchase thank-you | all | n/a | hub:Membership (post-checkout) | KEEP |
| `/about` | About James Bell | all | n/a | nav, footer | KEEP |

---

# 2. Writing & pillars

### The Writing (essays)

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/writing` | Filterable essay archive (pillar/sub/series/audience facets) | all | all | footer, hub:many | KEEP — canonical essay index |
| `/writing/:slug` | Single essay (reading progress, related) | all | varies | hub:Writing/most hubs | KEEP |
| `/writing?series=true` | "Study Guides & Series" nav target (series facet) | all | all | nav | KEEP as a facet (note: distinct from `/studyguides`, see Overlaps) |
| `/articles` | Redirect → `/writing` (ArticlesRedirect) | all | all | (legacy) | KEEP (redirect) — confirm 301 in vercel.json |
| `/article-collections` | Curated article collections for purchase | living well | varies | hub:Writing-detail | RELOCATE(to `/resources`) or MERGE(into `/books`) |
| `/authors/:slug` | Author profile + their articles | all | n/a | hub:Writing | KEEP |

### Integrated Life (pillar)

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/life` | Integrated Life hub ("one life, offered whole") | living well | Integrated Life | nav, footer | KEEP — canonical pillar hub |
| `/life/assessment` | Whole-Life Assessment tool | living well | Integrated Life | nav, footer(via hub), hub:Life/Help/Tools | KEEP — also list in `/tools` |
| `/life/:slug` | Life domain pages (inner life, body, home, money…) | living well | Integrated Life | hub:Life | KEEP |
| `/marriage` | Marriage content hub | living well | Integrated Life | footer, hub:Help/Life | KEEP — relabel as facet of Integrated Life |
| `/parenting` | Parenting content hub | living well | Integrated Life | footer, hub:Help/Life | KEEP — facet of Integrated Life / Family |

### Family (sub-area of Integrated Life)

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/family` | Family discipleship hub | living well | Integrated Life | nav (Life dropdown), hub:Life | KEEP |
| `/family/catechism` | Family catechism (52 weekly Qs) | living well | Integrated Life | hub:Family | KEEP |
| `/family/devotions` | Year of family devotions | living well | Integrated Life | footer(via Resources hub), hub:Family/Resources | KEEP |
| `/family/reading-plans` | Family Bible reading plans | living well | Integrated Life | hub:Family | KEEP |
| `/for-families` | Redirect → `/parenting` (ForFamiliesRedirect) | living well | Integrated Life | (legacy) | KEEP (redirect) |

---

# 3. Theological Depth (pillar)

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/theology` | Theology hub ("the Depth Hub") | questioning | Theological Depth | nav, footer | KEEP — canonical pillar hub |
| `/theology/how-to-use` | The triage framework & posture (pillar 0) | questioning | Theological Depth | hub:Theology | KEEP |
| `/theology/paths` | Guided reading paths by audience | questioning | Theological Depth | hub:Theology | KEEP — watch overlap w/ `/reading-paths` |
| `/theology/questions` | Hard questions, routed to studies | questioning | Theological Depth | nav, hub:Theology/Help/Discipleship | KEEP |
| `/theology/traditions` | Why so many churches? (traditions guide) | questioning | Theological Depth | nav, hub:Theology | KEEP |
| `/theology/history` | Church history overview | questioning | Theological Depth | nav, hub:Theology | KEEP |
| `/theology/history/:slug` | Individual church-history essay | questioning | Theological Depth | hub:Theology/history | KEEP |
| `/theology/biblical` | Biblical theology overview | questioning | Theological Depth | nav, hub:Theology/Discipleship | KEEP |
| `/theology/doctrine/:slug` | Individual worked doctrine | questioning | Theological Depth | hub:Theology | KEEP |
| `/theology/creeds` | Creeds & confessions | questioning | Theological Depth | hub:Theology | KEEP — note duplicate at `/resources/creeds` (see Overlaps) |
| `/theology/hermeneutics` | Interpretation method | questioning | Theological Depth | hub:Theology | KEEP |
| `/theology/glossary` | Theological terms | questioning | Theological Depth | hub:Theology | KEEP |
| `/theology/passage` | Passage Context Tool | questioning | Theological Depth | hub:Theology/Tools | KEEP — list in `/tools` |
| `/theology/compare` | Compare doctrinal views tool | questioning | Theological Depth | hub:Theology/Help | KEEP |
| `/theology/which-view` | Diagnostic quiz (doctrinal positioning) | questioning | Theological Depth | hub:Theology | KEEP |
| `/theology/search` | Theology-section search | questioning | Theological Depth | hub:Theology | MERGE(into `/search`) — one search (Phase 6) |

---

# 4. Prophetic Disruption (pillar)

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/disruption` | Disruption hub | questioning, pastors | Prophetic Disruption | nav, footer | KEEP — canonical pillar hub |
| `/disruption/posture` | "Read this first" — fair posture | questioning | Prophetic Disruption | hub:Disruption | KEEP |
| `/disruption/consistency` | The Consistency Check (flagship tool) | questioning | Prophetic Disruption | nav, hub:Disruption | KEEP — list in `/tools` |
| `/disruption/questions` | Hard questions (gospel & politics) | questioning | Prophetic Disruption | nav, hub:Disruption | KEEP |
| `/disruption/witnesses` | People who told costly truth | questioning | Prophetic Disruption | hub:Disruption | KEEP |
| `/disruption/glossary` | Disruption terms | questioning | Prophetic Disruption | hub:Disruption | KEEP |
| `/disruption/topic/:slug` | Individual disruption topic | questioning | Prophetic Disruption | hub:Disruption | KEEP |

### Christ & the Nation (sub-hub bridging Disruption + Justice)

`/nation` is explicitly a sub-hub spanning both prophetic pillars; linked from both
`/disruption` and `/justice` with return links to both. Recommend it lives under
**Prophetic Disruption** in the nav (its center of gravity is Christian nationalism /
church & empire) but keep cross-links from Justice.

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/nation` | Christ & the Nation sub-hub | questioning, pastors | Disruption (+Justice) | hub:Disruption/Justice | KEEP |
| `/nation/christian-nation` | Was America founded Christian? | questioning | Disruption | hub:Nation | KEEP |
| `/nation/theocracy` | OT theocracy & why it can't be rebuilt | questioning | Disruption | hub:Nation | KEEP |
| `/nation/empire` | The seduction of empire | questioning | Disruption | hub:Nation | KEEP |
| `/nation/render` | Dual citizenship / faithful presence | questioning | Disruption | hub:Nation | KEEP |
| `/nation/which-party` | Verdict: depends on issue weighting | questioning | Disruption | hub:Nation | KEEP |
| `/nation/scorecard` | Even-handed party-to-Bible scorecard | questioning | Disruption | hub:Nation | KEEP — list in `/tools` |
| `/nation/policy` | Biblical principles for government | questioning | Disruption | hub:Nation | KEEP |
| `/lament` | Prophetic prayers / confession / restoration | questioning | Justice/Disruption | hub:Disruption/Justice/Help | KEEP |

---

# 5. Prophetic Justice (pillar)

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/justice` | Justice hub | questioning, pastors | Prophetic Justice | nav, footer | KEEP — canonical pillar hub |
| `/justice/posture` | "The Call" — biblical justice from the text | questioning | Prophetic Justice | nav, hub:Justice | KEEP |
| `/justice/witnesses` | Witnesses (abolitionists, rescuers…) | questioning | Prophetic Justice | hub:Justice | KEEP |
| `/justice/timeline` | Honest reckoning timeline | questioning | Prophetic Justice | hub:Justice/Disruption | KEEP |
| `/justice/glossary` | Justice terms (mishpat, tsedaqah…) | questioning | Prophetic Justice | hub:Justice | KEEP |
| `/justice/topic/:slug` | Individual justice topic | questioning | Prophetic Justice | hub:Justice | KEEP |

---

# 6. Leadership Formation (pillar) — for pastors

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/leadership` | Leadership hub (working library for pastors) | pastors | Leadership Formation | nav, footer | KEEP — canonical pillar hub |
| `/leadership/library` | Searchable leadership-article corpus | pastors | Leadership Formation | nav, footer, hub:Leadership/Resources | KEEP |
| `/leadership/sermon-series` | Sermon Series Library | pastors | Leadership Formation | nav, footer, hub:Leadership/Resources | KEEP |
| `/leadership/article/:slug` | Long-form leadership article | pastors | Leadership Formation | hub:Leadership/library/Discipleship | KEEP |
| `/leadership/formation` | Deep Formation hub | pastors | Leadership Formation | footer, hub:Leadership | KEEP |
| `/leadership/formation/:slug` | Deep-formation topic | pastors | Leadership Formation | hub:formation/Help | KEEP |
| `/leadership/inventory` | Character-first formation inventory | pastors | Leadership Formation | hub:formation/Help/Tools | KEEP — list in `/tools` |
| `/leadership/team` | Team workspace (sign-in) | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/sermon-prep` | Exegesis → outline workflow | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/illustrations` | Sermon illustration bank | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/meeting` | Meeting agenda builder | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/visitation` | Pastoral visit tracker | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/governance` | Board/safeguarding policy templates | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/budget` | Church budget allocator | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/decision-log` | Benevolence/board decision log | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/before-you-post` | Leader social-media examen | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/assessment/:slug` | Readiness self-exams (elder/deacon/burnout…) | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/survey/:slug` | Congregational diagnostic surveys | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/workflow/:slug` | Guided planning (revitalization/premarital…) | pastors | Leadership Formation | hub:Leadership | KEEP |
| `/leadership/service/:slug` | Service builders (wedding/funeral) | pastors | Leadership Formation | hub:Leadership | KEEP |

### Pastor audience landing pages (the "For Pastors" entry)

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/pastors` | Pastors Connection Network (PCN) landing | pastors | n/a | footer, hub:Discipleship/PRW | KEEP — canonical "For Pastors / PCN" entry |
| `/for-pastors` | Curated pastoral essays + track browser | pastors | n/a | ORPHAN | MERGE(into `/pastors`) — near-duplicate of `/for-leaders` |
| `/for-leaders` | Leadership content for elders/lay leaders | pastors | n/a | footer | MERGE(into `/pastors` or `/leadership`) — near-duplicate of `/for-pastors` |
| `/pastors-resource-wall` | Pastor tool wall (sermon/care tools) | pastors | n/a | hub:for-pastors | MERGE(into `/leadership` or `/pastors`) |
| `/resources-for-pastors` | Free pastor downloads | pastors | n/a | ORPHAN | MERGE(into `/resources`) — duplicate downloads list |
| `/work-with-james` | Speaking/coaching/consulting inquiry | all | n/a | footer | KEEP |

---

# 7. Resources & downloads (the one "Resources")

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/resources` | The Resource Hub (libraries + DB downloads) | all | n/a | nav-absent / footer | KEEP — the **only** thing named "Resources"; add to primary nav |
| `/resources/context` | Reading Scripture in Context library | questioning | Theological Depth | footer, hub:Resources/Help | KEEP |
| `/resources/context/:slug` | Single context essay | questioning | Theological Depth | hub:context/Discipleship | KEEP |
| `/resources/creeds` | Creeds, confessions & classics | questioning | Theological Depth | hub:Resources | MERGE(into `/theology/creeds`) — pick one canonical creeds home |
| `/resources/creeds/:slug` | Single creed/confession text | questioning | Theological Depth | hub:creeds | KEEP (under whichever creeds home wins) |
| `/resources/hard-issues-series` | Hard Issues Series (PCN elder booklets) | pastors | Leadership Formation | footer, hub:Resources/Leadership/PRW | KEEP — but unify gated-download pattern with Study Guides |
| `/files` | File storage/upload UI | n/a (internal) | n/a | ORPHAN | RELOCATE(to `/admin`) — looks like an admin/utility tool, not public |

---

# 8. Study Guides

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/studyguides` | Study Guides hub (free leader toolkits) | pastors, living well | varies | footer, hub:Resources | KEEP — canonical study-guide home |
| `/studyguides/:slug` | Single study guide (gated PDFs, sessions) | pastors, living well | varies | hub:studyguides | KEEP |

Note: the **nav** label "Study Guides & Series" points at `/writing?series=true`
(an essay-series facet), **not** at `/studyguides`. That is a real label collision —
see Overlaps.

---

# 9. Books

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/books` | Books landing + reading paths + catalog | all | n/a | nav, footer | KEEP — canonical Books home |
| `/books/:slug` | Book detail (sample, purchase, recs) | all | n/a | hub:Books | KEEP — generic/DB-backed detail |
| `/books-store` | Stripe shopping interface | all | n/a | ORPHAN | MERGE(into `/books`) — second store page |
| `/book-bundles` | Book bundle offers | all | n/a | ORPHAN | RELOCATE(to `/books`) — link as a section of Books |
| `/substack` | Substack newsletter signup | all | n/a | ORPHAN | MERGE(into `/start` or footer) — overlaps Subscribe/`/start` |

### Hard-coded book landing + thank-you pages

These are self-contained marketing landers (not DB-backed); each has a Stripe button
→ thank-you page with EPUB/PDF links. They overlap conceptually with `/books/:slug`
(BookDetail) but coexist because they are custom-built. Keep them, but make sure
`/books` links to them and that `/books/:slug` does not also resolve the same slug.

| route group | book | reached now | recommendation |
|---|---|---|---|
| `/books/when-god-bless-america` (+`/thank-you`) | When God Blessed America | hub:Books | KEEP |
| `/books/believe` (+`/thank-you`) | Believe | hub:Books | KEEP |
| `/books/deconstruction-of-faith` (+`/thank-you`) | Deconstruction of Faith | hub:Books | KEEP |
| `/books/raising-believers` (+`/thank-you`) | Raising Believers | hub:Books | KEEP |
| `/books/the-monster-in-the-mirror` (+`/thank-you`) | The Monster in the Mirror | hub:Books | KEEP |
| `/books/the-reliability-of-scripture` (+`/thank-you`) | The Reliability of Scripture | hub:Books | KEEP |
| `/books/bible-and-homosexuality` (+`/thank-you`) | Bible and Homosexuality | hub:Books | KEEP |
| `/books/bible-and-transgender-identity` (+`/thank-you`) | Bible and Transgender Identity | hub:Books | KEEP |
| `/books/critical-race-theory-biblical` (+`/thank-you`) | Is Critical Race Theory Biblical? | hub:Books | KEEP |
| `/consider-the-birds` (+`/thank-you`) | Consider the Birds (LiveWell Series) | hub:Books | KEEP — or RENAME to `/books/consider-the-birds` |
| `/where-your-treasure-is` (+`/thank-you`) | Where Your Treasure Is (LiveWell Series) | hub:Books | KEEP — or RENAME to `/books/where-your-treasure-is` |

---

# 10. Tools

`/tools` (ToolsHub) is the single tool directory. Several tools live at non-`/tools`
URLs but should be *listed* in `/tools` (per the IA blueprint).

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/tools` | Tool directory | all | n/a | footer, hub:Resources/Family | KEEP |
| `/tools/theology-quiz` | Theology quiz (20 Q) | questioning | Theological Depth | footer, hub:Tools | KEEP |
| `/quiz` | Legacy alias → theology quiz (TheologyQuiz) | questioning | Theological Depth | (legacy) | REDIRECT(to `/tools/theology-quiz`) — confirm 301 |
| `/tools/verse-finder` | Bible verse finder | living well | n/a | hub:Tools/Family/PRW | KEEP |
| `/tools/prayer-generator` | Prayer generator | living well | n/a | hub:Tools/Help/Discipleship | KEEP |
| `/tools/bible-study` | Bible study guide | living well | n/a | hub:Tools/Family | KEEP |
| `/tools/deep-bible` | Deep Bible companion | living well | n/a | hub:Tools/PRW | KEEP |
| `/tools/parenting-verses` | Parenting Bible verses | living well | Integrated Life | hub:Tools | KEEP |
| `/tools/parenting-guide` | Parenting stage guide | living well | Integrated Life | hub:Tools/Help | KEEP |
| `/tools/family-devotions` | Family devotion builder | living well | Integrated Life | hub:Tools/Family/Help | KEEP |
| `/tools/marriage-assessment` | Marriage health assessment | living well | Integrated Life | hub:Tools/Marriage/Help | KEEP |
| `/tools/financial-health` | Financial health check | living well | Integrated Life | hub:Tools/Help/Discipleship | KEEP |
| `/tools/emotional-health` | Emotional health assessment | living well | Integrated Life | hub:Tools/Help | KEEP |
| `/tools/life-audit` | Life audit (8 areas) | living well | Integrated Life | hub:Tools/Help | KEEP |
| `/tools/scripture-memory` | Scripture memory system | living well | n/a | hub:Tools/Discipleship/PRW | KEEP |
| `/tools/conflict-guide` | Conflict resolution guide | living well, pastors | n/a | hub:Tools/Help/PRW | KEEP |
| `/tools/sermon-outline` | Sermon outline generator | pastors | Leadership Formation | hub:Tools/PRW | KEEP |
| `/tools/pastor-burnout` | Pastor burnout diagnostic | pastors | Leadership Formation | hub:Tools/Help/PRW | KEEP |
| `/tools/church-health` | Church health check | pastors | Leadership Formation | hub:Tools/PRW | KEEP |
| `/tools/saved` | Saved verses & prayers | all | n/a | hub:Tools | KEEP |

---

# 11. Plans / Reading paths / Discipleship

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/discipleship` | Four-stage discipleship pathway | living well, questioning | n/a | footer, hub:Resources/Home/Help/Life | KEEP — canonical discipleship home |
| `/reading-paths` | Curated reading paths (essay sequences) | all | n/a | footer, hub:Resources/Discipleship | KEEP |
| `/reading-paths/:slug` | Single reading path | all | varies | hub:reading-paths | KEEP |
| `/plans/:slug` | 8-week guided care plans (marriage/anxiety/grief…) | living well | n/a | hub:Help | KEEP — surface from `/start` and `/help` |

Overlap to resolve: `/discipleship` vs `/start` vs `/reading-paths` vs
`/theology/paths` all offer "ordered sequences to move through." See Overlaps.

---

# 12. Lead magnets

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/lead-magnets/:magnetId` | Gated lead-magnet landing pages | all | varies | ORPHAN | RELOCATE(to `/resources`) — list each magnet in the unified Resource Hub |

Magnet IDs found: `leadership-audit`, `prophetic-manifesto`, `theology-workbook`,
`life-diagnostic`, `community-roadmap`. There is **no index page** — these are
reachable only by direct URL/campaign link, so as a group they are ORPHANS in the
on-site IA. They overlap heavily with Study Guides, Hard Issues, and the `/resources`
downloads (all are email-gated PDFs).

---

# 13. Help / crisis landing pages

Felt-need landers, reached from `/help`. They overlap with the pillar/life content
they point into.

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/pastoral-burnout` | "Ministry was never supposed to feel like this" | pastors | Leadership Formation | hub:Help | KEEP |
| `/faith-crisis` | "When the faith you were given stops holding" | skeptics, questioning | n/a | ORPHAN (not linked from /help by this slug) | MERGE with `/doubt` — pick one faith-crisis home, link from `/help` |
| `/marriage-crisis` | "The silence between you…" | living well | Integrated Life | ORPHAN | KEEP — but link from `/help` (it currently routes to `/marriage`/`/plans/marriage`) |
| `/grief` | "Grief needs to be carried" | living well | Integrated Life | hub:Help | KEEP |
| `/parenting-help` | "You need better tools than you were given" | living well | Integrated Life | ORPHAN | KEEP — link from `/help` (currently `/help` points to `/parenting`) |

---

# 14. Legal / utility

| path | what it is | audience | pillar | reached now | recommendation |
|---|---|---|---|---|---|
| `/privacy` | Privacy policy | all | n/a | footer | KEEP |
| `/terms` | Terms of use | all | n/a | footer | KEEP |
| `/accessibility` | Accessibility statement | all | n/a | footer | KEEP |
| `/404` | Not-found page | all | n/a | (fallback) | KEEP |

---

# 15. Admin (excluded)

Out of scope for the public IA. Listed once for completeness — 32 routes, all behind
auth: `/admin/login`, `/admin`, `/admin/posts`, `/admin/posts/new`,
`/admin/posts/:id/edit`, `/admin/resources`, `/admin/resources/new`,
`/admin/resources/:id/edit`, `/admin/books`, `/admin/books/new`,
`/admin/books/:id/edit`, `/admin/about`, `/admin/settings`, `/admin/subscribers`,
`/admin/sync`, `/admin/publish-content`, `/admin/setup-navigation`,
`/admin/deduplicate`, `/admin/load-drafts`, `/admin/import-substack`,
`/admin/moderation`, `/admin/notifications`. (`/files` is public today but behaves
like an admin utility — flagged above to relocate behind admin.)

---

# Summary A — Orphans

Routes **not reachable** from nav, footer, or any hub/page (the biggest clarity
problem — real content with no on-site front door):

1. `/pillars` — duplicate spine explainer (merge into `/framework`).
2. `/diagnostic` — spiritual-health quiz (relocate to `/tools` / `/start`).
3. `/roadmap` — 48-book roadmap (relocate to `/books`).
4. `/library` — quotes commonplace book (relocate to `/resources`).
5. `/for-pastors` — pastoral essays (merge into `/pastors`).
6. `/resources-for-pastors` — pastor downloads (merge into `/resources`).
7. `/files` — file storage UI (relocate behind admin).
8. `/books-store` — second store page (merge into `/books`).
9. `/book-bundles` — bundles (relocate to `/books`).
10. `/substack` — newsletter signup (merge into `/start`/footer).
11. `/lead-magnets/:magnetId` (all 5 magnets) — no index; campaign-link-only
    (relocate/list in `/resources`).
12. `/faith-crisis`, `/marriage-crisis`, `/parenting-help` — crisis landers not
    actually linked from `/help` (which currently points to `/doubt`, `/marriage`,
    `/parenting` instead). Wire them into `/help`.

Near-orphan (one indirect path only): `/for-leaders` (footer only, duplicate of
`/for-pastors`); `/pastors-resource-wall` (only via `/for-pastors`);
`/article-collections` (only via a Writing-detail back link).

---

# Summary B — Overlaps / duplication

Each cluster does one job under multiple names. Recommended single canonical home in
**bold**.

1. **Gated PDF resources** — `/studyguides`, `/resources/hard-issues-series`,
   `/lead-magnets/:id`, `/resources-for-pastors`, `/article-collections`, and the
   DB-downloads on `/resources` all do "email-gated downloadable material." Canonical
   home: **`/resources`** as the one filterable downloads hub (by pillar / audience /
   format), with Study Guides and Hard Issues as *categories* inside it and a single
   `GatedDownload` pattern. Retire `/resources-for-pastors` and `/lead-magnets` as
   standalone silos.

2. **"Ordered sequences to move through"** — `/discipleship`, `/start`,
   `/reading-paths`, `/theology/paths`, `/plans/:slug`. Canonical: **`/start`** routes
   the audience; **`/discipleship`** is the long pathway; **`/reading-paths`** is the
   library of finishable essay sequences; fold `/theology/paths` into
   `/reading-paths` (or keep as a theology-only view that reuses the same component).
   `/plans/:slug` are care plans — keep, but reach them through `/help` + `/start`.

3. **Books storefronts** — `/books`, `/books-store`, `/book-bundles`, plus 11
   hard-coded book landers and the `/books/:slug` catch-all. Canonical: **`/books`**
   is the single front door; merge `/books-store` and `/book-bundles` into it as
   sections; ensure each hard-coded lander is the one resolver for its slug (no
   `/books/:slug` collision).

4. **"For pastors" landing pages** — `/pastors` (PCN), `/for-pastors`,
   `/for-leaders`, `/pastors-resource-wall`, `/resources-for-pastors`. `/for-pastors`
   and `/for-leaders` are near-identical (same CTAs, same destinations). Canonical:
   **`/pastors`** as the audience door + **`/leadership`** as the working library;
   merge the four others into those two.

5. **Faith-crisis / doubt** — `/doubt` and `/faith-crisis` are the same job (front
   door for deconstruction/doubt). Canonical: **`/faith-crisis`** (clearer felt-need
   label) — or `/doubt`; pick one, redirect the other, and link it from `/help` and
   `/skeptic-track`.

6. **Creeds** — `/theology/creeds` (+ none below it) vs `/resources/creeds`
   (+`/resources/creeds/:slug`). Same content type. Canonical: **`/theology/creeds`**
   as the reference home; the detail pages live under it; redirect `/resources/creeds`.

7. **Theology section search vs global search** — `/theology/search` vs `/search`.
   Canonical: **`/search`** (Phase 6: one search across articles/books/resources);
   redirect `/theology/search`.

8. **Study Guides label collision** — the nav's "Study Guides & Series" →
   `/writing?series=true` (essay series) while the *actual* study-guide product lives
   at **`/studyguides`**. Rename the nav facet to "Essay Series" (or point it at
   `/studyguides`) so one label names one thing.

9. **Integrated Life vs facets** — `/life`, `/marriage`, `/parenting`, `/family`,
   `/life/:slug` all live in one pillar. Keep `/life` canonical; treat the others as
   labeled facets/sub-hubs of Integrated Life (they already nest correctly).

---

# Summary C — Proposed primary nav (≤7 top-level)

Built on the five-pillar spine + the audience/utility entries. Two levels max.

1. **Theological Depth** (`/theology`)
   - The Depth Hub (`/theology`) · Hard Questions (`/theology/questions`) ·
     Church History (`/theology/history`) · Biblical Theology (`/theology/biblical`) ·
     Creeds & Confessions (`/theology/creeds`) · Why So Many Churches?
     (`/theology/traditions`)

2. **Prophetic Justice** (`/justice`)
   - The Justice Hub (`/justice`) · The Call (`/justice/posture`) ·
     Witnesses (`/justice/witnesses`) · Christ & the Nation (`/nation`)

3. **Prophetic Disruption** (`/disruption`)
   - The Disruption Hub (`/disruption`) · The Consistency Check
     (`/disruption/consistency`) · Hard Questions (`/disruption/questions`) ·
     Christ & the Nation (`/nation`)

4. **Leadership Formation** (`/leadership`)  *(also the "For Pastors" home base)*
   - The Leadership Hub (`/leadership`) · Leadership Library (`/leadership/library`) ·
     Sermon Series (`/leadership/sermon-series`) · Deep Formation
     (`/leadership/formation`) · Pastors Connection Network (`/pastors`) ·
     Hard Issues Series (`/resources/hard-issues-series`)

5. **Integrated Life** (`/life`)
   - The Integrated Life Hub (`/life`) · Whole-Life Assessment (`/life/assessment`) ·
     Family Discipleship (`/family`) · Marriage (`/marriage`) · Parenting
     (`/parenting`)

6. **Resources** (`/resources`)  *(the one "Resources")*
   - The Resource Hub (`/resources`) · Study Guides (`/studyguides`) ·
     Reading Scripture in Context (`/resources/context`) · Reading Paths
     (`/reading-paths`) · Tools (`/tools`) · The Discipleship Pathway
     (`/discipleship`)

7. **Books** (`/books`) — flat link.

Persistent right-side utilities (outside the 7): **Start here** (`/start`) ·
**Find Help** (`/help`) · search (`/search`) · **About** (`/about`) ·
**Subscribe/Membership** (`/start` / `/membership`).

### Mirrored footer (same spine)

- **The Five Pillars** — Theological Depth (`/theology`) · Prophetic Justice
  (`/justice`) · Prophetic Disruption (`/disruption`) · Leadership Formation
  (`/leadership`) · Integrated Life (`/life`)
- **Start & Find Help** — Start here (`/start`) · Find Help (`/help`) ·
  Discipleship Pathway (`/discipleship`) · Reading Paths (`/reading-paths`)
- **Write & Read** — The Writing (`/writing`) · Books (`/books`) · The Roadmap
  (`/roadmap`) · The Commonplace Library (`/library`)
- **Resources & Tools** — The Resource Hub (`/resources`) · Study Guides
  (`/studyguides`) · Reading Scripture in Context (`/resources/context`) ·
  Leadership Library (`/leadership/library`) · Sermon Series
  (`/leadership/sermon-series`) · All Tools (`/tools`)
- **For Pastors** — Pastors Connection Network (`/pastors`) · The Leadership Hub
  (`/leadership`) · Hard Issues Series (`/resources/hard-issues-series`) ·
  Deep Formation (`/leadership/formation`)
- **Connect** — About James Bell (`/about`) · Membership (`/membership`) ·
  Work With James (`/work-with-james`) · Substack · Contact
- **Bottom bar** — Privacy (`/privacy`) · Terms (`/terms`) · Accessibility
  (`/accessibility`)

This nav surfaces every previously-orphaned hub through a single labeled home, names
"Resources" exactly once, keeps the spine identical in header and footer, and reduces
the public surface from 153 routes to ~7 doors.
