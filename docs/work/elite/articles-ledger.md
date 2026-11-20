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
