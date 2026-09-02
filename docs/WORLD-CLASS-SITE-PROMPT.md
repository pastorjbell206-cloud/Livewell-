# The World-Class Site Prompt

> A standing order for making livewellbyjamesbell.co one of the best sites in
> the world at what it does: helping a serious reader study the Bible, read the
> church's history, and think through the hard questions in the company of a
> pastor who does not flinch. Every surface, with a recorded verdict, or the
> work is unfinished.
>
> Voice standard: `docs/VOICE-JAMES-BELL.md`. Design tokens: `client/src/index.css`.
> Completeness pattern: `scripts/voice-audit-manifest.mjs` (copy it; do not skip it).

---

## What "world-class" means here, and what it does not

It does not mean more. This site already has 222 essays, 21 books, 23 tools, a
theology explorer, a six-part Bible companion, a church-history library of 36
figures, 11 councils, 10 heresies, and a seven-era timeline, plus 22 history
essays. Adding to that pile makes it worse. The previous strategy audit named
the disease exactly: *the content is world-class; the architecture is the
problem.* Forty-plus front doors. A header that is a minimal bar and a footer
that is a forty-link card catalog. Redundant hubs that say nearly the same
thing (`/discipleship` and `/disciple-making` and `/table`; `/theology` and
`/framework` and `/pillars`; `/writing` and `/articles` and `/library` and
`/article-collections`). Content in silos that never connect. Assessments that
do not route anyone anywhere.

World-class means the opposite of that. A reader who arrives with one thing on
their mind — *my marriage is failing*, *I am not sure I believe this anymore*,
*I want to actually understand Romans*, *how did the church get here* — is met
at the door, taken somewhere specific, and never left standing in a corridor
of options. It means the Bible tools are so plain to use that a person who has
never studied a passage in their life can be inside one in under a minute, and
so deep that a seminarian is not bored. It means an essay of four thousand
words reads like an invitation rather than a wall. It means the whole thing
holds together as one place, in one voice, on one mission.

The standard is not "impressive." The standard is that a person comes here to
study the Bible and finds, to their surprise, that they love it.

## The four journeys

Design every decision around these four readers, in this order of weight. They
are the audiences in `CLAUDE.md`, turned into paths through the site.

**The student who wants to study the Bible.** They may be a skeptic testing the
book, a Christian who has only ever read devotionally, or a pastor preparing to
teach. Their path: a passage or a question → the right tool for it → the essay
that goes deeper → the book that goes all the way. Today those four things
exist and do not point at each other. The Deep Bible Companion (six layers on
any passage), Passage Context (any reference, in its argument), the Bible on a
topic, Verse Finder, Wisdom Finder, the twelve-book Bible Study, Scripture
Memory, and the Glossary are nine separate doors with nine separate front
steps. World-class is one door — *Study the Bible* — behind which the tools are
arranged by what the reader is holding: a reference, a topic, a question, a
book, a word they do not know.

**The reader who wants the church's history.** Two front doors exist right now,
`/church-history` and `/theology/history`, and they do not agree. The library
underneath (`client/public/history/` and `client/public/theology/`) holds the
councils, figures, heresies, and timeline in two copies that have already
diverged. A reader cannot tell which is the real one. The path world-class
requires: one door, one library, an arc a person can actually walk — from the
first Christians to the present, with the figures and the councils hung on the
timeline where they happened, each one linking to the essay that tells its
story and the doctrine it settled.

**The reader who came for an essay.** They arrived from a search result or a
friend's link, they are on one essay, and they will decide in ninety seconds
whether to stay. The end-of-essay work already ships one primary next step. The
reading experience above it is still a wall: no table of contents, no thesis
line, no sense of where the argument is going. The kit specified in
`docs/WAYFINDING-AUDIT.md` §6 — a reading-time and "the one thing" line, an
anchored contents rail sticky on desktop — was designed and never built. Build
it. Then make sure every essay connects outward: to the tool that lets the
reader do the thing the essay describes, to the history it stands on, to the
book that carries it.

**The person in trouble.** They came for the marriage, the grief, the burnout.
They did not come for ecclesiology. The crisis landings exist; the care standard
in `CLAUDE.md` governs them. World-class here is not more copy. It is that the
practical door opens first, the path to real help is visible, and the depth is
behind it for the one who wants it, never forced on the one who does not.

## The completeness discipline

The reason site work skips around is the same reason essay audits skip around:
nobody can see what was left undone. So the first act of this work is to
enumerate every surface a reader can reach and give each one a row.

Copy the pattern in `scripts/voice-audit-manifest.mjs` into a site manifest.
Its units are: every route in `client/src/App.tsx` (about 260); every tool
registered in `client/src/pages/ToolsHub.tsx` (23); every hub and landing page;
the header and footer maps in `client/src/lib/siteNav.ts`; each church-history
library file; the reading experience itself as one unit. Each row carries a
status and a verdict, `--verify` exits non-zero while anything is pending, and
you may not call the work finished until it exits zero. If you run out of
session, the ledger remembers and the next session resumes. What you may not do
is summarize the remainder.

Work in this order, because each stage makes the next one cheaper:

1. **Architecture first.** Collapse the redundant hubs. Decide, for every
   front door, whether it is *the* door for something or a duplicate, and
   redirect the duplicates (a 301 in `vercel.json`, the pattern already used
   for `/quiz`). Move the site map out of the footer and into a header that
   leads. The strategy audit's information architecture (`docs/SITE-STRATEGY-AUDIT.md`
   §4–5) is the approved blueprint; the six pillars under two movements remain
   the only taxonomy. Do not invent a new one.
2. **The two journeys that are broken at the root**: one Bible-study door, one
   church-history door, with the diverged history libraries reconciled into a
   single source of truth and the duplicate deleted.
3. **The reading experience.** The kit above, on every essay over about 1,400
   words. Then the outward connections.
4. **Every tool, one at a time.** Twenty-three tools, each judged as a reader
   meets it: is the first screen a blank form or an invitation? Can a person
   with no idea what to type get somewhere in one action? Does the result
   lead onward, or dead-end? Does it persist through the storage helper so a
   reload does not eat their work? Record each verdict.
5. **Design, page by page.** Against the tokens and the palette contract, not
   against taste.

## The readability standard

An essay here is long by design; the length is the product. What must never
be long is the distance between the reader and the argument.

- Body type stays Inter at the token size, `line-height: 1.7`, measure capped
  at `68ch`. Display stays Cormorant Garamond at 400. These are already
  tokens; the failure to look for is any page that hardcodes around them.
- Every essay over about 1,400 words gets the orientation header: reading
  time, the single-sentence thesis, an anchored contents rail. The thesis line
  is taken from the essay or written to its standard; it is never a summary
  and never generic.
- Paragraph rhythm follows the voice standard, and the voice audit on this
  branch is the instrument for it. Do not rewrite prose inside a design pass.
- Reading progress and reading-focus mode already exist on `ArticleDetail`.
  Keep them; make sure they work on a phone.
- Cream is the room. White is for cards and inputs that must feel lifted.
  Mustard is punctuation, under eight percent of any viewport, and never a
  background. Dark mode is deliberately disabled; do not build for it.
- Contrast is verified, not assumed. The accessible mustard (`--mustard-text`)
  is for text on light surfaces; the bright mustard is for dark surfaces and
  rules. A rendered-contrast scan of every route, not a sample, is part of done.

## The navigation standard

- One header, five doors at most, in the reader's language rather than the
  author's filing system. *Start here. Study the Bible. Read. The history.
  Tools.* Or close to that; the words are James's to choose, the count is not
  negotiable.
- Any essay, tool, or history entry is reachable in three clicks from the
  home page, and search reaches all of it. Verify this with a script that
  walks the built site, not by feel.
- No dead ends. Every page ends with one clear next step, chosen by context;
  the end-of-essay pattern (`ArticleNextSteps`, `KeepReadingBook`) is the
  model, and `PageEndNav` is the floor.
- Every route declares its own `<SEOMeta title description>` as string
  literals, so it unfurls as itself. A page the prerender script lists as
  uncovered is not finished.
- The 404 page and the error boundary are part of the site. A lost reader is
  still a reader.

## The tool standard

A tool is world-class when a tired person on a phone can use it without
instructions and a scholar cannot exhaust it. For each of the twenty-three:

- **The first screen invites.** Not a blank input. A worked example, a
  starting suggestion, or a question the reader recognizes as their own. Deep
  Bible Companion should open on a passage, not on a search box.
- **One action gets somewhere.** A reader who types a single word, or picks a
  single option, sees something real. Progressive depth from there.
- **The result leads onward.** To the essay, the history, the book, the next
  passage. A result that ends in itself has failed the journey.
- **State survives.** Long instruments persist through `lib/storage.ts` with
  the shape guards and the honest failure copy the elevation standards
  require. Results offer a non-destructive way back.
- **It fails gracefully.** No infinite "Loading…"; `LoadFailed` with a retry
  and a way home.
- **Its copy is in voice.** The tool descriptions are read more than most
  essays. They are audited to the same standard.

## The design standard

Design here is restraint. The emotional brief in `CLAUDE.md` is the whole
brief: *unhurried, weighted, grown-up — opening a serious book in a quiet room
where the light is good.* The block kit and per-page prescriptions in
`docs/DESIGN-IMAGERY-REVIEW.md` are already written; execute them rather than
re-deriving them.

- All color through tokens. A hardcoded hex anywhere in a component is a
  defect, not a style choice.
- Sections alternate cream and black; no three in a row share a background.
- Imagery is fewer and better, mostly of one man, per the imagery review.
  Decorative stock is a defect.
- Consistency across the estate matters more than any single page's beauty.
  A reader should never feel they have crossed into a different site.

## The gates

None of this is done because it looks done. It is done when the gates say so,
and the gates run in CI on every pull request, not once on a laptop.

- `pnpm check`, `pnpm test` (including the route smoke net, which reads the
  route table itself and fails by name), the three content validators, and
  `pnpm build` — the existing blocking gates, kept green.
- **Lighthouse asserted, not printed.** Today `.github/workflows/ci.yml`
  prints the four scores and fails on nothing. Add thresholds — performance
  and accessibility at ninety or above, best practices and SEO at ninety-five
  — and make the `quality` job blocking once they hold.
- **axe on every route, not only `/`.** The existing job audits the home page
  because every other route is a lazy chunk. Walk the route table in a real
  browser and run axe on each. Zero violations is the bar.
- **A rendered-contrast scan** of every route, every text node, in the shipped
  light mode. Interactive elements at 4.5:1 or better.
- **The three-click and no-dead-end walks**, scripted against the built site.
- **Initial payload** stays near its current 186 KB gzipped. A change that
  doubles it needs a reason written down.

## What you may never do

- Rewrite James's prose inside a design or navigation change. The voice audit
  is the instrument for prose; this order is for everything around it.
- Invent copy that claims something the site does not do — an inbox sequence
  that does not exist, a statistic with no source, a promise no system keeps.
  The elevation roadmap already had to take these down once.
- Add a front door. The count goes down.
- Hardcode a color, a font, or a size around the tokens.
- Ship a tool page that dead-ends, a route without its own `SEOMeta`, or a
  crisis page without its path to help.
- Mark a unit verified that you did not open, or report coverage the
  manifest's `--verify` did not confirm.

## Definition of done

The site manifest's `--verify` exits zero. The header leads and the footer
follows. There is one door to study the Bible and one to read the church's
history, and the history library has one source of truth. Every essay over
about 1,400 words carries the orientation header. Every one of the twenty-three
tools opens on an invitation, gets somewhere in one action, leads onward, and
survives a reload. Lighthouse is asserted and green; axe is clean on every
route; the contrast scan is clean on every route; the three-click and
no-dead-end walks pass. And the initial payload has not grown.

Then the last test, which is the only one that finally matters. Hand the site
to someone who has never studied a passage of Scripture in their life and ask
them to understand one — any one — without help. Watch where they hesitate.
Every hesitation is the next item on the ledger. When they finish the passage
and reach for another one on their own, the site is doing what it was built to
do.
