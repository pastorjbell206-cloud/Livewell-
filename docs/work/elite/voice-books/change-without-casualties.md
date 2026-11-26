# Change Without Casualties: the spoken-voice pass on the book

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me". And, the same day, on whether a book keeps its fragments: "use full paragraphs in the books too". This is the tenth book, the first of the three Hard Issues booklets, Change Without Casualties (id `change-without-casualties`), edited in `content/books-src/change-without-casualties/` on branch elite/voice. Governing standards: `docs/VOICE-JAMES-BELL.md`, his manuscript instructions (the lightest possible editorial touch), then `CLAUDE.md`. The original EPUB and PDF are untouched in `content/held-downloads/originals/`. The book was first brought into the typesetter with no word changed and verified against those originals (commit e8c784ac; `docs/work/elite/bookshelf.md`, section 8); every edit recorded here was made after that. The method is the one recorded in `believe.md` and `the-reliability-of-scripture.md`, beside this file.

## Method

A short practical booklet for pastors (an introduction, six chapters, a conclusion and an appendix template): 57 long dashes in the 5,566 words of his running prose before the reflection questions (10.2 per 1,000 words, against his limit of 4 to 6), and no fragment stacks to speak of. So the work was the dashes.

What an edit may be: an em-dash recast as a comma, a semicolon, a colon before a real list or a gloss, or brackets; a stack of fragments joined into one sentence where no new word is needed. Nothing else: no word was added, removed or replaced, and no sentence, fact, example or opinion was added or taken out. Edits are exact old/new pairs, each required to match once in the chapter's file, applied to the original text every time (`git diff e8c784ac -- content/books-src/change-without-casualties/` shows every change). One commit per chapter. In the tables an "edit" is one changed paragraph, which may hold several dashes.

**How the dashes were worked, and what that means.** Unlike the first four books, the chapters were not each read whole before editing. Every long dash in his running prose was given a recast by one fixed rule: a pair of dashes around an aside became commas, or brackets where the aside itself holds a comma or a question; a single dash before "and", "but", "which", "because", "not" and the like became a comma; before an independent clause, a semicolon; before a list, a colon; otherwise a comma. Each proposal was then read in its sentence, and where the rule chose wrongly it was overridden (11 overrides in this book). The fact diff below is what proves nothing but punctuation moved.

**What was kept apart.** Each chapter ends with REFLECTION QUESTIONS, set in the files as a plain paragraph; everything from that label to the chapter's end was left as it is, and the closing Scripture line of the introduction and conclusion ("... — Proverbs 15:22", "... — Colossians 3:23") keeps its dash, which marks the reference.

**What was not edited.** Headings, subtitles, pull quotes and block quotations keep their dashes (the fact diff holds them fixed), and so does anything a chapter sets after its running prose (questions for reflection, takeaways, sources), which the fact diff also leaves out of the prose it checks.

Three scripts, kept outside the repo in `/home/user/vs5/t/` (`apply.py`, `factdiff.py`, `tells.py`, with `propose.py` for the rule), the same as Believe's:

- **Fact diff** (original chapter file against edited). Every block that is not his running prose must be identical and in the same order. The number of paragraphs may fall but not rise. Inside his prose it extracts every double-quoted string, every single-quoted string, every Scripture reference, every four-digit year, every number in digits, every number word, and every proper name by count, and fails if any count differs. It counts hedge words and fails if any falls or rises. Length may not move more than 5 percent.
- **Tell counter** (his prose only, quotations blanked): em-dashes; "not X but Y"; "Not X. Y."; triplets; runs of three fragments; anaphora; stock turns; filler intensifiers; a question answered at once; a colon before a reveal; a paragraph closing on eight words or fewer; a paragraph of fifteen words or fewer; any word on CLAUDE.md's Forbidden Language list. It is a heuristic; the dash count is exact.
- **The build's `--verify`** proves the PDF and EPUB carry the source folder's text word for word.

## Totals

| Chapter | Words before | after | change | Em-dashes before (per 1,000) | after | Tells before (per 1,000) | after | Edits | Fact diff |
|---|---|---|---|---|---|---|---|---|---|
| Introduction: The Way You Introduce It Is the Change | 355 | 355 | +0.0% | 3 (8.5) | 1 (2.8) | 11 (31.0) | 9 (25.4) | 2 | PASS |
| Why Good Ideas Fail | 774 | 774 | +0.0% | 7 (9.0) | 0 (0.0) | 19 (24.5) | 13 (16.8) | 5 | PASS |
| Building the Case: Why Before What | 929 | 929 | +0.0% | 13 (14.0) | 0 (0.0) | 22 (23.7) | 9 (9.7) | 8 | PASS |
| Building Your Coalition | 735 | 735 | +0.0% | 5 (6.8) | 0 (0.0) | 17 (23.1) | 13 (17.7) | 5 | PASS |
| The Announcement and Rollout | 746 | 746 | +0.0% | 8 (10.7) | 0 (0.0) | 16 (21.4) | 8 (10.7) | 5 | PASS |
| Handling Resistance | 728 | 728 | +0.0% | 4 (5.5) | 0 (0.0) | 12 (16.5) | 8 (11.0) | 3 | PASS |
| Evaluating and Celebrating the Change | 751 | 751 | +0.0% | 10 (13.3) | 0 (0.0) | 18 (24.0) | 8 (10.7) | 8 | PASS |
| Conclusion: The Change That Changes You | 295 | 295 | +0.0% | 6 (20.3) | 1 (3.4) | 14 (47.5) | 9 (30.5) | 3 | PASS |
| Appendix: The Change Communication Template | 253 | 253 | +0.0% | 1 (4.0) | 0 (0.0) | 30 (118.6) | 29 (114.6) | 1 | PASS |
| **All 9** | 5,566 | 5,566 | +0.0% | 57 (10.2) | 2 (0.4) | 159 (28.6) | 106 (19.0) | 40 | |

## Introduction: The Way You Introduce It Is the Change (`sec01.xhtml`)

Words 355 to 355. Em-dashes in his prose 3 to 1 (8.5 to 2.8 per 1,000 words). Tells 11 to 9 (31.0 to 25.4 per 1,000). Mean sentence 17.8 words to 17.8; sentences of eight words or fewer 15.0% to 15.0%; of five or fewer 10.0% to 10.0%. 2 edits; paragraphs 7 to 7. Paragraphs of fifteen words or fewer 3 to 3; runs of three fragments 0 to 0.

By kind (before to after): emdash 3 to 1, NotX.Y 1 to 1, triplet 1 to 1, anaphora 2 to 2, short_close 1 to 1, one_line_para 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 6 number words, proper names by count, and 8 hedge words (after: 8) compared.

2 pairs (all there are), taken at even intervals through the chapter:

1. Before: The most important skill is the process skill — knowing how to take a decision from the leader’s conviction to the congregation’s ownership in a way that generates adoption rather than resistance.
   After: The most important skill is the process skill: knowing how to take a decision from the leader’s conviction to the congregation’s ownership in a way that generates adoption rather than resistance.
2. Before: What follows is a step-by-step playbook for introducing major ministry decisions — from the earliest stages of vision development through the announcement, the rollout, the management of resistance, and the evaluation of whether the change achieved its purpose.
   After: What follows is a step-by-step playbook for introducing major ministry decisions, from the earliest stages of vision development through the announcement, the rollout, the management of resistance, and the evaluation of whether the change achieved its purpose.


## Why Good Ideas Fail (`sec02.xhtml`)

Words 774 to 774. Em-dashes in his prose 7 to 0 (9.0 to 0.0 per 1,000 words). Tells 19 to 13 (24.5 to 16.8 per 1,000). Mean sentence 15.2 words to 15.2; sentences of eight words or fewer 27.5% to 27.5%; of five or fewer 17.6% to 17.6%. 5 edits; paragraphs 16 to 16. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 7 to 0, triplet 5 to 6, anaphora 4 to 4, short_close 2 to 2, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 21 number words, proper names by count, and 10 hedge words (after: 10) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: It is instructive to trace the anatomy of a specific change communication failure — to see exactly where the process broke down and what a different approach would have produced.
   After: It is instructive to trace the anatomy of a specific change communication failure, to see exactly where the process broke down and what a different approach would have produced.
2. Before: The small group leaders — the people most directly affected by the change — learned about it from the pulpit at the same moment as everyone else.
   After: The small group leaders, the people most directly affected by the change, learned about it from the pulpit at the same moment as everyone else.
3. Before: There was no structured opportunity for the congregation — and especially for the small group leaders most affected — to raise questions, express concerns, or contribute their experience to refining the plan.
   After: There was no structured opportunity for the congregation, and especially for the small group leaders most affected, to raise questions, express concerns, or contribute their experience to refining the plan.
4. Before: The six months the pastor spent developing the plan were spent primarily in isolation — in personal research and elder consultation.
   After: The six months the pastor spent developing the plan were spent primarily in isolation, in personal research and elder consultation.
5. Before: It is a process — a sequence of communications, conversations, and community experiences that builds toward the public announcement rather than replacing it.
   After: It is a process: a sequence of communications, conversations, and community experiences that builds toward the public announcement rather than replacing it.


## Building the Case: Why Before What (`sec03.xhtml`)

Words 929 to 929. Em-dashes in his prose 13 to 0 (14.0 to 0.0 per 1,000 words). Tells 22 to 9 (23.7 to 9.7 per 1,000). Mean sentence 22.7 words to 22.7; sentences of eight words or fewer 17.1% to 17.1%; of five or fewer 4.9% to 4.9%. 8 edits; paragraphs 14 to 14. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 13 to 0, not_but 4 to 4, anaphora 2 to 2, intens 2 to 2, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 5 number words, proper names by count, and 17 hedge words (after: 17) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The pastor who invests a sermon series — or a sustained season of preaching — in the biblical foundations of the change he is planning is doing more for the change’s eventual adoption than any communication strategy could accomplish.
   After: The pastor who invests a sermon series, or a sustained season of preaching, in the biblical foundations of the change he is planning is doing more for the change’s eventual adoption than any communication strategy could accomplish.
2. Before: It is the genuine theological work of helping a congregation understand what Scripture says about the areas of their life together that need to grow — and allowing that biblical understanding to create its own productive dissatisfaction with the current state.
   After: It is the genuine theological work of helping a congregation understand what Scripture says about the areas of their life together that need to grow, and allowing that biblical understanding to create its own productive dissatisfaction with the current state.
3. Before: And they often produce, in the members who participate in them, a genuine sense that they have contributed to the pastor’s thinking — which creates a form of ownership that makes the announcement feel like a shared conclusion rather than a unilateral decision.
   After: And they often produce, in the members who participate in them, a genuine sense that they have contributed to the pastor’s thinking, which creates a form of ownership that makes the announcement feel like a shared conclusion rather than a unilateral decision.
4. Before: The pastor who is asking genuine questions — “What do you see that I might not be seeing? What do you think this congregation most needs right now? — will receive more useful information and create more genuine partnership than the pastor who is using questions as a vehicle for communicating his already-formed conclusions.
   After: The pastor who is asking genuine questions (“What do you see that I might not be seeing? What do you think this congregation most needs right now?”) will receive more useful information and create more genuine partnership than the pastor who is using questions as a vehicle for communicating his already-formed conclusions.
5. Before: And presenting them clearly and specifically — not as accusations but as honest accounts of real consequences — creates the kind of productive urgency that makes a congregation genuinely ready to receive a change that addresses what they now understand to be a genuine problem.
   After: And presenting them clearly and specifically, not as accusations but as honest accounts of real consequences, creates the kind of productive urgency that makes a congregation genuinely ready to receive a change that addresses what they now understand to be a genuine problem.


## Building Your Coalition (`sec04.xhtml`)

Words 735 to 735. Em-dashes in his prose 5 to 0 (6.8 to 0.0 per 1,000 words). Tells 17 to 13 (23.1 to 17.7 per 1,000). Mean sentence 23.0 words to 23.0; sentences of eight words or fewer 18.8% to 18.8%; of five or fewer 12.5% to 12.5%. 5 edits; paragraphs 12 to 12. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 5 to 0, not_but 1 to 1, NotX.Y 2 to 2, triplet 2 to 3, anaphora 3 to 3, intens 3 to 3, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 12 number words, proper names by count, and 21 hedge words (after: 21) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: It is the pastoral wisdom of recognizing that in relational communities, ideas travel through relationships — and that the idea whose first champions are trusted, respected, and genuinely enthusiastic will travel far further and far faster than the idea that is championed only by the pastor who proposed it.
   After: It is the pastoral wisdom of recognizing that in relational communities, ideas travel through relationships, and that the idea whose first champions are trusted, respected, and genuinely enthusiastic will travel far further and far faster than the idea that is championed only by the pastor who proposed it.
2. Before: The young adults who are excited about a contemporary worship transition are already in your corner — their support is expected and therefore not particularly reassuring to the longtime members who are the primary source of potential resistance.
   After: The young adults who are excited about a contemporary worship transition are already in your corner; their support is expected and therefore not particularly reassuring to the longtime members who are the primary source of potential resistance.
3. Before: It is a genuine invitation to engage with the change before it is announced — to hear the rationale, raise the concerns, push back on the weaknesses, and arrive (if genuine engagement supports it) at genuine ownership.
   After: It is a genuine invitation to engage with the change before it is announced: to hear the rationale, raise the concerns, push back on the weaknesses, and arrive (if genuine engagement supports it) at genuine ownership.
4. Before: It is often the person with the most relational influence in the segment of the congregation that would be most affected by the change — the person others will watch when they are deciding whether to embrace or resist what is being proposed.
   After: It is often the person with the most relational influence in the segment of the congregation that would be most affected by the change, the person others will watch when they are deciding whether to embrace or resist what is being proposed.
5. Before: The pre-announcement conversation with the potential resistance leader gives them the experience of being heard — which does not guarantee their support but dramatically reduces the likelihood of organized opposition.
   After: The pre-announcement conversation with the potential resistance leader gives them the experience of being heard, which does not guarantee their support but dramatically reduces the likelihood of organized opposition.


## The Announcement and Rollout (`sec05.xhtml`)

Words 746 to 746. Em-dashes in his prose 8 to 0 (10.7 to 0.0 per 1,000 words). Tells 16 to 8 (21.4 to 10.7 per 1,000). Mean sentence 23.3 words to 23.3; sentences of eight words or fewer 6.2% to 6.2%; of five or fewer 0.0% to 0.0%. 5 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 8 to 0, triplet 2 to 2, anaphora 2 to 2, intens 3 to 3, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 7 number words, proper names by count, and 5 hedge words (after: 5) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: And it communicates that the congregation’s concerns and questions are genuinely welcome — that this is the beginning of a process rather than the conclusion of one.
   After: And it communicates that the congregation’s concerns and questions are genuinely welcome, that this is the beginning of a process rather than the conclusion of one.
2. Before: The announcement that creates a specific, structured, private opportunity for questions and concerns to be raised — a one-on-one meeting with the pastor, a small group conversation, a town hall format with adequate time and psychological safety — is far more effective at surfacing and addressing the concerns that will otherwise fester into resistance.
   After: The announcement that creates a specific, structured, private opportunity for questions and concerns to be raised (a one-on-one meeting with the pastor, a small group conversation, a town hall format with adequate time and psychological safety) is far more effective at surfacing and addressing the concerns that will otherwise fester into resistance.
3. Before: The pastor who announces a change with genuine humility — acknowledging that he does not have all the answers, that the implementation will require learning and adjustment, that the congregation’s ongoing input is genuinely valued — creates a very different reception than the pastor whose announcement communicates that the decision is final and the congregation’s role is to comply.
   After: The pastor who announces a change with genuine humility (acknowledging that he does not have all the answers, that the implementation will require learning and adjustment, that the congregation’s ongoing input is genuinely valued) creates a very different reception than the pastor whose announcement communicates that the decision is final and the congregation’s role is to comply.
4. Before: The announcement that acknowledges what will be lost — what the change will cost specific groups within the congregation — alongside what will be gained is far more credible than the announcement that treats the change as having only benefits.
   After: The announcement that acknowledges what will be lost, what the change will cost specific groups within the congregation, alongside what will be gained is far more credible than the announcement that treats the change as having only benefits.
5. Before: The latter is far more compelling — and far more honest.
   After: The latter is far more compelling, and far more honest.


## Handling Resistance (`sec06.xhtml`)

Words 728 to 728. Em-dashes in his prose 4 to 0 (5.5 to 0.0 per 1,000 words). Tells 12 to 8 (16.5 to 11.0 per 1,000). Mean sentence 20.8 words to 20.8; sentences of eight words or fewer 11.4% to 11.4%; of five or fewer 2.9% to 2.9%. 3 edits; paragraphs 11 to 11. Paragraphs of fifteen words or fewer 0 to 0; runs of three fragments 0 to 0.

By kind (before to after): emdash 4 to 0, not_but 2 to 2, NotX.Y 2 to 2, triplet 1 to 1, intens 3 to 3.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 1 number words, proper names by count, and 17 hedge words (after: 17) compared.

3 pairs (all there are), taken at even intervals through the chapter:

1. Before: And the pastor who is destabilized by resistance — who reads every objection as a crisis and every critic as an enemy — will be progressively less effective as a change leader because he cannot distinguish between the resistance that should slow him down and the resistance he needs to move through.
   After: And the pastor who is destabilized by resistance, who reads every objection as a crisis and every critic as an enemy, will be progressively less effective as a change leader because he cannot distinguish between the resistance that should slow him down and the resistance he needs to move through.
2. Before: They are served by being genuinely heard — by having their loss acknowledged with the same pastoral care the pastor would give to any other form of grief.
   After: They are served by being genuinely heard, by having their loss acknowledged with the same pastoral care the pastor would give to any other form of grief.
3. Before: This resistance requires a different kind of engagement — a direct, clear conversation that names the dynamic honestly and invites genuine engagement with the substance rather than the power dimension.
   After: This resistance requires a different kind of engagement: a direct, clear conversation that names the dynamic honestly and invites genuine engagement with the substance rather than the power dimension.


## Evaluating and Celebrating the Change (`sec07.xhtml`)

Words 751 to 751. Em-dashes in his prose 10 to 0 (13.3 to 0.0 per 1,000 words). Tells 18 to 8 (24.0 to 10.7 per 1,000). Mean sentence 23.5 words to 23.5; sentences of eight words or fewer 15.6% to 15.6%; of five or fewer 6.2% to 6.2%. 8 edits; paragraphs 13 to 13. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 10 to 0, not_but 2 to 2, anaphora 2 to 2, intens 2 to 2, one_line_para 1 to 1, forbidden 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 0 numbers in digits, 14 number words, proper names by count, and 11 hedge words (after: 11) compared.

Five pairs, taken at even intervals through the chapter:

1. Before: The change that succeeds must be evaluated and celebrated — evaluated to ensure it actually achieved the purpose it was introduced to serve, and celebrated in a way that honors both the people who led it and the people who received it.
   After: The change that succeeds must be evaluated and celebrated: evaluated to ensure it actually achieved the purpose it was introduced to serve, and celebrated in a way that honors both the people who led it and the people who received it.
2. Before: And the pastor who insists on measuring the right things — even when doing so is more complex and less immediately satisfying than measuring the easy things — will build a culture of genuine accountability for genuine results rather than institutional compliance with institutional metrics.
   After: And the pastor who insists on measuring the right things (even when doing so is more complex and less immediately satisfying than measuring the easy things) will build a culture of genuine accountability for genuine results rather than institutional compliance with institutional metrics.
3. Before: The change that has just been introduced is in its most fragile state — the early adopters are engaged, but the skeptics are still watching and the late adopters have not yet moved.
   After: The change that has just been introduced is in its most fragile state; the early adopters are engaged, but the skeptics are still watching and the late adopters have not yet moved.
4. Before: It is the community’s communal acknowledgment of what God has done — of the faithfulness that has been demonstrated, the work that has been accomplished, and the growth that has occurred.
   After: It is the community’s communal acknowledgment of what God has done: of the faithfulness that has been demonstrated, the work that has been accomplished, and the growth that has occurred.
5. Before: The congregation that has been well-celebrated for receiving a significant change will approach the next change with less resistance — because they have experiential evidence that the disruption of change produces genuine fruit, that their leaders celebrate them rather than simply demanding from them, and that the community they are part of is capable of growing through difficult transitions.
   After: The congregation that has been well-celebrated for receiving a significant change will approach the next change with less resistance, because they have experiential evidence that the disruption of change produces genuine fruit, that their leaders celebrate them rather than simply demanding from them, and that the community they are part of is capable of growing through difficult transitions.


## Conclusion: The Change That Changes You (`sec08.xhtml`)

Words 295 to 295. Em-dashes in his prose 6 to 1 (20.3 to 3.4 per 1,000 words). Tells 14 to 9 (47.5 to 30.5 per 1,000). Mean sentence 24.6 words to 24.6; sentences of eight words or fewer 16.7% to 16.7%; of five or fewer 0.0% to 0.0%. 3 edits; paragraphs 6 to 6. Paragraphs of fifteen words or fewer 1 to 1; runs of three fragments 0 to 0.

By kind (before to after): emdash 6 to 1, not_just 2 to 2, triplet 4 to 4, intens 1 to 1, one_line_para 1 to 1.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 1 Scripture references, 0 years, 1 numbers in digits, 2 number words, proper names by count, and 3 hedge words (after: 3) compared.

3 pairs (all there are), taken at even intervals through the chapter:

1. Before: And the pastor who has led change well — who has moved through the patient preparation, the careful coalition building, the honest announcement, the managed resistance, and the genuine evaluation — is a more skilled and more mature change leader than the pastor who has not.
   After: And the pastor who has led change well (who has moved through the patient preparation, the careful coalition building, the honest announcement, the managed resistance, and the genuine evaluation) is a more skilled and more mature change leader than the pastor who has not.
2. Before: It reveals things about the pastor’s own anxieties and needs — the places where the desire for approval shapes communication decisions, where the fear of conflict delays necessary confrontations, where the impatience for results leads to the shortcuts that produce resistance.
   After: It reveals things about the pastor’s own anxieties and needs: the places where the desire for approval shapes communication decisions, where the fear of conflict delays necessary confrontations, where the impatience for results leads to the shortcuts that produce resistance.
3. Before: The congregation that is led by a pastor who learns from every change process — who genuinely evaluates not just the change but his own leadership of it, who asks not just ‘did the change succeed’ but ‘did I lead it well, and what would I do differently’ — this congregation has a leader who will lead the next change significantly better than the last one.
   After: The congregation that is led by a pastor who learns from every change process (who genuinely evaluates not just the change but his own leadership of it, who asks not just ‘did the change succeed’ but ‘did I lead it well, and what would I do differently’) this congregation has a leader who will lead the next change significantly better than the last one.


## Appendix: The Change Communication Template (`sec09.xhtml`)

Words 253 to 253. Em-dashes in his prose 1 to 0 (4.0 to 0.0 per 1,000 words). Tells 30 to 29 (118.6 to 114.6 per 1,000). Mean sentence 8.4 words to 8.4; sentences of eight words or fewer 56.7% to 56.7%; of five or fewer 30.0% to 30.0%. 1 edits; paragraphs 23 to 23. Paragraphs of fifteen words or fewer 20 to 20; runs of three fragments 0 to 0.

By kind (before to after): emdash 1 to 0, triplet 2 to 2, q_answered 2 to 2, short_close 5 to 5, one_line_para 20 to 20.

Fact diff: **PASS**. Fixed blocks (title, subtitle, headings, pull quote, block quotes and their references) identical; 0 quoted strings, 0 Scripture references, 0 years, 5 numbers in digits, 0 number words, proper names by count, and 4 hedge words (after: 4) compared.

1 pairs (all there are), taken at even intervals through the chapter:

1. Before: (Be as specific as possible — avoid vague generalities)
   After: (Be as specific as possible; avoid vague generalities)

## The whole book

All nine files were edited. In his running prose (before the reflection questions): 5,566 words before and after; em-dashes 57 before, 2 after (both the dash before a Scripture reference); paragraphs unchanged in number. The fact diff passed on all nine.

**Every edit is punctuation.** Each recasts a dash as a comma, a colon, a semicolon or brackets. No word was added, removed or replaced. One pair of dashes around a quoted question became brackets (chapter 2: "asking genuine questions (“What do you see ...?”) will receive more useful ...").

**A second look (2026-11-26).** After the first pass, every place where the rule had closed brackets straight onto "but", "so" or "yet" beginning a new clause was found by search and given its comma ("), but"); one commit, the fact diff passing again.

**Forbidden Language list.** None of the listed words is in his prose.

## For James: things that look wrong, none of them changed

The booklet was read for this list in its dash contexts and searched for references, statistics and cross-references.

1. ★ **Stray chapter labels.** Each chapter's file ends with the next chapter's label: "CHAPTER ONE" closes the introduction, "CHAPTER TWO" closes chapter one, and so on to "CHAPTER SIX". The original PDF prints them the same way, at the foot of the previous chapter, and the chapters themselves carry no label. They were kept, as everything is kept, and they read as a mistake. Moving each label to the head of its own chapter is a small change he can approve.
2. The closing line of the introduction, Proverbs 15:22 ("Plans fail for lack of counsel, but with many advisers they succeed"), is the NIV's wording under a copyright line that names the ESV ("Without counsel plans fail, but with many advisers they succeed").
3. The booklet is "Book 11 in The Hard Issues Series" in the site's older data (`client/src/data/content-data.json`, whose entry still points to the Pastors Connection Network's store); the booklet's own text does not name the series or the network. Listed only so that the old entry is not mistaken for the served booklet.

## Questions only James can answer

1. Move each "CHAPTER ..." label to the head of its own chapter?

## The files

Rebuilt after the last chapter: still 40 pages (`client/src/data/booklets.ts` says 40), PDF 457 KB, EPUB 257 KB. `--verify`: the EPUB carries exactly the source folder's text (6,411 words compared, no difference); the PDF's pages carry the same text character for character (34,333 against 34,333). The title page, the introduction's last page and a chapter opening were looked at as images on the first build.
