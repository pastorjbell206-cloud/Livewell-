# The Reliability of Scripture: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the fourth book, The Reliability of Scripture (id `the-reliability-of-scripture`), edited in `content/books-src/the-reliability-of-scripture/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit 7322751b; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The records of the first three books are `blind-spots.md`, `a-higher-allegiance.md` and `believe.md`, beside this file; the method is the same as Believe's.

## Method

Like Believe, this book's problem is the long dash: 579 in the 44,055 words of his running prose (the introduction, 38 chapters, the conclusion, the two notes and the five appendices), 13.1 per 1,000 words, against his limit of 2 to 3 per 500 (4 to 6 per 1,000). It has few fragment stacks and almost no one-line paragraphs, and no word from the Forbidden Language list. So the work was the dashes. Each chapter was read whole. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff 7322751b -- content/books-src/the-reliability-of-scripture/` shows every change). One commit per chapter.

What an edit may be: an em-dash recast as a comma, a full stop, a semicolon, a colon before a real list or a gloss, or brackets; two fragments joined into one sentence where no new word is needed. Nothing else: no word was added, no sentence, fact, example or opinion was added, and none was taken out.

**This is apologetics, and the rule was stricter for it.** The book is dense with manuscript counts, dates, names, sites and scholars' positions, and it states the critic's case before answering it. A sentence that states an objection, a scholar's view or his own answer to a contested question took punctuation only. Where the book steel-mans the other side (Ehrman, Wellhausen, the documentary hypothesis, the Jesus Seminar, the minimalists), the words are as he wrote them. A quotation or claim that looks wrong was listed for James below, not corrected.

**Verdicts were left standing.** "Not X. Not Y. Z." runs that land a verdict (the introduction's "Not the cheap faith ... Not the anxious faith ... Something harder") are the hinge his standard keeps, and joining them would have needed new words, so they stay.

**What was not edited.** Headings, subtitles and pull quotes keep their dashes (they are titles, and the fact diff holds them fixed). The Key Takeaways, reflection questions and source notes at a chapter's end were left as they are. Appendix A (manuscript families), Appendix B (archaeological sites), Appendix C (scholars) and Appendix D (the reading plan) are reference lists; where an entry's dash separates a name from its gloss it is the form of the entry and stays.

Three scripts, kept outside the repo in `/home/user/vs4/` (`apply.py`, `factdiff.py`, `tells.py`), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose (title, subtitle, headings, pull quote, block quotations and their references) must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words (probably, perhaps, may, might, could, some, many, most, often, about, almost, largely, seems, whether and the rest) and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora runs; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact. A dash recast as a colon raises the "colon before a reveal" figure, and a dash recast as a comma can make a new "triplet", so those counts can rise where the dashes come down.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Question in the Room | 978 | 978 | +0.0% | 15 (15.3) | 2 (2.0) | 38 (38.9) | 24 (24.5) | 11 | PASS |
| Chapter One: Three Questions We Confuse for One | 1,313 | 1,313 | +0.0% | 16 (12.2) | 0 (0.0) | 25 (19.0) | 9 (6.9) | 14 | PASS |
| **All 2** | 2,291 | 2,291 | +0.0% | 31 (13.5) | 2 (0.9) | 63 (27.5) | 33 (14.4) | 25 | |

## Introduction: The Question in the Room (`sec01.xhtml`)

Words 978 to 978. Em-dashes in his prose 15 to 2 (15.3 to 2.0 per 1,000 words). Tells 38 to 24 (38.9 to 24.5 per 1,000). Mean sentence 19.2 words to 19.5; sentences of eight words or fewer 29.4% to 26.0%; of five or fewer 13.7% to 14.0%. 11 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 15 to 2, not_but 1 to 2, NotX.Y 4 to 3, isnt_its 1 to 1, triplet 7 to 7, anaphora 3 to 3, intens 2 to 2, short_close 4 to 3, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 1 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 8 number words, proper names by count, and 13 hedge words (after: 13) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: She had been raised in the church, had memorized more Scripture than most adults twice her age, had sung every hymn and attended every youth retreat and believed — genuinely believed — until the semester she took Introduction to Religious Studies at a state university in the Midwest.
   After: She had been raised in the church, had memorized more Scripture than most adults twice her age, had sung every hymn and attended every youth retreat and believed, genuinely believed, until the semester she took Introduction to Religious Studies at a state university in the Midwest.
2. Before: So she left the church — not that night, but eventually. Not because the evidence against Scripture was overwhelming. But because the silence in that room was.
   After: So she left the church, not that night, but eventually. Not because the evidence against Scripture was overwhelming, but because the silence in that room was.
3. Before: I came to faith through the door of doubt — through questions that were taken seriously rather than deflected, through arguments that were made with care and patience rather than dismissed with proof texts; when someone finally sat down with my atheist questions and worked through them honestly, it changed everything.
   After: I came to faith through the door of doubt, through questions that were taken seriously rather than deflected, through arguments that were made with care and patience rather than dismissed with proof texts; when someone finally sat down with my atheist questions and worked through them honestly, it changed everything.
4. Before: Not in every detail — there are genuine questions that require genuine engagement — but as a general conclusion, it is false.
   After: Not in every detail (there are genuine questions that require genuine engagement), but as a general conclusion, it is false.
5. Before: This book is for the person who needs permission to investigate — who has been told that questioning is faithless, who has been handed certainty that broke when life got hard and who wants to know whether there is something more durable.
   After: This book is for the person who needs permission to investigate, who has been told that questioning is faithless, who has been handed certainty that broke when life got hard and who wants to know whether there is something more durable.


## Chapter One: Three Questions We Confuse for One (`sec02.xhtml`)

Words 1,313 to 1,313. Em-dashes in his prose 16 to 0 (12.2 to 0.0 per 1,000 words). Tells 25 to 9 (19.0 to 6.9 per 1,000). Mean sentence 22.5 words to 22.9; sentences of eight words or fewer 14.3% to 14.5%; of five or fewer 10.7% to 10.9%. 14 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 16 to 0, not_but 2 to 2, not_just 1 to 1, triplet 2 to 2, intens 1 to 1, q_answered 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 9 quoted strings, 2 Scripture references, 0 years, 0 numbers in digits, 36 number words, proper names by count, and 25 hedge words (after: 25) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: When someone asks whether the Bible is reliable, they rarely get the question they actually asked answered; they get a sermon about trusting God, or a history lecture about textual criticism that never connects to anything they actually believe, or a philosophical argument about the nature of truth — or, worst of all, a dismissal dressed up as piety:
   After: When someone asks whether the Bible is reliable, they rarely get the question they actually asked answered; they get a sermon about trusting God, or a history lecture about textual criticism that never connects to anything they actually believe, or a philosophical argument about the nature of truth, or, worst of all, a dismissal dressed up as piety:
2. Before: Is it authoritative in a way that differs from the authority of other excellent books — the word of God in a sense that requires a specific kind of response from those who read it?
   After: Is it authoritative in a way that differs from the authority of other excellent books, the word of God in a sense that requires a specific kind of response from those who read it?
3. Before: Not because question three is less important — it is the most important of the three.
   After: Not because question three is less important; it is the most important of the three.
4. Before: It means that the process of transmission has preserved the original content with sufficient accuracy that we can be confident we are reading what was originally written — that variations exist at the margins, not the center, that copyists preserved rather than invented, that the text has a coherent identity across centuries and languages and cultures.
   After: It means that the process of transmission has preserved the original content with sufficient accuracy that we can be confident we are reading what was originally written: that variations exist at the margins, not the center, that copyists preserved rather than invented, that the text has a coherent identity across centuries and languages and cultures.
5. Before: It is the most reliably transmitted document from the ancient world — not by a small margin, but by a margin that makes every other comparison look thin. That is the argument this book will make, and we will make it with evidence. Not with assertion, not with appeals to authority, but with the data that scholars across the ideological spectrum — believing and skeptical, Christian and secular — have produced by doing the actual work of manuscript study and archaeology and historical reconstruction.
   After: It is the most reliably transmitted document from the ancient world, not by a small margin, but by a margin that makes every other comparison look thin. That is the argument this book will make, and we will make it with evidence: not with assertion, not with appeals to authority, but with the data that scholars across the ideological spectrum (believing and skeptical, Christian and secular) have produced by doing the actual work of manuscript study and archaeology and historical reconstruction.
