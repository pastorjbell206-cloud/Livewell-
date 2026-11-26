# Church Governance That Works: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the eleventh book, the second of the three Hard Issues booklets, Church Governance That Works (id `church-governance`), edited in `content/books-src/church-governance/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit b82f8c21; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The method is the one recorded in `believe.md` and `the-reliability-of-scripture.md`, beside this file.

## Method

A short practical booklet for pastors and elders (an introduction, six chapters, a conclusion and an appendix of governance tools): 63 long dashes in the 5,967 words of his running prose before the reflection questions (10.6 per 1,000 words, against his limit of 4 to 6). So the work was the dashes.

What an edit may be: an em-dash recast as a comma, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into one sentence where no new word is needed. Nothing else: no word was added, removed or replaced, and no sentence, fact, example or opinion was added or taken out. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff b82f8c21 -- content/books-src/church-governance/` shows every change). One commit per chapter. In the tables an "edit" is one changed paragraph, which may hold several dashes.

**How the dashes were worked, and what that means.** Unlike the first four books, the chapters were not each read whole before editing. Every long dash in his running prose was given a recast by one fixed rule: a pair of dashes around an aside became commas, or brackets where the aside itself holds a comma or a question; a single dash before "and", "but", "which", "because", "not" and the like became a comma; before an independent clause, a semicolon; before a list, a colon; otherwise a comma. Each proposal was then read in its sentence, and where the rule chose wrongly it was overridden (4 overrides in this book). The fact diff below is what proves nothing but punctuation moved.

**Three polities, held level.** The booklet sets the episcopal, Presbyterian and congregational models side by side before commending a hybrid. Each model's description took punctuation only, and the three took the same rule. Each chapter's REFLECTION QUESTIONS and everything after that label were left as they are, and the closing Scripture lines ("... — Proverbs 11:14", "... — 1 Corinthians 14:40") keep the dash that marks the reference.

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (the fact diff holds them fixed), and so does anything a chapter sets after its running prose (questions for reflection, takeaways, sources), which the fact diff also leaves out of the prose it checks.

Three scripts, kept outside the repo in `/home/user/vs5/t/` (`apply.py`, `factdiff.py`, `tells.py`, with `propose.py` for the rule), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: Why Governance Matters More Than You Think | 343 | 343 | +0.0% | 3 (8.7) | 1 (2.9) | 11 (32.1) | 9 (26.2) | 1 | PASS |
| Why Governance Matters and How It Breaks | 647 | 647 | +0.0% | 5 (7.7) | 0 (0.0) | 14 (21.6) | 9 (13.9) | 3 | PASS |
| The Three Major Models Compared | 920 | 920 | +0.0% | 11 (12.0) | 0 (0.0) | 23 (25.0) | 12 (13.0) | 6 | PASS |
| What Pastors Decide and What Belongs to the Congregation | 892 | 892 | +0.0% | 15 (16.8) | 0 (0.0) | 23 (25.8) | 9 (10.1) | 9 | PASS |
| Building Clear Decision-Making Structures | 950 | 950 | +0.0% | 10 (10.5) | 0 (0.0) | 22 (23.2) | 12 (12.6) | 5 | PASS |
| The Congregational Meeting | 848 | 848 | +0.0% | 10 (11.8) | 0 (0.0) | 25 (29.5) | 15 (17.7) | 6 | PASS |
| Governance in Crisis and Transition | 824 | 824 | +0.0% | 7 (8.5) | 0 (0.0) | 16 (19.4) | 9 (10.9) | 3 | PASS |
| Conclusion: Governance as Stewardship | 276 | 276 | +0.0% | 2 (7.2) | 1 (3.6) | 12 (43.5) | 11 (39.9) | 1 | PASS |
| **All 8** | 5,700 | 5,700 | +0.0% | 63 (11.1) | 2 (0.4) | 146 (25.6) | 86 (15.1) | 34 | |

## Introduction: Why Governance Matters More Than You Think (`sec01.xhtml`)

Words 343 to 343. Em-dashes in his prose 3 to 1 (8.7 to 2.9 per 1,000 words). Tells 11 to 9 (32.1 to 26.2 per 1,000). Mean sentence 15.6 words to 15.6; sentences of eight words or fewer 40.9% to 40.9%; of five or fewer 31.8% to 31.8%. 1 edits; paragraphs 8 to 8. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 3 to 1, triplet 4 to 4, anaphora 1 to 1, intens 2 to 2, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 2 number words, proper names by count, and 2 hedge words (after: 2) compared.

1 pairs (all there are), taken at even intervals through the chapter:

1. Before: The pastor who walks into a governance crisis without understanding governance — without a clear picture of what authority he holds, what authority his board holds, and what authority the congregation holds — is at an extraordinary disadvantage.
   After: The pastor who walks into a governance crisis without understanding governance (without a clear picture of what authority he holds, what authority his board holds, and what authority the congregation holds) is at an extraordinary disadvantage.


## Why Governance Matters and How It Breaks (`sec02.xhtml`)

Words 647 to 647. Em-dashes in his prose 5 to 0 (7.7 to 0.0 per 1,000 words). Tells 14 to 9 (21.6 to 13.9 per 1,000). Mean sentence 19.6 words to 19.6; sentences of eight words or fewer 18.2% to 18.2%; of five or fewer 3.0% to 3.0%. 3 edits; paragraphs 10 to 10. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 5 to 0, triplet 4 to 4, anaphora 1 to 1, stock 2 to 2, short_close 1 to 1, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 8 Scripture references, 0 years, 11 numbers in digits, 1 number words, proper names by count, and 15 hedge words (after: 15) compared.

3 pairs (all there are), taken at even intervals through the chapter:

1. Before: The question is never whether governance exists but whether it is working — whether it is enabling faithful ministry or impeding it, whether it is the product of deliberate theological reflection or the accumulated residue of historical accident.
   After: The question is never whether governance exists but whether it is working, whether it is enabling faithful ministry or impeding it, whether it is the product of deliberate theological reflection or the accumulated residue of historical accident.
2. Before: The tension escalates when a significant decision is made — a major ministry change, a staffing decision, a financial commitment, a directional shift — and the various parties discover that their incompatible assumptions about authority cannot all be honored.
   After: The tension escalates when a significant decision is made (a major ministry change, a staffing decision, a financial commitment, a directional shift) and the various parties discover that their incompatible assumptions about authority cannot all be honored.
3. Before: Any governance structure that honors these principles consistently — that places Christ’s headship above all human authority, that reflects the relational character of the community, that gives elders genuine pastoral oversight, and that honors the congregation’s legitimate authority — is a governance structure with strong theological foundations.
   After: Any governance structure that honors these principles consistently (that places Christ’s headship above all human authority, that reflects the relational character of the community, that gives elders genuine pastoral oversight, and that honors the congregation’s legitimate authority) is a governance structure with strong theological foundations.


## The Three Major Models Compared (`sec03.xhtml`)

Words 920 to 920. Em-dashes in his prose 11 to 0 (12.0 to 0.0 per 1,000 words). Tells 23 to 12 (25.0 to 13.0 per 1,000). Mean sentence 24.2 words to 24.2; sentences of eight words or fewer 5.3% to 5.3%; of five or fewer 0.0% to 0.0%. 6 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 11 to 0, not_just 1 to 1, triplet 6 to 6, anaphora 3 to 3, intens 1 to 1, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 2 numbers in digits, 7 number words, proper names by count, and 15 hedge words (after: 15) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Understanding each model — not just as a theoretical category but as a specific approach to the distribution of authority in the local church — is essential for any pastor who wants to make deliberate rather than accidental governance decisions.
   After: Understanding each model (not just as a theoretical category but as a specific approach to the distribution of authority in the local church) is essential for any pastor who wants to make deliberate rather than accidental governance decisions.
2. Before: The episcopal model — from the Greek episkopos, bishop or overseer — locates primary church authority in a hierarchical structure of ordained leaders.
   After: The episcopal model (from the Greek episkopos, bishop or overseer) locates primary church authority in a hierarchical structure of ordained leaders.
3. Before: For most evangelical churches, a full episcopal model is not on the table — it requires a denominational structure that most independent and free-church congregations do not have.
   After: For most evangelical churches, a full episcopal model is not on the table; it requires a denominational structure that most independent and free-church congregations do not have.
4. Before: In its most thoroughgoing form, the congregation votes on significant decisions, and no authority structure — pastor, elders, or denominational body — can make binding decisions over the congregation’s expressed will.
   After: In its most thoroughgoing form, the congregation votes on significant decisions, and no authority structure (pastor, elders, or denominational body) can make binding decisions over the congregation’s expressed will.
5. Before: This hybrid model — congregational in ultimate authority, elder-led in practice — is both the most common in evangelical contexts and the most practically flexible.
   After: This hybrid model (congregational in ultimate authority, elder-led in practice) is both the most common in evangelical contexts and the most practically flexible.


## What Pastors Decide and What Belongs to the Congregation (`sec04.xhtml`)

Words 892 to 892. Em-dashes in his prose 15 to 0 (16.8 to 0.0 per 1,000 words). Tells 23 to 9 (25.8 to 10.1 per 1,000). Mean sentence 17.5 words to 17.5; sentences of eight words or fewer 27.5% to 27.5%; of five or fewer 25.5% to 25.5%. 9 edits; paragraphs 19 to 19. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 15 to 0, not_but 2 to 2, triplet 5 to 6, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 3 numbers in digits, 4 number words, proper names by count, and 10 hedge words (after: 10) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: what can the pastor (or pastoral staff) decide, and what requires broader authority — elder approval, deacon board approval, or congregational vote?
   After: what can the pastor (or pastoral staff) decide, and what requires broader authority: elder approval, deacon board approval, or congregational vote?
2. Before: How the pastor responds to members in crisis, how pastoral care resources are deployed, how counseling referrals are made — these are pastoral decisions that belong to the pastoral staff.
   After: How the pastor responds to members in crisis, how pastoral care resources are deployed, how counseling referrals are made; these are pastoral decisions that belong to the pastoral staff.
3. Before: The elder team’s authority is appropriately exercised in areas that require genuine spiritual oversight — the kind of discernment and accountability that the pastoral staff cannot provide for itself.
   After: The elder team’s authority is appropriately exercised in areas that require genuine spiritual oversight, the kind of discernment and accountability that the pastoral staff cannot provide for itself.
4. Before: The congregation’s authority in matters of membership — receiving new members, affirming elder candidates, and exercising formal church discipline in serious cases — is explicitly grounded in the New Testament.
   After: The congregation’s authority in matters of membership (receiving new members, affirming elder candidates, and exercising formal church discipline in serious cases) is explicitly grounded in the New Testament.
5. Before: When a church proposes changes to its core identity — its name, its membership standards, its fundamental doctrinal commitments, or its basic governance structure — those changes belong to the congregation as a whole, not to the leadership alone.
   After: When a church proposes changes to its core identity (its name, its membership standards, its fundamental doctrinal commitments, or its basic governance structure) those changes belong to the congregation as a whole, not to the leadership alone.


## Building Clear Decision-Making Structures (`sec05.xhtml`)

Words 950 to 950. Em-dashes in his prose 10 to 0 (10.5 to 0.0 per 1,000 words). Tells 22 to 12 (23.2 to 12.6 per 1,000). Mean sentence 17.9 words to 17.9; sentences of eight words or fewer 34.0% to 34.0%; of five or fewer 13.2% to 13.2%. 5 edits; paragraphs 17 to 17. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, not_but 1 to 1, triplet 4 to 4, anaphora 2 to 2, q_answered 1 to 1, colon_reveal 1 to 1, short_close 1 to 1, one_line_para 1 to 1, forbidden 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 5 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: And the most functional decision-making culture is fragile if it is not documented — because it is one leadership transition away from being forgotten.
   After: And the most functional decision-making culture is fragile if it is not documented, because it is one leadership transition away from being forgotten.
2. Before: Church governance documents — bylaws, elder charters, deacon role descriptions, and related policy documents — perform several functions when they are well-written.
   After: Church governance documents (bylaws, elder charters, deacon role descriptions, and related policy documents) perform several functions when they are well-written.
3. Before: Not a vague role description, but a specific statement of what each office — senior pastor, elder team, deacon team, congregational assembly — has the authority to decide, what it is accountable for, and how it relates to the other offices in the governance structure.
   After: Not a vague role description, but a specific statement of what each office (senior pastor, elder team, deacon team, congregational assembly) has the authority to decide, what it is accountable for, and how it relates to the other offices in the governance structure.
4. Before: The most practical governance tool a church can develop is a decision matrix — a document that lists specific decision types and specifies which level of authority is required for each.
   After: The most practical governance tool a church can develop is a decision matrix: a document that lists specific decision types and specifies which level of authority is required for each.
5. Before: A governance review framed as an attempt to correct the past — to fix the things that have been wrong — will mobilize defensiveness in the people who built the existing structure. A governance review framed as an investment in the future — an attempt to build governance structures that will serve the church well for the next twenty years — invites the same people into a forward-looking process they can own.
   After: A governance review framed as an attempt to correct the past, to fix the things that have been wrong, will mobilize defensiveness in the people who built the existing structure. A governance review framed as an investment in the future (an attempt to build governance structures that will serve the church well for the next twenty years) invites the same people into a forward-looking process they can own.


## The Congregational Meeting (`sec06.xhtml`)

Words 848 to 848. Em-dashes in his prose 10 to 0 (11.8 to 0.0 per 1,000 words). Tells 25 to 15 (29.5 to 17.7 per 1,000). Mean sentence 20.2 words to 20.2; sentences of eight words or fewer 14.3% to 14.3%; of five or fewer 4.8% to 4.8%. 6 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, triplet 8 to 8, anaphora 2 to 2, intens 4 to 4, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 7 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: For many churches, it is also one of the most consistently poorly managed moments in the institutional calendar — a setting where good governance principles are regularly violated, where the loudest voice rather than the wisest counsel tends to prevail, and where institutional conflict is more likely to be generated than resolved.
   After: For many churches, it is also one of the most consistently poorly managed moments in the institutional calendar: a setting where good governance principles are regularly violated, where the loudest voice rather than the wisest counsel tends to prevail, and where institutional conflict is more likely to be generated than resolved.
2. Before: The congregational meeting can be a genuinely significant moment of communal discernment — a gathering in which the body exercises its legitimate authority with wisdom, transparency, and genuine unity.
   After: The congregational meeting can be a genuinely significant moment of communal discernment: a gathering in which the body exercises its legitimate authority with wisdom, transparency, and genuine unity.
3. Before: The congregation that arrives prepared — with adequate written information, genuine opportunity for questions, and the time to process significant decisions before being asked to vote — will exercise its authority far more wisely.
   After: The congregation that arrives prepared (with adequate written information, genuine opportunity for questions, and the time to process significant decisions before being asked to vote) will exercise its authority far more wisely.
4. Before: The town hall format — an informal gathering where congregation members can ask questions, raise concerns, and receive honest answers in a non-vote context — is one of the most effective tools for preventing the congregational meeting from becoming the first opportunity for concerns to be raised.
   After: The town hall format (an informal gathering where congregation members can ask questions, raise concerns, and receive honest answers in a non-vote context) is one of the most effective tools for preventing the congregational meeting from becoming the first opportunity for concerns to be raised.
5. Before: The person who leads the congregational meeting — whether it is the senior pastor, an elder, or a designated moderator — has enormous influence over the meeting’s quality.
   After: The person who leads the congregational meeting (whether it is the senior pastor, an elder, or a designated moderator) has enormous influence over the meeting’s quality.


## Governance in Crisis and Transition (`sec07.xhtml`)

Words 824 to 824. Em-dashes in his prose 7 to 0 (8.5 to 0.0 per 1,000 words). Tells 16 to 9 (19.4 to 10.9 per 1,000). Mean sentence 22.3 words to 22.3; sentences of eight words or fewer 10.8% to 10.8%; of five or fewer 2.7% to 2.7%. 3 edits; paragraphs 13 to 13. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 7 to 0, NotX.Y 1 to 1, triplet 4 to 4, anaphora 1 to 1, intens 1 to 1, one_line_para 1 to 1, forbidden 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 5 number words, proper names by count, and 14 hedge words (after: 14) compared.

3 pairs (all there are), taken at even intervals through the chapter:

1. Before: The departure of a senior pastor — whether planned or forced, whether celebrated or grieved — is one of the most significant governance tests a local church faces.
   After: The departure of a senior pastor (whether planned or forced, whether celebrated or grieved) is one of the most significant governance tests a local church faces.
2. Before: When a significant doctrinal concern arises — a teacher whose theology is drifting in a concerning direction, a staff member whose public statements are inconsistent with the church’s confessional commitments, a movement within the congregation toward positions the leadership cannot endorse — the governance structure provides the framework for a response that is theologically principled, institutionally credible, and pastorally wise.
   After: When a significant doctrinal concern arises (a teacher whose theology is drifting in a concerning direction, a staff member whose public statements are inconsistent with the church’s confessional commitments, a movement within the congregation toward positions the leadership cannot endorse) the governance structure provides the framework for a response that is theologically principled, institutionally credible, and pastorally wise.
3. Before: The governance principle most critical to doctrinal conflict resolution is the distinction between disputable matters — areas where the church’s members can hold differing views without threatening the community’s unity — and boundary matters — areas where the community’s confessional commitments require a clear institutional response.
   After: The governance principle most critical to doctrinal conflict resolution is the distinction between disputable matters (areas where the church’s members can hold differing views without threatening the community’s unity) and boundary matters, areas where the community’s confessional commitments require a clear institutional response.


## Conclusion: Governance as Stewardship (`sec08.xhtml`)

Words 276 to 276. Em-dashes in his prose 2 to 1 (7.2 to 3.6 per 1,000 words). Tells 12 to 11 (43.5 to 39.9 per 1,000). Mean sentence 13.1 words to 13.1; sentences of eight words or fewer 33.3% to 33.3%; of five or fewer 28.6% to 28.6%. 1 edits; paragraphs 5 to 5. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 1 to 1.

By kind (before to after): emdash 2 to 1, triplet 3 to 3, frag3 1 to 1, anaphora 3 to 3, intens 1 to 1, one_line_para 1 to 1, forbidden 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 2 numbers in digits, 0 number words, proper names by count, and 3 hedge words (after: 3) compared.

1 pairs (all there are), taken at even intervals through the chapter:

1. Before: It will be felt in the absence of things — in the absence of the governance disputes, the authority vacuum crises, and the institutional chaos that inadequate governance makes inevitable.
   After: It will be felt in the absence of things, in the absence of the governance disputes, the authority vacuum crises, and the institutional chaos that inadequate governance makes inevitable.

## The whole book

Eight of the nine files were edited (the appendix has no long dash in its prose). In his running prose (before the reflection questions): 5,967 words before and after; em-dashes 63 before, 2 after (both before a Scripture reference); paragraphs unchanged in number. The fact diff passed on all eight.

**Every edit is punctuation.** Each recasts a dash as a comma, a colon, a semicolon or brackets. No word was added, removed or replaced.

**Forbidden Language list.** None of the listed words is in his prose.

## For James: things that look wrong, none of them changed

The booklet was read for this list in its dash contexts and searched for references and cross-references.

1. ★ **Stray chapter labels**, as in Change Without Casualties: each chapter's file ends with the next chapter's label ("CHAPTER ONE" closes the introduction), and the original PDF prints them the same way.
2. ★ "The most reliable approach is the one that has been described throughout this series" (chapter 4). The site offers this booklet on its own; the series it belonged to is not on the site, so the sentence points the reader at books he cannot find.
3. The appendix's decision matrix (pastoral staff authority, elder team authority, congregational authority) is a run of one-line paragraphs in the source and is set that way; it would read better as a table, which is a design change he can approve.

## Questions only James can answer

1. Move each "CHAPTER ..." label to the head of its own chapter?
2. Keep "throughout this series", or say it another way now that the booklet stands alone?

## The files

Rebuilt after the last chapter: still 44 pages (`client/src/data/booklets.ts` says 44), PDF 510 KB, EPUB 248 KB. `--verify`: the EPUB carries exactly the source folder's text (6,703 words compared, no difference); the PDF's pages carry the same text character for character (39,393 against 39,393). The conclusion and the appendix were looked at as images on the first build.
