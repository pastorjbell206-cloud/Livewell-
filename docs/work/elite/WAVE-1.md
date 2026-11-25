# Wave 1: what changed, what the reviewers said, what is left

Written 2026-11-18 on `elite/integrate`. This wave is the ten units in this
folder (`bible`, `connect`, `design`, `family`, `history-answers`,
`home-start`, `names-content`, `names-pages`, `tech`, `truth`), the
integration that joined them, and one round of fixes after three reviewers
read the result. Each unit file has the detail; this page is the summary.

## What changed for a visitor

**Bible study.** The Study Bible opens on the chapter's own text with no
loading screen over it. A chapter prints its hard question and study
questions straight after the text. Poetry is set in lines. There is a new
page that searches every verse for a word or a phrase
(`/study/bible/search`), now also in the sitemap and `llms.txt`. On a phone
the small controls on a chapter (the other translations, the summary links,
the note chips, the previous and next buttons) are now a full thumb's height.

**Church history.** Church history is one course of fourteen essays read in
order, with previous and next, and eight longer essays for going deeper. A
person, council or heresy named in an essay links to its own entry. Early
essays show checked excerpts from the sources. An essay no longer jumps as
it opens: the page that was prerendered stays on screen until the essay has
arrived. If the course files do not load, the page says so and offers a
retry, where before it said "Loading the course" for good. The name links no
longer use a pattern that older iPhones cannot read.

**Hard questions.** `/topics` lists the questions in a reader's words and
opens the best page for each. Search now finds the answer on the
resurrection when someone types "Did Jesus really rise from the dead?", and
four answers carry the other words people use for them. The links at the
foot of each answer are full-height tap targets.

**Family.** Tonight's devotion is one tap from Home. A family keeps its own
place in the catechism, a reading plan starts on a date, and "A devotion for
tonight" picks one for the night the family is having. The link to the 2027
plan is called by its current name everywhere.

**Discipleship.** `/start` is a six-step road for someone new to the faith or
coming back, in order, each step a page on this site.

**Essays and books.** Essays are set in a reading face (Source Serif 4) at a
book's measure. Titles on the essay shelf now use the same curled quotation
marks as the essay's own headline. The Books page says plainly that James
wrote the three books and that each is an ebook for $8.99; Home's Books door
no longer promises a free opening that the Books page had stopped offering.

**Reaching James.** `/connect` is back as "Find James": Substack, Facebook,
the newest essays, the contact form, speaking, the books. Every signup says
only what happens (the email is saved here; the subscription finishes on
Substack). The contact form says "saved for James to read" because nothing
is emailed yet. No page asks for a gift or offers a paid membership.

**The Pastors Connection Network.** It is not named or linked on any page,
menu, redirect or text file. This round found it in three more places and
took it out: seven of the ten Hard Issues booklets name it inside the PDF
and EPUB (title page, copyright line, or the text), so those seven files
were moved out of the served folder to `content/held-booklets/` and their
old addresses now lead to the booklets page; the cover images of all ten
booklets carried the network's name under James's, and that line is painted
out, on the site and inside the three EPUBs still offered; and the speaking
page's line "A network of pastors who have been through the same" is gone.
The booklets page now offers the three clean booklets and says the others
are off the page while their files are corrected.

**Design.** One reading face, one heading scale, one button family, one
label. Home's headline hyphen is a real hyphen (the old one fell back to a
heavy dash at the largest size on the site). The header wordmark and the
phone Subscribe button are full-height tap targets. `/search` lost its
"BACK" button, its bold serif headline and its uppercase pills. `/answers`,
`/books` and the church history essay use the same side margin on a phone
as every other page, and the dark headers of `/answers` and `/books` are
shorter on a phone so the first real item comes sooner. Emphasis in notes is
now a true italic (Inter italic, self-hosted, loaded only where used).

**Speed.** A chapter, an essay or a guide paints its own text from the HTML
and swaps to the live page in one step. Measured on the built site served as
Vercel serves it (`scripts/serve-like-vercel.mjs`), layout shift is 0.00 to
0.03 on the pages checked, at 390 and 1440 wide. The theology quiz shows the
"didn't load" panel when it gets no questions, where it used to show
"Question 1 of 0".

## The reviewers' scores

| Reviewer | Score | Findings |
|----------|-------|----------|
| First-time visitor (five visitors, phone and desktop) | 8 / 10 | 16 |
| Design director | 8.2 / 10 | 22 |
| Copy and code | 7.5 / 10 | 22 |

Their full findings are in `/home/user/elite-shots/review/*.json`.

Two things about the reviews themselves. The design director's two "must"
findings on layout shift (0.32 and 0.35 on the Study Bible) were measured
against `serve -s`, which answers every address with the home page; on a
server that follows `vercel.json` the same pages measure 0.00 to 0.02, so
that finding was not acted on. The shift on the church history essay was
real (0.16 desktop, 0.34 phone) and is fixed (0.02 and 0.03). And no
reviewer looked at the booklet covers as images, which is where the
network's name was still showing.

## Findings not applied, and why

- **Study Bible layout shift (design 1).** Not reproduced on a correct
  server; see above.
- **"The story in eleven acts" to "eleven parts" on /start (copy 5).** The
  page itself says "Eleven acts, one story" and labels each "Act"; only the
  search title says "parts". The link matches the page. Which word wins is
  listed for James.
- **Square corners on the Study Bible controls (design 11).** The site's own
  tabs and chips (`.hx-tab`, `.ed-chip`) are pills too. It belongs with the
  one-control work below, not as a one-page change.
- **Hide the Find Help tab on essays (part of design 12).** The tab is there
  on purpose so help is reachable from any page; the care standard outranks
  the chrome.
- **A 44px box round each verse number (part of design 6).** The whole verse
  is already the tap target; a bigger number box would overlap the line
  above and open the wrong verse.
- **Lower the prerender hold to three seconds (part of copy 22).** The
  failed-load marker was added; the six-second ceiling was the tech unit's
  measured choice and is kept.
- **"Ministry partnership" in the contact form (visitor).** A church asking
  to work together is an ordinary reason to write.
- **/writing layout shift of 0.54.** It comes from the test stub answering
  "no essays", which drops the shelf rows; with a real listing nothing is
  removed. Not testable without the database.

## Left for the next wave

1. **One page header.** Three header patterns do the same job (cream with
   eyebrow, charcoal block, cream without eyebrow). Build one `PageHead` with
   a charcoal variant, left-align `/tools`, add the eyebrow to `/writing`,
   `/connect` and `/search`, and get the first real item inside the first
   844px of every index page.
2. **One heading scale, applied.** About a third of h1 and h2 still carry
   their own sizes (Home and Books 34px on a phone, history essay 30/52,
   Answers and Books 60 on desktop; h2 runs 21 to 32). Point them at
   `--fs-h1`, `--fs-h2`, `--fs-h3`; make the 12px h2 on `/tools` an eyebrow;
   add a check to `validate-design.mjs` for a literal size on a heading.
3. **One button and one control radius.** Primary buttons come in six
   heights and three label styles; settle on `.btn` at 48px and `.btn--sm`
   at 44px. Decide pill or square for tabs, chips and the Study Bible
   toggle, and apply it everywhere.
4. **Essay chrome.** Twelve controls surround an essay. Reduce the top bar
   to Listen and one "Aa" control; one row of Save, Share, Print at the end
   with Copy link, Cite and Send inside Share.
5. **Each Honest Answer on its own page.** `/answers` is one page of 11,000
   words; an answer has only an anchor. Give each `/answers/<slug>`, keep
   the index, redirect the anchors, add each to the sitemap.
6. **Search order.** For a single word such as "resurrection", forty Bible
   verses come before the site's own pages. Put pages whose title holds the
   word first. "church history sources" finds nothing; index the source
   cards.
7. **Sources on the later history essays.** Checked source cards exist for
   the early essays only; the Reformation essay has a four-title list with
   no publisher, year or page, and no source is a link.
8. **Topics.** No row for the resurrection, Jesus or God by name; "Can I
   trust the Bible" and "Can I trust the church" carry the label "Find
   Help", which reads as crisis care (`KIND_LABEL.care` in `lib/topics.ts`).
9. **The Find Your Path quiz** (`/start/quiz`) still sorts into the old
   categories (Marriage, Calling and Purpose, Justice and Culture, Pastoral
   Ministry) that do not match the new doors.
10. **Family.** "72 of 72 · Foundations · Week 47 of the year" reads as two
    counters; "Send to my phone" is offered on a phone; `/family` is fifteen
    screens long on a phone.
11. **Voice pass on older content.** The Honest Answers still use em-dashes
    and stacked "Not X. Y." turns; `/about` has a section that recites the
    house style; the Believe page has a third-person blurb. None was
    rewritten here because the words predate this wave and some are James's.
12. **Dead code that still names the network.** `client/src/data/
    content-data.json` (eight retired posts and four `pcn-*` books, bundled
    only into the admin), `api/static-library.generated.ts`, the
    `/api/pcn/signup` endpoint, one fallback row in `api/index.ts` (line
    352), `scripts/book-pipeline/README.md`, and about seventeen page files
    that no route imports (`Pastors.tsx`, `ForPastors.tsx`, `Membership.tsx`
    and the rest listed in the copy review, finding 13).
13. **Smaller design items.** Preload or size-match Source Serif on reading
    routes; lead paragraphs on index pages in `--ink` not `--ink-muted`; a
    mat or outline for the two dark book covers on Home's charcoal band;
    curled quotes on Home's essay lists.
14. **`pnpm lint`** fails before and after this wave: 11 parse errors in the
    workflow scripts under `docs/work/` and 524 warnings. It is not a CI
    gate. Add `docs/work/**` to ESLint's ignores and work the warnings down.
15. **CLAUDE.md** still needs the Decision Log lines each unit file lists
    (it says 33 gate commands; there are 34), and "Contact forms send to"
    his Gmail address is not what the code does.

## For James

Money, the network, and what is on the site:

1. Seven Hard Issues booklets are off the site because the files name the Pastors Connection Network; send corrected PDFs and EPUBs (title page, copyright line, closing page, and the "PCN cohort" sentences) or say they should stay off.
2. The copyright line in those seven booklets reads "Copyright © Pastors Connection Network"; whose name goes there is yours to say.
3. The network's name was painted out of all ten booklet cover images; say if you would rather have new covers made.
4. ENDS is still named and linked (About menu, footer, /about, /connect, the author line); you said the Pastors Connection Network stays out and did not mention ENDS, so say whether it stays.
5. About lost your paragraph on why you started the network; confirm that is what you meant.
6. The five books no longer on the shelf can still be bought at their old addresses; keep them for sale or switch the payment links off.
7. Paid ebook files can still be downloaded by anyone who has the address.
8. Books are the only thing on the site that costs money ($8.99 each); Home now says so on the Books door.
9. Eleven study guides say "drawn from James Bell's book ..." and name books that are not on the shelf; say whether the line stays.
10. The three shelf pages still say "New Book · Ebook Available Now".
11. Nothing on the site says whether a church may print and hand out the guides and booklets; if it may, give the sentence.
12. There is no line on Home or in the menu "for pastors and churches"; say if you want one.

Facts about you and how to reach you:

13. Contact messages are saved to the admin inbox and not emailed; say whether you read that inbox or want a mail service set up.
14. The church's web address, so /connect and About can link it.
15. The podcast's https address (the site still links the http one), and one click on the ENDS address to confirm it.
16. "Short pastoral notes, most days" is how the site describes your Facebook; say if that is still true.
17. Is there a pace you want stated for the Substack ("one essay a week")? The site now promises none.
18. Your portrait is still loaded from an outside address and could not be fetched here; send the photograph so it can live on the site.
19. Showing your Facebook or Substack posts on the site itself needs you to supply them or approve an embed; today they are links.
20. Who is named as the author of the Study Bible notes is still open.

Wording that is yours:

21. Home's headline has two em-dashes ("Learning to follow Jesus — and live well — in post-Christian America."); you chose it on 2026-10-14, so it was left.
22. "Three books. Every word mine." on the Books page now reads "I wrote all three of these myself."; say if you want your line back.
23. On About, "It is closer to a writing desk — where a pastor…" keeps an em-dash and the closing band says "Same voice, different rooms."; both are your earlier words.
24. About has a section, "How the writing works", that recites the house style rules; say whether it stays.
25. The Believe page has a blurb in the third person ("He does not flinch and he does not flatter") on a site written in the first person.
26. The Bible's story is called "eleven acts" on its page and "eleven parts" in its search title; pick one.
27. "Booklets for the men who carry the weight of leading a church" is kept on the booklets page; the search description now says "elders and church leaders".
28. The one sentence under Home's headline is the last sentence of your paragraph; you may want a different one.
29. Three small lines are not yours and you may want to change them: the sentence shown when JavaScript is off, "Your answers so far were kept on this device…" on the assessment, and the 34 one-line descriptions of main pages in search.
30. The teen section on /family says the answers "were written for adults, so read them together."
31. The footer signup placeholder now reads "Your email".
32. "Honest answers ... from a pastor who was an atheist first" is still the /answers description.

Doctrine and Scripture:

33. Five catechism questions are asked twice (8 and 64, 11 and 56, 21 and 58, 47 and 61, 48 and 62); a family going in order now meets each repeat.
34. The catechism's wording on baptism and the Lord's Supper was not touched.
35. Children meet four Bible wordings on the family pages (Berean Standard Bible, a retelling, the King James in the Devotion Builder, and what looks like the ESV in one guide); choose one.
36. Whether Scripture should be set in the serif reading face; the brand contract names Inter for body text.
37. Poetry lines in the Study Bible come from punctuation; the real layout needs the Berean Standard Bible's own files.
38. /start tells a new Christian to read John first; your eight-week plan for a new Christian reads Mark.
39. /start points an adult to the family catechism; say if that is what you want.
40. Two essays give Polycarp's words in two translations; you may want them to match.
41. Printing a translator's name on a history source card waits on someone checking the volume against a scan.

Choices made for you that are easy to reverse:

42. The fourteen shorter history essays are the course and the eight longer ones are "Go deeper"; it is one list to swap.
43. A Study Bible chapter's hard question shows its answer one tap under the question so a reader thinks first.
44. A new family starts the catechism at question 1, and "Remember" in each devotion asks the family's own question.
45. The retelling stays on screen under the Bible text on the daily devotions.
46. Which devotions answer "there was a fight", "someone is sad" and the rest were chosen for you (`lib/familyChooser.ts`).
47. The "Everything on this" shelf is off /family.
48. The reading face is Source Serif 4; another face is one token and a handful of files.
49. An essay's top no longer offers "Send to my phone" or Print; both are at the end.
50. Essay block quotations stay in Cormorant italic.
51. An essay no longer ends with a book; say if you want the matching book back as one line.
52. Home shows both "Latest writing" and "Start with these".
53. The Find Your Path quiz was moved to /start/quiz, not folded.
54. Night reading (dark mode) works when forced on but is switched off; say when you want it offered.
55. The door is still called "Topics", and "the table" is still used in how-to titles.

Titles:

56. The eight live essay titles were not changed; they need the database as well as the shelf.
57. "The Megachurch Years, 1950 to 2010" stands in for "The Attractional Era"; your phrase is printed under it.
58. The history essay "How Christianity Became American, 1800 to 1950" sits close to the waiting essay "How American Christianity Became American"; one should change.
59. Three study guides that said "An 8-Week Study" now say five sessions, which is what the files hold.
60. "Democratic Socialism Is Not Soviet Communism" is a firmer heading than the one it replaced.
61. "Does God Cause Our Suffering?" for the group guide on natural evil is the audit's wording.
62. Four waiting essays carry the writers' titles where the audit wanted plainer ones (AUDIT.md 5.6).
63. One sentence is wanted under "The Bible Assumes You Will Be Wrong", in your words.
64. Seven /nation essays have a plainer search title than their headline (`lib/searchTitles.json`).
65. The tool names on /tools are the audit's wording, not yours.
66. Whether the old book list under a history essay should be called "Books behind this essay".

## What was run for this round

`pnpm check` (pass). All 34 commands of the content-gates step (pass).
`pnpm test` (125 files passed, 7 skipped; 1,425 tests passed, 73 skipped).
`pnpm build` (pass). `pnpm run sitemap`, `pnpm run prerender`,
`pnpm run audit:canonicals` (2,269 pages, 0 failures). `pnpm lint` fails as
it did before this round (11 errors in `docs/work/*-wf.js`, 524 warnings);
the files changed here lint clean of errors. Fourteen changed pages were
looked at in Chromium at 390x844 and 1440x900 on the build served by
`scripts/serve-like-vercel.mjs`; screenshots are in
`/home/user/elite-shots/wave1-fix/`.

Not verified: anything that needs the database or the live site (essay
pages, the admin, form submits, Stripe, `/rss.xml`); the PDFs built on
deploy; the About portrait; cover images of books other than the ten
booklets; the three public booklet EPUBs on a real reader after their cover
image was replaced (the archives test clean). One of four desktop loads of
John 1 measured a layout shift of 0.15 on the first load after a rebuild;
the other three measured 0.02.
