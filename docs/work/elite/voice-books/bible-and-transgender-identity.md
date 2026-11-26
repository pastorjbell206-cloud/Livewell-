# What Does the Bible Say About Transgender Identity?: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the eighth book, What Does the Bible Say About Transgender Identity? (id `bible-and-transgender-identity`), edited in `content/books-src/bible-and-transgender-identity/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit 69441465; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The method is the one recorded in `believe.md` and `the-reliability-of-scripture.md`, beside this file.

## Method

The book holds the creation account, the body and the medical questions beside the suffering of people with gender dysphoria, and states the positions on each side before saying where it lands. It has 459 long dashes in the 47,657 words of his running prose (9.6 per 1,000 words, against his limit of 4 to 6); seven of its chapters set the dash closed up (word—word) and the rest spaced, and both kinds were worked the same way. It has a few runs of short sentences, mostly a parent's instructions.

What an edit may be: an em-dash recast as a comma, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into one sentence where no new word is needed. Nothing else: no word was added, removed or replaced, and no sentence, fact, example or opinion was added or taken out. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff 69441465 -- content/books-src/bible-and-transgender-identity/` shows every change). One commit per chapter. In the tables an "edit" is one changed paragraph, which may hold several dashes.

**How the dashes were worked, and what that means.** Unlike the first four books, the chapters were not each read whole before editing. Every long dash in his running prose was given a recast by one fixed rule: a pair of dashes around an aside became commas, or brackets where the aside itself holds a comma or a question; a single dash before "and", "but", "which", "because", "not" and the like became a comma; before an independent clause, a semicolon; before a list, a colon; otherwise a comma. Each proposal was then read in its sentence, and where the rule chose wrongly it was overridden (82 overrides in this book). The fact diff below is what proves nothing but punctuation moved.

**A contested subject, and the rule was strictest here.** Every statement of the theological position, every account of the medical evidence and of the people who disagree with it, every concession, every steelman, every confession of the church's harm and every pastoral line took punctuation only; the fact diff holds every quoted word, name, number, study and hedge in place. Where the book criticizes the right and the left in parallel, both took the same rule. Quotations (the Cass Review, the Berry passage, the words the book gives a parent or a church to say) keep their dashes, as all quotations do. The book has no line giving a reader a place to call for help, and none was added (see below).

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (the fact diff holds them fixed), and so does anything a chapter sets after its running prose (questions for reflection, takeaways, sources), which the fact diff also leaves out of the prose it checks.

Three scripts, kept outside the repo in `/home/user/vs5/t/` (`apply.py`, `factdiff.py`, `tells.py`, with `propose.py` for the rule), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: THE QUESTION NOBODY PREPARED THE CHURCH TO ANSWER | 1,533 | 1,533 | +0.0% | 22 (14.4) | 0 (0.0) | 56 (36.5) | 34 (22.2) | 16 | PASS |
| Chapter 2: WHAT IS GENDER DYSPHORIA? | 4,298 | 4,298 | +0.0% | 38 (8.8) | 0 (0.0) | 106 (24.7) | 69 (16.1) | 29 | PASS |
| Chapter 3: THE BODY MATTERS | 3,795 | 3,795 | +0.0% | 40 (10.5) | 0 (0.0) | 113 (29.8) | 74 (19.5) | 28 | PASS |
| Chapter 4: EUNUCHS IN THE BIBLE | 3,002 | 3,002 | +0.0% | 31 (10.3) | 0 (0.0) | 74 (24.7) | 44 (14.7) | 18 | PASS |
| Chapter 5: THE GENDER IDEOLOGY DEBATE | 3,650 | 3,650 | +0.0% | 48 (13.2) | 0 (0.0) | 108 (29.6) | 62 (17.0) | 23 | PASS |
| Chapter 6: CHILDREN, PUBERTY BLOCKERS, AND THE CHURCH'S RESPONSIBILITY | 4,205 | 4,205 | +0.0% | 44 (10.5) | 0 (0.0) | 111 (26.4) | 72 (17.1) | 28 | PASS |
| Chapter 7: PRONOUNS, BATHROOMS, AND THE DAILY QUESTIONS | 3,967 | 3,967 | +0.0% | 37 (9.3) | 0 (0.0) | 105 (26.5) | 71 (17.9) | 25 | PASS |
| Chapter 8: HOW THE CHURCH HAS HARMED TRANSGENDER PEOPLE | 2,512 | 2,512 | +0.0% | 27 (10.7) | 0 (0.0) | 63 (25.1) | 36 (14.3) | 23 | PASS |
| Chapter 9: Intersex Conditions and the Binary Question | 2,952 | 2,952 | +0.0% | 27 (9.1) | 2 (0.7) | 74 (25.1) | 51 (17.3) | 17 | PASS |
| Chapter 10: TRANSGENDER PEOPLE IN YOUR CHURCH | 3,646 | 3,646 | +0.0% | 36 (9.9) | 0 (0.0) | 100 (27.4) | 69 (18.9) | 22 | PASS |
| Chapter 11: WHAT TO SAY WHEN SOMEONE YOU LOVE SAYS THEY'RE TRANSGENDER | 3,367 | 3,367 | +0.0% | 39 (11.6) | 0 (0.0) | 79 (23.5) | 43 (12.8) | 28 | PASS |
| Chapter 12: A CHURCH THAT HOLDS THE TRUTH AND WEEPS WITH THOSE WHO WEEP | 3,671 | 3,671 | +0.0% | 40 (10.9) | 0 (0.0) | 117 (31.9) | 77 (21.0) | 25 | PASS |
| Conclusion: IMAGE-BEARERS FIRST | 3,049 | 3,049 | +0.0% | 30 (9.8) | 0 (0.0) | 108 (35.4) | 78 (25.6) | 23 | PASS |
| **All 13** | 43,647 | 43,647 | +0.0% | 459 (10.5) | 2 (0.0) | 1214 (27.8) | 780 (17.9) | 305 | |

## Introduction: THE QUESTION NOBODY PREPARED THE CHURCH TO ANSWER (`sec01.xhtml`)

Words 1,533 to 1,533. Em-dashes in his prose 22 to 0 (14.4 to 0.0 per 1,000 words). Tells 56 to 34 (36.5 to 22.2 per 1,000). Mean sentence 16.4 words to 16.4; sentences of eight words or fewer 43.2% to 43.2%; of five or fewer 31.8% to 31.8%. 16 edits; paragraphs 20 to 20. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 2 to 2.

By kind (before to after): emdash 22 to 0, not_but 1 to 1, NotX.Y 4 to 4, isnt_its 2 to 2, triplet 4 to 4, frag3 2 to 2, anaphora 9 to 9, stock 2 to 2, intens 1 to 1, q_answered 3 to 3, colon_reveal 1 to 1, short_close 4 to 4, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 6 quoted strings, 0 Scripture references, 1 years, 1 numbers in digits, 17 number words, proper names by count, and 37 hedge words (after: 37) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: What he had instead was panic, denial, a few Bible verses deployed like grenades — and a son who had stopped calling.
   After: What he had instead was panic, denial, a few Bible verses deployed like grenades, and a son who had stopped calling.
2. Before: the person at the center of the question — the teenager confused about their body, the young adult in genuine distress, the parent torn between love and conviction — has nowhere to turn that feels safe.
   After: the person at the center of the question (the teenager confused about their body, the young adult in genuine distress, the parent torn between love and conviction) has nowhere to turn that feels safe.
3. Before: And the church needs to learn to speak both languages at once — the language of uncompromised truth and the language of genuine love.
   After: And the church needs to learn to speak both languages at once: the language of uncompromised truth and the language of genuine love.
4. Before: She was at FBC last Sunday, sitting in the pew like she always does, blonde hair in a ponytail, Girl Scout uniform from Wednesday night, normal — or what normal looks like from the back of a church where we see faces but not lives.
   After: She was at FBC last Sunday, sitting in the pew like she always does, blonde hair in a ponytail, Girl Scout uniform from Wednesday night, normal, or what normal looks like from the back of a church where we see faces but not lives.
5. Before: That is what this introduction is about — not settling the gender question, but creating space for families to actually handle it with the church's help instead of the church's condemnation or the church's absence.
   After: That is what this introduction is about, not settling the gender question, but creating space for families to actually handle it with the church's help instead of the church's condemnation or the church's absence.


## Chapter 2: WHAT IS GENDER DYSPHORIA? (`sec03.xhtml`)

Words 4,298 to 4,298. Em-dashes in his prose 38 to 0 (8.8 to 0.0 per 1,000 words). Tells 106 to 69 (24.7 to 16.1 per 1,000). Mean sentence 20.8 words to 20.8; sentences of eight words or fewer 24.9% to 24.9%; of five or fewer 9.1% to 9.1%. 29 edits; paragraphs 55 to 55. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 38 to 0, not_but 11 to 11, NotX.Y 2 to 2, isnt_its 8 to 8, triplet 19 to 19, anaphora 4 to 4, stock 5 to 5, intens 6 to 6, q_answered 1 to 1, colon_reveal 0 to 1, short_close 12 to 12.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 15 quoted strings, 0 Scripture references, 7 years, 16 numbers in digits, 46 number words, proper names by count, and 93 hedge words (after: 93) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: You need to understand what gender dysphoria actually is—clinically, psychologically, spiritually—and to distinguish between gender dysphoria, gender identity, and gender ideology.
   After: You need to understand what gender dysphoria actually is (clinically, psychologically, spiritually) and to distinguish between gender dysphoria, gender identity, and gender ideology.
2. Before: Taking dysphoria seriously means acknowledging that the suffering is real, refusing to mock it, and walking with the person through it—not abandoning them into ideology.
   After: Taking dysphoria seriously means acknowledging that the suffering is real, refusing to mock it, and walking with the person through it, not abandoning them into ideology.
3. Before: using the word dysphoria carelessly, using it to describe everyone who questions their gender, using it to dismiss the reality of medical conditions—all of this prevents us from thinking clearly.
   After: using the word dysphoria carelessly, using it to describe everyone who questions their gender, using it to dismiss the reality of medical conditions; all of this prevents us from thinking clearly.
4. Before: This is not localized, and it is not regional—it is happening across multiple developed countries simultaneously.
   After: This is not localized, and it is not regional; it is happening across multiple developed countries simultaneously.
5. Before: A medical professional who is cautious has learned from experience—they have seen outcomes, they have watched young people who transitioned and later expressed regret, they have watched young people who transitioned and felt genuine relief, they have watched young people with depression masquerading as dysphoria, they have watched young people with trauma creating disconnection from their body.
   After: A medical professional who is cautious has learned from experience; they have seen outcomes, they have watched young people who transitioned and later expressed regret, they have watched young people who transitioned and felt genuine relief, they have watched young people with depression masquerading as dysphoria, they have watched young people with trauma creating disconnection from their body.


## Chapter 3: THE BODY MATTERS (`sec04.xhtml`)

Words 3,795 to 3,795. Em-dashes in his prose 40 to 0 (10.5 to 0.0 per 1,000 words). Tells 113 to 74 (29.8 to 19.5 per 1,000). Mean sentence 18.2 words to 18.2; sentences of eight words or fewer 32.3% to 32.3%; of five or fewer 20.2% to 20.2%. 28 edits; paragraphs 43 to 43. Paragraphs of fifteen words or fewer 2 to 2; runs of three fragments 1 to 1.

By kind (before to after): emdash 40 to 0, not_but 19 to 19, not_just 1 to 1, NotX.Y 11 to 11, isnt_its 6 to 6, triplet 12 to 12, frag3 1 to 1, anaphora 6 to 6, stock 1 to 1, intens 2 to 2, colon_reveal 2 to 3, short_close 10 to 10, one_line_para 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 20 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 19 number words, proper names by count, and 41 hedge words (after: 41) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: And then Christianity teaches something even more demanding — we will have bodies forever.
   After: And then Christianity teaches something even more demanding; we will have bodies forever.
2. Before: We will have real bodies in eternity — not incidental bodies, but bodies that matter.
   After: We will have real bodies in eternity, not incidental bodies, but bodies that matter.
3. Before: It is deeper, longer, harder work — it is therapy, it is prayer, it is discipleship, it is learning to live from the inside out rather than constantly rebelling against the material reality of your existence.
   After: It is deeper, longer, harder work; it is therapy, it is prayer, it is discipleship, it is learning to live from the inside out rather than constantly rebelling against the material reality of your existence.
4. Before: The true you is interior — consciousness, identity, the sense of who you are — and the body is external, a temporary vessel that houses that self.
   After: The true you is interior (consciousness, identity, the sense of who you are) and the body is external, a temporary vessel that houses that self.
5. Before: This is why the church has to recover body theology — not a theology that says the body is fallen and must be denied, not a theology that says the body does not matter and the internal sense of self is all that matters, but a theology that says you are embodied, your body is good, your body is part of your identity, your peace comes not from changing the body but from accepting it and living faithfully within it, and your hope comes from the promise that this embodied existence, with all its suffering and difficulty, will be redeemed and transformed by God.
   After: This is why the church has to recover body theology, not a theology that says the body is fallen and must be denied, not a theology that says the body does not matter and the internal sense of self is all that matters, but a theology that says you are embodied, your body is good, your body is part of your identity, your peace comes not from changing the body but from accepting it and living faithfully within it, and your hope comes from the promise that this embodied existence, with all its suffering and difficulty, will be redeemed and transformed by God.


## Chapter 4: EUNUCHS IN THE BIBLE (`sec05.xhtml`)

Words 3,002 to 3,002. Em-dashes in his prose 31 to 0 (10.3 to 0.0 per 1,000 words). Tells 74 to 44 (24.7 to 14.7 per 1,000). Mean sentence 20.1 words to 20.1; sentences of eight words or fewer 33.8% to 33.8%; of five or fewer 19.1% to 19.1%. 18 edits; paragraphs 34 to 34. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 31 to 0, not_but 16 to 16, NotX.Y 2 to 2, isnt_its 3 to 3, triplet 7 to 8, frag3 1 to 1, anaphora 1 to 1, stock 2 to 2, intens 1 to 1, short_close 10 to 10.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 16 quoted strings, 14 Scripture references, 0 years, 12 numbers in digits, 26 number words, proper names by count, and 76 hedge words (after: 76) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: And eunuch theology—biblical theology of eunuchs—opens a door that the church has refused to walk through.
   After: And eunuch theology, biblical theology of eunuchs, opens a door that the church has refused to walk through.
2. Before: A eunuch—someone who cannot have biological children, someone who is outside the reproductive pattern—is promised something better than children:
   After: A eunuch (someone who cannot have biological children, someone who is outside the reproductive pattern) is promised something better than children:
3. Before: These are not identical situations; the eunuch's condition was about reproductive capacity, and the transgender person's condition is about gender identity—the sense of what gender one is, not necessarily about reproductive function.
   After: These are not identical situations; the eunuch's condition was about reproductive capacity, and the transgender person's condition is about gender identity, the sense of what gender one is, not necessarily about reproductive function.
4. Before: Cultures have handled this recognition differently—some with respect, some with disrespect—but most human cultures have somehow acknowledged the reality.
   After: Cultures have handled this recognition differently (some with respect, some with disrespect), but most human cultures have somehow acknowledged the reality.
5. Before: A person who accepts their biological sex, even though they experience dysphoria, is not giving up on meaning; they are finding meaning in a different way—not through reproductive participation, but through spiritual participation, not through biological legacy, but through covenant faithfulness.
   After: A person who accepts their biological sex, even though they experience dysphoria, is not giving up on meaning; they are finding meaning in a different way, not through reproductive participation, but through spiritual participation, not through biological legacy, but through covenant faithfulness.


## Chapter 5: THE GENDER IDEOLOGY DEBATE (`sec06.xhtml`)

Words 3,650 to 3,650. Em-dashes in his prose 48 to 0 (13.2 to 0.0 per 1,000 words). Tells 108 to 62 (29.6 to 17.0 per 1,000). Mean sentence 21.7 words to 21.7; sentences of eight words or fewer 23.5% to 23.5%; of five or fewer 10.2% to 10.2%. 23 edits; paragraphs 25 to 25. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 48 to 0, not_but 21 to 21, NotX.Y 1 to 1, isnt_its 2 to 2, triplet 18 to 18, anaphora 7 to 7, stock 1 to 1, q_answered 2 to 2, colon_reveal 4 to 6, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 7 quoted strings, 6 Scripture references, 0 years, 6 numbers in digits, 32 number words, proper names by count, and 51 hedge words (after: 51) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Is gender performance—roles, presentation, social norms—or is it identity?
   After: Is gender performance (roles, presentation, social norms) or is it identity?
2. Before: Gender ideology treats it as primarily a social construction—different cultures build gender differently, so the Bible's teaching about male and female is culturally conditioned and not universally binding.
   After: Gender ideology treats it as primarily a social construction; different cultures build gender differently, so the Bible's teaching about male and female is culturally conditioned and not universally binding.
3. Before: It does not promise you will get what you want; it promises that you are loved, made in God's image, your identity rooted in Christ, and that transformation is possible—not the transformation you might want, but the one that leads to actual peace.
   After: It does not promise you will get what you want; it promises that you are loved, made in God's image, your identity rooted in Christ, and that transformation is possible, not the transformation you might want, but the one that leads to actual peace.
4. Before: Fourth, insist that people are more than their gender—that more important than someone's gender identity is the fact that they bear God's image, more foundational than gender experience is a relationship with Jesus, and more ultimate than whether one feels comfortable in the body is whether one is at peace with God.
   After: Fourth, insist that people are more than their gender: that more important than someone's gender identity is the fact that they bear God's image, more foundational than gender experience is a relationship with Jesus, and more ultimate than whether one feels comfortable in the body is whether one is at peace with God.
5. Before: Yet the progressive side has too often abandoned the body entirely, treating embodiment as a problem to be solved rather than a mystery to be inhabited—biology does not matter at all except as oppression, the solution being to transcend it—and so confused liberation from oppression with liberation from embodiment itself, creating a different kind of exile.
   After: Yet the progressive side has too often abandoned the body entirely, treating embodiment as a problem to be solved rather than a mystery to be inhabited (biology does not matter at all except as oppression, the solution being to transcend it) and so confused liberation from oppression with liberation from embodiment itself, creating a different kind of exile.


## Chapter 6: CHILDREN, PUBERTY BLOCKERS, AND THE CHURCH'S RESPONSIBILITY (`sec07.xhtml`)

Words 4,205 to 4,205. Em-dashes in his prose 44 to 0 (10.5 to 0.0 per 1,000 words). Tells 111 to 72 (26.4 to 17.1 per 1,000). Mean sentence 18.8 words to 18.8; sentences of eight words or fewer 31.4% to 31.4%; of five or fewer 19.0% to 19.0%. 28 edits; paragraphs 40 to 40. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 4 to 4.

By kind (before to after): emdash 44 to 0, not_but 12 to 14, isnt_its 1 to 1, triplet 22 to 24, frag3 4 to 4, anaphora 5 to 5, stock 2 to 2, intens 5 to 5, q_answered 10 to 10, colon_reveal 1 to 2, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 14 quoted strings, 0 Scripture references, 3 years, 3 numbers in digits, 88 number words, proper names by count, and 97 hedge words (after: 97) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: They know their child is struggling, but they do not know whether the struggle is dysphoria or something else entirely—trauma, peer influence, depression, or body dysphoria, the hatred of one's body, which is a different thing from dysphoria, the experience of one's gender as misaligned.
   After: They know their child is struggling, but they do not know whether the struggle is dysphoria or something else entirely: trauma, peer influence, depression, or body dysphoria, the hatred of one's body, which is a different thing from dysphoria, the experience of one's gender as misaligned.
2. Before: Fourth, they need information—not the propaganda from either side, but actual understanding of what medical interventions do, what their risks and benefits are, what is reversible and what is not.
   After: Fourth, they need information, not the propaganda from either side, but actual understanding of what medical interventions do, what their risks and benefits are, what is reversible and what is not.
3. Before: A parent whose child is expressing gender dysphoria faces an impossible situation, because whatever decision the parent makes—whether to support social transition, whether to consider medical intervention, whether to seek a particular kind of therapy—could be wrong.
   After: A parent whose child is expressing gender dysphoria faces an impossible situation, because whatever decision the parent makes (whether to support social transition, whether to consider medical intervention, whether to seek a particular kind of therapy) could be wrong.
4. Before: The adolescent's brain is not fully developed, particularly in areas related to long-term decision-making and impulse control—the prefrontal cortex, the part of the brain responsible for evaluating long-term consequences, is not fully mature until the mid-twenties.
   After: The adolescent's brain is not fully developed, particularly in areas related to long-term decision-making and impulse control: the prefrontal cortex, the part of the brain responsible for evaluating long-term consequences, is not fully mature until the mid-twenties.
5. Before: They are young people in confusion who deserve the church to be the safest place they can be—safe to ask questions, safe to be confused, safe to explore, safe to come to different conclusions than the culture suggests.
   After: They are young people in confusion who deserve the church to be the safest place they can be: safe to ask questions, safe to be confused, safe to explore, safe to come to different conclusions than the culture suggests.


## Chapter 7: PRONOUNS, BATHROOMS, AND THE DAILY QUESTIONS (`sec08.xhtml`)

Words 3,967 to 3,967. Em-dashes in his prose 37 to 0 (9.3 to 0.0 per 1,000 words). Tells 105 to 71 (26.5 to 17.9 per 1,000). Mean sentence 17.4 words to 17.4; sentences of eight words or fewer 38.0% to 38.0%; of five or fewer 18.1% to 18.1%. 25 edits; paragraphs 43 to 43. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 2 to 2.

By kind (before to after): emdash 37 to 0, not_but 11 to 12, NotX.Y 6 to 6, isnt_its 5 to 5, triplet 10 to 11, frag3 2 to 2, anaphora 5 to 5, stock 7 to 7, intens 4 to 4, colon_reveal 6 to 7, short_close 11 to 11, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 18 quoted strings, 1 Scripture references, 2 years, 2 numbers in digits, 33 number words, proper names by count, and 74 hedge words (after: 74) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: These are the questions the church debates endlessly—pronouns, bathrooms, names.
   After: These are the questions the church debates endlessly: pronouns, bathrooms, names.
2. Before: Someone early in transition, whose appearance does not yet match their identity, will feel unsafe in either bathroom; the church's job is not to eliminate that discomfort—you cannot—but to minimize it and to make the space safe.
   After: Someone early in transition, whose appearance does not yet match their identity, will feel unsafe in either bathroom; the church's job is not to eliminate that discomfort (you cannot) but to minimize it and to make the space safe.
3. Before: Not after they repent, not after they change their mind, not after they come back to biological reality—right now, as they are.
   After: Not after they repent, not after they change their mind, not after they come back to biological reality, right now, as they are.
4. Before: Your policy should be that you will honor the request—not as an affirmation of ideology, but as a basic matter of respect.
   After: Your policy should be that you will honor the request, not as an affirmation of ideology, but as a basic matter of respect.
5. Before: Churches that do this will face criticism from both sides—progressive advocates will say you are not affirming enough, conservative advocates will say you are compromising, and you will disappoint everyone.
   After: Churches that do this will face criticism from both sides: progressive advocates will say you are not affirming enough, conservative advocates will say you are compromising, and you will disappoint everyone.


## Chapter 8: HOW THE CHURCH HAS HARMED TRANSGENDER PEOPLE (`sec09.xhtml`)

Words 2,512 to 2,512. Em-dashes in his prose 27 to 0 (10.7 to 0.0 per 1,000 words). Tells 63 to 36 (25.1 to 14.3 per 1,000). Mean sentence 19.6 words to 19.6; sentences of eight words or fewer 29.2% to 29.2%; of five or fewer 18.6% to 18.6%. 23 edits; paragraphs 30 to 30. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 27 to 0, not_but 9 to 9, not_just 1 to 1, NotX.Y 4 to 4, isnt_its 1 to 1, triplet 6 to 6, anaphora 4 to 4, intens 2 to 2, q_answered 2 to 2, colon_reveal 3 to 3, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 21 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 32 number words, proper names by count, and 55 hedge words (after: 55) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: A young person, usually assigned female at birth, is sitting in the youth group or the worship service, listening to a sermon about God's design — about how God made male and female, about how that design is perfect, about how anyone who questions it is rejecting God.
   After: A young person, usually assigned female at birth, is sitting in the youth group or the worship service, listening to a sermon about God's design, about how God made male and female, about how that design is perfect, about how anyone who questions it is rejecting God.
2. Before: The church has done this routinely — and then wondered why trans people leave.
   After: The church has done this routinely, and then wondered why trans people leave.
3. Before: And the church, by and large, said nothing — nothing at the funeral, nothing from the pulpit, nothing about how it might have failed them, nothing about what should be done differently.
   After: And the church, by and large, said nothing: nothing at the funeral, nothing from the pulpit, nothing about how it might have failed them, nothing about what should be done differently.
4. Before: One path is to double down on mockery and dismissal — to make gender a line in the sand, to treat anyone questioning gender as someone to be defeated ideologically rather than accompanied pastorally.
   After: One path is to double down on mockery and dismissal, to make gender a line in the sand, to treat anyone questioning gender as someone to be defeated ideologically rather than accompanied pastorally.
5. Before: Not repentance from believing what Scripture teaches about the body and sexual difference, not repentance from holding biblical convictions — but repentance from cruelty, from mockery, from abandonment, from the refusal to see people as people rather than as problems to be solved.
   After: Not repentance from believing what Scripture teaches about the body and sexual difference, not repentance from holding biblical convictions, but repentance from cruelty, from mockery, from abandonment, from the refusal to see people as people rather than as problems to be solved.


## Chapter 9: Intersex Conditions and the Binary Question (`sec10.xhtml`)

Words 2,952 to 2,952. Em-dashes in his prose 27 to 2 (9.1 to 0.7 per 1,000 words). Tells 74 to 51 (25.1 to 17.3 per 1,000). Mean sentence 20.1 words to 20.1; sentences of eight words or fewer 25.9% to 25.9%; of five or fewer 13.6% to 13.6%. 17 edits; paragraphs 25 to 25. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 27 to 2, not_but 3 to 3, triplet 22 to 23, frag3 1 to 1, anaphora 5 to 5, stock 1 to 1, intens 8 to 8, q_answered 1 to 1, colon_reveal 1 to 2, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 10 numbers in digits, 29 number words, proper names by count, and 117 hedge words (after: 117) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: But intersex conditions exist — real conditions, real people — and if we are going to think theologically about gender, we have to understand them.
   After: But intersex conditions exist (real conditions, real people) and if we are going to think theologically about gender, we have to understand them.
2. Before: A person with Turner Syndrome (45,X — a single X chromosome) is typically assigned female at birth, raised as a girl, and identifies as female, while living with short stature, possible cardiac or kidney differences, a particular physical presentation, and frequent infertility.
   After: A person with Turner Syndrome (45,X: a single X chromosome) is typically assigned female at birth, raised as a girl, and identifies as female, while living with short stature, possible cardiac or kidney differences, a particular physical presentation, and frequent infertility.
3. Before: Seen this way, the merism of Genesis 1:27 — male and female — starts to look less metaphorical and more literally biological.
   After: Seen this way, the merism of Genesis 1:27, male and female, starts to look less metaphorical and more literally biological.
4. Before: Someone assigned female at birth with AIS will experience her body differently than a typical female, and that difference may create confusion — but it does not necessarily create dysphoria.
   After: Someone assigned female at birth with AIS will experience her body differently than a typical female, and that difference may create confusion, but it does not necessarily create dysphoria.
5. Before: The church should be a place where embodied variation is acknowledged and accepted, where intersex people do not feel obligated to hide, where transgender people are not rejected — but also where the impulse toward medical fixing is questioned carefully, and where the goal is peace with embodied existence, not escape from it.
   After: The church should be a place where embodied variation is acknowledged and accepted, where intersex people do not feel obligated to hide, where transgender people are not rejected, but also where the impulse toward medical fixing is questioned carefully, and where the goal is peace with embodied existence, not escape from it.


## Chapter 10: TRANSGENDER PEOPLE IN YOUR CHURCH (`sec11.xhtml`)

Words 3,646 to 3,646. Em-dashes in his prose 36 to 0 (9.9 to 0.0 per 1,000 words). Tells 100 to 69 (27.4 to 18.9 per 1,000). Mean sentence 21.3 words to 21.3; sentences of eight words or fewer 29.2% to 29.2%; of five or fewer 17.0% to 17.0%. 22 edits; paragraphs 29 to 29. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 36 to 0, not_but 14 to 14, NotX.Y 4 to 4, isnt_its 1 to 1, triplet 14 to 17, anaphora 6 to 6, stock 2 to 2, intens 4 to 4, q_answered 8 to 8, colon_reveal 2 to 4, short_close 9 to 9.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 29 number words, proper names by count, and 87 hedge words (after: 87) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Do we require some kind of repentance first—and repentance from what?
   After: Do we require some kind of repentance first, and repentance from what?
2. Before: We welcome you as a person; you can attend, you can be baptized if you have come to faith, you can be a member—but we need to be careful about leadership, because leadership is about modeling and calling people toward Christ, and we teach that the gospel calls people to accept their biological bodies, so let us talk about what that means for visible roles.
   After: We welcome you as a person; you can attend, you can be baptized if you have come to faith, you can be a member, but we need to be careful about leadership, because leadership is about modeling and calling people toward Christ, and we teach that the gospel calls people to accept their biological bodies, so let us talk about what that means for visible roles.
3. Before: you are made in God's image; you will have a resurrection body; you matter more than your suffering; your identity is rooted in Christ; let me help you find your way to peace—the real kind, not ideology-driven, but the kind that comes from being reconciled to God and to your own embodied existence.
   After: you are made in God's image; you will have a resurrection body; you matter more than your suffering; your identity is rooted in Christ; let me help you find your way to peace, the real kind, not ideology-driven, but the kind that comes from being reconciled to God and to your own embodied existence.
4. Before: What these acts require is willingness—willingness to belong, to follow Jesus, to be part of the community that has decided to live under His lordship.
   After: What these acts require is willingness: willingness to belong, to follow Jesus, to be part of the community that has decided to live under His lordship.
5. Before: Most default to one of two positions—complete exclusion or complete affirmation.
   After: Most default to one of two positions: complete exclusion or complete affirmation.


## Chapter 11: WHAT TO SAY WHEN SOMEONE YOU LOVE SAYS THEY'RE TRANSGENDER (`sec12.xhtml`)

Words 3,367 to 3,367. Em-dashes in his prose 39 to 0 (11.6 to 0.0 per 1,000 words). Tells 79 to 43 (23.5 to 12.8 per 1,000). Mean sentence 21.6 words to 21.6; sentences of eight words or fewer 29.3% to 29.3%; of five or fewer 14.3% to 14.3%. 28 edits; paragraphs 30 to 30. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 39 to 0, not_but 17 to 19, not_just 1 to 1, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 6 to 6, frag3 1 to 1, anaphora 2 to 2, stock 1 to 1, intens 4 to 4, colon_reveal 2 to 3, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 34 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 41 number words, proper names by count, and 87 hedge words (after: 87) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Someone you love—a child, a sibling, a friend, a nephew—tells you they are transgender, and your first feeling is probably some version of this:
   After: Someone you love (a child, a sibling, a friend, a nephew) tells you they are transgender, and your first feeling is probably some version of this:
2. Before: Fourth, get help for your loved one—not conversion therapy, not ideology-driven affirmation, but actual psychological care:
   After: Fourth, get help for your loved one, not conversion therapy, not ideology-driven affirmation, but actual psychological care:
3. Before: He was critical of people's choices—the rich young ruler, the money changers in the temple, those who wanted to stone the woman caught in adultery—but He did it while holding their dignity intact.
   After: He was critical of people's choices (the rich young ruler, the money changers in the temple, those who wanted to stone the woman caught in adultery), but He did it while holding their dignity intact.
4. Before: You have spent years understanding that person as one thing—sister, brother, parent, child—and now they are asking you to understand something different; and if you hold deep convictions about what sex and gender mean, you are being asked to choose between your love for the person and your belief about reality.
   After: You have spent years understanding that person as one thing (sister, brother, parent, child) and now they are asking you to understand something different; and if you hold deep convictions about what sex and gender mean, you are being asked to choose between your love for the person and your belief about reality.
5. Before: But some families discover that love is more durable than disagreement—and that showing up year after year in the face of deep conviction holds a power that force never could.
   After: But some families discover that love is more durable than disagreement, and that showing up year after year in the face of deep conviction holds a power that force never could.


## Chapter 12: A CHURCH THAT HOLDS THE TRUTH AND WEEPS WITH THOSE WHO WEEP (`sec13.xhtml`)

Words 3,671 to 3,671. Em-dashes in his prose 40 to 0 (10.9 to 0.0 per 1,000 words). Tells 117 to 77 (31.9 to 21.0 per 1,000). Mean sentence 26.3 words to 26.3; sentences of eight words or fewer 21.5% to 21.5%; of five or fewer 9.2% to 9.2%. 25 edits; paragraphs 33 to 33. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 40 to 0, not_but 27 to 27, not_just 1 to 1, NotX.Y 1 to 1, triplet 22 to 22, anaphora 14 to 14, stock 1 to 1, intens 2 to 2, q_answered 1 to 1, colon_reveal 2 to 2, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 14 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 29 number words, proper names by count, and 87 hedge words (after: 87) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: In the pulpit, the gospel is preached clearly and biblical truth about the body, about sexual difference, about what it means to be made in God's image is taught without apology — but it is taught as good news rather than condemnation, in a way that creates space for people who do not fit the pattern to know they still belong.
   After: In the pulpit, the gospel is preached clearly and biblical truth about the body, about sexual difference, about what it means to be made in God's image is taught without apology, but it is taught as good news rather than condemnation, in a way that creates space for people who do not fit the pattern to know they still belong.
2. Before: The church should not make people choose between their faith and their confusion, should not say, "You have to figure out your gender before you can be part of us," and should not abandon people into the ideology that will promise the certainty the church cannot deliver — it should stay in the relationship.
   After: The church should not make people choose between their faith and their confusion, should not say, "You have to figure out your gender before you can be part of us," and should not abandon people into the ideology that will promise the certainty the church cannot deliver; it should stay in the relationship.
3. Before: if someone transitions or makes choices the church does not affirm and chooses to leave, the response is not to let them disappear silently but to have a conversation — "We love you, we still believe what we believe, the door is open, you matter.
   After: if someone transitions or makes choices the church does not affirm and chooses to leave, the response is not to let them disappear silently but to have a conversation: "We love you, we still believe what we believe, the door is open, you matter.
4. Before: Second, clarity about what the church believes about bodies — not in a way that seems dismissive of their suffering, but clearly:
   After: Second, clarity about what the church believes about bodies, not in a way that seems dismissive of their suffering, but clearly:
5. Before: And it has to believe that the gospel is enough, that Christ is enough, that we do not need culture-war strategies — we need Christ.
   After: And it has to believe that the gospel is enough, that Christ is enough, that we do not need culture-war strategies; we need Christ.


## Conclusion: IMAGE-BEARERS FIRST (`sec14.xhtml`)

Words 3,049 to 3,049. Em-dashes in his prose 30 to 0 (9.8 to 0.0 per 1,000 words). Tells 108 to 78 (35.4 to 25.6 per 1,000). Mean sentence 19.6 words to 20.0; sentences of eight words or fewer 27.9% to 25.7%; of five or fewer 17.7% to 16.0%. 23 edits; paragraphs 29 to 29. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 2 to 1.

By kind (before to after): emdash 30 to 0, not_but 19 to 19, NotX.Y 3 to 3, isnt_its 1 to 1, triplet 18 to 19, frag3 2 to 1, anaphora 14 to 13, stock 4 to 4, intens 1 to 1, q_answered 3 to 3, colon_reveal 3 to 4, short_close 9 to 9, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 10 quoted strings, 2 Scripture references, 0 years, 1 numbers in digits, 19 number words, proper names by count, and 61 hedge words (after: 61) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Every person you know who is struggling with gender; every person questioning their identity; every person in dysphoria, in confusion, in pain about their body; every person you are tempted to reduce to a position in a culture war — image-bearer first.
   After: Every person you know who is struggling with gender; every person questioning their identity; every person in dysphoria, in confusion, in pain about their body; every person you are tempted to reduce to a position in a culture war: image-bearer first.
2. Before: You are made in God's image, and that is your foundation — not your body, not your identity as you experience it, but the simple fact of bearing God's image, which gives you worth that is permanent and not dependent on fitting any category or understanding yourself in any particular way.
   After: You are made in God's image, and that is your foundation, not your body, not your identity as you experience it, but the simple fact of bearing God's image, which gives you worth that is permanent and not dependent on fitting any category or understanding yourself in any particular way.
3. Before: The church should offer this perspective — not to dismiss present suffering but to contextualize it.
   After: The church should offer this perspective, not to dismiss present suffering but to contextualize it.
4. Before: If the church is going to offer something the world cannot, it must become a place where people in confusion are safe — not safe from truth, but safe from mockery, safe from abandonment, safe from being reduced to a position.
   After: If the church is going to offer something the world cannot, it must become a place where people in confusion are safe, not safe from truth, but safe from mockery, safe from abandonment, safe from being reduced to a position.
5. Before: That is what the church can become — if we are willing to do the work, to love like Jesus loved:
   After: That is what the church can become, if we are willing to do the work, to love like Jesus loved:

## The whole book

Thirteen of the fourteen files were edited (chapter 1 has no long dash in its running prose). In his running prose: 47,657 words before and after; em-dashes 459 before, 7 after (9.6 to 0.1 per 1,000 words; his limit is 4 to 6); paragraphs unchanged in number. The fact diff passed on all thirteen. (The tell counter in the table blanks quotations before it counts, so its "after" column shows 2.)

**Every edit is punctuation.** Each recasts a dash as a comma, a colon, a semicolon or brackets, or joins fragments. No word was added, removed or replaced. One fragment stack was joined: "Choose wisely, because the stakes are souls. Real people. Real confusion. Real suffering." is "... because the stakes are souls: real people, real confusion, real suffering." (conclusion).

**The seven dashes that stay.** Five are inside quotations (the Cass Review in chapter 2, the Berry passage in chapter 3, the words offered to a parent in chapter 11 and to a church in chapter 12). Two set an answer after a question in chapter 9 ("What is your biological sex? — complicated in intersex conditions. What is your gender identity? — complicated in transgender experience."), where neither a comma nor a colon can follow a question mark.

**Left alone, and why.** "The body is raised. Not escaped. Transformed." (chapter 3) and "Not ideology. Not dismissal. Belonging with honesty." (chapter 7) are verdicts that could only be joined by adding words. "Stay involved. Stay loving. Stay engaged." (chapter 6) are imperatives.

**A second look (2026-11-26).** After the first pass, every place where the rule had closed brackets straight onto "but", "so" or "yet" beginning a new clause was found by search and given its comma ("), but"); one commit, the fact diff passing again.

**Forbidden Language list.** None of the listed words is in his prose.

## Whole read (2026-11-26)

The first pass, recorded above, recast every dash by a fixed rule and judged each proposal in its own sentence. This second pass read every chapter whole, as the first four books were read, in the text as the rule left it, with each place the rule had changed marked in the reading copy. The edits are punctuation and capital letters only: no word was added, removed or replaced. The fact diff (`/home/user/vb/factdiff.py`, against the typesetter's original text, 69441465) now also holds the book's words equal to the original's, counted as a list, and it passes on all fourteen files.

**On a contested subject.** Every account of the theological position, the medical evidence, the affirming and the conservative views, every concession, every confession of the church's harm and every pastoral line keeps its words. Where the book sets the two sides in parallel, both took the same change or neither did:

- the two ideologies of chapter 10 ("affirm their transgender identity and everything will be fine: that is false"; "your dysphoria will disappear: that is also false");
- the two churches of chapter 7, one "abandoning conviction:" and one "abandoning compassion:";
- the two refusals of the conclusion ("… your body is secondary": that is Gnosticism …"; "… you need to stop": that is the failure of compassion").

Chapter 5's paired accounts of the progressive and the conservative overreach took no edit. Nothing in the sentences about suicide or the deaths of young people was touched. Chapter 1 took no edit.

What the whole read changed, in 85 edits:

- **A comma the rule used before a gloss or a list, where it read as a run-on.** It is now a colon. The commonest case is the book's own pattern "X, not Y, but Z" after a noun ("Third, they need actual therapy: not affirmative therapy …"; "This is what mercy sometimes looks like: not affirmation of every choice …").
- **A comma that ran two sentences together.** It is now a semicolon ("Freedom is not always getting what you want; sometimes it is learning to surrender").
- **A semicolon before a gloss.** It is now a colon ("the meaning is unmistakable: you do not belong here").
- **A closing bracket that needed a comma after it** (chapters 3, 9, 10 and 11).

Five pairs:

1. Chapter 5. Before: "Freedom is not always getting what you want, sometimes it is learning to surrender, to accept, to find peace with reality as it is." After: "Freedom is not always getting what you want; sometimes it is learning to surrender, …"
2. Chapter 6. Before: "Third, they need actual therapy, not affirmative therapy that quickly endorses whatever gender the young person expresses, but exploratory therapy …" After: "Third, they need actual therapy: not affirmative therapy …"
3. Chapter 10. Before: "Not the ideology that says affirm their transgender identity and everything will be fine, that is false; … And not the ideology that says just accept your biological sex and your dysphoria will disappear, that is also false; …" After: "… everything will be fine: that is false; … your dysphoria will disappear: that is also false; …"
4. Chapter 11. Before: "This chapter is for that moment, not to hand you easy answers, but to give you a way of thinking …" After: "This chapter is for that moment: not to hand you easy answers, …"
5. Conclusion. Before: "your sexuality does not define you, who you are in Christ is what is ultimate." After: "your sexuality does not define you; who you are in Christ is what is ultimate."

The counts below are for his running prose, the rule-pass text against the text now. Semicolons, colons and brackets are counted outside quotations.

| Chapter | Words | Edits | Semicolons | Colons | Brackets | Fact diff |
|---|---|---|---|---|---|---|
| THE QUESTION NOBODY PREPARED THE CHURCH TO ANSWER | 1,533 | 5 | 9 → 7 | 15 → 20 | 3 → 3 | PASS |
| MALE AND FEMALE HE CREATED THEM | 4,010 | 0 | 41 → 41 | 42 → 42 | 0 → 0 | PASS |
| WHAT IS GENDER DYSPHORIA? | 4,298 | 5 | 75 → 72 | 22 → 27 | 12 → 12 | PASS |
| THE BODY MATTERS | 3,795 | 10 | 45 → 43 | 23 → 29 | 6 → 6 | PASS |
| EUNUCHS IN THE BIBLE | 3,002 | 1 | 39 → 38 | 25 → 26 | 5 → 5 | PASS |
| THE GENDER IDEOLOGY DEBATE | 3,650 | 2 | 32 → 33 | 37 → 38 | 11 → 11 | PASS |
| CHILDREN, PUBERTY BLOCKERS, AND THE CHURCH'S RESPONSIBILITY | 4,205 | 11 | 37 → 40 | 35 → 42 | 5 → 5 | PASS |
| PRONOUNS, BATHROOMS, AND THE DAILY QUESTIONS | 3,967 | 7 | 47 → 47 | 30 → 35 | 5 → 5 | PASS |
| HOW THE CHURCH HAS HARMED TRANSGENDER PEOPLE | 2,512 | 4 | 18 → 15 | 29 → 33 | 1 → 1 | PASS |
| Intersex Conditions and the Binary Question | 2,952 | 3 | 25 → 24 | 21 → 22 | 11 → 11 | PASS |
| TRANSGENDER PEOPLE IN YOUR CHURCH | 3,646 | 5 | 59 → 61 | 35 → 37 | 1 → 1 | PASS |
| WHAT TO SAY WHEN SOMEONE YOU LOVE SAYS THEY'RE TRANSGENDER | 3,367 | 14 | 36 → 33 | 26 → 38 | 5 → 5 | PASS |
| A CHURCH THAT HOLDS THE TRUTH AND WEEPS WITH THOSE WHO WEEP | 3,671 | 7 | 13 → 13 | 22 → 29 | 4 → 4 | PASS |
| IMAGE-BEARERS FIRST | 3,049 | 11 | 20 → 18 | 23 → 33 | 2 → 2 | PASS |
| **All 14** | 47,657 | 85 | 496 → 485 | 385 → 451 | 71 → 71 | |

The files were rebuilt with `node scripts/build-book-files.mjs bible-and-transgender-identity --verify`. It passed: the EPUB holds 49,255 words, word for word the source, and the PDF's 246,029 body characters on its pages are exactly the source's. The page count is unchanged at 181 (`client/src/data/ebooks.ts` needs no change). Page 46 of the PDF, where chapter 3's "even more demanding: we will have bodies forever" falls, was rendered and looked at.

Noticed in the whole read and not changed; add them to the list below:

- The conclusion's section "The Monster Is Never in the Mirror" quotes "The book within this book, "The Monster in the Mirror"". That book is now Blind Spots (James, 2026-11-22), and "the book within this book" needs his word on what it means.
- The introduction names a congregant ("Her name is Rachel. She was at FBC last Sunday …") and describes her daughter. Like item 7, this is for him to decide; if Rachel is a real person, her consent is needed.

## For James: things that look wrong, none of them changed

The chapters were not read whole for this list. It comes from reading the block quotations and the quoted sources, and searching for statements of his ministry, statistics and studies. On this subject a reader will check every figure.

1. ★ **Years in ministry.** "after two decades of pastoral ministry" (introduction). The site says 16 years as a pastor.
2. ★ **The Cass Review quotations** (chapter 2: "The evidence for the dramatic increase in numbers of children presenting with gender dysphoria is unclear. Many of these young people have other vulnerabilities ..."; "The evidence that the numbers of yo[ung people] ..."; "Many of these young people have other vulnerabilities that are not being adequately re[cognised]") are given as Cass's words. I could not confirm them as verbatim from the final report (April 2024); the two versions of the "vulnerabilities" sentence in the same chapter differ from each other, so at least one is not verbatim.
3. ★ "In 2009, the NHS in the UK received approximately 77 new referrals to gender identity clinics; in 2021, the number was 3,359, roughly a 4,300 percent increase in twelve years." The published figures for the children's service (GIDS) are 77 in 2009-10, about 2,500 in 2017-18 and about 5,000 in 2021-22; 3,359 needs its source and its year.
4. "Sweden, in 2023, made a similar move" and "Sweden's national health board, in 2023, published ...": the National Board of Health and Welfare's updated guidance was published in February 2022.
5. "Berry writes: "The body, as commonly understood, is merely the meat ..."" (chapter 3). Which Berry (Wendell Berry?) and which work is not said; the quotation needs its source and a check that it is verbatim.
6. Detransition and regret figures ("one to eight percent", "eight to forty percent", chapter 6) and "approximately twenty percent of Gen Z" are given without sources; the ranges are wide enough that each needs its study named.
7. "At First Baptist Church of Fenton, this is beginning. We have young people who experience gender dysphoria ..." (chapter 12) names his own church and its young people in a book anyone can download. Listed so that he can decide whether he wants that sentence public.
8. **A path to help.** The book speaks of suicide among transgender youth (introduction, chapters 2, 5 and 8) but gives no line to a crisis service. Whether the book should carry one (for example the 988 Suicide & Crisis Lifeline) is his decision; nothing was added.
9. The copyright line reads "James C. Bell" in both originals and the new files.

## Questions only James can answer

1. Two decades, or 16 years?
2. Should the Cass quotations be checked against the report and corrected, or paraphrased and marked as paraphrase?
3. Keep the sentence about First Baptist Church of Fenton's young people?
4. Add a crisis line where the book speaks of suicide?

## The files

Rebuilt after the last chapter: still 181 pages (`client/src/data/ebooks.ts` says 181), PDF 1.4 MB, EPUB 324 KB. `--verify`: the EPUB carries exactly the source folder's text with the listed typesetting (49,255 words compared, no difference); the PDF's pages carry the same text character for character (246,023 against 246,023).
