# Claims ledger: why-does-god-feel-far-away

Essay: docs/work/essays/why-does-god-feel-far-away.md ("Why Does God Feel So Far Away?"). It rewrites the machine essay of the same slug and folds in apologetics-why-is-god-hidden, can-you-have-faith-and-doubt and emotional-doubter (the writer read emotional-doubter live via posts.getBySlug because it is not in content/static-library.generated.json). Written 2026-10-26. Verified 2026-10-27; this ledger was rewritten then.

## What the 2026-10-27 verification could and could not do

- **No web search.** Three WebSearch calls (the *A Grief Observed* door passage, the "real danger" sentence, the "locked door ... gaze" passage) came back "this turn's web search budget is used up". No search result was seen in this verification.
- **No primary pages.** On 2026-10-27, curl from the sandbox could not connect to gutenberg.ca, fadedpage.com, time.com, content.time.com, plato.stanford.edu, sacred-texts.com or gutenberg.org. WebFetch could not resolve plato.stanford.edu or time.com. Only raw.githubusercontent.com answered, and no public-domain copy of Lewis, John of the Cross, Kierkegaard or the Mother Teresa letters was found by a known path there. The patristic library (HistoricalChristianFaith Writings-Database, already cloned in the scratchpad) has no John of the Cross.
- **What did work:** a local ESV copy for every Scripture quotation, the site's own STEPBible-tagged Hebrew, and the record of earlier searches.

So every non-Scripture quotation below is kept on the writer's search of 2026-10-26, not on a check made in this verification. Each one is listed in the unverified-kept set so a run with search (or the books) can confirm it.

Method key (the words each line uses):

- **"ESV copy"**: compared with the ESV text in a local clone of the public GitHub repository lguenth/mdbible (commit fd66568, dated 2022-01-20), read with `git show` on 2026-10-27. A script (scratchpad godfar-tools/cmp.py) checked each quotation against the verse after normalizing case, punctuation and spacing, and every one matched. The copy does not say which ESV edition it is, prints LORD as "Lord", and leaves stray spaces before some colons and apostrophes. It is not esv.org or the ESV API, so it should be rechecked with James's API key when that exists.
- **"Hebrew (STEPBible)"**: read in the site's client/public/bible/ch/<book>/<chapter>.json (STEPBible tagged Hebrew with Strong's numbers) on 2026-10-27.
- **"Writer's search, 2026-10-26"**: the writer matched it against WebSearch result summaries on 2026-10-26 and named the sites in the writer's ledger (repeated below). No primary page was opened then, and this verification did not search again.
- **"Sibling ledger"**: the same fact was search-checked on 2026-10-26 by the run for why-does-god-allow-suffering (docs/work/essays/ledgers/why-does-god-allow-suffering.md). Not searched again here.
- **"Not checked (textbook)"**: no source was opened or searched in this verification. The verifier judged it textbook-certain. That judgment is not a check.
- **"Reading of the text"**: a description or paraphrase of a biblical passage, compared with the ESV copy.

## Corrections made in the essay on 2026-10-27

1. Job, end of the book. "At the end of the book God speaks, and the man he rebukes is not Job." became "At the end of the book God speaks out of the whirlwind, and he has hard questions for Job. But his anger falls on the friends." Reason: wrong as written. God does rebuke Job from the whirlwind ("Who is this that darkens counsel by words without knowledge?" Job 38:2; "Shall a faultfinder contend with the Almighty?" Job 40:2), and his anger is kept for Eliphaz and the two friends (Job 42:7). ESV copy.
2. Lewis paraphrase. "When he was happy, he writes, God seemed to welcome him. When he came to God in desperation, this is what he found:" became "When a person is happy, he writes, God seems to welcome him. When he comes to God in desperate need, this is what he finds:". Reason: Lewis puts the contrast in the general second person ("When you are happy ... But go to Him when your need is desperate"), and the quotation that follows says "your face". The old wording turned a general observation into a claim about Lewis's own past. The wording of Lewis's sentence is from the verifier's memory and the writer's search summary ("confirms the contrast in the surrounding passage"); not checked against the book.
3. John of the Cross. "In the years after his escape he wrote a poem about a soul slipping out on a dark night to meet the one it loves, and then a long commentary explaining it. That commentary is where the English phrase ..." became "Out of those years came a poem about a soul slipping out on a dark night to meet the one it loves, and later a long commentary explaining it. The poem and its commentary are where the English phrase ...". Reason: when the poem "En una noche oscura" was written (in the Toledo cell, or soon after the escape) could not be checked, and the verifier does not hold it as textbook-certain. The commentary is certainly later. The English phrase goes back to the title both works are known by, not to the commentary alone.
4. Kierkegaard. "So the king did not reveal himself in glory. He came down to her and took the form of a servant. Kierkegaard's point was ..." became "In Kierkegaard's telling, God does not come in that kind of splendor. He comes down and takes the form of a servant. His point was ...". Reason: in *Philosophical Fragments* the king's story sets out the problem, and it is the god who descends "in the form of a servant". Kierkegaard sets that form against the king's plebeian cloak, which would betray the king the moment it flapped open. The old wording gave the servant form to the king. This rests on the verifier's memory of chapter II, since no translation could be opened. The new wording says only what that chapter is known for.
5. Easter timing. "For the disciples that turn was still three days off" became "For the disciples that turn would not come until the third day". Reason: from Friday afternoon to Sunday dawn is not three days. Scripture's own phrase is "on the third day" (Luke 24:7: "be crucified and on the third day rise", ESV copy). The new sentence does not quote it.

Nothing else was found wrong. No quotation was cut or turned into paraphrase. The quotations below rest on the writer's 2026-10-26 search and are flagged for re-checking, not changed.

## 1. Quotations of non-Scripture sources

- C. S. Lewis, *A Grief Observed*: "Meanwhile, where is God?" Writer's search, 2026-10-26 (Project Gutenberg Canada text and Dominican Dispatches commentary, per search summary). Not re-checked on 2026-10-27. Kept; flagged.
- Lewis: "A door slammed in your face, and a sound of bolting and double bolting on the inside. After that, silence." Writer's search, 2026-10-26 (gutenberg.ca, pbs.org "The Question of God", a Spectrum study guide; wording reported the same across sources). gutenberg.ca was not opened then (403) or now (no connection). Kept; flagged.
- Lewis: "The real danger is of coming to believe such dreadful things about Him." Writer's search, 2026-10-26 (enotes, supersummary) and sibling ledger (several sources agree; part I). Two separate search matches, neither seen in this verification. Kept; flagged.
- Lewis: "It is not the locked door. It is more like a silent, certainly not uncompassionate, gaze." Writer's search, 2026-10-26 (libquotes, Hope for the Heart, Dominican Dispatches; one cites p. 69 of an edition). Kept; flagged.
- Mother Teresa, letter of September 1979 to the Rev. Michael van der Peet: "the silence and the emptiness is so great, that I look and do not see". Writer's search, 2026-10-26 (Time 2007 and NPR as quoted in search summaries). Transcriptions differ in punctuation after this clause; the essay quotes only the clause the sources agree on. Not checked against *Come Be My Light*. Kept; flagged.
- "the dark night of the soul": the English phrase, in quotation marks as a phrase, not as a quotation of John. Not checked (textbook).
- "porous" and "buffered": Charles Taylor's terms, used as single words. Not checked (textbook).
- Church-sign saying "if God seems far away, guess who moved": given without quotation marks or attribution, as an old line on church signs. Origin not traced. Not checked (common saying).

Attributed paraphrase (no quotation marks):

- Lewis wrote that he did not think he was in much danger of ceasing to believe in God. Lewis's sentence, from the verifier's memory: "Not that I am (I think) in much danger of ceasing to believe in God." Not checked against the book; the writer's search found the next sentence ("The real danger ...") beside it. Kept.
- Lewis, when a person is happy God seems to welcome him; in desperate need he comes to God and finds the door (see correction 2). Writer's search summary confirms the contrast. Kept.
- Lewis, when he brings his questions to God he gets no answer, but a particular kind of no answer. Follows Lewis's "When I lay these questions before God I get no answer. But a rather special sort of 'No answer.'" (verifier's and writer's memory; the writer's search matched the sentences after it). Kept.
- Teresa of Ávila wrote that John could hardly fit in his cell. Writer's search, 2026-10-26 (a Teresa letter quoted in search results: "in a little prison cell where small as he is, he could hardly fit"). Letter not identified by date or recipient, and not opened. Kept; flagged.
- John of the Cross, *Dark Night* Book I: God withdraws the sweetness of prayer to wean beginners from loving the comfort more than God. Writer's search, 2026-10-26 (Catholic Exchange "Aridity and Contemplation"; CCEL chapter summary), partial. Not checked against a translation. Kept.
- John, *Dark Night* I.9: signs for telling this night from other dryness; dryness can come from sin, from lukewarmness, or from a bodily disorder (the humors). Writer's search, 2026-10-26 (search summary: "aridity caused by sin, weakness, lukewarmness, or bodily humors"). Not checked against the Peers text. Kept.
- Taylor: around 1500 a porous self, open to spirits, blessings and curses, with meaning lodged in relics, holy places and the seasons; the modern buffered self, with meaning inside the mind; Taylor does not claim the porous world was more faithful, and much of what got in was fear; the "conditions of belief" have changed. Paraphrase. Not checked (textbook).
- Schellenberg's argument as summarized (a perfectly loving God would always be open to relationship with every person capable of it; relationship needs belief that God exists; so no one would fail to believe without resisting; some do; so no perfectly loving God). Writer's search, 2026-10-26 (Stanford Encyclopedia of Philosophy "Hiddenness of God"; Wikipedia "Argument from nonbelief"). Kept.
- Schellenberg's reply to the freedom defense (believing God exists does not force anyone to love him). Not checked this session; it follows from his own premise that belief is necessary but not sufficient for relationship. The writer recorded it as a standard part of the debate (SEP covers it), not located in his books. Kept; flagged.
- Christians have often answered that there are no nonresistant nonbelievers. Writer's search, 2026-10-26 (summary: "That premise ... is the usual target of critics"). Kept.
- Kierkegaard's king and humble maiden, *Philosophical Fragments* chapter II: in splendor the king might be admired, but she might never forget he was king and she a humble maiden, and the love he wanted could not grow across that. Paraphrase from memory (verifier and writer). Not checked against a translation. Kept; flagged.
- Kierkegaard: God comes down in the form of a servant; hiddenness in Christ is the shape love takes between unequals. The first is what chapter II is known for (see correction 4); the second is interpretation. Not checked against a translation. Kept.
- Some readers took Mother Teresa's letters as proof she had been a fraud. A characterization of the 2007 reaction, with no one named. Not checked this session. Kept; flagged.
- Mother Teresa asked the people she wrote to destroy her letters, and many did not. Writer's search, 2026-10-26 ("She frequently asked her confidants to destroy the letters ... Many ignored her wishes"). Kept.

## 2. Numbers

- Four notebooks. Writer's search, 2026-10-26 (Magdalen College page: "poured out his grief into four empty notebooks"). Lewis's own text calls the last one the fourth (verifier's memory). Kept.
- About nine months in the Toledo cell (December 1577 to August 1578, a little over eight months by the calendar; "about nine months" is the usual figure). Writer's search, 2026-10-26 (Catholic Encyclopedia via search: "more than nine months close imprisonment"). Kept as "about nine months".
- Come Be My Light appeared ten years after her death (died 1997, book 2007). Not checked (textbook); the writer's search gave Kolodiejchuk with her "until her death in 1997". Kept.
- "for decades ... she felt almost nothing of God's presence". Writer's search, 2026-10-26 (Christian Century review: darkness for "some 45 years"). Deliberately general. Kept.
- "Dozens of psalms are laments." Not checked (textbook; standard form-critical counts run well over forty). Kept.
- 988, the US Suicide and Crisis Lifeline (call or text). Not checked (textbook; wording set by BRIEF.md). Kept.

## 3. Scripture (ESV)

Quoted verbatim, each matched word for word against the ESV copy on 2026-10-27:

- Job 23:8, "Behold, I go forward, but he is not there, and backward, but I do not perceive him". ESV copy: match (the verse goes on after a semicolon; the essay closes the quotation there).
- Job 42:7, "for you have not spoken of me what is right, as my servant Job has". ESV copy: match. The lead-in (God tells Eliphaz he is angry with him and his two friends) follows "the LORD said to Eliphaz the Temanite: My anger burns against you and against your two friends". ESV copy.
- Psalm 13:1, "How long, O LORD? Will you forget me forever? How long will you hide your face from me?" ESV copy: match.
- Psalm 88:1 (opening words), "O LORD, God of my salvation". ESV copy: match.
- Psalm 88:18, "You have caused my beloved and my friend to shun me; my companions have become darkness". ESV copy: match.
- Exodus 17:12 (end of verse), "So his hands were steady until the going down of the sun". ESV copy: match.
- Habakkuk 2:4, "the righteous shall live by his faith". ESV copy: match.
- Habakkuk 3:18, "yet I will rejoice in the LORD; I will take joy in the God of my salvation". ESV copy: match.
- Mark 9:24, "I believe; help my unbelief!" ESV copy: match. The exclamation point is the ESV's, inside quoted Scripture.
- Acts 17:23, the inscription "To the unknown god". ESV copy: match.
- Acts 17:27, "that they should seek God, and perhaps feel their way toward him and find him. Yet he is actually not far from each one of us". ESV copy: match (the verse ends with a comma; the Closing Texts line ends it with a period).
- Matthew 27:46, "Eli, Eli, lema sabachthani?" and "My God, my God, why have you forsaken me?", with the frame "about the ninth hour ... Jesus cried out with a loud voice". ESV copy: match.
- Psalm 22:1 (second half), "Why are you so far from saving me, from the words of my groaning?" ESV copy: match.
- Psalm 22:24, "For he has not despised or abhorred the affliction of the afflicted, and he has not hidden his face from him, but has heard, when he cried to him". Body and Closing Texts. ESV copy: match.
- Luke 24:16, "But their eyes were kept from recognizing him." ESV copy: match.
- Luke 24:32, "Did not our hearts burn within us while he talked to us on the road, while he opened to us the Scriptures?" Body and Closing Texts; ESV introduces it with "They said to each other", as the essay does. ESV copy: match.

Paraphrased or described, each compared with the ESV copy on 2026-10-27:

- Isaiah 59:2 (iniquities made a separation; sins hid his face). ESV copy: fair paraphrase.
- Psalm 32:3–5 (David kept silent, God's hand heavy day and night, then he confessed). Headed "A Maskil of David". ESV copy: fair paraphrase.
- Job's friends' theory (suffering implies sin; return to God and be restored), e.g. Job 4:7, 22:21–23. Reading of the text; ESV copy.
- God's questions to Job from the whirlwind, Job 38:1–3, 40:2, 40:8 (correction 1). ESV copy.
- Psalm 88:5–6 (like those whom God remembers no more, cut off, put in the depths of the pit); Psalm 88 ends with no turn to praise. ESV copy: fair paraphrase; the psalm ends at v. 18 in darkness.
- Psalm 13 is headed "To the choirmaster", supporting "written for worship". ESV copy.
- John 11:35 (Jesus wept at a friend's grave). ESV copy: "Jesus wept."
- Exodus 17:8–12 (Israel fights Amalek; Israel prevails while Moses holds up his hand; his hands grow weary; Aaron and Hur put a stone under him and hold up his hands, one on each side). ESV copy: fair paraphrase (v. 11 has "hand", v. 12 "hands").
- Exodus 17:12 "steady" is the Hebrew *emunah*. Hebrew (STEPBible): 'e.mu.Nah, H0530, in exodus/17.json. Verified.
- Habakkuk 2:4 uses the same word. Hebrew (STEPBible): be.'e.mu.na.To, H0530, in habakkuk/2.json. Verified.
- Habakkuk 1:2–6 (complaint that God does not hear or save; God answers that he is raising up the Chaldeans, here "Babylonians"). ESV copy: fair paraphrase.
- Habakkuk 3:17 (fig tree does not blossom, no herd in the stalls). ESV copy: fair paraphrase.
- Mark 9:17–27 (the father's plea; Jesus casts out the spirit and raises the boy). ESV copy.
- Romans 1:18 (people suppress the truth). ESV copy: "who by their unrighteousness suppress the truth".
- James 2:19 (the demons believe that God is one, and shudder). ESV copy: "You believe that God is one; you do well. Even the demons believe, and shudder!" (ESV has a dash before "and shudder"). Fair paraphrase without quotation marks.
- Acts 17:16–22 (Paul at Athens; Epicurean and Stoic philosophers; the Areopagus). ESV copy.
- Acts 17:26 ("he made from one man every nation of mankind") behind "God had made the nations". ESV copy.
- Acts 17:31 (assurance given by raising him from the dead). ESV copy.
- Jesus prayed the first line of Psalm 22. ESV copy: Matthew 27:46 and Psalm 22:1 agree.
- "far" in Psalm 22 (vv. 1, 11, 19). ESV copy.
- Psalm 22 closes with the ends of the earth turning to the Lord (v. 27, in the psalm's closing section, vv. 27–31). ESV copy.
- Luke 24:1, 13–31 (the first day of the week; two disciples walk to Emmaus talking about what had happened; Jesus draws near and goes with them; he interprets the Scriptures; they know him at the breaking of bread; he vanishes from their sight). ESV copy.
- Matthew 28:20 (Jesus promised to be with his people always). ESV copy: "And behold, I am with you always, to the end of the age." Spoken to the eleven; the essay's "his people" is the church's ordinary reading.
- "on the third day" (correction 5). ESV copy: Luke 24:7 "be crucified and on the third day rise". Not quoted in the essay.

## 4. Dates, names, events, titles

- Joy Davidman, Lewis's wife, died of cancer in 1960 (13 July 1960, not stated). Writer's search, 2026-10-26, and sibling ledger. Kept.
- *A Grief Observed* published the next year (1961) under the pen name N. W. Clerk. Writer's search, 2026-10-26 (Wikipedia, EBSCO), and sibling ledger. Kept.
- By 1960 Lewis was one of the best-known Christian apologists in the English-speaking world, having answered doubts in print for years. Not checked (textbook). Kept.
- "Early in the first one" (notebook I) and "Later in *A Grief Observed*" (the gaze passage, notebook IV). Writer's search, 2026-10-26 (opening chapter; p. 69), partial. Kept.
- The notebooks end quieter than they begin. Characterization. Not checked (textbook reading). Kept.
- John of the Cross, Spanish Carmelite friar in the reform led by Teresa of Ávila. Writer's search, 2026-10-26 (EWTN, Britannica, Vatican pages). Kept.
- Seized in December 1577 by friars opposed to the reform and taken to their priory in Toledo. Writer's search, 2026-10-26 (one source: the night of 3 December 1577). Kept.
- Composed poetry in the cell. Writer's search, 2026-10-26 (the Spiritual Canticle). Kept.
- Escaped in August 1578 (sources differ on the night). Writer's search, 2026-10-26. Kept as month and year only.
- The poem "En una noche oscura" and the later commentary (*Dark Night*); the English phrase "the dark night of the soul" comes from them. Not checked (textbook); poem's date left unstated (correction 3). Kept.
- Mother Teresa's private letters published in 2007 as *Come Be My Light*, edited by Fr. Brian Kolodiejchuk, who was leading her cause for sainthood (its postulator). Writer's search, 2026-10-26 (St Pauls, Christian Century, America). Kept.
- Letter of September 1979 to a priest (the Rev. Michael van der Peet). Writer's search, 2026-10-26 (Time, NPR). Kept.
- Charles Taylor, *A Secular Age*, 2007. Not checked (textbook; also in the approved pilot what-post-christian-means). Kept.
- J. L. Schellenberg, *Divine Hiddenness and Human Reason*, 1993. Writer's search, 2026-10-26 (Wikipedia; SEP). Kept.
- Schellenberg, *The Hiddenness Argument*, 2015. Writer's search, 2026-10-26 (*The Hiddenness Argument: Philosophy's New Challenge to Belief in God*, 2015). Kept.
- Søren Kierkegaard, *Philosophical Fragments*, 1844. Not checked (textbook). Kept.
- "Christians have argued for centuries about what passed between the Father and the Son in that hour." General description of the debate over the cry from the cross; no position taken. Not checked (textbook). Kept.
- "a good deal of evangelical church life in recent decades has taught people to measure their closeness to God by what they feel"; "You can sit in a good many churches for a long time without hearing a lament". Characterizations in the first person plural, no figures. Not checked. Kept.

## 5. Biography

- "I came to faith as an adult, out of atheism." Verified against docs/work/NOTES.md (confirmed biography).
- "I've written elsewhere about what Taylor's account means for ..." points to the approved pilot docs/work/essays/what-post-christian-means.md, which discusses Taylor. Checked in the repo on 2026-10-27.
- No title, years in ministry, book count or denomination is stated. No scene, conversation or congregant is invented. The "we" sentences about planning services are about the church, not a claimed personal history. Checked in the text on 2026-10-27.

## 6. Crisis care and links

- "In the US, call or text 988 for the Suicide and Crisis Lifeline." Wording from docs/work/essays/BRIEF.md. Not checked (textbook).
- [Find Help](/help) link, and the line that the essay cannot give medical or counseling advice: present, per BRIEF.md.
- /writing/what-post-christian-means, /writing/did-the-resurrection-happen and /writing/the-theology-of-saturday are all in docs/work/essays/link-targets.json. Checked on 2026-10-27.
- scripts/validate-essays.mjs, run on 2026-10-27 on a JSON copy of the corrected draft in the scratchpad (no repo file changed), passes shape, language, dashes, "!", references and Closing Texts. It flags only those three links as not yet public (what-post-christian-means "not on the shelf"; the other two "on the shelf with no rewrite yet"). They clear when those essays ship. No em-dash in the essay; one en-dash, in the reference "32:3–5".

## Dropped by the writer on 2026-10-26 (not in the essay)

The old essays' invented biography ("I know the feeling from the inside", "I have led services designed to move people", "I have been married long enough"); Nietzsche's madman quotations; Pascal's "eternal silence" and "enough light" lines; Descartes 1641; Newbigin's *Proper Confidence*; Luther's *Anfechtung*; Spurgeon's "fits of depression" and the 1856 Surrey Gardens disaster; Newman's "ten thousand difficulties"; the Mother Teresa line "the place of God in my soul is blank"; the Taylor quotation "one human possibility among others"; Psalm 42:3; 2 Timothy 2:13; the claim that Mother Teresa's darkness lasted "nearly fifty years, from around 1949".

## To re-check when search or the books are available

Every Lewis quotation (four), the Mother Teresa clause, the Teresa of Ávila letter on John's cell, the "fraud" characterization, Schellenberg's reply on freedom, and the Kierkegaard paraphrase (chapter II, Hong or Swenson). All Scripture should be rechecked once with the ESV API.
