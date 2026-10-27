# Claims ledger: the-historical-jesus

Essay: `docs/work/essays/the-historical-jesus.md` ("Was Jesus Real? What Historians Actually Know"). The writer's ledger (2026-10-26) was replaced by this verifier's ledger on 2026-10-27. Every line below records what this verification run actually did. The essay folds in no old slugs (NOTES.md lists none for it; the-historical-jesus-without-the-shortcuts folds into did-the-resurrection-happen).

## Read this first: no web search was available for this check

The workflow's shared web-search budget was used up before this check began. The first two WebSearch calls (Mark 3:21 and Galatians 4:4 with Romans 1:3 in the ESV) both came back "this turn's web search budget is used up," and no search result was seen in this run. WebFetch of www.esv.org/Mark+3/ and of biblehub.com/esv/mark/3.htm failed (getaddrinfo ENOTFOUND), and curl to biblehub.com, biblestudytools.com, bible.com and openbible.info was refused by the sandbox proxy (CONNECT 403). No other site was opened. The only outside sources reachable were public-domain or openly posted texts on GitHub.

The writer's ledger had recorded search-summary matches on 2026-10-26 for the Schweitzer and Barton quotations, the Barna figures, the Berlin debate date and venue, and several smaller details. Those were the writer's checks; this run could not repeat any of them. So, as the brief requires, the quotations nothing in this run could confirm became marked paraphrase, the survey figures were generalized, and the debate date was generalized. The exact earlier wording is kept below under "Original wording, for restoring," so a run with search can put it back if it matches.

The methods actually used, and what the words below mean:

- **"WDB"**: read in the scratchpad clone of github.com/HistoricalChristianFaith/Writings-Database (`wdb`, commit 328918a), with `git show 'HEAD:<path>'` and the HTML tags stripped. Eusebius, *Church History*: the NPNF translation with McGiffert's notes, identified by its wording and notes, not by a label in the file. Origen, *Against Celsus*: the ANF translation, identified by its wording, not by a label in the file.
- **"Perseus Whiston"**: read in a blobless clone of github.com/PerseusDL/canonical-greekLit (scratchpad `cgl`, commit 0189b9c) with `git show`: `tlg0526.tlg004.perseus-eng2.xml` (*Jewish War*), `tlg0526.tlg001.perseus-eng2.xml` (*Antiquities*), `tlg0526.tlg002.perseus-eng2.xml` (*Life*). The TEI headers of all three name William Whiston as translator. Tags stripped, then grepped.
- **"Perseus Tacitus"**: `phi1351.phi005.perseus-eng1.xml` from github.com/PerseusDL/canonical-latinLit, fetched from raw.githubusercontent.com on 2026-10-27. Its TEI header names Alfred John Church and William Jackson Brodribb as translators.
- **"ESV copy"**: the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown," parsed by its author from javascripture's ESV JSON), cloned into the scratchpad (`esv-mdbible`, commit fd66568, dated 2022-01-20) and read with `git show`. A script (`scratchpad/hj-check/check.py`) compared each quotation with the verse text after normalizing case, punctuation and spacing; all 25 checks matched word for word, and punctuation was then compared by eye. The copy drops quotation marks inside verses and does not say which ESV edition it is. It is not esv.org or the ESV API; recheck with James's API key once it exists.
- **"Not rechecked"**: kept in the essay without any source opened in this run, because it is standard textbook history or a plain characterization. Listed so a later run can check it.
- **"Generalized"** / **"Paraphrased"**: the essay was changed in this run because nothing reachable could confirm the exact wording or figure.

## Changes made to the essay in this run

1. Luke. The essay said "Mark, Matthew and Luke all say Jesus was baptized by John." In the ESV copy, Luke 3:19-20 reports John locked in prison by Herod, and Luke 3:21 then says "when Jesus also had been baptized" without naming who baptized him. Corrected to: Mark and Matthew say John baptized him; Luke mentions the baptism without saying who performed it.
2. Jesus son of Ananias. The essay said "The city's leaders had him beaten and handed him to the governor." Perseus Whiston (*War* 6.5.3) has "certain of the most eminent among the populace" beat him and then "our rulers" brought him to the procurator. Corrected to: some of the city's leading men had him beaten, and its rulers handed him to Albinus.
3. Josephus in Rome. "Spent the rest of his life in Rome" became "settled in Rome, where he wrote his people's history." Perseus Whiston (*Life*) confirms Vespasian housed him in Rome and made him a citizen; nothing opened in this run says where he died.
4. "Every account of his life that survives was written by people who believed God had raised him" became "Every full account of his life that survives ...", because the essay itself later quotes Celsus's hostile sketch of Jesus' life.
5. Pilate. "Appears by name in only one known inscription" became "only one known stone inscription." Reason (verifier's knowledge, not checked in this run): a copper-alloy ring from Herodium inscribed with the name Pilatus was published in 2018, and whether it belonged to Pontius Pilate is disputed.
6. Berlin debate: date, venue and "two-night" generalized to "Early in 1910 ... in Berlin." "Carried it from city to city" became "kept making the case."
7. Barna: year and both percentages generalized.
8. Schweitzer: three quotations became marked paraphrase.
9. Barton: the quotation became marked paraphrase; "went to the top of the nonfiction best-seller list" became "became a best-seller."
10. Sallman: "The USO and the Salvation Army" became "Christian groups"; "by some estimates ... more than half a billion times by the century's end" became "printed by the millions."
11. Jesus Seminar: "Critics such as the New Testament scholar Richard Hays objected" became "Other New Testament scholars objected."

## Voice pass and final audit (2026-10-27)

A later reader revised the prose for voice. No fact, quotation, number, date, name or link was added; a script confirmed all 35 quoted strings, all three links and every Scripture reference are unchanged. What changed that touches a claim:

1. Sanders: "his 1985 book *Jesus and Judaism*" became "his book *Jesus and Judaism*" (year dropped to thin the run of title-and-year citations; the date itself was not in question).
2. Celsus and the Gospel opponents: "a real village, a real mother and a real trade" became "a man Celsus plainly took to be real, a man with a home village and a mother who spun for her living," which tracks the WDB wording of *Against Celsus* 1.28 already matched below. "Called Jesus illegitimate, a sorcerer, a deceiver" became "illegitimate and a sorcerer"; "deceiver" had no line in this ledger and was cut, not checked.
3. Schweitzer: "Most Christians have rejected that reconstruction, with good reason" lost "with good reason," an unargued judgment.
4. Paul: "his letters are the earliest Christian writings we have" became "his letters are older than any of the Gospels," which rests on the datings already listed (most letters in the 50s; Mark around 70).
5. Wording only, no claim: two headings ("What the Skeptic Gets Right" became "The Case That Jesus Never Lived"; "The Jesus We Keep Inventing" became "Why the Portraits of Jesus Keep Changing"), "That's a fair question" removed, the church-portraits paragraph and the Caesarea Philippi lead-in reworded, and the closing line now confesses the resurrection in the first person ("Christians confess that he did not stay dead, and I believe it").

## Original wording, for restoring

Restore only after a run that can see the source confirms it word for word.

- Opening: "On January 31, 1910, the German Monist League opened a two-night public debate in Berlin's Zoological Garden over whether Jesus had ever lived." The writer's 2026-10-26 search summary gave the published proceedings' title as "Berliner Religionsgespräch des Deutschen Monistenbundes am 31. Januar und 1. Februar 1910 im Zoologischen Garten."
- "But Drews carried it from city to city" (writer cited a summary of B. B. Warfield, 1910).
- "When Barna asked in 2015, 92 percent of American adults said Jesus was a real person who actually lived. Among the youngest adults it surveyed, the figure was 87 percent." (Writer: barna.com "What Do Americans Believe About Jesus? 5 Popular Beliefs"; the 87 percent Millennial figure came from a secondary summary on bciowa.org.)
- Schweitzer (Montgomery translation): "In his English translator's words, "each individual created Him in accordance with his own character." He added, "There is no historical task which so reveals a man's true self as the writing of a Life of Jesus.""
- Schweitzer: "never existed: "He is a figure designed by rationalism, endowed with life by liberalism, and clothed by modern theology in an historical garb.""
- Barton: "a man who "picked up twelve men from the bottom ranks of business and forged them into an organization that conquered the world." It went to the top of the nonfiction best-seller list."
- Sallman: "The USO and the Salvation Army handed pocket-sized copies to soldiers in the Second World War, and by some estimates it had been reproduced more than half a billion times by the century's end." (The writer's own note said the YMCA, not the USO, appeared in some sources; settle that before restoring.)
- "Critics such as the New Testament scholar Richard Hays objected that the votes came from a self-selected group with a shared point of view."

## Berlin, 1910 (opening)

- A public debate in Berlin early in 1910, staged by the German Monist League, over whether Jesus had lived. Not rechecked (date and venue generalized; see above).
- Arthur Drews, professor of philosophy at the technical university in Karlsruhe. Not rechecked.
- *The Christ Myth* published the year before (1909); argued there was no historical man behind the Gospels. Not rechecked. The gloss "a figure of religious myth who had later been given a human story" is a general paraphrase of his thesis, without quotation marks.
- Bruno Bauer pressed a version of the idea in the nineteenth century. Not rechecked.
- Theologians answered him; a public controversy in Germany for several years. Not rechecked.

## Survey

- A Barna survey of American adults about a decade ago: the overwhelming majority said Jesus was a real person; the youngest adults were a little less likely to say so. Not rechecked; generalized from the writer's figures (see above).

## Overstatements Christians make

- Some Christians have said the evidence for Jesus is better than for Julius Caesar, or that no serious person has doubted him; both are said to be untrue. Characterization, no source. The essay's own opening (Drews, Bauer) disproves the second.

## What is missing

- No document from Jesus' lifetime mentions him; no inscription, coin, letter or trial record; he left no writings. Not rechecked (standard).
- Every full account of his life that survives was written by believers in the resurrection. Not rechecked; wording changed in this run (see change 4).
- Mark usually dated around 70, some forty years after the crucifixion. Not rechecked (standard dating).
- Paul says little about Jesus' movements, miracles or most of his teaching. Not rechecked (standard observation).

## Carrier and Ehrman

- Richard Carrier, *On the Historicity of Jesus*, 2014, Sheffield Phoenix Press, a biblical studies publisher. Not rechecked.
- He weighs the evidence with probability theory; argues the first Christians believed in a heavenly Jesus known through visions and Scripture, later given an earthly biography in the Gospels; Paul's near-silence carries much of the weight. Not rechecked (characterization of his thesis; no quotation marks).
- Carrier and other mythicists read "brother of the Lord" as a title any believer might carry. Not rechecked (characterization).
- Carrier grants that the near-universal judgment of qualified experts is against him. Not rechecked; paraphrase, no quotation marks.
- Bart Ehrman, agnostic, *Did Jesus Exist?* (2012), written against the mythicists; concludes Jesus was a Jewish preacher crucified under Pontius Pilate in the reign of Tiberius. Not rechecked.
- The consensus holds among Jewish, Christian and secular scholars. Characterization; not rechecked.

## Pilate

- Pilate governed Judea for ten years. Matched against Perseus Whiston (*Antiquities* 18.4.2): "So Pilate, when he had tarried ten years in Judea, made haste to Rome."
- His name appears in only one known stone inscription. Not rechecked; wording narrowed in this run (see change 5).

## Paul

- Most of Paul's letters date from the 50s, some twenty to twenty-five years after the crucifixion. Not rechecked (standard dating).
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
- Went over to the Romans and settled in Rome. Matched against Perseus Whiston (*Life*): Vespasian "gave me an apartment in his own house" in Rome and "the privilege of a Roman citizen." "Went over to the Romans" not separately rechecked (standard).
- *Antiquities* has twenty books; Book 20 is the last. WDB (Eusebius 3.9.3, "the whole of the Antiquities of the Jews in twenty books").
- Finished in the 90s. Matched against Perseus Whiston (*Antiquities* Book 20, Whiston's chapter 12, the book's closing lines): "the thirteenth year of the reign of Caesar Domitian, and the fifty-sixth year of my own life" (93/94).
- Ananus acted between Festus's death and Albinus's arrival. WDB (Eusebius 2.23.21-22, quoting *Antiquities* 20): "supposing that he had a favorable opportunity on account of the fact that Festus was dead, and Albinus was still on the way, called together the Sanhedrim." Also matched in Perseus Whiston ("Festus was now dead, and Albinus was but upon the road").
- "Around the year 62." Not rechecked as a date; consistent with McGiffert's note in WDB (Eusebius 3.8, note 101: Albinus "was procurator from 61 or 62 to 64 a.d.").
- Quotation "brought before them the brother of Jesus, the so-called Christ, James by name, together with some others". Matched word for word in WDB (Eusebius 2.23.22, McGiffert's rendering of Josephus). Whiston's own rendering differs ("the brother of Jesus, who was called Christ, whose name was James"); the essay uses the Eusebius translation.
- Had them stoned. WDB (Eusebius 2.23.22, "condemned them to be stoned").
- The story is about Ananus abusing his office. WDB (Eusebius 2.23.23: the moderate citizens protested that he could not lawfully convene the Sanhedrin without the governor).
- Most historians, including many with no Christian commitment, accept the James passage. Not rechecked (standard).
- Quotation of the longer passage as Eusebius gives it: "a wise man, if indeed it be proper to call him a man" and "He was the Christ." Matched word for word in WDB (Eusebius 1.11.7).
- Eusebius quoted it in the fourth century. Not rechecked (his *Church History* is standardly dated to the early fourth century).
- Many specialists think Josephus wrote a shorter notice that copyists improved; the argument continues. Not rechecked (standard); "many" kept loose.

## Jesus son of Ananias (*Jewish War* 6.5.3)

- A countryman who began about four years before the revolt to cry out against Jerusalem and its temple. Matched against Perseus Whiston ("a plebeian and an husbandman, who, four years before the war began ... a voice against Jerusalem and the holy house") and WDB (Eusebius 3.8.7, "a common countryman, four years before the war").
- Some of the city's leading men had him beaten; its rulers handed him to the governor Albinus. Matched against Perseus Whiston ("certain of the most eminent among the populace ... gave him a great number of severe stripes ... our rulers ... brought him to the Roman procurator ... Albinus (for he was then our procurator)"). Wording corrected in this run (see change 2).
- Flogged until his bones showed. Perseus Whiston ("whipped till his bones were laid bare"); WDB (Eusebius 3.8.9, "scourged to the bone").
- He would not answer the governor's questions; Albinus released him as a madman. Perseus Whiston ("he made no manner of reply ... till Albinus took him to be a madman, and dismissed him").
- He kept up his cry for years until a stone from a siege engine killed him. Perseus Whiston ("seven years and five months ... until ... our siege ... there came a stone out of one of the engines, and smote him, and killed him immediately"). "Roman" is the essay's inference from the siege; Whiston says only "one of the engines."

## Tacitus (*Annals* 15.44)

- Written early in the second century. Not rechecked (standard).
- The fire that burned much of Rome in 64; Nero blamed the Christians. Nero fastening the guilt on the Christians matched against Perseus Tacitus ("Nero fastened the guilt ... on a class ... called Christians by the populace"). The year 64 not rechecked (standard).
- Quotation "Christus, from whom the name had its origin, suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus, and a most mischievous superstition, thus checked for the moment, again broke out". Matched word for word against Perseus Tacitus (Church and Brodribb).
- "Spreading from Judea to Rome itself": paraphrase of the next clause, matched against Perseus Tacitus ("not only in Judæa, the first source of the evil, but even in Rome").
- Tacitus despised the Christians. Supported by the same passage ("a class hated for their abominations," "a most mischievous superstition").
- Skeptics argue he may have repeated what Christians said. Characterization of a common objection; not attributed; not rechecked.

## Celsus via Origen (*Against Celsus* 1.28)

- Celsus wrote late in the second century; his words survive inside Origen's answer. Not rechecked as to date (standard); survival through Origen is visible in WDB (Origen quotes him throughout Book 1).
- Celsus put charges in the mouth of a Jewish critic. WDB (1.28, "he introduces a Jew, who enters into a personal discussion with Jesus").
- Quotation "invented his birth from a virgin". Matched word for word in WDB (1.28).
- Quotation "born in a certain Jewish village, of a poor woman of the country, who gained her subsistence by spinning". Matched word for word in WDB (1.28).
- Paraphrase: husband a carpenter threw her out for adultery; Jesus hired himself out as a servant in Egypt, acquired miraculous powers, came home calling himself a god. Matched in substance against WDB (1.28: "turned out of doors by her husband, a carpenter by trade, because she was convicted of adultery ... having hired himself out as a servant in Egypt ... acquired some miraculous powers ... proclaimed himself a God"). No quotation marks.
- "The first pagan writer we know of who attacked Christianity at length." Not rechecked (characterization; Celsus is standardly called the earliest known comprehensive pagan critic).
- Celsus plainly took Jesus to be real, a man with a home village and a mother who spun for her living. Gloss on the 1.28 quotation above (WDB); no quotation marks.
- As far as the surviving sources show, no ancient opponent said Jesus never lived. Characterization, hedged in the text; not rechecked.

## Gospel evidence

- Mark 3:22 (two parts) "He is possessed by Beelzebul" and "by the prince of demons he casts out the demons". Both matched word for word against the ESV copy. The speakers are "the scribes who came down from Jerusalem," as the essay says.
- Mark and Matthew say John baptized Jesus; Luke mentions the baptism without naming who performed it. Read in the ESV copy (Mark 1:9; Matthew 3:13; Luke 3:19-21). Corrected in this run (see change 1).
- John's baptism was a call to repentance. Read in the ESV copy (Mark 1:4, "proclaiming a baptism of repentance for the forgiveness of sins").
- Matthew 3:14 "John would have prevented him, saying, 'I need to be baptized by you, and do you come to me?'" Matched word for word against the ESV copy.
- Mark 3:21 (part) "went out to seize him, for they were saying, 'He is out of his mind'". Matched word for word against the ESV copy; the subject is "his family" in the same verse.
- Mark 13:32 (part) "no one knows, not even the angels in heaven, nor the Son, but only the Father". Matched word for word against the ESV copy.
- Mark 10:17, a man kneels and calls him "Good Teacher." Matched word for word against the ESV copy ("a man ran up and knelt before him and asked him, Good Teacher").
- Mark 10:18 "Why do you call me good? No one is good except God alone". Matched word for word against the ESV copy.
- Matthew 19:17 (part) "Why do you ask me about what is good?" Matched word for word against the ESV copy. Matthew 19:16 in the copy has the man say only "Teacher," consistent with the essay's point.
- Deuteronomy 21:23 (part) "a hanged man is cursed by God". Matched word for word against the ESV copy.
- Greeks and Romans thought of crucifixion as the death of slaves and rebels. Not rechecked (standard).
- 1 Corinthians 1:23 "but we preach Christ crucified, a stumbling block to Jews and folly to Gentiles". Matched word for word against the ESV copy (the verse ends with a comma in the copy; the essay closes the quotation inside its own sentence).
- The crucifixion under Pilate is the fact historians hold most firmly. Characterization; not rechecked.

## Sanders

- E. P. Sanders, *Jesus and Judaism* (1985; the essay no longer prints the year), near the start of the book, lists facts he thought almost beyond dispute: baptized by John; a Galilean who preached and healed; called disciples and spoke of twelve; confined his work to Israel; involved in a controversy over the temple; crucified outside Jerusalem by the Roman authorities; his followers continued as an identifiable movement; some Jews persecuted parts of it. Not rechecked in this run (paraphrase of a well-known list, no quotation marks; the writer's 2026-10-26 search summaries confirmed four of the eight items and the count).
- Sanders described as one of the most influential scholars of Jesus' Jewish world in the last century. Characterization; not rechecked.
- Most historians would add the kingdom of God, parables, and a reputation as healer and exorcist. Characterization; not rechecked.

## The quests and the inventions

- Lessing published fragments by Hermann Samuel Reimarus, a Hamburg scholar, arguing Jesus was a failed political messiah; the eighteenth century. Not rechecked (standard).
- Nineteenth-century German lives of Jesus often set aside miracles and eschatology. Characterization; not rechecked.
- Albert Schweitzer, a young theologian in Strasbourg, surveyed the effort in 1906. Not rechecked (standard).
- Schweitzer judged that each writer had made Jesus in his own image and that writing a life of Jesus exposes the writer's self. Paraphrased in this run (no quotation marks; see "Original wording").
- The liberal Jesus who founded the kingdom of God on earth and died to consecrate his work never existed; a figure of rationalism, liberalism and modern theology. Paraphrased in this run (no quotation marks). Not rechecked.
- Schweitzer's own Jesus: a prophet expecting the imminent end who went to his death to hasten it. Not rechecked (standard summary).
- Bruce Barton, an advertising executive, *The Man Nobody Knows*, 1925, Jesus as the founder of modern business. Not rechecked (standard).
- Barton's portrait of Jesus recruiting twelve men from the lowest ranks of business into an organization that took over the world. Paraphrased in this run (no quotation marks).
- It became a best-seller. Not rechecked (narrowed in this run from "the top of the nonfiction best-seller list").
- Warner Sallman, *Head of Christ*, 1940. Not rechecked (standard). The description "soft-lit Jesus with light skin and long brown hair" is a description of the image; not rechecked.
- Christian groups handed pocket-sized copies to American soldiers in the Second World War; printed by the millions. Not rechecked; generalized in this run.
- Jesus Seminar founded by Robert Funk in 1985; colored beads, red for words Jesus surely said and black for words he did not; *The Five Gospels*, 1993, concluded most of the words were not his. Not rechecked (standard). Some accounts name John Dominic Crossan as co-founder; the essay's wording does not exclude him.
- The Seminar's Jesus: a wandering sage of subversive parables with little apocalyptic preaching. Characterization; not rechecked.
- Other New Testament scholars objected that the votes came from a self-selected group with a shared point of view. Not rechecked; generalized in this run (the Hays attribution was removed).
- Contemporary church portraits of Jesus (fighter who votes with the congregation; gentle progressive). Characterization, no source.

## The question at Caesarea Philippi

- Mark 8:27 "Who do people say that I am?" Matched word for word against the ESV copy, as is the setting ("the villages of Caesarea Philippi ... on the way").
- Caesarea Philippi lies north of the Sea of Galilee. Not rechecked (standard geography).
- Mark 8:28 "John the Baptist; and others say, Elijah; and others, one of the prophets." Matched word for word against the ESV copy.
- Mark 8:29 "But who do you say that I am?" and "You are the Christ". Both matched word for word against the ESV copy.
- Mark 8:31-32 paraphrase (the Son of Man must suffer, be rejected, be killed and after three days rise; Peter took him aside and rebuked him). Matched in substance against the ESV copy.
- "Jesus turned, saw the other disciples, and rebuked Peter in front of them." Paraphrase of Mark 8:33 in the ESV copy ("But turning and seeing his disciples, he rebuked Peter"); "in front of them" is the essay's reading.
- Mark 8:33 "Get behind me, Satan! For you are not setting your mind on the things of God, but on the things of man." Matched word for word against the ESV copy. The exclamation point is inside quoted Scripture.
- Apostles' Creed: "suffered under Pontius Pilate," between the virgin birth and the resurrection. Not rechecked (the standard received text).
- Acts 26:26 (part) "for this has not been done in a corner," with Paul before King Agrippa saying the king knows about these things. Matched word for word against the ESV copy; the setting read in Acts 26:1-2 and 26:26-27 in the copy.
- John 1:46 "Can anything good come out of Nazareth?" and "Come and see." Both matched word for word against the ESV copy; the speakers (Nathanael, Philip) read in John 1:45-46 in the copy.

## Closing Texts

- Mark 8:29 "But who do you say that I am?" Matched word for word against the ESV copy.
- Hebrews 13:8 "Jesus Christ is the same yesterday and today and forever." Matched word for word against the ESV copy.

## Links and mechanics

- /writing/did-christianity-copy-pagan-myths, /writing/why-trust-the-bible, /writing/did-the-resurrection-happen. All three slugs found in `docs/work/essays/link-targets.json` by script in this run.
- No em-dashes (U+2014) in the essay after edits (counted by grep). The only exclamation point is inside Mark 8:33. After the voice pass, "fair" and "honest" do not appear, no BRIEF.md stamp phrase appears, and the only en-dash is the verse range in "Mark 8:27–29". None of the CLAUDE.md forbidden words found by grep.
- No biography of James is used. No contested second-order question is argued; the resurrection is confessed and handed to its own essay.
