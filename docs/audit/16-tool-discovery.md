# 16 — Tool Discoverability & Use-Case Framing (Audit 3.4)

> Question: do visitors understand what each tool is FOR and when to use it?
> Read-only audit; evidence cited as file:line with verbatim copy. Companion:
> `00-architecture-map.md` §4 (52 tools; 4 unregistered on the hub — a known
> Decision-Log violation).

---

## Verdict

The tools estate is the most under-leveraged asset on the site. The tools
themselves are strong — the framing around them is not. Three structural facts
dominate everything else in this audit:

1. **The essay→tool funnel was built and then orphaned.** `client/src/components/ArticleNextSteps.tsx`
   contains a complete "Related Tool" recommendation system — per-tool value-prop
   copy, slug-keyword rules, pillar fallbacks (L30–116) — and **has zero importers**
   (verified: repo-wide grep finds no import outside the file itself; confirmed by
   `00-architecture-map.md` §3 dead-components list). `ArticleDetail.tsx` contains
   **zero** `/tools/` links; its end-of-article funnel is books only
   (`KeepReadingBook`, ArticleDetail.tsx:732). The single highest-value inbound
   path to the tools — 161+ essays each ending in a matched tool — already exists
   as code and is dead.
2. **The result-screen cross-links that do exist are silently broken.** The
   Marriage Assessment, Pastor Burnout, and Life Audit result screens link to
   `/writing?category=marriage`, `/writing?category=pastoral-ministry`,
   `/writing?category=health`, etc. — but `Writing.tsx` reads only
   `track/pillar/subTheme/audience/format/q/sub/series` (Writing.tsx:73–83).
   There is no `category` param. Every one of those CTAs lands on the unfiltered
   essay index. The chain from tool to relevant writing looks wired and is not.
3. **No tool anywhere links to a book.** Across all eight flagship tools audited,
   not one result screen or exit CTA points at a book or funnel — including the
   Rule of Life Builder (`/tools/rule-of-life`), which never mentions the *Rule of
   Life* ebook funnel at `/rule-of-life`, a product with the identical name. The
   natural chain (assessment → essays → book) exists at zero points on the site.

Everything else — hub grouping, naming collisions, sitemap gaps — matters, but
those three are where the value leaks.

---

## 1. Can a first-time visitor find the tools?

### 1.1 Header nav — no "Tools" entry

`MinimalNav.tsx` organizes the nav by pillars and hubs: "Start here" (→ `/start`),
"Theological Depth", "Post-Christian World", "Everyday Life", "The Table",
"For Pastors & Leaders", "Resources" (→ `/resources`), "Books", "About". There is
**no Tools item**. The nearest gateway is **"Find Help"** (MinimalNav.tsx:570–581,
→ `/help`; mobile label "Find Help for What You Are Facing", ~L704) — which does
route to tools, but only for a visitor in crisis vocabulary, not one browsing.

### 1.2 Footer — three named tools, one catch-all

Footer column "Libraries & Tools" (Footer.tsx:59–76) mixes libraries and tools:
"Wisdom Finder" → `/tools/wisdom-finder`, "Theology Quiz" → `/tools/theology-quiz`,
and "All Tools" → `/tools` (L73). The diagnostics — the tools with the widest
audience pull (marriage, burnout, life audit) — are absent.

### 1.3 Homepage — zero tools, one mislabeled promise

`Home.tsx` surfaces **no tool**. Hero CTAs go to `/writing`, `/start`,
`/skeptic-track`, `/exile`; the four mission doors go to `/discipleship`,
`/resources`, `/leadership`, `/justice`. The only tool-shaped language on the
page — the CTA label **"Find the tools"** (Home.tsx:48, on the "Make Disciples"
door) — routes to `/resources`, not `/tools`. A visitor who takes that label at
its word lands on a library index whose sole tools reference is one generic card
(see §1.5).

### 1.4 Essay pages — the dead funnel (detailed)

The orphaned `ArticleNextSteps.tsx` already contains the exact system this audit
would otherwise propose:

- Per-tool copy in the right voice, e.g. Marriage Assessment: *"A serious
  diagnostic for the covenant relationship — not tips, but an honest read of
  where you are."* (ArticleNextSteps.tsx:42–46); Pastor Burnout: *"An honest
  assessment of the cost you are carrying — and whether it is sustainable."*
  (L48–52).
- `SLUG_TOOL_RULES` (L87–96): marriage/covenant → marriage-assessment,
  parenting/family → parenting-guide, burnout → pastor-burnout,
  suffering/doubt/scripture → deep-bible, denomination/creeds → theology-quiz,
  politics/culture-war → bible-on-topic, deconstruction/exvangelical → `/start`.
- `PILLAR_TOOL_FALLBACK` (L99–106) covering all six pillars.

None of it renders. `ArticleDetail.tsx` re-implemented related-articles and
reading-path sections locally and ships `KeepReadingBook` (L732) as the only
funnel — books, never tools. (Minor rot inside the dead component: its Theology
Quiz entry links `/quiz`, which now 301s via vercel.json.)

### 1.5 Hub and topic pages — strong where someone thought about it, silent where no one did

| Page | Tool links | Evidence / quoted copy |
|---|---|---|
| `/help` (Help.tsx) | **~13 contextual tool CTAs** across 11 need sections | e.g. "My marriage is in trouble" → Marriage Assessment, Conflict Guide, Prayer Generator; "I am a leader running on empty" → Pastor Burnout Diagnostic + Leadership Inventory. The best need-based router on the site. |
| `/marriage` (Marriage.tsx) | **Strong** — hero CTA "Marriage Health Assessment" (L87–91), repeat "Take the Assessment" (L169–173) | *"Start with the Marriage Health Assessment. It takes 10 minutes and will show you exactly where your marriage is strongest and where repair work begins."* (L162–167). Note: this is the **only place on the site a time estimate appears** — the tool's own page never says it. |
| `/family` (Family.tsx) | **Strong** — 8 tools: "For the home … Tools — Practical tools to use around the table and through the week." (L262–274) links verse-finder, family-devotions, bible-study, prayer-generator, rule-of-life; plus parenting-verses/guide (L237–239) and marriage-assessment (L254) | The model hub. |
| `/wisdom` (Wisdom.tsx) | **Strong** — hero CTA "Tell us what you are facing" → wisdom-finder (L122); "Three ways in" surfaces bible-on and proverbs-31 (L162–187) | |
| `/pastors-resource-wall` | **Strong** — 7 tools grouped "SERMON PREP" (verse-finder, sermon-outline, deep-bible, scripture-memory, L38–63) and "PASTOR CARE" (pastor-burnout, church-health, conflict-guide, L65–84) | This grouping is exactly what the /tools hub itself lacks. |
| `/leadership` hub | Links its instruments ("The tools", LeadershipHub.tsx:32–46 via `LEADERSHIP_TOOLS`) | Leadership serves itself well. |
| `/disciple-making` | 1 — "Start a table" → discipleship-table (L108–110, 136–138) | |
| **`/parenting` (Parenting.tsx)** | **Zero.** No link to parenting-guide, parenting-verses, or family-devotions | The parenting hub does not know its own tools exist. |
| **`/doubt` (Doubt.tsx)** | **Zero.** No theology-quiz, no `/start`, no deep-bible (verified grep) | The audience Bell writes toward gets no instrument. |
| `/life` (life/LifeIndex.tsx) | 1 — `/life/assessment` (L90) | Never mentions `/tools/life-audit`, `/tools/emotional-health`, `/tools/financial-health`. |
| `/resources` (Resources.tsx:73–77) | 1 generic card — "Ministry Tools … The verse finder, prayer generator, assessments, and study tools. Built to be used on a Tuesday, not admired on a Sunday." → `/tools` | Good line; no individual tools named. |

### 1.6 Crisis landing pages — wired, but two point at the wrong tool

Each crisis page ends in a "NEXT STEP" tool CTA — the right pattern:

- `/marriage-crisis` → *"The Marriage Assessment is not a quiz. It is a structured
  conversation starter."* → `/tools/marriage-assessment` (MarriageCrisis.tsx:110–121). Correct.
- `/grief` → Prayer Generator; `/parenting-help` → Parenting Guide. Correct.
- **`/pastoral-burnout` → `/tools/emotional-health`** ("Take the Assessment",
  PastoralBurnout.tsx:112–119) — while a purpose-built, 1,682-line
  `/tools/pastor-burnout` diagnostic exists. The burnout landing page bypasses
  the burnout tool.
- **`/faith-crisis` → `/tools/bible-study`** — a generic study guide, when
  `/tools/theology-quiz` ("Find out where your foundations are solid and where
  the gaps are") or `/start` is the matched instrument.

**Net:** discovery is multi-path but fragmented. A first-time visitor on the
homepage reaches a tool only by (a) clicking "Find Help," (b) guessing a hub
like /family, or (c) typing /tools. The essay corpus — the site's main traffic
surface — funnels to books only.

---

## 2. The /tools hub (ToolsHub.tsx)

**Presentation:** 26 entries in one flat `auto-fit` grid (L230), effectively
unordered — Deep Bible first, then Theology Quiz, then the Leadership Inventory,
then a run of Integrated Life items, then family, then diagnostics. **No grouping
headers, no audience labels, no time estimates, no "start here" guidance.** A
visitor facing 26 cards must read ~2,600 words of blurb to know which one is for
them. The grouping half-exists *as prose*: eleven cards end with taxonomy tags
like *"Part of Integrated Life."* (L17, 24, 31, 38, 45, 52, 59, 66, 73, 80) —
labels meaningful to the site's editors, not to a first-time visitor, and doing
grouping work the layout refuses to do.

**Framing:** hero eyebrow "FREE TOOLS", H1 *"Tools for the Work of Ministry"*
(L219), subtitle *"Built for pastors, parents, and anyone who takes faith
seriously enough to practice it."* (L222). "Ministry" is the wrong first word for
a hub whose majority tools are lay-facing (marriage, parenting, money, emotional
health, life audit). The subtitle rescues it; the H1 loses the seeker first.

**Stale copy:** the closing CTA (L284–289) reads *"More tools coming soon —
Sermon outline builder, pastoral care tracker, and reading plan generator are in
development. Subscribe to get notified when they launch."* The **Sermon Outline
Generator is already on this page** (L149–154). And "Subscribe" is plain text —
no link, no form.

**Mixed inventory:** four cards are not /tools pages but hubs/instruments
elsewhere — "Wisdom for All of Life" → `/wisdom`, "The Leadership Formation
Inventory" → `/leadership/inventory`, "The Whole-Life Assessment" →
`/life/assessment`, "Passage Context Tool" → `/theology/passage`. Cross-listing
is good; unlabeled mixing of hubs and tools is not.

**Missing inventory:** `/tools/bible-says`, `/tools/quotes`, `/tools/glossary`
are absent (App.tsx:495–497 routes exist), and `/tools/saved` appears only when
`totalSaved > 0` (L264–277). Repo-wide grep confirms the first three have **zero
inbound links anywhere** — reachable only by typing the URL. This is the
Decision-Log violation ("all tools are registered in /tools") named in
`00-architecture-map.md` §4.

**Card copy — five that work** (they say who it's for and what you get):

1. Marriage Health Assessment (L115): *"A 15-question diagnostic across
   communication, intimacy, trust, shared vision, and conflict. Not a quiz — a
   real assessment with actionable recommendations."*
2. Pastor Burnout Diagnostic (L171): *"24 questions across calling, isolation,
   marriage impact, board relations, and more. Your burnout signature with a
   recovery roadmap."*
3. Rule of Life Builder (L59): *"A rule of life is not a performance contract.
   It is a trellis."* — the voice doing framing work.
4. Parenting Bible Verses (L136): *"Scripture for the real moments of parenting
   — fear, anger, identity, obedience, screens, doubt — each with a short,
   honest note for the parent."*
5. Family Devotion Builder (L101): *"Build a 15-minute family devotion in
   seconds."* — the only card with a time promise.

**Five that don't:**

1. Bible Study Guide (L108): *"Study any book of the Bible with theological
   depth. Key themes, study questions, and reading strategies for 12 essential
   books."* — indistinguishable from Deep Bible Companion ("12 books … 6 layers")
   two cards away; no reader can tell which to open.
2. Start a Table (L38): a 60-word single-sentence blurb; the name says nothing
   until the fourth line.
3. Wisdom for All of Life (L45): *"The front door to Scripture's wisdom for the
   place no rule reaches…"* — poetic, but nothing signals it's a hub, not a tool.
4. Theology Quiz (L17): *"Twenty questions… Part of the Theological Depth
   section."* — the taxonomy tag is dead weight; worse, the quiz page itself says
   **"10 questions"** (TheologyQuiz.tsx:79–80). The hub and the tool disagree on
   the tool's length.
5. Verse Finder (L87) vs. What the Bible Says About (L66) vs. Wisdom Finder
   (L52): three near-identical topical-Scripture blurbs with no stated
   difference (see §5).

Icons don't rescue the grid: `Search` appears 3× (Deep Bible, Wisdom Finder,
Bible Study), `BookMarked` 4×, `Baby` 2×.

**Hub SEO copy undersells:** the meta description (L201–202) names only three
tools — "Bible verse finder, prayer generator, and family devotion builder" —
none of them the flagship diagnostics.

---

## 3. Each tool's own page — does purpose land in seconds?

From direct reads of the eight flagship tools (SEOMeta + hero + intro):

| Tool | What the top of page says | Who for / what you get / how long |
|---|---|---|
| Theology Quiz | Eyebrow "FREE ASSESSMENT"; H1 *"Where Do You Stand Theologically?"*; *"10 questions. Personalized reading recommendations."* (TheologyQuiz.tsx:75–81) | ✔ what-you-get, ✔ length-by-count, ✘ time, ✘ who. Best framing of the eight. (Count conflicts with hub's "Twenty".) |
| Deep Bible Companion | Eyebrow "FLAGSHIP TOOL"; *"Seminary-level depth. Kitchen-table language. Six layers of analysis for every passage. No pastor required. No seminary required."* (DeepBibleCompanion.tsx:1702–1707) | ✔ who ("no seminary required"), ✔ what, ✘ time. Strong. |
| Rule of Life Builder | Eyebrow "A tool · Integrated Life"; H1 "Build a rule of life"; *"It is a trellis, a few chosen rhythms you keep returning to… Choose what you can actually sustain. Begin small."* (RuleOfLife.tsx:162–167) | ✔ what, ✔ posture, ✘ who, ✘ time. |
| Marriage Assessment | Meta: *"A 15-question diagnostic to help couples identify strengths and growth areas…"* (MarriageAssessment.tsx:344–346) | ✔ who (couples, in meta only), ✘ time — the "takes 10 minutes" promise lives only on `/marriage` (Marriage.tsx:162–167), not here. |
| Pastor Burnout | Meta: *"A 24-question pastoral burnout assessment across 8 critical categories. Honest results, specific recovery steps, and crisis resources."* (PastorBurnout.tsx:527–529) | ✔ who, ✔ what, ✘ time. |
| Life Audit | Meta: *"Twenty-four questions across eight life areas: spiritual health, marriage, parenting, physical health, finances, vocation, and community."* (LifeAudit.tsx:521–523) — lists **seven** of the promised eight areas | ✘ who, ✘ time; copy bug. |
| Sermon Outline | *"Select a topic and audience. Receive a structured outline with title suggestions, three-point framework, and application."* (SermonOutline.tsx:456–457) | ✔ what; only tool that states output time (*"Estimated delivery time: N minutes"*, L1065–1079) — for the sermon, not the tool. |
| Scripture Memory | Meta: *"Memorize 40 Bible verses across 8 categories using proven techniques…"* (ScriptureMemory.tsx:317–319); mechanics-first UI, no hero framing | ✘ who, ✘ why-this-matters, ✘ time. |

**Pattern:** counts are stated (questions, verses, layers), **time-to-complete
never is** (except on a *different* page for marriage), and "who this is for"
appears in meta descriptions more often than on the visible page. The pastoral
framing that distinguishes these tools from generic Christian-app equivalents
(Rule of Life's trellis, Deep Bible's "no seminary required") appears on only
three of eight pages.

---

## 4. Connected or floating? The tool↔essay↔book chain

What the eight result/exit screens actually offer:

| Tool | Essay links | Book links | Other exits |
|---|---|---|---|
| Theology Quiz | ✔ 4 personalized `/writing/{slug}` cards + "Browse All Essays" (TheologyQuiz.tsx:189–222) | ✘ | Retake. **The only tool with working essay recommendations.** |
| Marriage Assessment | Broken — all 5 categories + bottom CTA → `/writing?category=marriage` (MarriageAssessment.tsx:1046–1192), a no-op filter | ✘ (no `/covenant`) | Print, retake, EmailResults |
| Pastor Burnout | Broken — `/writing?category=pastoral-ministry` (PastorBurnout.tsx:1624–1674); ✔ `/pastors` (L1575–1623) | ✘ (no `/the-loneliness-of-the-pastor`, `/healwell`, `/marriage-in-ministry`) | Print, retake, EmailResults, per-category Scripture |
| Life Audit | Mixed — per-category links to sibling tools (good: marriage-assessment, financial-health, parenting-guide) but also broken `/writing?category=health|vocation` (LifeAudit.tsx:1309–1461) | ✘ | EmailResults, "Explore all tools" → `/tools` |
| Rule of Life | ✔ 3 real links: `/life/discipleship-following-jesus`, `/life/rest-and-the-sabbath`, `/disciple-making` (RuleOfLife.tsx:251–253) | ✘ — **never mentions the Rule of Life book at `/rule-of-life`** | Copy, reset |
| Deep Bible | ✘ none | ✘ | Layer navigation only — a dead end after the best content on the site |
| Sermon Outline | ✘ none | ✘ | None — outline renders, page ends |
| Scripture Memory | ✘ none | ✘ | Next verse only |

**Zero tool→book links exist on the site.** The natural chains, mapped to real
inventory (essay slugs from `pillar-assignments.ts`; funnels from App.tsx):

| Tool | → Essay(s) that exist | → Book funnel that exists |
|---|---|---|
| Marriage Assessment | `covenant-vs-contract-what-marriage-is`, `forgiveness-in-marriage` (pillar-assignments.ts:1029, 1073) | **Covenant** (`/covenant`); for pastor couples, *Marriage in Ministry* (`/marriage-in-ministry`) |
| Pastor Burnout | `burnout-nobody-talks-about` (L663), `return-ministry-after-burnout` (L107) | **The Loneliness of the Pastor** (`/the-loneliness-of-the-pastor`), **HealWell** (`/healwell`) |
| Theology Quiz | already personalized | key lowest pillar → **Believe** (`/books/believe`) or **The Deconstruction of Faith** (`/books/deconstruction-of-faith`) |
| Deep Bible Companion | `/theology/passage` (sibling tool) | **How to Read the Bible** (`/how-to-read-the-bible`), *The Reliability of Scripture* (`/books/the-reliability-of-scripture`) |
| Rule of Life Builder | keeps its 3 `/life/*` links | **Rule of Life** (`/rule-of-life`) — same-name product, one line of copy |
| Life Audit | finances area → `/life/money-and-the-heart` (already linked from /help) | **Where Your Treasure Is** (`/where-your-treasure-is`) for the money area |
| Parenting Guide | parenting-pillar essays (e.g. `protecting-your-marriage-from-work`, L1063; the /family hub) | **Raising Believers** (`/books/raising-believers`) |
| Sermon Outline | `/leadership/sermon-prep` (Sermon Workbench — the serious sibling), `/leadership/sermon-series` | — (workbench + series library are the right exits) |

The books are the revenue surface, the tools are the trust surface, and the
essays are the traffic surface. Right now the three do not touch — except at the
Theology Quiz, and at the dead `ArticleNextSteps` component pointing the other way.

---

## 5. Naming

**Names that communicate instantly** (keep): Marriage Health Assessment,
Pastor Burnout Diagnostic, Life Audit, Church Health Check, Financial Health
Check, Emotional Health Assessment, Family Devotion Builder, Parenting Stage
Guide, Sermon Outline Generator, Scripture Memory System, Conflict Resolution
Guide, Proverbs in 31 Days, Prayer Generator.

**The four-way verse-tool collision** — a visitor cannot distinguish:

| Route | Name | Actual differentiator (from its own meta) |
|---|---|---|
| `/tools/verse-finder` | "Bible Verse Finder" | quick topical verses to *copy and share* (VerseFinder.tsx:198–199) |
| `/tools/bible-on` | "What the Bible Says About" | topical *study guide* with "the heart of each passage" (BibleOnTopic.tsx:231–232) |
| `/tools/bible-says` (unregistered) | "What the Bible **Actually** Says About…" | 15 topics with **interpretive range and common misuses** — "Not proof-texts." (BibleReference.tsx:1294–1295) |
| `/tools/wisdom-finder` | "Wisdom Finder" | free-text "type what you are facing" entry (WisdomFinder.tsx:116–117) |

Two of these differ from each other by the word "Actually." Proposals:
Verse Finder → **"Find a Verse"** (subtitle: "quick verses by topic, to copy and
share"); Bible On stays **"What the Bible Says About…"**; Bible Says →
**"Misused Verses — What the Bible Actually Says"** (its misuse-warning content
is its identity; register it under that name); Wisdom Finder keeps its name but
leads with its own line, *"Tell us what you are facing."* Longer term these are
consolidation candidates, but renaming makes them legible now.

**Other opaque names:** "Start a Table" → **"Start a Discipleship Table"** (also
collides with the nav item "The Table" → `/table`, a different thing entirely);
Quote Library's SEO title "Words Worth Sharing" (QuoteLibrary.tsx:242) → plain
**"Quote Library"**; "The Whole-Life Assessment" (`/life/assessment`) vs. "Life
Audit" (`/tools/life-audit`) are two indistinguishable life diagnostics — at
minimum the hub cards must state the difference (30 statements → rule of life,
vs. 24 questions → strengths/growth areas); the honest fix is choosing one.

**Duplicate glossaries:** `/theology/glossary` (pages/TheologyGlossary.tsx) and
`/tools/glossary` (pages/tools/TheologyGlossary.tsx, 1,647 lines) are two
different components with the same name (App.tsx:138, 198, 314, 497). Decide
which is canonical before registering one on the hub.

---

## 6. SEO discoverability (quick check; depth deferred to audit 1.2)

- **Sitemap: only 5 of ~30 tool routes.** `scripts/generate-sitemap.mjs` lists
  `/tools` (L73) and exactly four tools — theology-quiz, verse-finder,
  prayer-generator, family-devotions (L121–124). Missing: every diagnostic
  (marriage-assessment, pastor-burnout, life-audit, church-health, emotional/
  financial-health), deep-bible, rule-of-life, sermon-outline, scripture-memory,
  and all four unregistered tools. These are exactly the pages with search
  demand ("marriage health assessment", "pastor burnout test").
- **Meta descriptions are individually good** — distinctive and specific (see
  quotes in §3 and §5); the weak one is the hub's own, which names three minor
  tools and no diagnostics (ToolsHub.tsx:201–202).

---

## 7. Proposals

### 7.1 Regroup the hub (replace the flat 26-card grid with five need-based groups)

Add a short router line above the grid — *"Not sure where to start? Answer three
questions"* → `/help` — then group, one group per section, hubs cross-listed with
an explicit "hub" label:

1. **Find out where you stand** — Theology Quiz · Marriage Health Assessment ·
   Life Audit · Emotional Health · Financial Health · Whole-Life Assessment (hub)
2. **Go deeper in Scripture** — Deep Bible Companion · Passage Context · Bible
   Study Guide · What the Bible Says About… · Find a Verse · Wisdom Finder ·
   Misused Verses (register) · Theology Glossary (register)
3. **Build a rhythm you can keep** — Rule of Life Builder · Scripture Memory ·
   Proverbs in 31 Days · Prayer Generator · Wisdom for All of Life (hub)
4. **For your household** — Family Devotion Builder · Parenting Stage Guide ·
   Parenting Bible Verses · Conflict Resolution Guide · Start a Discipleship Table
5. **For pastors & leaders** — Pastor Burnout Diagnostic · Sermon Outline
   Generator · Church Health Check · Leadership Formation Inventory (hub) · one
   pointer card to the 11 `/leadership` instruments

Also: rewrite the hero (H1 "Tools for the Work of Ministry" → e.g. **"Tools for
an Honest Look"** with the existing subtitle kept); delete or update the stale
"More tools coming soon" block (L284–289); make Saved Items always visible;
strip the "Part of …" taxonomy tags once groups carry that weight.

### 7.2 Ten per-tool value props (one line each, hub-card ready)

1. **Marriage Health Assessment** — Fifteen questions, about ten minutes. An honest read of where your marriage is strong and where the repair work begins.
2. **Pastor Burnout Diagnostic** — Twenty-four questions for the pastor running on empty. Name the cost you are carrying before it names you.
3. **Theology Quiz** — Ten questions. See where your foundations hold and where the gaps are — then read toward them.
4. **Deep Bible Study Companion** — Seminary depth in kitchen-table language. Pick a book, pick a passage, work through six layers of the text.
5. **Rule of Life Builder** — Not a performance contract. A trellis — a few practices you can keep, chosen in about five minutes.
6. **Life Audit** — Twenty-four questions across eight areas of one life. See what is flourishing, what is starving, and what to do first.
7. **Family Devotion Builder** — Pick your kids' ages and a theme. Get a full fifteen-minute devotion — Scripture, teaching, activity, prayer — for tonight.
8. **Scripture Memory System** — Forty verses worth carrying for life. Three ways to practice, and your progress kept in the browser.
9. **Conflict Resolution Guide** — Five steps for eight kinds of conflict. Name what happened, name what you feel, agree on one next step.
10. **Wisdom Finder** — Tell it what you are facing — money, anger, a marriage under strain — and read what Scripture says about it, in context.

### 7.3 Cross-link insertions, ranked by odds a visitor actually uses a tool

| # | Change | Where, exactly | Priority | Effort |
|---|---|---|---|---|
| 1 | **Revive the essay→tool funnel.** Import `ArticleNextSteps` (or lift its `SLUG_TOOL_RULES` + copy) into `ArticleDetail.tsx`, rendering a "Related Tool" card above `KeepReadingBook` (ArticleDetail.tsx:732). Fix its stale `/quiz` href → `/tools/theology-quiz`. 161+ essays each gain a matched tool exit. | ArticleDetail.tsx + ArticleNextSteps.tsx | **Critical** | Low — the component and mapping already exist |
| 2 | **Fix the broken `?category=` result links.** Replace `/writing?category=marriage` → `/writing?pillar=marriage-covenant`, `?category=pastoral-ministry` → the pastoring pillar, `?category=health|vocation` → real params Writing.tsx reads (L73–83) — or link named essays directly (§4 table). | MarriageAssessment.tsx:1046–1192, PastorBurnout.tsx:1624–1674, LifeAudit.tsx:1309–1461 | **Critical** | Low |
| 3 | **Add the tool→book line.** One sentence + link on four result screens: Marriage → `/covenant`; Burnout → `/the-loneliness-of-the-pastor` (+ `/healwell`); Rule of Life → `/rule-of-life`; Deep Bible → `/how-to-read-the-bible` (persistent footer card, since it has no result screen). First revenue-relevant tool exits on the site. | four tool files, §4 map | **High** | Low |
| 4 | **Give /parenting and /doubt their tools.** /parenting: a "Tools for parents" block (parenting-guide, parenting-verses, family-devotions — copy the /family pattern, Family.tsx:262–274). /doubt: one CTA to theology-quiz or `/start`. | Parenting.tsx, Doubt.tsx | **High** | Low |
| 5 | **Regroup the hub + rewrite hero + kill stale CTA** (§7.1) and adopt the §7.2 value props. | ToolsHub.tsx | **High** | Medium |
| 6 | **Register the 4 unregistered tools** (bible-says, quotes, glossary, saved) — closes the Decision-Log violation; rename per §5 as part of the same edit. | ToolsHub.tsx TOOLS array | **High** | Low |
| 7 | **Fix the two crisis-page mismatches:** /pastoral-burnout → `/tools/pastor-burnout` (currently emotional-health, PastoralBurnout.tsx:112–119); /faith-crisis → theology-quiz or `/start` (currently bible-study). | landing pages | **Medium** | Low |
| 8 | **Sitemap: add all tool routes** (~25 missing), diagnostics at priority ≥0.7. | scripts/generate-sitemap.mjs:121–124 | **Medium** | Low |
| 9 | **Footer + homepage seams.** Footer: add Marriage Assessment, Pastor Burnout, Life Audit under "All Tools". Homepage: either point the "Find the tools" CTA (Home.tsx:48) at `/tools`, or relabel it — the label currently promises tools and delivers a library index. One tool moment on the homepage (Theology Quiz or "Find Help") is worth testing. | Footer.tsx:59–76, Home.tsx:48 | **Medium** | Low |
| 10 | **Copy hygiene:** reconcile Theology Quiz "Twenty questions" (ToolsHub.tsx:17) vs "10 questions" (TheologyQuiz.tsx:79–80); add the missing eighth area to Life Audit's meta (LifeAudit.tsx:521–523); add "about N minutes" to each diagnostic's own hero (it exists only on Marriage.tsx:162–167 today); decide the canonical glossary. | per file | **Low** | Low |

The through-line: almost nothing here requires building anything. The funnel is
built and unplugged; the links exist and point at a filter that isn't read; the
books and the tools share names and never mention each other. This audit is
mostly a re-wiring list.
