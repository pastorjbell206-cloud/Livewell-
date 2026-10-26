# Inventory: Family and Formation

Prepared 2026-10-26 against `main` at `ba7aecd` (after #531 the simplified site,
#521 the Grow build-out, #533 the home paragraph). Read-only survey; nothing in
the site was changed. Counts were taken from the JSON libraries directly, and
`validate-family`, `validate-workbooks`, and `validate-plans` were run and pass.

The question this inventory serves is James's of 2026-10-26: family devotions,
tools, and topics that "truly help people live in a post-Christian nation."

---

## The short verdict

There is more household material on this site than a visitor would ever guess,
and most of it is sound. A year's worth of weekly devotions (72), a 76-question
catechism with an answer for adults and one for children, Advent and Holy Week
booklets, four family reading plans, a devotion builder with age bands, a
parent-and-teen conversation tool, six eight-week plans for the hard family
seasons, two couples' workbooks, 36 how-tos, about twenty deep Integrated Life
guides, and roughly a dozen group study guides all exist and validate.

Three things keep it from being what James asked for. First, almost none of it
is about living as a Christian household in a post-Christian America. The weekly
devotions are a good general virtues-and-doctrine set that could have shipped in
1995; the post-Christian subjects (exile, Christian nationalism, politics at the
table, the church's failures, the body and sexuality, being the only believing
family on the street) live only in adult essays, adult study guides, and care
pages, never at the table with children. Second, James himself is absent from
it: zero of 174 voice slots on the care pages are filled, all five essays in the
shelf's "Marriage, Family and Ordinary Faithfulness" section are still pending,
and no devotion is his. Third, it is hard to find and harder to use on a
Tuesday at 7:40 pm: family is the seventh link in the Resources menu, there is
no "tonight's devotion," no single-devotion URL, and the reading plans give a
reference with no text and no link to the site's own Study Bible.

---

## Where a family enters today

- **Home page** (`client/src/pages/Home.tsx`): three doors (Study the Bible,
  Essays, Books) and Find Help. No family door.
- **Header** (`client/src/lib/siteNav.ts:92`): "For families" is the last of
  seven links under Resources.
- **/resources** (`client/src/pages/Resources.tsx`): "For families" is the
  fourth and last group, four links.
- **/for-families** redirects to `/parenting`, not `/family`
  (`client/src/App.tsx:272`, `vercel.json:743`), so the old address lands on
  the older, thinner hub.
- **/tools** groups the household tools under "Family, marriage, and the
  household" (`client/src/pages/ToolsHub.tsx:260`).

---

## Inventory

Sizes are word counts of the JSON or rendered content. "Table test" is a
judgment of how usable the item is on a real weeknight at a kitchen table: open
on a phone, done in ten to fifteen minutes, with children of mixed ages.

### A. The household core (/family)

| Item | Route and source | Size | Who it serves | Table test | Voice and quality |
|---|---|---|---|---|---|
| Family hub | `/family`, `client/src/pages/Family.tsx` (289 lines) | Catechism card, first 12 devotions inline, reading-plans card, teen apologetics, parenting, marriage, tools | Parents generally | Good front porch; inline accordion devotions are usable | Hero copy is strong ("The faith is handed down on purpose, at the table, or it is not handed down at all"). Its essay rows (teen-, apologetics-, parenting-, marriage- posts) render empty because none of those posts is on the shelf; the teen section falls back to two cards. Links only 3 of the ~20 family Integrated Life guides. |
| Weekly family devotions | `/family/devotions`, `client/public/family-devotions.json` (12) + `family-devotions-2.json` (60) | 72 devotions, ~19,600 words; each a BSB passage, a one-line big idea, a 100 to 140 word reflection, three questions, an activity, a prayer | Mixed-age households, pitched at ages 6 to 11; activities work for little ones; thin for teens | High. Ten minutes, readable aloud straight off a phone, a real activity every time. Printable as table cards, two to a page (`/downloads/tools/family-cards-*.pdf`) | Warm, plain, clean of Forbidden Language, Scripture verbatim and validated. Competent house voice rather than James's; most entries could have been written by any careful Christian publisher. Topics are virtues and core doctrine; see Gaps. |
| Advent and Holy Week | `/family/devotions` tabs, `client/public/family-seasonal.json` | Advent 25 days (Dec 1 to 25), Holy Week 8 days; ~4,700 words; reflections 65 to 96 words, one question, a prayer | All ages | High; printable booklets, one day a page, BSB in full plus the child's paraphrase (`scripts/lib/help-printables.mjs:849`) | Good, especially Holy Week ("Let today feel heavy. It was."). On screen the passage is a paraphrase, correctly labelled. Advent starts Dec 1, but Advent 2026 begins Sunday Nov 29. Day 24 reads Luke 2:1-5 after days 20 and 21 have read Luke 2:6-11. |
| Family Catechism | `/family/catechism`, `client/public/family-catechism.json` | 76 questions in six parts, ~12,100 words; adult answer 17 to 72 words, child's answer 3 to 16 words, BSB verse, 45 to 90 word note for the parent, prayer | Parents of young children first; the "Hard Questions Children Ask" part (Q65 to 76) serves older children | Medium-high. "Mark learned" progress persists. No printable, no recite or flashcard mode, adult answers too long to memorize | Strongest family content in the set. The parent notes carry real pastoral weight (Q65 on suffering, Q33 on Jesus as Lord "in the hallway and the car too"). Defects below: duplicate questions, "this week" never reaches Q53 to 76, baptism handled two ways. |
| Family reading plans | `/family/reading-plans`, `client/public/family-reading-plans.json` | 4 plans, 111 days: Life of Jesus (30, all ages), Heroes and Promises (30, younger kids), Psalms for the Family (30, all ages), Foundations (21, families new to faith); prompts average 27 words | Families, including newcomers and returners | Medium. Each day is a reference and a prompt only; no passage text and no link to `/study/bible/:book/:chapter`, so a family needs a second app or a paper Bible. Progress persists. No printable. | Prompts are good conversation starters ("Ask why a doctor spends his time with sick people"). |
| Family Devotion Builder | `/tools/family-devotions`, `client/src/pages/tools/FamilyDevotionBuilder.tsx` (1,429 lines) | 10 themes x 4 age bands (3 to 6, 7 to 11, 12 to 18, mixed) = 40 devotions, inline in the component | The only family devotion content written separately for teens | High. Builds a 2 to 12 week term, marks weeks done, prints the whole term for the fridge | The teen bands are the best family writing on the site ("Your generation lives in an economy of curated images"). KJV, unlike every other family surface. Its ten themes overlap the 72 weekly devotions without sharing data. |

### B. Tools a household can use

| Item | Route and source | What it is | Who | Notes |
|---|---|---|---|---|
| Parent and Teen Conversation | `/tools/parent-teen-conversation` | Parent and teen each answer 12 statements on their own device, swap a short code, see where they see home differently, get questions to ask each other | Parents of teens | Well built and private (nothing stored or sent; a teen not safe at home is told where to go). No faith area: nothing on whether God, doubt, or church can be talked about at home. |
| Parenting Stage Guide | `/tools/parenting-guide` (893 lines) | Six stages, toddler to 18+: needs, how to talk about God, mistakes, one practice | Parents at every stage | Close to James's register ("Consistency here is not parenting technique. It is incarnation."). Stage ranges render as "Ages 1--3". |
| Parenting Bible Verses | `/tools/parenting-verses` | Topical verses with a note for the parent | Parents | Scripture marked `unverified`. |
| Marriage Health Self-Check | `/tools/marriage-assessment` (1,635 lines) | 15 questions, couple-compare mode, safety check, history | Couples | Among the most complete tools on the site. |
| Prayer Planner | `/tools/prayer-planner` | People and needs spread across the week, answered-prayer record | Works for a household praying together | Not framed for families; no "our family's list." |
| Scripture Memory | `/tools/scripture-memory` | Forty verses with practice modes; a "Parenting & Family" set | Adults | The family set is verses about parenting, not verses for children to learn. Text marked `unverified`. |
| Rule of Life Builder | `/tools/rule-of-life` | A personal weekly pattern | Individuals | No household rule of life, though the how-to on a family screen covenant points that way. |

### C. Care pages for family seasons (/help, `client/public/needs/`)

Each runs about 5,200 to 6,600 words with an answer, Scripture, why it is hard,
a this-week plan, when to get more help, a kit, an FAQ, help lines, and voice
slots for James. Each prints as a one-page guide, prayer cards, Scripture cards,
and a worksheet.

| Page | Title | Words | James slots (filled) |
|---|---|---|---|
| `family-devotions` | How do we do family devotions? | 6,621 | 7 (0) |
| `parenting` | Parenting is harder than anyone said | 6,113 | 5 (0) |
| `fatherless` | How do I be a dad when I never had one? | 5,753 | 5 (0) |
| `marriage` | My marriage is falling apart | 5,477 | 4 (0) |
| `divorce` | My marriage has ended | 6,448 | 4 (0) |
| `caregiving` | Caring for my parent is wearing me out | 5,664 | 4 (0) |
| `infertility` | We can't have children | 5,980 | 4 (0) |
| `dating` | Should we get married? | 6,046 | 5 (0) |
| `politics` | Politics is tearing my family apart | 5,400 | 4 (0) |

The family-devotions care page is the best single thing on the site for a
parent starting from nothing. It meets the single parent, the split-week
household, the believer married to an unbeliever, the adult convert with no
praying home to copy, and the parent wounded by devotions used as a weapon; it
steelmans the "indoctrination" objection; it gives both faithful positions on
requiring a teenager's presence (Joshua 24:15 and Ephesians 6:4) and lets the
reader decide; it gives the grandparent a role (2 Timothy 1:5) that asks the
parents first. Its seven slots, including "what family devotions actually look
like in James's home with five sons," are exactly where his voice would land.

### D. Eight-week plans (`client/public/plans/`, `/plans/:slug`)

Six serve family seasons, each eight weeks of focus, why, practice, a reading, a
tool, and a reflection question, about 2,500 to 2,800 words, each printable as a
booklet: **Eight Weeks for the Worn-Out Parent** (`parenting`), **Toward Being
the Dad You Never Had** (`fatherless`, the one closest to James's own story),
**Toward Each Other** (`marriage`), **Toward a Life After Divorce** (`divorce`),
**Of Not Carrying It Alone** (`caregiving`), **In the Waiting** (`infertility`).
All adult, all individual or couple; none is a plan a family does together.

### E. Workbooks (`client/public/workbooks/`, printed by `scripts/lib/workbooks.mjs`)

- **A Weekend for Two** — five sessions for a couple's retreat or a church
  retreat, ~5,500 words.
- **Before You Marry** — eight conversations alongside premarital counseling,
  ~8,300 words.

Both open with a plain safety-first instruction for anyone afraid of their
partner. Both are PDFs only, with no web page of their own (their `href` points
to `/help/marriage` and `/help/dating`). Nothing for parents and children, and
nothing for a family to work through together.

### F. How-to guides (`client/public/howtos/a/`, `/how-tos/:slug`)

36 household how-tos, each 720 to 1,200 words:

- **12 family (`fam-`)**: bless your home and children, family traditions,
  discipling teenagers at home, eating dinner together again, keeping Advent,
  keeping Lent and Easter, a family screen covenant, hospitality as a family,
  praying with kids at bedtime, reading the Bible with young children, starting
  family worship, using a family catechism.
- **12 parenting (`parenting-`)**: hard questions about God, apologizing to your
  kids, blessing your children, discipline that reaches the heart, the screen
  conversation by age, an anxious child, leading when you feel like a failure,
  the strong-willed child, raising kids who own their faith, family worship in
  five minutes, a teenager pulling away, talking to your kids about sex.
- **12 marriage (`marriage-`)**.

Two pairs overlap: two guides on starting family worship
(`fam-how-to-start-family-worship`, `parenting-how-to-start-family-worship`) and
two on blessing children (`fam-how-to-bless-your-home-and-your-children`,
`parenting-how-to-bless-your-children`).

### G. Integrated Life deep guides (`client/public/life/domains/`, `/life/:slug`)

About twenty of the 69 guides are household subjects, each 4,600 to 6,700 words
in the eight-part method (the real struggle, what is at stake, Scripture, church
history, knowledge tested against Scripture, where faithful Christians differ,
what it forms, a practice in this week / this month / this season):
raising children in grace, the home and the family, the wayward child, the
blended family, the empty nest and midlife, caring for aging parents, marriage
the long covenant, the marriage bed, dating and discernment, divorce and its
aftermath, infertility and childlessness, singleness and the full life, making
disciples at the table, food and the table, technology and attention, sex and
the body, the church as family, faith and politics, the common good and
citizenship, witness without weirdness. These are serious, adult, and good; the
"Practice" section of *the home and the family* is the closest thing on the site
to a plan for a household's whole life. `/family` links three of them.

### H. Group study guides (`client/public/studyguides/`, `/studyguides/:slug`)

Five sessions each, 19,500 to 26,500 words, with leader's guide and handout
PDFs. Household-relevant: Fatherhood, Parenting (forming a child's faith),
Raising Believers, Marriage, Divorce and Blended Families, When Our Parents Grow
Old, **Who Am I, Really? (for teenagers 13 to 18)**, Singleness, Biblical
Womanhood, What Manhood Is For, Aging and Legacy, Hospitality, Waiting for the
Light (Advent, names households), Forty Days (Lent). The post-Christian studies
(After Christendom, The Captive Church, Christian Nationalism, Church and
Empire) are adult-only, and two are titled "An 8-Week Study" while holding five
sessions.

### I. Older hubs and landings

- **/parenting** and **/marriage** (`client/src/pages/Parenting.tsx`,
  `Marriage.tsx`) still use the pre-elevation shell (`MinimalNav`, bold H1 at
  `Parenting.tsx:79` and `Marriage.tsx:88`, `<button>` nested inside `<Link>`).
  Their featured essays are all off-shelf, so those sections hide; what remains
  is good short teaching copy, an age grid, and links out.
- **/parenting-help**, **/marriage-crisis**: landings whose essay lists are
  off-shelf and fall back to care resources.
- **/pathways/parenting**, **/marriage**, **/manhood**: every essay they point
  to is retired or pending; only the studies and tools remain.

### J. Dormant material (not public, worth knowing before anyone writes new)

- The shelf section **"Marriage, Family and Ordinary Faithfulness"**
  (`client/src/lib/shelf.json`) holds five essays, all `pending`: Covenant vs.
  Contract, What the Bible Really Says About Submission, What Fatherhood
  Requires, The Machine That Forms You, Where Is God on Holy Saturday.
- **`client/src/data/parenting-articles.ts` and `parenting-articles-2.ts`** (24
  articles, ~320 KB), plus marriage (30), manhood (15), womanhood (15), and
  devotionals (40) libraries, are imported by nothing and none is on the shelf.
  Several cover exactly the missing ground ("When Your Child Comes Out,"
  "Death, Grief and Children," "The Education Decision," "Raising Kids Who
  Question," "Fatherhood Without a Father"). **Integrity flag:** at least one
  ("teenager-calls-hypocrite") is written in the first person as James with a
  specific scene with "my son," sixteen and furious. The care-page slot notes
  say plainly "no invented scenes with his sons." None of this archive should
  return without James confirming every biographical line.

---

## Defects found (concrete)

1. **Duplicate devotion ids break the accordion.** `forgiveness` and
   `obedience` appear in both devotion files. `FamilyDevotions.tsx:125` keys and
   opens by `d.id`, so opening one "Forgiveness" opens both and React warns on
   duplicate keys. "Made On Purpose" is also two different devotions' title, and
   Ephesians 4:32, 1 Thessalonians 5:18, and Matthew 28:19-20 are each used twice.
2. **"A devotion for every week of the year" is 72 weeks.** The page labels
   them Week 1 to Week 72 (`FamilyDevotions.tsx:125`); its header comment says
   52. There is no "this week's devotion."
3. **The catechism's "this week" never reaches the back third.**
   `weekOfYear()` is capped at 52 (`FamilyCatechism.tsx:33`), so Q53 to 76,
   including all twelve "Hard Questions Children Ask," are never featured.
4. **The catechism repeats itself.** Exact repeats: Q8/Q64, Q11/Q56, Q21/Q58,
   Q47/Q61, Q48/Q62; near repeats: Q49/Q53 (prayer), Q50/Q54 (the Lord's
   Prayer), Q45/Q63 (how the Spirit changes us). About 68 distinct questions.
   The second batch reads as appended without reconciliation.
5. **Baptism is answered two ways, and the disagreement is not named.** Q47 is
   neutral; Q61 calls the baptized "members of God's covenant family," which
   leans paedobaptist. The Scholarship Standard asks a second-order question to
   be named as second-order with both positions given. James is a Baptist
   pastor; he should decide this.
6. **Copy disagrees on the catechism's size.** Page and hub say 76; the
   catalogue says "A 52-question family catechism"
   (`scripts/build-catalogue.mjs:466`).
7. **Infinite "Loading…" on all three family pages.** A failed fetch leaves
   "Loading…", "Loading the catechism…", or "Loading plans…" forever
   (`FamilyDevotions.tsx:122`, `FamilyCatechism.tsx`, `FamilyReadingPlans.tsx:53`),
   against the elevation standard (`lib/fetch-json.ts` + `LoadFailed`).
8. **Advent dating and order.** Advent 2026 begins Sunday, November 29; the
   family Advent set starts December 1. Day 24 (Luke 2:1-5) follows days 20 and
   21 (Luke 2:6-11).
9. **Four Scripture renderings across one household's evening.** BSB (weekly
   devotions, catechism, cards, booklets), KJV (Devotion Builder), paraphrase
   (seasonal, on screen), and `unverified` (Parenting Verses, Scripture Memory).
   CLAUDE.md names ESV as the default; the family set chose BSB and validates
   it. One translation for the household would help a child memorize.
10. **CI coverage gap.** `validate-family.mjs` checks Scripture only;
    `validate-grow-voice.mjs` does not scan `family-*.json` or `workbooks/`.
    Duplicate ids, duplicate questions, and voice drift in the family libraries
    are unguarded. (A manual scan found them clean of Forbidden Language; every
    exclamation point and em-dash sits inside quoted Scripture.)
11. **Small things.** `/for-families` lands on `/parenting`, not `/family`;
    hardcoded `rgba(245,240,230,0.78)` in all four family heroes instead of
    `--charcoal-fg-muted`; "Ages 1--3" in the Stage Guide; no family page has a
    contract test beyond the route smoke test.

---

## Voice

The family material passes the mechanical tests (no forbidden words, Scripture
verbatim and referenced, no exclamation outside quotation). It mostly fails the
harder test in CLAUDE.md: "if the flat version could have been written by any
competent Christian blogger." The weekly devotions are kind, clear, and usable,
and generic. Nothing in them sounds like a man who came to faith from atheism,
was raised without a father, and is raising five sons, and nothing in them knows
what year it is. The writing that does carry weight sits in other places: the
catechism's parent notes, the Builder's teen bands, the Parenting Stage Guide,
the care pages, and the Integrated Life guides. James's own words are nowhere:
174 slots across the care pages, 0 filled; the family shelf section, 0 of 5
live. That absence is the largest single gap, because a family will trust a
pastor with five sons before it trusts a well-made template.

---

## Gaps: what exists versus "family devotions that truly help people live in a post-Christian nation"

### 1. The subject matter stops at the front door

The 72 weekly devotions are virtues (honesty, patience, courage, kindness) and
doctrine (Trinity, cross, resurrection, the Spirit). Those are the right
foundation and should stay. But none of them is about the world a Christian
child now walks into. The constitution's own line of inquiry for family content
is "parenting after Christendom, raising children in a secular age … sports and
school and screens and identity, family life as resistance to cultural
fragmentation." Measured against that, these are missing at the table:

- **Being the minority.** Daniel in Babylon, Jeremiah's letter to the exiles
  (Jeremiah 29), Peter's "sojourners and exiles" (1 Peter 2:11). "When you are
  the only Christian kid in your class." "Why does our family go to church when
  most of our friends don't?" "Sunday games."
- **Jesus is Lord, and the flag is not.** Patriotism and its limits, praying
  for leaders you did not vote for (1 Timothy 2:1-2), Caesar's coin, a July 4th
  and an election-season devotion. The site's sharpest adult work is on
  Christian nationalism; children get none of it, though the catechism's Q33
  already has the seed.
- **Politics at the dinner table.** "Grandpa and Aunt Sarah vote differently
  and we love them both." The adult care page exists (`/help/politics`); the
  family version does not.
- **When the church fails.** Abuse scandals, hypocrisy, the leader who fell.
  "Why do Christians do bad things?" "Is the church hateful?" Children hear the
  charge from the culture before they hear an answer from the church. The
  archive has "teenager calls you a hypocrite," but it carries an unverified
  first-person scene.
- **The body, sex, and identity, at an age-appropriate level.** Image of God
  appears, but nothing on the body as gift, on gender questions a child meets at
  school, or on how to love a friend with two moms while holding what the church
  confesses. This needs James, the steelman discipline, and care-page
  guardrails, and it is the topic parents most want help with.
- **Truth in a feed.** Phones appear once ("Where Your Eyes Go"). Nothing on
  online cruelty, pornography exposure for older children, AI and what is real,
  or the self you perform for others.
- **Neighbors who believe differently.** Friends who are Muslim, Hindu, or
  nothing; the catechism's Q73 is a start.
- **Fear, and the future.** Anxiety among teenagers, school shootings, a
  culture that feels hostile. "When Fear Becomes Theology" is a live essay for
  adults; there is no family form of it.
- **Death, divorce, and grief in a child's world.** A grandparent dies, a
  friend's parents split. The archive has "Death, Grief and Children"; nothing is
  live at the table.

### 2. Church history never reaches the children

James's 2026-10-14 priority is church history "in depth … very interactive."
The family set has none of it: no martyrs, no councils, no saints, no story of
the church that lived without power before and was faithful anyway, which is
exactly the post-Christian lesson a child can carry. Candidates (each fact to be
verified before writing): Perpetua and Felicity, Nicaea and why the creed was
written, Augustine's two cities, Patrick, the monks who kept the books,
Wilberforce, the Confessing Church and Barmen. The creeds library and
`/theology/history` exist; neither has a household door. A family form of the
Apostles' Creed, one line a week, would join catechism, creed, and history.

### 3. The church year is half there

Advent and Holy Week exist on screen and in print. Missing as family sets: Lent
(how-to only; the adult Forty Days study and the Lent with Mark reading plan
exist), Easter's fifty days, Pentecost, Epiphany, All Saints, and Thanksgiving.
A family that keeps the church year is a family keeping time by a story older
than the nation's, which is itself the post-Christian lesson.

### 4. Whole households are missing

- **Teenagers at home.** Weekly devotions aim at ages 6 to 11. Teens get the
  Builder's teen band (10 themes), the Parent-Teen tool (with no faith area),
  two how-tos, and one youth study. There is no teen track for the table: the
  questions they are asking, in their register, with room to argue.
- **Couples.** No weekly devotion for husband and wife; one how-to on praying
  together.
- **Grandparents.** Named in one paragraph of a care page; nothing to do with a
  grandchild on a weekend.
- **Single parents, split-week homes, a believer married to an unbeliever.**
  Met with real care on the family-devotions care page, then never again in the
  devotions themselves.
- **Singles and empty nesters.** Adult guides exist; nothing frames their
  household (a roommate table, a friend's family) as a place of formation.

### 5. The kitchen-table experience is not designed

James asked for interactive, modern, study-tool design. The family surfaces are
accordions of text. What a family at the table actually needs, and what is not
there:

- **One tap to tonight.** No "tonight's devotion," no "this week's question"
  that reaches all 76, no way to pick up where the family left off on the
  devotions (only the catechism and reading plans keep progress).
- **A URL per devotion.** A parent cannot text a devotion to a spouse, bookmark
  week 14, or open it from a printed card's QR code.
- **A table mode.** Large type, one step per screen (read, ask, do, pray), a
  phone passed around the table, the passage read aloud by the device for a
  parent who reads poorly or a child who wants to.
- **Scripture in place.** Reading-plan days and devotion passages should open
  in the site's own Study Bible (`/study/bible/:book/:chapter`) with its context
  notes, which is the strongest tool the site owns and is not connected here.
- **Memory practice for children.** The catechism has "Mark learned" but no
  recite, flashcard, or call-and-answer mode; Scripture Memory has no children's
  set.
- **Printables that are missing.** No catechism printable or fridge card, no
  family reading plan printable. (Devotion cards, Advent and Holy Week booklets,
  plan booklets, and workbooks exist.)
- **One devotion system.** The 72 weekly devotions and the Builder's 40 share
  no data, translation, or themes. A family should not have to know there are
  two.
- **A conversation for the news.** Nothing helps a parent when the culture
  arrives at dinner unannounced (an election, a shooting, a scandal at a church).
- **A household rule of life.** The Rule of Life Builder is personal; the screen
  covenant how-to shows the shape a household version could take.
- **A weekly habit loop.** No Sunday-evening family email or Substack feature
  ("this week at your table"), which is the cheapest way to make the habit
  stick and the most natural thing for a pastor to hand his church.

### 6. James is not in the room

The largest gap and the one only James can close: his story with his sons, what
family worship looked like in his home and how it fell apart, what it is to
father without having been fathered, what the church looked like from outside as
an atheist. The slots are already marked (seven on the family-devotions care
page alone) with the right guardrails ("Only from James; no invented scenes with
his sons"). Five family essays wait on the shelf as `pending`.

### 7. Timing

Thanksgiving is November 26 and Advent begins November 29, 31 and 34 days from
today. The family Advent set and booklets already exist; they should be
surfaced, dated from November 29, and put in front of families before then.
`docs/grow/GROW-PROMPT.md` already set "the Advent guide live before November
29" and "an Advent family printable" for December.

---

## What this suggests for the plan (in order of leverage)

1. **Give family a front door.** A home-page door and a top-level place in the
   nav for the household, with "tonight" as the first action. Point
   `/for-families` at `/family`.
2. **Fix the defects** (items 1 to 8 above) and add a structural family
   validator (unique ids, unique questions, counts that match the copy) to CI.
3. **Make the devotion a tool, not an accordion.** Per-devotion URLs, a
   "tonight" pick, a table mode, progress, passages linked into the Study Bible,
   catechism recite mode, and the missing printables. Fold the Builder into the
   same data and translation.
4. **Write the post-Christian family set** in James's register, with the same
   shape the families already know (passage, big idea, reflection, three
   questions, activity, prayer), in two bands (younger and teen): minority and
   exile, Jesus is Lord and the flag is not, politics at the table, when the
   church fails, the body and identity, truth in the feed, neighbors of other
   faiths, fear and the future, death and divorce near a child. Every contested
   claim steelmanned; every fact verified; the sexuality and abuse pieces with
   care-page guardrails.
5. **Church history for the table**: a family set on the church that lived
   without power before, plus the Apostles' Creed line by line.
6. **Finish the church year** for families (Lent, Easter season, Pentecost,
   All Saints, Thanksgiving), and redate Advent to the first Sunday.
7. **Bring James in**: a short list of the slots and pending family essays that
   matter most, put to him as questions, so his own words can land where they
   carry the most weight. Nothing biographical is written for him.
8. **Couples, grandparents, and teens**: a couple's weekly devotion, a
   grandparent's weekend kit, and a teen track for the table.
