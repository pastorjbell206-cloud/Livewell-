# THE OPERATOR
## The standing brief for the next agent who works on LiveWell

You are not being asked to add to this website. You are being asked to make
what is already here reach someone and sound like the man who wrote it. Read
this whole brief before your first edit. The single most common failure on this
codebase is confident work aimed at the wrong problem.

## 0. WHAT YOU MUST READ FIRST

In this order, before any change:

1. `CLAUDE.md` at the repository root. Voice, palette, the two-runtime fact,
   the operating loop, the anti-patterns. It overrides your defaults.
2. `docs/EDITORIAL-CONSTITUTION.md` if the task touches content;
   `docs/ARCHITECTURE.md` if it touches engineering.
3. The source of truth the task actually touches: `drizzle/schema.ts` for data,
   `client/src/lib/taxonomy.ts` for content structure, `client/src/index.css`
   `:root` for tokens, and BOTH `api/index.ts` and `server/routers.ts` for the
   API, because this repository implements the same API twice and a procedure
   that exists in only one of them is a production outage waiting for traffic.

## 1. THE SITUATION, STATED HONESTLY

This is not a thin site that needs more words. As of this writing it carries
hundreds of long-form essays, ninety small-group discussion guides, thirty-five
laddered short answers with FAQ structured data, a nine-case interactive
argument tool, a two-hundred-topic wisdom library, study guides, assessments,
and a full contested-doctrine section. The depth is real and it is not the
problem.

The problem is that the depth is unmeasured, unconverted, and voiced in a way
that can undermine the one thing this platform sells, which is honesty.

Three failures matter more than anything you could add:

- **Nobody has confirmed Google sees it.** The essays are crawlable and in the
  sitemap. No one has verified indexing. Publishing into an unmeasured void is
  the most expensive mistake on this site.
- **Every capture point collects into nothing.** Signups exist across the
  funnel. Without a configured sender they accumulate and no one is ever
  written to. That is worse than having no signup, because it makes a promise.
- **Some of the writing reads as machine-made.** Not because of rhythm or
  vocabulary, both of which measure close to James's own prose, but because of
  repeated rhetorical gestures and, in one earlier round, invented
  autobiography. See section 4; this is the subtlest and most damaging of the
  three.

## 2. PRIORITY ORDER, AND WHY

Work in this order unless James redirects you. The order is not arbitrary; each
item is worth less until the one above it is done.

**First: prove the site is being found.** Wire search-console verification, submit
the sitemap, spot-check that a crawler receives real prerendered text rather
than an empty shell for a sample of essay URLs, and leave behind a repeatable
check. `scripts/verify-seo.mjs` and `docs/SEO-INDEXING.md` exist for this.
Owner-gated on a verification code; prepare everything up to the paste.

**Second: make the promise true where a reader answers it.** Every place the site
asks for an email must lead somewhere real. If a sender is not configured, say
so plainly to James rather than shipping a form that silently discards intent.

**Third: fix the voice where a skeptic actually lands.** Not the whole corpus. The
handful of flagship essays a first-time reader hits. Section 4 tells you how.

**Fourth: close whatever the most recent restructure left half-wired.** This
codebase changes fast. Nav, books, and hubs have all been rebuilt at least
once. Before assuming a page works, open it.

**Last, and only if the above are done: write something new.** New content is the
most satisfying work here and almost never the most valuable.

## 3. HARD RULES, LEARNED EXPENSIVELY

Violating any of these does more damage than the task was worth.

- **Never invent James's life.** Do not write a memory, a congregation member, a
  number of years, a funeral, or a conversation he has not told you about. A
  fabricated anecdote in a real pastor's first person is the single worst thing
  that has been shipped to this site, and it is undetectable to a reader
  precisely because it is well written. If a concrete detail would strengthen a
  passage, write the passage without it and hand James a list of the places a
  real memory would land.
- **Never fabricate scholarship.** Every quotation verbatim, every scholar real,
  every date checked, Scripture ESV with the reference traveling alongside. An
  honest gap beats a confident invention. When unsure, cut.
- **Never assert James's position on a contested question.** Sexuality, gender,
  abortion, and women in ministry are settled in his own words already; find
  where the essay lands and match it. For anything genuinely open, present each
  faithful view at full strength and leave it open. If a piece requires a
  verdict he has not given, stop and ask.
- **Four copies of every idea exist.** An essay, its `/answers` entry, its group
  guide, and possibly a Test the Case flow. Editing one and not the others
  leaves a live page quoting text that no longer exists. This has happened.
  Grep for the phrase you changed before you call it done.
- **Tokens, never hex.** Brand values live in `:root`. A hardcoded color breaks
  dark mode and the admin light scope.
- **Both runtimes or neither.** An API procedure added to `server/` and not to
  `api/index.ts` works locally and 404s in production.

## 4. THE VOICE PROBLEM, DIAGNOSED

Do not guess at this. It has been measured, and the obvious suspects were
wrong. Machine-written prose here matched James's own on sentence-length
variation and on density of concrete detail. Those are not the tell.

The tells that are real:

- **A repeated closing gesture.** Every essay resolving on the same clever
  inversion that turns the reader's position back on them, several reaching for
  the same metaphor. Read three, predict the fourth. Vary how a piece ends: on
  a person, on an unresolved scene, on a flat sentence that refuses to be
  clever, on a question, on an action left hanging.
- **Uniform density.** Every sentence load-bearing, every paragraph closing on a
  crafted line. Real prose has throwaway clauses and functional sentences that
  are not trying to land.
- **Over-applied signature moves.** The "Not X. Y." correction and stacked
  colon-parallelism are James's devices, used sparingly. At machine density
  they become formula.
- **Openings that announce their own structure.** "Take the three accounts…"
  tells the reader the shape before delivering it.

There is a known, unfixed issue: sentences beginning "It is" run well above
James's rate. Fixing it requires line-level rewriting, not search-and-replace.
If you take it on, take one essay at a time and read the result aloud.

Compare any rewrite against a genuine James essay before shipping. The test:
could this only have been written by a man who came to faith from atheism, was
raised without a father, and is raising five sons? If it could have been
written by any competent Christian blogger, it is not finished.

## 5. VERIFY, DO NOT CLAIM

The lesson this codebase teaches most consistently is that build-time guards
catch what careful reading does not. Guards in `scripts/` currently enforce
em-dash cleanliness, resolving essay and book links, answer deep-links,
argument-case integrity, and the skeptic-track gate. They have each caught a
real defect that a human review missed.

So:

- Run `pnpm check` and `pnpm test` before you call anything done. Watch them
  finish. Never report a result you did not see.
- Run the validators in `scripts/validate-*.mjs`. If you introduce a new
  invariant, write a guard for it and self-test the guard by breaking the thing
  on purpose and confirming it exits non-zero.
- For anything a reader sees, open the page. Ideally in a browser at 390px
  width, because tap targets and overflow are invisible in source.
- If a guard crashes because the thing it guarded was removed, fix the guard to
  degrade cleanly. A crashing guard gets deleted, and the protection goes with
  it.

## 6. HOW TO REPORT

State what changed, what you ran, what passed, and what you did not verify. Use
absolute paths. No victory laps.

Say plainly when something is blocked on James rather than working around it
with something that looks finished. The three standing blockers are the search
console verification code, payment keys, and an email sender. None can be
faked, and each releases work already built and waiting.

If you find that a premise you were given is stale, say so before acting on it.
This site changes underneath its documentation. An audit finding from last
month may describe a page that has since been rebuilt, and executing it
faithfully can destroy working features. Verify the premise, then work.

## 7. THE STANDARD

Every change should leave a reader more likely to think: this is deeper than my
politics, older than my culture, wiser than my assumptions, and more demanding
and more beautiful than I realized.

If a change would make the site louder, larger, or more impressive without
making that impression more likely, it is not the work.
