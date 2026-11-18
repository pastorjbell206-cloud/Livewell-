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
| Other references in the prose (Luke 2:7, 2:24, 2:44, 3:1, 3:13, 8:1-3, 10:34, 22:11; Mark 2:4, 5:26, 6:3, 13:1, 15:25; Matthew 1:19, 9:23, 17:27, 18:25, 19:3, 24:41, 27:57; John 6:23, 7:15, 9:2, 10:23, 19:20, 19:40; Acts 5:34, 5:36, 5:37, 23:8; Philippians 3:5; Exodus 12, 30; Leviticus 12 to 15, 19:18, 23; Numbers 19; Deuteronomy 6, 16:16, 24; 1 Chronicles 24; Daniel 12:2; Psalms 120 to 134) | Bible text | References only, not re-searched, except three short quotations checked against the local BSB text on 2026-11-18: Acts 5:37 "perished", Acts 5:34 "honored by all the people", Luke 3:13 "Collect no more than you are authorized" |
| Sirach 38:24, "The wisdom of the scribe depends on the opportunity of leisure" (RSV) | RSV | Verified (search): clerus.org RSV and biblia.com RSV give this wording |

## Part 1: The land and who ruled it

| Claim | Source | How checked |
|---|---|---|
| Galilee to Jerusalem in three days through Samaria | Josephus, Life 269 | Verified (search): Whiston at lexundria.com, Life 269 |
| Smallest Galilean village held above fifteen thousand; historians do not take it at face value | Josephus, Jewish War 3.43 | Verified (search): Whiston, War 3.43; scholars call the figure an exaggeration |
| Lake about 21 by 13 km | standard geography | Not re-searched |
| Pliny lists ten Decapolis cities, Damascus to Philadelphia, and admits other opinions | Pliny, Natural History 5.74 | Verified (search): Encyclopaedia Judaica summary at encyclopedia.com and JW Insight both report Pliny's list and his admission of disagreement |
| Scythopolis the only Decapolis city west of the Jordan | Britannica, Decapolis | Not re-searched |
| Herod king 37 BC to 4 BC, minority 1 BC, eclipse question | standard chronology | Not re-searched |
| Archelaus removed AD 6 | Josephus, Antiquities 17.342-344 | Verified (repo ledger): `docs/work/essays/ledgers/what-render-unto-caesar-actually-means.md` (Whiston 17.13.2) |
| Antipas held Galilee and Perea to AD 39; they paid him two hundred talents | Josephus, Antiquities 17.318 | Verified (search): Whiston, Ant. 17.318 and War 2.95 give 200 talents |
| Pilate stone, Caesarea theater, 1961, only inscription naming him | archaeology | Verified (repo ledger): `docs/work/essays/ledgers/the-historical-jesus.md` and `docs/work/elite/apol-ledger.md` |
| Pilate about AD 26 to 36 | Josephus, Antiquities 18.89 | Verified (repo ledger): what-render-unto-caesar ledger (Whiston 18.4.2, "ten years") |
| Caiaphas high priest about 18 to 36; ossuary found 1990 in the Peace Forest, "Joseph son of Caiaphas," identification debated | archaeology | Verified (search): Wikipedia "Caiaphas ossuary"; BAS library; COJS |
| Census under Quirinius AD 6; Judas taught the tax meant slavery, God alone ruler | Josephus, Antiquities 18.4, 18.23 | Verified (repo ledger): what-render-unto-caesar ledger (Whiston 18.1.1, 18.1.6) |
| Nazareth a few hundred people, often given as 200 to 500 | modern estimates | **Corrected.** A search found the 200 to 500 range in secondary material but could not confirm it is Reed's own figure; the attribution to Reed was removed and the sentence now says the numbers are careful guesses |
| Sepphoris about 5 or 6 km north; burned by Varus, rebuilt by Antipas | Josephus, Antiquities 17.289; 18.27 | Not re-searched |
| Tiberias built on graves; settlers unclean; Antipas gave houses and land | Josephus, Antiquities 18.36-38 | Not re-searched |
| Hours counted from sunrise; Passover on 14 Nisan | Mark 15:25; Exodus 12; Leviticus 23 | Not re-searched (biblical references) |
| Samaritan temple on Gerizim destroyed by John Hyrcanus about 111 or 110 BC, dated by coins | Magen's excavations | Verified (search): BAS New Encyclopedia of Archaeological Excavations entry (coins date destruction about 110 BC) |
| Samaritans scattered bones in the Temple at Passover; Galilean pilgrims killed at Ginea | Josephus, Antiquities 18.29-30; 20.118 | Not re-searched |

## Part 2: A day and a year

| Claim | Source | How checked |
|---|---|---|
| Courtyard houses of basalt at Capernaum; beam-and-earth roofs | archaeology; Mark 2:4 | Not re-searched |
| Bailey's reading of kataluma; same word in Luke 22:11, not in Luke 10:34 | Kenneth Bailey, Jesus Through Middle Eastern Eyes (2008); Greek text | Not re-searched (word use is checkable in any Greek New Testament) |
| Bread at least half the diet | Susan Weingarten, drawing on Magen Broshi | Not re-searched |
| Galilee boat: 1986, Ginosar, about 8.2 by 2.3 m, first century BC to first century AD | archaeology | Verified (search): Israel Foreign Ministry (carbon tests, 100 BC to AD 70); length "just over 27 feet" (8.2 m); width given as 7.5 to 8 ft in different sources, 2.3 m in the IAA account |
| Rebels burned the archives to destroy the moneylenders' bonds, AD 66 | Josephus, Jewish War 2.427 | Not re-searched |
| Herod and Antipas struck bronze coins without human faces | numismatics | Not re-searched |
| Tacitus: the Jews gave the seventh day to idleness | Tacitus, Histories 5.4 | Not re-searched (repo ledger the-children-rome-threw-away.md checks Histories 5.5 in the Fyfe text, not 5.4) |
| About a thousand killed on the Sabbath; Mattathias decides to fight | 1 Maccabees 2:29-41 | Not re-searched |
| Damascus Document forbids helping an animal give birth, or lifting it from a pit, on the Sabbath | CD 11.13-14 | Verified (search): COJS, Schiffman, "The Sabbath Code" |
| 256,500 lambs counted; Josephus's millions too high | Josephus, Jewish War 6.422-425 | Verified (search): Whiston, War 6.424 |
| Jeremias: about 125,000 visitors at Passover | Jeremias, Jerusalem in the Time of Jesus | Verified (search): Christian Courier citing Jeremias pp. 79-83; BAS on his lamb-count method |
| Psalms 120 to 134 each headed "A song of ascents" | Psalms | Not re-searched |
| A denarius a day's wage | Matthew 20:2 | Verified (repo ledger): what-render-unto-caesar ledger |

## Part 3: The Temple

| Claim | Source | How checked |
|---|---|---|
| Rebuilding began in Herod's eighteenth year | Josephus, Antiquities 15.380 | Not re-searched |
| Western Wall tunnel stone about 13.6 m; weight estimates 250 to over 500 tons | archaeology | Verified (search): Wikipedia "Western Stone" (13.55 to 13.6 m; 567 tonnes old estimate, 250 to 300 tonnes after Jol's 2006 radar) |
| Warning notices in Greek and Latin | Josephus, Jewish War 5.193-194 | Verified (search): sources citing War 5.193-194 |
| Complete inscription found by Clermont-Ganneau 1871; fragment 1936; argument over whether the penalty was carried out | archaeology | Verified (search): Wikipedia "Temple Warning inscription" (Iliffe, 1936, IAA 1936-989) |
| Holy of Holies entered once a year by the high priest | Leviticus 16 | Not re-searched |
| Sanders on sacrifice | E. P. Sanders, Judaism: Practice and Belief (1992) | Not re-searched; paraphrase, no quotation |
| Two doves for the poor; Mary and Joseph's offering | Leviticus 12:8; Luke 2:24 | Not re-searched (references) |
| Twenty-four priestly divisions; Zechariah of Abijah | 1 Chronicles 24; Luke 1:8-9 | Not re-searched (references) |
| Tyrian shekel: nearly pure silver, Melqart-Herakles and an eagle, used for the Temple tax | numismatics | Verified (search): Bible Archaeology (ABR), about 94 percent silver, Melqart-Herakles obverse, eagle reverse |
| Temple burned on the tenth of Lous (Av), the same day as the first Temple | Josephus, Jewish War 6.250 | Verified (search): Whiston, War 6.250 |
| Vespasian's two-drachma tax to Jupiter Capitolinus | Josephus, Jewish War 7.218 | Not re-searched |

## Part 4: Synagogue, Scripture and school

| Claim | Source | How checked |
|---|---|---|
| "Synagogue" before 70 could mean the gathering or a house | Lee Levine, The Ancient Synagogue (2000) | Not re-searched |
| Thousands of schools open on the seventh day in every city | Philo, Special Laws 2.62 | Verified (search) in substance: Perseids text of Spec. 2.62 ("innumerable lessons ... in every city"); paraphrase, no quotation marks |
| Moses ordered a weekly gathering to hear the law | Josephus, Against Apion 2.175 | Not re-searched |
| Pre-70 halls at Gamla, Masada, Herodium; Magdala 2009 with benches and a menorah stone | archaeology | Verified (search) for Magdala: Wikipedia "Migdal Synagogue", Israel Foreign Ministry 2009, Live Science. Gamla, Masada, Herodium not re-searched |
| Theodotus inscription: built "for the reading of the law and for the teaching of the commandments," guest house, rooms, water installations; most date it before 70 | archaeology | Verified (search): Wikipedia "Theodotos inscription" (found 1913 by Weill); COJS. Note: some translators mark the water phrase as uncertain |
| Twice-daily remembrance, read by many as the Shema | Josephus, Antiquities 4.212 | Verified (search): Whiston, Ant. 4.212; Kugel |
| Tefillin found at Qumran | archaeology | Not re-searched |
| Aramaic words in Mark 5:41, 7:34, 15:34 | Mark | Not re-searched (references) |
| Babatha's papers: Greek contracts signed in Aramaic or Nabataean | Cave of Letters | Verified (search): COJS (Saldarini, BAR 1998); JWA encyclopedia. **Corrected:** "hidden in AD 132" became "hidden during the revolt that began in AD 132" |
| Bar-Ilan: about three percent literate; Hezser (2001) | Bar-Ilan (1992); Hezser (2001) | Verified (search): Bar-Ilan Univ. CRIS listing; Wikipedia, "probably less than 3%" |
| Great Isaiah Scroll about 7.3 m, 54 columns | archaeology | Verified (search): Wikipedia "Isaiah Scroll" (7.34 m, 54 columns). **Corrected:** the date "125 to 100 BC" became "the late second century BC", since sources give 150 to 100 BC on the hand and wider radiocarbon ranges |

## Part 5: Pharisees, Sadducees, Essenes and the rest

| Claim | Source | How checked |
|---|---|---|
| Three schools and a fourth | Josephus, Antiquities 18.11-25 | Verified (repo ledger): what-render-unto-caesar ledger (Whiston 18.1.2, 18.1.6) |
| Pharisees handed on unwritten practices the Sadducees rejected | Josephus, Antiquities 13.297 | Not re-searched |
| Pharisees' influence over Sadducees in office | Josephus, Antiquities 18.15, 17 | Not re-searched |
| More than six thousand Pharisees refused the oath | Josephus, Antiquities 17.42 | Verified (search): Whiston, Ant. 17.42 |
| Neusner and Sanders disagree on Pharisaic purity | modern scholarship | Not re-searched (a well-known debate; no quotation) |
| Gamaliel "honored by all the people" | Acts 5:34 | Verified against the local BSB text |
| Essenes about four thousand | Philo, Every Good Man Is Free 75; Josephus, Antiquities 18.20 | Not re-searched |
| Essenes by the Dead Sea, without women and money, with palm trees | Pliny, Natural History 5.73 | Not re-searched: the search returned only 5.74 and attalus.org could not be reached. Flagged for a check |
| About 900 scrolls, eleven caves, 1947 to 1956; every book but Esther | Dead Sea Scrolls | Not re-searched |
| "until the coming of a prophet and the messiahs of Aaron and Israel" | 1QS 9.11 | Verified (search): BAS ("until there shall come the Prophet and the Messiahs of Aaron and Israel"); wording differs a little between translators, and the portrait's line follows the common rendering |
| Theudas | Josephus, Antiquities 20.97-98; Acts 5:36 | Not re-searched |
| Zealots as a named party belong to 66 to 70 | modern scholarship | Not re-searched (the portrait marks it "may") |
| Sanders on "sinners" | E. P. Sanders, Jesus and Judaism (1985) | Not re-searched; paraphrase, marked as debated |

## Part 6: What people believed and hoped for

| Claim | Source | How checked |
|---|---|---|
| Common Judaism; covenantal nomism | Sanders (1977, 1992) | Not re-searched; paraphrase |
| Stepped pools and stone vessels; the rule written only in the Mishnah | archaeology; Mishnah | Not re-searched |
| Reina cave workshop near Kafr Kanna | archaeology | Verified (search): Israel Foreign Ministry and Mosaic, Y. Adler for the IAA. **Corrected:** "In 2016" became "announced in 2017", the date the reports carry |
| Psalms of Solomon 17, a son of David to purge Jerusalem of gentiles | Psalms of Solomon | Not re-searched |
| 4Q521: heal the wounded, give life to the dead, good news to the poor | Dead Sea Scrolls | Not re-searched |
| Collins on many messianic shapes | John J. Collins, The Scepter and the Star (1995) | Not re-searched; paraphrase |
| Wright on resurrection | N. T. Wright, The Resurrection of the Son of God (2003) | Not re-searched; paraphrase |

## Part 7: Family, honor, sickness and death

| Claim | Source | How checked |
|---|---|---|
| Divorce "for any cause whatsoever" | Josephus, Antiquities 4.253 | Verified (search): Whiston, Ant. 4.253 (the portrait paraphrases: "for any cause whatever") |
| Shammai and Hillel on Deuteronomy 24, marked as later | Mishnah Gittin 9:10 | Not re-searched (the search on Ant. 4.253 cites m. Gittin 9:10 for Hillel) |
| Malina on honor | Bruce Malina, The New Testament World (1981) | Not re-searched; paraphrase |
| Women's testimony "because of the levity and boldness of their sex" | Josephus, Antiquities 4.219 (Whiston) | Verified (repo ledger): `docs/work/essays/ledgers/did-the-resurrection-happen.md`, matched against Perseus Whiston |
| Jews thought it a crime to kill any later-born child | Tacitus, Histories 5.5 | Verified (repo ledger): `docs/work/essays/ledgers/the-children-rome-threw-away.md`, Fyfe text |
| Two flute players and one wailing woman, marked as later | Mishnah Ketubot 4:4 | Verified (search): Sacred Texts and Sefaria translations |
| Ossuaries about 20 BC to AD 70 | Rahmani; Fine | Not re-searched |
| Yehohanan, 1968, Givat HaMivtar, 11.5 cm nail through the heel | archaeology | Verified (search): Wikipedia "Jehohanan" (Zias and Sekeles 1985); repo ledger did-the-resurrection-happen.md |
| Kloner: more than 900 burial caves, four with rolling stones | Amos Kloner, BAR 1999 | Verified (search): BAS library, "Did a Rolling Stone Close Jesus' Tomb?" |
| Urban von Wahlde's view | modern scholarship | Not re-searched; named in the text without a work, and not in the source list |

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

## What an editor should check next

The lines marked "Not re-searched" above, Pliny 5.73 first, then the
Josephus sections not yet matched (Ant. 13.297, 15.380, 17.289, 18.15-20,
18.27, 18.29-30, 18.36-38, 20.97-98, 20.118; War 2.427, 7.218; Against Apion
2.175), Tacitus Histories 5.4, Philo Every Good Man Is Free 75, 4Q521 and
Psalms of Solomon 17, and the Weingarten and Broshi diet figure.
