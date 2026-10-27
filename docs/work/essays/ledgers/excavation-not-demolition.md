# Claims ledger: excavation-not-demolition

Essay: `docs/work/essays/excavation-not-demolition.md` ("Deconstructing Your Faith: What to Tear Down and What to Keep"). The writer's ledger of 2026-10-26 was rewritten by the verifier on 2026-10-27, after checks run late on 2026-10-26 and early on 2026-10-27. Every line below gives the result and the method actually used.

## Read this first: no web search was available for this check

The workflow's shared WebSearch budget (200 calls per turn, shared by every agent) was already used up when this check began. Three searches were attempted in this run (the Harris quotation, the RZIM report, *The Great Dechurching*), and all three came back "this turn's web search budget is used up." No search result was seen in this verification. Nothing was fetched from the web.

So this check rests on local sources and on the writer's own search record. Where the writer's ledger recorded a search check, that record is cited below as the writer's, with the sources the writer named; it was not repeated here. A later run with search should re-check those lines, and the Scripture should be rechecked with James's ESV API key once it exists.

## Methods, in the words used below

- **"ESV copy"**: compared with the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown", parsed by its author from javascripture's ESV JSON). This verifier used a clone already in the session scratchpad (`scratchpad/esv-mdbible`, commit fd66568 dated 2022-01-20), read the chapter files with `git show`, and ran a script on 2026-10-26 that compares each quotation with the verse text after normalizing case, punctuation and spacing. The copy does not say which ESV edition it is, prints LORD as "Lord", and drops inner quotation marks. This is not esv.org or the ESV API.
- **"Library"**: read on 2026-10-26 and 2026-10-27 in a clone of the public-domain HistoricalChristianFaith Writings-Database already in the scratchpad (`scratchpad/wdb/repo`, commit 328918a dated 2026-10-25), with `git show`. Files used: Augustine, *Confessions* Books 3, 4, 5, 6, 8, 9 (the Book 3 file's header names NPNF Series I, Vol. I); Augustine, *On the Profit of Believing*; Origen, *Against Celsus* Book 2 (no translator note in the file's opening lines; sibling ledgers identify the wording as the ANF translation); Eusebius, *Church History* Book 6; Socrates Scholasticus, *Ecclesiastical History* Book 1; "Council of Constantinople of 381/The Holy Creed"; "Council of Chalcedon of 451/The Definition of Faith"; and the library's *Sayings of the Desert Fathers* PDFs (Anthony Alcock's translation from the Coptic, per the folder's note), converted with pdftotext.
- **"Per the writer's ledger"**: the writer recorded a WebSearch check on 2026-10-26 against the sources named. This verifier did not see those results and did not repeat the search.
- **"Not checked (textbook)"** or **"Not checked (reference knowledge)"**: no source was opened or searched in this run. The verifier judged the claim standard reference knowledge. That judgment is not a check.
- **"Interpretive"**: an argument or characterization with no checkable fact beyond what is listed elsewhere.

## Corrections made in the essay

1. Opening, Harris quotation: "he wrote: "I have undergone a massive shift in regard to my faith in Jesus. The popular phrase for this is 'deconstruction,' the biblical phrase is 'falling away.'"" became "he wrote that his faith in Jesus had gone through a massive shift, and added: "The popular phrase for this is 'deconstruction,' the biblical phrase is 'falling away.'"" Reason: the writer's ledger says the first sentence's wording was from memory and the search summaries differed ("major/massive shift"); no search was possible here, so it is now unquoted paraphrase. The second sentence keeps its quotation marks on the writer's exact-phrase search.
2. Opening: "Harris had written *I Kissed Dating Goodbye* in 1997, in his early twenties" became "Harris was still a young man when *I Kissed Dating Goodbye* came out in 1997". Reason: "early twenties" rested on an unchecked birth year.
3. What Deserves to Come Down: "the sociologists Christian Smith and Melinda Lundquist Denton" became "the sociologist Christian Smith and Melinda Lundquist Denton". Reason: Denton's discipline was unverified in the writer's ledger and could not be checked here.
4. The Worry on the Other Side: "*Another Gospel?* (2020)" became "*Another Gospel?*". Reason: the year could not be checked in this run and does no work in the sentence.
5. Same section, Celsus: "a half-crazed woman and a few others caught up in the same delusion" became "a half-crazed woman and perhaps one other caught up in the same delusion". Reason: the library text of *Against Celsus* 2.55 reads "A half-frantic woman, as you state, and some other one, perhaps, of those who were engaged in the same system of delusion" (2.59 repeats "some one else"). One other, not a few.
6. What Lies Underneath, Arius: "some form of it returns in every century" became "some form of it keeps coming back". Reason: overclaim; it has not recurred in every century.
7. Augustine: "At nineteen he read a book of Cicero's" became "In his nineteenth year he read a book of Cicero's". Reason: *Confessions* 3.4 (library) says "in that my nineteenth year", which is not the same as age nineteen.
8. Augustine: "the faith as he had first heard it at nineteen" became "the faith as he had understood it when he walked away". Reason: he first heard the faith as a child, not at nineteen (*On the Profit of Believing* 1.2, library: "the religion which had been set in me from a child by my parents").
9. How People Rebuild: "told a restless brother to go and sit in his cell" became "told a brother to go and sit in his cell". Reason: "restless" is not in the saying as the writer's ledger gives it, and no text of the saying was available to check.
10. Same section: "what they confess is the creed of Nicaea" became "the faith most of them confess is the faith of Nicaea". Reason: overclaim; not every Christian body in the global South confesses the Nicene faith (Oneness Pentecostal churches reject it, for example: not checked, reference knowledge).

## Opening: Joshua Harris

- Harris announced on Instagram in late July 2019 that he no longer considered himself a Christian. Kept. Per the writer's ledger (Fox 5 Atlanta, Religion News Service, Crosswalk). The exact day (July 26 or 27) is not given in the essay.
- *I Kissed Dating Goodbye* came out in 1997. Kept. Not checked (reference knowledge); the writer's ledger search-checked the title but not the year.
- Harris was still a young man then. Kept as generalized (correction 2). Not checked.
- The book shaped how a generation of evangelical teenagers thought about dating, sex and marriage. Kept. Interpretive (general characterization).
- In 2018 he asked his publisher to stop printing the book and apologized to readers it had hurt. Kept. Per the writer's ledger (Christian Post, ChurchLeaders, Spiritual Sounding Board; coverage dated October 2018).
- The faith post came days after he and his wife announced their separation. Kept. Per the writer's ledger (FamilyLife dates the separation announcement July 17, 2019).
- Paraphrase: his faith in Jesus had gone through a massive shift. Unquoted paraphrase (correction 1). Not checked.
- Quotation: "The popular phrase for this is 'deconstruction,' the biblical phrase is 'falling away.'" Kept in quotation marks. Per the writer's ledger (exact-phrase search; Fox 5 Atlanta, Religion News). Not re-searched here; recheck first when search is available.

## The word "deconstruction"

- The word came from Jacques Derrida, a French philosopher, who used it in the late 1960s for a way of reading texts against their own assumptions. Kept. Not checked (textbook; *Of Grammatology*, 1967).

## Where It Usually Starts

- January 2002: the Boston Globe began reporting how the Archdiocese of Boston moved priests accused of abusing children from parish to parish. Kept. Not checked (textbook; the Spotlight series).
- May 2022: an independent investigation by Guidepost Solutions found that staff of the SBC Executive Committee kept a private list of ministers accused of sexual abuse for more than a decade, with no sign anyone acted to keep them out of positions of power in SBC churches. Kept. Per the writer's ledger (AP via Washington Times, UPI, WABE; report released May 22, 2022; "more than 10 years"; "no indication ... took any action to ensure that the accused ministers were no longer in positions of power at SBC churches").
- February 2021: an investigation commissioned by Ravi Zacharias's ministry found he had sexually abused women over many years under cover of the ministry. Kept. Not checked (reference knowledge: the Miller & Martin report released by RZIM in February 2021). The writer's ledger also left this unverified. Recheck the month and the finding's wording first when search is available.
- Zacharias as one of the best-known Christian apologists of his generation. Kept. Interpretive (characterization).
- The political fusion paragraph (much of American evangelicalism tied to one party over the last half century; a left-wing version exists; in the churches usually meant by "deconstruction" it has run mostly to the right). Kept. Interpretive; no figure is given.
- Purity culture's promised reward and prosperity preaching's promise of health and money. Kept. Interpretive (general characterizations, no named source).

## The Great Dechurching

- Jim Davis and Michael Graham, *The Great Dechurching* (2023). Kept. Per the writer's ledger (UnHerd, September 2023; Goodreads; Equip.org review).
- Surveys run by the political scientists Ryan Burge and Paul Djupe. Kept. Per the writer's ledger (review summary).
- About 40 million American adults who once attended at least monthly now go less than once a year. Kept. Per the writer's ledger (the authors' definition quoted in a review: "someone who used to go to church at least once per month but now goes less than once a year"). The writer's ledger does not say plainly that the 40 million figure itself appeared in a result; recheck when search is available.
- Most left for ordinary reasons (moving, family change, the habit lapsing). Kept as unquoted paraphrase. Per the writer's ledger (Michael Graham quoted via ChurchLeaders/WBUR: "Most people have left for really pedestrian reasons").
- The two portraits that follow (the teenager who read Joshua, the woman who could not shrug) are general types, not reported people. Interpretive.

## Moralistic therapeutic deism

- *Soul Searching*, 2005, by Christian Smith and Melinda Lundquist Denton. Kept. Per the writer's ledger (America magazine, Christian Century, The Revealer).
- Smith is a sociologist. Kept. Not checked (textbook). Denton's discipline is no longer stated (correction 3).
- A national survey of more than three thousand teenagers and long interviews with more than two hundred. Kept. Per the writer's ledger (review summary: 3,290 surveyed, 267 interviewed).
- They named the faith moralistic therapeutic deism. Kept. Per the writer's ledger.
- The five-point creed is unquoted paraphrase ("as they summarized it, runs roughly like this"). Kept. Not checked (memory of the book); the writer's ledger could not confirm the book's wording either, which is why it is paraphrase.
- They found it among Catholic, mainline Protestant and evangelical teenagers alike and argued the teenagers largely learned it from adults. Kept. Not checked (reference knowledge of the book's argument).

## Jeremiah

- Jeremiah called in the thirteenth year of King Josiah (1:2), son of one of the priests in Anathoth (1:1), a youth (1:6-7). Paraphrase checked against the ESV copy: matches.
- Jeremiah 1:10, "See, I have set you this day over nations and over kingdoms, to pluck up and to break down, to destroy and to overthrow, to build and to plant." Matched the ESV copy word for word.
- "Four of the six verbs are about tearing down." Counted from the verse in the ESV copy: pluck up, break down, destroy, overthrow; build, plant. Correct.
- God sent Jeremiah to the gate of the temple to speak to those entering to worship (7:2). Paraphrase checked against the ESV copy: matches.
- Jeremiah 7:4, "Do not trust in these deceptive words: 'This is the temple of the LORD, the temple of the LORD, the temple of the LORD'". Matched the ESV copy word for word (the copy prints "Lord" and drops the inner quotation marks; the essay ends the sentence outside the quotation).
- Jeremiah named theft, murder, adultery and offerings to Baal. Paraphrase of 7:9 checked against the ESV copy ("steal, murder, commit adultery, swear falsely, make offerings to Baal"): matches.
- In the temple court he said the house could fall; the priests and the prophets seized him and said he deserved to die (26:8-11). Checked against the ESV copy (26:2 "court of the LORD's house"; 26:6 and 26:9 "like Shiloh"; 26:8 "laid hold of him, saying, 'You shall die!'"; 26:11 "This man deserves the sentence of death"): matches.
- Jeremiah 32: the Babylonian siege and the court of the guard (32:2); Hanamel, son of his uncle Shallum, his cousin (32:7-8); the field at Anathoth (32:9); deed signed before witnesses (32:10); documents put "in an earthenware vessel, that they may last for a long time" (32:14). Paraphrase checked against the ESV copy: matches ("clay jar" for "earthenware vessel").
- Jeremiah 32:15, "Houses and fields and vineyards shall again be bought in this land". Matched the ESV copy word for word (the verse's opening, "For thus says the LORD of hosts, the God of Israel:", is omitted).
- "Late in Jeremiah's ministry" and "decades tearing things down". From 1:2 (Josiah's thirteenth year) and 32:1 (Zedekiah's tenth year) in the ESV copy; about forty years by the standard dates (627 to 587 BC). Dates not checked (textbook).

## The Worry on the Other Side

- Hebrews 3:12, "Take care, brothers, lest there be in any of you an evil, unbelieving heart, leading you to fall away from the living God." Matched the ESV copy word for word.
- Luke 8:13, "believe for a while, and in time of testing fall away", for people with no root. Matched the ESV copy word for word. (It is from Jesus' explanation of the parable of the sower, which the essay's wording allows.)
- "Pastors can tell you about people who..." A general statement, not a reported conversation. Interpretive.
- Alisa Childers was a singer with the Christian pop group ZOEgirl. Kept. Not checked (reference knowledge).
- *Another Gospel?* tells how a class at her own church left her doubting and how she worked her way back, and argues that much progressive Christianity keeps the vocabulary while changing the meaning. Kept. Not checked (reference knowledge of the book). Year removed (correction 4). The cross and resurrection examples that follow are the essay's own, not attributed to her.
- The rebuilt political Christianity paragraph. Interpretive.

## Biography and Celsus

- "I came to faith as an adult, from atheism." Confirmed in docs/work/NOTES.md. No other biography is used in the essay.
- Late in the second century Celsus wrote that belief in the resurrection rested on the word of a half-crazed woman and perhaps one other caught up in the same delusion. Unquoted paraphrase, corrected (correction 5). Library: *Against Celsus* 2.55 ("A half-frantic woman, as you state, and some other one, perhaps, of those who were engaged in the same system of delusion") and 2.59. In the text Celsus speaks through an imagined Jewish critic. The date of Celsus (about 175-180) is not checked (textbook).
- In the middle of the third century Origen answered him point by point. Library: Eusebius, *Church History* 6.36, says Origen wrote the eight books against Celsus's *True Discourse* when he was "over sixty years old", in the reign of Philip (late 240s); *Against Celsus* quotes and answers Celsus passage by passage.

## What Lies Underneath

- 1 Corinthians was written to Corinth in the mid-50s, before any of the Gospels. Kept. Not checked (textbook).
- The tradition in 1 Corinthians 15:3-5 is one of the oldest Christian confessions we have, already fixed before Paul wrote it down. Kept. Not checked (standard scholarly view); "received" is in the verse.
- 1 Corinthians 15:3-5, "For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures, and that he appeared to Cephas, then to the twelve." Matched the ESV copy word for word.
- 1 Corinthians 15:17, "And if Christ has not been raised, your faith is futile and you are still in your sins". Matched the ESV copy word for word.
- N. T. Wright, *The Resurrection of the Son of God* (2003), argues that the empty tomb and the appearances best explain how the earliest church began. Kept. Not checked (reference knowledge).
- Around 318 Arius, a presbyter of Alexandria, began teaching that the Son was a created being. Kept. Not checked (textbook; usually dated 318 or 319).
- The slogan "there was a time when he was not", condemned by name in 325. Library: the creed of 325 as given in Socrates, *Ecclesiastical History* 1.8, anathematizes "those who say 'There was a time when he was not'". The essay gives the slogan without quotation marks.
- Arianism as a reverent position meant to protect the oneness of God, which keeps coming back. Interpretive; corrected (correction 6).
- The creed of 325 confessed the Son "begotten, not made," of one being (homoousios) with the Father. Library: Socrates 1.8 ("begotten, not made, consubstantial with the Father"), with Eusebius's letter there discussing "homoousios". "Of one being" is the essay's rendering, not quoted.
- The creed was expanded at Constantinople in 381 into the form most churches still say. Year and council not checked (textbook). The library's file of the creed of 381 was read for the next lines.
- Chalcedon, 451: one person in two natures, truly God and truly man, without confusion, without change, without division, without separation. Library: the Definition of Faith file ("in two natures, unconfusedly, immutably, indivisibly, inseparably"). The essay's four phrases are the common modern rendering, given without quotation marks. The year is not checked (textbook).
- The creed says God became flesh, was crucified under Pontius Pilate, rose on the third day, and will come again to judge the living and the dead. Paraphrase checked against the library's creed of 381 ("was incarnate ... and was made man, and was crucified also for us under Pontius Pilate ... the third day he rose again ... he shall come again with glory to judge both the quick and the dead"): matches.
- The second-order list (baptism, the millennium, women as pastors, Genesis 1) follows the classification in CLAUDE.md; no position is asserted.
- Link: [Did the Resurrection Actually Happen?](/writing/did-the-resurrection-happen) and [What Was Decided at the Council of Nicaea?](/writing/the-council-of-nicaea-what-was-decided-in-325). Both slugs found in docs/work/essays/link-targets.json.

## Augustine

- Born 354 in Thagaste, in what is now Algeria, to a Christian mother named Monica. Not checked (textbook). The library's *Confessions* Book 9 summary names his mother Monica.
- In his nineteenth year he read a book of Cicero's that set him on fire for philosophy. Corrected (correction 7). Library: *Confessions* 3.4 ("a certain book of Cicero ... called Hortensius"; "in that my nineteenth year"; "In Greek the love of wisdom is called 'philosophy,' with which that book inflamed me").
- He found the Bible crude beside Cicero. Library: *Confessions* 3.5 ("they appeared to me to be unworthy to be compared with the dignity of Tully"): matches as paraphrase.
- Nine years among the Manichees. Library: *Confessions* 4.1 ("During this space of nine years, then, from my nineteenth to my eight and twentieth year").
- The Manichees promised a religion of pure reason and mocked the Old Testament. Library: *On the Profit of Believing* 1.2 ("by pure and simple reason, they would lead within to God"); *Confessions* 3.7 (their questions about the patriarchs who "had many wives at once and did kill men, and sacrificed living creatures"). Matches as paraphrase.
- Faustus came to Carthage and could not answer his questions. Library: *Confessions* 5.3 (Faustus comes to Carthage) and 5.7 ("he was aware that he had no knowledge of these things, and was not ashamed to confess it"; "he was ignorant of those arts in which I had believed him to excel"). Matches.
- He drifted toward the skeptics, who held that nothing could be known for certain. Library: *Confessions* 5.10 (the "Academics ... held that we ought to doubt everything, and ruled that man had not the power of comprehending any truth") and 5.14.
- 384: moved to Milan to teach rhetoric. The move and the post: library, *Confessions* 5.13 (sent as teacher of rhetoric; "to Milan I came, unto Ambrose the bishop"). The year is not checked (textbook). The essay skips his year in Rome; it does not misstate it.
- He went to hear Ambrose mostly to judge his eloquence. Library: *Confessions* 5.13 ("trying to discover whether his eloquence came up to the fame thereof"). Matches.
- Ambrose showed that passages crude on the surface carried a deeper sense, and often repeated Paul's line about the letter and the Spirit. Library: *Confessions* 6.4 ("I heard Ambrose, in his sermons to the people, oftentimes most diligently recommend this text as a rule,-'The letter killeth, but the Spirit giveth life;'" and "drawing aside the mystic veil, he spiritually laid open that which, accepted according to the 'letter,' seemed to teach perverse doctrines"). Matches.
- 2 Corinthians 3:6, "the letter kills, but the Spirit gives life". Matched the ESV copy word for word.
- Ambrose received him kindly, like a father. Library: *Confessions* 5.13 ("That man of God received me like a father"). Matches.
- Summer 386, a garden in Milan, a child's voice chanting "take up and read", Romans 13:13-14. Library: *Confessions* 8.12 ("the voice as of a boy or girl, I know not which ... chanting, and oft repeating, 'Take up and read; take up and read'"; the passage read is Romans 13:13-14, "Not in rioting and drunkenness ... but put ye on the Lord Jesus Christ"). The season and year are not checked (textbook).
- Ambrose baptized him at Easter 387. Not checked (textbook). The library's *Confessions* 9.6 records the baptism at Milan without naming the day.
- He came back to his mother's faith, not the version he rejected; corrected (correction 8). Library: *On the Profit of Believing* 1.2.
- "More than a decade" (from the Hortensius, about 373, to 386). Arithmetic from the above; the dates are textbook.
- He preached the Bible for the rest of his life. Not checked (textbook; bishop of Hippo).
- A bishop Monica begged to argue her son out of his errors told her to leave him alone for a while and pray, and said the son of so many tears could not be lost. Unquoted paraphrase. Library: *Confessions* 3.12 ("But leave him alone for a time ... only pray God for him"; "it is not possible that the son of these tears should perish"; she was "shedding copious tears"). Matches as paraphrase.

## Luther

- The Ninety-five Theses, 1517, aimed at the sale of indulgences. Not checked (textbook). The essay avoids the disputed door-posting detail.
- Indulgences described as making release from the punishment for sin something a person could pay for. Kept. Interpretive paraphrase, consistent with the standard account (indulgences remitted temporal punishment, not guilt). Not checked.
- Rome excommunicated him in 1521. Not checked (textbook).
- The Reformation split Western Christianity and wars came after it. Not checked (textbook).
- Luther kept the Apostles' and Nicene Creeds; the *Small Catechism* of 1529 teaches the Apostles' Creed article by article. Not checked (textbook).
- "More than a thousand years later" (386 to 1517). Arithmetic.

## How People Rebuild

- 1 Thessalonians 5:20-21, "Do not despise prophecies, but test everything; hold fast what is good." Matched the ESV copy word for word. The setting (prophetic words in the gathering) follows 5:19-20 in the same copy.
- James K. A. Smith, *You Are What You Love* (2016): we are formed less by ideas than by what we love, and habit trains our loves. Kept. Not checked (reference knowledge).
- Desert saying attributed to Abba Moses: go and sit in your cell, and your cell will teach you everything. Unquoted paraphrase; "restless" removed (correction 9). Not checked (reference knowledge: the alphabetical collection, Moses 6). The library's *Sayings* (Alcock's Coptic collection) was searched with pdftotext and grep; it has Apa Moses sayings 184 and 185 but not this one.
- Luke 15: the younger son rehearses a speech ending "Treat me as one of your hired servants" (15:18-19); his spoken confession stops before that line (15:21); the father calls for the best robe, a ring and shoes (15:22). Checked against the ESV copy: matches.
- Luke 15:20, "But while he was still a long way off, his father saw him and felt compassion, and ran and embraced him and kissed him". Matched the ESV copy word for word.
- Most of the world's Christians now live in Africa, Asia and Latin America. Kept. Not checked (reference knowledge; Pew Research Center's 2011 "Global Christianity" report put about six in ten in the global South). No figure is given in the essay.
- Most of them confess the faith of Nicaea. Corrected (correction 10). Interpretive.
- Augustine had Ambrose. From the Augustine section above.

## If the Doubt Has Turned Dark

- In the US, call or text 988 for the Suicide and Crisis Lifeline. Wording per BRIEF.md; not checked against the Lifeline's site in this run.
- Abuse by a pastor or church leader should be reported to the police or other civil authorities. Per BRIEF.md.
- Link: [Find Help](/help) (permitted by BRIEF.md) and [Doubt After Being Abused by a Church Leader](/writing/doubt-after-church-abuse) (slug found in docs/work/essays/link-targets.json).
- Matthew applies Isaiah's servant promise to Jesus. Checked against the ESV copy: Matthew 12:17-21 quotes Isaiah 42 ("Behold, my servant ... a bruised reed he will not break, and a smoldering wick he will not quench"). The essay quotes Isaiah's own ESV wording, with the Isaiah reference.
- Isaiah 42:3, "a bruised reed he will not break, and a faintly burning wick he will not quench". Matched the ESV copy word for word.

## What Are You Digging Toward?

- Mark 9: the boy had suffered from childhood (9:21); the disciples were not able to help (9:18); Jesus cast out the spirit and lifted the boy up (9:25-27). Checked against the ESV copy: matches. "He healed the boy" summarizes 9:25-27.
- Mark 9:24, "Immediately the father of the child cried out and said, 'I believe; help my unbelief!'" Matched the ESV copy word for word. The exclamation point is inside verbatim Scripture.

## Closing Texts

- 1 Thessalonians 5:21, "Test everything; hold fast what is good." Matched the ESV copy (the verse opens "but"; the essay drops it and capitalizes).
- Isaiah 42:3, "A bruised reed he will not break, and a faintly burning wick he will not quench." Matched the ESV copy (first two clauses; capitalized).
- Mark 9:24, "I believe; help my unbelief!" Matched the ESV copy (the father's words only).

## Mechanics checked in this run

- No em-dash (U+2014) in the essay: counted with grep, 0. The verse ranges use en-dashes.
- Exclamation points: two, both inside verbatim Scripture (Mark 9:24 in the body and in Closing Texts).

## Old-essay facts the writer did not carry over (writer's record, kept for reference)

- Ezra 3:12-13 as "young men shouted": the text says "many shouted aloud for joy"; dropped.
- Luther posting the theses on the Wittenberg door and "ad fontes" as the Reformation's slogan: dropped.
- Nicaea bishops "still carrying the marks of Diocletian's persecution, a missing eye": dropped.
- The Jesus Seminar "colored beads": dropped.
- The prodigal "still rehearsing his doubts": the text has him rehearsing a confession; corrected by the writer.
- Pascal, Plantinga, Kierkegaard, Bonhoeffer and the plague-care claim from when-apologetics-isnt-enough: not used.
- Old-essay biography ("fifteen years" as pastor, pastoring someone "for a decade", the books on his shelf, the engineer and "a man told me once" anecdotes): dropped by the writer; none appears in the essay.
