# Blind Spots: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". This is the first book, Blind Spots (id `the-monster-in-the-mirror`), edited in `content/books-src/the-monster-in-the-mirror/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. His manuscript instructions say fragments are intentional and stay; his site standard prefers developed paragraphs to fragment stacks. He settled it on 2026-11-25: "use full paragraphs in the books too". So the site standard governs the books as well: a stack of fragments or a run of one-line paragraphs may be joined into developed sentences and paragraphs, and a short sentence stays where it is a real verdict or hinge. (The introduction was first committed before he settled it, with its fragments left; its second commit applies this.) The original EPUB and PDF are untouched in `content/held-downloads/originals/`.

## Method

Each chapter was read whole. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (so the edit list is the whole record; `git diff f4b74050 -- content/books-src/the-monster-in-the-mirror/` shows every change). One commit per chapter. After the edits, the changed sentences were read again in place, and an edit that made a sentence worse or flatter was taken back.

What an edit may be: an em-dash recast as a comma, a full stop, a semicolon, a colon before a real list, or brackets; a two-step ("It is not X. It is Y.", "not X but Y") turned the plain way round where it was not the passage's hinge; a stock turn or filler intensifier removed; a contraction where the sentence was already spoken. A stack of fragments joined into a sentence, or a run of one-line paragraphs joined into a paragraph, using his own words and the fewest joining words ("and", "but", a comma). Nothing else: no sentence, fact, example or opinion was added.

Three scripts, kept outside the repo in `/home/user/voice-scratch/` (`apply.py`, `factdiff.py`, `tells.py`; the earlier runs' scripts were lost and these were written again):

- **Fact diff** (original chapter file against edited). Every block that is not his running prose (title, subtitle, eyebrow, headings, pull quote, part page, block quotes and their references) must be identical and in the same order, and the number of paragraphs may fall (a join) but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word (two through ninety, hundred, thousand, first, second, half, twice, both, century, generation and the rest), and every proper name by count (a word is a name if the chapter capitalizes it inside a sentence more often than it writes it small, or never writes it small). It fails if any count differs. It also counts hedge words (probably, perhaps, may, might, could, some, many, most, often, sometimes, almost, largely, seems, whether and the rest) and fails if any falls or rises. Where the name counter mistook an ordinary sentence-opening word for a name, the word is listed in that chapter's entry; nothing else was allowed.
- **Tell counter** (his prose only, quotations blanked). Em-dashes; "not X but Y"; "not just X but Y"; "Not X. Y."; "isn't X, it's Y"; triplets; runs of three fragments; anaphora runs (three sentences opening on the same word); stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic: the triplet, anaphora and short-close counts include real lists and his deliberate refrains, so read the totals as direction, not a grade. The em-dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word (see `docs/work/elite/bookshelf.md` section 8).

His limit for em-dashes is 2 to 3 per 500 words, which is 4 to 6 per 1,000. Headings, subtitles and block quotes keep theirs (they are fixed), and are not in the counts below.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: Every Generation Was Convinced | 2,379 | 2,376 | -0.1% | 36 (15.1) | 9 (3.8) | 106 (44.6) | 66 (27.8) | 32 | PASS |
| Chapter 1: You Are Not the Exception | 4,566 | 4,559 | -0.2% | 63 (13.8) | 11 (2.4) | 155 (33.9) | 101 (22.2) | 50 | PASS |
| Chapter 2: How the Bible Gets Translated by the Room You're In | 4,482 | 4,482 | +0.0% | 67 (14.9) | 13 (2.9) | 135 (30.1) | 78 (17.4) | 49 | PASS |
| Chapter 3: The Monster Is Never the One in the Mirror | 4,447 | 4,439 | -0.2% | 62 (13.9) | 11 (2.5) | 145 (32.6) | 90 (20.3) | 48 | PASS |
| **All 4** | 15,874 | 15,856 | -0.1% | 228 (14.4) | 44 (2.8) | 541 (34.1) | 335 (21.1) | 179 | |

## Introduction: Every Generation Was Convinced (`sec01.xhtml`)

Words 2,379 to 2,376. Em-dashes in his prose 36 to 9 (15.1 to 3.8 per 1,000 words). Tells 106 to 66 (44.6 to 27.8 per 1,000). Mean sentence 18.9 words to 21.2; sentences of eight words or fewer 39.7% to 25.9%; of five or fewer 23.0% to 10.7%. 32 edits; paragraphs 34 to 34.

By kind (before to after): emdash 36 to 9, not_but 10 to 10, not_just 1 to 1, NotX.Y 6 to 3, isnt_its 4 to 4, triplet 11 to 15, frag3 2 to 0, anaphora 15 to 8, stock 4 to 3, intens 6 to 5, colon_reveal 1 to 1, short_close 8 to 5, one_line_para 2 to 2.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 0 quoted strings, 4 Scripture references, 0 years, 0 numbers in digits, 28 number words, proper names by count, and 49 hedge words (after: 49) compared. Allowed, as words the name counter misread: {"caps": ["Here"]}.

Five pairs:

1. Before: When an abolitionist pamphlet found its way into his hands — and sometimes one did — he read it not as a challenge to examine but as a threat to rebuke.
   After: When an abolitionist pamphlet found its way into his hands, and sometimes one did, he read it not as a challenge to examine but as a threat to rebuke.
2. Before: Not whether slavery was wrong — of course it was. Not whether the German Christians were catastrophically in error — of course they were. Not whether the Pharisees missed something crucial — Jesus said so plainly.
   After: Not whether slavery was wrong; of course it was. Not whether the German Christians were catastrophically in error; of course they were. Not whether the Pharisees missed something crucial; Jesus said so plainly.
3. Before: He broke the Sabbath. He ate with the wrong people. He said things about the law that were reckless, that undermined the tradition, that would undo everything the devout had spent generations building.
   After: He broke the Sabbath, he ate with the wrong people, and he said things about the law that were reckless, that undermined the tradition, that would undo everything the devout had spent generations building.
4. Before: Here is what we almost never pause to ask:
   After: We almost never pause to ask:
5. Before: This is the problem the Bible takes most seriously. Not atheism. Not obvious immorality. Not the challenges of secular culture. The Bible is most consistently, most urgently alarmed by the danger of religious self-deception — of people who have confused the voice of their culture for the voice of God and do not know it.
   After: This, not atheism or obvious immorality or the challenges of secular culture, is the problem the Bible takes most seriously. The Bible is most consistently, most urgently alarmed by the danger of religious self-deception, of people who have confused the voice of their culture for the voice of God and do not know it.

Left alone, and why. The three portraits and their refrain ("He was not a monster. That is the point.") are the introduction's frame; the refrain is a verdict and stays. "The idol had not replaced the altar. The idol was on the altar, and it wore vestments, and it preached." is the pull quote and stays word for word in both places. "Idolatry's most effective disguise is not irreligion. It is religion." is the section's heading and hinge. "Those are the places to press. Those are the places to be afraid." is a verdict. The anaphora "The man who wrote it ..." is three full sentences and was left. Nine dashes stay where a list sits inside the aside or the dash is the landing ("people are doing the same — and are just as certain, and just as wrong"). Joined: the fragment stacks ("He was devout. He was learned."; "Three men. Three centuries. One problem."; "Not atheism. Not obvious immorality. Not the challenges of secular culture.").


## Chapter 1: You Are Not the Exception (`sec03.xhtml`)

Words 4,566 to 4,559. Em-dashes in his prose 63 to 11 (13.8 to 2.4 per 1,000 words). Tells 155 to 101 (33.9 to 22.2 per 1,000). Mean sentence 19.0 words to 19.6; sentences of eight words or fewer 29.5% to 26.1%; of five or fewer 13.9% to 11.7%. 50 edits; paragraphs 73 to 73.

By kind (before to after): emdash 63 to 11, not_but 5 to 5, not_just 1 to 1, NotX.Y 5 to 5, isnt_its 4 to 4, triplet 15 to 18, frag3 1 to 0, anaphora 12 to 10, stock 5 to 5, intens 15 to 12, colon_reveal 6 to 7, short_close 14 to 14, one_line_para 9 to 9.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 10 quoted strings, 8 Scripture references, 3 years, 10 numbers in digits, 32 number words, proper names by count, and 74 hedge words (after: 74) compared. Allowed, as words the name counter misread: {"caps": ["Let", "Let's"]}.

Five pairs:

1. Before: The slaveholder was not uncertain about slavery — he was certain, and his certainty was buttressed by Scripture, by the testimony of respected theologians, by the practice of his community, by the economic and social logic of the world he lived in. The German Christian was not wavering about the Reich — he was convinced, and his conviction came with hymns and sermons and the feeling of historical momentum, the sense that God was doing something great in their moment. The Pharisee was not tentative about the law — he had given his life to it, and his devotion was genuine and costly and entirely self-reinforcing.
   After: The slaveholder was not uncertain about slavery; he was certain, and his certainty was buttressed by Scripture, by the testimony of respected theologians, by the practice of his community, by the economic and social logic of the world he lived in. The German Christian was not wavering about the Reich; he was convinced, and his conviction came with hymns and sermons and the feeling of historical momentum, the sense that God was doing something great in their moment. The Pharisee was not tentative about the law; he had given his life to it, and his devotion was genuine and costly and entirely self-reinforcing.
2. Before: It happened fast. It happened to educated people. It happened to people who read their Bibles every day.
   After: It happened fast, it happened to educated people, and it happened to people who read their Bibles every day.
3. Before: Karl Barth, who would become one of the principal authors of the Barmen Declaration — the defining statement of the Confessing Church's resistance — saw the mechanism clearly.
   After: Karl Barth, who would become one of the principal authors of the Barmen Declaration, the defining statement of the Confessing Church's resistance, saw the mechanism clearly.
4. Before: You would have been one of the many. And you would have had reasons. You would have had Bible verses. You would have had the authority of respected theologians and the pressure of your community and the logic of your cultural moment.
   After: You would have been one of the many, and you would have had reasons. You would have had Bible verses, and you would have had the authority of respected theologians and the pressure of your community and the logic of your cultural moment.
5. Before: It was hard then. It is hard now. It will always be hard, because communities are where we live and breathe and receive our identities, and to question what a community believes is always experienced — by the community and often by the questioner — as a kind of betrayal. But the alternative is to be the slaveholder at his Bible. The German Christian at his hymnal. The Pharisee at his prayers.
   After: It was hard then, it is hard now, and it will always be hard, because communities are where we live and breathe and receive our identities, and to question what a community believes is always experienced, by the community and often by the questioner, as a kind of betrayal. But the alternative is to be the slaveholder at his Bible, the German Christian at his hymnal, the Pharisee at his prayers.

Left alone, and why. The two-step is this chapter's argument, not its ornament: "A blind spot is not ignorance", "The sincerity is not a defense. The sincerity is the problem.", "This is not a counsel of despair. It is a counsel of sobriety.", "They don't feel like blindness. They feel like sight." Each is a definition or a verdict, and none was recast. Barth's diagnosis of the German Christians and the fair statement of the pro-slavery argument ("This is a coherent argument. It is wrong — catastrophically, damnably wrong — but it is coherent") took nothing but a dash or a bracket. One-line paragraphs that are hinges stay ("But we are different."; "Urgency is always the friend of the blind spot. We will return to this."; "He was, at the moment he said this, the prophet they would kill."). "Let us" became "Let's" twice; the name counter reads "Let" as a name, hence the allowance.


## Chapter 2: How the Bible Gets Translated by the Room You're In (`sec04.xhtml`)

Words 4,482 to 4,482. Em-dashes in his prose 67 to 13 (14.9 to 2.9 per 1,000 words). Tells 135 to 78 (30.1 to 17.4 per 1,000). Mean sentence 26.7 words to 28.8; sentences of eight words or fewer 25.9% to 19.3%; of five or fewer 16.0% to 10.0%. 49 edits; paragraphs 38 to 38.

By kind (before to after): emdash 67 to 13, not_but 14 to 15, not_just 1 to 1, NotX.Y 3 to 1, isnt_its 4 to 3, triplet 17 to 18, frag3 1 to 0, anaphora 3 to 3, stock 5 to 5, intens 16 to 14, colon_reveal 0 to 1, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 25 quoted strings, 2 Scripture references, 0 years, 1 numbers in digits, 29 number words, proper names by count, and 111 hedge words (after: 111) compared. Allowed, as words the name counter misread: {"caps": ["Learn", "Map", "Profitable", "Name"]}.

Five pairs:

1. Before: Wright is not saying all readings are equally valid; he is saying that the path to a more faithful reading runs through greater honesty about the reading you already have — about the glasses you are already wearing — rather than the pretense that you are reading without glasses at all.
   After: Wright is not saying all readings are equally valid; he is saying that the path to a more faithful reading runs through greater honesty about the reading you already have, about the glasses you are already wearing, rather than the pretense that you are reading without glasses at all.
2. Before: These are real texts. They are important texts. There is nothing wrong with preaching them — but there is something to be examined in what sits beside them in the canon and is never preached.
   After: These are real texts, and important ones. There is nothing wrong with preaching them, but there is something to be examined in what sits beside them in the canon and is never preached.
3. Before: Ask what circumstances produced it. Ask whose interests it served.
   After: Ask what circumstances produced it and whose interests it served.
4. Before: That is a staggering claim — not just that Scripture is useful or inspiring or morally instructive, but that it is the very breath of God, and that its purpose includes reproof and correction, not merely confirmation and encouragement. Most communities quote the first half — "all Scripture is God-breathed" — regularly. The second half lands less often. Profitable for reproof. For correction. Not for endorsement. Not for validation of what you already believe. For the harder thing:
   After: That is a staggering claim: not just that Scripture is useful or inspiring or morally instructive, but that it is the very breath of God, and that its purpose includes reproof and correction, not merely confirmation and encouragement. Most communities quote the first half ("all Scripture is God-breathed") regularly. The second half lands less often: profitable for reproof, for correction. Not for endorsement or for validation of what you already believe, but for the harder thing:
5. Before: What you can do is know you are in it. Name it. Map its walls. Learn where the windows are. And then read Scripture again — not in the pretense that you have escaped the room, but with the honest, accountable, correctable posture of someone who knows exactly where they are standing, and knows that standing there, they can only see so far.
   After: What you can do is know you are in it: name it, map its walls, learn where the windows are. And then read Scripture again, not in the pretense that you have escaped the room, but with the honest, accountable, correctable posture of someone who knows exactly where they are standing, and knows that standing there, they can only see so far.

Left alone, and why. The three "who benefits" cases (patriarchal authority, prosperity, Christian nationalism) each end on a hedge ("This does not prove ...", "Again, this is not a proof."); the hedges are word for word and the cases took only a bracket for a dash. The Wright, Pelikan and Chesterton paragraphs took punctuation only. "Tradition invites examination. Traditionalism forecloses it." and "That is not a rejection of tradition. That is tradition, functioning the way it is supposed to." are verdicts. Thirteen dashes stay, among them the two long asides that define prosperity teaching and Christian nationalism, where commas would tangle the lists inside them. Allowed: four words that opened fragments and now sit inside a sentence (Name, Map, Learn, Profitable).


## Chapter 3: The Monster Is Never the One in the Mirror (`sec05.xhtml`)

Words 4,447 to 4,439. Em-dashes in his prose 62 to 11 (13.9 to 2.5 per 1,000 words). Tells 145 to 90 (32.6 to 20.3 per 1,000). Mean sentence 23.3 words to 25.1; sentences of eight words or fewer 25.8% to 20.5%; of five or fewer 14.2% to 8.5%. 48 edits; paragraphs 52 to 52.

By kind (before to after): emdash 62 to 11, not_but 14 to 14, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 10 to 10, triplet 13 to 18, anaphora 6 to 3, stock 6 to 6, intens 15 to 12, colon_reveal 2 to 1, short_close 11 to 9, one_line_para 3 to 3.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 11 quoted strings, 8 Scripture references, 2 years, 4 numbers in digits, 21 number words, proper names by count, and 78 hedge words (after: 78) compared. Allowed, as words the name counter misread: {"caps": ["Faithfully"]}.

Five pairs:

1. Before: The phenomenon has a technical name in psychology — "moral licensing" — but the ordinary version of it is familiar to everyone.
   After: The phenomenon has a technical name in psychology ("moral licensing"), but the ordinary version of it is familiar to everyone.
2. Before: The system had procedures. The system had standards of evidence. The system had appeal mechanisms.
   After: The system had procedures, standards of evidence, and appeal mechanisms.
3. Before: This is the person who is impossible to reach. Not because they are wicked, but because they are convinced of their righteousness. Not because they are indifferent to truth, but because they believe, sincerely, that they have it. The first letter of John is addressed to a community that apparently had members who believed they were without sin — who had arrived, through some combination of theological sophistication and spiritual experience, at a place where the category of sin no longer applied to them in the ordinary way.
   After: This is the person who is impossible to reach, not because they are wicked but because they are convinced of their righteousness, not because they are indifferent to truth but because they believe, sincerely, that they have it. The first letter of John is addressed to a community that apparently had members who believed they were without sin, who had arrived, through some combination of theological sophistication and spiritual experience, at a place where the category of sin no longer applied to them in the ordinary way.
4. Before: The question this chapter leaves you with is not historical. It is personal.
   After: The question this chapter leaves you with is personal, not historical.
5. Before: Because without that, you are the slaveholder at his Bible. The inquisitor at his prayers. The Pharisee at his Torah. Certain. Sincere. Looking in the mirror and seeing exactly what they expected to see.
   After: Because without that, you are the slaveholder at his Bible, the inquisitor at his prayers, the Pharisee at his Torah: certain, sincere, looking in the mirror and seeing exactly what they expected to see.

Left alone, and why. "The horror, for Arendt, was not the monster. The horror was the clerk.", "He saw a responsible man.", "And the system tortured people." and "The Pharisees were not moral laxists. They were moral athletes." are verdicts on their own lines and stay. The anaphora "that is exactly what the slaveholder saw. That is exactly what the inquisitor saw. That is exactly what the German Christian saw." is the Mirror Test's hinge. The passage the pull quote echoes ("We need the monster to be conscious of his monstrousness.") was not touched. The slaveholder's self-understanding and the inquisitor's are stated as fairly as he wrote them; nothing in them changed but punctuation. One two-step was turned round ("is not historical. It is personal." to "is personal, not historical."). "Profoundly" became "much" and "deeply" (of Arendt's reporting) went; "deeply sinning while being deeply convinced" is a deliberate pair and stays.
