# Design audit: LiveWell against a top-ten bar

Auditor lens: visual design. Date: 2026-11-17.

**Verdict in one paragraph.** LiveWell looks like a careful, quiet, well-kept site. It does not yet look like one of the ten best. The palette is disciplined, the display type has real dignity, and nothing on the site shouts. But a visitor who lands on any page sees words on cream and black and nothing else: no drawing, no map, no timeline, no photograph that loads from the site's own files, nothing to touch on the first screen. The long reading is set in the same typeface as the buttons, with italics the browser fakes. Every page has a slightly different heading size, side margin and button shape. The pending work (PR #540) improves the doors and the home page's second screen, but it does not change how the site looks. The redesign in `docs/work/design/VISION.md` proposes most of the right moves; almost none of it is built.

**Score, visual design only: 6 out of 10 live. 6 out of 10 after the pending PRs.** The pending work changes structure and content, not the visual system.

---

## How this was done

- Real browser (Playwright, Chromium), 390 x 844 phone and 1440 x 900 desktop, full page and first screen, on both builds: LIVE (origin/main at `fea345a4`, http://localhost:4311) and PR #540 (http://localhost:4312).
- Eighteen routes on each build: Home, `/study`, `/study/bible`, `/study/bible/john/1`, `/theology/history`, `/writing`, `/writing/what-post-christian-means`, `/family`, `/family/tonight`, `/topics`, `/about`, `/resources`, `/tools`, `/tools/test-the-case`, `/help`, `/subscribe`, `/contact`, a 404. Dark mode forced on Home, the essay and John 1.
- Measurements (heading sizes, body sizes, column widths, button styles) were read from the rendered page by script; they are in `shots/design/metrics-live.json` and `metrics-pr540.json`.
- All screenshots are in `/home/user/Livewell-/docs/work/audit-2026-11/shots/design/`. File names: `<build>-<page>-<m|d>-<fold|full>.png`; close-ups are `crop-<build>-<name>-<m|d>.png`.

**What the sandbox could not show.** There is no database locally. The essay list shows no reading times (the code prints "N min read" only when the API supplies it; `client/src/pages/Writing.tsx` line 556). James's portrait is loaded from an outside server (`d2xsxph8kpxj0f.cloudfront.net`, set in `client/src/lib/positioning.ts` line 50) that the sandbox cannot reach, so it appears as a broken image in every screenshot. I do not count the broken image itself as a defect on the live site; I do count where the picture is placed and where it is loaded from. In the close-up crops a second copy of the header appears mid-image; that is an artifact of how the crop was taken, not a defect.

---

## The ten most damaging visual problems

Ordered by what they cost a visitor.

### 1. Home's first screen is two paragraphs on black, with nothing to look at or do

- **Where:** `/` , `client/src/pages/Home.tsx`, `.home-hero` in `client/src/index.css` (line 434 on).
- **What a visitor sees.** Desktop: the headline "Learning to follow Jesus — and live well — in post‑Christian America.", then two gray paragraphs ("What does it look like to follow Jesus when the culture around you no longer shares your assumptions? ..." and "I'm James Bell, a pastor, Susanna's husband, and dad to five sons. ..."), and a small portrait. The first door ("Study the Bible") is cut off at the bottom edge. Phone: the whole first screen is the headline and the two paragraphs; no door, no button, no search, no verse, no drawing. The headline wraps so that one line begins with a dash at each size ("— and live well — in" on desktop, "— in post-Christian" on a phone). On a phone the black hero alone is 912px tall, taller than the screen.
- **Why it fails.** James asked for "one of the top 10 designs" and "more interactive." The first three seconds say "a pastor's essay," not "a place to study the Bible, church history and hard questions with your family." Nothing can be clicked without scrolling on a phone.
- **Fix.** Shorten the hero to the headline and one sentence, and bring one live thing onto the first screen at both sizes: the Find field and tonight's devotion line (already built in #540, but below the hero), or the Line drawing VISION proposes. Reword or re-break the headline so no line starts with a dash.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING. #540 adds "Look up a passage or ask a question" directly under the hero, which is a real gain, but at 1440 x 900 only its heading and the top edge of the field show (the field starts 893px down), and on a phone it starts about 1,060px down, on the second screen. The line for tonight's devotion sits further down still (about 1,830px on a phone) (`verify-pr540-home-d-fold.png`, `verify-pr540-home-m-fold.png`).
- **Shots:** `live-home-d-fold.png`, `live-home-m-fold.png`, `pr540-home-d-fold.png`.

### 2. His photograph is on the front page, which he may not want, and it is loaded from someone else's server

- **Where:** `/` (and `/about`, and the author card). `client/src/pages/Home.tsx` (`home-hero__portrait`), `client/src/lib/positioning.ts` line 50.
- **What a visitor sees.** A 168 x 210 portrait labelled "James Bell" with "About James" beneath it, at the top left of the hero. On a phone it is a 56 x 70 thumbnail, too small to read a face.
- **Why it fails.** `docs/work/NOTES.md` (2026-10-28) records James's words in full: "i dont want my image on the frontpage or you can use the pictture from my facebook page." So he gave two choices: no picture, or his Facebook picture. A picture is there on live and on #540; nothing in the repo says whether it is the Facebook one, so this is a question for James, not a proven breach. It also comes from an outside CloudFront address, so if that address ever fails the hero opens with a gray box and the words "James Bell" in it, which is exactly what the sandbox shows.
- **Fix.** Ask James which he wants. Either remove the portrait from Home (keep the "About James" link as text) or swap in the Facebook picture. Either way, move the image file into `client/public/` for `/about` and the author card so the site never depends on an outside host for its own face.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING. **Needs James** to choose: no picture, or the Facebook picture.
- **Shot:** `live-home-d-fold.png`, `pr540-home-m-fold.png`.

### 3. There is no drawing, map or diagram on any page audited

- **Where:** every page audited. The script counted images per page: 0 on fifteen of eighteen routes; the only images on these pages are the portrait (Home, About, the essay's author card) and three book covers on Home. (Pages outside the eighteen, such as the book pages, also carry covers.)
- **What a visitor sees.** Church history, "22 essays, from Pentecost to the present," is a two-column list of text and a set of accordions (`crop-live-history-mid-d.png`). The Bible index is 66 identical white boxes of gray text (`crop-live-bible-books-d.png`). `/tools` is 36 identical white boxes with a small stock icon each (`live-tools-d-full.png`). The home "books" band shows one loud red, white and blue retail cover beside two near-black placeholder covers whose titles are too small to read (`live-home-d-full.png`).
- **Why it fails.** "I would like it to be more interactive. People can click through and be very creative." Type alone can carry dignity; it cannot show the shape of two thousand years or of sixty-six books. Nothing on the site would be recognised as LiveWell if it were shared as an image.
- **Fix.** Build the two drawings VISION already specifies: the Line (twenty centuries to scale, "You are here") on `/theology/history`, and the canon as 66 bars sized by chapter count on `/study/bible`. Then one house-style drawing per tool group and one public-domain artwork per era essay. Give the two placeholder covers a proper series design.
- **Size:** L. **Status:** STILL-OPEN-AFTER-PENDING. VISION 6.6 (Plates I to VIII) proposes it; none is built.

### 4. Long reading is set in the button typeface, with faked italics and typewriter quotation marks

- **Where:** `/writing/what-post-christian-means` and every essay, era essay, devotion and Bible chapter. `.article-body` in `client/src/index.css`; fonts in `client/public/fonts/` (Inter 400, 500, 600 roman only; no Inter italic file exists on live or on #540).
- **What a visitor sees.** An 18-minute essay in Inter 18px with 31.5px line spacing, at both phone and desktop width, the face used for "Subscribe." Book titles in the first paragraph (*The Death of God*, *The Culture of Our Post-Christian Era*) are slanted by the browser, not true italics. The title reads `What "Post-Christian" Actually Means` with straight typewriter quotes at 56px, and straight quotes run through the body ("Is God Dead?"). The three closing Scripture quotations are in the same faked italic (`crop-live-essay-end1-d.png`).
- **Why it fails.** "Intellectual, academic," "match my Substack." Serious reading sites set long text in a text serif; Substack's default essay look is a serif reading column. Fake italics and straight quotes are the two marks a trained eye spots first as "not typeset."
- **Fix.** Add one self-hosted text serif with a true italic for essays, Scripture, notes and devotions (VISION P1 proposes Source Serif 4). If James says no, self-host Inter Italic at minimum. Convert straight quotes to curly ones at render time in `Markdown.tsx` and in titles.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING. **Needs James** (it changes the typography table in `CLAUDE.md`).
- **Shots:** `live-essay-d-fold.png`, `crop-live-essay-body-d.png`.

### 5. The Study Bible chapter is a wall of sans-serif text with the notes far below it

- **Where:** `/study/bible/john/1` (and all 1,189 chapters). `client/src/pages/` Study Bible chapter page.
- **What a visitor sees.** On a phone the first screen is "THE STUDY BIBLE / John 1", a "Reading | Greek" toggle, arrows, a "Go to: John 3:16, Romans 8" box and the start of an eleven-line gray summary. Verse 1 begins on the second screen. All 51 verses then run as one unbroken block of Inter with no paragraphs and no headings, verse numbers as small mustard superscripts (`crop-live-john-text-m.png`). On desktop the chapter notes come after verse 51 as fourteen closed rows ("The historical setting +", "Key Greek words +" ...) and the right two-thirds of the screen is empty beside them (`live-john1-d-full.png`). The page is 13 phone screens long. **What already works (corrected in verification):** each verse number is a button ("Study verse 3"). Tapping it opens that verse's study notes and Greek in a sheet that rises from the bottom on a phone and slides in from the right on desktop (`verify-live-john-versetap-m.png`). So verse notes do open beside the verse today. The trouble is that the only way in is a 24 x 24px mustard number at 12px, which few visitors will think to tap.
- **Why it fails.** James wants "the best Bible study tool in the world." This is the flagship page and it is the least designed of the important ones. Scripture is not set as Scripture; the poem that opens John is set like terms of service.
- **Fix.** Text first, in the text serif, paragraphed, with the chapter's own outline headings in the text; keep the verse sheet that exists and make it findable (let a tap on the verse itself open it, and show the hint once); a bottom bar for previous, picker, next. This is VISION 5.4 ("the desk").
- **Size:** L. **Status:** STILL-OPEN-AFTER-PENDING. The one-block text and the notes below verse 51 are as CRITIQUE problem 1 described on 2026-10-27; the verse sheet is built and live.

### 6. No two pages share a heading size, a side margin, or a page-top

- **Where:** site-wide. Measured from the rendered pages (`metrics-live.json`).
- **What a visitor sees.** Desktop page titles at ten different sizes across eighteen pages: 78px (Home), 76 (About), 64 (Resources, Subscribe, Contact), 60.8 (Study Bible), 60 (History), 58 (Help), 56 (Study, Essays, essay, Family, Tonight, Test the Case), 52 (Tools, 404), 44.8 (John 1). On a phone the body text column is 358px wide on Home, Study and Tonight, 342px on Subscribe, 326px on History, Essays, Help and John 1, 294px on Tools and 290px on Resources, so the left edge of the text jumps as you move between pages. Nine pages open on a black band (Home, History, Essays, Resources, Tools, Test the Case, Help, Subscribe, About) and nine on cream (Study, Study Bible, John 1, essay, Family, Tonight, Topics, Contact, 404) with no rule a visitor could guess. Second-level headings on `/family` alone come in four sizes (44, 41.6, 34, 32px).
- **Why it fails.** The best sites are recognised by sameness: one page-top, one scale, one margin. Drift reads as "built by many hands," which is the opposite of "elite."
- **Fix.** Declare a type scale and one phone gutter as `:root` tokens and move every page head onto the one `PageHead` component; spend black only where weight is earned. VISION 6.2, 6.3 and 6.4 (P2, P4) specify this.
- **Size:** L (many files, simple change each). **Status:** STILL-OPEN-AFTER-PENDING.
- **Shots:** compare `live-study-d-fold.png`, `live-writing-d-fold.png`, `live-tools-d-fold.png`, `live-resources-d-fold.png`.

### 7. Buttons, chips and cards come in too many shapes, and mustard is used as paint

- **Where:** site-wide; counted in code: about 75 pill-shaped (fully rounded) controls (73 to 78 depending on how the search is written) and 116 mustard-filled backgrounds in `client/src/**/*.tsx` on live.
- **What a visitor sees.** Square black "Open the Study Bible" on `/study`, but a round "Go" button and a pill-shaped search box one click later on `/study/bible`. Square question buttons on Test the Case; pill chips on `/help`, `/tools` and the history tabs. The 404 page's main button is a solid mustard slab ("Back to the front page"); the footer's "Subscribe" on every page is solid mustard; "Actually" in the Tools headline and "once" in the Subscribe headline are mustard italic words. Cards carry a mustard bar on the top (`/family`), on the left (`/tools`, the essay contents box, newsletter cards) or not at all (Bible books). Eyebrows appear with a leading rule, without one, centred with rules both sides, in mustard, in gray, and on `/tools` in 12px Cormorant capitals ("START WITH AN HONEST READING"), which is too frail to read comfortably.
- **Why it fails.** The brand contract says mustard is "punctuation, not a paragraph" and "never ... large background fills." Each page obeys the 8 percent rule by area, but the rule's spirit (one mark where it matters) is broken on most screens. Component drift is the clearest gap between this site and a top-ten one.
- **Fix.** One eyebrow, three buttons (ink, outline, text link), one card style, square corners everywhere, no mustard fills and no mustard words in headlines. VISION 6.4 (P3) and 6.7 state exactly this.
- **Size:** M to L. **Status:** STILL-OPEN-AFTER-PENDING.
- **Shots:** `live-404-d-fold.png`, `live-bible-d-fold.png`, `live-tools-d-fold.png`, `live-subscribe-d-full.png`.

### 8. The essay does not end; it turns into a funnel

- **Where:** `/writing/what-post-christian-means` and every essay. `client/src/pages/ArticleDetail.tsx` and its end components (`ChannelLine.tsx`, `AuthorBio.tsx`).
- **What a visitor sees after the last line** ("Most of the exiles never saw theirs, and God kept His word anyway."): a second toolbar ("Send to my phone", "Save", "Print", "Cite this", "Send to..."), a band holding one link ("Find help for what you are facing →"), "KEEP READING · ANOTHER ESSAY" with four essays, a newsletter card ("One serious essay a week"), "ABOUT THE AUTHOR", "James also writes elsewhere: The newsletter · Facebook · ENDS · Following the Way · Everywhere James is" (in 14px gray type), "← All essays", and then the footer with a second newsletter form. Before the first sentence there are also eight controls: "Send to my phone", "Save", "Print", "Listen", "A−", "A+", "Focus", "IN THIS ESSAY". On a phone, "Send to my phone" is the heaviest thing on the screen you are already holding. On desktop the first sentence of the essay starts 1,150px down, wholly below the first 900px screen; on a phone it starts at 739px, just inside it.
- **Why it fails.** The voice rule is "endings that leave weight." Substack, which James wants to match, ends an essay with a like, a comment, a share and one subscribe box. Here the reader meets six asks.
- **Fix.** One quiet control row at the top (Aa, Save, Share). After the last line: an end mark, space, one next essay, the sources, and the newsletter once. Hide "Send to my phone" on phones. VISION 5.24 specifies it.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.
- **Shots:** `crop-live-essay-end1-d.png`, `crop-live-essay-end2-d.png`, `live-essay-m-fold.png`.
- **A side note for James, outside my lens but visible in the same screenshot:** the author card reads "has pastored First Baptist Church of Fenton, Michigan, for twelve years ... close to eighteen thousand pastors ... has written twenty-one books," and `/about` lists "Lead Pastor, First Baptist Church of Fenton" and "Author of 21 books." The standing instruction is never to state his title, years in ministry or book count (`client/src/components/AuthorBio.tsx`, `client/src/pages/About.tsx`).

### 9. The hub pages are long columns of identical boxes

- **Where:** `/study/bible` (5,835px tall on desktop, 12,956px on a phone, which is 15 screens), `/theology/history` (15,542px phone, 18 screens), `/help` (12,192px), `/family` (11,803px), `/tools` (10,525px).
- **What a visitor sees.** `/family` opens well ("Disciple your whole family, in one place." and tonight's devotion in one card), then runs through ten more sections that alternate cream, warm cream and two black bands with two different pull-quote styles, ending in a machine-sorted list titled "Home and family life" that includes "Is 2 Chronicles 7:14 a Promise to America?" (`live-family-d-full.png`). `/tools` is 36 near-identical cards. `/study/bible` is 66.
- **Why it fails.** "One place for families to go." A parent on a phone will not scroll fourteen screens. Density without hierarchy reads as a warehouse.
- **Fix.** Each hub is one screen of distinct choices, then "see all." The canon as a compact list that opens a chapter grid in place; tools grouped with three shown working; `/family` cut to tonight, this week, the year, the catechism.
- **Size:** M per hub. **Status:** STILL-OPEN-AFTER-PENDING. #540's `/topics` is the model to copy: one cream page, one list, every row a plain question (`pr540-topics-d-full.png`). #540 also adds a second part to `/family`, which makes that page longer, not shorter (8,801px desktop on #540 against 8,082px live).

### 10. Small polish defects that a careful reader notices

Each is small; together they are the difference between "well kept" and "finished."

| Where | What a visitor sees | Fix | Size | Status |
|---|---|---|---|---|
| 404 page (`client/src/pages/NotFound.tsx`), and on LIVE also `/topics`, which does not exist yet | "404 / There is no page here." with no site header, no menu and no footer, a solid mustard button, and a dash in the copy ("Nothing is lost — the writing, the books ...") | Wrap in the normal header and footer; ink button | S | STILL-OPEN-AFTER-PENDING (`/topics` itself is FIXED-IN-PENDING, #540) |
| Footer, every page, desktop | The email box is too narrow for its own placeholder: it shows "you@example.con" cut off | Widen the field or stack it | S | STILL-OPEN-AFTER-PENDING |
| `/subscribe` (`client/src/pages/EmailSignup.tsx`) | The "Subscribe" button is a dull gray-brown that looks broken until the visitor picks one of four labels ("I'm a skeptic" ...); heading "Subscribe — and tell us where you're standing" | Accept an address without a label; ink button | S | STILL-OPEN-AFTER-PENDING |
| `/family/tonight`, `/family` | Title "Taking Care Of What Is Not Yours" capitalises "Of"; the page also shows two counters, "72 of 72" and "Week 47 of the year" | Sentence case; one counter | S | STILL-OPEN-AFTER-PENDING |
| `/writing` | No date on any row; some summaries end without a full stop ("Fear is the most powerful distorter of Christian thinking") and one carries dashes; two near-twin titles one section apart, "When Fear Becomes Theology" and "When Fear Rewrites Theology" | Date and minutes on every row; edit the deks | S | STILL-OPEN-AFTER-PENDING (reading times need the database; dates are not in the row code at all) |
| Essay end, "KEEP READING" | The hairlines under the four rows are a mix of gray and mustard (gray, mustard, mustard, gray in the capture) for no visible reason | One rule colour | S | STILL-OPEN-AFTER-PENDING |
| Essay, desktop | A black vertical "FIND HELP" tab with an X floats on the right edge beside the first paragraph of an essay about secularisation | Show it only on care pages | S | STILL-OPEN-AFTER-PENDING |
| Night reading | There is no dark mode for any visitor: `ThemeProvider` is fixed to light (`client/src/App.tsx` line 717 on live, 723 on #540) and nothing follows the phone's setting. Forced on, Home, the essay and John 1 look close to ready (`live-home-d-dark-full.png`, `live-essay-d-dark-fold.png`); one visible fault the auditor reported is the footer's "One serious essay a week" label disappearing (not re-checked) | Finish the token audit and offer Paper / Night | M | STILL-OPEN-AFTER-PENDING (VISION 6.9) |
| Motion | Motion is sparse: a 900ms rise of the hero text on load (`.lede-rise`, `index.css` line 406), a scroll reveal, and the Study Bible verse sheet rising or sliding in. Hover styles exist (64 rules) but there is no pressed state at all: the stylesheet has no `:active` rule, so a tap on a phone gives no feedback | Pressed states on every button and row, a pending bar | M | STILL-OPEN-AFTER-PENDING (VISION 6.8) |

---

## Five things that already look world-class

1. **The palette and its restraint.** Cream as the room, near-black for weight, hairlines instead of shadows, square corners, no gradients, no stock photographs, no pop-up, no cookie wall. Very few ministry sites manage this. (`live-study-d-fold.png`)
2. **The essay title block.** Kicker "AFTER CHRISTENDOM", the title in Cormorant at 56px, a true-italic Cormorant summary, a short mustard rule, then "James Bell · 18 min read · October 27, 2026." This is the most Substack-like, most publication-like moment on the site. (`live-essay-d-fold.png`)
3. **The table-of-contents layout** on `/study`, `/resources`, `/writing` and Home's doors: a large serif label on the left, plain descriptions on the right, hairlines between. It is calm, fast to scan and distinctly "a book." #540's `/topics` uses the same pattern with questions in everyday words ("How do we hand the faith to our kids in a secular age?") and is the best-designed new page. (`live-study-d-fold.png`, `pr540-topics-d-full.png`)
4. **Tonight's devotion.** One 680px column, six plain serif heads (Read, Talk, Ask, Do, Remember, Pray), the prayer in Cormorant italic, one black button "We did this tonight." It is the page where the design and the purpose come closest to being the same thing. (It does carry the essay's tool row above the text: "Send to my phone", "Save", "Print", "Listen".) (`live-tonight-d-full.png`)
5. **Find Help's first screen and Test the Case.** "What are you facing?" with "Type it in your own words" and twelve first-person chips ("I can't stop worrying", "My marriage is falling apart"); and "Did the resurrection happen?" with nine question buttons and "You can walk away unconvinced at any point and I will not chase you." These are the two places the site is already interactive in the way James asked for. (`live-help-d-fold.png`, `live-tool-d-fold.png`)

Also sound: self-hosted fonts with no layout shift seen in any capture; no horizontal overflow on any of the 36 page-and-size combinations measured; the phone menu in #540 is clean and thumb-sized (`crop-pr540-menu-m.png`); the `/contact` page is simple and complete, with the crisis line beside the form.

---

## "Match my Substack"

**What a Substack publication looks and reads like** (from my own knowledge of the product; I could not open James's page from the sandbox): a narrow single column on a plain background; a large serif title; a one-line subtitle in gray; a small byline row with the author's name, the date and often a reading time; then the text immediately, in a serif at about 18 to 20px with generous line spacing; a subscribe box in the header and one at the end; like, comment and share as three small icons. The publication home page is a dated list: title, one-line subtitle, date, newest first, with one featured post on top. Almost no decoration. The feeling is "a letter from one person."

**Where LiveWell's essay page already matches.**
- A single 680px column with an 18px/31.5px body, and a 22px italic summary above it: the proportions are right.
- A large serif title, an italic subtitle, and "James Bell · 18 min read · October 27, 2026."
- Subscribe sits in the header on every page on desktop. On a phone the header shows only "Find Help", search and the menu; Subscribe is inside the menu.
- A drop capital and a plain cream page: quieter than most Substacks.

**Where it does not.**
- The body is sans-serif (Inter). Substack's reading feel is a serif. This is the single largest difference a reader would feel. (Problem 4.)
- Eight controls and a contents box stand between the byline and the first sentence; on Substack there are none. (Problem 8.)
- The ending carries six asks; Substack carries one. (Problem 8.)
- `/writing` is grouped by theme with no dates, where a Substack home is a dated, newest-first list with one lead post. A reader arriving from Substack will look for "what is new" and not find it. (Problem 10.) #541 and the `land-next` branch add twenty essays; the shelf will need dates more, not less.
- The word "Substack" appears once per page: a 12px mustard link, "Substack →", in the footer's first column. The essay's "James also writes elsewhere" line does link to his Substack, but under the label "The newsletter" (`client/src/lib/channels.ts`), so a reader looking for the word will not see it. `/about` lists Facebook, ENDS, the podcast and the Pastors Connection Network in its body but leaves Substack out of that list on purpose (`About.tsx` line 51). Neither Facebook nor Substack is linked from the header, from Home's body or from `/contact`. For "a one-stop place for my Facebook, Substack," they need a visible, designed home: one "Find James" row (Substack, Facebook, podcast, email) in the footer's first column at body size, on `/about` first, and at the end of every essay.

---

## What separates this site from the best

These comparisons are from my own knowledge of these sites, not from visiting them today; the sandbox cannot reach them.

- **BibleProject** leads its book overviews with a drawn poster and a diagram of the book's structure. LiveWell has the content of those diagrams (the eleven acts, each chapter's outline) and draws none of it.
- **ESV.org** sets Scripture as Scripture: paragraphs, section headings, verse numbers that recede. LiveWell's chapter is one block of interface type.
- **Sefaria** opens connected texts in a side panel when you touch a verse. LiveWell has the same idea built (the verse sheet) but hides it behind a small verse number, and its chapter notes are fourteen closed rows below verse 51.
- **Plough and The Marginalian** commonly pair a long essay with a well-chosen artwork and set the text in a book face. LiveWell's essays have neither.
- **Stripe's documentation and GOV.UK** are recognisable from one cropped corner because every page uses the same page-top, scale and components. LiveWell has ten title sizes and five phone column widths.
- **Our World in Data and the Met's Heilbrunn Timeline** show a subject's shape before its detail. LiveWell's church history is a list.

In one sentence: the best sites have a text face, a drawing hand, one component set and one signature interaction; LiveWell has a display face, a palette and good words.

---

## Ranked design moves that would close the gap

| # | Move | Size | Already in VISION.md? |
|---|---|---|---|
| 1 | Settle the Home portrait (none, or his Facebook picture) and self-host the image | S | VISION 3.1 keeps "his face at a size you can read" in the hero. James's note in NOTES.md says no image, or the Facebook one. Needs his word. |
| 2 | Fix the cheap defects in problem 10 (404 chrome, footer field, straight quotes, title case, gray Subscribe, floating Find Help tab, dates on `/writing`) | S each | Partly (5.25, 6.7) |
| 3 | One text serif with a true italic for essays, Scripture, notes, devotions | M | Yes, P1 (6.1) |
| 4 | Rebuild the essay head and ending: one tool row, end mark, one next read, newsletter once, a visible "Find James" row with Substack and Facebook | M | Yes for the head and ending (5.24); the Substack and Facebook row is not in VISION and should be added |
| 5 | One type scale, one phone gutter, one page-top; black only where earned | L | Yes, P2 and P4 (6.2 to 6.4) |
| 6 | One eyebrow, three buttons, one card; square corners; mustard as a mark only | M to L | Yes, P3 (6.4, 6.7) |
| 7 | Home's first screen: shorter hero, Find and Tonight above the fold, a door for the skeptic | M | Yes (3.1 to 3.4); #540 builds the pieces but places them below the fold |
| 8 | The chapter as "the desk": text first and paragraphed, the existing verse sheet made findable, bottom bar | L | Yes (5.4, 5.5) |
| 9 | The two signature drawings: the Line on church history and the canon bars on the Study Bible | L | Yes, Plates I and II (6.6, 4.1) |
| 10 | Shorten the hubs to one screen plus "see all" | M each | Yes (5.1 to 5.3, 5.10) |
| 11 | Night mode, offered as Paper / Night | M | Yes, P6 (6.9) |
| 12 | Pressed states, sheets, a pending bar: the small motions that make a site feel alive | M | Yes (6.8) |
| 13 | A drawn wordmark and a series design for the three book covers | M, outside help | Raised in CRITIQUE 10 and VISION 6.10 |

Moves 1 to 4 would change how the site feels to a Substack reader within a week of work. Moves 5 to 9 are what "top ten" actually requires.

---

## Old findings, checked today

From `docs/work/design/CRITIQUE.md` (2026-10-27):

| Old finding | Today |
|---|---|
| Doors named for what James made (Study, Essays, Books, Resources, About) | Still live. FIXED-IN-PENDING, #540: Study, Topics, Family, Essays, About. |
| Long reading in Inter; faked italics | Still true, live and #540. |
| Chapter page: one block of text, notes below verse 51 | Still true of the text and the chapter notes, live and #540. A per-verse sheet now opens from the verse number. |
| Essay toolbar before the first line; six asks after the last | Still true, live and #540. |
| Headline sizes with no scale | Still true: ten sizes across eighteen pages. |
| Phone gutters 16, 24, 32, 48px | Still true: text columns of 358, 342, 326, 294 and 290px. |
| No illustration, map or diagram | Still true. |
| Dark mode off for everyone | Still true. |
| "Author of 21 books" on About and under essays | Still true, live and #540. |
| Subscribe button dead until a label is chosen | Still true. |
| No date on any list | Still true on `/writing`. |
| Home lacks Find and a lead | FIXED-IN-PENDING, #540 (below the first screen). |
| "Post-Christian" has no page | Partly fixed on live: the essay "What "Post-Christian" Actually Means" is public (#539). `/topics` with the question "What does it mean that America is post-Christian, and how do we live in it?" is FIXED-IN-PENDING, #540. |
| Inputs under 16px | Not found today. The four "small inputs" the script flagged on `/subscribe` are the radio buttons, where type size does not apply; the email field is 16px. |

---

## Questions only James can answer

1. He wrote "i dont want my image on the frontpage or you can use the pictture from my facebook page." Which does he want, and is the picture there today the Facebook one? A portrait is on the front page today and in #540, and the redesign vision assumes it stays.
2. May a text serif (Source Serif 4 is proposed) be added for essays, Scripture and devotions? It changes the typography table in `CLAUDE.md`.
3. Should the essay ending be cut to one next essay and one newsletter box, giving up the book band and the extra links?
4. Where should Substack and Facebook sit so the site is "one stop": the header, the footer's first column, the end of every essay, or all three? And should the link say "Substack" instead of "The newsletter"?
5. May the site carry drawings (the Line, the canon bars) and public-domain artwork, and should a wordmark and a cover series be commissioned?
6. The author card and `/about` state his title, twelve years and twenty-one books. Remove them?

---

## Findings the first pass missed (added in verification)

| # | Where | What a visitor sees | Why it matters | Fix | Size | Status |
|---|---|---|---|---|---|---|
| A1 | Every page, phone. `client/src/components/Footer.tsx` | The footer is 1,353px tall on a 390px phone (1.6 screens) on live and 1,918px (2.3 screens) on #540, which adds six links. On `/contact` in #540 the footer is 1,918 of the page's 3,184px (`verify-pr540-footer-m.png`). On desktop it grows from 735px to 945px. | The last thing on every page is a long single column of 34 to 40 links. It makes short pages feel unfinished and long ones endless. | On a phone, show the five doors as closed rows that open, or two columns; keep "Find James" and the newsletter above them. | M | LIVE-PROBLEM, worse in #540: STILL-OPEN-AFTER-PENDING |
| A2 | `/study/bible/john/1` and every chapter. `client/src/pages/StudyBible.tsx`, `.st-sheet` in `index.css` | The best interaction on the site is hidden. Tapping a verse number opens "JOHN 1:3 ... STUDY NOTES ... THE GREEK" in a sheet. The only trigger is the mustard number itself, 24 x 24px with 12px type. | This is the "click through" James asked for, and it is already built. Most visitors will never find it. | Let a tap anywhere on the verse open the sheet; underline the verse on hover; show "Tap a verse to study it" once, above verse 1. | S to M | STILL-OPEN-AFTER-PENDING |
| A3 | Every page, phone header. `client/src/components/MinimalNav.tsx` | The phone header shows "Find Help", a search icon and the menu icon. "Subscribe" is not there; it is inside the menu. | Readers arriving from Substack or Facebook are mostly on phones. The one ask the site most wants is one tap further away for them than for desktop readers. | Give the phone header a small text "Subscribe", or pin it as the first row of the open menu. | S | STILL-OPEN-AFTER-PENDING |
| A4 | Site-wide. `client/src/index.css` | No button, row or chip changes when pressed: the stylesheet has 64 hover rules, 30 keyboard-focus rules and no `:active` rule. | Hover does nothing on a phone. A site that does not answer a touch feels dead, which is the opposite of "more interactive." | One shared pressed state (a slight darkening) on buttons, rows and chips. | S | STILL-OPEN-AFTER-PENDING |

---

## Verification

A second reviewer re-checked this report on 2026-11-17 against both running builds (Chromium at 390 x 844 and 1440 x 900) and the code. New screenshots are the `verify-*.png` files in `shots/design/`.

**Checked and confirmed.** All ten headline problems were opened in the browser, and all rows of problem 10 except the dark-mode footer label. Confirmed as written: the ten desktop title sizes and nine black and nine cream page tops; the phone page heights; no horizontal overflow; images on only three of eighteen routes; Inter with browser-slanted italics and straight quotes in essays (no Inter italic file on live or #540); the eight controls before an essay and the run of asks after it; the author card's "twelve years" and "twenty-one books" against the standing instruction in NOTES.md; the 404 page without header or footer and with a solid mustard button; the footer email field clipping its own placeholder (141px of room for 144px of text); the gray, disabled Subscribe button on `/subscribe`; no dates or reading times on `/writing` (dates are not in the code; reading times need the database); the desktop "FIND HELP" tab on essays (it appears after scrolling); 36 tool cards, 66 book boxes, twelve Find Help chips, nine Test the Case questions; four H2 sizes on `/family`; verse 1 of John starting on the second phone screen; the portrait loading from CloudFront on live, #540, #541 and land-next; dark mode fixed to light; 116 mustard backgrounds in code.

**Corrected.**
- Problem 2 quoted half of James's sentence. The full note offers a choice: no image, "or you can use the pictture from my facebook page." The finding now asks him, and no longer says the site breaks his instruction.
- Problem 5 said notes are only far below the text. A per-verse sheet (phone) and side panel (desktop) already open from the verse number. The finding now says the feature exists and is hard to find. The Sefaria comparison, move 8 and the motion row were corrected to match. Chapter note rows: fourteen, not thirteen.
- Problem 4 and the Substack section gave the essay body as 19px on a phone and 22px on desktop. That was the italic summary. The body is 18px with 31.5px spacing at both sizes.
- The Substack section said Substack is missing from the essay's "James also writes elsewhere" line. It is there, labelled "The newsletter." It also said Subscribe is in the header on every page; on a phone it is inside the menu.
- Problem 1: one headline line starts with a dash at each size, not two. On #540 the Find heading and the top edge of its field do show at the bottom of a 1440 x 900 screen; the tonight line is about two screens down on a phone, not directly under the hero.
- Problem 3's title claimed the whole site; only eighteen pages were audited, and book pages carry covers.
- Motion: there is more than one animation (hero rise, scroll reveal, verse sheet), and hover styles exist. What is missing is any pressed state.
- "Inputs under 16px" on `/subscribe`: the four flagged inputs are radio buttons. Not a defect.
- File and line fixes: the essay page is `ArticleDetail.tsx`; the subscribe page is `EmailSignup.tsx`; `ThemeProvider` is at line 717 on live.

**Claims about other sites.** These remain the auditor's own knowledge and could not be opened from the sandbox. Removed: the line about The New York Times and The Atlantic ending on an end mark, and the claim that YouVersion opens notes beside the verse. Softened: "every" for BibleProject, Plough and The Marginalian.

**Not re-checked.** The dark-mode screenshots and the missing footer label in dark mode; the phone column widths page by page (the spot checks matched); PR #541 and land-next beyond the portrait address, since they add essays and no design change.

**Nothing here is an artifact of the missing database** except the absent reading times on `/writing` and the broken portrait image, both already declared at the top.

**Score.** Unchanged at 6 live and 6 after pending. The hidden verse sheet is a point in the site's favour; the growing phone footer in #540 is a point against.
