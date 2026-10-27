# Claims ledger: why-does-god-feel-far-away

Essay: docs/work/essays/why-does-god-feel-far-away.md ("Why Does God Feel So Far Away?"). It rewrites the machine essay of the same slug and folds in apologetics-why-is-god-hidden, can-you-have-faith-and-doubt and emotional-doubter (the writer read emotional-doubter live via posts.getBySlug because it is not in content/static-library.generated.json). Written 2026-10-26. Verified 2026-10-27 in a first pass with no search, then closed the same day in a closing pass with search. This ledger was rewritten after the closing pass.

## Status after the closing pass (2026-10-27)

Before the closing pass, 40 items were open. These were the lines whose only support was the writer's 2026-10-26 search, the verifier's memory, or a "textbook" judgment. Scripture is not counted, because the first pass had already matched it against the ESV copy. The 40 items came out like this:

- 25 verified against a source seen in the closing pass.
- 1 corrected in the essay to fit what the source says (correction 6).
- 2 generalized or unquoted (corrections 7 and 8).
- 12 still open (listed at the end).

The closing pass also re-ran all 17 Scripture quotations against the ESV copy, and all match. ESV wording itself was not confirmed by search, because the search budget ran out before Scripture's turn came.

## What the closing pass could and could not do

- **Web search: 22 calls, then none.** The closing pass made 22 WebSearch calls, aimed at the four Lewis quotations and where they sit in the book, the Mother Teresa clause and the details of her letter, Teresa of Ávila's letter about John's cell, the four notebooks, and the 2007 reaction to the letters. The 23rd and 24th calls came back "this turn's web search budget is used up". Every agent in the workflow run shares one budget of about 200 searches. Search went to the non-Scripture quotations first, so none was left for Scripture wording, Schellenberg or Kierkegaard.
- **No primary pages.** The sandbox proxy refused curl (CONNECT 403) for spectrummagazine.org, users.wfu.edu, libcat.ru and archive.org. WebFetch could not resolve spectrummagazine.org or libcat.ru. So every "Search, 2026-10-27" line below rests on the search tool's result summary and the titles and URLs it listed. No page was opened.
- **Local sources that did work:** the E. Allison Peers translation of *Dark Night of the Soul* in the HistoricalChristianFaith Writings-Database (the first pass reported no John of the Cross there, but the file is "John of the Cross/Dark Night of the Soul.html"); the ESV copy; and the site's own BSB text and STEPBible Hebrew.

Method key (the words each line uses):

- **"Search, 2026-10-27"**: matched in a WebSearch result summary during the closing pass. The line names the sites the result cited. The pages themselves were not opened.
- **"Peers (Writings-Database)"**: *Dark Night of the Soul*, translated and edited by E. Allison Peers, third revised edition. The public GitHub repository HistoricalChristianFaith/Writings-Database copied it from CCEL (a 1959 Image Books scan). The file is "John of the Cross/Dark Night of the Soul.html" at commit 328918a, read with `git show` on 2026-10-27. It is a human scholarly translation, not ANF/NPNF, and not the machine-translated Migne material that NOTES.md warns about.
- **"ESV copy, re-run"**: compared with json/ESV.json in a local clone of the public GitHub repository lguenth/mdbible (commit fd66568, dated 2022-01-20). The file calls itself "English Standard Version 2011" and comes from a SWORD module. The closing pass re-ran the comparison with its own script (scratchpad godfar-close/scripture.py). The script takes each quotation exactly as the essay prints it and compares it with the verse, keeping punctuation. It ignores case only because the copy prints LORD as "Lord". This copy is not esv.org or the ESV API, and it was not checked for the 2016 ESV text revisions. So every Scripture line also carries "ESV wording not confirmed by search; BSB confirms the sense" until James's API key settles it.
- **"BSB"**: the site's Berean Standard Bible in client/public/bible/ch/<book>/<chapter>.json, read on 2026-10-27. It confirms where a verse is and what it says, not the ESV wording.
- **"Hebrew (STEPBible)"**: the STEPBible tagged Hebrew, with Strong's numbers, in the same files.
- **"Writer's search, 2026-10-26"**: the writer matched it against WebSearch result summaries on 2026-10-26 and named the sites. No primary page was opened then, and the closing pass did not see it again.
- **"Sibling ledger"**: docs/work/essays/ledgers/why-does-god-allow-suffering.md.
- **"Not checked (textbook)"**: no source was opened or searched. The verifier judged it textbook-certain. That judgment is not a check.
- **"Reading of the text"**: a description or paraphrase of a biblical passage, compared with the ESV copy and the BSB.

## Corrections made in the essay on 2026-10-27

First pass (no search):

1. Job, end of the book. "At the end of the book God speaks, and the man he rebukes is not Job." became "At the end of the book God speaks out of the whirlwind, and he has hard questions for Job. But his anger falls on the friends." Reason: wrong as written. God does rebuke Job from the whirlwind ("Who is this that darkens counsel by words without knowledge?" Job 38:2; "Shall a faultfinder contend with the Almighty?" Job 40:2), and his anger is kept for Eliphaz and the two friends (Job 42:7). ESV copy.
2. Lewis paraphrase. "When he was happy, he writes, God seemed to welcome him. When he came to God in desperation, this is what he found:" became "When a person is happy, he writes, God seems to welcome him. When he comes to God in desperate need, this is what he finds:". Reason: Lewis puts the contrast in the general second person, and the quotation that follows says "your face". The old wording turned a general observation into a claim about Lewis's own past. (The closing pass confirmed the contrast by search; see section 1.)
3. John of the Cross. "In the years after his escape he wrote a poem about a soul slipping out on a dark night to meet the one it loves, and then a long commentary explaining it. That commentary is where the English phrase ..." became "Out of those years came a poem about a soul slipping out on a dark night to meet the one it loves, and later a long commentary explaining it. The poem and its commentary are where the English phrase ...". Reason: when the poem "En una noche oscura" was written (in the Toledo cell, or soon after the escape) could not be checked. The commentary is certainly later. The English phrase goes back to the title both works are known by, not to the commentary alone.
4. Kierkegaard. "So the king did not reveal himself in glory. He came down to her and took the form of a servant. Kierkegaard's point was ..." became "In Kierkegaard's telling, God does not come in that kind of splendor. He comes down and takes the form of a servant. His point was ...". Reason: in *Philosophical Fragments* the king's story sets out the problem, and it is the god who descends "in the form of a servant". The old wording gave the servant form to the king. This rests on the verifier's memory of chapter II (still open). (Voice pass, 2026-10-27: the last sentence became "God's hiddenness in Christ, as he saw it, was the shape love takes ...", and the book is now named without its year. No claim was added.)
5. Easter timing. "For the disciples that turn was still three days off" became "For the disciples that turn would not come until the third day". Reason: Friday afternoon to Sunday dawn is not three days. Scripture's own phrase is "on the third day" (Luke 24:7, ESV copy). The essay does not quote it.

Closing pass (with search):

6. Mother Teresa reaction. "Some readers took the letters as proof she had been a fraud." became "Some critics read the letters as evidence of her hypocrisy." Reason: what search found about the 2007 reaction is the hypocrisy charge. Per the result summary, a Secular Frontier piece (secularfrontier.infidels.org, August 2007, "Mother Teresa's crisis of faith") said the letters add a new perspective to Christopher Hitchens's critiques of her hypocrisy. Another summary said Hitchens read the letters as evidence against religion. "Fraud" was Hitchens's word in earlier attacks ("self-adoring fraud"), and no result tied that word to the letters. Search, 2026-10-27.
7. Lament count. "Dozens of psalms are laments" became "The Psalter is full of laments". Reason: the count rested on a textbook judgment and no source for it was seen. A number that cannot be confirmed is generalized.
8. Taylor's terms. 'He calls the older self "porous."' and 'Taylor calls the modern self "buffered."' lost their quotation marks and now read "He calls the older self porous." and "Taylor calls the modern self buffered." Reason: as quotations of *A Secular Age* they could not be matched to any source seen. They are now named as his terms, the way the approved pilot what-post-christian-means handles "subtraction stories". The meaning is unchanged.

Nothing else was changed. No Lewis quotation needed changing.

## 1. Quotations of non-Scripture sources

- C. S. Lewis, *A Grief Observed*: "Meanwhile, where is God?" **Verified.** Search, 2026-10-27: the result summary says the line opens a passage that continues "This is one of the most disquieting symptoms". It says the Project Gutenberg Canada and Distributed Proofreaders Canada (fadedpage.com) texts match that wording, and it places the line in Book I, in the Spectrum Magazine study guide's section "The Empty House" (under Book I, "The Locked Door"). Other results: pbs.org "The Question of God" and hopefortheheart.org.
- Lewis: "A door slammed in your face, and a sound of bolting and double bolting on the inside. After that, silence." **Verified.** Search, 2026-10-27: the result summary says the results confirm this wording (Spectrum Magazine study guide, Goodreads quote lists, a full-text excerpt at libcat.ru). It says the line follows the passage that contrasts the happy man's welcome with going to God in desperate need.
- Lewis: "The real danger is of coming to believe such dreadful things about Him." **Verified.** Search, 2026-10-27: result summaries place it in chapter 1 (enotes.com quotes, supersummary.com, wist.info, randalrauser.com, Goodreads). Sources differ only in the sentence before it ("much danger" or "much real danger") and in whether "Him" is capitalized. Also in the sibling ledger (2026-10-26 search).
- Lewis: "It is not the locked door. It is more like a silent, certainly not uncompassionate, gaze." **Verified.** Search, 2026-10-27: a result summary quotes both sentences exactly. Its results include quotepark.com (titled "When I lay these questions before God I get no answer. But a rather special sort of 'No answer.'"), sermoncentral.com, a Goodreads highlight and biblia.com (page 69 of an edition). Another summary places the passage toward the end of the book. An exact-phrase search joining "special sort of 'No answer.'" to "It is not the locked door" found nothing, so whatever stands between those sentences was not seen. The essay quotes only the two gaze sentences.
- Mother Teresa, letter of September 1979 to the Rev. Michael van der Peet: "the silence and the emptiness is so great, that I look and do not see". **Verified in its words; the comma after "great" varies.** Search, 2026-10-27. Two result summaries cover the letter, with results including Time's "Quotes of the Day" (content.time.com), the History News Network (hnn.us), lookingcloser.org, beliefnet.com and an AP wire story (oneindia.com). One summary quotes the version credited "Mother Teresa to the Rev. Michael Van Der Peet, September 1979" (the Quotes of the Day form) as "As for me, the silence and the emptiness is so great that I look and do not see, listen and do not hear." The AP story has the same wording. The same summary also quotes, without naming its source, a bracketed transcription in the form of the book's text: "[But] as for me, the silence and the emptiness is so great, that I look and do not see, — Listen and do not hear — the tongue moves [in prayer] but does not speak". It reports that the HNN version drops "the" before "emptiness". The essay's words match every version except HNN's. Its comma follows the bracketed transcription, which is probably the book's own punctuation, but the source of that transcription was not seen. The essay is unchanged. Check the comma against *Come Be My Light*.
- "the dark night of the soul": the English phrase, in quotation marks as a phrase, not as a quotation of John. **Verified.** Peers (Writings-Database): the translation's title is *Dark Night of the Soul*. The poem it explains opens "On a dark night, Kindled in love with yearnings ... I went forth without being observed" and goes on "To the place where he (well I knew who!) was awaiting me". That matches the essay's "a soul slipping out on a dark night to meet the one it loves". The Spanish title is *Noche oscura*, so the English phrase comes through the translated title, as correction 3 says.
- Taylor's terms porous and buffered: **unquoted** (correction 8). They are now named as his terms, not quoted. Whether they are his terms was not checked against a source (textbook; see "Still open").
- Church-sign saying "if God seems far away, guess who moved": no quotation marks and no attribution. The essay offers it as an old line on church signs. Its origin was not traced. **Still open** (it is not a quotation of a source, so there is nothing to match).

Attributed paraphrase (no quotation marks):

- Lewis wrote that he did not think he was in much danger of ceasing to believe in God. **Verified.** Search, 2026-10-27: Randal Rauser's 2021 essay (randalrauser.com) quotes "Not that I am (I think) in much real danger of ceasing to believe in God." Other quote sites leave out "real" (enotes, Goodreads, wist.info). The paraphrase fits either version.
- Lewis: when a person is happy, God seems to welcome him; in desperate need he comes to God and finds the door (correction 2). **Verified.** Search, 2026-10-27: the result summary says Lewis contrasts a happy person who turns to God and feels welcomed with a grieving person who goes to God in desperate need and meets silence (Spectrum Magazine, Project Gutenberg Canada, fadedpage.com).
- Lewis: when he brings his questions to God he gets no answer, but a particular kind of no answer. **Verified.** Search, 2026-10-27: quotepark.com's result title is the sentence "When I lay these questions before God I get no answer. But a rather special sort of 'No answer.'"
- Teresa of Ávila wrote that John could hardly fit in his cell. **Verified.** Search, 2026-10-27: Teresa's Letter 260 to Padre Jerónimo Gracián, written from Ávila on 21–22 August 1578 after she heard of his escape (Kavanaugh's editorial note). In the translation reposted at carmelitequotes.blog it reads "where small as he is, he could hardly fit". The letter's "nine months" is also the essay's figure (section 2). Not checked against the printed ICS edition.
- John of the Cross, *Dark Night* Book I: God withdraws the sweetness of prayer to wean beginners from loving the comfort more than God. **Verified.** Peers (Writings-Database), Book I:
  - ch. I §2: God is like a mother who "puts bitter aloes upon her sweet breast, sets down the child from her arms and makes it walk upon its feet".
  - ch. VII §5: "He weans them from the breasts of these sweetnesses and pleasures, gives them pure aridities and inward darkness".
  - ch. VIII §3: God "desires to lead them farther ... to a higher degree of love for Him" and "shuts against them the door and the source of the sweet spiritual water".

  The essay's "not to punish him" is its reading of the mother image. These chapters present the night as God's love leading the soul farther.
- John, *Dark Night* I.9: he gives signs for telling this night from other dryness, and says dryness can come from sin, from lukewarmness, or from a bodily disorder (the humors). **Verified.** Peers (Writings-Database), Book I ch. IX §1: "these aridities might frequently proceed, not from the night and purgation of the sensual desires aforementioned, but from sins and imperfections, or from weakness and lukewarmness, or from some bad humour or indisposition of the body, I shall here set down certain signs ... there are three principal signs." §2–3 name "melancholy humour".
- Taylor, in paraphrase: around 1500 the self was porous, open to spirits, blessings and curses, with meaning in relics, holy places and the seasons; the modern self is buffered, with meaning inside the mind. Taylor does not claim the porous world was more faithful, much of what got in was fear, and the conditions of belief have changed. The book is *A Secular Age*. Not checked (textbook). **Still open.**
- Schellenberg's argument as summarized: a perfectly loving God would be open to relationship with every person capable of it; relationship needs belief; so no one would fail to believe without resisting; some do; so there is no perfectly loving God. Writer's search, 2026-10-26 (SEP "Hiddenness of God"; Wikipedia "Argument from nonbelief"). Not seen again. **Still open.**
- Schellenberg's reply to the freedom defense (believing God exists does not force anyone to love him). Not checked. It rests on memory and on the logic of his own premise that belief is necessary for relationship but not sufficient. **Still open.**
- Christians have often answered that there are no nonresistant nonbelievers. Writer's search, 2026-10-26. Not seen again. **Still open.**
- Kierkegaard, *Philosophical Fragments* chapter II: the king and the humble maiden; God comes down in the form of a servant; hiddenness in Christ as the shape love takes (see correction 4). Paraphrase and interpretation from the verifier's and the writer's memory. No translation could be reached (none in the Writings-Database, none on GitHub at a known path), and no search was left. **Still open.**
- Some critics read Mother Teresa's letters as evidence of her hypocrisy. **Corrected** (correction 6). Search, 2026-10-27.
- Mother Teresa asked the people she wrote to destroy her letters, and many did not. **Verified.** Search, 2026-10-27: the result summary quotes "She frequently asked her confidants to destroy the letters in which she revealed her struggles. Many ignored her wishes." Its results include christiancentury.org, lookingcloser.org and baptistnews.com. Another review says she was "overruled by the Catholic Church", and a Doubleday spokeswoman is reported as saying the Vatican ordered the letters preserved. The essay's sentence matches the first source and does not contradict the others.

## 2. Numbers

- Four notebooks. **Verified.** Search, 2026-10-27: the result summary quotes "Following Joy's death in 1960, Lewis poured out his grief into four empty notebooks". Its results include the Magdalen College, Oxford page (cslewiswordsandworlds.magd.ox.ac.uk) and Wikipedia "A Grief Observed".
- About nine months in the Toledo cell. **Verified.** Search, 2026-10-27: Teresa's Letter 260 (August 1578) speaks of "nine months" in the little prison cell. The carmelitequotes.blog repost adds an editorial bracket, "[3 December 1577 to 15 August 1578]". By the calendar that is a little over eight months, so "about nine months" is Teresa's own figure.
- *Come Be My Light* appeared ten years after her death. **Verified.** Search, 2026-10-27: Doubleday published it in 2007. Its letters, to her spiritual directors, run "from 1928 until her death in 1997".
- "for decades ... she felt almost nothing of God's presence", through most of her years among the poor and dying of Calcutta. **Verified.** Search, 2026-10-27, quoting Time's 2007 story by David Van Biema: "for the last nearly half-century of her life she felt no presence of God whatsoever". The summary says the absence began around when she started caring for the poor and dying in Calcutta and never lifted, apart from a five-week break in 1959.
- "Dozens of psalms are laments." **Generalized** (correction 7). The essay now says "The Psalter is full of laments".
- 988, the US Suicide and Crisis Lifeline (call or text). The wording is required by docs/work/essays/BRIEF.md. Not checked against 988lifeline.org: no search was left, and the proxy refused that site in a sibling run. Kept because the crisis-care rule requires it. **Still open** as a check, not as a doubt.

## 3. Scripture (ESV)

The closing pass took each quotation exactly as the essay prints it and compared it with the ESV copy, keeping punctuation. All 17 match ("ESV copy, re-run"). For every line: ESV wording not confirmed by search; BSB confirms the sense. Check them once more with the ESV API.

- Job 23:8, "Behold, I go forward, but he is not there, and backward, but I do not perceive him". ESV copy, re-run: match. The verse goes on after a semicolon, and the essay ends the quotation there. BSB: "If I go east, He is not there, and if I go west, I cannot find Him."
- Job 42:7, "for you have not spoken of me what is right, as my servant Job has". ESV copy, re-run: match. The lead-in (God tells Eliphaz he is angry with him and his two friends) follows the same verse. BSB: same sense.
- Psalm 13:1, "How long, O LORD? Will you forget me forever? How long will you hide your face from me?" ESV copy, re-run: match. BSB: same sense, under "For the choirmaster" (which supports "written for worship").
- Psalm 88:1 (opening words), "O LORD, God of my salvation". ESV copy, re-run: match. BSB: "O LORD, the God of my salvation".
- Psalm 88:18, "You have caused my beloved and my friend to shun me; my companions have become darkness". ESV copy, re-run: match. BSB: "darkness is my closest companion", the same sense and the psalm's last verse.
- Exodus 17:12 (end of verse), "So his hands were steady until the going down of the sun". ESV copy, re-run: match. BSB: "his hands remained steady until the sun went down".
- Habakkuk 2:4, "the righteous shall live by his faith". ESV copy, re-run: match. BSB: "the righteous will live by faith".
- Habakkuk 3:18, "yet I will rejoice in the LORD; I will take joy in the God of my salvation". ESV copy, re-run: match. BSB: same sense.
- Mark 9:24, "I believe; help my unbelief!" ESV copy, re-run: match. The exclamation point is the ESV's, inside quoted Scripture. BSB: "I do believe; help my unbelief!"
- Acts 17:23, the inscription "To the unknown god". ESV copy, re-run: match. BSB: "TO AN UNKNOWN GOD".
- Acts 17:27, "that they should seek God, and perhaps feel their way toward him and find him. Yet he is actually not far from each one of us". This appears in the body, and the second sentence appears again in Closing Texts. ESV copy, re-run: match. The verse ends with a comma; the Closing Texts line ends it with a period. BSB: same sense, including "perhaps".
- Matthew 27:46, "Eli, Eli, lema sabachthani?" and "My God, my God, why have you forsaken me?", framed as "about the ninth hour ... Jesus cried out with a loud voice". ESV copy, re-run: match. BSB: same.
- Psalm 22:1 (second half), "Why are you so far from saving me, from the words of my groaning?" ESV copy, re-run: match. BSB: same sense, with "far" in the verse.
- Psalm 22:24, "For he has not despised or abhorred the affliction of the afflicted, and he has not hidden his face from him, but has heard, when he cried to him". This appears in the body and in Closing Texts. ESV copy, re-run: match. BSB: same sense.
- Luke 24:16, "But their eyes were kept from recognizing him." ESV copy, re-run: match. BSB: same words, apart from the capital on "Him".
- Luke 24:32, "Did not our hearts burn within us while he talked to us on the road, while he opened to us the Scriptures?" This appears in the body and in Closing Texts. The ESV introduces it with "They said to each other", as the essay does. ESV copy, re-run: match. BSB: same sense.

Paraphrased or described passages, compared with the ESV copy in the first pass. The closing pass also read those marked BSB:

- Isaiah 59:2 (iniquities made a separation; sins hid his face). ESV copy: fair paraphrase. BSB: "your sins have hidden His face from you".
- Psalm 32:3–5 (David kept silent, God's hand was heavy day and night, then he confessed). Headed "A Maskil of David". ESV copy: fair paraphrase. BSB: same.
- Job's friends' theory (suffering implies sin; return to God and be restored), for example Job 4:7 and 22:21–23. Reading of the text; ESV copy.
- God's questions to Job from the whirlwind, Job 38:1–3, 40:2 and 40:8 (correction 1). ESV copy.
- Psalm 88:5–6 (like those God remembers no more, cut off, laid in the depths of the pit). The psalm ends with no turn to praise. ESV copy: fair paraphrase. BSB: "whom You remember no more, who are cut off ... You have laid me in the lowest Pit".
- Psalm 13 is headed "To the choirmaster". ESV copy; BSB.
- John 11:35 (Jesus wept at a friend's grave). ESV copy: "Jesus wept." BSB: same.
- Exodus 17:8–12 (Israel fights Amalek; Israel prevails while Moses holds up his hand; Aaron and Hur put a stone under him and hold up his hands, one on each side). ESV copy: fair paraphrase (verse 11 has "hand", verse 12 "hands").
- Exodus 17:12: the word for "steady" is the Hebrew *emunah*. Hebrew (STEPBible): 'e.mu.Nah, H0530, in exodus/17.json, verse 12. Read again in the closing pass. Verified.
- Habakkuk 2:4 uses the same word. Hebrew (STEPBible): be.'e.mu.na.To, H0530, in habakkuk/2.json, verse 4. Read again in the closing pass. Verified.
- Habakkuk 1:2–6 (complaint that God does not hear or save; God answers that he is raising up the Chaldeans, called "Babylonians" here). ESV copy: fair paraphrase.
- Habakkuk 3:17 (the fig tree does not blossom; no herd in the stalls). ESV copy: fair paraphrase.
- Mark 9:17–27 (the father's plea; Jesus casts out the spirit and raises the boy). ESV copy.
- Romans 1:18 (people suppress the truth). ESV copy: "who by their unrighteousness suppress the truth". BSB: "who suppress the truth by their wickedness".
- James 2:19 (the demons believe that God is one, and shudder). ESV copy: "You believe that God is one; you do well. Even the demons believe, and shudder!" Fair paraphrase without quotation marks. BSB: same sense.
- Acts 17:16–22 (Paul at Athens; Epicurean and Stoic philosophers; the Areopagus). ESV copy.
- Acts 17:26 ("he made from one man every nation of mankind") behind "God had made the nations". ESV copy.
- Acts 17:31 (assurance given by raising him from the dead). ESV copy. BSB: "by raising Him from the dead".
- Jesus prayed the first line of Psalm 22. ESV copy and BSB: Matthew 27:46 and Psalm 22:1 agree.
- "far" in Psalm 22 (verses 1, 11 and 19). ESV copy.
- Psalm 22 closes with the ends of the earth turning to the Lord (verse 27, in the closing section, verses 27–31). ESV copy. BSB: "All the ends of the earth will remember and turn to the LORD."
- Luke 24:1 and 13–31 (the first day of the week; two disciples walk to Emmaus; Jesus draws near; he interprets the Scriptures; they know him at the breaking of bread; he vanishes from their sight). ESV copy.
- Matthew 28:20 (Jesus promised to be with his people always). ESV copy: "And behold, I am with you always, to the end of the age." Spoken to the eleven; "his people" is the church's ordinary reading. BSB: same sense.
- "on the third day" (correction 5). ESV copy: Luke 24:7, "be crucified and on the third day rise". BSB: same. Not quoted in the essay.

## 4. Dates, names, events, titles

- Joy Davidman, Lewis's wife, died of cancer in 1960. **Verified** for the year. Search, 2026-10-27, Wikipedia "A Grief Observed": "following the death of his wife, Joy Davidman, in 1960". "Of cancer" rests on the writer's 2026-10-26 search and the sibling ledger, and was not seen again.
- *A Grief Observed* was published the next year (1961) under the pen name N. W. Clerk. **Verified.** Search, 2026-10-27: Wikipedia says it was published in 1961 under a pseudonym, and a result summary says it was "first published under the pseudonym N. W. Clerk". The Magdalen College page reportedly adds that Lewis first planned the pseudonym "Dimidius" and that T. S. Eliot, at his publisher, steered him to N. W. Clerk. That detail is not used in the essay.
- By 1960 Lewis was one of the best-known Christian apologists in the English-speaking world and had answered doubts in print for years. Not checked (textbook). **Still open.**
- "Early in the first one" (notebook I) and "Later in *A Grief Observed*" (the gaze passage). **Verified.** Search, 2026-10-27: "Meanwhile, where is God?" is placed in Book I and chapter 1. A summary says the "no answer" passage "comes toward the end".
- The notebooks end quieter than they begin. **Verified** as a reading. Search, 2026-10-27: a result summary says commentary on the book finds the "no answer" passage near the end more hopeful than the earlier sections, where Lewis describes God as a door slammed in your face. The essay's line after the gaze quotation ("His questions were still unanswered, but the silence no longer felt like a door slammed in his face") reads the two quoted passages side by side.
- John of the Cross was a Spanish Carmelite friar in the reform led by Teresa of Ávila. Writer's search, 2026-10-26 (EWTN, Britannica, Vatican pages). Not seen again. The closing pass saw Teresa's own letter about his imprisonment, which asks for an inquiry into what the friars did, but that letter does not name the reform. **Still open.**
- Seized in December 1577 by friars opposed to the reform and taken to their priory in Toledo. **Verified** for the month and the city. Search, 2026-10-27: the editorial bracket in the Letter 260 repost gives 3 December 1577, and the results speak of "his prison cell in Toledo". "Friars opposed to the reform" and "their priory" rest on the writer's 2026-10-26 search.
- He composed poetry in the cell. Writer's search, 2026-10-26 (the Spiritual Canticle). Not seen again. **Still open.**
- Escaped in August 1578. **Verified.** Search, 2026-10-27: carmelitequotes.blog gives the night of 17–18 August 1578, and Teresa's Letter 260 of 21–22 August 1578 was written on news of the escape. The editorial bracket's "15 August" differs, so the essay gives only the month and year.
- The poem "En una noche oscura" and the later commentary (*Dark Night*); the English phrase "the dark night of the soul" comes from them. **Verified** in Peers (Writings-Database); see section 1. The poem's date is left unstated (correction 3).
- Mother Teresa's private letters were published in 2007 as *Come Be My Light*, edited by Fr. Brian Kolodiejchuk, who was leading the effort to have her declared a saint. **Verified.** Search, 2026-10-27: result summaries call him "a priest in charge of advocating that Mother Teresa be made a saint" and a Missionary of Charity priest who edited the letters "in preparation for her canonization". They name Doubleday as the publisher and 2007 as the year. The title "postulator" was not confirmed by the results, and the essay does not use it.
- Letter of September 1979 to a priest (the Rev. Michael van der Peet). **Verified.** Search, 2026-10-27 (Time "Quotes of the Day"; HNN; AP via oneindia.com).
- Charles Taylor, *A Secular Age*. Named without a year. Not checked (textbook). Counted with the Taylor paraphrase above as **still open**.
- J. L. Schellenberg, *Divine Hiddenness and Human Reason*, 1993. Writer's search, 2026-10-26 (Wikipedia; SEP). Not seen again. **Still open.**
- Schellenberg, *The Hiddenness Argument*, 2015. Writer's search, 2026-10-26 (*The Hiddenness Argument: Philosophy's New Challenge to Belief in God*, 2015). Not seen again. **Still open.**
- Søren Kierkegaard, *Philosophical Fragments*. Named without a year. Not checked (textbook). Counted with the Kierkegaard paraphrase above as **still open**.
- "Christians have argued for centuries about what passed between the Father and the Son in that hour." A general description of the debate over the cry from the cross; it takes no position and cites no source. Not counted as an open claim.
- "a good deal of evangelical church life in recent decades has taught people to measure their closeness to God by what they feel" and "You can sit in a good many churches for a long time without hearing a lament". Characterizations in the first person plural, with no figures and no source claimed. Not counted as open claims.

## 5. Biography

- "I came to faith as an adult, out of atheism." Verified against docs/work/NOTES.md (confirmed biography).
- "I've written elsewhere about what Taylor's account means for ..." points to the approved pilot docs/work/essays/what-post-christian-means.md, which discusses Taylor. Checked in the repo on 2026-10-27.
- The essay states no title, no years in ministry, no book count and no denomination. It invents no scene, conversation or congregant. The "we" sentences about planning services are about the church, not a claimed personal history. Checked in the text on 2026-10-27.

## 6. Crisis care and links

- "In the US, call or text 988 for the Suicide and Crisis Lifeline." Wording from docs/work/essays/BRIEF.md. Not checked against the Lifeline's site (see section 2).
- The [Find Help](/help) link and the line saying the essay cannot give medical or counseling advice are present, per BRIEF.md.
- /writing/what-post-christian-means, /writing/did-the-resurrection-happen and /writing/the-theology-of-saturday are all in docs/work/essays/link-targets.json. Checked on 2026-10-27.
- scripts/validate-essays.mjs was run again after the closing-pass edits, on a JSON copy of the essay in the scratchpad (godfar-close/check; no repo file changed). It passes shape, language, dashes, "!", references and Closing Texts. It reports only the same three link notices as before: what-post-christian-means is "not on the shelf", and the other two are "on the shelf with no rewrite yet". They clear when those essays ship. The essay has no em-dash and one en-dash, in the reference "32:3–5".

## Dropped by the writer on 2026-10-26 (not in the essay)

The old essays' invented biography ("I know the feeling from the inside", "I have led services designed to move people", "I have been married long enough"); Nietzsche's madman quotations; Pascal's "eternal silence" and "enough light" lines; Descartes 1641; Newbigin's *Proper Confidence*; Luther's *Anfechtung*; Spurgeon's "fits of depression" and the 1856 Surrey Gardens disaster; Newman's "ten thousand difficulties"; the Mother Teresa line "the place of God in my soul is blank"; the Taylor quotation "one human possibility among others"; Psalm 42:3; 2 Timothy 2:13; the claim that Mother Teresa's darkness lasted "nearly fifty years, from around 1949".

## Still open after the closing pass (12)

None of these is a quotation in quotation marks. Each needs a search or the book when a run has budget left:

1. Kierkegaard, *Philosophical Fragments* chapter II: the king and the humble maiden, the god's descent in the form of a servant, and the book's title (Hong or Swenson translation).
2. Schellenberg's argument as summarized (SEP "Hiddenness of God").
3. Schellenberg's reply to the freedom defense (his 2015 book or SEP).
4. Christians' usual reply that there are no nonresistant nonbelievers (SEP).
5. Schellenberg, *Divine Hiddenness and Human Reason*, 1993.
6. Schellenberg, *The Hiddenness Argument*, 2015.
7. Taylor's account (the porous and buffered self around 1500 and now; what got in was often fear; the conditions of belief) and *A Secular Age* as its source.
8. John of the Cross belonged to the Carmelite reform led by Teresa of Ávila.
9. John composed poetry in the Toledo cell.
10. Lewis as one of the best-known Christian apologists in the English-speaking world by 1960.
11. The church-sign line "if God seems far away, guess who moved" as an old saying on church signs (origin not traced; no attribution in the essay).
12. 988 as the US Suicide and Crisis Lifeline, call or text (wording set by BRIEF.md; check against 988lifeline.org).

Also outstanding: check all Scripture once with the ESV API, and the Mother Teresa clause against *Come Be My Light*.
