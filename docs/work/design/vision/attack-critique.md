# Attack: does VISION.md fix what CRITIQUE.md found?

Hostile review of `docs/work/design/VISION.md` (2026-10-27, work branch at d9db1e97) against the ten problems in `docs/work/design/CRITIQUE.md` and every finding marked critical in the seven reports in `docs/work/design/critique/`. Read for it: `CLAUDE.md`; `CRITIQUE.md` and all seven critic reports; `MASTER-PLAN.md` sections 0 to 3, 7.2, 9.7 and the 10.6 unit cards; `docs/work/NOTES.md`; VISION in full; the current first-screen PNGs for Home, John 1, church history and search. Every repo fact below was checked in the tree, not taken from a summary.

## The verdict

VISION is a strong design and a weak fix. Its surfaces answer most of the critique on paper: the desk, the verse panel, the long-read template, one search, the skeptic's door, the Line. But it routes almost every critical fix through 26 decisions (P1 to P11, D1 to D15) that land on James in Advent, and for the critical ones the stated default is today's site. Under its own defaults, problems 2, 5 and 9 stand, and problem 6's course never goes live. Where it does build, it makes doctrine more duplicated (problem 2 worse), leaves the reader unable to compare or copy a verse (problem 6), and replaces three history periodizations with a fourth one that overlaps and has no dates for three of its nine Parts (problem 8). It also adds new device-memory displays with no rule keeping sensitive care pages off a shared family screen. One break is fatal, nineteen serious, one minor bundle.

## Scorecard: the ten problems

"Default" is what ships if James does not answer, as VISION itself states the defaults. "With yes" is the vision as designed.

| # | Problem (CRITIQUE severity) | Default | With yes | Left standing or made worse |
|---|---|---|---|---|
| 1 | Study Bible chapter (critical) | Partly fixed (U76 to U78) | Partly fixed | No paragraphs, prologue not in sense-lines (break 4); no compare, copy or bookmark, marks in Phase 4 (break 5) |
| 2 | Same job built 2 to 5 times (critical) | **Standing** (D3: nothing moves) | Partly, Phase 4 (U66) | **Worse for doctrine** (break 2); several duplicates never listed (break 3); the quiz with a forbidden word stays live (break 3) |
| 3 | Site cannot find its own material (critical) | Fixed in design, U85 Feb 12 | Same | Essay references leave the essay for a different wording (break 6); "hand-filed relations" have no file (break 7); new privacy hazard (break 8) |
| 4 | Doors named for what James made (critical) | Partly | Partly | "How to live it" still has no row and loses How-tos (break 9); `/plans` has two parents, tools sit outside Study, no vocabulary (break 10) |
| 5 | Subject and first reader lack a front door (critical) | **Standing** (D9, D2, D5 defaults) | Partly | Phone first screen still mostly addresses believers (break 11); no course for the thesis, `/nation` still menuless (break 12) |
| 6 | A library with no teacher (critical) | **Standing** (D6, D7 have no default) | Partly | Recall never on Home; notes ship without export (break 5) |
| 7 | Reading surface not yet a book (critical) | Mostly fixed (U70 italic, U23/U24) | Fixed | Ending gated on D8 with no default (break 1); old essays have no source data (break 21) |
| 8 | Church history has no shape (critical) | Partly | Partly | Overlapping, undated Parts (break 13); *The short version* on the only modern essays (break 14); confession as chronology (break 15); era essays wait for their Part (break 16); maps promised and forbidden (break 17) |
| 9 | Phone and night work against the reader (critical) | **Standing** for night and offline | Partly | Gates grandfather the failures, axe unscheduled (break 18); night March 12, offline no unit, theme-color seam left (break 19) |
| 10 | No identity, seams show (major) | Partly | Partly | Component spec in no unit, favicon and wordmark untouched, images Phase 4 (break 20) |

## Scorecard: critical findings in the seven reports

| Critic | Critical finding | Status in VISION |
|---|---|---|
| editorial | Long-form in the UI face; fake italics | Fixed (U70 Inter italic regardless; P1 serif on yes) |
| editorial | The ending is drowned | Fixed in design, but gated on D8 with no default (break 1) |
| editorial | John 1 not typeset; notes hidden | Partly: headings yes, paragraphs and sense-lines no (break 4) |
| product | Notes severed from verses | Fixed (U76, U77) |
| product | Reader cannot leave a mark | **Standing** to Phase 4; compare dropped (break 5) |
| product | Parallel tools, different data | **Standing** by default; doctrine worse (breaks 1, 2, 3) |
| product | Search cannot see study content | Fixed in design, Feb 12 |
| ia | C1 doors sort by what James made | Partly; living and formats (break 9) |
| ia | C2 post-Christian has no home | Partly; 301s by default still go to the shelf (breaks 1, 12) |
| ia | C3 one index cannot find doctrine | Fixed in design |
| ia | C4 duplicates | **Standing**/worse (breaks 2, 3) |
| ia | C5 history: three timelines, two series, dead ends | Partly; fourth periodization, mislabel, rails late (breaks 13, 14, 16) |
| mobile | No night reading | **Standing** to March 12, nothing if P6 is no (break 19) |
| mobile | Bible laid out as a document | Fixed (U76 bottom bar, verse 1 on the first screen) |
| mobile | Mustard text fails AA, nothing in CI catches it | Gate added but grandfathers the debt; axe unscheduled (break 18) |
| brand | No signature visual language | Partly; maps excluded, images Phase 4 (breaks 17, 20) |
| brand | Home first screen is a letter, not a door | Fixed only with D9 yes (break 1) |
| brand | `/study/bible` is a directory listing | Fixed (U79, Plate II) |
| learning | C1 catalogue, not a course | Gated on D6 with no default (break 1) |
| learning | C2 best curricula filed as crisis care | Gated on D7 with no default, though 3.5 and 5.2 assume yes (break 1) |
| learning | C3 the thesis has no course | **Standing** (break 12) |
| learning | C4 nothing asks the reader to remember | Partly; ladder Phase 4, recall never on Home (break 5) |
| visitor | The site never answers his question | Partly; topic page defines it, but `/post-christian` still 301s to a one-essay shelf by default (break 1) |
| visitor | Front door speaks to the insider; no skeptic door | Fixed only with D9 yes; insider first screen persists (breaks 1, 11) |
| visitor | Numbers about James disagree | Fixed (D10 default: print no count) |

## The breaks

### 1. The fixes are proposals whose defaults are the site the critique condemned (fatal)

**Claim.** 6.11: "Each ships a default if he does not answer." 10.7 risk 1: "one batch of questions with pictures and defaults."

**Problem.** The defaults for the critical problems are the status quo, and six decisions have no default at all.
- D9's default: "the hero keeps #533 as it is, with only the Find field and the Tonight row added." No skeptic's door, and the atheist sentence stays where the visitor critic found it, about 770px down a 844px screen (`home-phone-first.png`). Critical problem 5 stands. The skeptic's row is navigation copy, not James's #533 prose, yet it rides the same gate.
- D5's default keeps the Line off Home. D2's default leaves `/post-christian` and `/exile` 301ing to `/writing?section=after-christendom`, the one-essay shelf the visitor critic hit first.
- D3's default is "nothing on the never-redirected list moves", and every tool is on that list, so every duplicate in problem 2 stands through 2027, including `/tools/theology-quiz`, which uses a word from the Forbidden Language list (nine matches of it in `api/index.ts`) and scores into the retired taxonomy.
- P6 (Night) has no fallback. Problem 9's night reading stands if he says no.
- D6, D7, D8, D11, D14 and D15 state no default. So Twelve weeks (U91, "live when he has chosen the turns"), the move of the two eight-week plans out of "Help in a hard season" (which 3.5 and 5.2 already draw as done), the essay ending (U23/U24 gated on D8), offline reading and the graded care cards can all stall with no end date.
- Even on yes, Home (U84) lands January 22, after the New Year spike the vision says makes the chapter the most visited page.

Twenty-six questions arrive in Advent to the person 10.7 calls the scarcest resource. Under the defaults, the vision fixes the reading surface and the desk and leaves the skeptic, the duplicates, the course and the night as they are.

**Fix.** Split every gated item into a default that fixes the critique within the contract and a refinement only James can make. Concretely: the skeptic's row and the reader rows ship by default (ask only for their wording); the atheist sentence moves up by default (it is his sentence, unchanged; only the paragraph order changes); re-point the `/post-christian` and `/exile` 301s to `/topics/living-after-christendom` by default (changing a fold's target does not reverse the 2026-10-12 fold); unlist the duplicates from `/tools`, menus and search now (unlisting is not a redirect, so the never-redirected list holds) and fold on his yes; strip the forbidden word from the quiz or unlist it now; the essay ending follows the contract's existing rule ("When a choice trades depth for reach, depth wins"); Twelve weeks launches on LM 5.9's candidate turns tagged *Draft for James*; Night has a contract-safe fallback (break 19). Give every P and D a written default and a date, and move the Home rows to Phase 2.

### 2. Doctrine is made more duplicated, not less (serious)

**Claim.** 1.4 row 29 and 5.6 to 5.8: a doctrine room under Study; `/study/bible/doctrines/:id` and `/theology/doctrine/:slug` "Kept ... re-headed and cross-linked"; "One home for a doctrine is James's call (MASTER-PLAN 11)."

**Problem.** Critique #2 and ia C4 name "two doctrine systems" as a critical duplicate, and critique Q7 names "the second doctrine set" for folding. D3 omits it. Meanwhile the vision adds `/study/doctrine` and 76 `/study/doctrine/q/:n` pages that restate the same 76 questions `/family/catechism` already pages. The learning critic counted doctrine taught in five places (M4); VISION makes it seven, against the critique's thesis of "fewer, truer things."

**Fix.** Put "one page per doctrine" into D3 with a default: the 62 Study Bible studies are canonical, and each of the 31 debate pages becomes the *Where Christians differ* section of its study, URL kept with a canonical tag. Build one page per catechism question from one file and render `/family/catechism` as its *At the table* view, never as a second page set.

### 3. Duplicates the critique named are not in the fold table at all (serious)

**Claim.** 2.7's fold table and section 8's `/tools` rows.

**Problem.** Missing from 2.7: `/wisdom` (Wisdom for All of Life); `/tools/saved` beside My Library; the Family Devotion Builder (a second devotion system quoting the KJV, which breaks rule 21's one translation per surface); the `/assessments` hub and the four instrument names (only Life Audit and the Whole-Life Assessment fold, five self-checks remain under three names). "Three topical verse tools ... One front door each" does not say which survives or what "each" refers to. The quiz's forbidden word stays live under the D3 default (break 1).

**Fix.** A complete fold table covering every page in critique #2's list, each row with its target, unit and default; one instrument name ("Self-check") enforced by the vocabulary check in break 10; `/tools/saved` into My Library; the Builder set to the BSB or retired.

### 4. "Paragraph and poetry lines only once a formatted BSB source has been licensed" (serious)

**Claim.** 4.4: Read depth sets "paragraph and poetry lines only once a formatted BSB source has been licensed and read by `build-bible.mjs` (nothing promises poetry lines before then)."

**Problem.** The Berean Standard Bible is public domain; `scripts/build-bible.mjs` records it as "Public domain." There is nothing to license. As written, critique #1's "paragraphed, ... the prologue in sense-lines" has no unit and no date, and the desk ships headings over unbroken runs of verses. The shards today hold `{v, t}` only (`client/public/bible/text/john/1.json`).

**Fix.** A Phase 1 unit to source a formatted public-domain BSB (paragraph and poetry markers), record its provenance as U07 did, and have `build-bible.mjs` emit paragraph and line flags into the shards. Until it lands, break paragraphs at each outline range, which the data already holds.

### 5. The reader still cannot compare, copy or keep his notes safe (serious)

**Claim.** 4.3's panel rows; 10.6 retires `/study/compare` ("comparison lives on the creed page"); 10.5 puts marks, My Library by book, export and import in U96, Phase 4; 5.28 and risk 12 promise "export from the first note."

**Problem.** Critique #6 and the product critic's critical finding 2 ask for highlight, note, bookmark, copy-verse-with-reference and translation compare in place. The creed page compares 325 with 381, not translations, so compare is simply dropped. Copy-with-reference and bookmarks appear nowhere. And the vision contradicts itself: *Your note* and the answer fields ship in U77 and U78 (December 22, January 8) while Export and Import wait for U96 (March 29 to autumn 2027). A reader who writes from January 1 has nothing protecting his year. Last week's recall question is "Never on Home," though critique Q14 and learning M9 put it on Home's This week.

**Fix.** Export and Import (JSON and Markdown) in U78 with the first field. Copy (verse, reference, translation name) at the panel foot in U77. A Compare row in U77: the BSB beside public-domain texts (KJV, WEB) and, where the ESV's terms allow display, the ESV. Allow one quiet recall line in Home's *Where you are* for a device that has opted into the ladder.

### 6. Essay references leave the essay and land on a different wording (serious)

**Claim.** 5.24: "Every reference is a door to the desk, in link mode because essays quote the ESV and the desk shows the BSB."

**Problem.** Critique #3 asks that every reference open the verse in place, because checking is the trust contract with the skeptic. Link mode takes him out of the argument mid-paragraph to a rendering whose words differ from the ones he was reading. 10.7 risk 8 names this seam, and the design picks the worst of both.

**Fix.** Open essay references in the sheet with the quotation the essay itself verified (already on the page under the same notice), plus "Open in the Study Bible (Berean Standard Bible)" one tap further. Where the essay cites without quoting, show the BSB with its name in the sheet head.

### 7. "Hand-filed relations" are promised and never given a file (serious)

**Claim.** 2.6 ("Nothing is matched by regex") and 2.7 ("The counted *On LiveWell* row and hand-filed relations").

**Problem.** The four joins are keyed by verse (citation index), date (registry), catechism question (doctrine joins) and phrasing (Guide). None files essay to era essay, era essay to essay, family shelf to care page, or Integrated Life guide to subject. The *Connected* block's *Essays*, *For the household* and *To use* groups would therefore fill from shared verses, which is machine matching again. The critique's own example, the strongman essay to the Barmen and Bonhoeffer sections of *The Modern Church and the Global Shift*, is not a verse join.

**Fix.** A fifth committed file of relations (from, to, kind, filed by), hand-filed, with a validator that both ends are live and a per-page cap. The citation index proposes candidates and a person files them, as 4.10 already does for witnesses.

### 8. New device-memory displays can name a sensitive care page on a family phone (serious)

**Claim.** 2.5 ("Recently visited on this device," shown in the empty search field); 3.3 (*Where you are*: "Last opened: John 1 · Continue"); 5.28 (*Ready to look at again*).

**Problem.** These surfaces name what the device opened. On a shared phone, the one Tonight is used on at the table, they can show the pornography-recovery plan, a divorce page or an abuse page. The live U18 code already guards against this: `continueHere()` in `lib/myProgress.ts` labels any plan only "your eight-week plan." The Guide registry carries `sensitivity`, but no rule ties it to these displays, and rule 22 covers URLs and telemetry only.

**Fix.** Extend rule 22: a page or plan marked sensitive is never named on Home, in search's empty state or in *Where you are*; My Library lists it behind a closed disclosure; Clear is one tap on each. Add a test with a seeded sensitive visit across all three surfaces.

### 9. "How to live it" still has no door or row, and the Topics menu still sorts by format (serious)

**Claim.** 2.1's Topics rows; 2.6 item 4 (the Guide is "generated from the 40 care pages, U25's topic rows, the 35 Honest Answers and the nine cases").

**Problem.** Critique #4 says the 69-guide Integrated Life library "appears in no header, footer or hub." VISION adds it to the footer only. The Guide's sources exclude `/life` (69) and `/how-tos` (132), and the vision admits their fit was "not checked." The proposed Topics menu drops today's "How-to guides" and "Downloads and PDFs" rows (`siteNav.ts` lines 86 and 87), so living material becomes harder to reach than now. Five of the nine Topics rows are formats (Honest answers, Test the case, Eight-week plans, Self-checks, Tools), the sorting by format critique #4 condemns.

**Fix.** Make `/life` and `/how-tos` Guide sources with `askedAs` phrasings, so they fill the *Marriage, children and home* and *Work, money, the body and the screen* regions. Name those regions as menu rows; move format rows to the foot as filters.

### 10. Wayfinding still contradicts itself (serious)

**Claim.** 2.1: "the door lights for every page beneath it"; "URLs do not move; the breadcrumb is the map."

**Problem.** `/plans` is filed under two doors (Study's "Courses and plans," Topics' "Eight-week plans"), so 29 plans have two parents and the lit door is undefined. The study instruments stay in Topics, so Study still "sends a studying reader out of Study" (ia M4). Doctrine reaches the menu only in U90 (February 26), though `/study/bible/doctrines` exists today. There is no controlled vocabulary or check: creeds, context guides and help keep several names, and "The Bible in its world" reuses an essay section's name (ia, minor).

**Fix.** One parent per route in `siteNav.ts`, with a test. List the study instruments under Study. Add a Doctrine row now, pointing at `/study/bible/doctrines` until U90. Add a committed label vocabulary with a validator over nav labels, kickers, breadcrumbs and back links.

### 11. Home's phone first screen still speaks to insiders, against the vision's own reasoning (serious)

**Claim.** 3.2 and 3.5; 1.5 rejects the Week's week card because "for the skeptic the home page's center of gravity becomes a devotional practice he does not keep."

**Problem.** On the 390px first screen three of six elements address believers: the headline, the Tonight row and the caption ("The early church knew. So did believers ..."). The first band below the hero is the household week: the table's devotion, the catechism question, the table verse, *For Sunday*. That is the same center of gravity 1.5 rejected. The critique asks the first screen to name its readers; on a phone the reader rows sit in the third band.

**Fix.** On a phone, put *Start where you stand* directly under the hero and above *This week*. Lead *This week* with an adult row (the 2027 day or the week's essay), with the table rows second. Keep Tonight in the hero as the parent's seat requires.

### 12. The subject has a definition but still no course and no menu path to its library (serious)

**Claim.** 5.17 and section 8's `/nation` row ("Reached from the post-Christian topic page as the subject's deeper library").

**Problem.** The topic page now defines the term in its first paragraph (`client/public/topics/living-after-christendom.json`), which is real progress. But learning C3's critical finding, "the site's thesis has no course," stands: Twelve weeks is a church-history course, and no paced, dated sitting path takes a reader through the definition, the arc, exile, the lenses and a rule of life. `/nation` (thirteen pages) stays out of every menu, reachable only from inside one page. The topic page's `use.tools` is empty today, so the post-Christian page shows no instrument.

**Fix.** File the existing `/studyguides/after-christendom` as the thesis course with dated runs (U81) and a row on the topic page and the Study router. List `/nation` in the A to Z, the footer index and the Topics region *What happened to Christian America?*. Fill `use.tools` with Which Lens, the Consistency Check and Test the Case.

### 13. The Parts cannot be the one periodization the Line draws (serious)

**Claim.** 1.4 row 27: "The course's Parts (0 to VIII) everywhere: the Line, era kickers, search ... one periodization replaces three." 3.4: "the Parts as alternating bands."

**Problem.** MASTER-PLAN 7.2's Parts overlap and are partly undated. Part VI, *The American Experiment*, has no years and runs from Roger Williams (1630s) to the Civil War, inside Parts IV and V. Part VIII starts with the Religious Right, inside Part VII and inside the 1950 to 2010 *Attractional Era* essay. The essay *The American Experiment* is dated 1800 to 1950 while the Part of the same name is not. VISION's own prototype brief says "Parts VI to VIII with years to set." Drawn as alternating to-scale bands, this is a fourth periodization beside the essays' two and the timeline's seven, which is exactly critique #8's "the site does not know its own story." The registry also lists a group ("The Anabaptists, from around 1525") among its 36 people, which cannot be a lifeline in 4.9.

**Fix.** Before U75, set contiguous, dated spans for the time axis. Draw Part VI on the *In America* row, not as a band. Start VIII at the era essay's 2010, or fold it into the drawing's "now" stretch. Derive era kickers from the spans, and have `validate-history.mjs` fail overlapping bands and any lifeline that is not a person.

### 14. *The short version* lands on the only essays that cover 1800 to now (serious)

**Claim.** 1.4 row 27 and 5.10: "the eight broad ones marked *The short version*."

**Problem.** The fourteen end with *The Missionary Century* (1792 to 1910) and *The Modern Church and the Global Shift* (1900 to today). *The American Experiment* (1800 to 1950), *The Attractional Era* (1950 to 2010) and *After Christendom* (2010 to present) exist only among the eight. So the pinned *Start where you are standing*, four of the five turns in Home's moment arc and the topic page's arc all open essays labeled as abridgements of essays that do not exist. A skeptic who finds that seam reads it the way the critique says he reads every seam.

**Fix.** Label by role, not by series. Mark as *The short version* only the five of the eight whose ground the fourteen cover. File the last three as the main readings of their Parts. Or adopt the learning critic's split (the eight as the course, the fourteen as *Go deeper*) and say which in D6.

### 15. Confession is still narrated as chronology (serious)

**Claim.** 4.1: "Certainty is drawn: solid where attested, dotted where a date or an end is argued." 2.6: certainty is `exact`, `about`, `range`, `disputed` or `traditional`.

**Problem.** Critique #8 and the visitor critic fault the timeline for setting "Jesus had been crucified, then raised" in the same voice as "70: the fall of Jerusalem," and ask that confession be "marked as confession in one clause." The certainty list has no kind for the church's confession. The resurrection is therefore either drawn solid as an attested date (the conflation the visitor caught) or as "traditional," which falls short of the confessional floor in `CLAUDE.md` ("the bodily resurrection as event, not metaphor"). The timeline data still says Saul "met the risen Christ," and under 1789, "The age of Christendom began its long ending here" (`church-history-timeline.json`), which pre-empts the bracket words D5 reserves for James.

**Fix.** Add a `confessed` kind with its own drawn form and a one-clause label ("the church confesses"), as Test the Case separates what historians grant from what the church confesses. The registry validator flags confession narrated in the plain voice. Remove the 1789 Christendom sentence until D5 is answered.

### 16. The 22 era essays wait for their Part for a Next link (serious)

**Claim.** Section 8's era-essay row: "series rail with *Next*; linked figures and Acts; ... byline and date | U31, U32, U51 on."

**Problem.** Part I lands March 12; Parts II to VIII through autumn 2027. Until then, every era essay keeps the template the editorial critic faulted and the dead end every critic named ("a 22-part series with no next link ends every reader after part one"). The cheapest fix in the critique waits most of a year, although U31 (December 18) builds the ordered reading list a rail needs.

**Fix.** In U31, give every era essay previous and next from the ordered list, a byline line, and figures linked from the registry. Template conversion can still ride the Parts.

### 17. Maps are promised and also forbidden (serious)

**Claim.** Section 8: "a line map where one helps." 6.6: the plates are "a finite, numbered series" (I to VII) and "A new drawing needs a place in the series." 10.7 risk 13 lists "a map" among the spectacle to resist; U68 the atlas only "if he asks."

**Problem.** Critique #8 and #10, the editorial and brand critics, and critique Q11 ask for simple line maps for history and context. No plate is a map, so by the vision's own rule none can be drawn, while section 8 promises one.

**Fix.** Add Plate VIII, the line map: coastlines and places as hairlines, one mustard point, static SVG, a list equivalent, no tiles and no library, with a pattern page. Name the first uses (the apostolic era, Paul's cities). Or strike the promise and tell James plainly that maps are refused.

### 18. The accessibility failures are locked in rather than fixed (serious)

**Claim.** 6.4 "The gate," 6.9's floor ("axe blocking on the 25 captured routes plus ..."), U70.

**Problem.** U70's new rules carry "a baseline like its hex baseline, so new debt fails and old debt is paid down." No unit pays it down, so the 37 inline `outline: none`, the 31 inputs under 16px and the mustard text uses (467 in code) pass CI as grandfathered debt. Blocking axe on the captured routes appears in 6.9 and in no unit: U34 is not among 10.6's changed units, and MASTER-PLAN 9.7 still says ten routes, non-blocking. The `/search` contrast failure, a plain AA failure on a core page (`search-q-grace-phone-first.png`), lives until U85 on February 12.

**Fix.** U70 removes the 37 overrides and sets the 16px rule globally (the mobile critic's one line), with the baseline at zero for both. Move `/search`'s labels to `--mustard-text` in U70; it is one file. Change U34 to blocking axe on the 25 routes plus the five the vision names.

### 19. Night and offline stay broken for most of a year (serious)

**Claim.** 6.9 (Night after the audit, March 12); D11 (offline is his question).

**Problem.** Night has no fallback if P6 is declined, and it reaches only four surfaces first. The dark-mode `theme-color` seam (`client/index.html` line 53 paints `#1A1A1A` over the cream header on every page for dark-mode phones) is a one-line fix left to U89. Offline has no unit, no default and no date, while `/resources` still invites readers to "Put LiveWell on your home screen" over a service worker that is `selfDestroying: true` (`vite.config.ts` line 22).

**Fix.** Drop the dark `theme-color` line in U70. If P6 is declined, ship a dim paper (cream at reduced luminance, within the contract) on Tonight, table mode and the care pages. Give D11 a default (keep `/bible/text/`, `/needs/` and the crisis data within a stated budget) and a unit, or remove the home-screen invitation until offline exists.

### 20. The drift and the mark (problem 10) have no unit (serious)

**Claim.** 6.7: "One eyebrow style, three buttons (ink, outline, text), one quote device, replacing six, seven and three." P9, P10.

**Problem.** No unit in 10.2 to 10.5 carries the component consolidation; U70 lists tokens, classes, `SpeakerLabel`, the italic and gates. The favicon stays a text "L" in whatever serif the device has, and the wordmark stays live text, until a commissioned mark after James answers, in Phase 4. Witness images also wait for Phase 4, while generated covers "retire as witnesses land, or leave nothing," so the interim site has fewer images than today.

**Fix.** Put the component spec in U70, or a sibling unit, with a test that counts eyebrow and button variants. Outline the current wordmark and the favicon's glyph to paths now, with no commission needed. Schedule the first witness images with Part I on March 12.

### 21. Smaller seams the vision leaves or creates (minor)

- "The nine Parts" (3.5, 5.10) against "Part 2 of 8" (5.11).
- The hub length rule (5.1) covers Topics, Family, Essays and About only, so `/theology/history` (18.4 phone screens), `/study` and `/help` (14.4; "first screen kept as it is," 36 cards below) get no bound (critique #4, ia M10).
- The history verdict band "You did not start the faith. You were handed it." is kept beside a new line "addressed to every reader"; the visitor critic names it as insider address.
- The kicker that splits into two columns on every era essay, creed and guide (mobile #12) is not mentioned.
- Home's essays band has no selection rule, and the pilots it reads are two of five on Christian nationalism, the narrowing critique #5 named. Choose the rows by the reader's question, as `Start where you stand` does.
- The *Sources and record* foot has no data for the fifteen live older essays, including the strongman essay the visitor critic faulted for lacking sources. Name who builds those lists, or hide the slot until it is filled.

**Fix.** Correct the count; extend 5.1's length rule to every hub; rewrite or move the verdict band; fix the kicker in U70; give the essays band a rule; schedule the source lists.

## What VISION does fix, for fairness

The chapter's first screen, the bottom bar, the verse panel with dialog semantics and Previous and Next, whole-verse selection, Read · Study · Teach, the hard question in 1,033 chapters (verified: `hard` 1,033, `teach` and typed questions 114), one long-read template with a true italic whatever James decides, the ending allowed to end, one search answering by kind, the citation index, the skeptic's one-screen door with "Not convinced, but go on," the crisis lines as 44px buttons (U83, December 4), the canon map, the honest empty states, the fact-sheet default of printing no count, and the build-before-drawing discipline for the Line. Its corrections of earlier errors also check out against the repo (Polycarp at about 39 in 108; six people alive in 386; `covenant.svg` carries five mustard marks; the service worker self-destroys).

## Not verified

No prototype exists, so no position or size was measured. I did not confirm the ESV's display terms for a Compare row or an in-sheet quotation (breaks 5 and 6), the availability of a formatted public-domain BSB from inside this sandbox (break 4), or production behavior of `/tools/theology-quiz` beyond the source in `api/index.ts`. Counts quoted from the critic reports (37 overrides, 31 inputs, 467 mustard uses) were not recounted.
