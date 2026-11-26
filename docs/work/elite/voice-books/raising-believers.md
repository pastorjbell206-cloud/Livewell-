# Raising Believers: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the fifth book, Raising Believers (id `raising-believers`), edited in `content/books-src/raising-believers/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit 7168d7e6; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The method is the one recorded in `believe.md` and `the-reliability-of-scripture.md`, beside this file.

## Method

Raising Believers is pastoral prose for parents, in long built sentences, with 516 long dashes in the 45,384 words of his running prose (11.4 per 1,000 words, against his limit of 4 to 6), very few fragment stacks (10 runs of three in the whole book) and almost no one-line paragraphs. So the work was the dashes.

What an edit may be: an em-dash recast as a comma, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into one sentence where no new word is needed. Nothing else: no word was added, removed or replaced, and no sentence, fact, example or opinion was added or taken out. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff 7168d7e6 -- content/books-src/raising-believers/` shows every change). One commit per chapter. In the tables an "edit" is one changed paragraph, which may hold several dashes.

**How the dashes were worked, and what that means.** Unlike the first four books, the chapters were not each read whole before editing. Every long dash in his running prose was given a recast by one fixed rule: a pair of dashes around an aside became commas, or brackets where the aside itself holds a comma or a question; a single dash before "and", "but", "which", "because", "not" and the like became a comma; before an independent clause, a semicolon; before a list, a colon; otherwise a comma. Each proposal was then read in its sentence, and where the rule chose wrongly it was overridden (58 overrides in this book). The fact diff below is what proves nothing but punctuation moved.

**Children and discipline.** The book speaks to parents about children, discipline, spanking, screens, single parenthood and children who leave the faith. Nothing in it was softened or sharpened: every counsel about discipline and correction, every word about spanking, and every line to a grieving parent took punctuation only, and the fact diff holds every hedge word in place.

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (the fact diff holds them fixed), and so does anything a chapter sets after its running prose (questions for reflection, takeaways, sources), which the fact diff also leaves out of the prose it checks.

Three scripts, kept outside the repo in `/home/user/vs5/t/` (`apply.py`, `factdiff.py`, `tells.py`, with `propose.py` for the rule), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Faith You Cannot Transmit | 3,582 | 3,582 | +0.0% | 34 (9.5) | 0 (0.0) | 86 (24.0) | 46 (12.8) | 29 | PASS |
| Chapter One: What We Mean When We Say Formation | 3,666 | 3,666 | +0.0% | 41 (11.2) | 0 (0.0) | 88 (24.0) | 50 (13.6) | 29 | PASS |
| Chapter Two: The Home Is the Primary Catechism | 3,376 | 3,376 | +0.0% | 34 (10.1) | 0 (0.0) | 78 (23.1) | 46 (13.6) | 24 | PASS |
| Chapter Three: When the Church Replaces the Parent | 3,045 | 3,045 | +0.0% | 28 (9.2) | 0 (0.0) | 74 (24.3) | 48 (15.8) | 27 | PASS |
| Chapter Four: The Questions Children Actually Ask | 3,883 | 3,883 | +0.0% | 48 (12.4) | 0 (0.0) | 104 (26.8) | 57 (14.7) | 38 | PASS |
| Chapter Five: Obedience Without Gospel | 2,777 | 2,777 | +0.0% | 26 (9.4) | 0 (0.0) | 65 (23.4) | 41 (14.8) | 23 | PASS |
| Chapter Six: Discipline, Correction, and the Shape of Grace | 3,051 | 3,051 | +0.0% | 44 (14.4) | 0 (0.0) | 89 (29.2) | 45 (14.7) | 28 | PASS |
| Chapter Seven: Screens, Algorithms, and the Catechesis of Attention | 2,937 | 2,937 | +0.0% | 28 (9.5) | 0 (0.0) | 65 (22.1) | 37 (12.6) | 22 | PASS |
| Chapter Eight: Marriage as the First Classroom | 3,597 | 3,597 | +0.0% | 41 (11.4) | 0 (0.0) | 91 (25.3) | 52 (14.5) | 28 | PASS |
| Chapter Nine: The Teenage Years, When Formation Goes Underground | 3,250 | 3,250 | +0.0% | 46 (14.2) | 0 (0.0) | 90 (27.7) | 47 (14.5) | 29 | PASS |
| Chapter Ten: Fathers, Presence, and the Weight of Blessing | 3,298 | 3,298 | +0.0% | 38 (11.5) | 0 (0.0) | 68 (20.6) | 30 (9.1) | 24 | PASS |
| Chapter Eleven: Single Parents, Blended Families, and the God Who Holds | 2,296 | 2,296 | +0.0% | 27 (11.8) | 1 (0.4) | 61 (26.6) | 35 (15.2) | 19 | PASS |
| Chapter Twelve: Grandparents and the Long Memory of Faith | 2,648 | 2,648 | +0.0% | 35 (13.2) | 0 (0.0) | 72 (27.2) | 38 (14.4) | 22 | PASS |
| Chapter Thirteen: When They Walk Away | 2,776 | 2,776 | +0.0% | 31 (11.2) | 0 (0.0) | 73 (26.3) | 44 (15.9) | 24 | PASS |
| Conclusion: The Long Obedience of Raising Believers | 1,202 | 1,202 | +0.0% | 15 (12.5) | 0 (0.0) | 39 (32.4) | 23 (19.1) | 13 | PASS |
| **All 15** | 45,384 | 45,384 | +0.0% | 516 (11.4) | 1 (0.0) | 1143 (25.2) | 639 (14.1) | 379 | |

## Introduction: The Faith You Cannot Transmit (`sec01.xhtml`)

Words 3,582 to 3,582. Em-dashes in his prose 34 to 0 (9.5 to 0.0 per 1,000 words). Tells 86 to 46 (24.0 to 12.8 per 1,000). Mean sentence 26.7 words to 27.3; sentences of eight words or fewer 17.9% to 15.3%; of five or fewer 11.9% to 9.2%. 29 edits; paragraphs 37 to 37. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 2 to 0.

By kind (before to after): emdash 34 to 0, not_but 12 to 12, NotX.Y 5 to 2, isnt_its 5 to 5, triplet 11 to 11, frag3 2 to 0, anaphora 6 to 5, stock 2 to 2, intens 3 to 3, colon_reveal 2 to 3, short_close 4 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 2 years, 2 numbers in digits, 46 number words, proper names by count, and 52 hedge words (after: 52) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Something has broken in the way Christian households form children — and no curriculum, however good, is going to fix it.
   After: Something has broken in the way Christian households form children, and no curriculum, however good, is going to fix it.
2. Before: I watch families doing everything right by every metric the evangelical world has handed them — regular attendance, small group, missions giving, Bible memory — and I watch their children leave, not at the margins but at the center.
   After: I watch families doing everything right by every metric the evangelical world has handed them (regular attendance, small group, missions giving, Bible memory) and I watch their children leave, not at the margins but at the center.
3. Before: It is the way faith was actually passed down for most of Christian history — before the programmatic era, before age-graded infrastructure, before we assumed formation was something you do to a child rather than something that happens near one.
   After: It is the way faith was actually passed down for most of Christian history, before the programmatic era, before age-graded infrastructure, before we assumed formation was something you do to a child rather than something that happens near one.
4. Before: You have already failed — and I do not mean that as a judgment, I mean it as a fact.
   After: You have already failed, and I do not mean that as a judgment, I mean it as a fact.
5. Before: You can tend the soil, you can pull the weeds, you can water the ground — but whether the seed sprouts and grows to its full height is between the seed and the God who made it, and that should be both humbling and liberating.
   After: You can tend the soil, you can pull the weeds, you can water the ground, but whether the seed sprouts and grows to its full height is between the seed and the God who made it, and that should be both humbling and liberating.


## Chapter One: What We Mean When We Say Formation (`sec02.xhtml`)

Words 3,666 to 3,666. Em-dashes in his prose 41 to 0 (11.2 to 0.0 per 1,000 words). Tells 88 to 50 (24.0 to 13.6 per 1,000). Mean sentence 25.6 words to 25.6; sentences of eight words or fewer 28.0% to 28.0%; of five or fewer 18.9% to 18.9%. 29 edits; paragraphs 34 to 34. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 1 to 1.

By kind (before to after): emdash 41 to 0, not_but 10 to 10, NotX.Y 4 to 4, isnt_its 5 to 5, triplet 13 to 16, frag3 1 to 1, anaphora 2 to 2, stock 1 to 1, intens 1 to 1, colon_reveal 1 to 1, short_close 8 to 8, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 56 number words, proper names by count, and 51 hedge words (after: 51) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: We have made it a dressed-up synonym for teaching, or for discipline, or for the whole package of Sunday school and family devotions and good habits — when formation is in fact older and stranger than any of that.
   After: We have made it a dressed-up synonym for teaching, or for discipline, or for the whole package of Sunday school and family devotions and good habits, when formation is in fact older and stranger than any of that.
2. Before: The child is not impressed by theological vocabulary — the child is watching for alignment.
   After: The child is not impressed by theological vocabulary; the child is watching for alignment.
3. Before: Because the concept can feel abstract, let me describe two mornings in two different homes — both Christian, both with children under ten.
   After: Because the concept can feel abstract, let me describe two mornings in two different homes: both Christian, both with children under ten.
4. Before: A child raised on content without formation is like a blueprint without a house — the plans are precise, the specs are correct, but nobody built anything; the child has all the information and no structure to live in, and when the wind comes, the blueprint shelters no one.
   After: A child raised on content without formation is like a blueprint without a house; the plans are precise, the specs are correct, but nobody built anything; the child has all the information and no structure to live in, and when the wind comes, the blueprint shelters no one.
5. Before: Smith has spent a career arguing that we are not first thinking things but desiring, loving, liturgical animals, formed less by what we are taught than by what we are repeatedly made to love — and he is right, and the home is where the first liturgies are written.
   After: Smith has spent a career arguing that we are not first thinking things but desiring, loving, liturgical animals, formed less by what we are taught than by what we are repeatedly made to love, and he is right, and the home is where the first liturgies are written.


## Chapter Two: The Home Is the Primary Catechism (`sec03.xhtml`)

Words 3,376 to 3,376. Em-dashes in his prose 34 to 0 (10.1 to 0.0 per 1,000 words). Tells 78 to 46 (23.1 to 13.6 per 1,000). Mean sentence 24.8 words to 24.8; sentences of eight words or fewer 20.6% to 20.6%; of five or fewer 11.8% to 11.8%. 24 edits; paragraphs 32 to 32. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 34 to 0, not_but 9 to 9, NotX.Y 3 to 3, isnt_its 5 to 5, triplet 12 to 14, anaphora 2 to 2, stock 2 to 2, intens 1 to 1, colon_reveal 2 to 2, short_close 8 to 8.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 0 numbers in digits, 63 number words, proper names by count, and 55 hedge words (after: 55) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Most Protestants have forgotten it, and the ones who keep it tend to treat it as a document — a book of questions and answers a child learns by repetition.
   After: Most Protestants have forgotten it, and the ones who keep it tend to treat it as a document, a book of questions and answers a child learns by repetition.
2. Before: When you are afraid and you take that fear to God out loud, in the kitchen, where your child can hear you say, Lord, I am anxious about this, and I am bringing it to You because I cannot carry it — you are catechizing your child in the nature of God, teaching them below argument that there is a Father who receives fear and does something with it.
   After: When you are afraid and you take that fear to God out loud, in the kitchen, where your child can hear you say, Lord, I am anxious about this, and I am bringing it to You because I cannot carry it; you are catechizing your child in the nature of God, teaching them below argument that there is a Father who receives fear and does something with it.
3. Before: They were catechized by a household running two catechisms at once — one explicit, one implicit; the explicit one said God is central, the implicit one said God is peripheral — and because both could not be true, when the child grew up they had to pick which one had been real.
   After: They were catechized by a household running two catechisms at once (one explicit, one implicit; the explicit one said God is central, the implicit one said God is peripheral) and because both could not be true, when the child grew up they had to pick which one had been real.
4. Before: There was a question at dinner, where did you see God today — not every night, but often enough that they expected it — and a sentence Susanna began saying to each boy in the morning, God has a plan for you today.
   After: There was a question at dinner, where did you see God today (not every night, but often enough that they expected it) and a sentence Susanna began saying to each boy in the morning, God has a plan for you today.
5. Before: It is worth asking, slowly, what the curriculum was — and then, with as much honesty as you can bear, what the curriculum is in your own house now.
   After: It is worth asking, slowly, what the curriculum was, and then, with as much honesty as you can bear, what the curriculum is in your own house now.


## Chapter Three: When the Church Replaces the Parent (`sec04.xhtml`)

Words 3,045 to 3,045. Em-dashes in his prose 28 to 0 (9.2 to 0.0 per 1,000 words). Tells 74 to 48 (24.3 to 15.8 per 1,000). Mean sentence 25.8 words to 25.8; sentences of eight words or fewer 24.6% to 24.6%; of five or fewer 14.4% to 14.4%. 27 edits; paragraphs 28 to 28. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 28 to 0, not_but 8 to 8, not_just 1 to 1, NotX.Y 1 to 1, isnt_its 3 to 3, triplet 17 to 19, anaphora 3 to 3, stock 2 to 2, intens 1 to 1, colon_reveal 1 to 1, short_close 8 to 8, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 76 number words, proper names by count, and 32 hedge words (after: 32) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: that if you have handed the spiritual formation of your children to the church you attend, you have made a quiet mistake — and that the church, for its part, has too often been happy to receive what it was never built to carry. Over the last fifty years, American evangelicalism restructured itself on a single assumption, that the spiritual formation of children is primarily the church's job, and then it built an entire infrastructure to do that job — age-graded Sunday school, children's church, Vacation Bible School, Awana, mid-week kids programs, youth group, Christian summer camp, retreats, mission trips.
   After: that if you have handed the spiritual formation of your children to the church you attend, you have made a quiet mistake, and that the church, for its part, has too often been happy to receive what it was never built to carry. Over the last fifty years, American evangelicalism restructured itself on a single assumption, that the spiritual formation of children is primarily the church's job, and then it built an entire infrastructure to do that job: age-graded Sunday school, children's church, Vacation Bible School, Awana, mid-week kids programs, youth group, Christian summer camp, retreats, mission trips.
2. Before: That sounds like a great deal until you work the other side of the equation and ask how many hours a child is in the home from birth to eighteen — not merely present in the house, but awake and in proximity to a parent.
   After: That sounds like a great deal until you work the other side of the equation and ask how many hours a child is in the home from birth to eighteen, not merely present in the house, but awake and in proximity to a parent.
3. Before: The second thing that changes is that parents begin to see the church not as a vendor but as a partner — bringing their children into the life of the congregation not to outsource but to reinforce what is already happening at home.
   After: The second thing that changes is that parents begin to see the church not as a vendor but as a partner, bringing their children into the life of the congregation not to outsource but to reinforce what is already happening at home.
4. Before: The church's role is to come alongside you — to preach the word to the whole household, to teach your children in ways that complement what you are already teaching, to surround you with other families trying to do the same difficult thing.
   After: The church's role is to come alongside you: to preach the word to the whole household, to teach your children in ways that complement what you are already teaching, to surround you with other families trying to do the same difficult thing.
5. Before: The goal is not to pull your child out of church programs — it is to make sure that when your child walks through those doors on Sunday morning, he walks in from a household where the faith is already alive, and not from a household where the faith is on hold until the professionals take over.
   After: The goal is not to pull your child out of church programs; it is to make sure that when your child walks through those doors on Sunday morning, he walks in from a household where the faith is already alive, and not from a household where the faith is on hold until the professionals take over.


## Chapter Four: The Questions Children Actually Ask (`sec05.xhtml`)

Words 3,883 to 3,883. Em-dashes in his prose 48 to 0 (12.4 to 0.0 per 1,000 words). Tells 104 to 57 (26.8 to 14.7 per 1,000). Mean sentence 25.9 words to 25.9; sentences of eight words or fewer 31.3% to 31.3%; of five or fewer 21.3% to 21.3%. 38 edits; paragraphs 44 to 44. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 48 to 0, not_but 14 to 14, not_just 1 to 1, NotX.Y 4 to 4, isnt_its 3 to 3, triplet 13 to 14, anaphora 2 to 2, stock 9 to 9, colon_reveal 1 to 1, short_close 9 to 9.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 74 number words, proper names by count, and 78 hedge words (after: 78) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Somewhere around age eight, sometimes earlier, a child begins to ask the real questions, and they almost never arrive when you are ready for them — they come in the back of the car, at the dinner table when the conversation was about something else entirely, in the last minute before sleep when the child has worked out that a parent cannot easily walk away.
   After: Somewhere around age eight, sometimes earlier, a child begins to ask the real questions, and they almost never arrive when you are ready for them; they come in the back of the car, at the dinner table when the conversation was about something else entirely, in the last minute before sleep when the child has worked out that a parent cannot easily walk away.
2. Before: Second, I have wondered that too — said only if it is true, and in my experience it will almost always be true, because children ask the questions grown adults ask quietly.
   After: Second, I have wondered that too, said only if it is true, and in my experience it will almost always be true, because children ask the questions grown adults ask quietly.
3. Before: There is a subtler mistake, and it is harder to see — answering a question the child did not ask because the question the child did ask scares us.
   After: There is a subtler mistake, and it is harder to see, answering a question the child did not ask because the question the child did ask scares us.
4. Before: Young children ask concrete questions — where is heaven, what does God look like, can God see me in the dark — questions that are spatial, physical, imagination-level, because they are trying to locate God in the world they can see.
   After: Young children ask concrete questions (where is heaven, what does God look like, can God see me in the dark) questions that are spatial, physical, imagination-level, because they are trying to locate God in the world they can see.
5. Before: Underneath all of this lies another issue — one that shapes whether the child is even asking for truth or asking for permission.
   After: Underneath all of this lies another issue, one that shapes whether the child is even asking for truth or asking for permission.


## Chapter Five: Obedience Without Gospel (`sec06.xhtml`)

Words 2,777 to 2,777. Em-dashes in his prose 26 to 0 (9.4 to 0.0 per 1,000 words). Tells 65 to 41 (23.4 to 14.8 per 1,000). Mean sentence 26.2 words to 26.2; sentences of eight words or fewer 27.4% to 27.4%; of five or fewer 18.9% to 18.9%. 23 edits; paragraphs 26 to 26. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 3 to 3.

By kind (before to after): emdash 26 to 0, not_but 15 to 15, NotX.Y 3 to 3, isnt_its 1 to 1, triplet 7 to 9, frag3 3 to 3, anaphora 4 to 4, stock 1 to 1, intens 1 to 1, colon_reveal 1 to 1, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 38 number words, proper names by count, and 28 hedge words (after: 28) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: There is a particular brand of Christian parenting that raises atheists, and it does not mean to — it comes from parents who love their children and believe they are doing the most serious work of their lives, which they are, except that they are running the wrong version of it.
   After: There is a particular brand of Christian parenting that raises atheists, and it does not mean to; it comes from parents who love their children and believe they are doing the most serious work of their lives, which they are, except that they are running the wrong version of it.
2. Before: A couple comes to me grieving a grown child who has walked away, and the story is always the same in its outline — we raised him in the church, we had family devotions, he was respectful, well-behaved, a good student, he went on mission trips, and then he got to college and something broke and we do not know what happened.
   After: A couple comes to me grieving a grown child who has walked away, and the story is always the same in its outline; we raised him in the church, we had family devotions, he was respectful, well-behaved, a good student, he went on mission trips, and then he got to college and something broke and we do not know what happened.
3. Before: You can tend the soil, you can preach the gospel in ordinary language over years, you can be the kind of person near whom heart change is more likely than not — but you cannot force it.
   After: You can tend the soil, you can preach the gospel in ordinary language over years, you can be the kind of person near whom heart change is more likely than not, but you cannot force it.
4. Before: The gospel does not remove the law; it fulfills it, and in fulfilling it changes why we obey — we do not obey to be loved, we obey because we are loved.
   After: The gospel does not remove the law; it fulfills it, and in fulfilling it changes why we obey; we do not obey to be loved, we obey because we are loved.
5. Before: You are raising adults — and the adults you are raising will carry the theology of your home into their own homes, their own marriages, their own failures, their own encounters with God, and what they carry will either free them or bind them.
   After: You are raising adults, and the adults you are raising will carry the theology of your home into their own homes, their own marriages, their own failures, their own encounters with God, and what they carry will either free them or bind them.


## Chapter Six: Discipline, Correction, and the Shape of Grace (`sec07.xhtml`)

Words 3,051 to 3,051. Em-dashes in his prose 44 to 0 (14.4 to 0.0 per 1,000 words). Tells 89 to 45 (29.2 to 14.7 per 1,000). Mean sentence 33.9 words to 33.9; sentences of eight words or fewer 10.0% to 10.0%; of five or fewer 4.4% to 4.4%. 28 edits; paragraphs 30 to 30. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 44 to 0, not_but 18 to 18, not_just 1 to 1, isnt_its 3 to 3, triplet 14 to 14, anaphora 1 to 1, stock 2 to 2, intens 2 to 2, colon_reveal 1 to 1, short_close 2 to 2, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 55 number words, proper names by count, and 62 hedge words (after: 62) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Every parent disciplines, and the question is never whether you will correct your children but what your correction is forming in them — because correction, like everything else in the household, is catechesis.
   After: Every parent disciplines, and the question is never whether you will correct your children but what your correction is forming in them, because correction, like everything else in the household, is catechesis.
2. Before: But the child raised by a parent who goes cold after a failure learns something devastating about love itself — that it has conditions, that closeness must be earned, that failure creates distance — and he carries it into every relationship he has, the one with God included.
   After: But the child raised by a parent who goes cold after a failure learns something devastating about love itself (that it has conditions, that closeness must be earned, that failure creates distance) and he carries it into every relationship he has, the one with God included.
3. Before: your anger at your child's behavior is usually about you — about your embarrassment that he acted that way in public, about your fear that you are failing, about your need for control, about your own unprocessed wounds from your own childhood — and it is rarely, in the moment, about the child's formation.
   After: your anger at your child's behavior is usually about you (about your embarrassment that he acted that way in public, about your fear that you are failing, about your need for control, about your own unprocessed wounds from your own childhood) and it is rarely, in the moment, about the child's formation.
4. Before: if one parent has made a decision about discipline, the other backs it in front of the child — always, even when the other disagrees — and the disagreement happens later, in private, between the two of us.
   After: if one parent has made a decision about discipline, the other backs it in front of the child (always, even when the other disagrees) and the disagreement happens later, in private, between the two of us.
5. Before: So correct your children, and do it clearly, honestly, proportionately, and with repair — do it so that when your child thinks about what God is like, the first thing he remembers is not your anger but your steadiness, your honesty, your willingness to call the thing what it is and to love him through it anyway.
   After: So correct your children, and do it clearly, honestly, proportionately, and with repair: do it so that when your child thinks about what God is like, the first thing he remembers is not your anger but your steadiness, your honesty, your willingness to call the thing what it is and to love him through it anyway.


## Chapter Seven: Screens, Algorithms, and the Catechesis of Attention (`sec08.xhtml`)

Words 2,937 to 2,937. Em-dashes in his prose 28 to 0 (9.5 to 0.0 per 1,000 words). Tells 65 to 37 (22.1 to 12.6 per 1,000). Mean sentence 29.7 words to 29.7; sentences of eight words or fewer 22.2% to 22.2%; of five or fewer 11.1% to 11.1%. 22 edits; paragraphs 28 to 28. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 28 to 0, not_but 5 to 5, NotX.Y 3 to 3, isnt_its 3 to 3, triplet 12 to 12, anaphora 2 to 2, stock 1 to 1, intens 2 to 2, colon_reveal 1 to 1, short_close 8 to 8.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 1 years, 1 numbers in digits, 42 number words, proper names by count, and 39 hedge words (after: 39) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: You cannot write a book about forming faith in children in 2026 and pretend the old questions are the only ones, because for many hours of most days your child's primary catechist is not you — it is an algorithm trained to hold their attention by any means available, and whatever it is forming in them competes directly with whatever you are trying to form.
   After: You cannot write a book about forming faith in children in 2026 and pretend the old questions are the only ones, because for many hours of most days your child's primary catechist is not you; it is an algorithm trained to hold their attention by any means available, and whatever it is forming in them competes directly with whatever you are trying to form.
2. Before: This carries spiritual consequences most Christian parents have not considered, because prayer requires sustained attention, and so does Scripture, and so does listening to a sermon, sitting in silence with God, confessing, repenting — every practice of the Christian life depends on a capacity the smartphone is systematically dismantling in your child.
   After: This carries spiritual consequences most Christian parents have not considered, because prayer requires sustained attention, and so does Scripture, and so does listening to a sermon, sitting in silence with God, confessing, repenting: every practice of the Christian life depends on a capacity the smartphone is systematically dismantling in your child.
3. Before: Keep devices out of bedrooms — every device, including yours — because the bedroom is a sanctuary, and nothing that wants a piece of your child's attention at two in the morning gets into that room.
   After: Keep devices out of bedrooms (every device, including yours) because the bedroom is a sanctuary, and nothing that wants a piece of your child's attention at two in the morning gets into that room.
4. Before: The algorithm does not care about your child's soul; it cares about engagement, measuring what your child watches longest, clicks most, and responds to most strongly, then feeding them more of it, until over time it learns your child better than your child knows themselves — their fears, their insecurities, their triggers — and exploits all of them.
   After: The algorithm does not care about your child's soul; it cares about engagement, measuring what your child watches longest, clicks most, and responds to most strongly, then feeding them more of it, until over time it learns your child better than your child knows themselves (their fears, their insecurities, their triggers) and exploits all of them.
5. Before: The next chapter is about the thing your child watched before they ever watched your phone, the thing they have been watching since the day they were born — your marriage, and what it is teaching them about God, love, and the possibility of covenant.
   After: The next chapter is about the thing your child watched before they ever watched your phone, the thing they have been watching since the day they were born: your marriage, and what it is teaching them about God, love, and the possibility of covenant.


## Chapter Eight: Marriage as the First Classroom (`sec09.xhtml`)

Words 3,597 to 3,597. Em-dashes in his prose 41 to 0 (11.4 to 0.0 per 1,000 words). Tells 91 to 52 (25.3 to 14.5 per 1,000). Mean sentence 25.9 words to 25.9; sentences of eight words or fewer 22.3% to 22.3%; of five or fewer 13.7% to 13.7%. 28 edits; paragraphs 38 to 38. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 41 to 0, not_but 21 to 21, not_just 1 to 1, NotX.Y 3 to 3, isnt_its 2 to 2, triplet 12 to 14, anaphora 4 to 4, intens 4 to 4, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 31 number words, proper names by count, and 63 hedge words (after: 63) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Most Christian parents keep marriage and parenting in separate rooms, as though the relationship between two adults and the work of raising children were different enterprises that touch only at the practical seams — scheduling, discipline, money — while the marriage itself goes on undisturbed in its own quarters.
   After: Most Christian parents keep marriage and parenting in separate rooms, as though the relationship between two adults and the work of raising children were different enterprises that touch only at the practical seams (scheduling, discipline, money) while the marriage itself goes on undisturbed in its own quarters.
2. Before: He was observing — and his observation was devastating in its accuracy, because we had in fact stopped laughing, stopped looking at each other with the thing the children needed to see, and become coworkers in a household that was running while the marriage inside it was not alive.
   After: He was observing, and his observation was devastating in its accuracy, because we had in fact stopped laughing, stopped looking at each other with the thing the children needed to see, and become coworkers in a household that was running while the marriage inside it was not alive.
3. Before: We live in a culture that treats commitment as provisional — you commit until you no longer want to, you stay until staying costs more than leaving — and children absorb that message from every direction.
   After: We live in a culture that treats commitment as provisional (you commit until you no longer want to, you stay until staying costs more than leaving) and children absorb that message from every direction.
4. Before: Susanna has told me, more than once, that she sometimes feels like she gets whatever is left over after the church has taken what it needs — and she is not wrong.
   After: Susanna has told me, more than once, that she sometimes feels like she gets whatever is left over after the church has taken what it needs, and she is not wrong.
5. Before: So choose well — not perfectly, but well — with as much grace and restraint and honesty as you can gather, and with the confidence that God is forming your children through this, even through this, if you will let Him.
   After: So choose well (not perfectly, but well) with as much grace and restraint and honesty as you can gather, and with the confidence that God is forming your children through this, even through this, if you will let Him.


## Chapter Nine: The Teenage Years, When Formation Goes Underground (`sec10.xhtml`)

Words 3,250 to 3,250. Em-dashes in his prose 46 to 0 (14.2 to 0.0 per 1,000 words). Tells 90 to 47 (27.7 to 14.5 per 1,000). Mean sentence 28.5 words to 28.5; sentences of eight words or fewer 22.8% to 22.8%; of five or fewer 15.8% to 15.8%. 29 edits; paragraphs 32 to 32. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 46 to 0, not_but 13 to 13, not_just 1 to 1, NotX.Y 4 to 4, isnt_its 3 to 3, triplet 10 to 13, anaphora 4 to 4, stock 1 to 1, intens 2 to 2, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 35 number words, proper names by count, and 51 hedge words (after: 51) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The teenage years are the season when formation goes underground — and everything you built in the first twelve or thirteen years does not vanish so much as drop below the surface, where you can no longer watch it work. The child who was open becomes private; the child who was eager becomes skeptical; the child who was compliant becomes confrontational, or withdrawn — and the parent, used to a certain kind of access, suddenly has almost none.
   After: The teenage years are the season when formation goes underground, and everything you built in the first twelve or thirteen years does not vanish so much as drop below the surface, where you can no longer watch it work. The child who was open becomes private; the child who was eager becomes skeptical; the child who was compliant becomes confrontational, or withdrawn, and the parent, used to a certain kind of access, suddenly has almost none.
2. Before: Peer bonds become paramount, but the parental bond does not disappear — it goes underground like everything else.
   After: Peer bonds become paramount, but the parental bond does not disappear; it goes underground like everything else.
3. Before: Many parents of teenagers are terrified they began too late — they did not do the work in the early years, never built the household catechism, outsourced to the church, and now the teenager is pulling away and there is little foundation to stand on.
   After: Many parents of teenagers are terrified they began too late; they did not do the work in the early years, never built the household catechism, outsourced to the church, and now the teenager is pulling away and there is little foundation to stand on.
4. Before: During adolescence the peer group becomes the primary social world, and this is normal — and it is terrifying, because the peer group is shaping your child in ways you cannot control and often cannot see.
   After: During adolescence the peer group becomes the primary social world, and this is normal, and it is terrifying, because the peer group is shaping your child in ways you cannot control and often cannot see.
5. Before: It is dark in the tunnel, and the parent cannot see where it goes — but there is light at the far end, and the parent who keeps walking, keeps praying, keeps loving, comes out of it with his child, both of them changed, both of them deeper, connected in a way the easy years of childhood could never have produced. Trust the process — not the therapeutic slogan, the actual theological one:
   After: It is dark in the tunnel, and the parent cannot see where it goes, but there is light at the far end, and the parent who keeps walking, keeps praying, keeps loving, comes out of it with his child, both of them changed, both of them deeper, connected in a way the easy years of childhood could never have produced. Trust the process, not the therapeutic slogan, the actual theological one:


## Chapter Ten: Fathers, Presence, and the Weight of Blessing (`sec11.xhtml`)

Words 3,298 to 3,298. Em-dashes in his prose 38 to 0 (11.5 to 0.0 per 1,000 words). Tells 68 to 30 (20.6 to 9.1 per 1,000). Mean sentence 27.7 words to 27.7; sentences of eight words or fewer 27.7% to 27.7%; of five or fewer 14.3% to 14.3%. 24 edits; paragraphs 30 to 30. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 38 to 0, not_but 8 to 8, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 8 to 8, anaphora 4 to 4, intens 2 to 2, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 58 number words, proper names by count, and 49 hedge words (after: 49) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: I know what absence does to a boy, and I have watched it do its slow work in the lives of the men I have pastored for twenty years — which is how I came to know something the church seems to have forgotten:
   After: I know what absence does to a boy, and I have watched it do its slow work in the lives of the men I have pastored for twenty years, which is how I came to know something the church seems to have forgotten:
2. Before: Theology in the head competes with theology in the marrow, and the theology in the marrow — the one planted by the father — usually wins.
   After: Theology in the head competes with theology in the marrow, and the theology in the marrow, the one planted by the father, usually wins.
3. Before: They believe that authority in the home is held by never showing weakness — but that is a cultural script, not a Christian one, and a father who is never wrong in front of his children is teaching them that Christianity is a performance of rightness, which is the opposite of the gospel. A father who turns to his child and says, I was wrong, I was short with you, that came out of my own stuff, I have asked God's forgiveness and now I am asking yours — that father is teaching something profoundly Christian, and the authority does not shrink but grows.
   After: They believe that authority in the home is held by never showing weakness, but that is a cultural script, not a Christian one, and a father who is never wrong in front of his children is teaching them that Christianity is a performance of rightness, which is the opposite of the gospel. A father who turns to his child and says, I was wrong, I was short with you, that came out of my own stuff, I have asked God's forgiveness and now I am asking yours; that father is teaching something profoundly Christian, and the authority does not shrink but grows.
4. Before: The discipline of presence is one of the hardest disciplines of fatherhood, because it asks you to set things down — not the phone only, but the worry, the planning, the rehearsal of tomorrow's problems — and to be in the room you are in, with the people who are in it, giving them the thing they most need from you, which is not your provision and not your protection but your attention.
   After: The discipline of presence is one of the hardest disciplines of fatherhood, because it asks you to set things down (not the phone only, but the worry, the planning, the rehearsal of tomorrow's problems) and to be in the room you are in, with the people who are in it, giving them the thing they most need from you, which is not your provision and not your protection but your attention.
5. Before: you are not disqualified, and you are not destined to repeat what was done to you, or what was never done — but the wound will define your fathering if you leave it untreated, because untreated wounds leak into every relationship, and the one they leak into most is the relationship with the small person who looks up and calls you Dad. Take it to God, and to people who can help you carry it — a counselor, a mentor, a friend who will listen without flinching.
   After: you are not disqualified, and you are not destined to repeat what was done to you, or what was never done, but the wound will define your fathering if you leave it untreated, because untreated wounds leak into every relationship, and the one they leak into most is the relationship with the small person who looks up and calls you Dad. Take it to God, and to people who can help you carry it: a counselor, a mentor, a friend who will listen without flinching.


## Chapter Eleven: Single Parents, Blended Families, and the God Who Holds (`sec12.xhtml`)

Words 2,296 to 2,296. Em-dashes in his prose 27 to 1 (11.8 to 0.4 per 1,000 words). Tells 61 to 35 (26.6 to 15.2 per 1,000). Mean sentence 31.5 words to 31.5; sentences of eight words or fewer 21.9% to 21.9%; of five or fewer 15.1% to 15.1%. 19 edits; paragraphs 26 to 26. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 27 to 1, not_but 10 to 10, NotX.Y 1 to 1, isnt_its 3 to 3, triplet 12 to 12, intens 3 to 3, q_answered 1 to 1, short_close 3 to 3, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 38 number words, proper names by count, and 45 hedge words (after: 45) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: I have written the last several chapters with one household in mind — two parents, married, both present, both professing faith — because that is the picture most Christian parenting books assume, and I have assumed it too, since it is the household I live in and the one I know best.
   After: I have written the last several chapters with one household in mind (two parents, married, both present, both professing faith) because that is the picture most Christian parenting books assume, and I have assumed it too, since it is the household I live in and the one I know best.
2. Before: The single parent carries more of it — the economic weight, the emotional weight, the logistical weight, the spiritual weight, all of it, and carries it without the partner who was supposed to share the load.
   After: The single parent carries more of it: the economic weight, the emotional weight, the logistical weight, the spiritual weight, all of it, and carries it without the partner who was supposed to share the load.
3. Before: The household still has a catechism — what it praises, what it worries about, what it repeats, what it rests in — and the added complication is that the child may be absorbing two catechisms, one from each home, and the two may contradict.
   After: The household still has a catechism (what it praises, what it worries about, what it repeats, what it rests in) and the added complication is that the child may be absorbing two catechisms, one from each home, and the two may contradict.
4. Before: Many single parents resist it, feeling they should manage alone and that to accept help is to admit defeat — but it is not defeat, it is wisdom, because God designed the body of Christ to share burdens.
   After: Many single parents resist it, feeling they should manage alone and that to accept help is to admit defeat, but it is not defeat, it is wisdom, because God designed the body of Christ to share burdens.
5. Before: It was forged — in the fire of raising three children alone while trusting a God she could not see to hold what she could not carry.
   After: It was forged, in the fire of raising three children alone while trusting a God she could not see to hold what she could not carry.


## Chapter Twelve: Grandparents and the Long Memory of Faith (`sec13.xhtml`)

Words 2,648 to 2,648. Em-dashes in his prose 35 to 0 (13.2 to 0.0 per 1,000 words). Tells 72 to 38 (27.2 to 14.4 per 1,000). Mean sentence 26.5 words to 26.5; sentences of eight words or fewer 26.0% to 26.0%; of five or fewer 17.0% to 17.0%. 22 edits; paragraphs 28 to 28. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 35 to 0, not_but 3 to 3, NotX.Y 2 to 2, isnt_its 3 to 3, triplet 15 to 16, anaphora 1 to 1, intens 5 to 5, colon_reveal 2 to 2, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 53 number words, proper names by count, and 41 hedge words (after: 41) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Count the generations as the psalmist names them — ancestors, their children, the next generation, the children not yet born, and the children of those children — and you arrive at five, which is the first clue that this was never a one-generation project.
   After: Count the generations as the psalmist names them (ancestors, their children, the next generation, the children not yet born, and the children of those children) and you arrive at five, which is the first clue that this was never a one-generation project.
2. Before: So tell it — at the dinner table, at Thanksgiving, in the car, while making cookies, while walking the dog.
   After: So tell it: at the dinner table, at Thanksgiving, in the car, while making cookies, while walking the dog.
3. Before: It is theology — it forms the child's capacity to receive the love of God at all.
   After: It is theology; it forms the child's capacity to receive the love of God at all.
4. Before: You need to be there — and you are.
   After: You need to be there, and you are.
5. Before: Tell it anyway — because ten years from now, or twenty, or thirty, in a moment of crisis you cannot foresee, the story will surface, and the memory of your faith will be the thing that holds when everything else gives way.
   After: Tell it anyway, because ten years from now, or twenty, or thirty, in a moment of crisis you cannot foresee, the story will surface, and the memory of your faith will be the thing that holds when everything else gives way.


## Chapter Thirteen: When They Walk Away (`sec14.xhtml`)

Words 2,776 to 2,776. Em-dashes in his prose 31 to 0 (11.2 to 0.0 per 1,000 words). Tells 73 to 44 (26.3 to 15.9 per 1,000). Mean sentence 27.5 words to 27.5; sentences of eight words or fewer 18.8% to 18.8%; of five or fewer 12.9% to 12.9%. 24 edits; paragraphs 31 to 31. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 31 to 0, not_but 7 to 7, NotX.Y 2 to 2, isnt_its 6 to 6, triplet 15 to 17, frag3 1 to 1, anaphora 1 to 1, stock 1 to 1, intens 3 to 3, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 2 numbers in digits, 36 number words, proper names by count, and 50 hedge words (after: 50) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: There is a grief Christian parents carry in public because they have to, while it quietly breaks them in private — the grief of a child who has walked away from the faith.
   After: There is a grief Christian parents carry in public because they have to, while it quietly breaks them in private: the grief of a child who has walked away from the faith.
2. Before: There is the child using unbelief as a permission slip — the one who has not examined the faith and found it wanting, but found it inconvenient and built a rationale for setting it aside.
   After: There is the child using unbelief as a permission slip, the one who has not examined the faith and found it wanting, but found it inconvenient and built a rationale for setting it aside.
3. Before: That is the pattern, and in its structure it is not complicated — let go, watch, and run to them when they turn — but in its execution it is brutal, because the watching is what breaks you.
   After: That is the pattern, and in its structure it is not complicated (let go, watch, and run to them when they turn), but in its execution it is brutal, because the watching is what breaks you.
4. Before: Prepare yourself, too, for the possibility that you may not see the return in this life — it is a hard thing to say, and I say it only because it is true.
   After: Prepare yourself, too, for the possibility that you may not see the return in this life; it is a hard thing to say, and I say it only because it is true.
5. Before: The children of God grieve with hope, which means you are not grieving wrong — you are grieving because you love.
   After: The children of God grieve with hope, which means you are not grieving wrong; you are grieving because you love.


## Conclusion: The Long Obedience of Raising Believers (`sec15.xhtml`)

Words 1,202 to 1,202. Em-dashes in his prose 15 to 0 (12.5 to 0.0 per 1,000 words). Tells 39 to 23 (32.4 to 19.1 per 1,000). Mean sentence 18.8 words to 19.7; sentences of eight words or fewer 31.2% to 27.9%; of five or fewer 17.2% to 13.1%. 13 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 2 to 1.

By kind (before to after): emdash 15 to 0, not_but 5 to 5, NotX.Y 2 to 2, isnt_its 2 to 2, triplet 5 to 6, frag3 2 to 1, anaphora 5 to 4, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 11 number words, proper names by count, and 26 hedge words (after: 26) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: What I owe you instead is a word about how to carry any of it into an ordinary Tuesday — because a Tuesday, when no one is watching and nothing feels significant, is where parenting actually happens.
   After: What I owe you instead is a word about how to carry any of it into an ordinary Tuesday, because a Tuesday, when no one is watching and nothing feels significant, is where parenting actually happens.
2. Before: I walked him through what I actually believed — the historical evidence, the alternatives I had weighed, the reasons the resurrection has held for me under every alternative I have ever considered — and he listened, and then he was quiet for a long while.
   After: I walked him through what I actually believed (the historical evidence, the alternatives I had weighed, the reasons the resurrection has held for me under every alternative I have ever considered) and he listened, and then he was quiet for a long while.
3. Before: And then the hardest thing held — that a child's faith is, in the end, between him and God.
   After: And then the hardest thing held: that a child's faith is, in the end, between him and God.
4. Before: She did not form me in the Christian faith, because she did not have it to give — but she formed me in something the faith would later fill.
   After: She did not form me in the Christian faith, because she did not have it to give, but she formed me in something the faith would later fill.
5. Before: So go. Into the kitchen. Into the car. Into the bedroom where the child is waiting for the blessing. Go with the confidence that the small thing you do tonight is the thing God will use — not because it is impressive, but because it is faithful.
   After: So go: into the kitchen, into the car, into the bedroom where the child is waiting for the blessing. Go with the confidence that the small thing you do tonight is the thing God will use, not because it is impressive, but because it is faithful.

## The whole book

All fifteen files were edited (the introduction, thirteen chapters and the conclusion). In his running prose: 45,384 words before and after; em-dashes 516 before, 1 after (11.4 to 0.0 per 1,000 words; his limit is 4 to 6); paragraphs unchanged in number. The fact diff passed on all fifteen.

**Every edit is punctuation.** Each recasts a dash as a comma, a colon, a semicolon or brackets, or joins fragments. No word was added, removed or replaced: the word count is the same before and after in every chapter. Two fragment stacks were joined: "Not the curriculum. Not the church. Not the school. The parent." is "Not the curriculum, not the church, not the school: the parent." (introduction), and "So go. Into the kitchen. Into the car. Into the bedroom where the child is waiting for the blessing." is "So go: into the kitchen, into the car, into the bedroom ..." (conclusion).

**The one dash that stays** follows a child's three questions ("Why is my family different? Is something wrong with us? Did I cause this? — and you can answer those questions ...", chapter 11), where nothing else can follow a question mark.

**A second look (2026-11-26).** After the first pass, every place where the rule had closed brackets straight onto "but", "so" or "yet" beginning a new clause was found by search and given its comma ("), but"), and the dash after the child's questions was restored; one commit, the fact diff passing again.

**Left alone, and why.** The verdicts stay: "Not compliance. Conviction. Not performance. Formed loves." (chapter 5), which could only be joined by adding words; "The commands follow. They do not precede. They do not substitute." (chapter 5), three full sentences; "Keep loving. Keep praying. Keep the door open." (chapter 13), imperatives; "Use the years. Not perfectly. Faithfully." (conclusion). Every word about discipline, spanking, anger, screens and the child who walks away is as he wrote it.

**Forbidden Language list.** None of the listed words is in his prose.

## Whole read (2026-11-26)

The first pass, recorded above, recast every dash by a fixed rule and read each proposal only in its own sentence. This second pass read every chapter whole, from the first line to the last, as the first four books were read, in the text as the rule left it. Every place the rule had changed was marked in the reading copy, so each comma, semicolon, colon and bracket it chose could be judged in its paragraph. The rule for an edit is the same as before, and stricter: punctuation and capital letters only, and no word added, removed or replaced. The fact diff (`/home/user/vb/factdiff.py`, against the typesetter's original text, 7168d7e6) now also requires the book's words to be the original's word for word, counted as a list, and it passes on all fifteen files.

What the whole read changed, in 80 edits:

- **A semicolon that cut a subject from its verb.** The rule put a semicolon where a long run of "who" clauses or a list of examples reached its main verb ("who treats the faith ... as the animating reality of the whole house; that parent is the primary formation environment"). Each of these is now a comma: introduction, chapters 5, 10 and 12.
- **A comma that ran two sentences together.** Where the rule's comma joined two whole sentences ("Children form around the center of a parent's actual life, if the center is work, they will form around work"), it is now a colon or a semicolon.
- **A semicolon or comma before a gloss or a list.** Where the second half spells out the first, it is now a colon ("the single parent feels the difference: she walks into the mother-daughter event and sits alone").
- **Two sentences the rule broke.**
  - In chapter 4, its brackets opened in one clause and closed in the next ("asking a question about safety (am I safe ... hurt; a child who starts withdrawing is asking about belonging) do I still belong here"). The three clauses now each take a colon.
  - In chapter 2, a question lost its question mark ("Where do I go when I am depleted, if the honest answer is the phone"). It has the mark back.
- **A closing bracket that needed a comma after it,** where the sentence goes on with a new clause or an apposition: chapters 4, 7, 8 and 9.
- **Fragment stacks joined** where no word had to be added: "Proximity to a formed life, over years, in ordinary rooms, with a thousand small honesties along the way" (chapter 1); "The forces working against a Christian marriage are relentless: exhaustion, distraction, unresolved conflict ..." and "the four channels are still running: what you praise, what you worry about, what you repeat, what you rest in" (chapter 8).

Left as they are:

- The verdicts the first pass listed. Others like them stay too: "Not the model I preached. The model I lived." (introduction); "That was formation. Not the content of the answer. The posture of the answerer." (chapter 1); "Not to Google. Not to the friend who is also confused. To you." (chapter 4); "Not wrong. Different." (chapter 2).
- Every word about discipline, spanking, screens, single parents and the child who walks away.
- Every item in the list below.

Five pairs:

1. Introduction. Before: "who treats the faith not as a performance staged for the children but as the animating reality of the whole house; that parent is the primary formation environment." After: "… of the whole house, that parent is the primary formation environment."
2. Chapter 1. Before: "Children form around the center of a parent's actual life, if the center is work, they will form around work; if the center is appearance …" After: "Children form around the center of a parent's actual life: if the center is work, they will form around work; …"
3. Chapter 2. Before: "Where do I go when I am depleted, if the honest answer is the phone, the television, or the pantry, then that is what my children are learning is the resting place." After: "Where do I go when I am depleted? If the honest answer is the phone, …"
4. Chapter 4. Before: "A child who starts lying is asking a question about safety (am I safe to tell the truth in this house, or will the truth get me hurt; a child who starts withdrawing is asking about belonging) do I still belong here if I am not who you want me to be; …" After: "… a question about safety: am I safe to tell the truth in this house, or will the truth get me hurt; a child who starts withdrawing is asking about belonging: do I still belong here …"
5. Chapter 8. Before: "The forces working against a Christian marriage are relentless. Exhaustion, distraction, unresolved conflict, the slow drift of two people who stop choosing each other …" After: "… are relentless: exhaustion, distraction, unresolved conflict, the slow drift …"

The counts below are for his running prose, the rule-pass text against the text now. Semicolons, colons and brackets are counted outside quotations.

| Chapter | Words | Edits | Semicolons | Colons | Brackets | Fact diff |
|---|---|---|---|---|---|---|
| The Faith You Cannot Transmit | 3,582 | 2 | 41 → 41 | 17 → 17 | 5 → 5 | PASS |
| What We Mean When We Say Formation | 3,666 | 9 | 37 → 34 | 19 → 25 | 4 → 4 | PASS |
| The Home Is the Primary Catechism | 3,376 | 5 | 37 → 34 | 16 → 19 | 7 → 7 | PASS |
| When the Church Replaces the Parent | 3,045 | 4 | 34 → 31 | 17 → 19 | 0 → 0 | PASS |
| The Questions Children Actually Ask | 3,883 | 6 | 47 → 46 | 21 → 26 | 5 → 4 | PASS |
| Obedience Without Gospel | 2,777 | 7 | 26 → 22 | 11 → 17 | 0 → 0 | PASS |
| Discipline, Correction, and the Shape of Grace | 3,051 | 3 | 24 → 24 | 22 → 23 | 10 → 10 | PASS |
| Screens, Algorithms, and the Catechesis of Attention | 2,937 | 7 | 29 → 29 | 11 → 13 | 5 → 5 | PASS |
| Marriage as the First Classroom | 3,597 | 12 | 30 → 31 | 15 → 24 | 8 → 8 | PASS |
| The Teenage Years, When Formation Goes Underground | 3,250 | 4 | 32 → 31 | 16 → 17 | 12 → 12 | PASS |
| Fathers, Presence, and the Weight of Blessing | 3,298 | 4 | 20 → 19 | 24 → 26 | 3 → 3 | PASS |
| Single Parents, Blended Families, and the God Who Holds | 2,296 | 5 | 20 → 19 | 9 → 13 | 4 → 4 | PASS |
| Grandparents and the Long Memory of Faith | 2,648 | 5 | 17 → 13 | 15 → 19 | 6 → 6 | PASS |
| When They Walk Away | 2,776 | 6 | 28 → 27 | 16 → 21 | 4 → 4 | PASS |
| The Long Obedience of Raising Believers | 1,202 | 1 | 11 → 11 | 7 → 8 | 2 → 2 | PASS |
| **All 15** | 45,384 | 80 | 433 → 412 | 236 → 287 | 75 → 74 | |

The files were rebuilt with `node scripts/build-book-files.mjs raising-believers --verify`:

- 161 pages, the same as before, so `client/src/data/ebooks.ts` is unchanged.
- The EPUB carries the source folder's text exactly: 47,090 words compared, no difference.
- The PDF's pages carry it character for character: 214,906 against 214,906.
- The page with the repaired chapter 4 sentence (page 58 of the book, page 66 of the file) was looked at as an image.

## For James: things that look wrong, none of them changed

The chapters were not read whole for this list. It comes from reading every block quotation against its reference, and from searching the book for statements of his ministry, his family, statistics and research. Each item needs checking before it is corrected; the starred ones a reader would find first.

1. ★ **Years in ministry.** The book says "twenty years of ministry" (introduction), "twenty years in pastoral ministry" and "twenty years of pastoral observation" (chapter 1), "pastoring for twenty years" (chapter 4), "twenty years of pastoral counseling" (chapter 6), "two decades" (chapter 8), "the men I have pastored for twenty years" (chapter 10), and "fifteen years of ministry and five sons" (chapter 9). The site says he has been a pastor for 16 years (his word, 2026-11-18). The book disagrees with itself (fifteen against twenty) and with the site.
2. ★ Psalm 68:5-6 is quoted (chapter 11, and again in the conclusion) as "I will be a Father to the fatherless, and a husband to the widow. He sets the lonely in families." The ESV reads "Father of the fatherless and protector of widows is God in his holy habitation. God settles the solitary in a home"; the first sentence of the quotation is not in Psalm 68 in any common translation.
3. **Translation.** The copyright page names the ESV. 1 Peter 3:15 ("Always be prepared to give an answer ... gentleness and respect") and Psalm 78:4-5 ("the praiseworthy deeds of the Lord ... He commanded our ancestors") are the NIV's wording; Hebrews 12:6 is shortened to "The Lord disciplines those He loves" (the ESV has "the Lord disciplines the one he loves"); 1 Corinthians 6:12 has "mastered" where the ESV has "dominated"; Numbers 6:24 and 24-26 are both quoted (the first block repeats the opening of the second).
4. "somewhere between forty and sixty percent of young adults raised in evangelical homes are walking away from the church by their mid-twenties" (introduction) has no source; the hedge before it is his and is kept.
5. "the research on adolescent phone use is not ambiguous" (chapter 7). The research is in fact disputed among specialists; the sentence states one side without a hedge.
6. The spanking passage (chapter 6) is offered as what he has seen, not as research; that is how it reads and it was left so. It is listed only because a reader may take "were not notably different" as a study's finding.
7. "my mother came to faith later in life" (chapter 12) and "She raised me without a father, without faith" (conclusion) agree; listed only so that the two are checked together.

## Questions only James can answer

1. Fifteen or twenty years, and how does either sit with the 16 years on the site?
2. Psalm 68:5-6: which wording do you want?
3. Bring the NIV quotations to the ESV, or have the copyright page name both?

## The files

Rebuilt after the last chapter: 161 pages (163 as first typeset; `client/src/data/ebooks.ts` now says 161), PDF 1.2 MB, EPUB 306 KB. `--verify`: the EPUB carries exactly the source folder's text with the listed typesetting (47,090 words compared, no difference); the PDF's pages carry the same text character for character (214,899 against 214,899). A chapter opening and a body page with a block quotation were looked at as images.
