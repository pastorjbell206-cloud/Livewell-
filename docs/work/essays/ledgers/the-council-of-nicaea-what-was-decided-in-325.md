# Claims ledger: the-council-of-nicaea-what-was-decided-in-325

Essay: `docs/work/essays/the-council-of-nicaea-what-was-decided-in-325.md` ("What Was Decided at the Council of Nicaea?", the title NOTES.md lists). Rewrite of the live machine-generated essay of the same slug, folding in `the-trinity-is-not-optional` (NOTES.md). Section: The Ancient Church. Drafted 2026-10-28 by the writer. Nothing here has been through a verifier yet.

## What the writer could and could not check

- **Old texts read first.** The live essay (fetched 2026-10-28 through the posts.getBySlug endpoint) and `the-trinity-is-not-optional` (static copy in `content/static-library.generated.json`). Nothing from either was trusted. Kept after checking: only two bishops refused to sign; Paphnutius lost an eye; Constantine baptized at the end by Eusebius of Nicomedia; Constantine's letter calling the question small. Dropped: the old essay's Ayres and Pelikan summaries, its "Arius did not die in 336" line, and from the Trinity essay the John 17, Augustine, Lewis, LaCugna, Taylor and Barth material (outside this essay's question, and none of it checked).
- **Primary texts worked.** Every patristic quotation was matched mechanically against a local plain-text copy (see the method key). A script normalized curly quotes, spacing and the footnote numbers the HTML-stripped texts carry, then looked for each quoted string. Every quotation in the essay matched, with the four exceptions noted on their lines (two Greek glosses removed, one footnote marker, one speech tag, quote-mark style).
- **Search.** One WebSearch call on 2026-10-28 (Canon 20). No page was opened.
- **Scripture.** Every ESV quotation was matched against the local ESV copy (2011 text). None has been checked against esv.org or the ESV API.
- **Left out because it could not be confirmed or would need too much defending:** Gregory of Nyssa's bread-and-baths remark about Constantinople; the claim that Athanasius used violence against the Melitians; the traditional opening date of June 19 (the essay gives only Socrates's May 20); Hosius as the source of the emperor's suggestion of *homoousios*; Larry Hurtado and Richard Bauckham on early devotion to Jesus; Rowan Williams on Arius; Constantine's Sunday law; the Gospel book enthroned at the council.

## Method key

- **"WDB"**: the HistoricalChristianFaith Writings-Database (github.com/HistoricalChristianFaith/Writings-Database), shallow blob-filtered clone at commit 734456b (2026-10-28), read with `git show`, HTML stripped by the writer's script into `scratchpad/nic/txt/*.txt`. Translations are those of the Nicene and Post-Nicene Fathers, Second Series, except Jerome's *Chronicle* (the database's "Jerome, Chronicle (2005) pp.188-332" English translation). Files used: Eusebius, *Life of Constantine* bks 2 to 4 (vc2, vc3, vc4); Socrates, *Ecclesiastical History* bk 1 (soc1); Theodoret, *Ecclesiastical History* bk 1 (thd1); Sozomen bks 1 and 7 (soz1, soz7); Philostorgius (Photius's epitome; philost); Alexander of Alexandria, *Epistles on the Arian Heresy* (alex); Athanasius, *De Decretis* (decretis), *Councils of Ariminum and Seleucia* i.e. *De Synodis* (desynodis), *On the Incarnation* (incarnation), *Discourses Against the Arians* 1 and 2 (ar1, ar2), *To the Bishops of Africa* (afros), Letter 54 to Serapion on the death of Arius (ariusdeath); Jerome, *Dialogue Against the Luciferians* (lucif) and *Chronicle* (jchron); Ignatius, *To the Ephesians* (ignEph); Ambrose, *Exposition of the Christian Faith* bk 1 (ambfide1); Council of Nicaea 325 files (The Nicene Creed, The Synodal Letter, The Canons); Council of Constantinople 381, The Holy Creed (creed381).
- **"Repo creed"**: `scripts/data/history-sources/texts/nicaea-325-creed.html`, identical in text to WDB "The Nicene Creed.html"; `scripts/data/history-sources/PROVENANCE.md` identifies it as Henry R. Percival's NPNF Second Series vol. 14 (1900).
- **"ESV copy"**: `json/ESV.json` in a local clone of lguenth/mdbible (commit fd66568), the ESV 2011 text from a SWORD module. It strips quotation marks inside verses and prints LORD as "Lord"; the essay restores the ESV's LORD and inner quotation marks.
- **"LBC"**: NonlinearFruit/Creeds.json, `creeds/london_baptist_1689.json`, fetched from raw.githubusercontent.com on 2026-10-28 (metadata: Year 1677, Public Domain).
- **"Search, 2026-10-28"**: a WebSearch result summary; no page opened.
- **"General"**: a broad statement the writer judged standard in the field but did not check against a source. Each is marked unverified.

## Standfirst and opening

1. The council met in 325. General (also Socrates 1.13 consular date "consulate of Paulinus and Julian"). Verified for the year by WDB soc1 only through the consular date; the year itself is standard.
2. Most of the world's churches still confess what Nicaea wrote. General: Catholic, Orthodox and most Protestant churches confess the Nicene faith, most often in the 381 form. Unverified as a count.
3. Constantine wrote to Alexandria "late in 324," after defeating Licinius. The letter itself says it came after his victory over his enemies (WDB vc2, *Life of Constantine* 2.67: "As soon, therefore, as I had secured my decisive victory and unquestionable triumph over my enemies, my first enquiry was concerning that object"). Licinius defeated near Chrysopolis: WDB soc1 1.4. The year 324 and "late" in it: General, unverified.
4. Constantine "now ruled the whole Roman world alone." WDB soc1 1.4 ("Constantine thus became possessed of the sole dominion"). Verified.
5. The letter was addressed to Alexander and Arius. WDB vc2, chapter heading 2.64 "Constantine's Letter to Alexander the Bishop, and Arius the Presbyter." Verified.
6. Quotation: "to be of a truly insignificant character, and quite unworthy of such fierce contention." WDB vc2, *Life of Constantine* 2.68 ("I find the cause to be of a truly insignificant character, and quite unworthy of such fierce contention"). Verified verbatim.
7. Quotation: "truly idle question." WDB vc2 2.71 ("in regard to this truly idle question"). Verified verbatim.
8. By the next summer Constantine had summoned bishops from across the empire to Nicaea. WDB vc3 3.6 to 3.7 (bishops "from all quarters"); summer: the council ended at the vicennalia (line 47). Verified in substance.
9. Nicaea was "the largest council the church had yet held." General, unverified. (Earlier councils known to the writer: Antioch 268, Arles 314, Alexander's synod of about 100; none as large as 250 or more.) Verifier: confirm or soften to "a council drawn from across the empire."
10. The emperor did not have the bishops vote Jesus into godhood; the council did not choose the books of the Bible. The creed and synodal letter (WDB) show the council's business; nothing on the canon. See the closed ledger of who-decided-what-books-are-in-the-bible, lines 23 to 29, for the canon point. Verified in substance (absence of evidence).

## How the Argument Began in Alexandria

11. Historians usually date the quarrel to around 318. General, unverified (Hanson's title uses 318 to 381; others put it about 321).
12. Socrates wrote "about a century later." General: Socrates wrote in the 430s to 440s. Unverified.
13. Socrates's account: Alexander was teaching his clergy about the unity of the Trinity when Arius objected. WDB soc1 1.5 ("attempted one day in the presence of the presbytery and the rest of his clergy, to explain ... that great theological mystery—the Unity of the Holy Trinity"). Verified.
14. Quotation: "possessed of no inconsiderable logical acumen". WDB soc1 1.5. Verified verbatim.
15. Quotation: "If," he said, "the Father begat the Son, he that was begotten had a beginning of existence: and from this it is evident, that there was a time when the Son was not." WDB soc1 1.5 ("`If,' said he, `the Father begat the Son, he that was begotten had a beginning of existence: and from this it is evident, that there was a time when the Son was not."). Verified verbatim; the essay writes "he said" for the translation's "said he."
16. "There was a time when the Son was not" became the slogan of the dispute. Supported by the anathemas of the creed (Repo creed: "there was a time when the Son of God was not"), Alexander's letter (WDB soc1 1.6: "There was a period when the Word was not") and Theodoret 1.1 ("There once was a time when He was not"). Verified in substance.
17. Alexander gathered the bishops of Egypt and Libya and they condemned Arius. Quotation "nearly a hundred in number". WDB alex ("we, coming together with the Bishops of Egypt and the Libyas, nearly a hundred in number, have anathematized them"). Verified verbatim. (Socrates 1.6 renders it "to the number of nearly a hundred.")
18. Eusebius was bishop of Nicomedia. WDB thd1 1.4 heading. Verified.
19. Nicomedia was where the emperors of the East kept their court. General (Diocletian's and then Licinius's residence). Unverified.
20. Quotation: "my fellow-Lucianist". WDB thd1 1.4 (Arius's letter: "my fellow-Lucianist, and true Eusebius"). Verified verbatim.
21. Both had studied under Lucian of Antioch. Inference from "fellow-Lucianist"; standard reading. Unverified.
22. Quotation: "We are persecuted ... because we say that the Son has a beginning, but that God is without beginning." WDB thd1 1.4. Verified verbatim.
23. Eusebius took up Arius's cause with bishops across the East. WDB soc1 1.6 (Alexander's letter: Eusebius "daring even to send commendatory letters in all directions concerning them"). Verified in substance.
24. Philostorgius took Arius's side. WDB philost 2.3 (Photius: "Philostorgius extols Arius to the skies"; Philostorgius was himself anti-Nicene). Verified in substance.
25. Arius set his teaching to songs for sailors, millers and travelers. WDB philost 2.2 ("composed several songs to be sung by sailors, and by millers, and by travellers along the high road"). Verified (through Photius's epitome).

## What Arius Was Trying to Protect

26. The church made Arius the villain for centuries. General, unverified (writer's characterization).
27. Christians had just come through the worst persecution in their history (the Great Persecution, 303 to 311/313). General; see the closed ledger of the-early-church-under-rome for the dates. Unverified as "worst."
28. Arius's statement of faith to Alexander. Quotation: "We acknowledge One God, alone Ingenerate, alone Everlasting, alone Unbegun, alone True, alone having Immortality, alone Wise, alone Good, alone Sovereign." WDB desynodis §16. Verified verbatim.
29. Quotation: "perfect creature of God, but not as one of the creatures". WDB desynodis §16. Verified verbatim.
30. Quotation: "perfect God" (in his letter to Eusebius). WDB thd1 1.4 ("as perfect God, only begotten and unchangeable"). Verified verbatim.
31. Arius meant the Son was the first and highest thing the Father made, the one through whom he made everything else. WDB desynodis §16 ("created before times and before ages"; "through whom He has made both the ages and the universe"). Verified in substance.
32. Athanasius reports that Arius's allies kept quoting Proverbs 8. Quotation: "The Lord created me a beginning of His ways unto His works." WDB decretis §13 ("`The Lord created me a beginning of His ways unto His works;' this Eusebius and his fellows used to insist on"). Verified verbatim.
33. The Greek most of these bishops read said "created" (the Septuagint's *ektisen*). General, unverified.
34. The church had long heard Wisdom's voice in Proverbs 8 as the Son's. General (Justin, Origen and others); also implied by both sides using the text in WDB decretis §13. Unverified as a general claim.
35. The ESV, translating the Hebrew, says "possessed" (Proverbs 8:22). ESV copy ("The Lord possessed me at the beginning of his work"). Verified.
36. "the Father is greater than I" (John 14:28). ESV copy. Verified.
37. "the firstborn of all creation" (Colossians 1:15). ESV copy. Verified.
38. Jehovah's Witnesses teach that the Son was the first being God created. General, unverified.
39. Many Americans hold that Jesus was the best man who ever lived and go no further. General description, no figure claimed. Unverified.
40. In the 320s plenty of bishops thought Arius sensible. Supported by Arius's list of sympathizers (WDB thd1 1.4) and the Eusebian party at Nicaea (WDB decretis §§19 to 20). Verified in substance.

## What Christians Already Believed About Jesus

41. "Hear, O Israel: The LORD our God, the LORD is one" (Deuteronomy 6:4). ESV copy. Verified.
42. Every devout Jew confessed the Shema. General, unverified.
43. 1 Corinthians written in the 50s. General, unverified.
44. Quotation of 1 Corinthians 8:6 in full. ESV copy. Verified.
45. "To me every knee shall bow, every tongue shall swear allegiance" (Isaiah 45:23), spoken by Israel's God swearing by himself ("By myself I have sworn," same verse). ESV copy. Verified.
46. Paul applied Isaiah 45:23 to Jesus in Philippians 2:10–11. ESV copy (Philippians 2:10–11: "every knee should bow ... every tongue confess that Jesus Christ is Lord"). Verified by reading.
47. "the Word was God" (John 1:1). ESV copy. Verified.
48. "My Lord and my God!" (John 20:28), Thomas before the risen Jesus, near the Gospel's end. ESV copy. Verified.
49. Ignatius of Antioch, early in the second century, on his way to execution in Rome. General (traditional date under Trajan; some scholars date the letters later). Unverified.
50. Quotation: "our God, Jesus Christ". WDB ignEph ch. 18 ("For our God, Jesus Christ, was, according to the appointment of God, conceived in the womb by Mary"). Verified verbatim.
51. Arius's party worshiped Christ too. Implied by Athanasius's argument in WDB ar2 §24 and by Arius's own confession; general. Unverified as stated.
52. Athanasius was Alexander's young deacon. WDB soc1 1.15 (Alexander "having afterwards ordained him deacon ... brought him to Nicaea to assist him"). "Young": General (born about 296 to 298). Partly verified.
53. "my glory I give to no other" (Isaiah 42:8). ESV copy. Verified.
54. "worshiped and served the creature rather than the Creator" (Romans 1:25). ESV copy. Verified.
55. Quotation: "He had not been thus worshipped, nor been thus spoken of, were He a creature merely." WDB ar2 §24 (*Discourses Against the Arians* 2.24). Verified verbatim. "Later": the Discourses date from the 350s (General).

## The Bishops Gather at Nicaea

56. Nicaea was in Bithynia. WDB vc3 3.6 ("the city Nicaea in Bithynia"). Verified.
57. Near Nicomedia; today İznik in Turkey. General, unverified.
58. Constantine paid the bishops' travel. WDB vc3 3.6 ("he allowed some the use of the public means of conveyance, while he afforded to others an ample supply of horses"). Verified in substance.
59. Socrates dates the opening to May 20. WDB soc1 1.13 ("in the consulate of Paulinus and Julian, on the 20th day of May"). Verified. (Some modern scholars prefer June 19; the essay attributes the date to Socrates.)
60. Eusebius of Caesarea attended and later wrote the emperor's life. General; his presence is shown by his letter (WDB soc1 1.8) and by vc3. Verified in substance.
61. Eusebius counted more than two hundred and fifty bishops. WDB vc3 3.8 ("the number of bishops exceeded two hundred and fifty"). Verified.
62. Quotation: "altogether beyond computation". WDB vc3 3.8 (presbyters, deacons, acolytes and attendants "was altogether beyond computation"). Verified verbatim.
63. Later writers settled on 318. WDB thd1 1.10 ("three hundred and eighteen in number"); soc1 1.8; afros §2 (Athanasius: "318 bishops"). Verified. (Athanasius elsewhere says "three hundred more or less," decretis §3.)
64. Ambrose of Milan saw in the number Abraham's 318. WDB ambfide1, prologue §5 ("three hundred and eighteen priests, appointed, as it were, after the judgment of Abraham"); prologue §3 on Abraham's 318 men. Verified.
65. Genesis 14:14: Abram led out 318 trained men to rescue his kinsman (Lot). ESV copy ("he led forth his trained men, born in his house, 318 of them"). Verified; Lot named from Genesis 14:12 (General).
66. Nearly all the bishops came from the Greek-speaking East. General; vc3 3.7 lists mostly eastern regions with one from Spain. Unverified as "nearly all."
67. The bishop of Rome was kept home by "extreme old age" and sent presbyters. WDB vc3 3.7 ("The prelate of the imperial city was prevented from attending by extreme old age; but his presbyters were present, and supplied his place"). Verified. (The essay does not name Silvester.)
68. Theodoret wrote "more than a century later." General (about 449 to 450). Unverified.
69. Paul, bishop of Neocaesarea on the Euphrates, lost the use of both hands to a red-hot iron under Licinius. WDB thd1 1.6 ("Paul, bishop of Neo-Caesarea, a fortress situated on the banks of the Euphrates, had suffered from the frantic rage of Licinius. He had been deprived of the use of both hands by the application of a red-hot iron"). Verified.
70. Licinius had turned on the Christians of the East only a few years before. General (about 320 to 324); Theodoret's "frantic rage of Licinius" supports the fact, not the dating. Unverified for the dates.
71. Others had lost the right eye or the right arm, among them Paphnutius of Egypt. WDB thd1 1.6 ("Some had had the right eye dug out, others had lost the right arm. Among these was Paphnutius of Egypt"). Socrates 1.11 also: Paphnutius "had been deprived of one of his eyes." Verified.
72. Quotation: "In short, the Council looked like an assembled army of martyrs." WDB thd1 1.6. Verified verbatim.
73. Constantine entered last. WDB thd1 1.6 ("The emperor, with a few attendants, was the last to enter the room"). Verified.
74. In purple and gold; would not sit until the bishops signaled. WDB vc3 3.10 ("a purple robe, and adorned with the brilliant splendor of gold and precious stones"; "he waited until the bishops had beckoned to him, and then sat down"). Verified.
75. He spoke in Latin through an interpreter. WDB vc3 3.13 ("As soon as the emperor had spoken these words in the Latin tongue, which another interpreted"). Verified.
76. Strife inside the church, he said, was more dangerous than any war. WDB vc3 3.12 ("intestine strife within the Church of God, is far more evil and dangerous than any kind of war or conflict"). Paraphrase. Verified.
77. Some bishops brought written accusations against one another; he sealed them with his ring and later burned them in front of everyone, swearing he had not read a word. WDB thd1 1.10 ("formed them into a packet which he sealed with his ring ... burnt them in their presence, at the same time declaring upon oath that he had not read a word of them"). Verified.

## How the Bishops Chose Their Words

78. Athanasius was there as Alexander's deacon. WDB soc1 1.15. Verified (Socrates reports it from Rufinus).
79. Athanasius later described how the creed was written. WDB decretis §§19 to 20. Verified. ("Later": *De Decretis* is usually dated to the 350s, General.)
80. The bishops first proposed Scripture's words: "from God," Word, Wisdom. WDB decretis §19 ("to use instead the acknowledged words of the Scriptures, that the Son is not from nothing but `from God,' and is `Word' and `Wisdom'"). Verified.
81. Quotation: "True Power and Image of the Father". WDB decretis §20 ("the True Power t and Image of the Father"; the stray "t" is a footnote marker in the stripped HTML). Verified.
82. The Eusebian party agreed because Scripture says such things of creatures ("from God," "image"). WDB decretis §§19 to 20 ("There is one God, from whom, all things"; "Man is the image and glory of God"). Verified.
83. Quotation: "caught whispering to each other and winking with their eyes". WDB decretis §20. Verified verbatim.
84. The bishops then wrote "of the substance" and "one in essence." WDB decretis §§19 to 20. Verified. The essay's quoted phrases "of the substance of the Father" and "of one substance with the Father" come from the creed (Repo creed). Verified.
85. *Homoousios* is the Greek word. Repo creed (gloss "o9moou/sion"); soc1 1.8. Verified.
86. Eusebius of Caesarea hesitated before he signed. WDB soc1 1.8 ("who had held aloof for a short time, after mature consideration ... at length acquiesced in it"). Verified.
87. In a letter home he said that when his church's creed was read, the emperor approved it and urged everyone to sign it with the insertion of *homoousios*; the bishops then drew up their creed around that word. WDB soc1 1.8 (Eusebius's letter: "our most pious emperor himself was the first to admit that they were perfectly correct ... exhorting all present to give them their assent, and subscribe to these very articles ... with the insertion, however, of that single word "homoousios" (consubstantial)"; "the bishops on account of the word homoousious, drew up this formula of faith"). Verified. Quotation matched verbatim; the essay uses single inner quotation marks and drops the translator's "(consubstantial)" after the quoted word ends.
88. The block quotation of the creed. Repo creed and WDB "The Nicene Creed.html" (Percival, NPNF2 vol. 14, 1900). Verified verbatim, except that the translator's transliterated Greek glosses "(gennhqe/nta)" after "begotten" and "(o9moou/sion, consubstantialem)" after "of one substance" were removed. The bracketed "[from heaven]" and "[we believe]" are the translator's and are kept.
89. "A translation printed in 1900." Repo PROVENANCE.md (NPNF Second Series vol. 14, 1900). Verified from the provenance note; not checked against a scan.
90. Anathema quotation: "that there was a time when the Son of God was not, or that before he was begotten he was not, or that he was made of things that were not". Repo creed. Verified verbatim except that the translator's Greek gloss "(h!n pote o\#te ou0k h\n)" after the first "was not" was removed. "Or who called him a creature": paraphrase of "or that he is a creature." Verified.
91. The creed most churches recite under Nicaea's name is a longer form linked with Constantinople 381. WDB creed381 (the text, with the editor's note that it may have been an existing creed adopted there). Verified in substance; "linked with" chosen because the attribution is debated.
92. Quotation: "the Lord and Giver-of-Life". WDB creed381. Verified verbatim (hyphens as in the translation).
93. The creed of 325 names the Holy Spirit and stops (before the anathemas). Repo creed. Verified.
94. "Begotten, not made" and "Light of Light" are phrases of the creed. Repo creed. Verified.
95. "the radiance of the glory of God and the exact imprint of his nature" (Hebrews 1:3). ESV copy. Verified.
96. Only two bishops refused to sign, Secundus of Ptolemais and Theonas of Marmarica. WDB philost 1.9 ("all the bishops consented ... with the exception of Secundus, bishop of Ptolemais, and Theon, bishop of Marmarica"); synodal letter names "Theonas of Marmorica and Secundes of Ptolemais" as condemned. Verified. Note: Socrates 1.8 says five objected at first (Eusebius of Nicomedia, Theognis, Maris, Theonas, Secundus); the essay's "only two refused to sign" follows Philostorgius and the outcome.
97. Both were from Libya. General (Ptolemais in Pentapolis, Marmarica in Libya). Unverified.
98. They went into exile with Arius. WDB philost 1.10 ("Secundus, on going into exile"); soc1 1.8 (edict sent Arius into exile). Verified in substance.
99. Eusebius of Nicomedia signed and within three months was exiled too. WDB philost 1.10 ("You subscribed, Eusebius ... within three months after the conclusion of the synod, Eusebius was sent into exile"). Verified (through Photius's epitome).
100. The council set one date for Easter. WDB synodal ("all our brethren in the East who formerly followed the custom of the Jews are henceforth to celebrate the said most sacred feast of Easter at the same time with the Romans and yourselves"); vc3 3.14. Verified.
101. It settled a schism in Egypt. WDB synodal (Meletius). Verified.
102. Twenty canons. General, unverified (WDB "The Canons.html" holds only Canon I).
103. One canon: Christians should pray standing, not kneeling, on Sundays and between Easter and Pentecost (Canon 20). Search, 2026-10-28 (results from religionnews.com and americamagazine.org summarizing Canon 20: "certain persons who kneel on the Lord's Day and in the days of Pentecost ... prayer be made to God standing"; "days of Pentecost" read as the Easter season). Verified by search summary only.
104. Quotation: "that nation of parricides who slew their Lord" in the emperor's letter announcing the Easter decision. WDB vc3 3.18 ("that we might have nothing in common with that nation of parricides who slew their Lord"). Verified verbatim.
105. Christians would repeat that kind of language for centuries, and Jewish communities would pay for it. General, unverified (no specific event claimed).
106. The council ended in the summer as Constantine celebrated twenty years on the throne, with a banquet for the bishops. WDB vc3 3.15 ("About this time he completed the twentieth year of his reign ... the emperor himself invited and feasted with those ministers of God"). "Summer": General (the vicennalia began in July 325). Partly verified.
107. Soldiers lined the entrance with drawn swords; the bishops walked between them into the emperor's rooms. WDB vc3 3.15 ("Detachments of the body-guard and other troops surrounded the entrance of the palace with drawn swords, and through the midst of these the men of God proceeded without fear into the innermost of the imperial apartments"). Verified.
108. Constantine pressed his lips to the wounds of bishops whose eyes had been torn out for the faith. WDB thd1 1.10 ("Observing that some among them had had the right eye torn out, and learning that this mutilation had been undergone for the sake of religion, he placed his lips upon the wounds"). Verified.
109. Quotation: "One might have thought that a picture of Christ's kingdom was thus shadowed forth, and a dream rather than reality." WDB vc3 3.15. Verified verbatim.
110. A few years earlier some of those men had been in an emperor's prisons. Inference from line 69 (Licinius). Unverified as to imprisonment specifically.
111. Constantine wanted one church for one empire. Writer's characterization from vc2 2.65 to 2.72 and vc3 3.12. Interpretation.

## Why the Argument Went On for Fifty Years

112. Within about three years Eusebius of Nicomedia was back. WDB philost 2.7 ("Eusebius, Maris, and Theognis, after a period of three years spent in banishment, were recalled by command of the emperor"). Verified (through Photius).
113. Athanasius became bishop of Alexandria in 328. WDB soc1 1.15 (succeeded Alexander); the year: General, unverified.
114. In 335 Constantine exiled him to Trier, in Gaul. Gaul: WDB philost 2.18 (Athanasius "returned from Gaul" after Constantine's death). The year and Trier: General, unverified.
115. Arius was received at court and died in Constantinople the day before he was to be readmitted to communion. WDB ariusdeath §§2 to 4 (invited by Constantine; Alexander's prayer "If Arius is brought to communion to-morrow"). Verified. The year 336: General, unverified.
116. The next year (337) the dying Constantine was baptized by Eusebius of Nicomedia. WDB jchron (entry before 337: "Constantine, baptized by Eusebius of Nicomedia at the very end of his life"); vc4 4.61 to 4.64 (baptism and death at Pentecost, minister unnamed). Verified.
117. Quotation: "falls into the dogma of Arius". WDB jchron. Verified verbatim.
118. His son Constantius favored bishops who wanted *homoousios* dropped. WDB jchron (Arians "with the support of the ruler, Constantius ... persecuted Athanasius"); lucif §19. Verified in substance.
119. In 359 the bishops at Ariminum, in Italy, were pressed into a creed without it. WDB lucif §§17 to 19 (the creed of Ariminum; "At that moment the term Usia was abolished"). The year 359: General, unverified.
120. Jerome wrote "some twenty years later." General (the *Dialogue* is dated about 379 to 382). Unverified.
121. Quotation: "The whole world groaned, and was astonished to find itself Arian." WDB lucif §19. Verified verbatim.
122. Athanasius was driven from his city five times. General (exiles of 335, 339, 356, 362, 365). Unverified here; the same figure stands in the closed ledger of who-decided-what-books-are-in-the-bible.
123. In Constantinople the Nicene believers met in a small house turned into a chapel where Gregory of Nazianzus preached. WDB soz7 7.5 ("assembled them together in a little dwelling, which had been altered into the form of a house of prayer"). Verified.
124. Quotation: "during forty years in the hands of the Arians". WDB soz7 7.5. Verified verbatim.
125. In 380 Theodosius ordered his subjects to hold the faith of the bishops of Rome and Alexandria. WDB soz7 7.4 ("that faith which Peter ... had, from the beginning, preached to the Romans, and which was professed by Damasus, bishop of Rome, and by Peter, bishop of Alexandria"). Verified; the year 380: General, unverified.
126. Quotation: "should be treated as heretics, regarded with contempt, and delivered over to punishment". WDB soz7 7.4. Verified verbatim (Sozomen's summary of the law, as the essay says).
127. In 381 a council at Constantinople confirmed the faith of Nicaea. WDB soz7 7.7 ("convened a council of orthodox bishops, for the purpose of confirming the decrees of Nicaea"). Verified; the year 381: General (also WDB creed381 heading "a.d. 381"). Verified.
128. R. P. C. Hanson titled his account *The Search for the Christian Doctrine of God* and argued that between 318 and 381 the church was searching for words it did not yet have. General (Hanson, *The Search for the Christian Doctrine of God: The Arian Controversy 318–381*, T&T Clark, 1988). Unverified; summary of his thesis from the writer's knowledge.
129. Many bishops Athanasius called "Arians" had never followed Arius; some resisted *homoousios* fearing it erased the difference between Father and Son. General (Hanson, Ayres and others). Unverified.

## The Strongest Case Against Nicaea

130. Arius rejected "one in essence" by name, listing it with the teaching of Mani. WDB desynodis §16 ("nor as Manichaeus taught that the offspring was a portion of the Father, one in essence"). Verified.
131. Arius's own writings survive mostly in fragments his enemies quoted. General (the *Thalia* in Athanasius; letters in Athanasius, Theodoret, Epiphanius). Unverified.
132. Bart Ehrman left the faith of his youth. General (he has described himself as a former evangelical, now agnostic). Unverified.
133. Ehrman, *How Jesus Became God* (2014): Christians came to call Jesus divine in stages and in more than one sense; ways of speaking about Christ once thought faithful were later ruled heretical. General (HarperOne, 2014). Unverified; the writer's summary of the book's thesis. No quotation.
134. Paul placed Jesus inside the Shema within about twenty-five years of the crucifixion. Inference from lines 43 to 44 (crucifixion about 30 to 33; 1 Corinthians about 53 to 55). General, unverified.
135. For much of the half century after 325 the palace favored Nicaea's opponents. General (Constantine's last years, Constantius, Valens; Constans in the West excepted). Unverified as a characterization.
136. Athanasius granted the terms were not in Scripture word for word and insisted they "contain the sense of the Scriptures". WDB decretis §21 ("even if the expressions are not in so many words in the Scriptures, yet, as was said before, they contain the sense of the Scriptures"). Verified verbatim.
137. Arius's God must make a lesser being to deal with the world; the remote God of the philosophers. Writer's argument, no source claimed.

## Why the Word Still Matters

138. Quotation: "He was made man that we might be made God." WDB incarnation §54.3 (NPNF *On the Incarnation*: "For He was made man that we might be made God"). Verified verbatim.
139. "may become partakers of the divine nature" (2 Peter 1:4). ESV copy. Verified.
140. Quotation: "man had not been deified if joined to a creature, or unless the Son were very God". WDB ar2 §70. Verified verbatim.
141. "Whoever has seen me has seen the Father" (John 14:9), said to Philip. ESV copy. Verified.
142. The creed says the one who "suffered" is God of God. Repo creed. Verified.
143. "For in him the whole fullness of deity dwells bodily" (Colossians 2:9). ESV copy (the verse ends with a comma in the ESV; the essay ends the quotation with a period). Verified.

## The Question We Treat as Small

144. Christian Smith and Melinda Lundquist Denton studied American teenagers in the early 2000s and named the faith many had absorbed "moralistic therapeutic deism." General (*Soul Searching*, Oxford University Press, 2005; National Study of Youth and Religion). Unverified.
145. Summary of that faith: God wants people to be good and happy and stays in the background until needed. Paraphrase of Smith and Denton's summary from the writer's knowledge. Unverified; no quotation marks.
146. James pastors a Baptist church. NOTES.md (confirmed biography). Verified.
147. Baptists have a long suspicion of creeds, learned from state churches that enforced them with fines and prison. General, unverified.
148. Many in free churches say they have no creed but the Bible. General, unverified.
149. English Baptists published their confession in 1677. LBC metadata ("Year": "1677"). Verified.
150. Quotation: "of one substance, power, and Eternity". LBC chapter 2, paragraph 3. Verified verbatim.
151. Quotation: "the foundation of all our Communion with God, and comfortable dependance on him". LBC chapter 2, paragraph 3. Verified verbatim (spelling as in the source).
152. "But who do you say that I am?" (Matthew 16:15). ESV copy. Verified.
153. Some of the men who answered Constantine had lost an eye or the use of their hands. Lines 69 and 71. Verified.

## Closing Texts

154. John 1:14, quoted in full. ESV copy. Verified.
155. Colossians 2:9. ESV copy. Verified (see line 143 on the final punctuation).
156. "Thomas answered him, 'My Lord and my God!'" (John 20:28). ESV copy (the copy strips the inner quotation marks; the ESV prints them). Verified.

## Links

- [the canon came together another way](/writing/who-decided-what-books-are-in-the-bible), [the worst persecution in their history](/writing/the-early-church-under-rome), [what a patron asks in return](/writing/when-the-church-married-empire). All three slugs are in `docs/work/essays/link-targets.json` (checked by script).

## Mechanical scan (2026-10-28)

No em-dash (U+2014). No exclamation point outside quoted Scripture (two, both John 20:28). One semicolon, inside the verbatim creed. No CLAUDE.md forbidden word or phrase, none of the BRIEF.md stamps, no "honest" or "fair," no "steelman," "verdict" or "indictment." About 3,700 words including title, standfirst and Closing Texts; 40 body paragraphs averaging about 85 words.
