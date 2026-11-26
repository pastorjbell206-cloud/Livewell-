# Deacon Qualifications and Selection: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the twelfth book, the third of the three Hard Issues booklets, Deacon Qualifications and Selection (id `deacon-qualifications`), edited in `content/books-src/deacon-qualifications/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit b73de6b1; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The method is the one recorded in `believe.md` and `the-reliability-of-scripture.md`, beside this file.

## Method

A short practical booklet for pastors and elders (an introduction, six chapters, a conclusion and an appendix of selection tools): 59 long dashes in the 6,340 words of his running prose before the reflection questions (9.3 per 1,000 words, against his limit of 4 to 6). So the work was the dashes.

What an edit may be: an em-dash recast as a comma, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into one sentence where no new word is needed. Nothing else: no word was added, removed or replaced, and no sentence, fact, example or opinion was added or taken out. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff b73de6b1 -- content/books-src/deacon-qualifications/` shows every change). One commit per chapter. In the tables an "edit" is one changed paragraph, which may hold several dashes.

**How the dashes were worked, and what that means.** Unlike the first four books, the chapters were not each read whole before editing. Every long dash in his running prose was given a recast by one fixed rule: a pair of dashes around an aside became commas, or brackets where the aside itself holds a comma or a question; a single dash before "and", "but", "which", "because", "not" and the like became a comma; before an independent clause, a semicolon; before a list, a colon; otherwise a comma. Each proposal was then read in its sentence, and where the rule chose wrongly it was overridden (12 overrides in this book). The fact diff below is what proves nothing but punctuation moved.

**A contested question, held open.** Chapter 4 handles 1 Timothy 3:11 (women deacons, or deacons' wives) without settling it; both readings, as the booklet states them, took punctuation only. Each chapter's REFLECTION QUESTIONS and everything after that label were left as they are; quotations (Colossians 1:26-27 in chapter 3) and the dash before a Scripture reference in the closing lines keep their dashes.

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (the fact diff holds them fixed), and so does anything a chapter sets after its running prose (questions for reflection, takeaways, sources), which the fact diff also leaves out of the prose it checks.

Three scripts, kept outside the repo in `/home/user/vs5/t/` (`apply.py`, `factdiff.py`, `tells.py`, with `propose.py` for the rule), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Standard Matters | 348 | 348 | +0.0% | 4 (11.5) | 1 (2.9) | 14 (40.2) | 11 (31.6) | 2 | PASS |
| Why the Standard Exists | 669 | 669 | +0.0% | 7 (10.5) | 0 (0.0) | 24 (35.9) | 18 (26.9) | 6 | PASS |
| Worthy of Respect: The Character Qualifications | 1,019 | 1,019 | +0.0% | 9 (8.8) | 0 (0.0) | 28 (27.5) | 19 (18.6) | 7 | PASS |
| Holding the Mystery and the Marriage Qualifications | 727 | 727 | +0.0% | 10 (13.8) | 1 (1.4) | 26 (35.8) | 18 (24.8) | 6 | PASS |
| The Women Deacons Qualification and the Spouse Consideration | 596 | 596 | +0.0% | 7 (11.7) | 0 (0.0) | 16 (26.8) | 9 (15.1) | 4 | PASS |
| Designing the Selection Process | 1,149 | 1,149 | +0.0% | 9 (7.8) | 0 (0.0) | 19 (16.5) | 11 (9.6) | 5 | PASS |
| Retiring and Removing Deacons | 956 | 956 | +0.0% | 4 (4.2) | 0 (0.0) | 18 (18.8) | 15 (15.7) | 3 | PASS |
| Conclusion: Servants Worthy of the Calling | 323 | 323 | +0.0% | 6 (18.6) | 1 (3.1) | 12 (37.2) | 7 (21.7) | 3 | PASS |
| Appendix: Deacon Selection Tools | 553 | 553 | +0.0% | 3 (5.4) | 0 (0.0) | 32 (57.9) | 29 (52.4) | 2 | PASS |
| **All 9** | 6,340 | 6,340 | +0.0% | 59 (9.3) | 3 (0.5) | 189 (29.8) | 137 (21.6) | 38 | |

## Introduction: The Standard Matters (`sec01.xhtml`)

Words 348 to 348. Em-dashes in his prose 4 to 1 (11.5 to 2.9 per 1,000 words). Tells 14 to 11 (40.2 to 31.6 per 1,000). Mean sentence 16.6 words to 16.6; sentences of eight words or fewer 19.0% to 19.0%; of five or fewer 9.5% to 9.5%. 2 edits; paragraphs 7 to 7. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 4 to 1, not_but 1 to 1, NotX.Y 1 to 1, triplet 1 to 1, anaphora 2 to 2, intens 3 to 3, short_close 1 to 1, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 3 Scripture references, 0 years, 5 numbers in digits, 3 number words, proper names by count, and 5 hedge words (after: 5) compared.

2 pairs (all there are), taken at even intervals through the chapter:

1. Before: The deacon who is not genuinely full of the Holy Spirit — to use the Acts 6 standard — will bring human motivations to a holy calling and produce human results.
   After: The deacon who is not genuinely full of the Holy Spirit, to use the Acts 6 standard, will bring human motivations to a holy calling and produce human results.
2. Before: It is to make it genuinely meaningful — a calling that attracts people of genuine character and sends them into genuinely significant ministry.
   After: It is to make it genuinely meaningful, a calling that attracts people of genuine character and sends them into genuinely significant ministry.


## Why the Standard Exists (`sec02.xhtml`)

Words 669 to 669. Em-dashes in his prose 7 to 0 (10.5 to 0.0 per 1,000 words). Tells 24 to 18 (35.9 to 26.9 per 1,000). Mean sentence 20.3 words to 20.3; sentences of eight words or fewer 21.2% to 21.2%; of five or fewer 15.2% to 15.2%. 6 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 7 to 0, not_but 3 to 3, not_just 1 to 1, NotX.Y 1 to 1, triplet 3 to 3, anaphora 1 to 1, intens 6 to 6, colon_reveal 0 to 1, short_close 1 to 1, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 3 Scripture references, 0 years, 5 numbers in digits, 2 number words, proper names by count, and 1 hedge words (after: 1) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: They are a portrait of a person — a person whose interior life, relational patterns, and public reputation reflect the kind of genuine spiritual formation that servant leadership requires.
   After: They are a portrait of a person, a person whose interior life, relational patterns, and public reputation reflect the kind of genuine spiritual formation that servant leadership requires.
2. Before: He was establishing that the holiness of the calling demanded a certain kind of person — not because service is more spiritually significant than preaching (though it is not less), but because the person who serves in the name of Christ becomes a representation of Christ in every interaction.
   After: He was establishing that the holiness of the calling demanded a certain kind of person, not because service is more spiritually significant than preaching (though it is not less), but because the person who serves in the name of Christ becomes a representation of Christ in every interaction.
3. Before: The word Paul uses to introduce the deacon qualifications in 1 Timothy 3:8 is semnous — dignified, serious, worthy of respect.
   After: The word Paul uses to introduce the deacon qualifications in 1 Timothy 3:8 is semnous: dignified, serious, worthy of respect.
4. Before: Not universal admiration — genuine character does not always produce universal admiration, particularly in communities where character is not itself consistently valued.
   After: Not universal admiration; genuine character does not always produce universal admiration, particularly in communities where character is not itself consistently valued.
5. Before: They show up in the benevolence ministry that is managed without compassion — where decisions are made bureaucratically rather than pastorally, where the family in need feels processed rather than cared for, where the gospel is not visible in the way help is given because the person giving the help has not been formed by the gospel in the ways the role requires. They show up in the hospitality ministry that is technically functional but genuinely cold — where guests are greeted efficiently but not warmly, where the welcome does not feel personal because the person providing it has not been formed by the kind of genuine regard for others that genuine welcome requires.
   After: They show up in the benevolence ministry that is managed without compassion, where decisions are made bureaucratically rather than pastorally, where the family in need feels processed rather than cared for, where the gospel is not visible in the way help is given because the person giving the help has not been formed by the gospel in the ways the role requires. They show up in the hospitality ministry that is technically functional but genuinely cold, where guests are greeted efficiently but not warmly, where the welcome does not feel personal because the person providing it has not been formed by the kind of genuine regard for others that genuine welcome requires.


## Worthy of Respect: The Character Qualifications (`sec03.xhtml`)

Words 1,019 to 1,019. Em-dashes in his prose 9 to 0 (8.8 to 0.0 per 1,000 words). Tells 28 to 19 (27.5 to 18.6 per 1,000). Mean sentence 18.2 words to 18.2; sentences of eight words or fewer 19.6% to 19.6%; of five or fewer 7.1% to 7.1%. 7 edits; paragraphs 15 to 15. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 9 to 0, not_but 2 to 2, NotX.Y 1 to 1, triplet 1 to 1, anaphora 5 to 5, stock 1 to 1, intens 6 to 6, colon_reveal 1 to 1, short_close 1 to 1, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 4 numbers in digits, 7 number words, proper names by count, and 19 hedge words (after: 19) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: Taken together, they paint a picture of a person whose inner life has been genuinely formed by the gospel — someone who can be trusted with the practical expression of the community’s care because the gospel has produced in them the character that trustworthy service requires.
   After: Taken together, they paint a picture of a person whose inner life has been genuinely formed by the gospel, someone who can be trusted with the practical expression of the community’s care because the gospel has produced in them the character that trustworthy service requires.
2. Before: It is the quality of a person whose character is genuinely integrated — the same in public as in private, the same under pressure as in comfort.
   After: It is the quality of a person whose character is genuinely integrated: the same in public as in private, the same under pressure as in comfort.
3. Before: It describes the person who says one thing to one person and something different to another — whose words cannot be fully trusted because they are adjusted to the audience rather than grounded in genuine conviction.
   After: It describes the person who says one thing to one person and something different to another, whose words cannot be fully trusted because they are adjusted to the audience rather than grounded in genuine conviction.
4. Before: The deacon who handles confidential information about struggling families, who manages the practical care needs of vulnerable members, who communicates the community’s practical expressions of love to specific individuals — this person must be someone whose words can be trusted absolutely.
   After: The deacon who handles confidential information about struggling families, who manages the practical care needs of vulnerable members, who communicates the community’s practical expressions of love to specific individuals; this person must be someone whose words can be trusted absolutely.
5. Before: The person who does community service primarily for the visibility it provides, who manages their service portfolio for professional networking purposes, who is more interested in being seen serving than in the actual people being served — this person has a form of the greedy-for-gain problem even if their financial integrity is technically sound.
   After: The person who does community service primarily for the visibility it provides, who manages their service portfolio for professional networking purposes, who is more interested in being seen serving than in the actual people being served; this person has a form of the greedy-for-gain problem even if their financial integrity is technically sound.


## Holding the Mystery and the Marriage Qualifications (`sec04.xhtml`)

Words 727 to 727. Em-dashes in his prose 10 to 1 (13.8 to 1.4 per 1,000 words). Tells 26 to 18 (35.8 to 24.8 per 1,000). Mean sentence 20.8 words to 20.8; sentences of eight words or fewer 11.4% to 11.4%; of five or fewer 5.7% to 5.7%. 6 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 1, not_but 1 to 1, NotX.Y 2 to 2, triplet 4 to 5, anaphora 2 to 2, intens 5 to 5, colon_reveal 1 to 1, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 3 Scripture references, 0 years, 6 numbers in digits, 8 number words, proper names by count, and 11 hedge words (after: 11) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The two qualifications Paul includes for deacons that most closely parallel the elder qualifications — doctrinal faithfulness and household leadership — are also the two most frequently neglected in deacon selection processes.
   After: The two qualifications Paul includes for deacons that most closely parallel the elder qualifications, doctrinal faithfulness and household leadership, are also the two most frequently neglected in deacon selection processes.
2. Before: To hold the mystery of the faith is to hold the gospel itself — the content of Christian revelation as the church has received and confessed it.
   After: To hold the mystery of the faith is to hold the gospel itself: the content of Christian revelation as the church has received and confessed it.
3. Before: The “clear conscience” in Pauline usage refers to a conscience that is not accusatory — not convicting the holder of living in contradiction to what they profess.
   After: The “clear conscience” in Pauline usage refers to a conscience that is not accusatory, not convicting the holder of living in contradiction to what they profess.
4. Before: And the person who will be trusted with the practical care of vulnerable congregation members, with the management of community resources, with the representation of the community’s love in specific and concrete interactions — this person must be someone whose home life provides genuine evidence that they are capable of the care, the consistency, and the genuine regard for others that the ministry requires.
   After: And the person who will be trusted with the practical care of vulnerable congregation members, with the management of community resources, with the representation of the community’s love in specific and concrete interactions; this person must be someone whose home life provides genuine evidence that they are capable of the care, the consistency, and the genuine regard for others that the ministry requires.
5. Before: The deacon who is managing the community’s practical care is exercising a form of leadership that requires the same fundamental capacities — genuine presence, consistent follow-through, genuine care for those in their charge, the ability to maintain appropriate authority while remaining genuinely responsive to need — that good household leadership requires.
   After: The deacon who is managing the community’s practical care is exercising a form of leadership that requires the same fundamental capacities (genuine presence, consistent follow-through, genuine care for those in their charge, the ability to maintain appropriate authority while remaining genuinely responsive to need) that good household leadership requires.


## The Women Deacons Qualification and the Spouse Consideration (`sec05.xhtml`)

Words 596 to 596. Em-dashes in his prose 7 to 0 (11.7 to 0.0 per 1,000 words). Tells 16 to 9 (26.8 to 15.1 per 1,000). Mean sentence 22.9 words to 22.9; sentences of eight words or fewer 7.7% to 7.7%; of five or fewer 3.8% to 3.8%. 4 edits; paragraphs 9 to 9. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 7 to 0, not_but 3 to 3, triplet 2 to 2, anaphora 1 to 1, intens 2 to 2, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 2 Scripture references, 0 years, 7 numbers in digits, 7 number words, proper names by count, and 6 hedge words (after: 6) compared.

3 pairs (all there are), taken at even intervals through the chapter:

1. Before: “Dignified” is the same word (semnas) used for male deacons in 3:8 — the same quality of character that commands genuine respect. “Not slanderers” is the inverse of “not double-tongued” — a specific prohibition of the kind of malicious speech that destroys reputation and corrupts community.
   After: “Dignified” is the same word (semnas) used for male deacons in 3:8, the same quality of character that commands genuine respect. “Not slanderers” is the inverse of “not double-tongued”, a specific prohibition of the kind of malicious speech that destroys reputation and corrupts community.
2. Before: The deacon who comes home and discusses the pastoral care situations she has encountered — the struggling family whose financial situation she knows, the marriage in crisis she has been supporting, the health crisis she has been managing — is sharing that information with her spouse.
   After: The deacon who comes home and discusses the pastoral care situations she has encountered (the struggling family whose financial situation she knows, the marriage in crisis she has been supporting, the health crisis she has been managing) is sharing that information with her spouse.
3. Before: The wife who is genuinely supportive, who shares her spouse’s servant heart, and who regards the ministry as a shared calling rather than a competing obligation — this wife is a significant asset to the deacon’s long-term effectiveness. Including a brief conversation with a deacon candidate’s spouse — not an interview, but a genuine personal engagement that assesses her character and her understanding of what the diaconate requires — is a valuable component of a thorough selection process.
   After: The wife who is genuinely supportive, who shares her spouse’s servant heart, and who regards the ministry as a shared calling rather than a competing obligation; this wife is a significant asset to the deacon’s long-term effectiveness. Including a brief conversation with a deacon candidate’s spouse (not an interview, but a genuine personal engagement that assesses her character and her understanding of what the diaconate requires) is a valuable component of a thorough selection process.


## Designing the Selection Process (`sec06.xhtml`)

Words 1,149 to 1,149. Em-dashes in his prose 9 to 0 (7.8 to 0.0 per 1,000 words). Tells 19 to 11 (16.5 to 9.6 per 1,000). Mean sentence 22.5 words to 22.5; sentences of eight words or fewer 9.8% to 9.8%; of five or fewer 0.0% to 0.0%. 5 edits; paragraphs 18 to 18. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 9 to 0, triplet 5 to 6, anaphora 1 to 1, intens 3 to 3, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 5 Scripture references, 0 years, 9 numbers in digits, 6 number words, proper names by count, and 9 hedge words (after: 9) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: A nomination process that is vague, passive, and unguided will produce candidates who are nominated primarily because they are available and willing — the characteristics that should be necessary but not sufficient for the office.
   After: A nomination process that is vague, passive, and unguided will produce candidates who are nominated primarily because they are available and willing, the characteristics that should be necessary but not sufficient for the office.
2. Before: The self-nomination should be possible — Paul says that aspiring to the office of deacon is to aspire to a noble task — but it should be received within the same assessment process as any other nomination.
   After: The self-nomination should be possible (Paul says that aspiring to the office of deacon is to aspire to a noble task), but it should be received within the same assessment process as any other nomination.
3. Before: a reference conversation with people who know the candidate well, and — for married candidates — a conversation with the spouse.
   After: a reference conversation with people who know the candidate well, and, for married candidates, a conversation with the spouse.
4. Before: A meaningful deacon installation includes a Scripture charge — Acts 6:1–7 and 1 Timothy 3:8–13 are the natural texts — that frames the office and its requirements.
   After: A meaningful deacon installation includes a Scripture charge (Acts 6:1–7 and 1 Timothy 3:8–13 are the natural texts) that frames the office and its requirements.
5. Before: And it includes corporate prayer — the congregation praying specifically and earnestly for the deacons they are installing.
   After: And it includes corporate prayer, the congregation praying specifically and earnestly for the deacons they are installing.


## Retiring and Removing Deacons (`sec07.xhtml`)

Words 956 to 956. Em-dashes in his prose 4 to 0 (4.2 to 0.0 per 1,000 words). Tells 18 to 15 (18.8 to 15.7 per 1,000). Mean sentence 21.2 words to 21.2; sentences of eight words or fewer 8.9% to 8.9%; of five or fewer 4.4% to 4.4%. 3 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 4 to 0, not_but 1 to 1, NotX.Y 1 to 1, isnt_its 1 to 1, triplet 2 to 3, anaphora 5 to 5, intens 3 to 3, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 17 number words, proper names by count, and 20 hedge words (after: 20) compared.

3 pairs (all there are), taken at even intervals through the chapter:

1. Before: The other half — equally important and far less frequently addressed — is the ongoing stewardship of the diaconate over time:
   After: The other half, equally important and far less frequently addressed, is the ongoing stewardship of the diaconate over time:
2. Before: The honor is not just personal kindness — it is a theological statement about the dignity of the service they have rendered.
   After: The honor is not just personal kindness; it is a theological statement about the dignity of the service they have rendered.
3. Before: Second, because the relational character of the diaconate is so central, the process should be even more consistently pastoral — framed as care for the person rather than institutional housekeeping.
   After: Second, because the relational character of the diaconate is so central, the process should be even more consistently pastoral, framed as care for the person rather than institutional housekeeping.


## Conclusion: Servants Worthy of the Calling (`sec08.xhtml`)

Words 323 to 323. Em-dashes in his prose 6 to 1 (18.6 to 3.1 per 1,000 words). Tells 12 to 7 (37.2 to 21.7 per 1,000). Mean sentence 16.1 words to 16.1; sentences of eight words or fewer 55.0% to 55.0%; of five or fewer 40.0% to 40.0%. 3 edits; paragraphs 6 to 6. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 1 to 1.

By kind (before to after): emdash 6 to 1, triplet 1 to 1, frag3 1 to 1, anaphora 2 to 2, intens 2 to 2.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 3 Scripture references, 0 years, 5 numbers in digits, 3 number words, proper names by count, and 2 hedge words (after: 2) compared.

3 pairs (all there are), taken at even intervals through the chapter:

1. Before: The church that selects its deacons with genuine care — that takes the qualifications seriously, invests in a thorough assessment process, tests candidates before installation, and maintains ongoing accountability for those who serve — will find that the quality of its practical care ministry rises dramatically.
   After: The church that selects its deacons with genuine care (that takes the qualifications seriously, invests in a thorough assessment process, tests candidates before installation, and maintains ongoing accountability for those who serve) will find that the quality of its practical care ministry rises dramatically.
2. Before: The church that selects its deacons carelessly — that installs willing people without genuine assessment, that allows the standard to erode under the pressure of availability and tenure, that never has the hard conversation with the deacon whose character has drifted from the qualification — will find that the diaconate gradually becomes an institutional shadow rather than a genuine ministry.
   After: The church that selects its deacons carelessly (that installs willing people without genuine assessment, that allows the standard to erode under the pressure of availability and tenure, that never has the hard conversation with the deacon whose character has drifted from the qualification) will find that the diaconate gradually becomes an institutional shadow rather than a genuine ministry.
3. Before: It is a gift — to the congregation that is served by genuinely qualified servants, to the deacons whose ministry is meaningful and effective because their character is genuine, and to the God who takes delight in the faithfulness of the servants he has called to care for the world he loves.
   After: It is a gift, to the congregation that is served by genuinely qualified servants, to the deacons whose ministry is meaningful and effective because their character is genuine, and to the God who takes delight in the faithfulness of the servants he has called to care for the world he loves.


## Appendix: Deacon Selection Tools (`sec09.xhtml`)

Words 553 to 553. Em-dashes in his prose 3 to 0 (5.4 to 0.0 per 1,000 words). Tells 32 to 29 (57.9 to 52.4 per 1,000). Mean sentence 11.5 words to 11.5; sentences of eight words or fewer 41.7% to 41.7%; of five or fewer 25.0% to 25.0%. 2 edits; paragraphs 27 to 27. Paragraphs of fifteen words or fewer 12 to 12; runs of three fragments 0 to 0.

By kind (before to after): emdash 3 to 0, not_but 1 to 1, triplet 2 to 2, intens 2 to 2, q_answered 2 to 2, short_close 10 to 10, one_line_para 12 to 12.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 3 number words, proper names by count, and 7 hedge words (after: 7) compared.

2 pairs (all there are), taken at even intervals through the chapter:

1. Before: How do others who know you in ordinary life — not just at church — describe you?
   After: How do others who know you in ordinary life, not just at church, describe you?
2. Before: You are called to hold the mystery of the faith with a clear conscience — to be a person whose character and whose belief are genuinely integrated, who represents Christ well in every practical interaction because the Christ you represent has genuinely transformed who you are.
   After: You are called to hold the mystery of the faith with a clear conscience: to be a person whose character and whose belief are genuinely integrated, who represents Christ well in every practical interaction because the Christ you represent has genuinely transformed who you are.

## The whole book

All nine files were edited. In his running prose (before the reflection questions): 6,340 words before and after; em-dashes 59 before, 3 after (two before a Scripture reference, one inside the quotation of Colossians 1:26-27); paragraphs unchanged in number. The fact diff passed on all nine.

**Every edit is punctuation.** Each recasts a dash as a comma, a colon, a semicolon or brackets. No word was added, removed or replaced. Two pairs of dashes became brackets (chapters 2 and 5) ("aischrokerdes (literally “pursuing shameful gain”) addresses ..."; "a Scripture charge (Acts 6:1–7 and 1 Timothy 3:8–13 are the natural texts) that frames the office").

**Forbidden Language list.** None of the listed words is in his prose.

## Whole read (2026-11-26)

The first pass, recorded above, recast every dash by a fixed rule and judged each proposal in its own sentence. This second pass read every file whole, as the first four books were read, in the text as the rule left it, with each place the rule had changed marked in the reading copy. The edits are punctuation and capital letters only: no word was added, removed or replaced. The fact diff (`/home/user/vb/factdiff.py`, against the typesetter's original text, b73de6b1) now also holds the booklet's words equal to the original's, counted as a list, and it passes on every file.

What the whole read changed, in 27 edits:

- **A comma before a gloss.** It is now a colon ("a portrait of a person: a person whose interior life …"; "genuinely formed by the gospel: someone who can be trusted …"; "available and willing: the characteristics that should be necessary but not sufficient"). The paired descriptions of what a low standard costs in chapter 1 ("managed without compassion: where decisions …"; "genuinely cold: where guests …") took the same change.
- **A long subject closed by a semicolon before "this person".** The rule left "… to specific individuals; this person must be someone whose words can be trusted absolutely" in four places (chapters 2, 3 and 4). The semicolon cut the sentence's subject from its verb; it is now a comma.
- **Fragment stacks joined.** "The double-tongued deacon will gossip. Will misrepresent. Will tell each party …" is now one sentence. So are the introduction's "That … That …", chapter 3's "Not a theologian. Not someone who …. But someone …" and chapter 6's three deacons whose character has drifted.
- **An aside in bare commas** now takes brackets ("the two qualifications Paul includes … (doctrinal faithfulness and household leadership) are also …"; "How do others who know you in ordinary life (not just at church) describe you?").

Left alone, and why:

- The sample installation charge in the appendix is set as he wrote it; only its rule colon was read, and it stands.
- The verdicts stay ("The person is still a person. The conversation is still hard.").

Five pairs:

1. Chapter 2. Before: "The deacon who handles confidential information about struggling families, who manages the practical care needs of vulnerable members, who communicates the community's practical expressions of love to specific individuals; this person must be someone whose words can be trusted absolutely. The double-tongued deacon will gossip. Will misrepresent. Will tell each party in a conflict what they want to hear." After: "… to specific individuals, this person must be someone whose words can be trusted absolutely. The double-tongued deacon will gossip, will misrepresent, will tell each party in a conflict what they want to hear."
2. Chapter 1. Before: "Paul is saying that the deacon must be a person whose life, when honestly observed, generates genuine respect. Not universal admiration; genuine character does not always produce universal admiration, particularly in communities where character is not itself consistently valued. But honest respect." After: "… generates genuine respect: not universal admiration (genuine character does not always produce universal admiration, particularly in communities where character is not itself consistently valued), but honest respect."
3. Chapter 2. Before: "The dignified person carries themselves with a quality that communicates seriousness of purpose. Not solemnity or heaviness; the dignified person is often warm, often funny, often deeply enjoyable to be around." After: "… seriousness of purpose: not solemnity or heaviness (the dignified person is often warm, often funny, often deeply enjoyable to be around)."
4. Introduction. Before: "It is saying, in effect, that the people who serve communion, manage the building, and care for the vulnerable members of the congregation do not need to be people of genuine spiritual character. That the ministry of mercy can be performed by anyone willing to show up. That what matters …" After: "… people of genuine spiritual character; that the ministry of mercy can be performed by anyone willing to show up; that what matters …"
5. Conclusion. Before: "The standard is not a burden. It is a gift, to the congregation that is served …, to the deacons …, and to the God …" After: "It is a gift: to the congregation that is served …"

The counts below are for his running prose, the rule-pass text against the text now. Semicolons, colons and brackets are counted outside quotations.

| Chapter | Words | Edits | Semicolons | Colons | Brackets | Fact diff |
|---|---|---|---|---|---|---|
| Introduction: The Standard Matters | 348 | 3 | 0 → 2 | 1 → 3 | 0 → 0 | PASS |
| Why the Standard Exists | 669 | 5 | 1 → 0 | 4 → 9 | 1 → 2 | PASS |
| Worthy of Respect: The Character Qualifications | 1,019 | 5 | 3 → 0 | 7 → 9 | 2 → 3 | PASS |
| Holding the Mystery and the Marriage Qualifications | 727 | 4 | 1 → 0 | 11 → 13 | 3 → 4 | PASS |
| The Women Deacons Qualification and the Spouse Consideration | 596 | 3 | 1 → 0 | 6 → 8 | 3 → 3 | PASS |
| Designing the Selection Process | 1,149 | 3 | 5 → 4 | 10 → 13 | 2 → 2 | PASS |
| Retiring and Removing Deacons | 956 | 2 | 4 → 6 | 5 → 7 | 0 → 0 | PASS |
| Conclusion: Servants Worthy of the Calling | 323 | 1 | 0 → 0 | 1 → 2 | 2 → 2 | PASS |
| Appendix: Deacon Selection Tools | 553 | 1 | 0 → 0 | 10 → 10 | 1 → 2 | PASS |
| **All 9** | 6,340 | 27 | 15 → 12 | 55 → 74 | 14 → 18 | |

The files were rebuilt with `node scripts/build-book-files.mjs deacon-qualifications --verify`. It passed: the EPUB holds 7,112 words, word for word the source, and the PDF's 38,381 body characters on its pages are exactly the source's. The page count is unchanged at 43 (`client/src/data/booklets.ts` needs no change). Page 16 of the PDF, where chapter 2's double-tongued deacon falls, was rendered and looked at.

## For James: things that look wrong, none of them changed

The booklet was read for this list in its dash contexts and searched for references and cross-references.

1. ★ **Cross-references to books the site does not have.** "the same standards that we examined in depth in Book Two of this series" (chapter 3), "We addressed the question of women as deacons in Book Seven of this series" (chapter 4), "the same one developed in Book Five of this series for elder removal" (chapter 6). The site offers this booklet on its own, and a reader cannot find Books Two, Five or Seven; chapter 4 in particular sends the reader elsewhere for the one contested question it raises.
2. ★ **Stray chapter labels**, as in the other two booklets: each chapter's file ends with the next chapter's label, and the original PDF prints them the same way.
3. The selection tools in the appendix (the self-assessment and the reference questions) are runs of one-line paragraphs in the source and are set that way.

## Questions only James can answer

1. What should the three "Book ... of this series" sentences say now that the booklet stands alone? (Two of those books, on elders, appear on the site as `what-elders-are-for` and `qualified-elder` in `client/src/data/booklets.ts`; whether they are Books Two and Five is for him to say.)
2. Move each "CHAPTER ..." label to the head of its own chapter?

## The files

Rebuilt after the last chapter: still 43 pages (`client/src/data/booklets.ts` says 43), PDF 450 KB, EPUB 216 KB. `--verify`: the EPUB carries exactly the source folder's text (7,112 words compared, no difference); the PDF's pages carry the same text character for character (38,379 against 38,379).
