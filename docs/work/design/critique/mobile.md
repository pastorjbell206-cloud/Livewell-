# Mobile and accessibility critique: LiveWell on a phone

Lens: thumbs-first layout, tap targets, the first screen at 390 x 844, how fast it feels, contrast, focus order, motion, reading at night, and what breaks or wastes the phone screen. The bar is set by the Bible apps people already keep on their phones (YouVersion, the ESV app), by Apple Books and Kindle for reading, by GOV.UK and the NHS for accessible public pages, and by Brilliant and Duolingo for interaction on a small screen.

Evidence and method. I looked at every `-phone-first.png` and at every phone full-page shot, sliced into 844px screens so nothing was judged from a thumbnail. I sampled rendered text and background colors from the PNGs and computed WCAG contrast. I read the code behind each thing I saw (`client/src/index.css`, `App.tsx`, `components/MinimalNav.tsx`, `pages/StudyBible.tsx`, `pages/history/HistoryEssay.tsx`, `components/TakeItWithYou.tsx`, `vite.config.ts`, `vercel.json`, `.github/workflows/ci.yml`). Where a state was not photographed (the verse panel open, tap-target sizes, the time between a tap and a new page) I ran headless Chromium at 390 x 844 with touch against the local production build in `dist/public` (built 2026-10-27 15:34, close to the inventory's a2a2ad6e), with the API stubbed to null as in the inventory. Those timings were taken on a local server with no CDN and no prerender, under emulated slow 4G (150 ms round trip, 1.6 Mbps) and a 4x slowed CPU; read them as relative, not as production numbers.

## Verdict

On a phone, LiveWell reads well and works badly. The reading surface is right: 18px Inter at a 1.7 to 1.85 line height, about forty characters to the line, ink on cream above 15:1, header controls at 44px, Find Help one tap from every screen, motion that is nearly absent and fully off for anyone who asks, and a home page that measured 95 to 96 on mobile Lighthouse in the U08 runs (83 in one CI run). But every page is built as a long document to scroll top to bottom, and the phone is treated as a narrow desktop. There is no night reading at all (dark mode is switched off for every visitor, though the dark palette is written), on the very pages people open in the dark: the anxiety page, the bedtime devotion, the Bible in bed. The flagship Study Bible lacks what every Bible app on the same phone has: verse 1 is not on the first screen, the only chapter controls scroll away at the top, the verse study sheet takes 72% of the screen without taking focus, and the book list is thirteen screens of cards. Essays spend their first screen on buttons. The interactive tools put the interaction two or three screens down. Raw mustard is used as text on cream at 2.09:1 across the search page, and no gate checks any page but the home page. The Bible and the care pages are not kept for offline reading, so the installed app fails exactly where a phone loses signal. Nothing anywhere sits within reach of the thumb at the bottom of the screen. The fixes are not a redesign of the look; they are a reading shell (night mode, Aa, a bottom bar that hides while you read), first screens that begin with the thing itself, real sheets and dialogs, and one contrast rule enforced in CI.

## Findings

### Critical

**1. Site-wide, felt most on `/help/anxiety`, `/family/tonight` and `/study/bible/john/1`: there is no way to read at night.**

What is wrong. Dark mode is off for everyone. `client/src/App.tsx` lines 707 to 717 mount `<ThemeProvider defaultTheme="light">` without `switchable`, and the comment says why: "many section heroes mix theme-flipping tokens (--ink / --bone) with non-flipping ones (--charcoal / --charcoal-fg), so under html.dark their text renders invisible." The dark palette in `index.css` (`html.dark`, lines 147 to 177) is written and unused, the footer toggle is hidden, and `prefers-color-scheme` is never read. Worse, `client/index.html` lines 52 and 53 tell a dark-mode phone to paint the browser chrome `#1A1A1A`, so on those phones a charcoal status area sits on top of a cream header, a visible seam on every page. Scrolling also strobes: home, `/books`, `/family` and `/theology/history` alternate full-bleed charcoal and cream bands, so the screen jumps from near-black to bright paper several times a page (`home-phone.png`, `family-phone.png`).

Why it costs the reader. The pages that matter most are read in the dark. The anxiety page's own question list asks "Why is my anxiety worse at night?", and its first paragraph tells the reader to write the worries down before bed. Tonight is a bedtime devotion. The Bible on a phone is read in bed. At two in the morning this site puts about 90% of the screen at `#F5F0E6` into dark-adapted eyes. The emotional brief is "a quiet room where the light is good"; at the hour the most fragile readers arrive, the light is wrong.

World-class version. Apple Books, Kindle, the ESV app and YouVersion follow the system theme and offer a reading surface (paper, sepia, night) inside the Aa menu. Finish the hero audit the App.tsx comment already names (every charcoal hero takes `--charcoal-fg`, never `--bone`), add a render test that mounts each hero under `html.dark` and checks contrast, then follow `prefers-color-scheme` by default and put Light, Dark and Auto beside the existing A− and A+ in the Text size control. In dark mode, let every section sit in one low band (charcoal and a lifted charcoal), not black and cream, and make the `theme-color` follow the theme actually shown.

**2. `/study/bible/john/1` and every chapter on a phone: the Bible is laid out as a document to scroll, not a text to read.**

What is wrong. The first screen (`study-bible-john-1-phone-first.png`) holds the header, a kicker, "John 1", the Reading and Greek toggle, two chapter arrows, the Go-to field, an act label, a two-line heading and an eleven-line summary. Verse 1 starts about 980px down, on the second screen. The only chapter controls are those two 40px circles at the top; once you scroll, they are gone. "Next in the story: John 2" and "Mark John 1 as read" sit on screen 12 of 13, below thirteen note accordions and the related cards. The hint "Tap a verse number to study the verse" is printed after verse 51, after the reader needed it. The chapter outline renders only in the desktop aside (`wide` only, `StudyBible.tsx` lines 562 to 566), so the phone gets 51 verses with no section headings (the product critique's first finding covers the outline itself).

Why it costs the reader. Reading the Bible is moving from chapter to chapter. On this phone layout every chapter ends with a choice between scrolling all the way back up to find a 40px arrow and scrolling seven screens of notes to find the "next" link. People who read a chapter a day will feel that every day, and they already have an app that does not make them.

World-class version. YouVersion and the ESV app: the text is the first thing on screen; a slim bar at the bottom (previous, "John 1" which opens a book and chapter picker, next, Aa, audio) hides while you read down and returns on a small upward scroll or a tap. Do that here: the summary collapses to two lines with "More", verse 1 lands on the first screen, an auto-hiding bottom bar carries previous and next chapter, the chapter picker sheet, Reading or Greek, and Aa. At the last verse, before the notes, put a full-width "John 2" button; the notes stay below for whoever wants them. Show the verse-number hint once, above verse 1, and stop showing it after the first tap.

**3. `/search`, and every cream surface that uses raw mustard for text: contrast fails WCAG AA, and nothing in CI would catch it.**

What is wrong. Sampled from `search-q-grace-phone-first.png`: every result kicker ("WHAT THE BIBLE SAYS", "READING SCRIPTURE IN CONTEXT"), "BACK", "ACROSS THE SITE" and the "See all in ..." links are `#D4A017` on `#F5F0E6`, 2.09:1; AA needs 4.5:1. The active "ALL" filter is cream text on a mustard fill, also 2.09:1. `/tools/deep-bible`'s "OLD TESTAMENT" and "NEW TESTAMENT" labels measure the same. On `/family/devotions` ("Weekly · 72") and `/theology/history` ("The timeline · 7") the selected tab is told apart mainly by a mustard border on cream, 2.09:1, under the 3:1 that WCAG 1.4.11 asks of a control's state. The passing token already exists: `--mustard-text` (`#7A6010`) is 5.27:1 on cream and 5.99:1 on white. In the code, `color: "var(--mustard)"` or `"var(--gold)"` appears 467 times across `pages/` and `components/`; on charcoal that is 7.33:1 and fine, on cream it fails, and nothing tells the two apart. CI runs Lighthouse and axe on `/` only, and the job is `continue-on-error: true` (`.github/workflows/ci.yml` lines 78 to 141).

Why it costs the reader. Search is the door to everything, and the labels that say what kind of thing each result is are the ones that cannot be read in sunlight or by older eyes, which is a large share of the pastors, parents and grandparents this site serves. It is also a plain AA failure on a core page.

World-class version. The GOV.UK design system names colors by role, text or fill, and its tooling stops a fill color being used as text. Make `--mustard` a fill-and-rule token only and `--mustard-text` the only mustard for text on light surfaces; give selected chips a state that is not color alone (an ink fill with cream text, as Test the Case's case buttons already do); teach `scripts/validate-design.mjs` to flag mustard used as a text color on bone or card surfaces; and run axe, blocking, on the 25 routes in the inventory, not just the home page.

### Major

**4. `/writing/strongman-theology` and every essay: the first phone screen is buttons, and the end is five more screens of them.**

What is wrong. In `writing-strongman-theology-phone-first.png` the first word of the essay arrives at about 770px; two lines show. Above it: a back link, a two-line kicker, the title, a four-line italic dek, the byline, then "Send to my phone" as a filled black button (the heaviest thing on the screen), Save, and Print orphaned on its own centered row, a rule, a second toolbar (Listen, A−, A+, Focus), and "In this essay". After the last sentence (about 13,000px down) come another 4,400px: Send, Save, Print, Cite this, Send to..., a book promotion, a help link, four more essays, a newsletter card, an author card, "James also writes elsewhere", "All essays", and the 1,350px footer with a second newsletter form. On a touch screen "Send to my phone" opens the share sheet (`TakeItWithYou.tsx`, `pointer: coarse`) but keeps its label, so the primary button on the phone you are holding tells you to send the page to the phone you are holding.

Why it costs the reader. The first screen is where a reader decides whether this is worth eleven minutes. This one shows them a control panel. At the end, the one good next step is buried among nine.

World-class version. The New York Times and the Substack app put title, dek, byline and the opening paragraph on one phone screen, with one compact Aa control and sharing in a bar that appears when you scroll up. Here: one row under the byline (Listen, Aa, Save, Share, with "Share" as the label on touch devices); drop Print on phones, where the share sheet already prints; "In this essay" as a small link that opens a sheet. At the end: one next essay, one newsletter ask, and a collapsed footer.

**5. `/study/bible/john/1`, the verse study sheet: it covers most of the screen and leaves focus behind.**

What is wrong. Measured at 390 x 844: tapping verse 14's number opens a fixed `<aside>` from y=236 to the bottom of the screen, 608px of 844, or 72%. `document.activeElement` stays on the "Study verse 14" button, now under the sheet. The sheet is not a dialog: no `role="dialog"`, no `aria-modal`, no Escape, no focus move (`StudyBible.tsx` lines 570 to 574). It has no grabber and no swipe to close, its close button is 36px, and there is no previous or next verse inside it, so studying 1:14 and then 1:15 means close, scroll, find a 24px number, tap. To its credit the sheet quotes the verse at its top, so the covered text is not lost (`verse-panel` capture).

Why it costs the reader. This is the central study gesture on a phone. A screen reader user is not told that anything opened; a keyboard user tabs on through the hidden page; a sighted reader loses the paragraph they were in.

World-class version. An iOS-style sheet with detents, as in Apple Maps and YouVersion's verse sheet: it opens at about 40% with the chosen verse kept in view above it, drags up to full height, swipes down to close, moves focus to its heading on open and back to the verse on close, and steps verse by verse with previous and next. Add Escape and a 44px close.

**6. `/study/bible`: 66 book cards make a thirteen-screen list.**

What is wrong. Each book is a card with a three-to-five-line description, stacked one per row (`study-bible-phone.png`, 12,956px). Obadiah is about seven screens down, Revelation about thirteen. The Go-to field on the first screen serves readers who know a reference; everyone else scrolls.

Why it costs the reader. Picking a book is the most repeated action in a Bible, and here it is the slowest one. The descriptions are good writing in the wrong place.

World-class version. The YouVersion and ESV app pickers: Old and New Testament as a segmented control, the 66 books as compact buttons in a grid, a tap opens the chapter grid. Use a compact list grouped by Law, History, Poetry, Prophets, Gospels and Acts, Letters, Revelation with 44px rows, open the book's chapter grid (which already exists on `/study/bible/<book>` with 48px cells), and keep the descriptions on the book page. The page becomes about three screens.

**7. `/tools/test-the-case`, `/tools`, `/resources/creeds/nicene-creed`: you scroll before you can do or read the thing.**

What is wrong. On Test the Case, "Move 1 of 5" begins about 2,160px down, on the third screen, after a ten-line intro in a charcoal hero and ten case buttons stacked one per row at ragged widths. On `/tools` no tool is on the first screen (hero, Find field, My Library row, one chip); the cards are 294px wide on a 390px screen because the section's 32px padding stacks on `.wrap`'s 16px; every description is cut mid-sentence ("push back wit..."); the 36 cards run about 12.5 screens. On the Nicene Creed the creed itself begins about 2,100px down, after two and a half screens of history.

Why it costs the reader. James asked for things that draw attention. On a phone, what draws attention is a question on the first screen that a thumb can answer. Which Lens Has You? does exactly that (question 1 and both answers are on its first screen); Test the Case, the stronger tool, does not.

World-class version. Brilliant and Duolingo open on the first move; the topic switcher is a chip row or a menu. Sefaria and the Book of Common Prayer apps put the text first and the commentary after. Test the Case: a one-line intro, the current case as a title with "Change case" opening a sheet, Move 1 on the first screen. Tools: a 20px gutter, full one-line descriptions, a sticky chip row for the five groups. The Creed: "The text" first, or a "Read the creed" link in the hero that jumps to it.

**8. `/help` and every care page, context guides, verse numbers: the most important targets are among the smallest.**

What is wrong. Measured at 390 x 844: in the crisis banner at the top of `/help` (and the same banner on every care page) "988" is a 27 x 17px target, "911" 21 x 17px, "HOME to 741741" 107 x 17px. The full-size Call and Text buttons, 46px pills and excellent, are two screens down behind "More lines below". On context guides the inline Scripture links (Luke 14, Hebrews 12:2, 1 Peter 2:4-10) are 21px tall; on `/family/devotions` the A4 print link is 21 x 19px; on the pending-essay notice all four links are 22px tall. Study Bible verse numbers are exactly 24 x 24px: the WCAG 2.5.8 minimum, about half of Apple's 44pt, set inside running text where a miss selects the neighbor.

Why it costs the reader. A person in crisis with shaking hands should not have to hit a 21-pixel "911". A reader who mis-taps a verse number twice stops tapping verse numbers.

World-class version. The 988 Lifeline site and NHS 111 put the number in a full-width button at the top. Make the banner three 44px buttons in one row on the first screen ("Call 988", "Text 741741", "Call 911"); give inline references vertical padding with a matching negative margin so the hit area is 44px without changing the line spacing; give verse numbers a 40px hit area through a pseudo-element, keeping the glyph small.

**9. Search and sign-up fields remove the focus ring inline; the overlays are not dialogs.**

What is wrong. The global focus style is good: a 2px ink outline with a 5px cream halo that shows on both cream and charcoal (`index.css` line 250). But 37 inline `outline: "none"` declarations in 29 public files override it, because an inline style outranks a stylesheet rule. "Search the essays" (`pages/Writing.tsx` line 414) has no other focus style, nor do "Search the guides" (`ContextLibrary.tsx`), the Verse Finder, the newsletter forms, the header search input, the share panel and several self-checks. The search overlay in `MinimalNav.tsx` has no `role="dialog"`, no `aria-modal` and no focus containment, and its close is a bare "×" glyph with no minimum size. The study sheet is covered in finding 5.

Why it costs the reader. An iPad with a keyboard, switch control, or an external keyboard on a phone all depend on seeing where focus is, and they lose it on exactly the fields they came to use.

World-class version. GOV.UK gives every input a thick, high-contrast focus state and every overlay dialog semantics. Delete the inline `outline: none` (or move it into a class that restores a `:focus-visible` box-shadow), give the search overlay and the study sheet dialog roles with focus moved in and returned on close, and make the close 44px.

**10. Inputs under 16px make iOS zoom the page.**

What is wrong. 31 input and textarea fields in public pages are set below 16px: "Search the guides" (`ContextLibrary.tsx`, 14px), `Library.tsx` (14px), the Deep Bible filter (14.4px), the Wisdom Finder (15px), the Quote Library (13.6px), Parenting Verses (14px), the sample-chapter form and Membership (14px), and the leadership tools (13 to 15px). iOS Safari zooms any field under 16px when it takes focus and leaves the page zoomed in and panned sideways when the keyboard closes.

Why it costs the reader. These are the interactive tools James wants used. The first tap on each one throws the layout out of the screen.

World-class version. Every serious mobile form sets 16px or larger. One rule at phone widths (`input, textarea, select { font-size: max(16px, 1em) }`) and a test that fails on a smaller inline size.

**11. Offline: the flagship and the care pages are not kept.**

What is wrong. `vite.config.ts` caches leadership, context, life and family JSON for offline reading (stale-while-revalidate, 30 days), but not `/bible/` (chapter text and notes), `/needs/` (the care pages), `/history/`, `/creeds/`, `/plans/` or `/studyguides/`. Those files are served with `max-age=300` (`vercel.json`). `/resources` even teaches readers to put LiveWell on the home screen; the installed app then cannot open John 1 or "I can't stop worrying" in a tunnel, a hospital basement or on a plane.

Why it costs the reader. A phone loses signal in precisely the rooms where people sit with grief and fear, and where pastors visit them.

World-class version. YouVersion, the ESV app and Kindle keep what you have opened. Add those paths to the runtime rule, precache the help index and the crisis-line data, and mark saved items in My Library as available offline.

**12. History essays, creeds and context guides: the kicker breaks into two columns on the first screen.**

What is wrong. `.eyebrow` is `display: inline-flex` (`index.css` line 876). When a kicker holds a link and then text (`HistoryEssay.tsx` lines 46 to 49: "Church History" plus " · The Apostolic Age · c. AD 30-150") the two become flex items that wrap side by side: "CHURCH / HISTORY" in one column and "· THE APOSTOLIC AGE · / C. AD 30-150" in another (`theology-history-the-apostolic-age-phone-first.png`). On the Nicene Creed "· AD 325 / 381" stands as its own column; on the honor-and-shame guide a lone "·" hangs over "CULTURE".

Why it costs the reader. It is the first line of the first screen of every era essay, creed and context guide, and it reads as broken.

World-class version. Let the kicker wrap as text: `display: block` with the rule as an inline-block pseudo-element, or `flex-wrap: wrap` with each separator kept with the words after it.

**13. Taps feel dead for about a second.**

What is wrong. Navigation runs inside `startTransition` (`App.tsx` lines 686 to 697), so the old page stays on screen while the next chunk and its JSON load, with no pending state anywhere. Measured locally under emulated slow 4G and a 4x CPU: "Open the Study Bible" changed the URL at 0.2 seconds and painted the new page at 1.07; the next-chapter arrow showed John 2's verses at 0.9; a cold load of John 1 showed verse 1 at 3.8. In that second nothing on screen acknowledges the tap.

Why it costs the reader. People tap again, or decide the site is slow, when it is mostly just silent.

World-class version. YouTube and GitHub show a thin top bar once a navigation passes about 150ms; native apps give every tappable thing a pressed state; Bible apps fetch the next chapter before you ask. Show a 2px mustard bar under the header while `useTransition` is pending, add `:active` states to cards and links, fetch the next chapter's JSON when the reader passes the last verse, and fetch route chunks on `touchstart`.

**14. Long reading pages without the reader's own tools.**

What is wrong. Essays have Listen, A− and A+, Focus and a progress bar. The 22 church-history essays (13 phone screens each), the context guides (12), the creeds, the care pages (`/help/anxiety` is 38 screens) and Study Bible chapters have none of them; `TextSize` is imported only by `ArticleDetail`, `SermonSeries`, `BookReader` and `Downloads`. The history essay also ends with two back links ("All of Church History", then "Church History") and no "Next: The Age of the Martyrs" (`HistoryEssay.tsx` lines 89 to 99), in a 22-part series.

Why it costs the reader. A reader who needs larger type on the anxiety page, or wants to listen to the Apostolic Age on a walk, cannot, and a series without a next link is 22 separate pages.

World-class version. Kindle and Apple Books have one Aa menu that works the same in every book. Build one reader control (Listen, Aa with size and theme, progress) and put it on every long page; add previous and next within every series.

**15. `/help/anxiety`, `/theology/history`, `/family`, `/help`, `/family/devotions`, and the footer: one long column with no way to jump.**

What is wrong. `/help/anxiety` runs 38 phone screens; `/theology/history` 18.4, with the interactive timeline starting on the eighth; `/family` 14; `/help` 14.4, where the twelve chips in the hero are repeated as 36 cards below; `/family/devotions` 12.5, 72 rows and no way to jump. Every page then adds a footer of 35 links and a second newsletter form, about 1,350px, 1.6 screens. The anxiety page's jump chips sit in the hero and scroll away; past the first screen there is no path back to the crisis lines except scrolling (Exit site stays on screen; the lines do not).

Why it costs the reader. On a phone, length without wayfinding feels like being lost. On a care page it means the help is always behind you.

World-class version. NHS condition pages keep an "On this page" list reachable; iOS Settings has an index. Make the hero's jump chips a sticky row that appears on an upward scroll, with "Help now" as its first chip on care pages; let `/family/devotions` jump by season and theme; on phones fold the footer's five groups into disclosures (about 400px) and keep one newsletter form per page.

**16. `/` (home): the first phone screen is a biography, not a door.**

What is wrong. `home-phone-first.png`: a 56 x 70 portrait, a four-line H1 with one line starting on a dash ("— in post-Christian"), and two paragraphs. One tap target, "About James", at 87 x 20px. No Go-to-passage field, no Study Bible, no Tonight, no Continue reading; the three doors begin on the second screen. The portrait is a camera original (`IMG_4533`) loaded from a legacy CloudFront host (`PORTRAIT_URL` in `lib/positioning.ts`) and shown at 56 x 70; the U08 unit (`docs/work/plan/units/U08.md`) moves it into `client/public`, but the photographed build still fetches the original.

Why it costs the reader. For a site that wants to be a study tool, the home screen on a phone should hand the reader something to do with their thumb.

World-class version. YouVersion's Today and Sefaria's home open on the thing to do. Keep one sentence of who and why, then a "John 3:16, or a question" field (the header search already reads passages), then the three doors, then Tonight or Continue. Move the biography to the second screen, keep the dash off the start of a line, and serve the portrait as a sized AVIF or WebP from `client/public` with `srcset`.

### Minor

**17. Header, all reading pages: it never gets out of the way.** The sticky header is 64px plus a rule on every screen, about 8% of 844px and closer to 10% with Safari's bars. On essays, chapters, history essays and care pages, hide it on a downward scroll and bring it back on an upward one, as Medium and the NYT do.

**18. Header menu on phone: a top sheet with no scrim.** Every destination sits in the top half of the screen, the hardest reach for one hand, and the page behind is not dimmed (`header-menu-open-phone-first.png`). A bottom sheet would put the five doors under the thumb; at the least, dim the page with the existing `--scrim` token.

**19. Side gutters change from page to page.** 16px on home, Study, Resources and About; 24px on Which Lens and Deep Bible; 32px on essays, the Study Bible and history essays; 48px on Tools. The measure jumps from 358px to 294px as you move between doors. Pick one phone gutter (20px) and make it a token.

**20. Cormorant used below its readable size.** The Tools section labels (about 11px capitals, widely tracked), the "READ 42" and "WORK A STUDY 20" labels on `/family` and `/theology/history`, the Which Lens answers (about 16px), the Deep Bible book titles, the eight-line About lede on charcoal, and the key-figure names on history essays. Cormorant's hairlines thin out below about 20px on a phone and worse on dark. Keep Cormorant at 20px and above; set labels and anything tappable in Inter.

**21. `/family`: the pull-quote has no side gutter.** "The household is the first church a child ever attends." runs to x≈387 of 390 with its mustard rule at x=0; `PullQuote` in `components/EditorialBlocks.tsx` sets `padding: "0.2em 0"`, dropping the prose padding.

**22. `/help`: the free-text placeholder is clipped at the right edge** ("For example: I can't sleep because" loses its last letter at 390px). Shorten it so the example finishes on a phone.

**23. `/subscribe`: the button looks dead and does not say why.** It stays disabled until a persona and an email are both given, drawn ink on ink-muted (2.51:1, 13px), with no message saying what is missing (`components/SegmentedSignup.tsx` lines 298 to 318). Keep it enabled and say "Choose where you are standing" on tap, or label the gap.

**24. Care pages: Exit site sits over the text.** The quick-exit pill (rightly fixed, rightly `location.replace`) covers the end of a line on the first screen of `/help/anxiety`. Reserve bottom padding on care pages, and consider a triple-Escape shortcut as Women's Aid does.

**25. Home and the essay book band: dark covers vanish on charcoal.** The Monster in the Mirror and Believe covers are near-black and disappear on the black band (`home-phone.png`, screen 4). Give them a hairline or a lifted card.

## What to keep

- Find Help is in the phone header on every page, a 44px target in a passing mustard (5.27:1), one tap from anywhere; the crisis banner opens `/help` and every care page; below it the lines are real `tel:` and `sms:` buttons at 46px, with the Spanish and veterans notes and the "if someone checks your phone" safety note. Exit site uses `location.replace`, which is the right call.
- `/help`'s first screen is the best first screen on the site: the crisis line, a field to say it in your own words, and the common needs as 44px chips. Use it as the model for the others.
- `/family` and `/family/tonight` put tonight's devotion, its passage and Start on the first screen, with Listen beside the verse. That is what a phone page should do.
- Which Lens Has You? shows question 1 and both answers on its first screen, as large tappable cards. Keep the pattern; move the answers to Inter.
- The header controls are 44 x 44px; the menu rows are about 48px; the Study group is a disclosure; Escape closes the menu, the dropdowns and search; the page behind the menu is scroll-locked; the menu pads for the home indicator with `env(safe-area-inset-bottom)`.
- The global focus ring (2px ink plus a 5px cream halo) is visible on both cream and charcoal, and there is a skip link. Fix the inline overrides and this is excellent.
- Motion is restrained and honest: one lede rise, no scroll reveals, a global `prefers-reduced-motion` guard, and JS scrolling routed through `lib/motion.ts`.
- The Text size control: 44px buttons, `aria-disabled` at the ends so focus is never dropped, a live announcement, the choice kept on the device, and a plain message when it cannot be kept. Listen (the device's own voice), Focus, and the reading progress bar on essays. Extend these, do not replace them.
- The reading type: 18px Inter at a 1.7 to 1.85 line height, about forty characters to the line on a phone, ink on cream at 15:1 and the muted gray at 6.6:1.
- Performance groundwork: self-hosted, preloaded fonts, the static masthead shell, the admin-only content chunk kept out of public pages, CLS at zero, and mobile Lighthouse at 95 to 96 on the home page in the U08 runs. In-app links land at the top of the new page (checked).
- The Study Bible's Go-to field on the first screen, the Reading and Greek toggle, Greek and Hebrew word buttons at least 44px wide, and the 48px chapter grid on each book page.
- The PWA groundwork: a manifest, a service worker that serves visited pages and family, context and life content offline, and the "Put LiveWell on your home screen" card. Widen what it keeps.
- Inputs that are already right: the newsletter forms, the header search (28px and up), the Go-to field and the Tools Find field are 16px or larger.
