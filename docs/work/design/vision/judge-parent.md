# Judge: the parent's seat

Step 3 of the design program (`docs/work/NOTES.md`, "James's redesign brief"),
2026-10-27. One of six judges scoring the four directions in this folder:
`study-desk.md`, `field-guide.md`, `long-memory.md`, `the-week.md`.

**Who sits here.** Two people who did not come to study and did not come to
argue.

The first is a parent at nine at night, on a phone, with children nearly in bed
and about ten minutes of patience left in the house. Someone at church said
LiveWell has a devotion for the table. She wants to get from wherever she lands
to the first line of tonight's reading without deciding anything, read it in a
light that does not hurt, keep the phone awake on the table, and finish without
being told she has missed six weeks. If a child asks something hard, she wants
a sentence she can say back.

The second is a seeker on a Tuesday afternoon. His marriage is in trouble, or
the job ended, or his father has a diagnosis. He typed his trouble into a search
box in his own words, or a friend sent the address. He wants to see his problem
named the way he would name it, something he can do this week, and how to tell
whether he needs more help than a page can give. He did not come for
ecclesiology. If the page is honest he may stay for the depth behind it, but
only if it never turns into a bait-and-switch into a sermon.

The contract already settles what these two need when they pull against the
skeptic: "the practical door first, the depth behind it" (`CLAUDE.md`, Audience
Standard). This seat checks whether each direction actually builds that door.

**What I read.** `CLAUDE.md`; `CRITIQUE.md` and the critic reports (above all
`mobile.md`, `learning.md`, `visitor.md`); the three syntheses, closely at A 2,
A 12, A 13, B 10, B 16, B 17, B 23, B 24, C 2, C 4, C 6, C 10 and C 16;
`MASTER-PLAN.md` sections 0 to 3, 5 and the unit cards for U17, U18, U20 and
U21; `NOTES.md`; all four directions in full. Screenshots: `home-phone-first.png`,
`family-phone-first.png`, `family-tonight-phone-first.png`,
`family-devotions-phone-first.png`, `help-phone-first.png`,
`help-anxiety-phone-first.png`, `header-menu-open-phone-first.png`, and U18's
captures in `docs/work/plan/shots/U18/` (`phone-oct27-first-screen.png`,
`phone-oct27-find-tonight.png`, `phone-two-taps-table.png`).

**Checked in the repo.** `vite.config.ts` line 22 still sets the service worker
to `selfDestroying: true`, so no page is kept for offline reading today,
whatever a direction promises. Fifteen of the 40 care pages are `high`
sensitivity in `client/public/needs/index.json`, marriage and divorce among them,
and `CarePage.tsx` already sets the slim crisis line above the title only on
crisis and high pages. Neither *Read and pray* nor MASTER-PLAN 5.3's "If your
table looks different" panel exists anywhere in `client/src`.

**Where the parent stands today.** U17 and U18 have done the hard part on the
work branch: Tonight is two taps from Home, table mode steps one screen at a
time with the screen kept awake, and "We did this tonight" counts nothing
(`phone-two-taps-table.png`). But on Home the tonight line sits on the second
phone screen under the biography (`phone-oct27-first-screen.png` shows only the
portrait, the headline and the first paragraphs); the site is bright paper at
night; and the Tonight page spends its first screen on "69 of 72 · Weekly
devotions · Week 44 of the year" and a black "Send to my phone" button before
the verse appears. The seeker's best page, `/help`, is already the best first
screen on the site; the care page behind it is one long column (the anxiety page
runs 38 phone screens) whose jump chips scroll away (`mobile.md` #15).

**A caution about every direction's measurements.** All four place elements on
a bare 390 x 844 viewport. A phone browser's own toolbars take part of that on
load, so I treat anything placed below about 650 to 700px as at risk of falling
under the fold until a preview measures it.

---

## Criteria and weights

| # | Criterion | Weight | What earns the points |
|---|---|---|---|
| 1 | **Tonight, fast** | 25 | Tonight's title on Home's first screen, high enough to survive browser bars, at every hour; two taps to step one; the Tonight page opening on the verse and Start; a *Read and pray* minimum; table mode kept; help for the parent with a child's hard question |
| 2 | **The Tuesday problem, fast** | 25 | A trouble typed in plain words finds its care page first; the care page opens on what to do this week, with urgency graded and the crisis lines reachable from every screen; something on Home the seeker recognizes as his |
| 3 | **Clarity on a small screen** | 15 | Few choices per screen, labels in the reader's words, no house vocabulary to decode at 9 p.m. |
| 4 | **Night and the thumb** | 10 | Night reading that follows the phone, early, on Tonight and the care pages; controls in thumb reach; the header out of the way; 44px targets and 16px inputs |
| 5 | **Warmth without sentimentality, and no guilt** | 10 | Says what is enough; no streak, count or "you missed"; mercy after a gap; plain words, never saccharine, never therapy-speak |
| 6 | **Depth behind the door, and a reason to come back** | 10 | The practical page opens onto Scripture and the church without a bait-and-switch; a return that fits a household's week rather than a product's |
| 7 | **Where the effort goes first** | 5 | These readers' gains arrive early in the build path, without waiting on a long queue of James's writing |

## Scores

| Direction | 1 Tonight | 2 Tuesday | 3 Clarity | 4 Night | 5 Warmth | 6 Depth | 7 Effort | **Total** |
|---|---|---|---|---|---|---|---|---|
| The Field Guide | 18 | 23 | 13 | 7 | 9 | 8 | 5 | **83** |
| The Week | 23 | 11 | 10 | 9 | 10 | 10 | 4 | **77** |
| The Study Desk | 17 | 12 | 10 | 7 | 7 | 8 | 2 | **63** |
| The Long Memory | 12 | 10 | 8 | 6 | 7 | 9 | 1 | **53** |

---

## Each direction from this chair

### The Field Guide: 83

**Strongest:** the care entry and the Guide's plain-question search, which give
the seeker the fastest honest way from his own words to something he can do
this week, with the depth below it. **Weakest:** the parent gets no clock; Tonight
is the fourth of five rows on Home at every hour, and Night waits until Easter.

**Tonight (18).** On Home's first phone screen Tonight is a full 52px row in the
key, "Tonight at the table: Strong Enough To Be Gentle," "Advent, day 6: ..." in
season, its title filled after mount from the generated year map (3.1, item 6).
That beats today, where the line is on screen two. But it is the fourth of five
rows, behind questions about truth, Christian America and doubt, at roughly
y 672 to 724, the band most likely to sit under a browser's toolbar, and it
keeps that place at noon and at nine. The Tonight page (5.9) is right: one
counter ("Tonight · Week 44"), the verse first at 22px in the serif, *Start at
the table* and *Read and pray*, "About ten minutes · Younger | Older," the
utilities moved to the end, the four doors as table mode's last screen, *When
your child asks* where a theme has one, the Ask questions labeled by kind. It
omits the parent's collapsed note (B 16) that the Study Desk and The Week both
carry. Region 4, "Marriage, children and home," gives her a place for the
questions that are not about tonight, and is honest that "My grown child has
left the faith" waits on James's own story.

**Tuesday (23).** This is the direction's home ground and the best answer any
direction gives my second reader. A plain-language query matches `askedAs`
across one Guide registry and shows "In the Guide" first, before Essays, Study
and Tools (2.6), so a sentence about a failing marriage reaches `/help/marriage`
rather than a doctrine of marriage. The empty search shows the key and
"Recently visited on this device." The care entry (5.2) is built on the
practical door: the reader's words as H1; In brief; a 44px "This week: six
steps" jump on the first screen; steps made actionable in place (the Worry
Journal inline, "Tell one person" as a prefilled text, Psalm 131 in a sheet,
steps that tick and are remembered); care cards graded *This week*, *Today*,
*Now*, with the level in the words and never in red; a bottom-bar stations
sheet with "Help now" first; "Page last reviewed." *When someone you love dies:
the first weeks* as a step by step, its legal and money steps saying plainly
that they are not advice, is exactly the Tuesday task GOV.UK built that pattern
for. Two points lost: the home key has no row for a trouble at home or work, so
the seeker must use the field or the header's Find Help; and the Guide index
opens on region 1, "Is any of it true?", so a seeker who browses rather than
types scrolls past three regions to reach his.

**Clarity (13).** The doors and regions are named in the reader's grammar
("Questions," "Start from where you are," "When faith is coming apart"), and the
key spends one tap to reach one page. Against it: the Guide index's first screen
holds a field, two chip rows, a crisis line and a region head, which is busy;
and the stations ("In Scripture, 3 of 7") add a second vocabulary on top of the
page's own headings. The direction names the risk itself ("Seven stations on
every page could feel like a form.") and its guard, that empty stations do not
render, is the right one.

**Night and the thumb (7).** The header hides on scroll, Home included; care
pages get a bottom bar in thumb reach; inputs stay at 16px; and it is the only
direction that names offline reading for the care pages and the Guide (6.10),
though with `selfDestroying: true` that is a decision for James, not a setting.
Night follows the phone, but only in phase 4, Easter onward: five more months of
bedtime devotions and 2 a.m. anxiety pages on bright paper. The key rows are
Cormorant at 20px on charcoal, the size and ground the mobile critic says turn
frail (#20).

**Warmth (9).** The key's words are the site's own care-page titles ("I don't
believe, but I'm curious," "I'm not sure I believe anymore"); region heads are
only James's published lines; "This week" on Home appears only when the device
has something; returning questions come back "Never on Home as a count, never a
push, never a percentage." One caution: field marks ("Not this. This.") belong
on field entries, as every example in 4.3 does; under In brief on a grief or
marriage page a ground-clearing slogan would be the wrong register.

**Depth (8).** The descent is the contract's movement made into structure: In
brief, Underneath, In Scripture, What the church confesses, The church has been
here before, This week, At the table. The seeker can stop at This week and is
not trapped; *Asked in the Guide* on every chapter runs the descent back up. What
it lacks is a household rhythm: a family that comes back next Tuesday finds the
same key.

**Effort (5).** Phase 1 is the Guide and the front door; phase 2 is the care
entries (G6) in December and January. Both readers' gains come first, and most
rows point at pages that already exist.

### The Week: 77

**Strongest:** it is built around a household's actual week. After the turn-over
hour Home's first card row becomes "TONIGHT · The Long Wait Begins · Start at
the table," the phone menu puts *Today · This week · Tonight* in thumb reach, and
the refusals that protect a tired parent are written as rules CI can check.
**Weakest:** the seeker is left where he is: care pages unchanged, Find Help
demoted to ink in the phone header, and a stranger's first screen given to a
five-row devotional card.

**Tonight (23).** The best answer to the first reader in any direction. On Home
the week card sits on the first screen with a TABLE row ("The Long Wait Begins ·
Genesis 3:15 · ten minutes"), and on a returning device the first row follows
the hour: after 2 p.m. it reads "TONIGHT · The Long Wait Begins · Start at the
table" (3.2). The phone menu becomes a bottom sheet whose three largest targets
sit at the foot (2.1). The Tonight page (5.10) sets the verse at 24px first,
offers *Start* (about ten minutes) and *Read and pray* (about three) with one
sentence of permission, labels Ask by kind, collapses a note for the parent
above the devotion, moves the utilities to the end, and states position as a
date ("Tonight · Tuesday, December 1") instead of "69 of 72." "One question,
three depths, one household" (4.3) is the most useful single idea any direction
gives a parent: the child learns the `kidsAnswer` at the table on the same night
the parent can read the adult answer and its Scripture. *For Sunday* puts the
week on the refrigerator. Two points lost: on a first visit the TABLE row is the
third of five in the card, and a parent who arrives by a church's link lands on
a week page or a print sheet one tap further from step one than
`/family/tonight`.

**Tuesday (11).** Care pages are "Unchanged by this direction beyond C 2" (2.3);
the seeker "goes to Find Help (unchanged ...)" (2.5). Find Help in the phone
header is set in ink, not `--mustard-text` (3.1, item 1), so the door he most
needs gives up its color to Tuesday's tick. The Find field begins only "just
inside the first screen," at its foot. The empty search shows the week's
strands, not what people bring most. And the first screen a stranger sees is a
devotional card (Read, Learn, Table, Think, Pray), which tells someone whose
marriage is in trouble that this site is for people who already keep a rule of
prayer. The plans that begin on a Sunday, with a calendar entry for every week
and "Pick up at week 3" or "Join this week at week 5" after a gap (4.7), are a
real gain for him, and Close of Day's Examen keeps Find Help one tap away;
neither reaches him on the page he lands on.

**Clarity (10).** Every row is concrete (a title, a passage, minutes), which is
the opposite of a feature list. But the direction adds seven strand names, a
dateline in the church's calendar, four new top-level addresses (`/week`,
`/today`, `/year`, `/seasons`), numbered seasons ("No. 1 · Advent 2026"), and
five rows of practices on Home's first screen. Even with no checkmarks, a tired
parent can read five rows with their lengths as a list of what she is behind
on. *Keep these*, which collapses the rest into "Also this week," is opt-in;
for a household device it should be the default.

**Night and the thumb (9).** The only direction that names Tonight and the
evening pages as the first to get Night and pulls it forward (W10, "the day and
the table first"). The thumb-reach menu, 48px rows and the hiding header
complete it. It does not mention offline reading.

**Warmth (10).** "The page tells the reader what is enough (ten minutes at the
table; the short form of the day's prayer, three minutes) rather than how much
more there is." Section 6.10 turns the refusals into rules a reviewer can check:
no streak, no count of days, no "you missed"; the seven-day strip shows only the
calendar and today and never a day the reader did something; position in words
("Last here: Sunday"); no push; a copy check in CI and a test that the strip
reads no storage but the date. Nothing in any direction is kinder to a tired
parent, and none of it is sentimental.

**Depth (10).** The household that comes back is the direction's whole argument,
and it delivers: the shared week, the year band, courses with a start date, a
carried question that returns once in three days and once in three weeks, the
look back and the closing rite.

**Effort (4).** Phase 1 is the week map, the week page, Home's card and *For
Sunday*, all for the parent. The daily office is a large new product with heavy
James gates (whether it belongs on LiveWell at all, its frame, about thirty
Examen lines, the catechism pins, the church year named on a Baptist site).

### The Study Desk: 63

**Strongest:** it is honest about where it stops ("A desk is for people who came
to study. The parent at 9 p.m. and the seeker whose marriage is in trouble did
not."), and its default depth means a chapter opened from Tonight, a devotion or
a plan opens at Read, a quiet page of Scripture rather than a cockpit (4.2).
**Weakest:** it builds almost nothing for these two readers, and its one search
ranks Help eighth of nine groups, so a trouble typed into the header meets
doctrine and glossary before care.

**Tonight (17).** The Tonight line sits high on Home's first screen (about y 504
to 548), but the spec makes it either/or: "Tonight at the table: ..." or, "when
this device has a place," "Continue: John 4 · Day 40 of the 2027 story" (3.1).
A parent who also reads the 2027 plan loses Tonight to her own Bible reading.
Below it the largest object on the screen is John 1:14 with "Tap the verse to
see what is gathered around it." The Tonight page (5.10) is right, and it
carries the parent's collapsed note with the hard question a child may ask and
a two-line honest answer.

**Tuesday (12).** Search groups run Passage, Word, Doctrine, Glossary, History,
Topics and answers, Essays, Help, Tools (2.5); Find Help's care-first ranking
survives only inside Find Help's own box. The care page stays as it is "with
urgency graded"; the crisis lines become three 44px buttons on every care page
(6.11), which is a real gain; every reference opens the desk in a sheet. Nothing
makes the long care page usable past its first screen, and nothing on Home
speaks to him.

**Clarity (10).** Home's first screen holds six things with one job each, which
is clean. The vocabulary behind it (the desk, Read · Study · Teach, labels of who
is speaking, counted rows) is built for a reader with a question in his hand,
not a parent with a child on her lap; to its credit, the direction keeps that
vocabulary off the household doors.

**Night (7), Warmth (7), Depth (8), Effort (2).** Paper, Night and Auto in the
Aa menu in phase 3, sooner than the Field Guide; the chapter's bottom bar and a
header that hides on care pages; offline named honestly as James's decision. The
register is cool and exact: nothing that shames, nothing that warms. "Read it on
the desk" is the house's word, not the parent's. The depth is the greatest of
the four once she wants it, but a household gets no reason to return beyond a
Continue line and a shared verse. The build path is type, the desk, search,
doctrine and paths; no unit is for the table or the care page.

### The Long Memory: 53

**Strongest:** the second clock for a household, and "The church remembers" at
the table about one week a month, framed by Hebrews 12:1, which gives a family a
date to return to and a person to meet. **Weakest:** the Line takes the first
phone screen's best space and pushes Tonight to its foot, below the fold on a
real phone, while the care pages stay as they are.

**Tonight (12).** Tonight "shows its first line at the foot of the screen" (3.1,
item 9), at about y 760 to 844, under a 2,000-year drawing, a caption, Find and
the skeptic's door. On `/family` a 52-tick year strip comes before *Tonight at
the table* (5.7). The Tonight page itself is good: verse first, *Start*, *Read
and pray*, a thin act band, the four doors under Deuteronomy 6:7. Night is the
last phase, spring to September 2027.

**Tuesday (10).** "The seeker arrives with a Tuesday problem ... The practical
door is first (the care page's steps for this week)" (2.4), but the care page is
"unchanged in shape; C 2's urgency cards" (2.3). Search ranks Help seventh,
after People and events. The home rows under "Start where you stand" (3.4) name
unbelief, a question you can't shake, being new, and leading; none names a
trouble at home.

**Clarity (8).** The Line asks a tired reader to decode an argument (Without
power, Christendom solid then dotted, In America, You are here) before she
reaches what she came for. Two clocks, nine Parts, twelve turns: grown-up,
weighted, and slow.

**Night (6), Warmth (7), Depth (9), Effort (1).** The masthead hides; Night
comes last. The register is grave, and "the church has sat in this dark before"
would console the grieving, but it is offered on topic pages rather than on the
care pages where grief arrives. The depth is immense. The build path is the
history course; nothing in it is for the table or the care page.

---

## The winner: The Field Guide

For these two readers the deciding question is which spine leaves both of them a
short way in. The Field Guide's spine is the contract's own tie-break made into
the site's structure: one registry of questions in the reader's words, a search
that answers a plain sentence with its care page, and a care page that opens on
what to do this week with the depth beneath it. Its parent experience is already
good, because the Tonight page and table mode are largely shared ground across
all four directions; what it lacks for her is a clock, and a clock can be
grafted. The Week is the better design for the parent alone and would win this
seat if it held only her, but its spine puts a devotional week on every
stranger's first screen and leaves the seeker's pages untouched; grafting the
Guide into The Week would mean rebuilding its home and its search. Grafting The
Week's household machinery into the Field Guide changes neither.

## What the Field Guide should graft

**From The Week**

1. **Tonight with a clock, on a fixed row.** Move the Tonight row from fourth to
   second in the home key (the skeptic's row stays first; the contract gives him
   the tie), so it sits near y 568 to 620 instead of 672 to 724. Keep its place
   fixed and let only its words follow the hour, so nothing moves after mount:
   before the turn-over hour "This week at the table: [title]," after it
   "Tonight at the table: [title] · Start." The Week 3.2's hour rule without its
   reordering.
2. **The thumb-reach menu.** The phone menu as a bottom sheet with a scrim, its
   largest targets at the foot: *Tonight · Find Help · Search* (The Week 2.1's
   *Today · This week · Tonight*, fitted to the Field Guide's doors).
3. **The refusals as checkable rules.** The Week 6.10 in full: no streak, count
   of days, percentage, badge, "in a row" or "you missed"; position in words
   ("Last here: Tuesday"); no push; the copy check in `validate-design.mjs`.
   With it, the mercy of 4.7, "Pick up at week 3" beside "Join this week at
   week 5," on every plan, on the 2027 story, and on Tonight's position line.
4. **One question, three depths, one household** (The Week 4.3). Tonight's
   Remember step opens the catechism question page at *At the table* (the
   `kidsAnswer`), *In brief* (the adult answer with its proof letters) and
   *Going further* (the `commentary`). On the Field Guide's doctrine page (5.7),
   "the children's answer one tap away" becomes *At the table* as a named depth,
   and the four-doors screen's morning line is that child's answer.
5. **Night pulled forward, household and care first** (The Week W10). Move Night
   from the Field Guide's phase 4 to its phase 2, scoped first to
   `/family/tonight`, table mode, `/help` and the care entries, after the hero
   audit and the `html.dark` render test, with Paper · Night · Follow my phone in
   the one Aa menu.
6. **For Sunday** (The Week 4.9 and 5.13). The week on one Letter or A4 page with
   a QR code, `/family/this-week` resolving to it with the table first (U20 as
   planned), linked from region 4 and the Family door.
7. **A start date for one person** (The Week 4.7 and 5.12). Every eight-week plan
   in regions 3 to 6 offers *Begin on* (next Sunday by default) and *Add every
   week to my calendar* through `lib/calendar.ts`, so a seeker's plan for a
   marriage or a grief becomes a dated run he can keep without an account or a
   push. The Field Guide offers dated runs only to leaders.
8. **Position as a date on Tonight:** "Tonight · Tuesday, December 1" (The Week
   5.10), rather than "Week 44."
9. **Later, and only on James's yes: Close of Day's short form** (The Week 4.2),
   about three minutes, for the adult after the children are asleep. It absorbs
   the Worry Journal's bedtime step, and its Examen ("Tonight I am coming to
   this...") keeps Find Help one tap away. Linked from the anxiety and grief care
   entries and from table mode's last screen, never from Home's first screen.

**From The Study Desk**

10. **Read by default from household and care doors** (Study Desk 4.2). A chapter
    opened from Tonight, a devotion, a care page or a plan opens at Read
    (paragraphs, no verse numbers or marks, Listen in the bottom bar); Study only
    from Find or a verse link. The Field Guide's chapter has the switch but no
    rule for which side it opens on.
11. **The parent's minute** (Study Desk 5.10, item 4; B 16). Above the devotion,
    collapsed and never in table mode: what tonight is about in a sentence, the
    hard question a child may ask with a two-line honest answer, and the
    `contentNote` B 16 requires on devotions that touch death, violence or a
    family breaking. The Field Guide's 5.9 omits it.

**From The Long Memory**

12. **The church remembers at the table** (Long Memory 4.9; U49). About one week
    a month, a witness with one verified line, framed by Hebrews 12:1 as
    remembrance, on the Tonight page and in the table-mode Remember step.
13. **A thin act band on the devotion page** (Long Memory 5.7). One tick showing
    where tonight's passage sits in the Bible's story, so a child at the table
    gets a "you are here." Below the verse, never above it; and not the year
    strip in front of Tonight on `/family`.

## What must not be lost in any merge

1. Tonight two taps from Home's first phone screen, placed high enough to survive
   the browser's toolbars, at every hour and for every reader, its title painted
   without the network (U17 and U18's measure). Never either/or with Continue,
   and never pushed down by a verse specimen, a drawing or a week card.
2. The Tonight page's first screen: the title, the verse set large, *Start at the
   table*, and *Read and pray* (about three minutes) with one sentence of
   permission. Send, Save, Print and Listen at the end; "Send to my phone" never
   on a phone.
3. Table mode as built: one step per screen, Next and Back at the foot in thumb
   reach, the screen kept awake, Listen, and "We did this tonight" as a plain
   button that counts nothing; the four doors under Deuteronomy 6:7 as its last
   screen.
4. Younger, Older and Together; Ask questions by kind with *Your turn*; and
   MASTER-PLAN 5.3's "If your table looks different" panel (the single parent,
   the split-week home, the believer married to an unbeliever), which no
   direction carries and the code does not yet have.
5. Find Help in every header in `--mustard-text` at full weight (The Week's ink
   would demote it), and `/help`'s first screen as it is: crisis lines first,
   "Type it in your own words," "What people bring most," Exit site.
6. On every crisis and high-sensitivity care page, the crisis lines on the first
   screen as three full 44px buttons, Exit site clear of the text, and "Help now"
   reachable from every screen of the page, not only the first.
7. The care page opens on the practical door: the reader's words as its title,
   In brief, This week made actionable in place, care cards graded by words and
   never by color. No field marks or slogans on care pages; their own voice
   stays.
8. A plain sentence in the one search ("my husband left," "I lost my job")
   returns its care page or Guide entry first; crisis words outrank every pin; a
   doctrine-first group order never applies to a sentence about a life.
9. No streak, count, percentage, badge, "you missed" or push anywhere; position
   in words; mercy after a gap; everything a reader writes kept on the device and
   said so at the field.
10. Night following the phone, reaching Tonight, table mode and the care pages
    first, with no black-and-cream strobing as the page scrolls; and, if James
    reverses `selfDestroying` for those paths, tonight's devotion and the care
    pages kept for offline reading.
11. One translation on household surfaces (the BSB), so a child who taps the
    verse at the table sees the same words in the Study Bible.
12. Nothing on Home, Tonight or a care page asks for an email.

## What no direction carried far enough

- **The first night ever.** None builds the step by step C 10 lists as a
  candidate, beginning family devotions. A parent who has never done this needs
  one screen: what you need (nothing), how long (ten minutes, or three), what to
  do when the youngest will not sit still, what if your spouse does not believe.
  The material is already on `/help/family-devotions`; it should be the first
  thing `/family` shows a device with no family position.
- **The parent who is also the seeker.** At nine at night the person reading
  Tonight may be the one whose marriage is failing. No direction gives the
  Tonight page or table mode's last screen a quiet way to the care pages ("If
  home is hard right now"), the way the care pages point back to the table.
- **Real first screens.** Every direction measured a bare 844px. The merged
  vision should measure Home, Tonight and one care page at 390 x 844 on a
  preview with the browser's bars showing, and state where Tonight and the "This
  week" jump actually land.
- **A voice for the car and for bedtime** (B 10), gated on James's own voice or
  a reader he names. The Week's prayer-pace Listen is the nearest any direction
  comes.

## What this seat will check in the merged vision

- Where Tonight lands on Home's first phone screen, measured with the browser's
  bars, and that it never trades places with Continue.
- What a plain sentence about a marriage, a job or a death returns first in the
  one search.
- That every care page has a "This week" jump on its first screen and "Help now"
  on every screen.
- In which phase Night reaches Tonight, table mode and the care pages.
- That the no-guilt rules ship as a CI check, not as a paragraph.
