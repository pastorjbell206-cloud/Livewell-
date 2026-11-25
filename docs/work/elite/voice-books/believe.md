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
| Chapter 8: What About People Who've Never Heard? | 2,701 | 2,701 | +0.0% | 35 (13.0) | 2 (0.7) | 68 (25.2) | 35 (13.0) | 24 | PASS |
| Chapter 9: Why Christianity and Not Other Religions? | 3,216 | 3,216 | +0.0% | 48 (14.9) | 3 (0.9) | 105 (32.6) | 61 (19.0) | 33 | PASS |
| Chapter 10: Why Atheism Can't Sustain the Human Heart | 3,877 | 3,877 | +0.0% | 54 (13.9) | 3 (0.8) | 101 (26.1) | 55 (14.2) | 38 | PASS |
| Chapter 11: Every Objection Answered | 5,236 | 5,236 | +0.0% | 71 (13.6) | 5 (1.0) | 154 (29.4) | 88 (16.8) | 47 | PASS |
| Chapter 12: What Does God Actually Want From You? | 2,347 | 2,347 | +0.0% | 39 (16.6) | 3 (1.3) | 81 (34.5) | 47 (20.0) | 27 | PASS |
| **All 13** | 43,575 | 43,575 | +0.0% | 589 (13.5) | 38 (0.9) | 1270 (29.1) | 745 (17.1) | 417 | |

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


## Chapter 8: What About People Who've Never Heard? (`sec09.xhtml`)

Words 2,701 to 2,701. Em-dashes in his prose 35 to 2 (13.0 to 0.7 per 1,000 words). Tells 68 to 35 (25.2 to 13.0 per 1,000). Mean sentence 30.0 words to 30.0; sentences of eight words or fewer 12.2% to 12.2%; of five or fewer 7.8% to 7.8%. 24 edits; paragraphs 29 to 29. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 35 to 2, not_but 10 to 10, not_just 2 to 2, NotX.Y 2 to 2, triplet 16 to 16, intens 2 to 2, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 15 Scripture references, 0 years, 16 numbers in digits, 26 number words, proper names by count, and 26 hedge words (after: 26) compared.

Five pairs:

1. Before: if the God of Christianity were running that game — staking eternal destiny on whether a missionary happened through a village before the villager died — he would not be worth worshiping, and the scenario feels unjust precisely because it would be unjust.
   After: if the God of Christianity were running that game (staking eternal destiny on whether a missionary happened through a village before the villager died), he would not be worth worshiping, and the scenario feels unjust precisely because it would be unjust.
2. Before: The Greek is graptos — written, inscribed — and the point is that the law of God was not only handed down at Sinai on tablets of stone but etched into the human conscience itself.
   After: The Greek is graptos (written, inscribed), and the point is that the law of God was not only handed down at Sinai on tablets of stone but etched into the human conscience itself.
3. Before: Ruth the Moabitess, from a nation under judgment, binds herself to Naomi's God — your people shall be my people, and your God my God — and enters the line of Christ.
   After: Ruth the Moabitess, from a nation under judgment, binds herself to Naomi's God (your people shall be my people, and your God my God) and enters the line of Christ.
4. Before: Paul's verdict on him is the foundation of the entire doctrine of justification — he believed God, and it was counted to him as righteousness — and so Abraham was justified by faith, the same faith by which every Christian is justified.
   After: Paul's verdict on him is the foundation of the entire doctrine of justification (he believed God, and it was counted to him as righteousness), and so Abraham was justified by faith, the same faith by which every Christian is justified.
5. Before: And whatever he does with the one who never heard, he does in light of the cross, which is not the answer for those with the gospel only but the payment for everyone whose faith — however dim, however limited — rests on the mercy of God alone.
   After: And whatever he does with the one who never heard, he does in light of the cross, which is not the answer for those with the gospel only but the payment for everyone whose faith, however dim, however limited, rests on the mercy of God alone.

Left alone, and why. The fate of those who never heard is a question faithful Christians answer differently, and this chapter is his answer. It took punctuation only: 24 dashes recast, no word changed. The objection is granted "its full force" in his words, and the two truths he holds together (Christ the only way; God just) are word for word, as are the limits he sets on his own view ("None of this proves that anyone is saved apart from Christ; the claim is the reverse."; "This is not universalism."; "That is not a loophole."). The case for missions keeps every step. Two dashes stay.


## Chapter 9: Why Christianity and Not Other Religions? (`sec10.xhtml`)

Words 3,216 to 3,216. Em-dashes in his prose 48 to 3 (14.9 to 0.9 per 1,000 words). Tells 105 to 61 (32.6 to 19.0 per 1,000). Mean sentence 31.2 words to 31.2; sentences of eight words or fewer 20.4% to 20.4%; of five or fewer 11.7% to 11.7%. 33 edits; paragraphs 35 to 35. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 48 to 3, not_but 18 to 18, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 20 to 21, intens 6 to 6, q_answered 1 to 1, colon_reveal 1 to 1, short_close 9 to 9.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 4 Scripture references, 0 years, 1 numbers in digits, 42 number words, proper names by count, and 48 hedge words (after: 48) compared.

Five pairs:

1. Before: Islam holds that God is one, unitary, and absolutely transcendent — he has no Son and took no flesh, but reveals his will through prophets, most perfectly Muhammad, and that will is recorded in the Quran — so that salvation is submission demonstrated through the Five Pillars, and the center of gravity is divine law. Hinduism holds that ultimate reality is Brahman, impersonal and one, though manifest in many gods for devotional purposes, and that the self is finally one with Brahman — tat tvam asi, that thou art — while the cycle of rebirth turns until one is liberated from the illusion of individual existence, so that the center of gravity is metaphysical unity beyond personality. Buddhism, at its philosophical core, denies a self at all, for the doctrine of anatta holds that what we call the self is a bundle of phenomena with no underlying substance, and nirvana is the blowing out of the illusion, the extinction of craving — the center of gravity being the dissolution of illusion. Judaism affirms one personal God who has entered history by choosing a people, Israel, through whom he will bless the world, so that the covenant, the Torah given at Sinai, and the Temple service are not preparatory for something else but the substance itself, and the Messiah, when he comes, will restore the Davidic kingdom and draw the nations to Zion — the center of gravity being covenant. Christianity holds that the one personal God of Israel has decisively revealed himself in Jesus of Nazareth — God incarnate, crucified and raised — through whom salvation comes to all who trust him, so that the center of gravity is the person of Christ.
   After: Islam holds that God is one, unitary, and absolutely transcendent: he has no Son and took no flesh, but reveals his will through prophets, most perfectly Muhammad, and that will is recorded in the Quran; so that salvation is submission demonstrated through the Five Pillars, and the center of gravity is divine law. Hinduism holds that ultimate reality is Brahman, impersonal and one, though manifest in many gods for devotional purposes, and that the self is finally one with Brahman (tat tvam asi, that thou art), while the cycle of rebirth turns until one is liberated from the illusion of individual existence, so that the center of gravity is metaphysical unity beyond personality. Buddhism, at its philosophical core, denies a self at all, for the doctrine of anatta holds that what we call the self is a bundle of phenomena with no underlying substance, and nirvana is the blowing out of the illusion, the extinction of craving, the center of gravity being the dissolution of illusion. Judaism affirms one personal God who has entered history by choosing a people, Israel, through whom he will bless the world, so that the covenant, the Torah given at Sinai, and the Temple service are not preparatory for something else but the substance itself, and the Messiah, when he comes, will restore the Davidic kingdom and draw the nations to Zion, the center of gravity being covenant. Christianity holds that the one personal God of Israel has decisively revealed himself in Jesus of Nazareth, God incarnate, crucified and raised, through whom salvation comes to all who trust him, so that the center of gravity is the person of Christ.
2. Before: It is interfaith dismissal — telling every tradition that what it actually teaches does not matter. John Hick, the most sophisticated pluralist theologian of the twentieth century, tried to dissolve those disagreements by distinguishing the noumenal — ultimate reality itself — from the phenomenal — the various religious experiences of it — arguing that the different religions are simply different phenomenal responses to the same noumenal Real.
   After: It is interfaith dismissal, telling every tradition that what it actually teaches does not matter. John Hick, the most sophisticated pluralist theologian of the twentieth century, tried to dissolve those disagreements by distinguishing the noumenal (ultimate reality itself) from the phenomenal (the various religious experiences of it), arguing that the different religions are simply different phenomenal responses to the same noumenal Real.
3. Before: Either the Real is in some respect personal, in which case the religions that make personal claims about it — Islam, Judaism, Christianity — are closer to truth than the ones that make impersonal claims; or the Real is impersonal, in which case the personal religions are further from truth than Buddhism and philosophical Hinduism.
   After: Either the Real is in some respect personal, in which case the religions that make personal claims about it (Islam, Judaism, Christianity) are closer to truth than the ones that make impersonal claims; or the Real is impersonal, in which case the personal religions are further from truth than Buddhism and philosophical Hinduism.
4. Before: The abolition of the Atlantic slave trade was led in the English-speaking world by Christians — Wilberforce and the Clapham Sect on explicitly Christian grounds, the Northern abolitionists driven by the argument from Genesis that every human bears the image of God — and the American civil rights movement was forged in Black churches under a Baptist minister, its speeches sermons and its theology Exodus and the universal brotherhood of the New Testament.
   After: The abolition of the Atlantic slave trade was led in the English-speaking world by Christians (Wilberforce and the Clapham Sect on explicitly Christian grounds, the Northern abolitionists driven by the argument from Genesis that every human bears the image of God), and the American civil rights movement was forged in Black churches under a Baptist minister, its speeches sermons and its theology Exodus and the universal brotherhood of the New Testament.
5. Before: Pilate asked the question every thoughtful pluralist is asking — What is truth? — and he asked it of the one person in the room who could have answered, for the answer was standing in front of him, bound, beaten, about to be crucified, and silent.
   After: Pilate asked the question every thoughtful pluralist is asking (What is truth?), and he asked it of the one person in the room who could have answered, for the answer was standing in front of him, bound, beaten, about to be crucified, and silent.

Left alone, and why. The chapter describes five faiths and secular spirituality one after another in the same form ("the center of gravity is ..."), and the six descriptions were given the same punctuation, so that none reads as more or less carefully put than he wrote it. Not one word of any description changed. Hick's pluralism is stated before it is answered, and the pluralist's case ("This sounds humble") is in his words. The admission "Christians have produced their own horrors and no honest account pretends otherwise" and "You may still reject it; that is your right." are untouched. The Lewis anecdote keeps its dashes, because the scholars' three questions sit inside them. "Everywhere else salvation is earned. Here it is given.", "It is more specific." and the last four imperatives are verdicts. Three dashes stay.


## Chapter 10: Why Atheism Can't Sustain the Human Heart (`sec11.xhtml`)

Words 3,877 to 3,877. Em-dashes in his prose 54 to 3 (13.9 to 0.8 per 1,000 words). Tells 101 to 55 (26.1 to 14.2 per 1,000). Mean sentence 27.7 words to 27.7; sentences of eight words or fewer 17.5% to 17.5%; of five or fewer 11.7% to 11.7%. 38 edits; paragraphs 45 to 45. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 54 to 3, not_but 16 to 16, isnt_its 2 to 2, triplet 15 to 18, anaphora 2 to 2, stock 1 to 1, intens 2 to 2, colon_reveal 1 to 3, short_close 7 to 7, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 7 quoted strings, 3 Scripture references, 1 years, 2 numbers in digits, 51 number words, proper names by count, and 38 hedge words (after: 38) compared.

Five pairs:

1. Before: Now live that — not theorize it, but live it — and the honest atheists who have tried report the same result:
   After: Now live that, not theorize it, but live it, and the honest atheists who have tried report the same result:
2. Before: The problem is not that the atheist cannot find meaning in daily life — of course he can, loving his children, enjoying a meal, pursuing his work — but that he cannot ground that meaning in anything beyond his own preferences.
   After: The problem is not that the atheist cannot find meaning in daily life (of course he can, loving his children, enjoying a meal, pursuing his work), but that he cannot ground that meaning in anything beyond his own preferences.
3. Before: On a strictly materialist view, love is a set of chemical reactions — dopamine, oxytocin, vasopressin — a useful illusion that prompted our ancestors to bond, mate, and raise offspring to reproductive age, the feeling being the hook that makes propagation happen.
   After: On a strictly materialist view, love is a set of chemical reactions (dopamine, oxytocin, vasopressin), a useful illusion that prompted our ancestors to bond, mate, and raise offspring to reproductive age, the feeling being the hook that makes propagation happen.
4. Before: The New Atheists — Dawkins, Dennett, Harris, Hitchens — wrote as though the question had been settled in favor of unbelief in the nineteenth century and they were merely announcing the verdict to the slow. That is not how the history reads, for the nineteenth-century thinkers who actually made the case — Feuerbach, Nietzsche, Marx, Freud — were more honest than their contemporary heirs:
   After: The New Atheists (Dawkins, Dennett, Harris, Hitchens) wrote as though the question had been settled in favor of unbelief in the nineteenth century and they were merely announcing the verdict to the slow. That is not how the history reads, for the nineteenth-century thinkers who actually made the case (Feuerbach, Nietzsche, Marx, Freud) were more honest than their contemporary heirs:
5. Before: One atheist argument, though, deserves to be named at full strength — the strongest one there is.
   After: One atheist argument, though, deserves to be named at full strength, the strongest one there is.

Left alone, and why. This is the chapter that gives the atheists their best lines, and none was touched: the Nietzsche, Camus, Russell, Sartre and Pascal quotations are identical, and the chapter's own summaries of them took punctuation only. The atheist's reply on morals ("I can be good without God ... In one sense this is true"), the tribute to Camus ("the most admirable of the atheists ... His honesty deserves honor") and above all the argument he names "at full strength", that religion follows geography, are word for word: "The argument is serious, and its force is real." So is his own hedge at the end ("That is not a proof. It is a verdict after an examination"; "You may land somewhere different from where this book lands"). "Vapor.", "It is a diagnosis." and "His world is too small." are verdicts. All 38 edits are dashes recast; no word changed. Three dashes stay.


## Chapter 11: Every Objection Answered (`sec12.xhtml`)

Words 5,236 to 5,236. Em-dashes in his prose 71 to 5 (13.6 to 1.0 per 1,000 words). Tells 154 to 88 (29.4 to 16.8 per 1,000). Mean sentence 29.6 words to 29.6; sentences of eight words or fewer 24.9% to 24.9%; of five or fewer 14.5% to 14.5%. 47 edits; paragraphs 63 to 63. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 71 to 5, not_but 26 to 25, NotX.Y 3 to 3, isnt_its 2 to 2, triplet 20 to 20, anaphora 10 to 10, stock 5 to 5, intens 6 to 6, colon_reveal 0 to 1, short_close 11 to 11.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 8 quoted strings, 13 Scripture references, 3 years, 11 numbers in digits, 65 number words, proper names by count, and 62 hedge words (after: 62) compared.

Five pairs:

1. Before: Worse for the objection, the violence done in Christianity's name was done in direct violation of its founder's teaching — Jesus told his followers to love their enemies, to bless those who curse them, to turn the other cheek, so that the Crusaders who killed Muslims, the inquisitors who tortured heretics, and the conquistadors who enslaved Indians each acted against the explicit instruction of Christ. The critique of Christendom's violence is itself a Christian critique, and it was Christians — Bartolomé de las Casas, Roger Williams, the Quakers, the abolitionists — who led the resistance to the worst of what was done in their own name. Christianity has been the source of the moral correction as well, generating the abolition of slavery, the end of colonialism, the civil rights movement, the resistance to totalitarianism, and the condemnation of anti-Semitism — and in almost every case these corrections came from within the tradition, from people applying the teaching of Jesus to the failures of Christians.
   After: Worse for the objection, the violence done in Christianity's name was done in direct violation of its founder's teaching: Jesus told his followers to love their enemies, to bless those who curse them, to turn the other cheek, so that the Crusaders who killed Muslims, the inquisitors who tortured heretics, and the conquistadors who enslaved Indians each acted against the explicit instruction of Christ. The critique of Christendom's violence is itself a Christian critique, and it was Christians (Bartolomé de las Casas, Roger Williams, the Quakers, the abolitionists) who led the resistance to the worst of what was done in their own name. Christianity has been the source of the moral correction as well, generating the abolition of slavery, the end of colonialism, the civil rights movement, the resistance to totalitarianism, and the condemnation of anti-Semitism, and in almost every case these corrections came from within the tradition, from people applying the teaching of Jesus to the failures of Christians.
2. Before: American slavery was a sin — a sin that violated the Bible, a sin that Christians had to be forced by other Christians to face — and when they finally faced it, the tools they used to dismantle it were the Bible's own.
   After: American slavery was a sin, a sin that violated the Bible, a sin that Christians had to be forced by other Christians to face, and when they finally faced it, the tools they used to dismantle it were the Bible's own.
3. Before: This is no defense of every sermon on purity ever preached — some of those sermons were shaming and did real harm — but the doctrine, rightly understood, is pro-body, pro-pleasure, pro-marriage, pro-joy, and the critics have spent their fire on a caricature.
   After: This is no defense of every sermon on purity ever preached (some of those sermons were shaming and did real harm), but the doctrine, rightly understood, is pro-body, pro-pleasure, pro-marriage, pro-joy, and the critics have spent their fire on a caricature.
4. Before: No — Christians defended slavery in the American South, justified colonialism, took part in pogroms and persecution, and these are real and belong to the record; but when Christians were on the wrong side, they were on the wrong side against their own tradition, and the correction came from within it.
   After: No: Christians defended slavery in the American South, justified colonialism, took part in pogroms and persecution, and these are real and belong to the record; but when Christians were on the wrong side, they were on the wrong side against their own tradition, and the correction came from within it.
5. Before: The person who, having considered the full case, concludes against Christianity has done so for some reason other than the evidence — a prior commitment, a relational wound, a cultural inheritance, a moral preference — something not empirical.
   After: The person who, having considered the full case, concludes against Christianity has done so for some reason other than the evidence: a prior commitment, a relational wound, a cultural inheritance, a moral preference, something not empirical.

Left alone, and why. The chapter's promise is to state each objection "in its strongest form", and each statement of an objection (violence, slavery, wishful thinking, repression, faith without evidence, miracles and Hume, free inquiry, regress, genocide, "wrong about slavery", prayer, hypocrisy, the unbearable loss) is word for word, with a bracket or comma for a dash at most. So are his concessions: "It is not unblemished.", "some of those sermons were shaming and did real harm", "Is that the whole story? No", and the fourth point on the conquest ("this is the honest part: features remain in these narratives that resist full comprehension, and there is no use pretending otherwise"). The section on the grieving reader ("This is the hardest, and it is not an argument. It is a wound.") keeps its short sentences and its "Go to the cross. Stand there."; nothing in it was made more confident. Huxley's and Nagel's quotations are identical. All 47 edits are dashes recast; no word changed. Five dashes stay.


## Chapter 12: What Does God Actually Want From You? (`sec13.xhtml`)

Words 2,347 to 2,347. Em-dashes in his prose 39 to 3 (16.6 to 1.3 per 1,000 words). Tells 81 to 47 (34.5 to 20.0 per 1,000). Mean sentence 26.1 words to 26.1; sentences of eight words or fewer 25.6% to 25.6%; of five or fewer 13.3% to 13.3%. 27 edits; paragraphs 28 to 28. Paragraphs of fifteen words or fewer 4 to 4; runs of three fragments 1 to 1.

By kind (before to after): emdash 39 to 3, not_but 6 to 6, not_just 2 to 2, NotX.Y 1 to 1, isnt_its 4 to 4, triplet 12 to 13, frag3 1 to 1, anaphora 4 to 4, stock 1 to 1, colon_reveal 1 to 2, short_close 6 to 6, one_line_para 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 8 Scripture references, 0 years, 6 numbers in digits, 31 number words, proper names by count, and 12 hedge words (after: 12) compared.

Five pairs:

1. Before: The Hebrew word at the center of Old Testament faith is aman — to be firm, to hold steady, to lean on — and it gives us the English word amen, so that to say amen is to say, I rest my weight here.
   After: The Hebrew word at the center of Old Testament faith is aman (to be firm, to hold steady, to lean on), and it gives us the English word amen, so that to say amen is to say, I rest my weight here.
2. Before: Whatever you have trusted to carry your identity — the work, the marriage, the moral record, the family name, the political tribe — you now hold for what it is and no more, because the center has moved to Christ.
   After: Whatever you have trusted to carry your identity (the work, the marriage, the moral record, the family name, the political tribe), you now hold for what it is and no more, because the center has moved to Christ.
3. Before: Deny is aparneomai — to disown, to say no to — and not the self as a unit, but the self as the one who runs the show.
   After: Deny is aparneomai (to disown, to say no to), and not the self as a unit, but the self as the one who runs the show.
4. Before: Holman Hunt painted it — Christ standing before an overgrown door with no handle on the outside, a door that opens only from within — and the detail was deliberate, because he does not break the door down.
   After: Holman Hunt painted it (Christ standing before an overgrown door with no handle on the outside, a door that opens only from within), and the detail was deliberate, because he does not break the door down.
5. Before: Talk to him — not to a pastor, not to a priest, to him — and tell him you are done running, or done earning, or done pretending you have it managed; tell him you believe he died for you and rose for you, and ask him to take everything you have been trying to manage yourself.
   After: Talk to him, not to a pastor, not to a priest, to him, and tell him you are done running, or done earning, or done pretending you have it managed; tell him you believe he died for you and rose for you, and ask him to take everything you have been trying to manage yourself.

Left alone, and why. This is the invitation, and its short sentences are doing what short sentences are for: "This last chapter is about the door.", "Same root. A change of form.", "Confess. Believe.", "You have to turn. You have to lean.", "He is waiting.", "The book is finished. The argument is made. The door is open." None was joined. The word for the reader who is not ready ("do not manufacture a conversion or pray words you do not mean") is exactly as he wrote it; nothing in the appeal was made more pressing. The pull quote stands. The Greek and Hebrew words and their glosses are unchanged; the glosses that sat between dashes now sit in brackets. All 27 edits are dashes recast; no word changed. Three dashes stay.

## The whole book

Thirteen chapter files were edited (the introduction and chapters 1 to 12). The four part pages hold a title and a line each and were not touched; the two appendices were not edited. In his running prose: 43,575 words before, 43,575 after; em-dashes 589 before, 38 after (13.5 to 0.9 per 1,000 words; his limit is 4 to 6); 539 paragraphs before and after. 417 edits. The fact diff passed on all thirteen.

**Every edit is punctuation.** All 417 recast a dash as a comma, a colon, a semicolon, brackets or a full stop. No word was added, removed or replaced: the word count is the same before and after in every chapter. In eight places a letter changed case because of the new punctuation. Three fragments now continue the sentence before them ("It is a mind. Personal, intelligent, powerful, moral." is "It is a mind: personal, intelligent, powerful, moral."; "Four tests. Transmission, archaeology, prophecy, honesty." is "Four tests: transmission, archaeology, prophecy, honesty."; "The resurrection is the best explanation. Not the only conceivable one, but ..." is "... the best explanation: not the only conceivable one, but ..."), and five clauses that followed a dash now open their own sentence ("... nothing more was owed. So when Jesus cried tetelestai ...").

**Why so little else.** Believe is written in a different register from the other two books: impersonal ("the reader", "the skeptic"), in long built sentences, with almost no fragment stacks (6 runs of three in the whole book) and almost no one-line paragraphs (11). It did not need joining. What made it read as machine-set was the dash, used some thirteen times in every thousand words as the standard join between clauses, and that is what was taken out. The short sentences that remain are verdicts at the end of an argument ("It is a witness to a Lawgiver."; "Tetelestai was not a lie."; "His world is too small."; "The door is open.").

**The skeptic's case.** Every statement of an objection, every steelman, and every quotation of an atheist is word for word: the multiverse, the telephone game, Ehrman, the five rival theories of the resurrection, the logical and evidential problems of evil, Ivan Karamazov, the three views of hell, Hick's pluralism, Nietzsche, Camus, Russell and Sartre, the argument from geography "at full strength", and the thirteen objections of chapter 11. Nothing was softened and nothing sharpened. Where two or more positions are set side by side (the three views of hell, the three views of creation, the six faiths of chapter 9) they took the same punctuation or none.

**Forbidden Language list.** None of the listed words is in his prose in this book, before or after.

**One thing the typesetter now does that is not an edit.** Three words in chapter 2 printed in the original as their codes ("Bo&#287;azk&#246;y", "L&#252;demann", "trustworthy&#8230;"), because the source escaped the character references twice. The typesetter sets the characters and counts them (3); the source files are unchanged.

## For James: things that look wrong, none of them changed

Believe makes more checkable claims than the other two books together, so this list is longer. Each item was left exactly as it stands. They were noticed in reading and were not checked against the sources, so each needs checking before it is corrected. The ones a hostile reviewer would find first are marked with a star.

1. Ch 1: the Hebrews 11:1 block quotation ("Faith is the substance of things hoped for, the evidence of things not seen") is the King James wording, not the ESV's ("the assurance of things hoped for, the conviction of things not seen"); the argument that follows depends on "substance".
2. Ch 1: Bill Gates is quoted as calling the genetic code "far, far more advanced than any software we have ever developed". The sentence in The Road Ahead is usually given as "DNA is like a computer program but far, far more advanced than any software ever created."
3. Ch 1: "Jean-Paul Sartre ... wrote that without God no finite point has meaning apart from an infinite reference point". This line is widely attributed to Sartre but I know of no place in his work where he says it.
4. Ch 1: Tertullian's "I believe because it is absurd" (in the skeptic's mouth) is a later paraphrase; Tertullian wrote "it is certain, because it is impossible".
5. Ch 1: Einstein's "greatest blunder" is usually reported (by Gamow) of the cosmological constant itself, not of his reluctance to accept an expanding universe; Hoyle said he did not coin "Big Bang" to mock it.
6. Ch 1: "the scholars at the Académie Française and the Royal Society": the scientific body in Paris was the Académie des sciences; the Académie Française is the body for the language.
7. Ch 2: three words in the original printed as their codes: "Bo&#287;azk&#246;y", "L&#252;demann" and "trustworthy&#8230;" (in the Ramsay quotation). The source escaped the character references twice. The typesetter now sets the characters (Boğazköy, Lüdemann, an ellipsis); this is counted as typesetting, not as an edit.
8. Ch 2: the manuscript counts for the classical authors (Plato 7, Aristotle 49, Caesar 10, Tacitus 20, Homer about 1,900) are the figures of older apologetics handbooks; current counts are higher for several of them, and a critic will say so.
9. Ch 2: "the textual agreement exceeds ninety-nine and a half percent" has no source.
10. ★ Ch 2: the Great Isaiah Scroll and the Masoretic text are called "essentially identical, word for word", "a preservation so exact it should have been scientifically impossible". The scroll has many hundreds of variants, most of them spelling; "word for word" overstates it.
11. ★ Ch 2: "The Hebrew word for that kind of keeping is natsach ... the very word Psalm 119 uses for God's preservation of his word." Psalm 119:89 uses natsab ("stands firm"); natsach has a different sense. The glossary repeats the claim.
12. Ch 2: "every time the critics have insisted the Bible had it wrong, the shovel has vindicated the text, and there has been no reverse case." Archaeologists dispute this (Jericho, Ai, the Exodus); it is stated without a hedge. Glueck as "the most influential American archaeologist of the twentieth century" would usually be said of Albright.
13. ★ Ch 2: Jesus's birth in Bethlehem is said to be attested by "the Roman tax registration under Quirinius". That census is itself a well-known difficulty in dating the birth; it does not attest it.
14. ★ Ch 2: "Micah wrote in the eighth century BC, Isaiah in the eighth, Daniel in the sixth". The sixth-century date of Daniel is the contested point (many scholars date it to the second century BC), and the chapter does not say so.
15. Ch 2: Sir Robert Anderson is called "a Scotland Yard inspector"; he was Assistant Commissioner.
16. Ch 2: Porphyry is listed among "the second-century opponents of Christianity"; he wrote in the late third century.
17. Ch 2: "taken up in chapter seven" (of suffering). Suffering is chapter five in this book; chapter seven is science.
18. Ch 2: "Paul invented the word [theopneustos]" and "a woman's testimony carried no weight in court" are both commonly said and both stronger than the evidence.
19. Ch 3: the Lewis block quotation from Mere Christianity leaves out part of the passage (between "the Devil of Hell" and "Let us not come") without an ellipsis, and Lewis wrote "But let us not come with any patronising nonsense".
20. Ch 3: "An atheist psychiatrist, writing on mental health, concluded that the whole of modern psychology amounts to an awkward and incomplete summation of the Sermon on the Mount." This is J. T. Fisher (A Few Buttons Missing, 1951), who is not named, and I know of no evidence that he was an atheist.
21. Ch 3: the name is "Gerd Ludemann" here and "Lüdemann" in chapter 2.
22. Ch 3: the Isaiah 53:5 block quotation joins the ESV's first half to the NIV's second ("The punishment that brought us peace was on him, and by his wounds we are healed").
23. Ch 4: Habermas's set of facts is said to be "conceded by more than ninety percent" of scholars, and the empty tomb is then counted as one of the five. Habermas himself puts acceptance of the empty tomb at about three quarters and keeps it apart from his core facts.
24. Ch 4: "Bereavement hallucinations ... occurring in something like ten to twenty percent of grieving people". Published studies report a good deal more than that; the figure needs a source.
25. ★ Ch 4: "Eleven of the Twelve met violent ends" and "The record of how they died is consistent across the earliest sources". The deaths of most of the Twelve rest on late and uneven tradition (Thomas "speared in India", for instance), and the list that follows has John exiled, not killed. A critic will press this, because the argument leans on it.
26. Ch 4: the 1 Corinthians 15:3-5 block quotation has "according to the Scriptures" twice where the ESV has "in accordance with the Scriptures".
27. Ch 4: "Children, have you caught anything?" (John 21:5) is not the ESV ("Children, do you have any fish?"); Matthew 11:28 is quoted in the NIV's wording ("all you who are weary and burdened"); Jesus's three replies to Peter are given as "Feed my sheep" each time (John has "Feed my lambs", "Tend my sheep", "Feed my sheep").
28. Ch 4: N. T. Wright's book is said to run "seven hundred and thirty-eight pages" (and Appendix A repeats it); the count depends on the edition.
29. Ch 5: Scripture in the NIV's wording under an ESV copyright line: James 1:2-4, Romans 5:3-5, Job 38:4, Romans 8:28, Romans 8:38-39 and Revelation 21:4.
30. ★ Ch 5: "Elie Wiesel ... wrote in Night that he had not lost faith in God, that he had moments of anger and protest, that sometimes he had been closer to God for that very reason". Those words are from his later writing and interviews, not from Night, which describes the opposite.
31. Ch 5: "C. S. Lewis compared the complaint to a reader scolding a novelist because a character did not get what she wanted on page fifty". I know of no such passage in Lewis.
32. Ch 5: Moltmann ("Jurgen" here, "Jürgen" in Appendix A) "came home to a ruined city and opened a Bible for the first time". By his own account he was given a Bible as a prisoner of war in Britain.
33. Ch 5: Mackie "later granted that the argument had been "blunted"": the quoted word needs its source.
34. Ch 5: Paul "writes on the road to a house arrest in Rome". Romans was written before his arrest, most likely from Corinth.
35. Ch 5: "the wolf will lie down with the lamb"; Isaiah 11:6 has the wolf dwelling with the lamb (the phrase is usually misquoted of the lion).
36. Ch 5: "No other religion has a suffering God" is a large claim stated without a hedge.
37. Ch 6: every Scripture quotation in this chapter but one is in the NIV's wording (2 Thessalonians 1:9, Matthew 25:46, Revelation 20:10, 1 Timothy 2:4, Colossians 1:20, Romans 8:1, John 19:30, Galatians 3:3, 2 Corinthians 5:21, Isaiah 53:4–5, 1 Corinthians 11:26, Ezekiel 33:11, 2 Peter 3:9, Revelation 3:20); Galatians 6:14 is marked KJV, the only translation the book names.
38. Ch 6: Gehenna as "the city dump, where Jerusalem's garbage was thrown and burned without ceasing". This comes from a medieval commentator and has no ancient evidence; many scholars now reject it.
39. ★ Ch 6: Isaiah 53 "was read every Sabbath in the synagogues for centuries before the servant came". It was not; the chapter is in fact absent from the synagogue's cycle of prophetic readings.
40. Ch 6: tetelestai as the word stamped on receipts for "paid in full" is a popular claim that specialists dispute.
41. Ch 6: "The doors of hell ... are locked from the inside" is given as a reading of The Great Divorce; Lewis's sentence ("locked on the inside") is in The Problem of Pain.
42. ★ Ch 7: "Cardinal Robert Bellarmine ... wrote to Galileo in 1615". Bellarmine's letter of April 1615 was written to Paolo Foscarini (and was meant for Galileo to see).
43. Ch 7: Max Planck is listed with Lord Kelvin as "both Christians too". Planck was a churchwarden but said late in life that he did not believe in a personal God.
44. Ch 7: Whitehead's "1925 Harvard lectures" were the Lowell Lectures, given in Boston while he taught at Harvard.
45. Ch 7: "one of the few instances in history where an institution publicly admitted a four-hundred-year-old mistake": 1633 to 1992 is 359 years.
46. Ch 7: "medieval Islam ... eventually subordinated science to religious authority in ways that foreclosed further development" is a contested summary stated as fact.
47. Ch 7: Romans 1:20 and Proverbs 25:2 are in the NIV's wording.
48. Ch 8: Romans 1:19-20, Luke 12:47-48, Hebrews 11:6, Genesis 18:25 and Deuteronomy 4:29 are in the NIV's wording; Romans 2:15-16 is the ESV's.
49. Ch 8: "the abolition of slavery, the elevation of women, the care of the poor, the founding of hospitals and universities, the moral architecture of human rights — these grew from Christian soil, not pagan" is a broad historical claim with no hedge and no source.
50. Ch 9: the story of C. S. Lewis arriving late at "an Oxford conference" and saying the unique thing was grace comes from Philip Yancey, who tells it of a British conference and without a source; it may be legend.
51. Ch 9: "Every other major religion is, at its core, a system of human effort", with Judaism summed up as "to keep the covenant" and Islam as "to submit to the law". A Jewish or Muslim reader would say that leaves out the mercy and grace their own traditions confess; by CLAUDE.md's standard a position should be stated in a form its holders would sign.
52. Ch 9: "Joseph Smith's golden plates, which no one else was permitted to examine". Latter-day Saints point to the eleven named witnesses who said they saw them.
53. Ch 9: the crucifixion "recorded by Roman, Jewish, and Greek historians": the Roman and Jewish sources are Tacitus and Josephus; which Greek historian is meant is not said.
54. Ch 9: Newbigin "spent forty years in India"; he went in 1936 and left in 1974.
55. Ch 9: Ephesians 2:8–9, Romans 3:23–24, Ezekiel 36:26, Acts 17:31, Galatians 3:28 and John 14:6 are in the NIV's wording.
56. Ch 10: the Nietzsche block quotation (The Gay Science, §125) leaves out a long stretch between "All of us are his murderers." and "This tremendous event" without an ellipsis.
57. Ch 10: Augustine is described as "the young man who slept with anyone who would have him, fathered a child he did not want". By the Confessions he lived for some fifteen years with one woman and loved their son Adeodatus; the description is harsher than the source.
58. ★ Ch 10: "Malcolm Muggeridge, who mocked Mother Teresa, then met her, then met Christ". Muggeridge did not mock her; he made the 1969 film and book that introduced her to the world, and was a skeptic of the church, not of her.
59. Ch 10: "those who move away usually do so because they found something wrong with a particular expression of it ... and mistook that expression for the whole." People who have left the faith would not sign that as their reason; it is not the strongest form of their case.
60. Ch 10: Ecclesiastes 12:13, 3:11 and 12:1 and Romans 13:13–14 are in the NIV's wording.
61. ★ Ch 11: "Copernicus had published forty years earlier without condemnation". Copernicus published in 1543, ninety years before Galileo's trial in 1633, and his book was put on the Index in 1616.
62. Ch 11: the block quotation "To whom then will you liken God, or what likeness compare with him?" is Isaiah 40:18, not 40:25 (the glossary gives 40:25 too).
63. Ch 11: Aldous Huxley is quoted as "not wanting the world to have meaning ... satisfactory reasons"; Ends and Means has "to have a meaning" and "satisfying reasons".
64. Ch 11: Hebrews 11:1 is again in the King James wording, and the argument turns on "evidence" (elenchos); Philemon 16 and "slave traders" (1 Timothy 1:10) are the NIV's.
65. Ch 11: the section headed "What About the Hypocrites in the Church?" opens "Yes. It is." The answer fits a different question (something like "Isn't the church full of hypocrites?"); the heading seems to have been changed after the paragraph was written.
66. Ch 11: "the most sexually satisfied and relationally stable adults in America are, by a wide margin, married religious couples", "sexual assault on a scale earlier generations never imagined" and "religious people give more to charity, volunteer more ..." are stated without sources.
67. ★ Ch 11: "The person who, having considered the full case, concludes against Christianity has done so for some reason other than the evidence". This is the one sentence in the book that tells the skeptic his disagreement cannot be honest. It sits against the introduction's promise ("Disagreement is welcome") and against chapter 10's close ("You may land somewhere different from where this book lands"), and against your own standard that the skeptic should be left able to disagree. It was not changed.
68. Ch 11: the body counts ("a hundred million", "perhaps two million", "fewer than five thousand") and "sixty-six books by forty authors across fifteen hundred years" are standard figures given without sources.
69. ★ Ch 12: "Luke 15 is the longest chapter in the Gospels". It is not (Luke 1 and Matthew 26 are far longer); perhaps "the best-loved" or "the longest run of parables" was meant.
70. Ch 12: "the love of God so loved the world that he gave" reads as a slip for "the love with which God so loved the world".
71. Ch 12: "This book named three readers at the start: the honest skeptic ..., the Christian whose faith has met real resistance, and the young person who had never heard Christianity stated ...". The introduction's third reader is "the searcher, who would claim neither skepticism nor belief", not a young person.
72. Ch 12: every Scripture quotation in the chapter is in the NIV's wording (Genesis 15:6, 2 Corinthians 5:21, Luke 15:20, Luke 9:23, 1 John 4:8, Romans 8:1-2, Revelation 3:20, Romans 10:9).
73. Appendix A: under "The Problem of Evil and Suffering: Best Books" four entries are run together in one paragraph with no space between them ("(Intro)Lewis, C. S. A Grief Observed."), as the original EPUB has it.
74. Appendix B: six glossary words are not used in the chapter the entry names, nor anywhere I could find in the book: tachlit and mataioo (chapter 10), ekenosen, kenosis and proskuneo (chapter 3), and metanoeō (chapter 12 has metanoia and metamorphoo). The other forty chapter references check. The glossary may have been made for a longer draft.
75. The whole book: the copyright page says Scripture is from the ESV unless noted, and only Galatians 6:14 (KJV) is noted. By my count the ESV is the wording in chapters 1 to 4 for the most part and the NIV's from chapter 5 on.

## Questions only James can answer

1. Which translation? The copyright page says ESV, and from chapter 5 on nearly every quotation is the NIV's. Either the quotations are brought to the ESV (a mechanical job, and Hebrews 11:1 would then need its argument looked at, since "substance" and "evidence" are the King James words the argument turns on), or the copyright page names the NIV.
2. Do you want the starred items corrected? Several are small (a date, a name, a reference); a few would mean rewriting a sentence of the argument (natsach, the Isaiah scroll "word for word", the apostles' deaths, Daniel's date).
3. Chapter 11 ends by saying that anyone who weighs the case and still says no "has done so for some reason other than the evidence". Do you want to keep that sentence? It is the one place the book tells the skeptic he cannot disagree honestly.
4. The original PDF had a dedication and four part pages that the original EPUB lacked, and the EPUB had two appendices the PDF lacked. The new files carry all of it. Is that what you want, and is the dedication ("For Susanna ... For five sons ... For the atheist I was ...") to stand as it is?
5. The glossary lists six words the book does not seem to use. Cut them, or is there text missing?
6. "What About the Hypocrites in the Church?" opens "Yes. It is." Which should change, the heading or the answer?
