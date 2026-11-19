# Voice ledger: the six-lens spoken-voice pass, essays 1 to 5

Brief: /home/user/briefs/voice.md (James, 2026-11-19: "run these through all the writings"). Governing standard: docs/VOICE-JAMES-BELL.md, then CLAUDE.md. Pass run 2026-11-19 on branch elite/voice.

## Method

Each essay was read whole, its thesis written in one line, its tells counted, and the six lenses run in order (human rewrite, thought flow, pattern disruptor, voice shaper, make it hit, credibility test), each held inside the guardrails. Edits were applied as exact old/new pairs, each required to match once, so every change is reviewable in git (`git diff 5a248976 -- client/public/essays/`). The draft in docs/work/essays/<slug>.md is regenerated from the JSON after each edit, so draft and published file still match, and client/src/lib/essayOverrides.generated.ts was rebuilt each time.

Two scripts, kept outside the repo in the session scratchpad (voice/factdiff.mjs and voice/tells.mjs):

- **Fact diff.** For the before and after file, it extracts every quoted string (straight and curly), every block quote, every Scripture reference (the shape the essay gate uses, from scripts/lib/essay-text.mjs), every four-digit year, every number written in digits, every number word (two through ninety, hundred, thousand, million, percent, half, dozen, third and so on), every capitalized proper name (counted by occurrence, not just presence), every heading, every link (text and target) and every italic title, plus the slug and title. It fails if any count differs. No allow-list was used for any essay.
- **Tell counter.** Our prose only (quotations, block quotes, headings and Closing Texts blanked). It counts the tells voice.md lists: "not X, but Y"; "not just X but Y"; "Not X. Y."; "isn't X, it's Y"; triplets; three-beat fragments; anaphora runs (three sentences opening on the same word); same-length runs (three sentences within about 15 percent of one another); paragraphs ending on a sentence of eight words or fewer; a colon before a reveal; the stock turns ("The question is", "The truth is", "Here is what", "Which is to say", "And yet"); a question answered at once; adjective pairs; "deeply", "profoundly", "simply", "truly", "ultimately"; mirrored clauses; summary sentences; a section closing on ten words or fewer. It is a heuristic. Its triplet, same-length and short-verdict counts include false positives (a list of names, a syllogism, a Scripture citation ending a paragraph), so read the counts as direction, not a grade.

## Totals

| Essay | Words before | Words after | Change | Tells before | Tells after | Fact diff |
|---|---|---|---|---|---|---|
| why-does-god-feel-far-away | 3741 | 3730 | -0.3% | 23 | 21 | PASS |
| doubt-after-church-abuse | 4077 | 4067 | -0.2% | 28 | 24 | PASS |
| excavation-not-demolition | 3702 | 3697 | -0.1% | 35 | 30 | PASS |
| what-post-christian-means | 3966 | 3964 | -0.1% | 29 | 23 | PASS |
| the-rise-of-the-nones | 3561 | 3551 | -0.3% | 20 | 14 | PASS |
| **All five** | 19047 | 19009 | -0.2% | 135 | 112 | 5 of 5 |

Mean sentence length and spread hardly moved (for example 16.5 words, sd 9.0, to 16.4, sd 8.9 in the first essay). Em-dashes in our prose: none before or after (the counter's "em-dash" figure counts the en-dash in verse ranges such as 1 Samuel 2:13–16, which the gates allow).

## 1. why-does-god-feel-far-away

**Thesis.** Feeling that God is absent is not the same as his absence: Scripture prays it, the church has named its several causes (sin, a God-given dryness, illness, the age we live in), and the cross shows God present in the darkest silence.

**Tells.** 23 to 21. Colon before reveal 3 to 2, intensifier 2 to 1. Everything else level.

**Changes.** 15 edits: contractions where the sentence was already spoken; the signpost "the first thing to say about them is that" cut and replaced by a line that sets up the next section's heading; "harder to hear than the silence was: the Babylonians are coming" made two sentences; the dry-season paragraph turned from "It means ... It also means" to direct address; the closing three one-line paragraphs folded to two; "simply" cut once.

**Three pairs.**
1. "Those are real questions, and the first thing to say about them is that the feeling of God's absence and the absence of God are two different things" became "Those are real questions, and they deserve better than the quick answers people usually get. The feeling of God's absence and the absence of God are two different things".
2. "A sixteenth-century friar refused to spiritualize everything." became "That's a sixteenth-century friar refusing to make everything spiritual."
3. "For anyone in a dry season, that means keeping on is itself faith. It means praying when the prayers seem to stop at the ceiling ... It also means remembering that Moses could not keep his own arms up, and somebody had to hold them." became "If you're in a dry season, then, keeping on is itself faith. That looks like praying when the prayers seem to stop at the ceiling ... And remember that Moses couldn't keep his own arms up. Somebody had to hold them."

**Left alone.** The whole "When It Is More Than a Dry Season" section (988, Find Help, the medical sentence), word for word. The Lewis, Mother Teresa, John of the Cross, Taylor, Schellenberg and Kierkegaard paragraphs except contractions: each sentence there was corrected against a source in the essay's ledger (corrections 1 to 22), so rhythm changes would put verified paraphrase at risk. "The Bible does not treat the felt absence of God as an embarrassing exception. It writes it into the prayer book." stays as the one "Not X. Y." in its movement.

**Lens against guardrail.**
- Lens 3 flagged "So a loving God would make sure ..." and "So a perfectly loving God does not exist." as summary sentences. They are Schellenberg's syllogism in its own form; the steelman keeps full strength.
- Lens 4 pulled toward ranking the two readings of Mother Teresa's letters ("more reasonable"). The essay says "at least as reasonable"; no new opinion, so it stays.
- Lens 3 flagged the even run "But offered as the first word to every doubter, that reply is hard to square with experience. Anyone who has sat ..." That wording is the negotiated steelman of the Romans 1 reply (ledger correction 18); left.
- Lens 4 did turn "Its premises are hard to wave off." into "I find its premises hard to wave off." That is the essay's own judgment put in the first person, not a new claim about James's life.

## 2. doubt-after-church-abuse (crisis-facing)

**Thesis.** Abuse by a church leader turns into doubt about God because the abuser stood in God's name; Scripture stands against such shepherds and with the people they harmed, and forgiveness never means silence, staying, or not reporting.

**Tells.** 28 to 24. Colon before reveal 6 to 2, "not X, but Y" 3 to 2 (the counter's reading).

**Changes.** 19 edits, all small: contractions; four colon reveals made plain sentences ("does: it teaches" to "does. It teaches"; "protect: a leader" to "protect. It's a leader"; "first: a reason" to "first. It turns into a reason"; "Bible: from its prophets" to "Bible, from its prophets"); one passive, dangling sentence made active.

**Three pairs.**
1. "Used to silence a congregant her pastor has harmed, a verse about God shielding the weak from the powerful is turned upside down." became "When someone uses it to silence a congregant her pastor has harmed, they've turned a verse about God shielding the weak from the powerful upside down."
2. "Either reading is true to what abuse at the altar does: it teaches people to recoil from God." became "Either reading is true to what abuse at the altar does. It teaches people to recoil from God."
3. "The David story does not say what it is used to say either." became "The David story doesn't say what people use it to say, either."

**Left alone (care).** Checked by script: the paragraph "First, a few plain things ..." (police, child protective services, 988, Find Help, not legal or medical advice) and the paragraph "The order matters: safety first, then help, then the slower questions ..." are byte for byte unchanged. "Whoever you are, what was done to you was not your fault. The doubt that followed is not proof that your faith was weak." unchanged (only "I will" and "It is" around it became contractions). Every sentence about the abuse itself (Shiloh, Boston, the SBC reports, Zacharias, Nassar) keeps its full weight; nothing was softened and nothing was made harsher toward the reader.

**Lens against guardrail.**
- Lens 3 flagged "The order matters: safety first, then help, then the slower questions." as a colon reveal and a triplet. It is safety wording; the guardrail won and it stays word for word.
- Lens 5 (make it hit) pulled at the skeptic's paragraph ("If a faith's central texts can be bent this far ..."). It is a steelman at full strength; untouched.
- Lens 4 pulled at "Christians disagree about whether forgiveness has to wait for the wrongdoer's repentance, and faithful churches answer that question differently." The essay takes no side there and still takes none.
- The essay's last line, "He keeps his word.", was counted as a section closing on an aphorism. Left: it is a promise grounded in Ezekiel 34:16, not an aphorism, and a wounded reader should end on it.

## 3. excavation-not-demolition

**Thesis.** Much of what deconstruction tears down was never the Christian faith, so the work is to dig through the additions to the creedal floor and rebuild there, not to demolish everything.

**Tells.** 35 to 30. Intensifier 3 to 1, triplet 5 to 4, same-length run 7 to 6, colon before reveal 2 to 1.

**Changes.** 11 edits: contractions; "the habit simply lapsed" and "did it simply come down" made plain speech; the Arius slogan colon folded into its sentence.

**Three pairs.**
1. "They moved, or their family changed, or the habit simply lapsed." became "They moved, or their family changed, or they just fell out of the habit."
2. "Or did it simply come down with the first because it was standing nearby?" became "Or did it just come down with the first because it happened to be standing nearby?"
3. "People like that are not usually rebels. They are grieving something they took seriously." became "People like that usually aren't rebels. They're grieving something they took seriously."

**Left alone.** The "If You Are Hurting" section, word for word. The three questions closing the opening ("Where does deconstruction usually start? What deserves to come down? And what is underneath when it does?"): three things of equal weight, one per section, which CLAUDE.md allows. The Smith and Denton creed list: it is their summary, and its even sentences are theirs. The sentence weighing left and right ("The fusion is the same sin wherever it appears, but ... it has run mostly to the right."): a calibrated judgment the ledger records; no lens may move it. Thirteen paragraphs end on a short sentence; most are earned ("We built it that way." "Which of mine would?"), so they stay.

**Lens against guardrail.**
- Lens 3 wanted the Arius slogan set off as a quotation ("there was a time when he was not"). Quotation marks would claim verbatim wording the ledger does not record, so it stays unquoted: "summed up in the slogan that there was a time when he was not."
- Lens 3 flagged "truly God and truly man" (Chalcedon) as an intensifier. It is the council's language; kept.

## 4. what-post-christian-means

**Thesis.** What has ended in America is Christendom, the arrangement in which the culture handed people the faith, not the faith itself, and Jeremiah's letter shows the church how to live after it: build, plant, seek the city's welfare, and do not dissolve into it.

**Tells.** 29 to 23. Colon before reveal 9 to 6, intensifier 3 to 1, short-verdict paragraph endings 7 to 6.

**Changes.** 14 edits: contractions; three colon reveals made plain; the mirrored "surrendered ... can never surrender" loosened; "I hold that loosely. It is an interpretation, not a finding. But it fits the shape of the data." made one movement; the two closing one-line paragraphs joined.

**Three pairs.**
1. "But a church content to be a private preference has already surrendered the one thing a missionary can never surrender: the claim that the gospel is true for everyone, whether they choose it or not." became "But a church content to be a private preference has already given up the one thing no missionary can afford to give up, the claim that the gospel is true for everyone, whether they choose it or not."
2. "The American church is being asked something much smaller, and it is finding it hard anyway: to work for the good of neighbors" became "The American church is being asked to do something much smaller, and it's finding it hard anyway. It's being asked to work for the good of neighbors".
3. "I hold that loosely. It is an interpretation, not a finding. But it fits the shape of the data." became "I hold that loosely. It's an interpretation, not a finding, though it does fit the shape of the data."

**Left alone.** Every statistic (Gallup, Pew, generations), every date, the Newbigin quotations. "The faith itself is not." stands alone as the essay's thesis line at a hinge, which VOICE-JAMES-BELL.md allows once. "His answer was not a strategy for winning the culture back. It was a congregation." stays as the one "Not X. Y." in its movement. The two questions to the reader's church stay as they are; the brief forbids new first-person claims, so no "watching mine" was added.

**Lens against guardrail.**
- Lens 3 flagged "the idea that secularism is simply what is left once religion's illusions have been scraped away." Here "simply" carries Taylor's idea (the subtraction story). Kept.
- Lens 3 flagged "Whatever the headlines predicted, belief is still widespread in this country, even as fewer people join a church." as a summary sentence. Cutting it would leave the numbers without their plain meaning for a seeker, and any sharper version ("most Americans") would change the claim. Kept as written.
- The final read (ledger, 2026-10-28) had already kept "the end of a subsidy we had not noticed we were living on"; this pass changed only "simply" and the contraction.

## 5. the-rise-of-the-nones

**Thesis.** Most of the Americans who left the church drifted away from a faith the church had made too thin to hold them, with politics on both sides and abuse driving others, and the church has to go looking for them as Ezekiel's shepherds did not.

**Tells.** 20 to 14. Colon before reveal 3 to 1, intensifier 2 to 0, same-length run 7 to 5.

**Changes.** 14 edits: contractions; "simply" cut twice; "Sociologists have a name for people like this: unchurched believers." made plain; an even three-sentence run joined; the closing pair of one-line paragraphs joined.

**Three pairs.**
1. "Sociologists have a name for people like this: unchurched believers." became "Sociologists call people like this unchurched believers."
2. "The research bears out parts of both stories. It finds real disbelief and real injury. Most often it finds something less dramatic." became "The research bears out parts of both stories, and it finds real disbelief and real injury. Most often, though, it finds something less dramatic."
3. "Plenty of the people who left simply stopped coming, which is exactly the danger the letter to the Hebrews names:" became "Plenty of the people who left just stopped coming, and that's exactly the danger the letter to the Hebrews names:".

**Left alone.** "I was raised without a father, and I am raising five sons." James's own sentence about his own life, confirmed facts; not re-voiced, not enlarged. The abuse-reporting sentence and the Find Help link, word for word. "So the decline has no political home." and the paragraph holding the left and the right to the same evidence. The pastoral questions closing the Ezekiel section ("Who noticed when they stopped coming? Who went looking?"), flagged as three-beat fragments, kept: they are the essay's point turned on the reader and on James ("me included").

**Lens against guardrail.**
- "About four in ten said they simply don't need religion": cutting "simply" brought the line closer to Pew's own wording ("not having a need for religion"), so lens and guardrail agreed.
- Lens 4 could have sharpened the mainline paragraph against one side; the essay's position is that neither side's story fits, and it stays that way.

## What only James can supply

- A true detail in place of a general line. Three places would gain most: "I lead one, and I feel that pull too." (doubt-after-church-abuse, the pull to protect a church's name); "Which of mine would?" (excavation-not-demolition, which of his sermons would not survive his sons' questions); and the father sentence in the-rise-of-the-nones, which now stops at the fact. None was invented here.
- Whether to restore a line about his coming to faith from atheism in why-does-god-feel-far-away. The final read of 2026-10-28 cut "I came to faith as an adult, out of atheism, so I don't think that answer is stupid" when no biography could be stated; that fact is now confirmed, but restoring it would add a first-person claim, which this brief forbids. His call.
