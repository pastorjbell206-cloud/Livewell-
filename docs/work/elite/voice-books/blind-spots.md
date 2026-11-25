# Blind Spots: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". This is the first book, Blind Spots (id `the-monster-in-the-mirror`), edited in `content/books-src/the-monster-in-the-mirror/` on branch elite/voice. Governing standards: his manuscript instructions (the lightest possible editorial touch; fragments are intentional), `docs/VOICE-JAMES-BELL.md`, then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`.

## Method

Each chapter was read whole. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (so the edit list is the whole record; `git diff f4b74050 -- content/books-src/the-monster-in-the-mirror/` shows every change). One commit per chapter. After the edits, the changed sentences were read again in place, and an edit that made a sentence worse or flatter was taken back.

What an edit may be: an em-dash recast as a comma, a full stop, a semicolon, a colon before a real list, or brackets; a two-step ("It is not X. It is Y.", "not X but Y") turned the plain way round where it was not the passage's hinge; a stock turn or filler intensifier removed; a contraction where the sentence was already spoken. Nothing else. No sentence was added, no paragraph joined or split, no fragment stack rebuilt.

Three scripts, kept outside the repo in `/home/user/voice-scratch/` (`apply.py`, `factdiff.py`, `tells.py`; the earlier runs' scripts were lost and these were written again):

- **Fact diff** (original chapter file against edited). Every block that is not his running prose (title, subtitle, eyebrow, headings, pull quote, part page, block quotes and their references) must be identical and in the same order, and the number of paragraphs must not change. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word (two through ninety, hundred, thousand, first, second, half, twice, both, century, generation and the rest), and every proper name by count (a word is a name if the chapter capitalizes it inside a sentence more often than it writes it small, or never writes it small). It fails if any count differs. It also counts hedge words (probably, perhaps, may, might, could, some, many, most, often, sometimes, almost, largely, seems, whether and the rest) and fails if any falls or rises. Where the name counter mistook an ordinary sentence-opening word for a name, the word is listed in that chapter's entry; nothing else was allowed.
- **Tell counter** (his prose only, quotations blanked). Em-dashes; "not X but Y"; "not just X but Y"; "Not X. Y."; "isn't X, it's Y"; triplets; runs of three fragments; anaphora runs (three sentences opening on the same word); stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic: the triplet, anaphora and short-close counts include real lists and his deliberate refrains, so read the totals as direction, not a grade. The em-dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word (see `docs/work/elite/bookshelf.md` section 8).

His limit for em-dashes is 2 to 3 per 500 words, which is 4 to 6 per 1,000. Headings, subtitles and block quotes keep theirs (they are fixed), and are not in the counts below.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: Every Generation Was Convinced | 2,379 | 2,374 | -0.2% | 36 (15.1) | 9 (3.8) | 104 (43.7) | 76 (32.0) | 23 | PASS |
| **All 1** | 2,379 | 2,374 | -0.2% | 36 (15.1) | 9 (3.8) | 104 (43.7) | 76 (32.0) | 23 | |

## Introduction: Every Generation Was Convinced (`sec01.xhtml`)

Words 2,379 to 2,374. Em-dashes in his prose 36 to 9 (15.1 to 3.8 per 1,000 words). Tells 104 to 76 (43.7 to 32.0 per 1,000). Mean sentence 18.9 words to 18.7; sentences of eight words or fewer 39.7% to 39.4%; of five or fewer 23.0% to 22.8%. 23 edits in 17 of 34 paragraphs.

By kind (before to after): emdash 36 to 9, not_but 10 to 10, not_just 1 to 1, NotX.Y 6 to 6, isnt_its 4 to 4, triplet 11 to 12, frag3 2 to 2, anaphora 15 to 15, stock 4 to 3, intens 6 to 5, colon_reveal 1 to 1, short_close 8 to 8.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 0 quoted strings, 4 Scripture references, 0 years, 0 numbers in digits, 28 number words, proper names by count, and 49 hedge words (after: 49) compared. Allowed, as words the name counter misread: {"caps": ["Here"]}.

Five pairs:

1. Before: When an abolitionist pamphlet found its way into his hands — and sometimes one did — he read it not as a challenge to examine but as a threat to rebuke.
   After: When an abolitionist pamphlet found its way into his hands, and sometimes one did, he read it not as a challenge to examine but as a threat to rebuke.
2. Before: Not whether slavery was wrong — of course it was. Not whether the German Christians were catastrophically in error — of course they were. Not whether the Pharisees missed something crucial — Jesus said so plainly.
   After: Not whether slavery was wrong; of course it was. Not whether the German Christians were catastrophically in error; of course they were. Not whether the Pharisees missed something crucial; Jesus said so plainly.
3. Before: He was a man whose community had built him a theology, and he had moved into it and called it home; the man who protested — Barth, Bonhoeffer, Niemöller — seemed shrill, seemed political, seemed unwilling to see that this moment required a different kind of faithfulness, a harder kind, one that did not flinch from the demands of history.
   After: He was a man whose community had built him a theology, and he had moved into it and called it home; the man who protested (Barth, Bonhoeffer, Niemöller) seemed shrill, seemed political, seemed unwilling to see that this moment required a different kind of faithfulness, a harder kind, one that did not flinch from the demands of history.
4. Before: Here is what we almost never pause to ask: What would I have said at the time?
   After: We almost never pause to ask: What would I have said at the time?
5. Before: This is not a conspiracy, not even intentional most of the time; it is simply what happens when human beings — who are always embedded in communities, always shaped by self-interest, always subject to fear and desire and the need for belonging — read an ancient text and imagine themselves to be doing so neutrally.
   After: This is not a conspiracy, not even intentional most of the time; it is what happens when human beings, who are always embedded in communities, always shaped by self-interest, always subject to fear and desire and the need for belonging, read an ancient text and imagine themselves to be doing so neutrally.

Left alone, and why. The three portraits and their refrain ("He was not a monster.") are the introduction's frame, so nothing in them changed but dashes. "The idol had not replaced the altar. The idol was on the altar, and it wore vestments, and it preached." is the pull quote and stays word for word in both places. "Idolatry's most effective disguise is not irreligion. It is religion." is the section's heading and hinge. The fragment stacks ("Three men. Three centuries. One problem."; "Not atheism. Not obvious immorality. Not the challenges of secular culture.") stay as written. Nine dashes stay where a list sits inside the aside or the dash is the landing ("people are doing the same — and are just as certain, and just as wrong").
