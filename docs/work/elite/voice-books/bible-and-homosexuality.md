# What Does the Bible Really Say About Homosexuality?: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the seventh book, What Does the Bible Really Say About Homosexuality? (id `bible-and-homosexuality`), edited in `content/books-src/bible-and-homosexuality/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit ed5c8080; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The method is the one recorded in `believe.md` and `the-reliability-of-scripture.md`, beside this file.

## Method

The book sets the traditional and the affirming readings of the six passages side by side, states each at its strongest, and then says where it lands; it is pastoral prose in long sentences, with 438 long dashes in the 43,508 words of his running prose (10.1 per 1,000 words, against his limit of 4 to 6) and very few fragment stacks. So the work was the dashes.

What an edit may be: an em-dash recast as a comma, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into one sentence where no new word is needed. Nothing else: no word was added, removed or replaced, and no sentence, fact, example or opinion was added or taken out. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff ed5c8080 -- content/books-src/bible-and-homosexuality/` shows every change). One commit per chapter. In the tables an "edit" is one changed paragraph, which may hold several dashes.

**How the dashes were worked, and what that means.** Unlike the first four books, the chapters were not each read whole before editing. Every long dash in his running prose was given a recast by one fixed rule: a pair of dashes around an aside became commas, or brackets where the aside itself holds a comma or a question; a single dash before "and", "but", "which", "because", "not" and the like became a comma; before an independent clause, a semicolon; before a list, a colon; otherwise a comma. Each proposal was then read in its sentence, and where the rule chose wrongly it was overridden (70 overrides in this book). The fact diff below is what proves nothing but punctuation moved.

**A contested subject, and the rule was strictest here.** Every statement of the traditional position, every statement of the affirming position (Brownson, Vines, Boswell), every concession, every steelman, every confession of the church's failure and every pastoral line took punctuation only, and the fact diff holds every quoted word, name, reference, number and hedge in place. Where the book criticizes both camps in parallel sentences, the dashes there were recast by the same rule. A parent's words that the book sets in quotation marks (chapter 11) keep their dashes, as all quotations do. The book has no line giving a reader a place to call for help, and none was added (see below).

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (the fact diff holds them fixed), and so does anything a chapter sets after its running prose (questions for reflection, takeaways, sources), which the fact diff also leaves out of the prose it checks.

Three scripts, kept outside the repo in `/home/user/vs5/t/` (`apply.py`, `factdiff.py`, `tells.py`, with `propose.py` for the rule), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Conversation the Church Keeps Getting Wrong | 3,726 | 3,726 | +0.0% | 34 (9.1) | 0 (0.0) | 92 (24.7) | 59 (15.8) | 24 | PASS |
| Chapter 1: What the Bible Actually Says About Homosexuality | 3,840 | 3,840 | +0.0% | 37 (9.6) | 0 (0.0) | 88 (22.9) | 53 (13.8) | 20 | PASS |
| Chapter 2: Sodom and Gomorrah | 2,931 | 2,931 | +0.0% | 29 (9.9) | 0 (0.0) | 61 (20.8) | 32 (10.9) | 20 | PASS |
| Chapter 3: Leviticus 18 and 20 | 2,223 | 2,223 | +0.0% | 21 (9.4) | 0 (0.0) | 48 (21.6) | 27 (12.1) | 14 | PASS |
| Chapter 4: Romans 1:26-27 Explained | 3,311 | 3,311 | +0.0% | 39 (11.8) | 0 (0.0) | 74 (22.3) | 38 (11.5) | 25 | PASS |
| Chapter 5: Arsenokoitai | 2,690 | 2,690 | +0.0% | 34 (12.6) | 0 (0.0) | 71 (26.4) | 38 (14.1) | 17 | PASS |
| Chapter 6: The Affirming Theology Case | 2,911 | 2,911 | +0.0% | 26 (8.9) | 0 (0.0) | 61 (21.0) | 36 (12.4) | 15 | PASS |
| Chapter 7: The Traditional Theology Case | 3,915 | 3,915 | +0.0% | 48 (12.3) | 0 (0.0) | 99 (25.3) | 52 (13.3) | 27 | PASS |
| Chapter 8: The Church's Catastrophic Failure | 2,897 | 2,897 | +0.0% | 30 (10.4) | 0 (0.0) | 84 (29.0) | 57 (19.7) | 21 | PASS |
| Chapter 9: Can You Be Gay and Christian? | 2,794 | 2,794 | +0.0% | 27 (9.7) | 0 (0.0) | 69 (24.7) | 43 (15.4) | 19 | PASS |
| Chapter 10: Same-Sex Marriage and the Law | 2,748 | 2,748 | +0.0% | 20 (7.3) | 0 (0.0) | 47 (17.1) | 27 (9.8) | 14 | PASS |
| Chapter 11: What to Say When Someone You Love Comes Out | 3,822 | 3,822 | +0.0% | 30 (7.8) | 0 (0.0) | 89 (23.3) | 59 (15.4) | 18 | PASS |
| Chapter 12: Building a Church That Tells the Truth and Loves Like Jesus | 3,994 | 3,994 | +0.0% | 46 (11.5) | 0 (0.0) | 119 (29.8) | 75 (18.8) | 25 | PASS |
| Conclusion: The Table Is Bigger Than the Argument | 1,706 | 1,706 | +0.0% | 17 (10.0) | 0 (0.0) | 57 (33.4) | 42 (24.6) | 14 | PASS |
| **All 14** | 43,508 | 43,508 | +0.0% | 438 (10.1) | 0 (0.0) | 1059 (24.3) | 638 (14.7) | 273 | |

## Introduction: The Conversation the Church Keeps Getting Wrong (`sec01.xhtml`)

Words 3,726 to 3,726. Em-dashes in his prose 34 to 0 (9.1 to 0.0 per 1,000 words). Tells 92 to 59 (24.7 to 15.8 per 1,000). Mean sentence 19.8 words to 19.8; sentences of eight words or fewer 29.3% to 29.3%; of five or fewer 16.5% to 16.5%. 24 edits; paragraphs 34 to 34. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 34 to 0, not_but 12 to 12, not_just 1 to 1, NotX.Y 3 to 3, isnt_its 1 to 1, triplet 8 to 8, anaphora 15 to 15, stock 4 to 4, intens 2 to 2, colon_reveal 1 to 2, short_close 11 to 11.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 4 quoted strings, 0 Scripture references, 1 years, 3 numbers in digits, 49 number words, proper names by count, and 64 hedge words (after: 64) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: When we reduce any human being to their sexuality — when we treat their identity as a problem to be solved or a position to defend — we have already failed the gospel, and it does not matter whether we fail while being harsh or while being affirming.
   After: When we reduce any human being to their sexuality, when we treat their identity as a problem to be solved or a position to defend, we have already failed the gospel, and it does not matter whether we fail while being harsh or while being affirming.
2. Before: I have tried to hold all of it at once — that Scripture takes sexuality seriously, that the church has often been hypocritical about it, and that the answer to hypocrisy is not to lower the standard but to actually live by it.
   After: I have tried to hold all of it at once: that Scripture takes sexuality seriously, that the church has often been hypocritical about it, and that the answer to hypocrisy is not to lower the standard but to actually live by it.
3. Before: These are the people who sit in counseling offices, who lie awake at night trying to hold together faith and identity, who have been told by the church that love and truth are in conflict — the people paying the price for the church's failure to think carefully.
   After: These are the people who sit in counseling offices, who lie awake at night trying to hold together faith and identity, who have been told by the church that love and truth are in conflict; the people paying the price for the church's failure to think carefully.
4. Before: Instead, many churches doubled down, becoming more insistent on traditional theology and interpreting it as a form of political resistance — supporting traditional theology as a way of saying we will not be pushed around by secular culture.
   After: Instead, many churches doubled down, becoming more insistent on traditional theology and interpreting it as a form of political resistance, supporting traditional theology as a way of saying we will not be pushed around by secular culture.
5. Before: We have decided that because we got the love part so wrong for so long, we need to get the truth part wrong too — and that is trading one failure for another, which the gospel will not allow.
   After: We have decided that because we got the love part so wrong for so long, we need to get the truth part wrong too, and that is trading one failure for another, which the gospel will not allow.


## Chapter 1: What the Bible Actually Says About Homosexuality (`sec02.xhtml`)

Words 3,840 to 3,840. Em-dashes in his prose 37 to 0 (9.6 to 0.0 per 1,000 words). Tells 88 to 53 (22.9 to 13.8 per 1,000). Mean sentence 20.9 words to 20.9; sentences of eight words or fewer 20.4% to 20.4%; of five or fewer 10.5% to 10.5%. 20 edits; paragraphs 34 to 34. Paragraphs of fifteen words or fewer 2 to 2; runs of three fragments 0 to 0.

By kind (before to after): emdash 37 to 0, not_but 11 to 11, NotX.Y 4 to 4, isnt_its 2 to 2, triplet 12 to 13, anaphora 2 to 2, stock 5 to 5, intens 5 to 5, q_answered 1 to 1, colon_reveal 3 to 4, short_close 4 to 4, one_line_para 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 20 quoted strings, 31 Scripture references, 0 years, 35 numbers in digits, 47 number words, proper names by count, and 89 hedge words (after: 89) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: This is harder than it sounds, because we have spent decades hearing these passages through layers of cultural assumption, tribal interpretation, and selective emphasis — treating some texts as clear and others as obscure depending on which conclusion we want, quoting some verses in isolation while ignoring others, doing exegetical gymnastics to avoid facing what the text actually says.
   After: This is harder than it sounds, because we have spent decades hearing these passages through layers of cultural assumption, tribal interpretation, and selective emphasis, treating some texts as clear and others as obscure depending on which conclusion we want, quoting some verses in isolation while ignoring others, doing exegetical gymnastics to avoid facing what the text actually says.
2. Before: But first you need to know exactly what Scripture says, and you need to have read it — not through a commentary filter, not through what you were told it says, but the words as they actually claim.
   After: But first you need to know exactly what Scripture says, and you need to have read it, not through a commentary filter, not through what you were told it says, but the words as they actually claim.
3. Before: The affirming scholars, James Brownson and Justin Vines, argue that Paul's language of "nature" is more complex than a simple appeal to creation order; in Stoic thought "nature" could refer to the individual person's natural inclination, so perhaps Paul is describing people acting against their own nature — those naturally oriented toward opposite-sex partners now acting against that.
   After: The affirming scholars, James Brownson and Justin Vines, argue that Paul's language of "nature" is more complex than a simple appeal to creation order; in Stoic thought "nature" could refer to the individual person's natural inclination, so perhaps Paul is describing people acting against their own nature: those naturally oriented toward opposite-sex partners now acting against that.
4. Before: The idea here is that Scripture represents a movement toward redemption — toward greater justice, greater inclusion, greater care for the vulnerable — and that the trajectory of Scripture moves toward liberation.
   After: The idea here is that Scripture represents a movement toward redemption (toward greater justice, greater inclusion, greater care for the vulnerable) and that the trajectory of Scripture moves toward liberation.
5. Before: Another answer is that different interpretive methods can yield different conclusions, and that this is part of how the church works — the church has multiple traditions, different traditions read Scripture differently, and that is not a problem to solve but how the church functions.
   After: Another answer is that different interpretive methods can yield different conclusions, and that this is part of how the church works; the church has multiple traditions, different traditions read Scripture differently, and that is not a problem to solve but how the church functions.


## Chapter 2: Sodom and Gomorrah (`sec03.xhtml`)

Words 2,931 to 2,931. Em-dashes in his prose 29 to 0 (9.9 to 0.0 per 1,000 words). Tells 61 to 32 (20.8 to 10.9 per 1,000). Mean sentence 19.8 words to 19.8; sentences of eight words or fewer 18.5% to 18.5%; of five or fewer 11.0% to 11.0%. 20 edits; paragraphs 28 to 28. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 29 to 0, not_but 2 to 2, NotX.Y 1 to 1, isnt_its 2 to 2, triplet 15 to 15, anaphora 4 to 4, stock 3 to 3, intens 2 to 2, q_answered 1 to 1, short_close 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 9 quoted strings, 26 Scripture references, 0 years, 20 numbers in digits, 17 number words, proper names by count, and 80 hedge words (after: 80) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: If the men of Sodom were simply seeking to rape someone — which is what the demand is — Lot's offer makes a terrible kind of sense; he is trying to redirect their violent intention toward his daughters, a horrifying suggestion, but one that would be understood in that context as an alternative to the violence they are threatening.
   After: If the men of Sodom were simply seeking to rape someone (which is what the demand is), Lot's offer makes a terrible kind of sense; he is trying to redirect their violent intention toward his daughters, a horrifying suggestion, but one that would be understood in that context as an alternative to the violence they are threatening.
2. Before: Genesis 19 and Judges 19 use nearly identical language — the same demand, the same structure, the same offering of an alternative — but Judges 19 is explicitly and unambiguously about sexual violence and the violation of hospitality codes; it is not even claimed by anyone to be about homosexuality.
   After: Genesis 19 and Judges 19 use nearly identical language (the same demand, the same structure, the same offering of an alternative), but Judges 19 is explicitly and unambiguously about sexual violence and the violation of hospitality codes; it is not even claimed by anyone to be about homosexuality.
3. Before: The Assyrian Laws contain a prohibition against male same-sex behavior, and the penalty is severe — it involves mutilation — but the prohibition appears only in Assyrian law; the Code of Hammurabi does not mention same-sex behavior, and neither do the Hittite Laws.
   After: The Assyrian Laws contain a prohibition against male same-sex behavior, and the penalty is severe (it involves mutilation), but the prohibition appears only in Assyrian law; the Code of Hammurabi does not mention same-sex behavior, and neither do the Hittite Laws.
4. Before: What we can say based on comparative law is that sexual prohibitions are culture-specific — what one society prohibits, another permits; what is unthinkable in one context is normal in another.
   After: What we can say based on comparative law is that sexual prohibitions are culture-specific; what one society prohibits, another permits; what is unthinkable in one context is normal in another.
5. Before: Using Sodom as your proof text for opposition to same-sex relationships is weak exegesis — weaker than the traditional position deserves.
   After: Using Sodom as your proof text for opposition to same-sex relationships is weak exegesis, weaker than the traditional position deserves.


## Chapter 3: Leviticus 18 and 20 (`sec04.xhtml`)

Words 2,223 to 2,223. Em-dashes in his prose 21 to 0 (9.4 to 0.0 per 1,000 words). Tells 48 to 27 (21.6 to 12.1 per 1,000). Mean sentence 20.8 words to 20.8; sentences of eight words or fewer 23.8% to 23.8%; of five or fewer 7.6% to 7.6%. 14 edits; paragraphs 19 to 19. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 21 to 0, not_but 3 to 3, triplet 12 to 12, anaphora 4 to 4, intens 2 to 2, q_answered 1 to 1, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 7 quoted strings, 22 Scripture references, 0 years, 12 numbers in digits, 35 number words, proper names by count, and 47 hedge words (after: 47) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: This matters, because the church has used the word to suggest that same-sex behavior is categorically worse than other sexual violations—and that is not what the Hebrew supports.
   After: This matters, because the church has used the word to suggest that same-sex behavior is categorically worse than other sexual violations, and that is not what the Hebrew supports.
2. Before: Most of these prohibitions, we believe, carry forward—grounded in creation order, in the structure of human sexuality, or in the dignity of persons.
   After: Most of these prohibitions, we believe, carry forward: grounded in creation order, in the structure of human sexuality, or in the dignity of persons.
3. Before: Second, the sexual prohibitions are grounded differently than the dietary ones—the sexual prohibitions appear in contexts discussing God's design for humanity, while the dietary prohibitions appear in contexts discussing Israel's separation and holiness, so even within the same code they may function differently. Third, the prohibited sexual behaviors—incest, bestiality, same-sex relations—involve fundamental questions about the structure of sexuality and family, while the prohibited foods raise no comparable question about human nature or design.
   After: Second, the sexual prohibitions are grounded differently than the dietary ones: the sexual prohibitions appear in contexts discussing God's design for humanity, while the dietary prohibitions appear in contexts discussing Israel's separation and holiness, so even within the same code they may function differently. Third, the prohibited sexual behaviors (incest, bestiality, same-sex relations) involve fundamental questions about the structure of sexuality and family, while the prohibited foods raise no comparable question about human nature or design.
4. Before: You can also read Leviticus as a law code specific to Israel's holiness system, where the same-sex prohibition was part of maintaining Israel's distinct identity—a reading in which the law retains historical and theological importance but is not necessarily binding on Christians the way the prohibition on murder is binding.
   After: You can also read Leviticus as a law code specific to Israel's holiness system, where the same-sex prohibition was part of maintaining Israel's distinct identity, a reading in which the law retains historical and theological importance but is not necessarily binding on Christians the way the prohibition on murder is binding.
5. Before: The conversation must continue—not because Leviticus is unclear, but because Leviticus belongs to a larger biblical system that Christians have had to interpret carefully for two thousand years.
   After: The conversation must continue, not because Leviticus is unclear, but because Leviticus belongs to a larger biblical system that Christians have had to interpret carefully for two thousand years.


## Chapter 4: Romans 1:26-27 Explained (`sec05.xhtml`)

Words 3,311 to 3,311. Em-dashes in his prose 39 to 0 (11.8 to 0.0 per 1,000 words). Tells 74 to 38 (22.3 to 11.5 per 1,000). Mean sentence 21.1 words to 21.1; sentences of eight words or fewer 19.4% to 19.4%; of five or fewer 8.4% to 8.4%. 25 edits; paragraphs 32 to 32. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 39 to 0, not_but 11 to 11, not_just 1 to 1, NotX.Y 1 to 1, isnt_its 6 to 6, triplet 5 to 8, stock 2 to 2, intens 4 to 4, q_answered 2 to 2, short_close 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 14 quoted strings, 27 Scripture references, 0 years, 39 numbers in digits, 20 number words, proper names by count, and 79 hedge words (after: 79) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: It is the strongest argument in the entire biblical case for a traditional sexual ethic — and it is also the passage where the most sophisticated affirming arguments are made.
   After: It is the strongest argument in the entire biblical case for a traditional sexual ethic, and it is also the passage where the most sophisticated affirming arguments are made.
2. Before: Romans 1 is not primarily about cataloguing sexual sin; it is about establishing that all humanity — both Gentiles and Jews — stands under God's judgment.
   After: Romans 1 is not primarily about cataloguing sexual sin; it is about establishing that all humanity, both Gentiles and Jews, stands under God's judgment.
3. Before: He is condemning that specific behavior, not making a universal statement about all same-sex relations — especially not about modern relationships characterized by mutual love and commitment.
   After: He is condemning that specific behavior, not making a universal statement about all same-sex relations, especially not about modern relationships characterized by mutual love and commitment.
4. Before: Paul begins with the Gentiles, and the audience — both Jewish and Gentile Christians in Rome — agrees with the condemnation.
   After: Paul begins with the Gentiles, and the audience, both Jewish and Gentile Christians in Rome, agrees with the condemnation.
5. Before: The question is what we conclude from that about same-sex relationships characterized by mutual love, commitment, and covenant — relationships Paul almost certainly never encountered and could not have imagined in his first-century context.
   After: The question is what we conclude from that about same-sex relationships characterized by mutual love, commitment, and covenant, relationships Paul almost certainly never encountered and could not have imagined in his first-century context.


## Chapter 5: Arsenokoitai (`sec06.xhtml`)

Words 2,690 to 2,690. Em-dashes in his prose 34 to 0 (12.6 to 0.0 per 1,000 words). Tells 71 to 38 (26.4 to 14.1 per 1,000). Mean sentence 22.6 words to 22.6; sentences of eight words or fewer 14.5% to 14.5%; of five or fewer 7.7% to 7.7%. 17 edits; paragraphs 22 to 22. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 34 to 0, not_but 1 to 1, not_just 1 to 1, isnt_its 2 to 2, triplet 11 to 12, anaphora 4 to 4, stock 6 to 6, intens 4 to 4, q_answered 1 to 1, colon_reveal 3 to 3, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 26 quoted strings, 11 Scripture references, 3 years, 19 numbers in digits, 30 number words, proper names by count, and 73 hedge words (after: 73) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The Greek word arsenokoitai appears in 1 Corinthians 6:9 and 1 Timothy 1:10, and it is used nowhere else in ancient Greek literature—at least not before Paul.
   After: The Greek word arsenokoitai appears in 1 Corinthians 6:9 and 1 Timothy 1:10, and it is used nowhere else in ancient Greek literature, at least not before Paul.
2. Before: If Paul is condemning pederasty—the sexual exploitation of minors—then his argument carries one weight, and we absolutely oppose the sexual abuse of children.
   After: If Paul is condemning pederasty, the sexual exploitation of minors, then his argument carries one weight, and we absolutely oppose the sexual abuse of children.
3. Before: In the Greco-Roman world, pederasty involved real power differentials—an adult male and an adolescent male, where the youth could not meaningfully consent and the adult held social and physical power.
   After: In the Greco-Roman world, pederasty involved real power differentials, an adult male and an adolescent male, where the youth could not meaningfully consent and the adult held social and physical power.
4. Before: But by 1946 the concept of homosexuality existed—Sigmund Freud had written about it, medical literature discussed it—and it became possible to translate arsenokoitai not as "men who bed men" but as "homosexuals," a reference to people with a homosexual identity.
   After: But by 1946 the concept of homosexuality existed (Sigmund Freud had written about it, medical literature discussed it) and it became possible to translate arsenokoitai not as "men who bed men" but as "homosexuals," a reference to people with a homosexual identity.
5. Before: For understanding what Paul actually wrote, reading an older translation like the KJV—more literal, even if harder to follow—might be more helpful than reading a modern translation that renders the term interpretively.
   After: For understanding what Paul actually wrote, reading an older translation like the KJV (more literal, even if harder to follow) might be more helpful than reading a modern translation that renders the term interpretively.


## Chapter 6: The Affirming Theology Case (`sec07.xhtml`)

Words 2,911 to 2,911. Em-dashes in his prose 26 to 0 (8.9 to 0.0 per 1,000 words). Tells 61 to 36 (21.0 to 12.4 per 1,000). Mean sentence 28.4 words to 28.4; sentences of eight words or fewer 11.8% to 11.8%; of five or fewer 4.9% to 4.9%. 15 edits; paragraphs 24 to 24. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 26 to 0, not_but 8 to 8, not_just 2 to 2, triplet 12 to 13, intens 12 to 12, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 4 quoted strings, 6 Scripture references, 0 years, 3 numbers in digits, 20 number words, proper names by count, and 54 hedge words (after: 54) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The traditional response concedes that trajectory matters but insists it cannot override what Scripture explicitly commands — and it presses on the assumption that Scripture is moving in a direction beyond what it actually states, an assumption that remains contested.
   After: The traditional response concedes that trajectory matters but insists it cannot override what Scripture explicitly commands, and it presses on the assumption that Scripture is moving in a direction beyond what it actually states, an assumption that remains contested.
2. Before: This argument has force because it attends to context — you cannot read any ancient text without understanding its world.
   After: This argument has force because it attends to context; you cannot read any ancient text without understanding its world.
3. Before: Some hold that same-sex couples express difference in other ways — personality, gifts, strengths — even where not in gender; others read the creation account as describing the diversity of humanity rather than prescribing a single form for sexuality.
   After: Some hold that same-sex couples express difference in other ways (personality, gifts, strengths) even where not in gender; others read the creation account as describing the diversity of humanity rather than prescribing a single form for sexuality.
4. Before: To penetrate someone was honorable, an assertion of status; to be penetrated was shameful, a loss of it — and this was about social position as much as the sexual act itself.
   After: To penetrate someone was honorable, an assertion of status; to be penetrated was shameful, a loss of it, and this was about social position as much as the sexual act itself.
5. Before: It is between people using different hermeneutical grids and reaching different conclusions, each able to claim fidelity to Scripture, each able to point to textual evidence — because the evidence is not self-interpreting and requires frameworks, assumptions, theological work.
   After: It is between people using different hermeneutical grids and reaching different conclusions, each able to claim fidelity to Scripture, each able to point to textual evidence, because the evidence is not self-interpreting and requires frameworks, assumptions, theological work.


## Chapter 7: The Traditional Theology Case (`sec08.xhtml`)

Words 3,915 to 3,915. Em-dashes in his prose 48 to 0 (12.3 to 0.0 per 1,000 words). Tells 99 to 52 (25.3 to 13.3 per 1,000). Mean sentence 22.7 words to 22.7; sentences of eight words or fewer 23.3% to 23.3%; of five or fewer 14.0% to 14.0%. 27 edits; paragraphs 33 to 33. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 48 to 0, not_but 15 to 15, not_just 1 to 1, NotX.Y 6 to 6, isnt_its 1 to 1, triplet 13 to 14, frag3 1 to 1, anaphora 4 to 4, stock 2 to 2, intens 2 to 2, colon_reveal 1 to 1, short_close 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 6 quoted strings, 5 Scripture references, 1 years, 7 numbers in digits, 44 number words, proper names by count, and 64 hedge words (after: 64) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The affirming response is that this reading assumes a heterosexual world and does not account for people with same-sex orientation; the traditional counter is that the argument was never about individual feeling or orientation in the first place — it is about what God created and designed, and the created order stands regardless of how individuals experience desire.
   After: The affirming response is that this reading assumes a heterosexual world and does not account for people with same-sex orientation; the traditional counter is that the argument was never about individual feeling or orientation in the first place; it is about what God created and designed, and the created order stands regardless of how individuals experience desire.
2. Before: What he demonstrates is that people can live faithfully within traditional theology without self-hatred — acknowledging their experience honestly while maintaining theological conviction, belonging to the church without pretending their experience matches heterosexual norms.
   After: What he demonstrates is that people can live faithfully within traditional theology without self-hatred, acknowledging their experience honestly while maintaining theological conviction, belonging to the church without pretending their experience matches heterosexual norms.
3. Before: Fourth, it would require financial support, because celibacy sometimes makes earning a living harder — you might not be able to relocate for career reasons, you might be caring for others, you might be sacrificing earning potential — and a community that calls people to celibacy should provide support when necessary.
   After: Fourth, it would require financial support, because celibacy sometimes makes earning a living harder (you might not be able to relocate for career reasons, you might be caring for others, you might be sacrificing earning potential) and a community that calls people to celibacy should provide support when necessary.
4. Before: Six, public recognition — not private welcome but public affirmation; do not hide celibate Christians but celebrate them, showing that celibacy is a viable calling.
   After: Six, public recognition, not private welcome but public affirmation; do not hide celibate Christians but celebrate them, showing that celibacy is a viable calling.
5. Before: the call to love your neighbor as yourself — the neighbor you actually disagree with, whose future you cannot control, whose choice you cannot fully understand.
   After: the call to love your neighbor as yourself, the neighbor you actually disagree with, whose future you cannot control, whose choice you cannot fully understand.


## Chapter 8: The Church's Catastrophic Failure (`sec09.xhtml`)

Words 2,897 to 2,897. Em-dashes in his prose 30 to 0 (10.4 to 0.0 per 1,000 words). Tells 84 to 57 (29.0 to 19.7 per 1,000). Mean sentence 19.1 words to 19.1; sentences of eight words or fewer 32.2% to 32.2%; of five or fewer 16.1% to 16.1%. 21 edits; paragraphs 26 to 26. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 30 to 0, not_but 12 to 12, not_just 3 to 3, NotX.Y 8 to 8, isnt_its 1 to 1, triplet 14 to 16, anaphora 4 to 4, stock 2 to 2, colon_reveal 0 to 1, short_close 10 to 10.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 7 quoted strings, 4 Scripture references, 1 years, 1 numbers in digits, 18 number words, proper names by count, and 60 hedge words (after: 60) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: I am speaking from twenty years of ministry, from conversations with people whose lives have been fractured by the church's response to their sexuality — and what follows is not a verdict on which theology is correct but an accounting of what the church has done to real people in the name of Jesus.
   After: I am speaking from twenty years of ministry, from conversations with people whose lives have been fractured by the church's response to their sexuality, and what follows is not a verdict on which theology is correct but an accounting of what the church has done to real people in the name of Jesus.
2. Before: Not always explicitly, but the message has been clear — if your child is gay, you are responsible for getting them to repent, and if they refuse, you may need to separate from them to maintain your witness.
   After: Not always explicitly, but the message has been clear, if your child is gay, you are responsible for getting them to repent, and if they refuse, you may need to separate from them to maintain your witness.
3. Before: The church bears responsibility not only for the programs but for the theology that made them possible — the theology that said same-sex attraction is sinful, that change is possible, that if you have enough faith you will change.
   After: The church bears responsibility not only for the programs but for the theology that made them possible: the theology that said same-sex attraction is sinful, that change is possible, that if you have enough faith you will change.
4. Before: When American churches support the continuation of these laws, they are perpetuating colonial structures — saying, in effect, that the laws against same-sex people, which came from our colonization of these countries, should remain.
   After: When American churches support the continuation of these laws, they are perpetuating colonial structures, saying, in effect, that the laws against same-sex people, which came from our colonization of these countries, should remain.
5. Before: It means expressing genuine remorse — not "I'm sorry if anyone was offended," which is not an apology, but "We were wrong, we harmed people, and we regret it. It means making restitution where possible, which is the hardest part, because you cannot undo harm — but you can provide real support, create genuine welcome, and honor people's identities even while you maintain theological disagreement about behavior.
   After: It means expressing genuine remorse, not "I'm sorry if anyone was offended," which is not an apology, but "We were wrong, we harmed people, and we regret it. It means making restitution where possible, which is the hardest part, because you cannot undo harm, but you can provide real support, create genuine welcome, and honor people's identities even while you maintain theological disagreement about behavior.


## Chapter 9: Can You Be Gay and Christian? (`sec10.xhtml`)

Words 2,794 to 2,794. Em-dashes in his prose 27 to 0 (9.7 to 0.0 per 1,000 words). Tells 69 to 43 (24.7 to 15.4 per 1,000). Mean sentence 19.4 words to 19.4; sentences of eight words or fewer 19.0% to 19.0%; of five or fewer 10.6% to 10.6%. 19 edits; paragraphs 26 to 26. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 27 to 0, not_but 4 to 4, NotX.Y 2 to 2, isnt_its 4 to 4, triplet 13 to 14, anaphora 2 to 2, intens 4 to 4, q_answered 5 to 5, colon_reveal 4 to 4, short_close 4 to 4.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 15 quoted strings, 0 Scripture references, 0 years, 2 numbers in digits, 25 number words, proper names by count, and 70 hedge words (after: 70) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: In affirming communities, gay Christians are encouraged to accept their orientation as a gift, told their sexuality is not sinful, and welcomed into full participation in church life—they can marry, they can lead, they can be fully integrated into the community.
   After: In affirming communities, gay Christians are encouraged to accept their orientation as a gift, told their sexuality is not sinful, and welcomed into full participation in church life; they can marry, they can lead, they can be fully integrated into the community.
2. Before: When we say someone is gay, are we describing their behavior, their attraction, their identity, their community—or all of the above?
   After: When we say someone is gay, are we describing their behavior, their attraction, their identity, their community, or all of the above?
3. Before: That position allows for honest acknowledgment of experience—you did not choose your orientation, your desires are real, but your response is yours to make.
   After: That position allows for honest acknowledgment of experience; you did not choose your orientation, your desires are real, but your response is yours to make.
4. Before: That depends on your theology and your community's theology—but the starting point is acceptance, not condemnation.
   After: That depends on your theology and your community's theology, but the starting point is acceptance, not condemnation.
5. Before: But the next questions—how will you live out that reality, what community will support you, what role will your sexuality play in your identity, how will you remain faithful to Scripture and to yourself—are questions only you can answer, with prayer, with community, and with humility about the fact that this is genuinely difficult terrain.
   After: But the next questions (how will you live out that reality, what community will support you, what role will your sexuality play in your identity, how will you remain faithful to Scripture and to yourself) are questions only you can answer, with prayer, with community, and with humility about the fact that this is genuinely difficult terrain.


## Chapter 10: Same-Sex Marriage and the Law (`sec11.xhtml`)

Words 2,748 to 2,748. Em-dashes in his prose 20 to 0 (7.3 to 0.0 per 1,000 words). Tells 47 to 27 (17.1 to 9.8 per 1,000). Mean sentence 24.5 words to 24.5; sentences of eight words or fewer 10.7% to 10.7%; of five or fewer 5.4% to 5.4%. 14 edits; paragraphs 24 to 24. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 20 to 0, not_but 5 to 5, triplet 8 to 8, anaphora 6 to 6, stock 1 to 1, intens 6 to 6, short_close 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 5 quoted strings, 1 Scripture references, 6 years, 7 numbers in digits, 32 number words, proper names by count, and 39 hedge words (after: 39) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: If the government can require Christians to perform actions that violate their conscience—even when the action is "civil," like a marriage ceremony, rather than "religious," like a sacrament—then conscience protections are at risk. There have been cases of wedding vendors—florists, bakers, photographers—who refused to provide services for same-sex weddings on religious grounds; some have been sued, and some have lost.
   After: If the government can require Christians to perform actions that violate their conscience (even when the action is "civil," like a marriage ceremony, rather than "religious," like a sacrament) then conscience protections are at risk. There have been cases of wedding vendors (florists, bakers, photographers) who refused to provide services for same-sex weddings on religious grounds; some have been sued, and some have lost.
2. Before: But it is also a distinction that can be easily abused, because what counts as "participation" is genuinely unclear—does selling a product to someone constitute participation in their life choices?
   After: But it is also a distinction that can be easily abused, because what counts as "participation" is genuinely unclear, does selling a product to someone constitute participation in their life choices?
3. Before: The line is drawn between religion protecting itself and religion discriminating in the marketplace—civil equality in public law, religious freedom for religious organizations.
   After: The line is drawn between religion protecting itself and religion discriminating in the marketplace, civil equality in public law, religious freedom for religious organizations.
4. Before: The tension keeps focusing on individual conscience exemptions—a florist who will not provide flowers for a same-sex wedding, a baker who will not make a cake, a photographer who will not photograph a same-sex ceremony.
   After: The tension keeps focusing on individual conscience exemptions: a florist who will not provide flowers for a same-sex wedding, a baker who will not make a cake, a photographer who will not photograph a same-sex ceremony.
5. Before: The legal question is real and important, and the law can protect rights—but it cannot create the respect and dignity that genuine pluralism requires; that has to come from people choosing to treat each other well despite disagreement.
   After: The legal question is real and important, and the law can protect rights, but it cannot create the respect and dignity that genuine pluralism requires; that has to come from people choosing to treat each other well despite disagreement.


## Chapter 11: What to Say When Someone You Love Comes Out (`sec12.xhtml`)

Words 3,822 to 3,822. Em-dashes in his prose 30 to 0 (7.8 to 0.0 per 1,000 words). Tells 89 to 59 (23.3 to 15.4 per 1,000). Mean sentence 15.9 words to 15.9; sentences of eight words or fewer 31.2% to 31.2%; of five or fewer 15.1% to 15.1%. 18 edits; paragraphs 30 to 30. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 30 to 0, not_but 14 to 14, not_just 1 to 1, isnt_its 3 to 3, triplet 6 to 6, frag3 1 to 1, anaphora 12 to 12, stock 4 to 4, intens 1 to 1, q_answered 1 to 1, colon_reveal 2 to 2, short_close 14 to 14.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 63 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 42 number words, proper names by count, and 99 hedge words (after: 99) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: That construction is a classic bait-and-switch — "I love you, but I cannot support your identity," "I love you, but this is sinful" — and the but erases the love.
   After: That construction is a classic bait-and-switch ("I love you, but I cannot support your identity," "I love you, but this is sinful") and the but erases the love.
2. Before: It will not be easy, and you may not agree, but you will maintain the relationship, and your child will know they are loved — and that is what matters most.
   After: It will not be easy, and you may not agree, but you will maintain the relationship, and your child will know they are loved, and that is what matters most.
3. Before: The seventh is comparing their identity to other sins — "Well, I struggle with lust too," "We all have temptations.
   After: The seventh is comparing their identity to other sins: "Well, I struggle with lust too," "We all have temptations.
4. Before: Another temptation is to maintain certainty about your theology and assume your child will eventually come back — she will grow up, she will realize that being gay and Christian is impossible, she will return to the faith.
   After: Another temptation is to maintain certainty about your theology and assume your child will eventually come back: she will grow up, she will realize that being gay and Christian is impossible, she will return to the faith.
5. Before: Third, change — not just different rhetoric but different practices, different theology taught with different emphasis, different pastoral care.
   After: Third, change, not just different rhetoric but different practices, different theology taught with different emphasis, different pastoral care.


## Chapter 12: Building a Church That Tells the Truth and Loves Like Jesus (`sec13.xhtml`)

Words 3,994 to 3,994. Em-dashes in his prose 46 to 0 (11.5 to 0.0 per 1,000 words). Tells 119 to 75 (29.8 to 18.8 per 1,000). Mean sentence 20.3 words to 20.3; sentences of eight words or fewer 27.5% to 27.5%; of five or fewer 13.7% to 13.7%. 25 edits; paragraphs 30 to 30. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 46 to 0, not_but 16 to 16, not_just 2 to 2, NotX.Y 2 to 2, isnt_its 3 to 3, triplet 16 to 17, anaphora 10 to 10, stock 1 to 1, intens 7 to 7, colon_reveal 4 to 5, short_close 7 to 7, forbidden 5 to 5.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 17 quoted strings, 1 Scripture references, 1 years, 1 numbers in digits, 22 number words, proper names by count, and 63 hedge words (after: 63) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Some churches are beginning to explore what might be called the "third way" — churches that hold a traditional sexual ethic, that sex within male-female marriage is God's design, while simultaneously being the safest, most welcoming place in the world for LGBTQ+ people.
   After: Some churches are beginning to explore what might be called the "third way", churches that hold a traditional sexual ethic, that sex within male-female marriage is God's design, while simultaneously being the safest, most welcoming place in the world for LGBTQ+ people.
2. Before: A better approach reduces the emphasis on sexual purity altogether and instead emphasizes integrity, honesty, faithfulness, and respect — the character you want your youth to develop, treating people with dignity, the values that matter across all relationships.
   After: A better approach reduces the emphasis on sexual purity altogether and instead emphasizes integrity, honesty, faithfulness, and respect, the character you want your youth to develop, treating people with dignity, the values that matter across all relationships.
3. Before: That requires courage from leadership, because it means facing criticism from traditionalist churches that believe LGBTQ+ people should not be hired — but Bridgetown has done it.
   After: That requires courage from leadership, because it means facing criticism from traditionalist churches that believe LGBTQ+ people should not be hired, but Bridgetown has done it.
4. Before: I mean spiritually unsafe — the casual jokes, the assumptions, the way "homosexuality" was discussed as a sin that belonged in a different category than the others.
   After: I mean spiritually unsafe: the casual jokes, the assumptions, the way "homosexuality" was discussed as a sin that belonged in a different category than the others.
5. Before: I have been reshaped by these people — not because they convinced me to change my theology, but because they showed me that theology alone is an incomplete response to the theological crisis before us.
   After: I have been reshaped by these people, not because they convinced me to change my theology, but because they showed me that theology alone is an incomplete response to the theological crisis before us.


## Conclusion: The Table Is Bigger Than the Argument (`sec14.xhtml`)

Words 1,706 to 1,706. Em-dashes in his prose 17 to 0 (10.0 to 0.0 per 1,000 words). Tells 57 to 42 (33.4 to 24.6 per 1,000). Mean sentence 14.4 words to 14.4; sentences of eight words or fewer 44.4% to 44.4%; of five or fewer 26.5% to 26.5%. 14 edits; paragraphs 21 to 21. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 17 to 0, not_but 4 to 4, not_just 2 to 2, NotX.Y 8 to 8, isnt_its 1 to 1, triplet 4 to 6, frag3 1 to 1, anaphora 9 to 9, stock 1 to 1, intens 1 to 1, q_answered 2 to 2, colon_reveal 1 to 1, short_close 6 to 6.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 5 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 16 number words, proper names by count, and 24 hedge words (after: 24) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: And I know — because someone showed me — what it means to be welcomed into a community that has no obligation to welcome you but does anyway.
   After: And I know, because someone showed me, what it means to be welcomed into a community that has no obligation to welcome you but does anyway.
2. Before: But here is what the gospel actually says — not what the church has said in its worst moments, not what we have filtered through our culture and our prejudice, but what Jesus actually says.
   After: But here is what the gospel actually says, not what the church has said in its worst moments, not what we have filtered through our culture and our prejudice, but what Jesus actually says.
3. Before: We have made this issue a tribal marker, made it political, made it into a battle — and in doing so we have betrayed the gospel.
   After: We have made this issue a tribal marker, made it political, made it into a battle, and in doing so we have betrayed the gospel.
4. Before: Do not let the culture's acceptance of same-sex behavior make you afraid of your conviction — but do not let your conviction make you cruel.
   After: Do not let the culture's acceptance of same-sex behavior make you afraid of your conviction, but do not let your conviction make you cruel.
5. Before: But the scandal we should be offering is the scandal of the gospel itself — the thorough inclusion, the endless grace, the invitation that says the table is bigger than your theology, bigger than your sin, bigger than your fear.
   After: But the scandal we should be offering is the scandal of the gospel itself: the thorough inclusion, the endless grace, the invitation that says the table is bigger than your theology, bigger than your sin, bigger than your fear.

## The whole book

All fourteen files were edited (the introduction, twelve chapters and the conclusion). In his running prose: 43,508 words before and after; em-dashes 438 before, 2 after (10.1 to 0.0 per 1,000 words; his limit is 4 to 6); paragraphs unchanged in number. The fact diff passed on all fourteen. (The tell counter in the table blanks quotations before it counts, so its "after" column shows 0.)

**Every edit is punctuation.** Each recasts a dash as a comma, a colon, a semicolon or brackets. No word was added, removed or replaced, and no fragment stack was joined: the few short runs are a parent's instructions ("Let them talk. Do not interrupt. Do not offer solutions.") and the conclusion's invitation ("But: you belong. Come. Sit."), which stay as he wrote them.

**The two dashes that stay** are inside the words the book gives a parent to say to a child who has come out (chapter 11, in quotation marks).

**A second look (2026-11-26).** After the first pass, every place where the rule had closed brackets straight onto "but", "so" or "yet" beginning a new clause was found by search and given its comma ("), but"), and one comma splice ("... conversation, that is not what I am offering", introduction) became a semicolon; one commit, the fact diff passing again.

**Forbidden Language list.** None of the listed words is in his prose.

## Whole read (2026-11-26)

The first pass, recorded above, recast every dash by a fixed rule and judged each proposal in its own sentence. This second pass read every chapter whole, as the first four books were read, in the text as the rule left it, with each place the rule had changed marked in the reading copy. The edits are punctuation and capital letters only: no word was added, removed or replaced. The fact diff (`/home/user/vb/factdiff.py`, against the typesetter's original text, ed5c8080) now also holds the book's words equal to the original's, counted as a list, and it passes on all fourteen files.

**On a contested subject the rule was narrower still.** Every statement of the traditional position and of the affirming position (Brownson, Vines, Boswell, Side B, Sprinkle) keeps its punctuation as the first pass left it unless that punctuation was broken. Where the book sets the two sides in parallel sentences, both took the same change or neither did:

- "The traditionalist says no: …" / "The affirming interpreter says yes: …" (chapter 2);
- "The affirming tradition says no: …" / "The traditional position says yes: …" (chapter 7);
- the paired "Not: …" sentences in chapter 1, which now both take a semicolon.

Chapter 6, the affirming case at full strength, took no edit at all.

What the whole read changed, in 53 edits:

- **A semicolon or comma before a gloss or a list.** It is now a colon ("the third way: churches that hold a traditional sexual ethic …"; "the message has been clear: if your child is gay …").
- **A comma that joined two sentences.** It is now a semicolon or a colon ("is not the first conversation; that is a later conversation").
- **An aside the rule left in bare commas,** which read as a run-on. It now takes brackets: "why does Leviticus prohibit same-sex male behavior (note that female same-sex behavior is not addressed in the same way), and what do we do …" (chapter 3); "once a right is recognized (access to public accommodations), you cannot …" (chapter 10).
- **A closing bracket that needed a comma after it** (chapters 2, 5, 9 and 10).
- **Nothing near a sentence about suicide, conversion therapy or a family's rejection.** None of these was touched, beyond the plain repairs listed in the table.

Five pairs:

1. Chapter 3. Before: "There is a larger question underneath the vocabulary: why does Leviticus prohibit same-sex male behavior, note that female same-sex behavior is not addressed in the same way, and what do we do with Old Testament law codes as Christians?" After: "… why does Leviticus prohibit same-sex male behavior (note that female same-sex behavior is not addressed in the same way), and what do we do with Old Testament law codes as Christians?"
2. Chapter 2. Before: "The traditionalist says no; the created design stands regardless of how people experience orientation. The affirming interpreter says yes, without the category of orientation, the ancient author was not addressing the modern question." After: "The traditionalist says no: the created design stands … The affirming interpreter says yes: without the category of orientation, …"
3. Chapter 8. Before: "Not always explicitly, but the message has been clear, if your child is gay, you are responsible for getting them to repent …" After: "… but the message has been clear: if your child is gay, …"
4. Chapter 10. Before: "Different states have answered differently, some have passed Religious Freedom Restoration Acts that provide broad exemptions, while others have interpreted civil rights law more strictly." After: "Different states have answered differently: some have passed …"
5. Chapter 12. Before: "Some churches are beginning to explore what might be called the "third way", churches that hold a traditional sexual ethic …" After: "… the "third way": churches that hold a traditional sexual ethic …"

The counts below are for his running prose, the rule-pass text against the text now. Semicolons, colons and brackets are counted outside quotations.

| Chapter | Words | Edits | Semicolons | Colons | Brackets | Fact diff |
|---|---|---|---|---|---|---|
| The Conversation the Church Keeps Getting Wrong | 3,726 | 1 | 27 → 26 | 15 → 16 | 5 → 5 | PASS |
| What the Bible Actually Says About Homosexuality | 3,840 | 3 | 33 → 34 | 46 → 48 | 9 → 9 | PASS |
| Sodom and Gomorrah | 2,931 | 5 | 28 → 26 | 17 → 21 | 7 → 7 | PASS |
| Leviticus 18 and 20 | 2,223 | 5 | 22 → 19 | 23 → 25 | 1 → 2 | PASS |
| Romans 1:26-27 Explained | 3,311 | 4 | 36 → 33 | 36 → 40 | 3 → 3 | PASS |
| Arsenokoitai | 2,690 | 4 | 16 → 16 | 24 → 24 | 9 → 9 | PASS |
| The Affirming Theology Case | 2,911 | 0 | 38 → 38 | 17 → 17 | 6 → 6 | PASS |
| The Traditional Theology Case | 3,915 | 3 | 40 → 40 | 31 → 33 | 9 → 9 | PASS |
| The Church's Catastrophic Failure | 2,897 | 4 | 20 → 22 | 21 → 23 | 2 → 2 | PASS |
| Can You Be Gay and Christian? | 2,794 | 4 | 30 → 30 | 17 → 19 | 3 → 3 | PASS |
| Same-Sex Marriage and the Law | 2,748 | 9 | 28 → 28 | 16 → 22 | 2 → 3 | PASS |
| What to Say When Someone You Love Comes Out | 3,822 | 2 | 33 → 33 | 30 → 31 | 4 → 4 | PASS |
| Building a Church That Tells the Truth and Loves Like Jesus | 3,994 | 8 | 30 → 29 | 27 → 34 | 8 → 8 | PASS |
| The Table Is Bigger Than the Argument | 1,706 | 1 | 19 → 19 | 12 → 13 | 0 → 0 | PASS |
| **All 14** | 43,508 | 53 | 400 → 393 | 332 → 366 | 68 → 70 | |

The files were rebuilt with `node scripts/build-book-files.mjs bible-and-homosexuality --verify`. Still 167 pages, so `client/src/data/ebooks.ts` is unchanged. The EPUB carries exactly the source folder's text (45,183 words compared, no difference), and the PDF's pages carry it character for character (233,813 against 233,813). The page with the repaired Leviticus question (page 40 of the book, page 48 of the file) was looked at as an image.

Noticed in the whole read and not changed; add them to the list below:

- Chapter 12 says Bridgetown Church in Portland is "under the leadership of Keith Giles". Bridgetown's pastors have been John Mark Comer and, after him, Tyler Staton, so the name needs checking, and so does the account of the church's practice that follows.
- Chapter 11 recommends "the Evangelical Council for the Homosexuality" for families who hold traditional theology. No organisation of that name is known; the sentence needs the real name or should come out.
- Chapter 2 gives "Roy Gagnon" where chapter 1 has Robert Gagnon. This adds to item 1 below.

## For James: things that look wrong, none of them changed

The chapters were not read whole for this list. It comes from reading every block quotation against its reference, every scholar's name where it occurs, and searches for statements of his ministry, statistics and studies. In a book on a contested subject these matter more than usual: a reader on either side who finds a scholar misnamed will stop trusting the steelman.

1. ★ **Scholars' names.** "James Boswell" (chapter 1) for John Boswell (chapter 6 has it right); "Justin Vines" (chapter 1) and "Justin Lee Vines" (chapter 6) for Matthew Vines (Justin Lee is a different writer); "James Brownson" (chapter 1, right) and "David Brownson" (chapter 6); "Robert Gagnon" (chapter 1, right) and "Roy Gagnon" (chapter 2).
2. ★ Wesley Hill: "Hill, in "Washed and Waiting," is a married man who also experiences same-sex attraction; he married a woman ..." (chapter 7). Wesley Hill is celibate and unmarried; that is the point of Washed and Waiting. The sentence may have run two writers together.
3. ★ **Years in ministry.** "I write this introduction after twenty years of pastoral ministry" and "a pastor who has spent decades" (introduction). The site says 16 years as a pastor.
4. ★ The block quotation at 1 Corinthians 6 (chapter 3) reads "Do you not know that your bodies are members of Christ? Therefore I will not bring any of them under the power of any sexual sin. Flee from sexual immorality." The middle sentence is not in 1 Corinthians 6 in any common translation; verse 15 asks whether one should make Christ's members members of a prostitute, and verse 12 says "I will not be dominated by anything".
5. Exodus International is said to have dissolved "in 2012" with Alan Chambers's apology; both were in June 2013.
6. "LGBTQ+ teenagers in Christian homes face suicide rates multiple times higher than their peers" (chapter 8) and the Trevor Project and APA findings are given without a citation; the figures need sources before the book is relied on.
7. **Translation.** The copyright page names the ESV; Genesis 1:27 in chapter 7 is the NIV's ("created mankind").
8. **A path to help.** The book speaks of teenagers' suicide attempts (introduction, chapter 8) but gives no line to a crisis service. CLAUDE.md asks that the crisis-facing pages keep a path to real help visible; whether the book should carry one (for example the 988 Suicide & Crisis Lifeline) is his decision, and nothing was added.
9. The copyright line reads "James C. Bell" in both original files and in the new ones; the site and the other books say "James Bell".

## Questions only James can answer

1. Correct the scholars' names and the Wesley Hill sentence?
2. Twenty years, or 16?
3. Add a crisis line where the book speaks of suicide?
4. "James C. Bell" or "James Bell" on the copyright line?

## The files

Rebuilt after the last chapter: still 167 pages (`client/src/data/ebooks.ts` says 167), PDF 1.3 MB, EPUB 302 KB. `--verify`: the EPUB carries exactly the source folder's text with the listed typesetting (45,183 words compared, no difference); the PDF's pages carry the same text character for character (233,806 against 233,806).
