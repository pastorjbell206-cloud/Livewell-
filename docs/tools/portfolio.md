# Tool Portfolio Audit — LiveWell by James Bell

Every interactive tool judged as a product: does the output change
substantively with input through real computation or assembly, or is it a
static library (or an if-chain over canned blobs) wearing a tool's clothes.
The actual logic was read, not the marketing copy. Nothing was edited.

## The architecture, up front

- **Two genuinely serious assessment engines** exist, hand-built with
  reverse-scoring, weighted domains, lowest-domain routing, retake history
  with deltas, and exportable output: the **Leadership Formation Inventory**
  and the **Whole-Life Assessment**. These are the real thing.
- **Three reusable JSON-driven engines** (banded leader assessments, profile
  surveys, service builders) each power several tools from
  `client/public/leadership/*.json`. Good architecture: one component, many
  tools.

## Honest counts

About **40 distinct tool surfaces**. Of those:

- **Real instruments: ~24.** The nine hand-built assessments (formation
  inventory, whole-life, marriage, emotional health, financial health,
  pastor burnout, life audit, church health, diagnostic), the theology quiz
  (server-scored), the ten engine-driven leadership tools (five assessments,
  three surveys, two service builders), and the working utilities: budget
  calculator, meeting builder, sermon workbench, decision log, visitation
  tracker, plus the builders (rule of life, family devotions, discipleship
  table, scripture memory) and the illustration library.
- **Static libraries wearing tool clothes: ~13.** Every "verses by topic"
  page (verse finder, bible-on, bible-says, parenting verses, wisdom finder),
  passage context, bible study guide, parenting stage guide, glossary
  (mounted twice), quote library, and the deep-Bible companion *as a tool*
  (its content is genuinely seminary-grade; its interaction is a browse).
- **Novelty/shallow generators: 3.** Prayer generator (39 canned prayers),
  sermon outline generator (seven canned outlines behind an exact-match
  lookup), start-here quiz (three questions collapsing to a default for
  nearly every combination).

**Half the "tools" are content libraries with a search box.** The instrument
count is real and respectable — the problem is dilution, not absence.

## Cut / merge

A dozen tools are the same tool. Consolidate hard; ~40 surfaces → ~15–18.

1. **One "What the Bible Says" search** absorbs verse finder + bible-on +
   bible-says + parenting verses + wisdom finder (five lookups → one, with
   facets for life topic, parenting, wisdom, emotion).
2. **One Bible-study destination**: fold bible-study and passage-context into
   the deep-Bible companion as its lighter layers.
3. **Cut the start-here quiz** (it routes almost everything to a default);
   keep the diagnostic (it converts) and the theology quiz (it computes).
4. **Merge the sermon-outline generator into the sermon workbench** as its
   step one — the canned lookup dies, the real instrument gains a starter.
5. **Merge the quote library into the illustration library** — one searchable
   preacher's bank.
6. **Dedupe the glossary** (mounted at two routes).
7. **Demote** the prayer generator and Proverbs-31 reader to devotional
   features; stop billing them as tools.

## The signature ranking — five with best-in-class potential

| # | Tool | Why it can be signature | What's missing |
|---|---|---|---|
| 1 | **Leadership Formation Inventory** | Character-weighted scoring (0.65/0.35), reverse-scored honesty items, lowest-two pastoral readings, retake deltas — and feedback prose in pure Bell voice that no competitor can clone | A longitudinal trend chart (data already stored), a printable/PDF, the six-month retake reminder that closes the designed loop, per-statement drilldown |
| 2 | **Whole-Life Assessment** | Same engine quality, widest audience; already outputs a rule of life, hands off to an eight-week plan, carries the 988 guardrail | A saved living rule tracked week to week, progress check-ins, a printable — it should own "the annual life check-up" |
| 3 | **Pastor Burnout Diagnostic** | The highest-intent niche on the site — the tool a desperate pastor searches for at midnight; 24 reverse-scored questions and a recovery roadmap | Retake-history persistence (the flagships have it, this lacks it), real referral resources, an emailed recovery track |
| 4 | **Deep Bible Study Companion** | The content is uncopyable — seminary in plain language | It is not yet a tool: saved highlights, notes per passage, a journal on each study question, more than 12 books |
| 5 | **Family Devotion Builder** | Real per-(age × theme) devotion content, not templated mush | Save and schedule a multi-week series, a printable, done-tracking so a family runs a term, not a one-off |

## The single bet

**The Leadership Formation Inventory.** It targets the highest-intent,
highest-value, most underserved user on the site — the pastor examining his
own character — and its moat is not the scoring but the writing in each
domain's feedback, which is pure Bell and cannot be cloned by a competitor
with a form builder. The retention loop (retake in six months) is already
designed and just needs closing. Three small additions — trendline, PDF,
scheduled retake nudge — make it the best character assessment for pastors
on the internet. Everything needed is already in the file. Lowest lift,
highest ceiling.

## One portfolio-wide gap

The consumer assessments (marriage, burnout, life audit, emotional health,
financial health, church health) compute and display but do **not** persist a
retake timeline the way the two flagships do. If longitudinal tracking
becomes the signature differentiator, close that gap across all of them with
the flagships' existing pattern.

---

*Read-only audit. This ranking decides where tool-deepening effort goes; the
decision lives in `../PRIORITY.md`.*
