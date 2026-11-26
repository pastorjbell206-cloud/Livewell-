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
| Chapter 4: The Organized Blind Spot | 5,139 | 5,134 | -0.1% | 65 (12.6) | 17 (3.3) | 134 (26.1) | 82 (16.0) | 46 | PASS |
| Chapter 5: When Fear Becomes Theology | 4,513 | 4,514 | +0.0% | 67 (14.8) | 13 (2.9) | 137 (30.4) | 80 (17.7) | 40 | PASS |
| Chapter 6: The Progressive Blind Spot | 3,892 | 3,892 | +0.0% | 68 (17.5) | 12 (3.1) | 117 (30.1) | 62 (15.9) | 39 | PASS |
| Chapter 7: The Conservative Blind Spot | 4,142 | 4,142 | +0.0% | 62 (15.0) | 10 (2.4) | 115 (27.8) | 64 (15.5) | 38 | PASS |
| Chapter 8: The Bible Assumes You Will Be Wrong | 4,148 | 4,142 | -0.1% | 44 (10.6) | 12 (2.9) | 102 (24.6) | 66 (15.9) | 29 | PASS |
| Chapter 9: The Prophetic Voice and Why You Need It | 4,486 | 4,488 | +0.0% | 71 (15.8) | 10 (2.2) | 141 (31.4) | 72 (16.0) | 51 | PASS |
| Chapter 10: What Humility Actually Looks Like | 4,610 | 4,611 | +0.0% | 64 (13.9) | 9 (2.0) | 129 (28.0) | 75 (16.3) | 46 | PASS |
| Conclusion: The Question You Have to Answer | 2,573 | 2,570 | -0.1% | 30 (11.7) | 6 (2.3) | 87 (33.8) | 55 (21.4) | 22 | PASS |
| Appendix A: The Verses We Got Wrong | 6,912 | 6,913 | +0.0% | 92 (13.3) | 7 (1.0) | 173 (25.0) | 92 (13.3) | 62 | PASS |
| Appendix B: How to Read the Bible | 2,768 | 2,767 | -0.0% | 24 (8.7) | 4 (1.4) | 57 (20.6) | 36 (13.0) | 14 | PASS |
| Appendix C: Recommended Reading | 2,436 | 2,436 | +0.0% | 38 (15.6) | 4 (1.6) | 65 (26.7) | 32 (13.1) | 24 | PASS |
| **All 15** | 61,493 | 61,465 | -0.0% | 853 (13.9) | 148 (2.4) | 1798 (29.2) | 1051 (17.1) | 590 | |

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


## Chapter 4: The Organized Blind Spot (`sec06.xhtml`)

Words 5,139 to 5,134. Em-dashes in his prose 65 to 17 (12.6 to 3.3 per 1,000 words). Tells 134 to 82 (26.1 to 16.0 per 1,000). Mean sentence 23.3 words to 24.8; sentences of eight words or fewer 16.9% to 10.7%; of five or fewer 6.8% to 4.4%. 46 edits; paragraphs 52 to 52.

By kind (before to after): emdash 65 to 17, not_but 8 to 10, not_just 3 to 3, NotX.Y 7 to 1, isnt_its 3 to 3, triplet 17 to 20, anaphora 3 to 1, stock 3 to 3, intens 19 to 18, colon_reveal 3 to 3, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 12 quoted strings, 16 Scripture references, 0 years, 11 numbers in digits, 33 number words, proper names by count, and 103 hedge words (after: 103) compared.

Five pairs:

1. Before: The institution — the established community of Jewish believers in Jerusalem — had organized itself around a vision of what faithfulness looked like, a vision that included circumcision as a requirement for Gentile converts.
   After: The institution, the established community of Jewish believers in Jerusalem, had organized itself around a vision of what faithfulness looked like, a vision that included circumcision as a requirement for Gentile converts.
2. Before: What the slaveholder's proof-texting did was treat those texts as if they were the whole of what the Bible says about slavery, while the clear witness of Exodus — the story of a God who sides with enslaved people against the power that holds them — was somehow not about this. As if Galatians 3 did not exist. As if the trajectory of the biblical narrative, from slavery to liberation, from exile to return, from death to resurrection, did not establish a direction.
   After: What the slaveholder's proof-texting did was treat those texts as if they were the whole of what the Bible says about slavery, while the clear witness of Exodus, the story of a God who sides with enslaved people against the power that holds them, was somehow not about this, as if Galatians 3 did not exist, as if the trajectory of the biblical narrative, from slavery to liberation, from exile to return, from death to resurrection, did not establish a direction.
3. Before: These texts are not obscure. They are not disputed. They are not peripheral to the biblical witness. They are among the most straightforward, least ambiguous passages in the canon, and they are almost never the subject of sustained, serious preaching in the comfortable American church. Not because the preachers are dishonest. Because the silence has been built into the tradition they received, and they are transmitting what they were given.
   After: These texts are not obscure, not disputed, and not peripheral to the biblical witness. They are among the most straightforward, least ambiguous passages in the canon, and they are almost never the subject of sustained, serious preaching in the comfortable American church, not because the preachers are dishonest but because the silence has been built into the tradition they received, and they are transmitting what they were given.
4. Before: What counts as evidence. What counts as a legitimate argument. What counts as a reliable source. Whose testimony you are disposed to receive, and whose you are disposed to dismiss. This is what it means to say that tribe functions as epistemology — as a theory of knowledge.
   After: It shapes what counts as evidence, what counts as a legitimate argument, what counts as a reliable source, whose testimony you are disposed to receive, and whose you are disposed to dismiss. This is what it means to say that tribe functions as epistemology, as a theory of knowledge.
5. Before: The community drifts, not because any individual decides to move, but because the feedback loops within the community amplify certain signals and dampen others, and over time the community's sense of where the center is has shifted significantly from where the broader world's center is — without the community being aware that any movement has occurred. This happens in political communities. It happens in academic communities. It happens in media ecosystems. And it happens, with particular intensity and particular consequences, in religious communities, because religious communities have available to them the additional conviction that their location — however far it may have drifted — is the location of truth.
   After: The community drifts, not because any individual decides to move, but because the feedback loops within the community amplify certain signals and dampen others, and over time the community's sense of where the center is has shifted significantly from where the broader world's center is, without the community being aware that any movement has occurred. This happens in political communities, in academic communities, and in media ecosystems. And it happens, with particular intensity and particular consequences, in religious communities, because religious communities have available to them the additional conviction that their location, however far it may have drifted, is the location of truth.

Left alone, and why. "The homogeneous community is not less intelligent than the heterogeneous one. It is less correctable.", "Peter was not being dishonest. He was being tribal." and "You are held by a tribe." are the chapter's verdicts. The paragraph on McGavran is fair to him ("describing a sociological reality, not prescribing an ideal") and took one comma for a dash. The refrain "you have simply never been formed by Amos ... you have simply never encountered it" keeps every "simply"; one earlier "simply" that was filler went. The balanced paragraph on conservative evangelical and progressive mainline formation ("Neither is doing anything unusual or dishonest.") took one comma. Seventeen dashes stay, most around an aside that carries its own list (Peter in Galatians 2; the global church; "if no evidence, no argument, no testimony ..."). One joining phrase was added to turn four fragments into a sentence ("It shapes what counts as evidence, ...").


## Chapter 5: When Fear Becomes Theology (`sec08.xhtml`)

Words 4,513 to 4,514. Em-dashes in his prose 67 to 13 (14.8 to 2.9 per 1,000 words). Tells 137 to 80 (30.4 to 17.7 per 1,000). Mean sentence 23.8 words to 24.4; sentences of eight words or fewer 22.1% to 18.9%; of five or fewer 7.4% to 4.9%. 40 edits; paragraphs 47 to 47.

By kind (before to after): emdash 67 to 13, not_but 8 to 9, not_just 1 to 1, NotX.Y 6 to 4, isnt_its 11 to 11, triplet 12 to 13, anaphora 10 to 8, intens 10 to 9, q_answered 1 to 1, colon_reveal 4 to 4, short_close 7 to 7.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 0 quoted strings, 15 Scripture references, 0 years, 7 numbers in digits, 34 number words, proper names by count, and 74 hedge words (after: 74) compared.

Five pairs:

1. Before: The person who believed the threat was ultimate was not performing alarm — they felt it — and the feeling of ultimate alarm is extraordinarily resistant to ordinary moral reasoning, because ordinary moral reasoning appears, from inside the alarm, as naive, as insufficient to the moment, as the kind of response that comfortable people offer when they do not understand what is at stake.
   After: The person who believed the threat was ultimate was not performing alarm; they felt it, and the feeling of ultimate alarm is extraordinarily resistant to ordinary moral reasoning, because ordinary moral reasoning appears, from inside the alarm, as naive, as insufficient to the moment, as the kind of response that comfortable people offer when they do not understand what is at stake.
2. Before: Babylon was the enemy — the power that had destroyed Jerusalem, killed their people, and carried them from their land — and the prophet's word was to pray for it, to seek its welfare.
   After: Babylon was the enemy, the power that had destroyed Jerusalem, killed their people, and carried them from their land, and the prophet's word was to pray for it, to seek its welfare.
3. Before: The martyrs were urgent — they refused to compromise what mattered most, at enormous personal cost — but their urgency was oriented toward God and toward the people around them, not toward the defeat of the enemy.
   After: The martyrs were urgent; they refused to compromise what mattered most, at enormous personal cost. But their urgency was oriented toward God and toward the people around them, not toward the defeat of the enemy.
4. Before: That is the difference. Not the presence or absence of fear. Not the presence or absence of urgency. But whether the fear governs, or whether something larger than the fear governs. The community in which fear has become the governing orientation — in which the shared alarm is what holds the community together, in which the magnitude of the threat is the primary driver of the community's theology and practice — that community is in a theological condition that 2 Timothy calls not of God, and that 1 John calls not yet perfected in love.
   After: That is the difference: not the presence or absence of fear, not the presence or absence of urgency, but whether the fear governs, or whether something larger than the fear governs. The community in which fear has become the governing orientation, in which the shared alarm is what holds the community together, in which the magnitude of the threat is the primary driver of the community's theology and practice — that community is in a theological condition that 2 Timothy calls not of God, and that 1 John calls not yet perfected in love.
5. Before: It may be sincere. It may be passionate. It may cite Scripture from morning to night.
   After: It may be sincere, it may be passionate, and it may cite Scripture from morning to night.

Left alone, and why. The opening build ("It is not greed ... It is not pride ... It is fear.") is the chapter's first hinge and stays. So do "They are not stupid. They are frightened.", "They are not companions. They are competitors." and the Psalm 56 pair ("The psalmist is not pretending to be unafraid. He is refusing to let the fear be the governor."). The passage the pull quote echoes ("It feels like clarity.") was not touched. The concession that some fears named real dangers, the paragraph granting that the prophets were urgent too, and the sentence that fear's compression of prophecy "appears in progressive and conservative communities alike, in charismatic and cessationist communities alike" are word for word apart from punctuation. The three "catastrophizing logic" sentences (inquisitor, German Christian, slaveholder) are a deliberate parallel and were left. Thirteen dashes stay.


## Chapter 6: The Progressive Blind Spot (`sec09.xhtml`)

Words 3,892 to 3,892. Em-dashes in his prose 68 to 12 (17.5 to 3.1 per 1,000 words). Tells 117 to 62 (30.1 to 15.9 per 1,000). Mean sentence 24.3 words to 24.3; sentences of eight words or fewer 26.2% to 26.2%; of five or fewer 11.9% to 11.9%. 39 edits; paragraphs 50 to 50.

By kind (before to after): emdash 68 to 12, not_but 5 to 5, not_just 2 to 2, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 8 to 8, anaphora 4 to 4, stock 4 to 4, intens 9 to 9, colon_reveal 4 to 5, short_close 7 to 7, one_line_para 4 to 4.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 3 quoted strings, 4 Scripture references, 1 years, 10 numbers in digits, 25 number words, proper names by count, and 77 hedge words (after: 77) compared.

Five pairs:

1. Before: The progressive Christian narrative — and every community has a narrative — goes roughly like this: previous generations of Christians were captured by the cultural assumptions of their time; they used Scripture to defend slavery, to subordinate women, to persecute outsiders, to bless empire; we have recognized those failures, we have done the historical and theological work to understand how those distortions happened, we have learned from the church's past, and we are committed to a Christianity that does not repeat those mistakes — that centers the marginalized, that interrogates power, that reads Scripture from below rather than from above.
   After: The progressive Christian narrative (and every community has a narrative) goes roughly like this: previous generations of Christians were captured by the cultural assumptions of their time; they used Scripture to defend slavery, to subordinate women, to persecute outsiders, to bless empire; we have recognized those failures, we have done the historical and theological work to understand how those distortions happened, we have learned from the church's past, and we are committed to a Christianity that does not repeat those mistakes, that centers the marginalized, that interrogates power, that reads Scripture from below rather than from above.
2. Before: Lesslie Newbigin's diagnosis — that the church consistently absorbs the assumptions of its cultural moment and presents the result as the gospel — applies to progressive Christianity with the same force it applies to conservative Christianity.
   After: Lesslie Newbigin's diagnosis, that the church consistently absorbs the assumptions of its cultural moment and presents the result as the gospel, applies to progressive Christianity with the same force it applies to conservative Christianity.
3. Before: Genuine compassion for the suffering — a fully biblical impulse, rooted in the prophets and the ministry of Jesus and the example of the early church — becomes attached to a specific political program.
   After: Genuine compassion for the suffering (a fully biblical impulse, rooted in the prophets and the ministry of Jesus and the example of the early church) becomes attached to a specific political program.
4. Before: The voices of the global church that confirm the progressive narrative — the liberation theologians of Latin America, the voices of the African poor who name structural injustice — are elevated; the voices of the global church that challenge the progressive narrative — the African Anglican bishops whose sexual ethics are considerably more traditional than the American progressive consensus, the Orthodox communities whose theological anthropology does not map onto Western progressive categories — are minimized, explained away, or treated as evidence of colonial influence rather than as a genuinely different perspective on the same biblical text.
   After: The voices of the global church that confirm the progressive narrative (the liberation theologians of Latin America, the voices of the African poor who name structural injustice) are elevated; the voices of the global church that challenge the progressive narrative (the African Anglican bishops whose sexual ethics are considerably more traditional than the American progressive consensus, the Orthodox communities whose theological anthropology does not map onto Western progressive categories) are minimized, explained away, or treated as evidence of colonial influence rather than as a genuinely different perspective on the same biblical text.
5. Before: Not relativism — some positions are closer to the biblical witness than others, and it is worth arguing for them carefully. Not paralysis — genuine uncertainty about some things does not require abandoning all conviction. Not false equivalence — some communities are more honestly wrestling with their blind spots than others.
   After: Not relativism; some positions are closer to the biblical witness than others, and it is worth arguing for them carefully. Not paralysis; genuine uncertainty about some things does not require abandoning all conviction. Not false equivalence; some communities are more honestly wrestling with their blind spots than others.

Left alone, and why. This chapter states his position on a contested question in nearly every paragraph, so it took punctuation only: 39 edits, every one a dash recast as a comma, colon, semicolon or brackets. Not one word changed (3,892 words before and after). No fragment was joined and no two-step turned, so that nothing here leans harder or softer on the progressive reader than he wrote it: "It relocates.", "First. The plank in your own eye, first.", "Not the clarity — the clarity may be genuine. The contempt.", and the four "told him he was right" sentences stay as they are. Every concession stays word for word ("This narrative is not entirely false.", "The program may be largely correct", "The planks are not equal; the diagnosis of asymmetry may be entirely correct."). Chapter 7, its pair, was held to the same rule so that the two chapters were treated alike.


## Chapter 7: The Conservative Blind Spot (`sec10.xhtml`)

Words 4,142 to 4,142. Em-dashes in his prose 62 to 10 (15.0 to 2.4 per 1,000 words). Tells 115 to 64 (27.8 to 15.5 per 1,000). Mean sentence 23.5 words to 23.5; sentences of eight words or fewer 22.3% to 22.3%; of five or fewer 11.4% to 11.4%. 38 edits; paragraphs 45 to 45.

By kind (before to after): emdash 62 to 10, not_but 6 to 6, NotX.Y 6 to 6, isnt_its 2 to 2, triplet 13 to 14, anaphora 8 to 8, intens 10 to 10, colon_reveal 5 to 5, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 6 quoted strings, 9 Scripture references, 0 years, 14 numbers in digits, 23 number words, proper names by count, and 56 hedge words (after: 56) compared.

Five pairs:

1. Before: At her best she is practicing tradition — receiving the wisdom of the community across time, testing the claims of the present moment against the weight of the whole, resisting the elevation of contemporary cultural assumptions to theological authority. At her worst she is practicing traditionalism — identifying the tradition with the truth so thoroughly that the tradition can no longer be corrected, that the mechanism by which the Spirit might speak a new word has been closed, that the community has, in effect, replaced Scripture with its own reading of Scripture while believing it has simply remained faithful to Scripture. The conservative instinct — to hold fast, to resist, to insist that not every change represents progress — is not wrong.
   After: At her best she is practicing tradition: receiving the wisdom of the community across time, testing the claims of the present moment against the weight of the whole, resisting the elevation of contemporary cultural assumptions to theological authority. At her worst she is practicing traditionalism: identifying the tradition with the truth so thoroughly that the tradition can no longer be corrected, that the mechanism by which the Spirit might speak a new word has been closed, that the community has, in effect, replaced Scripture with its own reading of Scripture while believing it has simply remained faithful to Scripture. The conservative instinct (to hold fast, to resist, to insist that not every change represents progress) is not wrong.
2. Before: Not because those arrangements, forms, and assumptions are wrong — some of them may be defensible, even right — but because the inability to distinguish between the defense of the faith and the defense of the community's cultural inheritance is the precondition for the mechanism's operation.
   After: Not because those arrangements, forms, and assumptions are wrong (some of them may be defensible, even right) but because the inability to distinguish between the defense of the faith and the defense of the community's cultural inheritance is the precondition for the mechanism's operation.
3. Before: The Pharisees and Herodians — an unlikely coalition of people who disagreed about nearly everything — came together to ask Jesus about taxes, hoping to trap him between loyalty to Caesar and loyalty to Israel.
   After: The Pharisees and Herodians, an unlikely coalition of people who disagreed about nearly everything, came together to ask Jesus about taxes, hoping to trap him between loyalty to Caesar and loyalty to Israel.
4. Before: In each case the fear of revision — the conviction that acknowledging the tradition's error would mean losing everything — prevented the very correction that could have stopped the catastrophe.
   After: In each case the fear of revision, the conviction that acknowledging the tradition's error would mean losing everything, prevented the very correction that could have stopped the catastrophe.
5. Before: That combination — eagerness to receive, commitment to examine, willingness to be changed — is the mark of faithfulness in the tradition of the biblical witness.
   After: That combination (eagerness to receive, commitment to examine, willingness to be changed) is the mark of faithfulness in the tradition of the biblical witness.

Left alone, and why. Held to the same rule as chapter 6, its pair: punctuation only, so that neither chapter was pressed harder than the other. Every one of the 38 edits is a dash recast; not one word changed. The concessions to the conservative reader stay word for word ("The instinct to preserve is not wrong.", "This fear is understandable. It is not entirely irrational.", "Something was lost there, and the loss was real.", "some of them may be defensible, even right"), and so does the paragraph that names both collapses, conservative and progressive, in one sentence. The closing "Not: abandon your convictions. Not: concede the progressive argument. ... But: ask whether ..." is his position and was not joined. "Precisely" in the sentence the pull quote echoes stays.


## Chapter 8: The Bible Assumes You Will Be Wrong (`sec11.xhtml`)

Words 4,148 to 4,142. Em-dashes in his prose 44 to 12 (10.6 to 2.9 per 1,000 words). Tells 102 to 66 (24.6 to 15.9 per 1,000). Mean sentence 23.4 words to 24.2; sentences of eight words or fewer 20.9% to 16.4%; of five or fewer 13.0% to 9.4%. 29 edits; paragraphs 46 to 46.

By kind (before to after): emdash 44 to 12, not_but 15 to 15, NotX.Y 1 to 1, isnt_its 2 to 2, triplet 14 to 15, frag3 1 to 0, anaphora 15 to 11, intens 3 to 2, q_answered 1 to 1, colon_reveal 2 to 3, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 0 quoted strings, 25 Scripture references, 0 years, 20 numbers in digits, 41 number words, proper names by count, and 61 hedge words (after: 61) compared.

Five pairs:

1. Before: The answer that is usually given — that the prophets spoke forth the word of God, that they proclaimed coming judgment and called the people to repentance — is true but incomplete; it describes the prophets' function without explaining why that function required a separate office, structurally distinct from the priesthood and the monarchy. The priests had Scripture. The kings had authority. The scribes had learning.
   After: The answer that is usually given, that the prophets spoke forth the word of God, that they proclaimed coming judgment and called the people to repentance, is true but incomplete; it describes the prophets' function without explaining why that function required a separate office, structurally distinct from the priesthood and the monarchy. The priests had Scripture, the kings had authority, and the scribes had learning.
2. Before: He has not been torn apart by guilt. He has not confessed.
   After: He has not been torn apart by guilt, and he has not confessed.
3. Before: He does not argue. He does not lecture. He creates the conditions under which David's own moral perception — his own sense of justice, which is functioning perfectly when it is directed at someone else — can be brought to bear on David's own situation.
   After: He does not argue or lecture. He creates the conditions under which David's own moral perception, his own sense of justice, which is functioning perfectly when it is directed at someone else, can be brought to bear on David's own situation.
4. Before: It does not require bad faith. It does not even require conscious intention.
   After: It does not require bad faith, or even conscious intention.
5. Before: The question this chapter leaves is not merely diagnostic. It is practical. If the Bible assumes you will be wrong — if the scriptural witness builds accountability structures specifically because the community of faith cannot self-correct — what does it look like to take that seriously?
   After: The question this chapter leaves is practical, not merely diagnostic. If the Bible assumes you will be wrong, if the scriptural witness builds accountability structures specifically because the community of faith cannot self-correct, what does it look like to take that seriously?

Left alone, and why. This chapter came with the fewest dashes in the book (44) and the fewest tells, so it got the fewest edits. "Nathan does not come to David with an accusation. He comes with a story" is the hinge of its central section; "The parable is not a trick. It is a hermeneutical tool", "It says so. And it insists on the requirement anyway." and "It is not accountability. It is confirmation." are verdicts. The ending ("Not certainty. Accountability. Not the absence of blind spots, but the presence of structures that can find them.") is the chapter's thesis line and stays as he wrote it. The passage the pull quote echoes was not touched. Twelve dashes stay.


## Chapter 9: The Prophetic Voice and Why You Need It (`sec13.xhtml`)

Words 4,486 to 4,488. Em-dashes in his prose 71 to 10 (15.8 to 2.2 per 1,000 words). Tells 141 to 72 (31.4 to 16.0 per 1,000). Mean sentence 22.2 words to 23.7; sentences of eight words or fewer 25.4% to 20.7%; of five or fewer 14.4% to 10.1%. 51 edits; paragraphs 51 to 51.

By kind (before to after): emdash 71 to 10, not_but 9 to 10, NotX.Y 4 to 0, isnt_its 3 to 3, triplet 12 to 14, frag3 1 to 0, anaphora 16 to 13, intens 11 to 8, q_answered 1 to 1, colon_reveal 1 to 1, short_close 10 to 10, one_line_para 2 to 2.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 5 quoted strings, 15 Scripture references, 0 years, 6 numbers in digits, 26 number words, proper names by count, and 85 hedge words (after: 85) compared.

Five pairs:

1. Before: Every defensive vocabulary the church has ever developed — the accusation of divisiveness, the diagnosis of a critical spirit, the claim that the challenger lacks spiritual discernment, the suggestion that the person raising the hard question simply does not understand what God is doing here — every one of these is, at its core, a technology for getting rid of the prophetic word before it can land. Before it can be heard. Before it can do what the prophetic word, throughout the biblical narrative, consistently does when it is received:
   After: Every defensive vocabulary the church has ever developed — the accusation of divisiveness, the diagnosis of a critical spirit, the claim that the challenger lacks spiritual discernment, the suggestion that the person raising the hard question simply does not understand what God is doing here — every one of these is, at its core, a technology for getting rid of the prophetic word before it can land, before it can be heard, before it can do what the prophetic word, throughout the biblical narrative, consistently does when it is received:
2. Before: The community has a framework for evaluating challenges — a set of criteria by which it determines which are worth engaging seriously and which are not — and those criteria, which the community believes to be neutral and principled, are systematically calibrated to protect the community from exactly the information it most needs.
   After: The community has a framework for evaluating challenges (a set of criteria by which it determines which are worth engaging seriously and which are not), and those criteria, which the community believes to be neutral and principled, are systematically calibrated to protect the community from exactly the information it most needs.
3. Before: And the Ninevites believed God. They called a fast. The king put on sackcloth. The revision was immediate, total, and — from the outside — inexplicable.
   After: And the Ninevites believed God; they called a fast, and the king put on sackcloth. The revision was immediate, total, and, from the outside, inexplicable.
4. Before: The willingness is the thing. Not perfect information. Not the ideal messenger. Not the right timing. Not the community's comfort with the process. The willingness to let the word do what the word came to do — to sit with the disruption long enough to hear what it is saying, rather than deploying the community's considerable resources for dismissal before the word has had time to work.
   After: The willingness is the thing: not perfect information, not the ideal messenger, not the right timing, not the community's comfort with the process, but the willingness to let the word do what the word came to do, to sit with the disruption long enough to hear what it is saying, rather than deploying the community's considerable resources for dismissal before the word has had time to work.
5. Before: Moses is judging all of Israel's disputes by himself, from morning to evening, and his father-in-law Jethro — a Midianite priest, an outsider to the covenant community — sees what Moses cannot see about his own situation:
   After: Moses is judging all of Israel's disputes by himself, from morning to evening, and his father-in-law Jethro, a Midianite priest, an outsider to the covenant community, sees what Moses cannot see about his own situation:

Left alone, and why. "That is not a coincidence. It is the mechanism.", "Later, however, rarely arrives.", "James was not a progressive.", "The revision was painful. What it produced was the church." and the last two words, "Receive it.", are verdicts. The community's own voice ("We are going to bring it to Scripture. ... We are going to wait." and "The community is still here. The truth did not kill us. We can survive hearing it again.") is speech and keeps its short sentences. The three fragments that list practices ("The board meeting that always includes ...", "The annual review process ...", "The theological formation process ...") are a real list and were left as he set them; joining them would have needed a new sentence. The four forms of dismissal are described as fairly as he wrote them ("None of these strategies are necessarily cynical."). "Profoundly unprepared" lost its "profoundly" (the same sentence already has "profound"), and "precisely" went twice. Ten dashes stay.


## Chapter 10: What Humility Actually Looks Like (`sec14.xhtml`)

Words 4,610 to 4,611. Em-dashes in his prose 64 to 9 (13.9 to 2.0 per 1,000 words). Tells 129 to 75 (28.0 to 16.3 per 1,000). Mean sentence 24.3 words to 24.8; sentences of eight words or fewer 21.2% to 20.0%; of five or fewer 10.1% to 9.2%. 46 edits; paragraphs 51 to 51.

By kind (before to after): emdash 64 to 9, not_but 15 to 16, not_just 2 to 2, NotX.Y 7 to 6, isnt_its 4 to 4, triplet 7 to 8, anaphora 10 to 10, intens 11 to 11, q_answered 1 to 1, colon_reveal 3 to 3, short_close 4 to 4, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 1 quoted strings, 4 Scripture references, 0 years, 3 numbers in digits, 50 number words, proper names by count, and 75 hedge words (after: 75) compared.

Five pairs:

1. Before: to hold a position with the force of genuine belief — to argue for it, to live by it, to make real decisions that cost real things on the basis of it — and simultaneously to maintain an interior openness to the possibility that the position is wrong, or incomplete, or that the way the community has been applying it has missed something important. Both hands at once. The conviction in one, the openness in the other, neither canceling the other out. This is extraordinarily difficult, because conviction and openness feel like opposites — because the experience of genuine belief feels like certainty, and certainty feels like the appropriate closing of the question.
   After: to hold a position with the force of genuine belief (to argue for it, to live by it, to make real decisions that cost real things on the basis of it) and simultaneously to maintain an interior openness to the possibility that the position is wrong, or incomplete, or that the way the community has been applying it has missed something important. Both hands at once: the conviction in one, the openness in the other, neither canceling the other out. This is extraordinarily difficult, because conviction and openness feel like opposites, because the experience of genuine belief feels like certainty, and certainty feels like the appropriate closing of the question.
2. Before: the awareness that the anger response — which feels like righteousness but is almost always the defense mechanism of a conviction being threatened — is not the response that produces the wisdom of God.
   After: the awareness that the anger response, which feels like righteousness but is almost always the defense mechanism of a conviction being threatened, is not the response that produces the wisdom of God.
3. Before: Some of the harm is unintentional — the consequence of blind spots and structural failures the community could not see.
   After: Some of the harm is unintentional, the consequence of blind spots and structural failures the community could not see.
4. Before: the sincere believer, the careful reader of Scripture, the devout member of the community of faith, who has — through the ordinary workings of the mechanism that operates in every community — arrived at convictions that cause harm, who cannot see the harm, and who would be genuinely horrified if shown it clearly, because nothing in her self-understanding has prepared her to recognize herself in it. That is who looks back from the mirror. Not an obvious monster. A person very much like the person looking at it. Which is why the mirror is the right image, and why seeing the reflection is both the beginning of the problem and the beginning of its solution.
   After: the sincere believer, the careful reader of Scripture, the devout member of the community of faith, who has, through the ordinary workings of the mechanism that operates in every community, arrived at convictions that cause harm, who cannot see the harm, and who would be genuinely horrified if shown it clearly, because nothing in her self-understanding has prepared her to recognize herself in it. That is who looks back from the mirror: not an obvious monster but a person very much like the person looking at it, which is why the mirror is the right image, and why seeing the reflection is both the beginning of the problem and the beginning of its solution.
5. Before: Not easy — this book has not argued that it is easy. Not comfortable — the comfort it produces is not the comfort of safety but the deeper comfort of integrity, of a community whose public face and private reality are not two different things. Not without cost — it will cost what it costs, and that cost is real, and the communities that have paid it know that it is real.
   After: Not easy; this book has not argued that it is easy. Not comfortable; the comfort it produces is not the comfort of safety but the deeper comfort of integrity, of a community whose public face and private reality are not two different things. Not without cost; it will cost what it costs, and that cost is real, and the communities that have paid it know that it is real.

Left alone, and why. "That is not humility. That is cowardice dressed in the vocabulary of humility — and it is considerably more comfortable than the real thing.", "The instinct is defense. The discipline is reception." and the pull quote's two sentences ("... It is weaker faith, masquerading as strength.") stay word for word. The section "Humility Without Relativism" states his position (some readings are more faithful than others; no community can exempt itself), so it took dashes only. The sentence that names the old title ("the place where the book's title finds its full meaning. The monster in the mirror is not a dramatic horror ...") took a comma for a dash and nothing else; whether to change it under the new title is still his (bookshelf.md, section 8, question 1). The fragment "Not to be changed by the examination necessarily, but to be informed by it." and the closing "Not the question about other people's blind spots. The question about your own." are hinges. The five paragraphs that open "The community that practices genuine humility ..." are a deliberate list. Nine dashes stay.


## Conclusion: The Question You Have to Answer (`sec15.xhtml`)

Words 2,573 to 2,570. Em-dashes in his prose 30 to 6 (11.7 to 2.3 per 1,000 words). Tells 87 to 55 (33.8 to 21.4 per 1,000). Mean sentence 19.2 words to 20.2; sentences of eight words or fewer 37.3% to 33.9%; of five or fewer 21.6% to 18.1%. 22 edits; paragraphs 29 to 29.

By kind (before to after): emdash 30 to 6, not_but 9 to 9, NotX.Y 1 to 1, isnt_its 2 to 2, triplet 5 to 5, frag3 2 to 0, anaphora 19 to 14, stock 1 to 1, intens 6 to 5, q_answered 2 to 2, colon_reveal 2 to 2, short_close 7 to 7, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 29 number words, proper names by count, and 65 hedge words (after: 65) compared.

Five pairs:

1. Before: We began with three portraits — a slaveholder who knelt at the same altar his enslaved workers were forbidden to approach, a German pastor who signed the forms and kept the congregation quiet, a Pharisee who voted to crucify the one whose coming he had spent his whole life anticipating.
   After: We began with three portraits: a slaveholder who knelt at the same altar his enslaved workers were forbidden to approach, a German pastor who signed the forms and kept the congregation quiet, a Pharisee who voted to crucify the one whose coming he had spent his whole life anticipating.
2. Before: He needed Nathan. He needed Amos.
   After: He needed Nathan and Amos.
3. Before: Not the question about the slaveholder — that answer is settled. Not the question about the German Christians — that verdict is in.
   After: Not the question about the slaveholder; that answer is settled. Not the question about the German Christians; that verdict is in.
4. Before: Not in order to be changed by it automatically — the prophetic word requires discernment, and not every challenge is prophetic — but in order to let it do what voices from outside the comfortable center have always done in the biblical narrative:
   After: Not in order to be changed by it automatically (the prophetic word requires discernment, and not every challenge is prophetic), but in order to let it do what voices from outside the comfortable center have always done in the biblical narrative:
5. Before: And neither can you, not fully, not yet — not because you are worse than they were or better than they were, but because the conditions of history are the conditions of history, and the face-to-face has not yet come. What has come — what the biblical witness offers in the meantime — is the practice. The accountability structures. The prophetic voice. The second question. The outside challenge. The willingness to inhabit the history honestly.
   After: And neither can you, not fully, not yet, not because you are worse than they were or better than they were, but because the conditions of history are the conditions of history, and the face-to-face has not yet come. What has come, what the biblical witness offers in the meantime, is the practice: the accountability structures, the prophetic voice, the second question, the outside challenge, the willingness to inhabit the history honestly.

Left alone, and why. The conclusion is where his short sentences are most plainly verdicts, so most stay: "They are not the villains of the story. They are the story.", "People do.", "The pattern is the context. The person is where the choice gets made." (the pull quote), "The clarity was there. The failure was the refusal to see it.", "The mechanism is real. It is not the only thing that is real.", "It ends with the face.", "Start there. And do not stop." The refrain "The slaveholder could not see his face. The German pastor could not see his face. The Pharisee could not see his face. And neither can you" is the book's last turn of the mirror and was not joined. The whole section "What This Book Has Not Said" is his position, stated four times over, and took nothing. The opening paragraph, which gives the ending in advance, was left as it is. The four fragments naming the voices you have avoided are a list. Joined: the list of practices in the last section, and "He needed Nathan. He needed Amos." (and its pair for Barth and Bonhoeffer). Six dashes stay.


## Appendix A: The Verses We Got Wrong (`sec16.xhtml`)

Words 6,912 to 6,913. Em-dashes in his prose 92 to 7 (13.3 to 1.0 per 1,000 words). Tells 173 to 92 (25.0 to 13.3 per 1,000). Mean sentence 22.5 words to 22.6; sentences of eight words or fewer 12.2% to 11.6%; of five or fewer 4.8% to 4.1%. 62 edits; paragraphs 86 to 86.

By kind (before to after): emdash 92 to 7, not_but 11 to 11, not_just 2 to 2, NotX.Y 1 to 1, isnt_its 2 to 2, triplet 30 to 35, anaphora 16 to 16, stock 1 to 1, intens 10 to 10, short_close 5 to 5, one_line_para 3 to 2.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 53 quoted strings, 52 Scripture references, 4 years, 70 numbers in digits, 79 number words, proper names by count, and 103 hedge words (after: 103) compared.

Five pairs:

1. Before: The descendants of Ham identified in Genesis 10 — the Table of Nations — are the Canaanites, Egyptians, Cushites, and the peoples of the ancient Near East.
   After: The descendants of Ham identified in Genesis 10 (the Table of Nations) are the Canaanites, Egyptians, Cushites, and the peoples of the ancient Near East.
2. Before: The Catholic doctrine of transubstantiation — that the bread and wine become the actual body and blood of Christ — traces its scriptural authorization here and in the institution narratives. The Lutheran doctrine of the Real Presence — that Christ is truly present in the bread and wine without the philosophical framework of transubstantiation — also appeals to this passage.
   After: The Catholic doctrine of transubstantiation, that the bread and wine become the actual body and blood of Christ, traces its scriptural authorization here and in the institution narratives. The Lutheran doctrine of the Real Presence, that Christ is truly present in the bread and wine without the philosophical framework of transubstantiation, also appeals to this passage.
3. Before: Six verses. Three major eschatological systems. Centuries of theological controversy, social consequence, and denominational division. Premillennialism holds that Christ returns before the thousand years — that the millennium is a literal future period of Christ's reign on earth, preceded by the visible return of Christ.
   After: Six verses, three major eschatological systems, and centuries of theological controversy, social consequence, and denominational division. Premillennialism holds that Christ returns before the thousand years, that the millennium is a literal future period of Christ's reign on earth, preceded by the visible return of Christ.
4. Before: The traditional reading, held across Catholic, Orthodox, and most conservative Protestant traditions, is that these texts — along with 1 Corinthians 6:9–10 and 1 Timothy 1:10 — constitute a clear and consistent biblical prohibition of homosexual behavior, grounded in both the creation order and explicit apostolic teaching, and applicable in every cultural context. The revisionist reading, developed primarily in the last half-century by scholars including John Boswell, Robin Scroggs, William Loader, and Matthew Vines, holds that the biblical texts address specific forms of same-sex behavior known in the ancient world — primarily exploitative pederasty, the use of male prostitutes in pagan temple worship, and the Roman practice of masters using enslaved men for sexual gratification — rather than committed, loving same-sex relationships between equals, which the ancient world largely did not conceptualize as a category.
   After: The traditional reading, held across Catholic, Orthodox, and most conservative Protestant traditions, is that these texts, along with 1 Corinthians 6:9–10 and 1 Timothy 1:10, constitute a clear and consistent biblical prohibition of homosexual behavior, grounded in both the creation order and explicit apostolic teaching, and applicable in every cultural context. The revisionist reading, developed primarily in the last half-century by scholars including John Boswell, Robin Scroggs, William Loader, and Matthew Vines, holds that the biblical texts address specific forms of same-sex behavior known in the ancient world (primarily exploitative pederasty, the use of male prostitutes in pagan temple worship, and the Roman practice of masters using enslaved men for sexual gratification) rather than committed, loving same-sex relationships between equals, which the ancient world largely did not conceptualize as a category.
5. Before: Felix Manz, the first Anabaptist martyr, was drowned — with bitter irony — by Protestant authorities who viewed his baptismal theology as seditious.
   After: Felix Manz, the first Anabaptist martyr, was drowned, with bitter irony, by Protestant authorities who viewed his baptismal theology as seditious.

Left alone, and why. The appendix surveys contested doctrines (women's ministry, the papacy, the Supper, election, baptism, inerrancy, the millennium, same-sex relationships) and its fairness lives in its exact wording, so it took punctuation only, with one exception: the stack "Six verses. Three major eschatological systems. Centuries of ..." became one sentence. Every statement of a tradition's position, every "may", "possibly" and "is genuinely contested", every Greek and Hebrew word and every reference is as it was. Where two positions are set side by side (transubstantiation and the Real Presence; the Anabaptist and the Reformed and Lutheran readings; the three millennial views; the traditional and revisionist readings), both took the same punctuation, so neither gained or lost. The headings keep their dashes (22 of them, outside the count). Seven dashes stay in the prose.


## Appendix B: How to Read the Bible (`sec17.xhtml`)

Words 2,768 to 2,767. Em-dashes in his prose 24 to 4 (8.7 to 1.4 per 1,000 words). Tells 57 to 36 (20.6 to 13.0 per 1,000). Mean sentence 21.2 words to 21.1; sentences of eight words or fewer 16.2% to 16.2%; of five or fewer 6.2% to 6.2%. 14 edits; paragraphs 27 to 27.

By kind (before to after): emdash 24 to 4, not_but 8 to 8, not_just 1 to 1, NotX.Y 2 to 2, isnt_its 1 to 1, triplet 15 to 15, anaphora 1 to 1, intens 5 to 4.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 5 quoted strings, 17 Scripture references, 0 years, 9 numbers in digits, 25 number words, proper names by count, and 35 hedge words (after: 35) compared.

Five pairs:

1. Before: The goal is to hear what the text is actually saying — which is not always what you want it to say, what your tradition has said it says, or what it would need to say for your community's commitments to be vindicated.
   After: The goal is to hear what the text is actually saying, which is not always what you want it to say, what your tradition has said it says, or what it would need to say for your community's commitments to be vindicated.
2. Before: The Old Testament's teaching on many subjects — violence, slavery, the status of Gentiles, the nature of the afterlife — is developed, clarified, and in some cases corrected by the New Testament's teaching.
   After: The Old Testament's teaching on many subjects (violence, slavery, the status of Gentiles, the nature of the afterlife) is developed, clarified, and in some cases corrected by the New Testament's teaching.
3. Before: Reading entire books of the Bible — reading Paul's letters as letters, reading the Gospels as narratives, reading the prophets as extended poetic arguments — produces a different and more accurate sense of what the texts are doing than reading isolated verses ever can.
   After: Reading entire books of the Bible (reading Paul's letters as letters, reading the Gospels as narratives, reading the prophets as extended poetic arguments) produces a different and more accurate sense of what the texts are doing than reading isolated verses ever can.
4. Before: The texts that produce that discomfort are precisely the ones to sit with longest.
   After: The texts that produce that discomfort are the ones to sit with longest.
5. Before: The reader who has arrived at a final, settled interpretation of every text — who no longer approaches Scripture as something that might say something she hasn't heard before — has stepped off the spiral.
   After: The reader who has arrived at a final, settled interpretation of every text, who no longer approaches Scripture as something that might say something she hasn't heard before, has stepped off the spiral.

Left alone, and why. This appendix was already the plainest writing in the book (24 dashes, the fewest tells per thousand words), and it is a manual: its short imperative openers ("Read the whole before the part.", "Ask what the text demands.", "Read with people unlike you.") are headings in all but name, and the list of common errors is a list. Its statement on progressive revelation and its closing word on the authority of Scripture are his positions and took a dash at most. One "precisely" went. Four dashes stay.


## Appendix C: Recommended Reading (`sec18.xhtml`)

Words 2,436 to 2,436. Em-dashes in his prose 38 to 4 (15.6 to 1.6 per 1,000 words). Tells 65 to 32 (26.7 to 13.1 per 1,000). Mean sentence 17.9 words to 17.9; sentences of eight words or fewer 22.8% to 22.8%; of five or fewer 12.5% to 12.5%. 24 edits; paragraphs 38 to 38.

By kind (before to after): emdash 38 to 4, not_but 3 to 3, triplet 13 to 14, stock 1 to 1, intens 1 to 1, q_answered 1 to 1, short_close 6 to 6, one_line_para 1 to 1, forbidden 1 to 1.

Fact diff: **PASS**. Fixed blocks (headings, subtitle, pull quote, block quotes and their references) identical; 4 quoted strings, 5 Scripture references, 37 years, 48 numbers in digits, 22 number words, proper names by count, and 44 hedge words (after: 44) compared.

Five pairs:

1. Before: Festinger's central finding — that disconfirmed predictions tend to strengthen rather than weaken belief among committed group members — is the empirical foundation for much of what this book argues about community-shaped self-deception.
   After: Festinger's central finding, that disconfirmed predictions tend to strengthen rather than weaken belief among committed group members, is the empirical foundation for much of what this book argues about community-shaped self-deception.
2. Before: Bonhoeffer's critique of cheap grace — the grace that costs nothing and changes nothing — is one of the twentieth century's most important theological arguments.
   After: Bonhoeffer's critique of cheap grace, the grace that costs nothing and changes nothing, is one of the twentieth century's most important theological arguments.
3. Before: Pelikan's own trajectory — from Lutheran to Eastern Orthodox — is itself a demonstration of the argument that every tradition's reading is revisable.
   After: Pelikan's own trajectory, from Lutheran to Eastern Orthodox, is itself a demonstration of the argument that every tradition's reading is revisable.
4. Before: A rigorously researched account of how German Protestants responded — or failed to respond — to the Nazi state.
   After: A rigorously researched account of how German Protestants responded, or failed to respond, to the Nazi state.
5. Before: McKnight's argument — that every Christian picks and chooses from Scripture, and that the question is not whether you do so but by what principles — is the popular-level version of the hermeneutical argument this book makes at a more theoretical level.
   After: McKnight's argument, that every Christian picks and chooses from Scripture, and that the question is not whether you do so but by what principles, is the popular-level version of the hermeneutical argument this book makes at a more theoretical level.

Left alone, and why. A reading list: every author, title, edition, year and volume is as it was, and so is every judgment of a book ("Essential.", "Dense but worth the effort.", "Useful counterweight to McLaren."). The annotations are notes, and their fragments are the form of a note, so none was joined. All 24 edits are dashes recast; no word changed. Four dashes stay. The title of Christopher Wright's book carries a word on the Forbidden Language list ("Unlocking"); it is a title and stays.

## The whole book

Fifteen chapter files were edited (the three part pages, `sec02`, `sec07` and `sec12`, hold only a title and a tag line and were not touched). In his running prose: 61,493 words before, 61,465 after; 853 em-dashes before, 148 after (13.9 to 2.4 per 1,000 words); 590 edits. Of the 590, about 560 recast a dash or join a fragment stack with his own words; the rest take out a filler word ("precisely" eleven times of twenty-six, "simply" three of forty-eight, "profoundly" twice, "deeply" once), turn a two-step the plain way round (twice), drop a stock opener ("Here is what we almost never pause to ask" became "We almost never pause to ask"), or add a contraction (six, all in the introduction and chapter 1). The fact diff passed on all fifteen.

**No paragraph was joined.** After the edit the book has 25 paragraphs of fifteen words or fewer, none next to another. Each is a hinge ("But we are different."; "He saw a responsible man."; "And the system tortured people.") or the line that hands over to a block quotation ("Romans 3:23 is an equal opportunity verse."), which is where his standard keeps a short sentence.

**Chapters 6 and 7, and Appendix A, took punctuation only.** They state his position on contested questions in nearly every paragraph (the progressive and the conservative blind spot; women's ministry, baptism, election, inerrancy, same-sex relationships), and the rule was that such a sentence takes nothing beyond a dash or a contraction. Chapters 6 and 7 were held to exactly the same treatment so that neither was pressed harder than the other.

**What was not done, on purpose.** The two-step ("It is not X. It is Y.") is this book's argument as much as its habit: a blind spot is not ignorance, the horror was not the monster, the sincerity is not a defense. The counter still finds it often, and only two were turned, because the others are definitions, verdicts or his stated position. Whether the book leans on it too much is a judgment about his argument, not a tell to be cleaned, and it was left to him. Contractions were added only where a sentence was already speech; the book's formal "is not" and "does not" carry weight at its verdicts and were left. No intensifier was cut where it does work ("genuinely" is nearly always a real claim about sincerity in this book, which is its subject).

**Words on the Forbidden Language list.** None in his prose before or after. "Unlocking" is in the title of Christopher Wright's book in Appendix C. "Do the work" appears once, literally ("before it has had time to do the work it came to do").

## For James: things that look wrong, none of them changed

The rule for this pass was that a quotation or claim that looks wrong is listed, not fixed. Each of these should be checked against the source before the book is next printed.

**Attributions and facts**

1. Chapter 1: "Bonhoeffer, in his prison letters near the end of his life, wrote about 'cheap grace'". Cheap grace is from The Cost of Discipleship (1937), as the book's own Appendix C says, not from the prison letters.
2. Chapter 3: Bonhoeffer "writing from his prison cell, identified what he called 'the great masquerade of evil'". The phrase is from "After Ten Years", written at the end of 1942, before his arrest in April 1943 (it is printed in Letters and Papers from Prison).
3. Chapter 3: "The phenomenon has a technical name in psychology — 'moral licensing'". Moral licensing is a different finding (a good deed making a later bad one feel permitted). Seeing others' faults and not one's own is usually called the bias blind spot, or moral hypocrisy.
4. Chapter 3: "C.S. Lewis ... identified self-deception as the deepest and most dangerous of the spiritual sins". Lewis's "great sin" in Mere Christianity is pride; the sentence may be claiming more than he wrote.
5. Chapter 3: the Spanish Inquisition "tortured a substantial portion" of those it tried. Historians now put torture in a small minority of cases; "tens of thousands" tried is, if anything, low.
6. Chapter 4: "Peter's confrontation with the Jerusalem church in Acts 15". Peter is challenged by the Jerusalem believers in Acts 11; Acts 15 is the Council.
7. Chapter 4: the Homogeneous Unit Principle "later named ... by McGavran's student C. Peter Wagner". McGavran used the term himself; worth checking who named it.
8. Chapter 5: the paragraphs on the amygdala are the popular account, simpler than the neuroscience.
9. Chapter 7: "in the words of the scholars, 'non-imperial'" quotes no named scholar.
10. Chapter 7: Pelikan's line on tradition and traditionalism is from The Vindication of Tradition (1984), not from "his magisterial study of the history of Christian doctrine".
11. Chapter 8: Isaiah walking naked for three years (Isaiah 20) is listed among the ways prophets were unwelcome; it was a sign he acted out, not something done to him.
12. Chapter 10: "what Bernard of Clairvaux called the via negativa applied to the self" and "what the mystics called learned ignorance". The via negativa is usually traced to Pseudo-Dionysius, and "learned ignorance" is Nicholas of Cusa's title. The conclusion's "line from the mystic tradition" ("you cannot see the light by looking at it directly") has no source.
13. Chapter 10: "The objection that the person in the previous chapter was most likely to raise" reads like a slip (perhaps "the reader of the previous chapter").
14. Conclusion: the three portraits are described differently from the introduction. There the German was a layman who "signed the forms"; here he is "a German pastor who signed the forms and kept the congregation quiet", and the slaveholder "knelt at the same altar his enslaved workers were forbidden to approach", a detail the introduction does not have. Also, the introduction has the German Protestant "genuflected, confessed, received the Eucharist", which is Catholic practice.
15. Conclusion: "Theresa of Avila" (usually Teresa). And the conclusion opens with a paragraph that gives its own last lines in advance ("The face in the mirror is yours. Start there. And do not stop."); it may be a summary that was left in.
16. Conclusion against chapter 1: the conclusion says the Bible's testimony against slavery "is overwhelming and has always been available to anyone willing to read it"; chapter 1 says the debates were "real debates, with real exegetical complexity". Both can stand, but a reader may feel the gap.
17. Appendix A: "abomination" (toevah) is said to be used of eating shellfish (Leviticus 11:10–12) and of mixed fibres and mixed seed (19:19). Leviticus 11 uses a different word (sheqets), and 19:19 uses neither. This is a known weak point in the argument and a hostile reviewer will find it.
18. Appendix A: William Loader is listed with Boswell, Scroggs and Vines as holding that the texts address only exploitative acts. Loader argues that Paul did condemn same-sex acts as such (and then disagrees with Paul).
19. Appendix A: "Revelation 13, where Rome is depicted as the beast and the whore". The whore is in Revelation 17.
20. Appendix A: Paul "uses the same term in 1 Corinthians 11:14 to describe men wearing long hair as 'contrary to nature'". 11:14 says "Does not nature itself teach you ..."; the quoted words are not in it.
21. Appendix A: Harnack's summary is given in quotation marks as "the Fatherhood of God and the brotherhood of man". His own formula in What Is Christianity? is closer to "God the Father and the infinite value of the human soul".
22. Appendix A: Felix Manz as "the first Anabaptist martyr" (the first killed by Protestants; one was burned by Catholic authorities in 1525), and "the tradition he founded".
23. Appendix A: premillennialists are said to read Revelation "in the same genre register as newspaper reporting", which they would not sign as a fair statement of their view.
24. Appendix A: Ezra 9–10 is offered in chapter 7 as a model of costly revision ("it was the right thing"), a few pages after the sojourner texts; the two sit awkwardly together.
25. Appendix B: "Matthew 1 through 5, for instance, is structured as a new Exodus ... five sermons". The five discourses run through the whole Gospel (chapters 5 to 25).
26. Appendix C: Haidt's "Chapter 5, on moral dumbfounding". In The Righteous Mind moral dumbfounding is in chapter 2.
27. The John 16:13 block quotation is printed twice in chapter 9 (in the last section and again at the end).

**Scripture quotations.** The copyright page says "Unless otherwise noted, Scripture quotations are from the English Standard Version (ESV)", and nothing is noted. These are not the ESV's wording:

- NIV: Matthew 23:15, Jeremiah 17:9 (also shortened: "and beyond cure" is missing), Matthew 15:8–9, Revelation 3:17 (introduction); Jeremiah 7:9–11 and 7:11 (chapter 1; chapter 8 quotes the same verse in the ESV); Amos 5:21–24 and "all Scripture is God-breathed" (chapter 2); 1 John 1:8, Proverbs 14:12, John 16:2 (chapter 3); Philemon 16 and Romans 16:7 (Appendix A).
- Chapter 2 runs Luke 16:29 and 16:31 together as one quotation.
- Chapter 4's Exodus 23:9 ("having been sojourners yourselves") is no translation I can find; chapter 7 quotes the same verse correctly from the ESV.
- Appendix A: "an eloquent man, mighty in the Scriptures" is Acts 18:24 in the NKJV, not 18:26 in the ESV; "gouge out your eye" (Matthew 5:29) is the NIV's verb; Ephesians 6:5, Colossians 3:22, 1 Timothy 6:1 and 1 Corinthians 7:21 follow the ESV before 2011 ("slaves"), where the current text has "bondservants".
- Chapter 2: Chesterton wrote "giving votes", not "giving a vote". Chapter 2 also puts Augustine's use-and-enjoy distinction to work on ways of reading Scripture; in On Christian Doctrine it is a distinction between things, not readings.

## Questions only James can answer

1. Do you want the items above corrected? The quotation ones are mechanical once you name the translation; the factual ones (Bonhoeffer twice, moral licensing, toevah, Loader, Revelation 13, 1 Corinthians 11:14) need your decision on the sentence.
2. ESV throughout, or a note on the copyright page that some quotations are from the NIV?
3. The two-step ("It is not X. It is Y."). It was left wherever it is a definition, a verdict or your position, which is most of the time. Do you want a harder pass at it in this book, knowing it would change how some of your arguments are put?
4. Chapter 10 still says "the place where the book's title finds its full meaning. The monster in the mirror is ..." under the new title (bookshelf.md, section 8, question 1). Still yours.
5. The conclusion's first paragraph: keep it as an epigraph, or cut it?


## 2026-11-25: an academic introduction (James: "very academic and intellectual")

James, 2026-11-25: "I don't like a lot of the introductions to a lot of the books. I want them to be very academic and intellectual." This is a different kind of edit from the voice pass above: the introduction (`sec01.xhtml`) gained new prose that places the book in its scholarly conversation. Nothing James wrote about himself or the book's origin was changed, no quotation or Scripture reference was altered, and no chapter after the introduction was touched. Every scholar, book and date added is real and was checked; no one is quoted, every view is paraphrased and attributed. The PDF and EPUB were rebuilt with `node scripts/build-book-files.mjs <id> --verify` (identical: true) and the page count updated in `client/src/data/ebooks.ts`.

Added one section, "The Mechanism in the Scholarship", before "What Would I Have Said at the Time?": Gadamer's Truth and Method (1960) on prejudice and horizons, Ricoeur's hermeneutics of suspicion, Berger and Luckmann (1966) and the plausibility structure, Haidt's The Righteous Mind (2012), Noll's The Civil War as a Theological Crisis (2006), Doris Bergen's Twisted Cross (1996), and a word of justice for the Pharisees after E. P. Sanders's Paul and Palestinian Judaism (1977), closing on Calvin's factory of idols. Every other word of the introduction is unchanged; 244 pages became 246.
