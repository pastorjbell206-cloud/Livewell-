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
| **All 10** | 12,200 | 12,200 | +0.0% | 165 (13.5) | 2 (0.2) | 310 (25.4) | 149 (12.2) | 115 | |

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
