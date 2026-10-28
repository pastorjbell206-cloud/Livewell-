# Editorial and typographic review

Lens: the design director of a serious magazine or book publisher. I looked at hierarchy, the reading experience, the type scale and rhythm, measure, white space, image use, how an essay page and an index page read, and whether the site feels like "opening a serious book in a quiet room where the light is good."

Evidence: every `-phone-first.png` and `-desktop-first.png` in `docs/work/design/shots/current/`, and the full-page shots cut into segments for the essay, `/writing`, home, `/study`, `/study/bible`, John 1, church history and one era essay, the Nicene Creed, a context guide, `/books`, `/about`, `/family`, a devotion, `/tools`, Test the Case, `/resources` and `/help/anxiety`. I checked the type tokens in `client/src/index.css` (`--F`, `--B`, `.article-body`, the `@font-face` set). James's portrait is a placeholder in every capture, so I have not judged the photograph.

## Verdict

LiveWell already has the bones of a serious publication. The palette is disciplined, the display face has real gravity at large sizes, the microcopy is honest, and the best index pages read like a book's table of contents rather than a feed. What it lacks is a reading surface worthy of the writing. Every long text on the site, from James's essays to the Gospel of John, is set in Inter, the face the buttons use, and because no Inter italic is installed, every Scripture quotation, book title and emphasis inside that prose is an italic the browser fakes. The Study Bible prints John 1 as one block of sans-serif fifty-one verses long, with no paragraphs or section heads, and folds its notes into fifteen accordions below the text. The essay page puts three rows of controls between the title and the first sentence, so at 1440 x 900 the opening screen shows none of the essay. At the other end it buries the last sentence, the one the brand says must "leave weight," under seven modules and two newsletter forms. Four long-read templates disagree about alignment, background, byline and where the back link goes. The history and context pages leave the right 40 percent of a desktop screen empty while their sources and key figures wait in a black slab at the bottom. The site is organized and decent. It does not yet feel like a serious book. Fixing that does not take more features. It takes a text face for reading, Scripture typeset like Scripture, notes in the margin instead of in slabs, one long-read template, and the discipline to let an ending end.

## Findings, page by page

Severity: **critical** means it breaks the reading promise on a flagship surface, **major** means a reader feels it on most visits, and **minor** means polish a great publisher would not ship.

### Site-wide: the type system

**Critical. Long-form text is set in the UI face, and its italics are fake.** `.article-body` sets every essay, era essay, context guide and set of Study Bible notes in `--B` (Inter, 18px, 1.75), and the Scripture text on John 1 is Inter as well. Only Inter 400, 500 and 600 roman are self-hosted (`client/public/fonts/`), so every italic in body text is a slanted roman the browser invents: the 1 Samuel 8 quotations in the essay, *The Prophetic Imagination*, *Moral Man and Immoral Society*, *Führer*, and "What this move does not settle" on Test the Case. JetBrains Mono, named in the brand table, is not self-hosted either.
*Why it costs the reader:* the brief is a serious book, and books are set in a text serif. When Scripture, James's argument and the Subscribe button share one face, nothing tells the reader that the essay is the thing being offered. Faked italics are the clearest sign a page was not typeset. Readers do not name it, but they register it.
*World-class version:* three faces with three jobs. Cormorant Garamond stays for display. Add a text serif built for long reading on screens, with a true italic and an open licence, such as Source Serif 4 (which has optical sizes) or Literata (made for e-reading), self-hosted. Use it for essays, Scripture, notes, creeds and devotions. Inter stays for UI, labels and metadata. The New Yorker sets long-form in Caslon and the Economist ends every article with a small solid square; that is the register this site wants. This changes the typography table in `CLAUDE.md`, so it is James's call. If he declines, at least self-host Inter's true italic (Inter 4 ships one) so the emphasis stops being faked.

**Major. Mustard is doing a paragraph's work, and as text it fails contrast.** The bright `--mustard` (#D4A017) appears as text on cream in the `/search` category labels ("WHAT THE BIBLE SAYS", "ACROSS THE SITE", "BACK"). I compute that pairing at about 2.1:1 against #F5F0E6, which fails WCAG AA at any size. Mustard is also a filled button ("Read the book" under the essay, the footer Subscribe, the "ALL" pill on search), an italic word inside an H1 ("Actually" on `/tools`, "once" on `/subscribe`), a rule under every related-essay row, a left bar on all 36 tool cards, on the newsletter cards and on the "In this essay" box, a top border on the `/family` cards and the church-history era accordions, and a dotted underline on Scripture links. On the last desktop screen of the essay it appears at least half a dozen times.
*Why it costs the reader:* the brand says mustard is punctuation and under 8 percent of a viewport. When it is everywhere, it stops marking the one important thing on the screen.
*World-class version:* one mustard mark per viewport: a kicker rule, one link underline style, the end mark. Kicker text uses `--mustard-text` (#7A6010) on cream, never `--mustard`. Buttons are ink or outline, and headlines carry no colored words.

**Major. Muted gray is used for primary text.** The palette reserves `--ink-muted` for captions and metadata. It sets the seven-line chapter summary above John 1, the card bodies on `/study/bible` and `/tools` (about 13px), the Study Bible hero, every hero dek on cream, and the most important sentence on Test the Case. Hero paragraphs on black use the 78 percent cream, `--charcoal-fg-muted`, for 150 words on the home page.
*Why it costs the reader:* gray body text is a quiet tax on every line, and it puts the page's real content on the same plane as captions.
*World-class version:* body is `--ink` (or full cream on black), muted is for metadata only, and anything worth reading in full is set dark enough to read in full.

**Major. Surface changes chop the reading and leave gaps.** Era essays and context guides alternate cream and cream-warm bands section by section, so a continuous argument reads like a landing page of stacked slabs. Sources and key figures sit in a black slab after the text. On the home page, `/books`, `/about` and `/writing`, a thin empty cream band, about 36px tall at 1440 wide, sits between the last black section and the black footer, which looks like a rendering fault. The rule that no three sections share a background is being met by inserting slivers.
*Why it costs the reader:* each color change is a page turn. Inside an essay it tells the reader the piece has ended when it has not.
*World-class version:* one paper color for the whole of a long read, sections marked by the H2 and white space, and a surface change only where the piece ends. The footer gets a hairline, not a sliver.

**Major. The site has almost no images, and the few it has do not agree.** Outside three book covers and the portrait, the captured pages carry no picture at all. Twenty-two church-history essays have no map, manuscript, fresco or portrait. The Study Bible has no map of the world the text was written in. The essay has no image. The only recurring "image" is the black slab.
*Why it costs the reader:* a history told without a single artifact asks the reader to imagine the catacombs, the Roman roads and Codex Sinaiticus unaided. The site's subject is the church's long memory, and that memory is visual: icons, manuscripts, the places where councils met. A wall of type on cream reads as austere at first and monotonous by the tenth page.
*World-class version:* a disciplined image program, like the fine art Plough runs with its essays. One public-domain artwork or artifact for each era essay and each long essay, toned to the palette (duotone in ink and cream), set full measure or in the margin, with a real caption: the work, the maker, the date, the holding museum. Every caption must be verified, as the never-fabricate rule requires for any citation. Add simple maps for Study Bible books and era essays. No stock photography, ever.

**Minor. There is no type scale, only sizes.** The H1 runs from about 44px (`/resources/creeds/nicene-creed`, John 1) to about 80px (home) with no visible logic. The home page's three doors ("Study the Bible", "Read the essays", "The books") are set larger than the H1 on the creed page. Card titles drift between 15 and 22px.
*World-class version:* a declared modular scale held as `:root` tokens (for example a ratio near 1.25 from an 18px base: 18, 22.5, 28, 35, 44, 55, 69), used for every heading role.

**Minor. Phone gutters and kickers are inconsistent.** Side gutters at 390 wide are 16px (home, `/study`, the essay), 24px (tools, Which Lens, Deep Bible) and 32px (`/writing`, era essays, Study Bible, the books hero). Long category kickers wrap and strand their leading rule: the essay's "FAITH AND POWER: CHRISTIAN NATIONALISM AND POLITICS" breaks into two centered lines with the rule left alone; "CREEDS, CONFESSIONS, / AND CLASSICS" and "· AD 325 / 381" split into two columns; "ACT NINE OF THE STORY · CHRIST, THE / CENTER" leaves one word on its own line.
*World-class version:* one gutter (16px is the contract), and short kickers that fit one line at 390 wide: "Faith and Power", "Creeds · AD 381", "Act Nine · Christ".

**Minor. The masthead is underweight.** At 1440 wide the "LiveWell / by James Bell" wordmark is about 20px of Cormorant over a mustard rule. Under a home H1 of roughly 80px it reads as a logo slot, not a nameplate.
*World-class version:* a nameplate with presence on the home page only, compact on inner pages, the way a magazine treats its cover against its inside pages.

### `/writing/strongman-theology` (the essay page)

**Critical. The ending is drowned.** After the last line ("...that is the entire point we are too frightened to remember."), the page stacks: a repeat of the action bar (Send to my phone, Save, Print, Cite this, Send to...); a black book promotion with a filled mustard button; a warm band holding the single link "Find help for what you are facing"; "Keep reading", four more essays; a newsletter card; the author card; "James also writes elsewhere" with five links; "All essays"; then the footer with a second newsletter form. That is two subscribe forms inside about a screen and a half.
*Why it costs the reader:* the brand's own test is that endings leave weight and the reader carries it out. Here the reader gets a sales sequence about one second after the verdict.
*World-class version:* an end mark (a small mustard square, as the Economist does, or a fleuron), 120 to 160px of silence, then a one-line byline with "More about James", then one next read chosen by an editor and set like a teaser, not a list. The book appears only when it is the essay's natural sequel, as a quiet line. Newsletter once, in the footer.

**Major. The first sentence starts below the fold.** Before the opening line come the "All essays" bar, the kicker, the title, the dek, a mustard rule, the byline row, a black **Send to my phone** button with Save and Print, a divider, then Listen, Text size A− A+ and Focus, then the "In this essay" box. At 1440 x 900 the first screen shows no essay text. On a phone the first line of body text sits at about y=770 of 844. The heaviest object above the essay is a black utility button, which outweighs the title.
*Why it costs the reader:* the reader came to read, and the page offers to text the essay to them first.
*World-class version:* title, dek and a byline line with date and length, then the drop cap. Reading tools collapse into one "Aa" control in the sticky header (the Apple Books and Kindle pattern), and Save, Print, Send and Cite go into one share menu there or at the end mark. The contents box stays collapsed and hairline-quiet, with no mustard bar.

**Major. Bold sentences inside paragraphs, and Scripture run in.** The essay bolds whole sentences mid-paragraph ("A frightened people does not ask for a monster...", "Fear hears 'he will fight your battles'...", "The strongman never wins by lying about the danger..."). The six-line 1 Samuel 8:11–18 quotation runs inline in faked italic Inter, and so does Matthew 4:8–9.
*Why it costs the reader:* bolded verdicts read like highlighted sermon notes or a sales letter. The voice standard says the verdict lands on rhythm and a hard period, not on weight. Long Scripture set as italic run-in is hard to read and makes the text of God look like an aside.
*World-class version:* no bold in running prose. At most one pull quote per essay, in Cormorant at 28 to 32px, hung in the margin on desktop. Any Scripture quotation longer than two lines is set as block Scripture in the text serif, with the reference under it. The `.article-body blockquote` style already exists and should be used.

**Minor. The dek is spindly.** It is Cormorant italic at about 16px in `--ink-muted`, centered over four lines on a phone. Cormorant's thin hairlines at that size and color are near the edge of legibility.
*World-class version:* the dek at 20 to 22px in the text serif's italic, in ink, two or three lines at most.

### `/writing` (the essay index)

**Major. The shelf repeats itself and its labels are unedited.** "Start with these" lists three essays that reappear in the sections directly below, so "Every Generation Was Sure It Was Right" appears twice on the first desktop screen. "After Christendom", the site's own subject, holds one essay, and "The Ancient Church" holds one. The deks are inconsistent: some end with a period and some do not ("How sincere people mistake their voice for the voice of God"), some are cut mid-thought ("...from the information it most needs"), and "The Bible Assumes You Will Be Wrong" has none. The rows show no date, so a reader cannot tell what is new on a site that promises one essay a week. The 1, 2, 3 numerals are tiny old-style mustard figures that nearly disappear.
*Why it costs the reader:* an index is a promise of editing. Duplicates and ragged deks say nobody edited it.
*World-class version:* a lead essay set larger, with its dek and date (the week's essay), then the sections as a true contents page: title, a one-sentence dek written for the index in house punctuation, date and length on every row, and no essay listed twice. A section with one essay folds into its neighbor until it has three.

### `/` (home)

**Major. The first phone screen is a wall of gray, and the headline breaks on dashes.** At 390 wide, the first screen is a 56px placeholder portrait, a four-line H1, and two paragraphs of about 150 words in muted cream on black. The three doors begin on the second screen. The H1 breaks so a line starts with an em dash ("— in post-Christian" on phone, "— and live well — in" on desktop), which a typesetter would not allow. The same "What does it look like to follow Jesus..." paragraph is also the lede on `/about`. And the home page has no sense of now: nothing shows this week's essay, tonight's devotion or a chapter of the day.
*Why it costs the reader:* the skeptic decides in a few seconds whether this is a serious publication. A paragraph of mission is the least persuasive thing to show them.
*World-class version:* a cover. One sentence of dek, then the lead (this week's essay, with its title in display type and its first line), then the three doors. Break the H1 with `text-wrap: balance` and non-breaking spaces before the dashes, or recast it without dashes. Give the mission paragraph one home, not two.

**Major. The book covers do not belong to one shelf.** On the home page and `/books`, "When God Bless America" is a loud retail cover in red, white and blue, while "The Monster in the Mirror" and "Believe" are dark typeset stand-ins with subtitles too small to read. Side by side they look like one real book and two placeholders.
*World-class version:* a matched treatment for the shelf, either commissioned covers in one series design or a uniform typographic jacket for all three on the index pages, with the retail cover shown on its own book page.

### `/books`

**Major. It is a shelf, not a bookshop page.** Each row is a cover, a kicker, a title, two lines and a button, and the right 45 percent of the desktop screen is empty. A reader is not shown a first line, the contents or a single sentence of the prose before being asked to "Read the opening free". "Three books. Every word mine." sits beside an author card and an `/about` page that both say twenty-one books. The bottom panel reconciles the two, but only at the end of the page.
*Why it costs the reader:* a book is sold by its sentences. Crossway's product pages, for comparison, show the contents, an excerpt and endorsements.
*World-class version:* each book gets the opening sentence set large beside the cover, the contents as a short list, one or two real endorsements if they exist, then the button. The "twenty-one books" line and "Three books" are reconciled in the hero, in one sentence.

### `/study`

**Minor. The hub describes the product and never shows it.** The page is a well-set table of contents: an H2 on the left and a list on the right, repeated four times. That is good. But it is all description: the "Every chapter comes with notes..." paragraph is repeated word for word as the `/study/bible` hero, and three of its six lines ("An introduction to every book", "Notes on all 1,189 chapters", "Open the Study Bible") go to the same address.
*World-class version:* keep the contents layout and add one real fragment of the product, a verse of John 1 with its note beside it, set as a specimen. Write the duplicated paragraph once.

### `/study/bible` (the Study Bible index)

**Major. The canon is laid out like an app settings grid.** Sixty-six identical white cards, four across, give each book its name in Inter 600 at about 14px (the one place titles are not in Cormorant), a chapter count, and about four lines of gray 13px description. Rows end in orphans (Deuteronomy, Song of Solomon, Malachi and Acts each sit alone). No chapter is reachable from this page.
*Why it costs the reader:* the most venerable table of contents in the world is presented as a feature grid. The descriptions are good writing set too small to read, and getting to Romans 8 takes an extra page.
*World-class version:* a contents page. Book names in Cormorant at 22 to 26px, grouped under the seven divisions, a one-line description in the text serif, and the chapter numbers as a quiet tappable strip under each book (ESV.org's chapter picker does this well). The fuller description moves to the book's own page.

### `/study/bible/john/1` (a chapter)

**Critical. Scripture is not typeset as Scripture, and the notes are hidden from the verses they explain.** John 1:1–51 is one undivided block of Inter, with no paragraph breaks, no section headings and no setting of the prologue (1:1–18) as the hymn it is. The page already holds the chapter's outline ("1–5 The Word in the beginning", "6–8 John, a witness to the Light"...), but only in the sidebar, never in the text. Verse numbers are mustard superscripts with a space on either side. A seven-line gray summary comes before the Word. The study notes, the reason the page exists, sit below the chapter in fifteen accordions ("Where we are in the story" open, fourteen closed). The "at a glance" rail is not sticky, so past the first screen the right 40 percent of the desktop page is empty for thousands of pixels. On a phone the text runs about four screens without a break.
*Why it costs the reader:* this is the flagship ("Study leads with the Study Bible"). A reader studying verse 14 cannot see the note on verse 14 without leaving the text, and the text itself reads like a terms-of-service block, not a gospel.
*World-class version:* the text set in the text serif at 20 to 21px with paragraphs and the outline's headings (as ESV.org and every good printed Bible do), the prologue set in sense-lines, and verse numbers small, ink-muted and tight. On desktop, a sticky right rail shows the notes for the verse in view or the verse tapped, the way the NET Bible keys its notes to verses. On a phone the same note opens in a bottom sheet. The summary moves under the title as one short dek in ink, and the accordions become sections of a "notes" column, with "Where we are in the story" first.

### `/theology/history` (church history)

**Major. Two series are interleaved, the timeline has no shape, and related content is mislabeled.** "The era essays" lists 22 pieces in one grid, mixing two series that overlap: "The Apostolic and Sub-Apostolic Age" and "The Apostolic and Persecuted Church", "The Reformation" and "The Reformation and Its Wars". A reader cannot tell which to read. The timeline is a stack of white accordions with mustard top borders, so three centuries of persecution and thirty years of the apostolic age take the same height. Under "Everything on this: Church history" the first pieces are "How Should Christians Think About Sickness and Health?", "How Do You Date Wisely and Choose a Spouse?" and "Is Singleness a Calling or a Waiting Room?"
*Why it costs the reader:* the brand promises the full historical arc. The arc has no visible shape, and the related list tells a careful reader the shelf is filed by machine.
*World-class version:* one canonical series, labeled as the long version, with the other presented as a short course ("the story in eight chapters"). A proportional time axis on which length equals time, with councils and figures pinned to it. Related pieces chosen by hand, or the section removed.

### `/theology/history/the-apostolic-age` (an era essay, and the template it shares)

**Major. Four long-read templates disagree.** The essay page is centered with a drop cap and toolbars. Era essays and context guides open with a black hero, hug the left edge at 130px with the right 40 percent empty on desktop, and alternate background bands by section. The creed is centered under a black hero. The devotion is centered and narrow. On the era essay and the context guide, the closing back link appears twice with different labels and on different grids ("← All of Church History" at the left margin, "← Church History" centered under a rule; on the creed, "← All documents", "The confessions surveyed" and "← Creeds & Confessions"). The era essay carries no byline, no date and no length, and it ends without a "Next: The Age of the Martyrs".
*Why it costs the reader:* the reader cannot learn the house. Each kind of long read teaches a different layout, and the series has no forward motion.
*World-class version:* one long-read template, with variants for essay, era essay, guide and creed: the same masthead block, a centered text column of about 62ch, a margin column on desktop for sidenotes (key figures with dates, sources, Scripture references, as Tufte CSS and Gwern.net place them), one end mark, one "Next in the series", one back link.

### `/resources/creeds/nicene-creed`

**Major. The creed is the smallest type on its own page.** The introduction is in Inter at 18px. The creed itself, the thing the page is about, is set in Cormorant at roughly 16px, as paragraphs on a cream-warm band. Its ten notes are a separate list below, each with a mustard bar, so the reader has to hold "begotten, not made" in mind while scrolling to find out why it matters.
*Why it costs the reader:* a creed is confessed aloud, line by line. Setting it as the quietest block on the page reverses its weight.
*World-class version:* the creed set in sense-lines, as the Book of Common Prayer prints it, at 24 to 28px in the display face, the typographic summit of the page. Each noted phrase carries a quiet marker that opens its note in the margin (desktop) or a sheet (phone). An optional Greek parallel column honors the "one Greek word" the page is built on.

### `/resources/context/honor-shame-vs-guilt`

**Minor. It inherits every problem of the era-essay template.** It hugs the left edge with the right side empty, alternates bands by section, puts Send, Save and Print between the dek and the first paragraph, sets "Key texts" in small Cormorant with dotted mustard underlines on black, and closes with two back links.
*World-class version:* the single long-read template above. Key texts and sources go in the margin beside the paragraphs that use them.

### `/family/tonight` (a devotion)

**Minor. The verse is the least ceremonial thing on the page.** Philippians 4:5 is set in Inter at 18px inside a mustard-ruled box, below a row of Send, Save and Print. The prayer, by contrast, is in Cormorant italic.
*World-class version:* the verse set large (24 to 28px) in the serif, with the reference small under it, as the first thing after the title. Utilities move to the end beside "We did this tonight". The Read, Talk, Ask, Do, Remember, Pray structure stays exactly as it is.

### `/tools`

**Major. A feature grid where the rest of the site is a library.** Thirty-six white cards each carry an icon, a Cormorant title, about eight lines of gray 13px copy, a mustard left bar and "Open the tool →", repeated 36 times. The hero is centered (most heroes are left-aligned), and "Actually" in its H1 is set in mustard italic. `/resources` already lists the same tools in the site's better pattern, a section label with a list of titles and one-line deks.
*Why it costs the reader:* the page looks like a SaaS pricing page, and the tools that matter most (Test the Case, Which Lens, the Study Bible companion) are given the same weight as the Quote Library.
*World-class version:* the `/resources` contents pattern, with three featured tools shown working: the first question of Which Lens answerable in place, the first move of Test the Case. Then the rest as an edited catalogue in the house list style.

### `/tools/test-the-case`

**Major. The most honest line has the faintest type.** "What this move does not settle: This step proves only that something happened..." is about 13px faked-italic Inter in muted gray, below two objection buttons in small Cormorant. The case picker is a wall of nine bordered chips. Progress is only the label "MOVE 1 OF 5".
*Why it costs the reader:* conceding what the argument does not prove is what earns the skeptic's trust (the Audience Standard says so). Set as fine print, it reads like a disclaimer.
*World-class version:* each move set as a two-column statement on desktop ("What this shows" beside "What it does not"), both in the same text face and weight, with the objections as full-width answers in body type and a five-step progress line. Nicky Case's explorable essays are the reference for argument revealed step by step.

### `/help/anxiety`

**Minor. Thirty-eight phone screens with nowhere to stand.** The page is careful and well structured, and the Scripture passages are set as Cormorant italic blockquotes with "Read the whole chapter". But at 32,217px tall on a phone, the section pills at the top are the only map, and they scroll away.
*World-class version:* a slim sticky "On this page" control with the current section named (GOV.UK's long guides keep a contents list and a back-to-top link), plus a back-to-top at each H2.

### `/search?q=grace`

**Minor. Results are hard to scan.** Category labels are bright mustard capitals that fail contrast. The filter pills are all-caps with a filled mustard "ALL". Each result's Cormorant title, at about 18px, is barely larger than its excerpt, and the matched word is not highlighted.
*World-class version:* results grouped by kind with counts ("Study Bible · 4", "Context guides · 2"), titles at the H3 step, the query term set in the excerpt in semibold ink, and labels in `--mustard-text`.

### `/subscribe`

**Minor. The form is not on the first screen.** On a phone the first screen holds the hero ("sent *once*." with the word in mustard italic) and no form. The form card begins at the fold.
*World-class version:* the promise in one line and the email field on the first screen, with the four reader choices directly below.

### `/about`

**Minor. The page opens with the site's mission, not the man.** The hero lede repeats the home page's "What does it look like to follow Jesus..." paragraph in large Cormorant, and his own voice ("I pastor a church in Fenton, Michigan, and I write.") starts below the fold. The empty cream sliver before the footer appears here too.
*World-class version:* lead with his first sentence and the atheist-to-pastor line as the dek. Keep the closing black panel exactly as it is.

## What to keep

- **The palette and its tokens.** Cream as the room, black for weight, mustard as the accent (once it is pared back), all flowing from `:root`.
- **Cormorant at display sizes.** The essay title block (kicker, two-line title, dek, hairline, byline row) and the H2-with-hairline in `.article-body` are handsome. Keep both.
- **The 62ch measure and 1.75 leading in `.article-body`, and the drop cap.** The proportions are right; only the face is wrong.
- **The table-of-contents pattern** on `/study`, `/resources` and `/writing`: a section name and a sentence on the left, titles and one-line deks on the right. It is the best index layout on the site. Extend it to `/tools` and the Study Bible index.
- **The home page's three typographic doors** ("Study the Bible", "Read the essays", "The books") set large in Cormorant with hairlines. They are the most confident editorial gesture on the site.
- **The era list's kickers** ("THE PERSECUTED CHURCH · AD 64-313") over Cormorant titles. Dates up front are exactly right for a history.
- **The devotion's liturgical structure**: Read, Talk, Ask, Do, Remember, Pray, with "We did this tonight" and the prev and next links.
- **The help pages' Scripture handling**: block quotations with the reference traveling with them, "Read the whole chapter", the crisis bar and the Exit site button.
- **The "In this essay" contents**, collapsed on a phone.
- **The sources lists** on era essays and context guides (real authors, real titles). Move them to the margin; do not cut them.
- **The "at a glance" outline on each chapter.** Promote it into the text as section heads.
- **The pending-essay notice** (`/writing/the-rise-of-the-nones`): short, honest, with a real alternative to read.
- **The microcopy voice**: "A short shelf, kept short on purpose", "I will not chase you", "Looking for a book that used to be here?", and the closing panel on `/about`. This is the publication's personality. Design should get out of its way.
