# Judge: the pastor's seat

One of the judges for step 3 of the design program (`docs/work/NOTES.md`,
"James's redesign brief"). Prepared 2026-10-27.

**The seat.** I am a pastor in the Pastors Connection Network. I am deciding
two things: whether to hand LiveWell to my congregation, and whether to run a
small group on it. I care about four things, in this order of how they would
cost me if they went wrong. Is it *useful* to me and my people this month? Is
it *deep* enough that a thoughtful member grows rather than consumes? Is it
*safe* to hand to a hurting member, a teenager, a skeptical husband, without
partisanship, manipulation, or a voice that sounds like Scripture and is not?
Is it *organized* so I can say "go here and do this" and they can?

**Read for this judgment.** `CLAUDE.md` in full; `CRITIQUE.md` and the critic
reports (`learning.md`, `product.md`, `ia.md` in full; `visitor.md`,
`mobile.md`, `brand.md`, `editorial.md` for their verdicts and every finding
on crisis care, pastors and groups); `A-SYNTHESIS.md`, `B-SYNTHESIS.md` and
`C-SYNTHESIS.md` through their ranked patterns and tensions; `MASTER-PLAN.md`
sections 0 to 3 and 10.6; `NOTES.md`; the current phone and desktop
screenshots of home, John 1, Find Help, Tonight, church history, Test the Case,
Study and Resources; and all four directions in full (`study-desk.md`,
`field-guide.md`, `long-memory.md`, `the-week.md`). I did not read the other
judges' files.

---

## 1. Checked in the repo, because it changes what a pastor would get

Every direction leans on the Study Bible's chapter notes, and two of them state
coverage the data does not have. On the work branch
(`claude/todo-implementation-hhp4bm` at 53136af5), counting the 1,189 files in
`client/public/bible/notes/<book>/<n>.json`:

| Field | Chapters | What the directions say |
|---|---|---|
| `summary`, `story`, `historical`, `cultural`, `literary`, `outline`, `doctrines`, `words`, `christ` | 1,189 | Correct everywhere |
| `questions` (three per chapter) | 1,189 | Correct, but typed as `{observe, interpret, apply}` in only **114**; the other 1,075 are a plain array of three untyped questions |
| `hard` (a question with an answer) | **1,033** | Study Desk, Field Guide and A-SYNTHESIS say 114. The real figure is far better |
| `teach` (`big`, `outline`, `pitfalls`, `pastoral`) | **114** | Study Desk says all 1,189. Wrong |
| `interpretation` (dated church readings), `text` | 114 | Correct |

The 114 rich chapters are the four Gospels complete (89 chapters) and 25
scattered Old Testament chapters. No epistle has `teach` notes, typed
questions or dated church readings.

What this means from my chair: a group reading Mark or John gets the full
Teach depth the Study Desk describes. A group reading Romans, Ephesians,
Philippians, James or 1 Peter, which is most small groups most of the time,
gets a summary, an outline, three untyped questions and (usually) a hard
question with its answer. That is still a usable leader's sheet, but it is not
the `big`, `pitfalls`, `pastoral` sheet the Study Desk promises "for any
chapter." The good news runs the other way for the skeptic in my pews: a hard
question at full strength already exists for 1,033 chapters, so "The question
this chapter raises" can ship almost everywhere, not in one chapter in ten.

The 68 group guides (`client/public/studyguides/`, 68 plus `index.json`) carry
`leaderPrimer`, `facilitatorScript`, `cadences`, `promoKit`, and per session
`timing`, `discussion`, `objections`, `quietRoomQuestion`, `practice`,
`closingPrayer`. That is the strongest small-group asset on the site, and I
judged each direction partly by what it does with it.

---

## 2. Criteria and weights

| Criterion | Weight | What earns the points |
|---|---|---|
| **Small-group usefulness** | 25 | Leader preparation, a printable sheet, running a session in a room, dated runs a whole group can join, handouts, a closing for the last meeting |
| **Depth and doctrinal soundness** | 20 | Scripture first; the church's witness dated and verified; who is speaking labeled; steelman before verdict; the order of a contested question named; formation, not information |
| **Safety** | 20 | Crisis care that a frightened person can use; no partisan tilt (the guardrail fires both ways); no streaks, counts or push; privacy; honest about gaps and corrections; nothing a Baptist congregation would have to unlearn |
| **Organization and findability** | 15 | A mixed congregation (the deacon, the teenager, the doubter, the parent) can find the right page; one search; one home per thing; links I can send |
| **Congregational fit** | 10 | It sends people back to their own church and table rather than replacing them; it fits a Sunday-shaped life; households and adults on the same page |
| **Deliverability** | 10 | Lands when my church would use it (the January 1 read-through, Lent, Easter); built on what exists; honest about James's time |

---

## 3. Scores

| Direction | Small groups (25) | Depth (20) | Safety (20) | Organization (15) | Congregation (10) | Deliverability (10) | **Total** |
|---|---|---|---|---|---|---|---|
| **The Study Desk** | 20 | 19 | 17 | 13 | 7 | 8 | **84** |
| The Week | 22 | 14 | 16 | 11 | 10 | 8 | **81** |
| The Field Guide | 19 | 15 | 18 | 14 | 7 | 7 | **80** |
| The Long Memory | 20 | 18 | 16 | 11 | 7 | 6 | **78** |

### The Study Desk: 84

This is the direction I would hand to my people first, because it is the one I
would use myself on Thursday night. Any verse opens one panel, in a fixed
order, with every layer labeled by who is speaking: *Scripture* with its
translation named, *The church's witness* dated and verified, *Study note*,
*James Bell*, *Your notes*. That labeling is the single most important safety
feature in the four documents for a pastor. A member who reads James's
judgment beside John 1:14 knows it is James and not the text, and knows
Irenaeus wrote around 180 and not last year. Read, Study and Teach on the
chapter serve the new believer and me from one page without two products, and
the Teach depth's printable leader's sheet is exactly what I would hand a
first-time group leader. It is also the only direction that rebuilds the
chapter page before the 2027 read-through sends my whole church to a chapter
every day from January 1. Search that answers "grace" with a definition card,
Ephesians 2:8-9, the doctrine and the glossary before anything else repairs
the most embarrassing thing on the site today.

**Strongest:** the verse panel plus Read, Study and Teach, with every layer
labeled by who is speaking and a printable leader's sheet, on the page my
church will open daily from January 1.

**Weakest:** the room comes late and the household is only "offered" the
desk. Room mode and dated runs for the 68 guides are Phase 4 (from March 29);
the twelve-week course is unspecified pending James; care pages get no named
work beyond a nod to urgency cards in a reader table; and its claim that
`teach` notes exist for every chapter is wrong (114, the Gospels and a few
others), so the leader's sheet for Romans or James will be thinner than the
document implies.

### The Week: 81

The Week is built the way a congregation actually adopts anything: a week that
begins on Sunday, *For Sunday* on one printable page with a QR code to its
address, courses a pastor starts for his whole group on a date with one link
and one calendar file for every meeting, and, best of all, the adults reading
the whole chapter behind the verse their children hear at the table that night.
Its refusals are the strictest of the four and are written as rules a reviewer
can check (the seven-day strip never marks days done; no "you missed"; prayer
names never leave the device; no third-party script on the day's page). If I
could only send one link to my church, it would be `/week`. It loses on depth
because it says so itself: the reading surface, search and consolidation are a
"shared lane" it depends on and does not design.

**Strongest:** the Sunday-shaped week and *For Sunday*, the dated course a
whole group joins by one link, and adults and children on one passage.

**Weakest:** the depth is outsourced, and the daily office (a Compline psalm,
the Examen) and the church-year naming are identity calls I would have to vet
before handing them to a Baptist congregation; four clocks risk weeks that
feel random, and it adds four top-level addresses without fixing the library.

### The Field Guide: 80

The safest direction for the member who comes to me in trouble. One Guide
registry places all 40 care pages, the Honest Answers and the cases in the
reader's own words; care pages grade urgency into *This week*, *Today* and
*Now*, and the *This week* card says "Talk to your pastor or a counselor this
week if," which sends people back to me rather than away from me. Exit this
page finished to GOV.UK's tested standard, free text from sensitive searches
kept out of URLs, review dates shown from data the care files already store,
and a validator that fails a numbered takeaway box: this is pastoral care
designed by someone who has sat in the room. Every entry ends "At the table,
and with your group," and Home has a row in my words, "I lead a church or a
small group." It loses on depth and timing: the descent is real but the entry
point is the need, the field marks and region heads wait on James's writing,
and the chapter page work lands after January 1.

**Strongest:** care made safe and findable, urgency graded, a door back to
the local pastor, and every topic ending with its group study.

**Weakest:** a question-first front door can read as a help desk (the
therapeutic religion the guardrails name), the chapter work misses the January
read-through, and it asks James to reverse his "Topics" label and door order a
day after he chose them.

### The Long Memory: 78

The best adult Sunday-school curriculum of the four. *Twelve weeks, twelve
turns* is a finished shape: each sitting opens with last week's question, reads
a passage, opens a dated hinge, grounds a creed line, carries it into the
present through one essay, and ends with a question to write; it is dated for
a church, printed, and offered at a Teaching depth with a leader's sheet. Its
worked week on Nicaea (John 1:1-18, "of one substance with the Father," the
Great Councils essay, Athanasius's *De Decretis* from the stored corpus) is the
most concrete piece of teaching design in the four documents. The facing page
(the losing side first) and *Compare the witnesses* (Thessalonica in 390 from
three stored sources) are how I would want a contested moment taught. It loses
on organization and timing: time is the right spine for the history class and
the wrong one for the Tuesday-night Bible study or the hurting member; the
sessions arrive Part by Part until September 2027; it would replace About with
History as a door; and it specifies no room mode.

**Strongest:** *Twelve weeks, twelve turns* and the history sessions with
leader notes, 45- and 75-minute plans, handouts and the facing page.

**Weakest:** a time-first site serves the class better than the congregation,
and most of its course does not exist until late 2027.

---

## 4. The winner: the Study Desk

It wins my seat because the thing I most need to trust before I hand a site to
my people is that they will know whose voice they are reading, and the Study
Desk makes that the grammar of every page. It is also the deepest, it keeps
James's doors (I have already told my people where to look once this autumn),
and it fixes the page my church will open every day in 2027 in time for 2027.
The Week is the better congregational wrapper and the Field Guide the better
pastoral-care layer; both should be grafted in, and neither replaces the desk.

---

## 5. What the Study Desk should graft, concretely

From **The Week**:

1. **The composed week and its print view.** `scripts/build-week-map.mjs` and
   `lib/week.ts` (`weekOf`, `dayOf`) behind `/week/:sunday`, and
   `/week/:sunday/print` ("For Sunday": one Letter or A4 page with Read for
   each day, the catechism question with the adult and child answers, the
   table devotion, one question *For the room*, *Carry*, and a QR code),
   absorbing U20. This replaces the Desk's Phase 4 `/study/this-week` and its
   four-line Home "This week," and comes forward to Epiphany at the latest.
2. **The Read rule and the catechism season pins.** In a week a daily set
   serves, adults read the whole chapter behind each night's table verse;
   otherwise the 2027 plan's day. Q25 to Q27 in Advent, Q31 to Q33 at Easter,
   Q4 on Trinity Sunday, approved once by James.
3. **Courses that begin on a Sunday.** `lib/runs.ts` with `?start=&cadence=`,
   one calendar file for every meeting, a printed schedule, and the two equal
   choices after a gap ("Pick up at week 3" or "Join this week at week 5"),
   applied to `/plans/:slug` and all 68 `/studyguides/:slug`. Move it from the
   Desk's Phase 4 to Phase 2, so I can launch a dated run in January.
4. **The refusals as a gate.** Section 6.10's rules as a copy check
   (`validate-rhythm-copy.mjs` or a rule in `validate-design.mjs`) and a
   component test, applied to the Desk's canon map fill, pencil marks and
   "I've answered these," which are the Desk's own places streak creep could
   enter.
5. **The printable closing for a group's last meeting.** The look-back of
   about eight questions, a prayer the church has prayed, the readers' own
   lines read back, and the next door with its date.

From **The Field Guide**:

6. **Care cards and a safe exit, as a named unit before Lent.** `moreHelp.cards`
   graded *This week* ("Talk to your pastor or a counselor this week if:"),
   *Today* and *Now* (the *Now* card holding only the crisis lines, required on
   every high-sensitivity page); Exit this page finished to GOV.UK's standard
   (three presses of Shift, the blank overlay, the first-time explanation);
   "Page last reviewed" and "Next review due" rendered from the `reviewed`
   record all care files already store.
7. **One Guide registry behind Topics.** `client/public/guide/index.json`, built
   from the needs index, the topics rows, the 35 Honest Answers and the nine
   cases, so `/help`, `/topics` and `/answers` are views of one file. Keep
   James's label, Topics.
8. **A door in a pastor's own words.** A row on Home and in the Study router,
   "I lead a church or a small group," opening a leaders view (`?for=leading`)
   that gathers Teach depth, the leader's sheet, room mode, dated runs, For
   Sunday, *Host a table* and the reuse line.
9. **Every topic and Honest Answer ends with its group.** "At the table, and
   with your group": the matching study guide with a dated run, the handout,
   *Host a table*.
10. **Sensitive searches stay out of URLs.** Free text that matches a
    high-sensitivity care page is never written into the address (Smart
    Answers ADR 002); the result carries the page's slug instead.

From **The Long Memory**:

11. **Twelve weeks, twelve turns as the Desk's first course.** Twelve sittings
    of thirty to forty minutes in a fixed order (last week's question; the
    passage on the desk at Read depth; the hinge sheet; the creed line; one
    essay; one question to write; a closing), dated for a church, with a
    Teaching depth and leader's sheet. Pilot it on week 4, Nicaea, exactly as
    written. It fills the Desk's unspecified "Twelve weeks" and launches on the
    era essays that already exist.
12. **The creed's date rail and "Where the words came from."** A hairline down
    the creed's left edge with a tick at the year each article was fought for,
    and each phrase's note in a fixed order: the year and council, the question
    that forced it, the losing side's words where a reachable text exists, the
    defender's words (Athanasius's *De Decretis*, stored), the Scripture it
    rests on. Joined to the Desk's phrase-in-the-margin creed page.
13. **The hinge sheet, the facing page and three depths in history sessions.**
    *The world before, What happened, The world after, What we still carry,
    The road to it*, with the witness label; the facing page with the losing
    side first; *Compare the witnesses* on Thessalonica 390; and the session
    switch *In five minutes, The session, At the table* for a group with
    forty minutes, not ninety.

---

## 6. What must not be lost in any merge

These are the conditions on which I would hand the site to my congregation.

1. Find Help in every header with crisis lines first; three full 44px crisis
   buttons on `/help` and every care page; crisis words outranking every search
   pin; Exit site; care pages that open on the practical step, not the lecture.
2. Every layer labeled by who is speaking, with the translation named at the
   point of quotation, so no member takes a study note or James's judgment for
   Scripture.
3. The group guides' leader primer, timing, facilitator script and the answer
   behind every question, and a printable leader's sheet from any chapter,
   honest about which chapters have full `teach` notes.
4. Shareable state in the URL (a verse view, a week, a course start date) and
   nothing recorded about who in my church used anything: no accounts, notes on
   the device with export, and the house's honest save-failure line.
5. Position, never performance: no streaks, badges, percentages, counts of
   people, push notifications, or "you missed."
6. Steelman before verdict: the objection at full strength, "What this does not
   settle," positions at equal length, the order of a contested question named,
   second-order questions left open, and the both-directions politics check on
   every politics surface.
7. Only verified sources (the U07 verifier), dated, with paraphrase marked as
   paraphrase, and an honest "not yet written" in place of padded counts.
8. The family table loop as built (Read, Talk, Ask, Do, Remember, Pray; table
   mode; *Read and pray* as the smallest faithful version; "We did this
   tonight" as a plain button).
9. The skeptic's door on Home's first screen in his own words, and
   skeptic-facing pages that ask him for nothing.
10. *Take it with you* on every long page, and one plain reuse line once James
    picks a license, so I know I may copy a page for a bulletin or a group.
11. James's five doors as he chose them on 2026-10-26, with Doctrine a named
    room under Study. A congregation told where to look should not be told
    again in a month.

---

## 7. What I did not verify

No direction was rendered; first-screen positions are the directions' own
estimates. I did not open the 68 group guides one by one, read any care page's
`reviewed` note, or check the Search Console data any direction asks for. The
field counts in section 1 are from the work branch at 53136af5 and were not
compared against `main`. I did not ask a PCN pastor; B-SYNTHESIS 4.1 is right
that a handful of real ones, asked through James, outranks this seat.
