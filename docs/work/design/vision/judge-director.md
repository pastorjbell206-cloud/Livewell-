# Judge: the design director's seat

One of the judges for step 3 of the design program (`docs/work/NOTES.md`,
"James's redesign brief"). Prepared 2026-10-27.

**The seat.** I direct design for serious publications. I judge craft,
coherence, distinctiveness, the quality of the type and the drawings, whether a
stranger would take the result for elite work or for a well-configured
template, and whether its attention is earned by what it shows or bought by
mechanism. I do not judge doctrine, the doors as a Decision Log matter, or the
pastor's workload, except where they change what a reader sees.

**Read for this judgment.** `CLAUDE.md` in full; `CRITIQUE.md`; the brand and
editorial reports in `critique/` in full and the verdicts of the other five;
the verdicts, the "what world-class means" tables and the tensions sections of
`A-SYNTHESIS.md`, `B-SYNTHESIS.md` and `C-SYNTHESIS.md`, with C 5 (house style)
and C 22 (pictures as witnesses) in full; `MASTER-PLAN.md` sections 1 to 3, 8
and the unit list in 10.6; `NOTES.md`; all four directions in full. I looked
at the current home, John 1, church history, the essay, Tonight and `/tools` in
`shots/current/`, and U25's post-Christian topic page in `plan/shots/U25/`.
I formed these scores before opening the other judges' files and did not read
their reasoning.

**Checked in the repo**, because it changes what a builder would ship:

- `client/public/fonts/` holds Cormorant Garamond 400, 400 italic, 500 and 600
  and Inter 400, 500 and 600. No text serif and no Inter italic, so every
  direction's reading surface depends on James's answer to critique question 1.
- `--charcoal-fg-muted` is cream at 78 percent (`index.css` line 58). The
  editorial critic named it as gray used for primary text on the home hero.
- `--w-prose` is 680px and `--w-default` 1180px; `--mustard-text` is #7A6010
  in light and #E0B945 in dark. All four directions build on these correctly.
- `client/public/article-art/covenant.svg`, the seed every direction names for
  the house line, itself carries five mustard marks (the lens stroke, two
  binding dots, an underline and a 16 percent fill). The house line has to be
  drawn from it with one mustard mark, or the seed will teach the opposite of
  the rule.
- MASTER-PLAN 8.6 holds a 16px phone gutter. The Study Desk proposes 20px.

**One finding before the scores.** On the reading surface the four directions
largely agree, because they all took it from the critique: a text serif, a
declared scale, the chapter with its outline in the text and verse 1 on the
first phone screen, the verse panel as a sheet and a margin, notes beside the
text, an end mark and silence, one paper per long read, mustard as one mark,
night as one low band. They differ in three things: the cover, the signature
drawing, and the grammar that ties the site together. Those carry most of the
weight below.

---

## 1. Criteria and weights

| # | Criterion | Weight | What earns the points |
|---|---|---|---|
| 1 | **Signature** | 20 | One visual idea drawn from what the site is about, ownable at 16px, on a slide at a PCN call, or as a shared image; recognizably LiveWell's with the wordmark removed |
| 2 | **Type and reading craft** | 20 | Three faces with three jobs; a scale as tokens; Scripture set as Scripture; the first sentence on the first screen; how a piece opens, turns and ends; notes beside the text; the creed and prayer set to be said |
| 3 | **Coherence** | 15 | One grammar learned once: one page shape, one drawing vocabulary, one label system, one rule for black and one for mustard, apparatus with fixed homes |
| 4 | **The cover** | 15 | Home and flagship first screens at 390 and 1440: hierarchy, a lead object worth looking at, James's face readable, the readers named, weight where it is earned |
| 5 | **Attention earned** | 15 | Attention from accuracy and depth, not motion, novelty, counts or borrowed app vocabulary; mustard made exact; images as witnesses; refusals written as rules |
| 6 | **Survives execution** | 15 | Whether the system holds when many hands build it: density on the phone, the risk of a cockpit, a form or a widget, legibility of the drawings at 358px, a small number of reusable primitives |

---

## 2. Scores

| Direction | Signature (20) | Type (20) | Coherence (15) | Cover (15) | Earned (15) | Execution (15) | **Total** |
|---|---|---|---|---|---|---|---|
| **The Long Memory** | 19 | 15 | 14 | 14 | 14 | 11 | **87** |
| **The Study Desk** | 14 | 18 | 14 | 11 | 13 | 11 | **81** |
| **The Field Guide** | 13 | 16 | 12 | 13 | 13 | 11 | **78** |
| **The Week** | 12 | 15 | 12 | 10 | 11 | 10 | **70** |

---

## 3. Each direction, from this chair

### 3.1 The Long Memory: 87

**Strongest point: the Line.** One still drawing, to scale, from AD 30 to this
year: a band labeled "Without power" a little under a seventh of the width,
the Christendom bracket solid and then dotted where its end is argued, a short
"In America" row at the right, one mustard tick marked "You are here," and past
it a dotted stretch labeled "not yet" with a caption that marks it as
confession. It is the only proposal across the four whose signature makes an
argument by proportion before a word is read, which is exactly what the
learning critic said a picture should do ("teaches the post-Christian thesis
better than a paragraph can"). It is Sparks's *Histomap* and Priestley's chart
in the house line, not a borrowed app pattern. It survives as a thumbnail, a
book-jacket band, a slide, a PDF cover. On the phone it is on the first screen
(394 to 486px), cream hairlines on black, with James's own published sentences
beneath it as its caption. That pairing, a drawing captioned by the author's
words, is the most editorial gesture in any of the four documents.

The grammar is the strictest I read: "Lines, ticks, bands and cells. That is
the whole vocabulary." Time runs left to right on wide screens and top to
bottom on a phone; certainty is drawn (solid, dotted, a range bar); position,
label and one tick carry meaning and color never does; every drawing is drawn
twice and has a list. The same hand carries the act band, the 52-tick year
strip, lives as lines with a year rule, the creed's date rail and the gap
ruler, so the site gets one drawing family instead of a set of illustrations.

Mustard is given a meaning, not only a budget: "the mark of *now* and *this*,"
four uses, one non-link mark per viewport, and the director's rule that when
the Line and a versal share a screen, the versal goes. That is how a system
stays under 8 percent without anyone measuring.

Two set pieces carry type as argument: the Nicene Creed in sense-lines at
display size with a hairline rail down its left edge ticking the date each
article was fought for, and the facing page with the losing side set first at
equal width. Both are the creed and the controversy given their weight on the
page, which is what the editorial critic asked for.

**Weakest point: its own type spec slips where the craft is finest.** It sets
James's sentence on the home hero in `--charcoal-fg-muted`, the 78 percent
cream the editorial critic named as gray for primary text. It states
"Cormorant never below about 22px" and then sets the hero caption in Cormorant
italic at 19px and the `--fs-lede` deks at 20px on a phone, the spindly size
the editorial critic faulted on the essay dek. It keeps the 56 x 70 portrait on
the phone that the visitor and brand critics called too small to read a face.
And the home page spends black three times (hero, the twelve turns band,
ending), which puts a course list on the weight reserved for verdicts. All four
are corrections, not redesigns, and section 4 lists them.

**Other risks.** Two thousand years in 358px is about a sixth of a pixel per
year; the direction names it and limits the phone to the Parts and five
labels, with a collision check in CI. That is the right guard and it must be
held. The reading surface (chapter, verse panel, essay) is specified less
deeply than the Study Desk's, which is the main graft.

### 3.2 The Study Desk: 81

**Strongest point: the reading surface and the type system.** No other
direction specifies the page a reader spends most of his time on this
precisely. The desk grid (a 200px contents rail from 1280px, 48, a 640 to
680px text column, 48, a 280 to 320px margin) is shared by the chapter, the
essay and the history session, so a reader learns one page shape. The ten-step
type scale is written as tokens with phone and desktop sizes and line heights.
Outline headings sit in the text as Inter 500 small caps over a hairline; verse
numbers are `--ink-muted`, not mustard, with a 40px hit area from a
pseudo-element so the glyph stays small; a hollow dot marks a verse with a
note. The five labels of who is speaking (Scripture, The church's witness,
Study note, James Bell, Your notes) in small caps over a hairline, no color, are
an editorial device with real identity, and the direction shows they map onto
fields the 4,311 verse notes already carry. The pencil mark, a hairline bracket
in `--ink-muted` in the left margin beside the verses "like a pencil in a
printed Bible," is the single most tasteful detail in the four documents: a
personal mark that keeps the palette. Read, Study and Teach give one text two
settings without two products. Trace the argument draws one mark per step on
the passage itself, which is attention earned by looking harder at the text.

**Weakest point: the signature is shaped like an interface.** The home desktop
hero is copy on the left and a white card of counted rows on the right (Study
note, The words, Elsewhere in Scripture, The church on this verse, On
LiveWell, each with a number), the product-shot composition of a software
landing page. The counted rows are right inside the panel and wrong as the
brand's face. The phone first screen packs nine elements into 844px (header,
headline, portrait and sentence, Find, the skeptic's row, Tonight or
Continue, a kicker, the verse, an invitation line). The verse at the foot,
set in the text serif at 22/33 with "Tap the verse to see what is gathered
around it," is a beautiful idea that deserves a quieter screen. Removing black
from the top of Home also removes the one place the contract and the plan
both reserve it.

**Other risks.** The margin that "follows the reading" will often have little
to follow (987 chapters carry no verse notes); the direction is honest about
it, but visually the margin will show a contents list more often than a note.
The 20px phone gutter departs from the plan's 16px without a reason a reader
would feel.

### 3.3 The Field Guide: 78

**Strongest point: the desktop cover and the plates as a captioned series.**
Its 1440 first screen is the best-composed of the four: a black hero holding
the headline, the portrait and Find in columns 1 to 7 and Plate I, the river,
in columns 8 to 12, its caption "What has ended in America is Christendom, not
the faith"; then a cream strip at the foot of the same screen with five
questions in Cormorant 22px in five columns, skeptic first. Image, author and
the readers' own words share one screen without crowding. Naming the drawings
as a finite, numbered set (Plates I to V) with one plate per screen, a caption
that states the point, and a home in `components/plates/` is a publication's
discipline: it caps the drawing family so it cannot sprawl. "Only one margin
per side: notes right, stations left; nothing else lives there" is the
cleanest apparatus rule in the four. Its eyebrow refinement (mustard text only
for a page's first kicker, later labels in `--ink-muted`) resolves the
contract's own conflict between "eyebrows are mustard" and "under 8 percent."
And it sets the dek in the text serif's true italic, which is the fix the
editorial critic asked for.

**Weakest point: the metaphor lives in the names more than on the page.** The
plates are the same river, canon and rings the other directions draw; what is
new is the field guide's vocabulary. The river is absent from the phone's
first screen, so on the device most readers hold, the signature appears on
screen three. Every question-shaped page carries a stations rail and a depth
switch, and the glyph program (seven regions, seven eras, a glyph per study
kind and about fifteen instruments) is large enough to turn into a decorative
icon set. Together with a question-first index, the risk is a beautifully
organized help desk (the direction names this risk itself) rather than a
publication with a voice.

### 3.4 The Week: 70

**Strongest point: the objects a reader can hold, and the prayer book's
typography.** *For Sunday*, the week on one Letter or A4 page with the
dateline, the week's word, the readings, the catechism question in both
registers and a QR code, is a designed print artifact a church lobby would
keep. The season as a numbered issue ("No. 1 · Advent 2026") with a
half-letter booklet gives the essay shelf a shape in time. The newspaper
dateline in the header ("Tuesday, December 1 · Advent, the first week") is a
living masthead that changes without moving. The office's typography (rubrics
in Inter caps in `--ink-muted` that the reader may hide, the words to say in
the text serif, lines said together in Inter 500) is the best thinking in the
four about setting words to be spoken.

**Weakest point: the cover is a planner widget.** The lead object on Home is a
white card with a seven-day strip, today ticked in mustard, and five rows
labeled READ, LEARN, TABLE, THINK, PRAY in 11px caps. However strict the rules
behind it (and its refusals are the most rigorous of the four: the strip never
marks a day the reader did something, and a component test says so), the form
is the habit app's form, the visual family the research found buying
attention. A stranger reads it as a to-do list before he reads it as the
church's year. The year band, the better drawing, sits on the second screen.
It is the least weighted first screen of the four, and it adds the most new
page types (the week, the day, the year, seasons, the print view) for a site
whose critique asked for fewer, truer things.

---

## 4. The winner: The Long Memory

It wins this seat because it is the only direction that gives LiveWell a face.
The other three would produce a better-run version of the site the critics
described as "a very well-configured editorial template." The Long Memory
produces a site recognizable from one drawing, whose drawing is also its
thesis, and it holds that drawing to a grammar strict enough that many hands
can extend it without ornament creeping in. Its mustard rule has a meaning; its
black is spent on the hero and the ending; its images are witnesses; it never
animates the Line.

What a director corrects in it before anything is built:

1. James's sentence on the home hero in full `--charcoal-fg`, never
   `--charcoal-fg-muted`.
2. No Cormorant below 22px anywhere, including captions and deks. The Line's
   caption and every dek move to the text serif's italic at 19 to 22px (Inter's
   true italic if James declines the serif).
3. The phone portrait at 64 x 80 at least, a real photograph when James
   supplies one.
4. Black on Home for the hero and the ending only. *Twelve weeks, twelve turns*
   moves to cream; the twelve rows do not need the verdict's weight.
5. The Line's phone variant is drawn and judged at 390 before the desktop one
   is polished, with the five-label limit and the collision check in CI from
   the first commit.
6. The house line drawn from `covenant.svg` with one mustard mark, not five.
7. Keep James's five doors (the direction's own stated fallback): History as
   the first row of Study, with the Line leading `/study`. Let "by James Bell"
   in the masthead also open About; a nameplate that opens the person costs
   nothing and loses no door.

---

## 5. What the Long Memory grafts from the others

### 5.1 From the Study Desk (the reading surface)

1. **The desk grid as the one page shape**: contents rail 200px from 1280px,
   48, text 640 to 680px, 48, margin 280 to 320px, used by the chapter, the
   essay, the history session and the era essay alike. It replaces the Long
   Memory's 680/48/240 so the verse panel and sidenotes share one margin.
2. **The chapter's first screen and text setting** (Study Desk 5.2): the
   compact head with the 6px band, the two-line summary, the outline's
   headings set in the text as Inter 500 small caps over a hairline, verse
   numbers in `--ink-muted` with a 40px hit area, a hollow dot on noted verses,
   verse 1 by about 420px, a full-width "John 2" at the last verse, the
   auto-hiding bottom bar (previous, the book and chapter picker, next, Aa,
   Listen). The Long Memory's act band and "When" line sit in that head.
3. **The five labels of who is speaking**, Inter 500 small caps over a
   hairline, no color, the same words site-wide, enforced as a mapping of the
   verse-note fields by `validate-bible-notes`. The Long Memory's dated strip
   becomes the visual form of the "The church's witness" label.
4. **The pencil marks**: a hairline bracket in `--ink-muted` in the left
   margin for a marked verse, a small filled dot for a note, no highlight
   color, all on the device with export.
5. **Read, Study, Teach** as one 44px segmented control under the chapter
   title, Read by default from the household and plan doors.
6. **The selected verse's 2px mustard rule in the left margin**, the screen's
   one mustard mark, which is the Long Memory's own rule (mustard means
   *this*) applied to the verse.
7. **The ten-step type scale and spacing tokens** (Study Desk 6.2, 6.3) as the
   declared scale, with the phone gutter held at the plan's 16px.
8. **The week's verse as a specimen on Home**: "THIS WEEK · JOHN 1:14" and the
   verse in the text serif at 22/33, prerendered, opening the real verse panel
   when tapped. It belongs in the Long Memory's *This week* band, not the
   hero, which already holds the Line.
9. **Trace the argument** on the ten to twelve load-bearing passages, one mark
   per step, all marks at once under reduced motion.

### 5.2 From the Field Guide (composition and discipline)

1. **The desktop cover's lower strip**: under the black hero, on the same
   1440 x 900 screen, a cream strip with the reader rows in Cormorant 22px in
   columns, skeptic first ("Not sure you believe any of this?" opening Test the
   Case). It replaces the Long Memory's placement of Find and the skeptic's
   door at the hero's foot on desktop and its *Start where you stand* band
   further down.
2. **The drawings as a finite, captioned series** in `components/plates/`
   with `.pl-` classes: a caption whose first sentence states the point, one
   plate per screen, and a rule that a new drawing needs a place in the series
   before it is drawn. The Line is the first of them.
3. **"Only one margin per side"**: notes and the verse panel on the right, a
   contents or stations rail on the left, nothing else in either.
4. **Mustard text only in a page's first kicker**; later section labels in
   `--ink-muted`. It sits beside the Long Memory's four uses.
5. **The dek in the text serif's true italic**, in ink, two or three lines.
6. **The masthead descriptor** from 1100px, Inter 13px `--ink-muted`, once
   James chooses one tagline.
7. **Care cards graded by urgency** that raise the voice by words and
   position, never by color, and the crisis lines as three 44px buttons.

### 5.3 From The Week (a dated, held publication)

1. **The dateline** on desktop beside the wordmark, Inter 12px small caps in
   `--ink-muted`: the date, and the season's plain name inside the great
   seasons. It is the Long Memory's second clock made visible in the masthead
   with no motion. On a phone, only on Home, `/family` and Tonight. The header
   is James's to change.
2. ***For Sunday***, the week on one printed page with a QR code, and the
   season booklet as a numbered issue in half-letter, both set in the house
   type. These are the objects that leave the screen.
3. **The prayer book's setting** for table mode, Tonight's prayer and any
   prayer the site prints: rubrics in Inter caps `--ink-muted` with "Hide
   instructions," words to say in the text serif, lines said together in Inter
   500.
4. **The week's word set large** (`--t-word`, 22 to 26px in the text serif) as
   the first thing after the title on Tonight.
5. **The strip rule and its test**: the 52-tick year strip shows the calendar
   and today only, never a mark for anything the reader did, with a component
   test that it reads no storage but the date.

### 5.4 Not grafted

The Study Desk's white card of counted rows as the home hero, and its cream
home with no black. The Field Guide's stations rail on every question-shaped
page (keep it for long care and topic pages only) and its full glyph program
before the first seven glyphs have been drawn and judged. The Week's week card
with its seven-day strip as Home's lead object, and its four new top-level
addresses until the reading surface has shipped.

---

## 6. What must not be lost in any merge

1. **One signature drawing, still and to scale.** The Line with certainty
   drawn, one mustard "You are here," a list equivalent, every mark a real
   button, never animated on load, never zoomed.
2. **One drawing vocabulary.** Lines, ticks, bands and cells in the house line;
   position and label carry meaning; color never does; each drawn for 390 and
   about 880px with live text labels.
3. **Mustard with a meaning.** One non-link mark per viewport, meaning *now*
   or *this*; `--mustard-text` for any mustard text on a light surface; never a
   fill, a background, a card bar or a word in a headline.
4. **Black only where weight is earned.** The home hero, a rare verdict band,
   the ending merged with the footer. Inner page heads on cream with
   `PageHead`. One paper from title to end mark inside every long read.
5. **Three faces with three jobs.** Cormorant for display only and never below
   22px; a self-hosted text serif with a true italic for Scripture, essays,
   notes, creeds, prayers and devotions (or Inter's true italic if James
   declines); Inter for the interface. A declared scale as tokens.
6. **Scripture set as Scripture.** Headings in the text, quiet verse numbers,
   verse 1 on the first phone screen, block Scripture with its reference
   beneath, the creed in sense-lines as the page's summit, prayers set to be
   said.
7. **One long-read template** with notes beside the text, the first sentence
   on the first phone screen, an end mark, real silence, one next read, the
   book as a line, one newsletter form.
8. **Labels of who is speaking**, in small caps over a hairline, no color.
9. **Images as witnesses or absent.** Public-domain works with verified
   captions, real photographs of James and his rooms, a drawn wordmark and
   monogram, glyphs in the house line replacing stock icons; no generated
   covers.
10. **The refusals, written as rules.** No streaks, counts of people, carousels,
    autoplay, parallax, scroll-triggered reveals, chart or map library, or
    zoomable canvas; motion only for a change of state; the reader's own words
    stay on the device.
11. **The cover's two duties.** James's face at a size you can read with his
    atheist sentence in full-strength type, and the skeptic's door in his own
    words, both on the first phone screen.
12. **Night as one low band**, offered in the Aa menu and following the
    system, after the hero token audit.
13. **One phone gutter**, 16px, held as a token.

---

## 7. Not verified

No direction was rendered. Positions and sizes in all four documents are their
authors' estimates, and mine judge the specifications, not pixels. The Line's
legibility at 358px, the label collisions, and the weight of the hero SVG are
claims to test on a preview before James sees a prototype. I did not check the
licences or file sizes of Source Serif 4 or Literata, or the history
registry's dates the Line would draw.
