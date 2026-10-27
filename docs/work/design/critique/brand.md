# Brand and visual identity critique

Lens: does LiveWell look elite and distinctive or templated; does it hold the palette and type contract in `CLAUDE.md`; is mustard punctuation or paint; does it have a signature visual language (marks, iconography, illustration, data graphics, photography); does it draw attention without shouting.

Evidence: every `-phone-first.png` and the full-page phone and desktop shots in `docs/work/design/shots/current/` (25 routes plus the header states), `docs/work/design/critique/INVENTORY.md`, and the sources behind what I saw: `client/src/index.css` (`:root`), `client/src/pages/Search.tsx`, `client/src/pages/ToolsHub.tsx`, `client/public/favicon.svg`, `client/public/books/`, `client/public/article-art/`, `client/src/lib/positioning.ts`. Capture caveat: the portrait is a gray placeholder in every shot; production loads one photograph from a legacy CloudFront host.

## Verdict

LiveWell holds its contract better than almost any church or ministry site. The room is cream, black carries the weight, mustard is mostly a one-pixel rule or a link underline, and Cormorant is set large with real confidence. It already reads as grown-up and unhurried. It does not yet look elite or distinctive. It looks like a very well-configured editorial template. Take the wordmark off and it could be any careful Substack-era publication. There is no drawn mark. There is not one illustration, map, diagram or data graphic on 25 pages, and only one photograph, which the site hotlinks as `IMG_4533` from a legacy CDN. The only icons are 15 stock Lucide glyphs spread across 36 tool cards. Every hub uses the same title-and-arrow list. The Study Bible index, the heart of the product, is 66 identical white text cards. The system has also drifted: there are six eyebrow styles and about seven button dialects, the search page still speaks the old bright-mustard dialect, and Scripture is set in three different typographic voices. The redesign does not need a new palette or louder color. It needs four things: a signature visual language drawn from what the site is actually about (the shape of the canon, two thousand years, the places, the table); a real wordmark; one typographic voice for Scripture and long reading; and the discipline to spend black and mustard only where weight is earned. Attention should come from things worth looking at.

## Findings, page by page

Severity: **critical** (the brand fails its brief here), **major** (visible damage to distinctiveness or contract), **minor** (polish, seams, drift).

### Site-wide

**Critical: there is no signature visual language.** Across the captured pages the imagery is three book covers and one portrait. Iconography appears only on `/tools`, where 36 cards share 15 stock Lucide icons (`Search` five times, `BookMarked` five times, `BookOpen` four times). "Which Lens Has You?" gets a magnifying glass. Everything else is Cormorant and Inter on cream. *Why it costs:* James asked for something that draws attention, and type alone can carry dignity but cannot draw the eye or teach a shape. A skeptic's first read is "a well-typeset blog." Nothing on the site could be recognized as LiveWell out of context, as a shared image or a slide on a PCN call. *World-class:* BibleProject has one drawn language across 66 book posters and every video, recognizable at thumbnail size. Plough commissions art for its pieces. The Marginalian built a whole identity from public-domain engravings. LiveWell already owns the seed and does not use it: `client/public/article-art/covenant.svg` is two hairline rings on cream with the overlap marked in mustard. Make that the house style: one-pixel ink line on cream, a single mustard mark on the point that matters. Extend it into a glyph for every tool, era and study pillar; line maps for history and context; and diagrams inside guides.

**Major: the wordmark is typed, not drawn, and there is no mark.** "LiveWell" is live Cormorant text at roughly 18px with a mustard underline, and "BY JAMES BELL" is tracked Inter. In the header the black Subscribe button outweighs it. `favicon.svg` is a mustard "L" drawn by an SVG `<text>` element in Georgia, so it renders in whatever serif the device has. The footer wordmark flips to mustard. *Why it costs:* there is nothing ownable at 16px: the browser tab, a social avatar, a PDF cover, a pastor's slide. *World-class:* a custom-kerned logotype outlined to paths, plus a monogram that survives the favicon size, the way The Atlantic's "A" or Penguin's roundel does. Derive the mark from the house line style (the lens), not from a font.

**Major: Scripture has three typographic voices, and long reading happens in the UI face.** On `/study/bible/john/1` the text is Inter at about 19px with mustard superscript verse numbers. On `/resources/creeds/nicene-creed` the creed is Cormorant at 16px, which looks spindly and gray at that size. On `/family/tonight` the verse is Inter at 20px beside a mustard rule. In essays, quoted Scripture is Inter italic. The 2,300-word essay and the era essays are set in Inter. Elsewhere Cormorant is pressed down to body sizes (the Which Lens answers, key-figure names, the "READ 42" labels) and looks frail, because it is a display cut. *Why it costs:* the brief is "opening a serious book in a quiet room," and serious books set Scripture and long prose in a text serif. A reader of the Bible here should feel the text set apart, the same way every time. This is a recommendation to amend the contract, not a breach: the contract specifies Inter for body. *World-class:* the ESV Reader's Bible and the ESV.org reader give Scripture a single serif column with quiet verse numbers. The Atlantic and The New Yorker set long-form in serif. Keep Inter for UI and short copy. Add one self-hosted text serif for Scripture, creeds and essay bodies; EB Garamond is already in the `--F` fallback stack, and Source Serif 4 or Literata would also serve. Keep Cormorant for display only, above about 24px.

**Major: components have drifted.** I count six eyebrow treatments:
- Inter capitals in `--mustard-text` with a leading rule (Study, Family)
- bright mustard capitals on black (the history and creed heroes)
- Cormorant spaced capitals between double rules (the `/tools` sections)
- Cormorant small capitals in gray ("READ 42", "WORK A STUDY 20")
- gray Inter capitals ("1 OF 72 · WHO GOD SAYS YOU ARE")
- bright gold with no rule (`/search`)

I count about seven button dialects:
- black rectangle with a mustard bottom edge
- black pill ("Go", "Call 988")
- white outline rectangle
- white pill chip
- gray uppercase pill (search)
- mustard-filled rectangle (footer Subscribe, "Read the book")
- `--ink-muted` fill, which reads as disabled (`/subscribe`)

`/family` alone has three pull-quote styles, and one of them pairs a left mustard rule with centered text, so the rule hangs off to the side. The black hero has become the default page header on `/writing`, `/books`, `/resources`, `/theology/history`, the creeds, the context guides, `/help` and `/tools`. Meanwhile `/study`, `/study/bible` and `/family` open on cream, and no rule decides which. *Why it costs:* elite brands are recognized by consistency, and this drift reads as "built by many hands." Used everywhere, the black slab no longer marks weight. *World-class:* a one-page component spec with one eyebrow, three buttons (primary ink, secondary outline, text link) and one quote device. Black is reserved for moments that carry weight: era and doctrine heroes, Find Help, and the closing verdict band. Stripe Press and the GOV.UK design system show that level of restraint.

**Major: every page lacks photography of the life the brand claims.** There is one portrait, from `PORTRAIT_URL` in `client/src/lib/positioning.ts`, a CloudFront file named `IMG_4533_…jpeg`. There are no photographs of the Fenton church, the desk, a PCN gathering or ENDS. *Why it costs:* the positioning is "writes from inside the room where people fall apart," and the About page says the essays were written "around hospital visits and budget meetings." The skeptic trusts what he can see, and photography is the evidence of presence. *World-class:* a small commissioned documentary set in natural light, graded to the palette (warm blacks, cream highlights): the desk, the pulpit seen from the back pew, worn pages, a PCN table. Host it in `client/public`, not on a legacy CDN.

**Minor: the footer has seams and repeats.** On `/writing`, `/books`, `/about`, `/subscribe` and the home page, a strip of cream about 36px tall sits between a dark closing band and the black footer, and it looks like a bug. Home stacks two subscribe forms within one phone screen (the newsletter card, then the footer form), and the footer's mustard-filled Subscribe repeats on every page. *Why it costs:* the copy promises "no filler, no funnel," and two forms in one scroll is a funnel. *World-class:* merge the closing band and the footer into one dark ending, with one subscribe moment per page.

**Minor: the voice has three taglines and no case rule.** The contract says "Connecting the depth of theology to the weight of everyday life." The footer says "Theology that carries the weight of everyday life." The home H1 is a third line. Devotion, tool and essay titles are in Title Case ("When The Lights Go Out", "Strong Enough To Be Gentle"), while hubs use sentence case. *World-class:* one tagline and a one-paragraph house style for capitalization.

**Minor: the tokens invite drift.** `index.css` holds about 30 color tokens behind a seven-color contract. Some aliases lie: `--oxblood` and `--rust` resolve to mustard, `--forest` to black, `--cream` to cream-warm (not cream), and `--plum` to charcoal-soft while `--accent-plum` is a real plum. An eleven-hue "accent ramp" (violet, slate, teal, mauve and others) sits outside the contract; I did not see it on the captured pages. *Why it costs:* the next designer will reach for `--oxblood` expecting red. *World-class:* contract tokens plus a short list of documented semantic tokens, with the lying aliases deleted.

### `/` (home)

**Critical: the first screen is a letter, not a door.** The phone's first screen is a black slab, a 56px portrait thumbnail, and two paragraphs of 18px Inter on black. Its only link is "About James." Nothing shows that this is a place to study: no Study Bible, no tools, no history. On desktop the portrait is a 168 by 210 box at top left and the right third of the 1440 frame is empty. The H1 is broken twice by em-dashes. The first paragraph reappears word for word as the hero of `/about`. *Why it costs:* the brief is the first three seconds, and right now the reader opens the book to the preface. The skeptic sees a wall of text and a small gray square. *World-class:* show the man and the product at real scale. James's photograph at portrait scale, in a real room, sits beside a live specimen of the site: today's chapter open, the canon map, or Tonight at the table. The H1 runs at the contract's 7rem, without the dashes. Plough's home page leads with art at full bleed; BibleProject's leads with its drawn world.

**Major: "The books" band looks like placeholders.** One loud Americana cover sits beside two near-empty black template covers that disappear at thumbnail size. On phone, Believe's subtitle floats far below its title. See `/books`.

### `/study`

**Major: hubs are typeset sitemaps.** `/study`, `/resources`, the home "Where to begin" rows and the About "Reach James" block all use the same layout: a Cormorant title on the left and a list of arrow links on the right. With the headings hidden, `/study` and `/resources` are interchangeable. *Why it costs:* the five doors should feel like rooms, and a reader cannot tell at a glance which one they are in. *World-class:* give each hub its own lead object. `/study` opens on the canon map and a thin strip of the church-history timeline. `/resources` opens on a shelf of real printables with thumbnails of the PDFs. `/family` opens on the table. Criterion's site keeps one system while each section leads with its own object.

### `/study/bible`

**Critical: the core product's index is a directory listing.** It shows 66 identical white cards across 15.4 phone screens. Book names are Inter bold, while every other title on the site is Cormorant. The chapter count is tiny gray text in the corner. Descriptions start at different heights from card to card. Rows end in orphans: Deuteronomy, Song of Solomon, Malachi and Acts each sit alone. The four "start here" cards above are the same white box again. *Why it costs:* the page promises "Learn the whole Bible," and the first thing a learner needs is the Bible's shape: Psalms at 150 chapters, Obadiah at one, law, history, poetry, prophets, gospels, letters. The page has every number it needs (the chapter counts, the seven divisions, the eleven acts) and draws none of it. *World-class:* make a canon map the hero. Draw 66 bars with width proportional to chapter count, grouped in the seven divisions and tinted by act, and let saved reading fill them in. A tap opens the book. Chris Harrison and Christoph Römhild's 2007 cross-reference arc chart proved the canon itself can be one of the most striking images on the web. BibleProject's book posters show what each book page could open with. On phone, use a compact vertical version.

### `/study/bible/john/1`

**Major: Scripture is set in the UI sans (see site-wide), and the notes are 14 identical accordion rows.** "This chapter at a glance" is the best object on the page, but it ends a third of the way down. After it, the right column stays empty for about 5,000px while the notes collapse into a stack of plus signs. *World-class:* keep the glance panel sticky, and use the margin for the selected verse's note, Greek word and cross-references, Tufte-style. Set the text in the Scripture serif.

### `/writing`

**Minor: the list is clean, but it has no imagery.** Five sections with no glyph or image read as one long table of contents, and the numbered "Start with these" uses tiny mustard old-style figures that read as decoration. *World-class:* a small house-style glyph for each of the five sections (the mirror, the flag and cross, the ruined column, the ancient lamp, the open scroll), drawn once and reused wherever an essay from that section appears.

### `/writing/strongman-theology`

**Major: utilities come before the essay.** On the phone's first screen, the back link, kicker, title, dek, rule and byline are followed by Send to my phone (solid black, the heaviest element on the page), Save, Print, Listen, A−, A+, Focus, and a collapsed "In this essay." The first sentence starts near the bottom of the screen. The same row returns at the end. *Why it costs:* "Unhurried" breaks when the heaviest visual weight on the page is a phone-sync button. *World-class:* title, dek and byline, then the first sentence. The tools sit in a quiet rail, or behind a single control that appears once the reader starts. Aeon and The Atlantic both get out of the way.

**Minor: the end of the essay stacks seams.** In order, the essay ends with a mustard-filled "Read the book" band (the red, white and blue cover in a black band), a full-width cream-warm band holding one link ("Find help for what you are facing"), a keep-reading list with mustard rules, a newsletter card and an author card. In the capture the author card's text is indented about 120px past a blank gutter where a portrait would sit. Verify production shows the photo there.

### `/theology/history` and `/theology/history/the-apostolic-age`

**Major: two thousand years are told as text.** The 22 era essays appear as a two-column text list. They are two series, of 14 and 8 essays, with overlapping names and dates ("The Reformation" and "The Reformation and Its Wars"). The timeline is an accordion of seven white cards, each with a mustard top rule. The apostolic-age essay names Antioch, Corinth, Rome and Ephesus and shows no map. On desktop the text column hugs the left, and about 40% of the 1440 frame stays empty for 6,000px. *Why it costs:* church history is a named pillar and the most visual subject on the site, because time and place are the content. *World-class:* a proportional time river across the page, with eras as bands, councils as marks and people as lifelines, in the tradition of John B. Sparks's Histomap (Rand McNally, 1931). Each era essay opens with a line map in the house style and uses the right margin for dates, key figures and sources as sidenotes. Either merge the two era series or give them visibly different roles.

### `/resources/context/honor-shame-vs-guilt` and `/resources/creeds/nicene-creed`

**Major: there are two long-form templates, and neither uses the margin.** Essays use a centered column. History and context guides are flush-left with an empty right margin. The honor-shame guide explains "Three Ways a Conscience Gets Wired" (guilt and innocence, honor and shame, fear and power) without the triangle diagram the paragraph is begging for. On the creed page, ten phrase notes each carry their own mustard left rule, so the mustard stacks into a ladder, and the notes sit below the text instead of beside the phrase they explain. *World-class:* one long-form template with a working margin for sidenotes, key texts and figures, plus inline figures drawn in the house line (Tufte's books, Gwern.net). On the creed, the notes hang in the margin beside their phrase, the way a pastor's pencil would. That marginal note could become the brand's visual signature across the Study Bible, creeds and essays.

### `/books`

**Major: three covers in two dialects.** The *When God Bless America* cover is loud red, white and blue in condensed sans. *The Monster in the Mirror* and *Believe* share a house template: black, a mustard keyline, a heavier serif that is not Cormorant, and about 60% empty black. Believe's cover subtitle ("The Evidence for God, the Reliability of the Bible, and the Case That Jesus Rose from the Dead") does not match the site's ("The Rational Case for Christian Faith"). The phone's first screen of `/books` shows no book. *Why it costs:* these are the only images on the site and the one thing for sale, and the set does not look like one author's shelf. *World-class:* series design, like David Pearson's typographic covers for Penguin Great Ideas or the Everyman's Library spines. Use one grid and one type system, with each title given its own mark and its own tone within the palette. If the Americana cover is a deliberate visual argument (the flag as the false gospel), frame it inside the series system so the argument reads as intentional. Bring a cover onto the first phone screen.

### `/resources`

**Minor: same hub template as `/study` (see above).** The one card that breaks the pattern is "Put LiveWell on your home screen," a white box with a mustard rule, and it is the least important thing on the page. *World-class:* lead with the printables as objects, using real thumbnails of the PDFs.

### `/tools`

**Major: it reads as a SaaS template.** It has a centered hero (only `/subscribe` shares the treatment), a Title Case H1, and the word "Actually" in mustard italic. The 36 identical white cards each end in "Open the tool →". Their left rules cycle among three colors (`--mustard`, `--goldlt`, `--ink`, set per tool in `TOOLS`) that encode nothing. The icons are stock, and the section labels are Cormorant spaced capitals between double rules, a style used nowhere else. It runs 12.5 phone screens. *Why it costs:* the tools are the interactive layer James wants people drawn to, and the hub makes them look like a plugin directory. Color that means nothing trains readers to ignore color. *World-class:* show each tool by its output, as a small specimen in the house line. Which Lens shows its five lenses, Test the Case its five-move ladder, Scripture Memory a first-letter line. Feature three or four large and list the rest compactly. Apple's app pages show the thing, not an icon. Stripe's custom icon family shows that an icon set can be ownable.

### `/tools/test-the-case`, `/tools/which-lens`, `/tools/deep-bible`

**Minor: the tools have no visual progress or identity.** Which Lens is quiet and adult (keep it), but it never shows the five lenses it names, and progress is only the text "1 OF 13." The case chips in Test the Case wrap in a ragged cluster, and the five moves have no ladder. Deep Bible calls itself "FLAGSHIP TOOL" while the Study Bible is the real flagship. It lists its 20 books in a different visual dialect (Cormorant names, white cards) and in non-canonical order (Genesis, Psalms, Exodus, Proverbs). *World-class:* a thin progress line in ink with the current step marked in mustard, a glyph per lens, and the canon map reused with the 20 books highlighted.

### `/family`, `/family/tonight`, `/family/devotions`

**Major: the warmest section is the coldest page.** There is no image of a table, a candle or a child. On desktop, "Tonight at the table" is a full-width white card that is mostly empty. The 72 devotions are a Title Case list across 12.5 phone screens. *Why it costs:* families with children come for warmth and picture. The brief says "not warm in the coffee-shop sense"; it does not say cold. *World-class:* one line drawing per devotion theme in the house style (the towel and basin, the empty seat, the anchor), so the tonight card leads with its drawing and the library becomes a wall of small pictures. Jago's illustrations for *The Jesus Storybook Bible* show illustration carrying a family product without becoming cute.

### `/help` and `/help/anxiety`

**Minor: little here needs fixing.** The crisis panel is calm, dated and plain, and it should stay that way. The one note is on phone: the floating "Exit site" pill covers body text on the anxiety page.

### `/about`

**Major: see site-wide photography.** The page is the strongest piece of writing on the site and the only one with a person in it, and that person is one frame.

### `/subscribe`

**Minor: mustard is used as paint in display type, and the button looks disabled.** "once" is set in mustard italic inside the H1 (as "Actually" is on `/tools`). The form's Subscribe button is filled with `--ink-muted` and reads as disabled. *World-class:* let italic carry the emphasis in ink, with mustard only on the rule beneath it. Make the button the primary ink button.

### `/search?q=grace`

**Major: the page is off-system and breaks the mustard rule.** Bright `--gold` (#D4A017) is used as text on cream for BACK, "ACROSS THE SITE" and every result kicker. The active "ALL" filter is a solid mustard pill with cream (`--bone`) text, about 2:1 contrast. The other filters are gray uppercase pills. Cards use `rounded-lg` (8px) where the token radius is 2px. On the phone's first screen I count six mustard text elements plus a filled mustard pill (`client/src/pages/Search.tsx`, lines 205, 253 to 258, 293 and 316 onward). *Why it costs:* it breaks the contract's punctuation rule and fails contrast, and search is the utility people return to. *World-class:* the same quiet list as `/writing`: kickers in `--mustard-text`, Cormorant titles, hairline separators, square corners, and the active filter marked with an ink underline.

### `/writing/the-rise-of-the-nones` (the notice 43 of 58 shelf URLs answer with)

**Minor: the notice looks like an error page.** *World-class:* a "being rewritten" treatment in the house style. Give it a dated note, the old title set quietly, and the same links, so revision reads as part of the brand's honesty rather than a missing page.

## What to keep

- **The palette discipline.** Cream is the room, black carries weight, and mustard mostly appears as a one-pixel rule, a link underline or a short rule under a dek. Small text on cream uses `--mustard-text` (#7A6010), and bright mustard is saved for dark grounds. That legibility adaptation is smart; keep it and enforce it on `/search`.
- **Cormorant display at size.** The essay title, "Three books. Every word mine.", "The story you were born into." and "Which lens has you?" are sentence-case headlines ending on hard periods, and they carry the voice. This is the brand's best visual asset.
- **The essay header** (a centered title, a Cormorant italic dek, a short mustard rule and a quiet byline) and the Cormorant drop cap.
- **Restraint in form.** Corners are square at 2px, hairlines replace shadows, and there are no gradients and no stock photography. Build the new visual language on this foundation, not over it.
- **The black verdict bands.** "You did not start the faith. You were handed it." on the history page and the About page's closing ("You may still be deciding whether to trust the voice.") work as a rare device. They are strong because they are rare; keep them that way.
- **The `/help` crisis panel and Exit site.** They are plain, calm and dated ("Numbers checked September 29, 2026").
- **Which Lens's one question per screen** with Cormorant answer cards, and Test the Case's "What this move does not settle" note with its mustard rule.
- **The Study Bible's "This chapter at a glance" panel**, with mustard verse ranges.
- **The creed page's sequence**: history, then the text on a warm band, then phrase-by-phrase notes. Keep the sequence and move the notes to the margin.
- **The hairline covenant drawing** in `client/public/article-art/covenant.svg`: the seed of the signature language.
- **Self-hosted fonts and `:root` tokens.** The plumbing for a disciplined system is already in place.
- **The desktop header's five doors**, with Find Help in `--mustard-text` as the only colored item. It is quiet and clear.
