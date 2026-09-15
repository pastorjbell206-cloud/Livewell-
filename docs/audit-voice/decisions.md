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

