# Claims ledger: who-decided-what-books-are-in-the-bible

Essay: `docs/work/essays/who-decided-what-books-are-in-the-bible.md` ("Who Decided What Books Are in the Bible?"). New essay, section Reading the Bible in Its World. The writer drafted the essay and a ledger on 2026-10-28. The verifier checked every claim on 2026-10-28 and rewrote this ledger. Every line below records the result and the method the verifier actually used. Where a line repeats what the writer reported but the verifier did not recheck, it says "writer reported" and nothing rests on it.

## Methods the verifier actually used (2026-10-28)

- **"Library"**: the public GitHub repository HistoricalChristianFaith/Writings-Database, scratchpad clone `wdb` (commit 328918a, dated 2026-10-25), read with `git show 'HEAD:<path>'`. The verifier made its own plain-text extracts on 2026-10-28 (HTML stripped, entities decoded) into `scratchpad/vcanon/src/` rather than reuse the writer's extracts. Files read: Athanasius "From Letter 39 (for 367)"; Eusebius *Church History* Books 3 to 7 and *Life of Constantine* Book 4; Irenaeus *Against Heresies* Books 1 and 3; Justin *First Apology*; Cyril of Jerusalem *Catechetical Lectures* 4; Tertullian *Prescription Against Heretics*; "Caius Presbyter of Rome/Fragments of Caius" (which carries the ANF Canon Muratorianus and its editor's note); "Council of Carthage of 419/The Canons"; Augustine *On Christian Doctrine* Book 2; "Council of Nicaea of 325/The Synodal Letter" and "The Canons"; Jerome's prefaces "Judith v2" (translated by Andrew S. Jacobs, 2004), "Judith" and "The books of Solomon" (translated by Kevin P. Edgecomb, 2006), each file carrying the translator's release into the public domain; and the NPNF "Prefaces to the Books of the Vulgate Version of the Old Testament". Everything else used from the library is NPNF or ANF. No machine-translated Migne material was used.
- **"Quote script"**: `scratchpad/vcanon/bin/qv.py`, written by the verifier. It pulls every double-quoted string from the essay and looks for it in the library extracts, the other texts below and the ESV copy, normalizing only curly quotes, spacing, and footnote numbers glued to words or in brackets; case is kept. Run before and after the corrections: all 54 quoted strings found. 53 match with case; one ("the third book of the Gospel") differs only in the capital letter the source has at the start of its sentence.
- **"ESV copy"**: the ESV text in the public GitHub repository lguenth/mdbible (scratchpad `sources/esv-mdbible`, commit fd66568, dated 2022-01-20), read with `git show`; earlier ledgers identify it as the 2011 ESV text. Recheck every verse with James's ESV API key once it exists.
- **"Search (2026-10-28)"**: WebSearch results seen by the verifier on 2026-10-28. 33 searches were made and every one returned results. The search tool returns a summary of the pages it found; each line names the pages the result quoted or named. Where a line says "printed", the result's own text reproduced the words; where it says "exact-phrase match", the query carried the words in quotation marks and the result reported pages carrying them without reprinting the whole string. No website was opened directly.
- **"Apion"**: Josephus, *Against Apion*, Whiston translation (Project Gutenberg #2849), fetched by the verifier on 2026-10-28 from raw.githubusercontent.com/GITenberg/Against-Apion_2849/master/2849.txt.
- **"Creeds.json"**: `creeds/london_baptist_1689.json` from the public GitHub repository NonlinearFruit/Creeds.json, fetched by the verifier on 2026-10-28 from raw.githubusercontent.com (metadata: Year 1677, Public Domain).
- **"BCP"**: *The Book of Common Prayer and The Scottish Liturgy* (PG #29622), the GITenberg clone already in the scratchpad (`sources/The-Book-of-Common-Prayerand-The-Scottish-Liturgy_29622`), Articles of Religion.
- **"Scrivener"**: F. H. A. Scrivener, *A Plain Introduction to the Criticism of the New Testament*, 4th ed. (1894), vol. I (PG #36548), scratchpad GITenberg clone, read with grep and sed.
- **"EB1911"**: *Encyclopaedia Britannica*, 11th ed., "Athanasius" (vol. 2, PG #34209), scratchpad GITenberg clone, read with grep and sed.
- **"Davidson"**: S. Davidson, *The Canon of the Bible*, 3rd ed. (1880), PG #30132, scratchpad GITenberg clone, read with sed.
- **"Textbook"**: kept without a check this run because it is textbook-certain; said so on the line.
- **"Mechanical scan"**: a script run by the verifier after the corrections: no em-dash (U+2014), no exclamation point, no semicolon outside quotations, no CLAUDE.md forbidden word or phrase, none of the BRIEF.md stamps or rulebook words (the only hit for "the record" is inside the Josephus quotation, "the records of all the past times"). About 4,040 words including title, headings and Closing Texts.

## Corrections made in the essay

1. Opening, Athanasius and Nicaea: "In what survives of his letter, he never mentions it." became "Where he sets out the list, he never mentions it." The verifier read only the NPNF text of Letter 39 (a Coptic section and the Greek sections 2 to 7, which hold the whole list). Search (2026-10-28) found that more of the letter survives in Coptic (David Brakke, "A New Fragment of Athanasius's Thirty-Ninth Festal Letter," *Harvard Theological Review* 103, 2010; a Danish translation from two Coptic manuscripts at tidsskrift.dk), but not what those parts say. The claim was narrowed to the part the verifier read.
2. What Happened at Nicaea, Jerome's Judith: "Around 400" became "Early in the fifth century". Search (2026-10-28): fourthcentury.com dates the Tobit and Judith translation to 407; a scholarly essay at revistas.pucsp.br says Jerome's Old Testament, Tobit and Judith included, was finished in late 404 or more probably 405; Edmon Gallagher's "Why did Jerome Translate Tobit and Judith?" (*Harvard Theological Review* 108, 2015, as summarized) reports Moore and Bogaert putting Judith right after Tobit and Hasselhoff some years later. No source found dated it to 398 or 400.
3. The Gospels and Paul's Letters in Worship, the letter from Laodicea: "Most scholars think that letter from Laodicea is lost." became "That letter from Laodicea is generally thought to be lost." Search (2026-10-28): Wikipedia ("Epistle to the Laodiceans") says the letter "is generally regarded as being lost"; another result claims most scholars take it to be Ephesians; biblicaltraining.org lists a lost letter as one of three options. "Most scholars" could not be supported.

No quotation, Scripture verse or link changed. No other wording changed.

## Voice pass (2026-10-28, final reader)

Wording only. No fact, quotation, number, date, name or link was added, and a script confirmed that all 54 quoted strings and all four links are identical to the verified text. Changes: the standfirst now says "The New Testament was gathered over about three centuries" (it said "The books of the Bible", which overreached for the Old Testament; see line 35); "His list isn't as tidy as it first looks" became "His Old Testament is another matter"; "Most people who think they know" became "Many people" (no count supports "most"); "the same Nicene words, whichever Old Testament lies open on the pulpit" became "the Nicene Creed, whichever Old Testament they read" (the filioque means East and West do not say identical words; see line 61); in the Marcion section the self-implication now reads "I have a shorter Bible of my own, and I could tell you which books are in it" (the old line echoed an approved pilot's image); "The councils didn't create a New Testament. They wrote down the one their churches had been reading" became "The list they sent was the New Testament their churches had already been reading" (line 124); "The strongest form of the skeptic's case" became "The scholarly version of the skeptic's case", and the year after *Lost Christianities* was dropped (line 126); Ehrman's summary lost its triplet (line 127); a missing period after the why-trust-the-bible link was added; the heading "Received More Than Chosen" became "So Who Decided?"; "That is the canon in small. The churches did not make these books the word of God by listing them" became "The lists drawn up centuries later record the same kind of hearing on a larger scale"; "The process was slow, human and argued over. The church never hid that" became "The process was slow and human, and Christians disagreed along the way"; the closing paragraph lost its announced turn and two-beat closer (line 142); the last line now reads "He still speaks through all of it, the Old Testament as much as the New, to anyone who will read it." Mechanical scan after the pass: no em-dash, no en-dash except the verse range 15:3–4, no double hyphen, no exclamation point, no semicolon outside quotations, no forbidden word, no stamp (the only "the record" is inside the Josephus quotation). About 4,000 words.

## Opening (Athanasius's letter of 367)

1. The bishop of Alexandria wrote to the churches of Egypt every year about the date of Easter. Textbook (the festal letters); the library heading of Letter 39 reads "on the Paschal festival". Kept.
2. Athanasius had held the office for nearly forty years by 367. Search (2026-10-28): most results, as summarized, give 328 for his succession; one gives 326. From 328 the figure is 39 years. Kept.
3. He had been driven out of his city five times by 367. EB1911 "Athanasius", read by the verifier: banished at the end of 335; a second expulsion (339); flight in February 356; driven out "for the fourth time" (362); concealment from October 365 to February 366. Five, all before 367. Search (2026-10-28): one result says five exiles under four emperors, another says four. Kept on EB1911.
4. The letter for Easter of 367 is the thirty-ninth Festal Letter. Library file title and heading, read by the verifier.
5. Teachers were passing around books claimed as ancient and holy. Matched in substance, Letter 39 §7 (library): heretics write books, "assigning to them a date, that so, using them as ancient writings, they may find occasion to lead astray the simple." Paraphrase, no quotation marks.
6. Quotation "some few of the simple". Quote script: Letter 39 §2.
7. Quotation "led astray by the similarity of their names with the true books." Quote script: Letter 39 §2.
8. Twenty-two Old Testament books, counted the way Jews counted them. Read by the verifier, Letter 39 §4: "twenty-two books in number; for, as I have heard, it is handed down that this is the number of the letters among the Hebrews."
9. The New Testament list (four Gospels, Acts, seven catholic letters of James, Peter, John and Jude, fourteen of Paul with Hebrews, Revelation). Read by the verifier, Letter 39 §5.
10. These twenty-seven are found in nearly every Christian Bible today. Textbook. Kept as a general statement.
11. His is the earliest list we have that matches ours exactly. Search (2026-10-28): the abstract of Brakke's 2010 *Harvard Theological Review* article, as quoted by the result (apocryphicity.ca, cambridge.org record): the letter "contains the first extant list of precisely the twenty-seven books of the current New Testament canon."
12. Quotation "These are fountains of salvation ... neither let him take ought from these." Quote script (in two pieces): Letter 39 §6.
13. Athanasius was at Nicaea in 325 as a young man attending his bishop. EB1911 "Athanasius", read by the verifier: Bishop Alexander, "whom, after the outbreak of the Arian controversy, he accompanied as archdeacon to the council of Nicaea." Search (2026-10-28): several results, as summarized, say he served Alexander at the council as deacon and secretary.
14. Where he sets out the list he never mentions Nicaea. Corrected (correction 1). Read by the verifier: the whole NPNF text of Letter 39 in the library; Nicaea does not appear.
15. Quotation "handed down". Quote script and reading: Letter 39 §3 ("the books included in the Canon, and handed down, and accredited as Divine").
16. Quotation "by way of remembrance, of matters with which you are acquainted." Quote script: Letter 39 §2.
17. He left Esther out of the canon and placed it with Wisdom, Sirach, Judith, Tobit, the Didache and the Shepherd. Read by the verifier, Letter 39 §7. Athanasius's words are "that which is called the Teaching of the Apostles"; calling it the Didache is the standard identification (textbook), not checked.
18. Quotation "appointed by the Fathers to be read by those who newly join us." Quote script: Letter 39 §7.
19. His Old Testament matches neither the Protestant nor the Catholic one. Read by the verifier, Letter 39 §§4 and 7: Esther outside the canon; Baruch, Lamentations and "the epistle" counted with Jeremiah; Tobit, Judith, Wisdom and Sirach outside.

## What Happened at Nicaea

20. Dan Brown's *The Da Vinci Code* was published in 2003. Textbook. Not searched.
21. In the novel a scholar tells the heroine that Constantine had a new Bible made that left out the gospels showing Jesus as a mortal man. Search (2026-10-28), printed: critiques at str.org, faith.edu and truelifebpc.org.sg quote Teabing to Sophie, "Constantine commissioned and financed a new Bible, which omitted those gospels that spoke of Christ's human traits and embellished those gospels that made Him godlike." Matched in substance. Paraphrase, no quotation marks.
22. Documentaries and online videos repeat the story, usually set at Nicaea. General description. Not checked.
23. Constantine called the council; a few hundred bishops came. Textbook. Not searched.
24. Arius, a priest of Alexandria, taught that the Son was a created being; the council answered with its creed. Textbook for the teaching and the creed. The library's Synodal Letter, read by the verifier, records that "the impiety and transgression of Arius and his adherents" were examined and anathematized.
25. The council settled how the date of Easter would be kept. Library, Synodal Letter, read by the verifier: the brethren in the East "are henceforth to celebrate the said most sacred feast of Easter at the same time with the Romans."
26. It issued twenty canons, none on the books of the Bible. Search (2026-10-28): Wikipedia ("First Council of Nicaea") lists the canons' topics; kolbefoundation.org says the fourth- and fifth-century collections agree "in attributing to this Council only the twenty canons, which we possess today"; no listing names Scripture. One result (orthochristian.com) claims a canon of Scripture, unsupported by the canon lists. The library's canons file holds only Canon I.
27. Jerome translated Judith early in the fifth century. Corrected (correction 2). Search (2026-10-28) as recorded there.
28. Quotation "since the Nicene Council is considered to have counted this book among the number of sacred Scriptures." Quote script: Jerome, Preface to Judith, Jacobs's public-domain translation (library "Jerome/Biblical Prefaces/Judith v2"). Edgecomb's translation of the same sentence (library "Judith"): "because this book is found by the Nicene Council to have been counted among the number of the Sacred Scriptures." "Partly" in the essay: Jerome says he therefore "acquiesced to your request."
29. Nothing in the council's surviving decisions bears out Jerome's remark. Follows from lines 24 to 26.
30. Judith is not in Protestant Bibles. Textbook.
31. After founding Constantinople, Constantine wrote to Eusebius of Caesarea for fifty copies for the city's new churches. Read by the verifier, *Life of Constantine* 4.36 (library): "the city which is called by my name ... the number of churches should also be increased."
32. Quotation "fifty copies of the sacred Scriptures". Quote script: 4.36.
33. Quotation "on prepared parchment in a legible manner, and in a convenient, portable form." Quote script: 4.36.
34. The letter covers trained copyists and two public carriages to bring the books, and nothing about contents. Read by the verifier, 4.36: "professional transcribers thoroughly practiced in their art"; "two of the public carriages for their conveyance"; the contents are named only as "the sacred Scriptures."
35. The process took about three centuries. The writer's synthesis of the dated sources in this ledger (the apostolic letters to Athanasius in 367 and the African councils of 393 to 419). Kept. Voice pass: the standfirst now applies the three centuries to the New Testament, which is what these dates measure; the Old Testament was already in hand.

## The Scriptures Jesus Read

36. Luke 24:44 quotation. ESV copy, exact. Search (2026-10-28): exact-phrase matches on esv.org Luke 24:44 pages for "These are my words that I spoke to you while I was still with you" and for "everything written about me in the Law of Moses and the Prophets and the Psalms must be fulfilled"; the result did not reprint the whole verse.
37. Spoken on the evening of the resurrection. ESV copy, read by the verifier: Luke 24:1 (first day of the week), 24:13 ("That very day"), 24:29 ("toward evening"), 24:33, 24:36 ("As they were talking about these things, Jesus himself stood among them"). Luke's narrative places verse 44 there.
38. The Hebrew Bible's shape is the Law, the Prophets and the Writings, a section that includes the Psalms. Textbook. Search (2026-10-28): a commentary on Luke 24:44 in the results describes Law, Prophets and Psalms as matching how Jews commonly divided their scriptures.
39. Scholars debate whether "the Psalms" there names the whole third section or only the book. General knowledge. Not checked.
40. Josephus wrote *Against Apion* in Rome in the 90s, for Greek readers. Textbook. Not searched.
41. Quotation "only twenty-two books, which contain the records of all the past times; which are justly believed to be divine." Quote script: Apion 1.8 (Whiston). The translator's note marker "[8]" after "books" is left out; the sentence continues after "divine" with a semicolon.
42. Josephus does not name the twenty-two. Read by the verifier, Apion 1.8: five of Moses, thirteen of the prophets, "four books" of hymns and precepts, no titles.
43. Most scholars think the twenty-two are the books of the Hebrew Bible counted differently. General knowledge. Not checked.
44. Romans 3:2 quotation. ESV copy, exact. Search (2026-10-28): esv.org, biblia.com and others carry the wording.

## The Books Catholics and Orthodox Keep

45. Most early Christians read the Old Testament in Greek, the Septuagint, begun in Alexandria in the third century before Christ. Textbook. Not searched.
46. Fourth- and fifth-century Christian copies of the Greek Bible include these books in differing combinations. Textbook. Writer reported Scrivener on Sinaiticus and Vaticanus; the verifier did not recheck that part.
47. Catholics call them deuterocanonical; Protestants call them the Apocrypha. Textbook.
48. Hebrews 11:35 quotation. ESV copy, exact. Search (2026-10-28): the result says the wording matches esv.org (Hebrews 11:35 to 40 pages).
49. Many readers hear in Hebrews 11:35 the seven brothers and their mother of 2 Maccabees 7. Search (2026-10-28): a Bible Study Tools commentary in the results links the verse to the seven brothers and their mother in 2 Maccabees 7. The essay says "many readers," not all. 2 Maccabees itself not opened.
50. Augustine counted Tobit, Judith, the Maccabees, Wisdom and Sirach among the canonical books. Read by the verifier, *On Christian Doctrine* 2.8.13 (library): "Tobias, and Esther, and Judith, and the two books of Maccabees"; Wisdom and Ecclesiasticus "are to be reckoned among the prophetical books"; "these forty-four books."
51. Hippo (393) and Carthage (397) counted them, in the same list as the twenty-seven. Read by the verifier: African Code Canon 24 (library) lists Tobit, Judith, "The Five books of Solomon", two of Maccabees and the twenty-seven, with the note "This is Canon xxxvj. of Hippo., 393"; Davidson, read by the verifier: the Hippo list "includes, besides the Palestinian one, Wisdom, Ecclesiasticus, Tobit, Judith, and the two books of Maccabees. The New Testament canon seems to have agreed exactly with our present one"; "The Council of Carthage (397) repeated the statute." Search (2026-10-28): bible-researcher.com's Latin text of the 397 canon, as summarized, names Tobit, Judith, Esther, two of Maccabees and the twenty-seven.
52. The Western church read these books for more than a thousand years before the Reformation. General statement. Not checked.
53. The Council of Trent defined them as canonical in 1546. Search (2026-10-28): Wikipedia ("Canon of Trent") gives the decree of the fourth session "of 8 April 1546."
54. The Orthodox churches keep them, along with a few more. Textbook. Not checked.
55. Jerome translated the Old Testament from the Hebrew. Textbook.
56. Jerome on Judith, Tobit and the Maccabees, and on Wisdom and Sirach. Read by the verifier, Prologue to the Books of Solomon (Edgecomb, library): "just as the Church also reads the books of Judith, Tobias, and the Maccabees, but does not receive them among the the canonical Scriptures, so also one may read these two scrolls for the strengthening of the people, (but) not for confirming the authority of ecclesiastical dogmas." Paraphrase, no quotation marks. The NPNF "Helmeted" preface (to Samuel and Kings) in the library agrees that Wisdom, Sirach, Judith and Tobias "are not in the canon."
57. Luther's German Bible of 1534 printed them in a section of their own between the Testaments. Search (2026-10-28): Wikipedia ("Protestant Bible", "Luther's canon") and others, as summarized: a separate section after the Old Testament, headed in one rendering "Apocrypha: These Books Are Not Held Equal to the Scriptures, but Are Useful and Good to Read."
58. The King James Version of 1611 included them. Textbook. Not searched.
59. English Baptists published their confession in 1677 and reaffirmed it in 1689. Search (2026-10-28): Wikipedia ("Confession of Faith (1689)"), reformedreader.org and others: first published in London in 1677; a General Assembly of Particular Baptist churches endorsed it in 1689. Creeds.json metadata gives Year 1677.
60. Quotation "no part of the Canon (or rule) of the Scripture." Quote script: London Baptist Confession 1.3 (Creeds.json): "The Books commonly called Apocrypha not being of Divine inspiration, are no part of the Canon (or rule) of the Scripture."
61. Faithful churches have divided over this for five centuries; it sits below the creeds. Judgment. Left open as a second-order question (see Needs James). Voice pass: "confess the same Christ in the same Nicene words" became "confess the same Christ in the Nicene Creed", since the Western text adds the filioque and the Eastern does not. Textbook.

## The Gospels and Paul's Letters in Worship

62. 1 Thessalonians 5:27 quotation. ESV copy, exact. Search (2026-10-28), printed: the result gives the esv.org text as "I put you under oath before the Lord to have this letter read to all the brothers."
63. Colossians 4:16 quotation. ESV copy, exact. Search (2026-10-28): exact-phrase match for "see that you also read the letter from Laodicea" on esv.org and bible.com ESV pages; the query for the first half returned the esv.org page without reprinting it.
64. The letter from Laodicea is generally thought to be lost. Corrected (correction 3).
65. Justin Martyr, in Rome around 150, described a Christian Sunday for the emperor. Textbook (the *First Apology*, addressed to Antoninus Pius). Not searched.
66. Quotation "and the memoirs of the apostles or the writings of the prophets are read, as long as time permits." Quote script: *First Apology* 67 (ANF). Read by the verifier: "all who live in cities or in the country gather together to one place."
67. Quotation "which are called Gospels." Quote script: *First Apology* 66 ("the memoirs composed by them, which are called Gospels").
68. Irenaeus wrote about thirty years after Justin and became bishop of Lyon after the persecution of 177. Textbook; the approved pilot the-early-church-under-rome says he succeeded Pothinus. Not searched.
69. Quotation "It is not possible that the Gospels can be either more or fewer in number than they are." Quote script: *Against Heresies* 3.11.8 (ANF).
70. His reasons: four zones of the world, four winds, four living creatures. Read by the verifier, 3.11.8: "four zones of the world in which we live, and four principal winds"; the four-faced cherubim and the living creatures.
71. He grew up in Asia Minor and served in Gaul. Read by the verifier: Eusebius 5.20.5 (Irenaeus to Florinus, "when I was a boy, I saw thee in lower Asia with Polycarp"); 5.4.1 ("a presbyter of the parish of Lyons").
72. The followers of Valentinus called a writing "the Gospel of Truth". Read by the verifier, 3.11.9 ("those who are from Valentinus").
73. Quotations "their comparatively recent writing" and "agrees in nothing with the Gospels of the Apostles." Quote script: 3.11.9.

## Marcion's Shorter Bible

74. Marcion of Pontus. Read by the verifier, *Against Heresies* 1.27.2.
75. He came to Rome around 140 and broke with the church there around 144. Search (2026-10-28): Wikipedia ("Marcion of Sinope") gives arrival between 135 and 140 and excommunication in 144; New World Encyclopedia gives arrival about 140.
76. He taught that the God of the Old Testament was a lesser god than the Father of Jesus. Read by the verifier, 1.27.2 (Jesus "derived from that father who is above the God that made the world").
77. Quotations "the author of evils" and "delight in war." Quote script: 1.27.2 ("declaring Him to be the author of evils, to take delight in war").
78. He set aside the whole Old Testament. Read by the verifier, 1.27.2 ("abolishing the prophets and the law"). The plain statement is textbook.
79. He kept an edited Luke and ten letters of Paul. Edited Luke and edited Paul: read by the verifier, 1.27.2 ("he mutilates the Gospel which is according to Luke"; "he dismembered the Epistles of Paul"). The number ten: textbook, not checked.
80. Quotation "not with the Gospel, but merely a fragment of it." Quote script: 1.27.2.
81. His churches spread widely and lasted for generations. Textbook. Not checked.
82. About a century ago Adolf von Harnack argued the church built its canon largely in answer to Marcion. Search (2026-10-28): Harnack's *Marcion: Das Evangelium vom fremden Gott* appeared in 1921 (second edition 1924; one article gives 1920); a 1924 review in the results (a *Journal of Theological Studies* PDF at gospelstudies.org.uk) says Marcion "laid the foundations of a New Testament canon" and that his challenge shaped the development of the church's canon. The result did not state the "in answer to him" thesis in those words; it is the standard summary of Harnack. Kept.
83. Others think Marcion only hurried along a process already under way. General description of the debate. Search (2026-10-28): a 2026 survey in the results says recent decades have questioned several of Harnack's postulates.
84. Tertullian, around 200. Textbook (*The Prescription Against Heretics*). Not searched.
85. Quotation "Marcion, by what right do you hew my wood?" Quote script: *Prescription* 37 (ANF).

## The Books That Were Argued Over

86. Eusebius wrote his history early in the fourth century. Textbook.
87. His accepted books. Read by the verifier, *Church History* 3.25.1 to 2 (NPNF).
88. Quotation "if it really seem proper, the Apocalypse of John." Quote script: 3.25.2.
89. Disputed books James, Jude, 2 Peter, 2 and 3 John; quotation "which are nevertheless recognized by many". Read by the verifier and quote script: 3.25.3.
90. Rejected but not heretical: the Shepherd and the Teachings of the Apostles. Read by the verifier, 3.25.4 and 6.
91. The Teachings of the Apostles is probably the Didache. Textbook identification; the essay says "probably."
92. Quotation "cited by the heretics under the name of the apostles," with the gospels of Peter and Thomas. Quote script and reading: 3.25.6.
93. Quotation "cast aside as absurd and impious." Quote script: 3.25.7.
94. Some rejected Hebrews, saying the church of Rome disputed it; quotation "on the ground that it was not written by Paul." Quote script and reading: 3.3.5.
95. Origen thought its ideas Paul's and its wording someone else's. Read by the verifier, 6.25.13 ("the thoughts are those of the apostle, but the diction and phraseology are those of some one who remembered the apostolic teachings").
96. Quotation "But who wrote the epistle, in truth, God knows." Quote script: 6.25.14.
97. Dionysius was bishop of Alexandria in the middle of the third century. Textbook.
98. He did not believe the apostle John wrote Revelation. Read by the verifier, 7.25.7: "I cannot readily admit that he was the apostle, the son of Zebedee."
99. Quotation "But I could not venture to reject the book, as many brethren hold it in high esteem." Quote script: 7.25.4.
100. Cyril of Jerusalem's list from around 350 has no Revelation. Read by the verifier, *Catechetical Lectures* 4.36 (NPNF): Gospels, Acts, seven catholic letters, fourteen of Paul, then "let all the rest be put aside in a secondary rank." Date textbook.
101. He was preparing people for baptism. Textbook (lectures to candidates for baptism).
102. Quotation "And whatever books are not read in Churches, these read not even by thyself." Quote script: 4.36.
103. Dionysius of Corinth wrote to Rome around 170 that his church had read Rome's letter on the Lord's day and would draw advice from it. Read by the verifier, Eusebius 4.23.11: "To-day we have passed the Lord's holy day, in which we have read your epistle. From it, whenever we read it, we shall always be able to draw advice." Date textbook (Soter's episcopate).
104. Quotation "as also from the former epistle, which was written to us through Clement." Quote script: 4.23.11.
105. Quotation "publicly used in a great many churches" (1 Clement, in Eusebius's day). Quote script and reading: 3.16 ("both in former times and in our own").
106. Quotation "has been publicly read in churches." (the Shepherd). Quote script: 3.3.6.
107. Codex Sinaiticus, fourth century, follows Revelation with the Letter of Barnabas and the Shepherd. Scrivener, read by the verifier: its leaves hold "the whole New Testament, Barnabas' Epistle, and a considerable fragment of Hermas' Shepherd." Date textbook.
108. The Muratorian fragment: found by Muratori in the Ambrosian Library in Milan, published 1740, from a seventh- or eighth-century copy missing its beginning. Read by the verifier, ANF note 22 to the Canon Muratorianus (library): "discovered by Muiatori [sic] in the Ambrosian Library at Milan, and published by him in his Antiquitates Italicae in 1740. This manuscript belongs to the seventh or eighth century"; "An acephalous fragment." Muratori's first names are textbook.
109. Quotation "the third book of the Gospel" (Luke), and John the fourth. Quote script (source capitalizes "The" at the start of its sentence) and reading: §1 ("The fourth Gospel is that of John").
110. It recognizes Acts, thirteen letters of Paul, Jude, two letters of John, Wisdom, and the revelations of John and Peter. Read by the verifier, §§2 to 4: Corinthians and Thessalonians twice each, Ephesians, Philippians, Colossians, Galatians, Romans, Philemon, Titus, two to Timothy; "two belonging to the above-named John"; "the book of Wisdom"; "We receive also the Apocalypse of John and that of Peter."
111. Quotation "though some amongst us will not have this latter read in the Church." Quote script: §4.
112. It says nothing of Hebrews, James or Peter's letters. Read by the verifier, the whole ANF text.
113. Quotation "very recently in our times," while Hermas's brother Pius was bishop of Rome. Quote script and reading: §4 (ANF prints "Plus", a misprint for Pius).
114. Quotation "ought to be read; but it cannot be made public in the Church to the people." Quote script: §4 (footnote marker after "public" left out).
115. Most scholars date the list to the late second century, probably in or near Rome, on the strength of "in our times". The ANF note, read by the verifier: the writer "is believed to belong to the latter half of the second century." Search (2026-10-28): C. E. Hill's review (galaxie.com, gospelstudies.org.uk) treats the late-second-century date as the position Hahneman sets out to overturn. Kept.
116. A minority, most fully Geoffrey Hahneman in 1992, argue for a fourth-century Eastern origin. Search (2026-10-28): Hahneman, *The Muratorian Fragment and the Development of the Canon* (Oxford Theological Monographs, Clarendon, 1992), argues for "an Eastern provenance and a fourth-century date," building on Albert Sundberg, "Canon Muratori: A Fourth-Century List," *Harvard Theological Review* 66 (1973) (Hill's review; academic.oup.com; muse.jhu.edu).

## How the Churches Judged

117. The three tests: apostolic origin, use across the churches, agreement with the rule of faith. The writer's summary; matched in substance by Eusebius 3.25.6 to 7 (read by the verifier: "ecclesiastical tradition", use by "ecclesiastical writers", style "at variance with apostolic usage", "out of accord with true orthodoxy") and the Muratorian fragment on the Shepherd.
118. Quotation "to prefer those that are received by all the catholic churches to those which some do not receive." Quote script: *On Christian Doctrine* 2.8.12.
119. The rule of faith was the summary of apostolic teaching that new Christians confessed at baptism. Textbook. Not checked.
120. Serapion, bishop of Antioch, around 200; the church at Rhossus; a gospel under Peter's name; he allowed it unread, then learned of its use for heresy, read it, and found much sound and some things added. Read by the verifier, Eusebius 6.12.2 to 6 ("If this is the only thing which occasions dispute among you, let it be read"; "their mind was involved in some heresy"; "many things in accordance with the true doctrine of the Saviour, but some things added"). Date textbook.
121. Quotation "For we, brethren, receive both Peter ... not handed down to us." Quote script: 6.12.3.
122. Hippo met in 393 with Augustine present; Carthage in 397. Davidson, read by the verifier: "In 393, the African bishops held a council at Hippo ... The Council of Carthage (397) repeated the statute ... Augustine was the animating spirit of both councils." Augustine's presence at Hippo is textbook (he addressed it as a presbyter).
123. In 419 the African bishops gathered their rulings into one code and sent the list to Boniface, bishop of Rome, and to others. Read by the verifier, African Code Canon 24 and its note ("Boniface," i.e., Bishop of Rome). Search (2026-10-28): a result notes that the Boniface reference is anachronistic for 397, which fits placing it in 419.
124. Quotation "that they may confirm this canon, for these are the things which we have received from our fathers to be read in church." Quote script: African Code Canon 24. The sentence after it now reads "The list they sent was the New Testament their churches had already been reading" (voice pass); it rests on the council's own words "received from our fathers to be read in church" and on lines 66 to 73 and 133.

## The Case for Lost Christianities

125. Bart Ehrman is a New Testament scholar at the University of North Carolina at Chapel Hill. Textbook. Not searched this run; the closed ledger for why-trust-the-bible records search results from UNC's own *Endeavors* magazine.
126. He made the case in *Lost Christianities*. Search (2026-10-28): the result names *Lost Christianities* (2003); its *America* magazine review in the results carries the date 2003/12/22 in its URL. The voice pass dropped the year from the essay (the scholar-and-year pattern was repeating); it is verified here if it is wanted back. Oxford University Press as publisher is textbook and is not in the essay.
127. Summary of his argument (voice pass: "It set the criteria and judged the books, and its historians, Eusebius among them, told the story afterward"; same substance). Search (2026-10-28), as summarized from reviews (*America*, deliriumsrealm.com and others): the book treats the Jewish-Christian Ebionites, the Marcionites and various Gnostic groups, and the "proto-orthodox Christians," "those who eventually compiled the canonical books of the New Testament and standardized Christian belief," who won out. Matched in substance. Paraphrase, no quotation marks.
128. Ehrman builds on Walter Bauer, who argued in 1934 that in some regions what was later called heresy came first. Search (2026-10-28): results describe Bauer's challenge to Eusebius's model of an original orthodoxy and say much of Ehrman's writing concentrates on Bauer's thesis. The year 1934 is textbook (*Rechtgläubigkeit und Ketzerei im ältesten Christentum*); the result did not print it.
129. Some losing books survive only in their opponents' summaries. General statement. Not checked.
130. The Gospel of Thomas was found near Nag Hammadi in Egypt in 1945. Search (2026-10-28): Wikipedia ("Gospel of Thomas"): found at Nag Hammadi in December 1945.
131. Quotation "we have learned that his extant second Epistle does not belong to the canon; yet, as it has appeared profitable to many, it has been used with the other Scriptures." Quote script: Eusebius 3.3.1.
132. Scholars still argue over who wrote 2 Peter. General statement. Left open.
133. By the end of the second century the four Gospels and Paul's letters were read in churches from Gaul to Egypt. Irenaeus in Gaul (lines 69 to 71); Clement of Alexandria on the order of the Gospels, Eusebius 6.14.5 to 6, read by the verifier ("the tradition of the earliest presbyters, as to the order of the Gospels"). The general statement is textbook.
134. More than a hundred years before an emperor took any interest. Arithmetic: about 200 against Constantine's conversion about 312.
135. Most scholars date the four Gospels to the first century and the Gospel of Thomas to the second. Search (2026-10-28): Wikipedia ("Gospel of Thomas"): "Most scholars place the composition during the second century," with some proposing earlier or later dates. The Gospels' first-century dating is textbook.
136. Paul's letters from the 50s are the earliest Christian writings we have. Textbook. Not checked.
137. 1 Corinthians 15:3 to 4 quotation. ESV copy, exact. Search (2026-10-28): esv.org and biblia.com pages carry the wording.

## So Who Decided? (heading was "Received More Than Chosen" before the voice pass)

138. Quotation "All the Books of the New Testament, as they are commonly received, we do receive, and account them Canonical." Quote script: Article VI of the Articles of Religion (BCP).
139. The First Vatican Council (1870) taught that the church holds these books sacred because written under the Holy Spirit's inspiration, not because the church approved them afterward. Partly matched. Search (2026-10-28): Wikipedia ("Dei Filius") gives 24 April 1870; a St. Paul Center page in the results renders the passage that the books are held sacred and canonical because, "being written under the inspiration of the Holy Spirit, they have God as their author"; a French encyclopedia page in the results prints the Latin "quod Spiritu Sancto inspirante conscripti Deum habent auctorem." No result printed the clause denying that the books are canonical because the church approved them afterward; that half rests on general knowledge of the text (Denzinger 3006). Paraphrase only, no quotation marks. Kept.
140. 1 Thessalonians 2:13 quotation (body and Closing Texts). ESV copy, exact. Search (2026-10-28): the result says biblia.com and bible.com show the same ESV wording.
141. Quotation "as long as time permits." Quote script: *First Apology* 67.
142. Many American churches read only a few verses on a Sunday; "We will argue for every book in the canon and still hear very little of it read aloud" (voice pass wording, replacing "We defend the whole canon and live on a small part of it"). General observation, no figure. Not checked.
143. On the evening of the resurrection the risen Christ opened the Scriptures to his frightened disciples. ESV copy, read by the verifier: Luke 24:36 to 37 ("startled and frightened"), 24:45 ("Then he opened their minds to understand the Scriptures").
144. John 10:27 quotation (Closing Texts). ESV copy, exact. Search (2026-10-28): esv.org, biblia.com and BibleHub carry the wording.

## Links

Checked by the verifier on 2026-10-28 against `docs/work/essays/link-targets.json` and `client/src/lib/shelf.json`.

- [the persecution there in 177](/writing/the-early-church-under-rome): in link-targets.json; shelf.json status "pending" with a rewrite in `client/public/essays/the-early-church-under-rome.json`, so it is public.
- [How the Bible Gets Translated by the Room You're In](/writing/how-the-bible-gets-translated-by): in link-targets.json; shelf.json status "live".
- [Can You Trust the Bible?](/writing/why-trust-the-bible): in link-targets.json; shelf.json status "pending" with no rewrite in `client/public/essays/` on this branch. The lander should keep this link only once why-trust-the-bible is public.
- [Study Bible](/study/bible): allowed by BRIEF.md.

## Left out on purpose

The writer left these out rather than guess, and the verifier added nothing: the Synodicon Vetus legend of books sorted on the altar at Nicaea; Revelation's absence from the Orthodox lectionary; the Council of Laodicea's canon 60; the Council of Florence (1442); Luther's 1522 remark on James; the number of lines in the Muratorian fragment; the count of bishops at Nicaea; the rabbinic "council of Jamnia"; Melito of Sardis's Old Testament list.

## Still open

- Every Scripture quotation: recheck once against the current ESV with James's API key.
- Line 139: the second half of the Vatican I paraphrase was not printed by any search result.
- Line 82: Harnack's thesis is given in its standard summary; no result printed it in those words.

## Needs James

The Old Testament Apocrypha (deuterocanon) question is stated from both sides and left open as a second-order question, as BRIEF.md requires. James may want to give his own position, or say to publish it open as he did for did-god-command-genocide. The authorship of 2 Peter is mentioned and left open.
