# SEO & Growth Audit — LiveWell by James Bell

## Two systemic bugs found (fix once, fix everywhere)

**1. Title double-suffix collision — 106 of ~183 indexable pages.** `SEOMeta.tsx:45` and the parallel `buildHead()` in `scripts/prerender-heads.mjs:296` both do `title.includes(SITE_NAME) ? title : \`${title} | ${SITE_NAME}\`` where `SITE_NAME = "LiveWell by James Bell"` (exact string). Component titles ending `"— by James Bell"`, `"— by James C. Bell"`, or `"| LiveWell"` don't match that exact substring, so the suffix appends anyway. Result: rendered `<title>` tags like `"Raising Believers: Christian Parenting in a Post-Christian World — by James Bell | LiveWell by James Bell"` (105 chars, "James Bell" twice) or `"Baptist vs. Methodist: What's the Difference? | LiveWell | LiveWell by James Bell"` (81 chars, "LiveWell" twice). Verified mechanically across all literal/resolvable titles — full list of 106 files available on request. **One-line fix in two files closes all 106 at once**: match on `"James Bell"` instead of the full site name, or strip a trailing `"— by James Bell"/"| James Bell"/"| LiveWell"` fragment before appending.

**2. Six JSON-driven route families (~84 real, sitemap-eligible URLs) get zero prerender coverage** — non-JS crawlers and social scrapers see the generic homepage fallback instead of page-specific meta, because `prerender-heads.mjs`'s route-table extraction skips `:slug` routes and its `LIBRARY_SOURCES`/`STATIC_PAGES` special-casing (which correctly solves this exact problem for 10 *other* content families) was never extended to these:

| Route | Component | Count | Sitemap? | Manifest exists? |
|---|---|---|---|---|
| `/theology/doctrine/:slug` | `TheologyDoctrine.tsx` | 50 | **No** | No — needs one built |
| `/nation/:slug` | `NationEssay.tsx` | 10 | 5/10 | Per-slug JSON only |
| `/justice/*`, `/disruption/*` sub-pages | `PropheticPosture/Glossary/Questions/Witnesses/Consistency/Timeline.tsx` | 9 | Yes | Config object (`lib/prophetic.ts`), not JSON |
| `/pathways/:slug` (+ `/pathways` hub) | `TopicPathway.tsx` | 8 | **No** | **Yes** — `client/public/pathways/index.json` already exists |
| `/plans/:slug` | `CarePlan.tsx` | 7 | Yes | Per-slug JSON only |

This is the site's deepest, most citation-worthy content — steelmanned contested-doctrine pages, crisis care plans (marriage/anxiety/grief/deconstruction/skeptic), the prophetic-justice glossary/witnesses — sitting outside both the sitemap and the crawl-time meta system. All are well-linked *internally* (Theology.tsx's `DOCTRINE_INDEX`, `Pathways.tsx`, `TheologyCompare.tsx` all fully enumerate them), so this is a crawler-discoverability gap, not a site-navigation orphan. `/pathways` is the cheapest win — its manifest already exists in the exact shape `LIBRARY_SOURCES` expects.

---

## Table: Pages with MISSING/WEAK SEOMeta

**Non-literal meta (extraction fails, matches the About.tsx/SITE_STATS pattern named in the brief):**

| File | Issue | Proposed Title | Proposed Description |
|---|---|---|---|
| `client/src/pages/About.tsx` | desc is a template literal over `SITE_STATS.bookCount`/`.yearsInMinistry` (cross-file consts) — unresolvable | *(unchanged)* `About James Bell — Pastor, Author, Writer` | `From atheism to the pulpit. Raised without a father. Five sons. 21 books. 15 years in ministry. The story behind the writing.` (125 char) |
| `client/src/pages/Books.tsx` | desc template over `bookCountWordCap` (cross-file const) | *(unchanged)* `Books — James Bell` | `Twenty-one books on pastoral ministry, theology, marriage, and the weight of faithful leadership. Read them as paths, not a list.` (129 char) |
| `client/src/pages/Membership.tsx` | desc template over `essays.display` — a **live tRPC hook value**, not even a same-file const | *(unchanged)* `Membership — LiveWell by James Bell` | `Full access to 160+ essays, member-only writing, curated reading paths, and the deeper room where theology meets the weight of real life.` (137 char) |
| `client/src/pages/Home.tsx` | desc bound to bare identifier `META_DESCRIPTION` (`lib/positioning.ts`, single-use) — 225 chars, and **differs from** the 134-char description `prerender-heads.mjs` hardcodes for `/` in `STATIC_PAGES`. Non-JS crawlers and JS-executing users currently see two different homepage descriptions. | *(unchanged)* `LiveWell by James Bell` | `Theology that carries the weight of everyday life — essays on faith, justice, marriage, parenting, and pastoral ministry, from a pastor of fifteen years.` (153 char) — sync this into both `positioning.ts` and `prerender-heads.mjs`'s `FALLBACK_DESC`/homepage entry |

**Systemic description-length bug — entire "LiveWell series" ebook line (19 of 21 titles), 220–347 chars, 1.5–2.3× target, truncating mid-sentence in SERPs and social cards:**

| File | Proposed Description (title unchanged, already fine) |
|---|---|
| `books/RuleOfLife.tsx` | The ancient rule of life recovered for a distracted age: the hours, the fast, Sabbath, and the desert fathers' practice of forming a durable soul. (146) |
| `books/WhatBelongsToThePoor.tsx` | What the ancient church knew about wealth and the poor, from Exodus and the prophets to an empire-shaming church — and what it asks of us now. (142) |
| `books/WhyNotWhat.tsx` | Why theology built on what to do before why it's true collapses under pressure, and how to begin the whole of faith again with the right question. (146) |
| `books/BeTrueToYourself.tsx` | Be true to yourself is the one commandment no one questions. A case that it is the most destructive lie of the age, and the freedom on the other side. (150) |
| `books/SermonOnTheMountAsPolitics.tsx` | The Sermon on the Mount read as the kingdom's actual constitution, not a guide to private feeling: the Beatitudes, enemy love, money, anxiety. (142) |
| `books/PropheticJustice101.tsx` | Biblical justice and righteousness, from Exodus and Jubilee through the prophets to Jesus — charity versus justice, and what the church owes its neighbors. (155) |
| `books/Babylon.tsx` | Jeremiah's letter to the exiles, worked into an ordinary life: how to build, plant, and raise a family in a nation that stopped being Christian. (144) |
| `books/HowToReadTheBible.tsx` | Everyone reads the Bible through a lens and calls it just reading. A guide to proof-texting, genre, authorial intent, and Christ as the center. (143) |
| `books/TheScandalOfTheCross.tsx` | Why a good God would die: the cross as the scandalous center of the faith, the atonement's major models, and the deepest answer to guilt and shame. (147) |
| `books/PrayerInTheDark.tsx` | An honest book on prayer for people whose prayers hit the ceiling — unanswered prayer, God's silence, and prayer as honesty instead of technique. (145) |
| `books/BornAgainFromAtheism.tsx` | A first-person account of coming to faith from atheism as an adult, braided with a serious answer to suffering, science, and God's hiddenness. (142) |
| `books/HeavenIsNotYourReward.tsx` | Recovering the Bible's actual hope: bodily resurrection and a renewed creation, against souls floating off to the clouds, and what that changes. (144) |
| `books/FaithAfterDeconstruction.tsx` | For Christians whose inherited faith is coming apart: telling faithful deconstruction from faithless, and rebuilding a load-bearing faith after it. (147) |
| `books/TheGodWhoIsNotNice.tsx` | Recovering the holiness and weight of God against the sentimental deity of a comfortable age — wrath as love, and why the heavier God alone saves. (146) |
| `books/HealWell.tsx` | Fifty-two weekly readings for tired believers and people in pain — grief, doubt, and exhaustion met without denial, pointed toward costly hope. (143) |
| `books/MarriageInMinistry.tsx` | The pressures the parsonage puts on a marriage, the church as the rival for a pastor's best energy, and how the covenant survives ministry. (139) |
| `books/TheBodyYouLeft.tsx` | For the dechurched and disillusioned: an honest reckoning with what the church did to lose people, and the case for why the body still matters. (143) |
| `books/TheLonelinessOfThePastor.tsx` | Why pastors quit: the structural loneliness of a job with no peers inside the building, and the brotherhood that could let a pastor stay. (137) |
| `books/OrdinaryHoliness.tsx` | A theology of the ordinary — work as worship, the table, the neighbor — finding God in the life you actually have, not the spectacular one. (139) |

**Other over-length descriptions (160–237 chars):**

| File | Proposed Title | Proposed Description |
|---|---|---|
| `pages/HistoricFaith.tsx` | *(unchanged)* | *(current is 237 char; trim to)* `A deep, creedal Christianity recovered from underneath nationalism, consumerism, and the self — church history, the creeds, and the books that expose the American lens.` (170 char — trim ~15 more if hard cap needed) |
| `pages/LivingWell.tsx` | *(unchanged)* | `The formation pillar: marriage, fatherhood, parenting, friendship, and vocation — daily practices that form a faithful life when culture no longer does.` (152) |
| `pages/tools/TheologyGlossary.tsx` | *(unchanged)* | `100 essential theological terms explained at three levels of depth. Search by term, filter by category, expand any entry to its full history.` (141) |
| `pages/faq/IsBibleHistoricallyAccurate.tsx` | *(unchanged)* | `Is the Bible historically accurate? Archaeological evidence, manuscript reliability, and contradictions, answered honestly by a working pastor.` (143) |
| `pages/StartHere.tsx` | *(unchanged)* | `The reader's guide to Blind Spots: American Christianity captured by the right and the left. Read the book-in-public in order, start to finish.` (143) |
| `pages/StartHereDiagnostic.tsx` | *(unchanged)* | `Five questions, one honest recommendation. Take the diagnostic to find the LiveWell content that meets you where you are: skeptic, exhausted, curious.` (150) |
| `pages/FaqIndex.tsx` | *(unchanged)* | `Does God exist? Why are people leaving church? What is deconstruction? Ten hard questions, answered honestly, plus six traditions compared.` (139) |
| `pages/life/WholeLifeAssessment.tsx` | *(unchanged)* | `Thirty honest statements across five domains, taken once a year: the inner life, the body, the home, the work, the world. Scored in your browser.` (145) |

**Vague/weak titles (short, non-keyword, indexable, no crisis-page conflict with WEAVE-REPORT decisions):**

| File | Proposed Title | Proposed Description |
|---|---|---|
| `pages/Search.tsx` | `Search the Essay Library` | `Search 880+ essays on faith, theology, marriage, parenting, and pastoral ministry — filter by topic or search the full text of everything written.` (146) *("880+" figure left as-is per WEAVE-REPORT G2)* |
| `pages/Substack.tsx` | `The Newsletter — New Essays Weekly` | `Subscribe to James Bell's Substack for one new essay a week: longer-form writing on theology, culture, the American church, and the pastoral life.` (146) |
| `pages/landing/Grief.tsx` | `Grief and the God Who Stays` | *(unchanged — already good)* `Grief does not need to be fixed. It needs to be carried. Essays on loss, suffering, and the God who sits in the wreckage with you.` (130) |
| `pages/landing/FaithCrisis.tsx` | `Faith Crisis — When Belief Stops Holding` | *(unchanged — already good)* `When the faith you were given stops holding weight. Essays for the honest, the doubting, and the ones who refuse to stop asking.` (128) |

**Structurally dynamic, no per-page fix possible — infrastructure fix only (see "Two systemic bugs" above):** `TheologyDoctrine.tsx`, `TopicPathway.tsx`, `CarePlan.tsx`, `NationEssay.tsx`, `prophetic/PropheticPosture.tsx` + 5 sibling components. Current title/description *patterns* (e.g. `` `${doc.title} — Theological Depth` `` / `doc.subtitle`) are well-written — the fix is adding these families to `prerender-heads.mjs`'s `LIBRARY_SOURCES` and `generate-sitemap.mjs`'s `manifestPages()`, not rewriting copy.

---

## Table: Title length offenders (>65 char, component level), worst 12 of 21 found

| File | Current (len) | Proposed (<65) |
|---|---|---|
| `pages/RaisingBelievers.tsx` | 80 | `Raising Believers — Christian Parenting After Christendom` (57) |
| `pages/Discipleship.tsx` | 76 | `The Discipleship Pathway — New Believer to Disciple-Maker` (57) |
| `pages/landing/ChurchHistory.tsx` | 76 | `Church History — From the Apostles to the Post-Christian Age` (60) |
| `pages/landing/ChurchHurt.tsx` | 76 | `Church Hurt — Help for Spiritual Abuse and Religious Trauma` (59) |
| `pages/leadership/FormationInventory.tsx` | 76 | `The Leadership Formation Inventory — A Character Assessment` (59) |
| `pages/tools/ConflictGuide.tsx` | 73 | `Conflict Resolution Guide — A Five-Step Process for Families` (60) |
| `pages/Wisdom.tsx` | 72 | `Wisdom for All of Life — Proverbs and the Skill of Living` (57) |
| `pages/leadership/GovernanceLibrary.tsx` | 72 | `Board Governance and Policy Library — Church Templates` (54) |
| `pages/studyguides/StudyGuidesIndex.tsx` | 72 | `Study Guides — Free Leaders Toolkits for Small Groups` (53) |
| `pages/WhereYourTreasureIs.tsx` | 71 | `Where Your Treasure Is — What the Bible Says About Money` (56) |
| `pages/BibleAndHomosexuality.tsx` | 70 | `What Does the Bible Really Say About Homosexuality?` (51) — also removes a "James Bell" double-suffix instance |
| `pages/BibleAndTransgenderIdentity.tsx` | 70 | `What Does the Bible Say About Transgender Identity?` (51) — same |

Remaining 9 (66–70 char range, lower priority): `HardIssuesSeries.tsx`, `landing/PostChristian.tsx`, `comparisons/LiturgicalVsContemporary.tsx`, `tools/ParentingGuide.tsx`, `tools/WisdomFinder.tsx`, `leadership/ServantLeadershipHandbook.tsx`, `tools/DeepBibleCompanion.tsx`, `ConsiderTheBirds.tsx`, `landing/HonestQuestions.tsx`.

No exact-duplicate titles found among literal titles (183 checked).

---

## Structured data — what SEOMeta.tsx emits

Helpers in `SEOMeta.tsx`: `getOrganizationSchema`, `getWebSiteSchema`, `getArticleSchema`, `getBookSchema`, `getBreadcrumbSchema`, `getFAQPageSchema`, `getQAPageSchema`. Coverage:

- **Article** — only `ArticleDetail.tsx` uses the helper, but it covers all 161+ DB essays. Healthy.
- **Book** — `BookDetail.tsx` (helper) + `books/BookReader.tsx` (hand-rolled). Healthy.
- **FAQPage** — 10 `faq/*.tsx` + 6 `comparisons/*.tsx` + 4 `landing/*.tsx` hand-roll their own (consistent, well-formed). Healthy.
- **QAPage** — defined, **zero callers anywhere in the codebase**. Dead code and a missed fit for the 50 doctrine pages (one question, one long answer — exactly what `getQAPageSchema` models).
- **WebApplication** — 16 of 26 `tools/*.tsx` pages. **8 missing it** despite being the same kind of interactive tool as their siblings: `BibleOnTopic.tsx`, `DiscipleshipTable.tsx`, `ParentingVerses.tsx`, `PassageContext.tsx`, `Proverbs31.tsx`, `QuoteLibrary.tsx`, `RuleOfLife.tsx`, `WisdomFinder.tsx`.
- **BreadcrumbList** — only 4 pages total (`ArticleDetail`, `BookDetail`, `WhereYourTreasureIs`, `ConsiderTheBirds`) despite dozens of pages 2–4 levels deep.
- **The big gap: 522 content-library detail pages carry zero JSON-LD, client-side or prerendered** — confirmed no `structuredData`/schema-helper usage in any of: `leadership/LeadershipArticle.tsx` (131 pages), `HowToArticle.tsx` (132), `life/LifeDomain.tsx` (69), `studyguides/StudyGuide.tsx` (62), `resources/ContextGuide.tsx` (31), `table/TableStudy.tsx` (18), `history/HistoryEssay.tsx` (14), `resources/CreedDocument.tsx` (10), `leadership/FormationTopic.tsx` (6) — and `prerender-heads.mjs`'s `LIBRARY_SOURCES` loop (line ~430) never passes a `schemas` array to `buildHead()` either, so even the prerendered non-JS version ships bare. This is the single largest content surface on the site with zero rich-result eligibility.
- The ~84-page dynamic family from the top callout (doctrine, plans, nation, prophetic sub-pages, pathways) also carries zero structured data client-side — confirmed directly in each component.

---

## Sitemap gaps (`scripts/generate-sitemap.mjs`)

Cross-referenced every non-param, non-admin, non-redirect route in `App.tsx` against `STATIC_PAGES` + `manifestPages()`:

| Missing route(s) | Note |
|---|---|
| `/theology/doctrine/*` (50) | No manifest exists; needs one built (all 50 JSON files share `slug`/`title`/`subtitle`) |
| `/pathways` + `/pathways/*` (8) | Manifest **already exists** (`client/public/pathways/index.json`) — cheapest fix in this report |
| `/nation/christian-nationalism`, `/nation/nationalism-history`, `/nation/power-and-church`, `/nation/progressive-captivity`, `/nation/compassion-and-coercion` | Sibling essays (`christian-nation`, `empire`, `theocracy`, `which-party`, `render`) are present — list just wasn't updated when these 5 were added |
| `/faq` | Parent hub of 10 indexed FAQ pages; has clean literal SEOMeta already, just absent from the XML |
| `/read` | Parent hub of 49 sitemap-listed `/read/:slug` pages — the children are indexed, the hub isn't |
| `/explore` | Cross-library "search everything" hub; **zero inbound links from any nav/footer/component** either (only self-reference) |
| `/books-store` | Stripe storefront; zero inbound links sitewide |

Confirmed correctly excluded (redirect sources / personalized / device-local, working as intended): `/doubt`, `/start-here`, `/quiz`, `/resources-for-pastors`, `/articles`, `/for-families`, `/dashboard`, `/search`, `/theology/search`, `/tools/saved`.

---

## Internal linking

Read `docs/audit/WEAVE-REPORT.md` first — not re-litigating anything in its decision table (skeptic doors, `/start` consolidation, tool-hub reframing, sermon-series rename, etc. all confirmed still in effect).

New, Weave-unreviewed observations:
- Doctrine (50) and pathway (8) detail pages are **not orphaned** — `Theology.tsx`'s `DOCTRINE_INDEX` and `TheologyCompare.tsx` enumerate the full doctrine set; `Pathways.tsx` enumerates all 8 pathways. Their discoverability problem is sitemap/prerender only (above), not link-graph.
- `/explore` and `/books-store`: 0 inbound references from `client/src/components/*` (nav, footer, or content strips) — only self-referential. Same class of thin-hub problem the Weave fixed for `/sermon-series` and `/blind-spots` (G3/E1).
- `/faq` and `/pathways`: exactly 1 inbound reference sitewide each (`LibraryStrip.tsx`), despite each being the parent of 8–10 pages.

---

## Ranked top fixes, by impact

1. **Title double-suffix bug** (`SEOMeta.tsx` + `prerender-heads.mjs buildHead`) — 106 pages, two-line fix, immediate SERP/CTR improvement across the majority of the indexed site.
2. **Structured data on 522 library-manifest pages** — add `getArticleSchema` (already built, already proven on `ArticleDetail.tsx`) to the 9 detail components, and pass a matching `schemas` array in `LIBRARY_SOURCES`. Largest content surface on the site, currently zero rich-result eligibility.
3. **Extend `LIBRARY_SOURCES`/sitemap to the 5 dynamic families (~84 pages)** — doctrine, pathways (manifest ready), plans, nation essays, prophetic sub-pages. Pair with `getQAPageSchema` (built, unused) on doctrine/plans. Highest-depth, most answer-engine-relevant content on the site, currently invisible to non-JS crawlers and absent from the sitemap.
4. **Ebook-series description rewrite** (19 pages, strings above ready to paste) — commerce pages currently truncating mid-sentence in Google/Facebook/Twitter previews.
5. **Sitemap additions**: `/nation/*` (5 slugs), `/faq`, `/pathways`, `/read`, `/explore`, `/books-store` — all low-risk, mechanical additions to `STATIC_PAGES`.
6. **Homepage description desync** — `Home.tsx`'s client-rendered description (225 char, `META_DESCRIPTION`) differs from what `prerender-heads.mjs` ships non-JS crawlers for `/` (134 char). Highest-traffic page on the site; sync the two and land in the 150–155 range.
7. **Tool-page schema parity** — 8 of 26 tools missing the `WebApplication` schema their 16 siblings already carry. Low effort, mechanical.
8. **Breadcrumbs** — `getBreadcrumbSchema` used on only 4 of ~180 pages despite deep hierarchies under `/leadership`, `/theology`, `/nation`, `/tools`. Low effort, improves SERP hierarchy display.
