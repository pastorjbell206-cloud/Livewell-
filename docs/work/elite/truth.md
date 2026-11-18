# Unit "truth": the site says only true and settled things

Branch `elite/truth`, based on `6cc48594`. Carries out James's decisions of
2026-11-17 (no membership fee; the Pastors Connection Network stays outside
the site) and the standing rule on facts about him. AUDIT.md section 4 item 3,
section 13 decisions 1 to 8, roadmap items 37 to 40.

## What changed

### 1. No membership

- `/membership` and `/membership/success` answer with a redirect to
  `/subscribe` (`ToSubscribeRedirect` stubs in `client/src/App.tsx`; permanent
  rules for `/membership` and `/membership/:path*` in `vercel.json`).
- Out of `scripts/generate-sitemap.mjs` and the `STATIC_PAGES` list in
  `scripts/prerender-heads.mjs`. It was never in `llms.txt` or a menu.
- The "Membership" section is out of `client/src/pages/Terms.tsx`.
- Left alone, as asked: the Stripe and membership API procedures, the schema,
  the admin settings fields for a membership price, and the page files
  `Membership.tsx` and `MembershipSuccess.tsx` (unrouted now, like the other
  folded pages). Book sales are unchanged.

### 2. The Pastors Connection Network is off the site

Every place changed:

- `vercel.json`: 41 permanent redirects went to the network's site. Now:
  `/pastoral-burnout` and four pastor-care essay addresses
  (`okay-to-see-counselor`, `anxiety-perfectionism-pastor-breaking-cycle`,
  `interior-life-of-pastor`, `sabbatical-why-church-should-require`) go to
  `/help/pastors`; the other 27 old `/writing/<slug>` addresses go to
  `/writing`; `/sermon-series` goes to `/study`; `/leadership`,
  `/leadership/:path*`, `/pastors`, `/for-leaders`, `/for-pastors`,
  `/the-pastoral-angle`, `/pastors-resource-wall` and
  `/resources-for-pastors` go to `/resources`.
- `client/src/App.tsx`: `PastorsMovedRedirect` (which left the site and showed
  a notice) is gone; the same routes use `ToHelpPastorsRedirect`,
  `ToStudyRedirect` and a new `ToResourcesRedirect`.
- `client/src/lib/siteNav.ts`: the link under About (header menu and footer).
- `client/src/lib/channels.ts`: out of `SAME_AS` (the JSON-LD sameAs list).
- `client/src/pages/About.tsx`: the header line "Founder, Pastors Connection
  Network", the link and note under "Everywhere James is", the paragraph that
  began "I started the Pastors Connection Network for a fairly simple reason",
  and "the network" in the band title (now "The church and the ends of the
  earth"). His paragraph is in git history if he wants it back.
- `client/src/lib/positioning.ts` (`HOME_WHO`, the home page): the clause "I
  founded the Pastors Connection Network, and".
- `client/src/lib/site.ts` (`AUTHOR_BIO`) and the same sentence written out on
  eight book pages; `client/src/components/AuthorBio.tsx` (end of every essay).
- `client/src/pages/HardIssuesSeries.tsx`: the eyebrow, title, description and
  JSON-LD no longer name the network; both "give a gift to PCN" buttons and
  the closing "Keep this free for the next pastor" section are gone.
- `client/src/lib/donate.ts` deleted (it held the network's live donation
  link; nothing imports it now).
- `/authors/:slug` (which had a "Pastors Connection Network" author page with
  made-up article lists) redirects to `/about` in App.tsx and vercel.json.
  `AuthorProfile.tsx` stays in the repo, unrouted.
- `client/public/needs/pastors.json` and `work-burnout.json`: the "Go deeper"
  link to the network. Seven editorial slot notes in `client/public/needs/`
  lost the clause "founder of the Pastors Connection Network" (two notes that
  were only about the network were removed).
- `client/public/llms.txt`, `client/index.html` (the shell description),
  `scripts/prerender-heads.mjs` (About description, Person and Organization
  schema).
- Tests updated: `siteNav.test.tsx`, `ministry-pages.test.tsx`; new assertion
  in `site-structure.test.ts` that no path redirect leaves the site.

Not changed (not reachable by a visitor, or not this unit's to change): the
unrouted page files that still name it (`Pastors.tsx`, `ForPastors.tsx`,
`ForLeaders.tsx`, `PastorsResourceWall.tsx`, `Pillars.tsx`, `Exile.tsx`,
`StartHereDiagnostic.tsx`, `ArticleCollections.tsx`,
`landing/PastoralBurnout.tsx`, `tools/PastorBurnout.tsx`,
`tools/ChurchHealth.tsx`, `leadership/LeadershipHub.tsx`,
`components/PastorSignup.tsx`, the unrouted `pages/books/*`), code comments,
the admin sync panel, the server feed-sync code, seed scripts, `content/`
drafts, and the retired essays in the database and static library.

### 3. Facts about James

No title, no years, no book count, no "nearly eighteen thousand pastors"
anywhere a visitor, a search engine or an assistant reads:

- About: search title is "About James Bell"; description and Person schema
  say he pastors a church in Fenton, Michigan, and writes, came to faith from
  atheism, was raised without a father and has five sons. Header lines read
  "Pastor, First Baptist Church of Fenton, Michigan / Founder, ENDS / Host,
  Following the Way / Writer". In his body text only the numbers came out:
  "for twelve years", "Twelve years in that room" (now "Years in that room"),
  "{21} books so far" (now "Books on theology"), "fifteen years of mistakes"
  (now "years of mistakes").
- `AuthorBio`, `AUTHOR_BIO`, the shell description, prerender heads, llms.txt:
  reworded to the confirmed facts in NOTES.md.
- `/roadmap`: out of the sitemap and the prerender static list, `noindex`,
  unlinked from /books. The "Forty-eight books is the plan. Twenty-one are
  already in print" line is gone and the page shows the three shelf books
  (from `lib/bookShelf.ts`) in place of the database list, which linked the
  off-shelf titles. The empty "In development" section hides itself.
- `client/src/config/siteStats.ts` is now used only by the unrouted
  Membership page. Left in place.

### 4. Books agree with the three-book shelf

- The five off-shelf pages (`/books/deconstruction-of-faith`,
  `/books/the-reliability-of-scripture`, `/books/bible-and-homosexuality`,
  `/books/bible-and-transgender-identity`,
  `/books/critical-race-theory-biblical`): `noindex` in the page and in the
  prerendered file, out of the sitemap, badge reads "Ebook" in place of "New
  Book · Ebook Available Now". Nothing deleted; the buy buttons still work.
- `BookNextSteps` ("More from James Bell" at the foot of every book page) now
  lists the shelf less the current book, so no page links an off-shelf title.
- `scripts/build-catalogue.mjs`: the catalogue (Downloads, search) lists the
  three shelf books only.
- Database book pages (`/books/:slug`, `BookDetail.tsx`) are `noindex` and out
  of the sitemap unless on the shelf.
- `scripts/prerender-heads.mjs`: a page whose `<SEOMeta>` says `noindex` now
  gets its own static head with noindex. Before, such pages were skipped and
  served the shell's "index, follow".
- "Read the opening free" led to a sales page with no excerpt. /books now says
  "See what is in the book" and "Each one is an ebook for $8.99"; the home
  page link reads "See all three"; the search description matches.

### 5. Giving

- "Give a gift" is off every study guide (`studyguides/StudyGuide.tsx`) and
  off the Hard Issues page.

### 6. /subscribe

- The page no longer promises "one serious essay a week" or "the first essay
  you get will match it". It says what happens: the newsletter goes out
  through Substack, a Substack tab opens to confirm, new essays arrive when
  published, and everyone gets the same newsletter. The four audience choices
  in `SegmentedSignup.tsx` no longer promise different mailings.

## What I ran

- `pnpm check`: passed.
- All 33 commands of the CI content-gates step: passed.
- `pnpm test`: 113 files passed, 7 skipped (1307 tests passed, 73 skipped).
  After the last small edits, the client project again: 80 files, 686 passed.
- `pnpm build`, `pnpm sitemap`, `pnpm prerender`, `pnpm audit:canonicals`:
  2266 sitemap URLs, 0 failures. `dist/` removed afterwards.
- ESLint on touched source files: clean except one warning that predates this
  work (`SegmentedSignup.tsx` line 73, an unused eslint-disable directive).
- Chromium at 390x844 and 1440x900 on the built site: /, /about, /books,
  /books/believe, /books/deconstruction-of-faith, /roadmap, /subscribe,
  /resources/hard-issues-series, /studyguides/after-christendom, /terms,
  /help/pastors, one essay, and the redirects /membership, /pastoral-burnout,
  /pastors, /authors/james-bell, /sermon-series, /leadership/anything. No
  sideways scroll, no mention of the network in any page's HTML. Screenshots
  in `/home/user/elite-shots/truth/`.

## Not verified

- Dark mode screenshots (no new colors were added; the roadmap's planned
  section changed from `--bone` to `--bone-warm`, both existing tokens).
- The Vercel redirects themselves (checked by the structure test and by the
  in-app stubs, not on a deployment).
- Anything in the production database: the About settings row, book rows and
  essay bodies may still state a title, years, a book count or the network.
- The PDFs and EPUBs (Hard Issues booklets, study-guide PDFs, ebooks) were not
  opened. Some carry the network's name on the cover or inside
  (`client/public/books/alone-in-a-crowded-church.svg`, two ebook files).
- The portrait on About did not load in the sandbox (it is served from an
  outside host), so that corner of the page was not seen.

## Waits for James

1. The five off-shelf books are still purchasable at their old addresses.
   Keep them for sale, or switch the payment links off?
2. Eleven study guides say "drawn from James Bell's book ..." and name books
   not on the shelf (Raising Believers, After Christendom, Deep Roots,
   Mishpat, Consider the Birds, The Undivided Life, The Captive Church, Where
   Your Treasure Is, Character Before Competence, Alone in a Crowded Church,
   and Believe, which is on the shelf). The line is written into each guide's
   summary and bulletin blurb and into the PDFs, so it was not a one-line
   change. Should it stay?
3. The Hard Issues booklets came from the network. The page no longer names
   it, but the files may. Keep the booklets on this site?
4. About lost his paragraph on why he started the network. Is that what he
   meant by keeping it outside?
5. "One serious essay a week" still appears in the footer signup, the home
   page signup, the essay-end signup, the ebook thank-you page and a few
   others (`NewsletterSignup.tsx` defaults, `Home.tsx`, `Writing.tsx`,
   `EbookThankYou.tsx`, `LandingSignup.tsx`, `TestTheCase.tsx`,
   `StartHereQuiz.tsx`). Only /subscribe was in this unit; the rest belongs
   with the connect unit and decision 10.
6. The three shelf pages still say "New Book · Ebook Available Now".
7. Paid ebook files can still be downloaded by address (audit decision 5).
8. ENDS and the Following the Way podcast are still named and linked.

## Decision Log lines to add

- **No membership (James, 2026-11-17).** `/membership` redirects to
  `/subscribe`. The Stripe membership procedures and settings remain in the
  code, unused by any page.
- **The Pastors Connection Network stays outside the site (James,
  2026-11-17).** No link, no ask, no redirect to it. Old pastors' addresses
  land on `/help/pastors`, `/study`, `/resources` or `/writing`.
  `site-structure.test.ts` fails on any path redirect that leaves the site.
  This replaces "the outbound homes of PCN and ENDS" under About and the
  Strategic Reminder that treats PCN as the growth channel.
- **Facts about James.** No title, years in ministry or book count anywhere
  until he gives one set. `/roadmap` and `/authors/:slug` are out of the index
  (`/authors/:slug` redirects to `/about`).
- **Books.** Only the three shelf books are indexed, listed or linked. The
  five off-shelf pages stay reachable and noindex until James decides.
- **No giving.** The gift link is off study guides and the Hard Issues page;
  `lib/donate.ts` is deleted.
- **Prerender.** A page with a literal `noindex` on `<SEOMeta>` now gets a
  static head that says noindex.
