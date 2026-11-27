# What about people who never heard?: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/never-heard.json` (its "older" captions, "think" and "differ" notes), with its rows in `docs/work/elite/explorer-ledger.md` ("What about people who never heard? (`never-heard`)"). It adds the live hard-question pages `client/public/questions/religions/those-who-never-heard.json` (record `docs/work/elite/apol-pilot/religions/those-who-never-heard.md`, apol-ledger twentieth run, key "az") and `client/public/questions/religions/is-it-arrogant-to-say-jesus-is-the-only-way.json` (record `.../is-it-arrogant-to-say-jesus-is-the-only-way.md`, key "ay"), and the Honest Answer "is-jesus-the-only-way" in `client/src/data/answers.ts`. Nothing was added from outside these. Abbreviations: **Film** = the old film; **Never** = the never-heard page (same text as its record); **Arrogant** = the arrogance page; **Answer** = the Honest Answer.

The film takes no side among restrictivism, inclusivism, the meeting with Christ after death, and the hope of restoration (Never, "Where Christians differ"; Film, `differ`). Nothing is said about James. The old film's care line ("If someone you love has died ...") stays on the page, unchanged and not narrated.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-26.

- **Genesis 18:25** (spoken): "Will not the Judge of all the earth do what is right?" Film frame "question"; Never, "What is true in it".
- **Acts 4:12** (spoken): "there is no other name under heaven given to men by which we must be saved". Film frame "one-savior"; Never, "The evidence"; Arrogant, "The evidence".
- **Genesis 15:6** (spoken): "Abram believed the LORD, and it was credited to him as righteousness." Film frame "his-work-reaches"; Never, "The evidence".
- **Romans 2:15** (shown, not spoken): "the work of the law is written on their hearts". Never, "The evidence".
- **Romans 10:14** (shown, not spoken): "And how can they believe in the One of whom they have not heard?" Film frame "hear-and-believe"; Never, "The evidence".
- **1 Peter 4:6** (spoken, as a clause): "the gospel was preached even to those who are now dead". Film frame "everyone-meets"; Never, "The evidence".
- **Hebrews 9:27** (spoken inside the narration, not set as the chapter's on-screen verse): "man is appointed to die once, and after that to face judgment" (BSB "Just as man is appointed to die once, and after that to face judgment,"; checked by hand against `hebrews/9.json`). Never, "The evidence".
- **John 5:22** (spoken): "the Father judges no one, but has assigned all judgment to the Son". Never, "The strongest reply, and an answer".
- Referred to, not quoted: Romans 3:23 ("all have sinned", Never, "The evidence"); Matthew 25:46 and Colossians 1:20 are not used.

## Claims, chapter by chapter

**A woman in a village**
- The woman who lived a thousand years ago in a village where Jesus' name was never spoken; honest, loved her children, prayed to whatever she knew of God; "What becomes of her?" Never, "The objection at its strongest", paragraph 1 (a hypothetical, framed in the film as "Picture").

**The case against**
- Kenneth Himma, 2002 ("Finding a High Road: The Moral Case for Salvific Pluralism"): a perfectly good God would not punish people not morally to blame; people of non-Christian beliefs are generally not to blame for them. Never, objection, paragraph 2 (paraphrased); `objectionSource`.
- John Hick, *God Has Many Names* (1980): religion depends "in the great majority of cases" on "where he was born." Never, objection, paragraph 3 (the narration paraphrases without quotation marks). The "luck" framing: same paragraph ("the luck of birth").

**What's true in it**
- Abraham pressed God before Sodom's judgment; God did not rebuke the question, he answered it. Never, "What is true in it", paragraph 1; Film frame "question".
- Most people who have ever lived never heard the name of Jesus; answering with a shrug is wrong. Never, "What is true in it", paragraph 2.

**Two claims, not one**
- "Saved only by Christ" and "saved only by knowing his name and trusting him in this life" are two claims the objection runs together and Scripture keeps apart; the church confesses the first without hedging; the second may be true but is a different claim. Never, "The evidence", paragraph 1.
- Peter said "no other name" as a prisoner on trial; it was not a boast. Arrogant, short answer and "The evidence", paragraph 2.

**Before Bethlehem**
- Abraham lived long before Bethlehem; every Christian tradition holds that he (with the faithful of Israel) was saved by Christ, by a work done centuries after they died. Never, "The evidence", paragraph 2.

**By the light they had**
- Judgment is measured by the light a person had; no one in Scripture is condemned for never hearing a name; Paul says all have sinned; the question whether one can be rescued by a Christ he never knew; Christians answer in more than one way. Never, "The evidence", paragraphs 3 and 4; Film frame "not-far".

**First: hear and believe**
- Restrictivism: a person must hear the gospel and trust Christ in this life; no one is condemned for not hearing but for sin against the light he had; God may bring the gospel to anyone who seeks him; hardest question: "the multitudes who lived and died with no messenger in reach." Never, "The evidence", paragraph 5; Film frame "hear-and-believe".
- Ronald Nash, *Is Jesus the Only Savior?* (1994), for the view that explicit faith in Christ is required. Never, "Read further" (apol-ledger key az row: replaced the 1995 three-views volume, from the Study Bible's note on John 14).

**Second: his work reaches further**
- Inclusivism: no one is saved apart from Christ, but his work may reach some who never knew his name and who answered, in faith, the light God gave them. Never, "The evidence", paragraph 6 (word for word); Answer, "What about those who never heard?".
- Karl Rahner as its best-known defender (as the Stanford Encyclopedia describes him). Never, paragraph 6; apol-ledger key az row.
- Clark Pinnock defended a form of it in *A Wideness in God's Mercy* (1992). Never, paragraph 6; Answer.
- Hardest question: why the New Testament presses so hard on hearing; even devout Cornelius still had to be told. Never, paragraph 6.

**Third: a meeting with Christ**
- Everyone will meet Christ and be able to answer him at death or after it; 1 Peter 4:6 read "as a door the church should not close"; hardest question Hebrews 9:27. Never, "The evidence", paragraph 7; Film frame "everyone-meets". (The film's "shouldn't" is a contraction of the page's "should not".)
- Origen and Gregory of Nyssa held a hope that God will in the end restore all; the church's councils and confessions have generally not received it. Never, "The evidence", paragraph 8 (the 553 dispute is deliberately left out); Film `differ`.

**Without comfort?**
- The strongest reply: a distinction without comfort; if only those who hear can be rescued, rescue still depends on birthplace. It lands on one Christian view, not the confession; inclusivists deny its premise; some restrictivists argue that God, knowing what every person would freely do, may have ordered the world so that no one who would have believed is left without the chance; others confess God's ways are above ours. Never, "The strongest reply, and an answer", paragraphs 1 and 2. (The middle-knowledge answer is given without a name, as the page gives it; apol-ledger key az row.) The page's "critics answer that this can't be shown true" was cut for length, not for lack of source.

**Who the Judge is**
- Which answer is right is not settled by the creeds. Never, "What remains unresolved".
- All confess the Judge; judgment belongs to Christ, "who wept at a friend's grave". Never, "Where Christians differ", paragraph 2; Film frame "the-judge" and its ledger row (BSB John 11:35).
- "Almost everyone who asks ... has heard. What do you think you are meant to do with what you have been told?" Film, `think.older` (reworded as a pause).
- Title card, "We were never handed the list. We were told who keeps it.": Answer, "What about those who never heard?", last paragraph, word for word.
