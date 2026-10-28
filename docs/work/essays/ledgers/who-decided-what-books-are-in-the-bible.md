# Claims ledger: who-decided-what-books-are-in-the-bible

Essay: `docs/work/essays/who-decided-what-books-are-in-the-bible.md` ("Who Decided What Books Are in the Bible?"). New essay, section Reading the Bible in Its World. Drafted 2026-10-28 by the writer. A separate verifier checks every line after this.

## Methods the writer actually used (2026-10-28)

No web search was run and no website was opened by the writer. Every "matched" line below was checked by a script (`scratchpad/canon/qcheck.py`) that normalizes curly quotes, spacing and the footnote numbers the HTML-stripped texts carry, then looks for the essay's quoted string inside the source text. All 55 quoted strings in the essay matched a source on 2026-10-28. "Unverified" means the writer relied on general knowledge and did not check it.

- **Patristic library**: public GitHub repository HistoricalChristianFaith/Writings-Database, scratchpad clone `wdb` (commit 328918a, 2026-10-25), read with `git show`, HTML stripped. Only ANF/NPNF translations were used, plus two Jerome prefaces released to the public domain by their translators (Andrew S. Jacobs 2004, Kevin P. Edgecomb 2006). Extracted texts are in `scratchpad/canon/` (ath39, eus3 to eus7, vc4, iren1, iren3, justin1, caius, carth419, aug-doc2, cyril4, jerome-judith, tert-praes).
- **ESV copy**: lguenth/mdbible in `scratchpad/sources/esv-mdbible` (commit fd66568; the 2011 ESV text per earlier ledgers). Recheck with James's ESV API key when it exists.
- **Josephus**: *Against Apion*, Whiston translation, Project Gutenberg #2849, fetched from raw.githubusercontent.com/GITenberg/Against-Apion_2849 on 2026-10-28 (`scratchpad/canon/apion.txt`).
- **Baptist confession**: NonlinearFruit/Creeds.json, `creeds/london_baptist_1689.json`, fetched from raw.githubusercontent.com on 2026-10-28 (metadata: Year 1677, Public Domain).
- **Article VI**: *The Book of Common Prayer and The Scottish Liturgy*, Project Gutenberg #29622 (scratchpad copy), the Articles of Religion.
- **Scrivener**: F. H. A. Scrivener, *A Plain Introduction to the Criticism of the New Testament*, 4th ed. (1894), vol. I, PG #36548 (scratchpad copy).
- **EB1911**: *Encyclopaedia Britannica*, 11th ed., "Athanasius" (vol. 2, PG #34209, scratchpad copy).
- **Davidson**: S. Davidson, *The Canon of the Bible*, 3rd ed. (1880), PG #30132 (scratchpad copy).
- **Mechanical scan**: no em-dash (U+2014), no exclamation point, no semicolon in the writer's own prose (semicolons appear only inside quotations), no CLAUDE.md forbidden word or phrase, none of the BRIEF.md stamps. About 4,020 words including title, headings and Closing Texts.

## Opening (Athanasius's letter of 367)

1. The bishop of Alexandria wrote to the churches of Egypt every year to announce the date of Easter. Source: library heading of Letter 39, "on the Paschal festival"; the yearly custom is general knowledge. Yearly custom unverified.
2. Athanasius had held the office for nearly forty years by 367 (bishop from 328). Unverified (general knowledge).
3. He had been driven out of his city five times by 367. Unverified (general knowledge: exiles of 335, 339, 356, 362, 365).
4. His letter for Easter of 367 is the thirty-ninth Festal Letter. Matched: library file "From Letter 39 (for 367)", NPNF.
5. Teachers were passing around books claimed as ancient and holy. Matched in substance: Letter 39 §7 ("an invention of heretics, who write them when they choose ... assigning to them a date, that so, using them as ancient writings, they may find occasion to lead astray the simple"). Paraphrase.
6. Quotation "some few of the simple". Matched: Letter 39 §2 (NPNF).
7. Quotation "led astray by the similarity of their names with the true books." Matched: Letter 39 §2.
8. He named twenty-two Old Testament books, counted the way Jews counted them. Matched: Letter 39 §4 ("twenty-two books in number; for, as I have heard, it is handed down that this is the number of the letters among the Hebrews").
9. His New Testament: four Gospels, Acts, seven catholic letters (James, Peter, John, Jude), fourteen of Paul with Hebrews among them, Revelation. Matched: Letter 39 §5.
10. These twenty-seven are found in nearly every Christian Bible today ("nearly" allows for the Assyrian Church of the East's shorter canon and the Ethiopian church's broader one). Unverified (general knowledge).
11. His is the earliest list we have that matches the twenty-seven exactly. Unverified here; the same claim stands in the closed ledger of why-trust-the-bible.
12. Quotation "These are fountains of salvation ... neither let him take ought from these." Matched: Letter 39 §6.
13. Athanasius was at Nicaea in 325 as a young man attending his bishop. Matched: EB1911 "Athanasius" ("accompanied as archdeacon to the council of Nicaea"). The essay does not name his office.
14. In what survives of the letter he never mentions Nicaea. Checked by reading the whole NPNF text of Letter 39 in the library (Coptic fragment §1 and the Greek remainder §§2 to 7).
15. Quotation "handed down". Matched: Letter 39 §3 ("the books included in the Canon, and handed down, and accredited as Divine").
16. Quotation "by way of remembrance, of matters with which you are acquainted." Matched: Letter 39 §2.
17. He left Esther out of the canon and placed it with Wisdom, Sirach, Judith, Tobit, the Didache ("the Teaching of the Apostles") and the Shepherd among books to be read. Matched: Letter 39 §7.
18. Quotation "appointed by the Fathers to be read by those who newly join us." Matched: Letter 39 §7.
19. His Old Testament matches neither the Protestant nor the Catholic one. Inference from Letter 39 §§4 and 7 (Esther outside; Baruch, Lamentations and the Letter of Jeremiah counted with Jeremiah; Tobit, Judith, Wisdom, Sirach outside). Matched by reading.

## What Happened at Nicaea

20. Dan Brown's novel *The Da Vinci Code* was published in 2003. Unverified (general knowledge).
21. In the novel a scholar (Teabing) tells the heroine (Sophie) that Constantine had a new Bible made that left out the gospels showing Jesus as a mortal man. Unverified; from the writer's memory of the novel. Paraphrase only, no quotation.
22. Documentaries and online videos repeat the story, usually set at Nicaea. General description. Unverified.
23. Constantine called the council; a few hundred bishops came. Unverified (general knowledge; traditional count 318, modern estimates about 250 to 300).
24. Arius, a priest of Alexandria, taught that the Son was a created being; the council answered with its creed. Unverified (general knowledge). The library holds the Creed and Synodal Letter but the writer did not open the creed.
25. The council settled how the date of Easter would be kept. Matched in substance: library "Council of Nicaea of 325/The Synodal Letter" (those who followed the Jewish reckoning "are henceforth to celebrate the said most sacred feast of Easter at the same time with the Romans").
26. It issued twenty canons, none on the books of the Bible. Unverified (general knowledge). The library's canons file holds only Canon I, so the writer could not read all twenty there.
27. Jerome translated Judith into Latin around 400. Date unverified (commonly put near 398 to 407).
28. Quotation "since the Nicene Council is considered to have counted this book among the number of sacred Scriptures." Matched: Jerome, Preface to Judith, Andrew S. Jacobs's public-domain translation (library "Jerome/Biblical Prefaces/Judith v2"). Edgecomb's translation of the same line reads "because this book is found by the Nicene Council to have been counted among the number of the Sacred Scriptures."
29. Nothing in the council's surviving decisions bears out Jerome's remark. Unverified (follows from line 26).
30. Judith is not in Protestant Bibles. General knowledge.
31. After founding Constantinople, Constantine wrote to Eusebius of Caesarea for fifty copies for the city's new churches. Matched: Eusebius, *Life of Constantine* 4.36 (NPNF, library): "the city which is called by my name ... the number of churches should also be increased".
32. Quotation "fifty copies of the sacred Scriptures". Matched: *Life of Constantine* 4.36.
33. Quotation "on prepared parchment in a legible manner, and in a convenient, portable form." Matched: *Life of Constantine* 4.36.
34. The letter covers trained copyists and two public carriages to bring the books, and says nothing about contents. Matched by reading 4.36 ("professional transcribers thoroughly practiced in their art"; "two of the public carriages for their conveyance").
35. The process took about three centuries. Writer's synthesis of the dated sources in this ledger (from the apostolic letters to Athanasius 367 and the African councils 393 to 419).

## The Scriptures Jesus Read

36. Luke 24:44 quotation. Matched: ESV copy.
37. Spoken on the evening of the resurrection. Matched: ESV copy, Luke 24:1, 13, 29, 33, 36 (same day, toward evening).
38. The Hebrew Bible's shape is the Law, the Prophets and the Writings, a section that includes the Psalms. Unverified (general knowledge).
39. Scholars debate whether "the Psalms" in Luke 24:44 names the whole third section or only the book. Unverified (general knowledge).
40. Josephus wrote *Against Apion* in Rome in the 90s, to Greek readers. Unverified (general knowledge).
41. Quotation "only twenty-two books, which contain the records of all the past times; which are justly believed to be divine." Matched: *Against Apion* 1.8, Whiston (PG #2849). The translator's note marker "[8]" after "books" is left out.
42. Josephus does not name the twenty-two. Matched by reading 1.8 (he groups them: five of Moses, thirteen of the prophets, four of hymns and precepts).
43. Most scholars think the twenty-two are the books of the Hebrew Bible counted differently. Unverified (general knowledge).
44. Romans 3:2 quotation "the Jews were entrusted with the oracles of God". Matched: ESV copy.

## The Books Catholics and Orthodox Keep

45. Most early Christians read the Old Testament in Greek, the Septuagint, begun in Alexandria in the third century before Christ. Unverified (general knowledge).
46. Fourth- and fifth-century Christian copies of the Greek Bible include, in differing combinations, Tobit, Judith, Wisdom, Sirach, Maccabees, Baruch, and longer Esther and Daniel. Partly matched: Scrivener vol. I (Sinaiticus has Tobit and 1 and 4 Maccabees; Vaticanus lacks the Maccabees). The full list is general knowledge, unverified.
47. Catholics call them deuterocanonical; Protestants call them the Apocrypha. General knowledge.
48. Hebrews 11:35 quotation. Matched: ESV copy.
49. Many readers hear in Hebrews 11:35 the seven brothers and their mother of 2 Maccabees 7, who die confessing that God will raise them. Unverified (common in commentaries; 2 Maccabees not checked).
50. Augustine counted Tobit, Judith, the Maccabees, Wisdom and Sirach among the canonical books. Matched: *On Christian Doctrine* 2.8.13 (NPNF, library).
51. The councils of Hippo (393) and Carthage (397) listed them in the same list as the twenty-seven New Testament books. Matched: Code of Canons of the African Church, Canon 24 (NPNF, library "Council of Carthage of 419"), with the editor's note "This is Canon xxxvj. of Hippo., 393"; the list has Tobit, Judith, "The Five books of Solomon" and two of Maccabees, and the twenty-seven. Davidson (PG #30132): Carthage 397 "repeated the statute of its predecessor."
52. The Western church read these books for more than a thousand years before the Reformation. General statement, unverified.
53. The Council of Trent defined them as canonical in 1546. Unverified (general knowledge: fourth session, 8 April 1546).
54. The Orthodox churches keep them, along with a few more. Unverified (general knowledge).
55. Jerome translated the Old Testament from the Hebrew. General knowledge.
56. Jerome wrote that the church reads Judith, Tobit and the Maccabees without receiving them as canonical, and that Wisdom and Sirach may be read to strengthen the people but not to establish doctrine. Matched in substance: Jerome, Prologue to the Books of Solomon, Edgecomb's public-domain translation (library): "just as the Church also reads the books of Judith, Tobias, and the Maccabees, but does not receive them among the the canonical Scriptures, so also one may read these two scrolls for the strengthening of the people, (but) not for confirming the authority of ecclesiastical dogmas." Paraphrase, no quotation marks.
57. Luther's German Bible of 1534 printed them in a separate section between the Testaments. Unverified (general knowledge).
58. The King James Version of 1611 included them. Unverified (general knowledge).
59. English Baptists published their confession in 1677 and reaffirmed it in 1689. Partly matched: Creeds.json metadata (title "1689 London Baptist Confession", Year 1677). The 1689 assembly is general knowledge, unverified.
60. Quotation "no part of the Canon (or rule) of the Scripture." Matched: London Baptist Confession 1.3 (Creeds.json).
61. Faithful churches have divided over this for five centuries; it sits below the creeds. Judgment. Left open as a second-order question (see needs_james below).

## The Gospels and Paul's Letters in Worship

62. 1 Thessalonians 5:27 quotation. Matched: ESV copy.
63. Colossians 4:16 quotation. Matched: ESV copy.
64. Most scholars think the letter from Laodicea is lost (some identify it with Ephesians). Unverified (general knowledge).
65. Justin Martyr, in Rome around 150, described a Christian Sunday for the emperor (the *First Apology*, addressed to Antoninus Pius). Date and setting unverified (general knowledge).
66. Quotation "and the memoirs of the apostles or the writings of the prophets are read, as long as time permits." Matched: *First Apology* 67 (ANF, library).
67. Quotation "which are called Gospels." Matched: *First Apology* 66 ("the memoirs composed by them, which are called Gospels").
68. Irenaeus wrote about thirty years after Justin (around 180) and became bishop of Lyon after the persecution of 177. Unverified (general knowledge; the approved pilot the-early-church-under-rome states the succession).
69. Quotation "It is not possible that the Gospels can be either more or fewer in number than they are." Matched: *Against Heresies* 3.11.8 (ANF, library).
70. His reasons: four zones of the world, four winds, four living creatures. Matched: 3.11.8.
71. He grew up in Asia Minor. Matched: Eusebius, *Church History* 5.20.5 (Irenaeus to Florinus: "when I was a boy, I saw thee in lower Asia with Polycarp"). Served in Gaul: matched, Eusebius 5.4.1 ("a presbyter of the parish of Lyons").
72. The followers of Valentinus called a writing "the Gospel of Truth". Matched: *Against Heresies* 3.11.9.
73. Quotations "their comparatively recent writing" and "agrees in nothing with the Gospels of the Apostles." Matched: 3.11.9.

## Marcion's Shorter Bible

74. Marcion of Pontus. Matched: *Against Heresies* 1.27.2 ("Marcion of Pontus").
75. He came to Rome around 140 and broke with the church there around 144. Unverified (general knowledge).
76. He taught that the God of the Old Testament was a lesser god than the Father of Jesus. Matched in substance: 1.27.2.
77. Quotations "the author of evils" and "delight in war." Matched: 1.27.2 ("declaring Him to be the author of evils, to take delight in war").
78. He set aside the whole Old Testament. Matched in substance: 1.27.2 ("abolishing the prophets and the law"). The plain statement is general knowledge.
79. He kept an edited Luke and ten letters of Paul. Edited Luke and edited Paul matched: 1.27.2. The number ten is unverified (general knowledge).
80. Quotation "not with the Gospel, but merely a fragment of it." Matched: 1.27.2 ("furnishing them not with the Gospel, but merely a fragment of it").
81. His churches spread widely and lasted for generations. Unverified (general knowledge).
82. About a century ago Adolf von Harnack argued the church built its canon largely in answer to Marcion (his *Marcion*, 1921). Unverified.
83. Others think Marcion only hurried along a process already under way. Unverified (general description of the debate).
84. Tertullian, around 200. Date unverified (*The Prescription Against Heretics* is commonly dated about 200).
85. Quotation "Marcion, by what right do you hew my wood?" Matched: Tertullian, *The Prescription Against Heretics* 37 (ANF, library).

## The Books That Were Argued Over

86. Eusebius wrote his history of the church early in the fourth century. Unverified (general knowledge).
87. His accepted books: four Gospels, Acts, Paul's letters, 1 John, 1 Peter, and Revelation "if it really seem proper". Matched: *Church History* 3.25.1 to 2 (NPNF).
88. Quotation "if it really seem proper, the Apocalypse of John." Matched: 3.25.2.
89. Disputed books James, Jude, 2 Peter, 2 and 3 John; quotation "which are nevertheless recognized by many". Matched: 3.25.3.
90. Rejected but not heretical books include the Shepherd and the Teachings of the Apostles. Matched: 3.25.4, 6 (distinguished from the heretical books "known to most ecclesiastical writers").
91. The Teachings of the Apostles is probably the Didache. Unverified (standard identification; the essay says "probably").
92. Quotation "cited by the heretics under the name of the apostles," with the gospels of Peter and Thomas. Matched: 3.25.6.
93. Quotation "cast aside as absurd and impious." Matched: 3.25.7.
94. Some rejected Hebrews, saying the church of Rome disputed it; quotation "on the ground that it was not written by Paul." Matched: 3.3.5.
95. Origen thought the thoughts Paul's and the wording someone else's. Matched: 6.25.13.
96. Quotation "But who wrote the epistle, in truth, God knows." Matched: 6.25.14 (Origen quoted by Eusebius).
97. Dionysius was bishop of Alexandria in the middle of the third century. Unverified (general knowledge, about 248 to 264).
98. He did not believe the apostle John wrote Revelation. Matched: 7.25.7 to 8.
99. Quotation "But I could not venture to reject the book, as many brethren hold it in high esteem." Matched: 7.25.4.
100. Cyril of Jerusalem's list from around 350 has no Revelation. Matched: *Catechetical Lectures* 4.36 (NPNF, library). Date unverified (general knowledge, about 348 to 350).
101. He was preparing people for baptism. General knowledge (the lectures are to candidates for baptism).
102. Quotation "And whatever books are not read in Churches, these read not even by thyself." Matched: 4.36.
103. Dionysius of Corinth wrote to the church at Rome around 170 that they had read Rome's letter on the Lord's day and would draw advice from it. Matched in substance: Eusebius 4.23.11 ("To-day we have passed the Lord's holy day, in which we have read your epistle. From it, whenever we read it, we shall always be able to draw advice"). Date unverified (Soter's episcopate, about 166 to 174).
104. Quotation "as also from the former epistle, which was written to us through Clement." Matched: 4.23.11.
105. Quotation "publicly used in a great many churches" (1 Clement, in Eusebius's day). Matched: 3.16 ("publicly used in a great many churches both in former times and in our own").
106. Quotation "has been publicly read in churches." (the Shepherd). Matched: 3.3.6.
107. Codex Sinaiticus, fourth century, follows Revelation with the Letter of Barnabas and the Shepherd. Matched: Scrivener vol. I ("the whole New Testament, Barnabas' Epistle, and a considerable fragment of Hermas' Shepherd"; "the treatises of Barnabas and Hermas in the Cod. Sinaiticus").
108. The Muratorian fragment: Ludovico Antonio Muratori found it in the Ambrosian Library in Milan and published it in 1740, from a seventh- or eighth-century copy with its beginning missing. Matched: ANF note to "Canon Muratorianus" (library "Caius Presbyter of Rome/Fragments of Caius", note 22: "discovered by Muratori in the Ambrosian Library at Milan, and published by him in his Antiquitates Italicae in 1740. This manuscript belongs to the seventh or eighth century"; "acephalous"). Muratori's first names are general knowledge.
109. Quotation "the third book of the Gospel" (Luke), and John the fourth. Matched: Canon Muratorianus §1 (ANF).
110. It recognizes Acts, thirteen letters of Paul, Jude, two letters of John, the Wisdom of Solomon, and the revelations of John and of Peter. Matched by reading §§2 to 4 (Paul: Corinthians, Ephesians, Philippians, Colossians, Galatians, Thessalonians, Romans, Philemon, Titus, two to Timothy).
111. Quotation "though some amongst us will not have this latter read in the Church." Matched: §4.
112. It says nothing of Hebrews, James or Peter's letters. Matched by reading the whole ANF text.
113. Quotation "very recently in our times," while Hermas's brother Pius was bishop of Rome. Matched: §4 (ANF prints "Plus", a misprint for Pius).
114. Quotation "ought to be read; but it cannot be made public in the Church to the people." Matched: §4 (ANF footnote marker after "public" left out).
115. Most scholars date the list to the late second century, probably in or near Rome, on the strength of "in our times". Unverified (general knowledge; the ANF note says the writer "is believed to belong to the latter half of the second century").
116. A minority, most fully Geoffrey Hahneman in 1992, argue for a fourth-century Eastern origin. Unverified (Hahneman, *The Muratorian Fragment and the Development of the Canon*, Oxford, 1992; Albert Sundberg argued the same in 1973 but is not named in the essay).

## How the Churches Judged

117. The three tests: apostolic origin, use across the churches, agreement with the rule of faith. Writer's summary; matched in substance by Eusebius 3.25.6 to 7 (ecclesiastical tradition, use by ecclesiastical writers, style "at variance with apostolic usage", "out of accord with true orthodoxy") and the Muratorian fragment on the Shepherd.
118. Quotation "to prefer those that are received by all the catholic churches to those which some do not receive." Matched: Augustine, *On Christian Doctrine* 2.8.12 (NPNF, library).
119. The rule of faith was the summary of apostolic teaching that new Christians confessed at baptism. Unverified (general knowledge; compare Irenaeus, *Against Heresies* 1.9.4, not opened).
120. Serapion, bishop of Antioch, around 200; the church at Rhossus; a gospel under Peter's name; he allowed it unread, then learned of its use for heresy, read it, and found much sound and some things added. Matched: Eusebius 6.12.2 to 6. Date unverified (general knowledge).
121. Quotation "For we, brethren, receive both Peter ... not handed down to us." Matched: 6.12.3.
122. Hippo met in 393 with Augustine present; Carthage in 397. Matched: Davidson (PG #30132): "In 393, the African bishops held a council at Hippo ... The Council of Carthage (397) repeated the statute ... Augustine was the animating spirit of both councils." Augustine's presence at Hippo is also general knowledge.
123. In 419 the African bishops gathered their rulings into one code and sent the list to Boniface, bishop of Rome, and to other bishops. Matched: African Code Canon 24 and the NPNF note ("Boniface," i.e., Bishop of Rome).
124. Quotation "that they may confirm this canon, for these are the things which we have received from our fathers to be read in church." Matched: African Code Canon 24 (NPNF).

## The Case for Lost Christianities

125. Bart Ehrman is a New Testament scholar at the University of North Carolina at Chapel Hill. Unverified (general knowledge).
126. He made the case in *Lost Christianities* (2003). Unverified (Oxford University Press, 2003).
127. Summary of his argument: many Christianities in the second century (law-keeping believers with a human messiah, Marcionites, Gnostic groups), one group won, he calls it proto-orthodox, it set the criteria and told the story through Eusebius. Paraphrase from the writer's knowledge of the book. Unverified; no quotation used.
128. Ehrman builds on Walter Bauer, who argued in 1934 that in some regions what was later called heresy came first. Unverified (Bauer, *Rechtgläubigkeit und Ketzerei im ältesten Christentum*, 1934).
129. Some losing books survive only in their opponents' summaries. General statement, unverified.
130. The Gospel of Thomas was found in a buried collection near Nag Hammadi in Egypt in 1945. Unverified (general knowledge; Greek fragments were found earlier at Oxyrhynchus, not mentioned).
131. Quotation "we have learned that his extant second Epistle does not belong to the canon; yet, as it has appeared profitable to many, it has been used with the other Scriptures." Matched: Eusebius 3.3.1.
132. Scholars still argue over who wrote 2 Peter. General statement. Left open.
133. By the end of the second century the four Gospels and Paul's letters were read in churches from Gaul to Egypt. Partly matched: Irenaeus (Gaul) above; Clement of Alexandria on the order of the Gospels, Eusebius 6.14.5. General knowledge otherwise, unverified.
134. That was more than a hundred years before an emperor took any interest. Arithmetic: about 200 against Constantine's conversion about 312.
135. Most scholars date the four Gospels to the first century and the Gospel of Thomas to the second. Unverified (general statement of scholarly opinion).
136. Paul's letters from the 50s are the earliest Christian writings we have. Unverified (general knowledge).
137. 1 Corinthians 15:3 to 4 quotation. Matched: ESV copy.

## Received More Than Chosen

138. Quotation "All the Books of the New Testament, as they are commonly received, we do receive, and account them Canonical." Matched: Article VI of the Articles of Religion (PG #29622).
139. The First Vatican Council (1870) taught that the church holds these books sacred because written under the Holy Spirit's inspiration, not because the church approved them afterward. Unverified (Dogmatic Constitution *Dei Filius*, chapter 2). Paraphrase only.
140. 1 Thessalonians 2:13 quotation (body and Closing Texts). Matched: ESV copy.
141. Quotation "as long as time permits." Matched: Justin, *First Apology* 67.
142. Many American churches read only a few verses aloud on a Sunday. General observation, unverified.
143. On the evening of the resurrection the risen Christ opened the Scriptures to his frightened disciples. Matched: ESV copy, Luke 24:36 to 37 ("startled and frightened") and 24:45 ("Then he opened their minds to understand the Scriptures").
144. John 10:27 quotation (Closing Texts). Matched: ESV copy.

## Links

- [the persecution there in 177](/writing/the-early-church-under-rome): live (pilot, PR #539); listed in link-targets.json.
- [How the Bible Gets Translated by the Room You're In](/writing/how-the-bible-gets-translated-by): status "live" in shelf.json and in link-targets.json "live".
- [Can You Trust the Bible?](/writing/why-trust-the-bible): listed in link-targets.json shelf; status "pending" in shelf.json until the Doubt batch lands. why-trust-the-bible already links to this essay. If this essay lands first, the lander should keep the link only once why-trust-the-bible is public.
- [Study Bible](/study/bible): allowed by BRIEF.md.

## Left out on purpose

Details the writer considered and left out rather than guess: the Synodicon Vetus legend of books sorted on the altar at Nicaea; Revelation's absence from the Orthodox lectionary; the Council of Laodicea's canon 60; the Council of Florence (1442); Luther's 1522 remark on James; the exact number of lines in the Muratorian fragment; the exact count of bishops at Nicaea; the rabbinic "council of Jamnia" (drafted, then cut for length); Melito of Sardis's Old Testament list (Eusebius 4.26.13 to 14, matched in the library but cut for length).

## Needs James

The Old Testament Apocrypha (deuterocanon) question is stated from both sides and left open as a second-order question, as BRIEF.md requires. James may want to give his own position, or say to publish it open as he did for did-god-command-genocide. The authorship of 2 Peter is mentioned and left open.
