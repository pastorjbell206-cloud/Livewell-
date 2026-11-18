# Worlds pilot ledger: "Jewish life in Jesus's day"

Data file: `client/public/context/worlds/jewish-life-in-jesus-day.json`.
Page: `/resources/context/world/jewish-life-in-jesus-day`.

How to read this ledger. **Verified (search, 2026-11-18)** means a web search
run on the closing day of the pilot returned the claim from a translation of
the primary text or a reliable secondary source. **Verified (repo ledger)**
means an earlier, already-checked ledger in this repository holds it, named.
**Verified (validator)** means a CI gate checks it mechanically on every
build. **Not re-searched** means the claim rests on a standard, named ancient
text or reference and the first run's checks left no record; it is listed so
James or an editor can see exactly which lines have not been checked a second
time. **Corrected** means the search found the first wording too strong and
the portrait was changed.

The closing run was limited to 25 searches. Gutenberg and attalus.org could
not be reached from this machine, so whole-text checks of Josephus and Pliny
were not possible.

## Scripture

| Claim | Source | How checked |
|---|---|---|
| All 21 Gospel quotations under "How it changes what you read" are word for word the Berean Standard Bible and link to their chapter and first verse | `client/public/bible/text` | Verified (validator): `scripts/validate-worlds.mjs` compares each one with the Study Bible's own text |
| Other references in the prose (Luke 2:7, 2:24, 2:44, 3:1, 3:13, 8:1-3, 10:34, 22:11; Mark 2:4, 5:26, 6:3, 13:1, 15:25; Matthew 1:19, 9:23, 17:27, 18:25, 19:3, 24:41, 27:57; John 6:23, 7:15, 9:2, 10:23, 19:20, 19:40; Acts 5:34, 5:36, 5:37, 23:8; Philippians 3:5; Exodus 12, 30; Leviticus 12 to 15, 19:18, 23; Numbers 19; Deuteronomy 6, 16:16, 24; 1 Chronicles 24; Daniel 12:2; Psalms 120 to 134) | Bible text | Verified (second check, local BSB text 2026-11-18): every reference listed was read in `client/public/bible/text` and says what the prose says (Luke 2:7 "inn", 22:11 "guest room", 10:34 "inn" as English; Exodus 12:6-8 the fourteenth day; Deuteronomy 16:16 the three feasts; Luke 2:44 a day's travel; John 6:23 Tiberias; Mark 15:25 the third hour; Daniel 12:2; Acts 23:8; Philippians 3:5 and the rest). The Greek kataluma/pandocheion distinction is confirmed in the Bailey row below |
| Sirach 38:24, "The wisdom of the scribe depends on the opportunity of leisure" (RSV) | RSV | Verified (search): clerus.org RSV and biblia.com RSV give this wording |

## Part 1: The land and who ruled it

| Claim | Source | How checked |
|---|---|---|
| Galilee to Jerusalem in three days through Samaria | Josephus, Life 269 | Verified (search): Whiston at lexundria.com, Life 269 |
| Smallest Galilean village held above fifteen thousand; historians do not take it at face value | Josephus, Jewish War 3.43 | Verified (search): Whiston, War 3.43; scholars call the figure an exaggeration |
| Lake about 21 by 13 km | standard geography | Verified (second check, search 2026-11-18): Wikipedia "Sea of Galilee" and israel21c give 21 km by 13 km; older references give a little less |
| Pliny lists ten Decapolis cities, Damascus to Philadelphia, and admits other opinions | Pliny, Natural History 5.74 | Verified (search): Encyclopaedia Judaica summary at encyclopedia.com and JW Insight both report Pliny's list and his admission of disagreement |
| Scythopolis the only Decapolis city west of the Jordan | Britannica, Decapolis | Verified (second check, search 2026-11-18): Aramco World, BAR (Jan/Feb 2011), Wikipedia "Decapolis" all say so; Britannica lists it but the snippet did not state it |
| Herod king 37 BC to 4 BC, minority 1 BC, eclipse question | Josephus, Antiquities 17.167; standard chronology | Verified (second check, search 2026-11-18): Steinmann (JGRChJ 21) and others set out the 4 BC (13 March) and 1 BC (10 January) eclipses; 4 BC remains the majority date |
| Archelaus removed AD 6 | Josephus, Antiquities 17.342-344 | Verified (repo ledger): `docs/work/essays/ledgers/what-render-unto-caesar-actually-means.md` (Whiston 17.13.2) |
| Antipas held Galilee and Perea to AD 39; they paid him two hundred talents | Josephus, Antiquities 17.318 | Verified (search): Whiston, Ant. 17.318 and War 2.95 give 200 talents |
| Pilate stone, Caesarea theater, 1961, only inscription naming him | archaeology | Verified (repo ledger): `docs/work/essays/ledgers/the-historical-jesus.md` and `docs/work/elite/apol-ledger.md` |
| Pilate about AD 26 to 36 | Josephus, Antiquities 18.89 | Verified (repo ledger): what-render-unto-caesar ledger (Whiston 18.4.2, "ten years") |
| Caiaphas high priest about 18 to 36; ossuary found 1990 in the Peace Forest, "Joseph son of Caiaphas," identification debated | archaeology | Verified (search): Wikipedia "Caiaphas ossuary"; BAS library; COJS |
| Census under Quirinius AD 6; Judas taught the tax meant slavery, God alone ruler | Josephus, Antiquities 18.4, 18.23 | Verified (repo ledger): what-render-unto-caesar ledger (Whiston 18.1.1, 18.1.6) |
| Nazareth a few hundred people, often given as 200 to 500 | modern estimates | **Corrected.** A search found the 200 to 500 range in secondary material but could not confirm it is Reed's own figure; the attribution to Reed was removed and the sentence now says the numbers are careful guesses |
| Sepphoris about 5 or 6 km north; burned by Varus, rebuilt by Antipas | Josephus, Antiquities 17.289; 18.27 | Verified (second check, search 2026-11-18): Whiston, Ant. 17.289 (Sepphoris taken, inhabitants enslaved, city burned; also War 2.68); Ant. 18.27 (Antipas walled Sepphoris and made it the metropolis of the country). Distance not re-searched |
| Tiberias built on graves; settlers unclean; Antipas gave houses and land | Josephus, Antiquities 18.36-38 | Verified (second check, search 2026-11-18): Whiston and other translations (sepulchres removed, unclean seven days, land and houses given on condition they stay) |
| Hours counted from sunrise; Passover on 14 Nisan | Mark 15:25; Exodus 12; Leviticus 23 | Verified (second check, local BSB text): Exodus 12:6, Leviticus 23:5 the fourteenth day; Mark 15:25 the third hour |
| Samaritan temple on Gerizim destroyed by John Hyrcanus about 111 or 110 BC, dated by coins | Magen's excavations | Verified (search): BAS New Encyclopedia of Archaeological Excavations entry (coins date destruction about 110 BC) |
| Samaritans scattered bones in the Temple at Passover; Galilean pilgrims killed at Ginea | Josephus, Antiquities 18.29-30; 20.118 | Verified (second check, search 2026-11-18): Ant. 18.29-30 under Coponius, at Passover, in the porticoes (Whiston renders "dead men's bodies"; the Greek speaks of human bones, the portrait's word); Ant. 20.118 Whiston, "killed a great many of them" at Ginea (War 2.232 gives one Galilean) |

## Part 2: A day and a year

| Claim | Source | How checked |
|---|---|---|
| Courtyard houses of basalt at Capernaum; beam-and-earth roofs | archaeology; Mark 2:4 | Verified (second check, search 2026-11-18): Israel Foreign Ministry "Capernaum" (rooms around courtyards, basalt); roofs of beams, branches and packed clay are reconstructions from the thin walls and Mark 2, as the prose implies by tying them to Mark 2:4 |
| Bailey's reading of kataluma; same word in Luke 22:11, not in Luke 10:34 | Kenneth Bailey, Jesus Through Middle Eastern Eyes (2008); Greek text | Verified (second check, search 2026-11-18): Tyndale House and Psephizo summaries of Bailey; kataluma at Luke 22:11, pandocheion at Luke 10:34. The prose marks it "Not everyone accepts this" |
| Bread at least half the diet | Susan Weingarten, "The Ancient Diet of Roman Palestine", Biblical Archaeology Review, March/April 2019 | **Corrected (second check).** Weingarten (BAR 2019, and Bible History Daily's summary) says scholars reckon at least 50 and perhaps 75 percent. No source found that ties the figure to Broshi, so "drawing on the work of Magen Broshi" was cut and "perhaps much more" became "perhaps as much as three quarters". Broshi's book stays in the reading list as further reading |
| Galilee boat: 1986, Ginosar, about 8.2 by 2.3 m, first century BC to first century AD | archaeology | Verified (search): Israel Foreign Ministry (carbon tests, 100 BC to AD 70); length "just over 27 feet" (8.2 m); width given as 7.5 to 8 ft in different sources, 2.3 m in the IAA account |
| Rebels burned the archives to destroy the moneylenders' bonds, AD 66 | Josephus, Jewish War 2.427 | Verified (second check, search 2026-11-18): Whiston, War 2.427 (to destroy the contracts of creditors and win the debtors) |
| Herod and Antipas struck bronze coins without human faces | numismatics | Verified (second check, search 2026-11-18): CoinWeek and Jewish Virtual Library on Herod's coins (no human likeness; one eagle type); BAS and CoinWeek on Antipas (no figural images); Philip was the first Herodian to put portraits on coins |
| Tacitus on the seventh day | Tacitus, Histories 5.4 | **Corrected (second check).** Church and Brodribb (Wikisource) and Fyfe: the seventh day was given to rest because it ended their toils; then "the charm of indolence" led them to give the seventh year to inaction too. The idleness jibe belongs to the seventh year, so the sentence now says that |
| About a thousand killed on the Sabbath; Mattathias decides to fight | 1 Maccabees 2:29-41 | Verified (second check, search 2026-11-18): 1 Maccabees 2:38 in RSV, NRSV, Douay and CEB (about a thousand); 2:39-41 the decision to fight (verse 41's wording not seen; the portrait does not quote it) |
| Damascus Document forbids helping an animal give birth, or lifting it from a pit, on the Sabbath | CD 11.13-14 | Verified (search): COJS, Schiffman, "The Sabbath Code" |
| 256,500 lambs counted; Josephus's millions too high | Josephus, Jewish War 6.422-425 | Verified (search): Whiston, War 6.424 |
| Jeremias: about 125,000 visitors at Passover | Jeremias, Jerusalem in the Time of Jesus | Verified (search): Christian Courier citing Jeremias pp. 79-83; BAS on his lamb-count method |
| Psalms 120 to 134 each headed "A song of ascents" | Psalms | Verified (second check, local BSB text): all fifteen carry the heading |
| A denarius a day's wage | Matthew 20:2 | Verified (repo ledger): what-render-unto-caesar ledger |

## Part 3: The Temple

| Claim | Source | How checked |
|---|---|---|
| Rebuilding began in Herod's eighteenth year | Josephus, Antiquities 15.380 | Verified (second check, search 2026-11-18): Whiston, Ant. 15.380; BAS endnote (War 1.401 says the fifteenth year) |
| Western Wall tunnel stone about 13.6 m; weight estimates 250 to over 500 tons | archaeology | Verified (search): Wikipedia "Western Stone" (13.55 to 13.6 m; 567 tonnes old estimate, 250 to 300 tonnes after Jol's 2006 radar) |
| Warning notices in Greek and Latin | Josephus, Jewish War 5.193-194 | Verified (search): sources citing War 5.193-194 |
| Complete inscription found by Clermont-Ganneau 1871; fragment 1936; argument over whether the penalty was carried out | archaeology | Verified (search): Wikipedia "Temple Warning inscription" (Iliffe, 1936, IAA 1936-989) |
| Holy of Holies entered once a year by the high priest | Leviticus 16 | Verified (second check, local BSB text): Leviticus 16:2, 16:34 |
| Sanders on sacrifice | E. P. Sanders, Judaism: Practice and Belief (1992) | Not re-searched (second check spent its searches on named sections); paraphrase, no quotation |
| Two doves for the poor; Mary and Joseph's offering | Leviticus 12:8; Luke 2:24 | Verified (second check, local BSB text) |
| Twenty-four priestly divisions; Zechariah of Abijah | 1 Chronicles 24; Luke 1:8-9 | Verified (second check, local BSB text): 1 Chronicles 24:10, 24:18; Luke 1:8-9 (Abijah is named in Luke 1:5) |
| Tyrian shekel: nearly pure silver, Melqart-Herakles and an eagle, used for the Temple tax | numismatics | Verified (search): Bible Archaeology (ABR), about 94 percent silver, Melqart-Herakles obverse, eagle reverse |
| Temple burned on the tenth of Lous (Av), the same day as the first Temple | Josephus, Jewish War 6.250 | Verified (search): Whiston, War 6.250 |
| Vespasian's two-drachma tax to Jupiter Capitolinus | Josephus, Jewish War 7.218 | Verified (second check, search 2026-11-18): Whiston, War 7.218 (two drachmae yearly to the Capitol, as formerly to the Temple); BAS review on the fiscus Judaicus |

## Part 4: Synagogue, Scripture and school

| Claim | Source | How checked |
|---|---|---|
| "Synagogue" before 70 could mean the gathering or a house | Lee Levine, The Ancient Synagogue (2000) | Verified (second check, search 2026-11-18), in substance from secondary summaries only: Levine on the communal character of the pre-70 synagogue and on house synagogues. Levine's own wording not seen |
| Thousands of schools open on the seventh day in every city | Philo, Special Laws 2.62 | Verified (search) in substance: Perseids text of Spec. 2.62 ("innumerable lessons ... in every city"); paraphrase, no quotation marks |
| Moses ordered a weekly gathering to hear the law | Josephus, Against Apion 2.175 | Verified (second check, search 2026-11-18): Whiston, Ap. 2.175 ("every week", ἑκάστης ἑβδομάδος, to hear the law and learn it thoroughly) |
| Pre-70 halls at Gamla, Masada, Herodium; Magdala 2009 with benches and a menorah stone | archaeology | Verified (search) for Magdala: Wikipedia "Migdal Synagogue", Israel Foreign Ministry 2009, Live Science. **Corrected (second check)** for Gamla, Masada, Herodium: Wikipedia "Ancient synagogues in Palestine" and Mosaic (Gamla destroyed AD 67); the Masada and Herodium halls were palace rooms used by the rebels in the war, and Herodium's date is disputed. "from before 70" became "from the first century" with those notes |
| Theodotus inscription: built "for the reading of the law and for the teaching of the commandments," guest house, rooms, water installations; most date it before 70 | archaeology | Verified (search): Wikipedia "Theodotos inscription" (found 1913 by Weill); COJS. Note: some translators mark the water phrase as uncertain |
| Twice-daily remembrance, read by many as the Shema | Josephus, Antiquities 4.212 | Verified (search): Whiston, Ant. 4.212; Kugel |
| Tefillin found at Qumran | archaeology | Verified (second check, search 2026-11-18): JTA (Yadin), Times of Israel (Adler, 2013), PLOS ONE 2024 study reported by JNS |
| Aramaic words in Mark 5:41, 7:34, 15:34 | Mark | Verified (second check, local BSB text) |
| Babatha's papers: Greek contracts signed in Aramaic or Nabataean | Cave of Letters | Verified (search): COJS (Saldarini, BAR 1998); JWA encyclopedia. **Corrected:** "hidden in AD 132" became "hidden during the revolt that began in AD 132" |
| Bar-Ilan: about three percent literate; Hezser (2001) | Bar-Ilan (1992); Hezser (2001) | Verified (search): Bar-Ilan Univ. CRIS listing; Wikipedia, "probably less than 3%" |
| Great Isaiah Scroll about 7.3 m, 54 columns | archaeology | Verified (search): Wikipedia "Isaiah Scroll" (7.34 m, 54 columns). **Corrected:** the date "125 to 100 BC" became "the late second century BC", since sources give 150 to 100 BC on the hand and wider radiocarbon ranges |

## Part 5: Pharisees, Sadducees, Essenes and the rest

| Claim | Source | How checked |
|---|---|---|
| Three schools and a fourth | Josephus, Antiquities 18.11-25 | Verified (repo ledger): what-render-unto-caesar ledger (Whiston 18.1.2, 18.1.6) |
| Pharisees handed on unwritten practices the Sadducees rejected | Josephus, Antiquities 13.297 | Verified (second check, search 2026-11-18): Whiston and Schiffman (COJS), Ant. 13.297 |
| Pharisees' influence over Sadducees in office | Josephus, Antiquities 18.15, 17 | Verified (second check, search 2026-11-18): Whiston, Ant. 18.15-17 (Sadducee magistrates "addict themselves to the notions of the Pharisees"; their doctrine received by few, but those of the greatest dignity); COJS |
| More than six thousand Pharisees refused the oath | Josephus, Antiquities 17.42 | Verified (search): Whiston, Ant. 17.42 |
| Neusner and Sanders disagree on Pharisaic purity | modern scholarship | Verified (second check, search 2026-11-18): Sanders, "Did the Pharisees Eat Ordinary Food in Purity?" in Jewish Law from Jesus to the Mishnah (1990), against Neusner; Neusner's reply in SJT |
| Gamaliel "honored by all the people" | Acts 5:34 | Verified against the local BSB text |
| Essenes about four thousand | Philo, Every Good Man Is Free 75; Josephus, Antiquities 18.20 | Verified (second check, search 2026-11-18): Philo, Prob. 75 (Yonge: "more than four thousand", "in my opinion"; earlyjewishwritings.com, COJS); Josephus, Ant. 18.20 (Whiston and COJS: "about four thousand men"). "About" fits both |
| Essenes by the Dead Sea, without women and money, with palm trees | Pliny, Natural History 5.73 | **Corrected (second check).** Rackham (Loeb), Bostock (via Harland) and the Latin (sine ulla femina, sine pecunia, socia palmarum; COJS, Kraft at Penn) confirm women, money and palms. Pliny puts them on the west side of the Dead Sea but away from the shore, which is harmful (litora fugiunt), so "on the western shore" became "on the west side of the Dead Sea, back from the shore". Goranson and Treat argue the Latin on women is less absolute than Rackham; the portrait's "without women" follows the Latin |
| About 900 scrolls, eleven caves, 1947 to 1956; every book but Esther | Dead Sea Scrolls | Verified (second check, search 2026-11-18): World History Encyclopedia, EBSCO; counts range from about 800 to 981, "about 900" is the common round figure |
| "until the coming of a prophet and the messiahs of Aaron and Israel" | 1QS 9.11 | Verified (search): BAS ("until there shall come the Prophet and the Messiahs of Aaron and Israel"); wording differs a little between translators, and the portrait's line follows the common rendering |
| Theudas | Josephus, Antiquities 20.97-98; Acts 5:36 | **Corrected (second check).** Whiston, Ant. 20.97-98: Theudas led the people to the Jordan, saying he would divide the river; Fadus's horsemen killed many and beheaded him. He did not lead them "into the desert" (that is the later men of Ant. 20.167-168), so the sentence now says "led crowds out" and names the Jordan |
| Zealots as a named party belong to 66 to 70 | modern scholarship | Verified (second check, search 2026-11-18): Encyclopedia of Religion "Zealots" (encyclopedia.com): the word is not used of the anti-Roman forces before 66; Horsley and Hanson (1985) as reported. The portrait marks Simon's case "may" |
| Sanders on "sinners" | E. P. Sanders, Jesus and Judaism (1985), the chapter "The Sinners" | Verified (second check, search 2026-11-18): Boston College excerpt of Sanders's chapter; Wikipedia "Jesus and Judaism" (against Jeremias's identification with the am ha-aretz); Bond and France on the debate. Paraphrase, marked as debated |

## Part 6: What people believed and hoped for

| Claim | Source | How checked |
|---|---|---|
| Common Judaism; covenantal nomism | Sanders (1977, 1992) | Verified (second check, search 2026-11-18): summaries of Paul and Palestinian Judaism (getting in by grace, staying in by obedience, atonement for failure); Sanders, "Covenantal Nomism Revisited" (JSQ 2009) on common Judaism. Paraphrase |
| Stepped pools and stone vessels; the rule written only in the Mishnah | archaeology; Mishnah | Verified (second check, search 2026-11-18): Wikipedia "Stone vessels in ancient Judaea"; BAS "Ancient Israel's Stone Age" (Mishnah Kelim 10:1, Parah 5:5 and others). Stepped pools not separately searched |
| Reina cave workshop near Kafr Kanna | archaeology | Verified (search): Israel Foreign Ministry and Mosaic, Y. Adler for the IAA. **Corrected:** "In 2016" became "announced in 2017", the date the reports carry |
| Psalms of Solomon 17, a son of David to purge Jerusalem of gentiles | Psalms of Solomon | Verified (second check, search 2026-11-18): Pss. Sol. 17:21-22 (ebible.org translation, "nations"; Witherington, "gentiles"; Greek ethnōn); the link to Pompey's capture in 63 BC is the common view (Encyclopedia.com). Paraphrase, no quotation |
| 4Q521: heal the wounded, give life to the dead, good news to the poor | Dead Sea Scrolls | Verified (second check, search 2026-11-18): 4Q521 frag. 2 ii 12 (Wise, via Tabor: "heal the wounded, resurrect the dead, and proclaim glad tidings to the poor"; Strathearn 2011 via Wikipedia; BAS line-by-line). Paraphrase, no quotation marks; the text is fragmentary and translations vary |
| Collins on many messianic shapes | John J. Collins, The Scepter and the Star (1995) | Verified (second check, search 2026-11-18): publisher and reviews (four paradigms: king, priest, prophet, heavenly messiah; diversity as the main finding). Paraphrase |
| Wright on resurrection | N. T. Wright, The Resurrection of the Son of God (2003) | Verified (second check, search 2026-11-18): Gathercole's review (Themelios) and chapter summaries: resurrection expected for all at the end, not for one man in the middle of history. Paraphrase |

## Part 7: Family, honor, sickness and death

| Claim | Source | How checked |
|---|---|---|
| Divorce "for any cause whatsoever" | Josephus, Antiquities 4.253 | Verified (search): Whiston, Ant. 4.253 (the portrait paraphrases: "for any cause whatever") |
| Shammai and Hillel on Deuteronomy 24, marked as later | Mishnah Gittin 9:10 | Verified (second check, search 2026-11-18): Sefaria, TheTorah.com, Posen Library (Shammai: only unchastity; Hillel: even a spoiled dish) |
| Malina on honor | Bruce Malina, The New Testament World (1981) | Verified (second check, search 2026-11-18): John Knox Press 1981; contents list "Honor and shame: pivotal values of the first-century Mediterranean world". Paraphrase |
| Women's testimony "because of the levity and boldness of their sex" | Josephus, Antiquities 4.219 (Whiston) | Verified (repo ledger): `docs/work/essays/ledgers/did-the-resurrection-happen.md`, matched against Perseus Whiston |
| Jews thought it a crime to kill any later-born child | Tacitus, Histories 5.5 | Verified (repo ledger): `docs/work/essays/ledgers/the-children-rome-threw-away.md`, Fyfe text |
| Two flute players and one wailing woman, marked as later | Mishnah Ketubot 4:4 | Verified (search): Sacred Texts and Sefaria translations |
| Ossuaries about 20 BC to AD 70 | Rahmani; Fine | Verified (second check, search 2026-11-18): Steven Fine, "Why Bone Boxes?" BAR 27:5 (2001), via COJS: Rahmani dates the start to 20-15 BC; the practice nearly stopped in AD 70 |
| Yehohanan, 1968, Givat HaMivtar, 11.5 cm nail through the heel | archaeology | Verified (search): Wikipedia "Jehohanan" (Zias and Sekeles 1985); repo ledger did-the-resurrection-happen.md |
| Kloner: more than 900 burial caves, four with rolling stones | Amos Kloner, BAR 1999 | Verified (search): BAS library, "Did a Rolling Stone Close Jesus' Tomb?" |
| Urban von Wahlde's view | Urban C. von Wahlde, "A Rolling Stone That Was Hard to Roll", BAR, March/April 2015 | **Corrected (second check).** Bible History Daily ("How Was Jesus' Tomb Sealed?") reports that von Wahlde reads the Synoptic verbs (compounds of kuliō) as meaning roll, and takes John's "removed" as closer to burial practice. The old sentence ("the Gospel accounts still fit a smaller stone that could be rolled") did not match; it now says only what he pointed out. Summaries differ on his final conclusion, so the portrait does not state one |

## Corrections made on 2026-11-18 (closing run)

1. Nazareth: removed the attribution of "200 to 500" to Jonathan Reed; the
   sentence now says the numbers are careful guesses.
2. Babatha: "hidden ... in AD 132" became "hidden ... during the revolt that
   began in AD 132".
3. Great Isaiah Scroll: "copied around 125 to 100 BC" became "copied in the
   late second century BC".
4. Reina: "In 2016 archaeologists excavated" became "archaeologists have dug
   out ... The find was announced in 2017"; the source list's "(2016)" became
   "(announced 2017)".

## Second check (2026-11-18)

Every line marked "Not re-searched" in the closing run was checked again with
44 web searches and the local BSB text; the rows above now say "Verified
(second check ...)" or "**Corrected (second check)**". lexundria.com could not
be fetched from this machine, so Josephus sections were matched through search
results quoting Whiston, COJS and other translations. Six sentences changed:
Tacitus on the seventh day, the bread figure, the synagogue halls, Pliny's
placing of the Essenes, Theudas, and Urban von Wahlde. The before and after of
each is in `docs/work/elite/worlds.md`, section "Second check".

## What an editor should check next

The Nazareth to Sepphoris distance; stepped pools; Sanders on sacrifice
(Judaism: Practice and Belief); von Wahlde's own column, to see his final
conclusion; and, when a full text can be reached, Josephus by section from
Whiston or the Loeb rather than through search results.
