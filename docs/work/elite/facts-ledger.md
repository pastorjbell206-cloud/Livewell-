# Facts ledger: the unchecked quotations and the disagreeing numbers

Run of 2026-11-19 on branch elite/facts. The list came from `WRITING-WAVE.md` ("Sources and quotations to check"), `REVIEW.md` (Not verified, 9 and 30), `w-history-essays.md` (7 and 8), `w-honest-answers.md` (5 and 6), `g2c.md` (paraphrases from memory) and `site-review-2026-11-19.md` section 6 and its table ("Flagship essay"). It works the way `faq-facts-ledger.md` did.

Method. 37 WebSearch calls. Primary pages would not open: WebFetch to www2.wheaton.edu, gutenberg.org, ushistory.org, cts.perseids.org, colinallen.dnsalias.org, pratclif.com and biblia.com failed to resolve (outside this session's network). So "search" below means the search tool's reading of result pages that reproduce the publisher's or a standard edition's text; a quote site alone was not taken as proof. Two local primary texts were used: the Ante-Nicene Fathers text of *The Martyrdom of Polycarp* that the site's history source boxes already quote (`scripts/data/history-sources/texts/martyrdom-of-polycarp.html`, Roberts and Donaldson, ANF vol. 1, 1885, checked in CI by `verify-sources`), and the ESV copy the essay ledgers use (lguenth/mdbible `json/ESV.json`, "English Standard Version 2011").

Decisions: CONFIRMED (left as it was), CORRECTED (changed to what the source says, source named), SOFTENED (attributed paraphrase or the claim cut down to what can be said), CUT, NOT APPLIED (the fix is recorded but the text is not in the repository).

Only the sentence carrying each item changed. No structure, slug, title or link was touched.

## 1. Quotations printed as exact

1. **Thomas Nagel.**
   - Where: `client/src/data/answers.ts` (HA on wishful thinking): "I want atheism to be true" ... "I don't want there to be a God; I don't want the universe to be like that." `client/src/data/argumentCases.ts`: "The philosopher Thomas Nagel, no friend of religion, admitted it plainly: I do not want there to be a God. I do not want the universe to be like that." `client/public/theology/questions.json` and `client/src/data/discussion-guides.ts`: paraphrase, no quotation marks.
   - Searched: Nagel *The Last Word* "I want atheism to be true".
   - Source: Thomas Nagel, *The Last Word* (Oxford University Press, 1997), pp. 130-131, in the essay "Evolutionary Naturalism and the Fear of Religion": "I want atheism to be true ... It isn't just that I don't believe in God and, naturally, hope that I'm right in my belief. It's that I hope there is no God! I don't want there to be a God; I don't want the universe to be like that." (Wording agrees across results; `apol-ledger.md` row 384 verified the same.)
   - Decision: answers.ts CONFIRMED. argumentCases.ts CORRECTED (it printed his words as if quoted, in different words and punctuation). The two paraphrases CONFIRMED.
   - Now (argumentCases): "The philosopher Thomas Nagel, no friend of religion, admitted it plainly in The Last Word (1997): \"I don't want there to be a God; I don't want the universe to be like that.\""

2. **William Randolph Hearst, "puff Graham".**
   - Where: `client/public/history/essays/the-attractional-era.json`: "William Randolph Hearst, the newspaper baron, sent his editors a two-word directive: \"puff Graham.\" Graham always said he never met the man and never learned his reasons."
   - Searched: "puff Graham" Hearst telegram; Graham never met Hearst.
   - Source: the Billy Graham Center Archives (Wheaton) catalogues a copy of a telegram Hearst sent to his editors (Collection 285); the Billy Graham Library's archive blog (2024) and Wikipedia (citing Bagdikian) give "puff Graham"; Wheaton's Graham biography and PBS say Graham never met Hearst and never learned why. No source seen reproduces the telegram's text, and some accounts call the two words a legend.
   - Decision: SOFTENED (the words are reported, not seen in the document). The second sentence CONFIRMED.
   - Now: "William Randolph Hearst, the newspaper baron, is said to have sent his editors a two-word directive: \"puff Graham.\""

3. **Christian Smith.**
   - Where: `the-attractional-era.json`: Moralistic Therapeutic Deism, a god who is, "in Smith's words, \"a combination Divine Butler and Cosmic Therapist.\"" The five propositions are given without quotation marks. `after-christendom-era.json`: "the sociologist Christian Smith documented in 2005" (no quotation).
   - Searched: Soul Searching "combination Divine Butler and Cosmic Therapist".
   - Source: Christian Smith with Melinda Lundquist Denton, *Soul Searching* (Oxford, 2005): "God is something like a combination Divine Butler and Cosmic Therapist"; the same words in Smith's Christianity Today interview (January 2005) and Notre Dame's news release. The five propositions match Smith's list in substance.
   - Decision: CONFIRMED.

4. **John Wesley's Journal.**
   - Where: `client/public/history/essays/awakenings-and-enlightenment.json`: 24 May 1738, "about a quarter before nine," ... "I felt my heart strangely warmed."; and "Wesley's Journal entry for 2 April 1739 records that he \"submitted to be more vile\" and preached in the open air for the first time, to the same Kingswood colliers."
   - Searched: Wesley Journal 24 May 1738 and 2 April 1739.
   - Source: John Wesley, *Journal*, 24 May 1738: "About a quarter before nine, while he was describing the change which God works in the heart through faith in Christ, I felt my heart strangely warmed." 2 April 1739 (CCEL text): "At four in the afternoon, I submitted to be more vile and proclaimed in the highways the glad tidings of salvation, speaking from a little eminence in a ground adjoining to the city, to about three thousand people." The city is Bristol; the Kingswood colliers were Whitefield's hearers, not Wesley's first open-air audience.
   - Decision: both quotations CONFIRMED; the audience CORRECTED.
   - Now: "...records that he \"submitted to be more vile\" and preached in the open air for the first time, to about three thousand people at the edge of Bristol."

5. **Polycarp.** Two translations were in use: "Eighty-six years have I served him, and he has done me no wrong." (`apostolic-and-persecuted.json`) and "Eighty-six years I have served him, and he has done me no wrong. How can I blaspheme my King who saved me?" (the live essay `the-first-christians-died-for-this`), while the history source boxes beside the essays print the Ante-Nicene Fathers text.
   - Searched: Kirsopp Lake's wording (Loeb, 1912-13); then read the local ANF text.
   - Source chosen: *The Martyrdom of Polycarp* 9.3, trans. Alexander Roberts and James Donaldson, Ante-Nicene Fathers vol. 1 (1885), the text already on the site's source cards and checked in CI: "Eighty and six years have I served Him, and He never did me any injury: how then can I blaspheme my King and my Saviour?" Chapter 18, same translation: "we afterwards took up his bones, as being more precious than the most exquisite jewels, and more purified than gold". (Lake's 1912 wording, "For eighty and six years have I been his servant, and he has done me no wrong", is a different translation; the "done me no wrong ... who saved me" wording on the essay is close to Holmes's modern translation.)
   - Decision: CORRECTED to the ANF wording everywhere it is quoted.
   - Now, `apostolic-and-persecuted.json`: "...and the sentence has outlived the empire that demanded it: \"Eighty and six years have I served Him, and He never did me any injury.\""
   - Now, `content/drafts/church-history/the-first-christians-died-for-this.md` (and its mirrors in `client/src/data/content-data.json`, `content/static-library.generated.json`, `api/static-library.generated.ts`): "The letter records what he said. \"Eighty and six years have I served Him, and He never did me any injury: how then can I blaspheme my King and my Saviour?\"" and, twice, the bones "more precious than the most exquisite jewels, and more purified than gold". The retired essay `the-constantinian-bargain`, which has no source file and lives only in the two generated static-library files, carried the same sentence and was changed alike.
   - Left: paraphrases without quotation marks (`the-apostolic-age.json`, `life/domains/faith-and-politics.json`, `wisdom/topics`, `church-history-figures.json`); `what-romans-13-says.json` quotes Polycarp 10.2 in the same ANF wording (checked against the local text: matches).
   - Not changed, noted: the live essay says "He was eighty-six." The number may count his years as a Christian rather than his age (Lake's note: "probably a Christian born"). Not on this list; flagged for James.

6. **The first of Luther's Ninety-five Theses.**
   - Where: `client/public/history/essays/reformation-and-its-wars.json`: "The first thesis, in its standard translation, ... \"When our Lord and Master Jesus Christ said, 'Repent,' he willed the entire life of believers to be one of repentance.\"" Paraphrases (no quotation marks) in `studyguides/forty-days.json`, `the-beatitudes.json`, `deep-roots.json`, `deconstruction.json`, the theology timelines, and `excavation-not-demolition` ("I paraphrase his first thesis").
   - Searched: the wording with Luther's Works vol. 31.
   - Source: *Luther's Works*, vol. 31 (Fortress, 1957), p. 25, trans. C. M. Jacobs, rev. Harold J. Grimm: "When our Lord and Master Jesus Christ said, 'Repent' [Matt. 4:17], he willed the entire life of believers to be one of repentance." (The essay drops only the editor's bracket.)
   - Decision: CONFIRMED.

7. **The Rule of Benedict.**
   - Where: `client/public/history/essays/the-long-middle.json`: "\"Idleness is the enemy of the soul,\" the Rule says in its chapter on daily labor". Other Rule sentences are paraphrase.
   - Searched: Rule chapter 48.
   - Source: *Rule of Saint Benedict*, chapter 48, "The Daily Manual Labour": "Idleness is the enemy of the soul." The same in every translation found (Jamberoo Abbey, Erie Benedictines, the PALNI edition, CCEL's older text).
   - Decision: CONFIRMED.

8. **Abraham Lincoln.**
   - Where: `the-american-experiment.json` ("The Almighty has His own purposes." twice, "a second inaugural address of barely seven hundred words", the rest paraphrase); `client/public/essays/what-christian-nationalism-is-and-is-not.json`: "both read the same Bible and pray to the same God, and each invokes His aid against the other" and "The Almighty has His own purposes."
   - Searched: the two sentences; the address's length.
   - Source: Second Inaugural Address, 4 March 1865: "Both read the same Bible and pray to the same God, and each invokes His aid against the other." ... "The Almighty has His own purposes." (Christian History Institute and Christianity Today reproductions; the uvu.edu text). Length 701 to 703 words (National Park Service: 703).
   - Decision: CONFIRMED.

9. **Johannes Kepler, "thinking God's thoughts after him".**
   - Where: `client/src/data/sermon-series.ts`: "Kepler (Lutheran who described astronomy as 'thinking God's thoughts after him')". Also in retired, unlisted pages only (`content/drafts/why-believe/faith-and-science.md` and its seeds); `apol-ledger.md` already removed it from the science answer.
   - Searched: the phrase and its source.
   - Source: none in Kepler's writings. Today in Science History lists it as "Attributed" and says historians have found no primary source in these words; Wikipedia calls it "probably a capsulized version" of his thought.
   - Decision: SOFTENED to what the site already says of Kepler elsewhere (`studyguides/doubt.json`: Kepler, Boyle and Newton "understood their work as studying God's creation").
   - Now: "Kepler (a Lutheran who saw his work as studying God's creation)"

10. **"Jesus spoke about money more than heaven and hell."**
    - Where: `client/src/data/answers.ts` (the money answer): "Jesus spoke about money and possessions more than he spoke about heaven and hell combined." Also the retired essay `what-the-bible-says-about-money` (not on the shelf; not changed).
    - Searched: the claim and its fact-checks.
    - Source: no study supports the comparison. Counts of parables that turn on money run from 11 of 39 to 16 of 38 depending on the counter; fact-checks (Clear Creek Resources; Thinking to Believe, 2023) show the heaven-and-hell comparison depends on how verses are counted and treats money used as illustration as the subject.
    - Decision: SOFTENED.
    - Now: "Jesus spoke often about money and possessions, and many of his parables turn on them."

## 2. Quotations matched only in search results before

11. **Richard Dawkins, "blind trust".**
    - Where: `client/src/data/answers.ts`, twice: "Richard Dawkins, in The Selfish Gene (1976), called faith \"blind trust, in the absence of evidence, even in the teeth of evidence.\"" and the same in another answer.
    - Searched: the phrase with the chapter title.
    - Source: Richard Dawkins, *The Selfish Gene* (Oxford, 1976), chapter 11, "Memes: the new replicators": "Another member of the religious meme complex is called faith. It means blind trust, in the absence of evidence, even in the teeth of evidence." (p. 198 of the 1976/1989 printing; the comma after "trust" is absent in some copies.) Book and chapter confirmed; the printed text could not be opened.
    - Decision: CONFIRMED.

12. **Alan Turing, "polite convention".**
    - Where: `client/src/data/answers.ts`: "what he called \"the polite convention that everyone thinks\"".
    - Source: A. M. Turing, "Computing Machinery and Intelligence", *Mind* 59, no. 236 (October 1950): "Instead of arguing continually over this point it is usual to have the polite convention that everyone thinks."
    - Decision: CONFIRMED.

13. **Miroslav Volf.**
    - Where: `client/src/data/answers.ts` (the hell answer): paraphrase "He argued that a God who refused to judge would not be kind. He would be complicit." and the quotation "It takes the quiet of a suburban home for the birth of the thesis that human nonviolence corresponds to God's refusal to judge."
    - Searched: the sentence; "nonindignant God ... accomplice".
    - Source: Miroslav Volf, *Exclusion and Embrace* (Abingdon, 1996), chapter 7: the sentence as quoted, given identically by the Calvin Institute of Christian Worship and Darryl Dash; the book could not be opened (biblia.com blocked). The "accomplice" wording itself ("a nonindignant God would be an accomplice in injustice") is quoted by Christianity Today (2017) without a book named; the answer gives it only as paraphrase of the book's argument that divine judgment is the "necessary correlate" of human nonviolence, which the same searches show.
    - Decision: CONFIRMED (quotation and paraphrase). Still worth one look at the printed page if James has the book.

## 3. Four numbers that disagreed

14. **Augustine on The City of God.**
    - Was: thirteen years (`the-constantinian-turn.json`, `the-church-that-outlived-rome.json`, retired seeds) and, in `councils-and-creeds.json`, "the bishop of a middling port town spent the next fifteen years writing the answer."
    - Source: Britannica, "The City of God" and "Saint Augustine": written about 413-426; Christian History Institute: begun 413, completed 426.
    - Decision: CORRECTED to thirteen.
    - Now: "...where the bishop of a middling port town spent thirteen years, from 413 to 426, writing the answer."

15. **Germany's losses in the Thirty Years' War.**
    - Was: `awakenings-and-enlightenment.json` "Germany had lost, by the common reckoning, something like a third of its people."; `reformation-and-its-wars.json` "in the hardest-hit German territories, historians' estimates run to a third of the population dead."; `the-counter-reformation.json` "The German lands lost perhaps a fifth of their entire population, and some regions lost half."
    - Searched: Peter H. Wilson's estimate.
    - Source: Peter H. Wilson, *Europe's Tragedy: A History of the Thirty Years War* (Allen Lane, 2009): a 15-20 percent fall in the affected areas, "more realistic" than the older claim of a third or more (as quoted in reviews); in a 2010 interview (Rorotoko) he put the Empire's loss at "at least a fifth".
    - Decision: CORRECTED, one wording in all three.
    - Now: awakenings: "Germany had lost about a fifth of its people, by the historian Peter H. Wilson's estimate, and older reckonings ran to a third." Reformation: "...the German lands lost about a fifth of their people, by the historian Peter H. Wilson's estimate, and older reckonings ran to a third." Counter-Reformation: "The German lands lost about a fifth of their people, by the historian Peter H. Wilson's estimate, and older reckonings ran to a third; some regions lost half." ("Some regions lost half" is the essay's own and was not separately searched.)

16. **Copies of The Fundamentals.**
    - Was: `the-american-experiment.json` "some three million copies by the count George Marsden reports"; `the-global-church.json` "mailed free to Christian workers by the hundreds of thousands".
    - Searched: three million copies; Marsden's figure.
    - Source: the sponsors' preface to the last volume (1915) said close to three million copies had been published (Presbyterian Historical Society blog, "The Presbyterian Beginnings of Fundamentalism"); Biola Magazine gives about three million (250,000 sets). Marsden's own page was not found, so his name came off the figure.
    - Decision: CORRECTED.
    - Now: "...close to three million copies by the count its sponsors gave in the last volume, the project funded by two California oil men, Lyman and Milton Stewart." and "...twelve volumes defending the faith's foundations, close to three million copies mailed free to Christian workers, and the movement had a name."

17. **How long the Nicene struggle ran.**
    - Was: "For most of the next sixty years" (`the-great-councils.json`); "For most of the fifty years after the council" (`councils-and-creeds.json`); "For most of the next fifty years" (`the-fathers-at-work.json`); "For fifty years the Arian party held councils" (`client/public/creeds/documents/nicene-creed.json`).
    - Source: arithmetic, Nicaea 325 to Constantinople 381 = 56 years.
    - Decision: CORRECTED to one wording.
    - Now: "For most of the fifty-six years from Nicaea to the Council of Constantinople in 381 ..." in the three essays, and in the creed page (which names 381 in its next sentence) "For most of the fifty-six years from Nicaea to Constantinople, the Arian party held councils..."

## 4. Study-guide quotations near Bonhoeffer, Lewis, Kuyper, Heschel, Brueggemann, Keller

A script listed every string in `client/public/studyguides/*.json` with double quotation marks within 300 characters of the six names: 71 hits. Most are Scripture, book or essay titles, or paraphrase beside a quoted verse. The quotations actually put in these authors' mouths:

| Guide | Quotation | Source | Decision |
|---|---|---|---|
| alone-in-a-crowded-church | Bonhoeffer's "wish dream" | *Life Together* (1938; Doberstein trans. 1954): "a wish dream" | CONFIRMED |
| the-church (twice) | "The sooner this shock of disillusionment comes to an individual and to a community the better for both." | *Life Together*, Doberstein trans., pp. 26-27, same words in every result | CONFIRMED |
| forgiveness, sermon-on-the-mount (several) | "grace without discipleship, grace without the cross, grace without Jesus Christ, living and incarnate" | *The Cost of Discipleship* (Fuller trans., 1959); searched in g2a and agrees | CONFIRMED |
| sermon-on-the-mount | "When Christ calls a man, he bids him come and die." | *The Cost of Discipleship*, R. H. Fuller's translation (German "Jeder Ruf Christi führt in den Tod") | CONFIRMED as Fuller's English |
| sermon-on-the-mount (three) | "only he who believes is obedient, and only he who is obedient believes" | *The Cost of Discipleship*, Fuller trans. | CONFIRMED |
| providence (three) | "only the suffering God can help" | *Letters and Papers from Prison*, letter of 16 July 1944, in the standard English (one excerpt has "a suffering God") | CONFIRMED |
| prayer | "cheap grace" (term) | *The Cost of Discipleship* | CONFIRMED |
| skeptic | "let us not come with any patronising nonsense about His being a great human teacher. He has not left that open to us. He did not intend to." | Lewis, *Mere Christianity* (1952), book 2, chapter 3 | CONFIRMED (known text, not searched) |
| spiritual-warfare | "there are two equal and opposite errors into which our race can fall about the devils. One is to disbelieve in their existence. The other is to believe, and to feel an excessive and unhealthy interest in them." | Lewis, *The Screwtape Letters*, preface (1942) | CONFIRMED |
| the-image-of-god | "There are no ordinary people. You have never talked to a mere mortal." and "Next to the Blessed Sacrament itself, your neighbour is the holiest object presented to your senses." | Lewis, "The Weight of Glory", preached 8 June 1941, Oxford | CONFIRMED |
| heaven-and-hell | "the scent of a flower we have not found, the echo of a tune we have not heard, news from a country we have never yet visited." | Lewis, "The Weight of Glory" (1941); the words found, the search did not name the author on the page | CONFIRMED |
| sabbath | "The Sabbath is not for the sake of the weekdays; the weekdays are for the sake of Sabbath." | Heschel, *The Sabbath* (Farrar, Straus and Young, 1951), excerpt reprinted by My Jewish Learning | CONFIRMED |
| economic-justice (bibliography) | Brueggemann's "royal consciousness" | *The Prophetic Imagination* (1978) | CONFIRMED (his term) |
| lament, prayer, suffering | "The Costly Loss of Lament" (title) | Brueggemann, *JSOT* 36 (1986) | CONFIRMED |
| parenting-formation | Keller: "prodigal" (the word) | *The Prodigal God* (2008) | CONFIRMED |

No quotation marks enclose words attributed to Kuyper, Keller or Brueggemann beyond titles and single terms: Kuyper's "square inch" (the-undivided-life, 1880), Keller on covenant and contract, Heschel's "palace in time" and Brueggemann's "psalms of disorientation" are paraphrase or terms. Nothing changed in the guides. (The leader note in skeptic.json, "can't easily be filed under \"merely wise\"", is the guide's own scare quote, not words given to Lewis.)

## 5. Translation slip in the flagship essay

18. **every-generation-was-sure-it-was.**
    - Where: the body lives only in the production database (it is not in `client/public/essays/`, `client/src/data/content-data.json` or any draft; this run read it from a snapshot of the live posts API in the scratchpad). Its Scripture is NIV, unnamed: "You travel over land and sea to win a single convert, and when you have succeeded you make them twice as much a child of hell as you are." (Matthew 23:15, no reference); "These people honor me with their lips, but their hearts are far from me. They worship me in vain; their teachings are merely human rules" (Matthew 15:8-9); "You say, “I am rich; I have acquired wealth and do not need a thing.” But you do not realize that you are wretched, pitiful, poor, blind and naked" (Revelation 3:17); and in the closing texts "The heart is deceitful above all things — who can understand it?" (Jeremiah 17:9), plus Matthew 15:8 and Revelation 3:17 again.
    - Checked: the local ESV copy (2011 text), by script.
    - ESV wording: Matthew 23:15 "For you travel across sea and land to make a single proselyte, and when he becomes a proselyte, you make him twice as much a child of hell as yourselves." Matthew 15:8-9 "This people honors me with their lips, but their heart is far from me; in vain do they worship me, teaching as doctrines the commandments of men." Revelation 3:17 "For you say, I am rich, I have prospered, and I need nothing, not realizing that you are wretched, pitiable, poor, blind, and naked." Jeremiah 17:9 "The heart is deceitful above all things, and desperately sick; who can understand it?"
    - Decision: NOT APPLIED. Changing a database row is a stateful operation the project rules reserve for James, and an override file in `client/public/essays/` would replace the whole essay and must pass the essay gate's no-em-dash rule, which this text (with its em-dashes) does not. The fix is either the four ESV verses above pasted in through the admin, or "(NIV)" after each verse.

## Count

Of 19 items (the study-guide table counted as one): CONFIRMED 8 (Christian Smith, Luther, Benedict, Lincoln, Dawkins, Turing, Volf, the study-guide quotations), CORRECTED 7 (Wesley's audience, Polycarp, Nagel's wording in one place, the four numbers), SOFTENED 3 (Hearst, Kepler, money), CUT 0, NOT APPLIED 1 (the flagship essay). Nagel and Wesley are counted once each as CORRECTED though each also had parts confirmed.

## Not done

- The Youth for Christ, Rick Warren and Four Spiritual Laws quotations listed with these in `w-history-essays.md` were not on this run's list and were not checked.
- Retired pages that repeat these claims were not changed: `what-the-bible-says-about-money` and `faith-and-science` (seeds, drafts and `api/*-articles.json`), and the archive under `content/archive/`.
- "He was eighty-six" in the live Polycarp essay (age or years of service) is for James.
