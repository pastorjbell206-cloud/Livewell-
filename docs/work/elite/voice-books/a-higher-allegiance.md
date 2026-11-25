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
| Chapter 1: Zanah | 3,729 | 3,719 | -0.3% | 1 (0.3) | 0 (0.0) | 136 (36.5) | 75 (20.2) | 36 | PASS |
| Chapter 2: Chariots Aren't Evil—But They Aren't Ultimate | 4,249 | 4,208 | -1.0% | 3 (0.7) | 0 (0.0) | 123 (28.9) | 91 (21.6) | 42 | PASS |
| Chapter 3: The Messiah You Want vs. the Messiah You Need | 4,105 | 4,090 | -0.4% | 3 (0.7) | 0 (0.0) | 155 (37.8) | 103 (25.2) | 46 | PASS |
| Chapter 4: "Jesus Is Lord" | 4,674 | 4,661 | -0.3% | 2 (0.4) | 0 (0.0) | 125 (26.7) | 88 (18.9) | 31 | PASS |
| **All 5** | 18,515 | 18,412 | -0.6% | 12 (0.6) | 0 (0.0) | 628 (33.9) | 409 (22.2) | 180 | |

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


## Chapter 1: Zanah (`sec02.xhtml`)

Words 3,729 to 3,719. Em-dashes in his prose 1 to 0 (0.3 to 0.0 per 1,000 words). Tells 136 to 75 (36.5 to 20.2 per 1,000). Mean sentence 12.4 words to 15.7; sentences of eight words or fewer 46.0% to 29.3%; of five or fewer 28.8% to 15.1%. 36 edits; paragraphs 97 to 71. Paragraphs of fifteen words or fewer 28 to 10; runs of three fragments 13 to 2.

By kind (before to after): emdash 1 to 0, not_but 10 to 14, NotX.Y 22 to 4, triplet 10 to 14, frag3 13 to 2, anaphora 28 to 15, stock 2 to 2, intens 2 to 2, colon_reveal 2 to 1, short_close 17 to 11, one_line_para 28 to 10, forbidden 1 to 0.

Fact diff: **PASS**. Fixed blocks (headings, pull quote, block quotes, and the end matter: Key Takeaways, Reflection Questions, Practices, Sources & Notes) identical; 45 quoted strings, 19 Scripture references, 0 years, 5 numbers in digits, 24 number words, proper names by count, and 40 hedge words (after: 40) compared.

Five pairs:

1. Before: marriage. Not contract law. Not military desertion. Not commercial fraud. Marriage.
   After: marriage. Not contract law, not military desertion, not commercial fraud, but marriage.
2. Before: So they added. They added alliances with Egypt. They added treaties with Assyria. They added the military resources of foreign nations.
   After: So they added: alliances with Egypt, treaties with Assyria, the military resources of foreign nations.
3. Before: you do not throw God away. You simply add insurance. You do not deny the covenant. You supplement it. You do not leave the marriage. You bring someone else into the bed and tell yourself it is for the good of the family. And God's response is not indifference. It is not theological detachment.
   After: you do not throw God away; you simply add insurance. You do not deny the covenant; you supplement it. You do not leave the marriage; you bring someone else into the bed and tell yourself it is for the good of the family. And God's response is not indifference or theological detachment.
4. Before: God remembers the early days, when Israel trusted Him in the desert with nothing. No armies. No treaties. No chariots. No backup plan. Just manna falling from the sky each morning and a pillar of cloud leading through the wilderness.
   After: God remembers the early days, when Israel trusted Him in the desert with nothing: no armies, no treaties, no chariots, no backup plan, just manna falling from the sky each morning and a pillar of cloud leading through the wilderness.
5. Before: Because the God of Hosea is waiting. Not with folded arms and a lecture. With open arms and a feast. And the road home is shorter than you think.
   After: Because the God of Hosea is waiting, not with folded arms and a lecture but with open arms and a feast. And the road home is shorter than you think.

Left alone, and why. "The vows are still spoken. The heart has moved.", "But zanah is not atheism.", "Israel has not divorced Yahweh. Israel has brought another partner into the covenant bed and called it "strategy."", "It looks like Jesus plus the strongman.", "He asks them to come home." and "Name it. Confess it. And return." are verdicts on their own lines. The six diagnostic markers were not touched except for one word: the double standard ("When your side's leader lies, it is "strategy." When the other side's leader lies, it is "corruption."") is already measured the same both ways and stays word for word. The exegesis of Hosea 14 keeps its quoted phrases and their order ("Not "I will punish their apostasy." ... Heal."). The five "that is evidence" sentences were five paragraphs and are now one; no word changed. Forbidden list: "political leverage" is now "political influence".


## Chapter 2: Chariots Aren't Evil—But They Aren't Ultimate (`sec03.xhtml`)

Words 4,249 to 4,208. Em-dashes in his prose 3 to 0 (0.7 to 0.0 per 1,000 words). Tells 123 to 91 (28.9 to 21.6 per 1,000). Mean sentence 12.7 words to 15.3; sentences of eight words or fewer 41.5% to 30.6%; of five or fewer 21.8% to 11.2%. 42 edits; paragraphs 101 to 81. Paragraphs of fifteen words or fewer 17 to 7; runs of three fragments 6 to 0.

By kind (before to after): emdash 3 to 0, not_but 5 to 8, not_just 1 to 1, NotX.Y 9 to 5, isnt_its 1 to 1, triplet 18 to 21, frag3 6 to 0, anaphora 26 to 15, stock 3 to 3, intens 8 to 6, q_answered 8 to 7, colon_reveal 1 to 1, short_close 17 to 16, one_line_para 17 to 7.

Fact diff: **PASS**. Fixed blocks (headings, pull quote, block quotes, and the end matter: Key Takeaways, Reflection Questions, Practices, Sources & Notes) identical; 20 quoted strings, 8 Scripture references, 0 years, 2 numbers in digits, 21 number words, proper names by count, and 52 hedge words (after: 52) compared. A name that was the repeated subject of a stack and is now said once, by count before and after: Egypt 9 to 7.

Five pairs:

1. Before: Chariots can be used. Horses can be ridden. Military resources can be deployed. Political structures can be engaged.
   After: Chariots can be used, horses ridden, military resources deployed, political structures engaged.
2. Before: But the people who trusted in the name of the Lord? They stand. Not because they were passive. Not because they did nothing. But because their standing was never dependent on the chariot in the first place.
   After: But the people who trusted in the name of the Lord stand, not because they were passive or did nothing, but because their standing was never dependent on the chariot in the first place.
3. Before: The problem is not that Egypt exists. The problem is not that military alliances are available. The problem is the direction of the gaze. The posture of the heart. The location of trust.
   After: The problem is not that Egypt exists or that military alliances are available. The problem is the direction of the gaze, the posture of the heart, the location of trust.
4. Before: The king they are demanding will take. Their sons. Their daughters. Their land. Their wealth. Their freedom. The protector will become the predator. The savior will become the enslaver.
   After: The king they are demanding will take: their sons, their daughters, their land, their wealth, their freedom. The protector will become the predator, and the savior will become the enslaver.
5. Before: They engaged politics without worshiping it. They used the chariot without trusting it. They participated in civic life without making civic life ultimate. They held political convictions with deep seriousness and loose hands. They cared about outcomes without being defined by them.
   After: They engaged politics without worshiping it and used the chariot without trusting it. They participated in civic life without making civic life ultimate, held political convictions with deep seriousness and loose hands, and cared about outcomes without being defined by them.

Left alone, and why. "Every idol begins as a gift.", "And God condemns it.", "We have forgotten our Exodus. And we are running back to Egypt." and "Trust Him. And hold the chariot loosely." are verdicts on their own lines. His answer to "Are you saying Christians shouldn't be involved?" is his position and took paragraph joins only. The concession that some fears are legitimate ("Moral decline is real. Cultural hostility to Christianity is real. Legal threats to religious liberty are real. ...") is a fair statement of what the reader he is correcting sees, and stays in its four sentences. The six diagnostic questions were not touched. The six "It looks like ..." sentences were six paragraphs and are one; no word changed. "Precisely" went twice.


## Chapter 3: The Messiah You Want vs. the Messiah You Need (`sec04.xhtml`)

Words 4,105 to 4,090. Em-dashes in his prose 3 to 0 (0.7 to 0.0 per 1,000 words). Tells 155 to 103 (37.8 to 25.2 per 1,000). Mean sentence 11.5 words to 14.9; sentences of eight words or fewer 49.3% to 33.6%; of five or fewer 29.2% to 15.5%. 46 edits; paragraphs 110 to 79. Paragraphs of fifteen words or fewer 27 to 9; runs of three fragments 9 to 2.

By kind (before to after): emdash 3 to 0, not_but 7 to 14, NotX.Y 18 to 3, isnt_its 0 to 1, triplet 18 to 24, frag3 9 to 2, anaphora 33 to 22, stock 4 to 3, intens 5 to 4, q_answered 1 to 1, colon_reveal 3 to 3, short_close 26 to 17, one_line_para 27 to 9, forbidden 1 to 0.

Fact diff: **PASS**. Fixed blocks (headings, pull quote, block quotes, and the end matter: Key Takeaways, Reflection Questions, Practices, Sources & Notes) identical; 26 quoted strings, 22 Scripture references, 0 years, 14 numbers in digits, 40 number words, proper names by count, and 38 hedge words (after: 38) compared.

Five pairs:

1. Before: When Jesus arrived, He was not what they expected. He did not raise an army. He did not storm Herod's palace. He did not negotiate with Rome. He did not organize a political movement. Instead, He washed feet. He touched lepers. He ate with tax collectors and prostitutes. He welcomed children. He confronted the religious establishment. He wept over Jerusalem. He told parables about seeds and soil instead of strategy and siege warfare.
   After: When Jesus arrived, He was not what they expected. He did not raise an army, storm Herod's palace, negotiate with Rome, or organize a political movement. Instead, He washed feet and touched lepers. He ate with tax collectors and prostitutes and welcomed children. He confronted the religious establishment, wept over Jerusalem, and told parables about seeds and soil instead of strategy and siege warfare.
2. Before: Suffer. Be rejected. Be killed. Rise again. That is the messianic program. That is the plan. Not political conquest. Not military victory. Not cultural dominance. Suffering, rejection, death, and resurrection.
   After: Suffer, be rejected, be killed, rise again: that is the messianic program. That is the plan, not political conquest or military victory or cultural dominance, but suffering, rejection, death, and resurrection.
3. Before: Jesus calls Peter "Satan." Not an enemy. A disciple. Not someone who denies Christ. Someone who confesses Christ, and then tries to edit the kind of Christ he is willing to follow.
   After: Jesus calls Peter "Satan": not an enemy but a disciple, not someone who denies Christ but someone who confesses Christ, and then tries to edit the kind of Christ he is willing to follow.
4. Before: a non-anxious presence. Not indifferent to the crises around us. Not naive about the real threats and real suffering in our culture. But refusing to let anxiety set the agenda. Refusing to let fear rewrite our theology. Refusing to let the temperature of the political moment determine the posture of the people of God.
   After: a non-anxious presence, not indifferent to the crises around us or naive about the real threats and real suffering in our culture, but refusing to let anxiety set the agenda, refusing to let fear rewrite our theology, refusing to let the temperature of the political moment determine the posture of the people of God.
5. Before: That is the messiah the crowd wanted. That is the messiah Peter demanded. That is the messiah Satan offered in the wilderness.
   After: That is the messiah the crowd wanted, the messiah Peter demanded, the messiah Satan offered in the wilderness.

Left alone, and why. "Jesus ran from the crown.", "And Jesus said no.", "The crowd is celebrating. Jesus is weeping.", "Peter is not rejecting Jesus. He is editing Jesus." and "They chose the strongman over the servant. And they have not stopped choosing." are verdicts. The tempter's speech ("All the kingdoms. All the power. ... Skip all of that. Take the shortcut.") is speech and keeps its beat; so do the crowd's and Peter's thoughts. The paired contrasts of Palm Sunday ("They think He is coming to conquer. He knows He is coming to die.") are the passage's hinge. The answer to "What about justice?" is his position: paragraph joins and semicolons only. The four "anxious church / non-anxious church" pairs and the three "first messiah / second" pairs were one-line paragraphs and are now a paragraph each, word for word. The stock turn "Let that sink in." was taken out ("Let the audacity of this sink in." stays: it says what should sink in). Forbidden list: "the most transformative thing a leader can do" is now "the most powerful thing". One "precisely" went.


## Chapter 4: "Jesus Is Lord" (`sec05.xhtml`)

Words 4,674 to 4,661. Em-dashes in his prose 2 to 0 (0.4 to 0.0 per 1,000 words). Tells 125 to 88 (26.7 to 18.9 per 1,000). Mean sentence 13.6 words to 16.3; sentences of eight words or fewer 33.7% to 25.1%; of five or fewer 19.6% to 13.1%. 31 edits; paragraphs 87 to 80. Paragraphs of fifteen words or fewer 8 to 5; runs of three fragments 6 to 1.

By kind (before to after): emdash 2 to 0, not_but 13 to 14, not_just 1 to 1, NotX.Y 13 to 1, triplet 25 to 29, frag3 6 to 1, anaphora 27 to 11, stock 1 to 1, intens 9 to 9, colon_reveal 2 to 2, short_close 17 to 14, one_line_para 8 to 5, forbidden 1 to 0.

Fact diff: **PASS**. Fixed blocks (headings, pull quote, block quotes, and the end matter: Key Takeaways, Reflection Questions, Practices, Sources & Notes) identical; 53 quoted strings, 22 Scripture references, 0 years, 5 numbers in digits, 32 number words, proper names by count, and 52 hedge words (after: 52) compared.

Five pairs:

1. Before: We say it in worship songs. We print it on coffee mugs. We embroider it on throw pillows. We post it on social media with sunset backgrounds and curated fonts.
   After: We say it in worship songs, print it on coffee mugs, embroider it on throw pillows, and post it on social media with sunset backgrounds and curated fonts.
2. Before: They understood the gospel perfectly. Better, in fact, than many modern Christians do. The accusation is that the early Christians are proclaiming a rival king. Not a rival spiritual guru. Not a rival moral teacher. Not a rival source of personal peace and inner fulfillment. A rival king, one whose authority supersedes Caesar's, whose kingdom renders the Roman Empire penultimate, whose decrees override the decrees of the most powerful government on earth.
   After: They understood the gospel perfectly, better, in fact, than many modern Christians do. The accusation is that the early Christians are proclaiming a rival king: not a rival spiritual guru, not a rival moral teacher, not a rival source of personal peace and inner fulfillment, but a rival king, one whose authority supersedes Caesar's, whose kingdom renders the Roman Empire penultimate, whose decrees override the decrees of the most powerful government on earth.
3. Before: They were not forming a political party. They were not running candidates. They were not lobbying for legislative influence. They were not building a voting bloc. They were not making alliances with sympathetic Roman officials in exchange for protection and cultural power. They were worshiping. They were sharing meals. They were caring for the poor. They were telling the truth about who was actually in charge.
   After: They were not forming a political party, running candidates, lobbying for legislative influence, or building a voting bloc. They were not making alliances with sympathetic Roman officials in exchange for protection and cultural power. They were worshiping, sharing meals, caring for the poor, and telling the truth about who was actually in charge.
4. Before: Because if Jesus is truly Lord, then nothing else can be. Not America. Not a party. Not a candidate. Not a movement. Not an ideology. And if nothing else can be Lord, then you are free. Free from the tyranny of political tribalism. Free from the fear that the wrong election will undo the Kingdom of God. Free from the desperate need to control the levers of power in order to feel safe.
   After: Because if Jesus is truly Lord, then nothing else can be: not America, not a party, not a candidate, not a movement, not an ideology. And if nothing else can be Lord, then you are free: free from the tyranny of political tribalism, free from the fear that the wrong election will undo the Kingdom of God, free from the desperate need to control the levers of power in order to feel safe.
5. Before: He has already conquered. He has already been exalted. He has already been given the name above every name.
   After: He has already conquered, already been exalted, already been given the name above every name.

Left alone, and why. The paired contrasts in the Philippians section ("Rome said greatness comes through power. Paul says greatness comes through service." and the five after it) are the argument's form and stay as pairs. "Every knee will bow. Every tongue will confess. Jesus Christ is Lord." is the hymn's own cadence. "And everything changed.", "The domestication is complete. And it is killing us.", "He won by losing. He reigned by serving." and the last three sentences are verdicts. The test he sets both ways ("If "Jesus is Lord" does not challenge your politics, it is not functioning. If it only challenges the other side's politics, it is being weaponized, not confessed.") is word for word. The history of the Reformers ("Luther depended on German princes ...") is three statements of fact, left as three. Forbidden list: "did not leverage it for power" is now "did not exploit it for power".
