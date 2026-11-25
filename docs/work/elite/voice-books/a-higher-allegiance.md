# A Higher Allegiance: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the second book, A Higher Allegiance (id `when-god-bless-america`), edited in `content/books-src/when-god-bless-america/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The first book's record is `blind-spots.md`, beside this file; the method is the same.

## Method

This book's profile is the reverse of Blind Spots: few long dashes (about 1 per 1,000 words of his prose) but the most runs of very short sentences of any of his books, and many one-line paragraphs set in a row. So the work here was the fragment stacks. Each chapter was read whole. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff b25ce6a7 -- content/books-src/when-god-bless-america/` shows every change). One commit per chapter. After the edits the changed sentences were read again in place.

What an edit may be: a stack of fragments joined into a sentence with his own words and the fewest joining words ("and", "but", a comma, a colon before a real list); a run of one-line paragraphs joined into one paragraph (no sentence moved out of order); a dash recast; a stock turn or filler intensifier removed; a word on CLAUDE.md's Forbidden Language list replaced with the plain word the sentence means. Nothing else: no sentence, fact, example or opinion was added, and none was taken out. A short sentence stays where it is a real verdict or hinge.

**Right and left.** This is the book on Christian nationalism, and CLAUDE.md's rule holds: the right and the left are measured with the same instrument. Where the book criticizes both in a pair, both halves took the same change or none. Where it states his position on a contested question, the sentence took nothing beyond punctuation.

Three scripts, kept outside the repo in `/home/user/vs2/` (`apply.py`, `factdiff.py`, `tells.py`):

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order: the title, the headings, the pull quote, every block quotation, and the whole end matter of each chapter (Key Takeaways, Reflection Questions, Practices, Sources & Notes), which the source holds as block quotations. The number of paragraphs may fall (a join) but not rise. Inside his prose it extracts every double-quoted string (a full stop or comma just inside the closing mark is set aside, so that a quoted phrase can sit in a list), every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count. It fails if any count differs. It also counts hedge words (probably, perhaps, may, might, could, some, many, most, often, sometimes, almost, largely, seems, whether and the rest) and fails if any falls or rises. Length may not move more than 5 percent. Where the name counter mistook an ordinary sentence-opening word for a name, the word is listed in that chapter's entry.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora runs (three sentences opening on the same word); stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on the Forbidden Language list. It is a heuristic. Joining three fragments into one sentence often makes a triplet or a "not X but Y" by the counter's lights, so those two counts rise where the stacks fall; read the totals as direction.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word (`docs/work/elite/bookshelf.md`, section 8).

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: Not Persecuted—Seduced | 1,758 | 1,734 | -1.4% | 3 (1.7) | 0 (0.0) | 89 (50.6) | 52 (30.0) | 25 | PASS |
| **All 1** | 1,758 | 1,734 | -1.4% | 3 (1.7) | 0 (0.0) | 89 (50.6) | 52 (30.0) | 25 | |

## Introduction: Not Persecuted—Seduced (`sec01.xhtml`)

Words 1,758 to 1,734. Em-dashes in his prose 3 to 0 (1.7 to 0.0 per 1,000 words). Tells 89 to 52 (50.6 to 30.0 per 1,000). Mean sentence 9.8 words to 12.3; sentences of eight words or fewer 57.9% to 43.6%; of five or fewer 33.7% to 19.3%. 25 edits; paragraphs 58 to 41. Paragraphs of fifteen words or fewer 14 to 3; runs of three fragments 6 to 0.

By kind (before to after): emdash 3 to 0, not_but 4 to 6, NotX.Y 4 to 3, isnt_its 1 to 1, triplet 9 to 14, frag3 6 to 0, anaphora 14 to 3, intens 9 to 8, colon_reveal 0 to 2, short_close 25 to 12, one_line_para 14 to 3.

Fact diff: **PASS**. Fixed blocks (headings, pull quote, block quotes, and the end matter: Key Takeaways, Reflection Questions, Practices, Sources & Notes) identical; 11 quoted strings, 1 Scripture references, 0 years, 0 numbers in digits, 17 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs:

1. Before: It forces a choice. It strips away ambiguity. It makes the church decide whether Jesus is worth losing everything for. Seduction does the opposite. Seduction confuses allegiance. Seduction tells you that you can keep Jesus and keep power, keep worship and keep control, keep the cross and keep the sword.
   After: It forces a choice, strips away ambiguity, and makes the church decide whether Jesus is worth losing everything for. Seduction does the opposite: it confuses allegiance. It tells you that you can keep Jesus and keep power, keep worship and keep control, keep the cross and keep the sword.
2. Before: They simply stopped believing He was enough. They kept Yahweh, but added chariots. They kept worship, but trusted Egypt. They kept the temple, but relied on treaties. That was the betrayal. Not rejection. Relocated trust.
   After: They simply stopped believing He was enough. They kept Yahweh but added chariots, kept worship but trusted Egypt, kept the temple but relied on treaties. That was the betrayal: not rejection but relocated trust.
3. Before: Fear does not patiently reason its way to conclusions. Fear does not wait for careful theological reflection.
   After: It does not patiently reason its way to conclusions or wait for careful theological reflection.
4. Before: It felt patriotic. It felt responsible. It felt necessary. And that is precisely what made it so dangerous.
   After: It felt patriotic, responsible, necessary. And that is what made it so dangerous.
5. Before: If your honest answer involves courts, legislatures, cultural influence, or political victory more than prayer, holiness, sacrificial love, and courageous witness, then this book is for you. Not because you are a bad person. But because you may have been seduced.
   After: If your honest answer involves courts, legislatures, cultural influence, or political victory more than prayer, holiness, sacrificial love, and courageous witness, then this book is for you, not because you are a bad person but because you may have been seduced.

Left alone, and why. "American Christianity is not being persecuted. It is being seduced." is the book's thesis and keeps its own paragraph. "Ten years ago we disagreed. Now we despise.", "They wanted a sword. He brought a towel." and "We distort Christ." are verdicts. "I am not writing as a political commentator. I am writing as a pastor." and the two sentences after it are his own account of himself and were not touched. Three stray dash-and-comma pairs ("That Hebrew word—zanah, is not polite.") were set with commas. One "precisely" went.
