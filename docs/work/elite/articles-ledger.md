# Articles ledger (2026-11-20)

A row for every factual claim and quotation in the five essays landed on the shelf on 2026-11-20. What the run could reach: this repository, and public GitHub repositories fetched from raw.githubusercontent.com or cloned. No web search, no library, no publisher's site. Each row says where the claim was read. "Not opened this run" means the claim rests on general reference knowledge and no source for it was read; those rows are the ones to check first.

## Sources opened in this run

- **ESV copy**: lguenth/mdbible, `json/ESV.json` (commit fd66568), the copy earlier essay ledgers used. Every Scripture quotation in every essay was compared with it by script (`chk.mjs` in the scratch folder: case, quotation-mark style and spacing ignored, every word matched). The copy carries no inner quotation marks and no small capitals, so a quotation with speech inside it was checked for its words only. James's ESV API key would settle the punctuation.
- **Creeds.json**: NonlinearFruit/Creeds.json, `creeds/council_of_orange.json`, `canons_of_dort.json`, `westminster_confession_of_faith.json` (cloned 2026-11-20).
- **WD**: HistoricalChristianFaith/Writings-Database at commit 922f4b3 (the printed nineteenth-century translations of the Ante-Nicene and Nicene and Post-Nicene Fathers series and Roger Pearse's transcriptions; the same repository `scripts/data/history-sources` is drawn from). No machine-translated file was used.
- **PG**: Project Gutenberg texts mirrored by GITenberg on GitHub. 68320 = *The Works of the Rev. John Wesley*, vol. 4 of 32 (the 1771 Pine edition). 73267 = *The Works of the Reverend George Whitefield*, vol. 4 of 6.
- **Barmen (EKD)**: erkkimon/brain-implant-philosophy, `_implant/raw/barmen-1934-theological-declaration-theses-ekd.md`, an excerpt file of the EKD's English text; the Romans 13 essay ledger used the same file.
- **Repo**: this repository's history course (`client/public/history/essays/`), stored history sources (`scripts/data/history-sources/texts/`), live essays and Honest Answers (`client/src/data/answers.ts`, ledgered in `docs/work/elite/apol-ledger.md`).

## 1. did-god-choose-me-or-did-i-choose-god

| Claim or quotation | Where read | Status |
|---|---|---|
| Augustine, *Confessions*: "Give what Thou commandest, and command what Thou wilt." repeated several times | WD, Augustine, *Confessions*, Book 10 (ch. 29, 31, 37; the NPNF text, Pilkington's translation as the series prints it) | Verbatim; four occurrences seen |
| *Confessions* written near the end of the fourth century; Augustine a bishop in North Africa | Not opened this run (standard dating 397 to 400) | Reference knowledge |
| Pelagius, a British teacher in Rome, heard the line quoted and was appalled | Repo, history course `the-fathers-at-work` ("A British ascetic in Rome named Pelagius heard the line quoted aloud and was appalled.") | Site's own |
| Pelagius's case: a just God does not command the impossible; baptized Romans excused themselves by the weakness of nature | Not opened this run (his letter to Demetrias is the usual source); given as paraphrase, no quotation marks | Reference knowledge, paraphrase |
| Augustine's reply: the will is bent, not neutral | Paraphrase of the anti-Pelagian works; WD holds *On Grace and Free Will* (not quoted) | Paraphrase |
| Caelestius condemned at Carthage in 411 | Not opened this run | Reference knowledge |
| Carthage 418 and Ephesus 431 sided with Augustine; the church did not follow his every late conclusion | Repo, `the-fathers-at-work` | Site's own |
| Monks of southern Gaul held that the first turn toward God is ours | Not opened this run | Reference knowledge, paraphrase |
| Council of Orange, 529; a small council; Orange in southern France | Creeds.json metadata (year 529, fourteen bishops named, Orange, France) | Verified |
| "The sin of the first man has so impaired and weakened free will ... has preceded him." | Creeds.json, `council_of_orange.json`, Conclusion | Verbatim |
| "We not only do not believe that any are foreordained to evil ... they are anathema." | Same | Verbatim |
| Erasmus wrote on free will against Luther in 1524; Luther answered with *The Bondage of the Will* in 1525 and thanked Erasmus for going to the central issue and not to indulgences and the like | Not opened this run; given as paraphrase | Reference knowledge, paraphrase |
| Trent's decree on justification, 1547: grace first; the will cooperates and can refuse; grace can be lost | Not opened this run | Reference knowledge, paraphrase |
| Dominicans and Jesuits disputed grace and freedom; Paul V ended the hearings in 1607 without a ruling and forbade each side to call the other heretical | Not opened this run | Reference knowledge |
| Lutheran confession of 1577 (Formula of Concord, art. XI): election by grace, no election to damnation | Not opened this run; paraphrase | Reference knowledge, paraphrase |
| Arminius, Dutch pastor, professor at Leiden, died 1609; five articles in 1610; Synod of Dort 1618 to 1619 with British, German and Swiss delegates | Creeds.json metadata gives 1619 and "the judgment of the Synod against the Remonstrance"; the rest not opened this run | Partly verified |
| Dort: "abundantly sufficient to expiate the sins of the whole world" | Creeds.json, `canons_of_dort.json`, Second Head, art. 3 | Verbatim |
| Dort: "ought to be declared and published to all nations, and to all persons promiscuously and without distinction" | Same, Second Head, art. 5 | Verbatim |
| Dort: "are unfeignedly called" | Same, Third and Fourth Heads, art. 8 | Verbatim |
| After Dort the Dutch government removed Remonstrant ministers and banished many | Not opened this run | Reference knowledge |
| Wesley and Whitefield, Oxford friends, leaders of the awakening; Wesley the Arminian, Whitefield the Calvinist; divided by 1741; followers said bitter things; Wesley preached the memorial sermon at Whitefield's request | Repo, history course `the-awakenings` and `awakenings-and-enlightenment` | Site's own |
| Wesley's sermon *Free Grace*; Whitefield's printed letter in answer | PG 73267: "A LETTER To the REVEREND MR. JOHN WESLEY: In ANSWER to his SERMON, ENTITULED FREE-GRACE" | Verified; no date is given in the essay for either |
| Whitefield: "You plainly make salvation depend not on GOD's free-grace, but on man's free-will." | PG 73267, the same letter (italics on free-grace and free-will dropped) | Verbatim |
| Whitefield died in 1770; sermon preached in London | PG 68320, Sermon LIII: "Preached at the Chappel in Tottenham-Court-Road, and at the Tabernacle near Moorfields, on Sunday, November 18, 1770" | Verified |
| Wesley: "In these we may think and let think; we may 'agree to disagree.'" | PG 68320, Sermon LIII, III.1 | Verbatim |
| Wesley: "Give God all the glory of whatever is good in man." and "There is no power in man, till it is given him from above, to do one good work, to speak one good word, or to form one good desire." | PG 68320, Sermon LIII, III.2 | Verbatim |
| John 6:44 and John 12:32 use the same Greek verb for "draw" | Not opened this run (helkō in both) | Reference knowledge |
| Westminster Confession, 1646: "neither is God the author of sin, nor is violence offered to the will of the creatures"; "high mystery"; "to be handled with special prudence and care" | Creeds.json, `westminster_confession_of_faith.json`, 3.1 and 3.8; the year 1646 not opened | Verbatim; year reference knowledge |
| Orthodox churches speak of synergy and did not take Augustine as their main teacher | Not opened this run | Reference knowledge, paraphrase |
| The Apostles' and Nicene Creeds are silent on election | Creeds.json holds both; neither mentions it | Verified |
| Scripture (ESV): Romans 9:11, 9:16, 9:19, 10:1, 10:13, 11:32, 11:33; John 6:37, 6:40, 6:44, 12:32; 1 Timothy 2:4; 2 Peter 3:9; Ezekiel 33:11 | ESV copy, by script | Words verified |

Cut or held back because it could not be opened: any sentence of Pelagius, Erasmus, Luther, Arminius, Trent or the Formula of Concord in quotation marks (all given as paraphrase); the date of Wesley's *Free Grace* and of Whitefield's letter; Charles Simeon's conversation with Wesley; Spurgeon on the two truths.

## 3. why-jesus-wont-fit-in-either-party

No candidate, party, platform, election or law is named. The people in the opening paragraph are types ("a lot of American Christians"), not anyone's memory.

| Claim or quotation | Where read | Status |
|---|---|---|
| Matthew and "Simon who was called the Zealot" among the twelve; Matthew a tax collector | ESV copy (Luke 6:15; Matthew 9:9) | Verified; what "Zealot" meant is left open in the essay |
| Constantine won the West in 312 and credited the Christian God; the faith legal the next year; Nicaea 325 | Repo, history course `the-constantinian-turn`, `councils-and-creeds` | Site's own |
| Some bishops at Nicaea had been tortured | Repo, live essay `the-council-of-nicaea-what-was-decided-in-325` ("Many in the hall had been tortured for Christ.") and `councils-and-creeds` | Site's own |
| The banquet: bishops passed the guard and soldiers with drawn swords; Eusebius was present | WD, Eusebius, *Life of Constantine* 3.15 (the NPNF text) | Verified |
| "One might have thought that a picture of Christ's kingdom was thus shadowed forth, and a dream rather than reality." | Same | Verbatim |
| Christianity official in 380; Priscillian put to death in the 380s by imperial authorities, urged on by bishops | Repo, `the-constantinian-turn` | Site's own |
| Theodosius, the massacre of thousands at Thessalonica, Ambrose, public penance in 390 | Repo, `the-constantinian-turn`; Ambrose's Letter 51 is in `scripts/data/history-sources/texts/` | Site's own |
| Peace of Augsburg 1555, each ruler sets the religion; Saint Bartholomew's Day 1572, the Huguenot leadership murdered in Paris, killing spread for weeks; war ended 1648 with nobody the winner | Repo, `reformation-and-its-wars`, `the-counter-reformation` | Site's own |
| The Thirty Years' War began in 1618 | Not opened this run | Reference knowledge |
| The German Christians set out to merge church and regime, accepted the state's racial exclusions, won the 1933 church elections with the regime's support | Repo, `the-global-church`; live essay `what-romans-13-says` and its ledger | Site's own |
| Barmen, May 1934, a minority; drafted chiefly by Karl Barth | Repo, `the-global-church`; Barmen (EKD) | Verified |
| Barmen thesis 1, both sentences; thesis 2, "areas of our life in which we would not belong to Jesus Christ, but to other lords" | Barmen (EKD) | Verbatim |
| Barmen said nothing about the Jews; Barth later said so | Repo, live essay `what-romans-13-says` (ledgered there: Barth, 1967) | Site's own |
| Rauschenbusch, Baptist pastor, 1886 to 1897, Hell's Kitchen; children's funerals | Repo, `the-american-experiment` | Site's own |
| In his heirs the kingdom became progress, the cross an example, the resurrection negotiable | Same | Site's own |
| H. Richard Niebuhr's sentence (a God without wrath ...) | Repo, `the-american-experiment`, which gives it from *The Kingdom of God in America*; the book was not opened, so the essay gives the substance without quotation marks | Paraphrase, marked as such |
| Many churches on that road have been emptying since | Not opened this run (mainline membership decline since the 1960s) | Reference knowledge, stated generally |
| The Moral Majority, founded 1979 | Repo (`client/public/theology/church-history-timeline.json`, `nation/nationalism-history.json`); not in the history course | Site's own, older library |
| Philippi a Roman colony | ESV copy, Acts 16:12 | Verified |
| Scripture (ESV): Matthew 4:8-9, 5:44; John 6:15, 18:36; Luke 6:15, 9:55; Mark 10:37, 12:17, 15:27; Romans 10:9; Acts 17:7; Philippians 3:20; Psalm 146:3 | ESV copy, by script | Words verified |

Cut or held back: any sentence of Rauschenbusch in quotation marks; Niebuhr's sentence as a quotation; the numbers of the dead in the wars of religion; John 19:15 (left out so that no line could be read as blaming the Jewish people; John 18:36 is quoted only as far as "fighting").

## 2. should-women-preach

The essay states no position as James's. The people in the opening paragraph are types, not memories.

| Claim or quotation | Where read | Status |
|---|---|---|
| Phoebe: the word translated "servant" (Romans 16:1) is the word translated "deacon" elsewhere | Not opened this run (diakonos; Philippians 1:1, 1 Timothy 3:8) | Reference knowledge |
| Most scholars think Phoebe carried the letter | Not opened this run | Reference knowledge, stated as scholars' opinion |
| Prisca named before Aquila in Romans 16:3; Acts 18:26 | ESV copy | Verified |
| Romans 16:7 can also be read "outstanding among the apostles" | Not opened this run; the 1889 editor's note in WD discusses both readings | Reference knowledge, partly seen |
| Chrysostom (fourth century) read Junia as a woman counted an apostle: "should be even counted worthy of the appellation of apostle" | WD, Chrysostom, *Homilies on Romans*, Homily 31 (the NPNF text). The full sentence begins "Oh! how great is the devotion ... of this woman, that she"; the essay quotes only the clause without the exclamation points | Verbatim (clause) |
| The English editor's note: prefers Junias; "that a woman should have been an apostle is out of the question" | WD, same file, note 13, signed G. B. S. | Verbatim. The essay says "in the nineteenth century"; the volume's year (1889) was not opened |
| Many twentieth-century English Bibles printed "Junias"; no man of that name is known from another ancient source | Not opened this run | Reference knowledge |
| 1 Corinthians 11:5 and 14:34-35 stand in the same letter; the two common readings of chapter 14 | ESV copy for the texts; the readings are paraphrase of each side | Verified / paraphrase |
| "Exercise authority" renders a verb found once in the New Testament; its meaning is disputed | Not opened this run (authentein) | Reference knowledge |
| King James Version: "usurp authority" | Not opened this run (1 Timothy 2:12, KJV) | Reference knowledge; two words quoted |
| "Complementarian" as a name dates from the late 1980s | Not opened this run | Reference knowledge |
| Tertullian, around 200: "And do you not know that you are (each) an Eve?" and "You are the devil's gateway" | WD, Tertullian, *On the Apparel of Women*, Book 1, ch. 1 (the ANF text) | Verbatim; date reference knowledge |
| Pliny, around 112, questioned under torture two enslaved women "who were called deaconesses" | Repo, `scripts/data/history-sources/texts/eusebius-church-history-3.html` (McGiffert's translation of the letter in his note); date from the live essay `the-early-church-under-rome` | Verbatim |
| Chalcedon, 451, canon 15: "receive the laying on of hands as a deaconess" | WD, Council of Chalcedon, The 30 Canons (the NPNF text) | Verbatim |
| Quaker women preached in the 1600s; Antoinette Brown ordained by a Congregational church in New York in 1853; women missionaries sent abroad by churches that limited them at home | Not opened this run | Reference knowledge |
| The creeds say nothing on who may preach | Creeds.json (Apostles', Nicene) | Verified |
| Care line: "If you need someone sooner, [Find Help](/help) lists hotlines for abuse and sexual assault." | Repo, live essay `doubt-after-church-abuse`, reused whole | Site's own |
| Deborah a judge and prophetess; Barak would not go without her; Josiah's officials went to Huldah | ESV copy (Judges 4:4-8; 2 Kings 22:14) | Verified |
| Scripture (ESV): Judges 4:4-5; 2 Kings 22:14; John 20:18; Luke 24:11; Acts 2:17, 18:26, 21:9; 1 Corinthians 11:5, 12:7, 12:11, 13:12, 14:29, 14:34-35; Romans 16:1-3, 16:7; 1 Timothy 1:3, 2:11-14, 3:2; 2 Timothy 3:6; Philippians 4:3; Galatians 3:28; Matthew 20:26; Genesis 1:27-28 (cited) | ESV copy, by script | Words verified |

Cut or held back: Margaret Fell's 1666 title, Catherine Booth, Phoebe Palmer, the 1956 Methodist and Presbyterian decisions, the 1987 and 1989 statements of the two modern camps, and the Catholic ruling of 1994 (none could be opened; none is needed for the argument); any named modern scholar.
