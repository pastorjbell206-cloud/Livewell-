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

## 4. is-hell-real-and-is-it-forever

Written to agree with the live Honest Answer `is-hell-forever-or-does-it-end` (`client/src/data/answers.ts`): final judgment and the possibility of final loss are confessed; what hell is and how long it lasts is left open between the first two views; the hope of restoration is described as a minority hope the church has generally not affirmed. Nothing is said about any person's fate, and no position is stated as James's.

| Claim or quotation | Where read | Status |
|---|---|---|
| Russell, lecture in London, 1927: "I do not myself feel that any person who is really profoundly humane can believe in everlasting punishment."; he counted belief in hell against Jesus and said the doctrine made the world crueler | Repo, the live Honest Answer, ledgered in `docs/work/elite/apol-ledger.md` (second run, hell) | Site's own; the lecture was not opened in this run |
| Nicene Creed: "He shall come again, with glory, to judge the quick and the dead" | Creeds.json, `nicene_creed.json` | Verbatim |
| Gehenna: twelve uses in the New Testament, eleven by Jesus; Paul never uses it | Not opened this run (the twelfth is James 3:6) | Reference knowledge |
| Gehenna is the Valley of Hinnom, south and west of Jerusalem, where kings of Judah burned children; by Jesus' time a name for final punishment; the rubbish-dump explanation is first found in a medieval commentator around 1200 and has no ancient support | Repo, Study Bible notes, `client/public/bible/notes/mark/9.json` | Site's own |
| Mark 9:48 draws on Isaiah 66:24, where worm and fire consume corpses | ESV copy | Verified |
| Eternal conscious punishment the view of most of the church, East and West | Repo, the live Honest Answer ("held by most of the church through most of its history") | Site's own |
| Conditional immortality: Fudge 1982; Stott 1988, tentatively | Repo, the live Honest Answer and its ledger | Site's own |
| Origen (third century) and Gregory of Nyssa (fourth) taught a final restoration; Gregory never condemned | Repo, the live Honest Answer for Gregory; WD, Augustine, *City of God* 21.17 for Origen; "never condemned" not opened | Partly verified |
| Augustine, *City of God* 21.17: "I must now, I see, enter the lists of amicable controversy with those tender-hearted Christians ... shall suffer eternally." | WD, Augustine, *The City of God*, Book 21 (Dods's translation as the NPNF prints it) | Verbatim |
| The last books of *The City of God* date from the 420s | Not opened this run | Reference knowledge |
| Origen's teaching anathematized at Constantinople in the sixth century under Justinian; historians dispute whether that sentence belongs to the acts of the general council of 553 (reworded 2026-11-21 from "In 553 Origen's teaching was condemned") | WD, same file, editor's note 37 (the Fifth Ecumenical Council, Justinian); the dispute as the site's other pages state it; the year 553 not printed in the note | Partly verified; site's own for the dispute |
| Athanasian Creed: "they that have done evil" go "into everlasting fire" | Creeds.json, `athanasian_creed.json` | Verbatim |
| Westminster Confession: "shall be cast into eternal torments" | Creeds.json, `westminster_confession_of_faith.json`, 33.2 | Verbatim |
| Edwards preached "Sinners in the Hands of an Angry God" at Enfield in July 1741, from a manuscript in a level voice; the most famous sermon in American history | Repo, history course `awakenings-and-enlightenment` | Site's own |
| Popular pictures of hell owe much to medieval art and Dante; the devil is a prisoner in Scripture's hell | Revelation 20:10 (ESV copy) for the second; the first not opened | Reference knowledge |
| The Catholic Church has never declared any individual to be in hell | Not opened this run | Reference knowledge; check first |
| Care passage ("If you're grieving as you read this ... a page for grief.") | Repo, live essay `why-does-god-allow-suffering`, reused whole; a script confirmed the paragraph is identical | Site's own |
| Scripture (ESV): Hebrews 9:27; Genesis 18:25; Jeremiah 7:31 (cited); Matthew 7:22-23, 10:28, 25:41, 25:46; Mark 9:48, 15:33; Revelation 14:11; 1 Timothy 2:4; 1 Corinthians 15:22, 15:28; Romans 6:23, 8:1; John 3:16; Jude 7; Colossians 1:20; Luke 16:26, 19:41, 23:34, 23:43 | ESV copy, by script | Words verified |

Cut or held back: C. S. Lewis's two sentences and Volf's sentence (quoted in the Honest Answer; the books could not be opened here, so the essay leaves them to that page); Aquinas; any line of Edwards's sermon; any figure for what Christians today believe.

## 5. can-a-christian-be-rich

Written to agree with the live Honest Answer `what-does-the-bible-say-about-money` (wealth a real good, a serious danger, and a rival god; the prosperity teaching named as a distortion; the opposite pride named too). The three people in the opening paragraph are types.

| Claim or quotation | Where read | Status |
|---|---|---|
| No ancient source mentions a Jerusalem gate called the Needle's Eye | Repo, Study Bible notes, `client/public/bible/notes/mark/10.json` | Site's own |
| The rich fool's pronouns (my crops, my barns, my grain, my goods, my soul); nothing is charged against him or against the rich man of Luke 16 but keeping | ESV copy, Luke 12:16-20; 16:19-25 | Verified |
| Zacchaeus gave half; women of means paid for Jesus' work; Joseph of Arimathea rich and a disciple | ESV copy, Luke 19:8-9; 8:3; Matthew 27:57 | Verified |
| Acts 4:34 echoes the law of Moses | ESV copy, Deuteronomy 15:4 ("But there will be no poor among you") | Verified |
| Clement of Alexandria, about 200, wrote for wealthy Christians troubled by Mark 10; the target is attachment | WD, Clement of Alexandria, *Who Is the Rich Man That Shall Be Saved?* (the ANF text, William Wilson's translation as the series prints it); the date not opened | Read; date reference knowledge |
| "Riches, then, which benefit also our neighbours, are not to be thrown away" and "Such an instrument is wealth." | Same, ch. 14 | Verbatim |
| Wesley told Methodists to gain all they can by honest industry and save all they can; "Having first gained all you can, and secondly saved all you can, then give all you can." | PG 68320, the sermon on the use of money, III.1 | Verbatim; the first two rules paraphrased from the same sermon |
| Antony, around 270, rich by village standards, heard the rich man's story read and took it as spoken to him; monasticism followed | Repo, history course `the-desert-and-the-rule` | Site's own |
| Chrysostom on the rich man and Lazarus: "that not to share our own riches with the poor is a robbery of the poor ... but also theirs." | WD, Chrysostom, *Four Discourses, Chiefly on the Parable of the Rich Man and Lazarus*, Discourse 2, translated by F. Allen (London: Longmans, 1869; title page read in the translator's introduction) | Verbatim |
| The discourses were preached in Antioch in the fourth century | Not opened this run beyond the translator's preface | Reference knowledge |
| Basil fed the starving in a famine and built a complex for the sick and poor outside Caesarea | WD, Gregory of Nazianzus, Oration 43, sections 34-36 and 63 (the NPNF text) | Verified |
| Gregory: "Go forth a little way from the city, and behold the new city ... in consequence of his exhortations." | Same, section 63 | Verbatim (the sentence continues after "exhortations") |
| The prosperity teaching arose in the last century; what it teaches | Not opened this run; described generally, no teacher or ministry named | Reference knowledge |
| The apostles died poor | Not opened this run | Reference knowledge, stated generally |
| John 12:6: the objection about the ointment came "not because he cared about the poor" | ESV copy | Verified |
| Greed stands on the same lists as adultery | ESV copy, 1 Corinthians 6:9-10; Ephesians 5:5 (not quoted) | Verified |
| Scripture (ESV): Mark 10:21-22, 10:25-27; Luke 6:24, 8:3, 19:9; Matthew 6:21, 6:24, 27:57; Acts 4:32, 4:34, 5:4; 1 Timothy 6:5, 6:9-10, 6:17-18; James 2:2-3 (cited), 5:1, 5:4; Philippians 4:12; 2 Corinthians 8:9; John 12:6; Proverbs 30:8-9 | ESV copy, by script | Words verified |

Cut or held back: Basil's own sermons to the rich and on the barns (no printed public-domain translation could be opened; he appears only through Gregory's oration, which could); the better-known modern wording of Chrysostom ("theft from the poor"), which is from a translation still in copyright that could not be opened; Wesley's later sermons on the danger of riches; any name or date for the prosperity teaching's founders; any figure for world income.

---

# Second run (2026-11-21)

Five more essays. What the run could reach was the same as before: this repository and public GitHub repositories. Sources opened in this run, beyond those listed at the top:

- **Evans-TCP**: Text-Creation-Partnership/Evans-TCP, the Text Creation Partnership's transcriptions of early American printed books (Evans Early American Imprints), `evans/XML/`. N20688 = Absalom Jones and Richard Allen, *A Narrative of the Proceedings of the Black People, during the late Awful Calamity in Philadelphia* (Philadelphia, 1794), with its "Address to those who keep Slaves". N18125 = John Leland, *The Rights of Conscience Inalienable* (1791). N09952 = Isaac Backus, *An Appeal to the Public for Religious Liberty* (Boston, 1773). N16494 = Samuel Langdon, *The Republic of the Israelites an Example to the American States* (election sermon, Concord, New Hampshire, 5 June 1788). N14363 = Ezra Stiles, *The United States Elevated to Glory and Honor* (election sermon, Hartford, 1783). N15010 = Samuel Hopkins, *A Dialogue concerning the Slavery of the Africans* (1776; the 1785 reprint). N16207 = the Northwest Ordinance as printed in 1787. Titles, authors and years are from the partnership's catalogue (textcreationpartnership/Texts, `TCP.csv`). The transcriptions mark a line-end hyphen with a bar; words are quoted joined.
- **PG (GITenberg)**: 23 = Douglass, *Narrative* (1845), with its Appendix. 28148 = *Cotton Is King, and Pro-Slavery Arguments*, ed. E. N. Elliott (Augusta, Georgia: Pritchard, Abbott and Loomis, 1860; title page read), holding Thornton Stringfellow's "The Bible Argument: or, Slavery in the Light of Divine Revelation". 28054 = Dostoevsky, *The Brothers Karamazov*, translated by Constance Garnett. 65739 = Roger Williams, *The Bloudy Tenent of Persecution* (1644), in Edward Bean Underhill's edition.
- **Mishnah**: kidaa/Sefaria-Export (a copy of Sefaria's export), `json/Mishnah/Seder Nashim/Mishnah Gittin/English/merged.json`, whose English is credited there to the Sefaria Community Translation and *Eighteen Treatises from the Mishnah*.
- **Trent**: BenjaminPoole/ecumenical-christian-library, `councils/trent-1545/session-xxiv.html`, marked "adapted from Hanover Historical Texts" (the nineteenth-century English translation).
- **Madison**: jeffpar/lonedissent, `sources/loc/volumes/text/301-400/330/330us001.txt`, a scan of volume 330 of the *United States Reports*, whose appendix reprints the *Memorial and Remonstrance* whole. The scan has stray marks from the machine reading; only clean clauses are quoted.
- **Douglass 1852**: siznax/blacklivesmatter, `douglass-1850-july-fourth.md`, an abridged copy of the Rochester speech of 5 July 1852.
- **WD** (the same commit as before): Didache; Tertullian, *On Baptism*; Cyprian, Epistle 58 (to Fidus); Gregory of Nazianzus, Oration 40; Shepherd of Hermas, Commandment 4; Augustine, *On the Good of Marriage*; Basil, Letter 188.

Every Scripture quotation was compared with the ESV copy by the same script.

## 6. what-the-church-got-wrong-about-race

No party, candidate, law of our own day, court case or movement slogan is named. The three people in the opening paragraph are types. The essay agrees with the live essay `why-didnt-the-bible-ban-slavery` and does not repeat its argument from Leviticus and Exodus.

| Claim or quotation | Where read | Status |
|---|---|---|
| English colonists in the 1600s were uneasy about holding fellow Christians as slaves; in 1667 the Virginia assembly declared that baptism did not change whether a person was slave or free | Not opened this run | Reference knowledge; check first |
| Methodist General Conference of 1844; Bishop James O. Andrew of Georgia had come to own slaves and was asked to stop exercising his office; the Southern conferences organized the Methodist Episcopal Church, South, in 1845 | Repo, history course `the-american-experiment` | Site's own |
| The Boston mission board would not appoint a slaveholder; Baptists of the slaveholding states met in Augusta, Georgia, in May 1845 and founded their own convention | Repo, `the-american-experiment`; live essay `why-didnt-the-bible-ban-slavery` | Site's own |
| These were among the largest Protestant bodies in the country | Repo, `the-american-experiment` ("the two largest evangelical bodies in America") | Site's own |
| A proslavery volume published in Augusta in 1860 included an essay by Thornton Stringfellow | PG 28148, title page and section head | Verified |
| Stringfellow a Baptist minister in Virginia | Repo, live essay `why-didnt-the-bible-ban-slavery` | Site's own |
| Stringfellow began with Noah; "God decreed slavery"; "tokens of good-will to the master"; "the Canaanites or Africans, who descended from Ham"; then Abraham, Moses and Paul | PG 28148, Stringfellow's essay, opening pages (the source italicizes "decreed slavery") | Verbatim |
| Genesis 9: the curse is on Canaan, spoken by Noah, not by God; the Canaanites lived in Canaan, not Africa; nothing about color | ESV copy, Genesis 9:24-27, 10:6; Repo, Study Bible notes, `client/public/bible/notes/genesis/9.json` | Verified |
| After the war white churches accepted the color line; the curse of Ham was preached in defense of segregation | Repo, `client/public/justice/topics/race-and-image.json`, `justice/timeline.json` | Site's own, older library |
| Congregations seated Black visitors in the balcony or turned them away at the door | Not opened this run | Reference knowledge, stated generally |
| Richard Allen born enslaved in 1760, converted under Methodist preaching, bought his freedom; around 1787 he, Absalom Jones and others were pulled from their knees in the gallery by white trustees and walked out; Bethel dedicated 1794; the African Methodist Episcopal Church organized in 1816 with Allen its first bishop | Repo, `the-american-experiment` ("In Allen's own telling"). Allen's memoir could not be opened, so nothing from it is in quotation marks | Site's own |
| King, a Baptist preacher, wrote from jail in Birmingham in April 1963 to white clergymen who had urged him to wait; his sharpest disappointment was with white moderates | Repo, `justice/timeline.json`, `justice/topics/race-and-image.json`, `justice/witnesses.json`; the month not opened. The letter is in copyright and could not lawfully be opened here, so it is described without quotation | Site's own; "April" reference knowledge |
| In 1995 the convention founded in Augusta confessed that its founding was bound up with the defense of slavery and that it had defended segregation | Repo, `the-american-experiment` | Site's own |
| Athens told the story that its people had sprung from its own soil | Not opened this run | Reference knowledge |
| The modern idea of race grew up in the centuries of the Atlantic slave trade | Not opened this run | Reference knowledge, stated generally |
| Jones and Allen, 1794: "We wish you to consider, that God himself was the first pleader of the cause of slaves." | Evans-TCP N20688, "An Address to those who keep Slaves, and approve the practice" | Verbatim |
| Jones and Allen: "children of one father, who made of one blood all the nations of the earth" (said of white friends who "are not ashamed to call the most abject of our race, brethren") | Evans-TCP N20688, the closing address to the friends of the enslaved | Verbatim |
| The King James Version of Acts 17:26 reads close to this ("And hath made of one blood all nations of men") | aruljohn/Bible-kjv, `Acts.json` | Verified; the essay says "nearly" |
| Douglass, 1845, seven years out of slavery: "between the Christianity of this land, and the Christianity of Christ, I recognize the widest possible difference" | PG 23, Appendix; "seven years" from the live essay `why-didnt-the-bible-ban-slavery` | Verbatim |
| Enslaved Christians heard the Exodus as their own story | Repo, live essay `why-didnt-the-bible-ban-slavery` | Site's own |
| Black Christians differ among themselves over multiethnic congregations and the historic Black churches | Not opened this run | Reference knowledge, stated generally |
| Scripture (ESV): Genesis 1:27, 9:25, 10:6 (cited); Acts 17:26; Galatians 2:11, 2:14, 3:28; Ephesians 2:14; Revelation 7:9; Matthew 23:30; Ezekiel 18:20; Daniel 9:8; Nehemiah 1:6; Luke 19:8, 19:9; James 2:9 | ESV copy, by script | Words verified |

Cut or held back: any sentence of King's letter and any sentence of the eight clergymen's statement (copyright; not opened); any sentence of Allen's memoir; the second Ham passage in the 1860 volume ("the children of Ham were to be a servile race", by Samuel Cartwright, a physician, not a preacher); the 1807 abridged Bible made for enslaved people; James Henley Thornwell, Benjamin Palmer and the Presbyterian division; any named sermon in defense of segregation (none could be opened); every figure for churches or members.

## 7. why-does-god-let-children-suffer

Written to agree with the live essay `why-does-god-allow-suffering` and the Honest Answer `if-god-is-good-why-suffering`: no explanation of any particular suffering is offered; the classic answers are given their strength and their limits; the argument that the skeptic "borrows" a moral standard is not used as a rebuttal (the Honest Answer says it fails as one), only the narrower point that the protest needs somewhere to stand; the weight rests on the cross and the resurrection. Nothing is said about any child's fate or anyone's. The places in the opening paragraph are types, not memories.

| Claim or quotation | Where read | Status |
|---|---|---|
| Dostoevsky finished *The Brothers Karamazov* in 1880 | Repo, `client/public/needs/suffering.json` | Site's own |
| Dostoevsky's son Alyosha (Alexei) died in 1878, not yet three | Not opened this run | Reference knowledge; check first |
| Alyosha is the believing brother, a novice; Ivan collects his stories from newspapers and keeps to children because adults "have eaten the apple" | PG 28054, Book V, ch. 4 ("Rebellion"), read | Verified; paraphrase |
| "If all must suffer to pay for the eternal harmony, what have children to do with it, tell me, please?" | PG 28054, "Rebellion" (Garnett's translation) | Verbatim |
| Ivan grants the final harmony, even the mother embracing her child's killer, and refuses it: "I renounce the higher harmony altogether." | Same (the sentence begins "and so I renounce") | Verbatim |
| "too high a price is asked for harmony; it's beyond our means to pay so much to enter on it." | Same (the sentence begins "Besides,") | Verbatim |
| "even if I were wrong" | Same (italic in the source) | Verbatim |
| The architect question, in paraphrase; Alyosha: "No, I wouldn't consent" | Same | Paraphrase; the answer verbatim |
| Ivan asks whether any being has the right to forgive; Alyosha: "But there is a Being and He can forgive everything, all and for all, because He gave His innocent blood for all and everything." | Same | Verbatim |
| The free-will, soul-making, sovereignty and limited-sight answers | Repo, live essay `why-does-god-allow-suffering` and the Honest Answer (Plantinga, Irenaeus and Lewis, the Reformed and Wesleyan accounts, Wykstra), none named or quoted here | Site's own, paraphrase |
| "God needed another angel" as a thing said at funerals | Repo, live essay `why-does-god-allow-suffering` | Site's own |
| Children were harmed inside churches and the institution was protected | Repo, live essay `doubt-after-church-abuse` | Site's own, stated generally |
| Care paragraph ("If you're grieving as you read this ... a page for grief.") | Repo, live essay `why-does-god-allow-suffering`, reused whole | Site's own |
| Care line: "If you need someone sooner, [Find Help](/help) lists hotlines for abuse and sexual assault." | Repo, live essay `doubt-after-church-abuse`, reused whole | Site's own |
| Care lines: "The death of a child breaks the order of things, and no sentence makes it make sense, so be wary of anyone who offers one." "Find other parents who have buried a child; they can sit with you as others can't." "If this question has turned toward your own life, please call or text 988 now." | Repo, `client/public/needs/grief.json`, each reused whole | Site's own |
| Jesus raised Jairus's daughter and the widow's son and not every child who died | ESV copy, Mark 5:22-43; Luke 7:11-15 | Verified; the limit is the essay's own observation |
| Scripture (ESV): Genesis 50:20; Job 1:19, 42:7; John 9:2; Exodus 1:22 (cited); Lamentations 2:11-12; Jeremiah 31:15; Matthew 2:18 (cited), 18:6 (cited), 27:46; Psalm 13:1; Habakkuk 1:3; Mark 5:41, 10:14; Luke 2:35; Romans 8:32; Isaiah 65:20; Revelation 6:10, 21:4; Deuteronomy 29:29 | ESV copy, by script | Words verified |

Cut or held back: Ivan's own stories of cruelty (not retold; the live essay names two); the sentence with the returned ticket (quoted in the live essay and the Honest Answer); every sentence of Ivan's with an exclamation point; Matthew 18:14 (in context it speaks of a disciple going astray, not of a child's suffering); 2 Samuel 12:23 and every text or teaching about what becomes of children who die; Augustine on unbaptized infants; any figure for child mortality.

## 8. divorce-remarriage-and-the-church

Written to agree with the Honest Answer `what-does-the-bible-say-about-divorce-and-remarriage` and the help page `client/public/needs/divorce.json` (permanence first; Matthew's and Paul's exceptions; Christians differ on how far they reach; safety before theology; the divorced are not second-class). No position on the grounds for divorce or on remarriage is stated as James's. No ruling on anyone's marriage is given. The four people in the opening paragraph are types.

| Claim or quotation | Where read | Status |
|---|---|---|
| Care lines: "If you are in danger, get safe first and sort the theology after." and "If you are grieving a marriage that ended, you are not a second-class Christian. Grace is not the reward for a clean history." | Repo, the Honest Answer, each reused whole | Site's own |
| Care lines: "If you're in immediate danger, call 911." and "None of these passages tells you to stay in danger." | Repo, `client/public/needs/divorce.json`, each reused whole | Site's own |
| Care line: "If you need someone sooner, [Find Help](/help) lists hotlines for abuse and sexual assault." | Repo, live essay `doubt-after-church-abuse`, reused whole | Site's own |
| Deuteronomy 24 assumes divorce and rules only on the return to the first husband; the certificate was the woman's proof that she was free to marry | ESV copy; Repo, Study Bible notes, `client/public/bible/notes/mark/10.json` | Verified / site's own |
| The Mishnah was written down around 200 | Not opened this run | Reference knowledge |
| Shammai: no divorce unless the husband found unchaste behavior; Hillel: "even if she spoiled his food"; Akiva: even if he found another woman more attractive; the argument is over the words of Deuteronomy 24:1 | Mishnah, Gittin 9:10 (the copy capitalizes "Even"); Akiva's words given in paraphrase | Verbatim (Hillel); paraphrase (the others) |
| Akiva a generation after Jesus; only the husband could issue a divorce | Repo, Study Bible notes, `mark/10.json` | Site's own |
| Malachi wrote around the fifth century before Christ | Not opened this run | Reference knowledge |
| King James Version, Malachi 2:16: "that he hateth putting away" | aruljohn/Bible-kjv, `Malachi.json` | Verbatim |
| Many modern Bibles have God say he hates divorce | Not opened this run | Reference knowledge, no version quoted |
| Adultery in Jewish law was an offense against the husband; "against her" was new | Repo, Study Bible notes, `mark/10.json` | Site's own |
| The Shepherd of Hermas, a Roman Christian writing of the second century | Not opened beyond the text | Reference knowledge |
| Hermas: "The husband should put her away, and remain by himself. But if he put his wife away and marry another, he also commits adultery."; he stays unmarried so that she may repent and return; "In this matter man and woman are to be treated exactly in the same way." | WD, Shepherd of Hermas, Commandment 4, ch. 1 (the ANF text) | Verbatim |
| Augustine, around 401: "that the compact of marriage is not done away by divorce intervening" | WD, Augustine, *On the Good of Marriage*, section 7 (the NPNF text; the sentence begins "Seeing that"); the date not opened | Verbatim; date reference knowledge |
| The Catholic position: a valid, consummated marriage of two baptized people cannot be dissolved; separation for serious cause; an annulment finds that no true marriage came to be | Trent for the first two; the account of annulment not opened | Paraphrase; partly reference knowledge |
| Trent, November 1563: "a separation may take place between husband and wife"; "for many causes"; "that the bond of matrimony cannot be dissolved on account of the adultery of one of the married parties" | Trent, session 24 (11 November 1563), canons 8 and 7 | Verbatim |
| The Orthodox account: marriage meant to be one; a marriage can die; a second marriage permitted by economy, with a penitential service | Not opened this run | Reference knowledge, paraphrase; check first |
| Basil, in the 370s, assigns penance to those who marry a second time | WD, Basil, Letter 188 (to Amphilochius), canon 4 ("one year for digamy"); the date not opened | Verified; date reference knowledge |
| Erasmus argued in the 1510s that Matthew's exception allowed the innocent spouse to remarry | Not opened this run | Reference knowledge, paraphrase |
| Westminster Confession, 1647: "nothing but adultery, or such wilful desertion ... dissolving the bond of marriage" and "marry another, as if the offending party were dead" | Creeds.json, `westminster_confession_of_faith.json`, 24.6 and 24.5 (the file's metadata gives 1647) | Verbatim |
| Some evangelical scholars hold separation without remarriage; others argue from Exodus 21:10-11 and 1 Corinthians 7:15 that abuse and neglect break the covenant | Repo, Study Bible notes, `mark/10.json` (Heth and Wenham, 1984; Instone-Brewer, 2002), neither named in the essay | Site's own |
| Basil: "In the case of her being beaten, and refusing to submit, it would be better for her to endure than to be separated from her husband."; the Lord's words apply "to men and women alike"; custom was harder on wives | WD, Basil, Letter 188, canon 9 (the NPNF text) | Verbatim |
| No tradition requires anyone to remain under the same roof with a person harming them | Trent canon 8 and 1 Corinthians 7:11 for the Catholic and biblical ground; the rest not opened | Partly verified |
| Around 1970 American states rewrote their divorce laws so that no wrong need be proved | Not opened this run | Reference knowledge, stated generally |
| The Samaritan woman told her town | ESV copy, John 4:28-30, 4:39 | Verified |
| Scripture (ESV): Deuteronomy 24:1, 24:4 (cited); Malachi 2:14, 2:16; Matthew 5:32 (cited), 19:3, 19:6, 19:8, 19:9, 19:10; Mark 10:11; 1 Corinthians 7:10-11, 7:15; Exodus 21:10-11 (cited); Ephesians 5:25; John 4:18 (cited); Jeremiah 3:8; Isaiah 54:6; Psalm 34:18 | ESV copy, by script | Words verified |

Cut or held back: any sentence of Erasmus, Luther or Calvin; the Council of Elvira; Justin and Athenagoras; any Orthodox canon or service text in quotation marks; the help page's sentence that quotes 1 Corinthians 7:15 from another translation; every divorce statistic; any counsel to a reader who has remarried beyond taking the question to a pastor who knows the facts (that sentence was itself cut as advice the essay should not give).

## 9. can-a-nation-be-christian

**Why this title and not the one asked for.** The brief asked for "Was America Founded as a Christian Nation?" An essay with that title and slug has been public on the shelf since 2026-11-17 (`was-america-founded-as-a-christian-nation`, about 3,700 words: the Declaration, Article VI, the First Amendment, the Treaty of Tripoli, the Danbury letter, the founders' varied beliefs, the Baptists, 1 Peter 2:9). A second essay under the same name would have duplicated it, and replacing a public essay was outside this run's brief. This essay is the companion the brief's other items describe: the claim in its defenders' best form, the Puritan covenant idea, sermons of the period, the dissenters, slavery and the treatment of native peoples as the test, and what Scripture says of nations and of the church. It links to the earlier essay for the documents and repeats none of its quotations except Winthrop's five words and the three Scripture texts the brief names.

No modern party, candidate, court case, law or movement is named. The people in the opening paragraph are types. Whether a state should establish a church is described as a second-order question and no position on it is stated as James's; that no country stands in Israel's place, and that a teaching which fuses cross and flag is an error, are stated as the confessional floor (CLAUDE.md, Orthodoxy Guardrails).

| Claim or quotation | Where read | Status |
|---|---|---|
| The Puritans sailed for Massachusetts Bay in 1630; Winthrop told them they would be "as a city upon a hill"; in early Massachusetts only church members could vote | Repo, live essay `was-america-founded-as-a-christian-nation`. Winthrop's sermon could not be opened, so only the five words already on the site are quoted | Site's own |
| New England governments had a minister preach at the yearly election | Evans-TCP N16494 and N14363, both titled as election sermons before a governor or legislature; the custom at large not opened | Partly verified |
| Ezra Stiles, president of Yale, preached to the governor and assembly of Connecticut in 1783 on "God's American Israel" | Evans-TCP N14363, title page and opening section; "president of Yale" from the live essay | Verbatim |
| Samuel Langdon preached to the New Hampshire legislature on 5 June 1788 from Deuteronomy (4:5-8): "instead of the twelve tribes of Israel, we may substitute the thirteen States of the American union"; the sermon warns that Israel forfeited its blessings | Evans-TCP N16494, title page and the application | Verbatim |
| The modern defenders' case (no people is neutral; law rests on an account of the human being; Scripture speaks to nations; rights need a giver) | Not opened this run; no writer named or quoted | Paraphrase of a position |
| Roger Williams, driven out of Massachusetts, founded Rhode Island; wrote in 1644 | Repo, live essay `was-america-founded-as-a-christian-nation`; PG 65739 title | Site's own / verified |
| Williams: Israel alone was a nation in covenant, a type; the church is its fulfilment: "these are only the holy nation" | PG 65739 (Underhill's edition, Hanserd Knollys Society, 1848), the section headed "Who are now the true seed of Abraham" | Verbatim; the surrounding argument paraphrased |
| Williams: "the Christian world (so called) hath swallowed up Christianity" | PG 65739, the passage with the side-note "The Christian world hath swallowed up Christianity" | Verbatim |
| Baptists were taxed in New England for Congregational ministers and jailed in Virginia for preaching without a license | Evans-TCP N09952 for the first; Repo, live essay, for the second | Verified / site's own |
| Isaac Backus, a Baptist pastor in Massachusetts, 1773: "because you are taxed where you are not represented; and is it not really so with us?" | Evans-TCP N09952 (the sentence begins "You tell us you cannot,"); "Baptist pastor" from the catalogue's subject headings and reference knowledge | Verbatim |
| John Leland, Baptist preacher, 1791: "These establishments, metamorphise the church into a creature, and religion into a principle of state"; "Pagan, Turk, Jew or Christian" eligible to any post | Evans-TCP N18125 (spelling as printed) | Verbatim |
| Madison, 1785, against a Virginia tax for Christian teachers: "for every page of it disavows a dependence on the powers of this world" | Madison, section 6 (the scan prints "page.of"); the occasion from the live essay | Verbatim |
| Samuel Hopkins addressed the Continental Congress in 1776: "inconsistence with ourselves, in holding so many hundreds of thousands of blacks in slavery ... our children's liberty"; reprinted 1785 | Evans-TCP N15010, the dedication (Norwich, 1776; New York, reprinted 1785, both on the title page) | Verbatim |
| Hopkins a Congregational minister in Newport, Rhode Island | Not opened this run | Reference knowledge |
| The Constitution kept Congress from ending the slave trade before 1808; the 1790 census counted nearly 700,000 enslaved people | Repo, live essay `was-america-founded-as-a-christian-nation` | Site's own |
| Jones and Allen, formerly enslaved, 1794: "If you love your children, if you love your country, if you love the God of love, clear your hands from slaves" | Evans-TCP N20688, "An Address to those who keep Slaves" ("having been ourselves slaves" is in the next address) | Verbatim |
| Douglass, Rochester, 5 July 1852: "This Fourth of July is yours, not mine. You may rejoice, I must mourn." | Douglass 1852 (an abridged copy) | Verbatim |
| The Northwest Ordinance, July 1787, third article: "The utmost good faith shall always be observed towards the Indians; their lands and property shall never be taken from them without their consent" | Evans-TCP N16207; the month and the Congress from the live essay | Verbatim |
| In 1782 a Pennsylvania militia killed some ninety unarmed Christian Delaware at the Moravian village of Gnadenhutten in Ohio | Not opened this run (the usual count is ninety-six, in March 1782) | Reference knowledge; check first |
| In 1838 the Cherokee, many of them Christians taught by missionaries, were driven west from the Southeast and thousands died | Not opened this run | Reference knowledge; check first |
| Lincoln, March 1865: both sides read the same Bible and prayed to the same God; the war as the cost of two and a half centuries of unpaid labor | Repo, history course `the-american-experiment`; given in paraphrase | Site's own |
| Peter wrote to congregations in what is now Turkey; Philippi a Roman colony | ESV copy, 1 Peter 1:1; Acts 16:12 | Verified |
| Anglicans, Lutherans, Catholics and New England Puritans kept established churches; Baptists and Quakers opposed them | Repo, live essay, for New England and the Baptists; the rest not opened | Partly site's own; reference knowledge |
| Scripture (ESV): Proverbs 14:34; Jeremiah 18:7; Psalm 2:10; Matthew 5:14, 7:16, 28:19; Amos 3:2; Exodus 19:6; 1 Peter 2:9, 2:11; John 18:36 (first sentence only); Philippians 3:20; Revelation 7:9, 21:24 (cited); Acts 17:26 (cited); 1 Timothy 2:2 | ESV copy, by script | Words verified |

Cut or held back: Washington's 1790 letter to the Hebrew Congregation at Newport (only quotation collections and encyclopedia copies could be opened, no copy of the letter itself, so it is not used); any more of Winthrop's sermon (the same); the Declaration, Article VI, the First Amendment, the Treaty of Tripoli and the Danbury letter (all quoted in the earlier essay and not repeated); the remainder of John 18:36 (so that no line could be read as blaming the Jewish people); the missionaries jailed in Georgia and the court case that followed; John Eliot's praying towns and Deer Island; Jefferson's sentence about trembling for his country (only quotation lists could be opened).

## 10. babies-or-believers-why-christians-baptize-differently

No side is taken and nothing in the essay says which practice the author's church keeps. The two cases are given the same length and the same kinds of support (texts, a governing conviction, one confession quoted). The people in the opening paragraph are types.

| Claim or quotation | Where read | Status |
|---|---|---|
| Churches that baptize infants baptize adult converts on a profession of faith | Creeds.json, Westminster 28.4 ("those that do actually profess faith") | Verified |
| The New Testament records no baptism of a baby, no prohibition of one, and no believer's child baptized later | The essay's own observation from the texts; the site's library `client/public/theology/sacraments.json` makes the same point about the household passages | Site's own |
| The Didache, usually dated around 100; it expects fasting, prefers running water, allows pouring, and does not mention infants | WD, Didache, ch. 7; Repo, `theology/sacraments.json` (dated "between roughly AD 50 and 120") | Verified / site's own |
| Didache: "thou shalt order the baptized to fast one or two days before" | WD, Didache 7.4 (the text printed in the Ante-Nicene Fathers; the file names no translator) | Verbatim |
| Tertullian, around 200, the first to discuss the baptism of small children directly; advises delay for children and for the unmarried because of sin after baptism | WD, Tertullian, *On Baptism*, ch. 18 ("Translated by the Rev. S. Thelwall"); "first" and the date not opened | Verified; date and "first" reference knowledge |
| Tertullian: "let them become Christians when they have become able to know Christ" | Same | Verbatim |
| Cyprian and sixty-six bishops answered Fidus, who would have waited for the eighth day: "we all rather judge that the mercy and grace of God is not to be refused to any one born of man" | WD, Cyprian, Epistle 58 (the Ante-Nicene Fathers numbering), sections 1-2 | Verbatim |
| The letter dates from about fifty years after Tertullian | Not opened this run (usually dated 253); the site says infant baptism was established "by the middle of the third century" | Reference knowledge / site's own |
| Gregory of Nazianzus, late fourth century, in Constantinople: baptize at once if in danger; otherwise "to wait till the end of the third year, or a little more or less" | WD, Gregory of Nazianzus, Oration 40, section 28 (the NPNF text); the place and date not opened | Verbatim; place and date reference knowledge |
| Augustine's mother devout; as a sick boy he was nearly baptized; "my cleansing was deferred" | WD, Augustine, *Confessions* 1.11 (the sentence begins "So my cleansing") | Verbatim |
| Augustine was baptized as a grown man and later defended infant baptism | WD holds his *On the Merits and Forgiveness of Sins, and on the Baptism of Infants* (title seen); the year of his baptism (387) not opened | Partly verified |
| From the fifth century to the sixteenth nearly every Christian was baptized as an infant | Not opened this run | Reference knowledge, stated generally |
| Zurich, 1525: students of Zwingli concluded that baptism follows faith and baptized one another; "Anabaptist" meant rebaptizer and was an insult | Repo, history course `reformation-and-its-wars`, `the-reformation` | Site's own |
| Nearly every government, Catholic and Protestant, treated rebaptism as a crime | Repo, `the-reformation` ("drowned, burned, and beheaded across Europe"); the laws themselves not opened | Site's own, stated generally |
| The Protestant authorities of Zurich drowned Felix Manz in 1527; the executioners called drowning the third baptism | Repo, Study Bible notes, `client/public/bible/notes/john/plain/16.json`; `reformation-and-its-wars` | Site's own |
| Manz was one of Zwingli's students | Not opened this run | Reference knowledge |
| Michael Sattler shaped the Schleitheim Confession of 1527 and was tortured and burned within months | Repo, `reformation-and-its-wars` | Site's own |
| The uprising at Münster (1530s) was used to justify killing the peaceful majority | Repo, `the-reformation`; the decade not opened | Site's own; decade reference knowledge |
| Westminster Confession, 1647: "Not only those that do actually profess faith in and obedience unto Christ, but also the infants of one or both believing parents are to be baptized." | Creeds.json, `westminster_confession_of_faith.json`, 28.4 | Verbatim |
| Catholic, Orthodox and Lutheran Christians hold that God gives the new birth in baptism | Not opened this run | Reference knowledge, paraphrase |
| The Baptist confession written in London in 1677: "Those who do actually professe repentance towards God, faith in, and obedience, to our Lord Jesus, are the only proper subjects of this ordinance."; it requires immersion | Creeds.json, `london_baptist_1689.json`, 29.2 and 29.4 (metadata year 1677; spelling as printed) | Verbatim |
| The baptism question has never been in the creeds | Creeds.json, Apostles' and Nicene Creeds (the Nicene confesses "one baptism for the remission of sins" and says nothing of who or how) | Verified |
| Scripture (ESV): Matthew 28:19; Romans 4:11, 6:4; Acts 2:38-39, 2:41, 8:12, 16:15, 16:33, 16:34; 1 Corinthians 1:16; Colossians 2:11-12; 1 Peter 3:21; John 3:5, 16:2; Genesis 17:7; Mark 10:14; Jeremiah 31:34; Galatians 3:27, 3:29; Ephesians 4:5 | ESV copy, by script | Words verified |

Cut or held back: Origen's statement that the church received infant baptism from the apostles and Irenaeus's earlier allusion (neither could be opened); the *Apostolic Tradition*; the Augsburg Confession's and Belgic Confession's condemnations of the Anabaptists (the first not in the collection, the second there only in a modern translation); the Zurich council's decrees and the manner of Manz's death beyond drowning; any number for the Anabaptist dead; Balthasar Hubmaier; the whipping of Baptists in New England; any sentence of Luther, Zwingli, Calvin or Menno Simons.

---

# Third run (2026-11-21)

Five more essays. What the run could reach was the same as before: this repository and public GitHub repositories (raw files and GitHub code search). Sources opened in this run, beyond those listed above:

- **WD** (HistoricalChristianFaith/Writings-Database at 922f4b3, the printed nineteenth-century translations): Tertullian, *On Idolatry*, *The Chaplet (De Corona)* and *The Apology*; Origen, *Against Celsus*, Book 8; Sulpicius Severus, *On the Life of St. Martin*; Augustine, *Reply to Faustus*, Book 22, *The City of God*, Books 19 and 22, *Letters* (Letter 189), *Treatise on Rebuke and Grace*, *Ten Homilies on the First Epistle of John*, Homily 6; Irenaeus, *Against Heresies*, Books 2 and 5; Chrysostom, *Homilies on 1 Corinthians*, Homily 29; Justin Martyr, *First Apology*; Socrates Scholasticus, *Ecclesiastical History*, Book 1; Athanasius, *Defence Before Constantius*; Basil, Letter 188 (already cached). Footnote numbers in these files sometimes stand inside a sentence; a quotation was read by eye where the script could not match across one. Lactantius, *Divine Institutes* 6.20 was looked for and not found in the file, and is not used. Justin's *Dialogue with Trypho* 82 was opened and not used, because the sentence sits in an argument against the Jewish people.
- **Summa**: GITenberg, Project Gutenberg 18755, *Summa Theologica, Part II-II (Secunda Secundae)*, translated by the Fathers of the English Dominican Province; question 40, article 1.
- **Schleitheim**: OpenChristianData/open-christian-data, `data/doctrinal-documents/schleitheim-confession-1527.json` (its note: the Rod and Staff Publishers English text, adopted 24 February 1527, drafted by Michael Sattler). The site's own summary is `client/public/creeds/documents/schleitheim-confession-summary.json`.
- **Augsburg**: pmachapman/Confessions, `augsburg-confession.html`, Articles 12 and 16.
- **Trent 6**: BenjaminPoole/ecumenical-christian-library, `councils/trent-1545/session-vi.part-1.html` (the same nineteenth-century translation as before): chapters 12 to 15 and canons 14 to 24.
- **Creeds.json** (as before): Canons of Dort, First and Fifth Heads; Westminster Confession 1.1, 10.3, 10.4, 17.1, 17.3, 18.3, 18.4, 23.2.
- **PG**: 68320 (Wesley's *Works*, vol. 4, already cached), Sermon XLVIII, "Self-Denial". 23 (Douglass, *Narrative*, Appendix). 11449 = William Carey, *An Enquiry into the Obligations of Christians to Use Means for the Conversion of the Heathens* (Leicester, 1792), read in OpenChristianData/open-christian-data, `data/structured-text/carey-enquiry.json`, which gives the Gutenberg text as its source.
- **Repo**: the history course (`the-missionary-century`, `the-global-church`, `apostolic-and-persecuted`, `the-age-of-martyrs`, `councils-and-creeds`, `the-church-that-outlived-rome`, `the-long-middle`, `the-medieval-west`, `the-desert-and-the-rule`, `reformation-and-its-wars`, `the-constantinian-turn`, `after-christendom-era`, `the-attractional-era`); the Study Bible's notes on Hebrews 6 and 10, John 10, 15 and 16, 2 Peter 2 and 1 Corinthians 12; the Honest Answers "Can you lose your salvation?" and "What about those who never heard of Jesus?"; the /questions page `religions/those-who-never-heard`; the wisdom entry `terminal-diagnosis`.

Every Scripture quotation was compared with the ESV copy by the same script (`chk.mjs`); every other quotation was compared with the cached sources by a second script (`srcchk.mjs`) and the few it could not match across a footnote number were read by eye.

## 11. should-christians-ever-go-to-war

No present or recent war, state, party, policy or person is named. The people in the opening are types.

| Claim or quotation | Where read | Status |
|---|---|---|
| Tertullian, in Carthage, around 200: "But how will a Christian man war, nay, how will he serve even in peace, without a sword, which the Lord has taken away?" | WD, *On Idolatry*, ch. 19 | Verbatim. The next clause ("in disarming Peter, unbelted every soldier") is damaged in the file and is not quoted. The date and place are reference knowledge |
| Tertullian: "Shall it be held lawful to make an occupation of the sword, when the Lord proclaims that he who uses the sword shall perish by the sword?" | WD, *The Chaplet*, ch. 11 | Verbatim |
| Tertullian: "We sail with you, and fight with you, and till the ground with you" | WD, *The Apology*, ch. 42 (a footnote number stands after "fight with you") | Verbatim, read by eye |
| Part of his objection to the army was its idolatry | WD, *On Idolatry* 19 ("the divine and the human sacrament ... One soul cannot be due to two masters") | Paraphrase |
| Celsus urged Christians to fight for the emperor; Origen: "We do not indeed fight under him, although he require it; but we fight on his behalf"; "those who are fighting in a righteous cause" | WD, *Against Celsus* 8.73 (and 8.74, "if Celsus would have us to lead armies") | Verbatim; the first is split at its semicolon. Origen "of the third century": reference knowledge |
| Historians still dispute how far the early refusal was about bloodshed and how far about idolatry | Not opened this run | Reference knowledge |
| Martin, a soldier in Gaul, later bishop of Tours: "I am the soldier of Christ" and "it is not lawful for me to fight"; asked for discharge the day before a battle; offered to stand unarmed before the line | WD, Sulpicius Severus, *Life of St. Martin*, ch. 4 (the file has no stop between the two clauses, so they are quoted apart). Fourth century: the text sets it under "Julian Caesar"; the site's course has Martin in the 380s | Verbatim |
| Constantine won the West in 312 | Repo, history course | Site's own |
| Rome sacked in 410; Augustine bishop of Hippo in North Africa | Repo, `councils-and-creeds` | Site's own |
| Augustine to Boniface, 418: "Do not think that it is impossible for any one to please God while engaged in active military service."; "Peace should be the object of your desire; war should be waged only as a necessity"; Boniface fighting "the barbarians" | WD, Augustine, *Letters*, Letter CLXXXIX, headed "(A.D. 418.) TO BONIFACE", sections 4 to 6 | Verbatim |
| Augustine: "The real evils in war are love of violence, revengeful cruelty, fierce and implacable enmity, wild resistance, and the lust of power" | WD, *Reply to Faustus* 22.74 | Verbatim |
| Augustine: "As if he would not all the rather lament the necessity of just wars, if he remembers that he is a man" | WD, *The City of God* 19.7 | Verbatim |
| Aquinas: "In order for a war to be just, three things are necessary."; "the authority of the sovereign"; "a just cause"; "a rightful intention"; "declared by the legitimate authority, and for a just cause"; "through a wicked intention" | Summa, II-II q.40 a.1 | Verbatim. "Thirteenth century": reference knowledge |
| Later teachers added last resort, proportion and the protection of those not fighting | Not opened this run | Reference knowledge, paraphrase |
| The Lutheran confession of 1530: Christians may "engage in just wars" and "serve as soldiers"; "They condemn the Anabaptists who forbid these civil offices to Christians." | Augsburg, Article 16 | Verbatim. The year 1530 is reference knowledge |
| Anabaptists in Zurich from 1525; Schleitheim 1527, drafted around Michael Sattler, a former prior; Sattler tortured and burned within months; hunted for a century by Catholic and Protestant governments | Repo, `reformation-and-its-wars`; Schleitheim metadata (24 February 1527) | Site's own. "On the Swiss border" and "southern Germany": reference knowledge |
| "The sword is ordained of God outside the perfection of Christ. It punishes and puts to death the wicked, and guards and protects the good." | Schleitheim, Article VI | Verbatim (the translator is not named in the copy, so the essay names none) |
| Mennonites and Amish descend from them | Schleitheim metadata ("shaped Mennonite and Amish theology") | Verified |
| Urban II at Clermont in 1095, remission of penance, "God wills it"; Rhineland massacres at Worms and Mainz, 1096; Jerusalem 1099; Constantinople 1204 | Repo, `the-long-middle`, `the-medieval-west` | Site's own |
| Basil: killing in war not counted as murder by the fathers; soldiers "whose hands are not clean" to "abstain from communion for three years" | WD, Basil, Letter 188, canon XIII | Verbatim. "Seven centuries before Urban" rests on the 370s date the second run's ledger gives |
| Scripture (ESV): Matthew 5:9, 5:38-39, 5:44-45, 26:52; Luke 3:14, 7:9, 22:51; John 18:36 (first two sentences only); Romans 12:19, 13:4; Acts 10:2; Revelation 5:5, 5:6, 12:11, 19:13, 19:15; Isaiah 2:4 | ESV copy, by script | Words verified |

Cut or held back: Lactantius on killing (not found in the file); the Westminster Confession's sentence on war (opened in Creeds.json 23.2, cut for length); a sentence that soldiers were still given penance "a century before Urban" (not opened, cut); the claim that no Christian writer before Constantine approved of killing in war (too broad to source; the essay says only what Tertullian and Origen wrote); Maximilian the conscript, the *Apostolic Tradition* and the Council of Arles (none opened); Luther's and Calvin's own writings on soldiers; the Quakers and the Brethren (cut for length); "the greatest Christian city in the world" (an unsourced superlative); Boniface as the one who wrote first (the letter does not say so).

## 12. can-a-christian-lose-their-salvation

Agrees with the Honest Answer "Can you lose your salvation?" and with the Study Bible's notes on Hebrews 6 and 10, John 10 and 15 and 2 Peter 2; none is contradicted. No position is stated as the author's.

| Claim or quotation | Where read | Status |
|---|---|---|
| Care lines, reused whole: "If you are lying awake afraid you have fallen away, that fear is not usually the mark of someone who has. The settled apostate does not agonize." and "Don't settle your anxiety by picking the doctrine that soothes it. Go back to the one who said he would not let go." | Repo, `client/src/data/answers.ts`, "Can you lose your salvation?" | Reused whole, without quotation marks, as the site's own words |
| Care line, reused whole: "A person worried that they have committed such a sin shows, by that very concern, the tenderness toward God that the passage describes as absent." | Repo, Study Bible note on Hebrews 6 (hard question) | Reused whole |
| Hebrews written to a congregation under pressure, close to walking away; the warning concerns deliberate renunciation, not doubt or ordinary sin | Repo, notes on Hebrews 6 and 10 | Site's own |
| Decius, 250; thousands sacrificed; rigorists said never; Cyprian and the larger church: return through real repentance | Repo, `apostolic-and-persecuted`, `the-age-of-martyrs` | Site's own |
| Tertullian used Hebrews 6 against forgiving grave sin after baptism | Repo, note on Hebrews 6 | Site's own |
| Augustine in the 420s: perseverance is God's gift; some truly reborn do not receive it; "I think that equally with me you are ignorant why one man should receive this gift and another should not receive it" | WD, *Treatise on Rebuke and Grace* (ch. 11 heading, "They Who Have Not Received the Gift of Perseverance"; the quotation from ch. 17). The decade from the note on John 15 ("about 429" for *On the Gift of Perseverance*) | Verbatim; date reference knowledge |
| Trent, 1547: justification lost "not only by infidelity" but "by any other mortal sin whatever"; a chapter on "the fallen, and their restoration"; "let no one herein promise himself any thing as certain with an absolute certainty; though all ought to place and repose a most firm hope in God's help." | Trent 6, chapters 13, 14 (title) and 15; the year from the note on John 15 | Verbatim |
| Augsburg, 1530: condemns those "who deny that those once justified can lose the Holy Ghost" | Augsburg, Article 12 | Verbatim |
| Lutherans direct the troubled to the promise, baptism and the Supper and not to self-examination | Not opened this run | Reference knowledge, paraphrase. Check first |
| Dort, 1619: "is not only possible, but would undoubtedly happen"; "not in consequence of their own merits, or strength, but of God's free mercy"; believers can fall into grievous sin | Creeds.json, `canons_of_dort.json`, Fifth Head, arts. 4 and 8 | Verbatim |
| Westminster, 1646: "can neither totally nor finally fall away from the state of grace"; believers may "fall into grievous sins"; assurance "shaken, diminished, and intermitted" | Creeds.json, WCF 17.1, 17.3, 18.4; the year as the note on John 10 gives it | Verbatim |
| The Reformed read Hebrews 6 of people with every outward gift who were never reborn | Repo, note on Hebrews 6 | Site's own |
| The Remonstrants left the question open in 1610 and later held that a believer can fall; Wesley taught the same with a real assurance | Repo, note on John 10 | Site's own |
| Wesley: a man who "did receive the heavenly gift" and "made shipwreck of the faith" | PG 68320, Sermon XLVIII, "Self-Denial", II.5 (the first phrase is in the case Wesley states and then explains) | Verbatim |
| The warnings as God's means of keeping believers; the reading that they concern reward or discipline | Repo, notes on Hebrews 6 and John 15 (Schreiner and Caneday; the Free Grace reading) | Site's own; no names given in the essay |
| The question has divided churches since the fifth century | Repo, note on John 15 | Site's own |
| Scripture (ESV): John 6:37, 6:39, 10:27-29, 15:2, 15:6; Romans 8:30, 8:39; Philippians 1:6, 2:12-13; Hebrews 6:4-6, 6:9 (to the comma before the dash), 6:19, 10:26, 10:29; 2 Peter 2:20-21; Colossians 1:23; Jude 21, 24; 1 John 2:19, 3:20; Luke 15:20, 22:31-32; Mark 9:24; Matthew 12:20; 1 Corinthians 10:12 | ESV copy, by script | Words verified |

Cut or held back: any sentence of Arminius, the Remonstrance or Luther in quotation marks (none opened); Novatian's name; Wesley's *Serious Thoughts upon the Perseverance of the Saints* (not found); 2 Timothy 2:13 (the ESV sets a dash in it).

## 13. do-the-gifts-of-the-spirit-still-happen

Agrees with the Study Bible's note on 1 Corinthians 12 (three positions and an open-but-cautious fourth) and with the note on John 16 (Montanus). No position is stated as the author's.

| Claim or quotation | Where read | Status |
|---|---|---|
| Care wording, quoted whole: "None of these readings sets prayer against medical care, and none makes an unhealed believer guilty of too little faith. Paul prayed three times and was not healed, and no one in Scripture blames him." | Repo, `client/public/wisdom/entry/terminal-diagnosis.json` | Quoted whole, as the site's own |
| The Greek of 1 Corinthians 12:30 expects the answer no | Not opened this run | Reference knowledge |
| Irenaeus, bishop in Gaul, late second century: "we do also hear many brethren in the Church, who possess prophetic gifts, and who through the Spirit speak all kinds of languages"; "see visions, and utter prophetic expressions"; "Others still, heal the sick by laying their hands upon them, and they are made whole." | WD, *Against Heresies* 5.6.1 and 2.32.4 (a footnote number stands after "hear") | Verbatim. "Around 180" and Gaul are reference knowledge |
| Montanus and two prophetesses in Asia Minor (Phrygia) announced a New Prophecy; the wider church rejected it | Repo, note on John 16 | Site's own |
| Chrysostom: "This whole place is very obscure"; "our ignorance of the facts referred to and by their cessation, being such as then used to occur but now no longer take place" | WD, *Homilies on 1 Corinthians*, Homily 29 | Verbatim. "At Antioch": reference knowledge |
| Augustine: the tongues "were signs adapted to the time"; the sign "passed away" | WD, *Homilies on 1 John* 6.10 | Verbatim |
| Augustine: "even now miracles are wrought in the name of Christ"; they are scarcely known where they happen | WD, *The City of God* 22.8 | Verbatim; the second is paraphrase |
| The Reformers answered Rome's appeal to miracles and the radicals' revelations with the completeness of Scripture | Not opened this run | Reference knowledge, paraphrase |
| Westminster, 1646: "wholly unto writing"; "those former ways of God's revealing his will unto his people being now ceased" | Creeds.json, WCF 1.1 | Verbatim |
| B. B. Warfield of Princeton, 1918: miracles as the apostles' credentials, ending with those on whom they laid hands | Not opened this run (*Counterfeit Miracles*) | Reference knowledge, paraphrase. Check first |
| Azusa Street, April 1906; William Seymour, blind in one eye, son of freed slaves; a former stable; newspapers mocked; Black, white and immigrant believers together; over half a billion by common estimates | Repo, `the-global-church` | Site's own |
| The same experiences in the older churches, Catholic and Protestant, from the 1960s | Not opened this run | Reference knowledge |
| Classical Pentecostal teaching: a baptism in the Spirit distinct from conversion, with tongues as its first sign; charismatics usually do not insist on the sign | The note on 1 Corinthians 12 names the question; the detail not opened | Reference knowledge, paraphrase |
| The prosperity teaching grew from the healing revivals joined to the creed of upward mobility; giving in order to get | Repo, `the-attractional-era` (which also names New Thought; the essay does not) | Site's own |
| Corinth: parties, lawsuits, drunkenness at the table | 1 Corinthians 1, 6 and 11 (paraphrase) | Scripture |
| Scripture (ESV): 1 Corinthians 1:7, 12:3, 12:7, 12:9-11, 12:30, 13:1, 13:2, 13:8-10, 13:12, 14:1, 14:18-19, 14:29, 14:39-40; Acts 2:4, 2:6, 2:17; Hebrews 1:2, 2:3-4; Ephesians 2:20; 1 Thessalonians 5:19-21; 2 Corinthians 12:9; 1 Timothy 5:23; 2 Timothy 4:20; James 5:14; 1 John 4:1; Romans 8:9 | ESV copy, by script | Words verified |

Cut or held back: Justin's "the prophetical gifts remain with us" (see above); Charles Parham and Topeka; the Assemblies of God statement; any living teacher's name; the book title in the course's account of the prosperity teaching.

## 14. what-happens-to-people-who-never-hear-the-gospel

Agrees with the /questions page "What about the people who never heard of Jesus?" and the Honest Answer of the same name; links the first and does not repeat it. Nothing is said about any person's fate.

| Claim or quotation | Where read | Status |
|---|---|---|
| Grief line, reused whole: "No page, preacher or tradition knows another person's heart at the end, and this one will not guess. Judgment belongs to Christ, who wept at a friend's grave." | Repo, `client/public/questions/religions/those-who-never-heard.json` | Reused whole |
| Justin, mid second century, to the emperor: the objection that those born before Christ were not answerable; "those who lived reasonably are Christians, even though they have been thought atheists; as, among the Greeks, Socrates and Heraclitus, and men like them" | WD, *First Apology*, ch. 46 (the text itself says Christ was born "one hundred and fifty years ago"; a footnote number stands after "reasonably") | Verbatim, read by eye |
| Westminster, 1646: "not professing the Christian religion"; "be saved in any other way whatsoever, be they never so diligent to frame their lives according to the light of nature"; "all other elect persons who are incapable of being outwardly called by the ministry of the Word"; "who worketh when, and where, and how he pleaseth" | Creeds.json, WCF 10.4 and 10.3 | Verbatim |
| The four answers and their hardest questions; Origen and Gregory of Nyssa; councils and confessions have generally not received the fourth | Repo, the /questions page | Site's own |
| Annie Dillard's story of the hunter and the priest | Repo, the Honest Answer (which cites *Pilgrim at Tinker Creek*, 1974); the book itself not opened | Site's own, as paraphrase |
| Carey a shoemaker and village pastor; the older minister's reply, "as the story has come down"; sailed 1793 and never came home | Repo, `the-missionary-century` | Site's own |
| Carey, 1792: "they appear to be as capable of knowledge as we are"; "the accursed Slave-Trade"; "the barbarous Germans and Gauls, and still more barbarous Britons" | PG 11449 (carey-enquiry.json); section numbers not noted | Verbatim (the last stops before his exclamation mark) |
| The Opium War treaties wrote toleration of missions into the settlement; missionaries shared the era's contempt | Repo, `the-missionary-century` | Site's own |
| Abraham asks six times | Genesis 18:24-32 | Scripture |
| Scripture (ESV): John 10:16, 14:5, 14:6; Acts 4:12, 10:2, 10:35, 11:14, 17:22-23, 17:26-27, 17:30; Romans 1:20, 1:21, 2:12, 2:15-16, 3:23, 9:2, 10:13-14, 15:20, 15:21; Matthew 28:19; Revelation 5:9; Jonah 4:11; Luke 12:48; 1 Timothy 2:4, 2:5; Deuteronomy 29:29; Genesis 18:25 (the last sentence only) | ESV copy, by script | Words verified |

Cut or held back: *Lumen Gentium* (the page gives it; cut for length); Hick, Himma, Craig and every modern name but Dillard's; Zwingli on Socrates; any count of the unreached.

## 15. christianity-was-never-western ("Is Christianity a White Man's Religion?")

Landed in the shelf's own pending slot of that title, which had no rewrite; the line now reads "live". The earlier essay `what-the-church-got-wrong-about-race` is linked and not repeated. No movement, party or slogan is named; the title's phrase is the shelf's.

| Claim or quotation | Where read | Status |
|---|---|---|
| Crowther: freed slave, led the Yoruba translation, first African Anglican bishop (1864), undone by younger Englishmen in the 1880s, white successor; "Africans could be converts but never leaders" | Repo, `the-missionary-century` | Site's own (the last as paraphrase) |
| Douglass, 1845: "We have men-stealers for ministers, women-whippers for missionaries, and cradle-plunderers for church members."; "I love the pure, peaceable, and impartial Christianity of Christ: I therefore hate the corrupt, slaveholding, women-whipping, cradle-plundering, partial and hypocritical Christianity of this land." | PG 23, Appendix | Verbatim |
| Cyrene a city of North Africa (Libya) | Acts 2:10 | Scripture |
| The Ethiopian's kingdom lay on the Nile south of Egypt | Not opened this run | Reference knowledge |
| "Niger" is the Latin word for black | Not opened this run | Reference knowledge |
| Tertullian the first great Christian writer in Latin; Carthage in what is now Tunisia | Not opened this run | Reference knowledge |
| Perpetua, Carthage, 203; Cyprian beheaded 258; Antony about 270 and the monastic movement; monks copied Scripture | Repo, `apostolic-and-persecuted`, `the-age-of-martyrs`, `the-desert-and-the-rule`, `the-long-middle` | Site's own |
| Athanasius bishop of Alexandria from 328, exiled five times | Repo, `councils-and-creeds` | Site's own |
| Augustine born in North Africa, bishop of an African port, died there | Repo, `councils-and-creeds` (the port); birth and death not opened | Partly reference knowledge |
| "for centuries the theological engine room of the whole church" | Repo, `after-christendom-era` | Verbatim, the site's own |
| Frumentius: captive, manager of the kingdom, gathered Christians; Athanasius "requested Frumentius himself to accept the bishopric" | WD, Socrates, *Ecclesiastical History* 1.19 (Socrates, following Rufinus, calls the country India; the fifth-century date is reference knowledge) | Verbatim |
| Constantius's letter to "Aezanes and Sazanes" demanding "Frumentius, Bishop of Auxumis" | WD, Athanasius, *Defence Before Constantius* 29 and 31, headed "Letter of Constantius to the Ethiopians" (a footnote number stands after "Frumentius") | Verbatim, read by eye. "Middle of the fourth century": reference knowledge |
| The churches of Ethiopia, Egypt and the Thomas Christians of India are ancient and continuing | Repo, `the-missionary-century` | Site's own |
| Syriac is a form of Aramaic | Repo, `after-christendom-era` ("prayed in Aramaic and Greek and Syriac"); the relation not opened | Reference knowledge |
| Patrick, mid fifth century; the Frankish king baptized about 496; the English mission of 597 and the slave-market story; Boniface in the eighth century | Repo, `the-church-that-outlived-rome`, `the-long-middle` | Site's own |
| Carey: "the barbarous Germans and Gauls, and still more barbarous Britons" | PG 11449 | Verbatim |
| From the seventh century Syria, Egypt and North Africa came under Muslim rule and their churches shrank; by 1500 the largest body of Christians was in Europe | Repo, `after-christendom-era` (North Africa a remnant for more than a thousand years); the rest not opened | Reference knowledge. Check first |
| "moved on imperial rails"; some missionaries fought the empire's crimes and some approved them; local believers did most of the preaching: "They were the engine." | Repo, `the-missionary-century` | Verbatim, the site's own |
| About ten million African Christians in 1900, more than three hundred million by the century's end; the balance tipped around 1980; African pastors in Europe's capitals; the southern churches not a finished thing | Repo, `the-global-church` (its "standard estimates") | Site's own; no other figure is given |
| The enslaved heard the Exodus as their own story | Repo, the essay `what-the-church-got-wrong-about-race` | Site's own |
| Scripture (ESV): Matthew 2:14-15; Mark 15:21; Acts 2:9-11, 8:27, 8:39, 11:20, 11:26, 13:1, 15:19, 16:9, 17:26; Galatians 2:11; Colossians 3:11; Revelation 7:9, 21:24, 21:26; Psalm 68:31 | ESV copy, by script | Words verified |

Cut or held back: any modern voice of the charge by name (none could be opened); the secret night meetings of the enslaved (not on the site, not opened); Armenia, Nubia and the Church of the East in China (not opened); any claim about the appearance of Augustine or Athanasius; Jenkins's and Walls's names; a line that placed the author among "those of us descended from the barbarians of the north" (it would have given him a biography).

---

# Fourth run (2026-11-21)

Five more essays. What the run could reach was the same as before: this repository and public GitHub repositories (raw files, and GitHub's repository search to find them). No web search, no library. The sources opened in this run, beyond those listed above, are named at the head of each essay's section. Every Scripture quotation was compared with the ESV copy by the same script (`chk.mjs`); every other quotation was compared with its source by the second script (`srcchk.mjs`), and where a footnote number or a line break stands inside a sentence it was read by eye.

## 16. is-christianity-good-for-women

Agrees with the live /questions page "Is Christianity bad for women?" (`client/public/questions/morality/is-christianity-bad-for-women.json`), which states the author's position; the essay links that page and neither restates nor alters the position. It also agrees with the page on abortion and exposure, the page on abuse and cover-up, the Study Bible's notes on Ephesians 5, 1 Timothy 2, Romans 16, Deuteronomy 22, Judges 19 and Luke 8, and the earlier essay `should-women-preach`. The four people in the opening are types. New source opened: **Summa I** = GITenberg, Project Gutenberg 17611, *Summa Theologica, Part I (Prima Pars)*, translated by the Fathers of the English Dominican Province.

| Claim or quotation | Where read | Status |
|---|---|---|
| Care line, reused whole: "If you are being hurt, by a husband, in a church or anywhere else, it is not what God asks you to bear. Tell someone you trust today; the Find Help page (/help) lists places to turn." | Repo, the /questions page on women, last section | Reused whole, without quotation marks, as the site's own words; the path "/help" is made a working link and no word is changed |
| Care lines, quoted whole: "Nothing here licenses harshness or abuse. ... reported to the police and the proper authorities." and "If you are being hurt in some other place, at home, at work or in a church, the same is true. Tell someone you trust and get help. The Find Help page on this site lists places to turn." | Repo, the Study Bible's plain notes on 1 Peter 3 (`client/public/bible/notes/1-peter/plain/3.json`; the first passage also in the plain notes on Titus 2), as the /questions page quotes them | Quoted whole |
| Stanton, 1895, introduction to *The Woman's Bible*: "they were referred to the Bible for an answer."; "The Bible teaches that woman brought sin and death into the world, that she precipitated the fall of the race, that she was arraigned before the judgment seat of Heaven, tried, condemned and sentenced." | Repo, the /questions page (ledgered in `apol-ledger.md`, twenty-fifth run); the book itself not opened this run | Site's own, verbatim from the page |
| Tertullian, North Africa, around 200: "You are the devil's gateway." | Repo, the /questions page; the first run's ledger read it in WD, *On the Apparel of Women* 1.1 | Site's own; verified in an earlier run |
| Chrysostom taught from 1 Timothy 2:14 that women are more easily deceived, and the reading held for much of church history | Repo, the Study Bible note on 1 Timothy 2 (his ninth homily on the letter); the homily not opened | Site's own, paraphrase |
| Aquinas, thirteenth century, following Aristotle: "as regards the individual nature, woman is defective and misbegotten."; in nature's wider intention she is no mistake; he names Aristotle as his source | Summa I, question 92, article 1, reply to objection 1 ("as the Philosopher observes") | Verbatim, opened this run |
| Exodus 20:17 lists a neighbor's wife with his house, servants and ox; Deuteronomy 22:28-29 | ESV copy | Words verified |
| The Deuteronomy law bound the man for life and forbade divorce; Exodus 22:16-17 lets the father refuse; the notes call it difficult | Repo, the Study Bible note on Deuteronomy 22 (hard question). The note also records that scholars dispute the verb; the essay quotes the ESV's "seizes" and does not settle it | Site's own |
| Hilarion's letter to Alis, dated 1 BC: "if you bear a child and it is male, let it be; if it is female, cast it out."; he tells her not to worry and asks how he could forget her | Repo, the /questions pages on women and on exposure | Site's own, verbatim from the page; the papyrus not opened |
| Celsus: Christians win over only "the silly, and the mean, and the stupid, with women and children."; Origen replied that the gospel invites such people and others as well | Repo, `scripts/data/history-sources/texts/origen-against-celsus-3.html`, chapters 44 and 49 | Verbatim; "second century" is reference knowledge |
| Jesus was a Jewish teacher; Deborah and Huldah; the essay does not set him against Judaism | Repo, the note on Luke 8 (which records the caution against that misreading); Judges 4, 2 Kings 22 | Site's own |
| Sitting at a teacher's feet was a student's place; a woman's word counted for little as testimony | Repo, the /questions page on women | Site's own |
| Romans 16 names at least ten women; "servant" is the word used for the office of deacon; Prisca named first; Junia's phrase disputed | Repo, the Study Bible note on Romans 16 and the /questions page | Site's own |
| *Didache*: "thou shalt not murder a child by abortion nor kill that which is begotten."; Justin, 150s: Christians "have been taught that to expose newly-born children is the part of wicked men." | Repo, the /questions page on exposure (both); the second run read the Didache in WD | Site's own, verbatim from the page |
| Christians took in the infants Rome left exposed | Repo, history course `the-age-of-martyrs` | Site's own |
| A bishop of Rome listed "over fifteen hundred widows and persons in distress." | Repo, `scripts/data/history-sources/texts/eusebius-church-history-6.html`, 6.43.11 (Cornelius's letter, McGiffert's translation). "Two centuries later" rests on the usual date of about 251, not opened | Verbatim; date reference knowledge |
| A widow without family could be left destitute; the Jerusalem distribution | Repo, the Study Bible note on 1 Timothy 5; Acts 6:1 | Site's own |
| Blandina, Lyons, 177; Perpetua, Carthage, 203, and her diary; Macrina and her brother's calling her his teacher | Repo, `the-age-of-martyrs`, `apostolic-and-persecuted`, `the-fathers-at-work` | Site's own |
| "The room women had been given narrowed"; their names had to be recovered | The live essay `women-in-church-history` for the second; the first not opened this run | Reference knowledge, stated generally. Check first |
| A missionary in India campaigned against the burning of widows, outlawed in 1829; Pandita Ramabai rescued widows and famine orphans and translated Scripture into Marathi | Repo, `the-missionary-century` (William Carey; the essay does not name him) | Site's own |
| The two readings: "hold that God created men and women equal in dignity and worth but with different roles."; "hold that men and women are equal in dignity and in role."; "a second-order question: it divides faithful churches but not the faith." | Repo, the Study Bible notes on Ephesians 5 and 1 Timothy 2, as the /questions page quotes them | Verbatim, the site's own |
| Church leaders knew of abuse and protected their institutions | Repo, `client/public/questions/morality/abuse-and-cover-up.json` | Site's own |
| Judges 19: the woman is never named and never speaks; the narrator offers no comment | Repo, the Study Bible note on Judges 19 | Site's own |
| Scripture (ESV): Exodus 20:17 (cited); Deuteronomy 22:28-29; Ephesians 5:21, 5:22, 5:25; 1 Corinthians 7:4, 14:34; 1 Timothy 2:12-14; Luke 7:44, 8:3, 10:39, 10:42, 13:16, 24:11; John 4:27; Matthew 5:28, 20:26; Mark 14:9, 15:40; Romans 16:1-2, 16:6; Galatians 3:28; James 1:27; Acts 6:1 (cited); Judges 19:30; Genesis 1:27 | ESV copy, by script | Words verified |

Cut or held back: John 20:18 in quotation (the ESV sets a dash in it); a sentence that the Old Testament never calls a woman a daughter of Abraham (not checked, cut); "the most admired preacher of the fourth century" and "the sharpest pagan opponent" (unsourced superlatives); a sentence that most exposed infants were girls (not opened); the sentence about women missionaries sent abroad by churches that limited them at home (reference knowledge in the first run, cut here); Ramabai called a convert (the course does not say so); Jerome's letters to Paula and Marcella, the deaconesses' later history, the witch trials and the law of coverture (none opened); any modern scholar's name; the Danvers Statement and Christians for Biblical Equality (on the linked page, not repeated).

## 17. what-is-the-lords-supper

The companion to `babies-or-believers-why-christians-baptize-differently`. No side is taken and nothing in the essay says what the author's church practices or who it admits to the table. It agrees with the site's study of the sacraments (`client/public/theology/sacraments.json`), with the Study Bible's notes on John 6 and 1 Corinthians 11, and with the history course on Marburg; the study's own first-person conclusion is neither quoted nor linked. The people in the opening are types. New sources opened:

- **Trent 13 and 22**: BenjaminPoole/ecumenical-christian-library, `councils/trent-1545/session-xiii.part-1.html`, `session-xiii.html`, `session-xxii.html` and `session-xxii.part-1.html` (the same nineteenth-century translation as before, "adapted from Hanover Historical Texts"). The files give the sessions' dates: 11 October 1551 and 17 September 1562.
- **Small Catechism**: pmachapman/Confessions, `luthers-small-catechism.html`, whose note says "This translation is by the Evangelical Lutheran Church of England (2016)", distributed under a Creative Commons licence. Two short sentences are quoted.
- **Articles**: pmachapman/Confessions, `thirty-nine-articles.html`, Article 28. **Augsburg**: the same repository's `augsburg-confession.html`, Article 10 (already cached).
- **WD**: John of Damascus, *An Exact Exposition of the Orthodox Faith*, Book 4 (ch. 13 in the NPNF text; the repository's metadata dates him to 749); Ignatius, *Epistle to the Smyrnaeans*, ch. 7; the Didache, chs. 9 and 14; Justin, *First Apology*, ch. 66 (the last two already cached).
- **Creeds.json**: Westminster Confession 29; Heidelberg Catechism 75 to 81; Belgic Confession 35 (read, not quoted); Zwingli's 67 Articles (metadata year 1523), Article 18; Zwingli's *Fidei Ratio* (read, not quoted: the copy is a sixteenth-century English version in old spelling); the Abstract of Principles (metadata year 1858), Articles 15 and 16; the London Baptist confession (metadata year 1677), 30.7 and 30.8.

| Claim or quotation | Where read | Status |
|---|---|---|
| Outsiders assembled reports of the meal into a rumor of cannibalism | Repo, history course `apostolic-and-persecuted` | Site's own |
| The Passover as the setting; "a memorial day", "throughout your generations" | ESV copy, Exodus 12:14; Luke 22:15 | Words verified |
| Didache, usually dated around 100: "Even as this broken bread was scattered over the hills, and was gathered together and became one, so let Thy Church be gathered together from the ends of the earth into Thy kingdom." | WD, Didache 9.4 (footnote numbers stand after "hills" and "kingdom") | Verbatim, read by eye. Date as the second run's ledger has it |
| Ignatius, around 110, on his way to be killed in Rome: they stay away "because they confess not the Eucharist to be the flesh of our Saviour Jesus Christ." | WD, *Smyrnaeans* 7; the date and journey from the course (`apostolic-and-persecuted`, `the-apostolic-age`) | Verbatim. That his opponents denied Christ a real body is reference knowledge, consistent with chs. 2 to 5 of the letter (not quoted) |
| Justin, around 150: "For not as common bread and common drink do we receive these."; three conditions, the third "is so living as Christ has enjoined." | WD, *First Apology* 66 | Verbatim |
| For centuries the church issued no definition of how Christ is present | Repo, `sacraments.json` (the name given in 1215, the definition in 1551); earlier disputes not opened | Site's own, stated generally |
| Trent, 1551: "our Lord Jesus Christ, true God and man, is truly, really, and substantially contained under the species of those sensible things."; "a conversion is made of the whole substance of the bread into the substance of the body of Christ our Lord"; "suitably and properly" called transubstantiation | Trent 13, chapters 1 and 4 | Verbatim |
| The word in official use since a council of 1215 | Repo, `sacraments.json` (Fourth Lateran Council) | Site's own |
| Trent, 1562: "the victim is one and the same," ... "the manner alone of offering being different."; the mass a true sacrifice, not a second one | Trent 22, chapter 2 (the sentence is quoted in two parts, with "the same now offering by the ministry of priests, who then offered Himself on the cross" left out between them); the course `the-counter-reformation` | Verbatim |
| John of Damascus, eighth century: "the bread itself and the wine are changed into God's body and blood."; "But if you enquire how this happens, it is enough for you to learn that it was through the Holy Spirit."; the manner "cannot be searched out." | WD, *Exposition* 4.13 (the second sentence continues after a comma in the source) | Verbatim |
| The Orthodox still honor his summary; they call the meal the holy mysteries; many of their teachers regard the Western definitions as answering a question never asked | Not opened this run | Reference knowledge, paraphrase. Check first: some later Orthodox statements do use the Western term |
| Luther's *Small Catechism*, 1529: "It is the true body and blood of our Lord Jesus Christ, under the bread and wine, for us Christians to eat and to drink, instituted by Christ Himself."; "the words 'For you' require nothing but believing hearts." | Small Catechism, "The Sacrament of the Altar". The year 1529 is reference knowledge | Verbatim (a 2016 translation) |
| The Lutheran confession of 1530: the body and blood "are truly present, and are distributed to those who eat." | Augsburg, Article 10 | Verbatim |
| If the presence depended on the believer's faith the meal would be emptiest when most needed | Repo, `sacraments.json`, the Lutheran account | Site's own, paraphrase |
| Westminster, 1646: "do then also inwardly by faith, really and indeed, yet not carnally and corporally, but spiritually, receive and feed upon Christ crucified." | Creeds.json, WCF 29.7 | Verbatim |
| Heidelberg, 1563: "so surely does He Himself nourish and refresh my soul to everlasting life with His crucified body and shed blood." | Creeds.json, Heidelberg 75 (a modern English version) | Verbatim |
| The Church of England's Articles: "only after an heavenly and spiritual manner." | Articles, Article 28 | Verbatim |
| The Reformed conviction about Christ's ascended body | Creeds.json, Heidelberg 76 and 80 ("with His true body is now in heaven") | Paraphrase |
| Zwingli, 1523: the mass "is not a sacrifice, but is a remembrance of the sacrifice and assurance of the salvation which Christ has given us." | Creeds.json, 67 Articles, Article 18 | Verbatim |
| A Baptist confession of 1858: the Supper "is in no sense a sacrifice, but is designed to commemorate His death, to confirm the faith and other graces of Christians, and to be a bond, pledge and renewal of their communion with Him, and of their church fellowship."; baptism "is prerequisite to church fellowship, and to participation in the Lord's Supper," | Creeds.json, Abstract of Principles 16 and 15. The essay does not name the document or the body it belongs to | Verbatim |
| "the weight a wedding ring carries, which is not nothing."; the refusal of the word mere; the Passover as memorial | Repo, `sacraments.json`, the memorial account | Verbatim, the site's own |
| The Baptist confession written in London in 1677: "spiritually receive, and feed upon Christ crucified," in words close to Westminster's | Creeds.json, `london_baptist_1689.json` 30.7, beside WCF 29.7 | Verbatim |
| The hard question for each view | Repo, `sacraments.json` (its evidence table and each account's own admissions); the Aristotle point and the question put to the Orthodox are reference knowledge | Site's own / reference knowledge |
| Marburg, October 1529, a castle, arranged by the Protestant princes; fourteen of fifteen articles; the chalk story "as the story has come down"; Zwingli pressed John 6:63 | Repo, `sacraments.json`, `reformation-and-its-wars`, the Study Bible note on John 6 | Site's own |
| "the skill it has practiced ever since: dividing over real differences among those who agree on almost everything, and calling the division faithfulness." | Repo, `reformation-and-its-wars` | Verbatim, the site's own |
| Didache: "let no one eat or drink of your Thanksgiving (Eucharist), but they who have been baptized into the name of the Lord." | WD, Didache 9.5 | Verbatim |
| Corinth met in homes; the wealthy ate while the poor went without; two readings of "the body" | Repo, the Study Bible note on 1 Corinthians 11; `sacraments.json` | Site's own |
| Trent: no one "conscious to himself of mortal sin" is to come without confession | Trent 13, chapter 7 | Verbatim |
| The Orthodox commune the Orthodox; both Rome and the East hold that sharing the meal declares full unity of faith; other churches invite all the baptized or all who trust Christ | Not opened this run; `sacraments.json` names open, close and closed communion without detail | Reference knowledge |
| Heidelberg: "who are truly displeased with themselves because of their sins and yet trust that these are forgiven them." | Creeds.json, Heidelberg 81 | Verbatim |
| In the century after Marburg Christians burned, drowned and made war on one another, and the meaning of the meal was among the questions a person could be condemned for | Repo, `the-reformation`, `reformation-and-its-wars` for the killing; that the Supper was among the charges is not on the site and was not opened | Site's own / reference knowledge. Check first |
| Many congregations keep the meal occasionally and in haste | Repo, `sacraments.json` ("rushed, occasional, an appendix to the sermon") | Site's own |
| The creeds say nothing on how Christ is present | Creeds.json, Apostles' and Nicene Creeds | Verified |
| Judas had already agreed; Peter would deny; the rest would run | Luke 22:3-6, 22:34; Mark 14:50 (paraphrase) | Scripture |
| Scripture (ESV): Exodus 12:14; Luke 22:15, 22:19, 22:21; Matthew 26:26-28, 26:29; 1 Corinthians 10:16, 10:17, 11:20, 11:21, 11:26, 11:27, 11:28-29; John 6:54, 6:63 | ESV copy, by script | Words verified |

Cut or held back: the sentence that Luther and Zwingli parted without sharing the bread (not opened); "a year before that night" for John 6 (changed to "well before"); "for a thousand years ... every Lord's Day" (too broad); Revelation 19:9 and Luke 24:30 (each has the word the forbidden list names, though in Scripture); John of Damascus's sentence that the bread is no mere figure (it carries an exclamation); the ninth- and eleventh-century disputes, the Confession of Dositheus, the Formula of Concord, Calvin's *Institutes* and the Marburg Articles themselves (none opened); the word "consubstantiation" (Lutherans generally refuse it; not opened); John Bunyan and the open-communion Baptists by name; the practice of communing infants in the East; any modern writer the site's study names.

## 18. is-the-bible-reliable-enough-to-build-a-life-on

The shelf already holds two public essays on neighboring ground, `why-trust-the-bible` ("Can You Trust the Bible?") and `who-decided-what-books-are-in-the-bible`; neither title matches this one, so it has a new line and links both. Its own ground is the difference between a reliable text and a true one. Every figure and date is taken from the live /questions pages named below and none is added; no living scholar is named, though those pages name several. Archaeology is given the limit the site's page gives it. No position on inerrancy is stated as the author's. The three people in the opening are types. New sources opened:

- **Paine**: GITenberg, Project Gutenberg 3743, *The Writings of Thomas Paine, Volume 4 (1794-1796): The Age of Reason*, edited by Moncure Conway; the passage stands in Part I.
- **WD**: Origen, *Against Celsus*, Book 2, ch. 27.
- **Creeds.json**: Westminster Confession 1.5; the Chicago Statement on Biblical Inerrancy (metadata year 1978), Articles 10 and 12.

| Claim or quotation | Where read | Status |
|---|---|---|
| No originals survive; the earliest pieces are fragments of disputed date; the oldest complete New Testament is fourth-century; differences in the hundreds of thousands against about 138,000 Greek words | Repo, /questions pages `text/copies-of-copies`, `text/more-variants-than-words` | Site's own |
| The woman caught in adultery and Mark 16:9-20 are missing from the oldest complete manuscripts, bracketed or noted in modern Bibles, and thought by most scholars not to be original | Repo, `text/passages-not-in-the-earliest-bibles` | Site's own |
| Celsus, second century: some Christians "have corrupted the Gospel from its original integrity, to a threefold, and fourfold, and many-fold degree, and have remodelled it, so that they might be able to answer objections."; Origen knew of none who had altered it but the followers of three teachers, Marcion first | WD, *Against Celsus* 2.27 (Origen reports the charge in indirect speech; he names Marcion, Valentinus and Lucian) | Verbatim |
| Mark around 70, Matthew and Luke about 75 to 95, John in the 90s, forty to sixty-five years after the crucifixion; none names its author in its text; the titles not the authors' own | Repo, `authors/written-decades-later`, `authors/the-gospels-are-anonymous` | Site's own |
| Judas in Matthew and in Acts; the common harmonization adds what neither says | Repo, `contradictions/how-did-judas-die` | Site's own |
| Quirinius: Josephus puts the census about ten years after Herod's death; Luke "he may have" gotten it wrong; no solution has general agreement | Repo, `contradictions/the-census-of-quirinius` ("On the evidence historians can weigh, he may have, and an honest answer has to say so") | Site's own; two words quoted |
| The Synoptics and John appear to differ on the day of the crucifixion; more than one solution is held | Repo, `contradictions/the-day-of-the-crucifixion` | Site's own |
| Paine, 1790s: "added, altered, abridged, or dressed them up,"; "they decided by vote which of the books out of the collection they had made, should be the WORD OF GOD, and which should not." | Paine, *The Age of Reason*, Part I (capitals as printed) | Verbatim. The essay says "in the 1790s"; the volume's title gives 1794 to 1796 |
| No single act closed the canon; the three traditions' Old Testaments differ | Repo, `authors/did-constantine-decide-the-bible` | Site's own |
| The comparison with other ancient books has been made with stale figures and uneven counts | Repo, `text/compared-with-other-ancient-books` | Site's own |
| Written, branched copying in Egypt, Syria and Italy by the late second century; old copies kept; Irenaeus around 180 on 616 and 666 | Repo, `text/copies-of-copies` | Site's own |
| The first six books of Tacitus's *Annals* survive in one medieval manuscript | Repo, `text/more-variants-than-words`, `text/compared-with-other-ancient-books` | Site's own |
| Most variants are spelling, word order and slips; the doubtful and meaningful ones are a small share, known and marked | Repo, `text/more-variants-than-words` (the page gives a living scholar's estimate of under one percent; the essay gives no figure and no name) | Site's own |
| The wording can be known about as well as any ancient text's and better than most; editions by different teams agree on the bulk | Repo, `text/compared-with-other-ancient-books`, `text/who-decides-what-the-text-says` | Site's own |
| The first decades of copying are not visible; no method could detect a change made to every copy before the earliest survivor; known additions did not reach every branch | Repo, `text/passages-not-in-the-earliest-bibles` (the reply section), `text/copies-of-copies` | Site's own |
| A well-attested text of Homer | Repo, `text/compared-with-other-ancient-books` (about 1,750 manuscripts of the *Iliad*; no figure given in the essay) | Site's own |
| Paul's letters from the 50s; the summary in 1 Corinthians 15 thought by most scholars to have formed within a few years | Repo, `authors/written-decades-later` | Site's own |
| The Gospels as ancient biographies, free in arrangement and in the wording of speeches | Repo, `authors/what-kind-of-writing-are-the-gospels` | Site's own |
| Accounts of Alexander written four centuries later and used critically | Repo, `authors/written-decades-later` (Arrian) | Site's own |
| Nicaea in 325 did not rule on the books; Constantine's fifty copies named none; four Gospels and Paul read from Gaul to Egypt by the late second century; James, Jude, 2 Peter and 2 and 3 John still disputed in the 320s; the first exact list in a letter of 367 | Repo, `authors/did-constantine-decide-the-bible`, `authors/four-gospels-and-the-rest`, the essay `who-decided-what-books-are-in-the-bible` | Site's own |
| The churches judged books partly by agreement with the faith received | Repo, `authors/four-gospels-and-the-rest` | Site's own |
| Omri on the Moabite stone; the "house of David" at Tel Dan, 1993; Hezekiah in an Assyrian king's annals; agreement on main facts, difference in detail; earlier periods thin and argued; "Claims of proof and claims of disproof both say more than archaeology can." | Repo, `old-testament/what-archaeology-shows` | Site's own; the sentence verbatim |
| Westminster, 1646: "our full persuasion and assurance of the infallible truth, and divine authority thereof, is from the inward work of the Holy Spirit, bearing witness by and with the Word in our hearts."; the arguments it lists first | Creeds.json, WCF 1.5 | Verbatim; the list is paraphrase |
| A statement of 1978: "that Scripture in its entirety is inerrant, being free from all falsehood, fraud, or deceit,"; the original writings "can be ascertained from available manuscripts with great accuracy." | Creeds.json, Chicago Statement, Articles 12 and 10 | Verbatim |
| The second account: wholly trustworthy, cannot fail in what it was given to do; incidental details belong to the human languages and eras; the question is second-order and "very near the foundation" | Repo, `client/public/theology/inerrancy.json` (its second view and its triage note) | Site's own, paraphrase |
| What each side fears | Not opened this run | Reference knowledge, paraphrase |
| Scripture (ESV): 1 Corinthians 15:3-5, 15:6, 15:17; Luke 1:2-4; John 5:39-40, 6:68, 7:17; Matthew 7:24 | ESV copy, by script | Words verified |

Cut or held back: every living scholar's name; the under-one-percent estimate; P52, P66 and P75 and the 85 percent agreement with Vaticanus (on the linked pages; cut for length); Mark 2:26 and the story that opens `why-trust-the-bible` (it names a living person); "a claim that can't be shrunk into a legend" (an overclaim); "a far better text of Homer than they once did" (not opened); James 2:19 and John 19:35 (the ESV sets dashes in both); the Muratorian fragment and Athanasius by name (in the linked essay).

## 19. does-prayer-change-anything

No study of prayer is cited or alluded to. A GitHub repository search for the best-known ones found no copy of any paper that could be opened, so by the run's rule the subject is left out altogether. The essay never blames an unhealed person's faith and never sets prayer against medical care; the existing care wording is reused whole. No position on how God's sovereignty and real asking fit together is stated as the author's. It agrees with the Study Bible's notes on James 5, 2 Corinthians 12, Exodus 32 and 2 Kings 20, with the wisdom entry `terminal-diagnosis`, and with the site's study `client/public/theology/divine-foreknowledge.json`. The people in the opening are types. New sources opened:

- **Summa II-II** (already cached, PG 18755): question 83, article 2, "Whether It Is Becoming to Pray?"
- **Calvin**: GITenberg, Project Gutenberg 64392, *Institutes of the Christian Religion*, Vol. 2 of 2, translated by John Allen; Book 3, chapter 20, section 3.
- **Creeds.json**: Westminster Confession 5.3; Heidelberg Catechism 116; Westminster Shorter Catechism 98 (read, not quoted).

| Claim or quotation | Where read | Status |
|---|---|---|
| Care wording, quoted whole: "None of these readings sets prayer against medical care, and none makes an unhealed believer guilty of too little faith. Paul prayed three times and was not healed, and no one in Scripture blames him." | Repo, `client/public/wisdom/entry/terminal-diagnosis.json` (the same wording the third run reused) | Quoted whole |
| Care wording, quoted whole: "Anyone who is sick, in pain, or in despair should call on both the church and qualified medical help, and anyone thinking of harming themselves should reach out immediately to a trusted person or to emergency services." | Repo, the Study Bible note on James 5 (hard question) | Quoted whole |
| "What the passage does not teach is that illness that persists is a sign of weak faith or hidden sin."; oil was itself a medicine in James's day | Same note | Verbatim, the site's own |
| The replies "yes, no, or wait", "not enough faith", "not his will" | Common sayings, given as sayings without quotation marks | Not a quotation |
| Aquinas, thirteenth century, states the objection against himself: prayer seems meant to inform God, who knows; "God's mind is unchangeable and inflexible." | Summa II-II, q.83 a.2, objections 1 and 2 | Verbatim; the either-or that follows is the essay's own summary |
| Aquinas's answer: providence disposes effects and their causes; human acts among the causes; "For we pray not that we may change the Divine disposition, but that we may impetrate that which God has disposed to be fulfilled by our prayers." | Summa II-II, q.83 a.2, the answer (the sentence continues after a comma) | Verbatim. The farmer is the essay's illustration of his "natural causes", not his |
| Westminster: "God, in his ordinary providence, maketh use of means." | Creeds.json, WCF 5.3 (the sentence continues) | Verbatim |
| Calvin: God "has appointed it not so much for his own sake as for ours" | Calvin, *Institutes* 3.20.3 (Allen's translation) | Verbatim |
| Heidelberg, 1563: God gives grace and the Spirit "only to those who constantly and with heartfelt longing ask Him for these gifts." | Creeds.json, Heidelberg 116 (a modern English version) | Verbatim |
| Many in the Wesleyan and Arminian traditions stress that God has made some outcomes depend on asking | Not opened this run | Reference knowledge, paraphrase. Check first |
| The open view: "the texts where he relents mean exactly what they say."; the middle-knowledge view; the hard question for each; second-order | Repo, `divine-foreknowledge.json` (the views' one-line statements and triage note) | Verbatim / site's own |
| "Both views agree that prayer is not a formality and that God's purposes include the prayers of his people." | Repo, the Study Bible note on 2 Kings 20 (said there of two readings of Hezekiah's story, and the essay says so) | Verbatim |
| "It is an honest testimony that God sometimes answers prayer for relief with grace to endure, and that such an answer is not a sign of his absence."; it is no rule that God never heals | Repo, the Study Bible note on 2 Corinthians 12 | Verbatim |
| Psalm 88 never turns to praise, unlike nearly every other lament | Not opened this run; the psalm itself read in the ESV copy | Reference knowledge |
| David's child; Hezekiah turned his face to the wall; a son asking a father for bread; Timothy's stomach; a physician among Paul's companions; Job's friends | 2 Samuel 12:16-23; 2 Kings 20:2; Matthew 7:9; 1 Timothy 5:23; Colossians 4:14; Job (paraphrase) | Scripture |
| The preaching that promises health and money to faith | Named as an error in CLAUDE.md's guardrails and in the course `the-attractional-era`; not named in the essay | Site's own |
| Scripture (ESV): Matthew 6:8, 7:7, 27:46; Mark 11:24, 14:35, 14:36; John 14:14; 1 John 5:14; James 4:2, 4:3; 2 Corinthians 12:8, 12:9; Habakkuk 1:2; Psalm 88:14, 88:18; Exodus 32:14; 2 Kings 20:5; Hebrews 5:7; Daniel 3:17-18; Job 42:7; Philippians 4:7; Romans 8:26; Luke 18:1, 18:8 | ESV copy, by script | Words verified |

Cut or held back: every study of intercessory prayer and Galton's essay of 1872 (none could be opened); Luke 22:44 (the site's page on disputed passages calls the arguments over Luke 22:43-44 close, so Mark 14:35 is quoted in its place); Matthew 7:11 and Luke 11:13 in quotation (each ends in an exclamation mark; allowed in Scripture, not needed); the saying "prayer doesn't change things, it changes us" in quotation marks (no source opened; given as a saying); Wesley's sentence that God does nothing but in answer to prayer (not found in the cached volume); Augustine's letter to Proba (not found in the cached file); C. S. Lewis (not open to this run); "the ten that were followed by a funeral" (an invented figure, changed).

## 20. why-are-there-so-many-denominations

No church body is named or implied as the author's, and none is mocked. The Methodists and the Baptists are named once, together, as history, in the course's own account of 1844 and 1845; nothing says which, if either, the author belongs to. No count of denominations is given. The history is the site's own course, read in its files. The people in the opening are types. New source opened: **WD**, Cyprian, *Treatise 1, On the Unity of the Church*, ch. 6.

| Claim or quotation | Where read | Status |
|---|---|---|
| 1 Corinthians written within about twenty-five years of the resurrection | Repo, /questions page `authors/written-decades-later` (the mid-50s) | Site's own |
| The creed: "one holy catholic and apostolic Church." | Creeds.json, `nicene_creed.json` | Verbatim |
| Cyprian, bishop of Carthage, middle of the third century: "He can no longer have God for his Father, who has not the Church for his mother." | WD, *On the Unity of the Church* 6; his office and date from the course (`apostolic-and-persecuted`: martyred 258) | Verbatim |
| Chalcedon, 451: one person in two natures; it "split off ancient communions in Egypt and Syria and the East that have never returned." | Repo, course `councils-and-creeds`, `the-great-councils` | Site's own; the clause verbatim |
| Those churches remain and confess Christ fully God and fully man | The third run's ledger has them "ancient and continuing" from `the-missionary-century`; their confession not opened | Reference knowledge. Check first |
| East and West: language, politics, the bishop of Rome's authority; the clause "and the Son" added in the West to guard the Son's deity; the East's two objections; 1054, the legate's document on the altar and the patriarch's reply; many barely noticed; 1204 and its effect | Repo, course `the-east-west-schism`, `the-long-middle` | Site's own. "The East had seen what the West would do, and it did not forget" is the course's sentence nearly word for word, given as the site's own |
| The papacy at Avignon for most of a century, then rival popes, two and then three: "each excommunicating the others' obediences, while ordinary believers were left to guess where the church even was." | Repo, `the-long-middle` | Verbatim, the site's own. "Fourteenth century" and "a century before Luther" are reference knowledge |
| 31 October 1517, ninety-five theses for debate on indulgences; he did not set out to found a church; 1521 before the emperor, his conscience captive to the Word of God; excommunicated | Repo, `reformation-and-its-wars`, `the-reformation` | Site's own (his answer as the course paraphrases it, without quotation marks) |
| His followers believed they were the church put out of doors; Rome's view in its own terms | Not opened this run | Reference knowledge, paraphrase |
| The sellers of pardons were abolished | Repo, `the-counter-reformation` | Site's own |
| Three accounts of what the church's unity is; "The catholic or universal Church, which is invisible, consists of the whole number of the elect." | Creeds.json, WCF 25.1 (the sentence continues); the Catholic and Orthodox accounts not opened | Verbatim / reference knowledge, paraphrase |
| Marburg, twelve years after the theses, fourteen of fifteen; "the skill it has practiced ever since: dividing over real differences among those who agree on almost everything, and calling the division faithfulness." | Repo, `reformation-and-its-wars` | Verbatim, the site's own |
| Zurich: believers' baptism, and drowning by other Protestants | Repo, as the second run's ledger has it (`the-reformation`, the note on John 16) | Site's own |
| England: a king's marriage, then a long struggle over how far reform should go | Repo, `the-reformation` | Site's own. "Puritans, separatists and dissenters" is reference knowledge |
| 1555: each ruler chose his territory's religion; faith assigned by government, conscience solved by moving away; 1618 to 1648; "buried under a generation of the baptized dead." | Repo, `reformation-and-its-wars`, `the-counter-reformation` | Site's own; the clause verbatim |
| A denomination is a named part of the church that does not claim to be the whole; Catholics and Orthodox do not use the word of themselves | Not opened this run | Reference knowledge |
| America: no established national church; "a religious free market."; the gospel reached people the established churches had ignored; every reader his own final court | Repo, `awakenings-and-enlightenment`, `the-american-experiment`, `reformation-and-its-wars` | Site's own; the phrase verbatim |
| "the Bible alone, read alone, yields as many Christianities as there are readers." | Repo, `the-american-experiment` | Verbatim, the site's own |
| 1054: "two proud men lost their tempers in a single building." | Repo, `the-east-west-schism` | Verbatim, the site's own |
| 1844 and 1845: the two largest evangelical bodies, the Methodists and the Baptists, divided over whether a slaveholder could serve as a bishop or a missionary; the southern bodies organized so that he could | Repo, `the-american-experiment` | Site's own |
| Around 1787, Philadelphia, in Richard Allen's telling: Black members pulled from their knees by white trustees; they walked out together; 1816, the first fully independent Black denomination in the United States | Repo, `the-american-experiment` | Site's own |
| Churches have split over personalities, music, money and slights | Not opened this run | General observation, stated generally |
| What the churches hold in common; the fourth-century creed, "one disputed clause aside" | Creeds.json (Apostles', Nicene); the course; `sacraments.json` for the phrase about crossing fingers | Verified / site's own |
| The Lutheran confession of 1530: "to the true unity of the Church it is enough to agree concerning the doctrine of the Gospel and the administration of the Sacraments,"; ceremonies need not "be everywhere alike." | Augsburg, Article 7 | Verbatim |
| Westminster, 1646: "The purest churches under heaven are subject both to mixture and error." | Creeds.json, WCF 25.5 | Verbatim |
| 1965: the pope and the patriarch lifted the excommunications of 1054 as a gesture of repentance; the division remains | Repo, `the-east-west-schism` (neither man is named) | Site's own |
| The disciples argued that evening about who was greatest | Luke 22:24 | Scripture |
| Scripture (ESV): John 17:20-21; 1 Corinthians 1:12-13, 3:3; Acts 15:39; Galatians 2:11 (cited); Ephesians 4:3, 4:4 (three words), 4:5-6; Romans 14:5, 14:10; Mark 9:38, 9:40 | ESV copy, by script | Words verified |

Cut or held back: any number of denominations (none is on the site and none could be opened); "a quarrel from 1845" in the opening (it pointed at one body); "a good many American denominations" (changed to "more than one"); "five centuries of talks" (unsourced); "an hour or so earlier" (changed to "earlier that evening"); "the oldest unanswered prayer" (changed to "among the oldest"); Ephesians 4:4 whole (the ESV sets dashes in it); the saying "in essentials unity" (its source could not be opened); the Second Vatican Council's decree on ecumenism and the Catholic and Orthodox documents on unity (not opened); Azusa Street and the newer families of churches (cut for length); every living person.

# Fifth run (2026-11-22)

Five more essays. What the run could reach was the same as before: this repository and public GitHub repositories (raw files, and GitHub's repository search to find them). No web search, no library. Sources new to this run are named at the head of each essay's section. Every Scripture quotation was compared with the ESV copy by the same script (`chk.mjs`); every other quotation was compared with its source by the second script (`srcchk.mjs`), which was given the cached sources and, for a sentence taken from the site, the repository file it stands in.

Four of the five titles stand beside essays already on the shelf, and no pending slot has a matching title, so each has a new line and a different job from its neighbor, which it links: this run's hell essay is about the charge of unfairness (the earlier one is about duration and the history); the election essay reads Romans 9 and 1 Timothy 2:4 side by side and gives the confessions' own words (the earlier one tells the history from Augustine to Wesley); the divorce essay reads the five passages one at a time and sets out the three views held among Protestants (the earlier one sets Catholic, Orthodox and Protestant side by side); the essay on evil takes the logical and evidential arguments (the earlier one takes the suffering of children).

## 21. is-hell-real-and-is-it-fair

Agrees with the live /questions page `client/public/questions/evil/hell-and-the-justice-of-god.json` and the Honest Answer `is-hell-forever-or-does-it-end`: judgment and the possibility of final loss are confessed; no side is taken between eternal conscious punishment and conditional immortality; the hope of restoration is stated as the church has generally judged it. Nothing is said about any person's fate, and no position is stated as the author's. The three people in the opening are types. New sources opened: **Summa I-II** = GITenberg, Project Gutenberg 17897, *Summa Theologica, Part I-II (Pars Prima Secundae)*, translated by the Fathers of the English Dominican Province, question 87, articles 3 and 4. **WD**: Augustine, *The City of God*, Book 21, chapters 11 and 16 (Dods's translation as the NPNF prints it); Gregory of Nyssa, *On the Soul and the Resurrection* (the NPNF text); Origen, *De Principiis*, Book 1; Irenaeus, *Against Heresies*, Book 2 (already cached). **Augsburg** (already cached), Article 17.

| Claim or quotation | Where read | Status |
|---|---|---|
| Mill, 1865: he would call no being good who was not good in our sense of the word; "to hell I will go." | Repo, the Honest Answer and the /questions page (ledgered in `apol-ledger.md`); the book not opened | Site's own, verbatim from the page |
| Augustine, 420s: some "think it unjust that any man be doomed to an eternal punishment for sins which, no matter how great they were, were perpetrated in a brief space of time." | WD, *City of God* 21.11 (the sentence continues after a semicolon and ends in an exclamation, which is left out); the decade as the first run's ledger has it | Verbatim; date reference knowledge |
| Aquinas states the objection: "a just punishment is equal to the fault, since justice is equality." | Summa I-II, q.87 a.3, objection 1 (the sentence continues) | Verbatim. "Eight centuries later" and "textbook" are reference knowledge |
| Care paragraph ("If you're grieving as you read this ... a page for grief.") | Repo, live essay `why-does-god-allow-suffering`, reused whole; a script confirmed the paragraph stands in the essay byte for byte | Site's own |
| Augustine: no court measures a sentence by the time the crime took; "a penalty of many years' confinement imposed on the slave who has provoked his master with a word." | WD, *City of God* 21.11 | Verbatim; the comment on it is the essay's own |
| The Study Bible's note: judgment "is measured by the light received." | Repo, `client/public/bible/notes/matthew/11.json`, quoted with the page named | Verbatim, the site's own |
| Tyre and Sidon were pagan cities | Same note ("pagan cities") | Site's own |
| Each answer denies a different line of the argument | Repo, the /questions page and the Honest Answer (their argument), linked | Site's own |
| Most of the church, East and West, has held eternal conscious punishment | Repo, the same pages | Site's own |
| Aquinas: "Punishment is proportionate to sin."; "the turning away from the immutable good, which is infinite,"; the pain of loss and the limited pain of sense; striking the sovereign and a private individual; "has the will to sin, everlastingly."; "God does not delight in punishments for their own sake," | Summa I-II, q.87 a.4 (answer; objection 2 and its reply for the ruler); a.3 (replies 1 and 3) | Verbatim |
| Lewis, 1940: "the doors of hell are locked on the inside." | Repo, the Honest Answer and the /questions page; the book not opened | Site's own, verbatim from the page |
| Augustine: "even the eternal fire will be proportioned to the deserts of the wicked, so that to some it will be more, and to others less painful." | WD, *City of God* 21.16 (the sentence begins "We must not, however deny that" and continues) | Verbatim |
| The hard questions put to the first answer | The /questions page for the proportion and the new creation; the point about rank and harm is the essay's own | Site's own / the essay's own |
| Irenaeus, a bishop of the second century: "life does not arise from us, nor from our own nature; but it is bestowed according to the grace of God," | WD, *Against Heresies* 2.34.3 (the sentence begins "For"); his office and century from the course | Verbatim. That his meaning is disputed is reference knowledge |
| Fudge 1982; Stott 1988, tentatively | Repo, the Honest Answer | Site's own |
| Origen, third century: "the end is always like the beginning." | WD, *De Principiis* 1.6.2; the /questions page quotes the same words | Verbatim |
| Gregory of Nyssa, fourth century, a defender of the Nicene faith: "when evil shall have been some day annihilated in the long revolutions of the ages," "nothing shall be left outside the world of goodness." | WD, *On the Soul and the Resurrection* (one sentence, quoted in two parts; in the dialogue the words are given to his sister Macrina, the teacher) | Verbatim. His standing from the first run's essay |
| Origen's doctrine anathematized at Constantinople in the sixth century | Repo, the /questions page | Site's own |
| The Lutheran confession of 1530 rejects the opinion "that there will be an end to the punishments of condemned men and devils," | Augsburg, Article 17 (the article attributes the opinion to the Anabaptists; the essay does not repeat that) | Verbatim |
| "as a hope outside its confessions, without contempt for those who hold it." | Repo, the /questions page, quoted with the page named | Verbatim, the site's own |
| A world without judgment leaves the wronged unanswered | Repo, the Honest Answer's argument (it names a living writer; the essay names none) | Site's own, paraphrase |
| Scripture (ESV): Ezekiel 18:23, 18:25; Deuteronomy 25:2–3; Luke 12:47–48, 13:23, 13:24, 13:25, 16:26, 23:41; Matthew 10:28, 11:22, 12:32, 20:12, 20:15, 25:46; 1 Corinthians 15:28; 1 Timothy 2:1 (cited), 6:16; Romans 2:1, 2:7, 3:26, 5:18; 2 Thessalonians 1:9; Revelation 20:10, 20:12; Ecclesiastes 3:16–17; Psalm 130:3; 1 Peter 3:18; John 5:22 | ESV copy, by script | Words verified |

Cut or held back: the two living writers the site's pages name on this subject; Anselm (no copy found); Edwards; Gregory the Great's *Dialogues*, which Aquinas cites (not opened); the Westminster and Athanasian sentences (in the earlier essay); the tower of Siloam (Luke 13:4–5), the older brother (Luke 15:29) and Philippians 2:11 (cut for length); a sentence that an eye for an eye was a limit (not opened); Matthew 11:21 and Luke 13:27 (each carries an exclamation); any figure for what Christians believe today.

## 22. did-god-choose-who-would-be-saved

The companion to `did-god-choose-me-or-did-i-choose-god`, which it links for the history. Agrees with the Honest Answer `does-god-choose-us-or-do-we-choose-him` (both cases laid out, none chosen) and with the Study Bible's notes on Romans 9 and 1 Timothy 2 (three readings of Romans 9; the question second-order). No position is stated as the author's, and no church body is named or implied as his. The three people in the opening are types. New sources opened:

- **Summa I** (already cached, PG 17611): question 19, article 6 (reply to objection 1), and question 23, article 3.
- **WD**: Augustine, *The Enchiridion*, chapters 97 and 103 (the NPNF text); John of Damascus, *An Exact Exposition of the Orthodox Faith*, Book 2, chapters 29 and 30; Chrysostom, *Homilies on Romans*, Homily 16, and *Homilies on 1 Timothy*, Homily 7 (read, not quoted).
- **Formula of Concord**: Zyniker13/Denominations-and-Traditions, `confessions/lutheran/book-of-concord/formula-of-concord-epitome.md`, whose header gives its source as the *Concordia Triglotta* English translation (St. Louis, 1921); Epitome, article XI. The bracketed words in that translation are left out of the quotations by quoting around them.
- **Remonstrance**: joshwkearney/reformedhistory, `src/ReformedHistory/Views/Content/Confessions/ArticlesOfRemonstrance.cshtml` (the five articles of 1610 in the usual English version; the file names no translator).
- **Dositheus**: LukeSmithxyz/everything, `content/church/councils/dositheus.md` (the Confession of Dositheus, dated 1672 in the file's header; the file names no translator), Decree 3.
- **Trent 6**: BenjaminPoole/ecumenical-christian-library, `councils/trent-1545/session-vi.part-1.html`, canons 4 and 17.
- **Creeds.json** (as before): Westminster Confession 3.5 and 3.7; Canons of Dort, First Head, article 15.

| Claim or quotation | Where read | Status |
|---|---|---|
| Pelagius and Augustine; Carthage 418, Ephesus 431 | Repo, history course `the-fathers-at-work` | Site's own |
| Orange, 529: the first wish to believe is God's gift; a curse on teaching that God foreordains to evil | Creeds.json, `council_of_orange.json` (quoted in the first run's essay; paraphrased here) | Verified, paraphrase |
| In Exodus the words to Moses come after the golden calf | ESV copy, Exodus 32 to 33:19 | Verified |
| The difference in how Paul speaks of the two kinds of vessel | ESV copy, Romans 9:22–23; that readers "on every side" have noticed it is reference knowledge | Words verified; the remark reference knowledge |
| Three readings of Romans 9 | Repo, the Study Bible note on Romans 9, named in the essay | Site's own |
| Chrysostom, late fourth century: "a sign of foreknowledge,"; "does not mean that all is God's doing. Since if this were so, there were nothing to hinder all men from being saved." | WD, *Homilies on Romans*, Homily 16 (on 9:11 and 9:23). The date is reference knowledge | Verbatim |
| The kings Paul asks prayer for were pagans | Repo, the Study Bible note on 1 Timothy 2 ("rulers who may persecute it") | Site's own |
| Aquinas lists three readings of 1 Timothy 2:4 | Summa I, q.19 a.6, reply 1 | Verified |
| Augustine, in a handbook late in life: "that no man is saved unless God wills his salvation: not that there is no man whose salvation He does not will, but that no man is saved apart from His will." He also offers "every sort of men" | WD, *Enchiridion* 103. "Late in his life" is reference knowledge | Verbatim |
| Aquinas: "some men of every class and condition."; the judge who "antecedently" wills "all men to live; but consequently wills the murderer to be hanged." | Summa I, q.19 a.6, reply 1 (the second is one clause, quoted in two parts with "he wills" between) | Verbatim |
| John of Damascus, eighth century: "God's original wish was that all should be saved and come to His Kingdom,"; the antecedent and the consequent will; "while God knows all things beforehand, yet He does not predetermine all things." | WD, *Exposition* 2.29 and 2.30 (a footnote number stands before and after each sentence) | Verbatim; century as the fourth run's ledger has it |
| Many Reformed teachers say God desires what he has not decreed | Repo, the Study Bible note on 1 Timothy 2 ("Calvinists often distinguish God's revealed desire from his decree") | Site's own |
| Westminster, 1646: "without any foresight of faith or good works,"; "his mere free grace and love."; "to pass by, and to ordain them to dishonor and wrath for their sin." | Creeds.json, WCF 3.5 and 3.7 | Verbatim |
| Dort, 1619: "in the common misery into which they have wilfully plunged themselves,"; "by no means makes God the author of sin (the very thought of which is blasphemy)." | Creeds.json, Canons of Dort, First Head, article 15 | Verbatim |
| The articles of 1610: "to save in Christ, for Christ's sake, and through Christ, those who, through the grace of the Holy Ghost, shall believe on this his son Jesus."; "can of and by himself neither think, will, nor do any thing that is truly good,"; "it is not irresistible." | Remonstrance, articles 1, 3 and 4 | Verbatim |
| Wesley's heirs hold the Arminian answer in substance | Not opened this run | Reference knowledge |
| The Lutheran confession of 1577: "extends only over the godly,"; "not to be investigated in the secret counsel of God, but to be sought in the Word of God."; it rejects "that God is unwilling that every one should be saved." and that there is "in us" a "cause of God's election."; election is to be learned from the gospel and not from reason | Formula of Concord, Epitome XI, theses 4, 5, 8 and 9, and the rejected errors 3 and 4 | Verbatim; the last is paraphrase |
| Trent: "by the divine power, predestined unto evil."; "cannot refuse its consent, if it would." | Trent 6, canons 17 and 4 | Verbatim |
| Aquinas: "God does reprobate some,"; "the will to permit a person to fall into sin, and to impose the punishment of damnation on account of that sin." | Summa I, q.23 a.3 | Verbatim |
| Rome has allowed more than one school | The first run's ledger (the hearings ended in 1607), not opened | Reference knowledge |
| Jerusalem, 1672, answering a Calvinist confession issued under a patriarch's name: "since He foreknew the one would make a right use of their free-will, and the other a wrong,"; grace given to all as a light; "equally wills the salvation of all, since there is no respect of persons with Him." | Dositheus, Decree 3 (the text names "Cyril's Confession"; that he was a patriarch is reference knowledge) | Verbatim |
| The replies each tradition gives to its hard question | Not opened this run, beyond the confessions quoted | Reference knowledge, paraphrase. Check first |
| Scripture (ESV): Romans 9:2–3, 9:11, 9:13, 9:15, 9:18, 9:19, 9:21, 9:22–23, 9:32, 10:21, 11:20, 11:23; 1 Timothy 2:1–2, 2:3–4, 2:5–6; Acts 18:10; 2 Timothy 2:10 | ESV copy, by script | Words verified |

Cut or held back: Romans 9:14 and Matthew 23:37 (each carries an exclamation); Romans 9:1 and the whole of 9:11 and 9:23 (the ESV sets dashes in them); the sentence "nobody has added a fourth" reading (an overclaim); the line about each side's slander of the other (it stands in the earlier essay); Calvin, Luther, Arminius and Wesley in their own words (the earlier essay has Wesley and Whitefield; the others were not opened); the Catholic schools by name; any modern writer the site's study names.

## 23. is-divorce-ever-right-and-may-a-divorced-person-remarry

The companion to `divorce-remarriage-and-the-church`, which it links for the rabbinic debate and the Catholic, Orthodox and Protestant readings. Agrees with the Honest Answer `what-does-the-bible-say-about-divorce-and-remarriage`, the help page `client/public/needs/divorce.json`, and the Study Bible's notes on Matthew 5 and 19, Mark 10 and 1 Corinthians 7. No position on the grounds for divorce or on remarriage is stated as the author's (he has given none), no ruling on anyone's marriage is given, and no counsel is offered to a reader who has already remarried. The notes name living scholars; the essay names none. The three people in the opening are types. New sources opened: **WD**: Jerome, Letter 55, to Amandus (the NPNF text, as the repository's README says of the letters in that volume; the letter's heading and style are the volume's); Origen, *Commentary on Matthew*, Book 14, chapter 23 (the ANF text). **Creeds.json** (as before): Westminster Confession 24.5 and 24.6.

| Claim or quotation | Where read | Status |
|---|---|---|
| Care lines, reused whole: "If you are in danger, get safe first and sort the theology after. The Find Help page on this site is a place to start." and "If you are grieving a marriage that ended, you are not a second-class Christian. Grace is not the reward for a clean history." | Repo, the Honest Answer (`client/src/data/answers.ts`); a script confirmed each stands in the essay byte for byte | Site's own |
| Care lines, reused whole: "If you're in immediate danger, call 911." and "None of these passages tells you to stay in danger." | Repo, `client/public/needs/divorce.json`; confirmed by the same script | Site's own |
| Care line, reused whole: "If you need someone sooner, [Find Help](/help) lists hotlines for abuse and sexual assault." | Repo, live essay `doubt-after-church-abuse`; confirmed by the same script | Site's own |
| "Jesus' words never require anyone to remain where they or their children are in danger; separation for safety is not what this text condemns." | Repo, the Study Bible note on Matthew 19, quoted with the page named | Verbatim, the site's own |
| The question was asked in the territory of Herod Antipas, who had executed John for condemning his marriage; under Roman law either spouse could end a marriage | Repo, the Study Bible note on Mark 10 | Site's own |
| A dismissed wife often had to marry again to live; the certificate said she was free to marry | Repo, the note on Mark 10, as the second run's ledger has it | Site's own |
| "for any cause" is worded so only in Matthew; four readings of the word for sexual immorality | Repo, the notes on Matthew 19 and 5 | Site's own |
| Readers differ over whether "free from a wife" (1 Corinthians 7:27) includes the divorced | Not opened this run | Reference knowledge. Check first |
| Some scholars hold that Jesus forbade divorce outright and Matthew's church softened it; others that ancient writers shortened a teacher's words | Repo, the note on Matthew 19 (which names a scholar; the essay does not) | Site's own, paraphrase |
| The first answer was the common teaching of the early church; a number of Protestants hold it; the betrothal and unlawful-union readings; the disciples' dismay as an argument | Repo, the notes on Matthew 19 and 1 Corinthians 7 ("as the early church largely held"; "his refusal of the husband's second marriage goes beyond both schools") | Site's own |
| The Catholic Church holds the bond cannot be dissolved and allows separation for serious cause | The second run's ledger (Trent, session 24, canons 7 and 8) | Verified in an earlier run |
| Jerome, in the 390s, on a woman who left a husband guilty of gross sexual sin and married another: "he may be stained with every crime and may have been left by his wife because of his sins; yet he is still her husband and, so long as he lives, she may not marry another." | WD, Jerome, Letter 55.3 (the sentence begins "A husband may be an adulterer or a sodomite,"). The decade is reference knowledge | Verbatim; date reference knowledge |
| Paul says a wife is bound while her husband lives in Romans as well | ESV copy, Romans 7:2 | Verified |
| Origen, about a century and a half before Jerome: "some even of the rulers of the church have permitted a woman to marry, even when her husband was living."; he thought it contrary to Scripture; "not indeed altogether without reason." | WD, Origen, *Commentary on Matthew* 14.23. The interval is reference knowledge | Verbatim |
| Erasmus, 1519 | Repo, the note on Matthew 19 | Site's own |
| Westminster, 1646: two grounds; the wronged party in a divorce for adultery may marry as if the other had died; "the corruption of man" that is "apt to study arguments, unduly to put asunder those whom God hath joined together in marriage." | Creeds.json, WCF 24.5 and 24.6 (the first two in paraphrase) | Verbatim for the warning |
| Many Protestant churches now count abuse; the argument from "for any cause", Exodus 21:10–11 and "not enslaved" | Repo, the note on Matthew 19 | Site's own, paraphrase |
| Exodus 21:10–11 concerns a wife taken from among slaves | ESV copy, Exodus 21:7–11 | Verified |
| The replies each answer gives to its hard questions | Not opened this run, beyond the notes | Reference knowledge, paraphrase. Check first |
| David, Paul and Jesus each got away from violence | ESV copy, 1 Samuel 19:11–12; Acts 9:25; John 8:59 | Verified |
| Scripture (ESV): Mark 10:9, 10:11–12; Luke 16:18; Matthew 1:19, 5:32, 19:3, 19:8–9, 19:10, 19:11; 1 Corinthians 7:10–11, 7:12 (four words), 7:15, 7:27–28, 7:39; Romans 7:2 (cited); Exodus 21:10–11; 1 Samuel 19:11–12 (cited); Acts 9:25 (cited); John 8:59; Psalm 11:5, 147:3 | ESV copy, by script | Words verified |

Cut or held back: every living scholar's name; a sentence that the first readers of Mark had no copy of Matthew (not opened); any counsel to a reader who has remarried; Luther, Calvin, Bucer and Milton (not opened); the Catholic practice the notes call the Pauline privilege and the debate over a papal document of 2016 (both on the site's notes, left there); John 8:11 (a passage the site calls disputed); every divorce statistic.

## 24. should-the-church-stay-out-of-politics

No party, candidate, policy, law, election, living person or present movement is named, except Christian nationalism, which is named in the words of the site's own live page and with that page's conclusion. The rules of `validate-politics.mjs` were kept by hand in both directions: the two sentences that describe a congregation captured from the right and from the left are 29 and 24 words and are built alike, and each of the four traditions is given its strength and its hard question at like length. No account of church and state is stated as the author's (the site's study `client/public/theology/church-and-state.json` calls the question second-order). Martin Luther King Jr. is called "a Baptist preacher" as the second run's race essay has it, as history; nothing says which church body is the author's. The three people in the opening are types. New sources opened: **Calvin** (already cached, PG 64392): *Institutes* 4.20.2 and 4.20.4 (Allen's translation). **Evans-TCP** N20688 (already listed under the second run; fetched again from textcreationpartnership/N20688): Jones and Allen, "An Address to those who keep Slaves, and approve the practice" (1794); the long s of the transcription is printed as s. **Schleitheim**, **Augsburg** (Articles 16 and 28), **Barmen (EKD)** and **WD** (Augustine, *City of God* 19.17), all already cached. **Creeds.json**: Westminster Confession 23.3.

| Claim or quotation | Where read | Status |
|---|---|---|
| John 6:15; the offer of the kingdoms; the trial before the governor; the coin; John and the ruler's marriage; Elijah and Ahab; Amos and the priest of Bethel | ESV copy (John 6:15, 18:36; Luke 4:5–8; Mark 12:16–17, 6:17–18, 6:27; 1 Kings 21; Amos 7:10–13) | Verified |
| Constantine won the western empire in October 312; legal freedom the next year; official in 380 | Repo, history course `the-constantinian-turn` | Site's own |
| In the 380s Priscillian was accused of heresy and put to death by the imperial authorities, urged on by bishops | Same | Site's own |
| Theodosius ordered a massacre at Thessalonica; Ambrose refused him the table until public penance; he did it | Same (the course dates the penance to 390) | Site's own |
| "Every generation since has faced its own version of 312, some throne or party or public offering the church protection in exchange for blessing, and the offer never stops sounding like providence." | Same, quoted with the course named | Verbatim, the site's own |
| Augustine: two cities formed by two loves; the heavenly city "calls citizens out of all nations" and uses the earthly city's peace | WD, *City of God* 19.17 for the words; the two loves from the site's study of church and state | Verbatim; paraphrase |
| Popes and kings fought for centuries over who stood above whom | Repo, `the-long-middle`, `the-medieval-west` (the investiture struggle, Canossa 1077) | Site's own |
| The Lutheran confession of 1530: "the power of the Church and the civil power must not be confounded,"; "Let it not break into the office of another."; Christians may hold civil office | Augsburg, Articles 28 and 16 | Verbatim |
| The two-kingdoms account has been asked since the 1930s what it can say when the state does evil | Not opened this run | Reference knowledge. Check first |
| Calvin: "a calling not only holy and legitimate, but far the most sacred and honourable in human life,"; "to cherish and support the external worship of God." | Calvin, *Institutes* 4.20.4 and 4.20.2 | Verbatim |
| Westminster, 1646: "that all blasphemies and heresies be suppressed." | Creeds.json, WCF 23.3 | Verbatim |
| Most Reformed churches gave up that claim | Not opened this run | Reference knowledge. Check first |
| "no sphere sealed off from Christ," | Repo, `client/public/theology/church-and-state.json`, quoted with the study named | Verbatim, the site's own |
| The Reformed conviction built schools, hospitals and movements of reform | Not opened this run | Reference knowledge, stated generally |
| Servetus burned at Geneva in 1553 with Calvin's approval | Repo, `reformation-and-its-wars` | Site's own |
| Schleitheim, 1527: "it is not appropriate for a Christian to serve as a magistrate,"; "their citizenship is in this world, but the Christian's citizenship is in heaven."; "They wished to make Christ king, but He fled." | Schleitheim, article 6 | Verbatim |
| Anabaptists were hunted for a century by Catholics and Protestants | The third run's ledger (`reformation-and-its-wars`, `the-reformation`) | Site's own |
| The Catholic account from Augustine: the state good within limits, the common good, the kingdom not to be confused with a government | Repo, `church-and-state.json` (its fourth position) | Site's own, paraphrase |
| Jones and Allen, Philadelphia, 1794: "If you love your children, if you love your country, if you love the God of love," "clear your hands from slaves, burden not your children or country with them." | Evans-TCP N20688 (one sentence, quoted in two parts) | Verbatim |
| A good many white churches held that slavery was a civil matter on which the pulpit should keep quiet | Not opened this run | Reference knowledge. Check first |
| In 1963 King, a Baptist preacher, wrote from a Birmingham jail to white clergymen who had urged him to wait | Repo, live essay `what-the-church-got-wrong-about-race` and `client/public/justice/timeline.json` | Site's own |
| Germany: most Protestants welcomed Hitler in 1933; the German Christians; a pastor of Jewish descent barred; Barmen, May 1934; the confession of 1945 | Repo, `the-global-church` (the section "Barmen and the German Failure") | Site's own |
| Barmen: "is the one Word of God which we have to hear and which we have to trust and obey in life and in death."; "areas of our life in which we would not belong to Jesus Christ, but to other lords."; "the single and totalitarian order of human life." | Barmen (EKD), theses 1, 2 and 5 | Verbatim |
| "said nothing directly about the persecution of the Jews, and most of its signers never did either." | Repo, `the-global-church`, quoted with the course named | Verbatim, the site's own |
| "the claim that a nation should be Christian as a nation, in its laws, its customs and its rulers' duties."; "This site doesn't teach Christian nationalism as true. It says so with grief, and it applies the same test to any cause, on any side, that drafts the cross." | Repo, `client/public/questions/morality/is-christian-nationalism-christian.json`, quoted with the page named and linked | Verbatim, the site's own |
| Scripture (ESV): John 6:15, 18:36, 18:38; Luke 4:5–8 (cited); Mark 6:18, 12:17; 1 Kings 21:19; Amos 7:13; Romans 13:4; 1 Timothy 2:2; Revelation 13:7–8 (cited); Acts 5:29 | ESV copy, by script | Words verified |

Cut or held back: every party, policy and living person; Karl Barth, Bonhoeffer and Niemoller by name (in the course; not needed); the Letter from Birmingham Jail in quotation (not open to this run); Douglass's sentence from his appendix (used in an earlier essay); Gelasius, Luther's own treatise on temporal authority and Kuyper (not opened); "the oldest recorded instruction" and "before anyone else did" (overclaims, reworded); John 18:37 and 2 Samuel 12:7 in quotation (a dash in the first, an exclamation in the second).
