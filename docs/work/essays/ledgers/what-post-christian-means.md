# Claims ledger: what-post-christian-means

Essay: `docs/work/essays/what-post-christian-means.md` ("What "Post-Christian" Actually Means"). Approved pilot. No writer's ledger survived, so the verifier built this one from the text on 2026-10-26.

## Read this first: no web search was available for this check

The workflow's shared web-search budget was already used up when this check began. Three WebSearch calls (the Taylor quotation, the Newbigin quotation, the Gallup 2021 report) all came back "this turn's web search budget is used up." No search result was seen for this essay. Opening the primary pages directly failed too: curl to news.gallup.com and www.pewresearch.org got a 403 from the sandbox proxy, and WebFetch could not resolve news.gallup.com or www.pewresearch.org.

This matters more here than for the other pilots. The review page James approved ("LiveWell Voice Pilots" artifact, read on 2026-10-26) says of this essay: "The web-search allowance ran out partway, so the Pew 2025 and Gallup 2021 figures were checked from memory. I'll verify each one against the live reports before this goes up." This run could not do that either. So, as the brief requires, every survey figure that nothing could confirm has been generalized, and both non-Scripture quotations have become marked paraphrase. The original wording is kept below under "Original wording, for restoring" so a later run with search or the source pages can put it back word for word.

The methods actually used, and what the words below mean:

- **"ESV copy"**: the passage was compared with the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown", parsed by its author from javascripture's ESV JSON). It was cloned on 2026-10-26 with `git clone --depth 1 --filter=blob:none --no-checkout` (commit fd66568, dated 2022-01-20), and the book files were read with `git show`. A script compared each quotation with the verse text after normalizing case, punctuation and spacing. The copy does not say which ESV edition it is. It prints LORD as "Lord" (the small capitals are lost), and its parser left stray spaces before apostrophes and colons. Every quotation matched word for word. This is not esv.org or the ESV API; it should be rechecked with James's API key once it exists.
- **"Hebrew (STEPBible)"**: read in the site's own `client/public/bible/ch/jeremiah/29.json`, which carries STEPBible's tagged Hebrew text (TAHOT, CC BY 4.0) with Strong's numbers.
- **"Corroborated by the benchmark note"**: the figure matches `docs/work/plan/benchmark.md`, section 1.1. That is a research note in this repo, committed on 2026-10-26 in PR #536, which cites the Pew Charitable Trusts summary at pew.org ("The decline of Christianity has slowed") and gives Pew's 2023-24 figures. It is another agent's secondhand record. Neither that summary nor any Pew page was opened in this run.
- **"Per the sibling ledger"**: the same fact was search-checked on 2026-10-26 by another run and recorded in `docs/work/essays/ledgers/what-christian-nationalism-is-and-is-not.md`. It was not searched again here.
- **"Not checked (textbook)"** or **"Not checked (reference knowledge)"**: no source was opened or searched. The verifier judged it standard reference knowledge. That judgment is not a check.
- **"Generalized"**: a precise figure that could not be checked was replaced by a rounder statement that stays true across any plausible error in the verifier's recollection. The generalized statement is itself unchecked.

Left for the voice and audit step, and done there on 2026-10-27 (see "Voice and audit pass" below): the essay's em-dashes, the Closing Texts layout (the pilot predates the no-em-dash rule), and the stock phrases "Those of us who pastor" and "I do not exempt myself."

## Voice and audit pass (2026-10-27)

Wording only. No fact, quotation, number, date, name or link was added, and every quotation is unchanged (checked by script against the committed text). Changes that touch claims below:

- Every em-dash outside quotations replaced with a comma, colon or full stop; the remaining en-dashes are verse ranges. Closing Texts now read *"Quote."* (Reference) on one line.
- Standfirst rewritten as one declarative sentence (it was a two-sentence "not X. Y." antithesis).
- "The most careful attempt to answer the question is Charles Taylor's *A Secular Age*" became "One of the most careful attempts ...". Overclaim softened.
- "Unbelief is not the neutral ground ... Belief is not the natural state of a society that has not yet gotten sophisticated. Both are choices now" became "Unbelief turns out not to be the neutral ground a person reaches once he grows up, and belief is no longer the default it was for the villager who could not opt out of it. Each is a choice now". Interpretation drawing on Taylor and the essay's own villager illustration; no source claimed.
- "In the first sense, America was never formally Christian" became "In the first sense, the national government was never formally Christian, and the country has ...". Narrowed so it does not contradict the state establishments named in the next sentence.
- "The honest answer ..." lost "honest"; "It would also be unfair" and "A skeptic will push back here, and he has a point" were cut (the concession about Torcaso stands); "That is what it means to live well after Christendom" and the epigram after it were cut.
- "Those of us who pastor have to admit something else, and I do not exempt myself" became "We pastors have something else to admit." See Biography below.
- "Then Jeremiah named the competing prophets" became "Then Jeremiah warned them about the competing prophets" (29:8–9 names no one).
- "A hermeneutic is a way of interpreting something" was folded into the next sentence ("people will not learn how to read the gospel mainly from arguments or campaigns").
- The ending no longer repeats the "The question is not whether ... The question is whether" close of what-christian-nationalism-is-and-is-not. "Most of them never saw the return. Their grandchildren did." became "The faith their grandchildren carried home ..." with "Most of the exiles never saw theirs" kept in the last line.
- Headings "A Missionary Comes Home" and "A Letter to Babylon" became "Lesslie Newbigin and the West as a Mission Field" and "Jeremiah's Letter to the Exiles".

## Corrections made in the essay

1. Opening, Gallup: "In March 2021 Gallup reported that for the first time since it began asking in 1937, fewer than half of American adults belonged to a church, synagogue, or mosque. The figure for 2020 was 47 percent. It had been 73 percent in 1937, and it stayed near 70 percent for six decades before it started falling around the turn of the century." became "In 2021 Gallup reported that fewer than half of American adults belonged to a church, synagogue, or mosque, the first time that had happened in the more than eighty years Gallup had been asking. For most of the twentieth century the figure had stood at around seven in ten, and the slide began only around the turn of the century." Reason: none of the figures or the month could be checked, and the pilot writer had checked them only from memory.
2. Three Ways to Be Secular: the Taylor quotation became marked paraphrase without quotation marks ("In effect, he asks why it was nearly impossible not to believe in God in the West around 1500, when by 2000 many people found unbelief easy, and even inescapable."). Reason: the quotation could not be matched to any source.
3. Same section: the quotation marks around Taylor's term subtraction stories were removed. It is now named as his term ("what he called subtraction stories"), like "the immanent frame" in the next lines.
4. Lewis: "on November 29, 1954" became "in 1954". The year he gave his Cambridge inaugural lecture is textbook; the day is not, and it could not be checked.
5. Where America Actually Stands, Gallup by generation: "In its 2018 to 2020 data, 66 percent of Americans born before 1946 belonged to a church, compared with 58 percent of baby boomers, 50 percent of Generation X, and 36 percent of millennials." became "In Gallup's figures, membership falls with each younger generation: a clear majority of Americans born before 1946 belonged to a church, and only a minority of millennials did." Reason: unchecked figures.
6. Same paragraph, Pew: the 29 percent and 16 percent unaffiliated figures became "from about one adult in six in 2007 to roughly three in ten"; the 5 percent atheist, 6 percent agnostic and 19 percent "nothing in particular" figures became "most of the unaffiliated are not atheists or agnostics. The largest group describe their religion as 'nothing in particular'"; the 83 percent (God or a universal spirit) and 86 percent (a soul) figures became "large majorities of American adults still believe in God or a universal spirit and believe that people have a soul." Reason: unchecked figures; the benchmark note does not give them.
7. Same paragraph: "A third attend" became "About a third attend", and "Forty-four percent pray every day" became "More than four in ten pray every day", to match what the benchmark note actually records ("about 33%", "about 44%").
8. A Missionary Comes Home: "a small United Reformed congregation across the road from Winson Green prison" became "a small United Reformed congregation in Winson Green, in inner-city Birmingham." The prison detail could not be checked and is not textbook.
9. Same paragraph: "He had spent more than three decades carrying the gospel in a country where Christians had always been a small minority" became "He had spent most of his working life ...". Newbigin's years in India were broken by years based in London and Geneva with the International Missionary Council (the verifier recalls 1959 to 1965; not checked), so a count of years could not be confirmed.
10. Same section: the Newbigin quotation became marked paraphrase without quotation marks ("Newbigin's reply, in substance, was that the only hermeneutic of the gospel is a congregation whose people believe the gospel and live by it."). The term "hermeneutic of the gospel" stays, named as his. Reason: the quotation could not be matched to any source.

No claim was found to be wrong. Every change above was made because a quotation, figure or detail could not be checked, not because a check failed.

## Original wording, for restoring

When search or the sources are available, check these and, if they match, restore them exactly:

- Gallup (Jeffrey M. Jones, "U.S. Church Membership Falls Below Majority for First Time," news.gallup.com, March 2021): report month March 2021; question first asked in 1937; 47 percent in 2020; 73 percent in 1937; "near 70 percent for six decades" before falling around the turn of the century; by generation in 2018 to 2020 data, 66 percent (born before 1946), 58 percent (baby boomers), 50 percent (Generation X), 36 percent (millennials); and Gallup's own attribution of much of the drop to generational replacement.
- Pew 2023-24 religion survey (released 2025): 29 percent unaffiliated, up from 16 percent in 2007; 5 percent atheist, 6 percent agnostic, 19 percent "nothing in particular"; 83 percent believe in God or a universal spirit; 86 percent believe people have a soul; 44 percent pray daily; a third attend monthly.
- Charles Taylor, *A Secular Age* (2007), the quotation as the pilot had it: He asks "why was it virtually impossible not to believe in God in, say, 1500 in our Western society, while in 2000 many of us find this not only easy, but even inescapable?" (The verifier recalls it from the book's opening chapter, around p. 25; not checked.)
- Taylor's term in quotation marks: "subtraction stories."
- C. S. Lewis, inaugural lecture at Cambridge ("De Descriptione Temporum"): "on November 29, 1954".
- Lesslie Newbigin, *The Gospel in a Pluralist Society* (1989), the quotation as the pilot had it: the only hermeneutic of the gospel "is a congregation of men and women who believe it and live by it." (The verifier recalls it from the chapter "The Congregation as Hermeneutic of the Gospel," around p. 227; not checked.)
- Newbigin's congregation "across the road from Winson Green prison"; "more than three decades" in India.

## Opening

- April 8, 1966: Time ran a cover with no picture, the first in its history. Not checked (reference knowledge).
- Three words in red type on a black field: "Is God Dead?" A cover line, not a quotation from a person. Not checked (reference knowledge).
- Five years earlier (1961), the theologian Gabriel Vahanian published *The Death of God*. Not checked (reference knowledge). Arithmetic checked (1966 minus 5).
- Its subtitle: *The Culture of Our Post-Christian Era*. Not checked (reference knowledge).
- The phrase would outlast the movement the book helped start. Interpretation.
- 1968: Peter Berger, quoted in the New York Times, predicted that by the twenty-first century religious believers would be found only in small sects, huddled together against a secular world. Paraphrase, no quotation marks. Not checked (reference knowledge; it is the standard citation in the secularization debate).
- Decades later Berger said publicly he had been wrong about secularization. Not checked (reference knowledge).
- Berger argued that what modernity reliably produces is pluralism. Paraphrase. Not checked (reference knowledge).
- April 2009: Newsweek cover story "The End of Christian America." Not checked (reference knowledge).
- 2021: Gallup reported that fewer than half of American adults belonged to a church, synagogue, or mosque, the first time in the more than eighty years Gallup had been asking. Generalized (see correction 1). Not checked.
- For most of the twentieth century the figure stood at around seven in ten; the slide began around the turn of the century. Generalized. Not checked.
- Four years later (2025) Pew released the third round of its large study of American religion. Corroborated by the benchmark note ("released February 26, 2025"; "Pew's third Religious Landscape Study").
- A survey of nearly 37,000 adults. Corroborated by the benchmark note (36,908 adults).
- Conducted between July 2023 and March 2024. Corroborated by the benchmark note.
- The Christian share fell from 78 percent in 2007 to 62 percent. Corroborated by the benchmark note (62 percent, "down ... 16 since 2007").
- It had held roughly steady since about 2019. Corroborated by the benchmark note ("holding in a 60 to 64% band since 2019").
- Pew said the decline had slowed and may have leveled off. Corroborated by the benchmark note ("The decline has paused, not reversed"; the cited summary's address reads "the-decline-of-christianity-has-slowed"). Pew's own headline was not opened.
- Some Christians and some secular readers read the numbers through their own frames. Characterization, no source claimed.

## Three Ways to Be Secular

- Charles Taylor, *A Secular Age*, published 2007. Not checked (reference knowledge).
- Taylor is a Canadian philosopher and a Catholic. Not checked (reference knowledge).
- The book runs close to nine hundred pages. Not checked. Already a round figure; kept.
- Taylor's central question (why belief was nearly unavoidable in the West around 1500 and unbelief easy by 2000). Marked paraphrase now (see correction 2). Not checked.
- Taylor's three senses of secular: public institutions, belief and practice, the conditions of belief, the third being his main concern. Paraphrase. Not checked (reference knowledge).
- The English villager in 1500 and the coworkers today. The essay's own illustrations.
- Subtraction stories, Taylor's term for the view that secularism is what is left once religion is scraped away. Paraphrase; quotation marks removed (correction 3). Not checked (reference knowledge).
- The immanent frame. Taylor's term; paraphrase of its meaning. Not checked (reference knowledge).
- Modern people as cross-pressured. Taylor's language of cross-pressures; paraphrase. Not checked (reference knowledge).
- "That is the pluralism Berger came to put in secularization's place." Interpretation, joining two thinkers' accounts; no source claimed.
- C. S. Lewis gave his inaugural lecture at Cambridge in 1954. Not checked (textbook). Day removed (correction 4).
- In it he argued the deepest break in Western history lay not between the Middle Ages and the Renaissance but between Jane Austen's age and his own. Paraphrase, no quotation marks. Not checked (reference knowledge).
- Christians and pagans had more in common with each other than either with a post-Christian. Paraphrase, no quotation marks. Not checked (reference knowledge).
- A post-Christian society is a different mission field from first-century Corinth. Interpretation.

## Where America Actually Stands

- The First Amendment barred a national church. Not checked (textbook).
- The last state establishments were gone by the 1830s. Not checked (textbook; Massachusetts, 1833, also marked "not checked (textbook)" in the was-america-founded ledger).
- Many public schools opened the day with prayer and Bible reading. General statement. Not checked.
- *Engel v. Vitale*, 1962, ended school-sponsored prayer. Not checked (textbook).
- *Abington School District v. Schempp*, 1963, ended devotional Bible reading. Not checked (textbook).
- Congress added "under God" to the Pledge in 1954. Per the sibling ledger (signed June 14, 1954).
- Congress made "In God We Trust" the national motto in 1956. Per the sibling ledger (July 30, 1956).
- Will Herberg, sociologist, *Protestant-Catholic-Jew*, 1955: the operative faith of Americans was the American Way of Life, with Protestantism, Catholicism and Judaism as its three expressions. Paraphrase, no quotation marks. Not checked (reference knowledge).
- Gallup's membership falls with each younger generation: a clear majority of those born before 1946, a minority of millennials. Generalized (correction 5). Not checked.
- Gallup tied much of the overall drop to generational replacement. Attribution kept as a general characterization. Not checked.
- Pew: the unaffiliated grew from about one adult in six in 2007 to roughly three in ten. Generalized (correction 6). Not checked. (The benchmark note says only that the unaffiliated "have also plateaued.")
- Most of the unaffiliated are not atheists or agnostics; the largest group describe their religion as "nothing in particular." Generalized. "Nothing in particular" is Pew's name for that response category. Not checked.
- Large majorities believe in God or a universal spirit and believe people have a soul. Generalized. Not checked.
- About a third attend religious services at least monthly. Corroborated by the benchmark note ("monthly attendance (about 33%)").
- More than four in ten pray every day. Corroborated by the benchmark note ("Daily prayer (about 44%)").
- Pew stopped short of calling the plateau a recovery; younger Americans remain far less religious; the researchers left open whether the leveling off would last. Corroborated by the benchmark note ("Pew's own caution: the young remain far less religious than older adults, so further decline is likely").
- The reading that much of what fell away was affiliation held for social reasons. Marked in the essay as an interpretation, not a finding.
- Nobody is a Christian by default; belief is one option among others. Interpretation drawing on Taylor.
- America is post-Christendom rather than post-Christian. The essay's thesis.

## What the Church Is Grieving

- Children who never attended church learned the Lord's Prayer and hymns; a shared moral vocabulary; churches founded hospitals, colleges, orphanages and rescue missions. General historical statements. Not checked.
- Herberg's diagnosis applied to the mid-century consensus. Interpretation.
- 1961, *Torcaso v. Watkins*: the Supreme Court stopped Maryland from denying Roy Torcaso his commission as a notary public because he would not declare a belief in God. Not checked (textbook).
- "We pastors have something else to admit" (was "Those of us who pastor"): James is a pastor (confirmed in docs/work/NOTES.md). No scene, title or years in ministry stated.

## A Missionary Comes Home

- Lesslie Newbigin went to India in 1936 as a missionary of the Church of Scotland. Not checked (reference knowledge).
- In 1947 he became one of the first bishops of the newly formed Church of South India. Not checked (reference knowledge).
- He retired in 1974, returned to Britain and taught at the Selly Oak Colleges in Birmingham. Not checked (reference knowledge).
- At about seventy he took the pastorate of a small United Reformed congregation in Winson Green, in inner-city Birmingham. Not checked (reference knowledge). Prison detail removed (correction 8).
- He had spent most of his working life carrying the gospel in a country where Christians had always been a small minority. Generalized (correction 9). Not checked.
- He came home to find his own country no longer Christian, though its churches assumed it was. Interpretation of his account.
- He argued the modern West had to be approached as a missionary approaches any culture. Paraphrase. Not checked (reference knowledge).
- Two books from the late 1980s, *Foolishness to the Greeks* and *The Gospel in a Pluralist Society*. Not checked (reference knowledge; the verifier recalls 1986 and 1989).
- Public facts and private values, with the gospel filed among the values. Paraphrase of his best-known distinction. Not checked (reference knowledge).
- His question: how anyone could come to believe that the power with the last word in human affairs is represented by a man hanging on a cross. Attributed paraphrase, no quotation marks, as the pilot had it. The wording was not checked; it stays close to his.
- His answer: the only hermeneutic of the gospel is a congregation that believes the gospel and lives by it. Marked paraphrase now (correction 10). Not checked.
- Newbigin's meaning: people will learn how to read the gospel from a congregation's common life more than from arguments or campaigns. Paraphrase of his account; the separate definition sentence ("A hermeneutic is a way of interpreting something") was folded in on 2026-10-27.

## A Letter to Babylon

- 597 BC: Nebuchadnezzar carried King Jehoiachin to Babylon. Not checked (textbook; 2 Kings 24:10–15).
- Jeremiah calls him Jeconiah. Checked against the ESV copy (Jeremiah 29:2; 28:4).
- With him went the queen mother, the officials of Judah and the craftsmen of Jerusalem. Paraphrase. Checked against the ESV copy (Jeremiah 29:2: "King Jeconiah and the queen mother, the eunuchs, the officials of Judah and Jerusalem, the craftsmen, and the metal workers").
- The temple still stood and fell about a decade later. Not checked (textbook; 587/586 BC).
- Hananiah spoke in the house of the LORD in front of the priests and the people. Checked against the ESV copy (Jeremiah 28:1).
- Jeremiah 28:3, "Within two years I will bring back to this place all the vessels of the LORD's house." Matched against the ESV copy (partial verse; the quotation stops before "which Nebuchadnezzar").
- Prophets among the exiles were saying the same thing. Checked against the ESV copy (Jeremiah 29:8–9, 15, 21, 31).
- Jeremiah 29:4–7, the block quotation. Matched against the ESV copy.
- "whom I have sent" (Jeremiah 29:4). Matched against the ESV copy.
- The word the ESV translates "welfare" three times in verse 7 is the Hebrew *shalom*. Checked: the ESV copy has "welfare" three times in 29:7, and the Hebrew (STEPBible) has three forms tagged H7965 (*shalom*) in that verse.
- *Shalom* as the full flourishing of a people under God. Gloss; interpretation.
- Jeremiah 29:8–9, "Do not let your prophets ... declares the LORD." Matched against the ESV copy (begins mid-verse, after "For thus says the LORD of hosts, the God of Israel:").
- Jeremiah 29:10–11. Matched against the ESV copy.
- The verse was first addressed to people most of whom would die in Babylon. Inference from the seventy years; interpretation.
- "do not decrease" (Jeremiah 29:6). Matched against the ESV copy.
- The two temptations and their political drift. Interpretation.
- Christians remain a majority of the population. Corroborated by the benchmark note (62 percent).
- Peter wrote to largely Gentile congregations across five regions of Asia Minor. Five regions checked against the ESV copy (1 Peter 1:1: Pontus, Galatia, Cappadocia, Asia, Bithynia). "Largely Gentile" is the common reading of 1:14, 1:18 and 4:3; interpretation, not checked.
- They had once joined in the idolatry of their towns and were now maligned for refusing (1 Peter 4:3–4). Paraphrase. Checked against the ESV copy ("lawless idolatry"; "they are surprised when you do not join them ... and they malign you").
- 1 Peter 1:1, "elect exiles of the dispersion." Matched word for word against the ESV copy, except that the copy capitalizes "Dispersion." Unresolved: the copy's edition is not stated, so the essay's lowercase is left as it was. Check with the ESV API.

## How to Live After Christendom

- Build houses, plant gardens, marry, seek the city's welfare, do not decrease. Paraphrases of Jeremiah 29:5–7, checked against the ESV copy.
- The gospel traveled without a culture to carry it for the church's first three centuries. General statement. Not checked (textbook in outline; Constantine's favor came in the early fourth century).
- Babylon's army had besieged Jerusalem and carried off their king. Not checked (textbook; 2 Kings 24:10–15); the king's departure is checked against the ESV copy (Jeremiah 29:2).
- 1 Peter 2:12, "Keep your conduct among the Gentiles honorable ... on the day of visitation." Matched against the ESV copy.
- The exiles of Psalm 137 refused to forget Zion by the rivers of Babylon. Paraphrase, no quotation marks. Checked against the ESV copy (Psalm 137:1, "By the waters of Babylon ... when we remembered Zion"; 137:5, "If I forget you, O Jerusalem").
- Daniel prayed toward Jerusalem three times a day, windows open (Daniel 6:10). Paraphrase. Checked against the ESV copy.
- Most of the exiles never saw the return; their grandchildren did ("The faith their grandchildren carried home ..." and the last line, "Most of the exiles never saw theirs"). Interpretation (the return under Cyrus came roughly sixty years after 597 BC; not checked, textbook).

## Closing Texts

- Jeremiah 29:7. Matched against the ESV copy.
- 1 Peter 2:12. Matched against the ESV copy.
- Hebrews 13:14, "For here we have no lasting city, but we seek the city that is to come." Matched against the ESV copy.

## Biography and integrity

- No biography of James beyond docs/work/NOTES.md: the essay says he pastors ("We pastors have something else to admit") and is raising children ("Those of us raising children in this country"), both confirmed. No invented scene, conversation, congregant or anecdote was found.
- No exclamation points.
- No links to check (the essay has none).

## Before this essay publishes

Check, with WebSearch when budget allows or with the source pages: everything under "Original wording, for restoring"; the Pew figures marked "corroborated by the benchmark note" (no Pew page was opened); the "Not checked (reference knowledge)" items in the opening (Time, Vahanian, Berger, Newsweek) and on Newbigin's life. Check every Scripture quotation against the ESV API once James's key exists, and settle "dispersion" in 1 Peter 1:1.
