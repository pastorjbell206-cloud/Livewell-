# Claims ledger: excavation-not-demolition

Essay: `docs/work/essays/excavation-not-demolition.md` ("Deconstructing Your Faith: What to Tear Down and What to Keep"). The writer's ledger of 2026-10-26 was rewritten by the verifier on 2026-10-27, after checks run late on 2026-10-26 and early on 2026-10-27. A closing run later on 2026-10-27 took up every line that was still unverified; its results are written into the lines below and summarized in the next section. Every line gives the result and the method actually used.

## Closing run, 2026-10-27: summary

**Search.** This run made 8 WebSearch calls: the Harris post (twice), the Harris separation, the 2018 withdrawal of his book, the book's 1997 date, and the Zacharias report (twice). The ninth, for the Guidepost report, came back "this turn's web search budget is used up" (the budget is shared by every agent in the workflow), so no further searches were made. WebFetch could not resolve the news sites (DNS failure), so only the search results themselves were seen. Each is the search engine's summary of its results, quoting and linking the outlets named on the line. No news page was opened.

**Everything else** in this run used local sources (methods below).

**Counts.** 46 lines were open at the start of this run. 18 are now verified. Three numbers that could not be confirmed were generalized or cut in the essay. The 24 items still open are listed at the end of this section; a run with search should start there.

**Essay changes in this run** (numbers that could not be confirmed, per the integrity rules):

1. Where It Usually Starts, Guidepost: "had kept a private list of ministers accused of sexual abuse for more than a decade" became "had for years kept a private list of ministers accused of sexual abuse". Reason: "more than a decade" rests only on the writer's search record, and the search to confirm it was refused by the exhausted budget.
2. Same section, *The Great Dechurching*: "estimated in *The Great Dechurching* (2023) that about 40 million American adults who once attended church at least monthly now go less than once a year" became "wrote *The Great Dechurching* (2023) about the millions of American adults who once went to church regularly and now almost never go". Reason: the 40 million figure and the monthly and yearly thresholds could not be confirmed (the writer's ledger did not say plainly that the figure appeared in a result). "Millions" is safe on any reading. A run that sees the figure in a source can restore "about 40 million" and the authors' definition.
3. What Deserves to Come Down, *Soul Searching*: "a national survey of more than three thousand American teenagers and long interviews with more than two hundred of them" became "a national survey of American teenagers and long interviews with some of them". Reason: the counts (3,290 surveyed and 267 interviewed, in the writer's record) could not be confirmed.

No quotation was changed. Every non-Scripture quotation in the essay (Harris's "The popular phrase ..."; the creed's "begotten, not made"; "take up and read") is now verified against a source seen, and every Scripture quotation matched the ESV copy again in this run. No other wording changed. Em-dashes recounted after the edits: 0.

**Still open after this run** (no source seen; each stays in the essay as standard reference knowledge, unless noted):

1. Derrida used "deconstruction" in the late 1960s.
2. The Boston Globe's reporting began in January 2002.
3. Guidepost Solutions, May 2022: the Executive Committee staff's private list and no sign of action (writer's search record only; "more than a decade" generalized, change 1).
4. *The Great Dechurching*: Davis and Graham, 2023, surveys by Burge and Djupe (writer's search record only).
5. *The Great Dechurching*: most of the dechurched left for ordinary reasons (writer's search record only).
6. *Soul Searching*: 2005; Smith a sociologist; the authors named moralistic therapeutic deism (writer's search record and textbook).
7. The five-point summary of moralistic therapeutic deism (unquoted paraphrase from memory of the book).
8. Smith and Denton found it across Catholic, mainline and evangelical teenagers and traced it to the adults around them.
9. Alisa Childers sang with ZOEgirl.
10. The summary of *Another Gospel?* (the church class, her way back, the vocabulary argument).
11. Celsus wrote in the late second century (Origen says this Celsus lived "in that of Adrian, and later", that is, from Hadrian's time on, which fits the century but not "late").
12. 1 Corinthians was written in the mid-50s, before any of the Gospels.
13. 1 Corinthians 15:3-5 is one of the oldest Christian confessions, fixed before Paul wrote it down ("received" is in the verse; the rest is the standard scholarly view).
14. The summary of N. T. Wright's *The Resurrection of the Son of God*.
15. Arius began teaching around 318 (the ANF editor dates Alexander's letter on his deposition to 321, which fits but does not fix the start).
16. Thagaste is in what is now Algeria.
17. Augustine moved to Milan in 384 (the move is verified; the year is not).
18. Rome excommunicated Luther in 1521.
19. The Reformation split Western Christianity and wars followed.
20. Luther kept the Nicene Creed, and his *Small Catechism* of 1529 teaches the Apostles' Creed article by article (the Apostles' Creed and a children's catechism are verified in the Smalcald Articles; the Nicene Creed, the year 1529 and the article-by-article form are not).
21. The summary of James K. A. Smith's *You Are What You Love*.
22. The saying attributed to Abba Moses (unquoted paraphrase).
23. Most of the world's Christians now live in Africa, Asia and Latin America.
24. In the US, call or text 988 for the Suicide and Crisis Lifeline (wording per BRIEF.md; not checked against the Lifeline's own site).

The Scripture quotations are not in this list because each matched an ESV text word for word. That text is a GitHub copy, not esv.org or the ESV API, so all of them should still be rechecked with James's ESV API key.

## First verification run (2026-10-26 and early 2026-10-27): no web search

The workflow's shared WebSearch budget (200 calls per turn, shared by every agent) was already used up when that check began. Three searches were attempted then (the Harris quotation, the RZIM report, *The Great Dechurching*), and all three came back "this turn's web search budget is used up." No search result was seen in that verification, and nothing was fetched from the web. It rested on local sources and on the writer's own search record. Where the writer's ledger recorded a search check, that record is cited below as the writer's, with the sources the writer named.

## Methods, in the words used below

- **"ESV copy"**: compared with the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown", parsed by its author from javascripture's ESV JSON). The first verifier used a clone in the session scratchpad (`scratchpad/esv-mdbible`, commit fd66568 dated 2022-01-20), read the chapter files with `git show`, and ran a script on 2026-10-26 that compares each quotation with the verse text after normalizing case, punctuation and spacing. The copy does not say which ESV edition it is, prints LORD as "Lord", and drops inner quotation marks. This is not esv.org or the ESV API.
- **"Re-run 2026-10-27"** (on a Scripture line): the closing run compared every Scripture quotation again with its own script (`scratchpad/excav-close/scripture.py`) against the same copy (`scratchpad/sources/esv-mdbible`, same commit fd66568), with the same normalization. All 13 quotation strings matched. The script also printed each verse from the site's Berean Standard Bible, and the BSB confirms the sense of every one. ESV wording not confirmed by search (budget exhausted) or by esv.org.
- **"Library"**: read in a clone of the public-domain HistoricalChristianFaith Writings-Database (`scratchpad/wdb/repo` in the first run; `scratchpad/sources/Writings-Database` in the closing run; both commit 328918a dated 2026-10-25), with `git show`. First run: Augustine, *Confessions* Books 3, 4, 5, 6, 8, 9 (the Book 3 file's header names NPNF Series I, Vol. I); Augustine, *On the Profit of Believing*; Origen, *Against Celsus* Book 2 (sibling ledgers identify the wording as the ANF translation); Eusebius, *Church History* Book 6; Socrates Scholasticus, *Ecclesiastical History* Book 1; "Council of Constantinople of 381/The Holy Creed"; "Council of Chalcedon of 451/The Definition of Faith"; and the library's *Sayings of the Desert Fathers* PDFs (Anthony Alcock's translation from the Coptic), converted with pdftotext. Closing run: *Confessions* Books 6, 8 and 9; Socrates Book 1 with the NPNF translator's notes; Alexander of Alexandria, *Epistles on the Arian Heresy* (with the ANF editor's bracketed dates); Origen, *Against Celsus* Book 1; and the NPNF notes in the Constantinople 381 creed file and the Chalcedon Definition file.
- **"Possidius (Weiskotten)"**: library files `Possidius/Life of St Augustine/English translation.html` and `Translator's introduction.html`, read in the closing run: Herbert T. Weiskotten's edition and translation (Princeton University Press, 1919), transcribed by Roger Pearse. The introduction is Weiskotten's own scholarly summary, not a patristic text.
- **"Gutenberg"**: Project Gutenberg texts cloned in the closing run from the GITenberg mirrors into `scratchpad/sources/`: #274, *Disputation of Doctor Martin Luther on the Power and Efficacy of Indulgences* (from *Works of Martin Luther*, Spaeth, Reed, Jacobs et al.), in `luther-95`; and #273, *The Smalcald Articles* (Luther, 1537; Bente and Dau's translation in the *Triglot Concordia*, 1921), in `smalcald-273`.
- **"Creeds.json"**: the NonlinearFruit/Creeds.json clone in the scratchpad (`creedsjson/repo`, commit 2ae21a4), read in the closing run: the Chalcedonian Definition text (its metadata cites Schaff's *Creeds of Christendom*) and the year fields of that file and of the Nicene Creed file.
- **"BSB"**: the site's Berean Standard Bible chapter files in `client/public/bible/ch/`.
- **"Search (closing run)"**: a WebSearch result seen in the closing run on 2026-10-27. The result is the search engine's summary, quoting and linking the outlets named on the line; the pages themselves were not opened.
- **"Per the writer's ledger"**: the writer recorded a WebSearch check on 2026-10-26 against the sources named. No verifier saw those results.
- **"Not checked (textbook)"** or **"Not checked (reference knowledge)"**: no source was opened or searched. The claim was judged standard reference knowledge. That judgment is not a check.
- **"Interpretive"**: an argument or characterization with no checkable fact beyond what is listed elsewhere.

## Corrections made in the essay by the first verifier

1. Opening, Harris quotation: "he wrote: "I have undergone a massive shift in regard to my faith in Jesus. The popular phrase for this is 'deconstruction,' the biblical phrase is 'falling away.'"" became "he wrote that his faith in Jesus had gone through a massive shift, and added: "The popular phrase for this is 'deconstruction,' the biblical phrase is 'falling away.'"" Reason: the first sentence's wording was from memory and could not be searched then. (The closing run has since seen the first sentence quoted by Fox affiliates; the paraphrase is accurate and was left as it is.)
2. Opening: "Harris had written *I Kissed Dating Goodbye* in 1997, in his early twenties" became "Harris was still a young man when *I Kissed Dating Goodbye* came out in 1997". Reason: "early twenties" rested on an unchecked birth year.
3. What Deserves to Come Down: "the sociologists Christian Smith and Melinda Lundquist Denton" became "the sociologist Christian Smith and Melinda Lundquist Denton". Reason: Denton's discipline was unverified.
4. Why Some Christians Are Worried: "*Another Gospel?* (2020)" became "*Another Gospel?*". Reason: the year could not be checked and does no work in the sentence.
5. Same section, Celsus: "a half-crazed woman and a few others caught up in the same delusion" became "a half-crazed woman and perhaps one other caught up in the same delusion". Reason: the library text of *Against Celsus* 2.55 reads "A half-frantic woman, as you state, and some other one, perhaps, of those who were engaged in the same system of delusion" (2.59 repeats "some one else"). One other, not a few.
6. What the Creeds Confess, Arius: "some form of it returns in every century" became "some form of it keeps coming back". Reason: overclaim.
7. Augustine: "At nineteen he read a book of Cicero's" became "In his nineteenth year he read a book of Cicero's". Reason: *Confessions* 3.4 (library) says "in that my nineteenth year", which is not the same as age nineteen.
8. Augustine: "the faith as he had first heard it at nineteen" became "the faith as he had understood it when he walked away" (later cut in the voice edit). Reason: he first heard the faith as a child (*On the Profit of Believing* 1.2, library: "the religion which had been set in me from a child by my parents").
9. How People Rebuild: "told a restless brother to go and sit in his cell" became "told a brother to go and sit in his cell". Reason: "restless" is not in the saying as the writer's ledger gives it.
10. Same section: "what they confess is the creed of Nicaea" became "the faith most of them confess is the faith of Nicaea". Reason: overclaim; not every Christian body in the global South confesses the Nicene faith (Oneness Pentecostal churches reject it, for example: not checked, reference knowledge).

## Voice edit, 2026-10-27 (final read)

The last reader revised the prose for voice. No fact, quotation, number, date or name was added; every quotation and link was unchanged (checked by script against the previous commit). Changes that touch lines below:

- Where It Usually Starts: the three abuse cases now run in date order (Boston 2002, Zacharias February 2021, Guidepost May 2022).
- "Most people who deconstruct have torn down two different things" became "Many people ..."; "Most are somewhere in between" became "many are still somewhere in between".
- N. T. Wright and James K. A. Smith: the years (2003, 2016) were dropped from the prose; titles and claims unchanged.
- Augustine: correction 8's sentence now reads "When Augustine came back, he didn't invent a faith of his own. He came to the same faith his mother held and found it far deeper than the version he had rejected."
- Global church: "not the subculture of one American decade" became "not an American subculture"; "will almost certainly be older and wider" became "can be older and wider".
- Headings made plain: "Why Some Christians Are Worried", "What the Creeds Confess", "If You Are Hurting", "Where Deconstruction Can Lead". The section headings below follow the essay.

## Opening: Joshua Harris

- Harris announced on Instagram in late July 2019 that he no longer considered himself a Christian. Verified. Search (closing run): Fox 5 Atlanta and other Fox affiliates report the Instagram post and that he no longer considered himself a Christian; Crosswalk's report of it is dated July 29, 2019. The outlets differ on the day of the week, and the essay gives only "late July".
- *I Kissed Dating Goodbye* came out in 1997. Verified. Search (closing run): Wikipedia's entry for the book (Multnomah, 1997) and a 2001 Christianity Today interview (published by Multnomah in 1997).
- Harris was still a young man then. Verified. Search (closing run): a bookseller's description says the book was written when he was 21; the summary of the 2018 coverage says the same.
- The book shaped how a generation of evangelical teenagers thought about dating, sex and marriage. Interpretive (general characterization).
- In 2018 he asked his publisher to stop printing the book and apologized to readers it had hurt. Verified. Search (closing run): Christian Post, ChurchLeaders (which prints the full statement), NBC News and Boundless report the October 2018 statement (Broadview dates it October 23, 2018): Harris would discontinue the book's publication, and the publisher supported the decision and would not reprint once current inventory sold. The results quote his apology: he regrets "any way that my ideas restricted you, hurt you, or gave you a less-than-biblical view of yourself." "Asked his publisher to stop printing it" is a fair paraphrase.
- The faith post came days after he and his wife announced their separation. Verified. Search (closing run): the separation was announced on their Instagram accounts in mid-July 2019 (Crosswalk; Premier's report dated July 19; NPR and WGCU, July 21), and the faith post followed about a week later (Crosswalk; Christian Post via SermonAudio). The writer's July 17 date was not confirmed and is not in the essay.
- Paraphrase: his faith in Jesus had gone through a massive shift. Verified as paraphrase. Search (closing run): Fox 5 Atlanta and other Fox affiliates quote the post: "I have undergone a massive shift in regard to my faith in Jesus." The essay keeps the unquoted paraphrase (correction 1).
- Quotation: "The popular phrase for this is 'deconstruction,' the biblical phrase is 'falling away.'" Verified. Search (closing run): the result summary gives the caption word for word, citing ChurchLeaders and the Christian Post; a second search's summary cites Crosswalk for the same "deconstruction" and "falling away" line. The Instagram post itself was not seen.

## The word "deconstruction"

- The word came from Jacques Derrida, a French philosopher, who used it in the late 1960s for a way of reading texts against their own assumptions. Still open. Not checked (textbook; *Of Grammatology*, 1967). No local source exists, and the search budget was gone.

## Where It Usually Starts

- January 2002: the Boston Globe began reporting how the Archdiocese of Boston moved priests accused of abusing children from parish to parish. Still open. Not checked (textbook; the Spotlight series).
- May 2022: an independent investigation by Guidepost Solutions found that staff of the SBC Executive Committee had for years kept a private list of ministers accused of sexual abuse, with no sign anyone acted to keep them out of positions of power in SBC churches. Still open, and generalized in the closing run (change 1: "for more than a decade" became "for years"). The rest rests on the writer's ledger (AP via Washington Times, UPI, WABE; report released May 22, 2022; "more than 10 years"; "no indication ... took any action to ensure that the accused ministers were no longer in positions of power at SBC churches"). The closing run's search for it was refused by the exhausted budget.
- February 2021: an investigation commissioned by Ravi Zacharias's ministry found he had sexually abused women over many years under cover of the ministry. Verified. Search (closing run): RZIM hired the law firm Miller & Martin after Christianity Today's report of September 29, 2020 (Baptist Press, KVIA); the firm released a preliminary report in late December 2020 and the full report in February 2021 (one result gives Tuesday, February 9; KVIA's story is dated February 12, 2021). The findings as summarized: a pattern of sexual misconduct with multiple women in multiple countries, including sexting, unwanted touching, spiritual abuse and, in one case, rape. The Baptist Press story's title, as the result shows it, speaks of Zacharias' "years long history of sexual abuse of women"; Julie Roys's story on the interim report says he "engaged in sexual misconduct over many years". The RZIM board said it believed the women. "Under the cover of that ministry" is the essay's characterization (the report also found he used ministry funds for massages).
- Zacharias as one of the best-known Christian apologists of his generation. Interpretive (characterization).
- The political fusion paragraph (much of American evangelicalism tied to one party over the last half century; a left-wing version exists; in the churches usually meant by "deconstruction" it has run mostly to the right). Interpretive; no figure is given.
- Purity culture's promised reward and prosperity preaching's promise of health and money. Interpretive (general characterizations, no named source).

## The Great Dechurching

- Jim Davis and Michael Graham, *The Great Dechurching* (2023). Still open. Per the writer's ledger (UnHerd, September 2023; Goodreads; Equip.org review).
- Surveys run by the political scientists Ryan Burge and Paul Djupe. Still open. Per the writer's ledger (review summary).
- About 40 million American adults who once attended at least monthly now go less than once a year. Cut in the closing run (change 2). The essay now says "the millions of American adults who once went to church regularly and now almost never go", which needs no source. The writer's ledger quoted the authors' definition from a review ("someone who used to go to church at least once per month but now goes less than once a year") but did not say plainly that the 40 million figure appeared in a result.
- Most left for ordinary reasons (moving, family change, the habit lapsing). Still open; unquoted paraphrase. Per the writer's ledger (Michael Graham quoted via ChurchLeaders/WBUR: "Most people have left for really pedestrian reasons").
- The two portraits that follow (the teenager who read Joshua, the woman who could not shrug) are general types, not reported people. Interpretive.

## Moralistic therapeutic deism

- *Soul Searching*, 2005, by Christian Smith and Melinda Lundquist Denton. Still open. Per the writer's ledger (America magazine, Christian Century, The Revealer).
- Smith is a sociologist. Still open. Not checked (textbook). Denton's discipline is not stated (correction 3).
- The study's size. Generalized in the closing run (change 3): the essay now says "a national survey of American teenagers and long interviews with some of them". The counts (3,290 surveyed, 267 interviewed) rest only on the writer's ledger.
- They named the faith moralistic therapeutic deism. Still open. Per the writer's ledger.
- The five-point creed is unquoted paraphrase ("as they summarized it, runs roughly like this"). Still open. Not checked (memory of the book); no text of the book was available, which is why it is paraphrase.
- They found it among Catholic, mainline Protestant and evangelical teenagers alike and argued the teenagers largely learned it from adults. Still open. Not checked (reference knowledge of the book's argument).

## Jeremiah

- Jeremiah called in the thirteenth year of King Josiah (1:2), son of one of the priests in Anathoth (1:1), a youth (1:6-7). Paraphrase checked against the ESV copy: matches.
- Jeremiah 1:10, "See, I have set you this day over nations and over kingdoms, to pluck up and to break down, to destroy and to overthrow, to build and to plant." Matched the ESV copy word for word. Re-run 2026-10-27: matched; BSB confirms the sense.
- "Four of the six verbs are about tearing down." Counted from the verse in the ESV copy: pluck up, break down, destroy, overthrow; build, plant. Correct.
- God sent Jeremiah to the gate of the temple to speak to those entering to worship (7:2). Paraphrase checked against the ESV copy: matches.
- Jeremiah 7:4, "Do not trust in these deceptive words: 'This is the temple of the LORD, the temple of the LORD, the temple of the LORD'". Matched the ESV copy word for word (the copy prints "Lord" and drops the inner quotation marks; the essay ends the sentence outside the quotation). Re-run 2026-10-27: matched; BSB confirms the sense.
- Jeremiah named theft, murder, adultery and offerings to Baal. Paraphrase of 7:9 checked against the ESV copy: matches.
- In the temple court he said the house could fall; the priests and the prophets seized him and said he deserved to die (26:8-11). Checked against the ESV copy: matches.
- Jeremiah 32: the siege and the court of the guard (32:2); Hanamel his cousin (32:7-8); the field at Anathoth (32:9); the deed signed before witnesses (32:10); the documents put "in an earthenware vessel, that they may last for a long time" (32:14). Paraphrase checked against the ESV copy: matches ("clay jar" for "earthenware vessel").
- Jeremiah 32:15, "Houses and fields and vineyards shall again be bought in this land". Matched the ESV copy word for word (the verse's opening is omitted). Re-run 2026-10-27: matched; BSB confirms the sense.
- "Late in Jeremiah's ministry" and "decades tearing things down". Verified from Scripture in the closing run. Jeremiah 1:2 and 32:1 (ESV copy and BSB) give Josiah's thirteenth year and Zedekiah's tenth. The BSB's reign lengths (2 Kings 22:1, Josiah 31 years; 23:31 and 23:36, Jehoahaz three months and Jehoiakim 11 years; 24:8 and 24:18, Jehoiachin three months and Zedekiah 11 years) put about 39 years between them, and Jeremiah 1:3 runs his ministry to the eleventh year of Zedekiah. The absolute dates (627 to 587 BC) are not in the essay and were not checked.

## Why Some Christians Are Worried

- Hebrews 3:12, "Take care, brothers, lest there be in any of you an evil, unbelieving heart, leading you to fall away from the living God." Matched the ESV copy word for word. Re-run 2026-10-27: matched; BSB confirms the sense.
- Luke 8:13, "believe for a while, and in time of testing fall away", for people with no root. Matched the ESV copy word for word (from Jesus' explanation of the parable of the sower). Re-run 2026-10-27: matched; BSB confirms the sense.
- "Pastors can tell you about people who..." A general statement, not a reported conversation. Interpretive.
- Alisa Childers was a singer with the Christian pop group ZOEgirl. Still open. Not checked (reference knowledge).
- *Another Gospel?* tells how a class at her own church left her doubting and how she worked her way back, and argues that much progressive Christianity keeps the vocabulary while changing the meaning. Still open. Not checked (reference knowledge of the book). Year removed (correction 4). The cross and resurrection examples that follow are the essay's own, not attributed to her.
- The rebuilt political Christianity paragraph. Interpretive.
- "I came to faith as an adult, from atheism." Confirmed in docs/work/NOTES.md. No other biography is used in the essay.
- Celsus wrote that belief in the resurrection rested on the word of a half-crazed woman and perhaps one other caught up in the same delusion. Unquoted paraphrase, corrected (correction 5). Library: *Against Celsus* 2.55 ("A half-frantic woman, as you state, and some other one, perhaps, of those who were engaged in the same system of delusion") and 2.59. In the text Celsus speaks through an imagined Jewish critic.
- Celsus wrote in the late second century. Still open. Library, closing run: Origen, *Against Celsus* 1.8, says there were two Epicureans named Celsus, "the earlier of the two having lived in the time of Nero, but this one in that of Adrian, and later". That fits the second century but does not fix "late" (the usual date is about 175-180: textbook).
- In the middle of the third century Origen answered him point by point. Library: Eusebius, *Church History* 6.36, says Origen wrote the eight books against Celsus's *True Discourse* when he was "over sixty years old", in the reign of Philip (late 240s); *Against Celsus* quotes and answers Celsus passage by passage.

## What the Creeds Confess

- 1 Corinthians was written to Corinth in the mid-50s, before any of the Gospels. Still open. Not checked (textbook).
- The tradition in 1 Corinthians 15:3-5 is one of the oldest Christian confessions we have, already fixed before Paul wrote it down. Still open. Not checked (standard scholarly view); "received" is in the verse.
- 1 Corinthians 15:3-5, "For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures, and that he appeared to Cephas, then to the twelve." Matched the ESV copy word for word. Re-run 2026-10-27: matched; BSB confirms the sense.
- 1 Corinthians 15:17, "And if Christ has not been raised, your faith is futile and you are still in your sins". Matched the ESV copy word for word. Re-run 2026-10-27: matched; BSB confirms the sense.
- N. T. Wright, *The Resurrection of the Son of God* (2003), argues that the empty tomb and the appearances best explain how the earliest church began. Still open. Not checked (reference knowledge). The essay does not give the year.
- Around 318 Arius, a presbyter of Alexandria, began teaching that the Son was a created being. Arius as an Alexandrian presbyter: verified in the closing run (library, Socrates 1.5: "A certain one of the presbyters under his jurisdiction, whose name was Arius", under Alexander, bishop of Alexandria; there Arius reasons "that there was a time when the Son was not"). The year is still open: the ANF editor's note on Alexander's "Epistles on the Arian Heresy and the Deposition of Arius" reads "[A.D. 321.]" (library), which puts the dispute under way by then but does not date its start (usually 318 or 319: textbook).
- The slogan "there was a time when he was not", condemned by name in 325. Library: the creed of 325 as given in Socrates 1.8 anathematizes "those who say 'There was a time when he was not'". The essay gives the slogan without quotation marks.
- The Council of Nicaea met in 325. Verified in the closing run. Library: Socrates 1.13 says the synod was convened "in the consulate of Paulinus and Julian, on the 20th day of May", and the NPNF translator's note reads "May 20, 325 a.d."
- Arianism as a reverent position meant to protect the oneness of God, which keeps coming back. Interpretive; corrected (correction 6).
- The creed of 325 confessed the Son "begotten, not made," of one being (homoousios) with the Father. Library: Socrates 1.8 ("begotten, not made, consubstantial with the Father"), with Eusebius's letter there discussing "homoousios". "Of one being" is the essay's rendering, not quoted.
- The creed was expanded at Constantinople in 381 into the form most churches still say. Year and council verified in the closing run: the NPNF note in the library's "Holy Creed" file quotes Lipsius on "the Ecumenical Council of Constantinople, a.d.: 381", and Creeds.json gives the Niceno-Constantinopolitan Creed the year 381. The same NPNF note reports Tillemont's and Hefele's view that the council adopted a creed already in use rather than drafting a new expansion; "expanded at Constantinople" stays as the standard short account of the creed's 381 form. "The form most churches still say" is not checked (textbook).
- Chalcedon, 451: one person in two natures, truly God and truly man, without confusion, without change, without division, without separation. Verified in the closing run. Wording: the Creeds.json Chalcedonian Definition (from Schaff) reads "truly God and truly man" and "recognized in two natures, without confusion, without change, without division, without separation", the essay's phrases word for word (given without quotation marks); the library's NPNF text reads "unconfusedly, immutably, indivisibly, inseparably". Year: the NPNF note in the library's Definition file cites Baronius "ad. ann. 451" for the council's history, and Creeds.json gives 451.
- The creed says God became flesh, was crucified under Pontius Pilate, rose on the third day, and will come again to judge the living and the dead. Paraphrase checked against the library's creed of 381 ("was incarnate ... and was made man, and was crucified also for us under Pontius Pilate ... the third day he rose again ... he shall come again with glory to judge both the quick and the dead"): matches.
- The second-order list (baptism, the millennium, women as pastors, Genesis 1) follows the classification in CLAUDE.md; no position is asserted.
- Links: [Did the Resurrection Actually Happen?](/writing/did-the-resurrection-happen) and [What Was Decided at the Council of Nicaea?](/writing/the-council-of-nicaea-what-was-decided-in-325). Both slugs found in docs/work/essays/link-targets.json.

## Augustine Took His Faith Apart Too

- Born 354 in Thagaste, in what is now Algeria, to a Christian mother named Monica. Verified in the closing run except the modern country. Possidius (Weiskotten), chapter 1: "Augustine was born in the African province, in the city of Tagaste of honorable Christian parents"; Weiskotten's introduction: "born at Tagaste in Numidia on November 13, 354". The library's *Confessions* Book 9 names his mother Monica. "What is now Algeria" is not checked (textbook geography).
- In his nineteenth year he read a book of Cicero's that set him on fire for philosophy. Corrected (correction 7). Library: *Confessions* 3.4 ("a certain book of Cicero ... called Hortensius"; "in that my nineteenth year"; "In Greek the love of wisdom is called 'philosophy,' with which that book inflamed me").
- He found the Bible crude beside Cicero. Library: *Confessions* 3.5 ("they appeared to me to be unworthy to be compared with the dignity of Tully"): matches as paraphrase.
- Nine years among the Manichees. Library: *Confessions* 4.1 ("During this space of nine years, then, from my nineteenth to my eight and twentieth year").
- The Manichees promised a religion of pure reason and mocked the Old Testament. Library: *On the Profit of Believing* 1.2 ("by pure and simple reason, they would lead within to God"); *Confessions* 3.7. Matches as paraphrase.
- Faustus came to Carthage and could not answer his questions. Library: *Confessions* 5.3 and 5.7 ("he was aware that he had no knowledge of these things, and was not ashamed to confess it"). Weiskotten's introduction (closing run) agrees: Faustus "was unable to answer any searching questions". Matches.
- He drifted toward the skeptics, who held that nothing could be known for certain. Library: *Confessions* 5.10 (the "Academics ... held that we ought to doubt everything") and 5.14.
- In 384 he moved to Milan to teach rhetoric. The move and the post: library, *Confessions* 5.13 ("to Milan I came, unto Ambrose the bishop"). The year is still open: Weiskotten's introduction (closing run) gives the move from Rome to Milan without a year, and *Confessions* 6.11 has him in Milan "getting on to my thirtieth year", which fits 384 for a man born in November 354 but does not fix it. The essay skips his year in Rome; it does not misstate it.
- He went to hear Ambrose mostly to judge his eloquence. Library: *Confessions* 5.13 ("trying to discover whether his eloquence came up to the fame thereof"). Matches.
- Ambrose showed that passages crude on the surface carried a deeper sense, and often repeated Paul's line about the letter and the Spirit. Library: *Confessions* 6.4 ("I heard Ambrose, in his sermons to the people, oftentimes most diligently recommend this text as a rule,-'The letter killeth, but the Spirit giveth life'"). Matches.
- 2 Corinthians 3:6, "the letter kills, but the Spirit gives life". Matched the ESV copy word for word. Re-run 2026-10-27: matched; BSB confirms the sense.
- Ambrose received him kindly, like a father. Library: *Confessions* 5.13 ("That man of God received me like a father"). Matches.
- "It still took two more years" (384 to 386). Consistent with the sources in the closing run: *Confessions* 6.11 (in Milan, approaching thirty) and 8.7 (about twelve years after his nineteenth at the time of the garden). The year 384 itself is open (above).
- In the summer of 386, in a garden in Milan, he heard a child's voice chanting "take up and read" and read Romans 13:13-14. The scene: library, *Confessions* 8.12 ("the voice as of a boy or girl, I know not which ... chanting, and oft repeating, 'Take up and read; take up and read'"; the passage read is Romans 13:13-14). The season and year: verified in the closing run from the sources' sequence. *Confessions* 9.2 (library): when he resolved to give up teaching "there wanted but a few days unto the Vacation of the Vintage", and "this very summer" his lungs began to fail; 9.5: "The vintage vacation being ended", he gave notice to the citizens of Milan; 9.6: "when the time had arrived at which I was to give in my name, having left the country, we returned to Milan", with Alypius treading "the frozen soil of Italy" barefoot, so a winter came between; the baptism was at Easter 387 (next line). So the garden was the summer before, 386.
- Ambrose baptized him at Easter 387. Verified in the closing run. Possidius (Weiskotten), chapter 1: "with the coming of the holy days of Easter he received the water of baptism" (the same passage credits "the great and illustrious prelate Ambrose" with bringing him the Church's doctrine); Weiskotten's introduction: "baptized by Ambrose at Easter 387".
- He came back to his mother's faith, not the version he rejected (correction 8, reworded in the voice edit). Library: *On the Profit of Believing* 1.2.
- "More than a decade". Verified in the closing run. Library: *Confessions* 8.7, on the eve of his conversion: "of my years (perhaps twelve) had passed away since my nineteenth", the year he read the *Hortensius* (the file spells it "Hartensius").
- He preached the Bible for the rest of his life. Verified in the closing run. Possidius (Weiskotten), chapter 31: "Up to the very moment of his last illness he preached the Word of God in the church incessantly, vigorously and powerfully".
- A bishop Monica begged to argue her son out of his errors told her to leave him alone for a while and pray, and said the son of so many tears could not be lost. Unquoted paraphrase. Library: *Confessions* 3.12 ("But leave him alone for a time ... only pray God for him"; "it is not possible that the son of these tears should perish"). Matches as paraphrase.
## Luther (the last paragraph of the Augustine section)

- The Ninety-five Theses of 1517 aimed at the sale of indulgences. Verified in the closing run. Gutenberg #274: the heading gives the title "Disputation of Doctor Martin Luther on the Power and Efficacy of Indulgences" (in capitals) and the date "OCTOBER 31, 1517". The essay avoids the disputed door-posting detail.
- Indulgences had made release from the punishment for sin something a person could pay for. Verified as paraphrase in the closing run. Gutenberg #274, theses 21 ("those preachers of indulgences are in error, who say that by the pope's indulgences a man is freed from every penalty, and saved"), 24 ("that indiscriminate and highsounding promise of release from penalty") and 27 ("They preach man who say that so soon as the penny jingles into the money-box, the soul flies out [of purgatory]").
- Rome excommunicated him in 1521. Still open. Not checked (textbook).
- The Reformation split Western Christianity and wars came after it. Still open. Not checked (textbook).
- Luther kept the Apostles' and Nicene Creeds; the *Small Catechism* of 1529 teaches the Apostles' Creed article by article. Partly verified in the closing run. Gutenberg #273, the Smalcald Articles (Luther, 1537), Part I: the articles on the Trinity and on Christ, who "will come to judge the quick and the dead, etc.", are confessed "as the Creed of the Apostles, as well as that of St. Athanasius, and the Catechism in common use for children, teach", and "Concerning these articles there is no contention or dispute". The Apostles' Creed and a children's catechism are confirmed there. The Nicene Creed is not named in that text, and the *Small Catechism*'s 1529 date and its article-by-article treatment of the Creed are still open.
- "More than a thousand years later" (386 to 1517). Arithmetic on the two dates verified above.

## How People Rebuild

- 1 Thessalonians 5:20-21, "Do not despise prophecies, but test everything; hold fast what is good." Matched the ESV copy word for word. The setting (prophetic words in the gathering) follows 5:19-20 in the same copy. Re-run 2026-10-27: matched; BSB confirms the sense.
- James K. A. Smith, *You Are What You Love* (2016): we are formed less by ideas than by what we love, and habit trains our loves. Still open. Not checked (reference knowledge). The essay does not give the year.
- Desert saying attributed to Abba Moses: go and sit in your cell, and your cell will teach you everything. Still open; unquoted paraphrase, introduced as "attributed" (correction 9). Not checked (reference knowledge: the alphabetical collection, Moses 6). The library's *Sayings* (Alcock's Coptic collection) has Apa Moses sayings 184 and 185 but not this one; the closing run found no other collection of the sayings in the library (its Desert Fathers folder holds only metadata, and Cassian's *Conferences* of Abbot Moses are a different text).
- Luke 15: the younger son rehearses a speech ending "Treat me as one of your hired servants" (15:18-19); his spoken confession stops before that line (15:21); the father calls for the best robe, a ring and shoes (15:22). Checked against the ESV copy: matches.
- Luke 15:20, "But while he was still a long way off, his father saw him and felt compassion, and ran and embraced him and kissed him". Matched the ESV copy word for word. Re-run 2026-10-27: matched; BSB confirms the sense.
- Most of the world's Christians now live in Africa, Asia and Latin America. Still open. Not checked (reference knowledge; Pew Research Center's 2011 "Global Christianity" report put about six in ten in the global South). No figure is given in the essay.
- Most of them confess the faith of Nicaea. Corrected (correction 10). Interpretive.
- Augustine had Ambrose. From the Augustine section above.

## If You Are Hurting

- In the US, call or text 988 for the Suicide and Crisis Lifeline. Still open. Wording per BRIEF.md; not checked against the Lifeline's own site.
- Abuse by a pastor or church leader should be reported to the police or other civil authorities. Per BRIEF.md.
- Links: [Find Help](/help) (permitted by BRIEF.md) and [Doubt After Being Abused by a Church Leader](/writing/doubt-after-church-abuse) (slug found in docs/work/essays/link-targets.json).
- Matthew applies Isaiah's servant promise to Jesus. Checked against the ESV copy: Matthew 12:17-21 quotes Isaiah 42 ("Behold, my servant ... a bruised reed he will not break, and a smoldering wick he will not quench"). The essay quotes Isaiah's own ESV wording, with the Isaiah reference.
- Isaiah 42:3, "a bruised reed he will not break, and a faintly burning wick he will not quench". Matched the ESV copy word for word. Re-run 2026-10-27: matched; BSB confirms the sense.

## Where Deconstruction Can Lead

- Mark 9: the boy had suffered from childhood (9:21); the disciples were not able to help (9:18); Jesus cast out the spirit and lifted the boy up (9:25-27). Checked against the ESV copy: matches. "He healed the boy" summarizes 9:25-27.
- Mark 9:24, "Immediately the father of the child cried out and said, 'I believe; help my unbelief!'" Matched the ESV copy word for word. The exclamation point is inside verbatim Scripture. Re-run 2026-10-27: matched; BSB confirms the sense.

## Closing Texts

- 1 Thessalonians 5:21, "Test everything; hold fast what is good." Matched the ESV copy (the verse opens "but"; the essay drops it and capitalizes). Re-run 2026-10-27: matched.
- Isaiah 42:3, "A bruised reed he will not break, and a faintly burning wick he will not quench." Matched the ESV copy (first two clauses; capitalized). Re-run 2026-10-27: matched.
- Mark 9:24, "I believe; help my unbelief!" Matched the ESV copy (the father's words only). Re-run 2026-10-27: matched.

## Mechanics

- No em-dash (U+2014) in the essay: counted with grep, 0, after the voice edit and again after the closing run's three edits. The verse ranges use en-dashes; no en-dash or double hyphen stands in for an em-dash.
- Exclamation points: two, both inside verbatim Scripture (Mark 9:24 in the body and in Closing Texts).
- Stamp phrases from BRIEF.md and the CLAUDE.md forbidden-language list: searched after the voice edit and again after the closing run, none found.

## Old-essay facts the writer did not carry over (writer's record, kept for reference)

- Ezra 3:12-13 as "young men shouted": the text says "many shouted aloud for joy"; dropped.
- Luther posting the theses on the Wittenberg door and "ad fontes" as the Reformation's slogan: dropped.
- Nicaea bishops "still carrying the marks of Diocletian's persecution, a missing eye": dropped.
- The Jesus Seminar "colored beads": dropped.
- The prodigal "still rehearsing his doubts": the text has him rehearsing a confession; corrected by the writer.
- Pascal, Plantinga, Kierkegaard, Bonhoeffer and the plague-care claim from when-apologetics-isnt-enough: not used.
- Old-essay biography ("fifteen years" as pastor, pastoring someone "for a decade", the books on his shelf, the engineer and "a man told me once" anecdotes): dropped by the writer; none appears in the essay.
