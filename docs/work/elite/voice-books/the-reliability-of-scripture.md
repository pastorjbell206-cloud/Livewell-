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
| **All 31** | 32,419 | 32,419 | +0.0% | 430 (13.3) | 2 (0.1) | 854 (26.3) | 437 (13.5) | 302 | |

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
