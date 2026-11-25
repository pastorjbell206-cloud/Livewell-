# Believe: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the third book, Believe: The Rational Case for Christian Faith (id `believe`), edited in `content/books-src/believe/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (`docs/work/elite/bookshelf.md`, section 8, "Believe, brought into the typesetter"); every edit recorded here was made after that. The records of the first two books are `blind-spots.md` and `a-higher-allegiance.md`, beside this file; the method is the same.

## Method

Believe has the most long dashes of his books: 589 in the 43,575 words of his running prose in the introduction and twelve chapters, 13.5 per 1,000 words, against his limit of 2 to 3 per 500 (4 to 6 per 1,000). It has few fragment stacks and almost no one-line paragraphs. So the work here was the dashes. Each chapter was read whole. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff 628227f7 -- content/books-src/believe/` shows every change). One commit per chapter.

What an edit may be: an em-dash recast as a comma, a full stop, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into a sentence with his own words; a filler intensifier or stock turn removed. Nothing else: no sentence, fact, example or opinion was added, and none was taken out.

**This is apologetics, and the rule was stricter for it.** The book is dense with quotations, names, dates, numbers and scholars' positions, and it states the skeptic's case before answering it. A sentence that states an objection, a scholar's view or his own answer to a contested question took punctuation only. Nothing was done that would soften or sharpen an objection: where the book steel-mans the other side, the words are as he wrote them. A quotation or claim that looks wrong was listed for James, not corrected.

**The two appendices were not edited.** Appendix A (the reading list) and Appendix B (the glossary) are reference lists; the glossary's 46 dashes separate a word from its definition and are the form of a glossary entry.

Three scripts, kept outside the repo in `/home/user/vs3/` (`apply.py`, `factdiff.py`, `tells.py`):

- **Fact diff** (original chapter file against edited). Every block that is not his running prose (title, subtitle, headings, pull quote, block quotations and their references) must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string (a full stop or comma just inside the closing mark is set aside), every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count. It fails if any count differs. It also counts hedge words (probably, perhaps, may, might, could, some, many, most, often, sometimes, almost, largely, seems, whether and the rest) and fails if any falls or rises. Length may not move more than 5 percent. Where the name counter mistook an ordinary sentence-opening word for a name, the word is listed in that chapter's entry.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora runs; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact. A dash recast as a colon before a list raises the counter's "colon before a reveal" figure, so that count goes up where the dashes come down.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Case for a Reasonable Faith | 1,692 | 1,692 | +0.0% | 25 (14.8) | 2 (1.2) | 53 (31.3) | 31 (18.3) | 18 | PASS |
| Chapter 1: Why Is There Something Rather Than Nothing? | 4,582 | 4,582 | +0.0% | 44 (9.6) | 4 (0.9) | 116 (25.3) | 79 (17.2) | 37 | PASS |
| Chapter 2: Can We Actually Trust the Bible? | 3,616 | 3,616 | +0.0% | 58 (16.0) | 2 (0.6) | 107 (29.6) | 56 (15.5) | 41 | PASS |
| Chapter 3: Who Did Jesus Think He Was? | 3,329 | 3,329 | +0.0% | 55 (16.5) | 3 (0.9) | 104 (31.2) | 55 (16.5) | 40 | PASS |
| Chapter 4: Did Jesus Really Rise from the Dead? | 3,577 | 3,577 | +0.0% | 34 (9.5) | 3 (0.8) | 96 (26.8) | 67 (18.7) | 24 | PASS |
| Chapter 5: If God Is Good, Why Is There So Much Suffering? | 3,640 | 3,640 | +0.0% | 38 (10.4) | 3 (0.8) | 104 (28.6) | 70 (19.2) | 28 | PASS |
| Chapter 6: How Could a Loving God Send People to Hell? | 3,493 | 3,493 | +0.0% | 62 (17.7) | 4 (1.1) | 118 (33.8) | 63 (18.0) | 40 | PASS |
| Chapter 7: Christianity and Science | 2,269 | 2,269 | +0.0% | 26 (11.5) | 1 (0.4) | 63 (27.8) | 38 (16.7) | 20 | PASS |
| **All 8** | 26,198 | 26,198 | +0.0% | 342 (13.1) | 22 (0.8) | 761 (29.0) | 459 (17.5) | 248 | |

## Introduction: The Case for a Reasonable Faith (`sec01.xhtml`)

Words 1,692 to 1,692. Em-dashes in his prose 25 to 2 (14.8 to 1.2 per 1,000 words). Tells 53 to 31 (31.3 to 18.3 per 1,000). Mean sentence 27.3 words to 26.9; sentences of eight words or fewer 19.4% to 19.0%; of five or fewer 14.5% to 14.3%. 18 edits; paragraphs 17 to 17. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 25 to 2, not_but 6 to 6, NotX.Y 2 to 2, triplet 10 to 10, frag3 1 to 1, anaphora 1 to 1, stock 1 to 1, intens 1 to 1, colon_reveal 4 to 5, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 0 numbers in digits, 30 number words, proper names by count, and 16 hedge words (after: 16) compared.

Five pairs:

1. Before: The strongest objections — suffering, hell, science, other religions, hiddenness, hypocrisy — have already been answered by better thinkers than most readers have yet met, and the answers hold; meanwhile a godless universe cannot sustain what the human heart insists on wanting, the meaning and hope and love and identity and justice, the stubborn sense that a life matters and that the people one loves are not merely matter in motion.
   After: The strongest objections (suffering, hell, science, other religions, hiddenness, hypocrisy) have already been answered by better thinkers than most readers have yet met, and the answers hold; meanwhile a godless universe cannot sustain what the human heart insists on wanting, the meaning and hope and love and identity and justice, the stubborn sense that a life matters and that the people one loves are not merely matter in motion.
2. Before: The first is the skeptic, told explicitly or otherwise that faith requires checking one's brain at the door — and right to have refused, because no reader here is asked to hold opinions at odds with the evidence; the aim is to show what the evidence actually is.
   After: The first is the skeptic, told explicitly or otherwise that faith requires checking one's brain at the door, and right to have refused, because no reader here is asked to hold opinions at odds with the evidence; the aim is to show what the evidence actually is.
3. Before: Part Three faces the hard questions, the ones that keep honest people awake at night and push honest people out of the church — suffering, hell, science, the people who never heard — and none of them is dodged; each meets the best answers the Christian tradition has produced alongside the best steel-manned version of the objection that can be written against it.
   After: Part Three faces the hard questions, the ones that keep honest people awake at night and push honest people out of the church (suffering, hell, science, the people who never heard), and none of them is dodged; each meets the best answers the Christian tradition has produced alongside the best steel-manned version of the objection that can be written against it.
4. Before: The atheist writers gathered here — Russell, Nietzsche, Camus, Sartre, Hitchens, Dawkins — are given their best arguments rather than their worst, quoted in context and never caricatured so that the Christian case might look stronger by comparison, because a case that needs that kind of help is not worth making.
   After: The atheist writers gathered here (Russell, Nietzsche, Camus, Sartre, Hitchens, Dawkins) are given their best arguments rather than their worst, quoted in context and never caricatured so that the Christian case might look stronger by comparison, because a case that needs that kind of help is not worth making.
5. Before: To the doubting Christian reading from inside the house rather than outside it — where the sermons stopped landing and the prayers felt like talking to the ceiling — one distinction is worth more than any reassurance:
   After: To the doubting Christian reading from inside the house rather than outside it, where the sermons stopped landing and the prayers felt like talking to the ceiling, one distinction is worth more than any reassurance:

Left alone, and why. "Christianity has answers. Atheism has attitudes." is the pull quote and stays in both places. "Not a feeling. Not a tradition. A case." is the verdict the second reader is promised. "Doubt is not the opposite of faith. Certainty is." and the last three sentences are verdicts. The promise to the skeptic and the list of what the reader is owed took punctuation only. Two dashes stay, each the turn of its sentence ("alive again — and on the strength of that testimony"; "buried those claims forever — and it did not").


## Chapter 1: Why Is There Something Rather Than Nothing? (`sec02.xhtml`)

Words 4,582 to 4,582. Em-dashes in his prose 44 to 4 (9.6 to 0.9 per 1,000 words). Tells 116 to 79 (25.3 to 17.2 per 1,000). Mean sentence 21.1 words to 21.0; sentences of eight words or fewer 32.7% to 32.6%; of five or fewer 20.1% to 19.1%. 37 edits; paragraphs 58 to 58. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 2 to 2.

By kind (before to after): emdash 44 to 4, not_but 13 to 13, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 2 to 2, triplet 18 to 20, frag3 2 to 2, anaphora 3 to 3, stock 5 to 5, intens 3 to 3, q_answered 1 to 1, colon_reveal 1 to 2, short_close 20 to 20, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 6 quoted strings, 4 Scripture references, 4 years, 9 numbers in digits, 98 number words, proper names by count, and 53 hedge words (after: 53) compared.

Five pairs:

1. Before: It is a mind. Personal, intelligent, powerful, moral.
   After: It is a mind: personal, intelligent, powerful, moral.
2. Before: The constants in the equations — the strength of gravity, the mass of the electron, the cosmological constant, the ratio of the electromagnetic force to gravity, and on it goes — could, as far as anyone knows, have taken any value at all; and shift them even slightly and life as we know it would be not merely difficult but impossible.
   After: The constants in the equations (the strength of gravity, the mass of the electron, the cosmological constant, the ratio of the electromagnetic force to gravity, and on it goes) could, as far as anyone knows, have taken any value at all; and shift them even slightly and life as we know it would be not merely difficult but impossible.
3. Before: A man does not call a line crooked unless he carries some idea of a straight one, and complaining about injustice requires a standard of justice — so where did that standard originate?
   After: A man does not call a line crooked unless he carries some idea of a straight one, and complaining about injustice requires a standard of justice. So where did that standard originate?
4. Before: Every atheistic regime — Stalin, Mao, Pol Pot — produced body counts that make the Spanish Inquisition look like a committee meeting.
   After: Every atheistic regime (Stalin, Mao, Pol Pot) produced body counts that make the Spanish Inquisition look like a committee meeting.
5. Before: And the thing they converge upon is not a force — a force does not begin to act in time, a force does not choose to design, a force is not a lawgiver.
   After: And the thing they converge upon is not a force: a force does not begin to act in time, a force does not choose to design, a force is not a lawgiver.

Left alone, and why. Every scientist's name, year and figure is as it was (the fact diff holds 1927, 1929, 1965, 2003 and the powers of ten by count). The skeptic's objections are in his words: the quantum objection, the multiverse ("The honest objection is the multiverse"), the young Lewis's argument from injustice ("The world is cruel. Children die. Evil flourishes."), and "Blind faith. A leap in the dark." Each took a comma for a dash at most. "It has been dodged. It has been reframed. It has not been answered." is his claim about the Kalam and stays as three sentences. "Every dial. At once. That is fine-tuning.", "He was reading his equations." and "It is a witness to a Lawgiver." are verdicts; the passage the pull quote condenses was not touched. Four dashes stay.


## Chapter 2: Can We Actually Trust the Bible? (`sec03.xhtml`)

Words 3,616 to 3,616. Em-dashes in his prose 58 to 2 (16.0 to 0.6 per 1,000 words). Tells 107 to 56 (29.6 to 15.5 per 1,000). Mean sentence 24.4 words to 24.6; sentences of eight words or fewer 31.8% to 31.3%; of five or fewer 16.2% to 15.0%. 41 edits; paragraphs 50 to 50. Paragraphs of fifteen words or fewer 2 to 2; runs of three fragments 0 to 0.

By kind (before to after): emdash 58 to 2, not_but 5 to 5, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 23 to 27, stock 3 to 3, intens 2 to 2, q_answered 1 to 1, colon_reveal 0 to 1, short_close 11 to 11, one_line_para 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 42 Scripture references, 3 years, 34 numbers in digits, 148 number words, proper names by count, and 45 hedge words (after: 45) compared.

Five pairs:

1. Before: They can grant a God who might speak, and they can grant that a God who speaks might leave a record; what they cannot grant is that this particular record — copied for centuries, translated from translations, contradictory in its details, assembled by a council — is the one.
   After: They can grant a God who might speak, and they can grant that a God who speaks might leave a record; what they cannot grant is that this particular record (copied for centuries, translated from translations, contradictory in its details, assembled by a council) is the one.
2. Before: The two texts were essentially identical, word for word, across more than a thousand years, the only differences being minor spelling variants and a few obvious copyist slips — a preservation so exact it should have been scientifically impossible. The Hebrew word for that kind of keeping is natsach — to preserve with faithful care, to guard, to maintain — the very word Psalm 119 uses for God's preservation of his word.
   After: The two texts were essentially identical, word for word, across more than a thousand years, the only differences being minor spelling variants and a few obvious copyist slips, a preservation so exact it should have been scientifically impossible. The Hebrew word for that kind of keeping is natsach (to preserve with faithful care, to guard, to maintain), the very word Psalm 119 uses for God's preservation of his word.
3. Before: Warner Wallace, a cold-case homicide detective turned apologist, has argued that the Gospels bear every mark of genuine eyewitness testimony, and the minor divergences — Matthew naming one angel at the tomb, John two; Matthew showing the women meeting the risen Jesus on the way back, Mark cutting off at the empty tomb — are precisely what investigators find in real cases.
   After: Warner Wallace, a cold-case homicide detective turned apologist, has argued that the Gospels bear every mark of genuine eyewitness testimony, and the minor divergences (Matthew naming one angel at the tomb, John two; Matthew showing the women meeting the risen Jesus on the way back, Mark cutting off at the empty tomb) are precisely what investigators find in real cases.
4. Before: He says there are hundreds of thousands of textual variants across the Greek manuscripts — true; he says many of them mark places where the reading is uncertain — also true; he says certain beloved passages, the ending of Mark and the woman caught in adultery in John 8, are almost certainly not original — true, and Christian scholars have said so for centuries.
   After: He says there are hundreds of thousands of textual variants across the Greek manuscripts, true; he says many of them mark places where the reading is uncertain, also true; he says certain beloved passages, the ending of Mark and the woman caught in adultery in John 8, are almost certainly not original, true, and Christian scholars have said so for centuries.
5. Before: Four tests. Transmission, archaeology, prophecy, honesty.
   After: Four tests: transmission, archaeology, prophecy, honesty.

Left alone, and why. The skeptic's bundle of objections, the telephone-game objection, the late-dating move and "The honest objection is that the specific events of Jesus's life have no independent record outside Christian documents" are in his words, with a bracket or comma for a dash. What Ehrman says and what he concedes took punctuation only, so that he is neither strengthened nor weakened. Every manuscript count, date and scholar's name is unchanged (the fact diff holds 42 references and every number word). "It is a fine story. It is also false.", "Jesus did not fulfill eight. He fulfilled more than three hundred." and "Not after Jesus. A century and a half before him." are verdicts. One stack was joined ("Four tests. Transmission, archaeology, prophecy, honesty."). Two dashes stay.


## Chapter 3: Who Did Jesus Think He Was? (`sec04.xhtml`)

Words 3,329 to 3,329. Em-dashes in his prose 55 to 3 (16.5 to 0.9 per 1,000 words). Tells 104 to 55 (31.2 to 16.5 per 1,000). Mean sentence 24.3 words to 24.3; sentences of eight words or fewer 27.0% to 27.0%; of five or fewer 8.0% to 8.0%. 40 edits; paragraphs 43 to 43. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 55 to 3, not_but 11 to 11, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 5 to 5, triplet 15 to 16, anaphora 3 to 3, stock 1 to 1, intens 2 to 2, colon_reveal 3 to 5, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 17 Scripture references, 0 years, 0 numbers in digits, 66 number words, proper names by count, and 38 hedge words (after: 38) compared.

Five pairs:

1. Before: The phrase — ego eimi — is the Greek Old Testament's rendering of the name God gave Moses at the burning bush, I am who I am, so that Jesus does not claim merely to predate Abraham but takes the unspeakable name of God onto his own lips.
   After: The phrase, ego eimi, is the Greek Old Testament's rendering of the name God gave Moses at the burning bush, I am who I am, so that Jesus does not claim merely to predate Abraham but takes the unspeakable name of God onto his own lips.
2. Before: There is a habit in popular preaching of dividing the names of Jesus into halves — Son of God for his deity, Son of Man for his humanity — and it is a tidy distinction that happens to be almost exactly backward, because the title Jesus used of himself more than any other was not a confession of his frailty but the boldest claim he ever made.
   After: There is a habit in popular preaching of dividing the names of Jesus into halves (Son of God for his deity, Son of Man for his humanity), and it is a tidy distinction that happens to be almost exactly backward, because the title Jesus used of himself more than any other was not a confession of his frailty but the boldest claim he ever made.
3. Before: The radiance of the glory of God — not a reflection of it but the shining-out of the thing itself. The exact imprint of his nature — the very stamp of what God is. He upholds the universe by the word of his power — so that holding all things in being is not a feat he performs but the ordinary exercise of who he is.
   After: The radiance of the glory of God: not a reflection of it but the shining-out of the thing itself. The exact imprint of his nature: the very stamp of what God is. He upholds the universe by the word of his power, so that holding all things in being is not a feat he performs but the ordinary exercise of who he is.
4. Before: Madness leaves fingerprints — incoherence, grandiosity cut loose from reality, a self coming apart at the edges — and the Gospels record the opposite:
   After: Madness leaves fingerprints (incoherence, grandiosity cut loose from reality, a self coming apart at the edges), and the Gospels record the opposite:
5. Before: The third party — the admirers who keep the teaching and discard the teacher — was never in the room.
   After: The third party, the admirers who keep the teaching and discard the teacher, was never in the room.

Left alone, and why. All 40 edits are dashes recast; no word changed. The Lewis quotation and its dashes are untouched. The liar and lunatic options and "the modern escape", legend, are each stated before they are answered, and each is word for word. The verdict lines stay as he wrote them: "They were right about what he was saying. They were wrong only about what to do with it.", "That is not the timescale of legend. It is the timescale of memory.", the four-sentence summation ("The claims are explicit. The mind behind them is sound. ...") and "He did not leave it open to them. He did not intend to.", which answers Lewis. Three dashes stay.


## Chapter 4: Did Jesus Really Rise from the Dead? (`sec05.xhtml`)

Words 3,577 to 3,577. Em-dashes in his prose 34 to 3 (9.5 to 0.8 per 1,000 words). Tells 96 to 67 (26.8 to 18.7 per 1,000). Mean sentence 24.2 words to 24.4; sentences of eight words or fewer 26.5% to 26.0%; of five or fewer 17.0% to 17.1%. 24 edits; paragraphs 45 to 45. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 34 to 3, not_but 7 to 7, NotX.Y 3 to 3, isnt_its 6 to 6, triplet 25 to 26, frag3 1 to 1, anaphora 3 to 3, stock 1 to 1, intens 3 to 3, colon_reveal 5 to 6, short_close 8 to 8.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 5 quoted strings, 32 Scripture references, 0 years, 17 numbers in digits, 95 number words, proper names by count, and 38 hedge words (after: 38) compared.

Five pairs:

1. Before: Working only from the minimal facts — the facts accepted by virtually all scholars, Christian and skeptic alike — it asks what best explains the evidence, examining and measuring every alternative in turn, and the verdict it reaches is the one it has always been. The resurrection is the best explanation. Not the only conceivable one, but the only one that does justice to all the evidence at once.
   After: Working only from the minimal facts, the facts accepted by virtually all scholars, Christian and skeptic alike, it asks what best explains the evidence, examining and measuring every alternative in turn, and the verdict it reaches is the one it has always been. The resurrection is the best explanation: not the only conceivable one, but the only one that does justice to all the evidence at once.
2. Before: The figure who staggered from that tomb — beaten, pierced, half dead, in desperate need of a physician — would not have convinced anyone that he was the triumphant Lord of life; he would have convinced them he needed a doctor, inspiring pity, not worship.
   After: The figure who staggered from that tomb, beaten, pierced, half dead, in desperate need of a physician, would not have convinced anyone that he was the triumphant Lord of life; he would have convinced them he needed a doctor, inspiring pity, not worship.
3. Before: People die for beliefs they hold to be true all the time — Muslims, Hindus, Mormons have done so for inherited convictions — but that proves sincerity, not truth.
   After: People die for beliefs they hold to be true all the time (Muslims, Hindus, Mormons have done so for inherited convictions), but that proves sincerity, not truth.
4. Before: Peter, who had denied him three times, has gone back to fishing — back to the old life — and the others are with him; they catch nothing all night, and at dawn a figure on the shore calls out.
   After: Peter, who had denied him three times, has gone back to fishing, back to the old life, and the others are with him; they catch nothing all night, and at dawn a figure on the shore calls out.
5. Before: If the resurrection happened, every claim Jesus made about himself is vindicated — the deity, the forgiveness, the authority, the promise of return — and all of it rides on that morning.
   After: If the resurrection happened, every claim Jesus made about himself is vindicated (the deity, the forgiveness, the authority, the promise of return), and all of it rides on that morning.

Left alone, and why. Each of the five alternative theories (hallucination, swoon, stolen body, legend, wrong tomb) is stated in its own terms before it is answered, and those statements are word for word; so is the caution that dying for a belief "proves sincerity, not truth". The claim itself is stated with its hedge intact and only a colon added ("The resurrection is the best explanation: not the only conceivable one, but the only one that does justice to all the evidence at once."). "Something changed.", "These do.", "Not spiritual. Not metaphorical. Bodily." and "He is risen. He is alive. He is at the door." are verdicts. Both pull quotes and the sentences near them are untouched. Three dashes stay.


## Chapter 5: If God Is Good, Why Is There So Much Suffering? (`sec06.xhtml`)

Words 3,640 to 3,640. Em-dashes in his prose 38 to 3 (10.4 to 0.8 per 1,000 words). Tells 104 to 70 (28.6 to 19.2 per 1,000). Mean sentence 23.8 words to 23.6; sentences of eight words or fewer 26.1% to 26.0%; of five or fewer 17.0% to 16.9%. 28 edits; paragraphs 44 to 44. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 38 to 3, not_but 19 to 19, NotX.Y 1 to 1, isnt_its 4 to 4, triplet 19 to 20, anaphora 2 to 2, stock 1 to 1, intens 8 to 8, colon_reveal 1 to 1, short_close 11 to 11.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 3 quoted strings, 17 Scripture references, 2 years, 3 numbers in digits, 41 number words, proper names by count, and 41 hedge words (after: 41) compared.

Five pairs:

1. Before: The logical problem, as it turns out, has a surprisingly strong reply — one largely conceded by professional philosophy — while the emotional problem has an answer of a different kind, and it is better than anything atheism can offer.
   After: The logical problem, as it turns out, has a surprisingly strong reply, one largely conceded by professional philosophy, while the emotional problem has an answer of a different kind, and it is better than anything atheism can offer.
2. Before: Ivan does not deny God; he grants God, and grants even the final harmony — the day when every tear is wiped away and every cruelty is somehow folded into a great cosmic resolution — and he simply refuses to attend.
   After: Ivan does not deny God; he grants God, and grants even the final harmony (the day when every tear is wiped away and every cruelty is somehow folded into a great cosmic resolution), and he simply refuses to attend.
3. Before: The book opens by telling the reader, in God's own voice, what it will never tell Job — that Job is righteous, and that his ruin is not punishment — and then, for reasons disclosed to the reader and forever withheld from the sufferer, everything is stripped away:
   After: The book opens by telling the reader, in God's own voice, what it will never tell Job (that Job is righteous, and that his ruin is not punishment), and then, for reasons disclosed to the reader and forever withheld from the sufferer, everything is stripped away:
4. Before: The free will defense reaches the evil that human freedom causes — the Holocaust, slavery, rape, war — because a world capable of real love must be a world capable of real hatred, and God has judged that love is worth the risk of its opposite.
   After: The free will defense reaches the evil that human freedom causes (the Holocaust, slavery, rape, war), because a world capable of real love must be a world capable of real hatred, and God has judged that love is worth the risk of its opposite.
5. Before: Paul writes the theology of joy from a prison cell, Peter writes to Christians under persecution, Revelation is composed in exile on Patmos, and the Psalms of lament — the raw, unanswered, fist-shaking ones — are the single largest category in the Psalter.
   After: Paul writes the theology of joy from a prison cell, Peter writes to Christians under persecution, Revelation is composed in exile on Patmos, and the Psalms of lament, the raw, unanswered, fist-shaking ones, are the single largest category in the Psalter.

Left alone, and why. This chapter states the hardest objection in the book and the rule was at its strictest here: all 28 edits are dashes recast, and no word changed. The chain of the logical problem, the evidential problem with its list of horrors, and above all Ivan Karamazov's rebellion ("the most humane objection to Christianity ever framed") are word for word; Ivan's paragraph took one pair of brackets. The admissions that the answer is incomplete also stay exactly: "It is no full answer to why children die", "No theodicy answers Ivan", "This is not the whole answer. The agony of a mother at a graveside is not met by a syllogism." The care for a reader in grief is untouched: nothing here was made brisker or more confident. "Not all new things. All things new." and the last five sentences are verdicts. Three dashes stay.


## Chapter 6: How Could a Loving God Send People to Hell? (`sec07.xhtml`)

Words 3,493 to 3,493. Em-dashes in his prose 62 to 4 (17.7 to 1.1 per 1,000 words). Tells 118 to 63 (33.8 to 18.0 per 1,000). Mean sentence 29.4 words to 29.1; sentences of eight words or fewer 21.0% to 20.8%; of five or fewer 14.3% to 14.2%. 40 edits; paragraphs 48 to 48. Paragraphs of fifteen words or fewer 2 to 2; runs of three fragments 1 to 1.

By kind (before to after): emdash 62 to 4, not_but 16 to 16, NotX.Y 2 to 2, isnt_its 2 to 2, triplet 21 to 23, frag3 1 to 1, anaphora 1 to 1, intens 3 to 3, colon_reveal 2 to 3, short_close 6 to 6, one_line_para 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 19 Scripture references, 0 years, 13 numbers in digits, 39 number words, proper names by count, and 35 hedge words (after: 35) compared.

Five pairs:

1. Before: The New Testament describes hell with several images that do not fit together literally — fire, outer darkness, weeping and gnashing of teeth, separation from the Lord — and they cannot all be literal at once, since fire is not dark, darkness is not fire, and worms do not thrive in flame.
   After: The New Testament describes hell with several images that do not fit together literally (fire, outer darkness, weeping and gnashing of teeth, separation from the Lord), and they cannot all be literal at once, since fire is not dark, darkness is not fire, and worms do not thrive in flame.
2. Before: The second is conditional immortality, or annihilationism — held by John Stott, F.
   After: The second is conditional immortality, or annihilationism (held by John Stott, F.
3. Before: These are the theories the critics most love to caricature — cosmic child abuse, as the phrase goes — but the caricature does not land, because penal substitution is not the Father abusing the Son but the triune God accepting the cost of human rebellion inside himself:
   After: These are the theories the critics most love to caricature (cosmic child abuse, as the phrase goes), but the caricature does not land, because penal substitution is not the Father abusing the Son but the triune God accepting the cost of human rebellion inside himself:
4. Before: The word is a commercial term that appears on ancient business receipts meaning paid in full — when a debt was settled, the creditor stamped the ledger with it, the account was closed, nothing more was owed — so when Jesus cried tetelestai, he was not announcing that his suffering was over but that the debt was paid. The ledger humanity had been running against the holiness of God — Adam's debt, Israel's debt, every reader's debt — was settled.
   After: The word is a commercial term that appears on ancient business receipts meaning paid in full: when a debt was settled, the creditor stamped the ledger with it, the account was closed, nothing more was owed. So when Jesus cried tetelestai, he was not announcing that his suffering was over but that the debt was paid. The ledger humanity had been running against the holiness of God (Adam's debt, Israel's debt, every reader's debt) was settled.
5. Before: Read it line by line against the Passion narratives — the silence before his accusers, the crushing, the numbering with transgressors, the grave assigned with the wicked and the burial with the rich, the justification of many by his knowledge — and these are not coincidences gathered after the fact.
   After: Read it line by line against the Passion narratives (the silence before his accusers, the crushing, the numbering with transgressors, the grave assigned with the wicked and the burial with the rich, the justification of many by his knowledge), and these are not coincidences gathered after the fact.

Left alone, and why. Hell is a contested doctrine, and the chapter does what CLAUDE.md asks of one: it states three positions, names who holds each, and says where he lands and with what reserve. So it took punctuation only (40 dashes recast, no word changed), and the three views were given the same treatment: each keeps its holders, its texts and its wording, and the two that named their holders between dashes now name them in brackets alike. The paragraph "Where, then, to stand." is his position and was not touched at all, dashes included ("it should be held with trembling, not triumph"). The four atonement theories each keep "this is true" and "but alone". The critics' phrase "cosmic child abuse" is as he gave it. "Tetelestai was not a lie.", "Not reduced. Not deferred. Settled." and the last three sentences are verdicts; both pull quotes stand. Four dashes stay.


## Chapter 7: Christianity and Science (`sec08.xhtml`)

Words 2,269 to 2,269. Em-dashes in his prose 26 to 1 (11.5 to 0.4 per 1,000 words). Tells 63 to 38 (27.8 to 16.7 per 1,000). Mean sentence 24.8 words to 24.8; sentences of eight words or fewer 22.0% to 22.0%; of five or fewer 11.0% to 11.0%. 20 edits; paragraphs 34 to 34. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 26 to 1, not_but 7 to 7, NotX.Y 1 to 1, isnt_its 3 to 3, triplet 15 to 15, anaphora 2 to 2, intens 1 to 1, short_close 7 to 7, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 6 quoted strings, 9 Scripture references, 6 years, 9 numbers in digits, 54 number words, proper names by count, and 23 hedge words (after: 23) compared.

Five pairs:

1. Before: Ronald Numbers — a distinguished historian at the University of Wisconsin, and no friend of fundamentalism — edited Galileo Goes to Jail and Other Myths about Science and Religion, which systematically takes apart the central stories the conflict thesis depends on; his colleague David Lindberg has written extensively on the cooperative relationship between medieval Christianity and the natural philosophy that became modern science; and John Hedley Brooke, formerly of Oxford, documented in Science and Religion:
   After: Ronald Numbers, a distinguished historian at the University of Wisconsin, and no friend of fundamentalism, edited Galileo Goes to Jail and Other Myths about Science and Religion, which systematically takes apart the central stories the conflict thesis depends on; his colleague David Lindberg has written extensively on the cooperative relationship between medieval Christianity and the natural philosophy that became modern science; and John Hedley Brooke, formerly of Oxford, documented in Science and Religion:
2. Before: In 1992, Pope John Paul II formally acknowledged that the church had been wrong in its handling of Galileo — one of the few instances in history where an institution publicly admitted a four-hundred-year-old mistake — and it is worth remembering that the very era in which Galileo was being disciplined produced Jesuit astronomers at the Roman College who confirmed his observations and were among the first to adopt heliocentric cosmology in their own work.
   After: In 1992, Pope John Paul II formally acknowledged that the church had been wrong in its handling of Galileo (one of the few instances in history where an institution publicly admitted a four-hundred-year-old mistake), and it is worth remembering that the very era in which Galileo was being disciplined produced Jesuit astronomers at the Roman College who confirmed his observations and were among the first to adopt heliocentric cosmology in their own work.
3. Before: The statement "only scientific claims are real knowledge" is not itself a scientific claim but a philosophical one — so that if it were true, it would be false, because its own claim to truth could not be verified by any experiment. Science answers "how" questions — how did the universe expand, how does DNA replicate, how do stars form — but it does not answer "why" questions.
   After: The statement "only scientific claims are real knowledge" is not itself a scientific claim but a philosophical one, so that if it were true, it would be false, because its own claim to truth could not be verified by any experiment. Science answers "how" questions (how did the universe expand, how does DNA replicate, how do stars form), but it does not answer "why" questions.
4. Before: Gould's formulation is overstated — the two domains do overlap in places, especially on whether the universe had a beginning — but his basic point holds, for science and religion are not asking the same questions.
   After: Gould's formulation is overstated (the two domains do overlap in places, especially on whether the universe had a beginning), but his basic point holds, for science and religion are not asking the same questions.
5. Before: They are two eyes seeing the same reality — close one and you lose depth, use both and the world becomes three-dimensional.
   After: They are two eyes seeing the same reality: close one and you lose depth, use both and the world becomes three-dimensional.

Left alone, and why. The three positions on creation (young-earth, old-earth, evolutionary creationism) are a second-order question, and the chapter states each in its own terms and declines to choose ("Which view to hold is not the point here"). Those four paragraphs were not touched at all. The popular Galileo story and the god-of-the-gaps objection are stated before they are answered, word for word. Every name, date and title in the history of the conflict thesis is unchanged. "There is one problem. It is not true.", "The problem is not the lake. It is the net." and "The warfare is a myth. The partnership is the reality." are verdicts. One dash stays.
