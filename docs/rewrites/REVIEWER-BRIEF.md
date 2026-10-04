# Brief for the integrity review

Given to whoever reviews a draft in `content/rewrites/pending/` before it goes
live. A writer's draft reaches the site only after a reviewer sets `reviewed:`.

## Before reviewing

1. Read `docs/rewrites/STANDARD.md`, and the Forbidden Language, Scholarship
   Standard, Orthodoxy Guardrails, "Handling a contested doctrine" and Content
   Integrity sections of `CLAUDE.md`.
2. Read every source essay: the kept slug plus each slug in the draft's
   `replaces:` list.
   `git show HEAD:content/static-library.generated.json > /tmp/lib-<slug>.json`
   then pick records out with a node one-liner.
3. Edit only the draft file. Run no git (beyond that `git show`), build or
   audit scripts; audit scripts rewrite tracked reports.

## What to check, and fix

- **Headings.** `## ` (h2) only, never `### `: the page title is the h1.
- **Quotations.** Every non-biblical quotation word for word from the named
  work. Unsure of the wording: make it an attributed paraphrase.
- **Claims, dates, figures.** Verify each. Cut or soften what you can't stand
  behind. No statistic without a named source and year you are sure of.
- **Scripture.** Exact ESV wording, reference beside it, read in context.
- **Biography.** Only the facts in STANDARD.md. A first-person line or
  confession stays only if a source essay has it. No position in James's mouth
  that the sources didn't take; on a second-order question the essay lands only
  where the sources landed. No tenure but twelve years at First Baptist Church
  of Fenton. No claim about the church's denominational affiliation. James
  decided (29 Sept) that the essays call him "a pastor", never "a Baptist
  pastor": no "Baptist" self-identification of him or of "we", and nothing
  tying him or the church to the SBC or any convention. The church's name,
  First Baptist Church of Fenton, is a fact and may appear.
- **Fairness.** Contested positions steelmanned in a form their defenders would
  sign. Right and left judged with the same instrument.
- **Care.** Crisis-facing topics carry correct help lines (988; National
  Domestic Violence Hotline 1-800-799-7233; others only if certain), no
  graphic detail, and a plain "not medical/legal/financial advice" where it
  applies.
- **Mechanics.** No em-dash; no spaced en-dash as a clause dash; no `!` outside
  Scripture; no forbidden words or phrases; title at most 65 characters; meta
  description 140 to 155; body 2,800 to 5,200 words (aim 3,000 to 4,500) in at
  least three `## ` sections; at least five sources.

## Finish

Passes: add `reviewed: 2026-09-24` directly after `review:`, and trim
`review:` to what James still needs to check. Can't pass: leave `reviewed:`
off and say why.

Report back briefly: what you changed and cut, final word count, title and
meta lengths, and whether you set `reviewed:`.
