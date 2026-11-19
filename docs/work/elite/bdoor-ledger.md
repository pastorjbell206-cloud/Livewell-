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
