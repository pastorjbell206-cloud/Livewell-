# 05 — Information Architecture & Navigation

> Site-elevation audit, step 1.5. Read-only. Companion: `00-architecture-map.md`
> (the full 260-route tree). This document maps the site **as a user experiences
> it** — header, footer, homepage, entry points, labels — not as the code is
> organized. All citations verified on branch `site-elevation`, 2026-07-01.

---

## 1. Primary Navigation — what the header actually offers

`client/src/components/MinimalNav.tsx` builds the header at runtime from live
post counts (`trpc.posts.navIndex`, MinimalNav.tsx:185) over the five-pillar
sub-pathway model (`client/src/lib/subPathways.ts:15–21`), then relabels and
folds pillars into "doors" (MinimalNav.tsx:161–171):

**Desktop header (left to right):**

| Door | Type | Destination(s) |
|---|---|---|
| Start here | flat link | `/start` (MinimalNav.tsx:162) |
| Theological Depth | dropdown | 4 curated + "All Theological Depth" (`/writing?pillar=theological-depth`) — trimmed by `trimDropdown(max=4)` (MinimalNav.tsx:49–59) |
| Post-Christian World | dropdown | Disruption hub, Consistency Check, Hard Questions, Justice hub + "All Prophetic Disruption" (fold of two pillars, MinimalNav.tsx:138–148) |
| Everyday Life | dropdown | Life hub, Whole-Life Assessment, Family Discipleship, Marriage + "All Everyday Life" (relabel of Integrated Life, MinimalNav.tsx:150–159) |
| The Table | flat link | `/table` (MinimalNav.tsx:166) |
| For Pastors & Leaders | dropdown | Leadership hub, Library, Sermon Series ×2 + "All Leadership" (relabel of Leadership Formation, MinimalNav.tsx:167) |
| Resources | flat link | `/resources` (MinimalNav.tsx:168) |
| Books | flat link | `/books` (MinimalNav.tsx:169) |
| About | flat link | `/about` (MinimalNav.tsx:170) |
| Find Help | flat link, mustard | `/help` (MinimalNav.tsx:569–581) |
| Search icon | overlay | `/search?q=` (MinimalNav.tsx:208–215) |
| **Subscribe** (button) | flat link | `/substack` (MinimalNav.tsx:604–623) |

**Mobile** mirrors the same doors (first dropdown item doubles as the tap-through
link, MinimalNav.tsx:718–732) plus two extra buttons the desktop header does
**not** have: Subscribe → `/substack` and **Membership** → `/membership`
(MinimalNav.tsx:836–875). Membership is invisible to desktop users except in the
footer.

### Header coverage vs. the route estate

Counting every reachable destination in the rendered header (doors + trimmed
dropdown items + utility links): **~27 unique destinations out of 260 routes ≈
10%**. That is fine in principle — a header should be a door, not a sitemap —
but look at *which* estates get zero header presence:

| Estate | Routes | In header? |
|---|---|---|
| Interactive tools | 52 (30 under `/tools`, 11 leadership instruments, 3 diagnostics…) | **0** — no "Tools" door; `/tools` is reachable only via `/resources` → "Tools & Assessments" card (Resources.tsx:74) or the footer (Footer.tsx:73) |
| Book funnels | 21 product pages | 0 directly; `/books` catalog is 1 click, each funnel 2 |
| FAQ landing pages | 10 | 0 — no FAQ index page exists anywhere |
| Compare pages | 6 | 0 — index is `/theology/compare`, itself 2 levels down |
| Crisis landings | 11 | 0 directly — `/help` (in header) links ~4 of them |
| Theology hub + 14 sub-routes | 15 | 2 (Depth hub, sub-items in dropdown) |
| Justice/Disruption hubs | 10 | 3, folded under "Post-Christian World" |

**Verdict:** the header serves the *writing* well and the *tools* — arguably the
site's most differentiated asset (architecture map §4) — not at all. A seeker who
would be served by the Marriage Assessment or the burnout diagnostic has no
scent trail from the header; the word "Tools" appears nowhere in it.

Two smaller header defects:

- **"Subscribe" goes to Substack, not the site's own list.** The header button
  routes to `/substack` (MinimalNav.tsx:604), a page whose CTA is an external
  "Subscribe on Substack" link (Substack.tsx:92), while the homepage's
  "single most important conversion surface" (Home.tsx:564) is `SegmentedSignup`
  posting to the site's own tRPC subscriber list, and a third page `/subscribe`
  (EmailSignup) also exists. Three subscribe surfaces, two different lists, one
  header button pointing at the one the platform doesn't own.
- **Dropdown trimming is silent.** `trimDropdown` keeps only curated items with
  descriptions (MinimalNav.tsx:49–59), so e.g. Leadership's 7 curated links are
  cut to 4 with no "more…" cue beyond the "All Leadership" listing link.

---

## 2. Footer vs. the CLAUDE.md contract

The Decision Log says: *"footer mirrors the header (The Five Pillars / Write &
Read / Libraries & Tools / For Pastors / Connect)."* The actual footer
(`client/src/components/Footer.tsx`) has the five contracted columns plus brand —
but the **content contradicts both the contract and the header**:

1. **Column 1 is "The Pillars" and its first link is "The Six Pillars"**
   (Footer.tsx:34–36) → `/pillars`, whose H1 is "Two movements. Six pillars."
   (Pillars.tsx:54) while its SEO title is "The Five Pillars" (Pillars.tsx:31).
   The header, meanwhile, presents five pillars relabeled as doors. Five or six
   is unresolved in the user's face.
2. **The footer's pillar links don't match the header's pillar labels.** Footer
   lists Theological Depth / Prophetic Justice / Prophetic Disruption /
   Leadership Formation / **Living Well** (Footer.tsx:37–41). The header calls
   those same estates Theological Depth / **Post-Christian World** (fold) /
   **For Pastors & Leaders** / **Everyday Life**. A user who learns the header's
   names cannot find them in the footer, and vice versa.
3. **"Resources" appears twice in one footer** despite the contract that
   "Resources names exactly one thing": "The Resource Hub" (Footer.tsx:63) and
   "Downloads & Study Guides" (Footer.tsx:88) both point at `/resources`.
4. The footer does **mirror** the header in structure (5 named columns ✓) and
   correctly carries Membership, About, PCN, Contact (Footer.tsx:92–103).
5. Hex violations noted in passing: `#ffffff` hardcoded at Footer.tsx:7,19
   (token rule; already logged in architecture map §3).

**Verdict:** structurally compliant, semantically divergent. The footer speaks
the *old* five-pillar language and the six-pillar V2 language at once; the
header speaks a third, relabeled language. Same site, three vocabularies.

---

## 3. First-time visitor test (Home.tsx traced top to bottom)

Homepage order (Home.tsx): dark hero + vision card → four mission doors →
flagship essays → SegmentedSignup → five-pillar strip → footer.

| Goal | Clicks | Path | Notes |
|---|---|---|---|
| (a) Read an essay | **1** | "Start with these" flagship cards → `/writing/:slug` (Home.tsx:505–508); hero "Read the essays" → `/writing` is 2 | Good |
| (b) Tools hub | **2** (nav Resources → Tools card, Resources.tsx:74) or 1 via footer link buried 11th in a 12-link column (Footer.tsx:73) | **No tools presence anywhere on the homepage body.** The site's 52 tools are invisible on arrival |
| (c) Subscribe | **0** | SegmentedSignup inline (Home.tsx:564–578) | Good — but competes with header Subscribe → Substack (§1) |
| (d) Buy a book | **3** | nav Books → `/books` catalog → funnel page → buy button | No book, funnel, or "the books" section on the homepage at all. For a platform whose author has 21 books and pending Stripe revenue, commerce is 3 clicks deep with zero homepage scent |
| (e) Skeptic "start here" | **1** | hero tertiary link "Or start here if you're a skeptic" → `/skeptic-track` (Home.tsx:246–260) | Exists, but as the *third* CTA in low-contrast underline (rgba .6), below "Read the essays" and "Find your track" |

### Are the four mission doors the right doors?

The doors (Home.tsx:35–64): **Become a Disciple** (`/discipleship`), **Make
Disciples** (`/resources`), **Leadership Training** (`/leadership`), **Prophetic
Justice** (`/justice`). Ranked audiences (CLAUDE.md): 1. skeptics, 2. doubting
Christians, 3. pastors, 4. seekers.

- **Skeptic (audience #1): no door.** The hardest case, "the one Bell writes
  toward," gets a tertiary text link in the hero and nothing in the doors.
- **Doubting Christian (#2): no door.** `/doubt` exists and is good; it is not
  on the homepage.
- **Pastor (#3): served** — "Leadership Training."
- **Seeker (#4): half-served.** "Become a Disciple" assumes the visitor already
  self-identifies as wanting discipleship; the seeker per the constitution came
  for "the marriage, the parenting, the work that is crushing them." Marriage/
  parenting/crisis have no door.
- **"Make Disciples" → `/resources`** is a mislabeled door: the destination is a
  general downloads/libraries hub, not a disciple-making page (`/disciple-making`
  exists and would match the label).
- **"Prophetic Justice"** is a topic the *author* cares about, not an intent any
  of the four ranked audiences arrives carrying.

**Verdict:** the doors are organized by the platform's program, not the reader's
condition. Audiences 1, 2, and most of 4 have no door. The `/help` triage page
(Help.tsx:19–149 — marriage, anxiety, doubt, deconstruction, skeptic, new
believer, grief, parenting, money, burnout) is *exactly* the right door set and
is exiled to a header utility link.

---

## 4. Competing entry points — "where do I start?"

Nine routes answer the same visitor question. What each promises (per H1/SEO
title) and who links to it (inbound-link census over client/src, excluding
App.tsx registrations):

| Route | Promise | Inbound links | Distinguishable? |
|---|---|---|---|
| `/start` | "Find Your Path" — 3-step branching quiz → reading paths (StartHereQuiz.tsx:130–136) | ~20 (Footer, Home, Help, Framework…) — the de-facto canonical | The winner by linkage |
| `/start-here` | "Where are you right now?" — 6-weighted-question diagnostic → 6 profiles (StartHereDiagnostic.tsx:1–96) | 2 (ReadingPathDetail, Roadmap) | **No.** Same promise as `/start`, different quiz. A user cannot tell `/start` from `/start-here` |
| `/diagnostic` | "The Spiritual Health Reflection" — 8 questions, 4 dimensions (Diagnostic.tsx:1–17) | 3 | Barely — a third onboarding quiz |
| `/skeptic-track` | "Start here if you're skeptical" — 7 essays in argument order (SkepticTrack.tsx:99–130) | 5 | **Yes** — the one entry with a distinct audience |
| `/reading-paths` | Index of curated paths (ReadingPaths.tsx) | 8 | Overlaps `/start`'s output |
| `/pillars` | "Two movements. Six pillars." — taxonomy explainer (Pillars.tsx:31–54) | 3 | Explains structure, not a start |
| `/framework` | "Five pillars. One arc." (Framework.tsx:55–65) | 2 | **No** — a second taxonomy explainer that disagrees with `/pillars` on the number of pillars |
| `/library` | "A commonplace book" — quote archive (Library.tsx:18–20,158) | 1 (Resources card) | Misnamed: footer calls `/read` "The Library (read online)" (Footer.tsx:51) while `/library` is quotes — two different "Library"s |
| `/resources` | "Tools that have earned their place" — libraries + downloads hub (Resources.tsx:125–136) | 12+ | Yes, but absorbs "start" traffic via the Make Disciples door |

Plus `/roadmap` ("What's been written. What's coming," RoadMap.tsx:133–162) and
`/dashboard` (member-only; **no visitor-facing inbound link at all**).

**Three onboarding quizzes** (`/start`, `/start-here`, `/diagnostic`) and **two
taxonomy explainers** (`/pillars` "six", `/framework` "five") coexist. And the
StartHere.tsx page file is a fourth, orphaned variant (architecture map §2). The
hero CTA says "Find your track" (Home.tsx:242) but lands on a page titled "Find
Your *Path*" — even the verb noun doesn't survive the click.

### Pastor entry points — same disease

| Route | Promise | Inbound | Verdict |
|---|---|---|---|
| `/pastors` | "You weren't meant to lead alone" — PCN pitch (Pastors.tsx:13–31) | 9 | Distinct (the network) |
| `/leadership` | "The weight of leading the church" — the real hub (LeadershipHub.tsx:16–24) | 15+ (nav, footer, Home) | Canonical |
| `/for-pastors` | "Resources for the work" — essays + prep + PCN (ForPastors.tsx:52–86) | **1** (landing/PostChristian) | Near-orphan duplicate of `/leadership` |
| `/for-leaders` | "Leadership formation under cost" — lay leaders (ForLeaders.tsx:47–70) | 2 (Footer as "Church Leadership", ForPastors) | Duplicate; label in footer differs from H1 |
| `/pastors-resource-wall` | sermon prep + guides wall (PastorsResourceWall.tsx:25–36) | 2 | Duplicate of `/leadership` tool shelf |
| `/resources-for-pastors` | pastor downloads (ResourcesForPastors.tsx:30–36) | **0 — true orphan** (only a vercel.json redirect reaches it) | Delete/redirect |

Six pastor front doors, of which users can meaningfully reach two. The PCN
distribution channel — the platform's stated highest-yield growth channel — is
split across six URLs with three vocabularies (Pastors / Leaders / Leadership).

---

## 5. Orphans, closed rings, dead ends

From the inbound-link census (client/src, exact-path matching):

- **True orphans:** `/resources-for-pastors` (0 inbound) and `/dashboard`
  (login-flow only). Page-file orphan: `client/src/pages/StartHere.tsx` (no
  route, no importer — architecture map §2).
- **The FAQ ring (10 pages):** no FAQ index exists; not in nav, footer, or any
  hub. Inbound links are almost entirely FAQ→FAQ "Related questions" blocks,
  plus 2 landing pages and `/honest-questions`. These pages are effectively
  **SEO-only**: reachable from Google, invisible from the site's own IA.
- **The crisis ring (11 pages):** same pattern — they cross-link each other;
  `/help` (header) links ~4 (`/pastoral-burnout`, `/grief`…); none in nav or
  footer. `/sermon-series` has 1 inbound, `/parenting-help` 1.
- **Compare pages (6):** all indexed at `/theology/compare`, which is itself two
  levels down inside the Theology hub; 1–3 inbound links each.
- **Thin threads elsewhere:** `/framework` (2), `/start-here` (2),
  `/living-well` (2 — yet it's a footer "pillar"), `/how-tos` (2), `/library`
  (1), `/for-pastors` (1).
- **Dead ends: none found.** All three spot-checked page bottoms offer next
  steps — `/faq/does-god-exist` ends with 3 related questions + essay CTA
  (faq/DoesGodExist.tsx:118–146); `/compare/catholic-vs-protestant` ends with 5
  keep-reading links + series CTA (comparisons/CatholicVsProtestant.tsx:245–272);
  `/church-hurt` ends with signup + "when you are ready" essay CTA and keeps
  external crisis resources visible (landing/ChurchHurt.tsx:190–217). Page-level
  exit design is genuinely good; the problem is **entrances**, not exits.

---

## 6. Labeling — clever vs. clear

Test: would a first-time skeptic or seeker know what this means *before*
clicking? (The brand may keep one signature name; it cannot afford six.)

| Label | Where | Problem | Plainer alternative |
|---|---|---|---|
| **The Table** | header flat link (MinimalNav.tsx:166) | Unintelligible without the hero copy ("disciplemaking in homes," Table.tsx:36–47). In a nav row it reads like a restaurant or a podcast | "Discipleship at Home" (or fold under a Discipleship door) |
| **Post-Christian World** | header door (MinimalNav.tsx:139) | Better than "Prophetic Disruption," but still an academic frame; the fold hides "Justice" entirely behind it | "Church & Culture" or "Faith & Politics" |
| **Prophetic Disruption / Prophetic Justice** | footer (Footer.tsx:38–39), hubs | "Prophetic" is insider vocabulary (Brueggemann readers get it; the seeker doesn't). Two near-identical labels for adjacent content | "Justice" / "The Church & Politics" |
| **Leadership Formation / Formation** | footer, `/leadership/formation`, "Deep Formation" (Footer.tsx:86) | "Formation" is seminary dialect. Header's own relabel ("For Pastors & Leaders") proves the point | Keep the header's relabel everywhere |
| **Integrated Life / Everyday Life / Living Well** | subPathways.ts:20, MinimalNav.tsx:150, Footer.tsx:41 | Three names for one estate, all live simultaneously | Pick "Everyday Life," retire the others |
| **The Six Pillars / Five pillars / Find your track / Find Your Path** | Footer.tsx:36, Framework.tsx H1, Home.tsx:242 vs StartHereQuiz title | Internal taxonomy arithmetic leaking into user-facing copy | Users never need to count pillars; say what's inside |
| **Trench work** | not found in any nav/hub label (grep) | — | n/a (flagged in brief; does not exist in current UI) |
| **The Library** vs **The Library (read online)** | Library.tsx:158 (quotes) vs Footer.tsx:51 (`/read`) | Same name, two products | "Quote Library" / "Read the Books Online" |

The pattern: **the writing voice ("endings that leave weight") has been applied
to navigation, where the job is the opposite** — a nav label is wayfinding, not
prose. CLAUDE.md's own forbidden-language logic (no cleverness that performs
depth) argues for plain doors.

---

## 7. Taxonomy coherence — three systems, all user-visible

| Taxonomy | Definition | Where the user sees it |
|---|---|---|
| **Legacy tracks** (13: after-christendom, politics, doubt, marriage…) | `taxonomy.ts:34–165`, URLs `/writing?track=` (taxonomy.ts:221–223) | Old inbound URLs still filter (Writing.tsx:96–98); track descriptions still render as page subtitles (Writing.tsx:246–249); Help/segments reference tracks; hero CTA copy says "track" |
| **PILLARS_V2** — two movements, six pillars (Capture by the Right/Left, Scripture Past Politics, After Christendom, Pastoral Angle, Living Well) | `taxonomy.ts:260–267`, URLs `/writing?pillar=<v2-slug>` | **Every article card chip** (`TrackChip` renders V2 short labels — "The Right," "The Left," "Pastoral" — TrackChip.tsx:27–28, incl. homepage Home.tsx:531); the `/writing` filter chips grouped by Diagnosis/Formation (Writing.tsx:318–393); `/pillars` page; footer "The Six Pillars" |
| **Five-pillar / sub-pathway spine** (Theological Depth, Prophetic Justice, Prophetic Disruption, Leadership Formation, Integrated Life) | `subPathways.ts:15–51`, URLs `/writing?pillar=<five-slug>&sub=` | The **header** dropdowns (with door relabels on top); footer pillar links; the Decision Log calls this "the only taxonomy spine" |

The collision is concrete, not theoretical: **both pillar systems share the same
`?pillar=` query param.** Writing.tsx disambiguates by slug namespace
(Writing.tsx:81–110) — `?pillar=theological-depth` filters by sub-pathway,
`?pillar=capture-by-the-right` filters by V2 assignment. So:

- The header files an essay under "Theological Depth ▸ Doctrine & Scripture."
- The card chip on that same essay says "Scripture & Politics" or "Pastoral"
  (V2), and clicking the chip filters by a *different* taxonomy than the nav
  door the user just used.
- The footer offers both: "The Six Pillars" (`/pillars`, V2) one line above five
  legacy-pillar hub links.
- `/pillars` says six; `/framework` says five; the homepage strip (Home.tsx:
  67–73, 602) says "Five pillars. One argument." with the *legacy* five.

No single page shows a user one consistent map of the site. The Decision Log's
own ruling ("the five pillars are the only taxonomy spine") is violated by the
footer, the article chips, the /writing filter UI, and `/pillars` itself.

---

## 8. Proposed IA

Principle: **doors named by the reader's condition, one taxonomy below the
fold, everything else reachable in ≤2 clicks from a door.** The positioning
already dictates the door set — the four ranked audiences plus the two things
people come to take away (writing, tools/books).

```
HEADER (6 doors + utilities)
├── Start Here ──────────────── /start (keep ONE quiz; fold /start-here + /diagnostic into it)
│     ├── "I'm skeptical"            → /skeptic-track   (audience 1 — promoted, not tertiary)
│     ├── "My faith is cracking"     → /doubt + /faith-crisis ring
│     ├── "I need help with life"    → /help triage (marriage, grief, parenting, money…)
│     └── "Map of everything"        → /pillars (the ONE taxonomy page; /framework retired)
├── Writing ─────────────────── /writing
│     └── filters = ONE taxonomy (the chosen spine + sub-pathways); tracks 301
├── Books ───────────────────── /books (catalog → 21 funnels; add a homepage books row)
├── Tools ───────────────────── /tools (all 52 registered: /tools sections for
│     Assess / Study / Pray / Family / Leadership instruments; fixes the 4 unregistered)
├── For Pastors ─────────────── /leadership (canonical hub)
│     ├── PCN                        → /pastors
│     ├── Sermon prep & instruments  → current /leadership/* + resource wall content
│     └── 301: /for-pastors, /for-leaders, /pastors-resource-wall, /resources-for-pastors
├── About ───────────────────── /about (+ Work With James, Roadmap)
└── utilities: Search · Find Help (keep, mustard) · Subscribe → the SITE list
      (SegmentedSignup page; Substack link lives on that page, not in the header)

FOOTER — same six doors, same labels, one link per destination; add
  "Questions people ask" column → new /faq index (opens the 10-page ring)
  and "In a hard season?" column → /help (opens the crisis ring).

HOMEPAGE DOORS → rename to the audiences:
  I'm skeptical (→/skeptic-track) · My faith has questions (→/doubt)
  Life is heavy right now (→/help) · I lead a church (→/leadership)
  (Prophetic Justice and Discipleship remain one click deep, under Writing/Start.)
```

Everything currently orphaned folds in: FAQ ring under a `/faq` index (footer +
`/theology/questions` cross-links); crisis ring under `/help` (link all 11, not
4); compare pages under the `/faq` index + Theology hub; `/library` renamed
"Quote Library" under Tools; `/exile`, `/living-well`, `/wisdom`, `/how-tos`
under Start Here's map page or Resources.

---

## 9. Friction points, ranked

| # | Severity | Finding | Affects | Effort |
|---|---|---|---|---|
| 1 | **Critical** | Three user-visible taxonomies (tracks, V2 six-pillar chips/filters, five-pillar nav) with colliding `?pillar=` semantics; header, footer, chips, `/pillars`, `/framework`, and homepage disagree on the site's own map (§2, §7) | Every visitor on every page with an article card | Medium-High: pick one spine, migrate chips/filters/footer, 301 old params — code exists, it's a consolidation, not a build |
| 2 | **Critical** | Homepage doors miss audiences 1 and 2 (skeptic = tertiary link; doubting Christian = nothing) and hide commerce and tools entirely — 0 tools presence, book purchase 3 clicks with no scent (§3) | Every first-time visitor; the platform's ranked-audience strategy and pending Stripe revenue | Low-Medium: rewrite the four DOORS entries (Home.tsx:35–64), add a books row and a tools row — the destinations all exist |
| 3 | **High** | 9 competing "start" entry points (3 quizzes, 2 taxonomy explainers) and 6 pastor front doors, 1 a true orphan (`/resources-for-pastors`), most with ≤2 inbound links; users cannot tell `/start` from `/start-here` from `/diagnostic` (§4) | Every visitor who tries to orient; pastors (the growth channel) worst-served | Low: pick canonical pages, 301 the rest in vercel.json + remove dead links |
| 4 | **High** | 27 pages (10 FAQ + 11 crisis + 6 compare) are SEO-only closed rings with no index and no presence in nav/footer — the pages built to *catch* the top-priority audiences don't receive internal traffic (§5) | Skeptics/seekers arriving via any other page; internal circulation and SEO equity | Low: one `/faq` index page, link all 11 crisis pages from `/help`, footer columns |
| 5 | **Medium** | Header "Subscribe" points to Substack (external list) while the homepage panel feeds the site's own list; `/subscribe` is a third surface (§1) | Every would-be subscriber; splits the platform's most important owned asset | Low: point header at the segmented signup page |
| 6 | **Medium** | Clever labels: "The Table" in the header, "Prophetic Disruption," "Formation," "Integrated Life"/"Everyday Life"/"Living Well" tri-naming, two "Library"s (§6) | First-time skeptics and seekers (the top audiences are the least fluent in church dialect) | Low: rename strings; slugs can survive |
| 7 | **Medium** | Membership absent from desktop header (mobile-only + footer) despite pending Stripe membership strategy (§1) | Desktop visitors (majority of long-form readers) | Trivial |
| 8 | **Low** | Label drift on single links: "Find your track" → "Find Your Path"; footer "Church Leadership" → H1 "Leadership formation under cost"; SEO title "The Five Pillars" on a page whose H1 says six (§4, §6) | Users who click those links; trust erosion at the margin | Trivial |

---

## 10. Verdict

The estate is rich and the exits are good — no dead ends, strong page-bottom
CTAs, a genuinely excellent `/help` triage page. But the entrances are a maze:
three taxonomies speak over each other on every card and filter, nine doors
claim to be "start," six claim to be "for pastors," and the homepage's four
doors skip the two audiences the constitution ranks first. The site does not
need new pages to fix its IA. It needs fewer names for the things it already
has, one spine instead of three, and a front door that speaks the reader's
condition instead of the platform's program.
