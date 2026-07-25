# State of the site — the one page

The single place to look. If something is being worked on, waiting on a decision, or
already done, it is on this page. When it changes, change it here rather than starting a
new document.

Last updated: 25 July 2026.

---

## 1. Why it feels jumbled

It is not a feeling. Both the site and the work on it have outgrown their organization.

**The site.**

| | Now |
|---|---|
| Routes | 262 |
| Page components | 240 |
| Links in the header | 33 |
| Links in the nav data | 50 |
| Separate "where do I start" flows | **5** |
| Competing taxonomies | **2** (the five pillars, and the homepage/nav "wings") |

A visitor arriving cold meets five different front doors that do not agree with each
other — `/start`, `/start-here`, `/diagnostic`, `/tools/which-lens`,
`/theology/which-view` — and two different names for how the writing is organized
depending on whether they read the homepage or `/pillars`. Nothing here is badly made.
There is simply more of it than any one person can hold, and no single spine.

**The work.** This is the larger half of the problem, and it is the part nobody has been
tracking.

- **30 open pull requests.** 12 are automated dependency bumps. **18 are real work.**
- The oldest has been open **51 days**.
- Several overlap each other. At least one is now obsolete.
- They come from many different sessions, none of which could see the others.

That is why it feels scattered: **work is being started faster than it is being finished.**
Each session opens a branch, does good work, and leaves it in draft. Nothing is wrong with
any individual piece. The pile is the problem.

---

## 2. The 18 real pull requests, triaged

I have read the titles, branches, and ages — **not** the diffs. The verdicts below are a
starting point for a proper triage, not a substitute for one.

Everything older than about two weeks predates two large changes on
`claude/sweet-galileo-xykZR` (the pastor removal, which touched ~285 files, and the
dark-mode standardization, ~150 files). **Most of these will conflict badly.** For older
branches it is usually cheaper to re-do the work on top of current `main` than to untangle
the merge.

### Merge or close first — they are resolved or obsolete

| PR | Age | What to do |
|---|---|---|
| **#459** dark mode, PCN move, Family tab, audit fixes | 7d | **Merge.** All gates green, preview verified. This is the current work. |
| **#214** email-gate the pastor Hard Issues booklets | 34d | **Close.** Obsolete — the pastor material moved to PCN, so there is nothing left to gate. |
| **#107, #108** backend ADRs | 51d | **Merge or close.** Docs only, no conflict risk. If the decisions still hold, merge; if not, close. |
| **#106** security and CI hardening | 51d | **Review and merge.** Called "low-risk"; security work should not sit for 51 days. |
| 12 dependabot PRs | — | **Batch them.** Merge in one sitting, oldest first, letting CI gate each. They are noise on the list and a security liability while open. |

### The ones that overlap work already done

| PR | Age | Note |
|---|---|---|
| **#376** add the `main` landmark to pages rendering nav/footer | 14d | Overlaps #459, which put a skip link in the nav and `<main id="main">` on the pages that bypass Layout. **Check what is left before merging.** |
| **#375** crisis-help coverage + advice disclaimers | 14d | Overlaps #459's `/help` work. Likely still has real content in it. **Re-check against current `/help`.** |

### The ones that are the answer to this very question

| PR | Age | Note |
|---|---|---|
| **#216** IA overhaul Phase 0 — route map + brief | 34d | **This is the "organize the site" work**, drafted and then left. Read this first. |
| **#110** two-level navigation (pillars → sub-pathways) | 46d | **This is the fix for the 33-link header.** Also left in draft. |

Both were opened, then work continued around them for over a month. Whatever else happens,
these two deserve a decision before anything new is started.

### Still live, unreviewed

#486 group guides batch 3 · #480 a draft essay · #377 depth-board docs · #374 admin bundle
perf · #370 author SEO entity · #368 analytics funnel · #365 reader's-journey links · #310
Vision Program prompt · #109 hot-path perf.

---

## 3. What is already decided and done

Shipped and verified this session, on #459:

- **Dark mode** standardized across ~150 files and re-enabled; 21 real colour bugs fixed.
- **The pastor and leadership material** moved to `archive/pcn-handoff/` — 6.6 MB, 224
  content files, 30 pages, intact and inventoried. Old URLs redirect to PCN. A **Family
  tab** replaces it in the nav.
- **After Christendom** merged into Living Well After Christendom. Five pillars now.
- **The homepage no longer contradicts itself** on the pillar count, and its hero no longer
  opens "For believers" — which excluded the skeptic, the stated first audience.
- **A skip link** on every page; member-facing inputs labelled.
- **`/help`** got its door back for someone running on empty.
- **One title per page** — four routes were serving a different title to a crawler than to
  a browser. Now guarded in CI.

Two standing documents: `docs/PILLARS-AFTER-PCN.md` (taxonomy) and `docs/DESIGN-REVIEW.md`
(design, including the four findings that turned out to be wrong).

---

## 4. Waiting on you

1. **Merge #459.** Everything else is downstream of it, and it grows more expensive to
   merge each day other branches age.
2. **The 93 pastor essays** are still published on `/writing`. They are database rows, not
   code — see `archive/pcn-handoff/pastor-essays-in-database.md` for every slug and the safe
   order: publish on PCN, redirect, *then* unpublish. Deleting outright forfeits the traffic.
3. **Read #216 and #110** before commissioning any new organizational work. The plan may
   already exist.
4. **The remaining pillars** — Justice, The Household, Faith Under Question — need landing
   pages written in your voice. This should be written, not generated.

---

## 5. What I would do, in order

1. **Merge #459.** Get the big change in before it rots.
2. **Clear the dependabot 12** in one sitting.
3. **Close #214**, and decide #106/#107/#108 — that is five PRs gone in an afternoon.
4. **Read #216 and #110.** Decide whether to revive, rebuild, or close. This is the actual
   answer to "the site feels jumbled."
5. **Then, and only then, pick up the structural work** — the five start-here flows and the
   two taxonomies. Both are decisions about what the site *is*, and they want you.

The discipline worth adopting, whatever else happens: **finish or close before starting.**
Eighteen open branches is not eighteen projects in progress. It is eighteen unfinished
things, and the cost of each one is paid again every time anybody touches the repo.
