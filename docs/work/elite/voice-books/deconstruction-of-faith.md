# The Deconstruction of Faith: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the sixth book, The Deconstruction of Faith (id `deconstruction-of-faith`), edited in `content/books-src/deconstruction-of-faith/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit 987f6964; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The method is the one recorded in `believe.md` and `the-reliability-of-scripture.md`, beside this file.

## Method

The Deconstruction of Faith is written to the person deconstructing, to the pastor and to the parent, in long sentences, with 477 long dashes in the 44,834 words of his running prose (10.6 per 1,000 words, against his limit of 4 to 6), four runs of three fragments and three one-line paragraphs. So the work was the dashes.

What an edit may be: an em-dash recast as a comma, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into one sentence where no new word is needed. Nothing else: no word was added, removed or replaced, and no sentence, fact, example or opinion was added or taken out. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff 987f6964 -- content/books-src/deconstruction-of-faith/` shows every change). One commit per chapter. In the tables an "edit" is one changed paragraph, which may hold several dashes.

**How the dashes were worked, and what that means.** Unlike the first four books, the chapters were not each read whole before editing. Every long dash in his running prose was given a recast by one fixed rule: a pair of dashes around an aside became commas, or brackets where the aside itself holds a comma or a question; a single dash before "and", "but", "which", "because", "not" and the like became a comma; before an independent clause, a semicolon; before a list, a colon; otherwise a comma. Each proposal was then read in its sentence, and where the rule chose wrongly it was overridden (62 overrides in this book). The fact diff below is what proves nothing but punctuation moved.

**The contested questions.** The book takes up purity culture, abuse in the church, politics, science and Genesis, hell, sexuality and the Old Testament's violence, and on most of them states more than one position. Every position, every concession, every apology the book asks the church to make and every line to the person who has left took punctuation only; where the book criticizes the right and the left, both took the same treatment.

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (the fact diff holds them fixed), and so does anything a chapter sets after its running prose (questions for reflection, takeaways, sources), which the fact diff also leaves out of the prose it checks.

Three scripts, kept outside the repo in `/home/user/vs5/t/` (`apply.py`, `factdiff.py`, `tells.py`, with `propose.py` for the rule), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Exodus Nobody Wanted | 1,775 | 1,775 | +0.0% | 14 (7.9) | 0 (0.0) | 33 (18.6) | 20 (11.3) | 14 | PASS |
| Chapter One: What Deconstruction Actually Is | 1,814 | 1,814 | +0.0% | 19 (10.5) | 0 (0.0) | 42 (23.2) | 23 (12.7) | 15 | PASS |
| Chapter Two: What They Are Really Leaving | 2,001 | 2,001 | +0.0% | 25 (12.5) | 0 (0.0) | 50 (25.0) | 26 (13.0) | 18 | PASS |
| Chapter Three: Why the Church Keeps Missing It | 1,976 | 1,976 | +0.0% | 24 (12.1) | 0 (0.0) | 46 (23.3) | 23 (11.6) | 19 | PASS |
| Chapter Four: The Bible the Critics Found | 1,916 | 1,916 | +0.0% | 22 (11.5) | 0 (0.0) | 61 (31.8) | 39 (20.4) | 17 | PASS |
| Chapter Five: The Jesus Who Was Buried Under the Brand | 1,873 | 1,873 | +0.0% | 22 (11.7) | 0 (0.0) | 54 (28.8) | 32 (17.1) | 16 | PASS |
| Chapter Six: The History the Youth Group Did Not Teach | 2,104 | 2,104 | +0.0% | 32 (15.2) | 0 (0.0) | 67 (31.8) | 36 (17.1) | 21 | PASS |
| Chapter Seven: The Path Through | 1,780 | 1,780 | +0.0% | 23 (12.9) | 0 (0.0) | 56 (31.5) | 34 (19.1) | 20 | PASS |
| Chapter Eight: What the Church Owes the Deconstructors | 2,045 | 2,045 | +0.0% | 24 (11.7) | 0 (0.0) | 55 (26.9) | 31 (15.2) | 18 | PASS |
| Chapter Nine: The Sociology of Loss | 2,759 | 2,759 | +0.0% | 20 (7.2) | 0 (0.0) | 50 (18.1) | 30 (10.9) | 18 | PASS |
| Chapter Ten: Science, Creation, and the False Choice | 2,643 | 2,643 | +0.0% | 23 (8.7) | 0 (0.0) | 53 (20.1) | 31 (11.7) | 19 | PASS |
| Chapter Eleven: The Problem of Hell Revisited | 2,770 | 2,770 | +0.0% | 24 (8.7) | 0 (0.0) | 60 (21.7) | 37 (13.4) | 19 | PASS |
| Chapter Twelve: Sexuality, the Body, and the Scriptural Imagination | 2,866 | 2,866 | +0.0% | 29 (10.1) | 0 (0.0) | 67 (23.4) | 39 (13.6) | 16 | PASS |
| Chapter Thirteen: The Spiritual Abuse Reckoning | 2,291 | 2,291 | +0.0% | 21 (9.2) | 0 (0.0) | 45 (19.6) | 26 (11.3) | 18 | PASS |
| Chapter Fourteen: Doubt as Devotion | 2,761 | 2,761 | +0.0% | 31 (11.2) | 0 (0.0) | 59 (21.4) | 27 (9.8) | 21 | PASS |
| Chapter Fifteen: Reconstruction | 2,424 | 2,424 | +0.0% | 31 (12.8) | 0 (0.0) | 67 (27.6) | 36 (14.9) | 18 | PASS |
| Chapter Sixteen: The Church We Could Still Become | 2,889 | 2,889 | +0.0% | 32 (11.1) | 0 (0.0) | 83 (28.7) | 52 (18.0) | 23 | PASS |
| Chapter Seventeen: Parents of Deconstructors | 2,295 | 2,295 | +0.0% | 25 (10.9) | 0 (0.0) | 46 (20.0) | 21 (9.2) | 15 | PASS |
| Chapter Eighteen: Pastors in the Aftermath | 2,192 | 2,192 | +0.0% | 22 (10.0) | 0 (0.0) | 54 (24.6) | 32 (14.6) | 16 | PASS |
| Conclusion: What We Owe Each Other | 1,660 | 1,660 | +0.0% | 14 (8.4) | 0 (0.0) | 37 (22.3) | 25 (15.1) | 11 | PASS |
| **All 20** | 44,834 | 44,834 | +0.0% | 477 (10.6) | 0 (0.0) | 1085 (24.2) | 620 (13.8) | 352 | |

## Introduction: The Exodus Nobody Wanted (`sec01.xhtml`)

Words 1,775 to 1,775. Em-dashes in his prose 14 to 0 (7.9 to 0.0 per 1,000 words). Tells 33 to 20 (18.6 to 11.3 per 1,000). Mean sentence 29.1 words to 30.1; sentences of eight words or fewer 21.3% to 18.6%; of five or fewer 11.5% to 8.5%. 14 edits; paragraphs 16 to 16. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 0.

By kind (before to after): emdash 14 to 0, not_but 1 to 1, NotX.Y 2 to 0, isnt_its 1 to 1, triplet 7 to 10, frag3 1 to 0, intens 4 to 4, colon_reveal 0 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 47 number words, proper names by count, and 37 hedge words (after: 37) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Consider the woman who gave fifteen years to youth ministry — who led worship and taught Bible studies, who went on three mission trips to places where the electricity cut out every afternoon, who led other people's children to Jesus and prayed with her own children every night from the moment they could form words.
   After: Consider the woman who gave fifteen years to youth ministry, who led worship and taught Bible studies, who went on three mission trips to places where the electricity cut out every afternoon, who led other people's children to Jesus and prayed with her own children every night from the moment they could form words.
2. Before: This book is written toward four people at once, and the first is the deconstructor who has not landed anywhere — the one who read the books and listened to the podcasts, who cried in the car after the service one Sunday and simply did not go back.
   After: This book is written toward four people at once, and the first is the deconstructor who has not landed anywhere, the one who read the books and listened to the podcasts, who cried in the car after the service one Sunday and simply did not go back.
3. Before: the share of Americans who identify as Christian has fallen from roughly eighty percent at the turn of the century to somewhere near sixty-five percent today, and the curve is accelerating rather than leveling off — and among adults under thirty the figures are worse still.
   After: the share of Americans who identify as Christian has fallen from roughly eighty percent at the turn of the century to somewhere near sixty-five percent today, and the curve is accelerating rather than leveling off, and among adults under thirty the figures are worse still.
4. Before: The faith is not flexible in its essentials — Jesus rose from the dead or he did not, he is Lord or he is not, Scripture is true or it is not, and there is no third option on any of those claims, so pretending there is amounts to a failure of love dressed up as kindness.
   After: The faith is not flexible in its essentials: Jesus rose from the dead or he did not, he is Lord or he is not, Scripture is true or it is not, and there is no third option on any of those claims, so pretending there is amounts to a failure of love dressed up as kindness.
5. Before: The aim throughout has been to close the distance — between the page and the reader, between the pastor and the person who no longer trusts him, between the institution and the human being it failed.
   After: The aim throughout has been to close the distance, between the page and the reader, between the pastor and the person who no longer trusts him, between the institution and the human being it failed.


## Chapter One: What Deconstruction Actually Is (`sec02.xhtml`)

Words 1,814 to 1,814. Em-dashes in his prose 19 to 0 (10.5 to 0.0 per 1,000 words). Tells 42 to 23 (23.2 to 12.7 per 1,000). Mean sentence 29.3 words to 29.3; sentences of eight words or fewer 11.3% to 11.3%; of five or fewer 8.1% to 8.1%. 15 edits; paragraphs 22 to 22. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 19 to 0, not_but 5 to 5, isnt_its 6 to 6, triplet 5 to 5, anaphora 1 to 1, stock 2 to 2, intens 1 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 18 number words, proper names by count, and 42 hedge words (after: 42) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Deconstruction is the process of examining the beliefs you inherited to determine which are actually load-bearing, which are cultural accretion, and which are simply wrong — which is, in other words, exactly what every serious Christian is supposed to do.
   After: Deconstruction is the process of examining the beliefs you inherited to determine which are actually load-bearing, which are cultural accretion, and which are simply wrong, which is, in other words, exactly what every serious Christian is supposed to do.
2. Before: These three words matter because churches keep treating deconstruction as if it were deconversion, while deconstructors keep treating deconversion as if it were renovation — and both are category errors that cost people who did not have to be lost.
   After: These three words matter because churches keep treating deconstruction as if it were deconversion, while deconstructors keep treating deconversion as if it were renovation, and both are category errors that cost people who did not have to be lost.
3. Before: The pastor misread the phase, and his misreading cost the church a member — it may yet cost more. The opposite error is more common in the podcast ecosystem, where a Christian begins to ask hard questions, finds a community of other people asking hard questions, and is told, explicitly or by the very shape of the conversation, that the questions themselves are the point — that doubt is a virtue, that certainty is the enemy, that the faithful response to a hard question is to keep the question open forever.
   After: The pastor misread the phase, and his misreading cost the church a member; it may yet cost more. The opposite error is more common in the podcast ecosystem, where a Christian begins to ask hard questions, finds a community of other people asking hard questions, and is told, explicitly or by the very shape of the conversation, that the questions themselves are the point: that doubt is a virtue, that certainty is the enemy, that the faithful response to a hard question is to keep the question open forever.
4. Before: Church went from a thing that made sense of their life to a thing that happened on Sunday mornings, and the questions they are now asking are not really questions at all — they are reasons, scaffolding for a decision that was made six months ago in their stomach.
   After: Church went from a thing that made sense of their life to a thing that happened on Sunday mornings, and the questions they are now asking are not really questions at all; they are reasons, scaffolding for a decision that was made six months ago in their stomach.
5. Before: The American church told its children some things — about Jesus, about Scripture, about holiness, about power — that do not hold up to examination.
   After: The American church told its children some things (about Jesus, about Scripture, about holiness, about power) that do not hold up to examination.


## Chapter Two: What They Are Really Leaving (`sec03.xhtml`)

Words 2,001 to 2,001. Em-dashes in his prose 25 to 0 (12.5 to 0.0 per 1,000 words). Tells 50 to 26 (25.0 to 13.0 per 1,000). Mean sentence 29.4 words to 29.4; sentences of eight words or fewer 20.6% to 20.6%; of five or fewer 10.3% to 10.3%. 18 edits; paragraphs 22 to 22. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 25 to 0, not_but 3 to 3, isnt_its 2 to 2, triplet 8 to 9, anaphora 1 to 1, intens 2 to 2, colon_reveal 3 to 3, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 3 Scripture references, 0 years, 0 numbers in digits, 25 number words, proper names by count, and 51 hedge words (after: 51) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Most deconstruction is not about Jesus; it is about the package Jesus was sold inside, and anyone who wants to understand why people are walking out has to look hard at the package, because the package — not the risen Christ at the center of it — is what they are actually leaving.
   After: Most deconstruction is not about Jesus; it is about the package Jesus was sold inside, and anyone who wants to understand why people are walking out has to look hard at the package, because the package, not the risen Christ at the center of it, is what they are actually leaving.
2. Before: They kept coming — Catholic first, then evangelical, then denomination after denomination:
   After: They kept coming: Catholic first, then evangelical, then denomination after denomination:
3. Before: There are progressive versions of the same captivity — churches that have let their politics rewrite their theology exactly as thoroughly as conservative churches have — and the captivity itself is the problem, not the direction it leans.
   After: There are progressive versions of the same captivity (churches that have let their politics rewrite their theology exactly as thoroughly as conservative churches have) and the captivity itself is the problem, not the direction it leans.
4. Before: Across the American church, from the pew to the pulpit, the Bible is cited constantly and engaged rarely — a person can attend an evangelical church for twenty years and never have worked through a single book of it slowly, in context, with the flow of the argument intact.
   After: Across the American church, from the pew to the pulpit, the Bible is cited constantly and engaged rarely; a person can attend an evangelical church for twenty years and never have worked through a single book of it slowly, in context, with the flow of the argument intact.
5. Before: The next chapter is about why the church keeps missing what is actually being said — and how to stop.
   After: The next chapter is about why the church keeps missing what is actually being said, and how to stop.


## Chapter Three: Why the Church Keeps Missing It (`sec04.xhtml`)

Words 1,976 to 1,976. Em-dashes in his prose 24 to 0 (12.1 to 0.0 per 1,000 words). Tells 46 to 23 (23.3 to 11.6 per 1,000). Mean sentence 23.8 words to 23.8; sentences of eight words or fewer 22.9% to 22.9%; of five or fewer 7.2% to 7.2%. 19 edits; paragraphs 24 to 24. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 24 to 0, not_but 3 to 3, NotX.Y 1 to 1, isnt_its 3 to 3, triplet 7 to 8, intens 3 to 3, colon_reveal 1 to 1, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 32 number words, proper names by count, and 37 hedge words (after: 37) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The pastor answers the thing he heard, and the deconstructor — hearing a man who did not hear them — says it again, louder, while the pastor, still registering threat and not grief, answers with more force.
   After: The pastor answers the thing he heard, and the deconstructor, hearing a man who did not hear them, says it again, louder, while the pastor, still registering threat and not grief, answers with more force.
2. Before: The second reflex is to file the deconstructor under an enemy tribe — the critic who names political captivity becomes a liberal, the one wounded by purity culture a progressive, the one grieving the abuse scandals someone who has been listening to the wrong podcasts.
   After: The second reflex is to file the deconstructor under an enemy tribe, the critic who names political captivity becomes a liberal, the one wounded by purity culture a progressive, the one grieving the abuse scandals someone who has been listening to the wrong podcasts.
3. Before: The pastor reaches for the sermon he would preach with thirty minutes and a pulpit and delivers a compressed version of it at the coffee table, certain the whole time that he is helping — but the deconstructor is not in the market for a sermon.
   After: The pastor reaches for the sermon he would preach with thirty minutes and a pulpit and delivers a compressed version of it at the coffee table, certain the whole time that he is helping, but the deconstructor is not in the market for a sermon.
4. Before: The discipline is to stay in the room with the worst version of the question, so that when a person says, I am not sure I believe the resurrection anymore, the answer is, tell me more — said without flinching.
   After: The discipline is to stay in the room with the worst version of the question, so that when a person says, I am not sure I believe the resurrection anymore, the answer is, tell me more, said without flinching.
5. Before: Sometimes she comes back — not right away, but months later, in a different seat than she used to take, reading the Bible more carefully than the pastor does, her questions sharper than before and her faith stronger than it has ever been.
   After: Sometimes she comes back, not right away, but months later, in a different seat than she used to take, reading the Bible more carefully than the pastor does, her questions sharper than before and her faith stronger than it has ever been.


## Chapter Four: The Bible the Critics Found (`sec05.xhtml`)

Words 1,916 to 1,916. Em-dashes in his prose 22 to 0 (11.5 to 0.0 per 1,000 words). Tells 61 to 39 (31.8 to 20.4 per 1,000). Mean sentence 23.7 words to 23.7; sentences of eight words or fewer 34.6% to 34.6%; of five or fewer 18.5% to 18.5%. 17 edits; paragraphs 24 to 24. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 22 to 0, not_but 4 to 4, isnt_its 1 to 1, triplet 8 to 8, anaphora 6 to 6, stock 4 to 4, intens 7 to 7, short_close 9 to 9.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 0 numbers in digits, 35 number words, proper names by count, and 25 hedge words (after: 25) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: There is a version of the Bible handed out in Sunday school, and there is a version atheists describe on YouTube, and neither one is quite the Bible — because the actual book is stranger, older, and more disruptive than either party wants to admit, and a person in deconstruction who picks it up honestly is, for the first time, in a fair fight with it.
   After: There is a version of the Bible handed out in Sunday school, and there is a version atheists describe on YouTube, and neither one is quite the Bible, because the actual book is stranger, older, and more disruptive than either party wants to admit, and a person in deconstruction who picks it up honestly is, for the first time, in a fair fight with it.
2. Before: The critic says the Bible was decided by a council of politically motivated men who picked winners and excluded losers — the popular version is Dan Brown, and the scholarly version is more sophisticated and more wrong — but there was never a moment at which a committee sat down with a pile of equally authoritative documents and voted.
   After: The critic says the Bible was decided by a council of politically motivated men who picked winners and excluded losers (the popular version is Dan Brown, and the scholarly version is more sophisticated and more wrong) but there was never a moment at which a committee sat down with a pile of equally authoritative documents and voted.
3. Before: Each one is either an apparent discrepancy that dissolves on closer reading or a real variation that reflects the character of eyewitness testimony — because real witnesses of real events do not give identical accounts; they give overlapping, differently angled accounts that agree on the load-bearing facts and differ on the rest.
   After: Each one is either an apparent discrepancy that dissolves on closer reading or a real variation that reflects the character of eyewitness testimony, because real witnesses of real events do not give identical accounts; they give overlapping, differently angled accounts that agree on the load-bearing facts and differ on the rest.
4. Before: The revisionist readings, charitable as some of them are, require theological moves that, applied consistently, dissolve the authority of Scripture itself — because the method that rescues those texts can rescue any text from any claim.
   After: The revisionist readings, charitable as some of them are, require theological moves that, applied consistently, dissolve the authority of Scripture itself, because the method that rescues those texts can rescue any text from any claim.
5. Before: The Bereans did not defend Paul; they examined what he said against Scripture, and the church is asked to do the same with its inheritance — for if the inheritance survives the examination, it survives stronger, and if parts of it turn out to be sediment rather than gold, let them go.
   After: The Bereans did not defend Paul; they examined what he said against Scripture, and the church is asked to do the same with its inheritance, for if the inheritance survives the examination, it survives stronger, and if parts of it turn out to be sediment rather than gold, let them go.


## Chapter Five: The Jesus Who Was Buried Under the Brand (`sec06.xhtml`)

Words 1,873 to 1,873. Em-dashes in his prose 22 to 0 (11.7 to 0.0 per 1,000 words). Tells 54 to 32 (28.8 to 17.1 per 1,000). Mean sentence 30.2 words to 30.2; sentences of eight words or fewer 12.9% to 12.9%; of five or fewer 8.1% to 8.1%. 16 edits; paragraphs 23 to 23. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 22 to 0, not_but 9 to 9, NotX.Y 1 to 1, isnt_its 5 to 5, triplet 10 to 10, anaphora 2 to 2, stock 1 to 1, short_close 3 to 3, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 9 Scripture references, 0 years, 4 numbers in digits, 26 number words, proper names by count, and 20 hedge words (after: 20) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Read the Gospels for a month — only the Gospels, with no commentary beside them and no sermon in the ear — Matthew, Mark, Luke, and John, straight through and slowly, as though the story were arriving for the first time.
   After: Read the Gospels for a month (only the Gospels, with no commentary beside them and no sermon in the ear) Matthew, Mark, Luke, and John, straight through and slowly, as though the story were arriving for the first time.
2. Before: Then there is the Jesus who indicts the religious establishment — and to feel the weight of him you have to read Matthew 23 aloud and listen to the rhythm of it.
   After: Then there is the Jesus who indicts the religious establishment, and to feel the weight of him you have to read Matthew 23 aloud and listen to the rhythm of it.
3. Before: Jesus told that story to Pharisees, not to prodigals — so the domesticated reading, which has the Pharisees cheering the welcome of the younger son, gets it exactly backward, because the parable is aimed straight at their chest.
   After: Jesus told that story to Pharisees, not to prodigals, so the domesticated reading, which has the Pharisees cheering the welcome of the younger son, gets it exactly backward, because the parable is aimed straight at their chest.
4. Before: It is not a trick or a loophole — it is what the whole Bible has pointed at since Genesis 3.
   After: It is not a trick or a loophole; it is what the whole Bible has pointed at since Genesis 3.
5. Before: The next chapter is about the history that was never taught — the church has done terrible things and faithful things, and the faithful version of Christian history is stronger than the sanitized one its critics assume is being hidden.
   After: The next chapter is about the history that was never taught; the church has done terrible things and faithful things, and the faithful version of Christian history is stronger than the sanitized one its critics assume is being hidden.


## Chapter Six: The History the Youth Group Did Not Teach (`sec07.xhtml`)

Words 2,104 to 2,104. Em-dashes in his prose 32 to 0 (15.2 to 0.0 per 1,000 words). Tells 67 to 36 (31.8 to 17.1 per 1,000). Mean sentence 26.6 words to 26.6; sentences of eight words or fewer 16.5% to 16.5%; of five or fewer 10.1% to 10.1%. 21 edits; paragraphs 25 to 25. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 32 to 0, not_but 3 to 3, isnt_its 3 to 3, triplet 18 to 19, anaphora 3 to 3, stock 1 to 1, intens 3 to 3, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 1 years, 2 numbers in digits, 41 number words, proper names by count, and 41 hedge words (after: 41) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Most American Christians received church history not as a story but as a charge sheet — in pieces, somewhere between high school and college, usually read aloud in the mouth of a critic — and the indictment runs the same way every time:
   After: Most American Christians received church history not as a story but as a charge sheet (in pieces, somewhere between high school and college, usually read aloud in the mouth of a critic) and the indictment runs the same way every time:
2. Before: Start here, because this is the period the critic imagines as either a purer time the later church betrayed or a fiction the later church invented — and it is neither.
   After: Start here, because this is the period the critic imagines as either a purer time the later church betrayed or a fiction the later church invented, and it is neither.
3. Before: The full story is uglier in places than the critic knows and more complicated in others than the defender admits — which is what makes it a history rather than a verdict.
   After: The full story is uglier in places than the critic knows and more complicated in others than the defender admits, which is what makes it a history rather than a verdict.
4. Before: The movement that dismantled American legal segregation was, at its center, a Christian movement — and that is not a flattering reading imposed after the fact, but the plain shape of the thing.
   After: The movement that dismantled American legal segregation was, at its center, a Christian movement, and that is not a flattering reading imposed after the fact, but the plain shape of the thing.
5. Before: The path through the questions begins there — not around them, but through them — and what rebuilt faith actually looks like, what it does not look like, and why those who have reached it call the cost worth paying is the work of what comes next.
   After: The path through the questions begins there (not around them, but through them) and what rebuilt faith actually looks like, what it does not look like, and why those who have reached it call the cost worth paying is the work of what comes next.


## Chapter Seven: The Path Through (`sec08.xhtml`)

Words 1,780 to 1,780. Em-dashes in his prose 23 to 0 (12.9 to 0.0 per 1,000 words). Tells 56 to 34 (31.5 to 19.1 per 1,000). Mean sentence 31.8 words to 31.8; sentences of eight words or fewer 26.8% to 26.8%; of five or fewer 17.9% to 17.9%. 20 edits; paragraphs 22 to 22. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 1 to 1.

By kind (before to after): emdash 23 to 0, not_but 6 to 6, NotX.Y 4 to 4, isnt_its 3 to 3, triplet 10 to 10, frag3 1 to 1, anaphora 1 to 1, stock 4 to 4, colon_reveal 0 to 1, short_close 3 to 3, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 4 Scripture references, 0 years, 2 numbers in digits, 32 number words, proper names by count, and 27 hedge words (after: 27) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The terrain can be described, but the road cannot be paved in advance, because it has to be walked — and what can be set down is only the difference between those who came out the other side carrying a stronger faith than they brought in and those who got stuck somewhere in the middle, a difference that is not a formula but something closer to the shared habits of good travelers, who arrive by different routes, at different paces, with different temperaments, and yet hold a few disciplines in common.
   After: The terrain can be described, but the road cannot be paved in advance, because it has to be walked, and what can be set down is only the difference between those who came out the other side carrying a stronger faith than they brought in and those who got stuck somewhere in the middle, a difference that is not a formula but something closer to the shared habits of good travelers, who arrive by different routes, at different paces, with different temperaments, and yet hold a few disciplines in common.
2. Before: It is not a sign of having left the faith — it is a sign of having finally entered it. For doubt there is Augustine's Confessions, and Dostoevsky, and the Cloud of Unknowing; there is Julian of Norwich, who watched a plague kill a third of her neighbors and then wrote that all shall be well, and all shall be well, and all manner of thing shall be well — not as a platitude but as a costly claim she had earned; there is Bonhoeffer, writing from a Nazi prison, and Lewis, writing through the death of his wife, and Habakkuk, who stood on his watchtower and demanded that God answer him and received an answer he was still working out when the book ran out of pages.
   After: It is not a sign of having left the faith; it is a sign of having finally entered it. For doubt there is Augustine's Confessions, and Dostoevsky, and the Cloud of Unknowing; there is Julian of Norwich, who watched a plague kill a third of her neighbors and then wrote that all shall be well, and all shall be well, and all manner of thing shall be well, not as a platitude but as a costly claim she had earned; there is Bonhoeffer, writing from a Nazi prison, and Lewis, writing through the death of his wife, and Habakkuk, who stood on his watchtower and demanded that God answer him and received an answer he was still working out when the book ran out of pages.
3. Before: The Jesus of the Gospels is not more fragile than the one Thomas met, which means the unresolved questions may remain unresolved as long as they need to — what matters is staying in motion toward the truth and continuing to examine it.
   After: The Jesus of the Gospels is not more fragile than the one Thomas met, which means the unresolved questions may remain unresolved as long as they need to; what matters is staying in motion toward the truth and continuing to examine it.
4. Before: Lewis held that prayer is not a mechanism for changing God but a means of becoming the kind of person for whom certain things are possible, and the same holds for every Christian practice — communion, confession, singing, reading the Scriptures aloud, giving, serving, sabbath — none of which require certainty, all of which form a self that becomes, over time, more able to see what is actually there.
   After: Lewis held that prayer is not a mechanism for changing God but a means of becoming the kind of person for whom certain things are possible, and the same holds for every Christian practice (communion, confession, singing, reading the Scriptures aloud, giving, serving, sabbath) none of which require certainty, all of which form a self that becomes, over time, more able to see what is actually there.
5. Before: The cloud cannot be seen, but it can be felt — in the songs that still cannot be sung without crying, in the old prayers that have never been left behind, in the Sunday set aside for staying home that ends with weeping in the kitchen.
   After: The cloud cannot be seen, but it can be felt, in the songs that still cannot be sung without crying, in the old prayers that have never been left behind, in the Sunday set aside for staying home that ends with weeping in the kitchen.


## Chapter Eight: What the Church Owes the Deconstructors (`sec09.xhtml`)

Words 2,045 to 2,045. Em-dashes in his prose 24 to 0 (11.7 to 0.0 per 1,000 words). Tells 55 to 31 (26.9 to 15.2 per 1,000). Mean sentence 34.1 words to 34.1; sentences of eight words or fewer 30.0% to 30.0%; of five or fewer 15.0% to 15.0%. 18 edits; paragraphs 18 to 18. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 24 to 0, not_but 7 to 7, isnt_its 2 to 2, triplet 11 to 11, anaphora 1 to 1, stock 1 to 1, intens 1 to 1, short_close 8 to 8.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 6 Scripture references, 0 years, 0 numbers in digits, 31 number words, proper names by count, and 37 hedge words (after: 37) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: This chapter is for the pastors, the parents, the elders, the small-group leaders, the church members who have watched someone they love walk away and have not known what to do — and it is the hardest chapter in the book, because the one indicted most severely is the church itself, and the church includes the people writing and reading these words.
   After: This chapter is for the pastors, the parents, the elders, the small-group leaders, the church members who have watched someone they love walk away and have not known what to do, and it is the hardest chapter in the book, because the one indicted most severely is the church itself, and the church includes the people writing and reading these words.
2. Before: We owe them the whole Bible, not only the parts that support our tribe's current position, and that means we preach through books, we sit inside a text, and we let Scripture ask us hard questions rather than only supply answers to the questions we were already asking — we stop using verses like credentials and start reading the Bible like the strange, difficult, living document it is.
   After: We owe them the whole Bible, not only the parts that support our tribe's current position, and that means we preach through books, we sit inside a text, and we let Scripture ask us hard questions rather than only supply answers to the questions we were already asking; we stop using verses like credentials and start reading the Bible like the strange, difficult, living document it is.
3. Before: We owe them honesty about ourselves, and our own repentance, visible and costly — because the deconstructor is tired of pastors who are too polished and wants to see the cracks, to know what the pastor has doubted, what he has repented of, and what he still has not figured out.
   After: We owe them honesty about ourselves, and our own repentance, visible and costly, because the deconstructor is tired of pastors who are too polished and wants to see the cracks, to know what the pastor has doubted, what he has repented of, and what he still has not figured out.
4. Before: We owe them the long game, because a deconstructor who walks away today may come back in three years, or seven, or seventeen, and the church's task is to remain the same church they could come back to — which means we stay known, we do not go silent when they leave, we send the Christmas card, we ask after them when we see their parents, and we keep the door open without making the door a trap.
   After: We owe them the long game, because a deconstructor who walks away today may come back in three years, or seven, or seventeen, and the church's task is to remain the same church they could come back to, which means we stay known, we do not go silent when they leave, we send the Christmas card, we ask after them when we see their parents, and we keep the door open without making the door a trap.
5. Before: The church at her best — and she is not always at her best — is the body that carries him forward in the world; find her, or let her find you, because she is not always who she has seemed to be.
   After: The church at her best (and she is not always at her best) is the body that carries him forward in the world; find her, or let her find you, because she is not always who she has seemed to be.


## Chapter Nine: The Sociology of Loss (`sec10.xhtml`)

Words 2,759 to 2,759. Em-dashes in his prose 20 to 0 (7.2 to 0.0 per 1,000 words). Tells 50 to 30 (18.1 to 10.9 per 1,000). Mean sentence 28.7 words to 28.7; sentences of eight words or fewer 15.6% to 15.6%; of five or fewer 9.4% to 9.4%. 18 edits; paragraphs 23 to 23. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 20 to 0, not_but 8 to 8, not_just 1 to 1, isnt_its 1 to 1, triplet 8 to 8, anaphora 4 to 4, stock 2 to 2, intens 1 to 1, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 50 number words, proper names by count, and 30 hedge words (after: 30) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The question is why this generation, raised in this version of American Christianity, is leaving at rates with no precedent in the modern history of the church — and answering that honestly means setting down the explanation most pastors reach for first, the one that says the culture got worse and faithfulness got harder, and picking up a harder set of tools instead.
   After: The question is why this generation, raised in this version of American Christianity, is leaving at rates with no precedent in the modern history of the church, and answering that honestly means setting down the explanation most pastors reach for first, the one that says the culture got worse and faithfulness got harder, and picking up a harder set of tools instead.
2. Before: Their parents had come of age in a church that was still, in some ways, a cultural default — a place where politics was present but not primary — but by the 2010s the political valence of American evangelicalism was no longer implicit; it was the thing itself.
   After: Their parents had come of age in a church that was still, in some ways, a cultural default, a place where politics was present but not primary, but by the 2010s the political valence of American evangelicalism was no longer implicit; it was the thing itself.
3. Before: Any church strategy that assumes the young person can be persuaded to trust the institution on the institution's own say-so is running on a model of trust that expired before the young person was born, because in the medium of the internet trust is earned by transparency, by acknowledgment of mistakes, by willingness to be contradicted, and by consistency over time — none of which are strengths of the American evangelical institution.
   After: Any church strategy that assumes the young person can be persuaded to trust the institution on the institution's own say-so is running on a model of trust that expired before the young person was born, because in the medium of the internet trust is earned by transparency, by acknowledgment of mistakes, by willingness to be contradicted, and by consistency over time, none of which are strengths of the American evangelical institution.
4. Before: A pastor who likes this sort of answer can complain about the generation's insistence on consistency — he can call them self-righteous, ungracious, naive about institutions made of flawed people, and each charge is partially true.
   After: A pastor who likes this sort of answer can complain about the generation's insistence on consistency; he can call them self-righteous, ungracious, naive about institutions made of flawed people, and each charge is partially true.
5. Before: Third, develop a pastoral theology of emotional experience that does not treat feelings as a category to be corrected with doctrine, because feelings are data — not the final word, but data.
   After: Third, develop a pastoral theology of emotional experience that does not treat feelings as a category to be corrected with doctrine, because feelings are data, not the final word, but data.


## Chapter Ten: Science, Creation, and the False Choice (`sec11.xhtml`)

Words 2,643 to 2,643. Em-dashes in his prose 23 to 0 (8.7 to 0.0 per 1,000 words). Tells 53 to 31 (20.1 to 11.7 per 1,000). Mean sentence 35.2 words to 35.2; sentences of eight words or fewer 16.0% to 16.0%; of five or fewer 10.7% to 10.7%. 19 edits; paragraphs 24 to 24. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 23 to 0, not_but 4 to 4, NotX.Y 1 to 1, isnt_its 5 to 5, triplet 14 to 14, anaphora 1 to 1, colon_reveal 0 to 1, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 11 Scripture references, 3 years, 13 numbers in digits, 48 number words, proper names by count, and 26 hedge words (after: 26) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Consider the young man raised in a household where evolution was a lie, the universe was six thousand years old, and the geological record was the residue of Noah's flood — and consider him now, at thirty, two semesters of college biology and a few books on cosmology read for pleasure behind him, having concluded that the scientific account of the natural world is, on its own terms, compelling.
   After: Consider the young man raised in a household where evolution was a lie, the universe was six thousand years old, and the geological record was the residue of Noah's flood, and consider him now, at thirty, two semesters of college biology and a few books on cosmology read for pleasure behind him, having concluded that the scientific account of the natural world is, on its own terms, compelling.
2. Before: The young-earth position, in anything like its contemporary form, is a product of the early twentieth century — it was not the majority view of the Christian tradition before 1920.
   After: The young-earth position, in anything like its contemporary form, is a product of the early twentieth century; it was not the majority view of the Christian tradition before 1920.
3. Before: The pastor not ready to adopt the synthesis is not being asked to — he is being asked to do one thing:
   After: The pastor not ready to adopt the synthesis is not being asked to; he is being asked to do one thing:
4. Before: It is the historic Christian confidence — the faith of Augustine, of Aquinas, of C.
   After: It is the historic Christian confidence: the faith of Augustine, of Aquinas, of C.
5. Before: That faith is still available, and the young person who left over the false choice is still reachable — if the church will give him the faith it should have given him in the first place.
   After: That faith is still available, and the young person who left over the false choice is still reachable, if the church will give him the faith it should have given him in the first place.


## Chapter Eleven: The Problem of Hell Revisited (`sec12.xhtml`)

Words 2,770 to 2,770. Em-dashes in his prose 24 to 0 (8.7 to 0.0 per 1,000 words). Tells 60 to 37 (21.7 to 13.4 per 1,000). Mean sentence 28.6 words to 28.6; sentences of eight words or fewer 13.4% to 13.4%; of five or fewer 3.1% to 3.1%. 19 edits; paragraphs 23 to 23. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 24 to 0, not_but 6 to 6, isnt_its 5 to 5, triplet 11 to 12, anaphora 4 to 4, stock 2 to 2, intens 6 to 6, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 6 Scripture references, 0 years, 4 numbers in digits, 47 number words, proper names by count, and 44 hedge words (after: 44) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: For many who deconstruct, hell is the doctrine that finally pushes them over the edge — not the first thing they doubt, but the last thing they can hold.
   After: For many who deconstruct, hell is the doctrine that finally pushes them over the edge, not the first thing they doubt, but the last thing they can hold.
2. Before: The referent is corpses, not living beings in conscious torment — and the distinction is everything.
   After: The referent is corpses, not living beings in conscious torment, and the distinction is everything.
3. Before: Lewis put it as memorably as anyone — the door of hell is locked on the inside — and the picture that follows is not the cartoon.
   After: Lewis put it as memorably as anyone (the door of hell is locked on the inside) and the picture that follows is not the cartoon.
4. Before: Second, when preaching on judgment, focus on the person of the Judge rather than the mechanics of the sentence — because the Judge is Jesus, and it is the Jesus of the Gospels who will judge.
   After: Second, when preaching on judgment, focus on the person of the Judge rather than the mechanics of the sentence, because the Judge is Jesus, and it is the Jesus of the Gospels who will judge.
5. Before: Ask with the range of the tradition open, ask with teachers who are not afraid of the questions, ask the Jesus of the Gospels what he meant by the things he said — and be willing for the answers to surprise you.
   After: Ask with the range of the tradition open, ask with teachers who are not afraid of the questions, ask the Jesus of the Gospels what he meant by the things he said, and be willing for the answers to surprise you.


## Chapter Twelve: Sexuality, the Body, and the Scriptural Imagination (`sec13.xhtml`)

Words 2,866 to 2,866. Em-dashes in his prose 29 to 0 (10.1 to 0.0 per 1,000 words). Tells 67 to 39 (23.4 to 13.6 per 1,000). Mean sentence 30.5 words to 30.5; sentences of eight words or fewer 27.7% to 27.7%; of five or fewer 18.1% to 18.1%. 16 edits; paragraphs 21 to 21. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 29 to 0, not_but 6 to 6, triplet 6 to 7, frag3 1 to 1, anaphora 9 to 9, stock 6 to 6, intens 2 to 2, short_close 8 to 8.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 2 years, 4 numbers in digits, 37 number words, proper names by count, and 45 hedge words (after: 45) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The Bible is more sexually conservative than most of the cultural options on offer today, and that is not the difficult claim; the difficult claim is the one the sexual ethics debate is rarely allowed to reach — that so many people leave the faith over the church's handling of sexuality when the underlying ethic, rightly understood, is not actually where the problem lies.
   After: The Bible is more sexually conservative than most of the cultural options on offer today, and that is not the difficult claim; the difficult claim is the one the sexual ethics debate is rarely allowed to reach: that so many people leave the faith over the church's handling of sexuality when the underlying ethic, rightly understood, is not actually where the problem lies.
2. Before: A pastor serious about his congregation should apologize, from the pulpit, specifically, for what purity culture did — not in general terms but in particular ones.
   After: A pastor serious about his congregation should apologize, from the pulpit, specifically, for what purity culture did, not in general terms but in particular ones.
3. Before: Second, the way the question got litigated in public — as if the only options were full cultural affirmation and total exclusion — was never the only option, because the church has options inside its own life that the culture war did not allow to develop.
   After: Second, the way the question got litigated in public, as if the only options were full cultural affirmation and total exclusion, was never the only option, because the church has options inside its own life that the culture war did not allow to develop.
4. Before: It will not bless medical interventions on minors — because the evidence on adolescent outcomes is genuinely concerning, and because the church has a particular duty to protect children from irreversible decisions — and yet it will make room for adults who have transitioned and are now Christians, without requiring of them a specific path back that Scripture itself does not specify.
   After: It will not bless medical interventions on minors (because the evidence on adolescent outcomes is genuinely concerning, and because the church has a particular duty to protect children from irreversible decisions) and yet it will make room for adults who have transitioned and are now Christians, without requiring of them a specific path back that Scripture itself does not specify.
5. Before: Where the goodness of the body, the dignity of desire, the exalted demandingness of the biblical ethic, and the grace that meets us inside all our failures with it have actually been preached, the preaching has met with relief — people saying, after services, that they had heard something they had been waiting most of their lives to hear.
   After: Where the goodness of the body, the dignity of desire, the exalted demandingness of the biblical ethic, and the grace that meets us inside all our failures with it have actually been preached, the preaching has met with relief: people saying, after services, that they had heard something they had been waiting most of their lives to hear.


## Chapter Thirteen: The Spiritual Abuse Reckoning (`sec14.xhtml`)

Words 2,291 to 2,291. Em-dashes in his prose 21 to 0 (9.2 to 0.0 per 1,000 words). Tells 45 to 26 (19.6 to 11.3 per 1,000). Mean sentence 34.2 words to 34.2; sentences of eight words or fewer 17.9% to 17.9%; of five or fewer 9.0% to 9.0%. 18 edits; paragraphs 22 to 22. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 21 to 0, not_but 6 to 6, not_just 1 to 1, isnt_its 4 to 4, triplet 5 to 7, anaphora 2 to 2, stock 1 to 1, intens 1 to 1, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 1 years, 1 numbers in digits, 24 number words, proper names by count, and 33 hedge words (after: 33) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: There is a kind of deconstruction that begins with neither doctrine nor cultural discomfort nor the ordinary friction of religious life — it begins with a specific person, in a specific position of spiritual authority, who used that authority to harm a specific victim.
   After: There is a kind of deconstruction that begins with neither doctrine nor cultural discomfort nor the ordinary friction of religious life; it begins with a specific person, in a specific position of spiritual authority, who used that authority to harm a specific victim.
2. Before: The victim who decides that the Christian faith is finally not credible has been given enormous reason to decide it, and so the question for the serious pastor is not whether that reason is sufficient — the question is whether the church responded the way it should have.
   After: The victim who decides that the Christian faith is finally not credible has been given enormous reason to decide it, and so the question for the serious pastor is not whether that reason is sufficient; the question is whether the church responded the way it should have.
3. Before: The national patterns lie beyond any one pastor's control, but the local church does not — and five things are within reach, each of which costs something.
   After: The national patterns lie beyond any one pastor's control, but the local church does not, and five things are within reach, each of which costs something.
4. Before: Some readers of this page were the victim, and the words here cannot do what the presence of a safe human being could do better, and they will not presume otherwise — but this much can be said plainly:
   After: Some readers of this page were the victim, and the words here cannot do what the presence of a safe human being could do better, and they will not presume otherwise, but this much can be said plainly:
5. Before: The work is possible, though it is not comfortable; it is what the faith itself calls for, and it is what the young person who watched the failures is waiting to see — not more statements, not more branding, but structural change, sustained through the slow years, visible in the policies and verifiable in the practice.
   After: The work is possible, though it is not comfortable; it is what the faith itself calls for, and it is what the young person who watched the failures is waiting to see, not more statements, not more branding, but structural change, sustained through the slow years, visible in the policies and verifiable in the practice.


## Chapter Fourteen: Doubt as Devotion (`sec15.xhtml`)

Words 2,761 to 2,761. Em-dashes in his prose 31 to 0 (11.2 to 0.0 per 1,000 words). Tells 59 to 27 (21.4 to 9.8 per 1,000). Mean sentence 31.0 words to 31.0; sentences of eight words or fewer 14.6% to 14.6%; of five or fewer 7.9% to 7.9%. 21 edits; paragraphs 25 to 25. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 31 to 0, not_but 7 to 7, not_just 1 to 1, NotX.Y 1 to 1, isnt_its 8 to 7, triplet 5 to 5, anaphora 2 to 2, stock 1 to 1, intens 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 26 Scripture references, 0 years, 1 numbers in digits, 45 number words, proper names by count, and 37 hedge words (after: 37) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: For a generation, evangelical preaching treated doubt as a problem to be solved, a weakness to be confessed, a symptom of a life not fully surrendered — and so the doubters sat in the pews and listened to sermons about the doubters as though the doubters were some other, outside population, and they learned to hide.
   After: For a generation, evangelical preaching treated doubt as a problem to be solved, a weakness to be confessed, a symptom of a life not fully surrendered, and so the doubters sat in the pews and listened to sermons about the doubters as though the doubters were some other, outside population, and they learned to hide.
2. Before: thirty-seven chapters of dialogue between Job and his comforters, who defend a theological system Job will not accept — and he will not accept it because it does not match his experience, and because it asks him to confess sins he did not commit in order to rescue God's reputation.
   After: thirty-seven chapters of dialogue between Job and his comforters, who defend a theological system Job will not accept, and he will not accept it because it does not match his experience, and because it asks him to confess sins he did not commit in order to rescue God's reputation.
3. Before: The term comes from the sixteenth-century Spanish mystic John of the Cross, who described a specific experience in which God, he argued, withdraws the emotional consolations of faith in order to purify the believer's attachment — and the dark night is not the same as doubt, though from the inside it can look like it.
   After: The term comes from the sixteenth-century Spanish mystic John of the Cross, who described a specific experience in which God, he argued, withdraws the emotional consolations of faith in order to purify the believer's attachment, and the dark night is not the same as doubt, though from the inside it can look like it.
4. Before: The answer is not given — it is embodied, three days later, in the resurrection — but the question stands, and the tradition has always, at its best, held the question as part of the faith.
   After: The answer is not given (it is embodied, three days later, in the resurrection) but the question stands, and the tradition has always, at its best, held the question as part of the faith.
5. Before: Most of them will not say so; most will say they are looking for honesty, or for a church not afraid of their questions, or for a place where they can breathe — and these are the same thing, described from the outside.
   After: Most of them will not say so; most will say they are looking for honesty, or for a church not afraid of their questions, or for a place where they can breathe, and these are the same thing, described from the outside.


## Chapter Fifteen: Reconstruction (`sec16.xhtml`)

Words 2,424 to 2,424. Em-dashes in his prose 31 to 0 (12.8 to 0.0 per 1,000 words). Tells 67 to 36 (27.6 to 14.9 per 1,000). Mean sentence 29.2 words to 29.2; sentences of eight words or fewer 15.7% to 15.7%; of five or fewer 9.6% to 9.6%. 18 edits; paragraphs 22 to 22. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 31 to 0, not_but 3 to 3, NotX.Y 1 to 1, isnt_its 3 to 3, triplet 18 to 18, anaphora 3 to 3, stock 2 to 2, intens 2 to 2, colon_reveal 1 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 3 Scripture references, 0 years, 0 numbers in digits, 54 number words, proper names by count, and 42 hedge words (after: 42) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: deconstruction is everywhere, and reconstruction is an afterthought — and that is a problem, because deconstruction on its own is only half a process.
   After: deconstruction is everywhere, and reconstruction is an afterthought, and that is a problem, because deconstruction on its own is only half a process.
2. Before: Over the last century American evangelicalism has tended to reduce the Christian life to belief plus affect — hold the right propositions, feel the right emotions about Jesus — and the reduction has left generations without a practice that can hold them when the beliefs get complicated and the feelings dry up.
   After: Over the last century American evangelicalism has tended to reduce the Christian life to belief plus affect (hold the right propositions, feel the right emotions about Jesus) and the reduction has left generations without a practice that can hold them when the beliefs get complicated and the feelings dry up.
3. Before: The deconstructor who tries an Anglican parish, finds it useful for a season, then sits through a Catholic mass and finds it more than she expected, then lands in a liturgical Lutheran congregation that fits her, has not been unstable — she has been searching with discernment, and discernment takes time.
   After: The deconstructor who tries an Anglican parish, finds it useful for a season, then sits through a Catholic mass and finds it more than she expected, then lands in a liturgical Lutheran congregation that fits her, has not been unstable; she has been searching with discernment, and discernment takes time.
4. Before: That short horizon makes the tradition feel less stable than it is, because when the consensus shifts — as it does every decade or two — the person whose only frame is the present consensus feels the ground move.
   After: That short horizon makes the tradition feel less stable than it is, because when the consensus shifts, as it does every decade or two, the person whose only frame is the present consensus feels the ground move.
5. Before: A woman who went through a long and painful deconstruction after spiritual abuse in her childhood church said that what finally held her was not one conversation or one book — it was a small Anglican parish that let her sit in the back during compline every Sunday night for two years before she spoke a word to anyone.
   After: A woman who went through a long and painful deconstruction after spiritual abuse in her childhood church said that what finally held her was not one conversation or one book; it was a small Anglican parish that let her sit in the back during compline every Sunday night for two years before she spoke a word to anyone.


## Chapter Sixteen: The Church We Could Still Become (`sec17.xhtml`)

Words 2,889 to 2,889. Em-dashes in his prose 32 to 0 (11.1 to 0.0 per 1,000 words). Tells 83 to 52 (28.7 to 18.0 per 1,000). Mean sentence 39.0 words to 39.0; sentences of eight words or fewer 13.5% to 13.5%; of five or fewer 6.8% to 6.8%. 23 edits; paragraphs 31 to 31. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 32 to 0, not_but 8 to 8, isnt_its 7 to 7, triplet 28 to 29, anaphora 1 to 1, intens 1 to 1, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 52 number words, proper names by count, and 42 hedge words (after: 42) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Fifteen chapters have named what went wrong and what an honest answer to it requires, and what remains is to describe the congregation that could result — one that took the diagnosis seriously and built its common life around the response.
   After: Fifteen chapters have named what went wrong and what an honest answer to it requires, and what remains is to describe the congregation that could result, one that took the diagnosis seriously and built its common life around the response.
2. Before: The fourth mark is catechesis — a word most evangelicals have not spoken in a hundred years, meaning simply the structured teaching of the faith to people who want to learn it — and it is a mark made necessary because the American evangelical church largely assumed faith would be absorbed by osmosis, from services and youth groups and small groups and family devotions.
   After: The fourth mark is catechesis (a word most evangelicals have not spoken in a hundred years, meaning simply the structured teaching of the faith to people who want to learn it) and it is a mark made necessary because the American evangelical church largely assumed faith would be absorbed by osmosis, from services and youth groups and small groups and family devotions.
3. Before: it hosts meals that bring single adults and families together as equals — participants, not guests; it treats celibacy as a vocation the church needs, not a consolation prize for those who did not marry; and it teaches sexual ethics in a way that includes single adults, gay Christians who hold the traditional ethic, widows, the divorced, and married couples, without making anyone feel assigned to a lesser version of the faith.
   After: it hosts meals that bring single adults and families together as equals, participants, not guests; it treats celibacy as a vocation the church needs, not a consolation prize for those who did not marry; and it teaches sexual ethics in a way that includes single adults, gay Christians who hold the traditional ethic, widows, the divorced, and married couples, without making anyone feel assigned to a lesser version of the faith.
4. Before: Either way, it does not measure itself by growth, influence, or relevance — the metrics that ruined so many of its peers.
   After: Either way, it does not measure itself by growth, influence, or relevance, the metrics that ruined so many of its peers.
5. Before: Judgment is not the last word — in the biblical imagination judgment is the prelude to mercy, and collapse is the prelude to whatever comes next — and what comes next depends, in part, on what the remnant does with the materials it has been handed and the hour it has been given.
   After: Judgment is not the last word (in the biblical imagination judgment is the prelude to mercy, and collapse is the prelude to whatever comes next) and what comes next depends, in part, on what the remnant does with the materials it has been handed and the hour it has been given.


## Chapter Seventeen: Parents of Deconstructors (`sec18.xhtml`)

Words 2,295 to 2,295. Em-dashes in his prose 25 to 0 (10.9 to 0.0 per 1,000 words). Tells 46 to 21 (20.0 to 9.2 per 1,000). Mean sentence 34.3 words to 34.3; sentences of eight words or fewer 11.9% to 11.9%; of five or fewer 4.5% to 4.5%. 15 edits; paragraphs 16 to 16. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 25 to 0, not_but 3 to 3, not_just 1 to 1, NotX.Y 1 to 1, triplet 8 to 8, anaphora 2 to 2, stock 1 to 1, intens 1 to 1, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 25 number words, proper names by count, and 41 hedge words (after: 41) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: You are the largest group of readers this book has, and the one most often left out of the conversation — present only as a cautionary tale or a sympathy case, never as the person actually in the room.
   After: You are the largest group of readers this book has, and the one most often left out of the conversation, present only as a cautionary tale or a sympathy case, never as the person actually in the room.
2. Before: You are not Samuel, and you are not David, and you are also not — thank God — required to be; you are a parent who did your best inside your limits, whose child, being an adult now, is making her own decisions, and those decisions do not belong to you and never were going to.
   After: You are not Samuel, and you are not David, and you are also not, thank God, required to be; you are a parent who did your best inside your limits, whose child, being an adult now, is making her own decisions, and those decisions do not belong to you and never were going to.
3. Before: Then ask the better question — what does faithful love look like over twenty years?
   After: Then ask the better question: what does faithful love look like over twenty years?
4. Before: If you are married, the deconstruction of a child will test the marriage in ways you did not anticipate, because you and your spouse will grieve on different timelines — one of you will want to talk about it more and the other less, one will see signs of hope and the other signs of loss, one will blame himself and the other, in a weak moment, will blame him.
   After: If you are married, the deconstruction of a child will test the marriage in ways you did not anticipate, because you and your spouse will grieve on different timelines: one of you will want to talk about it more and the other less, one will see signs of hope and the other signs of loss, one will blame himself and the other, in a weak moment, will blame him.
5. Before: That is the voice of a saint, formed over twenty years of grief held inside prayer — and it is the voice you can grow into, if you will let the grief be slowly worked by the Spirit into something that does not destroy you but instead forms you into the kind of Christian your child, if she ever comes home, will be glad to see.
   After: That is the voice of a saint, formed over twenty years of grief held inside prayer, and it is the voice you can grow into, if you will let the grief be slowly worked by the Spirit into something that does not destroy you but instead forms you into the kind of Christian your child, if she ever comes home, will be glad to see.


## Chapter Eighteen: Pastors in the Aftermath (`sec19.xhtml`)

Words 2,192 to 2,192. Em-dashes in his prose 22 to 0 (10.0 to 0.0 per 1,000 words). Tells 54 to 32 (24.6 to 14.6 per 1,000). Mean sentence 23.3 words to 23.3; sentences of eight words or fewer 37.2% to 37.2%; of five or fewer 25.5% to 25.5%. 16 edits; paragraphs 19 to 19. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 1 to 1.

By kind (before to after): emdash 22 to 0, not_but 5 to 5, NotX.Y 1 to 1, triplet 11 to 11, frag3 1 to 1, stock 1 to 1, intens 2 to 2, colon_reveal 1 to 1, short_close 9 to 9, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 41 number words, proper names by count, and 41 hedge words (after: 41) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Every conversation about deconstruction is, at some point, a conversation about the pastor — and not the celebrity whose fall set the crisis in motion, but the ordinary one, the man who did not cover up the abuse, did not run an empire, did not fly private, did not build a brand, and who preaches three times a week, visits the hospital on Tuesdays, counsels the divorcing couple on Wednesdays, meets the deacons on Thursdays, and writes Sunday's sermon on Friday night because the week got away from him again.
   After: Every conversation about deconstruction is, at some point, a conversation about the pastor, and not the celebrity whose fall set the crisis in motion, but the ordinary one, the man who did not cover up the abuse, did not run an empire, did not fly private, did not build a brand, and who preaches three times a week, visits the hospital on Tuesdays, counsels the divorcing couple on Wednesdays, meets the deacons on Thursdays, and writes Sunday's sermon on Friday night because the week got away from him again.
2. Before: They read in seminary, they kept up with their favorite preachers and podcast guests, but they stopped reading the difficult books — because the difficult books require time they do not have and a mental energy that feels like a luxury — and the result, a decade on, is a pastor whose theological resources have not grown past what he carried at twenty-six, now fielding questions from a generation that has read widely and expects him to have read widely too.
   After: They read in seminary, they kept up with their favorite preachers and podcast guests, but they stopped reading the difficult books (because the difficult books require time they do not have and a mental energy that feels like a luxury) and the result, a decade on, is a pastor whose theological resources have not grown past what he carried at twenty-six, now fielding questions from a generation that has read widely and expects him to have read widely too.
3. Before: Then, the next time you see her, ask her to get coffee, set no agenda, and do not call it counseling — and over that coffee, ask one question and listen.
   After: Then, the next time you see her, ask her to get coffee, set no agenda, and do not call it counseling, and over that coffee, ask one question and listen.
4. Before: Suppose you have read the case for the church we could become and thought, yes, but my deacons would never go for it, or my denomination would not allow it — some of those barriers are real and some are imagined, and the work is to determine which is which.
   After: Suppose you have read the case for the church we could become and thought, yes, but my deacons would never go for it, or my denomination would not allow it; some of those barriers are real and some are imagined, and the work is to determine which is which.
5. Before: The holding will not be resolved in your lifetime, and the crisis will outlast your ministry; what you can do, inside your ministry, is hold it well — hold it honestly, hold it without pretending it is not heavy, hold it inside a faith that has carried heavier things, across worse centuries, and survived.
   After: The holding will not be resolved in your lifetime, and the crisis will outlast your ministry; what you can do, inside your ministry, is hold it well: hold it honestly, hold it without pretending it is not heavy, hold it inside a faith that has carried heavier things, across worse centuries, and survived.


## Conclusion: What We Owe Each Other (`sec20.xhtml`)

Words 1,660 to 1,660. Em-dashes in his prose 14 to 0 (8.4 to 0.0 per 1,000 words). Tells 37 to 25 (22.3 to 15.1 per 1,000). Mean sentence 26.8 words to 26.8; sentences of eight words or fewer 24.2% to 24.2%; of five or fewer 19.4% to 19.4%. 11 edits; paragraphs 13 to 13. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 14 to 0, not_but 3 to 3, NotX.Y 1 to 1, isnt_its 2 to 2, triplet 11 to 13, anaphora 1 to 1, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 14 number words, proper names by count, and 38 hedge words (after: 38) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: What has happened across it is that the two sides have, in many cases, stopped talking altogether — and when they do talk, they talk past each other, each writing only to its own tribe.
   After: What has happened across it is that the two sides have, in many cases, stopped talking altogether, and when they do talk, they talk past each other, each writing only to its own tribe.
2. Before: Ask most who have left what they want from the Christians in their lives, and the first answer is almost always the same — I want them to stop trying to fix me.
   After: Ask most who have left what they want from the Christians in their lives, and the first answer is almost always the same: I want them to stop trying to fix me.
3. Before: But a final judgment on the faith rendered without acquaintance with the faith — in its full historical and theological shape — is a judgment rendered too soon.
   After: But a final judgment on the faith rendered without acquaintance with the faith, in its full historical and theological shape, is a judgment rendered too soon.
4. Before: The greatest threat to American Christianity right now is not the deconstruction wave, and it is not the people resisting it; the greatest threat is the thing both groups, at their worst, hold in common — the refusal to be in relationship with the other.
   After: The greatest threat to American Christianity right now is not the deconstruction wave, and it is not the people resisting it; the greatest threat is the thing both groups, at their worst, hold in common: the refusal to be in relationship with the other.
5. Before: The judgment that has been falling is real, and painful, and deserved — but judgment in the biblical imagination is not the end of the story; it is the door to repentance, and repentance is the door to renewal, and renewal is what the Spirit is in the business of producing in churches with the humility to receive it.
   After: The judgment that has been falling is real, and painful, and deserved, but judgment in the biblical imagination is not the end of the story; it is the door to repentance, and repentance is the door to renewal, and renewal is what the Spirit is in the business of producing in churches with the humility to receive it.

## The whole book

All twenty files were edited. In his running prose: 44,834 words before and after; em-dashes 477 before, 0 after (10.6 to 0.0 per 1,000 words; his limit is 4 to 6); paragraphs unchanged in number. The fact diff passed on all twenty.

**Every edit is punctuation.** Each recasts a dash as a comma, a colon, a semicolon or brackets, or joins fragments. No word was added, removed or replaced. One fragment stack was joined: "Not atheist. Not agnostic. None." is "Not atheist, not agnostic: none." (chapter 1, sec01).

**Left alone, and why.** "Name the teachings. Name the books. Name the conferences." (the chapter on purity culture) are three imperatives, full sentences, and stay. Every line about Ravi Zacharias, the Southern Baptist Convention, Mars Hill and Hillsong is as he wrote it.

**Forbidden Language list.** None of the listed words is in his prose.

## For James: things that look wrong, none of them changed

The chapters were not read whole for this list. It comes from reading every block quotation against its reference and attribution, and from searching for statements of his ministry, statistics and studies. The book states no figure for his years in ministry or his books.

1. ★ The block quotation "Prayer doesn't change God. It changes me." is "attributed to C. S. Lewis". It is not in Lewis's writings; it comes from the film Shadowlands (1993). The attribution says "attributed", but the sentence is better given to the film or dropped.
2. ★ "the share of Americans who identify as Christian has fallen from roughly eighty percent at the turn of the century to somewhere near sixty-five percent today, and the curve is accelerating rather than leveling off" (sec01). Pew's series begins at 78 percent in 2007 and stood near 62 to 63 percent in its 2023-24 study, which reported that the decline had levelled off since about 2019; "accelerating" says the opposite of Pew's latest finding.
3. "Tom Holland ... wrote a seven-hundred-page book called Dominion": the first edition runs to a little over six hundred pages.
4. **Translation.** The copyright page names the ESV. Acts 17:11 ("of more noble character than the Thessalonians"), John 20:27 ("Stop doubting and believe") and 1 Corinthians 15:14-15 ("useless ... false witnesses") are the NIV's wording; Genesis 1:27 is the King James's ("in the image of God created he him").
5. The block quotation "If what we think the Bible teaches conflicts with what we can demonstrate about the world ..." is marked "after Augustine, De Genesi ad litteram". It is a paraphrase, and is marked as one; listed only so that no one quotes it as Augustine's words.

## Questions only James can answer

1. Keep the Shadowlands line, give it to the film, or drop it?
2. Bring the NIV and King James quotations to the ESV, or name the translations used?
