# Claims ledger: why-trust-the-bible

Essay: `docs/work/essays/why-trust-the-bible.md` ("Can You Trust the Bible?"). The writer drafted a ledger on 2026-10-26. The verifier rewrote it on 2026-10-26 after checking the essay. Every line below records the result and the method this verification actually used.

## Read this first: no web search was available for this check

The workflow's shared web-search budget was already used up when this check began. Three WebSearch calls were tried (the Cullen Story line, the "floodgates" line and the "more variations" line), and each came back "this turn's web search budget is used up." This check saw no search result. It opened no page on esv.org, Wikipedia or any other website; a direct request to en.wikipedia.org from the sandbox got no response. Every check below was made against texts reachable through GitHub, or against files already in this repository or the session scratchpad.

The writer's ledger reported search results for several claims (Wikipedia, UNC Endeavors, Bible Archaeology Review, Christianity Today and others, all seen by the writer on 2026-10-26). This check did not see those results. Where they bear on a claim, they are noted as "writer reported", and nothing here rests on them.

The methods actually used, and what the words below mean:

- **"ESV copy"**: compared with the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown"). The clone was already in the session scratchpad (`scratchpad/esv-mdbible`, commit fd66568, dated 2022-01-20), made by an earlier run. This check read its chapter files with `git show` on 2026-10-26. A script (`scratchpad/trustcheck/q.py`) compared each quotation with the verse text, keeping case and punctuation. It normalized only curly quotes, the copy's stray spaces before punctuation and its spacing around dashes. The copy leaves out quotation marks inside verses and prints LORD as "Lord". It does not say which ESV edition it is. It is not esv.org or the ESV API, so recheck with James's API key once that exists.
- **"KJV copy"**: compared with `scratchpad/kjv/en_kjv.json` (from the public GitHub repository thiagobodruk/bible), already in the scratchpad. This check read it with Python on 2026-10-26.
- **"Patristic library"**: read in the public GitHub repository HistoricalChristianFaith/Writings-Database. The clone was already in the scratchpad (`scratchpad/wdb`, commit 328918a, dated 2026-10-25). This check read the files with `git show` on 2026-10-26. The files used were Irenaeus, *Against Heresies* Book 3; Athanasius, "From Letter 39 (for 367)"; Augustine, *The Harmony of the Gospels* Book 1; and Eusebius, *Church History* Book 3. Going by their wording and translator's notes (McGiffert's numbered notes in Eusebius; "Augustin" and the "-Tr." notes in Augustine), these are the ANF/NPNF translations. They are not the library's ChatGPT-translated Migne material.
- **"Creeds.json"**: read in the public GitHub repository NonlinearFruit/Creeds.json. This check cloned it on 2026-10-26 (`--depth 1 --filter=blob:none --no-checkout`, commit 2ae21a4) and read `creeds/chicago_statement_on_biblical_inerrancy.json` with `git show`. The file's metadata gives the year as 1978, the author as the International Council on Biblical Inerrancy, and its source as the Dallas Theological Seminary library PDF (library.dts.edu, ICBI_1.pdf). That PDF was not opened.
- **"Site Greek data"**: read in this repository's `client/public/bible/ch/mark/2.json` and `client/public/bible/ch/mark/12.json` (STEPBible tagged Greek).
- **"Live chapter copy"**: read in `scratchpad/live-posts.json`, a copy of the site's `posts.getBySlug` API responses that an earlier run saved on 2026-10-26. This check did not fetch it.
- **"Link list"**: checked against `docs/work/essays/link-targets.json` and the links BRIEF.md allows.
- **"Mechanical scan"**: grep of the essay for U+2014 em-dashes, exclamation points, the CLAUDE.md forbidden words and phrases, and the BRIEF.md stamps. After the edits: no em-dashes, no exclamation points, no forbidden words, no stamps. Length is about 3,570 words.
- **"Not checked (textbook)"**: no source was opened or searched. The verifier judged the claim to be standard reference knowledge. That judgment is not a check.

## Corrections made in the essay

1. Opening, Cullen Story's comment: no reachable source carries *Misquoting Jesus*, so the quoted line is now a marked paraphrase without quotation marks: "His professor, Cullen Story, wrote one line at the end. Maybe, he suggested, Mark had just made a mistake."
2. Opening, Ehrman's "floodgates" sentence: also unverifiable, so it is now a paraphrase: "Once he admitted that much, he wrote, the floodgates opened."
3. Do We Have What They Wrote?, Ehrman's line on variants: also unverifiable, so it is now a paraphrase: "One of Ehrman's most quoted lines is that our manuscripts contain more variations than there are words in the New Testament."
4. Do We Have What They Wrote?, Ehrman on Metzger: also unverifiable, so it is now a paraphrase: "he said his position did not stand at odds with that of his old teacher, Bruce Metzger, who held that the essential Christian beliefs are not affected by the variants in the New Testament manuscripts."
5. Do We Have What They Wrote?, P52: "The oldest surviving piece of the New Testament is a scrap of John's Gospel" became "is usually thought to be a scrap of John's Gospel," and "usually dated" became "commonly dated." The flat claim overreached, since the same paragraph grants that the fragment's date is disputed and other early papyri compete for the title.
6. What About the Contradictions?, Mark 12:26: "a few chapters later" became "later in his Gospel." Mark 2:26 and Mark 12:26 are ten chapters apart.

Corrections 1 to 4 were made because the quotations could not be checked, not because a check failed. Corrections 5 and 6 fix wording that claimed more than the facts allow. No other claim was found to be wrong.

## Original wording, for restoring

When *Misquoting Jesus* (HarperSanFrancisco, 2005) or a search quoting it is available, check these. If they match exactly, restore them with their quotation marks. The writer reported the first three as quoted in secondary sources, and the fourth as quoted on Wikipedia's "Misquoting Jesus" page and elsewhere. The verifier recalls the first three from the book's introduction and its chapter on the variants, and the fourth from the question-and-answer section of the paperback edition.

> His professor, Cullen Story, wrote one line at the end: "Maybe Mark just made a mistake."

> "Once I made that admission," he wrote, "the floodgates opened."

> One of Ehrman's most quoted lines is that "there are more variations among our manuscripts than there are words in the New Testament."

> In a question-and-answer appendix to *Misquoting Jesus*, he said his position did not stand at odds with that of his old teacher, Bruce Metzger, that "essential Christian beliefs are not affected by textual variants in the manuscript tradition of the New Testament."

The writer's ledger left these out of the replaced essays, unverified: the "99.5 percent" figure attributed to Metzger (commonly misattributed), Homer manuscript counts, "more than 700 languages," Bauckham's name-frequency argument, Luke's titles "flagged as errors" by earlier critics, and a first-person story of the writer's unbelief (biography beyond NOTES.md). They stay out.

## Opening: Bart Ehrman and Mark 2:26

- As a young student at Princeton Theological Seminary, Ehrman wrote a paper on Mark 2:26. Not checked (reference knowledge of the story Ehrman tells in *Misquoting Jesus*; writer reported UNC Endeavors and Bible Archaeology Review).
- He had come from Moody Bible Institute and Wheaton College. Not checked (textbook biography; writer reported Wikipedia). No years are given in the essay.
- He believed, as he had been taught, that the Bible was without error in every detail. Paraphrase of his own account, not quoted. Not checked (reference knowledge).
- Mark 2:26, Jesus says David entered the house of God and ate the bread of the Presence "in the time of Abiathar the high priest." ESV copy: the quoted phrase matched; the paraphrase matches the verse.
- 1 Samuel 21 tells the story, and the priest who gave David the bread was Ahimelech. ESV copy: 1 Samuel 21:1 ("Then David came to Nob to Ahimelech the priest") and 21:6 ("So the priest gave him the holy bread"). Confirmed.
- Ahimelech was Abiathar's father. ESV copy: 1 Samuel 22:20 ("one of the sons of Ahimelech the son of Ahitub, named Abiathar"). Confirmed.
- Ehrman built a long and careful argument that Mark didn't mean what he seemed to say. Paraphrase. Not checked (reference knowledge: Ehrman describes his paper's argument as long and complicated).
- His professor, Cullen Story, wrote one line at the end suggesting Mark had made a mistake. Name and substance: not checked (reference knowledge). The quotation was turned into paraphrase (correction 1).
- Once he admitted that much, the floodgates opened. Paraphrase, attributed (correction 2). Not checked.
- *Misquoting Jesus*, his 2005 book on how the New Testament was copied, became a surprise bestseller. Not checked (textbook: HarperSanFrancisco, November 2005, a New York Times bestseller; writer reported Wikipedia). "Surprise" is a common characterization.
- He became one of the best-known New Testament scholars in the country, and eventually an agnostic. Not checked (textbook).
- What finally ended his faith was suffering, not the manuscripts. Paraphrase, not quoted. Not checked (reference knowledge: Ehrman says so in *God's Problem*, 2008; writer reported Christianity Today, 2008).
- Many of his readers closed his book convinced the Bible couldn't be trusted. General characterization; no figure. Not checked.
- *The Orthodox Corruption of Scripture* argued that scribes sometimes altered a passage to make it say more plainly what they already believed about Christ. Not checked (textbook: Oxford University Press, 1993, subtitled *The Effect of Early Christological Controversies on the Text of the New Testament*). No year is given in the essay.

## Do We Have What They Wrote?

- Ehrman's line that our manuscripts contain more variations than there are words in the New Testament. Paraphrase (correction 3). Not checked. That the claim itself is true (common estimates of hundreds of thousands of variants against about 138,000 words of Greek text) is also not checked (textbook).
- More than five thousand Greek manuscripts of the New Testament, whole or in part. Not checked (textbook: the INTF register lists about 5,800; writer reported Daniel Wallace and INTF figures).
- Thousands more in early translations such as Latin, Syriac and Coptic. Not checked (textbook; stated generally, no figure).
- Most variants are spelling, word order, a skipped line or a slip of the pen, and many don't show in English. Not checked (textbook consensus).
- The first six books of Tacitus's *Annals* survive in a single manuscript copied in the ninth century. Not checked (textbook: the first Medicean manuscript, Florence, Laurentian Library Plut. 68.1; writer reported Wikipedia and Roger Pearse's "Tacitus and his manuscripts").
- They are one of our main sources for the reign of Tiberius. Not checked (textbook: Books 1 to 6 cover AD 14 to 37).
- "Some seven hundred years after Tacitus wrote." Arithmetic only: *Annals* written about AD 115 to 120, manuscript about AD 850, so roughly 730 years. Dates not checked (textbook).
- The papyrus usually thought to be the oldest surviving piece of the New Testament is a scrap of John's Gospel about the size of a credit card, in Manchester, commonly dated to the second century, though some papyrologists argue it could be later. Wording corrected (correction 5). Not checked (textbook: P52, John Rylands Library, John 18, about 8.9 by 6 cm; Brent Nongbri's 2005 article argued for a wider date range; writer reported Nongbri's articles).
- Larger papyri survive from the late second and third centuries. Not checked (textbook: P46, P66, P75).
- Codex Sinaiticus, the oldest complete New Testament, was copied in the fourth century. Not checked (textbook; writer reported Leipzig University Library).
- The early papyri and the fourth-century codices carry substantially the same text. General statement. Not checked (textbook: for example, P75's close agreement with Codex Vaticanus).
- Modern Bibles note that some of the earliest manuscripts end Mark at 16:8. Paraphrase of the note, not quoted. ESV copy: Mark 16:9 opens with the double bracket "[[" that marks 16:9 to 20; the copy does not carry the note's wording. Note wording not checked (reference knowledge: the ESV note reads that some of the earliest manuscripts do not include 16:9 to 20).
- John 8, the woman caught in adultery, set off in brackets with a note that the earliest manuscripts don't include it. Paraphrase, not quoted. ESV copy: John 7:53 opens with "[[". Note wording not checked.
- KJV 1 John 5:7: "For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one." KJV copy: matched word for word and point for point. The translation is named because the KJV wording is the point. ESV copy, for contrast: 1 John 5:7 reads "For there are three that testify," without the Comma.
- It is the most explicit statement of the Trinity in that Bible. Characterization. Not checked.
- The Comma came into the text through Latin copies and appears in only a handful of late Greek manuscripts. Not checked (textbook: Metzger's *Textual Commentary* counts eight late manuscripts, four with the words in the margin; writer reported a summary of Metzger).
- Erasmus left it out of his printed Greek New Testament in 1516 and added it in his third edition in 1522; from there it passed into the King James. Not checked (textbook; writer reported H. J. de Jonge, "Erasmus and the Comma Johanneum"). The essay does not repeat the disputed story of Erasmus's promise.
- The Greek theologians of the fourth-century Trinitarian debates never quoted it. Paraphrase, not quoted. Not checked (textbook: Metzger's *Textual Commentary*, as the writer reported it).
- Most modern translations, made by scholars who confess the Trinity, have taken it out. ESV copy confirms that the ESV omits it. Other translations not checked (textbook: NIV, CSB, NRSV and NASB omit it; NKJV keeps it).

## Dead Sea Scrolls

- The Leningrad Codex, the oldest complete manuscript of the Hebrew Bible, was copied in 1008. Not checked (textbook: its colophon gives 1008 or 1009; writer reported Wikipedia).
- Beginning in 1947, Bedouin shepherds and later archaeologists brought hundreds of scrolls out of caves near Qumran above the Dead Sea. Not checked (textbook: the first cave was found in the winter of 1946 to 1947; "hundreds" is deliberately general).
- A complete scroll of Isaiah, usually dated to the second century before Christ. Not checked (textbook: 1QIsa-a, commonly dated about 125 BC; writer reported Wikipedia).
- About a thousand years older than any Hebrew copy of Isaiah known before. Not checked (textbook: the usual round figure for the gap between the scroll and the medieval Masoretic manuscripts; writer reported Wikipedia).
- Most of its differences from the later text are spelling and small points of grammar. Not checked (textbook).
- Some books, Jeremiah among them, circulated in more than one form before the text settled. Not checked (textbook: the Qumran Jeremiah fragments that agree with the shorter Septuagint form).
- Isaiah 53 is in the scroll. Not checked (textbook: the scroll contains all 66 chapters).

## Ehrman and Metzger

- Ehrman, in a question-and-answer appendix to *Misquoting Jesus*, said his position did not stand at odds with Metzger's that the essential Christian beliefs are not affected by the variants. Paraphrase (correction 4). Not checked, and neither is the appendix's location in later paperback editions.
- Metzger was Ehrman's old teacher. Not checked (textbook: he supervised Ehrman's Princeton PhD).
- Metzger was an ordained Presbyterian minister. Not checked (textbook; writer reported his 2007 obituaries).

## Who Chose the Books?

- The Council of Nicaea in 325 argued about whether the Son is fully God and drew up no list of books. Not checked (textbook).
- Around 180, Irenaeus, bishop of Lyon, argued there are four Gospels, no more and no fewer, and treated it as settled. Paraphrase, not quoted. Patristic library, *Against Heresies* 3.11.8 (ANF): "It is not possible that the Gospels can be either more or fewer in number than they are," argued from the four zones of the world and the four winds. Confirmed. The date about 180 and the see of Lyon: not checked (textbook).
- Paul's letters were being read as Scripture even earlier. General statement, supported in the essay by 2 Peter 3:16. Not checked beyond that verse.
- 2 Peter 3:16, "the other Scriptures" and "there are some things in them that are hard to understand." ESV copy: matched. The ESV begins that sentence "There are"; the essay lowercases "there" inside its own sentence.
- Athanasius of Alexandria's letter for Easter in 367 is the first list we know of that names exactly the twenty-seven books. Patristic library, "From Letter 39 (for 367)" (NPNF), section 5: four Gospels, Acts, seven catholic epistles, fourteen epistles of Paul (Hebrews among them) and Revelation, which makes twenty-seven. The heading calls it the thirty-ninth letter "on the Paschal festival." Confirmed. "First we know of" is the common scholarly framing; not checked.
- Hebrews, James and Revelation were questioned for a long time in some places, and the church's own historians preserved the arguments. Patristic library, Eusebius, *Church History* (NPNF), 3.3.5: "some have rejected the Epistle to the Hebrews, saying that it is disputed by the church of Rome"; 3.25.3: James "among the disputed writings, which are nevertheless recognized by many"; 3.25.2 and 3.25.4: the Apocalypse of John placed among the accepted books "if it really seem proper," while "some, as I said, reject" it. Confirmed.
- The councils that came later mostly put in writing what the churches had already been reading. General statement (Hippo 393 and Carthage 397 not named). Not checked (textbook).
- Link to /writing/who-decided-what-books-are-in-the-bible. Link list: present in link-targets.json.

## Did It Happen?

- Luke 1:1–4 (block quotation, "Inasmuch as many have undertaken ... the things you have been taught."). ESV copy: matched word for word and point for point.
- Luke 3:1–2: John began preaching in the fifteenth year of Tiberius, when Pontius Pilate governed Judea and Annas and Caiaphas held the high priesthood. Paraphrase, not quoted. ESV copy: 3:1 to 2 name the fifteenth year of Tiberius Caesar, Pilate as governor of Judea, and the high priesthood of Annas and Caiaphas, and 3:3 has John "proclaiming a baptism of repentance." Confirmed.
- In 1961, archaeologists at Caesarea Maritima, the seat of the Roman governors, found a limestone block reused in a theater, inscribed with Pilate's name and his title, prefect of Judea. Not checked (textbook: the Italian excavation of 1961; writer reported several archaeology sites).
- An inscription from Delphi places Gallio's term as proconsul of Achaia around AD 51 to 52, one of the firmest dates in Paul's life. Not checked (textbook; writer reported several sources).
- Paul's hearing before Gallio in Corinth (Acts 18:12). ESV copy: Acts 18:12, "when Gallio was proconsul of Achaia ... brought him before the tribunal"; Acts 18:1 places Paul in Corinth. Confirmed.
- In 1993, excavators at Tel Dan in northern Israel found part of a ninth-century BC Aramaic inscription in which a foreign king boasts of a victory over the "House of David"; as most scholars read it, the earliest mention of David's dynasty outside the Bible. Not checked (textbook: the first fragment was found in 1993 by Avraham Biran's team; the phrase is the standard rendering of *bytdwd*; the hedge "as most scholars read it" stays because a minority reads the phrase differently).
- The archaeology of the exodus and the conquest is argued over intensely, and believing scholars disagree among themselves. General statement. Not checked (textbook).
- Paul wrote to the Corinthians in the mid-50s. Not checked (textbook: commonly dated about 53 to 55).
- Paul passes on a summary he received: Christ died for our sins, was buried, was raised on the third day, and appeared to Peter and then to the Twelve. Paraphrase, not quoted. ESV copy: 1 Corinthians 15:3 to 5 ("what I also received," "Cephas, then to the twelve"). Confirmed; Cephas is Peter.
- 1 Corinthians 15:6, "Then he appeared to more than five hundred brothers at one time, most of whom are still alive, though some have fallen asleep." ESV copy: matched.
- 1 Corinthians 15:17, "And if Christ has not been raised, your faith is futile and you are still in your sins." ESV copy: matched.
- Link to /writing/did-the-resurrection-happen. Link list: present.

## What About the Contradictions?

- Matthew has Mary Magdalene and "the other Mary" at the tomb, and an angel sitting on the stone. ESV copy: Matthew 28:1 (the quoted phrase matched) and 28:2 ("rolled back the stone and sat on it"). Confirmed.
- Mark has three women and a young man in a white robe inside the tomb. ESV copy: Mark 16:1 (Mary Magdalene, Mary the mother of James, and Salome) and 16:5 ("entering the tomb, they saw a young man ... dressed in a white robe"). Confirmed.
- Luke has a larger group of women and two men in dazzling clothes. Paraphrase. ESV copy: Luke 24:4 ("two men stood by them in dazzling apparel") and 24:10 (Mary Magdalene, Joanna, Mary the mother of James "and the other women with them"). Confirmed.
- John tells it through Mary Magdalene, who later sees two angels where the body had been. Paraphrase. ESV copy: John 20:1, 11 to 12 ("two angels in white, sitting where the body of Jesus had lain"). Confirmed.
- In the second half of the second century, a Syrian Christian named Tatian wove the four Gospels into the *Diatessaron*, for a long time the Gospel many Syriac-speaking churches read. Not checked (textbook: about 170; writer reported Wikipedia and the ANF introduction).
- In the fifth century Theodoret, bishop of Cyrrhus, wrote that he had found more than two hundred copies in the churches of his region, collected them, and put the Gospels of the four evangelists in their place. Paraphrase, not quoted. Not checked: the source, his *Compendium of Heretical Fables* 1.20, has no ANF/NPNF translation in the patristic library, and the library holds only his other works. The verifier judges it standard reference knowledge; the writer reported it as quoted by McFall (WTJ, 1994) and Drum (*Bibliotheca Sacra*, 1918). The essay says "collected," not "destroyed."
- Around 400, Augustine wrote a long work on the agreement of the Gospels, answering critics who had noticed the same differences. Patristic library, *The Harmony of the Gospels* (NPNF), Book 1.54: "let us now rather proceed to examine into the real character of those passages in which these critics suppose the evangelists to have given contradictory accounts." Purpose confirmed. The date about 400: not checked (textbook).
- Ancient biographers arranged material by theme, compressed events and summarized speeches as a matter of course. General statement; no scholar named. Not checked (textbook).
- Mark 2:26 still has no explanation everyone accepts. Not checked (textbook).
- Mark uses the same Greek construction later in his Gospel to mean "in the passage about" (Mark 12:26). Wording corrected (correction 6). ESV copy: Mark 12:26, "in the passage about the bush," matched. Site Greek data: Mark 2:26 reads ἐπὶ Ἀβιαθὰρ ἀρχιερέως and Mark 12:26 reads ἐπὶ τοῦ βάτου, both *epi* with the genitive. Confirmed.
- Some scholars read Mark 2:26 that way; others find it unconvincing. Not checked (reference knowledge; writer reported the BYU New Testament Commentary and *Themelios* 47.2).
- On what matters most the four agree: crucified and buried, the tomb found empty by women, followers convinced they had seen him alive. ESV copy: confirmed by the Easter chapters read above (Matthew 28, Mark 16, Luke 24, John 20).

## Chicago Statement

- The Chicago Statement on Biblical Inerrancy, 1978. Creeds.json metadata: year 1978, International Council on Biblical Inerrancy, Chicago. Confirmed.
- It says inerrancy is not negated by "the topical arrangement of material, variant selections of material in parallel accounts, or the use of free citations." Creeds.json, Article XIII (denial): "We further deny that inerrancy is negated by Biblical phenomena such as ... the topical arrangement of material, variant selections of material in parallel accounts, or the use of free citations." Matched word for word.
- The most careful modern statement of inerrancy, drafted by scholars who knew these passages well. Characterization. Not checked.
- Many evangelical churches confess that Scripture is without error. General statement. Not checked (textbook).
- One apostle admits another is sometimes hard to understand. ESV copy: 2 Peter 3:15 to 16 (Peter on "our beloved brother Paul"). Confirmed.

## What About the Hard Passages?

- Laws that regulate slavery, commands in Joshua to destroy whole towns, psalms that ask God to break the teeth of enemies. No references in the essay. ESV copy: Psalm 58:6, "O God, break the teeth in their mouths," and Psalm 3:7, "you break the teeth of the wicked." Confirmed for the psalms. The slavery laws (Exodus 21, Leviticus 25) and the Joshua commands (Joshua 6, 8): not checked in this essay's check (textbook).
- Job asks the question chapter after chapter; Jeremiah and Habakkuk put it to God. ESV copy: Jeremiah 12:1 ("Why does the way of the wicked prosper?"), Habakkuk 1:2 and 1:13. Confirmed. Job: not checked (textbook).
- Link to /writing/why-didnt-the-bible-ban-slavery and to /help. Link list: present.

## Why It Comes Back to Jesus

- The first Christians had no New Testament; they had the Scriptures of Israel. Not checked (textbook).
- Jesus rested his case on a phrase from Psalm 82 and said "Scripture cannot be broken" (John 10:35). ESV copy: John 10:34 ("I said, you are gods"), Psalm 82:6 ("I said, You are gods"), and John 10:35 (the quoted phrase matched). Confirmed.
- John 5:39–40, "You search the Scriptures because you think that in them you have eternal life; and it is they that bear witness about me, yet you refuse to come to me that you may have life." ESV copy: matched across both verses.
- Luke 24:27, "beginning with Moses and all the Prophets, he interpreted to them in all the Scriptures the things concerning himself." ESV copy: matched (the ESV verse begins "And").
- On the road to Emmaus after the resurrection, walking with two of his followers. ESV copy: Luke 24:13 ("two of them were going to a village named Emmaus"). Confirmed.

## What Trust Looks Like

- Mark is the shortest Gospel. Not checked (textbook).
- Mark keeps disciples who don't understand, Peter's denial, and women running from the tomb too afraid to speak. ESV copy: Mark 16:8 ("they went out and fled from the tomb ... and they said nothing to anyone, for they were afraid") and Mark 14:68 to 72 (Peter's denials). Confirmed. The disciples' misunderstanding: not checked (textbook).
- The description of *The Bible Assumes You Will Be Wrong*: Scripture expects its readers to get it wrong and keeps sending prophets to people who already have the Scriptures. Live chapter copy: the chapter says the biblical witness "assumes" communities will go wrong and that "the people who had the Scriptures" consistently met the prophetic word with hostility. Matches. Link list: present.
- Link to /study/bible. Allowed by BRIEF.md.
- Luke 24:32, "Did not our hearts burn within us while he talked to us on the road, while he opened to us the Scriptures?" ESV copy: matched.
- The two on the road to Emmaus had known the Scriptures all their lives. An inference, not a claim the text states. Kept as the writer's reading.

## Closing Texts

- Isaiah 40:8, "The grass withers, the flower fades, but the word of our God will stand forever." ESV copy: matched.
- John 20:31, "These are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in his name." ESV copy: matched from "these" on. The ESV verse begins "but these are written"; the Closing Texts line drops the opening "but" and capitalizes "These." No word inside the quotation is changed.

## Biography and integrity

- The essay contains no biography of James and no anecdote other than Ehrman's own published story. Checked against NOTES: nothing beyond the confirmed facts is stated. The one first-person line ("and I think they do") is a judgment, not biography.
- Contested second-order questions: none asserted. The essay states inerrancy as what "many evangelical churches confess" and leaves the Mark 2:26 solution open.
