# Claims ledger: what-post-christian-means

Essay: `docs/work/essays/what-post-christian-means.md` ("What "Post-Christian" Actually Means"). Approved pilot. No writer's ledger survived, so the verifier built this one from the text on 2026-10-26.

## Search run, 2026-10-27 (read this first)

This run closed the open lines it could. Before it began, 73 item lines below were open (not checked, generalized, resting on the benchmark note or the sibling ledger, or with ESV wording matched only against a GitHub copy). After it: 33 verified from a source seen in this run, 1 generalized further, and 39 still open. Of the 39, 11 are Scripture quotations whose ESV wording still awaits James's ESV API key (the BSB confirms each one's sense, and each matches the GitHub ESV copy), and 28 are dates, names and reference-knowledge items that no source in this run reached.

The search budget ran out early. Twenty-two WebSearch calls ran, spent in order on the two non-Scripture quotations (Taylor, Newbigin), then the Gallup and Pew figures, then the opening's dates and names. The twenty-third, twenty-fourth and twenty-fifth (Berger's 1968 wording via Rodney Stark, Berger's later retraction, and the 2009 Newsweek cover) came back "this turn's web search budget is used up (limit: 200 WebSearch calls per turn, shared by every agent in it)": other agents in the same workflow turn had spent the shared allowance. No primary page could be opened either. The sandbox proxy refused news.gallup.com, www.pewresearch.org, www.thegospelcoalition.org and richardbeck.substack.com, and WebFetch could not resolve news.gallup.com, www.pew.org or richardbeck.substack.com.

Methods used in this run, in the words used below:

- **"Search-verified (2026-10-27)"**: the claim matched the text of WebSearch results run on 2026-10-27. The sites named are the ones the results cited. The results are summaries that quote the pages; no primary page was opened.
- **"ESV copy, re-run"**: this run cloned the same GitHub copy the first check used (lguenth/mdbible, commit fd66568, parsed from javascripture's ESV JSON) into the scratchpad and compared every Scripture quotation in the essay with it by script, after normalizing case, punctuation and spacing. All ten distinct quotations matched. The copy's ESV edition is not stated and it prints LORD as "Lord". It is not esv.org or the ESV API.
- **"BSB"**: the site's own Berean Standard Bible text in `client/public/bible/ch/<book>/<chapter>.json`, read in this run. It confirms where a verse is and what it says, not ESV wording.
- **"Gutenberg"**: a public-domain text read in this run from a GITenberg clone in the scratchpad: *United States Bill of Rights* (ebook 2), George Willis Cooke, *Unitarianism in America* (1902, ebook 8605), and Joseph Cullen Ayer, *A Source Book for Ancient Church History* (1913, ebook 24979).

Where a line below says "ESV wording not confirmed by search; BSB confirms the sense", the quotation stays in the essay because the BSB says the same thing and the GitHub ESV copy matches it word for word; James's API key should settle the wording.

## First check, 2026-10-26 (no web search was available)

The workflow's shared web-search budget was already used up when this check began. Three WebSearch calls (the Taylor quotation, the Newbigin quotation, the Gallup 2021 report) all came back "this turn's web search budget is used up." No search result was seen for this essay. Opening the primary pages directly failed too: curl to news.gallup.com and www.pewresearch.org got a 403 from the sandbox proxy, and WebFetch could not resolve news.gallup.com or www.pewresearch.org.

This matters more here than for the other pilots. The review page James approved ("LiveWell Voice Pilots" artifact, read on 2026-10-26) says of this essay: "The web-search allowance ran out partway, so the Pew 2025 and Gallup 2021 figures were checked from memory. I'll verify each one against the live reports before this goes up." This run could not do that either. So, as the brief requires, every survey figure that nothing could confirm has been generalized, and both non-Scripture quotations have become marked paraphrase. The original wording is kept below under "Original wording, for restoring" (renamed on 2026-10-27 "Original wording: what was restored and what was not") so a later run with search or the source pages can put it back word for word.

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

No claim was found to be wrong in that first check. Every change in items 1 to 10 was made because a quotation, figure or detail could not be checked, not because a check failed.


### Corrections made on 2026-10-27 (search run)

Each restores wording James approved in the pilot, now that a source seen in this run confirms it, or changes a figure to what the sources support. No voice or structure was changed beyond these sentences, and the essay still has no em-dash or exclamation point.

11. Opening, Gallup: correction 1 reversed. The essay again reads "In March 2021 Gallup reported that for the first time since it began asking in 1937, fewer than half of American adults belonged to a church, synagogue, or mosque. The figure for 2020 was 47 percent. It had been 73 percent in 1937, and it stayed near 70 percent for six decades before it started falling around the turn of the century." Search-verified (see the Opening lines below). The generalized wording it replaces ("For most of the twentieth century the figure had stood at around seven in ten") also reached back before 1937, which Gallup never measured.
12. Three Ways to Be Secular: correction 2 reversed. The Taylor quotation is restored verbatim: He asks "why was it virtually impossible not to believe in God in, say, 1500 in our Western society, while in 2000 many of us find this not only easy, but even inescapable?" Search-verified.
13. Same paragraph: "The book runs close to nine hundred pages" became "The book runs well past seven hundred pages". The search results gave 776 pages (a reviewer's count) and "the next 800 pages" (a newspaper column); neither confirmed "close to nine hundred", so the figure was generalized to what both support.
14. Where America Actually Stands: correction 5 reversed. "In its 2018 to 2020 data, 66 percent of Americans born before 1946 belonged to a church, compared with 58 percent of baby boomers, 50 percent of Generation X, and 36 percent of millennials." Search-verified.
15. Same paragraph: corrections 6 and 7 reversed, with one arithmetic fix. The essay now reads "Pew found that 29 percent of adults are now religiously unaffiliated, up from 16 percent in 2007. But the unaffiliated are not mostly atheists. Five percent of American adults call themselves atheists and six percent agnostics. Nineteen percent describe their religion as "nothing in particular." The same survey found that 83 percent of American adults believe in God or a universal spirit, and 86 percent believe people have a soul. About a third attend religious services at least once a month. Forty-four percent pray every day." The pilot's "The other 19 percent" became "Nineteen percent", because 5, 6 and 19 add to 30 against Pew's rounded 29. "About a third" is kept (the pilot said "A third"), because the monthly figure seen in this run is a sum of two Pew numbers, 25 and 8.
16. Lesslie Newbigin and the West as a Mission Field: correction 10 reversed. The Newbigin quotation is restored verbatim: "And he answered that the only hermeneutic of the gospel "is a congregation of men and women who believe it and live by it."" Search-verified.

## Original wording: what was restored and what was not

Restored on 2026-10-27, each matched to search results seen in this run: the Gallup month, 1937, 47 percent, 73 percent and "near 70 percent for six decades"; the Gallup generation figures; the Pew figures (29 and 16 percent unaffiliated; 5 percent atheist, 6 agnostic, 19 "nothing in particular"; 83 percent God or a universal spirit; 86 percent a soul; 44 percent daily prayer); the Taylor quotation; the Newbigin quotation.

Not restored, because nothing in this run confirmed them (restore exactly if a later check does):

- Taylor's term in quotation marks: "subtraction stories." The search results confirmed only that Taylor rejects the "subtraction" story or theory, not the plural phrase verbatim.
- C. S. Lewis, inaugural lecture at Cambridge ("De Descriptione Temporum"): "on November 29, 1954".
- Newbigin's congregation "across the road from Winson Green prison"; "more than three decades" in India.

## Opening

- April 8, 1966: Time ran a cover with no picture, the first in its history. Search-verified (2026-10-27): Wikipedia "Is God Dead?" ("the first cover in the magazine's history to feature only type, and no photo"); bahai-library.com chronology for 1966-04-08; a Commonweal caption, "The controversial Time magazine cover of April 8, 1966". One result hedged that the cover "is said to be" the first; the claim rests on Time's own history as reported.
- Three words in red type on a black field: "Is God Dead?" A cover line, not a quotation from a person. Search-verified (2026-10-27): "blood-red letters against a black background" (Wikipedia "Is God Dead?" and John T. Elson).
- Five years earlier (1961), the theologian Gabriel Vahanian published *The Death of God*. Search-verified (2026-10-27): Wikipedia "The Death of God" ("a 1961 book by Gabriel Vahanian"; George Braziller); Wikipedia "Gabriel Vahanian" (a Presbyterian who taught at Syracuse University); timeshighereducation.com obituary. Arithmetic checked (1966 minus 5).
- Its subtitle: *The Culture of Our Post-Christian Era*. Search-verified (2026-10-27): Université de Nantes catalogue record "The death of God : the culture of our post-Christian era".
- The phrase would outlast the movement the book helped start. Interpretation. (The results add that Time linked the book to the "death of God" movement and that Vahanian rejected the label; the essay's "helped start" stays an interpretation.)
- 1968: Peter Berger, quoted in the New York Times, predicted that by the twenty-first century religious believers would be found only in small sects, huddled together against a secular world. Paraphrase, no quotation marks. Search-verified in substance only (2026-10-27): culture.wursten.be cites a New York Times piece of February 25, 1968, "A Bleak Outlook Is Seen for Religion", in which Berger expected religion to survive only in small sectarian groups banding together against secularization. STILL OPEN for the "twenty-first century" horizon and the "huddled together" wording: the search results showed the familiar quotation ("By the 21st century, religious believers are likely to be found only in small sects, huddled together to resist a worldwide secular culture") only on pages of low reliability that do not cite the Times. A search through Rodney Stark's "Secularization, R.I.P.", which quotes it, was refused when the budget ran out.
- Decades later Berger said publicly he had been wrong about secularization. Search-verified (2026-10-27): culture.wursten.be reports that Berger later said he had been wrong about secularization but right about pluralism; christiancentury.org (2017) notes that he came to see secularization as far less inevitable than he once thought.
- Berger argued that what modernity reliably produces is pluralism. Paraphrase. Search-verified (2026-10-27): the same culture.wursten.be account (not a quotation of Berger) reports that he said he had been right about pluralism, arguing that pluralism undercuts taken-for-granted certainties.
- April 2009: Newsweek cover story "The End of Christian America." STILL OPEN. Not checked (reference knowledge): the one search planned for it was refused when the budget ran out. The verifier recalls Jon Meacham's cover story, issue dated April 13, 2009.
- 2021: Gallup reported, for the first time since it began asking in 1937, that fewer than half of American adults belonged to a church, synagogue, or mosque. Search-verified (2026-10-27): result text quoting news.gallup.com/poll/341963 ("Americans' membership in houses of worship continued to decline last year, dropping below 50% for the first time in Gallup's eight-decade trend"; "47% of Americans said they belonged to a church, synagogue or mosque"), with foxnews.com, baptistnews.com, ecfa.org and ministrywatch.com. The results give publication in March 2021 (one summary named March 29, without quoting the page's date line); "March 2021" restored (correction 11).
- 47 percent in 2020; 73 percent in 1937; near 70 percent for six decades, falling from around the turn of the century. Search-verified (2026-10-27): "U.S. church membership was 73% when Gallup first measured it in 1937 and remained near 70% for the next six decades, before beginning a steady decline around the turn of the 21st century"; "to 61% in 2010 and 47% in 2020." Restored (correction 11).
- Four years later (2025) Pew released the third round of its large study of American religion. Search-verified (2026-10-27): pewresearch.org pages dated 2025/02/26 (executive summary; "Decline of Christianity in the U.S. Has Slowed, May Have Leveled Off"); the pew.org Trust summary, summer 2025 ("The Center's third Religious [...] Study (RLS), released in February").
- A survey of nearly 37,000 adults. Search-verified (2026-10-27): 36,908 U.S. adults (Pew executive summary; pew.org summary).
- Conducted between July 2023 and March 2024. Search-verified (2026-10-27): July 17, 2023, to March 4, 2024 (pew.org summary; Pew practices page).
- The Christian share fell from 78 percent in 2007 to 62 percent. Search-verified (2026-10-27): "62% of U.S. adults describe themselves as Christians" (executive summary); "fell from 78% in 2007 to 71% in 2014" (Pew introductory essay).
- It had held roughly steady since about 2019. Search-verified (2026-10-27): "Between 2019 and 2024, the Christian share of the adult population has been relatively stable, hovering between 60% and 64%."
- Pew said the decline had slowed and may have leveled off. Search-verified (2026-10-27): Pew's headline, in its page address, "decline-of-christianity-in-the-us-has-slowed-may-have-leveled-off"; the pew.org summary ("appears to have leveled off, at least temporarily").
- Some Christians and some secular readers read the numbers through their own frames. Characterization, no source claimed.

## Three Ways to Be Secular

- Charles Taylor, *A Secular Age*, published 2007. STILL OPEN. Not checked (reference knowledge); no result seen in this run gave the year.
- Taylor is a Canadian philosopher and a Catholic. STILL OPEN. Not checked (reference knowledge).
- The book runs well past seven hundred pages (was "close to nine hundred pages"). Generalized on 2026-10-27 (correction 13). Search results: one blogger in the results gives 776 pages; a newspaper column in the same results says Taylor answers his question over the next 800 pages. The essay's new wording is true on either count.
- Taylor's central question, quoted: "why was it virtually impossible not to believe in God in, say, 1500 in our Western society, while in 2000 many of us find this not only easy, but even inescapable?" Search-verified (2026-10-27): commonwealmagazine.org quotes it word for word ("Why was it virtually impossible not to believe in God in, say, 1500 in our Western society," Taylor asks, "while in 2000 many of us find this not only easy, but even inescapable?"); johnpiippo.com and the Las Vegas Sun quote the first half as the opening of chapter 1; an exact-phrase search for "not only easy, but even inescapable" returned reviews of the book (eternitynews.com.au, bethinking.org, namb.net, Goodreads quotations, Commonweal). One First Things review renders the end without "even"; the essay follows Commonweal and the exact-phrase results. Restored (correction 12). The lowercase "why" after "He asks" is the pilot's.
- Taylor's three senses of secular: public institutions, belief and practice, the conditions of belief, the third being his main concern. Paraphrase. Partly search-verified (2026-10-27): First Things ("Uncomfortable Unbelief") describes the move from a world where belief was unchallenged to one where it is "one option among others" as a change in "the conditions of belief", and Wikipedia's summary of the book says the same. STILL OPEN for the first two senses, which no result named.
- The English villager in 1500 and the coworkers today. The essay's own illustrations.
- Subtraction stories, Taylor's term for the view that secularism is what is left once religion is scraped away. Paraphrase, no quotation marks. Search-verified in substance (2026-10-27): search results summarizing reviews of the book (Commonweal, First Things, PBS Religion and Ethics) say Taylor rejects the standard "subtraction" story, and Wikipedia's summary says he rejects the "subtraction" theory of secularization. The plural phrase itself was not seen, so the quotation marks stay off.
- The immanent frame. Taylor's term; paraphrase of its meaning. STILL OPEN. Not checked (reference knowledge).
- Modern people as cross-pressured. Taylor's language of cross-pressures; paraphrase. STILL OPEN. Not checked (reference knowledge).
- "That is the pluralism Berger came to put in secularization's place." Interpretation, joining two thinkers' accounts; no source claimed. (Berger's turn to pluralism is search-verified above.)
- C. S. Lewis gave his inaugural lecture at Cambridge in 1954. STILL OPEN. Not checked (textbook). Day removed (correction 4).
- In it he argued the deepest break in Western history lay not between the Middle Ages and the Renaissance but between Jane Austen's age and his own. Paraphrase, no quotation marks. STILL OPEN. Not checked (reference knowledge).
- Christians and pagans had more in common with each other than either with a post-Christian. Paraphrase, no quotation marks. STILL OPEN. Not checked (reference knowledge).
- A post-Christian society is a different mission field from first-century Corinth. Interpretation.

## Where America Actually Stands

- The First Amendment barred a national church. Gutenberg (2026-10-27): *United States Bill of Rights*, ebook 2, line 192: "Congress shall make no law respecting an establishment of religion". Verified.
- The last state establishments were gone by the 1830s. Gutenberg (2026-10-27): Cooke, *Unitarianism in America* (1902), ebook 8605: Connecticut "after an exciting agitation in 1818"; in Massachusetts "In November, 1833, the legislature submitted to the people a revision of the bill of rights, which provided for the separation of state and church ... and it became the law in 1834. Massachusetts was the last of all the states to arrive at this result." Verified.
- Many public schools opened the day with prayer and Bible reading. General statement. STILL OPEN. Not checked.
- *Engel v. Vitale*, 1962, ended school-sponsored prayer. STILL OPEN. Not checked (textbook).
- *Abington School District v. Schempp*, 1963, ended devotional Bible reading. STILL OPEN. Not checked (textbook).
- Congress added "under God" to the Pledge in 1954. Per the sibling ledger (search-checked there on 2026-10-26: signed June 14, 1954). Not searched in this run. STILL OPEN for this run.
- Congress made "In God We Trust" the national motto in 1956. Per the sibling ledger (search-checked there on 2026-10-26: July 30, 1956). Not searched in this run. STILL OPEN for this run.
- Will Herberg, sociologist, *Protestant-Catholic-Jew*, 1955: the operative faith of Americans was the American Way of Life, with Protestantism, Catholicism and Judaism as its three expressions. Paraphrase, no quotation marks. STILL OPEN. Not checked (reference knowledge).
- Gallup by generation, 2018 to 2020 data: 66 percent of those born before 1946, 58 percent of baby boomers, 50 percent of Generation X, 36 percent of millennials. Search-verified (2026-10-27): result text quoting news.gallup.com/poll/341963 ("66% of traditionalists [U.S. adults born before 1946] belong to a church, compared with 58% of baby boomers, 50% of those in Generation X, and 36% of millennials"), with Gallup's note that its analysis "relies on three-year aggregates from 1998-2000 ..., 2008-2010 ..., and 2018-2020". Restored (correction 14).
- Gallup tied much of the overall drop to older, churchgoing generations being replaced by younger ones. Search-verified (2026-10-27): Gallup says the decline "appears largely tied to population change". (Gallup also reports declines within each generation and calls the rise of people with no religious preference the primary factor; the essay's "much of" stays within that.)
- Pew: 29 percent unaffiliated, up from 16 percent in 2007. Search-verified (2026-10-27): "29% are religiously unaffiliated" (Pew executive summary, 2025/02/26); the 2007 baseline of 16 percent (16.1 percent in the 2007 survey, per a Discover magazine excerpt; "from 16% in 2007" in coverage of Pew's January 2024 report). One result also showed a separate Pew page with 28 percent, from a different survey; the essay follows the 2023-24 study. Restored (correction 15).
- 5 percent atheist, 6 percent agnostic, 19 percent "nothing in particular." Search-verified (2026-10-27): "29% are religiously unaffiliated: 5% are atheist, 6% are agnostic, and 19% identify religiously as 'nothing in particular.'" (Pew executive summary). "Nothing in particular" is Pew's name for the category. Restored, with "Nineteen percent" for "The other 19 percent" (correction 15).
- 83 percent believe in God or a universal spirit; 86 percent believe people have a soul. Search-verified (2026-10-27): Pew, "Religious and spiritual beliefs" (2025/02/26): 83 percent believe in God or a universal spirit; 86 percent believe people have a soul or spirit in addition to their physical body. Restored (correction 15).
- About a third attend religious services at least monthly. Search-verified (2026-10-27) as a sum: Pew's "If the U.S. had 100 people" (short read, 2026/01/29) gives 25 who attend in person weekly or more and 8 who go once or twice a month, 33 in all. The sum is arithmetic, not a figure Pew states in what was seen; "About a third" kept.
- Forty-four percent pray every day. Search-verified (2026-10-27): Pew's 2023-24 study, "fewer than half of Americans (44%) say they pray each day", down from 58 percent in 2007. Restored (correction 15).
- Pew stopped short of calling the plateau a recovery; younger Americans remain far less religious; the researchers left open whether the leveling off would last. Search-verified (2026-10-27): the pew.org summary ("Other indicators suggest we may see further declines in the American religious landscape in future years"; younger adults far less likely than the oldest to identify as Christian, 46 percent against 80).
- The reading that much of what fell away was affiliation held for social reasons. Marked in the essay as an interpretation, not a finding.
- Nobody is a Christian by default; belief is one option among others. Interpretation drawing on Taylor.
- America is post-Christendom rather than post-Christian. The essay's thesis.

## What the Church Is Grieving

- Children who never attended church learned the Lord's Prayer and hymns; a shared moral vocabulary; churches founded hospitals, colleges, orphanages and rescue missions. General historical statements. STILL OPEN. Not checked.
- Herberg's diagnosis applied to the mid-century consensus. Interpretation.
- 1961, *Torcaso v. Watkins*: the Supreme Court stopped Maryland from denying Roy Torcaso his commission as a notary public because he would not declare a belief in God. STILL OPEN. Not checked (textbook).
- "We pastors have something else to admit" (was "Those of us who pastor"): James is a pastor (confirmed in docs/work/NOTES.md). No scene, title or years in ministry stated.

## Lesslie Newbigin and the West as a Mission Field (was "A Missionary Comes Home")

- Lesslie Newbigin went to India in 1936 as a missionary of the Church of Scotland. STILL OPEN. Not checked (reference knowledge).
- In 1947 he became one of the first bishops of the newly formed Church of South India. STILL OPEN. Not checked (reference knowledge).
- He retired in 1974, returned to Britain and taught at the Selly Oak Colleges in Birmingham. STILL OPEN. Not checked (reference knowledge).
- At about seventy he took the pastorate of a small United Reformed congregation in Winson Green, in inner-city Birmingham. STILL OPEN. Not checked (reference knowledge). Prison detail removed (correction 8).
- He had spent most of his working life carrying the gospel in a country where Christians had always been a small minority. Generalized (correction 9). STILL OPEN. Not checked.
- He came home to find his own country no longer Christian, though its churches assumed it was. Interpretation of his account.
- He argued the modern West had to be approached as a missionary approaches any culture. Paraphrase. STILL OPEN. Not checked (reference knowledge); one result (emergentkiwi.org.nz) speaks of his thesis as serving the "re-missionalisation" of the West, which is close but was not taken as a check.
- Two books from the late 1980s, *Foolishness to the Greeks* and *The Gospel in a Pluralist Society*. Half verified: *The Gospel in a Pluralist Society*, 1989, search-verified (2026-10-27; Eerdmans 1989 per the results, and an alisonmorgan.co.uk study outline titled "Lesslie Newbigin The Gospel in a Pluralist Society SPCK 1989"). STILL OPEN for *Foolishness to the Greeks* (the verifier recalls 1986; no result gave the year).
- Public facts and private values, with the gospel filed among the values. Paraphrase of his best-known distinction. STILL OPEN. Not checked (reference knowledge).
- His question: how anyone could come to believe that the power with the last word in human affairs is represented by a man hanging on a cross. Attributed paraphrase, no quotation marks. Search-verified (2026-10-27): the results give his sentence as "how is it possible that the gospel should be credible, that people should come to believe that the power which has the last word in human affairs is represented by a man hanging on a cross?" (*The Gospel in a Pluralist Society*, p. 227, per results citing the Logos product page and cfc.sebts.edu, Christ and Culture). The essay's indirect question follows it closely and is attributed.
- His answer, quoted: the only hermeneutic of the gospel "is a congregation of men and women who believe it and live by it." Search-verified (2026-10-27): the full sentence, "I am suggesting that the only answer, the only hermeneutic of the gospel, is a congregation of men and women who believe it and live by it", p. 227 (results citing the Logos product page and cfc.sebts.edu, Christ and Culture); an exact-phrase search for the quoted words returned emergentkiwi.org.nz, thegospelcoalition.org (Trevin Wax) and others attributing them to the 1989 book. Restored (correction 16). (An alisonmorgan.co.uk study outline paraphrases it as "a congregation of people who believe it and live by it"; that is a note, not the book.)
- Newbigin's meaning: people will learn how to read the gospel from a congregation's common life more than from arguments or campaigns. Paraphrase of his account; the separate definition sentence ("A hermeneutic is a way of interpreting something") was folded in on 2026-10-27.

## Jeremiah's Letter to the Exiles (was "A Letter to Babylon")

- 597 BC: Nebuchadnezzar carried King Jehoiachin to Babylon. The event is checked against the BSB (2 Kings 24:12, "in the eighth year of his reign, the king of Babylon took him captive"; 24:15, "Nebuchadnezzar carried away Jehoiachin to Babylon"). STILL OPEN for the year 597 BC. Not checked (textbook).
- Jeremiah calls him Jeconiah. Checked against the ESV copy (Jeremiah 29:2; 28:4) and, in this run, the BSB (29:2, "King Jeconiah").
- With him went the queen mother, the officials of Judah and the craftsmen of Jerusalem. Paraphrase. Checked against the ESV copy and, in this run, the BSB (Jeremiah 29:2: "the queen mother, the court officials, the officials of Judah and Jerusalem, the craftsmen, and the metalsmiths").
- The temple still stood and fell about a decade later. STILL OPEN. Not checked (textbook; 587/586 BC).
- Hananiah spoke in the house of the LORD in front of the priests and the people. Checked against the ESV copy and, in this run, the BSB (Jeremiah 28:1).
- Jeremiah 28:3, "Within two years I will bring back to this place all the vessels of the LORD's house." ESV copy, re-run: matches (partial verse; the quotation stops before "which Nebuchadnezzar"). ESV wording not confirmed by search; BSB confirms the sense ("Within two years I will restore to this place all the articles of the house of the LORD").
- Prophets among the exiles were saying the same thing. Checked against the ESV copy (Jeremiah 29:8–9, 15, 21, 31) and, in this run, the BSB (29:15, "The LORD has raised up for us prophets in Babylon").
- Jeremiah 29:4–7, the block quotation. ESV copy, re-run: matches. ESV wording not confirmed by search; BSB confirms the sense. (The sibling ledger for what-christian-nationalism-is-and-is-not records 29:7 matched to esv.org search results on 2026-10-26; not seen in this run.)
- "whom I have sent" (Jeremiah 29:4). ESV copy, re-run: matches. ESV wording not confirmed by search; BSB confirms the sense (the BSB's 29:4 reads "who were carried away", and its 29:7 has the Lord's "to which I have sent you as exiles").
- The word the ESV translates "welfare" three times in verse 7 is the Hebrew *shalom*. Checked: the ESV copy has "welfare" three times in 29:7, and, re-read in this run, the site's Hebrew (STEPBible) has three words tagged H7965 in that verse.
- *Shalom* as the full flourishing of a people under God. Gloss; interpretation.
- Jeremiah 29:8–9, "Do not let your prophets ... declares the LORD." ESV copy, re-run: matches (begins mid-verse, after "For thus says the LORD of hosts, the God of Israel:"). ESV wording not confirmed by search; BSB confirms the sense.
- Jeremiah 29:10–11. ESV copy, re-run: matches. ESV wording not confirmed by search; BSB confirms the sense.
- The verse was first addressed to people most of whom would die in Babylon. Inference from the seventy years; interpretation.
- "do not decrease" (Jeremiah 29:6). ESV copy, re-run: matches. ESV wording not confirmed by search; BSB confirms the sense (the BSB has the same words, "do not decrease").
- The two temptations and their political drift. Interpretation.
- Christians remain a majority of the population. Search-verified (2026-10-27): 62 percent (Pew executive summary).
- Peter wrote to largely Gentile congregations across five regions of Asia Minor. Five regions checked against the ESV copy and, in this run, the BSB (1 Peter 1:1: Pontus, Galatia, Cappadocia, Asia, and Bithynia). "Largely Gentile" is the common reading of 1:14, 1:18 and 4:3 (BSB 4:3: "the same desires as the Gentiles"); interpretation.
- They had once joined in the idolatry of their towns and were now maligned for refusing (1 Peter 4:3–4). Paraphrase. Checked against the ESV copy and, in this run, the BSB ("detestable idolatry"; "they consider it strange of you not to plunge with them ... and they heap abuse on you").
- 1 Peter 1:1, "elect exiles of the dispersion." ESV copy, re-run: matches word for word, except that the copy capitalizes "Dispersion" (the BSB also capitalizes it). ESV wording not confirmed by search; BSB confirms the sense ("the elect who are exiles of the Dispersion"). The lowercase is left as the pilot had it; the ESV API should settle it.

## How to Live After Christendom

- Build houses, plant gardens, marry, seek the city's welfare, do not decrease. Paraphrases of Jeremiah 29:5–7, checked against the ESV copy and the BSB.
- The gospel traveled without a culture to carry it for the church's first three centuries. General statement. Gutenberg (2026-10-27): Ayer, *A Source Book for Ancient Church History* (1913), ebook 24979, gives the Edict of Galerius, April 30, 311, and Constantine's so-called Edict of Milan, 313, "granting toleration to the Christians". Verified in outline.
- Babylon's army had besieged Jerusalem and carried off their king. Checked in this run against the BSB (2 Kings 24:10, "the city came under siege"; 24:12 and 24:15, Jehoiachin taken captive and carried to Babylon) and the ESV copy (Jeremiah 29:2). Verified.
- 1 Peter 2:12, "Keep your conduct among the Gentiles honorable ... on the day of visitation." ESV copy, re-run: matches. ESV wording not confirmed by search; BSB confirms the sense.
- The exiles of Psalm 137 refused to forget Zion by the rivers of Babylon. Paraphrase, no quotation marks. Checked against the ESV copy and, in this run, the BSB (137:1, "By the rivers of Babylon we sat and wept when we remembered Zion"; 137:5, "If I forget you, O Jerusalem").
- Daniel prayed toward Jerusalem three times a day, windows open (Daniel 6:10). Paraphrase. Checked against the ESV copy and, in this run, the BSB.
- Most of the exiles never saw the return ("The faith their grandchildren carried home ..." and the last line, "Most of the exiles never saw theirs"). Interpretation, grounded in the seventy years of Jeremiah 29:10 (ESV copy and BSB). The essay gives no date for the return.

## Closing Texts

- Jeremiah 29:7. ESV copy, re-run: matches. ESV wording not confirmed by search; BSB confirms the sense.
- 1 Peter 2:12. ESV copy, re-run: matches. ESV wording not confirmed by search; BSB confirms the sense.
- Hebrews 13:14, "For here we have no lasting city, but we seek the city that is to come." ESV copy, re-run: matches. ESV wording not confirmed by search; BSB confirms the sense ("For here we do not have a permanent city, but we are looking for the city that is to come").

## Biography and integrity

- No biography of James beyond docs/work/NOTES.md: the essay says he pastors ("We pastors have something else to admit") and is raising children ("Those of us raising children in this country"), both confirmed. No invented scene, conversation, congregant or anecdote was found.
- No exclamation points.
- No links to check (the essay has none).


## Before this essay publishes

Still open after 2026-10-27, for a run with search budget or the source pages:

- Scripture: check every quotation against the ESV API once James's key exists (Jeremiah 28:3; 29:4–7; "whom I have sent"; "do not decrease"; 29:8–9; 29:10–11; 29:7; 1 Peter 1:1; 1 Peter 2:12; Hebrews 13:14), and settle "dispersion" against "Dispersion" in 1 Peter 1:1.
- Opening: the 2009 Newsweek cover; the "twenty-first century" horizon and "huddled together" wording of Berger's 1968 prediction (best checked in Rodney Stark's "Secularization, R.I.P.", which quotes it).
- Taylor: *A Secular Age* (2007); Canadian, Catholic; the first two of his three senses of secular; the immanent frame; cross-pressures; whether to restore quotation marks on "subtraction stories".
- Lewis: the 1954 inaugural lecture, its day (November 29) and the two paraphrased points.
- Where America stands: *Engel v. Vitale* (1962), *Abington v. Schempp* (1963), *Torcaso v. Watkins* (1961), the school-prayer generalization, Herberg's *Protestant-Catholic-Jew* (1955); "under God" (1954) and the motto (1956) rest only on the sibling ledger.
- Newbigin: India 1936, bishop 1947, retirement 1974, Selly Oak, Winson Green at about seventy, *Foolishness to the Greeks* (1986), the public facts and private values distinction, his call for a missionary approach to the West.
- History: 597 BC for the first deportation; the temple's fall about a decade later; the general goods of the old arrangement named in "What the Church Is Grieving".
