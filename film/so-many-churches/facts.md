# Why are there so many churches?: the facts in the script, and where each was checked

This film is a rebuild of the Bible Explorer film `client/public/explorer/films/so-many-churches.json`. The words are new. Every claim comes from the old film (with its rows "churches 1" to "churches 7" and "churches think" in `docs/work/elite/explorer-ledger.md`), from the church-history course essays `client/public/history/essays/the-east-west-schism.json`, `the-reformation.json` and `the-counter-reformation.json` (whose own listed sources are Justo Gonzalez, Diarmaid MacCulloch, Jaroslav Pelikan, Bruce Shelley, John W. O'Malley and Peter H. Wilson; there are no source cards for these three essays under `client/public/history/sources/`), from the Honest Answer "can-you-be-a-christian-without-church" in `client/src/data/answers.ts`, and from the Study Bible doctrine page `client/public/bible/doctrines/church.json`. Nothing was added from outside.

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-26.

- **Acts 2:42** (spoken): “They devoted themselves to the apostles’ teaching and to the fellowship, to the breaking of bread and to prayer.”
- **Romans 1:17** (shown on screen): “For the gospel reveals the righteousness of God that comes by faith from start to finish”
- **John 17:21** (spoken): “that all of them may be one, as You, Father, are in Me, and I am in You.”

## Claims, chapter by chapter

| Chapter | Claim | Source |
|---|---|---|
| one | Catholic, Orthodox, Baptist, Methodist, Pentecostal as names on church signs | Old film, "branches" and "east-west" older captions (names of the traditions); the signs picture is the old film's younger caption ("so many different names on church signs") |
| one | The church began as one company in Jerusalem, gathered by the Spirit at Pentecost | Old film, "one" older caption; ledger "churches 1" (BSB Acts 2:1-4, 42) |
| spread | Samaria, Antioch where the disciples were first called Christians, Rome | Old film, "spread"; ledger "churches 2" (BSB Acts 8:5; 11:26; 28:14) |
| spread | Worship took different shapes in different languages; one faith, later written in the creeds | Old film, "spread"; ledger "churches 2" (the traditions page's "sharedCore") |
| drift | Drift over centuries; East spoke Greek, West Latin; in time most on each side couldn't read the other's books | the-east-west-schism, "One Church, Two Worlds" and "Language, Culture, and a Lost Empire" |
| drift | When the western empire fell (the essay: in the fifth century), the West looked to the bishop of Rome; the East's emperor still reigned in Constantinople | the-east-west-schism, "Language, Culture, and a Lost Empire" |
| authority | The West increasingly answered Rome, the successor of Peter; the East honored Rome as first of the great churches but held the church is governed by all its bishops together in council | the-east-west-schism, "Who Speaks for the Church" |
| authority | Filioque, Latin for "and the Son"; Western churches added that the Spirit proceeds from the Father and the Son; Western intent to guard the Son's full divinity; the East objected to the substance and to one region changing the creed agreed by an ecumenical council; neither was simply wrong | the-east-west-schism, "The Word Added to the Creed" (last sentence: "Neither was simply wrong.") |
| 1054 | 1054; Cardinal Humbert laid the excommunication on the altar of Hagia Sophia against the patriarch Michael Cerularius, who returned the favor | the-east-west-schism, "The Year 1054 and the Long Aftermath"; keyFigures |
| 1054 | 1054 only made visible a separation already real; sealed in 1204 when a Western crusading army sacked Constantinople | Same section |
| 1054 | 1965, the pope and the patriarch lifted the old excommunications; "no hero and no villain"; the quotation “only two faithful traditions that loved the same Lord and lost the ability to love each other” | Same section, word for word; also the old film's "east-west" caption and ledger "churches 3" |
| luther | Martin Luther, a German monk; freed by a discovery in Romans: the righteousness God requires is the righteousness God gives, received by faith | the-reformation, "The Monk Who Could Not Find Peace"; old film "reformation"; ledger "churches 4" |
| luther | 1517, ninety-five theses against the sale of indulgences; meant to start a debate among scholars; started a fire across Europe because the printing press carried his words | the-reformation, same section |
| branches | Zwingli led the reform in Zurich and broke with Luther over the Lord's Supper; Calvin in Geneva shaped the Reformed stream; the Anabaptists baptized only those who could profess faith for themselves; England's break with Rome produced in time the Anglican tradition | the-reformation, "The Reformed Stream", "The Radicals Who Went Further", "The English Settlement" |
| branches | Protestants divided further: Baptist, Methodist, Pentecostal and more, often over baptism, the Supper, and who holds authority and how | Old film "branches" older caption; ledger "churches 5" |
| trent | Council of Trent, three periods between 1545 and 1563; justification by grace but not by faith alone | the-counter-reformation, "Trent Rebuilds the Old Church"; also the-reformation, "The Catholic Response and the Cost" |
| trent | Every diocese ordered to build a seminary; the Jesuits; Teresa of Avila; "Rome did reform, and the reform was real" | the-counter-reformation, "Trent Rebuilds the Old Church" (that sentence word for word) and "Ignatius, Xavier, Teresa"; the-reformation, "The Catholic Response and the Cost" (Jesuits) |
| cost | "the tearing was soaked in blood"; Catholics killed Protestants and Protestants killed Catholics and both killed the Radicals (Anabaptists) | the-reformation, "The Catholic Response and the Cost" |
| cost | Peace in 1648, exhaustion; the Peace of Westphalia; "nobody had won" | the-reformation, same section; the-counter-reformation, "What Westphalia Ended" |
| cost | Some divisions over things that matter, some not worth what they cost | Old film, "branches" older caption |
| cost | "The church needed the recovery, and the church should mourn the blood." | the-reformation, last paragraph, word for word (spoken as the film's own sentence, from the course) |
| root | Which differences are worth disagreeing over | Old film, "think" (older) |
| root | Catholic: one visible church, Peter's successor the visible center of unity. Orthodox: one communion of local churches, bishops equals. Magisterial Protestant: the church recognized wherever the gospel is rightly preached (and sacraments rightly administered). Free church: a gathered company of believers | `bible/doctrines/church.json`, "differ" (all four views, in that page's order) |
| root | “Most of these churches confess the same God, the same Christ, the same empty tomb, and they recite the same ancient creeds” | Old film "root" caption; ledger "churches 6"; `client/public/theology/traditions.json` introduction. Trimmed: the sentence continues "that were written long before any of the divisions you see today." |
| be-one | The New Testament has no word for a Christian who belongs to no church; a hand on its own (on a table) isn't a freer hand, it's a dying one; Paul's image is a body part | Honest Answer "can-you-be-a-christian-without-church", first paragraph |
| be-one | The night before he died Jesus prayed for all who would believe (through the disciples' message) | Old film "be-one"; ledger "churches 7" (BSB John 17:20-21) |
| be-one | The divisions are real, and so is the unity under them; the film does not choose between the churches | Old film "be-one" older caption |

## Notes

- The old film's care line (hurt in a church) stays on the page, word for word, and is not in the narration.
- No count of denominations is given anywhere in the film.
- Left out for length: Augustine barely read in the East, the pope dead before Humbert's act, the Thirty Years War and Magdeburg, Calvin and Servetus, Munster, the Saint Bartholomew's Day massacre. All are in the essays.
- The closing line ("Many branches. One root. One prayer over them all.") draws on the old film's tree and root pictures and John 17; it makes no factual claim.
- No branch of the tree is drawn larger, higher, cut off or withered (ledger, "all four, drawings").
