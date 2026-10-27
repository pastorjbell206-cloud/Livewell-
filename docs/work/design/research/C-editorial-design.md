# C. Editorial design: the reading room, its apparatus, and its rhythm

Research for the LiveWell redesign, cluster C ("editorial-design"), prepared
2026-10-27. James's brief asks for "the most organized, well-designed website
... elite and world-class, made by some of the best designers in the world,
very critical of what currently is, with a fresh vision ... interactive, with
things that draw people's attention." This file looks at the publications that
have done long-form reading on the web best and asks what LiveWell should take
from them without betraying "Unhurried. Weighted. Grown-up."

It goes beyond `docs/work/plan/benchmark.md`, which touched long-form reading
only through four findings (length holds on phones, Snow Fall and its
imitators, the CHI 2026 scrollytelling study, Wait But Why, and Plough's themed
issues). It assumes `MASTER-PLAN.md` sections 0 to 3, 6.2 (the essay page) and
8 (design modernization), and proposes only what the plan does not already
contain, or a sharper version of something it gestures at. Cluster A
(`A-SYNTHESIS.md`) covered the text-study apparatus around Scripture; this file
covers the essay, the index, the issue, the note, the figure, and the first
screen, and avoids repeating A's patterns.

**Method and limits.** Direct page fetches fail in this sandbox, so no live
page of any product was seen and nothing here is a screenshot or a measurement.
The evidence is of three kinds, and every claim below says which: (1) **code
read directly** from open-source repositories cloned into the scratchpad
(`design-src/`): Tufte CSS, the Gwern.net static repository (its CSS, JS and
page template), the Distill article template, Our World in Data's site code
(`owid-grapher`, the `site/gdocs` article components), The Pudding's Svelte
starter, and the New York Times' ai2html; (2) **the product's own words** in
about pages, help pages, announcements and job postings, reached through
search; (3) **reviews, interviews and secondary descriptions**, marked as such.
44 web searches were used. Nothing is described that was not seen described;
unknowns are listed in section 4.

**What LiveWell already has, so the patterns are calibrated.** The essay page
(`client/src/pages/ArticleDetail.tsx`) already has more reading tools than most
publications: Listen (the device's voice, which skips footnote marks), Text
size kept on the device, a Focus mode (68ch at 20px, line-height 1.9) that
hides the chrome, a contents card, a drop cap, quote-selection sharing,
`CitationCopy` with sermon, Chicago and APA formats, `TakeItWithYou`, a
progress bar, and no art between the header and the first sentence. Body type
is Inter at 18px in a 680px column (`--w-prose`) with line-height 1.75;
headings are Cormorant Garamond. Essays are Markdown in
`client/public/essays/<slug>.json` (`slug, title, excerpt, body, updated`),
rendered by `components/Markdown.tsx` with remark-gfm, so footnotes (`[^1]`)
already parse. `/writing` is a shelf grouped into sections from
`lib/shelf.json`, with `startWith`. The plan adds questions, sources, series
order, related links, an honest date, and a fixed nine-item foot (6.2). What
the page lacks is what the best editorial products have: the note at the claim
instead of at the bottom, a typographic house style that makes a page
recognizably LiveWell's without decoration, a record of the essay's own life
(revisions, corrections, reuse), an ending that is allowed to end, and a
rhythm of publication that is finite and numbered rather than a shelf that only
grows.

---

## 0. The short verdict

The best editorial products on the web share five convictions.

**The text is the interface.** Tufte CSS reserves color for figures and makes
links the color of the text. Gwern.net calls its method "semantic zoom": a
reader sees title, description, metadata, abstract and section heads first,
and goes deeper only where he chooses. The Atlantic's 2019 redesign was
described by its editor as "bold but classical, beautiful but spare, and
respectful of the reader." None of them decorates.

**The apparatus is part of the honesty.** Distill ends every article with
"Updates and Corrections," "Reuse" and "Citation." Our World in Data ends with
credits, endnotes, "Cite this work," "Past versions" ("We are a live site and we
keep our work maintained") and "Reuse this work freely," and pins "This article
is outdated" to the top of anything superseded. Gwern labels each page's status
and how certain he is. Sidenotes (Tufte, Gwern) put the source beside the
claim. For a site that writes toward the skeptic, these are not academic
furniture; they are the evidence that the writer has nothing to hide.

**Distinction comes from a system and from heritage, not ornament.** The
Atlantic went back to the type its founders chose in 1857 and reduced its mark
to one letter. Gwern draws drop caps from historic initial sets. The Public
Domain Review builds everything around real works from the past, each traced to
the institution that holds it. LiveWell has the richest archive of all to draw
on (two thousand years of the church's books, art and letters) and today shows
generated art.

**The publication is finite.** Increment published 19 issues, each on one
theme, and stopped. Works in Progress now prints six issues a year and keeps
publishing online. Craig Mod's "Subcompact Publishing" asks for issues of three
to seven articles with clear navigation. The Pudding numbers every story. The
Atlantic removed infinite scroll and the recommendation modules nobody clicked.
A numbered issue gives a reader an occasion and an end, and gives a pastor a
unit he can hand out. It is the habit without the streak.

**Interactivity is spent rarely, and placed beside the argument.** The Times'
graphics editor told the 2016 Malofiej summit that if a reader must do anything
but scroll, "something spectacular has to happen," that the Times had cut
steppers, tabs and sliders, and that content behind a tooltip should be assumed
unseen. The two most memorable Times interactives in this research ask the
reader about himself (draw your guess; answer 25 questions about how you talk)
and then show him reality. The Pudding shows the top-line finding first and lets
the reader explore after.

None of these products serves LiveWell's reader. Gwern and Distill serve
researchers; OWID serves people looking for data; the Times, the Atlantic and
Aeon serve general readers on a news or ideas cadence; Stripe Press, Works in
Progress and Increment serve technologists. The opening is to bring their
reading apparatus and their finite rhythm to a pastor's theological writing,
where the honesty of the apparatus matters more than anywhere else, and where
the archive to draw on is the church's own.

The fifteen patterns in section 2 are ranked by how much they would change the
experience of reading one essay and of returning to the site, weighed against
their fit with the brand. The top four (notes beside the text, a house style
drawn from the book, the honest foot, an ending allowed to end) are small to
medium work on pages the plan is already rebuilding.

---

## 1. The products

Each entry: who it serves; how it is organized; signature features and the
interactions behind them; type and look; how it holds attention; what to steal;
what is weak; and what the evidence is.

### 1.1 Gwern.net (code read: CSS, JS, page template)

*Who it serves.* One writer's long, heavily sourced essays and annotated
bibliographies, for readers who want to follow every claim to its source.

*How it is organized.* Each page opens with a title, then a metadata block
(template `template/default.html`, `#page-metadata`): tags, a one-paragraph
description, author, a date range, and three labels, then the body, then three
lazily loaded, collapsible sections at the foot: **Backlinks** ("the list of
other pages which link to this page"), **Similar Links** ("by text
embedding"), and **Bibliography** ("forward citations"). A design page states
the principles; a "design graveyard" page lists features tried and abandoned
(search, `gwern.net/design-graveyard`).

*Signature features (from the code).*
- **Page labels.** `page-status`: "abandoned / notes / draft / in progress /
  finished." `page-confidence`: "certainty," expressed "as Kesselman Estimative
  Words (ranging 0–100%: 'certain' / 'highly likely' / 'likely' / 'possible' /
  'unlikely' / 'highly unlikely' / 'remote' / 'impossible')." `page-importance`:
  "rating 1–10 about how much a topic matters to the world."
- **Sidenotes** (`js/sidenotes.js`, by Said Achmiz, 2019): Pandoc footnotes are
  moved into the left and right margins "when browser windows are wide enough,"
  repositioned to avoid colliding with each other and with wide figures, with a
  60px minimum gap; "particularly long sidenotes are also partially
  'collapsed'." Sidenotes appear only at `min-width: 1761px`; single-margin notes
  at 1497px. The file's own argument: sidenotes "enable the reader to
  immediately look at them without requiring user action to 'go to' or 'pop
  up' the footnotes."
- **Popups and popovers** (`js/popups.js`, `js/popovers.js`): hovering a link
  shows a preview after a 750ms delay (`popupTriggerDelay: 750`), fades out
  after 100ms; hover is switched off while the page scrolls and back on when the
  mouse moves, so scrolling past links does not spawn windows. Popovers are the
  touch equivalent.
- **Reader mode** (`js/reader-mode.js`): Auto, On, Off. When on, links in
  paragraphs are masked ("hold Alt key to show links in text"); it switches
  itself off when the reader reaches "See also," appendices, or the footer.
- **Hints that retire themselves** (`js/collapse.js`): labels on collapsible
  blocks show until the reader has expanded blocks three times on a desktop or
  six on a phone, a count kept on the device.
- **Special occasions** (`js/special-occasions.js`): Halloween (dark mode by
  default), Christmas, Easter, and an April Fools joke change the logo and
  ornaments.
- **Drop caps per page** (`css/default.css`, DROPCAPS): five historic initial
  faces (Cheshire, Goudy Initialen, yinit, Kanzlei, Deutsche Zierschrift),
  chosen per page in its metadata. An "X of the day" box at the foot is framed
  by ornaments.

*Type and look.* Monochrome, ornamented, dense. The design page (search) lists
four principles: aesthetically pleasing minimalism, accessibility with
progressive enhancement, speed, and semantic zoom; JavaScript is "not required"
for the core reading.

*Attention and habit.* Depth, not frequency. Backlinks make every page a hub;
the reader keeps going sideways, not forward through a feed.

*Steal.* Status labels (with care, see 2.10); backlinks; notes in the margin;
hover etiquette (a deliberate delay, nothing spawned while scrolling); hints
that disappear once learned; progressive enhancement.

*Weak.* The apparatus can outweigh the text; the author himself built a reader
mode to hide his own links (my reading of the feature). Sidenotes need a
1761px window, so most laptop readers never see them. The importance score is
the author grading himself. The JavaScript is very large (the repository's
`js/` folder holds dozens of files, some generated).

### 1.2 Tufte CSS and Edward Tufte's site (code read; one search)

*Who it serves.* Authors who want the typography of Tufte's books on the web;
Tufte's own site serves readers of his books and courses, with a moderated
forum ("Ask E.T.") where he answers questions on information design (search).

*How it is organized.* Tufte CSS is a single demonstration page (`index.html`):
Fundamentals, Epigraphs, Sidenotes, Figures, Code, ImageQuilts, Epilogue.

*Signature features (from the code and its text).*
- **Sidenotes and margin notes without JavaScript**: a `label` and a hidden
  checkbox sit in the text; the note follows in a `span`. On wide screens the
  note sits in the margin; at `max-width: 760px` it is hidden "until the user
  toggles them into view," then shows inline at 95% width. Margin notes have no
  number and use the symbol ⊕ as their toggle. The stated goal: "present related
  but not necessary information such as asides or citations as close as
  possible to the text that references them."
- **Two heading levels only**, defended with Tufte quoting the Feynman
  lectures: "all of physics in 1800 pages, using only 2 levels of hierarchical
  headings ... rather than the grunts of bullet points."
- **The new thought**: a section starts with vertical space, no indent, and the
  first few words in small caps (`span.newthought`), as an alternative to a
  heading: "Pick one approach and stick to it."
- **Epigraphs**: italic quotations with the source in a `footer`.
- **Color**: background `#fffff8`, text `#111`, "nearly indistinguishable from
  their 'pure' cousins, but dial down the harsh contrast ... reserving color
  for specific, careful use in figures and images."
- **Links** "match the body text in color and do not change on mouseover";
  underlined, because "blue text ... is crass and distracting."
- **Figures** kept "with the text that discusses them"; margin figures and
  full-width figures.

*Attention and habit.* None sought. The restraint is the identity.

*Steal.* The no-script note toggle; two heading levels; the new thought; the
epigraph; quiet links; color only where it carries information.

*Weak.* The body column is 55% of the page, pushed left even when a section has
no notes; on phones the notes hide behind a tiny number or ⊕ that the Times'
experience (1.5) says few will tap. It is a demonstration, not a system for
index pages, issues, or a site.

### 1.3 Distill (added; code read)

*Who it serves.* Researchers and students in machine learning, through
explanatory, often interactive articles carrying academic credit (a DOI).

*Signature features (from the template).*
- **Byline grid** (`d-byline.js`): Authors, Affiliations, Published, DOI ("No
  DOI yet." when none).
- **Footnotes and citations as hover boxes** (`d-footnote.js`, `d-cite.js`,
  `d-hover-box.js`).
- **The appendix** (`distill-appendix.js`), in order: **Updates and
  Corrections** ("View all changes to this article since it was first
  published. If you see mistakes or want to suggest changes, please create an
  issue on GitHub"); **Reuse** ("Diagrams and text are licensed under Creative
  Commons Attribution CC-BY 4.0 ... The figures that have been reused from
  other sources don't fall under this license and can be recognized by a note
  in their caption: 'Figure from …'"); **Citation** ("For attribution in
  academic contexts, please cite this work as," a short form and a BibTeX
  block).
- Distill also published Hohman, Conlen, Heer and Chau, "Communicating with
  Interactive Articles" (2020), which sorts what interactive articles can do into
  five affordances: connecting people and data, making systems playful,
  prompting self-reflection, personalizing reading, and reducing cognitive load
  (search; the paper's own abstract).

*Steal.* The appendix as a trust instrument, above all the public corrections
line and the honest exception for reused figures.

*Weak.* Built for researchers (BibTeX, GitHub issues); hover boxes favor the
desktop; each interactive figure is expensive.

### 1.4 Our World in Data (code read: `site/gdocs`; three searches)

*Who it serves.* The public, journalists, teachers and researchers looking for
data and research on large problems (poverty, health, energy).

*How it is organized.* Since February 2024 the home page has a more prominent
search, a list of all topics, and three named content types: articles, topic
pages, and interactive charts (OWID, "homepage redesign"). The topic-page
redesign (October 2022, Poverty first) brought "data, research and writing" on
each topic into one format a reader can move around in and return to (OWID,
"Introducing our updated work on Poverty"). "Data Insights" (March 2024) is a
short format: a title that states the takeaway, one chart, a short text, a link
to explore the data or read more, and a link to related content (OWID,
"launching Data Insights").

*Signature features (from the code).*
- **The foot of every article** (`pages/GdocPost.tsx`), in order: Credits
  (authors, contributors, acknowledgements) → Endnotes → **Cite this work**
  ("When citing this article, please also cite the underlying data sources.
  This article can be cited as:" with a plain citation and BibTeX) → **Past
  versions** (articles only: "We are a live site and we keep our work
  maintained. So our articles are often changed, including the data. You can
  browse previous versions of this work here," with a drawer) → **Reuse this
  work freely** (CC BY; "data produced by third parties ... is subject to the
  license terms from the original third-party authors"; charts embeddable).
- **The outdated notice**: an article with a `deprecation-notice` shows "This
  article is outdated" at the top, and the notice becomes sticky once the reader
  scrolls past it; its citation block then says "This content is outdated, but
  if you would still like to use it, here is how to cite it."
- **Key insights** (`components/KeyInsights.tsx`): a row of titled tabs over a
  set of slides; each slide is addressable in the URL (`?insight=<anchor>`), so a
  link opens the right one. The code's own comment: "this component has only
  received limited efforts towards accessibility."
- **Topic pages** get a sticky section nav; articles may get a sidebar table of
  contents. `Expander` is a native `<details>` with a heading, title and
  subtitle, for material most readers can skip.
- A **subscribe banner** is inserted automatically into article bodies (not
  topic pages).

*Look.* Not studied; the stylesheets were not read.

*Attention and habit.* Maintained, citable pages that people return to as
references; the Data Insights cadence for regular readers.

*Steal.* The foot order and its wording; past versions; the outdated notice;
addressable sections; a reuse paragraph that separates what is ours from what
is someone else's.

*Weak.* The banner injected into the body; tabbed insights that hide all but
one at a time (by its own admission not fully accessible).

### 1.5 The New York Times: graphics, The Upshot (code read: ai2html; seven searches)

*Who it serves.* General news readers. The Upshot (launched April 22, 2014,
founding editor David Leonhardt) explains data-driven news; Leonhardt described
"a big audience for that kind of conversational voice. Not dumbed down, but
talking to people in the same language that they would use in everyday life"
(NPR, 2014).

*Signature features.*
- **You Draw It** (Upshot, 2015): readers sketched on a blank plot how they
  thought family income related to college attendance, then saw the real line;
  the mechanic was reused for the Obama presidency in 2017 (FlowingData). The
  point, in FlowingData's words: to make you "think about your own
  preconceptions and compare them against reality." Northwestern's "They Draw
  It" toolkit reproduces the form.
- **"How Y'all, Youse and You Guys Talk"** (December 2013, Josh Katz): 25
  questions from the Harvard Dialect Survey; the answers place the reader on a
  heat map and name three cities where people talk most like him, from more than
  350,000 survey responses. It began as Katz's side project, became "the
  most-viewed piece of content in New York Times history" at the time, and won a
  Peabody (Peabody Awards profile).
- **ai2html** (code read; created by Archie Tse): an Illustrator script that
  turns each artboard into HTML and CSS, with the text kept as live HTML; a
  graphic is drawn once per width (artboards) rather than shrunk.
- **"Why We Are Doing Fewer Interactives"** (Archie Tse, Malofiej 2016;
  reported secondhand, slides not retrieved): if a reader has to click or do
  anything besides scroll, "something spectacular has to happen"; the Times had
  dropped steppers, tabs, "fixies" and sliders because readers were not getting
  to the content; "if you make a tooltip or rollover, assume no one will ever
  see it"; redesign a graphic "at least 2 or 3 times to make it work on both
  desktop and mobile"; fewer small embedded graphics, more stand-alone visual
  stories (Nieman Lab; Garcia Media; academic citations).
- **The election needle** (2016): its artificial "jitter" was criticized as a
  device to keep readers watching; readers panicked at each swing. For 2018 the
  Times dropped the jitter, withheld the needle until enough results were in,
  split it, and placed it lower on the page, because "certain readers may have a
  nervous reaction to its return" (managing editor Joe Kahn, as reported).
- **Type.** Headlines in Cheltenham, which design director Tom Bodkin
  commissioned Matthew Carter to extend; the 2013 article redesign used Franklin
  for metadata, captions and navigation and Georgia for running text (Fonts in
  Use). Third-party style summaries say current body text is a custom Imperial;
  unverified.

*Attention and habit.* The news cadence, plus a few pieces that make the reader
the subject.

*Steal.* Ask for the reader's prior before showing reality; let a reader place
himself; draw figures twice, with live text; the restraint rule; a
conversational register that does not talk down.

*Weak.* The needle is the cautionary tale of attention manufactured by motion.
News cadence and a paywall are the opposite of LiveWell's model.

### 1.6 The Atlantic (five searches)

*Who it serves.* General readers of long journalism and argument.

*The 2019 redesign.* Announced by Jeffrey Goldberg on November 12, 2019, first
in the December 2019 issue; led by creative director Peter Mendelsund and art
director Oliver Munday. The italic wordmark was replaced by a single serif "A";
the founding year went on the cover; the magazine commissioned its first custom
typeface, Atlantic Condensed, "inspired by the original type chosen by the
magazine's founders in 1857," described by Mendelsund as a Scotch face with
strong contrast (It's Nice That; AIGA Eye on Design; Buttondown). AIGA's framing:
while editorial design had moved toward "a renewed minimalist focus," the team
"turned to the magazine's history for inspiration." Goldberg's description:
"bold but classical, beautiful, but spare, and respectful of the reader." The
redesign also began a website overhaul, "starting with a simpler layout"
(search summary). Atlantic Condensed gained weights, widths and italics in 2022.

*The site relaunch that removed things* (Digiday; date not confirmed). The
article page dropped infinite scroll and most recommendation modules. Kimberly
Lau, then general manager of The Atlantic Digital: "There were like five
different modules that people didn't click on." The top navigation bar went
too, judged costly in screen space. Editors were given "a menu of templates for
stories ranging from breaking news to essays and cover articles" (InPublishing).

*Steal.* Heritage as the design source; one strong mark instead of many;
templates by kind of story; the courage to remove what readers do not use.

*Weak.* Later article-page work emphasized newsletter, podcast and
subscription offers (Digiday); a commercial publisher's page still carries
Taboola.

### 1.7 Aeon and Psyche (four searches)

*Who it serves.* Aeon: readers of long essays on ideas, philosophy, science and
culture, free, from a non-profit founded in London in 2012 by Paul and Brigid
Hains and registered as a charity in 2016 (Wikipedia). Psyche (2020): the
"human condition" through three prisms, Therapeia (mental health), Eudaimonia
(how to live) and Poiesis (the arts), with short Ideas and long Guides
"(approximately 3,000-4000 words) that follow our signature, how-to structure"
(Psyche, pitch page). Guides are grouped by topic (Disorders and difficulties;
Therapies and practical advice; Relationships, work and leisure).

*Signature features.* Curated videos, each "with a short description and
information about the filmmakers, including a link to the video's original
place of publication" (Wikipedia). A page titled "Are Psyche Guides reliable?"
explains that each Guide's links and resources are "carefully checked by our
editors and expert reviewers" and that Guides aim to be "of lasting help to
non-experts." Republishing (Aeon's own page): a "Syndicate this essay" button,
an online agreement, a flat fee of $650, the essay in full and unedited, images
excluded, Aeon credited at the top, a three-day embargo; up to 250 words may be
quoted for critique. Psyche Guides are "NOT available for republication."

*Steal.* A page that tells the reader how the pieces are made and checked;
credits for everything curated; the long how-to form for care pages; a
republish button, though not its terms.

*Weak.* Paid, conditional reuse is the wrong model for a pastor channel. The
page design itself could not be seen (section 4).

### 1.8 The Pudding (code read: Svelte starter; two searches)

*Who it serves.* Readers of "visual essays" that explain debates in culture
with data and fewer words (Wikipedia; pudding.cool/about). The team says it
avoids chasing current events and prefers topics with a long shelf life
(Storybench). Stories take "anywhere from a couple of days to a couple of
months."

*How a story works.* Top-line findings step by step through scrollytelling,
then the reader explores all the data (Storybench). Staff published a "Making
Internet Things" tutorial series; its storytelling part is about why, not how
(FlowingData).

*From the code.* The starter's `Scrolly.svelte` uses IntersectionObservers to
report which step is "most in view," which drives a pinned graphic. Stories are
written in Google Docs and pulled in through ArchieML, so writers never touch
code. The footer (`Footer.svelte`) fetches the catalogue, removes the current
story, and shows three recent stories (or a shuffled three), each with its
number (`#{id}`) and month, under "We've published **N** awesome stories such
as." The footer links Our Team, Resources, Pitch a Story, email and RSS.

*Steal.* Numbered stories with their month; evergreen subjects over news;
finding first, exploration after; writers in documents, not code (LiveWell's
JSON-plus-validator pipeline is the same idea).

*Weak.* Scroll-linked pinned graphics are the form the plan forbids inside an
argument, and the CHI 2026 study in `benchmark.md` found no comprehension gain
from scrollytelling. "Awesome" and a story count in the footer are
self-promotion.

### 1.9 Works in Progress (two searches)

*Who it serves.* Readers of long essays on progress, economics, science and
cities. Founded 2020; part of Stripe, which provides editorial independence; no
advertising (Works in Progress newsletter, "About"; "has joined Stripe").

*Signature features.* Essays published online and through a newsletter, with a
promise to "never stop publishing online." A print edition announced in
September 2025, first issue in November: six 120-page issues a year, $100 or
£75 (WiP; Patrick Collison). The printer's case study describes "clear data
visualisation, calm typography and a distinctive graphic style inside" (Park
Communications).

*Steal.* Print as the keepable form of web work, on a fixed number of issues a
year; calm type; data drawn clearly.

*Weak.* The web reading experience (notes, figures, page structure) could not
be seen (section 4).

### 1.10 Stripe Press (three searches)

*Who it serves.* Readers of books on technology, economics and progress
(titles include *Stubborn Attachments*, *The Dream Machine*, *Working in
Public*, *Poor Charlie's Almanack*).

*What could be seen.* A student review of press.stripe.com describes a dark
background against which "book spines pop out," a click that slides a book's
details into view, each book in its own colors, and browsing that feels like
walking past library shelves (one informal review). A Stripe Press job posting
says its editorial design team designs "books, digital and physical
experiences, campaigns and the brand," and that the work is "designing really,
really beautiful books first and foremost." Awwwards lists the site; no detail.

*Steal.* Books presented as objects, spine first, each with its own color,
details on demand.

*Weak and unknown.* Whether the site uses 3D or WebGL could not be confirmed;
no book page structure or online edition was seen.

### 1.11 Increment (three searches)

*Who it serves.* Engineers and engineering teams. Stripe's quarterly, April
2017 to November 2021: more than 250 stories, more than 400 contributors, 19
issues (increment.com/about).

*Signature features.* **One theme per issue**: 1 On-call, 2 Cloud, 3
Development, 4 Energy and Environment, 5 Programming Languages, 6
Documentation, 7 Security, 8 Internationalization, 9 Open Source, 10 Testing,
11 Teams, 12 Software Architecture, 13 Frontend, 14 APIs, 15 Remote, 16
Reliability, 17 Containers, 18 Mobile, 19 Planning (the store's bundle
listing). The Documentation issue carried a pull-out poster. Each issue was
printed and sold; the team built a style guide and a process for commissioning
art (Will Larson, "Increment has launched"). The final issue's letter called it
"our final quarterly issue."

*Steal.* The single-theme issue; an end; a pull-out page; commissioned art held
to a style guide.

*Weak.* The web design and art direction were not seen in any detail.

### 1.12 Craig Mod (four searches)

*Who it serves.* Readers of essays on books, publishing, walking and Japan;
members of his SPECIAL PROJECTS program.

*Signature ideas and practice.*
- **"Books in the Age of the iPad"** (2010): content is **Formless** (prose that
  "can be divorced from layout, reflowed ... and not lose any intrinsic meaning")
  or **Definite** ("texts composed with images, charts, graphs or poetry") that
  "embraces the container as a canvas."
- **"Subcompact Publishing"** (2012): issues of a handful of articles (about
  three to seven), small files, scrolling rather than pages, clear navigation, a
  fluid schedule, HTML foundations, open to the web (quoted by Scholarly Kitchen
  and others; original not read).
- **The future book** (Wired, about 2018 to 2019, read only through a summary):
  the imagined book that "would just go deeper when we picked something" did not
  arrive; what arrived was books written in newsletters, crowdfunded books and
  audio.
- **Practice**: two newsletters, *Ridgeline* (weekly, on walking and Japan) and
  *Roden* (monthly, on books and design), "powered by" SPECIAL PROJECTS, a paid
  membership of more than 1,000 whose perks include livestream and lecture
  archives and free PDFs of his books (craigmod.com). A podcast, *On Margins*,
  about making books.

*Steal.* The Formless and Definite test for when a page may depend on layout;
the small, finite issue; the letter as the steady form; a membership that funds
free work.

*Weak.* Not a model for a site's information architecture.

### 1.13 The Public Domain Review (three searches)

*Who it serves.* Readers curious about the history of ideas and images.
Launched on January 1, 2011 (Public Domain Day) by Adam Green and Jonathan Gray
(Wikipedia).

*Signature features.* Each week an invited contributor "presents an interesting
or curious work with a brief accompanying text giving context, commentary and
criticism"; a monthly "Curator's Choice" by curators writing on their own
institutions' holdings; collections of texts, images, audio and film (Wikipedia;
Open Knowledge Foundation). Essays are under Creative Commons Attribution and
the works themselves are public domain (Creative Commons). The **Public Domain
Image Archive** (January 2025) gathers more than 10,000 images from its essays
into a searchable archive with three views: a catalogue (search, or browse by
artist, century, style, theme, tag), an "infinite view" for immersion, and a
"shuffle view" for chance discovery; every image links "back to the
institutions where we found the image — from small college libraries to national
repositories" (PDR announcement). A print shop sells about 900 prints, more
through the archive.

*Steal.* A short form built on one real work and its context; every image
traced to its holder; curated rather than generated beauty.

*Weak.* The infinite view is the one form here LiveWell should not copy (section
3).

### 1.14 Butterick's Practical Typography (added; one search)

*Who it serves.* Writers who set their own text. A free online book.

*Signature rules* ("Typography in ten minutes," read through search): "The
typographic quality of your document is determined largely by how the body
text looks"; body text 15 to 25 pixels on the web; line spacing 120 to 145% of
the point size; line length "an average of 45–90 characters per line."

*Use for LiveWell.* A check, not a source of features. LiveWell's essay column
(Inter 18px in 680px, roughly 70 to 80 characters, line-height 1.75) is inside
the size and length ranges and looser than the spacing range; CLAUDE.md sets
1.7 and the page uses 1.75. A preview at 390px and 1440px is the place to judge
it, not this file.

---

## 2. The patterns, ranked

Fit: **core** (the redesign should not ship without it), **strong** (clearly
right, schedule it), **maybe** (good if there is room). Effort: **S** (days,
mostly data, copy or CSS on existing components), **M** (a unit of one to two
weeks), **L** (a multi-unit build or sustained content work).

Every pattern obeys `MASTER-PLAN.md` section 2: tokens only, new rules as
classes in `client/src/index.css` (this file proposes the prefix `.ed-`),
shareable state in the URL, personal state on the device through
`lib/storage.ts`, no accounts, no scores, no chart or map library, one
translation per page, literal `<SEOMeta>` on new pages, and one in, one out.
Each pattern names what it retires.

### 1. Notes beside the text

*Seen in:* Tufte CSS (sidenotes and margin notes, no script, hidden under 760px
until toggled); Gwern.net `sidenotes.js` (collision-avoiding placement, long
notes collapsed, popovers on phones); Distill's footnote hover boxes; John
Gruber's caution that sidenotes work best when the notes are short.

*What it is.* A note sits in the margin beside its sentence on a wide screen,
opens in place under its paragraph on a phone, and is listed again at the foot
for print.

*Why it works.* The skeptic checks a claim where it is made. Today a LiveWell
footnote, if an essay used one, would send him to the bottom and back, and the
plan's Sources list (6.2, item 5) sits after the essay where it cannot be
matched to a sentence. A note at the claim lets the argument keep its line
while the evidence stays one glance away. It is the claims ledger made visible.

*On LiveWell.* Essays and history sessions keep GFM footnotes (`[^1]`), which
`Markdown.tsx` already parses. A small rehype step, switched on by a prop
(`notes="side"`) only on the essay and session pages, renders each reference as
a numbered `<button class="ed-note-ref" aria-expanded="false">` and places the
note in an `<aside class="ed-note">` after its paragraph. From a width measured
on a preview (roughly 1100px: the 680px column plus a 48px gap plus a 240px
note column fits inside `--w-default`, 1180px), the column shifts left and notes
float into the right margin in Inter 14px, `--ink-muted`, beside their
sentence. Below that width notes are hidden, and tapping the number opens the
note under the paragraph (no overlay, no sheet; a 44px hit area around the
number). Gwern's self-retiring hint applies: "Tap a number to open its note"
appears under the first note until this device has opened three. The foot
keeps a numbered Notes list for print and for readers who prefer it; Listen
already skips `sup` and back-links. Rules in `validate-essays.mjs` and
`BRIEF.md`: a note is at most about 60 words; a note never carries the argument
(Tse: assume few will open it); no verse text in notes (references are
`VerseRef` links; the plan refuses verse previews beside ESV quotations).
Focus mode keeps the notes. The plan refused "a right rail" (6.2); a note
column is not a rail (nothing in it persists, promotes or follows the reader,
and it is empty where there is no note), but the lead should say so in 6.2.

*Retires:* the endnote-only Sources reading of claims; the Sources list stays
as the bibliography.

*Fit:* core. *Effort:* M.

### 2. A house style drawn from the book: epigraph, versal, new thought, ornament, quiet link

*Seen in:* Tufte CSS (epigraphs; small-caps new thought "instead of" headings;
two heading levels; links in the text color; color only in figures); Gwern
(historic drop caps chosen per page; ornaments); The Atlantic (a mark and a
face taken from its own 1857 history); Butterick (body text decides the
quality).

*What it is.* A fixed, small set of typographic moves that make any page
recognizably LiveWell's with no decoration at all.

*Why it works.* "Distinctive without decoration" is a system, not an
illustration. Readers recognize a serious publication by its consistent
treatment of the same few things: how a piece opens, how a section turns, how
Scripture is set, how a link looks. LiveWell's palette already names mustard
as punctuation; the oldest model for that is the rubricator, who marked the
initials and the instructions of a liturgical book in red and left the text in
black.

*On LiveWell.* Classes in `index.css`, all from tokens:
`.ed-epigraph` (Cormorant Garamond italic at about 22px, the source beneath in
the eyebrow style CLAUDE.md already specifies, in `--ink-muted` rather than
mustard); `.ed-versal` (the existing drop cap, restated as a three-line
Cormorant initial in mustard, the one mustard mark inside the body);
`.ed-newthought` (the first four to six words after a section break in Inter
500 small caps, used where a movement turns but needs no name); `.ed-break`
(a centered asterism in `--ink-muted` instead of a rule or another heading);
Scripture blocks in Cormorant at about 20px with the reference after in Inter
caps; links in the text color with a 1px mustard underline (CLAUDE.md lists
link underlines among mustard's uses) that thickens on hover and never changes
color. Two heading levels: `##` for movements, `###` rarely, never `####`
(`validate-essays.mjs` already requires `##`; add the ceiling). One page,
`/design/house-style` or a section of the existing style guide, shows each
move once so every new surface (devotions, sessions, issues) uses the same
ones.

*Retires:* per-page heading and quote treatments in the essay body
(`prose-section` variants) that the house style replaces.

*Fit:* core. *Effort:* S.

### 3. The honest foot: written, revised, corrected, citable

*Seen in:* Distill's appendix ("View all changes to this article since it was
first published"; "If you see mistakes ... create an issue"; "Citation");
OWID's foot (Credits, Endnotes, Cite this work, Past versions, Reuse) and "We
are a live site and we keep our work maintained"; Gwern's date range and
status.

*What it is.* Every essay carries a short, dated record of its own life:
first published, each revision in one line, each correction in one line, how
to cite it, and how to report an error.

*Why it works.* A public corrections record is the strongest trust signal a
small publication can give a skeptic, and it costs almost nothing. It also
honors the integrity rules: "Revised October 2026" (6.2, item 9) says that
something changed; a line says what.

*On LiveWell.* Two optional fields in the essay JSON: `revisions: [{date,
note}]` and `corrections: [{date, note}]`, each note one sentence (a
correction says what was wrong and what the text now says). In the fixed foot
(6.2), item 2 becomes "Sources and record": the sources (U24), then a small
block headed *This essay*: First published; Revised, with its lines; Corrections,
with theirs; Cite (the existing `CitationCopy`); and *Report an error*, which
opens the contact form with the title and "Correction:" filled in (separate from
"Write to James," item 6). A build script (`build-corrections-index.mjs`)
gathers every correction from essays, history sessions and devotions into
`/corrections`, newest first, each linked to its page; the validator requires a
date and a note on every entry. Past versions themselves stay in git; the
one-line log is enough for readers.

*Retires:* the bare "Revised October 2026" line (6.2, item 9), absorbed here.

*Fit:* core. *Effort:* S for the fields and block; M with `/corrections`.

### 4. An ending that is allowed to end

*Seen in:* The Atlantic's relaunch (infinite scroll and "five different modules
that people didn't click on" removed); Tse (only a fraction of readers interact
with anything); Gwern's ornament marking the end of the page; The Pudding's
footer, which stops at three stories.

*What it is.* After the last paragraph: a visible end (a small ornament and the
byline with the date), real white space, and then a short, quiet apparatus.

*Why it works.* CLAUDE.md asks for endings that leave weight, which the reader
carries out. Nine panels starting immediately under the last line (6.2's foot)
compete with that weight; most will not be used.

*On LiveWell.* `.ed-end`: a fleuron in `--ink-muted` and "James Bell" with the
revised date, then about 96px of space. The foot's nine items are grouped under
two plain headings: *To think about* (questions, sources and record) and *Where
next* (next in this section, related, take it with you, write to James, the
book, the letter, the short bio). Each item's use is counted for 90 days through
`lib/telemetry.ts` (an event per open or click, no per-reader record); after
that, any item almost nobody uses leaves the page, as the Atlantic did. Nothing
appears above the end.

*Retires:* whichever foot items the count shows are unused.

*Fit:* strong. *Effort:* S.

### 5. Numbers, not a feed: the seasonal issue

*Seen in:* Increment (19 issues, one theme each, a final issue); Works in
Progress (six issues a year, online forever); Craig Mod's Subcompact Publishing
(three to seven articles, clear navigation, fluid schedule); The Pudding (every
story numbered, with its month); Plough (`benchmark.md`).

*What it is.* A finite, numbered, dated gathering of a few pieces on one theme,
with a letter at the front and an end.

*Why it works.* A shelf that only grows has no occasion and no end. An issue is
an occasion to arrive, a thing to finish, and a unit a pastor can hand to his
people. It gives James a cadence he can keep (one number a season) and gives the
returning reader a reason that is not a streak.

*On LiveWell.* `/issues/:n`, and `/issues` listing every number newest first,
one line each. A number has an eyebrow ("No. 1 · Advent 2026"), a title in
Cormorant (the theme), a letter from James in his own words (the byline rule
applies), and a contents list of three to five items in reading order, each with
its kind and minutes: an essay from the shelf, a history session or one source
(pattern 9), the Table's strand for those weeks, a study guide for groups, and
the printed number (pattern 11). Data in `client/public/issues/<n>.json`
(`number, season, title, letter, items: [{kind, href, note}]`), validated: three
to seven items, every href public through `isPublicEssayHref` or the site
routes. Seasons follow the plan's calendar: Advent (from November 29),
Lent (from February 10, 2027), Easter's fifty days, and ordinary time; four
numbers a year. An essay in a number carries "In No. 1" in its kicker. The
route needs the 9.3 checklist.

*Retires:* the "Latest" strip on Home and `/writing` while a number is current.

*Fit:* strong. *Effort:* M, plus James's letter each season.

### 6. Reuse, stated plainly, for the pastor

*Seen in:* OWID "Reuse this work freely" (CC BY, third-party data under its own
terms); Distill "Reuse" (reused figures excepted and labeled); PDR (essays CC
BY, works public domain); Aeon's opposite ("Syndicate this essay," an
agreement, $650, images excluded, an embargo; Psyche Guides not republishable).

*What it is.* One sentence under every piece saying what a reader may do with
it, and a page saying where that permission stops.

*Why it works.* Pastors are LiveWell's distribution channel, and uncertainty
about permission is the friction that stops a bulletin insert. A stated license
turns "can I hand this out?" into yes.

*On LiveWell.* In the record block (pattern 3), on every devotion, session
handout and printed number: a line such as "You may print this for your church
or group, read it aloud, and quote it with credit to James Bell and LiveWell.
Please do not change it or sell it," linking to `/use`. That page states the
license James chooses (a Creative Commons license such as BY-NC-ND 4.0 is one
candidate; question for James) and its limits: Scripture quotations remain
under their publishers' terms (Crossway's ESV notice, already required); images
remain under their own credits (pattern 8); book chapters may be under the
publisher's terms. No form, no fee.

*Retires:* nothing; it answers a question every pastor currently has to email.

*Fit:* strong. *Effort:* S (copy, and James's decision).

### 7. Figures drawn for the phone, readable without a touch

*Seen in:* Tse's 2016 rules (scroll; cut steppers, tabs and sliders; tooltips go
unseen; redesign two or three times for desktop and mobile); ai2html (one
artboard per width, live HTML text); Tufte (the figure with the text that
discusses it); Craig Mod's Definite content; OWID's addressable sections and
Data Insights (a title that states the point).

*What it is.* A drawing designed for 390px and again for about 880px, its labels
in live text, its point stated in its caption, everything visible without
hovering or tapping, with a list equivalent.

*Why it works.* The plan allows "a handful of hand-built inline SVG figures"
(8.5). The Times' experience says how to make each one count: annotation on the
drawing instead of in tooltips, a version per screen instead of one shrunk, and
no interaction that does not pay off.

*On LiveWell.* `<figure class="ed-fig" id="fig-...">` with two inline SVGs shown
by media query (or one SVG with a phone layout), labels in Inter at 14px or
more, colored from tokens; the caption opens with one sentence stating what the
figure shows, then its sources; a `<details>` "As a list" gives the same
information in text (the A-synthesis rule); the figure is addressable so a
pastor can link it; no motion. The first figures are the ones 8.5 names (Paul's
cities, where the councils met). A figure is Definite content in Mod's sense;
an essay is Formless, which is why essays get no layout-dependent art.

*Retires:* any chart or diagram that relies on hover or a tooltip.

*Fit:* core for the history course and context guides. *Effort:* M per figure.

### 8. Real art from the public domain, credited

*Seen in:* The Public Domain Review (essays built on real works; the Image
Archive links every image to its holding institution); Aeon (credits and links
for every curated film); The Atlantic (the archive as the design source).

*What it is.* In place of generated art, works the church has made over two
thousand years, each captioned with artist, title, date, holding institution
and license, and linked to its source.

*Why it works.* An invented image beside a verified quotation undercuts the
quotation. A catacomb fresco, an illuminated initial, a Reformation woodcut or
an etching is itself a witness of the long memory the essays argue for, and it
is weighty by nature.

*On LiveWell.* Wherever an essay has "a real cover" (the page already places
one after the opening section), on history sessions, and on issue covers.
Figure data `{src, alt, artist, title, date, holder, license, sourceUrl}`; the
validator rejects any figure without `holder`, `license` and `sourceUrl`;
images self-hosted under `client/public` (the first-paint contract: no image
CDN). Source from museum and library open-access collections whose own terms
say public domain or CC0, checked per image at the source and recorded in the
essay's ledger. Captions in Inter 13px `--ink-muted`: "Artist, *Title* (medium,
year). Holding institution, license."

*Retires:* `GeneratedCover` and `GeneratedHero` on every page that receives real
art.

*Fit:* strong. *Effort:* M (curation and rights checks, ongoing).

### 9. The Source: one primary text, a short context, dated

*Seen in:* The Public Domain Review (a weekly contributor presents one work
"with a brief accompanying text giving context, commentary and criticism");
OWID Data Insights (a title stating the takeaway, one chart, a short text, a
link to explore, a link to related); Gwern's "X of the day."

*What it is.* A short form: one verified excerpt from a primary source, a title
that states what it shows, 150 to 250 words of context, and two doors.

*Why it works.* It puts the church's own voice in front of a reader in two
minutes, gives the weekly letter a fixed feature, and makes the verified
sources (U07) visible outside the course.

*On LiveWell.* Each entry is built on a source card from the history registry
(U32's `SourceCard`), its excerpt verbatim from
`scripts/data/history-sources/` and checked by `verify-sources.mjs`. A page per
source (`/theology/history/sources/:slug`, inside the never-redirected history
paths) with the excerpt, its date and author, the context, and doors to the
session it belongs to and the essay or Study Bible chapter it touches. One a
week, dated, in the letter and on the history front door as "This week's
source," archived in order. No "of the day" urgency, no count.

*Retires:* any generic quotation block on the history front door.

*Fit:* strong. *Effort:* S per entry once U07 and U32 exist.

### 10. Say what kind of piece it is, and whether it is current

*Seen in:* Gwern's status labels; OWID's "This article is outdated" (pinned on
scroll, with its own citation wording); Psyche's "Are Psyche Guides reliable?";
Distill's byline (Published, DOI).

*What it is.* A short label line under the title giving the kind of piece; a
notice on an earlier piece that points to its successor; and one page that says
how pieces are made and checked.

*Why it works.* The skeptic's first question of a religious site is what he is
being handed: an argument, a history, a lament, a chapter of a book. A label
answers it before he reads. The older essays still live are in a register James
has moved past; saying so honestly is better than silence.

*On LiveWell.* A `kind` field on essays from a fixed list (Essay, History,
Lament, Letter, Chapter), shown in the kicker beside the section and series
position the plan already adds ("Essay · The Mirror, 2 of 6 · 18 minutes"). For
any live essay whose rewrite exists elsewhere, an OWID-style notice at the top,
"An earlier essay. James has since written on this in [title]," not sticky on
phones. A page `/how-we-write`: how an essay is made (draft, claims ledger,
how quotations are checked and by what method, James reads every piece before it
goes live, corrections policy), and what LiveWell will not do (no invented
quotation, no unchecked statistic). Leave out Gwern's certainty words and
importance score (section 3).

*Retires:* the silent coexistence of old and new registers on the shelf.

*Fit:* strong. *Effort:* S.

### 11. The printed number

*Seen in:* Works in Progress in print (six 120-page issues, calm typography,
clear data drawing); Increment in print, with a pull-out poster; Craig Mod's
free PDFs for members; Plough's keepable issue (`benchmark.md`).

*What it is.* Each issue (pattern 5) as a print-ready booklet.

*Why it works.* The pastor's lobby, the resource wall, the kitchen table and
the small group all run on paper. A printed number outlives the screen and
carries LiveWell into rooms the site never reaches.

*On LiveWell.* `scripts/build-pdfs.mjs` (pdfkit, already rendering context
guides and sermon series to `client/public/downloads/`) renders a 16 to 32 page
booklet per number: a cover with the number, season and a public-domain image
(pattern 8); James's letter; the pieces; the Table strand as a single page meant
to be pulled out and kept on the fridge (Increment's poster); QR codes to each
piece online (U21 already prints QR codes); the reuse line on the back (pattern
6). Two outputs: US Letter for home printers and a half-letter booklet
imposition for church copiers. Offered on the issue page and sent to PCN.

*Retires:* separate one-off PDFs for the same season's pieces.

*Fit:* strong. *Effort:* M.

### 12. The letter as the habit, and letters answered in public

*Seen in:* Craig Mod (a weekly and a monthly letter funded by a membership of
more than 1,000); his reading of the "future book" as newsletters, crowdfunding
and audio; The Upshot's conversational, not-dumbed-down voice; Tufte's moderated
"Ask E.T."; The Pudding's refusal to chase news.

*What it is.* One dated letter a week in James's voice, and a public page of
selected reader letters with his answers.

*Why it works.* CLAUDE.md names "an email that argues with the piece" as a sign
of success. Answering some of those letters in public shows the skeptic that
objections are met, gives the doubting Christian words for her own question,
and builds the return visit on a person rather than a mechanic.

*On LiveWell.* Substack stays the channel for the letter. On the site, `/letters`:
each entry a reader's question (shared with permission, no name unless asked),
James's answer in his own words, the essay it concerns, and the date; ordered
by date, filterable by essay in the URL; no comment threads. "Write to James
about this essay" (6.2, item 10) gains a line: "Some letters are answered on
the Letters page, with permission." Three or four a month at most, gated on
James.

*Retires:* nothing on screen; it gives the contact form a visible result.

*Fit:* strong. *Effort:* M (mostly James's time).

### 13. A contents page for the shelf, and an index of first lines

*Seen in:* The Pudding (numbered stories with month and a one-line tease);
Increment (an issue list where each number is one theme); Stripe Press (a shelf
of spines, details on demand); OWID's home page (a list of all topics); Mod
(clear navigation).

*What it is.* `/writing` reads like the contents page of a book (parts, titles,
minutes, revised dates), with an alternate view that lists every essay by its
first sentence alone.

*Why it works.* Bell's first sentences are written to stop a reader; a blurb
paraphrases what the sentence already does better. An index of first lines is an
old device of hymnals and collections of poems, and it lets a reader choose by
voice rather than by topic.

*On LiveWell.* Sections become numbered parts ("Part I · The Mirror"). Each row:
title in Cormorant, the essay's first sentence in Inter `--ink-muted` (derived
by `build-essays-index.mjs` from the body), then "18 min · Revised October
2026"; no images. A toggle "Titles | First lines" kept in the URL
(`?view=first-lines`). The essay rows use the plan's `EditorialIndex`.

*Retires:* the `shelf.json` blurbs for every essay whose rewrite exists (6.1
already asks for the unfinished ones to be finished; this removes the need).

*Fit:* strong. *Effort:* S.

### 14. Previews for links within LiveWell, on desktop, slow to appear

*Seen in:* Gwern's popups (a 750ms delay, nothing spawned while scrolling,
popovers on touch); Distill's hover boxes.

*What it is.* On a desktop, resting the pointer on a link to another LiveWell
essay or session for about three quarters of a second shows its title, kind,
minutes and first line; on a phone the link simply goes.

*Why it works.* It lets a reader decide, mid-argument, whether to leave, and it
makes the internal web of the site visible without a panel. Tse's rule bounds
it: nothing essential lives in a preview.

*On LiveWell.* A small `LinkPreview` attached by `Markdown.tsx` to internal
hrefs that pass `isPublicEssayHref`, drawing from the essays manifest already
loaded for search (U15), with no network call; Escape closes; no previews for
external links or verses (`VerseRef` has its own sheet); off in Focus mode.

*Retires:* nothing.

*Fit:* maybe. *Effort:* M.

### 15. One instrument of self-placement, beside an essay and never before it

*Seen in:* the Times' dialect quiz (25 questions that place the reader on a
map; at the time its most-viewed piece; a Peabody); You Draw It (your
expectation first, then reality); Hohman et al. (prompting self-reflection,
personalizing reading); The Pudding (the finding first, exploration after).

*What it is.* After an essay on the church's divisions, eight questions on
second-order matters whose answers show which historic traditions have held the
reader's instincts, with the creeds shown as common ground.

*Why it works.* The two most-loved Times interactives made the reader the
subject. Here the reader discovers that his instincts on baptism or church order
have a history and a family, and that on the Nicene Creed he stands with all of
them, which is the Constitution's final impression in miniature.

*On LiveWell.* "Where your instincts sit in the long church," in `/tools`:
eight questions (baptism, the Supper, church order, and others the Scholarship
Standard names), each answer mapped to the traditions that have held it, with
the strongest statement of each view shown after the reader answers; a result
that lists ("On baptism you stand with ... On the Supper with ... On the Nicene
Creed, with all of them"); no score, no type name, no shareable badge; answers on
the device. Placed under the essay as "Try this," never before it (6.2's refusal
holds). Every mapping verified per the Scholarship Standard; question for James
on whether and how.

*Retires:* any older self-check it overlaps (for example `Which Lens`, if James
prefers this one).

*Fit:* maybe. *Effort:* M.

### Also considered, not ranked

- **Backlinks on essays** ("Cited elsewhere on LiveWell," Gwern). Cluster A's
  verse hub already builds the inbound index; extend it to essays when that
  index exists rather than as a separate build.
- **A seasonal masthead** (Gwern's special occasions). In Advent or Lent, the
  masthead's small line names the season ("Advent, week 1"). Within the
  palette; only if the A-synthesis "shared week" ships.
- **Spines on a shelf for `/books`** (Stripe Press). Three titles do not need
  it yet; real cover photographs carry their own colors without touching the
  palette.
- **A disclosure for technical detail** (OWID's `Expander`, Gwern's collapsible
  sections). Useful in context guides for manuscript or dating detail; never for
  an essay's argument, and never for the steelman, which belongs in the prose.
- **Links masked in Focus mode** (Gwern's reader mode). Focus could drop link
  underlines in the body until the reader hovers; cheap, but test it first.
- **One visual essay a year** (The Pudding). A history piece told through a
  sequence of drawn figures could be strong; it must meet pattern 7's rules,
  have a static equivalent, and wait until patterns 1 to 5 exist.

---

## 3. What to avoid

Each item names where it was seen and the LiveWell rule it would break.

1. **Infinite scroll and stacked recommendations after an essay.** The Atlantic
   removed both; its manager said readers did not click five of the modules.
   Breaks "endings that leave weight" and the plan's ban on anything between
   sections.
2. **Motion that manufactures suspense.** The Times' election needle "jitter,"
   withdrawn in 2018 because readers reacted with anxiety. Breaks
   "unhurried" and the rule of no manufactured urgency for the skeptic.
3. **Steppers, tabs, sliders and hover-only content inside an argument.** Tse:
   readers did not reach the content; content behind a tooltip goes unseen.
   OWID's key-insight tabs show one slide at a time and its code admits limited
   accessibility. Breaks "never inside the argument."
4. **Pinned, scroll-linked graphics inside essays.** The Pudding's `Scrolly`
   form; the CHI 2026 study (`benchmark.md`) found no comprehension gain. Breaks
   the plan's ban on scroll-jacking; reserve it, if ever, for a designated visual
   piece with a static equivalent.
5. **Self-scored importance and certainty badges.** Gwern's "importance: 1–10"
   and estimative words. On a pastor's site a self-rating reads as vanity, and
   certainty belongs in the argument, after the steelman, not in a label.
6. **Fees, embargoes and forms for reuse.** Aeon's $650 syndication, images
   excluded, three-day embargo; Psyche Guides closed to republication. Breaks
   the pastor channel.
7. **Previews on every link and apparatus everywhere.** Gwern's density, which
   needed its own reader mode. Breaks the first sentence on the first screen and
   the quiet page; previews, if any, only for LiveWell's own essays (pattern 14).
8. **Counters and self-praise in recirculation.** The Pudding's "We've
   published N awesome stories." Breaks the plan's ban on social-proof
   counters. An issue number is information; a tally of output is promotion.
9. **Sign-up banners inside the body.** OWID's automatic subscribe banner.
   Breaks "nothing between sections"; the letter belongs in the foot.
10. **Generated or stock images beside verified history.** The opposite of the
    Public Domain Review. Breaks "never fabricate" in spirit: an invented picture
    of a real council is a fabricated record.
11. **Personality sorting and result badges.** The dialect quiz's form turned on
    identity ("Which kind of Christian are you?"). Breaks the rule that
    second-order questions stay open and the guardrail against tribes; pattern 15
    is allowed only without a type, a score or a badge.
12. **Showpiece rendering.** A 3D or WebGL book shelf (not confirmed on Stripe
    Press; the review describes spines and sliding details only). Breaks the
    first-paint contract and spends attention on the wrapper.
13. **Infinite or shuffle views of the archive.** The Public Domain Image
    Archive's "infinite view" suits a picture archive; on LiveWell it is a feed by
    another name.
14. **Streaks, badges and completion counts.** Covered in `benchmark.md` and
    the plan; restated because every engagement pattern above can drift toward
    them.

---

## 4. What could not be seen

- **No live page of any product.** Every visual judgment comes from code or
  descriptions; no layout, spacing, type size or color was measured on a real
  page.
- **The New York Times.** Tse's slides (reported secondhand); the exact
  mechanics of You Draw It (how the line is captured and revealed); the current
  article template's typography (third-party only); The Upshot's page design.
- **The Atlantic.** The 2019 website's article page in detail; the date of the
  relaunch that removed infinite scroll.
- **Aeon and Psyche.** Page layout and typefaces; whether Psyche Guides use
  fixed section headings (not confirmed); the essay page's tools.
- **The Pudding.** Specific story layouts beyond the starter template; its
  process pages.
- **Works in Progress.** Its web essays' notes, figures and layout; print design
  only through the printer's case study.
- **Stripe Press.** Whether the site uses 3D or WebGL; book page structure;
  whether any book is readable online.
- **Increment.** Web design and art direction of any issue.
- **Craig Mod.** His original essays (read only through quotations and
  summaries); his site's typography.
- **Our World in Data.** The rendered look (CSS not read); how Data Insights
  appear on the page.
- **The Public Domain Review.** Essay layout and caption format.
- **Gwern.net.** The design page's full text; popover behavior on phones beyond
  the code headers.
- **Edward Tufte's site.** Its page design beyond the forum's existence.
- **Distill.** Whether it still publishes.
- **Effect sizes.** No product here published evidence that sidenotes,
  corrections logs or issues change reading or return rates; the case for each
  is from practice and fit, not measured outcome. LiveWell's own telemetry (U23,
  9.9) and Search Console outrank all of this.

---

## 5. Evidence

### Code read directly (cloned into the scratchpad `design-src/`)

- `tufte-css/index.html`, `tufte-css/tufte.css`: sidenote and margin-note markup
  (label plus checkbox), the ⊕ toggle, `@media (max-width: 760px)` hiding notes
  until toggled, `#fffff8` and `#111`, two heading levels with the Feynman
  quotation, `newthought`, epigraphs, link styling, figures and full-width
  figures.
- `gwern/template/default.html`: page metadata (description, author, date
  range, status, certainty with Kesselman words, importance 1–10, backlinks,
  similar links, bibliography) and the three collapsible foot sections.
- `gwern/js/sidenotes.js`: margin placement, 60px spacing, collapse of long
  notes, `minimumViewportWidthForSidenotes: "1761px"`, margin notes at
  `"1497px"`.
- `gwern/js/popups.js`, `gwern/js/popovers.js`: `popupTriggerDelay: 750`, fade
  timings, hover disabled during scroll; popovers for touch.
- `gwern/js/reader-mode.js`: Auto, On, Off; links masked in paragraphs; Alt to
  show; deactivation at appendices and footer.
- `gwern/js/collapse.js`: interaction hints shown until three (desktop) or six
  (mobile) expansions, counted on the device.
- `gwern/js/special-occasions.js`: Halloween, Christmas, Easter, April Fools.
- `gwern/css/default.css`: DROPCAPS (five historic initial faces, chosen per
  page), X OF THE DAY, READER MODE, SIDENOTES, POPUPS sections.
- `distill-template/src/distill-components/distill-appendix.js`: Updates and
  Corrections, Reuse (with the reused-figure exception), Citation.
- `distill-template/src/components/d-byline.js`, `d-hover-box.js`,
  `d-footnote.js`, `d-cite.js`: byline fields; hover boxes.
- `owid/site/gdocs/pages/GdocPost.tsx`: foot order (Credits, Footnotes,
  CitationSection, PastVersionsSection, LicenseSection), deprecation notice
  ("This article is outdated," sticky on scroll), sidebar TOC, sticky nav on
  topic pages, automatic subscribe banner, citation descriptions by page type.
- `owid/site/gdocs/components/CitationSection.tsx`, `PastVersionsSection.tsx`,
  `LicenseSection.tsx`, `Footnotes.tsx`: the wording quoted in 1.4.
- `owid/site/gdocs/components/KeyInsights.tsx`: tabbed slides, `?insight=` URL
  parameter, the accessibility comment.
- `owid/site/gdocs/components/Expander.tsx`: `<details>` with heading, title,
  subtitle.
- `pudding-starter/README.md`: ArchieML micro-CMS from Google Docs, static
  builds.
- `pudding-starter/src/components/helpers/Scrolly.svelte`: most-in-view step
  through IntersectionObserver.
- `pudding-starter/src/components/Footer.svelte`, `Footer.Story.svelte`:
  recirculation of three recent or shuffled stories, numbered `#id` with month,
  "We've published N awesome stories such as," footer links.
- `ai2html/README.md`, `ai2html/examples/nyt.md`, `ai2html/ai2html.js`:
  Illustrator to HTML and CSS, artboards, text responsiveness, created by Archie
  Tse, examples at the Times.
- LiveWell, for calibration: `client/src/pages/ArticleDetail.tsx` (reading
  tools, Focus mode at 68ch and 20px, body 18px at `--w-prose`, line-height
  1.75), `client/src/index.css` (`--F`, `--B`, `--U`, `--w-prose: 680px`, body
  line-height 1.7), `client/public/essays/README.md` (essay JSON shape and
  validator rules), `client/src/lib/shelf.json`, `client/src/components/CitationCopy.tsx`,
  `client/src/components/Markdown.tsx` (remark-gfm).

### Web sources (reached through search; what each showed)

- AIGA Eye on Design, "The Atlantic's Redesign Bucks Minimalist Trends to
  Revisit Its Storied 162-Year History"
  (https://eyeondesign.aiga.org/the-atlantics-redesign-bucks-minimalist-trends-to-revisit-its-storied-162-year-history/):
  the single serif "A," the turn to the magazine's history, last redesign 2008.
- It's Nice That, "The Atlantic redesign is 'bold but classical, beautiful but
  spare'" (https://itsnicethat.com/news/the-atlantic-redesign-publication-131119):
  Goldberg's description; Mendelsund and Munday.
- Design Week (https://www.designweek.co.uk/the-atlantic-magazine-redesigns-in-a-bid-for-elegance-and-urgency/)
  and Buttondown, Adventures in Typography
  (https://buttondown.com/adventures/archive/the-projects-we-risk-everything-else-for/):
  Atlantic Condensed from the 1857 type; a Scotch face.
- McKL Type, "Designing Atlantic" (https://www.mckltype.com/essays/designing-atlantic):
  a type designer's account of being approached in 2019 for a headline face
  (designer attribution left unresolved).
- Wikipedia, Peter Mendelsund (https://en.wikipedia.org/wiki/Peter_Mendelsund)
  and a Substack note (https://adriana.substack.com/p/we-could-all-use-a-redesign):
  the November 12, 2019 announcement and URL.
- Digiday, "With a new design, The Atlantic eschews infinite scroll"
  (https://digiday.com/media/atlantic-eschewing-infinite-scroll/): infinite
  scroll and most modules removed; "five different modules that people didn't
  click on"; nav bar removed.
- InPublishing (https://www.inpublishing.co.uk/articles/the-atlantic-yesterday-unveiled-a-redesign-of-theatlanticcom-5596):
  a menu of templates by story type.
- Digiday, "How The Atlantic redesigned its article pages to emphasize loyalty"
  (https://digiday.com/media/atlantic-redesigned-article-pages-emphasize-loyalty/):
  later article page with newsletter, podcast and subscription offers.
- FlowingData, "Draw the patterns of Obama's presidency"
  (https://flowingdata.com/2017/01/17/draw-the-patterns-of-obamas-presidency/):
  You Draw It on income and college, then the Obama years.
- Northwestern MU Collective, They Draw It (https://mucollective.northwestern.edu/theydrawit):
  open toolkit for draw-your-belief charts.
- Peabody Awards, "How Y'all, Youse and You Guys Talk"
  (https://peabodyawards.com/award-profile/how-yall-youse-and-you-guys-talk-ny-times-dialect-quiz-2013/):
  most-viewed Times content at the time; 25 questions; three cities and a heat
  map; 350,000 responses; Katz's side project.
- Nieman Lab, "At the Malofiej Infographics World Summit, 'the best form of
  storytelling is often static'"
  (https://www.niemanlab.org/2016/03/at-the-malofiej-infographics-world-summit-the-best-form-of-storytelling-is-often-static/):
  Tse's talk and its reception.
- Garcia Media, "Interactive graphics: less is best at FT?"
  (https://garciamedia.com/blog/interactive_graphics_less_is_best_at_ft/) and
  ACM, "The Impact of Scrollytelling on the Reading Experience of Long-Form
  Journalism" (https://dl.acm.org/doi/fullHtml/10.1145/3605655.3605683): the
  reported content of Tse's talk (scroll, cut steppers and sliders, tooltips
  unseen, redesign two or three times).
- FAIR, "The Needle and the Damage Done" (https://fair.org/home/the-needle-and-the-damage-done/),
  Quartz (https://qz.com/1924611/its-okay-to-look-at-the-new-york-times-election-needle),
  and reports of the 2018 changes (https://www.bizpacreview.com/2018/11/06/ny-times-makes-changes-to-election-needle-so-that-readers-wont-get-upset-690938/):
  jitter criticized; 2018 jitter removed, needle delayed and moved lower; Kahn's
  "nervous reaction."
- Fonts in Use, "The New York Times article redesign, May 2013"
  (https://fontsinuse.com/uses/3907/the-new-york-times-article-redesign-may-2013):
  Franklin for metadata and captions, Georgia for text; Roger Black, "Type for
  the Times" (https://rogerblack.com/blog/post/type_for_the_times): Cheltenham
  and Matthew Carter; OpenNews, "Behind the scenes of the NYT redesign"
  (https://source.opennews.org/articles/behind-scenes-nyt-redesign/): story page
  first.
- Wikipedia, The Upshot (https://en.wikipedia.org/wiki/The_Upshot); Nieman Lab
  Q&A with Leonhardt (https://www.niemanlab.org/2014/04/qa-david-leonhardt-says-the-upshot-wont-replace-nate-silver-at-the-new-york-times/);
  NPR transcript (https://www.npr.org/transcripts/306877308): launch date;
  "conversational voice. Not dumbed down."
- Wikipedia, Aeon (https://en.wikipedia.org/wiki/Aeon_(magazine)): founding,
  charity status, curated videos with credits and links.
- Aeon, Republish (https://aeon.co/republish) and Syndication
  (https://aeon.co/syndication): "Syndicate this essay," agreement, $650, full
  text, images excluded, credit, embargo, 250 words for critique; Psyche author
  terms (https://psyche.co/author-terms).
- Psyche, pitch page (https://psyche.co/pitch), Guides section
  (https://psyche.co/guides/section/relationships-work-and-leisure/animals),
  "Are Psyche Guides reliable?" (https://psyche.co/are-psyche-guides-reliable),
  Aeon on Psyche (https://aeon.co/psyche): the three prisms, Ideas and Guides,
  Guide length and checking.
- Wikipedia, The Pudding (https://en.wikipedia.org/wiki/The_Pudding);
  pudding.cool/about; Storybench, "How The Pudding structures stories as visual
  essays" (https://www.storybench.org/?p=8613); FlowingData, "Telling stories in
  visual data-driven essays"
  (https://flowingdata.com/2020/09/08/telling-stories-in-visual-data-driven-essays/):
  visual essays, long shelf life, scrollytelling then exploration, the tutorial
  series.
- Works in Progress, "is now in print"
  (https://www.worksinprogress.news/p/works-in-progress-is-now-in-print), "About"
  (https://www.worksinprogress.news/about), "has joined Stripe"
  (https://www.worksinprogress.news/p/works-in-progress-has-joined-stripe); X posts
  by Works in Progress and Patrick Collison
  (https://x.com/WorksInProgMag/status/1969775934338437232,
  https://x.com/patrickc/status/1968329409506717857); Park Communications case
  study (https://www.parkcom.co.uk/case-studies/works-in-progress-business-magazine-printing/):
  six 120-page issues, price, November 2025 start, calm typography, online
  forever, no advertising.
- Stripe Press student review (https://tdavis.bitweb1.nwtc.edu/wfed2/website-reviews/stripe-press/index.html):
  dark shelf of spines, sliding details, per-book colors; Stripe Press editorial
  designer posting (https://jobs.generalcatalyst.com/companies/stripe/jobs/38364114-editorial-designer-stripe-press);
  Awwwards listing (https://www.awwwards.com/inspiration/stripe-press-ideas-for-progress-3);
  BookScouter catalogue (https://bookscouter.com/publisher/stripe-press).
- Increment, About (https://increment.com/about/); Stripe, "Introducing
  Increment subscriptions" (https://stripe.com/it/blog/increment-subscriptions);
  Will Larson, "Increment has launched" (https://lethain.com/increment-has-launched/);
  Increment store bundle (https://store.increment.com/products/complete-increment-bundle-1);
  final letter (https://increment.com/planning/letter-from-the-editor/): dates,
  counts, the 19 themes, the poster, the style guide, the end.
- Craig Mod, "Books in the Age of the iPad"
  (https://craigmod.com/journal/ipad_and_books/) and Jesse Stommel's response
  (https://www.jessestommel.com/books-on-the-ipad-will-the-words-still-touch/):
  Formless and Definite content.
- Scholarly Kitchen on "Subcompact Publishing"
  (https://scholarlykitchen.sspnet.org/2012/12/13/a-call-for-simplified-tablet-publishing-the-subcompact-manifesto/),
  Kottke (https://kottke.org/12/12/trend-alert-small-internet-publications),
  Craig Mod, "Subcompact round up" (https://craigmod.com/essays/subcompact_round_up/):
  the manifesto's qualities.
- Curtis McHale, "On the future book" (https://curtismchale.ca/2018/12/22/on-the-future-book):
  summary of Mod's Wired piece.
- Craig Mod, Ridgeline and membership pages (https://craigmod.com/ridgeline,
  https://craigmod.com/ridgeline/057/, https://craigmod.com/membership/2023):
  weekly and monthly letters, SPECIAL PROJECTS, member perks, 1,000+ members;
  Scratching the Surface podcast (https://scratchingthesurface.fm/post/183257846460/113-craig-mod):
  Roden, Ridgeline, On Margins.
- Our World in Data, "Introducing our updated work on Poverty"
  (https://ourworldindata.org/redesigning-from-one-to-two-columns), "homepage
  redesign" (https://ourworldindata.org/homepage-redesign), "We're launching Data
  Insights" (https://ourworldInData.org/launching-data-insights): topic-page
  aims and team, home page changes, the Data Insights format.
- Wikipedia, The Public Domain Review
  (https://en.wikipedia.org/wiki/The_Public_Domain_Review); Open Knowledge
  Foundation (https://blog.okfn.org/2011/08/09/the-public-domain-review-has-a-new-website/);
  Creative Commons (https://creativecommons.org/?p=28564); PDR, "Announcing the
  Public Domain Image Archive"
  (https://publicdomainreview.org/blog/2025/01/announcing-the-public-domain-image-archive/);
  Colossal (https://www.thisiscolossal.com/2025/01/public-domain-image-archive/):
  weekly format, Curator's Choice, licenses, the archive's three views and
  source links, the print shop.
- Gwern.net design pages through search (https://gwern.net/design,
  https://gwern.net/design-graveyard, https://gwern.net/sidenote): the four
  principles, semantic zoom, the graveyard, the case for sidenotes.
- John Gruber, "Notes on Notes" (https://daringfireball.net/2005/08/notes_on_notes):
  sidenotes work best when notes are short.
- Distill, "Communicating with Interactive Articles"
  (https://distill.pub/2020/communicating-with-interactive-articles/) and UW
  Interactive Data Lab (https://idl.uw.edu/papers/comm-interactive-articles):
  the five affordances.
- Edward Tufte, Ask E.T. (https://www.edwardtufte.com/bboard): the moderated
  forum.
- Matthew Butterick, "Typography in ten minutes"
  (https://practicaltypography.com/typography-in-ten-minutes.html): body size,
  line spacing, line length.
- EA Forum, "Announcing the first issue of Asterisk"
  (https://forum.effectivealtruism.org/posts/YdHMxWKBaa79JcsSW/announcing-the-first-issue-of-asterisk):
  a reader's report that a sister magazine's notes vanish when an article is
  printed, the print side of the sidenote problem (why pattern 1 keeps a foot
  list).
