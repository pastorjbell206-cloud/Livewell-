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
7. Mark 1:41: an angry Jesus. Ehrman, "A Leper in the Hands of an Angry Jesus" (essay; title and year to verify before naming) and *Bible Review* 2005 S.
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
