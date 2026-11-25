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
| **All 3** | 9,890 | 9,890 | +0.0% | 127 (12.8) | 8 (0.8) | 276 (27.9) | 166 (16.8) | 96 | |

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
