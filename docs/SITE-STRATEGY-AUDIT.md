# LiveWell by James Bell — Site Strategy Audit & Transformation Plan

*A board-of-experts audit commissioned to turn a rich but sprawling content library
into one cohesive, mission-driven experience: a single path from a visitor's first
question to a disciple who is studying the Bible, living well, and holding a book in
their hands. The goal is not more content. It is a site that works as one thing.*

---

## 1. The mission, in one sentence

Everything on this site exists to do one thing:

> **Take a person from wherever they are — skeptic, seeker, struggling Christian,
> or pastor — and walk them into a deep, historic Christian faith they can
> understand, live, and hand to someone else.**

Four verbs carry it, and every page should serve one of them: **understand, live,
disciple, go deeper.** If a page does not clearly serve one, it is noise.

The lens that makes it distinct: this faith is recovered *underneath* the lenses of
consumerism, American civil religion, and individualism — older, churchly, historic,
and more demanding than the versions on offer.

---

## 2. The diagnosis — why it reads as a content dump

The content is world-class. The *architecture* is the problem. Six findings.

1. **Too many front doors.** There are 40+ top-level landing and hub pages
   (`/start`, `/pillars`, `/framework`, `/reading-paths`, `/library`, `/writing`,
   `/articles`, `/article-collections`, `/discipleship`, `/disciple-making`,
   `/table`, `/theology`, `/life`, `/living-well`, `/resources`, `/studyguides`,
   `/how-tos`, `/wisdom`, plus topic pages and 20+ book pages). A visitor cannot
   tell which is *the* door. When everything is an entry point, nothing is.

2. **The footer is doing the navigation's job.** The header is a minimal bar; the
   real map of the site is a 40-link footer. That is a library card catalog, not a
   guided path. World-class sites lead; this one lists.

3. **Redundant, overlapping hubs.** Several pairs say nearly the same thing:
   `/discipleship` vs `/disciple-making` vs `/table`; `/life` vs `/living-well`;
   `/theology` vs `/framework` vs `/pillars`; `/writing` vs `/articles` vs
   `/article-collections` vs `/library` vs `/reading-paths`; `/resources` vs
   `/studyguides` vs `/how-tos`. Each split dilutes the others and confuses the
   reader about where a thing lives.

3. **Content lives in silos that never connect.** Essays, the Table studies, the
   study guides, the context guides, the tools, and the 20+ books are separate
   collections. Nothing says: *for this topic, read these essays, do this study,
   then read this book free and buy the deeper one.* The reader has to assemble the
   path themselves, and most will not.

4. **Assessments lead nowhere in particular.** `/start`, `/quiz`, `/diagnostic`,
   and the topical assessments exist, but they are scattered and do not drop the
   person onto a personalized path. An assessment that does not route is a toy.

5. **The taxonomy is a filing system, not a journey.** The five pillars organize
   *the author's* mind. They do not move *the reader* from question to formation.
   A reader does not arrive thinking "I need Prophetic Disruption." They arrive
   thinking "my marriage is failing" or "I am not sure I believe this anymore."

**Verdict:** the site is organized around *what exists* (the catalog) instead of
*where the reader is going* (the journey). That single inversion is the whole
problem, and fixing it is the whole opportunity.

---

## 3. The unifying idea — one path, four movements

Replace the 40 front doors with **one visible path** every visitor can feel, made of
four movements. This becomes the primary navigation and the spine of the whole site.

1. **START — "Where are you?"** One on-ramp. A short, honest assessment that names
   the reader's actual situation (doubting, grieving, married-and-struggling, new
   believer, pastor, skeptic) and drops them onto the right **topic pathway**. This
   replaces `/start`, `/quiz`, and `/diagnostic` with one door.

2. **UNDERSTAND — "Read and get answers."** The essays, the hard questions, church
   history, and the historic faith recovered from its modern lenses — reached *by
   topic*, not by pillar. This is where a person reads, thinks, and gets answers.

3. **GROW — "Study and live it."** The Table (make disciples, study the Bible
   together), the reading plans, and the live-well practices for marriage, money,
   parenting, work, doubt. Understanding becomes formation here.

4. **GO — "Disciple someone, and go deeper."** Make disciples with the Table, and
   go deeper with the book — read the opening free, then buy it. The book is the
   end of the path, not a separate store.

Every page on the site should answer: *which movement am I in, and what is the one
next step?* No dead ends. Always a next step.

---

## 4. The new information architecture

Collapse ~40 front doors into **six primary destinations** plus a real header nav.

| Primary nav | Absorbs today's… | The reader's question it answers |
|---|---|---|
| **Start here** | /start, /quiz, /diagnostic | "I don't know where to begin." |
| **Read** | /writing, /articles, /article-collections, /library, /reading-paths, /wisdom | "I want to read and think." |
| **Answers** | /honest-questions, /faq, /church-history, /theology, /framework, /resources/context, hard-issues | "I have a hard question." |
| **Grow** | /discipleship, /disciple-making, /table, /life, /living-well, /studyguides, /how-tos | "I want to study and live it." |
| **Books** | /books, /books-store, /book-bundles, all 20+ book pages | "What should I read, and buy?" |
| **For pastors** | /pastors, /for-leaders, /leadership, /pastors-resource-wall | (the PCN channel) |

The five pillars do not disappear — they become a *filter* inside **Read**, not six
of the front doors. `/framework`, `/pillars`, `/library` become one page or
redirects. Redundant hubs 301 to their new home (the platform already does this for
`/quiz`).

**Build a real primary navigation.** Six items in the header (Start · Read · Answers
· Grow · Books · Pastors), a persistent "Start here" call to action, and keep the
command palette for power users. Retire the footer-as-map; the footer becomes a
tidy sitemap, not the steering wheel.

---

## 5. The core new system — the Topic Pathway

This is the single most important thing to build, and it is what makes "which books
go with which topics, which to read, which to buy" real. It is also the answer to
"work cohesively together."

**Model it as content-as-data** (the pattern this site already uses everywhere): a
`topics` manifest where each topic (Marriage, Doubt, Justice, Prayer, Suffering,
Discipleship, Money, Parenting, Church history, Living well, After Christendom…)
maps to an ordered pathway:

```
topic: "doubt"
  the question        -> one honest paragraph naming where the reader is
  start               -> the relevant assessment / self-check
  understand (read)   -> 3-5 essays, in order
  answers             -> the hard-questions study or context guide
  grow (study)        -> the Table study to run (e.g. faith-after-deconstruction / hard questions)
  read free           -> the book's free opening (e.g. Faith After Deconstruction)
  go deeper (buy)     -> the book to purchase
  next topic          -> where this leads (e.g. "prayer in the dark")
```

Each **Topic Pathway page** then renders that as a single, walkable journey:
*here is where you are → read this → study this → the book to read free → the book
to buy → what is next.* One page carries a person from first question to a purchased
book, with the free content doing the persuading and the book as the deeper end.

This does five things at once the site cannot do today:
- Connects the silos (essays + study + book) around the reader's real question.
- Answers "which book for which topic, read or buy" explicitly.
- Turns every topic into a start-to-finish path with no dead ends.
- Gives the assessment somewhere to drop people (a topic pathway).
- Creates a clean, honest reading-to-buying funnel on every topic.

**Start with 8-10 topic pathways** that match the four audiences and the existing
book catalog, so every pathway ends in a real book. The content already exists; the
pathway is the connective tissue that has been missing.

---

## 6. Assessments as the on-ramp (not toys)

Unify the assessments into **one "Start here"** that asks a few honest questions and
routes to a topic pathway and a reading plan. Keep the deeper topical assessments
(marriage, whole-life) but reach them *from inside* their pathway, and always end an
assessment with a routed next step, never a score and a dead end. The platform
already persists progress with the storage helper; use it so a returning reader
lands back on their path.

---

## 7. The reading-to-buying funnel (start to finish)

The user asked for "a starting point all the way to a finish of buying a book, and
help them walk through that process." The Topic Pathway is that process. Make the
funnel consistent and unpushy, in keeping with the depth-over-reach ethic:

1. **Enter** on a topic (from Start here, an essay, or search).
2. **Read** the essays free — the persuasion is the quality, not a CTA.
3. **Own the relationship** — one calm invitation to the weekly letter mid-path
   (the capture already exists on essays; make it part of the pathway).
4. **Study** the Table study — formation, still free.
5. **Read the book's opening free** — the sample already exists on every book page.
6. **Buy the book** — one clean CTA (the webhook + email fallback already ship).
7. **Next topic** — the path continues; a reader who finishes is handed the next
   door, not dropped.

No dark patterns, no funnels on crisis pages (already audited). The book is the
natural deep end of a genuinely good path, which is the only kind of selling this
platform should ever do.

---

## 8. What to do / change / cut — the roadmap

Ranked by leverage. Each is a discrete, shippable step.

**Do (build)**
1. **Define the mission and the four movements** as the site's spine (one page, one
   sentence, one path). Everything else hangs on this.
2. **Build the Topic Pathway system** (content-as-data manifest + one pathway page
   template) and ship 8-10 pathways ending in real books. *This is the flagship.*
3. **Build a real primary navigation** (Start · Read · Answers · Grow · Books ·
   Pastors) + a persistent "Start here."
4. **Unify the assessments into one "Start here"** that routes to a pathway.
5. **Map every book to its topics** (which to read, which to buy) inside the
   pathways and on `/books`.

**Change (restructure)**
6. **Collapse the redundant hubs**: `/life` + `/living-well` -> one; `/discipleship`
   + `/disciple-making` -> one (point both at the Table); `/theology` + `/framework`
   + `/pillars` -> one; `/writing` + `/articles` + `/article-collections` +
   `/library` + `/reading-paths` -> **Read**. 301 the losers (the `vercel.json`
   redirect pattern already exists).
7. **Turn the footer into a tidy sitemap**, not the primary map.
8. **Make the pillars a filter inside Read**, not front doors.

**Cut (or fold in)**
9. Retire orphan and near-duplicate landing pages that no longer have a job once
   the pathways exist; fold their content into the relevant pathway and redirect.
10. Retire any assessment or hub that ends in a dead end rather than a next step.

---

## 9. What success looks like

- A first-time visitor lands, clicks **Start here**, answers three honest questions,
  and is on a named path within thirty seconds — not staring at a catalog.
- A person with a failing marriage finds *one* page that reads their situation,
  hands them three essays, a study to run, a book to read free, and a book to buy —
  in that order, with a clear next step at every point.
- A pastor finds the Table and a small-group-ready path they can hand to their
  people, and comes back weekly.
- Every topic ends in a book, and every book is reachable from a topic.
- Nobody ever hits a dead end. Every page has one obvious next step toward the
  mission.
- The site stops feeling like a library you browse and starts feeling like a guide
  who knows where you are and where you are going.

That is the difference between a great content site and the best website in the
world on this subject. The content is already here. The path is what is missing, and
the path is buildable.
