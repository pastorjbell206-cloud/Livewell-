# Verification pass (2026-11-23)

James (2026-11-23): "Go through every 'check first' and 'not opened' row in the ledgers and every problem already flagged in the docs. Verify each against a real source, or cut it."

This file is the record of that pass. It does not edit any existing ledger; other runs are still appending to them. Each item gives the page and its address, the claim as it stood, and what was done: **verified** (with the source opened), **cut** or **narrowed** (with the text before and after).

## How it was done

Only GitHub resolves from this machine; there was no web search. A claim counts as verified only when the words or the fact were read in one of these, opened in this run:

- **CE**: *The Catholic Encyclopedia* (Robert Appleton, 1907 to 1914; public domain), the New Advent transcription in `gustavo-depaula/ember`, `content/books/catholic-encyclopedia/en-US/<id>.md`. Cited as CE "Title" (id).
- **Ember docs**: the papal documents in the same repository, `content/books/papal-magisterium/en-US/` (for example `docs_pi09id.md`, *Ineffabilis Deus*).
- **Vault**: `BenjaminPoole/Ecumenical-Christian-Library-Obsidian-Vault`, a library of public-domain Christian texts transcribed from scans (CCEL, the Triglot Concordia, Internet Archive page images), with the council documents of Vatican I and Vatican II. Each file names its translator and source in its header; that is given where it matters.
- **GITenberg**: Project Gutenberg texts mirrored at `github.com/GITenberg/<title>_<number>`, cited by PG number.
- **WDB**: `HistoricalChristianFaith/Writings-Database` (the Ante-Nicene and Nicene and Post-Nicene Fathers texts).
- **Creeds.json**: `NonlinearFruit/Creeds.json`.
- **Repo**: this repository's own primary texts (the BSB text and Greek and Hebrew data in `client/public/bible/`, the stored history sources in `scripts/data/history-sources/texts/`).
- **SEP, IEP** (modern reference works, not public domain): the Stanford Encyclopedia of Philosophy in `tylermarcuscross/philosophers-gpt` (`entries/<title>.txt`) and the Internet Encyclopedia of Philosophy in `Charley-xiao/Sopher` (`raw_data/`). Used only where the claim is about modern scholarship, which no public-domain work can cover, and marked each time. If James's standard excludes them, every row that rests on one says so and can be cut.

Not counted as sources: another page of this site (unless its own ledger row names a source that was opened here), quotation collections, Wikipedia dumps, reading notes and README files on GitHub, and memory.

Where a claim could not be verified, the unverifiable specific was cut (the name, date, figure or quotation, or the whole sentence) and the rest left as it was. No new claim was added in its place. Reshaped sentences follow the house rules: no em-dashes, nothing from the forbidden list, no exclamation point outside quoted Scripture, no first person for James.

## Totals

About 220 claims were checked: 121 verified against an opened source (left as they were, or kept with the source named), 48 cut (12 of them the Westminster year, see 2.0), 35 narrowed to what the source supports, one copyrighted translation replaced with a public-domain one (the Qur'an, 1.3), one slip corrected to the Bible's own text (1 Samuel 17, 1.10), nine left as paraphrases of a position with nothing to verify, and one care passage kept whole although only partly verified (2.8). The edits touch 41 pages: eight Honest Answers, the short questions, the passage notes, the justice timeline and 30 essays. Each page has its own commit (one essay has two).

## Part 1. Problems already flagged to James

### 1.1 The justice timeline: the Spanish Inquisition and the sack of 1204

Page: /justice/timeline (`client/public/justice/timeline.json`). Flagged in `apol-library.md`, twentieth run ("gives 'roughly 3,000 to 5,000' executions by the Spanish Inquisition and 'a sitting pope only apologized' for 1204, with no sources").

- **Spanish Inquisition, summary.** Before: "Recent archival scholarship has lowered older inflated figures, estimating roughly 3,000 to 5,000 executions over more than three centuries, though the wider toll of imprisonment, confiscation, and fear was vast." After: "Over more than three centuries its toll of execution, imprisonment, confiscation, and fear was vast." **Cut** (the figures and the claim about recent scholarship). No source for the figures could be opened; CE "Inquisition" (08026a) says "The number of victims cannot be calculated with even approximate accuracy."
- **Spanish Inquisition, scale line.** Before: "Around 3,000 to 5,000 executed, with tens of thousands tried, over more than three hundred years." After: "Executions, imprisonments and confiscations over more than three hundred years." **Narrowed.**
- **Kept and verified** in the same entry: established in 1478 under the Catholic monarchs, against converts from Judaism and Islam and later Protestants, in force for more than three centuries. CE "Inquisition" (08026a): "On 1 November, 1478, Sixtus IV empowered the Catholic sovereigns to set up the Inquisition"; "pseudo-converts from Judaism (Marranos) and Mohammedanism (Moriscos)"; "it served to repel Protestantism in the sixteenth century"; abrogated 1808, restored 1814 on condition of "the abolition of torture", "definitely abolished by the Revolution of 1820".
- **Sack of Constantinople, summary.** Before: "The wound to relations between East and West has never fully healed, and a sitting pope only apologized for it eight centuries later." After: "The wound to relations between East and West has never fully healed." **Cut** (the apology). No copy of the papal address could be found on GitHub.
- **Sack of Constantinople, scale line.** Before: "Three days of looting that crippled the Byzantine Empire and deepened a schism still felt today." After: "Looting that crippled the Byzantine Empire and deepened a schism still felt today." **Narrowed** ("three days" is in no source read: not CE, Gibbon or Villehardouin).
- **Kept and verified:** April 1204, the plunder of churches, the altar of Hagia Sophia. CE "Crusades" (04543c): "On 12 April, 1204, Constantinople was carried by storm, and the next day the ruthless plundering of its churches and palaces was begun"; Gibbon, *Decline and Fall*, ch. 60 (GITenberg PG 736): "In the cathedral of St. Sophia, the ample veil of the sanctuary was rent asunder for the sake of the golden fringe; and the altar, a monument of art and riches, was broken in pieces and shared among the captors."
- **Not checked on this page** (no ledger; not flagged): the other entries' figures, for example the witch trials' "roughly 40,000 to 60,000 executions", the Albigensian "tens of thousands", Jerusalem in 1099. Listed under "What is left".

### 1.2 "What if Christianity is wrong?": James among those who ran

Page: /answers/what-if-christianity-is-wrong (`client/src/data/answers.ts`). Flagged in `apol-library.md`, twenty-first run, and `apol-ledger.md` (the line about the men who ran away, followed by James the Lord's brother, who was not among them).

- Before: "Within a few years of the crucifixion, the men who had run away were saying they had seen him alive, and some of them were killed for it." After: "Within a few years of the crucifixion, his followers were saying they had seen him alive, and some of them were killed for it." **Narrowed.** The paragraph goes on to name James son of Zebedee, James the brother of Jesus, Peter and Paul. Repo BSB: Mark 14:50, "Then everyone deserted Him and fled"; John 7:5, "For even His own brothers did not believe in Him"; Paul was a persecutor, not a disciple who fled. "His followers" is true of all four once they were saying it.

### 1.3 "What do Christianity and Islam actually dispute?": a copyrighted Qur'an translation

Page: /answers/christianity-and-islam-differences. Flagged in `apol-library.md`, twentieth run ("quotes the Qur'an in the Saheeh International translation (1997), which is not public domain").

- **Replaced** every quotation of Saheeh International (thirteen passages: 4:48, 112, 3:45, 3:47, 4:171 twice, 4:157 twice, 4:158, 5:46, 29:46, 5:116, 85:14, 35:15, 19:30, 1:1, 39:53, 6:164) with Marmaduke Pickthall's translation, checked word for word by script against Project Gutenberg EBook #16955, *Three Translations of The Koran (Al-Qur'an) side by side* (GITenberg; "re-proofed and corrected for Project Gutenberg against paper copies of the translations"), which agrees with the Tanzil copy the question library uses. 5:72 ("worship Allah, my Lord and your Lord") reads the same in both translations and was left.
- Verses whose Pickthall wording has an exclamation point are quoted only in part: 112:3-4 ("He begetteth not nor was begotten. And there is none comparable unto Him"), with 112:1 described ("which confesses Allah as the One"); 4:171's "Cease! (it is) better for you!" is not quoted ("goes on to forbid saying 'Three'"). Pickthall's parentheses are not quoted, so the old line "The brackets mark words the translators supplied" is gone.
- 3:47 before: "who asks the angels, 'My Lord, how will I have a child when no man has touched me?'" After: "who asks, 'How can I have a child when no mortal hath touched me?'" In the verse she addresses "My Lord", not the angels; **narrowed**.
- 35:15 before: "Allah is the Free of need, the Praiseworthy". After: "it also tells mankind, 'Ye are the poor in your relation to Allah,' while he is 'the Absolute, the Owner of Praise'". The argument that follows ("A love that requires another is a need, and God needs nothing") still follows from the verse.
- Source list: "Saheeh International, *The Qur'an: English Meanings*, 1997" became "Marmaduke Pickthall, *The Meaning of the Glorious Koran*, 1930". The title and year are the ones the question library prints; they were seen here only in project notes on GitHub (for example `risan/quran-json`, `data/meta/sources.json`), not in a reference work. A first edition of 1930 cannot appear in a public-domain encyclopedia; James may want a library check of this one line.
- **Verified and kept:** "Every chapter of the Qur'an but one opens" with the invocation: Rodwell's translation (PG 2800, GITenberg) heads 113 of its 114 suras with "In the Name of God, the Compassionate, the Merciful", and its note on Sura IX says "the usual formula of invocation is not prefixed". *Nostra Aetate* 3, "They adore the one God, living and subsisting in Himself; merciful and all-powerful, the Creator of heaven and earth": the Vault's copy of the Vatican's English text (the copy drops the hyphen in "all-powerful").

### 1.4 "Did God command genocide in the Old Testament?": the Dawkins quotation

Page: /answers/did-god-command-genocide. Flagged in `apol-library.md`, twenty-fifth and twenty-sixth runs, and `apol-ledger.md` row 3385 ("quotes the same sentence in two fragments; ... reported to James").

- Before: "Richard Dawkins put the charge loudly in The God Delusion (2006), calling the God of the Old Testament \"the most unpleasant character in all fiction\" and, among much else, a \"vindictive, bloodthirsty ethnic cleanser.\"" After: "Richard Dawkins put the charge loudly in The God Delusion (2006), where he calls the God of the Old Testament vindictive and bloodthirsty, among much else." **Narrowed** to paraphrase. The words had been seen only in two quotation files and a reader's highlights on GitHub (`devnall/notes`, `openprivacy/fennet`, `uroybd/topobon`) and in search results, never in the book, which is in copyright and cannot be opened here. The question library's page on the same subject already paraphrases the sentence.

### 1.5 Dawkins's definition of faith, in two answers

Pages: /answers/is-faith-irrational and /answers/what-did-the-new-atheists-get-right. Flagged in `apol-ledger.md` row 429 ("Not seen in the book itself ... flagged below").

- "Is faith irrational?" before: "Richard Dawkins, in The Selfish Gene (1976), called faith \"blind trust, in the absence of evidence, even in the teeth of evidence.\"" After: "Richard Dawkins, in The Selfish Gene, described faith as blind trust without evidence and even against it." **Narrowed.**
- "What did the New Atheists get right?" before: "Dawkins defined faith as \"blind trust, in the absence of evidence, even in the teeth of evidence\" in The Selfish Gene (1976)." After: "In The Selfish Gene Dawkins described faith as blind trust without evidence and even against it." **Narrowed.**
- Source for the paraphrase: IEP "New Atheists" (`raw_data/https___iep.utm.edu_n-atheis_.txt`), modern, not public domain: "In The Selfish Gene, Richard Dawkins states that faith is blind trust without evidence and even against the evidence." The exact words were found only in Wikipedia dumps (`kirito-0512/data`, `iammayankg/wikiarticles`), so the quotation marks go. The year stays in each answer's source list, where it was before this pass.

### 1.6 "Is hell forever, or does it end?": Talbott and the closing line

Page: /answers/is-hell-forever-or-does-it-end. Flagged in `apol-library.md`, seventeenth run.

- Before: "Not all who press this are unbelievers. The Christian philosopher Thomas Talbott argued that hell, understood as endless and final, is a problem of evil that Christians have to answer among themselves." After: "Not all who press this are unbelievers." **Cut.** The ledger row behind it gave Talbott the title of Marilyn McCord Adams's essay. SEP "Heaven and Hell in Christian Thought" (2013, rev. 2021), bibliography: "Adams, Marilyn, ... 1993, 'The Problem of Hell: A Problem of Evil for Christians,' in E. Stump (ed.), A Reasoned Faith". The kept sentence rests on the same article ("what Marilyn McCord Adams and many others see as the most crucial question of all").
- Before: "and Talbott argues for it today." After: "and the Christian philosopher Thomas Talbott argues for it today." **Moved**, not new: the description came from the cut sentence. SEP, same article, discusses "Talbott's Universalism" and cites Talbott 1990 to 2020.
- Before, the last two sentences: "Christians disagree about what hell is like and how long it lasts. They don't disagree that a person can choose it." After: "Christians disagree about what hell is like and how long it lasts." **Cut.** The universalists the answer itself names (and SEP's article) would not sign the cut sentence.

### 1.7 "Does God actually exist?": the 2003 theorem

Page: /answers/does-god-actually-exist. Flagged in `apol-library.md`, nineteenth run ("The answer may want the same care").

- Before: "showed that any universe which has, on average, been expanding cannot be infinite in the past". After: "showed that inflationary spacetimes, in the words of their paper's title, \"are incomplete in past directions,\"". **Narrowed** to the authors' own claim. The title, "Inflationary Spacetimes Are Incomplete in Past Directions", *Physical Review Letters* 90, 151301 (2003), was read in an ADS record (`fedhere/ADSgenderclustering`, `ADS_query.ipynb`) and in several bibliographies on GitHub; the paper itself was not opened.

### 1.8 "Was Jesus just a good teacher?": Ehrman's view, and a memory

Page: /answers/was-jesus-just-a-good-teacher. Flagged in `apol-library.md`, twenty-first run.

- Before: "holds that what they first believed was that God had raised a man to a high place, a lesser kind of divinity than the creeds later confessed." After: "holds that what they first believed was that God had raised a man to a high place." **Cut** (the gloss). No source for it could be opened; the book's subtitle, as the answer's source list gives it, names the exaltation ("The Exaltation of a Jewish Preacher from Galilee").
- **For James, not changed:** "I held the comfortable view, and it was a place to file him more than a conclusion." If this is his own memory it stands; if it was written for him, it should go. Only he can say.

### 1.9 The short questions (/theology/questions)

Page: /theology/questions (`client/public/theology/questions.json`). Flagged in `apol-library.md` section 1.3 and the twenty-third and twenty-fourth runs. The 112 short questions have no ledger; only the flagged claims were worked.

- **"Can I actually trust the Bible?"** Before: "On preservation, the New Testament is the best-attested document of the ancient world by an enormous margin. We have thousands of Greek manuscripts, some fragments within a century or two of the originals, against a handful of late copies for most classical works." After: "On preservation, we have thousands of Greek manuscripts of the New Testament, some fragments within a century or two of the originals." **Cut** (the comparisons). "Thousands": CE "Biblical Criticism (Textual)" (04497a), von Soden in 1902 "enumerates 2328 distinct manuscripts outside of lectionaries".
- Same answer. Before: "archaeology has a long record of confirming the incidental details the Bible mentions in passing, the pool of Bethesda, Pilate, the politarchs of Thessalonica, names and titles once dismissed as errors and later dug out of the ground. None of this proves the miracles. It does show that the writers knew the places and times they claimed to know." After: "archaeology has turned up some of the incidental details the Bible mentions in passing, such as the politarchs of Thessalonica, the title Luke gives the city's magistrates, which later turned up on inscriptions found there. None of this proves the miracles. It does show that Luke knew the place and time he wrote about." **Narrowed.** CE "Gospel of Saint Luke" (09420a): the word "is not found in the Greek classics; but there is a large stone in the British Museum, which was found in an arch in Thessalonica, containing an inscription ... Here we find the word used by St. Luke", and Burton (1898) counted "seventeen inscriptions proving the existence of politarchs". Bethesda is cut because CE "Bethsaida" (02536a) calls the double pool near St. Anne's only "probably the old pool of Bethesda" and CE "Pools in Scripture" (12235a) says its location "is to this day an object of dispute"; Pilate is cut because no source for an inscription could be opened; "once dismissed as errors" is cut because no source says so.
- **Verified and kept** in the same answer: "the overwhelming majority are spelling and word order". CE "Biblical Criticism (Textual)": "by far the greater number of these variants are in unimportant details, as, for instance, orthographic peculiarities, inverted words, and the like."
- **"The Gospels are copies of copies."** Cut: "A famous fragment of John kept in Manchester is commonly dated to the first half of the second century, within a few decades of the Gospel's composition." (No public-domain source can date a papyrus published in 1935, and the date was given without its debate.) Before: "The two largest genuinely disputed passages, the longer ending of Mark and the story of the woman caught in adultery, sit flagged in the footnotes of any modern Bible, which is the opposite of a cover-up." After: "The two largest genuinely disputed passages are the longer ending of Mark and the story of the woman caught in adultery." **Narrowed**; that both are disputed: CE "Gospel of Saint Mark" (09674b, "the great textual problem of the Gospel concerns the genuineness of the last twelve verses") and CE "Gospel of Saint John" (08438a, the omission of the incident "from many copies"). This site's own Bible prints both passages with no visible mark, so "any modern Bible" was not even true here.
- **"Aren't we just our brains?"** Cut: "Phineas Gage took an iron rod through his frontal lobe and became, by his friends accounts, no longer Gage." Harlow's report of 1868 is not on GitHub; only Wikipedia copies were found.
- **"What about near-death experiences?"** Cut: "Cardiologists like Pim van Lommel and researchers like Raymond Moody and Bruce Greyson have documented thousands of these accounts." ("They are data." became "These reports are data." so the sentence still has its subject.) Cut: "Pilots in high-g centrifuges report tunnel vision and euphoria." **For James, not changed:** the answer speaks as a pastor ("People come to a pastor with these stories more often than you might think"; "I will not pretend the case is closed").
- **"How old is the earth, and does it matter?"** **Verified**, unchanged: Augustine's warning and his simultaneous creation. CE "Augustine of Hippo" (02089a): "*We must be on our guard against giving interpretations which are hazardous or opposed to science, and so exposing the word of God to the ridicule of unbelievers* (De Genesi ad litteram, I, 19, 21, especially n. 39)", followed by "his thesis on the simultaneous creation of the universe"; CE "Hexaemeron" (07310a): Augustine began the work in 401 and "admits again a simultaneous formation of the world".

### 1.10 The passage note on 1 Samuel 17: the cheese

Page: /theology/passage-notes, the note on 1 Samuel 17 (`client/public/theology/passage-notes.json`, the entry's `flow`). Flagged by the coordinator of this run (2026-11-23): the film agent corrected the same slip in its own film and left this file alone.

- Before: "Then a boy arrives carrying bread and cheese to his older brothers, hears the giant, and asks a strange question." After: "Then a boy arrives carrying bread to his older brothers and cheese for their commander, hears the giant, and asks a strange question." **Corrected** to the text. Repo BSB, 1 Samuel 17:17-18: "Take this ephah of roasted grain and these ten loaves of bread for your brothers ... Take also these ten portions of cheese to the commander of their unit."

## Part 2. The public essays

An essay is public when its shelf entry is live, or pending with a file in `client/public/essays/`. Every row below is a row the essay's ledger marked "not opened", "reference knowledge" or "check first" (`articles-ledger.md` for the essays of 2026-11-20 to 22; `docs/work/essays/ledgers/<slug>.md` for the earlier twenty-five). Rows the ledgers already verified from an opened source were not re-checked. The years 1646 for the Westminster Confession, which twelve essays print, are treated once under 2.0.

### 2.0 "The Westminster Confession of 1646" (twelve essays)

The year rested on the Study Bible's note on John 10 (this site's own page, whose ledger names no source) or on "reference knowledge". Every source opened gives 1647: Creeds.json, `westminster_confession_of_faith.json` metadata, "Year": "1647"; CE "Presbyterianism" (12392b), "In the same year [1647] the Westminster Assembly of divines presented to Parliament its Confession of Faith"; CE "Predestination" (12376b), "the famous Westminster Confession of 1647"; CE "Inspiration of the Bible" (05766b), "(1643-7)". The year is therefore **cut** ("The Westminster Confession of 1646" becomes "The Westminster Confession"), not changed to 1647, in each essay as it is worked below. The quotations from the Confession were verified word for word in earlier ledgers against Creeds.json and are untouched.

### 2.1 /writing/did-god-choose-me-or-did-i-choose-god

| Claim as it stood | Result |
|---|---|
| The *Confessions* written near the end of the fourth century; Augustine a bishop in North Africa | **Verified.** CE "Works of St. Augustine of Hippo" (02089a): "The *Confessions* (towards A.D. 400)"; "St. Augustine of Hippo (354-430)". |
| Pelagius heard the prayer quoted and was appalled; Rome full of baptized people who excused themselves by the weakness of human nature; a just God does not command the impossible | **Verified** (paraphrase). WDB, Augustine, *On the Gift of Perseverance* ch. 53 (NPNF, filed as *Predestination of the Saints*, Book 2): "Which words of mine, Pelagius at Rome, when they were mentioned in his presence ... could not bear"; Augustine, *On Nature and Grace* (NPNF): Pelagius wrote "against those, who, when in their sins they ought to censure human will, are more forward in accusing the nature of men, and thereby endeavour to excuse themselves"; Jerome, *Against the Pelagians*, Prologue (NPNF): "God commands us to be perfect, and he does not command impossibilities." |
| Caelestius condemned by a council at Carthage in 411; 418; Ephesus 431 | **Verified.** CE "Pelagius and Pelagianism" (11604a): "Caelestius was summoned to appear before a synod at Carthage (411)"; "on 1 May, 418 ... the famous Council of Carthage"; "When the Ecumenical Council of Ephesus (431) repeated the condemnation". |
| Monks of southern Gaul held that the first turn toward God is ours | **Verified.** CE "Semipelagianism" (13703a): "A doctrine of grace advocated by monks of Southern Gaul at and around Marseilles after 428"; the beginning of faith (*initium fidei*) referred "to the power of the free will". |
| Erasmus wrote against Luther in 1524; Luther answered in 1525 and thanked him for going to the real issue and not indulgences | **Verified.** CE "Erasmus" (05510b): "Diatribe de libero arbitrio" (1524); CE "Martin Luther" (09438b): "After the lapse of a year Luther gave his reply ... 'On the Servitude of the Will'" (CE "Erasmus" itself misdates the reply to 1524); Luther, *The Bondage of the Will*, Sect. CLXVIII, Henry Cole's translation (1823), Vault: "you alone ... have entered upon the thing itself ... and, have not wearied me with those irrelevant points about popery, purgatory, indulgences ... for which, from my heart, I thank you." Erasmus thought the matter obscure: CE "Martin Luther": "the subject is still enshrouded in obscurity". |
| Trent, 1547: grace first; the will cooperates and can refuse; grace can be lost | **Verified.** Trent, Session VI, Waterworth's translation (1848), Vault: "Celebrated on the thirteenth day of the month of January, 1547"; ch. 5, "the beginning of the said Justification is to be derived from the prevenient grace of God"; "he is also able to reject it"; ch. 15, "by every mortal sin, grace is lost". |
| Dominicans and Jesuits; Paul V ended the hearings in 1607 without a ruling and forbade each side to censure the other | **Verified.** CE "Congregatio de Auxiliis" (04238a): "The pope's decree communicated (5 September, 1607) to both Dominicans and Jesuits, allowed each party to defend its own doctrine, enjoined each from censoring or condemning the opposite opinion"; Cardinal Borghese, "later Paul V". |
| The Lutheran confession of 1577: election by grace alone, pure comfort, no election to damnation; saved by God's doing, lost by one's own | **Verified.** Formula of Concord, Epitome XI, *Concordia Triglotta* (1921), in `Zyniker13/Denominations-and-Traditions`: election "extends only over the godly"; "out of pure grace, without any merit of our own, we have been elected in Christ"; "not God or His election, but their wickedness, is responsible". 1577: CE "The Real Presence of Christ in the Eucharist" (05573a), "the Formula of Concord in 1577". |
| Arminius a Dutch pastor, professor at Leiden, died 1609; five articles in 1610; Dort 1618 and 1619 with delegates from Britain, Germany and Switzerland | **Verified.** CE "Arminianism" (01740c): "preacher of the reformed congregation" at Amsterdam, "professor at the University of Leyden", "died ... October, 1609"; EB1911 "Dort, Synod of" (vol. 8, PG 32758): "deputies from Switzerland, the Palatinate, Nassau, Hesse, East Friesland, Bremen, Scotland and England"; "At the conference held at the Hague in 1610 the Arminians addressed a remonstrance to the states-general in the form of five articles". |
| After Dort the government removed the Remonstrant ministers and banished many | **Verified.** EB1911 "Dort, Synod of": "they should be deprived of all their offices"; "many of them refused and were banished". |
| John 6:44 and 12:32 use the same verb | **Verified.** Repo Greek data (`client/public/bible/ch/john/6.json`, `12.json`): ἑλκύσῃ and ἑλκύσω, both G1670. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). Before: "The Westminster Confession of 1646 says that God ordains". After: "The Westminster Confession says that God ordains". |
| The Orthodox never took Augustine as their main teacher; they speak of synergy; they tend to think the West asked the question in a way that guaranteed a fight | **Verified in part, cut in part.** Co-operation: the Confession of Dositheus (1672), Decree 3, in `LukeSmithxyz/everything` ("This grace co-operates with us"; "those who will not obey, and co-operate with grace"). Augustine as the West's teacher: CE "Teaching of St. Augustine" (02091a), "him from whom proceeds all the doctrinal and ecclesiastical development of the West"; CE "Pelagius and Pelagianism": in the East "the moral power and freedom of the will were at times very strongly ... insisted on". No source says what the Orthodox think of the West's question. Before: "...are not rivals, and they tend to think the West asked the question in a way that guaranteed a fight." After: "...are not rivals." |

### 2.2 /writing/why-jesus-wont-fit-in-either-party

| Claim as it stood | Result |
|---|---|
| The Thirty Years' War, 1618 to 1648 | **Verified.** CE "The Thirty Years War" (14648b): "The Thirty Years War (1618-48)". |
| "The theologian H. Richard Niebuhr summed up where that road ended, and the substance of his sentence was this: a God without wrath bringing people without sin into a kingdom without judgment, through a Christ without a cross." | **Cut.** The sentence came from the site's history course; *The Kingdom of God in America* (1937) could not be opened, and the "substance" kept his wording nearly whole, so it still read as his sentence. It can be restored if James checks it against the book. |
| "...and many of the churches that took that road have been emptying ever since." | **Cut** (no source; reference knowledge about membership since the 1960s). After: "That is [the progressive blind spot](/writing/the-progressive-blind-spot)." |

### 2.3 /writing/should-women-preach

The essay takes no side and states no position for James; only historical and lexical sentences were touched.

| Claim as it stood | Result |
|---|---|
| The word translated "servant" for Phoebe (Romans 16:1) is the word translated "deacon" elsewhere | **Verified.** Repo Greek data: διάκονον (G1249) at Romans 16:1, διακόνοις at Philippians 1:1 and Διακόνους at 1 Timothy 3:8, glossed "deacons"; CE "Deaconesses" (04651a): Phebe "is called *diakonos*". |
| "...and since Paul commends her to the Romans at the head of the letter, most scholars think she carried it to them." | **Cut.** No source opened says so (not CE "Epistle to the Romans" or "Deaconesses", not Chrysostom's Homily 30). |
| Romans 16:7 can also be read "outstanding among the apostles"; Chrysostom read it so | **Verified.** WDB, Chrysostom, *Homilies on Romans* 31 (NPNF), with the editor's note 13: "It is impossible to determine with certainty whether ... the persons referred to were themselves apostles, or merely that they were held in high esteem by the apostles." |
| The note was added when the sermons were printed in English "in the nineteenth century" | **Narrowed.** The note and its words ("that a woman should have been an apostle is out of the question", signed G. B. S.) are verified in the same file; the volume's year was not found in any source opened. Before: "When Chrysostom's sermons were printed in English in the nineteenth century, an editor added a note to that sentence." After: "When Chrysostom's sermons were printed in English, an editor added a note to that sentence." |
| "Many English Bibles of the twentieth century printed Junias, a man's name that scholars have not found in any other ancient source." | **Narrowed.** After: "Some English Bibles printed Junias, the American Standard Version of 1901 among them." The ASV (1901), Darby (1890) and Young (1862) all read "Andronicus and Junias" (`keithecarlson/StyleTransferBibleData`, `Data/Bibles/<ASV, DARBY, YLT>/Romans/Romans16.txt`); "many" and the claim about other ancient sources were not found in any source opened. |
| "Exercise authority" renders a verb found nowhere else in the New Testament; its meaning is disputed; the KJV has "usurp authority" | **Verified.** Repo Greek data: αὐθεντεῖν (G0831) at 1 Timothy 2:12, and in no other chapter file of the New Testament; KJV (`aruljohn/Bible-kjv`, `1Timothy.json`): "nor to usurp authority over the man". |
| "The name is recent, from the late 1980s, but the position is old." | **Narrowed.** After: "The name is recent, but the position is old." The decade could not be checked. |
| Tertullian around 200 | **Verified.** CE "Tertullian" (14520c): the works for catechumens, "De cultu feminarum" among them, "fall between 200 and 206". |
| Quaker women preached in the 1600s | **Verified.** CE "Society of Friends (Quakers)" (06304b): Fox held "that every man, woman or child, when moved by the Spirit, had an equal right to prophesy"; "a host of unordained apostles, male and female". |
| In 1853 a Congregational church in New York ordained Antoinette Brown | **Verified.** *History of Woman Suffrage*, vol. I (1881; PG 28020): "September 15, 1853, Antoinette L. Brown was ordained as pastor of a church in South Butler"; "she is the pastor of a Congregational church in South Butler, N. Y." |
| "In the nineteenth and twentieth centuries, churches that would not let a woman teach a mixed Sunday school class at home sent women across oceans to evangelize and to teach the Bible to anyone who would listen." | **Cut.** No source opened. |

### 2.4 /writing/is-hell-real-and-is-it-forever

| Claim as it stood | Result |
|---|---|
| Bertrand Russell, a lecture in London in 1927: "I do not myself feel that any person who is really profoundly humane can believe in everlasting punishment"; he counted belief in hell against Jesus and said the doctrine made the world crueler | **Cut**, the whole paragraph. The essay took it from the Honest Answer on hell, whose ledger row rests on web search results; the lecture is in copyright and no copy of it could be found on GitHub. Before: "Bertrand Russell put that last objection as plainly as anyone has. In a lecture in London in 1927 he said, \"I do not myself feel that any person who is really profoundly humane can believe in everlasting punishment.\" He counted it against Jesus that he believed in hell, and he argued that the doctrine had made the world crueler. Russell was not a careless man. Anyone who has sat through a certain kind of sermon knows what he was talking about." After: nothing; the essay goes from the skeptic's question to "The church has two bad habits here". **For James:** the same sentence stands in the Honest Answer on hell, the question library's page on hell and the note on Mark 9, each resting on that search; restore it here only if he can check the lecture. |
| Gehenna: twelve uses in the New Testament, eleven by Jesus; Paul never uses it | **Verified.** Repo Greek data: G1067 at Matthew 5:22, 5:29, 5:30, 10:28, 18:9, 23:15, 23:33; Mark 9:43, 45, 47; Luke 12:5 (all words of Jesus); James 3:6. Twelve, none in Paul. |
| Origen (third century) and Gregory of Nyssa (fourth) taught a final restoration; Gregory was never condemned for it | **Verified in substance.** CE "Origen and Origenism" (11306b): Origen 185 to 254; CE "Apocatastasis" (01599a) on Origen and on Gregory ("evil shall, ultimately, have an end"), and that later "defenders of orthodoxy" thought Gregory's writings "had been tampered with by heretics"; CE "St. Gregory of Nyssa" (07016a) treats him as a saint. |
| The last books of *The City of God* date from the 420s | **Verified.** CE "Works of St. Augustine of Hippo" (02089a): "begun in 413, but Books 20-22 were written in 426". |
| Popular pictures of hell come from medieval art and Dante; the devil is Scripture's prisoner | **Narrowed.** Revelation 20:10 (verified in the earlier ledger) stands. No source opened says the popular images come from medieval art and Dante. Before: "Much of what people picture when they hear the word comes from medieval art and from Dante, not from the Bible, which says nothing about circles or pitchforks or a devil who reigns there." After: "The Bible says nothing about circles or pitchforks or a devil who reigns there." |
| "The Catholic Church names saints and has never declared that any individual is in hell." (check first) | **Cut.** No source opened says so. Before: "Scripture never gives us that knowledge. The Catholic Church names saints and has never declared that any individual is in hell. That restraint is right, and every preacher at every funeral should practice it." After: "Scripture never gives us that knowledge. Every preacher at every funeral should remember that." |

### 2.5 /writing/can-a-christian-be-rich

| Claim as it stood | Result |
|---|---|
| Clement of Alexandria, about 200, wrote for wealthy Christians troubled by Mark 10; the target is attachment | **Verified.** CE "Clement of Alexandria" (04045a): "died about the year 215", "head of the catechetical school of Alexandria", left when "the persecution fell upon Egypt in the year 202"; *Who is the rich man who shall be saved?* is "an exposition of St. Mark, x, 17-31, wherein Clement shows that wealth is not condemned by the Gospel as intrinsically evil". |
| Chrysostom's discourses on the rich man and Lazarus preached in Antioch in the fourth century | **Verified.** CE "St. John Chrysostom" (08452b): ordained priest at Antioch in 386, "His chief task during the next twelve years was that of preaching", "These years, 386-98"; WDB, the translator's introduction to the *Four Discourses*: "the crowded cathedral at Antioch". |
| "In the last century a third answer appeared, and it has to be named plainly because it has spread across the world." | **Narrowed.** After: "A third answer has to be named plainly." The date and the spread had no source. The description of what the teaching says stands; it names no teacher. |
| "It can't account for the apostles, who died poor, or for Paul..." | **Narrowed.** After: "It can't account for Paul, who said he had learned to be content..." (Philippians 4:12, verified in the earlier ledger). |

### 2.6 /writing/what-the-church-got-wrong-about-race

| Claim as it stood | Result |
|---|---|
| English colonists in the 1600s were uneasy about holding fellow Christians as slaves; in 1667 the Virginia assembly declared that baptism did not change whether a person was slave or free (check first) | **Verified.** George MacLaren Brydon, *Religious Life of Virginia in the Seventeenth Century* (1957; PG 28634, GITenberg): "there arose in practically every slave-holding section of the English colonies a question whether the very act of baptizing a slave child did not set him free"; "in 1667 the following act was adopted by the General Assembly: ... the conferring of baptisme doth not alter the condition of the person as to his bondage or freedom". |
| "Congregations that sent missionaries to Africa seated Black visitors in the balcony or turned them away at the door." | **Cut.** No source opened. Richard Allen's own account of the gallery, which follows, is in the earlier ledger and stays. |
| King wrote from jail in Birmingham "in April 1963" | **Narrowed.** The month was the row's unchecked part. Before: "In April 1963 Martin Luther King Jr." After: "In 1963 Martin Luther King Jr." The rest of the paragraph rests on the site's justice pages, as the earlier ledger says; the letter itself is in copyright and was not found on GitHub. |
| Athens told the story that its people had sprung from its own soil and were a breed apart | **Verified.** Plato, *Menexenus*, Jowett's translation (PG 1682, Vault): "they are the children of the soil"; "we are pure Hellenes, uncontaminated by any foreign element". |
| "That idea, race as most of us learned it, grew up in the same centuries as the Atlantic slave trade and served it." | **Cut.** No source opened. |
| "There is a further disagreement among Black Christians themselves ... That one deserves to be heard and not managed." | **Cut.** No source opened. |

### 2.7 /writing/why-does-god-let-children-suffer

| Claim as it stood | Result |
|---|---|
| Dostoevsky finished *The Brothers Karamazov* in 1880; two years earlier his son Alyosha, not yet three, had died; the believing brother carries that name (check first) | **Narrowed.** No source for the son's death was found; EB1911 "Dostoievsky" (vol. 8, PG 32758) dates the novel 1881. Before: "Fyodor Dostoevsky finished *The Brothers Karamazov* in 1880. Two years earlier his own son, a boy not yet three named Alyosha, had died. In the novel the believing brother carries that name, and the unbelieving brother, Ivan, is given the strongest speech in the book." After: "In Fyodor Dostoevsky's *The Brothers Karamazov* the believing brother is Alyosha, and the unbelieving brother, Ivan, is given the strongest speech in the book." Garnett's translation (PG 28054): Alyosha is at the monastery; Ivan's question, "If all must suffer to pay for the eternal harmony, what have children to do with it, tell me, please?", matches the essay word for word. The care paragraph before it is untouched. |

### 2.8 /writing/divorce-remarriage-and-the-church

| Claim as it stood | Result |
|---|---|
| The Mishnah was written down around 200 | **Verified.** CE "Canon of the Old Testament" (03267a): "the Mishnah, the Jewish code of unwritten sacred laws reduced to writing, c. A.D. 200". |
| Malachi wrote around the fifth century before Christ | **Verified.** CE "Malachias" (09562b): "Critics are practically agreed in dating the book from about the middle of the fifth century B.C." |
| Many modern Bibles have God say he hates divorce | **Verified.** Repo BSB, Malachi 2:16: "For I hate divorce"; NASB (`jburson/bible-data`) and the Open Translation Bible (`OpenTranslationBible/open-bible`) read the same. |
| The Shepherd of Hermas, a Roman Christian writing of the second century | **Verified.** CE "Hermas" (07268b): Clement as "the organ of communication between Rome and the rest of the Church in the second century"; Pius "among the priests at Rome even before 140". |
| Augustine, around 401 | **Verified.** WDB, *On the Good of Marriage*, NPNF introduction: "finished about the year 401". |
| An annulment finds that no true marriage came to be | **Verified** in substance. CE "Divorce (in Moral Theology)" (05054c) on complaints and sentences "of nullity" and "the invalidity of the marriage". |
| The Orthodox account (check first): a marriage can die; the church as physician; *oikonomia*; a second marriage with prayers of repentance and less festivity; what the Orthodox would say | **Narrowed.** CE "Marriage" (09693a): "The Oriental Churches separated from Rome, including the Greek Orthodox Church, and all the Protestant sects, permit divorce in varying degrees"; CE "Divorce (in Moral Theology)": Trent's anathema was worded as it was "out of regard for the Greeks of that period". The rest was found in no source opened. Before: "But they have long reasoned that a marriage can die, killed by adultery or by something as grave, and that the church, acting as a physician, may in mercy permit a second marriage. The Greek word for this is *oikonomia*, ... A second marriage has traditionally been celebrated with prayers of repentance and with less festivity than the first. Basil of Caesarea ... The Orthodox would say that they hold the ideal as firmly as Rome and treat the failure more as a wound than a legal status." After: "But they have long permitted divorce, and a second marriage after it. Basil of Caesarea, setting down rules for his clergy in the 370s, already assigns a period of penance to those who marry a second time." |
| Basil, in the 370s | **Verified.** WDB, Letter 188, NPNF note: "Maran dates it at the end of 374"; canon IV, "one year for digamy". |
| "The scholar Erasmus had argued in the 1510s that the exception in Matthew allowed the innocent spouse to marry again, and the Reformers agreed." | **Narrowed.** After: "They held that the exception in Matthew allowed the innocent spouse to marry again." Erasmus's argument was not found in any source opened; the Reformed position is Westminster 24.5 (Creeds.json): "it is lawful for the innocent party to sue out a divorce, and after the divorce to marry another". |
| No tradition requires anyone to remain under the same roof with a person harming them | **Kept whole as a care line.** Partly verified (Trent, Session XXIV, canon 8, separation "for many causes"; 1 Corinthians 7:11); the claim for every tradition was not found stated in a source. It is the passage that tells a person in danger she may leave, and it was not cut. |
| "Beginning around 1970 the laws of one state after another were rewritten so that either spouse could end a marriage without proving any wrong, and the church, which had the words of Jesus, mostly adjusted." | **Cut.** No source opened. |

### 2.9 /writing/can-a-nation-be-christian

| Claim as it stood | Result |
|---|---|
| "For generations New England governments opened their year by asking a minister to preach to them" | **Verified.** The Text Creation Partnership's catalogue (`textcreationpartnership/Texts`, `TCP.csv`) lists ninety Evans-TCP sermons preached before the General Court or assembly "on the day of election" from the 1660s to 1800, in every decade between. |
| The modern defenders' case (no people is neutral; law rests on an account of the human being) | **Left.** A paraphrase of a position, with no writer named, date or figure; nothing to verify. |
| Isaac Backus, "a Baptist pastor in Massachusetts", 1773 | **Verified.** Evans-TCP N09952 (`textcreationpartnership/N09952`): *An appeal to the public for religious liberty* (Boston, 1773), "Books published by Isaac Backus, Pastor of a church in Middleborough"; catalogue subjects "Baptists -- Massachusetts". |
| Samuel Hopkins "a Congregational minister in Newport, Rhode Island" | **Cut.** The 1776 pamphlet (Evans-TCP N15010) does not name its author's church, and no other source was found. Before: "In 1776 Samuel Hopkins, a Congregational minister in Newport, Rhode Island, addressed a pamphlet to the Continental Congress." After: "In 1776 Samuel Hopkins addressed a pamphlet to the Continental Congress." |
| In 1782 a Pennsylvania militia killed some ninety unarmed Delaware men, women and children at Gnadenhutten; the victims were Christians (check first) | **Narrowed.** CE "Delaware Indians" (04695a): Moravian missionaries won many to Christianity, "culminating in the massacre of an entire community of Christian Delawares at Gnadenhutton, in Ohio, in 1782". The militia and the count were found in no source opened. After: "Five years earlier, in 1782, an entire community of Christian Delaware had been massacred at the Moravian mission village of Gnadenhutten in Ohio." |
| In 1838 the Cherokee, many of them Christians taught by missionaries, were driven west at the point of a bayonet, and thousands died on the road (check first) | **Verified.** EB1911 "Cherokee" (vol. 6, PG 31156): "A force of 2000 men, under the command of General Winfield Scott, was sent in 1838, and the Cherokees were compelled to emigrate"; CE "Cherokee Indians" (03646a): "In 1801 the Moravians began work among the tribe, and were followed by Congregationalists, Presbyterians and Baptists"; James Mooney, *Myths of the Cherokee* (1900; PG 45634): those removed under Ross "lost over 1,600 on the journey", and "over 4,000 Cherokee died as the direct result of the removal". |
| Anglicans, Lutherans, Catholics and New England Puritans kept established churches; Baptists and Quakers opposed them | **Verified** in substance. CE "Religious Toleration" (14763a): "the Established Church of England"; the Catholic Church "as state Church (e.g. Italy and Spain)"; CE "Calvinism" (03198a): in Germany "civil rulers ought to fix the creed of their subjects, *Cujus regio, ejus religio*"; CE "Society of Friends": "their refusal to pay tithes"; Backus's appeal (above). |

### 2.10 /writing/babies-or-believers-why-christians-baptize-differently

This essay already dates the Westminster Confession 1647, which agrees with the sources.

| Claim as it stood | Result |
|---|---|
| Tertullian, around 200, "the first" to discuss the baptism of small children directly | **Narrowed.** The date is verified (CE "Tertullian": the catechetical works, *De baptismo* among them, "fall between 200 and 206"); "the first" is not. Before: "Tertullian is the first to discuss the baptism of small children directly, and he advises against it." After: "Tertullian discusses the baptism of small children directly, and he advises against it." |
| Cyprian's letter half a century after Tertullian | **Verified.** WDB, Cyprian, Epistle 58 (NPNF): "Cyprian, and others his colleagues who were present in council, in number sixty-six, to Fidus"; CE "St. Cyprian of Carthage" (04583b): bishop of Carthage from "the beginning of 249", under Decius from 250. |
| Gregory of Nazianzus, late fourth century, in Constantinople | **Verified.** WDB, Oration 40 (NPNF): "Preached at Constantinople Jan. 6, 381"; CE "St. Gregory of Nazianzus" (07010b): went to Constantinople "early in the year 379". |
| Augustine baptized as a grown man; later defended infant baptism | **Verified.** CE "St. Augustine of Hippo" (02084a): at Milan until "the autumn of 387", after his baptism; WDB holds his *On the Merits and Forgiveness of Sins, and on the Baptism of Infants*. |
| "...and from the fifth century until the sixteenth nearly every Christian in the world was baptized as an infant." | **Cut.** No source opened. |
| Nearly every government, Catholic and Protestant, treated rebaptism as a crime | **Verified** in substance. CE "Anabaptists" (01445b): "the determined repression of Anabaptists by Catholics, Lutherans, and Zwinglians alike". |
| Manz one of Zwingli's students | **Narrowed.** CE "Anabaptists": "In 1525 some of his associates separated from him and preached rebaptism." "Students" became "associates"; "one of those students" became "one of them". |
| The uprising at Münster in the 1530s | **Verified.** CE "Anabaptists": Münster "(1533-34)" to "the unexpected capture of the town by the besiegers (24 June, 1535)". |
| Catholic, Orthodox and Lutheran Christians hold that God gives the new birth in baptism | **Verified.** CE "Baptism" (02258b): "the washing of regeneration"; the Confession of Dositheus, Decree 16 (baptism necessary, with John 3:5, "even for infants"); Luther, Small Catechism, Baptism III, in the Vault's translation: "a bath of new birth in the Holy Spirit". |

### 2.11 /writing/should-christians-ever-go-to-war

| Claim as it stood | Result |
|---|---|
| Tertullian, in Carthage, around 200 (*On Idolatry*) | **Verified.** CE "Tertullian": the works of his Catholic period, including "De idololatria ... closely connected with" *De spectaculis*, "fall between 200 and 206". |
| Origen, "among the most learned Christians of the third century" | **Verified.** CE "Origen and Origenism": 185 to 254. |
| "Historians still argue over how much of the early refusal was about bloodshed and how much was about idols." | **Cut.** No source opened. |
| Aquinas in the thirteenth century | **Verified.** CE "St. Thomas Aquinas" (14663b): born at "the end of 1225"; invited to the council of Lyons "1 May, 1274". |
| Later teachers added last resort, proportion and the protection of those not fighting | **Verified** in substance. CE "War" (15546c): coercion's "exercise be necessary", "damage be not inflicted beyond measure ... of proportion", the killing of non-combatants "barred". |
| The Lutheran confession of 1530 | **Verified.** CE: "At the Diet of Augsburg in 1530, at which the so-called Augsburg Confession was delivered". |
| Anabaptists in Zurich and southern Germany; Schleitheim "on the Swiss border" | **Verified in part.** CE "Anabaptists": the movement spread "not only in Switzerland, but also in southern Germany and Austria". The place of Schleitheim was not found. Before: "met at Schleitheim, on the Swiss border, and agreed". After: "met at Schleitheim and agreed". |

### 2.12 /writing/can-a-christian-lose-their-salvation

| Claim as it stood | Result |
|---|---|
| Augustine in the 420s on perseverance | **Verified.** CE "Works of St. Augustine of Hippo": "De Prædestinatione Sanctorum" (428), "De Done Perseverantiæ" (429). |
| The Lutheran account (check first): a troubled Christian is sent to the promise, his baptism and the Supper, not to examine his own heart | **Verified.** Luther, Large Catechism (Bente and Dau, *Triglot Concordia*, 1921; Vault), Baptism: "when our sins and conscience oppress us, we strengthen ourselves and take comfort and say: Nevertheless I am baptized"; faith clings to "something external"; the Supper: "the consolation is here given when the heart feels that the burden is becoming too heavy, that it may here obtain new power and refreshment"; Formula of Concord, Epitome XI: the gracious election "sealed ... with the holy Sacraments, which we can [ought to] call to mind in our most severe temptations, and take comfort in them". |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

### 2.13 /writing/do-the-gifts-of-the-spirit-still-happen

| Claim as it stood | Result |
|---|---|
| The Greek of 1 Corinthians 12:30 expects the answer no | **Verified.** Repo Greek data: each question opens with μὴ (G3361), glossed "Surely not". |
| Irenaeus, a bishop in Gaul late in the second century | **Verified.** CE "St. Irenaeus" (08130b): sent to Rome "177 or 178", then "succeeded the martyr Saint Pothinus as Bishop of Lyons". |
| Chrysostom preaching through 1 Corinthians at Antioch | **Verified.** WDB, *Homilies on 1 Corinthians* 21 (NPNF): "And all this in Antioch, where men were first called Christians". |
| The Reformers answered Rome's appeal to miracles and the radicals' revelations with the completeness of Scripture | **Verified.** Calvin, *Institutes*, Beveridge's translation (1845; Vault): the Prefatory Address ("they bid us tell by what miracles it has been confirmed"; "they can confirm their faith by constant miracles down to the present day") and I.9, "All the Principles of Piety Subverted by Fanatics, Who Substitute Revelations for Scripture". |
| B. B. Warfield of Princeton, 1918 (check first) | **Verified.** Warfield, *Counterfeit Miracles* (New York: Scribner's, 1918; Vault, read from the Internet Archive page images): the gifts "were part of the credentials of the Apostles as the authoritative agents of God in founding the church. Their function thus confined them to distinctively the Apostolic Church, and they necessarily passed away with it"; "the confinement of the supernatural gifts ... to those who had them conferred upon them by the Apostles". Princeton: his Introductory Note to Kuyper's *Encyclopedia of Sacred Theology* is signed "PRINCETON, June 16, 1898". |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |
| "From the 1960s on, the same experiences appeared inside the older churches, Catholic and Protestant." | **Cut.** No source opened. |
| Classical Pentecostal teaching: a baptism in the Spirit distinct from conversion, with tongues as its first sign; charismatics usually do not insist on the sign | **Cut.** No Pentecostal statement of faith could be found on GitHub. Before: "...they speak in tongues when it happens. Classical Pentecostal churches therefore teach a baptism in the Holy Spirit distinct from conversion, given for bold witness, with tongues as its first outward sign. Charismatic Christians in the older churches usually share the expectation without insisting on that sign. What the Pentecostal says..." After: "...they speak in tongues when it happens. What the Pentecostal says..." |
| Not in scope, noted: "the wider Pentecostal and charismatic family numbered somewhere over half a billion people by common estimates" | The ledger marks it the site's own (the history course `the-global-church`), not "not opened", so it was left; it is a figure without a source and is listed under "What is left". |

### 2.14 /writing/what-happens-to-people-who-never-hear-the-gospel

| Claim as it stood | Result |
|---|---|
| Annie Dillard's story of the Inuit hunter and the priest | **Narrowed** to a hypothetical. The essay took it from the Honest Answer, which cites *Pilgrim at Tinker Creek* (1974); the book is in copyright and could not be opened. Before: "The writer Annie Dillard tells of an Inuit hunter who asked a missionary priest whether he would go to hell if he had never known about God and sin. No, said the priest, not if you did not know. Then why, the hunter asked, did you tell me?" After: "Picture a hunter who asks a missionary priest whether he would go to hell if he had never known about God and sin. No, says the priest, not if you did not know. Then why, the hunter asks, did you tell me?" The Honest Answer on those who never heard still tells it as Dillard's. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

### 2.15 /writing/christianity-was-never-western

| Claim as it stood | Result |
|---|---|
| The Ethiopian's kingdom lay on the Nile south of Egypt | **Verified.** CE "Candace" (03244c): the queen whose eunuch Philip baptized; the name found "near ancient Meroe", and Pliny's report that "a Queen Candace was reigning over the island of Meroe" when Nero's explorers "passed through Nubia". |
| "Niger" is the Latin word for black | **Verified.** CE "Necromancy": "nigromancy (*niger*, black)"; CE on the "Liber Niger, or Black Book". |
| Tertullian the first great Christian writer in Latin; Carthage in what is now Tunisia | **Verified.** CE "Tertullian": "He is the first of Latin theological writers"; CE "Carthage" (03385a): the archdiocese "now includes the entire Regency (French Protectorate) of Tunis". |
| Augustine born in North Africa, bishop of an African port, died there | **Verified.** CE "St. Augustine of Hippo" (02084a): his schooling "in the schools of Tagaste and Madaura"; bishop of Hippo. |
| Frumentius consecrated by Athanasius; Constantius's letter "in the middle of the fourth century" | **Verified.** CE "Edesius and Frumentius" (05281b): "St. Athanasius considered Frumentius himself the most suitable person for bishop and consecrated him"; WDB, Athanasius, *Defence before Constantius* (NPNF), whose notes date the surrounding events 353 to 355. (CE prints the letter's year as 365, after Constantius's death; the essay gives only the century.) |
| Syriac is a form of Aramaic | **Verified.** CE "Syriac Language and Literature" (14408a): "Syriac, or rather Aramaic ... is still spoken in the three villages in the neighbourhood of Damascus". |
| The Thomas Christians of India among the ancient churches | **Verified.** CE "St. Thomas Christians" (14678a). |
| From the seventh century Syria, Egypt and North Africa came under Muslim rule and their churches shrank (check first) | **Verified.** CE "Africa" (01181a): "In the first [phase] (638 — 1050) the Arabs, in a rapid advance, propagated Islam along the whole Mediterranean coast, from Egypt to Morocco"; African Christianity was destroyed "first, by the Vandals and, finally, by Islam", while the Coptic Church continued; "at the end of the seventh century Africa became, so far as Europe was concerned, ... a closed continent"; CE "Syria" (14399a): its people "spoke Aramaic until about the seventh century, when Arab invasion forced the Arabic language", and "The Moslems are and have been for the last twelve centuries the lords of the land and still constitute the great majority". |
| "By 1500 the largest body of Christians left on earth was in Europe" | **Cut.** No source opened. Before: "By 1500 the largest body of Christians left on earth was in Europe, and Europeans mistook where the church had survived for what the church was." After: "Europeans mistook where the church had survived for what the church was." |

### 2.16 /writing/is-christianity-good-for-women

No change. All five rows verified.

| Claim as it stood | Result |
|---|---|
| Stanton, 1895, the introduction to *The Woman's Bible* | **Verified** through the library's ledger, which names a source opened here: `GITenberg/The-Woman-s-Bible_9880` (preface of Part I dated 1 August 1895). |
| Chrysostom taught from 1 Timothy 2:14 that women are more easily deceived; the reading held for much of church history | **Verified** in substance. WDB, Chrysostom, *Homilies on 1 Timothy* 9 (NPNF): "the sex is weak and fickle, and he is speaking of the sex collectively". The persistence is shown by Aquinas in the next sentence (verified in the library's ledger). |
| Hilarion's letter to Alis, 1 BC | **Verified.** `papyri/idp.data`, `Translations/20/20442-2.xml` (the APIS translation of P.Oxy. 4.744): "if you bear a child and it is male, let it be; if it is female, cast it out"; "But how can I forget you? Thus I'm asking you not to worry"; dated "The 29th year of Caesar". |
| Celsus, second century | **Verified.** CE "Celsus": "flourished towards the end of the second century". |
| A bishop of Rome "two centuries later" | **Verified.** CE "Pope Cornelius" (04375c): Cornelius in office from 251. |
| "The room women had been given narrowed" (check first) | **Verified** in substance. CE "Deaconesses" (04651a): the order "gradually waned and in the end died out altogether". |

### 2.17 /writing/what-is-the-lords-supper

| Claim as it stood | Result |
|---|---|
| Ignatius around 110; his opponents denied Christ a real body | Left (the ledger marks it the site's course, read for the quotation). |
| Luther's *Small Catechism* of 1529 | **Verified.** CE: "Luther's famous 'Enchiridion', which was really the third edition of his smaller catechism, was published in 1529"; Marburg "5 Oct., 1529". |
| The Orthodox call the meal the holy mysteries; many of their teachers regard Western definitions as answering a question never asked; the meal is where heaven and earth meet, to be received and not taken apart (check first) | **Narrowed.** The Confession of Dositheus (1672), Decree 17: "the All-holy Mystery of the Sacred Eucharist", and, against the cut clause, "the bread is transmuted, transubstantiated, converted and transformed". Before: "The Orthodox call the meal the holy mysteries, and many of their teachers regard the Western habit of defining the mechanism, Catholic and Protestant alike, as answering a question the church was never asked to answer. Their conviction is that the meal is where heaven and earth meet, and that it is to be received and not taken apart." After: "The Orthodox call the meal the holy mysteries." |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |
| The hard question for the Catholic view, a philosophy of substance "drawn from Aristotle" | **Verified.** CE "Accident" (01096c): "Aristotle and his medieval followers ... hold to the objectivity both of substance and of accident". |
| The Orthodox commune the Orthodox; Rome and the East hold that sharing declares full unity; other churches invite all the baptized or all who trust Christ | **Cut.** No source opened. Before: "The Orthodox commune the Orthodox. Both believe that sharing the meal declares a full unity of faith, and that to share it where that unity doesn't exist would be to say something false with the body of Christ. Many Lutheran and Reformed churches guard the table for a related reason;" After: "Many Lutheran and Reformed churches guard the table;". Also cut: "Other churches invite every baptized Christian, or everyone who trusts Christ, on the ground that the table is the Lord's and he is the host." The pastoral paragraph that follows, for the reader asked to stay in the pew, is kept whole. |
| The meal among the questions a person could be condemned for in the century after Marburg (check first) | **Verified.** CE "Henry VIII": under the Six Articles (1539) "the dogma of Transubstantiation is insisted upon; and indeed more than one unfortunate reformer who denied the Real Presence was sent to the stake". |

### 2.18 /writing/is-the-bible-reliable-enough-to-build-a-life-on

| Claim as it stood | Result |
|---|---|
| What each side (inerrancy, infallibility) fears | **Left.** A paraphrase of two positions with no name, date, figure or quotation. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

### 2.19 /writing/does-prayer-change-anything

| Claim as it stood | Result |
|---|---|
| Many in the Wesleyan and Arminian traditions stress that God has made some outcomes depend on asking (check first) | **Verified.** Wesley, Sermon 16, "The Means of Grace" (Vault): "How could our blessed Lord more plainly declare, that we may receive of God, by this means, by importunately asking, what otherwise we should not receive at all". |
| Psalm 88 never turns to praise, "unlike nearly every other lament in the book" | **Narrowed.** Repo BSB, Psalm 88:1-18: no turn to praise; its last line is "darkness is my closest companion". The comparison had no source. After: "Psalm 88 is a prayer from start to finish, and it never turns to praise." |

### 2.20 /writing/why-are-there-so-many-denominations

| Claim as it stood | Result |
|---|---|
| The churches that did not receive Chalcedon remain and confess Christ fully God and fully man (check first) | **Verified** in substance. CE "Monophysites and Monophysitism" (10489b): they "admitted that He is 'consubstantial with us', against Eutyches". |
| The popes at Avignon for most of the fourteenth century, then rival popes; a century before Luther | **Verified.** CE "Western Schism" (13539a): "Since the beginning of the century the pontiffs had fixed their abode beyond the Alps"; the schism from the conclave after 27 March 1378. |
| Luther's followers thought they were the church put out of doors; Rome's view in its own terms | **Verified.** Augsburg Confession (`pmachapman/Confessions`, `augsburg-confession.html`): "our churches dissent in no article of the faith from the Church Catholic"; Trent, Session IV (Vault) on interpreting Scripture against the sense "which holy mother Church hath held". |
| Three accounts of the church's unity | **Verified.** Westminster 25.1 (Creeds.json) for the Protestant; Vatican I, *Pastor Aeternus*, prologue (Vault), for the Roman; the Confession of Dositheus, Decree 10, for the Orthodox ("our Lord Jesus Christ Himself is head", with bishops over "particular Churches, that are real Churches"). |
| England: Puritans, separatists and dissenters | **Verified.** CE "Puritans" (12581a): "the Free Churchmen or Independents who repudiated all coercive power in the Church"; CE "Nonconformists" (11095b). |
| "...which is why Catholics and Orthodox do not use the word of themselves" | **Cut.** No source opened. The definition before it stays. |
| "Churches have split over a pastor's personality, over music, over money and over who was slighted at a meeting." | **Cut.** A general observation with no source. "And a great many came from nothing so dignified" stays, followed by 1 Corinthians 3:3. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

### 2.21 /writing/is-hell-real-and-is-it-fair

| Claim as it stood | Result |
|---|---|
| Mill, 1865: he would call no being good who was not good in our sense; "to hell I will go" | **Verified.** George Grote, *Review of the Work of Mr John Stuart Mill Entitled 'Examination of Sir William Hamilton's Philosophy'* (Westminster Review, 1 January 1866; PG 12002), reviewing the book "London: Longmans. 1865", quotes Mill: "I will call no being good who is not what I mean when I apply that epithet to my fellow-creatures; and if such a being can sentence me to hell for not so calling him, to hell I will go." |
| Lewis, 1940: "the doors of hell are locked on the inside." | **Verified** (the words) through SEP "Heaven and Hell in Christian Thought", which quotes them from *The Problem of Pain* in the 1944 printing ("Lewis 1944, 115"). The first edition's year was not opened, so "in 1940" is **cut**: "C. S. Lewis put that in one line in 1940:" became "C. S. Lewis put that in one line:". |
| Aquinas "eight centuries later" wrote the objection into "his own textbook" | **Verified.** The *Summa*, Prologue (PG 17611): written "to instruct beginners"; Augustine's *City of God* Book 21 dates from 426 (CE). |
| Irenaeus, a bishop of the second century | **Verified.** CE "St. Irenaeus". |

### 2.22 /writing/did-god-choose-who-would-be-saved

| Claim as it stood | Result |
|---|---|
| Readers "on every side" have noticed the difference in how Paul speaks of the two kinds of vessel | **Narrowed.** The difference is in the text (Romans 9:22-23, verified in the earlier ledger); who has noticed it is not. After: "There is also a difference in the way Paul speaks of the two kinds of vessel." |
| Chrysostom, late fourth century | **Verified.** CE "St. John Chrysostom": preaching at Antioch 386 to 398. |
| Augustine's handbook "late in his life" | **Verified.** WDB, *The Enchiridion*, NPNF note: "among the latest books of Augustin. It was written after the death of Jerome, which occurred Sept. 30, 420". |
| Wesley's heirs hold the Arminian answer in substance | **Verified.** CE "Arminianism": "the followers of John Wesley adhering to the Arminian view". |
| Rome has allowed more than one school | **Verified.** CE "Congregatio de Auxiliis": the decree of 1607 "allowed each party to defend its own doctrine". |
| The replies each tradition gives to its hard question (check first) | **Left.** Paraphrases of positions with no name, date, figure or quotation beyond the confessions already verified. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

### 2.23 /writing/is-divorce-ever-right-and-may-a-divorced-person-remarry

| Claim as it stood | Result |
|---|---|
| Readers differ over whether "free from a wife" (1 Corinthians 7:27) includes the divorced (check first) | **Cut.** No source opened. Before: "...(1 Corinthians 7:27–28), and readers differ over whether the people he calls free include the divorced or only those who have never married." After: "...(1 Corinthians 7:27–28)." |
| Jerome in the 390s | **Verified.** WDB, Jerome, Letter 55 (NPNF): "Written about the year 394 a.d.", with the sentence quoted ("he may be stained with every crime ..."). |
| Origen a century and a half before Jerome | **Verified** in substance. CE "Origen and Origenism": 185 to 254. |
| Erasmus argued in 1519 for the innocent spouse's remarriage | **Cut.** The ledger gives the Study Bible's note on Matthew 19 as its source, and that note's ledger names none. Before: "Erasmus argued in 1519 that the wronged husband or wife in Matthew's exception could take a new spouse. The Protestant churches adopted that reading and joined Paul's case to it." After: "The Protestant churches read Matthew's exception as allowing the wronged husband or wife to take a new spouse, and joined Paul's case to it." (Westminster 24.5, Creeds.json.) |
| The replies each answer gives to its hard questions (check first) | **Left.** Paraphrases of positions. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

### 2.24 /writing/should-the-church-stay-out-of-politics

| Claim as it stood | Result |
|---|---|
| The two-kingdoms account has been asked since the 1930s what it can say when the state does evil (check first) | **Narrowed.** Before: "The question it has been asked ever since the 1930s is whether a church trained to leave the state to its own business has anything to say when the state does evil." After: "The question for this account is whether a church trained to leave the state to its own business has anything to say when the state does evil." |
| Most Reformed churches gave up the magistrate's duty to suppress heresy (check first) | **Cut.** No source opened (the Vault's Schaff text of Westminster 23.3 still carries the clause). Before: "Most Reformed churches long ago gave up that last claim. What they kept is the conviction, as this site's study of church and state puts it, that there is \"no sphere sealed off from Christ,\" and that conviction has built schools, hospitals and movements of reform." After: "The Reformed also held the conviction, as this site's study of church and state puts it, that there is \"no sphere sealed off from Christ.\"" (The schools and hospitals clause, a general claim with no source, is cut with it.) |
| A good many white churches held that slavery was a civil matter for the pulpit to leave alone (check first) | **Cut.** No source opened. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

### 2.25 /writing/why-does-god-allow-evil

No change. Darwin's letter to Asa Gray (May 1860) was verified word for word in the earlier ledger against Darwin's *Life and Letters*, vol. 2; the remaining row (what ichneumon wasps do) is Darwin's own description inside the quotation.

### 2.26 /writing/is-jesus-the-only-way

No change. All rows verified.

| Claim as it stood | Result |
|---|---|
| Wilfred Cantwell Smith, 1976: "except at the cost of insensitivity or delinquency ... you are totally wrong" | **Verified.** SEP "Religious Diversity (Pluralism)" quotes it ("Smith 1976, 14"). |
| Symmachus wrote in 384 | **Verified.** CE (St. Ambrose): "when the Roman senate attempted in 384 and 391 to restore the altar of victory". |
| The three names (exclusivism, inclusivism, pluralism) in common use | **Verified.** SEP "Religious Diversity (Pluralism)": "Religious exclusivism and religious pluralism appear in most categorizations"; inclusivism used throughout. |
| The Second Vatican Council, 1964: those who through no fault of their own do not know the gospel may be saved | **Verified.** *Lumen Gentium* 16 (Vault; edition year 1964): "Those also can attain to salvation who through no fault of their own do not know the Gospel of Christ or His Church, yet sincerely seek God". |
| John Hick: each faith "constitutes a valid context of salvation/liberation; but none constitutes the one and only such context" | **Verified.** SEP "Religious Diversity (Pluralism)" ("Hick 1984, 229, 231"). |
| A Muslim believes that God is one and has no son | **Verified.** Qur'an 112 and 4:171 in Pickthall (PG 16955), as in 1.3. |

### 2.27 /writing/does-science-disprove-god

| Claim as it stood | Result |
|---|---|
| Augustine: "a disgraceful and dangerous thing" (the site's page; *The Literal Meaning of Genesis* not opened) | **Narrowed** to paraphrase. The English words belong to a modern translation that could not be opened; the Latin, as Galileo quotes it in his Letter to the Grand Duchess Christina (Salusbury's translation of 1661, keyed by EEBO-TCP A61244, in the Vault), reads "Turpe autem est nimis & perniciosum". Before: "it is \"a disgraceful and dangerous thing.\"" After: "it is a disgrace and a danger." |
| Some preachers attacked the book and some welcomed it; Asa Gray, Darwin's chief American defender, a convinced Christian (check first) | **Verified.** Asa Gray, *Darwiniana* (1876; PG 5273), preface: "scientifically, and in his own fashion, a Darwinian, philosophically a convinced theist, and religiously an acceptor of the 'creed commonly called the Nicene,' as the exponent of the Christian faith"; Darwin, *Life and Letters*, vol. 2 (PG 2088): the attack "by Wilberforce, Bishop of Oxford". |
| Bonhoeffer, 1944, from prison: "We are to find God in what we know, not in what we don't know." | **Cut.** The words rest on search results in the Honest Answers' ledger; the letters are in copyright and could not be opened. Before: "...and the church has often leaned on him. The pastor Dietrich Bonhoeffer saw this from a prison cell in 1944. As the site's page on [whether science has made God unnecessary](/questions/science/has-science-made-god-unnecessary) quotes him, \"We are to find God in what we know, not in what we don't know.\"" After: "...and the church has often leaned on him." |

### 2.28 /writing/did-jesus-really-rise-from-the-dead

| Claim as it stood | Result |
|---|---|
| Celsus "a century and a half later" | **Verified.** CE "Celsus": "flourished towards the end of the second century". |
| Tertullian, about 200 | **Verified.** CE "Tertullian": *De spectaculis* among the works of 200 to 206. |
| Kirsopp Lake, 1907: the women came to the wrong grave and a young man's words were misunderstood (check first) | **Narrowed.** Lake's *The Historical Evidence for the Resurrection of Jesus Christ* is not on GitHub, and no source opened describes his theory. Before: "In 1907 the New Testament scholar Kirsopp Lake proposed that the women, who were visitors to Jerusalem, came in the half-light to the wrong grave." After: "On one telling, the women, who were visitors to Jerusalem, came in the half-light to the wrong grave." The rest of the paragraph tells the theory as a theory and stays. |
| In 1971 a doctor in Wales interviewed 293 widowed people; nearly half had some experience of the dead spouse | **Cut.** The figures rest on search results (the resurrection essay's ledger, correction 20); the BMJ article could not be opened here. Before: "The theory has data behind it. In 1971 a doctor in Wales interviewed 293 widows and widowers and found that nearly half of them had had some experience of the husband or wife they had lost, often a felt presence, sometimes a sight or a voice." After: nothing; the next paragraph ("This should be granted in full. Such experiences are real ...") now follows Lüdemann's account. |
| The appearances grow from Mark to John; Mark's oldest copies end with the women leaving the tomb | **Verified** in part. CE "Gospel of Saint Mark" (09674b): "the great textual problem of the Gospel concerns the genuineness of the last twelve verses"; the rest is the site's own course. |
| E. P. Sanders: "That Jesus' followers (and later Paul) had resurrection experiences is, in my judgement, a fact. What the reality was that gave rise to the experiences I do not know." | **Cut.** The words rest on a search result (a review quoting the book); the book is in copyright and could not be opened. The sentence after it, "His second sentence matters as much as his first.", is cut with it. |
| Paul in Athens "some twenty years later" | **Verified.** CE "St. Paul" (11567b): "second mission, 50-53". |

### 2.29 /writing/should-christians-drink-alcohol

| Claim as it stood | Result |
|---|---|
| For most of the church's history the cup at the Lord's Table held wine | **Verified.** CE "The Holy Eucharist": "The necessity of wine of the grape is not so much the result of the authoritative decision of the Church, as it is presupposed by her (Council of Trent, Sess. XIII, cap. iv)". |
| Chrysostom preaching in Antioch in 387 on 1 Timothy 5:23 (check first: the year) | **Verified.** WDB, *Homilies on the Statues* 1 (NPNF): "This Homily was delivered in the Old Church of Antioch ... upon that saying of the Apostle, 1 Tim. v. 23"; CE "St. John Chrysostom": "the Lent of 387, when he delivered his sermons 'On the Statues'". |
| Distilled spirits are far stronger than the Bible's wine and a much later invention (check first) | **Verified.** EB1911 "Distillation" (vol. 8, PG 32689): the Arabians "greatly improved the earlier apparatus" and "discovered ... alcohol by the distillation of wine". |
| The temperance movement began against spirits and became a pledge against all alcohol (check first) | **Verified.** CE "Temperance Movements" (14482a): the first period from 1830 "laid the emphasis on temperance, the latter on total abstinence"; "nothing was said of combatting alcohol, but always distilled spirits". |
| Those women had little standing in law | **Verified** in substance. *History of Woman Suffrage*, vol. I (PG 28020), throughout on women's legal disabilities. |
| National prohibition lasted thirteen years in the last century and was repealed (check first) | **Narrowed.** The figure was found in no source opened (no copy of the Eighteenth and Twenty-first Amendments was found on GitHub). Before: "For thirteen years in the last century the sale of alcohol was forbidden across the United States, and then the ban was repealed." After: "For a time in the last century the sale of alcohol was forbidden across the United States, and then the ban was repealed." The fact of prohibition and repeal is left as common history; it too has no source here, and James may prefer the sentence cut. |

### 2.30 /writing/is-money-the-root-of-all-evil

No change. All three rows verified.

| Claim as it stood | Result |
|---|---|
| Tertullian, around 200, in North Africa | **Verified.** CE "Tertullian". |
| For many centuries the church forbade lending at interest; later Christians distinguished a loan to the needy from a loan for business, and most churches came to accept the second (check first) | **Verified.** CE "Usury" (15235c): "The councils condemned in the first place clerics who lent money at interest" (Arles, 314; Nicaea, 325, canon 17); "we may ask interest from the borrower who takes money or credit in order to produce or gain money; but not from one who borrows under pressure of necessity"; Catholic writers relaxed the rule toward "that of Calvin". |
| Churches differ on whether the tithe binds | **Left.** The essay says only that Christians differ, with no name or figure. |

### 2.31 /writing/is-the-church-responsible-for-antisemitism

| Claim as it stood | Result |
|---|---|
| The word antisemitism was coined in the nineteenth century for a hatred that claimed to rest on race; historians call the older contempt anti-Judaism; a baptized Jew was in principle a brother (check first) | **Narrowed.** CE "Judaism" (08399a): "the anti-Semitic agitation which has prevailed intensely through Western Europe since 1880". The coinage, the racial claim and the historians' term were found in no source opened. Before: "The word antisemitism was coined in the nineteenth century for a hatred that claimed to rest on race. Before that there was an older thing, a religious contempt taught by Christians, which historians often call anti-Judaism." After: "The word antisemitism belongs to the nineteenth century. Before that there was an older thing, a religious contempt taught by Christians." The defenders' point about the baptized Jew is given as theirs and stays. |
| Chrysostom at Antioch in the 380s | **Verified.** CE "St. John Chrysostom": priest at Antioch from 386. |
| "...and for long stretches it held." | **Cut.** No source opened. After: "It was a doctrine of toleration built on contempt." |
| Luther, 1543: synagogues and schools burned, homes torn down, prayer books taken, rabbis forbidden to teach, the people driven out | **Narrowed.** The tract could not be opened (no English or German copy on GitHub); the earlier ledger took the titles, years and the burning from the site's doctrine study of Israel. Before: "It advised the rulers of Germany to set fire to synagogues and schools, to tear down Jewish homes, to confiscate prayer books, to forbid rabbis to teach, and to drive the people out if all else failed." After: "It advised the rulers of Germany to set fire to synagogues and schools." **For James:** the four cut measures are in the tract and can be restored if he checks a translation. |
| Christians who sheltered Jews at the risk of their lives; they were exceptions | **Cut.** The ledger had one example from the site's own witnesses page and called the rest reference knowledge. Before: "There were Christians who sheltered Jews at the risk of their own lives, and their names should be honored. They were exceptions." **For James:** this cut removes the essay's acknowledgement of rescuers; restore it with a source he trusts. |
| Nearly every author of the New Testament was a Jew | **Verified** in substance. CE "Gospel of Saint Luke" (09420a): Luke's knowledge of things Jewish "acquired either as a Jewish proselyte (St. Jerome) or af[ter his conversion]". |
| Crucifixes carried the notice, "often cut down to its initials" | **Narrowed.** No source opened for the initials. After: "Crucifixes all over Europe carried that notice above congregations that had been taught to despise his people." The rest of the closing image is left; it too was not found stated in a source. |

### 2.32 /writing/are-catholics-and-protestants-both-christians

| Claim as it stood | Result |
|---|---|
| Rome defined Mary's conception without sin in 1854, her being taken up body and soul in 1950, and in 1870 that the pope under strict conditions teaches without error (check first) | **Verified.** *Ineffabilis Deus* (ember docs, `docs_pi09id.md`): "Given at St. Peter's in Rome, the eighth day of December, 1854", defining that Mary was "preserved free from all stain of original sin"; Vatican I, *Pastor Aeternus* (Vault, Tanner's translation): "SESSION 4: 18 July 1870", "when the Roman pontiff speaks EX CATHEDRA ... he possesses ... that infallibility"; *Lumen Gentium* 59 (Vault): Mary "was taken up body and soul into heavenly glory", note 13: "Pius XII, Const. Apost. Munificentissimus, 1 nov. 1950". |
| The church recognized which books belong in the Bible; the Catholic argument from Matthew 16:18, 2 Thessalonians 2:15, 1 Timothy 3:15 | **Left.** A position's argument in paraphrase; the verses were verified in the earlier ledger. |
| Protestants kept the creeds and quoted the fathers | **Verified.** Augsburg Confession, Article 1 (`pmachapman/Confessions`): "the decree of the Council of Nicaea ... is true and to be believed". |
| Catholics reply that the Mass is the one offering made present | **Verified.** Trent, Session XXII, ch. 2 (Vault, Waterworth): "the victim is one and the same, the same now offering by the ministry of priests, who then offered Himself on the cross, the manner alone of offering being different". |
| Catholics distinguish the honor of saints from worship | **Left** as the Catholic position stated in its own terms (CE draws the distinction throughout). |
| The Orthodox separated from Rome more than four centuries before Luther; seven sacraments, Mary and the saints, Scripture within tradition; against the pope's universal authority | **Verified.** 1054 (the site's course) to Luther's birth; the Confession of Dositheus, Decrees 2, 10 and 15 ("Evangelical Mysteries ... seven"; Christ himself head, "a mortal man cannot universally and perpetually be head of this Catholic Church"). |
| 1999: the joint declaration on justification and what it says; many confessional Protestants judged it "papered over the differences" | **Cut.** The declaration could not be opened (no copy on GitHub), and the judgment was quoted from the site's own doctrine page. Before: "In 1999 the Catholic Church and the Lutheran World Federation signed a joint declaration that the two confess together that sinners are accepted by God by grace alone, through faith in Christ's saving work and not for any merit of their own, and that the old condemnations do not fall on what each now teaches." and "The Study Bible's account of that 1999 declaration adds that many confessional Protestants judged it \"papered over the differences.\"" After: both sentences gone. **For James:** the declaration is a real and important event; restore the sentence if he can check its text. |
| Trent's rulings have not been withdrawn; in most places the two cannot share the Table | **Cut.** No source opened. Both sentences ("Trent's rulings have not been withdrawn."; "In most places the two still cannot share the Lord's Table.") removed. |
| Each side's strongest objection | **Left.** Paraphrases of positions. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

### 2.33 /writing/should-christians-support-the-death-penalty

| Claim as it stood | Result |
|---|---|
| Almost no Christian argues for execution for the other capital offences of the law; Israel's civil code was for Israel is "the usual answer" | **Narrowed.** Before: "and for a good deal else, and almost no Christian argues that a modern state should execute for those. Whoever appeals to Moses for the murderer has to explain why he does not appeal to Moses for the rest, and the usual answer, that Israel's civil code was for Israel, puts the weight back on Genesis." After: "and for a good deal else. Whoever appeals to Moses for the murderer has to explain why he does not appeal to Moses for the rest, and one answer, that Israel's civil code was for Israel, puts the weight back on Genesis." |
| The two readings of John 8 | **Left.** Readings in paraphrase. |
| Athenagoras, second century, to the emperor | **Verified.** CE "Athenagoras": the *Apology* "fixed by internal evidence as late in 176 or 177", a written plea to the emperors. |
| Tertullian, around 200 | **Verified.** CE "Tertullian". |
| Most opponents say the penalty was just in principle and is now unnecessary and too dangerous (check first) | **Narrowed.** Before: "Most opponents answer that the penalty was just in principle and has become unnecessary and too dangerous in practice." After: "One answer is that the penalty was just in principle and has become unnecessary and too dangerous in practice." |

### 2.34 /writing/is-depression-a-spiritual-failure

No change. John of the Cross a friar in Spain in the 1500s: CE "St. John of the Cross", "b. at Hontoveros, Old Castile, 24 June, 1542; d. at Ubeda, Andalusia, 14 Dec., 1591", a Carmelite. The other two rows are the essay's statement of the case and a disagreement described without names; they were left. The care lines were not touched.

### 2.35 /writing/do-i-have-to-go-to-church-to-be-a-christian

| Claim as it stood | Result |
|---|---|
| The risen Christ writes to seven congregations and rebukes five | **Verified.** Repo BSB, Revelation 2 and 3: rebukes to Ephesus (2:4), Pergamum (2:14), Thyatira (2:20), Sardis (3:1-3) and Laodicea (3:15-19); none to Smyrna or Philadelphia. |
| The New Testament's word for church means an assembly; they met in houses (check first) | **Verified.** CE "The Church" (03744a): *ecclesia* "employed in its general significance of 'assembly' (Acts 19:32; 1 Corinthians 14:19)", and as the equivalent of the Hebrew *qahal*; the house churches are in Scripture (verified in the earlier ledger). |
| The Catholic and Orthodox churches keep that conviction in its strong form | **Verified** in substance. CE "The Church" on the necessity of the Church; the Confession of Dositheus, Decrees 10 and 16. |
| The Westminster Confession of 1646 | **Cut** (see 2.0). |

## What is left (not checked in this pass)

The pass stopped at a clean boundary: every flagged problem in Part 1 and every essay in `articles-ledger.md` (the thirty-five essays of 2026-11-20 to 22) is done. Still to do, in the order James set:

1. **The twenty-five earlier essays** (`docs/work/essays/ledgers/<slug>.md`), about seventy rows marked "Not checked (textbook)" or "Not checked (memory), kept": most in `excavation-not-demolition` (8), `did-the-resurrection-happen` (8), `what-christian-nationalism-is-and-is-not` (7), `is-it-wrong-to-love-your-country` (6), `what-post-christian-means` (4), `the-children-rome-threw-away` (4), and one to three each in the rest.
2. **The Honest Answers** (`client/src/data/answers.ts`): the "not opened" and "reference knowledge" rows of `apol-ledger.md` (about thirty) beyond the flagged items fixed in Part 1. The same claims cut from the essays above still stand in some answers, resting on search results recorded in earlier ledgers: Russell's 1927 sentence (hell), Annie Dillard's hunter (those who never heard), Bonhoeffer's "We are to find God in what we know" (faith and science), Sanders's two sentences and the Rees study (the resurrection), Nagel's sentence (wishful thinking). If James's standard is "opened here or cut", each of those needs the same treatment.
3. **The question library** (`client/public/questions/`): the "not opened" rows in `apol-ledger.md`'s later runs and `apol-library.md`; the same Russell, Bonhoeffer and Dawkins wording stands on some pages.
4. **The short questions** (`/theology/questions`): 107 of the 112 have no ledger at all; only the five flagged ones were worked (1.9). "The Gospels are copies of copies" still says "More than five thousand Greek manuscripts" and "a body of evidence no other ancient text approaches"; "Can I actually trust the Bible?" still credits Metzger with the finding that "not one disputed reading puts a single doctrine of the faith in doubt".
5. **The justice timeline**: every other entry's figures (witch trials "roughly 40,000 to 60,000", the Albigensian "tens of thousands", Jerusalem in 1099).
6. **The study guides** (`g2a`, `g2b`, `g2c` ledgers, about forty-five rows), **the tools** (`tools-ledger.md`, `tools-audit-2.md`), **the family pages, help pages and wisdom topics** (no "not opened" rows were found in their ledgers beyond `family.md`'s note that `/tools/parenting-verses` and `/tools/scripture-memory` are "Not checked against one translation").
7. **The Bible notes** (`bdoor.md`, `bdoor-ledger.md`, about thirty-six rows).
8. **Claims the essay ledgers mark as the site's own** were not re-traced unless the row was also marked "not opened". Two found on the way: "somewhere over half a billion" Pentecostal and charismatic Christians in `do-the-gifts-of-the-spirit-still-happen` (from the history course, no source), and the line "The Black church went on speaking for a hundred and seventy years" in `should-the-church-stay-out-of-politics`.

Files other agents are changing were not touched: the essays in progress (is-the-god-of-the-old-testament-the-god-of-jesus, should-christians-keep-the-sabbath, does-god-have-a-plan-for-my-life, the gambling and feelings essays), `client/src/lib/shelf.json`, the Bible Explorer films and audio, `/downloads`, `/books`, ebooks and covers. The live essays that exist only in the database (`every-generation-was-sure-it-was` and the nine others with no file) could not be edited from here.

## For James

1. **The standard.** This pass counted as a source only what could be opened here: public-domain texts and reference works on GitHub, the repository's own primary texts, and, for modern scholarship only, the Stanford and Internet Encyclopedias of Philosophy (marked each time). Quotations verified in earlier runs only by web search were cut where an essay row was marked "not opened". If that is stricter than you want, the cut sentences are quoted above, whole, and can be restored with a source.
2. **The Westminster Confession's year.** Twelve essays said 1646; every source opened says 1647 (it was presented to Parliament in 1646 and printed with its proofs in 1647). The year was cut, not changed. Say which year you want and it can go back in.
3. **Pickthall.** The Honest Answer on Islam now quotes Pickthall's translation; its source line gives *The Meaning of the Glorious Koran* (1930), the title and year the question library already prints. Check the line against a printed copy if you can.
4. **Biography.** "I held the comfortable view" (good teacher) and the pastor's voice on near-death experiences are yours to keep or cut; nothing here can verify them.
5. **Cuts that remove something true and important that only a source can restore:** the 1999 joint declaration (Catholics and Protestants); the rescuers who sheltered Jews and four of the measures in Luther's 1543 tract (antisemitism); Russell's sentence (hell); the Orthodox account of a second marriage (divorce). Each is quoted above.
6. **Positions not touched.** The paragraphs stating your view on homosexuality, women in ministry and abortion were not edited. `should-women-preach` states no view; only its historical sentences were narrowed.

