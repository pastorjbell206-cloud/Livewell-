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
