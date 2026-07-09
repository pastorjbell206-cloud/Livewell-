# The Corpus Ledger

> Deliverables 2, 3, and 4 of the Corpus Audit (`docs/CORPUS-AUDIT-PROMPT.md`),
> scored against `RUBRIC.md`. Tier one (the twelve distribution leads) got a
> full per-essay read; tier two (the other 301 published essays) got the
> five-minute rubric. Tier-one reports live in `tier1/`; the tier-two scores
> were aggregated from eight parallel auditors.

## The one-line finding

**The writing that exists is excellent. Roughly half the essay URLs have no
writing behind them.** Of 299 non-lead essays, 154 are stubs under 600
characters — catalog abstracts ("This article explores…") published at real,
indexable URLs with nothing to read. Every genuine long-form essay scored SOLID
or better; 29 are FLAGSHIP. The audit's real output is not "rewrite bad essays."
It is: **protect the depth that exists, and get the placeholder stubs off the
public site before distribution traffic — skeptics first — lands on one.**

## Tier one — the twelve distribution leads

| Essay | Tier | The issue |
|---|---|---|
| The Atheist in the Pulpit | **FLAGSHIP** | — model of the skeptic register |
| Did the Resurrection Actually Happen? | **FLAGSHIP** | — citations all sound |
| Why Would Anyone Trust the Bible? | SOLID | check 8 (tic) only |
| What the End of Christian America Actually Means | SOLID | — |
| How to Preach to a Politically Divided Church | SOLID | check 8; even-handed (6 right / 4 left) |
| When Your Teenager Says They Don't Believe Anymore | SOLID | check 8 only |
| The Pastor Nobody Checks On | SOLID | 3 citation flags to clear before PCN hand-off |
| What If Christianity Is Wrong? | REVISE | fixable in one pass |
| When the Church Is the Thing That Hurt You | REVISE | checks 8/9/11 + verify Ezekiel 34 / Matthew 18 quote precision |
| What If You're Done With Church but Not With Jesus? | REVISE | two load-bearing citation flags |
| The Church Grew Fastest When It Had No Power | REVISE | checks 4/8/11 |
| The Slow Drift That Ends More Marriages Than Affairs Do | ~~CUT~~ → **FIXED** | Song of Solomon 2:15 was attributed to Jesus — corrected this pass |

Ten of twelve are Solid or better; the two Flagships lead. The lone Cut was a
citation failure in an otherwise near-flagship piece and **is repaired in this
PR** (see Repairs). The five Revise leads share one cheap, high-value fix each —
none is a trust or formation failure; all are one pass from Solid.

## Tier two — the corpus sweep (299 unique essays)

| Tier | Count | Meaning |
|---|---|---|
| FLAGSHIP | 29 | lead with these |
| SOLID | 136 | ship as is |
| REVISE | 123 | a named, fixable failure |
| CUT | 11 | trust damage to leave up |

**Stubs (body < 600 chars): 154** — 11 of the Cuts, 118 of the Revises, and 25
that still passed as short-form. This single category explains most of the
Revise tier. They are not badly written; they are **not written** — the essay
promised by the title and URL does not exist.

### The eleven Cuts

Nine are catalog stubs — the title and URL are live, the body is a 20–47-word
abstract:
`when-god-bless-america-replaces-thy-kingdom-come`,
`stop-performing-start-pastoring`, `learned-from-pastor-disagrees`,
`pastors-kids-watching-what-seeing`, `five-sermon-habits-shrinking-faith`,
`most-dangerous-person-church-staff`, `reformed-charismatic-pastors-same-table`,
`talk-global-missions-moves-congregation`,
`ai-authenticity-pastor-artificial-intelligence`.

Two are short fragments carrying an actual trust defect:
- `stranger-at-gate` — quotation marks around "Scripture" that matches no
  translation and carries no reference (plus a typo). Fabricated-quotation risk.
- `the-long-arc` — opens with the "arc of the moral universe bends toward
  justice" line (Theodore Parker via King) as the writer's own words,
  unattributed. A skeptic-facing attribution failure.

### The twenty-nine Flagships (lead-with list)

`affirmation-is-not-love`, `nostalgia-is-not-the-kingdom`,
`the-father-wound-and-the-god-question`, `suffering-without-explanation`,
`excavation-not-demolition`, `authority-we-traded-for-authenticity`,
`pastoring-a-captured-congregation`, `depression-or-the-dark-night`,
`cheap-grace-left-hand`, `strongman-theology`,
`the-last-nonpartisan-in-the-room`, `if-god-is-good-why-suffering`,
`a-whole-life`, `conscience-outsourced-to-party`, `the-flag-in-the-sanctuary`,
`protecting-marriage-in-ministry`, `deconstruction-without-reconstruction`,
`constantines-bargain`, `when-god-is-silent-and-the-room-is-empty`,
`the-machine-that-forms-you`, `right-side-of-history`, `the-third-temptation`,
`the-hour-that-forms-the-week`, `the-sin-we-stopped-naming`,
`raising-sons-manhood`, `the-end-of-home-field-advantage`,
`when-justice-becomes-a-gospel`, `when-the-pulpit-became-a-precinct`,
`what-a-christian-owes-the-city`.

### Citation flags

139 essays carry at least one citation the sweep could not stand behind without
owner verification. The dominant kinds, in order: NIV/other wording where the
house default is ESV; unnamed "studies"/"surveys"/"research"; and round-number
statistics ("three hundred times," "3 to 1") that need a source or should come
out. These are a verification pass, not a fabrication finding — but the trust
standard means they get closed before a piece takes skeptic traffic.

## Repairs (deliverable 4)

The rubric's "rewrite the worst ten" assumes flawed *essays*. Here the worst
pieces are mostly **missing** essays (stubs), and mass-generating a dozen essays
to cover placeholder URLs is exactly the volume-over-weight move the platform
refuses. So the repairs are surgical and honest:

- **Done this pass:** the one genuine essay-level defect — the Song of Solomon
  2:15 misattribution in the marriage lead — corrected in
  `client/src/data/content-data.json` (the little foxes now attributed to the
  Song of Songs; Jesus keeps the thorns of Matthew 13:22).

**Owner decisions (stateful — not done unilaterally):**
1. **The 154 stubs**: unpublish, `noindex`, or exclude from the sitemap and the
   distribution plan until real essays exist. Highest urgency: the nine Cut
   stubs and any stub whose title makes a promise a skeptic will test
   (`ai-authenticity-…`, `when-god-bless-america-…`). I can wire a
   published-length guard so a sub-600-char body cannot surface in the sitemap
   or listings — say the word.
2. **The two trust fragments** (`stranger-at-gate`, `the-long-arc`): unpublish,
   or I fix the specific defect (drop the fake quote; attribute the King/Parker
   line) — but each is still a stub underneath.
3. **The five Revise leads and the 139 citation flags**: I can run the one-pass
   fixes on the leads now (they take distribution traffic first) as a focused
   follow-up.

## What to do before the distribution engine runs

Lead weeks with the two Flagship leads and the Solid ones. Hold the five Revise
leads until their one-pass fix lands. Get the stubs out of the sitemap and the
distribution triage first — a skeptic who clicks a shared essay and hits "This
article explores…" is the exact reader the whole platform is built to keep.
