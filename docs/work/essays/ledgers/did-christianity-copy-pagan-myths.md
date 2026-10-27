# Claims ledger: did-christianity-copy-pagan-myths

Essay: `docs/work/essays/did-christianity-copy-pagan-myths.md` ("Did Christianity Copy Pagan Myths?"). New essay; NOTES.md lists it among the new titles and it folds in no older slug. The writer's ledger of 2026-10-27 checked the patristic and classical quotations against cloned texts and marked every ESV quotation and every modern book or scholar "unverified (memory)." The verifier rechecked every claim on 2026-10-27 and rewrote this ledger. Each line gives the result and the method actually used.

## Read this first: no web search was available for this check

The workflow's shared web-search budget was used up before this check began. The one WebSearch call this run made (for the *Zeitgeist* film's Horus claims) came back "this turn's web search budget is used up." No search result was seen for this essay, and no page on esv.org, Wikipedia or any publisher's site was opened. Every check below was made against texts reachable through GitHub or already in this repository.

What the method words below mean:

- **"ESV copy"**: compared by script on 2026-10-27 with the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown"), commit fd66568 (2022-01-20), already cloned in the session scratchpad (`scratchpad/esv-mdbible`) and read with `git show`. Its `json/ESV.json` names itself "English Standard Version 2011," so this is the 2011 ESV text, not the 2016 text and not esv.org. The script compared each quotation with the verse twice: once ignoring case and punctuation, and once keeping punctuation and case (only curly quotes and the parser's stray space before punctuation were normalized). Every Scripture quotation in the essay matched both times. Recheck against esv.org with James's API key once it exists.
- **"WDB"**: read with `git show` on 2026-10-27 in the HistoricalChristianFaith/Writings-Database clone already in the scratchpad (`scratchpad/wdb`, commit 328918a, 2026-10-25); HTML stripped by a script and the passages found with grep. Files used: Origen, *Against Celsus* Book 2; Justin Martyr, *The First Apology*, *Dialogue with Trypho* and *The Martyrdom of the Holy Martyrs*; Tertullian, *The Prescription Against Heretics* and *On Baptism*; Gregory the Dialogist, *Register of Epistles* Book 11; Augustine, *On the Trinity* Book 4. The files do not name a translator; they read as the ANF/NPNF translations, and the Gregory file carries the NPNF editor's footnotes. No machine-translated Migne file was used.
- **"Perseus"**: read on 2026-10-27 in the PerseusDL canonical-greekLit (commit 0189b9c) and canonical-latinLit (commit 0700a6b) blobless clones already in the scratchpad (`scratchpad/perseus`), converted from TEI to plain text by a script. The translator is the one named in each file's TEI header: Frank Cole Babbitt (Plutarch, *Isis and Osiris*, eng3), Bernadotte Perrin (Plutarch, *Pompey*, eng2), W.H.S. Jones and H.A. Ormerod (Pausanias, eng2), T.A. Buckley (Euripides, *Bacchae*, eng2), A.M. Harmon (pseudo-Lucian, *The Syrian Goddess*, eng2, rendered in mock Middle English), A.D. Godley (Herodotus, eng2), Alfred John Church and William Jackson Brodribb (Tacitus, *Annals*, eng1). Statius was read in the Latin (J.H. Mozley's text, lat2); the English rendering in the essay is the writer's.
- **"Swete LXX"**: read on 2026-10-27 in the public repository nathans/lxx-swete (Swete's Septuagint), commit 26bad3e, already cloned in the scratchpad (`scratchpad/gcg-dl/swete`), file `data/24.Machabaeorum_ii.txt`.
- **"Latin Library"**: the public repository cltk/lat_text_latin_library, cloned blobless by this run on 2026-10-27 (commit 76229ac), file `bede/bede1.txt` (Bede, *Ecclesiastical History* Book 1, Latin), read with `git show`.
- **"Repo creed"**: this repository's `client/public/creeds/documents/apostles-creed.json`, read on 2026-10-27.
- **"Checked against NOTES"**: checked against the biography rules in `docs/work/NOTES.md` and `docs/work/essays/BRIEF.md`.
- **"Not checked (textbook)"**: no source was opened or searched; the verifier judged it standard reference knowledge. That judgment is not a check.
- **"Not checked (memory), kept"**: a date, title or characterization of a modern book or scholar that no reachable source could test. It stays because the verifier judged it standard and low-risk; it should be checked when search or the book is available.

## Corrections made in the essay (2026-10-27)

1. Standfirst: "copied from Horus, Mithras and other dying-and-rising gods" became "copied from Horus, Mithras and other pagan gods." Reason: the essay itself shows that no ancient source gives Mithras a death (see Mithras below), so calling him a dying-and-rising god in the essay's own voice contradicted its argument.
2. Celsus: "he runs through a list: Orpheus, Heracles, Theseus, Pythagoras, and an Egyptian king" became "a list that includes ...". Reason: Celsus's list in *Against Celsus* 2.55 (WDB) also names Zamolxis and Protesilaus; the colon presented a selection as the whole list.
3. Plutarch: "there is no star" became "there is no star in the east." Reason: Plutarch's treatise does mention a star, the Dog-star, which the Egyptians call the star of Isis (ch. 21 and 38, Babbitt, Perseus). No star announces a birth in his story, which is the film's claim; the new wording says only that.
4. Mithras: "he and Tertullian mention a sacred meal and a mark on the forehead" became "Both he and Tertullian mention bread in the cult's rites, and Tertullian adds a mark on the forehead." Reason: Justin mentions bread and a cup of water at Mithraic initiations (First Apology 66, WDB) but not a mark on the forehead; Tertullian mentions the mark and "the oblation of bread" (*Prescription* 40, WDB). Neither uses the words "sacred meal." The sentence also became two.
5. Smith: "Some of Frazer's gods die and don't come back, like Osiris" became "don't come back to the living, like Osiris." Reason: Plutarch, quoted earlier in the essay, has interpreters who say Osiris "comes to life and reappears" (ch. 65) and speaks of his "revivification and regenesis" (ch. 35, Babbitt, Perseus). What Plutarch's priests teach is that Osiris rules the dead (ch. 78), which is the point Smith is paraphrased as making. The new wording agrees with the essay's own Plutarch section.
6. Overstatements: "Tertullian knew that initiates of Isis and Mithras were washed in water, the followers of Mithras shared a sacred meal, and the people of Byblos said Adonis lived again" became "Tertullian knew that initiates of Isis and Mithras were washed in water and that the followers of Mithras offered bread. The people of Byblos said Adonis lived again." Reason: the old sentence made Tertullian the witness for the Adonis rite at Byblos, which comes from *The Syrian Goddess*, not from Tertullian; and Tertullian's word is "oblation of bread," not a shared meal.

No Scripture quotation was found to be wrong, and no non-Scripture quotation was found to be wrong. All six changes are wording only; no quotation, date, number or link was changed.

## Biography

- "My own side of the Reformation." Verified as permitted. Checked against NOTES: James pastors a Baptist church, so "Protestant" self-identification is confirmed; the phrase implies no denomination beyond that. No other biography appears in the essay.

## Zeitgeist and Kersey Graves (opening)

- *Zeitgeist*, a documentary by Peter Joseph, released in 2007. Not checked (memory), kept. The one search attempted for it was refused (budget used up). Film, maker and year are widely known.
- The film's first section claimed Horus was born of a virgin on December 25, announced by a star in the east, sought by three kings, taught at twelve, was baptized at thirty, had twelve disciples, worked miracles, was crucified, lay dead three days and rose. Paraphrase, no quotation marks. Not checked (memory), kept. The film's narration was not available; this matches the verifier's recollection of Part I.
- The film said much the same of Attis, Krishna, Dionysus and Mithras, and concluded the Jesus story is a solar myth. Not checked (memory), kept.
- Kersey Graves, an American freethinker, published *The World's Sixteen Crucified Saviors* in 1875. Not checked (memory), kept. No copy of the book was reachable.
- Graves gave readers almost nothing they could check against an ancient text. Not checked (memory), kept. Characterization; the standard criticism of the book.
- Richard Carrier, who argues Jesus probably never existed, has warned readers not to rely on Graves's book. Paraphrase, no quotation marks. Not checked (memory), kept. The writer's ledger identifies Carrier's review on the Secular Web (about 2003); it was not opened.
- "A century and a half," 1875 to 2026. Verified (arithmetic).

## Paul in Athens

- Luke says the city was full of idols. Verified (paraphrase). ESV copy, Acts 17:16: "he saw that the city was full of idols."
- Acts 17:22 "Men of Athens, I perceive that in every way you are very religious." Verified. ESV copy.
- Acts 17:23 "To the unknown god." Verified. ESV copy.
- Paul quoted their own poets. Verified. ESV copy, Acts 17:28 ("as even some of your own poets have said"). No quotation used.
- Acts 17:31 "has fixed a day on which he will judge the world in righteousness by a man whom he has appointed; and of this he has given assurance to all by raising him from the dead." Verified. ESV copy.
- Acts 17:32 "some mocked." Verified. ESV copy ("when they heard of the resurrection of the dead, some mocked"); the essay's "When Paul reached the resurrection" matches the verse.
- Temples of Isis stood in port cities around the Mediterranean; mystery cults offered initiation and the hope of a better lot after death. Not checked (textbook). Babbitt's introduction (Perseus) notes Isis worship in Greece before 330 BC from an inscription at the Peiraeus, the port of Athens.

## Celsus and Origen

- Celsus, a pagan philosopher, wrote against the Christians late in the second century. Not checked (textbook; usually dated about 170 to 180, as in the approved pilot the-early-church-under-rome).
- His Jewish spokesman asks why Jesus' rising should be treated differently and lists Zamolxis, Pythagoras, Rhampsinitus "in Egypt" (who "played at dice with Demeter in Hades"), Orpheus, Protesilaus, Hercules and Theseus. Verified, WDB, *Against Celsus* 2.55. The essay now says the list "includes" Orpheus, Heracles, Theseus, Pythagoras and the Egyptian (correction 2).
- Rhampsinitus was an Egyptian king. Verified. Perseus, Herodotus 2.122 (Godley): "later this king went down alive to what the Greeks call Hades and there played dice with Demeter."
- Quotation: "the statements of others not only to be myths, but to have the appearance of such." Verified, WDB, *Against Celsus* 2.55: "Or do you imagine the statements of others not only to be myths, but to have the appearance of such, while you have discovered a becoming and credible termination to your drama ...". The essay's "while their own story was credible" is paraphrase of the rest of the sentence. (The sibling essay did-the-resurrection-happen quotes the line before this one; this essay does not repeat it.)
- We have Celsus's words because Origen quoted them to answer them. Not checked (textbook). Consistent with Origen's practice throughout Book 2 (WDB) and with the approved pilot.
- Celsus thought the Christian story a myth like the others, and his complaint shows the Christians insisted otherwise. Verified as inference, WDB, *Against Celsus* 2.55.

## Justin Martyr

- Justin, a Christian philosopher teaching in Rome. Verified, WDB, *Martyrdom of the Holy Martyrs*: "I live above one Martinus, at the Timiotinian Bath; and during the whole time (and I am now living in Rome for the second time) ... if any one wished to come to me, I communicated to him the doctrines of truth."
- He wrote an appeal to the emperor. Verified, WDB, First Apology 1: "To the Emperor Titus Aelius Adrianus Antoninus Pius Augustus Caesar ...". "Around the middle of the second century": not checked (textbook; usually dated about 150 to 155).
- Quotations, First Apology 21: "was crucified and died, and rose again, and ascended into heaven" and "we propound nothing different from what you believe regarding those whom you esteem sons of Jupiter." Verified, WDB. One continuous sentence in the source, split in the essay by "Justin told him."
- Bacchus "after he had been torn limb from limb." Verified, WDB, First Apology 21.
- In the mysteries of Mithras bread and a cup of water were set out at initiations, in imitation of the Supper. Verified (paraphrase), WDB, First Apology 66: "Which the wicked devils have imitated in the mysteries of Mithras ... bread and a cup of water are placed with certain incantations in the mystic rites of one who is being initiated." The imitation is Justin's claim, and the essay attributes it to him.
- Bacchus was torn to pieces and "ascended into heaven." Verified, WDB, First Apology 54: "they taught that, having been torn in pieces, he ascended into heaven."
- Justin compared the virgin birth with Perseus, son of Danae. Verified, WDB, First Apology 22 ("if we even affirm that He was born of a virgin, accept this in common with what you accept of Perseus") and 21 ("Perseus, son of Danae").
- Quotation: "those many women whom he had violated." Verified, WDB, First Apology 21: "he came in to Ganymede and those many women whom he had violated."
- Demons heard the prophets and put forward sons of Jupiter so that Christ's story would seem "mere marvellous tales, like the things which were said by the poets." Verified, WDB, First Apology 54.
- Mithras "begotten of a rock," initiates in a cave. Verified, WDB, *Dialogue with Trypho* 70: "those who record the mysteries of Mithras say that he was begotten of a rock, and call the place where those who believe in him are initiated a cave."
- Justin and Tertullian both mention bread in Mithraic rites; Tertullian adds the mark on the forehead. Verified as corrected (correction 4): First Apology 66 and *Prescription* 40, WDB.
- Heracles climbed onto his own pyre. Verified, WDB, First Apology 21: "Hercules, when he had committed himself to the flames to escape his toils," listed among the sons of Jupiter said to have gone up to heaven. "The poets said he rose from it to the gods": not checked (textbook; the apotheosis of Heracles).

## Tertullian

- About half a century after Justin; Tertullian of Carthage. Not checked (textbook; the *Prescription* is usually dated about 200).
- "if my memory still serves me," Mithras marks his soldiers on the forehead, offers bread, and "introduces an image of a resurrection." Verified, WDB, *Prescription Against Heretics* 40: "if my memory still serves me, Mithra there, (in the kingdom of Satan, ) sets his marks on the foreheads of his soldiers; celebrates also the oblation of bread, and introduces an image of a resurrection." "Offered bread" is paraphrase outside the quotation marks.
- Tertullian said the devil imitates the sacraments. Verified (paraphrase), WDB, *Prescription* 40: the devil "by the mystic rites of his idols, vies even with the essential portions of the sacraments of God."
- Initiates of Isis and Mithras were washed in water. Verified, WDB, *On Baptism* 5: "washing is the channel through which they are initiated into some sacred rites-of some notorious Isis or Mithras."
- Christians wrote down some of these resemblances before their critics did. Verified as inference from the dates above (Justin's appeal to Antoninus Pius, before the usual date for Celsus); the dates themselves are textbook.

## Christmas, Gregory, Bede

- The New Testament gives no date for Jesus' birth. Not checked (textbook).
- A Roman calendar compiled in 354 lists Christ's birth in Bethlehem on December 25 and marks the day as the birthday of the Unconquered, a title of the sun; it is the first clear evidence for the date. Not checked (textbook: the Chronograph of 354, its Depositio Martyrum and civil calendar). No text of the Chronograph was reachable.
- Two explanations still argued over: the church chose the date to answer a festival of the sun, or it followed a reckoning that Jesus was conceived on March 25. Not checked (textbook summary of the debate).
- Augustine passes on that Jesus was conceived on March 25 and born on December 25. Verified, WDB, *On the Trinity* 4.5.9: "He is believed to have been conceived on the 25th of March, upon which day also He suffered ... But He was born, according to tradition, upon December the 25th." Paraphrase in the essay, no quotation marks.
- In 601 Pope Gregory the Great wrote to the abbot Mellitus, who was on his way to the mission in England. Verified, WDB, *Register of Epistles* 11.76, "Gregory to Mellitus, Abbot in France": the letter is dated "the 19th year of the empire of our most pious lord Mauricius Tiberius ... Indiction 4," and the NPNF editor's notes (63 and 45) say it was sent after Mellitus left Rome with the new missionaries, later than letters dated 22 June 601. Also read in Bede's Latin copy of the letter, Latin Library, *Ecclesiastical History* 1.30 ("Dilectissimo filio Mellito abbati").
- Quotation: "should not be destroyed, but that the idols themselves that are in them should be." Verified, WDB, Register 11.76. The Latin in Bede 1.30 agrees ("fana idolorum destrui ... minime debeant; sed ipsa, quae in eis sunt, idola destruantur").
- Temples sprinkled with holy water and made churches; the old feasts made into feasts for the martyrs. Verified (paraphrase), WDB, Register 11.76 ("Let blessed water be prepared, and sprinkled in these temples"; feasts "on the anniversaries of the holy martyrs" in place of sacrifices to demons). Bede's Latin reads "aqua benedicta."
- Quotation: "It is undoubtedly impossible to cut away everything at once from hard hearts." Verified, WDB, Register 11.76. Latin in Bede 1.30: "duris mentibus simul omnia abscidere impossibile esse non dubium est."
- More than a century later Bede recorded that the month in which the English kept Easter was named for a goddess Eostre. Not checked (textbook: Bede, *The Reckoning of Time* 15, written 725). The Latin Library clone has only Bede's *Ecclesiastical History*, so the passage could not be read.
- The evergreen and the yule log came from northern Europe's winter customs. Not checked (textbook).

## Frazer and the History of Religions School

- James George Frazer, Scottish, published the first edition of *The Golden Bough* in 1890 and larger editions later. Not checked (textbook).
- Frazer grouped Adonis, Attis and Osiris as gods who died and rose with the crops. Not checked (textbook; the third edition's volumes are titled *Adonis, Attis, Osiris*).
- For a generation the idea had standing in the universities; German scholars of the History of Religions School argued Paul's baptism language drew on the mystery cults. Not checked (textbook). No names are given in the essay.
- Romans 6:4 "buried therefore with him by baptism into death." Verified. ESV copy ("We were buried therefore with him by baptism into death").
- Specialists later went back to the texts god by god and Frazer's family came apart; the popular lists did not follow. Not checked (characterization of the field; consistent with the Smith and Mettinger lines below).

## Plutarch, Isis and Osiris

All quotations checked in Perseus against the Babbitt translation (Loeb), tlg0007.tlg089 eng3, reread by this run.

- Plutarch was a Greek writer and a priest at Delphi, and wrote *Isis and Osiris* around the beginning of the second century. Not checked (textbook). Babbitt's introduction confirms only that the work is dedicated to Clea, "priestess at Delphi."
- Typhon is the Greek name for Seth. Verified, ch. 41 ("the Egyptians regularly call Typhon Seth").
- Typhon is Osiris's brother. Verified, ch. 12: Rhea bears Osiris, Arueris, Typhon, Isis and Nephthys on the five intercalated days (one tradition gives them different fathers, so they are brothers through their mother).
- Typhon tricks Osiris into lying down in a chest and the plotters shut him in. Verified, ch. 13: "Osiris got into it and lay down, and those who were in the plot ran to it and slammed down the lid."
- Isis is Osiris's sister and wife. Verified, ch. 27 ("the sister and wife of Osiris").
- Isis finds the chest at Byblos. Verified, ch. 15 to 16 ("came to Byblus").
- Typhon, hunting by moonlight, finds the body and divides it into fourteen parts; Isis searches the swamps. Verified, ch. 18: "Typhon, who was hunting by night in the light of the moon ... divided it into fourteen parts ... sailing through the swamps in a boat of papyrus."
- Horus was already a child. Verified, ch. 18: "her son Horus, who was being reared in Buto."
- Quotation: "Osiris consorted with Isis after his death," and she bore Harpocrates. Verified, ch. 19.
- No virgin, no star in the east, no twelve, no cross, no third day in Plutarch's story; no baptism at thirty or crucifixion. Verified by reading the narrative (ch. 12 to 19) and by searching the whole Babbitt text: no "virgin," "twelve," "crucif," "baptiz" or "three days"; "third day" only for Typhon's birth (ch. 12); "cross" only for priests crossing to an island; "thirty" only in "thirtysix." The text does mention a star, the Dog-star as Isis's star (ch. 21, 38), hence correction 3.
- Osiris does not walk out of a tomb. Verified as stated for the narrative: after his death "Osiris came to Horus from the other world" (ch. 19).
- Quotation: "this god Osiris is the ruler and king of the dead." Verified, ch. 78.
- Quotations: "is being buried at the time when the grain is sown," "comes to life and reappears when plants begin to sprout," and Harpocrates born "about the time of the winter solstice." Verified, ch. 65. Plutarch reports these as what others say.
- Quotation: "numerous and tiresome." Verified, ch. 65 ("the numerous and tiresome people").
- Plutarch a devout pagan. Not checked (characterization), kept. In ch. 78 he sets out the priests' teaching about Osiris with evident reverence.

## Mithras

- The god Mithra is very old in Persia. Not checked (textbook).
- Cilician pirates whom Pompey fought in the 60s before Christ practiced "certain secret rites, among which those of Mithras continue to the present time." Verified, Perseus, Plutarch, *Pompey* 24 (Perrin): the pirates' power "had its seat in Cilicia at first," and they "celebrated there certain secret rites, among which those of Mithras continue to the present time, having been first instituted by them." The date of Pompey's campaign (67 BC) is not checked (textbook).
- The Roman mysteries are known mostly from shrines built from the late first century on, cave-like halls with the bull-killing scene; the followers left almost no writing. Not checked (textbook).
- Statius, writing around AD 90, pictured Mithras twisting the horns beneath the rocks of a Persian cave. Verified for the text, Perseus Latin, *Thebaid* 1.719-720 (line numbers from the TEI `<l n>` tags): "seu Persei sub rupibus antri / indignata sequi torquentem cornua Mithram." The date is not checked (textbook; the *Thebaid* was finished about 91 to 92).
- No surviving source tells a story of Mithras dying; in the monuments he is the one who kills. Not checked (reference knowledge, the consensus of Mithras scholarship as the verifier knows it). Kept.
- The Roman mysteries grew up in the same centuries as the church; influence either way is hard to prove. Judgment, not a factual claim.

## Dionysus

- Pausanias, a Greek traveler of the second century. Not checked (textbook).
- At Elis priests sealed three empty pots in a building and found them full of wine the next day; Pausanias was not there for the festival. Verified, Perseus, Pausanias 6.26.1-2 (Jones and Ormerod): "Three pots are brought into the building by the priests and set down empty ... The doors of the building are sealed ... On the morrow ... they find the pots filled with wine. I did not myself arrive at the time of the festival."
- Some scholars think John's Cana story was told with Dionysus in mind; others hear the prophets. Not checked (characterization of the debate; no names given).
- Amos 9:13 "the mountains shall drip sweet wine." Verified. ESV copy.
- Euripides' *Bacchae*, staged at the end of the fifth century before Christ. Not checked (textbook).
- Dionysus opens the play naming his parents, Zeus and Semele, daughter of Kadmos; the lightning killed her as she gave birth; her sisters said she conceived by a mortal and blamed Zeus. Verified, Perseus, *Bacchae* 1-42 (Buckley): "Dionysus, whom once Semele, Kadmos' daughter, bore, delivered by a lightning-bearing flame"; "my thunder-stricken mother"; "Semele had conceived a child from a mortal father and then ascribed the sin of her bed to Zeus." "Princess of Thebes": the opening places her tomb "near the palace" of Thebes, and Kadmos as king is not checked (textbook).

## Adonis

- A second-century treatise on the Syrian goddess, traditionally credited to Lucian. Not checked (textbook).
- At Byblos each year the people mourn Adonis, killed by a boar, make offerings to him as to the dead, and the next day declare that he lives. Verified (paraphrase), Perseus, *The Syrian Goddess* 6 (Harmon): "the dede that was don to Adoon be the bore ... everyche yeer thei beten here brestes ... thei maken offringes to Adoon, as though he were ded; and than, on the morwe, thei fablen that he is quick."
- Written about a century after Paul's letters. Not checked (arithmetic on textbook dates: Paul in the 50s, the treatise in the mid to late second century).

## Jonathan Z. Smith

- Historian of religion at the University of Chicago; his work had nothing to do with defending Christianity. Not checked (memory), kept.
- 1987 encyclopedia article on dying and rising gods (*The Encyclopedia of Religion*, ed. Mircea Eliade). Not checked (memory), kept. The essay names no title.
- He argued the category is largely a modern construction resting on imaginative reconstruction and very late or unclear texts; some gods die and do not come back to the living, others disappear and return without dying; much evidence for a celebrated rising is post-Christian. Paraphrase, no quotation marks. Not checked (memory), kept. Wording on Osiris adjusted (correction 5).
- "The scholar who did most to take Frazer's family apart." Judgment, kept.
- In a later book Smith argued that the comparison of early Christianity with the pagan cults grew up inside Protestant anti-Catholic polemic. Not checked (memory), kept (the writer identifies *Drudgery Divine*, 1990; title and year are not in the essay).

## Tryggve Mettinger

- Swedish Old Testament scholar; in 2001 argued that Dumuzi and Baal, among others, were understood to die and return with the seasons, and that Smith went too far. Not checked (memory), kept (the writer identifies *The Riddle of Resurrection*, 2001; the title is not in the essay).
- He found no evidence that the Christian proclamation of Jesus' death and resurrection was built from those myths. Paraphrase, no quotation marks. Not checked (memory), kept.

## Bart Ehrman

- Agnostic; *Did Jesus Exist?* (2012) argued against the idea that Jesus was invented. Not checked (memory), kept. The sibling ledger for the-historical-jesus carries the same claim, also not checked.
- In that book he took up the pagan parallels, found many popular claims not locatable in the ancient sources and the real parallels weaker than they look, read the resurrection belief as arising from Jewish hope for the end of the age, and does not believe Jesus rose. Paraphrase. Not checked (memory), kept. This is the paragraph most in need of a check against the book; if it does not match, cut the two sentences on the pagan parallels and the Jewish hope.

## Easter and the historical claim

- Luke 3:1 "In the fifteenth year of the reign of Tiberius Caesar, Pontius Pilate being governor of Judea." Verified. ESV copy. The verse dates the word of God coming to John and his preaching (Luke 3:2-3), as the essay says.
- Tacitus, who despised the Christians: Christus "suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus." Verified, Perseus, *Annals* 15.44 (Church and Brodribb). The same passage calls them "a class hated for their abominations" and the faith "a most mischievous superstition."
- In 1961 archaeologists at Caesarea found a stone carved with Pilate's name and title. Not checked (textbook).
- The creed: Jesus "suffered under Pontius Pilate." Verified, repo creed (Apostles' Creed: "suffered under Pontius Pilate, was crucified, dead, and buried").
- Romans 6:9 "We know that Christ, being raised from the dead, will never die again; death no longer has dominion over him." Verified. ESV copy.
- Many Jews of Jesus' day hoped for a bodily resurrection. Not checked (textbook).
- Isaiah 26:19 "Your dead shall live; their bodies shall rise." Verified. ESV copy.
- Second Maccabees, written in the generations before Jesus, tells of seven brothers tortured to death under Antiochus IV for keeping the law; one holds out his hands and says he hopes to receive them back from God. Verified for the story, Swete LXX, 2 Maccabees 7:1 (seven brothers compelled by the king to eat swine's flesh, tortured), 7:10-11 (the third "stretched out his hands courageously" and said, in the verifier's translation of the Greek, "from him I hope to receive these back again"), 7:9 ("for his laws"). That the king is Antiochus IV and the date of composition are not checked (textbook).
- Jews went to their deaths rather than sacrifice to a Greek god. Verified in substance, Swete LXX, 2 Maccabees 6:7-9 (Jews compelled to take part in the king's monthly sacrifice and the procession for Dionysus; those who would not adopt Greek ways were to be put to death). Wording kept.
- 1 Corinthians 15:4 "was raised on the third day in accordance with the Scriptures." Verified. ESV copy. Paul "handed on ... what he had received": ESV copy, 15:3.
- 1 Corinthians 15:6 "more than five hundred brothers at one time, most of whom are still alive." Verified. ESV copy.
- Paul gave names. Verified. ESV copy, 15:5 (Cephas) and 15:7 (James).
- Heracles on the pyre: see Justin above.
- Galatians 3:13 "Cursed is everyone who is hanged on a tree," Paul quoting the law of Moses. Verified. ESV copy (Galatians 3:13, "for it is written"; Deuteronomy 21:23, "a hanged man is cursed by God").
- Rome crucified slaves and rebels. Not checked (textbook).
- 1 Thessalonians 1:9 "turned to God from idols to serve the living and true God." Verified. ESV copy.

## Overstatements and Protestant polemic

- Martin Hengel, a German historian of ancient Judaism, showed in the 1960s how far Greek language and culture had spread in the Jewish homeland. Not checked (memory), kept (*Judentum und Hellenismus*, 1969; the essay gives only the decade).
- Alexander Hislop, a Scottish minister, first published *The Two Babylons* in 1853, arguing the Roman Catholic Church was Babylonian religion in Christian dress. Not checked (memory), kept.
- Hislop claimed Easter was the goddess Astarte, called Ishtar by the Assyrians. Paraphrase, no quotation marks. Not checked (memory), kept.
- The book is still in print; its Easter claim circulates every spring. Not checked (general observation), kept.
- No connection between English "Easter" and "Ishtar"; the link was popularized by a Protestant attack on Rome. Not checked (textbook etymology). "Popularized," not "invented," as the writer chose.
- Ralph Woodrow, an evangelical writer, popularized Hislop in the 1960s in *Babylon Mystery Religion*; later re-examined Hislop's sources, withdrew the book and wrote another explaining why. Not checked (memory), kept (the writer's dates: 1966 and *The Babylon Connection?*, 1997; only the decade is in the essay).

## C.S. Lewis

- Lewis came to Christian faith partly through conversations with friends about these myths. Not checked (memory), kept. No names or date in the essay.
- He thought the resemblances were what one would expect if human imagination were reaching for something real, and called the story of Christ a true myth that works like the others except that it happened. Paraphrase, no quotation marks. Not checked (memory), kept. Lewis's letters and essays are in copyright and no copy was reachable.
- Lewis took more of Frazer for granted than specialists now would. Judgment, kept.

## Closing Texts (ESV)

- 2 Peter 1:16 "For we did not follow cleverly devised myths when we made known to you the power and coming of our Lord Jesus Christ, but we were eyewitnesses of his majesty." Verified. ESV copy.
- Luke 24:39 "See my hands and my feet, that it is I myself. Touch me, and see. For a spirit does not have flesh and bones as you see that I have." Verified. ESV copy.
- 1 Corinthians 15:14 "And if Christ has not been raised, then our preaching is in vain and your faith is in vain." Verified. ESV copy.

## Links and mechanics

- [Was Jesus Real?](/writing/the-historical-jesus) and [Did the Resurrection Actually Happen?](/writing/did-the-resurrection-happen). Verified: both slugs are in `docs/work/essays/link-targets.json`.
- `node scripts/validate-essays.mjs` run on 2026-10-27 against a scratch JSON copy of the corrected essay reports three problems, all pipeline state: this slug is not yet in `client/src/lib/shelf.json`, and the two linked essays are on the shelf without a public rewrite yet. It reports no language, dash, exclamation, Scripture-reference or Closing Texts problem. A grep found no em-dash and no exclamation point; "fair" appears once ("That's a fair question").

## Checked and left out (writer's notes, kept)

- Inanna's three days in the underworld: not in the essay; could not be checked.
- Krishna, Attis and the film's "Anup the Baptizer": not discussed beyond naming what the film claimed.
- The often-cited exact sentences of Smith and Mettinger: not quoted, since neither could be checked word for word.
