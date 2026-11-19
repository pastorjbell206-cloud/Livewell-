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

---

# Second run: Bible background guides

Pass run 2026-11-19 on branch elite/voice, on the 41 guides in client/public/context/guides/*.json ("Reading Scripture in Context"). These are third-person reference writing, so under the brief lens 4 added no opinion and nothing became first person; the lenses meant a teacher talking to an ordinary adult. The first person that some guides already had ("Pastors, and I am one", "So do I.", "When I read Matthew 23") was kept, never enlarged, never added to.

## Method

The two scripts from the first run were adapted to the guides' shape (kept in /home/user/tmp-voice/g/scripts: guide2essay.mjs, gtells.mjs, gfact.mjs, gapply.py, rank.sh).

- **Tell counter (gtells.mjs).** As before, with two changes: the "Not X. Y." detector is broader (any short negating sentence followed by a short positive one, which also catches "No ...", "never", "isn't"), and "three-beat fragments" now counts maximal runs of three or more sentences of eight words or fewer. It still over-counts (a list of names, "spoke Greek, not Hebrew. Their children ..."), so read it as direction.
- **Fact diff (gfact.mjs).** Every field except the section bodies must be byte-identical: slug, title, subtitle, kicker, group, each section's id, kicker and title, keyTexts, sources. The bodies then go through the first run's factdiff.mjs: every quoted string, Scripture reference, year, number, number word, capitalized name (counted by occurrence), link and italic. One change: a capitalized word at the start of a sentence counts as a name only if its lowercase form appears nowhere in the site's guides, portraits and essays (a word list of about 8,900 words), so "Think" or "Trust" opening a new sentence is not read as a name. Words added to that list by hand after a false alarm: breathe, orators, factions, genital, gymnasiums. Length must stay within 5 percent. Edits were applied as exact old/new pairs, each matching once, and only the body strings were rewritten in the raw file, so the sources' one-line formatting in two files is untouched.
- **Unquoted Scripture.** Several guides quote Scripture without quotation marks (the KJV lines in the-gods-of-the-nations, the ESV phrases in exile-not-empire, the-cities-of-paul and purity-and-contagion). The fact diff cannot see those, so each was kept word for word by hand and checked in the diff.

## Ranking of all 41 (before)

Tells per 1,000 words of our own prose (quotations blanked); "Not X. Y." is the broad count.

| Rank | Guide | Words | Tells | Per 1,000 | "Not X. Y." |
|---|---|---|---|---|---|
| 1 | the-gods-of-the-nations | 921 | 28 | 30.4 | 6 |
| 2 | septuagint-and-scripture | 902 | 27 | 29.9 | 6 |
| 3 | exile-not-empire | 980 | 29 | 29.6 | 3 |
| 4 | pharisees-sadducees-essenes | 922 | 27 | 29.3 | 2 |
| 5 | honor-status-and-the-cross | 993 | 29 | 29.2 | 11 |
| 6 | money-texts-we-explain-away | 990 | 28 | 28.3 | 2 |
| 7 | the-cities-of-paul | 962 | 27 | 28.1 | 8 |
| 8 | purity-and-contagion | 963 | 26 | 27.0 | 8 |
| 9 | between-the-testaments | 899 | 24 | 26.7 | 6 |
| 10 | gospel-against-empire | 909 | 24 | 26.4 | 4 |
| 11 | the-kingdom-is-not-a-platform | 994 | 26 | 26.2 | 6 |
| 12 | what-justice-meant | 1034 | 27 | 26.1 | 5 |
| 13 | patronage-and-grace | 918 | 24 | 26.1 | 7 |
| 14 | messianic-expectation | 908 | 23 | 25.3 | 5 |
| 15 | left-lens-right-lens | 964 | 24 | 24.9 | 3 |
| 16 | genesis-one-in-its-world | 910 | 22 | 24.2 | 5 |
| 17 | hospitality-and-the-stranger | 968 | 23 | 23.8 | 1 |
| 18 | temple-and-synagogue | 926 | 21 | 22.7 | 2 |
| 19 | misreading-with-western-eyes | 956 | 19 | 19.9 | 5 |
| 20 | the-bible-is-not-an-american-book | 978 | 19 | 19.4 | 4 |
| 21 | the-slavery-texts | 994 | 19 | 19.1 | 5 |
| 22 | covenant-and-treaty | 901 | 17 | 18.9 | 4 |
| 23 | collectivist-world-individualist-readers | 955 | 18 | 18.8 | 5 |
| 24 | honor-shame-vs-guilt | 923 | 17 | 18.4 | 4 |
| 25 | wisdom-and-the-nations | 969 | 17 | 17.5 | 4 |
| 26 | isaiah-41-10-in-context | 1451 | 25 | 17.2 | 1 |
| 27 | psalm-91-in-context | 1458 | 23 | 15.8 | 5 |
| 28 | philippians-4-13-in-context | 1536 | 24 | 15.6 | 4 |
| 29 | women-in-the-ancient-world | 1040 | 16 | 15.4 | 3 |
| 30 | did-the-gospels-get-jesus-right | 1072 | 16 | 14.9 | 2 |
| 31 | torah-and-the-law-codes | 943 | 14 | 14.8 | 1 |
| 32 | miracles-and-the-ancient-mind | 1042 | 14 | 13.4 | 4 |
| 33 | romans-13-1-in-context | 1506 | 20 | 13.3 | 5 |
| 34 | household-codes-in-context | 979 | 13 | 13.3 | 0 |
| 35 | the-violence-of-the-old-testament | 1058 | 14 | 13.2 | 4 |
| 36 | romans-8-28-in-context | 1452 | 19 | 13.1 | 3 |
| 37 | 2-chronicles-7-14-in-context | 1388 | 18 | 13.0 | 0 |
| 38 | matthew-7-1-in-context | 1451 | 16 | 11.0 | 2 |
| 39 | proverbs-3-5-6-in-context | 1466 | 15 | 10.2 | 3 |
| 40 | jeremiah-29-11-in-context | 1386 | 14 | 10.1 | 4 |
| 41 | matthew-18-20-in-context | 1505 | 13 | 8.6 | 2 |

All 41 before: 44,472 words, 164 "Not X. Y." (36.9 per 10,000 words; the audit's narrower count was 117), 58 runs of three or more short sentences. All 41 after: 44,658 words, 107 "Not X. Y." (24.0 per 10,000), 26 runs. The fifteen alone: 82 to 25, and 34 runs to 2.

## The fifteen

| Guide | Words before | Words after | Change | Tells before | Tells after | "Not X. Y." | Short runs | Fact diff |
|---|---|---|---|---|---|---|---|---|
| the-gods-of-the-nations | 921 | 946 | +2.7% | 28 | 13 | 6 to 1 | 3 to 1 | PASS |
| septuagint-and-scripture | 902 | 928 | +2.9% | 27 | 10 | 6 to 2 | 0 to 0 | PASS |
| exile-not-empire | 980 | 1009 | +3.0% | 29 | 12 | 3 to 2 | 3 to 0 | PASS |
| pharisees-sadducees-essenes | 922 | 941 | +2.1% | 27 | 6 | 2 to 0 | 1 to 0 | PASS |
| honor-status-and-the-cross | 993 | 1017 | +2.4% | 29 | 12 | 11 to 2 | 3 to 0 | PASS |
| money-texts-we-explain-away | 990 | 1001 | +1.1% | 28 | 15 | 2 to 1 | 2 to 0 | PASS |
| the-cities-of-paul | 962 | 968 | +0.6% | 27 | 13 | 8 to 2 | 1 to 0 | PASS |
| purity-and-contagion | 963 | 969 | +0.6% | 26 | 7 | 8 to 1 | 4 to 0 | PASS |
| between-the-testaments | 899 | 908 | +1.0% | 24 | 5 | 6 to 0 | 3 to 0 | PASS |
| gospel-against-empire | 909 | 916 | +0.8% | 24 | 10 | 4 to 3 | 5 to 1 | PASS |
| the-kingdom-is-not-a-platform | 994 | 999 | +0.5% | 26 | 14 | 6 to 3 | 1 to 0 | PASS |
| what-justice-meant | 1034 | 1034 | 0.0% | 27 | 15 | 5 to 1 | 1 to 0 | PASS |
| patronage-and-grace | 918 | 926 | +0.9% | 24 | 10 | 7 to 2 | 3 to 0 | PASS |
| messianic-expectation | 908 | 918 | +1.1% | 23 | 13 | 5 to 2 | 1 to 0 | PASS |
| left-lens-right-lens | 964 | 965 | +0.1% | 24 | 16 | 3 to 3 | 3 to 0 | PASS |
| **Fifteen** | 14,259 | 14,445 | +1.3% | 393 | 171 | 82 to 25 | 34 to 2 | 15 of 15 |

The "Not X. Y." left over are, in each guide, the one kept at its hinge ("They aren't chapters. They're mail."; "The four hundred years were not God's absence."; "The Pharisee is not a villain from someone else's religion."), the counter's false positives, and in the political guides the ones inside paired right-and-left paragraphs that were left alone on purpose (below). "honest" went from 7 uses to 2 (both literal: honest scales, honest speech), "simply" from 7 to 0, "verdict" from 5 to 3 (courtroom uses, plus the kicker "The Verdict", a field the fact diff holds fixed).

## Eight before-and-after pairs

1. honor-status-and-the-cross. "Shame was not a feeling. It was a location, the bottom of the ladder, visible to everyone." became "Shame, in that world, was where you stood, at the bottom of the ladder in full view, before it was anything you felt."
2. the-gods-of-the-nations. "So Baal worship was not exotic. It was agricultural insurance. It was the religion of making sure. Elijah's contest on Mount Carmel was not a seminar on comparative religion. It was a public test, held in the third year of a drought, of who actually sends rain." became "Baal worship, then, wasn't anything exotic. It was agricultural insurance, the religion of making sure. That's why Elijah's contest on Mount Carmel, held in the third year of a drought, was a public test of who actually sends rain, and nobody there mistook it for a seminar on comparative religion."
3. pharisees-sadducees-essenes. "And then there were the Pharisees, who chose none of those roads. Not accommodation. Not withdrawal. Not revolt. Their wager was ... without waiting for the politics to change. Holiness, at home, now." became "And then there were the Pharisees, who took none of those roads, neither accommodation nor withdrawal nor revolt. Their wager was ... without waiting for the politics to change. They wanted holiness at home, and they wanted it now."
4. between-the-testaments. "One prophet falls silent and a carpenter's son appears, and we assume the story simply paused. It did not pause. Four centuries passed on that page. Three empires rose and fell on that page." became "One prophet falls silent and a carpenter's son appears, and we assume the story just paused, when in fact four centuries passed on that page, and three empires rose and fell on it."
5. septuagint-and-scripture. "And remember what a Bible physically was. Not a bound volume on a nightstand but a cabinet of scrolls, expensive and communal, kept at the synagogue. ... The first century did not own Bibles. It knew them." became "Remember, too, what a Bible physically was. It was a cabinet of scrolls kept at the synagogue, expensive and shared, nothing like the bound volume on your nightstand. ... The first century didn't own its Bibles, but it knew them."
6. patronage-and-grace. "That was the scandal. Not that God gives. Every god gave. The scandal was who receives." became "Every god gave, so the scandal was never that God gives. The scandal was who receives."
7. exile-not-empire. "If not. No guarantee of winning. No requirement of winning. Faithfulness was never indexed to outcome." became "If not. There's no guarantee of winning in that, and no requirement to win either, because faithfulness was never tied to the outcome."
8. purity-and-contagion. "Jesus does not mock the purity map or wave it away. He fulfills its deepest hope from the other direction. The holy is no longer merely guarded. In him it has gone on offense. Holiness has become the contagious thing." became "Jesus never mocks the purity map or waves it away. What he does is fulfill its deepest hope from the other direction, so that the holy, which once could only be guarded, goes on offense in him, and holiness becomes the contagious thing."

## Left alone, and why

- Every section heading, kicker, subtitle and title, including the headings that are themselves "Not X. Y." slogans ("Not Hygiene. Not Sin. Order." in purity-and-contagion, "Not One Hope. Many." in messianic-expectation, "Confidence, Not Anxiety" in septuagint-and-scripture) and the subtitles built the same way (the-gods-of-the-nations, purity-and-contagion, messianic-expectation). The brief holds titles and kickers fixed and the subtitle is the index blurb; changing them is James's call.
- Every steelman and caveat: Sanders ("Scholars still argue over the edges"), "historians, skeptical ones among them, broadly agree", Wright and Barclay at equal weight with "genuinely contested", "There is real scholarship behind that reading", "Some of those arguments deserve real engagement", "Some of it was. Not all of it."
- Lists that are really lists: the Torah laws with their references in money-texts-we-explain-away, "Gospel. Lord. Savior." (the three words the guide is about), "Nicodemus was a Pharisee. So was Gamaliel ... So was Paul" (each name earns its sentence), the three senses of charis.
- Paraphrases attributed to a scholar or source (Cicero, Seneca, Hauerwas and Willimon, Newbigin, Keller, Barclay's "unconditioned ... not unconditional", Haidt's press secretary, Noll's "not by exegesis but by artillery"): wording kept or touched only by a contraction, because they are someone else's thought.
- Unquoted Scripture lines, in whatever translation the guide already used.

## Where a lens pulled against a guardrail, and the guardrail won

- money-texts-we-explain-away. Lens 3 flagged the mirrored endings of the two escape-route paragraphs ("Money becomes a heart issue, and the heart, conveniently, is invisible." / "Compassion becomes a position, and positions are free."). Both paragraphs are untouched, so neither side's route is described more sharply than the other's.
- what-justice-meant. The paragraphs "To my friends on the right ..." and "To my friends on the left ..." are untouched, including the left one's "The prophets were not activists for an agenda. They were witnesses against everyone". Taking the tic out of one paragraph only would have changed its weight against the other.
- the-kingdom-is-not-a-platform. Lens 3 wanted the anaphora "It is not the Republican platform ... It is not the Democratic platform ... It is not a centrist compromise" broken up. All three stay as they were; only "It is a throne" and the sentence after it were joined.
- left-lens-right-lens. The right-hand and left-hand sections got the same touch and nothing more: one contraction each ("That isn't balance. It's a tribe ..." / "They aren't reinterpreted; they just aren't preached."), two words shorter each.
- gospel-against-empire. Lens 3 flagged "genuinely contested" as an intensifier and "The honest position holds both" as a stock line. "honest" went ("A careful reader can hold both"); "genuinely contested" stayed, because it is the caveat.
- pharisees-sadducees-essenes. Lens 6 pulled toward "On his reading, Jews kept the law ..." to soften Sanders' claim into an attribution. Not done: the guide's own caveat follows two sentences later, and adding a hedge would change the claim.
- gospel-against-empire and left-lens-right-lens. The fragments "Gospel." and "Change them." stay: the first is the capitalized term the guide is about, the second the spoken turn of the test question; rewriting either failed the fact diff (a capitalized word lost) and was worse prose besides.
- the-gods-of-the-nations and others. Existing first-person lines ("I want to understand it ...", "So do I.") are left as they were. Reference writing should not gain first person, and these already had it; removing them is James's call, not this pass's.

## He and he for God

None of the fifteen mixes them: all fifteen use lowercase he/him/his for God in their own prose, and the Scripture they quote is lowercase too. Across the 41, the mixing is between the BSB quotations (which capitalize He, Him, His) and the guide's own lowercase prose, in seven guides: 2-chronicles-7-14-in-context, jeremiah-29-11-in-context, matthew-7-1-in-context, philippians-4-13-in-context, psalm-91-in-context, romans-13-1-in-context, romans-8-28-in-context. proverbs-3-5-6-in-context is the one guide that capitalizes in its own prose too (15 times), so it matches its quotations but not the rest of the library. Nothing was changed; James has not decided.

## Gates

All 36 content-gate commands in .github/workflows/ci.yml passed (list and last lines in /home/user/tmp-voice/gates.txt), pnpm check passed, pnpm test passed (146 test files, 1653 tests; 7 files and 73 tests skipped). node scripts/build-context-index.mjs rerun: guides-index.json unchanged (it reads only slug, title, subtitle and group). The search index and passage index --check runs were clean, so neither needed a rebuild. No build, no PDFs (they rebuild on deploy).

# Third run: Bible background guides 16 to 30

Pass run 2026-11-19 on branch elite/voice, on ranks 16 to 30 of the ranking above, worked the same way as the second run: same scripts (/home/user/tmp-voice/g/scripts), edits applied as exact old/new pairs to the section bodies only (the edit lists are kept in /home/user/tmp-voice/g/edits/<slug>.py), the guide fact diff run on every guide, unquoted Scripture checked by eye. Third-person reference writing: no opinion added, nothing made first person, existing first person left as it was. Words added to the fact diff's lowercase list after a false alarm (a capitalized word at a sentence start read as a name): projected, bankrolling. Two other false alarms ("Hospitality", "Individualism", "Fairness", "Jesus" counted once too few) were met by rewording so the count held, not by widening the list.

This run worked on section endings, as the last run asked. Of the 75 sections, the counter's "paragraph ends on a short verdict" fell from 58 to 25 and "section closes on an aphorism" from 38 to 18; endings now close variously on a long sentence, a joined clause, or a kept short line where it was earned ("Forget the story and the welcome dies.", "That instinct is data.", "Only a resurrection lets both be true.").

## The fifteen

Words are prose words with quotations blanked (the ranking's measure); the fact diff's own word count, which includes quotations, is within 1.7 percent on every guide.

| Guide | Words before | Words after | Change | Tells before | Tells after | "Not X. Y." | Short runs | Fact diff |
|---|---|---|---|---|---|---|---|---|
| genesis-one-in-its-world | 910 | 905 | -0.5% | 22 | 7 | 5 to 0 | 4 to 0 | PASS |
| hospitality-and-the-stranger | 968 | 971 | +0.3% | 23 | 7 | 1 to 0 | 2 to 1 | PASS |
| temple-and-synagogue | 926 | 938 | +1.3% | 21 | 10 | 2 to 0 | 1 to 0 | PASS |
| misreading-with-western-eyes | 956 | 949 | -0.7% | 19 | 12 | 5 to 2 | 1 to 0 | PASS |
| the-bible-is-not-an-american-book | 978 | 965 | -1.3% | 19 | 9 | 4 to 1 | 0 to 0 | PASS |
| the-slavery-texts | 994 | 990 | -0.4% | 19 | 14 | 5 to 5 | 2 to 0 | PASS |
| covenant-and-treaty | 901 | 900 | -0.1% | 17 | 6 | 4 to 1 | 1 to 0 | PASS |
| collectivist-world-individualist-readers | 955 | 970 | +1.6% | 18 | 11 | 5 to 2 | 4 to 1 | PASS |
| honor-shame-vs-guilt | 923 | 925 | +0.2% | 17 | 6 | 4 to 1 | 1 to 0 | PASS |
| wisdom-and-the-nations | 969 | 972 | +0.3% | 17 | 13 | 4 to 3 | 1 to 0 | PASS |
| isaiah-41-10-in-context | 1451 | 1451 | 0.0% | 25 | 21 | 1 to 1 | 0 to 0 | PASS |
| psalm-91-in-context | 1458 | 1456 | -0.1% | 23 | 23 | 5 to 5 | 0 to 0 | PASS |
| philippians-4-13-in-context | 1536 | 1533 | -0.2% | 24 | 18 | 4 to 1 | 0 to 0 | PASS |
| women-in-the-ancient-world | 1040 | 1048 | +0.8% | 16 | 5 | 3 to 1 | 2 to 0 | PASS |
| did-the-gospels-get-jesus-right | 1072 | 1071 | -0.1% | 16 | 10 | 2 to 3 | 1 to 0 | PASS |
| **Fifteen** | 16,037 | 16,044 | +0.04% | 296 | 172 | 54 to 26 | 21 to 2 | 15 of 15 |

The counter over-counts "Not X. Y." here more than last time, so read the 26 as direction. In the-slavery-texts all five left are false positives or protected (Deuteronomy's law itself, "not by exegetes but by armies" which is Noll's, Copan's attributed "not the end of the road", the closing pair, and the one kept hinge "The slaveholders didn't get their position from the text."). In did-the-gospels-get-jesus-right two of the three are counter noise created by joining sentences. The two short runs left are Scripture commands that are genuinely a list (Luke 10's "Take no moneybag ..." and "Bear with one another. Forgive one another. Confess to one another."). Each guide keeps one two-step at its hinge: "Not slaves. Image-bearers."; "The temple wasn't a big church."; "he isn't reading a calendar. He's reading a harvest."; "The Bible isn't an American book."; "The law is not how Israel earned a rescue."; "The individualist reflex isn't something Western Christians observe. It's something we are."; "Honor and shame is a lens, not a key"; "The difference between Job and Babylon isn't the honesty of the pain. It's whether anyone answers."; "What it doesn't promise is that the worst day won't come."; "God doesn't say the one who loves him will never be in trouble."; "Christ doesn't promise you the win."; "They weren't a footnote. We made them one."; "The seams were never the scandal. The claim is."

"honest" went from 12 uses to 4 (two literal, "the honesty of the pain" and "unflinching honesty about death" in wisdom-and-the-nations; "Now the honesty this site owes you" in the protected paragraph of women-in-the-ancient-world; and the subtitle-level field is untouched), "simply" from 6 to 1 (inside an existing first-person sentence, left alone), "verdict" from 11 to 9 (all left are literal courtroom uses: the honor-shame guide's inner courtroom and court of public opinion, Paul "facing a verdict", plus kickers and a subtitle, which are fixed fields).

## Eight before-and-after pairs

1. genesis-one-in-its-world. "But Genesis 1 was not written to an American living room. It was written to people who had never heard of geology and would not have cared. Their questions were different. Which god is in charge. Why does the world exist. What are human beings for. Is the sea a monster or a creature." became "But Genesis 1 wasn't written to an American living room. It was written to people who'd never heard of geology and wouldn't have cared, and they brought other questions to it, about which god is in charge, why the world exists, what human beings are for, whether the sea is a monster or a creature."
2. temple-and-synagogue. "Passover rehearsed the exodus every spring. Booths rehearsed the wilderness. Hanukkah rehearsed the Maccabees. A Jewish child did not learn theology from a book. He kept it, ate it, and sang it, year after year, until the story was load-bearing. The synagogue built the people the Gospels assume." became "Passover rehearsed the exodus every spring, Booths the wilderness, Hanukkah the Maccabees. A Jewish child didn't learn his theology from a book; he kept it, ate it and sang it, year after year, until the story was load-bearing. That's how the synagogue built the people the Gospels assume."
3. hospitality-and-the-stranger. "The ritual converted a potential threat into a protected guest. Water for the feet. Food, the best available, not the leftovers. Shelter for the night and protection while under the roof, defended at the host's own cost. Then safe passage on." became "Hospitality turned a potential threat into a protected guest. There was water for the feet and food, the best in the house rather than the leftovers, then shelter for the night and protection under the roof, defended at the host's own cost, and after that safe passage on."
4. covenant-and-treaty. "A contract asks, did you perform. A covenant asks, were you faithful. Those are different questions, and they produce different lives. One can be satisfied and filed away. The other follows you into the kitchen and the marriage and the long years when no one is watching." became "A contract asks whether you performed. A covenant asks whether you were faithful, and those questions produce different lives, since one can be satisfied and filed away while the other follows you into the kitchen and the marriage and the long years when no one is watching."
5. honor-shame-vs-guilt. "Crucifixion was not only execution. It was a machine for manufacturing shame." became "Crucifixion was execution, and it was also a machine for manufacturing shame."
6. women-in-the-ancient-world. "Named women. Traveling. Bankrolling a rabbi. There is no parallel for it among his contemporaries." became "These were named women, traveling with him and bankrolling a rabbi, and there's no parallel for it among his contemporaries."
7. the-slavery-texts. "The Code of Hammurabi runs the opposite direction. It prescribes death for the man who harbors a runaway. One code protects the fugitive. The other protects the owner. Every fugitive slave law in American history sided with Hammurabi." became "The Code of Hammurabi runs the opposite direction and prescribes death for the man who harbors a runaway. One code protects the fugitive and the other the owner, and every fugitive slave law in American history sided with Hammurabi."
8. did-the-gospels-get-jesus-right. "A short clock does not mean the claims are true. It means the comfortable theory of slow legend has no room to live." became "A short clock doesn't make the claims true. What it does is leave the comfortable theory of slow legend no room to live."

## Left alone, and why

- Every title, subtitle, kicker, heading, keyText and source, including the headings built as the two-step ("No Battle. No Rivals. No Slaves.", "Same Table. Different Host.", "Loyalty Is Not a Service Agreement", "A Lens, Not a Master Key") and the women guide's subtitle ("Not past every question. Past their world.").
- The three verse guides (Isaiah 41:10, Psalm 91, Philippians 4:13) were touched lightly: four, five and seven small edits. They were written later than the rest, already read as a teacher talking, and carry the help lines and the paired misreadings. Psalm 91's tell count did not move (23 to 23); its five two-steps are kind and exact where they stand ("Whoever has read it aloud in a waiting room wasn't being foolish."; "God did not deliver him then."), and its colons introduce real lists.
- Help wording, word for word: Isaiah's "If fear has begun to take your sleep or your days, tell someone, a pastor or a friend, and tell a doctor as well. Being helped is not a failure of faith." and Psalm 91's "If the grief is more than you can carry, tell someone today: a pastor, a friend, a doctor."
- Unquoted Scripture, in whatever translation the guide used: the KJV lines in covenant-and-treaty ("I am the LORD thy God ...", "thou shalt have no other gods before me") and wisdom-and-the-nations (Proverbs 22-24, Ecclesiastes 9), the ESV-style lines in hospitality-and-the-stranger (Hebrews 13:2, the Torah commands, Luke 10, Luke 14), misreading-with-western-eyes (Jeremiah 29:10-11, Romans 5:6, James 4), honor-shame-vs-guilt (Luke 13:17, Hebrews 12:2, Romans 9:33, Romans 3:19), the-slavery-texts ("You were slaves in Egypt.", Galatians 3:28) and collectivist-world-individualist-readers (Ezekiel 18, Romans 14:12, Acts 16). Hilarion's letter ("If it is a boy, keep it. If it is a girl, throw it out.") and Siduri's speech kept as they were.
- Paraphrases attributed to a scholar: Jipp ("not a detail of the story but its shape"), Copan ("not the end of the road"), Noll ("not by exegetes but by armies"), Walton, Burridge, Bauckham, Kitchen, deSilva, Cohick, Newbigin.
- Lists that are really lists: the Hittite treaty parts (varied in their joins, kept in order), the Luke 10 commands, the "one another" commands, Romans 16's names.

## Where a lens pulled against a guardrail, and the guardrail won

- the-bible-is-not-an-american-book. Lens 3 flagged the mirrored closers of the right and left paragraphs ("The flag moves to the front of the sanctuary and no one remembers voting on it." / "The kingdom gets a legislative calendar."). Both paragraphs are untouched; the sentence after them was changed only in the way that applies to both ("Notice that both made America the subject of the Bible.").
- psalm-91-in-context. The paragraph on the guarantee reading's politics and the opposite failure is untouched, so neither failure is described more sharply than the other. The same in isaiah-41-10-in-context ("whether we found the chosen servant in our nation or in our movement") and in philippians-4-13-in-context's "Two misreadings cut the passage from opposite ends" paragraph.
- women-in-the-ancient-world. Lens 3 flagged "Now the honesty this site owes you." as a stock opener. The whole paragraph stays, because it carries the equal-weight statement of both positions on 1 Timothy 2 and 1 Corinthians 14. Cohick's warning against caricature and "A skeptic is right to notice the distance still to travel" kept at full strength (the last joined to its partner, nothing cut).
- the-slavery-texts. Lens 5 pulled at "Do not let that comparison become a sedative. Ancient servitude was not employment." and at the closing pair; both kept their full weight (contractions only, and a semicolon in the closing pair). "So what does context actually buy here? Not acquittal for the church. Nothing buys that." became "Context won't buy the church an acquittal here, and nothing else will either.", which keeps the denial whole. "a skeptic who holds them against us is handling the evidence correctly" untouched.
- did-the-gospels-get-jesus-right. Lens 3 wanted "simply" out of "I want that objection on the table whole, because the answer to it is not a slogan, and because parts of it are simply true." It stays: it's an existing first-person sentence and it's the concession. "This does not certify every sentence" and "A short clock does not mean the claims are true" keep their limits ("doesn't certify", "doesn't make the claims true").
- genesis-one-in-its-world. "Be honest about the state of the question." became "It's worth being plain about where the question stands." Walton's proposal is still "a serious proposal" that "has also drawn substantial criticism, and the debate among scholars is live"; nothing about the age of the earth or evolution was added or implied, and the opening's question list ("How old is the earth ...") was joined, not answered.
- honor-shame-vs-guilt. "verdict" stays where it's the courtroom metaphor the guide is built on, and "Honor and shame is a lens, not a key that opens every text" stays as the caveat.
- misreading-with-western-eyes. "a believer in Nairobi or Manila" and "the writer included" untouched; nothing about any people was sharpened.

## First person these reference pages already carry (unchanged, for James)

- hospitality-and-the-stranger: "I write this as a pastor, and I am inside the problem: most of our tables seat people we already love."
- the-bible-is-not-an-american-book: "Anyone who preaches, and I do, knows the difference, because both can be done from the same pulpit."; "I am not above this."; and the generic reader's I in "When I arrive demanding my rights, the text keeps asking about my debts.", "where do I actually stand in it?" and "what I may claim ... what I owe" (that last sentence was rejoined, its first person unchanged: "The law and the prophets never ask what I may claim; they ask what I owe, to God and to neighbor.").
- the-slavery-texts: "Then the test came to my country and its churches, and we failed it."; "I will not ask you to look away, because the prophets never did."; "You will have to carry them together, and so will I."
- collectivist-world-individualist-readers: "That is the blind spot, and I share it." (plus the generic reader's "my growth", "the way I choose a gym", "between me and God", "written only to me").
- psalm-91-in-context: "I have five sons, and I understand why we want it to be one."; "Anyone who preaches is tempted by both, and I preach."
- philippians-4-13-in-context: "I would leave the verse on the wristband."
- did-the-gospels-get-jesus-right: "I want that objection on the table whole, because the answer to it is not a slogan, and because parts of it are simply true."
- Generic, not James: misreading-with-western-eyes ("my five-year plan", "it is mine"), covenant-and-treaty ("You perform, I pay").

## Gates (third run)

All 36 content-gate commands in .github/workflows/ci.yml passed, run one at a time (last lines in /home/user/tmp-voice/gates3.txt), pnpm check passed, pnpm test passed (146 test files, 1653 tests; 7 files and 73 tests skipped). node scripts/build-context-index.mjs rerun: guides-index.json unchanged. The search index and passage index --check runs were clean, so neither needed a rebuild. No build, no PDFs.
