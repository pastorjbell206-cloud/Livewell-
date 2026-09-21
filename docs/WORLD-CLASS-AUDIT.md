# LiveWell, audited against the best sites in the world

*September 2026. Every number below was measured on the built site from this
branch (PR #459), with real phone emulation, or read from the code. Where I
could not measure, I say so. Grades are against the best writing platforms on
the web, not against last month's LiveWell.*

## The verdict in one paragraph

The writing is the product, and the writing is already better than most of
what it competes with. The platform underneath it is strong in the places most
sites are weak (self-hosted fonts, a real design system, structured data on
every essay, static essays that need no server, a gated purchase path) and weak
in the places a reader feels first: too much on every page, no real photograph
anywhere, a front door that tries to open 273 rooms at once, and a body of
essays that is three times larger than a reader can hold in their head. The
work from here is not adding. It is cutting, focusing, and making the few
things that matter unmistakable.

**Overall: B+.** Top ten percent of independent writing sites. Not yet one of
the best in the world. The gap is editorial and photographic, not technical.

---

## Scorecard

| Area | Grade | The one sentence |
|---|---|---|
| Writing and voice | A- | The essays are the strongest asset on the site; a batch of 59 survey essays and 128 stubs drag the average. |
| Design and typography | B+ | A real system, handsome type, no photographs, and too many things on every screen. |
| Information architecture | C+ | 273 routes, 46 footer links, 23 tools, 21 books, 678 essays: a reader cannot tell what matters. |
| Homepage | B | Content-first now, but it still tries to do six jobs. |
| Essay reading experience | A- | Drop cap, table of contents, focus mode, progress bar, art, next steps. Best page on the site. |
| Performance | B | Lighthouse 77 on the front page; 1.5 MB on first load, 275 KB of it fonts, 555 KB an index the front page barely uses. |
| Accessibility | A- | Lighthouse 100 on home; axe has not actually run in CI for months (driver mismatch). |
| SEO and discoverability | A | 1,447 prerendered heads, structured data, canonicals, sitemap, plain-language descriptions, llms.txt. |
| Purchase and delivery | B+ | Gated and verified as of this branch; Stripe prices still need one click from James. |
| Email and audience | C | Two capture systems (Substack and a local list), one sender, no automation, no welcome series live. |
| Search | C- | A search box that only opens the writing index with a query; no ranking, no tools, no books. |
| Trust and about | B | Strong biography, one photograph, no contact page linked from the essay, no way to see who James is in a hurry. |
| Engineering health | A- | Typed end to end, 359 tests, 16 validators, two runtimes kept in parity, one 3 MB chunk that should not exist. |
| Analytics and learning loop | D | Vercel Analytics is installed; nobody reads it; nothing on the site changes because of it. |

---

## 1. Writing and voice

**What is true.** 678 essays, 1.37 million words. Mean sentence 17.8 words.
Forbidden-language hits in the banned sense: zero, as of phase 5. Ninety-two
essays have question titles. The flagship essays (the gospel, the kingdom, the
Bible without bending it) open with scenes, not abstractions, and end on
verdicts. That is the voice the site should be judged by, and by that voice it
is excellent.

**What drags it.**

- *The survey batch.* Fifty-nine essays with HTML bodies (church history,
  denominations, the nones, deconstruction) were written in a briefing register:
  statistics first, third person, the writer never in the room. They are
  competent and they are not James. The scanner ranks them at the top of the
  "needs a human ear" list almost entirely because "I" never appears.
- *The stubs.* 128 database posts under 200 words. A reader who lands on one
  from search gets a paragraph and a dead end. Better to have 550 essays than
  678 with 128 that embarrass the rest.
- *The pastor material.* 43 database essays and the 93 listed in the archive
  still carry the pastoral pillar on a site whose stated audience is no longer
  pastors.
- *Length without shape.* 17.8 percent of sentences run thirty words or more.
  In the flagships that is rhythm. In the survey batch it is a lecture.

**Recommendations.**

1. Unpublish the 128 stubs, or merge each into the essay it belongs beside.
   One weekend. The library gets smaller and reads stronger.
2. Rewrite the openings of the fifty-nine survey essays in the first person, or
   move them to a clearly labelled "Field guides" section where a briefing
   register is expected. Three rewrites are already drafted for review.
3. Finish the pastor move. Publish the 93 on PCN, redirect, unpublish here.
4. Pick twelve essays as the canon. Feature them everywhere, print them as a
   free PDF, make them the reading path for a first visit. Nobody can hold
   678; everyone can hold twelve.

## 2. Design and typography

**What is right.** Cormorant Garamond at weight 400 for display and Inter for
body is a genuinely good pairing, and the site holds it. Cream, charcoal,
mustard used as punctuation. Tokens in one place, dark mode that works. Since
phase 3 the global reset actually ships, so spacing is what the design intended
for the first time since July.

**What is wrong.**

- *No photographs.* One portrait, served from a third-party CDN. Every other
  image on the site is generated geometry. The generated art is good and it is
  still not a photograph of a man, a church, a desk, a table. The best writing
  sites in the world (The Atlantic, Aeon, a well-run Substack) put a human face
  and a real place near the top of the page. This is the single largest
  aesthetic gap and it cannot be closed by code.
- *Density.* The front page has 104 links. The essay page has 67. The footer is
  five columns and 46 destinations. A reader's eye has nowhere to rest. The
  best sites make one thing large and leave the rest quiet.
- *The announcement bar.* "The shelf is down to three books" sits above the
  masthead on every page. It reads as an apology. An announcement bar should
  carry news a reader wants, or not exist.
- *Cards everywhere.* Essays, tools, doors, books, reading paths all render as
  the same bordered white card. Cards are for things that are alike. When
  everything is a card, nothing is featured.
- *Charcoal heroes on every hub.* Home, writing, tools, books, family, notes
  all open with the same full-bleed charcoal block and an eyebrow. It is a good
  move used so often it has stopped being a move.
- *Mustard on buttons and links and rules and kickers.* The 8 percent rule in
  the brand contract is roughly honored, but mustard is doing four jobs. Give
  the link colour to ink with an underline and let mustard mean "act."

**Recommendations.**

5. Commission or take twelve photographs: James at the desk, the church
   exterior and interior, the table, the town, hands on a Bible, a Sunday
   morning. Use them on Home, About, Start, Books, and the six flagship essays.
   This is the highest-return change on this list.
6. Cut the front page to three sections: one essay, large, with a photograph;
   the four doors; the three books. Move "What brings you here" to /start.
7. Retire the announcement bar unless there is news.
8. Give each hub its own opening: writing opens on the newest essay's art,
   books on a cover, tools on a question. Not six identical charcoal blocks.
9. Halve the footer. Four columns, twenty links, one email form.

## 3. Information architecture

**What is true.** 273 routes. 243 page components. 23 tools. 21 books in the
catalogue, of which three are on the shelf and the rest are archived, sold as
ebooks, or listed as roadmap. Nav has four doors, which is right. The footer
undoes the four doors by listing everything.

**What is wrong.** The site was built by accretion. Every idea became a page.
There are three separate "questions people ask" surfaces (/answers, the
apologetics essays, the teen series), two Bible tools that overlap (Deep Bible
Companion, Bible Reference), two family devotion surfaces, a "map", a
"framework", "the pillars", "explore everything", and "article collections",
all of which are ways of browsing the same 678 essays. A newcomer cannot tell
which is the real door.

**Recommendations.**

10. One way to browse the writing: /writing, with the track filter. Redirect
    /explore, /map, /framework, /pillars, /article-collections into it (keep
    the URLs, lose the pages).
11. Cut the tools from 23 to the 8 that people finish: the Whole-Life
    Assessment, the Marriage Assessment, the Deep Bible Companion, the
    Family Devotion Builder, the Theology Quiz, the Wisdom Finder, the
    Prayer Generator, the Life Audit. Archive the rest behind their URLs.
    Measure which of the eight get used, then cut again.
12. One "questions" surface. /answers becomes the home of the question-titled
    essays and the apologetics series; the teen series lives under it as a
    filter, not a separate world.
13. Books: three on the shelf, the rest in a single "More from James" list on
    /books with buy buttons, no separate hub pages unless a book earns one.

## 4. Homepage

**Measured.** 535 DOM nodes, 104 links, one h1, no images, 1.5 MB transferred
on a phone (fonts 275 KB, JavaScript 582 KB, CSS 101 KB, the essay index 555
KB). Load event at 385 ms on a fast local server; Lighthouse performance 77 in
CI, which means real phones on real networks are seeing 3 to 5 seconds.

**What is right since phase 3.** Featured essays come before the ask. Cards
carry art. One subscribe block.

**What is still wrong.** The hero headline says the site's sentence but shows
nothing. Six flagship cards is three too many. "What brings you here" is a
second homepage inside the first. The essay index the front page downloads is
555 KB to draw six cards.

**Recommendations.**

14. Hero: one photograph, one line, one button ("Start here"). The positioning
    sentence moves to the About block below.
15. Three flagship essays, not six, with a fourth slot for the newest.
16. Build a 6 KB `featured.json` at deploy and stop loading the full index on
    the front page. This alone cuts first load by a third.
17. Move "What brings you here" to /start and link it once.

## 5. The essay page

**Measured.** 370 DOM nodes, 39 requests, 1.48 MB on a phone. The JavaScript
alone is 1.07 MB because the page pulls in the discussion guides (193 KB) and
the argument cases (62 KB) for every essay, whether or not that essay has
either.

**What is right.** This is the best page on the site: static-first, drop cap,
table of contents, reading progress, focus mode, the art, plain-language
description in the head, QAPage data for question titles, the series note, and
next steps.

**What is wrong.** The kicker, deck, byline row, art, focus button and first
paragraph compete above the fold. The "next steps" block at the end offers too
many doors (related essays, a tool, a book, the newsletter, the discussion
guide). The share buttons are generic.

**Recommendations.**

18. Load discussion guides and argument cases only for the essays that have
    them (a tiny index, then a lazy import). Cuts essay-page JavaScript by 25
    percent.
19. Above the fold: kicker, title, deck, art. Byline and reading time under the
    art. Focus button in the toolbar, not in the flow.
20. End of essay: one next essay, one ask. Not five.
21. Pull quotes as share cards (the social-quotes data already exists) with the
    essay's art as the background, so a shared line looks like LiveWell.

## 6. Performance

**Measured.**

| | Front page | Essay page |
|---|---|---|
| Requests on a phone | 21 | 39 |
| Transferred | 1,538 KB | 1,476 KB |
| JavaScript | 582 KB | 1,072 KB |
| Fonts | 275 KB (7 files) | 275 KB |
| Lighthouse performance (CI, home) | 77 | not measured |
| Layout shift | 0 | 0 |

The build emits 285 chunks. One of them, `content-data`, is 3.1 MB (1.08 MB
gzipped): the whole seed database bundled into the client. Checked further: it
is imported only by the admin dashboard and loads only there, so readers never
download it. It is still a 3 MB chunk in a public build that should be a fetch.
The entry chunk is 326 KB before gzip.

**Recommendations.**

22. Get `content-data.json` out of the client bundle entirely. The two library
    modules that import it need a slug list and a handful of titles; emit those
    at build time. This is the biggest single technical fix on the site.
23. Fonts: three weights of Inter and three of Cormorant, plus italic, on
    every page. Subset to 400 and 600 Inter, 400 and 500 Cormorant, 400 italic
    Cormorant, and preload the two used above the fold. Saves 100 KB per visit.
24. Serve the WebP book covers (11 KB) instead of the JPGs (184 KB). The files
    already exist. The books page moves 613 KB of images on a phone for three
    covers.
25. Target: Lighthouse 95 on home and essay, under 700 KB first load. That is
    where the best sites sit, and everything needed is already in the repo.

## 7. Accessibility

**Measured.** Lighthouse accessibility 100 on the front page. Skip link, one
h1 per page, alt text on every image measured, focus rings, reduced-motion
respected, contrast passes in both themes on the surfaces I checked.

**What is wrong.** The axe run in CI has been silently skipped for months
because of a Chrome and ChromeDriver version mismatch, and only the front page
is audited anyway. So the 100 is the front page's score, and nothing verifies
the 272 other routes.

**Recommendations.**

26. Fix the CI axe step (pin ChromeDriver to the runner's Chrome) and run it
    against the prerendered HTML of ten routes, not one.
27. Hand-check the tools. Assessments with radio groups, progress and results
    screens are where accessibility fails on sites like this.

## 8. SEO and discoverability

**Measured.** 1,447 prerendered pages with their own titles, descriptions,
canonicals and structured data. Article, Breadcrumb, Organization, WebSite and
now QAPage schemas. A sitemap of 1,447 URLs. Plain-language meta descriptions
on every essay. llms.txt and a full-text llms-full.txt for answer engines. Open
Graph cards in the brand fonts. Best-practices 96 and SEO 100 in Lighthouse.

This is the strongest technical area on the site and it is better than most
professional publications.

**What is missing.** No FAQ blocks inside essays (the QAPage data comes from
the standfirst, which is good, but Google rewards visible question-and-answer
sections). No internal-link discipline: essays link out to tools and books but
rarely to each other in the body. No author schema on the About page with the
`sameAs` links to Substack and Facebook (the Organization schema has them; the
Person page should). Titles are verdicts, which is right for the reader and
costs search volume; the plain-language layer offsets that without touching
the H1.

**Recommendations.**

28. Add a "Related" block of three internal essay links inside every essay,
    chosen by track and topic, not at the end but two-thirds of the way down.
29. Person schema on /about with `sameAs`.
30. Do not chase keywords in titles. The plain-language descriptions are the
    right instrument. Watch Search Console for six months before changing
    anything else.

## 9. Purchase and delivery

**As of this branch.** The three hand-written books are gated: files in the
server's private store, download only against a paid Stripe session, EPUB and
PDF, thank-you pages that verify first. Twenty-three other ebooks use the same
gate. Six older ebook pages still serve files from public folders.

**What is wrong.** Three different checkout mechanisms exist (server Checkout
Sessions, Payment Links, an embedded Buy Button). Until James clicks "Create
Stripe prices" in the admin, the three books fall back to the older two, and
those only deliver if their redirects carry the session id. There is no
receipt email from the site itself, no re-download link by email, and no
bundle ("all three for $19.99"), which is the highest-converting offer a
three-book author can make.

**Recommendations.**

31. One click in the admin to create the prices; then delete the Payment Links
    and the Buy Button so there is one path.
32. Move the six older ebooks behind the gate (one-line change each).
33. Send a receipt with a re-download link from the site (Resend or Postmark,
    a fifty-line function).
34. A three-book bundle at a real discount, on /books, above the fold.

## 10. Email and audience

**What is true.** Two systems: a local subscriber table (footer, landing
forms) and Substack (the newsletter, the serialized book). The site's forms
record locally and hand off to Substack. There is no welcome email, no
sequence, no segmentation by the four audiences the brand contract names.

**What is wrong.** A reader who signs up on the site gets nothing from the
site. The Facebook audience (the largest room James writes into) has no path
to the email list except a link. Substack owns the relationship.

**Recommendations.**

35. One list. Either Substack is the list (and the site's forms post straight
    to it) or the site is (and Substack imports). Two lists means two truths.
36. A welcome sequence of three emails: the atheist-in-the-pulpit essay, the
    three books, the twelve-essay canon.
37. A Facebook-to-email bridge: every Note ends with one line and a link to a
    page that offers the canon PDF for an address.

## 11. Search

**What is true.** The masthead search box sends a query to the writing index,
which filters titles and excerpts. Books, tools, notes and the libraries are
not searchable. There is no ranking and no "did you mean."

**Recommendation.**

38. A single static search index (Pagefind or a build-time MiniSearch JSON)
    over essays, books, tools and notes, with the essay art in results. A day
    of work and a real improvement to how findable 678 essays are.

## 12. Trust, about, contact

**What is right.** The About page is honest and specific: atheist, five sons,
the church, the network. The biography reads like a person.

**What is wrong.** One photograph, hosted on someone else's CDN. No short
"who is this" near the essays: a reader who lands on an essay from search
never sees a face or a sentence about the author until the footer. No contact
page in the essay's reach. The positioning sentence appears on the homepage
and in the head but the About page does not lead with it.

**Recommendations.**

39. An author card under every essay: photograph, two sentences, one link.
40. Host the portrait on the site.
41. A visible contact path from every page (footer has it; the essay's end
    should too).

## 13. Engineering health

**What is right.** TypeScript end to end. 359 tests including money-path
contract tests and a route smoke net that reads the route table. Sixteen
content validators as CI gates. Two runtimes kept in parity by a test. Design
tokens in one file. Self-hosted fonts. Static essays. A prerender that gives
every route its own head. Security headers set (CSP, HSTS, frame options,
referrer policy, permissions policy).

**What is wrong.** The 3 MB client chunk. Two server implementations of the
same API, which every change has to be made twice. 243 page components, many
of which are one-off landing pages that will never change again and could be
content. The CI quality job's axe step does not run. Node 20 actions are
deprecated on the runner.

**Recommendations.**

42. Kill the 3 MB chunk (see 22).
43. Convert the one-off landing pages (the 25 "X vs Y" and "What is Z"
    comparison pages, the ebook funnels) to content-as-data rendered by two
    templates. Fewer components, same URLs, one place to fix a design bug.
44. Fix the CI axe step and bump the actions to Node 24.

## 14. Analytics and the learning loop

**What is true.** Vercel Analytics and Speed Insights are installed and
reporting. I could not read them from this session (the Vercel connection
needs an approval only James can give), so every recommendation above is made
without knowing which pages people actually visit.

**What is wrong.** A site with 273 routes and no habit of looking at which 20
carry the traffic will keep building the wrong things.

**Recommendations.**

45. Once a month, look at the top twenty routes and the top ten referrers.
    Cut, feature and write based on that list. Everything in sections 3, 4 and
    11 of this audit should be re-checked against it.
46. Add Search Console. It is free and it is the only way to know which
    questions people arrive with.

---

## What to add

- Photographs (5). The one thing code cannot supply.
- A twelve-essay canon, featured everywhere and available as a free PDF (4).
- An author card under every essay (39).
- Site-wide search (38).
- A welcome email sequence and one list (35, 36).
- A three-book bundle and a receipt email (33, 34).
- Related-essay links inside the body (28).

## What to take away

- 128 stub posts (1).
- 15 of the 23 tools (11).
- The five duplicate ways to browse the writing (10).
- The announcement bar (7).
- Half the footer (9).
- Three of the six homepage flagship cards, and the second homepage inside the
  first (15, 17).
- Two of the three checkout mechanisms (31).
- The 3 MB chunk and 100 KB of fonts per visit (22, 23).
- The 93 pastor essays, to PCN (3).

## What to improve

- The survey batch's voice (2).
- Hero, hubs, and the card-everywhere habit (14, 8).
- The end of every essay: one next step (20).
- First-load weight to under 700 KB (16, 22, 23, 24).
- The CI accessibility check so it actually runs (26).

## What not to do

- Do not add a new section. The site has enough rooms for five years.
- Do not move to a new framework. Nothing here is a framework problem.
- Do not rewrite the flagship essays. They are the standard.
- Do not turn the verdict titles into search questions. The plain-language
  layer already does that job without costing the voice.
- Do not add a membership paywall before the email list and the bundle exist.
  Sell the books; keep the essays free; that is the position.
- Do not buy stock photography. A stock church is worse than no church.

## What I could not do from here

- Read real traffic (Vercel Analytics needs an approval only James can give).
- Read Search Console (not connected).
- Run axe across the site (the CI step is broken and the local runner lacks
  the driver).
- Judge the Substack side by side (its settings live in James's account).
- Take a photograph.

## The order to do it in

1. **This week, James alone:** create the Stripe prices; take or commission
   the twelve photographs; pick the twelve-essay canon.
2. **Next, one engineering pass:** kill the 3 MB chunk, subset the fonts,
   featured.json on the front page, WebP covers, lazy discussion guides. First
   load under 700 KB. Fix axe in CI.
3. **Then, the cut:** stubs out, tools to eight, browse pages redirected,
   footer halved, announcement bar off, homepage to three sections with a
   photograph.
4. **Then, the additions:** author card, search, related links, welcome
   sequence, bundle, receipt.
5. **Then, the voice:** the survey batch, essay by essay, in the first person.
6. **Every month after:** the top-twenty-routes review.

Done in that order, this is a site in the top one percent by spring. The
writing is already there. The rest is subtraction and a camera.
