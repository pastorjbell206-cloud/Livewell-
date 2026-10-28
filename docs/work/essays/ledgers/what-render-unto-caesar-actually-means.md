# Claims ledger: what-render-unto-caesar-actually-means

Essay: `docs/work/essays/what-render-unto-caesar-actually-means.md` ("What Did Jesus Mean by "Render Unto Caesar"?"). Rewrite of the live machine-generated essay of the same slug (published 2026-06-09), folding in `the-church-captive-to-the-culture-war` and `the-third-temptation`. Faith and Power section. Writer's ledger, 2026-10-28. A separate verifier checks everything after this.

## Methods (what each word below means)

- **ESV copy**: every quoted verse with a reference was matched by script (`scratchpad/rc/esvcheck2.py`, a copy of the Romans 13 writer's `r13tools/esvcheck.py` with more books) against the ESV text in the GitHub repository lguenth/mdbible (clone at `scratchpad/esv-mdbible`, commit fd66568). OK = matched loose and strict; LOOSE = matched once case and inner quotation marks are ignored (this copy drops inner quotation marks and prints LORD as "Lord"). Quoted phrases without a reference beside them were checked by eye against the same copy. This copy is not esv.org or the ESV API. **Every Scripture line is "unverified against esv.org / ESV API"** until James's key or a search check confirms it.
- **KJV copy**: aruljohn/Bible-kjv JSON (raw.githubusercontent.com, fetched 2026-10-28), Matthew.json, Mark.json, Luke.json.
- **SBLGNT**: MorphGNT SBLGNT files fetched from raw.githubusercontent.com/morphgnt/sblgnt (61-Mt, 62-Mk, 63-Lk, 64-Jn, 72-Col) into `scratchpad/rc/`; Romans from `scratchpad/r13src/ro.txt`.
- **Patristic library**: HistoricalChristianFaith/Writings-Database clone at `scratchpad/sources/Writings-Database` (commit 328918a), ANF/NPNF translations, read with `git show` and stripped of HTML into `scratchpad/rc/` (tert-idol.txt, justin1.txt, auxentius.txt, amb20.txt, amb40.txt, amb41.txt).
- **Ayer**: Joseph Cullen Ayer, *A Source Book for Ancient Church History* (1913), Gutenberg #24979 via GITenberg clone at `scratchpad/sources/A-Source-Book-for-Ancient-Church-History_24979/24979-0.txt`, "Passion of the Scilitan Martyrs" (Ayer's translation from J. A. Robinson's text), lines 2718-2812.
- **Whiston**: Josephus, *Antiquities of the Jews*, tr. William Whiston, Gutenberg #2848 fetched from raw.githubusercontent.com/GITenberg/Antiquities-of-the-Jews_2848/master/2848.txt into `scratchpad/rc/jos-ant.txt`.
- **Garnett**: Dostoevsky, *The Brothers Karamazov*, tr. Constance Garnett, Gutenberg #28054 via GITenberg clone at `scratchpad/sources/The-Brothers-Karamazov_28054/28054-0.txt`.
- **Search (2026-10-28)**: a WebSearch result read in this run; the tool returns a summary of result pages, not the pages themselves.
- **Textbook**: a fact the writer judged standard and did not check in this run. Marked unverified.

## Title and standfirst

- Title "What Did Jesus Mean by "Render Unto Caesar"?" is the title NOTES.md lists for this slug. No check needed.
- Standfirst: Jesus said it "in the temple during the last week of his life". ESV copy: Mark 11:27 ("as he was walking in the temple"), 12:13-17 follows; Mark 14-15 put the crucifixion days later. Verified from the text.

## Opening

- Quotation (KJV): "Render therefore unto Caesar the things which are Caesar's; and unto God the things that are God's" (Matthew 22:21, KJV). KJV copy: exact match. (Luke 20:25 KJV also reads "Render therefore unto Caesar"; Mark 12:17 KJV reads "Render to Caesar".)
- "People who never otherwise quote Jesus know this line"; the line's uses about elections and taxes. Observation, not a checkable claim.

## The Question in the Temple

- Matthew, Mark and Luke all tell the story; Mark's is the shortest (Mark 12:13–17; Matthew 22:15-22; Luke 20:20-26). ESV copy: all three passages read in this pass; Mark's is the shortest by verse count (5 verses against 8 and 7).
- Before the question: Jesus rode into the city to a crowd's welcome (Mark 11:1-10), overturned the tables of the money-changers (Mark 11:15), told the parable of the tenants (Mark 12:1-11). Verified from the text (ESV copy, Mark 11:15 read; Mark 11:1-10 and 12:1-11 by textbook knowledge of the chapters, unverified in this pass by line).
- The chief priests, scribes and elders (Mark 11:27) are the subject of Mark 12:12. ESV copy: Mark 11:27 read ("the chief priests and the scribes and the elders came to him").
- Quotation: "perceived that he had told the parable against them" (Mark 12:12). ESV copy: OK.
- "They wanted him arrested, but they were afraid of the crowd." Paraphrase of Mark 12:12 ("they were seeking to arrest him but feared the people"). ESV copy.
- Quotation: "And they sent to him some of the Pharisees and some of the Herodians, to trap him in his talk" (Mark 12:13). ESV copy: OK.
- Pharisees devoted to keeping the law of Moses and respected by ordinary people. Textbook (Josephus, *Antiquities* 18.1.3, says the Pharisees have great influence with the people; Whiston file has the section, not quoted). Unverified wording.
- Herodians "as far as we can tell" partisans of the Herod family, whose power depended on Rome. Textbook; hedged in the essay. Unverified.
- Quotation: the Pharisees "held counsel with the Herodians against him, how to destroy him" (Mark 3:6), in Galilee. ESV copy: OK. Galilee setting: Mark 1:14-3:6 is set in Galilee (textbook; Capernaum, Mark 2:1).
- Quotation: "Teacher, we know that you are true and do not care about anyone's opinion. For you are not swayed by appearances, but truly teach the way of God." (Mark 12:14, first half). ESV copy: checked by eye, exact.
- Quotation: "Is it lawful to pay taxes to Caesar, or not? Should we pay them, or should we not?" (Mark 12:14). ESV copy: OK.
- Quotation: "who pretended to be sincere, that they might catch him in something he said, so as to deliver him up to the authority and jurisdiction of the governor" (Luke 20:20). ESV copy: OK.
- The governor was Pilate. Verified from the text (Luke 23:1).
- "The crowd that had cheered him into the city that week." Mark 11:8-10 (textbook; not reread line by line).

## The Roman Tax and Judas the Galilean

- Mark's word is *census* in Greek letters (κῆνσος). SBLGNT: Mark 12:14 "δοῦναι κῆνσον Καίσαρι"; lemma κῆνσος also at Matthew 17:25, 22:17, 22:19. That it is a Latin loanword (census): textbook (standard lexicons). Unverified in a lexicon this pass.
- The tribute was paid by the people of Judea directly to Rome. Textbook. Unverified.
- "About a generation old": AD 6 to Jesus' last week (around AD 30-33). Arithmetic from the next line.
- In AD 6 Augustus removed Archelaus and put Judea under a Roman governor; Quirinius came to assess property for taxation. Whiston, *Antiquities* 18.1.1 (Cyrenius "a Roman senator ... sent by Caesar to be a judge of that nation, and to take an account of their substance"; Coponius sent "to have the supreme power over the Jews"; Judea "now added to the province of Syria"; "to dispose of Archelaus's money") and 18.2.1 (the taxings concluded "in the thirty-seventh year of Caesar's victory over Antony at Actium", i.e. AD 6/7). The year AD 6 for Archelaus's removal: textbook (Josephus 17.13.2, "the tenth year of Archelaus's government", seen in the file at line 35507; the conversion to AD 6 is standard). "Augustus" for Josephus's "Caesar": textbook.
- Josephus wrote near the end of the first century (*Antiquities* finished about 93/94). Textbook. Unverified.
- The high priest (Joazar son of Boethus) talked most people into accepting the assessment. Whiston 18.1.1: "by the persuasion of Joazar ... high priest; so they, being over-persuaded by Joazar's words, gave an account of their estates". Verified.
- Judas, joined by a Pharisee named Sadduc, called the nation to revolt. Whiston 18.1.1: "one Judas, a Gaulonite, of a city whose name was Gamala, who, taking with him Sadduc, a Pharisee, became zealous to draw them to a revolt". Verified.
- Quotation (Whiston): "this taxation was no better than an introduction to slavery." Whiston 18.1.1: exact ("who both said that this taxation was no better than an introduction to slavery").
- Judas started a fourth school beside the Pharisees, Sadducees and Essenes. Whiston 18.1.2 ("three sects ... Essens ... Sadducees ... Pharisees") and 18.1.6 ("of the fourth sect of Jewish philosophy, Judas the Galilean was the author"). Verified.
- Quotation (Whiston): followers held "that God is to be their only Ruler and Lord". Whiston 18.1.6: "and say that God is to be their only Ruler and Lord." Verified (quoted from "that").
- Paraphrase: they would not call any man lord even at the cost of their lives. Whiston 18.1.6: "They also do not value dying any kinds of death ... nor can any such fear make them call any man lord." Verified.
- "Years later, when the apostles were on trial in Jerusalem, the teacher Gamaliel warned the council". Acts 5:27-40 (Gamaliel "a Pharisee in the council named Gamaliel, a teacher of the law", Acts 5:34). ESV copy: 5:34 read ("a Pharisee in the council named Gamaliel, a teacher of the law held in honor by all the people") and 5:36-37 read.
- Quotation: "Judas the Galilean rose up in the days of the census and drew away some of the people after him. He too perished, and all who followed him were scattered" (Acts 5:37). ESV copy: OK.
- Quotation (Whiston): Judas and Sadduc "laid the foundations of our future miseries". Whiston 18.1.1: "filled our civil government with tumults at present, and laid the foundations of our future miseries". Verified.
- "The long slide that ended with the temple burned in AD 70." Whiston 18.1.1: "the sedition at last increased so high, that the very temple of God was burnt down by their enemies' fire." AD 70: textbook.
- Josephus fought against Rome in the war and then went over to the Romans. Textbook (he commanded in Galilee in 66-67, surrendered at Jotapata, later lived under Flavian patronage). Unverified this pass.
- Pilate had standards bearing images of Caesar carried into Jerusalem at night; earlier governors had avoided it. Whiston 18.3.1: "he introduced Caesar's effigies, which were upon the ensigns, and brought them into the city ... the former procurators were wont to make their entry into the city with such ensigns as had not those ornaments ... done in the night time". Verified.
- Quotation (Whiston): "our law forbids us the very making of images." Whiston 18.3.1: exact.
- Crowds went to Caesarea and pleaded for days; Pilate surrounded them with soldiers and threatened death; they threw themselves on the ground and bared their necks; Pilate had the images taken back. Whiston 18.3.1: "came in multitudes to Cesarea, and interceded with Pilate many days ... threatened that their punishment should be no less than immediate death ... threw themselves upon the ground, and laid their necks bare ... commanded the images to be carried back from Jerusalem to Cesarea." Verified.
- "Pilate gave them reasons to keep asking" places the standards affair before Jesus' trial. Pilate governed from about 26 (textbook); Josephus tells the standards story first among Pilate's acts in 18.3.1. The essay gives no date for it. Unverified beyond that ordering.

## The Coin in Their Hands

- Quotation: "Why put me to the test? Bring me a denarius and let me look at it" (Mark 12:15). ESV copy: OK.
- A denarius was a small silver coin. Search (2026-10-28): museum and auction records for Tiberius denarii, about 3.4-3.9 g and 19-20 mm. Verified by search summary.
- A day's pay for laborers in a parable (Matthew 20:2, "agreeing with the laborers for a denarius a day"). ESV copy: read.
- "Someone produced one." Mark 12:16 ("And they brought one"). ESV copy.
- "We can't know which denarius it was." Search: dealers' "tribute penny" label is traditional, not an established identification. Verified by search summary.
- The denarius Tiberius struck through most of his reign: obverse laureate head, legend TI CAESAR DIVI AVG F AVGVSTVS; reverse seated female figure, legend PONTIF MAXIM. Search (2026-10-28): Harvard Art Museums 1976.79.9 (RIC I 30), British Museum records (production 14-37, figure variously identified as Livia, Justitia or Pax), Dea Moneta and Naville auction notes (Naville: "the principal type of his reign", a dealer's note). Legends verified by search summary; "through most of his reign" rests on the BM dates and the dealer note.
- Expansion "Tiberius Caesar Augustus, son of the divine Augustus" and PONTIF MAXIM = pontifex maximus, "chief priest of Rome's religion". Textbook reading of the abbreviations. Search: a museum record ties PONTIF MAXIM to Tiberius's election as pontifex maximus in March 15. Verified in substance.
- Quotation: "Whose likeness and inscription is this?" and "Caesar's" (Mark 12:16). ESV copy: OK (by eye for the first, script for the second).
- "In the temple courts". ESV copy: Mark 11:27 ("as he was walking in the temple") and 12:35 ("as Jesus taught in the temple") read.
- Quotation: "Render to Caesar the things that are Caesar's, and to God the things that are God's" (Mark 12:17). ESV copy: OK.
- They asked with the ordinary verb for giving; Jesus answered with *apodote*. SBLGNT: Mark 12:14 "δοῦναι ... δῶμεν ἢ μὴ δῶμεν"; 12:17 "ἀπόδοτε". Verified.
- *apodote* means paying back what is owed, handing over what belongs to another. Textbook (standard lexicons give "give back, pay what is due"). Unverified in a lexicon this pass.
- Paul uses the same verb in Romans 13:7. SBLGNT (`r13src/ro.txt`): 061307 "ἀπόδοτε πᾶσι τὰς ὀφειλάς" (with a textual-variant marker). Verified.
- Quotation: "Pay to all what is owed to them: taxes to whom taxes are owed" (Romans 13:7). ESV copy: OK.
- Quotation: "And they marveled at him" (Mark 12:17). ESV copy: by eye, exact.
- Quotation: "they were not able in the presence of the people to catch him in what he said, but marveling at his answer they became silent" (Luke 20:26). ESV copy: OK.

## What Caesar Is Owed

- "One line of interpretation hears a coded refusal." General description of a known modern reading; no interpreter named. Unverified as to who holds it (deliberately unnamed).
- Quotation: "We found this man misleading our nation and forbidding us to give tribute to Caesar, and saying that he himself is Christ, a king" (Luke 23:2). ESV copy: OK.
- Luke's chapter 20 tells the coin story (Luke 20:20-26). ESV copy.
- Justin Martyr wrote to the emperor Antoninus Pius in the 150s. Patristic library: the *First Apology* opens "To the Emperor Titus Aelius Adrianus Antoninus Pius Augustus Caesar". "In the 150s": textbook (commonly dated about 150-155). Unverified.
- Quotation (ANF): "everywhere we, more readily than all men, endeavour to pay to those appointed by you the taxes both ordinary and extraordinary, as we have been taught by Him." Patristic library, *First Apology* ch. XVII ("Christ Taught Civil Obedience"): exact except that the original continues "by Him; for at that time"; the essay ends the quotation at "Him." Footnote marker "33" dropped.
- Quotation (ANF): "Whence to God alone we render worship, but in other things we gladly serve you, acknowledging you as kings and rulers of men, and praying that with your kingly power you be found to possess also sound judgment" (First Apology 17). Patristic library: exact.
- The tribute went to the empire that occupied their land and kept soldiers in Jerusalem. Textbook (Roman garrison in Jerusalem under the prefect). Unverified.

## What Belongs to God

- The Greek word in Mark 12:16 is *eikōn*. SBLGNT: "Τίνος ἡ εἰκὼν αὕτη καὶ ἡ ἐπιγραφή". Verified.
- Quotation: "Let us make man in our image" (Genesis 1:26). ESV copy: by eye, exact.
- Quotation: "So God created man in his own image, in the image of God he created him; male and female he created them" (Genesis 1:26–27, quoted from 1:27). ESV copy: OK.
- The Greek translation (Septuagint) uses *eikōn* in Genesis 1:26-27. Search (2026-10-28): LXX Gen 1:26 "κατ᾽ εἰκόνα ἡμετέραν καὶ καθ᾽ ὁμοίωσιν", 1:27 "κατ᾿ εἰκόνα Θεοῦ ἐποίησεν αὐτόν" (biblestudytools LXX, sacred-texts, tanakh.info). Verified by search summary.
- "Jews who read their Scriptures in Greek knew that word." Textbook (the Septuagint was the Bible of Greek-speaking Jews). Unverified.
- Tertullian of Carthage wrote *On Idolatry* "around the year 200". Textbook; scholarly dates range about 196-211. **Unverified**; the verifier may prefer "early in the third century" or no date.
- *On Idolatry* addresses Christians drifting into idolatry. Patristic library: chapter XV is "Concerning Festivals in Honour of Emperors ..." and rebukes Christians who put lamps and laurels on their doors. Verified in substance.
- Quotation (ANF): "the image of Caesar, which is on the coin, to Caesar, and the image of God, which is on man, to God; so as to render to Caesar indeed money, to God yourself." Patristic library, *On Idolatry* ch. XV: exact (footnote marker "117" dropped).
- Quotation (ANF): "Otherwise, what will be God's, if all things are Caesar's?" (On Idolatry 15). Patristic library: exact.
- A few verses later in Mark 12 a scribe asks which commandment matters most, and Jesus answers with the Shema. ESV copy: Mark 12:28-29 read ("Which commandment is the most important of all?"; "Hear, O Israel: The Lord our God, the Lord is one").
- Quotation: "And you shall love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength" (Mark 12:30). ESV copy: OK.
- Paul would add revenue, respect and honor (Romans 13:7). ESV copy: read.
- Quotation: "The earth is the LORD's and the fullness thereof, the world and those who dwell therein" (Psalm 24:1). ESV copy: LOOSE (the copy prints "Lord ’s" and carries the psalm title). Wording otherwise exact; small caps LORD per ESV convention.
- The coin called Tiberius the son of a god and Rome's chief priest. From the legends above. Verified by search summary.

## Where the Church Drew the Line

- July 17, 180; Christians from Scili, a small town in Roman North Africa; before the proconsul Saturninus at Carthage. Ayer: "The date of this martyrdom is July 17, 180 A.D. Scili ... was a small city in northwestern Proconsular Africa"; "brought into the judgment-hall at Carthage, the proconsul Saturninus said". Verified.
- Quotation (Ayer): "our religion is simple; and we swear by the genius of our lord the Emperor, and pray for his welfare, which also ye, too, ought to do." Ayer: exact (the sentence opens "We, too, are religious, and our religion is simple"; the essay paraphrases the first clause).
- Speratus as spokesman. Ayer: he speaks first and for the group ("And with him they all agreed"). Characterization.
- Quotation (Ayer): "I have committed no theft; but if I have bought anything I pay the tax; because I know my Lord, the King of kings and Emperor of all nations." Ayer: exact.
- Quotation (Ayer): Donata said, "Honor to Cæsar as Cæsar, but fear to God." Ayer: exact (spelling Cæsar kept).
- Sentenced to the sword. Ayer: "it is determined shall be put to the sword." Verified.
- Quotation (Ayer): Speratus said, "We give thanks to God." Ayer: exact.
- "They paid the tax and refused the oath." Ayer: the proconsul demands they "swear by the genius of our lord the Emperor"; they refuse. Verified in substance.
- In 385 and 386 the court at Milan, acting for the young Valentinian II, demanded a church building for the Arians; Ambrose refused; the court backed down. Search (2026-10-28): New Catholic Encyclopedia (isidore.co), Swarthmore Global Nonviolent Action Database ("Milanese Catholics and Bishop Ambrose defend their Basilica, 385-386 CE"), Jewish Encyclopedia: Justina for Valentinian II sought a church for Arian worship; clashes from Palm Sunday; "The court ultimately backed down". Verified by search summary. Valentinian II "young" (born 371): textbook.
- Ambrose wrote to his sister. Patristic library, Epistle 20 (NPNF heading: "St. Ambrose relates to his sister the events at Milan connected with the demand of the Arians for a basilica"). Verified.
- Quotation (NPNF): the court insisted "everything is lawful for the Emperor, that all things are his". Epistle 20.19: "It is asserted that everything is lawful for the Emperor, that all things are his." Verified (quoted from "everything").
- He quoted the saying about the coin and added, "The palaces belong to the Emperor, the churches to the Bishop." Epistle 20.19: "It is written: 'The things which are God's to God, those which are Caesar's to Caesar.' The palaces belong to the Emperor, the churches to the Bishop." Verified.
- "With soldiers around the church, he told his congregation". Sermon Against Auxentius 4 (patristic library): "The soldiers around, the clash of the arms wherewith the church is surrounded". Verified.
- Quotation (NPNF): "We pay to Caesar what is Caesar's, and to God what is God's. Tribute is due to Caesar, we do not deny it. The Church belongs to God, therefore it ought not to be assigned to Caesar." Sermon Against Auxentius 35: exact.
- Quotation (NPNF): the emperor "is within the Church, not above it." Sermon Against Auxentius 36 (the library file mislabels this paragraph "37"; it follows 35 and precedes the true 37): "For the Emperor is within the Church, not above it." Verified.
- Date of the Sermon Against Auxentius (386) and of the events in Epistle 20 (385 or 386; scholars differ). The essay says "In 385 and 386" for the whole conflict and dates neither text. Unverified beyond that.
- In 388 Christians at Callinicum, a town on the Euphrates, burned a synagogue; the report said their bishop instigated it; Theodosius ordered the bishop to rebuild it at his own expense. Letter 40.6 (patristic library): "A report was made by the military Count of the East that a synagogue had been burnt, and that this was done at the instigation of the Bishop. You gave command that the others should be punished, and the synagogue be rebuilt by the Bishop himself." Year 388 and the town's name and place: search (2026-10-28), Jewish Encyclopedia "Ambrose" ("At Callinicum on the Euphrates ... late in 388"), Harry Freedman Substack. Verified by text and search summary. "At his own expense": search summary ("restore the synagogue at his own expense"); the letter says "by the Bishop himself".
- Ambrose wrote in protest (Letter 40), then confronted Theodosius in church and would not go to the altar until the emperor promised to change the order; Theodosius gave way. Letter 41.27-28 (to his sister): "'Let me offer for you without anxiety, set my mind at ease.' ... he said that he would amend the edict ... 'Act,' he said, 'on my promise.' And so I went to the altar". Verified.
- "Two years later": 386 to 388. Arithmetic.

## Is This the Separation of Church and State?

- No checkable facts beyond those above (Ambrose reaching for the saying: Sermon Against Auxentius 31-35, Epistle 20.19).

## When a Party Asks for What Belongs to God

- Quotation: "the devil took him to a very high mountain and showed him all the kingdoms of the world and their glory. And he said to him, 'All these I will give you, if you will fall down and worship me'" (Matthew 4:8–9). ESV copy: LOOSE (copy drops inner quotation marks). "At the start of his ministry": Matthew 4 precedes the Galilean ministry (4:17). Textbook.
- Quotation: "Be gone, Satan! For it is written, 'You shall worship the Lord your God and him only shall you serve'" (Matthew 4:10). ESV copy: LOOSE (inner quotation marks). The exclamation point is inside quoted Scripture.
- Quotation: "about to come and take him by force to make him king" and "withdrew again to the mountain by himself" (John 6:15). ESV copy: OK. "A crowd he had fed": John 6:1-14 (textbook).
- Ivan tells his brother (Alyosha) a story about Christ returning to Seville in the worst days of the Inquisition and being arrested by the Grand Inquisitor, an old cardinal. Garnett, Book V ch. 5: "My story is laid in Spain, in Seville, in the most terrible time of the Inquisition"; "the cardinal himself, the Grand Inquisitor ... an old man, almost ninety". Verified. Arrest and silent prisoner: Garnett, same chapter (textbook summary; the arrest passage not quoted).
- The cardinal says the church has corrected Christ's work. Garnett line 11489: "We have corrected Thy work". Verified.
- Quotation (Garnett): "We have taken the sword of Cæsar, and in taking it, of course, have rejected Thee and followed *him*." Garnett line 11527-28: exact (italic *him* as in Garnett's _him_).
- "Dostoevsky aimed the story at Rome." Textbook (the Inquisitor's church is Roman Catholic, and Dostoevsky's anti-Catholic intent is widely noted). Unverified this pass.
- Michele Margolis, political scientist: partisanship, formed early, shapes whether people return to religion as adults and how they identify religiously. Search (2026-10-28): reviews and an interview of *From Politics to the Pews* (University of Chicago Press, 2018): partisan identity shapes religious identity; partisanship solidifies earlier than religious identity; effect concentrated among white partisans with young children. Verified by search summary; the book itself not read. The essay names no title, year or statistic.
- Quotation: "but never again prophesy at Bethel, for it is the king's sanctuary, and it is a temple of the kingdom" (Amos 7:13). ESV copy: OK.
- Amaziah told Amos to go to Judah and prophesy there. ESV copy: Amos 7:12 ("go, flee away to the land of Judah, and eat bread there, and prophesy there"). "Go home": Amos 1:1 (ESV copy read: "among the shepherds of Tekoa"); Tekoa lies in Judah (textbook).
- Bethel as the royal shrine of the northern kingdom. Amos 7:10, 13 (Amaziah priest of Bethel sends to Jeroboam king of Israel; "the king's sanctuary"). Verified from the text.
- Biography: "the church I serve". James is a pastor (NOTES.md: confirmed). No scene invented.

## The Inscription Over the Cross

- Quotation: "Shall I crucify your King?" and the chief priests answered, "We have no king but Caesar" (John 19:15). ESV copy: OK.
- The chief priests were part of the leadership that in Mark sent the questioners. Mark 11:27 and 12:12-13 (ESV copy). Verified from the text.
- Mark uses the Greek word for "inscription" (ἐπιγραφή) only twice: Mark 12:16 and 15:26. SBLGNT (lemma search, 62-Mk): 021216 and 021526 only. Verified. (Luke also uses it twice, 20:24 and 23:38; Matthew once, 22:20; John uses τίτλος.)
- Quotation: "And the inscription of the charge against him read, 'The King of the Jews'" (Mark 15:26). ESV copy: LOOSE (inner quotation marks).
- Quotation: "the image of the invisible God, the firstborn of all creation" (Colossians 1:15). ESV copy: OK. SBLGNT: εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου.
- Quotation: "Yet not what I will, but what you will" (Mark 14:36), in Gethsemane (Mark 14:32). ESV copy: OK.
- "On the cross he gave his life into his Father's hands." Paraphrase of Luke 23:46 (ESV copy read: "Father, into your hands I commit my spirit!").
- God raised him on the third day. Confessional; 1 Corinthians 15:4 (not quoted).
- Quotation: "are being transformed into the same image from one degree of glory to another" (2 Corinthians 3:18). ESV copy: OK.

## Closing Texts

- *"Render to Caesar the things that are Caesar's, and to God the things that are God's."* (Mark 12:17). ESV copy: OK.
- *"He is the image of the invisible God, the firstborn of all creation."* (Colossians 1:15). ESV copy: OK.
- *"The earth is the LORD's and the fullness thereof, the world and those who dwell therein."* (Psalm 24:1). ESV copy: LOOSE (see above); the ESV verse ends with a comma, the closing line ends with a period.

## Links

- /writing/the-early-church-under-rome, /writing/when-the-church-married-empire, /writing/the-conservative-blind-spot, /writing/the-progressive-blind-spot. All four are in `docs/work/essays/link-targets.json`; `node scripts/validate-essays.mjs` on a scratch JSON copy of the draft reported "Essays: clean (1 file)", so each resolves to a public page today.
- Not linked: /writing/what-romans-13-says (the natural sibling for Romans 13:7) because it is not public yet and the essay gate fails a link to a non-public page. Add it at landing if that essay is live by then.

## What the old essays said that this rewrite dropped or corrected

- Old essay: the denarius bore "an inscription naming him divine". Corrected: the Tiberius legend calls him son of the divine Augustus, not divine himself.
- Old essay: early Christians were killed for refusing to say "the four words ... kurios kaisar, Caesar is lord". Dropped (the formula "Lord Caesar" appears in the *Martyrdom of Polycarp* 8, but the essay's broad claim was not checked and the pilots already use Polycarp).
- Old essay: N. T. Wright (2000), William Cavanaugh (2009), Robert Louis Wilken (1984) cited without quotation. Dropped; the argument no longer needs them.
- Old essay: "The same words that sounded like a sword in 64". Dropped (no source for how the saying was read in 64).
- Folded essays: Machen (1923), the Moral Majority (1979), David Wells (1993), Neil Postman (1985), Brueggemann (1978), Hauerwas and Willimon (1989), Barmen (1934), Bonhoeffer (Flossenbürg, April 1945), Joshua 5:13-14, Ephesians 6:12, Mark 10:42-45, Philippians 2:5-7. Not used, so not checked. Kept from them: the third temptation (Matthew 4:8-10), John 6:15, Amos 7:13, the Grand Inquisitor (now quoted verbatim from Garnett), and the test of whether you will name your own side's wrongs.
- Considered and left out as not confirmed well enough for this draft: Gelasius I's letter to Anastasius (494); Luther's *Temporal Authority* (1523) and whether it cites Matthew 22:21 (search summary confirmed the treatise's claim that temporal law reaches only "life and property and external affairs", but pages.uoregon.edu could not be reached).

## Checks run on the essay in this pass

- `node scripts/validate-essays.mjs` on a scratch JSON built from the draft (`scratchpad/rc/caesar-check/`): clean.
- `node scripts/validate-no-emdash.mjs`: clean (the draft has 0 em-dashes).
- Script stats: about 3,850 words with headings and Closing Texts; 43 prose paragraphs averaging 87 words; mean sentence 17.2 words; 27 percent of sentences at 8 words or fewer.
- Semicolons: none in the essay's own prose (all six are inside quotations).
- Stamps from BRIEF.md: none used ("honest" appears once, as "paid honestly").

## Still open

- ESV wording against esv.org or the ESV API (every Scripture line).
- Tertullian's *On Idolatry* date ("around the year 200").
- Justin's *First Apology* date ("in the 150s").
- Margolis's finding as worded ("whether people go back to church as adults and how they describe their faith once they do"): checked only through reviews.
- Textbook items marked unverified above: Josephus's career, *Antiquities* date, Herodians, Pharisees' standing, *census* as a loanword, *apodote*'s range, Dostoevsky's aim, Valentinian II's age.
- needs_james: no contested second-order doctrine is argued or settled; the essay does not state a position on war-tax resistance, pacifism, or church establishment.
