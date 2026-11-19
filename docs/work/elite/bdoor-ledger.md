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
