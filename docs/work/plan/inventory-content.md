# Inventory: Content and Articles

Surveyed 2026-10-26 against `main` at 3f204cd (#534, "Take it with you", merged
today on top of #521 and #531), plus the work branch's `docs/work/essays/`
pilots. Read-only: nothing outside `docs/work/plan/` was changed. Family
material is covered in depth in `docs/work/plan/inventory-family.md`; this
file touches it only where it meets the rest of the content.

Method, briefly: every library under `client/public/` was counted and profiled
by script; the routes in `client/src/App.tsx` and the links in the hubs
(`siteNav.ts`, Home, Study, Resources, Help, Family, ToolsHub, Writing) were
traced to see how a reader gets to each one; a sample of every library was read
against `docs/VOICE-JAMES-BELL.md`; three live shelf essays were read in full
from production (`posts.getBySlug`) and the production listing was pulled to
get the length and dates of the other twelve. The voice numbers in section 5
are regex heuristics, useful for comparing gait between libraries, not
verdicts on any page. I could not load the site in a browser here (no Chromium
in the sandbox), so the phone-screen figures in section 7 are computed from
the code and spacing tokens, not measured.

---

## 1. The short verdict

LiveWell has far more finished writing than a reader can see, and the essays,
which are the front of the house, are the thinnest part of it.

The Grow build-out left roughly 3.4 million words of structured content in
`client/public/`: 40 Find Help care pages, 29 eight-week plans, 68 group study
guides, 69 Everyday Life guides, 208 wisdom topics, 132 how-tos, 41 context
guides, 22 church history essays, 13 Christ and the Nation pages, the family
devotions and catechism, and the Study Bible underneath all of it. Most of it
is careful, integrity-swept, and pastorally sound. The newest layer (care
pages, plans, workbooks) is the closest thing on the site to James's mature
register.

The essay shelf, by contrast, shows 15 essays. All 15 are the original
database bodies, 12 to 27 minutes long, mostly book chapters and Substack
pieces in the older register (fragment stacks, anaphora, em-dashes) that
`VOICE-JAMES-BELL.md` now ranks below the mature voice. The other 43 shelf
essays are "pending" and answer with a takedown notice, because the 52
rewrites were lost in the container reset and `client/public/essays/` is
empty. Three of the eight shelf sections (The American Church, Doubt and Hard
Questions, Marriage and Family) have nothing public, so they do not appear on
/writing at all. The skeptic, the reader the whole site is written toward, has
no public essay in the Doubt section.

The loss reaches further than the shelf. A large part of the site's
connective tissue was built to lead into essays that are now off the site: 90
small-group discussion guides (none for a live essay), 35 Honest Answers (none
links to a public essay), the 13 topic pathways (47 of their 48 essay steps
are off the shelf), the reading paths, the Skeptic's Track, and four study
guides that say they "walk slowly through five essays by James Bell." Each of
these fails quietly and correctly (the shelf guards drop the dead links), but
a reader meets a ladder with its middle rungs missing.

So the plan has three jobs, in this order: redo the essays to the pilots'
standard and reconnect what was built to point at them; give the large
libraries one clear door each and fold the duplicates; and make the essay page
itself pull a reader into the first paragraph and onward into the study tools.
The detail follows.

---

## 2. Where each library is reached from the five doors

The header has Study, Essays, Books, Resources, About, plus Find Help, search,
and Subscribe (`client/src/lib/siteNav.ts`). "Header" below means a header
link; "hub" means a link on /study or /resources; "footer" means only the
footer list; "side door" means reachable only from other content (a care page
kit, a tool, a folded page) or from search.

| Library | Count | Route | How a reader gets there | Reach |
|---|---|---|---|---|
| Essay shelf | 58 listed; 15 public | /writing, /writing/:slug | Header (Essays), Home (the three "start with" essays) | Strong door, thin shelf |
| Find Help care pages | 40 | /help, /help/:slug | Header utility on every page, Home, Resources | Strong |
| Eight-week plans | 29 | /plans, /plans/:slug | Resources hub, /help foot, care pages | Good |
| Group study guides | 68 | /studyguides/:slug | Header (Study), Study hub, care page kits | Good |
| Church history | page + 22 essays | /theology/history, /theology/history/:slug | Header (Study), Study hub | Good |
| Context guides | 41 | /resources/context/:slug | Header (Study), Study hub, ToolsHub | Good |
| Creeds and confessions | 14 | /resources/creeds/:slug | Header (Study), Study hub | Good |
| Study Bible | 66 books, 1,189 chapters, 62 doctrines, 24 guides | /study/bible/... | Header (Study), Home | Strong |
| Family (devotions, catechism, plans) | 72 weekly + 40 seasonal, 76 Q&A, 4 plans | /family/... | Resources hub, footer | Fair (see family inventory) |
| Honest Answers | 35 | /answers | Footer (under Essays), Family, Assessments | Weak |
| How-to guides | 132 | /how-tos/:slug | Footer only, care kits, search | Weak |
| Everyday Life guides | 69 | /life/:slug | No hub or footer link; ToolsHub (assessment), /how-tos, /wisdom, care kits, search | Side door |
| Wisdom topics | 208 | /wisdom/:id | ToolsHub, Wisdom Finder, care kits; not in site search | Side door |
| Topic pathways | 13 | /pathways/:slug (index redirects to /writing) | Care kits, LifeIndex, Nation pages | Side door, mostly hollow |
| Reading paths, Skeptic's Track | 3 sources | /reading-paths/:slug, /skeptic-track | Essay end panel; track gated off (`SKEPTIC_TRACK_LIVE` false) | Hollow |
| Christ and the Nation | 11 essays + scorecard + policy | /nation/... | ToolsHub (scorecard, policy), justice timeline; out of nav by decision | Side door |
| FAQ pages | 10 | /faq/:slug | Sitemap only; every linking page has been folded | Orphaned |
| Compare pages | 6 | /compare/:slug | /theology/compare (itself barely linked), sitemap | Orphaned |
| Crisis landings | 6 | /grief, /faith-crisis, /marriage-crisis, /parenting-help, /deconstruction, /church-hurt | Mostly none; two from the Start Here diagnostic | Orphaned, duplicates of care pages |
| Theology reference | 31 doctrines, 112 questions, 114 glossary terms | /theology/doctrine, /theology/questions, /theology/glossary | Study hub (glossary, search), history page, Answers | Fair |
| Small-group discussion guides | 90 | /group-guide/:slug | Only from an essay that has one; no live essay has one | Unreachable |
| Workbooks | 2 | PDFs only | /downloads | Fair |

Site search (/search, rebuilt in #534) now covers the context guides, Everyday
Life, how-tos, study guides, history essays, creeds, care pages, plans, tools,
and the database essays. It does not cover the 208 wisdom topics, Christ and
the Nation, Honest Answers, the FAQ and compare pages, the family devotions
and catechism, or the pathways. It searches an essay's database text, so once
a rewrite is live, search will match and excerpt the old words, not the new.

The pattern worth naming: the two largest prose libraries (Everyday Life at
about 400,000 words and the wisdom topics) and the pages written for "the
normal everyday common language things people are actually searching for"
(the FAQ pages, Honest Answers) are the ones with no door. James asked for
exactly that kind of material on 2026-10-12, and much of it already exists.

---

## 3. The essay shelf

### What it is

`client/src/lib/shelf.json` is the one list of public essays: 58 entries in
eight sections, each "live" (the database body is public) or "pending"
(public only when `client/public/essays/<slug>.json` exists). Everything else
in the database (959 published rows in production) is retired: noindex, out
of every listing, its URL answered by a short notice. Posts published through
the admin after 2026-10-13 appear on their own as "Latest"; there are none
yet. `ArticleDetail.tsx` renders the rewrite when one exists, otherwise the
database body through `normalizeEssayBody`, which repairs the Substack
import's broken structure without changing a word.

| Section | Live | Pending | Shows on /writing |
|---|---|---|---|
| The Mirror | 6 | 0 | yes |
| Faith and Power | 4 | 4 | yes |
| After Christendom | 1 | 5 | yes |
| The American Church | 0 | 6 | no |
| The Ancient Church | 1 | 8 | yes |
| Reading the Bible in Its World | 3 | 6 | yes |
| Doubt and Hard Questions | 0 | 9 | no |
| Marriage, Family and Ordinary Faithfulness | 0 | 5 | no |
| **Total** | **15** | **43** | |

`ESSAY_OVERRIDES` in `essayOverrides.generated.ts` is empty. Every pending URL
today shows "James is revising this essay. It is off the site until the new
version is ready."

### The fifteen live essays

Production reading times run from 12 to 27 minutes (about 20 on average);
thirteen were published on 2026-06-09, `strongman-theology` on 2026-07-07, and
`women-in-church-history` on 2026-07-08. None has a cover image (the
production posts table has no such column), so every one opens on generated
art. The "Start with these" row, which is also the Home page's essay row, is
13 + 20 + 26 minutes of reading.

Read in full, they fall into two kinds.

The June chapters (`every-generation-was-sure-it-was`, the blind-spot essays,
the fear essays, the nationalism and empire essays) are James's own book and
Substack material in the older register: one-line paragraphs stacked for
effect, "Not X. Not Y." runs, closing anaphora, frequent em-dashes. They are
vivid and his. They are also exactly the gait `VOICE-JAMES-BELL.md` now asks
to keep for genuine hinges only. Two particulars matter for the shelf:

- `every-generation-was-sure-it-was`, the first essay a new reader is told to
  start with, is the introduction to *The Monster in the Mirror*. It says
  "This is what this book is about," "This book is going to ask you," and
  "That is what this book is for." On an essay shelf that reads as an excerpt
  that forgot to say so. Its Scripture is in NIV wording, unlabeled (Matthew
  15:9 "merely human rules"; Revelation 3:17 "wretched, pitiful, poor, blind
  and naked"), against the ESV default, and Matthew 23:15 is quoted with no
  reference.
- `when-the-church-married-empire` (3,961 words, 55 em-dashes once the
  import's `---` is rendered) covers Constantine, Theodosius, the medieval
  settlement, the Reformation, and America. It ends on a run of resolution
  lines ("We do not need Constantine's bargain. / We need the Spirit of the
  living God."), and it claims the church "conquered the most powerful empire
  in history without a single political alliance," which a careful reader will
  stop on.

The July imports read differently: smoother, fuller paragraphs, but with
first-person lines nobody has confirmed. `women-in-church-history` says "I did
not learn her name in seminary" and that Phoebe Palmer's Holiness movement
"is one of the streams that flows down into the church I now pastor" (James
pastors a Baptist church), and "every history I have taught." None of these is
in `docs/grow/integrity/library-flags.md`. They should go to James with the
other first-person lines.

The shelf blurbs (`shelf.json`) need a light pass: several are body sentences
cut mid-thought with no closing period (`blind-spots`, `the-conservative-blind-spot`,
`when-fear-becomes-theology`), and three carry em-dashes.

**Decision for James:** whether the fifteen live essays stay as his signed
originals beside the new register, or get the same edit the rewrites get. If
they stay, two smaller moves still help: replace `every-generation-was-sure-it-was`
in "Start with these" with a piece written as an essay (the pilot *What
"Post-Christian" Actually Means* is the natural front door to the mission),
and label book chapters as such ("From *The Monster in the Mirror*, chapter 1").

### The five approved pilots and the redo

`docs/work/essays/` holds the five pilots James approved on 2026-10-14:
*When the Church Had Nothing to Lose* (`the-early-church-under-rome`, 4,121
words), *Was America Founded as a Christian Nation?* (3,894), *What Christian
Nationalism Is, and What It Is Not* (3,488), *What "Post-Christian" Actually
Means* (4,142), and *Why Didn't the Bible Just Ban Slavery?* (3,537). They are
the best essays the site has: concrete dates, primary sources, a voiced
objection with a real concession, Baptist self-implication where it is true,
and endings that land on weight. Measured, they average 99-word paragraphs,
18.7-word sentences, 22% of sentences at eight words or fewer, and contractions
at about 9 per thousand words: the target gait.

What remains to bring them to the site:

- 79 em-dashes to remove (23, 14, 17, 12, 13), per the no-em-dash rule in
  `docs/work/NOTES.md`.
- Two pilots have no shelf entry yet: `what-post-christian-means` (After
  Christendom) and `was-america-founded-as-a-christian-nation` (Faith and
  Power, or The American Church).
- Conversion to `client/public/essays/<slug>.json` and
  `node scripts/build-essays-index.mjs`.

The redo itself, from `docs/work/NOTES.md`: 52 essays were written; 5
survive. That leaves 47: the 40 pending shelf essays that were not pilots,
plus seven new ones (`baptists-and-the-wall-of-separation`,
`what-romans-13-says`, `who-decided-what-books-are-in-the-bible`,
`is-it-wrong-to-love-your-country`, `end-times-israel-and-american-politics`,
`the-children-rome-threw-away`, `did-christianity-copy-pagan-myths`). Three
are held for James's position (`women-and-leadership-church`,
`what-the-bible-says-about-submission`, `how-to-read-genesis-one`), and a
"raising sons in a post-Christian country" essay waits on his own story. The
titles the writers chose and the old slugs each rewrite absorbs (about 60, to
301 once live) are recorded in NOTES and should be reused.

### What the rewrites will switch back on

Each pending essay that goes live re-lights things that were built for it.
These need checking against the new text, not just re-enabling, because they
were written against the old essays:

| Built for the essay | Keyed to pending | Keyed to retired | Live today |
|---|---|---|---|
| Small-group discussion guides (`client/src/data/discussion-guides.ts`) | 11 | 79 | 0 |
| Honest Answers (`client/src/data/answers.ts`, "compressions of the source essay") | 6 | 29 | 0 |
| Study guide sessions (`essaySlug`) | 4 | 25 | 0 |
| Post-Christian reading paths (`reading-paths-post-christian.ts`) | 7 | 59 | 0 |
| Reading paths (`lib/readingPaths.ts`) | 3 | 48 | 1 |
| Skeptic's Track stops | 3 | 4 | 0 |
| Topic pathway essay steps | (mixed) | 47 of 48 off the shelf | 1 |

Two consequences. First, Honest Answers promises "no claim, citation, or verse
appears here that is not in the essay"; when an essay is rewritten, its answer
has to be re-derived from the new text. Second, the discussion guides for the
eleven pending essays (Anabaptists, American Christianity, the nones,
prosperity, the Religious Right, suffering, the historical Jesus, goodness
without God, genocide, slavery, Genesis 1) will show "Use this with your small
group" the day the rewrite ships; each needs a read against the rewrite first.

Four study guides tell the reader they walk through five James Bell essays
that are not on the site: `christian-nationalism`, `church-and-empire`,
`economic-justice`, `pastoral-health`. Either point their sessions at the
rewrites (Christian nationalism and Church and Empire map well onto the pilots
and pending essays) or change the summary sentence.

---

## 4. The libraries, one by one

Word counts are of the reader-facing prose in each file. "Voice" is a reading
against `VOICE-JAMES-BELL.md`, supported by the numbers in section 5.

### Find Help care pages: `client/public/needs/` (40), /help/:slug

Forty pages titled in the reader's own words ("I can't stop worrying," "Politics
is tearing my family apart," "I don't believe, but I'm curious"), each about
5,300 words: a short answer, what is happening, why it is hard (with history
and Scripture), steps for this week, more help, helping someone else, a
prayer, a kit of other resources, FAQ, sources, and a `reviewed` record. Each
carries `askedAs` phrasings that search now uses. Fifteen are marked high
sensitivity.

Voice: the closest library to the mature register. Contractions run at 28 per
thousand words, "Not X. Y." almost never appears, the history is real
(*Letter to Diognetus*, 312), and the tone is pastoral without diagnosing.
Depth: high. These are the strongest pages on the site for the seeker and the
hurting reader, and the kit on each page is already the best cross-format
index the site has (a self-check, study guides, Everyday Life, wisdom,
pathways, context guides). Treat the care page as the canonical home for each
need (section 6).

### Eight-week plans: `client/public/plans/` (29), /plans/:slug

Each plan has an intro, a care note, and eight weeks of focus, why, practice,
one reading, one tool, and a reflection question, about 2,500 words. The
skeptic plan ("Eight Weeks of Reading Like an Adult") sends the reader through
Mark in the Study Bible: the cleanest example on the site of practical help
leading into the study tools. Voice mature; depth appropriate. Prints as
booklets. Keep as is.

### Group study guides: `client/public/studyguides/` (68), /studyguides/:slug

Five sessions each (six for the Sermon on the Mount), with a leader primer,
timing, discussion questions with "the answer behind" each, objections and
responses, case studies, devotionals, glossary, bibliography, a promo kit:
about 24,000 words per guide and 1.6 million words in all. Themes: family 12,
belief 10, practice 10, inner life 8, hard seasons 7, church and world 6,
doubt 6, work and money 6, leaders 2, youth 1.

Voice: the older gait, consistently. Sentences average 21 words, contractions
are rare (4 per thousand), and "Not X. Y." runs at more than twice the
pilots' rate. The integrity sweep (`docs/grow/integrity/ledger-study-guides.md`)
already generalized or cut 1,163 invented first-person lines. Depth: very
high, perhaps more than a volunteer leader can use; the leader material is
excellent. Defects: three guides titled "An 8-Week Study" have five sessions
(`christian-nationalism`, `church-and-empire`, `economic-justice`); four guides
promise essays that are off the site (above). Gap: there is no church history
study guide, and James's 2026-10-14 direction puts church history at the
center.

### Small-group discussion guides: `client/src/data/discussion-guides.ts` (90), /group-guide/:slug

One-page guides (opening prayer, reflection, discussion, action, closing
prayer, read next) keyed to essay slugs. None is keyed to a live essay, so
the "Use this with your small group" link never appears on a public essay
today; 79 guides belong to retired essays and are reachable only by typing the
URL. This is the pastor-distribution asset the strategy names, and it is
idle. The redo should produce a discussion guide for every shelf essay, live
ones included.

### Everyday Life ("The Integrated Life"): `client/public/life/domains/` (69), /life/:slug

The largest prose library: 69 guides of about 5,700 words (397,000 words),
in seven groups (Home and Relationships 16, Integrated Vision 10, Seasons and
Crises 10, Inner Life 9, Life in the World 9, Work and Money 8, Body and
Rhythms 7). Each has eight parts (the real struggle, what it costs, the
theology, the church's history with it, secular knowledge tested against
Scripture, where faithful Christians differ, what it forms, practice) and at
least three cross-links, enforced by `validate-life.mjs`.

Voice: the older gait at its most pronounced (23-word sentences, 3
contractions per thousand words, "Not X. Y." at nearly three times the pilots'
rate, and signposting such as "Here is the symptom that should alarm us").
Depth: high and well structured. Reach: none of the five doors links to /life.
For many topics this is the deepest treatment on the site, and almost nobody
will find it. Either give it a door (as the "go deeper" layer under each care
page, and a line on /resources) or fold its best parts into the care pages and
essays.

### Wisdom topics: `client/public/wisdom/topics.json` (208), /wisdom/:id

Short topics (about 300 words: framing, cultural, historical, application,
five verses), stored once in `topics.json` and again split into 26 category
files. Fine as quick reference, and the Wisdom Finder tool uses them. Reached
only from the tools registry and care kits, and not in site search. Overlaps
almost every other library (section 6). Recommend making these the search
layer (add them to `LIBRARY_SOURCES`) rather than a destination of their own.

### How-to guides: `client/public/howtos/a/` (132), /how-tos/:slug

Eleven topics of twelve guides each, about 870 words, regenerated from
`scripts/articles/*.json`. The choppiest prose on the site: a third of
sentences are eight words or fewer, "Not X. Y." runs at six times the pilots'
rate, and the guides lean on first-person pastoral framing ("I want to be
honest with you about how hard this is before I say anything else," a near
neighbor of a forbidden phrase). Useful and practical; the register is the
furthest from James's. Reached from the footer and care kits. A voice pass is
worth more here than anywhere else per word, because these answer the plain
searches.

### Topic pathways: `client/public/pathways/` (13), /pathways/:slug

Short guided routes (about 270 words of framing, three movements). Of their
48 essay steps, 47 are off the shelf, so each pathway shows two to four
non-essay steps or the "nothing here yet" line. The /pathways index redirects
to /writing. The framing prose carries em-dashes at 14 per thousand words, and
`client/public/pathways` is outside the no-em-dash validator's scope. These
are better rebuilt after the redo as "reading orders" over the new shelf, or
retired in favor of the care page kits.

### Reading paths and the Skeptic's Track

Three overlapping sources (`client/public/reading-paths/index.json`,
`client/src/lib/readingPaths.ts`, `client/src/data/reading-paths-post-christian.ts`)
drive /reading-paths/:slug and the "next in this path" panel at the foot of an
essay. Almost all of their steps are retired essays. The Skeptic's Track
(`client/src/lib/skepticTrack.ts`, seven stops) is honestly gated off until
every stop is public; three of its stops are pending rewrites, four are
retired. After the redo, one reading-order source should replace the three,
and the Skeptic's Track should be re-pointed at the Doubt section's rewrites
so it can switch on.

### Honest Answers: `client/src/data/answers.ts` (35), /answers

Thirty-five real questions ("Did the resurrection actually happen?", "Why
didn't the Bible just ban slavery?", "What makes us human in the age of AI?"),
three paragraphs each, designed as a ladder: short answer, then the essay,
then the book. The essay rung is missing for all 35 today. This is the best
existing front door for the skeptic and for plain-language search, and it sits
in the footer. After the redo, re-derive the six whose essays are pending and
re-point the rest at the new Doubt essays, then give /answers a real place
(the Essays door, or the top of /writing as "Hard questions, short answers").

### FAQ, compare, and crisis landing pages

Ten FAQ pages (about 2,700 words each: does God exist, is the Bible
historically accurate, what is deconstruction, why young people leave church,
and others), six denominational comparisons, and six crisis landings
(/grief, /faith-crisis, /marriage-crisis, /parenting-help, /deconstruction,
/church-hurt). All are live routes and in the sitemap, and almost nothing
links to them, because the pages that did (/faq, /doubt, /honest-questions,
/theology) were folded on 2026-10-12. The crisis landings duplicate care pages
(/help/grief, /help/marriage, /help/deconstructing, /help/church-hurt) and
should become one-hop redirects to them. The FAQ and compare pages answer
searches people type; fold each into the nearest Honest Answer or study page,
or link them from /answers and /theology/traditions.

### Christ and the Nation: `client/public/nation/` (13), /nation

Eleven essays (about 2,000 words) plus the party scorecard and the policy
explorer. Out of the header by decision; reached from the tools registry
and the justice timeline. Voice: older gait, "Not X. Y." near the top of the
range. The essays now duplicate the essay shelf directly:

| /nation page | Shelf essay covering the same question |
|---|---|
| christian-nation, "Was America Founded as a Christian Nation?" | pilot `was-america-founded-as-a-christian-nation` (same title) |
| christian-nationalism | pilot `what-christian-nationalism-is-and-is-not` |
| render | pending `what-render-unto-caesar-actually-means` |
| empire, power-and-church | live `when-the-church-married-empire`; pilot `the-early-church-under-rome` |
| progressive-captivity | live `the-progressive-blind-spot` |
| nationalism-history | pending `how-american-christianity-became-american`, `when-politics-replaced-theology` |

Two public pages with the same title will compete in search and split
readers. When the rewrites land, the shelf essay should be the canonical
answer and the /nation essay should redirect to it, leaving /nation as the
home of the two interactive tools (if James keeps them; the scorecard asks for
the most care under the "criticize right and left with the same instrument"
rule).

### Church history: /theology/history and `client/public/history/` (22 essays)

The history page draws on four reference files (7 eras with 68 events, 11
councils, 10 heresies, 36 figures, two of them women) and lists 22 history
essays. The figures run from Ignatius to C.S. Lewis with no one from the
Black church and no one from the majority world after Augustine. The essays come in two overlapping series: fourteen period essays
(apostolic age through the global church) and eight survey essays (Ancient,
Medieval, Reformation, Modern, the American experiment, the attractional era,
after Christendom), so the Reformation, the councils, and the early church
are each covered twice. Median length is about 1,900 words. Voice: the closest
of the older libraries to the pilots (long paragraphs, contractions present),
but with em-dashes at 3.5 per thousand words, outside the validator's scope.
Related surfaces: the justice timeline, two witnesses pages, the creeds, the
Study Bible's story and guides, the `the-creeds` and `church-and-empire` study
guides, and eight pending Ancient Church essays.

Against James's 2026-10-14 direction ("double the church history study... the
best church history study available... very interactive"), this is the
largest gap between what he asked for and what exists. The design was lost,
but the judges' consensus survives in `docs/work/NOTES.md` (a primary-source
backbone, 32 to 36 course sessions, a connected registry of people, events,
places, and councils). The pilot *When the Church Had Nothing to Lose* already
reads like a session of that course and should be its first one.

### Context guides: `client/public/context/` (41), /resources/context/:slug

Seven groups: the verses everyone quotes (10), reading past our politics (6),
Ancient Near East (5), honor and shame (5), Second Temple Judaism (5), the
Greco-Roman world (5), the hard questions (5). About 1,100 words each,
integrity-swept (`ledger-context-guides.md`), each with a printable. Choppier
than the pilots (30% short sentences) but clear. These are the natural
"read this verse in its world" link from any essay that quotes a contested
verse, and nothing in an essay links to them yet.

### Creeds, theology reference, and the Study Bible

Fourteen creeds and confessions with plain-language notes; 31 doctrine pages,
112 theology questions, and 114 glossary terms under /theology; and the Study
Bible (66 book introductions, notes on all 1,189 chapters in the Berean
Standard Bible, 62 doctrine studies, 24 reading guides, the story in eleven
acts, verse notes for Genesis and the Gospels). Out of scope for depth here
beyond one overlap: the 62 Study Bible doctrine studies and the 31 /theology
doctrine pages cover the same ground in two places. And one opportunity: no
essay links a Scripture reference to its Study Bible chapter, though
`components/ScriptureRef.tsx` already turns a reference into a link (today to
the Passage Context tool) and is used only on doctrine pages.

### Family

Seventy-two weekly devotions, 40 seasonal (Advent 25, Holy Week 8,
Thanksgiving 7, the last added in #534), a 76-question catechism, four
reading plans, and the Family Devotion Builder; Scripture in the BSB, gated
by `validate-family.mjs`. See `inventory-family.md`. One meeting point with
this inventory: the Family hub's "For teenagers: why we believe" section
pulls public essays whose slugs start with `teen-`; all are retired, so it
falls back to a link to /answers, which itself has no essays behind it.

### Workbooks: `client/public/workbooks/` (2)

*Before You Marry* (eight sessions) and *A Weekend for Two*, printed as PDFs
from /downloads. Mature voice. No web page of their own.

### Not reader-facing

`client/src/data/*-articles*.ts` (post-Christian, doubt, marriage, manhood,
parenting, womanhood, money) and `devotionals*.ts` are imported by no page
and are seed or dead data. Worth knowing before anyone writes new material on
those subjects, since the drafts may be reusable.

---

## 5. Voice and depth, measured

Regex heuristics over each library's prose paragraphs (25 words or more),
against the five approved pilots. "Short" is the share of sentences of eight
words or fewer; "Not X. Y." counts the ground-clearing pattern per thousand
words; contractions and em-dashes are per thousand words.

| Library | Words | Para avg | Sentence avg | Short | Contractions | "Not X. Y." | Em-dash |
|---|---|---|---|---|---|---|---|
| **Pilots (target)** | 19,700 | 99 | 18.7 | 22% | 9.2 | 0.51 | 4.7 (to remove) |
| Care pages | 174,600 | 87 | 18.7 | 17% | 27.7 | 0.06 | 0.1 |
| Plans | 60,000 | 95 | 20.2 | 12% | 22.0 | 0.03 | 0 |
| Workbooks | 12,300 | 72 | 17.7 | 17% | 28.6 | 0.16 | 0.5 |
| History essays | 53,600 | 113 | 19.4 | 24% | 7.9 | 0.88 | 3.5 |
| Study guides | 1,518,400 | 101 | 21.1 | 20% | 4.2 | 1.19 | 0 |
| Everyday Life | 384,500 | 102 | 23.1 | 17% | 3.0 | 1.39 | 0 |
| Wisdom topics | 71,200 | 56 | 22.2 | 8% | 3.6 | 0.66 | 0.7 |
| Context guides | 47,200 | 71 | 15.0 | 30% | 10.0 | 1.87 | 0 |
| Christ and the Nation | 27,200 | 88 | 16.9 | 23% | 2.9 | 2.83 | 0 |
| How-tos | 110,600 | 67 | 13.6 | 34% | 3.9 | 3.17 | 0 |
| Pathways | 1,200 | 29 | 19.6 | 18% | 0.8 | 0.82 | 14.0 |

Read with the samples, the numbers sort the libraries into three registers.
The care pages, plans, and workbooks (the last layer #521 wrote) sound like
the mature James: spoken, unhurried, contractions natural. The study guides,
Everyday Life, wisdom, and history essays sound like the earlier platform
voice: long, formal sentences, antithesis used as a gait. The how-tos, the
nation essays, and to a lesser degree the context guides lean on fragment
stacks and "Not X. Y." most heavily. The live shelf essays belong with the
earlier voice, and the June chapters push its devices furthest.

The Forbidden Language validator (`validate-grow-voice.mjs`) is clean across
381 Grow files, and `validate-no-emdash.mjs` is clean across its 231. Their
scopes leave out the essay rewrites (`client/public/essays/`), the history
essays, Christ and the Nation, the context guides, the theology reference,
family, and the pathways (em-dash only). Two forbidden-phrase hits sit in
that gap: "So keep showing up" in `theology/questions.json` and "showing up
for the long, local, repetitive work" in `nation/render.json`. No validator
covers essay overrides at all; one should exist before the first rewrite
ships (shape, Forbidden Language, no em-dash, no exclamation outside quoted
Scripture, links only to public pages, Scripture references present).

Recommendation on voice work: do not try to re-voice 1.6 million words of
study guides. Rewrite the essays to the pilots, voice-pass the how-tos (small
and most searched), and let the care pages set the register for everything new.

---

## 6. Overlap, and a home for each subject

Counting titles and slugs by subject across the libraries shows the same
subject in six to nine formats:

| Subject | Care | Plan | Study | Pathway | Life | Wisdom | How-to | Context | Answers | Shelf |
|---|---|---|---|---|---|---|---|---|---|---|
| Anxiety and worry | 2 | 1 | 1 | 1 | 1 | 2 | 2 | 0 | 2 | 0 |
| Grief and loss | 2 | 2 | 1 | 1 | 2 | 5 | 3 | 1 | 0 | 1 |
| Marriage | 3 | 1 | 2 | 1 | 3 | 6 | 13 | 0 | 1 | 3 |
| Parenting and family | 6 | 2 | 6 | 2 | 7 | 12 | 24 | 0 | 1 | 1 |
| Doubt and deconstruction | 3 | 3 | 3 | 1 | 0 | 2 | 2 | 0 | 1 | 1 |
| Politics and nationalism | 1 | 0 | 3 | 1 | 1 | 2 | 2 | 6 | 1 | 6 |
| Money and work | 3 | 4 | 3 | 2 | 7 | 11 | 9 | 1 | 1 | 0 |
| Prayer | 2 | 1 | 4 | 1 | 2 | 1 | 6 | 0 | 0 | 0 |
| Suffering | 1 | 1 | 3 | 1 | 2 | 3 | 2 | 0 | 2 | 1 |

(Keyword match on titles and slugs, so approximate; tools and the 13 /nation
pages are not counted.)

Some of this is right: a short answer, a deep guide, an eight-week plan, and a
group study are different things for different moments. The trouble is that
a reader cannot tell which to open, and several pairs are true duplicates.
The clusters, with a suggested home for each:

1. **Each life need: the care page is the door.** It already assembles the
   other formats in its kit. Make the kit the site's answer to "where do I
   go deeper": care page, then the plan, then the study guide, then the
   Everyday Life guide and the essay. Wisdom topics become search results and
   kit entries rather than a second destination. The six crisis landings
   redirect to their care pages.
2. **Christian nationalism and politics: the essay shelf's Faith and Power
   section is the home.** The /nation essays redirect into the rewrites; the
   pathways `christian-nationalism` and `progressive-captivity` become reading
   orders over the shelf; the study guides `christian-nationalism`,
   `the-captive-church`, and `church-and-empire` point their sessions at the
   rewritten essays; the "Reading Past Our Politics" context guides are linked
   from the essays that quote those verses.
3. **Church history: /theology/history is the home**, and the Ancient Church
   essays, the history essays, the timeline, councils, figures, witnesses,
   and creeds hang from it as one course. The two history essay series should
   merge into one sequence. The pilot on the early church is the natural first
   session.
4. **Hard questions: /answers is the door**, laddering into the Doubt essays,
   the FAQ pages, the skeptic study guide, Test the Case, and the curious and
   doubt care pages.
5. **Doctrine: the Study Bible is the home.** The 31 /theology doctrine pages
   and the 62 Study Bible doctrine studies should resolve to one (the Decision
   Log already says the Study Bible replaces the /theology pages; the doctrine
   pages remain unredirected by design, so this is James's call).
6. **The how-to library and Everyday Life** each need either a door on
   /resources or absorption into the care pages. Both are too large to leave
   as side doors.

---

## 7. The article page, read as a reader

### What an essay page has today (after #534)

Top to bottom on `/writing/:slug`: an "All essays" back link; the section
kicker, title, italic standfirst, a mustard rule, byline, minutes, and date;
the "Take it with you" bar (save to My Library, send to my phone, email,
print); generated art (no essay has a cover); the reading tools (Listen in the
device's own voice, text size, Focus); an "In this essay" contents card,
open by default when the essay has three or more sections; the body with a
drop cap, where every blockquote becomes a pull-quote with its own "Share this
quote" button, and highlighting text on a desktop offers "Share quote"; then
save and send again, cite, send to a skeptic, a pastor, or a spouse, and the
small-group guide link where one exists; the book that carries the argument or
the next essay on a reading path; four related essays from the same section;
the newsletter; the author bio; the end-of-page links. A sentinel at the foot of the
body records a finished read, and /writing marks finished and saved essays
on this device. Print is clean.

That is a lot of good, calm machinery, much of it new this week. What it
lacks is mostly about getting a reader into the text, keeping them oriented
inside a twenty-minute argument, and sending them from the essay into the
study tools and the people they read with.

### The first screen on a phone

Computed from the spacing tokens and a 390-pixel phone (not measured; worth
confirming on a preview): the site header, back link, kicker, a four-line
title, a three-line standfirst, the meta row, the Take it with you bar, the
16:9 generated art, the reading tools, and an open contents card with seven
entries put the first sentence of `every-generation-was-sure-it-was` about
1,500 pixels down, nearly two full phone screens. A reader who taps in from a
text message sees chrome and art, then more chrome, before a single sentence
of James's.

### What would make the essays more engaging, in order of value

Each of these stays inside the brand contract: calm, single column, cream
room, mustard as punctuation, no popups, nothing that moves on its own.

1. **Let the first screen reach the first sentence.** Close the contents card
   by default on phones (keep it open on desktop), shrink the reading tools to
   one row, and move the generated art below the opening section or drop it
   for essays without a real cover. Goal: the opening paragraph and drop cap
   visible on the first phone screen.
2. **Turn Scripture references into doors to the Study Bible.** Essays quote
   Scripture with the reference beside it (the pilots do this throughout).
   Rendering "(Leviticus 25:44-46)" as a quiet link to
   `/study/bible/leviticus/25`, with its chapter notes and the Hebrew beneath
   it, is the single change that makes every essay a study tool and joins the
   Essays door to the Study door. Link to the chapter rather than previewing
   verse text inline, because the essays quote the ESV and the Study Bible is
   the BSB.
3. **Separate quotation from pull-quote.** Today every blockquote gets a share
   button, so the Leviticus passage in the slavery essay and every one-line
   epigraph in the June chapters (about a dozen in `every-generation-was-sure-it-was`)
   become share cards. The voice standard allows one standalone pull-quote at
   a genuine hinge. Render block Scripture as Scripture (with its reference
   and the Study Bible link), and reserve the share treatment for one or two
   lines the essay marks as pull-quotes.
4. **Questions at the end of every essay, and a group guide behind them.**
   Add an optional `questions` field (three to five) to the essay JSON and
   render a quiet "To think about, or talk about" block after the body, with
   "Use this with your small group" leading to the full guide. Today none of
   the 15 public essays has a group guide. This serves the pastor reader
   directly and the Formation Test indirectly.
5. **Sources and key terms.** An optional `sources` field rendered as a
   short "Sources" list (the books and primary texts the essay names: Pliny
   and Trajan, Taylor's *A Secular Age*, Noll's *The Civil War as a
   Theological Crisis*) gives the skeptic something to check, which is the
   trust the Scholarship Standard is after. Technical terms that have an entry
   among the 114 glossary terms can link to it on first use.
6. **Keep the reader oriented in a long argument.** Scope the progress bar to
   the essay body (today it measures the whole page, footer included, so it
   is well short of full at the last paragraph), show minutes left beside it, and
   remember the reader's place on this device so a 20-minute essay can be
   finished on a second visit ("Pick up where you left off" on /writing and
   Home, using the storage helper). A slim heading line that names the current
   section as the reader scrolls would help on long essays, without breaking
   the single column.
7. **Related reading across formats, chosen by hand.** RelatedEssays offers
   four essays from the same section; ArticleNextSteps offers reading paths
   that are mostly empty. Add a curated `related` field (two to four links,
   validated) that can point anywhere: the slavery essay to the slavery-texts
   context guide, the Honest Answer, and the skeptic study guide; the early
   church essay to the history course and the creeds. That is the ladder the
   site already half-built.
8. **Series order.** The shelf sections are ordered lists already. Show "Essay
   2 of 6 in The Mirror" in the kicker and a plain "Next in this section" at
   the foot, so the shelf reads like a book's contents and not a pile.
9. **An honest date.** For a rewrite, show "Revised October 2026" from the
   file's `updated` field; today the page shows the database's original
   publish date.
10. **A way to answer back.** "Write to James about this essay" (the contact
    form with the essay's title filled in) matches the success measure in
    CLAUDE.md ("An email that argues with the piece") without opening public
    comments, which the site has a table for but no reader-facing use.
11. **James's own voice, recorded.** Listen already reads every essay with the
    device's voice. A recording by James of the three "start with" essays and
    the pilots would be the strongest engagement upgrade available and needs
    only his time. Optional, and his call.
12. **One quiet question before the essay, where it fits.** For the history
    and hard-question essays, a single "What do you think now?" choice before
    reading, shown again at the end and kept only on this device (no scores,
    no sharing). It matches the "before-you-read myth check" the church history
    consensus asked for and makes the reading interactive without making it a
    game. Use sparingly.

Smaller items: the shelf blurbs need finishing (above); the /writing listing
downloads all 959 published rows (about 636 KB of JSON before compression) to
show 15 essays and could ask for the shelf slugs only (both runtimes); search
should index a rewrite's own text and excerpt rather than the database body;
and `validate-no-emdash.mjs` should add `client/public/essays` when the first
rewrite lands.

Things to avoid: streaks, badges, or completion percentages on the shelf;
inline verse previews that put a second translation beside the ESV quote; a
right rail; autoplaying audio; anything that interrupts the body between
sections (the newsletter belongs after the essay, where it is).

---

## 8. The essay redo: what has to happen, and in what order

1. Bring the five pilots onto the site: remove em-dashes, add the two missing
   shelf entries, write the JSON overrides, rebuild the index, and add the
   essay validator. Swap `every-generation-was-sure-it-was` out of "Start with
   these" for one of the pilots (James's call).
2. Redo the 44 essays that need no decision from James, section by section,
   so whole sections switch on together. Suggested order by what each section
   switches on: Doubt and Hard Questions (9; serves the skeptic, restores the
   essay rung for four Honest Answers, three Skeptic's Track stops, and four
   discussion guides, and gives the curious and doubt care pages essays to link),
   then Faith and Power and After Christendom (the mission's center; lets the
   /nation essays redirect), then The Ancient Church (the first sessions of
   the church history course), then The American Church, then Reading the
   Bible in Its World, then Marriage and Family.
3. With each section: re-derive the Honest Answers that cite it, read the
   matching discussion guides against the new text, re-point the study guide
   sessions and the Skeptic's Track, add the 301s for the old slugs each essay
   absorbs (listed in NOTES), and add the `questions`, `sources`, and
   `related` fields if the page work in section 7 has landed.
4. Bring the three held essays to James with the positions stated fairly and
   ask for his landing or his permission to publish open; ask for the
   raising-sons story.
5. After the shelf is whole: replace the three reading-path sources with one,
   rebuild the pathways as reading orders or retire them, and redirect the
   /nation essays.

---

## 9. Gaps against James's direction

- **Church history** (2026-10-14): no group study guide on it, 22 short
  history essays in two overlapping series, two women among 36 figures, one
  live Ancient Church essay. The largest gap.
- **Living in a post-Christian America** (2026-10-12, 2026-10-26): the After
  Christendom section shows one essay; the pilot that defines "post-Christian"
  is not yet on the shelf. The practical side is strong (care pages, plans);
  the essays that name the moment are missing.
- **Engaging articles** (2026-10-26): see section 7. The machinery exists;
  the first screen, the Scripture links, the questions, and the series order
  are what a reader would notice.
- **Family devotions that meet the post-Christian moment** (2026-10-26):
  see `inventory-family.md`.
- **"The things people are actually searching for"** (2026-10-12): much of it
  exists (FAQ pages, Honest Answers, care page `askedAs`) but is unlinked or
  unsearched. Subjects that appear to have no plain-language page: sexuality
  and gender questions from a parent or a young adult (only book pages exist),
  schooling choices and children in a secular school culture, and finding a
  church after moving or after hurt (a wisdom topic only). Worth checking
  against real search data before writing.

---

## 10. Questions for James

1. The fifteen live essays: keep them as your signed originals, or give them
   the same edit as the rewrites? Either way, may we move the book
   introduction out of "Start with these"?
2. The first-person lines in `women-in-church-history` (seminary, "the church I
   now pastor" in the Holiness stream, "every history I have taught"): true and
   yours, or generalize?
3. Christ and the Nation: when the rewrites cover the same questions, may the
   /nation essays redirect to them? Do the party scorecard and policy explorer
   stay?
4. The three contested essays (women in leadership, submission, Genesis 1):
   your position, or publish them open?
5. Would you record the "start with" essays in your own voice?

---

## Appendix: counts and sources

- Shelf: `client/src/lib/shelf.json` (58 entries: 15 live, 43 pending);
  `client/src/lib/essayOverrides.generated.ts` (0 rewrites);
  production `posts.listPublished` returned 959 rows, 0 after the cutoff.
- Pilots: `docs/work/essays/*.md` (5); decisions and titles in
  `docs/work/NOTES.md`; writing brief in `docs/work/essays/BRIEF.md`.
- Care pages `client/public/needs/` 40 (211,700 words); plans
  `client/public/plans/` 29 (73,100); study guides `client/public/studyguides/`
  68 (1.63 million); Everyday Life `client/public/life/domains/` 69 (396,900);
  wisdom `client/public/wisdom/topics.json` 208 (90,200 across the 26 category
  files); how-tos `client/public/howtos/a/` 132 (118,400); pathways 13;
  workbooks 2 (14,100); Christ and the Nation `client/public/nation/` 13
  (29,200); history essays `client/public/history/essays/` 22 (58,100);
  context guides 41 (51,700); creeds 14 (20,000); theology reference 51 files
  (31 doctrines, 112 questions, 114 glossary terms); family 72 weekly + 40
  seasonal devotions, 76 catechism questions, 4 reading plans; discussion
  guides 90 (`client/src/data/discussion-guides.ts`); Honest Answers 35
  (`client/src/data/answers.ts`).
- Page code read: `client/src/pages/Writing.tsx`, `ArticleDetail.tsx`,
  `components/RelatedEssays.tsx`, `ArticleNextSteps.tsx`, `KeepReadingBook.tsx`,
  `ListenButton.tsx`, `TakeItWithYou.tsx`, `ReadingProgressBar.tsx`,
  `RetiredEssayNotice.tsx`, `lib/html-body.ts`, `lib/shelf.ts`,
  `lib/siteNav.ts`, `lib/catalog.ts`, `pages/Search.tsx`, the Study, Resources,
  Home, Help, Family, ToolsHub, StudyGuide, GroupGuide, Answers, and
  TheologyHistory pages.
- Validators run: `node scripts/validate-grow-voice.mjs` (clean, 381 files);
  `node scripts/validate-no-emdash.mjs` (clean, 231 files). No build, test, or
  typecheck was run; nothing in the app was changed.
