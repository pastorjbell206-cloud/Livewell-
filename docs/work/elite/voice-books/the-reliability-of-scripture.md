# The Reliability of Scripture: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the fourth book, The Reliability of Scripture (id `the-reliability-of-scripture`), edited in `content/books-src/the-reliability-of-scripture/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit 7322751b; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The records of the first three books are `blind-spots.md`, `a-higher-allegiance.md` and `believe.md`, beside this file; the method is the same as Believe's.

## Method

Like Believe, this book's problem is the long dash: 579 in the 44,055 words of his running prose (the introduction, 38 chapters, the conclusion, the two notes and the five appendices), 13.1 per 1,000 words, against his limit of 2 to 3 per 500 (4 to 6 per 1,000). It has few fragment stacks and almost no one-line paragraphs, and no word from the Forbidden Language list. So the work was the dashes. Each chapter was read whole. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff 7322751b -- content/books-src/the-reliability-of-scripture/` shows every change). One commit per chapter.

What an edit may be: an em-dash recast as a comma, a full stop, a semicolon, a colon before a real list or a gloss, or brackets; two fragments joined into one sentence where no new word is needed. Nothing else: no word was added, no sentence, fact, example or opinion was added, and none was taken out.

**This is apologetics, and the rule was stricter for it.** The book is dense with manuscript counts, dates, names, sites and scholars' positions, and it states the critic's case before answering it. A sentence that states an objection, a scholar's view or his own answer to a contested question took punctuation only. Where the book steel-mans the other side (Ehrman, Wellhausen, the documentary hypothesis, the Jesus Seminar, the minimalists), the words are as he wrote them. A quotation or claim that looks wrong was listed for James below, not corrected.

**Verdicts were left standing.** "Not X. Not Y. Z." runs that land a verdict (the introduction's "Not the cheap faith ... Not the anxious faith ... Something harder") are the hinge his standard keeps, and joining them would have needed new words, so they stay.

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (they are titles and quotations, and the fact diff holds them fixed). This book has no Key Takeaways or reflection questions. Unlike Believe's, its five appendices and two notes are written as running prose, not as lists or a glossary, so they were edited the same way as the chapters.

Three scripts, kept outside the repo in `/home/user/vs4/` (`apply.py`, `factdiff.py`, `tells.py`), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose (title, subtitle, headings, pull quote, block quotations and their references) must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words (probably, perhaps, may, might, could, some, many, most, often, about, almost, largely, seems, whether and the rest) and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora runs; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact. A dash recast as a colon raises the "colon before a reveal" figure, and a dash recast as a comma can make a new "triplet", so those counts can rise where the dashes come down.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Question in the Room | 978 | 978 | +0.0% | 15 (15.3) | 2 (2.0) | 38 (38.9) | 24 (24.5) | 11 | PASS |
| Chapter One: Three Questions We Confuse for One | 1,313 | 1,313 | +0.0% | 16 (12.2) | 0 (0.0) | 25 (19.0) | 9 (6.9) | 14 | PASS |
| Chapter Two: Scribes, Scrolls, and Centuries — The Manuscript Trail | 1,607 | 1,607 | +0.0% | 24 (14.9) | 0 (0.0) | 36 (22.4) | 12 (7.5) | 18 | PASS |
| Chapter Three: The Canon Question — How We Got These Books and Not Others | 1,247 | 1,247 | +0.0% | 16 (12.8) | 0 (0.0) | 36 (28.9) | 20 (16.0) | 11 | PASS |
| Chapter Four: The Dead Sea Scrolls and What They Proved | 1,166 | 1,166 | +0.0% | 23 (19.7) | 0 (0.0) | 38 (32.6) | 15 (12.9) | 13 | PASS |
| Chapter Five: The New Testament Under Fire — Evidence, Eyewitnesses, and Early Dating | 1,136 | 1,136 | +0.0% | 16 (14.1) | 0 (0.0) | 23 (20.2) | 9 (7.9) | 12 | PASS |
| Chapter Six: What the Archaeologist's Spade Found | 1,491 | 1,491 | +0.0% | 16 (10.7) | 0 (0.0) | 37 (24.8) | 21 (14.1) | 11 | PASS |
| Chapter Seven: The Hard Sayings — Living with Difficulty | 1,259 | 1,259 | +0.0% | 15 (11.9) | 0 (0.0) | 28 (22.2) | 14 (11.1) | 10 | PASS |
| Chapter Eight: Dating, Authorship, and the Documentary Hypothesis | 996 | 996 | +0.0% | 14 (14.1) | 0 (0.0) | 26 (26.1) | 12 (12.0) | 8 | PASS |
| Chapter Nine: What the Church Has Always Believed — A History of the Doctrine of Scripture | 1,007 | 1,007 | +0.0% | 10 (9.9) | 0 (0.0) | 23 (22.8) | 13 (12.9) | 7 | PASS |
| Chapter Ten: When the Culture Says All Texts Are Suspect | 884 | 884 | +0.0% | 12 (13.6) | 0 (0.0) | 25 (28.3) | 14 (15.8) | 8 | PASS |
| Chapter Eleven: Reading the Bible Right — Genre, Hermeneutics, and Honest Interpretation | 1,116 | 1,116 | +0.0% | 12 (10.8) | 0 (0.0) | 25 (22.4) | 14 (12.5) | 9 | PASS |
| Chapter Twelve: The Internal Testimony — What Scripture Claims About Itself | 942 | 942 | +0.0% | 13 (13.8) | 0 (0.0) | 25 (26.5) | 12 (12.7) | 10 | PASS |
| Chapter Thirteen: Why It Still Matters — Living from the Authority of Scripture | 1,556 | 1,556 | +0.0% | 16 (10.3) | 0 (0.0) | 51 (32.8) | 35 (22.5) | 11 | PASS |
| Chapter Fourteen: Eyewitness Testimony and the Four Gospels | 1,233 | 1,233 | +0.0% | 15 (12.2) | 0 (0.0) | 24 (19.5) | 11 (8.9) | 11 | PASS |
| Chapter Fifteen: Prophecy, Fulfillment, and the Coherence of Two Testaments | 1,219 | 1,219 | +0.0% | 14 (11.5) | 0 (0.0) | 29 (23.8) | 15 (12.3) | 10 | PASS |
| Chapter Sixteen: The Resurrection — The Historical Core of Everything | 1,188 | 1,188 | +0.0% | 21 (17.7) | 0 (0.0) | 34 (28.6) | 13 (10.9) | 14 | PASS |
| Chapter Seventeen: The Transmission of Meaning — Translation, Language, and Trust | 815 | 815 | +0.0% | 10 (12.3) | 0 (0.0) | 21 (25.8) | 11 (13.5) | 7 | PASS |
| Chapter Eighteen: When Faith and Doubt Inhabit the Same Room | 964 | 964 | +0.0% | 9 (9.3) | 0 (0.0) | 26 (27.0) | 17 (17.6) | 8 | PASS |
| Chapter Nineteen: The Bible in the Life of the Church — Two Thousand Years of Evidence | 978 | 978 | +0.0% | 14 (14.3) | 0 (0.0) | 37 (37.8) | 25 (25.6) | 10 | PASS |
| Chapter Twenty: What Remains After the Argument — A Word to the Persuaded and the Still-Uncertain | 659 | 659 | +0.0% | 5 (7.6) | 0 (0.0) | 14 (21.2) | 9 (13.7) | 4 | PASS |
| Chapter Twenty-One: The Septuagint, the Apocrypha, and the Boundaries of the Canon | 864 | 864 | +0.0% | 13 (15.0) | 0 (0.0) | 19 (22.0) | 7 (8.1) | 9 | PASS |
| Chapter Twenty-Two: The Bible and Science — Where the Conflict Is Real and Where It Isn't | 885 | 885 | +0.0% | 14 (15.8) | 0 (0.0) | 23 (26.0) | 9 (10.2) | 8 | PASS |
| Chapter Twenty-Three: Objections Answered — The Most Persistent Challenges to Biblical Reliability | 1,270 | 1,270 | +0.0% | 14 (11.0) | 0 (0.0) | 26 (20.5) | 13 (10.2) | 9 | PASS |
| Chapter Twenty-Four: Practicing the Trust — Scripture as Daily Bread | 1,008 | 1,008 | +0.0% | 19 (18.8) | 0 (0.0) | 39 (38.7) | 20 (19.8) | 11 | PASS |
| Chapter Twenty-Five: A Final Word — To the Skeptic Who Made It This Far | 673 | 673 | +0.0% | 5 (7.4) | 0 (0.0) | 18 (26.7) | 13 (19.3) | 4 | PASS |
| Chapter Twenty-Six: The Bible's Self-Understanding Through History — From Desert to Diaspora | 1,043 | 1,043 | +0.0% | 15 (14.4) | 0 (0.0) | 32 (30.7) | 17 (16.3) | 9 | PASS |
| Chapter Twenty-Seven: The Parable of the Coins — An Illustration of Textual Criticism | 750 | 750 | +0.0% | 6 (8.0) | 0 (0.0) | 10 (13.3) | 4 (5.3) | 5 | PASS |
| Chapter Twenty-Eight: The Church Under Pressure — How Persecution Tested and Confirmed the Text | 620 | 620 | +0.0% | 7 (11.3) | 0 (0.0) | 15 (24.2) | 8 (12.9) | 6 | PASS |
| Chapter Twenty-Nine: What Kind of Book Is This? — The Unity of Scripture | 845 | 845 | +0.0% | 16 (18.9) | 0 (0.0) | 24 (28.4) | 8 (9.5) | 12 | PASS |
| Chapter Thirty: The Reader in the Story — Why This Matters for Your Life | 707 | 707 | +0.0% | 15 (21.2) | 0 (0.0) | 27 (38.2) | 13 (18.4) | 12 | PASS |
| Chapter 31: What the Scrolls in the Desert Proved | 776 | 776 | +0.0% | 13 (16.8) | 1 (1.3) | 23 (29.6) | 12 (15.5) | 7 | PASS |
| Chapter 32: When Luke Was Wrong — and Then He Wasn't | 761 | 761 | +0.0% | 8 (10.5) | 0 (0.0) | 18 (23.7) | 10 (13.1) | 7 | PASS |
| Chapter 33: The Problem of Alleged Contradictions | 836 | 836 | +0.0% | 9 (10.8) | 0 (0.0) | 22 (26.3) | 14 (16.7) | 7 | PASS |
| Chapter 34: Why Scribes Changed the Text — and What They Changed | 802 | 802 | +0.0% | 11 (13.7) | 0 (0.0) | 29 (36.2) | 18 (22.4) | 7 | PASS |
| Chapter 35: The Bible That Endured Everything | 749 | 749 | +0.0% | 10 (13.4) | 0 (0.0) | 16 (21.4) | 6 (8.0) | 7 | PASS |
| Chapter 36: What You Do with What You Now Know | 772 | 772 | +0.0% | 12 (15.5) | 1 (1.3) | 26 (33.7) | 15 (19.4) | 8 | PASS |
| Chapter 37: Letters Written Under Pressure — Paul and the Corinthians | 761 | 761 | +0.0% | 10 (13.1) | 0 (0.0) | 23 (30.2) | 13 (17.1) | 6 | PASS |
| Chapter 38: The Question Behind All the Questions | 718 | 718 | +0.0% | 10 (13.9) | 0 (0.0) | 23 (32.0) | 13 (18.1) | 8 | PASS |
| Conclusion: After the Questions, Before the Answer | 822 | 822 | +0.0% | 11 (13.4) | 0 (0.0) | 28 (34.1) | 17 (20.7) | 9 | PASS |
| A PASTORAL NOTE ON BIBLICAL LITERACY IN THE CONGREGATION | 404 | 404 | +0.0% | 4 (9.9) | 0 (0.0) | 12 (29.7) | 8 (19.8) | 3 | PASS |
| Appendix A: The Major Manuscript Families — A Primer for Careful Readers | 577 | 577 | +0.0% | 11 (19.1) | 0 (0.0) | 23 (39.9) | 12 (20.8) | 7 | PASS |
| Appendix B: Key Archaeological Sites and What They Proved | 717 | 717 | +0.0% | 9 (12.6) | 0 (0.0) | 13 (18.1) | 4 (5.6) | 8 | PASS |
| Appendix D: A Reading Plan for the Serious Inquirer | 584 | 584 | +0.0% | 10 (17.1) | 0 (0.0) | 15 (25.7) | 6 (10.3) | 7 | PASS |
| Appendix E: Frequently Asked Questions — Brief Answers to Common Objections | 1,187 | 1,187 | +0.0% | 21 (17.7) | 0 (0.0) | 39 (32.9) | 20 (16.8) | 13 | PASS |
| **All 45** | 42,885 | 42,885 | +0.0% | 579 (13.5) | 4 (0.1) | 1164 (27.1) | 605 (14.1) | 406 | |

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


## Chapter Two: Scribes, Scrolls, and Centuries — The Manuscript Trail (`sec03.xhtml`)

Words 1,607 to 1,607. Em-dashes in his prose 24 to 0 (14.9 to 0.0 per 1,000 words). Tells 36 to 12 (22.4 to 7.5 per 1,000). Mean sentence 25.5 words to 25.5; sentences of eight words or fewer 12.7% to 12.7%; of five or fewer 6.3% to 6.3%. 18 edits; paragraphs 16 to 16. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 24 to 0, not_but 1 to 1, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 6 to 6, anaphora 1 to 1, stock 1 to 1, intens 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 9 Scripture references, 3 years, 42 numbers in digits, 42 number words, proper names by count, and 43 hedge words (after: 43) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Those are the three metrics of textual reliability — quantity of manuscripts, earliness of manuscripts, and agreement between manuscripts — and by all three measures the New Testament stands alone in the ancient world.
   After: Those are the three metrics of textual reliability (quantity of manuscripts, earliness of manuscripts, and agreement between manuscripts), and by all three measures the New Testament stands alone in the ancient world.
2. Before: The John Rylands Papyrus, known as P52, is a small fragment containing portions of John 18, and it dates to approximately 125 AD — perhaps as little as thirty years after the Gospel of John was originally composed.
   After: The John Rylands Papyrus, known as P52, is a small fragment containing portions of John 18, and it dates to approximately 125 AD, perhaps as little as thirty years after the Gospel of John was originally composed.
3. Before: Another 15 to 20 percent of variations involve minor grammatical or stylistic differences — word order variations, the presence or absence of the Greek definite article, the addition or omission of connecting particles — that do not affect meaning, since Greek word order is flexible enough that rearranging words in a sentence often changes nothing about what the sentence communicates.
   After: Another 15 to 20 percent of variations involve minor grammatical or stylistic differences (word order variations, the presence or absence of the Greek definite article, the addition or omission of connecting particles) that do not affect meaning, since Greek word order is flexible enough that rearranging words in a sentence often changes nothing about what the sentence communicates.
4. Before: A thousand years of copying, across political upheaval, exile, persecution, and cultural transformation — how could the text not have changed substantially?
   After: A thousand years of copying, across political upheaval, exile, persecution, and cultural transformation: how could the text not have changed substantially?
5. Before: It is a story of a community that took its sacred text seriously enough to develop systematic methods for preserving it — and those methods worked.
   After: It is a story of a community that took its sacred text seriously enough to develop systematic methods for preserving it, and those methods worked.


## Chapter Three: The Canon Question — How We Got These Books and Not Others (`sec04.xhtml`)

Words 1,247 to 1,247. Em-dashes in his prose 16 to 0 (12.8 to 0.0 per 1,000 words). Tells 36 to 20 (28.9 to 16.0 per 1,000). Mean sentence 20.7 words to 20.7; sentences of eight words or fewer 20.0% to 20.0%; of five or fewer 8.3% to 8.3%. 11 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 16 to 0, not_but 1 to 1, isnt_its 1 to 1, triplet 10 to 10, anaphora 5 to 5, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 1 quoted strings, 16 Scripture references, 1 years, 22 numbers in digits, 47 number words, proper names by count, and 18 hedge words (after: 18) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Not who decided them — most people know, vaguely, that there was a council somewhere.
   After: Not who decided them; most people know, vaguely, that there was a council somewhere.
2. Before: It names real institutions — the Council of Nicaea, Constantine's involvement in church affairs — and it appeals to the instinct that power corrupts; it has been told and retold in popular books and films until it feels like established fact.
   After: It names real institutions (the Council of Nicaea, Constantine's involvement in church affairs), and it appeals to the instinct that power corrupts; it has been told and retold in popular books and films until it feels like established fact.
3. Before: Justin Martyr, writing around 150 AD, describes the regular practice of reading "the memoirs of the apostles" in Christian worship — these are the Gospels.
   After: Justin Martyr, writing around 150 AD, describes the regular practice of reading "the memoirs of the apostles" in Christian worship; these are the Gospels.
4. Before: The councils that produced formal canonical lists — Hippo in 393 AD and Carthage in 397 and 419 AD — were not inventing a canon.
   After: The councils that produced formal canonical lists (Hippo in 393 AD and Carthage in 397 and 419 AD) were not inventing a canon.
5. Before: The Gospel of Peter contains a literally cosmic resurrection scene — a cross that walks out of the tomb and speaks — that reads nothing like any first-century source.
   After: The Gospel of Peter contains a literally cosmic resurrection scene (a cross that walks out of the tomb and speaks) that reads nothing like any first-century source.


## Chapter Four: The Dead Sea Scrolls and What They Proved (`sec05.xhtml`)

Words 1,166 to 1,166. Em-dashes in his prose 23 to 0 (19.7 to 0.0 per 1,000 words). Tells 38 to 15 (32.6 to 12.9 per 1,000). Mean sentence 24.3 words to 24.3; sentences of eight words or fewer 25.5% to 25.5%; of five or fewer 14.9% to 14.9%. 13 edits; paragraphs 15 to 15. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 23 to 0, not_but 1 to 1, NotX.Y 1 to 1, triplet 6 to 6, anaphora 2 to 2, intens 2 to 2, colon_reveal 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 17 Scripture references, 5 years, 13 numbers in digits, 34 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: William Foxwell Albright was, at the time, America's leading biblical archaeologist — a figure of towering authority in the field — and when he received photographs from John Trever, a graduate student who had managed to photograph several of the Qumran scrolls before they were dispersed to various buyers, he was looking at something he understood instantly.
   After: William Foxwell Albright was, at the time, America's leading biblical archaeologist, a figure of towering authority in the field, and when he received photographs from John Trever, a graduate student who had managed to photograph several of the Qumran scrolls before they were dispersed to various buyers, he was looking at something he understood instantly.
2. Before: One hundred twenty-five years before Christ — more than eleven hundred years before the Leningrad Codex, which had been the oldest available Hebrew Old Testament manuscript before the Qumran discovery.
   After: One hundred twenty-five years before Christ, more than eleven hundred years before the Leningrad Codex, which had been the oldest available Hebrew Old Testament manuscript before the Qumran discovery.
3. Before: The thousand-year gap between the Qumran scrolls and the Masoretic text — a gap spanning the destruction of Jerusalem, the dispersion of the Jewish people, the rise and fall of empires, the emergence of Christianity and Islam — was crossed by scribes who preserved the text with extraordinary fidelity.
   After: The thousand-year gap between the Qumran scrolls and the Masoretic text (a gap spanning the destruction of Jerusalem, the dispersion of the Jewish people, the rise and fall of empires, the emergence of Christianity and Islam) was crossed by scribes who preserved the text with extraordinary fidelity.
4. Before: Chapter 53 of Isaiah — the Suffering Servant passage that Christians understand as a prophecy of Christ's atoning death — is essentially identical in the Dead Sea Scrolls Isaiah and the Masoretic text.
   After: Chapter 53 of Isaiah, the Suffering Servant passage that Christians understand as a prophecy of Christ's atoning death, is essentially identical in the Dead Sea Scrolls Isaiah and the Masoretic text.
5. Before: The Dead Sea Scrolls contain some variations that align with the Septuagint — the Greek translation of the Old Testament — rather than with the Masoretic text, which suggests that multiple textual traditions of the Hebrew Bible were in circulation in the Second Temple period, and that the Masoretic tradition, though dominant, was not the only version.
   After: The Dead Sea Scrolls contain some variations that align with the Septuagint, the Greek translation of the Old Testament, rather than with the Masoretic text, which suggests that multiple textual traditions of the Hebrew Bible were in circulation in the Second Temple period, and that the Masoretic tradition, though dominant, was not the only version.


## Chapter Five: The New Testament Under Fire — Evidence, Eyewitnesses, and Early Dating (`sec06.xhtml`)

Words 1,136 to 1,136. Em-dashes in his prose 16 to 0 (14.1 to 0.0 per 1,000 words). Tells 23 to 9 (20.2 to 7.9 per 1,000). Mean sentence 22.5 words to 22.5; sentences of eight words or fewer 20.0% to 20.0%; of five or fewer 8.0% to 8.0%. 12 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 16 to 0, not_but 1 to 1, NotX.Y 1 to 1, triplet 2 to 4, q_answered 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 19 Scripture references, 1 years, 21 numbers in digits, 20 number words, proper names by count, and 24 hedge words (after: 24) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The case against the New Testament's historical reliability has been made in many forms across two centuries of critical scholarship, but its most recent popular form — Bart Ehrman's Misquoting Jesus and the broader cultural narrative it represents — has been enormously influential.
   After: The case against the New Testament's historical reliability has been made in many forms across two centuries of critical scholarship, but its most recent popular form, Bart Ehrman's Misquoting Jesus and the broader cultural narrative it represents, has been enormously influential.
2. Before: What Paul includes in chapter fifteen is what scholars across the spectrum recognize as a pre-Pauline creed — a formulaic statement of the core gospel that existed before he wrote it down:
   After: What Paul includes in chapter fifteen is what scholars across the spectrum recognize as a pre-Pauline creed, a formulaic statement of the core gospel that existed before he wrote it down:
3. Before: This means we possess a formalized statement of the resurrection — naming specific witnesses, making specific claims about the sequence of appearances — within three to eight years of the crucifixion.
   After: This means we possess a formalized statement of the resurrection (naming specific witnesses, making specific claims about the sequence of appearances) within three to eight years of the crucifixion.
4. Before: The Apostolic Fathers — Clement, Ignatius, Polycarp, writing between 95 and 120 AD — quote from and allude to New Testament documents extensively.
   After: The Apostolic Fathers (Clement, Ignatius, Polycarp, writing between 95 and 120 AD) quote from and allude to New Testament documents extensively.
5. Before: What early dating means is that the New Testament documents were produced while eyewitnesses to the events they describe were still alive — and that is not a circumstance in which legendary embellishment flourishes.
   After: What early dating means is that the New Testament documents were produced while eyewitnesses to the events they describe were still alive, and that is not a circumstance in which legendary embellishment flourishes.


## Chapter Six: What the Archaeologist's Spade Found (`sec07.xhtml`)

Words 1,491 to 1,491. Em-dashes in his prose 16 to 0 (10.7 to 0.0 per 1,000 words). Tells 37 to 21 (24.8 to 14.1 per 1,000). Mean sentence 23.1 words to 23.1; sentences of eight words or fewer 22.2% to 22.2%; of five or fewer 12.7% to 12.7%. 11 edits; paragraphs 18 to 18. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 16 to 0, isnt_its 1 to 1, triplet 9 to 9, anaphora 7 to 7, intens 1 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 7 quoted strings, 27 Scripture references, 2 years, 23 numbers in digits, 37 number words, proper names by count, and 28 hedge words (after: 28) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: For most of the nineteenth and early twentieth century, the patriarchal narratives — the stories of Abraham, Isaac, Jacob, and their families — were considered legendary.
   After: For most of the nineteenth and early twentieth century, the patriarchal narratives, the stories of Abraham, Isaac, Jacob, and their families, were considered legendary.
2. Before: But it proved that the social world described in their stories belonged to the period those stories claim — a period that ended more than a thousand years before the critical scholars assumed the texts were composed.
   After: But it proved that the social world described in their stories belonged to the period those stories claim, a period that ended more than a thousand years before the critical scholars assumed the texts were composed.
3. Before: The stele also contains a reference that most scholars read as a mention of the "House of David" — different from the Tel Dan inscription but consistent with it.
   After: The stele also contains a reference that most scholars read as a mention of the "House of David," different from the Tel Dan inscription but consistent with it.
4. Before: Luke refers to the rulers of Thessalonica as "politarchs" (Acts 17:6), a precise administrative title that appeared in no other ancient literary source known to scholars, who initially cited the word as evidence of Luke's inaccuracy — until archaeological excavations produced inscriptions from Thessalonica using exactly this title.
   After: Luke refers to the rulers of Thessalonica as "politarchs" (Acts 17:6), a precise administrative title that appeared in no other ancient literary source known to scholars, who initially cited the word as evidence of Luke's inaccuracy, until archaeological excavations produced inscriptions from Thessalonica using exactly this title.
5. Before: The Exodus narrative and the Egyptian evidence remain one of the more contested areas — the question of which pharaoh, what route, and what archaeological signature the Exodus should have left in the record has generated more scholarly heat than any single topic in biblical archaeology.
   After: The Exodus narrative and the Egyptian evidence remain one of the more contested areas: the question of which pharaoh, what route, and what archaeological signature the Exodus should have left in the record has generated more scholarly heat than any single topic in biblical archaeology.


## Chapter Seven: The Hard Sayings — Living with Difficulty (`sec08.xhtml`)

Words 1,259 to 1,259. Em-dashes in his prose 15 to 0 (11.9 to 0.0 per 1,000 words). Tells 28 to 14 (22.2 to 11.1 per 1,000). Mean sentence 22.9 words to 22.9; sentences of eight words or fewer 20.0% to 20.0%; of five or fewer 9.1% to 9.1%. 10 edits; paragraphs 18 to 18. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 15 to 0, not_but 4 to 4, triplet 4 to 5, anaphora 1 to 1, intens 1 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 17 Scripture references, 0 years, 8 numbers in digits, 18 number words, proper names by count, and 25 hedge words (after: 25) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Some are morally difficult — the commands to exterminate Canaanite peoples in Joshua, the imprecatory psalms that call for violent revenge on enemies, the Levitical laws whose logic is not immediately apparent to modern readers.
   After: Some are morally difficult: the commands to exterminate Canaanite peoples in Joshua, the imprecatory psalms that call for violent revenge on enemies, the Levitical laws whose logic is not immediately apparent to modern readers.
2. Before: the writers are recording two different occasions when Jesus taught related material — Jesus almost certainly repeated his teachings in different forms for different audiences, as any traveling teacher does.
   After: the writers are recording two different occasions when Jesus taught related material; Jesus almost certainly repeated his teachings in different forms for different audiences, as any traveling teacher does.
3. Before: The Temple cleansing — placed by the Synoptics near the end of Jesus's ministry and by John near the beginning — is a genuine difficulty that has been discussed by scholars for centuries.
   After: The Temple cleansing, placed by the Synoptics near the end of Jesus's ministry and by John near the beginning, is a genuine difficulty that has been discussed by scholars for centuries.
4. Before: the Canaanite religious practices that the texts cite as the reason for destruction — child sacrifice, fertility cult prostitution, practices that would corrupt the covenant community Israel was called to be — were not invented as later justification but are documented in ancient Near Eastern sources.
   After: the Canaanite religious practices that the texts cite as the reason for destruction (child sacrifice, fertility cult prostitution, practices that would corrupt the covenant community Israel was called to be) were not invented as later justification but are documented in ancient Near Eastern sources.
5. Before: A text that is easy is a text that asks nothing of you, and what we have is a text that asks everything — including the willingness to sit inside difficulty without resolving it prematurely.
   After: A text that is easy is a text that asks nothing of you, and what we have is a text that asks everything, including the willingness to sit inside difficulty without resolving it prematurely.


## Chapter Eight: Dating, Authorship, and the Documentary Hypothesis (`sec09.xhtml`)

Words 996 to 996. Em-dashes in his prose 14 to 0 (14.1 to 0.0 per 1,000 words). Tells 26 to 12 (26.1 to 12.0 per 1,000). Mean sentence 26.9 words to 26.9; sentences of eight words or fewer 5.4% to 5.4%; of five or fewer 0.0% to 0.0%. 8 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 14 to 0, not_but 1 to 1, triplet 8 to 8, anaphora 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 15 Scripture references, 1 years, 12 numbers in digits, 28 number words, proper names by count, and 13 hedge words (after: 13) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: the Pentateuch — the first five books of the Old Testament — was not written by Moses but compiled from four separate literary sources, designated J, E, D, and P, each composed at a different period in Israelite history and stitched together by later editors into the final document.
   After: the Pentateuch, the first five books of the Old Testament, was not written by Moses but compiled from four separate literary sources, designated J, E, D, and P, each composed at a different period in Israelite history and stitched together by later editors into the final document.
2. Before: By the 1970s, scholars like Rolf Rendtorff and Erhard Blum were arguing that the classic four-source division was not supportable, because the criteria Wellhausen used to identify the sources — the divine names, doublets in the narrative, vocabulary differences — turned out to be unreliable indicators.
   After: By the 1970s, scholars like Rolf Rendtorff and Erhard Blum were arguing that the classic four-source division was not supportable, because the criteria Wellhausen used to identify the sources (the divine names, doublets in the narrative, vocabulary differences) turned out to be unreliable indicators.
3. Before: The conservative position — that Moses composed the substantive core of the Pentateuch, with possible later editorial additions — is not maintained by ignoring the scholarship.
   After: The conservative position (that Moses composed the substantive core of the Pentateuch, with possible later editorial additions) is not maintained by ignoring the scholarship.
4. Before: If you exclude supernatural prediction as a category, then you must explain the second half of Isaiah as composed after the events it appears to foretell — because it names Cyrus of Persia specifically.
   After: If you exclude supernatural prediction as a category, then you must explain the second half of Isaiah as composed after the events it appears to foretell, because it names Cyrus of Persia specifically.
5. Before: The Pauline authorship questions — regarding 1 and 2 Timothy, Titus, Ephesians, Colossians, and 2 Thessalonians — involve genuine scholarly debate about vocabulary statistics, theological emphases, and historical setting.
   After: The Pauline authorship questions (regarding 1 and 2 Timothy, Titus, Ephesians, Colossians, and 2 Thessalonians) involve genuine scholarly debate about vocabulary statistics, theological emphases, and historical setting.


## Chapter Nine: What the Church Has Always Believed — A History of the Doctrine of Scripture (`sec10.xhtml`)

Words 1,007 to 1,007. Em-dashes in his prose 10 to 0 (9.9 to 0.0 per 1,000 words). Tells 23 to 13 (22.8 to 12.9 per 1,000). Mean sentence 19.3 words to 19.3; sentences of eight words or fewer 27.3% to 27.3%; of five or fewer 11.4% to 11.4%. 7 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, NotX.Y 3 to 3, isnt_its 1 to 1, triplet 5 to 5, colon_reveal 1 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 9 quoted strings, 0 Scripture references, 3 years, 3 numbers in digits, 17 number words, proper names by count, and 12 hedge words (after: 12) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Origen, writing in the third century, articulates a doctrine in which the Holy Spirit is the ultimate author of Scripture and the human writers are instruments — and the implication of divine authorship is the impossibility of error, since it would be unworthy of the Spirit to speak falsely.
   After: Origen, writing in the third century, articulates a doctrine in which the Holy Spirit is the ultimate author of Scripture and the human writers are instruments, and the implication of divine authorship is the impossibility of error, since it would be unworthy of the Spirit to speak falsely.
2. Before: Martin Luther, who believed the church needed reformation in many things, did not believe the doctrine of Scripture's authority needed reformation; for Luther, Scripture was the norma normans — the norming norm — the standard by which all other claims were evaluated and by which the church stood or fell.
   After: Martin Luther, who believed the church needed reformation in many things, did not believe the doctrine of Scripture's authority needed reformation; for Luther, Scripture was the norma normans (the norming norm), the standard by which all other claims were evaluated and by which the church stood or fell.
3. Before: It is the consistent position of the church across its entire history — East and West, pre-Reformation and post-Reformation.
   After: It is the consistent position of the church across its entire history: East and West, pre-Reformation and post-Reformation.
4. Before: The Statement explicitly acknowledges "the use of round numbers, free citations, topical arrangements of material, variant selections of material" as fully compatible with inerrancy, and it treats phenomenological language — speaking of the "sun rising," describing events from the observer's perspective — as not implying a false cosmology.
   After: The Statement explicitly acknowledges "the use of round numbers, free citations, topical arrangements of material, variant selections of material" as fully compatible with inerrancy, and it treats phenomenological language (speaking of the "sun rising," describing events from the observer's perspective) as not implying a false cosmology.
5. Before: if the text can be errant in historical detail, we need a principle for determining where it errs, and that principle, inevitably, becomes our own judgment — our contemporary knowledge, our current moral sensibilities, our cultural framework.
   After: if the text can be errant in historical detail, we need a principle for determining where it errs, and that principle, inevitably, becomes our own judgment: our contemporary knowledge, our current moral sensibilities, our cultural framework.


## Chapter Ten: When the Culture Says All Texts Are Suspect (`sec11.xhtml`)

Words 884 to 884. Em-dashes in his prose 12 to 0 (13.6 to 0.0 per 1,000 words). Tells 25 to 14 (28.3 to 15.8 per 1,000). Mean sentence 20.3 words to 20.3; sentences of eight words or fewer 25.6% to 25.6%; of five or fewer 18.6% to 18.6%. 8 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 12 to 0, isnt_its 2 to 2, triplet 4 to 4, intens 4 to 4, q_answered 1 to 1, colon_reveal 1 to 2, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 0 Scripture references, 0 years, 2 numbers in digits, 8 number words, proper names by count, and 12 hedge words (after: 12) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: It is more like a humidity — the climate in which all other ideas form.
   After: It is more like a humidity: the climate in which all other ideas form.
2. Before: The postmodern critic occupies a social position as surely as the bishop defending orthodoxy; their critique of power presupposes a standpoint from which they can see the power dynamics — but where does that standpoint come from?
   After: The postmodern critic occupies a social position as surely as the bishop defending orthodoxy; their critique of power presupposes a standpoint from which they can see the power dynamics, but where does that standpoint come from?
3. Before: Taylor argues that the secular age — the age in which religious belief has become optional rather than default — is not the result of evidence establishing that religious claims are false; it is the result of a long series of philosophical moves that created what Taylor calls "the immanent frame":
   After: Taylor argues that the secular age, the age in which religious belief has become optional rather than default, is not the result of evidence establishing that religious claims are false; it is the result of a long series of philosophical moves that created what Taylor calls "the immanent frame":
4. Before: But the immanent frame is itself a construction — a particular way of seeing that became so habitual it stopped seeming like a choice.
   After: But the immanent frame is itself a construction, a particular way of seeing that became so habitual it stopped seeming like a choice.
5. Before: A genuine historicism — one that follows the evidence wherever it leads rather than excluding categories of evidence on philosophical grounds — must be open to the possibility that unusual events occurred, and then ask what the evidence says about whether they did.
   After: A genuine historicism, one that follows the evidence wherever it leads rather than excluding categories of evidence on philosophical grounds, must be open to the possibility that unusual events occurred, and then ask what the evidence says about whether they did.


## Chapter Eleven: Reading the Bible Right — Genre, Hermeneutics, and Honest Interpretation (`sec12.xhtml`)

Words 1,116 to 1,116. Em-dashes in his prose 12 to 0 (10.8 to 0.0 per 1,000 words). Tells 25 to 14 (22.4 to 12.5 per 1,000). Mean sentence 20.7 words to 20.7; sentences of eight words or fewer 11.1% to 11.1%; of five or fewer 1.9% to 1.9%. 9 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 12 to 0, not_but 1 to 1, isnt_its 2 to 2, triplet 6 to 7, stock 1 to 1, intens 2 to 2, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 16 Scripture references, 0 years, 8 numbers in digits, 12 number words, proper names by count, and 14 hedge words (after: 14) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The trouble begins when modern Western readers bring a single posture to the entire Bible and apply it uniformly — either the novel posture, which assumes the text is imaginative rather than factual, or the newspaper posture, which assumes modern precision throughout.
   After: The trouble begins when modern Western readers bring a single posture to the entire Bible and apply it uniformly: either the novel posture, which assumes the text is imaginative rather than factual, or the newspaper posture, which assumes modern precision throughout.
2. Before: When Psalm 98 calls on the rivers to clap their hands, nobody — not the psalmist, not the original audience, not the responsible modern reader — believes rivers have hands.
   After: When Psalm 98 calls on the rivers to clap their hands, nobody, not the psalmist, not the original audience, not the responsible modern reader, believes rivers have hands.
3. Before: The imagery is meant to communicate reality — but through symbol, not through literal report.
   After: The imagery is meant to communicate reality, but through symbol, not through literal report.
4. Before: Its closest parallels in the ancient Near East are texts like Enuma Elish, the Babylonian creation account — and yet Genesis 1 is not simply another ancient Near Eastern cosmogony.
   After: Its closest parallels in the ancient Near East are texts like Enuma Elish, the Babylonian creation account, and yet Genesis 1 is not simply another ancient Near Eastern cosmogony.
5. Before: Not entirely — there are genuine exegetical and theological questions on all sides.
   After: Not entirely; there are genuine exegetical and theological questions on all sides.


## Chapter Twelve: The Internal Testimony — What Scripture Claims About Itself (`sec13.xhtml`)

Words 942 to 942. Em-dashes in his prose 13 to 0 (13.8 to 0.0 per 1,000 words). Tells 25 to 12 (26.5 to 12.7 per 1,000). Mean sentence 21.3 words to 22.3; sentences of eight words or fewer 15.9% to 9.5%; of five or fewer 9.1% to 2.4%. 10 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 2 to 2; runs of three fragments 0 to 0.

By kind (before to after): emdash 13 to 0, not_but 2 to 2, isnt_its 1 to 1, triplet 3 to 3, intens 2 to 2, short_close 2 to 2, one_line_para 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 4 quoted strings, 8 Scripture references, 0 years, 6 numbers in digits, 5 number words, proper names by count, and 13 hedge words (after: 13) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: We attend to it because understanding what the text claims about itself is prerequisite to evaluating the claim — and you cannot assess whether a document's self-description is accurate if you have not first determined what the self-description is.
   After: We attend to it because understanding what the text claims about itself is prerequisite to evaluating the claim, and you cannot assess whether a document's self-description is accurate if you have not first determined what the self-description is.
2. Before: The claim that Scripture is "God-breathed" places the origin of the text in the same category as that divine creative activity — not a human invention that God later endorsed, but a text whose origin is in God's own utterance.
   After: The claim that Scripture is "God-breathed" places the origin of the text in the same category as that divine creative activity, not a human invention that God later endorsed, but a text whose origin is in God's own utterance.
3. Before: The theological category that holds both divine authorship and human diversity together is concursive inspiration — the idea that God superintended the human process of writing in such a way that what was produced was precisely what God intended, without overriding the writers' personalities, experiences, or literary gifts.
   After: The theological category that holds both divine authorship and human diversity together is concursive inspiration, the idea that God superintended the human process of writing in such a way that what was produced was precisely what God intended, without overriding the writers' personalities, experiences, or literary gifts.
4. Before: If Jesus rose from the dead — if the resurrection testimony is early, multiple, and circumstantially specific in the way we have established — then his claims deserve a level of epistemic confidence different from the claims of anyone who has not demonstrated that kind of authority.
   After: If Jesus rose from the dead, if the resurrection testimony is early, multiple, and circumstantially specific in the way we have established, then his claims deserve a level of epistemic confidence different from the claims of anyone who has not demonstrated that kind of authority.
5. Before: But now that we have established the credibility of the text by external means — manuscript evidence, early dating, archaeological confirmation — the internal testimony carries its full weight.
   After: But now that we have established the credibility of the text by external means (manuscript evidence, early dating, archaeological confirmation), the internal testimony carries its full weight.


## Chapter Thirteen: Why It Still Matters — Living from the Authority of Scripture (`sec14.xhtml`)

Words 1,556 to 1,556. Em-dashes in his prose 16 to 0 (10.3 to 0.0 per 1,000 words). Tells 51 to 35 (32.8 to 22.5 per 1,000). Mean sentence 17.3 words to 17.3; sentences of eight words or fewer 33.3% to 33.3%; of five or fewer 22.2% to 22.2%. 11 edits; paragraphs 17 to 17. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 16 to 0, not_but 6 to 6, NotX.Y 4 to 4, isnt_its 1 to 1, triplet 5 to 5, anaphora 14 to 14, stock 1 to 1, intens 2 to 2, q_answered 1 to 1, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 13 number words, proper names by count, and 22 hedge words (after: 22) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: She is older now, and the sharp clarity of that college classroom moment — the excitement of having found the questions nobody in her church could answer — has been replaced by something more complicated.
   After: She is older now, and the sharp clarity of that college classroom moment, the excitement of having found the questions nobody in her church could answer, has been replaced by something more complicated.
2. Before: The evidence we have examined for the past twelve chapters has been building toward this question — not toward a library project, but toward a life.
   After: The evidence we have examined for the past twelve chapters has been building toward this question, not toward a library project, but toward a life.
3. Before: If the text is unreliable — if it is a human document produced by ordinary processes subject to ordinary errors and ordinary corruption — then it is a book among books, useful perhaps, interesting certainly, but not the kind of foundation on which a life can actually be built.
   After: If the text is unreliable, if it is a human document produced by ordinary processes subject to ordinary errors and ordinary corruption, then it is a book among books, useful perhaps, interesting certainly, but not the kind of foundation on which a life can actually be built.
4. Before: It is the hardest thing the Bible asks of us — not to let it say what we want it to say, but to let it say what it actually says.
   After: It is the hardest thing the Bible asks of us: not to let it say what we want it to say, but to let it say what it actually says.
5. Before: But what the Bible also says — and what the lives of people who have built on it have demonstrated, across twenty centuries, in every culture and every language — is that this costly life is the only life that corresponds to the truth of what you are.
   After: But what the Bible also says (and what the lives of people who have built on it have demonstrated, across twenty centuries, in every culture and every language) is that this costly life is the only life that corresponds to the truth of what you are.


## Chapter Fourteen: Eyewitness Testimony and the Four Gospels (`sec15.xhtml`)

Words 1,233 to 1,233. Em-dashes in his prose 15 to 0 (12.2 to 0.0 per 1,000 words). Tells 24 to 11 (19.5 to 8.9 per 1,000). Mean sentence 24.1 words to 24.1; sentences of eight words or fewer 12.8% to 12.8%; of five or fewer 2.1% to 2.1%. 11 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 15 to 0, not_but 2 to 2, not_just 1 to 1, triplet 5 to 6, colon_reveal 0 to 1, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 1 quoted strings, 22 Scripture references, 1 years, 11 numbers in digits, 14 number words, proper names by count, and 19 hedge words (after: 19) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Bauckham argued that the four Gospels are not folk literature — the product of anonymous traditions passed through communities over generations, losing historical particularity and gaining theological embellishment as they traveled.
   After: Bauckham argued that the four Gospels are not folk literature, the product of anonymous traditions passed through communities over generations, losing historical particularity and gaining theological embellishment as they traveled.
2. Before: Jairus, the synagogue ruler whose daughter Jesus raises, is named in Mark 5:22 and Luke 8:41 but unnamed in Matthew 9:18 — a variation Bauckham argues reflects Matthew's practice of dropping the name once the individual was no longer available to confirm the account.
   After: Jairus, the synagogue ruler whose daughter Jesus raises, is named in Mark 5:22 and Luke 8:41 but unnamed in Matthew 9:18, a variation Bauckham argues reflects Matthew's practice of dropping the name once the individual was no longer available to confirm the account.
3. Before: Throughout the Gospel narratives a pattern emerges in which Jesus is accompanied by a small group of disciples, and within that group an even smaller inner circle of three — Peter, James, and John — present at moments others are not. Peter is consistently the most active character in the narratives, constantly speaking, acting, failing, recovering; in Mark in particular, his behavior is narrated with a frankness that borders on embarrassing — his impetuous speech, his misunderstanding of key moments, his denial.
   After: Throughout the Gospel narratives a pattern emerges in which Jesus is accompanied by a small group of disciples, and within that group an even smaller inner circle of three (Peter, James, and John) present at moments others are not. Peter is consistently the most active character in the narratives, constantly speaking, acting, failing, recovering; in Mark in particular, his behavior is narrated with a frankness that borders on embarrassing: his impetuous speech, his misunderstanding of key moments, his denial.
4. Before: It is the independent accounts — different in incidental detail but consistent in substance — that carry the marks of genuine independent witness.
   After: It is the independent accounts, different in incidental detail but consistent in substance, that carry the marks of genuine independent witness.
5. Before: They are, at their core, the testimony of people who were there — filtered through the theological and literary purposes of the evangelists, shaped by the communities in which they were produced, but grounded in the actual history of what Jesus did and said.
   After: They are, at their core, the testimony of people who were there, filtered through the theological and literary purposes of the evangelists, shaped by the communities in which they were produced, but grounded in the actual history of what Jesus did and said.


## Chapter Fifteen: Prophecy, Fulfillment, and the Coherence of Two Testaments (`sec16.xhtml`)

Words 1,219 to 1,219. Em-dashes in his prose 14 to 0 (11.5 to 0.0 per 1,000 words). Tells 29 to 15 (23.8 to 12.3 per 1,000). Mean sentence 27.8 words to 27.8; sentences of eight words or fewer 7.0% to 7.0%; of five or fewer 4.7% to 4.7%. 10 edits; paragraphs 15 to 15. Paragraphs of fifteen words or fewer 2 to 2; runs of three fragments 0 to 0.

By kind (before to after): emdash 14 to 0, not_but 2 to 2, not_just 1 to 1, isnt_its 2 to 2, triplet 7 to 7, intens 1 to 1, one_line_para 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 9 quoted strings, 29 Scripture references, 0 years, 19 numbers in digits, 22 number words, proper names by count, and 15 hedge words (after: 15) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: the New Testament makes sense only as the fulfillment of the Old — not in the vague sense that one religious text draws on another, but in the specific, numerically substantial sense that the life, death, and resurrection of Jesus of Nazareth corresponds to a pattern of expectation embedded in the Hebrew Scriptures across hundreds of years, produced by dozens of authors in different literary genres, representing traditions that were not in communication with each other and that in some cases postdate by centuries the events they are said to predict.
   After: the New Testament makes sense only as the fulfillment of the Old, not in the vague sense that one religious text draws on another, but in the specific, numerically substantial sense that the life, death, and resurrection of Jesus of Nazareth corresponds to a pattern of expectation embedded in the Hebrew Scriptures across hundreds of years, produced by dozens of authors in different literary genres, representing traditions that were not in communication with each other and that in some cases postdate by centuries the events they are said to predict.
2. Before: Genesis 3:15 speaks of a seed of the woman who will crush the serpent's head — a promise of decisive divine action through a human agent.
   After: Genesis 3:15 speaks of a seed of the woman who will crush the serpent's head, a promise of decisive divine action through a human agent.
3. Before: The "Israel" interpretation struggles with the singular forms throughout the passage and with the statement that the servant bears the sin of "the many" — hard to read as Israel bearing the sin of Israel.
   After: The "Israel" interpretation struggles with the singular forms throughout the passage and with the statement that the servant bears the sin of "the many," hard to read as Israel bearing the sin of Israel.
4. Before: Zechariah 11:12-13 describes thirty pieces of silver paid for a shepherd who is rejected — and the money being thrown "to the potter.
   After: Zechariah 11:12-13 describes thirty pieces of silver paid for a shepherd who is rejected, and the money being thrown "to the potter.
5. Before: The evidence — particularly the early dating of the Gospels, the multiple attestation of key events, and the specificity of details that would have been impossible to control — weighs, on balance, toward the former.
   After: The evidence (particularly the early dating of the Gospels, the multiple attestation of key events, and the specificity of details that would have been impossible to control) weighs, on balance, toward the former.


## Chapter Sixteen: The Resurrection — The Historical Core of Everything (`sec17.xhtml`)

Words 1,188 to 1,188. Em-dashes in his prose 21 to 0 (17.7 to 0.0 per 1,000 words). Tells 34 to 13 (28.6 to 10.9 per 1,000). Mean sentence 23.3 words to 24.3; sentences of eight words or fewer 24.0% to 20.8%; of five or fewer 16.0% to 12.5%. 14 edits; paragraphs 13 to 13. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 0.

By kind (before to after): emdash 21 to 0, not_but 1 to 1, not_just 1 to 1, NotX.Y 2 to 2, triplet 4 to 5, frag3 1 to 0, colon_reveal 2 to 2, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 4 quoted strings, 8 Scripture references, 0 years, 9 numbers in digits, 22 number words, proper names by count, and 20 hedge words (after: 20) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Not the manuscript tradition, not the archaeological evidence, not the eyewitness testimony, not the fulfilled prophecy — all of it, every argument in every chapter, is a prologue to a story that would be fiction if the tomb were not empty.
   After: Not the manuscript tradition, not the archaeological evidence, not the eyewitness testimony, not the fulfilled prophecy: all of it, every argument in every chapter, is a prologue to a story that would be fiction if the tomb were not empty.
2. Before: Roman crucifixion was effective — the Romans had refined it into a reliable execution method — and no credible historian, Christian or secular, doubts that Jesus of Nazareth was executed under Pontius Pilate, probably in 30 or 33 AD.
   After: Roman crucifixion was effective (the Romans had refined it into a reliable execution method), and no credible historian, Christian or secular, doubts that Jesus of Nazareth was executed under Pontius Pilate, probably in 30 or 33 AD.
3. Before: Paul is writing approximately 25 years after the crucifixion, describing himself as the last to receive an appearance, and inviting his readers to consult the other witnesses — "most of whom are still alive.
   After: Paul is writing approximately 25 years after the crucifixion, describing himself as the last to receive an appearance, and inviting his readers to consult the other witnesses: "most of whom are still alive.
4. Before: why would you fabricate a claim and then die for it — not die in a moment of passion but live out years of suffering, imprisonment, and eventual execution rather than recant?
   After: why would you fabricate a claim and then die for it, not die in a moment of passion but live out years of suffering, imprisonment, and eventual execution rather than recant?
5. Before: And the result was a movement that produced the most examined, most attacked, most defended document in the history of human civilization — a document that, two thousand years later, is still being read, still being trusted, still being lived by people on every continent in every language.
   After: And the result was a movement that produced the most examined, most attacked, most defended document in the history of human civilization, a document that, two thousand years later, is still being read, still being trusted, still being lived by people on every continent in every language.


## Chapter Seventeen: The Transmission of Meaning — Translation, Language, and Trust (`sec18.xhtml`)

Words 815 to 815. Em-dashes in his prose 10 to 0 (12.3 to 0.0 per 1,000 words). Tells 21 to 11 (25.8 to 13.5 per 1,000). Mean sentence 27.2 words to 27.2; sentences of eight words or fewer 6.7% to 6.7%; of five or fewer 6.7% to 6.7%. 7 edits; paragraphs 8 to 8. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, not_but 1 to 1, not_just 1 to 1, isnt_its 1 to 1, triplet 4 to 4, intens 1 to 1, q_answered 1 to 1, colon_reveal 1 to 1, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 1 quoted strings, 1 Scripture references, 1 years, 1 numbers in digits, 15 number words, proper names by count, and 10 hedge words (after: 10) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Greek is inflected — it uses word endings rather than word order to signal grammatical relationships — which means a Greek sentence can arrange its words in an order that produces an emphasis a literal English rendering cannot capture.
   After: Greek is inflected (it uses word endings rather than word order to signal grammatical relationships), which means a Greek sentence can arrange its words in an order that produces an emphasis a literal English rendering cannot capture.
2. Before: They indicate that translation involves genuine judgment calls — choices between word options, decisions about how to render a Greek idiom in English, decisions about whether to follow a formal equivalence approach that preserves the structure of the original as much as possible or a functional equivalence approach that conveys the meaning as naturally as possible in the target language.
   After: They indicate that translation involves genuine judgment calls: choices between word options, decisions about how to render a Greek idiom in English, decisions about whether to follow a formal equivalence approach that preserves the structure of the original as much as possible or a functional equivalence approach that conveys the meaning as naturally as possible in the target language.
3. Before: Wycliffe's English translation in the fourteenth century, Tyndale's in the sixteenth, the King James Bible in 1611 — each generation produced translations from the available manuscript evidence, using the linguistic tools of its time.
   After: Wycliffe's English translation in the fourteenth century, Tyndale's in the sixteenth, the King James Bible in 1611: each generation produced translations from the available manuscript evidence, using the linguistic tools of its time.
4. Before: The theological DNA of the text — the character of God, the reality of human sin, the nature of redemption, the identity and work of Jesus Christ — survives translation into every language because it is embedded in the structure of the text, not in the specific vocabulary of any single linguistic rendering.
   After: The theological DNA of the text (the character of God, the reality of human sin, the nature of redemption, the identity and work of Jesus Christ) survives translation into every language because it is embedded in the structure of the text, not in the specific vocabulary of any single linguistic rendering.
5. Before: It is addressed to every human being in every culture, because it addresses the condition every human being shares — the condition of being a created being in need of a Creator, a broken person in need of restoration.
   After: It is addressed to every human being in every culture, because it addresses the condition every human being shares: the condition of being a created being in need of a Creator, a broken person in need of restoration.


## Chapter Eighteen: When Faith and Doubt Inhabit the Same Room (`sec19.xhtml`)

Words 964 to 964. Em-dashes in his prose 9 to 0 (9.3 to 0.0 per 1,000 words). Tells 26 to 17 (27.0 to 17.6 per 1,000). Mean sentence 21.9 words to 21.9; sentences of eight words or fewer 28.6% to 28.6%; of five or fewer 9.5% to 9.5%. 8 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 9 to 0, not_but 4 to 4, NotX.Y 1 to 1, triplet 2 to 2, anaphora 6 to 6, intens 1 to 1, colon_reveal 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 15 number words, proper names by count, and 6 hedge words (after: 6) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: I had gone to his office carrying a question I had held for months — not a textbook question but a real one, the kind that does not let you sleep.
   After: I had gone to his office carrying a question I had held for months, not a textbook question but a real one, the kind that does not let you sleep.
2. Before: It is the posture I want to commend — not the posture of the person who refuses to ask because the asking threatens faith, and not the posture of the person who mistakes doubt for wisdom and settles into a permanent suspension of judgment to avoid the cost of commitment, but the posture of one who takes the questions seriously, follows the evidence honestly, and arrives, with eyes open, at a conclusion that can be held with integrity even in the presence of unresolved difficulties.
   After: It is the posture I want to commend: not the posture of the person who refuses to ask because the asking threatens faith, and not the posture of the person who mistakes doubt for wisdom and settles into a permanent suspension of judgment to avoid the cost of commitment, but the posture of one who takes the questions seriously, follows the evidence honestly, and arrives, with eyes open, at a conclusion that can be held with integrity even in the presence of unresolved difficulties.
3. Before: A church that trusts the case can engage the questions with the equanimity of the professor in that office — naming the difficulties honestly, working through the evidence carefully, acknowledging what is not known, and arriving at the considered conclusion that the evidence supports trust.
   After: A church that trusts the case can engage the questions with the equanimity of the professor in that office, naming the difficulties honestly, working through the evidence carefully, acknowledging what is not known, and arriving at the considered conclusion that the evidence supports trust.
4. Before: She was wrong — or the community was wrong — to read the silence that followed as proof that the questions were unanswerable.
   After: She was wrong, or the community was wrong, to read the silence that followed as proof that the questions were unanswerable.
5. Before: I hold this conclusion with confidence — not with a certainty that requires no faith, because there is no certainty in this domain that requires no faith, but with the confidence that comes from having followed the argument honestly, having engaged the strongest objections, having sat with the genuine difficulties, and having found that the ground holds.
   After: I hold this conclusion with confidence, not with a certainty that requires no faith, because there is no certainty in this domain that requires no faith, but with the confidence that comes from having followed the argument honestly, having engaged the strongest objections, having sat with the genuine difficulties, and having found that the ground holds.


## Chapter Nineteen: The Bible in the Life of the Church — Two Thousand Years of Evidence (`sec20.xhtml`)

Words 978 to 978. Em-dashes in his prose 14 to 0 (14.3 to 0.0 per 1,000 words). Tells 37 to 25 (37.8 to 25.6 per 1,000). Mean sentence 20.8 words to 22.2; sentences of eight words or fewer 29.8% to 27.3%; of five or fewer 10.6% to 11.4%. 10 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 14 to 0, not_but 1 to 1, not_just 1 to 1, isnt_its 1 to 1, triplet 6 to 8, anaphora 8 to 8, stock 1 to 1, intens 1 to 1, colon_reveal 1 to 1, short_close 2 to 2, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 17 number words, proper names by count, and 4 hedge words (after: 4) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: I am not suggesting that pragmatic evidence — this works, therefore it is true — is sufficient.
   After: I am not suggesting that pragmatic evidence (this works, therefore it is true) is sufficient.
2. Before: Within three hundred years of the crucifixion of a Jewish carpenter in a minor province of the empire, Christianity had spread through every stratum of Roman society, from slaves to senators, and had produced a literary output — the New Testament, the Apostolic Fathers, the Apologists, the great theological works of the third century — that shaped the intellectual history of the next two thousand years.
   After: Within three hundred years of the crucifixion of a Jewish carpenter in a minor province of the empire, Christianity had spread through every stratum of Roman society, from slaves to senators, and had produced a literary output (the New Testament, the Apostolic Fathers, the Apologists, the great theological works of the third century) that shaped the intellectual history of the next two thousand years.
3. Before: And yet it spread — through the Mediterranean world, through North Africa, through Persia, through the European continent, through Asia Minor, through Ethiopia and India and Armenia.
   After: And yet it spread, through the Mediterranean world, through North Africa, through Persia, through the European continent, through Asia Minor, through Ethiopia and India and Armenia.
4. Before: The hospital, which was a Christian invention — the systematic care of the sick and dying as a religious obligation.
   After: The hospital, which was a Christian invention: the systematic care of the sick and dying as a religious obligation.
5. Before: They are not the inevitable result of trusting the text — the history shows that the text can be misused as easily as used — but they are evidence that when the text is received as it asks to be received, as the living word of the God who is love, requiring a response of love toward God and neighbor, it produces something that the world, at its most honest, recognizes as genuinely good.
   After: They are not the inevitable result of trusting the text (the history shows that the text can be misused as easily as used), but they are evidence that when the text is received as it asks to be received, as the living word of the God who is love, requiring a response of love toward God and neighbor, it produces something that the world, at its most honest, recognizes as genuinely good.


## Chapter Twenty: What Remains After the Argument — A Word to the Persuaded and the Still-Uncertain (`sec21.xhtml`)

Words 659 to 659. Em-dashes in his prose 5 to 0 (7.6 to 0.0 per 1,000 words). Tells 14 to 9 (21.2 to 13.7 per 1,000). Mean sentence 25.0 words to 25.0; sentences of eight words or fewer 30.8% to 30.8%; of five or fewer 19.2% to 19.2%. 4 edits; paragraphs 9 to 9. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 5 to 0, not_but 2 to 2, NotX.Y 1 to 1, triplet 2 to 2, frag3 1 to 1, anaphora 1 to 1, colon_reveal 1 to 1, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 2 Scripture references, 0 years, 0 numbers in digits, 7 number words, proper names by count, and 5 hedge words (after: 5) compared.

4 pairs (all there are), taken at even intervals through the chapter:

1. Before: The first is the person who has followed the argument of this book and has found it persuasive — who has arrived at the end with a conviction that was not quite there at the beginning, or that was there but shaky and is now more stable, and who feels the ground firmer underfoot.
   After: The first is the person who has followed the argument of this book and has found it persuasive, who has arrived at the end with a conviction that was not quite there at the beginning, or that was there but shaky and is now more stable, and who feels the ground firmer underfoot.
2. Before: You are joining the company of Abraham, who trusted a word he did not fully understand; of David, who found in the Psalms a language for the whole range of his experience — the triumph, the failure, the abandonment, the return; of the disciples, who followed a man they did not fully understand and were rebuilt by an encounter with him they could not have anticipated; of Augustine, who resisted for years and then found that his restless heart had been made for the rest he was avoiding; of John Newton, the slave trader who encountered grace and wrote it down so that generations could sing it.
   After: You are joining the company of Abraham, who trusted a word he did not fully understand; of David, who found in the Psalms a language for the whole range of his experience (the triumph, the failure, the abandonment, the return); of the disciples, who followed a man they did not fully understand and were rebuilt by an encounter with him they could not have anticipated; of Augustine, who resisted for years and then found that his restless heart had been made for the rest he was avoiding; of John Newton, the slave trader who encountered grace and wrote it down so that generations could sing it.
3. Before: To the second person — the one who remains uncertain — I respect your uncertainty more than I respect cheap conviction.
   After: To the second person, the one who remains uncertain, I respect your uncertainty more than I respect cheap conviction.
4. Before: I made the crossing a long time ago, and I have not regretted it for a single day — not because life has been easy, not because every question has been answered, not because the faith has cost me nothing, but because on the other side of the crossing I found that the text told the truth about the world and about myself; that the God it describes is the God who is; that the grace it offers is the grace that holds.
   After: I made the crossing a long time ago, and I have not regretted it for a single day, not because life has been easy, not because every question has been answered, not because the faith has cost me nothing, but because on the other side of the crossing I found that the text told the truth about the world and about myself; that the God it describes is the God who is; that the grace it offers is the grace that holds.


## Chapter Twenty-One: The Septuagint, the Apocrypha, and the Boundaries of the Canon (`sec22.xhtml`)

Words 864 to 864. Em-dashes in his prose 13 to 0 (15.0 to 0.0 per 1,000 words). Tells 19 to 7 (22.0 to 8.1 per 1,000). Mean sentence 24.7 words to 24.7; sentences of eight words or fewer 5.7% to 5.7%; of five or fewer 2.9% to 2.9%. 9 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 13 to 0, not_but 1 to 1, triplet 2 to 2, intens 3 to 3, colon_reveal 0 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 4 numbers in digits, 22 number words, proper names by count, and 15 hedge words (after: 15) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: why do Catholic Bibles have more books than Protestant Bibles, and does the difference mean that somebody made an error — either in including the extra books or in excluding them?
   After: why do Catholic Bibles have more books than Protestant Bibles, and does the difference mean that somebody made an error, either in including the extra books or in excluding them?
2. Before: And the Septuagint included books that were not in the Hebrew canon recognized by Palestinian Judaism — the deuterocanonical books named above.
   After: And the Septuagint included books that were not in the Hebrew canon recognized by Palestinian Judaism: the deuterocanonical books named above.
3. Before: When the Protestant Reformation in the sixteenth century returned to the Hebrew canon — the canon recognized by Palestinian Judaism and formalized at Jamnia around 90 AD — it excluded the deuterocanonical books from Scripture proper while often retaining them in a separate section for edification.
   After: When the Protestant Reformation in the sixteenth century returned to the Hebrew canon (the canon recognized by Palestinian Judaism and formalized at Jamnia around 90 AD), it excluded the deuterocanonical books from Scripture proper while often retaining them in a separate section for edification.
4. Before: Jerome, who produced the Latin Vulgate and was the greatest biblical scholar of the early church, shared these doubts about the deuterocanonical books and expressed them explicitly in his prefaces — even as the church required him to translate them.
   After: Jerome, who produced the Latin Vulgate and was the greatest biblical scholar of the early church, shared these doubts about the deuterocanonical books and expressed them explicitly in his prefaces, even as the church required him to translate them.
5. Before: The outcome — the common canon shared by virtually all Christian traditions — represents the settled conviction of an enormous, diverse, multi-century community that these books bear the marks of divine origin in a way that no other texts do.
   After: The outcome, the common canon shared by virtually all Christian traditions, represents the settled conviction of an enormous, diverse, multi-century community that these books bear the marks of divine origin in a way that no other texts do.


## Chapter Twenty-Two: The Bible and Science — Where the Conflict Is Real and Where It Isn't (`sec23.xhtml`)

Words 885 to 885. Em-dashes in his prose 14 to 0 (15.8 to 0.0 per 1,000 words). Tells 23 to 9 (26.0 to 10.2 per 1,000). Mean sentence 21.8 words to 21.8; sentences of eight words or fewer 26.3% to 26.3%; of five or fewer 10.5% to 10.5%. 8 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 14 to 0, triplet 5 to 5, anaphora 1 to 1, intens 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 8 quoted strings, 3 Scripture references, 0 years, 5 numbers in digits, 18 number words, proper names by count, and 22 hedge words (after: 22) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: science has established a picture of the universe — its age, its origins, the mechanisms by which life developed — that contradicts the Bible's account.
   After: science has established a picture of the universe (its age, its origins, the mechanisms by which life developed) that contradicts the Bible's account.
2. Before: It is a question about the interpretation of Genesis 1 — about what the text is claiming, and whether it makes specific claims about timing and mechanism or whether it makes claims only about the who and the why of creation.
   After: It is a question about the interpretation of Genesis 1, about what the text is claiming, and whether it makes specific claims about timing and mechanism or whether it makes claims only about the who and the why of creation.
3. Before: The historical Adam question — whether the biblical account of Adam and Eve requires the existence of a single ancestral pair from whom all of humanity descended, and how this relates to the population genetics evidence — is a genuine question that careful theologians and scientists are working through.
   After: The historical Adam question (whether the biblical account of Adam and Eve requires the existence of a single ancestral pair from whom all of humanity descended, and how this relates to the population genetics evidence) is a genuine question that careful theologians and scientists are working through.
4. Before: The existence of God, the creation of the universe from nothing, the special status of human beings as image-bearers, the reality of human moral responsibility, the historical life, death, and resurrection of Jesus Christ — none of these claims are contradicted by any finding of physics, chemistry, biology, or cosmology.
   After: The existence of God, the creation of the universe from nothing, the special status of human beings as image-bearers, the reality of human moral responsibility, the historical life, death, and resurrection of Jesus Christ: none of these claims are contradicted by any finding of physics, chemistry, biology, or cosmology.
5. Before: When we read it as the kind of document it is — a theological account of who God is, what God has done, and what human beings are — rather than imposing categories on it from outside, we find that its claims are coherent, substantial, and well-supported by the evidence from multiple domains.
   After: When we read it as the kind of document it is (a theological account of who God is, what God has done, and what human beings are) rather than imposing categories on it from outside, we find that its claims are coherent, substantial, and well-supported by the evidence from multiple domains.


## Chapter Twenty-Three: Objections Answered — The Most Persistent Challenges to Biblical Reliability (`sec24.xhtml`)

Words 1,270 to 1,270. Em-dashes in his prose 14 to 0 (11.0 to 0.0 per 1,000 words). Tells 26 to 13 (20.5 to 10.2 per 1,000). Mean sentence 18.9 words to 18.9; sentences of eight words or fewer 18.2% to 18.2%; of five or fewer 12.1% to 12.1%. 9 edits; paragraphs 15 to 15. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 14 to 0, not_but 2 to 2, triplet 6 to 7, intens 2 to 2, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 7 Scripture references, 0 years, 3 numbers in digits, 13 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: But clearly — because the objections deserve clear answers rather than the anxious deflection that too often passes for apologetics.
   After: But clearly, because the objections deserve clear answers rather than the anxious deflection that too often passes for apologetics.
2. Before: Just as a human author selects, shapes, and arranges material in service of a purpose, so God selected, shaped, and arranged — through the choices and writing of the human authors — in service of a purpose the human authors did not fully understand.
   After: Just as a human author selects, shapes, and arranges material in service of a purpose, so God selected, shaped, and arranged, through the choices and writing of the human authors, in service of a purpose the human authors did not fully understand.
3. Before: The major translations — ESV, NIV, NASB, CSB — differ in approach, formal versus functional equivalence, but not in accuracy about the substance of what the original says.
   After: The major translations (ESV, NIV, NASB, CSB) differ in approach, formal versus functional equivalence, but not in accuracy about the substance of what the original says.
4. Before: This raises a real issue — the Bible's relationship to slavery is complex, and parts of the Old Testament and even the New Testament have been read as permitting or regulating rather than condemning the institution.
   After: This raises a real issue: the Bible's relationship to slavery is complex, and parts of the Old Testament and even the New Testament have been read as permitting or regulating rather than condemning the institution.
5. Before: The canon as a whole presents a God whose fundamental character is love — who pursues rebellious creation with extraordinary patience, who is "slow to anger and abounding in steadfast love," who sends his own Son to die for the people who reject him.
   After: The canon as a whole presents a God whose fundamental character is love, who pursues rebellious creation with extraordinary patience, who is "slow to anger and abounding in steadfast love," who sends his own Son to die for the people who reject him.


## Chapter Twenty-Four: Practicing the Trust — Scripture as Daily Bread (`sec25.xhtml`)

Words 1,008 to 1,008. Em-dashes in his prose 19 to 0 (18.8 to 0.0 per 1,000 words). Tells 39 to 20 (38.7 to 19.8 per 1,000). Mean sentence 21.4 words to 21.4; sentences of eight words or fewer 27.7% to 27.7%; of five or fewer 19.1% to 19.1%. 11 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 2 to 2.

By kind (before to after): emdash 19 to 0, not_but 5 to 5, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 1 to 1, triplet 3 to 3, frag3 2 to 2, intens 2 to 2, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 3 Scripture references, 0 years, 1 numbers in digits, 14 number words, proper names by count, and 6 hedge words (after: 6) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The manuscript evidence, the archaeological confirmation, the canon history, the early dating, the eyewitness testimony, the fulfilled prophecy, the resurrection case — all of it is prologue; the event it points toward is the event of a person sitting down with this text, reading it, and allowing it to do what it does.
   After: The manuscript evidence, the archaeological confirmation, the canon history, the early dating, the eyewitness testimony, the fulfilled prophecy, the resurrection case: all of it is prologue; the event it points toward is the event of a person sitting down with this text, reading it, and allowing it to do what it does.
2. Before: The practice of reading Scripture — what the tradition calls lectio divina, what the Reformers called reading Scripture meditatively, what contemporary Christianity calls quiet time or devotional reading — is not a technique.
   After: The practice of reading Scripture (what the tradition calls lectio divina, what the Reformers called reading Scripture meditatively, what contemporary Christianity calls quiet time or devotional reading) is not a technique.
3. Before: The reading of a child receiving a letter from a parent — not passive, since children ask questions, push back, and admit when they do not understand, but oriented toward trust, shaped by the prior conviction that what comes from this source is trustworthy, that the difficulty is not evidence of error but invitation to deeper understanding.
   After: The reading of a child receiving a letter from a parent: not passive, since children ask questions, push back, and admit when they do not understand, but oriented toward trust, shaped by the prior conviction that what comes from this source is trustworthy, that the difficulty is not evidence of error but invitation to deeper understanding.
4. Before: The privatization of Scripture reading — the assumption that the individual alone with the text is the normative mode — is a relatively recent development, and it has produced its share of distortions.
   After: The privatization of Scripture reading (the assumption that the individual alone with the text is the normative mode) is a relatively recent development, and it has produced its share of distortions.
5. Before: And discover — as people in every century, in every culture, in every language have discovered — that the ground holds.
   After: And discover, as people in every century, in every culture, in every language have discovered, that the ground holds.


## Chapter Twenty-Five: A Final Word — To the Skeptic Who Made It This Far (`sec26.xhtml`)

Words 673 to 673. Em-dashes in his prose 5 to 0 (7.4 to 0.0 per 1,000 words). Tells 18 to 13 (26.7 to 19.3 per 1,000). Mean sentence 19.8 words to 19.8; sentences of eight words or fewer 38.2% to 38.2%; of five or fewer 29.4% to 29.4%. 4 edits; paragraphs 10 to 10. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 2 to 2.

By kind (before to after): emdash 5 to 0, not_but 2 to 2, NotX.Y 1 to 1, triplet 1 to 1, frag3 2 to 2, anaphora 3 to 3, stock 1 to 1, intens 1 to 1, colon_reveal 1 to 1, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 4 Scripture references, 0 years, 2 numbers in digits, 6 number words, proper names by count, and 5 hedge words (after: 5) compared.

4 pairs (all there are), taken at even intervals through the chapter:

1. Before: Read the Gospel of Mark — it is the shortest of the four Gospels, perhaps two hours of reading — with a single question in mind:
   After: Read the Gospel of Mark (it is the shortest of the four Gospels, perhaps two hours of reading) with a single question in mind:
2. Before: Notice the specific details — the location of the events, the names of the people, the frank portrayal of the disciples' failures, the way Jesus's emotions are described.
   After: Notice the specific details: the location of the events, the names of the people, the frank portrayal of the disciples' failures, the way Jesus's emotions are described.
3. Before: On the other side is a world that has its Maker present within it — a world in which you are not an accident but a creature made in the image of God, with dignity that nothing can take and purpose that nothing can erase, a world in which the worst things that have been done, by others to you and by you to others, have been addressed, at cost, by the one with the authority to address them.
   After: On the other side is a world that has its Maker present within it, a world in which you are not an accident but a creature made in the image of God, with dignity that nothing can take and purpose that nothing can erase, a world in which the worst things that have been done, by others to you and by you to others, have been addressed, at cost, by the one with the authority to address them.
4. Before: The door to it is the acknowledgment that Jesus is who he claimed to be — Lord of the universe, risen from the dead, the word through whom all things were made and the bread by which they are sustained.
   After: The door to it is the acknowledgment that Jesus is who he claimed to be: Lord of the universe, risen from the dead, the word through whom all things were made and the bread by which they are sustained.


## Chapter Twenty-Six: The Bible's Self-Understanding Through History — From Desert to Diaspora (`sec27.xhtml`)

Words 1,043 to 1,043. Em-dashes in his prose 15 to 0 (14.4 to 0.0 per 1,000 words). Tells 32 to 17 (30.7 to 16.3 per 1,000). Mean sentence 24.3 words to 24.3; sentences of eight words or fewer 11.6% to 11.6%; of five or fewer 7.0% to 7.0%. 9 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 15 to 0, not_but 4 to 4, not_just 1 to 1, triplet 6 to 6, anaphora 2 to 2, intens 2 to 2, short_close 1 to 1, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 10 Scripture references, 1 years, 6 numbers in digits, 5 number words, proper names by count, and 9 hedge words (after: 9) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: In Mesopotamia, the great religious texts — the creation account Enuma Elish, the Epic of Gilgamesh, the hymns to the great gods — were preserved primarily by temple scribal schools whose function was as much administrative as religious.
   After: In Mesopotamia, the great religious texts (the creation account Enuma Elish, the Epic of Gilgamesh, the hymns to the great gods) were preserved primarily by temple scribal schools whose function was as much administrative as religious.
2. Before: Not all of them were direct divine speech — most of the narrative texts are not — but the community understood the entire corpus as standing under divine authority in a way that demanded a fidelity no other ancient culture applied to its texts.
   After: Not all of them were direct divine speech (most of the narrative texts are not), but the community understood the entire corpus as standing under divine authority in a way that demanded a fidelity no other ancient culture applied to its texts.
3. Before: The Sabbath reading of Torah portions, the annual cycle through the entire Torah, the careful rules governing the preparation and handling of Torah scrolls — all of it was the lived theology of a community that believed the text was sacred.
   After: The Sabbath reading of Torah portions, the annual cycle through the entire Torah, the careful rules governing the preparation and handling of Torah scrolls: all of it was the lived theology of a community that believed the text was sacred.
4. Before: Jesus's frequent citations of the Old Testament, his engagement with the precise wording of specific texts, his statement that not the smallest letter would pass from the Law until all was accomplished — all of it signals a community for whom the exact words mattered profoundly.
   After: Jesus's frequent citations of the Old Testament, his engagement with the precise wording of specific texts, his statement that not the smallest letter would pass from the Law until all was accomplished: all of it signals a community for whom the exact words mattered profoundly.
5. Before: The scrolls show that across the entire span from the Second Temple through the medieval period — more than a thousand years — the essential content of the text remained stable, not because the scribes were infallible but because the community had organized its whole institutional life around the faithful transmission of the words of God. The history of the text's transmission is, at its core, the story of communities for whom the exact words mattered — not as a fetish for letterism, not as a substitute for living faith, but because the words were the medium through which the living God addressed his people.
   After: The scrolls show that across the entire span from the Second Temple through the medieval period (more than a thousand years), the essential content of the text remained stable, not because the scribes were infallible but because the community had organized its whole institutional life around the faithful transmission of the words of God. The history of the text's transmission is, at its core, the story of communities for whom the exact words mattered, not as a fetish for letterism, not as a substitute for living faith, but because the words were the medium through which the living God addressed his people.


## Chapter Twenty-Seven: The Parable of the Coins — An Illustration of Textual Criticism (`sec28.xhtml`)

Words 750 to 750. Em-dashes in his prose 6 to 0 (8.0 to 0.0 per 1,000 words). Tells 10 to 4 (13.3 to 5.3 per 1,000). Mean sentence 21.4 words to 21.4; sentences of eight words or fewer 14.3% to 14.3%; of five or fewer 8.6% to 8.6%. 5 edits; paragraphs 8 to 8. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 6 to 0, NotX.Y 1 to 1, triplet 2 to 2, intens 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 32 number words, proper names by count, and 10 hedge words (after: 10) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: When you compare them, they agree with each other almost entirely — but there are small differences.
   After: When you compare them, they agree with each other almost entirely, but there are small differences.
2. Before: What you do — which is exactly what textual critics do — is compare all twenty-seven copies systematically.
   After: What you do, which is exactly what textual critics do, is compare all twenty-seven copies systematically.
3. Before: The critical Greek New Testament text published by the United Bible Societies and by Nestle-Aland represents the cumulative work of this scholarship — the best available reconstruction of what the original New Testament documents said, based on analysis of the full manuscript tradition.
   After: The critical Greek New Testament text published by the United Bible Societies and by Nestle-Aland represents the cumulative work of this scholarship: the best available reconstruction of what the original New Testament documents said, based on analysis of the full manuscript tradition.
4. Before: When historians want to establish the exact image and legend on a Roman coin minted in a particular year, they do not need a perfect exemplar — a coin preserved with every detail sharp and clear.
   After: When historians want to establish the exact image and legend on a Roman coin minted in a particular year, they do not need a perfect exemplar, a coin preserved with every detail sharp and clear.
5. Before: The overwhelming agreement is the minting — the original from which all copies were made.
   After: The overwhelming agreement is the minting: the original from which all copies were made.


## Chapter Twenty-Eight: The Church Under Pressure — How Persecution Tested and Confirmed the Text (`sec29.xhtml`)

Words 620 to 620. Em-dashes in his prose 7 to 0 (11.3 to 0.0 per 1,000 words). Tells 15 to 8 (24.2 to 12.9 per 1,000). Mean sentence 26.9 words to 26.9; sentences of eight words or fewer 17.4% to 17.4%; of five or fewer 13.0% to 13.0%. 6 edits; paragraphs 8 to 8. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 7 to 0, not_but 2 to 2, not_just 1 to 1, triplet 2 to 2, intens 1 to 1, colon_reveal 1 to 1, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 0 Scripture references, 0 years, 1 numbers in digits, 5 number words, proper names by count, and 10 hedge words (after: 10) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The Latin word traditio — "handing over" — was applied to the act of surrendering the Scriptures to Roman authorities, and Christians who complied became known as traditores, the origin of our word "traitor.
   After: The Latin word traditio ("handing over") was applied to the act of surrendering the Scriptures to Roman authorities, and Christians who complied became known as traditores, the origin of our word "traitor.
2. Before: They believed it was what it claimed to be — not because they could not imagine it being false, but because the evidence of its truth had been so thoroughly embedded in their lives, their worship, their pastoral practice, and their corporate memory that surrendering the text was equivalent to surrendering the reality the text described.
   After: They believed it was what it claimed to be, not because they could not imagine it being false, but because the evidence of its truth had been so thoroughly embedded in their lives, their worship, their pastoral practice, and their corporate memory that surrendering the text was equivalent to surrendering the reality the text described.
3. Before: What produced the willingness to die was the conviction that the text being targeted was not a human composition but a divine communication — that to hand it over was a betrayal not merely of culture but of God.
   After: What produced the willingness to die was the conviction that the text being targeted was not a human composition but a divine communication, that to hand it over was a betrayal not merely of culture but of God.
4. Before: When restrictions eased and paper Bibles became available again, the texts recovered from memory were compared with the available manuscripts — and the accuracy of memorized transmission was striking.
   After: When restrictions eased and paper Bibles became available again, the texts recovered from memory were compared with the available manuscripts, and the accuracy of memorized transmission was striking.
5. Before: It is the evidence of communities for whom the text was valuable enough to be carried in their bodies when it could not be carried in their hands — and who preserved it accurately because accuracy mattered.
   After: It is the evidence of communities for whom the text was valuable enough to be carried in their bodies when it could not be carried in their hands, and who preserved it accurately because accuracy mattered.


## Chapter Twenty-Nine: What Kind of Book Is This? — The Unity of Scripture (`sec30.xhtml`)

Words 845 to 845. Em-dashes in his prose 16 to 0 (18.9 to 0.0 per 1,000 words). Tells 24 to 8 (28.4 to 9.5 per 1,000). Mean sentence 25.3 words to 25.3; sentences of eight words or fewer 24.2% to 24.2%; of five or fewer 6.1% to 6.1%. 12 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 16 to 0, isnt_its 1 to 1, triplet 4 to 4, colon_reveal 2 to 2, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 5 Scripture references, 0 years, 4 numbers in digits, 17 number words, proper names by count, and 7 hedge words (after: 7) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The Bible is a library of sixty-six books written by approximately forty different human authors over a period of roughly fifteen hundred years — a span no other text in human possession can claim.
   After: The Bible is a library of sixty-six books written by approximately forty different human authors over a period of roughly fifteen hundred years, a span no other text in human possession can claim.
2. Before: Human beings, given the gift of freedom, chose to use that freedom against the one who gave it, and the consequences of that choice infected the created order — relationships broken, the ground cursed, death introduced, the image of God in humanity twisted but not destroyed.
   After: Human beings, given the gift of freedom, chose to use that freedom against the one who gave it, and the consequences of that choice infected the created order: relationships broken, the ground cursed, death introduced, the image of God in humanity twisted but not destroyed.
3. Before: It is the story that emerges from the library when the library is read as a whole — when the typological connections, the thematic threads, the narrative progressions are allowed to speak.
   After: It is the story that emerges from the library when the library is read as a whole, when the typological connections, the thematic threads, the narrative progressions are allowed to speak.
4. Before: The tabernacle in the wilderness — the mobile dwelling of God's presence among the people — finds its answer in the incarnation, which John 1:14 describes using the Greek word for "tabernacling":
   After: The tabernacle in the wilderness, the mobile dwelling of God's presence among the people, finds its answer in the incarnation, which John 1:14 describes using the Greek word for "tabernacling":
5. Before: But the scale of the coherence, and the way it runs through every level of the text — from individual word choices to broad narrative structures to typological patterns — is not easily explained by editorial activity alone.
   After: But the scale of the coherence, and the way it runs through every level of the text (from individual word choices to broad narrative structures to typological patterns) is not easily explained by editorial activity alone.


## Chapter Thirty: The Reader in the Story — Why This Matters for Your Life (`sec31.xhtml`)

Words 707 to 707. Em-dashes in his prose 15 to 0 (21.2 to 0.0 per 1,000 words). Tells 27 to 13 (38.2 to 18.4 per 1,000). Mean sentence 18.1 words to 18.6; sentences of eight words or fewer 30.8% to 28.9%; of five or fewer 28.2% to 26.3%. 12 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 2 to 2.

By kind (before to after): emdash 15 to 0, not_but 2 to 2, NotX.Y 3 to 3, isnt_its 1 to 1, frag3 2 to 2, anaphora 3 to 3, colon_reveal 0 to 1, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 0 numbers in digits, 6 number words, proper names by count, and 9 hedge words (after: 9) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: This is the unusual — perhaps unique — feature of the biblical story.
   After: This is the unusual, perhaps unique, feature of the biblical story.
2. Before: This is not metaphor in the weak sense — nice language that conveys an abstract truth. It is a claim about what actually happens when the word is received; the person who hears and trusts is incorporated into the story, their life becomes part of the argument, and their faithfulness — or their faithlessness — is evidence in the ongoing case about whether the God of the Bible is real and whether his word is trustworthy.
   After: This is not metaphor in the weak sense: nice language that conveys an abstract truth. It is a claim about what actually happens when the word is received; the person who hears and trusts is incorporated into the story, their life becomes part of the argument, and their faithfulness, or their faithlessness, is evidence in the ongoing case about whether the God of the Bible is real and whether his word is trustworthy.
3. Before: The disciples were appointed as witnesses — people whose testimony about what they had seen and heard was to be the mechanism by which the story spread.
   After: The disciples were appointed as witnesses, people whose testimony about what they had seen and heard was to be the mechanism by which the story spread.
4. Before: This is why the reliability of Scripture, which we have argued for at length on historical and textual grounds, also has a phenomenological dimension — the dimension of lived testimony.
   After: This is why the reliability of Scripture, which we have argued for at length on historical and textual grounds, also has a phenomenological dimension: the dimension of lived testimony.
5. Before: A story — the ongoing story of a God who made the world and will not give it up, who entered it in human flesh and changed everything, and who continues to call people into the story by speaking through the text that has survived every century's attempts to silence it.
   After: A story: the ongoing story of a God who made the world and will not give it up, who entered it in human flesh and changed everything, and who continues to call people into the story by speaking through the text that has survived every century's attempts to silence it.


## Chapter 31: What the Scrolls in the Desert Proved (`sec32.xhtml`)

Words 776 to 776. Em-dashes in his prose 13 to 1 (16.8 to 1.3 per 1,000 words). Tells 23 to 12 (29.6 to 15.5 per 1,000). Mean sentence 21.5 words to 21.5; sentences of eight words or fewer 25.0% to 25.0%; of five or fewer 19.4% to 19.4%. 7 edits; paragraphs 8 to 8. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 13 to 1, not_just 1 to 1, NotX.Y 2 to 2, triplet 4 to 5, anaphora 2 to 2, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 1 quoted strings, 4 Scripture references, 3 years, 13 numbers in digits, 22 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Eventually word reached scholars, and eventually scholars reached the caves, and what came out of those caves — nearly 900 documents, fragments of approximately 220 different manuscripts, recovered across eleven separate caves over the next decade — is the most significant manuscript discovery in the history of biblical scholarship.
   After: Eventually word reached scholars, and eventually scholars reached the caves, and what came out of those caves (nearly 900 documents, fragments of approximately 220 different manuscripts, recovered across eleven separate caves over the next decade) is the most significant manuscript discovery in the history of biblical scholarship.
2. Before: The Great Isaiah Scroll — found in Cave 1, dated by paleographic analysis to approximately 125 BC — is essentially the same text as the medieval Masoretic Isaiah that had been the basis of every Old Testament translation for centuries.
   After: The Great Isaiah Scroll (found in Cave 1, dated by paleographic analysis to approximately 125 BC) is essentially the same text as the medieval Masoretic Isaiah that had been the basis of every Old Testament translation for centuries.
3. Before: a text copied and recopied by hand for eleven centuries, across political upheavals and dispersions and persecutions and the destruction of the Temple, arrived at 1008 AD in essentially the same condition it existed in 125 BC, because the copyists — the Masoretes, who developed elaborate counting systems to catch every error — had done their work with extraordinary fidelity.
   After: a text copied and recopied by hand for eleven centuries, across political upheavals and dispersions and persecutions and the destruction of the Temple, arrived at 1008 AD in essentially the same condition it existed in 125 BC, because the copyists (the Masoretes, who developed elaborate counting systems to catch every error) had done their work with extraordinary fidelity.
4. Before: But the variants in Isaiah are minor — spelling, minor phrasing, occasional transpositions — nothing that affects doctrine, nothing that affects the storyline, nothing that changes the meaning of a single significant passage.
   After: But the variants in Isaiah are minor (spelling, minor phrasing, occasional transpositions), nothing that affects doctrine, nothing that affects the storyline, nothing that changes the meaning of a single significant passage.
5. Before: And what they show us is that the early Christian movement's reading of the Old Testament — the claim that Jesus fulfilled the messianic prophecies — was not an invented retrospective reading imposed centuries later.
   After: And what they show us is that the early Christian movement's reading of the Old Testament (the claim that Jesus fulfilled the messianic prophecies) was not an invented retrospective reading imposed centuries later.


## Chapter 32: When Luke Was Wrong — and Then He Wasn't (`sec33.xhtml`)

Words 761 to 761. Em-dashes in his prose 8 to 0 (10.5 to 0.0 per 1,000 words). Tells 18 to 10 (23.7 to 13.1 per 1,000). Mean sentence 18.5 words to 18.5; sentences of eight words or fewer 41.5% to 41.5%; of five or fewer 22.0% to 22.0%. 7 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 8 to 0, NotX.Y 1 to 1, triplet 1 to 1, anaphora 1 to 1, intens 1 to 1, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 24 Scripture references, 0 years, 6 numbers in digits, 23 number words, proper names by count, and 11 hedge words (after: 11) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: He planned to prove Luke unreliable through archaeology — to dig up the evidence, examine it against Luke's claims, and demonstrate conclusively that Luke was not a first-rate historian.
   After: He planned to prove Luke unreliable through archaeology: to dig up the evidence, examine it against Luke's claims, and demonstrate conclusively that Luke was not a first-rate historian.
2. Before: Consider the title "politarch," meaning ruler of the city, which Luke uses in Acts 17:6 for the officials in Thessalonica — a title critics said Luke had invented.
   After: Consider the title "politarch," meaning ruler of the city, which Luke uses in Acts 17:6 for the officials in Thessalonica, a title critics said Luke had invented.
3. Before: The precise sequence of Roman administrative titles Luke uses across Acts — proconsul, propraetor, praetor, tetrarch — matched the administrative structures of the specific provinces he described at the specific times he describes them, in a period when those structures were in constant flux.
   After: The precise sequence of Roman administrative titles Luke uses across Acts (proconsul, propraetor, praetor, tetrarch) matched the administrative structures of the specific provinces he described at the specific times he describes them, in a period when those structures were in constant flux.
4. Before: That is not a small claim from a rigorous archaeologist who had begun as a skeptic and followed the evidence to a different conclusion — Ramsay was not a credulous believer looking to confirm his faith.
   After: That is not a small claim from a rigorous archaeologist who had begun as a skeptic and followed the evidence to a different conclusion; Ramsay was not a credulous believer looking to confirm his faith.
5. Before: Not that Luke was divinely inspired — that is a theological claim.
   After: Not that Luke was divinely inspired; that is a theological claim.


## Chapter 33: The Problem of Alleged Contradictions (`sec34.xhtml`)

Words 836 to 836. Em-dashes in his prose 9 to 0 (10.8 to 0.0 per 1,000 words). Tells 22 to 14 (26.3 to 16.7 per 1,000). Mean sentence 20.3 words to 20.3; sentences of eight words or fewer 19.5% to 19.5%; of five or fewer 4.9% to 4.9%. 7 edits; paragraphs 10 to 10. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 9 to 0, isnt_its 2 to 2, triplet 1 to 1, stock 3 to 3, intens 5 to 5, colon_reveal 0 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 15 Scripture references, 0 years, 4 numbers in digits, 20 number words, proper names by count, and 15 hedge words (after: 15) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: You know the one — it circulates online, in skeptical forums, in books written to dismantle faith, sometimes fifty items long, sometimes a hundred, sometimes three hundred, all of it building toward a single devastating implication:
   After: You know the one: it circulates online, in skeptical forums, in books written to dismantle faith, sometimes fifty items long, sometimes a hundred, sometimes three hundred, all of it building toward a single devastating implication:
2. Before: When Matthew and Luke give different genealogies for Jesus, they are tracing different lines — Matthew the legal lineage through Joseph, Luke the biological lineage through Mary, or Matthew Joseph's line and Luke a collateral one.
   After: When Matthew and Luke give different genealogies for Jesus, they are tracing different lines: Matthew the legal lineage through Joseph, Luke the biological lineage through Mary, or Matthew Joseph's line and Luke a collateral one.
3. Before: The numbers in Chronicles and Kings sometimes differ from one another — and this is real.
   After: The numbers in Chronicles and Kings sometimes differ from one another, and this is real.
4. Before: The inspired original — what scholars call the autograph — is what the doctrine of inerrancy describes; the transmission is what the discipline of textual criticism addresses.
   After: The inspired original (what scholars call the autograph) is what the doctrine of inerrancy describes; the transmission is what the discipline of textual criticism addresses.
5. Before: Every ancient document of any complexity has difficult passages, and the difficulty of a passage does not mean the document is false — it means the reader has more work to do.
   After: Every ancient document of any complexity has difficult passages, and the difficulty of a passage does not mean the document is false; it means the reader has more work to do.


## Chapter 34: Why Scribes Changed the Text — and What They Changed (`sec35.xhtml`)

Words 802 to 802. Em-dashes in his prose 11 to 0 (13.7 to 0.0 per 1,000 words). Tells 29 to 18 (36.2 to 22.4 per 1,000). Mean sentence 19.1 words to 19.1; sentences of eight words or fewer 33.3% to 33.3%; of five or fewer 26.2% to 26.2%. 7 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 11 to 0, isnt_its 1 to 1, triplet 6 to 6, anaphora 3 to 3, stock 3 to 3, intens 2 to 2, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 8 Scripture references, 0 years, 7 numbers in digits, 9 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: This is the popular version of the claim, and it generates real anxiety in people who have never thought about textual criticism — which is most people.
   After: This is the popular version of the claim, and it generates real anxiety in people who have never thought about textual criticism, which is most people.
2. Before: This finding is not a crisis; it is the textual tradition working as it should — preserving the early evidence, allowing scholars to identify later additions, and giving the reader access to the full picture.
   After: This finding is not a crisis; it is the textual tradition working as it should: preserving the early evidence, allowing scholars to identify later additions, and giving the reader access to the full picture.
3. Before: The story is absent from the earliest manuscripts, and it appears in different places in different manuscript traditions — some insert it after Luke 21:38 rather than in John — so the evidence strongly suggests it was not in John's original Gospel.
   After: The story is absent from the earliest manuscripts, and it appears in different places in different manuscript traditions (some insert it after Luke 21:38 rather than in John), so the evidence strongly suggests it was not in John's original Gospel.
4. Before: When scholars identify likely scribal changes — additions, harmonizations, theological adjustments — those findings actually demonstrate the reliability of the textual tradition, not its corruption.
   After: When scholars identify likely scribal changes (additions, harmonizations, theological adjustments), those findings actually demonstrate the reliability of the textual tradition, not its corruption.
5. Before: The deity of Christ, the resurrection, the atonement, the commands of Jesus, the mission of the church — none of these depend on the longer ending of Mark, or the Pericope Adulterae, or the Comma Johanneum, the disputed Trinitarian formula in 1 John 5:7-8.
   After: The deity of Christ, the resurrection, the atonement, the commands of Jesus, the mission of the church: none of these depend on the longer ending of Mark, or the Pericope Adulterae, or the Comma Johanneum, the disputed Trinitarian formula in 1 John 5:7-8.


## Chapter 35: The Bible That Endured Everything (`sec36.xhtml`)

Words 749 to 749. Em-dashes in his prose 10 to 0 (13.4 to 0.0 per 1,000 words). Tells 16 to 6 (21.4 to 8.0 per 1,000). Mean sentence 21.3 words to 21.3; sentences of eight words or fewer 28.6% to 28.6%; of five or fewer 20.0% to 20.0%. 7 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, not_just 1 to 1, NotX.Y 1 to 1, triplet 3 to 3, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 0 Scripture references, 0 years, 2 numbers in digits, 12 number words, proper names by count, and 6 hedge words (after: 6) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The targeting of the Bible by its enemies is itself a form of testimony; you do not dedicate imperial resources to destroying a document you consider irrelevant, and the campaigns against the Bible have always been predicated on the belief that it is dangerous — that what it says, believed by people who act on it, changes things in ways incompatible with the power structures that wish to remain unchanged.
   After: The targeting of the Bible by its enemies is itself a form of testimony; you do not dedicate imperial resources to destroying a document you consider irrelevant, and the campaigns against the Bible have always been predicated on the belief that it is dangerous: that what it says, believed by people who act on it, changes things in ways incompatible with the power structures that wish to remain unchanged.
2. Before: Imperial soldiers conducted raids on churches and private homes, confiscating and burning what they found; Christians who surrendered their copies to avoid death were called traditores — the Latin root of our word "traitor.
   After: Imperial soldiers conducted raids on churches and private homes, confiscating and burning what they found; Christians who surrendered their copies to avoid death were called traditores, the Latin root of our word "traitor.
3. Before: They failed not just in the obvious sense that Christianity survived — though that is remarkable enough — but in the deeper sense that the campaign of destruction left the textual tradition more robust, not weaker. Because Christianity spread across multiple linguistic communities — Greek, Latin, Syriac, Coptic, Armenian, Gothic, Ethiopian — and the scriptures were translated into each of those languages early, no single political campaign could touch all of it.
   After: They failed not just in the obvious sense that Christianity survived (though that is remarkable enough) but in the deeper sense that the campaign of destruction left the textual tradition more robust, not weaker. Because Christianity spread across multiple linguistic communities (Greek, Latin, Syriac, Coptic, Armenian, Gothic, Ethiopian), and the scriptures were translated into each of those languages early, no single political campaign could touch all of it.
4. Before: When scholars today reconstruct the New Testament text, they work not just from Greek manuscripts but from the ancient translations — the Latin Vulgate, the Syriac Peshitta, the Coptic versions, the Armenian, the Gothic.
   After: When scholars today reconstruct the New Testament text, they work not just from Greek manuscripts but from the ancient translations: the Latin Vulgate, the Syriac Peshitta, the Coptic versions, the Armenian, the Gothic.
5. Before: evidence of a kind that the book's content predicted — that the word of the Lord endures forever, that no weapon formed against it would succeed, that the gates of Hades would not prevail.
   After: evidence of a kind that the book's content predicted, that the word of the Lord endures forever, that no weapon formed against it would succeed, that the gates of Hades would not prevail.


## Chapter 36: What You Do with What You Now Know (`sec37.xhtml`)

Words 772 to 772. Em-dashes in his prose 12 to 1 (15.5 to 1.3 per 1,000 words). Tells 26 to 15 (33.7 to 19.4 per 1,000). Mean sentence 17.9 words to 17.9; sentences of eight words or fewer 38.1% to 38.1%; of five or fewer 19.0% to 19.0%. 8 edits; paragraphs 10 to 10. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 12 to 1, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 5 to 5, anaphora 1 to 1, q_answered 3 to 3, colon_reveal 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 2 Scripture references, 0 years, 0 numbers in digits, 11 number words, proper names by count, and 15 hedge words (after: 15) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: No single piece of it is decisive in isolation; the manuscript comparison with other ancient documents, the Dead Sea Scrolls, the archaeological confirmations, the eyewitness testimony structure, the early dating of the documents, the prophecy and fulfillment pattern, the campaign to destroy it — none of these, standing alone, requires you to bow your knee.
   After: No single piece of it is decisive in isolation; the manuscript comparison with other ancient documents, the Dead Sea Scrolls, the archaeological confirmations, the eyewitness testimony structure, the early dating of the documents, the prophecy and fulfillment pattern, the campaign to destroy it: none of these, standing alone, requires you to bow your knee.
2. Before: that you take the Bible seriously enough to read it the way you would read any important historical document — with attention to authorship, dating, sources, genre, and the question of what the author was trying to say, to whom, and why.
   After: that you take the Bible seriously enough to read it the way you would read any important historical document, with attention to authorship, dating, sources, genre, and the question of what the author was trying to say, to whom, and why.
3. Before: Not a naive yes; a studied yes — a yes that has looked at the manuscript tradition, the archaeological confirmations, the historical corroboration, the structure of eyewitness testimony, and the extraordinary survival of the text against sustained campaigns of destruction, and concluded that the evidence, honestly assessed, supports the reliability of the document we hold in our hands.
   After: Not a naive yes; a studied yes, a yes that has looked at the manuscript tradition, the archaeological confirmations, the historical corroboration, the structure of eyewitness testimony, and the extraordinary survival of the text against sustained campaigns of destruction, and concluded that the evidence, honestly assessed, supports the reliability of the document we hold in our hands.
4. Before: It is a book about the claims the book makes — about God, about human beings, about the nature of our condition and the nature of our rescue.
   After: It is a book about the claims the book makes: about God, about human beings, about the nature of our condition and the nature of our rescue.
5. Before: The obstacles — the manuscript myths, the archaeology dismissals, the conspiracy theories about canon — were real, and they deserved real answers.
   After: The obstacles (the manuscript myths, the archaeology dismissals, the conspiracy theories about canon) were real, and they deserved real answers.


## Chapter 37: Letters Written Under Pressure — Paul and the Corinthians (`sec38.xhtml`)

Words 761 to 761. Em-dashes in his prose 10 to 0 (13.1 to 0.0 per 1,000 words). Tells 23 to 13 (30.2 to 17.1 per 1,000). Mean sentence 19.3 words to 19.3; sentences of eight words or fewer 23.7% to 23.7%; of five or fewer 13.2% to 13.2%. 6 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, NotX.Y 3 to 3, isnt_its 1 to 1, triplet 3 to 3, anaphora 2 to 2, stock 1 to 1, short_close 2 to 2, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 5 Scripture references, 0 years, 8 numbers in digits, 15 number words, proper names by count, and 19 hedge words (after: 19) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Paul wrote it from Ephesus, probably in the mid-50s AD, to a church he had founded in the city of Corinth roughly three years earlier — and the church he was writing to was a mess.
   After: Paul wrote it from Ephesus, probably in the mid-50s AD, to a church he had founded in the city of Corinth roughly three years earlier, and the church he was writing to was a mess.
2. Before: He writes that Jesus appeared to Cephas — Peter — then to the twelve; then to more than five hundred brothers at once, most of whom, Paul says parenthetically, are still alive, though some have died; then to James; then to all the apostles; and last of all to Paul himself, in what he describes as an abnormal birth, a late appearance granted to the one who persecuted the church before his conversion. That parenthetical — "most of whom are still alive" — is extraordinary.
   After: He writes that Jesus appeared to Cephas (Peter), then to the twelve; then to more than five hundred brothers at once, most of whom, Paul says parenthetically, are still alive, though some have died; then to James; then to all the apostles; and last of all to Paul himself, in what he describes as an abnormal birth, a late appearance granted to the one who persecuted the church before his conversion. That parenthetical ("most of whom are still alive") is extraordinary.
3. Before: Bart Ehrman, who does not accept the resurrection, acknowledges that Paul's creedal formula in the opening verses of the chapter — "that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day" — is among the earliest Christian texts we possess, probably formulated within a few years of the crucifixion and certainly within the lifetimes of eyewitnesses; Ehrman dates Paul's reception of this formula to within two to five years of the event itself.
   After: Bart Ehrman, who does not accept the resurrection, acknowledges that Paul's creedal formula in the opening verses of the chapter ("that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day") is among the earliest Christian texts we possess, probably formulated within a few years of the crucifixion and certainly within the lifetimes of eyewitnesses; Ehrman dates Paul's reception of this formula to within two to five years of the event itself.
4. Before: The core claim of Christianity — death, burial, resurrection — is attested in a document written by a man who knew the eyewitnesses, within a generation of the events, in a culture where those events were recent enough that public refutation was possible.
   After: The core claim of Christianity (death, burial, resurrection) is attested in a document written by a man who knew the eyewitnesses, within a generation of the events, in a culture where those events were recent enough that public refutation was possible.
5. Before: Paul was writing under pressure — to a community that was fracturing, that was questioning his authority, that was in doctrinal confusion.
   After: Paul was writing under pressure, to a community that was fracturing, that was questioning his authority, that was in doctrinal confusion.


## Chapter 38: The Question Behind All the Questions (`sec39.xhtml`)

Words 718 to 718. Em-dashes in his prose 10 to 0 (13.9 to 0.0 per 1,000 words). Tells 23 to 13 (32.0 to 18.1 per 1,000). Mean sentence 19.4 words to 19.4; sentences of eight words or fewer 21.6% to 21.6%; of five or fewer 16.2% to 16.2%. 8 edits; paragraphs 13 to 13. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, not_but 1 to 1, NotX.Y 1 to 1, isnt_its 3 to 3, triplet 1 to 1, anaphora 2 to 2, q_answered 1 to 1, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 6 number words, proper names by count, and 7 hedge words (after: 7) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Every question this book has addressed — about manuscripts, archaeology, prophecy, eyewitness testimony, canon, textual criticism — is a proxy for a single deeper question, the one that sits beneath all the others and waits for them to clear:
   After: Every question this book has addressed (about manuscripts, archaeology, prophecy, eyewitness testimony, canon, textual criticism) is a proxy for a single deeper question, the one that sits beneath all the others and waits for them to clear:
2. Before: The person who cannot take the Bible seriously because they have heard that archaeology has discredited it can, after careful investigation, set that concern aside as well — the archaeology has not discredited it, and in significant cases it has confirmed it.
   After: The person who cannot take the Bible seriously because they have heard that archaeology has discredited it can, after careful investigation, set that concern aside as well; the archaeology has not discredited it, and in significant cases it has confirmed it.
3. Before: The reliability question is, in one sense, a way of deferring those demands — if the book is unreliable, I do not have to engage with what it says; if the transmission is corrupt, I can set it aside.
   After: The reliability question is, in one sense, a way of deferring those demands: if the book is unreliable, I do not have to engage with what it says; if the transmission is corrupt, I can set it aside.
4. Before: The documents come to us from witnesses with access to the events they describe — which means the demands deserve engagement.
   After: The documents come to us from witnesses with access to the events they describe, which means the demands deserve engagement.
5. Before: It is a carefully transmitted, archaeologically confirmed, historically grounded collection of documents written by people who believed they were speaking for God — and who paid for that belief with their lives.
   After: It is a carefully transmitted, archaeologically confirmed, historically grounded collection of documents written by people who believed they were speaking for God, and who paid for that belief with their lives.


## Conclusion: After the Questions, Before the Answer (`sec40.xhtml`)

Words 822 to 822. Em-dashes in his prose 11 to 0 (13.4 to 0.0 per 1,000 words). Tells 28 to 17 (34.1 to 20.7 per 1,000). Mean sentence 18.3 words to 18.3; sentences of eight words or fewer 44.4% to 44.4%; of five or fewer 17.8% to 17.8%. 9 edits; paragraphs 13 to 13. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 11 to 0, not_but 1 to 1, NotX.Y 4 to 4, triplet 1 to 1, anaphora 2 to 2, stock 2 to 2, colon_reveal 2 to 2, short_close 4 to 4, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 15 number words, proper names by count, and 11 hedge words (after: 11) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The first time was at eighteen, when a Christian roommate sat with my atheist questions and did not flinch — when he answered them rather than deflecting them, when the case he made was stronger than I had assumed any case for Christianity could be.
   After: The first time was at eighteen, when a Christian roommate sat with my atheist questions and did not flinch, when he answered them rather than deflecting them, when the case he made was stronger than I had assumed any case for Christianity could be.
2. Before: Not in the cheap sense — life is hard, prayer is sometimes silent, faithfulness does not guarantee comfortable outcomes — but in the sense that the text's account of what human beings are, what they need, what restores them, what breaks them, and what holds them in the worst moments proved more accurate than any alternative account I encountered.
   After: Not in the cheap sense (life is hard, prayer is sometimes silent, faithfulness does not guarantee comfortable outcomes), but in the sense that the text's account of what human beings are, what they need, what restores them, what breaks them, and what holds them in the worst moments proved more accurate than any alternative account I encountered.
3. Before: These things cannot be proven in the way that mathematical propositions can be proven or that chemical reactions can be observed; they belong to a different domain of human knowing — the domain in which the evidence supports a conclusion that only a willed response can fully appropriate.
   After: These things cannot be proven in the way that mathematical propositions can be proven or that chemical reactions can be observed; they belong to a different domain of human knowing: the domain in which the evidence supports a conclusion that only a willed response can fully appropriate.
4. Before: I have followed the argument, the evidence is stronger than I expected, the case is more compelling than the culture suggested, and now I am going to do what evidence alone cannot do for me — I am going to trust.
   After: I have followed the argument, the evidence is stronger than I expected, the case is more compelling than the culture suggested, and now I am going to do what evidence alone cannot do for me: I am going to trust.
5. Before: But whether, at the end of the argument, standing at the edge of what the evidence can establish, you are willing to say yes — I love you, I trust you, I will follow.
   After: But whether, at the end of the argument, standing at the edge of what the evidence can establish, you are willing to say yes: I love you, I trust you, I will follow.


## A PASTORAL NOTE ON BIBLICAL LITERACY IN THE CONGREGATION (`sec42.xhtml`)

Words 404 to 404. Em-dashes in his prose 4 to 0 (9.9 to 0.0 per 1,000 words). Tells 12 to 8 (29.7 to 19.8 per 1,000). Mean sentence 19.2 words to 19.2; sentences of eight words or fewer 47.6% to 47.6%; of five or fewer 23.8% to 23.8%. 3 edits; paragraphs 6 to 6. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 4 to 0, not_just 1 to 1, triplet 3 to 3, anaphora 1 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 3 number words, proper names by count, and 2 hedge words (after: 2) compared.

3 pairs (all there are), taken at even intervals through the chapter:

1. Before: The single most important investment you can make in the long-term faith of your congregation, your small group, or your family is biblical literacy — not merely the ability to read the Bible but the capacity to understand what is being read, to ask the right questions of the text, to know the context of the passages you encounter, to recognize the genre you are standing in.
   After: The single most important investment you can make in the long-term faith of your congregation, your small group, or your family is biblical literacy: not merely the ability to read the Bible but the capacity to understand what is being read, to ask the right questions of the text, to know the context of the passages you encounter, to recognize the genre you are standing in.
2. Before: So invest in your congregation's theological education — not at the expense of the devotional life, because the two must go together, but theological education that enables people to engage their culture's questions with confidence rather than anxiety.
   After: So invest in your congregation's theological education, not at the expense of the devotional life, because the two must go together, but theological education that enables people to engage their culture's questions with confidence rather than anxiety.
3. Before: The congregation that has been preached through the whole Bible — all of it, the comfortable and the difficult, the clear and the complex — is the congregation that has some handle on what the text actually says, and it is harder to destabilize by critics who quote one verse without context, because it already knows the context.
   After: The congregation that has been preached through the whole Bible (all of it, the comfortable and the difficult, the clear and the complex) is the congregation that has some handle on what the text actually says, and it is harder to destabilize by critics who quote one verse without context, because it already knows the context.


## Appendix A: The Major Manuscript Families — A Primer for Careful Readers (`sec43.xhtml`)

Words 577 to 577. Em-dashes in his prose 11 to 0 (19.1 to 0.0 per 1,000 words). Tells 23 to 12 (39.9 to 20.8 per 1,000). Mean sentence 24.7 words to 24.7; sentences of eight words or fewer 21.7% to 21.7%; of five or fewer 13.0% to 13.0%. 7 edits; paragraphs 7 to 7. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 11 to 0, not_but 1 to 1, not_just 2 to 2, isnt_its 1 to 1, triplet 4 to 4, anaphora 1 to 1, q_answered 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 4 Scripture references, 1 years, 6 numbers in digits, 9 number words, proper names by count, and 16 hedge words (after: 16) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: New Testament manuscripts are not catalogued at random; they are grouped into text-types — also called manuscript families — based on the patterns of similarity they display.
   After: New Testament manuscripts are not catalogued at random; they are grouped into text-types (also called manuscript families) based on the patterns of similarity they display.
2. Before: The Byzantine text-type is represented by the vast majority of existing New Testament manuscripts, approximately 80 to 85 percent of the total — a figure that reflects not superior antiquity but the dominance of the Byzantine church in medieval manuscript production.
   After: The Byzantine text-type is represented by the vast majority of existing New Testament manuscripts, approximately 80 to 85 percent of the total, a figure that reflects not superior antiquity but the dominance of the Byzantine church in medieval manuscript production.
3. Before: That lineage explains why the KJV includes certain passages absent from newer translations based on Alexandrian manuscripts — the longer ending of Mark (16:9-20) and the story of the woman caught in adultery (John 7:53-8:11) among them, both present in Byzantine manuscripts but absent in the earliest Alexandrian ones.
   After: That lineage explains why the KJV includes certain passages absent from newer translations based on Alexandrian manuscripts: the longer ending of Mark (16:9-20) and the story of the woman caught in adultery (John 7:53-8:11) among them, both present in Byzantine manuscripts but absent in the earliest Alexandrian ones.
4. Before: It is characterized by paraphrase, by an expansion of narratives — most strikingly in Acts, where the Western text runs about 10 percent longer than the Alexandrian — and by occasional conflation of readings drawn from other traditions.
   After: It is characterized by paraphrase, by an expansion of narratives (most strikingly in Acts, where the Western text runs about 10 percent longer than the Alexandrian), and by occasional conflation of readings drawn from other traditions.
5. Before: When your Bible's footnote says "some manuscripts do not include this verse" or "other ancient authorities read... — that is the apparatus of textual criticism making itself available to the ordinary reader, and the transparency is itself evidence of the tradition's integrity.
   After: When your Bible's footnote says "some manuscripts do not include this verse" or "other ancient authorities read...," that is the apparatus of textual criticism making itself available to the ordinary reader, and the transparency is itself evidence of the tradition's integrity.


## Appendix B: Key Archaeological Sites and What They Proved (`sec44.xhtml`)

Words 717 to 717. Em-dashes in his prose 9 to 0 (12.6 to 0.0 per 1,000 words). Tells 13 to 4 (18.1 to 5.6 per 1,000). Mean sentence 33.1 words to 33.1; sentences of eight words or fewer 9.5% to 9.5%; of five or fewer 4.8% to 4.8%. 8 edits; paragraphs 9 to 9. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 9 to 0, not_but 1 to 1, NotX.Y 1 to 1, triplet 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 6 quoted strings, 16 Scripture references, 4 years, 27 numbers in digits, 27 number words, proper names by count, and 9 hedge words (after: 9) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The Tel Dan Stele, a ninth-century BC basalt monument erected by an Aramean king in northern Israel, carries the phrase "House of David" — the first extra-biblical reference to the Davidic dynasty, and one that confirms the historical existence of David's royal line within roughly a hundred and fifty years of his reign.
   After: The Tel Dan Stele, a ninth-century BC basalt monument erected by an Aramean king in northern Israel, carries the phrase "House of David," the first extra-biblical reference to the Davidic dynasty, and one that confirms the historical existence of David's royal line within roughly a hundred and fifty years of his reign.
2. Before: The tunnel itself stands among the most impressive surviving engineering works from the biblical period — not a fragment of pottery but a passage you can still walk, hewn through stone, ending in an inscription that says it was finished.
   After: The tunnel itself stands among the most impressive surviving engineering works from the biblical period, not a fragment of pottery but a passage you can still walk, hewn through stone, ending in an inscription that says it was finished.
3. Before: They record legal and social customs that match the world of the Genesis patriarchs, and in doing so they anchor the authenticity of the patriarchal narratives to the second millennium BC — the period the text itself claims.
   After: They record legal and social customs that match the world of the Genesis patriarchs, and in doing so they anchor the authenticity of the patriarchal narratives to the second millennium BC, the period the text itself claims.
4. Before: The Pilate Inscription, a first-century stone discovered at Caesarea Maritima in 1961, bears the name "Pontius Pilatus" and identifies him as "Prefect of Judaea" — direct archaeological confirmation of Pilate's existence and title, matching the New Testament's references.
   After: The Pilate Inscription, a first-century stone discovered at Caesarea Maritima in 1961, bears the name "Pontius Pilatus" and identifies him as "Prefect of Judaea," direct archaeological confirmation of Pilate's existence and title, matching the New Testament's references.
5. Before: The Erastus Inscription, a first-century stone pavement in Corinth, records that "Erastus, in return for his aedileship, laid the pavement at his own expense" — and Paul names Erastus as a Corinthian associate in Romans 16:23, so the inscription offers a potential confirmation of that individual.
   After: The Erastus Inscription, a first-century stone pavement in Corinth, records that "Erastus, in return for his aedileship, laid the pavement at his own expense," and Paul names Erastus as a Corinthian associate in Romans 16:23, so the inscription offers a potential confirmation of that individual.


## Appendix D: A Reading Plan for the Serious Inquirer (`sec46.xhtml`)

Words 584 to 584. Em-dashes in his prose 10 to 0 (17.1 to 0.0 per 1,000 words). Tells 15 to 6 (25.7 to 10.3 per 1,000). Mean sentence 19.5 words to 19.5; sentences of eight words or fewer 20.0% to 20.0%; of five or fewer 6.7% to 6.7%. 7 edits; paragraphs 10 to 10. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, not_but 1 to 1, isnt_its 1 to 1, triplet 2 to 3, intens 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 7 Scripture references, 1 years, 2 numbers in digits, 7 number words, proper names by count, and 9 hedge words (after: 9) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Read Mark in one sitting — it takes about two hours — then read John, then Matthew, then Luke-Acts as the two-volume work it was written to be.
   After: Read Mark in one sitting (it takes about two hours), then read John, then Matthew, then Luke-Acts as the two-volume work it was written to be.
2. Before: Kitchen, On the Reliability of the Old Testament — at least the introduction and the chapters on the periods you are most interested in.
   After: Kitchen, On the Reliability of the Old Testament, at least the introduction and the chapters on the periods you are most interested in.
3. Before: Read Michael Kruger, The Question of Canon — scholarly but accessible.
   After: Read Michael Kruger, The Question of Canon (scholarly but accessible).
4. Before: Wright, The Resurrection of the Son of God — the most thorough historical treatment of the question in modern scholarship, written by a scholar who is both rigorously historical and committed to the resurrection's reality.
   After: Wright, The Resurrection of the Son of God, the most thorough historical treatment of the question in modern scholarship, written by a scholar who is both rigorously historical and committed to the resurrection's reality.
5. Before: But the list gives you a path through the scholarship — from accessible introductions to thorough academic treatments — that will equip you to engage the questions with confidence.
   After: But the list gives you a path through the scholarship (from accessible introductions to thorough academic treatments) that will equip you to engage the questions with confidence.


## Appendix E: Frequently Asked Questions — Brief Answers to Common Objections (`sec47.xhtml`)

Words 1,187 to 1,187. Em-dashes in his prose 21 to 0 (17.7 to 0.0 per 1,000 words). Tells 39 to 20 (32.9 to 16.8 per 1,000). Mean sentence 19.9 words to 19.9; sentences of eight words or fewer 21.1% to 21.1%; of five or fewer 8.8% to 8.8%. 13 edits; paragraphs 13 to 13. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 21 to 0, not_but 1 to 1, isnt_its 2 to 2, triplet 5 to 6, anaphora 3 to 3, stock 3 to 3, intens 1 to 1, colon_reveal 0 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 7 quoted strings, 4 Scripture references, 0 years, 2 numbers in digits, 11 number words, proper names by count, and 22 hedge words (after: 22) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The Council of Nicaea, meeting in 325 AD, addressed the theological question of the nature of Christ — specifically the Arian controversy — and produced the Nicene Creed; it did not vote on the biblical canon.
   After: The Council of Nicaea, meeting in 325 AD, addressed the theological question of the nature of Christ, specifically the Arian controversy, and produced the Nicene Creed; it did not vote on the biblical canon.
2. Before: the biblical texts on these topics require careful contextual reading, an understanding of the literary genres involved, attention to the trajectory of biblical ethics — from permission to prohibition in the case of slavery — and a willingness to distinguish between what a text describes, what it commands, what it permits, and what it condemns.
   After: the biblical texts on these topics require careful contextual reading, an understanding of the literary genres involved, attention to the trajectory of biblical ethics (from permission to prohibition in the case of slavery), and a willingness to distinguish between what a text describes, what it commands, what it permits, and what it condemns.
3. Before: The core claims of historic Christianity — the deity and humanity of Christ, the atonement, the resurrection, the authority of Scripture — have been essentially consistent across the major Christian traditions for two thousand years.
   After: The core claims of historic Christianity (the deity and humanity of Christ, the atonement, the resurrection, the authority of Scripture) have been essentially consistent across the major Christian traditions for two thousand years.
4. Before: Where a finding is contested — where scholars disagree about what an artifact proves — this book has tried to represent the spectrum of scholarly opinion rather than presenting the most favorable interpretation as settled fact.
   After: Where a finding is contested, where scholars disagree about what an artifact proves, this book has tried to represent the spectrum of scholarly opinion rather than presenting the most favorable interpretation as settled fact.
5. Before: What they are is honest — the best reading of the best evidence available by someone who has followed the argument where it leads.
   After: What they are is honest: the best reading of the best evidence available by someone who has followed the argument where it leads.

## The whole book

Forty-five of the forty-seven files were edited: the introduction, the thirty-eight chapters, the conclusion, the pastoral note and Appendices A, B, D and E. A Note on Further Reading and Appendix C have no long dash in their prose and nothing else that the method touches, so they are unchanged. In his running prose, all forty-seven files: 44,055 words before, 44,055 after; em-dashes 579 before, 4 after (13.1 to 0.1 per 1,000 words; his limit is 4 to 6); 563 paragraphs before and after. (The table above counts only the forty-five edited files, 42,885 words.) 406 edits. The fact diff passed on every edited file.

**Every edit is punctuation.** All 406 recast a dash as a comma, a colon, a semicolon or brackets, or join two pieces of one thought. No word was added, removed or replaced: the word count is the same before and after in every chapter. In ten places a letter changed case because of the new punctuation, all in the joins: "Not because the evidence against Scripture was overwhelming. But because the silence in that room was." is now one sentence, as the pull quote above it already has it; "with evidence. Not with assertion" (chapter 1); "The Scripture cannot be broken. Cannot err. Cannot fail." is "The Scripture cannot be broken, cannot err, cannot fail." (chapter 12); "Futile. In vain. Worthless." is "Futile, in vain, worthless." (chapter 16); "What sustained it was a text. Copies of Paul's letters ... Copies of the Gospels ... The Old Testament in Greek ..." is one sentence with a colon and semicolons (chapter 19); "Witnesses. Not representatives of an institution" is "Witnesses: not representatives of an institution" (chapter 30). No clause after a dash was made its own sentence.

**Four dashes stay**, each the turn of its sentence: "the dry air of the Judean desert — found, in the end, by a boy looking for a lost goat" (chapter 31) and "Not stupidity — ignorance." (chapter 36); and in the introduction, "But the core case — that these texts are ancient, ... — that core is stronger today than it has ever been", where the dashes carry a sentence that restarts itself and brackets would break it.

**Left alone, and why.** This book's short sentences are nearly all verdicts at the end of an argument, and they stay: "This is not faith. This is fear dressed up as piety." (introduction); "The Bible is not one genre. It is a library." (chapter 11); "Not the cheap faith that ignores the questions. Not the anxious faith ... Something harder and more durable than either" (introduction), which could only be joined by adding words; "Not a naive yes; a studied yes" (chapter 36); the closing triplets of chapters 20, 25 and 30 ("The text is reliable. The argument is made. The invitation is extended."); "Eleven caves. Nearly 900 documents. A boy with a stone and a broken jar." (chapter 31), a closing image that is not a sentence and would not become one by joining. The catalogue of lives in chapter 19 ("The poetry of Gerard Manley Hopkins. The service of William Wilberforce. ...") is a list set as sentences and was left so. The steelman of postmodern theory in chapter 10 ("There is no view from nowhere. There is no neutral standpoint. All interpretation is politically situated.") is the other side's case in its own short form, and is word for word.

**The critic's case.** Every statement of an objection, every steelman and every scholar's position is word for word, with punctuation the only change: Ehrman and Misquoting Jesus (chapters 2, 5, 34 and 37), Wellhausen, Rendtorff, Blum and the crisis in Pentateuchal criticism (chapter 8), Deutero-Isaiah and the disputed Pauline letters (chapter 8), infallibility against inerrancy (chapter 9), Derrida, Foucault, Lyotard and Taylor (chapter 10), the Israel reading of Isaiah 53 and Isaiah 7:14's almah (chapter 15), the three alternatives to the resurrection (chapter 16), the young-earth position and the historical Adam (chapter 22), the five objections of chapter 23, and the canon of the Apocrypha, which the book declines to settle (chapter 21). Where two positions are set side by side (Catholic and Protestant canons; the two explanations of the Temple cleansing; Paul and James) they took the same punctuation or none.

**Forbidden Language list.** None of the listed words is in his prose. "Blessed" occurs once, naming the word of Psalm 1, and was left (item below).

**The files.** Rebuilt after the last chapter: the PDF is still 241 pages (so `client/src/data/ebooks.ts` is unchanged), 1.6 MB; the EPUB 345 KB. `--verify`: the EPUB carries exactly the source folder's text with the listed typesetting (48,545 words compared, no difference); the PDF's pages carry the same text character for character (251,607 against 251,607). The source has 575 fewer words than the original EPUB by the script's count, which counts each spaced dash as a word: that is the 575 dashes taken out. A chapter opening, two body pages and the blank versos before chapter openings were looked at as images.

## For James: things that look wrong, none of them changed

Each item was left exactly as it stands. They were noticed in reading and were not checked against the sources, so each needs checking before it is corrected. The ones a hostile reviewer would find first are marked with a star. Chapters are numbered as the book numbers them (the introduction is `sec01.xhtml`, Chapter One is `sec02.xhtml`).

1. **Translation.** The copyright page says the ESV. About half the Scripture quotations are the ESV's; the rest are the NIV's wording, listed chapter by chapter below. As with Believe, either the quotations are brought to the ESV or the copyright page names both.
2. **Where this book and Believe disagree** (Believe chapter 2, "Can We Actually Trust the Bible?", covers the same ground). Plato's manuscripts: 210 here, 7 in Believe. Homer's: about 1,800 here, about 1,900 in Believe. The Great Isaiah Scroll: chapter 4 here reports Archer's "more than 95 per cent" word for word, where Believe says "essentially identical, word for word" (chapter 31 here then says "Not similar ... Essentially identical"). The confidence figure: Wallace's "92 to 95 percent" here, "ninety-nine and a half percent" agreement in Believe. Glueck is "the most influential American archaeologist" in Believe; Albright is the twentieth century's most influential biblical archaeologist here (Appendix C), which is the usual view. On the scroll and on Albright this book is the more careful of the two; both use the older handbook manuscript counts. None of Believe's text was changed for this.

3. Ch 2: Leningrad Codex (1008 AD) called "the oldest available Hebrew manuscript of the Old Testament" for most of Christian history; the Aleppo Codex (about 930) and the Cairo Codex of the Prophets (dated 895) are older. The same sentence puts 1008 AD "roughly five hundred years after the composition of the latest books" (the latest books are usually dated between the fifth and second centuries BC, so more than a thousand years), and the next sentence speaks of "a thousand years of copying".
4. Ch 2 (against Believe ch 2): manuscript counts. This book: Plato "approximately 210 manuscripts", Homer "approximately 1,800", Caesar "approximately ten", Tacitus twenty, Thucydides and Herodotus eight. Believe chapter 2: Plato 7, Homer about 1,900. The two books disagree on Plato and Homer; the older handbook figures (Plato 7, Thucydides 8, Herodotus 8) are below current counts and a critic will say so.
5. Ch 2: Daniel Wallace is said to have "stated that we can reconstruct the original Greek text to a level of confidence of 92 to 95 percent". I know of no place where Wallace gives that figure; it needs a source. (Believe ch 2 says instead "the textual agreement exceeds ninety-nine and a half percent".)
6. Ch 2: Ehrman's concession that no central doctrine is in jeopardy is said to have come "in a public exchange with his mentor Bruce Metzger". The concession usually cited is in the interview printed in the paperback of Misquoting Jesus; I know of no public exchange with Metzger.
7. Ch 2: "any scroll that failed the count was destroyed" and counting "the middle letter of every book": the Masoretic counts are real; the destruction rule is a popular claim that needs a source.
8. Ch 3: the Muratorian Fragment is said to list twenty-two books and the debated handful is given as "Hebrews, James, 2 Peter, 2 and 3 John, Jude, Revelation". The fragment in fact names Jude, two letters of John and Revelation, and omits Hebrews, James and 1 and 2 Peter; the next sentence counts 1 Peter as accepted everywhere by 200.
9. Ch 3: "Ignatius of Antioch, writing to seven different churches": six of his seven letters went to churches; the seventh is to Polycarp.
10. Ch 4: Albright's letter to Trever is quoted as "My heartiest congratulations on the greatest manuscript discovery of modern times." As usually printed it reads "greatest MS discovery of modern times!" (abbreviation and exclamation in the original).
11. Ch 4: the Isaiah 53:5 block quotation leaves off the ESV's opening "But".
12. Ch 4 (against Believe ch 2): this book reports Archer's "word-for-word identical ... in more than 95 per cent of the text"; Believe says the scroll and the Masoretic text are "essentially identical, word for word". This book is the more careful of the two; Believe's sentence should probably come into line with it.
13. Ch 5: Acts 1:1 is quoted as "the first book I wrote"; the ESV reads "In the first book, O Theophilus, I have dealt with all that Jesus began to do and teach".
14. Ch 5: Ignatius again "writing letters to seven churches" (see ch 3).
15. Ch 6: the Siloam inscription is called "a basalt stone with an inscription cut into it roughly three thousand years ago". It was cut into the limestone wall of the tunnel itself, about 701 BC (some 2,700 years ago).
16. Ch 6: 2 Kings 20:20 ("the pool and the tunnel") and 2 Chronicles 32:30 ("blocked the upper outlet of the Gihon spring and channeled the water down") are in the NIV's wording; the ESV has "conduit" and "closed the upper outlet of the waters of Gihon and directed them down".
17. Ch 6: the Nuzi parallels to the patriarchal customs, and the conclusion that "the customs of the patriarchal narratives fit the second millennium BC, not the first", were seriously challenged in the 1970s (Thompson, Van Seters) and most of the specific parallels are no longer accepted as stated; the claim is made without a hedge.
18. Ch 6: the reading "House of David" on the Mesha Stele is said to be what "most scholars" read; it is Lemaire's restoration and is still disputed.
19. Ch 6: Sennacherib's campaign of 701 BC is called a campaign "against the kingdoms of Judah and Israel". The northern kingdom had fallen to Assyria in 722; the campaign was against Judah (and its coastal allies).
20. Ch 6: Ramsay is said to have spent years "excavating" in Asia Minor; his work was survey and inscriptions rather than excavation.
21. Ch 8: "By the 1970s, scholars like Rolf Rendtorff and Erhard Blum were arguing ...": Rendtorff's book is 1977; Blum's work came in 1984 and 1990.
22. Ch 8: the John 5:46-47 block quotation leaves off the ESV's opening "For".
23. Ch 9: the second Augustine quotation ("If I am perplexed by any passage ...") is introduced as from "a letter responding to critics who point to apparent difficulties"; it is from the same letter to Jerome (Letter 82) as the first.
24. Ch 9: the Chicago Statement is quoted as acknowledging "the use of round numbers, free citations, topical arrangements of material, variant selections of material". Article XIII reads "the use of hyperbole and round numbers, the topical arrangement of material, variant selections of material in parallel accounts, or the use of free citations"; the quotation is not verbatim.
25. Ch 9: "for Luther, Scripture was the norma normans ... by which the church stood or fell": the phrase norma normans belongs to later Lutheran orthodoxy, and "the article by which the church stands or falls" is said of justification, not of Scripture.
26. Ch 11: the Luke 1:3-4 block quotation is in the NIV's wording ("I myself have carefully investigated everything from the beginning ..."), under a copyright line that names the ESV.
27. Ch 12: 2 Timothy 3:16-17 ("God-breathed ... the servant of God may be thoroughly equipped"), 2 Peter 1:21 ("prophets, though human, spoke from God as they were carried along") and Matthew 5:18 ("not the smallest letter, not the least stroke of a pen") are in the NIV's wording. The chapter's argument rests on "God-breathed", which the ESV renders "breathed out by God".
28. ★ Ch 12: "Benjamin Warfield's classic study concluded that the active sense is grammatically correct. God breathed out." Warfield argued the opposite way round: that theopneustos is passive in sense ("God-breathed", produced by the breath of God), and he rejected the active reading ("breathing out God"). The conclusion the chapter draws (Scripture as the product of God's breath) is Warfield's; the grammatical label is reversed.
29. Ch 12: pheromenoi is said to be "the same word used in Acts 27 for a ship being driven by the wind"; Acts 27:15 and 17 use other forms of the same verb (pherō).
30. ★ Ch 13: "I am a pastor. I have spent more than two decades sitting with people in the hardest moments of their lives". On 2026-11-18 James gave the site one fact about his ministry, that he has been a pastor for 16 years (it is said on /about and /connect). The two do not agree; the book's figure may count years before he was a pastor, but a reader will set them side by side.
31. ★ Ch 13: "This is the argument of The Monster in the Mirror": that book is now Blind Spots (renamed 2026-11-22). The old title was left because no word was to be changed; it is a one-word fix if he wants it.
32. Ch 14: "the Elder he quotes is John the Elder, who knew the apostles directly" is stated as fact; who Papias's Elder was, and whether he is the apostle John, is disputed.
33. Ch 15: the 2 Samuel 7:12-13 block quotation is in the NIV's wording ("your own flesh and blood ... a house for my Name").
34. Ch 16: John 7:5 is quoted as "even his brothers did not believe in him" (NIV); the ESV has "For not even his brothers believed in him."
35. ★ Ch 16: hallucinations "do not produce the kind of specific, detailed, physical encounter that Paul describes: Jesus eating, being touched, being present with disciples over forty days." Paul describes none of these; the eating and touching are in Luke and John, the forty days in Acts 1:3.
36. Ch 16: Paul is said to have been "supervising the execution of Stephen"; Acts 7:58 and 8:1 have the witnesses laying their garments at his feet and Saul approving.
37. Ch 18: "after decades of pastoral ministry" (see chapter 13 and the 16 years he gave the site).
38. Ch 18: "The young woman in the front row who blew up the college ministry meeting": in the introduction she sat in the front row of the university class and then spoke at the college ministry; the two scenes are run together here.
39. Ch 19: "Every other religion in the empire found a way to accommodate" the incense to the emperor; the Jews were exempt and did not offer it.
40. Ch 19: 1 Corinthians 1:23 is quoted with "foolishness to Gentiles" (NIV); the ESV has "folly to Gentiles" (and begins "but we preach").
41. Ch 19: Bach "signed every manuscript Soli Deo Gloria": he wrote S.D.G. at the end of many of his scores, not every one.
42. ★ Ch 21: the Hebrew canon is said to have been "formalized at Jamnia around 90 AD". The idea of a council at Jamnia (Yavneh) that closed the canon is now generally abandoned by scholars (the discussions there concerned whether a few books, such as Ecclesiastes and the Song of Songs, "defile the hands").
43. Ch 23: Philemon 16 ("no longer as a slave, but better than a slave, as a dear brother") and Galatians 3:28 ("neither Jew nor Gentile") are in the NIV's wording; the ESV has "bondservant ... beloved brother" and "neither Jew nor Greek".
44. Ch 24: James 1:22 is quoted in the NIV's wording ("Do not merely listen to the word, and so deceive yourselves. Do what it says"); the ESV has "But be doers of the word, and not hearers only, deceiving yourselves."
45. Ch 24: hagah is said to be used "elsewhere ... for the muttering of a person reading to themselves, the ruminating of an animal chewing cud, the cooing of a dove". The muttering and the dove (Isaiah 38:14, 59:11) are right, and it is used of a lion growling (Isaiah 31:4); I know of no use for an animal chewing cud.
46. Ch 24: "Psalm 1 describes the blessed person": "blessed" as an adjective is on CLAUDE.md's Forbidden Language list, but here it names the psalm's own word, so it was left.
47. Ch 27: "Tommy Wasserman, Tommy Hatina": Thomas Hatina works on Mark's use of the Old Testament rather than on textual criticism, and is not usually called Tommy; the name may be a slip for another textual critic.
48. Ch 28: the Chinese believers' memorized texts are said to have been "compared with the available manuscripts" after the Cultural Revolution, with striking accuracy; this needs a source.
49. Ch 30: 2 Corinthians 3:2-3 and Acts 1:8 are in the NIV's wording ("You show that you are a letter from Christ"; "you will receive power when the Holy Spirit comes on you").
50. ★ Ch 30: "I have saved this chapter for last, before the conclusion", but eight more chapters (31 to 38) follow it, and chapter 25 is already "A Final Word". The order reads as if chapters 31 to 38 were added later; the numbering also changes there from words ("Chapter Thirty") to figures ("Chapter 31").
51. Ch 31: the find is "nearly 900 documents, fragments of approximately 220 different manuscripts". The usual figures are some 900 manuscripts in all, of which about 220 to 230 are biblical; as written the two numbers seem to describe the same set.
52. Ch 31 (against chapter 4 and Believe ch 2): the Great Isaiah Scroll is "Not similar. Not roughly comparable. Essentially identical", while chapter 4 quotes Archer's "more than 95 per cent". The verdict here is stronger than the evidence chapter 4 gives.
53. Ch 31: the copyists between 125 BC and 1008 AD are named as "the Masoretes"; the Masoretes worked from about 500 to 1000 AD (chapter 2 says so), so most of those eleven centuries of copying were done by earlier scribes.
54. ★ Ch 31: "when the early Christians said Jesus was the fulfillment of what the Scrolls called "the Teacher of Righteousness" expectation". The Teacher of Righteousness is the Qumran community's own founding leader, not a messianic expectation, and the early Christians did not present Jesus as his fulfilment. The sentence needs rewriting by him.
55. Ch 32: Ramsay "planned to prove Luke unreliable through archaeology ... he had no theological agenda". His own account (St. Paul the Traveller) is that he began holding the Tübingen view of Acts as a late composition, not that he set out to disprove it; the story as told is the popular form.
56. Ch 32: "politarch ... confirmed by nineteen inscriptions, seventeen of them in Macedonia" is the 1898 count (Burton); more than thirty are now known.
57. Ch 32: the titles Luke uses are listed as "proconsul, propraetor, praetor, tetrarch"; "propraetor" does not occur in Acts.
58. Ch 35: Diocletian "reportedly had a monument erected reading: "The Christian name has been extinguished."" The inscriptions usually cited for this are generally regarded as forgeries (they come from a sixteenth-century collection); the hedge "reportedly" is his, and kept.
59. Ch 37: Ehrman is said to date Paul's reception of the creed "to within two to five years of the event itself", and the creed is quoted with "according to the Scriptures" (chapter 5 quotes the ESV's "in accordance with the Scriptures"). The Ehrman figure needs its source.
60. Conclusion: "Jesus says: feed my sheep, tend my lambs, follow me". John 21 has "Feed my lambs", "Tend my sheep", "Feed my sheep" (then "Follow me"); the block quotation "Do you love me?" is referenced only as "John 21".
61. Conclusion and chapter 25: he came to faith "at eighteen, when a Christian roommate sat with my atheist questions"; chapter 18's turning conversation is with a seminary professor in graduate school. These are two different moments and both may be true; they are listed only because a reader meets both.
62. A Note on Further Reading: Metzger's The Text of the New Testament is listed as "the standard scholarly treatment", and then "Metzger and Ehrman's fourth edition of The Text of the New Testament" is listed beside it as a second book; the fourth edition (2005) is the same book, revised with Ehrman.
63. ★ Appendix E: "The list of New Testament books recognized at Nicaea was essentially the list that had already been in broad use for over a century." Chapter 3 says, rightly, that Nicaea produced no list of books ("There is no surviving record of a canonical debate at Nicaea"). The appendix contradicts the chapter.
64. Appendix B (against chapter 6): the Siloam inscription is "cut into the rock at the exit of Hezekiah's Tunnel", which is right; chapter 6 calls it "a basalt stone" in Istanbul (the inscription was cut out of the tunnel wall and taken to Istanbul in 1891).

## Questions only James can answer

1. Which translation? The copyright page says ESV; about half the quotations are the NIV's. Bring the quotations to the ESV, or have the copyright page name the NIV as well?
2. "More than two decades" (chapter 13) and "decades of pastoral ministry" (chapter 18), against the 16 years as a pastor you gave the site. Which number should the book say, or do the decades count the years before you were a pastor?
3. Chapter 13 names "The Monster in the Mirror". Change it to Blind Spots?
4. The order of the book: chapter 25 is "A Final Word" and chapter 30 says "I have saved this chapter for last, before the conclusion", but chapters 31 to 38 follow, numbered in figures where the first thirty are in words. Keep the order, move chapters 31 to 38, or change those two sentences?
5. Do you want the starred items corrected? Most are a word or a figure (Jamnia, the Muratorian list, propraetor, John 21's lambs and sheep); two mean rewriting a sentence of the argument (Warfield's "active sense" in chapter 12, the Teacher of Righteousness in chapter 31), and one is a contradiction inside the book (Appendix E's list "recognized at Nicaea" against chapter 3).
6. Several chapters overlap closely (the Dead Sea Scrolls in chapters 4 and 31 and Appendix B; Ramsay in chapters 6 and 32 and Appendix C; the student in the front row in the introduction, chapter 13 and chapter 18). Is the repetition meant, or should a later edit fold them together? Nothing was cut here.


## 2026-11-25: an academic introduction (James: "very academic and intellectual")

James, 2026-11-25: "I don't like a lot of the introductions to a lot of the books. I want them to be very academic and intellectual." The introduction (`sec01.xhtml`) gained one section, "The State of the Question", before "Three Things This Book Sets Out to Show": the critical tradition from Spinoza (1670) and Wellhausen; textual criticism (Metzger's The Text of the New Testament, 1964; Ehrman's Misquoting Jesus, 2005, granted its true claim; the Dead Sea Scrolls from 1947); the canon (Metzger, 1987; Athanasius, 367); the history of the Gospels and the Old Testament (F. F. Bruce, 1943; Blomberg, 1987; Bauckham, 2006; Kitchen, 2003; the Tel Dan inscription, 1993); and two cautions, on what archaeology can prove and on keeping transmission apart from authority (the Chicago Statement, 1978). No one is quoted. Every other word of the introduction, including James's account of his own coming to faith, is unchanged, and no other chapter was touched. Rebuilt with `node scripts/build-book-files.mjs the-reliability-of-scripture --verify` (identical: true); 241 pages became 243.
