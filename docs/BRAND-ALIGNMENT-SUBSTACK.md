# One brand, two surfaces: the site and the Substack

An audit of livewellbyjamesbell.co against the Livewell Substack, with ranked
recommendations and a paste-ready prompt to close the gap. Written 26 July 2026
from the code, the site's own docs, and what the public search index holds of
the Substack.

---

## 0. What could and could not be seen

The Substack itself was **not viewable** from the audit environment: every
Substack domain is blocked at the network proxy, and I did not try to route
around that. So the Substack side of this audit rests on four sources, all
named so you can weigh them:

1. **The public search index** — publication name, description, byline
   pattern, subscriber count, roughly a dozen post titles, and several verbatim
   sentences quoted in result snippets.
2. **`client/src/lib/substackImport.ts`** — the site's own import map, which
   names fifteen Substack post slugs and the five-part serialized book.
3. **`docs/marketing/substack-and-social-livewell-series.md`** — two complete
   Substack posts drafted in the voice, with title, subtitle, preview text and
   body.
4. **Two imported Substack essays** already in the site's static library
   (`when-fear-rewrites-theology`, `you-are-not-the-exception`).

What I **could not** verify and you should check yourself in sixty seconds on
the Substack settings page: the logo, the header/cover image, the accent
colour, the light/dark theme, the serif/sans font setting, the exact tagline
line under the name, the About page text, and the real publishing cadence.
Nothing below asserts any of those.

---

## 1. The Substack, as indexed

**Name.** `Livewell` — one word, one capital. Every indexed page title reads
"*Title* - by James Bell - Livewell".

**Description** (indexed, likely the publication's About/description field):

> Livewell is James Bell's serialized book on Christian nationalism, political
> theology, and how the Bible gets translated by partisan power — for readers
> tired of culture-war content.

**Author line** (indexed): a pastor writing essays on theology, politics, and
the American church.

**Scale and model.** 479 subscribers per the index at the time of audit.
Reader-supported, free and paid tiers.

**The flagship.** *The End of Christian America*, a book serialized in parts
(Parts I–III and at least one further installment are indexed: "The strategy
of the American Church and why none of them have worked"). The site's importer
deliberately handles this series in **teaser mode** so it stays a reason to
subscribe.

**Titles indexed or mapped** (twenty, enough to hear the grammar):

- The End of Christian America (Parts I, II, III, and "the strategy…")
- The Bible After Christian America
- When God Bless America Replaces Thy Kingdom Come
- Why Good Christian Parents Are Losing Their Children
- Suffering and Sovreignty *(sic)*
- The Bible Assumes You Will Be Wrong
- How the Bible Gets Translated by Partisan Power
- The Conservative Blind Spot · The Progressive Blind Spot
- How American Individualism Distorts the Gospel
- When Fear Becomes Theology · When Fear Rewrites Theology
- Every Generation Was Sure It Was the Exception
- When Patriotism Becomes a Gospel
- How Christian Nationalism Rewrites the Bible
- When the Church Married Empire
- Jesus Is Lord
- Blind Spots · The Monster Is Never the One in the Mirror
- You Are Not the Exception

**The voice, verbatim from the index:**

> Christian Nationalism is what the church looks like when it has stopped
> trusting the gospel and started trusting power.

> Politics was never meant to bear the weight of salvation. And when we put
> that weight on it, we do not merely distort politics. We distort Christ.

> [Christian nationalism] is what happens when a religious community realizes
> it can no longer persuade the culture through its witness, and decides it
> must conquer the culture through its politics.

And from the two full drafts in `docs/marketing/`:

> Anxiety is not a broken part. Anxiety is a tell.

> You cannot serve both. That is not a threat. It is a mercy.

### What the Substack gets right

**It makes one argument.** The description is a single sentence with a single
subject. A reader knows in four seconds what they are subscribing to and who it
is for ("readers tired of culture-war content" — an audience defined by what it
is sick of, which is exactly the skeptic-first posture in `CLAUDE.md`).

**It has a flagship.** A serialized book is a reason to subscribe that a pile
of essays is not. It gives the publication a spine and a next installment.

**The titles are verdicts.** *You Are Not the Exception. The Monster Is Never
the One in the Mirror. When Fear Rewrites Theology.* These are the "Not X. Y."
move in title form. They are the voice before the reader has read a sentence.

**The voice is entirely his.** Every quoted line passes the test in
`CLAUDE.md`: it could only have been written by this man.

### Housekeeping on the Substack side

- "Suffering and **Sovreignty**" is misspelled in the title (and therefore the
  slug and every share of it). Substack lets you retitle without changing the
  URL; fix the title now and leave the slug.
- "THE END OF CHRISTIAN AMERICA" is indexed in all capitals on at least one
  part. The site's typography rule is that size carries weight, not boldness;
  the same applies to case. Title-case it.
- "Why Good Christian Parents Are Losing Their Children" lives at the slug
  `the-end-of-american-christianity`. It was retitled after publication. Fine,
  but be aware the URL still tells the old story.

---

## 2. The site, audited against it

The site's brand contract (`CLAUDE.md`: voice, palette, typography) is strong,
specific and mostly honoured. The gaps below are not about the contract; they
are about the site and the Substack telling the same reader two different
stories.

### 2.1 Positioning and voice

**The name is spelled two ways.** The Substack is `Livewell`. The site is
`LiveWell by James Bell` — in the `<title>`, the OG tags, the JSON-LD
`site_name`, the footer, and 14 places in the components. One brand, two
wordmarks. Whichever you choose, the other surface must change.

**The Substack makes one argument; the site lists ten subjects.** The site's
hero subhead: *"essays on theology, politics, and the American church — and
the actual Tuesday afternoon of marriage, money, parenting, manhood, womanhood,
doubt, and pastoring."* The meta description repeats the list. The Substack
says one thing. The site says everything, and a reader who arrives from the
Substack cannot find the thing they came for in the first sentence. Both are
true; the fix is order, not subtraction — lead with the argument, make the
rest the rooms behind it.

**The site's own Substack page misdescribes the Substack.** `/substack` is
headed *"The thinking behind the thinking"* with the subhead *"Longer writing.
More personal. The pieces that don't fit neatly into a blog post."* That is a
generic newsletter pitch. It never names *The End of Christian America*, the
serialized book that is the actual reason to subscribe. The "What you get"
cards promise *"the church and the flag, Scripture read past the tribe,
marriage after the tips run out, doubt taken seriously"* — the site's ten
subjects again, not the Substack's one. And it claims "one serious essay a
week," which I could not verify from the index.

**There are three subscription surfaces with three different pitches.**
`/substack` ("The thinking behind the thinking"), `/subscribe` ("Subscribe —
and tell us where you're standing"), and the footer form. The mechanics are
sound: the site writes to its own `subscribers` table and then hands the reader
to Substack's subscribe page with the email prefilled and UTM attribution, so
it is a two-step rather than a rival list. But every reader is asked twice, in
different words, and the site keeps a shadow list it cannot email through
Substack.

**The essays never mention the Substack.** Across all 681 essays in the static
library, the essay page, the "next steps" block and the "keep reading" block
contain zero references to it. The flagship serialized book is not
cross-promoted from a single essay. This is the largest missed funnel on the
site: the essays on political captivity, Scripture past the tribe, and the
church after Christendom are *the same argument the Substack is serializing*,
and they do not say so.

**Title grammar diverged.** The Substack's titles are verdicts. The site's
titles, after the recent 197-title SEO pass, are search phrases ("Christian
Marriage Help — Covenant, Conflict, and Repair"). The SEO pass was right for
the `<title>` tag. But nothing stops the on-page heading from carrying the
verdict as a deck beneath the search title, so the site *reads* like the
Substack while still ranking.

**One stale book count — and a correction to this audit.** The single source
of truth is `client/src/config/siteStats.ts`: **21**, verified against the
`books` table. An earlier draft of this section listed five other "wrong"
counts. Four of them were not about Bell's books at all, and I was wrong to
list them: "20 books" counts the books of the Bible covered by the Deep Bible
tool; "twenty-two books" is Augustine's *City of God*; "twenty-seven books" is
the New Testament canon. Replacing any of those with 21 would have put a
factual error into reference content and essay bodies, which the brief's own
rule forbids. The one genuinely stale claim was **"25 books" in `CLAUDE.md`'s
positioning statement**, now corrected, with the existing consistency test
extended to scan `CLAUDE.md` so it cannot drift again.

The lesson is the same one this session keeps teaching: a count that looks like
a finding is not one until you open the file.

### 2.2 Design

**What holds.** The palette (charcoal `#1A1A1A`, cream `#F5F0E6`, mustard
`#D4A017` as punctuation) and the type pairing (Cormorant Garamond 400 for
display, Inter for body) are specific, token-driven, self-hosted, and honoured
across ~150 surfaces after this session's dark-mode work. This is a real
design system, not a mood board.

**The share cards do not match the site.** `scripts/build-og-images.mjs`
renders every OG image in **Georgia and Arial**, not Cormorant and Inter. The
one surface that appears *next to* a Substack post in a feed or a text message
is the one surface that does not look like the site. The fonts are already
self-hosted in `client/public/fonts/`; the SVG-to-PNG pipeline can embed them.

**The `/substack` page breaks the type contract.** Its headings use
`font-bold` (the contract: weight 400, size carries the weight); its subhead
colour is a hardcoded `rgba(244,241,234,0.7)` rather than a token; and its
hero is a stock "writing desk" photograph hosted on a third-party CDN. The
Editorial Constitution's visual rule is explicit: avoid generic stock; every
image should belong in a serious publication. The page that sells the
Substack is the least on-brand page on the site.

**Substack's visual surface is small and fully controllable.** What Substack
lets you set: a logo, a header image, one accent colour, light or dark, serif
or sans. That is enough to make the two surfaces rhyme — accent `#D4A017`,
serif on, the same portrait or a charcoal-on-cream wordmark. I could not see
what is set today; this is the sixty-second check.

### 2.3 Information architecture (carried from this session's audit)

- 262 routes across **97 distinct top-level areas**; `/writing` renders the
  entire library with no cap (`"N of M essays shown"`, full bodies via
  `posts.listPublished`).
- **59% of essays have no pillar assignment** and fall to the default,
  "The Pastoral Angle" (`taxonomy.ts:305`), which is the pillar whose content
  just moved to PCN.
- `server/db-syndication.ts` files every synced Substack post under a pillar
  literally named `"Substack"`, which is not a pillar, so those posts also
  resolve to the pastoral default. The import map in `substackImport.ts`
  already knows the right pillar for each; the sync path ignores it.

---

## 3. Recommendations, ranked

Ordered by how much brand coherence each buys per hour of work.

1. **One name.** Pick `LiveWell` or `Livewell` and apply it everywhere.
   Recommendation: keep **LiveWell** — it is in the site's title tag, OG tags,
   JSON-LD, footer and fourteen components, and it is what search already
   associates with the domain. Renaming the Substack publication is one field
   with no URL change. Then one tagline, used verbatim on both.
2. **One sentence, both places.** The Substack's description is the best
   single sentence either surface has. Put it, or a tightened cousin of it, as
   the site's hero subhead and meta description, and let the ten subjects
   become the doors beneath it. The site should lead with the argument.
3. **One subscription pitch.** Write one paragraph that names *The End of
   Christian America*, and use it verbatim on `/substack`, `/subscribe`, and
   the footer. Rebuild `/substack`: retitle it, drop the stock image, honour
   the type contract. Decide whether the site's shadow list earns its keep; if
   it stays, it must be able to say why in one sentence.
4. **The essay-to-Substack funnel.** One block, one sentence long, on every
   essay in the politics, Scripture and after-Christendom pillars: *this is
   the argument the Substack is serializing*, linking to the current part.
   Teaser mode already exists in the importer; use it.
5. **Share cards that match.** Render OG images in the self-hosted Cormorant
   and Inter. Set the Substack accent to mustard and its font to serif. Use
   the same portrait or wordmark on both.
6. **Verdict decks.** Keep search titles in `<title>`; render the Substack-style
   verdict as the on-page deck. The essay index then reads like the Substack's
   archive.
7. **Fix the numbers.** Replace the five stray book counts with `SITE_STATS`.
   Fix "Sovreignty" and the all-caps title on Substack.
8. **Syndication hygiene.** Route `db-syndication.ts` through
   `categoryForSlug()` so synced posts land in a real pillar.

Items 1, 2 and 7 are decisions plus an afternoon. Items 3–6 are the prompt
below.

---

## 4. The prompt

Paste-ready and self-contained: it assumes a fresh session with no memory of
this document. Two things it refuses to do — invent a Substack fact it cannot
see, and change an essay URL — are refusals, not preferences.

```text
CONTEXT

You are aligning two surfaces of one brand so they read as one publication:

  The site:     https://www.livewellbyjamesbell.co  (React 19 + Vite, tRPC,
                Drizzle/MySQL, Vercel; repo has CLAUDE.md and docs/)
  The Substack: https://jamesbell333289.substack.com  (publication name
                "Livewell"; ~479 subscribers; free + paid; flagship is the
                serialized book "The End of Christian America")

The author is James Bell: lead pastor of First Baptist Church of Fenton,
Michigan; came to faith from atheism; raised without a father; five sons;
author of twenty-one books (the canonical count lives in
client/src/config/siteStats.ts — never inline a different number).

The Substack makes ONE argument in one sentence — "James Bell's serialized book
on Christian nationalism, political theology, and how the Bible gets
translated by partisan power — for readers tired of culture-war content." Its
titles are verdicts: "You Are Not the Exception", "When Fear Rewrites
Theology", "When God Bless America Replaces Thy Kingdom Come."

The site currently lists ten subjects in its hero, spells the name
"LiveWell by James Bell", describes its own Substack generically on /substack
("The thinking behind the thinking") without naming the serialized book,
carries three subscription surfaces with three different pitches, and has
zero references to the Substack across 681 essays. Its OG share cards render
in Georgia/Arial rather than the site's own Cormorant Garamond/Inter.

GOAL

A reader who moves between the Substack and the site should never feel they
changed publications. Same name, same sentence, same type, same colour of
emphasis, same title grammar, and one clear reason to subscribe that is stated
identically everywhere it is stated.

BEFORE YOU WRITE A LINE

1. Read CLAUDE.md top to bottom, then docs/EDITORIAL-CONSTITUTION.md, then
   docs/BRAND-ALIGNMENT-SUBSTACK.md. The first two are binding.
2. Open the live Substack in a browser and record, verbatim: the exact
   publication name and tagline; the About text; the accent colour, theme,
   font setting, logo and header image; the last ten post titles and dates;
   the current part number of "The End of Christian America." The audit that
   produced this brief could not view the Substack; every Substack fact above
   came from the search index and must be confirmed against the live page.
   If anything differs, the live page wins.
3. Do not invent any Substack fact you did not see. Where a fact is
   unavailable, say so in your report and leave the affected copy marked
   TODO rather than guessing.

NON-NEGOTIABLES (from CLAUDE.md — do not relitigate)

- Palette: charcoal #1A1A1A, cream #F5F0E6, mustard #D4A017 as punctuation only
  (under 8% of any viewport, never a background or body colour), white only
  for cards and inputs. All colour via the :root tokens in
  client/src/index.css. No hardcoded hex or rgba in components.
- Typography: Cormorant Garamond 400 for display and headings (size carries
  weight, never boldness), Inter 400/500 for body and UI, self-hosted from
  client/public/fonts/. No font CDN.
- Voice: the two registers, the Forbidden Language list, the punctuation
  mechanics (exclamation only inside verbatim Scripture), the structural
  moves, and the Revision Pass — all as written in CLAUDE.md. Every sentence
  of new copy is run through the Revision Pass before it ships.
- Engineering: any API procedure changes in BOTH server/routers.ts and
  api/index.ts; api-parity.test.ts must pass. Every new page declares
  <SEOMeta title="…" description="…"> as string literals. pnpm check,
  pnpm test, the content validators, and pnpm run build:vercel are the gates.
- Never change, redirect, or retitle an individual essay URL.
- Do not rewrite, shorten, or delete essay content or excerpts.
- Do not rebuild pastor-facing features; that material moved to
  pastorsconnectionnetwork.com. Do not reintroduce a "Substack" pillar value.

THE WORK

Phase 1 — One name, one sentence.
  a. Confirm the chosen wordmark is "LiveWell" (default) and apply it on every
     site surface, including the static masthead in client/index.html, OG
     tags, JSON-LD site_name, footer, and components. Report every place it
     appears. Produce a one-line instruction for renaming the Substack
     publication to match (no URL change is required on Substack).
  b. Write ONE positioning sentence for both surfaces, no longer than the
     Substack's current description, that leads with the argument (the church
     after Christendom; the Bible translated by partisan power) and names the
     reader by what they are tired of. Use it verbatim as the site's hero
     subhead (client/src/lib/positioning.ts), the meta description, and the
     Substack description. Keep the ten subjects as the "doors" beneath the
     hero on Home; do not delete them.
  Acceptance: grep finds one spelling of the name; positioning.ts and the
  Substack description are byte-identical apart from the trailing period.

Phase 2 — One subscription pitch.
  a. Write one paragraph, in the long-form register, that names "The End of
     Christian America" as a serialized book, says who it is for, and says what
     arrives and how often — only if the cadence was confirmed in step 2;
     otherwise say "when a new part is ready." Use it verbatim on /substack,
     /subscribe, and the footer NewsletterSignup.
  b. Rebuild client/src/pages/Substack.tsx: retitle the page (the H1 should be
     the book's title or the positioning sentence, not "The thinking behind
     the thinking"); remove the third-party stock image; replace font-bold
     display headings with weight 400; replace the hardcoded rgba text colour
     with tokens; keep the existing subscribe handoff
     (lib/site.ts substackSubscribeUrl) unchanged.
  c. Decide, and state in the report, whether the site's own subscribers table
     still earns its place. If it stays, its purpose must fit in one sentence
     on the page. If it goes, remove the mutation cleanly in both runtimes.
  Acceptance: the three surfaces share one paragraph; /substack passes the
  route smoke test and declares SEOMeta literals; no hardcoded colours remain
  in Substack.tsx.

Phase 3 — The essay-to-Substack funnel.
  a. Add one component, SubstackSeriesNote, rendered once per essay page for
     essays whose pillar is 1, 3, or 6 in client/src/lib/taxonomy.ts (the
     political capture, Scripture past politics, and after-Christendom
     pillars). One sentence in the short-form register — "This essay is part
     of the argument the Substack is serializing" — with a link to the current
     part of "The End of Christian America" (confirmed in step 2) and the
     subscribe handoff. No modal, no interstitial, no exclamation point.
  b. Route server/db-syndication.ts through categoryForSlug() from
     client/src/lib/substackImport.ts so synced posts land in a real pillar and
     honour teaser mode for the serialized book.
  Acceptance: the block renders on a pillar-1 essay and not on a family
  essay; api-parity.test.ts passes; no post is written with pillar "Substack".

Phase 4 — Share cards and Substack settings.
  a. Change scripts/build-og-images.mjs to embed the self-hosted Cormorant
     Garamond and Inter (client/public/fonts/) instead of Georgia and Arial,
     keeping the charcoal/cream/mustard layout. Regenerate all cards. Confirm
     one by opening it.
  b. Produce a checklist for the Substack settings page: accent colour
     #D4A017; serif font; theme matching the site's default (light, cream);
     the same portrait or a charcoal-on-cream wordmark for logo and header;
     tagline set to the Phase 1 sentence. This is a checklist for James to
     apply, not something you can do from the repo.
  Acceptance: a regenerated OG card uses Cormorant for its title (verify by
  rendering, not by reading the script).

Phase 5 — Verdict decks.
  a. Keep the existing search-intent <title> strings untouched.
  b. Where an essay's on-page heading differs from its <title>, render the
     shorter, verdict-style line as the H1 and the search title as the deck
     beneath it, or the reverse if the essay already leads with a verdict —
     pick one rule, apply it consistently, and state it. Do not write new
     verdicts for essays that lack one; flag them in a list for James.
  Acceptance: the prerender/SEOMeta consistency test still passes; a list of
  essays lacking a verdict line is delivered, not guessed at.

Phase 6 — The numbers.
  Replace every book-count literal outside client/src/config/siteStats.ts
  with SITE_STATS (known offenders: ToolsHub.tsx:24, TheologyGlossary.tsx:299,
  post-christian-articles-tier2.ts:15, content-data.json:1549 and :1585,
  and the positioning statement in CLAUDE.md:34). Add a test that fails if a
  book-count literal reappears in client/src.

VERIFICATION (report the real result of each, never assume)

  pnpm check · pnpm test · node scripts/validate-*.mjs (all of them) ·
  pnpm run build:vercel (zero ENOENT) · open /, /substack, /subscribe, one
  pillar-1 essay, and one family essay in a browser and describe what you saw.

DELIVERABLES

  1. The one positioning sentence and the one subscription paragraph, final.
  2. The diff, on a branch, with a PR description that lists every surface
     the name and sentence now appear on.
  3. The Substack settings checklist for James, with the exact values.
  4. The list of essays lacking a verdict line, for manual review.
  5. A short "what I could not verify" section. An empty one is a red flag.

WHAT NOT TO DO

  Do not add a "Substack" pillar, tag, or nav group. Do not paywall anything on
  the site. Do not change essay URLs. Do not write a new tagline that is a list
  of subjects. Do not use any word on the Forbidden Language list. Do not claim
  a cadence, a subscriber count, or a Substack setting you did not see on the
  live page. Do not report a gate as passing that you did not watch pass.
```

---

## 5. What this does not cover

The pillar taxonomy is still two competing spines (the nav "wings" and
`PILLARS_V2`), 59% of essays are unfiled, and `/writing` is an uncapped dump.
Those are the subject of `docs/STATE-OF-THE-SITE.md` and the topic-layer
restructure brief, and they are the reason a reader arriving from the Substack
cannot find the argument they came for once they are past the homepage. Brand
alignment makes the front door honest; the IA work makes the house behind it
one a reader can find their way around. Do the front door first — it is a week, not a month — and do not let
it wait on the house.
