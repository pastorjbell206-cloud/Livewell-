# Sources survey for the church history course

For every primary source the course plans to quote, Parts 0 to VIII (master
plan 7.2): a public-domain text that can be reached, with where it is, or
"not reachable". Made on 2026-10-27 for unit U07. James sees it with the
history slice.

The list of planned sources was drawn from the session ground in master plan
7.2, the quotations in the approved Rome pilot, and the texts unit U07 was
asked to fetch. It is a working list: a session that needs another source adds
it here first. Dates and attributions in this file are planning notes, each to
be verified before it is printed.

## How it was checked

Of the places that hold these texts, the sandbox reached only GitHub's raw
file host (`raw.githubusercontent.com`). CCEL, Wikisource, Project Gutenberg's
own site, New Advent, the Internet Archive, HathiTrust, Fordham's Medieval
Sourcebook, the Avalon Project, Perseus's website, Documenting the American
South, Google and Bing all refused the connection (403 from the proxy), and
GitHub's own pages and API refused it too. So "reachable" here means one of
these public repositories on GitHub holds the text, and its opening (at least
the first 3 KB) was fetched on 2026-10-27 and its title read:

| Short name | Repository | Pinned to | What it holds |
|---|---|---|---|
| WDB | HistoricalChristianFaith/Writings-Database | commit `328918a` | Ante-Nicene and Nicene and Post-Nicene Fathers, Roger Pearse's collections, and some later works. Its machine-translated Migne material is never used. |
| Perseus | PerseusDL/canonical-latinLit, canonical-greekLit | commits `0700a6b`, `0189b9c` | Latin and Greek texts, some with public-domain English translations |
| Creeds.json | NonlinearFruit/Creeds.json | commit `2ae21a4` | Reformation and later confessions as JSON, each with its own source note |
| TCP | textcreationpartnership/`<id>` | branch `master` | Keyed transcriptions of English printed books to 1800 (EEBO, ECCO, Evans), as TEI XML in the original spelling |
| PG | the GITenberg mirror of Project Gutenberg | branch `master` | Project Gutenberg's plain texts; the mirror's repository names come from the list shipped in the `gitberg` package on PyPI (version 0.8.8) |

No commit id could be read for TCP or PG repositories (GitHub's API was
refused), so a text from them is pinned by its sha256 when it is stored.

The printed works are all long out of copyright. Project Gutenberg clears each
text as public domain in the United States. The TCP index marks the
transcriptions it released freely as "Free"; for those it marks "Restricted"
(its second phase), confirm the TCP's current terms before storing one.

## What the status words mean

- **Stored**: in `texts/` beside this file, listed in `manifest.json`, and
  checked by `scripts/verify-sources.mjs`. A session can print a card from it
  now.
- **Reachable**: a public-domain text was found and fetched in part. Store it
  (see `PROVENANCE.md`, "Adding a text") when a session first quotes it.
- **Reachable, old spelling**: reachable only as a sixteenth- to
  eighteenth-century English printing, transcribed with its spelling. A card
  would quote it as printed, and storing it needs a TEI converter in
  `scripts/lib/history-sources.mjs`.
- **Not reachable**: no public-domain text could be found in anything the
  sandbox reaches. The session tells this source in the narrative and says so,
  with no card. A later run with wider access can look again.
- **In copyright**: a modern text. Quote briefly in the narrative with
  attribution, or summarize; never on a card.

## Summary

| Part | Planned sources | Stored | Reachable | Reachable, old spelling | Not reachable | In copyright |
|---|---|---|---|---|---|---|
| 0. How to Read the Dead | 4 | 0 | 4 | 0 | 0 | 0 |
| I. The Church Without Power | 27 | 14 | 11 | 0 | 2 | 0 |
| II. The Church Given Power | 25 | 7 | 17 | 0 | 1 | 0 |
| III. The Long Middle | 15 | 0 | 7 | 2 | 6 | 0 |
| IV. Reformations | 18 | 0 | 11 | 3 | 4 | 0 |
| V. Revival, Reason, and Mission | 16 | 0 | 12 | 3 | 1 | 0 |
| VI. The American Experiment | 18 | 0 | 9 | 8 | 1 | 0 |
| VII. The Twentieth Century | 9 | 0 | 3 | 0 | 2 | 4 |
| VIII. After Christendom | 4 | 1 | 0 | 0 | 0 | 3 |
| **All** | **136** | **22** | **74** | **16** | **17** | **7** |

Each row below is one planned source, or a small group used together, counted
by the first status it gives. The "Stored" rows are served by the 22 files in
`texts/`; some files serve more than one row.

Parts I and II, the patristic Parts, are covered almost entirely. Parts
III to VI are covered far better than the plan expected, mainly through Project
Gutenberg and the Text Creation Partnership. What cannot be reached is mostly
medieval (Boniface, the Xi'an monument, 1054, Urban II at Clermont, Francis's
own writings, Hus) and a few Reformation texts (Luther at Worms, Schleitheim,
Hubmaier, Trent), with a scattering elsewhere: a certificate of sacrifice,
Julian's letter, the Sayings of the Desert Fathers as text, Spener, Richard
Allen's own life, and the early twentieth-century fundamentalist, modernist
and social-gospel texts. Parts VII and VIII lean on modern works still in
copyright.

## Part 0. How to Read the Dead

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| Vincent of Lérins, *Commonitory* (the rule "everywhere, always, by all") | Reachable | WDB `Vincent of Lérins/THE COMMONITORY/A Commonitory.html` | Nicene and Post-Nicene Fathers (NPNF), Second Series vol. 11 | |
| Eusebius, *Church History* 1.1 (a historian states his method) | Reachable | WDB `Eusebius of Caesarea/THE CHURCH HISTORY OF EUSEBIUS/Book 1.html` | NPNF, McGiffert | Same translation as the stored books |
| Augustine, *Confessions* Book 1 | Reachable | WDB `Augustine of Hippo/Confessions/Book 1.html` | The file's title names NPNF First Series vol. 1 | Also PG #3296 (Pusey) |
| Edward Gibbon, *Decline and Fall*, chapters 15 and 16 (a hostile historian of the early church) | Reachable | PG #731 (volume 1, which holds chapter 15; chapter 16 is in a later volume, not checked) | Gibbon's own English | For reading an unsympathetic witness fairly |

## Part I. The Church Without Power (to 313)

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| Pliny the Younger, *Letters* 10.96, and Trajan's reply 10.97 | Stored | `eusebius-church-history-3` (McGiffert's note to 3.33) | McGiffert, NPNF (1890) | The full letter is in the note |
| Pliny, *Letters* 10.96 in Latin | Reachable | Perseus latinLit `data/phi1318/phi001/phi1318.phi001.perseus-lat1.xml` | Latin text | For checking a phrase against the original |
| Pliny, *Letters*, another English version | Reachable | PG #2811 | William Melmoth's translation (named in the file) | A second public-domain English, if a card wants it |
| Tacitus, *Annals* 15.44 (Nero and the Christians) | Reachable | Perseus latinLit `data/phi1351/phi005/phi1351.phi005.perseus-eng1.xml` | Church and Brodribb (1869), named in the catalog | |
| Eusebius, *Church History* 2.23 (Hegesippus on James) and 3.5 (the flight to Pella) | Reachable (2.23); Stored (3.5) | WDB `.../Book 2.html`; `eusebius-church-history-3` | NPNF, McGiffert | Jerusalem church |
| Josephus, *Antiquities* 20.9.1 (the death of James) | Reachable | PG #2848 | William Whiston (named in the file) | Jerusalem church |
| 1 Clement 5 (Peter and Paul) | Reachable | WDB `Clement of Rome/First Epistle to the Corinthians.html` | Ante-Nicene Fathers (ANF) vol. 1 | Paul's cities |
| Ignatius, *To the Romans* | Reachable | WDB `Ignatius of Antioch/Epistle to the Romans.html` | ANF vol. 1 | Martyrs |
| The Martyrdom of Polycarp | Stored | `martyrdom-of-polycarp` | ANF vol. 1 | |
| The letter of the churches of Vienne and Lyon (177) | Stored | `eusebius-church-history-5` (5.1 to 5.3) | NPNF, McGiffert | |
| The Passion of Perpetua and Felicitas (203) | Stored | `passion-of-perpetua` | ANF vol. 3 | |
| Tertullian, *Apology* (chapters 30, 39, 42, 50) | Stored | `tertullian-apology` | S. Thelwall, ANF vol. 3 (named in the file) | |
| The Epistle to Diognetus, chapter 5 | Stored | `epistle-to-diognetus` | ANF vol. 1 | |
| Justin, *First Apology* (chapters 27, 29, 65 to 67) | Stored | `justin-first-apology` | ANF vol. 1 | Exposure of infants; Sunday worship |
| Origen, *Against Celsus* 3.8 (the martyrs few) | Stored | `origen-against-celsus-3` | ANF vol. 4 | |
| Decius and the certificates of sacrifice (Eusebius 6.39 to 6.42) | Stored | `eusebius-church-history-6` | NPNF, McGiffert | |
| A surviving certificate of sacrifice (a *libellus*, 250) | Not reachable | No public-domain English found; the Greek papyri are on papyri.info, not checked here | | Tell it in the narrative |
| Cyprian, *On the Lapsed* | Stored | `cyprian-on-the-lapsed` | ANF vol. 5 | |
| Cornelius's count of the Roman church (Eusebius 6.43) | Stored | `eusebius-church-history-6` | NPNF, McGiffert | |
| Irenaeus, *Against Heresies* 3.11.8 (four Gospels) and 1.10.1 (the rule of faith) | Stored (Book 3); Reachable (Book 1) | `irenaeus-against-heresies-3`; WDB `Irenaeus/Irenaeus Against Heresies Book 1.html` | ANF vol. 1 | How they chose their books |
| Athanasius, Festal Letter 39 (367, the list of books) | Reachable | WDB `Athanasius of Alexandria/Letters of Athanasius/From Letter 39 (for 367).html` | NPNF Second Series vol. 4 | |
| The Didache (the two ways; on children) | Reachable | WDB `Didache/Didache.html` | ANF vol. 7 (carries the marker "ANF-07") | |
| Aristides, *Apology* 15 (how Christians live) | Reachable | WDB `Aristides the Philosopher/The Apology/Translation from the Syriac_1891.html` | *Texts and Studies* vol. 1 (Cambridge, 1891), edited by J. Armitage Robinson, as its prefatory matter says | Confirm the translator there before use |
| Dionysius of Alexandria on the plague (Eusebius 7.22) | Stored | `eusebius-church-history-7` | NPNF, McGiffert | |
| Cyprian, *On the Mortality*; Minucius Felix, *Octavius* | Reachable | WDB `Cyprian/Treatise 7. On the Mortality.html`; `Marcus Minucius Felix/The Octavius of Minucius Felix.html` | ANF vols. 5 and 4 | Ordinary life, the plague |
| Julian, letter to Arsacius (on Christian care for the poor) | Not reachable | Wilmer Cave Wright's Loeb translation (1913): PG's volumes 1 and 2 (#48664, #48768) never mention Arsacius, and the volume with the letters is not in the mirror list; Perseus lists no Julian texts | | Tell it in the narrative |
| Eusebius on the long peace (8.1) | Stored | `eusebius-church-history-8` | NPNF, McGiffert | |

## Part II. The Church Given Power (313 to 600)

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| Lactantius, *On the Deaths of the Persecutors* 44 and 48 (the battle at the Milvian Bridge; the letter of Licinius) | Reachable | WDB `Lucius Caecilius Firmianus Lactantius/Of the Manner in Which the Persecutors Died.html` | ANF vol. 7 | Constantine |
| Eusebius, *Life of Constantine* 1.28 to 1.32 (the vision) | Reachable | WDB `Eusebius of Caesarea/The Life of the Blessed Emperor Constantine/Book 1.html` | NPNF Second Series vol. 1 | |
| Eusebius, *Church History* Book 10 (the edicts of toleration) | Reachable | WDB `.../THE CHURCH HISTORY OF EUSEBIUS/Book 10.html` | NPNF, McGiffert | |
| The Creed of Nicaea (325) | Stored | `nicaea-325-creed` | NPNF Second Series vol. 14 | |
| The Synodal Letter of Nicaea | Stored | `nicaea-325-synodal-letter` | NPNF Second Series vol. 14 | |
| Athanasius, *Defence of the Nicene Definition* (with Eusebius of Caesarea's letter to his church) | Stored | `athanasius-de-decretis` | NPNF Second Series vol. 4 | |
| Athanasius, *On the Incarnation* | Stored | `athanasius-on-the-incarnation` | Archibald Robertson, NPNF Second Series vol. 4 | |
| Arius's letter to Eusebius of Nicomedia (in Theodoret, *Church History* 1.4) | Reachable | WDB `Theodoret of Cyrus/The Ecclesiastical History of Theodoret/Book 1.html` | NPNF, Blomfield Jackson | Chapter IV in this file ("The Letter of Arius to Eusebius, Bishop of Nicomedia") |
| Socrates, *Church History* 1.8 to 1.9 (Nicaea) | Reachable | WDB `Socrates Scholasticus/THE ECCLESIASTICAL HISTORY/Book 1.html` | NPNF Second Series vol. 2 | |
| Athanasius, *History of the Arians* | Reachable | WDB `Athanasius of Alexandria/History of the Arians/Part 1.html` (and parts 2 to 8) | NPNF Second Series vol. 4 | The long fight to 381 |
| Jerome, *Dialogue against the Luciferians* 19 ("the whole world groaned") | Reachable | WDB `Jerome/The Dialogue Against the Luciferians.html` | NPNF Second Series vol. 6 | |
| Gregory of Nazianzus, the theological orations (27 to 31) | Reachable | WDB `Gregory of Nazianzus/Orations/Oration 29.html` and the others | NPNF Second Series vol. 7 | |
| The creed of Constantinople (381) | Reachable | WDB `Council of Constantinople of 381/The Holy Creed.html` | NPNF Second Series vol. 14 | Also Creeds.json `creeds/nicene_creed.json` |
| Athanasius, *Life of Antony* | Reachable | WDB `Athanasius of Alexandria/Life of Antony.html` | NPNF Second Series vol. 4 | The desert |
| Palladius, *Lausiac History* | Reachable | WDB `Palladius of Galatia/The Lausiac History/Text.html` | W. K. Lowther Clarke (1918), named in the introduction | |
| The Sayings of the Desert Fathers | Not reachable | WDB holds only PDF scans (`Sayings of the Desert Fathers/Part 1.pdf` to part 4), translation and rights not stated, which no gate can read | | Use Palladius or the *Life of Antony* for cards; tell the Sayings in the narrative |
| Augustine, *Confessions* 8.12 (in the garden) | Reachable | WDB `Augustine of Hippo/Confessions/Book 8.html`; PG #3296 | NPNF First Series vol. 1; Pusey (PG) | |
| Augustine, *City of God* 14.28 (two loves, two cities) and 19.17 | Reachable | WDB `Augustine of Hippo/The City of God/Book 14.html`, `Book 19.html` | NPNF, Marcus Dods | Same translation as the stored Book 5 |
| Possidius, *Life of Augustine* | Reachable | WDB `Possidius/Life of St Augustine/English translation.html` | Herbert T. Weiskotten (Princeton, 1919), named in the introduction | |
| The Definition of Chalcedon (451) and Leo's Tome | Reachable | WDB `Council of Chalcedon of 451/The Definition of Faith of the Council of Chalcedon.html`, `.../The Tome of St. Leo.html`; Creeds.json `creeds/chalcedonian_definition.json` | NPNF Second Series vol. 14 | |
| The churches that parted after Chalcedon: Nestorius, *The Bazaar of Heracleides*; Severus of Antioch, letters | Reachable | WDB `Nestorius/The Bazaar of Heracleides/...`; `Severus of Antioch/Letters/Letters 1-61.html` | The Bazaar's translation is named in its introduction file (not read); Severus's letters were transcribed from the *Patrologia Orientalis*, as the online preface says | Confirm translators and dates before use |
| Ambrose, Letters 40 and 41 (Callinicum, 388) and 51 (Thessalonica, 390) | Stored | `ambrose-letter-40`, `ambrose-letter-41`, `ambrose-letter-51` | NPNF Second Series vol. 10 | The complete 1881 Oxford translation is also in WDB, as `Letters 41-50.html` and the like |
| Theodoret, *Church History* 5.17 to 5.18 (Thessalonica) | Stored | `theodoret-church-history-5` | NPNF, Blomfield Jackson | |
| Augustine, *City of God* 5.26 (Theodosius's penance) | Stored | `augustine-city-of-god-5` | NPNF, Marcus Dods | |
| Sozomen, *Church History* 7.25 (Thessalonica) | Reachable | WDB `Hermias Sozomen/THE ECCLESIASTICAL HISTORY/Book 7.html` | NPNF Second Series vol. 2 | |

## Part III. The Long Middle (600 to 1500)

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| The Rule of Benedict | Reachable | PG #50040 | An American translation of 1947 from Cuthbert Butler's Latin text, as the file's front matter says; Project Gutenberg treats it as public domain in the United States | Also TCP A08266 (1632) and A08254 (1517), old spelling |
| Gregory the Great, *Dialogues* Book 2 (the life of Benedict) | Reachable | WDB `Gregory the Dialogist/Dialogues/Book 2.html` | "P.W." (Paris, 1608), re-edited by Edmund G. Gardner (London, 1911), as the introduction names it | |
| Patrick, *Confession* | Reachable | PG #18482 (*The Most Ancient Lives of Saint Patrick*, which prints the Confession and the Letter) | As given in that edition | Confirm its translator and date before use |
| Bede, *Ecclesiastical History* (Augustine of Canterbury, Whitby, Aidan) | Reachable | PG #38326 | "A Revised Translation", 1907, as the file says | Also TCP A07396 (Thomas Stapleton, 1565), old spelling |
| Adomnán, *Life of Columba* | Reachable | PG #38682 | The translator is not named in the file's opening; read its front matter | The mission north |
| Boniface's letters; Willibald's *Life of Boniface* | Not reachable | Not in WDB, PG or TCP | | Tell it in the narrative |
| The Xi'an monument (781), the church of the East in China | Not reachable | James Legge's 1888 translation is public domain but its hosts were refused; not in PG or WDB | | Tell it in the narrative |
| 1054: Humbert's bull and the patriarch's reply | Not reachable | No public-domain English found | | Tell it in the narrative |
| Urban II at Clermont (1095), as Fulcher of Chartres and Robert the Monk report it | Not reachable | Public-domain translations (Munro, 1895; Krey, 1921) live on Fordham's Sourcebook, which was refused; not in PG | | Tell it in the narrative |
| Geoffrey of Villehardouin, the Fourth Crusade and the sack of Constantinople (1204) | Reachable | PG #6032 | The Everyman translation (London: J. M. Dent, 1908), as the file says | A crusade turned on Christians |
| Thomas Aquinas, *Summa* II-II q. 40 (on war) | Reachable | WDB `Thomas Aquinas/Summa Theologiae/Second Part of the Second Part/Treatise on The Theological Virtues/Question 40.html`; PG #18755 | English Dominican Province (named in PG) | The just-war frame the crusades strained |
| Francis of Assisi, his own writings (the Canticle, the Rule, the Testament) | Not reachable | PG has only lives of Francis (#18787 Sabatier, #6367 Chalippe), not his writings | | A life can be quoted as a life, not as Francis |
| Wycliffe, *Wycket*, and the prologue attributed to him | Reachable, old spelling | TCP A15299 (1546), A15297 (1550) | Sixteenth-century printings | |
| Jan Hus, letters; the Council of Constance | Not reachable | Not in PG, WDB or TCP (Workman and Pope's 1904 translation was not found) | | Tell it in the narrative |
| Foxe's account of Wycliffe and Hus | Reachable, old spelling | TCP A67922 (1583, vol. 1) | | PG #22400 is a nineteenth-century abridgement that runs long past Foxe's death; quote it only as that edition |

## Part IV. Reformations (1500 to 1650)

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| Luther, the Ninety-five Theses (1517) | Reachable | PG #274 | From *Works of Martin Luther* (Philadelphia: A. J. Holman, 1915), vol. 1, as the file says; the translator is not named in its opening | |
| Luther, *The Freedom of a Christian* (1520) | Reachable | PG #1911 (with the letter to Leo X) | Translator not named in the header; identify before use | Also TCP A06524 (1579), old spelling |
| Luther, Small and Large Catechisms | Reachable | PG #1670 (Robert E. Smith's translation), #1722 (Bente and Dau) | Named in the files | Smith's is a modern translation; confirm its terms before storing |
| Luther, *Table Talk* (selections) | Reachable | PG #9841 | Translator named in the file | |
| Luther at Worms (1521, "Here I stand") | Not reachable | No public-domain English text of the speech found in PG, TCP or WDB | | Whether he said those words is debated; tell it carefully |
| The Augsburg Confession (1530) and its Apology | Reachable | PG #275, #6744 (Bente and Dau) | | Also TCP A22612 (1536), old spelling |
| Calvin, *Institutes* | Reachable | PG #45001 (vol. 1) | Translator named on the title page; read before use | Also TCP A17662 (Thomas Norton, 1561), old spelling |
| Calvin, letters | Reachable | PG #45423 (Bonnet's edition, vol. 1) | | |
| Zwingli, the 67 Articles (1523) | Reachable | Creeds.json `creeds/zwinglis_67_articles.json` | The file's own source note | |
| The Heidelberg Catechism, the Belgic Confession, the Canons of Dort | Reachable | Creeds.json `creeds/heidelberg_catechism.json`, `belgic_confession_of_faith.json`, `canons_of_dort.json` | The files' own source notes | |
| The Schleitheim Confession (1527) | Not reachable | No public-domain English found (not in Creeds.json, PG or TCP) | | The site's creeds library has a summary; tell it in the narrative |
| Balthasar Hubmaier, *On Heretics and Those Who Burn Them* | Not reachable | Not found | | |
| *Martyrs Mirror* (Dirk Willems and others) | Reachable | PG #65855 | Joseph F. Sohm (named in the file) | The Anabaptists |
| The Council of Trent, canons and decrees | Not reachable | Waterworth's 1848 translation is public domain but was not found in any reachable store; TCP has only Protestant replies and Sarpi's history (A11516, 1629) | | Tell it in the narrative |
| Tyndale, *The Obedience of a Christian Man* (1528) and his New Testament (1534) | Reachable, old spelling | TCP A14136, A68940 | | |
| Foxe on Tyndale's death | Reachable, old spelling | TCP A67927 (1583, vol. 2, part 2) | | |
| The Edict of Nantes (1598) | Reachable, old spelling | TCP A06372 (an English printing of 1622) | | The wars of religion |
| Schiller, *History of the Thirty Years' War* | Reachable | PG #566 | A. J. W. Morrison's translation (named in the file) | A historian, not a primary source; the Peace of Westphalia's text itself was not found |

## Part V. Revival, Reason, and Mission (1650 to 1900)

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| Pietism: Spener, *Pia Desideria* | Not reachable in the public domain | The standard English (Tappert, 1964) is in copyright; not in PG or TCP | | Summarize |
| John Wesley, *Journal* (Aldersgate, 24 May 1738) | Reachable, old spelling | TCP N22587 (an extract of the journals, 1795, volume I) | | Confirm the volume reaches May 1738 |
| John Wesley, *Sermons* | Reachable | PG #59743 (*Works*, 1771, volume 1, which is sermons) | | Also TCP N21366 (1801), old spelling |
| John Wesley, *Thoughts upon Slavery* (1774) | Reachable, old spelling | TCP N10870 (1774) | | |
| George Whitefield, letters and sermons | Reachable | PG #68976 (*Works*, volume 1: letters from 1734) | | Sermons as printed in 1739: TCP N03637 and others, old spelling |
| The Enlightenment's challenge: Paine, *The Age of Reason* | Reachable | PG #3743 | | Also TCP N20900 |
| Hume, *Dialogues Concerning Natural Religion* | Reachable | PG #4583 | | |
| Pascal, *Pensées* | Reachable | PG #18269 | The file reproduces an E. P. Dutton edition (its 1958 printing); confirm the translator before use | |
| Equiano, *The Interesting Narrative* (1789) | Reachable | PG #15399 | | Also TCP K053415.001 (1789), N18028 (1791) |
| John Newton, *Thoughts upon the African Slave Trade* (1788) | Reachable | PG #68056 | | |
| John Woolman, *Journal*; *Some Considerations on the Keeping of Negroes* | Reachable | PG #37311; TCP N05781 (1754, old spelling) | | |
| Anthony Benezet; Samuel Sewall, *The Selling of Joseph* (1700); Samuel Hopkins | Reachable, old spelling | TCP N08023, N00790, N15010 | | Christian opponents of slavery |
| Thomas Clarkson, history of the abolition of the slave trade | Reachable | PG #10633 | | |
| William Wilberforce, *A Practical View* | Reachable | PG #25709 | | |
| Bartolomé de las Casas, *A Brief Account of the Destruction of the Indies* | Reachable | PG #20321 | | The church and conquest |
| The missionary century: Carey (a life), Judson (a life), Livingstone's *Missionary Travels*, Mary Slessor (a life) | Reachable | PG #2056, #70894, #1039, #8906 | | Carey's own *Enquiry* (1792) was not found; the lives are secondary |

## Part VI. The American Experiment

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| Roger Williams, *The Bloudy Tenent of Persecution* (1644) | Reachable, old spelling | TCP A66445 | | Also *The Bloody Tenent Yet More Bloody* (A96610, 1652) |
| John Clarke, *Ill Newes from New-England* (1652) | Reachable, old spelling | TCP A33276 | | The Baptists whipped in Boston |
| Thomas Helwys, *A Short Declaration of the Mystery of Iniquity* (1612) | Reachable, old spelling | TCP A02915 (marked "Restricted" in the TCP index) | | Confirm the TCP's terms before storing |
| Leonard Busher, *Religions Peace* (1614) | Reachable, old spelling | TCP A17345 | | |
| The London Baptist Confession (1644/1646) and the 1689 Confession | Reachable | TCP A80328 (1646, old spelling, "Restricted"); Creeds.json `creeds/london_baptist_1689.json` | | |
| William Bradford, *Of Plimoth Plantation* | Reachable | PG #24950 | | |
| Isaac Backus, *An Appeal to the Public for Religious Liberty* (1773) | Reachable, old spelling | TCP N09952 | | |
| Virginia's bill for establishing religious freedom (1779 printing) | Reachable, old spelling | TCP N15246 | | Jefferson's letter to the Danbury Baptists (1802) was not found |
| Jonathan Edwards, *Sinners in the Hands of an Angry God* (1741) | Reachable | PG #34632 (*Selected Sermons*); TCP N03833 (1741) | | |
| Jonathan Edwards, *Life of David Brainerd* | Reachable | PG #65066 | | |
| Absalom Jones and Richard Allen, *A Narrative of the Proceedings of the Black People* (1794) | Reachable, old spelling | TCP N20688 | | |
| Richard Allen, *The Life, Experience, and Gospel Labours* (1833) | Not reachable | Not in PG or TCP; Documenting the American South was refused | | Tell it in the narrative |
| Frederick Douglass, *Narrative* (1845), with its appendix on "the Christianity of this land" | Reachable | PG #23 | | |
| Frederick Douglass, *My Bondage and My Freedom* (1855) | Reachable | PG #202 | | |
| David Walker, *Appeal* (1829), with Henry Highland Garnet's address | Reachable | PG #16516 | | |
| Sojourner Truth, *Narrative*; Harriet Jacobs, *Incidents in the Life of a Slave Girl*; *The Confessions of Nat Turner* | Reachable | PG #1674, #11030, #15333 | | |
| Lemuel Haynes, sermons | Reachable, old spelling | TCP N25513 and others | | |
| Abraham Lincoln, Second Inaugural Address (1865) | Reachable | PG #8 | | The Civil War as a theological crisis |

## Part VII. The Twentieth Century

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| *The Fundamentals* (1910 to 1915); Harry Emerson Fosdick, "Shall the Fundamentalists Win?" (1922); J. Gresham Machen, *Christianity and Liberalism* (1923) | Not reachable | All published before 1931, so public domain in the United States, but none is in PG or any reachable store | | Tell them in the narrative; a later run may find them |
| Charles Sheldon, *In His Steps* (1897) | Reachable | PG #4540 | | The social gospel in popular form |
| W. E. B. Du Bois, *The Souls of Black Folk* (1903), "Of the Faith of the Fathers" | Reachable | PG #408 | | |
| Ida B. Wells, *Southern Horrors* (1892) | Reachable | PG #14975 | | Lynching and the churches' silence |
| The Barmen Declaration (1934) | In copyright (in English) | | | Quote briefly with attribution, or summarize (master plan 7.2) |
| Dietrich Bonhoeffer | In copyright | | | Summarize |
| Martin Luther King Jr., "Letter from Birmingham Jail" (1963), and the clergymen's statement it answered | In copyright | | | Quote briefly with attribution, or summarize |
| The global church's growth (Lausanne, 1974, and after) | In copyright | | | No statistics without a checked primary report (master plan section 2) |
| Rauschenbusch, *Christianity and the Social Crisis* (1907) | Not reachable | Public domain, not in PG's mirror list | | |

## Part VIII. After Christendom

| Source | Status | Where | Translation or edition | Notes |
|---|---|---|---|---|
| The Religious Right and the culture war (Falwell, the Moral Majority, Schaeffer) | In copyright | | | Summarize, citing the works by name |
| The church in post-Christian America (Newbigin, Taylor, Bellah, Smith and Denton) | In copyright | | | Name the idea, not only the scholar (CLAUDE.md, the Scholarship Standard) |
| Reading your own moment: Augustine, *City of God* | Stored (Book 5); Reachable (the rest) | `augustine-city-of-god-5`; WDB | NPNF, Marcus Dods | The synthesis session returns to the two cities |
| Statistics on belief and practice | In copyright, and barred | | | No statistic appears unless a person with access has checked it (master plan section 2) |

## Where the Project Gutenberg mirror files are

Each is `https://raw.githubusercontent.com/GITenberg/<repository>/master/<file>`,
fetched on 2026-10-27:

| PG # | Repository | File |
|---|---|---|
| 8 | Abraham-Lincoln-s-Second-Inaugural-Address_8 | 8-0.txt |
| 23 | Narrative-of-the-Life-of-Frederick-Douglass-an-American-Slave_23 | 23.txt |
| 202 | My-Bondage-and-My-Freedom_202 | 202.txt |
| 274 | Disputation-of-Doctor-Martin-Luther-on-the-Power-and-Efficacy-of-Indulgences_274 | 274.txt |
| 275 | The-Augsburg-Confession--13-The-confession-of-faith-which-was-submitted-to-His-Imperial-Majesty__275 | 275.txt |
| 408 | The-Souls-of-Black-Folk_408 | 408.txt |
| 566 | The-History-of-the-Thirty-Years-War_566 | 566.txt |
| 731 | History-of-the-Decline-and-Fall-of-the-Roman-Empire---Volume-1_731 | 731.txt |
| 1039 | Missionary-Travels-and-Researches-in-South-Africa_1039 | 1039.txt |
| 1670 | Luther-s-Little-Instruction-Book--The-Small-Catechism-of-Martin-Luther_1670 | 1670.txt |
| 1674 | The-Narrative-of-Sojourner-Truth_1674 | 1674.txt |
| 1722 | Martin-Luther-s-Large-Catechism-translated-by-Bente-and-Dau_1722 | 1722.txt |
| 1911 | Concerning-Christian-Liberty--with-Letter-of-Martin-Luther-to-Pope-Leo-X._1911 | 1911.txt |
| 2056 | The-Life-of-William-Carey-Shoemaker--amp--Missionary_2056 | 2056.txt |
| 2811 | Letters-of-Pliny_2811 | 2811.txt |
| 2848 | Antiquities-of-the-Jews_2848 | 2848.txt |
| 3296 | The-Confessions-of-St.-Augustine_3296 | 3296.txt |
| 3743 | The-Writings-of-Thomas-Paine---Volume-4--1794-1796---The-Age-of-Reason_3743 | 3743.txt |
| 4540 | In-His-Steps_4540 | 4540.txt |
| 4583 | Dialogues-Concerning-Natural-Religion_4583 | 4583.txt |
| 6032 | Memoirs-or-Chronicle-of-the-Fourth-Crusade-and-the-Conquest-of-Constantinople_6032 | 6032.txt |
| 6367 | The-Life-and-Legends-of-Saint-Francis-of-Assisi_6367 | 6367.txt |
| 6744 | The-Apology-of-the-Augsburg-Confession_6744 | 6744.txt |
| 8906 | Mary-Slessor-of-Calabar-Pioneer-Missionary_8906 | 8906-8.txt |
| 9841 | Selections-from-the-Table-Talk-of-Martin-Luther_9841 | 9841.txt |
| 10633 | The-History-of-the-Rise-Progress-and-Accomplishment-of-the-Abolition-of-the-African-Slave-Tra__10633 | 10633.txt |
| 11030 | Incidents-in-the-Life-of-a-Slave-GirlWritten-by-Herself_11030 | 11030.txt |
| 14975 | Southern-Horrors--Lynch-Law-in-All-Its-Phases_14975 | 14975.txt |
| 15333 | The-Confessions-of-Nat-Turner--13-The-Leader-of-the-Late-Insurrections-in-Southampton-Va.-As-__15333 | 15333.txt |
| 15399 | The-Interesting-Narrative-of-the-Life-of-Olaudah-Equiano-Or-Gustavus-Vassa-The-AfricanWritten__15399 | 15399.txt |
| 16516 | Walker-s-Appeal-with-a-Brief-Sketch-of-His-LifeAnd-Also-Garnet-s-Address-to-the-Slaves-of-the__16516 | 16516.txt |
| 18269 | Pascal-s-Pens-es_18269 | 18269.txt |
| 18482 | The-Most-Ancient-Lives-of-Saint-PatrickIncluding-the-Life-by-Jocelin-Hitherto-Unpublished-in-__18482 | 18482.txt |
| 18755 | Summa-Theologica-Part-II-II--Secunda-Secundae---13-Translated-by-Fathers-of-the-English-Domin__18755 | 18755.txt |
| 18787 | Life-of-St.-Francis-of-Assisi_18787 | 18787.txt |
| 20321 | A-Brief-Account-of-the-Destruction-of-the-Indies--13-Or-a-faithful-NARRATIVE-OF-THE-Horrid-an__20321 | 20321.txt |
| 22400 | Fox-s-Book-of-MartyrsDeaths-of-the-Primitive-Protestant-Martyrs_22400 | 22400.txt |
| 24950 | Bradford-s-History-of-Plimoth-Plantation-From-the-Original-Manuscript.-With-a-Report-of-the-P__24950 | 24950.txt |
| 25709 | A-Practical-View-of-the-Prevailing-Religious-System-of-Professed-Christians-in-the-Middle-and__25709 | 25709.txt |
| 34632 | Selected-Sermons-of-Jonathan-Edwards_34632 | 34632.txt |
| 37311 | John-Woolman-s-Journal_37311 | 37311.txt |
| 38326 | Bede-s-Ecclesiastical-History-of-England_38326 | 38326.txt |
| 38682 | The-Life-of-Saint-Columba-Abbot-and-Apostle-of-the-Northern-Picts_38682 | 38682.txt |
| 45001 | Institutes-of-the-Christian-Religion--Vol.-1-of-2-_45001 | 45001.txt |
| 45423 | Letters-of-John-Calvin-Volume-I--of-4-Compiled-from-the-Original-Manuscripts-and-Edited-with-__45423 | 45423.txt |
| 48664 | The-Works-of-the-Emperor-Julian-Vol-1_48664 | 48664-0.txt |
| 48768 | The-Works-of-the-Emperor-Julian-Vol-2_48768 | 48768.txt |
| 50040 | St-Benedicts-Rule-for-Monasteries_50040 | 50040.txt |
| 59743 | The-Works-of-the-Rev-John-Wesley-Vol-1-of-32_59743 | 59743-0.txt |
| 65066 | The-Life-of-Rev-David-Brainerd-Chiefly-Extracted-from-His-Diary_65066 | 65066-0.txt |
| 65855 | The-Bloody-Theatre-or-Martyrs-Mirror-of-the-Defenseless-Christians_65855 | 65855-0.txt |
| 68056 | Thoughts-upon-the-African-Slave-Trade_68056 | 68056-0.txt |
| 68976 | The-works-of-the-Reverend-George-Whitefield-MA-Vol-1-of-6_68976 | 68976-0.txt |
| 70894 | The-life-of-Adoniram-Judson_70894 | 70894-0.txt |

A TCP text is at
`https://raw.githubusercontent.com/textcreationpartnership/<id>/master/<id>.xml`.
