# Is Critical Race Theory Biblical?: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the ninth book, Is Critical Race Theory Biblical? (id `critical-race-theory-biblical`), edited in `content/books-src/critical-race-theory-biblical/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit 3413b1bb; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The method is the one recorded in `believe.md` and `the-reliability-of-scripture.md`, beside this file.

## Method

The book sets out what critical race theory's own writers (Derrick Bell, Kimberlé Crenshaw, Richard Delgado) actually claim, then where Scripture agrees and where it parts company, and then the American church's own record. It has 437 long dashes in the 44,462 words of his running prose (9.8 per 1,000 words, against his limit of 4 to 6), some closed up (word—word) and some spaced; both were worked the same way.

What an edit may be: an em-dash recast as a comma, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into one sentence where no new word is needed. Nothing else: no word was added, removed or replaced, and no sentence, fact, example or opinion was added or taken out. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff 3413b1bb -- content/books-src/critical-race-theory-biblical/` shows every change). One commit per chapter. In the tables an "edit" is one changed paragraph, which may hold several dashes.

**How the dashes were worked, and what that means.** Unlike the first four books, the chapters were not each read whole before editing. Every long dash in his running prose was given a recast by one fixed rule: a pair of dashes around an aside became commas, or brackets where the aside itself holds a comma or a question; a single dash before "and", "but", "which", "because", "not" and the like became a comma; before an independent clause, a semicolon; before a list, a colon; otherwise a comma. Each proposal was then read in its sentence, and where the rule chose wrongly it was overridden (90 overrides in this book). The fact diff below is what proves nothing but punctuation moved.

**A contested subject, and the rule was strictest here.** Every account of what CRT claims, every concession to it ("Where CRT Gets It Right") and every criticism of it ("Where CRT Gets It Wrong"), every account of the church's history on race, every confession and every pastoral line took punctuation only; the fact diff holds every quoted word, name, date, figure and hedge in place. The book criticizes the right and the left with the same instrument, and parallel criticisms took the same rule. Quotations (Martin Luther King Jr., Philemon, the speeches quoted in the expansions) keep their dashes, as all quotations do.

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (the fact diff holds them fixed), and so does anything a chapter sets after its running prose (questions for reflection, takeaways, sources), which the fact diff also leaves out of the prose it checks.

Three scripts, kept outside the repo in `/home/user/vs5/t/` (`apply.py`, `factdiff.py`, `tells.py`, with `propose.py` for the rule), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Argument That Broke the American Church | 1,207 | 1,207 | +0.0% | 19 (15.7) | 0 (0.0) | 53 (43.9) | 35 (29.0) | 13 | PASS |
| Chapter 1: What Critical Race Theory Actually Says | 1,901 | 1,901 | +0.0% | 18 (9.5) | 0 (0.0) | 45 (23.7) | 29 (15.3) | 15 | PASS |
| Chapter 2: What the Bible Actually Says About Race, Ethnicity, and the Image of God | 1,829 | 1,829 | +0.0% | 20 (10.9) | 0 (0.0) | 56 (30.6) | 39 (21.3) | 15 | PASS |
| Chapter 3: The American Church's Racial History | 1,739 | 1,739 | +0.0% | 17 (9.8) | 0 (0.0) | 50 (28.8) | 34 (19.6) | 13 | PASS |
| Chapter 4: Martin Luther King's Theology | 1,525 | 1,525 | +0.0% | 12 (7.9) | 0 (0.0) | 26 (17.0) | 15 (9.8) | 8 | PASS |
| Chapter 5: Is Systemic Racism Real? | 1,524 | 1,524 | +0.0% | 1 (0.7) | 0 (0.0) | 32 (21.0) | 31 (20.3) | 1 | PASS |
| Chapter 6: Where CRT Gets It Right | 1,587 | 1,587 | +0.0% | 10 (6.3) | 0 (0.0) | 31 (19.5) | 21 (13.2) | 9 | PASS |
| Chapter 7: Where CRT Gets It Wrong | 1,636 | 1,636 | +0.0% | 16 (9.8) | 0 (0.0) | 41 (25.1) | 26 (15.9) | 11 | PASS |
| Chapter 8: White Evangelicalism's Blind Spot | 1,751 | 1,751 | +0.0% | 14 (8.0) | 0 (0.0) | 42 (24.0) | 28 (16.0) | 9 | PASS |
| Chapter 9: Black Church Theology | 1,616 | 1,616 | +0.0% | 20 (12.4) | 0 (0.0) | 44 (27.2) | 24 (14.9) | 13 | PASS |
| Chapter 10: Racial Reconciliation Is Not Enough | 1,525 | 1,525 | +0.0% | 14 (9.2) | 0 (0.0) | 48 (31.5) | 34 (22.3) | 12 | PASS |
| Chapter 11: Raising Children to See Race Biblically | 1,757 | 1,757 | +0.0% | 17 (9.7) | 0 (0.0) | 45 (25.6) | 28 (15.9) | 12 | PASS |
| Chapter 12: Building a Church That Does Justice and Loves Mercy | 1,669 | 1,669 | +0.0% | 16 (9.6) | 0 (0.0) | 60 (35.9) | 47 (28.2) | 13 | PASS |
| Conclusion: The Cross and the Color Line | 1,463 | 1,463 | +0.0% | 22 (15.0) | 0 (0.0) | 59 (40.3) | 39 (26.7) | 15 | PASS |
| Expansions 1: Introduction, Chapters 1-3 | 4,721 | 4,721 | +0.0% | 53 (11.2) | 0 (0.0) | 114 (24.1) | 63 (13.3) | 34 | PASS |
| Expansions 2: Chapters 4-6 | 3,722 | 3,722 | +0.0% | 34 (9.1) | 0 (0.0) | 81 (21.8) | 47 (12.6) | 27 | PASS |
| Expansions 3: Chapters 7-9 | 3,989 | 3,989 | +0.0% | 48 (12.0) | 0 (0.0) | 98 (24.6) | 52 (13.0) | 23 | PASS |
| Expansions 4: Chapters 10-12 and Conclusion | 2,995 | 2,995 | +0.0% | 31 (10.4) | 1 (0.3) | 88 (29.4) | 59 (19.7) | 20 | PASS |
| Expansions 5: Second Round Expansions for Chapters 3, 5, 9 | 3,232 | 3,232 | +0.0% | 26 (8.0) | 0 (0.0) | 67 (20.7) | 43 (13.3) | 20 | PASS |
| Expansions 6: Second Round Expansions for Chapters 1, 8, 12 | 3,074 | 3,074 | +0.0% | 29 (9.4) | 0 (0.0) | 56 (18.2) | 28 (9.1) | 20 | PASS |
| **All 20** | 44,462 | 44,462 | +0.0% | 437 (9.8) | 1 (0.0) | 1136 (25.5) | 722 (16.2) | 303 | |

## Introduction: The Argument That Broke the American Church (`sec01.xhtml`)

Words 1,207 to 1,207. Em-dashes in his prose 19 to 0 (15.7 to 0.0 per 1,000 words). Tells 53 to 35 (43.9 to 29.0 per 1,000). Mean sentence 18.9 words to 18.9; sentences of eight words or fewer 42.9% to 42.9%; of five or fewer 30.2% to 30.2%. 13 edits; paragraphs 18 to 18. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 3 to 3.

By kind (before to after): emdash 19 to 0, not_but 4 to 4, NotX.Y 3 to 3, isnt_its 2 to 2, triplet 9 to 10, frag3 3 to 3, anaphora 4 to 4, intens 1 to 1, short_close 7 to 7, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 3 Scripture references, 0 years, 0 numbers in digits, 12 number words, proper names by count, and 16 hedge words (after: 16) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Some panicked on the right, seeing CRT as a Marxist assault on Christianity itself—an ideology that would reduce people to racial categories, weaponize guilt, and destroy the church from within.
   After: Some panicked on the right, seeing CRT as a Marxist assault on Christianity itself, an ideology that would reduce people to racial categories, weaponize guilt, and destroy the church from within.
2. Before: It asks what Scripture actually teaches about race, ethnicity, justice, and the image of God; how the American church—a church built on the gospel of reconciliation—became the institution that defended slavery, maintained segregation, and then panicked when confronted with its own history; and what it would look like if the church offered the world something more searching than either progressive ideology or conservative denial.
   After: It asks what Scripture actually teaches about race, ethnicity, justice, and the image of God; how the American church, a church built on the gospel of reconciliation, became the institution that defended slavery, maintained segregation, and then panicked when confronted with its own history; and what it would look like if the church offered the world something more searching than either progressive ideology or conservative denial.
3. Before: It says that God cares about systems that oppress the vulnerable, that ethnicity is real and beautiful and never grounds for hierarchy, that the cross breaks every power structure—including racial ones—and that justice must precede reconciliation, with reconciliation made possible only through the blood of Christ.
   After: It says that God cares about systems that oppress the vulnerable, that ethnicity is real and beautiful and never grounds for hierarchy, that the cross breaks every power structure, including racial ones, and that justice must precede reconciliation, with reconciliation made possible only through the blood of Christ.
4. Before: Then we will do what the American church has largely refused to do, and look honestly at our own history—how the church defended slavery, what theology was used to justify segregation, when evangelicals realigned around race, what we did during the civil rights movement.
   After: Then we will do what the American church has largely refused to do, and look honestly at our own history: how the church defended slavery, what theology was used to justify segregation, when evangelicals realigned around race, what we did during the civil rights movement.
5. Before: the possibility of genuine reconciliation, the possibility of the cross actually breaking what divides us, the possibility of people who have been harmed and people who have done harm becoming one people again—not by pretending the harm didn't happen, but by moving through confession, restitution, and the blood of Christ.
   After: the possibility of genuine reconciliation, the possibility of the cross actually breaking what divides us, the possibility of people who have been harmed and people who have done harm becoming one people again, not by pretending the harm didn't happen, but by moving through confession, restitution, and the blood of Christ.


## Chapter 1: What Critical Race Theory Actually Says (`sec02.xhtml`)

Words 1,901 to 1,901. Em-dashes in his prose 18 to 0 (9.5 to 0.0 per 1,000 words). Tells 45 to 29 (23.7 to 15.3 per 1,000). Mean sentence 19.2 words to 19.2; sentences of eight words or fewer 30.3% to 30.3%; of five or fewer 21.2% to 21.2%. 15 edits; paragraphs 27 to 27. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 2 to 2.

By kind (before to after): emdash 18 to 0, not_but 4 to 4, not_just 1 to 1, NotX.Y 1 to 1, isnt_its 6 to 6, triplet 4 to 6, frag3 2 to 2, anaphora 3 to 3, q_answered 1 to 1, colon_reveal 1 to 1, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 8 Scripture references, 3 years, 9 numbers in digits, 8 number words, proper names by count, and 26 hedge words (after: 26) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Before you can honestly engage with Critical Race Theory, you have to know what it actually says — not the caricature, not what conservative or progressive activists claim it says, but what the academics who created it wrote.
   After: Before you can honestly engage with Critical Race Theory, you have to know what it actually says, not the caricature, not what conservative or progressive activists claim it says, but what the academics who created it wrote.
2. Before: The first claim is that race is a social construct, not a biological reality — and this is widely misunderstood.
   After: The first claim is that race is a social construct, not a biological reality, and this is widely misunderstood.
3. Before: If you want to understand how racism actually operates in America, you should listen to people who have experienced it, because their lived experience is not merely anecdotal — it is data.
   After: If you want to understand how racism actually operates in America, you should listen to people who have experienced it, because their lived experience is not merely anecdotal; it is data.
4. Before: It teaches that God cares about systems that oppress the vulnerable; Exodus is not just the story of individual redemption but of liberation from an economic system that enslaved people, and the prophets do not merely call individuals to stop exploiting the poor — they call for jubilee, for structural debt forgiveness, for the return of land, for systems that protect the vulnerable.
   After: It teaches that God cares about systems that oppress the vulnerable; Exodus is not just the story of individual redemption but of liberation from an economic system that enslaved people, and the prophets do not merely call individuals to stop exploiting the poor; they call for jubilee, for structural debt forgiveness, for the return of land, for systems that protect the vulnerable.
5. Before: The conversation is worth having — but it is worth having with clarity, not panic.
   After: The conversation is worth having, but it is worth having with clarity, not panic.


## Chapter 2: What the Bible Actually Says About Race, Ethnicity, and the Image of God (`sec03.xhtml`)

Words 1,829 to 1,829. Em-dashes in his prose 20 to 0 (10.9 to 0.0 per 1,000 words). Tells 56 to 39 (30.6 to 21.3 per 1,000). Mean sentence 17.4 words to 17.4; sentences of eight words or fewer 31.7% to 31.7%; of five or fewer 18.8% to 18.8%. 15 edits; paragraphs 27 to 27. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 20 to 0, not_but 4 to 4, not_just 1 to 1, NotX.Y 5 to 5, isnt_its 5 to 5, triplet 1 to 2, anaphora 4 to 4, intens 5 to 5, q_answered 1 to 1, colon_reveal 4 to 6, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 10 quoted strings, 12 Scripture references, 0 years, 3 numbers in digits, 15 number words, proper names by count, and 16 hedge words (after: 16) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: If a person does not bear the image of God—if they are somehow less fully human—then hierarchy and exploitation become, in their own cold way, logical.
   After: If a person does not bear the image of God, if they are somehow less fully human, then hierarchy and exploitation become, in their own cold way, logical.
2. Before: Noah gets drunk and lies naked in his tent; his son Ham sees his nakedness and tells his brothers; the brothers cover him without looking; Noah wakes and pronounces a curse—not on Ham, but on Canaan, the son of Ham.
   After: Noah gets drunk and lies naked in his tent; his son Ham sees his nakedness and tells his brothers; the brothers cover him without looking; Noah wakes and pronounces a curse, not on Ham, but on Canaan, the son of Ham.
3. Before: We used the word of God to justify the enslavement of millions—and that history has consequences still playing out.
   After: We used the word of God to justify the enslavement of millions, and that history has consequences still playing out.
4. Before: One of the strangest parts of Scripture for Western Christians is the concept of corporate sin—the idea that a people can bear guilt for the sins of previous generations or for the sins embedded in their systems.
   After: One of the strangest parts of Scripture for Western Christians is the concept of corporate sin, the idea that a people can bear guilt for the sins of previous generations or for the sins embedded in their systems.
5. Before: All of it sits comfortably with the reality that racism can be systemic, and all of it insists that the church's response cannot be merely individual conversion—it has to include structural transformation.
   After: All of it sits comfortably with the reality that racism can be systemic, and all of it insists that the church's response cannot be merely individual conversion; it has to include structural transformation.


## Chapter 3: The American Church's Racial History (`sec04.xhtml`)

Words 1,739 to 1,739. Em-dashes in his prose 17 to 0 (9.8 to 0.0 per 1,000 words). Tells 50 to 34 (28.8 to 19.6 per 1,000). Mean sentence 18.7 words to 18.7; sentences of eight words or fewer 34.8% to 34.8%; of five or fewer 25.0% to 25.0%. 13 edits; paragraphs 20 to 20. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 17 to 0, not_but 6 to 6, NotX.Y 3 to 3, isnt_its 1 to 1, triplet 12 to 13, anaphora 2 to 2, stock 3 to 3, intens 1 to 1, q_answered 1 to 1, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 4 quoted strings, 7 Scripture references, 3 years, 6 numbers in digits, 12 number words, proper names by count, and 29 hedge words (after: 29) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: You cannot understand the present crisis in the American church on race without first understanding what the church actually did across four hundred years—not what it said it believed, but what it did, and the theology it built to justify what it did.
   After: You cannot understand the present crisis in the American church on race without first understanding what the church actually did across four hundred years, not what it said it believed, but what it did, and the theology it built to justify what it did.
2. Before: He did not engage the texts about freeing slaves in the sabbath and jubilee years, nor the ethical vision of Exodus—God liberating enslaved people—nor the prophets' judgment against those who exploited the vulnerable.
   After: He did not engage the texts about freeing slaves in the sabbath and jubilee years, nor the ethical vision of Exodus, God liberating enslaved people, nor the prophets' judgment against those who exploited the vulnerable.
3. Before: We had the gospel of liberation, the story of Exodus, the prophetic witness, the cross that broke every hierarchy—and we used Scripture to defend slavery instead.
   After: We had the gospel of liberation, the story of Exodus, the prophetic witness, the cross that broke every hierarchy, and we used Scripture to defend slavery instead.
4. Before: He was also not good enough—a transitional figure who pointed the direction the church should have gone without fully going there.
   After: He was also not good enough, a transitional figure who pointed the direction the church should have gone without fully going there.
5. Before: Will we face it, confess it, repent of it in ways that actually cost us something—or will we pretend it was a different era, a different church, not our responsibility?
   After: Will we face it, confess it, repent of it in ways that actually cost us something, or will we pretend it was a different era, a different church, not our responsibility?


## Chapter 4: Martin Luther King's Theology (`sec05.xhtml`)

Words 1,525 to 1,525. Em-dashes in his prose 12 to 0 (7.9 to 0.0 per 1,000 words). Tells 26 to 15 (17.0 to 9.8 per 1,000). Mean sentence 21.7 words to 21.7; sentences of eight words or fewer 17.9% to 17.9%; of five or fewer 10.4% to 10.4%. 8 edits; paragraphs 17 to 17. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 12 to 0, not_but 1 to 1, not_just 1 to 1, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 3 to 3, intens 2 to 2, q_answered 1 to 1, colon_reveal 2 to 3, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 11 quoted strings, 0 Scripture references, 2 years, 2 numbers in digits, 4 number words, proper names by count, and 23 hedge words (after: 23) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: He was asking for something far more searching — that the American church actually believe the gospel it claimed to believe, and live as if that belief carried a cost.
   After: He was asking for something far more searching: that the American church actually believe the gospel it claimed to believe, and live as if that belief carried a cost.
2. Before: Not that white racists were bad — of course they were.
   After: Not that white racists were bad; of course they were.
3. Before: He was arguing that the system producing the poverty needed to be restructured at its core — that the foundation itself was wrong.
   After: He was arguing that the system producing the poverty needed to be restructured at its core: that the foundation itself was wrong.
4. Before: not the sanitized King of Black History Month, but the real one — the man killed because he threatened too much, who called American capitalism, American militarism, and American Christianity to account.
   After: not the sanitized King of Black History Month, but the real one, the man killed because he threatened too much, who called American capitalism, American militarism, and American Christianity to account.
5. Before: Hearing him — actually hearing what he said, and actually changing in response.
   After: Hearing him, actually hearing what he said, and actually changing in response.


## Chapter 5: Is Systemic Racism Real? (`sec06.xhtml`)

Words 1,524 to 1,524. Em-dashes in his prose 1 to 0 (0.7 to 0.0 per 1,000 words). Tells 32 to 31 (21.0 to 20.3 per 1,000). Mean sentence 14.7 words to 14.7; sentences of eight words or fewer 50.5% to 50.5%; of five or fewer 24.8% to 24.8%. 1 edits; paragraphs 21 to 21. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 1 to 0, not_but 6 to 6, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 1 to 1, triplet 6 to 6, anaphora 2 to 2, stock 3 to 3, intens 2 to 2, q_answered 1 to 1, short_close 7 to 7.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 5 quoted strings, 21 Scripture references, 0 years, 3 numbers in digits, 13 number words, proper names by count, and 19 hedge words (after: 19) compared.

1 pairs (all there are), taken at even intervals through the chapter:

1. Before: Black families could not access government-backed mortgages while white families could, and over decades that single fact opened a massive wealth gap—white families built equity in their homes, Black families could not, and the gap persists today.
   After: Black families could not access government-backed mortgages while white families could, and over decades that single fact opened a massive wealth gap; white families built equity in their homes, Black families could not, and the gap persists today.


## Chapter 6: Where CRT Gets It Right (`sec07.xhtml`)

Words 1,587 to 1,587. Em-dashes in his prose 10 to 0 (6.3 to 0.0 per 1,000 words). Tells 31 to 21 (19.5 to 13.2 per 1,000). Mean sentence 17.7 words to 17.7; sentences of eight words or fewer 25.8% to 25.8%; of five or fewer 15.7% to 15.7%. 9 edits; paragraphs 21 to 21. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, not_but 4 to 4, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 2 to 2, triplet 3 to 3, intens 3 to 3, q_answered 1 to 1, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 4 Scripture references, 1 years, 1 numbers in digits, 10 number words, proper names by count, and 23 hedge words (after: 23) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: CRT scholars observe that institutions—law, education, economics, criminal justice—are not neutral; they were built by people in power, built to serve people in power, and they continue to serve people in power.
   After: CRT scholars observe that institutions (law, education, economics, criminal justice) are not neutral; they were built by people in power, built to serve people in power, and they continue to serve people in power.
2. Before: When Amos looked at the law courts of Israel, he saw that the poor could not get justice—the law was tilted toward the wealthy.
   After: When Amos looked at the law courts of Israel, he saw that the poor could not get justice; the law was tilted toward the wealthy.
3. Before: Board of Education, the Supreme Court decision that declared school segregation unconstitutional—on its face a clear victory for racial justice, the Court announcing that segregation is wrong.
   After: Board of Education, the Supreme Court decision that declared school segregation unconstitutional, on its face a clear victory for racial justice, the Court announcing that segregation is wrong.
4. Before: But the banker operates within a system that still carries the weight of centuries of racial exclusion from wealth-building—the banker is part of a pattern.
   After: But the banker operates within a system that still carries the weight of centuries of racial exclusion from wealth-building; the banker is part of a pattern.
5. Before: The difference is that Scripture not only names the systems—it offers power to transform them and power to transform the people within them.
   After: The difference is that Scripture not only names the systems; it offers power to transform them and power to transform the people within them.


## Chapter 7: Where CRT Gets It Wrong (`sec08.xhtml`)

Words 1,636 to 1,636. Em-dashes in his prose 16 to 0 (9.8 to 0.0 per 1,000 words). Tells 41 to 26 (25.1 to 15.9 per 1,000). Mean sentence 15.5 words to 15.5; sentences of eight words or fewer 33.7% to 33.7%; of five or fewer 15.8% to 15.8%. 11 edits; paragraphs 17 to 17. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 16 to 0, not_but 7 to 7, NotX.Y 1 to 1, triplet 4 to 4, frag3 1 to 1, anaphora 1 to 1, stock 2 to 2, intens 2 to 2, colon_reveal 1 to 2, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 6 Scripture references, 0 years, 0 numbers in digits, 11 number words, proper names by count, and 24 hedge words (after: 24) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: If identity is rooted instead in being God's beloved, then the goal of justice is not to invert hierarchies but to eliminate them — to build a community where no one stands in power over anyone else, where everyone is equally beloved, where everyone serves everyone else.
   After: If identity is rooted instead in being God's beloved, then the goal of justice is not to invert hierarchies but to eliminate them, to build a community where no one stands in power over anyone else, where everyone is equally beloved, where everyone serves everyone else.
2. Before: You have benefited from unjust systems — true. You carry the benefit of centuries of injustice — true.
   After: You have benefited from unjust systems, true. You carry the benefit of centuries of injustice, true.
3. Before: Paul writes to Philemon about Onesimus, a slave who ran away from Philemon's household, and Paul asks Philemon to receive Onesimus back — not as a slave, but as a beloved brother.
   After: Paul writes to Philemon about Onesimus, a slave who ran away from Philemon's household, and Paul asks Philemon to receive Onesimus back, not as a slave, but as a beloved brother.
4. Before: It is the claim that human hearts can actually change — that people can repent, that people can turn from injustice.
   After: It is the claim that human hearts can actually change: that people can repent, that people can turn from injustice.
5. Before: And ideology — whether it comes from the left or the right — is dangerous in the church.
   After: And ideology, whether it comes from the left or the right, is dangerous in the church.


## Chapter 8: White Evangelicalism's Blind Spot (`sec09.xhtml`)

Words 1,751 to 1,751. Em-dashes in his prose 14 to 0 (8.0 to 0.0 per 1,000 words). Tells 42 to 28 (24.0 to 16.0 per 1,000). Mean sentence 18.0 words to 18.0; sentences of eight words or fewer 35.4% to 35.4%; of five or fewer 24.0% to 24.0%. 9 edits; paragraphs 15 to 15. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 14 to 0, not_but 3 to 3, NotX.Y 5 to 5, triplet 5 to 5, frag3 1 to 1, anaphora 6 to 6, stock 1 to 1, intens 2 to 2, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 2 quoted strings, 0 Scripture references, 8 years, 16 numbers in digits, 11 number words, proper names by count, and 31 hedge words (after: 31) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: In recent years the SBC has officially apologized for its stance on slavery and segregation, and that apology is genuinely good — but an apology is not the same as fundamental change.
   After: In recent years the SBC has officially apologized for its stance on slavery and segregation, and that apology is genuinely good, but an apology is not the same as fundamental change.
2. Before: Once you know that history, the present comes into focus — when white evangelicals attack CRT today, what you are watching is a tradition defending its own racial systems while attacking the system that names them.
   After: Once you know that history, the present comes into focus, when white evangelicals attack CRT today, what you are watching is a tradition defending its own racial systems while attacking the system that names them.
3. Before: Had white evangelicalism actually offered that vision — had evangelicals said, the gospel demands that we integrate our churches, our schools, our communities, and we are leading the way — the tradition would have the standing to critique CRT.
   After: Had white evangelicalism actually offered that vision (had evangelicals said, the gospel demands that we integrate our churches, our schools, our communities, and we are leading the way), the tradition would have the standing to critique CRT.
4. Before: It would need to commit to integration of leadership in ways that cost something — not token diversity but substantive change.
   After: It would need to commit to integration of leadership in ways that cost something, not token diversity but substantive change.
5. Before: That it did not, that it built the segregation academies, that it created the religious right to defend segregation, that it remains segregated in its pews and its leadership, that it is now panicking about CRT — all of it suggests that white evangelicalism does not, in practice, believe what it claims to believe.
   After: That it did not, that it built the segregation academies, that it created the religious right to defend segregation, that it remains segregated in its pews and its leadership, that it is now panicking about CRT: all of it suggests that white evangelicalism does not, in practice, believe what it claims to believe.


## Chapter 9: Black Church Theology (`sec10.xhtml`)

Words 1,616 to 1,616. Em-dashes in his prose 20 to 0 (12.4 to 0.0 per 1,000 words). Tells 44 to 24 (27.2 to 14.9 per 1,000). Mean sentence 23.1 words to 23.1; sentences of eight words or fewer 27.5% to 27.5%; of five or fewer 13.0% to 13.0%. 13 edits; paragraphs 16 to 16. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 20 to 0, not_but 4 to 4, not_just 3 to 3, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 12 to 12, stock 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 7 quoted strings, 8 Scripture references, 0 years, 3 numbers in digits, 6 number words, proper names by count, and 27 hedge words (after: 27) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: There is a theological tradition in America deeper, more searching, and more prophetic than white evangelical theology has any claim to be — the theology of the Black church, a theology forged in suffering, a theology that understood systemic injustice centuries before Critical Race Theory gave it academic language.
   After: There is a theological tradition in America deeper, more searching, and more prophetic than white evangelical theology has any claim to be: the theology of the Black church, a theology forged in suffering, a theology that understood systemic injustice centuries before Critical Race Theory gave it academic language.
2. Before: Cone offered something different — a gospel that made sense of suffering, that explained why God would allow oppression not to teach the oppressed a lesson, but to call the oppressed to liberation and to call the oppressor to repentance.
   After: Cone offered something different: a gospel that made sense of suffering, that explained why God would allow oppression not to teach the oppressed a lesson, but to call the oppressed to liberation and to call the oppressor to repentance.
3. Before: One of the deepest sources of Black church theology is the spirituals — the songs enslaved people created.
   After: One of the deepest sources of Black church theology is the spirituals, the songs enslaved people created.
4. Before: White evangelical preaching tends to be expository or topical — it explains the text or explains a doctrine, and it is cerebral.
   After: White evangelical preaching tends to be expository or topical; it explains the text or explains a doctrine, and it is cerebral.
5. Before: This is not a new word — the prophets have been saying it to the people of God for thousands of years — but the Black church is saying it specifically and prophetically to white Christianity.
   After: This is not a new word, the prophets have been saying it to the people of God for thousands of years, but the Black church is saying it specifically and prophetically to white Christianity.


## Chapter 10: Racial Reconciliation Is Not Enough (`sec11.xhtml`)

Words 1,525 to 1,525. Em-dashes in his prose 14 to 0 (9.2 to 0.0 per 1,000 words). Tells 48 to 34 (31.5 to 22.3 per 1,000). Mean sentence 16.3 words to 16.3; sentences of eight words or fewer 27.5% to 27.5%; of five or fewer 12.1% to 12.1%. 12 edits; paragraphs 21 to 21. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 14 to 0, not_but 4 to 4, not_just 1 to 1, NotX.Y 1 to 1, triplet 8 to 8, anaphora 5 to 5, stock 2 to 2, intens 5 to 5, colon_reveal 1 to 1, short_close 7 to 7.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 6 Scripture references, 0 years, 0 numbers in digits, 21 number words, proper names by count, and 15 hedge words (after: 15) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Underneath the gentle phrasing, this asks Black Christians to set aside the injustice they have experienced — to forgive without the white church confessing and changing, to pretend that centuries of slavery, segregation, and marginalization do not weigh on the present.
   After: Underneath the gentle phrasing, this asks Black Christians to set aside the injustice they have experienced: to forgive without the white church confessing and changing, to pretend that centuries of slavery, segregation, and marginalization do not weigh on the present.
2. Before: Cheap grace is grace without discipleship, grace without repentance, grace without cost — the grace that says you are forgiven and may remain exactly as you were.
   After: Cheap grace is grace without discipleship, grace without repentance, grace without cost, the grace that says you are forgiven and may remain exactly as you were.
3. Before: Justice asks for actual structural change — hiring Black leaders, investing in Black communities, dismantling the systems that keep congregations segregated.
   After: Justice asks for actual structural change: hiring Black leaders, investing in Black communities, dismantling the systems that keep congregations segregated.
4. Before: The process was not perfect, but it attempted to hold justice and reconciliation together — truth-telling and accountability on one hand, the possibility of moving forward together on the other.
   After: The process was not perfect, but it attempted to hold justice and reconciliation together: truth-telling and accountability on one hand, the possibility of moving forward together on the other.
5. Before: Without it there will be no reconciliation — only racial management, only the appearance of progress while the injustice quietly persists.
   After: Without it there will be no reconciliation, only racial management, only the appearance of progress while the injustice quietly persists.


## Chapter 11: Raising Children to See Race Biblically (`sec12.xhtml`)

Words 1,757 to 1,757. Em-dashes in his prose 17 to 0 (9.7 to 0.0 per 1,000 words). Tells 45 to 28 (25.6 to 15.9 per 1,000). Mean sentence 20.2 words to 20.2; sentences of eight words or fewer 29.9% to 29.9%; of five or fewer 18.4% to 18.4%. 12 edits; paragraphs 19 to 19. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 17 to 0, not_but 9 to 9, NotX.Y 4 to 4, isnt_its 1 to 1, triplet 8 to 8, anaphora 2 to 2, colon_reveal 1 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 16 number words, proper names by count, and 25 hedge words (after: 25) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: King named on the steps of the Lincoln Memorial—that people would be judged not by the color of their skin but by the content of their character.
   After: King named on the steps of the Lincoln Memorial: that people would be judged not by the color of their skin but by the content of their character.
2. Before: To absorb the framework uncritically is to teach a child that the human person is, at bottom, a product of systems—that what finally matters is the group you belong to rather than the God whose image you bear.
   After: To absorb the framework uncritically is to teach a child that the human person is, at bottom, a product of systems, that what finally matters is the group you belong to rather than the God whose image you bear.
3. Before: not as superior, not as the default human, but as theirs—one particular way of being human among many.
   After: not as superior, not as the default human, but as theirs, one particular way of being human among many.
4. Before: Read diverse stories, so that the books in your home include Black protagonists, Asian protagonists, Latino protagonists—people of color as the main characters, not merely the supporting ones.
   After: Read diverse stories, so that the books in your home include Black protagonists, Asian protagonists, Latino protagonists: people of color as the main characters, not merely the supporting ones.
5. Before: But it is a good risk, and the alternative is worse—a child raised blind to injustice, unable to see other people fully, comfortable with the way things are.
   After: But it is a good risk, and the alternative is worse: a child raised blind to injustice, unable to see other people fully, comfortable with the way things are.


## Chapter 12: Building a Church That Does Justice and Loves Mercy (`sec13.xhtml`)

Words 1,669 to 1,669. Em-dashes in his prose 16 to 0 (9.6 to 0.0 per 1,000 words). Tells 60 to 47 (35.9 to 28.2 per 1,000). Mean sentence 19.9 words to 19.9; sentences of eight words or fewer 23.8% to 23.8%; of five or fewer 14.3% to 14.3%. 13 edits; paragraphs 20 to 20. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 16 to 0, not_but 3 to 3, not_just 3 to 3, triplet 17 to 17, frag3 1 to 1, anaphora 2 to 2, stock 5 to 5, intens 5 to 5, q_answered 1 to 1, colon_reveal 2 to 5, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 11 number words, proper names by count, and 22 hedge words (after: 22) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: First, it has diverse leadership — not diversity for its own sake, but leadership that genuinely reflects the community the church sits inside.
   After: First, it has diverse leadership, not diversity for its own sake, but leadership that genuinely reflects the community the church sits inside.
2. Before: What did your denomination do during slavery — defend it or oppose it? During segregation — maintain it or resist it? During the civil rights movement — stay silent, oppose, or support?
   After: What did your denomination do during slavery: defend it or oppose it? During segregation: maintain it or resist it? During the civil rights movement: stay silent, oppose, or support?
3. Before: It would be a place where reconciliation was possible — not easy, but possible — where people once divided by injustice could become family again.
   After: It would be a place where reconciliation was possible (not easy, but possible) where people once divided by injustice could become family again.
4. Before: And it will cost you power, because if you have been accustomed to holding it, sharing it means having less — and that is uncomfortable.
   After: And it will cost you power, because if you have been accustomed to holding it, sharing it means having less, and that is uncomfortable.
5. Before: A church that actually believes the gospel and actually practices it could be a sign of that power; it could show the world what becomes possible when people take the cross seriously — when they truly believe that Christ has broken down the wall between us.
   After: A church that actually believes the gospel and actually practices it could be a sign of that power; it could show the world what becomes possible when people take the cross seriously, when they truly believe that Christ has broken down the wall between us.


## Conclusion: The Cross and the Color Line (`sec14.xhtml`)

Words 1,463 to 1,463. Em-dashes in his prose 22 to 0 (15.0 to 0.0 per 1,000 words). Tells 59 to 39 (40.3 to 26.7 per 1,000). Mean sentence 17.2 words to 17.2; sentences of eight words or fewer 36.5% to 36.5%; of five or fewer 22.4% to 22.4%. 15 edits; paragraphs 16 to 16. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 22 to 0, not_but 4 to 4, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 2 to 2, triplet 5 to 7, frag3 1 to 1, anaphora 8 to 8, stock 3 to 3, intens 1 to 1, colon_reveal 2 to 2, short_close 8 to 8.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 7 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: But the gospel does something more—it offers what CRT cannot, the power to actually change everything:
   After: But the gospel does something more; it offers what CRT cannot, the power to actually change everything:
2. Before: The barriers are broken—not in theory, not in some distant spiritual realm, but in practice, in the church, in the body of Christ.
   After: The barriers are broken, not in theory, not in some distant spiritual realm, but in practice, in the church, in the body of Christ.
3. Before: And Jesus says this to the very people he is about to die for, the people about to betray him, the people who will benefit from his death—the faithful, yes, but not only the faithful.
   After: And Jesus says this to the very people he is about to die for, the people about to betray him, the people who will benefit from his death: the faithful, yes, but not only the faithful.
4. Before: a church that actually believes the gospel, that practices reconciliation instead of merely preaching it, where the cross has its real power—breaking every hierarchy and making new what was divided.
   After: a church that actually believes the gospel, that practices reconciliation instead of merely preaching it, where the cross has its real power, breaking every hierarchy and making new what was divided.
5. Before: The question is what the American church will do with it—and that question will determine whether Christianity in America is prophetic or complicit, whether the church is a sign of the gospel or a contradiction of it, whether we point the world toward the cross or away from it.
   After: The question is what the American church will do with it, and that question will determine whether Christianity in America is prophetic or complicit, whether the church is a sign of the gospel or a contradiction of it, whether we point the world toward the cross or away from it.


## Expansions 1: Introduction, Chapters 1-3 (`sec15.xhtml`)

Words 4,721 to 4,721. Em-dashes in his prose 53 to 0 (11.2 to 0.0 per 1,000 words). Tells 114 to 63 (24.1 to 13.3 per 1,000). Mean sentence 20.0 words to 20.0; sentences of eight words or fewer 28.8% to 28.8%; of five or fewer 15.3% to 15.3%. 34 edits; paragraphs 39 to 39. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 53 to 0, not_but 10 to 10, not_just 1 to 1, NotX.Y 3 to 3, isnt_its 6 to 6, triplet 15 to 16, anaphora 8 to 8, stock 2 to 2, intens 4 to 4, q_answered 2 to 2, colon_reveal 4 to 5, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 4 quoted strings, 9 Scripture references, 13 years, 18 numbers in digits, 50 number words, proper names by count, and 59 hedge words (after: 59) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: That second clause—not the first about rejection, but the acknowledgment—was the sentence that started everything.
   After: That second clause (not the first about rejection, but the acknowledgment) was the sentence that started everything.
2. Before: America in 1954 was waging the Cold War, and the Soviet Union held a propaganda advantage—America preached democracy while enforcing segregation, and its image in the world suffered for it.
   After: America in 1954 was waging the Cold War, and the Soviet Union held a propaganda advantage: America preached democracy while enforcing segregation, and its image in the world suffered for it.
3. Before: Samaritans were the people Jews looked down on; the woman is a Samaritan, and a woman, and a woman with a complicated sexual history—layers of outsider in the Jewish world.
   After: Samaritans were the people Jews looked down on; the woman is a Samaritan, and a woman, and a woman with a complicated sexual history: layers of outsider in the Jewish world.
4. Before: The cost of continued silence is becoming clear—young Black people leaving the church, the church's credibility destroyed, people rightly wondering whether the church can be trusted on racial justice.
   After: The cost of continued silence is becoming clear: young Black people leaving the church, the church's credibility destroyed, people rightly wondering whether the church can be trusted on racial justice.
5. Before: The gospel is supposed to create people of conscience—people who see the oppressed as fully human, people willing to sacrifice their own comfort for the sake of justice.
   After: The gospel is supposed to create people of conscience, people who see the oppressed as fully human, people willing to sacrifice their own comfort for the sake of justice.


## Expansions 2: Chapters 4-6 (`sec16.xhtml`)

Words 3,722 to 3,722. Em-dashes in his prose 34 to 0 (9.1 to 0.0 per 1,000 words). Tells 81 to 47 (21.8 to 12.6 per 1,000). Mean sentence 18.7 words to 18.7; sentences of eight words or fewer 26.6% to 26.6%; of five or fewer 9.9% to 9.9%. 27 edits; paragraphs 36 to 36. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 34 to 0, not_but 11 to 11, not_just 6 to 6, isnt_its 3 to 3, triplet 14 to 14, anaphora 4 to 4, intens 2 to 2, q_answered 1 to 1, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 13 quoted strings, 11 Scripture references, 7 years, 10 numbers in digits, 25 number words, proper names by count, and 43 hedge words (after: 43) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The organizers had been waiting for exactly this kind of incident—one that was clear, easy for people to understand, and unentangled with any crime except the crime of being Black in a segregated system.
   After: The organizers had been waiting for exactly this kind of incident, one that was clear, easy for people to understand, and unentangled with any crime except the crime of being Black in a segregated system.
2. Before: To modern American sensibilities this is deeply offensive, because we hold a concept called individual responsibility—Achan's sin is Achan's sin, and his family should not bear it.
   After: To modern American sensibilities this is deeply offensive, because we hold a concept called individual responsibility: Achan's sin is Achan's sin, and his family should not bear it.
3. Before: Biblical ethics would ask different questions—Am I benefiting from injustice?
   After: Biblical ethics would ask different questions: Am I benefiting from injustice?
4. Before: But if you have absorbed the system's logic, you may not see them as fully human at all—you may see them as less intelligent, less capable, less worthy, their suffering deserved.
   After: But if you have absorbed the system's logic, you may not see them as fully human at all; you may see them as less intelligent, less capable, less worthy, their suffering deserved.
5. Before: This is the test of whether the American church actually believes the Bible—or just likes the parts that do not cost anything.
   After: This is the test of whether the American church actually believes the Bible, or just likes the parts that do not cost anything.


## Expansions 3: Chapters 7-9 (`sec17.xhtml`)

Words 3,989 to 3,989. Em-dashes in his prose 48 to 0 (12.0 to 0.0 per 1,000 words). Tells 98 to 52 (24.6 to 13.0 per 1,000). Mean sentence 20.1 words to 20.1; sentences of eight words or fewer 28.8% to 28.8%; of five or fewer 17.7% to 17.7%. 23 edits; paragraphs 27 to 27. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 48 to 0, not_but 9 to 9, not_just 1 to 1, NotX.Y 6 to 6, isnt_its 1 to 1, triplet 14 to 15, frag3 1 to 1, anaphora 4 to 4, stock 2 to 2, intens 3 to 3, q_answered 1 to 1, colon_reveal 2 to 3, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 9 Scripture references, 8 years, 11 numbers in digits, 37 number words, proper names by count, and 74 hedge words (after: 74) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: It begins to assert that the oppressed carry automatic authority and the oppressor automatic disqualification — that a white person cannot understand racism because they have not suffered it, that an oppressor cannot speak of oppression because they have benefited from it.
   After: It begins to assert that the oppressed carry automatic authority and the oppressor automatic disqualification: that a white person cannot understand racism because they have not suffered it, that an oppressor cannot speak of oppression because they have benefited from it.
2. Before: Some CRT-influenced activism loses this and becomes purely judgmental — purity tests and calling out, making sure you are on the right side of the analysis — until it stops being about actually changing systems at all.
   After: Some CRT-influenced activism loses this and becomes purely judgmental (purity tests and calling out, making sure you are on the right side of the analysis) until it stops being about actually changing systems at all.
3. Before: This is the origin of the evangelical-Republican alliance — and it came not from abortion but from resistance to integration.
   After: This is the origin of the evangelical-Republican alliance, and it came not from abortion but from resistance to integration.
4. Before: Individuals work for change in one area while remaining blind to injustice in another, and the system adapts — it gives up slavery but keeps colonialism, gives up segregation but keeps redlining.
   After: Individuals work for change in one area while remaining blind to injustice in another, and the system adapts; it gives up slavery but keeps colonialism, gives up segregation but keeps redlining.
5. Before: In a church pursuing racial justice it would mean that people who have benefited from systems of injustice are not absolved without repentance — no saying I had racist thoughts but I am sorry now, so we can move on, because repentance means addressing what the system did and working to change it.
   After: In a church pursuing racial justice it would mean that people who have benefited from systems of injustice are not absolved without repentance: no saying I had racist thoughts but I am sorry now, so we can move on, because repentance means addressing what the system did and working to change it.


## Expansions 4: Chapters 10-12 and Conclusion (`sec18.xhtml`)

Words 2,995 to 2,995. Em-dashes in his prose 31 to 1 (10.4 to 0.3 per 1,000 words). Tells 88 to 59 (29.4 to 19.7 per 1,000). Mean sentence 22.5 words to 22.5; sentences of eight words or fewer 20.6% to 20.6%; of five or fewer 7.6% to 7.6%. 20 edits; paragraphs 29 to 29. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 31 to 1, not_but 12 to 12, not_just 1 to 1, NotX.Y 3 to 3, isnt_its 4 to 4, triplet 21 to 22, frag3 1 to 1, anaphora 6 to 6, stock 1 to 1, intens 2 to 2, colon_reveal 3 to 3, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 1 Scripture references, 5 years, 5 numbers in digits, 36 number words, proper names by count, and 66 hedge words (after: 66) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: truth first, then reconciliation — justice through acknowledgment and change, not through retribution.
   After: truth first, then reconciliation: justice through acknowledgment and change, not through retribution.
2. Before: Reparations requires all of it — that you acknowledge what you did, pay what you owe, and change the systems that perpetuated the harm.
   After: Reparations requires all of it: that you acknowledge what you did, pay what you owe, and change the systems that perpetuated the harm.
3. Before: But keep those members and you sacrifice the possibility of genuine multiethnic community — you remain segregated, you remain comfortable.
   After: But keep those members and you sacrifice the possibility of genuine multiethnic community; you remain segregated, you remain comfortable.
4. Before: He will need to be willing to be taught — to read Black theologians, to listen to the concerns of Black members without defensiveness, to be wrong about things he thought he understood.
   After: He will need to be willing to be taught: to read Black theologians, to listen to the concerns of Black members without defensiveness, to be wrong about things he thought he understood.
5. Before: This is what the American church needs to recover — not a gospel of blessing but a gospel of challenge, not a gospel of comfort but a gospel of costly change.
   After: This is what the American church needs to recover, not a gospel of blessing but a gospel of challenge, not a gospel of comfort but a gospel of costly change.


## Expansions 5: Second Round Expansions for Chapters 3, 5, 9 (`sec19.xhtml`)

Words 3,232 to 3,232. Em-dashes in his prose 26 to 0 (8.0 to 0.0 per 1,000 words). Tells 67 to 43 (20.7 to 13.3 per 1,000). Mean sentence 19.6 words to 19.6; sentences of eight words or fewer 22.4% to 22.4%; of five or fewer 9.9% to 9.9%. 20 edits; paragraphs 30 to 30. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 26 to 0, not_but 6 to 6, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 4 to 4, triplet 18 to 19, anaphora 3 to 3, stock 1 to 1, intens 1 to 1, colon_reveal 2 to 3, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 12 quoted strings, 10 Scripture references, 5 years, 10 numbers in digits, 20 number words, proper names by count, and 43 hedge words (after: 43) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: When his body was recovered, his mother did something that became historic — she demanded an open casket so the world could see what had been done to her son, so that no one could deny or minimize it.
   After: When his body was recovered, his mother did something that became historic; she demanded an open casket so the world could see what had been done to her son, so that no one could deny or minimize it.
2. Before: So Thurman asks the question that reorders everything — what would the gospel look like if we actually read it as the teaching of someone who lived in oppression?
   After: So Thurman asks the question that reorders everything: what would the gospel look like if we actually read it as the teaching of someone who lived in oppression?
3. Before: Nowhere is that truth more measurable than in the wealth gap, which is not an accident but the result of policy — of America systematically building wealth for white people while preventing Black people from doing the same.
   After: Nowhere is that truth more measurable than in the wealth gap, which is not an accident but the result of policy, of America systematically building wealth for white people while preventing Black people from doing the same.
4. Before: This is repentance at a corporate level — not individual apology, but institutional acknowledgment and institutional change.
   After: This is repentance at a corporate level, not individual apology, but institutional acknowledgment and institutional change.
5. Before: If the American church recovered it — if churches taught their members to understand prayer as an act of resistance, faith as courage to challenge injustice, and hope as the conviction that God's justice will prevail — the American church would be changed.
   After: If the American church recovered it (if churches taught their members to understand prayer as an act of resistance, faith as courage to challenge injustice, and hope as the conviction that God's justice will prevail), the American church would be changed.


## Expansions 6: Second Round Expansions for Chapters 1, 8, 12 (`sec20.xhtml`)

Words 3,074 to 3,074. Em-dashes in his prose 29 to 0 (9.4 to 0.0 per 1,000 words). Tells 56 to 28 (18.2 to 9.1 per 1,000). Mean sentence 18.9 words to 18.9; sentences of eight words or fewer 27.2% to 27.2%; of five or fewer 13.6% to 13.6%. 20 edits; paragraphs 25 to 25. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 29 to 0, not_but 2 to 2, isnt_its 3 to 3, triplet 8 to 8, frag3 1 to 1, anaphora 4 to 4, stock 1 to 1, colon_reveal 3 to 4, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 4 quoted strings, 0 Scripture references, 2 years, 2 numbers in digits, 16 number words, proper names by count, and 68 hedge words (after: 68) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The two are different claims, and the distortion collapses them — substituting "you are racist" for what CRT actually argues, which is that the systems around you are structured in ways that benefit you because of your race. The second misrepresentation is that CRT rejects individual agency — that it sees people as purely determined by systems, with no choice and no responsibility.
   After: The two are different claims, and the distortion collapses them, substituting "you are racist" for what CRT actually argues, which is that the systems around you are structured in ways that benefit you because of your race. The second misrepresentation is that CRT rejects individual agency: that it sees people as purely determined by systems, with no choice and no responsibility.
2. Before: There are white evangelical leaders with platforms — books, podcasts, speaking engagements, influence — who could speak prophetically about race, about the evangelical alignment with white nationalism, about the failures of white evangelicalism.
   After: There are white evangelical leaders with platforms (books, podcasts, speaking engagements, influence) who could speak prophetically about race, about the evangelical alignment with white nationalism, about the failures of white evangelicalism.
3. Before: This requires reading the Bible in its own logic rather than importing modern categories — understanding the social structure of ancient Israel, what jubilee would have meant, what it meant for women and slaves and foreigners to be included in the covenant.
   After: This requires reading the Bible in its own logic rather than importing modern categories: understanding the social structure of ancient Israel, what jubilee would have meant, what it meant for women and slaves and foreigners to be included in the covenant.
4. Before: But they also contain resistance — British nationalism, the desire to protect British identity — which can erect barriers to genuine racial justice.
   After: But they also contain resistance (British nationalism, the desire to protect British identity) which can erect barriers to genuine racial justice.
5. Before: acknowledging complicity in slavery, segregation, and systemic injustice, that evangelical leaders defended these systems and evangelicals benefited from them — which requires more than a statement; it requires that every pastor, educator, and leader learn the real history.
   After: acknowledging complicity in slavery, segregation, and systemic injustice, that evangelical leaders defended these systems and evangelicals benefited from them, which requires more than a statement; it requires that every pastor, educator, and leader learn the real history.

## The whole book

All twenty files were edited (the introduction, twelve chapters, the conclusion and the six "Expansions"). In his running prose: 44,462 words before and after; em-dashes 437 before, 3 after (9.8 to 0.1 per 1,000 words; his limit is 4 to 6); paragraphs unchanged in number. The fact diff passed on all twenty.

**Every edit is punctuation.** Each recasts a dash as a comma, a colon, a semicolon or brackets. No word was added, removed or replaced, and no fragment stack was joined.

**The three dashes that stay.** Two are inside quotations (Philemon 15-16 in chapter 7; a speech quoted in Expansions 2). One follows a question ("We have not changed. Now what — what would reconciliation require?", Expansions 4), where a comma would read oddly and a colon cannot follow a question.

**Left alone, and why.** "Two thousand. Not 1960. Not 1970. 2000." (chapter 8, and again in Expansions 3) is a verdict that could not be joined without adding words. "Read the texts. Then think. Then speak." and "Read Derrick Bell. Read Kimberlé Crenshaw. Read Richard Delgado." are imperatives. "Both responses were panic. Neither was thinking. This book refuses both." (introduction) is three sentences.

**Forbidden Language list.** None of the listed words is in his prose.

## For James: things that look wrong, none of them changed

The chapters were not read whole for this list. It comes from reading every block quotation against its reference and attribution, and from searching for names, dates, statistics and statements of his ministry. The book states no figure for his years in ministry.

1. ★ **The six "Expansions" sections** (after the conclusion) are titled "Expansions 1: Introduction, Chapters 1-3" to "Expansions 6: Second Round Expansions for Chapters 1, 8, 12". They read as drafting material that was meant to be folded into the chapters, not as a book's end matter, and they repeat some of the chapters (the Bob Jones passage appears in chapter 8 and in Expansions 3). Whether they belong in the published book is his call.
2. ★ "Instead Rwanda chose Truth and Reconciliation: perpetrators admitted what they had done ..." (chapter 7). Rwanda's process was the gacaca community courts (and a national unity commission); "Truth and Reconciliation" is South Africa's commission. The sentence runs the two together.
3. ★ Proverbs "18:15" (chapter 6) is quoted as "The first to speak in court seems right, until someone comes forward and questions him." That is Proverbs 18:17 (in the NIV's wording).
4. ★ Exodus "34:7" (Expansions 2) is quoted as "I, the Lord your God, am a jealous God, punishing the children for the sin of the parents to the third and fourth generation." The first clause is Exodus 20:5; the wording is the NIV's.
5. "In the early 1990s, Kimberlé Crenshaw expanded the system with a concept she called intersectionality" (chapter 1); Expansions 1 dates her paper, rightly, to 1989.
6. "Bob Jones University, Oral Roberts University, hundreds of Christian schools founded for the explicit purpose of maintaining separation" (chapter 8). Oral Roberts University admitted Black students from its opening in 1965; it does not belong in that list as written.
7. "a Black man convicted of a felony receives a sentence on average twenty percent longer than a white man convicted of the same felony" (chapter 5): the US Sentencing Commission's 2017 report gives 19.1 percent; the source should be named.
8. **Translation.** The copyright page names the ESV. Most of the Scripture quotations are the NIV's wording (Genesis 1:27 "mankind", Galatians 3:28 "Jew nor Gentile", Genesis 9:25, Amos 5:24 and 2:6-7, Micah 3 and 6:8, Isaiah 10:1-3, 32:16-17 and 58:6, Psalm 82:3, Nehemiah 1, 2 Corinthians 5:17, Luke 4:18); Matthew 5:44 is the New King James ("spitefully use you"); Galatians 3:27-28 and Matthew 5:11 are the ESV's.
9. The block quotation "Something is wrong with capitalism ... " is credited to Where Do We Go from Here: Chaos or Community?; the line usually quoted is from King's speeches and letters (1966-67), and the source should be checked.
10. The copyright line reads "James C. Bell" in both originals and the new files.

## Questions only James can answer

1. Keep the six Expansions as they are, fold them into the chapters, or drop them from the published book?
2. Rwanda: name gacaca, or change the comparison?
3. Bring the NIV and NKJV quotations to the ESV, or name the translations used?
