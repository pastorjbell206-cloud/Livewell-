# Content Finality Audit & Master Plan — LiveWell by James Bell

> The single, reconciled plan that folds nine separate audit sections into one
> working backlog. It governs the path from the current state — a large, deep,
> voice-faithful corpus that does not yet cohere — to **finality**: a searchable,
> cross-linked, single-spine site where pillars, articles, books, and tools work
> as one body, and every piece can then be refined into James's voice one at a
> time without re-drawing the map.
>
> Nests under `docs/EDITORIAL-CONSTITUTION.md` (mission) and `docs/VISION.md`
> (strategy). Voice is governed by `CLAUDE.md` and is not on the table — this
> plan builds the house around the writing and touches no prose.

**Central question everything here serves:** *How can Christians learn to live
faithfully and wisely in a post-Christian America while recovering the depth,
wisdom, practices, and imagination of historic Christianity?* Reconstruction, not
deconstruction. Audiences by weight: skeptics, doubting Christians, pastors (the
PCN channel), people seeking to live well.

**The six canonical pillar slugs (`PILLARS_V2`, the one spine):**
`capture-by-the-right`, `capture-by-the-left`, `reading-scripture-past-our-politics`,
`after-christendom-pillar`, `the-pastoral-angle`, `living-well-after-christendom`.

---

## 1. Executive summary

The corpus is large and largely deep. Across every audit the same finding
recurred, stated in nine different registers: **the writing is world-class and
on-mission; the system that files, connects, and surfaces it is broken.** A
sampled read of the essays returned zero forbidden-word hits and load-bearing,
primary-source scholarship. The doctrine hub is already in the top tier of what
an evangelical platform ships (~29 worked six-step doctrine pages, a 114-term
glossary, four creeds plus ten confessions, a 40-question Hard Questions hub).
The Integrated Life library runs ~69 domains at ~7,000 words each; the leadership
library runs 131 articles; there are 19 full-length free books, 26 tools, and
~380 substantial static-library pieces. Counting everything, the site is roughly
**1,100 discrete pieces of content.** This is not a thin site pretending depth.

So the core problem is **not a shortage of content. It is cohesion.** The content
does not know about itself. Four taxonomies describe the same shelf at once; one
resolver default silently mis-files ~47% of posts into a single pillar; on-site
search sees under half the corpus; the deepest tools dead-end with no doors into
the essays; there are no per-pillar hub pages for the canonical spine; and a large
body of finished essays sits unpublished in `content/drafts/`. Several prior
roadmap docs describe libraries as thin that have since been built out — those
docs are stale, and this plan respects the built depth rather than re-proposing
it.

**The highest-leverage moves to reach finality (in order):**

1. **Ratify and enforce one taxonomy spine** (`PILLARS_V2`, six pillars) in nav,
   footer, `/pillars`, `/writing`, sitemap, and JSON-LD — and fix the resolver
   default (`LEGACY_TO_V2`) that mis-files 143 essays into Pastoral. This is an
   ~8-line data fix that unblocks everything downstream.
2. **Build one unified search index over ALL content types** — DB articles,
   books, all 14 static libraries, tools, reading paths — served identically from
   both runtimes, and point `/search` and Cmd-K at it.
3. **Ship a pillar-keyed `RelatedContent` component** and drop it on every
   article, tool, and book so no piece is an island.
4. **Build `/pillars/:slug` hub pages** on the working `LeadershipHub` /
   `PropheticHub` pattern — the spine currently has no front doors.
5. **Publish the ~26+ finished-but-unpublished drafts** (church history, creeds,
   calendar, sacraments, disciplines, prayer, small-church/bivocational pastoral,
   the 6 flagship essays). Fastest depth win on the site; no new writing.
6. **Close the six first-order doctrinal holes** — atonement theories, hell views,
   resurrection, justification/NPP, the unevangelized, the PSA objection — where
   the platform's signature steelman method visibly lapses.
7. **Fix the guardrail asymmetry** — build a real Capture-by-the-Left cluster to
   match the eight-essay Capture-by-the-Right cluster, so the discipline fires in
   both directions.
8. **Cover the two user-named gaps** — worship/music (worship wars) and Bible
   translations/versions — both near-total holes.

Everything past #8 is depth completion: church-history sequence, catechesis, a
Christian-classics reading path, a disciplines library and Daily Office tool, and
the narrow everyday/pastoral gaps. All of it nests behind cohesion, because a
deeper library that still can't be searched or navigated adds shelves, not sight.

---

## 2. The cohesion problem (fix this first)

Cohesion is the whole game. Until it is solved, every net-new piece lands in the
same disconnected pile. The breaks, and the concrete fixes each audit named:

### 2.1 Four taxonomies describe one shelf

A first-time reader meets five different maps:

- **Primary nav** (`client/src/components/MinimalNav.tsx`, via `PILLAR_ORDER` in
  `subPathways.ts`) shows the **legacy 5 pillars + sub-pathways**.
- **Footer column 1** (`Footer.tsx`) shows a **hybrid five** — four legacy hub
  routes plus one V2 route (`/living-well`).
- **`/pillars`** (`Pillars.tsx`) shows **`PILLARS_V2`** (six, by movement) — but
  its SEO title says "The **Five** Pillars" and its description names the legacy
  five, while its on-page `<h1>` says "six pillars." A crawler and a human read
  contradictory things off the same page.
- **`client/src/lib/pillars.ts`** exports a **third, different five-slug set** and
  is imported by nothing in `client/src` — dead code that still looks
  authoritative and curates article lists.
- **`/writing`** filters by the **13 `TRACKS`** in `taxonomy.ts`.

The Constitution has already ratified **Option B**: `PILLARS_V2` (six) is the
single spine, tracks demote to filters, the legacy five retire. That decision has
not reached the running UI, and `docs/ia-recommendations.md` still argues the
opposite ("keep 5, retire V2"). **Two governing docs disagree; reconcile on paper
first, then move code.**

**Fixes.** Mark `ia-recommendations.md` superseded by the Constitution's Option B.
Point `MinimalNav.tsx` and `Footer.tsx` at `PILLARS_V2`. Retire or fold
`pillars.ts`'s parallel `PILLARS` set and resolve the duplicate `Pillar`
interface exported by both `taxonomy.ts` and `pillars.ts` (keep the `taxonomy.ts`
one). Fix the three-way label contradiction on `Pillars.tsx` so title,
description, and `<h1>` all say six.

### 2.2 The resolver default mis-files ~47% of posts into Pastoral

`pillarForPost()` resolves in order: `PILLAR_ASSIGNMENTS[slug]` →
`LEGACY_TO_V2[pillar]` → **default `id = 5` (The Pastoral Angle)**. The 143 newest
and best essays are not in `pillar-assignments.ts`, and their DB `pillar` strings
are the *new canonical track slugs* (`theology`, `politics`, `doubt`, `marriage`,
`parenting`, `after-christendom`, `american-church`, `devotionals`) — none of
which exist in `LEGACY_TO_V2` (which maps only the OLD verbose names). So they all
fall through to Pastoral. The result: Pillar 5 shows **218 posts**, Pillar 2
(Capture by the Left) shows **1**, and textbook political essays like
`the-flag-in-the-sanctuary` and `right-side-of-history` are filed as "Pastoral."
Because `ArticleNextSteps` keys same-pillar recommendations on `pillarForPost`,
**the filing bug also poisons cross-linking** — a grief essay recommends
pastoral-burnout essays as its "read next."

**Fix.** Add the 8 canonical track slugs to `LEGACY_TO_V2` (or backfill
`pillar-assignments.ts`). ~8 lines. This one change moves ~130 essays out of
Pastoral, populates the four starved pillars, and repairs auto cross-linking.

### 2.3 Search sees under half the corpus

Search is entirely database-driven. Both runtimes (`server/search-service.ts`
dev, `api/index.ts` prod) run MySQL `MATCH…AGAINST` / `LIKE` over exactly three
tables: `posts`, `books`, `resources`. Consequences:

- The **14 static JSON libraries (~815 entries)** — theology, study guides,
  context, life, leadership, wisdom, how-tos, creeds, history, table, and the
  prophetic/justice/disruption/nation sets — are invisible to server search.
- The **26 tools** and **6 reading paths** appear in no search surface at all.
- The `/search` page half-fixes it client-side, but fetches only 4 of 14 library
  manifests. Cmd-K (`CommandPalette.tsx`) is DB-only.
- **Dev/prod search parity is broken**: `globalSearch` in dev has no book search;
  books are searched only in prod. Not caught by `api-parity.test.ts` (the
  procedure exists in both; the behavior differs).

**Fix.** Add `scripts/build-search-index.mjs` that merges `content-data.json`
posts + books, every `*-index.json` library manifest, the `ToolsHub` registry,
and `READING_PATHS` into `client/public/search-index.json`
(`{type, title, excerpt, url, pillar}`), wired into `pnpm build` beside the other
`build-*-index.mjs` steps. Extend `search.global` in **both** runtimes to merge DB
results with a lookup over that index, fixing the book-search gap in the same
pass. Point `Search.tsx` and `CommandPalette.tsx` at the unified query. Add a test
asserting dev and prod return the same result types for a fixed query. Several
library folders (`disruption/`, `justice/`, `nation/`, `prophetic/`, `wisdom/`,
`theology/`) ship **without a generated manifest** — generate those first so the
whole corpus is machine-listable.

### 2.4 Tools are dead-ends

The most valuable tools are the most orphaned. **Zero outbound content links** in
Deep Bible Companion, Bible Reference (1,693 lines of steelmanned exegesis, not
one link), Sermon Outline, Scripture Memory, and Parenting Verses; Prayer
Generator and Verse Finder link only to `/tools/saved`. Worse, several assessment
tools *appear* connected but their links resolve to nothing: `/writing` reads
`?track=`/`?pillar=` but **not `?category=`**, so every `/writing?category=…` link
(Marriage Assessment, Church Health, Financial Health, Conflict Guide) lands on
the unfiltered index. Emotional Health and Bible Study carry enticing essay titles
on bare `/writing` links — a broken promise, worse than no link.

**Fixes.** (a) Replace every `/writing?category=X` with the working
`/writing?track=X`, and every bare `/writing` under a named title with the real
`/writing/:slug`. (b) Wire the deep exegesis tools into doctrine + essays: each
passage links to its `/theology/doctrine/:slug` and one essay; Bible Reference's
`deeper.books` become `/read/:slug` links; each Glossary term maps to its doctrine
page. (c) Point every bare Scripture reference at `/theology/passage?ref=<ref>`
(the flagship already supports `?ref=`). (d) Add a `tel:988`/counseling block to
every crisis tier (Marriage, Emotional), not just Pastor Burnout. Passage Context
(`PassageContext.tsx`) is the model — it teaches a habit, fetches Scripture at
runtime, and links into the doctrine corpus. Every tool should end by handing the
reader forward.

### 2.5 No per-pillar hubs for the canonical spine

`/pillars` (index) and `/living-well` (Pillar 6) exist, but there is **no
`/pillars/:slug` route** for the other five. Clicking a pillar sends the reader to
a bare `/writing?pillar=slug` list — not a hub with an intro in James's voice, the
reading path, the flagship essay, the matching tool and book, and the library
shelf. The branded hubs that *do* work (`/theology`, `/justice`, `/disruption`,
`/leadership`) belong to the *legacy* taxonomy — so the good hubs and the
canonical spine are not the same set. The spine has no front doors; the front
doors are off-spine. `PILLARS_V2.blurb` fields are still flagged "James supplies
the final on-voice intro."

**Fix.** Build `/pillars/:slug` → a `PillarHub` on the `LeadershipHub` /
`PropheticHub` pattern (that region is the one genuinely integrated part of the
site — copy it). Map `/theology`, `/justice`, `/disruption`, `/leadership`,
`/life`, `/nation` into or under the spine by redirect or alias.

### 2.6 Reading paths hit dead "coming soon" entries

The 6 reading paths (`readingPaths.ts`) are the strongest cohesion asset —
ordered, curated, voice-checked, and topic-correct because hand-curated rather
than resolved by the buggy pillar function. But several arcs end on unwritten
essays rendered "Coming soon" (`available: false`): 4 in *Capture by the Right*, 1
in *Capture by the Left*, 2 in *The Church After Christendom*. And no article
links *into* its path — paths are a top-down table of contents with no bottom-up
entry.

**Fix.** Bind articles to paths (a per-slug map beside `pillar-assignments.ts`, or
derived from `readingPaths.ts`); render "next / previous in this arc" on
`ArticleDetail.tsx`; write or remove every "Coming soon" entry so no path renders
a placeholder. Until 2.2 is fixed, promote the hand-curated paths over the
auto-pillar recommendations.

### 2.7 The one thing that works — copy it

`/leadership`, `/justice`, and `/disruption` are real hubs: they gather essays,
tools, and library content under a posture and cross-link all three. Quote Library
links every card to its source essay; Life Audit cross-links every sibling tool.
The team already knows how to do cohesion in-house. It simply has not been
propagated. **The fix across §2 is wiring, not building.**

---

## 3. Publish the backlog (the fastest depth win)

A large body of finished, voice-passing, full-length content sits unpublished in
`content/drafts/` and `client/public/draft-essays.json`. Publishing it beats
writing anything net-new. Order:

**3a. The 6 written flagship essays** — already in `draft-essays.json`, absent
from `article-library.json`. Run `/admin/load-drafts`; retire the 4 duplicate
stubs (`justice-not-political`, `poor-not-ministry`, `your-city-is-mission-field`,
`consistent-ethic-life`) still in `admin-article-bodies.json` via
`/admin/deduplicate`. Named flagships: `the-constantinian-bargain`,
`a-life-you-cannot-cut-in-half`, `the-church-has-outlived-its-own-funerals`,
`your-work-was-never-going-to-save-you`, `preaching-is-not-public-speaking`,
`the-inheritance-you-choose`. *(Press a button; no writing.)*

**3b. The ~26 historic-faith / formation narrative drafts** — six clusters of
five, register-locked, anti-fabrication rules already applied, none currently
published: `church-history/` (martyrs, Augustine, desert, Bible-in-your-hands,
global church), `creeds/` (faith once delivered, Trinity plainly, what the creed
leaves out, why recite creeds, why incarnation), `church-calendar/` (why a
calendar, Advent, Lent, Easter, Ordinary Time), `sacraments/` (why physical
things, baptism, communion, the table that divides, confession), `disciplines/`
(fixed-hour prayer, fasting, silence, sabbath, lectio divina), `prayer/` (how to
pray, the Lord's Prayer, praying when you don't feel it, praying the words when
you have none, unanswered prayer). Publishing these roughly sextuples the history
library and quadruples the creeds library, and moves calendar, sacraments, and
disciplines from *absent* to *present*. Each carries a `[PERSONAL STORY — James to
supply]` placeholder to fill. Needs one library index per cluster (extend the
`history/` and `creeds/` patterns) + `publish:md` + the matching
`build-*-index.mjs` + `pnpm pdfs`.

**3c. The ~8 drafted pastoral pieces** the *published* leadership library lacks —
all PCN-critical, all already written: `full-92-small-churches-get-right`,
`full-78-bivocational-pastors-get-right`, `full-72-what-a-sabbatical-is`,
`full-86-not-your-churchs-attendance-numbers`, `full-98-when-fire-someone-with-integrity`,
`full-94-revitalize-or-replant`, `full-95-lead-church-decline-without-losing-hope`,
`full-189-collaboration-across-denominations`, plus `full-108`/`full-109`
(collaborative planting).

**3d. Everyday-life drafts** — `full-149-hospitality-not-optional` and
`full-43-christian-singleness` / `full-45-friendships-men-need`, ready to adapt
into the domains named in §7.

Verify each against the voice gate and the citation standard before it enters the
search index (§9).

---

## 4. Doctrinal completeness

The doctrine hub is already mature; the gaps are surgical. The rule holds for
every piece below: **steelman each position in its strongest voice, name the order
(first/second/third), then land — and the reader should not be able to tell where
James stands from the steelman alone.** The two most exposed loci are the two a
skeptic arrives angriest about, and they are the only two where the platform's
signature method visibly lapses.

**First-order holes (build as full six-step doctrine pages):**

- **The atonement theories, fairly weighed** — penal substitution, Christus
  Victor, ransom, recapitulation, satisfaction (Anselm), moral influence,
  governmental. The fact of substitutionary atonement is first-order; the *model*
  is second-order (the "kaleidoscopic" view). Currently only a glossary term and
  one pastoral essay.
- **Hell: three views, honestly weighed** — eternal conscious torment,
  conditional immortality / annihilationism (Stott, Fudge), evangelical
  universalism (Talbott, MacDonald, flagged as the historic minority the creeds do
  not confess). The reality of final judgment is first-order; nature/duration is
  where evangelicals differ. The single highest-value addition on the site.
- **The resurrection as a worked apologetic page** — the minimal-facts case
  (Habermas/Licona), swoon/hallucination/legend theories steelmanned and answered,
  bodily vs spiritual.
- **Justification + the New Perspective on Paul** — Reformation vs Trent
  (imputed vs infused), then Wright/Dunn vs the Old Perspective. First-order
  (justification by grace through faith) vs second-order (the mechanism, "works of
  the law").
- **"Was the Cross Cosmic Child Abuse?"** — the PSA objection, skeptic-facing;
  concede Chalke/feminist critiques at their strongest before answering with
  Trinitarian, self-giving PSA.
- **"What About Those Who Never Heard?"** — restrictivism, inclusivism,
  post-mortem opportunity, each steelmanned; the Constitution names this as a
  model contested doctrine and it exists only as a Hard-Question snippet.

**Second-order debates that deserve their own home:** sanctification (four views),
perseverance/assurance/warning passages, imago Dei as a worked page, the law/gospel
distinction (Lutheran vs Reformed three-uses vs new-covenant), angelology/
demonology (recovering a doctrine the modern church whispers — skeptic-facing on
the "immanent frame"), church membership + church discipline (pastor channel), the
intermediate state, and a new-creation/bodily-resurrection corrective (Wright's
"life after life after death").

**The Bible translation / version debate.** The `translations` and
`textual-criticism` doctrine pages already handle formal-vs-dynamic equivalence and
steelman confessional-TR / KJV-only at its strongest — a genuine strength. Two
additions finish it: **"KJV-Only in Five Flavors: From Preference to
Perfectionism"** (name the Riplinger/Ruckman extreme the current pages only imply)
and **"Which Bible Should My Church Read From?"** (a pastor-facing decision aid:
pulpit vs study vs memorization vs new-believer — PCN distribution value). This is
also the doctrinal anchor for the Bible-translation tool in §5.

**Low-priority clarifiers:** divine simplicity; total depravity clarifier; ordo
salutis explainer; Spirit baptism vs filling; historical Adam; covenants-of-works/
grace front door; common-grace anchor page; Holy Saturday / the descent clause.

**Cross-cutting linking task (no new content):** marry the warm pastoral drafts
(who-is-jesus/, last-things/, sacraments/) to the rigorous six-step doctrine pages
covering the same loci — practical door first, depth behind it.

---

## 5. Hot topics & cultural engagement

Coverage is heavily weighted toward political-capture and justice topics and thin
on body/sexuality/worship topics. Every piece hangs on the existing
`scripture-past-politics/` hermeneutical spine; the four-step contested-doctrine
method is mandatory on the flagged topics; the crisis-care standard governs the
⚠ pieces (validate the feeling, never the despair; keep help visible; never spell
out self-harm; don't diagnose a reader with a condition they never named).

**Fix the asymmetry first — the single most important cultural move.** There is a
full, excellent eight-essay `capture-right/` cluster and **no `capture-left/`
folder at all**; the left critique is two thin posts. The Constitution's discipline
is explicit: "the moment the guardrail only ever fires in one political direction,
it has stopped being orthodoxy and become a tribe in its robes." Build a real
Capture-by-the-Left cluster, mirroring the right beat for beat with the same
instrument and the same grief:

- **"When Compassion Became Coercion"** — the progressive move from persuasion to
  enforcement; the therapeutic lens mistaken for love.
- **"The Sin of Certainty on the Right Side of History"** — Hegelian
  progressivism as a secular eschatology the church absorbed.
- **"Deconstruction That Never Rebuilt"** — the reconstruction thesis turned on
  the left; honor the grief, name the stopping-point.
- **"The Gospel of Authenticity"** — expressive individualism (Taylor, Bellah's
  *Habits of the Heart*) as the actual folk religion of the progressive church.
- **"When Justice Becomes an Idol"** / **"The Sacralized Cause"** — justice severed
  from the cross; steelman the movement's real moral seriousness first, then
  self-implicate.

**The two user-named gaps — near-total holes.**

*Worship & music (the worship wars):* **"The Worship Wars Were Never About Music"**
(worship reduced to taste and market segment — the consumer self in the pew);
**"What Worship Is Actually For"** (worship as the practice that reorders desire —
James K.A. Smith); **"The Regulative and the Normative Principle"** (genuinely
third-order, held open); **"When the Worship Leader Became a Star"** (the
celebrity-worship economy); **"The Church's First Hymnbook Was the Psalter"**
(metrical psalmody, the lost lament and imprecation).

*Bible translations & versions:* **"Which Translation, and Why It Matters Less and
More Than You Think"** (formal vs dynamic, without condescension); **"KJV-Only-ism,
Steelmanned and Answered"** (the real hunger for a stable Word before the
correction); **"A Verse Is Not a Missile"** (translation choices weaponized — ties
into `scripture-past-politics/`). Pairs with the doctrine pieces in §4 and the
comparison tool in the master list.

**The other mission-aligned topics** (ranked P1/P2 in the master list): sexuality
and the theology of the body + the same-sex question handled honestly (Vines/
Brownson steelmanned, historic position held pastorally, the church's real
failures named) + celibacy as vocation; the modern self / gender / the transgender
question without the culture war (Trueman's *Rise and Triumph of the Modern
Self*); race and justice symmetry (justice-as-idol, standpoint-and-the-image-of-God);
prosperity gospel (named first-order error, no dedicated piece — a hard line,
diagnosed and grieved); technology/AI/attention as formation (Haidt taken at his
strongest, brought under Scripture); the therapeutic gospel / MTD critique (honor
suffering and counseling, critique the self-as-final-authority); Christ's
exclusivity and other religions; Christian liberty (Romans 14); and an
end-times-industry critique. Lower-priority same-instrument pairs: capital
punishment (extends the womb-to-tomb ethic), guns, immigration symmetry.

**Existing paid lead-magnet books already engage some of these**
(`bible-and-homosexuality`, `bible-and-transgender-identity`,
`critical-race-theory-biblical`) — cross-link the essays to them; do not duplicate.

---

## 6. Historic Christianity & formation

The historic-faith **reference** layer is genuinely deep and shipped (a seven-era
timeline, 36 figure profiles Ignatius→Lewis, 11 councils, a heresies teaching
tool, creeds and confessions). The **formation-reading** layer is thin only
because the drafts (§3b) are stranded. After publishing those, the real net-new
work:

**The church-history sequence.** The published history library stops in 1648 with
only 4 survey essays; there is no *teachable reading path* through the arc. Build
**"The Whole Story of the Church"** — a 12-essay Bell-voiced sequence (5 already
drafted, 7 net-new), filed as Reading Scripture / Theological Depth, published as a
history reading-path: the persecuted church → Nicaea 325 → Constantinople/Chalcedon
→ the Fathers → the desert and the Rule → the medieval mind (Anselm, Bernard,
Aquinas) → the fight to put the Bible in your hands → 1517 and its four wings → the
awakenings (Edwards, Wesley) → Bonhoeffer and costly grace → "Christianity Was
Never Western." **"How the West Was Disenchanted"** (Enlightenment through Taylor's
secular age) is the essay that ties church history to the platform's entire thesis
— without it, the history library does not serve the central question.

**Creeds/confessions completion.** Publish the 5 creeds drafts; complete Heidelberg
and Westminster Shorter to full text (currently samplers); add the **Belgic
Confession** and **Canons of Dort** (and optionally the **Barmen Declaration
1934**, directly relevant to the nationalism critique); write **"The Nicene Creed,
Line by Line."**

**Catechesis — genuinely absent, a clean net-new opportunity with PCN
distribution.** **"The Old Way of Making a Christian"**: essays on the ancient
catechumenate ("Why the Church Used to Take a Year to Baptize You") and
question-and-answer formation across traditions, plus **a plain-language household
catechism** downloadable as a PDF (`build-pdfs.mjs`) — a resource a pastor can hand
a family.

**The Christian classics — a guided reading path, also absent.** **"The Old Books"**:
a curated 12–15-title great-books path (data-as-JSON like `paths.json`) — Athanasius
*On the Incarnation*, Augustine's *Confessions*, Benedict's *Rule*, *The Cloud of
Unknowing*, Kempis, Brother Lawrence, Bunyan, Bonhoeffer, Lewis — each with a "why
this book / start here / skip this," led by the existing `full-47-why-read-old-books`
as the on-ramp, plus 3–4 companion "start with Athanasius" short essays.

**The disciplines library + Daily Office tool.** Publish the 5 disciplines drafts
into their own library (do not overload the *leadership*-formation index); complete
the classical set (confession, simplicity, service, the examen); and build a **Daily
Office / fixed-hour prayer tool** (morning/midday/evening/night with rotating Psalms
and Scripture, drawn from public-domain text via the pattern already in the Passage
tool). High reader-return and PCN value.

**The Christian Year hub.** Publish the calendar drafts; add Epiphany, Holy Week,
Pentecost, All Saints; build a living **"Where Are We in the Christian Year?"**
widget (today's season, color, meaning, next feast).

---

## 7. Everyday life & pastoral / PCN

Both areas are already strong and deep — well beyond the stale
`integrated-life-roadmap.md` / `leadership-formation-hub.md` docs, which should be
marked "largely implemented." The remaining gaps are narrow.

**Everyday / Integrated Life (audience #4).** The ~69-domain library is
near-complete. Four soft spots: **hospitality** (no domain despite a ready draft —
build `hospitality-and-the-open-door`), **decision-making / discernment**
(genuinely absent — build `guidance-and-the-hard-decision`, pairing with WisdomFinder/
Proverbs31), and the thinness of **singleness** and **addiction** (one domain each;
add a singleness how-to cluster and a recovery-companion arc, both keeping a
real-help path visible). The larger opportunity is the **practical tool/how-to
layer** the roadmap flagged and never built: `sabbath-planner`,
`marriage-rule-of-life` / `state-of-our-union`, `family-discipleship-roadmap`,
`what-the-bible-says-about` topical index, `screen-and-tech-covenant`, `examen` —
the "practical door first, depth behind it" move.

**Pastoral / PCN (audience #3).** The published library is strong on preaching,
polity, leadership, conflict, burnout, and counseling. The gaps cluster in the
**small-church / bivocational / under-resourced pastor's reality** and
**denominational literacy** — and most are already drafted (§3c). Publish those
first, then commission the two flagships: **"Reading Your Own Tradition: A Pastor's
Map of the Denominations"** (steelmanned, PCN's whole thesis of pastors across
traditions at one table) and **"The Small Church Is Not a Failed Big Church"** (the
theology of the small, faithful, unscalable congregation — highest PCN relevance).
Second tier: **"When You Are the One Being Let Go"** (the pastor's own forced exit,
uncovered), **"The Bivocational Pastor's Rule of Life."** Note: the largest single
open content debt anywhere on the site is **Leadership Formation Waves 2–5** — ~20+
deep topics whose hub, validator, and renderer are built but whose topics are
unwritten (character qualifications, money/sex safeguards, servant leadership,
authority, staff, multiplying leaders, criticism/betrayal, accountability,
abuse-prevention governance, the whole succession arc). This is P3 depth, but it is
real and it serves the PCN channel directly.

**Books for the underserved audiences.** The 19 free full-length books invert the
`CLAUDE.md` audience weights (7 pastoral; ~0 for skeptic/seeker). The wanted net-new
volumes: a **skeptic/apologetics book** (Bell's atheism-to-faith story as its
spine), a **doubt→reconstruction book**, a **general marriage book**, a **parenting
book** (five sons — the most on-brand missing title), and a **"both captivities"
political-idolatry book**. And the low-risk, high-payoff book fix: **cross-link
books to articles and reading paths** in both directions (add `relatedArticles`/
`readingPath` to `books/index.json`), and reconcile the book `pillar` strings to
`PILLARS_V2` — the copy already claims books are "drawn from the site's articles
and pathways," but nothing wires them.

---

## 8. The master net-new content list

One prioritized backlog, de-duplicated across all nine sections. **Priority:**
P0 = cohesion (do first, unblocks everything), P1 = core doctrine + guardrail
balance, P2 = hot topics, P3 = depth completion. Pillar uses the `PILLARS_V2`
spine (or the target library/hub). Items marked *(publish)* already exist as
finished drafts — ship, don't write.

| # | Title / Item | Type | Pillar / Home | Priority | One-line angle |
|---|---|---|---|---|---|
| 1 | Ratify one spine; fix `LEGACY_TO_V2` default | engineering | all | P0 | 8-line fix un-mis-files 143 essays; reconcile ia-recommendations to Option B |
| 2 | `build-search-index.mjs` over ALL content types | engineering | all | P0 | one index: articles, books, 14 libraries, tools, paths — served both runtimes |
| 3 | `RelatedContent` component, pillar-keyed | engineering | all | P0 | pillar hub + path + book + tool + 3 essays on every article/tool/book |
| 4 | `/pillars/:slug` hub pages | engineering | all six | P0 | LeadershipHub pattern; James intro, path, flagship, tool, book, shelf |
| 5 | Point nav/footer/`/pillars` at `PILLARS_V2`; retire `pillars.ts` | engineering | all | P0 | one map everywhere; fix the five/six label contradiction |
| 6 | Fix tool links (`?category=`→`?track=`; bare→`/writing/:slug`) | engineering | tools | P0 | broken-promise links become real doors; wire exegesis tools to doctrine |
| 7 | Bind articles to paths; kill "coming soon" entries | engineering | all | P0 | next/prev in arc; no path renders a placeholder |
| 8 | Generate missing library manifests | engineering | libraries | P0 | disruption/justice/nation/prophetic/wisdom/theology — make listable |
| 9 | Publish 6 flagship essays; retire 4 duplicate stubs | publish | mixed | P0 | already in draft-essays.json; run the admin scripts |
| 10 | Publish 26 formation drafts (6 clusters) | publish | Theo Depth / Living Well | P0 | sextuples history, quadruples creeds; calendar/sacraments/disciplines go live |
| 11 | Publish ~8 pastoral drafts (small-church etc.) | publish | the-pastoral-angle | P0 | PCN-critical gaps already written |
| 12 | Atonement theories, six-step | doctrine page | reading-scripture | P1 | penal sub central-not-exclusive; fact 1st-order, model 2nd |
| 13 | Hell: three views, six-step | doctrine page | reading-scripture | P1 | ECT / annihilation / evangelical universalism; highest-value single add |
| 14 | The resurrection: minimal facts | doctrine page | reading-scripture | P1 | Habermas/Licona; naturalistic theories steelmanned |
| 15 | Justification + the New Perspective on Paul | doctrine page | reading-scripture | P1 | Reformation/Trent then Wright/Dunn; 1st vs 2nd order |
| 16 | "Cosmic Child Abuse?" — the PSA objection | article | reading-scripture | P1 | skeptic-facing; Chalke steelmanned then Trinitarian PSA |
| 17 | "What About Those Who Never Heard?" | doctrine page | reading-scripture | P1 | restrictivism/inclusivism/post-mortem; the unevangelized, open |
| 18 | Capture-by-the-Left cluster (4–5 essays) | articles | capture-by-the-left | P1 | mirror capture-right; same instrument, same grief — the guardrail fix |
| 19 | "The Whole Story of the Church" (12-essay path) | articles + path | reading-scripture | P1 | 5 drafted, 7 new; the disenchantment essay ties to the thesis |
| 20 | Disciplines library + Daily Office tool | publish + tool | living-well | P1 | publish 5 drafts; fixed-hour prayer tool, high return value |
| 21 | Worship wars cluster (3–5 essays) | articles | discipleship/formation | P2 | user-named; worship as formation vs taste/market |
| 22 | Bible translations cluster (2–3 essays) | articles | reading-scripture | P2 | user-named; formal/dynamic; KJV-only steelmanned |
| 23 | Bible-Translation comparison tool | tool | tools | P2 | John 3:16 across ESV/NIV/KJV/NASB/paraphrase over the translations doctrine |
| 24 | "KJV-Only in Five Flavors" + "Which Bible for My Church?" | doctrine/guide | reading-scripture | P2 | name the extreme; pastor decision aid (PCN) |
| 25 | Sexuality / body / same-sex, handled honestly (3) | articles ⚠ | capture-left/discipleship | P2 | positive theology of body first; affirming case steelmanned; celibacy as vocation |
| 26 | Modern self / gender / transgender (3) ⚠ | articles ⚠ | after-christendom-pillar | P2 | Trueman's expressive self as the lens under the debate |
| 27 | Technology / AI / attention for formation (3) | articles | living-well | P2 | Haidt at his strongest, brought under Scripture; the algorithm as rival liturgy |
| 28 | Therapeutic gospel / MTD critique (2) ⚠ | articles | capture-left/discipleship | P2 | honor counseling, critique the self-as-final-authority |
| 29 | Prosperity gospel — a different religion | article | capture-by-the-right | P2 | named 1st-order error; hard line, diagnosed and grieved |
| 30 | Christ's exclusivity / other religions | article | reading-scripture | P2 | 1st-order floor, unevangelized 3rd-order; skeptic finishes met |
| 31 | Justice-as-idol + standpoint-and-image-of-God | articles | capture-by-the-left | P2 | symmetry for the deep justice cluster |
| 32 | Sanctification / perseverance / imago Dei / law-gospel | doctrine pages | reading-scripture | P2 | folded debates that deserve their own home |
| 33 | Angelology / demonology recovery + spiritual warfare | doctrine + article | reading-scripture | P2 | the immanent frame flattening the unseen world; skeptic-facing |
| 34 | Church membership + church discipline | doctrine pages | the-pastoral-angle | P2 | PCN utility; Matthew 18 in a deconstruction age |
| 35 | Catechesis: "The Old Way of Making a Christian" + household catechism PDF | articles + resource | family/discipleship | P2 | absent domain; direct PCN distribution |
| 36 | "The Old Books" Christian-classics reading path (+3–4 essays) | path + articles | reading-scripture | P2 | sends the reader to the sources; led by why-read-old-books |
| 37 | Nicene Creed line-by-line; Belgic + Dort; complete Heidelberg/Westminster | article + documents | reading-scripture | P2 | finish the creeds/confessions shelf |
| 38 | Christian Year hub + "Where Are We?" widget (+4 feast essays) | publish + tool | living-well | P2 | time as counter-formation; publish calendar drafts |
| 39 | `hospitality-and-the-open-door` domain *(draft exists)* | domain | living-well | P2 | the open door as a discipline, not entertaining |
| 40 | `guidance-and-the-hard-decision` domain | domain | living-well | P2 | how a Christian decides without a treasure hunt or a feeling |
| 41 | Denominational-literacy: "Reading Your Own Tradition" | article/formation | the-pastoral-angle | P2 | steelmanned map of the traditions; PCN's whole thesis |
| 42 | "The Small Church Is Not a Failed Big Church" *(adapt drafts)* | article | the-pastoral-angle | P2 | refuse the growth scoreboard; highest PCN relevance |
| 43 | Formation flagships: manhood, womanhood, money, rest | articles | living-well | P2 | four Formation anchors the pillar lacks |
| 44 | Book↔article/path cross-linking + reconcile book `pillar` fields | engineering | books | P2 | "read the whole argument as a book"; wire the claimed connection |
| 45 | Integrated-Life tool layer (sabbath-planner, state-of-our-union, examen, family-roadmap, what-the-bible-says-about) | tools | living-well | P3 | convert deep domains into things a seeker does |
| 46 | Leadership Formation Waves 2–5 (~20+ deep topics) | formation topics | the-pastoral-angle | P3 | largest open content debt; hub built, topics unwritten (PCN) |
| 47 | Net-new books: skeptic, doubt→reconstruction, marriage, parenting, both-captivities | books | mixed | P3 | free library currently inverts the audience weights |
| 48 | Recovery-companion arc (addiction); singleness how-to cluster | domain + articles | living-well | P3 | the walk-back, not just the diagnosis; the Tuesday-afternoon version |
| 49 | Christian liberty (Romans 14); end-times industry; capital punishment; guns; immigration symmetry | articles | reading-scripture | P3 | same-instrument pairs; low urgency, high credibility |
| 50 | "The Bivocational Pastor's Rule of Life"; sabbatical template; board-conflict decision-tree tool; pastor's-own-firing | articles + tools | the-pastoral-angle | P3 | finish the PCN pastoral gaps (several drafted) |
| 51 | Register/Doctrine explorers, Creed explorer, Church-History timeline, Lens self-diagnostic, "Where do I start?" path tool | tools | tools | P3 | register dormant content as tools; the lens diagnostic is the most on-mission absent tool |
| 52 | Life-domain variance pass (break the 62× 8-part scaffold where the topic resists it) | editorial | living-well | P3 | keep the depth, lose the machine-under-it feel |

---

## 9. Roadmap to finality

Phased so cohesion lands before depth, and every phase ends checked, not assumed.

**Phase 0 — Cohesion (unblocks everything).** Master-list items 1–11.
Ratify one spine and fix `LEGACY_TO_V2`; build the unified search index and serve
it from both runtimes; ship `RelatedContent`; build `/pillars/:slug` hubs; fix the
tool links and bind articles to paths; generate the missing manifests; and publish
the entire backlog (flagship essays, the 26 formation drafts, the pastoral drafts).
Gate: `pnpm check`, `pnpm test`, the content validators, `api-parity.test.ts`, and
a new dev/prod search-parity test all green.

**Phase 1 — Doctrinal core + guardrail balance.** Items 12–20. The six first-order
doctrine pages, the Capture-by-the-Left cluster, the church-history sequence, and
the disciplines library + Daily Office tool. This is where the platform's signature
method stops lapsing and the guardrail starts firing both directions.

**Phase 2 — Hot topics + user-named gaps.** Items 21–43. Worship/music and Bible
versions first (user-named), then sexuality/gender, technology/formation, the
therapeutic and prosperity critiques, exclusivity, the folded second-order
doctrines, catechesis, the classics path, the creeds completion, the Christian Year
hub, and the everyday/pastoral flagships.

**Phase 3 — Depth completion + hardening.** Items 44–52. Book cross-linking,
Leadership Formation Waves 2–5, the net-new books, the Integrated-Life tool layer,
the remaining hot-topic pairs, the dormant-content tools, and the life-domain
variance pass.

**Ongoing — refine every piece into James's voice.** As drafts and net-new pieces
land, each passes the voice gate (the `CLAUDE.md` forbidden-language kill-list, the
structural moves, and the content validators). The voice is never "improved" — the
gate exists to catch AI drift and force the prose back to Bell. Placeholders like
`[PERSONAL STORY — James to supply]` are filled by James, not invented.

### What "finality" concretely means — the checklist

1. **One canonical taxonomy, everywhere.** `PILLARS_V2` (six) is the single spine
   in nav, footer, `/pillars`, `/writing`, sitemap, and JSON-LD; tracks are
   filters; `pillars.ts` and the nav `PILLAR_ORDER` are retired; `pillarForPost`
   answers "what pillar?" for every one of the ~1,100 pieces, verified by a test
   that fails on any orphan.
2. **Unified search over ALL content types.** One index covers DB articles, books,
   all 14 libraries, tools, and paths; every surface queries it; dev and prod
   return identical result sets, guarded by a test.
3. **Complete cross-linking.** Every article, tool, and book shows its pillar hub,
   reading path, a matched book, and a matched tool. No content type is an island.
4. **A hub per pillar.** Each of the six has a real landing page on the working hub
   pattern; the legacy hubs are mapped into the spine, not competing with it.
5. **Every article on a path; no dead ends.** Each essay shows next/previous in its
   arc; no path renders a "Coming soon" placeholder.
6. **Every piece has one home and is reachable.** Every library appears in nav or
   footer and has a generated manifest; the sitemap and `llms.txt` enumerate the
   whole corpus; nothing is reachable by direct URL only.
7. **The first-order doctrinal holes are closed** and the guardrail fires in both
   directions (Capture-by-the-Left at parity with the right).

### How the corpus stays continuously refinable

Finality is not a frozen site; it is a settled map with movable pieces. Three
disciplines, each already latent in the codebase, keep it that way:

- **Single source of truth per piece.** One pillar (`pillar-assignments.ts` →
  `pillarForPost`), one path (a path map beside it), one canonical URL. Filing is
  one line. When "what pillar is this?" has exactly one answer, related-content,
  search, hubs, and the sitemap all inherit it for free.
- **A voice gate on every edit.** Extend the CI validators and the
  forbidden-language check to the static libraries and to every new library entry,
  so a piece cannot enter the corpus — or the search index — until it passes the
  voice and citation standard. Refinement never lowers the floor.
- **Rebuild the index, not the map.** Because content is data (`client/public/*`
  JSON + generated manifests + the unified search index), the refinement loop is:
  edit the piece → rerun the matching `build-*-index.mjs` → rerun
  `build-search-index.mjs` → `pnpm pdfs` if it feeds a PDF. The structure is fixed;
  only the pieces move.

The corpus is already deep enough to carry the weight of the mission. What it
lacks is not more writing but the wiring that lets a reader — and a crawler, and
the search box — see that the writing is one body, not fourteen shelves and a
database that never introduce themselves. Wire it once. Then refine forever.
