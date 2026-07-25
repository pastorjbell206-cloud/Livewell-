# Do the pillars still work once the pastors leave?

Written when the pastoring and leadership material moved to the Pastors Connection
Network. You asked whether Prophetic Justice and the pillars are still right. Short
answer: the pillars need to change, and the reason is not taste — it is that two of the
six no longer describe the site that is left.

This is a recommendation, not a change. Nothing here has been applied.

---

## What the numbers say

The canonical spine is `PILLARS_V2` in `client/src/lib/taxonomy.ts` — six pillars under
two movements. Here is where the 283 filed essays actually sit.

| # | Pillar | Movement | Essays | Share |
|---|--------|----------|--------|-------|
| 1 | The Capture by the Right | Diagnosis | 59 | 20.8% |
| 2 | The Capture by the Left | Diagnosis | **2** | **0.7%** |
| 3 | Reading Scripture Past Our Politics | Diagnosis | 53 | 18.7% |
| 4 | After Christendom | Diagnosis | 16 | 5.7% |
| 5 | The Pastoral Angle | Diagnosis | **93** | **32.9%** |
| 6 | Living Well After Christendom | Formation | 60 | 21.2% |

Three problems fall out of that table.

**The biggest pillar is the one that just left.** The Pastoral Angle holds 93 essays, a
third of everything, and they are pastor-trade pieces — *why pastors quit*, *five biggest
mistakes new pastors make*, *bivocational pastors*, *the sabbatical your church should
require*. It is also the default: `taxonomy.ts` files anything unclassified into pillar 5.
So the largest room on the site is now furnished for an audience that has moved out, and
it keeps filling by default.

**One pillar is empty.** The Capture by the Left has two essays. Against the Right's
fifty-nine, that is not a taxonomy — it is a claim the site makes and does not keep. The
platform's own rule is to criticize the right and the left with the same instrument and
the same grief. A 59-to-2 split is the strongest possible argument that it does not.
Merging the two is more honest than leaving a room with nothing in it.

**The site is nearly all diagnosis.** Five of six pillars diagnose; one forms. That was
defensible when the center of gravity was the political essays. It is not defensible now
that Family is a front-door tab. The taxonomy says the site is a critique; the site is
becoming a critique *and* a place to build.

---

## On Prophetic Justice specifically

You are right to poke at it, but the problem is not the label — it is that it belongs to a
**second, competing taxonomy**. Prophetic Justice, Prophetic Disruption, Theological
Depth, and Integrated Life are the "reference wings" — they appear in the nav and on the
homepage, but they are not the six pillars. Leadership Formation was a fifth wing, and it
has now been removed with the rest of the pastor material.

So a visitor meets one set of names on the homepage and in the nav, and a different set at
`/pillars`. That is the real defect. Whatever you decide about the pillars, **the site
should name one spine and use it everywhere.**

Justice itself should keep a room. It is not a side interest — *What Belongs to the Poor*,
the Mishpat study, and the economic-justice material are substantial and among the most
distinctive work here. Folding justice into a politics pillar would bury it.

---

## What I would do

Keep six. Move the balance from five-diagnosis / one-formation to **three and three**, and
retire the pillar that left with the pastors.

**Diagnosis — what went wrong**

1. **The Politics That Captured the Church** — merges the current Right (59) and Left (2).
   One room, both captures, and the imbalance becomes visible and fixable instead of
   institutionalized. ~61 essays.
2. **Reading Scripture Past Our Politics** — unchanged. 53 essays.
3. **Justice and the Vulnerable** — promoted from a "wing" to a pillar, which is what the
   volume and the quality of the work already justify. Absorbs After Christendom's
   economic and neighbor material; the rest of After Christendom folds into pillar 1.

**Formation — what to build**

4. **Living Well After Christendom** — unchanged. 60 essays.
5. **The Household** — marriage, parenting, family, the table. Gives the new Family tab a
   pillar to stand on instead of being a nav group with nothing behind it.
6. **Faith Under Question** — doubt, deconstruction, and the skeptic.

That last one is the biggest strategic gain. **Skeptics are the stated first audience and
they have no pillar at all.** The doubt and deconstruction essays are scattered across
pillars 5 and 6 today. Giving them a room means the audience Bell writes toward first can
finally be pointed at something.

**The Pastoral Angle retires.** Its trade essays go to PCN with everything else. The ones
that are really the Tuesday-afternoon voice rather than the pastor's-office voice
redistribute into 4, 5, and 6 — that voice is not a category, it is how the whole site is
written.

---

## What it would cost

- **Re-filing is cheap.** One line per essay in `pillar-assignments.ts`, and
  `scripts/classify-pillars.mjs` already does the first pass. Half a day with a review of
  the low-confidence rows.
- **URLs are not.** Pillar slugs appear in `/writing?pillar=…` and in the pillar landing
  routes. Renaming needs redirects in `vercel.json`, the same way the pastor URLs were
  handled, or the rankings those pages have built are lost.
- **The 93 essays are a separate decision.** They live in the database, not the code. See
  `archive/pcn-handoff/pastor-essays-in-database.md`. Retiring the pillar does not retire
  them; they would need re-filing or unpublishing either way.

## The one call I would not make for you

Whether **After Christendom** survives as its own pillar. It has only 16 essays, but it is
the frame the whole platform is named against, and thin is not the same as unimportant.
The proposal above dissolves it into pillars 1 and 3. Keeping it would mean dropping
Justice back to a wing, or going to seven. That is a judgment about what the site is
*for*, and it is yours.
