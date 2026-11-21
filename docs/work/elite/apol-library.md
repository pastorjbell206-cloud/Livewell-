# The apologetics library: stock-take, map, standard, architecture and plan

Unit apol, tenth run. Date: 2026-11-20. Branch `elite/apol`. Written for James and for the agents who will build it.

James, 2026-11-20 (his message was cut off at the end): "I want you to take the questions and the skeptics and the hard questions, that tab, and I want you to expand and make it the best apologetic resource in the world. I want it to be logical, academic, intellectual. I want to deal with history and dates and problems that people can't deal with. I want to know, like the things that Bart Ehrman says about textual issues and the doubts people have and the claims of science. And I really want it to be apologetic. I want people to know what we believe and why we believe it. I want it to be the best resource for apologetics in the world and answer all the hard questions with detail and great writing and logic and balance. And"

What this run produced:

- This plan.
- A pilot of one area, "Can we trust the text of the New Testament?": an area page and four argued pieces, in `docs/work/elite/apol-pilot/` (Markdown, status pending, not on the site). Why Markdown and not on the preview is in section 4.6.
- Every claim of the pilot, and every book named in the map below, in `docs/work/elite/apol-ledger.md` under "Tenth run".

---

## 1. What exists (counted by script)

Counts were made by script in this run (`answerText()` over `client/src/data/answers.ts`; the JSON libraries read directly; `wc -w` on the /faq page files).

### 1.1 The forms

| Form | Where | How many | Length | Sources | Ledger |
|---|---|---|---|---|---|
| Honest Answers, argued | `client/src/data/answers.ts`, `/answers/<slug>` | 23 | 1,677 to 2,241 words (mean about 2,040) | 6 to 10 dated sources each | yes, `apol-ledger.md`, line by line |
| Honest Answers, short | same | 12 | 203 to 295 words | none | compressions of essays |
| Short questions | `client/public/theology/questions.json`, `/theology/questions` | 112 in 11 categories | about 220 to 870 words | none | none |
| /faq pages | `client/src/pages/faq/*.tsx` | 10 pages, 80 questions | 2,121 to 2,864 words per file | none listed | three rebuilt pages checked in `apol-ledger.md`; `faq-facts-ledger.md` for others |
| Test the Case | `client/src/data/argumentCases.ts`, `/tools/test-the-case` | 9 cases | step-by-step | some | validator only |
| The skeptic's track | `client/src/lib/skepticTrack.ts`, `/skeptic-track` | 7 stops | points at essays | n/a | validator only |
| Long essays that argue these questions | `client/public/essays/*.json` | 10 directly apologetic | 3,416 to 4,024 words | in text | yes, three-pass ledgers in `docs/work/essays/ledgers/` |
| Study Bible "hard question" and text notes | `client/public/bible/notes/<book>/<ch>.json` | in nearly every chapter | 200 to 600 words a note | names in text | not in a ledger |

The ten essays: why-trust-the-bible, the-historical-jesus, did-the-resurrection-happen, can-you-be-good-without-god, why-does-god-allow-suffering, did-christianity-copy-pagan-myths, who-decided-what-books-are-in-the-bible, did-god-command-genocide, why-didnt-the-bible-ban-slavery, the-council-of-nicaea-what-was-decided-in-325.

The 112 short questions by category: Salvation and the Christian life 13; Suffering, evil, and death 14; The Bible and science 17; God, Jesus, and other religions 13; The church and the sacraments 11; Faith, doubt, and deconstruction 6; Faith in public life 16; Last things 7; Science and faith 6; The Christian life 6; Marriage, sex, and the home 3. About 55 of them are apologetic in the sense of this plan (the Bible and science, science and faith, suffering, other religions, doubt).

### 1.2 The 35 Honest Answers, one line each

Argued (the approved pattern; each a short answer, the objection at full strength, the argument laid out, the evidence, the best reply, what it does not prove, sources): did the resurrection happen (2,233 words, 8 sources); why trust the Bible (1,907, 8); suffering (1,677, 9); what if Christianity is wrong (1,776, 7); was Jesus just a good teacher (1,998, 8); faith and science (2,241, 8); God three and one (2,235, 8); is Jesus the only way (2,219, 9); does God exist (2,121, 10); those who never heard (2,205, 7); good without God (2,213, 7); faith irrational (1,812, 7); miracles (2,034, 7); genocide (2,213, 9); slavery (2,240, 7); wishful thinking (1,980, 7); New Atheists (1,776, 7); meaning without God (1,714, 6); Islam (2,188, 8); hell (1,733, 8); Genesis 1 (2,150, 7); natural evil (2,198, 9); human in the age of AI (1,985, 8).

Short and rightly so (pastoral or practical): angry at God, church optional, done with church, after deconstruction, political party, money, anxiety, a teenager who doesn't believe, anxiety as spiritual failure. Short, and better suited to the contested-doctrine form than to apologetics: lose your salvation, election, divorce and remarriage.

### 1.3 Their weaknesses, judged against the standard in section 3

1. **The argued answers are good but general.** Each takes a whole field in about 2,000 words. "Why would anyone trust the Bible?" gives the text, the canon, archaeology and the Gospels' differences one paragraph each. It is honest and checked, but it can't name P75, Vaticanus, the Comma's eight manuscripts, Eusebius on Mark, or the dating debate over P52 in any depth, and it can't answer the second and third replies a well-read skeptic makes. That depth is what this library adds.
2. **No piece takes a single specific claim.** Nothing on the site answers "the census of Quirinius", "the two genealogies", "the day of the crucifixion", "Daniel was written in the 160s", "camels in Genesis" or "Jericho had no walls" as pages of their own. The Study Bible's notes treat many of them well, verse by verse (Luke 2, Luke 3, Mark 2, Acts 1, John 8, Mark 16, Matthew 1, Matthew 27 were read for this plan), but a reader who searches the question will not find them, and they are not in a ledger.
3. **The 112 short questions are unledgered and some overclaim.** "The Gospels are copies of copies" dates the Manchester fragment to "the first half of the second century" without the dating debate, and says the disputed passages "sit flagged in the footnotes of any modern Bible". "Can I actually trust the Bible?" calls the New Testament "the best-attested document of the ancient world by an enormous margin" and lists "the pool of Bethesda" and "the politarchs of Thessalonica" as confirmations, two items an earlier run removed from /faq as unchecked. They need the same line-by-line check the answers had before anything in the library links to them.
4. **Seven /faq pages are still in the old encyclopedic form** (no sources, unchecked figures). Three were rebuilt (God, Bible, science). The hell page is a survey that doesn't meet the moral objection; the four church-leaving and denomination pages are sociology and practice, not apologetics.
5. **Test the Case has nine cases**, all on the large questions. It's a good tool; it isn't a library.
6. **Areas with no argued piece at all**: who wrote the Gospels and when; forgery and pseudepigraphy; the canon at depth (the essay exists, no answer); every specific contradiction; Old Testament archaeology (exodus, conquest, Daniel, camels, flood); the mind and the soul; sexuality; women; the church's record beyond slavery and conquest; Judaism; hiddenness; mythicism (partly in the pagan-myths essay).
7. **A site defect found in the pilot.** The Study Bible's reader shows "[Not in the earliest manuscripts]" only where a verse is empty (16 verses). Mark 16:9-20 and John 7:53 to 8:11 carry the `later` flag in the data (`client/public/bible/text/`) but print with no visible mark, while the John 8 note says "this Bible marks the verses as a later addition". The pilot therefore says only what the notes do. A small fix (a bracket or note on flagged printed verses in `StudyBible.tsx`, `VerseRef.tsx`) would make the claim true; it is outside this run.

---

## 2. The map of the field

Ten areas. Under each: the questions and the specific claims worth a page, phrased as their proponents phrase them, and the strongest proponent with a work, named only where the author, title and year were verified (by a search this run, marked S, or by an existing ledger, marked L; rows in `apol-ledger.md`). Where no proponent is named, none was verified; the build run names one only after checking.

Counts: 10 areas, 152 questions and claims. Pieces already argued on the site are marked (answer). The pilot's four are marked (pilot).

### Area 1. God, faith and reason (16)

1. Does God exist? (answer) Proponent against: J. L. Mackie, *The Miracle of Theism* (1982) L; Graham Oppy, *Arguing about Gods* (2006) L.
2. "Who made God?": the designer would be more improbable than the design. Richard Dawkins, *The God Delusion* (2006) L.
3. "The universe can come from nothing": physics explains why there is something. Lawrence Krauss, *A Universe from Nothing* (2012) S; Stephen Hawking and Leonard Mlodinow, *The Grand Design* (2010) S.
4. The kalam argument and an eternal universe (Borde, Guth and Vilenkin 2003; the quantum loopholes) L.
5. The contingency argument and the brute-fact universe. Bertrand Russell, 1948 debate with Copleston L.
6. The moral argument and godless moral realism. Erik Wielenberg, *Robust Ethics* (2014) L.
7. Divine hiddenness: reasonable nonbelief disproves a loving God. J. L. Schellenberg, *Divine Hiddenness and Human Reason* (1993) L.
8. Is faith belief without evidence? (answer) W. K. Clifford, "The Ethics of Belief" (1877) L.
9. Is faith wishful thinking? (answer) Freud, *The Future of an Illusion* (1927) L.
10. What if Christianity is wrong? Pascal's wager and its faults (answer). John Loftus, *The Outsider Test for Faith* (2013) L.
11. Can a life mean anything without God? (answer)
12. Religious experience as evidence, and its critics.
13. The argument from reason: can a mind produced by unguided processes trust itself? (Thomas Nagel, an atheist, *Mind and Cosmos*, 2012, S, as a critic of materialism, not a theist).
14. Is the Christian God the God of the philosophers? (Which God, if any?)
15. Can you be good without God? (answer)
16. What did the New Atheists get right? (answer)

### Area 2. Can we trust the text of the New Testament? (14)

1. "More variants than words." (pilot) Bart Ehrman, *Misquoting Jesus* (2005) L.
2. "Copies of copies; a telephone game." (pilot)
3. The ending of Mark, the woman caught in adultery and other later passages. (pilot)
4. "Orthodox corruption": scribes made Jesus more divine. (pilot) Ehrman, *The Orthodox Corruption of Scripture* (1993; 2nd ed. 2011) S.
5. The Johannine Comma and the King James Bible (in pilot 3; deserves a short page of its own).
6. Luke 22:43-44 (in pilot 3 and 4).
7. Mark 1:41: an angry Jesus. Ehrman, "Did Jesus Get Angry or Agonize?", *Bible Review* (Winter 2005) S.
8. Hebrews 2:9: "apart from God." (in pilot 4)
9. "Was the original even a single text?" D. C. Parker, *The Living Text of the Gospels* (1997) S.
10. "The earliest manuscripts are late and their dates are guesses." Brent Nongbri, *God's Library* (2018) S.
11. The church fathers' quotations, and the "all but eleven verses" story (in pilot 2).
12. The King James Only and Majority Text positions, stated fairly.
13. The Old Testament text: the Masoretic text, the Septuagint and the Dead Sea Scrolls; Jeremiah's two editions (L).
14. Translations: why they differ and whether any is "the" Bible.

### Area 3. Who wrote the Gospels and the New Testament, when, and who chose the books (16)

1. "The Gospels are anonymous; the names were added later." Ehrman, *Jesus, Interrupted* (2009) S; *Forged* (2011) S.
2. When were the Gospels written? (Mark around 70, most critical scholars L.)
3. Were the Gospels eyewitness testimony? Richard Bauckham, *Jesus and the Eyewitnesses* (2006) L, and his critics.
4. What genre are the Gospels? Richard Burridge, *What Are the Gospels?* (1992) L.
5. Oral tradition and memory: "a telephone game before anything was written." Ehrman, *Jesus Before the Gospels* (2016) S.
6. The Synoptic problem and Q.
7. Is John history or theology?
8. "Forgeries in the New Testament": the Pastorals, 2 Peter, Ephesians, Colossians, 2 Thessalonians. Ehrman, *Forged* (2011) S.
9. Did Paul write the letters under his name, and does it matter?
10. Lost Christianities: were there many Christianities and did the winners write the Bible? Ehrman, *Lost Christianities* (2003) L; Walter Bauer, *Orthodoxy and Heresy in Earliest Christianity* (German 1934) S.
11. The Gnostic gospels. Elaine Pagels, *The Gnostic Gospels* (1979) S.
12. The Gospel of Thomas (Nag Hammadi 1945, L).
13. Who chose the books, and did Nicaea vote on the canon? (essay; L)
14. Why not the Shepherd of Hermas, the Didache or the Gospel of Peter?
15. The Apocrypha: why Protestant and Catholic Bibles differ.
16. Did Constantine create Christianity or its Bible?

### Area 4. Contradictions and hard passages (20)

1. The census of Quirinius (Luke 2:2). (Study Bible note on Luke 2.)
2. The two genealogies (Matthew 1, Luke 3). (note on Luke 3.)
3. The day of the crucifixion in John and the Synoptics.
4. The death of Judas (Matthew 27, Acts 1). (note on Acts 1.)
5. Abiathar in Mark 2:26. (note on Mark 2; L)
6. The resurrection accounts: who went to the tomb, how many angels, where Jesus appeared. (L)
7. The birth narratives: Bethlehem, Nazareth, Egypt, Herod's massacre.
8. "Jesus, Interrupted": the general case that the Gospels contradict. Ehrman (2009) S.
9. Matthew's use of the prophets ("Jeremiah" in Matthew 27:9; Hosea 11:1; Isaiah 7:14). (notes on Matthew 1 and 27)
10. Mark's "Isaiah" for a combined quotation (Mark 1:2). (note on Mark 1)
11. The numbers in Kings and Chronicles (for example 2 Samuel 24:9 against 1 Chronicles 21:5).
12. The two creation accounts (Genesis 1 and 2).
13. Who killed Goliath (1 Samuel 17; 2 Samuel 21:19; 1 Chronicles 20:5).
14. Paul and James on faith and works.
15. Paul and Acts: the visits to Jerusalem.
16. Did Jesus expect the end within a generation? (Mark 9:1; 13:30)
17. The cursing of the fig tree and the cleansing of the temple: order and date.
18. "Inerrancy cannot survive one error": the Chicago Statement (1978, L) and its critics.
19. How should Christians handle a contradiction they can't solve?
20. Genealogies and ages in Genesis 5 and 11.

### Area 5. The historical Jesus and the resurrection (16)

1. Did Jesus exist? Richard Carrier, *On the Historicity of Jesus* (2014) S; Ehrman, *Did Jesus Exist?* (2012) L, against.
2. Tacitus, Josephus, Pliny: what the outside sources show. (L)
3. Did Christianity copy pagan myths? (essay; L)
4. Was Jesus just a good teacher? (answer)
5. How Jesus became God: did the church deify a Jewish preacher? Ehrman, *How Jesus Became God* (2014) L.
6. Did Jesus claim to be God?
7. Did the resurrection happen? (answer)
8. The burial and the empty tomb. (L)
9. Bereavement visions and hallucinations. (L)
10. "Extraordinary claims require extraordinary evidence"; Hume. (answer: miracles)
11. The virgin birth: legend or history? (note on Matthew 1)
12. Was Jesus a failed apocalyptic prophet? (Schweitzer 1906, L)
13. Did the disciples die for their belief? (L, narrowed)
14. The Jesus Seminar and the "historical Jesus" quests.
15. Jesus and Judaism: was he a Jewish teacher misread by Gentiles?
16. The Shroud, relics and other evidence Christians should not lean on.

### Area 6. The Old Testament: history, archaeology, violence and law (18)

1. Did the exodus happen? Israel Finkelstein and Neil Asher Silberman, *The Bible Unearthed* (2001) S; James Hoffmeier, *Israel in Egypt* (1996) S, for the other side.
2. The conquest and Jericho: Kenyon's excavations (1952 to 1958) and Bryant Wood (*Biblical Archaeology Review*, 1990) S.
3. Camels in Genesis: Lidar Sapir-Hen and Erez Ben-Yosef, Tel Aviv University study (published in *Tel Aviv*, announced February 2014) S.
4. Daniel's date: a prophecy, or history written in the 160s BC? (Porphyry; the modern critical view: proponent to verify.)
5. The flood and the Mesopotamian flood stories (Atrahasis, Gilgamesh).
6. Was Moses the author of the Pentateuch? (the documentary hypothesis; proponent to verify.)
7. Did David and Solomon exist? (Tel Dan, 1993, L)
8. Merneptah, Mesha, and what outside sources confirm. (L)
9. Genesis 1 to 11 as history, myth or something else. (answer: Genesis 1)
10. Did God command genocide? (answer) Wesley Morriston, *Philosophia Christi* (2009) L.
11. Why didn't the Bible ban slavery? (answer) Hector Avalos (2011) L.
12. The "angry God of the Old Testament" against the God of Jesus. (short question exists)
13. Why do Christians ignore some Old Testament laws? (short question exists)
14. Women in the Old Testament law.
15. The cursing psalms. (short question exists)
16. Animal sacrifice. (short question exists)
17. Child sacrifice and Abraham's test (Genesis 22).
18. Is the Old Testament borrowed from older Near Eastern texts?

### Area 7. Science (16)

1. The conflict thesis: Draper (1874) and White (1896) L; Ronald Numbers, ed., *Galileo Goes to Jail* (2009) L.
2. Galileo, 1633. (L)
3. Science has made God unnecessary. Jerry Coyne, *Faith versus Fact* (2015) L.
4. The age of the universe and the earth. (Christians differ; no position.)
5. Evolution. Coyne, *Why Evolution Is True* (2009) S. (Christians differ; no position.)
6. Adam and the genome. Dennis Venema and Scot McKnight, *Adam and the Genome* (2017) S. (Christians differ; no position.)
7. The mind and the soul: "we are our brains." Daniel Dennett, *Consciousness Explained* (1991) L.
8. Free will and neuroscience.
9. Miracles and natural law. (answer) Hume (1748) L.
10. Fine-tuning and the multiverse. Martin Rees, *Just Six Numbers* (1999) L.
11. The Big Bang and a beginning. (L)
12. "The God of the gaps." (L)
13. Near-death experiences. (short question exists)
14. Life on other planets. (short question exists)
15. Artificial intelligence and the person. (answer)
16. Were the great scientists believers, and does it matter? (L, with the misattributions named)

### Area 8. Evil, suffering and judgment (12)

1. The logical problem of evil. Mackie, "Evil and Omnipotence" (1955) L. (answer)
2. The evidential problem. William Rowe (1979) L. (answer)
3. Natural evil and animal suffering. Paul Draper (1989) L. (answer)
4. "God's Problem." Ehrman, *God's Problem* (2008) L.
5. Why does God allow evil done to children?
6. Hell: how can a good God punish forever? (answer) Russell (1927) L.
7. Annihilation and universal hope, stated fairly. (L)
8. Why doesn't God stop the worst evils?
9. Does prayer change anything?
10. Why do the righteous suffer and the wicked prosper? (Job, Psalm 73)
11. Is God responsible for evil if he is sovereign?
12. Grief and the argument: when the question is not abstract. (pastoral boundary: Find Help stays)

### Area 9. Morality, sexuality and the church's record (14)

1. Can you be good without God? (answer)
2. The Euthyphro dilemma. (L)
3. Slavery and the church in America. (answer; L)
4. The Crusades.
5. The Inquisition and the burning of heretics.
6. The church and the Jewish people. (Study Bible note on Matthew 27 treats the verse; a page needs care and James's read.)
7. Colonialism and missions.
8. Abuse in the church and its cover-up. (essay; L)
9. Women: does the Bible demean women?
10. Sexuality: is the church's teaching on same-sex relationships unjust? (proponents on both sides to verify before naming)
11. Abortion and the early church's record. (essay on exposure of infants; L)
12. "Religion poisons everything." Christopher Hitchens, *god Is Not Great* (2007) L.
13. Christian nationalism and the misuse of the faith (the site's own essays; same instrument both ways).
14. Is Christian morality just a product of its culture?

### Area 10. Other religions, and those who never heard (10)

1. Is Jesus the only way? (answer) John Hick (1989) L.
2. What do Christianity and Islam dispute? (answer)
3. Judaism and Jesus: why most Jews did not and do not believe he is the Messiah.
4. Buddhism and Hinduism on the self and salvation.
5. Those who never heard. (answer)
6. "You're a Christian because of where you were born." (Loftus; L)
7. Do all religions teach the same thing?
8. Did Paul invent Christianity?
9. Mormonism and Jehovah's Witnesses: what they claim about the Bible and Jesus (the New World Translation's John 8:58, in the Study Bible note).
10. Is Christianity a Western religion? (the site's essay "Christianity was never Western" is pending)

Total: 16 + 14 + 16 + 20 + 16 + 18 + 16 + 12 + 14 + 10 = 152. About 25 are already argued (23 answers plus the pilot's 4, counting overlaps once), so roughly 125 pieces remain, before deep studies.

### 2.1 Bart Ehrman's claims, mapped in full

James named him. Every claim below gets a page or a named section of one, and is treated as a claim, not a person: the page quotes him only where the exact words are verified, else paraphrases and cites the book.

| Claim | Where he argues it | Page in the plan |
|---|---|---|
| More variants than words; 200,000 to 400,000 (later estimates higher) | *Misquoting Jesus* (2005) | Area 2.1 (pilot) |
| No originals; copies of copies; early scribes amateurs | *Misquoting Jesus* | 2.2 (pilot) |
| The long ending of Mark | *Misquoting Jesus*; Study Bible note | 2.3 (pilot) |
| The woman caught in adultery | *Misquoting Jesus* | 2.3 (pilot) |
| The Johannine Comma | *Misquoting Jesus* | 2.3 (pilot), 2.5 |
| Orthodox corruption (John 1:18, 1 Timothy 3:16, Luke 2:33, Luke 3:22) | *The Orthodox Corruption of Scripture* (1993; 2011) | 2.4 (pilot) |
| Luke 22:43-44 added against docetism | Ehrman and Plunkett, *Catholic Biblical Quarterly* (1983) | 2.3, 2.4 (pilot), 2.6 |
| Mark 1:41, "angry" | *Bible Review* (2005); his essay on the verse | 2.7 |
| Hebrews 2:9, "apart from God" | *The Orthodox Corruption of Scripture* | 2.4 (pilot), 2.8 |
| The Gospels are anonymous | *Jesus, Interrupted* (2009) | 3.1 |
| Forgery and pseudepigraphy | *Forged* (2011) | 3.8, 3.9 |
| Oral tradition as a telephone game; memory | *Jesus Before the Gospels* (2016) | 3.5 |
| Lost Christianities; the winners chose the canon | *Lost Christianities* (2003) | 3.10, 3.13 |
| How Jesus became God | *How Jesus Became God* (2014) | 5.5, 2.4 (pilot) |
| Contradictions in the Gospels (birth, death, resurrection) | *Jesus, Interrupted* | 4.6 to 4.8 |
| Jesus as an apocalyptic prophet | his books on the historical Jesus (title to verify) | 5.12 |
| The burial and the empty tomb | *How Jesus Became God* | 5.8 (L) |
| Suffering as the reason he left the faith | *God's Problem* (2008) | 8.4 |
| Things he grants that cut against popular uses of his work | the appendix to *Misquoting Jesus* (essential beliefs), *Did Jesus Exist?* (2012) | quoted where verified (2.1 pilot; 5.1) |

---

## 3. The standard every piece must meet

An editor and a validator can apply this. Items marked [V] can be checked by script; the rest by an editor.

1. **Short answer first** [V: present, one paragraph, 80 to 180 words]. It gives the whole answer and can stand alone as the page description and search line.
2. **The objection at its strongest** [V: section present]. In words its proponent would sign, with the proponent named and a work cited (author, title, year) [V: at least one source marked "other side"]. A quotation only where the exact words are verified; otherwise paraphrase, said to be paraphrase by the absence of quotation marks.
3. **What is true in it**, conceded plainly [V: section present]. Including where Christians have argued badly.
4. **The evidence**, with numbers, dates and named primary sources. Manuscripts by name and date (P52, P66, P75, Sinaiticus, Vaticanus, Alexandrinus, Bezae), with the dating debate stated where there is one. Every estimate with its estimator and year. Every fact in the ledger [V: the piece's ledger key exists in `apol-ledger.md`].
5. **The argument, laid out** [V: a numbered list of premises and a conclusion]: what kind of argument it is (deductive, inference to the best explanation, cumulative), which step carries the weight, and why a reasonable person can accept it.
6. **The strongest reply and an answer** [V: section present]. The reply a well-read skeptic would make to the argument just given, not to a weaker one.
7. **What remains unresolved** [V: section present]. Said without alarm.
8. **Where Christians differ** [V: section present]. Second- and third-order questions set out with no side taken (the age of the earth, evolution, a historical Adam's details, inerrancy's exact wording, election, end times, which manuscript tradition to follow). The confessional floor (the Trinity, the deity and humanity of Christ, the bodily resurrection, salvation by grace through the cross, Scripture's authority, the life to come) is argued for, not hedged.
9. **Read the other side and read further** [V: at least two "other side" and two "further" entries, each with a four-digit year]. Every title verified.
10. **For a young person**: a link to the Bible Explorer where a stop exists.
11. **Mechanics** [V]: 1,800 to 2,500 words for an argued piece; no em-dash; none of CLAUDE.md's forbidden words; no exclamation outside quoted Scripture; Scripture quoted with its reference, in the ESV wording, checked as the earlier runs checked it (section 5.3).
12. **Voice**: James's mature register (`docs/VOICE-JAMES-BELL.md`): first person where it helps, plain sentences, contractions, no invented memory or feeling of his, at most one of his confirmed facts and only where it does work. Diagnose, do not denounce. No "debunked", "destroyed", "so-called".
13. **Agrees with the Study Bible's notes** on the passages it treats, or says why not and files the correction.
14. **The test**: a thoughtful unbeliever finishes thinking "I do not believe this, but I no longer think believing it is stupid," and cannot accuse the page of dishonesty.

---

## 4. The architecture

### 4.1 What to build

The Questions door keeps its five rooms and gains one, the sixth and last the catalogue allows:

- **The case for the faith** (`/questions`): the library's home. Ten area cards (icon, name, one line, a count), a "look up a claim" search box, and "Start here" for a reader who doesn't know where to begin (the three or four questions the skeptic's track already orders).

Under it:

- **An area page** for each of the ten (`/questions/<area>`): a short introduction (the pilot's area page is the model), the questions in a sensible reading order, the glossary terms the area uses, and links to the Study Bible notes and the Honest Answers in that area.
- **A piece page** for each question (`/questions/<area>/<slug>`), in three depths on one page: the short answer at the top (depth one), the argued piece below it (depth two), and, for the largest questions, a link to a deep study (depth three: the public essays, which already run 3,400 to 4,000 words, and later longer studies). The page uses the argued Honest Answer's layout and components (`AnswerPage.tsx`: contents list, the argument in its ruled box, sources), so nothing new has to be designed.
- **A claims index** (`/questions/claims`): every claim the library answers, phrased as its proponent states it ("Ehrman: there are more variants than words in the New Testament"; "Dawkins: who designed the designer?"), sortable by area and by person, each linking to the page section that answers it. The index is about claims, not people: no portraits, no labels for the person, only the claim and the work it comes from.
- **The glossary**: extend the existing `/theology/glossary` (101 terms, already including canon, textual criticism, form and redaction criticism and pseudepigrapha) with the library's terms (autograph, variant, papyrus, majuscule, minuscule, lectionary, codex, Textus Receptus, Q, criterion of embarrassment, and so on), rather than starting a second glossary. One page, one name.
- **A timeline picture** of the New Testament's manuscripts and the canon: the writing of the books, P52 with its debated range drawn as a band, not a point, P66 and P75 the same, the great codices, Irenaeus around 180, Athanasius in 367, Erasmus in 1516 and 1522, the King James in 1611, Qumran in 1947. An engraved-style SVG in the art kit's hand, with the dating debates shown as ranges.

### 4.2 Where the pieces live

New long pieces should **not** grow `answers.ts`. That file is imported into the client bundle; 150 pieces of 2,000 words would add about 300,000 words of JavaScript every visitor downloads. Instead, follow the site's content-as-data pattern:

- `client/public/questions/<area>/<slug>.json`, one file per piece, in the shape the argued answers already use (`paragraphs` for the short answer, `sections` with `heading` and `body` of paragraphs and laid-out steps, `sources` with an added `side: "other" | "further"`), plus `area`, `status` ("pending" or "live"), `ledgerKey`, `claims` (the claim lines for the index), `studyNotes` (the chapters whose notes it agrees with), `explorer` (an optional stop).
- `scripts/build-questions-index.mjs` writes `client/public/questions/index.json` (areas, pieces, claims), drift-checked in CI like the other manifests.
- `scripts/validate-questions.mjs` applies every [V] item in section 3 and fails CI on a miss.
- The page fetches its JSON with `lib/fetch-json.ts` and `LoadFailed`, and the prerendered HTML carries the whole text for first paint (`lib/prerender-hold.ts`), as chapters and essays already do.
- The 23 argued Honest Answers stay where they are. Each gains a link to its area, and the area page lists it. Where an Honest Answer and a library piece cover the same ground (the pilot and "Why would anyone trust the Bible?"), the answer stays the short-form overview and links down.

### 4.3 Pending and live

A `status` field, like the essay shelf (`client/src/lib/shelf.json`): pending pieces are left out of the index, the sitemap, the search index, `llms.txt` and every list, and their pages answer with `noindex`. A pending piece is reachable by its address so James can read it on the preview; it becomes live by one line. (If James wants pending pages hidden from production altogether, the page can refuse to render a pending piece unless the build is a preview, using the Vercel environment variable at build time; that is a small addition, not part of the first build.)

### 4.4 The route checklist (from COMMON.md and CLAUDE.md)

`App.tsx` routes for `/questions`, `/questions/claims`, `/questions/:area`, `/questions/:area/:slug`; `SEOMeta` string literals on the two fixed pages, and data-driven heads added to `scripts/prerender-heads.mjs` the way the Honest Answers are; `scripts/generate-sitemap.mjs` reads the index (live only); `llms.txt`; `client/src/lib/site-routes` and `site-structure.test.ts`; `siteCatalog.ts` gains the sixth room; `scripts/build-search-index.mjs` adds the live pieces and their claims; `scripts/build-passage-index.mjs` reads the pieces so a chapter's "Go deeper" lists the piece that treats it; the route smoke test passes on its own. No API procedure is needed, so the two-runtime parity question does not arise.

### 4.5 Build order and an honest estimate

A "run" below means one agent session of the kind that wrote the argued answers: about three to four verified pieces, or one engineering unit with its gates.

1. **Engineering (2 runs).** The data shape, builder, validator, the area and piece pages, prerender, sitemap and search wiring, tests; the pilot moved in as pending. Then the claims index, the glossary terms and the timeline picture (1 more run).
2. **Area 2, the text (3 runs).** The pilot's four, then the ten that remain.
3. **Area 3, authorship and canon (4 runs).** Ehrman's *Forged* and *Lost Christianities* claims next, since James named him.
4. **Area 4, contradictions (5 runs).** Each piece agrees with, and links to, the Study Bible note that already treats the passage.
5. **Area 5, Jesus and the resurrection (4 runs).**
6. **Area 6, the Old Testament (5 runs).**
7. **Area 7, science (4 runs).** No position on the age of the earth, evolution or Adam's details.
8. **Area 9, morality and the record (4 runs).** Pages on the church and the Jewish people, sexuality and abuse wait for James's read before going live.
9. **Area 8, evil and judgment (3 runs)** and **Area 10, other religions (3 runs)**.
10. **Area 1, God, faith and reason (3 runs).** Much is already argued.
11. **Review (about 5 runs across the program).** A line-by-line recheck of each area's ledger by a fresh agent, the 112 short questions brought into line or retired where the library replaces them, the seven unrebuilt /faq pages folded into area pages.

Total: about 50 runs for some 125 new pieces plus the engineering and review. The pace could be faster with more agents, but the verification, not the writing, sets the pace, and it shouldn't be hurried.

### 4.6 Why the pilot is Markdown and not on the preview

Making the pilot reachable at its own address needs the engineering in 4.2 to 4.4: a page component, routes, prerender heads, sitemap exclusion for pending, tests. That is real engineering, not one small safe change, and two heavy builds were running on this machine, so the pilot is written as Markdown under `docs/work/elite/apol-pilot/`, where James can read it on GitHub. Each file starts with its proposed slug and area, and its sections already follow the data shape in 4.2, so the first engineering run can move them in mechanically.

---

## 5. Honesty about the goal

### 5.1 What would make "the best in the world" earnable

The claim can't be made by the site about itself, and it won't be. No page will call itself the best, or call any argument "debunked", any critic "destroyed", or any scholar "so-called". Rigor is the only argument. What would make the claim fair for someone else to make:

- **Coverage of the specific claims**, not only the large questions. Most apologetics online answers "Can we trust the Bible?" Few answer Hebrews 2:9, Eusebius on Mark, or the Lapis Tiburtinus at the level of a good commentary in plain English. The map above is built to do that.
- **Every fact traceable.** A public ledger of claims, with how each was checked, is unusual anywhere. It is the library's real distinction.
- **Concessions in the open.** Pages that say where Christians have argued badly (the first-century Mark episode, the "eleven verses" story) earn the trust the rest of the case needs.
- **Both sides' books.** Every page lists the best work against its conclusion.
- **Agreement with itself.** The Study Bible notes, the Honest Answers and the library say the same thing about the same passage, or one of them is corrected.
- **Review by scholars** (5.4).

### 5.2 Limits this work runs under

- Most primary-source hosts can't be reached from this machine (this run: biblehub.com failed to resolve; earlier runs found Wikipedia, journal hosts and archive.org refused). Facts rest on search results, which summarize pages, and on the ledgers already in the repository. Where a search summary gave a fact but not a person's exact words, the pilot paraphrases.
- Quotations of living authors are used only where the exact words were confirmed by an earlier ledger's exact-phrase search. The pilot quotes Ehrman four times, all words already verified in the existing `why-trust-the-bible` ledger; no new quotation of a living author was added.
- No book was read. Summaries of arguments (Ehrman's, Wallace's, Parker's, Haines-Eitzen's, Nongbri's) rest on reviews, publishers' descriptions and secondary accounts, and are written as paraphrase.
- The ESV can't be checked against Crossway's own text from here (section 5.3).

### 5.3 How Scripture is quoted (and what the pilot did)

The essays and argued answers quote the ESV, with the reference in parentheses, and their ledgers record how each verse was checked: against an ESV copy and search results in the essay runs, against verses already verified in an earlier ledger, or, where the quoted words are the same, against the site's Berean Standard Bible in `client/public/bible/text/`. The pilot followed that practice exactly. It quotes only ESV wording already verified in a ledger (1 Corinthians 15:3-7 and 15:6, 1 Corinthians 8:6, 1 Corinthians 16:22, Philippians 2:10-11, Mark 10:18, Mark 16:8's last clause, the ESV and KJV wording of 1 John 5:7), or a few words identical in the ESV and the BSB ("in the form of God", "nor the Son"). Where it couldn't confirm the ESV wording of a verse (John 8:7, Acts 8:37, Matthew 24:36 in full), it describes the verse instead of quoting it.

### 5.4 What a scholar's review would add

A New Testament textual critic (and, for the other areas, an Old Testament archaeologist, a philosopher of religion, a historian of science) reading each area before it goes live would catch what search summaries can't: a date range that has moved, a manuscript siglum misapplied, a scholar's position stated in a form he would not sign, a consensus claimed where the field is split. They would also add what this method can't: judgment about which arguments the field now takes seriously. One reviewer per area, reading about fifteen pieces, is the single thing that would most raise the library's standing. It costs money or favors, and only James can ask for it.

---

## 6. Questions only James can answer

1. **Inerrancy.** Does the site state a position on inerrancy, and in what words? The pilot says that many evangelical churches confess Scripture to be without error as first written and that others who also confess it as God's word put it differently, and takes no side. If you hold the Chicago Statement's view, or another wording, the library can say so as yours, with the tradition it comes from.
2. **The age of the earth, evolution, Adam.** The site has so far taken no position, by your rule. Should the science area keep it that way, or name your view as yours?
3. **Named critics.** Are living critics quoted (only where the exact words are verified) or only paraphrased with the work cited? The pilot quotes Ehrman four times, each verified word for word in an earlier ledger.
4. **Tone.** Do you want a "debate-style" page anywhere (a critic's case and a reply side by side), or does the whole library keep the site's diagnose-not-denounce voice, as the pilot does?
5. **The sixth room.** Its name ("The case for the faith", "Apologetics", "Questions in depth") and whether it takes the door's last free room.
6. **A scholar's review.** Is there anyone you can ask, a professor, a seminary, a colleague in textual criticism, to read the text area before it goes live?
7. **Sensitive pages.** The church and the Jewish people, sexuality, abuse, the Crusades: do you want to read each before it goes live, and is there a view on sexuality you want stated as yours?
8. **Your own voice.** The pilot uses none of your biography. If one fact (you came to faith from atheism) belongs in this area, say where.
9. **The end of your message.** It stopped at "And". Whatever came next may change the plan.

---

## 7. The engineering stage (eleventh run, 2026-11-20): what was built and what was run

### What James can open on the preview

- `/questions`: the room. The plan's ten areas, each with its number of pieces; nine show "Being written" with no link; area 2 links to its page. "Look up a claim" leads to the claims index.
- `/questions/text`: the area page (the pilot's index.md, word for word): its opening, its four questions, the words its pages use, where else to look.
- `/questions/text/more-variants-than-words`, `/questions/text/copies-of-copies`, `/questions/text/passages-not-in-the-earliest-bibles`, `/questions/text/did-scribes-make-jesus-more-divine`: the four pieces.
- `/questions/claims`: the claims index (eight claims, from the plan's own table in 2.1, each with its work and the piece that answers it).

Every one of these pages is pending: it says `noindex, follow` (in the prerendered head and in the SPA's SEOMeta), carries the line "This page is being reviewed and is not yet published.", is in no menu (`siteCatalog.ts` is untouched), not in the sitemap, not in the search index, not in llms.txt, and is linked from no page outside the library.

### The data

`client/public/questions/`:

- `areas.json`: the ten areas (slug, number, title, planned count, status).
- `<area>/_area.json`: an area's own page (intro, its pieces with their one-line descriptions, words, where else to look, and `record`, the Markdown it came from).
- `<area>/<slug>.json`: a piece. `question`, `status`, `shortAnswer` (Markdown), `sections` (each with a `role` among objection, concessions, evidence, argument, reply, unresolved, differ, and its own heading; the argument has `intro`, `steps`, `conclusion`, `after` and `weightStep`), `otherSide`, `further`, `onSite` (lists of Markdown lines), `objectionSource` (author, title, year), `ledger` (file, heading, key), `links` (Study Bible chapters, Honest Answers, an Explorer stop when one exists), `claims`, `record`.
- `index.json`: the manifest, written by `scripts/build-questions-index.mjs` (with `--check` in CI). Shared reading code: `scripts/lib/questions.mjs` (scripts), `client/src/lib/questions.ts` (pages).

### Pending and live

A piece is live when its own `status` and its area's `status` in `areas.json` are both "live"; the room and the claims index are live when any area is. A live page lists only live pieces; a pending page also lists the pending pieces beside it, so James can read through them. The sitemap (`generate-sitemap.mjs`), the search index (`build-search-index.mjs`) and the link resolver (`scripts/lib/site-routes.mjs`) take live pages only, by the same rule.

To make the text area live: set `"status": "live"` on each of its four piece files and on the area in `areas.json`, run `node scripts/build-questions-index.mjs` and `pnpm exec tsx scripts/build-search-index.mjs`, and add the room to the Questions door in `client/src/lib/siteCatalog.ts` (one entry; the door has room for a sixth) and, if wanted, one line in `client/public/llms.txt`. The validator then checks that no live page links a pending one.

### The validator

`scripts/validate-questions.mjs` (in the content-gates step) checks every [V] point of section 3: the short answer is one paragraph of 80 to 180 words; every role is present in the standard's order; the objection names its proponent and the proponent's work and year stand under "Read the other side"; at least two numbered steps, a conclusion beginning "So", and `weightStep` agreeing with the step the text says carries the weight; the ledger file holds the heading and the heading's block names the piece's key; two or more entries in each reading list, each with a year; 1,800 to 2,500 words of argued prose. And the house rules: no em-dash, none of CLAUDE.md's Forbidden Language, "!" only inside quotation marks, no "debunked" or "so-called", no "destroyed" said of an argument or a person. And the library's own: every link in the prose and every Study Bible, Honest Answer and Explorer link reaches a page; no live page links a pending one; the area page lists exactly its pieces under the same questions; the manifest is current; the plan's ten areas; and no pending address appears in `client/src` outside the library, the sitemap, the search index, llms.txt or llms-full.txt.

Seeded faults, each in a copy of the data, each caught (`server/questions-validator.test.ts`, 27 cases plus the clean copy passing): short answer too short; two paragraphs; no concessions; no unresolved section; sections out of order; objection naming no proponent; the proponent's work missing from the other side; one book on the other side; a reading entry with no year; one step; the weight-bearing step marked wrong; a conclusion not beginning "So"; an em-dash; "tapestry"; "!" outside quotes; "debunked"; "so-called"; a link to no page; a missing Study Bible note; a missing Honest Answer; a ledger key the ledger does not name; a live piece linking a pending one; an area page leaving out a piece; a stale manifest; nine areas; a pending address in a page outside the library; a pending address in a sitemap. Run by hand as well: a pending address in a file under `client/src` and a full URL in llms.txt were both caught, then removed.

### The pilot's prose is unchanged

`scripts/diff-questions-record.mjs` rebuilds each Markdown file from the data and compares the two with whitespace collapsed: `ok` for all five (index.md 683 words; the four pieces 2,766, 2,212, 2,130 and 2,312 words with their lists). Only headings moved into fields. The Markdown files stay as the record. Argued prose (short answer and sections) is 2,450, 1,914, 1,932 and 2,031 words.

### The Bible reader's mark

`client/src/lib/later-passages.ts` names the two long passages the data flags `later` and prints: Mark 16:9-20 and John 7:53-8:11. A plain bracketed line in the reader's small italic note style sits before the first verse ("[The earliest manuscripts do not include Mark 16:9-20.]", "[The earliest manuscripts do not include John 7:53-8:11.]") and after the last ("[End of Mark 16:9-20.]", "[End of John 7:53-8:11.]"). John 8 repeats the opening line before verse 1, for a reader who starts there. It shows in the Study view (reading and original-language modes), the Read view, the guided walk's reading step, the verse sheet (only closing a passage when its last verse is shown) and the verse panel. No verse text changed. The BSB's own footnote wording could not be read from this machine (bereanbible.com does not resolve here; the tenth-run ledger records the same), so the words follow the site's own notes on Mark 16, John 7 and 8. There is no "Table mode" in the reader; /table redirects to /tools. John 3 rendered in both views before and after the change is byte for byte the same HTML; the tests hold that, and that the table names exactly the 24 printed `later` verses.

### What was run

pnpm check: pass. ESLint (changed TypeScript files): clean. Every command of the content-gates step, 40 including the two new ones, each exit code read directly: all 0. pnpm test: 152 files passed, 7 skipped; 1,776 tests passed, 73 skipped (site-structure and the route smoke test among them). pnpm build: 0. sitemap: no /questions address in it. prerender: 7 library pages written, all noindex. audit:canonicals: 2,351 URLs, 0 failures, 0 not prerendered. The served build (serve-like-vercel.mjs) at 390 and 1440: room, area, the four pieces, the claims index; Mark 16, John 8 and John 3 in the Read and Study views at 390: no sideways scroll, no console errors, both marks in place in Mark 16 and John 8, none in John 3. Mustard measured on the viewport shots at 0.06 to 0.96 percent. Lighthouse (the ci.yml script, median of three) on `/questions/text/more-variants-than-words`: accessibility 100, performance 74, best practices 96, CLS 0.000; SEO 66, because the page says noindex while it is pending.

Seen and fixed on the screenshots: the review line sat indented from the head at 1440; the piece and area heads ran wide while the text sat in the reading column (both now on the reading column); the contents label fell into the display face; the reading-list marks were mustard (now muted).

### Not done, and what the next stage needs

- Not built: the glossary terms in /theology/glossary, the timeline picture, the passage index's "Go deeper" link from a chapter to the piece that treats it, links from the Honest Answers down to the library. All wait for the area to go live.
- No piece has an Explorer stop yet (none exists on the subject).
- James's read of the four pieces, and his answers to section 6, before anything goes live.

---

## 8. Eleventh run, continued (2026-11-20): five more pieces, and the text area goes live

### Which five, and why

The plan's list for area 2 (section 2) is a map, not a build order, and three of its next items (5, the Comma; 6, Luke 22:43-44; 8, Hebrews 2:9) are already treated inside the pilot's third and fourth pieces. So this run took the items not yet written in any form, in the order the lead's brief gave: the manuscript comparison with other ancient books (a question the plan's map lacked; it answers the apologists' own overclaim), plan item 9 with the method of an edition, items 12 and 5 together, item 14, and item 7.

| Piece | Address (pending) | Argued prose | Ledger key |
|---|---|---|---|
| Christians say the New Testament is better preserved than Homer or Caesar. Is that true, and what does it prove? | /questions/text/compared-with-other-ancient-books | 2,151 words | e |
| Who decides what the Greek New Testament says, and was there ever a single original to find? | /questions/text/who-decides-what-the-text-says | 2,074 | f |
| Why do modern Bibles leave out verses the King James Version has? | /questions/text/king-james-and-the-missing-verses | 2,059 | g |
| The Bible has been translated so many times. Hasn't the meaning been lost along the way? | /questions/text/lost-in-translation | 2,010 | h |
| Was Jesus angry or compassionate when he healed the leper in Mark 1:41? | /questions/text/an-angry-jesus-mark-1-41 | 1,851 | i |

Each is written first as Markdown in `docs/work/elite/apol-pilot/` and then as data in `client/public/questions/text/`; `diff-questions-record.mjs` shows all ten files (area page and nine pieces) identical to their records. Every fact is in `apol-ledger.md` under "Eleventh run" (38 searches; ehrmanblog.org and gutenberg.org do not resolve from here). The area page and `index.md` list all nine; a live area page shows only the live four.

### Live (James, 2026-11-20: "leet the apologetics go live too")

Live: the room `/questions` ("The case for the faith", a working name), the claims index `/questions/claims` (live claims only), the area `/questions/text`, and the four pilot pieces. The Questions door has its sixth room, "The case for the faith" (`siteCatalog.ts`, icon Library), with the text area and "Look up a claim" inside it. One line in `llms.txt`. The search index carries the room and the four live pieces. Still pending (noindex, the review line, in no list, sitemap, search index or llms.txt): the five pieces above.

Tests changed to the new state (they had pinned "all pending"): `client/src/pages/questions/questions.test.tsx` (a live piece has no review line or noindex, a pending one keeps both; the area lists only live pieces; the claims page lists live claims; the menus link only live library pages; no file outside the library links a pending address) and `server/questions-validator.test.ts` (the seeded faults now use pending pieces, since copies-of-copies and /questions/text are live). No test pinned the number of rooms.

### What was run

Light gates after each piece (validate-questions, the manifest check, the record diff, no-emdash, links, pnpm check): all 0. Before the push, with the load under 6: pnpm test 152 files passed, 7 skipped, 1,780 tests passed, 73 skipped; all 40 content-gate commands 0; pnpm build 0; sitemap 0 (the seven live /questions addresses present, no pending one); prerender 0 (3,061 pages); audit:canonicals 0 failures over 2,362 URLs. Served build at 390 and 1440: the menu shows the new room (desktop panel and phone sheet); /questions, /questions/text, a live piece and /questions/claims have index robots and no review line; a pending piece has noindex and the review line; no sideways scroll; the only console errors are the local server's 404s for /api/track and the two Vercel analytics scripts, on every page alike. Lighthouse (ci.yml's script, median of three) on /questions/text/more-variants-than-words: performance 76, accessibility 100, best practices 96, SEO 100 (66 when it was noindex), CLS 0.000, LCP 5.0 s.

Tried and reverted: preloading the manifest and the piece's JSON from the prerendered head (the page fetches them in turn). Both were fetched once, with no warning, but the medians were 71 and 74 and LCP stayed at 5.0 s, so the change went. The LCP is the moment the held prerendered text gives way to the React page, after the main bundle runs; raising it would need the page to hydrate the prerendered text instead of replacing it, or a smaller entry bundle, the same limit the chapter pages have (their CI floor is 70).

### What remains in the area

From the plan's fourteen: Luke 22:43-44 and Hebrews 2:9 as pages of their own (both now treated inside pilot pieces), "the earliest manuscripts are late and their dates are guesses" (Nongbri), the church fathers' quotations, and the Old Testament text (Masoretic text, Septuagint, Dead Sea Scrolls). The Comma has no separate page; the King James piece and the pilot's third piece carry it.

### For James

Read the five pending pieces; each becomes live by one line (its `status`). The room's name is still the working name. The King James piece speaks of King James Only believers as brothers and sisters and takes no side among the text positions; say if you want your own view stated.

---

## 9. Twelfth run (2026-11-20): the text area's five go live, and the authors area opens

### The editor's read, and the five made live

One editor's read of each of the five pending text pieces against section 3 and CLAUDE.md's revision pass. Changes (each in the Markdown record and the data, the record diff at 0; rows in `apol-ledger.md`, "Twelfth run"):

- compared-with-other-ancient-books: "for about half a century" became "for decades" (no length of time was verified).
- who-decides-what-the-text-says: the third step now says the earliest text reached is the text of the second and third centuries, not the second alone (the papyri's dates are argued).
- king-james-and-the-missing-verses: the first step said a verse is missing from a modern Bible "only if" it was original, which doesn't follow; it now says words have been taken out of God's word only if they belonged to the text as first written. Majority-text editors are no longer counted among those who "keep to the King James".
- lost-in-translation: Robert Alter was listed among translators who agree "on what Jesus did and said", but he translated the Hebrew Bible, not the New Testament; the sentence now names Hart, the King James translators and the modern committees. Modern versions are said to be made from "scholarly editions ... made from the manuscripts" (the standard Hebrew edition isn't built on the earliest manuscripts). The link to the shelf essay restored (below).
- an-angry-jesus-mark-1-41: "anyone who says the question is closed hasn't read them" became "the question is best left open"; "the church has always read four Gospels side by side" became "the church kept four Gospels side by side" (Tatian's harmony was read in Syrian churches for centuries).
- Found while reading for the new area: two pieces said Ehrman "teaches at" the University of North Carolina; he retired in 2025 (the canon essay's ledger). Both now say he taught there for many years, including the live more-variants-than-words.

Then `"status": "live"` on all five; the manifest and the search index rebuilt. The text area page lists nine live pieces; the claims index lists fifteen live claims; the search index carries all nine pieces; the sitemap carries them after `pnpm run sitemap`; llms.txt names the room, not each piece, so it needed no change.

### The shelf-essay link in lost-in-translation

The eleventh run dropped a link to "How the Bible Gets Translated by the Room You're In" because the validator called the address missing. The essay is public: `client/src/lib/shelf.json` lists `how-the-bible-gets-translated-by` with status "live", it is in the sitemap, and other public essays link it. Its text lives only in the database (as do twelve other live shelf essays), so `scripts/lib/site-routes.mjs`, which read only the repository's essay files, couldn't see it, while `validate-links.mjs` already counted shelf essays. The resolver was plainly incomplete, so it now counts every essay the shelf makes public (`server/site-routes-shelf.test.ts`: the live database-only essay resolves; a held-back shelf essay with no copy stays missing), and the link is restored in "On the site".

### The authors area (pending)

Slug `authors` (the plan's), title as in `areas.json`. Records in `docs/work/elite/apol-pilot/authors/` (index.md and five pieces), data in `client/public/questions/authors/`. The plan's order for the area lists eyewitnesses and genre before oral tradition, but section 4.5 puts Ehrman's *Forged* and *Lost Christianities* claims first; this run took the five the lead's brief named, which fold plan items 1, 2, 3, 5, 8 to 13 into five pages.

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| The Gospels are anonymous. Weren't the names added later? | /questions/authors/the-gospels-are-anonymous | 2,280 | j |
| Weren't the Gospels written decades after Jesus by people who never met him? | /questions/authors/written-decades-later | 2,155 | k |
| Isn't oral tradition a game of telephone? | /questions/authors/stories-changed-in-the-telling | 2,061 | l |
| Didn't the church pick four Gospels and suppress the rest? | /questions/authors/four-gospels-and-the-rest | 2,122 | m |
| Weren't some New Testament letters forged? | /questions/authors/forgeries-in-the-new-testament | 2,035 | n |

Every fact is in the ledger under "Twelfth run" (about 37 searches; bkv.unifr.ch does not resolve from here, so Justin's *Dialogue* 103 could not be read and was cut). Much rests on rows already verified from primary texts in the canon essay's and the Nicaea essay's ledgers and on the Study Bible's verified rows (`bdoor-ledger.md`). The pieces agree with the Study Bible's introductions to the Gospels, Acts, Romans and the disputed letters, which already set out the authorship and dating views; no disagreement was found. No living author is quoted. Tests moved to the new state: the text area's nine pieces live, the authors area pending (`questions.test.tsx`, `questions-validator.test.ts`).

### What was run

Light gates after each piece (validate-questions, the manifest check, the record diff, no-emdash, links, pnpm check): all 0. Before the push: pnpm test 153 files passed, 7 skipped, 1,782 tests passed, 73 skipped; all 40 content-gate commands 0; pnpm build 0 (started with the 1-minute load at 6.3, above the brief's limit of 6, a slip; it passed). Then, each started with the load under 6: sitemap 0 (eleven /questions addresses besides the room: the claims index, the text area and its nine pieces; nothing under /questions/authors; the sitemap file is built, not committed); prerender 0 (3,067 pages; the newly live pieces say index, the authors pages noindex); audit:canonicals 0 failures, 0 not prerendered, 2,367 sitemap URLs.

Served build (`serve-like-vercel.mjs`, port 4631, Playwright at 390 with /api/trpc, /api/track and /_vercel stubbed): each of the five newly live pieces has index robots, no review line, no sideways scroll and no console errors; /questions/text lists all nine pieces; site search finds each of the five ("King James Version", "leper", "translated", "Homer", "original text"); /questions/authors and /questions/authors/the-gospels-are-anonymous say noindex and carry the review line, and search for "anonymous" finds no library page. Screenshots in /home/user/elite-shots/apol6/. The server was stopped and dist/ deleted. Lighthouse was not run (no page design changed).

### What remains

Text area (from the plan's fourteen): Luke 22:43-44 and Hebrews 2:9 as pages of their own, Nongbri on the dating of papyri, the church fathers' quotations, the Old Testament text. Authors area (plan items not yet a page of their own): what genre the Gospels are (Burridge), the Synoptic problem and Q, whether John is history or theology, the Gospel of Thomas at length, why not the Shepherd, the Didache or the Gospel of Peter, the Apocrypha, and whether Constantine created Christianity's Bible (partly in piece m). James's read of the five authors pieces before they go live; each goes live by its `status` and the area's in `areas.json`.

---

## 10. Thirteenth run (2026-11-20): an editor's read of the authors area, and the science area

### The editor's read of the five authors pieces

An independent read of the five pending authors pieces, first as a hostile, well-read skeptic and then as a careful conservative scholar, against their twelfth-run ledger rows, the Study Bible introductions and the Honest Answers. Twenty-four changes, each in the record and the data (the record diff at 0), each with a ledger row under "Thirteenth run". The main ones: piece k said the Gospels were written decades later "on any dating", though it cites Crossley's date for Mark within a decade of the crucifixion, and its first step contradicted itself; k also gave Byrskog an argument and a stance not verified, and said Peter, James and John "still preached" in churches when most of the Gospels were written. Piece l said Bauckham conceded the unreliability of memory "in the same book" (it was a blog post and an interview). Piece m said churches from Gaul to Egypt called the four "the only four" (only Irenaeus is verified saying so) and that only Thomas has defenders for early material. Piece n said every article of the creeds is taught in letters "no one doubts" (the virgin birth is taught in the Gospels; a few have doubted all of Paul) and named Tiro, whom the sources didn't. Piece j called Mark and Luke men "of no standing" and said the church "always" confessed Hebrews. No living author is quoted in the five. All five and the area stay pending.

### The science area (pending)

Slug `science` (the plan's), title "Science" as in `areas.json`. Records in `docs/work/elite/apol-pilot/science/` (index.md and five pieces), data in `client/public/questions/science/`. The plan lists sixteen questions for the area; this run took the five that answer "the claims of science" as a skeptic puts them, folding plan items 1 to 6 and 9 to 12 into five pages.

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| Science keeps explaining what people once put down to God. Hasn't it made God unnecessary? | /questions/science/has-science-made-god-unnecessary | 2,051 | o |
| The church condemned Galileo. Hasn't religion always been at war with science? | /questions/science/galileo-and-the-war | 2,073 | p |
| A miracle would break the laws of nature. Didn't David Hume show that no one can reasonably believe in one? | /questions/science/miracles-and-the-laws-of-nature | 2,068 | q |
| Christians say the Big Bang and the fine-tuning of physics point to God. Can't physics explain both without him? | /questions/science/the-beginning-and-fine-tuning | 2,046 | r |
| Hasn't evolution disproved Genesis, and with it the Christian story of creation and the fall? | /questions/science/evolution-and-genesis | 2,363 | s |

The site takes no position on the age of the earth, evolution, a historical Adam's details or the flood's extent: the evolution page sets out young-earth creation, old-earth creation (day-age), evolutionary creation, the framework, analogical-day and cosmic-temple readings, and what intelligent design is and is not, each in its defenders' terms with its hardest difficulty, unranked, and then what all of them confess. Hume is quoted from the Selby-Bigge text of the *Enquiry*, read word for word in this run. Galileo's dates (1616, 1633, 1758, 1835, 1992) and what he was and wasn't sentenced to each have a ledger row. Scripture is quoted from the site's Berean Standard Bible and marked BSB. No living author is quoted.

### What remains in the science area

From the plan's sixteen: the mind and the soul, free will and neuroscience, near-death experiences, life on other planets, artificial intelligence (an answer exists), whether the great scientists were believers, and Adam and the genome as a page of its own. James's read of the five before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 11. Fourteenth run (2026-11-20): an editor's read of the science area, and the area on the historical Jesus and the resurrection

### The editor's read of the five science pieces

An independent read, first as a working scientist and historian of science hostile to apologetics, then as a young-earth, an old-earth and an evolutionary-creationist reader in turn. Seventeen changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Fourteenth run". The flagged items were settled from primary texts reached through GitHub: Aquinas's two phrases are word for word in the English Dominican translation of the *Summa* (I q.2 a.3), so the piece now names that translation; the 1616 censure ("formally heretical", with "false and absurd in philosophy" and "expressly contradicts Holy Scripture") and the 1633 sentence ("vehemently suspected of heresy", corrected from "suspect") were read in Sturge's 1879 translation of von Gebler, which prints the Latin too. Plantinga, a living author quoted from reviews, is now paraphrased. Venema is narrowed to what reviews confirm (the genetics chapters of a book shared with McKnight; the population figure paraphrased; "Christian biologist" cut). Five sentences that leaned were made neutral: the area page stated the age of the earth in the site's own voice; the evolution page called young-earth teaching about the evidence "untrue", called some of its defenders "most candid", gave evolutionary creation a strongest point that ranked the others, and spoke of "denying the science". The fine-tuning page lost a hedge in its first line and two overstatements (Borde, Guth and Vilenkin's theorem, and "every alternative"). All five and the area stay pending.

### Why this area next

The plan's build order (section 4.5) puts area 4, contradictions, before area 5; both had no pieces. This run took area 5, as the lead's brief directed (its final report asks for the piece on the rival explanations and the handling of Josephus), and folded the contradictions in the resurrection accounts (plan item 4.6) into it. Area 4 remains the plan's next.

### The area "jesus" (pending)

Slug `jesus` (the plan's), title as in `areas.json`. Records in `docs/work/elite/apol-pilot/jesus/` (index.md and five pieces), data in `client/public/questions/jesus/`.

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| Did Jesus even exist? Isn't the evidence outside the Bible too thin to be sure? | /questions/jesus/did-jesus-exist | 2,356 | t |
| Was Jesus really buried in a known tomb, and was it found empty, or is that a later legend? | /questions/jesus/the-empty-tomb | 1,983 | u |
| Couldn't the disciples' Easter experiences be explained by grief, legend or fraud, or by Jesus surviving the cross? | /questions/jesus/the-appearances-and-the-alternatives | 2,156 | v |
| The four Easter accounts disagree about who went to the tomb, how many angels were there and where Jesus appeared. Doesn't that show they can't be trusted? | /questions/jesus/the-resurrection-accounts-disagree | 1,949 | w |
| Bart Ehrman says historians can't conclude that a miracle happened. Doesn't that mean the resurrection can never be a historical claim? | /questions/jesus/can-historians-affirm-a-miracle | 1,967 | x |

The ancient sources are quoted from public-domain translations read word for word in this run from GitHub clones: Josephus in Whiston (*Antiquities* 18.63-64 shown whole, with what is judged added and what may be original; 20.200; 4.219; *War* 4.317), Tacitus in Church and Brodribb (*Annals* 15.39-40, 15.44), Pliny in Melmoth (10.96), Suetonius in Thomson (*Claudius* 25, *Nero* 38), Origen and Celsus in Crombie (*Against Celsus* 1.47, 2.55). The Arabic version of Agapius is named, from search summaries, without any of its wording. Scripture is quoted from the site's BSB and checked by script. The pieces agree with the Honest Answer on the resurrection and with the Study Bible's notes on Matthew 27 and 28, Mark 15 and 16, Luke 23 and 24, John 19 to 21 and 1 Corinthians 15; where the trial and burial come up they follow the notes' wording (some Jerusalem authorities took part in handing Jesus over; the decision and the execution were Roman). No consensus is stated as a percentage or a head-count. No living author is quoted. The resurrection is stated as the church's confession, bodily and in history; the historical argument is offered with its limits.

### What remains in the area

From the plan's sixteen: how Jesus became God (Ehrman 2014), whether Jesus claimed to be God, the virgin birth, the failed-apocalyptic-prophet question (Schweitzer), whether the disciples died for their belief (narrowed), the Jesus Seminar and the quests, Jesus and Judaism, the Shroud and relics, and the pagan-myths question (the essay is pending on the shelf). James's read of the five before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 12. Fifteenth run (2026-11-20): an editor's read of the jesus area, and the area on contradictions and hard passages

### The editor's read of the five jesus pieces

An independent read, as a skeptical ancient historian, as a Jewish reader alert to any line that could feed blame of the Jewish people, and as a careful conservative scholar. Twenty-seven changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Fifteenth run". The sources the last run rested on summaries for were rechecked: Rees's 1971 *BMJ* abstract was read word for word in a copy on GitHub (293 widowed people, "Almost half ... had hallucinations or illusions of the dead spouse", most often a sense of presence), and the page now says so; the Stanford Encyclopedia of Philosophy's entry on miracles, read in a GitHub copy, sets out Ehrman's argument from his textbook (2003) and answers it as Craig did, so the miracle page now names both; Feldman was dropped as a holder of the partial view of the Testimonium (his last essay is reported to suspect Eusebius) and Winter with him (not checked); Carrier's 2014 article arguing that Tacitus's sentence is an interpolation was added to the objection, with the answer that the passage survives in a single manuscript; Carrier's reading of "the Lord's brother" was narrowed to what is confirmed; Allison, Lüdemann, Licona and Blomberg were narrowed to what reviews confirm; Yehohanan's tomb was restated from the excavation reports as summarized ("young" cut); Troeltsch's essay is now "usually dated 1898", with its full title. For the Jewish reader: the Testimonium's "principal men amongst us" is now framed as the Mark 15 note frames the trial (some Jerusalem authorities took part; the decision and the execution Roman), the council is "some of whose leaders" handed Jesus over, the theft charge in Matthew is framed as a dispute among Jews of the first century about a grave and laid on particular leaders, not a people, and "condemned" without an agent became "crucified by Rome". One slip was fixed in the Easter accounts piece: it said all four Gospels have the women told by a messenger and Jesus appearing, but John has Mary alone and no announcement by the angels, and Mark only the promise. All five and the area stay pending.

### The area "contradictions" (pending)

Slug `contradictions` (the plan's), title as in `areas.json`. Records in `docs/work/elite/apol-pilot/contradictions/` (index.md and five pieces), data in `client/public/questions/contradictions/`. The plan lists twenty questions; this run took the five a skeptic most often raises, plan items 1 and 7 (the census, with the birth narratives' dating), 2, 4 (with item 9, "Jeremiah" in Matthew 27:9), 3 and 11 (with item 13, Goliath).

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| Luke says Jesus was born during a census taken while Quirinius governed Syria. Josephus dates that census to AD 6, about ten years after Herod died. Didn't Luke get it wrong? | /questions/contradictions/the-census-of-quirinius | 2,160 | y |
| Matthew and Luke give Jesus two different family trees, with different fathers for Joseph. Doesn't that show at least one of them was made up? | /questions/contradictions/the-two-genealogies | 2,190 | z |
| Matthew says Judas hanged himself; Acts says he fell headlong and burst open in a field he had bought. Can both be true? | /questions/contradictions/how-did-judas-die | 2,043 | aa |
| Mark says Jesus ate the Passover with his disciples and was crucified at the third hour. John says he was sentenced on the day of Preparation for the Passover, about the sixth hour. Don't the Gospels disagree about when Jesus died? | /questions/contradictions/the-day-of-the-crucifixion | 2,172 | ab |
| Samuel and Kings tell the same history as Chronicles, but their numbers often disagree. If the Bible can't keep its numbers straight, why trust it on anything? | /questions/contradictions/numbers-in-samuel-kings-and-chronicles | 2,196 | ac |

Each difficulty is set out from the BSB with references, and where the BSB has already chosen a reading (2 Samuel 10:18 and 24:13, 1 Kings 4:26, 2 Chronicles 22:2 and 36:9, 2 Samuel 21:19), from the standard Hebrew text the site already carries (STEPBible's TAHOT, the Leningrad Codex), with the Study Bible notes that say so. Each solution is given with its weakness, and the pages say plainly where a harmonization is strained and where a question is open; the census page says that none of the solutions commands agreement and that a Lukan error is a live possibility. The site takes no side between inerrancy and infallibility and states no view of James's: each page says what Christians who hold inerrancy confess (quoting the Chicago Statement of 1978, read in full in a GitHub copy: articles 10, 13 and 14), what Christians who hold Scripture infallible in what God gave it to teach hold, and what both confess with the Nicene Creed. Ancient sources are quoted only from public-domain translations read in this run: Josephus (Whiston), Justin and Tertullian (Ante-Nicene Fathers), Eusebius with Africanus's letter (McGiffert), Augustine's *Harmony* 3.7, Papias's fragment, Jerome's Latin on Matthew 1:16, Paine's *Age of Reason* (1795), the *Catholic Encyclopedia* (1910) and Brenton's Septuagint. The pieces agree with the Study Bible notes on Luke 2 and 3, Matthew 1, 2 and 27, Acts 1, Mark 14 and 15, John 13, 18 and 19, 2 Samuel 10, 21 and 24, 1 Kings 4, 1 Chronicles 19 to 21, 2 Chronicles 22 and 36 and the introductions to Samuel, Kings and Chronicles; no disagreement was found, so no correction was filed. No consensus is stated as a percentage or head-count. No living author is quoted. The Judas page points to Find Help for a reader whom its subject touches. The questions test now knows the area (five pending pieces).

### What was run

Light gates after each piece (validate-questions, the record diff, the manifest check, no-emdash, links, the search-index check): all 0. After merging the branch from origin: pnpm check 0; all 41 commands of the content-gates step, each exit code read directly, 0; pnpm test 158 files passed, 7 skipped, 1,837 tests passed, 73 skipped; pnpm build 0; sitemap 0 (13 /questions addresses, none under /questions/contradictions or /questions/jesus); prerender 0 (3,092 pages; the contradictions area and its five pieces say noindex, follow); audit:canonicals 0 failures, 0 not prerendered. Each heavy command started with the one-minute load under 6 (highest 5.39). Served build (`serve-like-vercel.mjs`, port 4663, Playwright at 390): the area page, the five pieces and a jesus piece say noindex and carry the review line, with no sideways scroll and no console errors; the room links no pending area; site search for "Quirinius", "genealogy" and "Judas" finds no library page. Screenshots in /home/user/elite-shots/apol8/. The server was stopped and dist/ deleted.

### What remains in the area

From the plan's twenty: Abiathar in Mark 2:26, the resurrection accounts (done in the jesus area), the birth narratives beyond the census (Egypt, Herod's massacre), the general "Jesus, Interrupted" case, Mark's "Isaiah" for a combined quotation, the two creation accounts, Paul and James on faith and works, Paul and Acts on the visits to Jerusalem, whether Jesus expected the end within a generation, the fig tree and the temple, the Chicago Statement and its critics at length, how a Christian should handle a contradiction he can't solve, and the genealogies and ages in Genesis 5 and 11. James's read of the five before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 13. Sixteenth run (2026-11-20): an editor's read of the contradictions area, and the Old Testament area

### The editor's read of the five contradictions pieces and the area page

An independent read, as a skeptic who knows the texts, as an inerrantist scholar and as a scholar who holds Scripture infallible in what God gave it to teach. Twenty-five changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Sixteenth run". The Chicago Statement was fetched again from its GitHub copy and every quotation checked against articles 10, 13 and 14 (all correct); article 11 ("may be distinguished, but not separated") now stands in the area page's word list, since the page had used "infallibility" for one view only. Sentences that leaned were reframed: the census page's "He may have" and "a live possibility" now say they are historical judgments ("on the evidence historians can weigh", "can't be ruled out on the historical evidence alone"); the numbers page judges the copies, not the books, and gives the inerrantist's view of the differences that aren't copying errors. The independence of Matthew and Luke is stated as the majority view in three places. The census page's "seven years" became "six or seven". On the Judas page, for a reader in distress: the means is named once, in Matthew 27:5, and nowhere else (a second quotation, Ahithophel's, an added detail, "the rope or branch", and the means in the page's own question, short answer and summaries were removed; the question now reads "Matthew and Acts tell Judas's death differently: in one he takes his own life, in the other he falls headlong in a field he had bought. Can both be true?", at the same address); Find Help now stands in the page's opening prose; and the closing "one who despaired and one who wept and was restored", which could be heard as a verdict on a person who died and on his end, became the risen Jesus seeking Peter out (John 21:15-17). The flagged sources were checked: the Tivoli inscription in the *Prosopographia Imperii Romani* (1898), Tertullian's date from *Against Marcion* 1.15 itself, Filmer, Steinmann, Thiele, Japhet, Williamson, Bauckham, Jaubert and Humphreys by catalogue and review (secondary), Machen's view by a secondary source only; nothing needed cutting. All five and the area stay pending.

### Why this area next

Section 4.5 builds the areas in the order text, authors, contradictions, Jesus, Old Testament, science. The first five had pieces and science too, so the plan's next area with none was area 6, the Old Testament, slug `old-testament`. The brief's fallback (God's existence and evil) applied only if the plan left the choice open; it doesn't. Area 8 (evil) and area 1 (God) remain.

### The area "old-testament" (pending)

Records in `docs/work/elite/apol-pilot/old-testament/` (index.md and five pieces), data in `client/public/questions/old-testament/`. The plan lists eighteen questions; this run took the five a skeptic most often raises, folding plan items 1 (the exodus), 2 (Jericho and the conquest, with Ai and Hazor and the settlement models), 10 (the command to destroy, with Kant's question), 4 (Daniel's date) and 5 with 18 (the flood and borrowing).

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| No Egyptian record mentions the exodus, and archaeologists have found no trace of two million people in the Sinai desert. Did it happen at all? | /questions/old-testament/did-the-exodus-happen | 2,218 | ad |
| Archaeologists found no walled city at Jericho when Joshua would have come, and Ai was already a ruin. Wasn't the conquest of Canaan a legend? | /questions/old-testament/jericho-and-the-conquest | 2,092 | ae |
| Deuteronomy tells Israel to leave nothing alive that breathes in the cities of Canaan. How can a good God command that, and how can anyone know he did? | /questions/old-testament/the-command-to-destroy-the-canaanites | 1,872 | af |
| Daniel's visions trace the Greek kings in detail down to Antiochus IV and then seem to go wrong about how he died. Wasn't the book written in the 160s BC, after the events it appears to predict? | /questions/old-testament/when-was-daniel-written | 2,172 | ag |
| Babylon told of a great flood, a boat, the birds and a sacrifice long before Genesis was written. Didn't Genesis simply borrow a Babylonian myth? | /questions/old-testament/the-flood-and-babylon | 1,969 | ah |
Ancient and older texts are quoted only from public-domain translations read in GitHub copies this run: the Merneptah inscription as the *Catholic Encyclopedia* (1909) prints it; Livy 1.8 in Spillan's translation; Gilgamesh XI and Budge's account of the Ammi-saduqa tablet and Poebel's Sumerian version in the British Museum's 1929 translation; Jerome's *Commentary on Daniel* in Archer's translation, with the prologue's Latin; Josephus in Whiston; 1 Maccabees and Sirach in the King James Apocrypha. Kant's note on Abraham was read in the Akademie German and is paraphrased. Scripture is quoted from the BSB, checked by script (three quotations with an ellipsis checked by hand). No living author is quoted, and no consensus is given as a percentage or head-count. The site takes no side on the date of the exodus, the large numbers, the historical reading of Joshua, the readings of the conquest commands, the date of Daniel or the extent of the flood; each page states what all confess. The pieces agree with the Study Bible's notes on Exodus 1, 2, 6, 12 and 13, Joshua 6, 7 and 11, Deuteronomy 20, Daniel 3, 5, 6 and 11 and its introduction, and Genesis 6 to 8, and with the Honest Answers on the conquest and on Genesis 1; no disagreement was found, so no correction was filed. Two facts in the plan's own map were corrected in use: Hoffmeier's *Israel in Egypt* is 1997 (the map says 1996), and Kenyon's book covers 1952-56. The questions test now knows the area (five pending pieces).

### What remains in the area

From the plan's eighteen: camels in Genesis, the authorship of the Pentateuch, David and Solomon (Tel Dan), what outside sources confirm (Merneptah, Mesha), Genesis 1 to 11 as a whole, slavery, the "angry God of the Old Testament", the Old Testament laws Christians don't keep, women in the law, the cursing psalms, sacrifice, and Abraham and Isaac. James's read of the five before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 14. Seventeenth run (2026-11-20): an editor's read of the Old Testament area, and the area on evil, suffering and judgment

### The editor's read of the five Old Testament pieces and the area page

An independent read, as an archaeologist skeptical of apologetics, as a Jewish reader, as a conservative scholar holding an early exodus and a sixth-century Daniel, and as a scholar holding the late dates. Thirty-eight changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Seventeenth run". Every source the sixteenth run held only as secondary was rechecked. GitHub is still the only host this machine reaches, so each was either confirmed in a readable copy there or in the Study Bible's own notes, narrowed to what those confirm, or cut. Cut, because nothing could be opened: the 1995 radiocarbon study of Jericho, Frymer-Kensky's article, Friedman's *The Exodus*, the 2025 Qumran study (its preprint abstract, read on GitHub, says nothing of Daniel), and Heidel's *Gilgamesh Epic* (the one readable record gives a different year). Narrowed: Kitchen (now Hoffmeier, in the Note on Exodus 12's words), Kenyon's and Wood's specifics, Hazor's burning, the Merneptah date, Delitzsch and Finkel. One error was found and corrected from a primary text: the Canaanite page said an English captain defended the Mystic killing of 1637 "with these very chapters open," but Underhill's *Newes from America* (1638), read in full, points to Scripture in general and to David's war, never to Deuteronomy or Joshua; his own sentence is now quoted. For the readers named: the late-date believer now has a conclusion he can sign (Goldingay, in the Note on Daniel 7); the critic's best point about Belshazzar is stated; the young-earth and global-flood readers have their views in their own terms; "his people's understanding" became "an ancient world" in the accommodation reading. The Canaanite page mentions no modern conflict and gives no warrant against any people. All five and the area stay pending.

### The area "evil" (pending)

Slug `evil` (the plan's), title as in `areas.json`. Records in `docs/work/elite/apol-pilot/evil/` (index.md and five pieces), data in `client/public/questions/evil/`.

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| If God is all-powerful and wholly good, why is there evil at all? Didn't J. L. Mackie show that the two can't both be true? | /questions/evil/the-logical-problem-of-evil | 2,078 | ai |
| Even if God and evil don't contradict each other, doesn't so much suffering that serves no purpose anyone can see make God unlikely? | /questions/evil/the-evidential-problem-of-evil | 2,037 | aj |
| Earthquakes, cancer and the suffering of animals over ages before there were any people aren't caused by anyone's choice. How can a good God allow them? | /questions/evil/natural-evil-and-animal-suffering | 2,137 | ak |
| If a loving God existed, wouldn't he make himself known to everyone who is open to him? Don't sincere unbelievers show that there is no such God? | /questions/evil/the-hiddenness-of-god | 1,939 | al |
| How could a good God punish anyone forever? Isn't the doctrine of hell itself the worst problem of evil? | /questions/evil/hell-and-the-justice-of-god | 2,196 | am |

Each piece's short answer opens with one plain sentence that the page argues and that the wisdom pages and Find Help are for someone hurting now, and the area page opens the same way. No page offers a reason for any particular suffering, and each says that some Christian answers are worse than silence or that no answer explains a particular evil, in agreement with the Honest Answer on suffering and the film "Why do bad things happen?". The philosophers' arguments (Mackie, Plantinga, Rowe, Wykstra, Hick, Draper, Adams, Schellenberg) are paraphrased from the Stanford Encyclopedia's and the Internet Encyclopedia's articles, read in full in GitHub copies; no living author is quoted. Quoted from texts read this run: Hume's *Dialogues*, Dostoevsky in Garnett's translation, Pascal's *Pensées* 430, Origen's *De Principiis* 1.6.2, Russell's lecture, the Augsburg and Westminster Confessions and the Athanasian Creed. Mackie's later concession and Rowe's note are stated as each said it, from the reference works that quote them; nothing is given as a head-count. The hell page sets out eternal conscious punishment and conditional immortality with the strongest difficulty of each and takes no side between them, states the hope of universal restoration as outside most confessions without contempt, speaks of no person's fate, says nothing of suicide, and carries a paragraph for a reader afraid for himself or for someone who has died. The pieces agree with the Honest Answers on suffering, natural evil, hell and those who never heard, with the wisdom topics on suffering and heaven and eternity, and with the Study Bible's notes on Job 1 and 42, Psalms 13 and 88, Isaiah 45, Luke 13, John 9, Romans 8, Mark 8 and 2 Thessalonians 1; none was contradicted. The questions test now knows the area (five pending pieces).

### Found, for the editor of the Honest Answers (not changed: `answers.ts` is outside this run)

- The hell answer's ledger row gives the essay title "The Problem of Hell: A Problem of Evil for Christians" (1993) to Thomas Talbott; the Stanford Encyclopedia's bibliography gives it to Marilyn McCord Adams (in Stump, ed., *Reasoned Faith*, Cornell, 1993). The answer's text ("Talbott argued that hell ... is a problem of evil that Christians have to answer among themselves") may rest on that conflation.
- The hell answer closes "They don't disagree that a person can choose it", which those who hope for universal restoration, whom the same answer names, would not sign.

### What remains in the area

From the plan's twelve: Ehrman's *God's Problem* as a page of its own, evil done to children, why God doesn't stop the worst evils, prayer, the righteous suffering and the wicked prospering (Job, Psalm 73), God's sovereignty and evil, and grief and the argument. James's read of the five before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 15. Eighteenth run (2026-11-20): an editor's read of the evil area, and the area on God, faith and reason

### The editor's read of the five evil pieces and the area page

An independent read, as an atheist philosopher of religion, as a bereaved parent who arrived from a search, and as a Christian holding each view of hell in turn. Twenty changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Eighteenth run". The care openings and the closing links to Find Help were found right and left unchanged; no sentence was found offering a reason for anyone's suffering. The sources the seventeenth run held only from reference works or earlier rows were rechecked in readable copies on GitHub. Verified and kept: Mackie's 1982 concession (the Internet Encyclopedia's quotation of p. 154; the short answer now carries his reservation as well), Rowe's note (quoted from Howard-Snyder's 1996 volume in a study note), Draper 1989 (the Stanford Encyclopedia quotes his hypothesis; the page had widened "nonhuman persons" to "any being" and now doesn't), Kvanvig, Swinburne, the condemnation of 553 (the Stanford Encyclopedia's wording, which the page matches), and Luther's Heidelberg Disputation, read in Latin with its year in a public-domain edition (theses 19 to 21). Narrowed: Southgate (to the "only way" answer the Stanford Encyclopedia attributes to him), Murray (title and year only), Talbott (the second edition the bibliography gives), Ehrman (the book and its subject; his reason for leaving the faith and the claim line drawn from it cut). Cut: Malagrida's pamphlet (only its title and year were readable; its content rested on searches), replaced by John Wesley's own question after Lisbon, read in full in his *Works*, whether God was "now making inquisition for blood", which also puts the page's own witness inside the indictment; and Stott (no readable copy of the 1988 dialogue), replaced in the reading list by Walls (1992). For the atheist reader: step 3 of the logical piece now says it holds on the view of freedom the defence assumes; the natural-evil piece no longer claims the pattern of suffering is "not much more surprising" on Christian belief than on indifference, and it adds the cost a careful critic would name (each added doctrine lowers the account's prior probability). For the Christian readers of the hell page: "the church has not received" universal restoration became "the church's councils and most of its confessions"; "what remains when a person refuses" is now said to be the account of many, not all; and "the objection is aimed at a God Christians don't confess" became a claim that holds only against a God who delights in pain. All five and the area stay pending.

### The area "god" (pending)

Slug `god` (the plan's), title "God, faith and reason" as in `areas.json`. Records in `docs/work/elite/apol-pilot/god/` (index.md and five pieces), data in `client/public/questions/god/`. The plan lists sixteen questions for the area; this run took five, folding plan items 2 to 6 and 13 (and the Euthyphro, plan item 9.2) into four pages and adding the ontological argument.

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| Why is there something rather than nothing? Couldn't the universe simply exist without God, or come from nothing by the laws of physics? | /questions/god/the-cosmological-argument | 2,361 | an |
| If everything needs a cause, who made God? And isn't it the believer's job to prove that God exists, not the unbeliever's job to disprove him? | /questions/god/who-made-god | 1,931 | ao |
| Can anyone prove that God exists just by thinking about the idea of God? What is wrong with the ontological argument, and is anything right about it? | /questions/god/the-ontological-argument | 1,951 | ap |
| Isn't morality just evolved instinct or social agreement? And doesn't Plato's Euthyphro show that goodness can't depend on God anyway? | /questions/god/the-moral-argument-and-euthyphro | 2,069 | aq |
| If our minds are products of unguided evolution, can we trust them? And isn't consciousness simply what brains do? | /questions/god/the-argument-from-reason | 1,902 | ar |

Each argument is set out in numbered premises (the kalam's three lines and the modal ontological argument in the prose, the main argument in the page's numbered steps), and the text after the steps names which step each major objection denies: Russell and Hume's twenty particles the first step of the contingency argument, Hume's "why not the material universe" the second, Kant the meaning of the conclusion; Russell's parity the second step of the who-made-God argument and Dawkins the third; Kant the third step of Anselm's, Gaunilo and Aquinas the second, the modal version's critics its possibility premise; Mackie and Street the first step of the moral argument, Wielenberg and the Euthyphro the third; eliminativists the first step of the argument from reason, reductive physicalists and Plantinga's critics the second, and the "God explains nothing" reply the third. Each page says what the argument shows if sound (a necessary being; a being that is either necessary or impossible; a personal and good ground of obligation; that mind is more basic than matter) and what it doesn't (not yet the God of Abraham, the Trinity, the incarnation or the resurrection), states the confessional floor as confession, and names the bridge to it as historical by one sentence pointing to the library's area on the historical Jesus and the resurrection, with no link to that pending area. No page baptizes physics or takes a position on the age of the universe or on evolution.

Ancient and older texts are quoted only from public-domain translations read in GitHub copies: Hume's *Dialogues* (part 9; the answering speaker is Cleanthes), Leibniz's *Principles of Nature and of Grace* in Robert Latta's translation (1898), Aquinas in the English Dominican translation (I q.2 a.1 and a.3, q.3 a.7, q.6 a.3), Kant's *Critique of Pure Reason* in Meiklejohn's translation, Anselm's *Proslogion* and Gaunilo's reply with Anselm's answer in Sidney Norton Deane's translation (1903), Plato's *Euthyphro* in Jowett's, Russell's lecture of 1927 (with Mill's sentence as Russell quotes it), and Darwin's letter to William Graham of 3 July 1881 in the *Life and Letters* (1887). Living philosophers (Craig, Plantinga, Swinburne, Oppy, Pruss, van Inwagen, Wielenberg, Street, Dennett, Chalmers, Nagel, Krauss, Dawkins) are paraphrased from the Stanford Encyclopedia's and the Internet Encyclopedia's articles, read in GitHub copies, and each row says which. No consensus is given as a percentage or head-count. Scripture is quoted from the BSB and checked by script (Psalms and Psalm 14:1 by hand).

The pieces agree with the Honest Answers "Does God actually exist?" (contingency, with the weight on the same premise; Dawkins answered the same way, here at greater depth) and "Can you be good without God?" (the same figures and the same answer to the Euthyphro), with the science area's page on the beginning and fine-tuning (Borde, Guth and Vilenkin, the quantum "nothing", no claim that the Big Bang proves God), with the Bible Explorer's films "Does God exist?" and "Who made God?", and with the Study Bible's notes on Exodus 3, Acts 17, Psalm 14, Romans 2, Micah 6, Genesis 1 and John 1; none was contradicted. There is no Honest Answer titled "Who made God?" in `client/src/data/answers.ts`: the question is answered there in a paragraph of "Does God actually exist?" and in the Explorer film. The questions test now knows the area (pending, with pieces).

### What remains in the area

From the plan's sixteen: divine hiddenness (written in the evil area), faith as belief without evidence, faith as wishful thinking, Pascal's wager, meaning without God, religious experience, which God (the God of the philosophers and the God of Abraham), good without God and the New Atheists (each an Honest Answer already). James's read of the five before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 16. Reading order for James

Since the twenty-sixth run (2026-11-21) every page below is live except one. The nine areas went live in the twenty-fifth run on James's word "publish all of this when ready"; the five newest science pieces and four of the five newest morality pieces went live in the twenty-sixth, after their independent second read. The one page still pending is the morality page on homosexuality: it has had its second read, and it waits for James's word on whether it should state where he lands (the paragraph prepared for that is in the ledger's "Twenty-sixth run"). It says noindex, carries the review line, is in no menu, sitemap, search index or llms.txt, and can be opened at its address on the preview. Each line gives the address, the length (argued prose for a piece, the whole page for an area page), the one sentence in it most worth weighing, quoted exactly, and the question it leaves for you. The areas are in the plan's order. To take a live page back down, set its `status` to "pending" in its file under `client/public/questions/<area>/` (or the area's `status` in `areas.json` for a whole area), run `node scripts/build-questions-index.mjs` and `pnpm exec tsx scripts/build-search-index.mjs`, and deploy; the page then says noindex and leaves every list, the sitemap and the search.

### Area 1. God, faith and reason

- **Area page**, /questions/god (737 words). "Together they are a case to be weighed, and a thoughtful person can weigh it and still say no." Open question: these pages, in the site's third-person voice, claim only that the arguments are evidence; your Honest Answer "Does God actually exist?" says, in your first person, "God exists. I believe that." Do you want the library to state a verdict of its own anywhere, or to leave the verdict to the answers written in your voice?
- **Why is there something rather than nothing?**, /questions/god/the-cosmological-argument (2,459). "If the contingency argument is sound, it shows that there is a necessary being on which everything else depends." Open question: the page, like your God answer, leans on contingency rather than the kalam; is that the emphasis you want?
- **Who made God?**, /questions/god/who-made-god (1,952). "Whether there is such a being is the real question, and an unbeliever can reasonably answer no." Open question: are you content for the library to say that unbelief can be reasonable, as the skeptic's test requires?
- **The ontological argument**, /questions/god/the-ontological-argument (2,004). "The argument is not a proof that should persuade a doubter, and it isn't offered here as one." Open question: do you want a page on an argument the page itself doesn't think persuades, kept for what it shows about God's necessity?
- **The moral argument and the Euthyphro**, /questions/god/the-moral-argument-and-euthyphro (2,095). "Reasonable people weigh it differently, and Wielenberg's view is a real alternative that this page doesn't claim to have refuted." Open question: the page takes no side between natural law and divine command accounts; do you hold one?
- **The argument from reason and consciousness**, /questions/god/the-argument-from-reason (1,918). "The argument from reason and consciousness is not a proof, and it is weaker if neuroscience closes the gap it points to." Open question: the page sets out soul and body as substance dualists, Thomists and Christian physicalists hold them, and takes no side; do you want one stated?

### Area 3. Who wrote the Gospels and the New Testament, when, and who chose the books

- **Area page**, /questions/authors (1,176 words). "They are also questions on which Christian scholars themselves disagree." Open question: do you want the library to state your own view on dates and authorship, or keep setting out the range?
- **The Gospels are anonymous**, /questions/authors/the-gospels-are-anonymous (2,269). "The evidence doesn't prove that the four traditional authors wrote the four books." Open question: is "more likely than not that the names travelled with the books" as far as you want the page to go?
- **Written decades later**, /questions/authors/written-decades-later (2,190). "On the dating most scholars hold, they were written decades later, and at least two of their authors, on the church's own account, were not among Jesus' followers." Open question: the earlier dates are stated as a minority view with serious arguments; is that the balance you want?
- **Stories changed in the telling**, /questions/authors/stories-changed-in-the-telling (2,055). "The stories did change in the telling, and the Gospels show it: the same event told with different details, the same saying in different words." Open question: are you content to concede that much change, as the page does, before the reply?
- **Four Gospels and the rest**, /questions/authors/four-gospels-and-the-rest (2,112). "It's true that the church judged books partly by whether their teaching agreed with the faith it had received, and critics like Bart Ehrman are right to say so." Open question: does the concession to Ehrman read to you as fair or as too much?
- **Forgeries in the New Testament**, /questions/authors/forgeries-in-the-new-testament (2,056). "Some New Testament letters may not have been written by the men whose names they carry, and the case for doubting them is serious, literary, and made by careful scholars of every conviction." Open question: what, in your view, would it mean for Scripture's authority if a letter was written in an apostle's name by a disciple? The page leaves it open.
- **What kind of writing are the Gospels?**, /questions/authors/what-kind-of-writing-are-the-gospels (2,076). "The genre doesn't prove those reports true." Open question: the page concedes plainly that ancient biography is not modern history (selection, compression, arrangement by topic, speeches in the writer's words) and quotes the Chicago Statement's Article XIII without taking a side on inerrancy's wording; is that the concession you want made?
- **The Synoptic problem**, /questions/authors/the-synoptic-problem (1,985). "So for the stories all three tell, the Synoptic Gospels are not three independent witnesses, and Christians who count them that way overstate the case." Open question: the page takes no side on Q or on the order of the Gospels, and now states each view's hardest question as the guide does; do you hold a view you want stated?
- **Is John history or theology?**, /questions/authors/is-john-history-or-theology (2,050). "John interprets history." Open question: the page concedes every difference from the first three Gospels and says no discourse can be claimed as verbatim; is that the concession you want made?
- **Did Constantine decide the Bible?**, /questions/authors/did-constantine-decide-the-bible (2,236). "The story that the emperor made the Bible is a novelist's fiction." Open question: the page concedes that no single act closed the canon for every church and that the Old Testament still differs among Protestant, Catholic and Orthodox Bibles, and it now describes the Protestant, Catholic and Orthodox canons each in its own terms, with Catholic teaching stated as the site's guide states it (the books' authority from God, the certain knowledge of them through the church); do you want your own view of the canon stated?
- **Did Paul invent Christianity?**, /questions/authors/did-paul-invent-christianity (2,193). "Paul was a Jew, and he didn't invent the faith." Open question: the page takes no side among the older Protestant, the "new perspective" and the Catholic and Orthodox readings of Paul on the law; do you hold one? The twenty-third run strengthened its paragraph on Judaism with Schechter's and Abrahams's own words; would you want a Jewish reader to read it before it goes live?

### Area 4. Contradictions and hard passages

- **Area page**, /questions/contradictions (928 words). "These aren't inventions of skeptics, and they weren't discovered in the modern age." Open question: the area takes no side between inerrancy and infallibility in what God gave Scripture to teach; do you want your position stated?
- **The census of Quirinius**, /questions/contradictions/the-census-of-quirinius (2,181). "On the evidence historians can weigh, he may have, and an honest answer has to say so." Open question: this is the sentence an inerrantist reader will weigh most; is the frame ("on the evidence historians can weigh") enough?
- **The two genealogies**, /questions/contradictions/the-two-genealogies (2,206). "Each solution has a real weakness, and none is established." Open question: is it right to leave the genealogies unharmonized?
- **How did Judas die?**, /questions/contradictions/how-did-judas-die (2,073). "The common harmonization, that the body fell after the death Matthew describes, is possible but adds what neither text says, and a third account from Papias shows the story was told more than one way early on." Open question: this page touches suicide; please read it as a pastor for a reader bereaved that way before it goes live.
- **The day of the crucifixion**, /questions/contradictions/the-day-of-the-crucifixion (2,182). "They seem to, on both the day and the hour, and the question isn't settled." Open question: do you want one solution preferred?
- **Numbers in Samuel, Kings and Chronicles**, /questions/contradictions/numbers-in-samuel-kings-and-chronicles (2,214). "None of them touches what these books were written to teach, and they show that the Chronicler wrote with the older books open, not hiding them." Open question: is "what these books were written to teach" the line you want drawn?

### Area 5. The historical Jesus and the resurrection

- **Area page**, /questions/jesus (1,233 words). "They are questions of history, and they can be argued with the tools historians use on any ancient life: the dates of the sources, who wrote them and why, what outsiders said, and which explanation best accounts for what all sides grant." Open question: the God area points here as the bridge from the God of the arguments to the God who raised Jesus; are you content for this area to carry that weight?
- **Did Jesus exist?**, /questions/jesus/did-jesus-exist (2,497). "He almost certainly existed, and the case doesn't depend on believing the Gospels are inspired." Open question: none beyond your read; the page is at the top of the length range.
- **The empty tomb**, /questions/jesus/the-empty-tomb (2,091). "Historians still divide over the empty tomb." Open question: is that concession the right size?
- **The appearances and the alternatives**, /questions/jesus/the-appearances-and-the-alternatives (2,204). "That God raised Jesus explains all of it, and what keeps a reader from that explanation is usually not the evidence but a prior judgment about whether God acts." Open question: a skeptic may feel this sentence describes him rather than meets him; keep it, soften "usually", or cut it?
- **The resurrection accounts disagree**, /questions/jesus/the-resurrection-accounts-disagree (1,991). "The differences are real, and some of them can't be smoothed away." Open question: is that concession the one you want to make?
- **Can historians affirm a miracle?**, /questions/jesus/can-historians-affirm-a-miracle (2,008). "Whether to believe it can't be settled by history alone." Open question: none beyond your read.
- **How did Jesus become God?**, /questions/jesus/how-did-jesus-become-god (2,497). "Worship of that kind was there almost from the start." Open question: Ehrman's case is now stated in his own words from a reading of his book, his blog and an interview (transcripts, paraphrased), and the page grants him that Paul's Christ was pre-existent; the reading of Galatians 4:14 that would make Paul's Christ an angel is stated on its merits, since no source opened here shows Ehrman making it. Would you want a scholar who knows *How Jesus Became God* to read the page before it goes live?
- **Did Jesus claim to be God?**, /questions/jesus/did-jesus-claim-to-be-god (2,474). "Together they make a claim no ordinary teacher or prophet made, and John says openly what Mark shows in action." Open question: the page concedes that Jesus never says "I am God" in the first three Gospels and that believing scholars differ on how much of John's discourses gives his own words; is that the concession you want made?
- **The virgin birth**, /questions/jesus/the-virgin-birth (2,391). "It can show that this is not the legend the objection describes." Open question: the page names Andrew Lincoln's view, that the Gospel writers may not have meant a biological claim, as a Christian scholar's, and states the creeds' confession against it without contempt; and it takes no side on Mary's perpetual virginity. Is that the handling you want?
- **Did Jesus predict the end within a generation?**, /questions/jesus/did-jesus-predict-the-end-within-a-generation (2,112). "It argues that a failed date is not the only, or the most natural, reading of what Mark kept." Open question: the page sets out the preterist, futurist and mixed readings and chooses none, as the Study Bible's notes don't; do you hold one?
- **Did the disciples die for their belief?**, /questions/jesus/did-the-disciples-die-for-their-belief (2,044). "Their deaths can't show that they weren't mistaken, and the argument should never be made to carry more than that." Open question: the page is more cautious than many popular books (only four deaths treated as well attested; sincerity, not truth); is that the strength you want the argument given?

### Area 6. The Old Testament: history, archaeology, violence and law

- **Area page**, /questions/old-testament (1,407 words). "And readers of every kind, believers among them, have found the commands to destroy the Canaanites among the hardest words in Scripture." Open question: the area takes no side on the date of the exodus, the numbers, Joshua, Daniel, the flood's extent, the authorship of the first five books or the place of the law; do you want any of your views stated?
- **Did the exodus happen?**, /questions/old-testament/did-the-exodus-happen (2,199). "An exodus from Egypt remains a reasonable historical conclusion." Open question: is "reasonable" as far as you want to go?
- **Jericho and the conquest**, /questions/old-testament/jericho-and-the-conquest (2,017). "Archaeology has made a sudden conquest of the whole land in one generation hard to defend, and an honest answer should say so." Open question: this concession will trouble some readers; is it the one you want made?
- **The command to destroy the Canaanites**, /questions/old-testament/the-command-to-destroy-the-canaanites (1,885). "Under all of them two things hold: the command was tied to one land and one moment, and it gives no one today any warrant for violence." Open question: the page sets out four readings and ranks none; do you hold one?
- **When was Daniel written?**, /questions/old-testament/when-was-daniel-written (2,228). "Christians who confess the same faith hold both dates." Open question: do you want your own date stated?
- **The flood and Babylon**, /questions/old-testament/the-flood-and-babylon (1,971). "Genesis almost certainly tells a story its neighbors also told." Open question: are you content with "almost certainly"?
- **Who wrote the first five books?**, /questions/old-testament/who-wrote-the-first-five-books (2,135). "So: the evidence shows that the first five books had more than one hand in their final form, and it doesn't settle how much; neither the strict view that Moses wrote every word nor the claim that the critics have proved a post-exilic anthology is established, and Christians who confess the same Scripture hold views across that range." Open question: the page reads Jesus' "Moses wrote" as identifying the books by the lawgiver at their center without settling every question of their editing, and it states the traditional reading (that his words assert Mosaic authorship of the whole) as a view many hold; is that the handling you want, given question 1 of section 6 on inerrancy?
- **The God of the Old Testament**, /questions/old-testament/the-god-of-the-old-testament (2,213). "That contrast is false, and this site rejects it." Open question: the page says in the site's voice that the contrast between an angry God of the Jews and a loving God of the Christians has fed contempt for Jews, and the twenty-fourth run added Schechter's witness that those who keep the Torah have known it as "bliss and happiness", not a burden; please read that paragraph as a Jewish reader would.
- **Which Old Testament laws?**, /questions/old-testament/which-old-testament-laws (2,235). "This page does not argue that question or any other contested moral question." Open question: the page names that the objection is most often pressed about sexual ethics and stops there, in keeping with section 6, question 7; is that the right place to stop? It now says that its modern form is given as it is commonly put, since no published modern objector could be read from here; do you know one you would want named?
- **Abraham and Isaac**, /questions/old-testament/abraham-and-isaac (2,231). "No one should read this chapter as a pattern for harming anyone." Open question: please read the care paragraph and the short answer's opening as a pastor would, for a reader who is frightened by what he has heard or been told. The page now also closes with a care line, says no reader is asked to obey a voice, a leader or a feeling against conscience, and gives the Talmud's Rosh Hashanah 16a in paraphrase with Rodkinson's translation named.
- **What archaeology shows**, /questions/old-testament/what-archaeology-shows (2,195). "Claims of proof and claims of disproof both say more than archaeology can." Open question: the page names Sayce's book of 1884 as an example of the older "confirmations" approach while using its translations, and now says on the page that his readings are dated and that each one used is backed by a modern reference work or the Study Bible's notes; is that fair to the tradition of apologetics you stand in?

### Area 7. Science

- **Area page**, /questions/science (1,508 words). "The sciences date the universe at about 13.8 billion years and the earth at about 4.54 billion, and hold that life has a long history; the laws of nature are found, tested and used, and they work." Open question: the page gives these as the sciences' findings, not the site's view; the plan's question 2 (age of the earth, evolution, Adam) is still yours to answer.
- **Has science made God unnecessary?**, /questions/science/has-science-made-god-unnecessary (2,055). "Science has made one kind of god unnecessary, and Christians should be glad to see him go." Open question: none beyond your read.
- **Galileo and the war**, /questions/science/galileo-and-the-war (2,079). "The church did condemn Galileo, and it was wrong to." Open question: none beyond your read.
- **Miracles and the laws of nature**, /questions/science/miracles-and-the-laws-of-nature (2,068). "Most miracle reports deserve doubt." Open question: is that the right concession to put first?
- **The beginning and fine-tuning**, /questions/science/the-beginning-and-fine-tuning (2,066). "They are evidence to weigh, not a proof." Open question: none beyond your read; the God area's cosmological page agrees with it.
- **Evolution and Genesis**, /questions/science/evolution-and-genesis (2,388). "This site takes no side among them." Open question: whether that stays so is your decision (the plan's question 2).
- **How old is the earth?**, /questions/science/how-old-is-the-earth (2,252). "This site takes no side among them." Open question: the page lets White (1896) state the objection and concedes that the early church held a young world, quoting Augustine's "not yet six thousand years"; is that the concession you want made, and does the page's handling of the readings agree with your Honest Answer on Genesis 1 as you would want?
- **Adam, Eve and human origins**, /questions/science/adam-eve-and-human-origins (2,166). "What the doctrine of sin requires about Adam is itself where Christians differ." Open question: the page sets out a recent first pair, real individuals within a larger population and Adam as a figure for every human, takes no side, and says the traditions differ on what original sin requires; do you want your own view of Adam stated (the plan's question 2)?
- **Is the mind just the brain?**, /questions/science/is-the-mind-just-the-brain (1,950). "The Christian confession doesn't depend on defeating physicalism." Open question: the page sets substance dualism, Aquinas's hylomorphism and Christian physicalism side by side and takes no side; is that the handling you want, given that most of your readers will have been taught the first?
- **Neuroscience and free will**, /questions/science/neuroscience-and-free-will (1,995). "So: neuroscience has not shown that free will is an illusion; it has shown that awareness of an urge can lag behind the brain's preparation, and the question of whether freedom and responsibility can coexist with prior causes remains philosophical, and among Christians, theological." Open question: the page takes no side between the Reformed and Arminian accounts, as your Honest Answer on election does; do you want either stated as yours?
- **Near-death experiences**, /questions/science/near-death-experiences (1,846). "They do not." Open question: please read the page as a pastor would, for a grieving reader and for one who is thinking of death; Find Help stands in its first paragraph and its last, and the Study Bible's care line on John 11 is reused whole.

### Area 8. Evil, suffering and judgment

- **Area page**, /questions/evil (770 words). "These pages argue; they don't comfort, and they explain no one's grief." Open question: is the care opening right for a grieving parent who lands here from a search?
- **The logical problem of evil**, /questions/evil/the-logical-problem-of-evil (2,128). "It explains no one's suffering, it doesn't by itself reach earthquakes or disease, and it rests on a view of freedom some Christians don't hold." Open question: the page takes no side between Reformed and libertarian views of freedom; do you want yours stated?
- **The evidential problem of evil**, /questions/evil/the-evidential-problem-of-evil (2,022). "William Rowe's argument of 1979 is the strongest form of the problem of evil, and it hasn't been refuted." Open question: are you content for the library to say that?
- **Natural evil and animal suffering**, /questions/evil/natural-evil-and-animal-suffering (2,226). "None explains any one disaster, and none should be offered to someone in it as the reason." Open question: the page now quotes John Wesley reading Lisbon as possible judgment, the same Wesley it later cites with approval; is that the self-implication you want?
- **The hiddenness of God**, /questions/evil/the-hiddenness-of-god (1,944). "That answer has limits, and it can't say why a particular person has not yet found him." Open question: none beyond your read.
- **Hell and the justice of God**, /questions/evil/hell-and-the-justice-of-god (2,293). "Each answers the moral objection at a different point, each has a real difficulty, and this page takes no side between the first two." Open question: do you want your own view of final judgment stated, and in what words?

### Area 9. Morality, sexuality and the church's record

- **Area page**, /questions/morality (1,460 words). "These pages begin there, with the church's record, and they concede its guilt first and plainly." Open question: the pages name particular church bodies only as history, in the site's third-person voice (the Southern Baptist Convention's founding in 1845, its resolution of 1995 and the report of 2022), and say nothing of which body you or your church belong to; is that the division you want? And the plan's pages on morality and on sexuality are not written: do you want them next, and is there a view on sexuality you want stated as yours (the plan's question 7)?
- **The Crusades**, /questions/morality/the-crusades (1,921). "What the record shows is not that Christ's teaching produces holy war, but that the church, given armies and the promise of forgiveness to offer, turned his cross into a soldier's badge." Open question: the conquests before 1095 are stated only to correct the claim that the Crusades came from nowhere, with the words that this lessens nothing; is that balance right for a Jewish or Muslim reader? The reading list lost its one book of Muslim perspectives (Hillenbrand), whose year could not be confirmed here; do you know a work you would want named in its place?
- **The Inquisition**, /questions/morality/the-inquisition (1,940). "That is a judgment on the church. It is not a defense of what was done." Open question: the page now gives no count of the executed (Kamen's estimate could not be confirmed); is an unnumbered statement what you want?
- **Slavery and conquest**, /questions/morality/slavery-and-conquest (1,960). "The church was on both sides, on the wrong side first and for longest." Open question: the page names the Southern Baptist Convention's founding in 1845 and its apology in 1995 as history, in the site's third-person voice; is that right, given that your Honest Answer on slavery states them in your first person?
- **Abuse and its cover-up**, /questions/morality/abuse-and-cover-up (2,070). "No argument on this page excuses that, and no one should be asked to trust a church that has not told the truth about it." Open question: please read it as a pastor would for a survivor before it goes live. It now says at its start and its end to call the police if a child is in danger, says plainly that it gives no legal advice on who must report, and asks no one to trust, return or forgive; should it point to a page that explains the reporting duties of clergy where you serve?
- **Does religion poison everything?**, /questions/morality/does-religion-poison-everything (1,900). "That correction lessens nothing Christians did." Open question: the twentieth-century regimes appear only as the New Atheists' own answer about them is reported; do you want any fuller comparison, given the rule that comparisons may not be used to shrink guilt?
- **What does the Bible say about homosexuality, and why do Christians disagree?**, /questions/morality/what-the-bible-says-about-homosexuality (2,421). "Like the Study Bible's notes, this page sets out both readings in their holders' terms and takes no side." Open question: PENDING, the only page that is. You said on 2026-11-21 that you hold the historic teaching and that you can say so but choose not to; so the page still takes no side, as the Study Bible's notes do, and waits for your word. If you want it stated, the paragraph is ready in the ledger (where you land, how the question is sorted, the strongest objection, the care passage kept whole). Two things to know: the family study presents the historic teaching as the church's, and the live page on sexuality and the body already says in your first person, "I hold the historic view."
- **Is Christianity bad for women?**, /questions/morality/is-christianity-bad-for-women (2,313). "The author of this site holds the complementarian reading: women and men are equal in worth and dignity, and the office of pastor or elder is for qualified men." Open question: that paragraph is new, by your word of 2026-11-21; it names as the objection not fully answered that a church which keeps one office for men has to show by what it does that it holds women equal. Is that the objection you would name?
- **What did the first Christians believe about abortion and infant exposure?**, /questions/morality/the-first-christians-on-abortion-and-exposure (2,375). "The author of this site holds, with the historic teaching traced above, that abortion is wrong." Open question: that sentence is new, by your word of 2026-11-21, and stands directly before the paragraph on mercy and the care passage; please read the opening and the close as a pastor would for a reader who has had an abortion or lost a pregnancy. Augustine and Aquinas are now quoted from their own works, the Church of England from its own representative, and the United Methodist sentence is cut because it could not be confirmed.
- **Is Christian nationalism Christian?**, /questions/morality/is-christian-nationalism-christian (2,189). "This site doesn't teach Christian nationalism as true." Open question: Stephen Wolfe's book still could not be opened; his definition and argument are given as two other writers quote and report them, and the page says so. Is there a defender whose own book you want read before this page is final? The Baptist dissenters are told as history in the third person.
- **Isn't Christian morality just the product of its culture?**, /questions/morality/is-christian-morality-a-product-of-its-culture (2,035). "Every culture that has carried that story has been judged by it, the ones that called themselves Christian first of all." Open question: the page quotes Nietzsche's *Genealogy* but none of its sentences about the Jewish people; do you want a line saying so on the page itself?

### Area 10. Other religions, and those who never heard

- **Area page**, /questions/religions (1,025 words). "The first is that the religions really do differ, about God, about Jesus and about salvation, and that saying so honestly is a form of respect, not a failure of it." Open question: the area's opening paragraph is written for a reader grieving someone who has died; is it the right first word?
- **Are all religions the same?**, /questions/religions/are-all-religions-the-same (2,388). "It tells every believer what his faith really means, from a place none of them stands." Open question: the twenty-first run's editor rewrote the page's account of Hick from the Stanford Encyclopedia's quotations of him (the Real beyond every concrete description; the incarnation not literally true, as he came to read it) and now states his defenders' answer, that he offers a second-order theory, before the reply; the note that his virtues are Paul's fruit of the Spirit now says it is no charge of bad faith. Is Hick now fairly met?
- **Isn't it arrogant?**, /questions/religions/is-it-arrogant-to-say-jesus-is-the-only-way (1,945). "What they claimed is that salvation is a gift in a person, which no one earns and no one is born into." Open question: the page states the claim in the site's third person; your Honest Answer on the only way says, in your first person, "I confess it with them." Do you want the library to say so in your voice anywhere?
- **Those who never heard**, /questions/religions/those-who-never-heard (2,342). "This page takes no side among them." Open question: do you hold one of these views and want it stated as yours? Please read the closing paragraph, written for someone thinking of a person who has died, as a pastor would.
- **Judaism, Islam and Jesus**, /questions/religions/judaism-islam-and-jesus (2,364). "That is a real difference, not a misunderstanding, and both neighbors deserve to have it stated honestly." Open question: the page takes no side on Israel's place in God's purposes or on whether Christians and Muslims worship the same God, as the Study Bible's notes and your Honest Answer on Islam do not; please read it as a Jewish and a Muslim reader would. Would you want a rabbi or an imam you know to read it before it goes live?
- **Only a Christian because of where you were born?**, /questions/religions/only-a-christian-because-of-where-you-were-born (1,924). "What birthplace rightly demands is that every person test what he was given, and the Christian faith, which began among people who had to leave the religion of their fathers to hold it, asks for exactly that." Open question: none beyond your read.

---

## 17. Nineteenth run (2026-11-20): an editor's read of the God area, and the area on morality and the church's record

### The editor's read of the five God pieces and the area page

An independent read, as a working atheist philosopher, as a physicist, as a Thomist and as a Reformed epistemologist, with every numbered argument checked for validity as stated. Twenty-five changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Nineteenth run". Two arguments were not valid as stated and are mended: the cosmological argument's second step now takes in every contingent thing, so that its third step follows; the argument from reason's second step now makes the claim its conclusion needs ("there is serious reason to doubt") instead of saying only that the question "is disputed". One step smuggled a premise: the moral argument's first step said failing an obligation makes a person "answerable", which assumes the personal authority the third step argues for; it now says "rightly blamed". For the physicist, Borde, Guth and Vilenkin's theorem is now stated as the science piece states it (the history it describes has a boundary), with what is unsettled. For the Reformed epistemologist, Plantinga's view is now named as the Stanford Encyclopedia names it (warranted belief without argument); for Christians who, with Swinburne, hold God's existence logically contingent, the ontological page's claim of necessity is now conditioned on the classical understanding. The flagged sources: Leibniz's translator confirmed in a second, independent copy; Russell's teapot passage read in two copies, the magazine detail cut; Aquinas I-II q.87 a.4 and Lewis's *Problem of Pain* (chapters 8 and 9) read and now quoted exactly in the hell and natural-evil pieces; Lewis's fixed-laws argument cut from his name (no copy); Sober cut; Mackie 1982, Wielenberg, both Adamses, Plantinga and Flew now marked as the named reference entry's account. Four of these sat in the evil area's pieces and were mended there. All ten pieces and both areas stay pending.

### Why this area next

Section 4.5 builds area 9 after science and before areas 8 and 10. Areas 8 and 1 were written in the seventeenth and eighteenth runs, so area 9 was the plan's next. Its slug is `morality` and its title "Morality, sexuality and the church's record", as in `areas.json`.

### The area "morality" (pending)

Records in `docs/work/elite/apol-pilot/morality/` (index.md and five pieces), data in `client/public/questions/morality/`. Of the plan's fourteen questions this run took the church's record: items 4, 5, 3 with 7, 8 and 12.

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| Weren't the Crusades a holy war of conquest, and don't they show what Christianity does when it has power? | /questions/morality/the-crusades | 1,884 | as |
| Christians tortured and burned people for what they believed. How can a faith that ran the Inquisition claim to be good? | /questions/morality/the-inquisition | 1,958 | at |
| Christian nations conquered the Americas and built the Atlantic slave trade, and their churches blessed both. Doesn't that discredit the faith they claimed? | /questions/morality/slavery-and-conquest | 1,868 | au |
| Church leaders hid the sexual abuse of children and protected the abusers. How can anyone trust a church, or the faith it preaches, after that? | /questions/morality/abuse-and-cover-up | 1,959 | av |
| Christopher Hitchens said that religion poisons everything. Hasn't religion caused more wars and cruelty than anything else in history? | /questions/morality/does-religion-poison-everything | 1,882 | aw |

Each page concedes the church's guilt first and plainly, in the site's third-person voice, with Catholics and Protestants, Baptists and evangelicals among them, inside the record. The objections are put by their strongest voices, quoted only from texts read in this run: Hume's *History of England* (1762) on the Crusades, Paine's *Age of Reason* (1795) on persecution, Douglass's *Narrative* (1845) and Las Casas's *Brief Account* (1689 English) on slavery and conquest, the 2004 Catholic studies as *The New York Times* reported them on abuse, and the New Atheists as the Internet Encyclopedia of Philosophy sets out their case. The church's own guilt is quoted from its own best minds: Augustine's *Correction of the Donatists* (about 417) and Aquinas's argument that convicted heretics deserve death (II-II q.11 a.3). Its own better voices are quoted too: Tertullian, Lactantius and, through the Study Bible's notes, Hubmaier, Williams and Bayle. Numbers appear only where a readable source gives them, with its uncertainty: Kamen's estimate of about two thousand executed by the Spanish Inquisition between 1480 and 1530 ("Sources differ"), the 2004 study's 10,667 children and 4,392 priests ("an undercount"), the Thirty Years' War's population losses ("vary by region"). No count is given for the Crusades, the conquest, the slave trade or St. Bartholomew's Day. Where comparative history corrects a false claim (that the Crusades were unprovoked; that religion is the root of persecution), the page says so and says that the correction lessens nothing. Christian nationalism is named as the error in the Crusades, the papal grants of conquest and the Peace of Augsburg's rule, and the same instrument is turned on the revolutionary tribunals Paine saw. The abuse page has Find Help in its first sentence and at its end, says three times that abuse is reported to the police, and carries the Study Bible's care lines from 1 Timothy 5 word for word. The pages agree with the Honest Answers on slavery, genocide and the New Atheists, with the essay "Doubt After Church Abuse", and with the Study Bible's notes on Luke 14, Matthew 5, 13 and 26, John 16, Genesis 22, Ephesians 6, Exodus 21, 1 Corinthians 5 and 6 and 1 Timothy 5; none was contradicted. Scripture is quoted from the BSB and checked by script (Psalm 34:18 by hand). No living author is quoted.

Sources used as tertiary are marked so in the ledger: Wikipedia articles read in copies on GitHub, used only for plain facts and for estimates they attribute to a named historian, and one copy whose sentences are shuffled, used only for facts stated within a single sentence. Earlier ledger rows reused without a new primary check are marked "Answer row" (Avalos's charge, Wilberforce's conversion, Noll, Herman, Johnson and VanVonderen).

### Found, for the editor of the Honest Answers (not changed: `answers.ts` is outside this run)

- "Does God actually exist?" says Borde, Guth and Vilenkin "showed that any universe which has, on average, been expanding cannot be infinite in the past". The God area's cosmological page and the science area's page now state the theorem more narrowly (its history, as the theorem describes it, has a boundary; whether that is a beginning or where quantum gravity takes over is unsettled), following the Stanford Encyclopedia's warning that the classical theory fails near the big bang. The answer may want the same care.

### What remains in the area

From the plan's fourteen: good without God and the Euthyphro (treated in answers and the God area), the church and the Jewish people (the plan asks for James's read first), women in the Bible, sexuality, abortion and the early church, Christian nationalism at length, and whether Christian morality is only a product of its culture. James's read of the five before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 18. Twentieth run (2026-11-20): an editor's read of the morality area, and the area on other religions and those who never heard

### The editor's read of the five morality pieces and the area page

An independent read, as a survivor of abuse in a church, as a Jewish reader and a Muslim reader of the Crusades and Inquisition pages, as a descendant of enslaved people reading the slavery page, and as a historian checking every date, name and figure. Twenty-five changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Twentieth run". Every fact the nineteenth run held only from a Wikipedia copy was looked for in a second, independent readable source on GitHub, and new ones were found: Gibbon's *Decline and Fall* (chapters 57, 58 and 60), James M. Ludlow's *The Age of the Crusades* (1896), Villehardouin's chronicle in Marzials's translation (1908), the *Catholic Encyclopedia* (on the Crusades, the Inquisition, the Huguenots, St. Bartholomew's Day and the Thirty Years' War), Henry Charles Lea's *History of the Inquisition of Spain*, the Doctrine of Discovery Project's texts of the papal bulls, MacNutt's life of Las Casas (1909, with *Sublimis Deus*), Clarkson's history of abolition, and a historian's essay on Servetus. Confirmed facts stay; the rest were softened or cut. Cut or softened: the 10,667 figure (a Tennessee appeals court confirms 4,392 priests and "over 10,000 minors", so the page says "more than ten thousand"); the 2022 report's length and the list's size (one newspaper only; now unnumbered); Kamen's estimate of executions (now no figure); the day of the 1492 expulsion edict (Lea and the Wikipedia copy disagree); "eight" French wars, "thousands" at St. Bartholomew's and the Thirty Years' War population figures; "for the first time in European colonial history"; John Paul II's statements and Innocent III's prior prohibition; Hillenbrand (two years in one bibliography, no second source) and the two Riley-Smith titles, replaced in the reading list by Villehardouin and Ludlow. For the survivor: the abuse page now says at its start and its end to call the police if a child is in danger, says plainly that it gives no legal advice and that reporting laws differ, tells the reader it was not their fault and that they owe no one their silence, and no longer implies that a church which has reckoned with abuse may call a survivor back. For the Jewish and Muslim reader: the massacres of 1096, 1099 and 1204 are named as massacres in the short answer (the synagogue burning included); the correction about the Turkish conquests now says in the same breath that it lessens nothing; "never the declared policy" is cut; the Inquisition page names forced baptism and the burnings for Jewish practice. For the descendant of the enslaved: the enslaved are named as the first to resist, Douglass is named in the short answer, and a sentence that spoke for what the enslaved thought is now a claim about the text. Church bodies are named only as history in the third person, and no page says or implies which body the author or any reader belongs to. `validate-politics` passes. All five and the area stay pending.

### The area "religions" (pending)

Slug `religions` (the plan's), title "Other religions, and those who never heard", as in `areas.json`. Records in `docs/work/elite/apol-pilot/religions/` (index.md and five pieces), data in `client/public/questions/religions/`. Of the plan's ten questions this run took items 7 with 1, 1 again as the charge of arrogance, 5, 2 with 3, and 6.

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| Aren't all religions basically the same, different paths up one mountain to the same God? | /questions/religions/are-all-religions-the-same | 2,139 | ax |
| Isn't it arrogant to say that Jesus is the only way to God, and that billions of sincere believers in other faiths are wrong? | /questions/religions/is-it-arrogant-to-say-jesus-is-the-only-way | 1,940 | ay |
| What about the people who never heard of Jesus? Would a just God condemn them for being born in the wrong place? | /questions/religions/those-who-never-heard | 2,316 | az |
| Jews and Muslims both confess one God and refuse to worship Jesus. Isn't Christianity the faith that strayed from the God of Abraham? | /questions/religions/judaism-islam-and-jesus | 2,256 | ba |
| Aren't you only a Christian because of where you were born? If you'd grown up in another country, wouldn't you hold its religion instead? | /questions/religions/only-a-christian-because-of-where-you-were-born | 1,927 | bb |

The philosophers' case is taken from the Stanford Encyclopedia's article "Religious Diversity (Pluralism)", read in full in a GitHub copy, which quotes Hick, Wilfred Cantwell Smith and Runzo and summarizes Plantinga, Rahner, Himma, Quinn and Heim; the other traditions' ultimates from its article "God and Other Ultimates". Primary texts were read in public-domain copies: Mill's *On Liberty* (1859), Schechter's *Studies in Judaism* (1896), Israel Abrahams's *Judaism* (a Jewish scholar's account; no year printed in the copy, so none is given), and the Qur'an in Pickthall's translation (1930), quoted only where needed (4:157, 112:3, 4:171, 33:40, 29:46, 3:45, 3:95), each time with the sentence that Muslims read it within their own tradition of interpretation; no verse with an exclamation is quoted. Judaism is described from Schechter and Abrahams (the unity of God, the Torah with the Mishnah and Talmud, Maimonides's thirteen principles and their standing, the Messianic hope, the rabbis' "judged by grace"), Islam from the Qur'an and the *Catholic Encyclopedia*'s list of the five pillars, both in terms their adherents would sign. The church's wrongs against Jews are named from the Study Bible's notes on Matthew 27 and John 16 and rejected in the words of the note on Romans 11 ("That reading is false, and this site rejects it"); the views of Israel's place are set out as that note sets them out, with no side; no modern state or conflict is in view. The page on those who never heard sets out restrictivism and inclusivism in their holders' terms with the hardest question of each and takes no side between them (nor on the hope of a meeting with Christ after death), states universal restoration as the hell page does, speaks of no person's fate, and closes with a paragraph for a reader thinking of someone who has died. No living author is quoted. Scripture is quoted from the BSB, checked by script (two quotations with an ellipsis checked by hand). The pieces agree with the Honest Answers "Is Jesus really the only way to God?", "What about those who never heard of Jesus?", "What do Christianity and Islam actually dispute?" and "What if Christianity is wrong?", and with the Study Bible's notes on John 1, 14 and 16, Acts 4 and 17, Romans 2 and 11, Matthew 27, Mark 8 and 16 and Hebrews 8; none was contradicted. The questions test now knows the area (five pending pieces).

### Found, for the editor of the Honest Answers and the essay shelf (not changed: outside this run)

- The Honest Answer on Islam quotes the Qur'an in the Saheeh International translation (1997), which is not public domain; the library quotes Pickthall (1930). The two differ in wording, not in the sense of the verses used.
- The Honest Answers on the only way, on those who never heard and on Islam name essays (`is-jesus-really-the-only-way`, `what-about-those-who-never-heard`, `christianity-and-islam`) that the essay shelf retires; `scripts/lib/site-routes.mjs` counts them as pages because their posts exist in the content data, so `validate-links` and the library's validator would let a link to one pass though it lands on the retired-essay notice. The library links none of them.
- The justice timeline (`client/public/justice/timeline.json`) gives "roughly 3,000 to 5,000" executions by the Spanish Inquisition and "a sitting pope only apologized" for 1204, with no sources; the library now gives neither figure nor apology.

### What remains in the area

From the plan's ten: Buddhism and Hinduism on the self and salvation, whether Paul invented Christianity, Mormonism and Jehovah's Witnesses on the Bible and Jesus, and whether Christianity is a Western religion (the shelf essay on it is pending). James's read of the five before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 19. What the library now holds

Counted from `client/public/questions/index.json` and the area files after the twenty-sixth run: ten areas, 79 pieces, 78 live and 1 pending; every area and its page is live. Each area below gives its pieces and status, and the plan's questions (section 2) not yet written as a page of their own; "(answer)" marks a question an Honest Answer already argues.

1. **God, faith and reason** (`god`): 5 pieces, live (the cosmological argument, who made God, the ontological argument, the moral argument and the Euthyphro, the argument from reason). Not yet written: does God exist (answer), divine hiddenness (written in area 8), faith as belief without evidence (answer), faith as wishful thinking (answer), Pascal's wager and what if Christianity is wrong (answer), meaning without God (answer), religious experience, which God (the God of the philosophers and the God of Abraham), good without God (answer), the New Atheists (answer).
2. **Can we trust the text of the New Testament?** (`text`): 9 pieces, live. Not yet written: Luke 22:43-44 and Hebrews 2:9 as pages of their own (treated inside pilot pieces), the dating of the papyri (Nongbri), the church fathers' quotations, the Old Testament text (the Masoretic text, the Septuagint, the Dead Sea Scrolls).
3. **Who wrote the Gospels and the New Testament, when, and who chose the books** (`authors`): 10 pieces, live (the Gospels are anonymous, written decades later, stories changed in the telling, four Gospels and the rest, forgeries, what kind of writing the Gospels are, the Synoptic problem, whether John is history or theology, whether Constantine or Nicaea decided the Bible, whether Paul invented Christianity). Not yet written: the Gospel of Thomas at length, the Shepherd, the Didache and the Gospel of Peter, the Apocrypha (the site's guide treats it), Paul's letters as a page of their own (partly in the forgery piece), lost Christianities and the Gnostic gospels at length (partly in the four-Gospels piece).
4. **Contradictions and hard passages** (`contradictions`): 5 pieces, live. Not yet written: Abiathar in Mark 2:26, the birth narratives beyond the census, the general "Jesus, Interrupted" case, Mark's "Isaiah", Matthew's use of the prophets beyond Matthew 27:9, the two creation accounts, Goliath as a page of its own, Paul and James on faith and works, Paul and Acts on the visits to Jerusalem, whether Jesus expected the end within a generation (now written in area 5), the fig tree and the temple, the Chicago Statement and its critics, how a Christian should handle an unsolved contradiction, the genealogies and ages of Genesis 5 and 11 (the resurrection accounts are in area 5).
5. **The historical Jesus and the resurrection** (`jesus`): 10 pieces, live (did Jesus exist, the empty tomb, the appearances and the alternatives, the Easter accounts, can historians affirm a miracle, how Jesus became God, did Jesus claim to be God, the virgin birth, the end within a generation, did the disciples die for their belief). Not yet written: Tacitus, Josephus and Pliny as a page of their own (treated in the existence piece), the pagan-myths question (essay pending), was Jesus just a good teacher (answer), the Jesus Seminar and the quests, Jesus and Judaism (partly in area 10), the Shroud and relics.
6. **The Old Testament: history, archaeology, violence and law** (`old-testament`): 10 pieces, live (the exodus, Jericho and the conquest, the command to destroy the Canaanites, Daniel's date, the flood and Babylon, who wrote the first five books, the God of the Old Testament and the New, which Old Testament laws Christians keep, Abraham and Isaac, what archaeology shows). Not yet written: camels in Genesis, Genesis 1 to 11 as a whole (answer on Genesis 1), slavery (answer), women in the law, the cursing psalms, sacrifice, borrowing from older Near Eastern texts beyond the flood.
7. **Science** (`science`): 10 pieces, live (has science made God unnecessary, Galileo, miracles and Hume, the beginning and fine-tuning, evolution and Genesis, the age of the earth, Adam and human origins, the mind and the brain, neuroscience and free will, near-death experiences). Not yet written: life on other planets, artificial intelligence (answer), whether the great scientists were believers.
8. **Evil, suffering and judgment** (`evil`): 5 pieces, live. Not yet written: Ehrman's *God's Problem* as a page of its own, evil done to children, why God doesn't stop the worst evils, prayer, the righteous suffering and the wicked prospering, God's sovereignty and evil, grief and the argument.
9. **Morality, sexuality and the church's record** (`morality`): 10 pieces, 9 live (the Crusades, the Inquisition, slavery and conquest, abuse and its cover-up, whether religion poisons everything, women, abortion and infant exposure, Christian nationalism, whether Christian morality is a product of its culture) and 1 pending (homosexuality: read twice, waiting for James's word on whether the page states where he lands). Not yet written: good without God and the Euthyphro (answer; and area 1), the church and the Jewish people as a page of its own (the plan asks for James's read first; partly in area 10), colonialism and missions as a page of its own (partly in the slavery page).
10. **Other religions, and those who never heard** (`religions`): 5 pieces, live. Not yet written: Buddhism and Hinduism on the self and salvation, Mormonism and Jehovah's Witnesses, whether Christianity is a Western religion (whether Paul invented Christianity is now written in area 3).

---

## 20. Twenty-first run (2026-11-20): an editor's read of the religions area, and five more pieces on the historical Jesus

### The editor's read of the five religions pieces and the area page

An independent read, as a rabbi, as an imam, as a pluralist philosopher, as a grieving reader of the page on those who never heard, and as a historian and logician. Thirty changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Twenty-first run". For the pluralist, Hick is now stated from the Stanford Encyclopedia's quotations of *An Interpretation of Religion* (the faiths as "different perceptions and conceptions of, and correspondingly different responses to, the Real"; no concrete description applies "literally" to it), and a caricature is gone: two pages said his view tells Christians the resurrection "didn't happen as an event", which no source read supports; they now say what the encyclopedia reports, that he reinterpreted the incarnation so that Christians are not committed to its "literal truth". His defenders' answer, that he offers a second-order theory about the religions, is stated before the reply, the elephant parable is answered with the pluralist's better reply granted, and the note that Hick's virtues are Paul's fruit of the Spirit now says it is no charge of bad faith. For the rabbi, the Judaism and Islam page now says that rabbinic Judaism is a living faith in its own right, not a stage on the way to Christianity, and names the church's wrongs down to the Shoah and the 1994 repudiation of Luther's anti-Jewish writings, as the Study Bible's note on Matthew 27 records them. For the imam, Qur'an 4:171 is now quoted in context ("only a messenger of Allah, and His word which He conveyed unto Mary, and a spirit from Him") and 4:158 ("But Allah took him up unto Himself") stands beside 4:157, so that Islam's honor to Jesus is not cut away from its denial; every verse was rechecked against Pickthall. For the grieving reader, the page on those who never heard was found right in its care (the care sentence first, the care paragraph last, no fate guessed) and kept so. For the historian, the council of 553: the Stanford Encyclopedia says the Fifth General Council condemned universal reconciliation, while the *Catholic Encyclopedia*'s articles on Origen and on apocatastasis, read this run, say the anathema was pronounced at Constantinople and that whether it belongs to the council's acts is disputed; the area page, the page on those who never heard and the hell page in the evil area (mended so the two still agree) now say only what both support, in the brief's words that the hope "has generally been rejected by the church's councils and confessions". Facts that rested on answer rows were confirmed (*tawhid*, from the Stanford Encyclopedia; Newbigin's book, Rahner and *Lumen Gentium*, from the note on John 14) or cut (Loftus's biography, Lawson on 4:157, Newbigin's use of the parable, the content of Hick's reply to D'Costa, the Sanders, Fackre and Nash volume, replaced in the reading list by Ronald Nash's book named in the note on John 14). All five, the area and the hell page stay pending.

### Five more pieces in the area "jesus" (pending)

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| Bart Ehrman argues that Jesus' first followers believed God had exalted a man to heaven, and only later that he had been God from the beginning. Didn't the church turn a Jewish preacher into God? | /questions/jesus/how-did-jesus-become-god | 2,220 | bc |
| In Matthew, Mark and Luke, Jesus never says "I am God." Isn't the claim that he did a product of John's Gospel, written decades later? | /questions/jesus/did-jesus-claim-to-be-god | 2,043 | bd |
| Isn't the virgin birth a legend, built on a mistranslation of Isaiah and borrowed from pagan stories of gods who fathered heroes? | /questions/jesus/the-virgin-birth | 2,219 | be |
| Jesus said "this generation will not pass away until all these things have happened." Didn't he wrongly predict that the world would end within his hearers' lifetime? | /questions/jesus/did-jesus-predict-the-end-within-a-generation | 2,082 | bf |
| Christians say the apostles died for their testimony, and that no one dies for a lie. How much do we actually know about how they died, and what would it prove? | /questions/jesus/did-the-disciples-die-for-their-belief | 1,978 | bg |

Ehrman's books could not be opened from this machine, so his case is stated in the words the Study Bible's notes give it (the note on Mark 1 for *How Jesus Became God*'s thesis, the notes on John 1 and John 20 for his view of John and of the visions), with the texts it rests on set out at full strength from the BSB (Romans 1:3-4, Acts 2:36, Acts 13:33, Mark 1:11), and one tertiary report marked as such. Hurtado and Bauckham are given only as the notes on Mark 1, Philippians 2 and John 1 give them. The ancient witnesses are quoted from public-domain translations read in this run: Justin's *First Apology* and *Dialogue with Trypho*, Ignatius and 1 Clement in the *Ante-Nicene Fathers* (1885), Origen's *Against Celsus* in Crombie's translation, Eusebius in McGiffert's, Josephus in Whiston's, Suetonius's *Augustus* in Thomson's, Pliny in Melmoth's, Schweitzer in Montgomery's (1910), Russell's lecture of 1927, and Gibbon's sixteenth chapter (1776). C. S. Lewis is quoted only for the phrase "the most embarrassing verse in the Bible", which a transcript of his essay, a second independent page and the note on Mark 13 all give. No living author is quoted. No consensus is given as a percentage or head-count. The confessional floor is stated as confession, from the creeds in the repository: the deity of Christ in the Nicene words, the virgin birth in the Apostles' and Nicene Creeds, the return in glory. Above the floor the pages take no side: on how to describe the path from Paul to Nicaea, on how to read John's discourses, on Isaiah 7:14 and on Mary's later life, and among the preterist, futurist and mixed readings of Mark 13. The trial of Jesus is framed as the notes frame it (some Jerusalem authorities took part; the decision and the execution were Roman; *Nostra Aetate*), and James's death is told from Josephus, who names the high priest and records that fair-minded citizens protested. The disciples page treats only four deaths as well attested and says the argument shows sincerity, not truth. The pieces agree with the Honest Answers "Was Jesus just a good teacher?", "What if Christianity is wrong?" and "Did the resurrection actually happen?", and with the Study Bible's notes on Mark 1, 2, 6, 9, 13, 14 and 15, Matthew 1, 2, 10 and 27, Luke 1, John 1, 5, 7, 10, 20 and 21, Romans 1, 1 Corinthians 8, 15 and 16, Philippians 2, Isaiah 7, Daniel 7, Acts 12 and 2 Peter 3; none was contradicted. The area page lists ten questions and gains the words "Christology" and "Son of Man". The questions test now expects ten pieces in the area.

### Found, for the editor of the Honest Answers (not changed: `answers.ts` is outside this run)

- "What if Christianity is wrong?" says "the men who had run away were saying they had seen him alive, and some of them were killed for it", then names James the Lord's brother, who was not among the men who ran away; John 7:5 has him an unbeliever during the ministry.
- "Was Jesus just a good teacher?" closes a section with a first-person memory ("I held the comfortable view, and it was a place to file him more than a conclusion"). If that is James's own, it stands; if it was written for him, it breaks the rule against inventing a memory in his voice.
- "Was Jesus just a good teacher?" reports Ehrman's reply (that the first Christians believed God had raised a man to "a lesser kind of divinity") from the second run's rows, which rested on search summaries; the library's page now states his case only as the Study Bible's notes give it.

### What was run

Light gates after Part 1 and after each piece (validate-questions, the record diff, build-questions-index and its check, no-emdash, links, the search-index build and check, validate-politics): all 0 each time. After the last piece's commit, and after fetching the branch from origin (already up to date): pnpm check 0; all 46 commands of the content-gates step, each exit code read directly, 0; pnpm test 0 (162 files passed, 7 skipped; 1,898 tests passed, 73 skipped; the one count changed is the jesus area's pieces, 5 to 10); pnpm build 0; sitemap 0 (no /questions/jesus or /questions/religions address); prerender 0 (3,140 pages; the five new pieces say noindex, follow); audit:canonicals 0 failures. Each heavy command started with the one-minute load under 6. Served build (`serve-like-vercel.mjs`, port 4691, Playwright at 390): all 59 pending pages say noindex, carry the review line, have no sideways scroll and no console errors; site search for Schweitzer, virgin birth, Gibbon, Ehrman, Hick and Trypho finds no pending library page. Screenshots in /home/user/elite-shots/apol13/. The server was stopped and dist/ deleted. This section and the ledger's note were committed after those runs; the light gates were run again after that commit.

### What remains in the area

From the plan's sixteen: Tacitus, Josephus and Pliny as a page of their own, the pagan-myths question (the essay is pending on the shelf), the Jesus Seminar and the quests, Jesus and Judaism, and the Shroud and relics. James's read of the ten before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 21. Twenty-second run (2026-11-20): an editor's read of the five newest jesus pieces, and five more pieces on who wrote the Gospels and who chose the books

### The editor's read of the five newest jesus pieces

An independent read of how-did-jesus-become-god, did-jesus-claim-to-be-god, the-virgin-birth, did-jesus-predict-the-end-within-a-generation and did-the-disciples-die-for-their-belief, as Bart Ehrman, as a Jewish reader of the trial and Isaiah 7 material, as a classicist, as a logician, and as a believer who was told the disciples all died as martyrs. Fifty-five changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Twenty-second run". The largest weakness was secondhand authority: eight scholars' views were given only as the Study Bible's notes summarize them. GitHub was searched hard for readable primary texts. For Ehrman three were found and read: a word-for-word reading aloud of the section "Did Jesus Claim to Be God?" from *How Jesus Became God*, his blog post "Nope, Jesus Is Not Yahweh" (April 2021) read aloud in full, and an automatic transcript of a 2021 interview, all in public transcripts; his case is now restated from them, paraphrased, never quoted. They changed the argument as well as the attribution. Ehrman himself grants that Paul's Christ in Philippians 2 is pre-existent, so the page's old answer, that Paul "already" held exaltation and pre-existence together, was no answer to him; the page now grants it, states his view that Paul's Christ was a divine being below God, given equal authority only at his exaltation ("equal" is not "identical"), sets out the angel of the Lord as the pattern he says early Christians used, states the angelic reading of Galatians 4:14 on its merits (no source opened shows Ehrman making it, so it is not put in his mouth), and answers it from Paul's own texts (Galatians 1:8, 1 Corinthians 6:3, Romans 8:38-39, 1 Corinthians 8:6) and from what worship of a lesser being would have meant to a Jew who confessed the Shema. Its argument now claims what its steps support: very early worship, not "the high view was there at the start". On the claims of Jesus, Ehrman's tests of John's sayings and his answers on forgiveness, miracles and worship are now stated before the page replies, and the page grants that "your sins are forgiven" taken alone is the form a priest might use. For Hurtado, Bauckham, Casey, Boyarin, Dunn, Brown and Lincoln no readable work was reached, and every mention now says whose summary it is ("as the Study Bible's note on Mark 1 summarizes him"). For the Jewish reader, the virgin-birth page now says outright that Trypho and the Jewish readers after him were right about *almah*; nothing on the five pages blames "the Jews" for the trial. For the classicist, every ancient quotation was rechecked by script against its translation, and the 1 Clement date and Pliny's translator are now stated as the copies give them. For the logician, four conclusions were narrowed ("very probably", "more likely than not", "good reason"). For the believer, the disciples page now says that the fuller story was told in good faith and that nothing in the faith depends on it. Lewis's essay is now named, "The World's Last Night", from a transcript opened this run. All five stay pending.

### Five more pieces in the area "authors" (pending)

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| The Gospels were written by believers to make believers. What kind of writing are they, and does their kind make them history, legend or something in between? | /questions/authors/what-kind-of-writing-are-the-gospels | 1,972 | bh |
| If Matthew and Luke copied Mark, aren't the first three Gospels really one witness rather than three? | /questions/authors/the-synoptic-problem | 1,878 | bi |
| John's Gospel is so unlike the other three, with no parables, long speeches and a different calendar. Isn't it theology rather than history? | /questions/authors/is-john-history-or-theology | 1,999 | bj |
| Didn't the emperor Constantine, or the Council of Nicaea in 325, decide which books went into the Bible? | /questions/authors/did-constantine-decide-the-bible | 1,954 | bk |
| Paul never followed Jesus in his lifetime, rarely quotes him, and wrote before any Gospel. Didn't Paul, rather than Jesus, invent Christianity? | /questions/authors/did-paul-invent-christianity | 2,092 | bl |

From section 19's unwritten list for the area (the plan's items 3.4, 3.6, 3.7, 3.13 with 3.16, and 10.8, placed here as the brief directs). The Study Bible's guide "Reading the Gospels" already sets out the genre debate, the Synoptic solutions and John's differences in full, and the pages agree with it and say so, adding primary texts read this run: Plutarch's *Life of Alexander* and Thucydides 1.22 in two copies each, Suetonius, Justin's *First Apology* 66 and 67, Papias in Eusebius, Augustine's *Harmony of the Gospels* 1.2, Clement in Eusebius 6.14, Eusebius's catalogue in 3.25, Constantine's letter in the *Life of Constantine* 4.36, Athanasius's Festal Letter 39 and the first canon of Nicaea, each in a public-domain translation. The genre page concedes that ancient biography is not modern history and argues that the genre establishes intent, not accuracy. The Synoptic page concedes that for the triple tradition the three are not independent and takes no side on Q, answering from the sources skeptical historians themselves count (Ehrman's list, from the reading of *How Jesus Became God*). The John page concedes every difference and claims no discourse as verbatim, and gives what in John fits pre-70 Jerusalem only as the Study Bible's notes record it (Bethesda and the Copper Scroll, the pool of Siloam found in 2004, stone purification jars, the Caiaphas ossuary with the note's caution, the temple's forty-six years). The Constantine page reads Nicaea's surviving acts from the *Catholic Encyclopedia* and the canons, sets Constantine's own bishop's list of disputed books, written at the time of the council, against the claim, names the novel as fiction without contempt, concedes that the edges were long unsettled and that the Old Testament still differs, and agrees with the canon essay, the Nicaea essay, the guides to the New Testament canon and the Apocrypha and the existing page on the four Gospels without repeating them. The Paul page states the case from Wrede (as the note on Luke 10 gives him) and Ehrman's contrast of Paul and Matthew (from a reading of *Jesus, Interrupted*), then answers from 1 Corinthians 15 and 11, Galatians 1 and 2, what Paul shares with the Gospels, and Ehrman's own view that Paul did not originate the message of the death and resurrection; Paul is named a Jew, and the caricature of a Judaism of earning is rejected in the words of the note on Luke 10. No living author is quoted; living scholars are given from the guide or the notes, said so. Scripture is quoted from the BSB and checked by script, quotations with an ellipsis by hand; the BSB sets a phrase of Galatians 2:9 between dashes, so the page quotes the verse from after it. The area page lists ten questions, gains the words "Ancient biography" and "Q", and its introduction now names the five new questions and what they argue.

### Found, for the editor of the Honest Answers (not changed: `answers.ts` is outside this run)

- "Why would anyone trust the Bible?" and "Did the resurrection actually happen?" quote 1 Corinthians 15:6 as "most of whom are still alive", which is not the BSB wording the library uses ("most of whom are still living"). Not an error of sense; a difference of translation the answers do not name.
- No Honest Answer, Study Bible note or live /questions/text piece read for these pages was found out of date or contradicted.

### What was run

Light gates after Part 1 and after each piece (build-questions-index, validate-questions, the record diff, the index check, no-emdash, links, the search-index build and check, validate-politics): all 0 each time. After the last piece's commit, origin was fetched and merged first (it brought the explorer's new film scenes; no conflict), and then, on the merged tree: pnpm check 0; all 46 commands of the content-gates step, each exit code read directly, 0; pnpm test 0 (162 files passed, 7 skipped; 1,916 tests passed, 73 skipped; no test needed changing, since the questions test pins the authors area only as pending with pieces); pnpm build 0; sitemap 0 (no /questions/authors or /questions/jesus address in it); prerender 0 (3,149 pages; the five new pieces say noindex, follow); audit:canonicals 0 failures. Each heavy command started with the one-minute load under 6, after waiting where it was not. Served build (`serve-like-vercel.mjs`, port 4691, Playwright at 390): all 64 pending pages (55 pieces and 9 area pages) say noindex, carry the review line, have no sideways scroll and no console errors; site search for Wrede, Muratorian, Thucydides, Plutarch, Bethesda, Ehrman and Synoptic finds no pending library page. Screenshots in /home/user/elite-shots/apol14/. The server was stopped and dist/ deleted. This section was committed after those runs, and the same full gates were run again on the tree that includes it before the push; the run's report gives those results.

### What remains in the area

From the plan's sixteen: the Gospel of Thomas at length, the Shepherd, the Didache and the Gospel of Peter, the Apocrypha (the site's guide treats it), Paul's letters as a page of their own, and lost Christianities and the Gnostic gospels at length. James's read of the ten before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 22. Twenty-third run (2026-11-20): an editor's read of the five newest authors pieces, and five more pieces on the Old Testament

### The editor's read of the five newest authors pieces

An independent read of what-kind-of-writing-are-the-gospels, the-synoptic-problem, is-john-history-or-theology, did-constantine-decide-the-bible and did-paul-invent-christianity, as a classicist, as a Gospels scholar who holds the Farrer view and as one who holds Q, as a historian of the canon, as a Jewish reader of the Paul page, and as a logician. Forty-two changes to the prose and two to the claims index, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Twenty-third run". Every ancient source the brief named was fetched again from its GitHub copy and re-read, not taken from an earlier run's scratch copy. For the classicist: Philostratus, named before with no text opened, is now read in Conybeare's Loeb translation (1912) and the reply states what his *Life of Apollonius* actually contains (Proteus appearing to the mother, the swans at the birth) and when it was finished (no earlier than 217, by Conybeare's reckoning); the Muratorian fragment, before known only from the *Catholic Encyclopedia*'s description, is read in the *Ante-Nicene Fathers* translation, so the Shepherd's status is now quoted ("ought to be read; but it cannot be made public in the Church to the people") and the fragment's own edges (Wisdom, the Apocalypse of Peter, no Hebrews or James) are stated; all twenty canons of Nicaea were read in the NPNF (the encyclopedia's copy stops at canon 11), which corrected "through the Easter season" to "in the days of Pentecost" and brought in canon 17, the one that quotes Scripture; Eusebius 3.25 now says what the page left out, that the "rejected" books "may be reckoned among the disputed books" and that the heretics' gospels formed a fourth class; Clement's "spiritual Gospel" sentence is quoted whole ("being urged by his friends, and inspired by the Spirit"); Thucydides' "it was hard to carry them word for word in memory" replaces "could not remember"; Justin is no longer placed "in Rome" by assertion; Constantine's letter is no longer made to leave the Bible's contents "to the bishop" (it names no books). For the Gospels scholars: "historians count Mark, the sayings Matthew and Luke share, and each one's own material" is now the majority view's count, with the Farrer count stated; the Two-Source view's answers to the minor agreements are given beside the Farrer view's argument, both in the guide's words; John is no longer said to stand "outside the question altogether"; the claims index no longer gives Streeter a conclusion he didn't draw. For the historian of the canon: the three canons are described in each tradition's own terms (deuterocanonical, "things that are read", Apocrypha); Athanasius's own Old Testament, which matches none of today's, is quoted; and the old frame "did the church confer authority or recognize it?", which implied that Catholics hold the first, is replaced by the question each tradition answers, with Catholic teaching stated as the site's guide gives it from Vatican I. For the Jewish reader: the Paul page now calls the Judaism-of-earning picture a caricature and gives Jewish scholars' own words for grace and the law (Schechter, 1896; Abrahams), and the Luke 18 sentence no longer sets a Pharisee as a foil. For the logician: the genre page no longer generalizes from three writers to all ancient Lives and no longer says the Gospels don't open with omens (Matthew and Luke do); the Synoptic, John, Constantine and Paul arguments were each narrowed to what their steps establish (more than one source on every solution; local knowledge, not an eyewitness; Baur's date answered from Irenaeus first; the silence of Eusebius stated as silence; a founder the apostles accepted, with the Antioch quarrel acknowledged). Where a living scholar's view rests on the site's notes, each page already said whose summary it is, except Kruger on the Constantine page, which now does. All five and the area page stay pending.

### Five more pieces in the area "old-testament" (pending)

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| The last chapter of Deuteronomy tells of Moses' death and burial, God is called by different names in different stories, and some events are told twice. Weren't the first five books written by many hands, centuries after Moses? | /questions/old-testament/who-wrote-the-first-five-books | 2,096 | bm |
| The God of the Old Testament sends floods and plagues and commands wars, and the God Jesus called Father is love. Isn't the God of the Old Testament angry and the God of the New loving, and aren't they really two different gods? | /questions/old-testament/the-god-of-the-old-testament | 2,104 | bn |
| Leviticus forbids eating shellfish and wearing clothing made of two kinds of material, and Christians ignore those laws while quoting others from the same chapters. Why do Christians keep some Old Testament laws and not others? | /questions/old-testament/which-old-testament-laws | 2,149 | bo |
| God told Abraham to offer his son Isaac as a burnt offering, and Abraham set out to do it. Did God really command a father to kill his child, and how can a story like that be praised? | /questions/old-testament/abraham-and-isaac | 2,140 | bp |
| Archaeologists have found no trace of the exodus, a Jericho without walls, and little sign of a great kingdom under David and Solomon. Does archaeology confirm the Old Testament, or undermine it? | /questions/old-testament/what-archaeology-shows | 2,115 | bq |

From section 19's unwritten list for the area (the plan's items 6.6, 6.12, 6.13, 6.17, and 6.7 with 6.8). Older texts are quoted only from public-domain translations fetched this run from GitHub copies: Spinoza's *Theological-Political Treatise* in Elwes's translation, Wellhausen's *Prolegomena* in Black and Menzies's, the *Catholic Encyclopedia*'s articles on the Pentateuch and the Marcionites (with the Biblical Commission's answers of 1906), Irenaeus and Tertullian on Marcion and Justin's *Dialogue with Trypho* in the *Ante-Nicene Fathers*, Aquinas in the English Dominican translation, the Westminster Confession, the Formula of Concord in the *Concordia Triglotta* translation, Schechter's *Studies in Judaism*, Kant in the Akademie German (paraphrased), the Talmud's Rosh Hashanah 16a in Sefaria's English, Simeon Singer's *Standard Prayer Book* (1915), and Sayce's translations of the Mesha stone, the Siloam inscription and Sennacherib's prism (1884). Dawkins's sentence was checked in three copies. Harnack's view is given only as the *Orthodox Encyclopedia*'s article on him reports it, in English paraphrase from its Russian. Living scholars (Finkelstein and Silberman, Levenson, Boyarin, Delaney, Van Seters, Rendtorff, Garfinkel) are given only as the Study Bible's notes and introductions give them, said so. No consensus is given as a percentage or head-count, and no find is called proof. Scripture is quoted from the BSB and checked by script, quotations with an ellipsis or two verses by hand.

The pages take no side on who wrote the first five books or how, on how to read the Old Testament's judgment narratives, on the threefold division of the law against new covenant readings and law and gospel, on how to weigh God's command to Abraham, or on the size of David's kingdom; each states what all confess. The "angry God" page says in the site's voice that the contrast is false and has fed contempt for Jews, and gives Judaism's own reading of God's mercy from Schechter. The laws page argues no contested moral question: it names that the objection is most often pressed about sexual ethics, says the page doesn't argue it and that Christians apply the principle differently there, and stops. The Abraham page opens with a care sentence and Find Help, carries a care paragraph ("No one should read this chapter as a pattern for harming anyone ..."), describes the Jewish reading in the words of the prayer book and the Talmud, and calls the story never a model for harming anyone. The archaeology page agrees with, and links, the area's pages on the exodus and Jericho without repeating them. The pieces agree with the Study Bible's introduction to Genesis and its notes on Exodus 6 and 34, Genesis 20 and 22, Deuteronomy 34, Leviticus 11 and 19, Mark 7, Acts 15, Hosea 11, Jeremiah 7, 2 Samuel 5 and 7, 1 Kings 4, 9, 14, 16 and 22, 2 Kings 3, 9, 18, 19 and 20, Isaiah 36 and 2 Chronicles 32, with the guide to reading the law and the doctrine page on covenant frameworks, and with the Honest Answers on Genesis 1 and on the conquest; none was contradicted. The area page lists ten questions and gains the words "Akedah", "Tel Dan Stele" and "Documentary hypothesis".

### Found, for the editor of the Honest Answers, the short questions and the Study Bible (not changed: outside this run)

- The unledgered short question "Can I actually trust the Bible?" (`client/public/theology/questions.json`) still says that archaeology "has a long record of confirming the incidental details the Bible mentions in passing" and names the pool of Bethesda and the politarchs of Thessalonica, which the plan's section 1.3 flagged; the new archaeology page makes no such general claim.
- The Study Bible's introduction to John says P52's publication "made so late a date impossible" (Baur's 170) while also saying the dating of such fragments is debated; the John page in this library now rests its answer to Baur first on Irenaeus around 180, which the same introduction records, and says "can no longer be held".
- No Honest Answer was found out of date on the five new questions; no Honest Answer treats the authorship of the Pentateuch, the laws Christians keep, Abraham and Isaac or Old Testament archaeology.

### What was run

Light gates after Part 1 and after each piece (build-questions-index, validate-questions, the record diff, the index check, no-emdash, links, the search-index build and check, validate-politics): all 0 each time. After the last piece and this plan's sections were committed, origin was fetched and merged first (it brought the wisdom finder's new topics, the plain Revelation notes and the passage index; no conflict), and then, on the merged tree: pnpm check 0; all 46 commands of the content-gates step, each exit code read directly, 0; pnpm test 1 on the first run (the questions test pinned the Old Testament area at five pieces), 0 after that one count was changed to ten (162 files passed, 7 skipped; 1,929 tests passed, 73 skipped); pnpm build 0; sitemap 0 (no /questions/old-testament or /questions/authors address in it); prerender 0 (3,158 pages; the new pieces say noindex, follow); audit:canonicals 0 failures. Each heavy command started with the one-minute load under 6, after waiting where it was not. Served build (`serve-like-vercel.mjs`, port 4691, Playwright at 390): all 69 pending pages (60 pieces and 9 area pages) say noindex, carry the review line, have no sideways scroll and no console errors; site search for Wellhausen, Marcion, Akedah, Trypho, Mesha, Sennacherib, Philostratus and Muratorian finds no pending library page. Screenshot read: the Abraham page at 390, its review line and the short answer's opening care sentence with Find Help. The server was stopped by its PID and dist/ deleted. This section was committed after those runs; the light gates were run again on that commit before the push.

### What remains in the area

From the plan's eighteen: camels in Genesis, Genesis 1 to 11 as a whole (an Honest Answer treats Genesis 1), slavery (an Honest Answer), women in the law, the cursing psalms, sacrifice, and borrowing from older Near Eastern texts beyond the flood. James's read of the ten before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 23. Twenty-fourth run (2026-11-20): an editor's read of the five newest Old Testament pieces, and five more pieces on science

### The editor's read of the five newest Old Testament pieces

An independent read of who-wrote-the-first-five-books, the-god-of-the-old-testament, which-old-testament-laws, abraham-and-isaac and what-archaeology-shows, as a rabbi, as a pentateuchal critic and as a defender of Mosaic authorship, as an archaeologist, as a survivor of religious abuse reading the Abraham page, and as a logician. Eighteen changes, each in the record and the data (the record diff at 0), each with a before-and-after row in `apol-ledger.md` under "Twenty-fourth run". Every source was fetched again from its GitHub copy and every non-Scripture quotation rechecked by script. GitHub's code search did not answer this run, so sources were reached by paths earlier runs recorded or by cloning repositories whose names were known.

For the rabbi: the Talmud line on Rosh Hashanah 16a, which came from Sefaria's merged English file and so could not be traced to one named translation, is now a paraphrase, said to be one, with Michael Rodkinson's translation (the sacred-texts edition dated 1918, read this run) named; the "angry God" page now says that Marcion developed the teaching of an earlier man, Cerdo (Irenaeus 1.27, re-read), where it had said Marcion "first" taught the contrast; it answers the picture of the Torah as a burden with Schechter's own sentence (1896) on "the bliss and happiness of living and dying under it", which the laws page now also gives; and a sentence that made the cross "the strongest evidence" that the two Testaments have one God, and could be heard as leaving mercy and justice unreconciled before it, now first says that Jewish tradition holds them together in its own way and states the cross as what Christian faith sees. The laws page no longer sets "holiness of heart" against holiness "of food"; it gives the council's own reason (Acts 15:9). For the critic: the Pentateuch page no longer implies that the field's revisions since the 1970s weakened the critical case in general; it says, with the Genesis introduction, that they questioned "especially its early date for the J source", and Spinoza is "an early", not "the first", full argument. For the archaeologist: every inscription's content, date and find-place was opened in a named source this run (the Study Bible's notes and the *Aquifer Open Bible Dictionary*, an adaptation of the *Tyndale Open Bible Dictionary*); the page now says that Sayce's translations of 1884 are dated and that each line quoted from him is backed by the dictionary or the notes, and gives the one place they correct him (1868, not his 1869). For the survivor: the Abraham page's short answer no longer says the story "teaches trust in God's promise when it seems contradicted"; it says the story never asks anyone to act against conscience; the reply says no reader is asked to obey a voice, a leader or a feeling against conscience; and a care line now closes the page as well as opening it. For the logician: four conclusions or replies were narrowed (the Abraham traditions "in their prayers and creeds", not "never"; the laws page's "not a preference of their own", answering the charge actually made; the archaeology page's writers behave as historians "where they can be checked"; the God page's conclusion now says what each step shows). The laws page now says that its modern objection is given "in the form it is commonly put", since no published modern objector could be read from here. All five and the area stay pending.

### Five more pieces in the area "science" (pending)

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| The sciences say the earth is about four and a half billion years old, and Bible chronologies put creation a few thousand years ago. How old is the earth, and does the Bible say? | /questions/science/how-old-is-the-earth | 2,250 | br |
| Fossils and genetics trace human beings back through a long history in Africa, from a population that was never only two people. Doesn't that rule out Adam and Eve, and with them the fall and the need for a Savior? | /questions/science/adam-eve-and-human-origins | 2,126 | bs |
| Damage to the brain changes memory, character and even the sense of self, and neuroscience ties more of mental life to the brain every year. Hasn't science shown that the mind is just the brain, and that there is no soul? | /questions/science/is-the-mind-just-the-brain | 1,938 | bt |
| Experiments show the brain preparing an action before a person is aware of deciding to act. Hasn't neuroscience shown that free will is an illusion, and with it moral responsibility? | /questions/science/neuroscience-and-free-will | 1,995 | bu |
| People revived after their hearts stopped report leaving their bodies, a light, and meeting relatives who had died. Do near-death experiences prove that there is life after death? | /questions/science/near-death-experiences | 1,843 | bv |

From section 19's unwritten list for the area (the plan's items 7.4, 7.6, 7.7, 7.8 and 7.13). The science is stated from named reference works read in GitHub copies this run: OpenStax's *Astronomy 2e* (radiometric dating, the meteorites' 4.50 to 4.56 billion years, the earth and moon about 4.5 billion) and *Biology 2e* (the hominin record, the mitochondrial and Y-chromosome ancestors), and the Stanford Encyclopedia's entries on religion and science, sin in Christian thought, consciousness, the neuroscience of consciousness, physicalism, dualism, Thomas Aquinas, the afterlife, free will, compatibilism, causal determinism, epiphenomenalism and skepticism about moral responsibility, each named on the page where it is used. Older texts are quoted from public-domain copies read this run: Andrew Dickson White's *Warfare of Science with Theology* (1896) for the objection on the age of the earth, Augustine's *City of God* 18.40 for the concession that the early church held a young world, and the Westminster Confession. Living scientists and philosophers (Venema, Enns, Chalmers, Mele, Swinburne, van Inwagen, Baker, Moreland, Habermas) are given only as those reference works or the Study Bible's notes give them, said so, and none is quoted. No consensus is given as a percentage or head-count, and no statistic is given that was not opened. Scripture is quoted from the BSB and checked by script (the Psalms by hand).

The site takes no position on the age of the earth or on Adam's details. The age page sets out the young-earth, day-age, framework, analogical-day and cosmic-temple readings in their holders' terms, as the Study Bible's note on Genesis 1 and the Honest Answer on Genesis 1 give them, each with its hardest difficulty, and says "This site takes no side among them." The Adam page sets out a recent first pair, real individuals within a larger population, and Adam as a figure for every human, each with what it must explain in Romans 5 and 1 Corinthians 15, and says that what the doctrine of sin requires is itself where Christians differ. The mind page takes no side among substance dualism, Aquinas's hylomorphism and Christian physicalism, and argues that the Christian confession, the resurrection of the body, doesn't depend on defeating physicalism. The free-will page states Libet's experiments and their critics as the encyclopedia gives them (the readiness potential's meaning now uncertain), sets out determinism, compatibilism and libertarian freedom, and states the Reformed account (Westminster 3.1 and 9.1) and the Arminian and Wesleyan account (the notes on Romans 9 and Genesis 50) without choosing. The near-death page says plainly that such experiences do not prove an afterlife, gives what is reported and how researchers explain it from the encyclopedia's entry on the afterlife, rests Christian hope on the resurrection, reuses whole the Study Bible's care line on John 11, puts Find Help in its first paragraph and its last, does not describe the peace or reluctance to return that some reports include, and says it is not medical advice. The pieces agree with the Honest Answers "How should a Christian read Genesis 1?", "Does God choose us, or do we choose him?", "What makes us human in the age of AI?" and "Did the resurrection actually happen?", with the science area's page on evolution, the god area's page on the argument from reason, the jesus area's pages on the empty tomb and the appearances, and with the Study Bible's notes on Genesis 1, 2, 3, 5 and 50, Romans 5 and 9, 1 Corinthians 15, 2 Corinthians 5, Philippians 2 and John 11; none was contradicted. The area page lists ten questions, gains the words "Radiometric dating", "Original sin", "Physicalism", "Hard problem of consciousness", "Compatibilism" and "Readiness potential", and its introduction names the five new questions. The questions test now expects ten pieces in the area.

### Found, for the editor of the short questions (not changed: outside this run)

- "Aren't we just our brains?" (`client/public/theology/questions.json`) tells the Phineas Gage story ("by his friends accounts, no longer Gage") with no source and speaks in a first person.
- "What about near-death experiences?" says that van Lommel, Moody and Greyson "have documented thousands of these accounts", mentions pilots in centrifuges, and says "I will not pretend the case is closed", none of it sourced or checked.
- "How old is the earth, and does it matter?" agrees with the new page in substance; its sentence on Augustine has no source.
- No Honest Answer or Study Bible note read for these pages was found out of date or contradicted.

### What was run

The run was cut off before its results were written down, and its report was lost. The twenty-fifth run found its eight commits unpushed, ran the light gates on them (all 0), read the five science pieces once and found no breach of the rules, and carried them through the full gates recorded in section 24.

### What remains in the area

From the plan's sixteen: life on other planets, artificial intelligence (an Honest Answer treats it), and whether the great scientists were believers. James's read of the ten before the area goes live; each goes live by its `status` and the area's in `areas.json`.

---

## 24. Twenty-fifth run (2026-11-20 to 21): nine areas go live, and five pieces on the hardest questions of morality

James, 2026-11-20: "publish all of this when ready" and "let the apologetics go live too"; and the same day: "I want you to continue, especially the articles. I want them to be a lot more controversial and dealing with very difficult issues in a very balanced, intellectual, academic, historical, biblical way that is very easy to understand, easy to read, normal, common language that is semi-professional, that's in my tone style."

### What went live

Every piece that has had its independent second read, with its area page: authors (10), science (the first 5), jesus (10), contradictions (5), old-testament (10), evil (5), god (5), morality (the first 5), religions (5). With the text area's nine that is 69 live pieces in ten live areas, 81 live pages with the room and the claims index. Ten pieces stay pending: the five newest in science and the five written this run.

Before each area was set live a safety pass ran over its pieces, by script (`safety.mjs`, `quotes.mjs`, `living.mjs` and `bsbcheck.py` in the scratch folder) and by eye on everything the scripts raised. Of 1,262 quotations of four words or more, 1,204 matched the ledger, the BSB or the Study Bible's notes word for word; the other 58 were read one by one and were words put in an imagined speaker's mouth, Scripture quoted across verses (478 Scripture quotations checked by script, the Psalms by a second script), or source quotations the ledger records by reference instead of wording (the Qur'an in Pickthall, Jerome on Porphyry, the British Museum's Gilgamesh, Whiston's Josephus, the Westminster Confession, Irenaeus). No first-person voice for James, no hint of his church body (Baptists are named only as history, in the third person), nothing that blames the Jewish people, and every care passage the plan requires in place. One living scholar is quoted in his own words on a page now live: Richard Dawkins's sentence on the God of the Old Testament, verified in three copies in the twenty-third run and already quoted in the Honest Answer on genocide; it was left, and is reported to James. No change to any piece's wording was needed.

What a live piece touches was brought into line: `areas.json` gained a one-line description for each area, which the manifest carries and the room shows under each title with the number of live pieces (the validator now fails a live area without one, with a seeded test); the prerendered room carries the same lines; the search index now finds each live area page as well as each live piece, and its library source falls after the nation essays and church history, so that on a tie a search for "nicaea" or for the Christian-nation question still opens the page it did (two site-search tests caught this); `llms.txt` names the ten areas; an area page links down to its list of questions, since on a phone the list sits below several paragraphs; and the tests that pinned "pending" now pin the new state. The site's menus and `siteCatalog.ts` were not changed: the Questions door still shows the room, the text area and "Look up a claim".

To take a piece back down: set `"status": "pending"` in its file under `client/public/questions/<area>/`, or the area's status in `areas.json` for a whole area, then run `node scripts/build-questions-index.mjs` and `pnpm exec tsx scripts/build-search-index.mjs` and deploy.

### Five more pieces in the area "morality" (pending)

| Piece | Address (pending) | Argued prose | Key |
|---|---|---|---|
| What does the Bible say about homosexuality, and why do Christians disagree? | /questions/morality/what-the-bible-says-about-homosexuality | 2,281 | bw |
| The Bible tells wives to submit and women to keep silent, and the church kept women down for centuries. Is Christianity bad for women? | /questions/morality/is-christianity-bad-for-women | 2,144 | bx |
| The Bible never mentions abortion. What did the first Christians believe about it, and about leaving unwanted infants to die? | /questions/morality/the-first-christians-on-abortion-and-exposure | 2,269 | by |
| Every nation's laws rest on somebody's morals. Why shouldn't a Christian people want a Christian nation? Is Christian nationalism Christian? | /questions/morality/is-christian-nationalism-christian | 2,099 | bz |
| Morals differ from one culture to the next, and Nietzsche traced Christian values to the resentment of the weak. Isn't Christian morality just the product of its culture? | /questions/morality/is-christian-morality-a-product-of-its-culture | 1,922 | ca |

From section 19's unwritten list for the area. Each is written to the fourteen points and to James's words above: short plain sentences beside longer ones, contractions, no term left unexplained, the hardest form of the objection first, the history with its dates, the texts read closely, each Christian position in words its holders would sign, and what is left open. The homosexuality page sets out the historic teaching and the newer reading and takes no side, as the Study Bible's notes do, and reports the family study's sentence that most churches don't treat the question as one on which believers may differ. The women page takes no side between complementarian and egalitarian readings. The abortion page is history and theology and names no law, court, party or election. The nationalism page states the defenders' case first, argues against the idea from Scripture and history, and applies the same test to any cause that drafts the cross. Three pages reuse the site's own care passages whole (the notes on Romans 1, on 1 Peter 3 and on Psalm 139) and name Find Help.

Sources were opened this run from GitHub copies (the ledger's "Twenty-fifth run" lists each): the Didache, Barnabas, Athenagoras, Diognetus, Justin, Tertullian and Basil in the *Ante-Nicene* and *Nicene and Post-Nicene Fathers*; the canons of the Council in Trullo; Aristotle's *Politics* in Jowett; Brenton's Septuagint and the King James Exodus; Calvin on Exodus 21:22; Stanton's *The Woman's Bible*; Aquinas in the English Dominican translation; Pliny in Melmoth; Nietzsche's *Genealogy of Morals* in Samuel's translation; Julian's letter to Arsacius in Wright's; the Westminster Confession; and the Stanford Encyclopedia's entries on homosexuality and moral relativism. Living scholars (Brownson, Hays, Gagnon, Hill, Wolfe) are given only as the site's notes and studies or a named readable source give them, and none is quoted. Three things rest on copies of Wikipedia articles and say so on the page: the Catholic history of penalties for abortion with Augustine's and Aquinas's views of the unformed child, and the positions of the Church of England and the United Methodist Church.

### Found, outside this run's reach (not changed)

- `client/src/data/answers.ts` is not out of date on anything these pages treat; no Honest Answer exists on sexuality, women, abortion or Christian nationalism, and "Should a Christian belong to a political party?" was not re-read.
- The shelf essay "What the First Christians Did About the Children Rome Threw Away" and "What Christian Nationalism Is, and What It Is Not" are pending on the shelf, so the new pages don't link them; the morality area page's "Where else to look" names the second by its address, as it has since the nineteenth run.
- The live essay "women-in-church-history" was not read against the women page.

### What was run

After the final merge of `claude/todo-implementation-hhp4bm`, in this order, each exit code read directly: `pnpm check` 0; all 46 commands of the content-gates step 0; `pnpm test` 0 (162 files passed, 7 skipped; 1,940 tests passed, 73 skipped); `pnpm build` 0; sitemap 0, prerender 0 (91 library pages), `audit:canonicals` 0 (2,471 sitemap URLs, 0 failures, 0 not prerendered). On the served build (`serve-like-vercel.mjs`, port 4691) every one of the 91 library pages was opened at 390 and at 1440: each of the 81 live pages has no noindex and no review line, its own title, is in the sitemap, and (areas and pieces) is in the search index; each of the 10 pending pages says noindex, carries the review line and is in neither; no live page lists a pending one; every piece has its link back to its area and a previous or next question; no sideways scroll; no console error beyond the local server's missing `/api/track` and the two Vercel scripts. Site search in the page found five live pages by a word of their own and none of three pending ones. The first full test run failed two site-search tests (the library outranking the nation essay and the council on a tie); the source order was changed and the suite run again. The room, the area pages and a pending piece were read on phone-width screenshots; the jump link on area pages came from that read. The plan and ledger text written after the gates was checked by the light gates only.

### What remains

A second read of the ten pending pieces (five in science, five in morality), then each goes live by its `status`. From the plan's list for this area: the church and the Jewish people as a page of its own, which waits for James's read, and colonialism and missions.

---

## 25. Twenty-sixth run (2026-11-21): the second read of the ten pending pieces; nine go live

James, 2026-11-20: "let the apologetics go live too"; "keep going and publish when ready." The standing rule: a piece goes live after an independent second read. And on 2026-11-21, while this run was working: "I take a position that homosexuality is a sexual sin"; on women in ministry, the complementarian position (the office of pastor is for qualified men) "but I also want to teach both sides ... fairly"; "Abortion, I believe, is wrong"; and of the first, "I can say, but I just choose not to say."

### The second read

An editor who did not write them read the ten pending pieces one at a time, each as the people it is about and the people who would attack it, then as a logician and for James's register. Every source was fetched again this run and every quotation checked by script against what was fetched (the ledger's "Twenty-sixth run" gives the sources, the count and a before-and-after row for each of the 58 changes). The changes that matter:

- **Homosexuality** (stays pending). Each reading is now named as its holders name it; the historic side's central text (Matthew 19) is followed by one sentence on how the other reading meets it; the note's own context for 1 Corinthians 6 ("sins common to everyone in the room") stands beside the sentence on who "will not inherit the kingdom"; the argument has a fourth step, so that its conclusion about contempt follows from something; only what the family study reports is given under Hays's and Gagnon's names; the closing sentence added last run now says only what the site already says ("has no warrant anywhere in the teaching of Jesus"). Brownson, Hays, Gagnon and Hill were not opened and are marked as the notes' and the study's summaries. The page takes no side and waits for James's word; the paragraph that would state where he lands is in the ledger.
- **Women** (live). Both readings stand as their holders state them, and a new paragraph says where the author lands (complementarian: equal worth and dignity; the office of pastor or elder for qualified men), that the question is second-order, and the strongest objection, which the page doesn't claim to have fully answered. The unsourced sentence on which churches ordain women is replaced by what the site's study of church leadership says. Two unsourced claims in the concessions now use the family study's words.
- **Abortion and exposure** (live). Nothing rests on Wikipedia any longer. Augustine is quoted from the *Enchiridion* and *On Marriage and Concupiscence*, Aquinas from the *Summa*; the figures of forty and ninety days are cut; the penalty history (1588, 1591, 1869) is stated as far as Latin sources read this run carry it; the Church of England is quoted from its own representative; the United Methodist sentence is cut. One sentence says that the author holds, with the historic teaching, that abortion is wrong; the paragraph on mercy and the care passage follow it at once. No law, court, party or policy.
- **Christian nationalism** (live). The defender's definition is now confirmed in a second work that quotes it and reports his argument, and the page gives that argument (nations in God's design, the gospel completing a people's common life, the word and sacraments open to all); the page's own definition no longer uses a critic's phrase; one sentence applies the same test to the left in the page's own words, and the site's essay on the left's form of the error is linked.
- **Morality and culture** (live). Julian's letter is reported as it reads (he claims the practice was his own religion's "of old"); Nietzsche's real question (whether these values have "hindered or advanced human well-being") is quoted and answered, where the page had answered a cruder one; the relativist's obvious reply is stated; the page now says that much of what set Christians apart was Jewish first, and that the argument doesn't settle where Israel's teaching came from.
- **The five science pages** (live). Every quotation matched its source. Two sentences that spoke as if a reading had already lost, on pages that take no side, are changed (the age page's conclusion; the Adam page's short answer, which now says "If that is right" and that Christians who hold a recent first pair contest the evidence). The mind page names its source for what lesions and stimulation show. The free-will page was read whole and not changed. The near-death page was read for a grieving reader and for one thinking of death; its care passages are whole.

### What went live

The five science pieces and four morality pieces: 78 of the library's 79 pieces are live, in ten live areas. The area lines for science and morality name the new subjects; the morality area page no longer says that pages on morality are still to be written, says where the author lands in two blurbs, and gains four words. The tests that pinned five live pieces in each of the two areas now pin ten and nine, and the validator's seeded tests use the homosexuality page as their pending example. To take a piece back down, see section 16.

### Dawkins

On the live page "the God of the Old Testament", his sentence is now paraphrased, with his name, book and chapter and every charge in his order, as the library's rule for living authors requires. `client/src/data/answers.ts` was not touched: the Honest Answer on genocide still quotes the same sentence in two fragments.

### Found, outside this run's reach (not changed)

- The live page on sexuality and the body (`client/public/disruption/topics/sexuality-and-body.json`) says in James's first person, "I hold the historic view." The library's pending page takes no side. Whether those should agree is his decision.
- The Honest Answer on genocide quotes Dawkins directly.
- The library is not in the passage index: a chapter's "Go deeper" lists no library piece, though section 4.4 planned it.
- Tacitus, Philo and the Hilarion letter on the abortion and women pages rest on the essay ledger's rows and were not opened again.

### What remains

The homosexuality page, on James's word. From the plan: the church and the Jewish people as a page of its own (waits for James's read), colonialism and missions, life on other planets, artificial intelligence, whether the great scientists were believers, and the unwritten questions listed area by area in section 19.
