# Claims ledger: the-council-of-nicaea-what-was-decided-in-325

Essay: `docs/work/essays/the-council-of-nicaea-what-was-decided-in-325.md` ("What Was Decided at the Council of Nicaea?", the title NOTES.md lists). Rewrite of the live machine-generated essay of the same slug, folding in `the-trinity-is-not-optional` (NOTES.md). Section: The Ancient Church. Drafted 2026-10-28 by the writer; verified 2026-10-28 by the verifier, who rewrote this ledger. Every line below gives the result and the method the verifier actually used. Where the writer's own check is mentioned, it is named as the writer's.

## Verification pass (2026-10-28)

The verifier worked every claim in the order the brief sets: non-Scripture quotations, numbers, Scripture, then dates, names, events and titles. 164 claims are listed below.

- **Quotations (non-Scripture).** The verifier did not reuse the writer's stripped text files. It extracted fresh plain-text copies of 29 source files from its own clone of the Writings-Database (see "WDB" below) and ran a script (`scratchpad/nicv/tools/quotes.py`) that pulls every double-quoted string from the essay and searches the sources with quotation marks and spacing normalized. Every non-Scripture quotation matched word for word, except two that the script could not match because the translation carries an editor's insertion inside the quoted words: "True Power and Image of the Father" (a stray footnote letter "t" after "Power") and the anathema of 325 (a transliterated Greek gloss after "was not"). Both were checked by eye and by a second script that removes the insertion; both then match exactly. The two London Baptist Confession quotations were matched against a fresh download of that text. The surrounding passage of every quotation was read with grep to confirm the speaker and the context the essay gives.
- **Numbers.** 250, 318, "nearly a hundred," twenty canons, five exiles, two refusers, three months, three years, forty years: each traced to a primary text in WDB or to search results, line by line below.
- **Scripture.** All 18 quotations (16 distinct passages), and the two passages the essay cites without quoting (Genesis 14:14, Philippians 2:10–11), were matched against the local ESV copy and against WebSearch results from esv.org or other ESV pages on 2026-10-28. All match. None has been checked against the ESV API (no key yet; NOTES.md).
- **Dates, names, events, titles.** Checked against WDB primary texts where a primary text carries them, otherwise by WebSearch. 59 WebSearch calls were made on 2026-10-28; every one returned results. No web page was opened directly; a "Search" line reports what the result pages said, as summarized in the search results, and names the sites.
- **Changed in the essay: five places**, listed under "Corrections made in the essay". No quotation changed. No anecdote or biography was found beyond NOTES.md (the only first-person biographical line is "I pastor a Baptist church", which NOTES.md allows).
- **Open:** ESV wording to recheck once with James's API key (as for every essay). Nothing else is open.

## Corrections made in the essay

1. Opening, second paragraph: "the largest council the church had yet held" became "the first of the church's great councils". Reason: no source seen in two searches stated that Nicaea was the largest council to that date; the results call it the first general (ecumenical) council, which is textbook-certain.
2. How the Bishops Chose Their Words: "in a translation printed in 1900" became "in an English translation more than a century old". Reason: the translation is Percival's in the Nicene and Post-Nicene Fathers, Second Series, vol. 14 (repo PROVENANCE.md says 1900), but the search on 2026-10-28 surfaced only a 1916 printing and a 1983 reprint, not the 1900 date. The new wording is true on either date.
3. Why the Argument Went On for Fifty Years: "and in 335 Constantine exiled him to Trier, in Gaul" became "In 335 a council at Tyre deposed him, and Constantine sent him into exile at Trier, in Gaul." Reason: search results date the exile order to 7 November 335 (H. A. Drake) or to 5 February 336 (several Catholic sources); the Council of Tyre's deposition in 335 is not in dispute, so the year now sits on that event.
4. Same section: Hanson's thesis, "between 318 and 381 the church was searching for words it did not yet have", became "between 318 and 381 the church was not defending a settled orthodoxy but searching for one, by trial and error." Reason: a review quoted in search results gives Hanson's own framing ("not the story of a defence of orthodoxy, but of a search for orthodoxy, a search conducted by the method of trial and error", pp. xix to xx); the old line understated it. Paraphrase, no quotation marks.
5. The Question We Treat as Small: the summary of moralistic therapeutic deism, "God wants people to be good and happy, and he stays in the background until he is needed", became "God wants people to be good, the goal of life is to be happy, and God stays in the background until he is needed to solve a problem." Reason: in Smith and Denton's tenets (quoted in search results) happiness is the goal of life, not something God is said to want, and God is involved "when God is needed to resolve a problem". Paraphrase, no quotation marks.

## Original wording, for restoring

Only if a later check confirms the original:

- Correction 1: "the question he had called idle became the business of the largest council the church had yet held." Restore only if a source is found that compares Nicaea's size with earlier councils (Carthage 256, Antioch 268, Arles 314, Alexandria c. 321).
- Correction 2: "Here it is, in a translation printed in 1900:" Restore if a catalogue or title page confirms NPNF2 vol. 14's first printing as 1900.
- Corrections 3 to 5 follow the sources and should not be restored.

## Method key

- **"WDB"**: the HistoricalChristianFaith Writings-Database (github.com/HistoricalChristianFaith/Writings-Database), the verifier's blob-filtered clone in the scratchpad (`scratchpad/wdb`, commit 328918a, dated 2026-10-25), read with `git show 'HEAD:<path>'`, HTML stripped by the verifier's script into `scratchpad/nicv/txt/*.txt` on 2026-10-28. Translations are the Nicene and Post-Nicene Fathers (NPNF) and Ante-Nicene Fathers (ANF) texts in that library, plus Roger Pearse's online English edition of Jerome's *Chronicle* ("Pages 188-332"). No machine-translated Migne material was used. Short names: vc2, vc3, vc4 (Eusebius, *Life of Constantine* bks 2 to 4); soc1 (Socrates, *Ecclesiastical History* bk 1); thd1 (Theodoret, *Ecclesiastical History* bk 1); soz1, soz7 (Sozomen bks 1 and 7); philost (Philostorgius, Photius's epitome); alex (Alexander of Alexandria, *Epistles on the Arian Heresy*); decretis (Athanasius, *De Decretis*); desynodis (Athanasius, *Councils of Ariminum and Seleucia*, i.e. *De Synodis*); incarnation (*On the Incarnation*); ar1, ar2 (*Discourses Against the Arians* 1 and 2); afros (*To the Bishops of Africa*); ariusdeath (Letter 54, to Serapion, on the death of Arius); lucif (Jerome, *Dialogue Against the Luciferians*); jchron (Jerome, *Chronicle*); ignEph (Ignatius, *To the Ephesians*); ambfide1 (Ambrose, *Exposition of the Christian Faith* bk 1); justindial (Justin, *Dialogue with Trypho*); nicenecreed, synodal, canons (Council of Nicaea 325 files "The Nicene Creed", "The Synodal Letter", "The Canons"); creed381 (Council of Constantinople 381, "The Holy Creed"). Chapter numbers given below are the NPNF chapter headings the verifier's script found above each passage.
- **"Quote script"**: `scratchpad/nicv/tools/quotes.py`, run 2026-10-28 on the essay as it now stands, matching each quoted string against the WDB texts after normalizing quotation marks and whitespace.
- **"LBC"**: NonlinearFruit/Creeds.json, `creeds/london_baptist_1689.json`, downloaded fresh by the verifier from raw.githubusercontent.com on 2026-10-28 (metadata: Year 1677, Public Domain), read with a script.
- **"ESV copy"**: `json/ESV.json` in the local clone of lguenth/mdbible (commit fd66568, 2022-01-20) at `scratchpad/nic/esv`, read with the writer's `esv.py` script. The copy strips quotation marks inside verses and prints LORD as "Lord".
- **"ESV search"**: a WebSearch on 2026-10-28 for the exact ESV wording; the line names the sites in the results (esv.org pages unless stated) and what the summary said. No page was opened.
- **"Search"**: a WebSearch on 2026-10-28; the line names the sites in the results and what the summary said. No page was opened.
- **"General"**: a broad statement or characterization with no source claimed; left as the writer's or James's judgment and marked so.

## Standfirst and opening

1. The council met in 325. **Verified.** WDB soc1 1.13 (consular date "in the consulate of Paulinus and Julian, on the 20th day of May"); Search ("First Council of Nicaea", Wikipedia and New World Encyclopedia: "met from May until the end of July 325").
2. The bishops decided that the Son is not the first and greatest creature but God in the same full sense as the Father. **Verified in substance.** WDB nicenecreed (Percival's translation: "very God of very God, begotten, not made, being of one substance with the Father"; anathema on "he is a creature").
3. Most of the world's churches still confess what Nicaea wrote. **Verified in substance.** Search (New World Encyclopedia and catholic.org: the creed, in its 381 form, is accepted by the Catholic, Eastern Orthodox and Oriental Orthodox churches, the Assyrian Church, the Anglican Communion, Lutheran, Reformed and Methodist churches and most Protestant bodies).
4. Constantine wrote to Alexandria "late in 324," after defeating Licinius. **Verified.** Search (fourthcentury.com entry for the letter: October to December 324; Wikipedia "Hosius of Corduba": autumn 324, Hosius the bearer; Williams and Barnes place it in December).
5. Licinius was his last rival; Constantine now ruled the whole Roman world alone. **Verified.** WDB soc1 1.4 ("Constantine thus became possessed of the sole dominion"), read by grep.
6. The letter went to Alexander, bishop of Alexandria, and Arius, one of his presbyters. **Verified.** WDB vc2 (the letter, 2.64 to 2.72); Search (fourthcentury.com, "Letter of Emperor Constantine to Alexander of Alexandria and Arius").
7. Quotation: "to be of a truly insignificant character, and quite unworthy of such fierce contention." **Verified verbatim.** Quote script against WDB vc2 2.68 ("I find the cause to be of a truly insignificant character, and quite unworthy of such fierce contention"); the essay's "he wrote" and "found" introduce it correctly.
8. Quotation: "truly idle question." **Verified verbatim.** Quote script against WDB vc2 2.71 ("in regard to this truly idle question").
9. By the next summer Constantine had summoned bishops from across the empire to Nicaea. **Verified.** WDB vc3 3.6 (summons; "the city Nicaea in Bithynia"); vc3 3.7 (bishops from Europe, Libya and Asia).
10. Nicaea was "the first of the church's great councils" (corrected; see Correction 1). **Verified.** Search (Wikipedia and New World Encyclopedia: the first general council since the Apostolic Council of Jerusalem, the first ecumenical council).
11. The emperor did not have the bishops vote Jesus into godhood; the council did not choose the books of the Bible. **Verified in substance.** WDB nicenecreed, synodal and canons (the council's business: the creed, Arius, Melitius, Easter, canons; nothing on the canon of Scripture); the vote-into-godhood claim is answered by line 41 onward (worship of Jesus long before 325).

## How the Argument Began in Alexandria

12. Historians usually date the quarrel to around 318. **Verified.** Search (Wikipedia "Arian controversy": began in 318; Schaff's NPNF prolegomena on ccel.org: "as early as 318 or 319"; 321 is the date of Alexander's condemning synod).
13. Socrates wrote "about a century later." **Verified.** Search (Oxford "Evidence" database and NPNF: written in or soon after 439, "very probably in 439/440").
14. Alexander was teaching his clergy about the unity of the Trinity when Arius objected. **Verified.** WDB soc1 1.5 ("attempted one day in the presence of the presbytery and the rest of his clergy, to explain ... the Unity of the Holy Trinity"; Arius "vigorously responded"), read by grep.
15. Quotation: "possessed of no inconsiderable logical acumen". **Verified verbatim.** Quote script against WDB soc1 1.5; the phrase describes Arius.
16. Quotation: "If," he said, "the Father begat the Son, he that was begotten had a beginning of existence: and from this it is evident, that there was a time when the Son was not." **Verified verbatim.** Quote script against WDB soc1 1.5 (the translation's speech tag is "said he"; the essay's "he said" sits outside the quotation marks).
17. "There was a time when the Son was not" became the slogan of the dispute. **Verified in substance.** WDB nicenecreed (anathema: "that there was a time when the Son of God was not"); soc1 1.6 (Alexander's letter lists the teaching).
18. Alexander gathered the bishops of Egypt and Libya and they condemned Arius; quotation "nearly a hundred in number". **Verified verbatim.** Quote script against WDB alex ("we, coming together with the Bishops of Egypt and the Libyas, nearly a hundred in number, have anathematized them").
19. Arius wrote to Eusebius, bishop of Nicomedia. **Verified.** WDB thd1 1.4 (heading "The Letter of Arius to Eusebius, Bishop of Nicomedia").
20. Nicomedia was where the emperors of the East kept their court. **Verified.** Search (OrthodoxWiki "Nicomedia" and Catholic Encyclopedia "Eusebius of Nicomedia": Diocletian's eastern capital; Licinius's residence; Constantine's interim capital after 324).
21. Quotation: "my fellow-Lucianist". **Verified verbatim.** Quote script against WDB thd1 1.4 ("my fellow-Lucianist, and true Eusebius").
22. Both had studied under Lucian of Antioch. **Verified as the standard account.** Search (Wikipedia "Eusebius of Nicomedia": "Like Arius, he was a pupil of Lucian of Antioch"; Catholic Encyclopedia; Harnack's list of Lucian's students). The same results note that some scholars read "fellow-Lucianist" as veneration of the martyr rather than a school; the essay's wording follows the majority.
23. Quotation: "We are persecuted," ... "because we say that the Son has a beginning, but that God is without beginning." **Verified verbatim.** Quote script against WDB thd1 1.4 (one sentence in the source; the essay splits it with "he told him").
24. Eusebius took up Arius's cause with bishops across the East. **Verified.** WDB soc1 1.6 (Alexander's letter: Eusebius sending "commendatory letters in all directions concerning them"); Search (Catholic Encyclopedia: Eusebius wrote on Arius's behalf and convened a provincial council for him).
25. Philostorgius, a later historian on Arius's side. **Verified.** WDB philost 2.3 (Photius: "Philostorgius extols Arius to the skies").
26. Arius set his teaching to songs for sailors, millers and travelers. **Verified.** WDB philost 2.2 ("composed several songs to be sung by sailors, and by millers, and by travellers along the high road"). Known only through Photius's epitome.

## What Arius Was Trying to Protect

27. The church made Arius the villain for centuries. **General.** A characterization; consistent with Search ("Arians" label results: Hanson, Williams, Ayres on the polemical picture inherited from Athanasius).
28. Christians had just come through the worst persecution in their history. **Verified.** Search (Wikipedia "Diocletianic Persecution", Schaff on ccel.org, Lumen Learning: "the last and most severe persecution of Christians in the Roman Empire", 303 to 311/313).
29. Quotation: "We acknowledge One God, alone Ingenerate, alone Everlasting, alone Unbegun, alone True, alone having Immortality, alone Wise, alone Good, alone Sovereign." **Verified verbatim.** Quote script against WDB desynodis §16 (Arius's letter "To Our Blessed Pope and Bishop, Alexander").
30. Quotation: "perfect creature of God, but not as one of the creatures". **Verified verbatim.** Quote script against WDB desynodis §16.
31. Quotation: "perfect God", in his letter to Eusebius. **Verified verbatim.** Quote script and grep against WDB thd1 1.4 ("as perfect God, only begotten and unchangeable").
32. Arius meant the Son was the first and highest thing the Father made, the one through whom he made everything else. **Verified.** WDB desynodis §16 ("through whom He has made both the ages and the universe"; "perfect creature of God").
33. Athanasius reports that Arius's allies kept quoting Proverbs 8; quotation "The Lord created me a beginning of His ways unto His works." **Verified verbatim.** Quote script against WDB decretis §13 ("this Eusebius and his fellows used to insist on").
34. The Greek most of these bishops read said "created". **Verified.** Search (Barnes's notes on Proverbs 8, sacred-texts.com: ἔκτισε, "created", in the Septuagint, Aquila "possessed"; the Septuagint wording "became one of the stock arguments of the Arians"); WDB justindial 129 ("The Lord created me the beginning of His ways for His works").
35. The church had long heard Wisdom's voice in Proverbs 8 as the voice of the Son. **Verified.** WDB justindial 61 and 129 (Justin, mid-second century, reads Proverbs 8:22 onward as the Word speaking).
36. The ESV, translating the Hebrew, says "possessed" in Proverbs 8:22. **Verified.** ESV copy ("The Lord possessed me at the beginning of his work"); ESV search (esv.org pages for Proverbs 8:22 returned for the exact phrase; summary: the ESV text matches).
37. "the Father is greater than I" (John 14:28). **Verified.** ESV copy; ESV search (esv.org and biblehub.com ESV pages; summary quotes "for the Father is greater than I").
38. "the firstborn of all creation" (Colossians 1:15). **Verified.** ESV copy; ESV search (esv.org and Blue Letter Bible ESV pages for the full verse; summary: both match).
39. Jehovah's Witnesses teach that the Son was the first being God created. **Verified.** Search (Watchtower Online Library, wol.jw.org, New World Translation study note on Colossians 1:15: Jesus "is the first creation by Jehovah God").
40. Many Americans hold that Jesus was the best man who ever lived and go no further. **General.** A description of a common view; no figure is claimed.
41. In the 320s plenty of bishops thought Arius sensible. **Verified.** WDB thd1 1.4 (Arius names Eusebius of Caesarea, Theodotus, Paulinus and others, "and all the bishops of the East", as condemned for agreeing with him); thd1 1.6 (sympathizers at the council); decretis §§19 to 20 (the Eusebian party at Nicaea).

## What Christians Already Believed About Jesus

42. Every devout Jew confessed the Shema. **General, supported.** Search (biblestudytools.com commentary on Deuteronomy 6:4: the passage Jews bind themselves to read twice a day, morning and evening).
43. "Hear, O Israel: The LORD our God, the LORD is one" (Deuteronomy 6:4). **Verified.** ESV copy (prints "Lord"; the ESV prints LORD); ESV search (esv.org and Blue Letter Bible ESV pages; summary: the wording matches).
44. 1 Corinthians was written in the 50s. **Verified.** Search (Wikipedia "First Epistle to the Corinthians": Paul's stay in Ephesus, AD 53 to 57; biblestudytools.com: most likely AD 54; bartehrman.com: written from Ephesus).
45. Quotation of 1 Corinthians 8:6 in full. **Verified.** ESV copy; ESV search (esv.org and bible.com ESV pages; summary: the quoted wording matches the ESV).
46. Paul kept the one God and placed Jesus inside the confession. **Interpretation, with support.** Search (Bauckham and N. T. Wright read 1 Corinthians 8:6 as a deliberate expansion of the Shema; the same results report scholars who dispute that reading). The essay states it as its own argument.
47. "To me every knee shall bow, every tongue shall swear allegiance" (Isaiah 45:23), a line in which Israel's God swears. **Verified.** ESV copy ("By myself I have sworn ... To me every knee shall bow, every tongue shall swear allegiance."); ESV search, two queries (esv.org pages for Isaiah 45:23 returned for the exact phrase; summaries: the ESV text matches and the verse begins "By myself I have sworn").
48. Paul applied that line to Jesus (Philippians 2:10–11). **Verified.** ESV copy (Philippians 2:10–11, "every knee should bow ... every tongue confess that Jesus Christ is Lord"); ESV search (esv.org cross-references for Isaiah 45:23 list Romans 14:11 and Philippians 2:10).
49. "the Word was God" (John 1:1). **Verified.** ESV copy; ESV search (esv.org John 1:1 pages; summary: matches).
50. "My Lord and my God!" (John 20:28), Thomas before the risen Jesus. **Verified.** ESV copy; ESV search (esv.org and biblehub.com ESV pages; summary quotes "Thomas answered him, "My Lord and my God!"").
51. Ignatius of Antioch, early in the second century, on his way to execution in Rome. **Verified as the traditional dating.** Search (Wikipedia: martyrdom traditionally under Trajan, c. 98 to 117, accepted by many scholars, some arguing later; letters written on the journey through Smyrna and Troas).
52. Quotation: "our God, Jesus Christ". **Verified verbatim.** Quote script against WDB ignEph 18 ("For our God, Jesus Christ, was, according to the appointment of God, conceived in the womb by Mary").
53. Arius's party worshiped Jesus too. **Verified.** WDB ar1 §8 (Athanasius's charge: "Abandon the worship of the creation, and then draw near and worship a creature and a work").
54. Athanasius was Alexander's young deacon. **Verified.** WDB soc1 1.15 (Alexander "ordained him deacon" and brought him to Nicaea); Search (Wikipedia and others: born about 296 to 298, deacon and assistant to Alexander at Nicaea).
55. "my glory I give to no other" (Isaiah 42:8). **Verified.** ESV copy; ESV search (esv.org pages; summary quotes "I am the Lord; that is my name; my glory I give to no other, nor my praise to carved idols").
56. "worshiped and served the creature rather than the Creator" (Romans 1:25). **Verified.** ESV copy; ESV search (esv.org and bible.com ESV pages; summary quotes the full verse).
57. Quotation: "He had not been thus worshipped, nor been thus spoken of, were He a creature merely." **Verified verbatim.** Quote script against WDB ar2 §24. "Later": the *Discourses* are from the 350s (General).

## The Bishops Gather at Nicaea

58. Nicaea was in Bithynia. **Verified.** WDB vc3 3.6 ("the city Nicaea in Bithynia").
59. Near the court at Nicomedia; today İznik in Turkey. **Verified.** Search (Wikipedia "First Council of Nicaea": "the Bithynian city of Nicaea (now İznik, Turkey)"); Nicomedia's role as line 20.
60. Constantine paid the bishops' travel. **Verified.** WDB vc3 3.6 ("he allowed some the use of the public means of conveyance, while he afforded to others an ample supply of horses").
61. Socrates dates the opening to May 20. **Verified.** WDB soc1 1.13 ("This Synod was convened ... in the consulate of Paulinus and Julian, on the 20th day of May").
62. Eusebius of Caesarea attended and later wrote the emperor's life. **Verified.** WDB soc1 1.8 (his letter to his church about the council); WDB vc3 (his account in the *Life*).
63. Eusebius counted more than two hundred and fifty bishops. **Verified.** WDB vc3 3.8 ("the number of bishops exceeded two hundred and fifty").
64. Quotation: "altogether beyond computation". **Verified verbatim.** Quote script against WDB vc3 3.8 (of the presbyters, deacons, acolytes and attendants).
65. Later writers settled on 318. **Verified.** WDB afros §2 ("318 bishops"); thd1 and soc1 ("three hundred and eighteen"); Search (catholic.com: 318 "almost universally adopted").
66. Ambrose saw in that number the 318 men Abraham led out to rescue Lot. **Verified.** WDB ambfide1, prologue §§3 and 5 ("Abraham led into battle three hundred and eighteen men"; "three hundred and eighteen priests, appointed, as it were, after the judgment of Abraham").
67. Genesis 14:14: Abram led out 318 trained men after his kinsman was taken captive. **Verified.** ESV copy; ESV search (esv.org and bible.com ESV pages; summary: the quoted wording is the ESV of Genesis 14:14). Lot as the kinsman: Genesis 14:12 (ESV copy).
68. Nearly all came from the Greek-speaking East. **Verified.** Search (Wikipedia infobox: only five bishops from the Western Church; New World Encyclopedia: Eastern bishops the great majority); WDB vc3 3.7 (one from Spain, the bishop of Rome's presbyters).
69. Quotation: the bishop of Rome, kept home by "extreme old age," sent presbyters. **Verified verbatim.** Quote script against WDB vc3 3.7 ("The prelate of the imperial city was prevented from attending by extreme old age; but his presbyters were present") and WDB soz1 1.17 ("bishop of Rome, was unable to attend on account of extreme old age"; Sozomen names him Julius in error; the essay names no one).
70. Theodoret wrote "more than a century later." **Verified.** Search (Wikipedia via results: completed 449 to 450; fourthcentury.com: between 449 and 459).
71. Paul, bishop of Neocaesarea on the Euphrates, lost the use of both hands to a red-hot iron under Licinius. **Verified.** WDB thd1 1.6 ("Paul, bishop of Neo-Caesarea, a fortress situated on the banks of the Euphrates, had suffered from the frantic rage of Licinius. He had been deprived of the use of both hands by the application of a red-hot iron").
72. Licinius had turned on the Christians of the East only a few years before. **Verified.** Search (Loyola "Roman Emperors" site: about 320; fourthcentury.com timeline: 317 to c. 320, martyrdoms in 323; Haykin: 321 or 322; all agree a limited persecution before the war of 324).
73. Others had lost the right eye or the right arm, among them Paphnutius of Egypt. **Verified.** WDB thd1 1.6 ("Some had had the right eye dug out, others had lost the right arm. Among these was Paphnutius of Egypt").
74. Quotation: "In short, the Council looked like an assembled army of martyrs." **Verified verbatim.** Quote script against WDB thd1 1.6.
75. Constantine entered last. **Verified.** WDB thd1 1.6 ("was the last to enter the room"); WDB vc3 3.10 (family and friends entered first, "at last he himself proceeded").
76. In purple and gold, Eusebius says; he would not sit until the bishops signaled. **Verified.** WDB vc3 3.10 ("a purple robe, and adorned with the brilliant splendor of gold and precious stones"; "he waited until the bishops had beckoned to him, and then sat down").
77. He spoke in Latin through an interpreter. **Verified.** WDB vc3 3.13 ("spoken these words in the Latin tongue, which another interpreted").
78. Strife inside the church, he said, was more dangerous than any war. **Verified (paraphrase).** WDB vc3 3.12 ("intestine strife within the Church of God, is far more evil and dangerous than any kind of war or conflict").
79. Some had brought him written accusations against one another. **Verified.** WDB soc1 1.8 ("several of them had brought accusations against one another and many had even presented petitions to the emperor").
80. Theodoret: he sealed them with his ring and later burned them in front of everyone, swearing he had not read a word. **Verified.** WDB thd1 1.10 ("formed them into a packet which he sealed with his ring ... burnt them in their presence, at the same time declaring upon oath that he had not read a word of them").

## How the Bishops Chose Their Words

81. Athanasius was there as Alexander's deacon. **Verified.** WDB soc1 1.15; line 54.
82. Athanasius later described how the creed was written. **Verified.** WDB decretis §§19 to 20 (read in full by the verifier).
83. The bishops first tried Scripture's words: "from God," Word and Wisdom. **Verified.** WDB decretis §19 ("to use instead the acknowledged words of the Scriptures, that the Son is not from nothing but `from God,' and is `Word' and `Wisdom'").
84. Quotation: "True Power and Image of the Father". **Verified verbatim.** WDB decretis §20, read by eye ("the True Power t and Image of the Father"; the "t" is a footnote marker left by the HTML stripping, so the quote script could not match it until the marker was removed).
85. Each time the Eusebian party agreed, because Scripture says such things of creatures; "We are from God. Man is the image of God." **Verified (paraphrase).** WDB decretis §19 (they took "from God" as "belonging to us"; "There is one God, from whom, all things") and §20 ("Man is the image and glory of God"; "no difficulty to agree to these").
86. Quotation: "caught whispering to each other and winking with their eyes". **Verified verbatim.** Quote script against WDB decretis §20.
87. Quotations: "of the substance of the Father" and "of one substance with the Father". **Verified verbatim.** Quote script against WDB nicenecreed (and decretis §§19 to 20 for the bishops' move to "from the essence" and "one in essence").
88. *Homoousios* is the Greek word. **Verified.** WDB nicenecreed (gloss "o9moou/sion, consubstantialem"); soc1 1.8 ("homoousios").
89. Eusebius of Caesarea hesitated before he signed. **Verified.** WDB soc1 1.8 ("who had held aloof for a short time, after mature consideration ... at length acquiesced in it").
90. In a letter home he said that when his church's creed was read, the emperor approved it and urged everyone to sign it; quotation "with the insertion, however, of that single word 'homoousios.'" **Verified verbatim.** Quote script against WDB soc1 1.8 (the translator's double quotation marks around homoousios become single marks inside the essay's quotation; the translator's "(consubstantial)" follows after the quoted words end).
91. The bishops then drew up their creed around that word. **Verified.** WDB soc1 1.8 ("the bishops on account of the word homoousious, drew up this formula of faith").
92. "An English translation more than a century old" (corrected; see Correction 2). **Verified.** Repo `scripts/data/history-sources/PROVENANCE.md` (Percival, NPNF Second Series vol. 14, 1900); Search (fourthcentury.com and library catalogues: Percival's NPNF2 vol. 14; a 1916 Scribner printing; 1983 Eerdmans reprint).
93. The block quotation of the creed. **Verified verbatim.** Script comparison against WDB nicenecreed (Percival's translation): the essay's text equals the source once the translator's transliterated Greek glosses "(gennhqe/nta)" and "(o9moou/sion, consubstantialem)" are removed. "[from heaven]" and "[we believe]" are the translator's brackets and are kept.
94. Anathema quotation: "that there was a time when the Son of God was not, or that before he was begotten he was not, or that he was made of things that were not". **Verified verbatim.** Script comparison against WDB nicenecreed after removing the Greek gloss "(h!n pote o\#te ou0k h\n)". "Or who called him a creature" paraphrases "or that he is a creature" (same file).
95. The creed most churches recite under Nicaea's name is a longer form linked with Constantinople 381. **Verified.** WDB creed381; Search (Wikipedia "Nicene Creed" and catholic.org: the 381 form is the creed in common use; some historians doubt it was composed at that council, hence "linked with").
96. Quotation: "the Lord and Giver-of-Life". **Verified verbatim.** Quote script against WDB creed381.
97. The creed of 325 names the Holy Spirit and stops. **Verified.** WDB nicenecreed ("And [we believe] in the Holy Ghost." then the anathemas); Search (Wikipedia via results: "The 325 creed ended at its belief in the Holy Spirit").
98. "Begotten, not made" and "Light of Light" are phrases of the creed. **Verified verbatim.** Quote script against WDB nicenecreed.
99. "the radiance of the glory of God and the exact imprint of his nature" (Hebrews 1:3). **Verified.** ESV copy; ESV search (seven esv.org pages for Hebrews 1:3; summary: the wording matches).
100. Only two bishops refused to sign, Secundus of Ptolemais and Theonas of Marmarica. **Verified.** WDB philost 1.9 ("with the exception of Secundus, bishop of Ptolemais, and Theon, bishop of Marmarica"); WDB thd1 1.6 ("with the exception of Secundus and Theonas"); WDB synodal (both condemned with Arius). Socrates 1.8 (WDB soc1) says five objected at first; the essay's "refused to sign" follows the outcome all three sources report.
101. Both were from Libya. **Verified.** WDB alex (the synod of "the Bishops of Egypt and the Libyas" that condemned them); Ptolemais in the Libyan Pentapolis and Marmarica in Libya are standard geography. Theodoret 1.6 (WDB thd1) writes "Ptolemais in Egypt", meaning the Alexandrian province.
102. They went into exile with Arius. **Verified.** WDB philost 1.10 ("Secundus, on going into exile"); soc1 1.8 (the edict exiling Arius).
103. Even Philostorgius, who sided with Arius, agrees. **Verified.** WDB philost 1.9 ("Philostorgius also confesses").
104. Eusebius of Nicomedia signed, and within three months he was exiled too. **Verified.** WDB philost 1.10 ("You subscribed, Eusebius ... within three months after the conclusion of the synod, Eusebius was sent into exile").
105. The council set one date for Easter. **Verified.** WDB synodal ("to celebrate the said most sacred feast of Easter at the same time with the Romans"); Search (Cambridge History chapter and Wikipedia).
106. It settled a schism in Egypt. **Verified.** WDB synodal (Meletius); Search (Wikipedia, Cambridge History).
107. Twenty canons. **Verified.** Search (Wikipedia "First Council of Nicaea": twenty canons, listed with the creed and the synodal letter).
108. One canon: pray standing, not kneeling, on Sundays and between Easter and Pentecost. **Verified.** Search (religionnews.com and americamagazine.org on Canon 20: kneeling forbidden "on the Lord's Day and in the days of Pentecost", the days between Easter and Pentecost; Wikipedia's topic list: "prohibition of kneeling on Sundays and from Easter to Pentecost").
109. Quotation: "that nation of parricides who slew their Lord", in the emperor's letter announcing the Easter decision. **Verified verbatim.** Quote script against WDB vc3 3.19 (Constantine's letter to the churches after the council, which begins at 3.17).
110. Christians would repeat that kind of language for centuries, and Jewish communities would pay for it. **General.** No specific event claimed.
111. The council ended in the summer, as Constantine celebrated twenty years on the throne, with a banquet. **Verified.** WDB vc3 3.15 ("About this time he completed the twentieth year of his reign ... the emperor himself invited and feasted with those ministers of God"); Search (fourthcentury.com and Wikipedia: the council ran from 20 May to late July or August 325).
112. Soldiers lined the entrance with drawn swords; the bishops walked between them into the emperor's rooms. **Verified.** WDB vc3 3.15 ("surrounded the entrance of the palace with drawn swords, and through the midst of these the men of God proceeded without fear into the innermost of the imperial apartments").
113. Theodoret: Constantine pressed his lips to the wounds of bishops whose eyes had been torn out for the faith. **Verified.** WDB thd1 1.10 ("some among them had had the right eye torn out, and learning that this mutilation had been undergone for the sake of religion, he placed his lips upon the wounds").
114. Quotation: "One might have thought that a picture of Christ's kingdom was thus shadowed forth, and a dream rather than reality." **Verified verbatim.** Quote script against WDB vc3 3.15.
115. A few years earlier some of those men had been in an emperor's prisons. **Verified in substance.** Lines 71 to 73 (mutilated confessors); Search on Licinius (line 72).
116. Constantine wanted one church for one empire. **Interpretation.** Supported by WDB vc2 2.65 to 2.72 (the letter's appeal to unity) and vc3 3.12 (strife worse than war).

## Why the Argument Went On for Fifty Years

117. Within about three years Eusebius of Nicomedia was back. **Verified.** WDB philost 2.7 ("after a period of three years spent in banishment, were recalled").
118. Athanasius became bishop of Alexandria in 328. **Verified.** WDB soc1 1.15 (succeeded Alexander); Search (Wikipedia: episcopate from about 8 June 328).
119. In 335 a council at Tyre deposed him, and Constantine sent him into exile at Trier, in Gaul (corrected; see Correction 3). **Verified.** Search (Wikipedia "First Synod of Tyre": the council of 335 met to judge Athanasius and deposed him; exile to Trier attested by every result, ordered 7 November 335 per Drake or 5 February 336 per the Vatican's saint-of-the-day page).
120. Arius was received at court and died in Constantinople the day before he was to be readmitted to communion. **Verified.** WDB ariusdeath §§2 to 4 (invited by Constantine; Alexander's prayer "If Arius is brought to communion to-morrow"; "Such has been the end of Arius"); Search (Wikipedia "Alexander of Constantinople", Socrates 1.38 on Wikisource: died the day before).
121. The year 336. **Verified.** Search (results summary: "most accounts date it to 336").
122. The next year the dying Constantine was baptized by Eusebius of Nicomedia. **Verified.** WDB jchron (entry beside 337: "Constantine, baptized by Eusebius of Nicomedia at the very end of his life"); vc4 (baptism and death, minister unnamed).
123. Quotation: Jerome's chronicle says the emperor then "falls into the dogma of Arius." **Verified verbatim.** Quote script and sed against WDB jchron (Pearse's translation).
124. His son Constantius favored bishops who wanted *homoousios* dropped. **Verified.** WDB jchron ("with the support of the ruler, Constantius ... persecuted Athanasius"); Search (results: Constantius II, emperor of the East, "supported the Arians"; Milan 355).
125. In 359 the bishops at Ariminum, in Italy, were pressed into a creed without it. **Verified.** WDB lucif §19 ("At that moment the term Usia was abolished"); Search (Wikipedia "Council of Ariminum": the Nicene majority of July 359 reversed on 10 October 359; the remaining bishops "forced to assent"; the creed avoided ousia).
126. Jerome wrote "some twenty years later." **Verified.** Search (fourthcentury.com catalogue: "Pre-382 (Kelly p. 63)"); background dating about 379.
127. Quotation: "The whole world groaned, and was astonished to find itself Arian." **Verified verbatim.** Quote script against WDB lucif §19.
128. Athanasius was driven from his city five times. **Verified.** Search (Wikipedia via results: his episcopate of about 45 years "of which over 17 encompassed five exiles").
129. In Constantinople the Nicene believers met in a small house turned into a chapel, where Gregory of Nazianzus preached. **Verified.** WDB soz7 7.5 ("assembled them together in a little dwelling, which had been altered into the form of a house of prayer").
130. Quotation: "during forty years in the hands of the Arians". **Verified verbatim.** Quote script against WDB soz7 7.5 (of the churches of Constantinople, before Theodosius gave them to the Nicenes).
131. In 380 Theodosius ordered his subjects to hold the faith of the bishops of Rome and Alexandria. **Verified.** WDB soz7 7.4 ("professed by Damasus, bishop of Rome, and by Peter, bishop of Alexandria"); Search (the edict *Cunctos populos*, 27 February 380).
132. Quotation: "should be treated as heretics, regarded with contempt, and delivered over to punishment" (Sozomen's words for the law). **Verified verbatim.** Quote script against WDB soz7 7.4.
133. In 381 a council at Constantinople confirmed the faith of Nicaea. **Verified.** WDB soz7 7.7 ("for the purpose of confirming the decrees of Nicaea"); WDB creed381 (the file "The Holy Creed" in the library's "Council of Constantinople of 381" folder).
134. R. P. C. Hanson titled his account *The Search for the Christian Doctrine of God*; the title is his argument (corrected wording; see Correction 4). **Verified.** Search (library catalogues: *The Search for the Christian Doctrine of God: The Arian Controversy 318–381*, T&T Clark, 1988; Evangelical Quarterly review quoting Hanson, xix to xx: "not the story of a defence of orthodoxy, but of a search for orthodoxy, a search conducted by the method of trial and error").
135. Many bishops Athanasius called "Arians" had never followed Arius. **Verified.** Search (Wikipedia "Arian creeds" and "Arius", Theopolis "Did Arians Exist?": Hanson called "the Arian controversy" a misnomer; Williams and Ayres; Athanasius "labeled everyone he opposed 'Arian'"); WDB desynodis §41 (Athanasius himself distinguishes those who "doubt only about the Coessential").
136. Some resisted *homoousios* because they feared it erased the difference between the Father and the Son. **Verified.** WDB soc1 1.23 ("Those who objected to the word homoousios, conceived that those who approved it favored the opinion of Sabellius ... as subverting the existence of the Son of God").

## The Strongest Case Against Nicaea

137. An emperor called the council and paid for it. **Verified.** WDB vc3 3.6 (summons and transport) and 3.9 ("For the maintenance of all ample provision was daily furnished by the emperor's command").
138. By Eusebius's account the emperor pressed the decisive word. **Verified.** Line 90.
139. Arius rejected "one in essence" by name, listing it with the teaching of Mani. **Verified verbatim.** Quote script and grep against WDB desynodis §16 ("nor as Manichaeus taught that the offspring was a portion of the Father, one in essence").
140. Arius's own writings survive mostly in fragments his enemies quoted. **Verified.** Search (Wikipedia, Catholic Encyclopedia, Schaff: three letters and fragments of the *Thalia*, preserved in his opponents' works; "all knowledge of Arius is derived from the accounts of his enemies").
141. The winners wrote the histories and finally won with imperial law behind them. **Verified in substance.** Lines 13, 70, 131 to 132.
142. Bart Ehrman, a New Testament scholar who left the faith of his youth. **Verified.** Search (results: "once a Fundamentalist Christian and is now an agnostic").
143. *How Jesus Became God* (2014). **Verified.** Search (Wikipedia "How Jesus Became God": published 25 March 2014 by HarperOne).
144. Ehrman argues Christians came to call Jesus divine in stages and in more than one sense. **Verified.** Search (reviews quoting Ehrman: divine "in some sense" before "equal with God Almighty in an absolute sense"; an evolutionary model with "many gradations").
145. Ways of speaking about Christ that once sounded faithful were later ruled heretical. **Verified.** Search (Goodreads highlight from the book: views "originally deemed orthodox came to be declared heretical").
146. Paul placed Jesus inside the Shema within about twenty-five years of the crucifixion. **Verified as arithmetic on standard dates.** Crucifixion about 30 to 33 (General); 1 Corinthians about 53 to 55 (line 44); the reading of 1 Corinthians 8:6 as line 46.
147. For much of the half century after 325 the palace favored Nicaea's opponents; its defenders were sent into exile. **Verified.** Lines 119, 124, 125, 128; Search (Constantius II "supported the Arians"; Valens leaned on the Homoean Eudoxius).
148. Athanasius granted the terms were not in Scripture word for word; quotation "contain the sense of the Scriptures". **Verified verbatim.** Quote script against WDB decretis §21 ("even if the expressions are not in so many words in the Scriptures, yet, as was said before, they contain the sense of the Scriptures").
149. Arius's God must make a lesser being to deal with the world; the remote God of the philosophers. **Interpretation.** The writer's argument; no source claimed.

## Why the Word Still Matters

150. Quotation: "He was made man that we might be made God." **Verified verbatim.** Quote script against WDB incarnation §54.3 ("For He was made man that we might be made God").
151. "may become partakers of the divine nature" (2 Peter 1:4). **Verified.** ESV copy ("so that through them you may become partakers of the divine nature"); ESV search (biblehub.com ESV and bible.com ESV pages; summary: the phrase appears in the ESV wording). No esv.org page appeared in these results.
152. Quotation: "man had not been deified if joined to a creature, or unless the Son were very God". **Verified verbatim.** Quote script against WDB ar2 §70.
153. "Whoever has seen me has seen the Father" (John 14:9), said to Philip. **Verified.** ESV copy; ESV search (esv.org John 14:9 pages; summary: matches, Jesus addressing Philip).
154. The creed says the one who "suffered" is God of God. **Verified.** WDB nicenecreed.
155. "For in him the whole fullness of deity dwells bodily" (Colossians 2:9). **Verified.** ESV copy (the verse ends with a comma; the essay closes the quotation with a period); ESV search (Blue Letter Bible and biblia.com ESV pages; summary: matches). No esv.org page appeared in these results.

## The Question We Treat as Small

156. Christian Smith and Melinda Lundquist Denton studied American teenagers in the early 2000s and named their faith moralistic therapeutic deism; the summary of its tenets (corrected; see Correction 5). **Verified.** Search (americamagazine.org and Notre Dame's youthandreligion.nd.edu: *Soul Searching*, Oxford University Press, 2005; National Study of Youth and Religion surveys July 2002 to March 2003; tenets quoted: "God wants people to be good, nice and fair to each other", "The central goal of life is to be happy and to feel good about oneself", "God does not need to be particularly involved in one's life except when God is needed to resolve a problem").
157. James pastors a Baptist church. **Verified.** NOTES.md (confirmed biography; "Baptist" self-identification allowed; no Southern Baptist implication in the essay).
158. Baptists have a long suspicion of creeds, learned from state churches that enforced them with fines and prison; many in free churches say they have no creed but the Bible. **Verified in substance.** Search (Baptist Standard editorial: forebears "suffered and died in 17th century Europe for refusing to affirm creeds enforced by civil and religious authorities"; Tom Nettles quoting a "Baptist aversion for all creeds but the Bible"; 9marks and others on fines and imprisonment of dissenters under the Clarendon Code, John Bunyan jailed more than twelve years).
159. English Baptists published their confession in 1677; quotations "of one substance, power, and Eternity" and "the foundation of all our Communion with God, and comfortable dependance on him". **Verified verbatim.** LBC chapter 2, paragraph 3 (script read of the fresh download); Search (Wikipedia "Confession of Faith (1689)": compiled and published by Particular Baptists in 1677, endorsed in 1689; bible-researcher.com and reformedreader.org chapter 2 pages for the wording).
160. "But who do you say that I am?" (Matthew 16:15). **Verified.** ESV copy; ESV search (esv.org Matthew 16:15–16 pages; summary: matches).
161. Some of the men who answered Constantine had lost an eye or the use of their hands for confessing Christ. **Verified.** Lines 71 and 73.

## Closing Texts

162. John 1:14, quoted in full. **Verified.** ESV copy; ESV search (esv.org John 1:14 pages; summary quotes the verse and says it matches).
163. Colossians 2:9. **Verified.** As line 155.
164. "Thomas answered him, 'My Lord and my God!'" (John 20:28). **Verified.** ESV copy (strips the inner quotation marks); ESV search (esv.org page quoted in the summary: "Thomas answered him, "My Lord and my God!"").

## Links

- [the canon came together another way](/writing/who-decided-what-books-are-in-the-bible), [the worst persecution in their history](/writing/the-early-church-under-rome), [what a patron asks in return](/writing/when-the-church-married-empire). All three slugs appear in `docs/work/essays/link-targets.json` (checked with grep on 2026-10-28).

## Mechanical scan (2026-10-28, after corrections)

No em-dash (U+2014). Exclamation points only inside quoted Scripture (John 20:28, twice). No CLAUDE.md forbidden word, no "steelman", "verdict", "indictment", "honest" or "fair" (grep). About 3,720 words by `wc -w`, including title, standfirst and Closing Texts. The five corrections changed wording only in the five sentences named above; no heading, quotation, link or paragraph order changed.
