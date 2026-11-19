# Ledger: the Mark pilot (bdoor)

Every historical claim in the new teaching on Mark's book page
(`client/public/bible/notes/mark/intro.json`, field `teaching`) and in the plain
notes on Mark 1 to 3 (`client/public/bible/notes/mark/plain/1.json` to `3.json`),
with the source it rests on and how it was checked. Searches were run on
2026-11-18. Direct page fetches were blocked on this machine, so checks rest on
search results that quote or summarise the source, cross-read against at least
two results where possible. Where a result could not give exact wording, the
site paraphrases and does not quote.

Scripture is quoted from the Berean Standard Bible files in the repository
(`client/public/bible/ch/`) and checked word for word by
`scripts/validate-bible-notes.mjs`. Counts of Greek words come from the same
files' Greek text.

## Who wrote Mark

| Claim | Source | Checked by |
|---|---|---|
| John Mark's mother's house in Jerusalem; he turned back; the split; Paul's later praise; cousin of Barnabas; "my son Mark" | Acts 12:12; 13:13; 15:37-39; Philemon 24; 2 Timothy 4:11; Colossians 4:10; 1 Peter 5:13 | BSB text in the repository |
| Papias, via Eusebius, Church History 3.39.15: the elder said Mark was Peter's interpreter, wrote accurately but not in order, had not heard the Lord, omitted nothing and added nothing false | Eusebius, Church History 3.39.15 | Search: virtualreligion.net/primer/papias.html; earlychurch.org.uk/papias.php; ehrmanblog.org. Paraphrased, not quoted |
| Papias wrote early in the second century, perhaps around 110 to 130 | Yarbrough, "The Date of Papias", JETS 26 (1983); Wikipedia summary of scholarly estimates (most around 110; 125 to 130 also common) | Search: galaxie.com/article/jets26-2-06; en.wikipedia.org/wiki/Papias_of_Hierapolis |
| Irenaeus, Against Heresies 3.1.1 (about 180): after the departure (Latin excessum) of Peter and Paul, Mark, Peter's disciple and interpreter, handed on in writing what Peter preached | Irenaeus, Against Heresies 3.1.1 | Search: newadvent.org/fathers/0103301.htm; logoslibrary.org; bkv.unifr.ch. Paraphrased |
| Clement of Alexandria: Peter's hearers in Rome asked Mark to write; Peter neither forbade nor urged it | Eusebius, Church History 6.14.6-7 | Search: bkv.unifr.ch (NPNF translation); documentacatholicaomnia.eu. Paraphrased |
| Bauckham argues Mark rests on Peter's testimony | Richard Bauckham, Jesus and the Eyewitnesses (2006) | Already in the repository's introduction (`author`); title and year standard |
| Kok argues the Petrine link was drawn partly to secure the Gospel's standing | Michael J. Kok, The Gospel on the Margins (2015) | Already in the repository's introduction and furtherReading |

## When, where, for whom

| Claim | Source | Checked by |
|---|---|---|
| Most date Mark late 60s to early 70s; chapter 13 is the hinge; a minority argues 40s or 50s | Repository introduction (`date`), consistent with Marcus 1992 | Search: Marcus, JBL 111 (1992) 441-62, gospelstudies.org.uk |
| Jewish revolt from 66; temple destroyed 70 | Standard; Marcus 1992 | Search as above |
| Peter crucified and Paul beheaded at Rome under Nero, by tradition | Eusebius, Church History 2.25 (with 1 Clement 5, Dionysius of Corinth) | Search: bkv.unifr.ch NPNF Eusebius 2.25; bam.sites.uiowa.edu |
| The great fire of Rome, July 64; Nero blamed Christians, many killed | Tacitus, Annals 15.44 | Search: livius.org; earlychurchtexts.com; Cambridge Companion to the Age of Nero |
| Latin loanwords: the quadrans (12:42 in Greek), the praetorium (15:16); Hengel argued for Rome | Martin Hengel (as summarised by Marcus 1992) | Search: Marcus 1992 PDF; patheos.com "Latinisms, Western Diction" |
| Marcus argues Syria; military Latin words were used wherever Rome ruled; Galilee proposed by others | Joel Marcus, "The Jewish War and the Sitz im Leben of Mark", JBL 111 (1992); Warren Carter, "Mark and Syria? An Assessment" (2014) | Search as above |
| Mark explains washing customs (7:3-4) and translates Aramaic (5:41, 7:34) | BSB text | Repository |

## The kind of book

| Claim | Source | Checked by |
|---|---|---|
| Euangelion in Roman use; the Priene inscription (9 BC) calls Augustus's birthday the beginning of good news | Priene calendar inscription (IK Priene 14) | Search: Santa Clara University page; en.wikipedia.org Priene calendar inscription; heurist.huma-num.fr |
| Gospels compared with ancient Lives; a first-century reader would hear them as Lives | Richard Burridge, What Are the Gospels? (1992) | Search: library catalogues (TAMU, WorldCat); 1517.org |

## Themes, Old Testament, other Gospels

| Claim | Source | Checked by |
|---|---|---|
| Euthys about forty times in Mark, eleven in chapter 1 | Count of the Greek text in the repository: εὐθὺς 41 times in Mark, 11 in chapter 1 (εὐθέως once more, in 7:35) | Script on `client/public/bible/ch/mark/*.json` |
| Wrede named the messianic secret in 1901; most reject his solution but keep the motif | William Wrede, Das Messiasgeheimnis in den Evangelien (1901); J. D. G. Dunn, "The Messianic Secret in Mark", Tyndale Bulletin 21 | Search: vridar.org; galaxie.com (Dunn); hts.org.za |
| Mark 1:2-3 joins Exodus 23:20 / Malachi 3:1 with Isaiah 40:3; manuscripts vary between "Isaiah" and "the prophets" | NET Bible note on Mark 1:2; Ehrman blog | Search: biblia.com NET note; ehrmanblog.org |
| Matthew repeats about nine tenths of Mark, Luke a little over half | B. H. Streeter, The Four Gospels (1924) | Search: gospelstudies.org.uk Streeter chapter 7; catholic.com; biblicaltraining.org |
| Augustine and the early church placed Matthew first; Farmer revived a form of it in the 1960s | Repository introduction (`date`); catholic.com on Matthean priority | Search as above |

## The ending

| Claim | Source | Checked by |
|---|---|---|
| Sinaiticus and Vaticanus (fourth century) end at 16:8 | Standard; textandcanon.org; thegospelcoalition.org | Search |
| Irenaeus quotes 16:19 around 180 (Against Heresies 3.10.5 or 3.10.6; editions number it differently) | Irenaeus | Search: textandcanon.org; kjvtoday. The site names no section number |
| Eusebius reported the accurate copies ended at 16:8 | Eusebius, Questions to Marinus | Repository introduction (`text`) |
| A shorter ending in a few manuscripts, some with both | Repository introduction (`text`: Codex Bobiensis) | Repository |

## How the church has read Mark

| Claim | Source | Checked by |
|---|---|---|
| Augustine called Mark Matthew's follower and abbreviator | Augustine, Harmony of the Gospels 1.2.4 | Repository introduction (`reception`) |
| The oldest Latin commentary, Irish, early 600s, probably Cummian, long under Jerome's name | Michael Cahill, The First Commentary on Mark (1998); Bischoff's attribution to Comianus | Search: muse.jhu.edu; codecs.vanhamel.nl |
| Jerome (398) gave Mark the lion because of the voice crying in the wilderness | Jerome, Preface to the Commentary on Matthew | Search: Wikisource NPNF II/6; newliturgicalmovement.org |
| Venetian merchants carried relics said to be Mark's from Alexandria in 828 | Translatio Marci | Search: en.wikipedia.org Saint Mark's relics; Fitzwilliam Museum |
| The Coptic church honours Mark as founder | Eusebius, Church History 2.16 | Repository introduction (`reception`) |
| Three-year lectionaries give Mark a year | Roman lectionary 1969; Revised Common Lectionary 1992 | Repository introduction (`reception`) |

## Timeline and map

| Claim | Source | Checked by |
|---|---|---|
| Herod Antipas, tetrarch of Galilee and Perea, 4 BC to AD 39 | Standard chronologies | Search: catholic-resources.org Roman era rulers; nowoezone NT chronology |
| Pontius Pilate, governor of Judea, 26 to about 36 | Josephus, Antiquities 18 | Search: biblicaltraining.org; Middlebury page citing Josephus |
| Tiberius, emperor 14 to 37 | Repository chapter note (Mark 1 `historical`) | Repository |
| Luke dates John's start to Tiberius's fifteenth year | Luke 3:1 | BSB text |
| Crucifixion AD 30 or 33 the two dates most proposed | Humphreys and Waddington; Meier and Dunn cited for 30 | Search: core.ac.uk paper; Chronology of Jesus summary |
| Places and their verses | BSB text of Mark | Script over the repository's text |
| Map positions | Approximate modern coordinates of the sites; the region of the Gerasenes and the Decapolis are regions, placed roughly and said so | Not a historical claim; drawn as a sketch, not a survey |
| The Decapolis: "ten cities", a league of Greek cities mostly east of the Jordan | Pliny's list; encyclopedias | Search: encyclopedia.com; catholic-resources.org |
| Scholars in the 1800s concluded Mark was first, and it became the most studied Gospel | Karl Lachmann (1835) on the order of episodes; Wilke and Weisse (1838); Heinrich Julius Holtzmann (1863), whose case won general favour | Search (second run): en.wikipedia.org Marcan priority; britannica.com The Synoptic problem; hypotyposeis.org chronology of the Synoptic problem |

## The plain notes on Mark 1 to 3 (checked on the second run)

The first run wrote the chapter notes; this run checked every historical claim
in them against searches run on 2026-11-18 or against the repository's own text.
Three sentences were corrected (marked "fixed").

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Camel's hair and leather belt describe Elijah; Elijah promised again; locusts allowed | 1:1-8 | 2 Kings 1:8; Malachi 4:5; Leviticus 11:22 | BSB text |
| Untying a master's sandals was a slave's task (a later rabbinic saying lets a disciple do every slave's task for his teacher except this one) | 1:1-8 | Babylonian Talmud, Ketubot 96a (Rabbi Joshua ben Levi), later than Mark; reference works on Mark 1:7 | Search: biblicaltraining.org "Shoe latchet"; rabbigarygreene.blogspot.com on Ketubot 96. The site states the custom, not the Talmud's words |
| Mark uses schizō only at 1:10 and 15:38 | 1:9-11 | Count of the Greek text | Script on `client/public/bible/ch/mark/*.json`: 2 uses |
| "Drove" (ekballō) is the word used for driving out demons | 1:12-13 | Greek text: 1:12, 1:34, 1:39, 3:15, 3:22-23 and more | Script: 18 uses |
| "Solitary place" is the same word (erēmos) as wilderness in 1:3, 4, 12, 13 | 1:35-39 | Greek text | Script: 1:3, 1:4, 1:12, 1:13, 1:35 (and 1:45, 6:31-35) |
| The woman "served" with the word Jesus uses in 10:45 | 1:29-34 | Greek text: diakoneō at 1:13 (the angels), 1:31, 10:45, 15:41 | Script. **Fixed:** the note had called her the first person in Mark to serve; it now names the angels of 1:13 first and calls her the first human being |
| The Galilee boat: found in 1986 in a drought, about 8 metres long, many repairs, from about the first century | 1:16-20 | Israel Antiquities Authority; Wikipedia "Sea of Galilee Boat" (8.27 m; dated 40 BC plus or minus 80 by radiocarbon, first century by pottery and building method; repeated repairs, twelve kinds of wood) | Search: en.wikipedia.org Sea of Galilee Boat; antiquities.org.il; jewishvirtuallibrary.org |
| Capernaum's white synagogue is later; dark basalt foundations beneath may be first century | 1:21-28 | Franciscan excavations as summarised by the Jewish Virtual Library and Biblical Archaeology Review (Strange and Shanks) | Search: jewishvirtuallibrary.org The Synagogue at Capernaum; library.biblicalarchaeology.org. **Fixed:** the date of the white building is disputed (some scholars say earlier than the late 300s); the note now says "most often dated" and gives the other view |
| A house honoured as Peter's under a church of the 400s; Egeria shown it in the late 300s | 1:29-34 | Egeria's account (about 381 to 384); the octagonal church of the mid to late 400s | Search: jewishvirtuallibrary.org Church of the House of Peter; dig.corps-cmhl.huji.ac.il; christiantoday.com (on what cannot be proved). The note already says it cannot be proved |
| The Jewish day ran sunset to sunset; carrying a load forbidden on the Sabbath | 1:29-34 | Jeremiah 17:21-22; Mark 1:32 | BSB text. **Fixed:** the note had said "the prophets forbade work"; it now names Jeremiah and the carrying of loads, which is what that passage says |
| Biblical "leprosy" is not Hansen's disease; the word also covered mould on cloth and walls; the outcast's rules; touch made unclean; priest declares clean | 1:40-45 | Leviticus 13:45-46; 13:47-59; 14; 5:3 | BSB text; search: myjewishlearning.com Tzaraat; chabad.org "Is Tzaraat Leprosy" |
| "Moved with anger" at 1:41 in Codex Bezae and a few Old Latin copies; some scholars think it original | 1:40-45 | NET Bible note on Mark 1:41; Tyndale Bulletin 67.2 survey; Proctor (1999) for the anger reading | Search: biblia.com NET note; galaxie.com tynbul67-2-02; biblicalarchaeology.org |
| Capernaum houses small, of local basalt, around shared courtyards; flat roofs of beams, branches and earth; outside stairs | 2:1-12 | Franciscan excavations (insulae around courtyards); Strange and Shanks, BAR 1982, on the roof | Search: jewishvirtuallibrary.org Capernaum; library.biblicalarchaeology.org; holylandphotos.org |
| Luke speaks of tiles | 2:1-12 | Luke 5:19 | BSB text |
| Capernaum near the border of Antipas's and Philip's lands; Levi most likely a toll collector for Antipas; collectors' bad name | 2:13-17 | Archaeological and historical surveys of Capernaum (BYU Religious Studies Center, "Simon Peter in Capernaum"); bible encyclopedias | Search: rsc.byu.edu; israelbiblicalstudies.com. "Most likely" kept, since the arrangement is not certain |
| Pharisees kept purity rules at meals; to share a table was acceptance | 2:13-17 | Lane, BYU Religious Studies Center essay; ESV Study Bible, "Jewish Groups at the Time of the New Testament" | Search: rsc.byu.edu; biblestudytools.com |
| One commanded fast (Day of Atonement); "I fast twice a week" | 2:18-22 | Leviticus 16:29; Luke 18:12 | BSB text |
| Picking grain by hand allowed; harvest named in the Sabbath law; David and the bread; Abiathar and Ahimelech; Matthew and Luke omit the name | 2:23-28 | Deuteronomy 23:25; Exodus 34:21; 1 Samuel 21:1-6; 22:20; Leviticus 24:5-9; Matthew 12:3-4; Luke 6:3-4 | BSB text |
| The Mishnah, written down around AD 200, lists thirty-nine kinds of work, reaping and threshing among them | 2:23-28 | Mishnah Shabbat 7:2; redaction by Judah the Prince at the end of the second or start of the third century | Search: jtsa.edu Mishnah Shabbat 7:2; en.wikipedia.org 39 Melakhot; newworldencyclopedia.org Mishnah; jewishencyclopedia.com |
| Herodians: supporters of Herod Antipas | 3:1-6 | Encyclopedia of the Bible (Bible Gateway); biblicaltraining.org; the identification is the most widely held, not certain | Search |
| Idumea the homeland of Herod's family | 3:7-12 | Josephus, Antiquities 14 (Antipater the Idumean, Herod's father) | Search: en.wikipedia.org Antipater the Idumaean; jewishencyclopedia.com |
| "Zealot" translates an Aramaic word for zealous (Greek Kananaios; Luke 6:15 has Zēlōtēs) | 3:13-19 | Greek lexicons (G2581) | Search: biblehub.com 2581; blueletterbible.org |
| Twelve tribes; Sinai; Matthew a tax collector | 3:13-19 | Exodus 19; Matthew 10:3 | BSB text |
| 3:20-21 only in Mark | 3:20-21 | Comparison of the Synoptic parallels (Matthew 12, Luke 11) | Repository text; already in the introduction ("What only Mark has") |
| Baal-zebub of Ekron; "lord of the flies"; Baal-zebul "prince Baal" or "lord of the exalted house" | 3:22-30 | 2 Kings 1:2; Ugaritic zbl ("prince") with Baal; Catholic Encyclopedia; Cheyne's "lord of the mansion" | Search: newadvent.org Beelzebub; biblicaltraining.org; encyclopedia.com. Stated as "many scholars think", which the sources support |
| Brothers of Jesus: three readings (Mary and Joseph's children; Joseph's by an earlier marriage; cousins) and who holds each | 3:31-35 | Bauckham, "The Brothers and Sisters of Jesus: An Epiphanian Response to John P. Meier" (CBQ 1994) and his Themelios article "The Relatives of Jesus" | Search: biblicalstudies.org.uk article_relatives_bauckham; thegospelcoalition.org Themelios; firstthings.com |

Left out because it could not be checked: nothing new was cut on this run. The
three sentences above were narrowed rather than removed.

## The plain notes on Mark 4 (continuation run, 2026-11-18)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Sowing by hand; Jeremias argued seed was sown before ploughing; K. D. White and others disagreed; many think both were done | 4:1-9 | Jeremias, The Parables of Jesus; K. D. White, JTS 1964; NTS article "The Order of Sowing and Ploughing in the Parable of the Sower"; Payne (as cited by Keener, IVP commentary) | Search: cambridge.org NTS article; biblegateway.com IVP NT commentary; gospelstudies.org.uk JBL 1973 |
| A hundredfold as the LORD's blessing | 4:1-9 | Genesis 26:12 | BSB text. Varro's figures for Italian and Gadarene yields (in the deep note) could not be found by search and are not used |
| Parabolē "set alongside"; mashal covers proverbs, riddles, stories; Nathan's parable | 4:10-12 | Standard lexicons; 2 Samuel 12:1-7 | Repository deep note; BSB text |
| Mark's "be forgiven" against Isaiah's Hebrew "be healed"; agrees with the Targum of Isaiah 6:10; Jeremias read the Aramaic behind the last clause as "unless" | 4:10-12 | Isaiah 6:10 BSB; Parkin, Irish Biblical Studies 8 (1986); Moore on Mark 4:12 | Search: biblicalstudies.org.uk irish-biblical-studies 08-4_179; gospelstudies.org.uk Moore. Calvin's name (in the deep note) was dropped, since his reading was not checked here |
| Matthew gives the parables as a response to people already not seeing | 4:10-12 | Matthew 13:13 | BSB text |
| Jülicher: a parable makes one point; Blomberg: parables carry one point per main character | 4:13-20 | Jülicher, Die Gleichnisreden Jesu (1888, 1899); Blomberg, Interpreting the Parables | Search: biblegateway.com Encyclopedia of the Bible "Parable"; readingacts.com; wsproject.org review of Snodgrass |
| Rome after the fire of 64, or Syria, or Galilee | 4:13-20 | Ledger above (Tacitus, Annals 15.44; Marcus 1992) | Earlier ledger |
| Modios, a Latin loanword, a grain measure of about nine litres | 4:21-25 | Thayer's and Strong's lexicons (G3426) | Search: biblehub.com 3426; blueletterbible.org G3426 |
| "Does the lamp come" (erchetai) in the Greek; automatē in 4:28 | 4:21-29 | Greek text | Repository Greek text of Mark 4 |
| 4:26-29 only in Mark | 4:26-29 | Book page teaching ("What only Mark has") | Repository |
| Black mustard most likely; seed one to two millimetres; plant two to three metres in a season; a byword for a tiny amount in Jewish law; smaller seeds (orchids) exist | 4:30-34 | Botanical summaries; Mishnah Niddah 5:2 (via deep note) | Search: biblehub.com "Does the mustard seed claim fit botany"; virtualreligion.net parallel texts; hypr.bible "mustard" |
| Lake about 700 feet below sea level among hills; cold air dropping from the eastern heights raises sudden storms | 4:35-41 | Geographical surveys | Search: thattheworldmayknow.com Sea of Galilee geography; biblicaltraining.org; bibleodyssey.com |
| The Galilee boat (1986), about eight metres | 4:35-41 | Ledger above | Earlier ledger |
| "Rebuke" (epitimaō) and "be silent" (phimoō) at 1:25 and 4:39; megas at 4:37, 39, 41; akouō thirteen times in Mark 4 | 4:35-41 | Greek text | Script over the repository's Greek text |
| Sea as chaos ruled by God; Jonah's storm; "Why are You sleeping?" | 4:35-41 | Psalm 89:9; 107:29; Jonah 1:4-16; Psalm 44:23 | BSB text |

Left out: Varro's yields, Wachsmann's sandbag reading of the cushion, Luther's
Invocavit sermons, and the manuscript note on 4:40 (all in the deep note,
none checked on this run).

## The plain notes on Mark 5 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Pig unclean; touching a grave unclean seven days; Isaiah's people among graves eating pigs | 5:1-13 | Leviticus 11:7; Numbers 19:16; Isaiah 65:4 | BSB text |
| Later Jewish law forbade raising pigs; Antiochus IV ordered pigs sacrificed (160s BC) | 5:1-13 | Mishnah Bava Kamma 7:7; 1 Maccabees 1:47 | Search: Jewish Encyclopedia "Pig" (via icogsfg.org); biblegateway.com and biblehub.com 1 Maccabees 1:47; encyclopedia.com "Pig" |
| A legion about five thousand (five to six thousand) soldiers; the Tenth Legion (Fretensis) had a boar among its emblems; it fought in Judea | 5:1-13 | Livius, "Legio X Fretensis"; Center for Online Judaic Studies, Tenth Legion tile; Filología Neotestamentaria article on Legio X and Mark 5:13 | Search: livius.org; cojs.org; bsw.org |
| Gerasa about thirty miles from the lake; manuscripts read Gerasenes, Gadarenes, Gergesenes; Origen preferred Gergesa; Kursi excavated in the 1970s (Byzantine monastery, steep slope), identification disputed | 5:1-13 | Tzaferis (1983) via summaries; Wikipedia "Gergesa"; Gordon Franz (dissenting) | Search: douglasjacoby.com; en.wikipedia.com Gergesa; lifeandland.org (Franz); israelbiblicalstudies.com. Stated with "many think ... though not all agree" |
| "Most High God" in Genesis 14:18; the strong man of 3:27 | 5:1-13 | BSB text | Repository |
| "I adjure You" (horkizō), the language of an oath | 5:1-13 | Greek text of 5:7 | Repository Greek text |
| Decapolis a league of Greek cities | 5:14-20 | Earlier ledger (Pliny; encyclopedias) | Earlier ledger. The deep note's ruins at Jerash were not checked and are not used |
| "the Lord" in 5:19, "Jesus" in 5:20; silence commanded in 1:44 | 5:14-20 | BSB text | Repository |
| Synagogue leaders invite visitors to speak | 5:21-24 | Acts 13:15 | BSB text. The Theodotus inscription (in the deep note) is not used |
| Long flow of blood made a woman unclean, with her bed and seat (Leviticus 15:25-27); uncleanness bars approach to the sanctuary (15:31), not a sin; scholars debate how far it cut her off | 5:25-34 | BSB text; Haber, "A Woman's Touch", JSNT 26 (2003), reprinted in Haber, They Shall Purify Themselves (SBL); Jerusalem Perspective, "Purity Halakha in the Story of the Hemorrhaging Woman" | Search: sbl-site.org; jerusalemperspective.com. Haber's argument could not be read, so the site names no scholar and says only that the question is debated |
| "Daughter" said by Jesus to anyone only here in Mark | 5:25-34 | Greek text (thugatēr in 5:34, 35; 6:22; 7:25, 26, 29) | Script over the repository's Greek text |
| Mishnah Ketubot 4:4: even the poorest man must provide two flutes and one wailing (lamenting) woman for his wife's funeral; Mishnah written down around 200 | 5:35-43 | Mishnah Ketubot 4:4 (Rabbi Judah); earlier ledger on the Mishnah's date | Search: sacred-texts.com; sefaria.org sheets; mishnah.org; posenlibrary.com |
| Talitha an affectionate Aramaic word for a little girl; koum "get up"; Mark translates | 5:35-43 | Greek and Aramaic lexicons (G5008) | Search: biblehub.com 5008 and topical "Talitha"; biblestudytools.com. The "little lamb" sense is an etymology only and is not used |
| Elijah and Elisha raise boys; Paul on "those who sleep in death" | 5:35-43 | 1 Kings 17:17-24; 2 Kings 4:32-37; 1 Thessalonians 4:13 | BSB text |
| Peter, James and John alone again at 9:2 and 14:33 | 5:35-43 | BSB text | Repository (not stated in the plain note beyond "only Peter, James, and John") |

Left out: the magical papyri, the Theodotus inscription, the Jerash ruins,
Ched Myers by name, Haber and Levine by name, the parakousas reading of 5:36
(all in the deep note, not checked on this run).

## The plain notes on Mark 6 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Nazareth a small village, most estimates a few hundred people (estimates vary widely) | 6:1-6 | Anchor Yale Bible Dictionary (as quoted); Biblical Archaeology Society, "Exploring Jesus's Hometown"; New World Encyclopedia | Search: biblicalarchaeology.org; newworldencyclopedia.org; virtualreligion.net. Stated as an estimate. The Sepphoris suggestion was checked but not used |
| Tektōn a builder or craftsman, usually in wood; Justin Martyr says Jesus made ploughs and yokes | 6:1-6 | Bauer-Danker lexicon (as summarised); Justin, Dialogue with Trypho 88 | Search: en.wikipedia.org Tektōn; logoslibrary.org and newadvent.org Dialogue 88 |
| James "the Lord's brother" | 6:1-6 | Galatians 1:19 | BSB text |
| Josephus on the stoning of James, "the brother of Jesus who was called Christ", around 62 | 6:1-6 | Josephus, Antiquities 20.200 | Search: lexundria.com 20.200; namb.net (Paul Maier); en.wikipedia.org James the Just. Given in single quotes as a translation, not as Scripture |
| Three readings of the brothers and sisters | 6:1-6 | Earlier ledger (Bauckham) | Earlier ledger |
| Matthew: "did not do many miracles" | 6:1-6 | Matthew 13:58 | BSB text |
| Shaking off dust; oil as medicine | 6:7-13 | Acts 13:51; Luke 10:34; James 5:14 | BSB text. Cynic and Essene comparisons (in the deep note) are not used |
| Antipas a son of Herod the Great; ruled Galilee 4 BC to AD 39; tetrarch, never king; asked Caligula for the title; accused (by Agrippa I) and exiled to Gaul in 39, Herodias with him | 6:14-29 | Josephus, Antiquities 18.240-256, as summarised; Matthew 14:1 | Search: en.wikipedia.org Herod Antipas; livius.org Herod Antipas; britannica.com; jewishencyclopedia.com |
| Herodias had been married to Antipas's half-brother; Antipas divorced the daughter of Aretas IV; Aretas defeated him about 36 | 6:14-29 | Josephus, Antiquities 18.109-116, as summarised | Search as above (sources differ on 36 or 37; "around AD 36" kept) |
| Josephus: John a good man; imprisoned and killed at Machaerus; Herod's suspicion of John's influence; some Jews saw the defeat as punishment for John's death | 6:14-29 | Josephus, Antiquities 18.116-119 | Search: livius.org "Josephus on John the Baptist"; lexundria.com 18.116-119; library.biblicalarchaeology.org "Machaerus". "Feared an uprising" was not found in the results, so the site says "suspicious of John's influence over the crowds" |
| Brother's wife forbidden; Ahab, Jezebel, Elijah; Esther's half kingdom; Pharaoh's birthday | 6:14-29 | Leviticus 18:16; 1 Kings 19:2; 21:25; Mark 9:13; Esther 5:3; Genesis 40:20-22 | BSB text |
| A denarius a day's wage; Matthew adds women and children; manna forty years | 6:30-44 | Matthew 20:2; 14:21; Exodus 16:35 | BSB text |
| Sheep without a shepherd; one shepherd, David; green pastures; hundreds and fifties; Elisha's twenty loaves; took, blessed, broke, gave at 14:22 | 6:30-44 | Numbers 27:17; Ezekiel 34:23; Psalm 23:2; Exodus 18:21; 2 Kings 4:42-44; Mark 14:22 | BSB text |
| "Solitary place" is erēmos | 6:30-44 | Greek text | Earlier ledger (script) |
| Fourth watch about 3 to 6 a.m. (Roman division of the night into four watches) | 6:45-52 | Translation handbooks; Easton's Bible Dictionary | Search: tips.translation.bible SIL notes on Mark 6:48; biblegateway.com Easton's "Watches"; Reformation Study Bible note |
| "Pass by": the Greek Old Testament uses Mark's verb (parerchomai) at Exodus 33:19, 22 and 34:6; God treads the sea | 6:45-52 | Exodus 33:22; 1 Kings 19:11; Job 9:8, 11 | BSB text; search: christiandefense.org; historicaljesusresearch.blogspot.com (Boring, Meier) |
| Egō eimi: "It is I" or "I am"; the Greek Old Testament's form for God's self-naming (Isaiah 43:10); scholars debate how much Mark means | 6:45-52 | Meier (surface meaning "It is I"); Boring (divine self-identification) | Search as above; catholic.com "The Divinity of Jesus According to Mark"; focusonthekingdom.org (the opposing case) |
| Hardened hearts: pōrōsis at 3:5, pepōrōmenē at 6:52 and 8:17 | 6:45-52 | Greek text | Repository Greek text |
| Kraspedon is the word for the tassels of Matthew 23:5; the tassels of Numbers 15:38-39 | 6:53-56 | Greek text of Mark 6:56 and Matthew 23:5; BSB text | Repository |

Left out: Gennesaret's fertility in Josephus, Bethsaida's disputed site, the
Machaerus excavations, the Theodotus inscription, Juvenal's baskets, the
Mishnah's blessing over bread, and the first husband's name in Josephus (all in
the deep note, not checked on this run).

## The plain notes on Mark 7 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Priests wash hands and feet before serving at the altar | 7:1-13 | Exodus 30:19-21 | BSB text |
| The tradition of the elders taught by mouth, later written in the Mishnah (around AD 200) | 7:1-13 | Earlier ledger (Mishnah's date) | Earlier ledger |
| Shammai and Hillel dispute whether hands are washed before or after mixing the cup | 7:1-13 | Mishnah Berakhot 8:2 | Search: mishnah.org; sacred-texts.com (Lukyn Williams, Berakhot); Wikisource translation of Berakhot 8 |
| Qorban carved on Second Temple ossuaries near Jerusalem as a warning against reuse | 7:1-13 | Fitzmyer, "The Aramaic Qorbān Inscription from Jebel Hallet et-Tûri and Mk 7:11/Mt 15:5" (reprinted 1997); Mount Scopus ossuary (Cathedra, 2007) | Search: orion-bibliography.huji.ac.il; cris.biu.ac.il "A New 'Qorban' Inscription on an Ossuary from Jerusalem". Stated generally, with no find-spot named |
| A vow concerning a man and his own parents may be opened (the Sages agree with Rabbi Eliezer there) | 7:1-13 | Mishnah Nedarim 9:1 | Search: jtsa.edu Nedarim 9:1; mishnah.org; sefaria.org sheet |
| Vows not to be broken; honour parents; cursing parents | 7:1-13 | Numbers 30:2; Exodus 20:12; 21:17; Isaiah 29:13; 2 Thessalonians 2:15 | BSB text |
| Masculine participle in 7:19 makes Jesus the one who cleanses all foods; most modern versions; the neuter (Textus Receptus, KJV) reads "purging all meats"; some scholars argue only the handwashing rules are meant | 7:14-23 | Robertson, Word Pictures; translation handbooks (UBS/SIL) | Search: biblestudytools.com Robertson on 7:19; tips.translation.bible on 7:19; freely-given.org Greek. Boyarin and Crossley (deep note) not named |
| Heart texts; Peter's vision; Romans 14:14 | 7:14-23 | Jeremiah 17:9; Psalm 51:10; Ezekiel 36:26; Acts 10:15; Romans 14:14 | BSB text |
| Tyrian silver shekels were the coin of the temple tax | 7:24-30 | Numismatic summaries | Search: en.wikipedia.org Tyrian shekel; coinweek.com "Graven images and the coins of ancient Tyre"; dannythedigger.com |
| Tyre and Sidon depended on the king's country for food; "Canaanite woman"; Israel God's son; first to Israel | 7:24-30 | Acts 12:20; Matthew 15:22, 24; Exodus 4:22; Genesis 12:3; Romans 1:16 | BSB text |
| "Lord" (kyrie) as a form of address to Jesus only at 7:28 in Mark; kynarion a little or house dog | 7:24-30 | Greek text of Mark | Repository Greek text (every vocative of G2962 in Mark 1 to 16); deep note on the diminutive (stated without taking a side on its force) |
| Tacitus: a blind man at Alexandria asked Vespasian to moisten his eyes with spittle (about AD 69-70) | 7:31-37 | Tacitus, Histories 4.81 | Search: penelope.uchicago.edu (Thayer) Histories 4; sacred-texts.com; en.wikipedia.org "Fasting spittle" |
| Mogilalos only at Mark 7:32 in the New Testament and only at Isaiah 35:6 in the Greek Old Testament | 7:31-37 | Thayer's lexicon; Constable's notes | Search: biblehub.com 3424; bibliaparalela.com Thayer's 3424. One low-authority site lists Exodus 4:10 too; the standard lexicon does not, and that is followed |
| Ambrose: the ears touched and Ephphatha said before baptism, so the ears would open to the word | 7:31-37 | Ambrose, On the Sacraments 1.1-3; On the Mysteries 1.3 | Search: newadvent.org On the Mysteries; sermonindex.net On the Sacraments; crossroadsinitiative.com. Placed as "the late 300s"; no exact year |
| Stenazō, "groan"; Isaiah 35; the Decapolis man of 5:20; eyes and ears in 8:18 | 7:31-37 | Romans 8:23; Isaiah 35:4-6; Mark 5:20; 8:18 | BSB text; repository Greek |

Left out: Josephus on the Pharisees and on the Tyrians, Furstenberg's thesis,
the Pseudo-Clementine names Justa and Bernice, Theissen by name, Pliny on
saliva, the lectionary, and Drouais's painting (all in the deep note, not
checked on this run). The cleansing of hands "with a fist" (7:3) is not
discussed.

## The plain notes on Mark 8 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The second feeding's baskets are spyris, the word of Acts 9:25; the first feeding's are kophinos | 8:1-10 | Greek text; Hastings' Dictionary of the Bible "Basket"; Strong's 4711 and 2894 | Search: biblehub.com 4711, 2894; studylight.org Hastings. "Large enough to hold a man" rests on Acts 9:25. Juvenal (deep note) not used |
| Dalmanutha named in no other ancient source and unlocated; Matthew has Magadan, also unknown; later copies change to Magdala | 8:1-10 | Bible dictionaries; textual commentaries | Search: studylight.org Hastings "Dalmanutha"; biblegateway.com Encyclopedia of the Bible "Magadan"; en.wikipedia.org Matthew 15 |
| Manna forty years; Elisha's loaves | 8:1-10 | Exodus 16:35; 2 Kings 4:43 | BSB text |
| Leaven removed at Passover; a little leaven; Luke's gloss; Herod Antipas killed John | 8:11-21 | Exodus 12:15; 1 Corinthians 5:6; Luke 12:1; Mark 6:14-29 | BSB text; earlier ledger (Antipas) |
| Eyes that do not see | 8:11-21 | Jeremiah 5:21; Ezekiel 12:2 | BSB text |
| Philip raised Bethsaida to a city and named it Julias; site disputed between et-Tell and el-Araj | 8:22-26 | Josephus, Antiquities 18.28; Arav; Notley and Aviam | Search: biblicalarchaeology.org "The Great Bethsaida Debate"; BAR Spring 2020; bibleinterp.arizona.edu. Sites not named on the page |
| Caesarea Philippi: Pan's cave (Paneas), at the foot of Hermon by a spring of the Jordan; Herod's temple to Augustus; Philip founded the city and named it Caesarea, "Philippi" to tell it from the coastal Caesarea | 8:27-30 | Josephus, Jewish War 1.404-405; Antiquities 18.28 | Search: en.wikipedia.org Banias; jewishvirtuallibrary.org Caesarea Philippi; biblewalks.com; biblicalarchaeology.org "Excavating Banias". The deep note's distance (forty kilometres) was not checked and is left out; the temple's exact site is not discussed |
| Psalms of Solomon 17 (first century BC; Atkinson dates it 37 to 30 BC): a son of David to clear Jerusalem of the nations and rule | 8:27-30 | Psalms of Solomon 17 | Search: paleojudaica.blogspot.com; readingacts.com; israelbiblecenter.com. Qumran texts (deep note) not used |
| Christ = Messiah = anointed; David's son | 8:27-30 | 2 Samuel 7:12-16 | BSB text; ordinary lexicon fact |
| Elders, chief priests and scribes together in Jerusalem's council | 8:31-33 | Mark 14:53; 15:1 | BSB text |
| "Get behind me" (hupage opisō mou) shares opisō mou with "Come, follow me" (1:17) and 8:34 | 8:31-33 | Greek text | Repository Greek text |
| Crucified Messiah a stumbling block; Isaiah 53; Psalm 118:22 quoted at 12:10; Daniel 7 | 8:31-33 | 1 Corinthians 1:23; Isaiah 53:3, 5; Psalm 118:22; Daniel 7:13-14 | BSB text. The deep note's "no Jewish text before Jesus" claim was not checked and is not used |
| Some scholars since about 1900 read the predictions as shaped after Easter | 8:31-33 | Wrede (1901) | Earlier ledger |
| Varus crucified about two thousand after Herod's death (4 BC) | 8:34-38 | Josephus, Antiquities 17.295; Jewish War 2.75 | Search: lexundria.com 17.295 and War 2.75 (Whiston). 4 BC from the earlier ledger |
| Plutarch: every criminal who is punished carries his own cross | 8:34-38 | Plutarch, On the Delays of the Divine Vengeance 9 | Search: cts.perseids.org (Goodwin translation). Paraphrased, no Moralia page number given (not confirmed) |
| Yehohanan: 1968, Giv'at ha-Mivtar, Jerusalem; heel bone with an iron nail, in an ossuary | 8:34-38 | Haas (1970); Zias and Sekeles (1985) | Search: en.wikipedia.org Jehohanan; cojs.org; library.biblicalarchaeology.org |
| Psychē means life and soul; Psalm 49:8; Hosea 2; Jeremiah 3; Galatians 2:20 | 8:34-38 | Greek text; BSB text | Repository; BSB text |

Left out: Theudas and the Egyptian prophet, the Qumran messiahs, the Targum and
Talmud on the Messiah, Origen and Augustine on the rock, Ignatius and Xavier,
Luther's Heidelberg theses, Bonhoeffer, the lectionary and the hymn (all in the
deep note, not checked on this run).

## The plain notes on Mark 9 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| A fuller (gnapheus) cleaned and whitened cloth; the word only here in the New Testament | 9:1-8 | Thayer's and Strong's lexicons (1102); translation handbooks | Search: biblehub.com 1102; tips.translation.bible on 9:3; Robertson's Word Pictures. Alkaline earths and the smell (deep note) not used |
| Booths of the Feast of Tabernacles | 9:1-8 | Leviticus 23:42-43 | BSB text |
| The mountain unnamed; Tabor first linked to it in Origen (third century), then Cyril and Jerome; many modern scholars suggest Hermon, near Caesarea Philippi; not settled | 9:1-8 | Catholic Encyclopedia "Transfiguration"; en.wikipedia.org Mount of Transfiguration | Search: newadvent.org; catholic.com; en.wikipedia.org. Heights, Barluzzi's church and Meron (deep note) not used |
| Sinai cloud six days; Moses' face; white as snow; Elijah's whirlwind; Moses' grave unknown; listen to the prophet like Moses | 9:1-8 | Exodus 24:16; 34:29; Daniel 7:9; 2 Kings 2:11; Deuteronomy 34:6; 18:15 | BSB text |
| Three readings of 9:1 (a mistake; the mountain; resurrection and Spirit) | 9:1-8 | Standard commentary positions | Stated as views, no names |
| Resurrection expected at the last day | 9:9-13 | John 11:24 | BSB text |
| Elijah before the Day of the LORD; turning hearts | 9:9-13 | Malachi 4:5-6 | BSB text |
| Ben Sira: Elijah ready to turn the heart of the father to the son and to restore the tribes of Jacob | 9:9-13 | Sirach 48:10 | Search: biblehub.com Sirach 48:10; bible.com RSV; intertextual.bible. The deep note's date (around 180 BC) was not checked and is not given |
| John dressed like Elijah; killed at Herodias's wish; Jezebel hunted Elijah | 9:9-13 | Mark 1:6; 6:17-29; 1 Kings 19:2 | BSB text; earlier ledger |
| On the Sacred Disease (about 400 BC) argues seizures have natural causes; Matthew says the boy "has seizures" | 9:14-29 | Hippocratic corpus; Matthew 17:15 | Search: encyclopedia.com "Epilepsy"; Hippocratic Corpus summaries; historyskills.com. Authorship left open (said "a Greek medical writing") |
| Took by the hand / stood up as in 5:41-42 | 9:14-29 | Mark 5:41-42 | BSB and Greek text |
| "And fasting" (9:29) absent from Sinaiticus (first hand) and Vaticanus; most modern versions omit; many think it added | 9:14-29 | Metzger-style textual commentary as summarised | Search: uasvbible.org NTTC on 9:29; blog.adw.org; confessionalbibliology.com (the opposing case) |
| Care: seizures and mental illness are illnesses; a plain line to real help | 9:14-29; 9:42-50 | CLAUDE.md, "Care for the reader in the hard places" | Pastoral, not a historical claim |
| Teachers sat to teach | 9:30-37 | Luke 4:20 | BSB text |
| Pais means both child and servant | 9:30-37 | Standard lexicons | Ordinary lexicon fact. Roman law on children (deep note) not used |
| Mark 10:45; Isaiah 53:3 | 9:30-37 | BSB text | BSB text |
| Jewish exorcists at Ephesus; Eldad and Medad; "He who is not with Me" | 9:38-41 | Acts 19:13; Numbers 11:28-29; Matthew 12:30 | BSB text. The Paris magical papyrus (deep note) not used |
| Mylos onikos: a millstone large enough to be turned by a donkey; hand mills small | 9:42-50 | Strong's and Thayer's (3684) | Search: biblehub.com 3684; blueletterbible.org G3684; bibleref.com |
| Gehenna from the Valley of Hinnom; child sacrifice at Topheth; the Valley of Slaughter | 9:42-50 | Jeremiah 7:31-32; 2 Kings 23:10 | BSB text |
| The rubbish-dump explanation first appears in David Kimhi around 1200 and has no ancient literary or archaeological support | 9:42-50 | Lloyd R. Bailey, "Gehenna: The Topography of Hell", Biblical Archaeologist 1986 | Search: bibleplaces.com (Bolen); godawa.com (Bailey PDF); thinkingtobelieve.com. Kimhi named only as "a Jewish commentator" |
| Isaiah 66:24; salt with every grain offering | 9:42-50 | Isaiah 66:24; Leviticus 2:13 | BSB text |

Narrowed: salt losing its saltiness. A search for impure Dead Sea salt
leaching could not confirm the deep note's explanation, so the page gives no
chemical account. The reading of 9:49 is given as open. The page takes no side
on the nature of hell beyond what Christians agree on.

Left out: Josephus on Moses' cloud, the Mishnah on Elijah, 1 Enoch and 4 Ezra,
Rabbi Akiva on Gehenna, Suetonius on drowning, the Mishnah on agents, the
Hippocratic author's name, and the textual question of verses 44 and 46 (all in
the deep note, not checked on this run).

## The plain notes on Mark 10 (continuation run, 2026-11-19)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The land beyond the Jordan (Perea) ruled by Herod Antipas; John killed for speaking against his marriage | 10:1-12 | Earlier ledger (Antipas, Perea); Mark 6:17-18 | Earlier ledger; BSB text |
| Herodias divorced her first husband while he was alive, against the laws of the Jews | 10:1-12 | Josephus, Antiquities 18.136 | Search: lexundria.com (Whiston 18.136); posenlibrary.com "Herodias Divorces Her Husband". Paraphrased, not quoted |
| Shammai: only for something shameful; Hillel: even if she spoiled his dish; Akiva: even if he found another more beautiful | 10:1-12 | Mishnah Gittin 9:10 (written down around 200, earlier ledger) | Search: posenlibrary.com "Grounds for Divorce"; mishnah.org Gittin 9:10 |
| Only the husband could divorce in Jewish law; a wife could in Roman law; Mark's verse 12 likely speaks to Roman readers | 10:1-12 | Scholarly summaries (Instone-Brewer; Posen Library "Divorce in Early Judaism") | Search: posenlibrary.com; douglasjacoby.com (Instone-Brewer PDF); christianhistoryinstitute.org. Stated as "likely" |
| The certificate's essential words: she is permitted to any man | 10:1-12 | Mishnah Gittin 9:3 | Search: en.wikipedia.org Get; mishnah.org; sacred-texts.com (Epstein). Paraphrased |
| The Damascus Document grounds a ban on two wives in a man's lifetime in Genesis 1:27 | 10:1-12 | CD 4:20-21 | Search: cojs.org (Baumgarten); palimpsest.stmarytx.edu CD text; intertextual.bible. Its scope (bigamy or remarriage) is debated, so the note says "a second wife in his lifetime" |
| Catholic, Orthodox and Protestant positions on remarriage; Heth-Wenham view | 10:1-12 | Deep note (Trent, Catechism 2382-2386, Westminster 24.5-6) | Stated as positions without dates or section numbers |
| Care: a person in an abusive marriage seeks safety, a pastor or counselor, a local domestic violence line; not legal advice | 10:1-12 | CLAUDE.md, "Care for the reader in the hard places" | Pastoral. No phone number given |
| Paidion used of the child in 9:36 and the girl in 5:39-41; Luke 18:15 "babies" | 10:13-16 | Greek and BSB text | Repository text |
| Aganakteō (indignant) used of Jesus only at Mark 10:14 in the Gospels; of the ten (10:41), others (14:4; Matthew 20:24; 21:15; 26:8; Luke 13:14) | 10:13-16 | Greek text in the repository (every G0023) | Repository Greek text |
| Young (Matthew 19:20); ruler (Luke 18:18); "do not cheat" not one of the Ten; Deuteronomy 24:14 | 10:17-22 | BSB text | BSB text. "May stand in for 'do not covet'" given as a possibility |
| Clement of Alexandria's Who Is the Rich Man That Shall Be Saved? is a sermon on Mark 10:17-31 arguing for freedom from the love of wealth | 10:17-22 | Clement, Quis dives salvetur (ANF vol. 2) | Search: ewtn.com; newadvent.org; logoslibrary.org. No date given |
| Antony heard the Gospel's words to the rich man read in church and gave his family land away | 10:17-22 | Athanasius, Life of Antony 2 | Search: history.hanover.edu; ewtn.com; bkv.unifr.ch. No date given; 300 acres not used |
| Camel and needle; Talmud's elephant through a needle's eye; no ancient evidence for a needle gate, which appears only many centuries later | 10:23-31 | b. Berakhot 55b; en.wikipedia.org "Eye of a needle" | Search: en.wikipedia.org; christiantoday.com; biblehub.com. Origin of the gate story (Theophylact or Anselm, contested) not given |
| Jericho to Jerusalem: about 25 km, a climb of about 1,000 m from below sea level | 10:32-34; 10:46-52 | Bible Odyssey "The road to Jericho"; walking accounts | Search: bibleodyssey.com; waynestiles.com; jerusalemperspective.com |
| Each step of the third prediction fulfilled (14:10; 14:64; 14:65; 15:15; 15:19-20; 15:37) | 10:32-34 | Mark | BSB text |
| Lutron the price of release; Exodus 21:30; Daniel 7:14; Isaiah 51:17; Psalm 75:8; Isaiah 53:12 | 10:35-45 | Standard lexicons; BSB | BSB text |
| Views of the ransom (to the devil; rejected; satisfaction; victory; a picture); debate over Isaiah 53 | 10:35-45 | Deep note | Stated as views; the deep note's names and dates (Origen, Gregory, Anselm 1098, Aulén) were not checked and are not given, except "the Reformers" |
| Son of David first used of Jesus in Mark here | 10:46-52 | Mark's text | Repository text |
| A poor man's cloak returned by sunset | 10:46-52 | Exodus 22:26-27 | BSB text |
| Kyrie eleison; the Jesus Prayer drawn in part from Bartimaeus and Luke 18:13 | 10:46-52 | Liturgical summaries | Search: en.wikipedia.org "Kyrie"; orthochristian.com "Biblical Roots of the Jesus Prayer"; salvationist.ca |

Narrowed: the deep note's line that the rich man's land was the safest wealth
a family could hold, and that running and kneeling were unusual for such a man,
were not checked and are not given. Clement and Antony are given no dates.

Left out: Josephus's own divorce, Salome and Costobarus, m. Yevamot 14:1, b.
Gittin 90b, the ketubbah, Tobit on treasure in heaven, Herod's winter palaces,
Josephus on the Samaria route, Tertullian and Calvin on the children, Cranach,
Hofmann's painting, and the lectionary (all in the deep note, not checked on
this run). The suggestion that Bartimaeus was named because the first
Christians knew him was cut (not checked this run).

## The plain notes on Mark 11 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Bethany a little under two miles from Jerusalem | 11:1-11 | John 11:18 | BSB text |
| Garments spread for Jehu; Zechariah 9:9; Psalm 118:25-26; Zechariah 14:4 | 11:1-11 | BSB | BSB text |
| Simon entered the Jerusalem citadel with palm branches and songs, 141 BC | 11:1-11 | 1 Maccabees 13:51 | Search: biblegateway.com; bible.usccb.org (dates it June 141 BC); tips.translation.bible |
| Hosanna first a plea, "save, please" (Psalm 118:25), later also a shout of praise; Psalm 118 in the Hallel of the feasts | 11:1-11 | en.wikipedia.org "Hosanna"; BAS Library "Hosanna" | Search: en.wikipedia.org; library.biblicalarchaeology.org; ligonier.org |
| Fig trees leaf in spring; sources differ on whether early figs (paggim) come before or with the leaves; main crop in summer | 11:12-14 | Bible encyclopedias; commentary on 11:13 | Search: wiki.bibleportal.com "Cursed Fig-Tree"; biblegateway.com Encyclopedia of the Bible "Fig Tree"; biblehub.com. The disagreement is stated, not resolved |
| Micah 4:4; Hosea 9:10; Jeremiah 8:13; Micah 7:1; Jeremiah 19 | 11:12-14 | BSB | BSB text |
| Fig tree as acted parable; a parable later told as event (compare Luke 13:6-9); the old reading against the Jewish people rejected | 11:12-14 | Deep note (Telford, Hooker, Marcus) | Stated as views without names. Bertrand Russell (1927) not checked this run and not named |
| Half shekel (Exodus 30:13); Tyrian shekel the temple coin | 11:15-19 | BSB; earlier ledger (Mark 7) | BSB text; earlier ledger |
| Money changers in the temple from 25 Adar | 11:15-19 | Mishnah Shekalim 1:3 | Search: mishnah.org; jewishvirtuallibrary.org Shekalim 1; outorah.org |
| Doves the offering of those who could not afford a lamb | 11:15-19 | Leviticus 5:7; 12:8 | BSB text |
| A pair of birds once cost gold denars in Jerusalem until Rabban Simeon ben Gamaliel's ruling brought the price down | 11:15-19 | Mishnah Keritot 1:7 | Search: jtsa.edu Keritot 1:7; mishnah.org; jwa.org "Kinnim" |
| Temple Warning inscription found 1871 (Clermont-Ganneau): a foreigner past the barrier is to blame for his own death | 11:15-19 | en.wikipedia.org "Temple Warning inscription"; Josephus | Search: en.wikipedia.org; armstronginstitute.org; cbnisrael.org (Turnage) |
| The temple mount not to be used as a shortcut | 11:15-19 | Mishnah Berakhot 9:5 | Search: mishnah.org; Wikisource translation; sacred-texts.com |
| Temple under construction 46 years | 11:15-19 | John 2:20 | BSB text. Herod's rebuilding and Josephus's figures (deep note) not used |
| Isaiah 56:7; Jeremiah 7:4, 11; Malachi 3:1 | 11:15-19; 11:27-33 | BSB | BSB text |
| Readings of the temple action (cleansing, sign of judgment, the nations); one event or two (John 2:13-22) | 11:15-19 | Deep note | Stated as views |
| Standing to pray: Hannah; the Pharisee and tax collector | 11:20-26 | 1 Samuel 1:26; Luke 18:11-13 | BSB text |
| Verse 26 absent from Sinaiticus and Vaticanus; matches Matthew 6:15 and probably came from there; the KJV prints it | 11:20-26 | Metzger and Omanson as summarised; NA28 | Search: uasvbible.org; biblehub.com; confessionalbibliology.com (the opposing case) |
| Your will be done; Gethsemane; Paul's thorn | 11:20-26 | Matthew 6:10; Mark 14:36; 2 Corinthians 12:7-9 | BSB text |
| Chief priests, elders and scribes assembled as the council | 11:27-33 | Mark 14:53 | BSB text |

Narrowed: "Many Jews criticized the high priests" was cut (Qumran and the
Talmud's lament not checked this run). "Answering a question with a question
was a recognised Jewish form" was replaced by Jesus' own question in 10:3.
Russell's lecture is not named. Jesus' place on the Mount of Olives at 11:23 is
given as the road's line of sight and "many readers think".

Left out: Josephus's Egyptian prophet, his Passover census, the Royal Stoa,
Caiaphas and Eppstein, b. Pesachim 57a, Jesus son of Ananias, unridden animals
for holy use, Solomon's mule (verse checked, not used), 2 Maccabees 10:7,
Psalms of Solomon 17, the Word of Faith movement and the 2006 prayer study,
b. Berakhot 64a, and P45.

## The plain notes on Mark 12 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Tenant farming for a share of the crop | 12:1-12 | Mark 12:1-2 itself | BSB text. Absentee owners, common quarrels and the Zenon papyri (deep note) not used |
| Isaiah 5:1-2, 7; Psalm 118:22-23; sung at the entry (11:9) | 12:1-12 | BSB | BSB text |
| The parable aimed at the leaders; the crowd on Jesus' side; the old reading against the Jewish people rejected by many | 12:1-12 | Mark 12:12; deep note | Stated as views |
| Pharisees popular with the people | 12:13-17 | Josephus, Antiquities 18.15-17 | Search (with the Sadducees entry): lexundria.com 18.16-17 (the multitude) |
| Herodians supporters of the Herods | 12:13-17 | Earlier ledger (Mark 3) | Earlier ledger |
| Judea under direct Roman rule in AD 6; Quirinius's census; Judas the Galilean's revolt on the ground that God alone is master; Acts 5:37 | 12:13-17 | Josephus, Jewish War 2.118; Antiquities 18; Acts 5:37 | Search: jewishvirtuallibrary.org "Judah the Galilean"; jewishencyclopedia.com; encyclopedia.com. The date is standard; one recent article (Rhoads) disputes Josephus's dating, not stated |
| Tiberius denarius: laureate head, TI CAESAR DIVI AVG F AVGVSTVS, reverse PONTIF MAXIM; which coin was handed to Jesus is uncertain | 12:13-17 | Numismatic catalogues (RIC I 26-30) | Search: academic.sun.ac.za; oceanlight.com "The Tribute Penny"; timelineauctions.com. The uncertainty is stated |
| Genesis 1:27 image; Romans 13:7 | 12:13-17 | BSB | BSB text |
| Three readings of "Give to Caesar" | 12:13-17 | Standard positions | Stated as views, no names |
| Sadducees: souls perish with bodies, only the written law | 12:18-27 | Josephus, Antiquities 18.16 | Search: lexundria.com (Whiston); cojs.org; text.egwwritings.org |
| Sadducees deny resurrection, angels, spirits; the high priest's circle Sadducees | 12:18-27 | Acts 23:8; 5:17 | BSB text |
| Levirate law; Ruth; Daniel 12:2; Exodus 3:6; Luke 20:36 | 12:18-27 | BSB | BSB text |
| 2 Maccabees 7: seven brothers die under Antiochus trusting God will raise them | 12:18-27 | 2 Maccabees 7:9 | Search: bible.com NRSVue; ccel.org Douay; jwa.org. Its date not given; the "mocking echo" stated as "may be" |
| Readings of marriage at the resurrection | 12:18-27 | Standard positions | Stated as views |
| Mishnah Berakhot 1:1 on the evening and morning Shema; Deuteronomy 6:7 | 12:28-34 | Mishnah; BSB | Search: cojs.org Berakhot 1:1-4; posenlibrary.com; BSB text |
| Hillel: what is hateful to you, do not do to your neighbour (b. Shabbat 31a); Akiva called "love your neighbour" a great principle | 12:28-34 | Talmud; rabbinic tradition | Search: sefaria.org sheet 195830 and related sheets. Sifra not named; Akiva given as "a later teacher" |
| Deuteronomy 6:4-5; Leviticus 19:18; 1 Samuel 15:22; Hosea 6:6 | 12:28-34 | BSB | BSB text |
| 2 Samuel 7:12-13; Psalm 110:1; Acts 2:34-36; Romans 1:3-4 | 12:35-37 | BSB | BSB text |
| Views of Psalm 110's authorship and of Jesus' argument | 12:35-37 | Deep note | Stated as views. Justin, b. Nedarim 32b and Rashi not used; "most quoted psalm" cut |
| Ways scribes may have defrauded widows are suggestions only | 12:38-40 | Deep note | Stated as suggestions |
| Exodus 22:22; Isaiah 10:2 | 12:38-40 | BSB | BSB text |
| Thirteen trumpet-shaped chests, narrow at the top | 12:41-44 | Mishnah Shekalim 6:5 | Search: outorah.org Shekalim 6:5-6; jewishvirtuallibrary.org Shekalim 6; mishnah.org. Marked as later and possibly not fitting Jesus' day |
| Two lepta make a quadrans; a quadrans 1/64 of a denarius; lepta the smallest coins in Palestine | 12:41-44 | NET notes; lexicons | Search: biblia.com NET note; biblehub.com; sites.tyndale.com |
| Addison G. Wright, "The Widow's Mites: Praise or Lament?", CBQ 44 (1982); Malbon's reply | 12:41-44 | CBQ 1982; Kubiś 2013 survey | Search: tyndalebulletin.org; bazhum.muzhp.pl (Kubiś); en.wikipedia.org "Lesson of the widow's mite" |

Narrowed in Mark 10 on this run as well: Rabbi Akiva is "a later teacher", not
"a generation after Jesus" (his dates were not checked).

Left out: Josephus on the Sadducees' end, Origen and Hippolytus on their
canon, Tobit 3:8, m. Tamid 5:1, tefillin at Qumran, 613 commandments, the
Targum of Isaiah 5, Leviticus 19:23-25, the Court of the Women and John 8:20,
the roles of scribes in legal paperwork, and the Psalm 110 Jewish readings.

## The plain notes on Mark 13 (continuation run, 2026-11-19)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Herod began rebuilding around 20 or 19 BC; work went on for decades (to about AD 63/64); Josephus: like a snow-covered mountain, parts covered with gold | 13:1-4 | Josephus, Jewish War 5.222-223; Antiquities 15.380; Schürer's date | Search: lexundria.com j_bj 5.222-226 (Whiston); rsc.byu.edu "The Temple of Herod"; library.biblicalarchaeology.org footnote; jewishencyclopedia.com Temple of Herod |
| Revolt from 66; temple destroyed 70 | 13:1-4 | Earlier ledger (When, where, for whom) | Earlier ledger |
| Arch of Titus, around AD 81, shows soldiers carrying the lampstand | 13:1-4 | The arch itself | Search: smarthistory.org; holylandphotos.org; bible-history.com |
| Micah 3:12; Jeremiah 7:4 | 13:1-4 | BSB | BSB text |
| Before or after 70: both views held | 13:1-4 | Earlier ledger (Marcus 1992; repository introduction) | Stated as views |
| Theudas (about AD 45, the Jordan, Antiquities 20.97-98); the Egyptian prophet (Mount of Olives, walls to fall, Antiquities 20.169-172); Acts 5:36 and 21:38 | 13:5-13 | Josephus | Search: en.wikipedia.org Theudas and Egyptian (prophet); livius.org "The Egyptian Prophet"; lexundria.com j_aj 20.97. Said only that Roman soldiers scattered both movements (Theudas was beheaded; the Egyptian escaped) |
| Acts 5:40; Acts 24 to 26 | 13:5-13 | BSB | BSB text |
| Isaiah 26:17; Micah 7:6 | 13:5-13 | BSB | BSB text |
| Daniel 9:27, 11:31, 12:11; 12:1 | 13:14-23 | BSB | BSB text |
| Antiochus IV's pagan altar in the temple, around 167 BC, called the abomination of desolation in 1 Maccabees 1:54 | 13:14-23 | 1 Maccabees 1:54 | Search: biblicaltraining.org; biblestudytools.com; nocr.net ISBE. Sources give 168 or 167; the site says "around 167" |
| Caligula ordered his statue set up in the temple around AD 40; Jews said they would rather die; delayed (Petronius, Agrippa); Caligula murdered January 41 | 13:14-23 | Josephus, Antiquities 18; Philo, Embassy to Gaius | Search: jewishencyclopedia.com Caligula; Young, JETS 62 (2019); encyclopedia.com Petronius. No section number given on the site |
| The Gospels heard read aloud | 13:14-23 | Deep note (Justin, First Apology 67) | Said as "most early Christians heard the Gospels read aloud"; Justin not named |
| Flat roofs with outside stairs; cloak left in the field; winter rain | 13:14-23 | Deep note; Acts 10:9 | Common knowledge of the land, not a source claim; kept general |
| Eusebius, Church History 3.5.3: Jerusalem Christians warned, left for Pella; historicity debated | 13:14-23 | Eusebius | Search: en.wikipedia.org Flight to Pella; Koester, "The Origin and Significance of the Flight to Pella Tradition" (godawa.com PDF) |
| Luke 21:20; 2 Thessalonians 2:3-4 | 13:14-23 | BSB | BSB text |
| Three readings of the abomination (AD 70; future; both) | 13:14-23 | Deep note; standard positions | Stated as views, no names. Irenaeus (Against Heresies 5.25) not named: not checked |
| Isaiah 13:10; Daniel 7:13-14; Deuteronomy 30:4 | 13:24-27 | BSB | BSB text |
| Readings of 13:24-27 (second coming; AD 70 in prophetic picture-language; both) | 13:24-27 | Deep note | Stated as views, no names |
| Fig tree bare in winter, late leaves; olive evergreen | 13:28-31 | Deep note; common botany | Kept general |
| Genea in Mark 8:12, 8:38, 9:19 | 13:28-31 | Greek text in the repository | Repository |
| C. S. Lewis, "The World's Last Night": "the most embarrassing verse in the Bible" | 13:28-31 | Lewis (essay 1952, collected 1960) | Search: cslewisinstitute.org; singjupost.com full text; kenschenck.blogspot.com. No date given on the site |
| Isaiah 40:8 | 13:28-31 | BSB | BSB text |
| Arians used 13:32; Athanasius: Christ spoke as man ("according to the flesh") | 13:32-37 | Athanasius, Discourses against the Arians 3.42-49 | Search: newmanreader.org discourse 3; bkv.unifr.ch NPNF Four Discourses |
| Chalcedon 451: truly God and truly man in one person | 13:32-37 | Standard | Standard date; already in the deep note |
| Luke 2:52; Isaiah 62:6 | 13:32-37 | BSB | BSB text |
| Four night watches echoed in the passion (evening, night, cockcrow, morning) | 13:32-37 | Mark 14:17, 14:32-41, 14:72, 15:1 | BSB text. Lightfoot (1950) not named |

Left out: Josephus on the Egyptian's numbers; Jesus son of Ananias; the
portents in Josephus and Tacitus; the ninth of Av; Yohanan ben Zakkai;
Colani, Schweitzer, Russell, Beasley-Murray, Wright, France, Stein, Scofield,
Lindsey, Miller and Camping by name; Gregory of Nazianzus, the kenotic
theologians; the Arch's date of 81 is given as "around".

## The plain notes on Mark 14 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| A Passover riot around AD 48 to 50 under Cumanus: soldiers above the temple courts, a soldier's insult, thousands crushed | 14:1-11 | Josephus, Jewish War 2.224-227 | Search: lexundria.com j_bj 2.223-227 (Whiston: about ten thousand); workingwithcrowds.com incident report. The site says "thousands" |
| Nard from a Himalayan plant, costly, imported | 14:1-11 | Encyclopedias; Pliny (not cited on the site) | Search: en.wikipedia.org Spikenard; studylight.org dictionaries. Pliny's prices conflict across sources and are not used |
| A denarius a day's wage, so 300 denarii near a year's wages | 14:1-11 | Matthew 20:2; commentaries | BSB text; search as above |
| Anointing a head an honor and how kings were anointed; anointing for burial | 14:1-11 | Psalm 23:5; 1 Samuel 10:1; Mark 14:8; 16:1 | BSB text |
| Deuteronomy 15:11; Matthew's thirty pieces; John 12:6 | 14:1-11 | BSB | BSB text |
| Lambs killed in the afternoon, eaten at night in the city; rooms for pilgrims; water-carrying usually women's work | 14:12-21 | Deep note; Mark 14:12 | Kept general; the Josephus lamb count was not used |
| Psalm 41:9; Exodus 12 | 14:12-21 | BSB | BSB text |
| The date of the Last Supper: Mark against John 18:28 and 19:14; harmonising readings; Annie Jaubert's calendar theory (and its critics); a farewell meal; theological arrangement | 14:12-21 | Jaubert, The Date of the Last Supper (French 1957, English 1965); Nodet, Biblica 91 (2010); BAS endnote "Was Jesus' Last Supper a Seder?" | Search: bsw.org Biblica 91; library.biblicalarchaeology.org endnote 5; mu.edu PDF. No date given for Jaubert; b. Sanhedrin 43a not used |
| Mishnah Pesachim 10 (written down around AD 200): even the poorest reclines; four cups; Hallel; how much was fixed in Jesus' day debated | 14:22-26 | Mishnah | Search: sefaria.org Mishnah Pesachim 10 and sheets; jewishvirtuallibrary.org Four Cups. The Hallel as Psalms 113 to 118 is given as "most likely" |
| Exodus 24:8; Jeremiah 31:31; Isaiah 53:12; Psalm 118:1; 1 Corinthians 11:24 | 14:22-26 | BSB | BSB text |
| Views of "This is My body" (Catholic and Orthodox; Lutheran; Reformed; memorial) | 14:22-26 | Standard confessional positions | Stated as views |
| Zechariah 13:7 | 14:27-31 | BSB | BSB text |
| Gethsemane usually explained as "oil press" (Aramaic gat shemanim); exact site unknown | 14:32-42 | Lexicons; Corbo's 1956 excavation (not named) | Search: biblehub.com atlas; abarim-publications.com; en.wikipedia.org Gethsemane |
| Abba Aramaic for father, used by children and grown children | 14:32-42 | Deep note; standard lexicons | The claim that Jeremias's "Daddy" is right was not made |
| Isaiah 51:17 the cup of fury; Psalm 42:5; Hebrews 5:7 | 14:32-42 | BSB | BSB text |
| Jesus' true human will and soul (the church's answer) | 14:32-42 | Standard (Third Council of Constantinople, 681, not named) | Stated as the church's answer. Celsus and Origen not named: not checked |
| Care line: tell someone; crisis line or emergency service where you live | 14:32-42 | CLAUDE.md care standard | No number given |
| Temple police and servants rather than Roman troops (suggested) | 14:43-52 | Deep note; Mark 14:43 | Stated as "suggest" |
| Luke 22:51; Amos 2:16 | 14:43-52 | BSB | BSB text |
| Views on the young man (Mark himself; a real person known to readers; a picture of flight; sindon in 15:46 and neaniskos in 16:5) | 14:43-52 | Haren, Biblica 79 (1998); Kuruvilla, JETS 54 (2011); Gundry | Search: bsw.org Biblica 79; ets.galaxie.com Kuruvilla PDF; biblehub.com. No scholar named on the site |
| Caiaphas named in other Gospels; 1990 tomb, ossuary "Joseph son of Caiaphas"; identification questioned by some | 14:53-65 | Matthew 26:57; John 18:13; the ossuary (Israel Museum) | Search: en.wikipedia.org Caiaphas ossuary; cojs.org; library.biblicalarchaeology.org "The Tomb of Caiaphas" |
| Mishnah Sanhedrin 4:1: capital trials by day, verdict of guilt the next day, so not on the eve of a Sabbath or festival; written down around 200; may be a later ideal | 14:53-65 | Mishnah (Danby 1919 translation) | Search: sacred-texts.com Danby tractate Sanhedrin; sefaria.org explanation 4:1; christianhistoryinstitute.org "Mistrial of the Millennium". Both views stated; no side taken |
| Psalm 110:1; Daniel 7:13; Isaiah 53:7 | 14:53-65 | BSB | BSB text |
| Matthew 26:73 Peter's speech gives him away | 14:66-72 | BSB | BSB text |
| The curse in 14:71 has no object in the Greek | 14:66-72 | Greek text in the repository | Repository |
| Some manuscripts lack the second crowing; most editors keep two | 14:66-72 | Repository chapter note (`text`) | Repository |

Left out: the Josephus lamb count; Pliny's prices for nard; b. Sanhedrin 43a;
Jeremias, Humphreys and Brown by name; Celsus, Origen, Maximus and Cullmann;
Klausner, Winter, Cohn and Danby by name; m. Sanhedrin 5:2 and 7:5; m. Bava
Kamma 7:7 on roosters; the claim that a servant girl could not give evidence.

## The plain notes on Mark 15 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Pilate governor about AD 26 to 36 | 15:1-5 | Earlier ledger (Timeline and map) | Earlier ledger |
| The Pilate stone: found 1961 at Caesarea by an Italian team (Frova); "prefect of Judea"; the only inscription all scholars agree names him; Israel Museum | 15:1-5 | The inscription | Search: en.wikipedia.org Pilate stone; madainproject.com; thecorebible.org. Narrowed in the editor's read from "the only ancient inscription known to name him", since a ring from Herodium inscribed "Pilatus" (published 2018) may also name him |
| Tacitus, writing around 116: Christ executed under Tiberius by Pontius Pilate | 15:1-5 | Annals 15.44 | Search: en.wikipedia.org Tacitus on Jesus; earlychristianwritings.com. Paraphrased; the "procurator" title debate not raised |
| Josephus: standards with the emperor's image brought in by night, withdrawn after protest; Philo charges greed, violence, theft; both accounts hostile | 15:1-5 | Josephus, Jewish War 2.169-174, Antiquities 18.55-59; Philo, Embassy to Gaius 299-305 | Search: julianspriggs.co.uk "Josephus Philo Pilate"; livius.org Pontius Pilate; mdpi.com Religions 11 (2020) on Pilate in Josephus and Philo. The aqueduct episode was not confirmed and is not used |
| John 18:31; Acts 7 | 15:1-5 | BSB | BSB text |
| Isaiah 53:7, 53:12, 50:6, 53:9; Mark 10:34 | 15 | BSB | BSB text |
| The Passover release known only from the Gospels; some think it a literary creation; others note festival pardons elsewhere | 15:6-15 | HTR article on Barabbas; Ehrman; Wright (as summarised) | Search: cambridge.org HTR "Barabbas, the Scapegoat Ritual"; ehrmanblog.org; en.wikipedia.org Barabbas. m. Pesachim 8:6 not used (wording not confirmed) |
| Barabbas means "son of the father" (Aramaic bar abba) | 15:6-15 | Standard lexicons | Common etymology; the irony is given as what "many readers have noticed" |
| The "Christ-killer" charge and its harm, rejected; Nostra Aetate 4 (1965): "cannot be charged against all the Jews, without distinction, then alive, nor against the Jews of today" | 15:6-15 | Second Vatican Council, Nostra Aetate 4 | Search: jewishvirtuallibrary.org Nostra Aetate; ebsco.com research starter; forward.com; christianunity.va. Quoted in single quotes as a translation |
| Acts 4:27 | 15:6-15 | BSB | BSB text |
| Purple, crown, kneeling as royal honours; praetorium a Latin word | 15:16-20 | Earlier ledger (Latin loanwords); deep note | The "Hail, Caesar" parallel and the palace location were cut (not checked) |
| Cicero called crucifixion the cruellest and most disgusting penalty | 15:21-32 | Cicero, Against Verres 2.5.165 (crudelissimum taeterrimumque supplicium) | Search: bible-history.com; michaelfbird.substack.com; stpaulcenter.com. Paraphrased |
| Up to five hundred captured Jews crucified a day during the siege of 70 | 15:21-32 | Josephus, Jewish War 5.449-451 | Search: vision.org "Josephus and the Siege of Jerusalem"; jamestabor.com |
| Giv'at ha-Mivtar, 1968: ossuary of Yehohanan; right heel bone with an iron nail and wood fragments; published 1970 (Tzaferis; Haas); Zias and Sekeles (1985) corrected details; a crucified man buried in a family tomb; such remains rare | 15:21-32 | Israel Exploration Journal 20 (1970); Zias and Sekeles, IEJ 35 (1985) | Search: en.wikipedia.org Jehohanan; cojs.org ossuary of Yehohanan; biblicalarchaeology.org "A Tomb in Jerusalem Reveals the History of Crucifixion". The site does not call it the only find (others have since been reported outside Israel) |
| Cyrene in North Africa with a Jewish community; Acts 6:9; Rufus in Romans 16:13, identity uncertain | 15:21-32 | BSB; deep note | BSB text. The 1941 Kidron ossuary not used |
| Hours counted from sunrise; third hour about 9, sixth noon, ninth 3 | 15:21-32 | John 11:9 (twelve hours of daylight); standard | Kept general |
| Psalm 22:1, 7, 18, 24, 27; Psalm 69:21; Amos 8:9; Luke 22:37; Malachi 4:5 | 15 | BSB | BSB text |
| Verse 28 absent from the oldest manuscripts | 15:21-32 | Repository chapter note (`text`) | Repository |
| Myrrh-wine perhaps to dull pain | 15:21-32 | Deep note | Stated as "may have been"; b. Sanhedrin 43a not used |
| Three readings of the cry (psalm of trust; real abandonment, bearing judgment, 2 Corinthians 5:21; speaking for humanity) | 15:33-39 | Deep note; standard positions | Stated as views, no names |
| Two curtains; inner or outer debated; meanings (way opened, judgment, both); Hebrews 10:20 | 15:33-39 | Ulansey and others as summarised; JETS 48 (2005); Themelios on the rending of the veil | Search: ets.galaxie.com JETS 48.2; thegospelcoalition.org Themelios; mysterium.com. Josephus's description of the curtain not used |
| The same verb for "torn" at 1:10 and 15:38 | 15:33-39 | Greek text in the repository; Mark 1 plain note | Repository |
| Centurion the first human being in the story to call Jesus Son of God | 15:33-39 | Mark's text (demons in 3:11 and 5:7; the voice in 1:11 and 9:7) | BSB text |
| Deuteronomy 21:23; Luke 23:51 | 15:40-47 | BSB | BSB text |

Left out: Varus's two thousand crucified; Josephus, Jewish War 4.317; Philo's
Carabas; the Antonia and the Via Dolorosa; Augustus as divi filius; the
Church of the Holy Sepulchre; rolling and square blocking stones; Reimarus,
Brown, Calvin, Augustine and Moltmann by name; Helen Bond and the Jewish
scholars named in the deep note.

## The plain notes on Mark 16 (continuation run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Jews washed, wrapped and used spices, did not embalm as Egyptians did | 16:1-8 | Deep note; John 19:40 | Kept general |
| Josephus: under the law women's testimony not accepted | 16:1-8 | Antiquities 4.219 | Search: lexundria.com j_aj 4.219 (Whiston); community.logos.com discussion. Mishnah Shevuot 4:1 not used (only a forum mention found) |
| Celsus mocked Mary Magdalene as "a half-frantic woman", as Origen reports | 16:1-8 | Origen, Against Celsus, book 2 (numbered 55 or 59 by edition) | Search: bkv.unifr.ch Against Celsus (Crombie) with Greek γυνὴ πάροιστρος; ellopos.net. No section number given |
| All four Gospels make women the first at the tomb; many historians weigh this | 16:1-8 | Matthew 28; Luke 24; John 20; deep note | BSB text; stated as "many historians think" |
| White clothes mark the heavenly world (9:3) | 16:1-8 | BSB | BSB text |
| Acts 20:7; Justin: Christians assemble on Sunday because of creation and because Jesus rose on that day | 16:1-8 | Justin, First Apology 67 | Search: logoslibrary.org apology1/67; bkv.unifr.ch First Apology; christianhistoryinstitute.org. Given as "partly" and "in the second century" |
| Mark 8:31, 9:31, 10:34, 14:28; Isaiah 25:8; Daniel 12:2; Mark 4:41; Luke 24:9-11; John 20:18 | 16:1-8 | BSB | BSB text |
| Sinaiticus and Vaticanus end at 16:8 (300s); Eusebius on the accurate copies; Irenaeus quotes 16:19 around 180; one Old Latin copy (Bobiensis) with a shorter ending instead, several Greek manuscripts with both (corrected in the editor's read from "a few manuscripts ... instead", to match the book page); most scholars think 9-20 added early; a minority defends them; printed in Bible notes for over a century; nothing in 9-20 needed for any belief | 16:1-14 | Earlier ledger (The ending) and the book page's "The ending of Mark" | Earlier ledger; wording kept consistent with the book page |
| Vaticanus leaves the next column blank after 16:8, an unusual gap; its meaning debated | 16:1-8 | Codex Vaticanus | Search: biblicaltraining.org NT605 lesson 34; textandcanon.org "A case for the longer ending"; journals.muni.cz (2024). Not called "the only" gap (one source counts four) |
| Mark 16:8 ends with ἐφοβοῦντο γάρ | 16:1-8 | Greek text | Search as above; Greek text in the repository |
| Views: Mark meant to stop at 8; the last page lost or unfinished; Matthew and Luke continue | 16:1-8 | Deep note; sources above | Stated as views, no names |
| John 20:11-18; Luke 24:11, 13-35; 1 Corinthians 15:4-5; Paul writing in the 50s | 16:9-14 | BSB; standard dating of 1 Corinthians | BSB text |
| Acts 16:18; 2:4; 28:3-6; Acts 1:9; Psalm 110:1; Mark 12:36, 14:62 | 16:15-20 | BSB | BSB text |
| Snake handling in some Appalachian churches since about 1910; deaths, including leaders (George Hensley, 1955, not named); state laws from 1940 | 16:15-20 | Encyclopedias | Search: en.wikipedia.org Snake handling in Christianity; georgiaencyclopedia.org Snake Handlers; christianhistoryinstitute.org "They Shall Take Up Serpents"; encyclopedia.com |
| Matthew 4:7; Deuteronomy 6:16 | 16:15-20 | BSB | BSB text |
| Views of 16:16 and of receiving 9-20 | 16:15-20 | Deep note | Stated as views |

Left out: m. Shabbat 23:5; Ignatius, the Didache, Pliny's letter; the
Nazareth Inscription; Kloner on rolling stones; 2 Maccabees 3:26 and
Josephus on angels as young men; the Amidah and m. Sanhedrin 10:1; Jerome's
letter to Hedibia; the Eusebian canons and Family 1; Tatian; the Freer Logion;
every scholar named in the deep note on the ending and on the resurrection.

## Matthew's book page (teaching introduction, 2026-11-19)

Every historical claim in `client/public/bible/notes/matthew/intro.json`, field
`teaching`. Searches run on 2026-11-19 (28 for the book page). Direct page
fetches were not used; checks rest on search results that quote or summarise
the source, read against at least two results where possible. Where wording
could not be checked, the page paraphrases. Scripture is the BSB in the
repository, checked word for word by `scripts/validate-bible-notes.mjs`.

| Claim | Source | Checked by |
|---|---|---|
| Matthew at the tax booth (9:9), "Matthew the tax collector" (10:3); Levi in Mark 2:14 and Luke 5:27 | BSB text | Repository |
| Papias (Eusebius, Church History 3.39.16): Matthew put the logia in order in the Hebrew language (dialect), each translated as he could; logia, "Hebrew dialect" disputed (Hebrew, Aramaic, or Hebrew style) | Eusebius 3.39.16; Kürzinger's style reading is in the repository's `author` | Search: en.wikipedia.org Logia; encyclopedia.com Papias; virtualreligion.net/primer/papias.html. Paraphrased |
| Irenaeus, Against Heresies 3.1.1: Matthew issued a written Gospel among the Hebrews in their own language while Peter and Paul preached at Rome | Irenaeus 3.1.1 | Search: newadvent.org/fathers/0103301.htm; bkv.unifr.ch; catholic.com. Paraphrased |
| No Hebrew or Aramaic early Matthew survives; our Greek does not read as a translation; it follows Mark's Greek | Repository `author` and `text`; search results on Papias | Search as above |
| Ignatius, To the Smyrnaeans 1.1: baptized by John that all righteousness might be fulfilled (Matthew 3:15) | Ignatius | Search: tertullian.org ANF; earlychristianwritings.com (Srawley note "Cf. Matt. iii. 15"). Paraphrased |
| Didache 8: the Lord's Prayer almost identical to Matthew's | Didache 8.2 | Search: bc.edu Didache 8-10; several translations |
| Mark dated late 60s to about 70; Matthew after 70 (about 80 to 95, majority) or before 70 (minority); 22:7, 28:15, 5:23-24, 17:24-27, 23:16-22, 24:2 as evidence | Repository `date` (Davies and Allison; Robinson 1976) | Repository; ledger for Mark's date; BSB text |
| Antioch the most common proposal; Galilee, Sepphoris, Caesarea, Transjordan also proposed | Streeter (1924) and others | Search: bibleodyssey.org "Antioch and the Gospel of Matthew"; encyclopedia.com; blbi.org course notes |
| Disciples first called Christians at Antioch | Acts 11:26 | BSB |
| Mark explains handwashing (7:3-4); Matthew does not (15:2) | BSB text | Repository |
| "When Jesus had finished" at 7:28, 11:1, 13:53, 19:1, 26:1; "From that time on Jesus began" at 4:17 and 16:21 | BSB text | Repository |
| Bacon proposed five books answering Moses (The Expositor 1918; Studies in Matthew 1930); many doubt a strict match | B. W. Bacon | Search: markluth91.substack.com "Five Books of Matthew"; theopolisinstitute.com; repository `reading` |
| Allison, The New Moses: A Matthean Typology (1993) | Dale C. Allison Jr. | Search: Fortress listing via verbum.com, exlibris |
| "Kingdom of heaven" 32 times in Matthew and in no other book (BSB); "kingdom of God" 5 times in Matthew | BSB text | Script over the repository's text |
| Reverential-circumlocution explanation; Pennington (Brill 2007) argues for a heaven-and-earth contrast | Jonathan T. Pennington, Heaven and Earth in the Gospel of Matthew (2007) | Search: bakerpublishinggroup.com; thegospelcoalition.org Themelios review |
| "Son of David" more in Matthew than any Gospel (BSB: 7 capitalised plus 1:1, 1:20; Mark 3, Luke 3, John 0) | BSB text | Script |
| "Church" only in Matthew among the Gospels (16:18, 18:17) | BSB text | Script |
| Ten formula quotations: 1:22; 2:15; 2:17; 2:23; 4:14; 8:17; 12:17; 13:35; 21:4; 27:9 | BSB text | Script ("fulfill" in Matthew) |
| 2:23 has no single source; Isaiah 11:1 netzer the most common proposal; Nazirite and "despised" readings also proposed | Commentaries | Search: wikipedia Matthew 2:23; biblegateway Encyclopedia of the Bible "Nazarene"; tyndalebulletin.org |
| Jeremiah 31:16-17 hope after 31:15; Hosea 11:1 about Israel | BSB text | Repository |
| Streeter: Matthew repeats about nine tenths of Mark | Streeter 1924 | Earlier ledger (Mark) |
| Two-Source view with Q (Quelle); Farrer 1955; Goodacre, The Case Against Q (2002); Augustine's order; Farmer 1960s | Farrer, "On Dispensing with Q" (1955); Goodacre (Trinity Press International, 2002) | Search: markgoodacre.org/Q; christiancentury.org review; earlier ledger for Augustine and Farmer |
| Material only in Matthew (list) | BSB text against Mark and Luke | Repository |
| Three kings left out between Joram and Uzziah (1 Chronicles 3:11-12) | BSB text | Repository |
| David's name in Hebrew letters (d-w-d) adds to fourteen; many scholars (Davies and Allison) think gematria a factor | Commentaries | Search: ehrmanblog.org "A numerical puzzle in Matthew's genealogy"; biblehub; lectionarystudies.com. Stated as what many scholars think |
| Luke's line through Nathan, Joseph son of Heli | Luke 3:23, 3:31 | BSB |
| Julius Africanus's levirate explanation, reported by Eusebius, Church History 1.7; Mary's line widely held since the Reformation; royal line versus natural descent | Africanus, Letter to Aristides | Search: ccel.org NPNF Eusebius 1.7; catholic.com Genealogy of Christ; encyclopedia.com |
| Isaiah 7 in the crisis of about 735 to 732 BC (Rezin and Pekah against Ahaz); the sign before the boy grows up (7:16) | Isaiah 7; 2 Kings 16 | Search: en.wikipedia.org Isaiah 7; BSB |
| almah: most scholars render "young woman"; the Septuagint used parthenos; parthenos used of Dinah after the assault (Genesis 34 LXX); many modern English Bibles say "young woman" | Hebrew and Greek texts | Search: en.wikipedia.org Isaiah 7:14; bibleinterp.arizona.edu (Hagelia); outreachjudaism.org |
| Magi a priestly class from Persia/Media, associated with astrology and dreams (Herodotus 1.101); number not given; three from the gifts | Herodotus; Matthew 2:11 | Search: encyclopedia.com Magi; catholic.com "Mysteries of the Magi" |
| Kepler drew attention to the 7 BC triple conjunction of Jupiter and Saturn; Chinese record of a new object for about seventy days in 5 BC; Molnar's lunar occultation of Jupiter in 6 BC; Jupiter and Venus in 2 BC; no consensus | Astronomical proposals | Search: biblicaltraining.org Star of Bethlehem; astronomy.com; unimelb.edu.au |
| Herod king from 37 BC | Repository `setting` | Repository |
| Herod's death: most 4 BC, some 1 BC | Chronology debate | Search: biblearchaeology.org; scriptaclassica.org; bible.ca (Steinmann and Young) |
| Archelaus removed by Augustus in AD 6 and exiled to Vienne; Judea under Roman governors | Josephus; Cassius Dio | Search: en.wikipedia.org Herod Archelaus; livius.org; jewishencyclopedia.com |
| Josephus: Herod killed his wife Mariamne and three of his sons (Alexander, Aristobulus, Antipater) | Josephus, Antiquities 15 to 17; Jewish War 1 | Search: josephus.org/Mariamme.htm; penelope.uchicago.edu Antiquities 16 |
| Herod's order to kill the leading men shut in the hippodrome at his death; Salome and Alexas freed them | Josephus, Jewish War 1.659-666; Antiquities 17 | Search: lexundria.com Antiquities 17.174-193 and War 1.647-666 |
| No record of the massacre outside Matthew; Josephus silent; estimates a dozen to a few dozen boys; the skeptical case | Reference works | Search: biblicaltraining.org "Slaughter of the Innocents"; deseret.com (Maier); thewellexaminedlife.com (skeptical) |
| Macrobius (about AD 400), Saturnalia 2.4.11: Augustus's joke about Herod and boys under two; may conflate with Herod's sons | Macrobius | Search: imperiumromanum.pl; johnsanidopoulos.com; jewishvirtuallibrary.org |
| Pharaoh's order (Exodus 1:22) | BSB | Repository |
| Readings of the Sermon: Augustine (about 394); commands and counsels (Aquinas); Luther's personal and public duty and the sermon driving to grace; Anabaptist literalism, Schleitheim (1527) on oaths and the sword; a mirror; a dispensational future-kingdom reading; Tolstoy (1894), Bonhoeffer (1937) | Histories of interpretation | Search: studylight.org Holman "Sermon on the Mount"; mereorthodoxy.com on Luther; jeltzz.substack.com; repository `reception` for dates |
| Woes a prophetic form (Isaiah 5:8-22); Weinfeld (Bible Review 13.5, 1997) on Jewish sayings about teachers who do not practise what they preach; 23:2-3 | Moshe Weinfeld, "The Jewish Roots of Matthew's Vitriol" | Search: cojs.org Weinfeld; library.biblicalarchaeology.org |
| 27:25 misused as a curse on all Jews; Oberammergau kept the line from 1750 until 2000 | History | Search: christiancentury.org "Oberammergau 2000"; ajc.org FAQs |
| 27:25 limited to the crowd present; irony with 26:28 (Cargal, NTS 1991, "double entendre") | Scholarship | Search: acuresearchbank.acu.edu.au (Hili 2024); cambridge.org NTS abstract |
| Nostra Aetate 4 (1965) | Second Vatican Council | Earlier ledger (Mark 15) |
| Chief priests and elders persuade the crowds (27:20) | BSB | Repository |
| Jerome (398) gave Matthew the man | Jerome, preface to the Commentary on Matthew | Earlier ledger (Jerome 398) and repository `reception` |
| Bach's St Matthew Passion, Leipzig, Good Friday 1727 | Repository `reception` | Repository |
| Map positions | Approximate modern sites; the Gadarenes and the Decapolis are regions, placed roughly and said so | Not a historical claim |

Left out: Origen and Jerome on a Hebrew Matthew (not checked this run);
the scholars by name on authorship (Davies and Allison, Luz, Gundry, Carson,
Blomberg: in the fuller introduction below, not repeated); Annius of Viterbo
(no result confirmed him); every count of how many verses the double tradition
holds; the claim that the 7 BC conjunction is "the strongest match" (only a
popular almanac says so); a section number for Augustine's Retractations on
16:18.

## The plain notes on Matthew 1 (2026-11-19)

`client/public/bible/notes/matthew/plain/1.json`. Four searches for this
chapter; the rest rests on the book page's rows above or the BSB text.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Priests had to prove descent | 1-6 | Ezra 2:61-63 | BSB |
| Son of David and the promise of a lasting throne; all families blessed through Abraham | 1-6 | 2 Samuel 7:12-16; Genesis 12:3 | BSB |
| Biblos geneseōs in 1:1; the phrase only twice in the Septuagint (Genesis 2:4, 5:1); a "new genesis" reading (Davies and Allison) against the plain "family record" reading | 1-6 | Commentaries | Search: billmounce.com (Carson's note); biblehub ICC Matthew 1; ejournals.bc.edu. Both readings stated |
| Women rarely named in genealogies; Tamar (Genesis 38), Rahab (Joshua 2), Ruth a Moabite (Ruth 1:4), Bathsheba and Uriah the Hittite (2 Samuel 11) | 1-6 | BSB; repository chapter note (`cultural`) | BSB. Tamar given as "perhaps" an outsider, since Genesis does not say |
| Judah and the staff; Ruth 4:17-22; 2 Samuel 7:16 | 1-6 | BSB | Repository |
| Jerusalem destroyed in 587 or 586 BC; no Davidic king after | 7-17 | 2 Kings 25; repository chapter note (`historical`) | BSB and repository |
| David = d-w-d = fourteen | 7-17 | Book page row above | Search (book page) |
| Three kings skipped (1 Chronicles 3:11-12); the last group counts thirteen unless one is counted twice | 7-17 | BSB; ehrmanblog.org (book page search) | Count of BSB 1:12-16 |
| Luke's line, Africanus, Mary's line, royal line | 7-17 | Book page rows above | As above |
| Jeconiah and Jeremiah 22:30; Haggai 2:23 signet ring; the legal-son answer | 7-17 | BSB; apologetic and dictionary summaries | Search: biblehub.com "Does Matthew 1 contradict Jeremiah 22:30"; thejesusquestion.org; equip.org. Stated as what some answer |
| Betrothal binding; a betrothed woman freed only by divorce or the husband's death (Mishnah Kiddushin 1:1, written down about AD 200); how far this applied in the first century is debated, so the note leans on Matthew's own words (husband, divorce) | 18-21 | Mishnah Kiddushin 1:1 | Search: jwa.org "Marriage in Halakhic Judaism"; chabad.org Kiddushin; thegemara.com (caution on first-century practice) |
| Deuteronomy 22:23-24 | 18-21 | BSB | Repository |
| Jesus = Yeshua, short for Joshua, "the LORD saves"; common name; Josephus names several men called Jesus | 18-21 | Name studies | Search: biblicaltraining.org "Jesus"; aleteia.org; biblehub |
| Joseph son of Jacob echoes the patriarch | 18-21 | Genesis 37 to 50; Matthew 1:16 | BSB |
| Psalm 130:8 | 18-21 | BSB | Repository |
| Matthew and Luke tell the conception independently (Luke 1:26-38) | 18-21 | BSB | Repository; skeptic's objection stated, not answered for the reader |
| Isaiah 7 and Ahaz, about 735 BC; Isaiah 7:16; 8:10; 9:6; almah and parthenos | 22-25 | Book page rows above; BSB | As above |
| Mary's perpetual virginity (Catholic, Orthodox) and the brothers read three ways | 22-25 | Earlier ledger, Mark 3:31-35 (Bauckham) | Earlier ledger |

Left out: the twelve months between betrothal and wedding (Mishnah Ketubbot
5:2; not confirmed this run); Dionysius Exiguus and the year count; the
Babylonian ration tablets naming Jeconiah (in the deep note below, not
re-checked); the count of men named Jesus in Josephus.

## The plain notes on Matthew 2 (2026-11-19)

`client/public/bible/notes/matthew/plain/2.json`. Five searches for this
chapter, with the book page's rows above.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Magi: Herodotus 1.101, priestly tribe of the Medes, dreams and stars; later sense of sorcerer; number not given | 1-8 | Herodotus; Acts 13:6-8 | Book page search (encyclopedia.com Magi; catholic.com) |
| Herod king from 37 BC; Idumean family; killed Mariamne and three sons | 1-8 | Josephus; earlier ledger (Idumea) | Book page searches |
| Belief that the heavens marked rulers' births and deaths; Numbers 24:17 | 1-8 | Repository chapter note (`cultural`: Suetonius, Tacitus); BSB | Repository and BSB. Stated generally, no ancient writer named |
| Micah 5:2 against Matthew 2:6; 2 Samuel 5:2 | 1-8 | BSB | Repository |
| Star proposals | 1-8 | Book page rows | Book page search |
| Gold, frankincense and myrrh: resins from southern Arabia and the Horn of Africa, carried by caravan; frankincense burned in worship, myrrh in perfume, medicine and burial | 9-12 | Trade histories | Search: openscholar.uga.edu (frankincense and myrrh, 2011); cris.huji.ac.il; gulfnews.com |
| Irenaeus, Against Heresies 3.9.2: gold for a king, frankincense for God, myrrh for one who would die and be buried | 9-12 | Irenaeus | Search: newadvent.org/fathers/0103309.htm; catholic.com. Paraphrased |
| Isaiah 60:6; Psalm 72:11; worship in 14:33, 28:9, 28:17 | 9-12 | BSB | Repository |
| Egypt under direct Roman rule; one of the largest Jewish communities, chiefly Alexandria | 13-15 | Britannica (Judaism); Jewish Virtual Library, Egypt | Search: britannica.com; jewishvirtuallibrary.org |
| Hosea 11:1-2 | 13-15 | BSB | Repository |
| Herod's order at Jericho, released by his sister (Jewish War 1.659-666) | 16-18 | Josephus | Book page search (lexundria.com) |
| No outside record; estimate of a dozen to a few dozen boys; the skeptical case; Exodus 1:22 | 16-18 | Book page rows | Book page search |
| Rachel buried on the way to Ephrath, Bethlehem (Genesis 35:19); captives gathered at Ramah (Jeremiah 40:1); Jeremiah 31:15-17, 31:31 | 16-18 | BSB | Repository |
| Archelaus: about three thousand killed at Passover (Antiquities 17.213-218; War 2); removed in AD 6, exiled to Gaul | 19-23 | Josephus | Search: lexundria.com Antiquities 17.213-218; book page search on Archelaus |
| Antipas gets Galilee; 14:1-12 | 19-23 | Repository `setting`; BSB | Repository |
| Nazareth not in the Old Testament; John 1:46 | 19-23 | BSB | Repository (search of the Old Testament text) |
| Exodus 4:19 against Matthew 2:20 | 19-23 | BSB | Repository |
| "Nazarene": netzer (Isaiah 11:1), Nazirite (Numbers 6), "despised" readings | 19-23 | Book page row | Book page search |

Left out: the Herodium tomb (found 2007, but its identification was
challenged in 2013, and it adds nothing the passage needs); Tertullian on
"almost kings"; Tiridates and the magi of AD 66; the "at its rising" reading
of the star; the eclipse in Josephus; Pope Gregory on the gifts. Care: the
killing of the children is told in one sentence as Matthew tells it; the
passage names Herod as the cause, gives the mothers' grief its place, and
keeps a path to help visible (someone trusted, a grief counsellor, a crisis
line or emergency service).

## The plain notes on Matthew 3 (2026-11-19)

`client/public/bible/notes/matthew/plain/3.json`. Three searches for this
chapter, with the earlier ledger for Mark 1, 6 and 12.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Elijah's clothing; Malachi 4:5; locusts allowed; wilderness and Jordan in Israel's story | 1-6 | 2 Kings 1:8; Malachi 4:5; Leviticus 11:22 | Earlier ledger (Mark 1:1-8); BSB |
| John's first words the same as Jesus' (3:2; 4:17) | 1-6 | BSB | Repository |
| Isaiah 40:3 opens the promise of comfort after exile | 1-6 | BSB (Isaiah 40:1-11) | Repository |
| Pharisees popular; Sadducees from the priestly circle, denying resurrection and angels | 7-12 | Josephus, Antiquities 18.15-17; Acts 23:8; 5:17 | Earlier ledger (Mark 12) |
| "Brood of vipers" again at 12:34 and 23:33 | 7-12 | BSB | Repository |
| Stones and children: abanim and banim in Hebrew | 7-12 | UBS translators' handbook on Matthew 3:9; Wikipedia Matthew 3:9 | Search: tips.translation.bible; en.wikipedia.org Matthew 3:9. Given as "may also be", since John likely spoke Aramaic and the results did not confirm the pun there |
| Carrying a master's sandals a servant's task | 7-12 | Earlier ledger (Mark 1:7) | Earlier ledger |
| Winnowing: threshed grain tossed with a wooden fork, the wind takes the chaff, which is burned | 7-12 | Bible dictionaries | Search: biblicaltraining.org "Winnow"; hypr.bible threshing floor; tips.translation.bible |
| Malachi 4:1; 3:2; Joel 2:28; Ezekiel 36:26 | 7-12 | BSB | Repository |
| John's protest and Jesus' answer only in Matthew | 13-17 | BSB (Mark 1:9-11; Luke 3:21-22) | Repository |
| Isaiah 64:1; Genesis 1:2; 8:11; Psalm 2:7; Isaiah 42:1; Genesis 22:2 | 13-17 | BSB | Repository; earlier ledger (Mark 1:9-11) |
| Readings of "fulfill all righteousness": obedience, standing with sinners, fulfilment | 13-17 | Commentaries; Litfin, JETS 65.4 (2022); Schreiner | Search: etsjets.org Litfin; logos.com Schreiner; en.wikipedia.org Matthew 3:15 |

Left out: the claim that the dove symbolised Israel (not checked); the
Gospel of the Nazarenes fragment on why Jesus was baptized; Hilary of Poitiers
on 3:15; any count of how many John baptized.

## The plain notes on Matthew 4 (2026-11-19)

`client/public/bible/notes/matthew/plain/4.json`. Two searches for this
chapter, with the earlier ledger for Mark 1.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Forty: Israel's years; Moses (Exodus 34:28); Elijah (1 Kings 19:8); Israel "My firstborn son" (Exodus 4:22) | 1-4 | BSB | Repository |
| The three answers from Deuteronomy 8:3; 6:16; 6:13; Psalm 91:11-12; Massah (Exodus 17:7) | 1-11 | BSB | Repository |
| Pinnacle (pterugion) means a wing or edge; the place is not known; the south-east corner above the Kidron and the Royal Portico are the usual proposals | 5-11 | Lexicons and Bible dictionaries (Vine's; Strong's notes) | Search: biblehub.com 4419; blueletterbible.org G4419; bibletruthpublishers.com. No height given, since the figures disagree |
| Herod rebuilt the temple on a vast scale | 5-11 | Repository chapter notes (Matthew 2 `historical`) | Repository |
| 28:18; John 12:31 | 5-11 | BSB | Repository |
| Capernaum on the north-west shore near the Jordan's inflow; "His own town" (9:1) | 12-17 | Earlier ledger (Mark 1 and 2); BSB | Earlier ledger |
| Tiglath-pileser III took Galilee and Naphtali and carried the people captive, about 733 to 732 BC | 12-17 | 2 Kings 15:29; Dubovský, Biblica 87 (2006), on the campaigns of 734 to 732 BC | Search: bsw.org Biblica 87; cojs.org; ucg.org commentary |
| Galilee bordered by non-Jewish lands, with many non-Jews in and around it | 12-17 | Isaiah 9:1; repository | Stated generally |
| "From that time on Jesus began" only at 4:17 and 16:21 | 12-17 | BSB | Script |
| Isaiah 9:1-2, 9:6 | 12-17 | BSB | Repository |
| The Galilee boat (1986), about eight metres, many repairs; fishing a major trade; Zebedee's hired men (Mark 1:20) | 18-22 | Earlier ledger (Mark 1:16-20); BSB | Earlier ledger |
| Students usually chose their teacher; Jesus chooses his | 18-22 | Repository chapter note (Matthew 4 `cultural`) | Repository. Stated as "usually" |
| Jeremiah 16:16 fishermen | 18-22 | BSB | Repository |
| Synagogue: Sabbath reading, teaching and prayer; visitors invited to teach | 23-25 | Earlier ledger (Mark 1:21-28 and 6:1-6); Luke 4:16-21 | Earlier ledger and BSB |
| Syria the Roman province; the Decapolis a league of Greek towns mostly east of the Jordan | 23-25 | Earlier ledger (Mark map) | Earlier ledger |
| 4:23 and 9:35 frame chapters 5 to 9; ten miracles in chapters 8 and 9 | 23-25 | BSB; repository `structure` | Repository |

Left out: any height for the temple's pinnacle; the claim that James the
Just was thrown from it (Hegesippus, in the deep note, not re-checked); the
Via Maris as a Roman road name; the number of fishing boats on the lake
(Josephus's figure in Jewish War 2, not checked). Care: a word on fasting
safely (ask a doctor; if not eating has become a struggle, talk to someone
trusted and a health professional); healing and medicine set side by side.

## The plain notes on Matthew 5 (2026-11-19)

`client/public/bible/notes/matthew/plain/5.json`. Eight searches for this
chapter, with the earlier ledger for Mark 1, 2, 9, 10 and 12 and Matthew's
book page.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Teachers sat to teach; the Moses echo is the scholars' reading, which Matthew never states | 1-12 | Luke 4:20; Allison, The New Moses (1993) | Earlier ledger (Mark 9; Matthew's book page) |
| Psalm 1:1; Isaiah 61:1-2; Psalm 37:11; Psalm 24:3-4; first and eighth beatitudes share a promise | 1-12 | BSB | Repository |
| Salt with every grain offering; no account of how salt loses its taste | 13-16 | Leviticus 2:13 | Earlier ledger (Mark 9, narrowed there too) |
| The basket (modios) a grain measure | 13-16 | Standard lexicons | Lexicon fact |
| Isaiah 49:6; Isaiah 2:2-3; 6:1 beside 5:16 | 13-16 | BSB | Repository |
| Scribes trained in the Law; Pharisees devout and popular | 17-20 | Josephus, Antiquities 18.15-17 | Earlier ledger (Matthew 3, Mark 12) |
| Jeremiah 31:33; Ezekiel 36:26-27; Romans 13:10; Mark 7:19; Acts 15:19-20 | 17-20 | BSB | Repository |
| Moral, ceremonial and civil division of the Law; fulfilled in Christ | 17-20 | Standard theological positions | Stated as views |
| Raca: Aramaic, roughly "empty-head", "worthless"; only here in the Bible | 21-26 | Strong's 4469; Vine's | Search: biblehub.com 4469; blueletterbible.org G4469; bible.jmoorewv.com Vine's. The "spit" etymology not used |
| Gehenna, the Valley of Hinnom; no ancient evidence for the rubbish dump | 21-26 | Jeremiah 7:31; Bailey (1986) | Earlier ledger (Mark 9) |
| Day of Atonement does not atone for wrongs against a neighbour until he is appeased | 21-26 | Mishnah Yoma 8:9 (written down around 200, marked as later) | Search: outorah.org Yoma 8:8-9; torah.org; sefaria.org sheets |
| Exodus 20:13; Leviticus 19:17; Mark 3:5; Ephesians 4:26; Romans 12:18 | 21-26 | BSB | Repository |
| "Cut it off" a picture, never a command to harm the body; care line | 27-30 | Mark 9 plain note, word for word | Repository |
| Exodus 20:14, 17 | 27-30 | BSB | Repository |
| Deuteronomy 24:1; Shammai and Hillel; only the husband could divorce; the certificate freed her | 31-32 | Mishnah Gittin 9:10 and 9:3 (later) | Earlier ledger (Mark 10) |
| Christian readings of divorce and the exception (Catholic, Orthodox, Protestant, betrothal, forbidden kin) | 31-32 | Mark 10 plain note; repository deep note (Matthew 5 `hard`) | Repository. No side taken; scholars not named |
| Safety line | 31-32 | Mark 10 plain note, word for word | Repository |
| Swearing by the temple and its gold (23:16); Leviticus 19:12; Numbers 30:2; Deuteronomy 23:22; Isaiah 66:1; 2 Corinthians 1:23; Hebrews 6:17; James 5:12 | 33-37 | BSB | Repository |
| Essenes avoided swearing, thought it worse than perjury, since one not believed without God is already condemned | 33-37 | Josephus, Jewish War 2.135 | Search: cojs.org (Schiffman); biblicalarchaeology.org (Mason); virtualqumran.huji.ac.il (Whiston). Paraphrased |
| Anabaptists refused oaths | 33-37 | Schleitheim Confession (1527) | Earlier ledger (Matthew's book page) |
| Eye for eye a rule for judges (Deuteronomy 19:18); Exodus 21:24; Leviticus 24:20; Deuteronomy 19:21; Proverbs 25:21 | 38-42 | BSB | Repository |
| Heavier fine for a back-handed slap than an ordinary slap (400 against 200 zuz) | 38-42 | Mishnah Bava Kamma 8:6 (later) | Search: outorah.org Bava Kamma 8:5-6; jewishencyclopedia.com "Assault and Battery"; jewishvirtuallibrary.org. No sums given, since translations differ; the back-hand reading of the right cheek is "many readers note" |
| Cloak returned by sunset | 38-42 | Exodus 22:26-27 | Earlier ledger (Mark 10) |
| Angareuō a Persian loanword, first of royal couriers pressing men and animals into service; used of Simon (27:32) | 38-42 | Thayer's; LSJ | Search: lsj.gr; blueletterbible.org G29; biblicaltraining.org "Compel". Roman soldiers not named, since the results did not confirm it |
| Tolstoy, What I Believe (1884), took "resist not evil" as the key to the sermon | 38-42 | Tolstoy | Search: nonresistance.org What I Believe ch. 1, 4; marxists.org 1884 |
| Luther's two kinds of duty; Anabaptist and Mennonite non-violence | 38-42 | Histories of interpretation | Earlier ledger (Matthew's book page) |
| Just war from Augustine to Aquinas (Summa II-II, question 40) | 38-42 | Aquinas, Summa | Search: ccel.org SS040; pages.uoregon.edu; acton.org |
| John 18:22-23; Acts 22:25 | 38-42 | BSB | Repository |
| "Hate your enemy" in no Old Testament verse | 43-48 | BSB | Script over the whole BSB (only Matthew 5:43) |
| Community Rule: love the sons of light, hate the sons of darkness; whether Jesus meant it is unknown | 43-48 | 1QS 1:9-10 | Search: ccat.sas.upenn.edu 1QS; israelbiblecenter.com "Love and Hate at Qumran"; encyclopedia.com "Sons of Light" |
| Leviticus 19:18; Exodus 23:4-5; Leviticus 19:2; Deuteronomy 18:13; Luke 6:36; teleios whole, complete | 43-48 | BSB; lexicons | Repository |
| Tax collectors despised as collaborators | 43-48 | Earlier ledger (Mark 2) | Earlier ledger |

Left out: 4Q525 and Puech; the War Scroll's "poor in spirit"; the Church of
the Beatitudes and Barluzzi; the claim that Dead Sea salt leached away; any
first-century custom of withholding a greeting; the right hand as the valued
one; "without a cause" in verse 22 and other manuscript notes; Roman soldiers
as the ones who compelled; the Quakers on oaths; Fitzmyer, Instone-Brewer,
Piper and the other scholars named in the deep note. Care: "cut it off" and
the crisis line; the divorce safety line; "turn the other cheek" is not a
command to stay with someone who hurts you; reconciliation does not mean
returning to danger; loving an enemy is not trusting one who is still
dangerous.

## The plain notes on Matthew 6 (2026-11-19)

`client/public/bible/notes/matthew/plain/6.json`. Eight searches for this
chapter, with the earlier ledger and Matthew's book page.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Hypokritēs the Greek for a stage actor; Matthew uses "hypocrite" far more than the other Gospels | 1-4 | Strong's 5273; lexicons | Search: blueletterbible.org G5273; merriam-webster.com; wiktionary. Count by script over the BSB (Matthew 27, Luke 6, Mark 2, John 0) |
| No ancient source describes givers blowing trumpets; read as a picture | 1-4 | Repository deep note (Matthew 6 `cultural`) | Stated as how most read it |
| 5:16; Acts 4:36-37 | 1-4 | BSB | Repository |
| Hour of prayer (Acts 3:1); standing to pray (Mark 11:25); tameion a storeroom or inner chamber | 5-8 | BSB; lexicons | Repository |
| 1 Kings 18:26; Ecclesiastes 5:2; Luke 6:12 | 5-8 | BSB | Repository |
| Isaiah 63:16; Luke 11:2-4; James 1:13; Exodus 16:4; Proverbs 30:8; 1 Chronicles 29:11; 18:33 | 9-15 | BSB | Repository |
| The Kaddish asks God to establish his kingdom in the lifetime of those who pray; its early wording and date are uncertain | 9-15 | Jewish Encyclopedia "Kaddish"; Boustan's review of Lehnardt | Search: jewishencyclopedia.com; rboustan.scholar.princeton.edu; jcrelations.net. Given as "how old ... is not known" |
| Epiousios: Origen found it in no Greek writer and thought the evangelists formed it; readings "for today", "for tomorrow", "needed to live"; Jerome's "supersubstantial" in Matthew | 9-15 | Origen, On Prayer 27 (paraphrased); Jerome, Vulgate | Search: ccel.org Origen On Prayer; blog.adw.org; catholicexchange.com |
| Peirasmos means test or trial as well as temptation; Pope Francis in 2017 called the usual wording not a good translation; the Italian wording later changed | 9-15 | News and commentary | Search: ncregister.com; logos.com; catholicreview.org. Only "some languages" said; no French or Italian text quoted |
| Doxology absent from Sinaiticus, Vaticanus, Bezae and early commentators (Tertullian, Origen, Cyprian); Didache's two-part form; most scholars think it an early addition | 9-15 | Metzger-style textual notes; Didache 8.2 | Search: oca.org (Farley); confessionalbibliology.com (the dissenting view); uasvbible.org |
| Didache about AD 100; pray the prayer three times a day | 9-15 | Didache 8.3 | Search: christianhistoryinstitute.org; cts.perseids.org Didache 8; earlier ledger (Matthew's book page) |
| Forgiveness first in the parable; forgiveness is not reconciliation or silence about a crime | 9-15 | 18:23-35; repository deep note (Matthew 6 `hard`) | Pastoral; CLAUDE.md "Care for the reader" |
| Day of Atonement the one fast in the Law (Leviticus 16:29); "I fast twice a week" (Luke 18:12); 9:15; Acts 13:2-3 | 16-18 | BSB | Repository |
| Mourners unwashed and unanointed, ashes; David washed and anointed when mourning ended | 16-18 | 2 Samuel 14:2; 13:19; 12:20 | BSB |
| Joel 2:13; Isaiah 58:6-7 | 16-18 | BSB | Repository |
| Care: who should not fast; ask a doctor; disordered eating | 16-18 | Matthew 4 plain note, same wording for the last two sentences | Pastoral |
| Treasure as grain, cloth, coins hidden or buried | 19-24 | 25:18; repository deep note | BSB; stated generally |
| Good eye generous, evil eye grudging: Proverbs 22:9 "good of eye"; Deuteronomy 15:9 | 19-24 | Hebrew idiom | Search: biola.edu "Good eye, bad eye"; biblicaltraining.org "Single eye"; bibleproject.com. Both readings given. Matthew 20:15 not used |
| Mammon Aramaic for wealth or property, not a known god; personified in 6:24 | 19-24 | Encyclopedia of the Bible; Tyndale Bible Dictionary; Strong's 3126 | Search: biblegateway.com encyclopedia "Mammon"; biblehub.com 3126; en.wikipedia.org "Mammon" |
| Proverbs 23:5; 1 Timothy 6:10, 17-18 | 19-24 | BSB | Repository |
| Sowing and reaping field work, spinning home work | 25-34 | The verse's own pairing; repository deep note | Stated plainly |
| 1 Kings 10; Psalm 147:9; 1 Peter 5:7; 8:26; 14:31; Philippians 2:20; 26:37; 10:29; 2 Corinthians 11:27; 25:35 | 25-34 | BSB | Repository |
| Help wording: "A doctor, a counselor, medicine, one trusted person who will stay. If you have reached the place where you are not sure you want to be here at all, tell someone today, and in the United States you can call or text 988 right now." | 25-34 | The site's Honest Answer "Is my anxiety a spiritual failure?" (`client/src/data/answers.ts`) | Copied word for word |

Left out: Tobit 12:8 and Avot 1:2; the theater at Sepphoris and Batey;
apechō as a business receipt (the search did not confirm it); the Amidah and
Avinu Malkenu; the Didache's fast days (its "hypocrites" are read as Jews, and
the line was not needed); the French bishops' 2017 wording; Augustine on
Punic mammon; the eye as sending out light (Allison); Rabbi Eliezer in b.
Sotah 48b; Jay Adams; Kierkegaard; Skeat's "card" reading. Care: forgiveness
is not a return to harm; fasting not for everyone; worry is not a rebuke of
anxiety disorders, with the site's help wording; no prosperity reading of
6:33.

## The plain notes on Matthew 7 (2026-11-19)

`client/public/bible/notes/matthew/plain/7.json`. Seven searches for this
chapter, with the earlier ledger (Hillel in Mark 12; the Didache's date in
Matthew's book page).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Karphos a chip or splinter, dokos a roof beam; the carpenter's son (13:55) | 1-6 | Lexicons; BSB | Lexicon fact |
| Rabbi Tarfon on accepting rebuke: splinter and beam | 1-6 | Babylonian Talmud, Arakhin 16b (marked as later) | Search: intertextual.bible Matthew 7:3 and Arakhin 16b; sefaria.org Arakhin 16b; Harvard Theological Review "The Mote and the Beam". Paraphrased |
| Dogs as scavengers (1 Kings 14:11); pigs unclean (Leviticus 11:7); pearls (13:45-46); holy food not for outsiders (Exodus 29:33); 15:26; 28:19 | 1-6 | BSB | Repository. "What is holy" as sacred food given as "may" |
| 18:15; John 7:24; Galatians 6:1 | 1-6 | BSB | Repository |
| Tobit gives the rule in negative form; written in the third or second century BC | 7-12 | Tobit 4:15; dating summaries (about 225 to 175 BC) | Search: tips.translation.bible on Tobit 4:15; bible.usccb.org Tobit 4; Wikipedia "Book of Tobit". Paraphrased ("in effect") |
| Hillel: what is hateful to you, do not do to your neighbour; the rest is commentary | 7-12 | b. Shabbat 31a (later) | Earlier ledger (Mark 12) |
| 4:3; 6:8; 6:10; Luke 11:13; 26:39; 2 Corinthians 12:8-9; Leviticus 19:18; 5:17 | 7-12 | BSB | Repository |
| No prosperity reading; unanswered prayer stated as the skeptic would | 7-12 | Mark 11 plain note | Repository |
| Two ways: Deuteronomy 30:19; Psalm 1:6; Jeremiah 21:8 | 13-14 | BSB | Repository |
| Didache opens with two ways, of life and of death | 13-14 | Didache 1.1 | Search: newworldencyclopedia.org "Didache"; biblegateway.com encyclopedia; ewtn.com translation |
| Luke 13:23-24 | 13-14 | BSB | Repository |
| Russell, Why I Am Not a Christian (lecture of 1927), counted Christ's belief in hell a serious defect in his moral character | 13-14 | Russell | Search: users.drew.edu (Bertrand Russell Society text); humanum.arts.cuhk.edu.hk; Wikipedia. Paraphrased |
| Theudas under Fadus (about AD 44 to 46) promised to part the Jordan; cavalry killed many; he was beheaded | 15-20 | Josephus, Antiquities 20.97-98 | Search: lexundria.com Antiquities 20.97-98 (Whiston); livius.org; en.wikipedia.org "Theudas". Acts 5:36 named as "a Theudas", since its order differs |
| Didache 11: a prophet who stays three days or asks for money is false | 15-20 | Didache 11 | Search: evangelizationstation.com translation; ewtn.com; bkv.unifr.ch |
| Deuteronomy 13:1-3; 18:22; Ezekiel 22:27; Genesis 3:18; 3:10; Galatians 5:22 | 15-20 | BSB | Repository |
| "Knew" as a personal bond (John 10:14); Luke 6:46; 11:28; 5:3 | 21-23 | BSB | Repository |
| Reformed, Wesleyan and Catholic accounts of assurance | 21-23 | Standard confessional positions (repository deep note, Matthew 7 `hard`) | Stated as views, no documents named |
| Rains in their seasons (Deuteronomy 11:14); Luke 6:48; Ezekiel 13:11 | 24-29 | BSB | Repository |
| Avot de-Rabbi Natan 24: stones then bricks, a house the flood cannot move; attribution to Elisha ben Abuyah uncertain; written down long after | 24-29 | Avot de-Rabbi Natan A 24 | Search: intertextual.bible Matthew 7:24 and ARN 24; encyclopedia.com "Elisha ben Avuyah"; sefaria.org sheet 247324 |
| Mishnah (about AD 200) Avot 1:1: Moses to Joshua to the elders | 24-29 | Mishnah | Search: sefaria.org English explanation of Avot 1:1; cojs.org; posenlibrary.com |
| Pointer to the six readings on Matthew's book page | 24-29 | `intro.json` teaching part "sermon" | Repository |

Left out: the Mishnah on measure for measure (Sotah 1:7-8); the Egyptian
prophet and the false prophet of AD 70; 4 Ezra; Kohler, Kant, Dihle, Wattles;
Bunyan; the Westminster Confession, Wesley's sermons and Trent by name; any
account of wadis flooding in minutes (stated only from Scripture); Hillel's
dates; m. Avot 3:17. Care: "judge not" is not a ban on telling right from
wrong nor a license to look down; no prosperity reading of 7:7; the narrow
gate is an invitation, not a scare; the afraid reader of 7:21-23 is met with
11:28.

## The plain notes on Matthew 8 (2026-11-19)

`client/public/bible/notes/matthew/plain/8.json`. Eight searches for this
chapter, with the earlier ledger (Mark 1, 4 and 5).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Biblical "leprosy" not only Hansen's disease; mould on cloth and walls; live outside the camp; torn clothes and "Unclean"; touch made unclean; the priest examines and declares clean | 1-4 | Leviticus 13:45-46; 13:47-59; 14:2-4; 5:3 | Earlier ledger (Mark 1); BSB text |
| Curing leprosy God's work (Naaman's king); Miriam "like a stillborn infant"; "the lepers are cleansed" | 1-4 | 2 Kings 5:7; Numbers 12:12; Matthew 11:5 | BSB text |
| Unhealed believers not blamed: Paul's thorn, Trophimus, Timothy's ailments; Luke "the beloved physician" | 1-4 | 2 Corinthians 12:7-9; 2 Timothy 4:20; 1 Timothy 5:23; Colossians 4:14 | BSB text. Care line: sickness is not from too little faith (CLAUDE.md, care for the reader) |
| The centurion most likely an officer in Herod Antipas's forces, organized on Roman lines; a Gentile | 5-13 | Bible Odyssey, "Roman Centurion"; Carr (Cambridge Bible) as summarised; heurist.huma-num.fr (Judaism and Rome) | Search: bibleodyssey.org; heurist.huma-num.fr; en.wikipedia.org Matthew 8:5. Stated as "many scholars think ... most likely". The "no Roman troops in Galilee until AD 44" date conflicts across sources and is not used |
| Luke's elders: "he loves our nation and has built our synagogue"; Luke's Greek doulos (7:2) | 5-13 | Luke 7:2-5 | BSB text and Greek text in the repository |
| A Jew did not normally visit a Gentile's house | 5-13 | Acts 10:28 | BSB text. The Mishnah (Oholot 18:7) in the deep note not used |
| Since 2011 English-speaking Catholics say "Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed" (the 1973 text had "to receive you") | 5-13 | Roman Missal, third edition, English translation (2011) | Search: USCCB (Moroney, Catechetical Sunday 2011); diolc.org bulletin insert; catholicnewsagency.com "Under my roof". Given in single quotes as a liturgical text |
| Pais child or servant | 5-13 | Standard lexicons | Earlier ledger (Mark 9). The Jennings and Liew debate (deep note) not used |
| Banquet for all peoples; gathered from east and west; Israel's scattered gathered; all nations | 5-13 | Isaiah 25:6, 8; Psalm 107:3; Isaiah 43:5; Matthew 28:19 | BSB text. "Some readers think" for the diaspora reading (Allison not named; not checked) |
| Not a rejection of the Jewish people; John's warning; "weeping and gnashing of teeth" six times in Matthew | 5-13 | Matthew 3:9; script over the BSB (8:12; 13:42, 50; 22:13; 24:51; 25:30) | BSB text; script. The history of misuse is stated generally, with no writer named |
| Peter married ("a believing wife") | 14-17 | 1 Corinthians 9:5 | BSB text |
| House honoured as Peter's under a church of the 400s; Egeria shown it in the late 300s; cannot be proved | 14-17 | Earlier ledger (Mark 1) | Earlier ledger. Corbo and Loffreda's graffiti (deep note) not used |
| Sabbath ended at sunset; carrying forbidden; Mark's "evening" | 14-17 | Mark 1:21, 32; Jeremiah 17:21-22 | Earlier ledger (Mark 1) |
| The Greek Old Testament of Isaiah 53:4 speaks of sins; Matthew's wording follows the Hebrew sense of sicknesses | 14-17 | Isaiah 53:4 (Hebrew and Septuagint) | Search: intertextual.bible "Isaiah 53:4 / LXX Isaiah 53:4"; tips.translation.bible (UBS handbook on Matthew 8:17: the Septuagint "spiritualized" the passage) |
| Isaiah 53:5; Revelation 21:4; Romans 8:23 | 14-17 | BSB | BSB text |
| Healing in the atonement rests chiefly on Isaiah 53:4-5 and Matthew 8:17; F. F. Bosworth, Christ the Healer (1924) | 14-17 | Bosworth (1877-1958); Keith Bailey as quoted by the Christian and Missionary Alliance | Search: bakerpublishinggroup.com (Christ the Healer); tonycooke.org "The Life of Fred Francis Bosworth"; ecommunity.cmalliance.org. A. B. Simpson (deep note) could not be confirmed by the search and is not named; Warfield not named |
| "Son of Man" first in Matthew at 8:20 (28 times in the BSB of Matthew) | 18-22 | Script over the BSB | Repository |
| Daniel 7:13-14; Exodus 20:12; 1 Kings 19:20; 15:4-6; John 19:26-27; John 11:35 | 18-22 | BSB | BSB text |
| Secondary burial: bones later gathered into an ossuary; McCane, "'Let the Dead Bury Their Own Dead': Secondary Burial and Matt 8:21-22", Harvard Theological Review 83 (1990) 31-43 | 18-22 | McCane | Search: resolve.cambridge.org (HTR abstract); zenon.dainst.org record; lifeandland.org (Franz). "About a year later" (deep note) not confirmed and not used. Bailey's "father still alive" given as a reading, unnamed |
| Lake about 700 feet below sea level among hills; sudden storms | 23-27 | Earlier ledger (Mark 4) | Earlier ledger |
| Seismos at 8:24, 24:7, 27:54, 28:2; oligopistos at 6:30, 8:26, 14:31, 16:8 | 23-27 | Greek text in the repository (G4578, G3640) | Script |
| Mark's order (calm, then "Do you still have no faith?"); Jonah 1:5-6; 12:41; Psalm 107:29 | 23-27 | Mark 4:39-40; BSB | BSB text |
| Matthew 8:28: Vaticanus and a few early witnesses "Gadarenes"; many later "Gergesenes" (Byzantine text, Textus Receptus, so the King James Version); others "Gerasenes" | 28-34 | NET Bible note on Matthew 8:28; Metzger's Textual Commentary as summarised | Search: biblia.com NET note; kmooreperspective.blogspot.com (Metzger summary); wartburgproject.org |
| Gadara at Umm Qais, about six miles southeast of the lake, a Decapolis city; territory probably reaching the shore | 28-34 | Bible dictionaries and atlases | Search: biblicaltraining.org "Gadara"; bibliaparalela.com atlas; biblegateway.com Encyclopedia of the Bible. "Many think" for the territory |
| Gerasa about thirty miles away; Origen's Gergesa | 28-34 | Earlier ledger (Mark 5) | Earlier ledger |
| Pigs unclean; graves unclean | 28-34 | Leviticus 11:7; Numbers 19:16 | Earlier ledger |
| Two men against one: the old harmonizing answer; Matthew's pairs (9:27; 20:30; Mark 10:46); two witnesses (Deuteronomy 19:15); ancient biography; skeptics | 28-34 | BSB; standard positions | Stated as views. Augustine (Harmony of the Gospels 2.24) could not be confirmed by the search, so the answer is called "an old explanation" with no name |
| Matthew lists the demon-possessed and those with seizures separately | 28-34 | Matthew 4:24 | BSB text (not quoted at length, since the verse holds an em-dash) |
| Care: mental illness is illness; path to help; the Mark 5 wording | 28-34 | Mark 5 plain note | Repository |

Left out: the Akeldama leprosy DNA find; the Temple Scroll, the Mishnah and
Josephus on lepers; Corbo and Loffreda; Josephus on Antipas's army; the "AD 44"
date; Augustine and Tertullian by name; Hengel, Bornkamm, Held, Allison,
Simpson, Warfield, Levine, Strauss; Tobit 4:3 and the Mishnah on the Shema;
the Kursi details beyond the Mark 5 note; Menippus, Philodemus and Meleager;
the Roman Missal's 1973 wording is in this ledger only.

## The plain notes on Matthew 9 (2026-11-19)

`client/public/bible/notes/matthew/plain/9.json`. Eight searches for this
chapter, with the earlier ledger (Mark 2 and 5; Matthew's book page).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Blasphemy a grave crime; the trial charge | 1-8 | Leviticus 24:16; Matthew 26:65 | BSB text |
| Sickness assumed to come from sin; John 9:2-3 | 1-8 | Earlier ledger (Mark 2); BSB | BSB text. The Talmud (Shabbat 55a) in the deep note not used |
| Binding and loosing | 1-8 | Matthew 16:19; 18:18 | BSB text. Given as "some readers think" |
| Capernaum near the border of Antipas and Philip; most likely a toll collector for Antipas; collectors' bad name | 9-13 | Earlier ledger (Mark 2) | Earlier ledger |
| "Collect no more than you are authorized" | 9-13 | Luke 3:13 | BSB text |
| Mishnah Nedarim 3:4 (written down around 200): a vow may be made to murderers, robbers and tax collectors to protect one's goods | 9-13 | Mishnah | Search: mishnah.org Nedarim 3:4; heurist.huma-num.fr (Judaism and Rome) record 1318. Paraphrased, marked as later. Tohorot 7:6 (deep note) could not be found and is not used |
| Levi in Mark 2:14 and Luke 5:27; "Matthew the tax collector" (10:3); the church linked the Gospel to him from early in the second century | 9-13 | BSB; Papias via Eusebius 3.39.16 | Earlier ledger (Matthew's book page) |
| Pharisees devoted to the Law in daily life and popular | 9-13 | Josephus, Antiquities 18.15-17 | Earlier ledger (Mark 12) |
| Antisthenes, blamed for bad company, said physicians attend the sick without catching the fever | 9-13 | Diogenes Laertius, Lives of the Eminent Philosophers, book 6 (Life of Antisthenes) | Search: penelope.uchicago.edu (Hicks, Loeb); fordham.edu (Yonge). Paraphrased; no section number or date given on the site |
| Hosea 6:4, 6:6; 1 Samuel 15:22; Micah 6:8; Matthew 12:7; only Matthew quotes Hosea 6:6 | 9-13 | BSB | BSB text; Mark, Luke and John checked by script for the words "mercy, not sacrifice" (none) |
| Hesed: loyal love, kindness | 9-13 | Standard lexicons | Search (with the next entry): sichaconversation.org "I desire hesed" |
| Avot de-Rabbi Natan 4: Yohanan ben Zakkai, seeing the ruined temple with Rabbi Joshua, cites Hosea 6:6: deeds of loving-kindness atone as the sacrifices did | 9-13 | Avot de-Rabbi Natan (later than the Gospels) | Search: sefaria.org sheets; newworldencyclopedia.org "Yochanan ben Zakai"; jewishideas.org. Paraphrased and marked as written down long after |
| Ezekiel 18:23 | 9-13 | BSB | BSB text. Sanders, Neusner, Dunn and Levine (deep note) not named |
| One commanded fast; Zechariah's four fasts; "I fast twice a week"; John in prison | 14-17 | Leviticus 16:29; Zechariah 8:19; Luke 18:12; Matthew 4:12 | BSB text; earlier ledger (Mark 2) |
| Samson's feast seven days | 14-17 | Judges 14:12 | BSB text |
| Patches and wineskins | 14-17 | Earlier ledger (Mark 2 note) | Common knowledge, kept general |
| Didache 8.1 (around AD 100): fast on Wednesday and Friday | 14-17 | Didache | Search: cts.perseids.org Didache 8.1; bc.edu Didache 8-10; posenlibrary.com. Its "hypocrites" and their days not mentioned |
| "Both are preserved" only in Matthew in modern Bibles | 14-17 | Matthew 9:17; Mark 2:22; Luke 5:38 | BSB text (later copies of Luke 5:38 add it, so the site says "in modern Bibles") |
| Leviticus 15:25-27; uncleanness not sin; scholars debate how far it cut her off; Matthew silent on impurity | 18-26 | Earlier ledger (Mark 5) | Earlier ledger; BSB |
| Tassels: Numbers 15:38-39; 14:36 | 18-26 | BSB; kraspedon (earlier ledger, Mark 6) | BSB text |
| Mishnah Ketubot 4:4: two flutes and one wailing woman | 18-26 | Earlier ledger (Mark 5) | Earlier ledger |
| Josephus: at the false report of his death (Jewish War 3.437), many in Jerusalem hired pipers to lead their laments | 18-26 | Josephus, Jewish War 3.432-437 | Search: lexundria.com j_bj 3.437 (Whiston); gutenberg.org Wars of the Jews. Paraphrased; no year given on the site |
| Daniel 12:2; 1 Kings 17:21-22; 2 Kings 4:32-37 | 18-26 | BSB | BSB text |
| Mark 5:23, 35: "near death", then messengers | 18-26 | BSB | BSB text |
| Augustine, Harmony of the Gospels 2.28: Matthew, by brevity, gives the father's mind and purpose; the substance the same | 18-26 | Augustine | Search: ccel.org NPNF vol. 6, book 2 ch. 28; lectionarycentral.com; bkv.unifr.ch. Paraphrased; no date given. Licona and Held (deep note) not named |
| 2 Samuel 7:13; "the son of David" 1:1; Son of David most in Matthew | 27-31 | BSB; earlier ledger (Matthew's book page) | BSB text; script |
| Two blind men at Jericho against Bartimaeus | 27-31 | Matthew 20:30; Mark 10:46 | BSB text |
| Isaiah 35:5-6; Matthew 11:4-5 | 27-31 | BSB | BSB text |
| Kōphos "blunted", deaf or mute or both | 32-34 | Strong's and Thayer's (G2974) | Search: biblehub.com 2974; blueletterbible.org G2974 |
| Justin Martyr, Dialogue with Trypho 69: Jesus called a magician and a deceiver of the people | 32-34 | Justin | Search: logoslibrary.org trypho/069; newadvent.org; bkv.unifr.ch. Paraphrased. The Talmud (Sanhedrin 43a) not used |
| Mute healed with no demon named; the demon-possessed listed apart; 12:24-32 | 32-34 | Matthew 15:30-31; 4:24; 12:24 | BSB text |
| 4:23 and 9:35 nearly identical; ten miracles in chapters 8 and 9 | 35-38 | BSB; count of the stories | BSB text |
| Splanchnizomai from splanchna, the inward parts | 35-38 | Standard lexicons (G4697) | Lexicon fact; Greek text in the repository |
| Numbers 27:17; Ezekiel 34:5, 15, 23 | 35-38 | BSB | BSB text |

Left out: the Mishnah on toll collectors' houses (Tohorot 7:6, not found);
the Talmud on sickness and sin, and Sanhedrin 43a; the Theodotus inscription;
Neusner, Sanders, Dunn, Levine, Haber, Licona, Held, Strauss by name; the
Didache's "hypocrites"; the textual notes on 9:14 and 9:34 (all in the deep
note, not needed); John 4:35.

## The plain notes on Matthew 10 (2026-11-19)

`client/public/bible/notes/matthew/plain/10.json`. Eight searches for this
chapter, with the earlier ledger (Mark 3, 6, 9, 13 and 15).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Twelve tribes | 1-4 | Earlier ledger (Mark 3) | Earlier ledger |
| Apostolos only at 10:2 in Matthew | 1-4 | Greek text in the repository (G652) | Script |
| The four lists; Peter first, Judas last; Thaddaeus and "Judas son of James" | 1-4 | Matthew 10:2-4; Mark 3:16-19; Luke 6:14-16; Acts 1:13 | BSB text. "Most think" one man |
| Kananaios from the Aramaic for zealous; meaning (zeal for the Law or resistance to Rome) left open | 1-4 | Earlier ledger (Mark 3) | Earlier ledger. The claim that the Zealot party is attested only from AD 66 (deep note) was not confirmed and is not used |
| Iscariot: "man of Kerioth" most common; the sicarius theory; John 6:71 "son of Simon Iscariot" | 1-4 | Joshua 15:25; John 6:71; Bible dictionaries; Joan Taylor (sicarius) as reported | Search: ehrmanblog.org "The Name Judas Iscariot"; abarim-publications.com; biblestudytools.com dictionary |
| Samaritans worshipped on Gerizim; their temple destroyed by John Hyrcanus, most likely around 110 BC | 5-15 | Bourgel, JBL 2016 (about 112/111 BC); archaeology of Shechem (111-110 BC); Jewish Encyclopedia | Search: wikipedia.com Hyrcanus I; jewishencyclopedia.com "Hyrcanus, John". "Most likely around" kept, since sources range from about 120 to 109 BC; no Josephus section given |
| Samaritans kept the books of Moses | 5-15 | Standard | Common reference fact, stated plainly |
| "Jews do not associate with Samaritans" | 5-15 | John 4:9 | BSB text |
| Ktaomai "acquire" in 10:9 | 5-15 | Greek text (ktēsēsthe) | Repository Greek text |
| Mark allows a staff and sandals; Luke forbids the staff; two explanations | 5-15 | Mark 6:8-9; Luke 9:3 | BSB text. Stated as views |
| 1 Corinthians 9:14; 1 Timothy 5:18 | 5-15 | BSB | BSB text |
| Didache 11: a travelling apostle who stays three days or asks for money is false | 5-15 | Didache 11 | Earlier ledger (Matthew 7) |
| Shalom greeting; shaking off dust (Acts 13:51) | 5-15 | Earlier ledger (Mark 6) | Earlier ledger |
| Sodom and Gomorrah; Ezekiel 34:5; 9:36 | 5-15 | Genesis 19; BSB | BSB text |
| Gentile mission: critical view; sequence; 15:24; Romans 1:16; 10:18; 28:19 | 5-15 | BSB; deep note `hard` | Stated as views. Sim, Jeremias and Levine (deep note) not named |
| Forty lashes limit; the Mishnah's forty less one (Makkot 3:10, later); Paul's five floggings | 16-25 | Deuteronomy 25:3; Mishnah Makkot 3:10; 2 Corinthians 11:24 | BSB text; search: en.wikipedia.org "Malkot (Judaism)"; myjewishlearning.com Makkot 22; sefaria.org Jerusalem Talmud Makkot 3.9. The synagogue attendant (deep note) not confirmed and not used |
| James killed by "King Herod" | 16-25 | Acts 12:1-2 | BSB text. No year given |
| Felix, Festus, King Agrippa | 16-25 | Acts 24 to 26 | Earlier ledger (Mark 13) |
| Tacitus: Nero blamed Christians for the fire of 64; many killed | 16-25 | Tacitus, Annals 15.44 | Earlier ledger |
| Pliny, Letters 10.96 (around 111 or 112): asks Trajan whether the name itself should be punished | 16-25 | Pliny | Search: yorku.ca Pliny 10.96-97; fordham.edu sourcebook; bartehrman.com. Paraphrased; "around 111 or 112" since sources say late 111 or 112 |
| Genesis 3:1 "crafty"; Hosea 7:11 "a silly, senseless dove" | 16-25 | BSB | BSB text. The Septuagint's phronimos and the midrash (deep note) not used |
| Beelzebul possibly "lord of the house" | 16-25 | Earlier ledger (Mark 3: "lord of the exalted house") | Earlier ledger; "may mean" |
| Micah 7:6; Exodus 4:10, 12 | 16-25 | BSB | BSB text |
| Schweitzer: Jesus expected the Son of Man before the twelve returned; proved wrong; German 1906, English The Quest of the Historical Jesus (1910) | 16-25 | Schweitzer | Search: religion-online.org; Churchman 125/4 (gospelstudies.org.uk); people.bu.edu (Boston Collaborative Encyclopedia); gutenberg.org. Paraphrased |
| Chrysostom, Homily 34 on Matthew: Jesus would come to them before they had gone round the towns, a comfort for the persecuted | 16-25 | Chrysostom | Search: newadvent.org/fathers/200134.htm; ccel.org NPNF vol. 10. Paraphrased; "a preacher of the late 300s" (his Matthew homilies are usually dated about 390; given only as "late 300s") |
| Readings of 10:23: resurrection (28:18), AD 70, final coming with an unfinished mission | 16-25 | Deep note; standard positions | Stated as views, no names (France, Davies and Allison, Luz not named) |
| 16:28; 24:34; 28:18; Daniel 7 | 16-25 | BSB | BSB text; the closing line matches the Mark 13 note |
| Flat roofs for announcements | 26-33 | Earlier ledger (Mark 2; Mark 13) | Earlier ledger |
| Assarion a small copper coin; Luke 12:6 five for two | 26-33 | Bible dictionaries; BSB | Search: biblia.com NET note on 10:29; ferrelljenkins.blog. The exact fraction (sixteenth or tenth of a denarius) conflicts across sources and is not given. Diocletian's price edict and Deissmann not used (not confirmed) |
| Greek of 10:29 "without your Father" (aneu tou patros); "the will of" supplied | 26-33 | Greek text in the repository | Repository |
| Gehenna, Hinnom, child sacrifice; the rubbish dump is late and unsupported | 26-33 | Jeremiah 7:31; Bailey (1986) | Earlier ledger (Mark 9) |
| 1 Samuel 14:45; Proverbs 9:10; 11:28 | 26-33 | BSB | BSB text |
| Views on hell (endless conscious separation; final destruction; hope of restoration) | 26-33 | Standard positions | Stated as views, no side, matching the Mark 9 note |
| Peter's denial and restoration | 26-33 | Matthew 26:69-75; John 21:15-19 | BSB text |
| Family as the unit of life; the cross Rome's death for slaves and rebels | 34-39 | Earlier ledger (Mark 8 and 15) | Earlier ledger |
| Stauros first in Matthew at 10:38 | 34-39 | Greek text (G4716) | Script |
| "Hate" as "love less" in comparison; Genesis 29:30-31 (Hebrew "hated", BSB "unloved"); the comparative reading questioned by some | 34-39 | Luke 14:26; Genesis 29:30-31; Adam Clarke; a Cambridge article on the idiom | Search: bibletools.org (Clarke); freebiblecommentary.org "Hate"; cambridge.org core-reader; vridar.org (the dissent) |
| Isaiah 9:6; 26:52; 5:9; 15:4-6; Romans 12:18; 1 Peter 3:15; Psalm 27:10; Mark 10:29-30 | 34-39 | BSB | BSB text |
| Care: rejection by family; safety and the police or a crisis line | 34-39 | CLAUDE.md, care for the reader | Pastoral, not a historical claim |
| A messenger stands for the sender | 40-42 | Standard (deep note) | Kept general |
| "Little ones" means disciples; 18:6; 25:40 | 40-42 | BSB | BSB text |

Left out: the Mishnah on courts of twenty-three; the synagogue attendant;
Herod Agrippa I and the year of James's death; the Zealot party's date; the
Septuagint's phronimos; Song of Songs Rabbah; the assarion's exact value;
Diocletian's edict and Deissmann; Crossan and the Cynics; the Essenes'
travel (Josephus); Tertullian on flight; Sim, Jeremias, Levine, France, Davies
and Allison, Luz by name; the textual notes on 10:3, 10:8 and 10:23.

## The plain notes on Matthew 11 (2026-11-19)

`client/public/bible/notes/matthew/plain/11.json`. Eight searches for this
chapter, with the earlier ledger (Mark 6 on Josephus and Machaerus; Mark 8 on
Bethsaida).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Antipas arrested John over his marriage | 1-6 | Matthew 14:3-4 | BSB text |
| Josephus: John held and killed at Machaerus, east of the Dead Sea | 1-6 | Josephus, Antiquities 18.116-119 | Earlier ledger (Mark 6) |
| Varied hopes: a prophet like Moses, Elijah's return, a son of David | 1-6 | Deuteronomy 18:15; Malachi 4:5 | BSB text |
| 4Q521 (Qumran Cave 4): when God's anointed comes, the Lord heals the wounded, makes the dead live, brings good news to the poor ("meek" in some translations); fragmentary; scholars debate whether God or the anointed one does the works | 1-6 | 4Q521 fragment 2, column 2 | Search: en.wikipedia.org 4Q521; virtualreligion.net "Messiah Apocalypse"; bsw.org Biblica 89 (2008) abstract. Paraphrased; translation difference stated |
| Skandalizō at 11:6 and 13:57; skandalon a trap's trigger or stumbling stone | 1-6 | Greek text in the repository (G4624); standard lexicons | Script |
| Isaiah's promises; vengeance lines left out | 1-6 | Isaiah 35:4-6; 26:19; 61:1-2 | BSB text |
| Chrysostom, Homily 36 on Matthew: John asked for his disciples' sake, not his own (the lesson was for those who doubted) | 1-6 | Chrysostom | Search: newadvent.org/fathers/200136.htm; st-takla.org NPNF excerpt. Paraphrased. Tertullian (deep note) not confirmed and not named |
| Care: doubt is not unbelief; a pastor, a doctor, or a crisis line | 1-6 | CLAUDE.md, care for the reader | Pastoral |
| Antipas's coins for Tiberias (around AD 19/20) carry a reed; the link to 11:7 is a suggestion (Theissen), called a conjecture by others since no source has the nickname | 7-15 | Kogon and Fontanille (Brill 2018) and Hendin, as summarised; Reiser, Biblica 81 (2000) | Search: library.biblicalarchaeology.org (Hendin); bsw.org Reiser article p470. No scholar named on the page |
| Camel's hair and leather belt | 7-15 | Matthew 3:4 | BSB text |
| Malachi 3:1 (God's way); Malachi 4:5; John 1:21; Luke 1:17 | 7-15 | BSB | BSB text (Malachi 3:1 quoted only to the first sentence, before its em-dash) |
| Biazetai passive or middle; three readings; Luke 16:16 | 7-15 | Greek text (G0971); deep note `hard` | Repository; stated as views, no side |
| Street games of weddings and funerals | 16-19 | The verse itself | Not a separate historical claim |
| Erga at 11:2 and 11:19; Luke 7:35 "all her children" | 16-19 | Greek text (G2041); BSB | Script; BSB text |
| Deuteronomy 21:20 "glutton and a drunkard"; Proverbs 9:5 | 16-19 | BSB | BSB text |
| Chorazin about two miles north of Capernaum (sources say two to two and a half); visible basalt ruins and synagogue later than Jesus (third or fourth century; one phase dated earlier); first-century town not found | 20-24 | Bible Gateway Encyclopedia of the Bible "Chorazin"; seetheholyland.net; biblewalks.com | Search. Stated as "about two miles" and "most of what stands dates from well after" |
| Bethsaida home of Peter, Andrew, Philip; site disputed | 20-24 | John 1:44; earlier ledger (Mark 8) | BSB text; earlier ledger |
| Capernaum Jesus' home (4:13); Tyre and Sidon (Isaiah 23; Ezekiel 26 to 28); Sodom (Genesis 19); Jonah 3:6; Isaiah 14:13-15; Ezekiel 16:49 | 20-24 | BSB | BSB text |
| Views on 11:21 (God's free choosing; God's knowledge of what free people would do; prophetic overstatement) | 20-24 | Deep note `hard` | Stated as views; Augustine, Molina, Craig and Calvin (deep note) not named |
| Nēpios at 11:25 and 21:16; John 10:15; Isaiah 29:14; Daniel 2:22; Psalm 8:2; 28:18 | 25-27 | Greek text (G3516); BSB | Script; BSB text |
| Election and response at 11:25-27 | 25-27 | Mark 4 plain note wording | Stated as views, no side, consistent with Mark 4:10-12 |
| Yoke as rule (1 Kings 12:11); Acts 15:10 not used | 28-30 | BSB | BSB text |
| Rabbinic teaching (later) speaks of reciting the Shema as accepting "the yoke of the kingdom of heaven" | 28-30 | Mishnah Berakhot 2:2 in printed texts; Babylonian Talmud Berakhot 14b; the word "yoke" may be missing from the best Mishnah manuscripts | Search: sefaria.org; sacred-texts.com; en.wikipedia.org Shema. Stated as "rabbinic writings from after Jesus' time", not as the Mishnah's exact words |
| Ben Sira wrote in Jerusalem early in the second century BC (about 190 to 175 BC); Sirach 51:23-27 invites the untaught to Wisdom's school and yoke and says he laboured little and found much rest | 28-30 | Sirach 51:23-27; Jewish Encyclopedia; Wikipedia "Book of Sirach" | Search: intertextual.bible; biblestudytools.com Sirach 51:27; en.wikipedia.org; jewishencyclopedia.com. Paraphrased "in summary"; no translation quoted. The Qumran copy of Sirach 51 (deep note) not used |
| Sirach in Catholic and Orthodox Bibles, not counted as Scripture by Protestants | 28-30 | Standard | Common reference fact |
| Praus at 5:5, 11:29, 21:5; chrēstos at 11:30 ("good", "kind") | 28-30 | Greek text (G4235, G5543) | Script; standard lexicons |
| Jeremiah 6:16; Exodus 33:14; 23:4; 10:38 | 28-30 | BSB | BSB text |
| Only Matthew has 11:28-30; Luke 10:21-22 parallels 25-27 | 28-30 | BSB comparison | Repository |
| Cranmer made 11:28 the first of the "comfortable words" (1548 Order of the Communion) | (checked, not used) | Crosby; Churchman 120/2 | Search. Not used in the plain note |
| Care: weariness and despair; a doctor, a pastor or a crisis line; the afraid reader met with 11:28 | 28-30 | CLAUDE.md, care for the reader | Pastoral |

Left out: Tertullian on John's doubt; the Psalms of Solomon and the Community
Rule; Theissen by name; Norden, Bultmann, von Hase, Suggs, Deutsch; Augustine,
Molina, Craig and Calvin on 11:21; Athanasius and Irenaeus on 11:27; Mishnah
Avot 3:5 (Nehunya ben HaKanah); the Qumran copy of Sirach 51; Handel and
Bonar; the textual notes on 11:2, 11:19 and 11:23; Cranmer (checked, not
needed).

## The plain notes on Matthew 12 (2026-11-19)

`client/public/bible/notes/matthew/plain/12.json`. Seven searches for this
chapter, with the earlier ledger (Mark 2 and 3).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Hand-picking allowed; the Mishnah (around AD 200) lists thirty-nine kinds of work, reaping and threshing among them | 1-8 | Deuteronomy 23:25; Mishnah Shabbat 7:2 | Earlier ledger (Mark 2) |
| Only Matthew says "hungry"; Matthew omits Abiathar and Mark 2:27; adds the priests and Hosea 6:6 | 1-8 | Matthew 12:1-8; Mark 2:23-28 | BSB comparison |
| Meizon (12:6) "something greater", neuter | 1-8 | Greek text in the repository (G3173) | Repository |
| Bread of the Presence; Sabbath offerings of two lambs; Hosea 6:6 quoted only by Matthew (9:13; 12:7); Genesis 2:3; Deuteronomy 5:15 | 1-8 | 1 Samuel 21:6; Leviticus 24:5-9; Numbers 28:9-10 | BSB; earlier ledger (Matthew 9) |
| Christians differ on the Sabbath (Sunday as the Lord's Day; Seventh-day Adventists and Seventh Day Baptists keep Saturday; fulfilled in Christ); 5:17; Colossians 2:16; Hebrews 4:9 | 1-8 | Standard positions; BSB | Stated as views, no side |
| Mishnah Yoma 8:6: even a doubt of danger to life overrides the Sabbath (later than the Gospels) | 9-14 | Mishnah Yoma 8:6 | Search: mishnah.org; posenlibrary.com Mishnah Yoma; sefaria.org Yoma 85. Paraphrased; marked as later |
| The Damascus Document (copies among the Dead Sea Scrolls) forbids lifting an animal out of a pit on the Sabbath (CD 11:13-14) | 9-14 | CD 11:13-14 | Search: bsw.org Wilson, Biblica 96 (2015); virtualreligion.net "Sabbath"; orion.huji.ac.il Baumgarten. No date given. The later rabbinic rulings on animals (sources differ) are not detailed: "Other Jewish teachers were less strict" only |
| Mark's anger and grief and the Herodians, absent in Matthew | 9-14 | Mark 3:1-6 | BSB comparison |
| Exodus 31:13; Deuteronomy 22:1-4 | 9-14 | BSB | BSB text |
| Isaiah 42:1-4 against Matthew 12:18-21 (BSB wording compared; no claim about the Septuagint); 3:17; Gentiles 2:1-12, 8:5-13, 28:19 | 15-21 | BSB | BSB text |
| Reed and wick as everyday things | 15-21 | General | Kept general |
| Beelzebul's name | 22-30 | 2 Kings 1:2; earlier ledger (Mark 3) | Earlier ledger |
| Josephus, Antiquities 8.46-48: Eleazar freed the possessed before Vespasian with a ring holding a root and incantations ascribed to Solomon | 22-30 | Josephus | Search: lexundria.com 8.44-49 (Whiston); philipharland.com; Duling, HTR 1985 (cambridge.org). Paraphrased |
| Luke 11:20 "finger of God"; Mark 9:40; 2 Samuel 7:12-16; Isaiah 49:24-25 | 22-30 | BSB | BSB text |
| Possession and illness listed apart (4:24; 15:30-31); the 9:32-34 care line | 22-30 | BSB; Matthew 9 plain note | Repository |
| Blasphemy a capital crime | 31-37 | Leviticus 24:16 | BSB text |
| Argos at 12:36 and 20:3, 6 | 31-37 | Greek text (G0692) | Script |
| Matthew's fuller form; Luke 12:10; Mark 3:28-30 | 31-37 | BSB | BSB comparison |
| The unforgivable sin: defined by the setting; the Mark 3 wording reused word for word ("It is not a careless word ... the very forgiveness Jesus offers"; "Many Christians have feared ... has not turned hard in this way"; "The promise is wide before the warning is given"); views (calling the Spirit's work evil; final refusal; only for those who saw; Hebrews 6:4-6) | 31-37 | Mark 3 plain note; deep note | Stated as views; Augustine, Aquinas, Calvin and Russell (deep note) not named |
| John Bunyan, Grace Abounding to the Chief of Sinners (1666): long feared he had committed the unpardonable sin, came at last to comfort | 31-37 | Bunyan | Search: ccel.org; gutenberg.org 654; johnbunyan.org. Paraphrased; no length of years given |
| 1 Timothy 1:13; 7:17; Psalm 1:3; Jeremiah 17:10 | 31-37 | BSB | BSB text |
| Adultery as the prophets' picture of unfaithfulness | 38-42 | Jeremiah 3:8 | BSB text |
| Nineveh capital of Assyria, which took Samaria | 38-42 | 2 Kings 17:6 | BSB text |
| Queen of Sheba (1 Kings 10:1, 7); Jonah 1:17; 3:5 | 38-42 | BSB | BSB text. Her location (Saba) not given |
| Thomas Paine, The Age of Reason: by the Gospels' own account Jesus was in the grave one day and two nights | 38-42 | Paine (Part I, 1794, per ushistory.org) | Search: ushistory.org/paine/reason. Paraphrased; dated only "in the 1790s" since the deep note says part 2 (1795) and the search found it in Part I |
| Inclusive reckoning; Rabbi Eleazar ben Azariah: a day and a night make one period, part counts as the whole (Jerusalem Talmud Shabbat 9:3; Babylonian Talmud Pesahim 4a), marked as later | 38-42 | Talmud as cited in commentaries | Search: torahresource.com; JETS 61.1 (Andrews); bethimmanuel.org. Paraphrased; no date given for the rabbi; tractate references kept off the page |
| Esther 4:16; 5:1; 1 Samuel 30:12-13; 16:21; 27:63-64; Mark 15:42; 1 Corinthians 15:4 | 38-42 | BSB | BSB text |
| A Wednesday crucifixion (72 hours; festival Sabbath) held by a minority; most hold Friday | 38-42 | Catholic Answers "Crucifixion Wednesday"; jimmyakin.com; Christianity Today | Search. Torrey (deep note) not found and not named; the Thursday view not used |
| Isaiah 34:14 | 43-45 | BSB | BSB text |
| Care: the parable is not a teaching that illness is possession; a returning illness is not a judgment; a doctor, a pastor or a crisis line | 43-45 | CLAUDE.md, care for the reader | Pastoral |
| Mark 3:21 omitted by Matthew; "will of My Father in heaven" | 46-50 | BSB comparison | BSB text |
| Luke 1:38; John 19:26-27 | 46-50 | BSB | BSB text |
| Three readings of the brothers | 46-50 | Earlier ledger (Mark 3, Mark 6) | Earlier ledger; same wording as the Mark 6 note |

Left out: 1 Maccabees 2 and the Sabbath martyrs; the Mekhilta saying of
Simeon ben Menasya; the Babylonian Talmud Shabbat 128b; Tobit's demon;
Justin and the Talmud on Jesus as a sorcerer; Augustine, Aquinas, Calvin and
Russell on the unforgivable sin; Torrey; the queen's homeland and Josephus on
her; Mishnah Avot 1:4; the textual notes on 12:6, 12:15, 12:24 and 12:47.

## The plain notes on Matthew 13 (2026-11-19)

`client/public/bible/notes/matthew/plain/13.json`. Eight searches for this
chapter, with the earlier ledger (Mark 4 and Mark 6).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Sowing by hand; the ploughing debate; a hundredfold as blessing | 1-9 | Earlier ledger (Mark 4); Genesis 26:12 | Earlier ledger; BSB |
| Matthew counts the yield downward | 1-9 | Matthew 13:8; Mark 4:8 | BSB comparison (13:8 not quoted, since it carries an em-dash) |
| Five teaching blocks each closed by "When Jesus had finished" | 1-9 | 7:28; 11:1; 13:53; 19:1; 26:1 | BSB text |
| Isaiah 55:10-11 | 1-9 | BSB | BSB text |
| Parable and mystery explained | 10-17 | Earlier ledger (Mark 4) | Earlier ledger |
| Mark "so that" (4:12); Matthew gives a reason (13:13) | 10-17 | BSB; earlier ledger (Mark 4) | BSB text |
| Luke 10:23-24 parallels 13:16-17 | 10-17 | BSB | BSB text |
| Isaiah 6:10 BSB ("Make the hearts ... calloused") against Matthew 13:15 ("has grown callous ... they have closed their eyes") | 10-17 | BSB | BSB comparison. No claim made about the Septuagint |
| Chrysostom, Homily 45 on Matthew: the blindness self-chosen ("seeing, they see not"); the parables meant to stir them | 10-17 | Chrysostom | Search: newadvent.org/fathers/200145.htm; ccel.org NPNF 10. Paraphrased |
| "Them" not the Jewish people as a whole | 10-17 | Deep note `hard` | Pastoral and interpretive, stated plainly |
| Understand (13:19, 23); skandalizō at 13:21 and 13:57 | 18-23 | BSB; Greek text (G4624) | Script |
| Jülicher (late 1800s) and Blomberg on the explanation | 18-23 | Earlier ledger (Mark 4) | Earlier ledger |
| Zizanion usually identified as darnel (Lolium temulentum); looks like wheat until the ear; grain harmful if eaten (the fungus theory not stated) | 24-30 | Smith's Bible Dictionary "Tares" (ccel.org); Easton's; hypr.bible; University of Pretoria paper (1933) | Search. Zizanion at 13:25-40 by script (G2215) |
| Sowing weeds in another's field discussed in Roman law: Ulpian, citing Celsus, Digest 9.2.27.14; the Digest compiled in the 500s | 24-30 | Digest 9.2.27.14 | Search: libmast.utm.my (article "Ulpian, Celsus and weed pollution of soil"); ceeol.com (Aličić). "Weeds" kept general |
| Donatists claimed a pure church and read "the field is the world" against a mixed church; Augustine and the Catholics read it of the church, a mixed body until the harvest; Conference of Carthage 411 | 24-30 | Schaff, History of the Christian Church 3 (ccel.org); Theological Studies 51.1; dbts.edu; encyclopedia.com "Donatism" | Search. Dated "around AD 400"; Augustine's Letter 93 and coercion (deep note) not confirmed and not used |
| Aquinas (Summa Theologiae II-II q.11 a.3): the command not to uproot holds only where the wheat would be harmed, so heretics may be put to death | 24-30 | Aquinas | Search: ccel.org summa.SS_Q11_A3; stephenhicks.org translation. Paraphrased; the reply's numbering differs between translations and is not given |
| Roger Williams, The Bloudy Tenent of Persecution (1644): the field is the world, so dissenters left alone until the harvest; John Cotton: the field is the church (1647 reply) | 24-30 | Williams; Cotton | Search: worldhistory.org; en.wikipedia.org; baptistnews.com; Church History (cambridge.org) |
| Church discipline (18:15-17) and the parable: views, no side | 24-30 | Standard positions | Stated as views |
| Black mustard, seed size, height, byword; orchid seeds | 31-35 | Earlier ledger (Mark 4) | Earlier ledger |
| Luke 13:19 "became a tree" | 31-35 | BSB | BSB text |
| Leaven as old dough; 16:6; Genesis 18:6 "three seahs" | 31-35 | BSB | BSB text. The litre figure (deep note) not used; "a large batch" only |
| Enkryptō at 13:33; kruptō at 11:25, 13:35, 13:44 | 31-35 | Greek text (G1470, G2928) | Script |
| Ezekiel 17:23; Daniel 4:12 | 31-35 | BSB | BSB text (as in Mark 4) |
| Psalm 78:2; "A Maskil of Asaph"; "Asaph the seer" (2 Chronicles 29:30) | 31-35 | BSB | BSB text. The manuscript reading "Isaiah the prophet" and Porphyry (deep note) not used |
| Mustard smallest of seeds sown: inerrancy views stated generally | 31-35 | Earlier ledger (Mark 4) | Davis, Lindsell, Sproule (deep note) not named |
| "End of the age" only in Matthew among the Gospels (13:39, 40, 49; 24:3; 28:20); "gnashing of teeth" six times in Matthew, once in Luke (13:28) | 36-43 | BSB | Script over the BSB text |
| Daniel 3:6; Malachi 4:1; Daniel 12:3; 8:12 | 36-43 | BSB | BSB text |
| Views on hell (endless conscious separation; final destruction; hope of restoration); literal or pictured fire and darkness | 36-43 | Standard positions | Stated as views, matching the Matthew 10 and Mark 9 notes |
| Care: the afraid reader met with 11:28 | 36-43 | CLAUDE.md, care for the reader | Pastoral |
| Josephus, Jewish War 7.114-115: after 70 the Romans dug up gold, silver and valuables buried against the uncertainties of war; captives showed them more | 44-46 | Josephus | Search: lexundria.com 7.115 (Whiston); ccel.org war-7. Paraphrased |
| Pliny the Elder, Natural History book 9: pearls hold the first rank among valuables; written in the 70s | 44-46 | Pliny, Natural History 9 (ch. 54 in Bostock and Riley; 9.106 in modern numbering) | Search: peterburk.github.io (Bostock and Riley); jewelpedia.net. Paraphrased; no section number on the page |
| Emporos at 13:45 only; margaritēs at 7:6 and 13:45-46 | 44-46 | Greek text (G1713, G3135) | Script |
| Proverbs 2:4; 3:15; Luke 16:1-8 | 44-46 | BSB | BSB text |
| Two readings of the buyer (the disciple; Christ) | 44-46 | Standard readings | Stated as views; no date or Father claimed |
| Sagēnē only at 13:47; Leviticus 11:9-10; Habakkuk 1:15; Jeremiah 16:16 | 47-52 | Greek text (G4522); BSB | Script; BSB text |
| Mathēteuō at 13:52, 27:57, 28:19; 5:17 | 47-52 | Greek text (G3100); BSB | Script |
| Nazareth a few hundred people; tektōn | 53-58 | Earlier ledger (Mark 6) | Earlier ledger |
| "Carpenter's son" against Mark's "the carpenter"; "did not" against "could not" | 53-58 | Mark 6:3, 5; BSB | BSB comparison |
| Three readings of the brothers, Mark 6 wording; 1:25; Luke 2:7; Genesis 13:8; 27:56; John 19:26-27; John 7:5; Acts 1:14; 1 Corinthians 15:7 | 53-58 | Earlier ledger (Mark 3, Mark 6; Bauckham); BSB | Earlier ledger; BSB text. Helvidius, Epiphanius, Jerome, Meier, the Council of 553 and the Reformers (deep note) not named |

Left out: the Gospel of Thomas parallels; Pennington on "kingdom of heaven";
the Psalms of Solomon and the War Scroll; the Copper Scroll; Cleopatra's
pearl; the Mishnah on darnel (Kilayim 1:1); the darnel fungus; the litre
size of three measures; Augustine's Letter 93; Chrysostom's Homily 46;
Hubmaier, Luther and Calvin on the weeds; Alford's hymn and Millais; the
rabbinic parables of treasure and the pearl; Irenaeus and Origen on the
treasure; Jerome on the hundredfold; the Scofield reading; Jülicher's,
Dodd's, Jeremias's and Kingsbury's books; the textual notes on 13:35 and
13:55.

## Repairs to two Old Testament notes (2026-11-19, Matthew 14 to 16 run)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Matthew 7:23 echoes Psalm 6:8 ("Depart from me, all you workers of iniquity"); Isaiah 29:13 on lips and hearts; Amos 3:2 "Only you have I known"; "known" as chosen and bound in covenant | Matthew 7:21-23 | BSB | BSB text. The Luke 6:46 line moved from the Old Testament note to the end of "first hearers" |
| Deuteronomy 19:15 (two or three witnesses); 1 Corinthians 15:4 "according to the Scriptures"; Luke 24:25; Psalm 16:10 quoted in Acts 2:27 | Mark 16:9-14 | BSB | BSB text. Paul "in the 50s" from the earlier ledger (Mark 16) |

## The plain notes on Matthew 14 (2026-11-19)

`client/public/bible/notes/matthew/plain/14.json`. Five searches for this
chapter, with the earlier ledger (Mark 6).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Antipas, son of Herod the Great, ruled Galilee 4 BC to AD 39; tetrarch, never king | 1-12 | Earlier ledger (Mark 6) | Earlier ledger; "tetrarch" (14:1) and "king" (14:9) from the BSB |
| Mark: Herodias wants John dead, Herod protects him; Matthew: Herod wants to kill him, fears the people | 1-12 | Mark 6:19-20; Matthew 14:5 | BSB comparison |
| Josephus: John a good man; Herod feared John's great influence over the people might lead to a rebellion; killed at Machaerus | 1-12 | Josephus, Antiquities 18.116-119 | Search: lexundria.com 18.117-118 (Whiston: "feared lest the great influence John had over the people might put it into his power and inclination to raise a rebellion"); livius.org. Paraphrased. This narrows the Mark 6 run's "suspicious of John's influence" with the wording now found |
| Josephus names Herodias's first husband Herod; her daughter Salome married Philip the tetrarch | 1-12 | Josephus, Antiquities 18.136-137 | Search: lexundria.com 18.136-137 (Whiston; "[Philip]" is the translator's bracket) |
| Two explanations of the names: the man bore both names (Josephus calls more than one son of Herod "Herod"); or the Gospel writers confused him with Philip the tetrarch | 1-12 | Lexham Bible Dictionary "Herod Philip"; biblicaltraining.org; Encyclopedia of the Bible "Herodias" | Search. Kokkinos's three-marriage idea not used |
| 2 Maccabees 6:7: Jews forced to eat sacrifices at the king's monthly birthday | 1-12 | 2 Maccabees 6:7 | Search: biblestudytools.com NRSV, KJVA; tips.translation.bible. No date given for the book; the king not named |
| Korasion at 9:24-25 and 14:11 | 1-12 | Greek text (G2877) | Script |
| Matthew 11:14; 17:12; 1 Kings 21:25; 19:2; Leviticus 18:16; Genesis 40:20-22; Judges 11:31, 34; Matthew 5:37; 27:57-60 | 1-12 | BSB | BSB text |
| Withdrawal after John's death (Matthew) against after the mission (Mark); "healed their sick"; "in addition to women and children" only in Matthew | 13-21 | Matthew 14:13-21; Mark 6:30-44 | BSB comparison |
| Exodus 12:37 "besides women and children"; Exodus 16:35; 2 Kings 4:43; Matthew 26:26 | 13-21 | BSB | BSB text |
| Told in Mark 6, Luke 9 and John 6; barley loaves and a boy (John 6:9) | 13-21 | BSB | BSB text. "The only miracle in all four" (deep note) not used; "one of the few events" |
| Skeptical readings (shared food; a story built from the Old Testament) | 13-21 | Standard positions | Stated as views, no names. Hume, Paulus, Strauss, Lewis and Keener (deep note) not named |
| Fourth watch about 3 to 6 a.m. | 22-33 | Earlier ledger (Mark 6) | Earlier ledger |
| Matthew omits "intended to pass by" and the hardened hearts, adds Peter, ends in worship; first time the disciples together say "Son of God" in Matthew | 22-33 | Matthew 14:22-33; Mark 6:45-52 | BSB comparison; earlier uses of "Son of God" in Matthew are by the devil, demons and the voice from heaven |
| Distazō only at 14:31 and 28:17 in Matthew; oligopistos at 6:30, 8:26, 14:31, 16:8 | 22-33 | Greek text (G1365, G3640) | Script |
| Augustine, Sermon 76 (Benedictine numbering): the sea is this world, Peter a figure of the one church, walking by the Lord's power, the church holds strong and weak | 22-33 | Augustine, Sermon 76 | Search: newadvent.org (NPNF "Sermon 26", Benedictine 76); ccel.org; clerus.org. Paraphrased; no year given |
| Egō eimi | 22-33 | Earlier ledger (Mark 6) | Earlier ledger |
| Job 9:8; Psalm 77:19; Psalm 107:28-29; Isaiah 43:10; Psalm 18:16 | 22-33 | BSB | BSB text |
| Care: "little faith" is not a rebuke of anxiety; the Matthew 8 sentences reused | 22-33 | Matthew 8 plain note | Repository |
| Kraspedon at 9:20, 14:36 and 23:5; Numbers 15:38-39 | 34-36 | Greek text (G2899); BSB | Script; BSB text |

Left out: Malthace; Lugdunum; Herodias "in defiance of the ancestral laws"
(18.136); the Mishnah on birthdays of kings and on beheading; Tobit on
burial; Vörös and the Machaerus excavations; John's tomb at Sebaste and
Rufinus; Juvenal's baskets; the Mishnah's bread blessing; Bethsaida;
Chrysostom's two tables (the contrast kept, unattributed); Origen; Giotto's
Navicella; Moreau; Held; the lectionaries; the date of 2 Maccabees.

## The plain notes on Matthew 15 (2026-11-19)

`client/public/bible/notes/matthew/plain/15.json`. Four searches for this
chapter, with the earlier ledger (Mark 7 and 8).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Priests washed before the altar; the Pharisees' aim of priestly holiness at ordinary meals; the Mishnah around AD 200; Mishnah Nedarim 9:1 | 1-9 | Earlier ledger (Mark 7) | Earlier ledger |
| Josephus: the Pharisees passed on many observances from their fathers not written in the law of Moses; the Sadducees rejected them | 1-9 | Josephus, Antiquities 13.297 | Search: lexundria.com 13.297 (Whiston); cojs.org. Paraphrased |
| Matthew does not explain the washing (Mark 7:3-4 does) | 1-9 | BSB comparison; Matthew's book page | BSB text |
| Hupokritēs first meant a stage actor | 1-9 | Greek lexicons | Search: biblehub.com 5273; merriam-webster.com "The Origin of 'Hypocrite'" |
| Exodus 20:12; 21:17; Numbers 30:2; Isaiah 29:13; 2 Thessalonians 2:15; Philippians 3:5; Acts 5:34 | 1-9 | BSB | BSB text |
| Tradition paragraph reused from the Mark 7 note | 1-9 | Mark 7 plain note | Repository |
| Matthew lacks Mark's "(Thus all foods are clean.)" and ends at handwashing (15:20); two readings of the omission, no side; Acts 10:15; Romans 14:14 | 10-20 | Mark 7:19; Matthew 15:17, 20 | BSB comparison; stated as views, no names (Boyarin, deep note, not named) |
| Matthew 12:34; Romans 2:19; Jeremiah 17:9; Psalm 51:10; Ezekiel 36:26; Isaiah 60:21 | 10-20 | BSB | BSB text. Isaiah 61:3 not quoted (its BSB text holds an em-dash). Qumran and 1 Enoch on "planting" not used |
| Tyre and Sidon; dogs in the Bible; kynarion a little or house dog; first to Israel; Genesis 12:3; Romans 1:16 | 21-28 | Earlier ledger (Mark 7) | Earlier ledger; kunarion at 15:26-27 confirmed in the Greek text (G2952) |
| Matthew: "Canaanite"; Mark: "Greek woman of Syrophoenician origin"; Canaanites among the nations of Deuteronomy 7:1 | 21-28 | Matthew 15:22; Mark 7:26; Deuteronomy 7:1 | BSB text |
| Only Matthew has the silence, the disciples' request and 15:24; Matthew lacks Mark's "First" | 21-28 | Matthew 15:21-28; Mark 7:27 | BSB comparison |
| Great faith praised in the centurion (8:10) and the woman; healed "at that very hour" (8:13) | 21-28 | BSB | BSB text |
| Chrysostom, Homily 52 on Matthew: Jesus held back to bring out and show her faith | 21-28 | Chrysostom | Search: newadvent.org 200152; ccel.org NPNF1 10. Paraphrased; no year given |
| Augustine, Sermon 77: called a dog, she did not deny it; her humility praised | 21-28 | Augustine | Search: newadvent.org; sermonindex.net; bkv.unifr.ch. Paraphrased |
| Four readings (test; order of mission, 10:6 and 28:19; real exchange; the diminutive), no side | 21-28 | Standard positions; deep note | Stated as views. Ringe, Dube, Levine, Croy and Luther (deep note) not named |
| Zarephath of Sidon; the widow's son; Rahab's confession; Rahab in 1:5 | 21-28 | 1 Kings 17:9, 17-24; Joshua 2:11; Matthew 1:5 | BSB text |
| Cranmer's prayer (1548 Order of the Communion): "not worthy so much as to gather up the crumbs", drawn from this story | 21-28 | Cranmer | Search: livingchurch.org; prayerbook.ca; episcopalchurch.org glossary; en.wikipedia.org Prayer of Humble Access. Given in single quotes as not Scripture; the 1548 text reads "We be not worthy..." |
| Mark 7:31 places Jesus in the Decapolis; two readings of who the crowd was | 29-31 | BSB; standard positions | Stated as views |
| Isaiah 35:5-6; Isaiah 25:6 | 29-31, 32-39 | BSB | BSB text; the link to 25:6 given as "many readers" |
| Spyris (15:37; 16:10) the word of Acts 9:25; Magadan and Dalmanutha unknown; later copies Magdala | 32-39 | Earlier ledger (Mark 8); Greek text (G4711) | Earlier ledger; script |
| Exodus 16:35; Matthew 16:9-10; "in addition to women and children" (15:38) | 32-39 | BSB | BSB text |

Left out: Josephus, Jewish War 2.162-166; Galatians 1:14; Mishnah Hagigah 2:5,
Yadayim and Nedarim 5:6; Furstenberg; the Jebel Hallet et-Turi ossuary by
name; Josephus on the Tyrians (Against Apion 1.70; War 2.478); Theissen;
Pesikta de-Rav Kahana and Yohanan ben Zakkai; Hilary; Origen; the Didache on
dogs; Luther's 1525 sermon (not searched); the lectionaries; every textual
note in the deep note (6, 4, 8, 14, 30-31, 39 beyond Magadan).

## The plain notes on Matthew 16 (2026-11-19)

`client/public/bible/notes/matthew/plain/16.json`. Eight searches for this
chapter, with the earlier ledger (Mark 8 and 9).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Pharisees kept traditions of the fathers; Sadducees rejected them (Josephus, Antiquities 13.297, from the Matthew 15 search) and denied the resurrection; Matthew pairs them (3:7; 16:1-12) | 1-4 | Matthew 22:23; Acts 23:8; Josephus | BSB text; earlier ledger (Matthew 15) |
| 16:2b-3 absent from Sinaiticus and Vaticanus (and others); added from Luke 12:54-56, or dropped where a red morning sky does not bring rain (Scrivener, Lagrange) | 1-4 | Textual commentaries as summarised | Search: en.wikipedia.org "Matthew 16:2b-3"; confessionalbibliology.com; uasvbible.org. Scholars not named |
| Sign of Jonah; Jonah 3:5; 12:40; "adulterous" as the prophets' picture (Hosea 2; Jeremiah 3), not the Jewish people | 1-4 | BSB; Matthew 12 plain note | BSB text; earlier ledger |
| Leaven; Passover; Mark's Herod; Luke's hypocrisy; only Matthew "teaching"; Mark ends at "Do you still not understand?" | 5-12 | Exodus 12:15; 1 Corinthians 5:6; Mark 8:15, 21; Luke 12:1 | BSB text; earlier ledger (Mark 8) |
| Matthew 23:3 against 16:12: readings, no side | 5-12 | BSB | Stated as views |
| Caesarea Philippi (Pan, Herod's temple, Philip); Psalms of Solomon 17 | 13-17 | Earlier ledger (Mark 8) | Earlier ledger. Distance and temple site not given |
| Only Matthew adds Jeremiah and "Son of the living God" and verses 17-19 | 13-17 | Mark 8:28-29 | BSB comparison |
| Simon son of Jonah; John 1:42 "son of John"; "may be forms of one name" | 13-17 | BSB | BSB text; stated as possible |
| 2 Samuel 7:12-16; Psalm 2:7; Hosea 1:10 | 13-17 | BSB | BSB text |
| Petros / petra (16:18); kepha, Cephas (John 1:42); ekklēsia only at 16:18 and 18:17 in the Gospels | 18-20 | Greek text (G4074, G4073, G1577); BSB | Script; Matthew's book page |
| Hades the Greek word for Sheol: Psalm 16:10 "Sheol" quoted in Acts 2:27 as "Hades"; Isaiah 38:10 "gates of Sheol"; Hades not Gehenna | 18-20 | BSB | BSB text |
| Bind and loose: Jewish legal terms for forbid and permit (asar, hittir), in rabbinic writings (later) | 18-20 | Jewish Encyclopedia (1901) "Binding and Loosing"; israelbiblecenter.com | Search: jewishencyclopedia.com 3307. Marked as later; no tractate named |
| Josephus, Jewish War 1.111: under Queen Alexandra the Pharisees bound and loosed whom they would | 18-20 | Josephus | Search: lexundria.com War 1.107-119 (Whiston); cojs.org War 1.110-12. Paraphrased; her dates not given |
| Matthew 18:18 gives the words to the disciples together | 18-20 | BSB | BSB text |
| Isaiah 22:15, 22 (Shebna, Eliakim, the key); Psalm 18:2; Isaiah 51:1-2 | 18-20 | BSB | BSB text. The Catholic argument from Isaiah 22's continuing office is not stated (not confirmed by the search) |
| Catholic: Simon alone made the rock; the keys as authority to govern God's house (Catechism 553, 881) | 18-20 | Catechism of the Catholic Church | Search: vatican.va archive; usccb.org; catholic.com; stmikes.org. Paraphrased |
| First Vatican Council (1870), Pastor Aeternus: a true primacy of jurisdiction, not only of honour, given to Peter and continuing in the bishops of Rome | 18-20 | Pastor Aeternus | Search: ewtn.com; catholicculture.org; oursundayvisitor.com; churchcontroversies.com. Paraphrased |
| Orthodox: the rock as Peter's confession of faith; Chrysostom (Homily 54 on Matthew): "the faith of his confession" | 18-20 | oca.org "On this rock I will build my church"; Chrysostom | Search: oca.org; newadvent.org 200154; clerus.org. Paraphrased. "Every bishop holds Peter's chair" and the named Orthodox theologians (deep note) not confirmed and not used; Orthodox rejection of Rome's universal jurisdiction stated generally |
| Protestant: the rock as Christ or the confession (1 Corinthians 3:11); many today accept Peter in person, without successors (Ephesians 2:20; Acts 2; 10) | 18-20 | Ligonier devotional "Peter the Rock"; thegospelcoalition.org; christiantruth.com | Search. Cullmann's wording not confirmed, so no scholar named; Melanchthon and Calvin not named |
| "From that time on" at 4:17 and 16:21 | 21-23 | BSB | BSB text |
| Skandalon at 16:23; hupage (4:10; 16:23); opisō mou (4:19; 16:23-24) | 21-23 | Greek text | Script. "Shares its Greek words for 'behind Me'" (the verbs differ: deute, hupage) |
| Ruling council; stumbling block (1 Corinthians 1:23); Isaiah 53:5; Psalm 118:22; Daniel 7:13-14; predictions shaped after Easter (since about 1900) | 21-23 | BSB; earlier ledger (Mark 8, Wrede) | BSB text; earlier ledger |
| Varus and about two thousand crucified; Plutarch; Yehohanan (1968); psychē | 24-28 | Earlier ledger (Mark 8) | Earlier ledger |
| Mark 8:35 "and for the gospel"; Mark 9:1 "arrive with power" against Matthew 16:28 | 24-28 | BSB | BSB comparison |
| Psalm 49:8; Psalm 62:12; Daniel 7:13-14; Galatians 2:20; Matthew 17:1-2; 28:18 | 24-28 | BSB | BSB text |
| Care: the cross is not abuse; "If you are being abused, seek safety first..." (the Matthew 5 and Mark 10 wording) | 24-28 | CLAUDE.md, care for the reader | Pastoral |
| Bertrand Russell, Why I Am Not a Christian (lecture, March 1927, Battersea): Christ expected his second coming within the lifetime of people then living | 24-28 | Russell | Search: hettingern.people.charleston.edu (text); bigthink.com; christiancourier.com. Paraphrased |
| Readings of 16:28: the mountain; resurrection and Spirit; the judgment on Jerusalem in AD 70 (a coming in judgment) | 24-28 | Mark 9 plain note; christiancourier.com (the judgment reading) | Stated as views, no side; AD 70 from the earlier ledger |

Left out: forty kilometres to Caesarea Philippi; Netzer, Maoz and Overman on
Herod's temple; 2 Maccabees 15 and 2 Esdras on Jeremiah; Sirach 14:18 on
"flesh and blood"; the Elephantine papyrus and Fitzmyer; Yalkut Shimoni;
Tertullian, Origen, Cyprian, Firmilian, Augustine's Retractations, Leo the
Great; Melanchthon, Calvin; Meyendorff, Afanasiev, Schmemann; Cullmann,
Carson, Bultmann; Ut Unum Sint; Wisdom 16:13 and 3 Maccabees 5:51; the
Catholic argument from Isaiah 22 as an office handed on; the lectionaries.

## The plain notes on Matthew 17 (2026-11-19)

`client/public/bible/notes/matthew/plain/17.json`. Seven searches for this
chapter, with the earlier ledger (Mark 9; Mark 7 on the Tyrian shekel).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The shelters, Tabernacles, the unnamed mountain (Tabor and Hermon) | 1-8 | Earlier ledger (Mark 9) | Pointed to the Mark 9 note, not repeated |
| Only Matthew: face "shone like the sun", bright cloud, "in whom I am well pleased" (matching 3:17), Moses named first, "Lord" (Mark "Rabbi"), the fall, the touch, "Get up... Do not be afraid" | 1-8 | Mark 9:2-8; Luke 9:28-36 | BSB comparison |
| 2 Peter 1:18; Exodus 24:16; 34:29; Psalm 2:7; Isaiah 42:1; Deuteronomy 18:15; Daniel 10:9-12 | 1-8 | BSB | BSB text |
| Horama, a sight God shows; Acts 7:31 of the burning bush | 9-13 | Greek text; standard lexicons | Repository text |
| Only Matthew: the disciples understood he meant John (17:13; 11:14); Malachi 4:5-6; 1 Kings 19:2 | 9-13 | BSB | BSB text; earlier ledger (Mark 9) |
| Selēniazomai from the word for moon, "moonstruck", older "lunatic"; only Matthew 4:24 and 17:15; 4:24 lists the demon-possessed and those having seizures apart | 14-21 | Thayer's and Strong's (4583); Mounce | Search: biblehub.com 4583; billmounce.com; blueletterbible.org G4583. Thayer's remark on the Greeks and epilepsy not used |
| Greek doctors argued seizures have natural causes | 14-21 | On the Sacred Disease | Earlier ledger (Mark 9) |
| 17:21 absent from the first hand of Sinaiticus and from Vaticanus (and others); added from Mark 9:29; "and fasting" also absent from the oldest copies of Mark; BSB leaves the number empty; some who hold the later copies defend it | 14-21 | NET Bible note on 17:21; textual summaries | Search: biblia.com NET note; biblehub.com; confessionalbibliology.com (the opposing case). Carson not named |
| Deuteronomy 32:5; Exodus 32:19; 1 Corinthians 13:2; 13:32 "the smallest of all seeds" | 14-21 | BSB | BSB text |
| Care: the Mark 9 wording on seizures and mental illness and the path to help, word for word (adapted only to "often falls into the fire or into the water"); the Matthew 8 sentence that the Bible does not teach that sickness comes from too little faith, and "Faith is trust in a person, not a payment that buys a cure"; the mustard seed not a formula | 14-21 | CLAUDE.md, care for the reader | Pastoral |
| Second of three predictions (16:21; 20:17-19); Mark 9:32 against Matthew's "deeply grieved" | 22-23 | BSB | BSB comparison |
| Paradidōmi in 17:22, 26:15-16, 27:26 and Romans 4:25 | 22-23 | Greek text (G3860) | Script |
| Isaiah 53:5; Hosea 6:2 | 22-23 | BSB | BSB text |
| Two drachmas the yearly temple tax; Exodus 30:12-16 the half shekel; Nehemiah 10:32 a third of a shekel | 24-27 | BSB; Josephus, Jewish War 7.218 ("as they used to pay" the temple) | BSB text; search below |
| Babylonian Jews kept the money at Nehardea and Nisibis until it could be taken to Jerusalem | 24-27 | Josephus, Antiquities 18.311-313 | Search: lexundria.com 18.312 (Whiston); philipharland.com summary; posenlibrary.com. Paraphrased |
| Mishnah Shekalim 1:3: changers' tables in the provinces on 15 Adar, in the temple on 25 Adar (written down around 200) | 24-27 | Mishnah | Search: mishnah.org; jewishvirtuallibrary.org; sefaria.org. The sources differ on where the 15 Adar tables stood, so the note says "in the towns" and "later in the temple" |
| Stater a four-drachma coin, paying for two; Tyrian shekel the usual coin of temple payments | 24-27 | Lexicons; earlier ledger (Mark 7) | Earlier ledger. Tosefta Ketubbot 13:20 not cited: the "only Tyrian" reading is an inference from it |
| After 70 Vespasian ordered every Jew to pay two drachmas yearly to the Capitol (Jupiter's temple) | 24-27 | Josephus, Jewish War 7.218 | Search: lexundria.com 7.218 (Whiston); encyclopedia.com "Fiscus Judaicus"; biblicalarchaeology.org. Paraphrased. Women, children, Edfu ostraca, Suetonius and Nerva's coin (deep note) not used |
| Matthew after 70 (most scholars) | 24-27 | Earlier ledger (Matthew's book page) | Earlier ledger |
| Herodotus, Histories 3.41-42: Polycrates of Samos threw his ring into the sea and found it in a fish | 24-27 | Herodotus | Search: lexundria.com 3.42 (Macaulay); perseids.org (Godley); sacred-texts.com. Paraphrased. Strauss, b. Shabbat 119a, Davies and Allison, Mendel Nun (deep note) not used |
| Chrysostom, Homily 58 on Matthew: Jesus first shows he is not liable, then pays, to keep others from offence, and pays for Peter | 24-27 | Chrysostom | Search: newadvent.org 200158; ewtn.com. Paraphrased; "a preacher of the late 300s" as in the earlier notes |
| Not a teaching on modern taxes; 22:21; Romans 13:7; 1 Corinthians 9:19; 12:6 | 24-27 | BSB | BSB text; pastoral line |

Left out: 4Q159 and a once-in-a-lifetime half shekel (the fragment is broken
and its subject debated); m. Shekalim 1:4 on priests; Philo; Cicero, For
Flaccus; Cassius Dio; Suetonius; Nerva; the Edfu receipts; Origen, Cyril,
Leo the Great, Aquinas, Palamas, the hesychast councils, Callixtus III;
Raphael and Masaccio; Bultmann, Stein, Allison, Horbury, Cassidy, Strauss,
Temkin, Twelftree; the moon-phase belief beyond the word's root; the barbel
and the musht; the lectionaries; every textual note in the deep note except
17:21.

## The plain notes on Matthew 18 (2026-11-19)

`client/public/bible/notes/matthew/plain/18.json`. Eight searches for this
chapter, with the earlier ledger (Mark 9 and 10; Matthew 5, 6 and 16) and the
safety paragraph of `client/public/context/guides/matthew-18-20-in-context.json`.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Fourth of five discourses, closing at 19:1 | 1-5 | Matthew's book page | Repository text |
| Mark 9:33-34 against Matthew's direct question | 1-5 | BSB | BSB comparison |
| Children loved but without rank; pais for child and servant; "become like" as status, not sentiment | 1-5 | Earlier ledger (Mark 9, 10) | Earlier ledger |
| "Change" literally "turn" (strephō); tapeinoō and 11:29 | 1-5 | Greek text | Repository text |
| Skandalizō, skandalon a trap or obstacle; 17:27; "little ones" in 10:42 | 6-9 | Greek text; BSB | Repository text |
| Donkey millstone; Gehenna, Hinnom and child sacrifice (Jeremiah 7:31); Isaiah 66:24 | 6-9 | Earlier ledger (Mark 9) | Earlier ledger |
| "Cut it off" care paragraph, word for word from Mark 9 (and Matthew 5) | 6-9 | Mark 9:42-50 plain note | Repository text |
| Abuse: the passage stands with the child; abuse a crime, reported to the police and the proper authorities; contact police or child protection | 6-9 | CLAUDE.md, care for the reader; the context guide | Pastoral. No phone number given |
| "See the face" as access to a king; angels assigned to people; Acts 12:15; Psalm 91:11; Christians differ on an angel for each person | 10-14 | Deep note; BSB | BSB text. Tobit, Jerome, Aquinas, Clement X and the feast (deep note) not used |
| Luke 15:3-7 setting, "lost", "until he finds it" against Matthew's "goes astray", "if he finds it"; planaō in 24:4-5 | 10-14 | BSB; Greek text (G4105) | BSB comparison; script |
| 18:11 absent from Sinaiticus and Vaticanus; brought in from Luke 19:10; BSB leaves the number empty | 10-14 | Textual summaries | Search: biblehub.com; billmounce.com; openbible.com; confessionalbibliology.com (the opposing case). Metzger not named |
| Ezekiel 34:6, 16 | 10-14 | BSB | BSB text |
| Community Rule (1QS 5:24-6:1): correct a fellow in truth and humility; no charge before the Many without prior correction before witnesses | 15-17 | Dead Sea Scrolls | Search: intertextual.bible; palimpsest.stmarytx.edu; orion-bibliography.huji.ac.il (Akiyama 2017). Paraphrased; no column given in the note |
| Ekklēsia only 16:18 and 18:17 in the Gospels | 15-17 | Earlier ledger (Matthew 16) | Earlier ledger |
| Jesus and tax collectors: 9:9; 9:10-11; 11:19 | 15-17 | BSB | BSB text |
| Leviticus 19:17-18; Deuteronomy 19:15, 18; Galatians 6:1; 2 Corinthians 2:7; Romans 13:4 | 15-17 | BSB | BSB text |
| Safety paragraph, sentences word for word from the context guide ("Matthew 18 is not a rule that makes a harmed person meet...", "Nothing in it asks a child...", "The law behind the two or three witnesses...", "Abuse and other crimes are reported to the police...", "Forgiving from the heart is not the same as trusting again...", "If someone has harmed you, tell someone safe...", "You don't need anyone's permission to be safe.") | 15-17; 21-35 | matthew-18-20-in-context.json | Repository text |
| Church practice of 18:17 in general terms (Communion withheld for a time; elders; congregation; pastoral care), no side | 15-17 | Deep note | Stated generally; Calvin, the Belgic Confession, Schleitheim, Erastus, Beza, Benedict (deep note) not named or dated |
| Bind and loose: forbid and permit; given to the disciples together | 18-20 | Earlier ledger (Matthew 16) | Earlier ledger |
| Mishnah Avot 3:2, Rabbi Hananiah ben Teradion: when two sit and words of Torah pass between them, the Shekhinah rests among them (written down around 200; later) | 18-20 | Mishnah | Search: mishnah.org Avos 3:2; sefaria.org; docs.lib.purdue.edu (Sievers, Claritas 2017). Paraphrased; editions number it 3:2, 3:3 or 3:6 |
| 1:23; 28:20; 26:39 | 18-20 | BSB | BSB text |
| b. Yoma 86b, Rabbi Yose bar Judah: forgiven a first, second and third time, not a fourth (written down several centuries later) | 21-35 | Babylonian Talmud | Search: sefaria.org sheets; encyclopedia.com "Repentance"; jewishvirtuallibrary.org. Paraphrased; the rabbi not named in the note |
| Hebdomēkontakis hepta: seventy-seven or seventy times seven; the same Greek in the Greek Old Testament of Genesis 4:24 | 21-35 | Lexicons (G1441); LXX | Search: blueletterbible.org G1441 (LXX); biblehub.com 1441; engediresourcecenter.com. Carson's remark not attributed |
| A talent about six thousand denarii; ten thousand talents sixty million; a denarius a day's wage (20:2); a hundred denarii about a hundred days | 21-35 | Bible dictionaries; earlier ledger | Search: biblehub.com "Ten Thousand Talents"; en.wikipedia.org "Parable of the Unforgiving Servant"; kjvstudy.org. "Largest Greek number word" (deep note) not used |
| Josephus, Antiquities 17.318: Galilee and Perea paid Antipas two hundred talents a year | 21-35 | Josephus | Search: lexundria.com 17.318 (Whiston); Jewish War 2.95 the same. Paraphrased |
| Esther 3:9; 2 Kings 4:1; Leviticus 25:39-40; Genesis 4:24; Luke 17:3 | 21-35 | BSB | BSB text |
| "Many readers think" the king's orders sound like foreign courts | 21-35 | Deep note (Jeremias) | Stated as a view; Jeremias not named |
| Matthew 6 wording on the misuse of forgiveness, word for word ("this prayer" made "this parable"); verse 35 not the price but the sign (the Matthew 6 note); the traditions on losing grace stated without names | 21-35 | Matthew 6:9-15 plain note | Repository text |

Left out: the "against you" variant in 18:15 (not checked on this run);
Tobit; m. Berakhot 5:5; m. Megillah 4:3; Suetonius on drowning; Maimonides;
Antiquities 14.78; the talent's weight; m. Sotah 3:8; Jeremias; Luther's The
Keys and Large Catechism; Calvin; the Belgic and Schleitheim confessions;
Erastus and Beza; Benedict's Rule; Bonhoeffer; Jones, Volf, Langberg;
Wiesenthal; Dura-Europos; Clephane and Sankey; the lectionaries.

## The plain notes on Matthew 19 (2026-11-19)

`client/public/bible/notes/matthew/plain/19.json`. Eight searches for this
chapter, with the earlier ledger (Mark 10; Matthew 5).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Perea under Antipas; John killed over his marriage | 1-9 | Earlier ledger (Mark 10) | Earlier ledger |
| Shammai, Hillel, Akiva on Deuteronomy 24:1 (Mishnah Gittin 9:10, written down around 200; Akiva "a later teacher") | 1-9 | Earlier ledger (Mark 10) | Earlier ledger |
| Josephus, Antiquities 4.253: a man may divorce his wife "for any cause whatsoever" | 1-9 | Josephus (Whiston) | Search: lexundria.com 4.253; readingacts.com; posenlibrary.com "Divorce in Early Judaism". Quoted in single quotes as Whiston's words |
| "For any reason" as the name of Hillel's easy divorce (Instone-Brewer), and the reply that Jesus' answer reaches further | 1-9 | Instone-Brewer; critics | Search: psephizo.com; gospeltranslations.org; totheendsblog.blogspot.com. Stated as two views, unnamed |
| Only the husband could divorce in Jewish law | 1-9 | Earlier ledger (Mark 10) | Earlier ledger |
| Mark's order (Jesus asks what Moses commanded) against Matthew's ("ordered" and "permitted") | 1-9 | Mark 10:3-5; Matthew 19:7-8 | BSB comparison |
| Genesis 1:27; 2:24; Deuteronomy 24:1-4; Malachi 2:16; Ezekiel 36:26 | 1-9 | BSB | BSB text |
| Catholic, Orthodox, Protestant readings, kinship and betrothal readings, "These notes do not decide" | 1-9 | Matthew 5:31-32 plain note, word for word ("here and in 19:9" made "here and in 5:32") | Repository text |
| "What all of them share" (Mark 10 wording, last sentence adapted to Matthew) and the safety paragraph word for word ("Nothing in this passage asks anyone to stay where they or their children are in danger...") | 1-9 | Mark 10 and Matthew 5 plain notes | Repository text |
| Eunuchs born so, made so (slaves, court servants); Acts 8:27; Jesus, John and Paul unmarried; 1 Corinthians 7:7 | 10-12 | BSB; deep note | BSB text |
| Justin Martyr, First Apology 29: a young Christian in Alexandria petitioned the governor Felix for leave to be castrated; refused (Felix prefect 149-154, so "in the 150s") | 10-12 | Justin | Search: logoslibrary.org 29; st-takla.org (ANF); en.wikipedia.org Lucius Munatius Felix. Paraphrased |
| Nicaea (325), canon 1: a man who castrated himself not admitted to the clergy | 10-12 | Canons of Nicaea | Search: newadvent.org 3801; ewtn.com; fourthcentury.com. Paraphrased |
| Deuteronomy 23:1; Isaiah 56:3, 5; Jeremiah 16:2 | 10-12 | BSB | BSB text |
| Two readings of "this word" (verse 11) | 10-12 | Deep note | Stated as views; Dupont and Quesnell not named |
| Latin Church priests normally celibate "for the sake of the kingdom of heaven" (Catechism 1579); Eastern bishops from the celibate, married men ordained priests (Catechism 1580; Orthodox practice) | 10-12 | Catechism of the Catholic Church | Search: vatican.va 1579-1580; usccb.org. Single-quoted as the Catechism's phrase |
| Augsburg Confession (1530), article 23, cites Matthew 19:11 against compulsory clerical celibacy | 10-12 | Augsburg Confession | Search: bookofconcord.cph.org; projectwittenberg.org. Calvin and Aquinas not named |
| Care for single readers: no assumptions; singleness honoured | 10-12 | CLAUDE.md, care for the reader | Pastoral |
| Mark's indignation and "receive like a child" left out by Matthew; 18:3; Genesis 48:14 | 13-15 | BSB | BSB comparison |
| "Good Teacher" (Mark, Luke) against "what good thing" (Matthew); later copies of Matthew harmonized to Mark; Sinaiticus and Vaticanus have the BSB wording | 16-22 | Textual summaries | Search: openbible.com on 19:17; catholic.com; confessionalbibliology.com (the opposing case). Metzger not named |
| Only Matthew: "young", "love your neighbor as yourself", teleios as in 5:48; 22:39-40 | 16-22 | BSB | BSB comparison |
| Clement of Alexandria; Antony (Athanasius) | 16-22 | Earlier ledger (Mark 10), word for word | Earlier ledger |
| The "counsel for a few" reading and its answer, unnamed; no contempt for the wealthy (1 Timothy 6:18; Mark 10:21); no prosperity reading | 16-22 | Deep note; BSB | Stated as views; pastoral |
| Camel and needle, Talmud's elephant, no gate | 23-26 | Earlier ledger (Mark 10) | Earlier ledger |
| A later reading of "camel" as a Greek word for rope; the oldest copies read "camel" | 23-26 | Textual and lexical summaries | Search: en.wikipedia.org "Eye of a needle"; christiantoday.com. Cyril not named: the sources disagree on what he argued |
| "Kingdom of God" at 19:24 against Matthew's usual "kingdom of heaven" | 23-26 | BSB | BSB text |
| Genesis 18:14 | 23-26 | BSB | BSB text |
| Twelve thrones only in Matthew here; Luke 22:30; Ezekiel 37:21-22; Psalms of Solomon (first century BC) pray for a son of David to rule | 27-30 | BSB; earlier ledger (Mark 8) | BSB text; earlier ledger. Psalms of Solomon 17:26 wording (deep note) not used |
| Palingenesia only here and Titus 3:5 | 27-30 | Greek text (G3824) | Repository text. Philo and Josephus (deep note) not used |
| Mark 10:30 "along with persecutions"; 10:16-39; Daniel 7:9, 13-14; Deuteronomy 4:1; 2 Corinthians 8:9; 20:16 | 27-30 | BSB | BSB text |
| Hundredfold not a prosperity promise (the Mark 10 wording) | 27-30 | Mark 10 plain note | Repository text |

Left out: Philo, Special Laws 3.30; Josephus's own divorce; the Temple
Scroll; m. Yevamot 14:1 and 8:4; b. Gittin 90b; the ketubbah; the age of
brides; Wisdom 3:14; Josephus and Philo on the Essenes and Therapeutae;
Origen and Eusebius; Hester; Meier; Fitzmyer by name; Hermas, Augustine,
Trent, Erasmus, Luther, Westminster, Amoris Laetitia, Heth and Wenham, Piper
by name; Augustine and Ambrose on "good"; Stonehouse; Davies and Allison;
Cyril of Alexandria; Tobit and Sirach on treasure; Francis of Assisi;
Hofmann; the 722 BC date (said "long before"); the textual notes on 19:4, 9,
20, 29.

## The plain notes on Matthew 20 (2026-11-19)

`client/public/bible/notes/matthew/plain/20.json`. Eight searches for this
chapter, with the earlier ledger (Mark 10; the evil-eye idiom from the
Matthew 6 run) and the honor-and-shame portrait
(`client/public/context/worlds/honor-and-shame.json`, read only).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The parable answers 19:27 and is framed by 19:30 and 20:16; found only in Matthew | 1-7 | BSB | BSB text |
| Day labourers hired in the market; harvest | 1-7 | Deep note; the text itself (20:3) | General; "lost their farms through debt" (deep note) cut |
| A denarius a day's wage | 1-7 | Earlier ledger (Mark 6; 20:2) | Earlier ledger |
| Tacitus, Annals 1.17: in AD 14 soldiers paid ten asses a day mutinied and demanded a denarius a day | 1-7 | Tacitus | Search: penelope.uchicago.edu (Annals 1); ancientromanhistory31-14.com; cambridge.org (Speidel). Paraphrased. The deep note's "legions on the Rhine" corrected: the speech is in the Pannonian mutiny, and the note names no army |
| Hours counted from sunrise (third about nine, eleventh about five) | 1-7 | Standard reckoning | General knowledge, stated as "about" |
| Isaiah 5:7; Deuteronomy 24:15 | 1-7 | BSB | BSB text |
| Hetaire ("Friend") only 20:13, 22:12, 26:50 | 8-16 | Greek text (G2083) | Script |
| Evil eye: literally "Is your eye evil because I am good?"; envy and grudging; good eye generous; the portrait's sentences on the workers ("The workers hired at dawn received exactly what they agreed to... The parable asks the hearer to see generosity without counting it as theft.") kept word for word | 8-16 | honor-and-shame.json, Matthew 20:15 note; Greek text (ophthalmos ponēros, agathos) | Repository text; script |
| Mishnah Avot 2:9: Rabbi Eliezer's answer "a good eye" (written down around 200) | 8-16 | Mishnah | Search: mishnah.org; sefaria.org; posenlibrary.com. Paraphrased; numbering differs by edition |
| Deuteronomy 15:9: to look begrudgingly is, in Hebrew, an evil eye | 8-16 | Earlier ledger (Matthew 6: biola.edu; biblicaltraining.org) | Earlier ledger; BSB text |
| Jerusalem Talmud, Berakhot 2:8: a king paid a worker hired late a full wage because he did more in two hours (put together several centuries after Jesus) | 8-16 | y. Berakhot 2:8 | Search: intertextual.bible; sefaria.org; sacred-texts.com (Collins 1910). Paraphrased; Rabbi Bun and Rabbi Zeira not named |
| Jonah 4:2 | 8-16 | BSB | BSB text |
| Readings: Jesus' welcome of sinners; Matthew's setting after 19:27; non-Jews; a harsh owner (unnamed) | 8-16 | Deep note | Stated as views; Jeremias and Herzog not named |
| Gregory the Great, Homily 19 on the Gospels (591): the hours as ages of the world and stages of a life | 8-16 | Gregory | Search: historicalchristianfaith.github.io; lectionarycentral.com; vaticannews.va. Paraphrased |
| Amy-Jill Levine, Short Stories by Jesus: an owner who hires all who need work and pays a living wage | 8-16 | Levine | Search: americamagazine.org review; christiancentury.org review; patheos.com. No year given |
| Third prediction the only one in Matthew naming crucifixion; Mark 10:34 "kill"; fulfilment in 26:47-50, 26:66, 27:2, 27:26, 27:29 | 17-19 | BSB | BSB comparison |
| Isaiah 50:6; Hosea 6:2 | 17-19 | BSB | BSB text |
| Mother asks in Matthew, sons in Mark; Jesus answers the sons; kneeling | 20-28 | Mark 10:35; BSB | BSB comparison |
| The mother at the cross (27:56); robbers on the right and left (27:38); James killed (Acts 12:2) | 20-28 | BSB | BSB text |
| Ransom as the price of release; Exodus 21:30; Daniel 7:14; Isaiah 51:17; Psalm 75:8; Isaiah 53:12 | 20-28 | Earlier ledger (Mark 10) | Earlier ledger; BSB |
| The views of the ransom, word for word from the Mark 10 note ("Mark puts first" made "Matthew puts first") | 20-28 | Mark 10:35-45 plain note | Repository text |
| Care: service is never a duty to stay under mistreatment | 20-28 | CLAUDE.md, care for the reader | Pastoral |
| Matthew's additions: compassion and touch; no name or cloak; the same question to the mother and the blind men | 29-34 | Mark 10:46-52; BSB | BSB comparison |
| Isaiah 35:5; 2 Samuel 7:13; Luke 18:35; 8:28; 9:27-31; Deuteronomy 19:15 | 29-34 | BSB | BSB text |
| Augustine, Harmony of the Gospels 2.65: two men; Mark names the better known | 29-34 | Augustine | Search: bkv.unifr.ch (NPNF); newadvent.org 1602265; biblehub.com. Paraphrased |
| Two Jerichos: the old ruined city and Herod's newer town nearby | 29-34 | Bible dictionaries | Search: biblicaltraining.org; catholic.com; Easton's. Distance and direction not given (the sources disagree) |
| Doubling as Matthew's way; two witnesses; ancient writers shortening details | 29-34 | Deep note | Stated as views; Gundry, Keener, Licona not named |

Left out: Josephus on the Samaria route; Netzer and Herod's winter palaces;
Herod's death at Jericho; the height of Jericho; m. Bava Metzia 9:11-12;
John's later life (Irenaeus, Philip of Side, George the Monk); Salome and
Jesus' cousins; Archelaus; Solomon the healer; Irenaeus and Chrysostom on the
parable; Bach, Ruskin, Gandhi, Rembrandt, Poussin; Origen, Gregory of
Nazianzus, Anselm, Aulén by name; the lectionaries; Avot 5:13; every textual
note in the deep note (20:16's "many be called, but few chosen" was checked
and is absent from Sinaiticus and Vaticanus, but the note does not need it).

## The plain notes on Matthew 21 (2026-11-19)

`client/public/bible/notes/matthew/plain/21.json`. Five searches for this
chapter, with the earlier ledger (Mark 11 and 12; Mark 15 for Nostra Aetate;
Matthew's book page for the formula quotations).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Bethany, cloaks for a king, branches, Hosanna "Save us, please" | 1-11 | Earlier ledger (Mark 11) | Earlier ledger |
| About ten formula quotations, 21:4 among them | 1-11 | Earlier ledger (Matthew's book page) | Earlier ledger |
| Isaiah 62:11 and Zechariah 9:9-10 joined; "righteous and victorious" left out; 11:29; Psalm 118:26; 20:30 | 1-11 | BSB | BSB text |
| Mishnah Sukkah 3:9 (written down around 200): the lulav shaken at Psalm 118:25 at Tabernacles | 1-11 | Mishnah | Search: mishnah.org; posenlibrary.com "The Mishnah on the Four Species"; steinsaltz.org Sukkah 37. Paraphrased; the schools of Hillel and Shammai not named |
| The verb for "stirred" (seiō, G4579) also at 27:51 and 28:4 | 1-11 | Greek word lists in the repository's verse notes | Repository |
| Two animals: the parallelism objection; a Jewish reading of each phrase; the colt with its mother (Mark 11:2); "on them" as the cloaks | 1-11 | Deep note; Instone-Brewer, Tyndale Bulletin 54.1 (2003), and Coppins, Tyndale Bulletin 63.2 (2012), on the question | Search: galaxie.com and tyndalebulletin.org listings. Neither scholar named on the site (Instone-Brewer's conclusion was not read); views unnamed |
| Justin Martyr, Dialogue with Trypho 53: the harnessed donkey the Jewish people under the law, the unharnessed colt the Gentiles, both to believe | 1-11 | Justin | Search: logoslibrary.org Trypho 53; bkv.unifr.ch (ANF and BKV). Paraphrased; "mid-second century" given as "the second century" |
| Money changers, the temple coin, doves (Leviticus 5:7) | 12-17 | Earlier ledger (Mark 11) | Earlier ledger |
| Mark: looks around, returns next day; Matthew: same day, no "for all the nations" | 12-17 | BSB comparison | BSB text |
| 2 Samuel 5:8 ("palace" in the BSB); Leviticus 21:18; Psalm 8:2; Isaiah 56:7; Jeremiah 7:11; Malachi 3:1 | 12-17 | BSB | BSB text. The Temple Scroll on the blind (deep note) not used |
| Readings of the temple action; John 2 timing | 12-17 | Earlier ledger (Mark 11) | Earlier ledger, wording reused |
| Fig leaves in spring; the disagreement about early figs; Hosea 9:10; Jeremiah 8:13; Micah 7:1; Jeremiah 19 | 18-22 | Earlier ledger (Mark 11) | Earlier ledger |
| The old reading against the Jewish people rejected; the prayer promise and unanswered prayer | 18-22 | Mark 11 plain note | Wording reused; 6:10 and 26:39 in place of Mark's verses |
| Matthew 3:8; 7:16-20; Luke 13:6-9 | 18-22 | BSB | BSB text |
| By what authority (Mark 11 wording); Malachi 3:1; Isaiah 40:3; 3:3; 11:14 | 23-27 | Earlier ledger; BSB | BSB text |
| Two sons only in Matthew; tax collectors baptized by John (Luke 3:12; 7:29-30); proagō "go ahead of" | 28-32 | BSB; Greek | BSB text; the Greek sense is standard lexicon meaning |
| Three manuscript forms of the parable | 28-32 | Repository chapter note (`text`) | Repository. Manuscripts not named on the site |
| Ezekiel 18:27; 33:32 | 28-32 | BSB | BSB text |
| Tenancy and Isaiah 5 (Mark 12 wording); Isaiah 5:1-2, 4, 7; Psalm 118:22-23; Isaiah 8:15; Daniel 2:34, 44; 2 Samuel 12:7; Hebrews 13:12; Luke 20:18 | 33-46 | Earlier ledger; BSB | BSB text |
| Matthew's order (thrown out, then killed); the leaders pass sentence; 21:43 and 21:45 only in Matthew | 33-46 | BSB comparison with Mark 12 | BSB text |
| Verse 44 missing from some manuscripts; like Luke 20:18; most Bibles print it | 33-46 | Repository chapter note (`text`) | Repository |
| Supersessionism or "replacement" theology: the view that the church has replaced Israel in God's purposes | 33-46 | Standard definition | Search: wikipedia "Supersession"; biblehub.com "What is replacement theology?". Soulen's three forms (deep note) not used |
| Readings of the "people": the Twelve as new leaders (19:28); a renewed Israel; the church | 33-46 | Deep note (Saldarini 1994; Olmstead 2003) | Stated as views without names (not checked this run) |
| Views of Israel and the church (one people grafted in, many expecting Romans 11:26; Israel and church distinct; the covenant still standing) | 33-46 | Standard positions | Stated as views, no names; John Paul II's "never revoked" (Mainz 1980) not used: not checked |
| Nostra Aetate 4 (1965): "the Jews should not be presented as rejected or accursed by God, as if this followed from the Holy Scriptures" | 33-46 | Second Vatican Council | Search: christianunity.va Nostra Aetate 4; cbcew.org.uk PDF; newadvent.org. Quoted in single quotes as a translation; one translation reads "repudiated or cursed" |
| Romans 11:1, 18, 26, 29 | 33-46 | BSB | BSB text |

Left out: the year of the entry (30 or 33); Pilate and Caiaphas's dates;
the Royal Stoa; m. Bekhorot 8:7; b. Pesachim 57a; Jesus son of Ananias; the
Temple Scroll on the blind; the Zenon papyri and Hengel; the Targum, the
Tosefta and 4Q500 on the tower; b. Berakhot 64a; b. Sanhedrin 98a; Egeria,
the lectionaries, Bach, Giotto, Duccio, Cranach, Ecclesia and Synagoga;
Chrysostom, Irenaeus, Telford, Sanders, Ruether, Soulen, Saldarini, Olmstead
and Snodgrass by name; the Gospel of Thomas; the Psalm 8 Greek wording.

## The plain notes on Matthew 22 (2026-11-19)

`client/public/bible/notes/matthew/plain/22.json`. Four searches for this
chapter, with the earlier ledger (Mark 12; Matthew 20 for "Friend").

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Luke's great dinner (Luke 14:15-24); 8:11; 21:31; 21:34-36 | 1-10 | BSB | BSB text |
| The two-step invitation read from the story itself (invited, then called) | 1-10 | Matthew 22:3-4 | BSB text. A general claim about ancient invitation customs was cut (not checked) |
| Isaiah 25:6; Hosea 2:19; Zephaniah 1:7; Isaiah 5:24 | 1-10 | BSB | BSB text |
| 22:7 and AD 70: many read it after the war and count it toward a date after 70; others call it stock language for punishing a rebel city; some trace it to Isaiah 5:24-25 | 1-10 | Earlier ledger (Matthew's book page: 22:7 as evidence); commentary survey | Search: jimmyakin.com "Was Matthew Written AFTER A.D. 70?"; biblehub.com commentaries 22:7; catholic.com. No scholar named (Gundry, Brown, Rengstorf not named; Rengstorf not found) |
| "Friend" only at 20:13, 22:12, 26:50 | 11-14 | Earlier ledger (Matthew 20) | Earlier ledger |
| Wedding clothes read by many as clean clothes, one's best | 11-14 | Commentaries | Search: biblegateway.com IVP NT Commentary on 22:11-14; openbible.com commentaries 22:11. Stated as "many readers take" |
| Host-supplied garments: no clear evidence; 2 Kings 10:22 weak | 11-14 | Commentaries | Same search (openbible.com: "not very convincing"; friarmusings.com). Stated as "should be held loosely" |
| b. Shabbat 153a: Yohanan ben Zakkai's parable of the king's banquet with no time set; the dressed servants eat; Ecclesiastes 9:8 | 11-14 | Babylonian Talmud | Search: intertextual.bible (Matthew 22:2 and Shabbat 153a); virtualreligion.net/iho/parable.html; jerusalemperspective.com. Paraphrased, marked as several centuries after Jesus |
| 8:12; 25:30; 7:21; Isaiah 61:10; Ecclesiastes 9:8; Galatians 3:27; Revelation 19:8 | 11-14 | BSB | BSB text |
| Readings of the garment (righteousness given; a changed life; both) and of "chosen" | 11-14 | Deep note; standard positions | Stated as views, no names (Irenaeus, Augustine, Gregory, Calvin not named) |
| 4 Ezra 8:3: many created, few saved; written near the end of the first century | 11-14 | 4 Ezra (2 Esdras) | Search: biblia.com RSV 2 Esdras 8; fortresspress.com introduction (Domitian, 81-96); israelbiblecenter.com. Paraphrased; dated "from the end of the first century" |
| Pharisees, Herodians, AD 6 census, Judas the Galilean, Acts 5:37, the Tiberius denarius, three readings of "Give to Caesar" | 15-22 | Earlier ledger (Mark 12) | Earlier ledger; Mark 12 wording reused |
| apodote "give back" as of a debt; Romans 13:7; Acts 5:29; Genesis 1:27 | 15-22 | Greek; BSB | Standard lexicon sense; BSB text |
| Sadducees (Josephus, Antiquities 18.16; Acts 5:17; 23:8); 2 Maccabees 7 | 23-33 | Earlier ledger (Mark 12) | Earlier ledger |
| Deuteronomy 25:5-6; Daniel 12:2; Exodus 3:6; Luke 20:36; 1 Corinthians 7:39 | 23-33 | BSB | BSB text |
| Readings of marriage at the resurrection (Mark 12 wording); care for the remarried | 23-33 | Mark 12 plain note; pastoral | Repository text |
| The Shema, Mishnah Berakhot 1:1, Hillel (b. Shabbat 31a), Akiva | 34-40 | Earlier ledger (Mark 12) | Earlier ledger |
| Deuteronomy 6:4-5, 7; Leviticus 19:18; Matthew 7:12 | 34-40 | BSB | BSB text |
| Psalm 110:1; 2 Samuel 7:13; 1:1; 9:27; 15:22; 21:9; Romans 1:3-4; views of Psalm 110's authorship | 41-46 | Earlier ledger (Mark 12); BSB | BSB text; Mark 12 wording reused |

Left out: Amy-Jill Levine on this parable; Calvinist and Arminian names;
Irenaeus, Augustine, Gregory and Calvin on the garment; Jehu's vestments as
evidence; Ecclesiastes Rabbah; Brandon, Horsley, Justin, Tertullian, the
Barmen Declaration, Luther's two kingdoms and Calvin's Institutes on taxes;
the Greek Old Testament's "mind" in Deuteronomy 6:5; every textual note.

## The plain notes on Matthew 23 (2026-11-19)

`client/public/bible/notes/matthew/plain/23.json`. Five searches for this
chapter, with the earlier ledger (Matthew's book page on the woes and
Weinfeld; Mark 12 on the Pharisees; Mark 15 on Nostra Aetate; Mark 6 on the
tassels), the Pharisees guide (`client/public/context/guides/pharisees-sadducees-essenes.json`)
and the Jewish life portrait (`client/public/context/worlds/jewish-life-in-jesus-day.json`),
both read only. The guide is in a first-person voice, so only its checked
facts were used, never its sentences.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Moses' seat the place from which the law was taught; Jesus tells hearers to keep the teaching | 1-12 | Jewish life portrait (Matthew 23:2-3 note); book page | Repository |
| Phylacteries: small leather boxes of Scripture on arm and forehead (Deuteronomy 6:8); tassels (Numbers 15:38-39); kraspedon at 9:20 and 23:5 | 1-12 | BSB; earlier ledger (Mark 6) | BSB text; earlier ledger. Qumran finds not mentioned |
| "Rabbi" a respectful address, "my great one" | 1-12 | Deep note; standard lexicons | Standard meaning; its later use as a formal title not mentioned |
| Readings of 23:2-3; 15:3-6 | 1-12 | Book page; standard positions | Stated as views |
| "Father" for priests (Catholic, Orthodox); 1 Corinthians 4:15; many Protestants avoid such titles | 1-12 | BSB; common practice | BSB text; general |
| Malachi 2:7-8; Deuteronomy 6:8; Numbers 15:39 | 1-12 | BSB | BSB text |
| Verse 14 missing from the oldest manuscripts; matches Mark 12:40 and Luke 20:47; seven woes without it | 13-15 | Repository chapter note (`text`) | Repository |
| Hypocrite first a Greek word for a stage actor | 13-15 | Standard lexicons (hupokritēs) | Standard meaning |
| Pharisees: mostly lay people; most popular group with influence over ordinary people (Josephus, Antiquities 18.15); belief in resurrection; Luke 13:31; Nicodemus (John 3:1); Gamaliel (Acts 5:34); Paul (Philippians 3:5) | 13-15 | Jewish life portrait; Pharisees guide; earlier ledger (Mark 12, Antiquities 18.15-17); BSB | Repository; earlier ledger; BSB text |
| "Pharisee" came to mean hypocrite only in later Christian speech | 13-15 | Jewish life portrait | Repository (paraphrased) |
| Later Jewish teachers spoke in much the same way about teachers who do not practise what they preach | 13-15 | Weinfeld, Bible Review 13.5 (1997) | Earlier ledger (Matthew's book page). Weinfeld not named here |
| b. Sotah 22b: seven kinds of Pharisee, six counted false; only the one who serves from love praised; King Yannai to his wife: fear not the Pharisees but the hypocrites who imitate them | 13-15 | Babylonian Talmud | Search: halakhah.com Sotah 22 (Soncino); magazine.israelbiblecenter.com "The Seven Types of Pharisees"; steinsaltz.org Sota 22. Paraphrased, marked as several centuries after Jesus; Yannai not named |
| Whether Jews sought converts debated; the verse may mean winning to the Pharisees' way | 13-15 | Deep note; scholarship | Stated as debate, no names |
| Isaiah's six woes (5:8, 11, 18, 20, 21, 22); Amos 6:1; Ezekiel 34:2; Jeremiah 23:1 | 13-15 | BSB | BSB text |
| Harsh polemic between ancient schools a convention; how much reflects Matthew's quarrel after 70 debated | 13-15 | Deep note (L. T. Johnson, JBL 1989; Garland 1979) | Stated as what "some scholars note" and "scholars differ"; no names (not checked this run) |
| 1 Peter 4:17; James 3:1 | 13-15 | BSB | BSB text |
| Oaths: Matthew 5:34, 37; Deuteronomy 23:21; Exodus 20:7 | 16-22 | BSB | BSB text. m. Shevuot 4:13 and Philo not used |
| Tithes of herbs read from the verse; Micah 6:8; Hosea 6:6 (9:13; 12:7); Leviticus 11:4, 41; Numbers 19:16; Ezekiel 13:10 | 23-28 | BSB | BSB text. m. Demai and m. Maaserot not used; the gnat-camel Aramaic wordplay not used; straining wine through cloth narrowed to "straining a drink" |
| Mishnah Shekalim 1:1 (written down around 200): graves marked on 15 Adar | 23-28 | Mishnah | Search: jtsa.edu Shekalim 1:1; jewishvirtuallibrary.org Shekalim 1; mishnah.org. Lime and whitewash not claimed from the Mishnah; the white tomb given as Jesus' picture |
| "Sons" as following the same path; 3:7 | 29-36 | BSB | BSB text |
| Abel (Genesis 4:10); Zechariah son of Jehoiada stoned in the temple court (2 Chronicles 24:20-22); Zechariah son of Berechiah the prophet (Zechariah 1:1); Luke 11:51 | 29-36 | BSB | BSB text |
| Chronicles last in the usual Hebrew order, so Abel to Zechariah is first to last; whether the order was fixed then is debated | 29-36 | Commentaries; McDonald and Gallagher on the debate | Search: blueletterbible.org (Stewart); biblestudytools.com CSB apologetics on 23:35; cambridge.org NTS "Blood from Abel to Zechariah". The debate stated; no names |
| Jerome, Commentary on Matthew (around 398): the Gospel used by the Nazarenes read "son of Joiada" | 29-36 | Jerome on 23:35 | Search: turretinfan.blogspot.com (translation); openbible.com commentaries 23:35; biblestudytools.com Gill. Paraphrased; the year from the earlier ledger (Jerome 398) |
| "Son of Berechiah" missing from the first hand of one major manuscript (Sinaiticus) | 29-36 | Repository chapter note (`text`) | Repository; manuscript not named on the site |
| Josephus, Jewish War 4.343: Zacharias son of Baris (Baruch) killed by Zealots "in the middle of the temple"; most reject the identification | 29-36 | Josephus | Search: lexundria.com j_bj 4.343 and 4.335 (Whiston); josephus.org. No year given on the site ("during the war with Rome") |
| Guilt not inherited: Deuteronomy 24:16; Ezekiel 18:20 | 29-36 | BSB | BSB text |
| The "Christ-killers" paragraph and Nostra Aetate 4 ("cannot be charged against all the Jews, without distinction, then alive, nor against the Jews of today"); Acts 4:27 | 29-36 | Mark 15 plain note; earlier ledger (Mark 15) | Wording reused word for word |
| "This generation" the people alive then; many link the judgment to AD 70 (24:2) | 29-36 | BSB; earlier ledger (Mark 13) | Stated as what many readers think |
| Luke 19:41; Ruth 2:12; Psalm 91:4; Jeremiah 22:5; 12:7; 9:1; Psalm 118:26; Romans 9:2 | 37-39 | BSB | BSB text |
| Readings of 23:39 (hope of welcome; warning of judgment; both) | 37-39 | Standard positions | Stated as views |

Left out: the Mishnah on Shemaiah, Hillel and Shammai as "fathers"; m. Shevuot
and Philo on oaths; m. Demai, m. Maaserot, m. Kelim, m. Berakhot 8:2,
m. Maaser Sheni 5:1; Neusner (1976); the Kidron tombs, Herod's monument at
David's tomb, the Lives of the Prophets and Jeremias; the Targum of
Lamentations 2:20 and b. Gittin 57b; Origen and the Protevangelium of James on
Zechariah the father of John; Montefiore, Chrysostom, Luther, Jules Isaac,
L. T. Johnson, Garland by name; the Aramaic gnat-camel wordplay; m. Sotah 3:4.

## The plain notes on Matthew 24 (2026-11-19)

`client/public/bible/notes/matthew/plain/24.json`. Four searches for this
chapter, with the earlier ledger (Mark 13, whose wording is reused where the
passages match) and the Jewish life portrait (bread and the hand mill).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Herod's rebuilding from about 20 or 19 BC; Josephus's snow-covered mountain; AD 70 and Titus | 1-3 | Earlier ledger (Mark 13) | Earlier ledger |
| Parousia: presence, arrival, used of the official visit of a king or emperor; among the Gospels only in Matthew 24:3, 27, 37, 39 | 1-3 | Abbott-Smith lexicon in the repository (citing Deissmann, LAE); Deissmann, Light from the Ancient East | Repository (lex G3952 occurrences); search: en.wikipedia.org Second Coming and Parousia; bsw.org Biblica 80 (1999). Deissmann not named |
| Micah 3:12; Jeremiah 7:4 | 1-3 | BSB | BSB text |
| Three readings of the chapter; before or after 70 | 1-3 | Earlier ledger (Mark 13) | Stated as views |
| Theudas (Antiquities 20.97-98; Acts 5:36) | 4-14 | Earlier ledger (Mark 13) | Earlier ledger |
| 10:5-6; 28:19; Isaiah 26:17; Micah 7:6 | 4-14 | BSB | BSB text |
| Antiochus IV and 1 Maccabees 1:54; Caligula, AD 40 and January 41; Eusebius on Pella (Church History 3.5.3) | 15-28 | Earlier ledger (Mark 13) | Earlier ledger |
| Matthew names Daniel and "the holy place", adds the Sabbath; Exodus 16:29 | 15-28 | BSB comparison; BSB | BSB text. The claim about city gates on the Sabbath was cut (not checked) |
| Lightning saying not in Mark; in Luke 17:24 | 15-28 | BSB comparison | BSB text |
| aetos "eagles" or "vultures"; the Roman eagle standards reading; a proverb; Job 39:30 | 15-28 | Commentaries (Carter, JBL 2003, as cited) | Search: postmillennialworldview.com "Eagles or Vultures?"; jerusalemperspective.com "Carrion Birds"; biblehub.com topical. No scholar named |
| Daniel 9:27, 11:31, 12:1, 12:11; Luke 21:20; 2 Thessalonians 2:3-4; three readings of the abomination | 15-28 | Earlier ledger (Mark 13); BSB | Mark 13 wording reused |
| Isaiah 13:10; Daniel 7:13-14; Zechariah 12:10; Isaiah 27:13; Deuteronomy 30:4; Numbers 10:10 | 29-31 | BSB | BSB text |
| The sign of the Son of Man: the Son of Man himself (many); the cross (Chrysostom, Homily 76 on Matthew) | 29-31 | Chrysostom; commentaries | Search: lectionarycentral.com Chrysostom; catenabible.com 24:30; biblehub.com. Paraphrased. Irenaeus's "light of the Father" not used; the "banner" reading cut (not checked) |
| Readings of 24:29-31 (Mark 13 wording, verse numbers changed) | 29-31 | Mark 13 plain note | Repository |
| Fig tree bare in winter; genea; 23:36; 21:19; Isaiah 40:8; C. S. Lewis, "the most embarrassing verse in the Bible"; three readings of "this generation" | 32-35 | Earlier ledger (Mark 13) | Earlier ledger; Mark 13 wording reused with Matthew's verse numbers |
| Luke 17:26-37; 1 Thessalonians 5:2; Genesis 6:5; 7:23 | 36-44 | BSB | BSB text |
| Two women grinding at a hand mill; bread at least half of the ordinary diet | 36-44 | Jewish life portrait (Weingarten, BAR 2019) | Repository |
| Arius, Athanasius, Chalcedon 451; Luke 2:52; no date-setting (Mark 13 wording); Acts 1:7 | 36-44 | Earlier ledger (Mark 13); BSB | Earlier ledger; BSB text |
| "Nor the Son" absent from later copies, present in the oldest and in Mark 13:32 | 36-44 | Repository chapter note (`text`) | Repository |
| Rapture from the Latin (rapiemur, "we will be caught up") of 1 Thessalonians 4:17 (harpazō) | 36-44 | Vulgate; lexicons | Search: en.wikipedia.org Rapture; julianspriggs.co.uk; biblehub.com. Given as "the Latin for ‘caught up’" |
| Taken as rapture or as judgment (by analogy with the flood; Luke 17:37) | 36-44 | Deep note; standard positions | Stated as views; Darby, Scofield, Lindsey, Left Behind, Walvoord not named; no scheme or millennium position |
| Luke 12:42-46; Ezekiel 34:2; Isaiah 62:6; "cut him to pieces" read as punishment or as being cut off | 45-51 | BSB; deep note | BSB text; stated as views |

Left out: Reimarus, Schweitzer, Russell, J. S. Russell, Sproul, Wright,
France by name; Darby, Scofield, Lindsey, A Thief in the Night, Left Behind,
Hart, Walvoord, Ladd; Irenaeus on the sign; the Didache; the "pestilences"
variant; Deissmann's coin evidence; every date-setter by name.

## The plain notes on Matthew 25 (2026-11-19)

`client/public/bible/notes/matthew/plain/25.json`. Eight searches for this
chapter, with the earlier ledger (Matthew 10, 13, 18 and 22; Mark 16).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| 1 Maccabees 9:37-39: a great wedding; the bridegroom came out with his friends and relatives, with drums and music, to meet the bride's party | 1-13 | 1 Maccabees | Search: biblehub.com and biblestudytools.com 1 Maccabees 9:37-39 (several translations; verse numbers vary by edition). Paraphrased |
| Lampades: clay oil lamps or torches (oil-soaked cloth on a stick); scholars divided | 1-13 | Jeremias's article; Peppard, JBL 2024; translation notes | Search: reformedperspectives.org (Chamblin on 25:1-13); tips.translation.bible on 25:1-7; byustudies.byu.edu. No scholar named |
| Luke 13:25; 7:23; Isaiah 62:5; Hosea 2:19; 9:15; 24:36 | 1-13 | BSB | BSB text |
| Didache 16.1 (around AD 100): watch over your life; let your lamps not go out | 1-13 | Didache | Search: cts.perseids.org Didache 16.1; bkv.unifr.ch; date from the earlier ledger. Paraphrased |
| b. Shabbat 153a, several centuries after Jesus | 1-13 | Earlier ledger (Matthew 22) | Earlier ledger; pointer only |
| A talent about six thousand denarii; a denarius a day's wage (20:2); so about twenty years' wages | 14-30 | Earlier ledger (Matthew 18) | Earlier ledger; "something like" |
| Josephus, Antiquities 17.318: Antipas two hundred talents a year | 14-30 | Earlier ledger (Matthew 18) | Earlier ledger |
| b. Bava Metzia 42a: Samuel, money is properly guarded only in the ground | 14-30 | Babylonian Talmud | Search: halakhah.com Bava Metzia 42a; myjewishlearning.com; steinsaltz.org. Marked as written down centuries later. No source found linking it to the parable; the note does not claim one |
| Luke 19:11-27, 19:22; 13:12, 13:44; 21:12; 8:12; 22:13; Psalm 24:1; Psalm 16:11; Exodus 22:25 | 14-30 | BSB | BSB text |
| A "whistle-blower" reading of the third servant (Herzog, in the deep note); most reject it | 14-30 | Deep note | Stated as "a few modern readers"; no name |
| 1 Kings 2:19; Isaiah 58:7; Ezekiel 18:7; Ezekiel 34:17, 23; Daniel 7:13-14; Proverbs 19:17 | 31-40 | BSB | BSB text |
| Lucian (second century), The Passing of Peregrinus 11-12: Christians at the prison daily with meals | 31-40 | Lucian | Search: en.wikipedia.org Passing of Peregrinus; tertullian.org; cts.perseids.org 11-15. Paraphrased |
| Sulpicius Severus, Life of Martin 3: Martin cut his cloak at the gate of Amiens; that night saw Christ wearing the half | 31-40 | Sulpicius Severus | Search: en.wikipedia.org Martin of Tours; dcc.dickinson.edu; st-takla.org (NPNF). Paraphrased; given as "the story says" |
| Two readings of "the least"; "For much of the church's history, many writers read it this way" (the least as Christians), stated in general terms | 31-40 | General history of interpretation, from several summaries | Repaired 2026-11-19 (John run): Gray's name and finding removed from the plain note. One search tried to confirm The Least of My Brothers: Matthew 25:31-46, A History of Interpretation (Scholars Press, 1989, SBL Dissertation Series 114) from the book's own description; it found the catalogue entry (title, publisher, year) but no publisher or library description of its findings; the library page could not be reached. His finding was met only in others' summaries (journal-ems.org, dennyburk.com, christianitytoday.com), so it is no longer credited to him. The deep note below, unchanged, still names him |
| 12:49; 28:10; 10:40, 42; 5:44; Luke 10:25-37 | 31-40 | BSB | BSB text |
| "Prepared for you" (34) and "prepared for the devil and his angels" (41) | 41-46 | BSB | BSB text |
| Many Jews expected the dead to be raised at the end of time | 41-46 | Earlier ledger (Mark 16) | Earlier ledger |
| Daniel 12:2; Proverbs 21:13; 26:1; 7:17; Ephesians 2:8-10; James 2:17; 11:28; 27:28, 48 | 41-46 | BSB | BSB text |
| Grace and works: Reformation (fruit); Catholic (works in grace truly count, grace their source) | 41-46 | Deep note; standard confessional positions | Stated as views; Trent not named |
| Augustine, City of God 21.23: "eternal" used of both, so if one is endless the other is | 41-46 | Augustine | Search: newadvent.org/fathers/120121.htm; logoslibrary.org; sacred-texts.com. Paraphrased |
| Views of hell; care line (11:28) | 41-46 | Matthew 10 and 13 plain notes | Wording reused |

Left out: the talent's weight in kilograms; Antiquities 17.318's other
figures; b. Sotah 14a and Midrash Tehillim 118.17; the Book of the Dead;
Origen, Chrysostom, Benedict's Rule, Caravaggio, the cathedral portals,
Sponsus, Michelangelo, Milton, Nicolai and Bach (all in the deep note, not
checked this run); Stanton, France, Carson, Davies and Allison, Gutiérrez,
Herzog, Russell, Hart, Fudge, Stott by name; the claim that the English word
"talent" comes from this parable; the deep note's claim that 25:34 is the only
place Jesus calls himself king in his teaching; the textual notes; the
"bride" variant in verse 1; 1 Enoch.

## The plain notes on Matthew 26 (2026-11-19)

`client/public/bible/notes/matthew/plain/26.json`. Five searches for this
chapter. Where Mark 14 tells the event, its verified claims and its wording
are reused (the Lord's Supper views, Gethsemane and its care line, the
Mishnah on trials, Peter's denial, "Surely not I").

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Caiaphas appointed by Valerius Gratus around AD 18, removed by Vitellius around 36 or 37; overlapped with Pilate | 1-16 | Josephus, Antiquities 18.33-35, 18.95 | Search: livius.org Caiaphas; newadvent.org Caiphas; en.wikipedia.org Caiaphas (36 or 37 disputed, both given) |
| The 1990 ossuary; Passover crowds and riot; nard; anointing | 1-16 | Earlier ledger (Mark 14) | Pointer to the Mark 14 note |
| Thirty pieces most likely shekels, perhaps Tyrian (used for the temple tax); not certain | 1-16 | Encyclopedias | Search: en.wikipedia.org Thirty pieces of silver; biblehub.com topical "Thirty shekels"; dannythedigger.com. Given as "most likely" and "perhaps" |
| Exodus 21:32 thirty shekels for a slave gored; Zechariah 11:12-13; 27:9-10 | 1-16 | BSB | BSB text |
| John 12:6 | 1-16 | BSB | BSB text |
| Judas the Greek form of Judah; from the Middle Ages Judas sometimes made a picture of the Jewish people, feeding contempt | 1-16 | Encyclopedias; Acocella (New Yorker 2006) as quoted | Search: en.wikipedia.org Judas Iscariot; history.com "Why Judas betrayed Jesus"; bitterwinter.org. No scholar named |
| "You have said it yourself" (su eipas) taken by many as a careful or reluctant yes that puts the words back on the asker | 17-25, 57-68 | Catchpole, NTS 1971 (as cited by the IVP commentary); translation notes | Search: cambridge.org NTS abstract; biblegateway.com IVP NT commentary 26:62-68; tips.translation.bible on 26:64. "Many scholars" |
| Psalm 41:9; Genesis 50:20; Exodus 12; date question (Mark 14 wording, pointer) | 17-25 | BSB; earlier ledger | BSB text |
| "For the forgiveness of sins" only in Matthew (Mark 14:24; Luke 22:20); 1:21; "with you" | 26-30 | BSB comparison | BSB text |
| Exodus 24:8; Jeremiah 31:34; Isaiah 53:12; 20:28; views of the Supper (Mark 14 wording) | 26-30 | BSB; Mark 14 plain note | BSB text; repository |
| Zechariah 13:7; one crowing in Matthew; 28:16 | 31-35 | BSB | BSB text |
| "May Your will be done" (26:42) and the Lord's Prayer (6:10, 6:13); "My Father" for Abba; Psalm 42:5, 11; Isaiah 51:17; the church's answer and the care line (Mark 14 wording) | 36-46 | BSB; Mark 14 plain note | BSB text; repository |
| Kiss of a student to a teacher (Mark 14 wording); "Friend" three times (20:13; 22:12; 26:50) | 47-56 | Earlier ledger (Matthew 22) | Repository |
| A legion about five thousand soldiers | 47-56 | Earlier ledger (Mark 5) | Earlier ledger |
| John 18:10 (Peter, Malchus); Luke 22:51; 5:39; Romans 13:4; Isaiah 50:6; views on the sword | 47-56 | BSB; standard positions | BSB text; stated as views |
| Two witnesses (Deuteronomy 19:15); Leviticus 5:1 on a public charge, "may be why" Jesus speaks | 57-68 | BSB; deep note | BSB text; stated as "may" |
| Mishnah Sanhedrin 4:1 and the two views (Mark 14 wording) | 57-68 | Earlier ledger (Mark 14) | Earlier ledger |
| Psalm 110:1; Daniel 7:13; Isaiah 53:7; 50:6 | 57-68 | BSB | BSB text |
| b. Eruvin 53b: later stories mocking Galilean pronunciation | 69-75 | Babylonian Talmud | Search: en.wikipedia.org Galilean dialect; johngill.thekingsbible.com 26:73; muse.jhu.edu article. Marked "much later"; the reading of lalia as "talk" not used |
| 5:37; Psalm 51:17; 28:7, 10, 16; John 21:15-19; Mark manuscripts with one crowing | 69-75 | BSB; earlier ledger (Mark 14) | BSB text; earlier ledger |

Left out: the Mishnah on reclining, the four cups and Gamaliel (in Mark's
note); m. Berakhot 6:1; m. Sanhedrin 5:2 and 7:5; m. Bava Kamma 7:7;
Josephus, Antiquities 18.63-64 (kept for chapter 27 if checked); P64 and P67;
Klausner, Winter, Cohn, Danby, Brown, Catchpole, Maccoby, Klassen, Meier,
Barth, Borges and the Gospel of Judas by name; Jeremias, Jaubert and
Humphreys (the date question is a pointer to Mark 14); the claim that no
governor of Judea had twelve legions.

## The plain notes on Matthew 27 (2026-11-19)

`client/public/bible/notes/matthew/plain/27.json`. Eight searches for this
chapter. Where Mark 15 tells the event, its verified claims and its wording
are reused word for word (Pilate, Tacitus, the "Christ-killers" paragraph,
Nostra Aetate, Acts 4:27, the mocking, crucifixion, the three readings of the
cry and its care line, the curtain, the burial). The crisis line after
Judas's death is the Mark 14 wording word for word.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Judas's death told in one sentence in Matthew's own word (hanged himself) | 1-10 | BSB 27:5 | BSB text; no further detail given |
| Acts 1:18-19 a different account; explanations: two stages; priests bought the field in his name; two tellings of remembered facts | 1-10 | Commentaries; skeptical replies | Search: biblehub.com "Acts 1:18 vs Matthew"; readingacts.com; jamesbishopblog.com (skeptical); ehrmanblog.org forum. No side; Acts's details not described |
| 27:9 credited to Jeremiah: composite of Zechariah 11 with Jeremiah 18-19 and 32; "spoken" not "written"; a slip; the earliest manuscripts read Jeremiah | 1-10 | Menken, Biblica 83 (2002); commentaries | Search: bsw.org Biblica 83 Menken; biblehub.com "Is Matthew 27:9 a textual error?"; en.wikipedia.org Matthew 27:9. The claim that Augustine and Jerome called it a mistake was not used |
| Zechariah 11:13; Jeremiah 19:1-2, 11; 32:9; 2 Samuel 17:23 (Ahithophel) | 1-10 | BSB | BSB text; Ahithophel given as what "some readers notice" |
| "You bear the responsibility" in 27:4 and 27:24 | 1-10, 15-26 | BSB | BSB text |
| Crisis lines (Mark 14 wording); 26:28 | 1-10 | Mark 14 plain note | Repository |
| Pilate about AD 26 to 36; Pilate stone 1961; Tacitus, Annals 15.44 around 116 | 11-14 | Earlier ledger (Mark 15) | Earlier ledger |
| Josephus, Antiquities 18.63-64: expanded by Christian copyists; most scholars think the original said Pilate condemned Jesus to the cross on the accusation of leading men | 11-14 | Josephus; the "authentic core" consensus | Search: en.wikipedia.org Josephus on Jesus (and talk page); posenlibrary.com Testimonium; undeceptions.com. Paraphrased |
| Isaiah 53:7; 20:19; Psalm 2:2 | 11-14 | BSB | BSB text |
| Pilate's wife only in Matthew; later tradition names her Procula; honoured as a saint by the Orthodox and Ethiopian churches; Origen (Commentary on Matthew) thought the dream meant to turn her | 15-26 | Encyclopedias | Search: christianhistoryinstitute.org Oct 27; en.wikipedia.org Pontius Pilate's wife (Procula); christianity.com. Feast days not given; "Claudia" not given |
| Dreams in 1:20 and 2:12 | 15-26 | BSB | BSB text |
| Deuteronomy 21:6-7 the hand-washing rite; Joshua 2:19; 2 Samuel 1:16; Jeremiah 26:15; Deuteronomy 24:16; Isaiah 53:12 | 15-26 | BSB | BSB text |
| 27:25 as one crowd on one morning (27:20), a legal formula, the irony with 26:28; Oberammergau and passion plays; Christ-killers paragraph, Nostra Aetate 4, Acts 4:27 (Mark 15 wording); "This site rejects it" (book page) | 15-26 | Book page ledger (Cargal; Oberammergau); Mark 15 ledger | Earlier ledger; wording kept consistent with the book page |
| How far Matthew's conflict with synagogue leaders shaped the scene is debated | 15-26 | Deep note; book page | Stated as debated; no names |
| Scarlet robe and the staff in Matthew; purple in Mark | 27-31 | BSB comparison | BSB text. The claim that scarlet was a soldier's cloak was cut |
| Crucifixion (Mark 15 wording); "kept watch" (27:36); 4:3; Psalm 22:7, 8, 18; Psalm 69:21; 16:25; 20:28; Mark's myrrh | 32-44 | BSB; earlier ledger | BSB text |
| "Eli" closer to the Hebrew of the psalm, "Eloi" Aramaic; two explanations | 45-50 | Bible dictionaries | Search: biblicaltraining.org "Eloi, Eloi"; biblestudytools.com dictionary. Stated as views |
| Readings of the cry and care line (Mark 15 wording); Psalm 22:1, 24, 27; Amos 8:9; Malachi 4:5; 2 Corinthians 5:21 | 45-50 | Mark 15 plain note; BSB | Repository; BSB text |
| 27:52-53 only in Matthew; read as event, or as prophetic picture-language (including by some with a high view of Scripture); the skeptic's question; the reply about single sources | 51-56 | JBL 2003 (Waters); Geisler, JISCA 2013; Wikipedia "Matthew 27:53" | Search: en.wikipedia.org Matthew 27:53; gospelstudies.org.uk JISCA 6.1; bibleref.com. Licona, Geisler and the 2011 controversy not named |
| Ezekiel 37:12; Isaiah 26:19; Daniel 12:2; Exodus 26:33; Hebrews 10:20; 14:33; 20:20-21; 27:38 | 51-56 | BSB | BSB text |
| Deuteronomy 21:23; Isaiah 53:9; John 19:38; the burial (Mark 15 wording) | 57-61 | BSB; earlier ledger | BSB text |
| The guard only in Matthew; the skeptic's case (answering the theft charge; no guard on Friday night); replies (single sources; the rumour concedes the empty tomb); "You have a guard" Roman or temple guard; the Gospel of Peter has guards, dependence debated | 62-66 | Brown and the Jesus Seminar as cited; Craig; McGrew; Torley | Search: reasonablefaith.org "The guard at the tomb"; secularfrontier.infidels.org (Torley); crossexamined.org. No names on the site |
| Mark 15:42; 12:40; 16:21; Psalm 2:4; 28:11, 14; 1 Corinthians 15:3-8 | 62-66 | BSB; earlier ledger (Paul in the 50s, Mark 16) | BSB text |

Left out: Papias on Judas (Apollinaris); the Akeldama tombs and the
Hinnom site; Thallus, Phlegon and Africanus on the darkness; Josephus on the
temple gate; Susanna 46; Melito, Origen on 27:25, the Roman Catechism, We
Remember, Benedict XVI, Cargal, Crossan and Cohen by name; the reading of
"our children" as the generation of AD 70 (not checked this run); Licona and
Geisler; the harrowing of hell; Procula's feast days and the letter to Fulvia;
the claim that the soldiers were recruited locally.

## The plain notes on Matthew 28 (2026-11-19)

`client/public/bible/notes/matthew/plain/28.json`. Six searches for this
chapter, with the earlier ledger (Mark 16 for the women as witnesses, Celsus
and Origen, the first day of the week; the book page for the five
teachings).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Josephus, Antiquities 4.219; Celsus's "a half-frantic woman" as Origen reports; all four Gospels make women first; many historians weigh this (Mark 16 wording) | 1-10 | Earlier ledger (Mark 16) | Earlier ledger |
| Earthquake, the angel on the stone, the guards like dead men, Jesus meeting the women: only in Matthew | 1-10 | BSB comparison | BSB text |
| 16:21; 17:23; 20:19; 26:32; Isaiah 25:8; Daniel 12:2; Daniel 10:6; 27:56, 61 | 1-10 | BSB | BSB text |
| Differences among the four accounts (women, one or two angels, Galilee and Jerusalem); explanations (selection and fitting together; honest reports; legend) | 1-10 | Gospel texts; harmonies and critics | Search: blueletterbible.org (Stewart) "Are the reports ... contradictory"; credomag.com; krharriman.substack.com. Luke 24:4; John 20:12 BSB. Ladd not named |
| 1 Corinthians 15:3-8, Paul in the 50s | 1-10 | Earlier ledger (Mark 16) | Earlier ledger |
| "Circulated among the Jews to this very day" read as the rumour Matthew answers, not a statement about Jewish people | 11-15 | BSB; book page "A Jewish book, and a hard history" | Consistent with the book page; pointer to 27:15-26 |
| Justin Martyr, Dialogue with Trypho 108: the charge that the disciples stole him by night still spread | 11-15 | Justin | Search: logoslibrary.org trypho/108; bkv.unifr.ch; en.wikipedia.org Stolen body hypothesis. Paraphrased; no year given |
| Exodus 23:8; 26:15; Acts 5:18, 40; 28:14 | 11-15 | BSB | BSB text |
| Distazō only here and 14:31; hesitation rather than settled unbelief; "some" partitive (some of the eleven) or others present | 16-17 | NET notes; France (as summarised) | Search: en.wikipedia.org Matthew 28:17; biblia.com NET notes; openbible.com. No scholar named |
| 4:8-9; 5:1; 17:1-2; Exodus 3:12; Luke 24:11; Mark 9:24 | 16-17 | BSB | BSB text |
| "All nations": Gentiles only (Hare and Harrington, CBQ 1975) or every people including Israel (Meier, CBQ 1977); 10:5-6; 15:24; 2:1; 8:11 | 18-20 | Scholarship as cited | Search: cambridge.org HTR note; hts.org.za (Lee and Viljoen); biblesociety.org.uk. Stated as "scholars discuss"; no names |
| Didache 7 (around AD 100): baptism in the name of the Father, Son and Holy Spirit, in running water, or pouring three times on the head | 18-20 | Didache | Search: cts.perseids.org Didache 7.1-7.4; reformedforum.org "Baptism in the Didache"; date from the earlier ledger. Paraphrased |
| Daniel 7:14; Genesis 22:18; 1:1; 1:23; Exodus 3:12; Joshua 1:9; Acts 2:38; Romans 6:4 | 18-20 | BSB | BSB text |
| Views of baptism (infants and believers; mode; means of grace or sign); "in the name of Jesus Christ" in Acts read by most as describing Christian baptism | 18-20 | Standard confessional positions; deep note | Stated as views |

Left out: Eusebius's shorter citations of 28:19 and Conybeare (every Greek
manuscript has the threefold name, as the deep note says; the site does not
raise the question); Oneness Pentecostal practice; Reimarus; Craig, Brown and
Ferguson by name; the Roman penalty for sleeping on guard; the claim that
many apostles died as martyrs (narrowed to Acts 5); Hare, Harrington and
Meier by name.

## John's book page (teaching introduction, 2026-11-19)

Every historical claim in `client/public/bible/notes/john/intro.json`, field
`teaching`. 19 web searches for the book page. Checks rest on search results
that quote or summarise the source, read against at least two results where
possible. Ancient writers are paraphrased. Scripture is the BSB in the
repository, checked word for word by `scripts/validate-bible-notes.mjs`;
counts of Greek words are a script over the repository's Greek text of John.

| Claim | Source | Checked by |
|---|---|---|
| "The disciple whom Jesus loved" five times: 13:23; 19:26; 20:2; 21:7; 21:20; 21:24 the witness and "we know" | BSB | Script over the repository's text |
| Irenaeus, Against Heresies 3.1.1 (about 180): John, the Lord's disciple who leaned on his breast, gave out a Gospel while living at Ephesus in Asia | Irenaeus | Search: newadvent.org/fathers/0103301.htm (ANF); bkv.unifr.ch; hypotyposeis.org. Paraphrased |
| Irenaeus 3.3.4: John stayed at Ephesus until Trajan's time; Irenaeus saw Polycarp in his youth; Polycarp appointed by apostles in Asia | Irenaeus | Search: newadvent.org/fathers/0103303.htm; bkv.unifr.ch division 415; fordham.edu sourcebook. Paraphrased. The Florinus letter (Eusebius 5.20) was not found and is not used |
| Papias names John among the disciples and then "the elder John" with Aristion; Eusebius (3.39) read two Johns and reported two tombs at Ephesus called John's; Irenaeus took Papias to mean the apostle | Eusebius, Church History 3.39.4-6 | Search: newadvent.org Catholic Encyclopedia "Papias"; bkv.unifr.ch NPNF Eusebius 3.39; fgh.perseids.org. Paraphrased. Papias's date from the earlier ledger (Mark) |
| Views on the beloved disciple (John son of Zebedee; a Jerusalem disciple, perhaps the elder; a circle of churches) | Repository `author` (Bauckham, Brown, Martyn) | Repository; names not repeated on the page |
| Most date John to the 90s; Robinson, Redating the New Testament (1976), argued before 70; 5:2 present tense; no mention of the temple's fall | Scholarship | Search: christianitytoday.com; psephizo.com; michaelfbird.substack.com; time.com. The Priority of John not named (its year differed between results) |
| P52: John Rylands Library, Manchester; John 18:31-33 and 18:37-38; bought by Grenfell in Egypt in 1920; published by C. H. Roberts in 1935; Roberts dated it to the first half of the second century; Nongbri, "The Use and Abuse of P52", Harvard Theological Review (2005), widened the range | Roberts 1935; Nongbri 2005 | Search: en.wikipedia.org Papyrus 52; cambridge.org NTS article; brentnongbri.com. Its size and the 2020 NTS article's author are not given |
| Put out of the synagogue: 9:22; 12:42; 16:2. Martyn (1968) linked it to the Birkat ha-Minim; many now doubt the link (Kimelman; Reinhartz); Marcus (NTS 2009) defends a form of it | J. Louis Martyn, History and Theology in the Fourth Gospel (1968) | Search: bibleinterp.arizona.edu; resolve.cambridge.org NTS article; voice.dts.edu. Stated as "many scholars now doubt that link" |
| 20:31 manuscripts differ in tense | Repository `text` and `purpose` | Repository |
| Only in John, and missing from John (birth, temptation, parables, exorcisms, Transfiguration, the bread and cup); "kingdom of God" only 3:3, 3:5 | BSB of the four Gospels | Script over the repository's text |
| Temple action early in John, late in the others; one event or two | 2:13-22; Mark 11:15-19 | Wording consistent with the Mark 11 and Matthew 21 notes ("These notes do not settle it") |
| Three Passovers named (2:13, 6:4, 11:55); unnamed feast 5:1 | BSB | Repository |
| The day of the crucifixion: Mark 14:12 against John 18:28 and 19:14; the views | Earlier ledger (Mark 14: the date of the Last Supper) | Earlier ledger; Exodus 12:6 BSB for the day the lambs were killed |
| Whether John knew the other Gospels: views | Repository `reading`; michaelfbird.substack.com | Search above. Stated as views |
| Seven signs as usually listed; some fold the walk on the sea into the feeding; some add the catch of fish; John numbers only the first two (2:11, 4:54) | Reference works | Search: en.wikipedia.org Book of Signs (Marsh, Smalley; Bullinger); BSB |
| "Book of signs" and "book of glory" from Raymond Brown (Anchor Bible, 1966 and 1970); Dodd's "book of the passion" | Brown; Dodd, The Interpretation of the Fourth Gospel (1953) | Search: en.wikipedia.org Book of Signs; scholarly source citing Brown 1.cxxxviii and Dodd p. 289; years from the repository's furtherReading |
| "Believe" 98 times in John (Matthew 11, Mark 14, Luke 9); "faith" (pistis) never; "abide" 40; "world" 78; "life" 36; "love" 44; "truth" 25; "light" 23; Ioudaios 71; anōthen 3:3, 3:7, 3:31, 19:11, 19:23; "lifted up" 3:14, 8:28, 12:32, 12:34 | Greek text in the repository | Script over `client/public/bible/ch/*/` |
| Tabernacles: the Mishnah (written down around 200) describes water drawn from Siloam and poured at the altar (Sukkah 4:9) and lamps in the Court of the Women (Sukkah 5:2-4); how much was done in Jesus' day not certain | Mishnah Sukkah | Search: sefaria.org Mishnah Sukkah 4:9; jtsa.edu; israelnationalnews.com (Sukkah 5:2-4). Marked as later and uncertain |
| Dedication: the temple rededicated in 164 BC after Antiochus IV defiled it; 1 Maccabees 4:52-59 | 1 Maccabees | Search: bible.usccb.org 1 Maccabees 4 with notes (14 December 164 BC); biblehub; biblegateway Encyclopedia of the Bible |
| "I am" without a picture: the background debated (Exodus 3:14 LXX or Isaiah 43:10 LXX), stated in the chapter notes, not on the page | Scholarship | Search: en.wikipedia.org Ego eimi; bagl.org (Ma) |
| "The Jews": used to justify contempt, expulsions and violence; misuse rejected; Nostra Aetate 4 (1965) quoted as in Mark 15; Acts 4:27 | Earlier ledger (Mark 15; Matthew's book page) | Earlier ledger; wording consistent with Matthew's page and the Mark 15 and Matthew 27 notes |
| Translators: "the Jews" kept; "the Jewish leaders" by context; "the Judeans" argued by some scholars, and the objection that it cuts the link with Jews today | Scholarship | Search: tips.translation.bible "Jews"; momentmag.com "Judeans"; cavac.at Ioudaios (Steve Mason). No version named except the BSB |
| Woman caught in adultery: absent from P66 and P75 (and from Sinaiticus and Vaticanus, repository `text`); first Greek copy Codex Bezae (fifth century); placed after John 7:36, at the end of John, after Luke 21:38; Jerome kept it and said many Greek and Latin copies had it | Manuscript evidence | Search: ehrmanblog.org; biblehub.com; kmooreperspective.blogspot.com; repository `text` |
| Chapter 21 in every surviving manuscript that has the ending; many think it added in the final edition | Repository `text` and `structure` | Repository |
| Clement of Alexandria, via Eusebius 6.14.7: John last, seeing the bodily facts set out in the Gospels, urged by friends and moved by the Spirit, wrote a spiritual Gospel; a tradition of the elders | Eusebius, Church History 6.14.5-7 | Search: hypotyposeis.org (Greek and translation); bkv.unifr.ch ANF fragments; library.biblicalarchaeology.org. Paraphrased |
| Nicaea 325; Chalcedon 451; Augustine's 124 tractates and the eagle; Aquinas at Paris; Luther's "chief Gospel" (1522); Calvin's "key"; Bach's St John Passion, Leipzig 1724 | Repository `reception` | Repository |
| Herod Antipas 4 BC to AD 39; Pilate 26 to about 36; crucifixion AD 30 or 33; temple destroyed 70 | Earlier ledger (Mark) | Earlier ledger |
| Tiberias founded by Antipas about AD 20 and named for Tiberius; the lake called after it (6:1; 21:1) | Josephus; encyclopedias (dates 18 to 20 most common) | Search: encyclopedia.com Tiberias; jewishencyclopedia.com; biblegateway Easton. "About AD 20" |
| P66 and P75 around 200 | Repository `text` | Repository |
| Cana: Kafr Kanna or Khirbet Qana (Reina also proposed); placed roughly | Archaeology | Search: bibleplaces.com/cana; en.wikipedia.com Khirbet Qana; christiantoday.com |
| Sychar: most place it at Askar; some at Shechem (Tell Balata) | Bible encyclopedias | Search: biblegateway Encyclopedia of the Bible "Sychar"; biblicaltraining.org; biblehub atlas |
| Bethany beyond the Jordan: Al-Maghtas inscribed by UNESCO in 2015; no solid proof the site is the place; other proposals (repository: Origen's Bethabara, Riesner's Batanea) | UNESCO; reviewers | Search: whc.unesco.org list 1446; biblicalarchaeology.org; orthochristian.com |
| Pool of Siloam found in 2004 (Reich and Shukron); Pool of Bethesda excavated near St Anne's, a pool fitting John's description, still debated in detail | Archaeology | Search: biblicalarchaeology.org "The Siloam Pool"; en.wikipedia.org Pool of Bethesda. The page says pools "widely taken to be" Bethesda and Siloam |
| Bethany "a little less than two miles" (11:18) | BSB | Repository |
| Map positions | Approximate modern sites; Cana a region, placed roughly and said so | Not a historical claim |

Left out: the size of P52; the author of the 2020 NTS article on P52; Robinson's
The Priority of John (its year differed between results); the Florinus letter;
Trajan's dates; any count of how much of John is not in the other Gospels;
Ephraim (11:54) and Aenon near Salim (3:23) on the map (sites uncertain); the
modern names of Bethany.

## The plain notes on John 1 (2026-11-19)

`client/public/bible/notes/john/plain/1.json`. 5 web searches (plus the book
page's). Scripture is the BSB, checked word for word by the validator.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Genesis 1:1, 1:3-5; Psalm 33:6; Proverbs 8:22-31 | 1-5 | BSB | BSB text |
| Logos also "reason" or "account"; Heraclitus and the Stoics used it for the reason ordering the universe | 1-5 | Reference works | Search: biblegateway Encyclopedia of the Bible "Logos"; biblicaltraining.org; internationalstandardbible.com |
| New World Translation reads "a god"; Colwell (1933): definite predicate nouns before the verb usually lack the article; Harner (JBL, 1973): such nouns mainly qualitative | 1-5 | Colwell, JBL 1933; Harner, JBL 92 (1973) | Search: equip.org "John 1:1 and the New World Translation"; jashow.org; patheos.com. No year given for the NWT |
| Theos without the article for the one God in 1:6, 1:12, 1:13, 1:18 | 1-5 | Greek text in the repository | Script |
| Deuteronomy 6:4; John 20:28 | 1-5 | BSB | BSB text |
| Josephus on John the Baptist (Antiquities 18.116-119); Acts 19:1-7 | 6-13 | Earlier ledger (Mark 6); BSB | Earlier ledger |
| Exodus 4:22; Deuteronomy 14:1 | 6-13 | BSB | BSB text |
| Exodus 40:34-35; 34:6; 33:18-23; 33:20; Isaiah 6:1; Exodus 24:9-11 | 14-18 | BSB | BSB text |
| 1:18: P66, P75, Sinaiticus and Vaticanus read "only God"; later copies "only Son" | 14-18 | Metzger's Textual Commentary as reported; NTS abstract | Search: bible-researcher.com John 1:18; resolve.cambridge.org NTS "John 1:18: God the Only Son"; repository `text` |
| "The Jews of Jerusalem" here means the authorities | 19-28 | Book page part on "the Jews"; repository chapter note `teach.pitfalls` | Repository |
| 2 Kings 2:11; Malachi 4:5; Deuteronomy 18:15; Isaiah 40:3 | 19-28 | BSB | BSB text |
| b. Ketubbot 96a: a student does for his teacher all a slave does except remove his shoes; Rabbi Joshua ben Levi, third century | 19-28 | Talmud | Search: steinsaltz.org Ketubot 96; en.wikipedia.org John 1:27; posenlibrary.com. Marked as later and conditional ("if people already thought that way") |
| Bethany beyond the Jordan: Al-Maghtas listed by UNESCO in 2015; no firm proof | 19-28 | UNESCO | Book page ledger |
| Qumran Community Rule (1QS 8) applies Isaiah 40:3 to its life in the wilderness and the study of the law | 19-28 | 1QS 8:12-16 | Search: muse.jhu.edu excerpt; orion-bibliography.huji.ac.il; cojs.org (Murphy-O'Connor). No column and line numbers given on the page |
| Matthew 11:14; Luke 1:17 | 19-28 | BSB | BSB text |
| Passover lamb per household (Exodus 12:3-13); daily lambs (Exodus 29:38-42); Isaiah 53:7; Isaiah 11:2; 19:36 and Exodus 12:46; Genesis 22:8; Revelation 17:14 | 29-34 | BSB | BSB text |
| Readings of "Lamb of God": Passover, servant, daily offering, Genesis 22, a conquering lamb (some scholars) | 29-34 | Surveys of interpretation | Search: tips.translation.bible John 1:29; tyndalebulletin.org (Carey, "The Lamb of God and Atonement Theories"); sats.ac.za. Dodd not named (met only in a summary) |
| Tenth hour about 4 p.m., hours counted from sunrise | 35-42 | Earlier ledger (Mark 15) | Earlier ledger |
| Cephas Aramaic, Peter Greek, "rock"; Genesis 17:5; 32:28; 18:15-27 | 35-42 | BSB (1:42 says "translated as Peter") | BSB text |
| Messiah "anointed one"; 1 Samuel 16:13; Psalm 2:2; Isaiah 11:1-5 | 35-42 | BSB | BSB text |
| Nazareth not named in the Old Testament | 43-51 | Earlier ledger (Matthew 2) | Earlier ledger |
| Micah 4:4; Genesis 27:35-36; Genesis 28:12, 16-17; Daniel 7:13-14; Psalm 2:7 | 43-51 | BSB | BSB text |

Left out: Philo; Wisdom of Solomon and Sirach (deep note); Targums and the
Memra; Origen's Bethabara and Riesner's Batanea; Dodd by name; the Caesarea
inscription on Nazareth; the size of Nazareth; Genesis Rabbah 68:12; the
"seven days" reading; the "hymn" and chiasm theories; every scholar in the
deep note by name.

## The plain notes on John 2 (2026-11-19)

`client/public/bible/notes/john/plain/2.json`. 5 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Samson's feast of seven days; Psalm 104:15; Proverbs 20:1; Ephesians 5:18 | 1-5 | BSB | BSB text |
| Weddings lasted days; running out of wine a shame on the family; wine usually mixed with water | 1-5 | Background summaries | Search: wedding customs results (towerofadam.substack.com; kentwest.blogspot.com; logos sermons); kept general |
| "Woman" a polite address (NET note: Jesus' normal polite way of addressing women; Robertson: no censure); 4:21, 20:15, 19:26 | 1-5 | NET Bible note on John 2:4; Robertson's Word Pictures | Search: biblia.com NET note; biblestudytools.com Robertson; tips.translation.bible |
| "What to me and to you" a Semitic idiom setting a request aside; 2 Samuel 16:10 in the BSB | 1-5 | NET note; BSB | Search as above; BSB text |
| Isaiah 62:5; 3:29 | 1-5 | BSB | BSB text |
| Catholic and Orthodox see Mary as bringing needs to her Son; many Protestants stress the distance | 1-5 | Repository chapter note (`interpretation`, `teach.pitfalls`) | Repository; stated as how traditions weigh it, no names |
| Stone vessels found widely; believed not to contract impurity; Mishnah Kelim 10:1 (written down around 200); Leviticus 11:33 | 6-11 | Mishnah; archaeology | Search: intertextual.bible John 2:6 and m. Kelim 10:1; library.biblicalarchaeology.org "Pure garbage"; livescience.com (Adler) |
| Twenty to thirty gallons each (BSB); six jars 120 to 180 gallons | 6-11 | BSB; arithmetic | BSB text |
| Amos 9:13; Joel 3:18; Isaiah 25:6 | 6-11 | BSB | BSB text |
| Unfermented-juice reading held by some; oinos taken by most as wine | 6-11 | Commentaries | Search: wine results (creationmoments.com; bereanbiblechurch.org; biblereflection.org); repository `teach.pitfalls`. No century given |
| Care line on alcohol: no number given; "someone you trust", "a doctor or a recovery group" | 6-11 | Repository `teach.pastoral` | Written for this note |
| Doves for the poor (Leviticus 12:8); half shekel (Exodus 30:13); Tyrian shekels; the outer court open to Gentiles | 12-17 | BSB; earlier ledger (Mark 7, Mark 11) | Earlier ledger |
| No one said to be struck; whip used on the animals | 12-17 | BSB 2:15 | BSB text |
| Psalm 69:9 "has consumed"; John's future "will consume"; many read it as pointing to the cross; Malachi 3:1 | 12-17 | Commentaries; BSB | Search: biblehub.com John 2:17 commentaries (Ellicott, Meyer); old-tips.translation.bible Ps 69:9. Zechariah 14:21 not used |
| Temple action early or late; one event or two | 12-17 | Mark 11 and Matthew 21 notes | Same wording; Mark 11:17 "a den of robbers" BSB |
| Josephus, Antiquities 15.380: Herod began rebuilding in his eighteenth year, about 20/19 BC; forty-six years about AD 27/28; work continued long after | 18-22 | Josephus; NET note on John 2:20 | Search: biblia.com NET note; openbible.com commentaries; posenlibrary.com |
| Hieron (2:14-15) and naos (2:19-21) | 18-22 | Greek text in the repository | Script |
| 1 Kings 8:11; Mark 14:58; Mark 15:29; Psalm 16:10; Acts 2:24, 27-31; 10:18; 12:16; 14:26 | 18-22 | BSB | BSB text |
| Pisteuō in 2:23 and 2:24 | 23-25 | Greek text in the repository | Script |
| 1 Samuel 16:7; Jeremiah 17:9-10; 3:1 | 23-25 | BSB | BSB text |

Left out: the metrētēs in litres; Kafr Kanna and Khirbet Qana in this note
(on the book page's map); the Reina workshop; Pausanias and Dionysus; Hume;
Augustine's six ages; Veronese and the Louvre; the Zechariah 14:21 wordplay;
m. Shekalim 1:3; m. Keritot 1:7; Tosefta Ketubbot; the Royal Stoa; Sanders
and Fredriksen by name; the brothers of Jesus (three readings are in the
Mark 3 note).

## The plain notes on John 3 (2026-11-19)

`client/public/bible/notes/john/plain/3.json`. 4 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Pharisees devout, respected by the people | 1-8 | Earlier ledger (Mark 12: Josephus, Antiquities 18.15-17) | Earlier ledger |
| Nicodemus among the chief priests and Pharisees, asks for a fair hearing (7:45-51); 19:39 | 1-8 | BSB | BSB text |
| Anōthen "again" and "from above"; 3:31; Bibles divide | 1-8 | Greek text in the repository; book page ledger | Script; repository `text` |
| Pneuma wind and spirit (Hebrew ruach likewise) | 1-8 | Lexicons; repository word note G4151 | Repository |
| Ezekiel 36:25-26; 37:9; Titus 3:5 | 1-8 | BSB | BSB text |
| Readings of "water and the Spirit": baptism (long associated in Christian interpretation; Catholic, Orthodox, Lutheran, many Anglican); Ezekiel's cleansing (Calvin: "water, that is, the Spirit"); natural birth | 1-8 | McCabe, "The Meaning of Born of Water and the Spirit in John 3:5" (DBTS); Reformation Study Bible note; Carson's survey as summarised; repository `hard` | Search: dbts.edu; biblegateway.com Reformation Study Bible John 3:5; thegospelcoalition.org. Justin, Tertullian, Trent, Witherington, Belleville and Bultmann not named |
| Crucifixion Rome's punishment for slaves and rebels, in public | 9-15 | Earlier ledger (Mark 15) | Earlier ledger; kept general |
| Dei ("must") in 3:7, 3:14, 3:30 | 9-15 | Greek text in the repository | Script |
| Numbers 21:4-9 (21:8 quoted); 2 Kings 18:4; 12:33 | 9-15 | BSB | BSB text |
| Wisdom of Solomon 16:7: healed not by what he saw but by God, the Saviour of all; Mishnah Rosh Hashanah 3:8: healed when they looked upward and set their hearts on their Father in heaven | 9-15 | Wisdom; Mishnah | Search: stljewishlight.org; aish.com; jweekly.com; sefaria.org topics "The Copper Snake". Paraphrased; Wisdom "probably" before Jesus' time |
| Houtōs: "so much" or "in this way"; many think both (NET note); Gundry and Howell (NovT 1999) for manner, Jensen (NTS 2019) against a manner-only reading | 16-21 | NET note; NTS | Search: biblia.com NET John 3:16; cambridge.org NTS (Jensen). Scholars not named on the page |
| Monogenēs "unique"; "only begotten" in older Bibles | 16-21 | Repository word note G3439 | Repository |
| Where Jesus' words end (15 or 21) an editorial choice | 16-21 | Repository `literary` and `text` | Repository |
| Genesis 22:2; Romans 8:32 | 16-21 | BSB | BSB text |
| Those who never heard: the passage does not address it; views differ | 16-21 | Repository `hard` | Stated without names |
| Jesus did not himself baptize (4:2); Mark 1:14; Mark 6:17-29 | 22-30 | BSB | BSB text |
| Aenon near Salim: Eusebius's Onomasticon, eight Roman miles south of Scythopolis; Samaria near Shechem also proposed; no site confirmed | 22-30 | Eusebius; Bible atlases | Search: biblicaltraining.org "Aenon"; biblehub atlas; biblewalks.com |
| Hosea 2:19; Isaiah 62:5 | 22-30 | BSB | BSB text |
| Sphragizō "set one's seal" (3:33); apeitheō "not obey" (3:36); menei "remains" | 31-36 | Greek text in the repository | Script |
| Psalm 7:11; Psalm 103:10 | 31-36 | BSB | BSB text |
| Care line for the grieving | 31-36 | Repository `teach.pastoral` | Written for this note |

Left out: the shoshbin and m. Sanhedrin 3:5; Nakdimon ben Gurion and
Bauckham's family link; Qumran's night study; Jubilees and 1QS on the spirit;
b. Yevamot 22a; Barnabas and Justin on the snake; Wesley, Colson, Carter and
the 1976 "born again" story; Rollen Stewart's signs; Michelangelo and Tanner;
Hick, Nash and Pinnock by name; the Madaba map's Aenon.

## The plain notes on John 4 (2026-11-19)

`client/public/bible/notes/john/plain/4.json`. 7 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Jesus did not himself baptize (4:2); dei in 4:4 as in 3:7, 3:14 | 1-6 | BSB; Greek text in the repository | Script |
| Hours counted from sunrise; sixth hour about noon, seventh about 1 p.m. | 1-6, 43-54 | Earlier ledger (Mark 15) | Earlier ledger |
| Samaritans worshipped the God of Israel, kept the five books of Moses, worshipped at Gerizim; temple destroyed by John Hyrcanus about 111 or 110 BC (coins) | 1-6 | Worlds ledger (Jewish life portrait); earlier ledger (Matthew 10) | Earlier ledgers; same wording as the portrait |
| Bones scattered in the temple at Passover (Antiquities 18.29-30); Galilean pilgrims killed at Ginea (Antiquities 20.118) | 1-6 | Josephus | Worlds ledger (second check 2026-11-18). No date given for Ginea |
| 2 Kings 17:24; Ezra 4:3; the Samaritans' own account as descendants of the northern tribes | 1-6 | BSB; Samaritan self-understanding in reference works | BSB text; search below (israelite-samaritans.com) |
| About 900 Samaritans today, in Holon and at Kiryat Luza on Mount Gerizim | 1-6 | Population figures | Search: en.wikipedia.org Samaritans (about 900 in 2024; about 460 Holon, 380 Kiryat Luza in 2021); israelite-samaritans.com population survey; refworld.org. "About nine hundred" |
| Genesis 33:19; Joshua 24:32 | 1-6 | BSB | BSB text |
| Ou sunchrōntai (4:9): "associate with", or Daube (1950) "do not use vessels in common"; some modern Bibles follow him (NET, NRSV); others keep "associate"; the Greek reading questioned | 7-15 | Daube, JBL 69 (1950) as cited; NTS article "Sharing Cups, Associating, or Getting Help?"; NET note | Search: cambridge.org NTS; biblia.com NET note; biola.edu blog. Daube's article itself not read, so only his proposal is stated, as a proposal; no Bible version named on the page |
| Living water = running water as against a cistern | 7-15 | Lexicons; Leviticus 14:5 sense; deep note | Common reference fact; kept general |
| Kurios "Sir" and "Lord" | 7-15 | Greek text in the repository | Script |
| Jeremiah 2:13 (cut before its em-dash); Zechariah 14:8; Isaiah 44:3; 55:1; John 7:37-39 | 7-15 | BSB | BSB text |
| Divorce in the husband's hands (Deuteronomy 24:1); levirate marriage (Deuteronomy 25:5-6); Luke 20:28-33 | 16-19 | BSB | BSB text |
| Scholars of women in the ancient world: she may have been widowed more than once or sent away, for example for being unable to have children; she could not end a marriage herself; her town listens to her | 16-19 | Lynn Cohick, Women in the World of the Earliest Christians (Baker Academic, 2009), as reported | Search: englewoodreview.org; cbeinternational.org review; scotmcknight.substack.com. Met only in reviews, so Cohick is not named on the page (no secondhand authority); the point is given to "some scholars who study women in the ancient world" |
| The noon hour as evidence of shunning: the text does not say | 16-19 | Repository deep note (`cultural`, `teach.pitfalls`) | Repository |
| Deuteronomy 18:15, 18 | 16-19 | BSB | BSB text |
| "Woman" a polite address | 20-26 | Earlier ledger (John 2: NET note) | Earlier ledger |
| Taheb, "the one who returns" or "Restorer", a figure built on the prophet like Moses, in later Samaritan writings; how early the name was used not certain | 20-26 | Reference works | Search: livius.org "The Samaritan Prophet"; israelite-samaritans.com; en.wikipedia.com Samaritanism. Marqah and his date not confirmed, not named |
| Egō eimi in 4:26; the "I am" background debated | 20-26 | Greek text in the repository; book page ledger | Script; earlier ledger |
| Genesis 12:3; Isaiah 2:3; 1 Kings 8:27; John 14:6; 3:5-8 | 20-26 | BSB | BSB text |
| "Spirit": human spirit or Holy Spirit; many hold both | 20-26 | Repository deep note (`teach.pitfalls`) | Stated as views |
| Mishnah Avot 1:5 (written down around 200): Yose ben Yohanan of Jerusalem advises men not to talk much with women | 27-38 | Mishnah | Search: sefaria.org sheets; en.wikisource.org Avot 1:5; myjewishlearning.com. Paraphrased and marked as later; "how far it reflects Jesus' day is not certain" |
| Grain sown in late autumn, reaped in spring | 27-38 | Repository deep note (`cultural`) | Kept general ("months later"); no month count beyond the verse |
| Amos 9:13; Micah 6:15; Acts 8:5-6 | 27-38 | BSB | BSB text |
| "Savior of the world" used of emperors from Julius Caesar to Hadrian; Koester, JBL 109 (1990) 665-680 | 39-42 | Koester's abstract | Search: digitalcommons.luthersem.edu (abstract and citation); Richey (2007) citing it |
| Isaiah 49:6 (in two quotations); Isaiah 45:22; 1 John 4:14 not used | 39-42 | BSB | BSB text |
| Basilikos "king's man"; Herod Antipas called king (Mark 6:14) | 43-54 | Greek text in the repository; BSB | Script; BSB text |
| "You people": verse 48 plural (idēte, pisteusēte) | 43-54 | Greek text in the repository | Script |
| Psalm 107:20; 1 Kings 17:23; Mark 6:4; Luke 4:24; Matthew 8:5-13; Luke 7:1-10 | 43-54 | BSB | BSB text |
| Which hometown (Judea or Galilee); one event or two with the centurion | 43-54 | Repository deep note | Stated as views, "These notes do not settle it" |

Left out: Josephus on the route (Antiquities 20.118 as a custom; Life 269, three days) and the Ginea date; Magen's fifth-century precinct; the Samaritan Pentateuch at Deuteronomy 27:4; Marqah; the Passover sacrifice on Gerizim today; the 2007 church over the well and Jerome; m. Sheviit 8:10, m. Niddah 4:1 and Sirach 50:25-26; Alter's betrothal type-scene; Heracleon, Origen, Chrysostom and Augustine on the woman; the symbolic reading of the five husbands (Augustine as reported; Schneiders); Photini and the Eastern feast (searched and found, but kept out to keep the note on the text); Duccio and Bonar; Brown's Samaritan-converts theory; the miles from Cana to Capernaum.

## The plain notes on John 5 (2026-11-19)

`client/public/bible/notes/john/plain/5.json`. 5 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| The feast unnamed | 1-9 | BSB 5:1 | BSB text; no proposals named |
| Two pools separated by a rock wall near St Anne's; colonnades on four sides and one across the wall make five; once thought symbolic (five books of Moses); many now take it as John's pool, details debated | 1-9 | Excavations as reported | Search: en.wikipedia.org Pool of Bethesda; ferrelljenkins.blog; carleton.ca. Earlier ledger (John's book page) for "widely taken to be". Schick, the White Fathers and the copper scroll not used |
| Healing shrine of Asclepius (and Serapis) at the site in Hadrian's city after 135; whether a cult was there in Jesus' day not certain | 1-9 | Excavations as reported | Search as above. Stated as uncertain |
| 5:3b-4 absent from P66, P75, Sinaiticus, Vaticanus; the KJV prints it; most textual scholars think it added | 1-9 | Repository `text` (John intro); manuscript surveys | Search: biblehub.com q pages; en.wikipedia.com John 5; Fee, EQ 1982 (biblicalstudies.org.uk) table. Alexandrinus not mentioned (results conflict). "Probably to explain verse 7" stated as what most think |
| BSB leaves verse 4 empty | 1-9 | Repository Bible text | Script |
| Deuteronomy 2:14 echo possible, not drawn by John; Isaiah 35:6 | 1-9 | BSB; repository deep note | BSB text |
| "Do you want to get well?" not blame; healing without a right answer or faith | 1-9 | Repository `teach.pitfalls` | Repository |
| "The Jews" here the Jerusalem authorities; misuse wrong; book page pointer | 10-18 | Book page part "The Jews in John"; repository `historical` | Repository |
| Mishnah Shabbat 7:2 (written down around 200): thirty-nine main kinds of work, the last carrying from one domain to another | 10-18 | Mishnah | Search: jtsa.edu Mishnah Shabbat 7:2; cojs.org; steinsaltz-center.org. Marked as later |
| Genesis 2:2; Exodus 20:8; Jeremiah 17:21 | 10-18 | BSB | BSB text (Exodus 20:10 not quoted: it holds an em-dash) |
| Philo, Allegorical Interpretation 1.5: God never ceases making, as it is the nature of fire to burn | 10-18 | Philo, Yonge translation (1854) | Search: earlychristianwritings.com yonge book2; ccel.org; fgh.perseids.org. Paraphrased |
| 5:14 not a teaching that the illness was punishment; 9:2-3; Luke 13:2-3 | 10-18 | BSB; repository `teach.pitfalls` and `pastoral` | BSB text |
| A son learned the father's trade by watching | 19-24 | Repository `cultural` | Common background; Dodd not named |
| Mishnah Berakhot 5:5: a man's agent is like himself | 19-24 | Mishnah; Jewish Encyclopedia "Agency, Law of" (Kiddushin 41b) | Search: sefaria.org sheet quoting the prayer-leader passage; jewishencyclopedia.com. Marked as later |
| Deuteronomy 32:39; 1 Samuel 2:6; Isaiah 42:8 | 19-24 | BSB | BSB text |
| Arius in the fourth century; Nicaea 325 and Constantinople 381; creed wording "very God of very God, begotten, not made, being of one substance with the Father" | 19-24 | The site's Nicene Creed page (`client/public/creeds/documents/nicene-creed.json`) | Repository; wording copied |
| Daniel 7 background of "Son of Man"; Daniel 12:2; Ezekiel 37:12 | 25-30 | BSB; earlier ledger (Mark 2) | BSB text |
| 6:29; 3:21 for verse 29 | 25-30 | BSB | BSB text |
| Two or three witnesses (Deuteronomy 19:15); Deuteronomy 4:12; Exodus 33:20; Luke 24:27 | 31-40 | BSB | BSB text |
| Exodus 32:11; Deuteronomy 18:15; 31:26; Numbers 21:8-9; 1:45 | 41-47 | BSB | BSB text |

Left out: the feast proposals (Irenaeus, Chrysostom); the Sheep Gate's name; the spellings Bethzatha and Bethsaida and Josephus's Bezetha; the copper scroll; Gibson and von Wahlde on a ritual pool; m. Shabbat 10:5; m. Yoma 8:6; Philo 1.49 and 2 Maccabees 9:12; Dodd's apprenticed son by name; m. Ketubbot 2:9; Hillel in m. Avot 2:7; Baruch 4:1; Psalm 132:17 and Sirach 48:1; Ruether, Reinhartz, the Pontifical Biblical Commission; Athanasius, Hilary, Augustine and Bauckham by name; the 2016 debate on the Son's eternal submission.

## The plain notes on John 6 (2026-11-19)

`client/public/bible/notes/john/plain/6.json`. 7 web searches, with the earlier ledger (Mark 6, Matthew 14, Mark 14, Matthew 26).

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Denarius, wilderness, twelve baskets; told in all four Gospels | 1-15 | Earlier ledger (Mark 6; Matthew 14) | Earlier ledger; pointers to those notes |
| Barley cheaper than wheat, the bread of poorer people | 1-15 | Encyclopedias | Search: encyclopedia.com "Barley" and "Bread"; thecollector.com (Pliny on barley bread). m. Ketubbot 5:8 not confirmed, not cited |
| Prophet like Moses (Deuteronomy 18:15) | 1-15 | Earlier ledger (Matthew 11) | Earlier ledger |
| Crown of thorns (19:2); 18:36 | 1-15 | BSB | BSB text |
| Exodus 16:4; 2 Kings 4:42-43 | 1-15 | BSB | BSB text |
| "Did this really happen" pointer to the Matthew 14 note and its last sentence | 1-15 | Matthew 14 plain note | Repository |
| Twenty-five or thirty stadia; a stadion a little under 200 metres | 16-21 | Greek text in the repository; standard measure (about 185 m) | Script; common reference fact |
| Egō eimi "It is I" or "I am"; background debated | 16-21 | Earlier ledger (Mark 6; book page) | Earlier ledger |
| Job 9:8; Psalm 77:19; Psalm 107:30 | 16-21 | BSB | BSB text |
| Psalm 78:24; Exodus 16:4, 15; Deuteronomy 8:3; Isaiah 55:2 | 22-34 | BSB | BSB text |
| Seven "I am" sayings with a picture (6:35; 8:12; 10:7; 10:11; 11:25; 14:6; 15:1) | 35-40 | BSB | BSB text |
| Ou mē ekbalō, a double negative (6:37) | 35-40 | Greek text in the repository | Script |
| Isaiah 55:1, 11 | 35-40 | BSB | BSB text |
| "The Jews" in 6:41 a Capernaum synagogue audience; 6:59; 6:60 | 41-51 | BSB; book page; repository `teach.pitfalls` | Repository |
| Exodus 16:2; Isaiah 54:13 | 41-51 | BSB | BSB text |
| Helkuō in 6:44 and 12:32 | 41-51 | Greek text in the repository | Script |
| Election views: God's choosing; human response (12:32); Catholic and Orthodox grace first and the answer free; shared ground; "open for discussion and not a cause for division" | 35-51 | Wording of the Mark 4 and Matthew 11 notes; repository `hard` | Repository; no names |
| Phagō to 6:53, trōgō from 6:54 | 52-59 | Greek text in the repository | Script |
| Leviticus 17:11; Genesis 9:4 | 52-59 | BSB | BSB text |
| John has no words over the bread and cup | 52-59 | Book page ledger | Earlier ledger |
| Catholic and Orthodox eucharistic reading; Catechism of the Catholic Church 1336: "the first announcement of the Eucharist" | 52-59 | CCC 1336; Mark 14 note wording | Search: usccb.org Catechism flipbook p. 340; intratext.com; catholicculture.org. Orthodox reading from the repository `hard` and the Mark 14 wording |
| Lutheran: true presence in, with and under, resting on "This is My body"; many Lutheran teachers read John 6 as about faith, some see the Supper | 52-59 | Mark 14 note wording; Lutheran writers | Search: steadfastlutherans.org "Twice More to John 6"; forwardinchrist.net (WELS) Q&A; christiannewsmissouri.com on Weinrich. Luther's own words met only in secondary citations, so he is not quoted or named for them |
| Calvin, Commentary on John 6: the passage not about the Supper but the continual communication of Christ's flesh by faith; what it says is figured and given in the Supper | 52-59 | Calvin's commentary | Search: ccel.org calvin comment3 vol34 xii.ix. Paraphrased |
| Memorial reading; verses 35 and 47 | 52-59 | Mark 14 note wording; BSB | BSB text |
| Marburg, 1529: 6:63 pressed by the Swiss side (Oecolampadius, Zwingli) | 52-59 | Accounts of the colloquy | Search: courses.washington.edu "The Marburg Colloquy, 1529"; germanhistorydocs.org (Osiander's report); christianhistoryinstitute.org |
| Readings of 6:63 | 60-71 | Repository `hard` | Stated as views |
| Mark 8:33; 13:27 | 60-71 | BSB | BSB text |
| Judas: views, no verdict on his end | 60-71 | Matthew 26 and 27 notes' stance | Repository |

Cut: Augustine's "believe, and you have eaten" (Tractates on John 25.12) was searched twice and found only in secondary citations, so neither the line nor his name is used; Luther's own statements on John 6 (secondary only); m. Ketubbot 5:8; the fish as dried or salted; Taricheae; Juvenal's baskets; Wisdom 16:20-26 and Philo on the manna; Ignatius, Chrysostom, Bultmann, Brown and Carson; Arminius and Wesley by name; the reading of 6:66 by its number.

## The plain notes on John 7 (2026-11-19)

`client/public/bible/notes/john/plain/7.json`. 5 web searches. 7:53 is covered only by a pointer (the woman caught in adultery is for the chapter 8 run); the validator needs the passages to reach the chapter's last verse.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| "The Jews" in 7:1 the Judean leaders; in 7:13 Jews afraid of "the Jews", so the authorities; 9:22; 20:19; 19:38 | 1-13 | BSB; book page part on "the Jews" | BSB text; repository |
| Tabernacles: booths, wilderness, harvest, joy; Leviticus 23:42-43; Deuteronomy 16:14 (cut before its em-dash); law read every seventh year (Deuteronomy 31:10-11) | 1-9 | BSB; book page ledger | BSB text |
| The brothers: three readings in the Mark 3 note; Acts 1:14; 1 Corinthians 15:7; Galatians 1:19; Acts 15:13 | 1-9 | BSB; Mark 3 plain note | BSB text; repository |
| 7:8 "not yet" in P66, P75 and Vaticanus; most think it a scribe's easing, a few think it original; readings of "not going up" | 1-9 | Metzger as quoted; Mounce | Search: billmounce.com and zondervanacademic.com "Did Jesus Lie? (John 7:8)"; ibiblio b-greek (Metzger quoted); cambridge.org excerpt. Porphyry and Jerome were met only in one scholarly excerpt, so they are not named |
| Deuteronomy 13:1-5 behind "He deceives the people" | 10-13 | BSB | BSB text |
| Teacher's authority from the teacher he trained under; Acts 4:13 | 14-24 | Repository `cultural`; BSB | Kept general |
| Circumcision on the eighth day overrides the Sabbath: Mishnah Shabbat 19 (written down around 200) | 14-24 | Mishnah | Search: sefaria.org.il Mishnah Shabbat 19; cojs.org "Mishnah Shabbat 18-19". Marked as later; no single mishnah number given |
| Leviticus 12:3; Genesis 17:12; Deuteronomy 1:16-17; Isaiah 11:3 | 14-24, 45-53 | BSB | BSB text |
| Justin, Dialogue with Trypho 8: Trypho says the Christ, if born, is unknown and has no power until Elijah anoints him and makes him known | 25-36 | Justin | Search: bkv.unifr.ch (ANF translation); logoslibrary.org; biblehub.com library. Paraphrased and marked as later. 1 Enoch and 4 Ezra not used |
| Jews dispersed among the Greeks | 25-36 | BSB 7:35 | BSB text |
| Micah 5:2 (quoted only before its em-dash); "from the days of eternity" | 25-36, 40-44 | BSB | BSB text |
| Water from Siloam poured at the altar (Sukkah 4:9); lamps in the Court of the Women (5:2-4); "whoever has not seen the rejoicing at the water-drawing has never seen rejoicing" (5:1); how much was done in Jesus' day not certain | 37-39 | Mishnah | Book page ledger; search: mishnah.org Sukkah 5:1; jewishvirtuallibrary.org Sukkah 5; posenlibrary.com. Paraphrased |
| Oupō gar ēn pneuma, "given" supplied; 20:22; Acts 2:33 | 37-39 | Greek text in the repository; BSB | Script; BSB text |
| Possible Scriptures: Zechariah 14:8, 16; Ezekiel 47:1; Isaiah 58:11; 12:3; Psalm 78:16; Exodus 17:6 | 37-39 | NET note; SIL translator's notes | Search: biblia.com NET note John 7:37-38; tips.translation.bible SIL note; craigkeener.com. "Later read at this feast" (Keener) not used |
| Punctuation: no punctuation in the oldest copies; streams from the believer (BSB and most Bibles) or from Jesus; 2:21; 19:34; early teachers divided | 37-39 | NET note | Search as above. "These notes do not choose" |
| Bethlehem and David: Matthew 2:1; Luke 2:4; 2 Samuel 7:12; Isaiah 9:1; Matthew 4:15; irony or indifference as views | 40-44 | BSB; repository `hard` | BSB text; scholars not named |
| Officers probably the temple guard | 45-53 | Repository deep note | "Probably" |
| Jonah from Gath-hepher in Galilee (2 Kings 14:25) | 45-53 | BSB; NET note on 7:52 | BSB text; search: biblia.com NET note |
| 7:53 belongs with 7:53 to 8:11, absent from the oldest copies | 45-53 | Book page ledger | Earlier ledger |
| 19:38-39 | 45-53 | BSB | BSB text |

Left out: Porphyry and Jerome on 7:8; P66's "the prophet" at 7:52 (not found); b. Sukkah 27b; 1 Enoch 48:6; 4 Ezra 13:52; the Jerusalem Talmud on drawing the Holy Spirit; the willow branches and the shofar; Josephus on the feast as the greatest; Baur, Bultmann, Barrett, Bruce and Carson by name; b. Yoma 85b.

## The plain notes on John 8 (2026-11-19)

`client/public/bible/notes/john/plain/8.json`. 7 web searches. The passages start at 8:1; 7:53 stays in chapter 7's last passage as a pointer.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| The woman's story: not in P66, P75, Sinaiticus, Vaticanus; first Greek copy Codex Bezae (fifth century); placed after 7:36, at the end of John, after Luke 21:38; Jerome kept it and said many Greek and Latin copies had it | 1-11 | Book page | Book page ledger, same wording |
| Eusebius reports that Papias told a story of a woman accused of many sins before the Lord (Church History 3.39.17); commonly linked to this story; may have differed in detail | 1-11 | Eusebius | Search: bkv.unifr.ch NPNF Eusebius 3.39 and Papias fragments; biblicaltraining.org. Paraphrased |
| Views: an ancient true story not originally here (common); a few hold it original; some would not preach it as Scripture in the full sense; the Catholic Church accepts it as canonical | 1-11 | NAB note as cited; Akin; catholic.com; Themelios "Text Criticism and the Pulpit" | Search: jimmyakin.com; catholic.com "The Adulteress and the Gospel"; thegospelcoalition.org Themelios 45.2. Trent's "with all their parts" not used (its reach is disputed). No scholar named |
| Both parties to die (Leviticus 20:10; Deuteronomy 22:22); two or three witnesses, witnesses' hands first (Deuteronomy 17:6-7); Jeremiah 17:13; Exodus 20:14; John 18:31 | 1-11 | BSB | BSB text. Leviticus 20:10 quoted only after its em-dash |
| What he wrote is unknown; suggestions (the accusers' sins; Jeremiah 17:13; refusal) | 1-11 | Deep note | Stated as suggestions; Jerome not named (not checked) |
| Mishnah (around 200) lamps in the Court of the Women; uncertain for Jesus' day; the treasury chests probably in that court | 12-20 | Earlier ledger (Sukkah 5:2-4); Easton's; Encyclopedia of the Bible "Treasury" | Search: biblegateway.com Easton "Treasury"; biblegateway Encyclopedia of the Bible "Treasury of the Temple". "Probably" |
| 5:31 and 8:14 | 12-20 | BSB | BSB text |
| Egō eimi in 8:24, 28, 58 and 9:9; the BSB supplies "He"; Greek OT echo debated (Exodus 3:14 or Isaiah 43:10) | 21-30, 48-59 | Greek text in the repository; earlier ledger (book page) | Script; earlier ledger |
| "Lifted up" 3:14, 8:28, 12:32 | 21-30 | Earlier ledger (book page) | Script |
| "The truth will set you free" carved in the lobby of the CIA's Original Headquarters Building | 31-38 | cia.gov "Bible Quote Carving" | Search: cia.gov/legacy/headquarters/bible-quote-carving. University mottoes not used (not checked) |
| Exodus 20:2; Leviticus 25:42; Genesis 12:3; Romans 6:17-18; John 14:6 | 31-38 | BSB | BSB text |
| 8:44 used to call Jews children of the devil; Nazi children's book (Der Giftpilz, Stürmer press, 1938) | 39-47 | German Propaganda Archive (Calvin University) "What Christ Said about the Jews"; relbib.de article "The Jews as 'Children of the Devil' (John 8:44) in Nazi Children's Literature" | Search: research.calvin.edu/german-propaganda-archive/story14.htm; relbib.de. Luther and Origen not named (met only in summaries) |
| Misuse paragraph in the Mark 15 and Matthew 27 wording; "This site rejects it"; "Never a word against the Jewish people" (book page hard line); Nostra Aetate 4 (1965) "the Jews should not be presented as rejected or accursed by God, as if this followed from the Holy Scriptures" | 39-47 | Earlier ledger (Matthew 21 and 27, Mark 15) | Earlier ledger |
| Community Rule (1QS): love the sons of light, hate the sons of darkness; Levites curse the men of the lot of Belial; outsiders, fellow Jews included | 39-47 | 1QS 1:9-10; 2:4-5 | Earlier ledger (Matthew 5); search: hts.org.za article; magazine.israelbiblecenter.com "Love and Hate at Qumran"; cojs.org. No column given on the page |
| Ancient invective conventional between rival groups | 39-47 | Johnson, JBL 108 (1989) 419-441, as summarised | Search: themelios (Motyer); library.biblicalarchaeology.org endnote. Met only in summaries, so Johnson is not named; stated as what scholars of ancient argument note |
| Isaiah 1:4; Genesis 15:6; Genesis 3:4; Mark 8:33; John 6:70; 1 John 3:8, 10; John 4:22; John 5:19 | 39-47 | BSB | BSB text |
| 4 Ezra 3:14: God loved Abraham and showed him the end of the times secretly by night; written near the end of the first century | 48-59 | 2 Esdras 3:14 (RSV) | Search: biblestudytools.com RSV; biblia.com; Encyclopedia of the Bible "Second Esdras". Paraphrased, marked as later. Jubilees not used |
| Exodus 3:14; Psalm 90:2; Isaiah 43:10; 41:4; Deuteronomy 32:39; Leviticus 24:16; Genesis 22:8; Numbers 21:9 | 21-30, 48-59 | BSB | BSB text. Isaiah 41:4 quoted only after its em-dashes |
| Nicene Creed in the site's older English wording | 48-59 | John 5 plain note | Repository |

Re-check of 8:44 (2026-11-19, before John 12): the sentence "In the 1930s Nazi propaganda put it in a book for German children" rests on the Der Giftpilz row above, not on Elvira Bauer's book of 1936. One new search confirmed it: the German Propaganda Archive (Calvin University) gives the story "What Christ Said about the Jews" from Ernst Hiemer, Der Giftpilz (Nuremberg: Stürmerverlag, 1938), Julius Streicher's press, in which a mother tells her children at a roadside crucifix that Jesus told the Jews their father is the devil, and that they are children of the devil. Search: research.calvin.edu/german-propaganda-archive/story14.htm (as described in the result; the page itself could not be fetched from here); jewishvirtuallibrary.org "Der Giftpilz". 1938 is within "the 1930s"; the sentence stands unchanged. Bauer's 1936 book is not named on the page and was not checked for this verse.

Cut: Jerome on what Jesus wrote; the Didascalia; Didymus; Augustine's "misery and mercy"; Trent by name; Luther's On the Jews and Their Lies (met only in summaries); Celsus on 8:41; Josephus on Eleazar at Masada; m. Ketubbot 2:9; Jubilees on Abraham; the Levites' age of fifty; Johns Hopkins; the 8:25 alternative renderings; the New World Translation at 8:58; Luke Timothy Johnson, Reinhartz and Ruether by name.

## The plain notes on John 9 (2026-11-19)

`client/public/bible/notes/john/plain/9.json`. 6 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Babylonian Talmud, Shabbat 55a-b: Rav Ami's "no death without sin, no suffering without iniquity", then refuted | 1-7 | b. Shabbat 55a-b | Search: halakhah.com Shabbath 55; sefaria.org.il Shabbat 55b; etzion.org.il "Is there Suffering Without Sin?". Paraphrased, marked as written down centuries after Jesus. Genesis Rabbah on prenatal sin not used |
| Job 42:7; Exodus 20:5; Ezekiel 18:20; Leviticus 19:14; Isaiah 35:5; Psalm 146:8; Genesis 2:7 | 1-7 | BSB | BSB text |
| Tacitus, Histories 4.81: in Alexandria a blind man asked Vespasian to moisten his eyes with spittle (AD 69-70) | 1-7 | Tacitus | Search: penelope.uchicago.edu Thayer (Loeb); sacred-texts.com; en.wikipedia.org "Fasting spittle". Paraphrased; "around AD 70" |
| Siloam: stepped pool found in 2004; many take it as the pool of the story; "Sent" (9:7) | 1-7 | Earlier ledger (book page) | Earlier ledger |
| 9:3-4 punctuation: no punctuation in the oldest copies; a full stop after "sinned" proposed, so the purpose clause goes with "we must work" | 1-7 | Poirier (NTS 1996; Filologia Neotestamentaria 2006; 2010); Derrett (FN 2003) for a third reading | Search: bsw.org Filologia Neotestamentaria vol. 19 and vol. 16. Stated as "some scholars propose"; no name given |
| Egō eimi in 9:9 | 8-17 | Greek text in the repository | Script |
| Mishnah Shabbat 7:2 (around 200): thirty-nine main kinds of work, kneading among them | 8-17 | Mishnah | Earlier ledger (Mark 2; Matthew 12); search: jtsa.edu Mishnah Shabbat 7:2; cojs.org; en.wikipedia.org 39 Melakhot. "Could be counted as kneading" |
| Exodus 20:9-10 (quoted before its em-dash); Deuteronomy 18:18 | 8-17 | BSB | BSB text |
| "Afraid of the Jews" means the authorities; the parents are Jews | 18-23 | Book page | Earlier ledger |
| Put out of the synagogue: 12:42; 16:2; Martyn (1968) and the prayer against heretics; many doubt the link; local exclusions in Jesus' lifetime argued plausible (Bernier, Aposynagōgos and the Historical Jesus in John, Brill 2013) | 18-23 | Earlier ledger (book page); Bernier | Search: library.arce.org and oeaw.ac.at catalogue descriptions. Bernier not named |
| Ezra 10:8; Psalm 34:18 | 18-23 | BSB | BSB text |
| "Give glory to God": Joshua 7:19 | 24-34 | BSB | BSB text |
| Amazing Grace: most likely written for 1 January 1773 at Olney; printed in Olney Hymns, 1779; "was blind, but now I see" | 24-34 | Olney heritage; hymnology archive; Museum of the Bible | Search: mkheritage.org.uk; christian.org.uk; museumofthebible.org "A Wretch Like Me". "Most likely"; that it echoes 9:25 is stated as an echo, not as Newton's source |
| Psalm 66:18; Proverbs 15:29; Isaiah 29:18; 2 Chronicles 33:12-13 | 24-34 | BSB | BSB text |
| Daniel 7:13; Isaiah 6:9; Isaiah 42:7 | 35-41 | BSB | BSB text |

Cut: Genesis Rabbah 63:6; b. Nedarim 64b; y. Shabbat 14:4; m. Yoma 8:6; m. Avot 5:21; m. Sanhedrin 6:2; Hezekiah's tunnel and its inscription; Irenaeus on the clay and Adam (the link is given only as what "some readers have noticed"); Justin and "illumination"; Augustine's allegory; the Lent readings and the Orthodox Sunday of the Blind Man; Duccio and El Greco; the 9:35 Son of God variant; the 9:38 omission; Kimelman, Reinhartz and Bernier by name.

## The plain notes on John 10 (2026-11-19)

`client/public/bible/notes/john/plain/10.json`. 6 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Folds, gatekeeper, shepherd calling and leading; sheep named | 1-6 | Deep note `cultural` (everyday practice) | Kept general; George Adam Smith and Barclay's gate story not used |
| Psalm 23:1; 95:7; 100:3; Numbers 27:17; Deuteronomy 28:6; Psalm 121:8; Ezekiel 34:2, 4, 10-11, 16, 22-23; Isaiah 40:11; 56:8; 1 Samuel 17:34-35; Deuteronomy 32:39; 6:4; Leviticus 24:16; Psalm 82:1, 6-7 | all | BSB | BSB text |
| Mishnah Bava Metzia 7:9 (around 200): a paid shepherd must fend off one wolf; two wolves count as an unavoidable accident | 11-21 | Mishnah | Search: sefaria.org.il English Explanation of Mishnah Bava Metzia 7:9; mishnah.org; fgh.perseids.org. Marked as later |
| Ezekiel 34: God himself shepherds, and one shepherd, "My servant David" | 11-21 | BSB | BSB text |
| "Other sheep": most read as Gentiles; 11:52 | 11-21 | Deep note; BSB | Stated as the common reading |
| Hanukkah means dedication; Antiochus IV's altar around 167 BC; temple rededicated 164 BC; eight days and yearly feast (1 Maccabees 4) | 22-29 | Earlier ledger (Mark 13; John's book page) | Earlier ledger |
| Josephus, Antiquities 12.325: the feast called "Lights" | 22-29 | Josephus | Search: lexundria.com Whiston 12.325; josephus.org "The Festival of the Dedication"; bibleodyssey.org. "Near the end of the first century" (Antiquities about 93) |
| Solomon's Colonnade: a roofed colonnade of the outer court, probably on the east side; Acts 3:11; 5:12 | 22-29 | Easton's; Encyclopedia of the Bible "Solomon's Porch" | Search: biblegateway Easton and Encyclopedia of the Bible; BSB. "Probably" |
| Harpazō in 10:12 and 10:28-29; hen (neuter) in 10:30 | 22-39 | Greek text in the repository | Script |
| Perseverance: Westminster Confession 17 ("can neither totally nor finally fall away from the state of grace"); Dort; 1 John 2:19. Catholic, Orthodox, Lutheran, Wesleyan and Methodist teaching that a believer can fall away; 15:6 | 22-29 | Westminster Confession; catholic.com; UMC; Lutheran symbols as summarised | Search: apuritansmind.com WCF 17; ligonier.org; catholic.com "Can Salvation Be Lost?"; umc.org; christianitytoday.com (1962). Views only; "open for discussion and not a cause for division" (John 6 wording) |
| Psalm 82's "gods": human judges; heavenly beings in God's court; later rabbinic reading, Israel at Sinai | 30-39 | Commentaries; Heiser's SBL paper | Search: christianity.com; desiringgod.org; drmsh.com SBL paper. The Talmud tractate not cited (not found) |
| Nicene Creed in the site's older English wording; 1:1; 20:28; 17:22 | 30-39 | Repository; BSB | Repository; BSB text |
| Bethany beyond the Jordan, site uncertain; 1:7, 1:28 | 40-42 | Book page | Earlier ledger |

Cut: George Adam Smith and Barclay's shepherd-as-gate; Hammurabi and Homer; the Psalms of Solomon; lēstēs and Josephus's insurgents; 2 Maccabees on the feast; the Talmud's oil story; the Mishnah's definition of blasphemy; the 10:29 variant; the KJV's "one fold"; Neyrey, 11Q13, Augustine, Calvin, Dort, Arminius and Wesley by name; the Socinians.

## The plain notes on John 11 (2026-11-19)

`client/public/bible/notes/john/plain/11.json`. 5 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Bethany "a little less than two miles" (11:18) | 1-6 | BSB | Earlier ledger (book page) |
| Al-Eizariya's name comes from Lazarus (Lazarion); the tomb pointed out since at least the fourth century | 1-6 | Robinson (1840) as cited; Eusebius and Egeria as cited; Jerome (390) on the Lazarium | Search: en.wikipedia.org Bethany and Tomb of Lazarus; dig.corps-cmhl.huji.ac.il "Lazarion". Stated as "at least the fourth century"; no single date given |
| Lazarus a Greek form of Eleazar, "God has helped" | 1-6 | ISBE; lexicons | Search: bibletools.org ISBE "Lazarus"; biblehub.com Strong's 2976; en.wikipedia.org Lazarus (name). Tal Ilan's name counts not used |
| Luke 10:38-42; 1 Kings 17:22; Isaiah 26:19; 2:4; 7:6 | 1-6 | BSB | BSB text |
| The delay: readings (purpose; the count of days; the Father's time); no verdict | 1-6 | Deep note `hard` | Stated as readings; Calvin not named |
| Daniel 12:2; 1 Thessalonians 4:13; Thomas 11:16 | 7-16 | BSB | BSB text |
| The soul near the body three days (Jerusalem Talmud, Moed Qatan 3:5; Leviticus Rabbah 18:1), written down centuries after Jesus; whether believed in his day uncertain | 17-27 | Rabbinic texts as quoted | Search: jtsa.edu (Kraemer, Hebrew and English); bibletruthpublishers.com; biblia.com (Evans). Paraphrased, marked as later and uncertain; no rabbi named |
| Pharisees taught resurrection; Sadducees denied it | 17-27 | Earlier ledger (Mark 12; Matthew 22) | Earlier ledger |
| 20:31; Matthew 16:16; Isaiah 25:8; Job 19:25 | 17-27 | BSB | BSB text |
| Apostles' Creed "the resurrection of the body, and the life everlasting" | 17-27 | The site's creed text | Repository (`client/public/studyguides/the-creeds.json`) |
| Embrimaomai: strong feeling, often anger or indignation; NET note "deeply indignant"; Mark 1:43 (stern warning) and Mark 14:5 (scolded) | 28-37 | NET note on 11:33; Thayer; Strong's | Search: biblia.com NET note; biblehub.com 1690. Greek checked in the repository. Readings of its object given as views |
| Klaiō (11:33) and dakryō (11:35); dakryō "to shed tears"; "may have been quieter" | 28-37 | Greek text in the repository; Thayer | Script; search: biblehub.com 1145. The loud/quiet contrast hedged ("may have been") |
| Psalm 56:8 (quoted before its em-dash); Isaiah 53:3; Ecclesiastes 3:4; Genesis 50:10 | 28-37 | BSB | BSB text |
| Rock-cut tombs, a stone at the entrance, strips of linen and a face cloth; 20:5-7 | 38-44 | John 11:38, 44; Mark 15:46; John 20:5-7 | BSB text |
| Ezekiel 37:12; Hosea 13:14; 12:10; Mark 5:21-43; Luke 7:11-17 | 38-44 | BSB | BSB text |
| Whether it happened: views (later growth; the Synoptics' focus; 12:10 and protection); no verdict | 38-44 | Deep note `hard` | Stated as views; Strauss, Bultmann, Bauckham and Meier not named (not checked this run) |
| Sanhedrin: chief priests, elders, teachers, gathered with the high priest | 45-53 | Mark 14:53; 15:1 | BSB text |
| Caiaphas: about AD 18 to 36 or 37, appointed and removed by Romans | 45-53 | Josephus, Antiquities 18.35, 18.95 | Earlier ledger (John's book page) |
| AD 70 destruction of Jerusalem and the temple | 45-53 | Earlier ledger (Mark 13) | Earlier ledger |
| Misuse named; Acts 4:27 (Mark 15 wording) | 45-53 | Earlier ledger | Earlier ledger |
| Exodus 28:30; Ezekiel 34:23; 10:16 | 45-53 | BSB | BSB text |
| Ephraim: site uncertain, near the wilderness, probably north of Jerusalem | 54-57 | Book page ledger (left off the map as uncertain) | "Not certain"; et-Taiyibeh not named |
| Numbers 19:11; 9:6; Passovers at 2:13, 6:4, 11:55 | 54-57 | BSB; book page ledger | BSB text; earlier ledger |

Cut: Kloner's count of rolling stones; m. Ketubbot 4:4 (flutes and wailing woman); Sirach 22:12; the Amidah; m. Sanhedrin 10:1; the ossuary of Caiaphas (not needed); 2 Maccabees 5:19; Josephus on Hyrcanus's prophecy; et-Taiyibeh; Egeria by name; Tal Ilan; the P45 reading at 11:25; Strauss, Bultmann, Hume, Bauckham and Meier by name.

## The plain notes on John 12 (2026-11-19)

`client/public/bible/notes/john/plain/12.json`. 4 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Reclining at table (12:2); feet stretched behind | 1-8 | BSB "reclining"; deep note `cultural` | Kept general |
| Nard from a Himalayan plant, costly; denarius a day's wage, 300 near a year's wages | 1-8 | Earlier ledger (Mark 14) | Earlier ledger. Pliny's prices and the litra not used |
| Mishnah Ketubbot 7:6 (around 200): a married woman going out with her head uncovered breaks Jewish custom | 1-8 | m. Ketubbot 7:6 | Search: halakhah.com Kethuboth 72; etzion.org.il Deracheha; sefaria sheets. Stated only as what the Mishnah counts for a married woman; Mary's act called bold "many readers think". "Unbound hair" (a commentary gloss) not used |
| Mark 14:3-9 and Matthew 26:6-13 (head, Simon the Leper, unnamed woman); Luke 7:36-50; same evening or two events as views | 1-8 | BSB; deep note `hard` | BSB text; Strauss, Augustine, Carson, Blomberg not named |
| Gregory the Great's sermon of 591 (Homily 33) joined Mary of Bethany, the woman of Luke 7 and Mary Magdalene; the East kept them apart; 2021 shared memorial of Martha, Mary and Lazarus on 29 July | 1-8 | Gregory, Homilies on the Gospels 33; Roman calendar decree (2021) | Search: simplycatholic.com "The Real Mary Magdalene"; stpaulcenter.com; ncregister.com (Martha, Mary and Lazarus); ewtnnews.com. The 1969 change not stated (sources disagree on what it did) |
| Deuteronomy 15:7, 15:11; Mark 14:7; 13:29; Matthew 25:40; Psalm 23:5 | 1-8 | BSB | BSB text |
| 11:48, 11:53; the high priest held office with Rome's approval | 9-11 | BSB; earlier ledger (Caiaphas appointed and removed by Romans, Josephus Antiquities 18.35, 18.95) | Earlier ledger |
| Jeremiah 1:19 | 9-11 | BSB | BSB text |
| 1 Maccabees 13:51, 141 BC, palm branches; Hosanna "save, please" and later praise; Psalm 118 at the feasts | 12-19 | Earlier ledger (Mark 11) | Earlier ledger |
| "Went out to meet" a civic welcome | 12-19 | Deep note `cultural` | Hedged "often" |
| Psalm 118:22, 26; Zechariah 9:9-10; Zephaniah 3:15; 1 Kings 1:33 | 12-19 | BSB | BSB text |
| Greeks are Gentiles; outer court; the warning sign found 1871 | 20-26 | Earlier ledger (Mark 11, Temple Warning inscription) | Earlier ledger |
| Genesis 29:30-31 ("loved Rachel more than Leah"; "unloved"; KJV "hated"); Matthew 10:37; Isaiah 2:3; 53:10 | 20-26 | BSB; KJV | BSB text; KJV wording standard |
| Dostoevsky set 12:24 as the epigraph of The Brothers Karamazov (1880) | 20-26 | The novel's front matter | Search: standardebooks.org Garnett text; shmoop.com; Kroó, Problems of Historical Poetics (2022). Year 1880 as in the deep note (book publication) |
| Help wording for a reader with thoughts of not living | 20-26 | The site's answer "Is my anxiety a spiritual failure?" (`client/src/data/answers.ts`) | Copied word for word, as in Matthew 6 |
| Mark 14:34-35; Psalm 89:36; Numbers 21:9; 3:14; Isaiah 52:13; 53:5; Exodus 19:19; 11:33; 3:19 | 27-36 | BSB | BSB text |
| "Lifted up" double meaning; 12:33 | 27-36 | Book page | Book page wording |
| Qumran: "sons of light" | 27-36 | Earlier ledger (1QS 1:9-10, Matthew 5 and John 8) | Earlier ledger |
| Chrysostom, Homily 68 on John: "because" refers to the event, not the cause; "could not" put for "would not" | 37-43 | Chrysostom | Search: newadvent.org/fathers/240168.htm; st-takla.org NPNF; catenabible.com. Paraphrased; "a preacher of the late 300s" as in earlier notes |
| Augustine, Tractate 53 on John: they could not because they would not; God foresaw it | 37-43 | Augustine | Search: newadvent.org/fathers/1701053.htm. Paraphrased |
| Isaiah 53:1; 6:1, 6:10; 52:13; Mark 4:12; Matthew 13:14-15; views worded as in the Mark 4 and Matthew 13 notes | 37-43 | BSB; earlier notes | BSB text |
| Synagogue exclusion: book page and 9:22 note wording | 37-43 | Earlier ledger (John 9) | Earlier ledger |
| Deuteronomy 18:18-19; 3:17-19 | 44-50 | BSB | BSB text |

Cut: Pliny on nard; the litra; Josephus's lamb count; Egeria and the Palm Sunday procession; Theodulf; b. Sanhedrin 98a and Rashi on Zechariah 9:9; the bat qol; the Targum of Isaiah; Craig Evans, Bauckham, Reinhartz, Erasmus, Luther and Calvin by name; the 1969 calendar change; Giotto and Duccio; the 12:32 "all things" variant.

## The plain notes on John 13 (2026-11-19)

`client/public/bible/notes/john/plain/13.json`. 4 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Foot washing a basic courtesy; guests often washed their own feet; when another did it, usually a slave or low servant; the lower for the higher | 1-11 | J. C. Thomas, Footwashing in John 13 and the Johannine Community (Sheffield thesis 1990; book 1991): hospitality, love, servitude; Pilch and O'Loughlin as summarised | Search: etheses.whiterose.ac.uk/3505 (thesis summary); research.bangor.ac.uk; liturgy.slu.edu cultural context; praytellblog.com. No scholar named on the page; "normally" and "usually". The Mekilta on Exodus 21:2 was searched and not confirmed, so it is not used |
| 1 Samuel 25:41; Genesis 18:4; Exodus 30:19; Psalm 51:7 | 1-11 | BSB | BSB text |
| John's "just before the Passover" and the Synoptic Passover meal: views (reckoning, calendars, theological shaping), open | 1-11 | Deep note `hard` | Views only; Jeremias, Brown, Meier, Jaubert, Humphreys, Carson, Blomberg, Ehrman not named |
| Foot washing kept as an ordinance by the Church of the Brethren, many Mennonite churches, Seventh-day Adventists, Free Will Baptists; Catholic Holy Thursday washing not required | 1-11 | Mennonite Church USA and the Mennonite Encyclopaedia; Brethren summary; Adventist Review; Christianity Today (2024); NAFWB statement (via Wikipedia's list); Diocese of Little Rock | Search: christianitytoday.com 2024 "footwashing maundy thursday"; amnetwork.uk Mennonite Encyclopaedia; adventistreview.org; dolr.org. "Many Mennonite churches" (practice varies) |
| Teacher and Lord; egō eimi in 13:19 | 12-20 | BSB; Greek text in the repository | Script |
| Psalm 41:9; 55:12; 2 Samuel 15:31; 18:23 | 12-31 | BSB | BSB text |
| Showing the sole of the foot an insult in much of the Middle East | 12-20 | Deep note `cultural` | Stated as "some readers think it may also picture" |
| Not a command to stay under abuse; seeking safety is not disobedience (John 18:23) | 12-20 | Earlier notes (Matthew 5 care line) | Repository |
| The beloved disciple: 19:26-27, 20:2-10, 21:7, 21:20, 21:24; the church's answer from the late second century; John the elder; "rests on the memory of someone who was there" | 21-30 | Book page `who` | Book page wording |
| Reclining on the left elbow; the morsel a host's mark of friendship ("many readers think"; "whether or not that was a custom") | 21-30 | Deep note `cultural` | Hedged |
| Luke 22:3; 12:6; Matthew 27:3-5; "These notes do not say what God did with Judas. That belongs to God." | 21-30 | BSB; Matthew 27 note | BSB text; Matthew 27 wording |
| Maundy from Latin mandatum, first word of 13:34 in the Vulgate; sung at the foot washing ("most scholars think") | 31-35 | Word origin | Search: wordorigins.org; christiantoday.com; ncregister.com; Guéranger as cited. The alms-basket theory exists, hence "most scholars think" |
| Leviticus 19:18, 34; 1 John 2:7-8; "little children" in 1 John (2:1, 2:12, 2:28, 3:7, 3:18, 4:4, 5:21); Matthew 5:44; Luke 10:29-37 | 31-35 | BSB | BSB text |
| 18:10; Mark 14:30; 21:15-19; Luke 22:32; Matthew 26:75; 1 Kings 19:3-8, 15; Psalm 34:18 | 36-38 | BSB | BSB text |

Cut: the Mekilta on the Hebrew slave (not confirmed); Joseph and Aseneth; m. Berakhot 5:5 on agents; 1QH on Psalm 41; the cockcrow watch and m. Bava Kamma 7:7; the meanings of Iscariot and the sicarii; Irenaeus, Bauckham, Hengel and Lazarus as candidates by name; the Gospel of Judas, Borges, Maccoby, Barth; the 13:10 short reading; the KJV's "supper being ended".

## The plain notes on John 14 (2026-11-19)

`client/public/bible/notes/john/plain/14.json`. 4 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Monai (14:2) and monēn (14:23); paraklētos (14:16, 26); orphanous (14:18); meizōn (14:28) | all | Greek text in the repository | Script |
| "My Father's house": family household around a courtyard ("often"), or the temple (2:16) | 1-4 | Deep note `cultural`; BSB | Hedged. The Jewish wedding-custom reading not used (its sources are much later) |
| KJV "many mansions" from the Latin mansiones; Tyndale's English New Testament used "mansions"; older English sense a dwelling | 1-4 | Commentaries; OED as cited | Search: biblehub.com commentaries 14:2; sharperiron.org (Kutilek); tips.translation.bible. Dated "in the 1520s" (sources give 1525 or 1526) |
| Psalm 27:4; 23:6; 11:33; 12:27; 13:21 | 1-4 | BSB | BSB text |
| Seven "I am" sayings with a picture | 5-7 | Book page | Book page wording |
| Acts 9:2 ("the Way"); Acts 4:12; Isaiah 35:8; 1:1 | 5-7 | BSB | BSB text |
| 14:6 views on those who never heard: pointer to the site's answers "Is Jesus really the only way to God?" and "What about those who never heard of Jesus?" (`client/src/data/answers.ts`); "whoever comes to the Father comes through Christ", "more than one view" | 5-7 | The site's answers | Repository; no view taken |
| Exodus 33:18, 20; 1:18; 1 John 5:14; Mark 14:36; Acts 2:41 | 8-14 | BSB | BSB text |
| "Ask in My name": no prosperity reading; Mark 11 and Matthew 7 wording | 8-14 | Earlier notes | Repository |
| Paraklētos: one called alongside; legal advocate or supporter; Advocate, Helper, Comforter, Counselor | 15-24 | Lexicons (Strong's, HELPS, Thayer as summarised); Faithlife Study Bible sidebar | Search: blueletterbible.org G3875; biblehub.com 3875; biblia.com FSB "Parakletos"; freebiblecommentary.org |
| 1 John 2:1 (advocate); 15:26; 16:13; Ezekiel 36:27; Jeremiah 31:33; Psalm 68:5; Luke 6:16; Matthew 10:3; Mark 3:18 | 15-24 | BSB | BSB text |
| Nicene Creed in the site's older English wording: "the Lord and Giver of Life", "who with the Father and the Son together is worshipped and glorified"; "very God of very God, begotten, not made, being of one substance with the Father" | 15-31 | `client/public/creeds/documents/nicene-creed.json` | Repository; wording copied |
| Shalom: wholeness, the ordinary greeting | 25-31 | Earlier ledger (Matthew 10) and deep note | Kept general |
| Rome's boasted peace kept by armies | 25-31 | Deep note `cultural` (Pax Romana) | Stated generally, no date or source named |
| 2:22, 12:16; Isaiah 9:6; 26:3; Numbers 6:26 | 25-31 | BSB | BSB text |
| Arius in the early 300s: the Son had a beginning; his followers cited 14:28 | 25-31 | Earlier ledger (Matthew 24, John 5); search | Search: jimmyakin.com; logos.com (Horton); answering-islam.org notes Arian use |
| Jehovah's Witnesses read 14:28 as the Son not equal to God | 25-31 | Watchtower Research Guide note (mirror): the Father's greatness, authority and superior position | Search: wol mirror (wol.pr418.com); jimmyakin.com; christianministriesintl.org. Stated as their reading; no quotation |
| Council of Nicaea 325 | 25-31 | Earlier ledger | Earlier ledger |
| Athanasian Creed: "equal to the Father, as touching his Godhead; and inferior to the Father, as touching his Manhood" | 25-31 | `client/public/creeds/documents/athanasian-creed.json` | Repository; wording copied |
| Augustine, On the Trinity 1.7.14: "greater" said of the form of a servant (Philippians 2:6-7) | 25-31 | Augustine | Search: biblehub.com library On the Holy Trinity ch. 7; bkv.unifr.ch. Paraphrased |
| The Father as source of the Son, not greater in being | 25-31 | Deep note `hard` | Stated as "others add"; Gregory of Nazianzus (Oration 30.7) searched and not confirmed, so not named |
| 17:5; 20:28; Philippians 2:7 | 25-31 | BSB | BSB text |
| Anxiety care line: the help wording of the site's answer "Is my anxiety a spiritual failure?" copied word for word | 25-31 | `client/src/data/answers.ts`; Matthew 6 note | Repository |

Cut: Hick, Rosenzweig, Newbigin, Nash, Pinnock, Lumen Gentium 16 by name (the site's answers carry the views); the Jewish wedding custom; Plato's Phaedo on orphans; the farewell-speech form and the Testaments of the Twelve Patriarchs; 1QS on the two spirits; m. Avot 4:11 (praqlit); m. Berakhot 5:5; Gregory of Nazianzus, Eunomius and Calvin by name; the Pax Romana by name.

## The plain notes on John 15 (2026-11-19)

`client/public/bible/notes/john/plain/15.json`. 5 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| The golden vine over the sanctuary gate of Herod's temple; clusters "as tall as a man" | 1-4 | Josephus, Jewish War 5.210 (and Antiquities 15.395) | Search: lexundria.com War 5.210 (Whiston); ccel.org; avande1.sites.luc.edu Antiquities 15. The height is in the War account only, so the page says "he says" and gives no reference to Antiquities |
| "True" as the reality earlier things pointed to (6:32) | 1-4 | BSB; deep note `hard` | Kept as the notes' reading; no scholar named |
| Kathairei (15:2) and katharoi (15:3); airei (15:2); menō ten times in 15:1-10 | 1-10 | Greek text in the repository | Script |
| Psalm 80:8, 16, 17; Isaiah 5:2, 7; 27:3; Jeremiah 2:21 | 1-4 | BSB | BSB text |
| Airei "lift up" or "take away": the lifting reading (trailing branches lifted from the ground) and the removal reading (common sense; verse 6); no side | 1-4 | Mounce on airō; Constable's notes; NET | Search: billmounce.com "αἴρω in John 15:2"; bibletools.org; sermonindex.net Constable; escapetoreality.org. Views only |
| Vine wood useless, fuel (Ezekiel 15:2-4); Galatians 5:22-23 | 5-8 | BSB | BSB text |
| Perseverance views: Westminster Confession 17 ("can neither totally nor finally fall away from the state of grace"); 1 John 2:19; Catholic, Orthodox, Lutheran, Wesleyan and Methodist teaching; "open for discussion and not a cause for division" | 5-8 | Earlier ledger (John 10) | Earlier ledger; John 10 wording |
| A further reading: the fire as a believer's lost reward, not final judgment | 5-8 | Constable's notes (those who read "take away" as loss of reward) | Search as above. No name given |
| Hellenistic kings' "Friends" a ranked inner circle (1 Maccabees 10:65, "chief friends"); 19:12 | 9-17 | ISBE "Friends; Chief Friends"; Cambridge chapter on the Hellenistic court | Search: biblestudytools.com / internationalstandardbible.com; cambridge.org. No reference to Maccabees on the page |
| Mishnah Avot 1:6 (around 200): a student should make himself a teacher; so students usually sought out teachers ("suggests") | 9-17 | m. Avot 1:6 | Search: sefaria sheets; myjewishlearning.com; kiwix Wikisource Avot 1:6. Paraphrased, marked as later; the contrast hedged ("may have sounded unusual") |
| Romans 5:8; 1:43; Isaiah 41:8; Exodus 33:11 | 9-17 | BSB | BSB text |
| "The world" not a nation or people; 3:16; Matthew 5:44 | 18-25 | Book page; BSB | Book page wording |
| Acts 7:58-60; Acts 12:2; Romans 12:18; 1 Peter 3:15-16; Psalm 69:4; 35:19 | 18-25 | BSB | BSB text |
| "Their Law" here means Scripture broadly (the quotation is from the Psalms) | 18-25 | BSB (Psalm 35:19; 69:4) | BSB text |
| "Proceeds from the Father"; the site's Nicene wording "who proceedeth from the Father"; the Western addition "and the Son" (filioque); the Eastern Orthodox churches do not use it | 26-27 | Site creed text; Filioque histories | Repository; search: en.wikipedia.org Filioque; catholic.com "Defending the Filioque". Dates (Toledo 589, Florence) not used |
| Deuteronomy 19:15; 21:24 | 26-27 | BSB | BSB text |

Cut: Tacitus on the golden vine and Liber; m. Middot 3:8; the revolt coins; 2 Baruch; Didache 9:2; b. Hullin 92a; Aristotle and Plato on dying for friends; Josephus on James the brother of Jesus; Tacitus on Nero (not needed); Wesley, Marshall, Trent, Augustine, Dort, Schreiner and Caneday, Hodges and Carson by name; Ruether, Reinhartz, Barrett, Brown, Wright, Soulen by name.

## The plain notes on John 16 (2026-11-19)

`client/public/bible/notes/john/plain/16.json`. 6 web searches. (A one-line repair to John 15:2's note rides with this commit: "lift up" is now "one of the word's basic meanings", not "the word's first meaning", since the lexicons' order of senses is disputed.)

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Synagogue exclusion (9:22, 12:42, 16:2): book page and 9:22 note wording (a late painful separation, many scholars; local exclusions in Jesus' lifetime argued plausible) | 1-4 | Earlier ledger (John 9) | Earlier ledger |
| Luke 6:22; Acts 7:58-60; Acts 26:9; Galatians 1:14; Isaiah 66:5 | 1-4 | BSB | BSB text |
| Latreia, the word for temple worship | 1-4 | Greek text in the repository; deep note | Script |
| Crusaders massacred the Jewish communities of Worms and Mainz in 1096 (the Rhineland massacres) | 1-4 | Histories of the First Crusade | Search: en.wikipedia.org Rhineland massacres; medievalists.net (2023); fabriziomusacchio.com. No death toll given (estimates vary) |
| Felix Manz, Anabaptist, drowned in Zurich by the Protestant authorities in 1527 for adult baptism | 1-4 | Histories of the Swiss Anabaptists | Search: en.wikipedia.org Felix Manz; swissinfo.ch; christianhistoryinstitute.org; anabaptistworld.org. Day not given (sources differ, 5 or 25 January) |
| Elenchō: convict, refute, expose, bring to light, prove wrong | 5-11 | Thayer; Strong's; NET ("prove the world wrong") | Search: blueletterbible.org G1651; openbible.com 1651 |
| 13:36; 14:5; Joel 2:28; Isaiah 11:2; 32:15 | 5-11 | BSB | BSB text |
| 1 John 4:1; Deuteronomy 13:2-3; 1 Thessalonians 5:21 | 12-15 | BSB | BSB text |
| Westminster Confession 1.6: "nothing at any time is to be added, whether by new revelations of the Spirit, or traditions of men" | 12-15 | Westminster Confession | Search: blueletterbible.org "Of The Holy Scripture"; reformation21.org; protestantbrain.blogspot.com. Quoted |
| Dei Verbum 8 (1965): "this tradition which comes from the Apostles develops in the Church with the help of the Holy Spirit" | 12-15 | Second Vatican Council | Search: vatican.va general audience 28 January 2026 quoting DV 8; slmedia.org; Meszaros (Cambridge) on DV 8. Quoted in that translation |
| Orthodox churches give a central place to holy tradition; Pentecostals test prophecy by Scripture ("most of them") | 12-15 | Deep note `hard` | Stated generally; no document cited |
| 20:20; Romans 8:22; Psalm 30:5; 126:5; Isaiah 26:17; 66:9; Revelation 21:4; Psalm 56:8 | 16-24 | BSB | BSB text |
| Childbirth dangerous in the ancient world (Rachel, Genesis 35:16-18) | 16-24 | Deep note `cultural`; BSB | Stated generally |
| Care line for long grief and for loss in pregnancy or childbirth; "Reach out to people you trust, to a pastor, or to someone trained to help" (John 11 wording) | 16-24 | John 11 note | Repository |
| Zechariah 13:7; Mark 14:27; Psalm 27:10; 1 John 5:4 | 25-33 | BSB | BSB text |

Cut: Martyn, Kimelman and Bernier by name (the book page carries the debate); the Birkat ha-Minim; Justin's Dialogue 16 and 96; Phinehas, 1 Maccabees 2 and Numbers Rabbah 21:3; Josephus on James the brother of Jesus; Luther's On the Jews and Their Lies (met only in summaries); Nostra Aetate (said in the John 8 note); m. Eduyot 5:6 and 1QS 6-7; 1QH 11; b. Sanhedrin 98b; Plutarch on parrēsia; m. Berakhot 5:5; Montanus, Mani and the Muslim reading of the Paraclete (periklytos), Ibn Ishaq and Sean Anthony (not checked this run); the Toledo and Florence dates for the filioque.

## The plain notes on John 17 (2026-11-19)

`client/public/bible/notes/john/plain/17.json`. 7 web searches.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| 2:4; 7:30; 8:20; 12:23; 11:41; Psalm 123:1; Deuteronomy 6:4; Jeremiah 31:34; Isaiah 42:8; Proverbs 8:30; 1 John 5:20; 3:16 | 1-5 | BSB | BSB text |
| "The high priestly prayer": the title credited to the Lutheran David Chytraeus (1530 to 1600); the priestly reading older (Cyril of Alexandria); some think the title says more than the text | 1-5 | Wikipedia "John 17"; Carson as cited by readingacts.com; Derek Thomas (reformedperspectives.org) | Search. Cyril not named on the page ("readers saw a priest praying here long before him") |
| Arius (early 300s) and Jehovah's Witnesses; creeds on Father and Son (pointer to the 14:28 note) | 1-5 | Earlier ledger (John 14) | Earlier ledger |
| "Christians who stress God's choosing ... These notes do not settle it." | 1-5 | Mark 4 and Matthew 13 plain notes | Repository |
| Exodus 3:15; 13:18; Psalm 41:9; Acts 1:20; Psalm 109:8; Exodus 28:29; Acts 2:23; 12:6; 13:5, 26; Hebrews 7:25 | 6-12 | BSB | BSB text |
| "The son of destruction" also in 2 Thessalonians 2:3; the play apōleto / apōleias in 17:12 | 6-12 | BSB; Greek text in the repository (`ch/john/17.json`) | Script. The em-dashed BSB wording of 2 Thessalonians 2:3 is quoted only as "the son of destruction" |
| Views of Judas and Scripture's fulfilment; "These notes do not say what God did with Judas. That belongs to God." (Matthew 27 wording) | 6-12 | Deep note `hard`; Matthew 27 plain note | Stated as views; no names (Maccoby, Klassen, Barth, Calvin and the Gospel of Judas not used) |
| Peter restored (21:15-17) | 6-12 | BSB | BSB text |
| "The world" in John (1:10; 3:16-17); 10:36 "the One whom the Father sanctified"; Exodus 28:36, 41; Leviticus 11:44; Deuteronomy 7:6; Jeremiah 29:7; Psalm 119:142 | 13-19 | BSB | BSB text |
| Hagiazō in 17:17 and 17:19 ("sanctify"), en tē alētheia | 13-19 | Greek text in the repository | Script |
| Lumen Gentium 8: the church of Christ "subsists in" the Catholic Church, with elements of sanctification and truth outside it | 20-26 | Second Vatican Council | Search: en.wikipedia.org Subsistit in; ewtn.com; catholic.com. Two words quoted |
| Unitatis Redintegratio (21 November 1964) 1: division openly contradicts the will of Christ, scandalizes the world, damages the preaching of the gospel | 20-26 | Second Vatican Council | Search: vatican.va; catholicculture.org. Paraphrased |
| Orthodox: unity a mark the church already has, kept in one faith and one Eucharist; no shared communion where faith is not shared | 20-26 | Fr. Lawrence Farley (oca.org, "The Marks of the Church: the Church as One"); orthochristian.com | Search. Stated generally, no document named |
| Lausanne Covenant (1974), section 7: "We affirm that the Church's visible unity in truth is God's purpose" | 20-26 | Lausanne Covenant | Search: lausanne.org; Haddington House Journal appendix; ecumenism.net. Quoted |
| Edinburgh World Missionary Conference 1910 seen as a start of the ecumenical movement; World Council of Churches founded at Amsterdam in 1948 | 20-26 | Encyclopedias | Search: museeprotestant.org; christianity.com; encyclopedia.com. "Many trace its start" |
| Celsus mocked Christian factions; Origen, Against Celsus 3.10-12, replied that medicine and philosophy also have schools | 20-26 | Origen | Search: bkv.unifr.ch (Crombie); clerus.org; newadvent.org 04163. Paraphrased; book number only |
| Ezekiel 37:22; Psalm 133:1; Isaiah 49:6; Ephesians 4:5 | 20-26 | BSB | BSB text |

Cut: Ut Unum Sint (1995) and Käsemann (not checked this run); the 1054 date (stated as "the churches of East and West have parted"); the number of denominations; Maccoby, Klassen, Barth and the Gospel of Judas; Cyril of Alexandria by name.

## The plain notes on John 18 (2026-11-19)

`client/public/bible/notes/john/plain/18.json`. 5 web searches. Where Mark 14 and 15 and Matthew 26 tell the event, their verified claims and wording are reused (the Mishnah on trials as a pointer, the date question as a pointer, "Sincerity is not the same as strength", the limit on executions, the Passover release, Barabbas "son of the father"). The abuse care line is the Matthew 5 wording word for word.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Speira the usual word for a Roman cohort (nominally several hundred, often 600); chiliarchos the Greek for a military tribune; most think a detachment | 1-11, 12 | NET note on 18:3; Thayer; biblicaltraining.org "Tribune" | Search: biblia.com NET 18:3; blueletterbible.org G4686. "Several hundred" on the page |
| Egō eimi in 18:5, 6, 8; 8:58 | 1-11 | Greek text in the repository | Script |
| 2 Samuel 15:23, 30 (David crosses the Kidron); Isaiah 43:10; Psalm 27:2; Isaiah 51:17; 10:18; Matthew 26:52; Luke 22:51; Mark 14:32 | 1-11 | BSB | BSB text. The David echo is "readers have long noticed" |
| Annas appointed high priest by Quirinius about AD 6, deposed by Valerius Gratus about 15; five sons high priest, which never happened to another (Josephus, Antiquities 20.9.1, 20.198 in Niese); Caiaphas his son-in-law; Luke 3:2 | 12-18 | Josephus; encyclopedias | Search: en.wikipedia.org Annas; biblicaltraining.org; bible-history.com. No section number on the page |
| The "other disciple" and the beloved disciple (book page wording) | 12-18 | Book page "Who wrote it" | Repository |
| Anthrakia only at 18:18 and 21:9 in the New Testament | 12-18 | Greek text in the repository | Script (G0439 counted: 2) |
| 11:50-51; Isaiah 53:7; Deuteronomy 19:15; Exodus 22:28; Isaiah 50:6; Mark 14:71; 13:38; Matthew 5:39 | 12-27 | BSB | BSB text |
| Mishnah on capital trials, around AD 200, perhaps a later ideal (pointer to the Mark 14 note) | 19-27 | Earlier ledger (Mark 14) | Earlier ledger. Not used to judge the hearing |
| Abuse care line: "Jesus speaks of refusing revenge, not of accepting abuse. Seeking safety, and the protection of the law, is not disobedience to Jesus. If you are being harmed, tell someone you trust and get help." | 19-27 | Matthew 5 plain note | Repository |
| Praetorium a Latin word for a commander's headquarters; Antonia (old tradition) or Herod's palace (many scholars now) | 28-32 | Encyclopedia.com "Praetorium"; IVP NT commentary on 18:28-32 | Search: encyclopedia.com; biblegateway.com IVP; baptistpress.com |
| Gentile houses and defilement (Acts 10:28); Numbers 9:6; 12:32-33; 3:14; Numbers 21:8-9; Deuteronomy 21:23; Galatians 3:13 | 28-32 | BSB | BSB text. Mishnah Ohalot not used |
| Date of the Supper against John (pointer to the Mark 14 note); "We are not permitted to execute anyone" (Mark 15 wording) | 28-32 | Earlier ledger (Mark 14, 15) | Earlier ledger |
| P52: John 18:31-33 and 37-38; John Rylands Library, Manchester; published 1935; dated to the 100s, often around 125 (Aland, plus or minus 25), some later (Orsini and Clarysse, 125 to 175) | 28-32 | The papyrus | Search: library.biblicalarchaeology.org "Earliest New Testament fragment"; catholic-resources.org Papyri; historyofinformation.com. Size not given |
| Ek tou kosmou toutou and enteuthen in 18:36 | 33-38 | Greek text in the repository | Script |
| Francis Bacon, "Of Truth", opening essay of the 1625 Essays: "What is truth? said jesting Pilate, and would not stay for an answer" | 33-38 | Bacon | Search: gutenberg.org 575; en.wikipedia.org Essays (Francis Bacon); wikiquote. Quoted |
| Daniel 7:14; Zechariah 9:9-10; 12:14-15; 14:6; 17:18; Matthew 6:10 | 33-38 | BSB | BSB text |
| The two misuses of 18:36 (withdrawal; a warrant for a Christian state by power) | 33-38 | The text (18:36; 17:15, 18) | Stated plainly; no party named |
| Lēstēs in 18:40; Mark 15:7; Luke 23:19; Barabbas "son of the father"; the release known only from the Gospels (Mark 15 wording) | 39-40 | Greek text; BSB; earlier ledger (Mark 15) | Script; earlier ledger |
| Isaiah 53:6, 12 | 39-40 | BSB | BSB text |

Cut: the Humphreys and Waddington astronomy (Nature, 1983); Philo's gilded shields; the aqueduct; y. Sanhedrin 1:1 and Josephus, War 2.117 on the power of the sword; Ananus the younger and James (not needed); the 2009 pavement find; Huxley's Jesting Pilate; the Mishnah on Gentile dwellings; Augustine and other readers on the falling back.

## The plain notes on John 19 (2026-11-19)

`client/public/bible/notes/john/plain/19.json`. 8 web searches. Where Mark 15 and Matthew 27 tell the event, their verified claims and wording are reused word for word: the "Christ-killers" paragraph with Nostra Aetate 4 and Acts 4:27 (Matthew 27 wording, with "This site rejects it"), crucifixion as a Roman punishment, the women who stayed, Joseph and the burial, Yehohanan (pointer), Jewish burial customs (pointer to Mark 16). The day-of-Passover views are the Mark 14 wording. The bereaved-parent care line is the Matthew 2 wording word for word.

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Ecce homo (Vulgate 19:5); Iesus Nazarenus Rex Iudaeorum (19:19); INRI | 1-7, 17-22 | Vulgate | Search: blueletterbible.org Vulgate John 19; vulgate.org; ewtn.com "I.N.R.I."; en.wikipedia.org INRI |
| Leviticus 24:16; 5:18; Isaiah 53:5, 7; 12:12-13; 18:38; 19:4, 6 | 1-7 | BSB | BSB text |
| Acts 14:11; Daniel 4:17; Psalm 2:2; 7:27-28; 8:14 | 8-12 | BSB | BSB text |
| "Friend of Caesar" an honor for those the emperor trusted, possibly a formal title (Bammel 1952 as cited); Sejanus's fall in AD 31 and a possible link to Pilate, disputed | 8-12 | NET note; Stone-Campbell Journal study; catholicstand.com; relbib.de "No friend of Caesar" | Search. "Some scholars"; no names on the page |
| Paradidōmi for Judas (18:2), the priests (18:30, 35), Pilate (19:16), "the one who handed Me over" (19:11) and paredōken (19:30) | 8-12, 28-30 | Greek text in the repository | Script |
| Views on "the one who handed Me over" (Caiaphas, Judas, all) | 8-12 | Commentaries; deep note | Stated as views |
| The Antonia pavement laid later than Jesus' day (most archaeologists) | 13-16 | Encyclopedia.com "Praetorium" and the 18:28 search | Search (John 18) |
| Lambs killed in the afternoon of the day of Preparation; 1:29 | 13-16 | Earlier ledger (Mark 14) | Earlier ledger |
| The day question (Mark 14 wording, four views, "No answer has won general agreement", "All four Gospels agree ...") | 13-16 | Mark 14 plain note | Repository |
| The hour (third in Mark 15:25, about the sixth in John 19:14): round figures; hours from midnight (doubted); copyist slip, a few old copies read "third", the best read "sixth" | 13-16 | biblehub.com "Why do John 19:14 and Mark 15:25 differ?"; Barnes's notes (ccel.org); catholic.com "The timing of Jesus' death" | Search. No manuscript named |
| Judges 8:23; 1 Samuel 8:7; Isaiah 33:22 | 13-16 | BSB | BSB text |
| 19:15 said by the chief priests (BSB); the "Christ-killers" paragraph; Nostra Aetate 4; Acts 4:27; 1:10 | 13-16 | BSB; Matthew 27 and Mark 15 plain notes; book page | Repository |
| Mark 15:21 (Simon); Genesis 22:6; Isaiah 52:13; 49:6; 10:18 | 17-22 | BSB | BSB text. The Isaac echo is "many readers" |
| Josephus, Antiquities 3.161: the high priest's long garment woven in one piece, not of two; the priestly reading of the tunic debated (chitōn the ordinary word) | 23-27 | Josephus (Whiston) | Search: lexundria.com j_aj 3.161; stpaulcenter.com (Lane). Stated as a reading |
| Psalm 22:18; Exodus 20:12; Luke 2:35 (paraphrased, the BSB has an em-dash); 7:5; 2:4 note | 23-27 | BSB; John 2 plain note | BSB text |
| Catholic and Orthodox reading of Mary as mother of disciples; Protestant reading as a son's care | 23-27 | Standard positions | Stated generally |
| Bereaved-parent care line (Matthew 2 wording) | 23-27 | Matthew 2 plain note | Repository |
| Tetelestai in 19:28 and 19:30 | 28-30 | Greek text in the repository | Script |
| "Paid in full" receipts: the abbreviation on tax receipts was misread (papyrologists since 1934 read it as tetelōnētai); no ancient use of tetelestai to mean paid in full found | 28-30 | Gary Manning, Biola "Good Book Blog" (2022); catholic.com "Protestants and the paid in full myth" | Search. Doubtful, so NOT used: the page says nothing about receipts |
| Psalm 69:21; Psalm 22:15; Exodus 12:22; Hebrews 10:10; 17:4; 4:7-14 | 28-30 | BSB | BSB text |
| Breaking the legs hastened death; how crucifixion killed is debated (asphyxia a 1950s theory among others) | 31-37 | britannica.com crucifixion; library.biblicalarchaeology.org; biblehub.com | Search. Yehohanan's legs not described |
| Exodus 12:46; Numbers 9:12; Psalm 34:20; Zechariah 12:10; 13:1; Deuteronomy 21:23; 7:38-39; 1 John 5:6; Genesis 2:21-22 | 31-37 | BSB | BSB text. Revelation 1:7 not quoted (em-dash) |
| Augustine, Tractate 120 on John: the Latin "opened", the side as the door of the sacraments, the church from the side like Eve; Chrysostom on baptism and the mysteries and Eve | 31-37 | Augustine; Chrysostom | Search: newadvent.org 1701120; ccel.org NPNF 1.7; lectionarycentral.com. Paraphrased; Chrysostom's homily number not given (84 or 85 by edition) |
| A hundred litrai, a litra about 327 grams, about 33 kilograms | 38-42 | NET and translation notes | Search: biblehub.com 19:39; content.bibletranslationtools.org. "Fit for a king" given as "many readers think" |
| 3:2; 7:50-51; Isaiah 53:9; Matthew 27:57; 2 Chronicles 16:14; 1 Corinthians 15:3-4 | 38-42 | BSB | BSB text |
| The burial debated (unburied or common graves argued; burial the same day; Yehohanan; Joseph a council member); Paul in the 50s | 38-42 | Earlier ledger (Mark 15, 16) | Earlier ledger. No scholar named |

Cut: the "paid in full" claim (doubtful; the page is silent on it); Cyprian on the seamless tunic and unity (not checked; stated as "many Christians"); Sejanus and Bammel by name; Barbet and the medical theories; Josephus on Herod's funeral spices; the 2009 Gabbatha find; Salome as Mary's sister; Humphreys and Waddington's dates (AD 30 or 33); Crossan by name; the claim that Romans always left bodies on crosses.

## The plain notes on John 20 (2026-11-19)

`client/public/bible/notes/john/plain/20.json`. 8 web searches. Where Mark 16 and Matthew 28 tell the morning, their verified claims are reused (women first and why historians weigh it; the differences among the four accounts; the stolen-body rumour conceding the empty tomb).

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Women first; a woman's word counted for little in court (Josephus, Antiquities 4.219); the four accounts differ; the rumour concedes the empty tomb | 1-10 | Earlier ledger (Mark 16, Matthew 28) | Earlier ledger |
| Psalm 16:10 (used in Acts 2 and 13); Hosea 6:2; Isaiah 25:8; Genesis 1:3-5; 20:29 | 1-10 | BSB | BSB text |
| Luke 8:2-3 (seven demons; the women who supported him); Luke 7:37 ("a sinful woman"); 19:25; 10:3; Luke 24:16; 1:12; 20:27 | 11-18 | BSB | BSB text |
| The Gospels never call Mary Magdalene a prostitute; Gregory the Great's Homily 33 (591) joined her with Mary of Bethany and the sinful woman of Luke 7; the West kept the picture; the East kept them apart | 11-18 | Gregory, Homilies on the Gospels 33 (PL 76, 1239); earlier ledger (John 12) | Search: roger-pearse.com "A homily of Gregory the Great and Mary Magdalene"; remnantnewspaper.com; degruyterbrill.com (Hennessy); earlier ledger |
| Decree of the Congregation for Divine Worship, 3 June 2016, raising the memorial of 22 July to a feast like the apostles'; "apostle of the apostles" (from Thomas Aquinas) | 11-18 | The decree | Search: press.vatican.va 10 June 2016; slmedia.org; catholicregister.org. Aquinas not named on the page |
| Mē mou haptou a present imperative ("stop holding"); Noli me tangere in the Latin | 11-18 | Repository chapter note (`text`); Greek text | Repository; script |
| Song of Songs 3:1, 4; Psalm 22:22; Ruth 1:16 | 11-18 | BSB | BSB text. The Song echo is "many readers" |
| Emphusaō (20:22) the verb of LXX Genesis 2:7 (and Ezekiel 37:9); only here in the New Testament | 19-23 | Lexicons | Search: biblehub.com 1720; blueletterbible.org G1720 LXX; craigladams.com |
| Genesis 2:7; Ezekiel 37:9; Micah 7:18; Acts 2; Luke 24:47 | 19-23 | BSB | BSB text |
| Catholic: the power to forgive and retain sins in the sacrament of penance; the Council of Trent (sixteenth century, Session 14, canon 3) rests the teaching chiefly on John 20 | 19-23 | Trent; Catholic Encyclopedia "Penance" | Search: history.hanover.edu ct14; newadvent.org cathen 11618c; catholictheology.info (Pohle). Paraphrased; year not given |
| Orthodox: the mystery of confession founded on these verses; the priest often described as a witness, praying God's forgiveness | 19-23 | Orthodox parish and teaching pages; Pomazansky (roca.org) | Search: saintandrewgoc.org; holyapostlesgo.org; stgeorgecathedral.net; roca.org. Stated generally ("often describe") |
| Lutheran: the Office of the Keys in Luther's Small Catechism, citing John 20:22-23: authority to forgive repentant sinners and withhold forgiveness from the unrepentant as long as they do not repent | 19-23 | Small Catechism | Search: els.org part 5; catechism.cph.org; witness.lcms.org. Paraphrased |
| Reformed and other Protestants: declared in the preaching of the gospel; perfect passive "have been forgiven" | 19-23 | Reformation Study Bible note on 20:23; ligonier.org/tabletalk; repository `text` (apheōntai) | Search. Calvin not named |
| Didymus "twin"; 11:16; 14:5; 20:20 | 24-29 | BSB; deep note | BSB text |
| Suetonius, Domitian 13: a circular letter beginning "Our Master and our God"; Domitian AD 81 to 96; the link to 20:28 debated | 24-29 | Suetonius | Search: lexundria.com suet_dom 13; en.wikipedia.org John 20:28; ncregister.com. Paraphrased; "Some scholars ... Others doubt" |
| Psalm 35:23; Deuteronomy 6:4; Psalm 13:1; 1 Peter 1:8; 1:1 | 24-29 | BSB | BSB text |
| Nicene Creed wording | 24-29 | The site's Nicene Creed page (`client/public/creeds/documents/nicene-creed.json`) | Repository, copied |
| Chapter 21 and the old copies (book page wording) | 30-31 | Book page "Two passages" | Repository |
| 20:31 pisteuēte / pisteusēte; either form usable for both | 30-31 | Repository chapter note (`text`) | Repository. Manuscripts not named on the page |
| 2 Samuel 7:12-16; Isaiah 61:1 | 30-31 | BSB | BSB text |

Cut: the 1969 calendar change; Hippolytus and the Song of Songs; Trent's year and canon wording; the Small Catechism's "as valid and certain" sentence (not confirmed in the search); Calvin and the 1689 Confession; Domitian's rejection of the title (Statius); the medical and Jaubert matters (not needed); Pentecost theories by name.

## The plain notes on John 21 (2026-11-19)

`client/public/bible/notes/john/plain/21.json`. 4 web searches. The Catholic, Orthodox and Protestant readings of Peter's place follow the Matthew 16 note's verified wording (Vatican I, the Catechism, the Orthodox position stated generally, "the text says nothing of successors").

| Claim | Verses | Source | Checked by |
|---|---|---|---|
| Chapter 21 likely added in the final edition; in every surviving copy that has the ending; 21:23 may mean the disciple had died | 1-14, 20-23 | Book page "Two passages" | Repository |
| Anthrakia only at 18:18 and 21:9 | 1-14, 15-17 | Greek text in the repository | Script (earlier, John 18) |
| Luke 5:4-10; Jeremiah 16:16; Ezekiel 47:10; Mark 1:17; Isaiah 55:1 | 1-14 | BSB | BSB text |
| 153: Jerome (Commentary on Ezekiel 47) said natural writers counted 153 kinds of fish (Oppian cited); no such exact count found in them; Augustine: 153 the sum of 1 to 17, 17 as 10 and 7; other guesses; "someone counted" | 1-14 | Chris Keith (historicaljesusresearch blog, Baker); Brown and Carson as summarised; commentaries | Search: christianstudylibrary.org; openbible.com 21:11; historicaljesusresearch.blogspot.com. Guesses named as guesses; no scholar named |
| Agapaō in 21:15-16 (Jesus), phileō in Peter's answers and in 21:17; agapa in 3:35 and philei in 5:20 of the Father's love; boske / poimaine | 15-17 | Greek text in the repository | Script |
| The two views of the love words; scholars divided | 15-17 | Constable's notes; psephizo.com (Paul); BDAG as summarised | Search. No names on the page |
| 18:17, 25, 27; 1:42; Mark 14:29; Ezekiel 34:2; Jeremiah 3:15; Isaiah 40:11; 10:11; 1 Peter 5:2; Psalm 51:12; Matthew 16:18 | 15-17 | BSB | BSB text |
| Vatican I, Pastor Aeternus 1 (1870), citing John 21:15-17: primacy of jurisdiction conferred on Peter alone; supreme shepherd and ruler of the whole fold | 15-17 | Pastor Aeternus | Search: ewtn.com; churchcontroversies.com; catholictheology.info. Paraphrased |
| Catechism of the Catholic Church 881: the keys and "shepherd of the whole flock" (Jn 21:15-17) | 15-17 | Catechism | Search (as above). Paraphrased |
| Orthodox and Protestant readings (Matthew 16 wording; restoration; 1 Peter 5:2) | 15-17 | Matthew 16 plain note; hprweb.com on the Protestant reinstatement reading | Repository; search |
| 13:36-37; 12:33; 18:32; 2 Peter 1:14 | 18-19 | BSB | BSB text |
| "Stretch out your hands" read by early writers as crucifixion (Tertullian, Scorpiace 15: "girded by another" and bound to the cross) | 18-19 | Tertullian as cited | Search: bam.sites.uiowa.edu "How did the Apostles Peter and Paul die?". Tertullian not named on the page |
| 1 Clement 5 (late first century): Peter's many labors and witness, the manner not told; Eusebius (Church History 2.25 and 3.1): crucified at Rome under Nero; Origen's report that he asked to be crucified head downward; marked as tradition | 18-19 | Eusebius; 1 Clement | Search: bkv.unifr.ch Eusebius; sacred-texts.com; biblehub.com; uiowa.edu. Book numbers not given on the page |
| Psalm 71:9; Psalm 92:14; Acts 4:13, 19-20 | 18-19 | BSB | BSB text |
| Micah 6:8; Ezekiel 18:20 | 20-23 | BSB | BSB text |
| Who wrote it (book page wording); Deuteronomy 19:15; 1:1-3; 20:31 | 24-25 | Book page; BSB | Repository; BSB text |

Cut: Oppian by name; the gematria proposals by name (Gog, En-eglaim); Trench, Carson, Barrett, Butler and Brown by name; Catechism 553 (not found in the search); Tertullian and the Scorpiace by name; the date of Peter's death (64 or 67); the Vatican excavations; Ut Unum Sint.

## Luke's book page (teaching introduction, 2026-11-19)

Every historical claim in `client/public/bible/notes/luke/intro.json`, field
`teaching`. 23 searches for the book page, run on 2026-11-19; checks rest on
search results that quote or summarise the source, read against at least two
results where possible. Ancient writers are paraphrased. Scripture is the BSB
in the repository, checked word for word by `scripts/validate-bible-notes.mjs`;
word counts are a script over the repository's Greek text.

| Claim | Source | Checked by |
|---|---|---|
| Colossians 4:10-14 ("These are the only Jews among my fellow workers"; "Luke, the beloved physician"); Philemon 24; 2 Timothy 4:11 | BSB | Repository |
| The "we" passages (Acts 16:10-17; 20:5 to 21:18; 27:1 to 28:16); the eyewitness, diary and sea-voyage-convention readings | Repository `author` (Robbins 1978; Hemer, Praeder) | Repository; names not used on the page |
| Irenaeus, Against Heresies 3.1.1: Luke, Paul's companion, set down in a book the gospel Paul preached; 3.14.1: from the "we" passages, Luke Paul's constant companion; Marcion and Valentinus would not accept Luke's authority | Irenaeus | Search: newadvent.org/fathers/0103301.htm and 0103314.htm; logoslibrary.org; bkv.unifr.ch; ehrmanblog.org. Paraphrased |
| Muratorian fragment: Luke the physician; Paul took him along; he did not see the Lord in the flesh; late second century usually, fourth century argued by Sundberg (1973) and Hahneman (1992) | Muratorian fragment | Search: earlychristianwritings.com (Metzger translation); newworldencyclopedia.org; bible-researcher.com; thegospelcoalition.org Themelios review; galaxie.com (Hill). Paraphrased; scholars not named on the page |
| Hobart, The Medical Language of St. Luke (Dublin, 1882); Cadbury's answer (The Style and Literary Method of Luke, 1919-1920; JBL 1926): ancient physicians had hardly a technical vocabulary; educated writers used the same words | Hobart; Cadbury | Search: archive.org; gospelstudies.org.uk JBL 1926; Spectator 1883 review. Year given as "from 1919" because the results give 1919 and 1920 |
| Luke a Gentile (Colossians 4) and the reply that "of the circumcision" may mean a narrower group (Ellis, as cited) | Commentaries | Search: foi.org; paulandco-workers.blogspot.com (Fellows); NET note via biblia.com. Both views stated, no names |
| Acts 1:1 "O Theophilus"; "most excellent" for Felix (Acts 24:3) and Festus (Acts 26:25) | BSB | Repository (BSB 23:26 reads "His Excellency", so it is not cited) |
| Theophilus: patron, believer under instruction, symbolic name; "friend of God" | Reference works | Search: biblehub.com; bartehrman.com; Wikipedia "Theophilus (biblical)" |
| Cadbury, The Making of Luke-Acts (Macmillan, 1927), one literary project; the name "Luke-Acts" | Cadbury | Search: archive.org PDF; Wikipedia Henry Cadbury. The page does not say he coined the name |
| Loveday Alexander, The Preface to Luke's Gospel (Cambridge, SNTS 78, 1993): closest parallels in scientific and technical prefaces; critics say the line is less sharp | Alexander | Search: 4enoch.org; powells.com; apcz.umk.pl (2020 article) |
| Date: majority about 80 to 90; Luke 19:43 and 21:20; minority early 60s from the end of Acts (Robinson 1976); reply that Acts ends on purpose; a few early second century | Reference works | Search: vridar.org; reasonabletheology.org; jimmyakin.com; bartehrman.com; repository `date`; ledger (Robinson) |
| Two-Source view and Q; Farrer 1955; Goodacre 2002; Matthew-first view | Earlier ledger (Matthew's book page) | Earlier ledger; wording kept consistent with Matthew's page |
| Luke uses "poor" (ptōchos) 10 times and "rich" (plousios) 11 times, more than any other Gospel; "today" (sēmeron) 11 times | Greek text | Script over the repository's Greek |
| Septuagint style of Luke 1 and 2; most think deliberate imitation, some think Hebrew or Aramaic sources | Jung, The Original Language of the Lukan Infancy Narrative (2004); NTS article | Search: logos.com; bestcommentaries.com; cambridge.org NTS abstract |
| Isaiah 61:1-2 with Isaiah 58:6 in Luke 4:18-19; Jesus stops before "the day of our God's vengeance" | BSB | Repository |
| Tiberius's fifteenth year: AD 28-29 counting from 14; about 26 counting from a co-regency | Chronology studies | Search: Tyndale Bulletin (Tiberius's reign); biblearchaeology.org; galaxie.com (Hoehner) |
| Pilate stone, Caesarea, found 1961 by Frova's team, "prefect of Judea", now in the Israel Museum | Inscription | Search: bible-history.com; madainproject.com; biblicalarchaeology.org |
| Lysanias: Josephus's Lysanias put to death about 36 BC; the Abila inscription of a freedman of "Lysanias the tetrarch", most date it to Tiberius's reign, date debated | Inscription; Josephus | Search: en.wikipedia.org Lysanias; biblicaltraining.org; bibleplaces.com. Uncertainty stated |
| Quirinius governor of Syria in AD 6; Judea under direct rule; Josephus's census; Herod's death 4 BC (most) | Earlier ledger (Mark 12; Matthew's book page) | Earlier ledger |
| Explanations of 2:2: Luke mistaken; an earlier command (the Tivoli inscription, Lapis Tiburtinus, "a second time", disputed); "before" (protē), found strained by most grammarians; Tertullian (Against Marcion 4.19) and Sentius Saturninus; a count begun under Herod; Luke knows the AD 6 census (Acts 5:37) | Reference works | Search: aaronjudkins.substack.com; psephizo.com "Did Luke get his nativity history wrong?"; tertullian.org; evidenceunseen.com; repository `hard` (Luke 2). Stated as views; Saturninus's years given only as "a few years before Herod died" |
| 23:34: absent from P75, Vaticanus, Bezae's first hand (and W, 579); present in Sinaiticus as first written (a later corrector marked it); scholars divided; some think removed for anti-Jewish reasons | Manuscript evidence | Search: tyndale.cam.ac.uk (Jongkind); ehrmanblog.org; confessionalbibliology.com; repository `text` |
| 22:43-44: absent from P75, Vaticanus and others; present in Sinaiticus as first written and Bezae | Manuscript evidence | Search: tyndale.cam.ac.uk; biblehub.com; repository `text` (hard-passage line only) |
| Nostra Aetate 4 (1965); Acts 4:27 | Earlier ledger (Mark 15, Matthew) | Earlier ledger; BSB |
| Benedictus at Lauds, Magnificat at Vespers, Nunc Dimittis at Compline (Roman use; Benedict lacked the Nunc Dimittis); BCP: Benedictus at Morning Prayer, Magnificat and Nunc Dimittis at Evening Prayer | Liturgical histories | Search: en.wikipedia.org Canticle; saint-aelfric-customary.org; anglicancompass.com |
| Irenaeus 3.11.8 gives Luke the calf (Zechariah the priest); Jerome (398), preface to the Commentary on Matthew, the calf "because he began with Zacharias the priest" | Irenaeus; Jerome | Search: bkv.unifr.ch NPNF II/6 and AH 3.11.8; biblicalarchaeology.org "Why the ox"; silouanthompson.net. Paraphrased |
| Priene inscription (9 BC): Augustus's birthday the beginning of good news; savior | Earlier ledger (Mark) | Earlier ledger; search: en.wikipedia.org Priene calendar inscription |
| Emmaus: candidates Nicopolis (Imwas, near Latrun; Eusebius's Onomasticon), Abu Ghosh, el-Qubeibeh, Motza; 60 or 160 stadia in the manuscripts | Reference works | Search: biblicalarchaeology.org "The Emmaus Trail"; seetheholyland.net; agapebiblestudy.com. "Placed roughly"; no consensus claimed |
| Nain identified with the village of Nein on the slope of the hill of Moreh, a few miles from Nazareth | Bible dictionaries | Search: encyclopedia.com Nain; biblehub topical; biblewalks.com |
| Paradise from an old Persian word for an enclosed garden or park | Etymology | Search: Wikipedia Paradise; iranicaonline.org; encyclopedia.com |
| Shrewd manager: cut his own commission (Derrett 1970), cut the interest, or cheated again | Commentaries | Search: biblegateway IVP NT commentary; workingpreacher.org; muse.jhu.edu. Used only for the hard-passage line, which names no view |
| Herod 37 to 4 BC; Antipas 4 BC to AD 39; Pilate 26 to about 36; crucifixion 30 or 33; 70; P75 around 200; Tiberius from 14 | Earlier ledger (Mark, Matthew, John) | Earlier ledger |
| Map positions | Approximate modern sites; Emmaus and the Samaritan villages are regions, placed roughly and said so | Not a historical claim |

Left out: the anti-Marcionite prologue (Antioch, Boeotia, eighty-four); the
claim that Cadbury coined "Luke-Acts"; Philip's death in AD 34; the Caiaphas
bone box; Marcion's date and Gospel; Hobart's count of 400 words; Mommsen,
Ramsay, Syme, Turner and Brown by name on the census; every scholar named in
the repository's fuller introduction below and not checked this run; the
claim that Motza is now the consensus for Emmaus (one popular source only).

## The plain notes on Luke 1 (2026-11-19)

`client/public/bible/notes/luke/plain/1.json`. Three searches for this
chapter, with the book page's rows above and the earlier ledger.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Preface wording; "most excellent" for governors | 1-4 | BSB; book page rows | Repository |
| Twenty-four priestly groups; Abijah the eighth | 5-17 | 1 Chronicles 24:10 | BSB |
| Lots for the incense among priests who had never offered it (Mishnah Tamid 5:2, written down about AD 200); once in a lifetime for many; Talmud Yoma 26a on why no priest did it twice (not used on the page) | 5-17 | Mishnah | Search: bibleportal.com (Constable citing Tamid 5:2); hadran.org.il Yoma 26; Reformation Study Bible note on 1:9 |
| Childlessness a grief and a public shame; assumed to be God's displeasure; Luke calls them righteous first | 5-17, 18-25 | BSB (1:6, 1:25; Genesis 30:23); repository chapter note (`cultural`) | Repository; stated generally, no ancient writer named |
| Malachi 4:5-6; Numbers 6:3; Judges 13:4-5; Genesis 18:11, 18:14; 1 Samuel 1:11 | 5-25 | BSB | Repository |
| Gabriel and Michael the only angels named in the Hebrew Bible, both in Daniel; Gabriel at the evening sacrifice (Daniel 9:21) | 18-25 | BSB | Repository |
| Nazareth a small village, perhaps a few hundred people; not named in the Old Testament | 26-38 | Earlier ledger (Mark 6) | Earlier ledger |
| Betrothal a binding first step; wedding later | 26-38 | Earlier ledger (Matthew 1) | Earlier ledger. The age of brides (deep note) was not checked and is left out |
| 4Q246: "son of God" and "son of the Most High"; messiah or hostile king debated | 26-38 | 4Q246 | Search: en.wikipedia.org 4Q246; galaxie.com (Collins, BBR 7); doaj.org 2025 study |
| 2 Samuel 7:16; Exodus 40:34-35; Genesis 18:14 | 26-38 | BSB | Repository |
| Virgin conception: Matthew and Luke independent; skeptics and Christian answers; the Apostles' Creed in the site's wording ("conceived by the Holy Ghost, born of the Virgin Mary") | 26-38 | Matthew 1 plain note; site creed text | Repository |
| Kecharitōmenē: shown grace or favour; Jerome's gratia plena, "full of grace"; Catholic link to the Immaculate Conception; Protestant "highly favored" | 26-38 | Lexicons; Catholic and Protestant sources | Search: catholic.com "Full of grace versus highly favored"; detroitcatholic.com; tips.translation.bible. The Catechism's paragraph numbers and the 1854 date were not checked and are not given |
| Judges 5:24 Jael; 2 Samuel 6:9-11 the ark three months; reading offered as what "some readers hear" | 39-45 | BSB | Repository |
| Catholic and Orthodox honour and prayers to Mary distinguished from worship; Protestant emphasis | 39-45 | Standard positions | Stated generally |
| Hannah's song (1 Samuel 2:1, 2:7, 2:8); Psalm 111:9; Psalm 103:17; Genesis 12:1-3 | 46-56 | BSB | Repository |
| Circumcision on the eighth day (Genesis 17:12); sons often named for a father or grandfather; John = Yohanan, "the LORD has been gracious" | 57-66 | BSB; repository chapter note (`cultural`); name studies | Repository. The wax tablet (deep note) not described |
| Psalm 132:17; Genesis 22:16-18; Malachi 3:1; Isaiah 40:3; Isaiah 9:2 | 67-80 | BSB | Repository |
| John and the Dead Sea community: "only a guess" | 67-80 | Common suggestion | Stated as a guess, no claim made |

Left out: m. Tamid 7:2 and the priestly blessing Zechariah could not give;
Josephus on the number of priests; the Mishmarot scrolls; Ein Karem; the
eighty miles; Judith; the age of betrothal; the wax tablet; Celsus and
Panthera; Lüdemann, Schaberg, Lincoln, Machen and Brown by name. Care: the
5-17 hard field speaks to readers who long for a child or lost one
(childlessness is not a judgment; a path to a friend, pastor or counsellor).

## The plain notes on Luke 2 (2026-11-19)

`client/public/bible/notes/luke/plain/2.json`. Five searches for this
chapter, with the book page's rows above.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Augustus 27 BC to AD 14 | 1-7 | Book page timeline (repository) | Repository |
| Kataluma: the same word for the guest room of 22:11; pandocheion for the inn of 10:34; Bailey (2008) on village houses with animals in a lower part of the main room; Carlson (NTS 2010) on "a place to stay"; no innkeeper in the text | 1-7 | Bailey, Jesus Through Middle Eastern Eyes; Carlson, NTS 56 (2010) | Search: psephizo.com "Jesus was not born in a stable"; Carlson's NTS paper (hypotyposeis PDF); ucg.org; tyndale.cam.ac.uk. BSB for "inn". Scholars not named on the page |
| The census: book page wording | 1-7 | Book page rows | Book page |
| 1 Samuel 16:11; Micah 5:2; Matthew 2:6; Exodus 13:2 | 1-7 | BSB | Repository |
| Shepherds: the "despised" claim rests mostly on later rabbinic texts (Jeremias's sources mostly the Babylonian Talmud); Mishnah Kiddushin 4:14 lists the shepherd among trades a father should not teach his son, "the trades of robbers"; how far it reflects the first century is debated; the Bible honours shepherds | 8-14 | Mishnah Kiddushin 4:14 | Search: mishnah.org Kiddushin 4:14; posenlibrary.com; psephizo.com "Challenging Christmas myths"; epm.org. Jeremias not named on the page |
| Priene and the cities of Asia, about 9 BC: Augustus's birthday the beginning of good news; savior | 8-14 | Earlier ledger (Mark); book page | Earlier ledger |
| Psalm 23:1; Ezekiel 34:23; Isaiah 9:6-7 | 8-14 | BSB | Repository |
| 2:14: one letter; the oldest copies read "on whom His favor rests"; later copies and the KJV "good will toward men" | 8-14 | Textual commentaries as summarised | Search: christianitytoday.com (1994); skipmoen.com; byunewtestamentcommentary.com; repository `text`. No manuscript named |
| "Pondered" twice (2:19, 2:51); Mary as a source "a guess, but a reasonable one" | 15-20 | BSB; repository `literary` | Stated as a guess |
| Isaiah 1:3 | 15-20 | BSB | Repository. The ox and donkey of Christian art not mentioned |
| Leviticus 12:2-4 (seven and thirty-three days), 12:8 (the poor family's offering); Exodus 13:2; "the Law" five times (22, 23, 24, 27, 39) | 21-24 | BSB | Repository; count of BSB |
| 1 Samuel 1:24-28; Malachi 3:1; Galatians 4:4 | 21-24 | BSB | Repository |
| Nunc Dimittis at night prayer | 25-35 | Book page row (canticles) | Search (book page) |
| Isaiah 40:1; 49:6; 52:10; 8:14; Luke 20:17; John 19:25 | 25-35 | BSB | Repository |
| Care line for the bereaved parent | 25-35 | Matthew 2 plain note, wording adapted | Repository |
| Anna: verse 37 read two ways (until eighty-four, or for eighty-four years) | 36-40 | Repository `text` (heōs) | Repository |
| Miriam, Deborah, Huldah prophetesses; Isaiah 52:9; 1 Samuel 2:26 | 36-40 | BSB | Repository |
| Three pilgrim feasts for men (Deuteronomy 16:16); travelling with relatives and friends (2:44) | 41-52 | BSB | Repository |
| Mishnah Avot 5:21: thirteen for the commandments; a later addition to the tractate | 41-52 | Mishnah | Search: sefaria.org.il English Explanation of Avot 5:21; cojs.org; en.wikipedia.org Pirkei Avot. Stated as "a Jewish saying added to the Mishnah" |
| "About My Father's business" in older translations; the Greek carries both | 41-52 | Translation history (KJV) | Common knowledge of the KJV; no lexicon cited |

Left out: the date 25 December and the Chronograph of 354; the Protevangelium
and the cave; the ox and donkey's origin; Francis at Greccio; the five
shekels of redemption; the Nicanor Gate; "their purification"; Judith and
Anna; the caravan word sunodia; the numbers of pilgrims. Care: the sword
(25-35) carries the Matthew 2 line for the bereaved parent; the boy in the
temple (41-52) speaks to parents of a child who has wandered.

## The plain notes on Luke 3 (2026-11-19)

`client/public/bible/notes/luke/plain/3.json`. Three searches for this
chapter, with the book page's rows and the earlier ledger.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Seven rulers of 3:1-2; Tiberius's fifteenth year (28-29, or about 26); Pilate 26 to 36; the Pilate stone (1961); the Abila inscription; tetrarch | 1-6 | Book page rows | Book page searches |
| Annas father-in-law of Caiaphas (John 18:13); Annas high priest before | 1-6 | BSB; earlier ledger (John 18, Josephus) | Earlier ledger |
| John's washing done once, by John, as a sign of turning; Jews knew many ritual washings | 1-6 | Repository chapter note (`cultural`) | Repository; stated generally. Qumran, m. Pesahim 8:8 and Taylor not named |
| Isaiah 40:1, 3-5; Matthew and Mark quote only 40:3; Jeremiah 1:2 | 1-6 | BSB | Repository |
| Stones and children may be a play on words in Hebrew; uncertain because John's language is uncertain | 7-9 | Earlier ledger (Matthew 3) | Earlier ledger, same caution |
| Matthew 3:7 names Pharisees and Sadducees; Isaiah 51:2; 5:1-7; Malachi 4:1 | 7-9 | BSB | Repository |
| Tolls and customs farmed to contractors who paid in advance; local collectors could overcharge; hated as cheats working for foreign rulers | 10-14 | Bible encyclopedias | Search: biblegateway Encyclopedia of the Bible "Tax Collector"; biblicaltraining.org; julianspriggs.co.uk; jewishvirtuallibrary.org |
| The soldiers probably not Roman legionaries; troops of Antipas or local rulers, perhaps guarding the collectors; not certain | 10-14 | Commentaries | Search: biola.edu "Soldiers in the Gospels"; biblehub study notes; openbible.com commentaries. "Most think" |
| Leviticus 19:13; Isaiah 58:7; Micah 6:8 | 10-14 | BSB | Repository |
| Sandals a slave's task; winnowing | 15-20 | Earlier ledger (Mark 1; Matthew 3) | Earlier ledger |
| Herod Antipas married his brother's wife; Leviticus 18:16; Josephus, Antiquities 18.116-119, John held and killed at Machaerus | 15-20 | Earlier ledger (Mark 6) | Earlier ledger |
| Malachi 3:2; Joel 2:28; 1 Kings 21:17-24; Acts 2:3; two readings of "Spirit and fire" | 15-20 | BSB; standard readings | Repository; stated as readings, no names |
| Jesus praying at 3:21, 6:12, 9:18, 9:29; Matthew 3:17 "This is" against Mark 1:11 and Luke 3:22 "You are" | 21-22 | BSB | Repository |
| Psalm 2:7; Isaiah 42:1; 64:1; why Jesus was baptized (Matthew 3 wording) | 21-22 | BSB; Matthew 3 plain note | Repository |
| Seventy-seven names after Jesus, from Joseph to God (script); Ezra 2:61-63; Genesis 41:46; 2 Samuel 5:4, 5:14 | 23-38 | BSB | Script over the repository's text |
| The second Cainan (3:36): not in the Hebrew of Genesis 11:12, present in the Greek; Luke followed the Greek, or a copyist added it; P75 and Bezae omit it in Luke | 23-38 | Steinmann, JETS 60.4 (2017); reference works | Search: etsjets.org Steinmann; biblehub.com; kjvtoday. Both explanations stated |
| The two genealogies: Africanus, Mary's line, royal line, different traditions; "The site does not choose" | 23-38 | Matthew's book page and Matthew 1 plain note | Repository, same wording |

Left out: the Qumran washings and the Community Rule; proselyte baptism;
Joan Taylor; m. Sanhedrin 10:1; m. Nedarim 3:4; b. Ketubot 96a; the claim
that no legion was in Judea before 66; Josephus's own genealogy and
Africanus on Herod burning the records; the Levites at thirty; Conzelmann;
Admin and Arni; Jerome and the Gospel of the Nazarenes; Meier's criterion
of embarrassment.

## Format repair (2026-11-19)

The first commits for Luke's book page and Luke 1 and 2 rewrote the whole
of `luke/intro.json`, `luke/1.json` and `luke/2.json` in a new layout. They
were put back to their original layout, with only the `teaching` field and
`"plain": true` added.

## The plain notes on Luke 4 (2026-11-19)

`client/public/bible/notes/luke/plain/4.json`. Six searches for this
chapter, with the book page's rows and the earlier ledger.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Luke's order of the tests (bread, kingdoms, temple) against Matthew's; 3:38 then 4:3; "it has been relinquished to me" only in Luke; 22:3; 9:51 | 1-13 | BSB | Repository |
| Deuteronomy 8:2-3, 6:13, 6:16; Psalm 91:11-12 and the dropped "in all your ways"; Hebrews 4:15 | 1-13 | BSB | Repository |
| Two views on whether Christ could sin; the fasting care line | 1-13 | Repository chapter note (`hard`, stated without names); Matthew 4 plain note | Repository; the fasting line copied word for word from Matthew 4 |
| Mark 6:1-6 and Matthew 13:53-58 place the Nazareth visit later, without the reading; 4:23 shows Capernaum came first | 14-21 | BSB | Repository |
| Theodotus inscription, Jerusalem, Greek: a synagogue built for reading the Law and teaching the commandments; most date it before 70, date debated | 14-21 | Inscription | Search: en.wikipedia.org Theodotos inscription; library.biblicalarchaeology.org; cojs.org. Paraphrased |
| Acts 13:15, the reading of the Law and the Prophets, then visitors invited to speak | 14-21 | BSB | Repository; earlier ledger (Mark 5) |
| Mishnah Megillah 4:4: one may skip in the Prophets but not in the Law; Mishnah written down around AD 200, marked later | 14-21 | Mishnah | Search: outorah.org Megillah 4:4-5; posenlibrary.com; sefaria.org. Paraphrased. Whether readings were fixed then: "not known" |
| Reader stands, teacher sits (4:16, 4:20; 5:3) | 14-21 | BSB | Repository |
| Anointing of kings and priests; Messiah and Christ mean anointed; Acts 10:38 | 14-21 | BSB; earlier ledger | Repository |
| Isaiah 61:1-2 with 58:6; Luke follows the Greek (Septuagint) "recovery of sight"; Hebrew "freedom to the prisoners"; "bind up the brokenhearted" absent from the oldest copies (Sinaiticus, Vaticanus, Bezae), present in later ones and the KJV | 14-21 | Septuagint; NA28 apparatus | Search: freely-given.org OBD Luke 4:18; biblia.com NET note; logos.com; intertextual.bible |
| Jesus stops before "the day of our God's vengeance" | 14-21 | BSB; book page row | Repository |
| Jubilee: Leviticus 25:10, 25:23; no clear record it was kept in full, scholars debate whether at all | 14-21 | Reference works | Search: encyclopedia.com "Sabbatical Year and Jubilee"; biblehub topical; Kaplan (2019) and Bergsma (2007) as cited. Stated as debated |
| 11Q13 (Melchizedek), before Jesus' day, joins Leviticus 25 and Isaiah 61 for a release at the end of days | 14-21 | Dead Sea Scroll | Search: wikipedia 11Q13; posenlibrary.com "The Heavenly Prince Melchizedek"; Bartos and Levinson (JBL 2013) as cited. "Before Jesus' day" only; no exact date |
| aphesis twice in 4:18 and for forgiveness at 1:77, 3:3, 24:47 | 14-21 | Greek text | Script over the repository's Greek (G0859) |
| dektos at 4:19 and 4:24 | 22-30 | Greek text | Script (G1184) |
| Zarephath in Sidon; Jezebel daughter of the king of the Sidonians (1 Kings 16:31); Naaman commander of Aram (2 Kings 5:1, 14-15); 1 Kings 17:24; 1 Kings 18:1 "third year"; James 5:17; Jeremiah 37:15, 38:6 | 22-30 | BSB | Repository |
| The scene is not a verdict on the Jewish people | 22-30 | Book page ("Luke and the Jewish people"); repository `teach.pitfalls` | Repository, same stance |
| "Rebuked" (epitimaō) for the demon, the fever and the demons (4:35, 39, 41) | 31-41 | Greek text | Script (G2008) |
| Capernaum's synagogue; unclean spirit; the illness-or-spirit answer | 31-37 | Mark 1 plain note | Earlier ledger; Mark 1 wording adapted ("Luke himself keeps them apart") |
| Sunset ends the Sabbath; carrying a load; Jeremiah 17:21-22; Colossians 4:14 | 38-41 | Earlier ledger (Mark 1) | Earlier ledger |
| 4:44 "Judea" in P75, Sinaiticus, Vaticanus, C, W; "Galilee" in A, D and the Byzantine text (KJV); Judea in a wide sense (1:5) | 42-44 | NA28 apparatus as reported | Search: freely-given.org OBD Luke 4:44; en.wikipedia.org Luke 4; biblia.com |
| Isaiah 52:7; Jeremiah 7:25; Isaiah 1:4; Psalm 106:16; Psalm 103:3 | various | BSB | Repository |

Left out: Josephus on Eleazar the exorcist and Tobit (deep note, not
checked); the "Mount of Precipitation" and any cliff site; Genesis Rabbah on
the physician proverb; Isaiah 58 as the Yom Kippur reading; Yardenna
Alexandre's house and the size of Nazareth beyond the earlier ledger; Sloan,
Ringe, Yoder, Gutiérrez, Jeremias, Sanders, Jervell and Levine by name;
Irenaeus and Gregory on the temptations; Hodge and Shedd by name.

## The plain notes on Luke 5 (2026-11-19)

`client/public/bible/notes/luke/plain/5.json`. Three searches for this
chapter, with the earlier ledger (Mark 1 and 2; Matthew 4, 8 and 9).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Only Luke calls it a lake (limnē, five times in Luke, none in the other Gospels); Gennesaret a plain on the north-west shore | 1-11 | Greek text; repository chapter note (`historical`) | Script over the repository's Greek (G3041) |
| The Galilee boat, 1986, about eight metres | 1-11 | Earlier ledger (Mark 1) | Earlier ledger |
| Fishermen worked at night; many think because fish could see the nets by day (trammel nets) | 1-11 | Mendel Nun's research as reported | Search: christianhistoryinstitute.org "Fishers of Fish"; jerusalemperspective.com "Let Down Your Nets"; ourrabbijesus.com. Stated as "many think" |
| Master then Lord; "Simon Peter" first at 5:8 | 1-11 | BSB | Repository |
| zōgreō: to take alive, used of prisoners taken in war; only here and 2 Timothy 2:26 | 1-11 | Lexicons (Strong's, Thayer, Mounce) | Search: biblehub.com 2221; billmounce.com; blueletterbible.org G2221 |
| Isaiah 6:5; Jeremiah 16:16; Genesis 15:1; Luke 1:30; 2:10 | 1-11 | BSB | Repository |
| John 21:1-14: one event placed differently, or two catches with the second recalling the first; nothing in the faith depends on it | 1-11 | Repository chapter note (`hard`; Brown and Bock not named) | Repository. Both views stated |
| Leprosy, uncleanness, torn clothes, living apart, priest declares clean; Leviticus 13:46; 14; 2 Kings 5:7 | 12-16 | Earlier ledger (Mark 1; Matthew 8) | Earlier ledger; BSB |
| The Matthew 8 care line on sickness and faith, word for word (2 Corinthians 12:9; 2 Timothy 4:20; 1 Timothy 5:23; Colossians 4:14) | 12-16 | Matthew 8 plain note | Copied word for word |
| Roofs; Mark "dug through", Luke "tiles"; Pharisees devoted to the law and respected; scribes | 17-26 | Earlier ledger (Mark 2; Mark 12) | Earlier ledger |
| Mark 2:5 "Son", Luke 5:20 BSB "Friend" for Greek anthrōpe ("Man") | 17-26 | Greek text | Repository Greek and BSB |
| Daniel 7:13-14; Psalm 103:3; Isaiah 35:6; John 9:2-3 | 17-26 | BSB | Repository |
| The Mark 2 wording on the scribes' question, adapted to Luke | 17-26 | Mark 2 plain note | Repository |
| Levi a toll collector for Antipas (most likely); Matthew 9:9; most think one man, Luke does not say | 27-32 | Earlier ledger (Mark 2; Matthew 9) | Earlier ledger. Heracleon not named |
| "to repentance" (5:32) only in Luke (later copies of Matthew and Mark add it) | 27-32 | BSB; repository chapter note (`text`) | Repository BSB text of Mark 2:17 and Matthew 9:13 |
| Exodus 16:7; Luke 15:2; Ezekiel 18:23 | 27-32 | BSB | Repository |
| One commanded fast; weddings lasting days; wineskins | 33-39 | Earlier ledger (Mark 2; Matthew 9) | Earlier ledger |
| Luke's patch from a new garment; 5:39 only in Luke | 33-39 | BSB | Repository |
| 5:39: "good" in P4, Sinaiticus, Vaticanus, W; "better" in A, C and the Byzantine text; Bezae and Old Latin copies omit the verse | 33-39 | NA28 apparatus as reported; Rice, AUSS 1980 | Search: freely-given.org OBD Luke 5:39; biblestudytools.com (Robertson); andrews.edu AUSS 1980-2; Wikipedia Codex Bezae |
| Isaiah 54:5; Hosea 2:19; Amos 9:13; Joel 3:18 | 33-39 | BSB | Repository |

Left out: Josephus on the lake's fertility; K. C. Hanson on fishing leases;
the Akeldama leprosy DNA; Josephus and the Temple Scroll on lepers; the
Talmud on the leper as one dead; the Didache's fasting days; Dewey and
Wrede; Raymond Brown and Darrell Bock by name; Heracleon; the Mishnah on
tax collectors' houses.

## The plain notes on Luke 6 (2026-11-19)

`client/public/bible/notes/luke/plain/6.json`. Three searches for this
chapter, with the book page's rows and the earlier ledger (Mark 2 and 3;
Matthew 5, 7, 10 and 12).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Hand-picking allowed (Deuteronomy 23:25); harvest named (Exodus 34:21); Mishnah (around 200, later) lists reaping and threshing; "some of the Pharisees" | 1-5 | Earlier ledger (Mark 2); BSB | Earlier ledger |
| 1 Samuel 21:1-6; Leviticus 24:5-9; Exodus 31:13; Isaiah 58:13 | 1-5 | BSB | Repository |
| Only Luke: the rubbing (6:1), the right hand (6:6), the night of prayer (6:12) | 1-16 | BSB against Mark 2-3 and Matthew 12 | Repository |
| Mishnah Yoma 8:6: even a doubt of danger to life overrides the Sabbath (later) | 6-11 | Earlier ledger (Matthew 12) | Earlier ledger |
| Pharisees who invite (7:36), warn (13:31), Gamaliel (Acts 5:34-39), Paul (Acts 23:6); Hosea 6:6; Micah 6:8 | 6-11 | BSB | Repository |
| Twelve tribes; Simon the Zealot; Matthew a tax collector; Judas "became a traitor"; apostle "one sent" | 12-16 | Earlier ledger (Mark 3); lexicon | Earlier ledger; repository Greek |
| Thaddaeus (Mark 3:18) and Judas son of James (Luke 6:16; Acts 1:13): most think one man; not stated in the Gospels | 12-16 | Bible dictionaries | Search: biblicaltraining.org "Judas, not Iscariot"; biblehub topical; freely-given.org Thaddaeus. "Most think" |
| Exodus 19; Acts 1:24; Psalm 27:11; 3:21, 9:18, 9:29 | 12-16 | BSB | Repository |
| Same sermon told two ways, or taught more than once: both held | 17-26 | Standard readings | Stated as views; no names |
| Tyre and Sidon Gentile cities; 4:26 | 17-26 | BSB; earlier ledger | Repository |
| "Blessed is" a familiar form; not a wish | 17-26 | Matthew 5 plain note | Repository, same wording |
| ptōchos: reduced to beggary, destitute; the opposite of the rich | 17-26 | Thayer; Strong's; Robertson as quoted | Search: blueletterbible.org G4434; bibletools.org G4434; bibliaparalela.com |
| "Woe" a cry of grief and warning, used by the prophets (Isaiah 5:8) | 17-26 | BSB; standard lexicon sense | Repository |
| Jeremiah 6:14; Psalm 126:5; Proverbs 30:8-9; Matthew 5:3 | 17-26 | BSB | Repository |
| The 6:20 and 6:24 sentences: both money and the heart; not blunted; poverty not holy in itself; the woe a warning, not contempt; 8:3, 19:8-9, 18:27 | 17-26 | Book page ("The big themes", "Luke and money", hard-passage line for 6:20) | Repository, same stance and some of the same words |
| Persecution line ("not a call to seek suffering") | 17-26 | Matthew 5 plain note | Repository |
| Matthew 5:40 lawsuit (tunic, then cloak) against Luke 6:29 (cloak, then tunic) | 27-36 | BSB | Repository |
| Hillel's negative rule, recorded in the Talmud written down centuries later | 27-36 | Earlier ledger (Mark 12; b. Shabbat 31a) | Earlier ledger. No date given for Hillel |
| Matthew 5:48 "perfect" against Luke 6:36 "merciful" | 27-36 | BSB | Repository |
| Leviticus 19:18; Exodus 23:4; Proverbs 25:21; Deuteronomy 15:8 | 27-36 | BSB | Repository |
| The three readings of "turn the other cheek" and the care lines, word for word from Matthew 5:38-42 and 5:43-48 | 27-36 | Matthew 5 plain note; earlier ledger (Tolstoy omitted here) | Copied word for word (the Tolstoy clause dropped) |
| "Give to everyone who asks" not a rule to hand over what will be used for harm | 27-36 | Repository chapter note (`teach.pitfalls`) | Repository |
| Speck and beam; the Matthew 7 wording on judging; Galatians 6:1 | 37-42 | Matthew 7 plain note | Repository |
| kolpos: the fold of the robe above the belt used as a pocket; grain poured into it | 37-42 | Translation commentaries | Search: tips.translation.bible (SIL notes on Luke 6:38); biblehub.com commentaries; bibletruthpublishers.com (Freeman). The selling practice given as Jesus' picture, not as a recorded custom |
| 6:38 not a promise of money for giving | 37-42 | Repository chapter note (`teach.pitfalls`) | Repository |
| Jeremiah 17:10; Leviticus 19:35; Psalm 1:3; Ezekiel 36:26; Luke 18:19 | 37-45 | BSB | Repository |
| Matthew's tree saying aimed at false prophets (7:15-20); Luke's after the speck | 43-45 | BSB | Repository |
| Rains in their seasons; Luke's builder "dug down deep" | 46-49 | Earlier ledger (Matthew 7) | Earlier ledger |
| Proverbs 10:25; Isaiah 28:16; Psalm 18:2 | 46-49 | BSB | Repository |

Left out: deuteroprōtos and Codex Bezae's added saying on the Sabbath worker
(deep note, not needed); Combs (2019); Metzger; penēs against ptōchos (no
source found for the contrast, so not drawn); Avot de-Rabbi Natan's
builders; the Talmud's speck and beam; Tolstoy (dropped from the copied
paragraph to keep it short); the back-handed slap (Luke does not say
"right cheek").

## The plain notes on Luke 7 (2026-11-19)

`client/public/bible/notes/luke/plain/7.json`. Five searches for this
chapter, with the book page's rows and the earlier ledger (Matthew 8 and 11;
John 8, 11, 12 and 20).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Centurion, Antipas's forces "most likely", a Gentile | 1-10 | Earlier ledger (Matthew 8) | Earlier ledger |
| Luke's two delegations; Matthew's short form or Luke's fuller form: both views | 1-10 | Repository chapter note (`historical`) | Repository; no names |
| Acts 10:2; slave (doulos) at 7:2; "highly valued" | 1-10 | BSB; Greek text | Earlier ledger (Matthew 8); repository |
| 2 Kings 5:15; Ruth 4:17; Psalm 107:20 | 1-10 | BSB | Repository |
| Nain identified with Nein on the hill of Moreh, a few miles from Nazareth | 11-17 | Earlier ledger (book page) | Earlier ledger |
| Shunem on the other side of the same hill, a few miles away | 11-17 | Bible atlases and dictionaries | Search: biblehub.com atlas Shunem; itsgila.com; evangelicalmagazine.com "The city of Nain". Sides of the hill vary in the sources, so only "the other side" is said |
| Splanchnizomai, moved deep inside | 11-17 | Earlier ledger (Matthew 9) | Earlier ledger |
| Quick burial (Acts 5:6-10); corpse uncleanness (Numbers 19:11); open bier inferred from the man sitting up | 11-17 | BSB | Repository; stated as "probably" |
| 1 Kings 17:23 "gave him to his mother" and Luke 7:15; 2 Kings 4:32-37; Psalm 68:5; Deuteronomy 10:18; 1:68 | 11-17 | BSB | Repository |
| Grief care: the John 11 lines ("this story does not say you were loved less"; "Grief is not unbelief"; "If grief is crushing you, do not carry it alone. Reach out to people you trust, to a pastor, or to someone trained to help") | 11-17 | John 11 plain note | Copied word for word where marked; the first adapted to the widow |
| John 11:25, 11:35 | 11-17 | BSB | Repository |
| John's question; the two readings of John's doubt; the care line | 18-23 | Matthew 11 plain note | Repository; Chrysostom not named here |
| "At that very hour" only in Luke (7:21) | 18-23 | BSB against Matthew 11 | Repository |
| 4Q521: the Lord will heal the wounded, give life to the dead, bring good news to the poor | 18-23 | Dead Sea Scroll | Search: en.wikipedia.org 4Q521; jamestabor.com; library.biblicalarchaeology.org "Parallel miracles". Paraphrased |
| Isaiah 35:5; 26:19; 61:1; Malachi 3:1; Proverbs 9:1-6 | 18-35 | BSB | Repository |
| Reed, fine clothes, children's games; "least in the kingdom" | 24-35 | Matthew 11 plain note | Repository. The Antipas reed coin not used |
| 7:29-30 only in Luke; Matthew 11:19 "by her actions" against Luke 7:35 "by all her children" | 24-35 | BSB | Repository |
| Reclining on couches, leaning on one elbow, feet away from the table | 36-50 | Reference works on ancient dining | Search: biblicaltraining.org "Triclinium"; julianspriggs.co.uk "Reclining"; tips.translation.bible (SIL on 7:36) |
| Denarius a day's pay (Matthew 20:2) | 36-50 | BSB | Repository |
| Water for feet, kiss, oil (Genesis 18:4; Psalm 23:5); "may not have been required" | 36-50 | BSB; repository chapter note (`cultural`) | Repository |
| Mishnah Ketubot 7:6: a wife going out with her head uncovered may be divorced without her settlement; around 200, later; may not show first-century Galilee | 36-50 | Mishnah | Search: cts.perseids.org Ketubot 7.6; myjewishlearning.com "Hair Coverings for Married Women"; etzion.org.il. The link to the woman's hair is given as "suggests how the gesture might have looked", since no source found draws it |
| Not Mary Magdalene (8:2 introduces her as new), not Mary of Bethany (John 12:1-8); Gregory the Great's sermon of 591 blended them; the Eastern churches kept them apart | 36-50 | Earlier ledger (John 12 and 20) | Earlier ledger, same wording where possible |
| Her sin not named; "a prostitute" not in the text | 36-50 | BSB | Repository |
| 7:47 hoti: love as evidence of forgiveness (the parable; the end of the verse), or love as part of the way to forgiveness; both readings in more than one tradition; 7:50 | 36-50 | NET note; Barnes; Pulpit Commentary; catena of the Fathers as summarised | Search: biblia.com NET note on 7:47; ccel.org Barnes; biblehub.com commentaries; catenabible.com; tips.translation.bible. No tradition labelled; no writer named; no side taken |
| Psalm 32:1; Isaiah 1:18; 1 Samuel 1:17 | 36-50 | BSB | Repository |
| Sexual shame care line, the John 8 sentence word for word | 36-50 | John 8 plain note | Copied word for word |

Left out: the Capernaum synagogue's foundations under 7:5; Hanina ben Dosa
and Vermes; John 4:46-54 as the same event; Josephus on Machaerus (used in
earlier chapters); m. Ketubbot 4:4 on flutes; Numbers 5:18; Lefèvre
d'Étaples (1517) and the 1969 calendar; Raymond Brown by name; the Antipas
reed coin; the alabaster's cost (no figure given).

## The plain notes on Luke 8 (2026-11-19)

`client/public/bible/notes/luke/plain/8.json`. Four searches for this
chapter, with the book page's rows and the earlier ledger (Mark 3, 4 and 5;
Matthew 8, 9 and 13; John 20).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| 8:1-3 only in Luke; Mark names the women only at the cross (Mark 15:40-41); Joanna at the tomb (24:10) | 1-3 | BSB | Repository |
| The only explicit statement in the Gospels of how the travelling work was paid for | 1-3 | Thesis on Luke 8:1-3 (University of Waterloo) as summarised | Search: uwspace.uwaterloo.ca; cbeinternational.org. Stated as "the only place in the Gospels that says plainly" |
| How unusual it was: "We cannot say exactly"; the women's guide for the world they lived in | 1-3 | Site guide `women-in-the-ancient-world` | The guide's "no parallel" claim is not repeated, since no search confirmed it |
| Magdala on the western shore; synagogue found in 2009, built and used before 70 (coin of 29 minted at Tiberias); early Christian texts name it Mary's home | 1-3 | Israel Antiquities Authority dig as reported | Search: worldhistory.org "The Archaeological Excavations at Magdala"; en.wikipedia.org Magdala stone and Migdal Synagogue; magdala.org. "Most likely from Magdala" |
| Chuza Herod Antipas's epitropos, steward or household manager, a senior post | 1-3 | Lexicons and translations | Search: biblehub.com lexicon Luke 8:3; tips.translation.bible; douglasjacoby.com |
| Mary Magdalene not called a prostitute; seven demons not a moral statement; Gregory 591; the East kept the women apart | 1-3 | Earlier ledger (John 20) | Earlier ledger, John 20 wording |
| 1 Kings 17:15; 2 Kings 4:8-10; Joel 2:28; Acts 2:17-18 | 1-3 | BSB | Repository |
| Sowing; rock under thin earth; Luke's differences (seed the word of God, no moisture, for a season, pleasures, noble and good heart, persevering) | 4-15 | Earlier ledger (Mark 4); BSB | Repository |
| Isaiah 6:9; Isaiah 55:11; Luke omits Mark 4:12's "turn and be forgiven" | 4-15 | BSB | Repository |
| The Mark 4 answer on why parables, adapted (Jeremias's "unless" reading dropped) | 4-15 | Mark 4 plain note | Repository |
| House lamp a clay dish of oil; Psalm 119:105; Isaiah 49:6; Luke 2:32 | 16-18 | Earlier ledger (Mark 4); BSB | Repository |
| Luke omits Mark 3:21; 1:38; 2:19; the brothers (Mark 3 wording, word for word but for the last sentence) | 19-21 | Mark 3 plain note; BSB | Repository |
| Deuteronomy 18:15; 5:1; Psalm 27:10; John 19:26-27 | 19-21 | BSB | Repository |
| The lake's sudden storms; fishermen | 22-25 | Earlier ledger (Mark 4) | Earlier ledger |
| Mark 4:38, 4:40 against Luke 8:24-25; "rebuked" (4:35, 39) | 22-25 | BSB | Repository |
| Psalm 89:9; 107:29; Jonah 1:4-5 | 22-25 | BSB | Repository |
| Unclean setting, Leviticus 11:7, graves; Legion some five thousand; Gerasenes, Gadarenes, Gergesenes; Gerasa some thirty miles away; Origen and Gergesa; Kursi in the 1970s | 26-39 | Earlier ledger (Mark 5) | Earlier ledger |
| Abyss (Revelation 20:3); "at the feet" (10:39; Acts 22:3); Isaiah 65:4; Psalm 68:6 | 26-39 | BSB | Repository |
| The Mark 5 lines on illness and spirits, adapted to Luke; the path to help word for word ("If that is where you or someone you love is today, please reach out for real help now, to a doctor, a pastor, or a crisis line"); the pigs | 26-39 | Mark 5 plain note | Repository |
| Leviticus 15:25 and 15:19-27; uncleanness not sin; scholars debate how cut off; tassels (Numbers 15:38) | 40-48 | Earlier ledger (Mark 5; Matthew 9) | Earlier ledger |
| 8:43 "spent all she had on physicians" absent from P75 and Vaticanus, present in other copies; Mark 5:26 | 40-48 | Apparatus as reported; Robertson | Search: Wikipedia "Textual variants in the Gospel of Luke"; bibletools.org (Robertson); biblehub.com |
| Isaiah 53:4; Matthew 8:17 | 40-48 | BSB | Repository |
| Mishnah (around 200): two flutes and a wailing woman; only child (7:12; 9:38); Talitha koum in Mark; "her spirit returned" only in Luke | 49-56 | Earlier ledger (Mark 5); BSB | Repository |
| 1 Kings 17:21; Daniel 12:2 | 49-56 | BSB | Repository |
| Grief line (John 11 wording) | 49-56 | John 11 plain note | Copied word for word |

Left out: Bauckham's Joanna-Junia proposal; Tarichaeae; the Magdala stone's
menorah; m. Bava Kamma 7:7 on pigs; the Kursi road builders' date; the
Malachi 4:2 "wings" echo (could not be checked); kalos kagathos for "noble
and good"; Jeremias on "unless".

## The plain notes on Luke 9 (2026-11-19)

`client/public/bible/notes/luke/plain/9.json`. Three searches for this
chapter, with the book page's rows and the earlier ledger (Mark 6, 8 and 9;
Matthew 8, 14, 16, 17 and 18; John 4).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Travelling light, one house, shaking the dust (Acts 13:51); Mark allows a staff, Luke and Matthew 10:10 do not | 1-9 | Earlier ledger (Mark 6); BSB | Repository |
| Herod Antipas ruler of Galilee; John's death in Mark 6; 3:19-20; 23:8 | 1-9 | Earlier ledger (Mark 6); BSB | Repository |
| Malachi 4:5 | 1-9 | BSB | Repository |
| One of the few events in all four Gospels; only men counted (Matthew 14:21) | 10-17 | Earlier ledger (Matthew 14, "one of the few events"; Mark 6) | Earlier ledger. "The only miracle in all four" not used |
| Bethsaida near where the Jordan enters the lake; site disputed | 10-17 | Earlier ledger (Mark 8) | Earlier ledger |
| Luke has nothing of Mark 6:45 to 8:26 between the feeding and the confession; why not known | 10-17 | BSB comparison | Repository. The label "great omission" not used |
| Exodus 16:4; 18:21; 2 Kings 4:43; 22:19; 24:35 | 10-17 | BSB | Repository |
| The "sharing" explanation of the feeding | 10-17 | Deep note `pitfalls` | Stated without a date or name (the deep note's "nineteenth century" not checked) |
| Christ, Messiah, anointed; Caesarea Philippi; why silence | 18-22 | Earlier ledger (Mark 8) | Earlier ledger |
| Luke sets the question at prayer; omits Mark 8:32-33; 3:21, 6:12; Psalm 2:2; 2 Samuel 7:12-16; 24:26 | 18-22 | BSB | Repository |
| The cross Rome's death for slaves and rebels; carried by the condemned; shame | 23-27 | Earlier ledger (Mark 8) | Earlier ledger |
| "Daily" only in Luke (9:23 against Mark 8:34, Matthew 16:24) | 23-27 | BSB | Repository |
| Psalm 49:8; Daniel 7:13-14; the views of 9:27 (Mark 9 wording) | 23-27 | BSB; Mark 9 plain note | Repository |
| Shelters and Tabernacles; mountain unnamed; Tabor since the 200s, Hermon suggested | 28-36 | Earlier ledger (Mark 9) | Earlier ledger |
| Exodos used three times in the NT (Luke 9:31; Hebrews 11:22; 2 Peter 1:15) | 28-36 | Greek text | Script over the repository's Greek (G1841) |
| 9:35 "chosen" in P45, P75, Sinaiticus, Vaticanus; "beloved" in later copies (A, C, W, Byzantine), likely to match Mark and Matthew; KJV "beloved" | 28-36 | NA28 apparatus as reported; NET note | Search: freely-given.org OBD Luke 9:35; biblia.com NET note; Wikipedia "Textual variants in the Gospel of Luke". Stated as "the oldest copies" |
| Exodus 34:29; Psalm 2:7; Isaiah 42:1; Deuteronomy 18:15; 22:45 | 28-36 | BSB | Repository |
| The glory shown to strengthen the disciples for the cross | 28-36 | Deep note (Leo the Great) | Stated as "one common answer", no name (Leo not checked) |
| Seizures; the Greek medical writing of about 400 BC; Mark's "help my unbelief"; the Mark 9 illness wording word for word | 37-45 | Earlier ledger (Mark 9); Mark 9 plain note | Repository |
| Only child (7:12; 8:42; 9:38); "gave him back" (7:15; 9:42); Deuteronomy 32:5; 1 Kings 17:23 | 37-45 | BSB | Repository |
| A child had no rank; pais for child and servant | 46-50 | Earlier ledger (Mark 9; Matthew 18) | Earlier ledger |
| Numbers 11:29; 11:23 against 9:50 (Mark 9:38-41 answer) | 46-50 | BSB; Mark 9 plain note | Repository |
| 9:51 the turning point; 13:22, 17:11, 18:31 | 51-56 | Book page; BSB | Repository |
| Greek of 9:51 "set his face" (prosōpon estērisen); analēmpsis only here in the NT; analambanō for the ascension (Acts 1:2, 11, 22) | 51-56 | Greek text | Script over the repository's Greek (G0354, G0353, G4383) |
| Samaritans: God of Israel, five books of Moses, Gerizim; Galilean pilgrims killed (Antiquities 20.118); about nine hundred today | 51-56 | Earlier ledger (John 4; Jewish life portrait) | Earlier ledger, John 4 wording |
| 2 Kings 1:10-12; Isaiah 50:7; 10:33; 17:16; Acts 8:5-6; 19:10 | 51-56 | BSB | Repository |
| 9:54 "as Elijah did" lacking in P45, P75, Sinaiticus, Vaticanus, in most later copies; 9:55-56 longer words lacking in P75, Sinaiticus, Vaticanus and others; part of them in Bezae and others, all in many later copies and the KJV; most scholars think them added | 51-56 | NA28 apparatus as reported; NET note; Metzger and Omanson as reported | Search: uasvbible.org (apparatus list); biblia.com NET note 9:54; journeywithjesus.net; Wikipedia "Textual variants in the Gospel of Luke". P45 not named for 9:55-56 (not confirmed); P75 "around AD 200" from the earlier ledger |
| Burying a father; the three readings; McCane's second burial (not named here); the Matthew 8 care paragraph adapted (Mark 7:10-13 and Luke 18:20 for Matthew 15:4-6; John 11:35 sentence dropped) with its last line word for word | 57-62 | Earlier ledger (Matthew 8); Matthew 8 plain note | Repository |
| 1 Kings 19:19-20 | 57-62 | BSB | Repository |

Left out: the Cynic philosophers' staff and bag; Theissen; Josephus on Machaerus; Bethsaida-Julias and the two sites; the "great omission" label; Plutarch and Yehohanan (they are in the Mark 8 note); Leo the Great, Palamas, Callixtus III and Raphael; Conzelmann, Evans and Moessner on the travel section; Tertullian and Marcion on the fire; Ambrose; Hengel and Sanders on the burial saying; Tobit and m. Berakhot 3:1.

## The plain notes on Luke 10 (2026-11-19)

`client/public/bible/notes/luke/plain/10.json`. Six searches for this
chapter, with the earlier ledger (Mark 6, 10 and 12; Matthew 11 and 20;
John 4).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Seventy or seventy-two: early copies divided; KJV seventy, BSB seventy-two; scholars still argue | 1-12 | Apparatus and studies as reported (incl. a 2017 Cambridge journal article on P45 at 10:17) | Search: biblehub.com; biblicaltraining.org "Seventy Disciples"; americanbible.org; cambridge.org. No manuscript named, since the witness lists were not confirmed |
| Genesis 10: seventy nations in the Hebrew, seventy-two in the Greek | 1-12 | Reference works | Search: biblicaltraining.org and others as reported. Stated "if that is in the background" |
| Numbers 11:16, 25-26 (seventy elders; Eldad and Medad) | 1-12 | BSB | Repository |
| "The worker is worthy of his wages" quoted at 1 Timothy 5:18 | 1-12 | BSB | Repository |
| Isaiah 27:12; Genesis 18:20; 9:54-55 | 1-12 | BSB | Repository |
| Woe as "alas"; the three towns on the north shore | 13-16 | Earlier ledger (Matthew 11) | Matthew 11 wording |
| Ezekiel 28:2; Isaiah 14:13-15; Hades the Greek for Sheol; 12:48 | 13-16 | BSB; standard | Repository |
| Three readings of 10:18 (during the mission; the first rebellion; the cross) | 17-20 | Commentaries; deep note | Stated as views |
| Isaiah 14:12; Psalm 91:13; Exodus 32:32; Daniel 12:1; 4:12; Acts 7:59-60; 12:2 | 17-20 | BSB | Repository |
| Matthew 11:25-27 note ("not praise of ignorance"); Isaiah 35:5; 1 Peter 1:10; Luke 1:1-4 | 21-24 | Matthew 11 plain note; BSB | Repository |
| Deuteronomy 6:5; Leviticus 19:18, 34; 18:5; 18:13-14; Mark 12:28-34; Matthew 22:34-40 | 25-29 | BSB | Repository |
| Jerusalem to Jericho about 25 km, a drop of about 1,000 m | 30-37 | Earlier ledger (Mark 10) | Earlier ledger |
| Ascent of Adummim (Joshua 15:7); Adummim "red", probably the rocks; Jerome said it was named for blood shed by robbers | 30-37 | Bible geography; Jerome as reported | Search: bibleplaces.com "The Ascent of Adummim"; jw.org Insight "Adummim"; waynestiles.com; en.wikipedia.org Good Samaritan. "Writing around AD 400" (date of the work not pinned) |
| Leviticus 21:1-3 (priest and the dead); Numbers 19:11 not quoted | 30-37 | BSB | Repository |
| Mishnah Nazir 7:1: a high priest and a Nazirite become unclean for a neglected corpse (met mitzvah) | 30-37 | Mishnah (around 200, marked later) | Search: mishnah.org Nazir 7:1; torahclass.com; patheos.com "The bad Samaritan". Paraphrased |
| Bauckham, "The Scrupulous Priest and the Good Samaritan", New Testament Studies 44 (1998) 475-489: purity against love, love overrides; Levites' purity rules uncertain | 30-37 | Bauckham | Search: cambridge.org (NTS article page and PDF); NTS 44.4 front matter |
| The corpse-impurity explanation contested; "the story gives them no excuse" | 30-37 | The above | Stated as debated |
| Samaritans (John 4 wording); about nine hundred today; 9:53 | 30-37 | Earlier ledger (John 4) | Earlier ledger |
| The expected third figure an Israelite layman | 30-37 | Commentaries | Stated as "Many readers think" |
| Olive oil a common medicine; wine to clean wounds | 30-37 | Earlier ledger (Mark 6) for oil | Wine stated as "many think" |
| Two denarii two days' pay (Matthew 20:2) | 30-37 | BSB | Repository |
| 2 Chronicles 28:15 (Samaria, oil on wounds, donkeys, Jericho); Hosea 6:6 | 30-37 | BSB | Repository; the link to the parable stated as "many readers think" |
| Augustine's allegory (Quaestiones Evangeliorum 2.19): man Adam, Samaritan the Lord, inn the church | 30-37 | Augustine | Search: proquest.com; adlimina.blogspot.com; restlesspilgrim.net. Paraphrased; no section number on the page |
| Bethany the sisters' village (John 11:1, 5); Acts 22:3 "at the feet of Gamaliel" | 38-42 | BSB | Repository |
| Mishnah Avot 1:4: make your house a meeting place for the wise, sit in the dust of their feet | 38-42 | Mishnah (around 200, marked later) | Search: sefaria.org Avot 1:4 and English explanation; cojs.org. Paraphrased; Yose ben Yoezer not named |
| Women at a teacher's feet unusual | 38-42 | Commentaries | Stated as "Many scholars think" |
| Deuteronomy 8:3; 4:4; Psalm 46:10; 8:3; 22:27 | 38-42 | BSB | Repository |

Left out: which manuscripts read seventy and which seventy-two; the Talmud's
seventy nations; the 10:42 variant ("few things" or "one"); the Inn of the
Good Samaritan site; Josephus on robbers; a lodging price for two denarii;
Origen's allegory; every scholar named in the deep note and not checked.

## The plain notes on Luke 11 (2026-11-19)

`client/public/bible/notes/luke/plain/11.json`. Three searches for this
chapter, with the earlier ledger (Mark 3 and 7; Matthew 6, 7, 12 and 23).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Luke's shorter form ("Father"; no "Your will be done", no "deliver us"; "sins"); later copies filled in from Matthew, as in the KJV; the oldest copies have the shorter form | 1-4 | BSB; apparatus as reported (P75 lacks "deliver us from evil") | Search: en.wikipedia.org "Lord's Prayer"; Wikipedia "Papyrus 75". Two explanations stated as "some think", no majority claimed. The Holy Spirit variant left out (not confirmed) |
| "Hallowed", "daily", "temptation"; forgiveness as sign, not price; the misuse paragraph word for word | 1-4 | Matthew 6 plain note; earlier ledger (Matthew 6) | Repository |
| Isaiah 63:16; Exodus 16:4; Proverbs 30:8 | 1-4 | BSB | Repository |
| Anaideia only here in the NT; usual sense "shamelessness"; readings: persistence, the asker's boldness, the sleeper's shame; debated | 5-13 | Lexicons and studies as reported (Johnson, JETS 1979; Snodgrass, JBL 1997; Bailey) | Search: biola.edu "The difference of one word"; galaxie.com (Johnson); ibiblio.org b-greek (Snodgrass); hts.org.za; workingpreacher.org. Script over the repository's Greek (G0335, one occurrence). No scholar named on the page |
| Hospitality a duty, shame of an empty table | 5-13 | Earlier ledger (Mark 6) | General; the sleeper's words from the verse |
| "Ask, seek, knock" (Matthew 7 wording; the skeptic and prosperity sentences and the last sentence word for word); egg and scorpion only in Luke; Holy Spirit for "good things" | 5-13 | Matthew 7 plain note; BSB | Repository |
| Psalm 145:18; Jeremiah 29:13; 22:42 | 5-13 | BSB | Repository |
| Beelzebul and Baal-zebub; other exorcists | 14-23 | Earlier ledger (Mark 3; Matthew 12) | Matthew 12 wording |
| Finger of God for Spirit of God; Exodus 8:19; 31:18; Isaiah 49:25; "fully armed" and "the armor in which the man trusted" only in Luke | 14-23 | BSB | Repository; script over the repository's Greek (daktulos at 11:20) |
| 6:18; 7:21 keep sickness and spirits apart; the Matthew 9/12 illness sentence word for word | 14-23 | BSB; Matthew 12 plain note | Repository |
| The empty house; the Matthew 12:43-45 illness paragraph adapted, with "Illness of body or mind is illness" and its help line word for word | 24-28 | Matthew 12 plain note | Repository |
| 11:27-28 only in Luke; 1:38, 42, 48; 2:19; readings of 11:28 | 24-28 | BSB; standard positions | Repository; stated as views |
| Isaiah 34:14; Proverbs 8:34 | 24-28 | BSB | Repository |
| Nineveh, the queen of Sheba; Luke has no three days; the "misuse" sentences (Matthew 12 wording) | 29-36 | Matthew 12 plain note; BSB | Repository |
| Good eye generous, bad eye grudging | 29-36 | Earlier ledger (Matthew 6) | Earlier ledger |
| Jonah 3:4-5; 1 Kings 10:1; Psalm 119:105 | 29-36 | BSB | Repository |
| Jesus at Pharisees' tables (7:36; 11:37; 14:1); 13:31 | 37-44 | BSB | Repository |
| Who the Pharisees were; "Pharisee" not a word for hypocrite; the verdict and "every age" sentences | 37-44 | Matthew 23 plain note; earlier ledger (Matthew 23) | Matthew 23 wording, adapted to the table |
| Ritual washing; baptizō in 11:38; priests' washing; the Pharisees' aim at ordinary meals | 37-44 | Earlier ledger (Mark 7); Greek text | Earlier ledger; script over the repository's Greek (G0907) |
| Mishnah Sheviit 9:1 (around 200): rue among plants exempt from tithes; Matthew has dill and cumin | 37-44 | Mishnah | Search: mishnah.org Sheviit 9:1; biblegateway Encyclopedia of the Bible "Rue"; bibletranslationtools.org notes. Marked as later, "If that rule was known" |
| Unmarked graves; Numbers 19:16; the whitewashed tombs of Matthew 23:27 | 37-44 | BSB | Repository |
| Micah 6:8; Hosea 6:6; Isaiah 5:8; James 3:1 | 37-44 | BSB | Repository |
| Abel; Zechariah son of Jehoiada (2 Chronicles 24:20-22); Chronicles last, order debated | 45-54 | Earlier ledger (Matthew 23) | Matthew 23 wording |
| Guilt not inherited; the "Christ-killers" sentences; Acts 4:27; AD 70 | 45-54 | Matthew 23 plain note; earlier ledger | Word for word, Nostra Aetate sentence not repeated |
| Malachi 2:7-8; Genesis 4:10; 2 Chronicles 24:22 | 45-54 | BSB | Repository |

Left out: the Holy Spirit petition in some copies of 11:2 (not confirmed);
Bailey's village customs; the Talmud's tithing rules; m. Demai; who first
read "Pharisee" as hypocrite; the deep note's scholars.

## The plain notes on Luke 12 (2026-11-19)

`client/public/bible/notes/luke/plain/12.json`. Two searches for this
chapter, with the earlier ledger (Mark 3, 4, 10 and 12; Matthew 5, 6, 10,
11, 12 and 24) and the book page.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Flat roofs; Gehenna, Hinnom (Jeremiah 7:31); five sparrows for two pennies against Matthew's two for one | 1-7 | Earlier ledger (Matthew 10); BSB | Matthew 10 wording |
| "My friends" only in Luke at 12:4; leaven a little working through the lump | 1-7 | BSB comparison; earlier ledger (Matthew 13) | Repository |
| Proverbs 9:10; 1 Samuel 14:45 (Matthew 10 OT wording, word for word); the Matthew 10 care sentences adapted ("The warning is not meant to frighten anyone into faith, and it is not meant to sit alone." word for word) | 1-7 | Matthew 10 plain note | Repository |
| Blasphemy sentences from Mark 3 and Matthew 12 word for word ("It is not a careless word spoken once in anger. It is a settled refusal to see God's goodness as good, a refusal that shuts the door on the very forgiveness Jesus offers." "Many Christians have feared they committed this sin." "A long pastoral tradition answers that the fear itself is a sign that the heart has not turned hard in this way."); Bunyan, Grace Abounding (1666) | 8-12 | Mark 3 and Matthew 12 plain notes; earlier ledger (Matthew 12) | Repository |
| Peter's denial and restoration (22:32, 54-62); Acts 4:8-13; 6:10; Exodus 4:12 | 8-12 | BSB | Repository |
| Deuteronomy 21:17 (double share) | 13-21 | BSB | Repository |
| Sirach 11:18-19: a man grown rich says he has found rest and will enjoy his goods, not knowing his time | 13-21 | Sirach (Greek) | Search: intertextual.bible (Sirach 11:19 and Luke 12:19); bible.usccb.org Sirach 11 notes; biblia.com RSV. Paraphrased. Date "early in the second century BC" from the earlier ledger (Matthew 11) |
| Psalm 14:1; Psalm 49:16-17; Ecclesiastes 2:18-19; Genesis 41:35-36; Proverbs 6:6-8 | 13-21 | BSB | Repository |
| Not against saving or planning; against greed and storing "for himself"; Luke and money (prosperity and contempt both refused) | 13-21 | Book page `money` | Repository |
| Do not worry: the Matthew 6 wording; the help paragraph word for word ("This passage is not a rebuke ... call or text 988 right now.") | 22-34 | Matthew 6 plain note; the Honest Answer "Is my anxiety a spiritual failure?" | Copied word for word |
| Ravens unclean (Leviticus 11:15); Psalm 147:9; Job 38:41; 1 Kings 10 | 22-34 | BSB | Repository |
| Readings of "sell your possessions"; Antony gave his land after hearing the Gospel read | 22-34 | Earlier ledger (Mark 10, Athanasius, Life of Antony 2); BSB Acts 2:44-45; 5:4; 19:8-9 | Earlier ledger; repository |
| "Let your waists be girded" (12:35); clay oil lamps | 35-48 | Greek text; earlier ledger (Mark 4) | Script over the repository's Greek |
| Second or third watch: Jewish three or Roman four watches, either way the middle of the night or later | 35-48 | Commentaries as reported | Search: biblehub.com commentaries 12:38; biblegateway Reformation Study Bible note. System not named on the page |
| The master serving at table only in Luke; 22:27 | 35-48 | BSB | Repository |
| The faithful and wicked servant (Matthew 24 wording, two sentences word for word); Exodus 12:11; Ezekiel 34:2 | 35-48 | Matthew 24 plain note; BSB | Repository |
| Baptism as his death (Mark 10:38); fire readings (3:16; Acts 2:3); Micah 7:6; Isaiah 9:6; 2:14; 19:42; 22:51; Romans 12:18; Psalm 27:10 | 49-53 | BSB; book page hard line on 12:49 | Repository |
| "This is a picture of division, not a call to violence"; "No one may use this ... inside a family or outside it"; the family-rejection care paragraph word for word but for the sentence on Mark 10:29-30 | 49-53 | Matthew 10 plain note | Repository |
| West wind from the sea brings rain, south wind from the desert heat | 54-59 | The verses; geography | Common geography |
| Lepton the smallest coin; the widow's two (21:2); Matthew 5:25-26 | 54-59 | Greek text; earlier ledger (Mark 12) | Script over the repository's Greek |
| Jeremiah 8:7; Proverbs 25:8 | 54-59 | BSB | Repository |

Left out: 1 Enoch 97:8-10; Malherbe; the Epicurean reading of "eat, drink,
and be merry"; the hours of each night watch; Thomas's Gospel; Marcion;
every deep-note scholar not checked.

## The plain notes on Luke 13 (2026-11-19)

`client/public/bible/notes/luke/plain/13.json`. Three searches for this
chapter, with the earlier ledger (Mark 2, 4, 11 and 15; Matthew 7, 13 and
23; John 7 and 9).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The Galileans killed by Pilate at their sacrifices: told only by Luke, no other ancient record; Josephus's Gerizim massacre a different place and people | 1-5 | Commentaries as reported | Search: biblestudytools.com; catenabible.com (Lapide); biblehub.com. "No other ancient writer tells of this event"; Gerizim not mentioned on the page |
| Philo charges Pilate with violence; Josephus on the standards; both accounts hostile | 1-5 | Earlier ledger (Mark 15: Philo, Embassy to Gaius 299-305; Josephus, Jewish War 2.169-174) | Earlier ledger. The aqueduct episode not used |
| Pool of Siloam found in 2004 | 1-5 | Earlier ledger (John's book page) | Earlier ledger |
| Tower of Siloam named only in Luke; location unknown (Silwan, near the pool, the Ophel; Weill's tentative tower) | 1-5 | Bible encyclopedias | Search: biblicaltraining.org "Tower of Siloam"; biblegateway Encyclopedia of the Bible; jw.org Insight "Siloam". "Perhaps part of the city wall"; Weill not named |
| Job 4:7; 42:7; Ezekiel 33:11; John 9:3; 19:43-44; AD 70 | 1-5 | BSB; earlier ledger (Mark 13) | Repository |
| Care: "Grief is not unbelief. If grief is crushing you, do not carry it alone. Reach out to people you trust, to a pastor, or to someone trained to help." | 1-5 | Luke 7 plain note (John 11 wording) | Copied word for word |
| Luke has no cursing of the fig tree (Mark 11:12-14; Matthew 21:18-19) | 6-9 | BSB comparison | Repository |
| Kopria (manure) in 13:8 | 6-9 | Greek text | Script over the repository's Greek (G2874) |
| Isaiah 5:4; Micah 7:1; 2 Peter 3:9 | 6-9 | BSB | Repository |
| Readings of owner and keeper | 6-9 | Standard positions | Stated as views |
| The Sabbath a gift and a sign (Mark 2 wording); Deuteronomy 5:15; Mark 2:27 | 10-17 | Mark 2 plain note; BSB | Repository |
| Luō for the ox (13:15) and the woman (13:16); "daughter of Abraham"; 19:9 | 10-17 | Greek text; BSB | Script over the repository's Greek (G3089) |
| Illness sentences: "The Gospel does not teach that every disability or illness has an evil spirit behind it, and it would be wrong and cruel to say so of anyone today." (Matthew 9/12) and "Illness of body or mind is illness." (Matthew 12) word for word; 6:18; 7:21 | 10-17 | Matthew 9 and 12 plain notes; BSB | Repository |
| Mustard, leaven, three measures (Genesis 18:6) | 18-21 | Earlier ledger (Mark 4; Matthew 13) | Matthew 13 wording |
| Ezekiel 17:23; 12:1 | 18-21 | BSB | Repository |
| Agōnizomai in 13:24 ("agony") | 22-30 | Greek text | Script over the repository's Greek (G0075) |
| The narrow way (Matthew 7 wording: "Christians also differ on what final judgment is like, and these notes do not settle that here." and the closing sentences adapted from "gate" to "door"); 18:13-14 | 22-30 | Matthew 7 plain note | Repository |
| Psalm 6:8; Psalm 107:3; Isaiah 25:6 | 22-30 | BSB | Repository |
| Antipas ruled Galilee and Perea under Rome; killed John (9:9) | 31-35 | Earlier ledger (Mark 6) | Earlier ledger |
| Pharisees warn Jesus (Matthew 23 wording on who they were) | 31-35 | Matthew 23 plain note | Repository |
| The fox: cunning (and perhaps destructive); some read it as "not to be feared" | 31-35 | Commentaries as reported (Zondervan dictionary; Gundry) | Search: charlottemasonpoetry.org "That fox"; openbible.com commentaries; tips.translation.bible. The lion contrast not found and not used |
| Teleioumai "I am perfected" (13:32) | 31-35 | Greek text | Script over the repository's Greek (G5048) |
| The hen (Matthew 23:37 wording word for word); 19:41; Ruth 2:12; Psalm 91:4; Jeremiah 22:5; Psalm 118:26; 19:38; readings of 13:35 (Matthew 23 wording) | 31-35 | Matthew 23 plain note; BSB | Repository |

Left out: the Gerizim massacre (a different event); the aqueduct episode;
Judas the Galilean's followers; the hours and height of the tower; Weill;
the Damascus Document and the Mishnah on animals on the Sabbath; Leviticus
19:23-25 on young trees; the lion contrast for the fox; Gundry and Bock by
name.

## The plain notes on Luke 14 (2026-11-19)

`client/public/bible/notes/luke/plain/14.json`. Five searches for this
chapter, with the earlier ledger (Mark 6, 8 and 9; Matthew 5 and 10).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Dropsy: fluid swelling; ancient medicine held its sufferers insatiably thirsty; dropsy a common Greek and Roman picture of greed; Horace, Odes 2.2; some scholars (Braun, Hartsock) read Luke 14:1-6 as opening the chapter's theme | 1-6 | Horace, Odes 2.2; Hartsock, Biblical Interpretation (2013) and Braun (1995) as reported | Search: cts.perseids.org Odes 2.2 (Conington); radicaldiscipleship.net (Myers citing Gilleland); core.ac.uk. "Some scholars think"; no scholar named; "Luke does not say so" |
| Hudrōpikos only in 14:2 in the NT | 1-6 | Greek text | Script over the repository's Greek (G5203, one occurrence) |
| Third meal at a Pharisee's (7:36; 11:37); third Sabbath healing with objection (6:6-11; 13:10-17); the Pharisees (Luke 11 wording) | 1-6 | BSB; Luke 11 plain note | Repository |
| Deuteronomy 5:14-15 | 1-6 | BSB | Repository (the part with an em-dash not quoted) |
| Reclining at table; places of honour; honour a public verdict; Luke 14:8-10 close to Proverbs 25:6-7 | 7-11 | The site's honour-and-shame portrait (`client/public/context/worlds/honor-and-shame.json`) | Repository |
| Proverbs 25:6-7; 1 Samuel 2:8; Luke 1:52 | 7-11 | BSB | Repository |
| The Rule of the Congregation (1QSa 2:3-10) bars the lame, blind, deaf and those with a visible blemish from the assembly of the last days, because holy angels are present | 12-14 | 1QSa | Search: dornsife.usc.edu (West Semitic Research Project) "The Rule of the Congregation"; bc.edu CJL translation; orion-bibliography.huji.ac.il (Wassen 2008). Column and line not given on the page |
| Deuteronomy 14:29; Leviticus 21:18; 2 Samuel 9:13; Proverbs 19:17; Acts 2:44-46 | 12-14 | BSB | Repository |
| Esther 6:14 (servants fetch Haman to the banquet); Deuteronomy 24:5; Isaiah 25:6, 8; 55:1; Matthew 22:1-14 | 15-24 | BSB | Repository |
| Augustine at first opposed coercion; in Letter 93 to Vincentius (about 408), a Donatist bishop, he says he changed his mind and cites "compel them to come in" for the church's use of imperial law | 15-24 | Augustine, Letter 93 | Search: newadvent.org/fathers/1102093.htm; earlychurchtexts.com "Letter 93 to Vincentius (Cogite Intrare)"; romanletters.org; Schaff as quoted. Paraphrased; "around AD 408" |
| Pierre Bayle, a Protestant exile, Philosophical Commentary on Luke 14:23 (1686), against forcing conscience, written amid the persecution of French Protestants | 15-24 | Bayle | Search: encyclopedia.com "Bayle, Pierre"; books.openbookpublishers.com (the 1686 text); oll.libertyfund.org. Paraphrased. The 1685 revocation and the dragoons not named (not tied by the search) |
| Dignitatis Humanae (7 December 1965): no one to be forced to act against conscience in religious matters | 15-24 | Second Vatican Council | Search: vatican.va (the text, section 2); cbcew.org.uk PDF; ewtn.com. Paraphrased |
| Anagkazō: Matthew 14:22, Mark 6:45 (Jesus "made" the disciples get into the boat), Luke 14:23, Acts 26:11 and others; parabiazomai at Luke 24:29 ("pleaded") | 15-24 | Greek text; BSB | Script over the repository's Greek (G0315, G3849) |
| Luke 9:55; 2 Corinthians 5:20 | 15-24 | BSB | Repository |
| "Hate" as "love less" (Genesis 29:30-31) and the sentence on the sharper word, word for word; the family-rejection paragraph word for word; "The division Jesus speaks of comes from others' response to him, not from his followers' hostility." | 25-33 | Matthew 10 plain note | Copied word for word |
| Exodus 20:12; Luke 18:20; John 19:26-27; 1 Timothy 5:8; Mark 7:9-13; Psalm 27:10; Luke 5:11, 28; Acts 5:4 | 25-33 | BSB | Repository |
| Aretas IV defeated Antipas around AD 36 (Josephus) | 25-33 | Earlier ledger (Mark 6) | Earlier ledger |
| Salt (Matthew 5 wording: "How salt could lose its taste has been explained in different ways, and no one explanation is agreed. The picture is plain enough: salt that does not do what salt does is useless."); Leviticus 2:13 (Mark 9) | 34-35 | Matthew 5 and Mark 9 plain notes | Copied word for word |

Left out: the Damascus Document on animals in a pit and the later rabbinic
rules (b. Shabbat 128b, m. Yoma 8:6); Plutarch's Table Talk; Leviticus Rabbah
1:5 and Akiva; the Gospel of Thomas, saying 64; Bar Ma'yan in the Jerusalem
Talmud and Jeremias; "a buyer inspected a field before purchase" and the
tested oxen (the deep note's custom, not checked); Gregory the Great's homily;
Thomas Aquinas on compelling heretics; Letter 185; the dragonnades and the
1685 revocation; Jerome to Heliodorus; Kierkegaard; Bonhoeffer; Bach and the
lectionaries; Dead Sea salt and b. Bekhorot 8b; salt on soil and manure;
mōrainō ("become foolish").

## The plain notes on Luke 15 (2026-11-19)

`client/public/bible/notes/luke/plain/15.json`. Five searches for this
chapter, with the earlier ledger (Luke 3; Matthew 18 and 23; Mark 10) and the
site's honour-and-shame portrait.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Tax collectors and "sinners" (Luke 3 wording); table fellowship as acceptance; 5:30 | 1-7 | Luke 3 plain note; BSB | Repository |
| Matthew's setting against Luke's ("goes astray", "if he finds it") | 1-7 | Matthew 18 plain note | Copied in substance from its wording |
| Isaiah 40:11; Ezekiel 34:16 | 1-7 | BSB | Repository |
| Drachma roughly equal to a denarius, about a day's wage (an approximation) | 8-10 | Bible reference works | Search: biblehub.com 1406; depts.ttu.edu "Coins Mentioned in the New Testament"; jw.org Insight "Money" (the official Roman rate three quarters of a denarius). "Worth about the same", "roughly" |
| Philas and geitonas feminine in 15:9 (masculine in 15:6) | 8-10 | Greek text | Script over the repository's Greek |
| Gregory the Great (Homily 34) reads the woman as God and the lamp as God's wisdom appearing in a human life | 8-10 | Gregory, Homilies on the Gospels 34, as reported | Search: en.wikipedia.org "Parable of the Lost Coin"; catenabible.com; biblesnet.com (Trench). Paraphrased; "around AD 600" |
| Isaiah 49:15; 66:13; Zephaniah 3:17; 13:18-21 | 8-10 | BSB | Repository |
| Firstborn's double share (Deuteronomy 21:17), so a younger son's third | 11-19 | BSB | Repository |
| Sirach 33:20-24 (numbered 33:19-23 in some editions): do not give your property away while you live, lest you must ask for it back | 11-19 | Sirach | Search: biblehub.com/catholic/sirach/33-20; usccb.org Sirach 33; tips.translation.bible. "About two centuries before Jesus"; verse numbers not given on the page |
| Request unusual and a break with the honour a son owed | 11-19 | The site's honour-and-shame portrait ("a hard break with the honor a son owed") | Repository. "Wishing the father dead" not used |
| Pigs unclean (Leviticus 11:7) | 11-19 | BSB | Repository |
| Keratia most likely carob pods, cheap fodder (especially for pigs), eaten by the poor in hard times; the identification usual but not certain | 11-19 | Lexicons and Bible dictionaries | Search: biblehub.com 2769; jw.org Insight "Carob Pod"; tips.translation.bible "luke 1516". "Most likely" |
| Eis heauton elthōn, "came to himself" (15:17) | 11-19 | Greek text | Script over the repository's Greek |
| Hosea 14:1-2, 4; Ezekiel 18:23 | 11-19 | BSB | Repository |
| Bailey on the running father as a modern parallel, and Aristotle's great-souled man with a slow step (Nicomachean Ethics 4.3) | 20-24 | The site's honour-and-shame portrait | Repository. Bailey marked as a modern parallel, as the portrait has it; Aristotle paraphrased, not quoted |
| Robe, ring, Genesis 41:42; the son's standing restored | 20-24 | Honour-and-shame portrait; BSB | Repository |
| Rembrandt painted the son's return | 20-24 | Luke's book page | Repository. No date or collection given |
| Genesis 33:4; Psalm 103:13; Jeremiah 31:20; Luke 22:20; 24:46-47; Romans 5:8 | 20-24 | BSB | Repository |
| Atonement views stated without a side; pointer to the Mark 10 ransom paragraph | 20-24 | Mark 10 plain note; deep note | Stated as views; Socinus, Warfield, the liberal "gospel within the gospel" and m. Yoma 8:8 not named |
| Care: "If your own father was absent, or hurt you, ... is not asking you to pretend otherwise. It tells you that you have a Father in heaven who is not like that." | 20-24 | Matthew 23 plain note | Word for word, "this verse" made "this story" |
| Teknon "child" in 15:31 | 25-32 | Greek text | Script over the repository's Greek |
| Tertullian (On Modesty 8-9) reports the common reading of the older son as the Jews and the younger as the Gentiles, and disputes it; Augustine among those who read the sons as two peoples | 25-32 | Tertullian, De pudicitia 8-9; Augustine (a sermon) as reported | Search: bkv.unifr.ch De pudicitia 9; sermonindex.net (Augustine); scalar.usc.edu. "As early as the 200s"; Augustine and Jerome not named on the page (Quaestiones 2.33 and Letter 21 not confirmed) |
| Jonah 4:2 | 25-32 | BSB | Repository |
| Care: "Mary and Joseph lost their son for three days and did not understand his answer. If you have a child who has wandered or whom you cannot understand, you are not the first." | 25-32 | Luke 2 plain note | Word for word |

Left out: Sanders and Dunn on "sinners"; m. Bava Batra 8:7; m. Bava Kamma
7:7; Leviticus Rabbah 13:4; Acts 11:28; the Gospel of Thomas, saying 107;
shepherds in later rabbinic lists of low trades; Jeremias's dowry headdress;
"wishing the father dead" and every village ceremony (as instructed); the
sandals of free men; sumphōnia; Exodus 10:16; Socinus, Warfield and Levine
by name; Augustine's Quaestiones 2.33 and Jerome's Letter 21 (not confirmed).

## The plain notes on Luke 16 (2026-11-19)

`client/public/bible/notes/luke/plain/16.json`. Five searches for this
chapter, with the earlier ledger (Mark 10; Matthew 5, 6, 11, 16 and 23; John
11; Luke 11 and the book page).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Estates run by managers who handled rents, debts and contracts; debts owed in oil and wheat; a hundred measures a large amount | 1-9 | Deep note; Luke 8 ledger (epitropos) | Stated generally; no litres, no Jeremias valuation |
| Three readings of the manager: cheated again and praised for shrewdness; cut his own commission (Fitzmyer, TS 1964); cut hidden interest forbidden by the Law (Derrett, NTS 1961); the critics' reply that the amounts do not match interest rates and the debtors are not said to be Jews (Kloppenborg, Biblica 1989, as reported); neither theory widely accepted | 1-9 | Studies as reported | Search: biblegateway.com IVP NT commentary "Parable of the Shrewd Steward"; tmcdaniel.palmerseminary.edu (Landry); muse.jhu.edu; difficult-passages.netlify.app. No scholar named on the page. The book-page ledger's "commission (Derrett 1970)" is not repeated: the search gives the commission reading to Fitzmyer |
| The unjust judge as the same "lesser to greater" move (18:1-8) | 1-9 | BSB | Repository |
| Exodus 22:25; Deuteronomy 15:8; 23:19; Proverbs 14:31; Luke 12:34; 14:13-14 | 1-9 | BSB | Repository |
| Mammon Aramaic for wealth or property, not a god (Matthew 6 wording) | 1-9, 10-13 | Earlier ledger (Matthew 6) | Earlier ledger |
| Matthew 6:24; Proverbs 11:28; Exodus 20:3; 1 Timothy 6:10; Luke 8:3; 19:8-9 | 10-13 | BSB | Repository |
| No prosperity reading, no contempt for the rich; "where their treasure is" | 10-13, 19-26 | Luke's book page ("Luke and money") | Repository; consistent wording |
| Pharisees (Matthew 23 and Luke 11 wording: "So ‘Pharisee’ is not a word for a hypocrite. In later Christian speech it came to mean that, but it did not mean that to Jesus' hearers.") | 14-18 | Matthew 23 and Luke 11 plain notes | Copied word for word |
| "Stroke of a pen" the smallest mark; "Jesus is saying that God's word is not careless in any part." | 14-18 | Matthew 5 plain note | Copied word for word |
| The readings of "forcing his way" (Matthew 11 wording adapted; "Careful scholars still differ, and these notes do not settle it.") | 14-18 | Matthew 11 plain note | Repository |
| Divorce views paragraph, "What all of them share..." and the safety line, word for word: "Nothing in this passage asks anyone to stay where they or their children are in danger. If you are in an abusive marriage, seek safety first. Talk to a pastor or a counselor you trust, or call a local domestic violence line. These notes are not legal advice." | 14-18 | Mark 10 plain note | Copied word for word |
| Deuteronomy 24:1; Genesis 2:24; Malachi 2:16; 1 Samuel 16:7 | 14-18 | BSB | Repository |
| Purple dye from sea snails; thousands for one garment; colour of royalty | 19-26 | Tyrian purple | Search: worldhistory.org "Tyrian Purple" (10,000 to 12,000 for a toga; Diocletian's edict). "Thousands" |
| Ebeblēto, passive ("had been laid") at 16:20 | 19-26 | Greek text | Script over the repository's Greek |
| Lazarus the only named character in Jesus' parables (Abraham apart); "Dives" Latin for "rich"; Lazarus from Eleazar, "God has helped" | 19-26 | Reference works; earlier ledger (John 11) | Search: biblegateway.com IVP "Parable of the Rich Man and Lazarus"; theaquilareport.com (Abraham also named); enterthebible.org. "Apart from Abraham" |
| Reclining at a feast (John 13:23) | 19-26 | BSB | Repository |
| Hades the Greek word for Sheol; not Gehenna | 19-26 | Earlier ledger (Matthew 16) | Earlier ledger |
| 1 Enoch 22: the dead kept in separate hollow places until judgment, a bright spring of water for the righteous | 19-26 | 1 Enoch 22 (Charles) | Search: sacred-texts mirror (Charles); bible.jmoorewv.com Enoch 22. "Jewish writings from before Jesus' time"; no chapter given on the page |
| An Egyptian tale (Setne Khamwas and Si-Osire) of a rich and a poor man reversed in the underworld | 19-26 | Demotic tale as reported | Search: worldhistory.org "The Tales of Prince Setna"; ehrmanblog.org; byustudies.byu.edu (Lichtheim). "An old Egyptian tale"; Gressmann not named (not confirmed) |
| Amos 6:4, 6; Ezekiel 16:49; Deuteronomy 15:11; Proverbs 21:13; Genesis 13:2 | 19-26 | BSB | Repository |
| Views on the state of the dead, no side; 23:43; Philippians 1:23; "Christians also differ on what final judgment is like, and these notes do not settle that here." (Matthew 7) | 19-26 | Standard positions; Matthew 7 plain note | Stated as views; Ehrman, Fudge, the Adventists, Calvin and Cullmann not named |
| Isaiah 58:7; Luke 24:11, 27 | 27-31 | BSB | Repository |

Left out: bath and cor in litres and Jeremias's five hundred denarii; Dodd,
Fletcher, Bailey's merciful-master reading, the ironic reading by name;
Sirach 31:8, CD 14:20 and m. Avot 2:12 on mammon; the Qumran "sons of light";
Josephus on the Pharisees' simple life; m. Gittin 9:10, Josephus on divorce,
Salome, Elephantine and the Damascus Document; byssus from Egypt; 4 Maccabees
13:17; Gressmann; Irenaeus and Tertullian on the intermediate state.

## The plain notes on Luke 17 (2026-11-19)

`client/public/bible/notes/luke/plain/17.json`. Five searches for this
chapter, with the earlier ledger (Mark 1 and 9; Matthew 8, 17, 18 and 24;
Luke 9 and 10; John 4).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The donkey millstone in Mark and Matthew; Luke's "stone of a mill" | 1-4 | Earlier ledger (Mark 9); Greek text | Earlier ledger; repository Greek |
| b. Yoma 86b: forgiven three times, not a fourth (written down centuries later) | 1-4 | Earlier ledger (Matthew 18) | Earlier ledger; "Later Jewish teaching, written down centuries afterwards"; the rabbi not named |
| Leviticus 19:17-18; Matthew 18:21-35 | 1-4 | BSB | Repository |
| The abuse paragraph, word for word ("These words have been rightly applied to the abuse of children. ... it was not your fault.") | 1-4 | Matthew 18 plain note | Copied word for word |
| The forgiveness paragraph, word for word from "Forgiveness has also been misused" to "that is not failure" ("this prayer" made "this passage") | 1-4 | Matthew 6 and Luke 11 plain notes | Copied word for word |
| Mustard seed paragraph (Matthew 17 wording: "The Bible does not teach that sickness comes from too little faith ... Its power is in the God it trusts, not in how strongly it is felt. This verse is not a formula"), the last clause adapted to "a prayer that seems unanswered" | 5-6 | Matthew 17 plain note | Copied, last clause adapted |
| Sykaminos most likely the black mulberry, deep strong roots; some argue for the sycamore-fig | 5-6 | Lexicons and Bible dictionaries | Search: biblehub.com 4807; biblicaltraining.org "Sycamine tree"; wartburgproject.org; biblegateway Encyclopedia of the Bible. "Most scholars think" |
| Zechariah 4:6; Matthew 17:20; Mark 11:23 | 5-6 | BSB | Repository |
| Achreios: "without claim", "owed nothing"; KJV "unprofitable"; elsewhere only Matthew 25:30 | 7-10 | Lexical summaries; Greek text | Search: tips.translation.bible "Luke 17:10"; biblehub.com; jesuswalk.com. Script over the repository's Greek (G0888) |
| Slaves in ordinary Roman households | 7-10 | General | Stated generally; "He is not approving slavery" |
| Psalm 116:12-13; Luke 12:37; 22:27 | 7-10 | BSB | Repository |
| Leprosy not Hansen's disease; mould; Leviticus 13:46; Leviticus 14 and the priest (Mark 1 and Matthew 8 wording) | 11-19 | Earlier ledger (Mark 1; Matthew 8) | Copied from their wording |
| Samaritans (Luke 10 and John 4 wording; about nine hundred today) | 11-19 | Earlier ledger (John 4) | Earlier ledger |
| Allogenēs only at 17:18 in the NT; the same word on the temple warning inscription; a complete stone found in 1871 (Clermont-Ganneau), now in Istanbul; Josephus mentions the warning | 11-19 | Temple Warning inscription | Search: en.wikipedia.org "Temple Warning inscription"; avande1.sites.luc.edu; armstronginstitute.org. Script over the repository's Greek (G0241). Istanbul and Josephus not named on the page; no claim that Luke alludes to it |
| Sesōken (sōzō, "saved") at 17:19 | 11-19 | Greek text | Script over the repository's Greek (G4982) |
| 2 Kings 5:14-15; Luke 4:27; Psalm 103:2 | 11-19 | BSB | Repository |
| Entos: "inside" its usual sense; only other NT use Matthew 23:26; KJV "within you"; most modern versions "in your midst" or "among you"; readings: inward, among, both | 20-21 | Greek text; translation surveys | Search: versebyverseministry.org "Is KJV or ESV the correct translation of Luke 17:21"; tips.translation.bible; experimentaltheology.blogspot.com; hugoye.bethmardutho.org (Ramelli). Script over the repository's Greek (G1787). The Vulgate, Origen, Tolstoy and Roberts not named (not all confirmed) |
| Luke 11:20; Daniel 7:13 | 20-21 | BSB | Repository |
| Date-setting and Acts 1:7 (Matthew 24 wording); "When Jesus will return is a question on which faithful Christians differ. That he will return is confessed by all." | 22-30 | Matthew 24 plain note | Copied word for word |
| Genesis 7:23; 19:17; 19:26 | 22-37 | BSB | Repository |
| Verse 36 lacking in P75, Sinaiticus and Vaticanus; most think it came from Matthew 24:40; others suggest an accidental skip (same ending) | 31-37 | Textual summaries (Metzger as quoted) | Search: biblehub.com "Why omit Luke 17:36"; uasvbible.org; tips.translation.bible "luke 1736" |
| Aetos eagles or vultures; Matthew 24:28 (Matthew 24 wording); Job 39:30 | 31-37 | Earlier ledger (Matthew 24) | Earlier ledger |
| One taken, one left: the two readings, rapture from the Latin for "caught up" (1 Thessalonians 4:17), "These notes do not choose, and they set out no end-times scheme." and the closing sentence | 31-37 | Matthew 24 plain note | Copied, the Noah sentence adapted to Noah and Lot |

Left out: Josephus on the Galilean pilgrims at Ginae; John Hyrcanus and the
bones in the temple; m. Negaim and b. Nedarim 64b; 1QS on rebuke; Wisdom of
Solomon and Josephus on the pillar of salt; outside stairs on roofs; Origen,
Athanasius, the Vulgate, Luther, Tolstoy, C. H. Roberts and the Gospel of
Thomas on 17:21; Darby, Scofield, Left Behind, MacArthur, Bock.

## The plain notes on Luke 18 (2026-11-19)

`client/public/bible/notes/luke/plain/18.json`. Three searches for this
chapter, with the earlier ledger (Mark 10; Matthew 19, 20 and 23; Luke 3, 11
and the book page).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Widows named with orphans and foreigners as those God defends | 1-8 | Exodus 22:22-23; Psalm 68:5; Isaiah 1:23 | BSB text |
| Hupōpiazō: "strike under the eye", a boxer's word; only here and 1 Corinthians 9:27 | 1-8 | Lexicons (Thayer, Vine as reproduced) | Search: biblehub.com 5299 (cnbible mirror); preceptaustin.org 1 Corinthians 9:27; blueletterbible.org G5299. Script over the repository's Greek (two occurrences) |
| Sirach 35 (verses numbered differently in editions): the Lord does not ignore the widow pouring out her complaint; commentators hear it behind Luke 18:7 | 1-8 | Sirach 35; USCCB footnote to Luke 18:7; Joel Green as reported | Search: bible.usccb.org Sirach 35; intertextual.bible "Sirach 35:17 / Luke 18:3"; en.wikipedia.org "Parable of the Unjust Judge". "Written before Jesus' time"; "many readers hear"; no verse number given |
| Psalm 13:1; Revelation 6:10 | 1-8 | BSB | Repository |
| Care for those failed by courts, police or churches (new wording; the police-or-crisis-line line as in the Matthew 10 paragraph) | 1-8 | Site care wording | Written for this passage |
| Pharisees (Luke 11 and Matthew 23 wording, word for word: "So ‘Pharisee’ is not a word for a hypocrite. In later Christian speech it came to mean that, but it did not mean that to Jesus' hearers.") | 9-14 | Luke 11 and Matthew 23 plain notes | Copied word for word |
| One fast a year commanded (Leviticus 16:29); tithe (Deuteronomy 14:22) | 9-14 | BSB | Repository |
| Didache 8:1: "the hypocrites" fast on Mondays and Thursdays; Christians to fast on Wednesdays and Fridays | 9-14 | Didache | Search: cts.perseids.org Didache 8.1; catholic.com encyclopedia "Didache"; newadvent.org. Paraphrased ("some fasted"); who the hypocrites were not stated |
| Tax collectors (Luke 3 wording) | 9-14 | Luke 3 plain note | Repository |
| Standing to pray, looking up (John 17:1); beating the breast (23:48) | 9-14 | BSB | Repository |
| Hilasthēti (18:13) the verb of Hebrews 2:17 ("make atonement"); eleēson at 18:38-39 | 9-14 | Greek text | Script over the repository's Greek (G2433, G1653). "Some readers hear" |
| The Jesus Prayer grew in part from the cries of the blind man and the tax collector | 9-14 | Earlier ledger (Mark 10) | Earlier ledger |
| Psalm 51:1, 17; Isaiah 57:15; Luke 7:36; 11:37; 14:1; 13:31 | 9-14 | BSB | Repository |
| Children in the ancient world; "like a little child" (Mark 10 wording) | 15-17 | Mark 10 plain note | Copied word for word |
| Brephē (18:15), the word for John in the womb (1:41) and the baby Jesus (2:12, 16) | 15-17 | Greek text | Script over the repository's Greek (G1025) |
| Genesis 48:14; Psalm 131:2; infant baptism views stated without a side | 15-17 | BSB; standard positions | Repository; stated as views |
| The inheritance question, the camel and needle, the Talmud's elephant, no gate (Mark 10 wording word for word) | 18-30 | Mark 10 plain note; earlier ledger | Copied word for word |
| "Why do you call Me good?" readings; Clement and Antony; "Is it wrong to be rich?" paragraph (Mark 10 and Matthew 19 wording) | 18-30 | Mark 10 and Matthew 19 plain notes | Copied, verse numbers changed and the hundredfold sentence adapted to "many times more" |
| "Wife" in Luke 18:29 and Matthew 19:29, not in Mark 10:29; Exodus 20:3, 12-17; Luke 19:9 | 18-30 | BSB comparison | Repository |
| Third warning (9:22; 9:44); "up" to Jerusalem; Gentiles the Romans; crucifixion Roman (Mark 10 wording) | 31-34 | Mark 10 plain note | Repository |
| Isaiah 50:6; Psalm 22:7; Luke 24:25-27, 44-46 | 31-34 | BSB | Repository |
| Jericho the last town on the road up; Son of David; sesōken "saved" at 18:42 | 35-43 | Mark 10 plain note; Greek text | Repository; script over the repository's Greek |
| Leaving and approaching; two Jerichos; Luke's placing before Zacchaeus; storytellers; "Christians who hold a high view of Scripture are found on more than one side here. These notes do not choose." (Matthew 20 wording) | 35-43 | Matthew 20 plain note; earlier ledger (two Jerichos) | Copied and adapted; Calvin and Augustine not named |
| Isaiah 35:5; Luke 4:18; 2 Samuel 7:13 | 35-43 | BSB | Repository |

Left out: Josephus on the Pharisees; m. Nedarim 3:4; m. Tamid and the hour of
the afternoon sacrifice; Bailey's atonement-sacrifice setting; Levine on the
widow; b. Berakhot 28b; m. Demai; the Psalms of Solomon; Sanders by name;
Lucian; Cyril and the "rope" reading; Netzer's palaces; Herod's death at
Jericho; Calvin's harmony.

## The plain notes on Luke 19 (2026-11-19)

`client/public/bible/notes/luke/plain/19.json`. Seven searches for this
chapter, with the earlier ledger (Mark 11 and 13; Matthew 23 and 25; Luke 3,
13 and the book page).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Tax collectors, contracts sold in advance (Luke 3 wording); table fellowship as acceptance | 1-10 | Luke 3 and 15 plain notes | Earlier ledger |
| Architelōnēs only at 19:2; sukophanteō only at 3:14 and 19:8; didōmi and apodidōmi both present tense in 19:8 | 1-10 | Greek text | Script over the repository's Greek (G0754, G4811) |
| "Probably held the contract for the district" | 1-10 | Deep note; Luke 3 ledger on contractors | Stated as "probably" |
| Sycamore-fig (Ficus sycomorus): short trunk, low wide branches, easy to climb, at home in the hot Jericho plain | 1-10 | Bible dictionaries | Search: biblicaltraining.org "sycomore tree"; israelbiblicalstudies.com; Easton via biblegateway; christiantoday.com |
| 19:8: most read the presents as futuristic (a resolve, conversion); a minority as customary (a defence, vindication) | 1-10 | Tichy, Biblica 92 (2011) 21-38, surveying the debate; A. T. Robertson as reported; Fitzmyer as reported | Search: bsw.org Tichy article pages; ucc.org (Luti). No scholar named on the page. Hamm's article not confirmed, not named |
| Leviticus 6:5; Exodus 22:1; 2 Samuel 12:6; Ezekiel 34:16; 15:2; 18:23, 27; 13:16; 2:11; 4:21; 23:43; "must" and "today" (book page key words) | 1-10 | BSB; book page | Repository |
| Mina = 100 drachmas, about 100 days' wages (three or four months); talent = sixty minas (6,000 denarii, Matthew 25 ledger) | 11-27 | Bible notes and coin tables | Search: biblia.com NASB95 note on Luke 19:13; depts.ttu.edu coin syllabus; Reformation Study Bible ("several months' wages") |
| Archelaus went to Rome to have Augustus confirm him; a delegation of fifty Jews, joined by more than eight thousand Jews in Rome, asked not to be ruled by a Herod (Josephus, Antiquities 17.299-314); given part of the kingdom without the title of king; removed in AD 6 and exiled; a palace at Jericho; commentators see the echo in 19:12-14 | 11-27 | Josephus; Bible encyclopedias | Search: lexundria.com Antiquities 17.299-314 (Whiston); biblicaltraining.org "Herod Archelaus"; en.wikipedia.org Herod Archelaus; earlier ledger (removal AD 6). "Many readers think"; "Luke does not say so" |
| Two plots joined (servants and money; nobleman and citizens): some think combined, others one parable | 11-27 | Deep note; standard positions | Stated as views; Jeremias not named |
| "I will judge you by your own words"; the greedy-landowner reading (Matthew 25 wording adapted) | 11-27 | Matthew 25 plain note | Repository |
| Psalm 24:1; Daniel 7:13-14; Acts 1:11; 10:42; 9:54-55; 22:51; 23:34; 16:10; 18:1-8 | 11-27 | BSB | Repository |
| Colt, cloaks, 2 Kings 9:13 (Mark 11 wording); no branches or Hosanna in Luke; "King" added (also John 12:13); Luke 2:14; 13:31 | 28-40 | BSB comparison; Mark 11 plain note | Repository |
| Psalm 118:26; Zechariah 9:9 quoted by Matthew and John; 1 Kings 1:33; Habakkuk 2:11 | 28-40 | BSB | Repository |
| Klaiō at 19:41; dakruō at John 11:35 | 41-44 | Greek text | Script over the repository's Greek (G2799, G1145) |
| Episkopē at 19:44; episkeptomai at 1:68, 1:78, 7:16 | 41-44 | Greek text | Script over the repository's Greek (G1984, G1980) |
| Revolt 66; AD 70 under Titus, temple burned (Mark 13 wording) | 41-44 | Earlier ledger (Mark 13) | Earlier ledger |
| Josephus (Jewish War 5) on Titus's wall round the city, built in three days, so none could get in or out | 41-44 | Josephus as summarised | Search: historyhit.com "Cataclysm: The Roman Siege of Jerusalem"; weaponsandwarfare.com (Connolly); ejournals.eu study of the wall. "Josephus says"; length and forts not given |
| Dominus Flevit, Latin "the Lord wept", Franciscan church on the western slope of the Mount of Olives, by Barluzzi, teardrop shape, built 1953-1955 (some give 1954) | 41-44 | Reference works | Search: en.wikipedia.org Dominus Flevit Church; biblewalks.com; seetheholyland.net; israel21c.org. "Built in the 1950s" |
| "This is grief, not a verdict ..." (Luke 13 and Matthew 23 wording, word for word); misuse rejected (book page "Luke and the Jewish people") | 41-44 | Luke 13 and Matthew 23 plain notes; book page | Repository |
| Dating of 19:43-44 (book page wording; Mark 13 hard wording) | 41-44 | Book page; earlier ledger | Repository |
| Jeremiah 9:1; Psalm 122:6; Isaiah 29:3 | 41-44 | BSB | Repository |
| Temple market (pointed to Mark 11); Isaiah 56:7; Jeremiah 7:11; Malachi 3:1; "for all the nations" in Mark 11:17, absent from Matthew 21:13 and Luke 19:46; two reasons offered | 45-48 | BSB comparison; deep note (stated as views) | Repository |
| Readings of the temple action; "not attacking his own people's faith" (Mark 11 wording) | 45-48 | Mark 11 plain note | Repository |

Left out: balsam, date palms and Netzer's palaces at Jericho; the Mishnah on
tax collectors and on tying money in a cloth; b. Ketubot 50a; Gaius on
fourfold theft; Clement on Zacchaeus as Matthias and the Apostolic
Constitutions; Ambrose and Augustine on the sycamore; Jeremias, Johnson,
Rohrbaugh, Dodd, Robinson by name; the Jewish-Christian gospel in Eusebius;
the Judensonntag, Bugenhagen and Bach's cantatas (Bugenhagen's link and the
name not confirmed); Simonet's painting; Josephus's 1,100,000 dead; the
thirteen forts and 39 stadia; Jerusalem as "city of peace".

## The plain notes on Luke 20 (2026-11-19)

`client/public/bible/notes/luke/plain/20.json`. One search for this chapter;
the rest rests on the earlier ledger (Mark 11 and 12; Matthew 21 and 22; Luke
11 and 13) and the BSB.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Euangelizomai at 20:1 (book page key word) | 1-8 | Greek text | Script over the repository's Greek (G2097) |
| "Stone us" only in Luke 20:6; 7:29-30; Malachi 3:1; Amos 7:14-15 | 1-8 | BSB comparison | Repository |
| Tenancy; Isaiah 5 (Mark 12 wording); Luke has no wall, winepress or tower; "for a long time", "What shall I do?", "Perhaps", the people's "May such a thing never happen!" only in Luke; 3:22 | 9-19 | Mark 12 plain note; BSB comparison | Repository |
| Psalm 118:22; Isaiah 5:7; 8:14-15; Daniel 2:34-35 | 9-19 | BSB | Repository |
| Supersessionism named and rejected (Matthew 21 wording, word for word where it fits; "Look at what Luke says" adapted to 20:19); views pointed to the Matthew 21 note; Romans 11:1, 29 | 9-19 | Matthew 21 plain note | Repository |
| AD 6 census, Judas the Galilean (Acts 5:37); Tiberius denarius (Mark 12 ledger); the three readings and "What all agree on" (Mark 12 wording word for word); Romans 13:7; Genesis 1:27 | 20-26 | Mark 12 plain note; earlier ledger | Earlier ledger |
| Spies in Luke against Pharisees and Herodians in Mark and Matthew; the false charge at 23:2 | 20-26 | BSB comparison | Repository |
| Sadducees (Josephus, Antiquities 18.16; Acts 5:17; 23:8); Deuteronomy 25:5-6; marriage views and the grief line (Mark 12 wording, "verse 25" made "these verses") | 27-40 | Mark 12 plain note; earlier ledger | Earlier ledger |
| "For to Him all are alive" only in Luke; 4 Maccabees 7:19 and 16:25 speak of the patriarchs living to God; "some readers hear an echo" | 27-40 | Commentaries | Search: intertextual.bible/p/662; biblehub.com commentaries on Luke 20:38; liturgy.slu.edu (Hamm). No date given for 4 Maccabees |
| Some scribes of the Pharisees' party (Acts 23:8-9); Exodus 3:6; Daniel 12:2 | 27-40 | BSB | Repository |
| 2 Samuel 7:12-13; 1:32; 18:38; Psalm 110:1; Acts 2:36; Romans 1:3-4; authorship views on Psalm 110 (Mark 12 wording) | 41-44 | Mark 12 and Matthew 22 plain notes; BSB | Repository |
| Scribes, robes, ways widows were defrauded (Mark 12 wording); 11:43; 14:7-11; 13:31; Exodus 22:22; Isaiah 10:2 | 45-47 | Mark 12 plain note; BSB | Repository |

Left out: the Mishnah on tenants and the right of possession; the Gospel of
Thomas's version of the tenants; the Tiberius denarius's exact Latin (pointed
to the Mark 12 note); 2 Maccabees 7 (left in the Mark 12 note); a date for 4
Maccabees.

## The plain notes on Luke 21 (2026-11-19)

`client/public/bible/notes/luke/plain/21.json`. Four searches for this
chapter, with the earlier ledger (Mark 12 and 13; Matthew 24; John's book
page; Luke's book page).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Two lepta, quadrans, 1/64 of a denarius; the Addison Wright (1982) reading and the "both" reading (Mark 12 wording, word for word with Mark's verse pointers removed) | 1-4 | Earlier ledger (Mark 12) | Earlier ledger |
| 20:47 then 21:1-4 then 21:6; Exodus 22:22; Psalm 68:5; 1 Samuel 16:7 | 1-4 | BSB | Repository |
| Herod's rebuilding from about 20 or 19 BC; Josephus's snow-covered mountain and gold (Mark 13 wording); revolt 66; AD 70 under Titus | 5-11 | Earlier ledger (Mark 13) | Earlier ledger |
| Josephus, Antiquities 15.394-395: spoils dedicated by Herod fixed round the temple; the golden vine with hanging clusters | 5-11 | Josephus (Whiston) | Search: lexundria.com Antiquities 15.392-395; avande1.sites.luc.edu (Antiquities 15); posenlibrary.com "Herod's Renovation of the Temple". Linked to 21:5 only as "offerings of this kind" |
| "The time is near" only in Luke (Mark 13:6; Matthew 24:5 compared); Luke's setting in the temple against Mark 13:3; Micah 3:12; Jeremiah 7:4 (Mark 13 wording) | 5-11 | BSB comparison; Mark 13 plain note | Repository |
| "Normal weather of a broken world"; the frightened-reader line (Matthew 24 wording, "see to it that you are not alarmed" made Luke's "do not be alarmed") | 5-11 | Mark 13 and Matthew 24 plain notes | Repository |
| Acts 4; 6:10; 24 to 26 (Felix, Festus, Agrippa); Mark 13:11 against Luke 21:15 and 12:12; 24:48; 12:7; Psalm 41:9; Daniel 3:16-18 | 12-19 | BSB | Repository |
| Family betrayal care (Mark 13 wording word for word) with the police-or-crisis-line line (Matthew 10 wording) | 12-19 | Mark 13 and Matthew 10 plain notes | Repository |
| Abomination in Mark and Matthew against Luke's "surrounded by armies"; dating views (book page) | 20-24 | Earlier ledger (Mark 13); book page | Repository |
| Josephus, Jewish War 6.420: ninety-seven thousand captives in the whole war | 20-24 | Josephus (Whiston) | Search: lexundria.com War 6.420-421; cojs.org; pbs.org Frontline extract. "In the whole war", as Josephus says |
| Eusebius, Church History 3.5.3: Jerusalem Christians warned before the war, left for Pella in Perea; historicity debated | 20-24 | Earlier ledger (Mark 13); search | Search: en.wikipedia.org Flight to Pella; bkv.unifr.ch NPNF Eusebius 3.5. Paraphrased |
| Jeremiah 6:1; Deuteronomy 32:35; Hosea 9:7 (quoted only before its em-dash); Daniel 8:13-14; Romans 11:25; Acts 1:7 | 20-24 | BSB | Repository |
| Readings of "the times of the Gentiles" (foreign rule over Jerusalem; the age of the Gentile mission with Romans 11:25; restoration of Israel after); date-setting has failed (Russell's 1914 reckoning from 1876, not named on the page) | 20-24 | Deep note; reference works | Search: walvoord.com "The Times of the Gentiles"; wacriswell.com; photos.watchtowerdocuments.org (Russell, Bible Examiner 1876); reslight.boards.net. Stated as views; no names, no year |
| Isaiah 13:10; Joel 2:31; Daniel 7:13; 2:38; 8:24; "redemption" | 25-28 | BSB | Repository |
| Readings of the coming (Mark 13 wording, with Luke's "until the times of the Gentiles" order added for the end-of-history reading) | 25-28 | Mark 13 plain note; deep note | Repository |
| Fig tree bare in winter, olive evergreen (Mark 13 wording); "and all the trees", "kingdom of God is near" (Luke) against "He is near" (Mark 13:29); Isaiah 40:8 | 29-33 | Earlier ledger; BSB | Repository |
| "This generation": C. S. Lewis's phrase and the three readings (Mark 13 wording, verse numbers changed) | 29-33 | Earlier ledger (Mark 13) | Earlier ledger |
| 8:14; 19:47-48; 21:37-38; Isaiah 5:11; Proverbs 12:25 | 34-38 | BSB | Repository |
| Some later manuscripts place the woman caught in adultery after Luke 21:38; missing from the earliest copies of both Gospels | 34-38 | Earlier ledger (John's book page) | Earlier ledger |
| The child lying awake (Luke 17 wording, word for word) | 34-38 | Luke 17 plain note | Repository |

Left out: Schweitzer, Bertrand Russell, J. Stuart Russell, France, Wright,
Bock, Scofield, Augustine's Letter 199, Jervell, Tannehill by name; Eusebius
3.5-7 on the fall as punishment; Charles Taze Russell and 1914, 1948 and 1967
by name; the 21:19 variant; family 13 by name; the gladiators and the
Colosseum; the deep note's 40,000 released captives.

## The plain notes on Luke 22 (2026-11-19)

`client/public/bible/notes/luke/plain/22.json`. Five searches for this
chapter, with the earlier ledger (Mark 14; Matthew 26; John 13 and 18; Luke's
book page).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Passover and Unleavened Bread; pilgrims; fear of a riot (Mark 11 and 14 wording) | 1-6 | Earlier ledger | Repository |
| Satan enters Judas only in Luke and John (John 13:27); 4:13; temple officers the temple's own guard | 1-6 | BSB; deep note | Repository |
| Acts 2:23; providence and freedom stated as a second-order difference without names | 1-6 | BSB; deep note | Repository. Klassen, Borges, the Gospel of Judas, Augustine, Aquinas, Calvin and Barth not named |
| Lambs killed in the afternoon, rooms for pilgrims, the man with the water jar (Mark 14 wording); only Luke names Peter and John; Exodus 12:6-8, 14 | 7-13 | Mark 14 plain note; BSB | Repository |
| Synoptic Passover against John's dating (pointer to the John 13 note) | 7-13 | John 13 plain note | Repository |
| Reclining; the Mishnah's four cups (Pesachim 10, written down around 200; how much was fixed in Jesus' day debated) | 14-20 | Earlier ledger (Mark 14) | Earlier ledger |
| 22:19b-20: almost every Greek manuscript has the longer text; Codex Bezae (fifth century) and some Old Latin lack 19b-20; Westcott and Hort (1881) judged the shorter original ("Western non-interpolation"); the theory widely abandoned (the UBS committee in the 1960s); a few still defend the shorter text (Billings) | 14-20 | Text-critical surveys | Search: bible-researcher.com "Western non-interpolations"; skypoint.com (Waltz); en.wikipedia.org Western non-interpolation; bestcommentaries.com (Billings). Bezae's date from the earlier ledger |
| 1 Corinthians 11:24-25; Exodus 24:8; Jeremiah 31:31-34; the Lord's Supper views (Mark 14 wording, word for word) | 14-20 | BSB; Mark 14 plain note | Repository |
| Greatness dispute placed earlier in Mark 10:35-45; Matthew 19:28; John 13:4-5; 1 Kings 12:7; Daniel 7:18 | 21-30 | BSB comparison | Repository |
| Euergetes ("Benefactor") as a royal title; Ptolemy III Euergetes; the only New Testament use of euergetēs | 21-30 | Lexicons and Bible encyclopedias | Search: biblehub.com 2110; openbible.com commentaries on 22:25; internationalstandardbible.com "Benefactor". Only Ptolemy III named (the second Euergetes's number conflicted) |
| 22:31 humas (plural); 22:32 sou (singular) | 31-34 | Greek text | Script over the repository's Greek |
| 24:34; Amos 9:9; Job 1:9-12 | 31-34 | BSB | Repository |
| 9:3; 10:4; 6:29; 23:33-34; Isaiah 53:12; hikanon estin at 22:38; eate heōs toutou at 22:51 | 35-38 | BSB; Greek text | Repository |
| Three readings of the swords (literal provision; figure of coming hardship with "That is enough" as closing a misunderstood talk; fulfilment of Isaiah 53:12 with 22:52); never a warrant for violence; 22:51 | 35-38 | Deep note (Hengel, Brandon, Meggitt as reported, not named); standard commentaries | Stated as readings; no scholar named; no statement about weapons or policy |
| Gethsemane named in Mark and Matthew, not Luke; one prayer, kneeling, "asleep from sorrow" only in Luke; Isaiah 51:17; 1 Kings 19:5 | 39-46 | BSB comparison | Repository |
| 22:43-44 absent from P75 (around 200) and Vaticanus (300s); present in Sinaiticus as first written, in Bezae and most later copies; known to Justin and Irenaeus; added (anti-docetic) or removed (seemed to diminish Christ); printed with a note or in brackets | 39-46 | Book page ledger; text-critical surveys | Search: tyndale.cam.ac.uk (Jongkind) "Luke 22:43-44"; en.wikipedia.org Luke 22:43-44; ehrmanblog.org. Wording agrees with the book page's hard-passage line |
| "Like" (hōsei) drops of blood; hematidrosis as "some have suggested", not asserted | 39-46 | Medical reviews | Search: pmc.ncbi.nlm.nih.gov PMC4808663 (review: capillaries rupturing under extreme stress); Kluger's review (dlib.si) noting Luke 22:44; Cureus case report via NCBI |
| Agōnia, English "agony" | 39-46 | Greek text | Repository Greek |
| Real humanity answer and the care paragraph (Mark 14 wording, word for word, after Mark 14:34) | 39-46 | Mark 14 plain note | Repository |
| Kiss as a student's greeting; Peter and Malchus (John 18:10); Matthew 26:52; views on force and "All agree" (Matthew 26 wording, "5:39" made "6:29"); Romans 13:4; Isaiah 50:6 | 47-53 | Matthew 26 plain note; earlier ledger | Repository |
| Colossians 4:14 and the tradition of Luke's authorship (book page) | 47-53 | Book page | Repository |
| Galilean accent (Matthew 26:73); Luke's order (council at daybreak) against Mark's night hearing; the look only in Luke; Psalm 51:12; Isaiah 44:22; John 21:15-17 | 54-62 | BSB comparison | Repository |
| Sanhedrin; Caiaphas (pointer to Mark 14); Psalm 110:1; Daniel 7:13; Isaiah 50:6; the Mishnah's rules for capital trials marked as later and uncertain (Mark 14 wording, shortened); "Luke names particular people" (Mark 14 wording adapted) | 63-71 | Mark 14 plain note; earlier ledger | Repository |

Left out: Brandon, Hengel, Meggitt, Boniface VIII and Unam Sanctam (1302;
verified but not needed); Klassen, Borges and the Gospel of Judas; the RSV's
1946-1952 text and its restoration; Ehrman and Plunkett, Blumell, Epiphanius
and family 13 on 22:43-44; the 22:68 variant; Antiochus VII and the second
Euergetes.

## The plain notes on Luke 23 (2026-11-19)

`client/public/bible/notes/luke/plain/23.json`. Three searches for this
chapter, with the earlier ledger (Mark 15; Matthew 27; John 18 and 19; Luke 3,
9 and 13; Luke's book page).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Pilate 26 to 36; the Pilate stone (1961); only the governor could order crucifixion | 1-5 | Book page ledger; earlier ledger (Mark 15) | Earlier ledger |
| The charges at 23:2 against 20:25 and 22:70; Pilate's three verdicts (23:4, 14-15, 22); Psalm 27:12; Isaiah 53:9 | 1-5 | BSB | Repository |
| Readings of Luke's Pilate (memory or shaping) | 1-5 | Deep note; standard positions | Stated as views; Winter, Sanders, Bond and Jervell not named |
| Herod Antipas 4 BC to AD 39; John imprisoned and beheaded (3:19-20; 9:9); 13:31-32; Acts 4:25-27; Psalm 2:2; Isaiah 53:7; 11:29 | 6-12 | Book page ledger; BSB | Repository |
| Herod and Pilate's earlier enmity not explained by Luke | 6-12 | BSB | Repository; no reason offered |
| Barabbas, insurrection, "son of the father" (Mark 15 wording); Acts 3:14; verse 17 missing from the oldest manuscripts (absent from the BSB); "punish" most likely a flogging | 13-25 | Mark 15 plain note; BSB; deep note (`text`) | Repository |
| The "Christ-killers" misuse pointed to the Matthew 27 and John 19 notes and its rejection restated in one sentence; Acts 4:27; 23:27, 48, 51 | 13-25 | Matthew 27 and John 19 plain notes; book page | Repository |
| Cyrene, Simon (Mark 15 wording); "behind Jesus" and 9:23 ("many readers hear") | 26-31 | Mark 15 plain note; BSB | Repository |
| Childlessness as disgrace (1:25); Hosea 10:8 (Luke's order reversed, quoted from Hosea); Zechariah 12:10 | 26-31 | BSB | Repository |
| Green and dry tree: three readings (Roman treatment of the innocent and the rebels; God's judgment; while Jesus is present), no side; "This is grief, not a verdict" (Luke 13 and 19 wording) | 26-31 | Deep note; standard commentaries | Stated as readings, no names |
| Crucifixion and the Giv'at ha-Mivtar heel bone (pointer to Mark 15; earlier ledger) | 32-38 | Earlier ledger (Mark 15) | Earlier ledger |
| 23:34 absent from P75 (around 200), Vaticanus (300s), Bezae's first hand; present in Sinaiticus as first written and most later copies; added from an early story, or removed by scribes who could not bear the forgiveness of the Jews; printed with a note or brackets (book page wording, word for word in substance) | 32-38 | Book page ledger; search | Search: tyndale.cam.ac.uk "Father forgive them: the variant in Luke 23:34a"; evangelicaltextualcriticism.blogspot.com; ehrmanblog.org; dennyburk.com (Delobel on the Diatessaron). Irenaeus and the Diatessaron not used |
| 6:27-28; Acts 7:60; Acts 3:17; Isaiah 53:12; Psalm 22:7, 18 | 32-38 | BSB | Repository |
| Who "them" is: soldiers; leaders and people; all sinners. No side | 32-38 | Deep note; standard readings | Stated as readings |
| Mark 15:32 (both criminals mocked); "today" (2:11; 19:9) | 39-43 | BSB | Repository |
| Paradise from an old Persian word for an enclosed garden; used for the place of the righteous dead with God (book page); paradeisos only at Luke 23:43, 2 Corinthians 12:4, Revelation 2:7 | 39-43 | Book page ledger; Greek text | Script over the repository's Greek (G3857) |
| The comma: early manuscripts with little or no punctuation; the New World Translation reads "Truly I tell you today, you will be with me in Paradise"; Adventist writers argue the same, with sleep of the dead; John 20:17; most read "today" with what follows; reasons | 39-43 | Reference works and both sides' own publications | Search: wol.jw.org Questions from Readers; signsofthetimes.org.au "The importance of a comma"; adventchristianvoices.com; archive.gci.org "The Comma of Luke 23:43"; kjvtoday. "Many Seventh-day Adventists" (no official statement found); stated without scorn |
| Genesis 2:8 | 39-43 | BSB | Repository |
| Luke lacks the cry of dereliction (Mark 15:34); Psalm 31:5; Acts 7:59; curtain (Mark 15 wording); tearing before the death in Luke | 44-49 | BSB comparison; Mark 15 plain note | Repository |
| Dikaios at 23:47 (also 2:25, 23:50); "innocent" in many English versions; readings: innocence verdict, the Righteous One (Acts 3:14), complementary to Mark 15:39 | 44-49 | Greek text; Tyndale Bulletin 63.1 (Easter 2012) as reported; commentaries | Search: tyndalebulletin.org "Certainly this man was righteous"; galaxie.com tynbul63-1-03; biblehub commentaries. Script over the repository's Greek (G1342). No scholar named |
| Beating the breast (18:13); Amos 8:9; Psalm 38:11; the forsaken care line (Mark 15 wording, word for word) | 44-49 | BSB; Mark 15 plain note | Repository |
| Burial details and Deuteronomy 21:23 (Mark 15 wording); Joseph had not consented, "waiting for the kingdom of God" (2:25, 38); Matthew 27:57 rich; Isaiah 53:9; 19:30; Exodus 20:8 | 50-56 | Mark 15 plain note; BSB | Repository |

Left out: Melito of Sardis, Jeremy Cohen, Paul Winter, Jack Sanders, Helen
Bond, Jacob Jervell; Theophylact and the Curetonian Syriac on the comma;
Bullinger; b. Berakhot 28b; Abraham's bosom and the descent to the dead;
Augustine on Christ's soul; Harnack and Eubank by name; the Diatessaron;
"in" or "into" your kingdom; the eclipse wording in 23:45; Bezae's stone for
twenty men; the old saying "one thief was saved, that none may despair"
(attribution not confirmed).

## The plain notes on Luke 24 (2026-11-19)

`client/public/bible/notes/luke/plain/24.json`. Three searches for this
chapter, with the earlier ledger (Mark 16; Matthew 28; John 20; Luke's book
page) and the searches already run for Luke 22 on the "Western
non-interpolations".

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Women as witnesses: Josephus, Antiquities 4.219; Celsus as reported by Origen; all four Gospels; "Many historians think" (Mark 16 and Matthew 28 wording, word for word) | 1-12 | Earlier ledger (Mark 16) | Earlier ledger |
| 8:2-3; 23:49, 55-56; 9:22; 18:31-33; lēros at 24:11 ("idle talk") | 1-12 | BSB; Greek text | Repository; script (G3026) |
| 1 Corinthians 15:4 (Paul in the 50s); Hosea 6:2 ("some readers hear"); Deuteronomy 19:15 | 1-12 | BSB; earlier ledger | Repository |
| 24:12 omitted by Codex Bezae and some Old Latin; present in P75, Vaticanus and almost all others; Westcott and Hort (1881) bracketed it; most now hold it original | 1-12 | Textual notes | Search: uasvbible.org "Luke 24:12 Is Included"; tips.translation.bible (SIL notes); freely-given.org OBD; bible-researcher.com "Western non-interpolations" (Aland's table) |
| Differences between the accounts and "What every account agrees on" (Matthew 28 wording) | 1-12 | Matthew 28 plain note | Repository |
| Cleopas; the companion unnamed; Clopas of John 19:25; Hegesippus via Eusebius: Clopas the brother of Joseph; the link to Luke 24:18 possible, unproven | 13-27 | Reference works | Search: thegospelcoalition.org Themelios "The relatives of Jesus" (Bauckham); biblehub.com 2832; en.wikipedia.org Mary of Clopas; gospelstudies.org.uk EQ 1974. "Possible ... no one can be sure" |
| Emmaus site unknown; sixty or a hundred and sixty stadia (book page map) | 13-27 | Book page ledger | Earlier ledger |
| Genesis 3:15; Deuteronomy 18:15; Isaiah 53:5; Psalm 16:10 (Acts 2:27); "Moses and all the Prophets" as the whole Jewish Scriptures | 13-27 | BSB; book page | Repository |
| Ways Christians link the Old Testament to Christ (prophecy, patterns, the whole story), no side; Jewish reading of the same Scriptures respected, never contempt | 13-27 | Standard positions | Stated as views; written for this passage |
| Hospitality to travellers; parabiazomai at 24:29 against anagkazō at 14:23 (the Luke 14 note's "a similar strong word"); took, blessed, broke, gave (9:16; 22:19); 24:34 and 22:32 | 28-35 | BSB; Greek text; Luke 14 plain note | Repository; script (G3849, G0315) |
| Genesis 18:1-8; Hebrews 13:2 (paraphrased); Psalm 119:105; Acts 2:42 | 28-35 | BSB | Repository |
| Readings of the breaking of the bread (the Supper; an ordinary meal; both); views on Christ's presence pointed to 22:19 | 28-35 | Standard positions | Stated as readings |
| John 20:19-29 pointer; 1 Corinthians 15:43 (paraphrased "in glory", "in power"); Daniel 12:2; Isaiah 26:19 | 36-43 | BSB | Repository |
| Visions or faith-language readings named; the creeds confess a bodily resurrection (CLAUDE.md confessional floor) | 36-43 | Standard positions; the site's creeds | Repository |
| Law, Prophets, Psalms the three parts of the Jewish Bible (book page); repentance (3:3); Acts 1:8; Acts 2; Isaiah 49:6; 2:3; Joel 2:28; Luke 3:6; Romans 1:16 | 44-49 | Book page; BSB | Repository |
| Bethany a little under two miles from Jerusalem (John 11:18, Mark 11 wording); 19:29; Leviticus 9:22; Numbers 6:24; Psalm 47:5; 1:21-22; 2:10; Acts 1:3, 9, 11 | 50-53 | BSB; earlier ledger | Repository |
| "And was carried up into heaven" lacking in Codex Bezae, some Old Latin and Codex Sinaiticus; most manuscripts have it; a suggested reason (the forty days of Acts) | 50-53 | Textual notes | Search: bible-researcher.com "Western non-interpolations"; biblicalarchaeology.org "Absent from Codex Sinaiticus"; ehrmanblog.org "Does Luke flat out contradict himself". Which hand of Sinaiticus not stated |
| Readings of Luke 24 and Acts 1 on the timing (compressed ending; two purposes); the creed's "ascended into heaven ... right hand of the Father" (paraphrased) | 50-53 | Standard positions; the site's creeds | Stated as readings |

Left out: Martin, Snodgrass, Parsons and the SBL Greek New Testament by name;
"within us" in 24:32; the honeycomb of 24:42; "repentance for" in 24:47;
"praising and blessing" in 24:53; P75's date of publication (1961); the
claim that the companion was Cleopas's wife; a list of the passages Jesus
explained (Luke gives none; the examples are marked as what Christians
"have often pointed to").

## Genesis's book page (teaching introduction, 2026-11-19)

Every historical claim in `client/public/bible/notes/genesis/intro.json`,
field `teaching`. 16 web searches for the book page, run on 2026-11-19;
checks rest on search results that quote or summarise the source, read
against at least two results where possible. Ancient texts are paraphrased.
Scripture is the BSB in the repository, checked word for word by
`scripts/validate-bible-notes.mjs`; Hebrew word counts are a script over the
repository's Hebrew text (Strong's numbers in `client/public/bible/ch/`).

| Claim | Source | Checked by |
|---|---|---|
| Genesis names no author; Mark 12:26 "the Book of Moses"; John 5:46; 14:14 "as far as Dan" and Judges 18:29 (Laish); 36:31 kings of Edom "before any king reigned over the Israelites" | BSB | Repository |
| Astruc, a French physician, 1753, noticed Elohim in Genesis 1 and Jehovah elsewhere and proposed sources (his work was meant to refute Hobbes and Spinoza; not used) | Astruc | Search: newworldencyclopedia.org "Documentary hypothesis"; Wikipedia "Prolegomena zur Geschichte Israels" |
| Wellhausen: Geschichte Israels 1878; second edition 1883 as Prolegomena zur Geschichte Israels; the classic form of the four-source (J, E, D, P) theory, owed also to Graf and others | Wellhausen | Search: Wikipedia; newworldencyclopedia.org. The page says "classic form", not "founded" |
| 1970s challenge: Van Seters 1975 (Abraham in History and Tradition), Schmid (Der sogenannte Jahwist), Rendtorff 1977; no agreement on a replacement; a revised neo-documentary view held especially in North America and Israel; supplementary and fragmentary models | Pentateuch scholarship | Search: Wikipedia "Documentary hypothesis"; Themelios "Pentateuchal studies today"; Wenham (biblicalstudies.org.uk). Schmid's year not given on the page |
| Cassuto, The Documentary Hypothesis: Hebrew 1941, English 1961 (Israel Abrahams, Magnes Press), eight lectures; argued against Wellhausen | Cassuto | Search: Wikipedia "Umberto Cassuto"; Goodreads editions; mmz.vufindnet.de catalogue |
| P. J. Wiseman, New Discoveries in Babylonia about Genesis (1936): the toledot as tablet colophons; little scholarly acceptance | Wiseman | Search: Wikipedia "Wiseman hypothesis"; biblearchaeology.org; Armstrong Institute |
| Ten toledot headings (2:4, 5:1, 6:9, 10:1, 11:10, 11:27, 25:12, 25:19, 36:1, 37:2; repeat 36:9); toledot 13 times in Genesis, 39 in the Old Testament | Hebrew text | Repository deep note (Genesis 2); script count; BSB for 36:9 and 37:2 |
| Exile 597 and 586 BC; Cyrus took Babylon 539 BC; Merneptah stone about 1208 BC names Israel as a people | Earlier ledger (wot-ledger.md) | Earlier ledger |
| Babel and Babylon the same Hebrew word (Strong's H894: Gen 10:10 "Babylon", 11:9 "Babel") | Lexicon | Repository lexicon |
| Critical dating of sources tenth to sixth centuries BC and final shaping in the Persian period; traditional dating with the exodus in the 1400s or 1200s | Repository `date` | Repository (the site's existing introduction); stated as views |
| Enuma Elish: Ashurbanipal's library, 600s BC, older composition; Marduk, Tiamat, Kingu; George Smith published 1876 | Earlier site texts | Site guide genesis-one-in-its-world; Honest Answer on Genesis 1 |
| Atrahasis: fairly complete Old Babylonian copy about 1650 BC (Ammi-saduqa); gods' labour; a slain god's flesh and blood mixed with clay; noise disturbs Enlil; plague, drought, flood; Enki warns Atrahasis, boat | Atrahasis | Search: newworldencyclopedia.org; livius.org (ANET); cojs.org; Frymer-Kensky essay |
| Gilgamesh XI: Utnapishtim, boat; dove, swallow, raven (the raven does not return); British Museum K.3375, about 600s BC; George Smith read his translation to the Society of Biblical Archaeology, London, 3 December 1872 | Gilgamesh | Search: cojs.org; historyskills.com; Google Arts and Culture (British Museum record); biblicalarchaeology.org |
| Genesis 8:6-12 raven then dove; 6:11 "full of violence"; 9:8-17 covenant and rainbow; 9:6 | BSB | Repository |
| Covenant (berit) 27 times in Genesis; bara 53 in the Old Testament, 11 in Genesis; tselem 17, 5 in Genesis; ezer 21 times (Genesis 2:18, 2:20; most of the rest of God, e.g. Psalm 121:1-2) | Hebrew text | Script over the repository's Strong's numbers |
| Genesis 15:9-10, 15:17; Jeremiah 34:18 the calf cut in two; self-curse reading | BSB; standard reading | Repository. The Mari donkey parallel was not found and is not used |
| Ur: Woolley's joint British Museum and Penn Museum excavation 1922 to 1934; patron moon god Nanna (Sin); Sin chief god at Haran; Chaldeans settled by about 850 BC; the anachronism argument and its reply | Ur | Search: Wikipedia "Ur"; Penn Museum Expedition; Bible Gateway Encyclopedia of the Bible "Ur of the Chaldees" |
| Joshua 24:2 Terah "worshiped other gods"; 23:16 silver weighed | BSB; earlier ledger | Repository |
| Laws of Hammurabi 144 to 147: a wife (a naditu priestess, barred from bearing) gives a slave to bear children; the slave who claims equality may not be sold (146); Hammurabi about 1754 BC | Laws of Hammurabi | Search: palmerseminary.edu (McDaniel); UCL (Jacobus); timesofisrael blog; date from the site guide torah-and-the-law-codes |
| Nuzi: fashionable from 1935 to the early 1970s; challenged by Thompson (1974) and Van Seters; tablets later (the 1400s and 1300s; Gordon's minority 14th-century setting); about a dozen of some 4,000 tablets quoted; the household-gods inheritance reading no longer valid for Nuzi | Nuzi scholarship | Search: Themelios (Selman, "Comparative methods and the patriarchal narratives"); Tyndale Bulletin (Selman, "The social environment of the patriarchs"); biblicalelearning.org (Fowler) |
| Camels: Sapir-Hen and Ben-Yosef, Tel Aviv University, 2013; Aravah; most domesticated camel bones from the last third of the 10th century BC or later; replies (Kitchen; rarity) | Camel study | Search: english.tau.ac.il; eurekalert.org; timesofisrael.com; crossexamined.org |
| Albright: about 2100 to 1800 BC, Amorite link; Kitchen, BAR 1995 "The Patriarchal Age: Myth or History?"; Thompson 1974 and Van Seters: no convincing second-millennium evidence; Iron Age setting | Patriarchal age debate | Search: Wikipedia "Patriarchal age"; cojs.org (Kitchen); biblicalstudies.org.uk (Bimson) |
| Exodus 12:40 (430 years); 1 Kings 6:1 (480 years) | BSB | Repository |
| "Curse of Ham": 9:25 curses Canaan; from about the fifteenth century the curse moved to Ham and tied to Black Africans; quoted by many in the 18th to 20th centuries as a rationale for enslaving people of African descent; Ibn Ezra and Nahmanides on the curse touching only those named, unlinked to dark skin | Goldenberg, The Curse of Ham (Princeton, 2003) and reviews | Search: christiancentury.org (Schlimm); muse.jhu.edu (Shavit review); Wikipedia mirror; repository (race-and-image on Jim Crow) |
| Sons of God: angels (early interpreters; Job 1:6), Sethite (most fathers from the fourth century; Augustine, after Julius Africanus), rulers | Interpretation history | Search: bibleinterp.arizona.edu; Wikipedia "Sons of God"; crossway.org. Used in the hard-passage line only, no names |
| Sodom: Bab edh-Dhra (south) and Tall el-Hammam (north, Collins) both proposed; no consensus | Archaeology | Search: biblearchaeology.org (Wood); biblicalarchaeology.org; christiancentury.org |
| Binding of Isaac read on the second day of Rosh Hashanah in traditional practice | Jewish liturgy | Search: myjewishlearning.com; thetorah.com; bj.org |
| Origen, Basil, Augustine on the days | Honest Answer on Genesis 1 | Repository (the answer's sources) |
| The Pentateuch translated into Greek in the early third century BC for Greek-speaking Jews in Egypt | Septuagint | Search: uasvbible.org; intertextual.bible |
| Map positions | Approximate modern sites (Dothan, Shechem/Tell Balata, Bethel/Beitin, Bethlehem); Moriah, the Jordan plain, Peniel (by the Jabbok) and Gilead are regions placed roughly and said so | Not a historical claim |

Left out: the Mari donkey-killing covenant (not found); the number of
Genesis copies among the Dead Sea Scrolls and their agreement with the later
text (not confirmed; the timeline entry was cut); Genesis Rabbah, Rashi,
Ramban and the synagogue's yearly cycle of readings (not confirmed this run);
Schmid's year; Lambert's date for Enuma Elish; the Sumerian King List; Eden
as sanctuary (kept for chapter 2, searched there); every scholar in the
repository's fuller introduction not checked this run.

## The plain notes on Genesis 1 (2026-11-19)

`client/public/bible/notes/genesis/plain/1.json`. One search for this
chapter, with the book page's rows above and the site's guide and Honest
Answer on Genesis 1. (Four searches run in the book page's pass served the
chapters: one this chapter, one Genesis 2, two Genesis 3.)

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Babylon's creation story: Marduk, Tiamat, the world from her body; humans as the gods' labourers; sun and moon left unnamed because their Hebrew names were also names of gods; tanninim as monsters elsewhere | 1-2, 14-25, 26-28 | Site guide genesis-one-in-its-world; Honest Answer on Genesis 1 | Repository |
| Bara: only God its subject; 53 times in the Old Testament; again at 1:21 and three times at 1:27 | 1-2, 14-25 | Repository deep note; script count | Repository |
| 1:1 as a sentence or as ‘When God began to create’ (Rashi and Ibn Ezra; JPS 1985; NRSV); both possible | 1-2 | Repository deep note (`text`) | Repository; stated without names |
| Six Christian readings of the days; no side | 1-2, 3-13 | Honest Answer on Genesis 1 | Repository; the answer's wording followed, not quoted |
| Origen (third century) asked about days before the sun | 3-13 | Honest Answer (On First Principles 4) | Repository |
| Raqia: solid dome or the sky as it appears; debated | 3-13 | Honest Answer (Seely 1991; Poythress) | Repository; no names on the page |
| Naming as authority in the ancient world | 3-13 | Repository deep note (Genesis 2, 2 Kings 23:34, 24:17) | Repository; stated generally |
| Tell Fekheriye statue: found 1979; Akkadian and Aramaic; about 850 BC (an earlier date proposed); Aramaic words for image and likeness | 26-28 | Inscription | Search: Wikipedia "Tell Fekherya bilingual inscription"; CDLI wiki; Cambridge (Iraq). Given as "from the 800s BC" |
| Kings as images of gods; statues of rulers in conquered lands | 26-28 | Site guide genesis-one-in-its-world | Repository |
| ‘Us’: heavenly court, plural of majesty, a hint of the Trinity seen later | 26-28 | Repository deep note (`doctrines`) | Repository; stated as readings |
| Meat permitted only after the flood (9:3); Leviticus 25:43 | 26-31 | BSB | Repository |
| Temples fed the gods daily | 29-31 | Site guide the-gods-of-the-nations | Repository |
| Psalm 33:6; Jeremiah 4:23; Isaiah 45:18; John 1:1-3; Hebrews 11:3; 2 Corinthians 4:6; Revelation 21:1, 22:5; Psalm 104:24; Deuteronomy 4:19; Psalm 136:7-9; Psalm 74:13; Isaiah 27:1; Matthew 6:26; Genesis 5:1-2, 9:6; James 3:9; Psalm 8:6; Colossians 1:15, 3:10; Galatians 3:28; Romans 8:20-21 | all | BSB | Repository |
| The chapter break added much later | 29-31 | Repository deep note (`text`) | Repository; no date or name given |

Left out: Lambert's date for Enuma Elish; Cassuto's counts of sevens; the
Memphite Theology and Merikare; the Ugaritic seven-day palace; Tutankhamun's
name; every scholar named in the deep note not checked this run.

## The plain notes on Genesis 2 (2026-11-19)

`client/public/bible/notes/genesis/plain/2.json`. One search for this
chapter (counted above), with the book page's rows and the earlier ledger.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Shavat: to stop or cease; Sabbath from the same root | 1-3 | Repository deep note (`words`, H7673A) | Repository |
| Exodus 20:8-11; Deuteronomy 5:15; Mark 2:27; Hebrews 4:9-10 | 1-3 | BSB | Repository |
| In Babylon's stories the gods rest because humans do their work | 1-3 | Site guide genesis-one-in-its-world; Atrahasis row above | Repository; earlier search |
| ‘The LORD God’: the personal name; Elohim in chapter 1 | 4-7 | Repository deep note (`historical`) | Repository |
| Adam and adamah; yatsar the potter's verb (Jeremiah 18); living being used of animals in 1:20-24 | 4-7 | Repository deep note (`cultural`, `words`) | Repository; Hebrew from the repository text |
| Atrahasis: clay and a slain god's blood | 4-7 | Book page row (search) | Earlier search |
| Two accounts: two sources each with its point; one writer, overview then close-up; 2:5 wild scrub and farmed crops; 2:19 ‘had formed’ | 4-7 | Repository deep note (`hard`) | Repository; stated as views, scholars not named |
| Historical Adam: Christians differ; some weigh it above the days because of Romans 5 | 4-7 | Honest Answer on Genesis 1 | Repository |
| Psalm 103:14; Ecclesiastes 3:20; 1 Corinthians 15:45; John 20:22 | 4-7 | BSB | Repository. The Septuagint verb link to John 20:22 is given only as "many readers see a deliberate echo" |
| Tigris (Hiddekel) and Euphrates; Pishon and Gihon not identified with certainty | 8-17 | Repository deep note (`historical`) | Repository |
| Eden: ‘delight’ or ‘well-watered place’; scholars weigh both | 8-17 | Repository deep note (Millard 1984) | Repository; no name given |
| Wenham, "Sanctuary Symbolism in the Garden of Eden Story" (Proceedings of the Ninth World Congress of Jewish Studies, 1986): the garden a sanctuary, Adam an archetypal Levite; entrance east as the tabernacle's | 8-17 | Wenham | Search: Lioy (sats.edu.za); moseseditor blog; adventistbiblicalresearch.org; BYU RSC (Bradshaw) |
| Same verb ‘walk’ (hitpael of halak) in 3:8 and Leviticus 26:12; the pair avad and shamar in 2:15 and Numbers 3:7-8; Exodus 26:31 cherubim in the veil | 8-17 | Hebrew text; BSB | Script over the repository's Strong's numbers and stems |
| Knowledge of good and evil: moral autonomy; all things; maturity | 8-17 | Repository deep note (Genesis 3 `hard`) | Repository; stated as readings |
| Ezer: 21 uses; most of God (Exodus 18:4; Psalm 121:2); kenegdo ‘corresponding to him’ | 18-25 | Hebrew text; lexicon | Script; repository deep note (`words`) |
| Tsela: 31 uses; elsewhere usually a side (Exodus 25:12) | 18-25 | Hebrew text | Script over Strong's H6763 |
| Kinship formula: Genesis 29:14; 2 Samuel 5:1 | 18-25 | BSB | Repository |
| A bride usually joined her husband's family | 18-25 | Repository deep note (`cultural`); Genesis 24:58-61 | Repository; stated generally |
| Complementarian and egalitarian readings; 1 Timothy 2:13 | 18-25 | Repository deep note (`hard`) | Repository; no scholars named |
| Matthew 19:4-5, 19:12; Ephesians 5:32; 1 Corinthians 7:7; Psalm 68:6 | 18-25 | BSB | Repository |

Left out: Kramer and Enki and Ninhursag; Brueggemann (CBQ 1970); Trible,
Ortlund, Hess, Stanton and Friedman by name; Cush as the Kassites; the king's
garden as a sign of power (not checked; cut).

## The plain notes on Genesis 3 (2026-11-19)

`client/public/bible/notes/genesis/plain/3.json`. Three searches for this
chapter (two counted above, and one on Gilgamesh's plant), with the earlier
rows.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Arum (crafty, 3:1) and arummim (naked, 2:25) | 1-7 | Hebrew text | Script (H6175, H6174) |
| Gilgamesh XI: the plant that renews youth; a snake takes it while he bathes and sheds its skin; he weeps | 1-7 | Epic of Gilgamesh | Search: Britannica "Epic of Gilgamesh"; GradeSaver; Macmillan source excerpt |
| Genesis does not name the serpent Satan; the Wisdom of Solomon 2:24 (death through the devil's envy), traditionally the first text to equate the serpent with the devil, a reading recently questioned (Zurawski 2012) | 1-7 | Wisdom 2:24 | Search: bible.usccb.org (note); Orion bibliography (Zurawski). Paraphrased; "which many read as" |
| Revelation 12:9, 20:2; John 8:44; 2 Corinthians 11:3; Matthew 4:4; Hebrews 4:15; Romans 5:12; 1 Timothy 2:14 | 1-7 | BSB | Repository |
| Hitpael of halak in 3:8 and Leviticus 26:12 | 8-13 | Hebrew text | Script |
| Original sin: Augustine and the Latin ‘in whom all sinned’ for Romans 5:12; Orthodox ‘ancestral sin’, death and a tendency to sin inherited, not guilt; Greek phrase debated | 8-13 | Western and Orthodox teaching | Search: stgeorgegreenville.org (Orthodox catechism); saintjohnchurch.org; summaries of Meyendorff. Stated as views |
| Eating or licking dust as defeat (Micah 7:17); only the serpent and the ground cursed (arar at 3:14 and 3:17) | 14-15 | BSB; Hebrew text | Repository; script (H0779) |
| Zera one child or a line | 14-15 | Repository deep note (`words`) | Repository |
| Irenaeus, Against Heresies 5.21: Christ the woman's seed, recapitulation, crushing the enemy | 14-15 | Irenaeus | Search: newadvent.org/fathers/0103521.htm; St James Lancaster forum paper. Paraphrased |
| Galatians 4:4; Romans 16:20; Hebrews 2:14; 1 John 3:8 | 14-15 | BSB | Repository |
| Itsavon for both judgments (3:16, 3:17); teshuqah and mashal together in 3:16 and 4:7; teshuqah in Song 7:10 | 16-19 | Hebrew text | Script (H6093, H8669, H4910) |
| Two readings of ‘desire’ (longing; desire to control) | 16-19 | Repository deep note (`words`) | Repository; no names |
| Rachel's death in childbirth (35:16-19); Genesis 5:29; Romans 8:20-21; 1 Corinthians 15:26; Revelation 22:3; Ephesians 5:25 | 16-19 | BSB | Repository |
| Safety wording copied word for word from the Mark 10:1-12 note | 16-19 | Site | Repository (grep: the sentence appears once in each file) |
| Kuttonet for 3:21, Joseph's robe (37:3), priests' tunics (Exodus 28:40); lavash at 3:21 and Leviticus 8:13 | 20-24 | Hebrew text | Script (H3801, H3847) |
| Cherubim in the tabernacle veil (Exodus 26:31); Cain east of Eden (4:16) | 20-24 | BSB | Repository |
| The ‘surely die’ formula (mot tamut, ‘in the day’) in 1 Kings 2:37 | 20-24 | Hebrew text | Script (H4191 twice, H3117) |
| Three views on death before the fall; no side | 20-24 | Honest Answer (evolutionary creation's hard question); repository deep notes | Repository; stated as views |
| Revelation 22:2-3, 22:14; Colossians 3:10; 2 Corinthians 5:17; 1 Corinthians 15:22 | 20-24 | BSB | Repository |

Left out: Adapa; the uraeus and Apophis; the Timna copper snake; the Life of
Adam and Eve and 1 Enoch's Gadreel; Niehaus's storm reading of 3:8;
Foh, Collins, Barr, Moberly, Wenham, Kant, Fromm and the Nag Hammadi texts by
name; the term ‘protoevangelium’ and its date (the page says "Christians have
long called it").

## The plain notes on Genesis 4 (2026-11-19)

`client/public/bible/notes/genesis/plain/4.json`. Three web searches for
this chapter, with the book page's rows above and the repository.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Qayin and qanah; Hevel as breath (Ecclesiastes) | 1-7 | Repository deep note (`words`) | Repository |
| Grain offerings in Israel's law (Leviticus 2); "All the fat is the LORD’s" (Leviticus 3:16) | 1-7 | BSB | Repository |
| First use of chattat (sin); teshuqah and mashal shared with 3:16 | 1-7 | Hebrew text | Repository deep note; earlier script row (Genesis 3) |
| Readings of the two offerings (quality; the giver's heart, Hebrews 11:4 and 1 John 3:12; blood sacrifice, doubted; the younger chosen) | 1-7 | Repository deep note (`cultural`); book page's theme | Repository; stated as readings, no names. The deep note's Mesopotamian threshold demon was not checked and is not used |
| 4:8: the Hebrew does not report Cain's words; Samaritan, Greek and others supply ‘Let us go out to the field’ | 8-16 | Repository introduction (`text`) | Repository |
| Shamar in 2:15 and 4:9; ot in 4:15, 9:12, 17:11; Nod ‘wandering’ and nud (4:12, 4:14) | 8-16 | Hebrew text; lexicon | Script over the repository's Strong's numbers (H8104, H0226, H5113, H5110) |
| Blood feud; "the avenger of blood" (Numbers 35:19) | 8-16 | BSB; repository deep note | Repository |
| Mark of Cain read as black skin in nineteenth-century America: Brigham Young's speeches of 1852 and 1859; Protestant use alongside the "curse of Ham" to defend slavery; the Latter-day Saint priesthood restriction ended in 1978 and the church has since disavowed the teaching | 8-16 | History | Search: Wikipedia "Curses of Cain and Ham (LDS Church)" and "Curse and mark of Cain"; Milestone Documents (Young's 1852 speech). The page names no church and says "some churches", "to defend slavery and to keep Black people out of church office" |
| Matthew 23:35; Hebrews 11:4, 12:24; 1 John 3:12, 3:15, 1:9; Jude 1:11; Revelation 6:10; Psalm 4:4; Ephesians 4:26; Matthew 5:22; 1 Samuel 16:7 | all | BSB | Repository |
| Lamech the first with two wives; arts in Cain's line | 17-24 | BSB; repository deep note | Repository. The deep note's apkallu and its iron date were not checked and are not used |
| LXX Genesis 4:24 uses hebdomekontakis, the word of Matthew 18:22; many read Jesus as answering Lamech | 17-24 | Septuagint | Search: Blue Letter Bible LXX lexicon (G1441); B-Greek archive (Conrad, 2001); Bible Hub. Stated as "many readers hear" |
| Romans 12:19; Exodus 31:3-5; Psalm 150:4; Matthew 18:21-22 | 17-24 | BSB | Repository |
| Jubilees 4:9: Cain married his sister Awan; Jubilees about the second century BC | 17-24 | Book of Jubilees | Search: Bible Odyssey "Whom did Cain marry?"; Wikipedia "Book of Jubilees"; Charles's translation via jmoorewv.com. The page does not give the sister's name |
| Cain's wife: other views (a wider population; a representative story) | 17-24 | Repository deep note (`hard`) | Repository; stated as views |
| Shat (‘appointed’) in 4:25; Enosh as ‘mortal man’ (H0582); calling on the name (12:8; Joel 2:32; Acts 2:21; Romans 10:13; Luke 3:38) | 25-26 | Hebrew text; lexicon; BSB | Script (H7896); repository lexicon; repository |

## The plain notes on Genesis 5 (2026-11-19)

`client/public/bible/notes/genesis/plain/5.json`. Four web searches for this
chapter.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Likeness and image (1:26; 5:1, 5:3); Romans 5:14; James 3:9; Luke 3:38 | 1-5 | BSB | Repository |
| Sumerian King List: before the flood, five cities, eight kings, 241,200 years in all (some copies ten kings) | 6-20 | Sumerian King List | Search: csun.edu translation ("Five Cities, eight kings, reigned 241,200 years"); CDLI composite P479895; Harrison, JETS 36:1 (1993). Stated as "eight kings ... 241,200 years" |
| Creation to flood: 1,656 years in the Hebrew text; more than 2,200 in the Greek (2,242 or 2,262 by the Methuselah variant); 1,307 in the Samaritan; the Greek often adds a hundred years | 6-20 | Text witnesses | Search: Smith (ICC 2018; BAS 2018); Armstrong Institute; Wevers (1993) as cited; repository introduction (`text`). The page says "more than 2,200" |
| Ussher, Annals (1650): creation 4004 BC; printed in the margins of King James Bibles from the early 1700s | 6-20 | Ussher | Search: Linda Hall Library exhibit; EBSCO research starter; Oxford History of Science museum. The page says "later printed in the margins of many English Bibles" |
| Matthew 1:8 goes from Joram to Uzziah; Ahaziah, Joash and Amaziah in 2 Kings 8 to 14 | 6-20 | BSB | Repository |
| Readings of the ages (ordinary years; symbolic or honorific; king-list form); 365 and 777 | 6-20 | Repository deep note (`hard`) | Repository; no side |
| Psalm 90:10 (cited, not quoted: its BSB text holds an em-dash), 90:12; 1 Corinthians 15:26; John 11:25; 1 Thessalonians 4:13 | 6-20 | BSB | Repository |
| Halakh ‘walk’ (5:22, 5:24, 6:9); laqach and 2 Kings 2:3; Hebrews 11:5-6; Micah 6:8 | 21-24 | Repository deep note (`words`); BSB | Repository |
| Jude 1:14-15 almost word for word 1 Enoch 1:9; 1 Enoch dated to the third to first centuries BC; "seventh from Adam" counts Adam | 21-24 | 1 Enoch | Search: Reformation Study Bible note (BibleGateway); NET note (Biblia); Ligonier. Paraphrased; no words of 1 Enoch quoted |
| Seventh in Cain's line (Lamech) and in Seth's (Enoch) | 21-24 | BSB | Repository (counted) |
| Noah and nuach; nacham in 5:29 and 6:6-7 | 25-32 | Hebrew text | Script (H5162, H5117) |
| Methuselah's death in the flood year (187 + 182 + 600 = 969) | 25-32 | BSB numbers | Repository (arithmetic on 5:25, 5:28, 7:6) |
| Genesis 8:21; Matthew 11:28; Romans 8:21; Revelation 22:3; 1 Peter 3:20; Acts 17:28 | 25-32 | BSB | Repository |

## The plain notes on Genesis 6 (2026-11-19)

`client/public/bible/notes/genesis/plain/6.json`. Two web searches for this
chapter, with the book page's rows (sons of God, Atrahasis, Gilgamesh).

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Saw, good, took: tov in 3:6 and 6:2 | 1-4 | Hebrew text | Script (H2896) |
| Sons of God: angels (early readers; Job 1:6; Jude 1:6 and 2 Peter 2:4 as possible allusions); Seth's line (most Christian teachers from the fourth century, Augustine); rulers | 1-4 | Interpretation history | Book page row (search); new search for the rulers view: Targum Onqelos and Pseudo-Jonathan ‘sons of the great ones’, Neofiti ‘sons of judges’, Symmachus ‘sons of the rulers’ (Wikipedia "Sons of God"; Newman, Grace Theological Journal; oztorah.com). The page says "some ancient Jewish translations"; 1 Enoch is not named for the angel reading |
| Nephilim's meaning uncertain; Numbers 13:33 (cited, not quoted: its BSB text holds an em-dash) | 1-4 | Lexicon; BSB | Repository. The derivation from ‘to fall’ was not checked and is not used |
| Matthew 22:30; Job 1:6; Jude 1:6; 2 Peter 2:4-5 | 1-4 | BSB | Repository |
| 120 years: a lifespan limit or the time before the flood | 1-4 | Repository deep note | Repository; stated as views |
| Yetser (6:5, 8:21) from the potter's verb; atsav (6:6) and itsavon (3:16-17, 5:29) one root; nacham in 5:29 and 6:6; Noah and chen (favor) the same two letters reversed | 5-8 | Hebrew text | Script (H3336, H6087, H6093, H5162, H2580) |
| 1 Samuel 15:11, 15:29, 15:35; Hosea 11:8; Ephesians 4:30; Ezekiel 33:11; Jeremiah 18:8 | 5-8 | BSB | Repository |
| Regret: God spoken of in human terms; a personal God who responds; both held together | 5-8 | Repository deep notes; standard theology | Stated as views, no names |
| Shachat in 6:11-13, 6:17; chamas, used by the prophets (Amos 3:10) | 9-13 | Hebrew text | Script (H7843, H2555) |
| Atrahasis: the flood for noise | 9-13 | Book page row (search) | Earlier search |
| Luke 13:4-5 (BSB wording, not the Honest Answer's ESV); the Honest Answer's point that Jesus refused that reading of a disaster; Find Help | 9-13 | BSB; Honest Answer "Why does God allow earthquakes, cancer, and animal suffering?" | Repository |
| 2 Peter 2:5, 3:9; Hebrews 11:7; Matthew 24:37-38 | 9-13 | BSB | Repository |
| Cubit about 18 inches; ark about 450 by 75 by 45 feet (137 by 23 by 14 meters); gopher wood unknown, cypress a guess; pitch in Mesopotamia | 14-22 | Repository deep note (`historical`, `cultural`) | Repository; given as "often reckoned" and "roughly" |
| Gilgamesh's boat usually read as a cube (equal sides, 120 cubits) | 14-22 | Gilgamesh XI | Search: historyskills.com; imsmessenger.org; howstuffworks. The page says "usually read as a cube" and gives no deck count (sources differ) |
| Tevah only in Genesis 6 to 9 and Exodus 2:3, 2:5; tar and pitch | 14-22 | Hebrew text; BSB | Script (H8392) |
| 1 Peter 3:20-21 (only the dash-free words quoted); Luke 22:20; Genesis 9:9-10 | 14-22 | BSB | Repository |

## The plain notes on Genesis 7 (2026-11-19)

`client/public/bible/notes/genesis/plain/7.json`. Two web searches for this
chapter.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Clean and unclean (Leviticus 11:47); ‘seven seven’ read as seven pairs or seven; 8:20, 9:3 | 1-10 | Repository deep note (`cultural`); BSB | Repository |
| Two of every kind (6:19-20) and seven pairs (7:2-3): the fuller-detail reading and the two-sources reading; ‘God’ in 6:22, ‘the LORD’ in 7:5 | 1-10 | Book page (authorship part); BSB | Repository; stated as views, no side |
| Luke 17:26-27; 1 Peter 3:20; Hebrews 11:7 | 1-10 | BSB | Repository |
| Waters above and below; tehom in 1:2, 7:11, 8:2; ‘windows’ of heaven; sagar in 7:16 | 11-16 | Repository deep note (`cultural`, `words`); Hebrew text | Script (H8415, H5462) |
| Psalm 29:10; Mark 4:39; John 10:9 (the door link said to be a reading the New Testament does not draw); Ezekiel 33:11 | 11-16 | BSB | Repository |
| Reverse order of creation in 7:23; breath of life (2:7) | 17-24 | Repository deep note (`literary`); BSB | Repository |
| Flood layers at Ur, Kish and Shuruppak; Woolley's 1929 announcement for Ur; the layers of different dates and local floods; Woolley later retracted the identification | 17-24 | Archaeology | Search: Penn Museum Expedition "Reflections on the Mesopotamian Flood"; livius.org "The Great Flood: Archaeology?"; NCSE Creation/Evolution Journal; New World Encyclopedia "Leonard Woolley"; a 1929 newspaper (Papers Past). The retraction rests on one secondary source (livius.org) and is worded simply |
| Whitcomb and Morris, The Genesis Flood (1961): a universal flood and flood geology; written partly against Ramm's local-flood view (1954, not named on the page) | 17-24 | The Genesis Flood | Search: Wikipedia "The Genesis Flood"; Grace Journal review (1961); ASA review |
| Erets as earth and land (7:19, 12:1, 13:12, 41:57); "every nation came to Joseph" (41:57) | 17-24 | Hebrew text; BSB | Script (H0776) |
| Third view: the writer describes the whole earth, an ancient telling of a real memory (a universal reading held by many critical commentators) | 17-24 | Davidson, "The Biblical Flood: Local or Universal" (Adventist paper, 2023); repository deep note | Search, as above; stated as a view |
| 2 Peter 3:6; Isaiah 54:9; Isaiah 43:2 | 17-24 | BSB | Repository |

## The plain notes on Genesis 8 (2026-11-19)

`client/public/bible/notes/genesis/plain/8.json`. Two web searches for this
chapter, with the book page's Gilgamesh row.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Zakar ‘remember’ (8:1; 9:15-16; 19:29); Genesis 30:22; Exodus 2:24; 1 Samuel 1:11; Luke 23:42; Isaiah 49:15 | 1-5 | Hebrew text; BSB | Script (H2142); repository |
| Ruach in 1:2 and 8:1; nuach in 8:4; nichoach in 8:21 | 1-5, 20-22 | Hebrew text | Script (H7307, H5117, H5207) |
| Ararat a region (plural ‘mountains’), Urartu in Assyrian texts, around Lake Van, eastern Turkey and Armenia; the peak's name modern; ark claims unconfirmed | 1-5 | Geography and history | Search: Encyclopedia.com "Ararat"; Biblical Archaeology Society "Where Noah landed"; Bible Hub atlas. "Never confirmed" from the repository deep note |
| 2 Kings 19:37; Jeremiah 51:27 | 1-5 | BSB | Repository |
| Gilgamesh XI: the boat on Mount Nimush; dove, swallow (both return), raven (does not); the offering, and the gods arriving at it | 6-12, 20-22 | Gilgamesh | Search: livius.org (Gilgamesh flood text); etana.org (Kovacs translation); historyskills.com; book page row. **Cut:** the gods gathering "like flies" (not found in the results) and the olive branch as a symbol of peace "because of this story"; ancient sailors releasing birds (not checked) |
| Olive trees at lower elevations | 6-12 | Repository deep note (`cultural`) | Repository; stated plainly ("does not grow on high mountains") |
| Matthew 3:16 and the dove, an echo the New Testament does not draw; Psalm 130:5 | 6-12 | BSB; repository deep note | Repository |
| Dates: 7:11 and 8:14, about a year; ‘be fruitful and multiply’ (1:22, 1:28, 8:17) | 13-19 | BSB | Repository |
| Romans 8:22; Revelation 21:1 | 13-19 | BSB | Repository |
| First altar (mizbeach first at 8:20); olah first at 8:20; ‘pleasing aroma’ in Leviticus 1:9 | 20-22 | Hebrew text; BSB | Script (H4196, H5930) |
| Gods fed by offerings in Babylon's world | 20-22 | Site guide the-gods-of-the-nations (earlier ledger row) | Repository |
| Ephesians 5:2; Ezekiel 36:26; Jeremiah 33:20; Psalm 74:17 | 20-22 | BSB | Repository |

## The plain notes on Genesis 9 (2026-11-19)

`client/public/bible/notes/genesis/plain/9.json`. Three web searches for
this chapter, with the book page's "curse of Ham" row.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Plants (1:29), then meat (9:3); blood as life (Leviticus 17:11); Acts 15:20; Matthew 26:28; James 3:9 | 1-7 | BSB | Repository |
| Seven Noahide laws in the Talmud (Sanhedrin 56a-b): courts, and bans on blasphemy, idolatry, forbidden sexual relations, murder, theft, and eating from a living animal; six drawn from Genesis | 1-7 | Talmud | Search: My Jewish Learning "Sanhedrin 56"; Steinsaltz daf; Wikipedia "Seven Laws of Noah". Paraphrased; the page names two of the seven |
| 9:6 and the death penalty: a lasting mandate (before Moses; Romans 13:4); a description or proverb; a principle; God's protection of Cain; no side | 1-7 | Christian views | Search: Church Life Journal (Notre Dame) "The Death Penalty and the Consequences of the Literal Meaning of Genesis 9:6"; ERLC; Christianity Today (Colson as quoted). No church or writer named on the page; the Catholic Catechism's 2018 wording was not retrieved and is not used |
| Covenant with no duties on Noah's side; to the animals; qeshet the ordinary word for a bow (9:13-16, 27:3); the war-bow picture as a reading the text does not state | 8-17 | Hebrew text; repository deep note | Script (H7198); repository |
| Isaiah 54:9-10; Hosea 2:18; Ezekiel 1:28; Revelation 4:3; Luke 13:4-5 (BSB) | 8-17 | BSB | Repository |
| Disaster care: the Honest Answer's point on Luke 13 and Find Help | 8-17 | Honest Answer "Why does God allow earthquakes, cancer, and animal suffering?" | Repository |
| Echo of the garden; honor of a father; ervah in 9:22-23 | 18-23 | Repository deep note (`literary`, `cultural`); Hebrew text | Repository; script (H6172) |
| What Ham did: the plain reading; a worse act (Talmud, Sanhedrin 70a; Encyclopaedia Judaica on Leviticus 20:17; some modern scholars); Canaan involved (rabbis cited by Rashi) | 18-23 | Interpretation history | Search: Wikipedia "Curse of Ham"; Encyclopedia.com "Ham"; aish.com; vridar.org. Stated without lurid detail; no source named on the page |
| Proverbs 20:1; Ephesians 5:18; Proverbs 10:12; 1 Peter 4:8 | 18-23 | BSB | Repository |
| Curse from Noah, not God; Canaan cursed, not Ham; three readings of why | 24-29 | BSB; repository deep note (`hard`) | Repository; stated as readings |
| Semitic from Shem; Gibeonites as servants (Joshua 9:23) | 24-29 | Repository deep note (`historical`); BSB | Repository |
| "The curse of Ham" paragraph copied word for word from the book page (from "Yet for centuries" to "about race") | 24-29 | Book page; Goldenberg row | Repository (checked by script: the paragraph appears verbatim) |
| Ezekiel 18:20; Matthew 1:5; Matthew 15:22-28; Acts 17:26; Galatians 3:28; Revelation 7:9 | 24-29 | BSB | Repository |

## The plain notes on Genesis 10 (2026-11-19)

`client/public/bible/notes/genesis/plain/10.json`. Two web searches for this
chapter, with the repository lexicon.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Madai the Medes; Javan the Ionians or Greeks; Gomer the Gimirrai (Cimmerians); Tubal and Meshech northern peoples | 1-5 | Identifications | Search: Bible Odyssey and biblicaltraining.org "Table of Nations"; Josephus as quoted; JBL 1925 (biblicalstudies.gospelstudies.org.uk). "Usually linked" for Gomer; some names "cannot now be placed" |
| Kittim Cyprus; Tarshish a distant Mediterranean port (Jonah 1:3) | 1-5 | Lexicon; BSB | Repository lexicon (H3794, H8659) |
| Isaiah 66:19 (only the dash-free words quoted); Ezekiel 38:2; Revelation 20:8 (cited, not quoted) | 1-5 | BSB | Repository |
| Mizraim Egypt; Cush south along the Nile (Ethiopia); Put probably Libya; Caphtor (Crete) and Amos 9:7; Asshur Assyria; Aram Syria; Elam east of Babylon | 6-20, 21-32 | Lexicon; BSB | Repository lexicon (H4714, H3568, H6316, H3732, H0804, H0758, H5867) |
| Gibbor in 6:4 and 10:8; Nimrod's cities (Uruk for Erech); no historical Nimrod confirmed | 6-20 | Repository deep note (`historical`, `words`) | Repository |
| Canaanite language close to Hebrew yet under Ham; Elamite unrelated yet under Shem; the list not a racial table | 6-20 | Repository deep note (`cultural`) | Repository |
| Isaiah 19:25; Psalm 87:4; Micah 5:6; Acts 2:10-11 | 6-20 | BSB | Repository |
| Peleg and palag (10:25); mishpachah in 10:5, 10:20, 10:31 and 12:3 | 21-32 | Hebrew text | Script (H6389, H6385, H4940) |
| Eber and ‘Hebrew’ | 21-32 | Not checked | Stated as "may ... not certain" |
| Seventy names in the Hebrew, seventy-two in the Greek; Luke 10:1 seventy or seventy-two in the manuscripts (BSB seventy-two); the link to the nations argued, not proved | 21-32 | Text and interpretation | Search: Bible Hub "Were there 70 or 72 disciples?"; Faithlife Study Bible sidebar; ESV Study Bible note as quoted; biblicaltraining.org "Seventy Disciples" |
| Genesis 46:27 (seventy); Acts 17:26; Matthew 28:19; Revelation 7:9 | 21-32 | BSB | Repository |

## The plain notes on Genesis 11 (2026-11-19)

`client/public/bible/notes/genesis/plain/11.json`. Three web searches for
this chapter, with the book page's rows (Babel and Babylon one word; exile
dates; Ur) and the Luke 1 note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Shinar the land of Babylon (Daniel 1:2); fired brick and bitumen for great buildings in Mesopotamia, stone in Canaan | 1-4 | Repository deep note (`historical`, `cultural`); BSB | Repository |
| Etemenanki, Babylon's ziggurat, ‘house of the foundation of heaven and earth’; many scholars link the Babel story with the ziggurats, Etemenanki in particular | 1-4 | Archaeology | Search: Wikipedia "Etemenanki" and "Ziggurat"; National Geographic; French Ministry of Culture "Orient cunéiforme" |
| Enuma Elish tablet VI: the gods mould bricks and build Esagila and Babylon for Marduk | 1-4 | Enuma Elish | Search: Budge, The Babylonian Legends of the Creation (1921) at sacred-texts.com; King (1902). Paraphrased; "for a year" not used |
| Kings ‘made a name’ by building inscriptions | 1-4 | Repository deep note (`cultural`) | Repository; stated generally |
| 9:1 "fill the earth"; Revelation 18:2; Psalm 127:1; Genesis 12:2 | 1-4 | BSB | Repository |
| Babel heard in Akkadian as Bab-ili ‘gate of the god’ (a popular etymology of an older name); balal in 11:7 and 11:9 | 5-9 | Akkadian; Hebrew text | Search: NET note (Biblia) on 11:9; Sarna as quoted; Blue Letter Bible H894. Script (H1101). The page says "was understood as" |
| Babylon took Jerusalem in 586 BC | 5-9 | Earlier ledger (wot-ledger.md) | Earlier ledger |
| Readings of the sin (pride; refusing to scatter; reaching heaven; one power); judgment and mercy; the origin of languages read two ways, no side | 5-9 | Repository deep note (`hard`) | Repository; stated as readings |
| Acts 2:5-6 as Babel reversed (a reading, said so); Zephaniah 3:9; Luke 1:51; James 4:6 | 5-9 | BSB; repository deep note | Repository |
| Ten generations each (Adam to Noah; Shem to Abram), each ending with three sons; Shem ‘name’; ages 600, 239, 148 | 10-26 | BSB; Hebrew text | Repository (counted and added) |
| Greek translation adds years and Cainan (11:12-13); Luke 3:36 follows it | 10-26 | Repository introduction (`text`); BSB | Repository |
| Luke 3:34-36; Galatians 3:8 | 10-26 | BSB | Repository |
| Ur: Woolley 1922 to 1934 for the British Museum and the Penn Museum; Nanna (Sin); moon god at Haran; Chaldeans settled by about 850 BC; the later-wording argument and its reply | 27-32 | Book page row (search) | Earlier search. **Cut:** a northern Ur (not checked) |
| Joshua 24:2; Acts 7:2-4; Genesis 15:7; Hebrews 11:8, 11:10 | 27-32 | BSB | Repository |
| Aqar ‘barren’ in 11:30, 25:21, 29:31; 1 Samuel 1:2; Luke 1:7 | 27-32 | Hebrew text; BSB | Script (H6135); repository |
| Care line: "Many faithful people long for children and never have them, or lose them before birth." and "Childlessness is not a judgment from God, and it does not measure your faith. Your longing is seen. If the grief is heavy, please share it with someone you trust: a friend, a pastor, a counsellor." copied word for word from the Luke 1:5-17 note | 27-32 | Site | Repository (grep) |

## The plain notes on Genesis 12 (2026-11-19)

`client/public/bible/notes/genesis/plain/12.json`. Three web searches for
this chapter, with the book page's rows (Ur and Haran, the moon god, the
camel study, Joshua 24:2) and the repository's deep and verse notes.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The father's household held land, flocks, graves, name and protection; leaving it made one an outsider | 1-3 | Repository deep note (`cultural`) | Repository; stated generally |
| ‘Bless’ five times in 12:2-3; ‘curse’ recurring before (3:14, 3:17, 4:11, 5:29, 9:25); mishpachot as in chapter 10; 11:4 against 12:2 | 1-3 | Hebrew text; book page | Repository (deep note `literary`; book page "repeated five times in three verses") |
| 12:3 Niphal ‘be blessed’; 22:18 and 26:4 Hithpael ‘bless themselves’; the Greek and Galatians 3:8, Acts 3:25 take the passive | 1-3 | Repository verse note and deep note (`text`) | Repository; stated as two readings |
| Plural ‘those who bless’, singular ‘the one who curses’ | 1-3 | Hebrew text; deep note (`words`) | Repository |
| Genesis 12:3 is the verse most cited by Christian Zionists and is applied by some to nations and to U.S. policy toward the modern state; critics reply it is a promise to Abraham, not to a modern state | 1-3 | Press and church sources | Search: religionunplugged.com; catholic.com "Are Christians commanded to support Israel"; relevantmagazine.com; pursuegod.org. Stated as two views, no side, no names |
| Acts 7:5; Hebrews 11:8-9, 11:16; Romans 4:13; Romans 11:29; Galatians 3:8-9, 3:29; Leviticus 25:23; Matthew 5:5; 8:11; Joshua 24:1-2; Psalm 105:14; Exodus 12:35-36 | all | BSB | Repository |
| Christian readings of the land promise (still the Jewish people's in history; widened in Christ to the renewed earth; both) | 4-9 | Repository deep note on Genesis 13 (`hard`) | Repository; no side |
| Great trees as places of seeking guidance; Shechem and Bethel later places of worship | 4-9 | Repository deep note (`cultural`); Joshua 24:1 | Repository |
| Khnumhotep II's tomb at Beni Hasan (BH3): the Aamu of Shu under Abisha, dated to year 6 of Senusret II (1800s BC) | 10-20 | Kamrin, JAEI 2009, as summarised | Search: en.wikipedia.org "Khnumhotep II"; journals.librarypublishing.arizona.edu (JAEI). The page says "from the 1800s BC"; the count of 37 not used |
| Pharaoh from per-aa ‘great house’, first the palace, later the king himself (New Kingdom) | 10-20 | Egyptian | Search: britannica.com "pharaoh"; worldhistory.org; egypt-museum.com |
| Sarai a half-sister (20:12); three wife-sister stories (12, 20, 26) | 10-20 | BSB; deep note | Repository |
| Camels: Tel Aviv University 2013 | 10-20 | Book page row | Earlier search |
| Augustine's defence of Abram; Nachmanides' judgment | 10-20 | Repository deep note | Not checked this run: said only as "some old readers" and "many readers, Jewish and Christian" with no names |
| Care line for a reader put at risk by a protector; Find Help named | 10-20 | Site | Written for this page; no phone number |

Cut: the Execration Texts and Khu-Sebek stela naming Shechem; the
Ehulhul temple; the names Nahur, Sarugi, Til-Turahi; Papyrus Anastasi VI;
Pharaoh's gifts as a bride-price; the Speiser and Greengus Nuzi argument;
the Genesis Apocryphon and Jubilees retellings (all from the deep note, not
checked this run).

## The plain notes on Genesis 13 (2026-11-19)

`client/public/bible/notes/genesis/plain/13.json`. No new web search; the
book page's rows and the repository's deep note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| 12:8 altar between Bethel and Ai; 4:26 calling on the name; 12:16 wealth from Egypt | 1-4 | BSB | Repository |
| Luke 15:20; Revelation 2:5; Jeremiah 6:16 | 1-4 | BSB | Repository (validator caught two misquotations from memory; corrected to the BSB) |
| Quarrels over wells (21:25; 26:20); the elder's right to choose first; ‘brothers’ for close kin | 5-13 | Repository deep note (`cultural`); BSB | Repository; stated generally |
| Sodom's site: south and north of the Dead Sea proposed, no agreement | 5-13 | Book page row | Earlier search |
| 14:12 Lot living in Sodom; 2 Peter 2:7-8; Ezekiel 16:49; Philippians 2:3; Romans 12:18 | 5-13 | BSB | Repository |
| Walking the land as a claim, Joshua 1:3; Hebron, Mamre, chapter 23, 2 Samuel 2:4 | 14-18 | Repository deep note; BSB | Repository; "could be a way of showing a claim" |
| Romans 4:13; Matthew 5:5; Hebrews 11:9-10 | 14-18 | BSB | Repository |

Cut: the Perizzites as ‘villagers’ (deep note, not checked); the kikkar as
‘circle’.

## The plain notes on Genesis 14 (2026-11-19)

`client/public/bible/notes/genesis/plain/14.json`. Three web searches for
this chapter.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Shinar the land of Babylon; Elam in south-western Iran | 1-12 | Earlier ledger (Genesis 11); common reference | Earlier search; standard geography |
| None of the four kings firmly identified; Amraphel as Hammurabi proposed (older encyclopedias) and not accepted; Chedorlaomer a Kudur-type Elamite name; Tidal compared with Tudhaliya; identifications have had limited acceptance | 1-12 | Encyclopedia of the Bible (Bible Gateway) "Chedorlaomer", "Amraphel"; Wikipedia "Chedorlaomer"; ISBE | Search. Stated as "suggestions, not proofs"; Rohl's Amar-Sin not used |
| No record of the war outside Genesis; late creation or older source (views) | 1-12 | Repository deep note (`historical`) | Repository; stated as views |
| Bela = Zoar; Siddim = Salt Sea; tar pits | 1-12 | BSB (14:2-3, 10) | Repository |
| Deuteronomy 2:10-11; 2 Chronicles 20:2 (Hazazon-tamar = En-gedi); 1 Corinthians 15:33 | 1-12 | BSB | Repository |
| ‘Hebrew’ first in 14:13; used by outsiders (39:14; 1 Samuel 4:6) | 13-16 | BSB | Repository |
| Dan formerly Laish (Judges 18:29) | 13-16 | BSB; book page row | Repository |
| 1 Samuel 30:24; John 15:13 | 13-16 | BSB | Repository |
| Melchizedek ‘king of righteousness’; Salem usually identified with Jerusalem (Psalm 76:2); Adoni-zedek (Joshua 10:1); El Elyon a title of the highest God; king-priests | 17-20 | Repository deep note (`cultural`); BSB | Repository; "usually identified" |
| Melchizedek identified with Shem in rabbinic tradition (Nedarim 32b; Targum Pseudo-Jonathan; Avot de Rabbi Natan), on Shem's long life | 17-20 | Rabbinic texts as summarised | Search: intertextual.bible (Nedarim 32b); newworldencyclopedia.org; Hayward, Biblica 81 (2000). Texts not named on the page |
| 11QMelchizedek (11Q13): Melchizedek a heavenly deliverer bringing release and judgment at the end | 17-20 | Dead Sea Scrolls as summarised | Search: intertextual.bible 11q13; posenlibrary.com; Wikipedia 11Q13. Called "a scroll found among the Dead Sea Scrolls" |
| Psalm 110:4; Hebrews 7:2-3, 7:16; bread and wine as Supper not drawn by the New Testament | 17-20 | BSB; deep note (`christ`) | Repository |
| Tithe views (a lasting pattern, from Abram and 28:22; or no New Testament command, 2 Corinthians 9:7); no side | 17-20 | BSB | Repository; stated as views |
| Raised hand as oath; refusing Sodom's spoils; contrast with chapter 12 | 21-24 | Repository deep note (`cultural`) | Repository |
| Genesis 15:1; Luke 12:15; Matthew 6:24; 1 Timothy 6:10 | 21-24 | BSB | Repository |

Cut: the Elamite power in the early second millennium; the Amorite
meaning of ‘masters of a covenant’; Melchizedek as a pre-incarnate
appearance attributed to named writers (kept as "some Christians").

## The plain notes on Genesis 15 (2026-11-19)

`client/public/bible/notes/genesis/plain/15.json`. Two web searches for
this chapter, with the book page's rows and the genocide Honest Answer.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| ‘Shield’ used of kings as protectors; 15:1 can be read ‘your reward will be very great’ | 1-6 | Repository deep note (`cultural`, `text`); Psalm 3:3 | Repository |
| A childless man's heir could be a servant | 1-6 | Repository deep note; BSB 15:2-3 | Repository; the Nuzi adoption parallel not used (book page caution) |
| Romans 4:3, 4:5, 4:10-11, 4:20; Galatians 3:6; James 2:21-24; Hebrews 11:12 | 1-6 | BSB | Repository |
| Protestant reading of ‘credited’ (Luther, Calvin: a righteousness not one's own, put to the believer's account); Catholic teaching at Trent, 1547 (God who reckons righteous also makes righteous); Catholic writers on ‘reckoned’ not ruling out real renewal; Paul and James on first counting and later showing | 1-6 | Repository deep note (`hard`); Trent's decree as summarised | Search: catholic.com "Righteous or reckoned"; ligonier.org "What does the Roman Catholic Church believe about justification"; samstorms.org. Stated as both views, no side |
| Cutting a covenant (karat berit); the self-curse; Jeremiah 34:18 | 7-11, 17-21 | Book page row; BSB | Repository |
| Sefire treaty, 700s BC: as the calf is cut up, so Matti'el and his nobles shall be cut up | 7-11 | Sefire inscription as quoted | Search: rsc.byu.edu "Cutting Covenants". Paraphrased. **Cut:** the Ashur-nirari V lamb's head (not confirmed: the source has a spring lamb in a different curse); the Mari donkey (book page: not found) |
| The animals later accepted for sacrifice; the birds left whole | 7-11 | Repository deep note | Repository |
| Judges 6:36-40; John 20:27 | 7-11 | BSB | Repository |
| 400 years, the fourth generation, 430 years (Exodus 12:40-41); Galatians 3:17; ‘generation’ as lifetime; ancient readers counted differently | 12-16 | BSB; repository deep note (`historical`) | Repository |
| Amorites standing for the peoples of Canaan | 12-16 | Repository deep note | Repository |
| "The judgment is described as late. Long before, God told Abraham his descendants would wait, “for the iniquity of the Amorites is not yet complete” (Genesis 15:16)." and "On the Bible's own account, the peoples of Canaan were given generations." | 12-16 | Honest Answer and essay "Did God command genocide" | Repository (copied word for word) |
| Deuteronomy 9:5; Leviticus 18:24-28; Joshua 6:25; 2 Peter 3:9 | 12-16 | BSB | Repository |
| Fire as God's presence (Exodus 3:2; 13:21; 19:18); God alone passes; borders reached under Solomon (1 Kings 4:21); Hebrews 6:13, 6:18; Galatians 3:13 as a Christian reading, said so | 17-21 | Book page; repository deep note; BSB | Repository |

Cut: "usually the weaker party walked between the pieces" (deep note, not
checked); von Rad's priestly-declaration reading; Rashi's and the
Septuagint's ways of counting the years (said only "ancient readers counted
these years in different ways").

## The plain notes on Genesis 16 (2026-11-19)

`client/public/bible/notes/genesis/plain/16.json`. Three web searches for
this chapter, with the book page's rows (Hammurabi 144 to 147; the Nuzi
caution) and the site's safety wording.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Laws of Hammurabi (about 1754 BC) 144-147: a wife who could not bear children gives a slave; the slave mother who claims equality may be put back among the slaves but not sold | 1-6 | Book page row | Earlier search (palmerseminary.edu; UCL). The page says "a wife who could not bear children" as the book page does ("not allowed to bear children") and calls the parallel "real but not exact" |
| Nuzi used with caution | 1-6 | Book page row | Earlier search |
| A slave's child counted as the wife's; ‘build’ and ‘son’ wordplay | 1-6 | Repository deep note (`cultural`) | Repository |
| Abram and Sarai never say Hagar's name; the angel does (16:2, 5, 6, 8) | 1-6, 7-12 | BSB | Repository (read) |
| 3:17 ‘listened to the voice of’; Galatians 4:22, 24, 26; Deuteronomy 23:15; Exodus 3:7; Romans 9:4; 11:1; Genesis 17:20; 21:17-20; 24:62; 25:9, 11; Psalm 139:1 | all | BSB | Repository |
| Shur on the road to Egypt; the onager untamed (Job 39:5-8); the image as freedom from slavery | 7-12 | Repository deep note | Repository |
| Readings of "return and submit" (survival of a pregnant woman; temporary; joined to promises) | 7-12 | Repository deep note (`hard`) | Repository; stated as readings |
| Delores S. Williams, Sisters in the Wilderness (Orbis, 1993): Hagar's story as God helping the oppressed survive and gain quality of life, survival rather than liberation | 7-12 | Williams | Search: ncronline.org "Sisters in the Wilderness after 30 years"; goodreads; aaihs.org. Paraphrased |
| Safety line, word for word from the Mark 10:1-12 note: "Nothing in this passage asks anyone to stay where they or their children are in danger. If you are in an abusive marriage, seek safety first. Talk to a pastor or a counselor you trust, or call a local domestic violence line. These notes are not legal advice." | 7-12 | Site | Repository (grep -F: one match in each file) |
| El Roi only in 16:13; Hagar one of very few, and by many readers' count the only person, to give God a name; the second half of 16:13 hard to translate | 13-16 | Repository verse note; El Roi summaries | Search: en.wikipedia.org "El Roi"; sermons.logos.com (the "no other character" claim). Stated as "one of very few ... many readers say she is the only one", agreeing with the verse note |
| Beer-lahai-roi "usually explained as" the well of the Living One who sees me | 13-16 | Standard rendering | Hedged |
| Muslims honor Hagar and Ishmael; Ismail a prophet and remembered as ancestor of the Arabs and of Muhammad; the Qur'an does not name Hagar; tradition (al-Bukhari) of her running between Safa and Marwa for water; Zamzam; pilgrims walk between the hills (sa'i) | 13-16 | Islamic tradition as summarised | Search: en.wikipedia.org "Hagar in Islam"; islamqa.info 11069; madainproject.com "Safa and Marwah". Paraphrased, no Qur'an quotation |

Cut: the Old Assyrian marriage contract (deep note, not checked); the
proposed correction to the Hebrew of 16:13; the angel as the Son before
his birth (not needed here).

## The plain notes on Genesis 17 (2026-11-19)

`client/public/bible/notes/genesis/plain/17.json`. Two web searches for
this chapter.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| El Shaddai with promises of fruitfulness (28:3; 35:11); meaning uncertain | 1-8 | BSB; standard lexicons as the deep note has it | Repository; "not certain" |
| Renaming as authority (41:45; Daniel 1:7); Abram ‘exalted father’ (usually understood); Abraham explained by a play on ‘father of a multitude’; Sarai and Sarah both ‘princess’ | 1-8, 15-22 | Repository deep note (`cultural`); BSB | Repository |
| Romans 4:11, 4:17, 4:19; Jeremiah 31:33-34; Revelation 21:3; Matthew 1:1 | all | BSB | Repository |
| Ankhmahor's tomb at Saqqara (vizier under Teti, about 2345-2333 BC): the oldest known depiction of circumcision, done to a youth | 9-14 | Biblical Archaeology Society; JTA; egypt-museum.com | Search. The page says "from the 2300s BC" |
| Jeremiah 9:25-26 names Egypt, Edom, Ammon, Moab | 9-14 | BSB | Repository |
| Elsewhere often linked to growing up; Israel on the eighth day; servants included; ‘cut’ and ‘cut off’ | 9-14 | Repository deep note; the Saqqara scene; BSB | Repository; "seems to have marked growing up" |
| Jewish families keep circumcision on the eighth day today (brit milah) | 9-14 | Common knowledge; Jewish Encyclopedia "Berit Milah" | Search result (jewishencyclopedia.com) |
| Leviticus 12:3; Deuteronomy 10:16; 30:6; Romans 2:29; Luke 2:21; Acts 15; Galatians 5:6 | 9-14 | BSB | Repository |
| Infant and believer baptism: traditions named and their texts (Colossians 2:11-12; Acts 2:39; 16:15, 33; Jeremiah 31:34; Romans 4) | 9-14 | Repository deep note (`hard`); BSB | Repository; no side |
| Isaac ‘he laughs’; 21:6; 25:16 twelve princes; Hebrews 11:11 | 15-22 | Hebrew; BSB | Repository |
| Josephus, Antiquities 1.12.2 (1.214): the Arabs circumcise after the thirteenth year because Ishmael was | 23-27 | Josephus (Whiston) | Search: lexundria.com j_aj 1.214-1.221; jewishencyclopedia.com "Circumcision". Paraphrased |

Cut: the deep note's "around 2300 BC" (sources give the 2340s; the page
says "the 2300s"); Philistines as uncircumcised (true in the Bible but not
needed).

## The plain notes on Genesis 18 (2026-11-19)

`client/public/bible/notes/genesis/plain/18.json`. Two web searches for
this chapter, with the site's hospitality guide, the Luke 1 note and the
Honest Answers.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Hospitality: the stranger's danger; water, food, shelter, protection at the host's cost; honor; promise little, give much; three seahs; the host stands by like a servant | 1-8 | Site guide hospitality-and-the-stranger; repository deep note (`cultural`) | Repository |
| The text's shifts: the LORD (18:1, 10, 13), three men (18:2), two go on (18:22), two angels (19:1) | 1-8 | BSB | Repository (read) |
| Mamre at Ramat el-Khalil north of Hebron: a Herodian enclosure; a church built by Constantine (about AD 325, Eusebius) | 1-8 | Excavation (Mader 1926-28) and Eusebius as summarised | Search: en.wikipedia.org "Mamre"; encyclopedia.com "Mamre"; dig.corps-cmhl.huji.ac.il. The page says "the 300s AD" and "the traditional site" |
| Rublev's Trinity icon, early fifteenth century (dated variously 1408 to 1427), also called the Hospitality of Abraham | 1-8 | Art history | Search: en.wikipedia.org "Trinity (Andrei Rublev)"; newworldencyclopedia.org. The page says "early fifteenth century" |
| Readings of the three (the LORD with two angels; a hint of the Trinity; an appearance of the Son); the New Testament does not use the story for the Trinity | 1-8 | Repository deep note (`christ`) | Repository; no side |
| Hebrews 13:2; Matthew 25:35; Luke 1:37; Jeremiah 32:17; Hebrews 11:11; 21:6 | 1-15 | BSB | Repository. Luke 1:37 as an echo "many readers hear" (the deep note's Greek-translation link not repeated) |
| Care line, word for word from the Luke 1:5-17 note: "Many faithful people long for children and never have them, or lose them before birth." and "Childlessness is not a judgment from God, and it does not measure your faith. Your longing is seen. If the grief is heavy, please share it with someone you trust: a friend, a pastor, a counsellor." | 9-15 | Site | Repository (grep -F: one match in each file) |
| ‘Outcry’ the cry of the wronged; ‘go down to see’ as a fair judge (11:5) | 16-21 | Repository deep note (`hard`) | Repository |
| Ezekiel 16:49; James 2:23; John 15:15 | 16-21 | BSB | Repository |
| "God did not rebuke the question. He let Abraham press it again and again." | 22-33 | Honest Answer (answers.ts), word for word | Repository; the Genesis 18:25 quotation itself is the BSB ("Will not ... do what is right?") |
| Views on whether Abraham changed God's mind | 22-33 | Repository deep note (`hard`) | Repository; no side |
| Exodus 32:14; Ezekiel 22:30; James 5:16; Luke 18:1; Hebrews 7:25; 1 Peter 3:18 | 22-33 | BSB | Repository |

Cut: Sarah hidden because women kept apart from male guests (not
checked); "the first long prayer in the Bible" (said "one of the first");
any comparison with market bargaining.

## The plain notes on Genesis 19 (2026-11-19)

`client/public/bible/notes/genesis/plain/19.json`. Four web searches for
this chapter, with the book page, the deep note and verse notes, and the
Genesis 12 plain note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The two angels are two of the three visitors (18:22); ‘angel’ means messenger | 1-3 | BSB; repository verse note (19:1) | Repository |
| The gate: elders, trade, cases (Ruth 4:1-2); Lot's standing; 13:12; 14:12; bread without yeast as bread made in haste | 1-3 | Repository deep note (`cultural`) and verse notes (19:1, 3); BSB | Repository |
| Hebrews 13:2; Judges 19:15, 22-24, 25-27 | 1-11 | BSB | Repository |
| ‘Know’ (yada) sexual in Genesis (4:1) and in 19:8; the demand is gang rape | 4-11 | Repository verse note (19:5, 8) | Repository |
| Host's duty to protect a guest; ‘my brothers’; the foreigner taunt; the door motif | 4-11 | Repository deep note (`cultural`) and verse notes (19:6-7, 9) | Repository |
| Ezekiel 16:49-50; Isaiah 1:9-10, 17; Jude 7; Matthew 10:14-15; 11:23-24; Luke 17:28-33; 2 Peter 2:6-9; Deuteronomy 29:23; Amos 4:11; Zechariah 3:2 | 4-29 | BSB | Repository |
| The Talmud (Sanhedrin 109) remembers Sodom chiefly as shutting out strangers and punishing kindness to the poor | 4-11 | Babylonian Talmud as summarised | Search: reformjudaism.org "Judge a Society by Its Hospitality"; etzion.org.il "Order, Compassion and Moral Society"; truah.org (Polsky). Paraphrased; no story from it retold |
| Two Christian readings of the sexual element (traditional: same-sex element condemned with the violence, Jude 7, Leviticus 18:22; other: violent inhospitality the whole point); Jude's ‘strange flesh’ = Greek ‘other flesh’, read by some as angels | 4-11 | Repository verse note (19:5, `theology`); NET Bible note on Jude 7; commentaries | Search: biblia.com NET note Jude 7; biblehub.com commentaries on Jude 1:7. No side taken |
| Lot's offer reported without approval; 2 Peter 2:7 ‘righteous’; saved by mercy | 4-11 | Repository deep note (`hard`, `cultural`) | Repository |
| Care line "What was done to you was wrong, and it was not your fault." | 4-11; 30-38 | Genesis 12 plain note, word for word | Repository (grep -F) |
| Sons-in-law: ‘pledged’ or already married (two readings); ‘joking’ from tsachaq, Isaac's root; ‘lingered’ suggests dithering; compassion (chemlah) as pity; Zoar and ‘small’; ‘I cannot do anything’ | 12-22 | Repository verse notes (19:14, 16, 21-22) and deep note (`words`) | Repository |
| Sodom in the Jordan plain; salt, bitumen, sulfur; tar pits (14:10); site not known, south or north proposed; natural-cause suggestions | 23-29 | Book page map line; repository deep note (`historical`); earlier ledger rows (book page) | Repository; earlier search |
| A salt pillar on Mount Sodom nicknamed ‘Lot's wife’, a later name, not evidence | 23-29 | Deep note; Wikipedia "Mount Sodom"; biblewalks.com | Search |
| ‘Overthrow’ (haphak) the key verb; ‘from behind him’ and the command's verb; ‘God remembered’ as in 8:1 | 23-29 | Repository verse notes (19:26, 29) and deep note (`words`) | Repository |
| Honest Answer "Did God command genocide in the Old Testament?" named | 23-29 | answers.ts | Repository |
| Moab sounds like ‘from father’; Ben-ammi ‘son of my kin’; ‘of today’; Noah's drunkenness echo (9:20-27); the daughters' possible belief | 30-38 | Repository verse notes (19:31-32, 36-38) and deep note (`literary`) | Repository |
| Mesha Stele: a king of Moab's inscription, about 840 BC (some say 850), naming wars with Israel; 2 Kings 3:4-5 | 30-38 | Mesha Stele | Search: cojs.org "Moabite Stone, c. 840 BCE"; newworldencyclopedia.org; Wikipedia. The page says "from about the middle of the 800s BC" |
| Leviticus 18:6; Deuteronomy 2:9, 19; 23:3-4; Ruth 1:4; 4:17; Matthew 1:5; 1 Kings 14:21 | 30-38 | BSB | Repository |

Cut: Josephus seeing the pillar (not checked); Tall el-Hammam and Bab
edh-Dhra by name (the book page's wording used instead); the Talmud's
stories (the bed, the marked coins, Pelotit), not retold; Wisdom of
Solomon 19; the mid-twentieth-century ‘get acquainted’ reading of yada
and its author; any claim that the story was told to mock Moab.

## The plain notes on Genesis 20 (2026-11-19)

`client/public/bible/notes/genesis/plain/20.json`. One web search for this
chapter, with the deep note and the Genesis 12 plain note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Gerar in the western Negev between Gaza and Beersheba; many place it at Tel Haror, not all agree | 1-7 | Repository deep note (`historical`); Aharoni's 1956 proposal and other candidates (Tell Jemmeh, Tell esh-Sharia) | Search: en.wikipedia.org "Tel Haror", "Nahal Gerar"; biblewalks.com. Said "many ... though not all agree" |
| Abimelech ‘my father is king’, perhaps a royal title | 1-7 | Repository deep note | Repository; "may have been" |
| No mention of Sarah's beauty; she is about ninety (17:17); a marriage tie with a rich herder as a likely motive | 1-7 | Repository deep note (`cultural`, `hard`) | Repository; "many readers think" |
| ‘Prophet’ (navi, H5030): first use in the Bible at 20:7 | 1-7 | Strong's numbers in the repository | Script over `client/public/bible/ch/*/` (first hit: Genesis 20:7) |
| Prophet as one who prays for others: 1 Samuel 12:23; Jeremiah 42:2; Psalm 105:14-15; Genesis 26:7 | 1-7 | BSB | Repository |
| The three similar stories: versions of one tale, or a deliberate pattern | 1-7 | Repository deep note (`literary`, `hard`) | Repository; no side |
| ‘Fear of God’; the servants terrified; Abimelech's conscience; a newcomer's danger | 8-13 | Repository deep note (`cultural`, `words`) | Repository |
| Half-sister marriage known in the ancient world; forbidden in Leviticus 18:9, 11 | 8-13 | Repository deep note (`historical`); BSB | Repository |
| ‘Loyalty’ in 20:13 is chesed (H2617), used elsewhere of faithful love | 8-13 | Strong's numbers in the repository | Script (20:13 carries H2617A) |
| Proverbs 9:10; Job 1:1 (Uz; never said to be an Israelite) | 8-13 | BSB | Repository |
| Thousand pieces of silver; ‘covering of the eyes’ debated, most read as clearing Sarah's name | 14-18 | Repository deep note (`cultural`) | Repository; "debated", "most take it" |
| James 5:16-17; Genesis 21:1 | 14-18 | BSB | Repository |

Cut: the Psalm 34 heading and Achish (not needed); Sarah's body renewed for
childbearing (the deep note says the text does not say so).

## The plain notes on Genesis 21 (2026-11-19)

`client/public/bible/notes/genesis/plain/21.json`. Four web searches for
this chapter, with the deep note, the Genesis 16 plain note and its ledger
rows.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Twenty-five years from 12:4 to 21:5; ‘attended to’ (paqad) and 50:24; Isaac ‘he laughs’; 17:17; 18:12; circumcision on the eighth day (17:12) | 1-7 | BSB; repository deep note (`words`) | Repository |
| Luke 1:37; Psalm 126:2; Galatians 4:28 | 1-7 | BSB | Repository |
| Care line, word for word from the Genesis 18 plain note (itself from Luke 1), opening adapted "A word of care. Sarah's story ends in joy, with a son in her old age." | 1-7 | Site | Repository (grep -F) |
| Weaning at two or three years; 2 Maccabees 7:27 (three years); a feast at weaning | 8-13 | Encyclopedia of the Bible "Wean"; Reformation Study Bible note on 1 Samuel 1:22; 2 Maccabees 7:27 | Search: biblegateway.com resources; biblehub.com catholic 2 Maccabees 7:27. Paraphrased |
| Ishmael thirteen at circumcision (17:25), about sixteen at the weaning | 8-13 | BSB arithmetic (17:24-25; 21:5) | Repository |
| ‘Mocking’ from tsachaq (Isaac's root), read as mocking or playing | 8-13 | Repository deep note (`literary`) | Repository; two readings, no side |
| Laws of Hammurabi 170-171: acknowledged sons of a slave woman share the inheritance; if not acknowledged, after the father's death the woman and children go free | 8-13 | Repository deep note (`cultural`); secondary summaries | Search: Wikipedia "Babylonian law"; historyrise.com; Avalon Project named as the full text (not opened). Said "The parallel is not exact"; the freedom point said as "some readers point out ... That may be so" |
| Galatians 4:30; Romans 9:7; Hebrews 11:18; the Galatians picture pointed back to the 16:13-16 note | 8-13 | BSB; site | Repository |
| A skin of water; Ishmael's age and verse 14 (two readings); ‘boy’ a wide range; Ishmael ‘God hears’ (16:11); echo of chapter 16 and of chapter 22 (22:3, 11); Paran in north-eastern Sinai | 14-21 | Repository deep note (`hard`, `literary`, `historical`); BSB | Repository |
| Psalm 34:6; Genesis 25:9, 16 | 14-21 | BSB | Repository |
| Muslim tradition: Abraham brings Hajar and Ismail to the valley of Mecca; in al-Bukhari's account (Prophets, the Ibn Abbas narration) Hajar asks whether God commanded it and, told yes, trusts God will not neglect them; Zamzam | 14-21 | Sahih al-Bukhari 3364-3365 | Search: sunnah.com bukhari 60/38-39 (3364, 3365); islamqa.info 11069. Paraphrased; earlier ledger row (Genesis 16) for Safa, Marwa, Zamzam |
| Care line for a parent or child sent away (new wording; Find Help) | 14-21 | Site | Not a historical claim |
| Beersheba in the northern Negev; wells; seven and oath sound alike; seven lambs as witness; tamarisk; El Olam | 22-34 | Repository deep note (`cultural`, `words`) | Repository |
| Philistines settled on the southern coast in the 1100s BC; three explanations of 21:32-34 | 22-34 | Repository deep note (`historical`); Katzenstein (Anchor Bible Dictionary) and Kitchen as quoted; Finkelstein as quoted | Search: biblearchaeology.org "The Genesis Philistines"; armstronginstitute.org. No side |
| Genesis 26:24-25; Judges 20:1; Isaiah 40:28 | 22-34 | BSB | Repository |

Cut: Tel Beersheba and Aharoni's 1969 dig (not needed); the Minoan graffito
at Gerar (apologetic sources only); a figure for a bowshot; "El Olam found
only here in Genesis" (not checked).

## The plain notes on Genesis 22 (2026-11-19)

`client/public/bible/notes/genesis/plain/22.json`. Six web searches for
this chapter, with the book page, the deep note and its ledger rows.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The narrator says at the start it is a test; the build of the command; lekh-lekha and ‘which I will show you’ as in 12:1; burnt offering wholly burned | 1-2 | Repository deep note (`literary`, `cultural`); BSB | Repository |
| ‘Love’ (ahav, H157): first use in the Bible at 22:2 | 1-2 | Strong's numbers in the repository | Script over `client/public/bible/ch/genesis/` (first hit 22:2) |
| Leviticus 18:21; Deuteronomy 12:31; Jeremiah 7:31 (quoted after its em-dash only); Micah 6:7-8; Exodus 13:13 | 1-2 | BSB | Repository |
| Kant, The Conflict of the Faculties (1798): Abraham should have refused; he could be sure killing his good son was wrong, never sure the voice was God's | 1-2 | Kant, Conflict of the Faculties, Ak. 7:63 as summarised | Search: plato.stanford.edu "Kant's Philosophy of Religion"; philarchive.org PALTPO-30; cambridge.org (Wood's translation). Paraphrased |
| Care line "No one today is told by God to harm a child, or anyone else." with seek help at once, Find Help, local emergency number (no number given) | 1-2 | Site wording, new | Not a historical claim |
| Fire as coals; ‘sacrificial knife’ (BSB); na'ar of Joseph at seventeen (37:2); later tradition's ages for Isaac (not given) | 3-8 | Repository deep note (`cultural`, `historical`); BSB | Repository |
| ‘Provide’ is ra'ah, ‘see’; ‘the two of them walked on together’ around the only recorded conversation | 3-8 | Repository deep note (`literary`) | Repository |
| Hebrews 11:17, 19; John 1:29; John 19:17 (the wood and the cross said to be a later Christian picture, not drawn by the New Testament) | 3-14 | BSB; repository deep note (`christ`) | Repository |
| Akedah from ‘bound’; read on the second day of Rosh Hashanah | 9-14 | Earlier ledger row (book page) | Earlier search |
| Talmud, Rosh Hashanah 16a (Rabbi Abbahu): the ram's horn is sounded so that God will remember the binding of Isaac in the people's favor | 9-14 | Babylonian Talmud | Search: etzion.org.il VBM digest; sefaria.org sheets 129462, 4732. Paraphrased; the Zikhronot prayers not described (not confirmed) |
| 2 Chronicles 3:1; Moriah "usually linked" with Jerusalem; some placed it elsewhere | 9-14 | BSB; book page map line; repository deep note (`historical`) | Repository |
| James 2:21-22; Romans 8:32; John 3:16 | 9-14 | BSB | Repository |
| Rashi (eleventh century) on 22:2, following Genesis Rabbah 56:8: God did not want Isaac slain; ‘bring him up’, then ‘bring him down’ | 9-14 | Rashi | Search: sefaria.org.il Rashi on Genesis 22:2; cojs.org; chabad.org. Paraphrased |
| Kierkegaard, Fear and Trembling (1843, as Johannes de silentio): judged by the ethical alone Abraham is a murderer; faith beyond explaining (the knight of faith understood by no one) | 9-14 | Kierkegaard | Search: edsitement.neh.gov; ebsco.com research starter; sparknotes. Paraphrased; no phrase quoted |
| Qur'an 37:99-111: the dream, the son's consent, the ransom; the son not named; most Muslims hold Ishmael; some early scholars said Isaac; Eid al-Adha | 9-14 | Qur'an; tafsir as summarised | Search: ynetnews.com (Simonsohn); islamreligion.com; religionmediacentre.org.uk; brandeis.edu. Paraphrased |
| God swears by himself, only time in Genesis; last time God speaks to Abraham; gates | 15-19 | Repository deep note (`literary`, `story`) | Repository |
| Hebrews 6:13, 18; Galatians 3:8; Acts 3:25; Romans 9:10 | 15-24 | BSB | Repository |
| Nahor's twelve sons; concubine as a lower-rank wife | 20-24 | BSB; repository deep note (`literary`) | Repository; "usually" |

Cut: Josephus's and Genesis Rabbah's ages for Isaac; Jubilees and the
Samaritan Moreh; the Carthage tophet debate; Auerbach's Mimesis; Moberly;
Levenson; Delaney; Boehm (none checked this run); the Zikhronot and daily
prayer-book readings; ‘teleological suspension of the ethical’ as a quoted
phrase; any first use of substitution.

## The plain notes on Genesis 23 (2026-11-19)

`client/public/bible/notes/genesis/plain/23.json`. Two web searches for
this chapter, with the deep note and the Genesis 5 and 12 plain notes.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Sarah 127; Isaac about thirty-seven (17:17 with 23:1); Kiriath-arba ‘town of Arba’ (Joshua 14:15); Mamre (13:18) | 1-2 | BSB arithmetic | Repository |
| John 11:35; 1 Thessalonians 4:13; Isaiah 51:2; 1 Peter 3:5-6; Hebrews 11:11 | 1-2 | BSB | Repository |
| Grief care line, adapted from the Genesis 5 and Matthew 2 plain notes (friend, pastor, grief counsellor; crisis line or emergency service; Find Help) | 1-2 | Site | Repository |
| Ger as resident alien without the right to own land; the gate as the place of witnessed business; Ephron's gift as a polite opening; full price; silver weighed; ‘bury my dead’ refrain | 3-16 | Repository deep note (`cultural`, `literary`, `words`) | Repository; "often", "many readers think" |
| Biblical Hittites: the Anatolian empire far north; Heth among Canaan's descendants (10:15); Ephron and Zohar Semitic names; many take the Hebron group as local, others see a link; uncertain | 3-16 | Repository deep note (`historical`) | Search: en.wikipedia.org "Biblical Hittites" (Speiser cited); biblearchaeology.org "Hittites and Hethites". Said "It is not certain" |
| Leviticus 25:23; Psalm 39:12; 1 Peter 2:11; Hebrews 11:13, 16; Jeremiah 32:9 | 3-20 | BSB | Repository |
| ‘Possession’ (achuzzah) and 17:8; the only land Abraham owns; the family grave (25:9; 49:29-31; 50:13); land promise pointed back to the 12:4-9 note | 17-20 | Repository deep note (`literary`, `story`, `words`); BSB | Repository |
| Cave of the Patriarchs: Herodian enclosure (first century BC) still standing; Byzantine church; later the Ibrahimi Mosque; honored by Jews, Christians and Muslims; al-Haram al-Ibrahimi | 17-20 | Site history | Search: en.wikipedia.org "Cave of the Patriarchs"; madainproject.com; jewishvirtuallibrary.org. No modern dispute described |
| Acts 7:5, 16 with Genesis 33:19 (Stephen's summary) | 17-20 | BSB; repository deep note (`hard`) | Repository; "many readers think" |
| Matthew 22:32 | 17-20 | BSB | Repository |

Cut: the silver's weight in kilograms; Lehmann (1953) and Tucker (1966) on
the sale's legal form; ‘the only woman in Genesis whose age at death is
recorded’ (not checked); "al-Khalil" as ‘the friend’ (not confirmed); loud
public mourning customs; Hebron's distance from Jerusalem.

## The plain notes on Genesis 24 (2026-11-19)

`client/public/bible/notes/genesis/plain/24.json`. One web search for this
chapter, with the book page, the deep note and verse notes.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The servant never named; Eliezer (15:2) "some readers think" | 1-9 | BSB | Repository |
| Hand under the thigh usually understood as touching the place of offspring; 47:29 | 1-9 | Repository deep note (`cultural`) | Repository; "usually understood" |
| Why not a Canaanite wife; 26:34-35; Deuteronomy 7:3-4; 2 Corinthians 6:14 | 1-9 | Repository deep note (`cultural`); BSB | Repository |
| Aram-naharaim ‘Aram of the two rivers’ near Haran | 10-27 | Repository deep note (`historical`) | Repository |
| Wells as meeting places; evening water-drawing by women (24:11); camels drink much, jars drawn by hand; the sign tests character | 10-27 | Repository deep note (`cultural`, `hard`); BSB | Repository |
| Camels: the book page's paragraph on the 2013 Tel Aviv study, word for word | 10-27 | Site book page | Repository (grep -F); earlier search |
| Robert Alter, The Art of Biblical Narrative (1981): the betrothal ‘type-scene’ at a well (Genesis 24, 29, Exodus 2) | 10-27 | Alter, as summarised | Search: sefaria.org sheets 444704, 528154; thecriticalbible.blogspot.com. The term only; nothing quoted |
| Genesis 29:9-11; Exodus 2:15-17; John 4:6-7; Psalm 37:5; James 1:5; Deuteronomy 6:16 | 10-27 | BSB | Repository |
| Guidance by signs: two views and the middle path (Scripture, prayer, wisdom, counsel); not a method for finding a spouse | 10-27 | Repository deep note (`hard`) | Repository; new sentence on spouses is not a historical claim |
| Laban's eyes on the gold and his later cheating of Jacob (29 to 31); the servant's careful retelling | 28-49 | Repository deep note (`literary`); BSB | Repository |
| ‘Kindness and faithfulness’ (chesed and emet); Exodus 34:6; John 1:14 | 28-49 | BSB | Repository |
| Marriages arranged by families; gifts with betrothal; Laban's leading part | 50-61 | Repository deep note (`cultural`) | Repository. No ancient law cited |
| ‘I will go’ is one Hebrew word (elekh); two readings of what she was asked | 50-61 | Hebrew text in the repository | Script (24:58 ends with one word) ; readings stated without a side |
| 22:17 echoed in 24:60; Matthew 1:2; Ruth 1:16 | 50-61 | BSB | Repository |
| Beer-lahai-roi (16:13-14); ‘meditate’ uncertain; veil as a bride's sign | 62-67 | Repository deep note and verse notes | Repository; "not certain" |
| ‘Love’ (H157): second use in the Bible at 24:67, after 22:2 | 62-67 | Strong's numbers in the repository | Script |
| Isaac forty at marriage (25:20), Sarah dead three years (23:1 with 17:17) | 62-67 | BSB arithmetic | Repository |
| Ephesians 5:25; Revelation 19:7; the servant as the Spirit, an allegory not in the text | 62-67 | BSB; repository deep note (`christ`) | Repository |

Cut: Nahur in the Mari texts; the weight of the gold; "eating a host's
food bound a guest" (not checked); "as brothers often did" (narrowed to
Laban's part in this story). The brief named "the women guide's wording"
on arranged marriage; no such sentence was found in the women guide
(`women-in-the-ancient-world`) or elsewhere on the site, so the wording
here is new and rests on the deep note.

## The plain notes on Genesis 25 (2026-11-19)

`client/public/bible/notes/genesis/plain/25.json`. One web search for this
chapter, with the deep note, the Honest Answer on election and the Luke 1
plain note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Keturah a wife here, a concubine in 1 Chronicles 1:32; her sons' names linked with Arabian peoples; Midian and Exodus 2:15-21 | 1-11 | BSB; repository deep note (`historical`, `cultural`) | Repository |
| Gifts and sending away so Isaac alone inherits; 15:15 kept; ‘gathered to his people’ before burial ("many readers note") | 1-11 | Repository deep note; BSB | Repository |
| Abraham lived until the twins were fifteen (21:5; 25:7, 26) | 1-11 | BSB arithmetic; deep note | Repository |
| Matthew 22:32; Hebrews 11:13 | 1-11 | BSB | Repository |
| Care line for family hurts at a funeral (new wording; friend, pastor, counsellor) | 1-11 | Site | Not a historical claim |
| Toledot heading; the twelve princes fulfil 17:20; Isaiah 60:7; Genesis 36 | 12-18 | BSB; repository deep note (`literary`) | Repository |
| Kedar (Qedar) and Nebaioth named in Assyrian records of the 700s and 600s BC (tribute to Tiglath-pileser III, 737 BC; Ashurbanipal's campaigns); Tema and Dumah usually linked with Tayma and Dumat al-Jandal; the link with Ishmaelites debated (Eph'al) | 12-18 | Assyrian records as summarised | Search: livius.org "Qedar", "Duma"; en.wikipedia.org "Qedar". Said "discussed by scholars, and not everyone agrees" |
| 25:18 ‘in the face of’, translated near, over against or in hostility; not a judgment on any people | 12-18 | Hebrew; English versions | Repository Hebrew; the Genesis 16 note's line on Arabs followed |
| Isaac forty at marriage, sixty at the twins (twenty years); Rebekah asks and God answers her; the oracle a four-line poem; Edom/red, Seir/hairy, Jacob/heel (27:36) | 19-26 | BSB; repository deep note (`cultural`, `literary`) | Repository |
| Romans 9:11-13; Malachi 1:2-3; Genesis 29:30-31; Luke 14:26; Deuteronomy 23:7 | 19-26 | BSB | Repository |
| Election: the Reformed (Augustine, Calvin) and Arminian/Wesleyan readings; corporate and individual readings on both sides; ‘love’ and ‘hate’ as choosing; Malachi as covenant language about nations | 19-26 | Honest Answer "Does God choose us, or do we choose him?" (answers.ts); repository deep note (`hard`) | Repository; no side |
| Care lines, word for word from the Luke 1 plain note: "This story ends in joy for one couple. It does not promise a child to every couple who prays for one. Many faithful people long for children and never have them, or lose them before birth." and "Childlessness is not a judgment from God, and it does not measure your faith. Your longing is seen. If the grief is heavy, please share it with someone you trust: a friend, a pastor, a counsellor." | 19-26 | Site | Repository (grep -F, one match in each file) |
| Birthright: double share and leadership (Deuteronomy 21:17); parental favorites; ‘the red, the red’; despised | 27-34 | Repository deep note (`cultural`, `literary`); BSB | Repository |
| Hebrews 12:16-17; Deuteronomy 2:5; Genesis 33:4 | 27-34 | BSB | Repository |

Cut: the Nuzi tablet of a brother selling his inheritance share for sheep
(the book page's Nuzi caution); the Mari and other Arabian identifications
beyond Kedar, Nebaioth, Tema and Dumah; Sheba and Dedan as caravan
peoples; lentils described.

## The plain notes on Genesis 26 (2026-11-19)

`client/public/bible/notes/genesis/plain/26.json`. One web search for this
chapter, with the deep note, the verse notes, and the Genesis 20 and 21 plain
notes and their ledger rows.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Famine and Egypt's Nile; Isaac never leaves the land; ‘stay as a foreigner’ (gur); the chapter echoes Abraham's life | 1-6 | Repository deep note (`historical`, `literary`); verse notes 2-3 | Repository |
| Abimelech possibly a royal title (Genesis 20 plain note wording) | 1-6 | Site | Repository |
| Philistines paragraph, word for word from the Genesis 21 plain note | 1-6 | Site; earlier ledger row (Genesis 21, 22-34) | Repository (grep -F) |
| Mishnah Kiddushin 4:14 cites Genesis 26:5 to say Abraham kept the whole law before it was given; Mishnah written down around AD 200 | 1-6 | Mishnah Kiddushin 4:14; earlier ledger row on the Mishnah's date | Search: steinsaltz-center.org; thetorah.com "Abraham is not a Jew"; sefaria.org sheets. Paraphrased |
| Three readings of 26:5 (broad; Jewish literal; later editor shaped by Deuteronomy) | 1-6 | Repository deep note (`hard`) | Repository; no side |
| Galatians 3:8, 17; Hebrews 11:9; James 2:22; Genesis 28:15; Matthew 28:20 | 1-6 | BSB | Repository |
| Three wife-sister stories pointed back to the Genesis 20 note | 7-11 | Site | Repository |
| Rebekah the granddaughter of Nahor (24:15), not a half-sister | 7-11 | BSB | Repository |
| ‘Caressing’ from tsachaq, the root of Isaac's name | 7-11 | Repository deep note (`words` H6711) | Repository |
| Psalm 105:14; Exodus 34:7 (paraphrase); Ezekiel 18:14-17; 1 Peter 3:7 | 7-11 | BSB | Repository |
| Care line "What was done to you was wrong, and it was not your fault" and Find Help, from the Genesis 12 and 19 plain notes | 7-11 | Site | Repository |
| Herders sowing where rain allowed; wells as life and claim; filling wells as hostility; Esek, Sitnah, Rehoboth meanings; rachav and Psalm 4:1 | 12-22 | Repository deep note (`historical`, `cultural`, `words`) | Repository |
| Matthew 13:8 (quoted only after its em-dash); Matthew 5:5; Romans 12:18 | 12-22 | BSB | Repository |
| Treaty forms as in chapter 21; shared meal sealed it; Shibah, oath and seven sound alike | 23-33 | Repository deep note (`cultural`); Genesis 21 ledger | Repository |
| Two accounts of Beersheba's name (21:31, 26:33): two readings | 23-33 | BSB | Repository; no side |
| Matthew 5:9; Proverbs 16:7 (paraphrase); Judges 20:1; Exodus 3:6; Matthew 22:32 | 23-33 | BSB | Repository |
| Esau married at forty like Isaac (25:20); 24:3; ‘grief’ as bitterness of spirit | 34-35 | BSB; standard lexicons | Repository |
| Hittites: the Genesis 23 plain note's wording ("Many scholars think ... a local people with a similar name") | 34-35 | Site | Repository |

Cut: "the Hittites of Genesis have Hebrew-sounding names" (not checked).

## The plain notes on Genesis 27 (2026-11-19)

`client/public/bible/notes/genesis/plain/27.json`. Two web searches for this
chapter, with the deep note, the verse notes, and the Genesis 25 plain note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Isaac lived to 180 and both sons buried him (35:28-29); the hurry rests on a fear; ‘tasty dish’ repeated; appetite (25:28) | 1-4 | BSB; repository deep note (`historical`); verse notes 1-2, 3-4 | Repository |
| Genesis 49:1-28; Deuteronomy 33:1; Hebrews 11:20 | 1-4 | BSB | Repository |
| Rebekah adds ‘in the presence of the LORD’ (verse 7); two readings of Rebekah (faith, wrongly carried out; or culpable); ‘obey my voice’ = shema beqoli as in 26:5 | 5-17 | Verse notes 5-7, 8-10; deep note (`hard`) | Repository; no side |
| Taste, touch and smell against hearing | 5-17 | Repository deep note (`cultural`) | Repository |
| Galatians 6:7; 1 Samuel 15:22 (paraphrase) | 5-17 | BSB | Repository |
| Three lies; ‘your God’; dew the only moisture in the dry summer; blessing echoes 12:3 | 18-29 | Verse notes 28-29; deep note | Repository |
| Goat and robe in 37:31; 29:25; Romans 9:11; 50:20 | 18-29 | BSB | Repository |
| Election pointed back to the Genesis 25:19-26 plain note (Reformed, Arminian and Wesleyan), "These notes do not settle it" | 18-29 | Site | Repository |
| Rebekah never seen with Jacob again; only her burial mentioned (49:31) | 18-29, 41-46 | Verse notes 42-45 | Repository |
| Why the blessing could not be withdrawn: the text does not fully explain; two readings (a solemn blessing before the LORD treated as binding; Isaac seeing God's hand) | 30-40 | Commentaries (Constable; Utley) as summarised; deep note (`cultural`) | Search: sermonindex.net Constable and Utley on Genesis 27; uasvbible.org. The Nuzi claim found there was not used (no source given) |
| min ‘of’ or ‘away from’ in 27:39; KJV reads a blessing; BSB and most modern ‘away from’ | 30-40 | Verse notes 39-40 (`text`) | Repository |
| Edom under David (2 Samuel 8:14); revolt under Jehoram (2 Kings 8:20); Deuteronomy 23:7 | 30-40 | BSB | Repository |
| Hebrews 12:16-17 quoted whole; readings: no way to undo it or change his father's mind (ASV ‘no place for a change of mind’); tears of loss, not of turning (2 Corinthians 7:10) | 30-40 | Commentaries in catenabible.com and biblesuite.com; biblestudytools.com ASV | Search: "Hebrews 12:17 no place for repentance". No side |
| John 6:37; Hebrews 4:16; 1 John 1:9; Psalm 27:10 | 30-40 | BSB | Repository |
| Care line for the unfavored child (new wording, ending with the site's "please share it with someone you trust: a friend, a pastor, a counsellor") | 30-40 | Site | Not a historical claim |
| harag as in 4:8; two readings of ‘lose both of you’ (9:6); twenty years (31:38, 41) | 41-46 | Verse notes 41, 42-45; BSB | Repository |
| Obadiah 1:10; Psalm 137:7; Genesis 33:4; 35:29; Ephesians 4:26 | 41-46 | BSB | Repository |

Cut: the Nuzi tablets on spoken blessings (asserted without a source in the
search results); Chrysostom's reading of Hebrews 12:17 (only in a catena);
"dew watered the crops" replaced by the verse note's wording.

## The plain notes on Genesis 28 (2026-11-19)

`client/public/bible/notes/genesis/plain/28.json`. One web search for this
chapter, with the deep note, the Genesis 11, 12 and 14 plain notes and their
ledger rows.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Paddan-aram the region of Haran; Nahor's family (24:10; 25:20); hundreds of miles from Beersheba | 1-5 | Repository deep note (`historical`, which says more than four hundred miles) | Repository; said only as "hundreds of miles" |
| Marrying within the wider family preferred | 1-5 | Repository deep note (`cultural`) | Repository |
| El Shaddai, meaning uncertain (17:1); Genesis 35:11 | 1-5 | Earlier Genesis 17 rows; BSB | Repository |
| Land promise pointed back to the Genesis 12:4-9 note | 1-5 | Site | Repository |
| Genesis 32:10 (only a staff) | 1-5 | BSB | Repository |
| Mahalath, Ishmael's daughter; Basemath in 36:3 taken by many as the same; the lists do not match | 6-9 | BSB | Repository; uncertainty stated |
| sullam occurs only here; linked by many to Akkadian simmiltu, ‘stairway, ramp’; the link doubted by others (Speiser, Hamilton); the Greek Old Testament's klimax can mean ladder or staircase | 10-15 | NET Bible note on 28:12; thetorah.com "Jacob's dream"; b-hebrew list as summarised | Search: "sullam Genesis 28:12 ... simmiltu ziggurat". Stated as debated |
| Ziggurats: stepped towers with a shrine at the top (Genesis 11 plain note wording); the comparison held by some, thought to go too far by others | 10-15 | Site; NET note; Alter's ‘ramp with terraced landings’ as summarised (not named) | Search above; Genesis 11 ledger row |
| Babel understood as Bab-ili ‘gate of the god’ | 10-15 | Genesis 11 plain note and its ledger | Repository |
| John 1:47, 51; Matthew 28:20; Hebrews 13:5; Psalm 139:7 | 10-15 | BSB | Repository |
| Bethel ‘house of God’; Luz; pillar and oil; sacred places; Deuteronomy 16:22; on the ridge road north of Jerusalem; 12:8 | 16-19 | Repository deep note (`historical`, `cultural`) | Repository |
| Jeroboam's calf (1 Kings 12:29); Amos 5:5; Beth-aven (Hosea 4:15); Hosea 12:4; Genesis 35:1 | 16-19 | BSB; deep note | Repository |
| Conditional vows (1 Samuel 1:11); tithe pointed back to the Genesis 14:17-20 note; ‘your God’ (27:20) and ‘my God’ | 20-22 | Deep note (`hard`, `cultural`); BSB | Repository |
| Bargain or faith: both readings; the Hebrew of ‘then the LORD will be my God’ read two ways | 20-22 | Deep note (`hard`) | Repository; no side |
| Genesis 31:13; 35:7; 2 Corinthians 9:7 | 20-22 | BSB | Repository |

Cut: Gezer and Arad standing stones (in the deep note, not needed); Beitin
by name; "more than four hundred miles".

## The plain notes on Genesis 29 (2026-11-19)

`client/public/bible/notes/genesis/plain/29.json`. No new web search for this
chapter: the one for Genesis 26 (Mishnah Kiddushin 4:14) also confirmed the
Nachmanides point below. The deep note and verse notes for the rest.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The well, the stone and the shared custom; well meetings (Genesis 24; Exodus 2) | 1-14 | Repository deep note (`cultural`) | Repository |
| Laban rushed out after seeing the gold (24:29-30); John 4:5-6 | 1-14 | BSB | Repository |
| Bride-price normal; Jacob offers work; 24:53 | 15-20 | Repository deep note (`historical`); BSB | Repository |
| ‘Older’ and ‘younger’ the same words as for Esau and Jacob (27:15) | 15-20 | Verse notes 16-17 | Repository |
| Leah's ‘weak’ eyes: the word can mean tender or soft; uncertain whether a flaw | 15-20 | Standard lexicons (rak) | Stated as uncertain |
| ‘A few days’ in 27:44 and 29:20 | 15-20 | Verse notes 42-45 on chapter 27 | Repository |
| Song of Songs 8:7; 1 Corinthians 13:7 | 15-20 | BSB | Repository |
| ‘Deceived’ echoes 27:35; bekhirah ‘firstborn’; week-long feast (Judges 14:12); mishteh from ‘drink’; bride brought after dark, probably veiled (24:65); Laban's custom not confirmed outside the text | 21-30 | Verse notes 22-24, 26-27; deep note (`cultural`, `literary`) | Repository; "may have been real" |
| Zilpah and Bilhah enslaved women given as wedding gifts, with no say | 21-30 | BSB (29:24, 29); deep note | Repository; plain statement as in the Genesis 16 note |
| Leviticus 18:18; Deuteronomy 21:15-17; Matthew 19:4-5; Galatians 6:7 | 21-30 | BSB | Repository |
| Polygamy: one man and one woman at creation (2:24); every multi-wife household marked by rivalry; most readers: not a model | 21-30 | Repository deep note (`hard`) | Repository; the minority reading stated |
| Nachmanides (Ramban) asked how Jacob could marry two sisters when the law forbids it | 21-30 | Ramban on Genesis 26:5, as reported | Search (Genesis 26): seforimblog / ezrabrand.com "Was Abraham a Lamdan?". Paraphrased, his answer not given |
| ‘Unloved’ is literally ‘hated’, used comparatively (25:19-26 note); God first named at verse 31; Reuben/see, Simeon/heard, Levi/attached, Judah/praise; ‘affliction’ as in 16:11 and Exodus 3:7 | 31-35 | Verse notes 31-35; Genesis 25 plain note | Repository |
| Levi's priests, Judah's David; Matthew 1:2; Revelation 5:5; Genesis 16:13; 1 Corinthians 1:27; Psalm 34:18; Genesis 49:31; 35:19 | 31-35 | BSB; deep note (`christ`) | Repository |
| Care line for anyone unloved (new; ends with the site's "please share it with someone you trust: a friend, a pastor, a counsellor" and Find Help) | 31-35 | Site | Not a historical claim |

Cut: the Mesopotamian dowry documents on slave women (in the verse notes,
not checked here); wine helping the deception (a suggestion only); Leah's
name and ‘wild cow’.

## The plain notes on Genesis 30 (2026-11-19)

`client/public/bible/notes/genesis/plain/30.json`. Two web searches for this
chapter, with the deep note, the verse notes, the Genesis 16, 18, 23 and 25
plain notes.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Childlessness felt as shame; standing, old age and the family name hung on children | 1-8 | Repository deep note (`cultural`); 30:23; Luke 1:25 | Repository |
| Isaac prayed (25:21); Rachel's words echo Sarai's (16:2) | 1-8 | BSB | Repository |
| Bilhah enslaved, given to bear children, no say, named by Rachel; "The Bible does not hide that its great families held slaves and used them. It shows us the harm, so that we can see it." word for word from the Genesis 16 note | 1-8 | Site; deep note ("The servant women had no say in it") | Repository (grep -F) |
| Dan ‘vindicated’, Naphtali ‘wrestling’ | 1-8 | Deep note (`literary`) | Repository |
| Rachel dies bearing her second son (35:16-18) | 1-8 | BSB | Repository |
| 1 Samuel 1:8; Luke 1:25; Jeremiah 31:15; Matthew 2:18 | 1-8 | BSB | Repository |
| Childlessness care lines in the Luke 1 form (as Genesis 25:19-26), opening adapted "Rachel's story ends with a son." | 1-8 | Site (luke/plain/1.json, genesis/plain/25.json) | Repository (grep -F) |
| "If the pain ever feels like more than you can bear, reach out today to a crisis line or emergency service. The Find Help page on this site lists places to turn." word for word from the Genesis 23 note | 1-8 | Site | Repository |
| Honest Answer named: ‘Why didn't the Bible just ban slavery?’ | 1-8 | client/src/data/answers.ts | Repository |
| Gad ‘good fortune’, Asher ‘happy’, Issachar ‘wages’, Zebulun ‘honor/gift’, Joseph ‘taken away’ and ‘add’ | 9-24 | Deep note (`literary`) | Repository |
| Genesis 49:16-21, 28; Revelation 21:12; Exodus 21:7-11 (paraphrased as the BSB reads it) | 9-13 | BSB | Repository |
| Mandrakes: dudaim, Mandragora officinarum; fruit ripening in late spring; believed to stir love and help conception; name sounds like ‘love’ (a pun); poisonous; no good evidence it helps fertility | 14-21 | Deep note (`cultural`); translation notes and botanical summaries | Search: biblehub.com mandrakes pages; tips.translation.bible "mandrake". The Hazor amulet and Assyrian herbal claims not used |
| Song of Songs 7:13; 1 Samuel 1:19 | 14-21 | BSB | Repository |
| ‘Remembered’ = acted for (8:1; Exodus 2:24); Psalm 113:9; Acts 7:9-14 | 22-24 | BSB | Repository |
| Laban's divination (Deuteronomy 18:10 forbids it); 12:3 | 25-36 | BSB | Repository |
| Sheep usually white and goats dark there, so speckled ones few | 25-36 | Older commentaries (Matthew Henry; Keil and Delitzsch as quoted) and a translation note | Search: "Genesis 30:32 sheep usually white goats dark". Said as "Commentators have long noted" |
| Laban ‘white’; livneh ‘poplar’ | 25-43 | Deep note (`literary`) | Repository |
| Genesis 31:7; Leviticus 19:13; James 5:4 | 25-36 | BSB | Repository |
| Peeled branches a folk belief; the text reports and does not say they worked; 31:9-12 credits God; two readings of fairness | 37-43 | Deep note (`hard`); BSB | Repository; no science claim; no side |
| Genesis 28:15; Proverbs 10:22 | 37-43 | BSB | Repository |

Cut: selective breeding as a working method and hidden traits in the parents
(the deep note's suggestion; a science claim the brief excludes); the
Mesopotamian law collections on surrogate wives (pointed to by the Genesis
16 note instead).

## The plain notes on Genesis 31 (2026-11-19)

`client/public/bible/notes/genesis/plain/31.json`. Two web searches for this
chapter, with the deep note, the verse notes and the Genesis book page.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| ‘I will be with you’ (26:3; 28:15; Exodus 3:12; Matthew 28:20); Exodus 3:7 | 1-16 | BSB | Repository |
| Bride payment; the sisters say Laban kept and spent it | 1-16 | BSB (31:15); deep note (`cultural`) | Repository; the deep note's ‘part of its value returned to the daughter’ not used |
| Shearing a busy season | 17-24 | Repository deep note (`cultural`) | Repository |
| Teraphim: household figures of gods, small (31:34) to large (1 Samuel 19:13), used in divination (Ezekiel 21:21; Zechariah 10:2); some scholars think they first stood for ancestors (van der Toorn, as reported) | 17-24 | Encyclopedia of the Bible (Bible Gateway) "Teraphim"; encyclopedia.com; Wikipedia "Teraphim" | Search: "teraphim household gods ... divination". Ancestor view stated as "Some scholars think" |
| Nuzi: the inheritance reading "has not held up, even for the Nuzi texts themselves, and scholars now use the Nuzi parallels with caution" (from the Genesis book page's Nuzi caution); other motives; no choice made | 17-24 | Genesis intro.json `teaching`; deep note (`hard`) | Repository |
| ‘Deceived’ = ‘stole the heart’; ‘steal’ through the chapter; Gilead high wooded country east of the Jordan | 17-24 | Deep note (`literary`, `historical`) | Repository |
| Genesis 35:2, 4; Isaiah 46:7; Zechariah 10:2; Joshua 24:2 | 17-24 | BSB | Repository |
| Jacob's rash oath and Rachel's death (35:16-19): "Some readers hear a shadow"; the text does not link them | 25-35 | Deep note (`literary`) | Repository; stated as a reading |
| Leviticus 15:20; Psalm 115:5; 1 Thessalonians 1:9; Psalm 121:4 | 25-35 | BSB | Repository |
| Herding agreements on losses; Exodus 22:13 | 36-42 | Deep note (`historical`); BSB | Repository; Hammurabi's herding law not used |
| ‘Fear of Isaac’ only in this chapter (31:42, 53); exact sense debated | 36-42 | BSB; verse notes 51-53 | Repository; said as debated |
| ‘Affliction’ (oni) as in 29:32 and Exodus 3:7; John 10:11-12 | 36-42 | Verse notes 41-42; BSB | Repository |
| Jegar-sahadutha Aramaic, Galeed Hebrew, both ‘heap of witness’ | 43-55 | Verse notes 47-48 | Repository |
| Mizpah ‘watchtower’; the words a wary oath between men who distrust each other, not a sentimental blessing; popular use as a parting blessing | 43-55 | Commentaries summarised at biblehub.com and openbible.com on 31:49 | Search: "Mizpah Genesis 31:49 ... distrust". The jewelry use (in the query) was not confirmed and is not mentioned |
| Treaty with oath, sacrifice, meal and witness stones | 43-55 | Deep note (`cultural`) | Repository |
| Gilead fought over by Israel and Aram (1 Kings 22:3); Mizpah of Gilead (Judges 11:29); Laban's plural verb in 31:53 | 43-55 | BSB; verse notes 51-53 | Repository; "seems to think of more than one god" |
| Romans 12:17-18 | 43-55 | BSB | Repository |

Cut: Hammurabi's herding laws (not checked this run); "the God who was
Isaac's dread to his enemies" (not checked).

## The plain notes on Genesis 32 (2026-11-19)

`client/public/bible/notes/genesis/plain/32.json`. Four web searches for this
chapter, with the deep note, the verse notes and the Genesis 12 plain note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Mahanaim ‘two camps’; the word returns in verses 7 and 10; David at Mahanaim (2 Samuel 17:24) | 1-2 | Deep note (`historical`, `literary`); BSB | Repository |
| 2 Kings 6:15-17; Psalm 34:7; Hebrews 1:14 | 1-2 | BSB | Repository |
| ‘My master’ and ‘your servant’ reverse 27:29; Seir south and east of the Dead Sea | 3-8 | Deep note (`cultural`, `historical`) | Repository |
| About four hundred men with David (1 Samuel 22:2); Numbers 20:14-21 | 3-8 | BSB | Repository |
| Kindness and faithfulness (chesed and emet) as in Exodus 34:6; Philippians 4:6; Psalm 34:4 | 9-12 | BSB; standard lexicons | Repository |
| 550 animals; minchah also used of offerings; Proverbs 21:14; ‘face’ repeated in verse 20; ‘appease’ = kipper ‘cover’, later of atonement | 13-21 | Deep note (`cultural`, `literary`) | Repository; count checked by sum of 32:14-15 |
| Genesis 33:10; Matthew 5:23-24 | 13-21 | BSB | Repository |
| Jabbok a river cutting a deep valley to the Jordan; Yaakov/yeaveq/Yabboq; renaming as authority | 22-29 | Deep note (`historical`, `literary`, `cultural`) | Repository |
| Hosea 12:3-4; Genesis 35:10; Judges 13:18 | 22-29 | BSB | Repository |
| Genesis Rabbah 77:3: Esau's guardian angel; Rashi repeats it | 22-29 | Genesis Rabbah 77:3; Rashi on 32:25 | Search: sefaria.org sheets 283350 and 283366; rabbisacks.org. Paraphrased |
| Justin Martyr, Dialogue with Trypho (125-126), second century: the wrestler the Word, the Son, before he became man | 22-29 | Justin | Search: logoslibrary.org trypho 125 and 126; newadvent.org; bkv.unifr.ch. Paraphrased; "in the second century" |
| An older river-spirit tale (some modern scholars) and its critics | 22-29 | Deep note (`hard`) | Repository; stated as a view |
| Israel: Genesis explains by sound ‘struggled with God’; the name may first have meant ‘God strives’ or ‘God rules’ (El rules); root uncertain | 22-29 | NET note on 32:28; Jewish Study Bible as quoted; Wikipedia "Israel (name)"; abarim-publications | Search: "meaning of the name Israel ... debated". Said as uncertain |
| "These notes make no claim about any modern state, border or conflict" word for word from the Genesis 12 note | 22-29 | Site | Repository (grep -F) |
| Peniel/Penuel ‘face of God’; Exodus 33:20; sunset 28:11 and sunrise 32:31 | 30-32 | Deep note (`literary`); BSB | Repository |
| Gid hanasheh: Jewish law still forbids the tendon (usually identified with the sciatic nerve); it is cut out with skill, and in many places the hindquarters are not eaten | 30-32 | Chabad "What Is Gid Hanasheh"; steinsaltz.org Hullin 90; yeshiva.co halakhic overview | Search: "gid hanasheh sciatic nerve ... today" |
| John 1:18; 2 Corinthians 4:6; 12:9; Deuteronomy 4:9 | 30-32 | BSB | Repository |

Cut: the Samael identification (doubtful in the sources); Maimonides on a
prophetic vision (not confirmed by the search); Jabbok as the modern Zarqa
(in the deep note, not needed); Penuel's later history.

## The plain notes on Genesis 33 (2026-11-19)

`client/public/bible/notes/genesis/plain/33.json`. Two web searches for this
chapter, with the deep note and the verse notes.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The order of the family and favoritism | 1-7 | Deep note (`cultural`) | Repository |
| Amarna letters (1300s BC) from rulers in Canaan: the writer falls at the king's feet ‘seven times and seven times’ | 1-7 | Amarna letters EA 286 and others | Search: Wikipedia "Prostration formula"; faculty.uml.edu Amarna translations; Wikipedia EA 286. The comparison with 33:3 is the note's own and said only as the same gesture |
| Esau's change not explained; gifts not yet accepted; God's hand read from 32:11 | 1-7 | Deep note (`doctrines` providence) | Repository; "Many readers" |
| Dots over ‘kissed him’; Genesis Rabbah 78:9: some said insincere (Rabbi Yannai; Pirkei de-Rabbi Eliezer), others that his mercy was stirred and he kissed with all his heart (Rabbi Shimon ben Elazar; Rabbi Shimon bar Yochai in Rashi) | 1-7 | Genesis Rabbah 78:9; Rashi on 33:4 | Search: jtsa.edu "An Infinity of Interpretation"; sefaria.org sheets; aish.com "Just a Kiss". Paraphrased, no names given on the page |
| Luke 15:20 as an echo some readers hear, "an echo of shape, not a quotation" | 1-7 | Deep note (`christ`) | Repository; stated as an echo |
| Genesis 45:15; Proverbs 18:19 | 1-7 | BSB | Repository |
| ‘My lord’ and ‘my brother’; accepting a gift accepts the peace; ‘gift’ in 33:11 is ‘blessing’ (berakah); Peniel echo | 8-11 | Deep note (`cultural`, `literary`) | Repository |
| Matthew 5:24; 2 Corinthians 5:18; Psalm 133:1 | 8-11 | BSB | Repository |
| Seir never visited: two readings (old Jacob; polite speech, true reasons, Seir outside the land, Abraham and Lot) | 12-17 | Deep note (`hard`) | Repository; no side |
| Succoth ‘shelters’, in the Jordan Valley near the Jabbok's mouth | 12-17 | Verse notes 17 | Repository; Tell Deir Alla not named |
| Genesis 35:29; 36:7; Romans 12:18; Hebrews 12:14 | 12-17 | BSB | Repository |
| shalem ‘safely’, ‘whole’; 28:21; Shechem in a pass on the main roads; 12:6-7; qesitah unknown value; El-Elohe-Israel two readings | 18-20 | Verse notes 19-20; deep note (`historical`) | Repository |
| Land promise pointed back to the Genesis 12:4-9 note | 18-20 | Site | Repository |
| Joshua 24:1, 32; John 4:5, 12 | 18-20 | BSB | Repository |

Cut: Tell Balata, Labayu and Shechem's temple (deep note; not needed);
Tell Deir Alla and the Balaam inscription; the Mari ‘killing a donkey’
idiom and Hamor; Shalem read as a place name.

## The plain notes on Genesis 34 (2026-11-19)

`client/public/bible/notes/genesis/plain/34.json`. Two web searches for this
chapter, with the deep note, the verse notes and the Genesis 19 plain note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Dinah the only daughter whose birth is told (30:21); Simeon and Levi her full brothers; ‘went out’ carries no blame | 1-4 | Verse notes 1; BSB | Repository |
| ‘Lay with her by force’ (BSB); a few scholars question whether the Hebrew means rape in the modern sense: Lyn Bechtel, ‘What If Dinah Is Not Raped?’ (JSOT, 1994); most readers read rape | 1-4 | Deep note (`words` H6031B); verse notes 2 | Search: "Genesis 34 Dinah scholars argue not rape anah Bechtel" (lectio.unibe.ch Scholz and Clark; thetorah.com; Wikipedia "Rape in the Hebrew Bible"). One sentence, as a view |
| ‘Defiled’ three times (5, 13, 27); ‘an outrage in Israel’ a phrase for grave sexual crimes | 1-12 | Verse notes 5, 6-7; deep note (`literary`) | Repository |
| Dinah held in Shechem's house during the bargaining (26); mohar a bride-price paid to the bride's family | 5-12 | Verse notes 11-12, 25-26 | Repository |
| 2 Samuel 13:12, 21-22, 29; Deuteronomy 22:26; Proverbs 31:8 | 1-12 | BSB | Repository |
| ‘Deceitfully’ the word of 27:35; circumcision weakens grown men for days; the gate speech adds the motive of gain (23) | 13-24 | Deep note (`cultural`); verse notes 13-14, 20-23 | Repository |
| Jeremiah 9:25; Romans 2:29 | 13-24 | BSB | Repository |
| God not mentioned in the chapter; vengeance multiplies victims | 25-29 | Deep note (`story`, `doctrines`) | Repository |
| Judith 9:2: Judith prays to the God of her ancestor Simeon and praises his sword; Judith about the second century BC; received by Catholics and Orthodox, Apocrypha for Protestants | 25-29 | Judith 9:2; deep note (`hard`) | Search: "Judith 9:2 Simeon sword Shechem" (usccb.org Judith 9; tips.translation.bible; intertextual.bible). Paraphrased |
| Genesis 49:5, 7; Deuteronomy 24:16; Romans 12:19; Genesis 35:5; Psalm 10:14; 34:18 | 25-31 | BSB | Repository |
| Jacob's ‘me, I, my’; the question left hanging; verdict in 49:5-7 | 30-31 | Verse notes 30, 31 | Repository |
| Care line: Genesis 19 form ("This story does not call it right, and neither does the rest of the Bible. What was done to you was wrong, and it was not your fault." ... "The Find Help page on this site lists places to turn.") | 30-31 | Site | Repository (grep -F) |

Cut: Deuteronomy 22:28-29 (left out, so that nothing reads as a case for a
victim marrying an attacker); Josephus's festival detail; Jubilees on Levi
(not searched); the Septuagint's Horite.

## The plain notes on Genesis 35 (2026-11-19)

`client/public/bible/notes/genesis/plain/35.json`. One web search for this
chapter, with the deep note, the verse notes and the Genesis 23 and 30 plain
notes.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| God's first word since the return; the vow of 28:20-22; Rachel's gods 31:19; washing and clothes as preparation; earrings perhaps charms; Deborah 24:59; Allon-bachuth ‘oak of weeping’ | 1-8 | Deep note (`story`, `cultural`); verse notes 1-8 | Repository |
| Joshua 24:23; 1 Samuel 7:3; Exodus 19:10; 1 John 5:21 | 1-8 | BSB | Repository |
| Name confirmed (32:28); 1:28 and 17:6 echoed; El Shaddai debated, ‘Almighty’ from ancient translations; first drink offering; pillar and oil as 28:18-19 | 9-15 | Deep note (`literary`, `words` H5262); verse notes 11 | Repository |
| Numbers 28:7; Philippians 2:17; Matthew 1:1 | 9-15 | BSB | Repository |
| Ben-oni ‘son of my sorrow’ most likely, or ‘strength’; Benjamin ‘son of the right hand’; 30:1, 30:24, 48:7 | 16-20 | Verse notes 18; BSB | Repository |
| Tomb: verse 19 Bethlehem; 1 Samuel 10:2 Zelzah on Benjamin's border; two views; traditional tomb honored for centuries | 16-20 | Deep note (`historical`) | Repository; stated as open |
| Jeremiah 31:15-16; Matthew 2:18 | 16-20 | BSB | Repository |
| Care line: the Genesis 23 sentences ("If your grief is heavy, please share it with someone you trust: a friend, a pastor, a grief counsellor. If the pain ever feels like more than you can bear, reach out today to a crisis line or emergency service. The Find Help page on this site lists places to turn.") | 16-20 | Site | Repository (grep -F) |
| Concubine a secondary wife; taking a ruler's concubine a claim to his place (2 Samuel 16:21-22) | 21-26 | Deep note (`cultural`) | Repository |
| Bilhah enslaved, no say (Genesis 30 wording echoed) | 21-26 | Site | Repository |
| Talmud (Shabbat 55b): a view that Reuben only disturbed his father's bed, moving it from Bilhah's tent for Leah's honor | 21-26 | Babylonian Talmud Shabbat 55b | Search: "Shabbat 55b whoever says Reuben sinned is mistaken" (sefaria.org.il Shabbat.55b; aish.com/reuben; ezrabrand.com). Paraphrased, no rabbi named |
| Genesis 49:4; 1 Chronicles 5:1; Revelation 21:12 | 21-26 | BSB | Repository |
| Hebron south of Jerusalem; Mamre and Machpelah (23); ‘gathered to his people’; 25:9 | 27-29 | Verse notes 27, 28-29 | Repository |
| Isaac alive about twelve years after Joseph was sold | 27-29 | Deep note (`literary`) | Arithmetic: 25:26 (Isaac 60), 47:9 (Jacob 130), 41:46, 45:6 (Joseph 39), 37:2 (sold at 17): Isaac 168 when Joseph sold, dies at 180 |
| Matthew 22:32 | 27-29 | BSB | Repository |

Cut: the Mari ‘sons of the right’; Migdal Eder in the Targum; Saul of Tarsus
and the Ben-oni picture of Christ; the Septuagint's added clause in 35:22.

## The plain notes on Genesis 36 (2026-11-19)

`client/public/bible/notes/genesis/plain/36.json`. No web search for this
chapter; the deep note, the book page and the BSB.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| ‘This is the account of’ headings; Esau's heading like Ishmael's (25:12) | 1-8 | Book page (`shape`); deep note (`literary`, `words` H8435) | Repository |
| Edom ‘red’ (25:25, 30); Seir south and east of the Dead Sea | 1-8 | Deep note (`historical`) | Repository |
| Wives' names differ from 26:34 and 28:9; explanations; the text lets both stand; 13:6 echo | 1-8 | Deep note (`literary`) | Repository |
| Deuteronomy 2:5; 23:7 | 1-8 | BSB | Repository |
| Genealogies as maps of clans; sons become chiefs; Horites first; Oholibamah Zibeon's granddaughter (2, 20) | 9-30 | Deep note (`cultural`); BSB | Repository |
| Yemim (verse 24) uncertain; BSB ‘hot springs’, older translations (KJV) ‘mules’ | 9-30 | Deep note (`words` H3222) | Repository |
| Exodus 17:8; Deuteronomy 25:17-18; Job 2:11; Job 1:1 | 9-30 | BSB | Repository |
| No king the son of the one before | 31-43 | Deep note (`cultural`) | Repository; BSB 32-39 |
| Verse 31 and authorship: later final form; later hands updated details (as tradition holds of Deuteronomy 34); Moses writing of promised kings (35:11) | 31-43 | Book page (`who`); deep note (`hard`) | Repository; stated as views, as the book page does |
| Obadiah 1:10; Amos 9:12; Acts 15:17 | 31-43 | BSB | Repository |

Cut: Egyptian records of Edomite herders; Faynan copper mines; Bozrah as
Buseirah; Herod and the Idumeans; the root of alluf.

## The plain notes on Genesis 37 (2026-11-19)

`client/public/bible/notes/genesis/plain/37.json`. One web search for this
chapter, with the deep note, the verse notes, the book page and the Genesis
27 plain note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| ‘The account of Jacob’ opens the last part; Joseph and Judah the main characters | 1-4 | Book page (`shape`); deep note (`story`) | Repository |
| Ketonet passim uncertain: ‘many colors’ (Greek translation, KJV) or long sleeves reaching to wrists and ankles; only other use 2 Samuel 13:18 | 1-4 | Deep note (`cultural`, `words` H3801); BSB 2 Samuel 13:18 | Repository |
| ‘Could not speak to him for peace’ (leshalom) | 1-4 | Hebrew text, standard lexicons | Repository |
| 25:28; 29:30; James 2:1; Colossians 3:21 | 1-4 | BSB | Repository |
| Care line: the Genesis 27 wording ("If you know that cry/hurt ... it was not your fault." Psalm 27:10; "If the hurt is heavy, please share it with someone you trust: a friend, a pastor, a counsellor.") | 1-4 | Site | Repository (grep -F) |
| Dreams taken as divine messages; Egyptians wrote guides to reading them; a doubled dream sure (41:32); Rachel dead (35:19) so pictures | 5-11 | Deep note (`cultural`, `literary`) | Repository |
| Genesis 42:6; Luke 2:19 | 5-11 | BSB | Repository |
| Dothan near a pass on the trade road from Gilead toward Egypt; cistern bottle-shaped; ‘master of dreams’ | 12-24 | Deep note (`historical`, `cultural`) | Repository |
| Genesis 42:21; Jeremiah 38:6; Matthew 21:38 | 12-24 | BSB | Repository |
| Balm and myrrh resins prized in Egypt for medicine, perfume, the dead | 25-28 | Deep note (`historical`) | Repository |
| Leviticus 27:5: male aged five to twenty valued at twenty shekels | 25-28 | BSB | Repository |
| Kenneth Kitchen (1995 article) argued twenty shekels matches the slave price in Hammurabi's time and that later prices were higher; others doubt prices can date the story | 25-28 | Kitchen, Biblical Archaeology Review 1995 (the book page's "well-known article of 1995") | Search: "Kitchen twenty shekels price of slave Joseph" (library.biblicalarchaeology.org; biblearchaeology.org; scripturecentral.org). Stated as Kitchen's argument |
| Ishmaelites and Midianites: three readings (same traders, Judges 8:24; Midianites pulled him out; two tellings woven) | 25-28 | Deep note (`hard`) | Repository; no side |
| Exodus 21:16; 1 Timothy 1:10; Psalm 105:17; Amos 2:6; Matthew 26:15 | 25-28 | BSB | Repository |
| Goat echo of 27:9, 16; ‘recognize’ returns 38:25, 42:7-8; sackcloth goat's hair; Sheol first named | 29-36 | Deep note (`literary`, `cultural`, `words`) | Repository |
| Genesis 50:20; Acts 7:9 | 29-36 | BSB | Repository |
| Care line on trafficking: the Genesis 19 shape ("It is not your fault." ... "The Find Help page on this site lists places to turn.") | 25-28 | Site | Repository |

Cut: Beni Hasan painting; the eighteenth-century papyrus of Semitic
servants; Dothan's distance from Shechem; Mari and Hammurabi law numbers;
Nuzi and Ugarit prices.

## The plain notes on Genesis 38 (2026-11-19)

`client/public/bible/notes/genesis/plain/38.json`. Two web searches for this
chapter, with the deep note and the verse notes.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| The chapter shows Judah at his worst before his change (44:18-34); 37:26-27 | 1-11 | Deep note (`story`) | Repository |
| Levirate from Latin levir ‘husband's brother’; first son counted the dead man's heir, carrying his name and share of land; Deuteronomy 25:5-10 | 1-11 | Deep note (`cultural`, `words` H2992); BSB | Repository |
| Hittite and Assyrian law collections also have levirate-type rules (Hittite Laws §193; Middle Assyrian Laws §§30, 33, 43) | 1-11 | Deep note (`cultural`) | Search: "levirate marriage Hittite laws 193 Middle Assyrian laws" (degruyterbrill.com Stol; revistas.usp.br Hirata; thetorah.com; karolinum.cz). Section numbers not on the page |
| Onan's motive: a son for Er would reduce his own inheritance | 1-11 | Deep note (`cultural`); BSB verse 9 | Repository |
| Onan, two readings: Catholic teaching (Augustine; Pius XI, Casti Connubii, 1930) reads the act itself as condemned, as Luther and Calvin did; the point that Judah and Shelah also failed but only Onan died; many Protestants and scholars read the sin as refusal of the levirate duty while using Tamar | 1-11 | Deep note (`hard`) | Search: "Onan Genesis 38 contraception Catholic teaching Casti Connubii Augustine Protestant reading" (Wikipedia "Christian views on birth control" and "Onan"; catholic.com; catholicjournal.us). No side taken; nothing beyond the text on other matters |
| Deuteronomy 25:6; Ruth 4:10; Matthew 22:24-28 | 1-11 | BSB | Repository |
| Widow bound to Judah's family (Deuteronomy 25:5); sheep-shearing a feast; seal on a cord, staff with marks, like signature and ID | 12-19 | Deep note (`cultural`) | Repository |
| Leviticus 18:15; Ruth 3:9 | 12-19 | BSB | Repository |
| Qedeshah (verse 21) differs from the word in verse 15; shrine prostitution once assumed common, evidence now disputed | 20-26 | Deep note (`cultural`) | Repository; stated as debated |
| Burning as the clan head's sentence; ‘Please examine’ echoes 37:32; ‘more righteous’ = in the right between them | 20-26 | Deep note (`cultural`, `literary`, `words` H6663) | Repository |
| Genesis 44:33; Matthew 7:3; John 8:7 | 20-26 | BSB | Repository |
| Perez ‘breaking through’; Zerah ‘rising’ or ‘shining’; echo of 25:24-26 | 27-30 | Deep note (`words` H6557, `literary`); standard lexicons | Repository |
| Ruth 4:12, 18, 21-22; Matthew 1:3 | 27-30 | BSB | Repository |

Cut: Adullam, Chezib and Timnah located in the Shephelah; dates; Revelation
5:5 and Genesis 49:10; the Middle Assyrian section numbers.

## The plain notes on Genesis 39 (2026-11-19)

`client/public/bible/notes/genesis/plain/39.json`. Two web searches for this
chapter, with the deep note, the verse notes and the Genesis 19 plain note.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Contrast with Judah in chapter 38 | 1-6 | Deep note (`story`) | Repository |
| Saris ‘officer’; ‘captain of the guard’ literally ‘chief of the slaughterers’, probably bodyguard or executioners | 1-6 | Deep note (`historical`) | Repository |
| ‘The LORD was with Joseph’ four times (2, 3, 21, 23); Yahweh rare in Joseph's story; an Egyptian house blessed (12:3) | 1-6 | Deep note (`literary`, `doctrines`) | Repository; BSB count |
| Acts 7:9-10; Isaiah 43:2; Psalm 23:4 | 1-6 | BSB | Repository |
| A slave's word counted little against his mistress's | 7-10 | Deep note (`cultural`) | Repository |
| Psalm 51:4; 1 Corinthians 6:18; Hebrews 4:15 | 7-10 | BSB | Repository |
| ‘This Hebrew’ an ethnic label with contempt; blame shifted to the husband; the cloak recalls the robe (37:31-33) | 11-18 | Deep note (`cultural`, `literary`) | Repository |
| Tale of Two Brothers: Papyrus D'Orbiney, about 1215 BC, British Museum; the elder brother's wife tries to seduce Bata, is refused, claims he attacked her; comparison only, no borrowing claimed | 11-18 | British Museum EA 10183 | Search: "Tale of Two Brothers Papyrus D'Orbiney date British Museum" (britishmuseum.org collection EA10183; olli.gmu.edu translation) |
| False reports of sexual assault uncommon; Lisak, Gardinier, Nicksa and Cote (2010, Violence Against Women): 8 of 136 reports at one university over ten years (5.9%) classed as false | 11-18 | Lisak et al. 2010 | Search: "research false reports of sexual assault rate Lisak 2010" (ojp.gov; psmag.com; themarshallproject.org). The claim that most assaults go unreported was not confirmed and is not made; the page says only that many stay silent for fear of not being believed |
| Exodus 23:1; Deuteronomy 19:18; 1 Peter 2:20 | 11-18 | BSB | Repository |
| Care line for anyone pressured by someone with power: the Genesis 19 shape ("it is not your fault ... Please tell someone you trust and get help. The Find Help page on this site lists places to turn.") | 11-18 | Site | Repository |
| Why prison and not death: unexplained; guesses named as guesses; the king's prison; chesed ‘kindness’; the repeated ‘did not concern himself’ (6, 23) | 19-23 | Deep note (`hard`, `words` H2617A); BSB | Repository |
| Psalm 105:18-19; 1 Peter 2:23; Hebrews 13:5 | 19-23 | BSB | Repository |

Cut: Papyrus Brooklyn 35.1446 (not searched in this run); the Middle Kingdom
and Hyksos dates (kept for chapter 41); Potiphar's table and 43:32; tsachaq
and Isaac's name.

## The plain notes on Genesis 40 (2026-11-19)

`client/public/bible/notes/genesis/plain/40.json`. One web search for this
chapter, with the deep note and the verse notes.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Cupbearer served the king's wine and could have influence; chief baker over royal bread; the offence not named | 1-8 | Deep note (`historical`) | Repository |
| Dreams as messages from the gods; Egyptian experts; the Chester Beatty dream book (British Museum EA 10683), usually dated to the 1200s BC, lists dreams as good or bad | 1-8 | Deep note (`cultural`) | Search: "Chester Beatty dream book papyrus Chester Beatty III date" (britishmuseum.org EA10683; library.biblicalarchaeology.org; thesaurus-linguae-aegyptiae.de). Dates in sources range across the 1200s BC |
| Daniel 2:27-28; Nehemiah 1:11 | 1-8 | BSB | Repository |
| ‘Lift up your head’ an idiom for restoring to honor; the wordplay with ‘lift off’ (13, 19, 20); bor ‘dungeon’ the same word as the pit (37:24) | 9-15 | Deep note (`literary`, `words` H7218A, H0953A) | Repository |
| Luke 23:42-43 as an echo many Christians hear; zakar as acting for someone (8:1) | 9-15 | Deep note (`christ`, `words` H2142); BSB | Repository; stated as an echo |
| Egyptian weight on the body's care and burial; birds eating the body a horror | 16-23 | Deep note (`cultural`) | Repository |
| Two more years (41:1); Psalm 13:1; Isaiah 49:15; Habakkuk 2:3 | 16-23 | BSB | Repository |
| Dreams today: Christians differ whether and how God still speaks in dreams; claims tested by Scripture; Deuteronomy 13:1-3 | 16-23 | BSB | Repository; no side |

Cut: royal birthday festivals in later Egyptian texts; Egyptian bread
varieties.

## The plain notes on Genesis 41 (2026-11-19)

`client/public/bible/notes/genesis/plain/41.json`. Five web searches for
this chapter, with the deep note, the verse notes and the book page.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Seventeen (37:2) to thirty (41:46): thirteen years | 1-13 | BSB | Repository |
| Pharaoh unnamed; the Nile's yearly flood and failed harvests; the east wind hot and dry | 1-13 | Deep note (`historical`); verse notes | Repository |
| Daniel 2:28; Daniel 1:20 | 1-13 | BSB | Repository |
| Egyptian men of rank usually clean-shaven; Egyptian art often shows men from Canaan with beards | 14-24 | Deep note (`cultural`) | Search: "Genesis 41:14 Joseph shaved Egyptians clean-shaven custom" (biblehub.com commentaries citing Wilkinson and Herodotus; bibletruthpublishers.com Freeman). Older commentaries; kept general |
| Bil'adai one word ‘apart from me’; clothing through Joseph's life | 14-24 | Deep note (`literary`); Hebrew text | Repository |
| Psalm 105:19-21; 1 Peter 5:6 | 14-24 | BSB | Repository |
| Doubled dream settled by God (32); Joseph's plan of a fifth stored in cities | 25-36 | BSB; deep note (`literary`, `cultural`) | Repository |
| Famine Stela: Sehel Island near Aswan; seven-year famine under Djoser; carved in the Ptolemaic period; seven-year famine a common Near Eastern motif | 25-36 | Deep note (`historical`) | Search: "Famine Stela Sehel Island Ptolemaic seven years famine Djoser" (Wikipedia "Famine Stela"; egymonuments.gov.eg; attalus.org). No claim about Joseph |
| Proverbs 6:8; Acts 7:11 | 25-36 | BSB | Repository |
| ‘Spirit of God’ / ‘spirit of the gods’ | 37-46 | Deep note (`words` H7307G) | Repository |
| Signet ring = authority to seal orders in the king's name; fine linen; gold chain a mark of honor | 37-46 | Deep note (`cultural`) | Search: "Egyptian gold of honour collar ... signet ring linen Genesis 41:42" (biblehub.com commentaries). The Egyptian ‘gold of honour’ institution was not confirmed and is not named |
| Abrek probably Egyptian, meaning uncertain | 37-46 | Deep note (`cultural`) | Same search (no meaning found); stated as uncertain |
| Zaphenath-paneah an Egyptian kind of name, meaning disputed (Steindorff, Vergote, Kitchen proposals) | 37-46 | Deep note (`historical`) | Search: "Zaphenath-paneah meaning debated" (tips.translation.bible; NET note on biblia.com). No meaning given on the page |
| Asenath ‘she belongs to Neith’ (HALOT), ‘many scholars think’ | 37-46 | Lexicon | Same search (NET note citing HALOT) |
| On = Heliopolis ‘city of the sun’, near Cairo, centre of the worship of Ra | 37-46 | Deep note (`historical`) | Same search |
| Joseph's date: the book page's sentence (traditional early second millennium, Joseph somewhat later; many doubt dating); Hyksos about 1650-1550 BC, West Asian rulers of northern Egypt, a view linking Joseph to them; an earlier placing; a later composition | 37-46 | Book page (introduction `date`); deep note (`historical`) | Search: "Joseph Hyksos period theory 1650-1550 BC" (biblicalarchaeology.org "Imagining Joseph in Egypt"; studylight.org Holman dictionary "Hyksos"). Views only; no side |
| Psalm 105:21; Daniel 2:48; Luke 1:52 | 37-46 | BSB | Repository |
| Grain ‘like the sand of the sea’ and 22:17; Manasseh ‘making forget’, Ephraim ‘fruitful’; Asenath an Egyptian priest's daughter stated twice (45, 50) | 47-57 | Deep note (`cultural`); BSB | Repository |
| Famine policy told only as far as chapter 41; chapter 47 named as where the rest comes | 47-57 | BSB | Repository |
| Genesis 48:5, 20; 12:3; John 2:5 | 47-57 | BSB; deep note (`christ`) | Repository |

Cut: Potiphera ‘the one whom Ra has given’ (not confirmed by the search);
the Egyptian ‘gold of honour’ awards; Aper-El at Saqqara; Redford and
Kitchen on the names; the Middle Kingdom ‘nineteenth century BC’ date;
Ptolemaic priestly motives for the stela.

## The plain notes on Genesis 42 (2026-11-19)

`client/public/bible/notes/genesis/plain/42.json`. Two web searches for
this chapter, with the deep note, the verse notes and the book page.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Seventeen when sold (37:2), thirty before Pharaoh (41:46), seven years of plenty; more than twenty years; Joseph nearly forty | 1-5, 6-17 | BSB (45:6 for the second year) | Repository |
| Canaan lived on rain, Egypt on the Nile flood; going down to Egypt in famine (12:10) | 1-5 | Deep note (`historical`); book page | Repository |
| ‘Joseph's brothers’ and ‘Joseph's brother’ in 42:3-4; favoritism still in place | 1-5 | Verse notes (3-4) | Repository |
| Acts 7:11-12; Psalm 105:16-17 | 1-5 | BSB | Repository |
| Nakar ‘recognize’ links 42:7-8 with 37:32 | 6-17 | Deep note (`words` H5234A) | Repository |
| Tale of Sinuhe (Middle Kingdom) names the ‘Walls of the Ruler’, border defences on the north-east frontier | 6-17 | Sinuhe; Prophecy of Neferti | Search: "Story of Sinuhe Walls of the Ruler" (en.wikipedia.org "Walls of the Ruler"; cojs.org "Tale of Sinuhe"). The builder (Amenemhat I) and the site not named |
| ‘As surely as Pharaoh lives’ an official's oath that hides his identity | 6-17 | Deep note (`cultural`) | Repository; stated simply |
| Three readings of Joseph's harshness (testing; anger mixed in; bringing about the dream) | 6-17 | Deep note (`hard`) | Repository; no side |
| Psalm 139:23; John 1:11; Luke 24:16 | 6-17 | BSB | Repository |
| Ashem ‘guilty’ opens 42:21; Joseph's cries told first here; blood crying out (4:10) | 18-24 | Deep note (`words` H0818, `literary`, `cultural`) | Repository |
| Simeon the second son; Reuben passed over ‘perhaps’ because he tried to save Joseph | 18-24 | BSB (29:33); a reading | Stated as ‘perhaps’ |
| Numbers 32:23; Psalm 32:3, 5; Proverbs 28:13 | 18-24 | BSB | Repository |
| Silver weighed, not coins; coins much later | 25-28 | Deep note (`cultural`); Genesis 23 note wording | Repository (earlier plain note, 23:3-16) |
| First mention of God by the brothers in the Joseph story (42:28) | 25-28 | Deep note (`literary`) | Repository |
| Hebrews 4:13; 1 John 1:9 | 25-28 | BSB | Repository |
| The report to Jacob leaves out the three days and Simeon bound | 29-38 | Deep note (`literary`) | Repository |
| Reuben's offer rash; Sheol the place of the dead | 29-38 | Deep note (`cultural`) | Repository |
| Romans 8:28; Luke 15:20 | 29-38 | BSB | Repository |

Cut: Egyptian records of eastern herders in the Delta (held for 46, where
Papyrus Anastasi VI is checked); coins first struck in Asia Minor in the
seventh century BC (not needed; ‘much later’ kept).

## The plain notes on Genesis 43 (2026-11-19)

`client/public/bible/notes/genesis/plain/43.json`. One web search for this
chapter, with the deep note, the verse notes and the book page.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Judah's past (37:26-27; 38:26); Reuben's offer (42:37) | 1-10 | BSB | Repository |
| ‘Guarantee’ the language of standing surety; Hebrews 7:14, 7:22 as a thematic link, not a prophecy | 1-10 | Deep note (`christ`) | Repository; stated as the deep note does |
| Na'ar ‘boy’ a wide word, used of Joseph at seventeen (37:2); Benjamin grown | 1-10 | Deep note (`hard`) | Repository |
| Gift's goods echo 37:25; Jacob's gift to Esau (32:20); El Shaddai as in 35:11 | 11-14 | Deep note (`historical`, `cultural`); BSB | Repository |
| Esther 4:16; Proverbs 18:16 | 11-14 | BSB | Repository |
| A steward over an official's household | 15-25 | Deep note (`historical`) | Repository; stated generally |
| Foot-washing and fodder as welcome (18:4) | 15-25 | Deep note (`cultural`) | Repository |
| Psalm 23:5; 1 Peter 5:7; Luke 7:44 | 15-25 | BSB | Repository |
| Eleven bow, as the eleven stars (37:9) | 26-34 | Deep note (`cultural`) | Repository |
| Herodotus (400s BC), Histories 2.41: Egyptians would not use a Greek's knife, spit or cauldron | 26-34 | Herodotus | Search: "Herodotus 2.41 Egyptians ... knife spit or cauldron of a Greek" (lexundria.com 2.41; fgh.perseids.org). Paraphrased; marked as a different people and a much later time; Assmann's caution noted, so no wider claim made |
| Joseph's separate table ‘probably’ also for rank; the fivefold portion read by many as a quiet test | 26-34 | Deep note (`historical`, `cultural`) | Repository; hedged |
| Luke 14:13; Romans 5:8 | 26-34 | BSB | Repository |

## The plain notes on Genesis 44 (2026-11-19)

`client/public/bible/notes/genesis/plain/44.json`. Two web searches for
this chapter, with the deep note, the verse notes and the book page.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Laws of Hammurabi (about 1754 BC, the book page's date), law 6: theft of temple or palace property punished by death | 1-13 | Hammurabi | Search: "Code of Hammurabi law 6 ... temple or palace put to death" (avalon.law.yale.edu; biblicaltraining.org). The law number is not printed on the page |
| Torn clothes as grief; 37:29, 34 | 1-13 | Deep note (`cultural`); BSB | Repository |
| Babylonian omen texts on oil dropped on water in a cup | 1-13 (hard) | Old Babylonian lecanomancy texts as summarised | Search: "lecanomancy oil on water divination Old Babylonian texts Genesis 44:5" (en.wikipedia.org "Lecanomancy"; armstronginstitute.org citing Kitchen). Stated generally; no tablet named, no date given, Kitchen's Hyksos claim and the Egyptian statuettes not used |
| The divination words spoken only inside the trick; three readings (disguise; real practice before the law; irony); judgments of the trap | 1-13 (hard) | Deep note (`hard`) | Repository; no side; no claim that Joseph practised it |
| Leviticus 19:26; Deuteronomy 18:10; ‘good with evil’ and 50:20 | 1-13 | BSB; deep note (`literary`) | Repository |
| ‘Judah and his brothers’; Judah reads the false charge as God exposing the old guilt | 14-17 | BSB; deep note (`literary`) | Repository |
| Psalm 51:3; Luke 18:13 | 14-17 | BSB | Repository |
| Court address (‘my lord’, ‘your servant’); ‘father’ runs through the speech (no count given); ‘my wife bore me two sons’ accepted without resentment | 18-29 | Deep note (`cultural`, `literary`) | Repository. The deep note's count of fifteen not repeated (not checked) |
| 2 Samuel 18:33; 1 Samuel 18:1 (‘knit together’, the deep note's link for 44:30) | 18-29 | BSB | Repository |
| Judah sold Joseph (37:27); now offers himself as a slave in Benjamin's place: the turning point | 30-34 | BSB; deep note (`doctrines`, `christ`) | Repository |
| Substitution as a Christian reading, not a prophecy; the guilty for the innocent against the innocent for the guilty; Revelation 5:5; Mark 10:45; 1 Peter 3:18; Genesis 49:8 | 30-34 | Deep note (`christ`); BSB | Repository; marked ‘a reading’ |

Cut: the Hyksos-period date for cup divination (Kitchen) and the Middle
Kingdom statuettes; the count of ‘father’ fifteen times.

## The plain notes on Genesis 45 (2026-11-19)

`client/public/bible/notes/genesis/plain/45.json`. One web search for this
chapter, with the deep note, the verse notes, the book page and the site's
safety wording.

| Claim | Where | Source | Checked by |
|---|---|---|---|
| Joseph weeps aloud; an official expected to keep reserve; ‘I am Joseph’ three words in Hebrew | 1-3 | Deep note (`cultural`, `literary`) | Repository |
| Acts 7:13; Luke 24:39 | 1-3 | BSB | Repository |
| ‘Sold’ answered by ‘sent’, three times (5, 7, 8); the sale named first | 4-8 | Deep note (`literary`, `hard`) | Repository |
| ‘A father to Pharaoh’ as a trusted adviser; Isaiah 22:21 uses ‘father’ of a high official | 4-8 | Hebrew; BSB | Search: "Genesis 45:8 father to Pharaoh Egyptian title god's father" (biblehub.com commentaries; openbible.com Strong's ‘adviser’; Aling, biblicalelearning.org). The link to the Egyptian ‘god's father’ title was not confirmed and is left out |
| God's hand and human guilt held together, neither cancelling (the Genesis 27 wording); Reformed and Arminian/Catholic/Orthodox accounts | 4-8 (hard) | Deep note (`hard`); plain note 27 | Repository; no side |
| Safety lines word for word from the Genesis 16 note (from Mark 10:1-12), and its Find Help sentence | 4-8 (hard) | Site | Repository (grep -F) |
| Acts 2:23; Psalm 105:17 | 4-8 | BSB | Repository |
| Goshen usually placed in the eastern Nile delta; exact borders not known | 9-15 | Book page map (‘usually placed in the eastern Nile delta’); deep note (‘exact boundaries are uncertain’) | Repository |
| 37:4 ‘could not speak a kind word’ against 45:15 ‘talked with him’ | 9-15 | BSB | Repository |
| Luke 15:20; Ephesians 4:32 | 9-15 | BSB | Repository |
| Clothing through the story; ragaz ‘be agitated’ by anger or fear, two readings | 16-24 | Deep note (`cultural`); verse note (24) | Repository |
| Colossians 3:13; Romans 12:18 | 16-24 | BSB | Repository |
| Whether Jacob was told of the sale: the text does not say | 25-28 | Deep note on 50 (`hard`) | Repository; no claim made |
| ‘His heart grew numb’ (vayyafog libbo); ‘spirit ... revived’; Jacob and Israel | 25-28 | Verse notes (25-26, 27-28); deep note (`literary`) | Repository |
| Luke 24:11; Genesis 32:28 | 25-28 | BSB | Repository |

Cut: the Egyptian ‘god's father’ title (not confirmed); the silver's weight
in kilograms (kept out, as in Genesis 23).
