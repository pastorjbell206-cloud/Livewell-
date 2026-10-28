# Claims ledger: what-render-unto-caesar-actually-means

Essay: `docs/work/essays/what-render-unto-caesar-actually-means.md` ("What Did Jesus Mean by "Render Unto Caesar"?"). Rewrite of the live machine-generated essay of the same slug (published 2026-06-09), folding in `the-church-captive-to-the-culture-war` and `the-third-temptation`. Faith and Power section. Writer's ledger 2026-10-28; rewritten by the verifier on 2026-10-28 after checking every claim again. Each line below gives the result and the method actually used.

## Methods (what each word below means)

- **Search (2026-10-28)**: a WebSearch run by the verifier on 2026-10-28. The tool returns a summary of result pages (esv.org, biblia.com, biblehub.com, blueletterbible.org and others), not the pages themselves. No page was opened directly; esv.org cannot be fetched from this sandbox.
- **Local ESV copy**: the ESV text in the GitHub repository lguenth/mdbible (clone in the scratchpad at `esv-mdbible`, commit fd66568), compared by the verifier's script `scratchpad/vcaesar/tools/esvside.py`. This copy is not esv.org; it drops inner quotation marks and prints LORD as "Lord ’s", so those verses match only loosely there.
- **SBLGNT**: MorphGNT SBLGNT files (Mark, Matthew, Luke, Romans, Colossians) fetched by the verifier from raw.githubusercontent.com/morphgnt/sblgnt on 2026-10-28 into `scratchpad/vcaesar/dl/` and read with awk.
- **Patristic library**: HistoricalChristianFaith/Writings-Database clone in the scratchpad (`wdb`, commit 328918a), NPNF/ANF translations, extracted by the verifier with `git show 'HEAD:<path>'` into `scratchpad/vcaesar/src/` and checked by script (`scratchpad/vcaesar/tools/qcheck.py`, verbatim after stripping HTML and footnote markers). Files: Justin Martyr/The First Apology, Tertullian/On Idolatry, Ambrose of Milan/Letters/Epistle 20, Letter 40, Letter 41, Sermon Against Auxentius on the Giving Up of the Basilicas.
- **Whiston**: Josephus, *Antiquities of the Jews*, tr. William Whiston, Gutenberg #2848, fetched by the verifier from raw.githubusercontent.com/GITenberg/Antiquities-of-the-Jews_2848/master/2848.txt on 2026-10-28 and checked by script and by reading the passage.
- **Ayer**: Joseph Cullen Ayer, *A Source Book for Ancient Church History* (1913), Gutenberg #24979, GITenberg clone in the scratchpad (`sources/A-Source-Book-for-Ancient-Church-History_24979/24979-0.txt`), "Passion of the Scilitan Martyrs" (Ayer's translation of J. A. Robinson's text), read by the verifier.
- **Garnett**: Dostoevsky, *The Brothers Karamazov*, tr. Constance Garnett, Gutenberg #28054, GITenberg clone in the scratchpad (`sources/The-Brothers-Karamazov_28054/28054-0.txt`), read by the verifier with grep and sed.
- **Textbook**: a fact the verifier judged standard and certain and did not check against a source in this pass. Said so on each line.

## Title and standfirst

- Title "What Did Jesus Mean by "Render Unto Caesar"?" is the title NOTES.md lists for this slug. No check needed.
- Standfirst (reworded in the voice pass, 2026-10-28): Jesus said it in the temple during the last week of his life, when men who wanted him dead asked him whether to pay a Roman tax. Verified from the text: Mark 11:27 ("as he was walking in the temple") and 12:13 precede the passion narrative of Mark 14-15; the questioners' circle sought to destroy him (Mark 3:6) and to arrest him (Mark 12:12), and Luke 20:20 gives the aim of delivering him to the governor (local ESV copy; Luke 20:20 also matched against search results quoting esv.org on 2026-10-28); the question is Mark 12:14 and the tax the Roman *census* (below).

## Opening

- Quotation (KJV): "Render therefore unto Caesar the things which are Caesar's; and unto God the things that are God's" (Matthew 22:21, KJV). Matched against search results quoting kingjamesbibleonline.org, bible.com and biblia.com (KJV 1900) on 2026-10-28: exact.
- "People who never otherwise quote Jesus know this line"; its uses about elections and taxes. Observation, not a checkable claim.

## The Question in the Temple

- **Corrected.** The draft said "Mark's version is the shortest (Mark 12:13–17)". Mark's account is shortest only by verse count (5 verses against Matthew 22:15-22's 8 and Luke 20:20-26's 7). By words it is not: SBLGNT counts 106 Greek words for Mark 12:13-17, 104 for Luke 20:20-26 and 115 for Matthew; the local ESV copy counts 142, 141 and 147. Now reads "Mark tells it in five verses (Mark 12:13–17)", verified by the same counts.
- Before the question Jesus rode into the city to a crowd's welcome, overturned the money-changers' tables, and told the parable of the tenants who kill the owner's son. Verified from the text: Mark 11:1-10, 11:15, 12:1-12 (SBLGNT 12:8 "ἀπέκτειναν αὐτόν", "killed him"); the triumphal entry and cleansing by textbook knowledge of Mark 11, not reread line by line.
- Quotation: "perceived that he had told the parable against them" (Mark 12:12). Matched against search results quoting the ESV (blueletterbible.org, biblegateway.com, bibleserver.com) on 2026-10-28, and the local ESV copy: exact. Subject (chief priests, scribes and elders) from Mark 11:27, local ESV copy.
- "They wanted him arrested, but they were afraid of the crowd." Marked paraphrase of Mark 12:12 ("they were seeking to arrest him but feared the people"), local ESV copy.
- Quotation: "And they sent to him some of the Pharisees and some of the Herodians, to trap him in his talk" (Mark 12:13). Matched against the same search results on 2026-10-28, whose summary reproduced the words without the opening "And" and the comma; the local ESV copy has both, exact as in the essay.
- Pharisees devoted to keeping the law and respected by ordinary people. Whiston, *Antiquities* 18.1.3, read by the verifier: the Pharisees "are able greatly to persuade the body of the people". Verified in substance; the first half is textbook.
- Herodians, "as far as we can tell", partisans of the Herod family whose power depended on Rome. Textbook, and hedged in the essay. Kept.
- Quotation: the Pharisees "held counsel with the Herodians against him, how to destroy him" (Mark 3:6). Matched against search results quoting esv.org and biblia.com on 2026-10-28: exact. "Back in Galilee": Mark 1:14-3:6 is set in Galilee (textbook).
- Quotation: "Teacher, we know that you are true and do not care about anyone's opinion. For you are not swayed by appearances, but truly teach the way of God." (Mark 12:14). Matched against search results quoting esv.org, biblehub.com and christianity.com on 2026-10-28: exact.
- Quotation: "Is it lawful to pay taxes to Caesar, or not? Should we pay them, or should we not?" (Mark 12:14). Same search on 2026-10-28: exact.
- Quotation: "who pretended to be sincere, that they might catch him in something he said, so as to deliver him up to the authority and jurisdiction of the governor" (Luke 20:20). Matched against search results quoting esv.org and bibliavida.com on 2026-10-28: exact. "They sent spies" is in the same verse.
- The governor was Pilate. Verified from the text (Luke 23:1, local ESV copy).
- "The crowd that had cheered him into the city that week." Mark 11:8-10, textbook knowledge of the chapter.

## The Roman Tax and Judas the Galilean

- Mark's word is *census* in Greek letters. SBLGNT, Mark 12:14: "κῆνσον", lemma κῆνσος. That it is a Latin loan and meant a yearly levy on individuals: search results quoting Thayer's lexicon (biblehub.com Strong's 2778) on 2026-10-28. Verified.
- The tribute was paid by the people of Judea directly to Rome. Same search (Thayer: "the tax or tribute levied on individuals"; a HELPS note that it was paid in Roman coin). Verified in substance.
- "About a generation old": AD 6 to Jesus' last week (about AD 30-33). Arithmetic.
- In AD 6 Augustus removed Herod's son Archelaus and put Judea under a Roman governor; Quirinius, a Roman senator, came to take an account of property for taxation. Whiston 17.13.2 ("in the tenth year of Archelaus's government ... accused him before Caesar") and 18.1.1 ("Cyrenius, a Roman senator ... to take an account of their substance"; Coponius sent "to have the supreme power over the Jews"; Judea "now added to the province of Syria"), read by the verifier. The year AD 6: textbook (Herod died 4 BC; Archelaus's tenth year), and the ESV Reformation Study Bible note on Acts 5:37 in search results on 2026-10-28 dates the census to AD 6. Verified.
- Josephus wrote near the end of the first century. Textbook (*Antiquities* completed about 93/94). Certain; kept.
- The high priest talked most people into accepting the assessment. Whiston 18.1.1: the Jews left off opposition "by the persuasion of Joazar ... high priest; so they, being over-persuaded by Joazar's words, gave an account of their estates". Verified.
- Judas, joined by a Pharisee named Sadduc, called the nation to revolt. Whiston 18.1.1: "one Judas, a Gaulonite ... taking with him Sadduc, a Pharisee, became zealous to draw them to a revolt". Verified.
- Quotation (Whiston): "this taxation was no better than an introduction to slavery." Whiston 18.1.1, checked by script: exact.
- Judas started a fourth school beside the Pharisees, Sadducees and Essenes. Whiston 18.1.6, read by the verifier: "of the fourth sect of Jewish philosophy, Judas the Galilean was the author". The three sects: 18.1.2 (writer's reading; not reopened). Verified.
- Quotation (Whiston): followers held "that God is to be their only Ruler and Lord". Whiston 18.1.6, checked by script: exact (the source reads "and say that God is to be their only Ruler and Lord").
- Paraphrase: they would not call any man lord even if it cost them their lives. Whiston 18.1.6: "They also do not value dying any kinds of death ... nor can any such fear make them call any man lord." Verified; no quotation marks in the essay.
- Gamaliel, "a teacher of the law", warned the council while the apostles were on trial in Jerusalem. Acts 5:27-40; 5:34 in the local ESV copy ("a Pharisee in the council named Gamaliel, a teacher of the law"). Verified.
- Quotation: "Judas the Galilean rose up in the days of the census and drew away some of the people after him. He too perished, and all who followed him were scattered" (Acts 5:37). Matched against search results quoting esv.org, biblia.com and biblehub.com on 2026-10-28: exact.
- Quotation (Whiston): Judas and Sadduc "laid the foundations of our future miseries". Whiston 18.1.1, checked by script: exact; the subject is Judas and Sadduc.
- "The long slide that ended with the temple burned in AD 70." Whiston 18.1.1 ("the very temple of God was burnt down by their enemies' fire"); AD 70 textbook. Verified.
- Josephus fought against Rome in that war and then went over to the Romans. Textbook (commander in Galilee, surrendered at Jotapata in 67, later under Flavian patronage). Certain; kept.
- Pilate had standards bearing images of Caesar carried into Jerusalem at night; earlier governors had avoided it. Whiston 18.3.1, read by the verifier: "he introduced Caesar's effigies, which were upon the ensigns ... the former procurators were wont to make their entry into the city with such ensigns as had not those ornaments ... done in the night time". Verified.
- Quotation (Whiston): "our law forbids us the very making of images." Whiston 18.3.1, checked by script: exact.
- Crowds went to Caesarea and pleaded for days; Pilate surrounded them with soldiers and threatened death; they threw themselves on the ground and bared their necks; he had the images taken back. Whiston 18.3.1: "came in multitudes to Cesarea, and interceded with Pilate many days ... threatened that their punishment should be no less than immediate death ... threw themselves upon the ground, and laid their necks bare ... commanded the images to be carried back". Verified.
- "Pilate gave them reasons to keep asking" places the standards affair before Jesus' trial. Josephus tells it first among Pilate's acts (18.3.1); Pilate governed from about 26 (textbook). The essay gives no date. Kept.

## The Coin in Their Hands

- Quotation: "Why put me to the test? Bring me a denarius and let me look at it" (Mark 12:15). Matched against search results quoting biblehub.com and biblegateway.com on 2026-10-28: the summary reports the same ESV wording; local ESV copy exact.
- A denarius was a small silver coin. Search on 2026-10-28 (translator's note at tips.translation.bible: a Roman silver coin; museum records of Tiberius denarii). Verified.
- A day's pay for laborers in a parable (Matthew 20:2, "a denarius a day"). Local ESV copy. Verified.
- "Someone produced one." Mark 12:16 ("And they brought one"), local ESV copy.
- "We can't know which denarius it was." Search on 2026-10-28: collection and dealer records say the coin "may have been" this type; the "tribute penny" label is traditional. Verified.
- The denarius Tiberius struck through most of his reign: laureate head, legend TI CAESAR DIVI AVG F AVGVSTVS; reverse a seated female figure with PONTIF MAXIM. Search on 2026-10-28 (Museums Victoria, MFA Boston, Dea Moneta, Baldwin's and London Museum records): obverse and reverse legends exact; the type is RIC 30, Lugdunum; museum records date it to the reign (14-37), dealers to about 18-35; the figure is variously Livia or Pax. Verified; "through most of his reign" rests on those dates.
- Expansion "Tiberius Caesar Augustus, son of the divine Augustus" and PONTIF MAXIM as Rome's chief priest (pontifex maximus). Search on 2026-10-28: a translation handbook (tips.translation.bible) glosses the legend as "Tiberius Caesar Augustus, son of the divine Augustus"; museum records tie PONTIF MAXIM to the pontifex maximus office. Verified.
- Quotation: "Whose likeness and inscription is this?" and "Caesar's" (Mark 12:16). Matched against search results quoting biblehub.com and christianity.com (ESV) on 2026-10-28: exact.
- "In the temple courts." Mark 11:27 and 12:35 ("as Jesus taught in the temple"), local ESV copy.
- Quotation: "Render to Caesar the things that are Caesar's, and to God the things that are God's" (Mark 12:17). Matched against search results quoting the ESV (biblegateway.com, biblehub.com, YouVersion ESV 2016) on 2026-10-28: exact.
- They asked with the ordinary verb for giving; Jesus answered with *apodote*. SBLGNT: Mark 12:14 "δοῦναι ... δῶμεν ... δῶμεν" (lemma δίδωμι); 12:17 "ἀπόδοτε" (lemma ἀποδίδωμι). Verified from the Greek.
- *apodote* means paying back what is owed. Search on 2026-10-28: a translation handbook (tips.translation.bible) glosses it "give back, return, pay, render" and suggests "pay back to Caesar"; a lexical note glosses "paying what is rightfully owed". Verified.
- Paul uses the same verb in Romans 13:7. SBLGNT Romans 13:7: "ἀπόδοτε πᾶσι τὰς ὀφειλάς" (with a variant marker). Verified.
- Quotation: "Pay to all what is owed to them: taxes to whom taxes are owed" (Romans 13:7). Matched against search results quoting esv.org, biblehub.com and biblia.com on 2026-10-28: exact (the verse continues with revenue, respect and honor).
- Quotation: "And they marveled at him" (Mark 12:17). Matched against the Mark 12:17 search on 2026-10-28: exact.
- Quotation: "they were not able in the presence of the people to catch him in what he said, but marveling at his answer they became silent" (Luke 20:26). Matched against search results quoting esv.org and biblegateway.com on 2026-10-28: exact.

## What Caesar Is Owed

- "One line of interpretation hears a coded refusal." General description of a known modern reading; no interpreter named or quoted. Kept as unattributed description.
- Quotation: "We found this man misleading our nation and forbidding us to give tribute to Caesar, and saying that he himself is Christ, a king" (Luke 23:2). Matched against search results quoting esv.org, christianity.com and biblia.com on 2026-10-28: exact.
- Luke's chapter 20 tells the coin story (Luke 20:20-26). Local ESV copy.
- Justin Martyr wrote to the emperor Antoninus Pius in the 150s. Patristic library: the *First Apology* opens "To the Emperor Titus Aelius Adrianus Antoninus Pius Augustus Caesar". Date: search on 2026-10-28 (Wikipedia 155-157; Schaff's encyclopedia about 151 or after; earlychristianwritings.com about 156; a Justin edition 151-155). Every estimate falls in the 150s. Verified.
- Quotation (ANF): "everywhere we, more readily than all men, endeavour to pay to those appointed by you the taxes both ordinary and extraordinary, as we have been taught by Him." Patristic library, *First Apology* ch. XVII ("Christ Taught Civil Obedience"), checked by script: exact; the source continues "by Him; for at that time", and the essay closes the quotation at "Him."
- Quotation (ANF): "Whence to God alone we render worship, but in other things we gladly serve you, acknowledging you as kings and rulers of men, and praying that with your kingly power you be found to possess also sound judgment" (First Apology 17). Same check: exact. The retelling of the coin story sits between the two quotations in ch. XVII. Verified.
- The tribute went to the empire that occupied the land and kept soldiers in the holy city. Textbook (Roman prefect and garrison; Josephus 18.3.1 has Pilate's army wintering in Jerusalem). Kept.

## What Belongs to God

- The Greek word in Mark 12:16 is *eikōn*. SBLGNT Mark 12:16: "εἰκὼν", lemma εἰκών. Verified.
- Quotation: "Let us make man in our image" (Genesis 1:26). Matched against search results quoting esv.org and blueletterbible.org on 2026-10-28: exact.
- Quotation: "So God created man in his own image, in the image of God he created him; male and female he created them" (Genesis 1:26–27, quoted from 1:27). Matched against search results quoting esv.org and blueletterbible.org on 2026-10-28: exact.
- The Greek translation (Septuagint) uses *eikōn* in Genesis 1:26-27. Search on 2026-10-28 (sacred-texts.com Septuagint Genesis 1; a JHS article on εἰκών in the LXX): verse 26 "κατ᾽ εἰκόνα ἡμετέραν", verse 27 "κατ᾽ εἰκόνα θεοῦ". Verified.
- "Jews who read their Scriptures in Greek knew that word." Textbook (the Septuagint was the Bible of Greek-speaking Jews). Kept.
- Tertullian of Carthage wrote *On Idolatry* "around the year 200". Search on 2026-10-28: the date is debated; one source gives about 203-211; the critical editors (Waszink and van Winden) prefer before 208. The verifier knows of an earlier dating (Barnes, 196/7) only from memory, not checked. Every proposed date falls within about a decade of 200, so the approximate "around the year 200" is kept as an approximation; it is not a precise date.
- *On Idolatry* addresses Christians drifting into idolatry. Patristic library: chapter XV, "Concerning Festivals in Honour of Emperors ...", rebukes Christians who hang lamps and laurels on their doors. Verified in substance.
- Quotation (ANF): "the image of Caesar, which is on the coin, to Caesar, and the image of God, which is on man, to God; so as to render to Caesar indeed money, to God yourself." Patristic library, *On Idolatry* ch. XV, checked by script: exact (the source opens the sentence "that is, the image").
- Quotation (ANF): "Otherwise, what will be God's, if all things are Caesar's?" (On Idolatry 15). Same check: exact.
- A few verses later in Mark 12 a scribe asks which commandment matters most, and Jesus answers with the Shema. Mark 12:28-29, local ESV copy. Verified.
- Quotation: "And you shall love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength" (Mark 12:30). Matched against search results quoting esv.org, biblia.com and sermoncentral.com on 2026-10-28: exact.
- Paul would add revenue, respect and honor (Romans 13:7). Search results on 2026-10-28 (above) and the local ESV copy. Verified.
- Quotation: "The earth is the LORD's and the fullness thereof, the world and those who dwell therein" (Psalm 24:1). Matched against search results quoting blueletterbible.org and biblia.com (ESV) on 2026-10-28: exact, with LORD in capitals.
- The coin called Tiberius the son of a god and Rome's chief priest. From the legends verified above.

## Where the Church Drew the Line

- July 17, 180; Christians from Scili, a small town in Roman North Africa; before the proconsul Saturninus at Carthage. Ayer, read by the verifier: "The date of this martyrdom is July 17, 180 A.D. Scili ... was a small city in northwestern Proconsular Africa"; "brought into the judgment-hall at Carthage, the proconsul Saturninus said". Verified.
- He told them Romans were religious too (paraphrase of "We, too, are religious"). Ayer. Verified.
- Quotation (Ayer): "our religion is simple; and we swear by the genius of our lord the Emperor, and pray for his welfare, which also ye, too, ought to do." Ayer, read by the verifier: exact.
- Speratus as spokesman. Ayer: he speaks first and for the group ("And with him they all agreed"). Fair characterization.
- Quotation (Ayer): "I have committed no theft; but if I have bought anything I pay the tax; because I know my Lord, the King of kings and Emperor of all nations." Ayer: exact.
- Quotation (Ayer): Donata said, "Honor to Cæsar as Cæsar, but fear to God." Ayer: exact (spelling Cæsar kept).
- Sentenced to the sword. Ayer: "it is determined shall be put to the sword." Verified.
- Quotation (Ayer): when the sentence was read, Speratus said, "We give thanks to God." Ayer: exact, and it follows the reading of the decree. Verified.
- "They paid the tax and refused the oath." Ayer: Saturninus demands "do thou swear by the genius of our lord the Emperor"; Speratus answers that he pays the tax. Verified in substance.
- In 385 and 386 the court at Milan, acting for the young Valentinian II, demanded a church for the Arians; Ambrose refused; the court backed down. Search on 2026-10-28 (Swarthmore Global Nonviolent Action Database, "Milanese Catholics and Bishop Ambrose defend their Basilica, 385-386 CE"; New Catholic Encyclopedia; Dictionary of Greek and Roman Biography): Justina for Valentinian II sought a basilica for Arian worship; the attempt "was abandoned"; the court "dropped their demands". Sources disagree on the exact year of each clash, which the essay's "385 and 386" covers. Verified. Valentinian II "young" (born 371): textbook.
- Ambrose wrote to his sister. Patristic library, Epistle 20 (NPNF heading: "St. Ambrose relates to his sister the events at Milan connected with the demand of the Arians for a basilica"; NPNF dates it Easter 385). Verified.
- Quotation (NPNF): the court insisted "everything is lawful for the Emperor, that all things are his". Epistle 20.19, checked by script: exact ("It is asserted that everything is lawful for the Emperor, that all things are his").
- He quoted the saying about the coin and added, "The palaces belong to the Emperor, the churches to the Bishop." Epistle 20.19, checked by script: exact, directly after "It is written: 'The things which are God's to God, those which are Caesar's to Caesar.'"
- "With soldiers around the church, he told his congregation". Sermon Against Auxentius 4 (patristic library, read by the verifier): "The soldiers around, the clash of the arms wherewith the church is surrounded". Verified.
- Quotation (NPNF): "We pay to Caesar what is Caesar's, and to God what is God's. Tribute is due to Caesar, we do not deny it. The Church belongs to God, therefore it ought not to be assigned to Caesar." Sermon Against Auxentius 35, checked by script: exact.
- Quotation (NPNF): the emperor "is within the Church, not above it." Sermon Against Auxentius 36, checked by script: exact ("For the Emperor is within the Church, not above it.").
- In 388 Christians at Callinicum, a town on the Euphrates, burned a synagogue; the report said their bishop put them up to it. Letter 40.6 (patristic library, read by the verifier): "A report was made by the military Count of the East that a synagogue had been burnt, and that this was done at the instigation of the Bishop." Letter 40 names Callinicum. Year and place: search on 2026-10-28 (Jewish Encyclopedia "Ambrose"; Harry Freedman, "Should the Bishop Pay?"). Verified.
- Theodosius ordered the bishop to rebuild it at his own expense. Letter 40.6: "the synagogue be rebuilt by the Bishop himself"; Letter 40.10 protests a synagogue built "out of the spoils of the Church". Search on 2026-10-28: Jewish Encyclopedia, "the Bishop should re-build the synagogue at his own cost". Verified (the primary text says "by the Bishop himself"; "at his own expense" is the reference-work wording).
- Ambrose wrote in protest (Letter 40), then confronted Theodosius in church and would not go to the altar until the emperor promised to change the order; Theodosius gave way. Letter 41.1 ("I wrote and sent a letter to the Emperor, and when he went to church I delivered this discourse") and 41.28 ("he said that he would amend the edict ... 'Act,' he said, 'on my promise.' And so I went to the altar, whither I should not have gone unless he had given me a distinct promise"), read by the verifier. Verified.
- "Two years later": 386 to 388. Arithmetic.
- The bishop used his standing "to spare Christians from repairing what they had destroyed." Letter 41.28 (the edict amended and the investigation ended "lest the Count should ... do any injury to the Christians"). Verified in substance.

## Is This the Separation of Church and State?

- No checkable facts beyond those above (Ambrose reaching for the saying when the court demanded a church: Sermon Against Auxentius 35, Epistle 20.19, both read). Voice pass, 2026-10-28: the draft grouped Ambrose with Christians who argued that no government may compel belief; Ambrose made only the church-building argument, so the sentence now credits him with that alone and leaves the compelled-belief argument to "Christians who have argued since then", a general description with no one named.

## When a Party Asks for What Belongs to God

- Quotation: "the devil took him to a very high mountain and showed him all the kingdoms of the world and their glory. And he said to him, 'All these I will give you, if you will fall down and worship me'" (Matthew 4:8–9). Verse 9 ("All these I will give you, if you will fall down and worship me", with its inner quotation marks) matched against search results quoting esv.org on 2026-10-28: exact. The verse 8 portion was matched only against the local ESV copy (exact; it has no inner quotation marks), since the search summary did not quote verse 8. "At the start of his ministry": Matthew 4 precedes 4:17 ("From that time Jesus began to preach"), textbook.
- Quotation: "Be gone, Satan! For it is written, 'You shall worship the Lord your God and him only shall you serve'" (Matthew 4:10). Same search: exact. The exclamation point is inside quoted Scripture.
- Quotation: "about to come and take him by force to make him king" and "withdrew again to the mountain by himself" (John 6:15). Matched against search results quoting esv.org and bible.com on 2026-10-28: exact. "A crowd he had fed": John 6:1-14, textbook.
- Ivan tells his brother a story about Christ returning to Seville in the worst days of the Inquisition and being arrested by the Grand Inquisitor, an old cardinal. Garnett, Book V ch. 5, read by the verifier: "My story is laid in Spain, in Seville, in the most terrible time of the Inquisition"; "the cardinal himself, the Grand Inquisitor ... an old man, almost ninety ... bids the guards take Him". Verified. The listener is Alyosha and the prisoner stays silent: textbook.
- The cardinal says the church has corrected Christ's work. Garnett: "We have corrected Thy work" (lines 11489-90). Verified.
- Quotation (Garnett): "We have taken the sword of Cæsar, and in taking it, of course, have rejected Thee and followed *him*." Garnett lines 11527-28, read by the verifier: exact (Garnett's _him_ in italics).
- "Dostoevsky aimed the story at Rome." Garnett: the Inquisitor burns "the enemies of the Roman Church" and says "We took from him Rome and the sword of Cæsar". Dostoevsky's anti-Catholic intent: textbook. Kept.
- Michele Margolis, political scientist: party loyalty, settled early in life, helps decide whether people go back to church as adults and how they describe their faith once they do. Search on 2026-10-28: *From Politics to the Pews* (University of Chicago Press, 2018); Washington Monthly review "Party Faithful" (partisanship forms before religious identity; Republican young parents more likely than Democratic ones to return to a tradition and resume attendance); Syracuse and Yale ISPS summaries (during child-rearing, partisanship shifts key aspects of religious identity); Religion News Service (the theory does not apply to African Americans, which the essay's "many Americans" allows). Verified through reviews and summaries; the book itself was not read. The essay names no title, year or statistic.
- Quotation: "but never again prophesy at Bethel, for it is the king's sanctuary, and it is a temple of the kingdom" (Amos 7:13). Matched against search results quoting biblia.com and bibliavida.com (ESV) on 2026-10-28: exact.
- Amaziah, priest of Bethel, told Amos to go to Judah and prophesy there. Amos 7:10-12, local ESV copy ("go, flee away to the land of Judah ... prophesy there"). "Go home": Amos 1:1 (Tekoa) and Tekoa in Judah (textbook). Verified.
- Bethel as the royal shrine of the northern kingdom. Amos 7:10, 13 (local ESV copy). Verified from the text.
- Biography: "the church I serve". James is a pastor (NOTES.md: confirmed). No scene invented.

## The Inscription Over the Cross

- Quotation: "Shall I crucify your King?" and the chief priests answered, "We have no king but Caesar" (John 19:15). Matched against search results quoting esv.org and biblia.com on 2026-10-28: exact.
- The chief priests belonged to the leadership whose circle in Mark sent the questioners. Mark 11:27 and 12:12-13, local ESV copy. Verified from the text.
- Mark uses the Greek word for "inscription" (ἐπιγραφή) only twice: 12:16 and 15:26. SBLGNT Mark, lemma search by the verifier: 021216 and 021526 only. Verified.
- Quotation: "And the inscription of the charge against him read, 'The King of the Jews'" (Mark 15:26). Matched against search results quoting esv.org and bibliavida.com on 2026-10-28: exact.
- Quotation: "the image of the invisible God, the firstborn of all creation" (Colossians 1:15). Matched against search results quoting esv.org and blueletterbible.org on 2026-10-28: exact. SBLGNT: "εἰκὼν τοῦ θεοῦ τοῦ ἀοράτου".
- Quotation: "Yet not what I will, but what you will" (Mark 14:36), in Gethsemane (Mark 14:32). Matched against search results quoting esv.org on 2026-10-28: the summary reports the wording matches; local ESV copy exact.
- "On the cross he gave his life into his Father's hands." Marked paraphrase of Luke 23:46 (local ESV copy: "Father, into your hands I commit my spirit!"). No quotation marks in the essay.
- God raised him on the third day. Confession (1 Corinthians 15:4, not quoted).
- Quotation: "are being transformed into the same image from one degree of glory to another" (2 Corinthians 3:18). Matched against search results quoting esv.org on 2026-10-28: exact.

## Closing Texts

- *"Render to Caesar the things that are Caesar's, and to God the things that are God's."* (Mark 12:17). Search on 2026-10-28, as above: exact.
- *"He is the image of the invisible God, the firstborn of all creation."* (Colossians 1:15). Matched against search results quoting esv.org on 2026-10-28: exact.
- *"The earth is the LORD's and the fullness thereof, the world and those who dwell therein."* (Psalm 24:1). Search on 2026-10-28, as above: exact; the ESV verse ends with a comma, the closing line with a period.

## Links

- /writing/the-early-church-under-rome, /writing/when-the-church-married-empire, /writing/the-conservative-blind-spot, /writing/the-progressive-blind-spot. The verifier confirmed all four slugs appear in `docs/work/essays/link-targets.json` on 2026-10-28. (The writer also ran `node scripts/validate-essays.mjs` on a scratch copy and reported it clean; not rerun by the verifier.)
- Not linked: /writing/what-romans-13-says (natural sibling for Romans 13:7), because it was not public when written. Add it at landing if that essay is live by then.

## What the old essays said that this rewrite dropped or corrected (writer's record, kept)

- Old essay: the denarius bore "an inscription naming him divine". Corrected: the legend calls Tiberius son of the divine Augustus, not divine himself (verified above).
- Old essay: early Christians were killed for refusing to say "kurios kaisar". Dropped.
- Old essay: N. T. Wright (2000), William Cavanaugh (2009), Robert Louis Wilken (1984) cited without quotation. Dropped.
- Old essay: "The same words that sounded like a sword in 64". Dropped (no source).
- Folded essays: Machen, the Moral Majority, David Wells, Neil Postman, Brueggemann, Hauerwas and Willimon, Barmen, Bonhoeffer and several passages were not used, so not checked. Kept from them: Matthew 4:8-10, John 6:15, Amos 7:13, the Grand Inquisitor (now quoted from Garnett), and the test of naming your own side's wrongs.
- Left out by the writer as not confirmed well enough: Gelasius I to Anastasius (494); Luther's *Temporal Authority* (1523).

## Verifier's changes (2026-10-28)

- One correction: "Mark's version is the shortest" became "Mark tells it in five verses" (see The Question in the Temple). No other wording changed.
- Checks after the edit: no em-dashes; no word from the CLAUDE.md forbidden list; the one exclamation point is inside quoted Scripture (Matthew 4:10).

## Voice and audit pass (2026-10-28)

- Wording only; no fact, quotation, number, date, name or link added. Script check: the 57 quotations, 30 Scripture references and 4 links match the verified draft exactly.
- Changes that touch lines above: the standfirst (see Title and standfirst); Ambrose in the separation section (see that section); "carrying Caesar's money" became "could produce Caesar's money" (Mark 12:16 says only "they brought one"); "trading in his markets" cut; "the same bishop showed how easily the line can be moved" cut, so the Callinicum paragraph opens "Two years later, in 388"; "a party doesn't ask for incense" cut (the early-church pilot's controlling image).
- Gates on a scratch JSON copy: `validate-essays.mjs`, `validate-grow-voice.mjs --essays` and `validate-no-emdash.mjs --essays` all clean.

## Still open

- ESV wording against esv.org or the ESV API with James's key (every Scripture line was matched only against search-result summaries and the local ESV copy).
- Tertullian's *On Idolatry* "around the year 200": kept as an approximation of a debated date (about 196-211).
- Margolis's finding: checked only through reviews and summaries, not the book.
- Textbook items kept: Josephus's career and the date of *Antiquities*, the Herodians (hedged), Valentinian II's age, Dostoevsky's aim, the Septuagint as the Greek-speaking Jews' Bible.
- needs_james: no. No contested second-order doctrine is argued or settled; the essay states no position on war-tax resistance, pacifism or church establishment.
