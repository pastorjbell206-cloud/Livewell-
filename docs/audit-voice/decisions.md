# Voice audit — decisions for James

> Items the repair pass could not settle as copy: they need a ruling, a code change, or a fact only James has. Each names the surface and the question. Ledger: docs/audit-voice/ledger.json (see the repair field on each unit).

## client/src/pages/AdminSetupNavigation.tsx

- client/public/subpathway-mapping.json still carries the legacy five pillar names (Integrated Life, Leadership Formation, Prophetic Disruption, Prophetic Justice, Theological Depth) while taxonomy.ts PILLARS_V2 is the six-pillar spine; the backfill sends r.pillar through from that file. Whether the mapping should be regenerated onto PILLARS_V2 is a data/engineering decision, not copy.

## client/src/pages/ArticleCollections.tsx

- The Buy and Preview buttons have no onClick handler and no downloadUrl is set on any collection, so the listed prices ($8.99–$12.99) and the computed "hours of reading" are claims the page makes for money that nothing behind the button fulfils. Needs a ruling on whether this page is live product or should be held back until checkout is wired.

## client/src/pages/ArticleDetail.tsx

**Resolved in code:** the resolved `author` is now passed into QuoteSelectionShare and ShareableQuote, so a highlighted or pulled quote is attributed to its writer.

- Pass the resolved `author` (line 556) into QuoteSelectionShare (line 815) and ShareableQuote (line 833) and use it in the two attribution templates at lines 185 and 274; until then a reader sharing a highlight from "the-work-nobody-watches" or "the-womanhood-they-preached-was-small" attributes Susanna's sentence to James.

## client/src/pages/AuthorProfile.tsx

- The PCN short bio "Collective wisdom from pastoral leaders across the globe" was not flagged by the audit so I left it, but "across the globe" is a scale claim I cannot verify and reads as the same corporate register; James should confirm or trim it.

## client/src/pages/BookDetail.tsx

- The CTA line "Read the first chapter free above" renders for every book, including ones with no sampleExcerpt and no readable manuscript, in which case there is nothing free above. Making it conditional is a code change.

## client/src/pages/Diagnostic.tsx

- The per-dimension weak/strong diagnosis strings (DIM_META, lines 130–159) were outside the audit extract and were not reviewed or changed; the "weak" lines name the reader's condition flatly ("You are running on fumes", "Your daily practice of God has thinned") and may deserve the same care pass.

## client/src/pages/Membership.tsx

- "The first 100 members lock in the founding rate. Your price never increases." stays only if it is literally true of the Stripe price configuration; I could not verify it from the code and left it in place for James to confirm or cut.

## client/src/pages/books/Covenant.tsx

- If James would rather keep the Bonhoeffer line, it needs to appear as a quotation with attribution (Bonhoeffer, wedding sermon from Tegel, 1943, in Letters and Papers from Prison) in the exact wording of a specific translation; I did not restore it because the wording varies across editions and the standard requires verbatim.

## client/src/pages/books/FaithAfterDeconstruction.tsx

- If James has in fact had a post-conversion deconstruction and wants it named, the clause "who has had his own faith come apart and be rebuilt" can be restored on his word; it is not among the facts on record.

## client/src/pages/books/MarriageInMinistry.tsx

- The "Loading the opening…" state renders forever when the sample fetch fails (the catch sets an empty string); fixing it is a code change, not copy.
- If the confession about failing his own wife is James's own account and he wants it on the page, he can restore it; I could not keep it on the facts on record.

## client/src/pages/books/OrdinaryHoliness.tsx

- Same "Loading the opening…" forever-state on a failed sample fetch; a code change.

## client/src/pages/books/PropheticJustice101.tsx

- Same "Loading the opening…" forever-state on a failed sample fetch; a code change.

## client/src/pages/books/SermonOnTheMountAsPolitics.tsx

- If the atheist-reading-the-Sermon story is James's own account, he can restore it on his word.
- Same "Loading the opening…" forever-state on a failed sample fetch; a code change.

## client/src/pages/books/TheLonelinessOfThePastor.tsx

- "who nearly quit himself" was cut as biography not on record; James can restore it if it is his own account.
- The note asks for a visible link to PCN or the pastor resources so a burned-out pastor does not land only on a buy button; adding a link element is a structural change, not a copy edit, so it is left for a code pass.
- Same "Loading the opening…" forever-state on a failed sample fetch; a code change.

## client/src/pages/books/TheScandalOfTheCross.tsx

- The 'Loading the opening…' forever-state on a failed sample fetch is a logic fix (the catch sets sample to an empty string, which the ternary treats as still loading). Needs a code change in /home/user/Livewell-/client/src/pages/books/TheScandalOfTheCross.tsx around lines 25 and 89; not touched.

## client/src/pages/books/WhyNotWhat.tsx

- If the cut story detail is James's own account of his conversion, he can restore it; it was removed only because it is not a fact on record.

## client/src/pages/comparisons/LiturgicalVsContemporary.tsx

- If James can source the Smith phrase to a page in Desiring the Kingdom, the quotation marks can be restored.

## client/src/pages/RoadMap.tsx

- IN_DEVELOPMENT is now an empty array, so the page renders an 'In Development — 0 / Being written now.' section with no rows. Hiding an empty section is a code change. Supply the titles actually being written, or have the section hidden when empty.
- PLANNED still lists 'After Christendom', but docs/BOOK-PIPELINE.md lists 'After Christendom' among the topical ebooks already selling. One of the two is wrong; I could not verify which, so I left the entry.
- The SEO title still reads 'The Roadmap — 48 books'.

## client/src/pages/Search.tsx

- ESLint reports four pre-existing 'any' warnings in this file (lines 37, 38, 138, 352) that predate my edits and are code, not copy.

## client/src/pages/SermonSeries.tsx

- The hero stat block still shows a hardcoded '60 / Source Articles' (Stat n="60"). Making it honest means either computing the unique relatedArticle count from SERMON_SERIES (a code change) or you choosing a number to print.

## client/src/pages/SkepticTrack.tsx

- If the age is real, restore it here and settle the conflict the essay audit noted ('until twenty-four' vs 'maturity for twenty years').

## client/src/pages/StartHereQuiz.tsx

- A reader who picks 'In Crisis' still gets the same results template. The new intro paragraph names the Care Plans in plain text, but a clickable link to /help, or a conditional block shown only when answers.situation === 'crisis', is a code change I did not make.
- The book mappings remain mismatched to their paths (When God Bless America for Parenting, What If We're Wrong? for Marriage, The Monster in the Mirror for Pastoral Burnout). I could not verify the catalog well enough to reassign them; if Raising Believers / Covenant / a burnout title are the intended books, that is a one-line change per path.
- 'What If We're Wrong?' is served as a book title but has no book page in the route table; confirm it exists in the books table.

## client/src/pages/TheReliabilityOfScripture.tsx

- If the 'she' is a real person from the book's own pages, the original opener can be restored with attribution to the book.

## client/src/pages/ToolsHub.tsx

- ESLint reports a pre-existing unused 'Mic' import on line 4; it is an import, so I left it.

## client/src/pages/WhereYourTreasureIs.tsx

- The same claim appears in essay excerpts outside my assignment (client/src/data/content-data.json line 2873, money-vocation-articles.ts line 37 'a textual fact that anyone with a concordance can verify', and the generated static library). Those need the same treatment.

## client/src/pages/Wisdom.tsx

- The audit asked to cut the PullQuote outright. Removing the element would leave an unused PullQuote import (an import change, and a lint failure), so I replaced its text instead. If you would rather the block go entirely, that is a two-line code change (the element and the import).


## Essays — biography to confirm

> Lines the audit flagged as first-person claims beyond the known facts (came to faith from atheism, raised without a father, five sons, fifteen years at FBC Fenton, founded PCN). Each is either James's, and ships, or is not, and comes out. Nothing here was changed by the repair pass.

### gen-z-wants-from-church
- "what pulled me was not programming... It was older men who let me stand close enough to watch them live" extends the conversion biography beyond the facts on file

### engaging-nones-religiously-unaffiliated
- First-person conversion narrative: a specific Christian who "did not flinch" and said "that is a real question"; "People fed me... real tables, a long stretch of time"; "Nobody mailed me anything. Somebody fed me, and took the years" — detailed personal anecdote beyond the four known biographical facts; confirm with James before it ships

### white-churches-diversity
- Claims about the writer's own congregation's platform, elder board, website statement, and homepage photograph ("A Black worship leader on the platform some Sundays"; "Everyone with color in that room was on the stage") are biography about a real church that cannot be verified from the facts on record

### authority-we-traded-for-authenticity
- 'I made this trade myself, at nineteen, with both hands and gladly' and 'I traded it once myself, at nineteen' state a specific biographical event not among the known facts (atheism, raised without a father, five sons); confirm with James or remove the age.

### deconstruction-without-reconstruction
- "an empty tomb three days later that I cannot explain away and have spent thirty years trying" (biographical detail not in the known facts; consistent but unverified)

### how-to-talk-kids-faith-doubt
- 'I came to faith from atheism. Nobody argued me across the line with a flawless case... What moved me was watching people who held the faith without pretending it was easy' — extends the known biographical fact into a conversion narrative; must be James's own account or be cut

### suffering-without-explanation
- 'I have read them carefully and even taught them to students' (biography not on file; confirm or cut)

### will-there-be-a-judgment-day
- 'mass graves dug a few hours' drive from where he sat' — Volf wrote Exclusion and Embrace largely at Fuller/Yale; biographical embellishment

### the-atheist-in-the-pulpit
- 'I found Bertrand Russell at nineteen' (biographical detail beyond the known facts; confirm with James)
- father 'not dead, just gone... a decision someone kept making every morning by not coming back' (confirm with James)
- the conversion narrative ('a night came when the resistance simply had nothing left to stand on... I did not walk an aisle') (confirm with James)
- 'I pray the word Father with no muscle memory for it' (confirm with James)

### the-machine-that-forms-you
- 'I checked my phone this morning before I prayed' and 'I bought my sons' devices with my own money' and the son's 'arithmetic' look (household anecdotes beyond the known facts; confirm with James)

### the-hour-that-forms-the-week
- 'I spent my early ministry curating novelty' (confirm with James)

### the-end-of-home-field-advantage
- the napkin evangelist anecdote ('two cliffs, a chasm between them, a cross laid across the gap') (confirm with James)
- the friend 'who took my contempt without returning it... stayed in the friendship through years' (confirm with James)
- 'I have taught the napkin... trained volunteers in the conversational pivots... I bought the campaign kits. I once measured a season of my ministry in response cards' (confirm with James)

### the-work-nobody-watches
- Every biographical claim about Susanna Bell — her upbringing, the ledger, the fear — unconfirmed per the repo's own workplan

### the-womanhood-they-preached-was-small
- Every biographical claim about Susanna Bell's upbringing and the implied abuse — unconfirmed per the repo's own workplan

### can-you-be-good-without-god
- The machinist 'in my old neighborhood' — personal anecdote; confirm with James before publishing

### is-faith-just-wishful-thinking
- 'a boy raised without a father who... found in a godless universe not a grief but a relief' — extends known biography into a psychological story; confirm with James

### are-miracles-believable
- 'I was nineteen' — biographical specific; confirm with James

### meaning-without-god
- "as though my son's life had a worth no atom of me had voted on" — implies a son during his atheism; biography beyond the known facts, confirm with James
- "a night when I was the thing that had broken and there was no one on the shore" — biography beyond the known facts, confirm with James

### natural-evil-and-animal-suffering
- "I have buried other people's children" — plausible for a working pastor, unverified biography

### what-new-atheists-got-right
- "I asked hard questions as a young man and I was handed slogans… the men who gave them to me mistook my leaving for rebellion" — claims a church upbringing and a departure from it; not among the known biographical facts
- "I laughed out loud reading him" — memoir detail, unverifiable

### morality-without-god-and-with-him
- "I gave blood. I told the truth when it cost me. I would have run into traffic for a stranger's kid" (personal biography beyond the known facts)

### the-questions-that-actually-matter
- "I spent six years as an atheist" (duration not among the known biographical facts)

### what-following-this-actually-costs
- "I came to all this at twenty-four" (age of conversion not among the known facts)

### what-secular-explanations-still-have-to-explain
- "I was that atheist until I was twenty-four" (age not among the known facts)


## Surface repairs, second pass — rulings needed

## client/src/pages/faq/WhyArePeopleLeavingChurch.tsx

- If James wants the generational percentages back, the sentence needs the actual Pew figures and year; I did not substitute numbers I could not verify.

## client/src/pages/landing/HonestQuestions.tsx

- The hero now says he "carried questions like these" rather than "asked every one of these questions"; James should confirm even the softened version matches his story, or cut the clause to the bare former-atheist fact.

## client/src/pages/landing/PostChristian.tsx

- The page's tier arrays total sixty titles, but I did not confirm that all sixty slugs resolve to live essays; if any are unpublished, the count in the hero, meta, and schema should drop to match.

## client/src/pages/leadership/BudgetCalculator.tsx

- If the healthy-range percentages do come from a named source (a denominational benchmark, a published survey), James can name it and the 'drawn from' claim can return with the citation.

## client/src/pages/nation/NationHub.tsx

- The scorecard card still says "The tally is meant to come out split." The note cross-referenced this as an admission about the tool's design rather than an edit instruction; if the scorecard is in fact built to balance, the sentence is honest and the tool is the problem, and if it is not, the line should say the tally falls where the evidence puts it. That is a ruling on the tool, not a copy fix.

## client/src/pages/nation/NationScorecard.tsx

- The hub card in client/src/pages/ToolsHub.tsx (not in my assignment) still says "The tally is meant to come out split"; the file's own header comment says the same. Both should be brought in line with this page's caption.

## client/src/pages/pillars/ThePastoralAngle.tsx

- If either removed sentence is true and you want it back, it needs your own words; I could not confirm it from the permitted facts.
- The Find Help pointer is plain text ("go to the Find Help page first") because making it a link would require adding a wouter Link import to this file, which is a code change. Worth doing if you want it clickable.

## client/src/pages/tools/BibleReference.tsx

- The sexuality topic still steelmans both readings and does not name where you land or the tradition it comes from. Your doctrinal position is not among the facts I am permitted to assert, and the site's homosexuality page does not state it in a form I could quote, so that sentence needs your own words.

## client/src/pages/tools/DeepBibleCompanion.tsx

- Line 1477 still says Philippians 4:13 "has become one of the most misquoted verses in the Bible"; the notes did not flag it and it is hedged with "one of", so I left it, but it is the same family of claim.

## pcn-healthy-growing-church

- The notes flag "Breaking Through the Plateau" as church-growth-conference language, but it is the printed subtitle; only James can rename it.

## livewell-staying

- The notes ask that the book's page keep a visible path to real help beside a blurb that names depression; that is page-level copy in BookDetail.tsx, outside the description field, and needs his ruling on where it lives.

## dangerous-calling-why-the-office-of-pastor-is-not-for-everyone

- Title collision: Paul David Tripp's Dangerous Calling (Crossway, 2012) covers the same subject. The blurb cannot distinguish the two without inventing contents; James must rule on the title or supply what sets his apart.

## the-first-flock-the-church-s-calling-to-care-for-pastors-and-their-families

- The title's exact sense of "first flock" (the pastor's household as his first flock, or pastors and families as the church's first flock) cannot be settled from the subtitle alone; the rewrite is worded to be true under either reading, but James should confirm which the book argues.

## earthen-vessels-why-our-bodies-matter-to-our-faith

- Title collision: Matthew Lee Anderson's Earthen Vessels: Why Our Bodies Matter to Our Faith (Bethany House, 2011) carries the identical title and subtitle. That is a ruling on the title, not the copy.

## the-unfinished-church-calling-vision-and-the-future-god-is-building

- The blurb stays as close to the subtitle as honesty allows; if the book makes a sharper specific claim about what is unfinished, James can supply it and the blurb should carry it.

## client/src/pages/tools/PastorBurnout.tsx

- The crisis-band opener "Hear this: you are not failing. You are drowning." still contains the stock turn "Hear this:" that the signals list; I left it because the notes say the lowest band should not be touched. Removing the two words would not weaken the care if you want it gone.
- The ScriptureNote is rendered with rendering="unverified"; the notes say the NIV quotations are fine so long as the note names the translation, which is a component concern, not copy.

## client/src/pages/tools/PrayerGenerator.tsx

- Two pre-existing ESLint warnings (unused useMemo import here, unused useEffect in ScriptureMemory.tsx) predate this work and fail --max-warnings 0; fixing them means touching imports, which was off-limits for this pass.

## client/src/pages/tools/Proverbs31.tsx

- The file's header code comment (line 3) still repeats the "for centuries" claim; it is not reader-facing so I left it, but it can be trimmed whenever someone is in the file.

## client/src/pages/tools/WhichLens.tsx

- If any of the four original first-person claims (carrying the Flag lens for years; softening hard words for a cold room; preaching an edited canon and being discipled by men who did the same; being formed by the consumer church) is true of James, he can restore the specific version; the generalized "we" is the honest default until he confirms.

## client/public/family-seasonal.json

- The audit's structural note does not hold on inspection: advent[1], [3], [7], [9]-[12], [14], [16], [22], [23] and holyWeek[3], [5] all already carry both a question and a prayer in the file, so no fields were added. If the site is rendering those days without them, the gap is in the page component, not the JSON.

## client/public/family-catechism.json

- The near-duplicate pairs the audit noticed ([48]/[52], [49]/[53], [3]/[75], [7]/[63], [17]/[56], [46]/[60], [47]/[61]) are structural, not copy: deciding whether to merge or cut entries renumbers the catechism and needs his ruling.
- [21].commentary was listed among the antithesis openers but contains no "X is not A. It is B." construction (it opens "The law is like a mirror..."); I left it untouched rather than rewrite a field that does not fail.

## client/public/family-devotions-2.json

- Deity-pronoun capitalization is split down the library: entries [0]-[36] mostly capitalize He/His/Him, entries [37]-[59] mostly do not, and the flip the audit saw at [42] is where the second convention begins. The catechism and the ESV both use lowercase, but normalizing forty entries in either direction is a house-style ruling, not a copy fix, so I left it.
- Every passageText is NIV against the platform's ESV default. Replacing sixty passages means sixty verbatim ESV quotations that should be pasted from the text, not typed from memory; I did not touch them.
- [8].title "Brave Is Not Fearless" carries the same antithesis as the bigIdea I rewrote beneath it; the notes did not name titles, so it stands, but he may want it to match.
