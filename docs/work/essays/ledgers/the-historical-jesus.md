# Claims ledger: the-historical-jesus

Essay: `docs/work/essays/the-historical-jesus.md` ("Was Jesus Real? What Historians Actually Know"). The writer's ledger (2026-10-26) was replaced by a verifier's ledger on 2026-10-27 (the "first run"). A second run the same day (the "closing run") worked through every line the first run had left open. Every line below says what was actually done and by which run. The essay folds in no old slugs (NOTES.md lists none for it; the-historical-jesus-without-the-shortcuts folds into did-the-resurrection-happen).

## Closing run (2026-10-27): what it could reach

Seven WebSearch calls returned results. The eighth and ninth came back "this turn's web search budget is used up (limit: 200 WebSearch calls per turn, shared by every agent in it)", so the rest of the run had no search. WebFetch of en.wikipedia.org failed (getaddrinfo ENOTFOUND), and curl to archive.org, gutenberg.org, hathitrust.org, en.wikipedia.org and fadedpage.com got no connection. GitHub (git clone and raw.githubusercontent.com) worked. Everything below that is not a search match rests on public-domain texts read from GitHub.

Open at the start of the closing run: 50 claim lines (every line marked not rechecked, paraphrased or generalized by the first run, plus "went over to the Romans", which was not separately checked). Outcome: 18 verified with the essay unchanged, 4 corrected in the essay, none newly paraphrased or cut, 28 still open (listed at the end, with what would close each). The 25 Scripture quotations were already matched against the ESV copy in the first run; the closing run re-ran that comparison on the current essay (all 25 match) but had no search left to check them against ESV snippets, so they still wait for James's API key.

Methods added in the closing run (the first run's methods are described further down):

- **"Search"**: a WebSearch result summary seen in the closing run, with the pages it named. These are summaries, not pages opened. The seven searches: (1) Schweitzer, "There is no historical task which so reveals a man's true self ..." (named en.wikiquote.org/wiki/Albert_Schweitzer and quotepark.com); (2) Schweitzer, "a figure designed by rationalism ..." (southerncrossreview.org/48/schweitzer-quest.htm, a Logos/Faithlife listing, Gutenberg eBook 45422); (3) and (4) Barton, *The Man Nobody Knows* (en.wikipedia.org/wiki/The_Man_Nobody_Knows, encyclopedia.com "Bruce Barton", christianhistoryinstitute.org); (5) Barna, "What Do Americans Believe About Jesus? 5 Popular Beliefs" (barna.com and barna.org copies, bciowa.org reprint); (6) the Apostles' Creed (vaticannews.va "The Apostles' Creed", placefortruth.org); (7) the Pilate stone (en.wikipedia.org/wiki/Pilate_stone, madainproject.com and others).
- **"Gutenberg Schweitzer"**: Project Gutenberg eBook 45422, *The Quest of the Historical Jesus*, translated by W. Montgomery (title page: second English edition, London, Adam and Charles Black, 1911; F. C. Burkitt's preface signed "Cambridge, 1910"), cloned from github.com/GITenberg/The-Quest-of-the-Historical-Jesus_45422 (commit f0c0077) into the scratchpad (`sources/schweitzer-45422`). File `45422-0.txt`, whitespace normalized, then searched.
- **"WDB"** (more files than the first run read): Eusebius, *Church History* Books 1, 2, 3 and 10 with McGiffert's notes; Origen, *Against Celsus* Books 1 and 8; Irenaeus, *Against Heresies* Book 3. Same clone and method as the first run.
- **"Perseus Whiston"** (more passages): *War* 2.5.2, 2.9.1, 3.8.7 and 3.10.7 in the same file as the first run.
- **"Perseus Tacitus"** (more passages): *Annals* 11.11 and the Book XV heading, same file as the first run.
- **"Perseus Cicero"**: `phi0474.phi005.perseus-eng2.xml` (*Against Verres*; TEI header names Charles Duke Yonge as translator) from github.com/PerseusDL/canonical-latinLit, fetched from raw.githubusercontent.com on 2026-10-27.
- **"Site creed"**: `client/public/creeds/documents/apostles-creed.json` in this repository.

## Changes made to the essay in the closing run

1. Barna. "In a Barna survey of American adults a decade ago" became "in 2015." Search (5) gives the article as Barna's 2015 release (a reprint is dated April 1, 2015); 2015 is eleven years before this run.
2. Schweitzer. "who founded the kingdom of God on earth" became "who founded the kingdom of heaven on earth." Gutenberg Schweitzer, chapter XX ("Results"): "The Jesus of Nazareth who came forward publicly as the Messiah, who preached the ethic of the Kingdom of God, who founded the Kingdom of Heaven upon earth, and died to give His work its final consecration, never had any existence."
3. Celsus. "wrote against the Christians late in the second century" became "in the second century." The only dating seen in this run is Origen's (WDB, *Against Celsus* 1.8): Celsus lived "in the time of Adrian, and later." The usual modern dating to about 175 to 180 was not seen.
4. "Carrier and other mythicists read "brother of the Lord" as a title" became "read "the Lord's brother" as a title." The quoted phrase now repeats the ESV wording of Galatians 1:19, quoted just before it; "brother of the Lord" stood in quotation marks but matched no ESV verse (1 Corinthians 9:5 has the plural "brothers of the Lord").

After these edits: no em-dash (U+2014) in the essay (grep count 0), the only exclamation point is inside Mark 8:33, and none of the CLAUDE.md forbidden words appear (grep).

## First run (2026-10-27): no web search was available

The workflow's shared web-search budget was used up before the first run began. Its first two WebSearch calls (Mark 3:21 and Galatians 4:4 with Romans 1:3 in the ESV) both came back "this turn's web search budget is used up," and no search result was seen in that run. WebFetch of www.esv.org/Mark+3/ and of biblehub.com/esv/mark/3.htm failed (getaddrinfo ENOTFOUND), and curl to biblehub.com, biblestudytools.com, bible.com and openbible.info was refused by the sandbox proxy (CONNECT 403). The only outside sources reachable were public-domain or openly posted texts on GitHub.

The writer's ledger had recorded search-summary matches on 2026-10-26 for the Schweitzer and Barton quotations, the Barna figures, the Berlin debate date and venue, and several smaller details. The first run could not repeat any of them. So the quotations nothing in that run could confirm became marked paraphrase, the survey figures were generalized, and the debate date was generalized. The exact earlier wording is kept below under "Original wording, for restoring," with what the closing run found for each.

The first run's methods, and what the words below mean:

- **"WDB"**: read in the scratchpad clone of github.com/HistoricalChristianFaith/Writings-Database (`wdb`, commit 328918a), with `git show 'HEAD:<path>'` and the HTML tags stripped. Eusebius, *Church History*: the NPNF translation with McGiffert's notes, identified by its wording and notes, not by a label in the file. Origen, *Against Celsus*: the ANF translation, identified by its wording, not by a label in the file.
- **"Perseus Whiston"**: read in a blobless clone of github.com/PerseusDL/canonical-greekLit (scratchpad `cgl`, commit 0189b9c) with `git show`: `tlg0526.tlg004.perseus-eng2.xml` (*Jewish War*), `tlg0526.tlg001.perseus-eng2.xml` (*Antiquities*), `tlg0526.tlg002.perseus-eng2.xml` (*Life*). The TEI headers of all three name William Whiston as translator. Tags stripped, then grepped.
- **"Perseus Tacitus"**: `phi1351.phi005.perseus-eng1.xml` from github.com/PerseusDL/canonical-latinLit, fetched from raw.githubusercontent.com on 2026-10-27. Its TEI header names Alfred John Church and William Jackson Brodribb as translators.
- **"ESV copy"**: the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown," parsed by its author from javascripture's ESV JSON), cloned into the scratchpad (`sources/esv-mdbible`, commit fd66568, dated 2022-01-20) and read with `git show`. A script (`scratchpad/hj-check/check.py`) compared each quotation with the verse text after normalizing case, punctuation and spacing; all 25 checks matched word for word, and punctuation was then compared by eye. The closing run re-ran the script on the current essay: all 25 still match. The copy drops quotation marks inside verses and does not say which ESV edition it is. It is not esv.org or the ESV API; recheck with James's API key once it exists.
- **"Not rechecked"**: kept in the essay without any source opened. In the claim lines below, this now appears only on lines the closing run also could not close.
- **"Generalized"** / **"Paraphrased"**: the essay was changed because nothing reachable could confirm the exact wording or figure.

## Changes made to the essay in the first run

1. Luke. The essay said "Mark, Matthew and Luke all say Jesus was baptized by John." In the ESV copy, Luke 3:19-20 reports John locked in prison by Herod, and Luke 3:21 then says "when Jesus also had been baptized" without naming who baptized him. Corrected to: Mark and Matthew say John baptized him; Luke mentions the baptism without saying who performed it.
2. Jesus son of Ananias. The essay said "The city's leaders had him beaten and handed him to the governor." Perseus Whiston (*War* 6.5.3) has "certain of the most eminent among the populace" beat him and then "our rulers" brought him to the procurator. Corrected to: some of the city's leading men had him beaten, and its rulers handed him to Albinus.
3. Josephus in Rome. "Spent the rest of his life in Rome" became "settled in Rome, where he wrote his people's history." Perseus Whiston (*Life*) confirms Vespasian housed him in Rome and made him a citizen; nothing opened says where he died.
4. "Every account of his life that survives was written by people who believed God had raised him" became "Every full account of his life that survives ...", because the essay itself later quotes Celsus's hostile sketch of Jesus' life.
5. Pilate. "Appears by name in only one known inscription" became "only one known stone inscription." Reason (first verifier's knowledge, not checked): a copper-alloy ring from Herodium inscribed with the name Pilatus was published in 2018, and whether it belonged to Pontius Pilate is disputed.
6. Berlin debate: date, venue and "two-night" generalized to "Early in 1910 ... in Berlin." "Carried it from city to city" became "kept making the case."
7. Barna: year and both percentages generalized. (The closing run restored the year; see above.)
8. Schweitzer: three quotations became marked paraphrase.
9. Barton: the quotation became marked paraphrase; "went to the top of the nonfiction best-seller list" became "became a best-seller."
10. Sallman: "The USO and the Salvation Army" became "Christian groups"; "by some estimates ... more than half a billion times by the century's end" became "printed by the millions."
11. Jesus Seminar: "Critics such as the New Testament scholar Richard Hays objected" became "Other New Testament scholars objected."

## Voice pass and final audit (2026-10-27)

A later reader revised the prose for voice. No fact, quotation, number, date, name or link was added; a script confirmed all 35 quoted strings, all three links and every Scripture reference were unchanged. What changed that touches a claim:

1. Sanders: "his 1985 book *Jesus and Judaism*" became "his book *Jesus and Judaism*" (year dropped to thin the run of title-and-year citations; the date itself was not in question).
2. Celsus and the Gospel opponents: "a real village, a real mother and a real trade" became "a man Celsus plainly took to be real, a man with a home village and a mother who spun for her living," which tracks the WDB wording of *Against Celsus* 1.28 matched below. "Called Jesus illegitimate, a sorcerer, a deceiver" became "illegitimate and a sorcerer"; "deceiver" had no line in this ledger and was cut, not checked.
3. Schweitzer: "Most Christians have rejected that reconstruction, with good reason" lost "with good reason," an unargued judgment.
4. Paul: "his letters are the earliest Christian writings we have" became "his letters are older than any of the Gospels," which rests on the datings listed below (most letters in the 50s; Mark around 70).
5. Wording only, no claim: two headings ("What the Skeptic Gets Right" became "The Case That Jesus Never Lived"; "The Jesus We Keep Inventing" became "Why the Portraits of Jesus Keep Changing"), "That's a fair question" removed, the church-portraits paragraph and the Caesarea Philippi lead-in reworded, and the closing line now confesses the resurrection in the first person ("Christians confess that he did not stay dead, and I believe it").

## Original wording, for restoring

Restore only what a run that saw the source confirmed word for word. The closing run's finding is given for each.

- Opening: "On January 31, 1910, the German Monist League opened a two-night public debate in Berlin's Zoological Garden over whether Jesus had ever lived." The writer's 2026-10-26 search summary gave the published proceedings' title as "Berliner Religionsgespräch des Deutschen Monistenbundes am 31. Januar und 1. Februar 1910 im Zoologischen Garten." Closing run: not confirmed (no search left). Do not restore yet.
- "But Drews carried it from city to city" (writer cited a summary of B. B. Warfield, 1910). Closing run: not confirmed. Do not restore yet.
- "When Barna asked in 2015, 92 percent of American adults said Jesus was a real person who actually lived. Among the youngest adults it surveyed, the figure was 87 percent." Closing run: confirmed by search (5), which reports 92 percent of U.S. adults saying Jesus was a real person and "only 87 percent of Millennials" agreeing he actually lived, in the 2015 article. The year is restored in the essay; the two figures may be restored too.
- Schweitzer (Montgomery translation): "In his English translator's words, "each individual created Him in accordance with his own character." He added, "There is no historical task which so reveals a man's true self as the writing of a Life of Jesus."" Closing run: both sentences confirmed word for word in Gutenberg Schweitzer, chapter I ("The Problem"). Safe to restore.
- Schweitzer: "never existed: "He is a figure designed by rationalism, endowed with life by liberalism, and clothed by modern theology in an historical garb."" Closing run: confirmed word for word in Gutenberg Schweitzer, chapter XX ("Results"). Safe to restore.
- Barton: "a man who "picked up twelve men from the bottom ranks of business and forged them into an organization that conquered the world." It went to the top of the nonfiction best-seller list." Closing run: the best-seller claim is confirmed by search (3) and (4) ("topped the nonfiction bestseller list" in 1925). The quotation is not confirmed word for word: search (3) said secondary sources word it differently ("forged them into an organization that conquered the world" against "created an organization that won the world") and advised checking a scan of the 1925 text. Keep the paraphrase until that scan is seen.
- Sallman: "The USO and the Salvation Army handed pocket-sized copies to soldiers in the Second World War, and by some estimates it had been reproduced more than half a billion times by the century's end." (The writer's own note said the YMCA, not the USO, appeared in some sources; settle that before restoring.) Closing run: not confirmed.
- "Critics such as the New Testament scholar Richard Hays objected that the votes came from a self-selected group with a shared point of view." Closing run: not confirmed.

## Berlin, 1910 (opening)

- A public debate in Berlin early in 1910, staged by the German Monist League, over whether Jesus had lived. Not rechecked; still open (date and venue were generalized in the first run; the closing run had no search left).
- Arthur Drews, professor of philosophy at the technical university in Karlsruhe. Not rechecked; still open. Gutenberg Schweitzer (the 1906 work, in its 1911 English edition) does not mention Drews.
- *The Christ Myth* published the year before (1909); argued there was no historical man behind the Gospels. Not rechecked; still open. The gloss "a figure of religious myth who had later been given a human story" is a general paraphrase of his thesis, without quotation marks.
- Bruno Bauer pressed a version of the idea in the nineteenth century. Verified in the closing run against Gutenberg Schweitzer, chapter XI ("Bruno Bauer. The First Sceptical Life of Jesus"): after his study of the Pauline letters "ten years later (1850-1851)," Bauer's "result is negative: there never was any historical Jesus."
- Theologians answered him; a public controversy in Germany for several years. Not rechecked; still open.

## Survey

- A Barna survey of American adults in 2015: the overwhelming majority said Jesus was a real person; the youngest adults were a little less likely to say so. Verified in the closing run by search (5): 92 percent of U.S. adults said Jesus was a real person; 87 percent of Millennials agreed he actually lived. The year was corrected in the essay (closing-run change 1); the figures stay general.

## Overstatements Christians make

- Some Christians have said the evidence for Jesus is better than for Julius Caesar, or that no serious person has doubted him; both are said to be untrue. Characterization, no source. The essay's own opening (Drews, and Bauer, confirmed above) disproves the second.

## What is missing

- No document from Jesus' lifetime mentions him; no inscription, coin, letter or trial record; he left no writings. Not rechecked (standard); still open.
- Every full account of his life that survives was written by believers in the resurrection. Not rechecked; still open (wording changed in the first run; see its change 4).
- Mark usually dated around 70, some forty years after the crucifixion. Still open as a claim about how scholars date Mark. What the closing run did see is consistent with it: Irenaeus (WDB, *Against Heresies* 3.1.1) says Mark wrote "after their departure," that is, after Peter and Paul had died; McGiffert (WDB, Eusebius 2.22, notes) dates the Neronic persecution to "June, 64 a.d."; and McGiffert (WDB, Eusebius 1, notes) says "Tertullian, Lactantius, Augustine, and others put Christ's death in 783 U.C., that is in 30 a.d." (the same note gives 32 from the Chronicle of Eusebius and 31 from Jerome's version). Forty years is the arithmetic from 30 to 70.
- Paul says little about Jesus' movements, miracles or most of his teaching. Not rechecked (standard observation); still open.

## Carrier and Ehrman

- Richard Carrier, *On the Historicity of Jesus*, 2014, Sheffield Phoenix Press, a biblical studies publisher. Not rechecked; still open.
- He weighs the evidence with probability theory; argues the first Christians believed in a heavenly Jesus known through visions and Scripture, later given an earthly biography in the Gospels; Paul's near-silence carries much of the weight. Not rechecked (characterization of his thesis; no quotation marks); still open.
- Carrier and other mythicists read the phrase as a title any believer might carry. Corrected in the closing run (change 4): the quoted phrase is now the ESV wording of Galatians 1:19, "the Lord's brother," matched against the ESV copy in the first run. The characterization of Carrier's reading itself is not rechecked; still open.
- Carrier grants that the near-universal judgment of qualified experts is against him. Not rechecked; paraphrase, no quotation marks; still open.
- Bart Ehrman, agnostic, *Did Jesus Exist?* (2012), written against the mythicists; concludes Jesus was a Jewish preacher crucified under Pontius Pilate in the reign of Tiberius. Not rechecked; still open.
- The consensus holds among Jewish, Christian and secular scholars. Characterization; not rechecked; still open.

## Pilate

- Pilate governed Judea for ten years. Matched (first run) against Perseus Whiston (*Antiquities* 18.4.2): "So Pilate, when he had tarried ten years in Judea, made haste to Rome."
- His name appears in only one known stone inscription. Verified in the closing run by search (7): the Pilate stone, found at Caesarea in June 1961 and now in the Israel Museum, is described as the only known occurrence of the name Pontius Pilate in an ancient inscription (one source) and as the only contemporary record of him (another). The 2018 Herodium ring (first run, change 5) was not seen in this run; "stone inscription" leaves it aside either way.

## Paul

- Most of Paul's letters date from the 50s, some twenty to twenty-five years after the crucifixion. Still open as to the letters' dates. Seen in the closing run: the crucifixion year of 30 in McGiffert's note (see "What is missing"), and McGiffert's chronology (WDB, Eusebius 2.22, note 237 and following) putting Paul in Rome "as early as 62 a.d." after being sent from Caesarea "as early as the autumn of 61." No source seen dates the letters themselves.
- Galatians 4:4 (part) "born of woman, born under the law". Matched word for word against the ESV copy.
- Romans 1:3 (part) "descended from David according to the flesh". Matched word for word against the ESV copy.
- 1 Corinthians 11:23 (part) "on the night when he was betrayed". Matched word for word against the ESV copy.
- Paul returns to the crucifixion again and again. Characterization; 1 Corinthians 1:23 below is one instance.
- Galatians 1:19 "But I saw none of the other apostles except James the Lord's brother." Matched word for word against the ESV copy.
- Context: Paul's first visit to Jerusalem after his conversion. Read in the ESV copy (Galatians 1:18, "after three years I went up to Jerusalem to visit Cephas").
- 1 Corinthians 9:5 "Do we not have the right to take along a believing wife, as do the other apostles and the brothers of the Lord and Cephas?" Matched word for word against the ESV copy.
- Mark 6:3 "Is not this the carpenter, the son of Mary and brother of James and Joses and Judas and Simon?" Matched word for word against the ESV copy. The people of Nazareth taking offense: same verse in the ESV copy ("And they took offense at him").
- James was a leader of the church in Jerusalem. Read in the ESV copy (Galatians 2:9, "James and Cephas and John, who seemed to be pillars").

## Josephus

- A priest's son. Matched against Perseus Whiston: *War* preface, "Joseph, the son of Matthias, by birth a Hebrew, a priest also"; *Life*, "sprung from a sacerdotal family." Also in WDB, Eusebius 3.9.1.
- Commanded Jewish forces in Galilee in the revolt. Matched against Perseus Whiston (*War* 2.20.4): "Josephus, the son of Matthias, of both the Galilees."
- Went over to the Romans and settled in Rome. Settled in Rome matched (first run) against Perseus Whiston (*Life*): Vespasian "gave me an apartment in his own house" in Rome and "the privilege of a Roman citizen." Went over to the Romans verified in the closing run against Perseus Whiston (*War* 3.8.7): after Jotapata he prays, "I protest openly that I do not go over to the Romans as a deserter of the Jews, but as a minister from thee," and then "complied with Nicanor's invitation."
- *Antiquities* has twenty books; Book 20 is the last. WDB (Eusebius 3.9.3, "the whole of the Antiquities of the Jews in twenty books").
- Finished in the 90s. Matched against Perseus Whiston (*Antiquities* Book 20, Whiston's chapter 12, the book's closing lines): "the thirteenth year of the reign of Caesar Domitian, and the fifty-sixth year of my own life" (93/94).
- Ananus acted between Festus's death and Albinus's arrival. WDB (Eusebius 2.23.21-22, quoting *Antiquities* 20): "supposing that he had a favorable opportunity on account of the fact that Festus was dead, and Albinus was still on the way, called together the Sanhedrim." Also matched in Perseus Whiston ("Festus was now dead, and Albinus was but upon the road").
- "Around the year 62." Verified in the closing run against McGiffert's notes in WDB: Eusebius 2.22, note 237, Festus's "death occurred before the summer of 62 a.d."; Eusebius 2.23, note 286, "Albinus succeeded Festus in 61 or 62 a.d."; note 287, Ananus was "appointed high priest by Agrippa II. in 61 or 62 a.d., and held the office but three months."
- Quotation "brought before them the brother of Jesus, the so-called Christ, James by name, together with some others". Matched word for word in WDB (Eusebius 2.23.22, McGiffert's rendering of Josephus); rechecked in the closing run. Whiston's own rendering differs ("the brother of Jesus, who was called Christ, whose name was James"); the essay uses the Eusebius translation.
- Had them stoned. WDB (Eusebius 2.23.22, "condemned them to be stoned").
- The story is about Ananus abusing his office. WDB (Eusebius 2.23.23: the moderate citizens protested that he could not lawfully convene the Sanhedrin without the governor).
- Most historians, including many with no Christian commitment, accept the James passage. Not rechecked (standard); still open.
- Quotation of the longer passage as Eusebius gives it: "a wise man, if indeed it be proper to call him a man" and "He was the Christ." Matched word for word in WDB (Eusebius 1.11.7); rechecked in the closing run.
- Eusebius quoted it in the fourth century. Verified in the closing run in WDB: his *Church History*, where he quotes it (1.11.7), runs in Book 10 to events McGiffert's notes date to 311 and 312 ("The Edict of Galerius was issued in April, 311"; decrees published "in June, 312, or thereabouts"), so the work as he finished it is a fourth-century work.
- Many specialists think Josephus wrote a shorter notice that copyists improved; the argument continues. Still open for present-day scholarship. Seen in the closing run: McGiffert's note on Eusebius 1.11 (WDB, note 186) lists four opinions and says of "(3) It is partly genuine and partly interpolated" that "This opinion has, perhaps, the most defenders"; McGiffert himself held it "entirely spurious," so the argument was live in his day.

## Jesus son of Ananias (*Jewish War* 6.5.3)

- A countryman who began about four years before the revolt to cry out against Jerusalem and its temple. Matched against Perseus Whiston ("a plebeian and an husbandman, who, four years before the war began ... a voice against Jerusalem and the holy house") and WDB (Eusebius 3.8.7, "a common countryman, four years before the war"; McGiffert's note 99 there: "in 62 a.d. for, according to Josephus, the war began in 66 a.d.").
- Some of the city's leading men had him beaten; its rulers handed him to the governor Albinus. Matched against Perseus Whiston ("certain of the most eminent among the populace ... gave him a great number of severe stripes ... our rulers ... brought him to the Roman procurator ... Albinus (for he was then our procurator)"). Wording corrected in the first run (its change 2).
- Flogged until his bones showed. Perseus Whiston ("whipped till his bones were laid bare"); WDB (Eusebius 3.8.9, "scourged to the bone").
- He would not answer the governor's questions; Albinus released him as a madman. Perseus Whiston ("he made no manner of reply ... till Albinus took him to be a madman, and dismissed him").
- He kept up his cry for years until a stone from a siege engine killed him. Perseus Whiston ("seven years and five months ... until ... our siege ... there came a stone out of one of the engines, and smote him, and killed him immediately"). "Roman" is the essay's inference from the siege; Whiston says only "one of the engines."

## Tacitus (*Annals* 15.44)

- Written early in the second century. Verified in the closing run by inference from texts seen, stated here so it can be judged: in *Annals* 11.11 (Perseus Tacitus) Tacitus refers back to "my history of the emperor Domitian" and says he was "praetor at the time" of Domitian's secular games; McGiffert (WDB, Eusebius 3, note 155) puts the end of Domitian's reign "in the year 96 a.d." So the *Annals* were written after 96 by a man who already held office under Domitian. The usual modern dating of the *Annals* (about 115 to 120) was not seen.
- The fire that burned much of Rome in 64; Nero blamed the Christians. Nero fastening the guilt on the Christians matched (first run) against Perseus Tacitus ("Nero fastened the guilt ... on a class ... called Christians by the populace"). The year 64 verified in the closing run: McGiffert (WDB, Eusebius 2.25, note 307), "the great Roman conflagration, which took place in 64 a.d."; Perseus Tacitus heads Book XV "A.D. 62" to "65" and dates the fire's start to "the 19th of July."
- Quotation "Christus, from whom the name had its origin, suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus, and a most mischievous superstition, thus checked for the moment, again broke out". Matched word for word against Perseus Tacitus (Church and Brodribb); rechecked in the closing run (the only difference is spacing left by tag stripping before two commas).
- "Spreading from Judea to Rome itself": paraphrase of the next clause, matched against Perseus Tacitus ("not only in Judæa, the first source of the evil, but even in Rome").
- Tacitus despised the Christians. Supported by the same passage ("a class hated for their abominations," "a most mischievous superstition").
- Skeptics argue he may have repeated what Christians said. Characterization of a common objection; not attributed; not rechecked; still open.

## Celsus via Origen (*Against Celsus* 1.28)

- Celsus wrote in the second century; his words survive inside Origen's answer. Corrected in the closing run from "late in the second century" (change 3). Origen (WDB, *Against Celsus* 1.8): "we have heard that there were two individuals of the name of Celsus, both of whom were Epicureans; the earlier of the two having lived in the time of Nero, but this one in that of Adrian, and later." Survival through Origen is visible in WDB (Origen quotes him throughout Books 1 and 8).
- Celsus put charges in the mouth of a Jewish critic. WDB (1.28, "he introduces a Jew, who enters into a personal discussion with Jesus").
- Quotation "invented his birth from a virgin". Matched word for word in WDB (1.28); rechecked in the closing run.
- Quotation "born in a certain Jewish village, of a poor woman of the country, who gained her subsistence by spinning". Matched word for word in WDB (1.28); rechecked in the closing run.
- Paraphrase: husband a carpenter threw her out for adultery; Jesus hired himself out as a servant in Egypt, acquired miraculous powers, came home calling himself a god. Matched in substance against WDB (1.28: "turned out of doors by her husband, a carpenter by trade, because she was convicted of adultery ... having hired himself out as a servant in Egypt ... acquired some miraculous powers ... proclaimed himself a God"). No quotation marks.
- "The first pagan writer we know of who attacked Christianity at length." Not rechecked (characterization; Celsus is standardly called the earliest known comprehensive pagan critic); still open.
- Celsus plainly took Jesus to be real, a man with a home village and a mother who spun for her living. Gloss on the 1.28 quotation above (WDB); no quotation marks.
- As far as the surviving sources show, no ancient opponent said Jesus never lived. Characterization, hedged in the text; not rechecked; still open.

## Gospel evidence

- Mark 3:22 (two parts) "He is possessed by Beelzebul" and "by the prince of demons he casts out the demons". Both matched word for word against the ESV copy. The speakers are "the scribes who came down from Jerusalem," as the essay says.
- Mark and Matthew say John baptized Jesus; Luke mentions the baptism without naming who performed it. Read in the ESV copy (Mark 1:9; Matthew 3:13; Luke 3:19-21). Corrected in the first run (its change 1).
- John's baptism was a call to repentance. Read in the ESV copy (Mark 1:4, "proclaiming a baptism of repentance for the forgiveness of sins").
- Matthew 3:14 "John would have prevented him, saying, 'I need to be baptized by you, and do you come to me?'" Matched word for word against the ESV copy.
- Mark 3:21 (part) "went out to seize him, for they were saying, 'He is out of his mind'". Matched word for word against the ESV copy; the subject is "his family" in the same verse.
- Mark 13:32 (part) "no one knows, not even the angels in heaven, nor the Son, but only the Father". Matched word for word against the ESV copy.
- Mark 10:17, a man kneels and calls him "Good Teacher." Matched word for word against the ESV copy ("a man ran up and knelt before him and asked him, Good Teacher").
- Mark 10:18 "Why do you call me good? No one is good except God alone". Matched word for word against the ESV copy.
- Matthew 19:17 (part) "Why do you ask me about what is good?" Matched word for word against the ESV copy. Matthew 19:16 in the copy has the man say only "Teacher," consistent with the essay's point.
- Deuteronomy 21:23 (part) "a hanged man is cursed by God". Matched word for word against the ESV copy.
- Greeks and Romans thought of crucifixion as the death of slaves and rebels. Verified for Roman practice in the closing run: Perseus Cicero (*Against Verres*, Yonge) speaks of "the cross which you had erected for condemned slaves"; Perseus Whiston (*War* 2.5.2) has Varus crucify the most guilty of the rebels in Judea, "in number about two thousand." No separately Greek source was opened; the essay's pairing follows Paul's "Jews" and "Gentiles" in 1 Corinthians 1:23.
- 1 Corinthians 1:23 "but we preach Christ crucified, a stumbling block to Jews and folly to Gentiles". Matched word for word against the ESV copy (the verse ends with a comma in the copy; the essay closes the quotation inside its own sentence).
- The crucifixion under Pilate is the fact historians hold most firmly. Characterization; not rechecked; still open.

## Sanders

- E. P. Sanders, *Jesus and Judaism* (1985; the essay no longer prints the year), near the start of the book, lists facts he thought almost beyond dispute: baptized by John; a Galilean who preached and healed; called disciples and spoke of twelve; confined his work to Israel; involved in a controversy over the temple; crucified outside Jerusalem by the Roman authorities; his followers continued as an identifiable movement; some Jews persecuted parts of it. Not rechecked; still open (paraphrase of a well-known list, no quotation marks; the writer's 2026-10-26 search summaries confirmed four of the eight items and the count; no source opened in either verification run).
- Sanders described as one of the most influential scholars of Jesus' Jewish world in the last century. Characterization; not rechecked; still open.
- Most historians would add the kingdom of God, parables, and a reputation as healer and exorcist. Characterization; not rechecked; still open.

## The quests and the inventions

- Lessing published fragments by Hermann Samuel Reimarus, a Hamburg scholar, arguing Jesus was a failed political messiah; the eighteenth century. Verified in the closing run against Gutenberg Schweitzer, chapter II: Reimarus "was born in Hamburg on the 22nd of December, 1694, and spent his life there as a professor of Oriental Languages. He died in 1768"; "In 1774 Lessing began to publish the most important portions of it, and up to 1778 had published seven fragments"; and Schweitzer quotes Reimarus that Jesus' purpose had been "to establish an earthly kingdom and deliver the Jews from political oppression," in which "God's help had failed Him."
- Nineteenth-century German lives of Jesus often set aside miracles and eschatology. Verified in the closing run as Schweitzer's account (Gutenberg Schweitzer): the rationalist lives (chapter V, on Paulus, "the naturalistic interpretation of miracles which he upheld"), the "liberal" lives and the struggle against eschatology (chapters XIV and XVI), and chapter XX's summary of the result, a Jesus "who preached the ethic of the Kingdom of God."
- Albert Schweitzer, a young theologian in Strasbourg, surveyed the effort in 1906. Verified in the closing run: search (1) dates *The Quest of the Historical Jesus* to 1906; the Gutenberg title page calls him "Privatdocent in New Testament Studies in the University of Strassburg"; the Gutenberg metadata gives his birth year as 1875, so he was about 31.
- Schweitzer judged that each writer had made Jesus in his own image and that writing a life of Jesus exposes the writer's self. Verified in the closing run: the paraphrase matches Gutenberg Schweitzer, chapter I ("each individual created Him in accordance with his own character. There is no historical task which so reveals a man's true self as the writing of a Life of Jesus"). Search (1) also gave the second sentence. Kept as marked paraphrase ("he said in effect"); the quotation is now safe to restore (see above).
- The liberal Jesus who founded the kingdom of heaven on earth and died to consecrate his work never existed; a figure of rationalism, liberalism and modern theology. Verified against Gutenberg Schweitzer, chapter XX, and corrected in the closing run from "kingdom of God" (change 2). Search (2) also gave the "figure designed by rationalism" sentence. No quotation marks.
- Schweitzer's own Jesus: a prophet expecting the imminent end who went to his death to hasten it. Verified in the closing run against Gutenberg Schweitzer, chapter XIX: Jesus, "in the knowledge that He is the coming Son of Man lays hold of the wheel of the world to set it moving on that last revolution which is to bring all ordinary history to a close. It refuses to turn, and He throws Himself upon it. Then it does turn; and crushes Him."
- Bruce Barton, an advertising executive, *The Man Nobody Knows*, 1925, Jesus as the founder of modern business. Verified in the closing run by searches (3) and (4): both give the 1925 book as framing Jesus as "the Founder of Modern Business"; search (4) gives Barton as an advertising executive.
- Barton's portrait of Jesus recruiting twelve men from the lowest ranks of business into an organization that took over the world. Verified in substance in the closing run by search (4), whose summary says Barton has Jesus "created a world-conquering organization with a group of twelve men hand-picked from the bottom ranks of business" and calls him "the world's greatest business executive"; search (3) says the same in other words. Kept as paraphrase because the exact 1925 wording was not confirmed (see above).
- It became a best-seller. Verified in the closing run by searches (3) and (4) ("topped the nonfiction bestseller list" on publication in 1925).
- Warner Sallman, *Head of Christ*, 1940. Not rechecked; still open. The description "soft-lit Jesus with light skin and long brown hair" is a description of the image; not rechecked.
- Christian groups handed pocket-sized copies to American soldiers in the Second World War; printed by the millions. Not rechecked; generalized in the first run; still open.
- Jesus Seminar founded by Robert Funk in 1985; colored beads, red for words Jesus surely said and black for words he did not; *The Five Gospels*, 1993, concluded most of the words were not his. Not rechecked; still open. Some accounts name John Dominic Crossan as co-founder; the essay's wording does not exclude him. "Most" is the general form of a percentage the writer had; no figure is printed.
- The Seminar's Jesus: a wandering sage of subversive parables with little apocalyptic preaching. Characterization; not rechecked; still open.
- Other New Testament scholars objected that the votes came from a self-selected group with a shared point of view. Not rechecked; generalized in the first run (the Hays attribution was removed); still open.
- Contemporary church portraits of Jesus (fighter who votes with the congregation; gentle progressive). Characterization, no source.

## The question at Caesarea Philippi

- Mark 8:27 "Who do people say that I am?" Matched word for word against the ESV copy, as is the setting ("the villages of Caesarea Philippi ... on the way").
- Caesarea Philippi lies north of the Sea of Galilee. Verified in the closing run against Perseus Whiston: Philip "built the city Cesarea, at the fountains of Jordan, and in the region of Paneas" (*War* 2.9.1); the Jordan's "visible stream arises from this cavern" at Panium, runs through lake Semechonitis, "then passes through the middle of the lake Gennesareth" and on to "the lake Asphaltitis" (*War* 3.10.7). So Caesarea lies upstream of the lake, toward the Jordan's source in the north.
- Mark 8:28 "John the Baptist; and others say, Elijah; and others, one of the prophets." Matched word for word against the ESV copy.
- Mark 8:29 "But who do you say that I am?" and "You are the Christ". Both matched word for word against the ESV copy.
- Mark 8:31-32 paraphrase (the Son of Man must suffer, be rejected, be killed and after three days rise; Peter took him aside and rebuked him). Matched in substance against the ESV copy.
- "Jesus turned, saw the other disciples, and rebuked Peter in front of them." Paraphrase of Mark 8:33 in the ESV copy ("But turning and seeing his disciples, he rebuked Peter"); "in front of them" is the essay's reading.
- Mark 8:33 "Get behind me, Satan! For you are not setting your mind on the things of God, but on the things of man." Matched word for word against the ESV copy. The exclamation point is inside quoted Scripture.
- Apostles' Creed: "suffered under Pontius Pilate," between the virgin birth and the resurrection. Verified in the closing run: search (6) gives the creed as "born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried" (Vatican News text); the site creed reads "born of the Virgin Mary, suffered under Pontius Pilate, was crucified, dead, and buried; he descended into hell; the third day he rose again from the dead."
- Acts 26:26 (part) "for this has not been done in a corner," with Paul before King Agrippa saying the king knows about these things. Matched word for word against the ESV copy; the setting read in Acts 26:1-2 and 26:26-27 in the copy.
- John 1:46 "Can anything good come out of Nazareth?" and "Come and see." Both matched word for word against the ESV copy; the speakers (Nathanael, Philip) read in John 1:45-46 in the copy.

## Closing Texts

- Mark 8:29 "But who do you say that I am?" Matched word for word against the ESV copy.
- Hebrews 13:8 "Jesus Christ is the same yesterday and today and forever." Matched word for word against the ESV copy.

## Links and mechanics

- /writing/did-christianity-copy-pagan-myths, /writing/why-trust-the-bible, /writing/did-the-resurrection-happen. All three slugs found in `docs/work/essays/link-targets.json` by script in the first run; the closing run changed no link.
- No em-dashes (U+2014) in the essay after the closing run's edits (counted by grep). The only exclamation point is inside Mark 8:33. After the voice pass, "fair" and "honest" do not appear, no BRIEF.md stamp phrase appears, and the only en-dash is the verse range in "Mark 8:27–29". None of the CLAUDE.md forbidden words found by grep after the closing run.
- Every one of the 35 quoted strings in the essay is accounted for above: 25 Scripture (ESV copy), "the Lord's brother" (Galatians 1:19, ESV copy), the Josephus and Eusebius quotations (WDB), Tacitus (Perseus Tacitus), Celsus (WDB), and the Apostles' Creed (search and site creed).
- No biography of James is used. No contested second-order question is argued; the resurrection is confessed and handed to its own essay.

## Still open after the closing run (28)

None of these is a quotation; each is either a date, a characterization of a modern scholar, or a standard historical generalization, and each was kept as written because nothing seen contradicts it. A run with web search (or James's ESV key for the Scripture lines) should close them in this order:

1. Berlin debate early in 1910 staged by the German Monist League.
2. Drews, professor of philosophy at the technical university in Karlsruhe.
3. *The Christ Myth*, 1909, and the gloss on its thesis.
4. The Drews controversy lasting several years in Germany.
5. No document from Jesus' lifetime mentions him (standard).
6. Every full account of his life was written by believers (characterization).
7. Mark usually dated around 70, some forty years after the crucifixion (consistent with Irenaeus and McGiffert; the scholarly dating itself not seen).
8. Paul says little about Jesus' movements, miracles and teaching (characterization).
9. Carrier, *On the Historicity of Jesus*, 2014, Sheffield Phoenix Press.
10. Carrier's thesis as summarized.
11. Carrier granting that the expert consensus is against him.
12. Ehrman, agnostic, *Did Jesus Exist?*, 2012, and his conclusion.
13. The consensus holding among Jewish, Christian and secular scholars.
14. Paul's letters mostly from the 50s, some twenty to twenty-five years after the crucifixion (crucifixion year seen; letter dates not).
15. Most historians accept the James passage in Josephus.
16. Many specialists today think the longer passage is a Christian expansion of a shorter notice (confirmed only for McGiffert's day).
17. Skeptics' objection that Tacitus may have repeated Christian reports.
18. Celsus as the first pagan writer known to attack Christianity at length.
19. No ancient opponent said Jesus never lived (hedged in the text).
20. The crucifixion under Pilate as the fact historians hold most firmly.
21. Sanders's list in *Jesus and Judaism*.
22. Sanders as one of the most influential scholars of Jesus' Jewish world.
23. Most historians adding the kingdom of God, parables and a healer's reputation.
24. Sallman's *Head of Christ*, 1940, and its description.
25. Pocket-sized copies for soldiers in the Second World War; printed by the millions.
26. The Jesus Seminar: Funk, 1985, the beads, *The Five Gospels* (1993) and "most of the words."
27. The Seminar's Jesus as a wandering sage with little apocalyptic preaching.
28. Other New Testament scholars' objection that the Seminar was self-selected.

Also unconfirmed, though its line is counted among the four corrections: whether Carrier and other mythicists read "the Lord's brother" as a title (the quotation itself was corrected to the ESV of Galatians 1:19).
